import React, { useState } from 'react';
import type { HistoryItem } from '../../types';
import * as communityService from '../../services/communityService';
import GlassCard from '../common/GlassCard';

interface ShareCreationModalProps {
  historyItem: HistoryItem;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (postId: string) => void;
}

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

const ShareCreationModal: React.FC<ShareCreationModalProps> = ({
  historyItem,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sharedUrl, setSharedUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleShare = async () => {
    setIsSubmitting(true);
    try {
      const { data, error } = await communityService.createPostFromHistory(
        historyItem,
        isPublic,
        description
      );

      if (error || !data) {
        throw error || new Error('Failed to create post');
      }

      const url = `${window.location.origin}/song/${data.id}`;
      setSharedUrl(url);
      
      if (onSuccess) {
        onSuccess(data.id);
      }
    } catch (error) {
      console.error('Error sharing creation:', error);
      alert('Erreur lors du partage de la création');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyLink = () => {
    if (sharedUrl) {
      navigator.clipboard.writeText(sharedUrl);
      // TODO: Toast de confirmation
      setTimeout(() => {
        onClose();
        setSharedUrl(null);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <GlassCard className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {!sharedUrl ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-base-color flex items-center gap-2">
                  <ShareIcon />
                  Partager votre création
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-muted-color hover:text-base-color hover:bg-white/10 rounded-lg transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Preview */}
              <div className="mb-6 p-4 bg-black/20 rounded-lg">
                <h3 className="text-lg font-bold text-base-color mb-2">
                  {historyItem.outputs.title || 'Sans titre'}
                </h3>
                {historyItem.outputs.albumArt && (
                  <img
                    src={historyItem.outputs.albumArt}
                    alt={historyItem.outputs.title}
                    className="w-full rounded-lg mb-2 max-h-64 object-cover"
                  />
                )}
                {historyItem.outputs.stylePrompt && (
                  <p className="text-muted-color text-sm mb-2">{historyItem.outputs.stylePrompt}</p>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-base-color font-semibold mb-2">
                  Description (optionnelle)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ajoutez une description pour votre création..."
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-base-color placeholder-muted-color focus:outline-none focus:border-primary resize-none"
                  rows={4}
                  maxLength={500}
                />
                <p className="text-muted-color text-sm mt-1">{description.length}/500</p>
              </div>

              {/* Privacy */}
              <div className="mb-6">
                <label className="block text-base-color font-semibold mb-3">
                  Confidentialité
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-black/20 rounded-lg cursor-pointer hover:bg-black/30 transition-all">
                    <input
                      type="radio"
                      name="privacy"
                      checked={isPublic}
                      onChange={() => setIsPublic(true)}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="text-base-color font-medium">🌍 Public</p>
                      <p className="text-muted-color text-sm">Visible par tout le monde dans le hub communautaire</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-black/20 rounded-lg cursor-pointer hover:bg-black/30 transition-all">
                    <input
                      type="radio"
                      name="privacy"
                      checked={!isPublic}
                      onChange={() => setIsPublic(false)}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="text-base-color font-medium">🔒 Privé</p>
                      <p className="text-muted-color text-sm">Uniquement accessible via le lien</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-base-color font-medium transition-all"
                >
                  Annuler
                </button>
                <button
                  onClick={handleShare}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-on-primary font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Partage en cours...' : 'Partager'}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-base-color mb-2">
                  ✨ Création partagée !
                </h3>
                <p className="text-muted-color mb-6">
                  Votre création est maintenant {isPublic ? 'visible dans le hub communautaire' : 'accessible via le lien'}
                </p>
                
                {/* Lien partageable */}
                <div className="p-4 bg-black/20 rounded-lg mb-6">
                  <p className="text-muted-color text-sm mb-2">Lien partageable :</p>
                  <p className="text-primary-light font-mono text-sm break-all">{sharedUrl}</p>
                </div>

                <button
                  onClick={handleCopyLink}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-on-primary font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  📋 Copier le lien
                </button>
              </div>
            </>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default ShareCreationModal;




