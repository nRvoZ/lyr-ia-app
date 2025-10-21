import { ARTISTS } from './constants_artists';

const initialStyles: string[] = [
  'Acoustic', 'Alternative', 'Blues', 'Chillwave', 'Country', 'Disco', 'Electronic', 'Electropop',
  'Folk', 'French House', 'Funk', 'Glam Rock', 'Hip Hop', 'Indie', 'Jazz', 'J-Pop', 'J-Rock', 'Lo-fi', 'Metal',
  'Pop', 'Punk', 'R&B', 'Rap', 'Reggae', 'Retrowave', 'Rock', 'Soul', 'Synth-pop', 'Synthwave', 'Vaporwave'
];

// Extract all genres from the artists list
const artistGenres = ARTISTS.flatMap(artist =>
  artist.genres.split(',').map(genre => genre.trim())
);

// Combine, get unique values, and sort
export const STYLES: string[] = [...new Set([...initialStyles, ...artistGenres])].sort();

export const AMBIANCES: string[] = [
    'Aventure Épique', 'Comédie Romantique', 'Cyberpunk', 'Espionnage', 'Fantaisie Médiévale',
    'Film Noir', 'Horreur', 'Pirate', 'Post-apocalyptique', 'Spatial', 'Steampunk', 'Western'
];
