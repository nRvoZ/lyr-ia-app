import React, { createContext } from 'react';
import type { Settings, FontColor } from '../types';
import { CopyrightOption } from '../types';
import { THEME_GRADIENTS } from '@constants/constants';

export type ThemeColor = { name: string; primary: string; primaryHover: string; secondary: string; };

export const SettingsContext = createContext<{ settings: Settings; setSettings: React.Dispatch<React.SetStateAction<Settings>> }>({
  settings: { 
    amplifyPrompt: false, 
    copyright: CopyrightOption.Standard, 
    aiModel: 'gemini-2.5-flash',
    fontSize: 'medium'
  },
  setSettings: () => {},
});

export const ThemeContext = createContext<{
  theme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  themes: ThemeColor[];
}>({
  theme: THEME_GRADIENTS[0],
  setTheme: () => {},
  themes: THEME_GRADIENTS,
});

export const FontColorContext = createContext<{
  fontColor: FontColor;
  setFontColor: React.Dispatch<React.SetStateAction<FontColor>>;
}>({
  fontColor: 'white',
  setFontColor: () => {},
});

export const UIActionContext = createContext({
  onAuthOpen: () => {},
  onUpgradeOpen: () => {},
});

export const AchievementContext = createContext<{
  triggerAchievementCheck: (action?: string, _payload?: unknown) => void | Promise<void>;
}>({
  triggerAchievementCheck: async (action?: string, _payload?: unknown) => {},
});




