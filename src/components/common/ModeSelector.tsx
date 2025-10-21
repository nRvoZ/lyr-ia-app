import React, { useContext } from 'react';
import { GenerationMode, SubscriptionPlan } from '../../types';
import { UserContext } from '../../contexts/UserContext';

// Icons
const DescriptiveIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;
const ArtistIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"/><circle cx="17" cy="7" r="5"/></svg>;
const InstrumentalIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 6-8.5 8.5a.5.5 0 1 0 .7.7L12 7.2l8.5 8.5a.5.5 0 1 0 .7-.7L12 6Z"/><path d="M12 18.7 4.7 11.4a.5.5 0 1 0-.7.7l8 8a.5.5 0 0 0 .7 0l8-8a.5.5 0 1 0-.7-.7L12 18.7Z"/></svg>;
const AnimeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a7 7 0 0 0-7 7c0 3.5 2.5 7.5 7 7.5s7-4 7-7.5-3-7-7-7z"/><path d="M8.5 2.5a2.5 2.5 0 0 1 0 5"/><path d="M15.5 2.5a2.5 2.5 0 0 0 0 5"/></svg>;
const PersonalizedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 00-2 19.52c.2.04.2-.1.2-.2v-1.6c-1.8.4-2.2-1.2-2.2-1.2-.2-.5-.5-.6-.5-.6-.4-.3 0-.3 0-.3.5 0 .7.5.7.5.4.7 1 .5 1.3.4.1-.3.2-.5.2-.6-1.7-.2-3.5-.8-3.5-3.8 0-.8.3-1.5.8-2-.1-.2-.4-1 .1-2 0 0 .6-.2 2.2.8.6 0 1.3-.1 2-.1s1.4.1 2 .1c1.6-1 2.2-.8 2.2-.8.4 1 .2 1.8.1 2 .5.5.8 1.2.8 2 0 3-1.8 3.6-3.5 3.8.2.2.3.6.3 1.1v1.6c0 .1 0 .2.2.2A10 10 0 0012 2z" /></svg>;
const LyricsImportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const FreestyleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>;


interface ModeSelectorProps {
    selectedMode: GenerationMode;
    onSelectMode: (mode: GenerationMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ selectedMode, onSelectMode }) => {
    const { user } = useContext(UserContext);
    
    const getModeTooltip = (key: GenerationMode): string => {
        if ((key === GenerationMode.AnimeOpening || key === GenerationMode.Artist) && [SubscriptionPlan.Free, SubscriptionPlan.Creator].includes(user.plan)) {
            return user.isAuthenticated 
                ? 'Passez au plan Pro pour débloquer ce mode' 
                : 'Connectez-vous pour débloquer ce mode';
        }
        if ((key === GenerationMode.Instrumental || key === GenerationMode.LyricsImport) && user.plan === SubscriptionPlan.Free) {
             return user.isAuthenticated 
                ? 'Passez au plan Créateur pour débloquer ce mode'
                : 'Connectez-vous pour débloquer ce mode';
        }
         if (key === GenerationMode.Personalized && ![SubscriptionPlan.Ultimate, SubscriptionPlan.Business, SubscriptionPlan.SecretSociety].includes(user.plan)) {
             return user.isAuthenticated 
                ? 'Passez au plan Ultimate pour débloquer ce mode'
                : 'Connectez-vous pour débloquer ce mode';
        }
        return '';
    };

    const modes = [
        { key: GenerationMode.Descriptive, label: 'Descriptif', icon: <DescriptiveIcon /> },
        // { key: GenerationMode.Freestyle, label: 'Freestyle', icon: <FreestyleIcon /> }, // Caché
        { key: GenerationMode.Artist, label: 'Artiste', icon: <ArtistIcon /> },
        { key: GenerationMode.LyricsImport, label: 'Paroles Imp.', icon: <LyricsImportIcon /> },
        { key: GenerationMode.Instrumental, label: 'Instrumental', icon: <InstrumentalIcon /> },
        { key: GenerationMode.AnimeOpening, label: "Anime", icon: <AnimeIcon /> },
        { key: GenerationMode.Personalized, label: "Personnalisé", icon: <PersonalizedIcon /> },
    ];

    return (
        <div className="flex w-full items-center bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-1 space-x-1">
            {modes.map(mode => (
                <button
                    key={mode.key}
                    onClick={() => onSelectMode(mode.key)}
                    className={`flex-1 flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all duration-300 min-w-0
                        ${selectedMode === mode.key 
                            ? 'bg-gradient-to-r from-primary to-secondary text-on-primary shadow-lg scale-105' 
                            : 'text-muted-color hover:bg-white/10 hover:scale-105'}
                    `}
                    title={getModeTooltip(mode.key)}
                >
                    {mode.icon}
                    <span className="truncate">{mode.label}</span>
                </button>
            ))}
        </div>
    );
};

export default ModeSelector;