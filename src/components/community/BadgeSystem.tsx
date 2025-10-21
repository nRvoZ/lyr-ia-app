import React, { useState, useEffect, useContext } from 'react';
import { UserBadge, CommunityBadge } from '../../services/badgeService';
import * as badgeService from '../../services/badgeService';
import { UserContext } from '../../contexts/SupabaseUserContext';
import GlassCard from '../common/GlassCard';
import Button from '../common/Button';
import Loader from '../common/Loader';
import Toast from '../common/Toast';

interface BadgeSystemProps {
  userId: string;
  isOwnProfile?: boolean;
  onClose?: () => void;
}

const BadgeSystem: React.FC<BadgeSystemProps> = ({
  userId,
  isOwnProfile = false,
  onClose,
}) => {
  const { user } = useContext(UserContext);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [featuredBadges, setFeaturedBadges] = useState<UserBadge[]>([]);
  const [allBadges, setAllBadges] = useState<CommunityBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'earned' | 'all'>('earned');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadBadges();
  }, [userId]);

  const loadBadges = async () => {
    setLoading(true);
    setError(null);

    try {
      // Charger les badges de l'utilisateur
      const { data: userBadges, error: userError } = await badgeService.getUserBadges(userId);
      if (userError) throw userError;
      setBadges(userBadges || []);

      // Charger les badges mis en avant
      const { data: featured, error: featuredError } = await badgeService.getFeaturedBadges(userId);
      if (featuredError) throw featuredError;
      setFeaturedBadges(featured || []);

      // Charger tous les badges disponibles (pour l'onglet "Tous")
      const { data: all, error: allError } = await badgeService.getCommunityBadges();
      if (allError) throw allError;
      setAllBadges(all || []);
    } catch (err) {
      setError('Erreur lors du chargement des badges');
    } finally {
      setLoading(false);
    }
  };

  const handleFeatureBadge = async (badgeId: string, isFeatured: boolean) => {
    if (!isOwnProfile) return;

    setLoading(true);
    try {
      const { success, error } = await badgeService.featureBadge(badgeId, isFeatured);
      if (error) throw error;

      setSuccess(isFeatured ? 'Badge mis en avant !' : 'Badge retiré des favoris');
      await loadBadges(); // Recharger pour mettre à jour
    } catch (err) {
      setError('Erreur lors de la mise à jour du badge');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'milestone': return '🎯';
      case 'achievement': return '🏆';
      case 'special': return '⭐';
      case 'monthly': return '👑';
      default: return '🏅';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'milestone': return 'Jalons';
      case 'achievement': return 'Succès';
      case 'special': return 'Spéciaux';
      case 'monthly': return 'Mensuels';
      default: return 'Autres';
    }
  };

  const filteredBadges = activeTab === 'earned' 
    ? badges.filter(badge => selectedCategory === 'all' || badge.category === selectedCategory)
    : allBadges.filter(badge => selectedCategory === 'all' || badge.category === selectedCategory);

  const categories = ['all', 'milestone', 'achievement', 'special', 'monthly'];

  if (loading && badges.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-base-color">
          {isOwnProfile ? 'Mes Badges' : 'Badges'}
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-muted-color hover:text-base-color transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Messages */}
      {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
      {success && <Toast message={success} type="success" onClose={() => setSuccess(null)} />}

      {/* Stats rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{badges.length}</div>
          <div className="text-sm text-muted-color">Total</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-secondary">{featuredBadges.length}</div>
          <div className="text-sm text-muted-color">Favoris</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {badges.filter(b => b.category === 'milestone').length}
          </div>
          <div className="text-sm text-muted-color">Jalons</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-secondary">
            {badges.filter(b => b.category === 'achievement').length}
          </div>
          <div className="text-sm text-muted-color">Succès</div>
        </GlassCard>
      </div>

      {/* Onglets */}
      <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('earned')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'earned'
              ? 'bg-primary text-on-primary'
              : 'text-muted-color hover:text-base-color'
          }`}
        >
          Obtenus ({badges.length})
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-primary text-on-primary'
              : 'text-muted-color hover:text-base-color'
          }`}
        >
          Tous ({allBadges.length})
        </button>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-on-primary'
                : 'bg-white/10 text-muted-color hover:bg-white/20 hover:text-base-color'
            }`}
          >
            {category === 'all' ? 'Toutes' : getCategoryName(category)}
          </button>
        ))}
      </div>

      {/* Badges mis en avant */}
      {featuredBadges.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-base-color mb-3">
            Badges mis en avant
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredBadges.map(badge => (
              <GlassCard key={badge.id} className="p-4 text-center group">
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className="text-sm font-medium text-base-color truncate">
                  {badge.name}
                </div>
                <div className="text-xs text-muted-color mt-1">
                  {badge.description}
                </div>
                <div className="text-xs text-primary mt-2">
                  {new Date(badge.earned_at).toLocaleDateString()}
                </div>
                {isOwnProfile && (
                  <button
                    onClick={() => handleFeatureBadge(badge.id, false)}
                    className="mt-2 text-xs text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Retirer des favoris
                  </button>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Liste des badges */}
      <div>
        <h4 className="text-lg font-semibold text-base-color mb-3">
          {activeTab === 'earned' ? 'Badges obtenus' : 'Tous les badges'}
        </h4>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader />
          </div>
        ) : filteredBadges.length === 0 ? (
          <GlassCard className="p-8 text-center">
            <div className="text-4xl mb-4">🏅</div>
            <div className="text-base-color font-medium mb-2">
              {activeTab === 'earned' ? 'Aucun badge obtenu' : 'Aucun badge disponible'}
            </div>
            <div className="text-muted-color text-sm">
              {activeTab === 'earned' 
                ? 'Continuez à créer et partager pour débloquer des badges !'
                : 'Les badges seront disponibles bientôt !'
              }
            </div>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBadges.map(badge => {
              const isEarned = activeTab === 'earned';
              const isFeatured = featuredBadges.some(fb => fb.badge_id === badge.id);
              
              return (
                <GlassCard 
                  key={badge.id} 
                  className={`p-4 group relative ${
                    isEarned ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  {/* Badge featured indicator */}
                  {isFeatured && (
                    <div className="absolute top-2 right-2">
                      <span className="text-yellow-400 text-sm">⭐</span>
                    </div>
                  )}
                  
                  <div className="flex items-start space-x-3">
                    <div 
                      className="text-2xl flex-shrink-0"
                      style={{ color: badge.color }}
                    >
                      {badge.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2">
                        <h5 className="font-medium text-base-color truncate">
                          {badge.name}
                        </h5>
                        {isEarned && (
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                            Obtenu
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-color mt-1 line-clamp-2">
                        {badge.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-primary">
                          {getCategoryIcon(badge.category)} {getCategoryName(badge.category)}
                        </span>
                        {isEarned && badge.earned_at && (
                          <span className="text-xs text-muted-color">
                            {new Date(badge.earned_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions pour les badges obtenus */}
                  {isOwnProfile && isEarned && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <button
                        onClick={() => handleFeatureBadge(badge.id, !isFeatured)}
                        className={`w-full py-1 px-3 rounded text-xs font-medium transition-colors ${
                          isFeatured
                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                            : 'bg-primary/20 text-primary hover:bg-primary/30'
                        }`}
                      >
                        {isFeatured ? 'Retirer des favoris' : 'Mettre en avant'}
                      </button>
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeSystem;



