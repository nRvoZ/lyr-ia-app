import { SongStructure } from '../src/types';

export const SONG_STRUCTURES_FR: SongStructure[] = [
  // Pop & Standard
  { name: 'Pop : Court (C R C R)', value: 'pop-short-vcvc', parts: ['[INTRO]', '[COUPLET 1]', '[REFRAIN]', '[COUPLET 2]', '[REFRAIN]', '[OUTRO]'] },
  { name: 'Pop : Standard (C R C R P R)', value: 'pop-standard-vcvcbc', parts: ['[INTRO]', '[COUPLET 1]', '[REFRAIN]', '[COUPLET 2]', '[REFRAIN]', '[PONT]', '[REFRAIN]', '[OUTRO]'] },
  { name: 'Pop : Complet (avec Pré-Refrain)', value: 'pop-full-prechorus', parts: ['[INTRO]', '[COUPLET 1]', '[PRÉ-REFRAIN]', '[REFRAIN]', '[COUPLET 2]', '[PRÉ-REFRAIN]', '[REFRAIN]', '[PONT]', '[REFRAIN]', '[OUTRO]'] },
  { name: 'Pop : Moderne (avec Post-Refrain)', value: 'pop-modern-postchorus', parts: ['[INTRO]', '[COUPLET]', '[REFRAIN]', '[POST-REFRAIN]', '[COUPLET 2]', '[REFRAIN]', '[POST-REFRAIN]', '[PONT]', '[REFRAIN]', '[OUTRO]'] },

  // K-Pop Structures
  { name: 'K-Pop : Standard (avec Rap & Pont)', value: 'kpop-standard-rap-bridge', parts: ['[INTRO]', '[COUPLET 1]', '[PRÉ-REFRAIN]', '[REFRAIN]', '[COUPLET 2 (RAP)]', '[REFRAIN]', '[PONT]', '[REFRAIN FINAL]', '[OUTRO]'] },
  { name: 'K-Pop : Performance (avec Dance Break)', value: 'kpop-performance-dance-break', parts: ['[INTRO]', '[COUPLET]', '[REFRAIN]', '[COUPLET RAP]', '[REFRAIN]', '[PONT]', '[DANCE BREAK]', '[REFRAIN FINAL]', '[OUTRO]'] },

  // Instrumental & Spécifique au Genre
  { name: 'Hymne Rock (avec Solo)', value: 'rock-anthem-solo', parts: ['[INTRO]', '[COUPLET 1]', '[REFRAIN]', '[COUPLET 2]', '[REFRAIN]', '[SOLO DE GUITARE]', '[PONT]', '[REFRAIN FINAL]', '[OUTRO]'] },
  { name: 'Metal (avec Breakdown & Solo)', value: 'metal-breakdown-solo', parts: ['[RIFF D\'INTRO]', '[COUPLET 1]', '[REFRAIN]', '[COUPLET 2]', '[REFRAIN]', '[BREAKDOWN]', '[SOLO DE GUITARE]', '[PONT]', '[REFRAIN]', '[RIFF D\'OUTRO]'] },
  { name: 'Ballade (avec Pont Instrumental)', value: 'ballad-instrumental-bridge', parts: ['[INTRO]', '[COUPLET 1]', '[REFRAIN]', '[COUPLET 2]', '[REFRAIN]', '[PONT INSTRUMENTAL]', '[REFRAIN FINAL]', '[OUTRO]'] },
  { name: 'EDM / Dance (avec Drop & Breakdown)', value: 'edm-dance-drop', parts: ['[INTRO]', '[MONTÉE]', '[DROP]', '[SAMPLE VOCAL]', '[BREAKDOWN]', '[MONTÉE]', '[SECOND DROP]', '[OUTRO]'] },
  { name: 'Funk / Jam (avec Jam Instrumental)', value: 'funk-jam', parts: ['[GROOVE D\'INTRO]', '[COUPLET 1]', '[REFRAIN]', '[COUPLET 2]', '[REFRAIN]', '[JAM INSTRUMENTAL]', '[REFRAIN]', '[GROOVE D\'OUTRO]'] },
  { name: 'Progressif (avec Interlude & Solo)', value: 'progressive-interlude-solo', parts: ['[INTRO]', '[COUPLET 1]', '[INTERLUDE INSTRUMENTAL]', '[REFRAIN]', '[COUPLET 2]', '[SOLO DE GUITARE]', '[PONT]', '[REFRAIN FINAL]', '[OUTRO]'] },
  { name: 'Post-Rock / Ambiant', value: 'post-rock-ambient', parts: ['[INTRO AMBIANTE]', '[MONTÉE]', '[CLIMAX]', '[INTERLUDE]', '[SECONDE MONTÉE]', '[CLIMAX FINAL]', '[FADE OUT]'] },

  // Structures Alternatives
  { name: 'Hip-Hop / Rap', value: 'hip-hop-rap', parts: ['[INTRO]', '[REFRAIN]', '[COUPLET 1]', '[REFRAIN]', '[COUPLET 2]', '[PONT]', '[COUPLET 3]', '[OUTRO]'] },
  { name: 'AABA / Classique', value: 'aaba-classic', parts: ['[INTRO]', '[COUPLET (A)]', '[COUPLET (A)]', '[PONT (B)]', '[COUPLET (A)]', '[OUTRO]'] },
  { name: 'Folk / Narratif (Focus Couplets)', value: 'folk-storytelling', parts: ['[INTRO]', '[COUPLET 1]', '[COUPLET 2]', '[PAUSE INSTRUMENTALE]', '[COUPLET 3]', '[COUPLET 4]', '[OUTRO]'] },

  // Structures d'Artistes Célèbres
  { name: 'Daft Punk : Répétitif / Additif', value: 'daft-punk-repetitive', parts: ['[INTRO]', '[MOTIF VOCAL A]', '[MOTIF VOCAL A+B]', '[MOTIF VOCAL A+B+C]', '[BREAKDOWN]', '[MONTÉE VOCALE]', '[OUTRO GROOVE]'] },
  { name: 'Queen : Rhapsodie Opératique', value: 'queen-operatic-rhapsody', parts: ['[INTRO A CAPPELLA]', '[SECTION BALLADE]', '[SOLO DE GUITARE]', '[SECTION OPÉRA]', '[SECTION HARD ROCK]', '[OUTRO RÉFLEXIF]'] },
  { name: 'Johnny Cash : Crescendo Narratif', value: 'cash-narrative-crescendo', parts: ['[INTRO ACOUSTIQUE]', '[COUPLET 1 (Calme)]', '[COUPLET 2 (Intensifié)]', '[PONT (Puissant)]', '[COUPLET 3 (Émotionnel)]', '[OUTRO DÉPOUILLÉ]'] },
  { name: 'Pink Floyd : Suite Psychédélique', value: 'pink-floyd-psychedelic-suite', parts: ['[INTRO INSTRUMENTAL LONG]', '[THÈME PRINCIPAL]', '[COUPLET 1]', '[SOLO DE SYNTHÉ]', '[COUPLET 2]', '[SOLO DE GUITARE]', '[OUTRO AMBIANT]'] },
  { name: 'Kendrick Lamar : Épopée Hip-Hop', value: 'kendrick-hip-hop-epic', parts: ['[INTRO]', '[LONG COUPLET NARRATIF 1]', '[INTERLUDE / CHANGEMENT DE BEAT]', '[LONG COUPLET NARRATIF 2]', '[OUTRO PARLÉ]'] },
  { name: 'Eivør : Crescendo Folk-Électro', value: 'eivor-folk-electro-crescendo', parts: ['[INTRO AMBIANT]', '[COUPLET 1 (Minimaliste)]', '[REFRAIN (Éthéré)]', '[COUPLET 2]', '[REFRAIN (Intensifié)]', '[PONT VOCAL / CHAMANIQUE]', '[REFRAIN FINAL (Climax puissant)]', '[OUTRO DÉCROISSANT]'] },
  { name: 'Vígundr : Épopée Viking Metal', value: 'vigundr-viking-metal-epic', parts: ['[INTRO (Cors de guerre)]', '[COUPLET 1 (Récit sombre)]', '[REFRAIN (Chant puissant)]', '[COUPLET 2]', '[REFRAIN (Avec chœurs)]', '[PONT INSTRUMENTAL (Mélodie folk + Riff metal)]', '[REFRAIN FINAL (Climax épique)]', '[OUTRO (Tambours s\'estompant)]'] },
  { name: 'My Chemical Romance : Hymne Emo Théâtral', value: 'mcr-emo-anthem', parts: ['[INTRO (Calme)]', '[COUPLET 1]', '[REFRAIN (Explosif)]', '[COUPLET 2]', '[REFRAIN (Explosif)]', '[PONT DRAMATIQUE]', '[REFRAIN FINAL (Hurlé)]', '[OUTRO]'] },
  { name: 'J Dilla / Nujabes : Beat Lo-fi', value: 'jdilla-nujabes-lofi-beat', parts: ['[INTRO (Sample vocal)]', '[BOUCLE PRINCIPALE A]', '[BOUCLE PRINCIPALE B (avec mélodie)]', '[BREAK]', '[BOUCLE A+B]', '[OUTRO (Fade out)]'] },
  { name: 'Fela Kuti : Transe Afrobeat', value: 'fela-kuti-afrobeat-trance', parts: ['[INTRO INSTRUMENTAL LONG]', '[THÈME PRINCIPAL (Cuivres)]', '[CHANT (Appel et Réponse)]', '[SOLO DE CLAVIER]', '[SOLO DE SAXOPHONE]', '[REPRISE DU THÈME]', '[OUTRO GROOVE]'] },
  { name: 'Woodkid : Marche Néoclassique Épique', value: 'woodkid-neoclassical-march', parts: ['[INTRO (Tambours)]', '[COUPLET 1]', '[MONTÉE (Cuivres)]', '[REFRAIN PUISSANT]', '[COUPLET 2]', '[REFRAIN PUISSANT]', '[PONT ORCHESTRAL]', '[REFRAIN FINAL (Avec Chœurs)]', '[OUTRO (Percussions)]'] },
  { name: 'James Blake : Ballade Électro Soul', value: 'james-blake-electro-soul-ballad', parts: ['[INTRO (Piano/Nappe)]', '[COUPLET 1 (Voix soulful)]', '[REFRAIN (Voix superposées)]', '[INTERLUDE (Sub-bass & Silence)]', '[COUPLET 2]', '[REFRAIN]', '[OUTRO (Déconstruit)]'] },
  { name: 'Rosalía : Flamenco Pop Moderne', value: 'rosalia-flamenco-pop', parts: ['[INTRO (Palmas/Vocalise)]', '[COUPLET]', '[PRÉ-REFRAIN]', '[REFRAIN (Avec basse 808)]', '[COUPLET 2]', '[REFRAIN]', '[PONT (Flamenco pur)]', '[REFRAIN FINAL]', '[OUTRO]'] },
  { name: 'Stromae : Électro-Chanson Narrative', value: 'stromae-narrative-electro', parts: ['[INTRO (Beat House)]', '[COUPLET 1 (Narratif)]', '[REFRAIN (Mélodique & Dansant)]', '[COUPLET 2 (Développement de l\'histoire)]', '[REFRAIN]', '[PONT (Thème musical varié)]', '[REFRAIN]', '[OUTRO (Beat seul)]'] },
  { name: 'Anderson .Paak : Groove Funk-Soul', value: 'anderson-paak-funk-soul-groove', parts: ['[INTRO (Batterie)]', '[COUPLET RAP 1]', '[REFRAIN CHANTÉ (Soulful)]', '[COUPLET RAP 2]', '[REFRAIN CHANTÉ]', '[PONT (Jam instrumental)]', '[REFRAIN FINAL]', '[OUTRO]'] },
];

export const SONG_STRUCTURES_EN: SongStructure[] = [
  // Pop & Standard
  { name: 'Pop: Short (VCVC)', value: 'pop-short-vcvc', parts: ['[INTRO]', '[VERSE 1]', '[CHORUS]', '[VERSE 2]', '[CHorus]', '[OUTRO]'] },
  { name: 'Pop: Standard (VCVCBC)', value: 'pop-standard-vcvcbc', parts: ['[INTRO]', '[VERSE 1]', '[CHORUS]', '[VERSE 2]', '[CHORUS]', '[BRIDGE]', '[CHORUS]', '[OUTRO]'] },
  { name: 'Pop: Full (w/ Pre-Chorus)', value: 'pop-full-prechorus', parts: ['[INTRO]', '[VERSE 1]', '[PRE-CHORUS]', '[CHORUS]', '[VERSE 2]', '[PRE-CHORUS]', '[CHORUS]', '[BRIDGE]', '[CHORUS]', '[OUTRO]'] },
  { name: 'Pop: Modern (w/ Post-Chorus)', value: 'pop-modern-postchorus', parts: ['[INTRO]', '[VERSE]', '[CHORUS]', '[POST-CHORUS]', '[VERSE 2]', '[CHORUS]', '[POST-CHORUS]', '[BRIDGE]', '[CHORUS]', '[OUTRO]'] },
  
  // K-Pop Structures
  { name: 'K-Pop: Standard (w/ Rap & Bridge)', value: 'kpop-standard-rap-bridge', parts: ['[INTRO]', '[VERSE 1]', '[PRE-CHORUS]', '[CHORUS]', '[VERSE 2 (RAP)]', '[CHORUS]', '[BRIDGE]', '[FINAL CHORUS]', '[OUTRO]'] },
  { name: 'K-Pop: Performance (w/ Dance Break)', value: 'kpop-performance-dance-break', parts: ['[INTRO]', '[VERSE]', '[CHORUS]', '[RAP VERSE]', '[CHORUS]', '[BRIDGE]', '[DANCE BREAK]', '[FINAL CHORUS]', '[OUTRO]'] },

  // Instrumental & Genre Specific
  { name: 'Rock Anthem (w/ Solo)', value: 'rock-anthem-solo', parts: ['[INTRO]', '[VERSE 1]', '[CHORUS]', '[VERSE 2]', '[CHORUS]', '[GUITAR SOLO]', '[BRIDGE]', '[FINAL CHORUS]', '[OUTRO]'] },
  { name: 'Metal (w/ Breakdown & Solo)', value: 'metal-breakdown-solo', parts: ['[INTRO RIFF]', '[VERSE 1]', '[CHORUS]', '[VERSE 2]', '[CHORUS]', '[BREAKDOWN]', '[GUITAR SOLO]', '[BRIDGE]', '[CHORUS]', '[OUTRO RIFF]'] },
  { name: 'Ballad (w/ Instrumental Bridge)', value: 'ballad-instrumental-bridge', parts: ['[INTRO]', '[VERSE 1]', '[CHORUS]', '[VERSE 2]', '[CHORUS]', '[INSTRUMENTAL BRIDGE]', '[FINAL CHORUS]', '[OUTRO]'] },
  { name: 'EDM / Dance (w/ Drop & Breakdown)', value: 'edm-dance-drop', parts: ['[INTRO]', '[BUILDUP]', '[DROP]', '[VOCAL CHOP]', '[BREAKDOWN]', '[BUILDUP]', '[SECOND DROP]', '[OUTRO]'] },
  { name: 'Funk / Jam (w/ Instrumental Jam)', value: 'funk-jam', parts: ['[INTRO GROOVE]', '[VERSE 1]', '[CHORUS]', '[VERSE 2]', '[CHORUS]', '[INSTRUMENTAL JAM]', '[CHORUS]', '[OUTRO GROOVE]'] },
  { name: 'Progressive (w/ Interlude & Solo)', value: 'progressive-interlude-solo', parts: ['[INTRO]', '[VERSE 1]', '[INSTRUMENTAL INTERLUDE]', '[CHORUS]', '[VERSE 2]', '[GUITAR SOLO]', '[BRIDGE]', '[FINAL CHORUS]', '[OUTRO]'] },
  { name: 'Post-Rock / Ambient', value: 'post-rock-ambient', parts: ['[AMBIENT INTRO]', '[BUILDUP]', '[CLIMAX]', '[INTERLUDE]', '[SECOND BUILDUP]', '[FINAL CLIMAX]', '[FADE OUT]'] },

  // Alternative Structures
  { name: 'Hip-Hop / Rap', value: 'hip-hop-rap', parts: ['[INTRO]', '[CHORUS]', '[VERSE 1]', '[CHORUS]', '[VERSE 2]', '[BRIDGE]', '[VERSE 3]', '[OUTRO]'] },
  { name: 'AABA / Classic Songwriting', value: 'aaba-classic', parts: ['[INTRO]', '[VERSE (A)]', '[VERSE (A)]', '[BRIDGE (B)]', '[VERSE (A)]', '[OUTRO]'] },
  { name: 'Folk / Storytelling (Verse Focus)', value: 'folk-storytelling', parts: ['[INTRO]', '[VERSE 1]', '[VERSE 2]', '[INSTRUMENTAL BREAK]', '[VERSE 3]', '[VERSE 4]', '[OUTRO]'] },

  // Famous Artist Structures
  { name: 'Daft Punk: Repetitive / Additive', value: 'daft-punk-repetitive', parts: ['[INTRO]', '[VOCAL MOTIF A]', '[VOCAL MOTIF A+B]', '[VOCAL MOTIF A+B+C]', '[BREAKDOWN]', '[VOCAL BUILDUP]', '[OUTRO GROOVE]'] },
  { name: 'Queen: Operatic Rhapsody', value: 'queen-operatic-rhapsody', parts: ['[A CAPPELLA INTRO]', '[BALLAD SECTION]', '[GUITAR SOLO]', '[OPERA SECTION]', '[HARD ROCK SECTION]', '[REFLECTIVE OUTRO]'] },
  { name: 'Johnny Cash: Narrative Crescendo', value: 'cash-narrative-crescendo', parts: ['[ACOUSTIC INTRO]', '[VERSE 1 (Quiet)]', '[VERSE 2 (Intensifying)]', '[BRIDGE (Powerful)]', '[VERSE 3 (Emotional)]', '[SPARSE OUTRO]'] },
  { name: 'Pink Floyd: Psychedelic Suite', value: 'pink-floyd-psychedelic-suite', parts: ['[LONG INSTRUMENTAL INTRO]', '[MAIN THEME]', '[VERSE 1]', '[SYNTH SOLO]', '[VERSE 2]', '[GUITAR SOLO]', '[AMBIENT OUTRO]'] },
  { name: 'Kendrick Lamar: Hip-Hop Epic', value: 'kendrick-hip-hop-epic', parts: ['[INTRO]', '[LONG NARRATIVE VERSE 1]', '[INTERLUDE / BEAT SWITCH]', '[LONG NARRATIVE VERSE 2]', '[SPOKEN OUTRO]'] },
  { name: 'Eivør: Folk-Electro Crescendo', value: 'eivor-folk-electro-crescendo', parts: ['[AMBIENT INTRO]', '[VERSE 1 (Minimalist)]', '[CHORUS (Ethereal)]', '[VERSE 2]', '[CHORUS (Intensified)]', '[SHAMANIC / VOCAL BRIDGE]', '[FINAL CHORUS (Powerful Climax)]', '[FADING OUTRO]'] },
  { name: 'Vígundr: Viking Metal Epic', value: 'vigundr-viking-metal-epic', parts: ['[INTRO (War Horns)]', '[VERSE 1 (Dark Tale)]', '[CHORUS (Powerful Chant)]', '[VERSE 2]', '[CHORUS (With Choirs)]', '[INSTRUMENTAL BRIDGE (Folk Melody + Metal Riff)]', '[FINAL CHORUS (Epic Climax)]', '[OUTRO (Fading Drums)]'] },
  { name: 'My Chemical Romance: Theatrical Emo Anthem', value: 'mcr-emo-anthem', parts: ['[INTRO (Quiet)]', '[VERSE 1]', '[CHORUS (Explosive)]', '[VERSE 2]', '[CHORUS (Explosive)]', '[DRAMATIC BRIDGE]', '[FINAL CHORUS (Screamed)]', '[OUTRO]'] },
  { name: 'J Dilla / Nujabes: Lo-fi Beat', value: 'jdilla-nujabes-lofi-beat', parts: ['[INTRO (Vocal Sample)]', '[MAIN LOOP A]', '[MAIN LOOP B (with melody)]', '[BREAK]', '[LOOP A+B]', '[OUTRO (Fade out)]'] },
  { name: 'Fela Kuti: Afrobeat Trance', value: 'fela-kuti-afrobeat-trance', parts: ['[LONG INSTRUMENTAL INTRO]', '[MAIN THEME (Horns)]', '[VOCALS (Call and Response)]', '[KEYBOARD SOLO]', '[SAXOPHONE SOLO]', '[THEME REPRISE]', '[OUTRO GROOVE]'] },
  { name: 'Woodkid: Epic Neoclassical March', value: 'woodkid-neoclassical-march', parts: ['[INTRO (Drums)]', '[VERSE 1]', '[BUILDUP (Horns)]', '[POWERFUL CHORUS]', '[VERSE 2]', '[POWERFUL CHORUS]', '[ORCHESTRAL BRIDGE]', '[FINAL CHORUS (With Choir)]', '[OUTRO (Percussion)]'] },
  { name: 'James Blake: Electro Soul Ballad', value: 'james-blake-electro-soul-ballad', parts: ['[INTRO (Piano/Pad)]', '[VERSE 1 (Soulful vocals)]', '[CHORUS (Layered vocals)]', '[INTERLUDE (Sub-bass & Silence)]', '[VERSE 2]', '[CHORUS]', '[OUTRO (Deconstructed)]'] },
  { name: 'Rosalía: Modern Flamenco Pop', value: 'rosalia-flamenco-pop', parts: ['[INTRO (Palmas/Vocalise)]', '[VERSE]', '[PRE-CHORUS]', '[CHORUS (With 808 bass)]', '[VERSE 2]', '[CHORUS]', '[BRIDGE (Pure Flamenco)]', '[FINAL CHORUS]', '[OUTRO]'] },
  { name: 'Stromae: Narrative Electro-Chanson', value: 'stromae-narrative-electro', parts: ['[INTRO (House Beat)]', '[VERSE 1 (Narrative)]', '[CHORUS (Melodic & Danceable)]', '[VERSE 2 (Story development)]', '[CHORUS]', '[BRIDGE (Varied musical theme)]', '[CHORUS]', '[OUTRO (Beat only)]'] },
  { name: 'Anderson .Paak: Funk-Soul Groove', value: 'anderson-paak-funk-soul-groove', parts: ['[INTRO (Drums)]', '[RAP VERSE 1]', '[SUNG CHORUS (Soulful)]', '[RAP VERSE 2]', '[SUNG CHORUS]', '[BRIDGE (Instrumental jam)]', '[FINAL CHORUS]', '[OUTRO]'] },
];
