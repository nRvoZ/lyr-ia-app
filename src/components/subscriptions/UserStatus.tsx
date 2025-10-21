import React, { useContext } from 'react';
import { UserContext } from '../../contexts/SupabaseUserContext';
import { DataContext } from '../../contexts/DataContext';
import { SubscriptionPlan } from '../../types';

const DefaultProfileIcon = () => (
    <svg className="w-7 h-7 text-muted-color" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2ZM9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7Z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M12 14C7.58172 14 4 17.5817 4 22H6C6 18.6863 8.68629 16 12 16C15.3137 16 18 18.6863 18 22H20C20 17.5817 16.4183 14 12 14Z" />
    </svg>
);

// --- Interface de props pour la réutilisabilité des icônes ---
interface IconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

// --- L'ICÔNE DE PIÈCE (Moderne avec gradient doré) ---
const CoinIcon: React.FC<IconProps> = ({ width = 20, height = 20, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="0"
    className={className || "text-yellow-400"}
  >
    <circle cx="12" cy="12" r="10" fill="url(#coinGradient)"/>
    <circle cx="12" cy="12" r="7" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
    <text x="12" y="16" fontSize="12" fontWeight="bold" fill="rgba(255,255,255,0.9)" textAnchor="middle">₵</text>
    <defs>
      <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700"/>
        <stop offset="50%" stopColor="#FFA500"/>
        <stop offset="100%" stopColor="#FF8C00"/>
      </linearGradient>
    </defs>
  </svg>
);

// --- ICONS FOR PLAN BADGES (Modernes et filled) ---
const BadgeBrushIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" strokeWidth="0">
    <path d="M20.71 4.63l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41zM7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3z"/>
  </svg>
);

const BadgeDiamondIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" strokeWidth="0">
    <path d="M12.886 3.172l9.18 8.494a1.5 1.5 0 0 1 .01 2.18l-9.19 9.14a1.5 1.5 0 0 1-2.12.01l-9.18-9.14a1.5 1.5 0 0 1 0-2.18l9.19-8.494a2 2 0 0 1 2.11-.01z"/>
  </svg>
);

const BadgeStarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" strokeWidth="0">
    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.897l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z"/>
  </svg>
);

const BadgeBriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" strokeWidth="0">
    <path d="M20 7h-4V5l-2-2h-4L8 5v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5z"/>
  </svg>
);

const BadgeCrownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 32 32" fill="none" strokeWidth="0">
    {/* Glow effect */}
    <circle cx="16" cy="16" r="14" fill="url(#crownGlow)" opacity="0.3"/>
    
    {/* Main crown shape */}
    <path d="M6 20l2-10 4 6 4-10 4 10 4-6 2 10H6z" fill="url(#crownGradient)" stroke="#FFD700" strokeWidth="0.8"/>
    
    {/* Crown base with shine */}
    <rect x="8" y="21" width="16" height="3" rx="1.5" fill="url(#crownGradient)" stroke="#FFD700" strokeWidth="0.5"/>
    
    {/* Diamond jewels with sparkle */}
    <path d="M10 14l-1 2h2l-1-2z" fill="#FFE55C" filter="url(#sparkle)"/>
    <path d="M16 6l-1.5 3h3L16 6z" fill="#FFE55C" filter="url(#sparkle)"/>
    <path d="M22 14l-1 2h2l-1-2z" fill="#FFE55C" filter="url(#sparkle)"/>
    
    {/* Sparkle points */}
    <circle cx="16" cy="6" r="1" fill="#FFF" opacity="0.9"/>
    <circle cx="10" cy="14" r="0.8" fill="#FFF" opacity="0.9"/>
    <circle cx="22" cy="14" r="0.8" fill="#FFF" opacity="0.9"/>
    
    <defs>
      <linearGradient id="crownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700"/>
        <stop offset="50%" stopColor="#FFA500"/>
        <stop offset="100%" stopColor="#FF6B00"/>
      </linearGradient>
      <radialGradient id="crownGlow">
        <stop offset="0%" stopColor="#FFD700"/>
        <stop offset="100%" stopColor="#FF8C00" stopOpacity="0"/>
      </radialGradient>
      <filter id="sparkle">
        <feGaussianBlur stdDeviation="0.3"/>
      </filter>
    </defs>
  </svg>
);


const PlanBadge: React.FC<{ planId: SubscriptionPlan }> = ({ planId }) => {
    const data = useContext(DataContext);
    if (!data) return null;

    const plan = data.plans.find(p => p.id === planId);
    // Don't show a badge for the Free plan or if plan is not found
    if (!plan || planId === SubscriptionPlan.Free) {
        return null;
    }

    const tierDetails: { [key: string]: { icon: React.ReactNode; color: string } } = {
        [SubscriptionPlan.Creator]: { icon: <BadgeBrushIcon />, color: 'text-teal-300' },
        [SubscriptionPlan.CreatorAnnual]: { icon: <BadgeBrushIcon />, color: 'text-teal-300' },
        [SubscriptionPlan.Pro]: { icon: <BadgeDiamondIcon />, color: 'text-purple-300' },
        [SubscriptionPlan.ProAnnual]: { icon: <BadgeDiamondIcon />, color: 'text-purple-300' },
        [SubscriptionPlan.Ultimate]: { icon: <BadgeStarIcon />, color: 'text-yellow-300' },
        [SubscriptionPlan.UltimateAnnual]: { icon: <BadgeStarIcon />, color: 'text-yellow-300' },
        [SubscriptionPlan.Business]: { icon: <BadgeBriefcaseIcon />, color: 'text-slate-300' },
        [SubscriptionPlan.BusinessAnnual]: { icon: <BadgeBriefcaseIcon />, color: 'text-slate-300' },
        [SubscriptionPlan.SecretSociety]: { icon: <BadgeCrownIcon />, color: 'text-yellow-300' },
    };
    
    const details = tierDetails[planId];
    if (!details) return null;

    return (
        <span className={`ml-1.5 flex-shrink-0 ${details.color}`} title={plan.name}>
            {details.icon}
        </span>
    );
};


interface UserStatusProps {
    onAccountClick: () => void;
    onCreditsClick: () => void;
}

const UserStatus: React.FC<UserStatusProps> = ({ onAccountClick, onCreditsClick }) => {
    const { user } = useContext(UserContext);

    return (
        <div className="themed-outline flex items-center rounded-full bg-black/20 backdrop-blur-sm border border-white/10 p-1.5 space-x-2 transition-all duration-300 hover:bg-black/30 hover:scale-105 hover:shadow-lg animate-slide-up">
            {/* Avatar part, clickable to open account */}
            <button onClick={onAccountClick} className="flex-shrink-0 transition-transform duration-200 hover:scale-110 hover:rotate-6 active:scale-95" title="Mon Compte">
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30 ring-2 ring-white/10 hover:ring-primary transition-all duration-300">
                     {user.profilePictureUrl ? (
                        <img src={user.profilePictureUrl} alt="Profil" className="w-full h-full object-cover" />
                    ) : (
                        <div className="p-1.5"><DefaultProfileIcon /></div>
                    )}
                </div>
            </button>

            {/* Info part */}
            <div className="flex-1 min-w-0 pr-1">
                {/* Username, clickable to open account */}
                <button onClick={onAccountClick} className="w-full text-left transition-all duration-200 hover:text-primary" title="Mon Compte">
                    <div className="flex items-center">
                        <p className="font-semibold text-base-color text-sm truncate transition-colors">{user.username || 'Utilisateur'}</p>
                        <PlanBadge planId={user.plan} />
                    </div>
                    {/* Active Title */}
                    {user.activeTitle && user.activeTitle !== 'none' && (
                        <p className="text-xs text-primary/80 italic truncate -mt-0.5">{user.activeTitle}</p>
                    )}
                </button>
                {/* Credits, clickable to open credit modal */}
                <button onClick={onCreditsClick} className="flex items-center space-x-1 mt-1 transition-all duration-200 hover:scale-110 group" title="Acheter des crédits">
                    <div className="group-hover:animate-wiggle">
                        <CoinIcon />
                    </div>
                    <span className="font-semibold text-base-color text-sm group-hover:text-yellow-400 transition-colors">{user.credits === 'unlimited' ? '∞' : user.credits}</span>
                </button>
            </div>
        </div>
    );
};

export default UserStatus;
