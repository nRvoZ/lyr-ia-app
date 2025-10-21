import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserState, SubscriptionPlan, BroadcastMessage, RewardType, AchievementReward, UserAchievements } from '../types';
import { DataContext } from './DataContext';
import * as authService from '../services/authService';
import * as achievementService from '../services/achievementService';
import { supabase } from '../services/supabaseClient';

// Context Definition
interface UserContextType {
  user: UserState;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, username: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUserAchievement: (achievementId: string, progress: number, isUnlocked: boolean) => Promise<void>;
  upgradePlan: (planId: SubscriptionPlan) => Promise<void>;
  addCredits: (amount: number) => Promise<void>;
  deductCredits: (amount: number) => Promise<boolean>;
  updateUsername: (newUsername: string) => Promise<{ success: boolean; error?: string }>;
  updateActiveTitle: (newTitle: string) => Promise<{ success: boolean; error?: string }>;
  updateProfilePicture: (file: File) => Promise<{ success: boolean; error?: string }>;
  changePlan: (newPlan: SubscriptionPlan, userId?: string) => Promise<{ success: boolean; error?: string; transition?: any }>;
  broadcastMessage: BroadcastMessage | null;
  claimAchievementReward: (achievementId: string) => Promise<void>;
  adminSetBroadcast: (message: string) => Promise<void>;
  adminClearBroadcast: () => Promise<void>;
  adminGrantCredits: (amount: number, targetUserId?: string) => Promise<void>;
  adminResetAchievements: (targetUserId?: string) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const defaultUser: UserState = {
  isAuthenticated: false,
  plan: SubscriptionPlan.Free,
  credits: 150,
  achievements: {},
};

export const UserContext = createContext<UserContextType>({
  user: defaultUser,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: async () => {},
  updateUserAchievement: async () => {},
  upgradePlan: async () => {},
  addCredits: async () => {},
  deductCredits: async () => false,
  updateUsername: async () => ({ success: false }),
  updateActiveTitle: async () => ({ success: false }),
  updateProfilePicture: async () => ({ success: false }),
  changePlan: async () => ({ success: false }),
  broadcastMessage: null,
  claimAchievementReward: async () => {},
  adminSetBroadcast: async () => {},
  adminClearBroadcast: async () => {},
  adminGrantCredits: async () => {},
  adminResetAchievements: async () => {},
  refreshUserProfile: async () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserState>(defaultUser);
  const [loading, setLoading] = useState(true);
  const [broadcastMessage, setBroadcastMessage] = useState<BroadcastMessage | null>(null);

  const appData = useContext(DataContext);

  // Debug: Log initialization (only once)
  // console.log('UserProvider initializing...', { user, loading });

  // Define loadUserProfile at component level so it can be used everywhere
  const loadUserProfile = async (userId: string) => {
    try {
      console.log('Loading profile for user:', userId);
      const profile = await authService.getUserProfile(userId);
      console.log('Profile loaded:', profile);

      if (profile) {
        const newUserState: UserState = {
          isAuthenticated: true,
          isAdmin: profile.isAdmin,
          isBanned: profile.isBanned,
          plan: profile.plan as SubscriptionPlan,
          credits: profile.credits,
          username: profile.username,
          email: profile.email,
          profilePictureUrl: profile.profilePictureUrl,
          achievements: profile.achievements as UserAchievements,
          unlockedTitles: profile.unlockedTitles,
          activeTitle: profile.activeTitle,
        };
        console.log('Setting user state:', newUserState);
        setUser(newUserState);
      } else {
        console.error('No profile found for user:', userId);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
      console.log('Profile loading completed');
    }
  };

  useEffect(() => {
    let isSessionLoaded = false;

    const initAuth = async () => {
      try {
        console.log('🔵 [AUTH] Starting auth initialization...');
        
        // Timeout plus long (30s) pour la session check
        const timeoutDuration = 30000;
        const sessionPromise = supabase.auth.getSession();
        const timeoutPromise = new Promise<{ data: { session: null } }>((resolve) => 
          setTimeout(() => {
            console.log('⚠️ [AUTH] Session check timeout, relying on onAuthStateChange');
            resolve({ data: { session: null } });
          }, timeoutDuration)
        );
        
        const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise]);
        
        // Si la session a déjà été chargée par onAuthStateChange, on skip
        if (isSessionLoaded) {
          console.log('🟡 [AUTH] Session already loaded by onAuthStateChange');
          return;
        }

        if (session?.user) {
          console.log('🟢 [AUTH] Found existing session for user:', session.user.id);
          isSessionLoaded = true;
          await loadUserProfile(session.user.id);
        } else {
          console.log('🟡 [AUTH] No existing session found');
          setLoading(false);
        }
      } catch (error) {
        console.error('🔴 [AUTH] Error initializing auth:', error);
        if (!isSessionLoaded) {
          setLoading(false);
        }
      }
    };

    initAuth();

    // Listen for auth changes - plus rapide que getSession()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔵 [AUTH] Auth state change event:', event, session?.user?.id);
      const authUser = session?.user;
      if (authUser && !isSessionLoaded) {
        console.log('🟢 [AUTH] Auth state changed - user logged in:', authUser.id);
        isSessionLoaded = true;
        await loadUserProfile(authUser.id);
      } else if (!authUser) {
        console.log('🟡 [AUTH] Auth state changed - user logged out');
        setUser(defaultUser);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);



  const login = async (email: string, password: string) => {
    try {
      const { user: authUser, error } = await authService.signIn(email, password);
      
      if (error) {
        return { success: false, error };
      }

      if (authUser) {
        await loadUserProfile(authUser.id);
        return { success: true };
      }

      return { success: false, error: 'Erreur de connexion' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      const { user: authUser, error } = await authService.signUp(email, password, username);
      
      if (error) {
        return { success: false, error };
      }

      if (authUser) {
        // Note: Le profil sera créé automatiquement par le trigger
        return { success: true };
      }

      return { success: false, error: 'Erreur lors de l\'inscription' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await authService.signOut();
      setUser(defaultUser);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUserAchievement = async (achievementId: string, progress: number, isUnlocked: boolean) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      if (!userId) {
        console.log('⚠️ User not authenticated, cannot update achievement');
        return;
      }

      // Utiliser le nouveau service pour mettre à jour l'achievement
      console.log(`🏆 Updating achievement: ${achievementId} (progress: ${progress}, unlocked: ${isUnlocked})`);
      const { error } = await achievementService.updateAchievement(userId, achievementId, progress, isUnlocked);
      
      if (error) {
        console.error('Error updating achievement in DB:', error);
        return;
      }

      // Mettre à jour l'état local
      const updatedAchievements = {
        ...user.achievements,
        [achievementId]: {
          progress,
          unlockedAt: isUnlocked ? new Date().toISOString() : (user.achievements[achievementId]?.unlockedAt),
          isClaimed: user.achievements[achievementId]?.isClaimed || false
        }
      };

      setUser(prev => ({ ...prev, achievements: updatedAchievements }));
      
      console.log('✅ Achievement updated successfully');
      
      // Rafraîchir le profil si l'achievement vient d'être débloqué pour assurer la cohérence
      if (isUnlocked && !user.achievements[achievementId]?.unlockedAt) {
        console.log('🔄 Refreshing profile after unlocking achievement');
        // Attendre un court délai pour que la DB soit à jour
        setTimeout(async () => {
          await loadUserProfile(userId);
        }, 100);
      }
    } catch (error) {
      console.error('Error updating achievement:', error);
    }
  };

  const upgradePlan = async (planId: SubscriptionPlan) => {
    if (!user.isAuthenticated) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        await authService.updateUserProfile(session.user.id, {
          plan: planId,
          credits: 'unlimited'
        });
      }
      
      setUser(prev => ({
        ...prev,
        plan: planId,
        credits: 'unlimited'
      }));
    } catch (error) {
      console.error('Error upgrading plan:', error);
    }
  };

  const addCredits = async (amount: number) => {
    if (!user.isAuthenticated) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        await authService.addCredits(session.user.id, amount);
      }
      
      setUser(prev => ({
        ...prev,
        credits: typeof prev.credits === 'number' ? prev.credits + amount : prev.credits
      }));
    } catch (error) {
      console.error('Error adding credits:', error);
    }
  };

  const claimAchievementReward = async (achievementId: string) => {
    if (!appData) return;
    const achievement = appData.allAchievements.find(a => a.id === achievementId);
    if (!achievement || !achievement.reward) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      if (!userId) return;

      console.log(`🎁 Claiming reward for achievement: ${achievementId}`);

      // Marquer l'achievement comme réclamé dans la DB
      const { error: claimError } = await achievementService.claimAchievement(userId, achievementId);
      
      if (claimError) {
        console.error('Error claiming achievement:', claimError);
        return;
      }

      // Appliquer la récompense
      let updates: Partial<UserState> = {} as any;
      const { type, value } = achievement.reward as AchievementReward;

      if (type === RewardType.Credits && typeof user.credits === 'number') {
        const toAdd = typeof value === 'number' ? value : 0;
        updates.credits = user.credits + toAdd;
        // Ajouter les crédits dans la DB
        await authService.addCredits(userId, toAdd);
        console.log(`✅ Added ${toAdd} credits as reward`);
      } else if (type === RewardType.Title) {
        const title = String(value);
        const setTitles = new Set(user.unlockedTitles || []);
        setTitles.add(title);
        updates.unlockedTitles = Array.from(setTitles);
        // Mettre à jour les titres dans la DB
        await authService.updateUserProfile(userId, { unlockedTitles: updates.unlockedTitles } as any);
        console.log(`✅ Unlocked title: ${title}`);
      } else if (type === RewardType.Theme) {
        const theme = String(value);
        const setThemes = new Set(user.unlockedThemes || []);
        setThemes.add(theme);
        updates.unlockedThemes = Array.from(setThemes);
        // Mettre à jour les thèmes dans la DB
        await authService.updateUserProfile(userId, { unlocked_themes: updates.unlockedThemes } as any);
        console.log(`✅ Unlocked theme: ${theme}`);
      }

      // Mettre à jour l'état local de l'achievement
      const updatedAchievements = {
        ...user.achievements,
        [achievementId]: { 
          ...(user.achievements[achievementId] || { progress: 0 }), 
          isClaimed: true 
        }
      };
      updates.achievements = updatedAchievements;

      setUser(prev => ({ ...prev, ...updates }));
      console.log('✅ Reward claimed successfully');
    } catch (e) {
      console.error('Error claiming reward:', e);
    }
  };

  const adminSetBroadcast = async (message: string) => {
    setBroadcastMessage({ message, id: Date.now() });
  };

  const adminClearBroadcast = async () => {
    setBroadcastMessage(null);
  };

  const adminGrantCredits = async (amount: number, targetUserId?: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = targetUserId || session?.user?.id;
      if (!userId) return;
      await authService.addCredits(userId, amount);
      if (!targetUserId) {
        setUser(prev => ({ ...prev, credits: typeof prev.credits === 'number' ? prev.credits + amount : prev.credits }));
      }
    } catch (e) {
      console.error('Error granting credits:', e);
    }
  };

  const adminResetAchievements = async (targetUserId?: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = targetUserId || session?.user?.id;
      if (!userId) return;
      await authService.updateUserProfile(userId, { achievements: {}, unlockedTitles: [], activeTitle: undefined } as any);
      if (!targetUserId) {
        setUser(prev => ({ ...prev, achievements: {}, unlockedTitles: [], activeTitle: undefined }));
      }
    } catch (e) {
      console.error('Error resetting achievements:', e);
    }
  };

  const deductCredits = async (amount: number): Promise<boolean> => {
    console.log('🔄 Deducting credits:', { amount, userCredits: user.credits, isAuthenticated: user.isAuthenticated });

    if (!user.isAuthenticated) {
      console.log('❌ User not authenticated');
      return false;
    }

    if (user.credits === 'unlimited') {
      console.log('✅ User has unlimited credits');
      return true;
    }

    if (typeof user.credits === 'number' && user.credits < amount) {
      console.log('❌ Insufficient credits:', user.credits, '<', amount);
      return false;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) {
        console.log('❌ No session found');
        return false;
      }

      console.log('📤 Calling authService.deductCredits...');
      const result = await authService.deductCredits(session.user.id, amount);
      console.log('📥 Result from authService:', result);

      if (result.error) {
        console.log('❌ Error from authService:', result.error);
        return false;
      }

      const newCredits = typeof user.credits === 'number' ? user.credits - amount : user.credits;
      console.log('✅ Credits deducted successfully. New credits:', newCredits);

      setUser(prev => ({
        ...prev,
        credits: newCredits
      }));

      return true;
    } catch (error) {
      console.error('❌ Error deducting credits:', error);
      return false;
    }
  };

  const updateUsername = async (newUsername: string) => {
    if (!user.isAuthenticated) return { success: false, error: 'Non connecté' };

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return { success: false, error: 'Non connecté' };

      const { error } = await authService.updateUserProfile(session.user.id, { username: newUsername });

      if (error) {
        return { success: false, error };
      }

      setUser(prev => ({
        ...prev,
        username: newUsername
      }));

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const updateActiveTitle = async (newTitle: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      if (!userId) {
        return { success: false, error: 'Utilisateur non authentifié' };
      }

      // Mise à jour dans Supabase
      const { error } = await supabase
        .from('user_profiles')
        .update({ active_title: newTitle })
        .eq('id', userId);

      if (error) {
        console.error('Error updating active title:', error);
        return { success: false, error: error.message };
      }

      // Mise à jour de l'état local
      setUser(prev => ({ ...prev, activeTitle: newTitle }));
      console.log('✅ Active title updated:', newTitle);

      return { success: true };
    } catch (error: any) {
      console.error('Error in updateActiveTitle:', error);
      return { success: false, error: error.message };
    }
  };

  const updateProfilePicture = async (file: File): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      if (!userId) {
        return { success: false, error: 'Utilisateur non authentifié' };
      }

      // Upload file to Supabase Storage
      const { url, error: uploadError } = await authService.uploadProfilePicture(userId, file);

      if (uploadError || !url) {
        console.error('Error uploading profile picture:', uploadError);
        return { success: false, error: uploadError || 'Erreur lors de l\'upload' };
      }

      // Update user profile with new picture URL
      const { error: updateError } = await authService.updateUserProfile(userId, { profilePictureUrl: url });

      if (updateError) {
        console.error('Error updating profile picture URL:', updateError);
        return { success: false, error: updateError };
      }

      // Mise à jour de l'état local
      setUser(prev => ({ ...prev, profilePictureUrl: url }));
      console.log('✅ Profile picture updated:', url);

      return { success: true };
    } catch (error: any) {
      console.error('Error in updateProfilePicture:', error);
      return { success: false, error: error.message };
    }
  };

  const changePlan = async (newPlan: SubscriptionPlan, userId?: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const targetUserId = userId || session?.user?.id;

      if (!targetUserId) {
        return { success: false, error: 'Utilisateur non identifié' };
      }

      const { error, transition } = await authService.changePlan(targetUserId, newPlan);

      if (error) {
        return { success: false, error };
      }

      // Si c'est l'utilisateur actuel, mettre à jour le state
      if (!userId || userId === session?.user?.id) {
        await loadUserProfile(targetUserId);
      }

      return { success: true, transition };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const refreshUserProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        console.log('🔄 Refreshing user profile from database...');
        await loadUserProfile(session.user.id);
      }
    } catch (error) {
      console.error('Error refreshing user profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Logo animé avec effet Aqualis */}
        <div className="flex flex-col items-center gap-6">
          <div 
            className="relative h-20 flex items-center"
            style={{
              animation: 'glow-pulse 2.5s ease-in-out infinite',
              filter: 'drop-shadow(0 0 15px #4ff4bc90) drop-shadow(0 0 35px #3275b870) drop-shadow(0 0 55px #4ff4bc40)',
            }}
          >
            <svg className="h-20 w-auto" viewBox="0 0 1500 400">
              <defs>
                <linearGradient id="logoGradientLyrLoading" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#4ff4bc' }} />
                  <stop offset="30%" style={{ stopColor: '#3bc7a8' }} />
                  <stop offset="60%" style={{ stopColor: '#3275b8' }} />
                  <stop offset="100%" style={{ stopColor: '#30259f' }} />
                </linearGradient>
                <mask id="logoMaskLyrLoading">
                  <image href="/lyria-txt-white copie.png" width="1500" height="400" />
                  <rect x="810" y="0" width="690" height="400" fill="black" />
                </mask>
                <mask id="logoMaskIALoading">
                  <image href="/lyria-txt-white copie.png" width="1500" height="400" />
                  <rect x="0" y="0" width="810" height="400" fill="black" />
                </mask>
              </defs>
              <rect width="1500" height="400" fill="url(#logoGradientLyrLoading)" mask="url(#logoMaskLyrLoading)" />
              <rect width="1500" height="400" fill="#FFFFFF" mask="url(#logoMaskIALoading)" />
            </svg>
          </div>
          {/* Barre de progression minimaliste avec gradient Aqualis */}
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#4ff4bc] via-[#3275b8] to-[#30259f] animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
          </div>
          {/* Texte explicatif */}
          <p className="text-white/60 text-sm animate-pulse">
            Vérification de l'authentification...
          </p>
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateUserAchievement,
      upgradePlan,
      addCredits,
      deductCredits,
      updateUsername,
      updateActiveTitle,
      updateProfilePicture,
      changePlan,
      broadcastMessage,
      claimAchievementReward,
      adminSetBroadcast,
      adminClearBroadcast,
      adminGrantCredits,
      adminResetAchievements,
      refreshUserProfile,
    }}>
      {children}
    </UserContext.Provider>
  );
};
