import React, { createContext, useState, useContext, useEffect } from 'react';
import { UserState, SubscriptionPlan, UserAchievements, RewardType, AchievementReward, BroadcastMessage } from '../types';
import { DataContext } from './DataContext';
import * as totpService from '../services/totpService';
import { FORBIDDEN_USERNAMES } from '@constants/constants_moderation';
import { rehydrateMasteryAchievements } from '@constants/constants_achievements';
import { supabase } from '../services/supabaseClient';


// --- Helper Hook for Local Storage ---
function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
    setStoredValue(currentStoredValue => {
      try {
        const valueToStore = value instanceof Function ? value(currentStoredValue) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      } catch (error) {
        console.error(error);
        return currentStoredValue;
      }
    });
  };
  
  return [storedValue, setValue];
}

// Type for our simulated user database, now containing the full user state
export type UserAccountData = Omit<UserState, 'isAuthenticated' | 'isAdmin'>;

export type StoredUser = {
  email: string;
  pass: string;
  twoFactorSecret?: string;
  twoFactorTempSecret?: string;
} & UserAccountData;


// --- Context Definition ---
interface UserContextType {
  user: UserState;
  initiateSignup: (email: string, pass: string, username: string) => Promise<{ tempSecret?: string; isAdmin: boolean }>;
  finalizeSignup: (email: string, tempSecret: string, code: string) => Promise<void>;
  initiateLogin: (email: string, pass: string) => Promise<{ twoFactorRequired: boolean }>;
  finalizeLogin: (email: string, pass: string, code: string) => Promise<void>;
  logout: () => void;
  consumeCredits: (amount: number) => void;
  addCredits: (amount: number) => void;
  upgradePlan: (planId: SubscriptionPlan) => void;
  updateUser: (updates: Partial<UserAccountData>) => void;
  updateUsername: (email: string, newUsername: string) => Promise<void>;
  updateUserAchievement: (achievementId: string, newProgress: number, isUnlocked: boolean) => void;
  claimAchievementReward: (achievementId: string) => void;
  userDatabase: StoredUser[];
  adminUpdateUser: (email: string, updates: Partial<UserAccountData & { pass?: string; username?: string | null; twoFactorSecret?: string | null }>) => void;
  adminDeleteUser: (email: string) => void;
  adminGrantCredits: (amount: number, targetPlan?: SubscriptionPlan) => void;
  broadcastMessage: BroadcastMessage | null;
  adminSetBroadcast: (message: string) => void;
  adminClearBroadcast: () => void;
}

const defaultUser: UserState = {
  isAuthenticated: false,
  plan: SubscriptionPlan.Free,
  credits: 250,
  username: 'Guest',
  email: '',
  profilePictureUrl: '',
  achievements: {},
  unlockedTitles: [],
  activeTitle: undefined,
};

export const UserContext = createContext<UserContextType>({
  user: defaultUser,
  initiateSignup: async () => ({ isAdmin: false }),
  finalizeSignup: async () => {},
  initiateLogin: async () => ({ twoFactorRequired: false }),
  finalizeLogin: async () => {},
  logout: () => {},
  consumeCredits: () => {},
  addCredits: () => {},
  upgradePlan: () => {},
  updateUser: () => {},
  updateUsername: async () => {},
  updateUserAchievement: () => {},
  claimAchievementReward: () => {},
  userDatabase: [],
  adminUpdateUser: () => {},
  adminDeleteUser: () => {},
  adminGrantCredits: () => {},
  broadcastMessage: null,
  adminSetBroadcast: () => {},
  adminClearBroadcast: () => {},
});

const ADMIN_EMAILS = [
  'admin@lyria.app',
  'lyria.team@gmail.com',
  ];

// --- Provider Component ---
// --- Provider Component ---
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // =======================================================================================
  // CORRECTION APPLIQUÉE
  // ---------------------------------------------------------------------------------------
  // Tous les appels de Hooks sont maintenant regroupés en haut du composant,
  // AVANT toute condition ou retour anticipé. C'est la Règle d'Or de React.
  // =======================================================================================
  
  // 1. APPEL DE TOUS LES HOOKS (SANS CONDITION)
  const appData = useContext(DataContext);
  const [user, setUser] = useLocalStorage<UserState>('lyria-user', defaultUser);
  const [userDatabase, setUserDatabase] = useLocalStorage<StoredUser[]>('lyria-user-database', []);
  const [broadcastMessage, setBroadcastMessage] = useLocalStorage<BroadcastMessage | null>('lyria-broadcast-message', null);
  const [bannedUsernames, setBannedUsernames] = useLocalStorage<string[]>('lyria-banned-usernames', []);

  // On extrait les données après les hooks, mais avant la condition de retour
  const plans = appData?.plans;
  const allAchievements = appData?.allAchievements;

 useEffect(() => {
    if (allAchievements && user) {
        rehydrateMasteryAchievements(allAchievements, user);
    }
  }, [allAchievements, user]);

  // Maintenant que les hooks sont appelés, ON A LE DROIT de s'arrêter.
  if (!appData) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black">
            <p className="text-white">Chargement...</p>
        </div>
    );
  }

  const validateUsername = (username: string) => {
    const lowerUsername = username.toLowerCase();
    if (FORBIDDEN_USERNAMES.includes(lowerUsername)) {
      throw new Error("Ce pseudonyme est réservé ou interdit.");
    }
    if (bannedUsernames.includes(lowerUsername)) {
      throw new Error("Ce pseudonyme n'est plus disponible.");
    }
    if (userDatabase.some(u => u.username?.toLowerCase() === lowerUsername)) {
        throw new Error("Ce pseudonyme est déjà utilisé.");
    }
  };
  
  const initiateSignup = async (email: string, pass: string, newUsername: string): Promise<{ tempSecret?: string; isAdmin: boolean }> => {
    const existingUser = userDatabase.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        throw new Error("Cette adresse e-mail est déjà utilisée.");
    }
    validateUsername(newUsername);
    
    // Admin user bypasses 2FA setup
    if (ADMIN_EMAILS.includes(email.toLowerCase())) {
        const adminAccount: UserAccountData = {
            username: newUsername || 'Admin',
            plan: SubscriptionPlan.SecretSociety,
            credits: 'unlimited',
            email: email,
            achievements: {},
        };
        const newAdminUser: StoredUser = { email, pass, ...adminAccount };
        setUserDatabase(prevDb => [...prevDb, newAdminUser]);
        setUser({
            isAuthenticated: true,
            isAdmin: true,
            ...adminAccount
        });
        return { isAdmin: true };
    }

    const secretCode = '#LYR-IA_SS';
    const isSecretUser = newUsername.endsWith(secretCode);
    const finalUsername = isSecretUser ? newUsername.replace(secretCode, '').trim() || `Membre Secret #${Math.floor(Math.random() * 1000)}` : newUsername;
    
    const tempSecret = totpService.generateSecret();

    const newUserAccount: UserAccountData = {
        username: finalUsername,
        plan: isSecretUser ? SubscriptionPlan.SecretSociety : SubscriptionPlan.Free,
        credits: isSecretUser ? 'unlimited' : 250,
        email: email,
        achievements: user.achievements, // Preserve guest achievements
        unlockedTitles: user.unlockedTitles,
        isBanned: false,
    };

    const newUser: StoredUser = { email, pass, ...newUserAccount, twoFactorTempSecret: tempSecret };
    setUserDatabase(prevDb => [...prevDb, newUser]);
    
    return { tempSecret, isAdmin: false };
  };

  const finalizeSignup = async (email: string, tempSecret: string, code: string): Promise<void> => {
    const isVerified = await totpService.verifyCode(tempSecret, code);
    if (!isVerified) {
        throw new Error("Le code de vérification est incorrect. Veuillez réessayer.");
    }
    
    let signedUpUser: StoredUser | undefined;

    setUserDatabase(db => db.map(u => {
        if (u.email.toLowerCase() === email.toLowerCase() && u.twoFactorTempSecret === tempSecret) {
            signedUpUser = { ...u, twoFactorSecret: tempSecret };
            delete signedUpUser.twoFactorTempSecret;
            return signedUpUser;
        }
        return u;
    }));

    if (signedUpUser) {
        const { pass, ...userAccountData } = signedUpUser;
        setUser({
            isAuthenticated: true,
            isAdmin: false,
            ...userAccountData
        });
    } else {
        throw new Error("Impossible de finaliser l'inscription. Veuillez recommencer.");
    }
  };
  
  const initiateLogin = async (email: string, pass: string): Promise<{ twoFactorRequired: boolean }> => {
    const storedUser = userDatabase.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!storedUser) {
        throw new Error("Aucun compte n'a été trouvé avec cette adresse e-mail.");
    }
    if (storedUser.isBanned) {
        throw new Error("Ce compte a été banni. Veuillez contacter le support.");
    }
    if (storedUser.pass !== pass) {
        throw new Error("Mot de passe incorrect.");
    }

    if (storedUser.twoFactorSecret) {
        return { twoFactorRequired: true };
    }

    // No 2FA, log in directly
    const { pass: storedPass, ...userAccountData } = storedUser;
    setUser({
        isAuthenticated: true,
        isAdmin: ADMIN_EMAILS.includes(storedUser.email.toLowerCase()),
        ...userAccountData,
    });
    return { twoFactorRequired: false };
  };

  const finalizeLogin = async (email: string, pass: string, code: string): Promise<void> => {
    const storedUser = userDatabase.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!storedUser || storedUser.pass !== pass) {
         throw new Error("Identifiants invalides.");
    }
    if (!storedUser.twoFactorSecret) {
        throw new Error("La 2FA n'est pas activée pour ce compte.");
    }

    const isVerified = await totpService.verifyCode(storedUser.twoFactorSecret, code);
    if (!isVerified) {
        throw new Error("Le code de vérification est incorrect.");
    }

    const { pass: storedPass, ...userAccountData } = storedUser;
    setUser({
        isAuthenticated: true,
        isAdmin: ADMIN_EMAILS.includes(storedUser.email.toLowerCase()),
        ...userAccountData,
    });
  };

  const logout = () => {
    setUser(defaultUser);
  };
  
  const updateDatabaseForCurrentUser = (updates: Partial<UserAccountData>) => {
    if (user.isAuthenticated && user.email) {
      setUserDatabase(db => db.map(u => u.email === user.email ? { ...u, ...updates } : u));
    }
  };

  const consumeCredits = (amount: number) => {
    setUser(prevUser => {
      if (prevUser.credits === 'unlimited') return prevUser;
      
      const newCredits = Math.max(0, prevUser.credits - amount);
      updateDatabaseForCurrentUser({ credits: newCredits });
      
      return { ...prevUser, credits: newCredits };
    });
  };

  const addCredits = (amount: number) => {
      setUser(prevUser => {
        if (prevUser.credits === 'unlimited') return prevUser;

        const newCredits = prevUser.credits + amount;
        updateDatabaseForCurrentUser({ credits: newCredits });

        return { ...prevUser, credits: newCredits };
      });
  };

  const upgradePlan = (planId: SubscriptionPlan) => {
      const selectedPlan = plans.find(p => p.id === planId);
      if (!selectedPlan) return;

      setUser(prevUser => {
        if (prevUser.plan === SubscriptionPlan.SecretSociety) return prevUser;

        let newCredits: number | 'unlimited';

        if (planId === SubscriptionPlan.Free) {
            newCredits = selectedPlan.credits as number;
        } else if (selectedPlan.credits === 'unlimited') {
            newCredits = 'unlimited';
        } else {
            if (prevUser.credits === 'unlimited') {
                newCredits = selectedPlan.credits;
            } else {
                newCredits = prevUser.credits + selectedPlan.credits;
            }
        }
        
        updateDatabaseForCurrentUser({ plan: planId, credits: newCredits });

        return { ...prevUser, plan: planId, credits: newCredits };
      });
  };
  
  const updateUser = (updates: Partial<UserAccountData>) => {
      setUser(prev => ({...prev, ...updates}));
      updateDatabaseForCurrentUser(updates);
  };

  const updateUsername = async (email: string, newUsername: string): Promise<void> => {
    validateUsername(newUsername);
    const updates = { username: newUsername };

    setUserDatabase(db => db.map(u => u.email === email ? { ...u, ...updates } : u));

    if (user.isAuthenticated && user.email === email) {
        setUser(prev => ({ ...prev, ...updates }));
    }
  };
  
  const updateUserAchievement = (achievementId: string, newProgress: number, isUnlocked: boolean) => {
    setUser(prev => {
        const newAchievements = { ...prev.achievements };
        const current = newAchievements[achievementId] || { progress: 0 };
        current.progress = newProgress;
        if (isUnlocked && !current.unlockedAt) {
            current.unlockedAt = new Date().toISOString();
        }
        newAchievements[achievementId] = current;
        
        updateDatabaseForCurrentUser({ achievements: newAchievements });

        return { ...prev, achievements: newAchievements };
    });
  };
  
  const claimAchievementReward = (achievementId: string) => {
      const achievement = allAchievements.find(a => a.id === achievementId);
      if (!achievement || !achievement.reward) return;

      setUser(prev => {
          const userAchievement = prev.achievements[achievementId];
          if (!userAchievement || !userAchievement.unlockedAt || userAchievement.isClaimed) return prev;

          let updatedUser: UserState = { ...prev };
          let updatesForDb: Partial<UserAccountData> = {};

          const { type, value } = achievement.reward as AchievementReward;
          switch (type) {
              case RewardType.Credits:
                  if (updatedUser.credits !== 'unlimited') {
                      const toAdd = typeof value === 'number' ? value : 0;
                      updatedUser.credits = Math.max(0, updatedUser.credits + toAdd);
                      updatesForDb.credits = updatedUser.credits;
                  }
                  break;
              case RewardType.Title:
                  {
                    const title = String(value);
                    const current = new Set(updatedUser.unlockedTitles || []);
                    current.add(title);
                    updatedUser.unlockedTitles = Array.from(current);
                    updatesForDb.unlockedTitles = updatedUser.unlockedTitles;
                  }
                  break;
              case RewardType.Theme:
                  {
                    const theme = String(value);
                    const current = new Set(updatedUser.unlockedThemes || []);
                    current.add(theme);
                    updatedUser.unlockedThemes = Array.from(current);
                    updatesForDb.unlockedThemes = updatedUser.unlockedThemes as any;
                  }
                  break;
          }

          const newAchievements = {
              ...prev.achievements,
              [achievementId]: { ...userAchievement, isClaimed: true }
          };
          updatesForDb.achievements = newAchievements;

          updateDatabaseForCurrentUser(updatesForDb);
          return { ...updatedUser, achievements: newAchievements };
      });
  };

  const adminUpdateUser = (emailToUpdate: string, updates: Partial<UserAccountData & { pass?: string; username?: string | null; twoFactorSecret?: string | null }>) => {
      setUserDatabase(prevDb => prevDb.map(u => {
          if (u.email.toLowerCase() === emailToUpdate.toLowerCase()) {
              // If username is being nulled, ban the old one
              if (updates.username === null && u.username) {
                  setBannedUsernames(prevBanned => [...new Set([...prevBanned, u.username!.toLowerCase()])]);
              }
              // If the plan is being changed, reset credits to the new plan's default
              if ('plan' in updates && updates.plan !== u.plan) {
                  const newPlanData = plans.find(p => p.id === updates.plan);
                  if (newPlanData) {
                      updates.credits = newPlanData.credits;
                  }
              }
              const updatedUser = { ...u, ...updates };
              if (updates.twoFactorSecret === null) {
                  delete (updatedUser as Partial<StoredUser>).twoFactorSecret;
              }
              return updatedUser;
          }
          return u;
      }));
      // If the admin is editing their own account, update the live state too
      if(user.isAuthenticated && user.email?.toLowerCase() === emailToUpdate.toLowerCase()) {
          const { pass, twoFactorSecret, ...stateUpdates } = updates;
          setUser(prev => ({...prev, ...stateUpdates}));
      }
  };

  const adminDeleteUser = (emailToDelete: string) => {
      setUserDatabase(prevDb => prevDb.filter(u => u.email.toLowerCase() !== emailToDelete.toLowerCase()));
      // If admin deletes themself, log them out
      if (user.isAuthenticated && user.email?.toLowerCase() === emailToDelete.toLowerCase()) {
          logout();
      }
  };
  
  const adminGrantCredits = (amount: number, targetPlan?: SubscriptionPlan) => {
    setUserDatabase(prevDb => prevDb.map(u => {
        if (u.credits === 'unlimited') return u; // Don't grant to unlimited users
        
        if (!targetPlan || u.plan === targetPlan) {
            return { ...u, credits: (u.credits as number) + amount };
        }
        return u;
    }));
  };
  
  const adminSetBroadcast = (message: string) => {
    setBroadcastMessage({ message, id: Date.now() });
  };

  const adminClearBroadcast = () => {
    setBroadcastMessage(null);
  };


  return (
    <UserContext.Provider value={{ user, initiateSignup, finalizeSignup, initiateLogin, finalizeLogin, logout, consumeCredits, addCredits, upgradePlan, updateUser, updateUsername, updateUserAchievement, claimAchievementReward, userDatabase, adminUpdateUser, adminDeleteUser, adminGrantCredits, broadcastMessage, adminSetBroadcast, adminClearBroadcast }}>
      {children}
    </UserContext.Provider>
  );
};