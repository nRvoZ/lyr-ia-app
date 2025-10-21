import React from 'react';

interface IconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

// Option 1: Cadenas moderne et minimaliste 🔒
export const LockIcon: React.FC<IconProps> = ({ width = 18, height = 18, className = '' }) => {
    const gradientId = `lockGrad-${Math.random().toString(36).substr(2, 9)}`;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 32 32"
            fill="none"
            className={className}>
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6"/>
                    <stop offset="100%" stopColor="#6366f1"/>
                </linearGradient>
            </defs>
            {/* Glow effect */}
            <circle cx="16" cy="18" r="12" fill={`url(#${gradientId})`} opacity="0.2"/>
            {/* Lock body */}
            <rect x="10" y="16" width="12" height="10" rx="2" fill={`url(#${gradientId})`} opacity="0.9"/>
            {/* Lock shackle */}
            <path
                d="M12 16V11C12 8.79086 13.7909 7 16 7C18.2091 7 20 8.79086 20 11V16"
                stroke={`url(#${gradientId})`}
                strokeWidth="2.5"
                strokeLinecap="round"
            />
            {/* Keyhole */}
            <circle cx="16" cy="20" r="1.5" fill="white" opacity="0.9"/>
            <rect x="15.5" y="21" width="1" height="2" rx="0.5" fill="white" opacity="0.9"/>
        </svg>
    );
};

// Option 2: Étoile brillante ⭐
export const StarIcon: React.FC<IconProps> = ({ width = 18, height = 18, className = '' }) => {
    const gradientId = `starGrad-${Math.random().toString(36).substr(2, 9)}`;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 32 32"
            fill="none"
            className={className}>
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24"/>
                    <stop offset="100%" stopColor="#f59e0b"/>
                </linearGradient>
            </defs>
            {/* Glow */}
            <circle cx="16" cy="16" r="14" fill={`url(#${gradientId})`} opacity="0.2"/>
            {/* Star */}
            <path
                d="M16 6L18.5 13H26L20 17.5L22.5 25L16 20L9.5 25L12 17.5L6 13H13.5L16 6Z"
                fill={`url(#${gradientId})`}
                stroke="#fbbf24"
                strokeWidth="0.5"
            />
            {/* Sparkles */}
            <circle cx="16" cy="8" r="1" fill="white" opacity="0.9"/>
            <circle cx="11" cy="14" r="0.8" fill="white" opacity="0.8"/>
            <circle cx="21" cy="14" r="0.8" fill="white" opacity="0.8"/>
        </svg>
    );
};

// Option 3: Diamant 💎
export const DiamondIcon: React.FC<IconProps> = ({ width = 18, height = 18, className = '' }) => {
    const gradientId = `diamondGrad-${Math.random().toString(36).substr(2, 9)}`;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 32 32"
            fill="none"
            className={className}>
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4"/>
                    <stop offset="50%" stopColor="#3b82f6"/>
                    <stop offset="100%" stopColor="#8b5cf6"/>
                </linearGradient>
            </defs>
            {/* Glow */}
            <circle cx="16" cy="16" r="14" fill={`url(#${gradientId})`} opacity="0.2"/>
            {/* Diamond shape */}
            <path
                d="M16 6L24 12L16 26L8 12L16 6Z"
                fill={`url(#${gradientId})`}
                opacity="0.9"
            />
            {/* Facets */}
            <path d="M16 6L16 26" stroke="white" strokeWidth="0.5" opacity="0.3"/>
            <path d="M8 12L24 12" stroke="white" strokeWidth="0.5" opacity="0.3"/>
            <path d="M10 9L16 12L22 9" stroke="white" strokeWidth="0.5" opacity="0.5"/>
            {/* Highlight */}
            <circle cx="14" cy="10" r="1.5" fill="white" opacity="0.7"/>
        </svg>
    );
};

// Option 4: Flamme 🔥
export const FireIcon: React.FC<IconProps> = ({ width = 18, height = 18, className = '' }) => {
    const gradientId = `fireGrad-${Math.random().toString(36).substr(2, 9)}`;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 32 32"
            fill="none"
            className={className}>
            <defs>
                <linearGradient id={gradientId} x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24"/>
                    <stop offset="50%" stopColor="#f97316"/>
                    <stop offset="100%" stopColor="#dc2626"/>
                </linearGradient>
            </defs>
            {/* Glow */}
            <circle cx="16" cy="18" r="12" fill={`url(#${gradientId})`} opacity="0.3"/>
            {/* Flame outer */}
            <path
                d="M16 6C16 6 10 12 10 18C10 22 12.5 26 16 26C19.5 26 22 22 22 18C22 12 16 6 16 6Z"
                fill={`url(#${gradientId})`}
                opacity="0.9"
            />
            {/* Flame inner */}
            <path
                d="M16 12C16 12 13 15 13 18C13 20 14 22 16 22C18 22 19 20 19 18C19 15 16 12 16 12Z"
                fill="#fbbf24"
                opacity="0.7"
            />
            {/* Highlight */}
            <circle cx="15" cy="14" r="1" fill="white" opacity="0.8"/>
        </svg>
    );
};

// Option 5: Éclair ⚡
export const LightningIcon: React.FC<IconProps> = ({ width = 18, height = 18, className = '' }) => {
    const gradientId = `lightningGrad-${Math.random().toString(36).substr(2, 9)}`;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 32 32"
            fill="none"
            className={className}>
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24"/>
                    <stop offset="100%" stopColor="#eab308"/>
                </linearGradient>
            </defs>
            {/* Glow */}
            <circle cx="16" cy="16" r="14" fill={`url(#${gradientId})`} opacity="0.2"/>
            {/* Lightning bolt */}
            <path
                d="M18 5L9 17H16L14 27L23 15H16L18 5Z"
                fill={`url(#${gradientId})`}
                stroke="#fbbf24"
                strokeWidth="0.5"
            />
            {/* Highlight */}
            <path
                d="M17 8L13 15H16L15 20L19 13H16L17 8Z"
                fill="white"
                opacity="0.4"
            />
        </svg>
    );
};

// Export par défaut - Change cette ligne pour tester différentes icônes !
// Options: LockIcon 🔒, StarIcon ⭐, DiamondIcon 💎, FireIcon 🔥, LightningIcon ⚡
export const PremiumIcon = StarIcon; // ⭐ ÉTOILE DORÉE - Par défaut





