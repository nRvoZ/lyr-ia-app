const fs = require('fs');
const path = require('path');

console.log('🚀 Fusion des fichiers constants_artists...');

// Lire tous les fichiers constants_artists_*.ts
const files = fs.readdirSync('.').filter(f => 
  f.startsWith('constants_artists_') && f.endsWith('.ts') && f !== 'constants_artists_all.ts'
);

console.log(`📁 Fichiers trouvés: ${files.length}`);

let allArtists = [];
let imports = new Set();

// Lire chaque fichier
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Extraire les lignes d'artistes (entre [ et ])
  const match = content.match(/export const ARTISTS_\w+: Artist\[\] = \[([\s\S]*?)\];/);
  if (match) {
    const artistsContent = match[1].trim();
    if (artistsContent) {
      allArtists.push(artistsContent);
    }
  }
  
  console.log(`✅ ${file}`);
});

// Créer le nouveau fichier fusionné
const outputContent = `import { Artist } from './src/types';

export const ARTISTS: Artist[] = [
  ${allArtists.join(',\n  ')}
];
`;

fs.writeFileSync('constants_artists_all.ts', outputContent, 'utf8');

console.log('✨ Fichier constants_artists_all.ts créé avec succès!');
console.log(`📊 Total d'artistes fusionnés`);






