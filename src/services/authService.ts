import { supabase } from './supabaseClient';
import { UserState, SubscriptionPlan } from '../types';
import type { User } from '@supabase/supabase-js';
import { PlanService } from './planService';

export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  /**
   * Plan d'abonnement de l'utilisateur (doit correspondre à la colonne 'plan' dans Supabase, type TEXT)
   */
  plan: SubscriptionPlan | string;
  credits: number | 'unlimited';
  isAdmin?: boolean;
  isBanned?: boolean;
  profilePictureUrl?: string;
  achievements: Record<string, unknown>;
  unlockedTitles?: string[];
  activeTitle?: string;
}

// Inscription
export async function signUp(email: string, password: string, username: string) {
  try {
    // Vérifier si le username est disponible
    const { data: existingUser } = await supabase
      .from('user_profiles')
      .select('username')
      .eq('username', username)
      .single();

    if (existingUser) {
      throw new Error('Ce nom d\'utilisateur est déjà pris');
    }

    // Créer le compte Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username
        }
      }
    });

    if (authError) throw authError;

    // Créer le profil utilisateur manuellement si le trigger ne fonctionne pas
    if (authData.user) {
      try {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: authData.user.id,
            email: email,
            username: username,
            plan: 'Free',
            credits: 150,
            is_admin: false,
            is_banned: false,
            achievements: {}
          });

        if (profileError) {
          console.log('Profile creation error (might be normal if trigger works):', profileError);
        }
      } catch (error) {
        console.log('Profile creation failed, trigger might have handled it:', error);
      }
    }

    return { user: authData.user, error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { user: null, error: message };
  }
}

// Connexion
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return { user: data.user, error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { user: null, error: message };
  }
}

// Déconnexion
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Récupérer le profil utilisateur complet
export async function getUserProfile(userId: string): Promise<AuthUser | null> {
  try {
    console.log('🔍 Fetching profile for user ID:', userId);
    console.log('📡 Starting Supabase query...');

    // Requête avec timeout de 20 secondes
    const startTime = Date.now();
    
    const queryPromise = supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    const timeoutPromise = new Promise<{ data: null; error: any }>((resolve) =>
      setTimeout(() => {
        console.error('❌ Profile query TIMEOUT after 10s');
        resolve({ data: null, error: { message: 'Query timeout after 10 seconds' } });
      }, 10000)
    );
    
    console.log('⏳ Waiting for Supabase response...');
    console.log('🔍 Query details:', {
      userId,
      table: 'user_profiles',
      timestamp: new Date().toISOString()
    });
    
    const { data, error } = await Promise.race([queryPromise, timeoutPromise]);
    
    const queryTime = Date.now() - startTime;
    console.log(`⏱️ Query completed in ${queryTime}ms`);

    console.log('📊 Profile query result:', { data, error });

    if (error) {
      console.log('⚠️ Profile not found in database, creating default profile');
      // Retourner un profil par défaut si pas trouvé
      return {
        id: userId,
        email: 'user@example.com',
        username: 'Utilisateur',
        plan: 'Free' as SubscriptionPlan,
        credits: 150,
        isAdmin: false,
        isBanned: false,
        profilePictureUrl: undefined,
        achievements: {},
        unlockedTitles: [],
        activeTitle: undefined
      };
    }

    const profile = {
      id: data.id,
      email: data.email,
      username: data.username,
      plan: data.plan as SubscriptionPlan,
      credits: data.credits === -1 ? 'unlimited' : data.credits,
      isAdmin: data.is_admin,
      isBanned: data.is_banned,
      profilePictureUrl: data.profile_picture_url,
      achievements: data.achievements || {},
      unlockedTitles: data.unlocked_titles || [],
      activeTitle: data.active_title
    };

    console.log('✅ Profile successfully loaded:', profile);
    return profile;
  } catch (error: unknown) {
    console.error('❌ Erreur lors de la récupération du profil:', error);
    return null;
  }
}

// Upload profile picture to Supabase Storage
export async function uploadProfilePicture(userId: string, file: File): Promise<{ url: string | null; error: string | null }> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `profile-pictures/${fileName}`;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return { url: publicUrl, error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { url: null, error: message };
  }
}

// Mettre à jour le profil utilisateur
export async function updateUserProfile(userId: string, updates: Partial<AuthUser>) {
  try {
    const dbUpdates: Record<string, unknown> = {};
    
    if (updates.username !== undefined) dbUpdates.username = updates.username;
    if (updates.plan !== undefined) dbUpdates.plan = updates.plan;
    if (updates.credits !== undefined) {
      dbUpdates.credits = updates.credits === 'unlimited' ? -1 : updates.credits;
    }
    if (updates.achievements !== undefined) dbUpdates.achievements = updates.achievements;
    if (updates.unlockedTitles !== undefined) dbUpdates.unlocked_titles = updates.unlockedTitles;
    if (updates.activeTitle !== undefined) dbUpdates.active_title = updates.activeTitle;
    if (updates.profilePictureUrl !== undefined) dbUpdates.profile_picture_url = updates.profilePictureUrl;

    const { error } = await supabase
      .from('user_profiles')
      .update(dbUpdates)
      .eq('id', userId);

    if (error) throw error;
    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message };
  }
}

// Ajouter des crédits
export async function addCredits(userId: string, amount: number) {
  try {
    const { error } = await supabase.rpc('add_user_credits', {
      user_id: userId,
      credits_to_add: amount
    });

    if (error) throw error;
    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message };
  }
}

// Déduire des crédits
export async function deductCredits(userId: string, amount: number) {
  try {
    console.log('🔄 AuthService: Deducting credits:', { userId, amount });

    // Récupérer le profil actuel
    const currentProfile = await getUserProfile(userId);
    if (!currentProfile) {
      throw new Error('Profil utilisateur non trouvé');
    }

    console.log('📊 Current profile credits:', currentProfile.credits);

    // Vérifier si l'utilisateur a des crédits illimités
    if (currentProfile.credits === 'unlimited') {
      console.log('✅ User has unlimited credits, no deduction needed');
      return { error: null };
    }

    // Vérifier si l'utilisateur a assez de crédits
    if (typeof currentProfile.credits === 'number' && currentProfile.credits < amount) {
      throw new Error(`Crédits insuffisants: ${currentProfile.credits} < ${amount}`);
    }

    // Calculer les nouveaux crédits
    const newCredits = typeof currentProfile.credits === 'number' ? currentProfile.credits - amount : currentProfile.credits;
    console.log('📊 New credits will be:', newCredits);

    // Mettre à jour directement dans la base de données
    const { error } = await supabase
      .from('user_profiles')
      .update({ credits: newCredits })
      .eq('id', userId);

    if (error) {
      console.log('❌ AuthService: Database update error:', error);
      throw error;
    }

    console.log('✅ AuthService: Credits deducted successfully');
    return { error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.log('❌ AuthService: Exception:', message);
    return { error: message };
  }
}

// Changer le plan d'un utilisateur avec transition automatique des crédits
export async function changePlan(userId: string, newPlan: SubscriptionPlan) {
  try {
    console.log('🔄 Changing plan for user:', userId, 'to:', newPlan);

    // Récupérer le profil actuel
    const currentProfile = await getUserProfile(userId);
    if (!currentProfile) {
      throw new Error('Profil utilisateur non trouvé');
    }

    // Calculer la transition
    // Cast explicite pour garantir le typage SubscriptionPlan
    const transition = PlanService.calculatePlanTransition(
      currentProfile.plan as SubscriptionPlan,
      newPlan,
      currentProfile.credits,
      currentProfile.isAdmin
    );

    console.log('📊 Plan transition calculated:', transition);

    // Préparer les mises à jour
    const updates: any = {
      plan: newPlan,
      credits: transition.newCredits === 'unlimited' ? -1 : transition.newCredits
    };

    // Gestion spéciale pour Lyr-IA Society et admins
    if (newPlan === SubscriptionPlan.SecretSociety) {
      // Lyr-IA Society obtient automatiquement l'accès admin
      updates.is_admin = true;
    } else if (currentProfile.plan === SubscriptionPlan.SecretSociety && !transition.shouldPreserveAdminAccess) {
      // Si on quitte Lyr-IA Society et qu'on n'était pas admin avant, on perd l'accès
      // Note: On garde l'accès admin si l'utilisateur était déjà admin avant Lyr-IA Society
      updates.is_admin = currentProfile.isAdmin;
    }

    // Mettre à jour en base
    const { error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId);

    if (error) throw error;

    console.log('✅ Plan changed successfully:', updates);
    return { error: null, transition };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('❌ Error changing plan:', message);
    return { error: message, transition: null };
  }
}

// Promouvoir un utilisateur au plan Lyr-IA Society (admin uniquement)
export async function promoteToLyrIASociety(userId: string, adminUserId: string) {
  try {
    // Vérifier que l'admin a les droits
    const adminProfile = await getUserProfile(adminUserId);
    if (!adminProfile || (!adminProfile.isAdmin && adminProfile.plan !== SubscriptionPlan.SecretSociety)) {
      throw new Error('Droits insuffisants pour cette action');
    }

    return await changePlan(userId, SubscriptionPlan.SecretSociety);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message, transition: null };
  }
}

// Rétrograder un utilisateur depuis Lyr-IA Society
export async function demoteFromLyrIASociety(userId: string, newPlan: SubscriptionPlan, adminUserId: string) {
  try {
    // Vérifier que l'admin a les droits
    const adminProfile = await getUserProfile(adminUserId);
    if (!adminProfile || (!adminProfile.isAdmin && adminProfile.plan !== SubscriptionPlan.SecretSociety)) {
      throw new Error('Droits insuffisants pour cette action');
    }

    // Vérifier que l'utilisateur est bien Lyr-IA Society
    const userProfile = await getUserProfile(userId);
    if (!userProfile || userProfile.plan !== SubscriptionPlan.SecretSociety) {
      throw new Error('L\'utilisateur n\'est pas membre de Lyr-IA Society');
    }

    return await changePlan(userId, newPlan);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message, transition: null };
  }
}

// Écouter les changements d'authentification
export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
}
