import React, { useState, useMemo, useEffect, useContext, useRef, lazy, Suspense, useCallback } from 'react';
import * as geminiService from './services/geminiService';
import type { Settings, HistoryItem, Artist, SongStructure, FontColor, Achievement, PersonalProfile } from './types';
import { CopyrightOption, GenerationMode, SubscriptionPlan } from './types';
import { THEME_GRADIENTS } from '@constants/constants';
import { UserProvider, UserContext } from './contexts/SupabaseUserContext';
import { DataProvider, DataContext } from './contexts/DataContext';
import { HistoryProvider, HistoryContext } from './contexts/HistoryContext';
import { PersonalProfilesProvider, PersonalProfilesContext } from './contexts/PersonalProfilesContext';
import { SettingsContext, ThemeContext, FontColorContext, UIActionContext, AchievementContext, type ThemeColor } from './contexts/AppContexts';
import * as achievementService from './services/achievementService';
import { supabase } from './services/supabaseClient';
import AdminDashboard from './components/AdminDashboard';
import SettingsModal from './components/SettingsModal';
import SubscriptionModal from './components/subscriptions/SubscriptionModal';
import CreditPurchaseModal from './components/subscriptions/AccountModal';
import UserStatus from './components/subscriptions/UserStatus';
import AuthModal from './components/subscriptions/AuthModal';
import LegendModal from './components/common/LegendModal';
import AchievementsModal from './components/achievements/AchievementsModal';
import AchievementToast from './components/achievements/AchievementToast';
import TOS from './components/TOS';
import PrivacyPolicy from './components/PrivacyPolicy';
import CommunityGuidelines from './components/CommunityGuidelines';
import FAQ from './components/FAQ';
import AnimatedBackground from './components/common/AnimatedBackground';
import GlassCard from './components/common/GlassCard';
import ForceUsernameModal from './components/subscriptions/ForceUsernameModal';
import Loader from './components/common/Loader';
import ToastContainer, { ToastData } from './components/common/ToastContainer';

// FIX: Use React.lazy to dynamically import components, breaking the circular dependency
// that causes the "no default export" error.
const MainGenerator = lazy(() => import('./components/MainGenerator'))
const Analyzer = lazy(() => import('./components/Analyzer'));
const Editor = lazy(() => import('./components/Editor'));
const AccountView = lazy(() => import('./components/AccountView'));
const CommunityHub = lazy(() => import('./components/CommunityHub'));


// A custom hook to work with localStorage
function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    // This functional update form ensures we have the latest state.
    setStoredValue(currentStoredValue => {
      try {
        const valueToStore = value instanceof Function ? value(currentStoredValue) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      } catch (error) {
        console.error(error);
        return currentStoredValue;
      }
    });
  };
  
  return [storedValue, setValue];
}

const getYIQ = (hex: string): number => {
  if (!hex || hex.length < 7) return 0;
  try {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    // Using the YIQ formula to determine brightness
    return ((r * 299) + (g * 587) + (b * 114)) / 1000;
  } catch (e) {
    console.error("Error calculating YIQ:", e);
    return 0; // Default to dark on error
  }
};

const getContrastingTextColor = (hex: string): 'white' | 'black' => {
  const yiq = getYIQ(hex);
  return (yiq >= 128) ? 'black' : 'white';
};

// contexts moved to src/contexts/AppContexts

// --- Broadcast Toast Component ---
const MegaphoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
    </svg>
);

interface BroadcastToastProps {
    message: string;
    onClose: () => void;
}

const BroadcastToast: React.FC<BroadcastToastProps> = ({ message, onClose }) => {
    const [isExiting, setIsExiting] = useState(false);

    const handleClose = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setIsExiting(true);
        setTimeout(onClose, 500);
    };

    const animationClass = isExiting
        ? 'animate-[slide-out-top_0.5s_ease-in-out_forwards]'
        : 'animate-[slide-in-top_0.5s_ease-in-out_forwards]';

    return (
        <div 
            className={`relative w-full rounded-xl border border-primary/80 bg-primary/20 backdrop-blur-lg shadow-2xl overflow-hidden ${animationClass}`}
            role="alert"
        >
            <div className="p-4 flex items-start space-x-3">
                <div className="flex-shrink-0 text-2xl text-primary-light pt-1">
                    <MegaphoneIcon />
                </div>
                <div className="flex-grow">
                    <p className="font-semibold text-base-color">Annonce de l'équipe</p>
                    <p className="text-sm text-muted-color whitespace-pre-wrap">{message}</p>
                </div>
                <button
                    onClick={handleClose}
                    className="absolute top-1 right-1 p-1.5 text-white/60 hover:text-white/90"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
        </div>
    );
};

const Logo: React.FC<{ theme: ThemeColor }> = ({ theme }) => {
    return (
        <div className="flex items-center cursor-pointer select-none transition-all duration-300 hover:scale-110 active:scale-95" aria-label="Lyr-IA Home">
            <div 
                className="relative h-16 flex items-center"
                style={{
                    animation: 'glow-pulse 2.5s ease-in-out infinite',
                    filter: `drop-shadow(0 0 15px ${theme.primary}90) drop-shadow(0 0 35px ${theme.secondary}70) drop-shadow(0 0 55px ${theme.primary}40)`,
                    transition: 'filter 0.5s ease',
                }}
            >
                {/* SVG avec masque pour appliquer le dégradé exact du thème */}
                <svg className="h-16 w-auto" viewBox="0 0 1500 400" style={{ transition: 'all 0.5s ease' }}>
                    <defs>
                        {/* Dégradé vertical : personnalisé pour Aqualis, simple pour les autres */}
                        <linearGradient id={`logoGradientLyr-${theme.name}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            {theme.name === 'Aqualis' ? (
                                <>
                                    <stop offset="0%" style={{ stopColor: '#4ff4bc' }} />
                                    <stop offset="30%" style={{ stopColor: '#3bc7a8' }} />
                                    <stop offset="60%" style={{ stopColor: '#3275b8' }} />
                                    <stop offset="100%" style={{ stopColor: '#30259f' }} />
                                </>
                            ) : (
                                <>
                                    <stop offset="0%" style={{ stopColor: theme.secondary }} />
                                    <stop offset="100%" style={{ stopColor: theme.primary }} />
                                </>
                            )}
                        </linearGradient>
                        {/* Masque pour "Lyr" uniquement (partie gauche jusqu'à ~54%) */}
                        <mask id={`logoMaskLyr-${theme.name}`}>
                            <image href="/lyria-txt-white copie.png" width="1500" height="400" />
                            <rect x="810" y="0" width="690" height="400" fill="black" />
                        </mask>
                        {/* Masque pour "-IA" uniquement (partie droite à partir de ~54%) */}
                        <mask id={`logoMaskIA-${theme.name}`}>
                            <image href="/lyria-txt-white copie.png" width="1500" height="400" />
                            <rect x="0" y="0" width="810" height="400" fill="black" />
                        </mask>
                    </defs>
                    {/* "Lyr" avec dégradé */}
                    <rect 
                        width="1500" 
                        height="400" 
                        fill={`url(#logoGradientLyr-${theme.name})`} 
                        mask={`url(#logoMaskLyr-${theme.name})`}
                    />
                    {/* "-IA" en blanc */}
                    <rect 
                        width="1500" 
                        height="400" 
                        fill="#FFFFFF" 
                        mask={`url(#logoMaskIA-${theme.name})`}
                    />
                </svg>
            </div>
        </div>
    );
};

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);
const QuestionMarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const TrophyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;

type ActiveView = 'generator' | 'analyzer' | 'editor' | 'account' | 'community' | 'tos' | 'privacy' | 'guidelines' | 'faq' | 'admin';

function AppContent() {
  const appData = useContext(DataContext);
  
  const [activeView, setActiveView] = useState<ActiveView>('generator');
  const [settings, setSettings] = useState<Settings>({ amplifyPrompt: false, copyright: CopyrightOption.Standard, aiModel: 'gemini-2.5-flash', fontSize: 'medium' });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);
  const [isCreditModalOpen, setCreditModalOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isBgLoading, setIsBgLoading] = useState(false);
  const [isForceUsernameModalOpen, setForceUsernameModalOpen] = useState(false);

  
  const [theme, setThemeState] = useLocalStorage<ThemeColor>('lyria-theme', THEME_GRADIENTS[0]);
  const [fontColor, setFontColor] = useLocalStorage<FontColor>('lyria-font-color', 'white');

  // Update CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-primary-hover', theme.primaryHover);
    root.style.setProperty('--color-secondary', theme.secondary);
  }, [theme]);
  const [customBg, setCustomBg] = useLocalStorage<string | null>('lyria-custom-bg', null);
  const [imageToEdit, setImageToEdit] = useState<string | null>(null);
  const [lyricsToEdit, setLyricsToEdit] = useState<string | null>(null);
  const [lyricsToEditSource, setLyricsToEditSource] = useState<{ type: 'generator' | 'history', id?: number } | null>(null);
  
  // Achievement System State
  const [isAchievementsOpen, setAchievementsOpen] = useState(false);
  const [unlockedToasts, setUnlockedToasts] = useState<Achievement[]>([]);
  const [focusedAchievementId, setFocusedAchievementId] = useState<string | null>(null);

  // Easter Egg State
  const [navSequence, setNavSequence] = useState<string[]>([]);
  
  // Toast notifications
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // Broadcast Message State
  const [isBannerVisible, setBannerVisible] = useState(false);


  const { user, updateUserAchievement, upgradePlan, addCredits, broadcastMessage, refreshUserProfile } = useContext(UserContext);

  // Helper function to show toasts
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    const newToast: ToastData = {
      id: Date.now().toString() + Math.random(),
      message,
      type
    };
    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Debug: Log user state changes
  useEffect(() => {
  }, [user]);

  const accountViewRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoClickTimestamps = useRef<number[]>([]);
  const lastPlanCheckRef = useRef<string | null>(null);
  const isInitialMount = useRef(true);
  const achievementCheckInProgress = useRef(false);
  const shownToastsThisSession = useRef<Set<string>>(new Set());


  // State lifted from MainGenerator - now using HistoryContext instead of localStorage
  const { history, addToHistory, markAsCopied } = useContext(HistoryContext);
  const [currentHistoryId, setCurrentHistoryId] = useState<number | null>(null);

  // Wrapper pour maintenir la compatibilité avec les composants qui utilisent setHistory
  // TODO: Remplacer setHistory par addToHistory dans tous les composants
  const setHistory = useCallback((updater: React.SetStateAction<HistoryItem[]>) => {
    console.warn('setHistory est déprécié, utiliser addToHistory du HistoryContext');
  }, []);

  const [mode, setMode] = useState<GenerationMode>(GenerationMode.Descriptive);
  const [language, setLanguage] = useState<'français' | 'english' | 'japonais' | 'féroïen' | 'vieux norrois' | 'russe' | 'coréen'>('français');
  
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedAmbiances, setSelectedAmbiances] = useState<string[]>([]);
  
  const [mainInput, setMainInput] = useState(''); // Renamed from themeText
  const [usePrimaryStyles, setUsePrimaryStyles] = useState(true);
  const [keywords, setKeywords] = useState('');
  const [varyChoruses, setVaryChoruses] = useState(false);
  const [chorusDuration, setChorusDuration] = useState<'short' | 'medium' | 'long'>('medium');
  const [includeInstrumentalParts, setIncludeInstrumentalParts] = useState(false);
  const [activeSpecialTraitIds, setActiveSpecialTraitIds] = useState<string[]>([]);
  
  // Personal Profiles maintenant via context Supabase
  const { personalProfiles, saveProfile: savePersonalProfile } = useContext(PersonalProfilesContext);
  
  // Wrapper pour maintenir la compatibilité
  const setPersonalProfiles = useCallback((updater: React.SetStateAction<PersonalProfile[]>) => {
    console.warn('setPersonalProfiles est déprécié, utiliser saveProfile du PersonalProfilesContext');
  }, []);
  
  const [selectedProfileId, setSelectedProfileId] = useState<1 | 2 | 3 | null>(null);

  const [lyrics, setLyrics] = useState('');
  const [stylePrompt, setStylePrompt] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [albumArt, setAlbumArt] = useState('');
  const [burstResults, setBurstResults] = useState<HistoryItem['outputs'][]>([]);
  const [selectedBurstIndex, setSelectedBurstIndex] = useState(0);
  const [translateLyrics, setTranslateLyrics] = useState(false);
  const [instrumentalOnly, setInstrumentalOnly] = useState(false);

  // Pre-initialize with safe defaults before checking appData
  const songStructures = useMemo(() => {
    if (!appData) return [];
    return language === 'français' ? appData.songStructuresFr : appData.songStructuresEn;
  }, [language, appData]);
  
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [selectedAnimeTheme, setSelectedAnimeTheme] = useState<string>('');
  const [selectedStructure, setSelectedStructure] = useLocalStorage<SongStructure>('lyria-structure-object', songStructures[0]);

  // Les données sont maintenant toujours disponibles immédiatement (pas de chargement asynchrone)
  // Si appData est null, c'est une erreur critique
  if (!appData) {
    console.error('AppData is null - this should never happen!');
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="text-white text-center">
          <p className="text-xl mb-2">Erreur de chargement</p>
          <p className="text-sm text-white/70">Impossible de charger les données de l'application</p>
        </div>
      </div>
    );
  }

  const { artists, animeThemes, songStructuresFr, songStructuresEn, allAchievements, plans, creditPacks } = appData;
  
  // Initialize selectedArtist and selectedAnimeTheme after data loads
  useEffect(() => {
    if (artists && artists.length > 0 && !selectedArtist) {
      setSelectedArtist(artists[0]);
    }
    if (animeThemes && animeThemes.length > 0 && !selectedAnimeTheme) {
      setSelectedAnimeTheme(animeThemes[0].name);
    }
  }, [artists, animeThemes, selectedArtist, selectedAnimeTheme]);

  // Nouvelle implémentation qui utilise les stats de Supabase
  const triggerAchievementCheck = useCallback(async (action?: string, payload?: unknown) => {
    if (!user.isAuthenticated) return;
    
    // Prevent concurrent checks
    if (achievementCheckInProgress.current) {
      console.log('⏸️ Achievement check already in progress, skipping...');
      return;
    }
    
    achievementCheckInProgress.current = true;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      if (!userId) return;

      console.log('🏆 Checking achievements with Supabase stats...');

      // Récupérer les stats depuis Supabase
      const stats = await achievementService.getUserStats(userId);
      if (!stats) {
        console.log('❌ Could not fetch user stats');
        return;
      }

      console.log('📊 User stats:', stats);

      const newlyUnlocked: Achievement[] = [];
      const justUnlockedIds = new Set<string>(); // Track achievements unlocked in this check

      // Vérifier chaque achievement
      for (const achievement of allAchievements) {
        const currentProgress = user.achievements[achievement.id]?.progress || 0;
        const isUnlocked = !!user.achievements[achievement.id]?.unlockedAt;

        if (isUnlocked) continue; // Déjà débloqué

        let newProgress = currentProgress;

        // Calculer la progression selon le type d'achievement
        switch (achievement.id) {
          // Génération de chansons
          case 'gen_first_song':
          case 'gen_10_songs':
          case 'gen_50_songs':
          case 'gen_100_songs':
            newProgress = stats.total_songs;
            break;
          
          // Langues
          case 'gen_multilingual_3':
            newProgress = stats.languages_count;
            break;
          
          // Modes
          case 'gen_all_modes':
            newProgress = stats.modes_count;
            break;
          
          // Artistes
          case 'explore_artist_10':
          case 'explore_artist_50':
            newProgress = stats.artists_count;
            break;
          
          // Styles
          case 'explore_style_variety':
            newProgress = stats.styles_count;
            break;
          
          // Analyseur
          case 'explore_analyzer':
            newProgress = stats.total_analyzer_uses;
            break;
          
          // Burst generations
          case 'explore_song_burst':
          case 'explore_album_art_burst':
            newProgress = stats.total_burst_gens;
            break;
          
          // Streak
          case 'mastery_daily_streak':
            newProgress = stats.current_streak;
            break;
          
          // Album art
          case 'explore_album_art':
            newProgress = stats.total_album_arts;
            break;
          default:
            // Pour les achievements basés sur des actions spécifiques (easter eggs, etc.)
            if (achievement.check && action) {
              const payloadData = typeof payload === 'object' && payload !== null ? payload : {};
              const isRelevant = achievement.check({ action, ...payloadData }, history, user);
              if (isRelevant) {
                newProgress = currentProgress + 1;
              }
            }
            break;
        }

        // Mettre à jour si la progression a changé
        if (newProgress !== currentProgress) {
          const shouldUnlock = newProgress >= achievement.target;
          
          console.log(`🏆 Achievement ${achievement.id}: ${newProgress}/${achievement.target}`);
          
          await updateUserAchievement(achievement.id, newProgress, shouldUnlock);

          if (shouldUnlock && !isUnlocked && !justUnlockedIds.has(achievement.id)) {
            console.log(`✨ Achievement unlocked: ${achievement.name}`);
            justUnlockedIds.add(achievement.id);
            newlyUnlocked.push(achievement);
          }
        }
      }

      if (newlyUnlocked.length > 0) {
        setUnlockedToasts(prevToasts => {
          const existingToastIds = new Set(prevToasts.map(t => t.id));
          // Filter out achievements already shown this session
          const trulyNewToasts = newlyUnlocked.filter(a => {
            if (existingToastIds.has(a.id) || shownToastsThisSession.current.has(a.id)) {
              return false;
            }
            shownToastsThisSession.current.add(a.id);
            return true;
          });
          
          if (trulyNewToasts.length === 0) {
            return prevToasts;
          }
          
          return [...prevToasts, ...trulyNewToasts];
        });
      }

      console.log('✅ Achievement check complete');
    } catch (error) {
      console.error('❌ Error checking achievements:', error);
    } finally {
      achievementCheckInProgress.current = false;
    }
  }, [user, allAchievements, history, updateUserAchievement]);
  
  const handleSetRandomBg = async () => {
    setIsBgLoading(true);
    try {
        const imageBytes = await geminiService.generateRandomBackground();
        const imageUrl = `data:image/jpeg;base64,${imageBytes}`;
        setCustomBg(imageUrl);
        triggerAchievementCheck('GENERATE_RANDOM_BG');
    } catch (error) {
        console.error("Failed to generate random background:", error);
    } finally {
        setIsBgLoading(false);
    }
  };

    // --- EASTER EGG HANDLERS ---
    useEffect(() => {
        const requiredSequence = ['generator', 'analyzer', 'editor', 'generator'];
        if (navSequence.slice(-4).join(',') === requiredSequence.join(',')) {
            triggerAchievementCheck('STUDIO_TOUR');
            setNavSequence([]); // Reset to prevent re-triggering
        }
    }, [navSequence, triggerAchievementCheck]);

    useEffect(() => {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let userInput: string[] = [];

        const handler = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return; // Ignore if user is typing in an input
            }
            userInput.push(e.key.toLowerCase());
            userInput = userInput.slice(-konamiCode.length);

            if (userInput.join('') === konamiCode.map(k => k.toLowerCase()).join('')) {
                triggerAchievementCheck('KONAMI_CODE_ENTERED');
                userInput = [];
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);


    useEffect(() => {
      // Skip initial mount to prevent showing toasts on page load
      if (isInitialMount.current) {
        isInitialMount.current = false;
        lastPlanCheckRef.current = user.plan;
        return;
      }
      
      // State-based achievements (like subscription status)
      // Only trigger if plan actually changed to prevent spam
      if (lastPlanCheckRef.current !== user.plan) {
        lastPlanCheckRef.current = user.plan;
        triggerAchievementCheck('APP_STATE_CHANGE');
      }
    }, [user.plan, triggerAchievementCheck]);


  useEffect(() => {
    const isAnyModalOpen = isSettingsOpen || isLegendOpen || isSubscriptionModalOpen || isCreditModalOpen || isAuthModalOpen || isAchievementsOpen || isBannerVisible || isForceUsernameModalOpen;
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSettingsOpen, isLegendOpen, isSubscriptionModalOpen, isCreditModalOpen, isAuthModalOpen, isAchievementsOpen, isBannerVisible, isForceUsernameModalOpen]);
  
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                activeView === 'account' &&
                accountViewRef.current &&
                !accountViewRef.current.contains(event.target as Node) &&
                headerRef.current &&
                !headerRef.current.contains(event.target as Node)
            ) {
                setActiveView('generator');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeView, setActiveView]);


  useEffect(() => {
    // Show onboarding guide on every app load, as per user request.
    setIsLegendOpen(true);
  }, []);

  // This effect ensures that if the user changes language, the structure resets to a valid
  // one for that language, unless it's a custom structure they've built.
  useEffect(() => {
    const isCurrentStructureInList = songStructures.some(s => s.value === selectedStructure.value);
    const isCustomStructure = selectedStructure.value.startsWith('custom-');

    if (!isCurrentStructureInList && !isCustomStructure) {
      setSelectedStructure(songStructures[0]);
    }
  }, [language, songStructures, selectedStructure, setSelectedStructure]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-primary-hover', theme.primaryHover);
    root.style.setProperty('--color-secondary', theme.secondary);
    
    // Contrast for solid primary color
    root.style.setProperty('--color-text-on-primary', getContrastingTextColor(theme.primary));

    // Contrast for gradient
    const primaryYIQ = getYIQ(theme.primary);
    const secondaryYIQ = getYIQ(theme.secondary);
    const averageYIQ = (primaryYIQ + secondaryYIQ) / 2;
    const gradientContrastColor = (averageYIQ >= 128) ? 'black' : 'white';
    root.style.setProperty('--color-text-on-gradient', gradientContrastColor);
  }, [theme]);

  
  useEffect(() => {
    const root = document.documentElement;
    if (fontColor === 'white') {
        root.style.setProperty('--color-text-base', '#FFFFFF');
        root.style.setProperty('--color-text-muted', 'rgba(255, 255, 255, 0.7)');
        root.style.setProperty('--color-placeholder', 'rgba(255, 255, 255, 0.5)');
    } else { // black
        root.style.setProperty('--color-text-base', '#111827'); // Dark gray instead of pure black
        root.style.setProperty('--color-text-muted', 'rgba(17, 24, 39, 0.7)');
        root.style.setProperty('--color-placeholder', 'rgba(17, 24, 39, 0.5)');
    }
  }, [fontColor]);

  // Handle Stripe Redirect
  const paymentHandledRef = useRef(false);
  
  useEffect(() => {
      // Vérifier si on a déjà traité le paiement
      if (paymentHandledRef.current) return;
      
      const query = new URLSearchParams(window.location.search);

      // Vérifier si on doit traiter le retour de paiement
      if (!query.has("payment")) return;

      // Marquer comme traité IMMÉDIATEMENT
      paymentHandledRef.current = true;

      const paymentStatus = query.get("payment");
      const priceId = query.get("priceId");

      // Nettoyer l'URL
      window.history.replaceState({}, document.title, window.location.pathname);

      // Traiter le succès
      if (paymentStatus === "success" && priceId) {
          const plan = plans.find(p => p.stripePriceId === priceId);
          const creditPack = creditPacks.find(p => p.stripePriceId === priceId);

          if (plan) {
              refreshUserProfile().then(() => {
                  showToast(`Abonnement ${plan.name} activé avec succès ! 🎉`, 'success');
              });
          } else if (creditPack) {
              refreshUserProfile().then(() => {
                  showToast(`${creditPack.credits.toLocaleString()} crédits ajoutés avec succès ! 💰`, 'success');
              });
          }
      }

      // Traiter l'annulation
      if (paymentStatus === "cancel") {
          showToast("Le paiement a été annulé. Vous n'avez pas été débité.", 'warning');
      }
  }, [plans, creditPacks, refreshUserProfile, showToast]);


  const setTheme = (newTheme: ThemeColor) => {
      setThemeState(newTheme);
      triggerAchievementCheck('CUSTOMIZE_THEME');
  };

    // Handle Broadcast Message Display
    useEffect(() => {
        if (broadcastMessage) {
            const isDismissed = sessionStorage.getItem('dismissed-broadcast-id') === String(broadcastMessage.id);
            setBannerVisible(!isDismissed);
        } else {
            setBannerVisible(false);
        }
    }, [broadcastMessage]);

    // Check if user needs to set a username
    useEffect(() => {
        if (user.isAuthenticated && !user.username) {
            setForceUsernameModalOpen(true);
        } else {
            setForceUsernameModalOpen(false);
        }
    }, [user.isAuthenticated, user.username]);


    const handleDismissBanner = () => {
        if (broadcastMessage) {
            sessionStorage.setItem('dismissed-broadcast-id', String(broadcastMessage.id));
            setBannerVisible(false);
        }
    };
  
  const NavButton: React.FC<{ view: 'generator' | 'analyzer' | 'editor' | 'account' | 'community' | 'admin'; label: string; }> = ({ view, label }) => {
    const isActive = activeView === view;
    return (
      <button
        onClick={() => {
            setActiveView(view);
            setNavSequence(prev => [...prev, view]);
        }}
        className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-primary to-secondary text-on-primary shadow-lg scale-105' : 'text-muted-color hover:bg-white/10 hover:scale-105'}`}
      >
        {label}
      </button>
    );
  };

  const handleEditCover = (imageUrl: string) => {
    setImageToEdit(imageUrl);
    setLyricsToEdit(null);
    setActiveView('editor');
  };

  const handleEditLyrics = (lyricsContent: string, source: 'generator' | 'history', historyId?: number) => {
    setLyricsToEdit(lyricsContent);
    setLyricsToEditSource({ type: source, id: historyId });
    setImageToEdit(null);
    setActiveView('editor');
  };

  const handleLogoClick = () => {
      const now = Date.now();
      logoClickTimestamps.current.push(now);
      // Keep only timestamps from the last 3 seconds
      logoClickTimestamps.current = logoClickTimestamps.current.filter(ts => now - ts < 3000); 
      // Check for 15 clicks
      if (logoClickTimestamps.current.length >= 15) {
          triggerAchievementCheck('LOGO_SPAM_CLICKED');
          logoClickTimestamps.current = []; // Reset
      }
  };

  const handlePixelClick = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent other click handlers from firing
      triggerAchievementCheck('HIDDEN_PIXEL_CLICKED');
  };


  const generatorProps = {
    mode, setMode,
    language, setLanguage,
    selectedArtist, setSelectedArtist,
    selectedAnimeTheme, setSelectedAnimeTheme,
    selectedStructure, setSelectedStructure,
    selectedStyles, setSelectedStyles,
    selectedAmbiances, setSelectedAmbiances,
    theme: mainInput, setTheme: setMainInput,
    usePrimaryStyles, setUsePrimaryStyles,
    keywords, setKeywords,
    lyrics, setLyrics,
    stylePrompt, setStylePrompt,
    songTitle, setSongTitle,
    albumArt, setAlbumArt,
    history, 
    setHistory,
    addToHistory,
    currentHistoryId, setCurrentHistoryId,
    varyChoruses, setVaryChoruses,
    chorusDuration, setChorusDuration,
    includeInstrumentalParts, setIncludeInstrumentalParts,
    activeSpecialTraitIds, setActiveSpecialTraitIds,
    personalProfiles, setPersonalProfiles,
    selectedProfileId, setSelectedProfileId,
    burstResults, setBurstResults,
    selectedBurstIndex, setSelectedBurstIndex,
    translateLyrics, setTranslateLyrics,
    instrumentalOnly, setInstrumentalOnly,
    onEditCover: handleEditCover,
    onEditLyrics: (lyrics: string) => handleEditLyrics(lyrics, 'generator'),
  };
  
  const accountAndHistoryProps = {
    onOpenSubscriptionModal: () => setSubscriptionModalOpen(true),
    history, setHistory,
    setActiveView,
    setMode,
    setLanguage,
    setSelectedArtist,
    setSelectedAnimeTheme,
    setSelectedStructure,
    setSelectedStyles,
    setSelectedAmbiances,
    setThemeText: setMainInput,
    setUsePrimaryStyles,
    setKeywords,
    setLyrics,
    setStylePrompt,
    setSongTitle,
    setAlbumArt,
    setVaryChoruses,
    setChorusDuration,
    setIncludeInstrumentalParts,
    setActiveSpecialTraitIds,
    setSelectedProfileId,
    setBurstResults,
    setSelectedBurstIndex,
    setTranslateLyrics,
    onEditCover: handleEditCover,
    onEditLyrics: handleEditLyrics,
  };


  const handleLyricsChange = (newLyrics: string) => {
    setLyricsToEdit(newLyrics);
    if (lyricsToEditSource?.type === 'generator') {
        setLyrics(newLyrics);
    } else if (lyricsToEditSource?.type === 'history' && lyricsToEditSource.id) {
        const id = lyricsToEditSource.id;
        setHistory(prev => prev.map(item => 
            item.id === id 
            ? { ...item, outputs: { ...item.outputs, lyrics: newLyrics } } 
            : item
        ));
    }
  };
  
  const uiActions = {
      onAuthOpen: () => setAuthModalOpen(true),
      onUpgradeOpen: () => setSubscriptionModalOpen(true),
  };

  const renderActiveView = () => {
      switch (activeView) {
          case 'analyzer':
              return <Analyzer />;
          case 'editor':
              return <Editor 
                initialImage={imageToEdit}
                initialLyrics={lyricsToEdit}
                onLyricsChange={handleLyricsChange}
                language={language}
                onExit={() => { 
                    setImageToEdit(null); 
                    setLyricsToEdit(null); 
                    setLyricsToEditSource(null);
                    setActiveView('generator'); 
                }} 
              />;
          case 'account':
              return <AccountView ref={accountViewRef} {...accountAndHistoryProps} />;
          // TEMPORAIREMENT DÉSACTIVÉ - Hub Communautaire
          // case 'community':
          //     return <CommunityHub />;
          case 'admin':
              return <AdminDashboard />;
          case 'tos':
              return <TOS onExit={() => setActiveView('generator')} />;
          case 'privacy':
              return <PrivacyPolicy onExit={() => setActiveView('generator')} />;
          case 'guidelines':
              return <CommunityGuidelines onExit={() => setActiveView('generator')} />;
          case 'faq':
              return <FAQ onExit={() => setActiveView('generator')} />;
          default:
              return <MainGenerator {...generatorProps} />;
      }
  }

  const defaultBgUrl = 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1920&auto=format&fit=crop';
  const bgUrl = customBg || defaultBgUrl;

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <ThemeContext.Provider value={{ theme, setTheme, themes: THEME_GRADIENTS }}>
        <FontColorContext.Provider value={{ fontColor, setFontColor }}>
          <UIActionContext.Provider value={uiActions}>
          <AchievementContext.Provider value={{ triggerAchievementCheck }}>
            <main className="min-h-screen w-full font-sans flex flex-col relative">
              <div className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-[-1]" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${bgUrl})` }}></div>
              <AnimatedBackground />

              {/* Toast Container */}
              <ToastContainer toasts={toasts} onRemove={removeToast} />

              <div className="relative z-10 p-4 sm:p-6 lg:p-8 flex-grow">
                <header ref={headerRef} className="relative flex justify-between items-center mb-6">
                  <div onClick={handleLogoClick}>
                    <Logo theme={theme} />
                  </div>

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-1 space-x-1">
                      <NavButton view="generator" label="Générateur" />
                      <NavButton view="analyzer" label="Analyseur" />
                      <NavButton view="editor" label="Éditeur" />
                      {/* TEMPORAIREMENT DÉSACTIVÉ - Hub Communautaire */}
                      {/* <NavButton view="community" label="Communauté" /> */}
                      {(user.isAdmin || user.plan === SubscriptionPlan.SecretSociety) && <NavButton view="admin" label="Admin" />}
                  </div>
                  
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {user.isAuthenticated ? (
                        <>
                            <UserStatus 
                                onAccountClick={() => setActiveView('account')} 
                                onCreditsClick={() => setCreditModalOpen(true)} 
                            />
                            <div className="flex items-center bg-black/20 backdrop-blur-sm rounded-full border border-white/10 transition-all duration-300 hover:bg-black/30 hover:border-white/20">
                                <button onClick={() => setAchievementsOpen(true)} className="p-2 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-200 rounded-full hover:scale-110" title="Succès">
                                <TrophyIcon />
                                </button>
                                <button onClick={() => setIsLegendOpen(true)} className="p-2 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-200 rounded-full hover:scale-110" title="Aide et Légende">
                                <QuestionMarkIcon />
                                </button>
                                <button onClick={() => setIsSettingsOpen(true)} className="p-2 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-200 rounded-full hover:scale-110" title="Paramètres">
                                <SettingsIcon />
                                </button>
                            </div>
                        </>
                    ) : (
                  <button onClick={() => setAuthModalOpen(true)} className="px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-primary to-secondary text-on-primary hover:from-secondary hover:to-primary transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-pulse-glow relative overflow-hidden group">
                      <span className="relative z-10">Connexion / Inscription</span>
                      <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                  </button>
                    )}
                  </div>
                </header>
                
                <div className="flex justify-center lg:hidden my-4 animate-scale-in">
                  <div className="flex items-center bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-1 space-x-1 transition-all duration-300 hover:bg-black/30 hover:border-white/20">
                      <NavButton view="generator" label="Générateur" />
                      <NavButton view="analyzer" label="Analyseur" />
                      <NavButton view="editor" label="Éditeur" />
                      {/* TEMPORAIREMENT DÉSACTIVÉ - Hub Communautaire */}
                      {/* <NavButton view="community" label="Communauté" /> */}
                      {(user.isAdmin || user.plan === SubscriptionPlan.SecretSociety) && <NavButton view="admin" label="Admin" />}
                  </div>
                </div>
                <div className="max-w-screen-2xl mx-auto">
                    <Suspense fallback={<GlassCard className="min-w-[80vw] min-h-[50vh] flex items-center justify-center"><Loader /></GlassCard>}>
                      {renderActiveView()}
                    </Suspense>
                </div>
              </div>
              
              <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md">
                {isBannerVisible && broadcastMessage && (
                    <BroadcastToast
                        message={broadcastMessage.message}
                        onClose={handleDismissBanner}
                    />
                )}
              </div>
              
              <SettingsModal 
                isOpen={isSettingsOpen} 
                onClose={() => setIsSettingsOpen(false)} 
                customBg={customBg}
                setCustomBg={setCustomBg}
                onSetRandomBg={handleSetRandomBg}
                isBgLoading={isBgLoading}
              />
              <LegendModal isOpen={isLegendOpen} onClose={() => setIsLegendOpen(false)} onPixelClick={handlePixelClick} />
              <SubscriptionModal isOpen={isSubscriptionModalOpen} onClose={() => setSubscriptionModalOpen(false)} />
              <CreditPurchaseModal isOpen={isCreditModalOpen} onClose={() => setCreditModalOpen(false)} />
              <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
              <ForceUsernameModal isOpen={isForceUsernameModalOpen} onClose={() => setForceUsernameModalOpen(false)} />
              <AchievementsModal 
                isOpen={isAchievementsOpen} 
                onClose={() => {
                  setAchievementsOpen(false);
                  setFocusedAchievementId(null);
                }} 
                focusedAchievementId={focusedAchievementId}
              />
              
               {/* Achievement Toasts */}
                <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-3">
                    {unlockedToasts.map((achievement, index) => (
                        <AchievementToast
                            key={achievement.id + index}
                            achievement={achievement}
                            onClick={() => {
                                setFocusedAchievementId(achievement.id);
                                setAchievementsOpen(true);
                            }}
                            onClose={() => setUnlockedToasts(prev => prev.filter((a, i) => a.id !== achievement.id || i !== index))}
                        />
                    ))}
                </div>
                <footer className="relative z-10 text-center text-xs text-muted-color p-4">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                        <span>© {new Date().getFullYear()} Lyr-IA - Tous droits réservés.</span>
                        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                            <button onClick={() => setActiveView('tos')} className="hover:text-base-color underline transition-all duration-200 hover:scale-105">
                                Conditions d'Utilisation
                            </button>
                            <button onClick={() => setActiveView('privacy')} className="hover:text-base-color underline transition-all duration-200 hover:scale-105">
                                Politique de Confidentialité
                            </button>
                            <button onClick={() => setActiveView('guidelines')} className="hover:text-base-color underline transition-all duration-200 hover:scale-105">
                                Règles de la Communauté
                            </button>
                            <button onClick={() => setActiveView('faq')} className="hover:text-base-color underline transition-all duration-200 hover:scale-105">
                                FAQ
                            </button>
                        </div>
                    </div>
                </footer>
            </main>
          </AchievementContext.Provider>
          </UIActionContext.Provider>
        </FontColorContext.Provider>
      </ThemeContext.Provider>
    </SettingsContext.Provider>
  );
}

const App = () => {
  return (
    <DataProvider>
      <UserProvider>
        <HistoryProvider>
          <PersonalProfilesProvider>
            <AppContent />
          </PersonalProfilesProvider>
        </HistoryProvider>
      </UserProvider>
    </DataProvider>
  );
};

export default App;