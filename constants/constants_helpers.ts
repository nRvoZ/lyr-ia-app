import type { Artist, AnimeTheme, HistoryItem } from '../src/types';
import { GenerationMode } from '../src/types';

export const getSuggestedStructureValueForArtist = (artist: Artist): string => {
    // Safety check for artist
    if (!artist || !artist.genres) {
        console.warn('Artist or genres is undefined, using default structure');
        return 'standard-verse-chorus';
    }

    // Artist property is the primary source of truth
    if (artist.suggestedStructureValue) {
        return artist.suggestedStructureValue;
    }

    // Fallback to genre-based logic if the property is missing for some reason
    const genres = artist.genres.toLowerCase();
    if (genres.includes('hip hop') || genres.includes('rap') || genres.includes('trap') || genres.includes('drill')) {
        return 'hip-hop-rap';
    }
    if (genres.includes('metal') || genres.includes('hardcore')) {
        return 'metal-breakdown-solo';
    }
    if (genres.includes('progressive rock')) {
        return 'pink-floyd-psychedelic-suite';
    }
    if (genres.includes('rock') || genres.includes('grunge') || genres.includes('punk')) {
        return 'rock-anthem-solo';
    }
    if (genres.includes('electronic') || genres.includes('edm') || genres.includes('house') || genres.includes('techno') || genres.includes('dance') || genres.includes('synth-pop') || genres.includes('electro')) {
        return 'edm-dance-drop';
    }
    if (genres.includes('funk')) {
        return 'funk-jam';
    }
    if (genres.includes('progressive')) {
        return 'progressive-interlude-solo';
    }
    if (genres.includes('ambient') || genres.includes('downtempo') || genres.includes('trip hop') || genres.includes('lo-fi')) {
        return 'post-rock-ambient';
    }
    if (genres.includes('folk') || genres.includes('country')) {
        return 'folk-storytelling';
    }
    if (genres.includes('jazz') || genres.includes('blues') || genres.includes('swing')) {
        return 'aaba-classic';
    }
    if (genres.includes('chanson')) {
        return 'aaba-classic';
    }
    if (genres.includes('ballad') || genres.includes('soul') || genres.includes('gospel')) {
        return 'ballad-instrumental-bridge';
    }
    // Default to standard pop structure for pop, r&b, etc.
    return 'pop-standard-vcvcbc';
};

export const getSuggestedStructureValueForAnime = (anime: AnimeTheme): string => {
    const styles = anime.styles.toLowerCase();

    if (styles.includes('metal') || styles.includes('hard rock')) {
        return 'metal-breakdown-solo';
    }
    if (styles.includes('j-rock') || styles.includes('rock')) {
        return 'rock-anthem-solo';
    }
     if (styles.includes('hip hop')) {
        return 'hip-hop-rap';
    }
    if (styles.includes('electronic') || styles.includes('eurobeat') || styles.includes('techno')) {
        return 'edm-dance-drop';
    }
    if (styles.includes('jazz') || styles.includes('blues')) {
        return 'aaba-classic';
    }
    if (styles.includes('ballad') || styles.includes('classical')) {
        return 'ballad-instrumental-bridge';
    }
    // Default for J-Pop and other common anime styles
    return 'pop-full-prechorus';
};

export const calculateGenerationCost = (
    mode: GenerationMode, 
    creditCosts: any,
    options: {
        activeSpecialTraitIds?: string[],
        styles?: string[],
        ambiances?: string[],
        translateLyrics?: boolean,
    }
): number => {
    let cost = 0;
    
    switch (mode) {
      case GenerationMode.Descriptive: cost += creditCosts.descriptive; break;
      case GenerationMode.Artist: cost += creditCosts.artist; break;
      case GenerationMode.Instrumental: cost += creditCosts.instrumental; break;
      case GenerationMode.AnimeOpening: cost += creditCosts.anime; break;
      case GenerationMode.Personalized: cost += creditCosts.personalized; break;
      case GenerationMode.LyricsImport:
        cost += options.translateLyrics ? creditCosts.descriptive : creditCosts.lyricsImport;
        break;
    }

    if (options.activeSpecialTraitIds && (mode === GenerationMode.Descriptive || mode === GenerationMode.Artist)) {
      cost += creditCosts.specialTrait * options.activeSpecialTraitIds.length;
    }
    if (options.styles) {
        cost += Math.max(0, options.styles.length - 2) * creditCosts.extraStyle;
    }
    if (options.ambiances) {
        cost += Math.max(0, options.ambiances.length - 1) * creditCosts.extraAmbiance;
    }

    return cost;
};
