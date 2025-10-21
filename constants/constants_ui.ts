import { CopyrightOption } from '../src/types';

export const COPYRIGHT_OPTIONS: { name: string; value: CopyrightOption }[] = [
    { name: 'Noms originaux', value: CopyrightOption.Standard },
    { name: 'Sans copyright', value: CopyrightOption.CopyrightFree },
    { name: 'Noms modulés', value: CopyrightOption.Modulated },
];

// Helper to darken a hex color for hover states
const darken = (hex: string, percent: number): string => {
  try {
    let [r, g, b] = hex.slice(1).match(/.{2}/g)!.map(x => parseInt(x, 16));
    r = Math.floor(r * (1 - percent / 100));
    g = Math.floor(g * (1 - percent / 100));
    b = Math.floor(b * (1 - percent / 100));
    return `#${[r,g,b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
  } catch (e) {
    console.error("Invalid hex color:", hex);
    return '#000000';
  }
};

const createTheme = (name: string, primary: string, secondary: string) => ({
    name,
    primary,
    secondary,
    primaryHover: darken(primary, 10),
});

export const THEME_GRADIENTS = [
  createTheme('Aqualis', '#30259f', '#4ff4bc'), // Bleu foncé -> Cyan clair (logo original)
  createTheme('Nebula', '#5B21B6', '#1D4ED8'), // Default: Deep Purple -> Deep Blue
  createTheme('Emerald', '#065F46', '#0F766E'), // Dark Green -> Teal
  createTheme('Crimson', '#9F1239', '#C2410C'), // Deep Red -> Orange
  createTheme('Sunset', '#F97316', '#DB2777'),  // Orange -> Pink
  createTheme('Graphite', '#4B5563', '#9CA3AF'), // Dark Gray -> Lighter Gray
];
