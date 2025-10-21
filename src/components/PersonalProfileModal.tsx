import React, { useState, useEffect, useRef } from 'react';
import { PersonalProfile } from '../types';
import GlassCard from './common/GlassCard';

interface PersonalProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PersonalProfile | null;
  onSave: (profile: PersonalProfile) => void;
  creditCost?: number;
}

const PersonalProfileModal: React.FC<PersonalProfileModalProps> = ({ isOpen, onClose, profile, onSave, creditCost }) => {
  const [name, setName] = useState('');
  const [styleDescription, setStyleDescription] = useState('');
  const [exampleLyrics, setExampleLyrics] = useState('');
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && profile) {
      setName(profile.name || `Profil ${profile.id}`);
      setStyleDescription(profile.styleDescription || '');
      setExampleLyrics(profile.exampleLyrics || '');
      setError('');
    }
  }, [isOpen, profile]);

  if (!isOpen || !profile) return null;

  const handleSave = () => {
    setError('');
    try {
      onSave({
        ...profile,
        name,
        styleDescription,
        exampleLyrics,
      });
      onClose();
    } catch (e: any) {
      setError(e.message);
    }
  };
  
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 animate-fade-in p-4"
      onClick={handleOverlayClick}
    >
      <div ref={modalRef} className="w-full max-w-2xl">
        <GlassCard className="p-8 max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-base-color mb-6">Éditer le Profil Personnel {profile.id}</h2>
          {creditCost && (
            <p className="text-xs text-amber-300 bg-amber-900/50 p-2 rounded-md mb-4">
              <strong>Note :</strong> L'entraînement initial d'un profil (le premier enregistrement avec du contenu) coûte {creditCost} crédits. Les modifications ultérieures sont gratuites.
            </p>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-color mb-1">Nom du Profil</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Mon style Rock Poétique"
                className="w-full bg-white/50 dark:bg-black/30 border border-slate-600 rounded-lg p-3 placeholder-color text-base-color"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-color mb-1">Description de Style</label>
              <textarea
                value={styleDescription}
                onChange={(e) => setStyleDescription(e.target.value)}
                placeholder="Décrivez votre style musical, vos thèmes, votre ton, vos influences..."
                className="w-full h-32 p-3 rounded-lg bg-white/50 dark:bg-black/30 border border-slate-600 placeholder-color text-base-color"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-color mb-1">Exemples de Paroles (pour l'entraînement)</label>
              <textarea
                value={exampleLyrics}
                onChange={(e) => setExampleLyrics(e.target.value)}
                placeholder="Collez ici un ou plusieurs de vos textes pour que l'IA apprenne votre style d'écriture."
                className="w-full h-48 p-3 rounded-lg bg-white/50 dark:bg-black/30 border border-slate-600 placeholder-color text-base-color"
              />
            </div>
          </div>
          {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}
          <div className="mt-8 flex justify-end space-x-4">
            <button onClick={onClose} className="px-6 py-2 bg-white/10 hover:bg-white/20 font-semibold rounded-lg transition-all">
              Annuler
            </button>
            <button onClick={handleSave} className="px-6 py-2 bg-primary hover:bg-primary-hover text-on-primary font-semibold rounded-lg shadow-md transition-all">
              Sauvegarder
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default PersonalProfileModal;
