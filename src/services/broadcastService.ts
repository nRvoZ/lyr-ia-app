// Service pour gérer les messages de diffusion avec Supabase
import { supabase } from './supabaseClient';
import { BroadcastMessage } from '../types';

/**
 * Récupère le message de diffusion actif
 */
export async function getActiveBroadcastMessage(): Promise<{ message: BroadcastMessage | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('broadcast_messages')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      // Pas d'erreur si aucun message actif
      if (error.code === 'PGRST116') {
        return { message: null, error: null };
      }
      console.error('Error fetching broadcast message:', error);
      return { message: null, error: error.message };
    }

    if (data) {
      return {
        message: {
          id: data.id,
          message: data.message,
        },
        error: null
      };
    }

    return { message: null, error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { message: null, error: message };
  }
}

/**
 * Crée un nouveau message de diffusion (admin seulement)
 */
export async function createBroadcastMessage(
  message: string
): Promise<{ error: string | null }> {
  try {
    console.log('📢 Creating broadcast message...');

    // Désactiver tous les anciens messages
    await supabase
      .from('broadcast_messages')
      .update({ is_active: false })
      .eq('is_active', true);

    // Créer le nouveau message
    const { error } = await supabase
      .from('broadcast_messages')
      .insert({
        message,
        is_active: true,
      });

    if (error) {
      console.error('Error creating broadcast message:', error);
      return { error: error.message };
    }

    console.log('✅ Broadcast message created');
    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error in createBroadcastMessage:', message);
    return { error: message };
  }
}

/**
 * Désactive le message de diffusion actif (admin seulement)
 */
export async function clearBroadcastMessage(): Promise<{ error: string | null }> {
  try {
    console.log('🔇 Clearing broadcast message...');

    const { error } = await supabase
      .from('broadcast_messages')
      .update({ is_active: false })
      .eq('is_active', true);

    if (error) {
      console.error('Error clearing broadcast message:', error);
      return { error: error.message };
    }

    console.log('✅ Broadcast message cleared');
    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message };
  }
}

/**
 * Récupère tous les messages de diffusion (admin seulement)
 */
export async function getAllBroadcastMessages(): Promise<{ messages: any[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('broadcast_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching broadcast messages:', error);
      return { messages: [], error: error.message };
    }

    return { messages: data || [], error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { messages: [], error: message };
  }
}





