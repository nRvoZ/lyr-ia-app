// FIX: Import missing Achievement and AchievementTier types.
import { HistoryItem, UserState, GenerationMode, SubscriptionPlan, Achievement, AchievementTier } from '../src/types';

// The achievement definitions (name, description, reward, etc.) now live in supabase_seed.json
// This file now only contains the logic (the `check` function) for each achievement.
// This allows us to load static data from a database and "rehydrate" it with its logic.

export const ACHIEVEMENT_CHECKS: Record<string, (payload: any, history: HistoryItem[], userState: UserState) => boolean> = {
  gen_first_song: (payload, history) => payload.action === 'SONG_GENERATED' && history.length === 0,
  gen_10_songs: (payload) => payload.action === 'SONG_GENERATED',
  gen_50_songs: (payload) => payload.action === 'SONG_GENERATED',
  gen_100_songs: (payload) => payload.action === 'SONG_GENERATED',
  gen_all_modes: (payload, history) => {
    if (payload.action !== 'SONG_GENERATED') return false;
    const allHistory = [...history, {mode: payload.mode} as any];
    const modesUsed = new Set(allHistory.map(item => item.mode));
    return modesUsed.has(GenerationMode.Descriptive) && modesUsed.has(GenerationMode.Artist) && modesUsed.has(GenerationMode.Instrumental) && modesUsed.has(GenerationMode.AnimeOpening) && modesUsed.has(GenerationMode.Personalized);
  },
  gen_multilingual_3: (payload, history) => {
    if (payload.action !== 'SONG_GENERATED') return false;
    const allHistory = [...history, {language: payload.language} as any];
    const languagesUsed = new Set(allHistory.map(item => item.language));
    return languagesUsed.size >= 3;
  },
  gen_viking_tongue: (payload) => payload.action === 'SONG_GENERATED' && (payload.language === 'féroïen' || payload.language === 'vieux norrois'),
  gen_queen_rhapsody: (payload) => payload.action === 'SONG_GENERATED' && payload.structure?.value === 'queen-operatic-rhapsody',
  explore_analyzer: (payload) => payload.action === 'ANALYZE_SONG',
  explore_editor_image: (payload) => payload.action === 'EDIT_IMAGE',
  explore_rhyme_dictionary: (payload) => payload.action === 'USE_RHYME_DICTIONARY',
  explore_special_trait: (payload) => payload.action === 'USE_SPECIAL_TRAIT',
  explore_quick_prompt: (payload) => payload.action === 'QUICK_PROMPT_USED',
  explore_advanced_structure: (payload) => payload.action === 'CUSTOM_STRUCTURE_CREATED' && (payload.parts?.length || 0) > 0,
  explore_random_bg: (payload) => payload.action === 'GENERATE_RANDOM_BG',
  explore_marketing_kit: (payload) => payload.action === 'GENERATE_MARKETING_KIT',
  explore_song_burst: (payload) => payload.action === 'SONG_BURST_GENERATED',
  explore_album_art_burst: (payload) => payload.action === 'EXPLORE_ALBUM_ART_BURST',
  explore_personalized_training: (payload) => payload.action === 'SONG_GENERATED' && payload.mode === GenerationMode.Personalized,
  secret_customize_theme: (payload) => payload.action === 'CUSTOMIZE_THEME',
  secret_daft_punk_robot: (payload) => payload.action === 'SONG_GENERATED' && payload.artist?.name === 'Daft Punk' && payload.activeSpecialTraitIds?.includes('vocoder-vocals') && payload.activeSpecialTraitIds?.includes('robotic-chant'),
  collection_5_artists: (payload, history) => {
    if (payload.action !== 'SONG_GENERATED' || !payload.artist) return false;
    const allHistory = [...history, {inputs: { artist: payload.artist }} as any];
    const artistsUsed = new Set(allHistory.map(item => item.inputs.artist?.name).filter(Boolean));
    return artistsUsed.size >= 5;
  },
  collection_15_artists: (payload, history) => {
    if (payload.action !== 'SONG_GENERATED' || !payload.artist) return false;
    const allHistory = [...history, {inputs: { artist: payload.artist }} as any];
    const artistsUsed = new Set(allHistory.map(item => item.inputs.artist?.name).filter(Boolean));
    return artistsUsed.size >= 15;
  },
  collection_30_artists: (payload, history) => {
    if (payload.action !== 'SONG_GENERATED' || !payload.artist) return false;
    const allHistory = [...history, {inputs: { artist: payload.artist }} as any];
    const artistsUsed = new Set(allHistory.map(item => item.inputs.artist?.name).filter(Boolean));
    return artistsUsed.size >= 30;
  },
  collection_5_covers: (payload) => payload.action === 'GENERATE_ALBUM_ART',
  collection_25_covers: (payload) => payload.action === 'GENERATE_ALBUM_ART',
  mastery_eminem_all_traits: (payload) => payload.action === 'SONG_GENERATED' && payload.artist?.name === 'Eminem' && payload.activeSpecialTraitIds?.length === 4,
  mastery_fusion: (payload) => payload.action === 'SONG_GENERATED' && payload.mode === GenerationMode.Artist && !payload.usePrimaryStyles && payload.styles?.length >= 3,
  mastery_unlock_all_bronze: (payload, history, userState) => {
    // This logic is tricky without the full list. We assume the full list is available elsewhere.
    // For now, this is a placeholder. The check will be more complex in the app.
    return false; // This logic needs to be run inside the app where the full list is present.
  },
  mastery_unlock_all_silver: () => false, // Same as above
  prestige_ultimate_member: (payload, history, userState) => userState.plan === SubscriptionPlan.Ultimate,
  prestige_annual_member: (payload, history, userState) => [SubscriptionPlan.CreatorAnnual, SubscriptionPlan.ProAnnual, SubscriptionPlan.UltimateAnnual].includes(userState.plan),
  easter_egg_bohemian_rhapsody: (payload) => payload.action === 'SONG_GENERATED' && payload.theme?.toLowerCase().includes('bohemian rhapsody'),
  easter_egg_808s_heartbreak: (payload) => payload.action === 'SONG_GENERATED' && payload.theme?.toLowerCase().includes('808') && payload.theme?.toLowerCase().includes('heartbreak'),
  easter_egg_master_of_puppets: (payload) => payload.action === 'CUSTOM_STRUCTURE_CREATED' && payload.parts?.length >= 15,
  easter_egg_rhyme_orange: (payload) => payload.action === 'RHYME_ORANGE',
  easter_egg_all_about_the_hook: (payload) => {
    if (payload.action !== 'CUSTOM_STRUCTURE_CREATED') return false;
    const parts = payload.parts || [];
    return parts.length === 4 && (parts.every(p => p === '[CHORUS]') || parts.every(p => p === '[REFRAIN]'));
  },
  easter_egg_acid_house: (payload) => payload.action === 'QUICK_PROMPT_ACID_HOUSE',
  easter_egg_sound_check: (payload) => payload.action === 'SOUND_CHECK',
  easter_egg_studio_tour: (payload) => payload.action === 'STUDIO_TOUR',
  easter_egg_franco_viking: (payload) => payload.action === 'SONG_GENERATED' && payload.artist?.name === 'Vígundr' && payload.language === 'français',
  easter_egg_lofi_beats: (payload) => payload.action === 'SONG_GENERATED' && payload.mode === GenerationMode.Instrumental && payload.styles?.includes('Lo-fi') && payload.styles?.includes('Chillwave') && payload.styles?.includes('Jazz'),
  easter_egg_konami_code: (payload) => payload.action === 'KONAMI_CODE_ENTERED',
  easter_egg_logo_spam: (payload) => payload.action === 'LOGO_SPAM_CLICKED',
  easter_egg_sandwich: (payload) => payload.action === 'SANDWICH_REQUEST',
  easter_egg_hidden_pixel: (payload) => payload.action === 'HIDDEN_PIXEL_CLICKED',
  easter_egg_over_9000: (payload) => payload.action === 'SONG_GENERATED' && payload.theme?.toLowerCase().includes('over 9000'),
  easter_egg_all_your_base: (payload) => payload.action === 'QUICK_PROMPT_ALL_YOUR_BASE',
  easter_egg_man_machine: (payload) => payload.action === 'SONG_GENERATED' && payload.artist?.name === 'Kraftwerk' && payload.theme?.toLowerCase().includes('man-machine'),
  easter_egg_theme_spammer: (payload) => payload.action === 'THEME_SPAM',
  easter_egg_number_of_the_beast: (payload) => payload.action === 'SONG_GENERATED' && payload.artist?.name === 'Iron Maiden' && payload.theme?.toLowerCase().includes('the number of the beast'),
  easter_egg_rickroll: (payload) => payload.action === 'SONG_GENERATED' && payload.theme?.toLowerCase().includes('never gonna give you up'),
};

// A helper to re-add the master achievement logic which needs the full list.
// This logic will be called inside the app after data is loaded.
export const rehydrateMasteryAchievements = (allAchievements: Achievement[], userState: UserState) => {
  ACHIEVEMENT_CHECKS.mastery_unlock_all_bronze = () => {
    const bronzeAchievements = allAchievements.filter(a => a.tier === AchievementTier.Bronze && a.id !== 'mastery_unlock_all_bronze');
    return bronzeAchievements.every(a => userState.achievements[a.id]?.unlockedAt);
  };
  ACHIEVEMENT_CHECKS.mastery_unlock_all_silver = () => {
    const silverAchievements = allAchievements.filter(a => a.tier === AchievementTier.Silver && a.id !== 'mastery_unlock_all_silver');
    return silverAchievements.every(a => userState.achievements[a.id]?.unlockedAt);
  };
};
