import React, { useContext, useEffect, useRef, useState, useMemo } from 'react';
import { UserContext } from '../../contexts/SupabaseUserContext';
import { Achievement, AchievementCategory, AchievementTier, RewardType } from '../../types';
import { DataContext } from '../../contexts/DataContext';
import GlassCard from '../common/GlassCard';

// --- ICONS ---
const GenerationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;
const ExplorationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line></svg>;
const CollectionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
const MasteryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z"></path><path d="M5 21h14"></path></svg>;
const PrestigeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.7 10.3a2.4 2.4 0 0 0 0 3.4l7.5 7.5c.9.9 2.5.9 3.4 0l7.5-7.5a2.4 2.4 0 0 0 0-3.4l-7.5-7.5a2.4 2.4 0 0 0-3.4 0Z"/></svg>;
const EasterEggIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.5 12.5c0-2.48 2.02-4.5 4.5-4.5h4c2.48 0 4.5 2.02 4.5 4.5v6H5.5v-6z" /><path d="M18 10a6 6 0 0 0-12 0" /><circle cx="9" cy="12" r=".5" fill="currentColor" /><circle cx="15" cy="12" r=".5" fill="currentColor" /><path d="M5.5 18.5l1.5-1.5 1.5 1.5 1.5-1.5 1.5 1.5 1.5-1.5 1.5 1.5" /></svg>;


const getCategoryIcon = (category: AchievementCategory) => {
    switch(category) {
        case AchievementCategory.Generation: return <GenerationIcon />;
        case AchievementCategory.Exploration: return <ExplorationIcon />;
        case AchievementCategory.Collection: return <CollectionIcon />;
        case AchievementCategory.Mastery: return <MasteryIcon />;
        case AchievementCategory.Prestige: return <PrestigeIcon />;
        case AchievementCategory.EasterEgg: return <EasterEggIcon />;
        default: return null;
    }
};

const tierColors = {
    [AchievementTier.Bronze]: 'border-yellow-700/50 bg-yellow-700/10 text-yellow-500',
    [AchievementTier.Silver]: 'border-slate-400/50 bg-slate-400/10 text-slate-300',
    [AchievementTier.Gold]: 'border-yellow-400/50 bg-yellow-400/10 text-yellow-300',
    [AchievementTier.Diamond]: 'border-cyan-400/50 bg-cyan-400/10 text-cyan-300',
};
const tierProgressColors = {
    [AchievementTier.Bronze]: 'bg-yellow-600',
    [AchievementTier.Silver]: 'bg-slate-400',
    [AchievementTier.Gold]: 'bg-yellow-400',
    [AchievementTier.Diamond]: 'bg-cyan-400',
};

// --- Component for a single achievement card ---
const AchievementCard: React.FC<{ achievement: Achievement; cardId: string }> = ({ achievement, cardId }) => {
    const { user, claimAchievementReward } = useContext(UserContext);
    const userAchievement = user.achievements[achievement.id] || { progress: 0 };
    const isUnlocked = !!userAchievement.unlockedAt;
    const isClaimed = !!userAchievement.isClaimed;
    const progress = Math.min(userAchievement.progress, achievement.target);

    const canClaim = isUnlocked && achievement.reward && !isClaimed;

    if (achievement.isSecret && !isUnlocked) {
        return (
            <div className="p-4 rounded-xl border border-dashed border-white/20 bg-black/10 flex items-center justify-center text-center text-muted-color">
                <div className="space-y-1">
                    <p className="text-3xl">?</p>
                    <p className="text-sm font-semibold">Succès Secret</p>
                    <p className="text-xs">Continuez à explorer pour le débloquer.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div 
            id={cardId} 
            className={`group p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${tierColors[achievement.tier]} ${isUnlocked ? 'opacity-100' : 'opacity-60'}`}
            onClick={() => openDetailModal(achievement)}
        >
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 text-3xl group-hover:animate-bounce group-hover:scale-110 transition-all duration-300">
                    {achievement.icon || getCategoryIcon(achievement.category)}
                </div>
                <div className="flex-grow">
                    <div className="flex justify-between items-center">
                        <h4 className="font-bold text-base-color group-hover:text-primary transition-colors duration-300">{achievement.name}</h4>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 group-hover:bg-primary/20 transition-colors duration-300">{achievement.tier}</span>
                    </div>
                    <p className="text-xs text-muted-color mt-1 group-hover:text-white/80 transition-colors duration-300">{achievement.description}</p>
                    
                    <div className="mt-3 space-y-2">
                        <div className="w-full bg-black/30 rounded-full h-2.5">
                            <div className={`h-2.5 rounded-full ${tierProgressColors[achievement.tier]}`} style={{ width: `${(progress / achievement.target) * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-right text-muted-color">{isUnlocked ? 'Terminé !' : `${progress} / ${achievement.target}`}</p>
                    </div>

                    {achievement.reward && (
                        <div className="mt-2 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-muted-color">Récompense :</p>
                                <p className="text-sm font-bold text-primary-light">{achievement.reward.description}</p>
                            </div>
                             {canClaim && (
                                <button
                                    onClick={() => claimAchievementReward(achievement.id)}
                                    className="px-4 py-1.5 text-xs font-bold bg-primary text-on-primary rounded-md hover:bg-primary-hover transition-colors"
                                >
                                    Récupérer
                                </button>
                            )}
                             {isClaimed && (
                                 <span className="text-xs font-semibold text-green-400">Récupérée</span>
                             )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


// --- Main Modal Component ---
interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  focusedAchievementId: string | null;
}

const AchievementsModal: React.FC<AchievementsModalProps> = ({ isOpen, onClose, focusedAchievementId }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<AchievementCategory | 'All'>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Completed' | 'InProgress'>('All');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'tier' | 'progress' | 'name'>('tier');
  const { user } = useContext(UserContext);
  const { allAchievements } = useContext(DataContext);

  // Calculer les statistiques en temps réel
  const stats = useMemo(() => {
    const unlockedCount = allAchievements.filter(ach => user.achievements[ach.id]?.unlockedAt).length;
    const diamondCount = allAchievements.filter(ach => ach.tier === AchievementTier.Diamond && user.achievements[ach.id]?.unlockedAt).length;
    const completionRate = Math.round((unlockedCount / allAchievements.length) * 100);
    return { unlockedCount, diamondCount, completionRate, total: allAchievements.length };
  }, [allAchievements, user.achievements]);

  // Fonction pour ouvrir la modal de détails
  const openDetailModal = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setSelectedAchievement(null);
    setIsDetailModalOpen(false);
  };

  // Logique de filtrage et tri
  const filteredAchievements = useMemo(() => {
    let filtered = allAchievements;

    // Filtre par catégorie
    if (activeCategory !== 'All') {
      filtered = filtered.filter(ach => ach.category === activeCategory);
    }

    // Filtre par statut
    if (filterStatus === 'Completed') {
      filtered = filtered.filter(ach => user.achievements[ach.id]?.unlockedAt);
    } else if (filterStatus === 'InProgress') {
      filtered = filtered.filter(ach => {
        const userAch = user.achievements[ach.id];
        return userAch && userAch.progress > 0 && !userAch.unlockedAt;
      });
    }

    // Recherche par nom ou description
    if (searchTerm) {
      filtered = filtered.filter(ach => 
        ach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ach.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'tier':
          const tierOrder = { [AchievementTier.Diamond]: 4, [AchievementTier.Gold]: 3, [AchievementTier.Silver]: 2, [AchievementTier.Bronze]: 1 };
          return (tierOrder[b.tier] || 0) - (tierOrder[a.tier] || 0);
        case 'progress':
          const aProgress = user.achievements[a.id]?.progress || 0;
          const bProgress = user.achievements[b.id]?.progress || 0;
          return bProgress - aProgress;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [allAchievements, activeCategory, filterStatus, searchTerm, sortBy, user.achievements]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  useEffect(() => {
    if (isOpen && focusedAchievementId) {
        const achievementToFocus = allAchievements.find(a => a.id === focusedAchievementId);
        if (achievementToFocus) {
            // Ensure the category is visible
            if (activeCategory !== 'All' && activeCategory !== achievementToFocus.category) {
                setActiveCategory(achievementToFocus.category);
            }
            // Ensure status filter doesn't hide it
            setFilterStatus('All');
        }

        // Use a timeout to allow the category filter to apply and the element to render
        setTimeout(() => {
            const element = document.getElementById(`achievement-card-${focusedAchievementId}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                element.classList.add('animate-highlight');
                // Remove the class after the animation is done
                setTimeout(() => {
                    element.classList.remove('animate-highlight');
                }, 1500);
            }
        }, 100); // Small delay for rendering
    }
  }, [isOpen, focusedAchievementId, allAchievements, activeCategory]);


  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };


  const hasUnlockedEasterEgg = allAchievements.some(ach => ach.category === AchievementCategory.EasterEgg && user.achievements[ach.id]?.unlockedAt);
  const categories = Object.values(AchievementCategory).filter(cat => cat !== AchievementCategory.EasterEgg);
  
  const FilterButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({label, isActive, onClick}) => (
      <button onClick={onClick} className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors ${isActive ? 'bg-primary text-on-primary' : 'bg-white/10 text-muted-color hover:bg-white/20'}`}>
          {label}
      </button>
  );

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 animate-fade-in p-4"
      onClick={handleOverlayClick}
    >
      <div ref={modalRef} className="w-full max-w-4xl">
        <GlassCard className="p-6 max-h-[90vh] flex flex-col">
            <div className="text-center mb-4 flex-shrink-0">
                <h2 className="text-3xl font-bold text-base-color">Salle des Trophées</h2>
                <p className="text-muted-color">Suivez vos exploits et récupérez vos récompenses.</p>
            </div>
            
            {/* Statistiques en temps réel */}
            <div className="grid grid-cols-3 gap-4 mb-6 flex-shrink-0">
                <div className="stat-card bg-gradient-to-r from-yellow-600/20 to-yellow-400/20 border border-yellow-500/30 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🏆</div>
                    <div className="text-lg font-bold text-yellow-300">{stats.unlockedCount}</div>
                    <div className="text-xs text-yellow-200">Débloqués</div>
                </div>
                <div className="stat-card bg-gradient-to-r from-cyan-600/20 to-cyan-400/20 border border-cyan-500/30 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">💎</div>
                    <div className="text-lg font-bold text-cyan-300">{stats.diamondCount}</div>
                    <div className="text-xs text-cyan-200">Diamants</div>
                </div>
                <div className="stat-card bg-gradient-to-r from-green-600/20 to-green-400/20 border border-green-500/30 rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="text-lg font-bold text-green-300">{stats.completionRate}%</div>
                    <div className="text-xs text-green-200">Progression</div>
                </div>
            </div>
            
            {/* Barre de recherche et tri */}
            <div className="mb-4 flex-shrink-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Rechercher un achievement..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-black/20 border border-white/20 rounded-lg text-base-color placeholder-muted-color focus:border-primary focus:outline-none rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'tier' | 'progress' | 'name')}
                    className="px-3 py-2 bg-black/20 border border-white/20 rounded-lg text-base-color focus:border-primary focus:outline-none"
                  >
                    <option value="tier">💎 Par Rareté</option>
                    <option value="progress">📈 Par Progression</option>
                    <option value="name">🔤 Par Nom</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 flex-shrink-0">
                <div className="flex flex-wrap gap-2">
                    <FilterButton label="Tout" isActive={activeCategory === 'All'} onClick={() => setActiveCategory('All')} />
                    {categories.map(cat => <FilterButton key={cat} label={cat} isActive={activeCategory === cat} onClick={() => setActiveCategory(cat)} />)}
                    {hasUnlockedEasterEgg && <FilterButton label={AchievementCategory.EasterEgg} isActive={activeCategory === AchievementCategory.EasterEgg} onClick={() => setActiveCategory(AchievementCategory.EasterEgg)} />}
                </div>
                 <div className="flex gap-2 p-1 bg-black/20 rounded-full">
                    <FilterButton label="Tous" isActive={filterStatus === 'All'} onClick={() => setFilterStatus('All')} />
                    <FilterButton label="Terminés" isActive={filterStatus === 'Completed'} onClick={() => setFilterStatus('Completed')} />
                    <FilterButton label="En cours" isActive={filterStatus === 'InProgress'} onClick={() => setFilterStatus('InProgress')} />
                </div>
            </div>

            <div className="flex-grow overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAchievements.map(ach => <AchievementCard key={ach.id} achievement={ach} cardId={`achievement-card-${ach.id}`} />)}
                </div>
                {filteredAchievements.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-base-color mb-2">Aucun achievement trouvé</h3>
                    <p className="text-muted-color">Essayez de modifier vos filtres ou votre recherche.</p>
                  </div>
                )}
            </div>

            <div className="mt-6 text-center flex-shrink-0">
                <button
                    onClick={onClose}
                    className="px-6 py-2 bg-primary hover:bg-primary-hover text-on-primary font-semibold rounded-lg shadow-md transition-all"
                >
                    Fermer
                </button>
            </div>
        </GlassCard>
      </div>
      
      {/* Modal de détails d'achievement */}
      {isDetailModalOpen && selectedAchievement && (
        <AchievementDetailModal 
          achievement={selectedAchievement}
          isOpen={isDetailModalOpen}
          onClose={closeDetailModal}
          user={user}
        />
      )}
    </div>
  );
};

// Composant Modal de Détails d'Achievement
interface AchievementDetailModalProps {
  achievement: Achievement;
  isOpen: boolean;
  onClose: () => void;
  user: UserState;
}

const AchievementDetailModal: React.FC<AchievementDetailModalProps> = ({ achievement, isOpen, onClose, user }) => {
  const userAchievement = user.achievements[achievement.id] || { progress: 0 };
  const isUnlocked = !!userAchievement.unlockedAt;
  const progress = Math.min(userAchievement.progress, achievement.target);
  const progressPercentage = (progress / achievement.target) * 100;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-60 p-4">
      <div className="w-full max-w-2xl">
        <GlassCard className="p-8">
          <div className="text-center mb-6">
            <div className="text-8xl mb-4 animate-bounce">
              {achievement.icon}
            </div>
            <h2 className="text-3xl font-bold text-base-color mb-2">{achievement.name}</h2>
            <p className="text-muted-color text-lg">{achievement.description}</p>
            <div className="mt-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${tierColors[achievement.tier]}`}>
                {achievement.tier}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Barre de progression animée */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-base-color">Progression</span>
                <span className="text-sm text-muted-color">{progress} / {achievement.target}</span>
              </div>
              <div className="w-full bg-black/30 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-4 rounded-full ${tierProgressColors[achievement.tier]} transition-all duration-1000 ease-out`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Récompense */}
            {achievement.reward && (
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-base-color mb-2">Récompense</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {achievement.reward.type === 'credits' ? '💰' : '🏷️'}
                  </span>
                  <div>
                    <p className="font-semibold text-base-color">
                      {achievement.reward.type === 'credits' 
                        ? `${achievement.reward.value} Crédits`
                        : `Titre : ${achievement.reward.value}`
                      }
                    </p>
                    <p className="text-sm text-muted-color">{achievement.reward.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Statut */}
            <div className="text-center">
              {isUnlocked ? (
                <div className="inline-flex items-center space-x-2 text-green-400">
                  <span className="text-2xl">✅</span>
                  <span className="font-semibold">Achievement Débloqué !</span>
                </div>
              ) : (
                <div className="inline-flex items-center space-x-2 text-yellow-400">
                  <span className="text-2xl">⏳</span>
                  <span className="font-semibold">En cours...</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-primary hover:bg-primary-hover text-on-primary font-semibold rounded-lg shadow-md transition-all"
            >
              Fermer
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AchievementsModal;
