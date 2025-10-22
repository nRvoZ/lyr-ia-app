export interface Artist {
  name: string;
  genres: string;
  suggestedStructureValue?: string;
  specialTraits?: {
    id: string;
    name: string;
    description: string;
    promptInstruction: string;
    lyricInstruction: string;
  }[];
}

export interface AnimeTheme {
  name: string;
  styles: string;
}

export interface SongStructure {
  name: string;
  value: string;
  parts: string[];
}

export enum GenerationMode {
  Descriptive = 'Descriptive',
  Artist = 'Artist',
  Instrumental = 'Instrumental',
  AnimeOpening = 'AnimeOpening',
  Personalized = 'Personalized',
  LyricsImport = 'LyricsImport',
  Freestyle = 'Freestyle',
}

export enum CopyrightOption {
  Standard = 'Standard',
  CopyrightFree = 'Copyright-Free',
  Modulated = 'Modulated',
}

export interface Settings {
  amplifyPrompt: boolean;
  copyright: CopyrightOption;
  aiModel: string;
  fontSize: 'small' | 'medium' | 'large';
}

export interface PersonalProfile {
  id: 1 | 2 | 3;
  name: string;
  styleDescription: string;
  exampleLyrics: string;
}

export interface HistoryItem {
  id: number;
  timestamp: string;
  mode: GenerationMode;
  language: 'français' | 'english' | 'japonais' | 'féroïen' | 'vieux norrois' | 'russe' | 'coréen';
  inputs: {
    theme?: string;
    lyrics?: string; // Added for LyricsImport mode
    artist?: Artist | null;
    animeTheme?: string;
    styles?: string[];
    ambiances?: string[];
    structure?: SongStructure;
    usePrimaryStyles?: boolean;
    keywords?: string;
    varyChoruses?: boolean;
    chorusDuration?: 'short' | 'medium' | 'long';
    includeInstrumentalParts?: boolean;
    activeSpecialTraitIds?: string[];
    selectedProfileId?: 1 | 2 | 3; // For IA-Training
    translateLyrics?: boolean; // For LyricsImport translation
  };
  outputs: {
    lyrics: string;
    stylePrompt: string;
    songTitle?: string;
  };
  burstOutputs?: { lyrics: string; stylePrompt: string }[];
  albumArt?: string;
  verificationResult?: {
    isCompliant: boolean;
    reason: string;
    refundedAmount?: number;
    verifiedAt: string;
  };
  isCopied?: boolean;
  isFavorite?: boolean;
  creditsUsed?: number;
  generationTimeMs?: number;
}

export type FontColor = 'white' | 'black';

// --- Achievement System Types ---
export enum AchievementTier {
    Bronze = 'Bronze',
    Silver = 'Silver',
    Gold = 'Gold',
    Diamond = 'Diamond',
}

export enum AchievementCategory {
    Generation = 'Génération',
    Exploration = 'Exploration',
    Collection = 'Collection',
    Mastery = 'Maîtrise',
    Prestige = 'Prestige',
    EasterEgg = 'Easter Egg',
}

export enum RewardType {
    Credits = 'credits',
    Title = 'title',
    Theme = 'theme',
}

export enum TitleColor {
    White = 'white',           // Titres communs
    Green = 'green',           // Titres Bronze
    Blue = 'blue',             // Titres Silver
    Purple = 'purple',         // Titres Gold
    Orange = 'orange',         // Titres Diamond
    Red = 'red',               // Titres Légendaires
    Rainbow = 'rainbow',       // Titres Ultra-Rares
    Gold = 'gold',             // Titres Prestige
}

export interface AchievementReward {
    type: RewardType;
    value: number | string;
    description: string;
    titleColor?: TitleColor;   // Couleur du titre si c'est une récompense de titre
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    tier: AchievementTier;
    category: AchievementCategory;
    isSecret: boolean;
    check: (payload: any, history: HistoryItem[], userState: UserState) => boolean; // A simple check function
    target: number; // For progress-based achievements
    reward?: AchievementReward;
    icon?: string; // Emoji/icône spécifique pour cet achievement
}

// Stored in user state
export interface UserAchievement {
    progress: number;
    unlockedAt?: string; // ISO date string
    isClaimed?: boolean;
}

export type UserAchievements = Record<string, UserAchievement>;


// --- Subscription System Types ---

export enum SubscriptionPlan {
  Free = 'Free',
  Creator = 'Creator',
  Pro = 'Pro',
  Ultimate = 'Ultimate',
  Business = 'Business',
  CreatorAnnual = 'Creator Annual',
  ProAnnual = 'Pro Annual',
  UltimateAnnual = 'Ultimate Annual',
  BusinessAnnual = 'Business Annual',
  SecretSociety = 'SecretSociety',  // Valeur technique (en BDD) - Nom affiché défini dans constants_monetization
}

export interface UserState {
  isAuthenticated: boolean;
  isAdmin?: boolean;
  isBanned?: boolean;
  plan: SubscriptionPlan;
  credits: number | 'unlimited';
  username?: string;
  email?: string;
  profilePictureUrl?: string;
  achievements: UserAchievements;
  unlockedTitles?: string[];
  activeTitle?: string;
  unlockedThemes?: string[];
  activeTheme?: string;
}

export interface Plan {
  id: SubscriptionPlan;
  name: string;
  price: string;
  priceDetails: string;
  features: string[];
  credits: number | 'unlimited';
  stripePriceId: string; // Added for Stripe integration
  isMostPopular?: boolean;
}

export interface CreditPack {
    credits: number;
    price: string;
    stripePriceId: string; // Added for Stripe integration
}

export interface BroadcastMessage {
  message: string;
  id: number; // timestamp
}

export interface MarketingKitData {
  socialMediaPosts: {
    instagram: { text: string; hashtags: string };
    twitter: { text: string; hashtags: string };
    tiktok: { text: string; hashtags: string };
  };
  pressRelease: string;
  artistBio: string;
  visualIdeas: string[];
}