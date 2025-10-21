import { supabase } from './supabaseClient';
import type { HistoryItem } from '../types';

// Export supabase for use in components
export { supabase };

export interface CommunityPost {
  id: string;
  user_id: string;
  history_id?: number;
  title: string;
  description?: string;
  lyrics?: string;
  style_prompt?: string;
  album_art_url?: string;
  mode?: string;
  language?: string;
  artist_name?: string;
  styles?: string[];
  likes_count: number;
  comments_count: number;
  shares_count: number;
  views_count: number;
  is_public: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  // Relations
  username?: string;
  profile_picture_url?: string;
  is_liked?: boolean;
}

export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  parent_comment_id?: string;
  content: string;
  created_at: string;
  updated_at: string;
  // Relations
  username?: string;
  profile_picture_url?: string;
}

export interface UserFollow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface PopularCreator {
  id: string;
  username: string;
  profile_picture_url?: string;
  posts_count: number;
  total_likes: number;
  total_comments: number;
  followers_count: number;
}

/**
 * Créer un post communautaire à partir d'une chanson de l'historique
 */
export async function createPostFromHistory(
  historyItem: HistoryItem,
  isPublic: boolean = true,
  description?: string
): Promise<{ data: CommunityPost | null; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const postData = {
      user_id: user.id,
      history_id: historyItem.id,
      title: historyItem.outputs.title || 'Sans titre',
      description: description || null,
      lyrics: historyItem.outputs.lyrics || null,
      style_prompt: historyItem.outputs.stylePrompt || null,
      album_art_url: historyItem.outputs.albumArt || null,
      mode: historyItem.inputs.mode || null,
      language: historyItem.language || null,
      artist_name: historyItem.inputs.artist?.name || null,
      styles: historyItem.inputs.styles || [],
      is_public: isPublic,
    };

    const { data, error } = await supabase
      .from('community_posts')
      .insert(postData)
      .select()
      .single();

    if (error) throw error;

    return { data: data as CommunityPost, error: null };
  } catch (error) {
    console.error('Error creating community post:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Créer un post communautaire personnalisé
 */
export async function createPost(
  title: string,
  description: string,
  lyrics?: string,
  albumArtUrl?: string,
  isPublic: boolean = true
): Promise<{ data: CommunityPost | null; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const postData = {
      user_id: user.id,
      title,
      description,
      lyrics: lyrics || null,
      album_art_url: albumArtUrl || null,
      is_public: isPublic,
    };

    const { data, error } = await supabase
      .from('community_posts')
      .insert(postData)
      .select()
      .single();

    if (error) throw error;

    return { data: data as CommunityPost, error: null };
  } catch (error) {
    console.error('Error creating post:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Récupérer le feed communautaire
 */
export async function getCommunityFeed(
  limit: number = 20,
  offset: number = 0,
  sortBy: 'recent' | 'popular' | 'trending' = 'recent'
): Promise<{ data: CommunityPost[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.rpc('get_community_feed', {
      p_limit: limit,
      p_offset: offset,
      p_sort_by: sortBy,
    });

    if (error) throw error;

    return { data: data as CommunityPost[], error: null };
  } catch (error) {
    console.error('Error fetching community feed:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Récupérer un post spécifique
 */
export async function getPost(postId: string): Promise<{ data: CommunityPost | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('community_posts')
      .select(`
        *,
        user_profiles!community_posts_user_id_fkey (
          username,
          profile_picture_url
        )
      `)
      .eq('id', postId)
      .single();

    if (error) throw error;

    // Enregistrer une vue
    await recordPostView(postId);

    // Restructurer les données
    const post = {
      ...data,
      username: data.user_profiles?.username,
      profile_picture_url: data.user_profiles?.profile_picture_url,
    };
    delete post.user_profiles;

    // Vérifier si l'utilisateur a liké
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: likeData } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();
      
      post.is_liked = !!likeData;
    }

    return { data: post as CommunityPost, error: null };
  } catch (error) {
    console.error('Error fetching post:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Récupérer les posts d'un utilisateur
 */
export async function getUserPosts(
  userId: string,
  limit: number = 20,
  offset: number = 0
): Promise<{ data: CommunityPost[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.rpc('get_user_posts', {
      p_user_id: userId,
      p_limit: limit,
      p_offset: offset,
    });

    if (error) throw error;

    return { data: data as CommunityPost[], error: null };
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Liker un post
 */
export async function likePost(postId: string): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('post_likes')
      .insert({ post_id: postId, user_id: user.id });

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Error liking post:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Unliker un post
 */
export async function unlikePost(postId: string): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', user.id);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Error unliking post:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Ajouter un commentaire
 */
export async function addComment(
  postId: string,
  content: string,
  parentCommentId?: string
): Promise<{ data: PostComment | null; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const commentData = {
      post_id: postId,
      user_id: user.id,
      content,
      parent_comment_id: parentCommentId || null,
    };

    const { data, error } = await supabase
      .from('post_comments')
      .insert(commentData)
      .select()
      .single();

    if (error) throw error;

    return { data: data as PostComment, error: null };
  } catch (error) {
    console.error('Error adding comment:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Récupérer les commentaires d'un post
 */
export async function getPostComments(
  postId: string,
  limit: number = 50,
  offset: number = 0
): Promise<{ data: PostComment[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('post_comments')
      .select(`
        *,
        user_profiles!post_comments_user_id_fkey (
          username,
          profile_picture_url
        )
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    // Restructurer les données
    const comments = data.map(comment => ({
      ...comment,
      username: comment.user_profiles?.username,
      profile_picture_url: comment.user_profiles?.profile_picture_url,
    }));

    return { data: comments as PostComment[], error: null };
  } catch (error) {
    console.error('Error fetching comments:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Suivre un utilisateur
 */
export async function followUser(userId: string): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');
    if (user.id === userId) throw new Error('Cannot follow yourself');

    const { error } = await supabase
      .from('user_follows')
      .insert({ follower_id: user.id, following_id: userId });

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Error following user:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Ne plus suivre un utilisateur
 */
export async function unfollowUser(userId: string): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('user_follows')
      .delete()
      .eq('follower_id', user.id)
      .eq('following_id', userId);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Vérifier si l'utilisateur suit un autre utilisateur
 */
export async function isFollowing(userId: string): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('user_follows')
      .select('id')
      .eq('follower_id', user.id)
      .eq('following_id', userId)
      .single();

    return !!data && !error;
  } catch (error) {
    return false;
  }
}

/**
 * Enregistrer une vue sur un post
 */
async function recordPostView(postId: string): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const viewData: any = {
      post_id: postId,
    };

    if (user) {
      viewData.user_id = user.id;
    } else {
      // Pour les utilisateurs non connectés, on pourrait utiliser l'IP
      // mais pour l'instant on skip
      return;
    }

    await supabase
      .from('post_views')
      .insert(viewData)
      .select()
      .single();

    // On ignore les erreurs (duplicate key = déjà vu)
  } catch (error) {
    // Silent fail
  }
}

/**
 * Récupérer les créateurs populaires
 */
export async function getPopularCreators(): Promise<{ data: PopularCreator[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('popular_creators')
      .select('*')
      .limit(20);

    if (error) throw error;

    return { data: data as PopularCreator[], error: null };
  } catch (error) {
    console.error('Error fetching popular creators:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Mettre à jour la confidentialité d'un post
 */
export async function updatePostPrivacy(
  postId: string,
  isPublic: boolean
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('community_posts')
      .update({ is_public: isPublic })
      .eq('id', postId)
      .eq('user_id', user.id);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Error updating post privacy:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Supprimer un post
 */
export async function deletePost(postId: string): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('community_posts')
      .delete()
      .eq('id', postId)
      .eq('user_id', user.id);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Récupérer les statistiques d'un profil utilisateur
 */
export async function getUserStats(userId: string): Promise<{
  posts_count: number;
  followers_count: number;
  following_count: number;
  total_likes: number;
}> {
  try {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('posts_count, followers_count, following_count')
      .eq('id', userId)
      .single();

    const { data: posts } = await supabase
      .from('community_posts')
      .select('likes_count')
      .eq('user_id', userId)
      .eq('is_public', true);

    const total_likes = posts?.reduce((sum, post) => sum + post.likes_count, 0) || 0;

    return {
      posts_count: profile?.posts_count || 0,
      followers_count: profile?.followers_count || 0,
      following_count: profile?.following_count || 0,
      total_likes,
    };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return {
      posts_count: 0,
      followers_count: 0,
      following_count: 0,
      total_likes: 0,
    };
  }
}

