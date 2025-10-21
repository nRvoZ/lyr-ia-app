// Service pour gérer l'historique des chansons avec Supabase
import { supabase } from './supabaseClient';
import { HistoryItem } from '../types';

/**
 * Sauvegarde une chanson générée dans l'historique
 */
export async function saveSongToHistory(
  userId: string,
  historyItem: Omit<HistoryItem, 'id' | 'timestamp'>
): Promise<{ id: string | null; error: string | null }> {
  try {
    console.log('💾 Saving song to history...');
    
    const { data, error } = await supabase
      .from('song_history')
      .insert({
        user_id: userId,
        mode: historyItem.mode,
        language: historyItem.language,
        inputs: historyItem.inputs,
        outputs: historyItem.outputs,
        burst_outputs: historyItem.burstOutputs || null,
        album_art: historyItem.albumArt || null,
        verification_result: historyItem.verificationResult || null,
        is_copied: historyItem.isCopied || false,
        credits_used: historyItem.creditsUsed || 0,
        generation_time_ms: historyItem.generationTimeMs || null,
        is_favorite: false,
        tags: []
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error saving to history:', error);
      return { id: null, error: error.message };
    }

    console.log('✅ Song saved to history:', data.id);
    return { id: data.id, error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error in saveSongToHistory:', message);
    return { id: null, error: message };
  }
}

/**
 * Récupère l'historique complet d'un utilisateur
 */
export async function getUserHistory(
  userId: string,
  limit: number = 50
): Promise<{ history: HistoryItem[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('song_history')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching history:', error);
      return { history: [], error: error.message };
    }

    // Transformer les données pour correspondre au format HistoryItem
    // Note: item.id est un UUID string depuis Supabase, on le convertit en hash pour avoir un number
    const history: HistoryItem[] = (data || []).map((item: any) => {
      // Convertir l'UUID en nombre simple en utilisant un hash
      const hashCode = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash; // Convertir en entier 32 bits
        }
        return Math.abs(hash);
      };
      
      return {
        id: typeof item.id === 'string' ? hashCode(item.id) : item.id,
        mode: item.mode,
        language: item.language,
        inputs: item.inputs,
        outputs: item.outputs,
        burstOutputs: item.burst_outputs,
        albumArt: item.album_art,
        verificationResult: item.verification_result,
        isCopied: item.is_copied,
        isFavorite: item.is_favorite,
        creditsUsed: item.credits_used,
        generationTimeMs: item.generation_time_ms,
        timestamp: item.created_at // ISO string
      };
    });

    return { history, error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { history: [], error: message };
  }
}

/**
 * Marque une chanson comme copiée
 */
export async function markSongAsCopied(
  userId: string,
  songId: string
): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase
      .from('song_history')
      .update({ is_copied: true })
      .eq('id', songId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error marking song as copied:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message };
  }
}

/**
 * Marque une chanson comme favorite
 */
export async function toggleSongFavorite(
  userId: string,
  songId: string,
  isFavorite: boolean
): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase
      .from('song_history')
      .update({ is_favorite: isFavorite })
      .eq('id', songId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error toggling favorite:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message };
  }
}

/**
 * Supprime une chanson de l'historique
 */
export async function deleteSongFromHistory(
  userId: string,
  songId: string
): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase
      .from('song_history')
      .delete()
      .eq('id', songId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting song:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message };
  }
}

