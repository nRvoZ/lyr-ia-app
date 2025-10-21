import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/SupabaseUserContext';
import * as communityService from '../services/communityService';
import * as playlistService from '../services/playlistService';
import type { CommunityPost, PopularCreator } from '../services/communityService';
import type { Playlist } from '../services/playlistService';
import GlassCard from './common/GlassCard';
import Loader from './common/Loader';
import PublicProfile from './PublicProfile';
import PublicSongView from './PublicSongView';
import PlaylistManager from './community/PlaylistManager';

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

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

const FireIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

const PlaylistIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 12h18M3 6h18M3 18h18"/>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const DefaultProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

type SortMode = 'recent' | 'popular' | 'trending';
type ViewMode = 'posts' | 'playlists';

const CommunityHub: React.FC = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [popularCreators, setPopularCreators] = useState<PopularCreator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>('recent');
  const [viewMode, setViewMode] = useState<ViewMode>('posts');
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [showPlaylistManager, setShowPlaylistManager] = useState(false);

  useEffect(() => {
    if (viewMode === 'posts') {
      loadFeed();
    } else {
      loadPlaylists();
    }
    loadPopularCreators();
  }, [sortMode, viewMode]);

  const loadFeed = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔍 Loading feed for user:', user.isAuthenticated ? user.id : 'NOT AUTHENTICATED');
      const { data, error: err } = await communityService.getCommunityFeed(20, 0, sortMode);
      if (err) throw err;
      console.log('📊 Feed data loaded:', data?.length || 0, 'posts');
      setPosts(data || []);
    } catch (err) {
      console.error('Error loading feed:', err);
      setError('Les fonctionnalités communautaires ne sont pas encore disponibles. Veuillez exécuter les migrations SQL dans Supabase.');
    } finally {
      setLoading(false);
    }
  };

  const loadPlaylists = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await playlistService.getPublicPlaylists(20, 0, sortMode);
      if (err) throw err;
      setPlaylists(data || []);
    } catch (err) {
      console.error('Error loading playlists:', err);
      setError('Les fonctionnalités de playlists ne sont pas encore disponibles. Veuillez exécuter les migrations SQL dans Supabase.');
    } finally {
      setLoading(false);
    }
  };

  const loadPopularCreators = async () => {
    try {
      const { data, error: err } = await communityService.getPopularCreators();
      if (err) throw err;
      setPopularCreators(data || []);
    } catch (err) {
      console.error('Error loading popular creators:', err);
    }
  };

  const handleLike = async (postId: string, currentlyLiked: boolean) => {
    if (!user.isAuthenticated) return;

    if (currentlyLiked) {
      await communityService.unlikePost(postId);
    } else {
      await communityService.likePost(postId);
    }

    // Mettre à jour localement
    setPosts(prev => prev.map(post => 
      post.id === postId
        ? { ...post, is_liked: !currentlyLiked, likes_count: post.likes_count + (currentlyLiked ? -1 : 1) }
        : post
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Aujourd\'hui';
    if (days === 1) return 'Hier';
    if (days < 7) return `Il y a ${days} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Colonne principale (3/4) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header avec filtres */}
          <GlassCard>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-base-color">🌍 Hub Communautaire</h1>
                {user.isAuthenticated && (
                  <button
                    onClick={() => setShowPlaylistManager(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-on-primary rounded-lg font-medium hover:from-secondary hover:to-primary transition-all"
                  >
                    <PlusIcon />
                    Créer une playlist
                  </button>
                )}
              </div>
              
              {/* Mode de vue */}
              <div className="flex space-x-1 bg-white/10 rounded-lg p-1 mb-4">
                <button
                  onClick={() => setViewMode('posts')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'posts'
                      ? 'bg-primary text-on-primary'
                      : 'text-muted-color hover:text-base-color'
                  }`}
                >
                  🎵 Créations
                </button>
                <button
                  onClick={() => setViewMode('playlists')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'playlists'
                      ? 'bg-primary text-on-primary'
                      : 'text-muted-color hover:text-base-color'
                  }`}
                >
                  <PlaylistIcon className="inline w-4 h-4 mr-1" />
                  Playlists
                </button>
              </div>

              {/* Filtres de tri */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSortMode('recent')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    sortMode === 'recent'
                      ? 'bg-gradient-to-r from-primary to-secondary text-on-primary'
                      : 'bg-white/10 text-base-color hover:bg-white/20'
                  }`}
                >
                  🕐 Récent
                </button>
                <button
                  onClick={() => setSortMode('popular')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    sortMode === 'popular'
                      ? 'bg-gradient-to-r from-primary to-secondary text-on-primary'
                      : 'bg-white/10 text-base-color hover:bg-white/20'
                  }`}
                >
                  <HeartIcon filled={false} />
                  Populaire
                </button>
                <button
                  onClick={() => setSortMode('trending')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    sortMode === 'trending'
                      ? 'bg-gradient-to-r from-primary to-secondary text-on-primary'
                      : 'bg-white/10 text-base-color hover:bg-white/20'
                  }`}
                >
                  <FireIcon />
                  Tendances
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Feed des posts/playlists */}
          {error ? (
            <GlassCard className="p-12 text-center">
              <div className="text-red-400 mb-4">⚠️ Erreur</div>
              <p className="text-base-color mb-4">{error}</p>
              <div className="text-sm text-muted-color">
                <p className="mb-2">Pour activer le hub communautaire, exécutez ces migrations dans Supabase :</p>
                <ul className="list-disc list-inside text-left max-w-md mx-auto">
                  <li><code className="bg-white/10 px-2 py-1 rounded">006_community_hub.sql</code></li>
                  <li><code className="bg-white/10 px-2 py-1 rounded">007_playlists_and_badges.sql</code></li>
                </ul>
              </div>
            </GlassCard>
          ) : loading ? (
            <GlassCard className="p-12">
              <Loader />
            </GlassCard>
          ) : viewMode === 'posts' ? (
            // Vue des posts
            posts.length === 0 ? (
              <GlassCard className="p-12 text-center">
                <p className="text-muted-color">Aucune création pour le moment. Soyez le premier à partager ! 🎵</p>
              </GlassCard>
            ) : (
              <div className="space-y-6">
                {posts.map(post => (
                <GlassCard key={post.id} className="hover:border-primary/30 transition-all cursor-pointer" onClick={() => setSelectedSong(post.id)}>
                  <div className="p-6">
                    {/* Header avec profil */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-full overflow-hidden bg-black/20 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProfile(post.username || '');
                        }}
                      >
                        {post.profile_picture_url ? (
                          <img src={post.profile_picture_url} alt={post.username} className="w-full h-full object-cover" />
                        ) : (
                          <DefaultProfileIcon />
                        )}
                      </div>
                      <div className="flex-grow">
                        <p
                          className="text-base-color font-semibold cursor-pointer hover:text-primary-light transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProfile(post.username || '');
                          }}
                        >
                          @{post.username}
                        </p>
                        <p className="text-muted-color text-sm">{formatDate(post.created_at)}</p>
                      </div>
                    </div>

                    {/* Contenu */}
                    <h2 className="text-2xl font-bold text-base-color mb-2">{post.title}</h2>
                    {post.description && (
                      <p className="text-muted-color mb-4">{post.description}</p>
                    )}

                    {/* Album Art */}
                    {post.album_art_url && (
                      <img
                        src={post.album_art_url}
                        alt={post.title}
                        className="w-full rounded-lg mb-4 max-h-96 object-cover"
                      />
                    )}

                    {/* Métadonnées */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.mode && (
                        <span className="px-3 py-1 bg-primary/20 text-primary-light rounded-full text-sm">
                          {post.mode}
                        </span>
                      )}
                      {post.language && (
                        <span className="px-3 py-1 bg-secondary/20 text-secondary-light rounded-full text-sm">
                          {post.language}
                        </span>
                      )}
                      {post.artist_name && (
                        <span className="px-3 py-1 bg-white/10 text-base-color rounded-full text-sm">
                          🎤 {post.artist_name}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(post.id, post.is_liked || false);
                        }}
                        disabled={!user.isAuthenticated}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                          post.is_liked
                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                            : 'bg-white/10 text-base-color hover:bg-white/20'
                        } ${!user.isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <HeartIcon filled={post.is_liked || false} />
                        <span>{post.likes_count}</span>
                      </button>

                      <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-base-color">
                        <MessageIcon />
                        <span>{post.comments_count}</span>
                      </button>

                      <div className="flex-grow"></div>

                      <span className="text-muted-color text-sm flex items-center gap-1">
                        <EyeIcon />
                        {post.views_count}
                      </span>
                    </div>
                  </div>
                </GlassCard>
                ))}
              </div>
            )
          ) : (
            // Vue des playlists
            playlists.length === 0 ? (
              <GlassCard className="p-12 text-center">
                <p className="text-muted-color">Aucune playlist pour le moment. Créez la première ! 🎶</p>
              </GlassCard>
            ) : (
              <div className="space-y-6">
                {playlists.map(playlist => (
                  <GlassCard key={playlist.id} className="hover:border-primary/30 transition-all cursor-pointer">
                    <div className="p-6">
                      {/* Header avec profil */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-black/20 flex items-center justify-center">
                          {playlist.profile_picture_url ? (
                            <img src={playlist.profile_picture_url} alt={playlist.username} className="w-full h-full object-cover" />
                          ) : (
                            <DefaultProfileIcon />
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className="text-base-color font-semibold">@{playlist.username}</p>
                          <p className="text-muted-color text-sm">{formatDate(playlist.created_at)}</p>
                        </div>
                      </div>

                      {/* Contenu de la playlist */}
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <PlaylistIcon />
                        </div>
                        <div className="flex-grow">
                          <h2 className="text-2xl font-bold text-base-color mb-2">{playlist.name}</h2>
                          {playlist.description && (
                            <p className="text-muted-color mb-4">{playlist.description}</p>
                          )}
                          
                          {/* Stats de la playlist */}
                          <div className="flex items-center gap-4 text-sm text-muted-color">
                            <span className="flex items-center gap-1">
                              <PlaylistIcon className="w-4 h-4" />
                              {playlist.songs_count} chansons
                            </span>
                            <span className="flex items-center gap-1">
                              <HeartIcon filled={false} />
                              {playlist.likes_count} likes
                            </span>
                            <span className="flex items-center gap-1">
                              <EyeIcon />
                              {playlist.views_count} vues
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Implémenter le like de playlist
                          }}
                          disabled={!user.isAuthenticated}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                            playlist.is_liked
                              ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                              : 'bg-white/10 text-base-color hover:bg-white/20'
                          } ${!user.isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <HeartIcon filled={playlist.is_liked || false} />
                          <span>{playlist.likes_count}</span>
                        </button>

                        <div className="flex-grow"></div>

                        <span className="text-muted-color text-sm flex items-center gap-1">
                          <EyeIcon />
                          {playlist.views_count}
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )
          )}
        </div>

        {/* Sidebar (1/4) - Créateurs populaires */}
        <div className="lg:col-span-1">
          <GlassCard className="sticky top-6">
            <div className="p-6">
              <h2 className="text-xl font-bold text-base-color mb-4 flex items-center gap-2">
                <TrophyIcon />
                Top Créateurs
              </h2>
              <div className="space-y-3">
                {popularCreators.slice(0, 10).map((creator, index) => (
                  <div
                    key={creator.id}
                    className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-all cursor-pointer"
                    onClick={() => setSelectedProfile(creator.username)}
                  >
                    <div className="text-primary-light font-bold text-lg w-6">{index + 1}</div>
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-black/20 flex items-center justify-center flex-shrink-0">
                      {creator.profile_picture_url ? (
                        <img src={creator.profile_picture_url} alt={creator.username} className="w-full h-full object-cover" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-base-color font-semibold text-sm truncate">@{creator.username}</p>
                      <p className="text-muted-color text-xs">{creator.total_likes} ❤️</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Modals */}
      {selectedProfile && (
        <PublicProfile
          username={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}

      {selectedSong && (
        <PublicSongView
          songId={selectedSong}
          onClose={() => setSelectedSong(null)}
          onViewProfile={(username) => {
            setSelectedSong(null);
            setSelectedProfile(username);
          }}
        />
      )}

      {showPlaylistManager && (
        <PlaylistManager
          onClose={() => setShowPlaylistManager(false)}
          onPlaylistCreated={(playlist) => {
            setShowPlaylistManager(false);
            // Recharger les playlists
            if (viewMode === 'playlists') {
              loadPlaylists();
            }
          }}
        />
      )}
    </>
  );
};

export default CommunityHub;

