import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/SupabaseUserContext';
import * as communityService from '../services/communityService';
import type { CommunityPost, PostComment } from '../services/communityService';
import GlassCard from './common/GlassCard';
import Loader from './common/Loader';

interface PublicSongViewProps {
  songId: string;
  onClose: () => void;
  onViewProfile?: (username: string) => void;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
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
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const PublicSongView: React.FC<PublicSongViewProps> = ({ songId, onClose, onViewProfile }) => {
  const { user } = useContext(UserContext);
  const [post, setPost] = useState<CommunityPost | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    loadSong();
    loadComments();
  }, [songId]);

  const loadSong = async () => {
    setLoading(true);
    try {
      const { data, error } = await communityService.getPost(songId);
      if (error) throw error;
      if (data) {
        setPost(data);
        setIsLiked(data.is_liked || false);
        setLikesCount(data.likes_count);
      }
    } catch (error) {
      console.error('Error loading song:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      const { data } = await communityService.getPostComments(songId);
      setComments(data || []);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleLike = async () => {
    if (!user.isAuthenticated) return;

    if (isLiked) {
      await communityService.unlikePost(songId);
      setIsLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      await communityService.likePost(songId);
      setIsLiked(true);
      setLikesCount(prev => prev + 1);
    }
  };

  const handleComment = async () => {
    if (!user.isAuthenticated || !newComment.trim()) return;

    const { data, error } = await communityService.addComment(songId, newComment.trim());
    if (data && !error) {
      setComments(prev => [...prev, data]);
      setNewComment('');
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/song/${songId}`;
    navigator.clipboard.writeText(url);
    // TODO: Toast de confirmation
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Aujourd\'hui';
    if (days === 1) return 'Hier';
    if (days < 7) return `Il y a ${days} jours`;
    if (days < 30) return `Il y a ${Math.floor(days / 7)} semaines`;
    if (days < 365) return `Il y a ${Math.floor(days / 30)} mois`;
    return `Il y a ${Math.floor(days / 365)} ans`;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <GlassCard className="max-w-5xl w-full">
          <Loader />
        </GlassCard>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <GlassCard className="max-w-5xl w-full p-8 text-center">
          <p className="text-base-color text-xl mb-4">Chanson introuvable</p>
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

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        {/* Header avec bouton fermer */}
        <div className="max-w-5xl mx-auto mb-6 flex justify-end">
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

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Carte principale */}
            <GlassCard>
              <div className="p-6">
                {/* Header avec profil créateur */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-full overflow-hidden bg-black/20 flex items-center justify-center cursor-pointer"
                    onClick={() => onViewProfile && post.username && onViewProfile(post.username)}
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
                      onClick={() => onViewProfile && post.username && onViewProfile(post.username)}
                    >
                      @{post.username}
                    </p>
                    <p className="text-muted-color text-sm">{formatDate(post.created_at)}</p>
                  </div>
                </div>

                {/* Titre et description */}
                <h1 className="text-3xl font-bold text-base-color mb-2">{post.title}</h1>
                {post.description && (
                  <p className="text-muted-color mb-4">{post.description}</p>
                )}

                {/* Album Art */}
                {post.album_art_url && (
                  <img
                    src={post.album_art_url}
                    alt={post.title}
                    className="w-full rounded-lg mb-4 shadow-2xl"
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
                    onClick={handleLike}
                    disabled={!user.isAuthenticated}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isLiked
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : 'bg-white/10 text-base-color hover:bg-white/20'
                    } ${!user.isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <HeartIcon filled={isLiked} />
                    <span>{likesCount}</span>
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-base-color"
                  >
                    <ShareIcon />
                    Partager
                  </button>
                  
                  <div className="flex-grow"></div>
                  
                  <span className="text-muted-color text-sm">{post.views_count} vues</span>
                </div>
              </div>
            </GlassCard>

            {/* Paroles */}
            {post.lyrics && (
              <GlassCard>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-base-color mb-4">Paroles</h2>
                  <pre className="text-muted-color whitespace-pre-wrap font-sans leading-relaxed">
                    {post.lyrics}
                  </pre>
                </div>
              </GlassCard>
            )}

            {/* Style Prompt */}
            {post.style_prompt && (
              <GlassCard>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-base-color mb-4">Style Musical</h2>
                  <p className="text-muted-color">{post.style_prompt}</p>
                </div>
              </GlassCard>
            )}
          </div>

          {/* Colonne de droite (1/3) - Commentaires */}
          <div className="lg:col-span-1">
            <GlassCard className="sticky top-6">
              <div className="p-6">
                <h2 className="text-xl font-bold text-base-color mb-4">
                  Commentaires ({post.comments_count})
                </h2>

                {/* Formulaire de commentaire */}
                {user.isAuthenticated ? (
                  <div className="mb-6">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Ajouter un commentaire..."
                      className="w-full px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-base-color placeholder-muted-color focus:outline-none focus:border-primary resize-none"
                      rows={3}
                      maxLength={1000}
                    />
                    <button
                      onClick={handleComment}
                      disabled={!newComment.trim()}
                      className="mt-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-on-primary rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Commenter
                    </button>
                  </div>
                ) : (
                  <p className="text-muted-color text-sm mb-6 text-center p-4 bg-black/20 rounded-lg">
                    Connectez-vous pour commenter
                  </p>
                )}

                {/* Liste des commentaires */}
                <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                  {comments.length === 0 ? (
                    <p className="text-muted-color text-center py-8">Aucun commentaire pour le moment</p>
                  ) : (
                    comments.map(comment => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-black/20 flex items-center justify-center flex-shrink-0">
                          {comment.profile_picture_url ? (
                            <img src={comment.profile_picture_url} alt={comment.username} className="w-full h-full object-cover" />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className="text-base-color font-semibold text-sm">@{comment.username}</p>
                          <p className="text-muted-color text-sm mb-1">{comment.content}</p>
                          <p className="text-muted-color text-xs">{formatDate(comment.created_at)}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicSongView;




