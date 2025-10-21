import React, { useContext, useState, useRef, forwardRef } from 'react';
import { UserContext } from '../contexts/SupabaseUserContext';
import { DataContext } from '../contexts/DataContext';
import GlassCard from './common/GlassCard';
import { GenerationMode, type HistoryItem, type Artist, type SongStructure, SubscriptionPlan } from '../types';
import LyricsDisplay from './common/LyricsDisplay';
import { UIActionContext, AchievementContext, SettingsContext } from '../contexts/AppContexts';
import CustomSelect, { CustomSelectOption } from './common/CustomSelect';
import * as geminiService from '../services/geminiService';
import { calculateGenerationCost } from '@constants/constants';
import * as communityService from '../services/communityService';


// --- ICONS ---
const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;

interface IconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const DefaultProfileIcon: React.FC<IconProps> = ({ width = 40, height = 40, className = '' }) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        // Le viewBox est corrigé pour encadrer parfaitement le dessin original
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="text-muted-color"
        >
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2ZM9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7Z" />
    <path fillRule="evenodd" clipRule="evenodd" d="M12 14C7.58172 14 4 17.5817 4 22H6C6 18.6863 8.68629 16 12 16C15.3137 16 18 18.6863 18 22H20C20 17.5817 16.4183 14 12 14Z" />
  </svg>
);
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
);
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const LoadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 14V3"/></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const HistoryEditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>;


interface HistoryTabProps {
    history: HistoryItem[];
    setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>;
    setActiveView: React.Dispatch<React.SetStateAction<string>>;
    setMode: React.Dispatch<React.SetStateAction<GenerationMode>>;
    setLanguage: React.Dispatch<React.SetStateAction<'français' | 'english' | 'japonais' | 'féroïen' | 'vieux norrois' | 'russe' | 'coréen'>>;
    setSelectedArtist: React.Dispatch<React.SetStateAction<Artist | null>>;
    setSelectedAnimeTheme: React.Dispatch<React.SetStateAction<string>>;
    setSelectedStructure: React.Dispatch<React.SetStateAction<SongStructure>>;
    setSelectedStyles: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedAmbiances: React.Dispatch<React.SetStateAction<string[]>>;
    setThemeText: React.Dispatch<React.SetStateAction<string>>;
    setUsePrimaryStyles: React.Dispatch<React.SetStateAction<boolean>>;
    setKeywords: React.Dispatch<React.SetStateAction<string>>;
    setLyrics: React.Dispatch<React.SetStateAction<string>>;
    setStylePrompt: React.Dispatch<React.SetStateAction<string>>;
    setSongTitle: React.Dispatch<React.SetStateAction<string>>;
    setAlbumArt: React.Dispatch<React.SetStateAction<string>>;
    setVaryChoruses: React.Dispatch<React.SetStateAction<boolean>>;
    setChorusDuration: React.Dispatch<React.SetStateAction<'short' | 'medium' | 'long'>>;
    setIncludeInstrumentalParts: React.Dispatch<React.SetStateAction<boolean>>;
    setActiveSpecialTraitIds: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedProfileId: React.Dispatch<React.SetStateAction<1 | 2 | 3 | null>>;
    setBurstResults: React.Dispatch<React.SetStateAction<HistoryItem['outputs'][]>>;
    setSelectedBurstIndex: React.Dispatch<React.SetStateAction<number>>;
    onEditCover: (imageUrl: string) => void;
    onEditLyrics: (lyrics: string, source: 'history', historyId: number) => void;
    setTranslateLyrics: React.Dispatch<React.SetStateAction<boolean>>;
}

const HistoryTab: React.FC<HistoryTabProps> = (props) => {
    const { history, setHistory, setActiveView, onEditCover, onEditLyrics } = props;
    const { user, addCredits } = useContext(UserContext);
    const { animeThemes, creditCosts } = useContext(DataContext);
    const { onAuthOpen } = useContext(UIActionContext);
    const { triggerAchievementCheck } = useContext(AchievementContext);
    const { settings } = useContext(SettingsContext);
    const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(history.length > 0 ? history[0] : null);
    const [verificationState, setVerificationState] = useState<{itemId: number | null, isLoading: boolean, message: string}>({
        itemId: null,
        isLoading: false,
        message: ''
    });

    const markAsCopied = (itemId: number) => {
        setHistory(prev => prev.map(item =>
            item.id === itemId ? { ...item, isCopied: true } : item
        ));
        if (selectedItem?.id === itemId) {
            setSelectedItem(prev => prev ? { ...prev, isCopied: true } : null);
        }
    };
    
    const handleCopyButtonClick = (content: string, itemId: number) => {
        navigator.clipboard.writeText(content);
        markAsCopied(itemId);
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
    
    const handleLoad = (item: HistoryItem) => {
        // Set standard props
        props.setMode(item.mode);
        props.setLanguage(item.language);
        props.setSelectedArtist(item.inputs.artist || null);
        props.setSelectedAnimeTheme(item.inputs.animeTheme || animeThemes[0].name);
        props.setSelectedStructure(item.inputs.structure!);
        props.setSelectedStyles(item.inputs.styles || []);
        props.setSelectedAmbiances(item.inputs.ambiances || []);
        props.setThemeText(item.inputs.theme || item.inputs.lyrics || ''); // Load theme or imported lyrics
        props.setUsePrimaryStyles(item.inputs.usePrimaryStyles || true);
        props.setKeywords(item.inputs.keywords || '');
        props.setAlbumArt(item.albumArt || '');
        props.setSongTitle(item.outputs.songTitle || '');
        props.setVaryChoruses(item.inputs.varyChoruses || false);
        props.setChorusDuration(item.inputs.chorusDuration || 'medium');
        props.setIncludeInstrumentalParts(item.inputs.includeInstrumentalParts || false);
        props.setActiveSpecialTraitIds(item.inputs.activeSpecialTraitIds || []);
        props.setSelectedProfileId(item.inputs.selectedProfileId || null);
        props.setTranslateLyrics(item.inputs.translateLyrics || false);

        // Handle burst results
        if (item.burstOutputs && item.burstOutputs.length > 0) {
            props.setBurstResults(item.burstOutputs);
            props.setSelectedBurstIndex(0);
            // Load the first variation into the main display
            props.setLyrics(item.outputs.lyrics);
            props.setStylePrompt(item.outputs.stylePrompt);
        } else {
            // Clear burst state and load single output
            props.setBurstResults([]);
            props.setSelectedBurstIndex(0);
            props.setLyrics(item.outputs.lyrics);
            props.setStylePrompt(item.outputs.stylePrompt);
        }

        setActiveView('generator');
        triggerAchievementCheck('LOAD_FROM_HISTORY');
    };

    const handleDelete = (id: number) => {
        setHistory(prev => prev.filter(item => item.id !== id));
        if (selectedItem?.id === id) {
            setSelectedItem(history.length > 1 ? history.find(i => i.id !== id) || null : null);
        }
    };

    const handleShare = async (item: HistoryItem) => {
        try {
            // Créer un post communautaire à partir de l'historique
            const postData = {
                title: getTitle(item),
                description: `Chanson générée avec Lyr-IA - ${item.mode}`,
                content: {
                    songTitle: item.outputs.songTitle,
                    lyrics: item.outputs.lyrics,
                    albumArt: item.outputs.albumArt,
                    structure: item.outputs.structure,
                    mode: item.mode,
                    language: item.language,
                    timestamp: item.timestamp
                },
                is_public: true
            };

            const result = await communityService.createPost(postData);
            
            if (result.success) {
                alert('✅ Création partagée avec succès dans la communauté !');
            } else {
                alert('❌ Erreur lors du partage : ' + result.error);
            }
        } catch (error) {
            console.error('Erreur lors du partage:', error);
            alert('❌ Erreur lors du partage de la création');
        }
    };

    const handleClearAll = () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer tout l'historique ? Cette action est irréversible.")) {
            setHistory([]);
            setSelectedItem(null);
        }
    };

    const handleVerify = async (item: HistoryItem) => {
        if (item.verificationResult) return;

        setVerificationState({ itemId: item.id, isLoading: true, message: '' });

        try {
            const result = await geminiService.verifyGenerationCompliance(item, settings, !!item.isCopied);
            
            let refundedAmount: number | undefined = undefined;
            if (!result.isCompliant) {
                const originalCost = calculateGenerationCost(item.mode, creditCosts, {
                    activeSpecialTraitIds: item.inputs.activeSpecialTraitIds,
                    styles: item.inputs.styles,
                    ambiances: item.inputs.ambiances,
                    translateLyrics: item.inputs.translateLyrics,
                });

                if (originalCost > 0) {
                    addCredits(originalCost);
                    refundedAmount = originalCost;
                }
            }

            const newVerificationResult = {
                isCompliant: result.isCompliant,
                reason: result.reason,
                refundedAmount,
                verifiedAt: new Date().toISOString(),
            };
            
            setHistory(prev => prev.map(histItem => 
                histItem.id === item.id 
                    ? { ...histItem, verificationResult: newVerificationResult } 
                    : histItem
            ));
            
            if (selectedItem?.id === item.id) {
                setSelectedItem(prev => prev ? { ...prev, verificationResult: newVerificationResult } : null);
            }

            let finalMessage = `Vérification terminée. Raison : ${result.reason}. `;
            if (refundedAmount) {
                finalMessage += `Un remboursement de ${refundedAmount} crédits a été effectué.`;
            } else if (!result.isCompliant) {
                finalMessage += `Aucun crédit n'a été remboursé car le coût initial était nul.`;
            } else {
                 finalMessage += `La génération est conforme.`;
            }
            setVerificationState({ itemId: item.id, isLoading: false, message: finalMessage });

        } catch (e) {
            console.error(e);
            setVerificationState({ itemId: item.id, isLoading: false, message: "Une erreur est survenue lors de la vérification." });
        }
    };

    const getTitle = (item: HistoryItem) => {
        if(item.outputs.songTitle) return item.outputs.songTitle;
        switch (item.mode) {
            case GenerationMode.Descriptive:
                return item.inputs.theme || 'Chanson descriptive';
            case GenerationMode.Artist:
                return `Inspiration ${item.inputs.artist?.name || 'Artiste'}`;
            case GenerationMode.LyricsImport:
                return `Style pour "${item.outputs.lyrics.substring(0, 20)}..."`;
            case GenerationMode.Instrumental: {
                const content = [
                    ...(item.inputs.styles || []),
                    ...(item.inputs.ambiances || [])
                ].join(', ');
                return `Instrumental: ${content || 'Création'}`;
            }
            case GenerationMode.AnimeOpening:
                return `Opening: ${item.inputs.animeTheme || 'Anime'}`;
            case GenerationMode.Personalized:
                return 'Création Personnalisée';
            default:
                return 'Génération';
        }
    };
    
    return (
        <div className="animate-fade-in">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-base-color">Historique des créations</h3>
                {history.length > 0 && (
                    <button onClick={handleClearAll} className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40 transition-colors">
                        <TrashIcon />
                        <span>Tout effacer</span>
                    </button>
                )}
            </div>
            {history.length === 0 ? (
                <div className="text-center py-20 text-muted-color">
                    <p>Votre historique de génération est vide.</p>
                    <p>Commencez par créer une chanson dans l'onglet "Générateur". Vos créations apparaîtront ici.</p>
                     {!user.isAuthenticated && (
                        <div className="mt-4">
                            <p className="text-sm">Vous utilisez l'application en tant qu'invité.</p>
                            <button onClick={onAuthOpen} className="mt-2 text-primary font-semibold hover:underline">
                                Connectez-vous ou inscrivez-vous
                            </button>
                             <p className="text-sm">pour sauvegarder votre historique sur votre compte.</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:h-[70vh]">
                    <div className="md:col-span-1 h-full overflow-y-auto pr-2 space-y-2">
                        {history.map(item => (
                            <div key={item.id} onClick={() => setSelectedItem(item)}
                                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${selectedItem?.id === item.id ? 'bg-primary/30 ring-2 ring-primary' : 'bg-black/20 hover:bg-black/40'}`}>
                                <p className="font-semibold text-base-color truncate">{getTitle(item)}</p>
                                <p className="text-xs text-muted-color">{new Date(item.timestamp).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                    <div className="md:col-span-2 h-full overflow-y-auto bg-black/20 rounded-lg p-4 space-y-4">
                        {selectedItem ? (
                            <>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-bold">{getTitle(selectedItem)}</h3>
                                        <p className="text-sm text-muted-color">{new Date(selectedItem.timestamp).toLocaleString()}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button onClick={() => handleLoad(selectedItem)} className="p-2 rounded-lg bg-primary/20 text-primary-light hover:bg-primary/40 transition-colors" title="Charger dans le générateur">
                                            <LoadIcon />
                                        </button>
                                        {/* TEMPORAIREMENT DÉSACTIVÉ - Partage Communautaire */}
                                        {/* <button onClick={() => handleShare(selectedItem)} className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/40 transition-colors" title="Partager dans la communauté">
                                            <ShareIcon />
                                        </button> */}
                                        <button onClick={() => handleDelete(selectedItem.id)} className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors" title="Supprimer">
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </div>
                                {/* Section de demande de remboursement masquée */}
                                {/* <div className="p-3 bg-black/10 rounded-lg space-y-2">
                                    {!selectedItem.verificationResult ? (
                                        <>
                                            <p className="text-sm font-semibold text-base-color">Demande de remboursement</p>
                                            <p className="text-xs text-muted-color">Si une génération n'est pas conforme (ex: mauvais formatage) ET que vous ne l'avez copié ni par le bouton, ni en sélectionnant le texte, vous pouvez demander un remboursement. Le fait de copier le contenu le rend non remboursable.</p>
                                            
                                            {selectedItem.isCopied && (
                                                <div className="text-xs text-center p-2 bg-yellow-900/50 text-yellow-300 rounded-md">
                                                    Vous avez copié ce contenu, il n'est plus éligible à un remboursement.
                                                </div>
                                            )}
                                            
                                            <button 
                                                onClick={() => handleVerify(selectedItem)}
                                                disabled={verificationState.isLoading && verificationState.itemId === selectedItem.id || !!selectedItem.isCopied}
                                                className="w-full mt-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors bg-white/20 hover:bg-white/30 text-base-color disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {verificationState.isLoading && verificationState.itemId === selectedItem.id ? 'Vérification...' : 'Demander un remboursement'}
                                            </button>
                                            {verificationState.message && verificationState.itemId === selectedItem.id && (
                                                 <p className="text-xs text-center pt-2 text-primary-light">{verificationState.message}</p>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-sm font-semibold text-base-color">Résultat de la Vérification</p>
                                            {selectedItem.verificationResult.isCompliant ? (
                                                <p className="text-xs text-green-400">✅ Conforme. {selectedItem.verificationResult.reason}</p>
                                            ) : (
                                                <p className="text-xs text-yellow-400">
                                                    ❌ Non conforme. {selectedItem.verificationResult.reason}
                                                    {selectedItem.verificationResult.refundedAmount && ` ${selectedItem.verificationResult.refundedAmount} crédits ont été remboursés.`}
                                                </p>
                                            )}
                                             <p className="text-xs text-muted-color/50 text-right">Vérifié le {new Date(selectedItem.verificationResult.verifiedAt).toLocaleDateString()}</p>
                                        </>
                                    )}
                                </div> */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {selectedItem.albumArt && (
                                        <div className="w-full relative group">
                                            <img src={selectedItem.albumArt} alt="Pochette d'album générée" className="rounded-lg aspect-square object-cover" />
                                            <div className="absolute top-2 right-2 flex flex-col space-y-2">
                                                <button 
                                                    onClick={() => handleDownload(selectedItem.albumArt!, 'album-art.jpg')}
                                                    className="p-2 rounded-full bg-black/50 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Télécharger la pochette"
                                                >
                                                    <DownloadIcon />
                                                </button>
                                                <button 
                                                    onClick={() => onEditCover(selectedItem.albumArt!)}
                                                    className="p-2 rounded-full bg-black/50 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Modifier la pochette"
                                                >
                                                    <HistoryEditIcon />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <div className={`space-y-4 ${selectedItem.albumArt ? 'lg:col-span-1' : 'lg:col-span-2'}`}>
                                        <div>
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-semibold">Style Prompt</h4>
                                                <div className="flex space-x-2">
                                                    <button onClick={() => handleCopyButtonClick(selectedItem.outputs.stylePrompt, selectedItem.id)} className="p-1.5 rounded-md bg-white/20 hover:bg-white/30 text-base-color transition-colors" title="Copier le prompt"><CopyIcon /></button>
                                                    <button onClick={() => handleDownload(selectedItem.outputs.stylePrompt, 'style-prompt.txt')} className="p-1.5 rounded-md bg-white/20 hover:bg-white/30 text-base-color transition-colors" title="Télécharger le prompt"><DownloadIcon /></button>
                                                </div>
                                            </div>
                                            <p onCopy={() => markAsCopied(selectedItem.id)} className="text-xs p-2 bg-black/30 rounded font-mono whitespace-pre-wrap text-muted-color">{selectedItem.outputs.stylePrompt}</p>
                                        </div>
                                        {selectedItem.outputs.lyrics && (
                                            <div>
                                                <div className="flex justify-between items-center mb-1">
                                                    <h4 className="font-semibold">Paroles</h4>
                                                    <div className="flex space-x-2">
                                                        <button onClick={() => handleCopyButtonClick(selectedItem.outputs.lyrics, selectedItem.id)} className="p-1.5 rounded-md bg-white/20 hover:bg-white/30 text-base-color transition-colors" title="Copier les paroles"><CopyIcon /></button>
                                                        <button onClick={() => onEditLyrics(selectedItem.outputs.lyrics, 'history', selectedItem.id)} className="p-1.5 rounded-md bg-white/20 hover:bg-white/30 text-base-color transition-colors" title="Modifier les paroles"><HistoryEditIcon /></button>
                                                        <button onClick={() => handleDownload(selectedItem.outputs.lyrics, 'lyrics.txt')} className="p-1.5 rounded-md bg-white/20 hover:bg-white/30 text-base-color transition-colors" title="Télécharger les paroles"><DownloadIcon /></button>
                                                    </div>
                                                </div>
                                                <LyricsDisplay
                                                    onCopy={() => markAsCopied(selectedItem.id)}
                                                    lyrics={selectedItem.outputs.lyrics}
                                                    baseClassName="text-xs p-2 bg-black/30 rounded text-muted-color"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-color">
                                <p>Sélectionnez un élément pour voir les détails</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

interface ProfileTabProps {
    onOpenSubscriptionModal: () => void;
    setActiveView: (view: 'generator' | 'analyzer' | 'editor' | 'account' | 'tos') => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ onOpenSubscriptionModal, setActiveView }) => {
    const { user, updateUsername, updateActiveTitle, updateProfilePicture, logout } = useContext(UserContext);
    const { plans } = useContext(DataContext);
    const [username, setUsername] = useState(user.username || '');
    const [activeTitle, setActiveTitle] = useState(user.activeTitle || 'none');
    const [feedback, setFeedback] = useState('');
    const [isUploadingPicture, setIsUploadingPicture] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const currentPlan = plans.find(p => p.id === user.plan);
    const isSecretMember = user.plan === SubscriptionPlan.SecretSociety;

    const handlePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Vérifier la taille (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                setFeedback('❌ L\'image doit faire moins de 2 MB');
                setTimeout(() => setFeedback(''), 3000);
                return;
            }

            // Vérifier le type
            if (!file.type.startsWith('image/')) {
                setFeedback('❌ Le fichier doit être une image');
                setTimeout(() => setFeedback(''), 3000);
                return;
            }

            setIsUploadingPicture(true);
            const result = await updateProfilePicture(file);
            setIsUploadingPicture(false);

            if (result.success) {
                setFeedback('✅ Photo de profil mise à jour !');
            } else {
                setFeedback(`❌ Erreur: ${result.error}`);
            }
            setTimeout(() => setFeedback(''), 3000);
        }
    };

    const handleSave = async () => {
        let hasChanges = false;
        let hasError = false;

        // Mettre à jour le username si changé
        if (username !== user.username) {
            const result = await updateUsername(username);
            if (result.success) {
                hasChanges = true;
            } else {
                setFeedback(`Erreur: ${result.error}`);
                hasError = true;
            }
        }

        // Mettre à jour le titre actif si changé
        if (activeTitle !== (user.activeTitle || 'none')) {
            const result = await updateActiveTitle(activeTitle);
            if (result.success) {
                hasChanges = true;
            } else {
                setFeedback(`Erreur: ${result.error}`);
                hasError = true;
            }
        }

        // Afficher le feedback
        if (hasChanges && !hasError) {
            setFeedback('Profil mis à jour avec succès !');
        }
        setTimeout(() => setFeedback(''), 3000);
    };

    const handleLogout = () => {
        logout();
        setActiveView('generator');
    };

    const isSaveDisabled = username === user.username && activeTitle === (user.activeTitle || 'none');
    
    const CrownIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z"></path>
            <path d="M5 21h14"></path>
        </svg>
    );

    const titleOptions: CustomSelectOption<string>[] = [
        { value: 'none', label: 'Aucun titre', searchValue: 'Aucun titre' },
        ...(user.unlockedTitles || []).map(title => ({ value: title, label: title, searchValue: title }))
    ];


    return (
        <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Picture Section */}
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative group w-40 h-40">
                        <div className="w-full h-full rounded-full overflow-hidden bg-black/20 ring-4 ring-white/10 flex items-center justify-center">
                            {user.profilePictureUrl ? (
                                <img src={user.profilePictureUrl} alt="Profil" className="w-full h-full object-cover" />
                            ) : (
                                <DefaultProfileIcon />
                            )}
                        </div>
                        {isUploadingPicture && (
                            <div className="absolute inset-0 bg-black/80 rounded-full flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                        )}
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploadingPicture}
                            className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-not-allowed"
                        >
                            <EditIcon />
                        </button>
                    </div>
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePictureChange} className="hidden" />
                    <button 
                        onClick={() => fileInputRef.current?.click()} 
                        disabled={isUploadingPicture}
                        className="text-sm text-primary-light hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUploadingPicture ? 'Upload en cours...' : 'Modifier la photo'}
                    </button>
                </div>

                {/* Account Details Section */}
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-muted-color mb-1">Nom d'utilisateur</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full bg-white/50 dark:bg-black/30 border border-slate-600 rounded-lg p-3 text-base-color focus:ring-primary focus:border-primary"
                        />
                    </div>
                     <div>
                        <label htmlFor="activeTitle" className="block text-sm font-medium text-muted-color mb-1">Titre Actif</label>
                        <CustomSelect
                            options={titleOptions}
                            value={activeTitle}
                            onChange={value => setActiveTitle(value)}
                            placeholder="Sélectionnez un titre"
                            disabled={(user.unlockedTitles?.length || 0) === 0}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-muted-color mb-1">Adresse e-mail</label>
                        <input
                            id="email"
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full bg-white/20 dark:bg-black/10 border border-slate-700 rounded-lg p-3 text-muted-color cursor-not-allowed"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-muted-color mb-2">Abonnement</label>
                        <div className="p-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-on-gradient shadow-lg flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="text-yellow-300 animate-pulse">
                                    <CrownIcon />
                                </div>
                                <div>
                                    <p className="text-sm opacity-80">Plan Actuel</p>
                                    <p className="font-bold text-lg">{currentPlan?.name}</p>
                                </div>
                            </div>
                            <button 
                                onClick={onOpenSubscriptionModal} 
                                className="bg-white/90 text-primary font-semibold px-4 py-2 rounded-lg text-sm hover:bg-white transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                                disabled={isSecretMember}
                            >
                                {isSecretMember ? "Accès Total" : "Gérer l'abonnement"}
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleSave}
                            disabled={isSaveDisabled}
                            className="w-full py-3 px-6 bg-gradient-to-r from-primary to-secondary text-on-gradient font-bold rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Sauvegarder les modifications
                        </button>
                        {feedback && <p className="text-green-400 text-sm mt-2 text-center">{feedback}</p>}
                    </div>
                </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
                 <button onClick={handleLogout} className="text-sm text-muted-color hover:text-red-400 transition-colors">
                    Déconnexion
                </button>
            </div>
        </div>
    );
};


interface AccountViewProps extends HistoryTabProps {
    onOpenSubscriptionModal: () => void;
}

const AccountView = forwardRef<HTMLDivElement, AccountViewProps>((props, ref) => {
    const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');

    const TabButton: React.FC<{ label: string; target: 'profile' | 'history' }> = ({ label, target }) => (
        <button
            onClick={() => setActiveTab(target)}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-colors ${activeTab === target ? 'bg-primary text-on-primary shadow' : 'text-muted-color hover:bg-white/10'}`}
        >
            {label}
        </button>
    );

    return (
        <GlassCard ref={ref} className="relative max-w-7xl mx-auto p-6 md:p-8">
             <button
                onClick={() => props.setActiveView('generator')}
                className="absolute top-6 left-6 p-2 rounded-full text-muted-color hover:text-base-color hover:bg-white/10 transition-colors z-10"
                title="Retour au générateur"
            >
                <BackIcon />
            </button>
            <h2 className="text-3xl font-bold text-base-color mb-6 text-center">Mon Espace</h2>
            
            <div className="flex space-x-2 rounded-lg bg-black/20 p-1 mb-6 max-w-sm mx-auto">
                <TabButton label="Profil" target="profile" />
                <TabButton label="Historique" target="history" />
            </div>

            <div>
                {activeTab === 'profile' && <ProfileTab onOpenSubscriptionModal={props.onOpenSubscriptionModal} setActiveView={props.setActiveView} />}
                {activeTab === 'history' && <HistoryTab {...props} />}
            </div>
        </GlassCard>
    );
});

export default AccountView;