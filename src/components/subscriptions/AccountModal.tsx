import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../contexts/SupabaseUserContext';
import { DataContext } from '../../contexts/DataContext';
import GlassCard from '../common/GlassCard';
import { redirectToCheckout } from '../../services/stripeService';

interface CreditPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CoinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400"><circle cx="12" cy="12" r="8"></circle><line x1="3" y1="12" x2="21" y2="12"></line><line x1="12" y1="3" x2="12" y2="21"></line><path d="M12 12c-2.67 0-5-1.33-5-4s2.33-4 5-4 5 1.33 5 4-2.33 4-5 4z"></path><path d="M12 12c2.67 0 5 1.33 5 4s-2.33 4-5 4-5-1.33-5-4 2.33-4 5-4z"></path></svg>;

const CreditPurchaseModal: React.FC<CreditPurchaseModalProps> = ({ isOpen, onClose }) => {
  const { user } = useContext(UserContext);
  const { creditPacks } = useContext(DataContext);
  const modalRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handlePurchase = async (priceId: string, credits: number) => {
    setError('');
    try {
        // Récupérer l'ID utilisateur Supabase
        const { data: { user: authUser } } = await import('../../services/supabaseClient').then(m => m.supabase.auth.getUser());
        const userId = authUser?.id || '';
        
        console.log('🔑 User ID pour le paiement:', userId);
        await redirectToCheckout(priceId, 'payment', userId, credits);
    } catch (e: any) {
        setError(`Erreur de paiement : ${e.message}`);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 animate-fade-in p-4"
      onClick={handleOverlayClick}
    >
      <div ref={modalRef} className="w-full max-w-2xl">
        <GlassCard className="p-8 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-base-color">Acheter des Crédits</h2>
                <p className="text-muted-color">Rechargez votre compte pour continuer à créer sans interruption.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {creditPacks.map(pack => (
                    <div key={pack.credits} className="flex flex-col p-6 rounded-2xl bg-white/5 dark:bg-black/20 border border-white/10 hover:border-primary hover:bg-primary/10 transition-all transform hover:-translate-y-1">
                        <div className="flex justify-center mb-3">
                            <CoinIcon />
                        </div>
                        <div className="text-center flex-grow">
                            <p className="text-3xl font-extrabold text-base-color">{pack.credits.toLocaleString('fr-FR')}</p>
                            <p className="text-sm text-muted-color mb-4">crédits</p>
                        </div>
                         <button 
                            onClick={() => handlePurchase(pack.stripePriceId, pack.credits)}
                            className="w-full mt-auto py-2.5 rounded-lg font-semibold transition-colors bg-primary hover:bg-primary-hover text-on-primary text-sm"
                        >
                            Acheter pour {pack.price}
                        </button>
                    </div>
                ))}
            </div>

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

export default CreditPurchaseModal;