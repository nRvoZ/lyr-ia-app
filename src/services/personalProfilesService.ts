// Service pour gérer les profils personnalisés (IA-Training) avec Supabase
import { supabase } from './supabaseClient';
import { PersonalProfile } from '../types';

/**
 * Récupère les 3 profils personnalisés d'un utilisateur
 */
export async function getUserProfiles(userId: string): Promise<{ profiles: PersonalProfile[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('personal_profiles')
      .select('*')
      .eq('user_id', userId)
      .order('profile_number', { ascending: true });

    if (error) {
      console.error('Error fetching personal profiles:', error);
      return { profiles: [], error: error.message };
    }

    // Transformer les données pour correspondre au format PersonalProfile
    const profiles: PersonalProfile[] = [
      { id: 1, name: '', styleDescription: '', exampleLyrics: '' },
      { id: 2, name: '', styleDescription: '', exampleLyrics: '' },
      { id: 3, name: '', styleDescription: '', exampleLyrics: '' },
    ];

    // Remplir avec les données de la base si elles existent
    data?.forEach((item: any) => {
      const profileNumber = item.profile_number;
      if (profileNumber >= 1 && profileNumber <= 3) {
        profiles[profileNumber - 1] = {
          id: profileNumber as 1 | 2 | 3,
          name: item.name || '',
          styleDescription: item.style_description || '',
          exampleLyrics: item.example_lyrics || '',
        };
      }
    });

    return { profiles, error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { profiles: [], error: message };
  }
}

/**
 * Sauvegarde ou met à jour un profil personnel
 */
export async function savePersonalProfile(
  userId: string,
  profile: PersonalProfile
): Promise<{ error: string | null }> {
  try {
    console.log('💾 Saving personal profile:', profile.id);

    const { error } = await supabase
      .from('personal_profiles')
      .upsert({
        user_id: userId,
        profile_number: profile.id,
        name: profile.name || null,
        style_description: profile.styleDescription || null,
        example_lyrics: profile.exampleLyrics || null,
      }, {
        onConflict: 'user_id,profile_number'
      });

    if (error) {
      console.error('Error saving personal profile:', error);
      return { error: error.message };
    }

    console.log('✅ Personal profile saved');
    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error in savePersonalProfile:', message);
    return { error: message };
  }
}

/**
 * Supprime un profil personnel (le remet à vide)
 */
export async function deletePersonalProfile(
  userId: string,
  profileId: 1 | 2 | 3
): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase
      .from('personal_profiles')
      .delete()
      .eq('user_id', userId)
      .eq('profile_number', profileId);

    if (error) {
      console.error('Error deleting personal profile:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message };
  }
}





