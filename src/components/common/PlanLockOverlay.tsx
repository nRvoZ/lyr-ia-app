import React, { useContext } from 'react';
import { UIActionContext } from '../../contexts/AppContexts';
import { PremiumIcon } from './LockIcons';

interface PlanLockOverlayProps {
    children: React.ReactNode;
    isLocked: boolean;
    requiredPlanName: string;
    isAuthenticated: boolean;
    className?: string;
    displayMode?: 'overlay' | 'badge';
    showIcon?: boolean;
    showButton?: boolean;
    size?: 'small' | 'large'; // Nouveau: choix de la taille du badge
}
interface IconProps {
    width?: number | string;
    height?: number | string;
    className?: string;
}
const OverlayLockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
</svg>
);

// Utiliser l'icône premium depuis le fichier LockIcons
const BadgeCrownIcon = PremiumIcon;


const PlanLockOverlay: React.FC<PlanLockOverlayProps> = ({ 
    children, 
    isLocked, 
    requiredPlanName, 
    isAuthenticated, 
    className = '',
    displayMode = 'overlay',
    showIcon = true,
    showButton = true,
    size = 'small', // Par défaut : petit badge
}) => {
    const { onAuthOpen, onUpgradeOpen } = useContext(UIActionContext);

    if (!isLocked) {
        return <>{children}</>;
    }

    const action = isAuthenticated ? onUpgradeOpen : onAuthOpen;
    const buttonText = isAuthenticated ? 'Passer au niveau supérieur' : 'Se connecter pour débloquer';

    if (displayMode === 'badge') {
        return (
            <div 
                className={`flex items-center space-x-2 ${className}`}
            >
                <div className="opacity-50 pointer-events-none">
                    {children}
                </div>
                <button
                    onClick={action}
                    title={`Nécessite le plan ${requiredPlanName}`}
                    className="cursor-pointer"
                >
                    <BadgeCrownIcon />
                </button>
            </div>
        );
    }
    
    // Default 'overlay' mode - Deux variantes selon la taille
    
    // VARIANTE PETIT BADGE (pour petites zones)
    if (size === 'small') {
        return (
            <div className={`relative ${className}`}>
                <div className={isLocked ? 'blur-sm pointer-events-none select-none' : ''}>
                    {children}
                </div>
                {isLocked && (
                    <div className="absolute inset-0 z-[1] flex items-center justify-center">
                        {/* Overlay de fond */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 rounded-xl"></div>
                        
                        {/* Petit badge pill compact */}
                        {showButton && (
                            <button
                                onClick={action}
                                className="relative group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300"
                            >
                                {showIcon && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white flex-shrink-0">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                )}
                                <span className="text-white text-xs font-bold whitespace-nowrap">
                                    {requiredPlanName || 'Premium'}
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/80 group-hover:translate-x-0.5 transition-transform">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    }
    
    // VARIANTE GRAND BADGE (pour grandes sections) - Mêmes couleurs que le petit
    return (
        <div className={`relative ${className}`}>
            <div className={isLocked ? 'blur-sm pointer-events-none select-none' : ''}>
                {children}
            </div>
            {isLocked && (
                <div className="absolute inset-0 z-[1] flex items-center justify-center p-4">
                    {/* Overlay de fond */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 rounded-xl"></div>
                    
                    {/* Grand badge - Même couleur que le petit (gradient opaque) */}
                    {showButton && (
                        <button
                            onClick={action}
                            className="relative group flex flex-col sm:flex-row items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-2xl hover:scale-105 hover:shadow-2xl transition-all duration-300 max-w-md"
                        >
                            {/* Icône cadenas stylée */}
                            {showIcon && (
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-lg">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                </div>
                            )}
                            
                            {/* Texte informatif */}
                            <div className="flex flex-col items-center sm:items-start gap-1">
                                <span className="text-white text-sm font-bold whitespace-nowrap drop-shadow">
                                    Plan {requiredPlanName || 'Premium'}
                                </span>
                                <span className="text-white/90 text-xs font-medium">
                                    Cliquez pour débloquer
                                </span>
                            </div>
                            
                            {/* Flèche */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/90 group-hover:translate-x-1 transition-transform flex-shrink-0">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                            
                            {/* Effet brillance */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default PlanLockOverlay;