import React, { useEffect, useState } from 'react';
import { Achievement, AchievementTier } from '../../types';

interface AchievementToastProps {
    achievement: Achievement;
    onClose: () => void;
    onClick: () => void;
}

const tierColors = {
    [AchievementTier.Bronze]: 'border-yellow-700/80 bg-yellow-900/40 text-yellow-400',
    [AchievementTier.Silver]: 'border-slate-400/80 bg-slate-800/40 text-slate-200',
    [AchievementTier.Gold]: 'border-yellow-400/80 bg-yellow-600/40 text-yellow-200',
    [AchievementTier.Diamond]: 'border-cyan-400/80 bg-cyan-700/40 text-cyan-200',
};

const TrophyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>;

const AchievementToast: React.FC<AchievementToastProps> = ({ achievement, onClose, onClick }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(onClose, 500); // Wait for exit animation to finish
        }, 5000); // Display for 5 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent the main onClick from firing
        setIsExiting(true);
        setTimeout(onClose, 500);
    };

    const animationClass = isExiting
        ? 'animate-[slide-out-right_0.5s_ease-in-out_forwards]'
        : 'animate-[slide-in-right_0.5s_ease-in-out_forwards]';

    return (
        <div 
            onClick={onClick}
            className={`relative w-80 max-w-sm rounded-xl border backdrop-blur-lg shadow-2xl overflow-hidden cursor-pointer ${animationClass} ${tierColors[achievement.tier]}`}
            role="alert"
        >
            <div className="p-4 flex items-center space-x-3">
                <div className="flex-shrink-0 text-2xl">
                    {achievement.icon || <TrophyIcon />}
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/80">Succès Déverrouillé</p>
                    <p className="font-semibold text-base-color">{achievement.name}</p>
                </div>
            </div>
             <button
                onClick={handleClose}
                className="absolute top-1 right-1 p-1 text-white/50 hover:text-white/80"
                aria-label="Close"
            >
                &times;
            </button>
        </div>
    );
};

export default AchievementToast;