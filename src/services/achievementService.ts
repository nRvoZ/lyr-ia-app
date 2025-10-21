// Service pour gérer les achievements avec Supabase
import { supabase } from './supabaseClient';
import { UserAchievements } from '../types';

export interface UserStats {
  total_songs: number;
  total_album_arts: number;
  total_analyzer_uses: number;
  total_burst_gens: number;
  languages_count: number;
  modes_count: number;
  artists_count: number;
  styles_count: number;
  current_streak: number;
  achievements: UserAchievements;
}

/**
 * Récupère les statistiques utilisateur depuis Supabase
 */
export async function getUserStats(userId: string): Promise<UserStats | null> {
  try {
    const { data, error } = await supabase.rpc('get_user_stats', {
      p_user_id: userId
    });

    if (error) {
      console.error('Error fetching user stats:', error);
      return null;
    }

    return data?.[0] || null;
  } catch (error) {
    console.error('Error in getUserStats:', error);
    return null;
  }
}

/**
 * Met à jour un achievement dans la base de données
 */
export async function updateAchievement(
  userId: string,
  achievementId: string,
  progress: number,
  isUnlocked: boolean = false
): Promise<{ error: string | null }> {
  try {
    console.log(`🏆 Updating achievement ${achievementId}: progress=${progress}, unlocked=${isUnlocked}`);
    
    const { error } = await supabase.rpc('update_user_achievement', {
      p_user_id: userId,
      p_achievement_id: achievementId,
      p_progress: progress,
      p_is_unlocked: isUnlocked
    });

    if (error) {
      console.error('Error updating achievement:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error in updateAchievement:', message);
    return { error: message };
  }
}

/**
 * Marque un achievement comme réclamé
 */
export async function claimAchievement(
  userId: string,
  achievementId: string
): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.rpc('claim_achievement_reward', {
      p_user_id: userId,
      p_achievement_id: achievementId
    });

    if (error) {
      console.error('Error claiming achievement:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message };
  }
}

/**
 * Incrémente les statistiques après une génération
 */
export async function incrementGenerationStats(
  userId: string,
  mode: string,
  language: string,
  hasAlbumArt: boolean = false,
  isBurst: boolean = false,
  artists: string[] = [],
  styles: string[] = []
): Promise<{ error: string | null }> {
  try {
    console.log('📊 Incrementing generation stats:', { mode, language, hasAlbumArt, isBurst });
    
    const { error } = await supabase.rpc('increment_generation_stats', {
      p_user_id: userId,
      p_mode: mode,
      p_language: language,
      p_has_album_art: hasAlbumArt,
      p_is_burst: isBurst,
      p_artists: artists,
      p_styles: styles
    });

    if (error) {
      console.error('Error incrementing stats:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message };
  }
}

/**
 * Incrémente le compteur d'utilisation de l'analyseur
 */
export async function incrementAnalyzerStats(userId: string): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.rpc('increment_analyzer_stats', {
      p_user_id: userId
    });

    if (error) {
      console.error('Error incrementing analyzer stats:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message };
  }
}





