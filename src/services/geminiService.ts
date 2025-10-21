import { supabase } from './supabaseClient';
import type { Settings, Artist, SongStructure, CopyrightOption, AnimeTheme, HistoryItem, MarketingKitData } from '../types';
import { Type, Modality } from "@google/genai";
/**
 * Fonction centrale et sécurisée pour appeler notre backend (Supabase Edge Function).
 * C'est la seule fonction qui a le droit de communiquer avec l'extérieur pour l'IA.
 * @param modelName Le nom du modèle Gemini à utiliser (ex: 'gemini-1.5-flash').
 * @param prompt Le prompt complet à envoyer à l'IA.
 * @param config Options supplémentaires comme la température.
 * @returns Une promesse qui se résout avec la réponse de l'IA.
 */
async function invokeGeminiProxy(modelName: string, prompt: any, config: any = {}, responseMimeType?: 'text/plain' | 'application/json' | 'image/jpeg') {  // On appelle la fonction "gemini-proxy" que nous allons créer sur Supabase.
  // Le corps de la requête contient tout ce dont notre backend a besoin.
        console.log('[invokeGeminiProxy] Params envoyés:', { modelName, prompt, config, responseMimeType });
        const { data, error } = await supabase.functions.invoke('gemini-proxy', {
            body: { modelName, prompt, config, responseMimeType },
        });

    if (error) {
        // Si Supabase renvoie une erreur, on affiche le message du backend si présent
        let backendError = data && data.error ? data.error : error.message;
        throw new Error(`Erreur lors de l'appel de la fonction Supabase 'gemini-proxy': ${backendError}`);
    }

    // Si le backend retourne une erreur dans le corps (cas d'un 400 ou 500)
    if (data && data.error) {
        throw new Error(`Erreur lors de l'appel de la fonction Supabase 'gemini-proxy': ${data.error}`);
    }

    // Si responseMimeType est 'text/plain', la réponse est directement le texte
    if (responseMimeType === 'text/plain') {
        return data;
    }

    // La réponse de notre fonction Supabase est directement la réponse de Gemini.
    // On la retourne pour que les autres fonctions puissent l'utiliser.
    return data;
}

// Helper to select model and apply creativity settings
const getModelAndConfig = (selectedModel: string) => {
  if (selectedModel === 'gemini-2.5-flash-creative') {
    return { modelName: 'gemini-2.5-flash', config: { temperature: 1.0 } };
  }
  if (selectedModel === 'gemini-2.5-flash-concise') {
    return { modelName: 'gemini-2.5-flash', config: { temperature: 0.2 } };
  }
  return { modelName: 'gemini-2.5-flash', config: {} };
};

const modulateName = (name: string) => {
  return name
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[aeiou]/gi, (match) => {
      const vowels = { 'a': '4', 'e': '3', 'i': '1', 'o': '0', 'u': 'v', 'A': '4', 'E': '3', 'I': '1', 'O': '0', 'U': 'V' };
      return vowels[match as keyof typeof vowels] || match;
    })
    .replace(/ /g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '_'); // Replace special chars with underscore
};

const getArtistNamePrompt = (artist: Artist, copyrightOption: CopyrightOption): string => {
  switch (copyrightOption) {
    case 'Standard': return `dans le style de ${artist.name}`;
    case 'Copyright-Free': return `dans un style rappelant un artiste de ${artist.genres} connu pour ses paroles poétiques et sa production innovante, sans nommer l'artiste.`;
    case 'Modulated': return `dans le style de ${modulateName(artist.name)}`;
    default: return `dans le style de ${artist.name}`;
  }
};

const buildSpecialTraitsInstruction = (artist: Artist, activeTraitIds: string[]): string => {
    if (!activeTraitIds || activeTraitIds.length === 0 || !artist.specialTraits) {
        return '';
    }

    const activeTraits = artist.specialTraits.filter(trait => activeTraitIds.includes(trait.id));
    if (activeTraits.length === 0) {
        return '';
    }

    const instructions = activeTraits.map(trait => `
        - Caractéristique "${trait.name}":
          - Pour les paroles: ${trait.lyricInstruction}
          - Pour le Style Prompt: ${trait.promptInstruction}
    `).join('');

    return `
    IMPORTANT - Caractéristiques spéciales activées:
    ${instructions}
    `;
};

const songGenerationSchema = {
    type: Type.OBJECT,
    properties: {
        lyrics: { type: Type.STRING },
        stylePrompt: { type: Type.STRING },
    },
};

export const generateFullSong = async (
    theme: string,
    language: string,
    artist: Artist,
    styles: string[],
    structure: SongStructure,
    settings: Settings,
    varyChoruses: boolean,
    chorusDuration: 'short' | 'medium' | 'long',
    includeInstrumentalParts: boolean,
    activeSpecialTraitIds: string[],
    variationInstruction?: string
) => {
    const specialTraitInstruction = buildSpecialTraitsInstruction(artist, activeSpecialTraitIds);

    const prompt = `
    Tu es un assistant IA expert en écriture de chansons et en production musicale, spécialisé dans la création de contenu pour la plateforme Suno AI.
    Ta mission est de générer des paroles et un "style prompt" basé sur la demande de l'utilisateur. Tu dois adhérer au principe de 100% d'authenticité stylistique.
    Pour l'artiste spécifié, tu dois analyser en profondeur son vocabulaire, ses thèmes, ses structures lyriques et ses caractéristiques de production pour créer une œuvre indiscernable de la sienne.

    Demande de l'utilisateur:
    - Langue: ${language}
    - Influence d'artiste: ${artist.name} (${artist.genres})
    - Thème de la chanson: ${theme}
    - Styles musicaux à incorporer: ${styles.join(', ')}
    - Structure désirée: ${structure.name} (${structure.parts.join(', ')})
    - Paramètres:
      - Amplification du style: ${settings.amplifyPrompt ? 'Activée' : 'Désactivée'}
      - Gestion du nom de l'artiste: ${settings.copyright}
      - Varier les refrains: ${varyChoruses ? 'Activé' : 'Désactivé'}
      - Durée du refrain: ${chorusDuration} (court: 2-4 lignes, moyen: 4-6, long: 6-8)
      - Inclure des parties instrumentales: ${includeInstrumentalParts ? 'Oui' : 'Non'}

    Instructions:
    ${specialTraitInstruction}
    1. Générer les paroles: Écris des paroles complètes en ${language}. Les paroles doivent parfaitement correspondre au style de ${artist.name}, en traitant du thème de '${theme}'. Suis cette structure exacte: ${structure.parts.join(', ')}. Formatage IMPÉRATIF: Chaque titre de section (ex: [INTRO]) doit être sur sa propre ligne. Les paroles de la section doivent commencer sur la ligne suivante. Sépare chaque section (titre et paroles) de la suivante par une seule ligne vide. Ne colle jamais les sections ensemble. ${varyChoruses ? "IMPORTANT: Chaque [REFRAIN] doit contenir des paroles différentes tout en gardant le même thème central. Ne répète pas le même refrain." : ""} Chaque [REFRAIN] doit avoir une longueur correspondant à la durée demandée. ${includeInstrumentalParts ? "Tu peux ajouter des descriptions de parties instrumentales entre parenthèses. IMPORTANT : Ces descriptions instrumentales (ex: guitar solo, synth pad) doivent IMPÉRATIVEMENT être en anglais, quelle que soit la langue choisie pour les paroles." : ""}
    2. Générer le "Style Prompt": Crée un prompt de style musical pour Suno AI, avec un maximum de 1000 caractères.
       - Le prompt doit décrire un son ${getArtistNamePrompt(artist, settings.copyright)}, en fusionnant cela avec les styles musicaux suivants: ${styles.join(', ')}.
       - ${settings.amplifyPrompt ? 'Le prompt doit être extrêmement détaillé, décrivant des instruments spécifiques (ex: "synthés analogiques vintage", "basse 808 distordue"), des techniques de production (ex: "compression sidechain lourde", "saturation de bande lo-fi"), le tempo et l\\\'ambiance.' : ''}
    
    ${variationInstruction || ''}

    Fournis la sortie sous forme d'un seul objet JSON avec deux clés: "lyrics" et "stylePrompt". N'inclus aucun autre texte ou explication.
    `;

    const { modelName, config } = getModelAndConfig(settings.aiModel);
    const finalConfig = { ...config, responseMimeType: 'application/json', responseSchema: songGenerationSchema };
    
    const responseJson = await invokeGeminiProxy(modelName, prompt, finalConfig, 'application/json');

    if (responseJson && typeof responseJson.lyrics === 'string' && typeof responseJson.stylePrompt === 'string') {
        return responseJson;
    }
    throw new Error("La réponse de l'IA (generateFullSong) n'a pas le format attendu.");
};

export const generateArtistInspirationSong = async (
    language: string,
    artist: Artist,
    usePrimaryStyles: boolean,
    styles: string[],
    structure: SongStructure,
    settings: Settings,
    varyChoruses: boolean,
    chorusDuration: 'short' | 'medium' | 'long',
    includeInstrumentalParts: boolean,
    activeSpecialTraitIds: string[],
    variationInstruction?: string
) => {
    const stylesInfo = usePrimaryStyles
        ? `- Utiliser les styles principaux de l'artiste: Oui, en se basant sur ${artist.genres}`
        : `- Styles musicaux à fusionner avec l'artiste: ${styles.join(', ')}`;

    const stylePromptInstruction = usePrimaryStyles
        ? `Le prompt doit décrire un son ${getArtistNamePrompt(artist, settings.copyright)}, en se basant principalement sur les genres de l'artiste : ${artist.genres}.`
        : `Le prompt doit décrire un son qui fusionne ${getArtistNamePrompt(artist, settings.copyright)} avec les styles suivants : ${styles.join(', ')}.`;
    
    const specialTraitInstruction = buildSpecialTraitsInstruction(artist, activeSpecialTraitIds);

    const prompt = `
    Tu es un assistant IA expert en écriture de chansons, spécialisé dans la création de contenu pour Suno AI.
    Ta mission est de générer une chanson complète (paroles + style prompt) en t'inspirant uniquement d'un artiste. Tu dois être créatif et proposer un thème qui correspond à l'univers de cet artiste.
    L'authenticité stylistique est primordiale. L'œuvre doit être indiscernable de celle de l'artiste.

    Demande de l'utilisateur:
    - Langue: ${language}
    - Artiste: ${artist.name} (${artist.genres})
    ${stylesInfo}
    - Structure désirée: ${structure.name} (${structure.parts.join(', ')})
    - Paramètres:
      - Amplification du style: ${settings.amplifyPrompt ? 'Activée' : 'Désactivée'}
      - Gestion du nom de l'artiste: ${settings.copyright}
      - Varier les refrains: ${varyChoruses ? 'Activé' : 'Désactivé'}
      - Durée du refrain: ${chorusDuration} (court: 2-4 lignes, moyen: 4-6, long: 6-8)
      - Inclure des parties instrumentales: ${includeInstrumentalParts ? 'Oui' : 'Non'}
    
    Instructions:
    ${specialTraitInstruction}
    1. Choisir un thème: Invente un thème de chanson qui correspond parfaitement à l'univers et aux sujets de prédilection de ${artist.name}.
    2. Générer les paroles: Écris des paroles complètes en ${language} sur le thème que tu as choisi, dans le style authentique de ${artist.name} et en suivant la structure : ${structure.parts.join(', ')}. Formatage IMPÉRATIF: Chaque titre de section (ex: [INTRO]) doit être sur sa propre ligne. Les paroles de la section doivent commencer sur la ligne suivante. Sépare chaque section (titre et paroles) de la suivante par une seule ligne vide. Ne colle jamais les sections ensemble. ${varyChoruses ? "IMPORTANT: Chaque [REFRAIN] doit contenir des paroles différentes tout en gardant le même thème central. Ne répète pas le même refrain." : ""} Chaque [REFRAIN] doit avoir une longueur correspondant à la durée demandée. ${includeInstrumentalParts ? "Tu peux ajouter des descriptions de parties instrumentales entre parenthèses. IMPORTANT : Ces descriptions instrumentales (ex: guitar solo, synth pad) doivent IMPÉRATIVEMENT être en anglais, quelle que soit la langue choisie pour les paroles." : ""}
    3. Générer le "Style Prompt": Crée un prompt de style musical pour Suno AI (max 1000 caractères).
       - ${stylePromptInstruction}
       - ${settings.amplifyPrompt ? 'Le prompt doit être extrêmement détaillé, décrivant instruments, production, tempo et ambiance.' : ''}
    
    ${variationInstruction || ''}

    Fournis la sortie sous forme d'un seul objet JSON avec deux clés: "lyrics" et "stylePrompt". N'inclus aucun autre texte ou explication.
    `;

    const { modelName, config } = getModelAndConfig(settings.aiModel);
    const finalConfig = { ...config, responseMimeType: 'application/json', responseSchema: songGenerationSchema };
    
    const responseJson = await invokeGeminiProxy(modelName, prompt, finalConfig, 'application/json');

    if (responseJson && typeof responseJson.lyrics === 'string' && typeof responseJson.stylePrompt === 'string') {
        return responseJson;
    }
    throw new Error("La réponse de l'IA (generateArtistInspirationSong) n'a pas le format attendu.");
};



export const generateAdlibsOnlySong = async (
    theme: string,
    styles: string[],
    ambiances: string[],
    structure: SongStructure,
    settings: Settings
) => {
    const prompt = `
    Tu es un assistant IA expert en création musicale pour Suno AI.
    Ta mission est de créer une chanson avec UNIQUEMENT des ad-libs et effets vocaux (SANS paroles narratives complètes).

    Demande de l'utilisateur:
    - Description: ${theme}
    - Styles musicaux: ${styles.join(', ')}
    - Ambiances: ${ambiances.join(', ')}
    - Structure désirée: ${structure.name} (${structure.parts.join(', ')})
    - Amplification: ${settings.amplifyPrompt ? 'Activée' : 'Désactivée'}

    Instructions:
    1. **Générer les "Lyrics" (AD-LIBS + DESCRIPTIONS INSTRUMENTALES)**: 
       - Analyse la DESCRIPTION fournie pour identifier les ad-libs et éléments vocaux spécifiquement demandés.
       - Utilise UNIQUEMENT les ad-libs et effets vocaux mentionnés dans la description.
       - Si la description mentionne "ad-libs (yeah, skrrt, ay)", utilise SEULEMENT ces éléments: (yeah), (skrrt), (ay).
       - Si la description mentionne "vocal chops", écris "(vocal chops)" ou "(chops)" dans les lyrics.
       - **DESCRIPTIONS INSTRUMENTALES**: Tu peux ajouter des descriptions instrumentales entre parenthèses EN ANGLAIS.
         Exemples: (guitar solo), (bass drop), (synth pad), (808 hit), (piano breakdown), (drums build), etc.
       - Si la description mentionne des éléments instrumentaux spécifiques (ex: "guitar solo", "synth break"), inclus-les dans les lyrics appropriées.
       - NE GÉNÈRE AUCUNE PHRASE COMPLÈTE, AUCUN MOT NARRATIF, AUCUNE HISTOIRE.
       - N'invente PAS d'autres ad-libs que ceux demandés, sauf si la description dit explicitement d'en ajouter.
       - Suis la structure exacte: ${structure.parts.join(', ')}
       - Chaque section doit avoir 2-6 lignes d'ad-libs/effets/descriptions instrumentales placés de manière rythmique.
       - Formate correctement: [INTRO], [VERSE], [DROP], etc. sur leurs propres lignes.
       - Exemple si demande "ad-libs (yeah, skrrt) avec guitar solo":
         [INTRO]
         (guitar riff)
         (yeah)
         
         [VERSE]
         (skrrt)
         (808 hit)
         (yeah yeah)
         
         [BRIDGE]
         (guitar solo)
         
         [DROP]
         (skrrt skrrt)
         (bass drop)
         (yeah)
       
    2. **Générer le "Style Prompt"**: 
       Crée un prompt de style musical pour Suno AI (max 1000 caractères).
       - Base-toi DIRECTEMENT sur la description fournie: "${theme}"
       - Combine avec les styles (${styles.join(', ')}) et ambiances (${ambiances.join(', ')}).
       - NE MENTIONNE AUCUN ARTISTE.
       - **CRUCIAL**: Si la description mentionne des ad-libs spécifiques, inclus-les EXACTEMENT comme mentionnés dans le prompt.
       - Le prompt doit clairement indiquer "pas de paroles chantées" ou "no sung lyrics".
       - Exemple: Si description dit "ad-libs (yeah, skrrt, ay)", le prompt doit dire "avec ad-libs vocaux (yeah, skrrt, ay), 808 bass, hi-hats rapides, pas de paroles chantées"
       - ${settings.amplifyPrompt ? 'Décris en détail les instruments, la production, le tempo, et reprends exactement les éléments vocaux demandés.' : 'Décris l\'ambiance, le tempo, les instruments principaux et les ad-libs demandés.'}

    Fournis la sortie sous forme d'un seul objet JSON avec deux clés: "lyrics" et "stylePrompt". N'inclus aucun autre texte ou explication.
    `;

    const { modelName, config } = getModelAndConfig(settings.aiModel);
    const finalConfig = { ...config, responseMimeType: 'application/json', responseSchema: songGenerationSchema };
    
    const responseJson = await invokeGeminiProxy(modelName, prompt, finalConfig, 'application/json');

    if (responseJson && typeof responseJson.lyrics === 'string' && typeof responseJson.stylePrompt === 'string') {
        return responseJson;
    }
    throw new Error("La réponse de l'IA (generateAdlibsOnlySong) n'a pas le format attendu.");
};

export const generateFreestyleSong = async (
    theme: string,
    language: string,
    styles: string[],
    ambiances: string[],
    structure: SongStructure,
    settings: Settings,
    varyChoruses: boolean,
    chorusDuration: 'short' | 'medium' | 'long',
    includeInstrumentalParts: boolean
) => {
    const prompt = `
    Tu es un assistant IA expert en écriture de chansons et en production musicale, spécialisé dans la création de contenu pour la plateforme Suno AI.
    Ta mission est de générer des paroles et un "style prompt" basé sur la demande de l'utilisateur, SANS référence à un artiste spécifique.
    Tu dois créer un style musical original et cohérent basé uniquement sur les styles, ambiances et thème fournis.

    Demande de l'utilisateur:
    - Langue: ${language}
    - Thème de la chanson: ${theme}
    - Styles musicaux: ${styles.join(', ')}
    - Ambiances & Thèmes: ${ambiances.join(', ')}
    - Structure désirée: ${structure.name} (${structure.parts.join(', ')})
    - Paramètres:
      - Amplification du style: ${settings.amplifyPrompt ? 'Activée' : 'Désactivée'}
      - Varier les refrains: ${varyChoruses ? 'Activé' : 'Désactivé'}
      - Durée du refrain: ${chorusDuration} (court: 2-4 lignes, moyen: 4-6, long: 6-8)
      - Inclure des parties instrumentales: ${includeInstrumentalParts ? 'Oui' : 'Non'}

    Instructions:
    1. Générer les paroles: Écris des paroles complètes en ${language}. Les paroles doivent traiter du thème "${theme}" et correspondre aux ambiances/styles choisis. Suis cette structure exacte: ${structure.parts.join(', ')}. 
       Formatage IMPÉRATIF: Chaque titre de section (ex: [INTRO]) doit être sur sa propre ligne. Les paroles de la section doivent commencer sur la ligne suivante. Sépare chaque section (titre et paroles) de la suivante par une seule ligne vide. 
       ${varyChoruses ? "IMPORTANT: Chaque [REFRAIN] doit contenir des paroles différentes tout en gardant le même thème central. Ne répète pas le même refrain." : ""} 
       ${includeInstrumentalParts ? "Tu peux ajouter des descriptions de parties instrumentales entre parenthèses. IMPORTANT : Ces descriptions instrumentales (ex: guitar solo, synth pad) doivent IMPÉRATIVEMENT être en anglais, quelle que soit la langue choisie pour les paroles." : ""}
       
       **ÉLÉMENTS VOCAUX NON-LYRIQUES**: Si le thème mentionne des ad-libs (yeah, skrrt, ay, whip, brr, etc.), tu dois les intégrer naturellement dans les paroles entre parenthèses. Ex: (yeah), (skrrt), (ay).
       
    2. Générer le "Style Prompt": Crée un prompt de style musical pour Suno AI, avec un maximum de 1000 caractères.
       - Le prompt doit décrire un son original qui combine les styles (${styles.join(', ')}) et ambiances (${ambiances.join(', ')}).
       - NE MENTIONNE AUCUN ARTISTE, crée un style unique et original.
       - ${settings.amplifyPrompt ? 'Le prompt doit être extrêmement détaillé, décrivant des instruments spécifiques, des techniques de production, le tempo et l\'ambiance.' : 'Décris l\'ambiance générale, le tempo et les instruments principaux.'}
       - **Si le thème mentionne des ad-libs ou éléments vocaux**, inclus-les explicitement dans le prompt. Ex: "avec ad-libs trap énergiques (yeah, skrrt)", "vocal chops traités", "effets vocaux autotune".

    Fournis la sortie sous forme d'un seul objet JSON avec deux clés: "lyrics" et "stylePrompt". N'inclus aucun autre texte ou explication.
    `;

    const { modelName, config } = getModelAndConfig(settings.aiModel);
    const finalConfig = { ...config, responseMimeType: 'application/json', responseSchema: songGenerationSchema };
    
    const responseJson = await invokeGeminiProxy(modelName, prompt, finalConfig, 'application/json');

    if (responseJson && typeof responseJson.lyrics === 'string' && typeof responseJson.stylePrompt === 'string') {
        return responseJson;
    }
    throw new Error("La réponse de l'IA (generateFreestyleSong) n'a pas le format attendu.");
};

export const generateInstrumentalPrompt = async (description: string, styles: string[], ambiances: string[], keywords: string, settings: Settings) => {
    const prompt = `
    Tu es un producteur de musique IA spécialisé dans la création de prompts pour Suno AI.
    Ta mission est de créer un "style prompt" pour une piste instrumentale (ou avec éléments vocaux non-lyriques).

    Demande:
    ${description ? `- Description/Ambiance souhaitée: ${description}` : ''}
    ${styles.length > 0 ? `- Styles musicaux: ${styles.join(', ')}` : ''}
    ${ambiances.length > 0 ? `- Ambiances & Thèmes: ${ambiances.join(', ')}` : ''}
    ${keywords ? `- Mots-clés additionnels: ${keywords}` : ''}
    - Amplification: ${settings.amplifyPrompt ? 'Activée' : 'Désactivée'}

    Instructions:
    Crée un prompt de style musical pour Suno AI (max 1000 caractères).
    ${description ? `Utilise la description fournie comme base principale pour créer le prompt.` : ''}
    Le prompt doit être descriptif, évocateur et combiner de manière créative les éléments fournis (description, styles, ambiances, mots-clés).
    
    **IMPORTANT - Éléments vocaux dans les instrumentaux :**
    Si la description mentionne des ad-libs (yeah, skrrt, ay, whip, brr, etc.), des vocal chops, des voix atmosphériques, ou tout élément vocal, 
    tu DOIS les inclure explicitement dans le prompt. 
    Exemples : "avec ad-libs trap énergiques (yeah, skrrt, ay)", "vocal chops traités et pitchés", "chœurs éthérés en arrière-plan", 
    "voix autotunée sur les hooks", "samples vocaux découpés", "effets vocaux robotiques".
    
    ${settings.amplifyPrompt ? 'Le prompt doit être extrêmement détaillé, décrivant les instruments, les techniques de production, le tempo, la structure, l\'ambiance générale ET les éléments vocaux de manière très précise.' : 'Décris l\'ambiance générale, le tempo, les instruments principaux et les éléments vocaux s\'ils sont mentionnés.'}
    Le prompt doit uniquement contenir la description musicale, sans phrases comme "Génère une piste qui...".
    `;

    const { modelName, config } = getModelAndConfig(settings.aiModel);
    const finalConfig = { ...config, responseMimeType: 'text/plain' };
    const response = await invokeGeminiProxy(modelName, prompt, finalConfig, 'text/plain');

    if (response && typeof response === 'string') {
        return response.trim();
    }
    throw new Error("Impossible de générer le prompt instrumental.");
};

export const processImportedLyrics = async (
    lyrics: string, 
    artist: Artist, 
    settings: Settings, 
    includeInstrumentalParts: boolean, 
    activeSpecialTraitIds: string[],
    translate: boolean,
    targetLanguage: string
): Promise<{ lyrics: string; stylePrompt: string }> => {
    const specialTraitInstruction = buildSpecialTraitsInstruction(artist, activeSpecialTraitIds);

    let lyricsTaskInstruction = '';
    if (translate) {
        lyricsTaskInstruction += `
    1. **TRADUCTION POÉTIQUE OBLIGATOIRE** : Traduis les "Paroles originales" dans la langue suivante : **${targetLanguage}**.
       - **RÈGLE CRUCIALE** : Il ne s'agit PAS d'une traduction littérale. Tu dois adapter les paroles pour qu'elles soient poétiques, fluides, et qu'elles **riment logiquement** dans la langue cible, tout en conservant le sens et l'émotion du texte original. Le résultat doit ressembler à une chanson écrite nativement en ${targetLanguage}.
       - Le texte que tu produis à cette étape sera la base pour la suite.
    `;
    }

    if (includeInstrumentalParts) {
        const stepNumber = translate ? 2 : 1;
        const baseLyrics = translate ? "les paroles traduites" : "les paroles originales";
        lyricsTaskInstruction += `
    ${stepNumber}. **Ajout d'Instrumentaux** : Sur ${baseLyrics}, insère des descriptions de parties instrumentales entre parenthèses (ex: (guitar solo), (synth intro)).
       - **RÈGLE CRUCIALE** : Ces descriptions doivent **IMPÉRATIVEMENT être en anglais**, quelle que soit la langue des paroles.
    `;
    }

    if (!lyricsTaskInstruction) {
        lyricsTaskInstruction = "Retourne les paroles originales fournies par l'utilisateur SANS AUCUNE MODIFICATION.";
    } else {
        const finalStepNumber = (translate && includeInstrumentalParts) ? 3 : (translate || includeInstrumentalParts ? 2 : 1);
        lyricsTaskInstruction += `
    ${finalStepNumber}. **Sortie des Paroles** : Retourne le texte final des paroles, modifié selon les étapes ci-dessus.
    `;
    }


    const prompt = `
    Tu es un producteur de musique IA expert et un traducteur lyrique, spécialisé dans la création de contenu pour Suno AI.
    Ta mission est de réaliser deux tâches distinctes et obligatoires à partir des informations fournies, et de retourner le résultat dans un format JSON strict.

    **Informations Fournies :**
    - **Artiste d'influence** : ${artist.name} (${artist.genres})
    - **Paroles originales** :
    ---
    ${lyrics}
    ---
    - **Demande de traduction** : ${translate ? `Oui, vers ${targetLanguage}` : 'Non'}
    - **Demande d'ajout d'instrumentaux** : ${includeInstrumentalParts ? 'Oui' : 'Non'}
    - **Amplification du style** : ${settings.amplifyPrompt ? 'Activée' : 'Désactivée'}
    ${specialTraitInstruction ? `\n- **Caractéristiques spéciales de l'artiste à intégrer** : ${specialTraitInstruction}` : ''}

    ---
    **TACHES OBLIGATOIRES :**

    **Tâche 1 : Génération du "Style Prompt"**
    Crée un "Style Prompt" pour Suno AI (max 1000 caractères). Ce prompt doit être une fusion parfaite entre :
    1.  L'ambiance et le thème des paroles fournies (les originales, même si une traduction est demandée).
    2.  Le style musical caractéristique de ${getArtistNamePrompt(artist, settings.copyright)}.
    ${settings.amplifyPrompt ? 'Le prompt doit être extrêmement détaillé, décrivant instruments, production, tempo et ambiance.' : 'Décris l\'ambiance générale, le tempo et les instruments principaux.'}
    Si des caractéristiques spéciales sont mentionnées, intègre leurs instructions dans le prompt de style.

    **Tâche 2 : Traitement des Paroles**
    Suis les instructions suivantes dans l'ordre :
    ${lyricsTaskInstruction}

    ---
    **Format de Sortie Final :**
    Fournis ta réponse sous la forme d'un unique objet JSON avec deux clés : "lyrics" et "stylePrompt". N'inclus aucun autre texte, explication ou formatage en dehors de cet objet JSON.
    `;

    const { modelName, config } = getModelAndConfig(settings.aiModel);
    const finalConfig = { ...config, responseMimeType: 'application/json', responseSchema: songGenerationSchema };
    
    const responseJson = await invokeGeminiProxy(modelName, prompt, finalConfig, 'application/json');

    if (responseJson && typeof responseJson.lyrics === 'string' && typeof responseJson.stylePrompt === 'string') {
        return responseJson;
    }
    throw new Error("La réponse de l'IA (processImportedLyrics) n'a pas le format attendu.");
};


export const generateAnimeOpening = async (
    animeTheme: AnimeTheme,
    language: string,
    styles: string[],
    structure: SongStructure,
    settings: Settings,
    varyChoruses: boolean,
    chorusDuration: 'short' | 'medium' | 'long',
    includeInstrumentalParts: boolean,
    variationInstruction?: string
) => {
    const prompt = `
    Tu es un parolier et compositeur IA expert, spécialisé dans la création de génériques d'animes (Anisong) pour la plateforme Suno AI.
    Ta mission est de générer des paroles et un "style prompt" pour un opening de l'anime "${animeTheme.name}".

    Demande de l'utilisateur:
    - Anime: ${animeTheme.name} (Styles musicaux typiques: ${animeTheme.styles})
    - Langue des paroles: ${language}
    - Styles musicaux à fusionner: ${styles.join(', ') || 'Aucun'}
    - Structure désirée: ${structure.name} (${structure.parts.join(', ')})
    - Paramètres:
      - Amplification du style: ${settings.amplifyPrompt ? 'Activée' : 'Désactivée'}
      - Varier les refrains: ${varyChoruses ? 'Activé' : 'Désactivé'}
      - Durée du refrain: ${chorusDuration} (court: 2-4 lignes, moyen: 4-6, long: 6-8)
      - Inclure des parties instrumentales: ${includeInstrumentalParts ? 'Oui' : 'Non'}

    Instructions:
    1. Analyser l'anime: Capture l'essence de "${animeTheme.name}". Pense à ses thèmes principaux (aventure, amitié, combat, mystère, etc.), son ton, et ses personnages emblématiques, en t'inspirant de ses styles musicaux de base (${animeTheme.styles}).
    2. Générer les paroles: Écris des paroles complètes en ${language}. ${language === 'japonais' ? "IMPORTANT : Les paroles en japonais doivent être écrites en Rōmaji (alphabet latin)." : ""} Les paroles doivent être entraînantes, émotionnelles et parfaitement adaptées à un générique d'ouverture. Elles doivent évoquer l'univers de l'anime sans être trop littérales. Suis cette structure exacte: ${structure.parts.join(', ')}. Formatage IMPÉRATIF: Chaque titre de section (ex: [INTRO]) doit être sur sa propre ligne. Les paroles de la section doivent commencer sur la ligne suivante. Sépare chaque section (titre et paroles) de la suivante par une seule ligne vide. Ne colle jamais les sections ensemble. ${varyChoruses ? "IMPORTANT: Chaque [REFRAIN] doit contenir des paroles différentes tout en gardant le même thème central." : ""} Chaque [REFRAIN] doit avoir une longueur correspondant à la durée demandée. ${includeInstrumentalParts ? "Tu peux ajouter des descriptions de parties instrumentales entre parenthèses, comme (epic guitar solo) ou (orchestral rise), là où c'est pertinent pour un opening d'anime. IMPORTANT : Ces descriptions instrumentales doivent IMPÉRATIVEMENT être en anglais, quelle que soit la langue choisie pour les paroles." : ""}
    3. Générer le "Style Prompt": Crée un prompt de style musical pour Suno AI (max 1000 caractères).
       - Le prompt doit être énergique et fusionner de manière créative les styles de l'anime (${animeTheme.styles}) avec les styles additionnels demandés (${styles.join(', ') || 'aucun'}). Le résultat doit être typique des openings d'anime (ex: J-Rock, J-Pop, Anisong, Symphonic Rock).
       - Décris une instrumentation dynamique : guitares électriques puissantes, une ligne de basse entraînante, une batterie percutante, et potentiellement des synthétiseurs ou des éléments orchestraux.
       - Mentionne un tempo rapide (généralement entre 160 et 190 BPM).
       - ${settings.amplifyPrompt ? 'Sois extrêmement détaillé sur la production : énergie vocale, mixage puissant, transitions dynamiques entre les sections.' : ''}
    
    ${variationInstruction || ''}

    Fournis la sortie sous forme d'un seul objet JSON avec deux clés: "lyrics" et "stylePrompt". N'inclus aucun autre texte ou explication.
    `;

    const { modelName, config } = getModelAndConfig(settings.aiModel);
    const finalConfig = { ...config, responseMimeType: 'application/json', responseSchema: songGenerationSchema };
    
    const responseJson = await invokeGeminiProxy(modelName, prompt, finalConfig, 'application/json');

    if (responseJson && typeof responseJson.lyrics === 'string' && typeof responseJson.stylePrompt === 'string') {
        return responseJson;
    }
    throw new Error("La réponse de l'IA (generateAnimeOpening) n'a pas le format attendu.");
}

export const generatePersonalizedSong = async (
    styleDescription: string,
    exampleLyrics: string,
    language: string,
    structure: SongStructure,
    settings: Settings,
    varyChoruses: boolean,
    chorusDuration: 'short' | 'medium' | 'long',
    includeInstrumentalParts: boolean,
    variationInstruction?: string
) => {
    const prompt = `
    Tu es un parolier et producteur IA d'élite, un maître imitateur de style.
    Ta mission est de te plonger dans le style unique d'un créateur pour produire une nouvelle chanson (paroles + style prompt) qui semble émaner directement de lui. L'authenticité est absolue.

    ANALYSE PROFONDE REQUISE :
    1.  **SIGNATURE DE STYLE DU CRÉATEUR (Description) :** Voici comment le créateur décrit son son.
        ---
        ${styleDescription}
        ---

    2.  **EXEMPLE DE PAROLES DU CRÉATEUR (Pour analyse) :** Voici un exemple de son écriture. Analyse le vocabulaire, les thèmes, les schémas de rimes, la structure des phrases et le ton général.
        ---
        ${exampleLyrics || "Aucun exemple de paroles fourni. Base-toi uniquement sur la description de style."}
        ---

    TA MISSION :
    1.  **Intérioriser le Style :** Assimile complètement les deux sources d'information ci-dessus pour comprendre l'ADN créatif de l'utilisateur.
    2.  **Inventer un Thème :** Sur la base de ton analyse, invente un NOUVEAU thème de chanson qui soit une extension naturelle de l'univers de ce créateur. Ne te contente pas de copier le thème de l'exemple.
    3.  **Générer les Paroles :** Écris des paroles complètes en ${language} qui incarnent la signature de style. Le ton, le vocabulaire, les métaphores et la structure doivent être parfaitement alignés avec ton analyse. Suis la structure demandée : ${structure.parts.join(', ')}. Formatage IMPÉRATIF : chaque titre de section doit être sur sa propre ligne. ${varyChoruses ? "IMPORTANT: Chaque [REFRAIN] doit contenir des paroles différentes tout en gardant le même thème central. Ne répète pas le même refrain." : ""} Chaque [REFRAIN] doit avoir une longueur correspondant à la durée demandée. ${includeInstrumentalParts ? "Tu peux ajouter des descriptions de parties instrumentales entre parenthèses. IMPORTANT : Ces descriptions instrumentales (ex: guitar solo, synth pad) doivent IMPÉRATIVEMENT être en anglais, quelle que soit la langue choisie pour les paroles." : ""}
    4.  **Générer le "Style Prompt" :** Crée un prompt de style musical pour Suno AI (max 1000 caractères) qui traduit musicalement la signature de style. Décris l'instrumentation, la production, le tempo et l'ambiance qui correspondent au profil.
       - ${settings.amplifyPrompt ? 'Sois extrêmement détaillé, comme si tu donnais des instructions à un ingénieur du son qui connaît parfaitement le créateur.' : ''}

    ${variationInstruction || ''}

    Fournis la sortie sous forme d'un seul objet JSON avec deux clés: "lyrics" et "stylePrompt". N'inclus aucun autre texte ou explication.
    `;

    const { modelName, config } = getModelAndConfig(settings.aiModel);
    const finalConfig = { ...config, responseMimeType: 'application/json', responseSchema: songGenerationSchema };
    
    const responseJson = await invokeGeminiProxy(modelName, prompt, finalConfig, 'application/json');

    if (responseJson && typeof responseJson.lyrics === 'string' && typeof responseJson.stylePrompt === 'string') {
        return responseJson;
    }
    throw new Error("La réponse de l'IA (generatePersonalizedSong) n'a pas le format attendu.");
};

export const generateSongBurst = async (
    mode: string,
    params: any
): Promise<{ lyrics: string; stylePrompt: string }[]> => {
    let generationFunc: Function;
    let baseArgs: any[];

    switch (mode) {
        case 'Descriptive':
            generationFunc = generateFullSong;
            baseArgs = [params.theme, params.language, params.artist, params.styles, params.structure, params.settings, params.varyChoruses, params.chorusDuration, params.includeInstrumentalParts, params.activeSpecialTraitIds];
            break;
        case 'Artist':
            generationFunc = generateArtistInspirationSong;
            baseArgs = [params.language, params.artist, params.usePrimaryStyles, params.styles, params.structure, params.settings, params.varyChoruses, params.chorusDuration, params.includeInstrumentalParts, params.activeSpecialTraitIds];
            break;
        case 'AnimeOpening':
            generationFunc = generateAnimeOpening;
            baseArgs = [params.animeTheme, params.language, params.styles, params.structure, params.settings, params.varyChoruses, params.chorusDuration, params.includeInstrumentalParts];
            break;
        case 'Personalized':
            generationFunc = generatePersonalizedSong;
            baseArgs = [params.profile.styleDescription, params.profile.exampleLyrics, params.language, params.structure, params.settings, params.varyChoruses, params.chorusDuration, params.includeInstrumentalParts];
            break;
        default:
            throw new Error("Le mode de génération en rafale n'est pas supporté pour ce mode.");
    }
    
    const calls = [
        generationFunc(...baseArgs, "Génère une première version de la chanson."),
        generationFunc(...baseArgs, "Génère une deuxième variation distincte, en changeant l'angle ou le ton."),
        generationFunc(...baseArgs, "Génère une troisième variation très différente, en explorant une autre interprétation."),
    ];

    const results = await Promise.all(calls);
    return results;
};

export const generateRandomTheme = async (language: string): Promise<string> => {
    const prompt = `
    Génère un thème de chanson créatif et concis, en 3 à 7 mots, dans la langue suivante : ${language}.
    Par exemple: "un robot qui découvre la musique", "le dernier coucher de soleil sur Mars", "une lettre d'amour perdue dans le temps".
    Réponds uniquement avec le thème, sans aucune phrase d'introduction ni guillemets.
    `;
    const { modelName, config } = getModelAndConfig('gemini-2.5-flash-concise');
    const finalConfig = { ...config, responseMimeType: 'text/plain' };
    const response = await invokeGeminiProxy(modelName, prompt, finalConfig, 'text/plain');

    if (response && typeof response === 'string') {
        return response.trim();
    }
    throw new Error("Impossible de générer un thème aléatoire.");
};

export const parseQuickPrompt = async (
    userInput: string, 
    settings: Settings,
    artists: Artist[],
    styles: string[],
    ambiances: string[]
): Promise<{theme: string, artistName: string, styles: string[], ambiances: string[]}> => {
    const artistNames = artists.map(a => a.name).join(', ');
    const styleNames = styles.join(', ');
    const ambianceNames = ambiances.join(', ');

    const prompt = `
    Tu es un assistant IA expert en musique. Ta mission est d'analyser la description d'une chanson fournie par un utilisateur et de la traduire en paramètres structurés pour un générateur de chansons.
    L'utilisateur a décrit sa chanson idéale comme suit : "${userInput}"

    Voici les listes d'options valides que tu DOIS utiliser pour ta réponse :
    - Liste d'artistes possibles pour l'influence (choisis-en UN SEUL) : ${artistNames}
    - Liste de styles musicaux possibles (choisis-en jusqu'à 3) : ${styleNames}
    - Liste d'ambiances possibles (choisis-en jusqu'à 2) : ${ambianceNames}

    Instructions :
    1.  **Thème (theme)** : Utilise la description originale de l'utilisateur comme thème.
    2.  **Nom de l'artiste (artistName)** : C'est le paramètre le plus important. Choisis l'artiste LE PLUS PERTINENT de la liste fournie qui correspond à la description. Le nom doit correspondre EXACTEMENT à un nom de la liste.
    3.  **Styles (styles)** : Choisis les styles musicaux les plus pertinents de la liste. Retourne un tableau vide si aucun ne correspond.
    4.  **Ambiances (ambiances)** : Choisis les ambiances les plus pertinentes de la liste. Retourne un tableau vide si aucune ne correspond.

    Retourne le résultat sous la forme d'un objet JSON unique. N'inclus aucun autre texte ou explication.
    `;
    const schema = {
        type: Type.OBJECT,
        properties: {
            theme: { type: Type.STRING },
            artistName: { type: Type.STRING },
            styles: { type: Type.ARRAY, items: { type: Type.STRING } },
            ambiances: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["theme", "artistName", "styles", "ambiances"]
    };

const { modelName, config } = getModelAndConfig(settings.aiModel);
    const finalConfig = { ...config, responseMimeType: 'application/json', responseSchema: schema };
    
    const responseJson = await invokeGeminiProxy(modelName, prompt, finalConfig, 'application/json');

    if (responseJson && typeof responseJson.theme === 'string' && typeof responseJson.artistName === 'string') {
        return responseJson;
    }
    
    // Si, malgré le nettoyage du backend, la réponse n'est toujours pas bonne, on lance l'erreur.
    console.error("Réponse de l'IA reçue mais invalide :", responseJson);
    throw new Error("La réponse de l'IA (parseQuickPrompt) n'a pas le format attendu.");
};

export const generateAlbumArt = async (lyrics: string, stylePrompt?: string): Promise<string> => {
    const stylePromptSection = stylePrompt
        ? `
    Style musical (pour l'ambiance, le genre et l'esthétique):
    ---
    ${stylePrompt}
    ---
    `
        : '';

    // Instruction renforcée pour s'assurer qu'aucun texte n'est généré sur l'image.
    const textInstruction = `- Règle impérative : L'image ne doit contenir AUCUN texte, AUCUNE lettre, ni aucun mot. Elle doit être 100% visuelle. Ne pas écrire le titre de la chanson ou le nom de l'artiste.`;
    
    const prompt = `
    Crée une image de pochette d'album (cover) carrée, artistique et professionnelle.
    L'image doit être une représentation visuelle et symbolique qui fusionne les thèmes des paroles avec l'ambiance musicale décrite.

    Paroles (pour le thème et l'histoire):
    ---
    ${lyrics}
    ---
    ${stylePromptSection}

    Instructions:
    - Crée une image saisissante, de haute qualité, adaptée à une pochette d'album moderne.
    ${textInstruction}
    - L'esthétique de l'image (couleurs, composition, style) doit correspondre au style musical s'il est fourni. S'il n'est pas fourni, l'esthétique doit être entièrement et uniquement inspirée par les paroles.
    `;

// 2. On prépare les arguments pour notre assistant `invokeGeminiProxy`
    const modelName = 'gemini-2.5-flash-image';
    const config = {
        responseModalities: [Modality.IMAGE],
    };

    // 3. L'APPEL CORRIGÉ : On n'utilise plus `ai`, mais notre fonction sécurisée
    const response = await invokeGeminiProxy(modelName, prompt, config);

    // 4. On vérifie la réponse de notre assistant
    if (response && response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
    }

    // Si la réponse est invalide, on lance une erreur
    throw new Error("Impossible de générer la pochette d'album.");
};

export const generateAlbumArtBurst = async (lyrics: string, stylePrompt?: string): Promise<string[]> => {
    const stylePromptSection = stylePrompt
        ? `
    Style musical (pour l'ambiance, le genre et l'esthétique):
    ---
    ${stylePrompt}
    ---
    `
        : '';

    // Instruction renforcée pour s'assurer qu'aucun texte n'est généré sur l'image.
    const textInstruction = `- Règle impérative : L'image ne doit contenir AUCUN texte, AUCUNE lettre, ni aucun mot. Elle doit être 100% visuelle. Ne pas écrire le titre de la chanson ou le nom de l'artiste.`;
    
    const prompt = `
    Crée une image de pochette d'album (cover) carrée, artistique et professionnelle.
    L'image doit être une représentation visuelle et symbolique qui fusionne les thèmes des paroles avec l'ambiance musicale décrite.

    Paroles (pour le thème et l'histoire):
    ---
    ${lyrics}
    ---
    ${stylePromptSection}

    Instructions:
    - Crée une image saisissante, de haute qualité, adaptée à une pochette d'album moderne.
    ${textInstruction}
    - L'esthétique de l'image (couleurs, composition, style) doit correspondre au style musical s'il est fourni. S'il n'est pas fourni, l'esthétique doit être entièrement et uniquement inspirée par les paroles.
    `;

    const modelName = 'gemini-2.5-flash-image';
    const config = {
        responseModalities: [Modality.IMAGE],
    };

    // 3. L'APPEL CORRIGÉ : On n'utilise plus `ai`, mais notre fonction sécurisée
    const response = await invokeGeminiProxy(modelName, prompt, config);

    // 4. On vérifie la réponse de notre assistant
    if (response && response.candidates && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
    }

    // Si la réponse est invalide, on lance une erreur
    throw new Error("Impossible de générer la pochette d'album.");
};

export const generateRandomBackground = async (): Promise<string> => {
    // 1. Générer le prompt pour l'image d'arrière-plan, en utilisant notre assistant sécurisé
    const promptGenerationResponse = await invokeGeminiProxy(
        'gemini-1.5-flash',
        "Génère une description courte et créative (un prompt) pour une image d'arrière-plan artistique et inspirante pour un service de création musicale. Le style doit être éthéré, abstrait et coloré. Pense à des nébuleuses, des ondes sonores visuelles, des paysages de rêve. Réponds uniquement avec le prompt, sans aucune phrase d'introduction.",
        { temperature: 1.0 },
        'text/plain'
    );

    // On vérifie que la réponse est correcte
    if (!promptGenerationResponse || !promptGenerationResponse.candidates) {
        throw new Error("Impossible de générer le prompt pour l'arrière-plan.");
    }
    const imagePrompt = promptGenerationResponse.candidates[0].content.parts[0].text.trim();

    // 2. Générer l'image en utilisant le prompt et notre assistant sécurisé
    const imageResponse = await invokeGeminiProxy(
        'gemini-2.5-flash-image', // Le modèle pour générer des images
        `Art digital, ${imagePrompt}, 16:9, haute résolution, couleurs vibrantes, fond d'écran, cinématique, sans aucun texte`,
        {
            responseModalities: [Modality.IMAGE],
        }
    );

    // On vérifie que la réponse contient bien les données de l'image
    if (imageResponse && imageResponse.candidates && imageResponse.candidates[0].content.parts) {
        for (const part of imageResponse.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
    }

    throw new Error("Impossible de générer l'image d'arrière-plan.");
};

const getCopyrightInstructionForAnalysis = (artistName: string, copyrightOption: CopyrightOption): string => {
    const modulatedName = modulateName(artistName);
    switch (copyrightOption) {
        case 'Standard':
            return `Mentionne l'artiste "${artistName}" explicitement dans le prompt.`;
        case 'Copyright-Free':
            return `Décris le style sans jamais nommer l'artiste "${artistName}". Fais plutôt référence à son genre musical ou à des caractéristiques sonores connues (par exemple "un son de rock alternatif des années 90").`;
        case 'Modulated':
            return `Utilise uniquement le nom modifié suivant pour l'artiste : "${modulatedName}".`;
        default:
            return `Mentionne l'artiste "${artistName}" explicitement dans le prompt.`;
    }
};

export const analyzeSongStyle = async (artistName: string, songTitle: string, settings: Settings) => {
    const prompt = `
    Tu es un musicologue IA expert. Analyse la chanson "${songTitle}" de l'artiste "${artistName}".
    Sur la base de ton analyse, génère un "style prompt" pour Suno AI (max 1000 caractères) qui capture l'identité sonore de cette chanson spécifique.

    Paramètres:
    - Amplification: ${settings.amplifyPrompt ? 'Activée' : 'Désactivée'}

    Instructions:
    Le prompt doit décrire le style musical, le tempo, l'instrumentation, la production, et l'ambiance vocale.
    ${settings.amplifyPrompt ? 'Sois extrêmement détaillé sur les techniques de production (mixage, effets), les types d\'instruments exacts et les nuances de la performance.' : 'Concentre-toi sur les éléments principaux.'}
    IMPORTANT - Gestion du nom de l'artiste : ${getCopyrightInstructionForAnalysis(artistName, settings.copyright)}
    Le prompt doit être une description directe, prête à être utilisée.
    `;
// 2. CORRECTION : On récupère 'modelName' et 'config'
    const { modelName, config } = getModelAndConfig(settings.aiModel);
    
    // 3. CORRECTION : On utilise notre assistant sécurisé 'invokeGeminiProxy' au lieu de 'ai'
    const finalConfig = { ...config, responseMimeType: 'text/plain' };
    const response = await invokeGeminiProxy(
        modelName,
        prompt,
        finalConfig,
        'text/plain'
    );

    // 4. CORRECTION : On lit la réponse correctement et on s'assure qu'elle existe
    if (response && typeof response === 'string') {
        return response.trim();
    }
    
    // Si la réponse est invalide, on lance une erreur claire.
    throw new Error("Impossible d'analyser la chanson, la réponse de l'IA est invalide.");
};

export const editAlbumArt = async (imageDataUrl: string, prompt: string): Promise<{ image: string; text: string | null }> => {
    const match = imageDataUrl.match(/^data:(image\/.+);base64,(.+)$/);
    if (!match) {
        throw new Error("Invalid image data URL format");
    }
    const mimeType = match[1];
    const base64ImageData = match[2];

    const imagePart = {
        inlineData: {
            data: base64ImageData,
            mimeType: mimeType,
        },
    };
    const textPart = { text: prompt };

// 2. CORRECTION : On prépare les arguments pour notre assistant sécurisé
    const modelName = 'gemini-2.5-flash-image';
    // Le prompt pour invokeGeminiProxy doit être la structure complète `contents`
    const contents = [imagePart, textPart];
    const config = {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
    };

    // 3. L'APPEL CORRIGÉ : On n'utilise plus `ai`, mais notre fonction sécurisée
    const response = await invokeGeminiProxy(modelName, contents, config);

    // 4. Votre code pour lire la réponse reste le même, mais on ajoute des vérifications
    if (!response || !response.candidates || !response.candidates[0].content.parts) {
        throw new Error("La réponse de l'IA (editAlbumArt) est invalide.");
    }

    let newImage: string | null = null;
    let newText: string | null = null;

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            newImage = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        } else if (part.text) {
            newText = part.text;
        }
    }

    if (!newImage) {
        throw new Error("L'IA n'a pas retourné d'image modifiée.");
    }

    return { image: newImage, text: newText };
};

const complianceVerificationSchema = {
    type: Type.OBJECT,
    properties: {
        isCompliant: { type: Type.BOOLEAN },
        reason: { type: Type.STRING },
    },
    required: ["isCompliant", "reason"]
};

export const verifyGenerationCompliance = async (item: HistoryItem, settings: Settings, isCopied: boolean): Promise<{ isCompliant: boolean; reason: string }> => {
    
    const getUniqueParts = (parts: string[]): string[] => {
        const uniquePartTypes = new Set(parts.map(p => `[${p.replace(/\[|\]/g, '').replace(/\s*\d+\s*/, ' ').trim().toUpperCase()}]`));
        return Array.from(uniquePartTypes);
    };

    const uniquePartsDemandees = item.inputs.structure ? getUniqueParts(item.inputs.structure.parts) : [];

    const structureDemandee = item.inputs.structure 
        ? `2.  **Types de sections uniques DEMANDÉS :** \`${JSON.stringify(uniquePartsDemandees)}\``
        : `2.  **Structure DEMANDÉE :** Aucune`;

    const structureVerificationStep = item.inputs.structure 
        ? `
    **ÉTAPE 2 : VÉRIFICATION DE LA STRUCTURE**
    *   **Sous-étape 2.1 - Extraction :** Analyse les "Paroles PRODUITES". Extrais tous les en-têtes de section (ex: \`[INTRO]\`, \`[COUPLET 1]\`).
    *   **Sous-étape 2.2 - Normalisation :** Pour chaque en-tête extrait, ignore la casse et les numéros pour obtenir le type de section. Par exemple, \`[COUPLET 1]\`, \`[Couplet 2]\` et \`[couplet]\` deviennent tous le type \`[COUPLET]\`. Crée une liste des types de section uniques présents dans les paroles.
    *   **Sous-étape 2.3 - Comparaison :** Compare la liste des types de section présents à la liste des "Types de sections uniques DEMANDÉS".
    *   **Condition :** Est-ce que TOUS les types de section demandés sont présents dans les paroles produites ?
    *   **Action si FAUX :** La vérification s'arrête. Retourne IMMÉDIATEMENT le JSON suivant :
        \`{ "isCompliant": false, "reason": "La structure est incomplète. Au moins un type de section demandé (ex: Refrain, Pont) est manquant. Remboursement approuvé." }\`
    *   **Action si VRAI :** Passe à l'étape 3.
        `
        : `
    **ÉTAPE 2 : VÉRIFICATION DE LA STRUCTURE (non applicable)**
    *   **Condition :** Aucune structure de chanson n'a été demandée.
    *   **Action :** Passe à l'étape 3.
        `;

    const prompt = `
    Tu es un automate de contrôle qualité pour Lyr-IA, extrêmement rigoureux et littéral. Ta seule mission est d'exécuter une série de vérifications dans un ordre précis et de retourner un résultat JSON basé sur la PREMIÈRE règle qui s'applique. N'utilise aucune interprétation ou flexibilité.

    **Données fournies :**
    1.  **Contenu copié ?** : ${isCopied ? 'Oui' : 'Non'}
    ${structureDemandee}
    3.  **Paroles PRODUITES :**
        ---
        ${item.outputs.lyrics}
        ---

    ---
    **PROCESSUS DE VÉRIFICATION SÉQUENTIEL OBLIGATOIRE :**

    **ÉTAPE 1 : VÉRIFICATION DE LA COPIE**
    *   **Condition :** Le champ "Contenu copié ?" est-il "Oui" ?
    *   **Action si VRAI :** La vérification s'arrête. Retourne IMMÉDIATEMENT le JSON suivant :
        \`{ "isCompliant": true, "reason": "Le contenu a été copié, ce qui annule le droit au remboursement." }\`
    *   **Action si FAUX :** Passe à l'étape 2.

    ${structureVerificationStep}

    **ÉTAPE 3 : VÉRIFICATION DU FORMATAGE**
    *   **Condition :** Dans les "Paroles PRODUITES", y a-t-il du texte sur la même ligne qu'un en-tête de section (ex: \`[INTRO] hello world\`) ?
    *   **Action si VRAI :** La vérification s'arrête. Retourne IMMÉDIATEMENT le JSON suivant :
        \`{ "isCompliant": false, "reason": "Erreur de formatage (texte sur la même ligne qu'un titre de section). Remboursement approuvé." }\`
    *   **Action si FAUX :** Passe à l'étape 4.

    **ÉTAPE 4 : CONCLUSION**
    *   **Condition :** Si aucune des conditions de non-conformité précédentes n'a été remplie.
    *   **Action :** La génération est conforme. Retourne le JSON suivant :
        \`{ "isCompliant": true, "reason": "La génération respecte les critères de qualité demandés." }\`

    ---
    Fournis ta réponse sous la forme d'un objet JSON unique, sans aucune explication.
    `;

// 2. CORRECTION : On récupère 'modelName' et 'config'
    const { modelName, config } = getModelAndConfig(settings.aiModel);
    
    // 3. CORRECTION : On prépare la configuration finale pour l'appel
    const finalConfig = {
        ...config,
        responseMimeType: 'application/json',
        responseSchema: complianceVerificationSchema,
    };
    
    // 4. CORRECTION : On utilise notre assistant sécurisé 'invokeGeminiProxy' au lieu de 'ai'
    const responseJson = await invokeGeminiProxy(
        modelName,
        prompt,
        finalConfig,
        'application/json'
    );

    // 5. CORRECTION : On lit la réponse JSON directement et on s'assure qu'elle est valide.
    if (responseJson && typeof responseJson.isCompliant === 'boolean' && typeof responseJson.reason === 'string') {
        return responseJson;
    }
    
    // Si la réponse est invalide, on lance une erreur claire.
    throw new Error("La réponse de l'IA (verifyGenerationCompliance) est invalide.");
};

export const rewritePhrase = async (phrase: string, language: string, context?: string): Promise<string> => {
    let prompt: string;

    if (context) {
        prompt = `
        Tu es un assistant d'écriture créatif expert pour un parolier.
        Ta mission est de réécrire une phrase spécifique au sein de paroles de chanson, en respectant le contexte.
        La nouvelle phrase doit être plus créative, évocatrice ou poétique, tout en préservant le sens principal de l'originale.

        RÈGLE CRUCIALE : La nouvelle phrase DOIT rimer avec les lignes environnantes pour maintenir la cohérence du texte. Analyse attentivement le schéma de rimes du contexte fourni.

        La langue de la chanson est : ${language}.

        Voici le contexte complet des paroles (la phrase à réécrire est marquée par des ***) :
        ---
        ${context}
        ---

        Phrase originale à réécrire : "${phrase}"

        Instruction de réponse : Fournis UNE SEULE alternative réécrite. Ne retourne QUE la nouvelle phrase, sans guillemets, sans explications, ni aucun autre texte.
        `;
    } else {
        prompt = `
        Tu es un assistant d'écriture créatif pour un parolier.
        Réécris la phrase suivante de manière plus créative, évocatrice ou poétique, tout en préservant son sens principal.
        La langue est : ${language}.
        Ne fournis qu'une seule alternative. N'ajoute aucun texte supplémentaire, aucune explication, ni de guillemets.

        Phrase originale : "${phrase}"

        Phrase réécrite :
        `;
    }
    
// 2. CORRECTION : On récupère 'modelName' et 'config'.
    const { modelName, config } = getModelAndConfig('gemini-2.5-flash-creative');
    
    // 3. CORRECTION : On utilise notre assistant sécurisé 'invokeGeminiProxy' au lieu de 'ai'.
    const response = await invokeGeminiProxy(
        modelName,
        prompt,
        config
    );

    // 4. CORRECTION : On lit la réponse correctement et on s'assure qu'elle existe.
    if (response && response.candidates && response.candidates[0].content.parts[0].text) {
        return response.candidates[0].content.parts[0].text.trim();
    }
    
    // Si la réponse est invalide, on lance une erreur claire.
    throw new Error("Impossible de réécrire la phrase, la réponse de l'IA est invalide.");
};

const marketingKitSchema = {
  type: Type.OBJECT,
  properties: {
    socialMediaPosts: {
      type: Type.OBJECT,
      properties: {
        instagram: {
          type: Type.OBJECT,
          properties: { text: { type: Type.STRING }, hashtags: { type: Type.STRING } },
        },
        twitter: {
          type: Type.OBJECT,
          properties: { text: { type: Type.STRING }, hashtags: { type: Type.STRING } },
        },
        tiktok: {
          type: Type.OBJECT,
          properties: { text: { type: Type.STRING }, hashtags: { type: Type.STRING } },
        },
      },
    },
    pressRelease: { type: Type.STRING },
    artistBio: { type: Type.STRING },
    visualIdeas: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
};

export const generateMarketingKit = async (lyrics: string, stylePrompt: string): Promise<MarketingKitData> => {
    const prompt = `
    Tu es un expert en marketing musical. Ta mission est de créer un kit promotionnel professionnel pour une chanson créée avec l'outil d'IA Lyr-IA.

    **RÈGLE FONDAMENTALE :** Le ton doit être professionnel et authentique. L'utilisateur de Lyr-IA est l'artiste/créateur. L'IA est son outil de création, un instrument puissant. Présente la chanson comme une nouvelle création de cet artiste, tout en étant subtilement transparent sur le processus innovant. L'objectif est de susciter la curiosité pour l'œuvre et l'artiste, en mentionnant l'IA comme un co-pilote créatif, pas comme le créateur principal. Ne présente JAMAIS la chanson comme une sortie officielle de l'artiste d'inspiration.

    Voici les informations sur la création :
    ---
    PAROLES (pour le thème, l'histoire, l'émotion) :
    ${lyrics}
    ---
    STYLE MUSICAL (pour l'inspiration, le genre, l'ambiance) :
    ${stylePrompt}
    ---

    Instructions :
    Génère le contenu suivant en te basant sur cette règle fondamentale et les informations fournies.

    1.  **Posts pour les Réseaux Sociaux (socialMediaPosts)** :
        *   **Instagram (instagram)** : Un post qui met en avant la vision artistique, en mentionnant subtilement le processus. Ex: "Nouveau morceau ! Inspiré par l'univers de [artiste d'inspiration], j'ai exploré de nouvelles textures sonores. Créé en collaboration avec l'IA de Lyr-IA. Lien en bio !".
        *   **Twitter (twitter)** : Un tweet concis pour partager le morceau, en soulignant l'aspect créatif. Ex: "Nouveau son ! Une exploration dans le style de [style], où j'ai utilisé l'IA pour repousser les limites de ma créativité. #NewMusic #AIassisted".
        *   **TikTok (tiktok)** : Une idée de post qui intrigue. Ex: "Ma version d'un morceau de [artiste d'inspiration] sur le thème de [thème], avec une touche d'IA. 🎶 Qu'en pensez-vous ?".
        *   Pour chaque réseau, inclus des hashtags pertinents comme **#NewMusic, #AIassisted, #LyrIA, #MusicProduction, #CreativeTech, #InspiredBy...**

    2.  **Communiqué de Presse (pressRelease)** :
        *   Un court paragraphe annonçant la sortie du nouveau single du "créateur". Il doit décrire le son et le thème, en mentionnant que l'artiste "utilise des outils d'IA innovants pour augmenter sa palette créative et donner vie à ses visions". Le ton doit être celui d'un vrai communiqué pour un artiste indépendant.

    3.  **Biographie d'Artiste (artistBio)** :
        *   Une courte biographie qui présente le **créateur/utilisateur de Lyr-IA** comme un artiste avant-gardiste. Ex: "Artiste visionnaire, [le créateur] fusionne des influences traditionnelles avec des technologies de pointe. À travers des outils comme Lyr-IA, il explore de nouvelles frontières sonores...". Utilise "le créateur" ou "l'artiste".

    4.  **Idées Visuelles (visualIdeas)** :
        *   Une liste de 3 à 5 idées concrètes et créatives pour un clip vidéo ou des visuels, inspirées des paroles et de l'ambiance, qui peuvent intégrer subtilement l'idée de collaboration homme-machine si cela est pertinent.

    Retourne le résultat sous la forme d'un objet JSON unique. N'inclus aucun autre texte ou explication.
    `;

// 2. CORRECTION : On récupère 'modelName' et 'config'.
    const { modelName, config } = getModelAndConfig('gemini-2.5-flash-creative');

    // 3. CORRECTION : On prépare la configuration finale pour l'appel.
    const finalConfig = {
        ...config,
        responseMimeType: 'application/json',
        responseSchema: marketingKitSchema,
    };
    
    // 4. CORRECTION : On utilise notre assistant sécurisé 'invokeGeminiProxy' au lieu de 'ai'.
    const responseJson = await invokeGeminiProxy(
        modelName,
        prompt,
        finalConfig,
        'application/json'
    );

    // 5. CORRECTION : On lit la réponse JSON directement et on s'assure qu'elle est valide.
    if (responseJson && responseJson.socialMediaPosts) {
        return responseJson;
    }
    
    // Si la réponse est invalide, on lance une erreur claire.
    throw new Error("La réponse de l'IA (generateMarketingKit) est invalide.");
};

export const generateSongTitle = async (lyrics: string, stylePrompt: string, language: string): Promise<string> => {
    const prompt = `
    Basé sur les paroles et le style musical suivants, génère UN seul titre de chanson créatif et concis dans la langue : ${language}.
    Le titre doit capturer l'essence de la chanson.
    Réponds UNIQUEMENT avec le titre, sans guillemets, sans préfixe comme "Titre :", ni aucun autre texte.

    Paroles :
    ---
    ${lyrics}
    ---
    Style musical :
    ---
    ${stylePrompt}
    ---

    Titre de la chanson :
    `;
// 2. CORRECTION : On récupère 'modelName' et 'config'.
    const { modelName, config } = getModelAndConfig('gemini-2.5-flash-concise');
    
    // 3. CORRECTION : On utilise notre assistant sécurisé 'invokeGeminiProxy' au lieu de 'ai'.
    const finalConfig = { ...config };
    const response = await invokeGeminiProxy(
        modelName,
        prompt,
        finalConfig,
        'text/plain'
    );

    // 4. CORRECTION : On lit la réponse correctement et on s'assure qu'elle existe.
    if (response && typeof response === 'string') {
        return response.trim().replace(/"/g, ''); // Trim and remove quotes just in case
    }
    
    // Si la réponse est un objet JSON avec le texte, on l'extrait
    if (response && response.candidates && response.candidates[0]?.content?.parts?.[0]?.text) {
        return response.candidates[0].content.parts[0].text.trim().replace(/"/g, '');
    }
    
    // Si la réponse est invalide, on lance une erreur claire.
    throw new Error("Impossible de générer le titre de la chanson, la réponse de l'IA est invalide.");
};
