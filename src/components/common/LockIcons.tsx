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

// Option 6: Couronne 👑
export const CrownIcon: React.FC<IconProps> = ({ width = 18, height = 18, className = '' }) => {
    const gradientId = `crownGrad-${Math.random().toString(36).substr(2, 9)}`;
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
                    <stop offset="50%" stopColor="#f59e0b"/>
                    <stop offset="100%" stopColor="#d97706"/>
                </linearGradient>
            </defs>
            {/* Glow */}
            <circle cx="16" cy="16" r="14" fill={`url(#${gradientId})`} opacity="0.2"/>
            {/* Crown base */}
            <path
                d="M6 14L9 10L13 14L16 8L19 14L23 10L26 14V24H6V14Z"
                fill={`url(#${gradientId})`}
                opacity="0.9"
            />
            {/* Crown band */}
            <rect x="6" y="22" width="20" height="3" rx="0.5" fill={`url(#${gradientId})`}/>
            {/* Jewels */}
            <circle cx="16" cy="10" r="1.5" fill="#ef4444" opacity="0.9"/>
            <circle cx="10" cy="16" r="1" fill="#3b82f6" opacity="0.8"/>
            <circle cx="22" cy="16" r="1" fill="#3b82f6" opacity="0.8"/>
            {/* Highlights */}
            <circle cx="15" cy="18" r="0.8" fill="white" opacity="0.7"/>
            <circle cx="18" cy="20" r="0.6" fill="white" opacity="0.6"/>
        </svg>
    );
};

// Option 7: Trophée 🏆
export const TrophyIcon: React.FC<IconProps> = ({ width = 18, height = 18, className = '' }) => {
    const gradientId = `trophyGrad-${Math.random().toString(36).substr(2, 9)}`;
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
            <circle cx="16" cy="14" r="12" fill={`url(#${gradientId})`} opacity="0.2"/>
            {/* Trophy cup */}
            <path
                d="M10 8H22V14C22 17 19.5 19 16 19C12.5 19 10 17 10 14V8Z"
                fill={`url(#${gradientId})`}
                opacity="0.9"
            />
            {/* Handles */}
            <path d="M9 10H7C7 12 7.5 13 9 13V10Z" fill={`url(#${gradientId})`} opacity="0.8"/>
            <path d="M23 10H25C25 12 24.5 13 23 13V10Z" fill={`url(#${gradientId})`} opacity="0.8"/>
            {/* Base */}
            <rect x="13" y="19" width="6" height="3" fill={`url(#${gradientId})`}/>
            <rect x="11" y="22" width="10" height="2" rx="1" fill={`url(#${gradientId})`}/>
            {/* Shine */}
            <circle cx="14" cy="11" r="1" fill="white" opacity="0.8"/>
            <path d="M18 10L19 13" stroke="white" strokeWidth="0.8" opacity="0.6"/>
        </svg>
    );
};

// Option 8: Rocket 🚀
export const RocketIcon: React.FC<IconProps> = ({ width = 18, height = 18, className = '' }) => {
    const gradientId = `rocketGrad-${Math.random().toString(36).substr(2, 9)}`;
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
                    <stop offset="50%" stopColor="#6366f1"/>
                    <stop offset="100%" stopColor="#3b82f6"/>
                </linearGradient>
            </defs>
            {/* Glow */}
            <circle cx="16" cy="14" r="13" fill={`url(#${gradientId})`} opacity="0.2"/>
            {/* Rocket body */}
            <path
                d="M16 5C16 5 10 8 10 16C10 18 12 20 14 22L16 26L18 22C20 20 22 18 22 16C22 8 16 5 16 5Z"
                fill={`url(#${gradientId})`}
                opacity="0.9"
            />
            {/* Window */}
            <circle cx="16" cy="13" r="2.5" fill="#60a5fa" opacity="0.8"/>
            <circle cx="16" cy="13" r="1.5" fill="white" opacity="0.4"/>
            {/* Fins */}
            <path d="M10 16L8 20L10 18Z" fill={`url(#${gradientId})`} opacity="0.7"/>
            <path d="M22 16L24 20L22 18Z" fill={`url(#${gradientId})`} opacity="0.7"/>
            {/* Flames */}
            <circle cx="14" cy="24" r="1" fill="#f97316" opacity="0.8"/>
            <circle cx="16" cy="25" r="1.2" fill="#fbbf24" opacity="0.9"/>
            <circle cx="18" cy="24" r="1" fill="#f97316" opacity="0.8"/>
        </svg>
    );
};

// Option 9: Gemme 💠
export const GemIcon: React.FC<IconProps> = ({ width = 18, height = 18, className = '' }) => {
    const gradientId = `gemGrad-${Math.random().toString(36).substr(2, 9)}`;
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
                    <stop offset="0%" stopColor="#a78bfa"/>
                    <stop offset="50%" stopColor="#8b5cf6"/>
                    <stop offset="100%" stopColor="#7c3aed"/>
                </linearGradient>
            </defs>
            {/* Glow */}
            <circle cx="16" cy="16" r="14" fill={`url(#${gradientId})`} opacity="0.2"/>
            {/* Hexagonal gem */}
            <path
                d="M16 6L24 10V16L16 26L8 16V10L16 6Z"
                fill={`url(#${gradientId})`}
                opacity="0.9"
            />
            {/* Facets for 3D effect */}
            <path d="M16 6L24 10L16 16L8 10L16 6Z" fill="white" opacity="0.2"/>
            <path d="M8 10L16 16L16 26L8 16V10Z" fill="black" opacity="0.2"/>
            <path d="M24 10L16 16L16 26L24 16V10Z" fill="black" opacity="0.15"/>
            {/* Highlight */}
            <circle cx="13" cy="11" r="1.5" fill="white" opacity="0.8"/>
            <circle cx="18" cy="13" r="1" fill="white" opacity="0.6"/>
        </svg>
    );
};

// Option 10: Médaille 🥇
export const MedalIcon: React.FC<IconProps> = ({ width = 18, height = 18, className = '' }) => {
    const gradientId = `medalGrad-${Math.random().toString(36).substr(2, 9)}`;
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
            <circle cx="16" cy="18" r="12" fill={`url(#${gradientId})`} opacity="0.2"/>
            {/* Ribbon */}
            <path d="M12 6L16 4L20 6L18 14H14L12 6Z" fill="#dc2626" opacity="0.8"/>
            <path d="M14 14L12 6L10 8L14 18Z" fill="#b91c1c" opacity="0.6"/>
            <path d="M18 14L20 6L22 8L18 18Z" fill="#b91c1c" opacity="0.6"/>
            {/* Medal circle */}
            <circle cx="16" cy="18" r="7" fill={`url(#${gradientId})`} opacity="0.9"/>
            <circle cx="16" cy="18" r="5.5" stroke="#d97706" strokeWidth="0.5" fill="none"/>
            {/* Star in center */}
            <path
                d="M16 14L17 17H20L17.5 18.5L18.5 22L16 20L13.5 22L14.5 18.5L12 17H15L16 14Z"
                fill="white"
                opacity="0.9"
            />
        </svg>
    );
};

// Option 11: Étoile Filante 🌟
export const ShootingStarIcon: React.FC<IconProps> = ({ width = 18, height = 18, className = '' }) => {
    const gradientId = `shootingStarGrad-${Math.random().toString(36).substr(2, 9)}`;
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
                    <stop offset="50%" stopColor="#f59e0b"/>
                    <stop offset="100%" stopColor="#f97316"/>
                </linearGradient>
            </defs>
            {/* Trail glow */}
            <circle cx="20" cy="12" r="14" fill={`url(#${gradientId})`} opacity="0.15"/>
            {/* Star trails */}
            <path d="M8 24L12 20L16 16" stroke={`url(#${gradientId})`} strokeWidth="2" opacity="0.3" strokeLinecap="round"/>
            <path d="M10 26L14 22L18 18" stroke={`url(#${gradientId})`} strokeWidth="1.5" opacity="0.2" strokeLinecap="round"/>
            {/* Main star */}
            <path
                d="M20 6L22 12H28L23 16L25 23L20 19L15 23L17 16L12 12H18L20 6Z"
                fill={`url(#${gradientId})`}
                stroke="#fbbf24"
                strokeWidth="0.5"
            />
            {/* Sparkles */}
            <circle cx="20" cy="8" r="1.2" fill="white" opacity="0.95"/>
            <circle cx="16" cy="13" r="0.8" fill="white" opacity="0.85"/>
            <circle cx="24" cy="13" r="0.8" fill="white" opacity="0.85"/>
            {/* Trail sparkles */}
            <circle cx="14" cy="18" r="0.6" fill="white" opacity="0.6"/>
            <circle cx="10" cy="22" r="0.5" fill="white" opacity="0.5"/>
        </svg>
    );
};

// Option 12: Bouclier ⚔️
export const ShieldIcon: React.FC<IconProps> = ({ width = 18, height = 18, className = '' }) => {
    const gradientId = `shieldGrad-${Math.random().toString(36).substr(2, 9)}`;
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
                    <stop offset="0%" stopColor="#3b82f6"/>
                    <stop offset="50%" stopColor="#6366f1"/>
                    <stop offset="100%" stopColor="#8b5cf6"/>
                </linearGradient>
            </defs>
            {/* Glow */}
            <circle cx="16" cy="15" r="13" fill={`url(#${gradientId})`} opacity="0.2"/>
            {/* Shield */}
            <path
                d="M16 5C16 5 10 7 10 10V16C10 21 16 26 16 26C16 26 22 21 22 16V10C22 7 16 5 16 5Z"
                fill={`url(#${gradientId})`}
                opacity="0.9"
            />
            {/* Center emblem */}
            <path
                d="M16 11L18 15L22 15L19 17L20 21L16 18.5L12 21L13 17L10 15L14 15L16 11Z"
                fill="white"
                opacity="0.8"
            />
            {/* Shield outline */}
            <path
                d="M16 5C16 5 10 7 10 10V16C10 21 16 26 16 26C16 26 22 21 22 16V10C22 7 16 5 16 5Z"
                stroke="white"
                strokeWidth="0.5"
                opacity="0.3"
            />
        </svg>
    );
};

// Option 13: Magie ✨
export const MagicIcon: React.FC<IconProps> = ({ width = 18, height = 18, className = '' }) => {
    const gradientId = `magicGrad-${Math.random().toString(36).substr(2, 9)}`;
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
                    <stop offset="0%" stopColor="#a78bfa"/>
                    <stop offset="50%" stopColor="#c084fc"/>
                    <stop offset="100%" stopColor="#e879f9"/>
                </linearGradient>
            </defs>
            {/* Glow */}
            <circle cx="16" cy="16" r="14" fill={`url(#${gradientId})`} opacity="0.2"/>
            {/* Magic wand */}
            <path
                d="M22 10L24 12L12 24L10 22L22 10Z"
                fill={`url(#${gradientId})`}
                stroke="white"
                strokeWidth="0.5"
                opacity="0.9"
            />
            {/* Wand star tip */}
            <path
                d="M24 8L25 11L28 12L25 13L24 16L23 13L20 12L23 11L24 8Z"
                fill="#fbbf24"
                opacity="0.95"
            />
            {/* Magic sparkles */}
            <circle cx="18" cy="14" r="1" fill="#fbbf24" opacity="0.9"/>
            <circle cx="14" cy="18" r="1.2" fill="#f0abfc" opacity="0.9"/>
            <circle cx="10" cy="20" r="0.8" fill="#c084fc" opacity="0.8"/>
            <path d="M8 16L8.5 17.5L10 18L8.5 18.5L8 20L7.5 18.5L6 18L7.5 17.5L8 16Z" fill="white" opacity="0.9"/>
            <path d="M26 18L26.5 19.5L28 20L26.5 20.5L26 22L25.5 20.5L24 20L25.5 19.5L26 18Z" fill="white" opacity="0.9"/>
        </svg>
    );
};

// Option 14: Infini ♾️
export const InfinityIcon: React.FC<IconProps> = ({ width = 18, height = 18, className = '' }) => {
    const gradientId = `infinityGrad-${Math.random().toString(36).substr(2, 9)}`;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 32 32"
            fill="none"
            className={className}>
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4"/>
                    <stop offset="50%" stopColor="#3b82f6"/>
                    <stop offset="100%" stopColor="#8b5cf6"/>
                </linearGradient>
            </defs>
            {/* Glow */}
            <ellipse cx="16" cy="16" rx="15" ry="12" fill={`url(#${gradientId})`} opacity="0.2"/>
            {/* Infinity symbol */}
            <path
                d="M8 16C8 13 9.5 11 12 11C14.5 11 15.5 13 16 14C16.5 13 17.5 11 20 11C22.5 11 24 13 24 16C24 19 22.5 21 20 21C17.5 21 16.5 19 16 18C15.5 19 14.5 21 12 21C9.5 21 8 19 8 16Z"
                fill={`url(#${gradientId})`}
                opacity="0.9"
                strokeWidth="0.8"
                stroke="white"
                strokeOpacity="0.3"
            />
            {/* Sparkles on curves */}
            <circle cx="12" cy="14" r="1" fill="white" opacity="0.9"/>
            <circle cx="20" cy="14" r="1" fill="white" opacity="0.9"/>
            <circle cx="16" cy="16" r="0.8" fill="white" opacity="0.7"/>
        </svg>
    );
};

// Option 15: Cœur Premium 💝
export const HeartIcon: React.FC<IconProps> = ({ width = 18, height = 18, className = '' }) => {
    const gradientId = `heartGrad-${Math.random().toString(36).substr(2, 9)}`;
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
                    <stop offset="0%" stopColor="#ec4899"/>
                    <stop offset="50%" stopColor="#f43f5e"/>
                    <stop offset="100%" stopColor="#ef4444"/>
                </linearGradient>
            </defs>
            {/* Glow */}
            <circle cx="16" cy="16" r="13" fill={`url(#${gradientId})`} opacity="0.2"/>
            {/* Heart */}
            <path
                d="M16 26C16 26 6 20 6 13C6 9 8 7 11 7C13 7 15 8 16 10C17 8 19 7 21 7C24 7 26 9 26 13C26 20 16 26 16 26Z"
                fill={`url(#${gradientId})`}
                opacity="0.9"
            />
            {/* Shine */}
            <circle cx="12" cy="11" r="1.5" fill="white" opacity="0.8"/>
            <circle cx="14" cy="13" r="1" fill="white" opacity="0.6"/>
            {/* Sparkles */}
            <path d="M8 10L8.5 11.5L10 12L8.5 12.5L8 14L7.5 12.5L6 12L7.5 11.5L8 10Z" fill="white" opacity="0.9"/>
            <path d="M24 16L24.5 17.5L26 18L24.5 18.5L24 20L23.5 18.5L22 18L23.5 17.5L24 16Z" fill="white" opacity="0.8"/>
        </svg>
    );
};

// Export par défaut - Change cette ligne pour tester différentes icônes !
// Options disponibles:
// LockIcon 🔒 - Cadenas classique
// StarIcon ⭐ - Étoile dorée
// DiamondIcon 💎 - Diamant multicolore
// FireIcon 🔥 - Flamme dynamique
// LightningIcon ⚡ - Éclair rapide
// CrownIcon 👑 - Couronne royale
// TrophyIcon 🏆 - Trophée de champion
// RocketIcon 🚀 - Fusée spatiale
// GemIcon 💠 - Gemme hexagonale
// MedalIcon 🥇 - Médaille d'or
// ShootingStarIcon 🌟 - Étoile filante
// MagicIcon ✨ - Baguette magique
// ShieldIcon ⚔️ - Bouclier protecteur
// HeartIcon 💝 - Cœur premium

export const PremiumIcon = DiamondIcon; // 💎 DIAMANT - Élégant et premium





