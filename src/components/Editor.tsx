import React, { useState, useEffect, useRef, useContext } from 'react';
import GlassCard from './common/GlassCard';
import Loader from './common/Loader';
import * as geminiService from '../services/geminiService';
import { UserContext } from '../contexts/SupabaseUserContext';
import { DataContext } from '../contexts/DataContext';
import { SubscriptionPlan } from '../types';
import PlanLockOverlay from './common/PlanLockOverlay';
// Note: Les grandes sections de l'éditeur utilisent size="large"

// --- ICONS ---
const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const GenerateIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"/></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;
const LyricsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>;

interface EditorProps {
    initialImage: string | null;
    initialLyrics: string | null;
    onLyricsChange: (newLyrics: string) => void;
    language: string;
    onExit: () => void;
}

type EditorMode = 'generateImage' | 'editImage' | 'editLyrics';

const Editor: React.FC<EditorProps> = ({ initialImage, initialLyrics, onLyricsChange, language, onExit }) => {
    // --- STATE MANAGEMENT ---
    const getInitialMode = (): EditorMode => {
        if (initialLyrics !== null) return 'editLyrics';
        if (initialImage !== null) return 'editImage';
        return 'generateImage';
    };
    
    const [editorMode, setEditorMode] = useState<EditorMode>(getInitialMode());
    const { user } = useContext(UserContext);
    const appData = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Image editor state
    const [originalImage, setOriginalImage] = useState<string | null>(initialImage);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [imagePrompt, setImagePrompt] = useState('');
    const [responseText, setResponseText] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [lyricsForArt, setLyricsForArt] = useState('');
    const [styleForArt, setStyleForArt] = useState('');
    
    // Lyrics editor state
    const [editedLyrics, setEditedLyrics] = useState(initialLyrics || '');
    const [rewriteState, setRewriteState] = useState<{ original: string; start: number; end: number; isLoading: boolean; suggestion: string | null; error: string } | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setEditorMode(getInitialMode());
        if (initialLyrics !== null) setEditedLyrics(initialLyrics);
        if (initialImage !== null) setOriginalImage(initialImage);
    }, [initialImage, initialLyrics]);

    if (!appData) {
        return <GlassCard><div className="p-4"><Loader text="Chargement de l'éditeur..." /></div></GlassCard>;
    }
    const { creditCosts, plans } = appData;

    // --- HANDLERS ---
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target?.result as string;
                setOriginalImage(imageUrl);
                setResultImage(null);
                setEditorMode('editImage');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageEdit = async () => {
        if (!originalImage || !imagePrompt) {
            setError("Veuillez fournir une image et un prompt de modification.");
            return;
        }
        setIsLoading(true);
        setError('');
        setResponseText(null);
        try {
            const result = await geminiService.editAlbumArt(originalImage, imagePrompt);
            setResultImage(result.image);
            setResponseText(result.text);
        } catch (e: any) {
            console.error(e);
            setError(e.message || "Une erreur est survenue lors de la modification de l'image.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleGenerateFromSong = async () => {
        if (!lyricsForArt) {
            setError("Veuillez fournir les paroles de la chanson.");
            return;
        }
        const cost = creditCosts.albumArt;
        if (user.credits !== 'unlimited' && user.credits < cost) {
            setError(`Crédits insuffisants. Vous avez besoin de ${cost} crédits.`);
            return;
        }
        setIsLoading(true);
        setError('');
        setResponseText(null);
        try {
            const art = await geminiService.generateAlbumArt(lyricsForArt, styleForArt);
            const newImageUrl = `data:image/jpeg;base64,${art}`;
            setOriginalImage(newImageUrl);
            setResultImage(null);
            setEditorMode('editImage');
        } catch (e: any) {
            console.error(e);
            setError(e.message || "Une erreur est survenue lors de la génération de l'image.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = (imageUrl: string) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'edited-album-art.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleLyricsDoubleClick = async (e: React.MouseEvent<HTMLTextAreaElement>) => {
        const textarea = e.currentTarget;
        const { selectionStart, value } = textarea;
        if (!value) return;

        // Find the start and end of the line
        const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1;
        let lineEnd = value.indexOf('\n', selectionStart);
        if (lineEnd === -1) {
            lineEnd = value.length;
        }

        const selectedLine = value.substring(lineStart, lineEnd).trim();
        if (!selectedLine || /^\[.*\]$/.test(selectedLine)) return; // Ignore empty lines or section headers

        // Easter Egg: Rhyming "orange" (repurposed for fun)
        if (selectedLine.toLowerCase().includes('orange')) {
        }

        // Prepare context: mark the line to be rewritten
        const context = value.substring(0, lineStart) + `***${selectedLine}***` + value.substring(lineEnd);

        setRewriteState({ 
            original: selectedLine, 
            start: lineStart, 
            end: lineEnd, 
            isLoading: true, 
            suggestion: null, 
            error: '' 
        });

        try {
            const suggestion = await geminiService.rewritePhrase(selectedLine, language, context);
            setRewriteState(prev => prev && prev.original === selectedLine ? { ...prev, isLoading: false, suggestion } : prev);
        } catch (err) {
            console.error(err);
            setRewriteState(prev => prev && prev.original === selectedLine ? { ...prev, isLoading: false, error: 'Erreur de réécriture.' } : prev);
        }
    };
    
    const handleReplacePhrase = (newPhrase: string) => {
        if (!rewriteState) return;
        const { start, end } = rewriteState;
        const newLyrics = editedLyrics.substring(0, start) + newPhrase + (editedLyrics.substring(end, end + 1) === '\n' ? '' : '\n') + editedLyrics.substring(end);
        setEditedLyrics(newLyrics);
        onLyricsChange(newLyrics);
        
        // Adjust cursor position after replacement
        if (textareaRef.current) {
            const cursorPosition = start + newPhrase.length;
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(cursorPosition, cursorPosition);
        }
        setRewriteState(null);
    };

    // --- RENDER FUNCTIONS ---
    const renderModeSwitcher = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 w-full max-w-xl mx-auto bg-black/20 rounded-lg p-1 my-4">
            <ModeButton mode="generateImage" icon={<GenerateIcon />} label="Générer Image" />
            <ModeButton mode="editImage" icon={<EditIcon />} label="Modifier Image" />
            <ModeButton mode="editLyrics" icon={<LyricsIcon />} label="Modifier Paroles" />
        </div>
    );
    
    const ModeButton: React.FC<{ mode: EditorMode, icon: React.ReactNode, label: string }> = ({ mode, icon, label }) => (
        <button
            onClick={() => setEditorMode(mode)}
            className={`flex items-center justify-center space-x-2 px-3 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${editorMode === mode ? 'bg-primary text-on-primary shadow-md' : 'text-muted-color hover:bg-white/10'}`}
        >
            {icon}
            <span className="truncate">{label}</span>
        </button>
    );

    const renderImageGenerator = () => {
        const cost = creditCosts.albumArt;
        const isPlanLocked = user.plan === SubscriptionPlan.Free;
        const planNeeded = plans.find(p => p.id === SubscriptionPlan.Creator)?.name || 'Creator';
        const hasEnoughCredits = user.credits === 'unlimited' || user.credits >= cost;
        
        return (
            <div className="max-w-xl mx-auto">
                <PlanLockOverlay
                    isLocked={isPlanLocked}
                    requiredPlanName={planNeeded}
                    isAuthenticated={user.isAuthenticated}
                >
                    <div className="animate-fade-in">
                        <div className="space-y-4">
                            <textarea value={lyricsForArt} onChange={(e) => setLyricsForArt(e.target.value)} placeholder="Collez les paroles de la chanson ici..." className="w-full h-32 p-3 rounded-lg bg-white/50 dark:bg-black/30 border border-slate-600 placeholder-color text-base-color"/>
                            <textarea value={styleForArt} onChange={(e) => setStyleForArt(e.target.value)} placeholder="Décrivez le style musical (optionnel)..." className="w-full h-24 p-3 rounded-lg bg-white/50 dark:bg-black/30 border border-slate-600 placeholder-color text-base-color"/>
                        </div>
                        <button onClick={handleGenerateFromSong} disabled={isLoading || !lyricsForArt || !hasEnoughCredits} className="w-full mt-4 py-3 px-6 bg-gradient-to-r from-primary to-secondary text-on-gradient font-bold rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? 'Génération...' : !hasEnoughCredits ? 'Crédits insuffisants' : `Générer la Pochette (${cost} crédits)`}
                        </button>
                    </div>
                </PlanLockOverlay>
            </div>
        );
    };

    const renderImageEditor = () => {
        const isPlanLocked = user.plan === SubscriptionPlan.Free;
        const planNeeded = plans.find(p => p.id === SubscriptionPlan.Creator)?.name || 'Creator';

        if (!originalImage) {
            return (
                <PlanLockOverlay
                    isLocked={isPlanLocked}
                    requiredPlanName={planNeeded}
                    isAuthenticated={user.isAuthenticated}
                >
                    <div className="text-center py-20 text-muted-color border-2 border-dashed border-white/20 rounded-lg">
                        <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
                        <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center w-full">
                            <UploadIcon />
                            <p className="mt-4 font-semibold text-base-color">Cliquez pour téléverser une image</p>
                            <p className="text-xs">Ou sélectionnez-en une depuis l'historique.</p>
                        </button>
                    </div>
                </PlanLockOverlay>
            );
        }

        return (
            <PlanLockOverlay
                isLocked={isPlanLocked}
                requiredPlanName={planNeeded}
                isAuthenticated={user.isAuthenticated}
            >
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-base-color">Image à modifier</h3>
                        <div className="relative group mt-2">
                            <img src={originalImage} alt="Original" className="rounded-lg w-full aspect-square object-cover shadow-md" />
                            <div className="absolute top-2 right-2"><button onClick={() => handleDownload(originalImage)} className="p-2 rounded-full bg-black/50 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70" title="Télécharger l'image"><DownloadIcon /></button></div>
                        </div>
                        <textarea value={imagePrompt} onChange={(e) => setImagePrompt(e.target.value)} placeholder="Décrivez votre modification..." className="w-full h-24 p-2 mt-4 rounded-lg bg-white/50 dark:bg-black/30 border border-slate-600 placeholder-color text-base-color" />
                         <button onClick={handleImageEdit} disabled={isLoading || !imagePrompt} className="w-full mt-2 py-3 px-6 bg-gradient-to-r from-primary to-secondary text-on-gradient font-bold rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? 'Modification en cours...' : "Modifier l'image (Gratuit)"}
                        </button>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-semibold text-base-color">Résultat</h3>
                        <div className="w-full aspect-square bg-black/20 rounded-lg flex items-center justify-center relative overflow-hidden shadow-md">
                            {isLoading && <Loader text="Génération..." />}
                            {!isLoading && !resultImage && <p className="text-muted-color">Le résultat apparaîtra ici.</p>}
                            {resultImage && (<><img src={resultImage} alt="Edited" className="w-full h-full object-cover" /><div className="absolute top-2 right-2"><button onClick={() => handleDownload(resultImage)} className="p-2 rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70" title="Télécharger l'image modifiée"><DownloadIcon /></button></div></>)}
                        </div>
                        {responseText && (<div><h4 className="font-semibold text-sm text-base-color mb-1">Réponse de l'IA</h4><p className="p-3 bg-black/20 rounded-lg text-xs text-muted-color">{responseText}</p></div>)}
                    </div>
                </div>
            </PlanLockOverlay>
        );
    };

    const renderLyricsEditor = () => {
        const isPlanLocked = user.plan === SubscriptionPlan.Free;
        const planNeeded = plans.find(p => p.id === SubscriptionPlan.Creator)?.name || 'Creator';
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                <div className="md:col-span-2">
                    <textarea
                        ref={textareaRef}
                        value={editedLyrics}
                        onDoubleClick={isPlanLocked ? undefined : handleLyricsDoubleClick}
                        onChange={(e) => {
                            setEditedLyrics(e.target.value);
                            onLyricsChange(e.target.value);
                        }}
                        placeholder="Vos paroles apparaîtront ici..."
                        className="w-full h-[50vh] md:h-[60vh] p-4 rounded-lg bg-white/50 dark:bg-black/30 border border-slate-600 placeholder-color text-base-color resize-none"
                    />
                </div>
                 <div className="md:col-span-1">
                    <PlanLockOverlay
                        isLocked={isPlanLocked}
                        requiredPlanName={planNeeded}
                        isAuthenticated={user.isAuthenticated}
                        className="h-full"
                    >
                        <div className="p-4 rounded-lg bg-black/20 space-y-3 h-full">
                            <h3 className="text-lg font-semibold text-base-color flex items-center">
                                Assistant de Réécriture
                            </h3>
                            {!rewriteState ? <p className="text-sm text-muted-color">Double-cliquez sur une ligne de vos paroles pour obtenir une alternative créative qui respecte le style et les rimes.</p> :
                            rewriteState?.isLoading ? <Loader text={`Réflexion en cours...`} /> :
                            (
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-muted-color mb-1">Phrase originale :</p>
                                        <p className="p-2 bg-black/30 rounded-md text-sm italic">"{rewriteState.original}"</p>
                                    </div>
                                    {rewriteState.suggestion && (
                                        <div>
                                            <p className="text-xs text-muted-color mb-1">Suggestion :</p>
                                            <div className="p-3 bg-primary/20 rounded-md text-primary-light font-semibold text-sm cursor-pointer hover:bg-primary/30" onClick={() => handleReplacePhrase(rewriteState.suggestion!)}>
                                                "{rewriteState.suggestion}"
                                                <span className="block text-right text-xs mt-1 opacity-70">Cliquez pour remplacer</span>
                                            </div>
                                        </div>
                                    )}
                                    {rewriteState.error && <p className="text-red-400 text-xs">{rewriteState.error}</p>}
                                    <button onClick={() => setRewriteState(null)} className="text-xs text-muted-color hover:text-white w-full text-center mt-2">Fermer</button>
                                </div>
                            )}
                        </div>
                    </PlanLockOverlay>
                </div>
            </div>
        );
    };


    const renderContent = () => {
        if (isLoading && !resultImage) return <Loader text="Chargement..." />;
        if (error) return <p className="text-red-300 bg-red-900/50 p-3 rounded-lg text-center text-sm my-4">{error}</p>;

        switch (editorMode) {
            case 'generateImage': return renderImageGenerator();
            case 'editImage': return renderImageEditor();
            case 'editLyrics': return renderLyricsEditor();
            default: return null;
        }
    };

    return (
        <GlassCard className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-3 mb-2">
                <button onClick={onExit} className="p-2 rounded-full hover:bg-white/10 transition-colors"><BackIcon /></button>
                <div>
                    <h2 className="text-2xl font-bold text-base-color">Éditeur</h2>
                    <p className="text-sm text-muted-color">Générez, modifiez et peaufinez vos créations.</p>
                </div>
            </div>
            
            {renderModeSwitcher()}

            <div className="mt-4">
                {renderContent()}
            </div>
        </GlassCard>
    );
};

export default Editor;