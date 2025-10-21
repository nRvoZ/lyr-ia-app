import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { PersonalProfile } from '../types';
import * as personalProfilesService from '../services/personalProfilesService';
import { supabase } from '../services/supabaseClient';
import { UserContext } from './SupabaseUserContext';

interface PersonalProfilesContextType {
  personalProfiles: PersonalProfile[];
  saveProfile: (profile: PersonalProfile) => Promise<void>;
  deleteProfile: (profileId: 1 | 2 | 3) => Promise<void>;
  refreshProfiles: () => Promise<void>;
  loading: boolean;
}

export const PersonalProfilesContext = createContext<PersonalProfilesContextType>({
  personalProfiles: [
    { id: 1, name: '', styleDescription: '', exampleLyrics: '' },
    { id: 2, name: '', styleDescription: '', exampleLyrics: '' },
    { id: 3, name: '', styleDescription: '', exampleLyrics: '' },
  ],
  saveProfile: async () => {},
  deleteProfile: async () => {},
  refreshProfiles: async () => {},
  loading: false,
});

export const PersonalProfilesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalProfiles, setPersonalProfiles] = useState<PersonalProfile[]>([
    { id: 1, name: '', styleDescription: '', exampleLyrics: '' },
    { id: 2, name: '', styleDescription: '', exampleLyrics: '' },
    { id: 3, name: '', styleDescription: '', exampleLyrics: '' },
  ]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  // Charger les profils au démarrage et quand l'utilisateur se connecte
  const refreshProfiles = useCallback(async () => {
    console.log('🔄 Refreshing personal profiles... isAuthenticated:', user.isAuthenticated);
    
    if (!user.isAuthenticated) {
      console.log('❌ User not authenticated, resetting to empty profiles');
      setPersonalProfiles([
        { id: 1, name: '', styleDescription: '', exampleLyrics: '' },
        { id: 2, name: '', styleDescription: '', exampleLyrics: '' },
        { id: 3, name: '', styleDescription: '', exampleLyrics: '' },
      ]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      if (!userId) {
        console.log('❌ No user ID found in session');
        setLoading(false);
        return;
      }

      console.log('📜 Loading personal profiles from database for user:', userId);
      const { profiles, error } = await personalProfilesService.getUserProfiles(userId);
      
      if (error) {
        console.error('❌ Error loading personal profiles:', error);
      } else {
        console.log(`✅ Loaded personal profiles`);
        setPersonalProfiles(profiles);
      }
    } catch (error) {
      console.error('❌ Error in refreshProfiles:', error);
    } finally {
      setLoading(false);
    }
  }, [user.isAuthenticated]);

  // Recharger les profils quand l'utilisateur se connecte/déconnecte
  useEffect(() => {
    console.log('👤 Personal profiles - User authentication changed:', user.isAuthenticated);
    refreshProfiles();
  }, [user.isAuthenticated, refreshProfiles]);

  // Sauvegarder un profil
  const saveProfile = async (profile: PersonalProfile) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      if (!userId) {
        console.log('⚠️ User not authenticated, cannot save profile');
        return;
      }

      console.log('💾 Saving personal profile to database...');
      const { error } = await personalProfilesService.savePersonalProfile(userId, profile);
      
      if (error) {
        console.error('Error saving profile:', error);
        return;
      }

      // Mettre à jour l'état local
      setPersonalProfiles(prev => 
        prev.map(p => p.id === profile.id ? profile : p)
      );
      
      console.log('✅ Personal profile saved successfully');
    } catch (error) {
      console.error('Error in saveProfile:', error);
    }
  };

  // Supprimer un profil (le remettre à vide)
  const deleteProfile = async (profileId: 1 | 2 | 3) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      if (!userId) return;

      await personalProfilesService.deletePersonalProfile(userId, profileId);
      
      // Remettre le profil à vide dans l'état local
      setPersonalProfiles(prev => 
        prev.map(p => 
          p.id === profileId 
            ? { id: profileId, name: '', styleDescription: '', exampleLyrics: '' }
            : p
        )
      );
      
      console.log('✅ Personal profile deleted');
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  return (
    <PersonalProfilesContext.Provider value={{
      personalProfiles,
      saveProfile,
      deleteProfile,
      refreshProfiles,
      loading,
    }}>
      {children}
    </PersonalProfilesContext.Provider>
  );
};





