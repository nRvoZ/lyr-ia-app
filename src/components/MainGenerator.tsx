import React, { useState, useMemo, useContext, useEffect } from 'react';
import { GenerationMode, SubscriptionPlan, MarketingKitData, PersonalProfile } from '../types';
import type { Artist, SongStructure, HistoryItem, UserState } from '../types';
import { getSuggestedStructureValueForArtist, getSuggestedStructureValueForAnime, calculateGenerationCost } from '@constants/constants';
import * as geminiService from '../services/geminiService';
import { SettingsContext, UIActionContext, AchievementContext } from '../contexts/AppContexts';
import { UserContext } from '../contexts/SupabaseUserContext';
import { DataContext } from '../contexts/DataContext';
import { usePlanRestrictions } from '../hooks/usePlanRestrictions';
import GlassCard from './common/GlassCard';
import Loader from './common/Loader';
import LyricsDisplay from './common/LyricsDisplay';
import ModeSelector from './common/ModeSelector';
import ArtistSearch from './selectors/ArtistSearch';
import AnimeThemeSelector from './selectors/AnimeThemeSelector';
import StructureControls from './controls/StructureControls';
import ModernCheckbox from './common/ModernCheckbox';
import SubscriptionModal from './subscriptions/SubscriptionModal';
import PlanLockOverlay from './common/PlanLockOverlay';
import { PremiumIcon } from './common/LockIcons';
import MarketingKitModal from './marketing/MarketingKitModal';
import PersonalProfileModal from './PersonalProfileModal';
import * as achievementService from '../services/achievementService';
import { supabase } from '../services/supabaseClient';

// --- PROPS INTERFACE ---
interface MainGeneratorProps {
    mode: GenerationMode;
    setMode: React.Dispatch<React.SetStateAction<GenerationMode>>;
    language: 'français' | 'english' | 'japonais' | 'féroïen' | 'vieux norrois' | 'russe' | 'coréen';
    setLanguage: React.Dispatch<React.SetStateAction<'français' | 'english' | 'japonais' | 'féroïen' | 'vieux norrois' | 'russe' | 'coréen'>>;
    selectedArtist: Artist | null;
    setSelectedArtist: React.Dispatch<React.SetStateAction<Artist | null>>;
    selectedAnimeTheme: string;
    setSelectedAnimeTheme: React.Dispatch<React.SetStateAction<string>>;
    selectedStructure: SongStructure;
    setSelectedStructure: React.Dispatch<React.SetStateAction<SongStructure>>;
    selectedStyles: string[];
    setSelectedStyles: React.Dispatch<React.SetStateAction<string[]>>;
    selectedAmbiances: string[];
    setSelectedAmbiances: React.Dispatch<React.SetStateAction<string[]>>;
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    usePrimaryStyles: boolean;
    setUsePrimaryStyles: React.Dispatch<React.SetStateAction<boolean>>;
    keywords: string;
    setKeywords: React.Dispatch<React.SetStateAction<string>>;
    lyrics: string;
    setLyrics: React.Dispatch<React.SetStateAction<string>>;
    stylePrompt: string;
    setStylePrompt: React.Dispatch<React.SetStateAction<string>>;
    songTitle: string;
    setSongTitle: React.Dispatch<React.SetStateAction<string>>;
    albumArt: string;
    setAlbumArt: React.Dispatch<React.SetStateAction<string>>;
    history: HistoryItem[];
    setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>;
    addToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => Promise<void>;
    currentHistoryId: number | null;
    setCurrentHistoryId: React.Dispatch<React.SetStateAction<number | null>>;
    varyChoruses: boolean;
    setVaryChoruses: React.Dispatch<React.SetStateAction<boolean>>;
    chorusDuration: 'short' | 'medium' | 'long';
    setChorusDuration: React.Dispatch<React.SetStateAction<'short' | 'medium' | 'long'>>;
    includeInstrumentalParts: boolean;
    setIncludeInstrumentalParts: React.Dispatch<React.SetStateAction<boolean>>;
    activeSpecialTraitIds: string[];
    setActiveSpecialTraitIds: React.Dispatch<React.SetStateAction<string[]>>;
    personalProfiles: PersonalProfile[];
    setPersonalProfiles: React.Dispatch<React.SetStateAction<PersonalProfile[]>>;
    selectedProfileId: 1 | 2 | 3 | null;
    setSelectedProfileId: React.Dispatch<React.SetStateAction<1 | 2 | 3 | null>>;
    burstResults: HistoryItem['outputs'][];
    setBurstResults: React.Dispatch<React.SetStateAction<HistoryItem['outputs'][]>>;
    selectedBurstIndex: number;
    setSelectedBurstIndex: React.Dispatch<React.SetStateAction<number>>;
    translateLyrics: boolean;
    setTranslateLyrics: React.Dispatch<React.SetStateAction<boolean>>;
    instrumentalOnly?: boolean;
    setInstrumentalOnly?: React.Dispatch<React.SetStateAction<boolean>>;
    onEditCover: (imageUrl: string) => void;
    onEditLyrics: (lyrics: string) => void;
}

// --- REUSABLE SUB-COMPONENTS ---
const FormGroup: React.FC<{ label: React.ReactNode; children: React.ReactNode; className?: string }> = ({ label, children, className }) => (
  <div className={className}>
    <div className="block text-sm font-semibold text-muted-color mb-2">{label}</div>
    {children}
  </div>
);
interface IconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}
const CrownIcon = PremiumIcon;

interface LanguageSelectorProps {
    language: 'français' | 'english' | 'japonais' | 'féroïen' | 'vieux norrois' | 'russe' | 'coréen';
    setLanguage: (lang: 'français' | 'english' | 'japonais' | 'féroïen' | 'vieux norrois' | 'russe' | 'coréen') => void;
    user: UserState;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, setLanguage, user }) => {
    const { onAuthOpen, onUpgradeOpen } = useContext(UIActionContext);
    const { triggerAchievementCheck } = useContext(AchievementContext);
    const areLanguagesLocked = user.plan === SubscriptionPlan.Free || user.plan === SubscriptionPlan.Creator;
    const lockedLanguages = ['japonais', 'féroïen', 'vieux norrois', 'russe', 'coréen'];
    
    const mainLanguages = ['français', 'english', 'japonais', 'russe'] as const;
    const mainLanguagesRow2 = ['coréen'] as const;
    const artistLanguages = ['féroïen', 'vieux norrois'] as const;

    // Fallback if a locked language is somehow selected on a free plan
    useEffect(() => {
        if (areLanguagesLocked && lockedLanguages.includes(language)) {
            setLanguage('français');
        }
    }, [areLanguagesLocked, language, setLanguage]);

    const handleLanguageChange = (lang: 'français' | 'english' | 'japonais' | 'féroïen' | 'vieux norrois' | 'russe' | 'coréen') => {
        setLanguage(lang);
        triggerAchievementCheck('LANGUAGE_USED', { language: lang });
    };

    const LangButton: React.FC<{ lang: string; isSelected: boolean }> = ({ lang, isSelected }) => {
        const isLocked = areLanguagesLocked && lockedLanguages.includes(lang);

        const handleClick = () => {
            if (isLocked) {
                if (user.isAuthenticated) {
                    onUpgradeOpen();
                } else {
                    onAuthOpen();
                }
            } else {
                handleLanguageChange(lang as any);
            }
        };

        return (
            <button
                onClick={handleClick}
                className={`px-4 py-2 text-sm font-semibold rounded-md flex-1 flex items-center justify-center transition-all duration-300 capitalize ${
                    isSelected && !isLocked ? 'bg-gradient-to-r from-primary to-secondary text-on-primary shadow-lg scale-105' : 'text-muted-color hover:bg-white/50 dark:hover:bg-black/30 hover:scale-105'
                } ${
                    isLocked ? 'opacity-60 cursor-pointer' : ''
                }`}
                title={isLocked ? "Fonctionnalité premium. Passez à un plan supérieur pour débloquer." : ""}
            >
                <span>{lang}</span>
                {isLocked && <CrownIcon />}
            </button>
        );
    };

    return (
        <div className="space-y-4">
             <div>
                <p className="text-xs text-muted-color mb-1">Langues courantes</p>
                <div className="flex space-x-2 rounded-lg bg-black/20 p-1">
                    {mainLanguages.map(lang => <LangButton key={lang} lang={lang} isSelected={language === lang} />)}
                </div>
                <div className="flex justify-center space-x-2 rounded-lg bg-black/20 p-1 mt-2">
                    {mainLanguagesRow2.map(lang => <LangButton key={lang} lang={lang} isSelected={language === lang} />)}
                </div>
            </div>
            <div>
                 <p className="text-xs text-muted-color mb-1">Langues spécifiques</p>
                <div className="flex space-x-2 rounded-lg bg-black/20 p-1">
                    {artistLanguages.map(lang => <LangButton key={lang} lang={lang} isSelected={language === lang} />)}
                </div>
            </div>
        </div>
    );
};

const StyleSelector: React.FC<{ selected: string[]; toggle: (style: string) => void; collection: string[]; }> = ({ selected, toggle, collection }) => (
    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 rounded-lg bg-black/10 border border-white/10">
        {collection.map(item => (
            <button key={item} onClick={() => toggle(item)} className={`px-3 py-1 text-xs rounded-full transition-colors ${selected.includes(item) ? 'bg-primary text-on-primary' : 'bg-white/50 dark:bg-black/30 text-base-color hover:bg-white/80 dark:hover:bg-black/50'}`}>
                {item}
            </button>
        ))}
    </div>
);

interface ResultsDisplayProps extends Pick<MainGeneratorProps, 'lyrics'|'stylePrompt'|'songTitle'|'setSongTitle'|'albumArt'|'setAlbumArt'|'setHistory'|'currentHistoryId'|'language'|'onEditCover'|'onEditLyrics'|'burstResults'|'selectedBurstIndex'> {
  setMarketingKit: (kit: MarketingKitData) => void;
  setMarketingModalOpen: (isOpen: boolean) => void;
  onBurstTabChange: (index: number) => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = (props) => {
    const { lyrics, stylePrompt, songTitle, setSongTitle, albumArt, setAlbumArt, setHistory, currentHistoryId, language, onEditCover, onEditLyrics, setMarketingKit, setMarketingModalOpen, burstResults, selectedBurstIndex, onBurstTabChange } = props;
    const [isArtLoading, setArtLoading] = useState(false);
    const [isArtBurstLoading, setArtBurstLoading] = useState(false);
    const [albumArtBurstResults, setAlbumArtBurstResults] = useState<string[]>([]);
    const [isMarketingLoading, setMarketingLoading] = useState(false);
    const [isTitleLoading, setTitleLoading] = useState(false);
    const [isTitleCopied, setTitleCopied] = useState(false);
    const [error, setError] = useState('');
    const { user, deductCredits } = useContext(UserContext);
    const appData = useContext(DataContext);
    const { onAuthOpen, onUpgradeOpen } = useContext(UIActionContext);
    const { triggerAchievementCheck } = useContext(AchievementContext);
    // Access plan restrictions from hook
    const planRestrictions = usePlanRestrictions();

    if (!appData) return <Loader />;
    const { creditCosts, plans } = appData;
    
    const RegenerateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>;
    const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
    const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
    const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;
    const MagicWandIcon = () => <span className="text-lg">🪄</span>;
    const SmallCopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;


    const markCurrentAsCopied = () => {
        if (currentHistoryId) {
            setHistory(prev => prev.map(item =>
                item.id === currentHistoryId ? { ...item, isCopied: true } : item
            ));
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        markCurrentAsCopied();
    };


    const handleDownload = (content: string, filename: string) => {
        const link = document.createElement('a');
        if (content.startsWith('data:')) {
            link.href = content;
        } else {
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            link.href = URL.createObjectURL(blob);
        }
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        if (!content.startsWith('data:')) {
            URL.revokeObjectURL(link.href);
        }
    };

    const handleGenerateTitle = async () => {
        if (!lyrics || !stylePrompt) return;
        const cost = creditCosts.songTitle;
        if (user.credits !== 'unlimited' && user.credits < cost) {
            setError(`Crédits insuffisants (${cost} requis).`);
            return;
        }
        setTitleLoading(true);
        setError('');
        try {
            const title = await geminiService.generateSongTitle(lyrics, stylePrompt, language);
            setSongTitle(title);
            await deductCredits(cost);
            if (currentHistoryId) {
                setHistory(prev => prev.map(item =>
                    item.id === currentHistoryId ? { ...item, outputs: { ...item.outputs, songTitle: title } } : item
                ));
            }
        } catch (e) {
            console.error(e);
            setError("Erreur lors de la génération du titre.");
        } finally {
            setTitleLoading(false);
        }
    };

    const handleCopyTitle = () => {
        if (!songTitle) return;
        navigator.clipboard.writeText(songTitle);
        setTitleCopied(true);
        setTimeout(() => setTitleCopied(false), 2000);
    };


    const handleGenerateArt = async () => {
        if(!lyrics || !stylePrompt) return;

        const albumArtAccess = planRestrictions.getAlbumArtAccess(false);

        if (!albumArtAccess.canUse) {
            setError(albumArtAccess.restrictionMessage);
            if (!user.isAuthenticated) {
                onAuthOpen();
            } else if (!albumArtAccess.hasAccess) {
                onUpgradeOpen();
            }
            return;
        }

        setArtLoading(true);
        setError('');
        setAlbumArtBurstResults([]);
        try {
          const art = await geminiService.generateAlbumArt(lyrics, stylePrompt);
          await deductCredits(albumArtAccess.cost);
          triggerAchievementCheck('GENERATE_ALBUM_ART');
          const newAlbumArt = `data:image/jpeg;base64,${art}`;
          setAlbumArt(newAlbumArt);
          if (currentHistoryId) {
              setHistory(prev => prev.map(item => item.id === currentHistoryId ? { ...item, albumArt: newAlbumArt } : item));
          }
          
          // Incrémenter le compteur d'album arts
          try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user?.id) {
              // Récupérer la valeur actuelle
              const { data: profile } = await supabase
                .from('user_profiles')
                .select('total_album_arts_generated')
                .eq('id', session.user.id)
                .single();
              
              if (profile) {
                await supabase
                  .from('user_profiles')
                  .update({ 
                    total_album_arts_generated: (profile.total_album_arts_generated || 0) + 1
                  })
                  .eq('id', session.user.id);
                
                console.log('📊 Album art stats updated');
                triggerAchievementCheck();
              }
            }
          } catch (error) {
            console.error('Error updating album art stats:', error);
          }
        } catch(e) { console.error(e); setError('Erreur lors de la génération de la pochette.'); }
        finally { setArtLoading(false); }
    }
    
    const handleGenerateArtBurst = async () => {
        if (!lyrics || !stylePrompt) return;

        const burstArtAccess = planRestrictions.getAlbumArtAccess(true);

        if (!burstArtAccess.canUse) {
            setError(burstArtAccess.restrictionMessage);
            if (!user.isAuthenticated) {
                onAuthOpen();
            } else if (!burstArtAccess.hasAccess) {
                onUpgradeOpen();
            }
            return;
        }

        setArtBurstLoading(true);
        setError('');
        setAlbumArt('');
        setAlbumArtBurstResults([]);

        try {
            const arts = await geminiService.generateAlbumArtBurst(lyrics, stylePrompt);
            await deductCredits(burstArtAccess.cost);
            triggerAchievementCheck('EXPLORE_ALBUM_ART_BURST');
            const newAlbumArtUrls = arts.map(art => `data:image/jpeg;base64,${art}`);
            setAlbumArtBurstResults(newAlbumArtUrls);
        } catch (e) {
            console.error(e);
            setError('Erreur lors de la génération en rafale des pochettes.');
        } finally {
            setArtBurstLoading(false);
        }
    };

    const handleSelectBurstArt = (imageUrl: string) => {
        setAlbumArt(imageUrl);
        if (currentHistoryId) {
            setHistory(prev => prev.map(item => item.id === currentHistoryId ? { ...item, albumArt: imageUrl } : item));
        }
        setAlbumArtBurstResults([]);
    };

    const handleGenerateMarketingKit = async () => {
        if (!lyrics || !stylePrompt) return;

        const marketingAccess = planRestrictions.getMarketingKitAccess();

        if (!marketingAccess.canUse) {
            setError(marketingAccess.restrictionMessage);
            if (!user.isAuthenticated) {
                onAuthOpen();
            } else if (!marketingAccess.hasAccess) {
                onUpgradeOpen();
            }
            return;
        }

        setMarketingLoading(true);
        setError('');
        try {
            const kit = await geminiService.generateMarketingKit(lyrics, stylePrompt);
            await deductCredits(marketingAccess.cost);
            triggerAchievementCheck('GENERATE_MARKETING_KIT');
            setMarketingKit(kit);
            setMarketingModalOpen(true);
        } catch (e) {
            console.error(e);
            setError('Erreur lors de la génération du kit marketing.');
        } finally {
            setMarketingLoading(false);
        }
    };
    
    return (
      <div className="space-y-6">
        {burstResults && burstResults.length > 0 && (
            <div className="mb-4">
                <div className="flex space-x-2 rounded-lg bg-black/20 p-1">
                    {burstResults.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => onBurstTabChange(index)}
                            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${selectedBurstIndex === index ? 'bg-primary text-on-primary shadow' : 'text-muted-color hover:bg-white/10'}`}
                        >
                            Variation {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        )}

        {lyrics && stylePrompt && (
            <div>
                <h3 className="font-semibold text-lg mb-2 text-base-color">Titre de la Chanson</h3>
                <div className="flex items-center gap-2">
                    <div className="flex-grow p-3 bg-black/20 rounded-lg text-sm font-mono text-muted-color min-h-[44px] flex items-center">
                        {isTitleLoading ? 'Génération...' : songTitle || 'Cliquez pour générer un titre...'}
                    </div>
                    <button
                        onClick={handleCopyTitle}
                        disabled={!songTitle || isTitleLoading}
                        className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-base-color transition-colors disabled:opacity-50"
                        title="Copier le titre"
                    >
                        {isTitleCopied ? 'Copié!' : <SmallCopyIcon />}
                    </button>
                    <button
                        onClick={handleGenerateTitle}
                        disabled={isTitleLoading}
                        className="p-2 rounded-lg bg-primary/80 text-on-primary hover:bg-primary transition-colors disabled:opacity-50"
                        title={`Générer un titre (${creditCosts.songTitle} crédits)`}
                    >
                        <MagicWandIcon />
                    </button>
                </div>
            </div>
        )}

        {(albumArt || isArtLoading || isArtBurstLoading || albumArtBurstResults.length > 0 || (lyrics && stylePrompt)) && (
            <div>
                <h3 className="font-semibold text-lg mb-2 text-base-color">Pochette & Outils</h3>

                {albumArtBurstResults.length > 0 && !isArtBurstLoading ? (
                    <div className="animate-fade-in">
                        <p className="text-center text-muted-color mb-4">Choisissez votre pochette préférée</p>
                        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {albumArtBurstResults.map((artUrl, index) => (
                                <div key={index} className="relative group aspect-square">
                                    <img src={artUrl} alt={`Album art variation ${index + 1}`} className="w-full h-full rounded-lg object-cover shadow-lg" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <button onClick={() => handleSelectBurstArt(artUrl)} className="py-2 px-4 bg-primary text-on-primary font-bold rounded-lg shadow-lg hover:scale-105 transition-transform">
                                            Choisir
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Case 1: Displaying image or loader in a square box */}
                        {(albumArt || isArtLoading || isArtBurstLoading) && (
                            <div className="relative aspect-square max-w-md mx-auto group">
                                {(isArtLoading || isArtBurstLoading) && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                                        <Loader text="Génération..."/>
                                    </div>
                                )}
                                
                                {albumArt && !(isArtLoading || isArtBurstLoading) && (
                                    <>
                                        <img src={albumArt} alt="AI generated album art" className="w-full h-full rounded-lg object-cover shadow-lg" />
                                        <div className="absolute top-3 right-3 flex space-x-2">
                                            <button 
                                                onClick={() => handleDownload(albumArt, 'album-art.jpg')}
                                                className="p-2 rounded-full bg-black/50 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                                                title="Télécharger la pochette"
                                            >
                                                <DownloadIcon />
                                            </button>
                                            <button 
                                                onClick={handleGenerateArt}
                                                className="p-2 rounded-full bg-black/50 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                                                title="Régénérer la pochette"
                                            >
                                                <RegenerateIcon />
                                            </button>
                                            <button 
                                                onClick={() => onEditCover(albumArt)}
                                                className="p-2 rounded-full bg-black/50 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
                                                title="Modifier la pochette"
                                            >
                                                <EditIcon />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Case 2: Displaying buttons in a compact view (no image yet) */}
                        {!albumArt && !(isArtLoading || isArtBurstLoading) && lyrics && stylePrompt && (
                            <div className="max-w-md mx-auto flex items-center justify-center p-4">
                                <div className="flex flex-col gap-4 w-full max-w-xs">
                                    <button onClick={handleGenerateArt} className="py-3 px-6 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform">{`Générer la Pochette (${creditCosts.albumArt} crédits)`}</button>
                                    
                                    <PlanLockOverlay
                                        isLocked={![SubscriptionPlan.Pro, SubscriptionPlan.Ultimate, SubscriptionPlan.Business, SubscriptionPlan.SecretSociety].includes(user.plan)}
                                        requiredPlanName={plans.find(p => p.id === SubscriptionPlan.Pro)?.name || 'Pro'}
                                        isAuthenticated={user.isAuthenticated}
                                    >
                                        <button onClick={handleGenerateArtBurst} disabled={(user.credits !== 'unlimited' && user.credits < creditCosts.burstAlbumArt)} className="w-full py-3 px-6 bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed">
                                            {(user.credits !== 'unlimited' && user.credits < creditCosts.burstAlbumArt) ? 'Crédits insuffisants' :`Pochettes en Rafale (x4) (${creditCosts.burstAlbumArt} crédits)`}
                                        </button>
                                    </PlanLockOverlay>
                                </div>
                            </div>
                        )}
                    </>
                )}
                 {lyrics && stylePrompt && (
                     <div className="max-w-md mx-auto mt-4">
                         <PlanLockOverlay
                            isLocked={user.plan !== SubscriptionPlan.Business}
                            requiredPlanName={plans.find(p => p.id === SubscriptionPlan.Business)?.name || 'Business'}
                            isAuthenticated={user.isAuthenticated}
                            showIcon={false}
                         >
                             <button 
                                onClick={handleGenerateMarketingKit}
                                disabled={isMarketingLoading || (user.credits !== 'unlimited' && user.credits < creditCosts.marketingKit)}
                                className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary text-on-gradient font-bold rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                             >
                                 {isMarketingLoading ? 'Création du kit...' : `Générer Kit Marketing (${creditCosts.marketingKit} crédits)`}
                             </button>
                         </PlanLockOverlay>
                     </div>
                 )}
                 {error && <p className="text-red-400 mt-2 text-center text-sm">{error}</p>}
            </div>
        )}
        {stylePrompt && (
             <div>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg text-base-color">Style Prompt</h3>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => handleCopy(stylePrompt)} className="p-1.5 rounded-md bg-white/20 hover:bg-white/30" title="Copier"><CopyIcon /></button>
                        <button onClick={() => handleDownload(stylePrompt, 'style-prompt.txt')} className="p-1.5 rounded-md bg-white/20 hover:bg-white/30" title="Télécharger"><DownloadIcon /></button>
                    </div>
                </div>
                <p onCopy={markCurrentAsCopied} className="p-3 bg-black/20 rounded-lg text-sm font-mono whitespace-pre-wrap text-muted-color">{stylePrompt}</p>
            </div>
        )}
         {lyrics && (
             <div>
                 <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-lg text-base-color">Paroles</h3>
                        <button onClick={() => onEditLyrics(lyrics)} className="p-1.5 rounded-md bg-white/20 hover:bg-white/30" title="Modifier les paroles"><EditIcon /></button>
                    </div>
                     <div className="flex items-center space-x-2">
                        <button onClick={() => handleCopy(lyrics)} className="p-1.5 rounded-md bg-white/20 hover:bg-white/30" title="Copier"><CopyIcon /></button>
                        <button onClick={() => handleDownload(lyrics, 'lyrics.txt')} className="p-1.5 rounded-md bg-white/20 hover:bg-white/30" title="Télécharger"><DownloadIcon /></button>
                    </div>
                </div>
                <LyricsDisplay onCopy={markCurrentAsCopied} lyrics={lyrics} baseClassName="p-3 bg-black/20 rounded-lg text-sm text-muted-color max-h-[50vh] overflow-y-auto" />
            </div>
        )}
      </div>
    );
};

// --- MAIN COMPONENT ---
const MainGenerator: React.FC<MainGeneratorProps> = (props) => {
  const { mode, selectedArtist, theme, selectedStyles, selectedAmbiances, keywords, selectedAnimeTheme,
          lyrics, stylePrompt, setLyrics, setStylePrompt, setSongTitle, setAlbumArt, setHistory, 
          setCurrentHistoryId, selectedStructure, setBurstResults, personalProfiles, setPersonalProfiles, selectedProfileId, setSelectedProfileId } = props;
    
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { settings, setSettings } = useContext(SettingsContext);
  const { user, deductCredits } = useContext(UserContext);
  const appData = useContext(DataContext);
  const { onAuthOpen, onUpgradeOpen } = useContext(UIActionContext);
  const { triggerAchievementCheck } = useContext(AchievementContext);
  const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

  // Utiliser notre nouveau hook pour les restrictions
  const planRestrictions = usePlanRestrictions();
  
  const [quickPrompt, setQuickPrompt] = useState('');
  
  const [marketingKit, setMarketingKit] = useState<MarketingKitData | null>(null);
  const [isMarketingModalOpen, setMarketingModalOpen] = useState(false);
  
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<PersonalProfile | null>(null);

  if (!appData) {
    return (
      <GlassCard>
        <div className="p-4"><Loader text="Chargement..." /></div>
      </GlassCard>
    );
  }
  const { artists = [], styles = [], ambiances = [], animeThemes = [], songStructuresFr = [], songStructuresEn = [], creditCosts = {}, plans = [] } = appData || {};

  useEffect(() => {
    props.setActiveSpecialTraitIds([]);
    if (selectedArtist?.name === 'Eivør Pálsdóttir') {
        props.setLanguage('féroïen');
    } else if (selectedArtist?.name === 'Vígundr') {
        props.setLanguage('vieux norrois');
    }
  }, [selectedArtist]);

  const autoStructureValue = useMemo(() => {
      if (mode === GenerationMode.Artist && selectedArtist) return getSuggestedStructureValueForArtist(selectedArtist);
      if (mode === GenerationMode.Descriptive && selectedArtist) return getSuggestedStructureValueForArtist(selectedArtist);
      if (mode === GenerationMode.AnimeOpening) {
        const anime = animeThemes.find(a => a.name === props.selectedAnimeTheme);
        if (anime) return getSuggestedStructureValueForAnime(anime);
      }
      return null;
  }, [mode, selectedArtist, props.selectedAnimeTheme, animeThemes]);

  const toggleStyle = (style: string) => props.setSelectedStyles(p => p.includes(style) ? p.filter(s => s !== style) : [...p, style]);
  const toggleAmbiance = (ambiance: string) => props.setSelectedAmbiances(p => p.includes(ambiance) ? p.filter(a => a !== ambiance) : [...p, ambiance]);
  
  const toggleSpecialTrait = (traitId: string) => {
    if (user.plan === SubscriptionPlan.Free) {
        setError("Passez au plan Creator pour utiliser les caractéristiques spéciales.");
        setSubscriptionModalOpen(true);
        return;
    }
    setError('');
    props.setActiveSpecialTraitIds(prev => {
        const isActivating = !prev.includes(traitId);
        if(isActivating) {
            triggerAchievementCheck('USE_SPECIAL_TRAIT');
        }
        return isActivating ? [...prev, traitId] : prev.filter(id => id !== traitId);
    });
  };

  const getLockState = useMemo(() => {
    // Utiliser notre nouveau système de restrictions
    const extraCosts = {
      specialTraits: props.activeSpecialTraitIds.length,
      styles: props.selectedStyles.length,
      ambiances: props.selectedAmbiances.length
    };

    const generationAccess = planRestrictions.checkGenerationMode(mode, extraCosts);

    return {
      isLocked: !generationAccess.hasAccess,
      cost: generationAccess.cost,
      requiredPlanName: generationAccess.requiredPlanName
    };
  }, [mode, planRestrictions, props.activeSpecialTraitIds, props.selectedStyles, props.selectedAmbiances]);

  const canGenerate = useMemo(() => {
    if (isLoading) return false;

    const hasEnoughCredits = user.credits === 'unlimited' || user.credits >= getLockState.cost;
    if (!hasEnoughCredits) return false;

    switch (mode) {
      case GenerationMode.Descriptive: return !!theme && !!selectedArtist;
      case GenerationMode.Freestyle: return !!theme;
      case GenerationMode.Artist: return !!selectedArtist;
      case GenerationMode.LyricsImport: return !!theme && !!selectedArtist;
      case GenerationMode.Instrumental: return !!theme || selectedStyles.length > 0 || selectedAmbiances.length > 0 || keywords.length > 0;
      case GenerationMode.AnimeOpening: return !!props.selectedAnimeTheme;
      case GenerationMode.Personalized:
        const profile = personalProfiles.find(p => p.id === selectedProfileId);
        return !!profile && (!!profile.styleDescription || !!profile.exampleLyrics);
      default: return false;
    }
  }, [mode, theme, selectedArtist, selectedStyles, selectedAmbiances, keywords, props.selectedAnimeTheme, isLoading, getLockState.cost, user.credits, selectedProfileId, personalProfiles]);
  
  const handleGenerate = async () => {
    if (!canGenerate) return;

    const { cost } = getLockState;
    if (user.credits !== 'unlimited' && user.credits < cost) {
        setError(`Crédits insuffisants. Coût : ${cost}, Vos crédits : ${user.credits}`);
        return;
    }

    setIsLoading(true);
    setError('');
    setLyrics('');
    setStylePrompt('');
    setSongTitle('');
    setAlbumArt('');
    setBurstResults([]);
    setCurrentHistoryId(null);
    
    try {
      let result: { lyrics: string, stylePrompt: string } | null = null;
      let instrumentalPrompt: string | null = null;
      let inputs: HistoryItem['inputs'] = {};
      
      switch (mode) {
        case GenerationMode.Descriptive:
          result = await geminiService.generateFullSong(props.theme, props.language, props.selectedArtist!, props.selectedStyles, selectedStructure, settings, props.varyChoruses, props.chorusDuration, props.includeInstrumentalParts, props.activeSpecialTraitIds);
          inputs = { theme: props.theme, artist: props.selectedArtist, styles: props.selectedStyles, structure: selectedStructure, varyChoruses: props.varyChoruses, chorusDuration: props.chorusDuration, includeInstrumentalParts: props.includeInstrumentalParts, activeSpecialTraitIds: props.selectedArtist?.specialTraits ? props.activeSpecialTraitIds : undefined };
          break;
        case GenerationMode.Freestyle:
          if (props.instrumentalOnly) {
            // Mode Freestyle sans paroles : générer juste ad-libs + style prompt
            result = await geminiService.generateAdlibsOnlySong(props.theme, props.selectedStyles, props.selectedAmbiances, selectedStructure, settings);
            inputs = { theme: props.theme, styles: props.selectedStyles, ambiances: props.selectedAmbiances, structure: selectedStructure, instrumentalOnly: true };
          } else {
            // Mode Freestyle avec paroles complètes
            result = await geminiService.generateFreestyleSong(props.theme, props.language, props.selectedStyles, props.selectedAmbiances, selectedStructure, settings, props.varyChoruses, props.chorusDuration, props.includeInstrumentalParts);
            inputs = { theme: props.theme, styles: props.selectedStyles, ambiances: props.selectedAmbiances, structure: selectedStructure, varyChoruses: props.varyChoruses, chorusDuration: props.chorusDuration, includeInstrumentalParts: props.includeInstrumentalParts };
          }
          break;
        case GenerationMode.Artist:
          result = await geminiService.generateArtistInspirationSong(props.language, props.selectedArtist!, props.usePrimaryStyles, props.selectedStyles, selectedStructure, settings, props.varyChoruses, props.chorusDuration, props.includeInstrumentalParts, props.activeSpecialTraitIds);
          inputs = { artist: props.selectedArtist, structure: selectedStructure, usePrimaryStyles: props.usePrimaryStyles, varyChoruses: props.varyChoruses, styles: !props.usePrimaryStyles ? props.selectedStyles : undefined, chorusDuration: props.chorusDuration, includeInstrumentalParts: props.includeInstrumentalParts, activeSpecialTraitIds: props.selectedArtist?.specialTraits ? props.activeSpecialTraitIds : undefined };
          break;
        case GenerationMode.LyricsImport:
            result = await geminiService.processImportedLyrics(props.theme, props.selectedArtist!, settings, props.includeInstrumentalParts, props.activeSpecialTraitIds, props.translateLyrics, props.language);
            inputs = { 
                lyrics: props.theme, 
                artist: props.selectedArtist,
                includeInstrumentalParts: props.includeInstrumentalParts,
                activeSpecialTraitIds: props.selectedArtist?.specialTraits ? props.activeSpecialTraitIds : undefined,
                translateLyrics: props.translateLyrics,
            };
            break;
        case GenerationMode.Instrumental:
          instrumentalPrompt = await geminiService.generateInstrumentalPrompt(props.theme, props.selectedStyles, props.selectedAmbiances, props.keywords, settings);
          inputs = { description: props.theme, styles: props.selectedStyles, ambiances: props.selectedAmbiances, keywords: props.keywords };
          break;
        case GenerationMode.AnimeOpening:
          const animeData = animeThemes.find(t => t.name === props.selectedAnimeTheme)!;
          result = await geminiService.generateAnimeOpening(animeData, props.language, props.selectedStyles, selectedStructure, settings, props.varyChoruses, props.chorusDuration, props.includeInstrumentalParts);
          inputs = { animeTheme: props.selectedAnimeTheme, styles: props.selectedStyles, structure: selectedStructure, varyChoruses: props.varyChoruses, chorusDuration: props.chorusDuration, includeInstrumentalParts: props.includeInstrumentalParts };
          break;
        case GenerationMode.Personalized:
            const selectedProfile = personalProfiles.find(p => p.id === selectedProfileId);
            if (!selectedProfile) throw new Error("Profil personnel non sélectionné.");
            result = await geminiService.generatePersonalizedSong(selectedProfile.styleDescription, selectedProfile.exampleLyrics, props.language, selectedStructure, settings, props.varyChoruses, props.chorusDuration, props.includeInstrumentalParts);
            inputs = { selectedProfileId, structure: selectedStructure, varyChoruses: props.varyChoruses, chorusDuration: props.chorusDuration, includeInstrumentalParts: props.includeInstrumentalParts };
            break;
      }
      
      // Déduire les crédits
      const creditDeducted = await deductCredits(cost);
      if (!creditDeducted) {
        throw new Error(`Impossible de déduire les crédits. Veuillez réessayer.`);
      }
      
      // Enrich payload for achievement checks
      triggerAchievementCheck('SONG_GENERATED', { 
        mode, 
        language: props.language, 
        artist: props.selectedArtist, 
        styles: props.selectedStyles,
        ambiances: props.selectedAmbiances,
        keywords: props.keywords,
        theme: props.theme,
        structure: selectedStructure,
        varyChoruses: props.varyChoruses,
        includeInstrumentalParts: props.includeInstrumentalParts,
        activeSpecialTraitIds: props.activeSpecialTraitIds,
        personalProfile: props.personalProfiles.find(p => p.id === selectedProfileId),
      });


      if (result || instrumentalPrompt) {
          const newLyrics = result?.lyrics || '';
          const newStylePrompt = result?.stylePrompt || instrumentalPrompt || '';
          setLyrics(newLyrics);
          setStylePrompt(newStylePrompt);
          // Sauvegarder dans l'historique via Supabase
          const historyItem = { 
            mode, 
            language: props.language, 
            inputs, 
            outputs: { lyrics: newLyrics, stylePrompt: newStylePrompt, songTitle: '' },
            creditsUsed: cost
          };
          await props.addToHistory(historyItem);
          
          // L'ID sera généré par la base de données
          // On ne peut plus utiliser setCurrentHistoryId avec un ID local
          // setCurrentHistoryId sera mis à jour automatiquement par le context
          
          // Incrémenter les stats pour les achievements
          try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user?.id) {
              const artists = props.selectedArtist ? [props.selectedArtist.name] : [];
              const styles = props.selectedStyles || [];
              
              await achievementService.incrementGenerationStats(
                session.user.id,
                mode,
                props.language,
                false, // pas encore de album art
                false, // pas de burst
                artists,
                styles
              );
              
              console.log('📊 Stats updated after generation');
              
              // Vérifier les achievements
              console.log('🏆 Triggering achievement check...');
              triggerAchievementCheck();
            }
          } catch (error) {
            console.error('Error updating stats:', error);
          }
      }
    } catch (e) {
      console.error(e);
      setError('Une erreur est survenue lors de la génération. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBurstGenerate = async () => {
    if (!canGenerate) return;

    if (mode === GenerationMode.LyricsImport) {
        setError("La génération en rafale n'est pas disponible pour le mode d'import de paroles.");
        return;
    }

    const cost = creditCosts.burstSong;
    if (user.credits !== 'unlimited' && user.credits < cost) {
        setError(`Crédits insuffisants. Coût : ${cost}, Vos crédits : ${user.credits}`);
        return;
    }

    setIsLoading(true);
    setError('');
    setLyrics('');
    setStylePrompt('');
    setSongTitle('');
    setAlbumArt('');
    setBurstResults([]);
    setCurrentHistoryId(null);
    
    try {
        let params: any = {};
        let inputs: HistoryItem['inputs'] = {};
      
        switch (mode) {
            case GenerationMode.Descriptive:
                params = { theme: props.theme, language: props.language, artist: props.selectedArtist!, styles: props.selectedStyles, structure: selectedStructure, settings, varyChoruses: props.varyChoruses, chorusDuration: props.chorusDuration, includeInstrumentalParts: props.includeInstrumentalParts, activeSpecialTraitIds: props.activeSpecialTraitIds };
                inputs = { theme: props.theme, artist: props.selectedArtist, styles: props.selectedStyles, structure: selectedStructure, varyChoruses: props.varyChoruses, chorusDuration: props.chorusDuration, includeInstrumentalParts: props.includeInstrumentalParts, activeSpecialTraitIds: props.selectedArtist?.specialTraits ? props.activeSpecialTraitIds : undefined };
                break;
            case GenerationMode.Artist:
                params = { language: props.language, artist: props.selectedArtist!, usePrimaryStyles: props.usePrimaryStyles, styles: props.selectedStyles, structure: selectedStructure, settings, varyChoruses: props.varyChoruses, chorusDuration: props.chorusDuration, includeInstrumentalParts: props.includeInstrumentalParts, activeSpecialTraitIds: props.activeSpecialTraitIds };
                inputs = { artist: props.selectedArtist, structure: selectedStructure, usePrimaryStyles: props.usePrimaryStyles, varyChoruses: props.varyChoruses, styles: !props.usePrimaryStyles ? props.selectedStyles : undefined, chorusDuration: props.chorusDuration, includeInstrumentalParts: props.includeInstrumentalParts, activeSpecialTraitIds: props.selectedArtist?.specialTraits ? props.activeSpecialTraitIds : undefined };
                break;
            case GenerationMode.AnimeOpening:
                const animeData = animeThemes.find(t => t.name === props.selectedAnimeTheme)!;
                params = { animeTheme: animeData, language: props.language, styles: props.selectedStyles, structure: selectedStructure, settings, varyChoruses: props.varyChoruses, chorusDuration: props.chorusDuration, includeInstrumentalParts: props.includeInstrumentalParts };
                inputs = { animeTheme: props.selectedAnimeTheme, styles: props.selectedStyles, structure: selectedStructure, varyChoruses: props.varyChoruses, chorusDuration: props.chorusDuration, includeInstrumentalParts: props.includeInstrumentalParts };
                break;
            case GenerationMode.Personalized:
                const selectedProfile = personalProfiles.find(p => p.id === selectedProfileId);
                if (!selectedProfile) throw new Error("Profil personnel non sélectionné.");
                params = { profile: selectedProfile, language: props.language, structure: selectedStructure, settings, varyChoruses: props.varyChoruses, chorusDuration: props.chorusDuration, includeInstrumentalParts: props.includeInstrumentalParts };
                inputs = { selectedProfileId, structure: selectedStructure, varyChoruses: props.varyChoruses, chorusDuration: props.chorusDuration, includeInstrumentalParts: props.includeInstrumentalParts };
                break;
            default:
                throw new Error("Mode non supporté pour la génération en rafale.");
        }
      
        const burstResults = await geminiService.generateSongBurst(mode, params);
      
        await deductCredits(cost);
        triggerAchievementCheck('SONG_BURST_GENERATED');

        props.setBurstResults(burstResults);
        props.setSelectedBurstIndex(0);
        props.setLyrics(burstResults[0].lyrics);
        props.setStylePrompt(burstResults[0].stylePrompt);

        // Sauvegarder dans l'historique via Supabase
        const historyItem = {
            mode,
            language: props.language,
            inputs,
            outputs: burstResults[0],
            burstOutputs: burstResults,
            creditsUsed: cost
        };
        await props.addToHistory(historyItem);

        // Incrémenter les stats pour les achievements
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user?.id) {
            const artists = props.selectedArtist ? [props.selectedArtist.name] : [];
            const styles = props.selectedStyles || [];
            
            await achievementService.incrementGenerationStats(
              session.user.id,
              mode,
              props.language,
              false, // pas d'album art
              true, // BURST = true !
              artists,
              styles
            );
            
            console.log('📊 Stats updated after burst generation');
            
            // Vérifier les achievements
            console.log('🏆 Triggering achievement check after burst...');
            triggerAchievementCheck();
          }
        } catch (error) {
          console.error('Error updating stats:', error);
        }

    } catch (e) {
        console.error(e);
        setError('Une erreur est survenue lors de la génération en rafale. Veuillez réessayer.');
    } finally {
        setIsLoading(false);
    }
  };

  const handleQuickGenerate = async () => {
    if (!quickPrompt) return;

    const lowerQuickPrompt = quickPrompt.toLowerCase().trim();
    if (lowerQuickPrompt === 'make me a sandwich') {
        setError('sudo: make me a sandwich: command not found');
        triggerAchievementCheck('SANDWICH_REQUEST');
        return;
    }
    if (lowerQuickPrompt === 'all your base are belong to us') {
        triggerAchievementCheck('QUICK_PROMPT_ALL_YOUR_BASE');
    }
    if (lowerQuickPrompt.includes('tb-303') && (lowerQuickPrompt.includes('tr-808') || lowerQuickPrompt.includes('tr-909'))) {
        triggerAchievementCheck('QUICK_PROMPT_ACID_HOUSE');
    }

    setIsLoading(true);
    setError('');
    setLyrics('');
    setStylePrompt('');
    setSongTitle('');
    setAlbumArt('');
    setBurstResults([]);
    setCurrentHistoryId(null);
    
    try {
        const cost = creditCosts.descriptive;
        if (user.credits !== 'unlimited' && user.credits < cost) {
            setError(`Crédits insuffisants. Coût : ${cost}, Vos crédits : ${user.credits}`);
            setIsLoading(false);
            return;
        }

        if (!artists || artists.length === 0) {
            throw new Error("Aucun artiste disponible pour la génération rapide.");
        }

        const parsedParams = await geminiService.parseQuickPrompt(quickPrompt, settings, artists, styles, ambiances);

        if (!parsedParams) {
            throw new Error("L'IA n'a pas pu analyser la demande. Veuillez réessayer avec une demande plus claire.");
        }

        const { theme, artistName, styles: parsedStyles } = parsedParams;

        if (!artistName) {
            throw new Error("L'IA n'a pas pu identifier d'artiste dans la demande.");
        }

        let artist = artists.find(a => a && a.name && a.name === artistName);

        if (!artist) {
            // Fallback: utiliser le premier artiste disponible
            console.warn(`Artiste "${artistName}" non trouvé, utilisation du premier artiste disponible`);
            artist = artists[0];
            if (!artist) {
                throw new Error("Aucun artiste disponible pour la génération.");
            }
        }

        if (!artist.name) {
            throw new Error(`L'artiste trouvé n'a pas de nom valide.`);
        }

        const songStructures = props.language === 'français' ? songStructuresFr : songStructuresEn;

        if (!songStructures || songStructures.length === 0) {
            throw new Error("Aucune structure de chanson disponible.");
        }

        const structureValue = getSuggestedStructureValueForArtist(artist);
        const structure = songStructures.find(s => s.value === structureValue) || songStructures[0];

        if (!structure) {
            throw new Error("Impossible de déterminer une structure de chanson valide.");
        }

        const result = await geminiService.generateFullSong(
            theme, props.language, artist, parsedStyles, structure, settings,
            props.varyChoruses, props.chorusDuration, props.includeInstrumentalParts, []
        );
        
        await deductCredits(cost);
        triggerAchievementCheck('SONG_GENERATED', { 
            mode: GenerationMode.Descriptive, 
            language: props.language, 
            artist: artist, 
            styles: parsedStyles, 
            theme: theme,
            structure: structure,
            varyChoruses: props.varyChoruses, 
            includeInstrumentalParts: props.includeInstrumentalParts,
            activeSpecialTraitIds: [],
        });
        triggerAchievementCheck('QUICK_PROMPT_USED');

        if (result) {
            setLyrics(result.lyrics);
            setStylePrompt(result.stylePrompt);
            
            const inputs: HistoryItem['inputs'] = { 
                theme, artist, styles: parsedStyles, structure, 
                varyChoruses: props.varyChoruses, 
                chorusDuration: props.chorusDuration, 
                includeInstrumentalParts: props.includeInstrumentalParts 
            };
            
            // Sauvegarder dans l'historique via Supabase
            const historyItem = {
                mode: GenerationMode.Descriptive, 
                language: props.language, 
                inputs, 
                outputs: { lyrics: result.lyrics, stylePrompt: result.stylePrompt, songTitle: '' },
                creditsUsed: cost
            };
            await props.addToHistory(historyItem);
            
            // Incrémenter les stats pour les achievements
            try {
              const { data: { session } } = await supabase.auth.getSession();
              if (session?.user?.id) {
                const artists = artist ? [artist.name] : [];
                const styles = parsedStyles || [];
                
                await achievementService.incrementGenerationStats(
                  session.user.id,
                  GenerationMode.Descriptive,
                  props.language,
                  false, // pas d'album art
                  false, // pas de burst
                  artists,
                  styles
                );
                
                console.log('📊 Stats updated after quick generation');
                
                // Vérifier les achievements
                console.log('🏆 Triggering achievement check after quick gen...');
                triggerAchievementCheck();
              }
            } catch (error) {
              console.error('Error updating stats:', error);
            }
        }

    } catch (e) {
        console.error(e);
        setError("Une erreur est survenue lors de la génération rapide. L'IA n'a peut-être pas compris la demande. Veuillez réessayer.");
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleEditProfile = (profile: PersonalProfile) => {
    setEditingProfile(profile);
    setProfileModalOpen(true);
  };
  
  const handleSaveProfile = async (updatedProfile: PersonalProfile) => {
    const oldProfile = personalProfiles.find(p => p.id === updatedProfile.id);
    // Check if the profile was empty before and now has content. This is considered a "creation" or first training.
    const isFirstTimeSaveWithContent = oldProfile && !oldProfile.styleDescription && !oldProfile.exampleLyrics && (!!updatedProfile.styleDescription || !!updatedProfile.exampleLyrics);

    if (isFirstTimeSaveWithContent) {
        const cost = creditCosts.profileCreation;
        if (user.credits !== 'unlimited' && user.credits < cost) {
            throw new Error(`Crédits insuffisants. L'entraînement d'un profil coûte ${cost} crédits.`);
        }
        await deductCredits(cost);
    }

    setPersonalProfiles(prev => prev.map(p => p.id === updatedProfile.id ? updatedProfile : p));
  };


  const { isLocked: isModeLocked, requiredPlanName, cost: generationCost } = getLockState;
  
  const handleBurstTabChange = (index: number) => {
      props.setSelectedBurstIndex(index);
      if (props.burstResults && props.burstResults[index]) {
          props.setLyrics(props.burstResults[index].lyrics);
          props.setStylePrompt(props.burstResults[index].stylePrompt);
          props.setAlbumArt(''); // Clear art when switching variations
      }
  };

  const renderConfigContent = () => {
    const showSpecialTraits = (mode === GenerationMode.Descriptive || mode === GenerationMode.Artist || mode === GenerationMode.LyricsImport) && props.selectedArtist?.specialTraits && props.selectedArtist.specialTraits.length > 0;
    
    const showExtraCosts = user.credits !== 'unlimited';
    const extraStyleCost = showExtraCosts ? Math.max(0, props.selectedStyles.length - 2) * creditCosts.extraStyle : 0;
    const extraAmbianceCost = showExtraCosts ? Math.max(0, props.selectedAmbiances.length - 1) * creditCosts.extraAmbiance : 0;

    const SpecialTraitsSection = () => {
        if (!showSpecialTraits) return null;

        const isLockedByPlan = user.plan === SubscriptionPlan.Free;
        const planNeeded = plans.find(p => p.id === SubscriptionPlan.Creator)?.name || 'Creator';
        const areSpecialTraitsFree = user.credits === 'unlimited';

        return (
            <div className="md:col-span-2">
                 <PlanLockOverlay
                    isLocked={isLockedByPlan}
                    requiredPlanName={planNeeded}
                    isAuthenticated={user.isAuthenticated}
                >
                    <div className="p-4 rounded-lg bg-black/10 border border-white/10 space-y-3">
                        <div className="flex justify-between items-center">
                            <h4 className="text-sm font-semibold text-muted-color">Caractéristiques Spéciales</h4>
                            {props.activeSpecialTraitIds.length > 0 && !areSpecialTraitsFree &&
                                <span className="text-xs text-primary-light font-medium">+ {creditCosts.specialTrait * props.activeSpecialTraitIds.length} crédits</span>
                            }
                        </div>
                        {props.selectedArtist!.specialTraits!.map(trait => {
                            const isChecked = props.activeSpecialTraitIds.includes(trait.id);
                            return (
                                <div key={trait.id}>
                                    <ModernCheckbox
                                        id={`trait-${trait.id}`}
                                        label={trait.name}
                                        description={trait.description}
                                        checked={isChecked}
                                        onChange={() => toggleSpecialTrait(trait.id)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </PlanLockOverlay>
            </div>
        );
    };

    const songStructures = props.language === 'français' ? songStructuresFr : songStructuresEn;

    switch(mode) {
        case GenerationMode.Descriptive:
            return (
                <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormGroup label="Thème Principal" className="md:col-span-2">
                       <textarea value={props.theme} onChange={e => props.setTheme(e.target.value)} placeholder="Décrivez le thème, l'ambiance, l'histoire..." className="w-full h-24 p-2 rounded-lg bg-white/50 dark:bg-black/30 border border-slate-600 placeholder-color text-base-color" />
                    </FormGroup>
                    <FormGroup label="Influence d'Artiste"><ArtistSearch selectedArtist={props.selectedArtist} setSelectedArtist={props.setSelectedArtist} songStructures={songStructures} /></FormGroup>
                    <FormGroup label="Langue"><LanguageSelector user={user} language={props.language} setLanguage={props.setLanguage} /></FormGroup>
                    <SpecialTraitsSection />
                    <FormGroup 
                        label={<div className="flex justify-between items-center"><span>Styles Additionnels {showExtraCosts ? '(2 gratuits)' : ''}</span> {extraStyleCost > 0 && <span className="text-xs text-primary-light font-medium">+{extraStyleCost} crédits</span>}</div>} 
                        className="md:col-span-2"
                    >
                        <StyleSelector collection={styles} selected={props.selectedStyles} toggle={toggleStyle} />
                    </FormGroup>
                    <div className="md:col-span-2">
                        <FormGroup label="Structure & Options"><StructureControls songStructures={songStructures} selectedStructure={props.selectedStructure} setSelectedStructure={props.setSelectedStructure} varyChoruses={props.varyChoruses} setVaryChoruses={props.setVaryChoruses} chorusDuration={props.chorusDuration} setChorusDuration={props.setChorusDuration} includeInstrumentalParts={props.includeInstrumentalParts} setIncludeInstrumentalParts={props.setIncludeInstrumentalParts} autoStructureValue={autoStructureValue} amplifyPrompt={settings.amplifyPrompt} setAmplifyPrompt={(v) => setSettings({ ...settings, amplifyPrompt: v })} /></FormGroup>
                    </div>
                </fieldset>
            );
        case GenerationMode.Freestyle:
            return (
                <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormGroup label="Thème / Description" className="md:col-span-2">
                       <textarea 
                           value={props.theme} 
                           onChange={e => props.setTheme(e.target.value)} 
                           placeholder={props.instrumentalOnly 
                               ? "Décrivez votre track et SPÉCIFIEZ les ad-libs/effets exacts :&#10;&#10;Ex: 'Trap avec ad-libs (yeah, skrrt, ay), 808 bass, guitar solo, bass drop'&#10;&#10;💡 Ad-libs + descriptions instrumentales (guitar solo, bass drop, etc.) seront utilisés !" 
                               : "Décrivez votre chanson : thème, ambiance, style...&#10;&#10;💡 Vous pouvez mentionner des ad-libs (yeah, skrrt, ay), des vocal chops, ou tout élément vocal souhaité !"
                           }
                           className="w-full h-32 p-3 rounded-lg bg-white/50 dark:bg-black/30 border border-slate-600 placeholder-color text-base-color" 
                       />
                    </FormGroup>
                    
                    <div className="md:col-span-2">
                        <ModernCheckbox 
                            id="instrumental-only" 
                            label="🎤 Générer uniquement des ad-libs (sans paroles narratives)" 
                            description="L'IA générera des 'lyrics' contenant UNIQUEMENT les ad-libs et effets vocaux que vous spécifiez dans la description (ex: yeah, skrrt, ay). Parfait pour fragmovies, beats trap avec juste des ad-libs." 
                            checked={props.instrumentalOnly || false} 
                            onChange={e => props.setInstrumentalOnly?.(e.target.checked)} 
                        />
                    </div>
                    
                    {!props.instrumentalOnly && (
                        <FormGroup label="Langue"><LanguageSelector user={user} language={props.language} setLanguage={props.setLanguage} /></FormGroup>
                    )}
                    
                    <FormGroup label={<div className="flex justify-between items-center"><span>Styles Musicaux {showExtraCosts ? '(2 gratuits)' : ''}</span> {extraStyleCost > 0 && <span className="text-xs text-primary-light font-medium">+{extraStyleCost} crédits</span>}</div>} className={props.instrumentalOnly ? "md:col-span-2" : ""}>
                        <StyleSelector collection={styles} selected={props.selectedStyles} toggle={toggleStyle} />
                    </FormGroup>
                    <FormGroup label={<div className="flex justify-between items-center"><span>Ambiances & Thèmes {showExtraCosts ? '(1 gratuit)' : ''}</span> {extraAmbianceCost > 0 && <span className="text-xs text-primary-light font-medium">+{extraAmbianceCost} crédits</span>}</div>} className="md:col-span-2">
                        <StyleSelector collection={ambiances} selected={props.selectedAmbiances} toggle={toggleAmbiance} />
                    </FormGroup>
                    
                    <div className="md:col-span-2">
                        <FormGroup label="Structure & Options"><StructureControls songStructures={songStructures} selectedStructure={props.selectedStructure} setSelectedStructure={props.setSelectedStructure} varyChoruses={props.varyChoruses} setVaryChoruses={props.setVaryChoruses} chorusDuration={props.chorusDuration} setChorusDuration={props.setChorusDuration} includeInstrumentalParts={props.includeInstrumentalParts} setIncludeInstrumentalParts={props.setIncludeInstrumentalParts} autoStructureValue={null} amplifyPrompt={settings.amplifyPrompt} setAmplifyPrompt={(v) => setSettings({ ...settings, amplifyPrompt: v })} /></FormGroup>
                    </div>
                    
                    <div className="md:col-span-2 p-4 rounded-lg bg-primary/10 border border-primary/30">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">🎤</span>
                            <div className="flex-1 text-sm">
                                <p className="font-semibold text-primary mb-2">Mode Freestyle - Sans référence d'artiste</p>
                                <p className="text-base-color/80 mb-2">
                                    {props.instrumentalOnly ? (
                                        <>
                                            Générez des tracks avec <strong>UNIQUEMENT des ad-libs et effets vocaux</strong> (pas de paroles narratives).
                                            L'IA créera des "lyrics" contenant seulement des ad-libs rythmiques (yeah, skrrt, ay, whip, etc.).
                                        </>
                                    ) : (
                                        <>
                                            Générez des chansons complètes avec paroles, sans vous baser sur un artiste spécifique.
                                            L'IA créera un style original basé sur votre description et vos choix de styles/ambiances.
                                        </>
                                    )}
                                </p>
                                <ul className="space-y-1 text-base-color/70 text-xs">
                                    {props.instrumentalOnly ? (
                                        <>
                                            <li>• <strong>Ad-libs :</strong> Mentionnez "ad-libs (yeah, skrrt, ay)" → Utilisera SEULEMENT ceux-là</li>
                                            <li>• <strong>Éléments instrumentaux :</strong> Mentionnez "guitar solo", "bass drop", "808 hit", etc.</li>
                                            <li>• <strong>Exemple :</strong> "Trap avec ad-libs (yeah, skrrt), guitar solo, bass drop"</li>
                                            <li>• <strong>Résultat :</strong> Lyrics avec (yeah), (skrrt), (guitar solo), (bass drop)</li>
                                        </>
                                    ) : (
                                        <>
                                            <li>• <strong>Paroles complètes :</strong> L'IA génère des paroles basées sur votre thème</li>
                                            <li>• <strong>Ad-libs intégrés :</strong> Mentionnez-les dans la description</li>
                                            <li>• <strong>Style libre :</strong> Pas de contrainte d'artiste, créativité maximale</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </fieldset>
            );
        case GenerationMode.Artist:
             return (
                <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormGroup label="Artiste" className="md:col-span-2"><ArtistSearch selectedArtist={props.selectedArtist} setSelectedArtist={props.setSelectedArtist} songStructures={songStructures} /></FormGroup>
                <SpecialTraitsSection />
                <FormGroup label="Langue"><LanguageSelector user={user} language={props.language} setLanguage={props.setLanguage} /></FormGroup>
                <fieldset>
                    <FormGroup label={
                        <div className="flex justify-between items-center">
                            <span>Fusion de Style (Optionnel)</span>
                            {!props.usePrimaryStyles && extraStyleCost > 0 && <span className="text-xs text-primary-light font-medium">+{extraStyleCost} crédits</span>}
                        </div>
                    }>
                        <div className="p-3 rounded-lg bg-black/10 border border-white/10">
                            <ModernCheckbox id="use-primary" label="Utiliser les styles principaux" checked={props.usePrimaryStyles} onChange={e => props.setUsePrimaryStyles(e.target.checked)} />
                        </div>
                        {!props.usePrimaryStyles && <div className="mt-4 animate-fade-in"><StyleSelector collection={styles} selected={props.selectedStyles} toggle={toggleStyle} /></div>}
                    </FormGroup>
                </fieldset>
                    <div className="md:col-span-2">
                        <FormGroup label="Structure & Options"><StructureControls songStructures={songStructures} selectedStructure={props.selectedStructure} setSelectedStructure={props.setSelectedStructure} varyChoruses={props.varyChoruses} setVaryChoruses={props.setVaryChoruses} chorusDuration={props.chorusDuration} setChorusDuration={props.setChorusDuration} includeInstrumentalParts={props.includeInstrumentalParts} setIncludeInstrumentalParts={props.setIncludeInstrumentalParts} autoStructureValue={autoStructureValue} amplifyPrompt={settings.amplifyPrompt} setAmplifyPrompt={(v) => setSettings({ ...settings, amplifyPrompt: v })} /></FormGroup>
                    </div>
                </fieldset>
            );
        case GenerationMode.LyricsImport:
            const isInstrumentalLocked = user.plan === SubscriptionPlan.Free || user.plan === SubscriptionPlan.Creator;
            const planNeededForInstrumental = plans.find(p => p.id === SubscriptionPlan.Pro)?.name || 'Pro';
            return (
                <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormGroup label="Vos Paroles" className="md:col-span-2">
                        <textarea value={props.theme} onChange={e => props.setTheme(e.target.value)} placeholder="Collez vos paroles complètes ici..." className="w-full h-48 p-2 rounded-lg bg-white/50 dark:bg-black/30 border border-slate-600 placeholder-color text-base-color" />
                    </FormGroup>
                    <FormGroup label="Influence d'Artiste"><ArtistSearch selectedArtist={props.selectedArtist} setSelectedArtist={props.setSelectedArtist} songStructures={songStructures} /></FormGroup>
                    <FormGroup label="Langue Cible (pour traduction)"><LanguageSelector user={user} language={props.language} setLanguage={props.setLanguage} /></FormGroup>
                    <SpecialTraitsSection />
                    <div className="md:col-span-2 space-y-4">
                        <PlanLockOverlay
                            isLocked={isInstrumentalLocked}
                            requiredPlanName={planNeededForInstrumental}
                            isAuthenticated={user.isAuthenticated}
                            displayMode="badge"
                        >
                            <ModernCheckbox 
                                id="include-instrumental" 
                                label="Suggérer des parties instrumentales" 
                                description="L'IA analysera vos paroles et ajoutera des suggestions d'interludes instrumentaux." 
                                checked={props.includeInstrumentalParts} 
                                onChange={e => props.setIncludeInstrumentalParts(e.target.checked)} 
                            />
                        </PlanLockOverlay>
                        <ModernCheckbox
                            id="translate-lyrics"
                            label="Traduire les paroles dans la langue sélectionnée"
                            description="L'IA traduira poétiquement vos paroles en respectant les rimes et le sens. Le coût pour cette option est le même qu'une génération 'Descriptif'."
                            checked={props.translateLyrics}
                            onChange={e => props.setTranslateLyrics(e.target.checked)}
                        />
                    </div>
                </fieldset>
            );
        case GenerationMode.Instrumental:
             return (
                <fieldset className="space-y-4">
                    <FormGroup label="Description / Ambiance souhaitée">
                        <textarea
                            value={props.theme}
                            onChange={e => props.setTheme(e.target.value)}
                            placeholder="Ex: Une piste épique pour un trailer de film, avec des percussions puissantes et des cordes cinématiques...&#10;&#10;💡 Astuce : Pour ajouter des ad-libs/voix (skrrt, yeah, ay, whip, etc.), mentionnez-les !&#10;Exemple : 'Trap avec ad-libs énergiques (yeah, skrrt, ay), vocal chops, et effets vocaux'"
                            className="w-full p-3 rounded-lg bg-white/50 dark:bg-black/30 border border-slate-600 placeholder-color text-base-color min-h-[120px] resize-y"
                        />
                    </FormGroup>
                    
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">🎤</span>
                            <div className="flex-1 text-sm">
                                <p className="font-semibold text-primary mb-2">Ajouter des voix dans l'instrumental :</p>
                                <ul className="space-y-1 text-base-color/80">
                                    <li>• <strong>Ad-libs trap :</strong> yeah, skrrt, ay, whip, brr, uh</li>
                                    <li>• <strong>Vocal chops :</strong> samples vocaux découpés et traités</li>
                                    <li>• <strong>Voix atmosphériques :</strong> chœurs, hums, vocoder</li>
                                    <li>• <strong>Effets vocaux :</strong> autotune, pitch shift, harmonies</li>
                                </ul>
                                <p className="mt-2 text-xs text-base-color/60 italic">
                                    💡 Mentionnez ces éléments dans la description pour que Suno les intègre !
                                </p>
                                <div className="mt-3 pt-3 border-t border-primary/20">
                                    <p className="font-semibold text-primary/90 mb-1.5 text-xs">Exemples de descriptions :</p>
                                    <div className="space-y-1 text-xs text-base-color/70">
                                        <p><strong>Trap avec ad-libs :</strong> "Trap énergique avec ad-libs (yeah, skrrt, ay), 808 bass, hi-hats rapides"</p>
                                        <p><strong>Future Bass avec voix :</strong> "Future bass avec vocal chops pitchés, effets vocaux autotune, drops mélodiques"</p>
                                        <p><strong>Dubstep atmosphérique :</strong> "Dubstep avec chœurs éthérés en arrière-plan, voix vocoder sur les drops"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FormGroup label={<div className="flex justify-between items-center"><span>Styles Musicaux {showExtraCosts ? '(2 gratuits)' : ''}</span> {extraStyleCost > 0 && <span className="text-xs text-primary-light font-medium">+{extraStyleCost} crédits</span>}</div>}>
                        <StyleSelector collection={styles} selected={props.selectedStyles} toggle={toggleStyle} />
                    </FormGroup>
                    <FormGroup label={<div className="flex justify-between items-center"><span>Ambiances & Thèmes {showExtraCosts ? '(1 gratuit)' : ''}</span> {extraAmbianceCost > 0 && <span className="text-xs text-primary-light font-medium">+{extraAmbianceCost} crédits</span>}</div>}>
                        <StyleSelector collection={ambiances} selected={props.selectedAmbiances} toggle={toggleAmbiance} />
                    </FormGroup>
                    <FormGroup label="Mots-clés additionnels">
                    <input type="text" value={props.keywords} onChange={e => props.setKeywords(e.target.value)} placeholder="Épique, cinématique, relaxant..." className="w-full p-2 rounded-lg bg-white/50 dark:bg-black/30 border border-slate-600 placeholder-color text-base-color" />
                    </FormGroup>
                </fieldset>
             );
        case GenerationMode.AnimeOpening:
             return (
                <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormGroup label="Anime"><AnimeThemeSelector selectedTheme={props.selectedAnimeTheme} setSelectedTheme={props.setSelectedAnimeTheme} /></FormGroup>
                    <FormGroup label="Langue"><LanguageSelector user={user} language={props.language} setLanguage={props.setLanguage} /></FormGroup>
                    <FormGroup label={<div className="flex justify-between items-center"><span>Styles à Fusionner {showExtraCosts ? '(2 gratuits)' : ''}</span> {extraStyleCost > 0 && <span className="text-xs text-primary-light font-medium">+{extraStyleCost} crédits</span>}</div>} className="md:col-span-2">
                        <StyleSelector collection={styles} selected={props.selectedStyles} toggle={toggleStyle} />
                    </FormGroup>
                    <div className="md:col-span-2">
                        <FormGroup label="Structure & Options"><StructureControls songStructures={songStructures} selectedStructure={props.selectedStructure} setSelectedStructure={props.setSelectedStructure} varyChoruses={props.varyChoruses} setVaryChoruses={props.setVaryChoruses} chorusDuration={props.chorusDuration} setChorusDuration={props.setChorusDuration} includeInstrumentalParts={props.includeInstrumentalParts} setIncludeInstrumentalParts={props.setIncludeInstrumentalParts} autoStructureValue={autoStructureValue} amplifyPrompt={settings.amplifyPrompt} setAmplifyPrompt={(v) => setSettings({ ...settings, amplifyPrompt: v })} /></FormGroup>
                    </div>
                </fieldset>
             );
        case GenerationMode.Personalized:
            return (
                <fieldset className="space-y-4">
                    <FormGroup label="Profils Personnels (IA-Training)" className="md:col-span-2">
                    <p className="text-xs text-muted-color mb-3">
                        Entraînez l'IA à imiter votre style. Sélectionnez un profil, cliquez sur "Éditer" pour fournir vos propres textes et descriptions de style. L'entraînement initial d'un profil coûte {creditCosts.profileCreation} crédits. Une fois entraîné, les générations standards coûtent {creditCosts.personalized} crédits.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {personalProfiles.map(profile => {
                        const isSelected = selectedProfileId === profile.id;
                        const isEmpty = !profile.name && !profile.styleDescription && !profile.exampleLyrics;
                        return (
                            <div
                            key={profile.id}
                            onClick={() => setSelectedProfileId(profile.id)}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${isSelected ? 'border-primary bg-primary/20' : 'border-slate-600 hover:border-primary/50 bg-black/30'}`}
                            >
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold text-base-color truncate">{profile.name || `Profil ${profile.id}`}</h4>
                                <button
                                onClick={(e) => { e.stopPropagation(); handleEditProfile(profile); }}
                                className="text-xs px-2 py-1 rounded bg-white/20 hover:bg-white/30"
                                >
                                Éditer
                                </button>
                            </div>
                            <p className="text-xs text-muted-color truncate">
                                {isEmpty ? <span className="text-primary-light">Profil vide (+{creditCosts.profileCreation} crédits à l'entraînement)</span> : (profile.styleDescription || 'Aucune description')}
                            </p>
                            </div>
                        );
                        })}
                    </div>
                    </FormGroup>
                    <div className="md:col-span-2">
                    <FormGroup label="Structure & Options">
                        <StructureControls
                            songStructures={songStructures}
                            selectedStructure={props.selectedStructure}
                            setSelectedStructure={props.setSelectedStructure}
                            varyChoruses={props.varyChoruses}
                            setVaryChoruses={props.setVaryChoruses}
                            includeInstrumentalParts={props.includeInstrumentalParts}
                            setIncludeInstrumentalParts={props.setIncludeInstrumentalParts}
                            autoStructureValue={autoStructureValue}
                            amplifyPrompt={settings.amplifyPrompt}
                            setAmplifyPrompt={(v) => setSettings({ ...settings, amplifyPrompt: v })}
                        />
                    </FormGroup>
                    </div>
                </fieldset>
            );
    }
  }

  const getButtonComponent = () => {
    const { isLocked, cost } = getLockState;
    const hasEnoughCredits = user.credits === 'unlimited' || user.credits >= cost;

    if (isLocked) {
        // The PlanLockOverlay will show the upgrade message and button.
        return null;
    }

    const buttonText = isLoading
        ? 'Génération...'
        : user.credits === 'unlimited'
            ? 'Générer'
            : `Générer (${cost} crédits)`;
            
    const mainButton = !hasEnoughCredits ? (
        <button onClick={onUpgradeOpen} className="w-full h-full py-3 px-8 bg-yellow-500 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>
            Crédits insuffisants
        </button>
    ) : (
        <button onClick={handleGenerate} disabled={isLoading || !canGenerate} className="w-full h-full py-3 px-8 bg-gradient-to-r from-primary to-secondary text-on-gradient font-bold rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed">
            {buttonText}
        </button>
    );

    const burstCost = creditCosts.burstSong;
    const isBurstPlanLocked = ![SubscriptionPlan.Ultimate, SubscriptionPlan.Business, SubscriptionPlan.SecretSociety].includes(user.plan);
    const burstPlanNeeded = plans.find(p => p.id === SubscriptionPlan.Ultimate)?.name || 'Ultimate';
    const burstHasEnoughCredits = user.credits === 'unlimited' || user.credits >= burstCost;

    const burstButton = (
        <PlanLockOverlay
            isLocked={isBurstPlanLocked}
            requiredPlanName={burstPlanNeeded}
            isAuthenticated={user.isAuthenticated}
            className="h-full"
        >
            <button
                onClick={handleBurstGenerate}
                disabled={isLoading || !canGenerate || !burstHasEnoughCredits}
                className="w-full h-full py-3 px-8 bg-gradient-to-r from-primary to-secondary text-on-gradient font-bold rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Génération...' : !burstHasEnoughCredits ? 'Crédits insuffisants' : `Génération en Rafale (x3) (${burstCost} crédits)`}
            </button>
        </PlanLockOverlay>
    );

    return (
        <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">{mainButton}</div>
                {(mode === GenerationMode.Descriptive || mode === GenerationMode.Artist || mode === GenerationMode.AnimeOpening) && (
                    <div className="flex-1">{burstButton}</div>
                )}
            </div>
        </div>
    );
};

  const quickHasEnoughCredits = user.credits === 'unlimited' || user.credits >= creditCosts.descriptive;
  
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <GlassCard>
        <div className="flex flex-col md:flex-row items-stretch gap-4">
            <div className="flex-grow w-full">
                <label htmlFor="quick-prompt" className="sr-only">Décrivez la chanson de vos rêves...</label>
                <textarea
                    id="quick-prompt"
                    value={quickPrompt}
                    onChange={e => setQuickPrompt(e.target.value)}
                    placeholder="Décrivez la chanson de vos rêves..."
                    className="w-full p-3 h-24 md:h-full rounded-lg bg-white/50 dark:bg-black/30 border border-slate-600 placeholder-color text-base-color resize-none focus:ring-primary focus:border-primary"
                    disabled={isLoading}
                />
            </div>
            {!user.isAuthenticated ? (
                <button
                    onClick={onAuthOpen}
                    className="w-full md:w-auto py-3 px-8 bg-gradient-to-r from-primary to-secondary text-on-gradient font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"
                >
                    Se connecter pour générer
                </button>
            ) : (
                <button
                    onClick={handleQuickGenerate}
                    disabled={isLoading || !quickPrompt || !quickHasEnoughCredits}
                    className="w-full md:w-auto py-3 px-8 bg-gradient-to-r from-primary to-secondary text-on-gradient font-bold rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Génération...' : !quickHasEnoughCredits ? 'Crédits insuffisants' : `Inspiration Instantanée (${creditCosts.descriptive} crédits)`}
                </button>
            )}
        </div>
      </GlassCard>
      
      <ModeSelector selectedMode={props.mode} onSelectMode={props.setMode} />
        
      <GlassCard className="relative z-20 overflow-visible">
        <div key={mode} className="animate-fade-in relative z-10">
            <PlanLockOverlay
                isLocked={isModeLocked}
                requiredPlanName={requiredPlanName}
                isAuthenticated={user.isAuthenticated}
                size="large"
            >
                {renderConfigContent()}
            </PlanLockOverlay>
        </div>
        {getButtonComponent()}
      </GlassCard>

      {(isLoading || lyrics || stylePrompt) && (
          <GlassCard className="animate-fade-in relative z-10">
            {isLoading && !lyrics && !stylePrompt ? 
                <Loader text="Génération en cours..." /> :
                <ResultsDisplay
                    {...props}
                    onBurstTabChange={handleBurstTabChange}
                    setMarketingKit={setMarketingKit} 
                    setMarketingModalOpen={setMarketingModalOpen} 
                />
            }
          </GlassCard>
      )}
       {error && <p className="text-red-300 bg-red-900/50 p-3 rounded-lg text-center">{error}</p>}
       <SubscriptionModal isOpen={isSubscriptionModalOpen} onClose={() => setSubscriptionModalOpen(false)} />
       <MarketingKitModal 
            isOpen={isMarketingModalOpen}
            onClose={() => setMarketingModalOpen(false)}
            kit={marketingKit}
       />
        <PersonalProfileModal
            isOpen={isProfileModalOpen}
            onClose={() => setProfileModalOpen(false)}
            profile={editingProfile}
            onSave={handleSaveProfile}
            creditCost={creditCosts.profileCreation}
        />
    </div>
  );
};

export default MainGenerator;
