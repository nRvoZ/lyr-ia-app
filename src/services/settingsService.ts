// Service pour gérer les paramètres utilisateur avec Supabase
import { supabase } from './supabaseClient';
import { Settings } from '../types';

/**
 * Récupère les paramètres utilisateur depuis Supabase
 */
export async function getUserSettings(userId: string): Promise<{ settings: Settings | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('settings')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user settings:', error);
      return { settings: null, error: error.message };
    }

    // Si pas de settings ou settings vide, retourner les defaults
    const settings = data?.settings || {
      amplifyPrompt: false,
      verifyBeforeCopy: true,
      autoGenerateTitle: false,
      autoGenerateAlbumArt: false,
    };

    return { settings, error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { settings: null, error: message };
  }
}

/**
 * Sauvegarde les paramètres utilisateur dans Supabase
 */
export async function saveUserSettings(
  userId: string,
  settings: Settings
): Promise<{ error: string | null }> {
  try {
    console.log('💾 Saving user settings to database...');

    const { error } = await supabase
      .from('user_profiles')
      .update({ settings })
      .eq('id', userId);

    if (error) {
      console.error('Error saving settings:', error);
      return { error: error.message };
    }

    console.log('✅ Settings saved successfully');
    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error in saveUserSettings:', message);
    return { error: message };
  }
}

/**
 * Sauvegarde le thème actif de l'utilisateur
 */
export async function saveActiveTheme(
  userId: string,
  theme: string
): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .update({ active_theme: theme })
      .eq('id', userId);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message };
  }
}

/**
 * Sauvegarde la couleur de police préférée
 */
export async function saveFontColor(
  userId: string,
  fontColor: string
): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .update({ font_color: fontColor })
      .eq('id', userId);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message };
  }
}

/**
 * Sauvegarde le background personnalisé
 */
export async function saveCustomBackground(
  userId: string,
  backgroundUrl: string
): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .update({ custom_background: backgroundUrl })
      .eq('id', userId);

    if (error) {
      return { error: error.message };
    }

    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message };
  }
}





