import { supabase } from './supabaseClient';

export interface Playlist {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  is_public: boolean;
  is_featured: boolean;
  songs_count: number;
  likes_count: number;
  views_count: number;
  is_flagged: boolean;
  moderation_status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
  // Relations
  username?: string;
  profile_picture_url?: string;
  is_liked?: boolean;
}

export interface PlaylistSong {
  id: string;
  playlist_id: string;
  post_id: string;
  song_position: number;
  added_at: string;
  // Relations
  title?: string;
  description?: string;
  album_art_url?: string;
  likes_count?: number;
  comments_count?: number;
  username?: string;
  profile_picture_url?: string;
}

/**
 * Créer une nouvelle playlist
 */
export async function createPlaylist(
  name: string,
  description?: string,
  isPublic: boolean = true
): Promise<{ data: Playlist | null; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const playlistData = {
      user_id: user.id,
      name,
      description: description || null,
      is_public: isPublic,
    };

    const { data, error } = await supabase
      .from('playlists')
      .insert(playlistData)
      .select()
      .single();

    if (error) throw error;

    return { data: data as Playlist, error: null };
  } catch (error) {
    console.error('Error creating playlist:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Récupérer les playlists publiques
 */
export async function getPublicPlaylists(
  limit: number = 20,
  offset: number = 0,
  sortBy: 'recent' | 'popular' | 'trending' = 'recent'
): Promise<{ data: Playlist[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.rpc('get_public_playlists', {
      p_limit: limit,
      p_offset: offset,
      p_sort_by: sortBy,
    });

    if (error) throw error;

    return { data: data as Playlist[], error: null };
  } catch (error) {
    console.error('Error fetching public playlists:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Récupérer une playlist spécifique
 */
export async function getPlaylist(playlistId: string): Promise<{ data: Playlist | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('playlists')
      .select(`
        *,
        user_profiles!playlists_user_id_fkey (
          username,
          profile_picture_url
        )
      `)
      .eq('id', playlistId)
      .single();

    if (error) throw error;

    // Enregistrer une vue
    await recordPlaylistView(playlistId);

    // Restructurer les données
    const playlist = {
      ...data,
      username: data.user_profiles?.username,
      profile_picture_url: data.user_profiles?.profile_picture_url,
    };
    delete playlist.user_profiles;

    // Vérifier si l'utilisateur a liké
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: likeData } = await supabase
        .from('playlist_likes')
        .select('id')
        .eq('playlist_id', playlistId)
        .eq('user_id', user.id)
        .single();
      
      playlist.is_liked = !!likeData;
    }

    return { data: playlist as Playlist, error: null };
  } catch (error) {
    console.error('Error fetching playlist:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Récupérer les chansons d'une playlist
 */
export async function getPlaylistSongs(
  playlistId: string,
  limit: number = 50,
  offset: number = 0
): Promise<{ data: PlaylistSong[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.rpc('get_playlist_songs', {
      p_playlist_id: playlistId,
      p_limit: limit,
      p_offset: offset,
    });

    if (error) throw error;

    return { data: data as PlaylistSong[], error: null };
  } catch (error) {
    console.error('Error fetching playlist songs:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Ajouter une chanson à une playlist
 */
export async function addSongToPlaylist(
  playlistId: string,
  postId: string,
  songPosition?: number
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Vérifier que l'utilisateur possède la playlist
    const { data: playlist } = await supabase
      .from('playlists')
      .select('user_id')
      .eq('id', playlistId)
      .single();

    if (!playlist || playlist.user_id !== user.id) {
      throw new Error('You can only add songs to your own playlists');
    }

    // Si pas de position spécifiée, ajouter à la fin
    if (!songPosition) {
      const { data: lastSong } = await supabase
        .from('playlist_songs')
        .select('song_position')
        .eq('playlist_id', playlistId)
        .order('song_position', { ascending: false })
        .limit(1)
        .single();
      
      songPosition = (lastSong?.song_position || 0) + 1;
    }

    const { error } = await supabase
      .from('playlist_songs')
      .insert({
        playlist_id: playlistId,
        post_id: postId,
        song_position: songPosition,
      });

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Error adding song to playlist:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Retirer une chanson d'une playlist
 */
export async function removeSongFromPlaylist(
  playlistId: string,
  postId: string
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Vérifier que l'utilisateur possède la playlist
    const { data: playlist } = await supabase
      .from('playlists')
      .select('user_id')
      .eq('id', playlistId)
      .single();

    if (!playlist || playlist.user_id !== user.id) {
      throw new Error('You can only remove songs from your own playlists');
    }

    const { error } = await supabase
      .from('playlist_songs')
      .delete()
      .eq('playlist_id', playlistId)
      .eq('post_id', postId);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Error removing song from playlist:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Réorganiser les chansons d'une playlist
 */
export async function reorderPlaylistSongs(
  playlistId: string,
  songPositions: { postId: string; songPosition: number }[]
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Vérifier que l'utilisateur possède la playlist
    const { data: playlist } = await supabase
      .from('playlists')
      .select('user_id')
      .eq('id', playlistId)
      .single();

    if (!playlist || playlist.user_id !== user.id) {
      throw new Error('You can only reorder songs in your own playlists');
    }

    // Mettre à jour les positions
    for (const song of songPositions) {
      const { error } = await supabase
        .from('playlist_songs')
        .update({ song_position: song.songPosition })
        .eq('playlist_id', playlistId)
        .eq('post_id', song.postId);

      if (error) throw error;
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Error reordering playlist songs:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Liker une playlist
 */
export async function likePlaylist(playlistId: string): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('playlist_likes')
      .insert({ playlist_id: playlistId, user_id: user.id });

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Error liking playlist:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Unliker une playlist
 */
export async function unlikePlaylist(playlistId: string): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('playlist_likes')
      .delete()
      .eq('playlist_id', playlistId)
      .eq('user_id', user.id);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Error unliking playlist:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Mettre à jour une playlist
 */
export async function updatePlaylist(
  playlistId: string,
  updates: {
    name?: string;
    description?: string;
    is_public?: boolean;
  }
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('playlists')
      .update(updates)
      .eq('id', playlistId)
      .eq('user_id', user.id);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Error updating playlist:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Supprimer une playlist
 */
export async function deletePlaylist(playlistId: string): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('playlists')
      .delete()
      .eq('id', playlistId)
      .eq('user_id', user.id);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting playlist:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Récupérer les playlists d'un utilisateur
 */
export async function getUserPlaylists(
  userId: string,
  limit: number = 20,
  offset: number = 0
): Promise<{ data: Playlist[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('playlists')
      .select(`
        *,
        user_profiles!playlists_user_id_fkey (
          username,
          profile_picture_url
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    // Restructurer les données
    const playlists = data.map(playlist => ({
      ...playlist,
      username: playlist.user_profiles?.username,
      profile_picture_url: playlist.user_profiles?.profile_picture_url,
    }));

    return { data: playlists as Playlist[], error: null };
  } catch (error) {
    console.error('Error fetching user playlists:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Enregistrer une vue sur une playlist
 */
async function recordPlaylistView(playlistId: string): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const viewData: any = {
      playlist_id: playlistId,
    };

    if (user) {
      viewData.user_id = user.id;
    } else {
      // Pour les utilisateurs non connectés, on pourrait utiliser l'IP
      // mais pour l'instant on skip
      return;
    }

    await supabase
      .from('playlist_views')
      .insert(viewData)
      .select()
      .single();

    // On ignore les erreurs (duplicate key = déjà vu)
  } catch (error) {
    // Silent fail
  }
}
