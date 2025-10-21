import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/SupabaseUserContext';
import * as communityService from '../services/communityService';
import * as badgeService from '../services/badgeService';
import type { CommunityPost } from '../services/communityService';
import type { UserBadge } from '../services/badgeService';
import GlassCard from './common/GlassCard';
import Loader from './common/Loader';
import BadgeSystem from './community/BadgeSystem';

interface PublicProfileProps {
  username: string;
  onClose: () => void;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

const DefaultProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

const PublicProfile: React.FC<PublicProfileProps> = ({ username, onClose }) => {
  const { user } = useContext(UserContext);
  const [profileData, setProfileData] = useState<any>(null);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [stats, setStats] = useState({
    posts_count: 0,
    followers_count: 0,
    following_count: 0,
    total_likes: 0,
  });
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);
  const [featuredBadges, setFeaturedBadges] = useState<UserBadge[]>([]);
  const [showBadges, setShowBadges] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [username]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      // Récupérer le profil utilisateur
      const { data: profiles, error: profileError } = await communityService.supabase
        .from('user_profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (profileError) throw profileError;
      setProfileData(profiles);

      // Récupérer les posts
      const { data: postsData } = await communityService.getUserPosts(profiles.id);
      setPosts(postsData || []);

      // Récupérer les stats
      const userStats = await communityService.getUserStats(profiles.id);
      setStats(userStats);

      // Vérifier si on suit cet utilisateur
      if (user.isAuthenticated) {
        const following = await communityService.isFollowing(profiles.id);
        setIsFollowing(following);
      }

      // Récupérer les badges mis en avant
      const { data: badges } = await badgeService.getFeaturedBadges(profiles.id);
      setFeaturedBadges(badges || []);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!user.isAuthenticated || !profileData) return;

    if (isFollowing) {
      await communityService.unfollowUser(profileData.id);
      setIsFollowing(false);
      setStats(prev => ({ ...prev, followers_count: prev.followers_count - 1 }));
    } else {
      await communityService.followUser(profileData.id);
      setIsFollowing(true);
      setStats(prev => ({ ...prev, followers_count: prev.followers_count + 1 }));
    }
  };

  const handleShare = (post: CommunityPost) => {
    const url = `${window.location.origin}/song/${post.id}`;
    navigator.clipboard.writeText(url);
    // TODO: Afficher un toast de confirmation
  };

  const handleCopyProfileLink = () => {
    const url = `${window.location.origin}/profile/@${username}`;
    navigator.clipboard.writeText(url);
    // TODO: Afficher un toast de confirmation
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <GlassCard className="max-w-4xl w-full">
          <Loader />
        </GlassCard>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <GlassCard className="max-w-4xl w-full p-8 text-center">
          <p className="text-base-color text-xl mb-4">Profil introuvable</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-on-primary rounded-lg hover:opacity-90 transition-opacity"
          >
            Retour
          </button>
        </GlassCard>
      </div>
    );
  }

  const isOwnProfile = user.id === profileData.id;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        {/* Header avec bouton fermer */}
        <div className="max-w-6xl mx-auto mb-6 flex justify-end">
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Profil Header */}
        <GlassCard className="max-w-6xl mx-auto mb-6">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Photo de profil */}
              <div className="w-32 h-32 rounded-full overflow-hidden bg-black/20 ring-4 ring-primary/30 flex items-center justify-center flex-shrink-0">
                {profileData.profile_picture_url ? (
                  <img src={profileData.profile_picture_url} alt={profileData.username} className="w-full h-full object-cover" />
                ) : (
                  <DefaultProfileIcon />
                )}
              </div>

              {/* Infos du profil */}
              <div className="flex-grow text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-base-color mb-1">@{profileData.username}</h1>
                    {profileData.active_title && (
                      <p className="text-sm text-primary-light italic">{profileData.active_title}</p>
                    )}
                  </div>
                  
                  {!isOwnProfile && user.isAuthenticated && (
                    <button
                      onClick={handleFollow}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        isFollowing
                          ? 'bg-white/10 text-base-color hover:bg-white/20'
                          : 'bg-gradient-to-r from-primary to-secondary text-on-primary hover:opacity-90'
                      }`}
                    >
                      {isFollowing ? 'Abonné' : 'S\'abonner'}
                    </button>
                  )}
                  
                  <button
                    onClick={handleCopyProfileLink}
                    className="p-2 text-muted-color hover:text-base-color hover:bg-white/10 rounded-lg transition-all"
                    title="Copier le lien du profil"
                  >
                    <ShareIcon />
                  </button>
                </div>

                {/* Stats */}
                <div className="flex gap-6 justify-center sm:justify-start mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-base-color">{stats.posts_count}</div>
                    <div className="text-sm text-muted-color">Créations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-base-color">{stats.followers_count}</div>
                    <div className="text-sm text-muted-color">Abonnés</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-base-color">{stats.following_count}</div>
                    <div className="text-sm text-muted-color">Abonnements</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-light">{stats.total_likes}</div>
                    <div className="text-sm text-muted-color">Likes</div>
                  </div>
                </div>

                {/* Badges mis en avant */}
                {featuredBadges.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrophyIcon />
                      <span className="text-sm font-medium text-base-color">Badges mis en avant</span>
                      <button
                        onClick={() => setShowBadges(true)}
                        className="text-xs text-primary hover:text-primary-light transition-colors"
                      >
                        Voir tous
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {featuredBadges.slice(0, 5).map(badge => (
                        <div
                          key={badge.id}
                          className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm"
                          style={{ color: badge.color }}
                        >
                          <span>{badge.icon}</span>
                          <span className="text-base-color">{badge.name}</span>
                        </div>
                      ))}
                      {featuredBadges.length > 5 && (
                        <div className="flex items-center px-3 py-1 bg-white/10 rounded-full text-sm text-muted-color">
                          +{featuredBadges.length - 5} autres
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Grille de créations */}
        <GlassCard className="max-w-6xl mx-auto">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-base-color mb-6">Créations</h2>
            
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-color">Aucune création publique pour le moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map(post => (
                  <div
                    key={post.id}
                    className="group relative rounded-lg overflow-hidden bg-black/20 hover:bg-black/30 transition-all cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    {/* Image de couverture */}
                    <div className="aspect-square relative overflow-hidden">
                      {post.album_art_url ? (
                        <img
                          src={post.album_art_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30">
                            <path d="M9 18V5l12-2v13"></path>
                            <circle cx="6" cy="18" r="3"></circle>
                            <circle cx="18" cy="16" r="3"></circle>
                          </svg>
                        </div>
                      )}
                      
                      {/* Overlay avec stats */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                        <div className="flex items-center gap-4 text-white text-sm">
                          <span className="flex items-center gap-1">
                            <HeartIcon filled={false} />
                            {post.likes_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageIcon />
                            {post.comments_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <EyeIcon />
                            {post.views_count}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Titre */}
                    <div className="p-3">
                      <h3 className="text-base-color font-medium truncate">{post.title}</h3>
                      <p className="text-muted-color text-sm truncate">{post.description || 'Sans description'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      {/* Modal de détail de post (TODO: créer un composant séparé) */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <GlassCard className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-base-color">{selectedPost.title}</h2>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-2 text-muted-color hover:text-base-color hover:bg-white/10 rounded-lg transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              {selectedPost.album_art_url && (
                <img src={selectedPost.album_art_url} alt={selectedPost.title} className="w-full rounded-lg mb-4" />
              )}
              
              {selectedPost.description && (
                <p className="text-muted-color mb-4">{selectedPost.description}</p>
              )}
              
              {selectedPost.lyrics && (
                <div className="bg-black/20 rounded-lg p-4 mb-4">
                  <h3 className="text-base-color font-semibold mb-2">Paroles</h3>
                  <pre className="text-muted-color whitespace-pre-wrap font-sans">{selectedPost.lyrics}</pre>
                </div>
              )}
              
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => handleShare(selectedPost)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-base-color"
                >
                  <ShareIcon />
                  Partager
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Modal des badges */}
      {showBadges && profileData && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <GlassCard className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-base-color">
                  Badges de @{profileData.username}
                </h2>
                <button
                  onClick={() => setShowBadges(false)}
                  className="p-2 text-muted-color hover:text-base-color hover:bg-white/10 rounded-lg transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <BadgeSystem
                userId={profileData.id}
                isOwnProfile={isOwnProfile}
                onClose={() => setShowBadges(false)}
              />
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default PublicProfile;

