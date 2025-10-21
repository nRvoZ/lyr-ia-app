

import React, { createContext, useState, useEffect } from 'react';
import type { Artist, AnimeTheme, SongStructure, Plan, CreditPack, Achievement } from '../types';
import { ACHIEVEMENT_CHECKS } from '@constants/constants_achievements';

// Import data directly from local constant files
import { ARTISTS } from '@constants/constants_artists';
import { ANIME_THEMES } from '@constants/constants_anime';
import { SONG_STRUCTURES_FR, SONG_STRUCTURES_EN } from '@constants/constants_structures';
import { STYLES, AMBIANCES } from '@constants/constants_styles';
import { PLANS, CREDIT_PACKS, CREDIT_COSTS } from '@constants/constants_monetization';
import { ACHIEVEMENTS_DATA } from '@constants/constants_achievements_data';

export interface AppData {
  artists: Artist[];
  animeThemes: AnimeTheme[];
  songStructuresFr: SongStructure[];
  songStructuresEn: SongStructure[];
  styles: string[];
  ambiances: string[];
  plans: Plan[];
  creditPacks: CreditPack[];
  creditCosts: { [key: string]: number };
  allAchievements: Achievement[];
}

// The context now holds AppData or null while loading.
export const DataContext = createContext<AppData | null>(null);

// Préparer les données immédiatement au moment du chargement du module
const prepareAppData = (): AppData => {
  try {
    // "Rehydrate" the achievements with their check functions.
    const hydratedAchievements = ACHIEVEMENTS_DATA.map((ach) => ({
      ...ach,
      check: ACHIEVEMENT_CHECKS[ach.id] || (() => false),
    })) as Achievement[];
    
    return {
      artists: ARTISTS,
      animeThemes: ANIME_THEMES,
      songStructuresFr: SONG_STRUCTURES_FR,
      songStructuresEn: SONG_STRUCTURES_EN,
      styles: STYLES,
      ambiances: AMBIANCES,
      plans: PLANS,
      creditPacks: CREDIT_PACKS,
      creditCosts: CREDIT_COSTS,
      allAchievements: hydratedAchievements,
    };
  } catch (error) {
    console.error("Failed to construct application data from local constants:", error);
    throw error;
  }
};

// Les données sont préparées une seule fois au chargement du module
const STATIC_APP_DATA = prepareAppData();

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Les données sont maintenant immédiatement disponibles, pas besoin de useState/useEffect
  return (
    <DataContext.Provider value={STATIC_APP_DATA}>
      {children}
    </DataContext.Provider>
  );
};
