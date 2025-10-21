import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { DataContext } from '../../contexts/DataContext';
import { Plan, SubscriptionPlan } from '../../types';
import GlassCard from '../common/GlassCard';
import { redirectToCheckout } from '../../services/stripeService';

// --- ICONS ---

interface IconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}
const CheckIcon: React.FC<IconProps> = ({ width = 16, height = 16, className = '' }) => (
     <svg 
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
);

const LifetimeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const BrushIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/></svg>;
const DiamondIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.7 10.3a2.4 2.4 0 0 0 0 3.4l7.5 7.5c.9.9 2.5.9 3.4 0l7.5-7.5a2.4 2.4 0 0 0 0-3.4l-7.5-7.5a2.4 2.4 0 0 0-3.4 0Z"/></svg>;
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;


const getPlanIcon = (planId: SubscriptionPlan) => {
    // Match plan names used in monetization constants
    if (planId.toString() === 'Découverte' || planId === SubscriptionPlan.Free) return <UserIcon />;
    if (planId.toString() === 'Créateur' || planId === SubscriptionPlan.Creator) return <BrushIcon />;
    if (planId.toString() === 'Pro' || planId === SubscriptionPlan.Pro) return <DiamondIcon />;
    if (planId.toString() === 'Ultimate' || planId === SubscriptionPlan.Ultimate) return <StarIcon />;

    switch (planId) {
        case SubscriptionPlan.Business: return <BriefcaseIcon />;
        case SubscriptionPlan.CreatorAnnual:
        case SubscriptionPlan.ProAnnual:
        case SubscriptionPlan.UltimateAnnual:
        case SubscriptionPlan.BusinessAnnual:
             return <LifetimeIcon />;
        default: return <UserIcon />;
    }
}

const PlanCard: React.FC<{ plan: Plan; isCurrent: boolean; onSelect: (priceId: string, mode: 'subscription' | 'payment') => void; }> = ({ plan, isCurrent, onSelect }) => {
    const popularBadge = "absolute -top-3.5 right-4 bg-secondary text-on-gradient px-3 py-0.5 text-xs font-bold rounded-full shadow-lg transform rotate-6";
    const cardBorder = plan.isMostPopular ? 'border-2 border-primary' : 'border border-white/10';
    const isAnnual = [SubscriptionPlan.CreatorAnnual, SubscriptionPlan.ProAnnual, SubscriptionPlan.UltimateAnnual, SubscriptionPlan.BusinessAnnual].includes(plan.id);
    const cardBg = isAnnual ? 'bg-gradient-to-tr from-yellow-500/10 to-purple-500/10' : 'bg-black/20';
    const paymentMode = 'subscription';

    return (
        <div className={`relative flex flex-col p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 ${cardBg} ${cardBorder}`}>
            {plan.isMostPopular && <div className={popularBadge}>Populaire</div>}
            
            <div className="flex items-center space-x-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary/20 rounded-xl text-primary">
                    {getPlanIcon(plan.id)}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-base-color">{plan.name}</h3>
                    <p className="text-sm text-muted-color">{plan.priceDetails}</p>
                </div>
            </div>

            <div className="flex-grow">
                <p className="text-4xl font-extrabold text-base-color mb-6">{plan.price}</p>
                
                <ul className="space-y-3 text-sm mb-8">
                    {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/50 flex items-center justify-center mr-3 mt-0.5">
                               <CheckIcon />
                            </span>
                            <span className="text-muted-color">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <button
                onClick={() => onSelect(plan.stripePriceId, paymentMode)}
                disabled={isCurrent}
                className={`w-full mt-auto py-2.5 rounded-lg font-semibold transition-colors text-sm ${isCurrent ? 'bg-white/30 text-base-color cursor-default' : 'bg-primary hover:bg-primary-hover text-on-primary'}`}
            >
                {isCurrent ? 'Plan Actuel' : 'Choisir ce plan'}
            </button>
        </div>
    );
};

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  const { user } = useContext(UserContext);
  const { plans } = useContext(DataContext);
  const modalRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<'monthly' | 'annual'>('monthly');
  const [error, setError] = useState('');

  const annualPlans = plans.filter(p => [SubscriptionPlan.CreatorAnnual, SubscriptionPlan.ProAnnual, SubscriptionPlan.UltimateAnnual, SubscriptionPlan.BusinessAnnual].includes(p.id) && p.stripePriceId);
  const monthlyPlans = plans.filter(p => ![SubscriptionPlan.CreatorAnnual, SubscriptionPlan.ProAnnual, SubscriptionPlan.UltimateAnnual, SubscriptionPlan.BusinessAnnual, SubscriptionPlan.SecretSociety].includes(p.id) && p.stripePriceId);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const handleSelectPlan = async (priceId: string, mode: 'subscription' | 'payment') => {
      setError('');
      try {
          // Récupérer l'ID utilisateur Supabase
          const { data: { user: authUser } } = await import('../../services/supabaseClient').then(m => m.supabase.auth.getUser());
          const userId = authUser?.id || '';
          
          console.log('🔑 User ID pour l\'abonnement:', userId);
          // Pour les abonnements, on n'envoie pas de credits car ils sont gérés par le plan
          await redirectToCheckout(priceId, mode, userId);
          // The user will be redirected, so we don't need to close the modal here.
      } catch (e: any) {
          setError(`Erreur de paiement : ${e.message}`);
      }
  };
  
  const ToggleButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex-1 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${isActive ? 'bg-primary text-on-primary shadow' : 'text-muted-color hover:bg-white/10'}`}
    >
        {label}
    </button>
  );

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 animate-fade-in p-4"
      onClick={handleOverlayClick}
    >
      <div ref={modalRef} className="w-full max-w-7xl">
        <GlassCard className="p-8 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-extrabold text-base-color mb-2">Passez au niveau supérieur</h2>
                <p className="text-muted-color max-w-2xl mx-auto">Débloquez des fonctionnalités puissantes, augmentez vos limites et donnez vie à votre musique sans contraintes.</p>
            </div>
            
            <div className="flex justify-center mb-8">
                <div className="flex space-x-2 rounded-lg bg-black/20 p-1">
                    <ToggleButton label="Abonnements mensuels" isActive={view === 'monthly'} onClick={() => setView('monthly')} />
                    <ToggleButton label="Abonnements annuels" isActive={view === 'annual'} onClick={() => setView('annual')} />
                </div>
            </div>

            {view === 'monthly' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 animate-fade-in">
                    {monthlyPlans.map(plan => (
                        <PlanCard 
                            key={plan.id} 
                            plan={plan}
                            isCurrent={user.plan === plan.id}
                            onSelect={handleSelectPlan}
                        />
                    ))}
                </div>
            )}
            
            {view === 'annual' && (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
                    {annualPlans.map(plan => (
                        <PlanCard 
                            key={plan.id}
                            plan={plan}
                            isCurrent={user.plan === plan.id}
                            onSelect={handleSelectPlan}
                        />
                    ))}
                </div>
            )}

            {error && <p className="text-red-400 text-center mt-4 text-sm">{error}</p>}

             <div className="mt-8 text-center">
                <button
                    onClick={onClose}
                    className="text-muted-color hover:text-base-color text-sm"
                >
                    Fermer
                </button>
            </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default SubscriptionModal;