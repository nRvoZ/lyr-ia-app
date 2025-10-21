import { Artist } from '../src/types';

export const ARTISTS: Artist[] = [
  { name: '21 Savage', genres: 'Hip Hop, Trap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'adlibs-murmured-flow', name: 'Ad-libs & Flow Murmuré', description: "Un flow impassible, presque chuchoté, avec des ad-libs caractéristiques ('21', 'On God').", promptInstruction: "Le prompt doit décrire un beat trap sombre et menaçant, avec une performance vocale monocorde, presque murmurée, et des ad-libs fréquents comme '21' ou 'On God'.", lyricInstruction: "Intègre des ad-libs comme (21), (On God), (Pussy) entre les lignes." }] },
  { name: 'A-ha', genres: 'Synth-pop, New Wave', suggestedStructureValue: 'pop-full-prechorus', specialTraits: [{ id: 'synth-pop-falsetto', name: 'Falsetto Synth-Pop', description: "Utilise une voix de fausset aiguë et claire, particulièrement dans les refrains, sur des arrangements de synth-pop.", promptInstruction: "Le prompt doit décrire une performance vocale masculine avec un fausset puissant et éthéré dans les refrains, sur une production synth-pop des années 80 avec des synthétiseurs et des boîtes à rythmes proéminents.", lyricInstruction: "Le refrain doit être chanté dans un fausset aigu et mémorable. Marque ces sections avec [high-falsetto]." }] },
  { name: 'A$AP Rocky', genres: 'Hip Hop, Cloud Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'cloud-rap-ambiance', name: 'Ambiance Cloud Rap', description: "Une production vaporeuse et psychédélique avec un flow décontracté.", promptInstruction: "Le prompt doit décrire une production cloud rap brumeuse et atmosphérique avec des nappes de synthé psychédéliques, un tempo lent, et un flow vocal doux et décontracté.", lyricInstruction: "Les paroles doivent aborder les thèmes de la mode, du luxe et des expériences psychédéliques." }] },
  { name: 'ABBA', genres: 'Pop, Disco', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'choral-harmonies-pop', name: 'Harmonies Vocales Superposées', description: "Crée des harmonies vocales riches et complexes, avec plusieurs voix superposées pour un effet choral.", promptInstruction: "Le prompt doit décrire un morceau pop avec des harmonies vocales féminines et masculines riches et superposées, particulièrement dans les refrains, créant un son ample et euphorique.", lyricInstruction: "Les refrains doivent comporter des harmonies complexes en arrière-plan. Marque ces passages avec [choral-harmonies]." }] },
  { name: 'AC/DC', genres: 'Hard Rock, Rock and Roll', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'raspy-vocals', name: 'Voix Éraillée Puissante', description: "Utilise une voix aiguë et puissamment éraillée, typique du hard rock.", promptInstruction: "Le prompt doit décrire une performance vocale principale aiguë, perçante et éraillée, pleine d'énergie rock 'n' roll.", lyricInstruction: "Les paroles doivent être délivrées avec une énergie brute. Marque les passages particulièrement intenses avec le tag [power-vocals]." }] },
  { name: '50 Cent', genres: 'Hip Hop, Gangsta Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'mumbled-confident-flow', name: 'Flow Confiant & Marmonné', description: "Un flow décontracté, confiant et légèrement marmonné, avec une articulation caractéristique.", promptInstruction: "Le prompt doit décrire un beat hip-hop classique de la côte Est avec une livraison vocale masculine légèrement marmonnée, nonchalante mais pleine d'assurance.", lyricInstruction: "Les paroles doivent être délivrées avec un ton confiant et une cadence décontractée." }] },
  { name: 'Adele', genres: 'Pop, Soul', suggestedStructureValue: 'ballad-instrumental-bridge', specialTraits: [{ id: 'power-belting-vocals', name: 'Voix Puissante / Belting', description: "Des refrains interprétés avec une voix de poitrine puissante et beaucoup d'émotion.", promptInstruction: "Le prompt doit décrire une ballade au piano avec une performance vocale féminine puissante, une large gamme dynamique et des refrains chantés avec une technique de 'belting' émotive.", lyricInstruction: "Les refrains doivent être délivrés avec puissance et émotion. Marque le climax vocal avec [power-belt]." }] },
  { name: 'Alain Bashung', genres: 'French Rock, Chanson', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'dark-poetic-rock', name: 'Rock Poétique & Sombre', description: "Un style parlé-chanté sur des instrumentations rock sombres, avec des paroles poétiques et surréalistes.", promptInstruction: "Le prompt doit décrire un morceau de rock français sombre et atmosphérique, avec une voix masculine grave qui alterne entre chant et spoken word, livrant des paroles poétiques et énigmatiques.", lyricInstruction: "Les paroles doivent être très imagées, poétiques, et livrées avec une gravité théâtrale. Marque les passages parlés avec [spoken-word]." }] },
  { name: 'Alanis Morissette', genres: 'Alternative Rock, Post-Grunge', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'raw-emotional-vocals', name: 'Voix Émotionnelle & Brute', description: "Une performance vocale puissante et brute, pleine d'émotion, qui passe de la vulnérabilité à la colère.", promptInstruction: "Le prompt doit décrire une performance vocale féminine très dynamique, alternant entre des couplets calmes et des refrains puissants et passionnés, sur une base de rock alternatif des années 90.", lyricInstruction: "Les paroles doivent être introspectives et directes, exprimant des émissions fortes. La livraison vocale doit être intense. Marque les passages les plus puissants avec [power-vocals]." }] },
  { name: 'Amy Winehouse', genres: 'Soul, R&B, Jazz', suggestedStructureValue: 'aaba-classic', specialTraits: [{ id: 'jazz-soul-vocals', name: "Voix Soul & Phrasé Jazz", description: "Utilise une voix de contralto profonde et puissante avec un phrasé et des inflexions inspirés du jazz.", promptInstruction: "Le prompt doit décrire une performance vocale de contralto, émotive et soulful, avec des mélodies complexes et un phrasé typique du jazz, sur un fond de R&B rétro.", lyricInstruction: "Les paroles doivent être introspectives, traitant de l'amour, du chagrin ou de la dépendance. La performance vocale doit être pleine d'âme. Marque les passages particulièrement expressifs avec [soulful-run]." }] },
  { name: 'Angèle', genres: 'Pop, Electropop', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'spoken-sung-delivery', name: 'Style Parlé-Chanté', description: "Alterne entre le chant doux et un style plus parlé, conversationnel.", promptInstruction: "Le prompt doit décrire un morceau électropop moderne avec une voix féminine qui alterne entre chant doux et un style plus parlé, conversationnel, souvent avec une pointe d'ironie.", lyricInstruction: "Incorpore des sections de 'spoken-word' ou des phrases conversationnelles. Marque ces passages avec [spoken-verse]." }] },
  { name: 'Aphex Twin', genres: 'IDM, Electronic, Ambient', suggestedStructureValue: 'post-rock-ambient', specialTraits: [{ id: 'idm-glitch-beats', name: 'Rythmes Glitch & IDM', description: "Crée des rythmes électroniques complexes, déconstruits et imprévisibles (glitch) avec des mélodies ambiantes et inquiétantes.", promptInstruction: "Le prompt doit décrire un morceau IDM (Intelligent Dance Music) avec des boîtes à rythmes complexes, des 'glitches' et des micro-samples, combinés à des nappes de synthétiseur ambiantes et parfois dissonantes.", lyricInstruction: "" }] },
  {
    name: 'Arch Enemy',
    genres: 'Melodic Death Metal',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'female-death-growls',
        name: 'Chant Death Metal Féminin',
        description: "Utilise un chant guttural (growl) puissant et agressif, interprété par une voix féminine, contrastant avec les mélodies de guitare.",
        promptInstruction: "Le prompt doit spécifier une performance vocale féminine utilisant une technique de chant guttural ('death growl'), agressive et puissante. Le contraste avec les guitares mélodiques doit être souligné.",
        lyricInstruction: "Les paroles doivent être livrées avec une agressivité contrôlée. Marque les passages les plus intenses avec [power-growl]."
      },
      {
        id: 'dual-melodic-guitar-solos',
        name: 'Duels de Guitares Mélodiques',
        description: "Incorpore des solos de guitare virtuoses avec deux guitares qui s'harmonisent et se répondent, créant des mélodies complexes et rapides.",
        promptInstruction: "Le prompt doit décrire des solos de guitare électrique avec deux guitares en harmonie ('twin-guitar harmonies'), jouant des lignes mélodiques rapides et techniques sur un fond de metal lourd.",
        lyricInstruction: "La chanson doit inclure une section de solo de guitare complexe. Marque cette section avec [twin-guitar-solo]."
      }
    ]
  },
  { name: 'Arctic Monkeys', genres: 'Indie Rock, Post-Punk Revival', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'lyrical-storytelling', name: 'Narration Lyrique Détaillée', description: "Des paroles denses et pleines d'esprit qui racontent une histoire vivide.", promptInstruction: "Le prompt doit décrire un morceau indie rock avec une ligne de basse proéminente, des riffs de guitare secs, et une livraison vocale volubile et spirituelle qui raconte une histoire détaillée.", lyricInstruction: "Les paroles doivent peindre une scène ou un personnage de manière vivide, avec des jeux de mots intelligents et des détails spécifiques." }] },
  { name: 'Aretha Franklin', genres: 'Soul, R&B, Gospel', suggestedStructureValue: 'ballad-instrumental-bridge', specialTraits: [{ id: 'gospel-soul-power', name: 'Puissance Soul & Gospel', description: "Une performance vocale puissante et passionnée, imprégnée de l'émotion du gospel, avec des chœurs en arrière-plan.", promptInstruction: "Le prompt doit décrire une performance vocale féminine principale puissante et pleine d'âme, avec des influences gospel, soutenue par un piano, une section de cuivres et des chœurs.", lyricInstruction: "La livraison doit être passionnée et émotive, avec des notes tenues puissantes." }] },
  { name: 'A Tribe Called Quest', genres: 'Hip Hop, Jazz Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'jazz-rap-samples', name: 'Flow Jazz Rap & Samples', description: "Un flow décontracté et conversationnel sur des beats construits autour de samples de jazz.", promptInstruction: "Le prompt doit décrire un beat hip-hop boom-bap avec des samples de jazz proéminents (contrebasse, piano, cuivres) et un flow de rap doux et décontracté.", lyricInstruction: "Les paroles doivent être positives, sociales ou narratives, avec un ton conversationnel." }] },
  { name: 'Aya Nakamura', genres: 'Pop, R&B, Afrobeats', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'afrobeats-slang', name: 'Afrobeats & Argot Parisien', description: "Utilise des expressions et de l'argot français moderne sur des rythmes Afrobeats.", promptInstruction: "Le prompt doit décrire un morceau pop infusé d'Afrobeats avec une voix féminine assurée et mélodique utilisant du français et de l'argot parisien.", lyricInstruction: "Utilise de l'argot français moderne et des expressions comme 'djadja' ou 'pookie'." }] },
  { name: 'B.B. King', genres: 'Blues', suggestedStructureValue: 'aaba-classic', specialTraits: [{ id: 'blues-guitar-lucille', name: 'Guitare Blues Expressive', description: "Incorpore des licks de guitare blues courts, expressifs et pleins d'émotion, qui répondent à la voix.", promptInstruction: "Le prompt doit décrire un morceau de blues avec une guitare électrique au son clair et chaud, jouant des solos et des licks mélodiques et expressifs (vibrato, bends) entre les phrases vocales.", lyricInstruction: "Laisse de l'espace entre les lignes vocales pour des réponses de guitare. Marque ces espaces avec [guitar-fill]." }] },
  { name: 'Beastie Boys', genres: 'Hip Hop, Rap Rock', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'shouted-rap-trio', name: 'Trio de Rap Énergique', description: "Trois voix de rap distinctes qui s'échangent les lignes de manière énergique, souvent en criant.", promptInstruction: "Le prompt doit décrire un morceau de rap-rock avec des voix multiples qui s'échangent les rimes de manière rapide et énergique, souvent avec des ad-libs et des cris en arrière-plan.", lyricInstruction: "Écris les paroles pour qu'elles puissent être échangées entre plusieurs rappeurs, avec beaucoup d'énergie. Utilise des ad-libs comme (Yeah!) ou (What!)." }] },
  { name: 'Beck', genres: 'Alternative Rock, Indie', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'eclectic-genre-mashup', name: 'Fusion Éclectique & Lo-fi', description: "Fusionne différents genres (folk, hip-hop, rock) avec une esthétique souvent lo-fi et expérimentale.", promptInstruction: "Le prompt doit décrire une fusion inattendue de genres, comme du folk acoustique avec un breakbeat hip-hop, ou du rock alternatif avec des samples et des bruits électroniques, le tout avec une production légèrement lo-fi.", lyricInstruction: "Les paroles doivent être surréalistes, ironiques et pleines d'images inattendues." }] },
  { name: 'BEN plg', genres: 'French Rap, Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'raw-introspective-narrative', name: 'Narration Brute & Introspective', description: "Un flow direct et sincère qui raconte des histoires de la vie de tous les jours avec une touche de mélancolie.", promptInstruction: "Le prompt doit décrire un beat de rap français introspectif et légèrement mélancolique, avec une voix masculine directe et narrative, sans fioritures.", lyricInstruction: "Les paroles doivent raconter une histoire personnelle ou une observation du quotidien, avec des détails précis et un ton sincère." }] },
  { name: 'Benjamin Biolay', genres: 'Chanson, Pop, Rock', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'neo-chanson-whispered-vocals', name: 'Chanson Néo-Classique & Voix Murmurée', description: "Une voix grave et murmurée sur des arrangements orchestraux riches (cordes, piano), avec des paroles poétiques et mélancoliques.", promptInstruction: "Le prompt doit décrire un arrangement de chanson française moderne et luxuriant, avec des cordes, du piano et une section rythmique subtile. La voix masculine principale doit être grave, intime et murmurée.", lyricInstruction: "Les paroles doivent être littéraires, poétiques et souvent mélancoliques, sur des thèmes comme l'amour, la rupture ou la nostalgie." }] },
  { name: 'Beyoncé', genres: 'R&B, Pop', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'vocal-runs-harmonies', name: 'Vocalises & Harmonies', description: "Incorpore des harmonies vocales complexes et des vocalises impressionnantes.", promptInstruction: "Le prompt doit décrire un morceau R&B/pop puissant avec des harmonies vocales complexes, des ad-libs, et des vocalises (runs) impressionnantes.", lyricInstruction: "Inclus des vocalises complexes et des ad-libs. Marque les passages avec [vocal-run]." }] },
  { name: 'Bigflo & Oli', genres: 'French Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'storytelling-fast-flow-duo', name: 'Duo Narratif & Flow Rapide', description: "Un duo de rap qui raconte une histoire détaillée, souvent avec des sections de flow très rapide et technique.", promptInstruction: "Le prompt doit décrire un morceau de rap français avec deux voix distinctes qui se répondent pour raconter une histoire, incluant des passages où le débit de parole devient très rapide et articulé.", lyricInstruction: "Les paroles doivent raconter une histoire claire. Inclus une section de rap rapide. Marque cette section avec [fast-flow]." }] },
  { name: 'Billie Eilish', genres: 'Alt-Pop, Electropop', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'whisper-vocals', name: 'Voix Chuchotée / ASMR', description: "Intègre des passages avec une voix douce, chuchotée et proche du micro.", promptInstruction: "Le prompt doit spécifier une performance vocale intime, avec des sections chuchotées (whisper vocals) et une production minimaliste pour un effet ASMR.", lyricInstruction: "Intègre des lignes ou des sections entières chantées d'une voix très douce et aérée. Marque ces passages avec le tag [whisper-vocals]." }] },
  { name: 'Björk', genres: 'Art Pop, Electronic, Experimental', suggestedStructureValue: 'progressive-interlude-solo', specialTraits: [{ id: 'experimental-art-pop-vocals', name: 'Vocaux Art Pop Expérimental', description: "Une performance vocale unique et expressive, avec des changements de ton soudains et une grande liberté mélodique.", promptInstruction: "Le prompt doit décrire un morceau art pop expérimental avec des arrangements électroniques et orchestraux inattendus, et une voix féminine très expressive et unique, qui explore toute sa tessiture.", lyricInstruction: "Les paroles doivent être poétiques et abstraites, souvent sur des thèmes de la nature ou de la technologie." }] },
  { name: 'Black Sabbath', genres: 'Heavy Metal', suggestedStructureValue: 'metal-breakdown-solo', specialTraits: [{ id: 'doom-metal-riffs', name: 'Riffs Doom Metal', description: "Crée des riffs de guitare lents, lourds et sombres, avec une sonorité de guitare distordue.", promptInstruction: "Le prompt doit décrire un morceau de heavy metal avec des riffs de guitare lents, lourds et menaçants, utilisant des power chords et une forte distorsion, créant une atmosphère de 'doom'.", lyricInstruction: "Les paroles doivent aborder des thèmes sombres comme l'occulte, la guerre ou la folie." }] },
  { name: 'Blur', genres: 'Britpop, Alternative Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'britpop-attitude', name: 'Attitude Britpop', description: "Des paroles pleines d'esprit et d'ironie sur la vie britannique, livrées avec un accent anglais marqué.", promptInstruction: "Le prompt doit décrire un morceau de britpop entraînant avec des guitares énergiques, une ligne de basse mélodique, et une performance vocale masculine pleine de caractère et d'attitude, avec un accent britannique prononcé.", lyricInstruction: "Les paroles doivent être une observation sociale ironique, souvent du point de vue d'un personnage." }] },
  { name: 'Boards of Canada', genres: 'IDM, Electronic, Downtempo', suggestedStructureValue: 'post-rock-ambient', specialTraits: [{ id: 'nostalgic-lofi-synths', name: 'Synthés Nostalgiques & Lo-fi', description: "Une ambiance mélancolique et hypnotique avec des synthés analogiques désaccordés.", promptInstruction: "Le prompt doit décrire un morceau IDM avec une sensation vintage et lo-fi, utilisant des mélodies de synthétiseurs analogiques désaccordés, des samples de voix d'enfants ou de nature, et une atmosphère hypnotique et mélancolique.", lyricInstruction: "" }] },
  { name: 'Bob Marley', genres: 'Reggae, Ska', suggestedStructureValue: 'folk-storytelling', specialTraits: [{ id: 'protest-lyrics', name: 'Paroles Spirituelles / Engagées', description: "Génère des paroles sur des thèmes de justice sociale, de spiritualité et d'unité.", promptInstruction: "Le prompt doit évoquer un style reggae roots, avec des thèmes lyriques de protestation, d'amour universel et de spiritualité Rastafari.", lyricInstruction: "Les paroles doivent se concentrer sur des messages d'espoir, de lutte contre l'oppression ou de spiritualité. Évite les sujets superficiels." }] },
  { name: 'Bon Iver', genres: 'Indie Folk, Art Pop', suggestedStructureValue: 'folk-storytelling', specialTraits: [{ id: 'ethereal-falsetto-folk', name: 'Falsetto Éthéré & Textures Folk', description: "Utilise une voix de fausset superposée plusieurs fois pour créer un effet de chœur éthéré, sur des textures acoustiques et électroniques.", promptInstruction: "Le prompt doit décrire un morceau de folk atmosphérique et expérimental, avec une voix masculine en fausset superposée plusieurs fois, créant des paysages sonores éthérés et émouvants.", lyricInstruction: "Les paroles doivent être abstraites, poétiques et introspectives. Le chant principal doit être en fausset." }] },
  { name: 'Bon Jovi', genres: 'Hard Rock, Glam Metal', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'arena-rock-anthem', name: 'Hymne Arena Rock', description: "Crée un refrain massif et fédérateur, facile à chanter en chœur, typique du rock de stade.", promptInstruction: "Le prompt doit décrire un morceau de hard rock avec un refrain puissant, hymnique et facile à chanter, avec des guitares électriques proéminentes et des chœurs de 'whoa-oh' ou de 'gang vocals'.", lyricInstruction: "Le refrain doit être simple et entraînant, conçu pour être chanté par une foule. Inclus une section de [gang-vocals]." }] },
  { name: 'Booba', genres: 'French Rap, Trap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'dark-trap-punchlines', name: 'Trap Sombre & Punchlines', description: "Une voix grave et autoritaire qui délivre des punchlines percutantes.", promptInstruction: "Le prompt doit décrire un beat trap sombre et lourd avec une voix de rap masculine grave et autoritaire, délivrant des punchlines percutantes avec un flow assuré et nonchalant.", lyricInstruction: "Concentre-toi sur des punchlines fortes, impactantes et un ton confiant." }] },
  { name: 'Britney Spears', genres: 'Pop, Dance-pop', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'vocal-fry-pop', name: 'Voix Pop & Vocal Fry', description: "Utilise une voix pop jeune et légèrement nasale, avec des fins de phrases marquées par du 'vocal fry' (grésillement vocal).", promptInstruction: "Le prompt doit décrire une production dance-pop entraînante avec une voix féminine principale qui utilise une technique de 'vocal fry' distinctive pour une texture soufflée et stylisée.", lyricInstruction: "La performance vocale doit être rythmée et séduisante, avec une texture légèrement 'éraillée' sur certaines syllabes. Marque ces passages avec (vocal-fry)." }] },
  { name: 'Bruce Springsteen', genres: 'Rock, Heartland Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'heartland-rock-storytelling', name: 'Narration Heartland Rock', description: "Raconte des histoires poignantes sur la vie de la classe ouvrière américaine, l'espoir et la désillusion.", promptInstruction: "Le prompt doit décrire un morceau de rock avec une voix masculine passionnée et éraillée, racontant une histoire sur des personnages de la classe ouvrière, avec du piano, de l'harmonica et une guitare électrique.", lyricInstruction: "Les paroles doivent être une narration détaillée à la troisième personne, centrée sur des thèmes de travail, de rêves et de la réalité de la vie américaine." }] },
  { name: 'Busta Rhymes', genres: 'Hip Hop, East Coast Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'fast-flow', name: 'Busta Rhymes Flow', description: 'Active une section de rap énergique et hyper-rapide.', promptInstruction: "Le prompt doit décrire une livraison vocale énergique, presque chaotique, avec une articulation percussive et une section de rap hyper-rapide.", lyricInstruction: "Tu DOIS inclure une section de rap très rapide et énergique, avec une forte cadence. Marque le début de cette section avec le tag [fast-flow]." }] },
  { name: 'Cardi B', genres: 'Hip Hop, Trap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'aggressive-charismatic-flow', name: 'Flow Agressif & Charismatique', description: "Un flow plein de personnalité et d'attitude, avec des ad-libs ('Okurrr').", promptInstruction: "Le prompt doit décrire un beat trap moderne avec une livraison de rap féminin charismatique et agressive, pleine de personnalité, d'ad-libs ('Okurrr') et d'humour.", lyricInstruction: "La livraison doit être assurée et pleine d'attitude. Inclus des ad-libs comme (Okurrr!)." }] },
  { name: 'Céline Dion', genres: 'Pop, Ballad', suggestedStructureValue: 'ballad-instrumental-bridge', specialTraits: [{ id: 'power-ballad-vocals', name: 'Voix de Power Ballade', description: "Une performance vocale techniquement parfaite, avec une montée en puissance émotionnelle et des notes tenues longuement.", promptInstruction: "Le prompt doit décrire une power ballade orchestrale avec une performance vocale féminine puissante et techniquement maîtrisée, montant en intensité jusqu'à un climax vocal spectaculaire avec des notes longues et puissantes.", lyricInstruction: "Les paroles doivent être romantiques et émotionnelles. Le pont ou le dernier refrain doit comporter une montée en puissance vocale. Marque la note la plus haute et tenue avec [power-note]." }] },
  { name: 'Chance the Rapper', genres: 'Hip Hop, Jazz Rap, Gospel Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'gospel-rap-choir', name: 'Rap Gospel & Chœurs', description: "Incorpore des chœurs de gospel et une instrumentation joyeuse pour un son hip-hop positif et spirituel.", promptInstruction: "Le prompt doit décrire un beat hip-hop avec des influences gospel, incluant un orgue, un piano et un chœur de gospel en arrière-plan. La performance vocale doit être joyeuse et mélodique.", lyricInstruction: "Les paroles doivent être optimistes et spirituelles. Inclus une section avec un chœur de gospel. Marque cette section avec [gospel-choir]." }] },
  {
    name: 'Charles Aznavour',
    genres: 'Chanson, Pop',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [{
        id: 'narrative-chanson',
        name: 'Chanson Narrative / Voix Émotive',
        description: "Adopte une voix expressive et légèrement éraillée pour raconter une histoire poignante et mélancolique, typique de la chanson française.",
        promptInstruction: "Le prompt doit décrire une performance vocale masculine très narrative et expressive, avec une texture légèrement éraillée et un vibrato caractéristique. L'ambiance doit être mélancolique et cinématographique, soutenue par une orchestration de chanson française classique (piano, cordes, accordéon).",
        lyricInstruction: "Les paroles doivent raconter une histoire détaillée à la première personne, explorant des thèmes comme la nostalgie, l'amour perdu, le temps qui passe ou des scènes de la vie parisienne. La narration doit être au cœur de la chanson."
    }]
  },
  { name: 'Cher', genres: 'Pop, Disco', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'contralto-autotune-pioneer', name: 'Voix Contralto & Autotune Pionnier', description: "Une voix de contralto profonde et distinctive, pouvant être combinée avec l'effet d'autotune popularisé par 'Believe'.", promptInstruction: "Le prompt doit décrire une production dance-pop avec soit une voix de contralto naturelle et puissante, soit une voix traitée avec un effet d'autotune proéminent et saccadé pour un son robotique.", lyricInstruction: "Les paroles doivent être sur l'émancipation ou la résilience. Pour l'effet autotune, marque la section avec [cher-autotune]." }] },
  { name: 'Childish Gambino', genres: 'Hip Hop, Funk, R&B', suggestedStructureValue: 'funk-jam', specialTraits: [{ id: 'genre-bending', name: 'Fusion Funk/Soul/Hip-Hop', description: "Passe du chant soul suave au rap énergique sur une instrumentation live.", promptInstruction: "Le prompt doit décrire un morceau qui fusionne funk, soul et hip-hop, avec une performance vocale polyvalente passant du chant doux au rap, avec une ligne de basse groovy et des instruments live.", lyricInstruction: "Alterne entre des sections chantées et rappées." }] },
  { name: 'Christine and the Queens', genres: 'Synth-pop, Indie Pop', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'androgynous-vocals-fr-en', name: 'Voix Androgyne & Franglais', description: "Une voix androgyne et émotive qui mélange des paroles en français et en anglais.", promptInstruction: "Le prompt doit décrire un morceau synth-pop minimaliste avec une performance vocale androgyne et émotive, mélangeant des paroles en français et en anglais, et mettant l'accent sur la chorégraphie et la théâtralité.", lyricInstruction: "Mélange des phrases en français et en anglais." }] },
  { name: 'Chuck Berry', genres: 'Rock and Roll', suggestedStructureValue: 'aaba-classic', specialTraits: [{ id: 'rock-n-roll-guitar-licks', name: 'Riffs & Licks Rock \'n\' Roll', description: "Un son rock and roll des années 50 mené par des riffs de guitare électrique simples, accrocheurs et basés sur le blues.", promptInstruction: "Le prompt doit décrire un morceau de rock and roll rapide avec un rythme de boogie-woogie et des riffs de guitare électrique emblématiques, incluant des 'double-stops'.", lyricInstruction: "Les paroles doivent raconter des histoires sur les voitures, les filles et la jeunesse." }] },
  { name: 'Clara Luciani', genres: 'Pop, Chanson', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'disco-chanson-francaise', name: 'Chanson Française Disco', description: "Une fusion de la chanson française poétique avec des rythmes disco et une voix grave et assurée.", promptInstruction: "Le prompt doit décrire un morceau de disco-pop français avec une ligne de basse funky, des arrangements de cordes et une voix féminine grave et charismatique.", lyricInstruction: "Les paroles doivent être poétiques et souvent sur des thèmes d'amour et d'indépendance." }] },
  { name: 'Coldplay', genres: 'Alternative Rock, Pop Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'anthemic-chorus', name: 'Refrain Fédérateur & Euphorique', description: "Un refrain massif et facile à chanter, avec des 'whoa-ohs' et un arrangement ample.", promptInstruction: "Le prompt doit décrire un morceau pop-rock qui monte d'un couplet calme à un refrain massif, euphorique et fédérateur avec du piano, des lignes de guitare exaltantes et des chœurs de 'whoa-oh'.", lyricInstruction: "Le refrain doit être simple, hymnique et facile à chanter. Inclus une section de [gang-vocals]." }] },
  {
    name: 'Collie Buddz',
    genres: 'Reggae, Dancehall',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'modern-dancehall-flow',
        name: 'Flow Dancehall Moderne & Ad-libs',
        description: "Un flow mélodique et énergique qui mélange chant et toasting, avec des ad-libs signature comme 'Woii yoii!'.",
        promptInstruction: "Le prompt doit décrire un riddim dancehall moderne et énergique, avec une performance vocale masculine qui mélange chant mélodique et toasting (chant parlé rythmique), incluant des ad-libs et exclamations fréquents.",
        lyricInstruction: "Intègre des ad-libs et des interjections énergiques comme (Woii yoii!) ou (Brrr) au début ou entre les lignes pour un style dancehall authentique."
      },
      {
        id: 'ganja-anthems',
        name: 'Hymnes à la Ganja',
        description: "Se concentre sur le thème de la marijuana, avec une approche positive et décontractée, typique des 'ganja tunes'.",
        promptInstruction: "Le prompt doit évoquer une ambiance reggae/dancehall décontractée et positive. Les thèmes lyriques doivent se concentrer sur la célébration de la marijuana (ganja anthem).",
        lyricInstruction: "Les paroles doivent célébrer la marijuana de manière positive, en parlant de ses bienfaits, de sa culture ou simplement du plaisir de fumer. Utilise un vocabulaire spécifique (sensimilla, chalice, etc.)."
      },
      {
        id: 'riddim-rider-vocal-fx',
        name: '"Riddim Rider" & Effets Vocaux',
        description: "Utilise des effets vocaux modernes (reverb, delay, autotune subtil) et un flow qui 'surfe' parfaitement sur le rythme (riddim).",
        promptInstruction: "Le prompt doit spécifier une production reggae/dancehall moderne avec une ligne de basse lourde. La voix masculine doit être traitée avec des effets modernes comme une reverb subtile, des delays rythmés, et un léger autotune pour un son poli et actuel.",
        lyricInstruction: "La livraison doit être très rythmique et suivre la cadence du beat de près. Le style doit être fluide et sembler sans effort."
      }
    ]
  },
  { name: 'Common', genres: 'Conscious Hip Hop, Jazz Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'conscious-jazz-rap', name: 'Rap Conscient & Jazzy', description: "Un flow de rap doux et réfléchi sur des productions hip-hop soulful et jazzy, avec des paroles socialement conscientes.", promptInstruction: "Le prompt doit décrire un beat de jazz-rap avec des samples de piano ou de cuivres, et un flow de rap masculin doux et poétique avec des paroles conscientes.", lyricInstruction: "Les paroles doivent aborder des thèmes sociaux, l'amour ou l'introspection avec une approche poétique." }] },
  { name: 'Creedence Clearwater Revival', genres: 'Rock, Swamp Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'swamp-rock-sound', name: 'Sonorité "Swamp Rock"', description: "Un son rock brut et direct avec une guitare au son 'twangy' et une voix éraillée, évoquant le bayou du sud des États-Unis.", promptInstruction: "Le prompt doit décrire un morceau de rock avec une guitare électrique au son clair et 'twangy', un rythme simple et entraînant, et une voix masculine puissante et éraillée.", lyricInstruction: "Les paroles doivent être simples et directes, souvent sur des thèmes de la vie rurale ou des voyages." }] },
  { name: 'Curtis Mayfield', genres: 'Soul, Funk, R&B', suggestedStructureValue: 'funk-jam', specialTraits: [{ id: 'falsetto-soul-social-commentary', name: 'Soul Engagée & Falsetto', description: "Une voix de fausset douce et planante livrant des paroles de commentaire social sur des arrangements funk et soul orchestraux.", promptInstruction: "Le prompt doit décrire un morceau de funk/soul avec des arrangements de cordes et de cuivres luxuriants, et une performance vocale masculine principalement en fausset, douce et émotive.", lyricInstruction: "Les paroles doivent aborder des thèmes sociaux comme les droits civiques et la pauvreté." }] },
  { name: 'Cypress Hill', genres: 'West Coast Hip Hop, Latin Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'nasal-flow-psychedelic-beats', name: 'Flow Nasillard & Beats Psychédéliques', description: "Un flow de rap distinctif, aigu et nasal, sur des beats funky et psychédéliques avec des samples de funk et de rock.", promptInstruction: "Le prompt doit décrire un beat hip-hop funky et psychédélique de la côte Ouest, avec des boucles de samples hypnotiques et une voix de rap masculine aiguë et nasillarde.", lyricInstruction: "Les paroles doivent porter sur la culture du cannabis, la vie de rue à Los Angeles, avec un ton décontracté et confiant." }] },,
  // Film Score & Classical
  {
    name: 'Hans Zimmer',
    genres: 'Film Score, Orchestral, Electronic',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'epic-braaam',
        name: 'Inception "BRAAAM"',
        description: "Crée un son de cuivres massif, grave et distordu, popularisé dans ses bandes sonores épiques.",
        promptInstruction: "Le prompt doit décrire un morceau orchestral épique avec un son de cuivres massif, grave et percutant ('BRAAAM'), des percussions puissantes et des ostinatos de cordes.",
        lyricInstruction: "Instrumental. Utilise des sections comme [EPIC BUILDUP] ou [BRAAAM HIT] pour structurer."
      }
    ]
  },
  {
    name: 'John Williams',
    genres: 'Film Score, Orchestral',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'leitmotif-adventure-theme',
        name: 'Thème d\'Aventure Héroïque',
        description: "Crée un thème orchestral mémorable et héroïque avec une section de cuivres proéminente, dans le style de ses bandes originales de films.",
        promptInstruction: "Le prompt doit décrire un morceau orchestral avec un thème de fanfare de cuivres puissant et mémorable, des cordes tourbillonnantes et une ambiance d'aventure héroïque.",
        lyricInstruction: "Instrumental. Structure autour de [MAIN THEME] et [VARIATION]."
      }
    ]
  },
  {
    name: 'Ennio Morricone',
    genres: 'Film Score, Spaghetti Western',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'spaghetti-western-sound',
        name: 'Son Spaghetti Western',
        description: "Combine guitare 'twangy', sifflements, chœurs masculins, cloches et une orchestration dramatique pour une ambiance de western.",
        promptInstruction: "Le prompt doit décrire une bande son de western spaghetti avec une guitare électrique 'twangy' avec beaucoup de réverbération, des sifflements, des chœurs masculins épiques et des trompettes.",
        lyricInstruction: "Principalement instrumental, peut inclure des onomatopées ou des chœurs (ex: [MALE CHOIR 'Ah-ah-ahhh'])._."
      }
    ]
  },
  {
    name: 'Joe Hisaishi',
    genres: 'Film Score, Japanese Classical, Minimalist',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'ghibli-piano-orchestra',
        name: 'Piano & Orchestre style Ghibli',
        description: "Une mélodie de piano simple, émotive et nostalgique, soutenue par un orchestre à cordes luxuriant.",
        promptInstruction: "Le prompt doit décrire un morceau orchestral avec une mélodie de piano minimaliste et poignante au premier plan, et un arrangement de cordes luxuriant en arrière-plan, créant une atmosphère douce-amère et merveilleuse.",
        lyricInstruction: "Instrumental."
      }
    ]
  },
  {
    name: 'Vangelis',
    genres: 'Electronic, Ambient, Film Score',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'blade-runner-synthscape',
        name: 'Paysage Sonore Blade Runner',
        description: "Crée un paysage sonore électronique sombre et futuriste avec des synthétiseurs analogiques planants (Yamaha CS-80), une réverbération massive et des thèmes mélancoliques.",
        promptInstruction: "Le prompt doit décrire une bande son électronique néo-noir avec des nappes de synthétiseur analogique massives et planantes, des mélodies mélancoliques et une ambiance dystopique.",
        lyricInstruction: "Instrumental."
      }
    ]
  },
  // Country
  {
    name: 'Willie Nelson',
    genres: 'Outlaw Country, Folk',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'behind-the-beat-phrasing',
        name: 'Phrasé "Derrière le Temps"',
        description: "Un style de chant décontracté et conversationnel qui est intentionnellement légèrement en retard sur le rythme ('behind the beat').",
        promptInstruction: "Le prompt doit décrire une performance vocale masculine avec un phrasé décontracté, presque parlé, qui se place derrière le rythme, sur un fond de country acoustique.",
        lyricInstruction: "Les paroles doivent être narratives, avec une livraison vocale détendue."
      }
    ]
  },
  {
    name: 'Merle Haggard',
    genres: 'Country, Bakersfield Sound',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'bakersfield-sound',
        name: 'Son de Bakersfield',
        description: "Un son country brut avec une guitare électrique 'twangy' et des paroles sur la vie de la classe ouvrière.",
        promptInstruction: "Le prompt doit décrire un son de country 'Bakersfield' avec une guitare Fender Telecaster 'twangy' proéminente.",
        lyricInstruction: "Les paroles doivent raconter des histoires honnêtes sur le travail, la prison ou la fierté."
      }
    ]
  },
  {
    name: 'Patsy Cline',
    genres: 'Country, Nashville Sound',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'nashville-sound-crooning',
        name: 'Crooning du Nashville Sound',
        description: "Une voix de contralto riche et émotive sur des arrangements de country luxuriants avec des chœurs et des cordes.",
        promptInstruction: "Le prompt doit décrire une production 'Nashville Sound' avec des chœurs en arrière-plan ('oohs' et 'aahs') et des arrangements de cordes, avec une voix féminine de contralto puissante.",
        lyricInstruction: "Les paroles doivent porter sur le chagrin d'amour et la perte."
      }
    ]
  },
  {
    name: 'Loretta Lynn',
    genres: 'Country',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'honky-tonk-feminism',
        name: 'Féminisme Honky-Tonk',
        description: "Une voix country franche et puissante livrant des paroles audacieuses et féministes sur la vie des femmes.",
        promptInstruction: "Le prompt doit décrire un son de country honky-tonk, avec une voix féminine forte et des paroles franches.",
        lyricInstruction: "Les paroles doivent raconter une histoire du point de vue d'une femme forte, avec un ton direct et parfois combatif."
      }
    ]
  },
  // IDM / Electronic
  {
    name: 'Autechre',
    genres: 'IDM, Electronic, Experimental',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'generative-glitch-rhythms',
        name: 'Rythmes Glitch Génératifs',
        description: "Des rythmes électroniques extrêmement complexes, abstraits et en constante évolution, qui semblent générés par des algorithmes.",
        promptInstruction: "Le prompt doit décrire un morceau IDM avec des rythmes algorithmiques et 'glitchy', des textures sonores métalliques et une absence de mélodie traditionnelle.",
        lyricInstruction: "Instrumental."
      }
    ]
  },
  {
    name: 'Squarepusher',
    genres: 'IDM, Drum and Bass, Jazz Fusion',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'drill-n-bass-virtuosity',
        name: 'Virtuosité Drill \'n\' Bass',
        description: "Combine des breakbeats de drum and bass ultra-rapides et complexes ('drill 'n' bass') avec des lignes de basse jazz fusion virtuoses.",
        promptInstruction: "Le prompt doit décrire une fusion de drum and bass frénétique et de jazz fusion, avec une ligne de basse fretless virtuose.",
        lyricInstruction: "Instrumental."
      }
    ]
  },
  {
    name: 'Four Tet',
    genres: 'Electronic, Folktronica, Microhouse',
    suggestedStructureValue: 'edm-dance-drop',
    specialTraits: [
      {
        id: 'folktronica-samples',
        name: 'Samples Folktronica',
        description: "Combine des rythmes électroniques house avec des samples découpés d'instruments folk (harpe, guitare acoustique) et des voix éthérées.",
        promptInstruction: "Le prompt doit décrire un morceau de house mélodique avec des samples d'instruments acoustiques et des voix hachées.",
        lyricInstruction: "Principalement instrumental, utilise des samples vocaux comme instruments."
      }
    ]
  },
  {
    name: 'Burial',
    genres: 'Dubstep, Future Garage, Ambient',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'ghostly-garage-crackle',
        name: 'Garage Fantomatique & Craquements',
        description: "Un son dubstep atmosphérique avec des rythmes syncopés ('2-step'), des samples vocaux R&B pitchés, et des textures de craquement de vinyle et de pluie.",
        promptInstruction: "Le prompt doit décrire un morceau de future garage sombre et mélancolique, avec des rythmes 2-step, des samples vocaux fantomatiques et du bruit de craquement de vinyle.",
        lyricInstruction: "Utilise des samples de voix R&B courts et pitchés."
      }
    ]
  },
  // Metal
  {
    name: 'Sepultura',
    genres: 'Thrash Metal, Groove Metal, Brazilian',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'tribal-thrash-metal',
        name: 'Thrash Metal Tribal',
        description: "Fusionne des riffs de thrash et de groove metal avec des percussions tribales brésiliennes.",
        promptInstruction: "Le prompt doit décrire un morceau de groove metal avec des riffs lourds et des percussions tribales intenses.",
        lyricInstruction: "Les paroles doivent être politiques, sur des thèmes de l'oppression et de la culture."
      }
    ]
  },
  {
    name: 'Opeth',
    genres: 'Progressive Death Metal, Progressive Rock',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'light-dark-dynamics',
        name: 'Dynamique Clair/Obscur',
        description: "Alterne de manière abrupte entre des passages de folk acoustique avec un chant clair et des sections de death metal avec des growls.",
        promptInstruction: "Le prompt doit décrire une chanson avec des contrastes dynamiques extrêmes, alternant entre des sections acoustiques folk et des sections de death metal avec des 'death growls'.",
        lyricInstruction: "Alterne entre des paroles poétiques et mélancoliques (chant clair) et des paroles sombres et agressives ('growl'). Marque les sections avec [clean-vocals] et [growl-vocals]."
      }
    ]
  },
  {
    name: 'Dream Theater',
    genres: 'Progressive Metal',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'virtuosic-prog-solos',
        name: 'Solos Prog Virtuoses',
        description: "De longues compositions avec des signatures rythmiques complexes et des solos instrumentaux extrêmement techniques et virtuoses (guitare et clavier).",
        promptInstruction: "Le prompt doit décrire un morceau de metal progressif avec des solos de guitare et de clavier longs et virtuoses.",
        lyricInstruction: "Les paroles doivent être épiques et conceptuelles."
      }
    ]
  },
  // Soft Rock / Pop
  {
    name: 'Steely Dan',
    genres: 'Jazz Rock, Sophisti-Pop, Soft Rock',
    suggestedStructureValue: 'aaba-classic',
    specialTraits: [
      {
        id: 'complex-jazz-chords-pop',
        name: 'Accords Jazz Complexes & Pop',
        description: "Une production pop sophistiquée avec des harmonies de jazz complexes, des arrangements impeccables et des paroles cyniques.",
        promptInstruction: "Le prompt doit décrire un morceau de soft rock avec des accords de jazz complexes et une production très propre, avec des solos de guitare ou de saxophone.",
        lyricInstruction: "Les paroles doivent être des histoires cyniques et pleines d'esprit sur des personnages excentriques."
      }
    ]
  },
  {
    name: 'Billy Joel',
    genres: 'Pop Rock, Piano Rock',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'piano-man-storytelling',
        name: 'Narration au Piano',
        description: "Une chanson menée au piano qui raconte une histoire sur des personnages de la vie de tous les jours.",
        promptInstruction: "Le prompt doit décrire un morceau de piano rock avec une performance vocale narrative.",
        lyricInstruction: "Les paroles doivent raconter une histoire détaillée du point de vue d'un observateur."
      }
    ]
  },
  {
    name: 'The Carpenters',
    genres: 'Soft Pop, Adult Contemporary',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'lush-vocal-harmonies-pop',
        name: 'Harmonies Vocales Luxuriantes',
        description: "Une voix de contralto douce et parfaite sur des harmonies vocales luxuriantes et des arrangements orchestraux.",
        promptInstruction: "Le prompt doit décrire une ballade pop avec des arrangements de cordes et des harmonies vocales féminines complexes et superposées.",
        lyricInstruction: "Les paroles doivent porter sur des thèmes de l'amour et de la mélancolie."
      }
    ]
  },
  {
    name: 'Bee Gees',
    genres: 'Disco, Pop, Soul',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'disco-falsetto-harmonies',
        name: 'Harmonies en Falsetto Disco',
        description: "Des harmonies à trois voix avec un falsetto aigu proéminent sur des rythmes disco.",
        promptInstruction: "Le prompt doit décrire un morceau de disco avec des harmonies vocales masculines en falsetto.",
        lyricInstruction: "Le refrain doit être chanté en falsetto avec des harmonies."
      }
    ]
  },
  {
    name: 'Chic',
    genres: 'Disco, Funk, R&B',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'funky-guitar-groove',
        name: 'Guitare Rythmique Funky',
        description: "Un son disco-funk mené par une guitare rythmique percutante et 'funky', et une ligne de basse groovy.",
        promptInstruction: "Le prompt doit décrire un morceau de disco-funk avec une guitare rythmique 'staccato' et une ligne de basse proéminente.",
        lyricInstruction: "Les paroles doivent être sur la danse et la belle vie."
      }
    ]
  },
  // Punk / Hardcore
  {
    name: 'Fugazi',
    genres: 'Post-Hardcore, Alternative Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'dub-influenced-post-hardcore',
        name: 'Post-Hardcore & Influences Dub',
        description: "Un son post-hardcore avec des lignes de basse dub proéminentes, des guitares qui s'entremêlent et une éthique DIY.",
        promptInstruction: "Le prompt doit décrire un morceau de post-hardcore avec une ligne de basse inspirée du dub et des guitares dissonantes.",
        lyricInstruction: "Les paroles doivent être politiques et introspectives."
      }
    ]
  },
  {
    name: 'Minor Threat',
    genres: 'Hardcore Punk',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'straight-edge-hardcore',
        name: 'Hardcore "Straight Edge"',
        description: "Des chansons punk hardcore très courtes, rapides et agressives avec des paroles directes sur le mouvement 'straight edge'.",
        promptInstruction: "Le prompt doit décrire un morceau de hardcore punk rapide et brut.",
        lyricInstruction: "Les paroles doivent être courtes, directes et pleines de conviction."
      }
    ]
  },
  {
    name: 'Bad Brains',
    genres: 'Hardcore Punk, Reggae',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'hardcore-reggae-fusion',
        name: 'Fusion Hardcore & Reggae',
        description: "Alterne de manière abrupte entre des passages de hardcore punk ultra-rapides et des sections de reggae authentique.",
        promptInstruction: "Le prompt doit décrire une chanson qui alterne entre du hardcore punk et du reggae.",
        lyricInstruction: "Alterne entre des paroles agressives et des paroles spirituelles rastafari."
      }
    ]
  },
  {
    name: 'Dead Kennedys',
    genres: 'Punk Rock, Hardcore Punk',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'satirical-punk-vocals',
        name: 'Chant Punk Satirique',
        description: "Un son punk rock avec une guitare surf rock, et une voix aiguë et vibrante livrant des paroles satiriques et politiques.",
        promptInstruction: "Le prompt doit décrire un morceau de punk rock avec une voix masculine aiguë et théâtrale.",
        lyricInstruction: "Les paroles doivent être une satire politique caustique."
      }
    ]
  },
  {
    name: 'The Damned',
    genres: 'Punk Rock, Gothic Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'gothic-punk-transition',
        name: 'Transition Punk-Gothique',
        description: "Incarne la transition du punk rock rapide à un son plus sombre et gothique avec des claviers et une voix de baryton.",
        promptInstruction: "Le prompt doit décrire soit un morceau de punk rock rapide, soit un morceau de rock gothique avec des claviers et une voix de baryton.",
        lyricInstruction: "Les paroles peuvent être soit énergiques et rebelles, soit sombres et théâtrales."
      }
    ]
  },
  {
    name: 'Bauhaus',
    genres: 'Gothic Rock, Post-Punk',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'gothic-rock-baritone',
        name: 'Baryton Gothique & Guitare Texturée',
        description: "Un son post-punk sombre et théâtral avec des guitares texturées et une voix de baryton profonde et dramatique.",
        promptInstruction: "Le prompt doit décrire un morceau de rock gothique avec des guitares 'scratchy' et une voix masculine de baryton profonde.",
        lyricInstruction: "Les paroles doivent être sombres, poétiques et surréalistes."
      }
    ]
  },
  {
    name: 'Leonard Bernstein',
    genres: 'Classical, Broadway',
    suggestedStructureValue: 'queen-operatic-rhapsody',
    specialTraits: [
      {
        id: 'broadway-jazz-symphony',
        name: 'Symphonique & Jazz de Broadway',
        description: "Une fusion de musique symphonique classique avec des rythmes de jazz et la narration du théâtre musical de Broadway.",
        promptInstruction: "Le prompt doit décrire une pièce orchestrale qui fusionne des éléments symphoniques avec des rythmes de jazz et des thèmes de Broadway.",
        lyricInstruction: "Les paroles doivent raconter une histoire dramatique, souvent dans un contexte urbain."
      }
    ]
  },
  {
    name: 'George Strait',
    genres: 'Country, Neotraditional Country',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'neotraditional-country',
        name: 'Country Néotraditionnel',
        description: "Un son country qui revient aux racines du honky-tonk et du western swing, avec une voix douce et claire.",
        promptInstruction: "Le prompt doit décrire un morceau de country néotraditionnel avec violon et pedal steel guitar, et une voix masculine douce.",
        lyricInstruction: "Les paroles doivent être des histoires simples sur l'amour, la perte et la vie de cowboy."
      }
    ]
  },,
  {
    name: 'Aerosmith',
    genres: 'Hard Rock, Blues Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'blues-rock-swagger-scat',
        name: 'Swagger Blues-Rock & Scat',
        description: "Une performance vocale charismatique avec une attitude 'swagger', incluant des passages de scat (improvisation vocale rythmique).",
        promptInstruction: "Le prompt doit décrire un son de hard rock basé sur le blues avec une voix masculine charismatique et pleine d'attitude, incluant des improvisations vocales en scat.",
        lyricInstruction: "Inclus des passages de scat ou des ad-libs énergiques. Marque ces sections avec [scat-vocals]."
      }
    ]
  },
  {
    name: 'Alice Cooper',
    genres: 'Hard Rock, Glam Rock, Shock Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'shock-rock-theatrics',
        name: 'Théâtralité Shock Rock',
        description: "Une performance vocale nasillarde et théâtrale avec des paroles qui racontent des histoires d'horreur macabres.",
        promptInstruction: "Le prompt doit décrire un morceau de hard rock théâtral avec des thèmes d'horreur, une voix nasillarde et des guitares de style garage rock.",
        lyricInstruction: "Les paroles doivent raconter une histoire d'horreur ou macabre avec une narration dramatique."
      }
    ]
  },
  {
    name: 'The Beach Boys',
    genres: 'Surf Rock, Pop, Psychedelic Pop',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'complex-vocal-harmonies',
        name: 'Harmonies Vocales Complexes',
        description: "Des harmonies vocales complexes et superposées, de style 'barbershop', avec une production luxuriante.",
        promptInstruction: "Le prompt doit spécifier des harmonies vocales à plusieurs voix, complexes et riches, avec une production pop orchestrale et luxuriante.",
        lyricInstruction: "Les refrains et les ponts doivent être remplis d'harmonies vocales complexes. Marque ces sections avec [multi-part-harmonies]."
      }
    ]
  },
  {
    name: 'The Black Keys',
    genres: 'Blues Rock, Garage Rock, Indie Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'gritty-blues-rock-revival',
        name: 'Renaissance du Blues Rock Rugueux',
        description: "Un son de garage rock lo-fi avec des riffs de guitare bluesy et lourds, et une voix soul et brute.",
        promptInstruction: "Le prompt doit décrire un son de blues rock brut et lo-fi avec une guitare fuzz et une production minimaliste.",
        lyricInstruction: "Les paroles doivent porter sur des thèmes classiques du blues comme le chagrin d'amour et la solitude."
      }
    ]
  },
  {
    name: 'Bob Dylan',
    genres: 'Folk, Rock, Singer-Songwriter',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'nasally-folk-storytelling',
        name: 'Narration Folk & Voix Nasillarde',
        description: "Une voix nasillarde et conversationnelle qui livre de longues paroles poétiques et narratives, accompagnée d'une guitare acoustique et d'un harmonica.",
        promptInstruction: "Le prompt doit décrire une performance vocale masculine nasillarde et narrative, avec une guitare acoustique et un solo d'harmonica.",
        lyricInstruction: "Les paroles doivent être de longues histoires poétiques, souvent avec un commentaire social ou politique."
      }
    ]
  },
  {
    name: 'Boston',
    genres: 'Arena Rock, Hard Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'layered-guitar-harmonies',
        name: 'Harmonies de Guitares Superposées',
        description: "Un son de rock de stade poli avec de multiples couches de guitares harmonisées et une voix de ténor aiguë et puissante.",
        promptInstruction: "Le prompt doit décrire un son de hard rock avec des harmonies de guitare électrique complexes et superposées, et une voix masculine de ténor aiguë.",
        lyricInstruction: "La chanson doit comporter des solos de guitare harmonisés. Marque ces sections avec [harmony-guitar-solo]."
      }
    ]
  },
  {
    name: 'Buddy Holly',
    genres: 'Rock and Roll, Rockabilly',
    suggestedStructureValue: 'aaba-classic',
    specialTraits: [
      {
        id: 'vocal-hiccup-rockabilly',
        name: 'Hoquet Vocal & Rockabilly',
        description: "Un style vocal unique avec des hoquets et des changements de ton, sur un fond de rock and roll simple.",
        promptInstruction: "Le prompt doit décrire un morceau de rock and roll des années 50 avec une technique vocale incluant des hoquets ('hiccuping vocal style').",
        lyricInstruction: "Incorpore des hoquets et des variations de hauteur dans la livraison vocale."
      }
    ]
  },
  {
    name: 'The Byrds',
    genres: 'Folk Rock, Jangle Pop, Psychedelic Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: '12-string-jangle-guitar',
        name: 'Guitare "Jangle" à 12 Cordes',
        description: "Un son folk rock mené par le son brillant et carillonnant d'une guitare électrique à 12 cordes (Rickenbacker).",
        promptInstruction: "Le prompt doit spécifier l'utilisation d'une guitare électrique à 12 cordes pour créer un son 'jangle pop' clair et carillonnant.",
        lyricInstruction: "Les paroles doivent être poétiques, souvent des adaptations de poèmes folk."
      }
    ]
  },
  {
    name: 'Cameo',
    genres: 'Funk, R&B',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'word-up-funk-chant',
        name: 'Chant Funk "Word Up!"',
        description: "Un groove funk des années 80 avec une ligne de basse proéminente, des cuivres percutants et une voix masculine unique et nasillarde.",
        promptInstruction: "Le prompt doit décrire un morceau de funk des années 80 avec une voix masculine nasillarde et charismatique et un refrain scandé.",
        lyricInstruction: "Le refrain doit être une phrase simple et accrocheuse, scandée de manière percutante."
      }
    ]
  },
  {
    name: 'The Cars',
    genres: 'New Wave, Synth-pop, Power Pop',
    suggestedStructureValue: 'pop-full-prechorus',
    specialTraits: [
      {
        id: 'quirky-new-wave-synths',
        name: 'Synthés New Wave Excentriques',
        description: "Combine des riffs de guitare power pop avec des mélodies de synthétiseur excentriques et une voix détachée et cool.",
        promptInstruction: "Le prompt doit décrire un morceau de new wave avec des riffs de guitare rock et des lignes de synthétiseur accrocheuses et inhabituelles.",
        lyricInstruction: "Les paroles doivent être ironiques et détachées."
      }
    ]
  },
  {
    name: 'Cheap Trick',
    genres: 'Power Pop, Hard Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'power-pop-anthems',
        name: 'Hymnes Power Pop',
        description: "Un son qui mélange des mélodies pop dignes des Beatles avec la puissance et les riffs du hard rock.",
        promptInstruction: "Le prompt doit décrire un morceau de power pop avec des refrains massifs et des guitares hard rock.",
        lyricInstruction: "Le refrain doit être extrêmement accrocheur et hymnique."
      }
    ]
  },
  {
    name: 'Chicago',
    genres: 'Jazz Rock, Soft Rock',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'prominent-horn-section',
        name: 'Section de Cuivres Proéminente',
        description: "Une section de cuivres (trompette, trombone, saxophone) qui est au premier plan, jouant des riffs et des solos.",
        promptInstruction: "Le prompt doit décrire un morceau de rock ou une ballade avec une section de cuivres puissante et proéminente.",
        lyricInstruction: "La chanson doit inclure une section de solo de cuivres. Marque-la avec [horn-section-solo]."
      }
    ]
  },
  {
    name: 'Cream',
    genres: 'Blues Rock, Psychedelic Rock, Hard Rock',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'extended-blues-rock-jams',
        name: 'Jams Blues-Rock Étendus',
        description: "De longues improvisations instrumentales basées sur le blues, avec des solos virtuoses de guitare, de basse et de batterie.",
        promptInstruction: "Le prompt doit décrire un morceau de blues rock avec de longues sections d'improvisation et des solos pour chaque instrument.",
        lyricInstruction: "La structure doit inclure de longues sections instrumentales. Marque-les avec [instrumental-jam]."
      }
    ]
  },
  {
    name: 'Creed',
    genres: 'Post-Grunge, Alternative Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'post-grunge-power-ballad',
        name: 'Power Ballade Post-Grunge',
        description: "Une voix de baryton grave et dramatique sur des riffs de guitare post-grunge, avec des refrains hymniques.",
        promptInstruction: "Le prompt doit décrire un hymne post-grunge avec une voix masculine de baryton profonde et émotive.",
        lyricInstruction: "Les paroles doivent être sérieuses et porter sur des thèmes de foi, de spiritualité et de lutte."
      }
    ]
  },
  {
    name: 'Crosby, Stills, Nash & Young',
    genres: 'Folk Rock, Country Rock',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'acoustic-four-part-harmonies',
        name: 'Harmonies Acoustiques à Quatre Voix',
        description: "Des harmonies vocales complexes à trois ou quatre voix sur des arrangements de folk rock principalement acoustiques.",
        promptInstruction: "Le prompt doit décrire un morceau de folk rock acoustique avec des harmonies vocales masculines complexes et serrées.",
        lyricInstruction: "Les refrains doivent être chantés en harmonies à plusieurs voix."
      }
    ]
  },
  {
    name: 'The Crystals',
    genres: 'Girl Group, Pop, R&B',
    suggestedStructureValue: 'pop-short-vcvc',
    specialTraits: [
      {
        id: 'wall-of-sound-production',
        name: 'Production "Mur de Son"',
        description: "Un son pop des années 60 avec une production dense et orchestrale ('Wall of Sound'), de la réverbération et des voix féminines puissantes.",
        promptInstruction: "Le prompt doit décrire une production 'Wall of Sound' avec des couches d'instruments, de la réverbération et des voix féminines principales et de chœurs.",
        lyricInstruction: "Les paroles doivent porter sur des thèmes de romance adolescente dramatique."
      }
    ]
  },
  {
    name: 'Def Leppard',
    genres: 'Glam Metal, Hard Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'massive-choral-backing-vocals',
        name: 'Chœurs Massifs',
        description: "Des refrains hymniques avec des chœurs massifs et superposés, créant un son de rock de stade poli.",
        promptInstruction: "Le prompt doit décrire un morceau de hard rock avec des refrains contenant des chœurs de groupe massifs et produits.",
        lyricInstruction: "Le refrain doit être facile à chanter et soutenu par des chœurs puissants. Marque-les avec [gang-vocals]."
      }
    ]
  },
  {
    name: 'Devo',
    genres: 'New Wave, Art Punk, Synth-pop',
    suggestedStructureValue: 'pop-short-vcvc',
    specialTraits: [
      {
        id: 'robotic-devolved-art-punk',
        name: 'Art-Punk Robotique & "Dé-évolué"',
        description: "Un son new wave avec des rythmes saccadés, des synthétiseurs excentriques et des paroles satiriques sur la dé-évolution de la société.",
        promptInstruction: "Le prompt doit décrire un morceau de new wave avec des mouvements robotiques, des rythmes saccadés et des voix détachées.",
        lyricInstruction: "Les paroles doivent être une satire de la conformité et de la société moderne."
      }
    ]
  },
  {
    name: 'Dio',
    genres: 'Heavy Metal',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'epic-fantasy-metal-vocals',
        name: 'Vocaux de Fantasy Metal Épique',
        description: "Une voix de ténor de heavy metal puissante et opératique, chantant des paroles sur des thèmes de fantasy (dragons, arcs-en-ciel, etc.).",
        promptInstruction: "Le prompt doit décrire un morceau de heavy metal classique avec une voix masculine de ténor puissante et théâtrale.",
        lyricInstruction: "Les paroles doivent être épiques et porter sur des thèmes de la fantasy, du bien contre le mal."
      }
    ]
  },
  {
    name: 'The Donnas',
    genres: 'Garage Rock, Pop-Punk, Hard Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'female-garage-rock-attitude',
        name: 'Attitude Garage Rock Féminine',
        description: "Un son de garage rock simple et direct avec une attitude rock 'n' roll confiante et des paroles sur la fête et les garçons.",
        promptInstruction: "Le prompt doit décrire un morceau de garage rock direct avec un groupe entièrement féminin et une attitude pleine d'assurance.",
        lyricInstruction: "Les paroles doivent être amusantes et pleines d'attitude, du point de vue d'une rockeuse."
      }
    ]
  },
  {
    name: 'The Doobie Brothers',
    genres: 'Soft Rock, Blues Rock, Pop Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'dual-drummers-soulful-rock',
        name: 'Double Batterie & Rock Soulful',
        description: "Un son rock avec deux batteurs créant une section rythmique puissante, des riffs de guitare et des influences soul/R&B.",
        promptInstruction: "Le prompt doit décrire un morceau de rock avec une section rythmique à deux batteries et des harmonies vocales soulful.",
        lyricInstruction: "Les paroles doivent être optimistes, sur des thèmes de la musique et de la vie sur la route."
      }
    ]
  },
  {
    name: 'Patti Smith',
    genres: 'Punk Rock, Art Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'punk-rock-poetry',
        name: 'Poésie Punk Rock',
        description: "Combine la poésie 'beat' avec l'énergie brute du punk rock, livrée avec une voix androgyne et passionnée.",
        promptInstruction: "Le prompt doit décrire un morceau de garage rock ou de punk rock avec une performance vocale de spoken word poétique et intense.",
        lyricInstruction: "Les paroles doivent être des poèmes en vers libres, livrés avec une intensité croissante. Marque les passages parlés avec [spoken-word]."
      }
    ]
  },
  {
    name: 'The Zombies',
    genres: 'Baroque Pop, Psychedelic Pop',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'baroque-pop-keyboards',
        name: 'Claviers Pop Baroque',
        description: "Un son pop des années 60 avec des mélodies de clavier complexes (piano électrique, Mellotron) et des harmonies vocales aériennes.",
        promptInstruction: "Le prompt doit décrire un morceau de pop baroque avec des claviers proéminents et des harmonies vocales douces.",
        lyricInstruction: "Les paroles doivent être poétiques et mélancoliques."
      }
    ]
  },
  {
    name: 'Warren Zevon',
    genres: 'Rock, Singer-Songwriter',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'cynical-storytelling-rock',
        name: 'Rock Narratif & Cynique',
        description: "Raconte des histoires sombres et cyniques avec un humour noir, sur un fond de piano rock classique.",
        promptInstruction: "Le prompt doit décrire un morceau de piano rock avec des paroles narratives et cyniques.",
        lyricInstruction: "Les paroles doivent raconter une histoire sombre avec un humour noir et des personnages mémorables."
      }
    ]
  },
  {
    name: 'The Eagles',
    genres: 'Rock, Country Rock, Soft Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'california-country-rock-harmonies',
        name: 'Harmonies Country Rock Californiennes',
        description: "Un son rock décontracté avec des harmonies vocales complexes et des solos de guitare mélodiques.",
        promptInstruction: "Le prompt doit décrire un son de country rock californien avec des guitares acoustiques, une guitare slide et des harmonies vocales masculines serrées.",
        lyricInstruction: "Les paroles doivent porter sur des thèmes de l'amour, de la perte et du rêve américain."
      }
    ]
  },
  {
    name: 'Electric Light Orchestra (ELO)',
    genres: 'Symphonic Rock, Pop Rock, Art Rock',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'orchestral-pop-rock',
        name: 'Pop Rock Orchestral',
        description: "Fusionne la pop rock avec des arrangements orchestraux luxuriants, des synthétiseurs et des voix filtrées.",
        promptInstruction: "Le prompt doit décrire un morceau de pop rock avec une section de cordes proéminente, des harmonies vocales de style Beatles et des voix traitées avec des filtres.",
        lyricInstruction: "Les paroles doivent être fantaisistes, souvent sur des thèmes de l'espace ou de la technologie."
      }
    ]
  },
  {
    name: 'Elvis Costello',
    genres: 'New Wave, Pub Rock, Power Pop',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'angry-young-man-wordplay',
        name: 'Jeux de Mots de "Jeune Homme en Colère"',
        description: "Une livraison vocale énergique et nerveuse avec des paroles pleines de jeux de mots complexes et de cynisme.",
        promptInstruction: "Le prompt doit décrire un morceau de new wave / pub rock avec une voix masculine énergique et des paroles intelligentes et cyniques.",
        lyricInstruction: "Les paroles doivent être denses avec des jeux de mots et une critique sociale acerbe."
      }
    ]
  },
  {
    name: 'Elvis Presley',
    genres: 'Rock and Roll, Pop, Rockabilly',
    suggestedStructureValue: 'aaba-classic',
    specialTraits: [
      {
        id: 'rockabilly-swagger',
        name: 'Attitude Rockabilly',
        description: "Une voix de baryton charismatique avec un vibrato distinctif, sur un rythme de rockabilly entraînant.",
        promptInstruction: "Le prompt doit décrire un morceau de rockabilly avec une guitare 'slapback echo' et une voix de baryton masculine charismatique.",
        lyricInstruction: "Les paroles doivent porter sur l'amour et la danse, livrées avec confiance et attitude."
      }
    ]
  },
  {
    name: 'Emerson, Lake & Palmer',
    genres: 'Progressive Rock, Symphonic Rock',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'keyboard-driven-prog-rock',
        name: 'Rock Progressif mené par les Claviers',
        description: "De longues compositions de rock progressif dominées par des solos de clavier virtuoses (orgue Hammond, synthétiseur Moog).",
        promptInstruction: "Le prompt doit décrire un morceau de rock progressif avec des solos de clavier longs et virtuoses.",
        lyricInstruction: "Les paroles sont souvent des adaptations de pièces classiques ou des thèmes de fantasy."
      }
    ]
  },
  {
    name: 'Eric Clapton',
    genres: 'Blues Rock, Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'slowhand-blues-guitar',
        name: 'Guitare Blues "Slowhand"',
        description: "Des solos de guitare blues mélodiques, expressifs et fluides avec un ton clair et chaud.",
        promptInstruction: "Le prompt doit décrire un morceau de blues rock avec de longs solos de guitare mélodiques et émouvants.",
        lyricInstruction: "Les paroles sont souvent des classiques du blues ou sur le chagrin d'amour."
      }
    ]
  },
  {
    name: 'EPMD',
    genres: 'East Coast Hip Hop, Golden Age',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'laid-back-funk-samples',
        name: 'Samples Funk Décontractés',
        description: "Un flow de rap décontracté sur des beats boom-bap construits autour de samples de funk et de soul profonds.",
        promptInstruction: "Le prompt doit décrire un beat hip-hop avec des samples de funk lourds et un flow de rap décontracté.",
        lyricInstruction: "Les paroles doivent être vantardes avec un ton décontracté."
      }
    ]
  },
  {
    name: 'Everclear',
    genres: 'Alternative Rock, Post-Grunge, Power Pop',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'cynical-90s-storytelling',
        name: 'Narration Cynique des Années 90',
        description: "Raconte des histoires sur des personnages dysfonctionnels avec un ton cynique, sur un fond de rock alternatif.",
        promptInstruction: "Le prompt doit décrire un morceau de rock alternatif des années 90 avec des paroles narratives et cyniques.",
        lyricInstruction: "Les paroles doivent raconter une histoire à la première personne sur des thèmes sombres avec une touche d'ironie."
      }
    ]
  },
  {
    name: 'Fabolous',
    genres: 'East Coast Hip Hop, Pop Rap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'smooth-punchline-rap',
        name: 'Rap à Punchlines Fluide',
        description: "Un flow de rap fluide et conversationnel rempli de punchlines spirituelles et de jeux de mots.",
        promptInstruction: "Le prompt doit décrire un beat de hip-hop commercial, avec un flow de rap masculin fluide et plein de punchlines.",
        lyricInstruction: "Les paroles doivent être pleines de jeux de mots et de comparaisons intelligentes."
      }
    ]
  },
  {
    name: 'The Flaming Lips',
    genres: 'Neo-psychedelia, Indie Rock, Experimental',
    suggestedStructureValue: 'pink-floyd-psychedelic-suite',
    specialTraits: [
      {
        id: 'quirky-psychedelic-soundscapes',
        name: 'Paysages Sonores Psychédéliques Excentriques',
        description: "Un son psychédélique avec des arrangements luxuriants, des bruits étranges et une voix de ténor fragile.",
        promptInstruction: "Le prompt doit décrire un paysage sonore de rock psychédélique avec une production orchestrale et des éléments sonores inattendus.",
        lyricInstruction: "Les paroles doivent être surréalistes et porter sur des thèmes de la vie, de la mort et de l'univers."
      }
    ]
  },
  {
    name: 'Foreigner',
    genres: 'Arena Rock, Hard Rock',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'power-ballad-anthems',
        name: 'Hymnes de Power Ballade',
        description: "Spécialisé dans les power ballades rock avec des refrains massifs et une voix de ténor puissante.",
        promptInstruction: "Le prompt doit décrire une power ballade de rock des années 80 avec des claviers proéminents et un refrain hymnique.",
        lyricInstruction: "Les paroles doivent être une déclaration d'amour dramatique."
      }
    ]
  },
  {
    name: 'Grandmaster Flash and the Furious Five',
    genres: 'Old School Hip Hop',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'pioneering-dj-scratches',
        name: 'Scratches de DJ Pionniers',
        description: "Incorpore des techniques de DJing pionnières comme le 'scratching' et le 'cutting' comme élément rythmique.",
        promptInstruction: "Le prompt doit décrire un beat hip-hop old school avec des scratches de platine proéminents.",
        lyricInstruction: "Les paroles doivent porter sur la vie en ville ou la fête, avec plusieurs MCs."
      }
    ]
  },
  {
    name: 'Grateful Dead',
    genres: 'Psychedelic Rock, Jam Band, Folk Rock',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'extended-improvisational-jams',
        name: 'Jams Improvisationnels Étendus',
        description: "De longues chansons qui servent de base à des improvisations instrumentales étendues et psychédéliques.",
        promptInstruction: "Le prompt doit décrire un morceau de rock avec de longues sections d'improvisation de guitare, de basse et de batterie.",
        lyricInstruction: "Les paroles sont souvent des contes folkloriques ou des histoires surréalistes. La structure doit inclure de longues sections [instrumental-jam]."
      }
    ]
  },
  {
    name: 'Heart',
    genres: 'Hard Rock, Folk Rock, Arena Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'female-led-power-rock-vocals',
        name: 'Vocaux Rock Féminins Puissants',
        description: "Combine des riffs de hard rock avec des éléments folk et une performance vocale féminine extrêmement puissante.",
        promptInstruction: "Le prompt doit décrire un morceau de hard rock mené par une voix féminine puissante et à large tessiture.",
        lyricInstruction: "Les paroles doivent porter sur l'amour et la force, livrées avec une grande puissance vocale."
      }
    ]
  },
  {
    name: 'Hole',
    genres: 'Grunge, Alternative Rock, Punk Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'raw-unfiltered-female-rage',
        name: 'Rage Féminine Brute & Non Filtrée',
        description: "Une performance vocale brute et agressive, passant de murmures à des cris, avec des paroles sur le féminisme et la douleur.",
        promptInstruction: "Le prompt doit décrire un son grunge avec une voix féminine brute et criarde, pleine de rage.",
        lyricInstruction: "Les paroles doivent être directes et sans concession, sur des thèmes féministes. La livraison doit être agressive."
      }
    ]
  },
  {
    name: 'The Hollies',
    genres: 'Pop Rock, British Invasion',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'bright-three-part-harmonies',
        name: 'Harmonies à Trois Voix Claires',
        description: "Un son pop rock des années 60 caractérisé par des harmonies vocales à trois voix claires et serrées.",
        promptInstruction: "Le prompt doit décrire un morceau de pop britannique des années 60 avec des harmonies vocales masculines à trois voix.",
        lyricInstruction: "Les refrains doivent comporter des harmonies vocales proéminentes."
      }
    ]
  },
  {
    name: 'Incubus',
    genres: 'Alternative Rock, Funk Metal, Alternative Metal',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'funk-influenced-alt-rock',
        name: 'Rock Alternatif & Influences Funk',
        description: "Fusionne le rock alternatif avec des rythmes funk, des scratchs de DJ et une voix masculine mélodique.",
        promptInstruction: "Le prompt doit décrire un morceau de rock alternatif avec une section rythmique funky et des scratchs de DJ.",
        lyricInstruction: "Les paroles sont souvent introspectives et spirituelles."
      }
    ]
  },
  {
    name: 'Jamiroquai',
    genres: 'Acid Jazz, Funk, Disco',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'virtual-insanity-groove',
        name: 'Groove Acid Jazz & Funk',
        description: "Un son funk et acid jazz avec une ligne de basse groovy, des accords de piano électrique et une voix masculine douce inspirée de Stevie Wonder.",
        promptInstruction: "Le prompt doit décrire un morceau de funk/acid jazz avec une ligne de basse proéminente et un piano Rhodes.",
        lyricInstruction: "Les paroles peuvent porter sur des thèmes sociaux ou simplement sur la danse."
      }
    ]
  },
  {
    name: 'Jane\'s Addiction',
    genres: 'Alternative Metal, Funk Metal, Psychedelic Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'tribal-rhythms-psychedelic-metal',
        name: 'Rythmes Tribaux & Metal Psychédélique',
        description: "Combine des riffs de metal, des rythmes de batterie tribaux, des lignes de basse funky et une voix aiguë et perçante.",
        promptInstruction: "Le prompt doit décrire une fusion de metal et de funk avec des percussions tribales et une voix masculine aiguë.",
        lyricInstruction: "Les paroles sont poétiques et surréalistes, sur des thèmes de la rue, de l'amour et de la drogue."
      }
    ]
  },
  {
    name: 'Jethro Tull',
    genres: 'Progressive Rock, Folk Rock, Hard Rock',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'flute-driven-prog-rock',
        name: 'Rock Progressif mené par la Flûte',
        description: "Un son de rock progressif et folk unique, mené par une flûte traversière virtuose.",
        promptInstruction: "Le prompt doit décrire un morceau de rock progressif avec une flûte traversière comme instrument principal.",
        lyricInstruction: "Les paroles sont souvent des contes folkloriques ou des observations sur la vie rurale. Inclus un [flute-solo]."
      }
    ]
  },
  {
    name: 'Joan Jett & The Blackhearts',
    genres: 'Hard Rock, Punk Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'female-rock-n-roll-anthem',
        name: 'Hymne Rock \'n\' Roll Féminin',
        description: "Un son rock 'n' roll direct avec des riffs de guitare puissants et une voix féminine rauque et pleine d'attitude.",
        promptInstruction: "Le prompt doit décrire un hymne de hard rock avec une voix féminine rauque et puissante.",
        lyricInstruction: "Les paroles doivent être sur le rock 'n' roll, la rébellion et la confiance en soi."
      }
    ]
  },
  {
    name: 'Joni Mitchell',
    genres: 'Folk, Singer-Songwriter, Jazz Folk',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'open-tuning-guitar-poetic-lyrics',
        name: 'Guitare en Accord Ouvert & Paroles Poétiques',
        description: "Une voix de soprano claire avec un vibrato unique, sur des arrangements de guitare acoustique utilisant des accords ouverts complexes.",
        promptInstruction: "Le prompt doit décrire un morceau de folk avec une guitare acoustique en accord ouvert et une voix féminine de soprano très expressive.",
        lyricInstruction: "Les paroles doivent être des confessions poétiques et profondément personnelles."
      }
    ]
  },
  {
    name: 'Judas Priest',
    genres: 'Heavy Metal',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'twin-guitar-attack-operatic-screams',
        name: 'Double Attaque de Guitares & Cris Opératiques',
        description: "Un son de heavy metal défini par des riffs et des solos de deux guitares harmonisées ('twin-guitar attack') et une voix opératique capable de cris suraigus.",
        promptInstruction: "Le prompt doit décrire un morceau de heavy metal avec des harmonies de guitares jumelles et une voix masculine opératique avec des cris très aigus.",
        lyricInstruction: "Inclus une section [twin-guitar-solo] et marque les cris les plus aigus avec [high-scream]."
      }
    ]
  },
  {
    name: 'Jurassic 5',
    genres: 'Alternative Hip Hop',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'old-school-group-harmonies',
        name: 'Harmonies de Groupe Old-School',
        description: "Un groupe de plusieurs MCs avec des voix graves qui rappent en harmonie et s'échangent les lignes sur des beats boom-bap funky.",
        promptInstruction: "Le prompt doit décrire un son de hip-hop old school avec plusieurs voix de baryton rappant en harmonie.",
        lyricInstruction: "Les refrains doivent être rappés en harmonie par plusieurs voix."
      }
    ]
  },
  {
    name: 'Kansas',
    genres: 'Progressive Rock, Arena Rock',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'symphonic-prairie-prog',
        name: 'Prog Symphonique des Prairies',
        description: "Fusionne le rock progressif avec des éléments de rock américain (Heartland) et des arrangements symphoniques, avec un violon proéminent.",
        promptInstruction: "Le prompt doit décrire un morceau de rock progressif avec un violon électrique et des thèmes orchestraux.",
        lyricInstruction: "Les paroles doivent être philosophiques. La chanson doit comporter un [violin-solo]."
      }
    ]
  },
  {
    name: 'Kool Moe Dee',
    genres: 'Old School Hip Hop',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'complex-old-school-flow',
        name: 'Flow Old-School Complexe',
        description: "Un flow de rap rapide et articulé avec des schémas de rimes complexes, pionnier du rap technique.",
        promptInstruction: "Le prompt doit décrire un beat hip-hop old school avec un flow de rap très rapide et technique.",
        lyricInstruction: "Les paroles doivent être vantardes avec un vocabulaire riche et des rimes complexes."
      }
    ]
  },
  {
    name: 'Korn',
    genres: 'Nu Metal',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'scatting-slapped-bass',
        name: 'Scat & Basse Slappée',
        description: "Un son nu-metal avec des guitares à 7 cordes sous-accordées, une basse slappée proéminente et une performance vocale qui inclut du scat et des cris.",
        promptInstruction: "Le prompt doit décrire un morceau de nu metal avec une basse slappée et une voix qui fait du scat.",
        lyricInstruction: "Inclus une section de scat. Marque-la avec [scat-vocals]."
      }
    ]
  },
  {
    name: 'Lenny Kravitz',
    genres: 'Funk Rock, Hard Rock, Soul',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'retro-funk-rock-revival',
        name: 'Renaissance Funk-Rock Rétro',
        description: "Un son qui émule le rock, la soul et le funk des années 60 et 70 avec une production moderne.",
        promptInstruction: "Le prompt doit décrire un son de rock rétro avec une production vintage mais puissante.",
        lyricInstruction: "Les paroles portent sur l'amour et la paix."
      }
    ]
  },
  {
    name: 'Limp Bizkit',
    genres: 'Nu Metal, Rap Rock',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'aggressive-rap-rock-dj-scratches',
        name: 'Rap-Rock Agressif & Scratches de DJ',
        description: "Combine des riffs de metal lourds avec du rap agressif et des scratchs de DJ.",
        promptInstruction: "Le prompt doit décrire une fusion de nu metal et de rap avec des scratchs de platine.",
        lyricInstruction: "Les paroles sont pleines d'angoisse et d'attitude. Inclus un [dj-scratch-break]."
      }
    ]
  },
  {
    name: 'Live',
    genres: 'Post-Grunge, Alternative Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'spiritual-intense-vocals',
        name: 'Vocaux Intenses & Spirituels',
        description: "Une performance vocale masculine intense et passionnée qui monte en crescendo, avec des paroles spirituelles et introspectives.",
        promptInstruction: "Le prompt doit décrire un morceau de rock alternatif avec une voix masculine qui monte en un crescendo émotionnel.",
        lyricInstruction: "Les paroles doivent être introspectives et explorer des thèmes spirituels."
      }
    ]
  },
  {
    name: 'Lynyrd Skynyrd',
    genres: 'Southern Rock, Blues Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'triple-guitar-southern-rock-anthem',
        name: 'Hymne Southern Rock à Trois Guitares',
        description: "Un son de rock sudiste avec trois guitares électriques qui s'entremêlent et de longs solos.",
        promptInstruction: "Le prompt doit décrire un hymne de rock sudiste avec plusieurs guitares électriques et de longs solos.",
        lyricInstruction: "Inclus une longue section de solos de guitare. Marque-la avec [extended-guitar-solos]."
      }
    ]
  },
  {
    name: 'The Mamas & The Papas',
    genres: 'Folk Rock, Sunshine Pop',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'four-part-vocal-group-harmonies',
        name: 'Harmonies de Groupe à Quatre Voix',
        description: "Des harmonies vocales complexes et mixtes (deux hommes, deux femmes) sur un fond de folk rock.",
        promptInstruction: "Le prompt doit décrire un morceau de folk rock avec des harmonies vocales complexes à quatre voix.",
        lyricInstruction: "Les refrains doivent comporter des harmonies riches entre les voix masculines et féminines."
      }
    ]
  },
  {
    name: 'Maneskin',
    genres: 'Glam Rock, Alternative Rock, Italian',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'modern-italian-glam-rock',
        name: 'Glam Rock Italien Moderne',
        description: "Un son de glam rock moderne et énergique avec une voix masculine rauque et charismatique.",
        promptInstruction: "Le prompt doit décrire un morceau de glam rock avec une attitude moderne et une voix masculine puissante et rauque, chantant en italien ou en anglais.",
        lyricInstruction: "Les paroles doivent être pleines d'attitude, sur la rébellion et la liberté."
      }
    ]
  },
  {
    name: 'Meat Loaf',
    genres: 'Hard Rock, Operatic Rock',
    suggestedStructureValue: 'queen-operatic-rhapsody',
    specialTraits: [
      {
        id: 'theatrical-rock-opera',
        name: 'Opéra Rock Théâtral',
        description: "De longues chansons narratives avec une structure d'opéra-rock, une production grandiose et une performance vocale théâtrale et puissante.",
        promptInstruction: "Le prompt doit décrire un morceau d'opéra rock avec une production wagnérienne, du piano et une voix masculine théâtrale.",
        lyricInstruction: "Les paroles doivent raconter une histoire dramatique sur l'amour adolescent."
      }
    ]
  },
  {
    name: 'Metallica',
    genres: 'Thrash Metal, Heavy Metal',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'down-picked-thrash-riffs',
        name: 'Riffs Thrash en "Down-picking"',
        description: "Des riffs de guitare rapides et percutants joués exclusivement en aller simple ('down-picking'), avec une voix agressive.",
        promptInstruction: "Le prompt doit spécifier des riffs de thrash metal rapides et précis joués en 'down-picking', et une voix masculine agressive.",
        lyricInstruction: "Les paroles doivent porter sur des thèmes sombres comme la guerre, la mort et l'injustice."
      }
    ]
  },
  {
    name: 'The Monkees',
    genres: 'Pop Rock, Bubblegum Pop',
    suggestedStructureValue: 'pop-short-vcvc',
    specialTraits: [
      {
        id: 'manufactured-pop-rock',
        name: 'Pop-Rock Fabriqué',
        description: "Un son pop rock des années 60, accrocheur et produit pour être commercial, dans le style d'un boys band.",
        promptInstruction: "Le prompt doit décrire un morceau de pop rock des années 60 très accrocheur et optimiste.",
        lyricInstruction: "Les paroles doivent être simples et porter sur l'amour."
      }
    ]
  },
  {
    name: 'Motörhead',
    genres: 'Heavy Metal, Speed Metal, Rock and Roll',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'gravelly-vocals-overdriven-bass',
        name: 'Voix Rocailleuse & Basse Saturée',
        description: "Un son rapide et agressif avec une basse jouée comme une guitare rythmique avec beaucoup de distorsion, et une voix extrêmement rocailleuse.",
        promptInstruction: "Le prompt doit décrire un morceau de speed metal avec une basse saturée jouant des accords et une voix masculine très graveleuse.",
        lyricInstruction: "Les paroles doivent porter sur le rock 'n' roll, le jeu et la guerre."
      }
    ]
  },
  {
    name: 'Naughty by Nature',
    genres: 'East Coast Hip Hop',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'anthemic-hip-hop-chant',
        name: 'Chant Hip-Hop Hymnique',
        description: "Des refrains hip-hop extrêmement accrocheurs et faciles à scander.",
        promptInstruction: "Le prompt doit décrire un beat hip-hop des années 90 avec un refrain scandé très accrocheur.",
        lyricInstruction: "Le refrain doit être simple, répétitif et fait pour être scandé en groupe."
      }
    ]
  },
  {
    name: 'Neil Young',
    genres: 'Folk Rock, Hard Rock, Country Rock',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'fragile-falsetto-raw-guitar',
        name: 'Falsetto Fragile & Guitare Brute',
        description: "Alterne entre des ballades folk acoustiques avec une voix de fausset fragile et des morceaux de hard rock avec des solos de guitare bruts et distordus.",
        promptInstruction: "Le prompt doit décrire soit une ballade folk avec une voix de fausset masculine, soit un morceau de rock avec une guitare brute et 'noisy'.",
        lyricInstruction: "Les paroles doivent être poétiques et introspectives."
      }
    ]
  },
  {
    name: 'Nina Hagen',
    genres: 'Punk Rock, New Wave, Experimental',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'operatic-punk-vocals',
        name: 'Vocaux Punk Opératiques',
        description: "Une performance vocale extrêmement versatile et théâtrale, passant de cris punk à des coloratures d'opéra.",
        promptInstruction: "Le prompt doit décrire une performance vocale féminine très excentrique, avec des changements de style vocaux extrêmes.",
        lyricInstruction: "La livraison vocale doit être imprévisible, alternant entre différents styles. Les paroles peuvent être en allemand."
      }
    ]
  },
  {
    name: 'NOFX',
    genres: 'Punk Rock, Skate Punk, Ska Punk',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'sarcastic-skate-punk',
        name: 'Skate Punk Sarcasique',
        description: "Un son skate punk rapide et mélodique avec des paroles humoristiques, satiriques et souvent auto-dérisoires.",
        promptInstruction: "Le prompt doit décrire un morceau de skate punk rapide avec un ton humoristique et sarcastique.",
        lyricInstruction: "Les paroles doivent être pleines d'esprit, de jeux de mots et de satire sociale."
      }
    ]
  },
  {
    name: 'Ozzy Osbourne',
    genres: 'Heavy Metal',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'prince-of-darkness-vocals',
        name: 'Vocaux du "Prince des Ténèbres"',
        description: "Une voix de heavy metal aiguë et plaintive distinctive, avec des thèmes lyriques sombres.",
        promptInstruction: "Le prompt doit décrire un morceau de heavy metal avec une voix masculine aiguë et distinctive, et des riffs de guitare puissants.",
        lyricInstruction: "Les paroles doivent porter sur des thèmes de l'obscurité, de la folie et de l'occulte."
      }
    ]
  },
  {
    name: 'Pavement',
    genres: 'Indie Rock, Lo-fi',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'slacker-indie-rock',
        name: 'Indie Rock "Slacker"',
        description: "Un son indie rock lo-fi avec des guitares désaccordées, des structures de chansons lâches et une livraison vocale détachée et ironique.",
        promptInstruction: "Le prompt doit décrire un son de rock indépendant lo-fi avec une attitude 'slacker' et des guitares non conventionnelles.",
        lyricInstruction: "Les paroles doivent être abstraites, pleines d'esprit et de non-sens."
      }
    ]
  },
  {
    name: 'Phish',
    genres: 'Jam Band, Progressive Rock, Funk',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'complex-improvisational-rock',
        name: 'Rock Improvisationnel Complexe',
        description: "Combine des compositions complexes de style rock progressif avec de longues sections d'improvisation de groupe.",
        promptInstruction: "Le prompt doit décrire un morceau de rock avec des sections d'improvisation étendues et une interaction complexe entre les instruments.",
        lyricInstruction: "Les paroles sont souvent surréalistes et ludiques. La structure doit inclure de longues sections [instrumental-jam]."
      }
    ]
  },
  {
    name: 'Poison',
    genres: 'Glam Metal, Hard Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'power-ballad-party-rock',
        name: 'Power Ballade & Party Rock',
        description: "Alterne entre des power ballades avec guitare acoustique et des hymnes de glam metal sur la fête.",
        promptInstruction: "Le prompt doit décrire soit une power ballade de glam metal, soit un hymne de party rock.",
        lyricInstruction: "Les paroles doivent porter sur l'amour ou la fête."
      }
    ]
  },
  {
    name: 'The Pretenders',
    genres: 'New Wave, Rock, Pop Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'female-led-new-wave-rock',
        name: 'New Wave Rock Féminin',
        description: "Un son new wave mené par une voix de contralto féminine forte et distinctive, avec des guitares 'jangly'.",
        promptInstruction: "Le prompt doit décrire un morceau de new wave avec une voix féminine de contralto puissante.",
        lyricInstruction: "Les paroles doivent être pleines d'attitude, sur l'amour et l'indépendance."
      }
    ]
  },
  {
    name: 'Queen Latifah',
    genres: 'Conscious Hip Hop, R&B, Soul',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'empowering-female-rap-vocals',
        name: 'Rap & Chant Féminin Puissant',
        description: "Alterne entre un flow de rap confiant avec des paroles sur l'émancipation des femmes et un chant R&B et soul puissant.",
        promptInstruction: "Le prompt doit décrire un morceau de hip-hop avec des thèmes féministes, alternant entre rap et chant R&B.",
        lyricInstruction: "Les paroles doivent porter sur l'autonomisation, la confiance en soi et l'unité."
      }
    ]
  },
  {
    name: 'Quiet Riot',
    genres: 'Glam Metal, Heavy Metal',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'heavy-metal-anthem',
        name: 'Hymne Heavy Metal',
        description: "Un son glam metal avec des refrains hymniques et une voix rauque et puissante.",
        promptInstruction: "Le prompt doit décrire un hymne de heavy metal avec un refrain fait pour être scandé et une voix masculine rauque.",
        lyricInstruction: "Le refrain doit être simple et puissant, facile à chanter en chœur."
      }
    ]
  },
  {
    name: 'Rainbow',
    genres: 'Hard Rock, Heavy Metal',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'fantasy-themed-hard-rock',
        name: 'Hard Rock à Thème Fantastique',
        description: "Combine des riffs de hard rock avec des thèmes lyriques de fantasy et des voix puissantes (Dio ou autres).",
        promptInstruction: "Le prompt doit décrire un morceau de hard rock avec des paroles sur la fantasy et une voix masculine puissante.",
        lyricInstruction: "Les paroles doivent être épiques, sur des thèmes de châteaux, de magiciens et de batailles."
      }
    ]
  },
  {
    name: 'Rancid',
    genres: 'Punk Rock, Ska Punk',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'ska-punk-walking-basslines',
        name: 'Ska-Punk & Lignes de Basse Ambulantes',
        description: "Un son ska-punk avec des lignes de basse mélodiques et proéminentes ('walking basslines') et une voix rauque et marmonnée.",
        promptInstruction: "Le prompt doit décrire un morceau de ska-punk avec une ligne de basse proéminente et une voix masculine rauque.",
        lyricInstruction: "Les paroles racontent souvent des histoires sur la vie dans la rue."
      }
    ]
  },
  {
    name: 'The Replacements',
    genres: 'Alternative Rock, Post-Punk',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'heart-on-sleeve-punk-rock',
        name: 'Punk Rock à Cœur Ouvert',
        description: "Un son rock alternatif brut et plein d'émotion, avec des paroles sincères et une voix passionnée et éraillée.",
        promptInstruction: "Le prompt doit décrire un morceau de rock alternatif avec une énergie punk mais des paroles émotionnelles et vulnérables.",
        lyricInstruction: "Les paroles doivent être une expression honnête et brute d'émotions comme le chagrin ou l'aliénation."
      }
    ]
  },
  {
    name: 'Rush',
    genres: 'Progressive Rock, Hard Rock',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'high-pitched-vocals-complex-basslines',
        name: 'Voix Aiguë & Lignes de Basse Complexes',
        description: "Une voix de ténor très aiguë, des signatures rythmiques complexes et des lignes de basse virtuoses et proéminentes.",
        promptInstruction: "Le prompt doit décrire un morceau de rock progressif avec une voix masculine très aiguë et une ligne de basse complexe et mélodique.",
        lyricInstruction: "Les paroles doivent être intellectuelles, sur des thèmes de science-fiction ou de philosophie."
      }
    ]
  },
  {
    name: 'Salt-N-Pepa',
    genres: 'Hip Hop, Pop Rap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'female-pop-rap-duo',
        name: 'Duo de Pop-Rap Féminin',
        description: "Un duo de hip-hop féminin avec des flows confiants et des refrains pop accrocheurs, avec des paroles sur l'indépendance des femmes.",
        promptInstruction: "Le prompt doit décrire un morceau de pop-rap des années 80/90 avec deux voix féminines.",
        lyricInstruction: "Les paroles doivent être amusantes et porter sur l'autonomisation des femmes."
      }
    ]
  },
  {
    name: 'The Sex Pistols',
    genres: 'Punk Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'anarchic-punk-attitude',
        name: 'Attitude Punk Anarchique',
        description: "Un son punk rock brut et minimaliste avec une attitude agressive et nihiliste, et une voix sarcastique.",
        promptInstruction: "Le prompt doit décrire un morceau de punk rock de 1977 avec une production brute et une voix masculine agressive et sarcastique.",
        lyricInstruction: "Les paroles doivent être une critique anarchique et provocatrice de la société et de l'autorité."
      }
    ]
  },
  {
    name: 'Skid Row',
    genres: 'Heavy Metal, Glam Metal',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'gritty-glam-metal',
        name: 'Glam Metal "Gritty"',
        description: "Un son de glam metal plus lourd et plus brut avec une voix puissante et aiguë capable de cris perçants.",
        promptInstruction: "Le prompt doit décrire un morceau de heavy metal avec une attitude de rue et une voix masculine aiguë et puissante.",
        lyricInstruction: "Les paroles doivent porter sur la jeunesse, la rébellion et la vie dans la rue."
      }
    ]
  },
  {
    name: 'Social Distortion',
    genres: 'Punk Rock, Cowpunk, Rockabilly',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'cowpunk-storytelling',
        name: 'Narration Cowpunk',
        description: "Fusionne l'énergie du punk rock avec les influences du country et du rockabilly, avec une voix rauque qui raconte des histoires sur les marginaux.",
        promptInstruction: "Le prompt doit décrire une fusion de punk rock et de country, avec une voix masculine rauque et narrative.",
        lyricInstruction: "Les paroles doivent raconter des histoires sur des thèmes de la classe ouvrière, du tatouage et du chagrin."
      }
    ]
  },
  {
    name: 'Steppenwolf',
    genres: 'Hard Rock, Psychedelic Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'biker-rock-anthem',
        name: 'Hymne de Rock pour Motards',
        description: "Un son de hard rock brut mené par un orgue Hammond et des riffs de guitare, avec une voix rocailleuse.",
        promptInstruction: "Le prompt doit décrire un hymne de hard rock de la fin des années 60 avec un orgue et une voix masculine rocailleuse.",
        lyricInstruction: "Les paroles doivent porter sur la liberté, la route et la rébellion."
      }
    ]
  },
  {
    name: 'Styx',
    genres: 'Progressive Rock, Arena Rock, Pop Rock',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'theatrical-prog-pop',
        name: 'Prog-Pop Théâtral',
        description: "Combine des éléments de rock progressif avec des refrains de pop de stade et une performance vocale théâtrale.",
        promptInstruction: "Le prompt doit décrire un morceau qui alterne entre des sections de rock progressif et des refrains pop, avec une voix de ténor théâtrale.",
        lyricInstruction: "Les paroles sont souvent des histoires conceptuelles de science-fiction."
      }
    ]
  },
  {
    name: 'Sublime',
    genres: 'Ska Punk, Reggae Rock',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'laid-back-ska-punk',
        name: 'Ska-Punk Décontracté',
        description: "Un mélange décontracté de ska, de punk, de reggae et de hip-hop avec une attitude de plage californienne.",
        promptInstruction: "Le prompt doit décrire une fusion décontractée de ska, de reggae et de punk.",
        lyricInstruction: "Les paroles portent sur la vie en Californie, la fête et la marijuana."
      }
    ]
  },
  {
    name: 'T. Rex',
    genres: 'Glam Rock, Rock and Roll, Psychedelic Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'glam-rock-boogie',
        name: 'Boogie Glam Rock',
        description: "Des riffs de guitare simples et groovy sur un rythme de boogie-rock, avec une voix distinctive et des paroles fantastiques.",
        promptInstruction: "Le prompt doit décrire un morceau de glam rock avec un rythme de boogie et une voix masculine unique.",
        lyricInstruction: "Les paroles doivent être surréalistes et poétiques, avec des thèmes de voitures, d'espace et de mysticisme."
      }
    ]
  },
  {
    name: 'Thin Lizzy',
    genres: 'Hard Rock, Blues Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'dual-lead-guitar-harmonies',
        name: 'Harmonies de Guitares Jumelles',
        description: "Un son de hard rock mené par deux guitares électriques qui jouent des mélodies et des solos en harmonie.",
        promptInstruction: "Le prompt doit décrire un morceau de hard rock avec des harmonies de guitares jumelles proéminentes.",
        lyricInstruction: "Inclus une section [twin-guitar-solo]. Les paroles racontent souvent des histoires sur des personnages de la classe ouvrière."
      }
    ]
  },
  {
    name: 'Toto',
    genres: 'Rock, Pop Rock, Soft Rock',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'polished-studio-rock',
        name: 'Rock de Studio Poli',
        description: "Un son de rock et de pop parfaitement produit avec une musicalité virtuose et des refrains massifs.",
        promptInstruction: "Le prompt doit décrire une production de rock de studio des années 80 très polie, avec des synthétiseurs et un refrain hymnique.",
        lyricInstruction: "Les paroles sont souvent sur l'amour ou des thèmes épiques."
      }
    ]
  },
  {
    name: 'Twisted Sister',
    genres: 'Glam Metal, Heavy Metal',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'rebellious-glam-metal-anthem',
        name: 'Hymne Glam Metal Rebelle',
        description: "Des hymnes de glam metal simples et directs avec des refrains scandés et des paroles sur la rébellion adolescente.",
        promptInstruction: "Le prompt doit décrire un hymne de glam metal avec un refrain scandé et une attitude rebelle.",
        lyricInstruction: "Le refrain doit être un cri de ralliement pour la jeunesse. Marque-le avec [gang-vocals]."
      }
    ]
  },
  {
    name: 'Van Morrison',
    genres: 'Soul, R&B, Folk Rock, Celtic',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'celtic-soul-improvisation',
        name: 'Improvisation "Celtic Soul"',
        description: "Un mélange de soul, de R&B, de folk et de musique celtique, avec une performance vocale improvisée et passionnée.",
        promptInstruction: "Le prompt doit décrire une performance vocale masculine de 'blue-eyed soul' avec beaucoup d'improvisation et de répétition, sur un fond de R&B avec une section de cuivres.",
        lyricInstruction: "La livraison vocale doit être libre et expressive, avec des répétitions de phrases pour un effet hypnotique."
      }
    ]
  },
  {
    name: 'Weezer',
    genres: 'Alternative Rock, Power Pop, Geek Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'geek-rock-power-pop',
        name: 'Power Pop "Geek Rock"',
        description: "Combine des riffs de guitare lourds avec des mélodies pop extrêmement accrocheuses et des paroles maladroites et sincères ('geek rock').",
        promptInstruction: "Le prompt doit décrire un morceau de power pop avec des guitares 'crunchy' et des paroles sur des thèmes 'geek'.",
        lyricInstruction: "Les paroles doivent être sincères et un peu maladroites, sur des thèmes d'amour non partagé ou d'aliénation sociale."
      }
    ]
  },
  {
    name: 'Whitesnake',
    genres: 'Hard Rock, Heavy Metal, Blues Rock',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'bluesy-hard-rock-ballad',
        name: 'Ballade Hard Rock Bluesy',
        description: "Des power ballades de hard rock avec de fortes influences blues et une voix masculine puissante et rauque.",
        promptInstruction: "Le prompt doit décrire une power ballade de hard rock des années 80 avec une voix masculine rauque et bluesy.",
        lyricInstruction: "Les paroles doivent être une déclaration d'amour dramatique."
      }
    ]
  },
  {
    name: 'The Yardbirds',
    genres: 'Blues Rock, Psychedelic Rock, R&B',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'guitar-innovators',
        name: 'Innovateurs de la Guitare',
        description: "Un son de blues rock qui a servi de terrain de jeu pour des guitaristes innovants, avec du feedback et de la distorsion.",
        promptInstruction: "Le prompt doit décrire un son de blues rock britannique des années 60 avec une guitare électrique expérimentale.",
        lyricInstruction: "La chanson doit comporter une section pour un solo de guitare innovant. Marque-la avec [experimental-guitar-solo]."
      }
    ]
  },
  {
    name: 'Yngwie Malmsteen',
    genres: 'Neoclassical Metal, Heavy Metal',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'neoclassical-guitar-shredding',
        name: 'Shredding de Guitare Néoclassique',
        description: "Combine le heavy metal avec des harmonies et des arpèges de la musique classique, mené par des solos de guitare extrêmement rapides et techniques ('shred').",
        promptInstruction: "Le prompt doit décrire un morceau de metal néoclassique avec des solos de guitare 'shred' très rapides et des arpèges classiques.",
        lyricInstruction: "La chanson doit être une vitrine pour des solos de guitare virtuoses. Marque-les avec [shred-solo]."
      }
    ]
  },
  {
    name: 'BTS',
    genres: 'K-Pop, Pop, Hip Hop, R&B, Korean',
    suggestedStructureValue: 'kpop-standard-rap-bridge',
    specialTraits: [
      {
        id: 'rap-vocal-line-dynamic',
        name: 'Dynamique Rap Line & Vocal Line',
        description: "Alterne entre des couplets de rap puissants et techniques et des pré-refrains/ponts chantés avec des voix émotives.",
        promptInstruction: "Le prompt doit décrire une production K-Pop dynamique avec une alternance claire entre des sections de rap percutantes (Rap Line) et des sections chantées mélodiques et émotives (Vocal Line).",
        lyricInstruction: "Structure la chanson avec des couplets de rap distincts et des parties chantées. Marque les couplets de rap avec [rap-verse] et les ponts chantés avec [vocal-bridge]."
      }
    ]
  },
  {
    name: 'BLACKPINK',
    genres: 'K-Pop, EDM, Hip Hop, Trap, Korean',
    suggestedStructureValue: 'kpop-performance-dance-break',
    specialTraits: [
      {
        id: 'girl-crush-english-hooks',
        name: 'Concept "Girl Crush" & Refrains en Anglais',
        description: "Un son EDM/Trap puissant avec une attitude confiante et 'badass' (girl crush), et des phrases accrocheuses en anglais dans le refrain.",
        promptInstruction: "Le prompt doit décrire un son K-Pop 'girl crush' avec un beat lourd (trap/EDM), une attitude confiante et un refrain contenant une phrase en anglais mémorable ('hook').",
        lyricInstruction: "Les paroles doivent être pleines d'assurance. Le refrain doit inclure une phrase simple et percutante en anglais."
      }
    ]
  },
  {
    name: 'TWICE',
    genres: 'K-Pop, Bubblegum Pop, Dance-pop, Korean',
    suggestedStructureValue: 'kpop-standard-rap-bridge',
    specialTraits: [
      {
        id: 'bubblegum-pop-killing-part',
        name: 'Bubblegum Pop & "Killing Part"',
        description: "Un son pop brillant et joyeux ('bubblegum') avec un refrain extrêmement accrocheur et une section courte et mémorable (killing part) conçue pour être virale.",
        promptInstruction: "Le prompt doit décrire une production K-Pop 'bubblegum' très entraînante et positive, avec un refrain très mélodique et une section 'killing part' avec une phrase simple et mignonne.",
        lyricInstruction: "Les paroles doivent être mignonnes et joyeuses. Inclus une section courte et répétitive marquée avec [killing-part]."
      }
    ]
  },
  {
    name: 'Stray Kids',
    genres: 'K-Pop, Hip Hop, Electronic, Korean',
    suggestedStructureValue: 'kpop-performance-dance-break',
    specialTraits: [
      {
        id: 'self-produced-noisy-music',
        name: 'Musique "Bruyante" & Auto-produite',
        description: "Un son hip-hop expérimental et auto-produit, avec des beats intenses et des textures sonores 'bruyantes' (noisy music).",
        promptInstruction: "Le prompt doit décrire un son K-Pop hip-hop avec une production expérimentale et des éléments électroniques abrasifs, reflétant un style auto-produit.",
        lyricInstruction: "Les paroles doivent porter sur des thèmes de la confiance en soi, de la lutte et de l'individualité, avec une livraison agressive."
      }
    ]
  },
  {
    name: 'NewJeans',
    genres: 'K-Pop, R&B, Jersey Club, UK Garage, Korean',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'y2k-easy-listening',
        name: 'Ambiance Y2K & "Easy-Listening"',
        description: "Un son R&B décontracté avec des influences Jersey Club ou UK Garage, une esthétique visuelle Y2K et des mélodies douces.",
        promptInstruction: "Le prompt doit décrire un son K-Pop R&B minimaliste et 'easy-listening' avec une production inspirée des années 90/2000 et un rythme Jersey Club.",
        lyricInstruction: "Les paroles doivent être simples et conversationnelles, sur des thèmes de l'amitié et de l'amour adolescent."
      }
    ]
  },
  {
    name: 'SEVENTEEN',
    genres: 'K-Pop, Pop, R&B, Korean',
    suggestedStructureValue: 'kpop-standard-rap-bridge',
    specialTraits: [
      {
        id: 'synchronized-performance-funk',
        name: 'Performance Synchronisée & Funk',
        description: "Un son pop-funk frais avec des harmonies vocales et une énergie qui évoque une performance de groupe très synchronisée.",
        promptInstruction: "Le prompt doit décrire un son K-Pop avec des influences funk, une production brillante et des harmonies vocales de groupe.",
        lyricInstruction: "Les paroles doivent être optimistes et porter sur l'amitié et la jeunesse."
      }
    ]
  },
  {
    name: '(G)I-DLE',
    genres: 'K-Pop, Hip Hop, Pop Rock, Korean',
    suggestedStructureValue: 'kpop-performance-dance-break',
    specialTraits: [
      {
        id: 'concept-queens-vocal-diversity',
        name: 'Reines du Concept & Diversité Vocale',
        description: "Connues pour leur capacité à changer radicalement de concept à chaque sortie, avec une mise en avant des différentes textures vocales des membres.",
        promptInstruction: "Le prompt doit décrire un concept fort et unique (ex: rock, latin, horreur) avec une production K-Pop et une mise en valeur de différents tons de voix féminines.",
        lyricInstruction: "Les paroles doivent être thématiques et correspondre à un concept fort, avec des sections qui pourraient être chantées par des voix aux timbres différents (grave, aigu, nasillard)."
      }
    ]
  },
  {
    name: 'aespa',
    genres: 'K-Pop, Hyperpop, Electronic, Korean',
    suggestedStructureValue: 'kpop-performance-dance-break',
    specialTraits: [
      {
        id: 'hyperpop-metaverse-concept',
        name: 'Hyperpop & Concept Métavers',
        description: "Un son hyperpop futuriste avec des basses lourdes, des synthés métalliques et des paroles sur un univers de métavers et d'avatars IA.",
        promptInstruction: "Le prompt doit décrire une production K-Pop hyperpop avec des textures sonores agressives et futuristes, et des thèmes lyriques sur la technologie et la réalité virtuelle.",
        lyricInstruction: "Les paroles doivent inclure un vocabulaire lié à l'IA, au métavers et à la technologie (ex: 'Naevis', 'synk', 'avatar')."
      }
    ]
  },
  {
    name: 'Red Velvet',
    genres: 'K-Pop, R&B, Electropop, Korean',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'red-velvet-duality',
        name: 'Dualité "Red" & "Velvet"',
        description: "Alterne entre un côté 'Red' (pop, excentrique, estival) et un côté 'Velvet' (R&B mature, sensuel, sombre).",
        promptInstruction: "Le prompt doit spécifier un côté : soit 'Red' pour une pop entraînante et excentrique, soit 'Velvet' pour un son R&B sophistiqué et sensuel.",
        lyricInstruction: "Pour le côté 'Red', les paroles sont ludiques. Pour le côté 'Velvet', les paroles sont plus matures et poétiques."
      }
    ]
  },
  {
    name: 'IU',
    genres: 'K-Pop, Ballad, Folk-Pop, Korean',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'lyrical-storyteller-clear-vocals',
        name: 'Conteuse Lyrique & Voix Claire',
        description: "Une voix féminine claire et expressive qui raconte des histoires poignantes sur une instrumentation souvent acoustique ou orchestrale.",
        promptInstruction: "Le prompt doit décrire une ballade ou un morceau folk-pop avec une voix féminine claire et narrative, et des arrangements soignés (acoustiques ou avec des cordes).",
        lyricInstruction: "Les paroles doivent raconter une histoire détaillée ou explorer une émotion profonde avec une grande sincérité."
      }
    ]
  },
  {
    name: 'TAEMIN',
    genres: 'K-Pop, R&B, Dance, Korean',
    suggestedStructureValue: 'kpop-performance-dance-break',
    specialTraits: [
      {
        id: 'dark-rnb-performance-art',
        name: 'R&B Sombre & Performance Artistique',
        description: "Un son R&B sombre et sensuel avec une production électronique, conçu pour une performance de danse expressive et artistique.",
        promptInstruction: "Le prompt doit décrire un morceau de R&B/dance avec une ambiance sombre et théâtrale, et une voix masculine androgyne et aérienne.",
        lyricInstruction: "Les paroles doivent être sensuelles et poétiques. La structure doit inclure un [dance-break] pour mettre en valeur la chorégraphie."
      }
    ]
  },
  {
    name: 'Harry Styles',
    genres: 'Pop Rock, Soft Rock, Funk Pop',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: '70s-rock-pop-flair',
        name: 'Flair Pop-Rock 70s',
        description: "Un son pop-rock moderne avec des influences du soft-rock et du funk des années 70, des harmonies vocales et une instrumentation live.",
        promptInstruction: "Le prompt doit décrire un morceau de pop-rock avec des guitares funky, un piano, et des harmonies vocales luxuriantes, évoquant le son de la Californie des années 70.",
        lyricInstruction: "Les paroles doivent être introspectives sur l'amour et les relations, avec un ton charismatique et parfois énigmatique."
      },
      {
        id: 'energetic-bridge-buildup',
        name: 'Montée en Puissance du Pont',
        description: "Crée un pont qui monte en intensité, souvent avec des chœurs et une instrumentation plus riche, menant à un refrain final explosif.",
        promptInstruction: "Le pont de la chanson doit être un crescendo émotionnel et musical, ajoutant des couches d'instruments et des chœurs.",
        lyricInstruction: "Le pont doit servir de climax émotionnel, avec une livraison vocale plus passionnée avant le dernier refrain."
      }
    ]
  },
  {
    name: 'Doja Cat',
    genres: 'Pop, R&B, Hip Hop',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'versatile-pop-rap-flow',
        name: 'Polyvalence Pop-Rap',
        description: "Alterne sans effort entre un rap technique, un chant R&B sensuel et des refrains pop viraux.",
        promptInstruction: "Le prompt doit décrire une production pop ou R&B colorée, avec une performance vocale féminine qui passe facilement du rap au chant.",
        lyricInstruction: "Les paroles doivent être pleines d'esprit, confiantes et souvent humoristiques. Alterne les sections de rap et de chant."
      }
    ]
  },
  {
    name: 'Lizzo',
    genres: 'Pop, Funk, R&B, Hip Hop',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'body-positivity-funk-anthems',
        name: 'Hymnes Funk & "Body Positivity"',
        description: "Des hymnes funk et pop énergiques avec des paroles sur la confiance en soi, l'amour-propre et la positivité corporelle, souvent accompagnés de solos de flûte.",
        promptInstruction: "Le prompt doit décrire un morceau de funk-pop moderne avec une section de cuivres, une ligne de basse groovy, et une performance vocale féminine puissante et charismatique.",
        lyricInstruction: "Les paroles doivent être des affirmations positives et hymniques. Peut inclure une section [flute-solo]."
      }
    ]
  },
  {
    name: 'Jack Harlow',
    genres: 'Hip Hop, Pop Rap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'laid-back-charismatic-flow',
        name: 'Flow Charismatique & Décontracté',
        description: "Un flow de rap décontracté, confiant et conversationnel avec un charme nonchalant.",
        promptInstruction: "Le prompt doit décrire un beat de trap ou de pop-rap avec un flow de rap masculin décontracté et plein d'assurance.",
        lyricInstruction: "Les paroles doivent être pleines d'esprit et de vantardise, avec une livraison nonchalante."
      }
    ]
  },
  {
    name: 'Megan Thee Stallion',
    genres: 'Hip Hop, Trap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'confident-female-empowerment-rap',
        name: 'Rap d\'Émancipation Féminine',
        description: "Un flow de rap agressif et confiant avec des paroles sur l'autonomisation des femmes, la sexualité et le succès, incluant l'ad-lib 'ah!'.",
        promptInstruction: "Le prompt doit décrire un beat trap lourd du Sud avec une performance de rap féminin dominante et confiante.",
        lyricInstruction: "Les paroles doivent être audacieuses et sans concession. Inclus des ad-libs comme (Ah!)."
      }
    ]
  },
  {
    name: 'Roddy Ricch',
    genres: 'Hip Hop, Melodic Rap, Trap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'melodic-west-coast-flow',
        name: 'Flow Mélodique de la Côte Ouest',
        description: "Un flow de rap mélodique et plaintif, souvent avec un ton de 'pain music', sur des beats de trap de la côte Ouest.",
        promptInstruction: "Le prompt doit décrire un beat trap de la côte Ouest avec un piano, et une voix de rap masculine mélodique et émotive.",
        lyricInstruction: "Les paroles doivent porter sur les luttes de la rue et le succès, avec une livraison vocale qui chante presque les rimes."
      }
    ]
  },
  {
    name: 'Pop Smoke',
    genres: 'Drill, Hip Hop',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'brooklyn-drill-deep-voice',
        name: 'Drill de Brooklyn & Voix Grave',
        description: "Une voix masculine très grave et menaçante sur des productions de drill de Brooklyn avec des basses 808 glissantes.",
        promptInstruction: "Le prompt doit décrire un beat de drill de Brooklyn avec des basses 808 glissantes et des samples vocaux, et une voix masculine très grave et agressive.",
        lyricInstruction: "Les paroles doivent être sur la vie de la rue, avec des ad-libs comme (Woo!)."
      }
    ]
  },
  {
    name: 'The Kid LAROI',
    genres: 'Pop Rap, Emo Rap, Alternative Rock',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'emo-pop-rap-vocals',
        name: 'Vocaux Pop-Rap Émo',
        description: "Combine des mélodies pop accrocheuses avec un flow de rap influencé par l'emo, sur des productions pop-rock.",
        promptInstruction: "Le prompt doit décrire une production pop-rock avec une voix masculine jeune et émotive qui alterne entre chant et rap.",
        lyricInstruction: "Les paroles doivent porter sur le chagrin d'amour et l'angoisse adolescente."
      }
    ]
  },
  {
    name: 'DaBaby',
    genres: 'Hip Hop, Trap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'percussive-choppy-flow',
        name: 'Flow Percussif & Haché',
        description: "Un flow de rap rapide, percussif et haché qui s'arrête et repart de manière imprévisible, avec des ad-libs comme 'Let's go!'.",
        promptInstruction: "Le prompt doit décrire un beat trap avec une basse 808 lourde, et un flow de rap masculin rapide et percussif.",
        lyricInstruction: "Le flow doit être rapide et syncopé. Inclus des ad-libs comme (Let's go!)."
      }
    ]
  },
  {
    name: 'Gunna',
    genres: 'Hip Hop, Trap, Melodic Rap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'effortless-melodic-flow',
        name: 'Flow Mélodique & Sans Effort',
        description: "Un flow de rap extrêmement fluide, mélodique et décontracté sur des beats trap atmosphériques.",
        promptInstruction: "Le prompt doit décrire un beat trap atmosphérique avec des guitares ou des flûtes, et un flow de rap masculin très doux et mélodique.",
        lyricInstruction: "Les paroles portent sur la mode, la richesse et le style de vie, avec une livraison nonchalante."
      }
    ]
  },
  {
    name: 'Latto',
    genres: 'Hip Hop, Trap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'big-energy-southern-rap',
        name: 'Rap du Sud & "Big Energy"',
        description: "Un flow confiant et charismatique du Sud avec des paroles sur le succès, l'indépendance et le luxe.",
        promptInstruction: "Le prompt doit décrire un beat trap du Sud avec une performance de rap féminin pleine d'assurance et d'énergie.",
        lyricInstruction: "Les paroles doivent être vantardes et pleines d'attitude."
      }
    ]
  },
  {
    name: 'Giveon',
    genres: 'R&B, Soul',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'cinematic-baritone-rnb',
        name: 'R&B Cinématographique & Baryton',
        description: "Une voix de baryton distinctive, riche et profonde, sur des ballades R&B atmosphériques et cinématiques.",
        promptInstruction: "Le prompt doit décrire une ballade R&B avec une voix masculine de baryton profonde et émotive.",
        lyricInstruction: "Les paroles doivent raconter des histoires de chagrin d'amour et de vulnérabilité."
      }
    ]
  },
  {
    name: 'Summer Walker',
    genres: 'R&B, Alternative R&B',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'moody-guitar-driven-rnb',
        name: 'R&B Maussade & Guitare',
        description: "Un son R&B alternatif avec des guitares acoustiques mélancoliques et des paroles brutalement honnêtes sur les relations.",
        promptInstruction: "Le prompt doit décrire un morceau de R&B maussade avec une guitare acoustique et une voix féminine douce et conversationnelle.",
        lyricInstruction: "Les paroles doivent être des confessions directes sur la toxicité et le désir."
      }
    ]
  },
  {
    name: 'Kehlani',
    genres: 'R&B, Pop',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: '90s-rnb-revival',
        name: 'Renaissance R&B des Années 90',
        description: "Un son R&B qui s'inspire de l'âge d'or des années 90, avec des harmonies douces et des paroles sur l'amour et l'indépendance.",
        promptInstruction: "Le prompt doit décrire un son R&B moderne avec des influences des années 90 et une voix féminine douce et agile.",
        lyricInstruction: "Les paroles doivent être confiantes et vulnérables à la fois."
      }
    ]
  },
  {
    name: 'Steve Lacy',
    genres: 'R&B, Indie Pop, Funk',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'lofi-funky-guitar-rnb',
        name: 'R&B Lo-fi & Guitare Funky',
        description: "Un son R&B lo-fi et décontracté mené par des lignes de guitare funky et une voix douce.",
        promptInstruction: "Le prompt doit décrire un morceau de R&B lo-fi avec des guitares funky et une voix masculine décontractée.",
        lyricInstruction: "Les paroles doivent porter sur le désir et l'incertitude dans les relations."
      }
    ]
  },
  {
    name: 'Brent Faiyaz',
    genres: 'Alternative R&B, Contemporary R&B',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'toxic-atmospheric-rnb',
        name: 'R&B Atmosphérique & "Toxique"',
        description: "Un son R&B sombre et atmosphérique avec une voix masculine suave et des paroles brutalement honnêtes et souvent 'toxiques' sur les relations.",
        promptInstruction: "Le prompt doit décrire un beat R&B atmosphérique avec une voix masculine suave et nonchalante.",
        lyricInstruction: "Les paroles doivent être introspectives, explorant les côtés sombres de l'amour et du désir."
      }
    ]
  },
  {
    name: 'Morgan Wallen',
    genres: 'Country, Pop Country',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'country-rock-twang',
        name: 'Country Rock & "Twang"',
        description: "Un son country moderne qui mélange des éléments rock et pop, avec une voix masculine distinctive avec un accent du Sud ('twang').",
        promptInstruction: "Le prompt doit décrire un morceau de country-rock avec une voix masculine ayant un accent du Sud prononcé.",
        lyricInstruction: "Les paroles doivent porter sur des thèmes de la petite ville, de la fête et du chagrin d'amour."
      }
    ]
  },
  {
    name: 'Luke Combs',
    genres: 'Country, Country Pop',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'powerful-baritone-country',
        name: 'Baryton Country Puissant',
        description: "Une voix de baryton puissante et rauque qui livre des hymnes country relatables.",
        promptInstruction: "Le prompt doit décrire un hymne de country-rock avec une voix de baryton masculine puissante et émotive.",
        lyricInstruction: "Les paroles doivent être sincères et relatables, sur des thèmes comme le travail, l'amour et la bière."
      }
    ]
  },
  {
    name: 'Zach Bryan',
    genres: 'Country, Americana, Folk',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'raw-lofi-americana',
        name: 'Americana Brut & Lo-fi',
        description: "Un son country/folk brut et dépouillé avec une instrumentation simple (guitare acoustique, harmonica) et des paroles poétiques et profondément personnelles.",
        promptInstruction: "Le prompt doit décrire une production country lo-fi avec une guitare acoustique et une voix masculine passionnée et brute.",
        lyricInstruction: "Les paroles doivent être des histoires poétiques et émotionnelles sur la vie, la perte et la route."
      }
    ]
  },
  {
    name: 'Karol G',
    genres: 'Reggaeton, Latin Pop, Latin Trap, Spanish',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'empowered-reggaeton-pop',
        name: 'Reggaeton Pop & Émancipation',
        description: "Des hymnes de reggaeton et de pop latine avec une voix féminine confiante et des paroles sur l'autonomisation, le chagrin d'amour et la fête.",
        promptInstruction: "Le prompt doit décrire un morceau de reggaeton-pop dansant avec une voix féminine charismatique.",
        lyricInstruction: "Les paroles doivent être en espagnol, sur des thèmes de la force après une rupture."
      }
    ]
  },
  {
    name: 'Peso Pluma',
    genres: 'Corridos Tumbados, Regional Mexican, Spanish',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'corridos-tumbados-style',
        name: 'Style Corridos Tumbados',
        description: "Fusionne les corridos mexicains traditionnels avec des rythmes de trap, une guitare acoustique proéminente et une voix nasillarde unique.",
        promptInstruction: "Le prompt doit décrire un beat de trap fusionné avec des guitares acoustiques de musique régionale mexicaine et une voix masculine nasillarde.",
        lyricInstruction: "Les paroles doivent être des récits de rue (corridos) avec une attitude moderne."
      }
    ]
  },
  {
    name: 'Rauw Alejandro',
    genres: 'Reggaeton, Latin R&B, Pop, Spanish',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'futuristic-rnb-reggaeton',
        name: 'Reggaeton R&B Futuriste',
        description: "Un son qui mélange reggaeton, R&B et dance-pop avec une production futuriste et une voix masculine douce en fausset.",
        promptInstruction: "Le prompt doit décrire une production de reggaeton avec des synthés futuristes et une voix masculine douce, utilisant souvent le fausset.",
        lyricInstruction: "Les paroles sont sur le désir et la danse, avec une livraison vocale douce."
      }
    ]
  },
  {
    name: 'Burna Boy',
    genres: 'Afrobeats, Dancehall, Afro-fusion',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'afro-fusion-baritone',
        name: 'Afro-fusion & Baryton',
        description: "Une voix de baryton profonde et douce sur une fusion de genres (afrobeats, dancehall, R&B, hip-hop) avec un message panafricain.",
        promptInstruction: "Le prompt doit décrire un son 'afro-fusion' avec une voix masculine de baryton charismatique.",
        lyricInstruction: "Les paroles, souvent en anglais Pidgin, portent sur l'histoire africaine, la politique et la célébration."
      }
    ]
  },
  {
    name: 'Rema',
    genres: 'Afrobeats, Afro-Rave',
    suggestedStructureValue: 'edm-dance-drop',
    specialTraits: [
      {
        id: 'afro-rave-indian-influences',
        name: 'Afro-Rave & Influences Indiennes',
        description: "Un son afrobeats unique qui incorpore des mélodies et des influences de la musique indienne, créant un son 'afro-rave' hypnotique.",
        promptInstruction: "Le prompt doit décrire un morceau d'afrobeats avec des mélodies et des vocalises d'inspiration indienne.",
        lyricInstruction: "La livraison vocale est mélodique et utilise des ad-libs uniques."
      }
    ]
  },
  {
    name: 'Tems',
    genres: 'Alternative R&B, Afrobeats, Soul',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'deep-contralto-alt-rnb',
        name: 'Contralto Profond & R&B Alternatif',
        description: "Une voix de contralto distinctive, profonde et pleine d'âme, sur des productions R&B alternatives et atmosphériques.",
        promptInstruction: "Le prompt doit décrire un morceau de R&B alternatif avec une voix féminine de contralto profonde et émotive.",
        lyricInstruction: "Les paroles sont introspectives et portent sur la liberté et la vulnérabilité."
      }
    ]
  },
  {
    name: 'Mitski',
    genres: 'Indie Rock, Art Pop',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'cathartic-crescendo',
        name: 'Crescendo Cathartique',
        description: "Des chansons qui commencent de manière sobre et montent en un crescendo orchestral ou rock intense et cathartique, avec des paroles sur le désir et l'aliénation.",
        promptInstruction: "Le prompt doit décrire un morceau d'indie rock qui construit une tension jusqu'à une explosion orchestrale ou de guitare distordue.",
        lyricInstruction: "Les paroles doivent être poétiques et brutalement honnêtes, avec une livraison vocale qui passe de la retenue à la puissance."
      }
    ]
  },
  {
    name: 'beabadoobee',
    genres: 'Indie Rock, Bedroom Pop, 90s Alternative',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: '90s-alt-rock-revival',
        name: 'Renaissance Rock Alternatif 90s',
        description: "Un son qui émule le rock alternatif des années 90, avec des guitares 'fuzzy' et une voix douce et rêveuse.",
        promptInstruction: "Le prompt doit décrire un son de rock alternatif des années 90 avec des guitares distordues et une voix féminine douce.",
        lyricInstruction: "Les paroles sont introspectives, sur des thèmes de l'adolescence et des relations."
      }
    ]
  },
  {
    name: 'Wet Leg',
    genres: 'Indie Rock, Post-Punk',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'deadpan-post-punk-lyrics',
        name: 'Paroles Post-Punk & Ton Pince-sans-rire',
        description: "Des riffs de guitare post-punk entraînants avec des paroles pleines d'esprit, ironiques et livrées avec un ton pince-sans-rire (deadpan).",
        promptInstruction: "Le prompt doit décrire un morceau de post-punk avec des guitares angulaires et des voix féminines livrées avec une attitude pince-sans-rire.",
        lyricInstruction: "Les paroles doivent être des observations humoristiques et absurdes sur la vie moderne."
      }
    ]
  },
  {
    name: 'Turnstile',
    genres: 'Hardcore Punk, Alternative Rock, Dream Pop',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'genre-blending-hardcore',
        name: 'Hardcore & Fusion de Genres',
        description: "Un son hardcore punk qui incorpore de manière inattendue des éléments de R&B, de dream pop et de rock latino.",
        promptInstruction: "Le prompt doit décrire une fusion de hardcore punk avec des breakbeats funky, des synthés dream pop ou des percussions latines.",
        lyricInstruction: "Les paroles sont positives, sur l'unité et l'expression de soi."
      }
    ]
  },
  {
    name: 'IDLES',
    genres: 'Post-Punk, Punk Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'political-post-punk-shouting',
        name: 'Post-Punk Politique & Chant Scandé',
        description: "Un son post-punk agressif mené par une basse, avec une performance vocale scandée et passionnée livrant des paroles politiques et vulnérables.",
        promptInstruction: "Le prompt doit décrire un morceau de post-punk avec une basse proéminente et une voix masculine scandée et agressive.",
        lyricInstruction: "Les paroles doivent être des commentaires sociaux directs et puissants."
      }
    ]
  },
  {
    name: 'PLK',
    genres: 'French Rap, Trap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'technical-kick-rap',
        name: 'Rap Technique & "Kicker"',
        description: "Un flow de rap technique et énergique, axé sur la performance et les rimes complexes ('kicker').",
        promptInstruction: "Le prompt doit décrire un beat de trap français avec un flow de rap rapide, technique et percutant.",
        lyricInstruction: "Les paroles doivent être pleines de punchlines et de démonstrations de prouesses techniques."
      }
    ]
  },
  {
    name: 'Hamza',
    genres: 'French Rap, R&B, Trap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'sauce-god-melodic-rap',
        name: 'Rap Mélodique & "Sauce"',
        description: "Un flow de rap très mélodique et auto-tuné, inspiré du rap d'Atlanta, sur des productions trap atmosphériques.",
        promptInstruction: "Le prompt doit décrire un beat de trap mélodique avec une voix masculine auto-tunée et pleine de 'sauce' (charisme).",
        lyricInstruction: "Les paroles portent sur des thèmes de luxe, de relations et de style de vie."
      }
    ]
  },
  {
    name: 'Central Cee',
    genres: 'UK Drill, British Hip Hop',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'uk-drill-storytelling',
        name: 'Narration UK Drill',
        description: "Un flow de rap décontracté sur des beats de UK drill, avec des paroles qui racontent des histoires de la rue et du succès.",
        promptInstruction: "Le prompt doit décrire un beat de UK drill avec des basses 808 glissantes et un flow de rap britannique confiant.",
        lyricInstruction: "Les paroles doivent utiliser de l'argot britannique et raconter des histoires de rue."
      }
    ]
  },
  {
    name: 'Ice Spice',
    genres: 'Drill, Hip Hop',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'effortless-bronx-drill-flow',
        name: 'Flow Drill du Bronx Sans Effort',
        description: "Un flow de rap décontracté et nonchalant sur des beats de drill du Bronx, avec des paroles pleines d'assurance et des ad-libs signature.",
        promptInstruction: "Le prompt doit décrire un beat de drill du Bronx avec un flow de rap féminin décontracté et confiant.",
        lyricInstruction: "Les paroles doivent être courtes, percutantes et pleines d'attitude. Inclus des ad-libs comme (Grah!)."
      }
    ]
  },
  {
    name: 'Tate McRae',
    genres: 'Pop, Alternative Pop, R&B',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'breathy-pop-vocals-dance',
        name: 'Voix Pop Aérienne & Danse',
        description: "Une voix féminine aérienne et émotive sur des productions pop sombres avec des rythmes de danse.",
        promptInstruction: "Le prompt doit décrire un morceau de dance-pop avec une voix féminine aérienne et des paroles introspectives.",
        lyricInstruction: "Les paroles portent sur l'angoisse et le chagrin d'amour dans les relations modernes."
      }
    ]
  },
  {
    name: 'Sabrina Carpenter',
    genres: 'Pop, Dance-pop',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'witty-confident-pop',
        name: 'Pop Confiante & Pleine d\'Esprit',
        description: "Des hymnes pop accrocheurs avec des paroles pleines d'esprit, de doubles sens et une livraison vocale confiante.",
        promptInstruction: "Le prompt doit décrire une production de dance-pop brillante avec une voix féminine charismatique et des paroles intelligentes.",
        lyricInstruction: "Les paroles doivent être pleines de jeux de mots et d'une confiance enjouée."
      }
    ]
  },
  {
    name: 'Chappell Roan',
    genres: 'Synth-pop, Pop Rock, Camp',
    suggestedStructureValue: 'pop-full-prechorus',
    specialTraits: [
      {
        id: 'campy-synth-pop-anthem',
        name: 'Hymne Synth-Pop "Camp"',
        description: "Un son synth-pop grandiose et théâtral avec une esthétique 'camp', des refrains massifs et des paroles sur l'expérience queer.",
        promptInstruction: "Le prompt doit décrire un hymne synth-pop des années 80 avec une performance vocale dramatique et une production extravagante.",
        lyricInstruction: "Les paroles doivent être exagérées, théâtrales et célébrer l'identité queer."
      }
    ]
  },
  {
    name: 'Reneé Rapp',
    genres: 'Pop, Pop Rock',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'powerful-belt-pop-rock',
        name: 'Pop-Rock & Voix "Beltée"',
        description: "Une performance vocale puissante issue de Broadway, avec un 'belting' impressionnant, sur des productions pop-rock.",
        promptInstruction: "Le prompt doit décrire un morceau de pop-rock avec une voix féminine très puissante, utilisant la technique du 'belting' dans les refrains.",
        lyricInstruction: "Les paroles sont brutalement honnêtes sur la santé mentale et les relations. Le refrain doit être chanté avec une grande puissance."
      }
    ]
  },
  {
    name: 'Benson Boone',
    genres: 'Pop, Ballad',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'raw-emotional-power-ballad',
        name: 'Power Ballade Émotionnelle & Brute',
        description: "Des ballades au piano avec une performance vocale masculine brute, puissante et pleine d'émotion, montant en un crescendo intense.",
        promptInstruction: "Le prompt doit décrire une power ballade au piano avec une voix masculine qui monte en un climax vocal puissant et éraillé.",
        lyricInstruction: "Les paroles portent sur le chagrin d'amour, avec une livraison vocale très intense et passionnée."
      }
    ]
  },
  {
    name: 'Feid',
    genres: 'Reggaeton, Latin Trap, Spanish',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'melodic-reggaeton-slang',
        name: 'Reggaeton Mélodique & Argot Paisa',
        description: "Un son de reggaeton mélodique et atmosphérique avec une voix distinctive et l'utilisation de l'argot de Medellín (Paisa).",
        promptInstruction: "Le prompt doit décrire un beat de reggaeton mélodique avec une voix masculine unique utilisant des termes de l'argot colombien.",
        lyricInstruction: "Les paroles, en espagnol, doivent utiliser de l'argot comme 'mor'."
      }
    ]
  },
  {
    name: 'LE SSERAFIM',
    genres: 'K-Pop, Dance-pop, Afrobeats, Korean',
    suggestedStructureValue: 'kpop-performance-dance-break',
    specialTraits: [
      {
        id: 'fearless-chic-performance',
        name: 'Performance Chic & "Fearless"',
        description: "Un son dance-pop sophistiqué avec des influences latines ou afrobeats, et un message sur le fait d'être sans peur et confiant.",
        promptInstruction: "Le prompt doit décrire une production K-Pop chic et minimaliste avec un rythme dansant (latin ou afrobeats) et une attitude 'fearless'.",
        lyricInstruction: "Les paroles doivent porter sur la confiance en soi et le fait de surmonter les obstacles."
      }
    ]
  },
  {
    name: 'IVE',
    genres: 'K-Pop, Dance-pop, Korean',
    suggestedStructureValue: 'kpop-standard-rap-bridge',
    specialTraits: [
      {
        id: 'chaebol-crush-elegance',
        name: 'Élégance "Chaebol Crush"',
        description: "Un concept qui mélange l'attitude 'girl crush' avec une image luxueuse et élégante ('chaebol'), sur des productions dance-pop sophistiquées.",
        promptInstruction: "Le prompt doit décrire un son K-Pop élégant et confiant avec des refrains accrocheurs et une production polie.",
        lyricInstruction: "Les paroles portent sur l'amour-propre et l'indépendance, avec une attitude chic."
      }
    ]
  },
  {
    name: 'ATEEZ',
    genres: 'K-Pop, Hip Hop, EDM, Korean',
    suggestedStructureValue: 'kpop-performance-dance-break',
    specialTraits: [
      {
        id: 'performance-kings-theatricality',
        name: 'Rois de la Performance & Théâtralité',
        description: "Un son K-Pop puissant et théâtral avec des productions EDM et hip-hop intenses, conçu pour des performances scéniques explosives.",
        promptInstruction: "Le prompt doit décrire une production K-Pop intense et dramatique avec des refrains hymniques et des sections de rap puissantes.",
        lyricInstruction: "Les paroles sont souvent épiques, avec une narration sur des thèmes de pirates ou d'aventure."
      }
    ]
  },
  {
    name: 'TOMORROW X TOGETHER (TXT)',
    genres: 'K-Pop, Pop Rock, Dream Pop, Korean',
    suggestedStructureValue: 'pop-full-prechorus',
    specialTraits: [
      {
        id: 'youthful-storytelling-genre-blend',
        name: 'Narration sur la Jeunesse & Mélange de Genres',
        description: "Explore divers genres (pop-rock, dream pop, R&B) pour raconter des histoires sur les défis et les joies de la jeunesse.",
        promptInstruction: "Le prompt doit décrire une production K-Pop qui mélange des éléments de pop-rock avec des voix masculines jeunes et émotives.",
        lyricInstruction: "Les paroles doivent raconter une histoire conceptuelle sur la croissance et l'adolescence."
      }
    ]
  },
  {
    name: 'Bad Omens',
    genres: 'Metalcore, Alternative Metal',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'industrial-metalcore-anthems',
        name: 'Hymnes Metalcore Industriels',
        description: "Combine des riffs de metalcore lourds avec des éléments électroniques et industriels, et une voix qui alterne entre chant mélodique puissant et cris.",
        promptInstruction: "Le prompt doit décrire un morceau de metalcore avec des synthés industriels, des riffs lourds et un refrain hymnique et mélodique.",
        lyricInstruction: "Alterne entre des couplets agressifs et des refrains chantés puissants."
      }
    ]
  },
  {
    name: 'Teddy Swims',
    genres: 'Soul, R&B, Pop',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'raspy-powerhouse-soul-vocals',
        name: 'Voix Soul Puissante & Rauque',
        description: "Une performance vocale masculine extrêmement puissante et rauque qui livre des ballades soul modernes.",
        promptInstruction: "Le prompt doit décrire une ballade soul avec une voix masculine très puissante, rauque et pleine d'émotion.",
        lyricInstruction: "Les paroles portent sur le chagrin d'amour, avec une livraison vocale passionnée et intense."
      }
    ]
  },
  {
    name: 'Fred again..',
    genres: 'Electronic, House, UK Garage',
    suggestedStructureValue: 'edm-dance-drop',
    specialTraits: [
      {
        id: 'actual-life-vocal-sampling',
        name: 'Sampling Vocal de la "Vraie Vie"',
        description: "Crée des morceaux de house émouvants en utilisant des samples de voix provenant de mémos vocaux, d'appels FaceTime et de vidéos, les transformant en mélodies.",
        promptInstruction: "Le prompt doit décrire un morceau de house euphorique et mélancolique, construit autour d'un sample de voix conversationnelle et non polie.",
        lyricInstruction: "Utilise un court extrait de voix parlée comme thème principal, répété et haché de manière mélodique."
      }
    ]
  },
  {
    name: 'Noah Kahan',
    genres: 'Folk-Pop, Americana, Indie Folk',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'new-england-folk-pop-storytelling',
        name: 'Narration Folk-Pop de la Nouvelle-Angleterre',
        description: "Un son folk-pop avec une énergie brute, des refrains hymniques et des paroles très spécifiques sur la vie dans les petites villes de la Nouvelle-Angleterre.",
        promptInstruction: "Le prompt doit décrire un morceau de folk-pop avec une guitare acoustique entraînante et une voix masculine passionnée et légèrement rauque.",
        lyricInstruction: "Les paroles doivent être des histoires détaillées et introspectives sur la ville natale, la santé mentale et les relations."
      }
    ]
  },
  {
    name: 'Bailey Zimmerman',
    genres: 'Country, Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'raspy-country-rock-vocals',
        name: 'Voix Country-Rock Rauque',
        description: "Une voix masculine très rauque et puissante sur un son qui mélange country et hard rock, avec des thèmes de chagrin d'amour.",
        promptInstruction: "Le prompt doit décrire un morceau de country-rock avec une voix masculine très éraillée et puissante.",
        lyricInstruction: "Les paroles portent sur des ruptures amoureuses, avec une livraison vocale brute et intense."
      }
    ]
  },
  {
    name: 'Jelly Roll',
    genres: 'Country, Hip Hop, Rock',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'genre-blending-redemption-songs',
        name: 'Chansons de Rédemption & Fusion de Genres',
        description: "Mélange country, rock et hip-hop pour raconter des histoires brutes de lutte, de douleur et de rédemption, avec une voix passionnée et pleine d'âme.",
        promptInstruction: "Le prompt doit décrire une fusion de genres (country, rock, rap) avec une voix masculine très émotive et sincère.",
        lyricInstruction: "Les paroles doivent être des témoignages honnêtes sur le passé, la foi et l'espoir."
      }
    ]
  },
  {
    name: 'Olivia Rodrigo',
    genres: 'Pop, Pop Rock, Alternative Pop',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'cathartic-narrative-bridge',
        name: 'Pont Narratif & Cathartique',
        description: "Le pont de la chanson est un climax émotionnel, souvent parlé-chanté, qui révèle une nouvelle perspective crue sur l'histoire de chagrin d'amour.",
        promptInstruction: "Le pont doit être un crescendo dramatique, avec une voix qui devient plus intense et conversationnelle, presque comme un monologue parlé sur la musique.",
        lyricInstruction: "Écris un pont détaillé qui agit comme le point culminant émotionnel, où le ton change. Marque-le avec [cathartic-bridge]."
      }
    ]
  },
  {
    name: 'SZA',
    genres: 'R&B, Alternative R&B, Neo Soul',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'conversational-introspective-rnb',
        name: 'R&B Conversationnel & Introspectif',
        description: "Un style de chant qui imite le rythme de la conversation, avec des paroles brutalement honnêtes et relatables sur les relations, l'anxiété et l'amour-propre.",
        promptInstruction: "Le prompt doit décrire un morceau de R&B alternatif avec une voix féminine conversationnelle et un flow mélodique qui suit les inflexions naturelles de la parole.",
        lyricInstruction: "Les paroles doivent être introspectives, directes et pleines de détails spécifiques, comme si l'on lisait un journal intime."
      }
    ]
  },
  {
    name: 'The Weeknd',
    genres: 'Pop, R&B, Synth-pop',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: '80s-cinematic-synth-pop',
        name: 'Synth-Pop Cinématographique 80s',
        description: "Un son de synth-pop inspiré des années 80, avec des synthétiseurs vintage, une batterie 'gated reverb' et une ambiance sombre et cinématographique.",
        promptInstruction: "Le prompt doit décrire un morceau de synth-pop des années 80 avec des synthétiseurs analogiques proéminents, une production moderne et une voix masculine de ténor planante.",
        lyricInstruction: "Les paroles doivent porter sur des thèmes hédonistes, la célébrité et la solitude, avec une esthétique néo-noir."
      }
    ]
  },
  {
    name: 'Ariana Grande',
    genres: 'Pop, R&B',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'whistle-register-airy-harmonies',
        name: 'Registre Sifflet & Harmonies Aériennes',
        description: "Combine une agilité vocale R&B avec des harmonies aériennes et l'utilisation occasionnelle de notes très aiguës dans le registre de sifflet.",
        promptInstruction: "Le prompt doit décrire une production pop/R&B avec des harmonies vocales féminines superposées et la possibilité d'atteindre des notes très aiguës.",
        lyricInstruction: "Inclus des harmonies vocales complexes. Peut inclure une note extrêmement aiguë marquée avec [whistle-note]."
      }
    ]
  },
  {
    name: 'Justin Bieber',
    genres: 'Pop, R&B',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'smooth-pop-rnb',
        name: 'Pop-R&B Douce',
        description: "Un son pop-R&B avec une production épurée, une voix masculine douce et des mélodies accrocheuses.",
        promptInstruction: "Le prompt doit décrire un morceau de pop-R&B moderne avec une voix de ténor masculine douce.",
        lyricInstruction: "Les paroles portent sur l'amour et les relations."
      }
    ]
  },
  {
    name: 'Tyla',
    genres: 'Amapiano, Pop, R&B',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'sensual-amapiano-pop',
        name: 'Amapiano Pop Sensuel',
        description: "Fusionne les rythmes hypnotiques de l'Amapiano avec des mélodies pop et une voix féminine douce et sensuelle.",
        promptInstruction: "Le prompt doit décrire un morceau de pop avec un rythme Amapiano, incluant des 'log drums' et des shakers, et une voix féminine séduisante.",
        lyricInstruction: "Les paroles doivent être sur la danse et la séduction, avec une livraison vocale douce."
      }
    ]
  },
  {
    name: 'GloRilla',
    genres: 'Hip Hop, Trap, Crunk',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'aggressive-crunk-flow-adlibs',
        name: 'Flow Crunk Agressif & Ad-libs',
        description: "Une voix grave et agressive avec un flow percutant inspiré du crunk, et des ad-libs énergiques comme 'Yeah Glo!'.",
        promptInstruction: "Le prompt doit décrire un beat trap du Sud avec une voix de rap féminine grave et agressive.",
        lyricInstruction: "Les paroles doivent être confiantes et sans concession. Inclus des ad-libs comme (Yeah Glo!)."
      }
    ]
  },
  {
    name: 'Sexyy Red',
    genres: 'Hip Hop, Trap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'irreverent-trap-skeeyee',
        name: 'Trap Irrévérencieux & "SkeeYee"',
        description: "Un style de trap brut et irrévérencieux avec des paroles explicites et un ad-lib signature 'SkeeYee!'.",
        promptInstruction: "Le prompt doit décrire un beat trap simple et percutant avec une voix féminine énergique et pleine d'attitude.",
        lyricInstruction: "Les paroles doivent être audacieuses et explicites. Inclus l'ad-lib (SkeeYee!)."
      }
    ]
  },
  {
    name: 'Young Miko',
    genres: 'Latin Trap, Reggaeton, Spanish',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'bilingual-trap-flow',
        name: 'Latin Trap & Flow Bilingue',
        description: "Un flow de trap confiant qui mélange l'espagnol et l'anglais, avec une attitude 'tomboyish'.",
        promptInstruction: "Le prompt doit décrire un beat de latin trap avec une voix de rap féminine androgyne et charismatique.",
        lyricInstruction: "Mélange des paroles en espagnol et en anglais avec assurance."
      }
    ]
  },
  {
    name: 'Anitta',
    genres: 'Funk Carioca, Reggaeton, Latin Pop, Brazilian',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'funk-carioca-global-pop',
        name: 'Funk Carioca & Pop Globale',
        description: "Fusionne les rythmes du funk carioca brésilien avec la pop, le reggaeton et l'EDM pour un son global.",
        promptInstruction: "Le prompt doit décrire un morceau de pop dansant avec un rythme de funk carioca proéminent.",
        lyricInstruction: "Les paroles, souvent en portugais, espagnol ou anglais, portent sur la fête et l'émancipation."
      }
    ]
  },
  {
    name: 'H.E.R.',
    genres: 'R&B, Contemporary R&B, Soul',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'modern-rnb-guitar-solo',
        name: 'R&B Moderne & Solo de Guitare',
        description: "Un son R&B moderne et soulful, caractérisé par une voix douce et des solos de guitare électrique virtuoses.",
        promptInstruction: "Le prompt doit décrire un morceau de R&B contemporain avec une voix féminine douce et un solo de guitare électrique proéminent.",
        lyricInstruction: "Les paroles sont introspectives sur l'amour. Inclus une section [electric-guitar-solo]."
      }
    ]
  },
  {
    name: 'Daniel Caesar',
    genres: 'R&B, Alternative R&B, Soul',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'intimate-gospel-soul',
        name: 'Gospel-Soul Intimiste',
        description: "Un son R&B intime avec des influences gospel, des harmonies vocales riches et une voix masculine douce et émotive.",
        promptInstruction: "Le prompt doit décrire un morceau de R&B/soul avec un orgue ou un piano d'inspiration gospel et des harmonies vocales luxuriantes.",
        lyricInstruction: "Les paroles sont spirituelles et romantiques, avec une livraison vocale sincère."
      }
    ]
  },
  {
    name: 'Jazmine Sullivan',
    genres: 'R&B, Soul',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'raw-rnb-storytelling-complex-vocals',
        name: 'Narration R&B Brute & Vocaux Complexes',
        description: "Une voix R&B extrêmement puissante et agile qui raconte des histoires brutes et détaillées sur la vie et les relations.",
        promptInstruction: "Le prompt doit décrire une performance vocale féminine de R&B avec une grande puissance, des 'vocal runs' complexes et une narration crue.",
        lyricInstruction: "Les paroles doivent raconter une histoire à la première personne avec des détails honnêtes et des émotions complexes."
      }
    ]
  },
  {
    name: 'Victoria Monét',
    genres: 'R&B, Funk, Soul',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'lush-funk-rnb-horns',
        name: 'Funk-R&B Luxuriant & Cuivres',
        description: "Un son R&B qui s'inspire du funk et de la soul des années 70, avec des arrangements de cuivres et de cordes luxuriants.",
        promptInstruction: "Le prompt doit décrire un morceau de R&B/funk avec une section de cuivres proéminente et une production chaude et orchestrale.",
        lyricInstruction: "Les paroles sont confiantes et sensuelles."
      }
    ]
  },
  {
    name: 'Don Toliver',
    genres: 'Hip Hop, Trap, R&B',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'melodic-trap-airy-vocals',
        name: 'Trap Mélodique & Voix Aérienne',
        description: "Un flow de trap très mélodique et auto-tuné avec une texture vocale aérienne et planante sur des beats atmosphériques.",
        promptInstruction: "Le prompt doit décrire un beat de trap psychédélique avec une voix masculine auto-tunée, aérienne et mélodique.",
        lyricInstruction: "La livraison vocale est flottante et crée une ambiance hypnotique."
      }
    ]
  },
  {
    name: 'Baby Keem',
    genres: 'Hip Hop, Trap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'eccentric-flow-beat-switches',
        name: 'Flow Excentrique & Changements de Rythme',
        description: "Un flow de rap excentrique et imprévisible avec des changements de voix et des productions qui changent de rythme de manière abrupte.",
        promptInstruction: "Le prompt doit décrire un morceau de hip-hop avec des changements de beat soudains et un flow de rap masculin plein de personnalité et de changements de ton.",
        lyricInstruction: "La structure de la chanson doit être non conventionnelle. La livraison vocale doit être énergique et varier."
      }
    ]
  },
  {
    name: 'Fivio Foreign',
    genres: 'Drill, Hip Hop',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'brooklyn-drill-energy-adlibs',
        name: 'Énergie Brooklyn Drill & Ad-libs',
        description: "Un flow de drill énergique et agressif avec des ad-libs iconiques ('Bow!', 'Aye!') sur des beats de drill de Brooklyn.",
        promptInstruction: "Le prompt doit décrire un beat de drill de Brooklyn avec un flow de rap masculin énergique et beaucoup d'ad-libs.",
        lyricInstruction: "Inclus des ad-libs proéminents comme (Bow!), (Aye, aye, aye!)."
      }
    ]
  },
  {
    name: 'Tyler Childers',
    genres: 'Country, Americana, Bluegrass',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'appalachian-americana-storytelling',
        name: 'Americana Appalache & Narration Honnête',
        description: "Un son qui mélange country, folk et bluegrass avec une voix nasillarde et passionnée racontant des histoires brutes sur la vie dans les Appalaches.",
        promptInstruction: "Le prompt doit décrire un son country-folk acoustique avec une voix masculine nasillarde et pleine d'émotion.",
        lyricInstruction: "Les paroles doivent être des récits détaillés sur la pauvreté, la drogue et la culture des Appalaches."
      }
    ]
  },
  {
    name: 'Chris Stapleton',
    genres: 'Country, Southern Rock, Blues',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'southern-rock-powerful-soul-voice',
        name: 'Southern Rock & Voix Soul Puissante',
        description: "Une voix masculine de baryton extrêmement puissante, rauque et pleine d'âme, sur un fond de country, de blues et de southern rock.",
        promptInstruction: "Le prompt doit décrire un morceau de country-rock ou de blues avec une voix masculine très puissante et rauque.",
        lyricInstruction: "La livraison vocale doit être passionnée et intense."
      }
    ]
  },
  {
    name: 'Lainey Wilson',
    genres: 'Country, Southern Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'bell-bottom-country',
        name: 'Country Rétro & "Bell Bottom"',
        description: "Un son country avec des influences du rock sudiste des années 70, un accent louisianais distinctif et une attitude forte.",
        promptInstruction: "Le prompt doit décrire un son de country-rock avec une saveur des années 70 et une voix féminine avec un accent du Sud.",
        lyricInstruction: "Les paroles doivent être pleines d'esprit et d'assurance."
      }
    ]
  },
  {
    name: 'HARDY',
    genres: 'Country, Rock, Metal',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'hybrid-country-metal',
        name: 'Hybride Country-Métal',
        description: "Fusionne des thèmes lyriques country avec l'instrumentation et l'agressivité du hard rock et du metalcore.",
        promptInstruction: "Le prompt doit décrire une fusion de country et de metalcore, avec des riffs de guitare lourds et une voix qui peut passer du chant country à des cris.",
        lyricInstruction: "Alterne entre des thèmes country et une livraison vocale agressive."
      }
    ]
  },
  {
    name: 'PinkPantheress',
    genres: 'Pop, Drum and Bass, UK Garage',
    suggestedStructureValue: 'edm-dance-drop',
    specialTraits: [
      {
        id: 'uk-garage-nostalgia-soft-vocals',
        name: 'Nostalgie UK Garage & Voix Douce',
        description: "Des chansons courtes avec des rythmes rapides de UK garage et de drum and bass, des samples nostalgiques et une voix féminine douce et aérienne.",
        promptInstruction: "Le prompt doit décrire un morceau de pop avec un breakbeat rapide (UK garage/D&B) et une voix féminine douce et intime.",
        lyricInstruction: "Les paroles sont souvent courtes, introspectives et sur des thèmes de relations."
      }
    ]
  },
  {
    name: 'RAYE',
    genres: 'R&B, Pop, Soul',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'orchestral-rnb-brutal-storytelling',
        name: 'R&B Orchestral & Narration Brutale',
        description: "Combine des arrangements R&B et jazz orchestraux avec des paroles brutalement honnêtes et une performance vocale virtuose.",
        promptInstruction: "Le prompt doit décrire un morceau de R&B avec des arrangements de big band ou d'orchestre, et une voix féminine très expressive et techniquement impressionnante.",
        lyricInstruction: "Les paroles doivent être des récits crus et vulnérables sur des expériences personnelles."
      }
    ]
  },
  {
    name: 'FLO',
    genres: 'R&B, Girl Group',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: '90s-rnb-harmonies',
        name: 'Harmonies R&B des Années 90',
        description: "Un trio vocal qui recrée le son des groupes de R&B des années 90 avec des harmonies vocales complexes et douces.",
        promptInstruction: "Le prompt doit décrire un morceau de R&B avec des harmonies vocales féminines à trois voix, inspiré des années 90.",
        lyricInstruction: "Le refrain et le pont doivent être remplis d'harmonies vocales complexes."
      }
    ]
  },
  {
    name: 'Kim Petras',
    genres: 'Pop, Dance-pop, Eurodance',
    suggestedStructureValue: 'edm-dance-drop',
    specialTraits: [
      {
        id: 'euphoric-eurodance-pop',
        name: 'Eurodance & Pop Euphorique',
        description: "Des hymnes pop et dance-pop euphoriques avec des influences d'Eurodance des années 90 et des refrains massifs.",
        promptInstruction: "Le prompt doit décrire un morceau d'Eurodance avec des synthés brillants et un refrain très accrocheur.",
        lyricInstruction: "Les paroles sont sur l'évasion, la fête et le glamour."
      }
    ]
  },
  {
    name: 'Sleep Token',
    genres: 'Alternative Metal, Progressive Metal, Post-Metal, R&B',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'spiritual-metal-fusion',
        name: 'Fusion Spirituelle & Metal',
        description: "Alterne entre des passages de R&B/pop ambiants avec une voix douce et des sections de metalcore/djent explosives et techniques.",
        promptInstruction: "La chanson doit avoir des dynamiques extrêmes, passant de sections R&B ambiantes avec un piano et des synthés à des riffs de metalcore lourds avec des guitares à 8 cordes et des cris.",
        lyricInstruction: "Les paroles doivent être poétiques et mystiques, sur des thèmes d'amour et de spiritualité. Alterne les sections [soft-vocals] et [scream-vocals]."
      }
    ]
  },
  {
    name: 'Ethel Cain',
    genres: 'Alternative, Indie Rock, Americana, Gothic',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'gothic-americana-slow-epics',
        name: 'Americana Gothique & Épopées Lentes',
        description: "De longues chansons atmosphériques qui mélangent l'Americana avec une esthétique Southern Gothic, créant des épopées lentes et cinématographiques.",
        promptInstruction: "Le prompt doit décrire un morceau de rock ambiant et lent avec une production réverbérée, des chœurs de style grégorien et une voix féminine éthérée.",
        lyricInstruction: "Les paroles doivent être de longues narrations sur des thèmes de la religion, de la violence et du Sud des États-Unis."
      }
    ]
  },
  {
    name: 'MUNA',
    genres: 'Indie Pop, Synth-pop',
    suggestedStructureValue: 'pop-full-prechorus',
    specialTraits: [
      {
        id: 'cathartic-queer-synth-pop',
        name: 'Synth-Pop Cathartique & Queer',
        description: "Des hymnes synth-pop sombres mais cathartiques avec des refrains massifs et des paroles sur l'identité et les relations queer.",
        promptInstruction: "Le prompt doit décrire un morceau de synth-pop des années 80 avec une production moderne, un refrain puissant et des thèmes queer.",
        lyricInstruction: "Les paroles doivent être vulnérables et honnêtes, menant à un refrain hymnique et libérateur."
      }
    ]
  },
  {
    name: 'Fontaines D.C.',
    genres: 'Post-Punk, Indie Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'poetic-post-punk-irish-accent',
        name: 'Post-Punk Poétique & Accent Irlandais',
        description: "Un son post-punk intense avec des guitares répétitives et une performance vocale parlée-chantée, livrant des paroles poétiques avec un accent irlandais prononcé.",
        promptInstruction: "Le prompt doit décrire un morceau de post-punk avec une voix masculine scandée et un accent irlandais.",
        lyricInstruction: "Les paroles doivent être des observations poétiques sur la vie et l'identité irlandaise."
      }
    ]
  },
  {
    name: 'Black Country, New Road',
    genres: 'Art Rock, Post-Rock, Experimental',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'experimental-post-rock-crescendos',
        name: 'Post-Rock Expérimental & Crescendos',
        description: "Des compositions longues et imprévisibles qui fusionnent le post-rock avec le free jazz (saxophone, violon) et montent en des crescendos chaotiques.",
        promptInstruction: "Le prompt doit décrire un morceau d'art rock expérimental avec des instruments comme le saxophone et le violon, et une structure qui monte en un climax intense.",
        lyricInstruction: "Les paroles sont souvent des monologues anxieux et parlés, pleins de références culturelles."
      }
    ]
  },
  {
    name: 'Alex G',
    genres: 'Indie Rock, Lo-fi, Singer-Songwriter',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'lofi-eclectic-songwriting',
        name: 'Indie Lo-fi & Écriture Éclectique',
        description: "Un son lo-fi et imprévisible qui mélange folk, noise rock et pop, avec des changements de voix pitchées et des paroles énigmatiques.",
        promptInstruction: "Le prompt doit décrire une production de rock indépendant lo-fi avec des changements de style inattendus et des voix pitchées.",
        lyricInstruction: "Les paroles doivent raconter des histoires de personnages étranges avec un ton détaché."
      }
    ]
  },
  {
    name: 'Wizkid',
    genres: 'Afrobeats, R&B',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'smooth-international-afrobeats',
        name: 'Afrobeats Doux & International',
        description: "Un son afrobeats doux et décontracté avec des influences R&B, des mélodies accrocheuses et une ambiance globale.",
        promptInstruction: "Le prompt doit décrire un morceau d'afrobeats avec une production polie, un rythme décontracté et une voix masculine douce.",
        lyricInstruction: "Les paroles, souvent en anglais Pidgin, portent sur l'amour et le style de vie."
      }
    ]
  },
  {
    name: 'Asake',
    genres: 'Afrobeats, Amapiano',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'amapiano-yoruba-chants',
        name: 'Amapiano & Chants Yoruba',
        description: "Fusionne les rythmes de l'Amapiano avec des chœurs de style gospel et des chants en langue yoruba, créant un son afrobeats spirituel et énergique.",
        promptInstruction: "Le prompt doit décrire un beat Amapiano avec des chœurs de fond proéminents et une voix masculine principale énergique.",
        lyricInstruction: "Inclus des chants en chœur et des phrases en yoruba."
      }
    ]
  },
  {
    name: 'Ayra Starr',
    genres: 'Afropop, R&B',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'celestial-afropop-angelic-voice',
        name: 'Afropop Céleste & Voix Angélique',
        description: "Un son afropop avec une production brillante, des paroles sur l'émancipation et une voix féminine distinctive, à la fois douce et puissante.",
        promptInstruction: "Le prompt doit décrire un morceau d'afropop moderne avec une voix féminine claire et angélique.",
        lyricInstruction: "Les paroles doivent être confiantes et porter sur l'ambition et l'indépendance."
      }
    ]
  },
  {
    name: 'Troye Sivan',
    genres: 'Pop, Synth-pop, Dance-pop',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'queer-atmospheric-pop',
        name: 'Pop Queer & Atmosphérique',
        description: "Des hymnes dance-pop et des ballades synth-pop atmosphériques avec des thèmes queer et une voix de baryton douce.",
        promptInstruction: "Le prompt doit décrire un morceau de synth-pop atmosphérique avec une voix masculine de baryton et des thèmes LGBTQ+.",
        lyricInstruction: "Les paroles doivent être introspectives et célébrer l'amour et l'identité queer."
      }
    ]
  },
  {
    name: 'Sam Smith',
    genres: 'Pop, Soul, R&B',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'emotive-vocal-ballads',
        name: 'Ballades Pop & Vocaux Émotifs',
        description: "Des ballades pop avec une performance vocale masculine extrêmement émotive et puissante, souvent accompagnée de piano ou d'un chœur gospel.",
        promptInstruction: "Le prompt doit décrire une ballade pop avec une voix masculine puissante et pleine d'émotion.",
        lyricInstruction: "Les paroles portent sur le chagrin d'amour et la vulnérabilité."
      }
    ]
  },
  {
    name: 'Miley Cyrus',
    genres: 'Pop, Rock, Country Pop',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'raspy-rock-voice-pop',
        name: 'Voix Rock Rauque & Pop',
        description: "Une voix de contralto distinctive, puissante et rauque, sur des productions qui mélangent pop, rock et country.",
        promptInstruction: "Le prompt doit décrire un morceau de pop-rock avec une voix féminine de contralto puissante et rauque.",
        lyricInstruction: "Les paroles portent sur l'indépendance, les ruptures et la résilience."
      }
    ]
  },
  {
    name: 'Ashnikko',
    genres: 'Alternative Pop, Pop-Punk, Trap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'aggressive-pop-punk-anime-aesthetic',
        name: 'Pop-Punk Agressif & Esthétique Anime',
        description: "Un son qui mélange pop-punk, trap et hyperpop avec des paroles agressives et féministes, et une esthétique visuelle inspirée de l'anime.",
        promptInstruction: "Le prompt doit décrire une fusion de pop-punk et de trap avec une voix féminine qui alterne entre chant et rap agressif.",
        lyricInstruction: "Les paroles doivent être provocatrices et pleines d'humour noir."
      }
    ]
  },
  {
    name: 'Omar Apollo',
    genres: 'R&B, Alternative, Pop',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'psychedelic-rnb-soulful-falsetto',
        name: 'R&B Psychédélique & Falsetto Soulful',
        description: "Mélange R&B, funk et pop psychédélique avec une voix bilingue (anglais/espagnol) qui passe à un fausset soulful.",
        promptInstruction: "Le prompt doit décrire un morceau de R&B psychédélique avec des guitares funky et une voix masculine utilisant un fausset doux.",
        lyricInstruction: "Mélange des paroles en anglais et en espagnol sur des thèmes de désir et de chagrin d'amour."
      }
    ]
  },
  {
    name: 'Yeat',
    genres: 'Hip Hop, Trap, Rage',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'rage-beats-unique-slang',
        name: 'Rage Beats & Argot Unique ("Twizzy")',
        description: "Un son trap expérimental ('rage') avec des synthés agressifs et bourdonnants, et un flow auto-tuné utilisant un argot unique.",
        promptInstruction: "Le prompt doit décrire un beat 'rage' avec des synthés de type 'saw' et une voix masculine auto-tunée avec une livraison unique.",
        lyricInstruction: "Utilise un vocabulaire et des ad-libs uniques (ex: 'twizzy', 'luh geek')."
      }
    ]
  },
  {
    name: 'Ken Carson',
    genres: 'Hip Hop, Trap, Rage',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'futuristic-aggressive-synths',
        name: 'Trap Futuriste & Synthés Agressifs',
        description: "Un son trap minimaliste et futuriste avec des synthétiseurs agressifs et un flow énergique.",
        promptInstruction: "Le prompt doit décrire un beat trap avec des synthétiseurs 'plugg' et une livraison vocale agressive et répétitive.",
        lyricInstruction: "Les paroles sont simples, sur la mode et le style de vie."
      }
    ]
  },
  {
    name: 'Destroy Lonely',
    genres: 'Hip Hop, Trap, Ambient',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'ambient-trap-nonchalant-flow',
        name: 'Trap Ambiant & Flow Nonchalant',
        description: "Un son trap atmosphérique et ambiant avec un flow de rap rapide mais nonchalant et des changements de hauteur.",
        promptInstruction: "Le prompt doit décrire un beat de trap atmosphérique avec un flow de rap masculin rapide et décontracté.",
        lyricInstruction: "La livraison vocale est rapide mais semble sans effort, avec des variations de hauteur."
      }
    ]
  },
  {
    name: 'Cochise',
    genres: 'Hip Hop, Trap, Pop Rap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'playful-trap-anime-references',
        name: 'Trap Ludique & Références Anime',
        description: "Un flow de trap énergique et ludique avec une voix aiguë, des ad-libs uniques et de nombreuses références à l'anime.",
        promptInstruction: "Le prompt doit décrire un beat trap joyeux et rebondissant avec une voix masculine aiguë et pleine d'énergie.",
        lyricInstruction: "Inclus des références à des animes (ex: Dragon Ball Z, Naruto)."
      }
    ]
  },
  {
    name: 'ENHYPEN',
    genres: 'K-Pop, Pop Rock, Dark Fantasy, Korean',
    suggestedStructureValue: 'kpop-performance-dance-break',
    specialTraits: [
      {
        id: 'dark-fantasy-pop-rock',
        name: 'Pop-Rock Sombre & Concept Fantastique',
        description: "Un son K-Pop qui mélange des éléments pop-rock avec un concept sombre et fantastique (vampires, etc.).",
        promptInstruction: "Le prompt doit décrire un son K-Pop avec des guitares pop-rock et une ambiance dramatique et mystérieuse.",
        lyricInstruction: "Les paroles racontent une histoire conceptuelle sur des thèmes fantastiques."
      }
    ]
  },
  {
    name: 'ITZY',
    genres: 'K-Pop, EDM, Dance-pop, Korean',
    suggestedStructureValue: 'kpop-performance-dance-break',
    specialTraits: [
      {
        id: 'kpop-self-confidence-anthems',
        name: 'Hymnes K-Pop sur la Confiance en Soi',
        description: "Des hymnes dance-pop et EDM énergiques avec des refrains scandés sur le thème de l'amour-propre et de l'individualité.",
        promptInstruction: "Le prompt doit décrire un morceau de dance-pop K-Pop avec un beat lourd et un refrain scandé et confiant.",
        lyricInstruction: "Le refrain doit être un message d'affirmation de soi, facile à scander."
      }
    ]
  },
  {
    name: 'STAYC',
    genres: 'K-Pop, Bubblegum Pop, Synth-pop, Korean',
    suggestedStructureValue: 'kpop-standard-rap-bridge',
    specialTraits: [
      {
        id: 'fresh-pop-stayc-girls',
        name: 'Pop Fraîche & "STAYC Girls, it\'s going down"',
        description: "Un son synth-pop frais et pétillant avec des mélodies vocales uniques et une phrase d'introduction signature.",
        promptInstruction: "Le prompt doit décrire un son K-Pop synth-pop brillant et optimiste avec des mélodies vocales accrocheuses.",
        lyricInstruction: "La chanson doit commencer par la phrase 'STAYC girls, it's going down'."
      }
    ]
  },
  {
    name: 'Skrillex',
    genres: 'Electronic, Dubstep, Bass Music, Pop',
    suggestedStructureValue: 'edm-dance-drop',
    specialTraits: [
      {
        id: 'bass-music-pop-fusion',
        name: 'Fusion Bass Music & Pop',
        description: "Fusionne des éléments de bass music (dubstep, trap) avec des mélodies pop et des collaborations vocales.",
        promptInstruction: "Le prompt doit décrire une production électronique qui combine des basses lourdes et du sound design complexe avec une structure et des mélodies pop.",
        lyricInstruction: "Les paroles sont souvent des featurings pop, avec des sections de 'vocal chops'."
      }
    ]
  },
  {
    name: 'Dominic Fike',
    genres: 'Alternative Pop, Pop Rock, Hip Hop',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'californian-pop-rock-rap-flow',
        name: 'Pop-Rock Californien & Flow Rap',
        description: "Un son ensoleillé qui mélange pop-rock, guitares décontractées et des couplets avec un flow de rap nonchalant.",
        promptInstruction: "Le prompt doit décrire un son de pop-rock californien décontracté avec une voix masculine qui alterne entre chant et rap.",
        lyricInstruction: "Les paroles portent sur la jeunesse, l'amour et la vie en Californie."
      }
    ]
  },
  {
    name: 'Gracie Abrams',
    genres: 'Bedroom Pop, Singer-Songwriter',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'intimate-bedroom-pop-lyrics',
        name: 'Bedroom Pop & Paroles Intimistes',
        description: "Des ballades pop minimalistes avec une voix douce et murmurée et des paroles extrêmement détaillées et vulnérables, comme des extraits de journal intime.",
        promptInstruction: "Le prompt doit décrire une production de bedroom pop avec un piano ou une guitare acoustique, et une voix féminine douce et intime.",
        lyricInstruction: "Les paroles doivent être des récits très personnels et détaillés sur le chagrin d'amour."
      }
    ]
  },
  {
    name: 'Remi Wolf',
    genres: 'Funk, Soul, Pop, Psychedelic',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'psychedelic-funk-pop-eccentric-vocals',
        name: 'Funk-Pop Psychédélique & Voix Excentrique',
        description: "Un son coloré et chaotique qui mélange funk, soul et pop, avec une performance vocale excentrique et puissante.",
        promptInstruction: "Le prompt doit décrire un morceau de funk-pop psychédélique avec une voix féminine pleine d'énergie et de personnalité.",
        lyricInstruction: "Les paroles doivent être humoristiques, surréalistes et pleines d'images vives."
      }
    ]
  },
  {
    name: 'Daft Punk',
    genres: 'French House, Electronic',
    suggestedStructureValue: 'daft-punk-repetitive',
    specialTraits: [
      {
        id: 'vocoder-vocals',
        name: 'Voix Vocoder / Talkbox',
        description: "Utilise un effet de vocoder ou de talkbox sur la voix principale pour un son mélodique et robotique.",
        promptInstruction: "Le prompt doit spécifier l'utilisation proéminente d'un vocoder ou d'un talkbox pour créer une voix robotique et mélodique, sur un fond de french house.",
        lyricInstruction: "Les paroles de la section vocoder doivent être simples et mélodiques. Marque la section avec [vocoder-vocals]."
      },
      {
        id: 'robotic-chant',
        name: 'Chant Robotique Répétitif',
        description: "Crée des phrases vocales courtes, samplées et répétées de manière rythmique pour un effet percussif.",
        promptInstruction: "Le prompt doit décrire l'utilisation de samples vocaux courts et hachés ('chopped vocals') qui sont répétés en boucle pour créer un motif rythmique, comme dans 'Harder, Better, Faster, Stronger'.",
        lyricInstruction: "Écris une phrase courte et percutante (2-6 mots) et marque-la avec le tag [robotic-chant] pour qu'elle soit interprétée comme un sample vocal répétitif."
      }
    ]
  },
  { name: 'Damso', genres: 'French Rap, Trap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'dark-complex-lyrics', name: 'Paroles Sombres & Complexes', description: "Un flow technique avec des paroles introspectives, souvent cyniques et à double sens.", promptInstruction: "Le prompt doit décrire un beat trap ou cloud rap sombre et atmosphérique avec un flow de rap technique et multi-syllabique, contenant des paroles introspectives et souvent cyniques avec des jeux de mots complexes.", lyricInstruction: "Les paroles doivent être denses, avec des double sens et un ton sombre et mélancolique." }] },
  { name: 'Danny Brown', genres: 'Experimental Hip Hop, Hardcore Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'eccentric-high-pitched-flow', name: 'Flow Excentrique & Aigu', description: "Un flow unique et imprévisible, avec une voix aiguë et excentrique qui peut passer du rap au cri.", promptInstruction: "Le prompt doit décrire un beat hip-hop expérimental et abrasif, avec une livraison vocale masculine aiguë, énergique, et excentrique.", lyricInstruction: "Les paroles doivent être humoristiques, chaotiques et souvent explicites, livrées avec une énergie débridée." }] },
  { name: 'David Bowie', genres: 'Rock, Glam Rock, Art Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'theatrical-persona', name: 'Personnage Théâtral', description: "Incarne un personnage ou un alter ego dans les paroles (ex: Ziggy Stardust).", promptInstruction: "Le prompt doit décrire une performance vocale théâtrale et changeante, évoquant un personnage de glam rock ou de science-fiction.", lyricInstruction: "Écris les paroles du point de vue d'un personnage fictif, avec une narration et une imagerie excentriques." }] },
  { name: 'David Guetta', genres: 'EDM, House', suggestedStructureValue: 'edm-dance-drop', specialTraits: [{ id: 'edm-buildup-drop', name: 'Montée & Drop EDM', description: "Structure classique de l'EDM avec une montée en tension progressive suivie d'un 'drop' instrumental puissant.", promptInstruction: "Le prompt doit décrire un morceau house ou EDM avec une chanteuse invitée, une montée en tension avec des synthétiseurs en arpèges et des roulements de caisse claire, culminant en un 'drop' avec une ligne de basse puissante et un rythme dansant.", lyricInstruction: "Les paroles doivent être simples, accrocheuses et optimistes, souvent sur le thème de la fête ou de l'amour." }] },
  { name: 'De La Soul', genres: 'Alternative Hip Hop, Jazz Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'daisy-age-positivity', name: 'Positivité "D.A.I.S.Y. Age"', description: "Un son hip-hop positif et ludique avec des samples éclectiques et des paroles pleines d'esprit.", promptInstruction: "Le prompt doit décrire un beat hip-hop de l'âge d'or avec des samples éclectiques et positifs, et un flow de rap conversationnel et humoristique.", lyricInstruction: "Les paroles doivent être ludiques, positives et pleines de jeux de mots." }] },
  { name: 'Denzel Curry', genres: 'Hip Hop, Trap, Experimental Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'aggressive-energy-technical-flow', name: 'Énergie Agressive & Flow Technique', description: "Une livraison de rap explosive et agressive, avec un flow rapide et technique.", promptInstruction: "Le prompt doit décrire un beat trap lourd et agressif, avec un flow de rap masculin rapide, énergique et puissant.", lyricInstruction: "Les paroles doivent être sombres et intenses, livrées avec une grande énergie." }] },
  { name: 'Deep Purple', genres: 'Hard Rock, Heavy Metal', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'hammond-organ-guitar-duel', name: 'Duel Orgue Hammond / Guitare', description: "Un son hard rock puissant avec des duels et des solos entre un orgue Hammond saturé et une guitare électrique virtuose.", promptInstruction: "Le prompt doit décrire un morceau de hard rock des années 70 avec un duel ou une interaction proéminente entre un orgue Hammond et une guitare électrique, avec des riffs puissants.", lyricInstruction: "Les paroles doivent avoir des thèmes épiques ou rock 'n' roll." }] },
  { name: 'Depeche Mode', genres: 'Synth-pop, New Wave, Electronic Rock', suggestedStructureValue: 'pop-full-prechorus', specialTraits: [{ id: 'dark-synth-pop-baritone', name: 'Synth-Pop Sombre & Voix Baryton', description: "Une ambiance électronique sombre et mélancolique avec une voix de baryton profonde et charismatique.", promptInstruction: "Le prompt doit décrire un morceau de synth-pop avec des synthétiseurs analogiques sombres, une boîte à rythmes industrielle et une performance vocale masculine de baryton, grave et émotive.", lyricInstruction: "Les paroles doivent explorer des thèmes sombres comme le péché, le désir ou la religion, avec un ton introspectif." }] },
  { name: 'Diana Ross', genres: 'Soul, R&B, Disco', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'soft-soul-disco-glamour', name: 'Voix Soul Douce & Glamour Disco', description: "Une voix féminine douce, aérienne et sophistiquée sur des arrangements disco ou soul luxuriants.", promptInstruction: "Le prompt doit décrire une production disco ou soul luxuriante avec des cordes, et une voix féminine douce, sensuelle et glamour.", lyricInstruction: "Les paroles doivent porter sur l'amour, la danse et l'émancipation." }] },
  { name: 'Dire Straits', genres: 'Rock, Blues Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'fingerstyle-guitar-spoken-vocals', name: 'Guitare Fingerstyle & Chant Parlé', description: "Un son rock distinctif mené par une guitare électrique jouée en finger-picking, avec une voix masculine calme et narrative.", promptInstruction: "Le prompt doit décrire un rock avec une guitare électrique en finger-picking au son clair proéminente, et une voix masculine décontractée et narrative.", lyricInstruction: "Les paroles doivent raconter des histoires détaillées avec un ton observationnel." }] },
  { name: 'DMX', genres: 'Hardcore Hip Hop, East Coast Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'barking-flow-raw-energy', name: 'Flow "Aboiement" & Énergie Brute', description: "Une voix graveleuse et agressive qui ponctue les lignes avec des aboiements et des grognements.", promptInstruction: "Le prompt doit décrire un beat de hardcore hip-hop sombre, avec une voix masculine agressive et éraillée, utilisant des ad-libs d'aboiements.", lyricInstruction: "Intègre des ad-libs comme (Grrr) ou (What!) entre les lignes." }] },
  { name: 'Dolly Parton', genres: 'Country', suggestedStructureValue: 'folk-storytelling', specialTraits: [{ id: 'country-storytelling-soprano-voice', name: 'Narration Country & Voix Soprano', description: "Une voix de soprano claire et expressive qui raconte des histoires touchantes sur la vie, l'amour et les difficultés.", promptInstruction: "Le prompt doit décrire un morceau de country traditionnel avec guitare acoustique et violon, et une voix féminine soprano narrative et sincère.", lyricInstruction: "Les paroles doivent raconter une histoire émouvante avec des personnages et une morale." }] },
  { name: 'Donna Summer', genres: 'Disco, R&B', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'epic-disco-anthem', name: 'Hymne Disco Épique', description: "Une performance vocale puissante et euphorique sur une production disco entraînante avec des rythmes four-on-the-floor et des arrangements orchestraux.", promptInstruction: "Le prompt doit décrire un hymne disco des années 70 avec un rythme four-on-the-floor, des orchestrations à cordes et cuivres, et une voix féminine puissante et euphorique.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la danse, de l'amour et de la libération." }] },
  { name: 'Dr. Dre', genres: 'Hip Hop, G-Funk', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'g-funk-synth-lead', name: 'Synthé G-Funk', description: "Incorpore un son de synthétiseur aigu et sinueux, typique du G-Funk, comme mélodie principale.", promptInstruction: "Le prompt doit décrire un beat G-Funk West Coast avec une ligne de basse profonde, un rythme lent et lourd, et une mélodie de synthétiseur aiguë, perçante et mémorable.", lyricInstruction: "" }] },
  { name: 'Drake', genres: 'Hip Hop, R&B, Pop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'melodic-rap-rnb', name: 'Rap Mélodique & Chant R&B', description: "Alterne entre rap mélodique et chant R&B suave sur des prods atmosphériques.", promptInstruction: "Le prompt doit décrire un beat maussade et atmosphérique avec un mélange de rap mélodique et de chant R&B doux, avec des paroles introspectives sur les relations, le succès et la vulnérabilité.", lyricInstruction: "Alterne entre le rap et le chant." }] },
  { name: 'Dua Lipa', genres: 'Pop, Disco', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'nu-disco-confident-vocals', name: 'Nu-Disco & Voix Assurée', description: "Une voix grave et assurée sur une production nu-disco moderne avec une basse funky.", promptInstruction: "Le prompt doit décrire un morceau nu-disco moderne avec une ligne de basse funky, un rythme four-on-the-floor, et une performance vocale féminine grave et assurée.", lyricInstruction: "Les paroles doivent porter sur l'émancipation, la danse et la romance." }] },
  { name: 'Earth, Wind & Fire', genres: 'Funk, R&B, Soul', suggestedStructureValue: 'funk-jam', specialTraits: [{ id: 'funk-horn-section-falsetto', name: 'Section de Cuivres Funk & Falsetto', description: "Une section de cuivres énergique et synchronisée avec des voix masculines en fausset pour créer un son funk optimiste et dansant.", promptInstruction: "Le prompt doit décrire un morceau de funk des années 70 avec une section de cuivres proéminente et des harmonies vocales masculines utilisant un fausset aigu.", lyricInstruction: "Les paroles doivent être positives sur l'amour, la danse et la spiritualité." }] },
  { name: 'Ed Sheeran', genres: 'Pop, Folk-Pop', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'acoustic-loop-pedal', name: 'Style "Loop Pedal" Acoustique', description: "Un flow rapide, quasi-rappé, sur une guitare acoustique avec des percussions en boucle.", promptInstruction: "Le prompt doit décrire une chanson pop construite autour d'une guitare acoustique solo, utilisant des boucles de percussions sur le corps de la guitare et des harmonies vocales superposées, avec une livraison vocale rapide, rythmique, presque rappée dans les couplets.", lyricInstruction: "Les couplets doivent avoir un flow rapide, rythmique et percussif. Marque ces passages avec [loop-pedal-rap]." }] },
  { name: 'Edith Piaf', genres: 'Chanson', suggestedStructureValue: 'ballad-instrumental-bridge', specialTraits: [{ id: 'dramatic-vibrato', name: 'Vibrato Dramatique', description: "Incorpore une performance vocale passionnée et théâtrale avec un vibrato prononcé sur les fins de phrases.", promptInstruction: "Le prompt doit spécifier une voix féminine puissante, pleine d'émotion et de drame, avec un vibrato très marqué sur les notes tenues. L'orchestration doit être typique de la chanson française classique.", lyricInstruction: "Les paroles doivent raconter une histoire d'amour tragique ou de résilience. La livraison doit être intense et passionnée. Marque les fins de phrases où le vibrato doit être mis en avant avec (vibrato)." }] },
  {
    name: 'Eivør Pálsdóttir',
    genres: 'Folk, Electronic, Art Pop, Nordic Folk, Faroese',
    suggestedStructureValue: 'eivor-folk-electro-crescendo',
    specialTraits: [{
        id: 'nordic-shamanic-vocals',
        name: 'Chant Nordique / Chamanique',
        description: "Incorpore des techniques vocales nordiques (chant de gorge) et des vocalisations pour une ambiance spirituelle.",
        promptInstruction: "Le prompt doit décrire une performance vocale éthérée, avec des éléments de chant de gorge (throat singing) et des vocalisations non-verbales, sur un mélange de folk nordique (tambours chamaniques) et d'électronique ambiante.",
        lyricInstruction: "Intègre des passages de vocalisations ou de chant de gorge. Marque ces sections avec [shamanic-vocals]."
    }]
  },
  { name: 'Elton John', genres: 'Rock, Pop, Glam Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'virtuoso-piano-rock', name: 'Piano Rock Virtuose', description: "La chanson est menée par un jeu de piano rock virtuose et flamboyant, avec une performance vocale expressive.", promptInstruction: "Le prompt doit décrire un morceau de piano rock des années 70 avec un jeu de piano proéminent et énergique, et une performance vocale masculine puissante.", lyricInstruction: "Les paroles doivent être narratives ou hymniques." }] },
  { name: 'Eminem', genres: 'Hip Hop, Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [
      { id: 'fast-flow', name: 'Eminem Fast Flow', description: 'Active une section de rap ultra-rapide et technique.', promptInstruction: "Le prompt doit explicitement mentionner une section de rap avec un flow extrêmement rapide et technique, type 'double-time', avec un débit de paroles élevé.", lyricInstruction: "Tu DOIS inclure au moins une section où le flow devient très rapide et technique. Marque le début de cette section avec le tag [fast-flow]." },
      {
        id: 'alter-ego-shady',
        name: 'Alter Ego "Slim Shady"',
        description: "Introduit une persona agressive et provocatrice, avec un changement de ton et de contenu lyrique.",
        promptInstruction: "Le prompt doit décrire un changement de rythme ou de voix pour devenir plus nasillard, agressif et aigu, reflétant le personnage de Slim Shady. Les thèmes lyriques doivent devenir plus sombres ou satiriques.",
        lyricInstruction: "Écris une section du point de vue d'un alter ego. Les paroles doivent être provocantes, utilisant de l'humour noir et un ton plus agressif. Marque cette section avec [shady-verse]."
      },
      {
        id: 'complex-rhymes',
        name: 'Rimes Complexes & Multi-syllabiques',
        description: "Se concentre sur la création de structures lyriques complexes avec de nombreuses rimes internes et multi-syllabiques.",
        promptInstruction: "Le prompt doit mettre l'accent sur une performance de rap très technique et lyrique, avec des schémas de rimes complexes où plusieurs mots riment à l'intérieur d'une même ligne.",
        lyricInstruction: "Construis les paroles avec une forte densité de rimes internes et multi-syllabiques. L'accent doit être mis sur le jeu de mots et la prouesse technique."
      },
      {
        id: 'storytelling-verse',
        name: 'Narration Détaillée (Storytelling)',
        description: "Crée un couplet qui raconte une histoire détaillée et souvent émotionnelle d'un point de vue spécifique.",
        promptInstruction: "Le prompt doit décrire une section où le rythme devient plus minimaliste ou cinématographique pour mettre en valeur une performance vocale narrative.",
        lyricInstruction: "Écris un couplet qui raconte une histoire complète avec un début, un milieu et une fin clairs. Développe un personnage et une intrigue. Marque cette section narrative avec [story-verse]."
      }
  ] },
  { name: 'Eurythmics', genres: 'Synth-pop, New Wave', suggestedStructureValue: 'pop-full-prechorus', specialTraits: [{ id: 'androgynous-synth-vocals', name: 'Voix Androgyne & Synthés Froids', description: "Une voix de contralto puissante et androgyne sur des paysages sonores synthétiques et froids.", promptInstruction: "Le prompt doit décrire un morceau de synth-pop avec des synthétiseurs analogiques froids, une boîte à rythmes marquée, et une performance vocale de contralto, androgyne, émotive et puissante.", lyricInstruction: "Les paroles doivent être introspectives, souvent sur des thèmes de pouvoir, d'amour et de douleur." }] },
  { name: 'Evanescence', genres: 'Gothic Rock, Alternative Metal', suggestedStructureValue: 'metal-breakdown-solo', specialTraits: [{ id: 'gothic-operatic-metal', name: 'Metal Gothique & Opératique', description: "Combine des riffs de metal lourd avec des éléments orchestraux, du piano, et une voix féminine soprano et opératique.", promptInstruction: "Le prompt doit décrire une fusion de guitares de metal lourd, de piano classique, d'arrangements de cordes, et une voix féminine soprano puissante et opératique.", lyricInstruction: "Les paroles doivent être sombres, dramatiques et introspectives." }] },
  { name: 'Feu! Chatterton', genres: 'French Rock, Art Rock', suggestedStructureValue: 'progressive-interlude-solo', specialTraits: [{ id: 'poetic-spoken-word', name: 'Spoken Word Poétique & Théâtral', description: "Des paroles littéraires et poétiques déclamées dans un style parlé qui monte en intensité.", promptInstruction: "Le prompt doit décrire un morceau d'art rock avec des paroles françaises littéraires et poétiques, livrées dans un style de 'spoken word' théâtral qui monte en intensité, sur un arrangement instrumental riche et dynamique.", lyricInstruction: "Les paroles doivent être très poétiques et narratives, livrées dans un style parlé. Marque les passages avec [spoken-word]." }] },
  { name: 'Fleetwood Mac', genres: 'Rock, Pop Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'dual-vocal-harmony-rock', name: 'Harmonies Vocales Mixtes', description: "L'interaction entre des voix masculines et féminines, avec des harmonies riches.", promptInstruction: "Le prompt doit décrire un morceau de pop-rock avec des harmonies vocales complexes entre une ou plusieurs voix féminines et une voix masculine, créant un son riche et texturé.", lyricInstruction: "Les refrains et les ponts doivent comporter des harmonies entre les voix masculines et féminines. Alterne les chanteurs principaux dans les couplets." }] },
  { name: 'Florence + The Machine', genres: 'Indie Rock, Art Pop', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'harp-ethereal-vocals', name: 'Harpe & Voix Éthérée', description: "Une voix puissante et éthérée avec une harpe proéminente et des tambours tribaux.", promptInstruction: "Le prompt doit décrire un hymne indie rock avec une voix féminine puissante et éthérée, mettant en vedette une harpe proéminente, des tambours tribaux et un arrangement orchestral grandiose qui monte jusqu'à un immense climax.", lyricInstruction: "Utilise une imagerie mystique et métaphorique. La performance vocale doit être dramatique et puissante." }] },
  { name: 'Foo Fighters', genres: 'Alternative Rock, Hard Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'post-grunge-scream-along', name: 'Refrain Post-Grunge Hurlé', description: "Passe de couplets mélodiques à des refrains puissants et hurlés, parfaits pour chanter à tue-tête.", promptInstruction: "Le prompt doit décrire un morceau de rock alternatif qui alterne entre des couplets relativement calmes et des refrains explosifs avec une voix masculine éraillée et hurlée, sur des guitares puissantes.", lyricInstruction: "Les refrains doivent être délivrés avec une énergie brute et une voix criée. Marque ces passages avec [scream-vocals]." }] },
  { name: 'France Gall', genres: 'Yé-yé, Pop, Chanson', suggestedStructureValue: 'pop-short-vcvc', specialTraits: [{ id: 'ye-ye-pop-innocence', name: 'Pop Yé-Yé & Innocence', description: "Une voix pop jeune et enjouée sur des arrangements pop orchestraux des années 60, avec un ton innocent et espiègle.", promptInstruction: "Le prompt doit décrire un morceau de pop française des années 60 (yé-yé) avec des orchestrations à cordes, des cuivres et une voix féminine jeune et optimiste.", lyricInstruction: "Les paroles doivent être légères, sur des thèmes de la jeunesse et de l'amour." }] },
  { name: 'Francis Cabrel', genres: 'Chanson, Folk Rock', suggestedStructureValue: 'folk-storytelling', specialTraits: [{ id: 'folk-rock-storytelling-accent', name: 'Narration Folk-Rock & Accent du Sud', description: "Raconte des histoires poétiques avec une voix douce et un accent chantant du Sud-Ouest de la France, sur un fond de folk rock acoustique.", promptInstruction: "Le prompt doit décrire un morceau de folk rock avec des guitares acoustiques, et une voix masculine douce, narrative, avec un accent du Sud de la France.", lyricInstruction: "Les paroles doivent raconter une histoire poétique, souvent avec une touche de nostalgie." }] },
  { name: 'Frank Ocean', genres: 'R&B, Soul, Alternative R&B', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'abstract-experimental-rnb', name: 'R&B Abstrait & Expérimental', description: "Structures non conventionnelles, paroles abstraites et mélange de chant et de spoken word.", promptInstruction: "Le prompt doit décrire un morceau R&B expérimental avec des structures de chanson non conventionnelles, des paroles abstraites, et un mélange de chant en fausset, de 'spoken word' et de voix pitchées sur une production minimaliste et atmosphérique.", lyricInstruction: "Les paroles doivent être impressionnistes et profondément personnelles. La structure peut être non linéaire." }] },
  { name: 'Frank Sinatra', genres: 'Traditional Pop, Jazz, Swing', suggestedStructureValue: 'aaba-classic', specialTraits: [{ id: 'crooner-phrasing', name: 'Phrasé de Crooner', description: "Adopte un style de chant suave et décontracté (crooning) avec un phrasé impeccable et une diction claire.", promptInstruction: "Le prompt doit décrire une voix de baryton chaude et suave, style crooner, avec un timing détendu (behind the beat). L'arrangement doit être un big band jazz ou un orchestre à cordes.", lyricInstruction: "Les paroles doivent être élégantes et romantiques. La performance doit être douce et charismatique, avec une attention particulière à l'articulation de chaque mot." }] },
  { name: 'Freddie Gibbs', genres: 'Gangsta Rap, Midwest Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'technical-flow-gritty-narrative', name: 'Flow Technique & Narration Gritty', description: "Un flow de rap rapide, technique et précis qui raconte des histoires crues de la rue.", promptInstruction: "Le prompt doit décrire un beat hip-hop soulful ou trap sombre, avec un flow de rap masculin technique, rapide et articulé.", lyricInstruction: "Les paroles doivent raconter des histoires détaillées sur le trafic de drogue et la vie de rue avec un ton réaliste." }] },
  { name: 'Future', genres: 'Hip Hop, Trap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'melodic-mumbled-autotune', name: 'Trap Mélodique & Autotune Nappé', description: "Un flow mélodique et marmonné, fortement traité à l'autotune, sur des beats trap sombres et atmosphériques.", promptInstruction: "Le prompt doit décrire un beat trap atmosphérique, avec une voix masculine auto-tunée, mélodique et souvent marmonnée.", lyricInstruction: "Les paroles doivent porter sur des thèmes hédonistes, de la toxicité dans les relations et de la richesse." }] },
  { name: 'Gazo', genres: 'French Rap, Drill', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'drill-deep-raspy-voice', name: 'Drill & Voix Grave Éraillée', description: "Une voix masculine très grave et éraillée sur une production de drill française avec des basses 808 glissantes.", promptInstruction: "Le prompt doit décrire un beat de drill français avec des basses 808 glissantes, et une voix masculine très grave et éraillée.", lyricInstruction: "Les paroles doivent utiliser de l'argot de la rue et porter sur des thèmes de la vie de quartier." }] },
  { name: 'Genesis', genres: 'Progressive Rock, Pop Rock', suggestedStructureValue: 'progressive-interlude-solo', specialTraits: [{ id: 'progressive-rock-epic', name: 'Épopée Rock Progressif', description: "Une structure de chanson longue et complexe avec des changements de signature rythmique, des sections instrumentales et des paroles narratives.", promptInstruction: "Le prompt doit décrire un morceau de rock progressif des années 70 avec des structures de chanson complexes, des changements de signature rythmique, et des solos de clavier et de guitare.", lyricInstruction: "Les paroles doivent raconter une histoire fantastique ou mythologique." }] },
  { name: 'George Michael', genres: 'Pop, Soul', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'sophisticated-soul-pop-vocals', name: 'Voix Soul Pop & Sophistiquée', description: "Une performance vocale masculine suave et pleine d'âme sur une production pop sophistiquée des années 80/90.", promptInstruction: "Le prompt doit décrire une production de pop sophistiquée des années 80, avec une voix masculine suave et soulful.", lyricInstruction: "Les paroles doivent porter sur des thèmes de l'amour, de la liberté et de l'introspection." }] },
  { name: 'Georges Brassens', genres: 'Chanson', suggestedStructureValue: 'folk-storytelling', specialTraits: [{ id: 'guitar-vocals-anarchist-poetry', name: 'Guitare-Voix & Poésie Anarchiste', description: "Une voix narrative accompagnée d'une guitare acoustique, livrant des paroles poétiques, pleines d'esprit et souvent anti-conventionnelles.", promptInstruction: "Le prompt doit décrire une chanson française simple avec une guitare acoustique solo ('pompe') et une voix masculine narrative.", lyricInstruction: "Les paroles doivent être très écrites, avec un vocabulaire riche, de l'humour et une critique sociale." }] },
  { name: 'Gims', genres: 'Pop, Rap, R&B', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'vocal-power-urban-pop', name: 'Puissance Vocale & Pop Urbaine', description: "Une performance vocale masculine puissante avec une large tessiture, capable de chanter des refrains pop entraînants et de rapper.", promptInstruction: "Le prompt doit décrire une production de pop urbaine moderne, avec une voix masculine puissante et à large tessiture.", lyricInstruction: "Les paroles doivent porter sur des thèmes de succès, d'amour et de fête." }] },
  { name: 'Gojira', genres: 'Technical Death Metal, Progressive Metal', suggestedStructureValue: 'metal-breakdown-solo', specialTraits: [{ id: 'polyrhythmic-metal', name: 'Metal Polyrhythmique & Écologiste', description: "Des rythmes complexes, des riffs dissonants (pick scrapes) et des thèmes sur la nature.", promptInstruction: "Le prompt doit décrire un morceau de death metal technique avec une batterie complexe et polyrythmique, des riffs de guitare dissonants, des 'pick scrapes', et des vocaux puissants et rugissants avec des paroles sur la nature et l'environnementalisme.", lyricInstruction: "Les thèmes doivent être la nature, l'écologie ou la spiritualité. Inclus des effets de guitare techniques comme [pick-scrape]." }] },
  { name: 'Gorillaz', genres: 'Alternative Rock, Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'character-vocals', name: 'Voix de Personnage / Lo-fi', description: "Utilise une voix avec une personnalité distincte (ex: 2D) et une production lo-fi.", promptInstruction: "Le prompt doit décrire une voix masculine mélancolique et légèrement détachée, avec des effets de production lo-fi comme une légère distorsion ou un filtre radio.", lyricInstruction: "Les paroles doivent être introspectives ou surréalistes. La performance vocale doit sembler nonchalante. Marque la section avec [character-vocals]." }] },
  { name: 'Green Day', genres: 'Punk Rock, Pop Punk', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'pop-punk-energy', name: 'Énergie Pop-Punk & Voix Nasillarde', description: "Un rythme rapide, des power chords et une voix masculine nasillarde distinctive.", promptInstruction: "Le prompt doit décrire un morceau pop-punk rapide avec des power chords entraînants, une batterie simple et énergique, et une voix masculine distinctive et légèrement nasillarde.", lyricInstruction: "Les paroles doivent être rebelles ou sur l'angoisse adolescente." }] },
  { name: 'Guns N\' Roses', genres: 'Hard Rock, Heavy Metal', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'high-pitched-rock-vocals', name: 'Voix Rock Aiguë & Hurlée', description: "Une voix de rock aiguë, nasillarde et puissante, capable de cris perçants.", promptInstruction: "Le prompt doit décrire une performance vocale masculine de hard rock, aiguë et nasillarde, avec des cris perçants et une attitude rock 'n' roll, sur fond de riffs de guitare heavy.", lyricInstruction: "La livraison vocale doit être agressive et puissante. Marque les cris les plus aigus avec [high-scream]." }] },
  { name: 'IAM', genres: 'French Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'martial-arts-samples', name: 'Samples d\'Arts Martiaux & Références Historiques', description: "Un son hip-hop 90's avec des samples de films de kung-fu et des paroles lettrées.", promptInstruction: "Le prompt doit décrire un morceau de hip-hop français des années 90 avec un beat boom-bap, des samples de films d'arts martiaux, et des paroles complexes et littéraires avec des références historiques et mythologiques.", lyricInstruction: "Inclus des références à l'histoire ancienne, la mythologie ou les arts martiaux." }] },
  { name: 'Ice Cube', genres: 'West Coast Hip Hop, Gangsta Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'aggressive-storytelling-rap', name: 'Rap Conteur Agressif', description: "Un flow de rap agressif et direct qui raconte des histoires percutantes sur la vie à Los Angeles.", promptInstruction: "Le prompt doit décrire un beat G-funk West Coast, avec un flow de rap masculin agressif et narratif.", lyricInstruction: "Les paroles doivent raconter une histoire détaillée avec un ton colérique et un commentaire social." }] },
  { name: 'Iggy Pop', genres: 'Punk Rock, Garage Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'raw-punk-energy', name: 'Énergie Punk Brute', description: "Une performance vocale brute, primitive et énergique sur un fond de garage rock simple et puissant.", promptInstruction: "Le prompt doit décrire un morceau de garage rock simple et brut, avec une voix masculine de baryton énergique et sauvage.", lyricInstruction: "Les paroles doivent être minimalistes et directes sur le désir et l'ennui." }] },
  { name: 'Indochine', genres: 'New Wave, Rock, Pop Rock', suggestedStructureValue: 'pop-full-prechorus', specialTraits: [{ id: 'french-new-wave-ambivalent-lyrics', name: 'New Wave Française & Textes Ambivalents', description: "Un son new wave des années 80 avec des synthétiseurs proéminents et une voix androgyne livrant des paroles poétiques et ambiguës.", promptInstruction: "Le prompt doit décrire un morceau de new wave française des années 80 avec des synthétiseurs et des guitares avec du chorus, et une voix masculine androgyne.", lyricInstruction: "Les paroles doivent être poétiques sur des thèmes comme l'identité sexuelle, l'amour et la société." }] },
  { name: 'INXS', genres: 'Rock, New Wave', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'sensual-funky-rock', name: 'Rock Sensuel & Funky', description: "Un son rock énergique avec une section rythmique funky et une performance vocale masculine charismatique et sensuelle.", promptInstruction: "Le prompt doit décrire un morceau de rock new wave des années 80 avec une basse funky, et une voix masculine charismatique et sensuelle.", lyricInstruction: "Les paroles doivent porter sur des thèmes de désir, de romance et de fête." }] },
  { name: 'Iron Maiden', genres: 'Heavy Metal', suggestedStructureValue: 'metal-breakdown-solo', specialTraits: [{ id: 'galloping-basslines-operatic-vocals', name: 'Basse Galopante & Chant Opératique', description: "Un rythme de basse rapide et galopant avec une voix de heavy metal puissante et opératique.", promptInstruction: "Le prompt doit décrire un morceau de heavy metal avec une ligne de basse proéminente jouant un rythme galopant (une croche, deux double-croches), des guitares harmonisées, et une performance vocale masculine aiguë, puissante et quasi-opératique.", lyricInstruction: "Les paroles doivent être épiques, sur des thèmes historiques, littéraires ou mythologiques." }] },
  { name: 'J. Cole', genres: 'Hip Hop, Conscious Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'narrative-conscious-rap', name: 'Rap Narratif & Conscient', description: "Raconte une histoire personnelle ou un commentaire social avec un flow clair.", promptInstruction: "Le prompt doit décrire un morceau de hip-hop avec un beat soulful basé sur un sample et un flow de rap clair et narratif racontant une histoire personnelle ou livrant un commentaire social.", lyricInstruction: "Raconte une histoire détaillée à la première personne." }] },
  { name: 'JID', genres: 'Hip Hop, Trap, Conscious Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'acrobatic-flow-wordplay', name: 'Flow Acrobatique & Jeux de Mots', description: "Un flow de rap très rapide, changeant et technique, plein de jeux de mots et de rimes complexes.", promptInstruction: "Le prompt doit décrire un beat hip-hop éclectique, avec un flow de rap masculin très technique, rapide et changeant.", lyricInstruction: "Les paroles doivent être denses et intelligentes avec des changements de flow constants." }] },
  { name: 'Jacques Brel', genres: 'Chanson', suggestedStructureValue: 'cash-narrative-crescendo', specialTraits: [{ id: 'brel-crescendo', name: 'Crescendo Émotionnel', description: 'Commence de manière retenue pour monter jusqu\'à un climax théâtral et intensément émotionnel.', promptInstruction: 'Le prompt doit décrire une performance vocale qui passe d\'un ton calme et narratif à une livraison puissante, théâtrale, presque criée. L\'instrumentation doit suivre cette dynamique, commençant de manière épurée pour devenir un orchestre dramatique.', lyricInstruction: 'Les paroles doivent raconter une histoire avec une charge émotionnelle croissante. Le dernier refrain ou le pont doit être marqué pour une livraison extrêmement intense et passionnée avec le tag [crescendo-final].' }] },
  { name: 'James Brown', genres: 'Funk, Soul, R&B', suggestedStructureValue: 'funk-jam', specialTraits: [{ id: 'funk-adlibs', name: "Ad-libs & Cris Funk", description: "Ajoute des ad-libs énergiques, des cris et des interjections typiques du funk.", promptInstruction: "Le prompt doit spécifier une livraison vocale percussive et rythmique, avec des cris, des grognements et des ad-libs fréquents ('Good God!', 'Get up!'). Le tout sur un groove de funk serré.", lyricInstruction: "Intègre des ad-libs et des interjections vocales percussives entre les lignes de chant. Utilise des tags comme (Hit me!), (Good God!) ou (Yeah!)." }] },
  { name: 'Janet Jackson', genres: 'R&B, Pop, Dance', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'new-jack-swing-rhythms', name: 'Rythmes New Jack Swing', description: "Une fusion de R&B avec des rythmes hip-hop percutants et une production dance-pop.", promptInstruction: "Le prompt doit décrire un morceau de New Jack Swing avec une boîte à rythmes proéminente, des hits de synthé et une voix féminine douce et rythmée.", lyricInstruction: "Les paroles doivent être sur des thèmes de danse, de romance et d'indépendance." }] },
  { name: 'Jay-Z', genres: 'Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'confident-multimillionaire-flow', name: 'Flow de "Millionnaire" Confiant', description: "Un flow de rap complexe et confiant, avec des paroles sur le succès, la richesse et la rue.", promptInstruction: "Le prompt doit décrire un beat hip-hop sophistiqué, avec un flow de rap masculin confiant, articulé et plein de charisme.", lyricInstruction: "Les paroles doivent être pleines de vantardise intelligente, de jeux de mots et de métaphores sur le succès." }] },
  { name: 'Jean-Jacques Goldman', genres: 'French Pop, Rock', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: '80s-pop-rock-choral', name: 'Pop-Rock 80s & Chœurs', description: "Un son pop-rock français des années 80 avec des synthés et des refrains chantés en chœur.", promptInstruction: "Le prompt doit décrire un hymne pop-rock français des années 80 avec des synthétiseurs proéminents, un son de batterie avec 'gated reverb', une mélodie de guitare électrique claire, et un refrain puissant et fédérateur avec des chœurs superposés.", lyricInstruction: "Le refrain doit être accrocheur et comporter des harmonies en arrière-plan. Marque ces passages avec [choral-harmonies]." }] },
  { name: 'Jean-Michel Jarre', genres: 'Electronic, Ambient', suggestedStructureValue: 'post-rock-ambient', specialTraits: [{ id: 'analog-synth-soundscapes', name: 'Paysages Sonores de Synthés Analogiques', description: "Crée de vastes paysages sonores électroniques en utilisant des synthétiseurs analogiques, des séquenceurs et des arpégiateurs.", promptInstruction: "Le prompt doit décrire un morceau électronique instrumental construit avec des couches de synthétiseurs analogiques vintage, des arpèges, et des séquences, créant une atmosphère cinématique et futuriste.", lyricInstruction: "" }] },
  { name: 'Jeff Buckley', genres: 'Alternative Rock, Soul', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'ethereal-multi-octave-vocals', name: 'Voix Éthérée Multi-Octave', description: "Une performance vocale masculine à la tessiture exceptionnellement large, passant d'un murmure à un fausset puissant et éthéré.", promptInstruction: "Le prompt doit décrire une performance vocale masculine avec une tessiture très large, capable d'un fausset éthéré et puissant, sur un arrangement de rock alternatif avec des guitares clean et arpégées.", lyricInstruction: "Les paroles doivent être poétiques et romantiques. La performance vocale doit être très dynamique et émotive." }] },
  { name: 'Jimi Hendrix', genres: 'Psychedelic Rock, Blues Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'psychedelic-guitar-virtuosity', name: 'Virtuosité à la Guitare Psychédélique', description: "Un son de rock psychédélique mené par une guitare électrique virtuose utilisant des effets comme le feedback, la wah-wah et la fuzz.", promptInstruction: "Le prompt doit décrire un morceau de rock psychédélique avec une guitare électrique innovante et virtuose, utilisant des effets de pédale (wah-wah, fuzz) et du feedback.", lyricInstruction: "Les paroles doivent être psychédéliques et poétiques." }] },
  { name: 'Joey Bada$$', genres: 'East Coast Hip Hop, Conscious Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: '90s-boom-bap-revival', name: 'Renaissance Boom-Bap 90\'s', description: "Un son qui rappelle le hip-hop de la côte Est des années 90, avec des beats boom-bap et un flow technique.", promptInstruction: "Le prompt doit décrire un beat hip-hop boom-bap avec des samples de jazz ou de soul, et un flow de rap technique et complexe.", lyricInstruction: "Les paroles doivent être introspectives, avec des jeux de mots et des commentaires sociaux." }] },
  { name: 'Johnny Cash', genres: 'Country, Rock and Roll', suggestedStructureValue: 'cash-narrative-crescendo', specialTraits: [{ id: 'storytelling-outlaw', name: 'Narration "Outlaw"', description: "Raconte une histoire poignante sur un personnage de hors-la-loi, de rédemption ou de lutte.", promptInstruction: "Le prompt doit spécifier une voix de baryton profonde, parlée-chantée, racontant une histoire avec une instrumentation country/folk minimaliste (guitare acoustique, etc.).", lyricInstruction: "Écris une ballade narrative à la première personne sur un thème de regret, de voyage ou de confrontation avec la loi." }] },
  { name: 'Johnny Hallyday', genres: 'Rock and Roll, Pop', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'french-rock-n-roll-power', name: 'Puissance Rock \'n\' Roll Française', description: "Une voix de baryton puissante et éraillée, pleine d'émotion, pour incarner le rock français.", promptInstruction: "Le prompt doit décrire une performance vocale masculine puissante, avec une texture de voix éraillée (gravelly voice), sur un arrangement de rock and roll ou de power ballade avec des guitares électriques et une section rythmique forte.", lyricInstruction: "Les paroles doivent être passionnées, sur des thèmes comme l'amour, la solitude ou la liberté. La livraison doit être intense et habitée." }] },
  { name: 'Joji', genres: 'Lo-fi, R&B, Trip Hop', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'melancholic-lo-fi-rnb', name: 'R&B Lo-fi & Mélancolique', description: "Une voix R&B douce et mélancolique sur une production lo-fi et atmosphérique avec des textures de piano et des beats minimalistes.", promptInstruction: "Le prompt doit décrire une production R&B lo-fi et atmosphérique, avec un piano mélancolique et des beats minimalistes, et une voix masculine douce et émotive.", lyricInstruction: "Les paroles doivent être introspectives sur la dépression, l'amour et la solitude." }] },
  { name: 'Josman', genres: 'French Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'laid-back-flow-eclectic-beats', name: 'Flow Décontracté & Prods Éclectiques', description: "Un flow de rap décontracté et nonchalant qui s'adapte à une variété de productions, du trap au boom-bap.", promptInstruction: "Le prompt doit décrire un beat de rap français moderne et varié, avec un flow masculin décontracté et nonchalant.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la vie quotidienne, des relations et des ambitions." }] },
  { name: 'Journey', genres: 'Rock, Arena Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'powerful-tenor-rock-anthem', name: 'Hymne Rock & Ténor Puissant', description: "Un hymne de rock de stade avec une performance vocale masculine de ténor, aiguë et puissante, capable de notes tenues impressionnantes.", promptInstruction: "Le prompt doit décrire un morceau d'arena rock des années 80 avec une voix masculine de ténor aiguë et puissante.", lyricInstruction: "Le refrain doit être hymnique et les paroles optimistes sur l'amour et la persévérance." }] },
  { name: 'Joy Division', genres: 'Post-Punk', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'dark-post-punk-atmosphere', name: 'Atmosphère Post-Punk Sombre', description: "Un son post-punk minimaliste et sombre, mené par une ligne de basse mélodique et une voix de baryton profonde, détachée et mélancolique.", promptInstruction: "Le prompt doit décrire un morceau de post-punk sombre et atmosphérique avec une ligne de basse proéminente et une voix masculine de baryton profonde et détachée.", lyricInstruction: "Les paroles doivent être introspectives et sombres sur l'aliénation et le désespoir." }] },
  { 
    name: 'Juice WRLD', 
    genres: 'Emo Rap, SoundCloud Rap, Hip Hop', 
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [{
      id: 'emo-rap-melodies',
      name: 'Mélodies Emo Rap',
      description: "Un flow mélodique et auto-tuné avec des paroles introspectives sur le chagrin d'amour et les luttes personnelles.",
      promptInstruction: "Le prompt doit décrire un beat trap mélancolique avec une guitare emo ou un piano, et une performance vocale masculine auto-tunée, pleine d'émotion, qui brouille la ligne entre le rap et le chant.",
      lyricInstruction: "Les paroles doivent être émotionnelles et introspectives, traitant de thèmes comme le chagrin d'amour, l'anxiété ou la dépendance. Le flow doit être très mélodique."
    }]
  },
  { name: 'Jul', genres: 'French Rap, Trap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'simple-autotune-dance-melody', name: 'Mélodie Simple & Autotune Dansant', description: "Un style de rap très mélodique et simple, avec un usage proéminent de l'autotune sur des productions entraînantes et dansantes.", promptInstruction: "Le prompt doit décrire un beat trap ou dance-pop ensoleillé, avec une voix masculine auto-tunée et très mélodique.", lyricInstruction: "Les paroles doivent porter sur la vie de quartier, les amis et la fête." }] },
  { name: 'Juliette Armanet', genres: 'Pop, Disco', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'piano-disco-pop', name: 'Disco-Pop au Piano', description: "Une chanson pop entraînante menée par un jeu de piano disco-funk, avec une voix féminine puissante et expressive.", promptInstruction: "Le prompt doit décrire un morceau de disco-pop français avec un piano proéminent et une voix féminine énergique.", lyricInstruction: "Les paroles doivent porter sur l'amour et la danse." }] },,
  {
    name: 'Alpha Wann',
    genres: 'French Rap, Hip Hop',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'technical-lyrical-rap',
        name: 'Rap Technique & Lyrique',
        description: "Un flow extrêmement technique, des rimes multi-syllabiques et un sens du détail dans l'écriture.",
        promptInstruction: "Le prompt doit décrire un son boom-bap ou trap moderne avec un flow de rap très technique, précis et complexe.",
        lyricInstruction: "Les paroles doivent être denses, pleines de jeux de mots, d'allitérations et de références pointues."
      }
    ]
  },
  {
    name: 'Aloïse Sauvage',
    genres: 'Pop, Chanson, Hip Hop',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'circassian-pop-flow',
        name: 'Pop Circassienne & Flow Acrobatique',
        description: "Un mélange de pop et de rap avec une énergie scénique (cirque), et un flow qui alterne entre chant et rap acrobatique.",
        promptInstruction: "Le prompt doit décrire une production pop moderne avec des éléments électroniques et un flow vocal féminin qui passe du chant au rap avec agilité.",
        lyricInstruction: "Les paroles doivent être introspectives et pleines de métaphores sur le corps et le mouvement."
      }
    ]
  },
  {
    name: 'Amel Bent',
    genres: 'R&B, French Pop, Chanson',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'powerful-rnb-voice',
        name: 'Voix R&B Puissante',
        description: "Une voix R&B puissante et émotive, capable de grandes envolées lyriques sur des ballades ou des morceaux pop.",
        promptInstruction: "Le prompt doit décrire une production pop ou R&B avec une performance vocale féminine puissante et pleine d'âme.",
        lyricInstruction: "Les paroles doivent porter sur des thèmes de la résilience, de l'amour et de la force."
      }
    ]
  },
  {
    name: 'Bon Entendeur',
    genres: 'Electronic, French House',
    suggestedStructureValue: 'edm-dance-drop',
    specialTraits: [
      {
        id: 'interview-sampling-house',
        name: 'House & Samples d\'Interviews',
        description: "Crée des morceaux de French House en utilisant des extraits d'interviews de personnalités francophones comme ligne vocale principale.",
        promptInstruction: "Le prompt doit décrire un beat de French House disco/funk, construit autour d'un sample de voix parlée en français, charismatique et bien articulée.",
        lyricInstruction: "La chanson est principalement instrumentale, centrée sur un [spoken-word-sample] tiré d'une interview fictive."
      }
    ]
  },
  {
    name: 'Caballero & JeanJass',
    genres: 'French Rap, Belgian Hip Hop, Comedy Rap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'laid-back-duo-rap',
        name: 'Duo de Rap Décontracté',
        description: "Un duo de rap avec une alchimie évidente, des flows décontractés et un humour omniprésent sur des productions boom-bap ou trap.",
        promptInstruction: "Le prompt doit décrire un beat de rap décontracté avec deux voix masculines qui s'échangent les rimes avec humour et complicité.",
        lyricInstruction: "Les paroles doivent être pleines d'esprit, avec des jeux de mots et un ton conversationnel entre deux rappeurs."
      }
    ]
  },
  {
    name: 'Camélia Jordana',
    genres: 'Chanson, Pop, Soul',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'smoky-voice-committed-chanson',
        name: 'Voix Fumeuse & Chanson Engagée',
        description: "Une voix distinctive, légèrement éraillée et 'fumeuse', livrant des textes poétiques et souvent engagés sur des productions éclectiques.",
        promptInstruction: "Le prompt doit décrire une production pop ou soul avec une voix féminine distinctive, grave et texturée.",
        lyricInstruction: "Les paroles doivent être poétiques et porter un message social ou féministe."
      }
    ]
  },
  {
    name: 'Christophe Maé',
    genres: 'Chanson, Pop, Folk',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'sunny-folk-pop-harmonica',
        name: 'Folk-Pop Solaire & Harmonica',
        description: "Un son pop-folk ensoleillé avec une guitare acoustique, des influences de musique du monde et des solos d'harmonica.",
        promptInstruction: "Le prompt doit décrire un morceau de pop acoustique avec un harmonica et une ambiance joyeuse et estivale.",
        lyricInstruction: "Les paroles doivent être positives et sur des thèmes de voyage et d'amitié. Inclus une section [harmonica-solo]."
      }
    ]
  },
  {
    name: 'Dadju',
    genres: 'R&B, Pop, Afrobeat',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'gentleman-rnb-afro',
        name: 'R&B de Gentleman & Afro',
        description: "Un son R&B et Afropop avec une voix masculine douce et suave, et des paroles sur l'amour et les relations, dans un style de 'gentleman'.",
        promptInstruction: "Le prompt doit décrire un morceau de R&B/Afropop avec une voix masculine douce et séductrice.",
        lyricInstruction: "Les paroles doivent être romantiques et respectueuses."
      }
    ]
  },
  {
    name: 'Dinos',
    genres: 'French Rap, Hip Hop',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'melancholic-lyrical-rap',
        name: 'Rap Lyrique & Mélancolique',
        description: "Un flow de rap introspectif et mélancolique, avec une écriture très soignée et poétique, sur des productions atmosphériques.",
        promptInstruction: "Le prompt doit décrire un beat de rap atmosphérique et mélancolique, avec un flow de rap poétique et réfléchi.",
        lyricInstruction: "Les paroles doivent être une exploration profonde des émotions, avec des métaphores complexes."
      }
    ]
  },
  {
    name: 'Eddy de Pretto',
    genres: 'Chanson, Pop',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'theatrical-spoken-word-pop',
        name: 'Pop Théâtrale & Spoken Word',
        description: "Une performance vocale intense et théâtrale qui se situe entre le chant et le spoken word, sur des productions pop minimalistes.",
        promptInstruction: "Le prompt doit décrire une production pop minimaliste avec une performance vocale masculine théâtrale et scandée.",
        lyricInstruction: "Les paroles doivent être des récits crus sur la masculinité, l'identité et la société."
      }
    ]
  },
  {
    name: 'Fakear',
    genres: 'Electronic, World, Downtempo',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'ethnic-electronic-soundscapes',
        name: 'Paysages Électroniques Ethniques',
        description: "Crée des paysages sonores électroniques qui incorporent des samples de voix et d'instruments du monde entier pour une ambiance de voyage.",
        promptInstruction: "Le prompt doit décrire un morceau de downtempo électronique avec des samples vocaux et instrumentaux ethniques (asiatiques, orientaux...).",
        lyricInstruction: "Principalement instrumental, utilise des samples vocaux comme textures."
      }
    ]
  },
  {
    name: 'Freeze Corleone',
    genres: 'French Rap, Drill, Trap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: '667-cryptic-drill',
        name: 'Drill Cryptique & 667',
        description: "Un flow sombre et menaçant sur des productions de drill, avec des paroles pleines de références obscures, de complots et d'argot propre à son collectif (667).",
        promptInstruction: "Le prompt doit décrire un beat de drill sombre et minimaliste, avec une voix masculine grave et un flow nonchalant.",
        lyricInstruction: "Les paroles doivent être cryptiques, avec un vocabulaire spécifique (ex: 'MMS', 'LDO') et des thèmes conspirationnistes."
      }
    ]
  },
  {
    name: 'Gaël Faye',
    genres: 'French Rap, Chanson, Soul',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'poetic-rap-world-music',
        name: 'Rap Poétique & Musiques du Monde',
        description: "Un flow de rap qui se mêle au chant et au spoken word, avec des paroles littéraires et engagées, sur des productions qui fusionnent hip-hop, soul et musique africaine.",
        promptInstruction: "Le prompt doit décrire une fusion de hip-hop et de musiques du monde, avec une voix masculine qui alterne rap et chant.",
        lyricInstruction: "Les paroles doivent être poétiques et narratives, sur des thèmes comme l'exil, l'identité et l'histoire."
      }
    ]
  },
  {
    name: 'Grand Corps Malade',
    genres: 'Slam, Chanson',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'poetic-slam-narration',
        name: 'Slam Poétique & Narration',
        description: "Une performance de slam avec une voix grave et posée qui raconte des histoires poignantes sur des arrangements musicaux minimalistes (souvent piano).",
        promptInstruction: "Le prompt doit décrire une production musicale minimaliste (piano, cordes) avec une voix masculine grave de slam, narrative et claire.",
        lyricInstruction: "Les paroles doivent être une histoire racontée en vers, avec un accent sur le rythme et la sonorité des mots. Marque toute la chanson comme [spoken-word]."
      }
    ]
  },
  {
    name: 'Guy2bezbar',
    genres: 'French Drill, Rap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'energetic-drill-flow',
        name: 'Drill Énergique & Ad-libs',
        description: "Un flow de drill très énergique et agressif avec des ad-libs percutants et une attitude de showman.",
        promptInstruction: "Le prompt doit décrire un beat de drill français avec une performance de rap masculine très énergique et confiante.",
        lyricInstruction: "La livraison doit être rapide et agressive, avec beaucoup d'ad-libs."
      }
    ]
  },
  {
    name: 'Hatik',
    genres: 'French Rap, Pop',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'emotional-rap-singing',
        name: 'Rap/Chant Émotionnel',
        description: "Alterne entre un rap sincère et un chant pop émouvant, souvent sur des thèmes de relations amoureuses.",
        promptInstruction: "Le prompt doit décrire un morceau qui fusionne pop et rap, avec une voix masculine qui passe du rap au chant dans les refrains.",
        lyricInstruction: "Les paroles doivent être des récits directs sur l'amour et le chagrin."
      }
    ]
  },
  {
    name: 'Heuss l\'Enfoiré',
    genres: 'French Rap, Trap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'neologism-arabic-slang',
        name: 'Néologismes & Argot Arabe',
        description: "Un flow nonchalant avec beaucoup de néologismes et l'incorporation d'argot et d'expressions arabes dans des paroles sur le luxe et la rue.",
        promptInstruction: "Le prompt doit décrire un beat de trap avec une voix de rap nonchalante qui utilise des mots arabes et des néologismes.",
        lyricInstruction: "Inclus des expressions comme 'khapta' ou des mots arabes dans le texte."
      }
    ]
  },
  {
    name: 'Hoshi',
    genres: 'Chanson, Pop Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'raspy-voice-committed-lyrics',
        name: 'Voix Éraillée & Textes Engagés',
        description: "Une voix féminine éraillée et puissante qui livre des textes engagés (lutte contre le harcèlement, amour...) sur des hymnes pop-rock.",
        promptInstruction: "Le prompt doit décrire un hymne pop-rock avec une performance vocale féminine éraillée et passionnée.",
        lyricInstruction: "Les paroles doivent porter un message fort et être livrées avec une grande intensité émotionnelle."
      }
    ]
  },
  {
    name: 'Imen Es',
    genres: 'Pop Urbaine, R&B',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'melancholic-urban-pop',
        name: 'Pop Urbaine Mélancolique',
        description: "Une voix R&B émotive sur des productions de pop urbaine, avec des thèmes de relations amoureuses compliquées.",
        promptInstruction: "Le prompt doit décrire un morceau de pop urbaine avec une voix féminine mélancolique et puissante.",
        lyricInstruction: "Les paroles doivent être des récits de chagrin d'amour et de trahison."
      }
    ]
  },
  {
    name: 'Julien Doré',
    genres: 'Pop, Chanson',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'poetic-dandy-pop',
        name: 'Pop Poétique & Dandy',
        description: "Une voix de baryton douce et une esthétique de dandy, livrant des paroles poétiques et souvent mélancoliques sur des productions pop élégantes.",
        promptInstruction: "Le prompt doit décrire une production de pop sophistiquée avec une voix de baryton masculine douce et charismatique.",
        lyricInstruction: "Les paroles doivent être poétiques, avec des jeux de mots et une touche de nostalgie."
      }
    ]
  },
  {
    name: 'Kaaris',
    genres: 'French Rap, Trap, Drill',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'aggressive-hardcore-trap',
        name: 'Trap Hardcore & Agressif',
        description: "Un flow agressif avec une voix grave et puissante, pionnier du son trap hardcore en France.",
        promptInstruction: "Le prompt doit décrire un beat de trap lourd et sombre, avec une performance vocale masculine très agressive et percutante.",
        lyricInstruction: "Les paroles doivent être crues et violentes, sur des thèmes de la rue."
      }
    ]
  },
  {
    name: 'Kalash Criminel',
    genres: 'French Rap, Hardcore Rap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'cagoule-raw-rap',
        name: 'Rap Brut & Cagoulé',
        description: "Un flow de rap brutal et sans concession avec une voix agressive, livrant des paroles sur la réalité de la rue et des thèmes africains.",
        promptInstruction: "Le prompt doit décrire un beat de trap sombre et agressif, avec une voix de rap masculine directe et puissante.",
        lyricInstruction: "Les paroles doivent être crues, directes et porter sur des thèmes de violence et de fierté ('Sauvagerie')."
      }
    ]
  },
  {
    name: 'Kendji Girac',
    genres: 'Pop, Gipsy Pop',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'gipsy-pop-flamenco-guitar',
        name: 'Gipsy Pop & Guitare Flamenco',
        description: "Fusionne la pop avec la musique gitane, en utilisant une guitare acoustique de style flamenco et une voix chaleureuse.",
        promptInstruction: "Le prompt doit décrire un morceau de pop ensoleillé avec une guitare acoustique flamenco proéminente.",
        lyricInstruction: "Les paroles, en français avec des touches d'espagnol, sont sur l'amour et la fête."
      }
    ]
  },
  {
    name: 'Kerchak',
    genres: 'French Drill, Jersey Drill',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'jersey-drill-fast-flow',
        name: 'Jersey Drill & Flow Rapide',
        description: "Pionnier de la Jersey Drill en France, avec des rythmes rapides et rebondissants et un flow énergique.",
        promptInstruction: "Le prompt doit décrire un beat de Jersey Drill avec un kick rapide et des samples, et un flow de rap énergique.",
        lyricInstruction: "Les paroles sont sur la rue et le succès, avec une livraison rapide et agressive."
      }
    ]
  },
  {
    name: 'Koba LaD',
    genres: 'French Rap, Trap, Drill',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'unique-articulation-adlibs',
        name: 'Articulation Unique & Ad-libs',
        description: "Un flow distinctif avec une articulation et une voix uniques, et des ad-libs mémorables, sur des productions de trap ou de drill.",
        promptInstruction: "Le prompt doit décrire un beat de trap ou de drill avec une performance vocale masculine ayant une articulation très reconnaissable.",
        lyricInstruction: "La livraison doit être nonchalante et pleine d'attitude. Inclus des ad-libs fréquents."
      }
    ]
  },
  {
    name: 'Kungs',
    genres: 'Electronic, Deep House, Tropical House',
    suggestedStructureValue: 'edm-dance-drop',
    specialTraits: [
      {
        id: 'upbeat-house-live-instruments',
        name: 'House Optimiste & Instruments Live',
        description: "Un son deep house ou tropical house avec des mélodies accrocheuses, souvent incorporant des instruments live comme la guitare ou le saxophone.",
        promptInstruction: "Le prompt doit décrire un morceau de house dansant et ensoleillé avec une mélodie de guitare ou un riff de saxophone.",
        lyricInstruction: "Souvent instrumental ou avec des featurings vocaux pop."
      }
    ]
  },
  {
    name: 'Leto',
    genres: 'French Rap, Drill, Trap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'melodic-kick-drill',
        name: 'Drill Mélodique & "Kicker"',
        description: "Alterne entre des mélodies auto-tunées et des couplets de drill très rapides et techniques ('kickage').",
        promptInstruction: "Le prompt doit décrire un beat de drill qui alterne entre des sections mélodiques et des sections plus agressives pour un flow rapide.",
        lyricInstruction: "La chanson doit avoir des refrains chantés et des couplets de rap très rapides. Marque les sections rapides avec [fast-flow]."
      }
    ]
  },
  {
    name: 'Luv Resval',
    genres: 'French Rap, Cloud Rap, Trap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'ethereal-cloud-rap-star-wars',
        name: 'Cloud Rap Éthéré & Références Star Wars',
        description: "Un flow planant et mélodique sur des productions de cloud rap, avec des paroles pleines de références à Star Wars et à la pop culture.",
        promptInstruction: "Le prompt doit décrire un beat de cloud rap atmosphérique avec une voix masculine auto-tunée et aérienne.",
        lyricInstruction: "Les paroles doivent être poétiques et inclure des métaphores liées à Star Wars (sabre laser, force, etc.)."
      }
    ]
  },
  {
    name: 'M. Pokora',
    genres: 'Pop, R&B, Dance-pop',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'showman-dance-pop',
        name: 'Dance-Pop de Showman',
        description: "Des hymnes dance-pop produits pour la scène, avec un accent sur la chorégraphie et une performance vocale énergique.",
        promptInstruction: "Le prompt doit décrire un morceau de dance-pop avec une production puissante et un rythme fait pour la danse.",
        lyricInstruction: "Les paroles portent sur l'amour et la fête, avec une énergie positive."
      }
    ]
  },
  {
    name: 'Maes',
    genres: 'French Rap, Trap, Cloud Rap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'melancholic-street-rap',
        name: 'Rap de Rue Mélancolique',
        description: "Un flow de rap mélancolique et auto-tuné qui raconte des histoires de la rue avec une touche de tristesse.",
        promptInstruction: "Le prompt doit décrire un beat de trap avec un piano mélancolique, et une voix masculine auto-tunée et émotive.",
        lyricInstruction: "Les paroles doivent être des récits de la vie de rue, teintés de mélancolie."
      }
    ]
  },
  {
    name: 'Mentissa',
    genres: 'Chanson, Pop',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'powerful-vocal-chanson',
        name: 'Chanson à Voix Puissante',
        description: "Une voix pop puissante et émotive qui livre des textes inspirants sur la persévérance et l'acceptation de soi.",
        promptInstruction: "Le prompt doit décrire une ballade pop avec une performance vocale féminine très puissante et pleine d'émotion.",
        lyricInstruction: "Les paroles doivent être un message d'espoir et de résilience, avec un refrain hymnique."
      }
    ]
  },
  {
    name: 'Naps',
    genres: 'French Rap, Dance, Pop',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'sunny-dance-rap',
        name: 'Rap Dansant & Solaire',
        description: "Un son de rap très dansant et festif avec des productions ensoleillées (influences latines, house) et un flow décontracté.",
        promptInstruction: "Le prompt doit décrire un beat de rap avec des influences de musique de club, et un flow décontracté et festif.",
        lyricInstruction: "Les paroles portent sur la fête, l'été et le style de vie marseillais."
      }
    ]
  },
  {
    name: 'Oboy',
    genres: 'French Rap, Trap, Mumble Rap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'dark-mumble-trap',
        name: 'Mumble Trap Sombre',
        description: "Un flow de 'mumble rap' nonchalant et sombre sur des productions trap minimalistes et atmosphériques.",
        promptInstruction: "Le prompt doit décrire un beat de trap sombre et minimaliste, avec une voix masculine marmonnée et grave.",
        lyricInstruction: "La livraison doit être nonchalante et les paroles porter sur les relations et le style de vie."
      }
    ]
  },
  {
    name: 'Ofenbach',
    genres: 'Electronic, Deep House, Rock',
    suggestedStructureValue: 'edm-dance-drop',
    specialTraits: [
      {
        id: 'rock-infused-house',
        name: 'House & Influences Rock',
        description: "Un duo qui mélange des rythmes de deep house avec des riffs de guitare rock et des influences vintage.",
        promptInstruction: "Le prompt doit décrire un morceau de house dansant qui incorpore un riff de guitare électrique d'inspiration rock.",
        lyricInstruction: "Souvent avec des featurings vocaux pop ou rock."
      }
    ]
  },
  {
    name: 'Pierre de Maere',
    genres: 'Pop, Chanson',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'flamboyant-baroque-pop',
        name: 'Pop Baroque & Dandy Électronique',
        description: "Une pop théâtrale et flamboyante avec des arrangements baroques, une voix androgyne et des paroles poétiques.",
        promptInstruction: "Le prompt doit décrire une production de pop orchestrale et électronique avec une voix masculine théâtrale et expressive.",
        lyricInstruction: "Les paroles doivent être poétiques, avec un ton dramatique et une esthétique de dandy."
      }
    ]
  },
  {
    name: 'Pomme',
    genres: 'Folk, Chanson',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'ethereal-folk-autoharp',
        name: 'Folk Éthérée & Autoharpe',
        description: "Une voix douce et aérienne sur des arrangements folk minimalistes, souvent avec une autoharpe, et des paroles poétiques sur l'amour et la nature.",
        promptInstruction: "Le prompt doit décrire un morceau de folk avec une autoharpe et une voix féminine douce et éthérée.",
        lyricInstruction: "Les paroles doivent être poétiques et introspectives, avec des images naturelles."
      }
    ]
  },
  {
    name: 'Ronisia',
    genres: 'R&B, Pop Urbaine, Afro',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'rnb-afro-pop-melodies',
        name: 'Mélodies R&B & Afro-Pop',
        description: "Un son qui mélange le R&B avec des influences afropop, une voix féminine douce et des paroles sur les relations.",
        promptInstruction: "Le prompt doit décrire un beat de pop urbaine avec des rythmes afrobeats et une voix féminine R&B douce.",
        lyricInstruction: "Les paroles portent sur l'amour, la séduction et l'indépendance."
      }
    ]
  },
  {
    name: 'Rsko',
    genres: 'French Rap, Melodic Rap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'melodic-drill-singing',
        name: 'Drill Mélodique & Chantée',
        description: "Spécialiste de la drill mélodique, avec un flow presque entièrement chanté sur des productions de drill.",
        promptInstruction: "Le prompt doit décrire un beat de drill avec un piano mélodique, et une performance vocale masculine principalement chantée.",
        lyricInstruction: "Les paroles portent sur les relations et la vie de rue, avec une approche très mélodique."
      }
    ]
  },
  {
    name: 'SDM',
    genres: 'French Rap, Trap, Drill',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'hard-hitting-confident-rap',
        name: 'Rap Percutant & Confiant',
        description: "Un flow de rap puissant et percutant avec une grande confiance en soi, sur des productions de trap et de drill.",
        promptInstruction: "Le prompt doit décrire un beat de trap lourd avec une performance de rap masculine très assurée et énergique.",
        lyricInstruction: "Les paroles doivent être vantardes et pleines d'assurance, sur le succès et la rue."
      }
    ]
  },
  {
    name: 'Slimane',
    genres: 'Chanson, Pop, Ballad',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'emotional-vocal-performance',
        name: 'Performance Vocale Émotionnelle',
        description: "Une voix masculine puissante et pleine de fêlures, qui livre des ballades intenses sur l'amour et la perte.",
        promptInstruction: "Le prompt doit décrire une ballade au piano avec une performance vocale masculine très émotive et puissante.",
        lyricInstruction: "Les paroles doivent être une déclaration d'amour ou de chagrin, avec une livraison vocale très intense."
      }
    ]
  },
  {
    name: 'Soolking',
    genres: 'Raï, R&B, French Rap',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'rai-rnb-fusion',
        name: 'Fusion Raï & R&B',
        description: "Fusionne la musique Raï algérienne avec le R&B et le rap, en utilisant des mélodies orientales et un chant auto-tuné.",
        promptInstruction: "Le prompt doit décrire un morceau qui mélange des rythmes de R&B/trap avec des mélodies et des instruments Raï.",
        lyricInstruction: "Mélange des paroles en français et en arabe, sur des thèmes de l'amour et de la nostalgie."
      }
    ]
  },
  {
    name: 'Suzane',
    genres: 'Electropop, Chanson',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'electro-chanson-social-commentary',
        name: 'Électro-Chanson & Commentaire Social',
        description: "Des textes qui sont des chroniques de la société moderne, livrés avec une énergie scénique sur des productions électropop dansantes.",
        promptInstruction: "Le prompt doit décrire un beat électropop avec une voix féminine énergique et narrative.",
        lyricInstruction: "Les paroles doivent être un commentaire social sur des thèmes comme le féminisme, l'écologie ou la technologie."
      }
    ]
  },
  {
    name: 'Tayc',
    genres: 'Afrolove, R&B, Pop',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'afrolove-sensual-rnb',
        name: 'Afrolove & R&B Sensuel',
        description: "Créateur du style 'Afrolove', un mélange de R&B, de kizomba et d'afrobeats avec des paroles très sensuelles et une voix masculine douce.",
        promptInstruction: "Le prompt doit décrire un beat de R&B avec des rythmes afrobeats/kizomba, et une voix masculine très douce et séductrice.",
        lyricInstruction: "Les paroles doivent être explicitement sur la sensualité et le désir."
      }
    ]
  },
  {
    name: 'Thylacine',
    genres: 'Electronic, Ambient, Techno',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'travel-sampling-techno',
        name: 'Techno & Sampling de Voyage',
        description: "Crée de la musique électronique en voyageant et en enregistrant des sons locaux (trains, voix, instruments traditionnels) pour les intégrer dans des morceaux techno ou ambiants.",
        promptInstruction: "Le prompt doit décrire un morceau de techno mélodique qui incorpore des 'field recordings' et des samples de sons de voyage.",
        lyricInstruction: "Principalement instrumental."
      }
    ]
  },
  {
    name: 'Vitaa',
    genres: 'R&B, Pop, Chanson',
    suggestedStructureValue: 'pop-standard-vcvcbc',
    specialTraits: [
      {
        id: 'rnb-pop-duets',
        name: 'Pop R&B & Duos',
        description: "Une voix R&B sur des productions pop, souvent en duo avec d'autres artistes sur des thèmes de relations.",
        promptInstruction: "Le prompt doit décrire un morceau de pop-R&B avec une voix féminine émotive, potentiellement en duo.",
        lyricInstruction: "Les paroles sont des conversations sur l'amour, souvent sous forme de duo."
      }
    ]
  },
  {
    name: 'Vladimir Cauchemar',
    genres: 'Electronic, Hardcore, Gabber',
    suggestedStructureValue: 'edm-dance-drop',
    specialTraits: [
      {
        id: 'flute-driven-hardcore-beats',
        name: 'Beats Hardcore & Flûte',
        description: "Un son unique qui mélange des beats de hard techno et de gabber avec des mélodies de flûte médiévale.",
        promptInstruction: "Le prompt doit décrire un beat électronique très rapide et agressif (hardcore/gabber) avec une mélodie de flûte inattendue.",
        lyricInstruction: "Souvent instrumental ou avec des featurings de rap."
      }
    ]
  },
  {
    name: 'Werenoi',
    genres: 'French Rap, French Drill',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'narco-drill-masked-persona',
        name: 'Drill "Nوار" & Persona Masquée',
        description: "Un flow de drill sombre et mélodique avec une voix distinctive, et des paroles sur la rue avec une esthétique mystérieuse ('Nwar').",
        promptInstruction: "Le prompt doit décrire un beat de drill mélancolique et sombre, avec une performance de rap masculine charismatique et menaçante.",
        lyricInstruction: "Les paroles doivent être des récits de rue, avec une attitude confiante et un ton sombre."
      }
    ]
  },
  {
    name: 'Worakls',
    genres: 'Electronic, Orchestral, Techno',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'orchestral-techno',
        name: 'Techno Orchestrale',
        description: "Fusionne la techno mélodique avec un orchestre symphonique complet, créant des morceaux électroniques épiques et cinématiques.",
        promptInstruction: "Le prompt doit décrire un morceau de techno mélodique qui incorpore un orchestre à cordes, des cuivres et des bois.",
        lyricInstruction: "Instrumental."
      }
    ]
  },
  {
    name: 'Yseult',
    genres: 'Chanson, Pop, Soul',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'piano-vocal-raw-emotion',
        name: 'Piano-Voix & Émotion Brute',
        description: "Des ballades au piano minimalistes avec une performance vocale extrêmement puissante et brute, pleine d'émotion.",
        promptInstruction: "Le prompt doit décrire une ballade piano-voix avec une performance vocale féminine très puissante et sans fioritures.",
        lyricInstruction: "Les paroles sont des explorations directes et vulnérables de l'amour et de l'acceptation de soi."
      }
    ]
  },
  {
    name: 'Ziak',
    genres: 'French Drill',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'masked-horrorcore-drill',
        name: 'Drill Horrifique & Masquée',
        description: "Un son de drill très sombre et agressif avec des références à l'horreur, et une voix grave et menaçante.",
        promptInstruction: "Le prompt doit décrire un beat de drill sombre avec des samples de films d'horreur et une voix de rap masculine grave et agressive.",
        lyricInstruction: "Les paroles doivent utiliser une imagerie violente et horrifique."
      }
    ]
  },
  {
    name: 'DragonForce',
    genres: 'Power Metal, Speed Metal',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'virtuosic-shred-solos',
        name: 'Solos de Guitare Virtuoses ("Shred")',
        description: "Des solos de guitare extrêmement rapides et techniques, souvent harmonisés, avec des effets sonores rappelant les jeux vidéo.",
        promptInstruction: "Le prompt doit décrire un son de power metal avec des solos de guitare électrique extrêmement rapides et mélodiques ('shredding'), utilisant des techniques comme le 'tapping' et le 'sweep picking', et des effets sonores de style arcade ou jeu vidéo.",
        lyricInstruction: "La chanson doit comporter de longues et multiples sections de solo de guitare. Marque-les avec [epic-guitar-solo]."
      },
      {
        id: 'epic-fantasy-themes',
        name: 'Thèmes de Fantasy Épique',
        description: "Les paroles sont des hymnes épiques sur des batailles, des quêtes héroïques, des dragons et des mondes fantastiques.",
        promptInstruction: "Le prompt doit évoquer une ambiance de fantasy épique, avec des thèmes de bravoure et d'aventure.",
        lyricInstruction: "Les paroles doivent être des récits héroïques sur des guerriers, des dragons, des vallées lointaines et des batailles pour la liberté. Le ton doit être optimiste et hymnique."
      }
    ]
  },
  {
    name: 'Marilyn Manson',
    genres: 'Industrial Metal, Alternative Metal, Shock Rock',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'shock-rock-social-critique',
        name: 'Critique Sociale & Shock Rock',
        description: "Combine des thèmes lyriques provocateurs et anti-establishment avec une esthétique 'shock rock' sombre et théâtrale.",
        promptInstruction: "Le prompt doit décrire un son de metal industriel avec une ambiance sombre et théâtrale. La performance vocale doit être agressive et charismatique, livrant des paroles qui sont une critique acerbe de la société, de la religion ou des médias.",
        lyricInstruction: "Les paroles doivent être une critique provocatrice de la société américaine, de la religion ou de la célébrité, avec un ton cynique et une imagerie sombre et parfois dérangeante."
      },
      {
        id: 'industrial-metal-sound',
        name: 'Son Metal Industriel Abrasif',
        description: "Un son lourd qui fusionne des riffs de guitare metal avec des boucles de batterie électroniques, des synthétiseurs industriels et des textures sonores abrasives.",
        promptInstruction: "Le prompt doit spécifier une production de metal industriel, combinant des guitares lourdes et distordues avec des boîtes à rythmes électroniques, des samples et des textures de synthétiseurs abrasives pour créer une atmosphère froide et mécanique.",
        lyricInstruction: "La structure doit laisser de la place à des interludes instrumentaux avec des textures industrielles. Marque ces passages avec [industrial-breakdown]."
      },
      {
        id: 'raspy-screamed-vocals',
        name: 'Voix Éraillée & Hurlée',
        description: "Utilise une voix distinctive, éraillée et gutturale, qui passe à des cris perçants dans les sections intenses.",
        promptInstruction: "Le prompt doit décrire une performance vocale masculine agressive, éraillée et texturée, avec des cris perçants dans les refrains ou les ponts.",
        lyricInstruction: "La livraison vocale doit être pleine d'agressivité et de texture. Marque les passages hurlés avec [power-scream]."
      }
    ]
  },
  { name: 'Kanye West', genres: 'Hip Hop, Pop', suggestedStructureValue: 'kendrick-hip-hop-epic', specialTraits: [{ id: 'autotune-808', name: 'Style "808s & Heartbreak"', description: "Utilise de l'autotune de manière expressive et émotive sur la voix, avec une production minimaliste.", promptInstruction: "Le prompt doit décrire une production minimaliste centrée sur une boîte à rythmes TR-808 et des nappes de synthé mélancoliques, avec une voix principale traitée à l'autotune de façon proéminente et expressive.", lyricInstruction: "Les paroles doivent explorer des thèmes de perte, de solitude et d'aliénation. Marque la section avec [autotune-vocals]." }] },
  { name: 'Kate Bush', genres: 'Art Pop, Progressive Pop', suggestedStructureValue: 'progressive-interlude-solo', specialTraits: [{ id: 'baroque-theatrical-pop', name: 'Pop Baroque & Théâtrale', description: "Une approche expérimentale de la pop avec des arrangements baroques, des structures non conventionnelles et une performance vocale théâtrale et expressive.", promptInstruction: "Le prompt doit décrire un morceau d'art pop baroque avec des arrangements orchestraux et synthétiques, et une voix féminine expressive et à large tessiture.", lyricInstruction: "Les paroles doivent être poétiques et narratives, souvent basées sur la littérature." }] },
  { name: 'Katy Perry', genres: 'Pop', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'colorful-pop-anthem', name: 'Hymne Pop Coloré', description: "Un refrain pop massif, facile à retenir et euphorique sur une production dance-pop colorée et énergique.", promptInstruction: "Le prompt doit décrire une production dance-pop brillante et énergique, avec un refrain massif et accrocheur.", lyricInstruction: "Les paroles doivent être positives et hymniques sur l'émancipation ou la fête." }] },
  { name: 'Kendrick Lamar', genres: 'Hip Hop, Rap', suggestedStructureValue: 'kendrick-hip-hop-epic', specialTraits: [
      { id: 'storytelling-vocal-persona', name: 'Narration & Personnages Vocaux', description: "Raconte une histoire complexe en changeant de voix ou de ton pour incarner différents personnages.", promptInstruction: "Le prompt doit demander un changement de ton, de hauteur et de cadence dans la voix pour représenter différents personnages ou émotions au sein du même morceau.", lyricInstruction: "Écris une histoire avec des dialogues ou des changements de perspective. Indique les changements de voix avec des tags comme [character-1-voice] et [character-2-voice]." }
  ] },
  { name: 'Kid Cudi', genres: 'Alternative Hip Hop, Psychedelic Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'humming-psychedelic-rap', name: 'Humming & Rap Psychédélique', description: "Incorpore des fredonnements (humming) mélodiques et continus en arrière-plan ou en ad-libs, sur des beats hip-hop atmosphériques et psychédéliques.", promptInstruction: "Le prompt doit décrire un beat hip-hop psychédélique et atmosphérique, avec des fredonnements (hums) mélodiques proéminents en arrière-plan.", lyricInstruction: "Les paroles doivent être introspectives sur la solitude, la dépression et les rêves. Inclus des fredonnements (hums)." }] },
  { name: 'King Crimson', genres: 'Progressive Rock', suggestedStructureValue: 'progressive-interlude-solo', specialTraits: [{ id: 'atonal-progressive-rock', name: 'Rock Progressif Atonal', description: "Utilise des signatures rythmiques complexes, des changements de tempo abrupts et des harmonies dissonantes pour créer un paysage sonore rock expérimental.", promptInstruction: "Le prompt doit décrire un morceau de rock progressif expérimental avec des signatures rythmiques complexes, des changements de tempo, et des guitares et claviers dissonants.", lyricInstruction: "Les paroles doivent être abstraites et intellectuelles." }] },
  { name: 'King Gizzard & The Lizard Wizard', genres: 'Psychedelic Rock, Garage Rock', suggestedStructureValue: 'pink-floyd-psychedelic-suite', specialTraits: [{ id: 'eclectic-psychedelic-garage-rock', name: 'Garage Rock Psychédélique & Éclectique', description: "Un son garage rock psychédélique lo-fi avec des guitares fuzzy, des changements de style rapides et une énergie chaotique.", promptInstruction: "Le prompt doit décrire un morceau de garage rock psychédélique lo-fi avec des guitares fuzz, des changements de genre inattendus et une énergie frénétique.", lyricInstruction: "Les paroles doivent être surréalistes et fantastiques." }] },
  { name: 'Kiss', genres: 'Hard Rock, Glam Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'glam-rock-anthem', name: 'Hymne Glam Rock', description: "Un hymne de hard rock simple et direct avec des riffs de guitare accrocheurs et un refrain facile à chanter.", promptInstruction: "Le prompt doit décrire un morceau de hard rock / glam rock des années 70 avec un refrain hymnique et simple.", lyricInstruction: "Les paroles doivent porter sur des thèmes du rock'n'roll, de la fête et de la séduction." }] },
  { name: 'Kool & The Gang', genres: 'Funk, R&B', suggestedStructureValue: 'funk-jam', specialTraits: [{ id: 'celebratory-funk', name: 'Funk Célébratoire', description: "Un groove funk contagieux avec une section de cuivres puissante, une ligne de basse dansante et des paroles festives.", promptInstruction: "Le prompt doit décrire un morceau de funk des années 70/80 avec une section de cuivres proéminente et une ambiance festive.", lyricInstruction: "Les paroles doivent porter sur la célébration, la danse et la fête." }] },
  { name: 'Kraftwerk', genres: 'Electronic, Krautrock', suggestedStructureValue: 'daft-punk-repetitive', specialTraits: [{ id: 'robotic-vocoder-german', name: 'Vocoder Robotique Allemand', description: "Une esthétique minimaliste et robotique avec des vocodeurs et des paroles en allemand sur des rythmes électroniques.", promptInstruction: "Le prompt doit décrire un morceau électronique minimaliste avec des mélodies de synthétiseur simples, un rythme de boîte à rythmes métronomique, et des voix traitées par vocoder, parlant ou chantant en allemand.", lyricInstruction: "Les paroles doivent être simples, techniques et souvent en allemand. Marque les passages vocoder avec [vocoder-vocals]." }] },
  { name: 'L\'Impératrice', genres: 'Nu-disco, French Pop, Synth-pop', suggestedStructureValue: 'funk-jam', specialTraits: [{ id: 'spacey-funky-nu-disco', name: 'Nu-Disco Spatial & Funky', description: "Un son nu-disco avec une ligne de basse groovy, des synthétiseurs vintage et une ambiance spatiale et dansante.", promptInstruction: "Le prompt doit décrire un morceau de nu-disco français avec une basse funky, des synthétiseurs vintage et une ambiance spatiale.", lyricInstruction: "Les paroles doivent être en français, souvent poétiques et rêveuses." }] },
  { name: 'Lady Gaga', genres: 'Pop, Dance, Electronic', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'theatrical-pop-performance', name: 'Performance Pop Théâtrale', description: "Une approche avant-gardiste de la pop, avec des changements de style audacieux et une performance vocale puissante et théâtrale.", promptInstruction: "Le prompt doit décrire un morceau de dance-pop avec une production audacieuse et expérimentale, et une performance vocale féminine puissante et pleine de personnalité, qui passe du chant à des interjections parlées.", lyricInstruction: "Les paroles doivent être audacieuses, sur des thèmes d'identité, de célébrité ou d'émancipation. La livraison doit être dramatique." }] },
  { name: 'Lana Del Rey', genres: 'Alternative, Dream Pop', suggestedStructureValue: 'ballad-instrumental-bridge', specialTraits: [{ id: 'cinematic-vocals', name: 'Ambiance Cinématographique', description: "Crée une atmosphère mélancolique et cinématographique, avec des paroles nostalgiques.", promptInstruction: "Le prompt doit décrire une production luxuriante, orchestrale et rêveuse (dream pop), avec une voix féminine éthérée et mélancolique, évoquant la nostalgie et le glamour hollywoodien.", lyricInstruction: "Les paroles doivent être très imagées, avec des références à la culture américaine, l'amour tragique et la nostalgie." }] },
  { name: 'Laurent Garnier', genres: 'Techno, House', suggestedStructureValue: 'edm-dance-drop', specialTraits: [{ id: 'epic-techno-journey', name: 'Voyage Techno Épique', description: "Crée un long morceau de techno qui évolue progressivement, avec des couches qui s'ajoutent et se retirent pour créer un voyage sonore.", promptInstruction: "Le prompt doit décrire un morceau de techno long et évolutif avec des éléments de house et des influences jazz, construisant une tension sur plusieurs minutes.", lyricInstruction: "" }] },
  { name: 'Lauryn Hill', genres: 'Neo Soul, Hip Hop, R&B', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'rap-neo-soul-fusion', name: 'Fusion Rap & Neo-Soul', description: "Alterne de manière fluide entre un rap technique et un chant neo-soul puissant et plein d'âme.", promptInstruction: "Le prompt doit décrire un beat hip-hop/neo-soul des années 90, avec une alternance entre rap technique et chant soulful puissant.", lyricInstruction: "Les paroles doivent être conscientes sur l'amour, la spiritualité et les questions sociales." }] },
  { name: 'Laylow', genres: 'French Rap, Cloud Rap, Experimental Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'cinematic-futuristic-rap', name: 'Rap Cinématographique & Futuriste', description: "Une production de rap expérimentale et cinématographique avec des thèmes de science-fiction et une utilisation créative de l'autotune.", promptInstruction: "Le prompt doit décrire un morceau de rap français expérimental et cinématographique avec des thèmes futuristes, une production digitale et une utilisation créative de l'autotune.", lyricInstruction: "Les paroles doivent raconter une histoire complexe se déroulant dans un univers de science-fiction." }] },
  { name: 'LCD Soundsystem', genres: 'Dance-Punk, Electronic', suggestedStructureValue: 'daft-punk-repetitive', specialTraits: [{ id: 'repetitive-dance-punk', name: 'Dance-Punk Répétitif', description: "Un groove dance-punk hypnotique et répétitif, construit autour d'une ligne de basse et de percussions, avec un chant parlé-chanté.", promptInstruction: "Le prompt doit décrire un morceau de dance-punk avec une ligne de basse répétitive, des percussions (clochettes) et un chant parlé-chanté cynique.", lyricInstruction: "Les paroles doivent être des observations pleines d'esprit et souvent auto-dérisoires sur la culture et la musique." }] },
  { name: 'Led Zeppelin', genres: 'Hard Rock, Blues Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'blues-rock-wail', name: 'Gémissement Blues-Rock', description: "Une voix masculine aiguë et puissante, capable de gémissements (wails) perçants, inspirés du blues.", promptInstruction: "Le prompt doit décrire un morceau de hard rock basé sur le blues avec des riffs de guitare lourds et une performance vocale masculine aiguë et puissante, utilisant des gémissements et des cris expressifs.", lyricInstruction: "La performance vocale doit être brute et pleine de passion. Marque les passages vocaux les plus hauts et les plus intenses avec [power-wail]." }] },
  { name: 'Leonard Cohen', genres: 'Folk, Soft Rock', suggestedStructureValue: 'folk-storytelling', specialTraits: [{ id: 'folk-poetry-baritone-voice', name: 'Poésie Folk & Voix de Baryton', description: "Une voix de baryton profonde, grave et narrative, livrant des paroles poétiques et sombres sur un arrangement folk minimaliste.", promptInstruction: "Le prompt doit décrire un morceau de folk minimaliste avec une voix masculine de baryton profonde et narrative.", lyricInstruction: "Les paroles doivent être littéraires sur l'amour, la spiritualité, la dépression et la mort." }] },
  { name: 'Lil Baby', genres: 'Hip Hop, Trap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'melodic-trap-flow', name: 'Flow Trap Mélodique', description: "Un flow de rap mélodique et sans effort, souvent traité à l'autotune, sur des beats trap modernes.", promptInstruction: "Le prompt doit décrire un beat trap moderne, avec un flow de rap mélodique et auto-tuné.", lyricInstruction: "Les paroles doivent porter sur des thèmes du succès, de la richesse et de la vie de rue." }] },
  { name: 'Lil Dicky', genres: 'Comedy Hip Hop, Pop Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'comedic-narrative-rap', name: 'Rap Comique & Narratif', description: "Un flow de rap clair qui raconte des histoires humoristiques et relatables avec des jeux de mots intelligents.", promptInstruction: "Le prompt doit décrire un beat pop-rap, avec un flow de rap clair et narratif.", lyricInstruction: "Les paroles doivent raconter une histoire humoristique et détaillée avec une fin inattendue." }] },
  { name: 'Lil Durk', genres: 'Hip Hop, Drill, Trap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'melodic-drill-pain-vocals', name: 'Drill Mélodique & Voix "Pain"', description: "Un chant auto-tuné et mélodique qui transmet une sensation de douleur et de mélancolie, sur des beats de drill.", promptInstruction: "Le prompt doit décrire un beat de drill mélancolique, avec une voix masculine auto-tunée et émotive.", lyricInstruction: "Les paroles doivent porter sur la violence de la rue, la perte et la survie." }] },
  { name: 'Lil\' Kim', genres: 'Hip Hop, Hardcore Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'provocative-hardcore-flow', name: 'Flow Provocateur & Hardcore', description: "Une livraison de rap féminin agressive et confiante avec des paroles explicites et provocatrices sur la sexualité et le pouvoir.", promptInstruction: "Le prompt doit décrire un beat de hardcore hip-hop des années 90, avec un flow féminin agressif et confiant.", lyricInstruction: "Les paroles doivent être audacieuses et sans concession." }] },
  { name: 'Lil Jon', genres: 'Crunk, Southern Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'energetic-crunk-adlibs', name: 'Ad-libs Crunk Énergiques', description: "Utilise des ad-libs et des phrases courtes criées de manière énergique (\"Yeah!\", \"What?!\", \"Okay!\").", promptInstruction: "Le prompt doit décrire un beat crunk du sud, avec des ad-libs criés et énergiques.", lyricInstruction: "Intègre des ad-libs criés comme (Yeah!), (What!), (Okay!)." }] },
  { name: 'Lil Mosey', genres: 'Hip Hop, Trap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'bouncy-melodic-trap', name: 'Trap "Bouncy" & Mélodique', description: "Un flow de rap très mélodique et entraînant (\"bouncy\") sur des beats trap légers et ensoleillés.", promptInstruction: "Le prompt doit décrire un beat trap léger et mélodique, avec un flow de rap entraînant et accrocheur.", lyricInstruction: "Les paroles doivent être simples sur la fête, les voitures et les filles." }] },
  { name: 'Lil Nas X', genres: 'Pop Rap, Country Rap, Hip Hop', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'genre-fusion-viral-hooks', name: 'Fusion de Genres & Accroches Virales', description: "Mélange des genres inattendus (comme le country et le rap) avec des refrains extrêmement accrocheurs conçus pour devenir viraux.", promptInstruction: "Le prompt doit décrire une fusion de pop, rap, et d'un autre genre inattendu, avec un refrain très accrocheur.", lyricInstruction: "Les paroles doivent être pleines d'esprit, souvent avec des thèmes de culture internet." }] },
  { name: 'Lil Peep', genres: 'Emo Rap, Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'emo-rap-fusion', name: 'Fusion Emo-Rap', description: "Combine des mélodies de rap auto-tunées avec des samples de guitare emo/pop-punk.", promptInstruction: "Le prompt doit décrire un beat emo-rap avec des samples de guitare, et une voix masculine auto-tunée et mélancolique.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la dépression, du chagrin d'amour et de la drogue." }] },
  { name: 'Lil Pump', genres: 'Hip Hop, Trap, SoundCloud Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'repetitive-energetic-trap', name: 'Trap Répétitif & Énergique', description: "Un flow de rap très énergique et simple, avec des refrains répétitifs et des ad-libs (\"Esketit!\").", promptInstruction: "Le prompt doit décrire un beat trap lourd et distordu, avec un flow de rap énergique et répétitif.", lyricInstruction: "Intègre des ad-libs comme (Esketit!)." }] },
  { name: 'Lil Scrappy', genres: 'Crunk, Southern Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'aggressive-crunk-flow', name: 'Flow Crunk Agressif', description: "Une livraison de rap agressive et énergique sur des beats crunk lourds.", promptInstruction: "Le prompt doit décrire un beat crunk, avec un flow de rap masculin agressif.", lyricInstruction: "Les paroles doivent porter sur la confrontation et la vie de rue." }] },
  { name: 'Lil Skies', genres: 'SoundCloud Rap, Emo Rap, Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'melodic-emo-rap-flow', name: 'Flow Emo-Rap Mélodique', description: "Un flow de rap mélodique et chanté sur des beats trap atmosphériques.", promptInstruction: "Le prompt doit décrire un beat trap atmosphérique, avec un flow de rap mélodique et chanté.", lyricInstruction: "Les paroles doivent porter sur des thèmes des relations et des luttes personnelles." }] },
  { name: 'Lil Tecca', genres: 'Melodic Rap, Trap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'melodic-bouncy-rap', name: 'Rap Mélodique & "Bouncy"', description: "Un flow de rap très mélodique et entraînant sur des beats trap ludiques et optimistes.", promptInstruction: "Le prompt doit décrire un beat trap ludique et mélodique, avec un flow de rap très accrocheur.", lyricInstruction: "Les paroles doivent porter sur le succès et le style de vie." }] },
  { name: 'Lil Tjay', genres: 'Hip Hop, Trap, Drill', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'melodic-drill-samples', name: 'Drill Mélodique & Samples', description: "Un chant auto-tuné et mélodique sur des beats de drill, souvent en utilisant des samples de chansons R&B ou pop.", promptInstruction: "Le prompt doit décrire un beat de drill avec un sample R&B, et une voix masculine auto-tunée et mélodique.", lyricInstruction: "Les paroles doivent porter sur le chagrin d'amour et la vie de rue." }] },
  { name: 'Lil Uzi Vert', genres: 'Hip Hop, Trap, Emo Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'fast-flow-eccentric-adlibs', name: 'Flow Rapide & Ad-libs Excentriques', description: "Un flow de rap rapide et mélodique avec des ad-libs énergiques et uniques (\"Yeah!\").", promptInstruction: "Le prompt doit décrire un beat trap psychédélique, avec un flow de rap rapide et mélodique, et des ad-libs fréquents.", lyricInstruction: "Intègre des ad-libs comme (Yeah!)." }] },
  { name: 'Lil Wayne', genres: 'Hip Hop, Trap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'punchlines-raspy-voice', name: 'Punchlines & Voix Éraillée', description: "Utilise une voix éraillée unique et un flow plein de punchlines, de métaphores et de jeux de mots intelligents.", promptInstruction: "Le prompt doit décrire un beat hip-hop varié, avec une voix masculine éraillée, et des paroles pleines de punchlines.", lyricInstruction: "Concentre-toi sur des métaphores créatives et des jeux de mots." }] },
  { name: 'Lil Yachty', genres: 'Hip Hop, Trap, Mumble Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'bubblegum-trap-positive', name: 'Trap "Bubblegum" & Positif', description: "Un son trap léger et optimiste avec des mélodies enfantines et une livraison de rap joyeuse.", promptInstruction: "Le prompt doit décrire un beat \"bubblegum trap\" avec des mélodies de synthé ludiques, et un flow de rap positif et enjoué.", lyricInstruction: "Les paroles doivent être légères et positives." }] },
  { name: 'Linkin Park', genres: 'Alternative Rock, Nu Metal', suggestedStructureValue: 'metal-breakdown-solo', specialTraits: [{ id: 'rap-scream-duo', name: "Duo Rap / Chant Hurlé", description: "Alternez entre des couplets rappés et des refrains chantés/hurlés très émotifs.", promptInstruction: "Le prompt doit décrire une dynamique vocale contrastée : des couplets de rap clairs et rythmés (style Mike Shinoda) et des refrains puissants, alternant chant mélodique et cris (scream) intenses (style Chester Bennington).", lyricInstruction: "Structure la chanson avec des couplets clairement rappés et des refrains chantés. Marque les couplets avec [rap-verse] et les sections hurlées avec [scream-vocals]." }] },
  { name: 'LL Cool J', genres: 'East Coast Hip Hop, Pop Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'hard-soft-alternation', name: 'Alternance Hard/Soft', description: "La capacité d'alterner entre des morceaux de rap agressifs et des ballades R&B douces.", promptInstruction: "Le prompt doit décrire un beat hip-hop varié, soit agressif soit doux.", lyricInstruction: "Les paroles doivent être soit des paroles de rap confiantes, soit une ballade romantique." }] },
  { name: 'Logic', genres: 'Hip Hop, Conscious Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'technical-positive-flow', name: 'Flow Technique & Positif', description: "Un flow de rap très rapide et technique livrant des messages positifs sur la paix, l'amour et la positivité.", promptInstruction: "Le prompt doit décrire un beat hip-hop boom-bap ou trap, avec un flow de rap très rapide et technique.", lyricInstruction: "Les paroles doivent être positives et inspirantes." }] },
  { name: 'Lomepal', genres: 'French Rap, Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'melancholic-rap-singing', name: 'Rap/Chant Mélancolique', description: "Une voix qui oscille entre le rap et le chant, sur un beat lo-fi et introspectif.", promptInstruction: "Le prompt doit décrire un morceau de rap français avec un beat lo-fi et mélancolique, où la performance vocale brouille la ligne entre le rap et le chant, avec des paroles introspectives et personnelles sur l'amour et l'angoisse.", lyricInstruction: "Les paroles doivent être personnelles et introspectives, avec un ton mélancolique." }] },
  { name: 'Louane', genres: 'Pop, Chanson', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'sweet-emotive-pop-vocals', name: 'Voix Pop Douce & Émotive', description: "Une voix féminine douce, claire et légèrement fragile, livrant des mélodies pop émouvantes.", promptInstruction: "Le prompt doit décrire une ballade pop au piano, avec une voix féminine douce et émotive.", lyricInstruction: "Les paroles doivent porter sur des thèmes de l'amour, de la jeunesse et de la sensibilité." }] },
  { name: 'Louise Attaque', genres: 'Folk Rock, Chanson', suggestedStructureValue: 'folk-storytelling', specialTraits: [{ id: 'energetic-violin-folk-rock', name: 'Folk Rock & Violon Énergique', description: "Un son folk rock mené par un violon énergique et un chant masculin rapide et parlé.", promptInstruction: "Le prompt doit décrire un morceau de folk rock français avec un violon proéminent, et un chant masculin rapide et rythmé.", lyricInstruction: "Les paroles doivent être poétiques et surréalistes." }] },
  { name: 'Ludacris', genres: 'Southern Hip Hop, Pop Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'energetic-humorous-flow', name: 'Flow Énergique & Humoristique', description: "Un flow de rap charismatique, énergique et souvent humoristique avec une livraison percutante.", promptInstruction: "Le prompt doit décrire un beat de southern hip-hop, avec un flow de rap charismatique et humoristique.", lyricInstruction: "Les paroles doivent être pleines d'esprit avec des punchlines comiques." }] },
  { name: 'Lupe Fiasco', genres: 'Alternative Hip Hop, Conscious Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'conscious-literate-rap', name: 'Rap Conscient & Lettré', description: "Un flow de rap technique livrant des histoires complexes et des commentaires sociaux avec un vocabulaire riche.", promptInstruction: "Le prompt doit décrire un beat hip-hop jazz ou soul, avec un flow de rap technique et lyrique.", lyricInstruction: "Les paroles doivent être très denses avec des concepts complexes et des métaphores étendues." }] },
  { name: 'M83', genres: 'Electronic, Dream Pop, Shoegaze', suggestedStructureValue: 'post-rock-ambient', specialTraits: [{ id: 'epic-synthwave-nostalgia', name: 'Synthwave Épique & Nostalgique', description: "Un son cinématique et grandiose avec des synthés planants et une réverbération massive.", promptInstruction: "Le prompt doit décrire un morceau de synthwave grandiose et cinématique avec des synthétiseurs planants, une réverbération énorme, un rythme entraînant, et des voix éthérées, souvent sans paroles, évoquant un sentiment de nostalgie des années 80 et de rêves de jeunesse.", lyricInstruction: "" }] },
  { name: 'Mac Miller', genres: 'Hip Hop, Jazz Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'jazzy-introspective-rap', name: 'Rap Jazzy & Introspectif', description: "Un flow de rap décontracté et introspectif sur des productions jazzy et soulful.", promptInstruction: "Le prompt doit décrire un beat de jazz-rap avec des samples de piano, et un flow de rap décontracté et introspectif.", lyricInstruction: "Les paroles doivent porter sur la dépression, la dépendance et la croissance personnelle." }] },
  { name: 'Madonna', genres: 'Pop, Dance, Electronic', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'dance-pop-evolution', name: 'Évolution Dance-Pop', description: "Incarne l'évolution de la dance-pop, des sons des années 80 aux productions électroniques modernes.", promptInstruction: "Le prompt doit décrire un morceau de dance-pop avec une production audacieuse et un sens de la mélodie accrocheur, pouvant aller de la synth-pop des années 80 à la house ou à l'électro.", lyricInstruction: "Les paroles doivent être confiantes, provocantes ou sur le thème de la danse et de la liberté." }] },
  { name: 'Manu Chao', genres: 'Latin Alternative, Folk, Reggae', suggestedStructureValue: 'folk-storytelling', specialTraits: [{ id: 'multilingual-protest-folk', name: 'Folk Engagé & Multilingue', description: "Un style de folk-reggae festif et engagé, avec des paroles qui mélangent le français, l'espagnol et l'anglais.", promptInstruction: "Le prompt doit décrire un morceau de folk alternatif avec des rythmes latins ou reggae, et des paroles chantées en plusieurs langues.", lyricInstruction: "Mélange des paroles en français, espagnol et anglais sur des thèmes sociaux et politiques." }] },
  { name: 'Mariah Carey', genres: 'R&B, Pop, Soul', suggestedStructureValue: 'ballad-instrumental-bridge', specialTraits: [{ id: 'whistle-register', name: 'Registre de Sifflet (Whistle Register)', description: "Incorpore des notes extrêmement aiguës dans le registre de sifflet.", promptInstruction: "Le prompt doit décrire une ballade R&B, avec une voix féminine à très large tessiture, utilisant le registre de sifflet.", lyricInstruction: "Incorpore une note extrêmement aiguë. Marque-la avec [whistle-note]." }] },
  { name: 'Marvin Gaye', genres: 'Soul, R&B', suggestedStructureValue: 'funk-jam', specialTraits: [{ id: 'conscious-smooth-soul', name: 'Soul Consciente & Douce', description: "Une performance vocale masculine douce et pleine d'âme livrant des paroles de commentaire social sur une production soul luxuriante.", promptInstruction: "Le prompt doit décrire un morceau de soul des années 70 avec des cordes et des congas, et une voix masculine douce et émotive.", lyricInstruction: "Les paroles doivent porter sur la guerre, la pauvreté et les questions sociales." }] },
  { name: 'Massive Attack', genres: 'Trip Hop, Electronic', suggestedStructureValue: 'post-rock-ambient', specialTraits: [{ id: 'dark-trip-hop-atmosphere', name: 'Atmosphère Trip-Hop Sombre', description: "Un son trip-hop sombre, lent et atmosphérique avec des breakbeats, des lignes de basse profondes et des voix invitées éthérées.", promptInstruction: "Le prompt doit décrire un morceau de trip-hop sombre et atmosphérique avec un breakbeat lent, des basses profondes et des voix invitées éthérées.", lyricInstruction: "Les paroles doivent être abstraites et mélancoliques." }] },
  { name: 'MC Solaar', genres: 'French Hip Hop, Jazz Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'jazz-rap-poetry', name: 'Poésie Jazz Rap', description: "Un flow de rap poétique et lettré sur des beats de jazz-rap sophistiqués.", promptInstruction: "Le prompt doit décrire un beat de jazz-rap français, avec un flow de rap poétique et complexe.", lyricInstruction: "Les paroles doivent être très écrites avec des jeux de mots et des allitérations." }] },
  { name: 'Megadeth', genres: 'Thrash Metal', suggestedStructureValue: 'metal-breakdown-solo', specialTraits: [{ id: 'technical-political-thrash-metal', name: 'Thrash Metal Technique & Politique', description: "Un thrash metal rapide et technique avec des riffs de guitare complexes et des paroles cyniques sur la politique et la guerre.", promptInstruction: "Le prompt doit décrire un morceau de thrash metal technique avec des riffs de guitare complexes, et une voix masculine nasillarde et agressive.", lyricInstruction: "Les paroles doivent porter sur la politique, la guerre et la conspiration." }] },
  { name: 'MF DOOM', genres: 'Underground Hip Hop, Abstract Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'supervillain-flow-complex-rhymes', name: 'Flow de "Super-vilain" & Rimes Complexes', description: "Un flow de rap décontracté et complexe, avec une voix grave et une persona de super-vilain.", promptInstruction: "Le prompt doit décrire un beat hip-hop underground avec des samples obscurs, et un flow de rap complexe avec une voix grave.", lyricInstruction: "Les paroles doivent utiliser des rimes multi-syllabiques et des références à la culture pop." }] },
  { name: 'Michael Jackson', genres: 'Pop, R&B, Rock, Dance', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'vocal-adlibs', name: 'MJ Ad-libs', description: 'Ajoute des ad-libs vocaux caractéristiques (hee-hee, etc.).', promptInstruction: "Le prompt doit spécifier l'inclusion d'ad-libs vocaux iconiques comme des 'hee-hee', 'shamone', 'oow!', ainsi que des hoquets vocaux et une performance vocale très expressive et percussive.", lyricInstruction: "Intègre des ad-libs vocaux caractéristiques directement dans les paroles, entre les lignes ou à la fin des phrases, en utilisant des parenthèses, par exemple : (Hee-hee!), (Oww!), (Shamone!)." }] },
  { name: 'Michel Berger', genres: 'Chanson, Pop, Rock', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'piano-pop-chanson', name: 'Chanson Pop au Piano', description: "Des mélodies de piano accrocheuses et des arrangements pop sophistiqués, typiques de la chanson française des années 80.", promptInstruction: "Le prompt doit décrire un morceau de pop française mené par le piano, avec des mélodies claires et une production soignée.", lyricInstruction: "Les paroles doivent être poétiques et souvent mélancoliques, sur des thèmes d'amour." }] },
  { name: 'Migos', genres: 'Hip Hop, Trap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'triplet-flow-migos-flow', name: 'Flow en Triolets (Migos Flow)', description: "Un flow de rap en triolets distinctif, où les rappeurs s'échangent les lignes avec des ad-libs.", promptInstruction: "Le prompt doit décrire un beat trap moderne, avec un flow de rap en triolets.", lyricInstruction: "Les paroles doivent utiliser un flow en triolets et des ad-libs." }] },
  { name: 'Missy Elliott', genres: 'Hip Hop, R&B, Dance', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'quirky-hip-hop-adlibs', name: 'Ad-libs Hip-Hop Excentriques', description: "Un flow créatif avec des ad-libs et des effets sonores uniques et excentriques.", promptInstruction: "Le prompt doit décrire un beat hip-hop innovant et futuriste avec une performance vocale pleine de personnalité, utilisant des ad-libs inhabituels (comme des bruits d'animaux ou des sons de dessins animés) et des effets vocaux.", lyricInstruction: "Inclus des ad-libs créatifs et inattendus entre les lignes. Par exemple : (Hoo!), (Brrrr!), (Beep beep!)." }] },
  { name: 'Moby', genres: 'Electronic, Downtempo', suggestedStructureValue: 'edm-dance-drop', specialTraits: [{ id: 'electronic-soul-vocal-samples', name: 'Électro & Samples Vocaux Soul', description: "Combine des rythmes électroniques downtempo avec des samples de voix soul, blues ou gospel.", promptInstruction: "Le prompt doit décrire un morceau de downtempo électronique avec des samples de voix gospel ou blues, et une mélodie de piano mélancolique.", lyricInstruction: "La chanson doit être construite autour de samples vocaux qui servent de refrain ou de mélodie principale." }] },
  { name: 'Mos Def (Yasiin Bey)', genres: 'Conscious Hip Hop, Alternative Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'conscious-eclectic-rap', name: 'Rap Conscient & Éclectique', description: "Un flow de rap versatile sur une variété de productions, livrant des paroles socialement et politiquement conscientes.", promptInstruction: "Le prompt doit décrire un beat hip-hop éclectique (soul, jazz, rock), avec un flow de rap conscient.", lyricInstruction: "Les paroles doivent porter sur des thèmes de politique, de société et d'identité." }] },
  { name: 'Mötley Crüe', genres: 'Glam Metal, Hard Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'hedonistic-glam-metal-anthem', name: 'Hymne Glam Metal Hédoniste', description: "Un hymne de glam metal avec des riffs de guitare accrocheurs et des paroles sur la fête, le sexe et les drogues.", promptInstruction: "Le prompt doit décrire un morceau de glam metal des années 80 avec un refrain hymnique.", lyricInstruction: "Les paroles doivent porter sur des thèmes hédonistes." }] },
  { name: 'Muse', genres: 'Alternative Rock, Space Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'operatic-rock-falsetto', name: 'Rock Opératique & Fausset', description: "Un rock dramatique avec des lignes de basse lourdes, du piano classique et un fausset puissant.", promptInstruction: "Le prompt doit décrire un hymne de space rock avec une structure dramatique et opératique, mettant en vedette des lignes de basse lourdes et distordues, des arpèges de piano classique, et une performance vocale masculine avec un fausset proéminent et puissant.", lyricInstruction: "Utilise des thèmes dramatiques, souvent conspirationnistes ou de science-fiction. Le refrain doit être chanté dans un fausset aigu. Marque ces sections avec [high-falsetto]." }] },
  { name: 'My Bloody Valentine', genres: 'Shoegaze, Noise Pop', suggestedStructureValue: 'post-rock-ambient', specialTraits: [{ id: 'shoegaze-guitar-wall', name: 'Mur de Guitares Shoegaze', description: "Un son shoegaze avec des couches de guitares distordues et traitées avec des effets (reverb, tremolo) qui créent un \"mur de son\", et des voix éthérées noyées dans le mix.", promptInstruction: "Le prompt doit décrire un morceau de shoegaze avec un mur de guitares distordues et des voix éthérées.", lyricInstruction: "Les paroles doivent être indistinctes et abstraites." }] },
  { name: 'Mylène Farmer', genres: 'Pop, Synth-pop, French Variety', suggestedStructureValue: 'pop-full-prechorus', specialTraits: [{ id: 'gothic-theatrical-pop', name: 'Pop Gothique & Théâtrale', description: "Une production pop ou synth-pop avec une ambiance sombre et mélancolique et des paroles poétiques sur des thèmes comme la mort, l'amour et la religion.", promptInstruction: "Le prompt doit décrire un morceau de synth-pop gothique, avec une voix féminine douce et murmurée.", lyricInstruction: "Les paroles doivent être poétiques et sombres." }] },
  { name: 'N.W.A.', genres: 'Gangsta Rap, West Coast Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'brutal-reality-rap', name: 'Rap de Réalité Brutale', description: "Un son gangsta rap brut et agressif qui dépeint la réalité de la vie de rue avec des paroles politiques et sans concession.", promptInstruction: "Le prompt doit décrire un beat de gangsta rap West Coast, avec un flow de rap agressif et direct.", lyricInstruction: "Les paroles doivent porter sur la violence policière et la vie de gang." }] },
  { name: 'Nas', genres: 'Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'narrative-literate-rap', name: 'Rap Narratif & Lettré', description: "Un flow de rap très lyrique et technique qui raconte des histoires détaillées de la vie dans le Queensbridge.", promptInstruction: "Le prompt doit décrire un beat hip-hop boom-bap de la côte Est, avec un flow de rap narratif et lettré.", lyricInstruction: "Les paroles doivent raconter des histoires complexes avec un vocabulaire riche." }] },
  { name: 'Nekfeu', genres: 'French Rap, Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'technical-flow-wordplay', name: 'Flow Technique & Jeux de Mots', description: "Un flow de rap très rapide et technique, plein de jeux de mots, de rimes multi-syllabiques et de références littéraires.", promptInstruction: "Le prompt doit décrire un beat de rap français moderne, avec un flow de rap très technique et rapide.", lyricInstruction: "Les paroles doivent être denses et pleines de jeux de mots." }] },
  { name: 'New Order', genres: 'Post-Punk, New Wave, Synth-pop', suggestedStructureValue: 'pop-full-prechorus', specialTraits: [{ id: 'melodic-bassline-synth-pop', name: 'Basse Mélodique & Synth-Pop', description: "Un son post-punk ou synth-pop mené par une ligne de basse mélodique et aiguë, avec des synthétiseurs.", promptInstruction: "Le prompt doit décrire un morceau de synth-pop avec une ligne de basse mélodique proéminente.", lyricInstruction: "Les paroles doivent être mélancoliques." }] },
  { name: 'Nick Drake', genres: 'Folk', suggestedStructureValue: 'folk-storytelling', specialTraits: [{ id: 'melancholic-fingerpicking-folk', name: 'Folk Mélancolique & Fingerpicking', description: "Une chanson folk acoustique et intime avec un jeu de guitare en finger-picking complexe et une voix douce et mélancolique.", promptInstruction: "Le prompt doit décrire un morceau de folk acoustique avec une guitare en finger-picking complexe, et une voix masculine douce et mélancolique.", lyricInstruction: "Les paroles doivent être poétiques et introspectives." }] },
  { name: 'Nina Simone', genres: 'Jazz, Blues, Soul', suggestedStructureValue: 'aaba-classic', specialTraits: [{ id: 'emotive-contralto-vocals', name: 'Voix Contralto Émotive', description: "Une performance vocale de contralto puissante, brute et pleine d'émotion, avec une grande expressivité.", promptInstruction: "Le prompt doit décrire un morceau de piano jazz ou blues, avec une voix féminine de contralto puissante et émotive.", lyricInstruction: "Les paroles doivent porter sur les droits civiques, l'amour et la douleur." }] },
  { name: 'Nine Inch Nails', genres: 'Industrial Rock', suggestedStructureValue: 'metal-breakdown-solo', specialTraits: [{ id: 'abrasive-industrial-rock', name: 'Rock Industriel Abrasif', description: "Un son rock industriel qui combine des textures électroniques distordues, des guitares abrasives et des thèmes sombres.", promptInstruction: "Le prompt doit décrire un morceau de rock industriel avec des sons électroniques distordus, des guitares abrasives, et une voix qui alterne entre agressivité et chuchotements.", lyricInstruction: "Les paroles doivent porter sur la colère, l'aliénation et la société." }] },
  { name: 'Ninho', genres: 'French Rap, Trap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'melodic-trap-rap', name: 'Rap Trap Mélodique', description: "Un flow de rap très mélodique et auto-tuné sur des productions trap.", promptInstruction: "Le prompt doit décrire un beat de trap mélodique, avec une voix masculine auto-tunée et mélodique.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la rue, du succès et des relations." }] },
  { name: 'Nirvana', genres: 'Grunge, Alternative Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'quiet-loud-dynamics', name: 'Dynamique Calme/Fort (Quiet/Loud)', description: "La chanson alterne entre des couplets calmes et minimalistes et des refrains explosifs, bruyants et distordus.", promptInstruction: "Le prompt doit décrire un morceau de grunge avec une alternance entre couplets calmes et refrains bruyants, et une voix éraillée et criée.", lyricInstruction: "Les paroles doivent être abstraites et angoissées." }] },
  { name: 'Niska', genres: 'French Rap, Trap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'dancing-trap-adlibs', name: 'Trap Dansant & Ad-libs', description: "Un style de rap trap très énergique et dansant avec des ad-libs et des gimmick vocaux.", promptInstruction: "Le prompt doit décrire un beat de trap dansant, avec un flow de rap énergique et des ad-libs.", lyricInstruction: "Intègre des ad-libs comme \"Charo\"." }] },
  { name: 'Noir Désir', genres: 'Alternative Rock, Post-Punk', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'noir-desir-raw-vocals', name: 'Voix Rock Écorchée', description: 'Utilise une voix rock intense et écorchée, alternant entre le chant et des passages parlés ou criés.', promptInstruction: 'Le prompt doit décrire une performance vocale masculine brute, pleine de tension, avec une texture éraillée. Le style doit être du rock alternatif puissant avec des guitares saturées et une section rythmique tendue.', lyricInstruction: 'Les paroles doivent être poétiques, sombres et engagées. La livraison doit être intense et habitée. Marque les passages criés ou particulièrement intenses avec le tag [raw-vocals].' }] },
  { name: 'Notorious B.I.G.', genres: 'Hip Hop, Gangsta Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'smooth-storytelling-flow', name: 'Flow Narratif & Fluide', description: "Un flow de rap décontracté, fluide et charismatique qui raconte des histoires vivides de la vie de rue.", promptInstruction: "Le prompt doit décrire un beat hip-hop de la côte Est des années 90, avec un flow de rap masculin décontracté, fluide et narratif.", lyricInstruction: "Les paroles doivent raconter une histoire détaillée avec un ton confiant." }] },
  { name: 'Oasis', genres: 'Britpop, Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'britpop-anthem', name: 'Hymne Britpop', description: "Un hymne rock avec des guitares massives et un refrain facile à chanter, livré avec une voix masculine nasillarde et confiante.", promptInstruction: "Le prompt doit décrire un hymne britpop des années 90 avec un mur de guitares, et une voix masculine nasillarde.", lyricInstruction: "Les paroles doivent être simples et optimistes." }] },
  { name: 'Olivia Rodrigo', genres: 'Pop, Pop Rock, Alternative Pop', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'narrative-angsty-pop-rock', name: 'Pop-Rock Narratif & Angoissé', description: "Une chanson pop-rock qui raconte une histoire détaillée de chagrin d'amour, passant de la vulnérabilité à la colère.", promptInstruction: "Le prompt doit décrire une ballade au piano qui évolue vers du pop-punk, avec une voix féminine émotionnelle.", lyricInstruction: "Les paroles doivent raconter une histoire détaillée de rupture." }] },
  { name: 'Orelsan', genres: 'French Rap, Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'conversational-cynical-rap', name: 'Rap Conversationnel & Cynique', description: "Un flow parlé, décontracté, qui livre des observations cyniques sur le quotidien.", promptInstruction: "Le prompt doit décrire un morceau de rap français avec un beat moderne, souvent minimaliste, et un flow conversationnel, presque parlé, livrant des observations cyniques et relatables sur la vie quotidienne.", lyricInstruction: "Utilise un langage de tous les jours et raconte des histoires relatables avec une touche cynique et humoristique." }] },,
  { name: 'OutKast', genres: 'Hip Hop, Funk', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'eclectic-hip-hop-fusion', name: 'Fusion Hip-Hop Éclectique', description: "Un son hip-hop expérimental qui fusionne des éléments de funk, de soul, de psychédélisme et d'électro.", promptInstruction: "Le prompt doit décrire un morceau de hip-hop éclectique du sud, avec une fusion de genres, un flow rapide et excentrique et un flow plus direct.", lyricInstruction: "Les paroles doivent être créatives et alterner entre deux styles de rappeurs." }] },
  { name: 'Pantera', genres: 'Groove Metal, Thrash Metal', suggestedStructureValue: 'metal-breakdown-solo', specialTraits: [{ id: 'powerful-groove-metal', name: 'Groove Metal Puissant', description: "Un son metal lourd mené par des riffs de guitare percutants et \"groovy\", avec une voix agressive et puissante.", promptInstruction: "Le prompt doit décrire un morceau de groove metal avec des riffs de guitare lourds et percutants, et une voix agressive.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la colère et de la confrontation." }] },
  { name: 'Paradis', genres: 'French House, Synth-pop', suggestedStructureValue: 'edm-dance-drop', specialTraits: [{ id: 'melancholic-french-house', name: 'House Française Mélancolique', description: "Un son house ou synth-pop avec une voix masculine douce et mélancolique chantant des paroles poétiques en français.", promptInstruction: "Le prompt doit décrire un morceau de french house mélancolique, avec une voix masculine douce en français.", lyricInstruction: "Les paroles doivent être poétiques sur l'amour et la nostalgie." }] },
  { name: 'Pearl Jam', genres: 'Grunge, Alternative Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'grunge-baritone-vocals', name: 'Voix Baryton Grunge', description: "Une performance vocale de baryton puissante et émotive sur un fond de rock alternatif/grunge.", promptInstruction: "Le prompt doit décrire un morceau de rock alternatif/grunge des années 90, avec une voix masculine de baryton puissante et émotive.", lyricInstruction: "Les paroles doivent porter sur des thèmes sociaux et introspectifs." }] },
  { name: 'Pet Shop Boys', genres: 'Synth-pop', suggestedStructureValue: 'pop-full-prechorus', specialTraits: [{ id: 'intellectual-synth-pop', name: 'Synth-Pop Intellectuelle', description: "Une production synth-pop luxuriante avec des paroles intelligentes et souvent mélancoliques, livrées d'une manière détachée, presque parlée.", promptInstruction: "Le prompt doit décrire un morceau de synth-pop des années 80, avec un chant masculin détaché et parlé.", lyricInstruction: "Les paroles doivent être pleines d'esprit et de commentaires sociaux." }] },
  { name: 'Phil Collins', genres: 'Pop Rock, Soft Rock', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'gated-reverb-drums', name: 'Batterie "Gated Reverb"', description: "Incorpore un son de batterie puissant et distinctif avec un effet de \"gated reverb\", typique des années 80.", promptInstruction: "Le prompt doit décrire un morceau de pop rock des années 80 avec un son de batterie avec gated reverb proéminent.", lyricInstruction: "Les paroles doivent porter sur des thèmes de l'amour et du chagrin." }] },
  { name: 'Phoenix', genres: 'Indie Pop, Alternative Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'indie-pop-bright-guitars', name: 'Indie Pop & Guitares Claires', description: "Un son indie pop français avec des guitares claires et 'jangly', et des synthés accrocheurs.", promptInstruction: "Le prompt doit décrire un morceau d'indie pop français avec un son de guitare clair, brillant et 'jangly', une batterie entraînante, des mélodies de synthé accrocheuses et une voix masculine légère et aérienne.", lyricInstruction: "Les paroles doivent être optimistes et souvent sur l'amour ou l'été." }] },
  { name: 'Pink Floyd', genres: 'Progressive Rock, Psychedelic Rock', suggestedStructureValue: 'pink-floyd-psychedelic-suite', specialTraits: [{ id: 'psychedelic-soundscapes-solos', name: 'Paysages Sonores & Solos Psychédéliques', description: "Crée de longs paysages sonores atmosphériques avec des solos de guitare mélodiques et expressifs.", promptInstruction: "Le prompt doit décrire un morceau de rock progressif avec une atmosphère psychédélique, des textures sonores ambiantes, et de longs solos de guitare mélodiques et planants.", lyricInstruction: "Les paroles doivent être philosophiques et introspectives." }] },
  { name: 'Pixies', genres: 'Alternative Rock, Indie Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'loud-quiet-surrealism', name: 'Dynamique Fort/Calme & Surréalisme', description: "Alterne entre des couplets calmes et des refrains forts et criés, avec des paroles surréalistes.", promptInstruction: "Le prompt doit décrire un morceau de rock alternatif avec une dynamique fort/calme, et une voix criée.", lyricInstruction: "Les paroles doivent être surréalistes et souvent dérangeantes." }] },
  { name: 'PNL', genres: 'French Rap, Cloud Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'cloud-rap-autotune', name: 'Cloud Rap & Autotune Mélancolique', description: 'Adopte un style cloud rap avec un autotune très présent et mélodique, créant une ambiance planante et nostalgique.', promptInstruction: 'Le prompt doit décrire une production de cloud rap atmosphérique, avec des nappes de synthé planantes et une boîte à rythmes lente. Les voix doivent être traitées avec un autotune proéminent, utilisé de manière mélodique et mélancolique pour un effet "planant".', lyricInstruction: 'Les paroles doivent être introspectives, avec un ton mélancolique, parlant de la vie de quartier, de la solitude ou de l\'évasion. Le flow doit être lent et hypnotique. La plupart des lignes vocales doivent être marquées avec [autotune-vocals].' }] },
  { name: 'Polo & Pan', genres: 'Electronic, Tropical House', suggestedStructureValue: 'edm-dance-drop', specialTraits: [{ id: 'dreamy-tropical-electro', name: 'Électro Tropicale & Rêveuse', description: "Un son électronique léger et ensoleillé avec des influences tropicales et des mélodies rêveuses.", promptInstruction: "Le prompt doit décrire un morceau d'électro tropicale avec des mélodies rêveuses et des samples exotiques.", lyricInstruction: "Les paroles doivent être minimalistes, souvent en français, avec une ambiance de conte de fées." }] },
  { name: 'Portishead', genres: 'Trip Hop', suggestedStructureValue: 'post-rock-ambient', specialTraits: [{ id: 'trip-hop-vinyl-crackle', name: 'Trip-Hop & Craquement de Vinyle', description: "Un son trip-hop sombre et cinématique avec des éléments lo-fi comme le craquement de vinyle.", promptInstruction: "Le prompt doit décrire un morceau de trip-hop sombre et cinématique avec un breakbeat lent et lourd, un piano Rhodes ou des cordes mélancoliques, et une voix féminine envoûtante et fragile. La production doit inclure des éléments lo-fi comme le craquement de vinyle.", lyricInstruction: "Les paroles doivent être mystérieuses et mélancoliques." }] },
  { name: 'Post Malone', genres: 'Hip Hop, Pop Rap, R&B', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'vibrato-melodic-rap', name: 'Rap Mélodique & Vibrato', description: "Un flow qui mélange rap et chant, avec un vibrato vocal distinctif sur les notes tenues.", promptInstruction: "Le prompt doit décrire un beat trap ou pop, avec une performance vocale masculine qui mélange rap et chant, et un vibrato notable.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la fête, des relations et du succès." }] },
  { name: 'Prince', genres: 'Funk, Pop, R&B, Rock', suggestedStructureValue: 'funk-jam', specialTraits: [{ id: 'funk-rock-falsetto-scream', name: 'Funk-Rock & Cri en Fausset', description: "Une fusion de funk et de rock avec une voix de fausset et des cris perçants.", promptInstruction: "Le prompt doit décrire un morceau de funk-rock avec une guitare funky, une ligne de basse proéminente, et une performance vocale masculine qui alterne entre une voix de poitrine et un fausset aigu, avec des cris.", lyricInstruction: "Les paroles doivent être sur des thèmes de désir, de spiritualité et de danse." }] },
  { name: 'Public Enemy', genres: 'Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'political-rap-dense-production', name: 'Rap Politique & Production Dense', description: "Un son hip-hop avec une production dense et chaotique (sirènes, samples), et un flow de rap puissant livrant des paroles politiques.", promptInstruction: "Le prompt doit décrire un morceau de hip-hop politique avec une production dense incluant des sirènes, et une voix de baryton autoritaire.", lyricInstruction: "Les paroles doivent être politiques et radicales." }] },
  { name: 'Pulp', genres: 'Britpop, Art Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'narrative-theatrical-britpop', name: 'Britpop Narratif & Théâtral', description: "Un son britpop avec une performance vocale théâtrale et des paroles narratives pleines d'esprit sur les classes sociales et les relations.", promptInstruction: "Le prompt doit décrire un morceau de britpop avec une voix masculine théâtrale et des paroles narratives.", lyricInstruction: "Les paroles doivent raconter une histoire détaillée avec un commentaire social." }] },
  { name: 'Pusha T', genres: 'Hip Hop, Gangsta Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'coke-rap-adlibs', name: 'Rap "Coke" & Ad-libs', description: "Un flow de rap confiant et plein de rimes complexes sur le thème du trafic de drogue, avec des ad-libs caractéristiques (\"Yeurk!\").", promptInstruction: "Le prompt doit décrire un beat trap minimaliste et menaçant, avec un flow de rap confiant.", lyricInstruction: "Les paroles doivent contenir des métaphores complexes sur le trafic de cocaïne. Incorpore des ad-libs comme (Yeurk!)." }] },
  { name: 'Queen', genres: 'Rock, Pop, Glam Rock', suggestedStructureValue: 'queen-operatic-rhapsody', specialTraits: [{ id: 'operatic-harmonies', name: 'Harmonies Vocales Opératiques', description: "Inclut des chœurs et des harmonies vocales complexes et superposées.", promptInstruction: "Le prompt doit décrire des harmonies vocales riches et multi-pistes, avec des chœurs puissants et un arrangement quasi-opératique dans les refrains.", lyricInstruction: "Inclus une section de chœurs grandioses, avec plusieurs voix en harmonie. Marque cette section avec le tag [choral-harmonies]." }] },
  { name: 'R.E.M.', genres: 'Alternative Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'jangle-rock-cryptic-lyrics', name: 'Rock "Jangle" & Paroles Cryptiques', description: "Un son de rock alternatif mené par des guitares claires et \"jangly\" (arpèges), avec des paroles cryptiques et une voix marmonnée.", promptInstruction: "Le prompt doit décrire un morceau de rock alternatif avec des guitares \"jangle\", et une voix masculine marmonnée.", lyricInstruction: "Les paroles doivent être abstraites et poétiques." }] },
  { name: 'Radiohead', genres: 'Alternative Rock, Art Rock', suggestedStructureValue: 'pink-floyd-psychedelic-suite', specialTraits: [{ id: 'yorke-falsetto', name: 'Falsetto Anxieux', description: 'Utilise la voix de fausset plaintive et éthérée caractéristique de Thom Yorke.', promptInstruction: 'Le prompt doit spécifier une voix masculine principale en fausset, créant une atmosphère de mélancolie, d\'anxiété et de vulnérabilité. La production doit être expérimentale, mêlant rock alternatif et éléments électroniques.', lyricInstruction: 'Les paroles doivent être abstraites, introspectives, et traiter de thèmes comme l\'aliénation ou la critique sociale. Les refrains ou les ponts doivent être chantés en fausset. Marque ces sections avec [anxious-falsetto].' }] },
  { name: 'Rage Against the Machine', genres: 'Rap Metal, Funk Metal', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'political-rap-rock', name: 'Rap-Rock Politique', description: "Un flow de rap agressif sur une instrumentation rock puissante, avec des paroles engagées.", promptInstruction: "Le prompt doit décrire une fusion de riffs de guitare heavy metal/funk et un flow de rap scandé et politique.", lyricInstruction: "Les paroles doivent être une critique sociale ou politique. Le ton doit être direct et revendicatif. Marque les passages de rap avec [rap-verse]." }] },
  { name: 'Ramones', genres: 'Punk Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'minimalist-punk-rock', name: 'Punk Rock Minimaliste', description: "Une chanson punk rock très rapide, courte et simple, avec des power chords et un refrain répétitif.", promptInstruction: "Le prompt doit décrire un morceau de punk rock des années 70, rapide et simple.", lyricInstruction: "Les paroles doivent être simples et directes." }] },
  { name: 'Red Hot Chili Peppers', genres: 'Funk Rock, Alternative Rock', suggestedStructureValue: 'funk-jam', specialTraits: [{ id: 'funk-bass-rap-rock', name: 'Basse Funk & Chant Rap-Rock', description: "Une ligne de basse slap proéminente et un chant qui alterne entre mélodie et rap.", promptInstruction: "Le prompt doit décrire un morceau de funk rock avec une ligne de basse slap proéminente, complexe et groovy, des accords de guitare funky, et une performance vocale qui alterne entre chant mélodique et couplets rappés rythmiques.", lyricInstruction: "Alterne entre des couplets rappés et des refrains chantés. Marque les parties rappées avec [rap-verse]." }] },
  { 
    name: 'Renaud', 
    genres: 'Chanson', 
    suggestedStructureValue: 'folk-storytelling', 
    specialTraits: [
      { 
        id: 'committed-chanson-parisian-slang', 
        name: 'Chanson Engagée & Argot Parisien', 
        description: "Une chanson française avec des paroles socialement engagées, utilisant de l'argot parisien, livrée avec une voix éraillée et émotive.", 
        promptInstruction: "Le prompt doit décrire une chanson française, avec une voix masculine éraillée, et des paroles en argot.", 
        lyricInstruction: "Les paroles doivent être un commentaire social utilisant de l'argot parisien." 
      },
      {
        id: 'poetic-nostalgia',
        name: 'Nostalgie Poétique',
        description: "Adopte un ton doux et mélancolique pour évoquer des thèmes comme l'enfance perdue, les souvenirs ou l'amitié, avec une instrumentation épurée.",
        promptInstruction: "Le prompt doit décrire une performance vocale douce, presque fragile, chargée de nostalgie. L'arrangement doit être minimaliste, souvent un piano ou une guitare acoustique, pour créer une atmosphère intime et poignante.",
        lyricInstruction: "Les paroles doivent être une rêverie sur le passé, l'enfance ou un ami disparu. Le ton est tendre et profondément personnel, moins revendicatif."
      },
      {
        id: 'intimate-piano-vocal',
        name: 'Piano-Voix Intimiste',
        description: "Recrée le style de ses ballades les plus célèbres, avec seulement un piano pour accompagner la voix éraillée et narrative.",
        promptInstruction: "Spécifie un arrangement 'piano-voix' exclusif. Le piano doit être simple et mélancolique, la production très proche et intime. La voix doit être au centre, avec toutes ses imperfections et son émotion brute.",
        lyricInstruction: "La structure doit être simple. Les paroles sont au cœur de la chanson, racontant une histoire personnelle et émouvante. Le chant doit sembler proche de l'auditeur, presque un murmure."
      },
      {
        id: 'character-storytelling',
        name: 'Portrait de Personnage',
        description: "Se concentre sur la narration en dressant le portrait d'un personnage de la rue, un 'loubard' au grand cœur, ou un anti-héros du quotidien.",
        promptInstruction: "Le prompt doit demander un style narratif, où la voix incarne un conteur ou le personnage lui-même. L'instrumentation est typiquement folk-rock, simple pour ne pas éclipser l'histoire.",
        lyricInstruction: "Les paroles doivent raconter l'histoire d'un personnage spécifique (ex: un motard, un jeune de banlieue). Décris son apparence, ses habitudes, ses rêves et ses désillusions. Utilise un langage direct et imagé."
      }
    ] 
  },
  { name: 'Rick Ross', genres: 'Southern Hip Hop, Gangsta Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'luxury-rap-deep-voice', name: 'Rap de Luxe & Voix Grave', description: "Un son hip-hop orchestral et luxueux avec une voix masculine très grave et des ad-libs (\"Huh!\").", promptInstruction: "Le prompt doit décrire un beat hip-hop orchestral et luxueux, avec une voix masculine très grave.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la richesse et du luxe. Incorpore des ad-libs comme (Huh!)." }] },
  { name: 'Rihanna', genres: 'R&B, Pop, Dancehall', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'pop-dancehall-influences', name: 'Pop & Influences Dancehall', description: "Un son pop ou R&B avec des influences rythmiques du dancehall et une voix féminine confiante.", promptInstruction: "Le prompt doit décrire un morceau de pop avec un rythme dancehall, et une voix féminine charismatique.", lyricInstruction: "Les paroles doivent porter sur des thèmes de l'amour, de la confiance en soi et de la fête." }] },
  { name: 'Run The Jewels', genres: 'Hardcore Hip Hop, Political Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'aggressive-rap-duo', name: 'Duo de Rap Agressif', description: "Deux flows de rap agressifs et techniques qui s'échangent les lignes sur des beats hip-hop futuristes et abrasifs.", promptInstruction: "Le prompt doit décrire un beat hip-hop abrasif et futuriste, avec deux rappeurs qui s'échangent les lignes.", lyricInstruction: "Les paroles doivent être politiques et vantardes." }] },
  { name: 'Run-DMC', genres: 'Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'pioneering-rap-rock', name: 'Rap-Rock Pionnier', description: "Combine des riffs de guitare rock avec des rythmes de boîte à rythmes hip-hop et une livraison de rap criée et énergique.", promptInstruction: "Le prompt doit décrire une fusion de hip-hop et de rock, avec une livraison de rap criée.", lyricInstruction: "Les paroles doivent être vantardes et énergiques." }] },
  { name: 'Russ', genres: 'Hip Hop, R&B', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'melodic-confident-rap-singing', name: 'Rap/Chant Mélodique & Confiant', description: "Un flow de rap mélodique qui se transforme souvent en chant, sur des productions auto-produites, avec des paroles sur la confiance en soi et l'indépendance.", promptInstruction: "Le prompt doit décrire un beat hip-hop mélodique, avec un flow de rap qui devient chanté.", lyricInstruction: "Les paroles doivent porter sur des thèmes de l'indépendance et du succès." }] },
  { name: 'Sade', genres: 'Sophisti-pop, Soul', suggestedStructureValue: 'aaba-classic', specialTraits: [{ id: 'sophisti-pop-smooth-vocals', name: 'Sophisti-Pop & Voix Suave', description: "Une voix de contralto douce, sensuelle et détachée sur une production sophistiquée mêlant pop, soul et jazz.", promptInstruction: "Le prompt doit décrire un morceau de sophisti-pop avec saxophone et basse fretless, et une voix féminine de contralto suave.", lyricInstruction: "Les paroles doivent porter sur des thèmes de l'amour et de la romance." }] },
  { name: 'Santana', genres: 'Latin Rock, Blues Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'latin-rock-guitar-solo', name: 'Solo de Guitare Rock Latin', description: "Un son rock fusionné avec des rythmes latins (congas, timbales) et mené par un solo de guitare électrique long, mélodique et plein de sustain.", promptInstruction: "Le prompt doit décrire un morceau de rock latin avec un solo de guitare électrique mélodique et expressif.", lyricInstruction: "Les paroles sont souvent instrumentales ou simples." }] },
  { name: 'SCH', genres: 'French Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'cinematic-autotune-trap', name: 'Trap Cinématographique & Auto-tuné', description: "Une production orchestrale sombre avec un rap auto-tuné et des paroles multilingues.", promptInstruction: "Le prompt doit décrire un morceau de trap français avec une production sombre, cinématique et orchestrale. Les vocaux de rap doivent être distinctifs, utilisant souvent l'auto-tune de manière mélodique, avec un mélange d'allemand et d'autres langues européennes dans les paroles.", lyricInstruction: "Incorpore des mots d'autres langues (par ex. l'allemand) et utilise un style de narration très visuel et cinématique." }] },
  { name: 'Scorpions', genres: 'Hard Rock, Heavy Metal', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'power-ballad-rock', name: 'Power Ballade Rock', description: "Une ballade rock qui alterne entre des couplets doux et des refrains puissants avec des guitares électriques saturées.", promptInstruction: "Le prompt doit décrire une power ballade de hard rock, avec des couplets acoustiques et des refrains puissants.", lyricInstruction: "Les paroles doivent être romantiques et hymniques." }] },
  { name: 'Serge Gainsbourg', genres: 'Chanson, Pop, Reggae, Rock', suggestedStructureValue: 'aaba-classic', specialTraits: [{ id: 'spoken-word', name: 'Style Parlé-Chanté (Spoken Word)', description: "Utilise un style de 'spoken word' nonchalant et provocateur.", promptInstruction: "Le prompt doit décrire une voix masculine grave, parlée plus que chantée, avec un ton cynique et poétique, sur un arrangement musical riche (cordes, basse funk...).", lyricInstruction: "Écris des couplets en style parlé, avec des rimes internes et un phrasé décontracté. Marque ces sections avec [spoken-word]." }] },
  { name: 'Sexion d\'Assaut', genres: 'French Rap, Pop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'group-rap-pop-chorus', name: 'Rap de Groupe & Refrains Pop', description: "Un collectif de rappeurs avec des voix et des flows différents qui s'échangent les couplets, menant à un refrain pop chanté et fédérateur.", promptInstruction: "Le prompt doit décrire un morceau de rap français de groupe, avec un refrain pop chanté.", lyricInstruction: "Les paroles doivent être alternées entre les rappeurs dans les couplets." }] },
  { name: 'Shakira', genres: 'Latin Pop, Pop Rock', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'unique-vocal-vibrato', name: 'Vibrato Vocal Unique', description: "Utilise une technique vocale distinctive qui inclut un vibrato rapide et des inflexions ressemblant à du yodel.", promptInstruction: "Le prompt doit décrire un morceau de pop latine, avec une voix féminine utilisant un vibrato unique.", lyricInstruction: "Les paroles doivent porter sur des thèmes de l'amour et de la danse." }] },
  { name: 'Sia', genres: 'Pop, Electropop', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'powerful-voice-emotional-cracks', name: 'Voix Puissante & Craquements Émotionnels', description: "Une performance vocale extrêmement puissante qui \"craque\" intentionnellement sous le poids de l'émotion.", promptInstruction: "Le prompt doit décrire une power ballade pop, avec une voix féminine très puissante qui craque avec émotion.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la résilience et de la douleur." }] },
  { name: 'Simon & Garfunkel', genres: 'Folk Rock', suggestedStructureValue: 'folk-storytelling', specialTraits: [{ id: 'complex-folk-harmonies', name: 'Harmonies Folk Complexes', description: "Deux voix masculines qui chantent en harmonies serrées et complexes sur un fond de guitare acoustique.", promptInstruction: "Le prompt doit décrire un morceau de folk rock acoustique, avec des harmonies vocales masculines complexes.", lyricInstruction: "Les paroles doivent être poétiques et narratives." }] },
  { name: 'Simple Minds', genres: 'New Wave, Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'new-wave-anthem', name: 'Hymne New Wave', description: "Un son rock de stade avec des mélodies de synthétiseur proéminentes et un refrain hymnique.", promptInstruction: "Le prompt doit décrire un morceau de new wave / arena rock des années 80, avec des mélodies de synthétiseur entraînantes.", lyricInstruction: "Les paroles doivent être optimistes et fédératrices." }] },
  { name: 'Siouxsie and the Banshees', genres: 'Post-Punk, Gothic Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'theatrical-post-punk-vocals', name: 'Chant Post-Punk Théâtral', description: "Une performance vocale féminine distinctive, théâtrale et puissante sur un fond de post-punk ou de rock gothique.", promptInstruction: "Le prompt doit décrire un morceau de post-punk / rock gothique, avec une voix féminine théâtrale et puissante.", lyricInstruction: "Les paroles doivent être sombres et poétiques." }] },
  { name: 'Slayer', genres: 'Thrash Metal', suggestedStructureValue: 'metal-breakdown-solo', specialTraits: [{ id: 'aggressive-thrash-metal', name: 'Thrash Metal Agressif', description: "Un son thrash metal extrêmement rapide et agressif avec des solos de guitare atonaux et chaotiques.", promptInstruction: "Le prompt doit décrire un morceau de thrash metal rapide et agressif, avec des solos de guitare atonaux.", lyricInstruction: "Les paroles doivent être sombres sur la mort, la guerre et le satanisme." }] },
  { name: 'Slipknot', genres: 'Nu Metal, Alternative Metal', suggestedStructureValue: 'metal-breakdown-solo', specialTraits: [{ id: 'nu-metal-chaos', name: 'Chaos Nu Metal', description: "Un son nu metal chaotique et agressif avec des percussions additionnelles, des samples et des vocaux criés.", promptInstruction: "Le prompt doit décrire un morceau de nu metal agressif avec des percussions additionnelles, des samples et des vocaux criés.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la colère et de la douleur." }] },
  { name: 'Snoop Dogg', genres: 'Hip Hop, G-Funk', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'laid-back-flow', name: 'Flow Décontracté (Laid-back)', description: "Utilise un flow de rap très décontracté, fluide et mélodique, avec une articulation nonchalante.", promptInstruction: "Le prompt doit décrire une voix de rap masculine douce et nasale, avec un flow décontracté, presque parlé, sur un beat G-Funk avec des synthés sifflants et une basse profonde.", lyricInstruction: "Les paroles doivent être fluides avec un schéma de rimes simple et une cadence détendue. Le ton doit être nonchalant et confiant." }] },
  { name: 'Sonic Youth', genres: 'Noise Rock, Alternative Rock', suggestedStructureValue: 'post-rock-ambient', specialTraits: [{ id: 'noise-rock-dissonant-guitars', name: 'Noise Rock & Guitares Dissonantes', description: "Un son de rock alternatif expérimental avec des guitares désaccordées, du feedback et des structures non conventionnelles.", promptInstruction: "Le prompt doit décrire un morceau de noise rock avec des guitares dissonantes et désaccordées, et une approche expérimentale de la structure de la chanson.", lyricInstruction: "Les paroles doivent être abstraites et poétiques." }] },
  { name: 'Soprano', genres: 'French Rap, Pop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'positive-urban-pop', name: 'Pop Urbaine Positive', description: "Un style qui mélange rap et pop avec des messages positifs et inspirants.", promptInstruction: "Le prompt doit décrire un morceau de pop urbaine française, avec un refrain chanté et positif.", lyricInstruction: "Les paroles doivent porter sur des thèmes de l'espoir, de la famille et de la réussite." }] },
  { name: 'Soundgarden', genres: 'Grunge, Alternative Metal', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'powerful-multi-octave-grunge-vocals', name: 'Voix Grunge Puissante & Multi-Octave', description: "Une performance vocale masculine extrêmement puissante avec une large tessiture, capable de notes très hautes, sur un fond de rock alternatif/grunge lourd.", promptInstruction: "Le prompt doit décrire un morceau de grunge / metal alternatif, avec une voix masculine puissante à large tessiture.", lyricInstruction: "Les paroles doivent être sombres et poétiques." }] },
  { name: 'Stevie Nicks', genres: 'Rock, Pop', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'mystical-raspy-vocals', name: 'Voix Mystique & Rocailleuse', description: "Une voix féminine distinctive, rocailleuse et vibrante, avec des paroles mystiques et poétiques.", promptInstruction: "Le prompt doit décrire un morceau de rock avec une ambiance mystique, et une voix féminine rocailleuse et vibrante.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la magie, de l'amour et de la nature." }] },
  { name: 'Stevie Wonder', genres: 'Soul, Pop, R&B, Funk', suggestedStructureValue: 'funk-jam', specialTraits: [{ id: 'funk-soul-harmonica-solo', name: 'Solo d\'Harmonica Funk/Soul', description: "Incorpore un solo d'harmonica chromatique virtuose et mélodique.", promptInstruction: "Le prompt doit décrire un morceau de funk ou de soul des années 70, avec un solo d'harmonica chromatique.", lyricInstruction: "Les paroles doivent être positives sur l'amour et la société." }] },
  { name: 'Stromae', genres: 'Hip Hop, Electronic, New Beat', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'stromae-dance-social', name: 'Narration Dansante / Sujets Sérieux', description: 'Combine des rythmes de dance/electro avec des paroles qui racontent une histoire ou traitent de sujets sociaux profonds.', promptInstruction: 'Le prompt doit décrire une fusion de rythmes de musique électronique (house, new beat) et d\'éléments de chanson française. La voix masculine doit alterner entre un chant mélodique et un style parlé-rythmé, avec une diction claire et un ton parfois grave, parfois ironique.', lyricInstruction: 'Les paroles doivent aborder un sujet de société (maladie, problèmes familiaux, réseaux sociaux) sous un angle narratif ou métaphorique, contrastant avec la musique entraînante.' }] },
  { name: 'Suprême NTM', genres: 'French Hip Hop, Hardcore Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'committed-hardcore-rap', name: 'Rap Hardcore Engagé', description: "Un flow de rap énergique et agressif livrant des paroles socialement engagées et critiques.", promptInstruction: "Le prompt doit décrire un morceau de hip-hop hardcore français des années 90, avec un flow de rap agressif et engagé.", lyricInstruction: "Les paroles doivent être un commentaire social sur le racisme et la vie en banlieue." }] },
  { name: 'System of a Down', genres: 'Alternative Metal', suggestedStructureValue: 'metal-breakdown-solo', specialTraits: [{ id: 'frantic-vocals', name: 'SOAD Vocals', description: "Passe d'un chant clair à des passages frénétiques et quasi-opératiques.", promptInstruction: "Le prompt doit décrire des changements de dynamique vocale extrêmes, passant d'un chant mélodique et harmonieux à des passages rapides, frénétiques, scandés et quasi-opératiques, dans le style de Serj Tankian.", lyricInstruction: "Intègre un changement de style vocal drastique dans au moins une section (par exemple, un pont ou un couplet). Passe d'un ton mélodique à un ton rapide, parlé ou frénétique. Marque le début de cette section avec le tag [frantic-vocals]." }] },
  { name: 'SZA', genres: 'R&B, Neo Soul', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'conversational-rnb', name: 'R&B Conversationnel', description: "Un style de chant R&B qui imite le rythme et la cadence de la conversation, avec des paroles franches et relatables sur les relations.", promptInstruction: "Le prompt doit décrire un morceau de R&B alternatif, avec une voix féminine conversationnelle.", lyricInstruction: "Les paroles doivent être introspectives et directes sur les insécurités et les relations modernes." }] },
  { name: 'Tame Impala', genres: 'Psychedelic Rock, Neo-psychedelia', suggestedStructureValue: 'pink-floyd-psychedelic-suite', specialTraits: [{ id: 'modern-psychedelic-rock', name: 'Rock Psychédélique Moderne', description: "Un son rock psychédélique avec des voix aériennes et filtrées, des lignes de basse groovy et des couches de synthétiseurs et de guitares.", promptInstruction: "Le prompt doit décrire un morceau de rock psychédélique avec des voix masculines filtrées et aériennes, et des couches de synthétiseurs et de guitares.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la solitude et de l'introspection." }] },
  { name: 'Talking Heads', genres: 'New Wave, Art Punk', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'anxious-new-wave-funk', name: 'Funk New Wave Anxieux', description: "Combine des rythmes funk avec une énergie post-punk et une performance vocale nerveuse et excentrique.", promptInstruction: "Le prompt doit décrire un morceau de new wave / art funk, avec une voix masculine anxieuse et excentrique.", lyricInstruction: "Les paroles doivent être des observations surréalistes et angoissées de la vie moderne." }] },
  { name: 'Taylor Swift', genres: 'Pop, Country, Folk', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'narrative-songwriting-detailed-bridge', name: 'Écriture Narrative & Pont Détaillé (Bridge)', description: "Une chanson qui raconte une histoire personnelle détaillée, avec un pont (bridge) particulièrement développé et émotionnel qui change la perspective de la chanson.", promptInstruction: "Le prompt doit décrire un morceau de pop ou de folk narratif, avec un pont émotionnel et détaillé.", lyricInstruction: "Les paroles doivent raconter une histoire personnelle avec un pont qui révèle un nouveau détail ou une nouvelle émotion." }] },
  { name: 'Tears for Fears', genres: 'Synth-pop, New Wave', suggestedStructureValue: 'pop-full-prechorus', specialTraits: [{ id: 'grandiose-introspective-synth-pop', name: 'Synth-Pop Grandiose & Introspectif', description: "Une production synth-pop ample et sophistiquée avec des paroles introspectives sur des thèmes psychologiques.", promptInstruction: "Le prompt doit décrire un morceau de synth-pop des années 80 avec une production grandiose et des paroles introspectives.", lyricInstruction: "Les paroles doivent porter sur des thèmes de l'enfance, de la psychologie et de la société." }] },
  { name: 'Téléphone', genres: 'French Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'energetic-french-rock-n-roll', name: 'Rock \'n\' Roll Français Énergique', description: "Un son rock'n'roll simple et énergique avec des riffs de guitare accrocheurs et un refrain facile à chanter.", promptInstruction: "Le prompt doit décrire un morceau de rock français des années 80 avec des riffs de guitare énergiques.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la jeunesse, de la rébellion et de la ville." }] },
  { name: 'The 1975', genres: 'Indie Pop, Pop Rock', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'smart-self-aware-pop', name: 'Pop Intelligente & Auto-consciente', description: "Un son pop-rock éclectique avec des paroles pleines d'esprit, auto-conscientes et souvent verbeuses sur la technologie, l'amour et l'anxiété à l'ère moderne.", promptInstruction: "Le prompt doit décrire un morceau d'indie pop / pop rock, avec des paroles verbeuses et intelligentes.", lyricInstruction: "Les paroles doivent être un commentaire sur la vie moderne." }] },
  { name: 'The B-52\'s', genres: 'New Wave, Pop Rock', suggestedStructureValue: 'pop-short-vcvc', specialTraits: [{ id: 'festive-new-wave-call-and-response', name: 'New Wave Festive & Appel-Réponse', description: "Un son new wave festif et excentrique avec des voix masculines et féminines en appel-réponse.", promptInstruction: "Le prompt doit décrire un morceau de new wave festive, avec des voix masculines et féminines en appel-réponse.", lyricInstruction: "Les paroles doivent être absurdes et amusantes." }] },
  { name: 'The Beatles', genres: 'Rock, Pop', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'pop-vocal-harmonies', name: 'Harmonies Vocales Pop', description: "Utilise des harmonies vocales serrées et mélodiques, typiques de la pop des années 60.", promptInstruction: "Le prompt doit décrire un morceau de pop rock des années 60 avec des harmonies vocales complexes.", lyricInstruction: "Les paroles doivent être simples sur l'amour." }] },
  { name: 'The Chemical Brothers', genres: 'Big Beat, Electronic', suggestedStructureValue: 'edm-dance-drop', specialTraits: [{ id: 'big-beat-electronic', name: 'Big Beat Électronique', description: "Un son électronique puissant mené par des breakbeats lourds et des samples psychédéliques.", promptInstruction: "Le prompt doit décrire un morceau de big beat avec des breakbeats lourds et des samples psychédéliques.", lyricInstruction: "La chanson est souvent instrumentale ou avec des phrases vocales samplées." }] },
  { name: 'The Clash', genres: 'Punk Rock, New Wave', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'committed-punk-reggae-fusion', name: 'Punk Engagé & Fusion Reggae', description: "Un son punk rock énergique avec des paroles politiques, fusionné avec des rythmes reggae.", promptInstruction: "Le prompt doit décrire un morceau de punk rock avec une influence reggae, et des paroles politiques.", lyricInstruction: "Les paroles doivent être un commentaire social et politique." }] },
  { name: 'The Cranberries', genres: 'Alternative Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'ethereal-yodeling-vocals', name: 'Voix de Yodel Éthérée', description: "Utilise une technique vocale distinctive qui alterne entre une voix de poitrine et une voix de tête, créant un effet de yodel.", promptInstruction: "Le prompt doit décrire un morceau de rock alternatif des années 90, avec une voix féminine utilisant un style de yodel.", lyricInstruction: "Les paroles doivent être poétiques et souvent politiques." }] },
  { name: 'The Cure', genres: 'Gothic Rock, Post-Punk, New Wave', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'gothic-bassline-vocals', name: 'Ligne de Basse Gothique & Voix Mélancolique', description: "Une ligne de basse mélodique et proéminente, avec une voix plaintive.", promptInstruction: "Le prompt doit décrire un morceau post-punk ou rock gothique avec une ligne de basse aigue, mélodique et proéminente, des guitares avec effet chorus, et une voix masculine nostalgique et mélancolique.", lyricInstruction: "Les paroles doivent être introspectives, poétiques et sur l'amour ou la perte." }] },
  { name: 'The Doors', genres: 'Psychedelic Rock, Blues Rock', suggestedStructureValue: 'pink-floyd-psychedelic-suite', specialTraits: [{ id: 'psychedelic-organ-poetry', name: 'Orgue Psychédélique & Poésie', description: "Un son de rock psychédélique mené par un orgue électrique et une voix de baryton déclamant des paroles poétiques.", promptInstruction: "Le prompt doit décrire un morceau de rock psychédélique avec un orgue électrique proéminent et des paroles poétiques et sombres.", lyricInstruction: "Les paroles doivent être de longues épopées poétiques et surréalistes." }] },
  { name: 'The Fugees', genres: 'Hip Hop, Soul', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'hip-hop-soul-reggae-fusion', name: 'Fusion Hip-Hop & Soul/Reggae', description: "Combine des couplets de rap avec des refrains chantés soul ou reggae.", promptInstruction: "Le prompt doit décrire un morceau de hip-hop des années 90 avec des influences soul et reggae, et une alternance entre rap et chant.", lyricInstruction: "Les paroles doivent être socialement conscientes." }] },
  { name: 'The Human League', genres: 'Synth-pop', suggestedStructureValue: 'pop-full-prechorus', specialTraits: [{ id: 'minimalist-synth-pop-vocal-trio', name: 'Synth-Pop Minimaliste & Trio Vocal', description: "Un son synth-pop mené par des synthétiseurs analogiques, avec une interaction entre une voix masculine principale et des chœurs féminins.", promptInstruction: "Le prompt doit décrire un morceau de synth-pop des années 80 avec une voix masculine de baryton et des chœurs féminins.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la romance et de la technologie." }] },
  { name: 'The Killers', genres: 'Alternative Rock, Indie Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'synth-rock-anthem', name: 'Hymne Rock à Synthés', description: "Un hymne de rock de stade avec des mélodies de synthétiseur proéminentes et un refrain massif.", promptInstruction: "Le prompt doit décrire un morceau de rock alternatif avec des synthétiseurs proéminents et un refrain hymnique.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la romance et de la nostalgie." }] },
  { name: 'The Kinks', genres: 'Rock, Pop Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'english-narrative-rock', name: 'Rock Narratif Anglais', description: "Une chanson rock qui raconte une histoire détaillée sur la vie et la culture anglaises.", promptInstruction: "Le prompt doit décrire un morceau de rock britannique des années 60 avec des paroles narratives.", lyricInstruction: "Les paroles doivent raconter une histoire sur des personnages typiquement anglais." }] },
  { name: 'The National', genres: 'Indie Rock, Post-Punk Revival', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'melancholic-baritone-indie-rock', name: 'Indie Rock Mélancolique & Baryton', description: "Un son indie rock sombre et mélancolique avec une voix de baryton profonde et anxieuse.", promptInstruction: "Le prompt doit décrire un morceau d'indie rock mélancolique, avec une voix masculine de baryton.", lyricInstruction: "Les paroles doivent être introspectives sur l'anxiété et les relations." }] },
  { name: 'The Offspring', genres: 'Punk Rock, Pop Punk', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'fast-catchy-pop-punk', name: 'Pop-Punk Rapide & Accrocheur', description: "Un son pop-punk très rapide et énergique avec des refrains accrocheurs et une voix masculine nasillarde.", promptInstruction: "Le prompt doit décrire un morceau de pop-punk rapide avec des refrains accrocheurs.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la rébellion et de l'humour." }] },
  { name: 'The Police', genres: 'New Wave, Post-Punk, Reggae Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'rock-reggae-rhythms', name: 'Rock & Rythmes Reggae', description: "Un son rock qui incorpore une ligne de basse et une batterie inspirées du reggae.", promptInstruction: "Le prompt doit décrire un morceau de rock avec une section rythmique reggae.", lyricInstruction: "Les paroles doivent porter sur des thèmes de l'amour et de la solitude." }] },
  { name: 'The Prodigy', genres: 'Big Beat, Rave', suggestedStructureValue: 'edm-dance-drop', specialTraits: [{ id: 'rave-electro-punk-vocals', name: 'Électro Rave & Vocaux Punk', description: "Un son électronique à haute énergie avec des breakbeats lourds et des vocaux criés et agressifs inspirés du punk.", promptInstruction: "Le prompt doit décrire un morceau de big beat / rave, avec des vocaux punk agressifs.", lyricInstruction: "Les paroles doivent être énergiques et provocatrices." }] },
  { name: 'The Rolling Stones', genres: 'Rock, Blues Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'riff-based-rock-n-roll', name: 'Rock \'n\' Roll Basé sur les Riffs', description: "Un son rock 'n' roll mené par un riff de guitare bluesy simple et mémorable.", promptInstruction: "Le prompt doit décrire un morceau de blues rock avec un riff de guitare simple et accrocheur.", lyricInstruction: "Les paroles doivent porter sur des thèmes du rock'n'roll." }] },
  { name: 'The Roots', genres: 'East Coast Hip Hop, Jazz Rap, Alternative Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'live-band-hip-hop', name: 'Hip-Hop avec Groupe Live', description: "Un son hip-hop joué avec une instrumentation live (batterie, basse, guitare, claviers).", promptInstruction: "Le prompt doit décrire un morceau de hip-hop avec une instrumentation live, pour un son organique.", lyricInstruction: "Les paroles doivent être socialement conscientes." }] },
  { name: 'The Smashing Pumpkins', genres: 'Alternative Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'fuzz-guitar-wall', name: 'Mur de Guitares "Fuzz"', description: "Un son rock alternatif avec de multiples couches de guitares saturées avec une pédale de fuzz, créant un son massif et rêveur.", promptInstruction: "Le prompt doit décrire un morceau de rock alternatif avec des guitares fuzz en couches, et une voix nasillarde et angoissée.", lyricInstruction: "Les paroles doivent porter sur des thèmes de l'angoisse et du rêve." }] },
  { name: 'The Smiths', genres: 'Indie Pop, Jangle Pop', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'jangle-pop-depressive-lyrics', name: 'Pop "Jangle" & Paroles Dépressives', description: "Un son indie pop mené par des guitares \"jangly\" et des paroles spirituelles mais profondément mélancoliques et moroses.", promptInstruction: "Le prompt doit décrire un morceau d'indie pop avec des guitares \"jangle\", et une voix de baryton mélancolique.", lyricInstruction: "Les paroles doivent être spirituelles sur la dépression et la solitude." }] },
  { name: 'The Strokes', genres: 'Indie Rock, Garage Rock Revival', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'lofi-garage-rock', name: 'Garage Rock Lo-fi', description: "Deux guitares angulaires qui s'entremêlent et une voix nonchalante et filtrée.", promptInstruction: "Le prompt doit décrire un morceau de garage rock revival avec deux riffs de guitare angulaires qui s'entremêlent, une section rythmique directe et entraînante, et une voix masculine nonchalante, filtrée et légèrement distordue.", lyricInstruction: "Les paroles doivent être des observations détachées et cool de la vie urbaine." }] },,
  { name: 'The Weeknd', genres: 'R&B, Pop, Synth-pop', suggestedStructureValue: 'pop-modern-postchorus', specialTraits: [{ id: 'ethereal-falsetto', name: 'Falsetto Aérien', description: "Utilise une voix de fausset (falsetto) douce et aérienne, particulièrement dans les refrains.", promptInstruction: "Le prompt doit décrire une voix masculine de ténor, avec un usage proéminent d'un falsetto éthéré et plaintif, sur une production R&B sombre et atmosphérique avec des synthés.", lyricInstruction: "Les refrains ou les ponts doivent être chantés majoritairement en voix de fausset. Marque ces sections avec [falsetto-vocals]." }] },
  { name: 'The White Stripes', genres: 'Garage Rock, Blues Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'minimalist-raw-blues-rock', name: 'Blues Rock Brut & Minimaliste', description: "Un son dépouillé avec seulement une guitare fuzz et une batterie puissante.", promptInstruction: "Le prompt doit décrire un morceau de blues rock brut et minimaliste comprenant uniquement une guitare électrique fortement distordue et fuzzy et une batterie puissante et primaire, avec une voix masculine aiguë et énergique.", lyricInstruction: "Paroles simples et directes avec une influence blues." }] },
  { name: 'The Who', genres: 'Rock, Hard Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'rock-opera-power-chords', name: 'Opéra Rock & Power Chords', description: "Un son de hard rock puissant avec des power chords de guitare, une batterie explosive et des éléments d'opéra rock narratif.", promptInstruction: "Le prompt doit décrire un morceau de rock avec des power chords de guitare, une batterie frénétique, des synthétiseurs en arpèges et une voix masculine puissante.", lyricInstruction: "Les paroles doivent raconter une histoire ou être hymniques." }] },
  { name: 'Tiakola', genres: 'French Rap, R&B', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'melodrill-sung-flow', name: 'Mélodrill & Flow Chanté', description: "Un style qui fusionne la production de la drill avec un flow de rap très mélodique et chanté.", promptInstruction: "Le prompt doit décrire un beat de drill français avec un piano mélodique, et un flow de rap très mélodique et chanté.", lyricInstruction: "Les paroles doivent porter sur des thèmes des relations et de la rue." }] },
  { name: 'Tina Turner', genres: 'Rock, Pop, R&B', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'powerful-raspy-rock-vocals', name: 'Voix Rock Puissante & Éraillée', description: "Une performance vocale féminine extrêmement puissante, énergique et éraillée sur un fond de rock ou de pop-rock.", promptInstruction: "Le prompt doit décrire un morceau de rock des années 80, avec une voix féminine puissante et éraillée.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la résilience et de l'émancipation." }] },
  { name: 'Tom Petty', genres: 'Heartland Rock, Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'jangle-heartland-rock', name: 'Heartland Rock "Jangle"', description: "Un son rock américain direct avec des guitares \"jangly\" et une voix nasillarde et narrative.", promptInstruction: "Le prompt doit décrire un morceau de heartland rock avec des guitares \"jangle\".", lyricInstruction: "Les paroles doivent raconter des histoires sur des personnages américains." }] },
  { name: 'Toots and the Maytals', genres: 'Reggae, Ska', suggestedStructureValue: 'folk-storytelling', specialTraits: [{ id: 'energetic-soulful-reggae', name: 'Reggae Soul Énergique', description: "Un son reggae ou rocksteady précoce avec une performance vocale masculine pleine d'âme et d'énergie.", promptInstruction: "Le prompt doit décrire un morceau de reggae / rocksteady, avec une voix masculine soulful et énergique.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la vie quotidienne et de la célébration." }] },
  { name: 'Tool', genres: 'Progressive Metal, Alternative Metal', suggestedStructureValue: 'progressive-interlude-solo', specialTraits: [{ id: 'complex-time-signatures', name: 'Signatures Temporelles Complexes', description: "Structures progressives avec des mesures impaires et des paroles philosophiques.", promptInstruction: "Le prompt doit décrire un morceau de metal progressif avec des signatures temporelles complexes et impaires, une ligne de basse hypnotique et puissante, une batterie complexe, et une performance vocale planante et intellectuelle avec des paroles philosophiques.", lyricInstruction: "Les paroles doivent être philosophiques, abstraites et introspectives. La structure doit être complexe." }] },
  { name: 'Travis Scott', genres: 'Hip Hop, Trap, Psychedelic Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'psychedelic-adlibs', name: 'Ad-libs & Production Psychédélique', description: "Intègre des ad-libs iconiques ('It's lit!') et des effets de production atmosphériques et psychédéliques.", promptInstruction: "Le prompt doit décrire une production trap sombre et atmosphérique avec des basses 808 lourdes, des nappes de synthé planantes, et l'utilisation proéminente d'ad-libs et d'effets vocaux (reverb, delay).", lyricInstruction: "Inclus fréquemment des ad-libs entre les lignes, comme (It's lit!), (Yeah!), (Straight up!)." }] },
  { name: 'Trippie Redd', genres: 'Hip Hop, Emo Rap, SoundCloud Rap, Trap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'versatile-emo-rap-vocals', name: 'Vocaux Emo-Rap Versatiles', description: "Une performance vocale qui alterne entre chant mélodique auto-tuné, rap et cris, sur des beats trap.", promptInstruction: "Le prompt doit décrire un beat emo-rap, avec une voix masculine qui alterne entre chant et cris.", lyricInstruction: "Les paroles doivent porter sur des thèmes du chagrin d'amour et de la rage." }] },
  { name: 'Tupac Shakur', genres: 'Hip Hop, Gangsta Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'passionate-poetic-rap', name: 'Rap Poétique & Passionné', description: "Un flow de rap passionné et émotif livrant des paroles poétiques sur la société, la violence et l'espoir.", promptInstruction: "Le prompt doit décrire un morceau de hip-hop West Coast des années 90, avec un flow de rap passionné et émotif.", lyricInstruction: "Les paroles doivent être poétiques et politiquement conscientes." }] },
  { name: 'Tyler, The Creator', genres: 'Hip Hop, Neo Soul, Jazz Rap', suggestedStructureValue: 'kendrick-hip-hop-epic', specialTraits: [{ id: 'raspy-baritone-flow', name: 'Flow Baryton Grave & Éraillé', description: "Utilise une voix de baryton très grave et éraillée, avec une livraison parfois agressive, parfois jazzy.", promptInstruction: "Le prompt doit décrire une voix de rap de baryton, profonde et éraillée ('raspy'), sur une production éclectique mélangeant jazz, soul et hip-hop expérimental.", lyricInstruction: "Les paroles doivent être audacieuses, introspectives et pleines d'images. La livraison vocale doit être distinctive et grave. Marque les passages particulièrement graves ou texturés avec [deep-voice]." }] },
  { name: 'U2', genres: 'Rock, Alternative Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'delay-effect-guitar-rock-anthems', name: 'Guitare à Effet "Delay" & Hymnes Rock', description: "Un son de rock de stade mené par une guitare électrique utilisant un effet de delay proéminent, et une voix de ténor puissante.", promptInstruction: "Le prompt doit décrire un morceau de rock de stade avec une guitare électrique utilisant un effet de delay, et un refrain hymnique.", lyricInstruction: "Les paroles doivent être sur des thèmes spirituels et politiques." }] },
  { name: 'Vald', genres: 'French Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'absurdist-ironic-rap', name: 'Rap Absurde & Ironique', description: "Un flow de rap avec des paroles absurdes, ironiques et souvent provocatrices, pleines d'humour noir.", promptInstruction: "Le prompt doit décrire un morceau de rap français avec des beats trap, et des paroles absurdes et ironiques.", lyricInstruction: "Les paroles doivent utiliser l'humour absurde et la provocation." }] },
  { name: 'Vampire Weekend', genres: 'Indie Rock, Indie Pop', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'afro-pop-guitars-preppy-lyrics', name: 'Guitares Afro-pop & Paroles "Preppy"', description: "Des lignes de guitare inspirées de l'afro-pop et des paroles littéraires et intelligentes.", promptInstruction: "Le prompt doit décrire un morceau d'indie pop avec des lignes de guitare claires et brillantes inspirées de l'afro-pop, des rythmes de batterie complexes inspirés de la musique du monde, et des paroles intelligentes et littéraires sur la vie de la classe supérieure.", lyricInstruction: "Utilise un vocabulaire riche et fais des références littéraires ou géographiques." }] },
  { name: 'Van Halen', genres: 'Hard Rock, Heavy Metal', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'tapping-guitar-solo', name: 'Solo de Guitare "Tapping"', description: "Incorpore un solo de guitare électrique virtuose utilisant la technique du \"tapping\" à deux mains.", promptInstruction: "Le prompt doit décrire un morceau de hard rock des années 80 avec un solo de guitare utilisant du tapping.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la fête et du rock'n'roll." }] },
  { name: 'Vanessa Paradis', genres: 'Pop, Chanson', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'breathy-pop-vocals', name: 'Voix Pop Aérienne', description: "Une voix féminine douce, aérienne et légèrement enfantine sur des productions pop.", promptInstruction: "Le prompt doit décrire un morceau de pop française, avec une voix féminine douce et aérienne.", lyricInstruction: "Les paroles doivent porter sur des thèmes de l'amour et du rêve." }] },
  {
    name: 'Vígundr',
    genres: 'Viking Metal, Nordic Folk, Dark Folk',
    suggestedStructureValue: 'vigundr-viking-metal-epic',
    specialTraits: [{
        id: 'viking-war-chant',
        name: 'Chant de Guerre Viking',
        description: "Utilise une voix masculine grave et puissante, avec des chœurs de guerriers en arrière-plan pour un effet épique.",
        promptInstruction: "Le prompt doit décrire une performance vocale masculine principale, grave et résonnante, typique du Viking Metal, soutenue par des chœurs de guerriers puissants et épiques. L'instrumentation doit mêler des guitares heavy metal à des instruments folk nordiques comme des tambours de guerre et des cors.",
        lyricInstruction: "Intègre des passages où des chœurs de guerriers scandent des refrains ou des cris de guerre. Marque ces sections avec [warrior-choir]. Les thèmes doivent tourner autour des mythes nordiques, des batailles et de l'honneur."
    }]
  },
  { name: 'Vendredi sur Mer', genres: 'Electropop, Synth-pop, Chanson', suggestedStructureValue: 'pop-full-prechorus', specialTraits: [{ id: 'spoken-word-cinematic-synth-pop', name: 'Spoken Word sur Synth-Pop Cinématographique', description: "Une voix féminine parlée et sensuelle qui raconte une histoire sur une production de synth-pop cinématique et atmosphérique.", promptInstruction: "Le prompt doit décrire un morceau de synth-pop cinématique, avec un spoken word féminin sensuel.", lyricInstruction: "Les paroles doivent être une narration poétique sur des thèmes de romance et de désir." }] },
  { name: 'Vianney', genres: 'Chanson, Pop', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'acoustic-optimistic-pop-chanson', name: 'Chanson Pop Acoustique & Optimiste', description: "Une chanson pop menée par une guitare acoustique, avec des paroles optimistes et sincères.", promptInstruction: "Le prompt doit décrire un morceau de pop acoustique française, avec une voix masculine sincère.", lyricInstruction: "Les paroles doivent porter sur des thèmes de l'amour, de l'amitié et de l'espoir." }] },
  { name: 'Vince Staples', genres: 'West Coast Hip Hop, Conscious Rap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'laconic-dark-flow', name: 'Flow Laconique & Sombre', description: "Un flow de rap détaché et laconique livrant des paroles sombres et pleines d'esprit sur la vie de rue.", promptInstruction: "Le prompt doit décrire un morceau de hip-hop West Coast expérimental, avec un flow de rap détaché et laconique.", lyricInstruction: "Les paroles doivent être des observations sombres et spirituelles sur la violence." }] },
  { name: 'Vitaa', genres: 'R&B, Pop', suggestedStructureValue: 'pop-standard-vcvcbc', specialTraits: [{ id: 'french-rnb-pop', name: 'R&B Pop Français', description: "Une voix R&B féminine sur des productions pop modernes.", promptInstruction: "Le prompt doit décrire un morceau de R&B/pop français, avec une voix féminine émotive.", lyricInstruction: "Les paroles doivent porter sur des thèmes des relations amoureuses." }] },
  { name: 'Whitney Houston', genres: 'R&B, Pop, Soul', suggestedStructureValue: 'ballad-instrumental-bridge', specialTraits: [{ id: 'power-ballad-powerful-vocals', name: 'Power Ballade & Voix Puissante', description: "Une performance vocale féminine extrêmement puissante et technique sur une power ballade R&B/pop.", promptInstruction: "Le prompt doit décrire une power ballade R&B des années 90, avec une voix féminine extrêmement puissante.", lyricInstruction: "Les paroles doivent porter sur des thèmes de l'amour et de la force." }] },
  { name: 'Wu-Tang Clan', genres: 'Hardcore Hip Hop', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'kung-fu-hip-hop', name: 'Hip-Hop Kung-Fu', description: "Un son hip-hop hardcore et brut avec des samples de films de kung-fu et plusieurs rappeurs aux styles distincts.", promptInstruction: "Le prompt doit décrire un morceau de hip-hop hardcore des années 90 avec des samples de films de kung-fu.", lyricInstruction: "Les paroles doivent contenir des références aux arts martiaux et à la mythologie du groupe." }] },
  { name: 'Yes', genres: 'Progressive Rock', suggestedStructureValue: 'progressive-interlude-solo', specialTraits: [{ id: 'symphonic-progressive-rock', name: 'Rock Progressif Symphonique', description: "Un son rock progressif avec des arrangements complexes et symphoniques, des harmonies vocales et des paroles mystiques.", promptInstruction: "Le prompt doit décrire un morceau de rock progressif symphonique avec des arrangements complexes.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la nature et de la spiritualité." }] },
  { name: 'Zaho de Sagazan', genres: 'Electropop, Chanson', suggestedStructureValue: 'pop-full-prechorus', specialTraits: [{ id: 'dark-electro-deep-voice', name: 'Électro Sombre & Voix Grave', description: "Une voix féminine grave, intense et théâtrale sur une production électronique sombre et dansante.", promptInstruction: "Le prompt doit décrire un morceau d'électro-pop sombre, avec une voix féminine grave et intense.", lyricInstruction: "Les paroles doivent être introspectives et poétiques sur les émotions intenses." }] },
  { name: 'Zola', genres: 'French Rap, Trap', suggestedStructureValue: 'hip-hop-rap', specialTraits: [{ id: 'mumble-trap-adlibs', name: 'Trap "Mumble" & Ad-libs', description: "Un flow de rap marmonné et mélodique sur des beats trap, avec des ad-libs.", promptInstruction: "Le prompt doit décrire un morceau de trap française, avec un flow de rap marmonné.", lyricInstruction: "Les paroles doivent porter sur des thèmes de la rue et du luxe." }] },
  { name: 'ZZ Top', genres: 'Blues Rock, Hard Rock', suggestedStructureValue: 'rock-anthem-solo', specialTraits: [{ id: 'texas-blues-rock', name: 'Blues Rock Texan', description: "Un son de hard rock mené par des riffs de guitare simples et puissants, inspirés du blues texan.", promptInstruction: "Le prompt doit décrire un morceau de blues rock texan, avec des riffs de guitare bluesy.", lyricInstruction: "Les paroles doivent porter sur des thèmes du rock'n'roll, des voitures et du Texas." }] },,
  {
    name: 'Rammstein',
    genres: 'Neue Deutsche Härte, Industrial Metal, German',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'industrial-german-baritone',
        name: 'Baryton Allemand & Riffs Industriels',
        description: "Une voix de baryton profonde avec des 'R' roulés, des paroles en allemand et des riffs de guitare industriels lourds et percutants.",
        promptInstruction: "Le prompt doit décrire un son de metal industriel avec des riffs de guitare lourds et syncopés, et une performance vocale masculine de baryton, profonde et théâtrale, chantant en allemand avec des 'R' distinctement roulés.",
        lyricInstruction: "Les paroles doivent être en allemand et aborder des thèmes sombres ou controversés avec un ton dramatique. La livraison doit être puissante et articulée."
      },
      {
        id: 'theatrical-pyro-themes',
        name: 'Thèmes Théâtraux & Pyrotechniques',
        description: "Les paroles se concentrent sur des sujets sombres, macabres, ou des contes tordus, avec une imagerie théâtrale forte évoquant le feu et l'interdit.",
        promptInstruction: "L'ambiance doit être sombre et théâtrale, évoquant un spectacle pyrotechnique. Les thèmes lyriques sont macabres et provocateurs.",
        lyricInstruction: "Les paroles doivent raconter une histoire sombre ou un conte déformé, en utilisant une imagerie puissante et souvent dérangeante."
      }
    ]
  },
  {
    name: 'Rosalía',
    genres: 'Flamenco Pop, Alternative R&B, Spanish',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'flamenco-vocal-runs',
        name: 'Vocalises Flamenco & Palmas',
        description: "Incorpore des mélismes et des runs vocaux complexes inspirés du flamenco, souvent accompagnés de claquements de mains rythmiques (palmas).",
        promptInstruction: "Le prompt doit décrire une production pop ou R&B moderne fusionnée avec des éléments de flamenco, mettant en vedette une voix féminine virtuose avec des mélismes et des 'vocal runs' complexes. Inclure des claquements de mains rythmiques (palmas).",
        lyricInstruction: "Inclus des passages de vocalisations complexes et des ad-libs inspirés du flamenco. Marque ces sections avec [flamenco-run]."
      }
    ]
  },
  {
    name: 'My Chemical Romance',
    genres: 'Emo, Pop-Punk, Alternative Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'emo-rock-opera',
        name: 'Opéra Rock Emo',
        description: "Une performance vocale dramatique et théâtrale, avec des paroles narratives sur des thèmes comme la vie, la mort et le défi, passant de la vulnérabilité à des cris puissants.",
        promptInstruction: "Le prompt doit décrire un hymne de rock alternatif avec une structure d'opéra-rock, des guitares puissantes et une performance vocale masculine très dramatique et expressive, qui monte en crescendo.",
        lyricInstruction: "Les paroles doivent raconter une histoire conceptuelle sur des personnages marginaux, avec des refrains hymniques et des ponts émotionnellement intenses."
      }
    ]
  },
  {
    name: 'Sigur Rós',
    genres: 'Post-Rock, Ambient, Icelandic',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'hopelandic-ethereal-soundscape',
        name: "Paysage Sonore Éthéré & 'Hopelandic'",
        description: "Un son éthéré et atmosphérique avec une guitare jouée à l'archet, des arrangements orchestraux et une voix de fausset chantant en islandais ou dans un langage inventé ('Hopelandic').",
        promptInstruction: "Le prompt doit décrire un paysage sonore post-rock éthéré et cinématique, avec une guitare jouée à l'archet créant des textures planantes, des cordes, un piano et une voix de fausset masculine.",
        lyricInstruction: "Les paroles peuvent être en islandais ou des syllabes sans signification (style 'Hopelandic'), se concentrant sur l'émotion plutôt que sur le sens littéral."
      }
    ]
  },
  {
    name: 'J Dilla',
    genres: 'Instrumental Hip Hop, Jazz Rap, Soul',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'off-kilter-drum-groove',
        name: 'Groove de Batterie Désynchronisé',
        description: "Un style de batterie hip-hop unique, intentionnellement désynchronisé et 'humain' ('drunk drumming'), combiné avec des samples de soul et de jazz découpés.",
        promptInstruction: "Le prompt doit décrire un beat hip-hop instrumental avec une batterie 'off-kilter' ou 'unquantized' qui crée un groove décontracté et signature. Utilise des samples de soul et de jazz chaleureux.",
        lyricInstruction: "Principalement instrumental. Les passages vocaux sont des samples courts et hachés."
      }
    ]
  },
  {
    name: 'Nujabes',
    genres: 'Lo-fi Hip Hop, Jazz Hop, Japanese',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'jazz-hop-piano-loops',
        name: 'Boucles de Piano Jazz Hop',
        description: "Un son hip-hop doux et mélancolique construit autour de boucles de piano et de saxophone mélodiques samplées à partir de disques de jazz.",
        promptInstruction: "Le prompt doit décrire un beat de jazz hop ou lo-fi hip-hop, avec une boucle de piano mélodique et mélancolique, une batterie boom-bap douce et parfois un sample de saxophone.",
        lyricInstruction: "Principalement instrumental, mais peut inclure des couplets de rap conscients et poétiques."
      }
    ]
  },
  {
    name: 'Fela Kuti',
    genres: 'Afrobeat, Funk, Jazz',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'afrobeat-polyrhythms',
        name: 'Polyrhythmies Afrobeat & Section de Cuivres',
        description: "Des chansons longues et improvisées avec des polyrythmies complexes, une section de cuivres massive et des paroles politiques en Pidgin nigérian.",
        promptInstruction: "Le prompt doit décrire un long morceau d'afrobeat avec une section rythmique polyrythmique, une section de cuivres puissante jouant des riffs répétitifs, et un orgue électrique.",
        lyricInstruction: "Les paroles doivent être des commentaires politiques et sociaux, souvent sous forme d'appel et réponse avec des chœurs."
      }
    ]
  },
  {
    name: 'Anderson .Paak',
    genres: 'Funk, Soul, Hip Hop, R&B',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'raspy-soulful-rap-singing',
        name: 'Chant/Rap Soul Éraillé',
        description: "Une voix éraillée et pleine d'âme qui passe sans effort du rap au chant, souvent tout en jouant de la batterie.",
        promptInstruction: "Le prompt doit décrire une production funk/soul live avec une voix masculine éraillée et charismatique qui alterne entre un flow de rap rythmé et un chant soul puissant.",
        lyricInstruction: "Alterne les sections de rap et de chant de manière fluide. Les paroles sont souvent sur l'amour, la fête et la vie en Californie."
      }
    ]
  },
  {
    name: 'Thundercat',
    genres: 'Jazz Fusion, Funk, R&B',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'virtuoso-bass-falsetto',
        name: 'Basse Virtuose & Falsetto',
        description: "Des lignes de basse à 6 cordes complexes et mélodiques qui agissent comme l'instrument principal, accompagnées d'une voix de fausset douce.",
        promptInstruction: "Le prompt doit décrire un morceau de jazz fusion / funk mené par une ligne de basse virtuose et très mélodique, avec une voix masculine douce en fausset.",
        lyricInstruction: "Les paroles peuvent être excentriques, humoristiques ou introspectives, avec une livraison vocale douce en fausset."
      }
    ]
  },
  {
    name: 'Bad Bunny',
    genres: 'Reggaeton, Latin Trap, Spanish',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'deep-slurred-vocal-style',
        name: 'Voix Grave & Flow Traînant',
        description: "Un style vocal grave, traînant et presque marmonné qui est devenu une signature du reggaeton et du latin trap modernes.",
        promptInstruction: "Le prompt doit décrire un beat de reggaeton ou de latin trap avec une voix masculine grave et traînante (slurred delivery).",
        lyricInstruction: "Les paroles doivent être en espagnol, sur des thèmes de fête, de chagrin d'amour ou de commentaire social, livrées avec une cadence nonchalante."
      }
    ]
  },
  {
    name: 'Woodkid',
    genres: 'Neoclassical, Indie Pop, Baroque Pop',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'epic-orchestral-percussion',
        name: 'Percussions Épiques & Arrangements Orchestraux',
        description: "Un son cinématique et massif construit sur des percussions puissantes (timbales, tambours de marche), des sections de cuivres et des cordes, avec une voix de baryton dramatique.",
        promptInstruction: "Le prompt doit décrire un morceau néoclassique ou indie pop avec des percussions militaires puissantes, une section de cuivres proéminente, et une voix de baryton masculine dramatique.",
        lyricInstruction: "Les paroles doivent être épiques et métaphoriques, souvent sur des thèmes de combat, de fuite ou de résilience."
      }
    ]
  },
  {
    name: 'Interpol',
    genres: 'Post-Punk Revival, Indie Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'post-punk-baritone-angular-guitars',
        name: 'Baryton Post-Punk & Guitares Angulaires',
        description: "Une voix de baryton détachée et mélancolique sur des lignes de guitare entrelacées, angulaires et pleines de réverbération.",
        promptInstruction: "Le prompt doit décrire un morceau de post-punk revival avec deux guitares électriques jouant des lignes mélodiques entrelacées avec beaucoup de réverbération, une ligne de basse proéminente et une voix de baryton masculine, grave et détachée.",
        lyricInstruction: "Les paroles doivent être cryptiques, sombres et poétiques, avec une imagerie urbaine."
      }
    ]
  },
  {
    name: 'Yeah Yeah Yeahs',
    genres: 'Indie Rock, Garage Punk, Art Punk',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'art-punk-vocal-hiccups',
        name: 'Hoquets Vocaux Art-Punk',
        description: "Une performance vocale féminine charismatique et chaotique, pleine de hoquets, de cris et de chuchotements, sur des riffs de garage punk bruts.",
        promptInstruction: "Le prompt doit décrire un morceau de garage punk avec une voix féminine très expressive et versatile, passant de chuchotements sensuels à des cris perçants, avec des hoquets vocaux signature.",
        lyricInstruction: "La livraison vocale doit être pleine d'attitude. Les paroles peuvent alterner entre des thèmes de désir brut et de vulnérabilité. Incorpore des changements de dynamique vocale."
      }
    ]
  },
  {
    name: 'James Blake',
    genres: 'Electronic, Art Pop, Soul',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'minimalist-dubstep-soul',
        name: 'Soul Minimaliste & Basses Dubstep',
        description: "Une production électronique minimaliste avec des basses profondes (sub-bass) inspirées du dubstep, un piano épars et des voix soulful superposées.",
        promptInstruction: "Le prompt doit décrire un morceau électronique minimaliste avec un piano mélancolique, une sub-bass profonde, et une voix masculine émotive et superposée en harmonies.",
        lyricInstruction: "Les paroles doivent être introspectives et émotionnelles, avec beaucoup d'espace dans la livraison vocale."
      }
    ]
  },
  {
    name: 'FKA twigs',
    genres: 'Art Pop, Electronic, Trip Hop',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'deconstructed-glitch-pop',
        name: 'Glitch Pop Déconstruite',
        description: "Une production électronique expérimentale avec des rythmes déconstruits et 'glitchy', des sons industriels et une voix de soprano délicate et éthérée.",
        promptInstruction: "Le prompt doit décrire un morceau d'art pop expérimental avec des rythmes 'glitchy' et des textures sonores industrielles, contrastant avec une voix féminine soprano, douce et aérienne.",
        lyricInstruction: "Les paroles doivent être abstraites et vulnérables, avec une livraison vocale fragile et pleine de souffle."
      }
    ]
  },
  {
    name: 'Lorde',
    genres: 'Art Pop, Indie Pop, Electropop',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'minimalist-vocal-layers',
        name: 'Production Minimaliste & Voix Superposées',
        description: "Un son pop minimaliste avec des rythmes hip-hop discrets, des synthés atmosphériques et des harmonies vocales riches et superposées.",
        promptInstruction: "Le prompt doit décrire une production pop minimaliste et atmosphérique, avec des voix féminines superposées en harmonies complexes dans les refrains.",
        lyricInstruction: "Les paroles doivent être introspectives, sur la jeunesse et la célébrité. Le refrain doit comporter des harmonies vocales."
      }
    ]
  },
  {
    name: 'Paramore',
    genres: 'Pop-Punk, Emo, Alternative Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'powerful-emo-vocals',
        name: 'Voix Emo Puissante',
        description: "Une performance vocale féminine puissante et pleine d'émotion sur des hymnes pop-punk ou rock alternatif énergiques.",
        promptInstruction: "Le prompt doit décrire un morceau pop-punk/rock avec des guitares énergiques et une voix féminine principale puissante, capable de notes hautes et d'une grande expressivité émotionnelle.",
        lyricInstruction: "Les paroles doivent exprimer l'angoisse, la colère ou la résilience, avec des refrains faits pour être chantés à tue-tête."
      }
    ]
  },
  {
    name: 'Grimes',
    genres: 'Art Pop, Electronic, Dream Pop',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'ethereal-synth-pop',
        name: 'Synth-Pop Éthérée & Voix Aiguë',
        description: "Une voix de soprano éthérée et enfantine sur des productions électroniques éclectiques, mêlant synth-pop, R&B et noise.",
        promptInstruction: "Le prompt doit décrire un paysage sonore électronique et onirique (dream pop), avec une voix féminine aiguë et éthérée, traitée avec de la réverbération.",
        lyricInstruction: "Les paroles doivent être abstraites, souvent sur des thèmes de science-fiction ou de fantasy."
      }
    ]
  },
  {
    name: 'Charli XCX',
    genres: 'Hyperpop, Electropop, Dance-pop',
    suggestedStructureValue: 'edm-dance-drop',
    specialTraits: [
      {
        id: 'hyperpop-production',
        name: 'Production Hyperpop',
        description: "Un son pop futuriste et expérimental avec des voix auto-tunées, des synthés métalliques et des percussions abrasives.",
        promptInstruction: "Le prompt doit décrire une production hyperpop avec des voix fortement auto-tunées, des percussions métalliques et des sound design industriels.",
        lyricInstruction: "Les paroles doivent porter sur la fête, l'amour et la culture internet, avec une livraison vocale énergique."
      }
    ]
  },
  {
    name: 'Carly Rae Jepsen',
    genres: 'Pop, Synth-pop',
    suggestedStructureValue: 'pop-full-prechorus',
    specialTraits: [
      {
        id: 'joyful-80s-synth-pop',
        name: 'Synth-Pop Joyeuse années 80',
        description: "Un son synth-pop euphorique inspiré des années 80, avec des refrains massifs et des paroles sincères sur l'amour.",
        promptInstruction: "Le prompt doit décrire un morceau de synth-pop des années 80 avec un saxophone, une batterie 'gated reverb' et un refrain euphorique et accrocheur.",
        lyricInstruction: "Les paroles doivent être optimistes et sincères sur l'amour et le désir."
      }
    ]
  },
  {
    name: 'Kacey Musgraves',
    genres: 'Country, Pop, Psychedelic',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'progressive-country-pop',
        name: 'Country-Pop Progressive',
        description: "Mélange des instruments country traditionnels (guitare acoustique, pedal steel) avec des éléments pop et disco, et des paroles spirituelles et progressistes.",
        promptInstruction: "Le prompt doit décrire une fusion de country et de disco-pop, avec des paroles intelligentes et observatrices.",
        lyricInstruction: "Les paroles doivent être pleines d'esprit, souvent avec une touche de critique sociale ou d'introspection."
      }
    ]
  },
  {
    name: 'St. Vincent',
    genres: 'Art Rock, Indie Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'angular-guitar-virtuosity',
        name: 'Guitare Virtuose & Angulaire',
        description: "Des riffs et des solos de guitare complexes, dissonants et 'angulaires', combinés à une performance vocale théâtrale.",
        promptInstruction: "Le prompt doit décrire un morceau d'art rock avec des riffs de guitare virtuoses et non conventionnels, et une voix féminine théâtrale.",
        lyricInstruction: "Les paroles doivent être intelligentes, souvent sur des thèmes de pouvoir, de technologie et de société."
      }
    ]
  },
  {
    name: 'Sufjan Stevens',
    genres: 'Indie Folk, Baroque Pop, Electronic',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'baroque-folk-orchestration',
        name: 'Folk Baroque & Arrangements Orchestaux',
        description: "Une voix douce et murmurée sur des arrangements complexes mêlant instruments folk et orchestrations baroques (cordes, cuivres, chœurs).",
        promptInstruction: "Le prompt doit décrire un morceau de folk orchestral avec des arrangements complexes, et une voix masculine douce et murmurée.",
        lyricInstruction: "Les paroles doivent être poétiques et profondément personnelles, souvent sur des thèmes de foi, de famille et de perte."
      }
    ]
  },
  {
    name: 'Arcade Fire',
    genres: 'Indie Rock, Art Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'anthemic-gang-vocals',
        name: 'Hymnes Rock & Chœurs Puissants',
        description: "Des hymnes indie rock grandioses qui montent en crescendo, avec des chœurs fédérateurs ('gang vocals') et une large instrumentation.",
        promptInstruction: "Le prompt doit décrire un hymne indie rock avec un crescendo puissant et des chœurs de groupe dans le refrain.",
        lyricInstruction: "Les paroles doivent être passionnées sur des thèmes sociaux ou de la jeunesse, avec un refrain fait pour être chanté par une foule."
      }
    ]
  },
  {
    name: 'The xx',
    genres: 'Indie Pop, Dream Pop, Minimalist',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'minimalist-duet-pop',
        name: 'Pop Minimaliste en Duo',
        description: "Un son minimaliste avec des guitares épurées et pleines de réverbération, une basse proéminente et des duos vocaux masculins/féminins intimes.",
        promptInstruction: "Le prompt doit décrire un morceau d'indie pop minimaliste, avec une guitare 'reverberante' et un duo vocal intime.",
        lyricInstruction: "Les paroles doivent être des conversations intimes sur l'amour et la perte, avec des lignes échangées entre une voix masculine et féminine."
      }
    ]
  },
  {
    name: 'alt-J',
    genres: 'Indie Rock, Art Rock',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'quirky-vocal-harmonies',
        name: 'Voix Nasillarde & Harmonies Étranges',
        description: "Une voix principale nasillarde et unique, des harmonies vocales inhabituelles, des rythmes complexes et des paroles cryptiques.",
        promptInstruction: "Le prompt doit décrire un morceau d'indie rock avec une voix masculine nasillarde distinctive et des harmonies vocales complexes.",
        lyricInstruction: "Les paroles doivent être abstraites, avec des références littéraires ou historiques."
      }
    ]
  },
  {
    name: 'Glass Animals',
    genres: 'Psychedelic Pop, Indie Rock',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'psychedelic-narrative-pop',
        name: 'Pop Psychédélique & Narrative',
        description: "Un son pop psychédélique avec des rythmes hip-hop 'collants', des textures sonores exotiques et des paroles qui racontent des histoires excentriques.",
        promptInstruction: "Le prompt doit décrire un beat de pop psychédélique avec une voix masculine douce et des paroles narratives.",
        lyricInstruction: "Les paroles doivent raconter une histoire détaillée du point de vue d'un personnage étrange."
      }
    ]
  },
  {
    name: 'Phoebe Bridgers',
    genres: 'Indie Folk, Emo',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'melancholic-double-tracked-vocals',
        name: 'Voix Doublées & Mélancolie',
        description: "Une voix douce et murmurée, souvent doublée, qui livre des paroles profondément personnelles et mélancoliques sur des arrangements folk minimalistes qui explosent parfois en crescendos rock.",
        promptInstruction: "Le prompt doit décrire un morceau d'indie folk avec des voix féminines douces et doublées, et un crescendo final avec des cuivres et de la batterie.",
        lyricInstruction: "Les paroles doivent être des observations poétiques et souvent sombres sur la vie, la mort et l'amour."
      }
    ]
  },
  {
    name: 'boygenius',
    genres: 'Indie Rock, Singer-Songwriter',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'three-part-harmony-rock',
        name: 'Harmonies à Trois Voix',
        description: "Combine trois voix de chanteuses-compositrices distinctes en harmonies complexes et émouvantes.",
        promptInstruction: "Le prompt doit décrire un morceau de rock indépendant avec des harmonies à trois voix féminines proéminentes.",
        lyricInstruction: "Les paroles doivent être une collaboration entre trois perspectives, avec des harmonies riches dans les refrains."
      }
    ]
  },
  {
    name: 'Hozier',
    genres: 'Indie Rock, Soul, Blues',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'gospel-blues-baritone',
        name: 'Baryton Blues & Chœurs Gospel',
        description: "Une voix de baryton puissante et pleine d'âme avec des chœurs gospel, sur un fond de blues-rock avec des paroles littéraires.",
        promptInstruction: "Le prompt doit décrire un morceau de blues-rock avec une voix masculine de baryton puissante et des chœurs gospel.",
        lyricInstruction: "Les paroles doivent être poétiques avec des thèmes religieux et romantiques."
      }
    ]
  },
  {
    name: 'King Krule',
    genres: 'Punk Jazz, Darkwave, Trip Hop',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'guttural-baritone-jazz-chords',
        name: 'Baryton Guttural & Accords Jazz',
        description: "Une voix de baryton grave et gutturale sur une instrumentation qui mélange des accords de jazz, des guitares post-punk et des rythmes hip-hop.",
        promptInstruction: "Le prompt doit décrire un morceau de punk jazz sombre avec une voix masculine de baryton grave et éraillée.",
        lyricInstruction: "Les paroles doivent être des portraits sombres et poétiques de la vie urbaine."
      }
    ]
  },
  {
    name: 'Mac DeMarco',
    genres: 'Indie Rock, Slacker Rock',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'chorus-guitar-slacker-rock',
        name: 'Guitare "Chorus" & Slacker Rock',
        description: "Un son lo-fi avec des guitares électriques au son 'chorus' distinctif, une ligne de basse simple et une voix décontractée et nonchalante.",
        promptInstruction: "Le prompt doit décrire un morceau de 'slacker rock' avec une guitare électrique avec un effet chorus, et une voix masculine décontractée.",
        lyricInstruction: "Les paroles doivent être simples, sur la vie de tous les jours, l'amour ou les cigarettes."
      }
    ]
  },
  {
    name: 'Beach House',
    genres: 'Dream Pop, Shoegaze',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'dream-pop-organ-slide-guitar',
        name: 'Orgue Dream Pop & Guitare Slide',
        description: "Un son dream pop hypnotique avec des mélodies d'orgue vintage, des lignes de guitare slide éthérées et une voix de contralto envoûtante.",
        promptInstruction: "Le prompt doit décrire un morceau de dream pop avec un orgue, une guitare slide et une voix féminine éthérée.",
        lyricInstruction: "Les paroles doivent être abstraites et rêveuses, sur des thèmes d'amour et de perte."
      }
    ]
  },
  {
    name: 'Death Grips',
    genres: 'Experimental Hip Hop, Industrial Hip Hop',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'abrasive-industrial-rap',
        name: 'Rap Industriel & Abrasif',
        description: "Une production électronique abrasive et chaotique avec une batterie live agressive et un chant/rap crié et intense.",
        promptInstruction: "Le prompt doit décrire un morceau de hip-hop industriel avec une production bruitiste et une voix masculine criée.",
        lyricInstruction: "Les paroles doivent être cryptiques, agressives et anarchiques."
      }
    ]
  },
  {
    name: 'Earl Sweatshirt',
    genres: 'Abstract Hip Hop, Lo-fi Hip Hop',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'abstract-dense-rhymes',
        name: 'Rimes Denses & Abstraites',
        description: "Un flow de rap complexe et dense, avec des rimes internes et des paroles introspectives et abstraites, sur des beats lo-fi et déconstruits.",
        promptInstruction: "Le prompt doit décrire un beat de hip-hop lo-fi et abstrait, avec un flow de rap complexe et introspectif.",
        lyricInstruction: "Les paroles doivent être denses et poétiques, sur des thèmes de dépression et d'aliénation."
      }
    ]
  },
  {
    name: 'Playboi Carti',
    genres: 'Trap, Mumble Rap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'baby-voice-adlibs',
        name: 'Ad-libs & "Baby Voice"',
        description: "Un flow minimaliste et répétitif avec un usage intensif d'ad-libs et une livraison vocale aiguë et nasillarde, style 'baby voice'.",
        promptInstruction: "Le prompt doit décrire un beat trap hypnotique et minimaliste, avec une voix aiguë et beaucoup d'ad-libs.",
        lyricInstruction: "Concentre-toi sur les ad-libs ('What!', 'Slatt!') et un flow répétitif. Inclus une section avec une voix 'baby voice'."
      }
    ]
  },
  {
    name: 'Young Thug',
    genres: 'Trap, Experimental Hip Hop',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'unpredictable-vocal-delivery',
        name: 'Livraison Vocale Imprévisible',
        description: "Un flow de rap très mélodique et expérimental, avec des changements de ton soudains, des cris, des marmonnements et des inflexions vocales uniques.",
        promptInstruction: "Le prompt doit décrire un beat trap moderne, avec une performance vocale masculine très excentrique et imprévisible.",
        lyricInstruction: "La livraison doit être mélodique mais non conventionnelle, en jouant avec la hauteur et le rythme de la voix."
      }
    ]
  },
  {
    name: 'Action Bronson',
    genres: 'East Coast Hip Hop',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'culinary-rap-references',
        name: 'Rap Culinaire & Références Obscures',
        description: "Un flow charismatique avec des paroles pleines de références à la nourriture gastronomique, au sport et à la culture pop des années 80/90.",
        promptInstruction: "Le prompt doit décrire un beat de hip-hop boom-bap avec des samples de soul, et un flow de rap charismatique.",
        lyricInstruction: "Les paroles doivent être pleines de références culinaires et de culture pop."
      }
    ]
  },
  {
    name: 'Ghostface Killah',
    genres: 'East Coast Hip Hop, Hardcore Hip Hop',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'stream-of-consciousness-rap',
        name: 'Rap en Flux de Conscience',
        description: "Un flow de rap énergique et légèrement décalé qui raconte des histoires criminelles de manière abstraite et en flux de conscience.",
        promptInstruction: "Le prompt doit décrire un beat de hip-hop hardcore avec des samples de soul, et un flow de rap énergique et narratif.",
        lyricInstruction: "Les paroles doivent être une narration abstraite et dense, pleine d'argot et d'images vives."
      }
    ]
  },
  {
    name: 'JPEGMAFIA',
    genres: 'Experimental Hip Hop, Industrial Rap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'glitch-political-rap',
        name: 'Rap Politique & Glitchy',
        description: "Une production électronique glitchy et abrasive avec un flow qui alterne entre chant auto-tuné et rap agressif, avec des paroles satiriques et politiques.",
        promptInstruction: "Le prompt doit décrire un beat hip-hop expérimental et 'glitchy', avec une livraison vocale versatile et des thèmes politiques.",
        lyricInstruction: "Les paroles doivent être satiriques, pleines de références à la culture internet et de critiques sociales."
      }
    ]
  },
  {
    name: 'Poppy',
    genres: 'Nu Metal, Electropop, Industrial',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'pop-metal-juxtaposition',
        name: 'Juxtaposition Pop & Metal',
        description: "Alterne de manière abrupte entre des couplets de pop sucrée avec une voix enfantine et des refrains de nu-metal agressifs avec des guitares lourdes et des cris.",
        promptInstruction: "Le prompt doit décrire une chanson qui alterne entre des couplets électropop et des refrains nu-metal, avec une voix qui change radicalement de style.",
        lyricInstruction: "Écris des couplets avec des paroles pop innocentes et des refrains avec des paroles agressives. Marque les sections metal avec [scream-vocals]."
      }
    ]
  },
  {
    name: 'Lingua Ignota',
    genres: 'Neoclassical Darkwave, Industrial',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'operatic-noise',
        name: 'Opéra & Bruit Industriel',
        description: "Combine une voix d'opéra d'une formation classique avec des paysages sonores de bruit industriel, des pianos puissants et des passages de cris extrêmes.",
        promptInstruction: "Le prompt doit décrire une fusion de musique classique (opéra, piano) et de bruit industriel, avec une voix féminine passant de l'opéra à des cris perçants.",
        lyricInstruction: "Les paroles doivent être des explorations brutales de la survie et de la vengeance, avec une imagerie religieuse et violente."
      }
    ]
  },
  {
    name: 'Swans',
    genres: 'Post-Rock, No Wave, Industrial Rock',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'drone-rock-crescendo',
        name: 'Crescendo Drone Rock',
        description: "Des chansons longues et hypnotiques construites sur des grooves répétitifs et des drones instrumentaux qui montent en intensité jusqu'à un climax sonore écrasant.",
        promptInstruction: "Le prompt doit décrire un morceau de post-rock / no wave qui est long, répétitif et qui monte en un crescendo de bruit.",
        lyricInstruction: "Les paroles sont souvent des mantras répétés, livrés avec une voix de baryton autoritaire."
      }
    ]
  },
  {
    name: 'Godspeed You! Black Emperor',
    genres: 'Post-Rock',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'orchestral-post-rock-samples',
        name: 'Post-Rock Orchestral & Samples',
        description: "De longues compositions instrumentales avec une dynamique orchestrale, des crescendos massifs et l'utilisation de samples de field recordings et de monologues parlés.",
        promptInstruction: "Le prompt doit décrire un morceau de post-rock instrumental, long, avec des cordes, des guitares et des crescendos épiques, incluant des samples de voix parlée.",
        lyricInstruction: "Principalement instrumental, mais peut inclure des passages de [spoken-word-sample] avec un ton politique ou apocalyptique."
      }
    ]
  },
  {
    name: 'Cocteau Twins',
    genres: 'Dream Pop, Ethereal Wave',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'ethereal-glossolalia',
        name: 'Glossolalie & Guitares Scintillantes',
        description: "Une voix de soprano éthérée et angélique chantant des paroles souvent inintelligibles (glossolalie) sur un lit de guitares scintillantes, traitées avec du chorus et du delay.",
        promptInstruction: "Le prompt doit décrire un morceau de dream pop avec des guitares 'chorusy' et une voix de soprano angélique et pleine de réverbération.",
        lyricInstruction: "Les paroles doivent être abstraites et phonétiques, se concentrant sur le son plutôt que sur le sens."
      }
    ]
  },
  // Indie/Alternative
  {
    name: 'The War on Drugs',
    genres: 'Heartland Rock, Indie Rock, Americana',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'driving-americana-rock',
        name: 'Rock Americana Ambiant',
        description: "Un son rock propulsif avec des couches de guitares et de synthés créant une atmosphère planante et nostalgique.",
        promptInstruction: "Le prompt doit décrire un morceau de heartland rock avec une batterie motorik, des guitares en couches et des nappes de synthétiseurs ambiants pour une sensation de voyage sur l'autoroute.",
        lyricInstruction: "Les paroles doivent être impressionnistes, sur des thèmes de la mémoire, de la route et de la perte."
      }
    ]
  },
  {
    name: 'Fleet Foxes',
    genres: 'Indie Folk, Baroque Pop',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'reverb-drenched-harmonies',
        name: 'Harmonies Folk & Réverbération',
        description: "Des harmonies vocales complexes et luxuriantes, noyées dans la réverbération, créant un son choral et éthéré.",
        promptInstruction: "Le prompt doit spécifier des harmonies vocales masculines riches et complexes, avec une réverbération ample (type cathédrale), sur une instrumentation folk acoustique.",
        lyricInstruction: "Les paroles doivent être poétiques, avec des images pastorales et naturelles. Le refrain doit mettre en avant des harmonies à plusieurs voix."
      }
    ]
  },
  {
    name: 'MGMT',
    genres: 'Psychedelic Pop, Synth-pop',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'catchy-psych-synths',
        name: 'Synthés Psychédéliques Accrocheurs',
        description: "Des mélodies de synthétiseurs excentriques et très accrocheuses sur des rythmes de pop psychédélique.",
        promptInstruction: "Le prompt doit décrire un morceau de synth-pop psychédélique avec des mélodies de synthétiseur entraînantes et des paroles surréalistes.",
        lyricInstruction: "Les paroles doivent être surréalistes et ludiques, sur la jeunesse et la société."
      }
    ]
  },
  {
    name: 'Father John Misty',
    genres: 'Indie Rock, Folk',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'cynical-orchestral-folk',
        name: 'Folk Orchestral & Cynisme',
        description: "Une voix de ténor suave sur des arrangements folk orchestraux luxuriants, livrant des paroles cyniques, spirituelles et narratives.",
        promptInstruction: "Le prompt doit décrire un arrangement folk luxuriant avec des cordes et des cuivres, et une voix de ténor masculine charismatique et théâtrale.",
        lyricInstruction: "Les paroles doivent être une satire sociale ou une narration introspective, pleine d'ironie et d'esprit."
      }
    ]
  },
  {
    name: 'Car Seat Headrest',
    genres: 'Indie Rock, Lo-fi',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'lofi-anxious-monologue',
        name: 'Monologue Anxieux & Lo-fi',
        description: "Un son indie rock lo-fi avec de longues sections narratives, presque des monologues, sur l'anxiété et la post-adolescence.",
        promptInstruction: "Le prompt doit décrire un son de rock indépendant lo-fi, avec une performance vocale masculine anxieuse et verbeuse.",
        lyricInstruction: "Les paroles doivent être de longs monologues introspectifs, pleins de références culturelles et d'auto-dépréciation."
      }
    ]
  },
  {
    name: 'Clairo',
    genres: 'Bedroom Pop, Lo-fi, Indie Pop',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'bedroom-pop-vulnerability',
        name: 'Bedroom Pop & Vulnérabilité',
        description: "Une voix douce et intime sur des productions lo-fi et minimalistes, créant une atmosphère de 'bedroom pop' sincère.",
        promptInstruction: "Le prompt doit décrire une production de bedroom pop lo-fi avec une voix féminine douce, murmurée et vulnérable.",
        lyricInstruction: "Les paroles doivent être directes et personnelles, sur l'amour, l'anxiété et la découverte de soi."
      }
    ]
  },

  // Hip-Hop/R&B
  {
    name: 'BROCKHAMPTON',
    genres: 'Alternative Hip Hop, Boy band',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'rap-collective-dynamics',
        name: 'Dynamique de Collectif de Rap',
        description: "Plusieurs rappeurs avec des styles et des voix distincts qui s'échangent les couplets, combinés à des refrains pop auto-tunés.",
        promptInstruction: "Le prompt doit décrire un morceau de hip-hop alternatif avec plusieurs voix de rappeurs distinctes et des refrains pop auto-tunés.",
        lyricInstruction: "Écris des couplets pour plusieurs rappeurs aux styles variés, avec des thèmes sur l'amitié, la santé mentale et l'identité."
      }
    ]
  },
  {
    name: 'Noname',
    genres: 'Conscious Hip Hop, Neo Soul, Spoken Word',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'spoken-word-jazz-rap',
        name: 'Spoken Word & Jazz Rap',
        description: "Un flow conversationnel et poétique, proche du spoken word, sur des productions neo-soul et jazz live.",
        promptInstruction: "Le prompt doit décrire un beat de jazz rap live avec une performance vocale féminine conversationnelle et poétique.",
        lyricInstruction: "Les paroles doivent être des observations sociales et politiques, livrées avec un flow doux et rythmé."
      }
    ]
  },
  {
    name: 'Smino',
    genres: 'Hip Hop, Funk, Neo Soul',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'funky-melodic-rap',
        name: 'Rap Funky & Mélodique',
        description: "Un flow de rap très élastique et mélodique avec des inflexions soul, sur des beats funky et futuristes.",
        promptInstruction: "Le prompt doit décrire un beat hip-hop funky, avec un flow de rap masculin très mélodique et plein de personnalité.",
        lyricInstruction: "Les paroles doivent être pleines de jeux de mots et d'argot, avec un flow qui joue avec la mélodie."
      }
    ]
  },
  {
    name: 'D\'Angelo',
    genres: 'Neo Soul, R&B, Funk',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'laid-back-soul-harmonies',
        name: 'Harmonies Soul & Groove "Laid-back"',
        description: "Des harmonies vocales complexes et superposées, une voix principale suave et un groove de basse et de batterie intentionnellement 'en retard' ('behind the beat').",
        promptInstruction: "Le prompt doit décrire un groove neo-soul 'laid-back' avec un piano Rhodes, et des harmonies vocales masculines riches et complexes.",
        lyricInstruction: "Les paroles doivent porter sur des thèmes de sensualité et de spiritualité."
      }
    ]
  },
  {
    name: 'Erykah Badu',
    genres: 'Neo Soul, R&B',
    suggestedStructureValue: 'aaba-classic',
    specialTraits: [
      {
        id: 'eccentric-jazz-phrasing',
        name: 'Phrasé Jazz Excentrique',
        description: "Une voix soul distinctive avec un phrasé imprévisible et inspiré du jazz, sur des productions neo-soul organiques.",
        promptInstruction: "Le prompt doit décrire un beat neo-soul avec une instrumentation live, et une voix féminine avec un phrasé jazz unique.",
        lyricInstruction: "Les paroles doivent être spirituelles, conscientes et poétiques."
      }
    ]
  },
  {
    name: 'Solange',
    genres: 'Art R&B, Neo Soul',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'minimalist-art-rnb',
        name: 'Art R&B Minimaliste',
        description: "Des arrangements R&B minimalistes et atmosphériques avec une voix douce et aérienne, et des paroles sur l'identité et l'autonomisation.",
        promptInstruction: "Le prompt doit décrire un morceau de R&B minimaliste et atmosphérique avec une voix féminine douce et des harmonies éthérées.",
        lyricInstruction: "Les paroles doivent être introspectives et politiques, avec une livraison vocale douce."
      }
    ]
  },
  {
    name: 'The Internet',
    genres: 'R&B, Neo Soul, Funk',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'live-band-funky-rnb',
        name: 'R&B Funky & Groupe Live',
        description: "Un son R&B décontracté avec une instrumentation live, notamment une ligne de basse groovy et des guitares funky.",
        promptInstruction: "Le prompt doit décrire un groove R&B joué par un groupe live, avec une ligne de basse funky proéminente.",
        lyricInstruction: "Les paroles doivent porter sur des thèmes de l'amour et des relations, avec un ton décontracté."
      }
    ]
  },
  {
    name: 'Kaytranada',
    genres: 'Electronic, House, Funk',
    suggestedStructureValue: 'edm-dance-drop',
    specialTraits: [
      {
        id: 'bouncy-house-groove',
        name: 'Groove House Dansant',
        description: "Des rythmes house et funk avec une ligne de basse syncopée et des synthés chaleureux, créant un groove irrésistible.",
        promptInstruction: "Le prompt doit décrire un beat house dansant avec une ligne de basse syncopée et des accords de synthé soulful.",
        lyricInstruction: "Souvent instrumental, ou avec des featurings vocaux R&B."
      }
    ]
  },

  // Rock/Metal
  {
    name: 'Deftones',
    genres: 'Alternative Metal, Shoegaze, Experimental Rock',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'dynamic-scream-whisper',
        name: 'Dynamique Cri/Murmure',
        description: "Une dynamique vocale qui alterne entre des murmures éthérés et des cris intenses, sur des riffs de guitare lourds et atmosphériques.",
        promptInstruction: "Le prompt doit décrire un morceau de metal alternatif avec des guitares lourdes mais atmosphériques, et une voix masculine qui alterne entre chant murmuré et cris perçants.",
        lyricInstruction: "Les paroles doivent être abstraites et poétiques, sur des thèmes de désir et de douleur."
      }
    ]
  },
  {
    name: 'Mastodon',
    genres: 'Progressive Metal, Sludge Metal',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'sludgy-prog-metal-riffs',
        name: 'Riffs Prog-Metal & "Sludgy"',
        description: "Des riffs de guitare complexes et techniques avec un son lourd et 'boueux' (sludgy), combinés à des structures progressives et des vocaux variés.",
        promptInstruction: "Le prompt doit décrire un morceau de metal progressif avec des riffs de guitare complexes et un son lourd et 'sludgy'.",
        lyricInstruction: "Les paroles doivent raconter des histoires conceptuelles épiques, souvent basées sur la mythologie ou la littérature."
      }
    ]
  },
  {
    name: 'A Perfect Circle',
    genres: 'Alternative Rock, Art Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'melodic-atmospheric-rock',
        name: 'Rock Mélodique & Atmosphérique',
        description: "Un son rock mélodique et sombre, avec des guitares texturées et une voix masculine puissante et émotive.",
        promptInstruction: "Le prompt doit décrire un morceau de rock alternatif sombre et atmosphérique, avec une voix masculine mélodique et puissante.",
        lyricInstruction: "Les paroles doivent être introspectives et poétiques, sur des thèmes philosophiques ou politiques."
      }
    ]
  },
  {
    name: 'Queens of the Stone Age',
    genres: 'Stoner Rock, Alternative Rock',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'robot-rock-riffs',
        name: 'Riffs "Robot Rock"',
        description: "Des riffs de guitare staccato, hypnotiques et répétitifs avec un son de guitare unique, sur des rythmes de batterie propulsifs.",
        promptInstruction: "Le prompt doit décrire un morceau de stoner rock avec des riffs de guitare répétitifs et syncopés, et une voix masculine suave.",
        lyricInstruction: "Les paroles doivent être sur des thèmes sombres et désertiques, avec une attitude cool."
      }
    ]
  },
  {
    name: 'Alice in Chains',
    genres: 'Grunge, Alternative Metal',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'dissonant-vocal-harmonies',
        name: 'Harmonies Vocales Dissonantes',
        description: "Des harmonies vocales sombres et dissonantes entre deux voix masculines, sur des riffs de guitare lourds et lents.",
        promptInstruction: "Le prompt doit décrire un morceau de grunge/metal avec des harmonies vocales masculines sombres et dissonantes, et des riffs de guitare lourds.",
        lyricInstruction: "Les paroles doivent porter sur des thèmes sombres comme la dépendance et la dépression."
      }
    ]
  },
  {
    name: 'Slowdive',
    genres: 'Shoegaze, Dream Pop',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'ethereal-reverb-guitars',
        name: 'Guitares Éthérées & Réverbération',
        description: "Des couches de guitares noyées dans la réverbération et le delay, créant des paysages sonores éthérés et rêveurs, avec des voix douces et indistinctes.",
        promptInstruction: "Le prompt doit décrire un morceau de shoegaze avec des guitares très 'reverbérées' et des voix douces et aériennes.",
        lyricInstruction: "Les paroles doivent être abstraites et impressionnistes, se fondant dans la musique."
      }
    ]
  },

  // Pop/Electronic
  {
    name: 'Magdalena Bay',
    genres: 'Synth-pop, Electropop, Indie Pop',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'retro-futuristic-synth-pop',
        name: 'Synth-Pop Rétro-Futuriste',
        description: "Un son synth-pop qui mélange l'esthétique lo-fi du début des années 2000 avec une production pop moderne et des thèmes sur la technologie.",
        promptInstruction: "Le prompt doit décrire un morceau de synth-pop avec une esthétique Y2K, et une voix féminine douce.",
        lyricInstruction: "Les paroles doivent être sur l'existentialisme à l'ère d'internet."
      }
    ]
  },
  {
    name: 'Caroline Polachek',
    genres: 'Art Pop, Electronic',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'operatic-vocal-acrobatics',
        name: 'Acrobaties Vocales Opératiques',
        description: "Une performance vocale virtuose et expérimentale, avec des mélismes de style opératique et des sauts d'octave sur une production pop avant-gardiste.",
        promptInstruction: "Le prompt doit décrire une production d'art pop, avec une voix féminine très technique et opératique.",
        lyricInstruction: "Les paroles doivent être poétiques et surréalistes, avec une livraison vocale pleine de fioritures."
      }
    ]
  },
  {
    name: 'Arca',
    genres: 'Experimental, Electronic, Deconstructed Club',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'deconstructed-club-soundscapes',
        name: 'Paysages Sonores "Deconstructed Club"',
        description: "Des paysages sonores électroniques fracturés et imprévisibles, qui déconstruisent les genres de la musique de club, avec des voix pitchées et traitées.",
        promptInstruction: "Le prompt doit décrire un morceau électronique expérimental et 'glitchy', avec des voix fortement traitées.",
        lyricInstruction: "Les paroles sont souvent en espagnol et portent sur des thèmes de l'identité transgenre et de la transformation."
      }
    ]
  },
  {
    name: 'Caribou',
    genres: 'Electronic, Indie Pop, House',
    suggestedStructureValue: 'edm-dance-drop',
    specialTraits: [
      {
        id: 'melancholic-house-loops',
        name: 'House Mélancolique & Boucles Vocales',
        description: "Combine des rythmes de house et de techno avec des boucles de synthé psychédéliques et des samples vocaux mélancoliques.",
        promptInstruction: "Le prompt doit décrire un morceau de house mélodique avec des boucles de synthé répétitives et des samples vocaux émotifs.",
        lyricInstruction: "Souvent instrumental ou avec des phrases vocales samplées et répétées."
      }
    ]
  },
  {
    name: 'Robyn',
    genres: 'Electropop, Dance-pop, Synth-pop',
    suggestedStructureValue: 'pop-modern-postchorus',
    specialTraits: [
      {
        id: 'cry-on-the-dancefloor',
        name: '"Pleurer sur la Piste de Danse"',
        description: "Des hymnes dance-pop euphoriques avec des paroles profondément mélancoliques et vulnérables, créant un contraste cathartique.",
        promptInstruction: "Le prompt doit décrire un morceau de synth-pop dansant avec une production puissante, mais avec des paroles et une livraison vocale tristes et vulnérables.",
        lyricInstruction: "Les paroles doivent porter sur le chagrin d'amour, mais le refrain doit être musicalement explosif et dansant."
      }
    ]
  },
  {
    name: 'Rina Sawayama',
    genres: 'Pop, R&B, Nu Metal',
    suggestedStructureValue: 'metal-breakdown-solo',
    specialTraits: [
      {
        id: 'nu-metal-pop-fusion',
        name: 'Fusion Pop & Nu-Metal',
        description: "Fusionne de manière audacieuse des refrains de pop des années 2000 avec des riffs de guitare de nu-metal lourds et des éléments de R&B.",
        promptInstruction: "Le prompt doit décrire une fusion de pop Y2K et de nu-metal, avec une voix féminine puissante.",
        lyricInstruction: "Les paroles doivent être sur des thèmes d'identité, de famille et de critique sociale."
      }
    ]
  },

  // Classic/Legacy
  {
    name: 'Tom Waits',
    genres: 'Blues, Experimental, Rock',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'gravelly-voice-junkyard-percussion',
        name: 'Voix Rocailleuse & Percussions de Casse',
        description: "Une voix extrêmement graveleuse et rocailleuse, avec une instrumentation non conventionnelle utilisant des percussions métalliques et des instruments étranges.",
        promptInstruction: "Le prompt doit décrire un morceau de blues expérimental avec une instrumentation 'de casse' (percussions métalliques), et une voix masculine très grave et éraillée.",
        lyricInstruction: "Les paroles doivent raconter des histoires sombres sur des personnages marginaux."
      }
    ]
  },
  {
    name: 'Etta James',
    genres: 'Blues, Soul, R&B',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'raw-powerful-blues-vocals',
        name: 'Voix Blues Puissante & Brute',
        description: "Une performance vocale de contralto puissante, brute et pleine d'émotion, capable de grognements et de cris.",
        promptInstruction: "Le prompt doit décrire un morceau de blues ou de soul, avec une voix féminine de contralto puissante et brute.",
        lyricInstruction: "Les paroles doivent porter sur des thèmes de l'amour, de la douleur et de la résilience."
      }
    ]
  },
  {
    name: 'The Stone Roses',
    genres: 'Alternative Rock, Madchester',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'jangly-psychedelic-rock',
        name: 'Rock Psychédélique & "Jangly"',
        description: "Un son qui mélange des guitares 'jangly' des années 60 avec des rythmes de danse funky ('Madchester') et une attitude rock confiante.",
        promptInstruction: "Le prompt doit décrire un morceau de rock alternatif avec des guitares 'jangly' et une section rythmique funky.",
        lyricInstruction: "Les paroles doivent être arrogantes et pleines d'assurance."
      }
    ]
  },
  {
    name: 'Nick Cave & The Bad Seeds',
    genres: 'Post-Punk, Alternative Rock',
    suggestedStructureValue: 'cash-narrative-crescendo',
    specialTraits: [
      {
        id: 'gothic-narrative-baritone',
        name: 'Baryton Gothique & Narratif',
        description: "Une voix de baryton théâtrale et sombre qui raconte des histoires intenses sur l'amour, la mort et la religion, sur des arrangements post-punk ou des ballades au piano.",
        promptInstruction: "Le prompt doit décrire un morceau de rock gothique ou une ballade au piano, avec une voix masculine de baryton narrative et dramatique.",
        lyricInstruction: "Les paroles doivent raconter une histoire sombre et poétique."
      }
    ]
  },
  // Jazz & Fusion
  {
    name: 'Miles Davis',
    genres: 'Jazz, Cool Jazz, Jazz Fusion',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'cool-jazz-trumpet',
        name: 'Trompette Cool Jazz & Espace',
        description: "Un son de trompette feutré et mélancolique avec beaucoup d'espace entre les notes, typique du cool jazz.",
        promptInstruction: "Le prompt doit décrire un morceau de cool jazz avec une trompette solo jouée avec une sourdine (Harmon mute), créant un son feutré et intime, avec beaucoup de silence et d'espace.",
        lyricInstruction: "La chanson doit être principalement instrumentale, laissant la place à de longs solos de trompette. Les paroles, si présentes, doivent être minimalistes et poétiques."
      },
      {
        id: 'electric-fusion-funk',
        name: 'Funk-Fusion Électrique',
        description: "Un son de jazz fusion psychédélique et funky des années 70 avec des claviers électriques et une trompette traitée avec des effets.",
        promptInstruction: "Le prompt doit décrire un jam de jazz fusion électrique avec un piano Rhodes, une basse funk, une batterie complexe et une trompette avec des effets (wah-wah, delay).",
        lyricInstruction: "Principalement instrumental et improvisé."
      }
    ]
  },
  {
    name: 'John Coltrane',
    genres: 'Jazz, Hard Bop, Modal Jazz',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'sheets-of-sound-saxophone',
        name: 'Saxophone en "Nappes de Sons"',
        description: "Des solos de saxophone ténor virtuoses et rapides avec des cascades d'arpèges jouées à très grande vitesse ('sheets of sound').",
        promptInstruction: "Le prompt doit décrire un morceau de hard bop ou de jazz modal mené par un saxophone ténor, avec des solos rapides et techniquement complexes.",
        lyricInstruction: "Instrumental, centré sur la virtuosité du saxophone."
      }
    ]
  },
  {
    name: 'Herbie Hancock',
    genres: 'Jazz Fusion, Funk, Post-Bop',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'headhunters-funk-fusion',
        name: 'Funk-Fusion style Headhunters',
        description: "Un son funk-jazz mené par un clavier Clavinet et des synthétiseurs, avec des lignes de basse groovy.",
        promptInstruction: "Le prompt doit décrire un morceau de funk-jazz avec un riff de Clavinet proéminent et des solos de synthétiseur, sur une section rythmique funk.",
        lyricInstruction: "Souvent instrumental, peut inclure des vocoders ou des chants simples."
      }
    ]
  },
  {
    name: 'Weather Report',
    genres: 'Jazz Fusion',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'virtuosic-fusion-jam',
        name: 'Jam de Fusion Virtuose',
        description: "Une interaction virtuose entre un saxophone soprano, des synthétiseurs complexes, une basse fretless mélodique et une batterie polyrythmique.",
        promptInstruction: "Le prompt doit décrire un jam de jazz fusion instrumental et virtuose avec un saxophone soprano, des synthétiseurs et une basse fretless.",
        lyricInstruction: "Instrumental."
      }
    ]
  },
  {
    name: 'Charles Mingus',
    genres: 'Jazz, Hard Bop, Avant-Garde Jazz',
    suggestedStructureValue: 'aaba-classic',
    specialTraits: [
      {
        id: 'collective-improvisation-blues',
        name: 'Improvisation Collective & Blues',
        description: "Un son de jazz qui combine l'improvisation collective inspirée de la Nouvelle-Orléans avec le langage du hard bop et du blues.",
        promptInstruction: "Le prompt doit décrire un morceau de jazz avec une contrebasse puissante, des thèmes bluesy et des sections d'improvisation collective chaotiques.",
        lyricInstruction: "Principalement instrumental."
      }
    ]
  },
  {
    name: 'Thelonious Monk',
    genres: 'Jazz, Bebop',
    suggestedStructureValue: 'aaba-classic',
    specialTraits: [
      {
        id: 'dissonant-piano-jazz',
        name: 'Piano Jazz Dissonant',
        description: "Un style de piano unique avec des harmonies dissonantes, des rythmes angulaires et une approche percussive des mélodies.",
        promptInstruction: "Le prompt doit décrire un morceau de jazz mené par un piano avec un style de jeu percussif et des accords dissonants.",
        lyricInstruction: "Instrumental."
      }
    ]
  },
  {
    name: 'Ella Fitzgerald',
    genres: 'Jazz, Swing, Bebop',
    suggestedStructureValue: 'aaba-classic',
    specialTraits: [
      {
        id: 'scat-singing-virtuosity',
        name: 'Improvisation en Scat',
        description: "Une virtuosité vocale qui inclut l'improvisation en 'scat', où la voix imite un instrument de jazz.",
        promptInstruction: "Le prompt doit décrire un morceau de swing ou de bebop avec une performance vocale féminine incluant une section de scat virtuose.",
        lyricInstruction: "Inclus une section d'improvisation vocale en utilisant des syllabes sans signification. Marque cette section avec [scat-solo]."
      }
    ]
  },
  // Classic Soul/Funk/R&B
  {
    name: 'Al Green',
    genres: 'Soul, R&B',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'smooth-soul-falsetto',
        name: 'Soul Douce & Falsetto',
        description: "Une voix masculine qui passe sans effort d'un chant doux à un fausset passionné, sur des arrangements soul luxuriants avec des cordes.",
        promptInstruction: "Le prompt doit décrire un morceau de soul des années 70 avec une section de cordes, et une voix masculine qui alterne entre chant doux et fausset.",
        lyricInstruction: "Les paroles doivent être romantiques et passionnées. La performance vocale doit être très expressive."
      }
    ]
  },
  {
    name: 'Otis Redding',
    genres: 'Soul, R&B',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'raw-emotional-soul',
        name: 'Soul Brute & Émotionnelle',
        description: "Une performance vocale brute, puissante et pleine d'émotion, avec une section de cuivres proéminente.",
        promptInstruction: "Le prompt doit décrire un morceau de soul de Memphis avec une section de cuivres puissante et une voix masculine brute et passionnée.",
        lyricInstruction: "La livraison vocale doit être pleine de douleur et d'émotion."
      }
    ]
  },
  {
    name: 'Sam Cooke',
    genres: 'Soul, R&B',
    suggestedStructureValue: 'aaba-classic',
    specialTraits: [
      {
        id: 'smooth-melodic-soul',
        name: 'Soul Douce & Mélodique',
        description: "Une voix de ténor douce, claire et mélodique, qui a défini le son de la soul.",
        promptInstruction: "Le prompt doit décrire un morceau de soul du début des années 60 avec une voix de ténor masculine douce et claire.",
        lyricInstruction: "Les paroles doivent porter sur l'amour ou le changement social."
      }
    ]
  },
  {
    name: 'Bill Withers',
    genres: 'Soul, Folk',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'acoustic-soul-storytelling',
        name: 'Soul Acoustique & Narrative',
        description: "Une voix de baryton chaude et sincère qui raconte des histoires simples et universelles, souvent sur une guitare acoustique.",
        promptInstruction: "Le prompt doit décrire un morceau de soul-folk avec une guitare acoustique et une voix de baryton masculine chaleureuse.",
        lyricInstruction: "Les paroles doivent être simples, relatables et pleines d'émotion."
      }
    ]
  },
  {
    name: 'Sly & The Family Stone',
    genres: 'Funk, Psychedelic Soul, Rock',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'psychedelic-funk-group-vocals',
        name: 'Funk Psychédélique & Voix Multiples',
        description: "Un son funk psychédélique avec des lignes de basse slap, des guitares wah-wah et des voix masculines et féminines qui s'échangent les lignes.",
        promptInstruction: "Le prompt doit décrire un morceau de funk psychédélique avec une basse slap, et plusieurs voix qui chantent ensemble.",
        lyricInstruction: "Les paroles doivent porter sur des thèmes d'unité et de célébration, avec des lignes échangées entre les chanteurs."
      }
    ]
  },
  {
    name: 'Parliament-Funkadelic',
    genres: 'Funk, Psychedelic Rock, P-Funk',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'p-funk-mythology',
        name: 'P-Funk & Mythologie Afrofuturiste',
        description: "Un son funk extravagant qui incorpore des solos de guitare psychédéliques, des synthés excentriques et une mythologie afrofuturiste.",
        promptInstruction: "Le prompt doit décrire un jam de P-Funk avec des synthés bizarres, des solos de guitare prolongés et des chœurs de groupe.",
        lyricInstruction: "Les paroles doivent être surréalistes et humoristiques, sur des thèmes de l'espace et de la libération."
      }
    ]
  },
  {
    name: 'Isaac Hayes',
    genres: 'Soul, Funk',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'symphonic-soul-spoken-word',
        name: 'Soul Symphonique & Spoken Word',
        description: "De longs arrangements de soul cinématique et orchestrale avec une voix de baryton-basse profonde, incluant de longs monologues parlés.",
        promptInstruction: "Le prompt doit décrire un morceau de soul symphonique avec des arrangements de cordes luxuriants et une voix masculine de baryton-basse.",
        lyricInstruction: "La chanson doit inclure une longue introduction parlée. Marque cette section avec [spoken-word-intro]."
      }
    ]
  },
  {
    name: 'Gil Scott-Heron',
    genres: 'Soul, Jazz, Spoken Word',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [
      {
        id: 'political-spoken-word-soul',
        name: 'Spoken Word Politique sur Fond de Soul-Jazz',
        description: "Une performance de spoken word poétique et politiquement chargée sur un fond de soul-jazz.",
        promptInstruction: "Le prompt doit décrire un morceau de soul-jazz avec une performance de spoken word masculine.",
        lyricInstruction: "Les paroles doivent être un commentaire social et politique percutant, livré dans un style parlé."
      }
    ]
  },
  // World Music & Reggae
  {
    name: 'Peter Tosh',
    genres: 'Reggae',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'militant-roots-reggae',
        name: 'Reggae Roots Militant',
        description: "Un son reggae roots avec une approche plus agressive et militante, et des paroles sur la justice et la légalisation.",
        promptInstruction: "Le prompt doit décrire un morceau de reggae roots avec une attitude militante et des paroles engagées.",
        lyricInstruction: "Les paroles doivent être directes et politiques, appelant à la justice ou à la légalisation du cannabis."
      }
    ]
  },
  {
    name: 'King Sunny Adé',
    genres: 'Jùjú, World Music',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'juju-talking-drum-guitar',
        name: 'Musique Jùjú & Guitares Entrelacées',
        description: "Un son Jùjú nigérian avec des guitares électriques entrelacées, des percussions complexes menées par le 'talking drum' (tambour parlant).",
        promptInstruction: "Le prompt doit décrire un morceau de musique Jùjú avec plusieurs guitares électriques jouant des mélodies complexes et des percussions 'talking drum'.",
        lyricInstruction: "Les paroles sont souvent en yoruba et sont des proverbes ou des louanges."
      }
    ]
  },
  {
    name: 'Goran Bregović',
    genres: 'Balkan Beats, World Music',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'balkan-brass-band-chaos',
        name: 'Fanfare des Balkans Chaotique',
        description: "Un son festif et chaotique qui mélange la musique traditionnelle des Balkans avec une fanfare de cuivres, des chœurs et une énergie rock.",
        promptInstruction: "Le prompt doit décrire un morceau festif avec une fanfare de cuivres des Balkans, des chœurs et un rythme entraînant.",
        lyricInstruction: "Les paroles sont souvent simples et festives, ou des chants traditionnels."
      }
    ]
  },
  {
    name: 'Buena Vista Social Club',
    genres: 'Son cubano, Bolero, Cuban',
    suggestedStructureValue: 'aaba-classic',
    specialTraits: [
      {
        id: 'acoustic-cuban-son',
        name: 'Son Cubain Acoustique',
        description: "Un son acoustique cubain traditionnel avec des guitares, une contrebasse, des percussions latines et des voix masculines et féminines pleines de nostalgie.",
        promptInstruction: "Le prompt doit décrire un morceau de Son Cubain acoustique avec des percussions latines et des voix pleines d'âme.",
        lyricInstruction: "Les paroles doivent être en espagnol, sur des thèmes de l'amour et de la vie à Cuba."
      }
    ]
  },
  {
    name: 'Ravi Shankar',
    genres: 'Indian Classical, Raga',
    suggestedStructureValue: 'post-rock-ambient',
    specialTraits: [
      {
        id: 'sitar-raga-improvisation',
        name: 'Improvisation au Sitar (Raga)',
        description: "Une longue composition instrumentale basée sur un raga indien, avec une improvisation virtuose au sitar, accompagné de tablas.",
        promptInstruction: "Le prompt doit décrire un morceau de musique classique indienne avec un sitar en instrument principal et des tablas.",
        lyricInstruction: "Instrumental."
      }
    ]
  },
  {
    name: 'Nusrat Fateh Ali Khan',
    genres: 'Qawwali, World Music',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'qawwali-vocal-improvisation',
        name: 'Improvisation Vocale Qawwali',
        description: "Une performance vocale de qawwali puissante et extatique, avec des improvisations vocales complexes et une montée en intensité spirituelle.",
        promptInstruction: "Le prompt doit décrire un morceau de Qawwali avec une voix masculine puissante et improvisée, accompagnée d'un harmonium et de tablas.",
        lyricInstruction: "Les paroles sont des poèmes soufis sur l'amour divin."
      }
    ]
  },
  {
    name: 'Cesária Évora',
    genres: 'Morna, Coladeira',
    suggestedStructureValue: 'ballad-instrumental-bridge',
    specialTraits: [
      {
        id: 'melancholic-morna-vocals',
        name: 'Voix Mélancolique de la Morna',
        description: "Une voix de contralto chaude et mélancolique, exprimant la 'sodade' (nostalgie), sur une instrumentation acoustique cap-verdienne.",
        promptInstruction: "Le prompt doit décrire un morceau de Morna acoustique avec une voix féminine de contralto mélancolique.",
        lyricInstruction: "Les paroles doivent être en créole cap-verdien ou en portugais, sur des thèmes de la mer, de la nostalgie et de l'amour."
      }
    ]
  },
  {
    name: 'Salif Keita',
    genres: 'Afro-pop, World Music',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'golden-voice-of-africa',
        name: '"Voix d\'Or de l\'Afrique"',
        description: "Une voix de ténor aiguë et puissante, sur une fusion de musique traditionnelle mandingue et d'instrumentation pop occidentale.",
        promptInstruction: "Le prompt doit décrire un morceau d'afro-pop avec une voix masculine de ténor aiguë et puissante.",
        lyricInstruction: "Les paroles sont souvent en mandingue."
      }
    ]
  },
  {
    name: 'Youssou N\'Dour',
    genres: 'Mbalax, World Music',
    suggestedStructureValue: 'funk-jam',
    specialTraits: [
      {
        id: 'mbalax-polyrhythms',
        name: 'Polyrhythmies Mbalax',
        description: "Un son sénégalais mené par des polyrythmies de percussions complexes (Mbalax) et une voix de ténor incroyablement expressive.",
        promptInstruction: "Le prompt doit décrire un morceau de Mbalax avec des percussions sénégalaises complexes et une voix masculine virtuose.",
        lyricInstruction: "Les paroles sont souvent en wolof, sur des thèmes sociaux."
      }
    ]
  },
  {
    name: 'Jimmy Cliff',
    genres: 'Reggae, Ska, Rocksteady',
    suggestedStructureValue: 'folk-storytelling',
    specialTraits: [
      {
        id: 'upbeat-soulful-reggae',
        name: 'Reggae Soul & Optimiste',
        description: "Un son reggae et rocksteady avec une voix de ténor soul et des paroles souvent optimistes et inspirantes.",
        promptInstruction: "Le prompt doit décrire un morceau de reggae/rocksteady optimiste avec une voix de ténor masculine pleine d'âme.",
        lyricInstruction: "Les paroles doivent porter sur des thèmes de la persévérance et de l'espoir."
      }
    ]
  },
  // More eclectic choices
  {
    name: 'Jacques Dutronc',
    genres: 'French Rock, Garage Rock, Chanson',
    suggestedStructureValue: 'rock-anthem-solo',
    specialTraits: [
      {
        id: 'ironic-garage-rock-60s',
        name: 'Garage Rock Ironique des Années 60',
        description: "Un son garage rock français des années 60 avec des riffs de guitare fuzz et une voix nasillarde et ironique.",
        promptInstruction: "Le prompt doit décrire un morceau de garage rock français des années 60 avec une guitare fuzz et une voix masculine nasillarde et nonchalante.",
        lyricInstruction: "Les paroles doivent être des commentaires satiriques et pleins d'esprit sur la société."
      }
    ]
  },
  {
    name: 'Scott Walker',
    genres: 'Baroque Pop, Art Rock, Experimental',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'dark-baroque-crooning',
        name: 'Crooning Baroque & Sombre',
        description: "Une voix de baryton profonde et théâtrale sur des arrangements orchestraux sombres et avant-gardistes.",
        promptInstruction: "Le prompt doit décrire un morceau d'art rock avec des arrangements de cordes sombres et une voix de baryton masculine dramatique.",
        lyricInstruction: "Les paroles doivent être existentialistes, sombres et poétiques."
      }
    ]
  },
  {
    name: 'Captain Beefheart',
    genres: 'Experimental Rock, Blues Rock, Avant-Garde',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'dissonant-avant-garde-blues',
        name: 'Blues Avant-Gardiste & Dissonant',
        description: "Une déconstruction du blues et du rock avec des rythmes complexes et changeants, des guitares dissonantes et une voix rocailleuse et surréaliste.",
        promptInstruction: "Le prompt doit décrire un morceau de blues-rock expérimental avec des signatures rythmiques complexes et des guitares atonales.",
        lyricInstruction: "Les paroles doivent être des poèmes surréalistes en flux de conscience."
      }
    ]
  },
  {
    name: 'Frank Zappa',
    genres: 'Experimental Rock, Jazz Fusion, Comedy Rock',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'complex-comedy-rock-fusion',
        name: 'Fusion Comique & Complexe',
        description: "Des compositions extrêmement complexes qui fusionnent rock, jazz et musique contemporaine, avec des paroles satiriques et humoristiques.",
        promptInstruction: "Le prompt doit décrire un morceau de rock/jazz fusion avec des signatures rythmiques complexes, des solos virtuoses et un ton humoristique.",
        lyricInstruction: "Les paroles doivent être une satire de la société, pleines d'humour absurde et de personnages excentriques."
      }
    ]
  },
  {
    name: 'Sun Ra',
    genres: 'Avant-Garde Jazz, Free Jazz, Space Music',
    suggestedStructureValue: 'progressive-interlude-solo',
    specialTraits: [
      {
        id: 'cosmic-free-jazz',
        name: 'Free Jazz Cosmique',
        description: "Une exploration du free jazz avec des éléments de musique électronique précoce, des chants cosmiques et une mythologie afrofuturiste.",
        promptInstruction: "Le prompt doit décrire un morceau de free jazz avec des improvisations collectives, des synthétiseurs Moog et des chants sur le thème de l'espace.",
        lyricInstruction: "Les paroles sont des chants sur le cosmos, l'Égypte ancienne et l'afrofuturisme."
      }
    ]
  },
  {
    name: 'Oxxxymiron',
    genres: 'Russian Rap, Hip Hop, Grime',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [{
        id: 'technical-battle-rap',
        name: 'Flow Technique & Battle Rap',
        description: "Un flow rapide et technique avec des rimes complexes et des références littéraires, typique du battle rap.",
        promptInstruction: "Le prompt doit décrire un beat hip-hop complexe, avec un flow de rap russe rapide et articulé, mettant l'accent sur les rimes multi-syllabiques et une livraison agressive.",
        lyricInstruction: "Les paroles doivent être denses, intellectuelles, avec des jeux de mots complexes, des références culturelles et un ton combatif."
    }]
  },
  {
    name: 'Morgenshtern',
    genres: 'Russian Rap, Trap, Mumble Rap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [{
        id: 'provocative-mumble-trap',
        name: 'Trap Provocateur & Ad-libs',
        description: "Un style trap moderne avec un usage intensif de l'autotune, des ad-libs accrocheurs et des paroles provocatrices sur la richesse et le succès.",
        promptInstruction: "Le prompt doit décrire un beat de trap lourd avec une basse 808 proéminente, et une voix masculine auto-tunée et énergique avec des ad-libs fréquents comme 'Ай-ай-ай'.",
        lyricInstruction: "Intègre des ad-libs comme (Ай-ай-ай) ou (Па-па-па). Les paroles doivent être vantardes, hédonistes et provocatrices."
    }]
  },
  {
    name: 'Scriptonite (Скриптонит)',
    genres: 'Russian Rap, Hip Hop, Trap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [{
        id: 'drunken-slurred-flow',
        name: 'Flow "Désarticulé" & Beats Atmosphériques',
        description: "Un flow unique, presque marmonné et désarticulé ('drunken flow'), sur des productions atmosphériques et sombres.",
        promptInstruction: "Le prompt doit décrire un beat hip-hop atmosphérique et brumeux, avec une livraison vocale masculine marmonnée et désarticulée, créant une ambiance introspective et brute.",
        lyricInstruction: "La livraison doit être expressive et peu conventionnelle, avec une articulation relâchée et des variations de rythme pour un effet émotionnel et authentique."
    }]
  },
  {
    name: 'Pharaoh',
    genres: 'Russian Rap, Cloud Rap, Emo Rap',
    suggestedStructureValue: 'hip-hop-rap',
    specialTraits: [{
        id: 'melancholic-cloud-rap',
        name: 'Cloud Rap Mélancolique',
        description: "Une voix mélancolique et auto-tunée sur des productions cloud rap éthérées et sombres, avec des thèmes de nihilisme et de jeunesse.",
        promptInstruction: "Le prompt doit décrire un beat de cloud rap atmosphérique et mélancolique, avec des synthés planants, et une voix masculine auto-tunée, éthérée et pleine de réverbération.",
        lyricInstruction: "Les paroles doivent être introspectives, sur des thèmes de la jeunesse, de la tristesse, de l'amour et de l'ennui, avec un ton distant et mélancolique."
    }]
  },
];
