import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { HistoryItem } from '../types';
import * as historyService from '../services/historyService';
import { supabase } from '../services/supabaseClient';
import { UserContext } from './SupabaseUserContext';

interface HistoryContextType {
  history: HistoryItem[];
  addToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => Promise<void>;
  markAsCopied: (songId: string) => Promise<void>;
  deleteSong: (songId: string) => Promise<void>;
  toggleFavorite: (songId: string, isFavorite: boolean) => Promise<void>;
  refreshHistory: () => Promise<void>;
  loading: boolean;
}

export const HistoryContext = createContext<HistoryContextType>({
  history: [],
  addToHistory: async () => {},
  markAsCopied: async () => {},
  deleteSong: async () => {},
  toggleFavorite: async () => {},
  refreshHistory: async () => {},
  loading: false,
});

// Fonction helper pour convertir UUID en nombre (définie en dehors du composant)
const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convertir en entier 32 bits
  }
  return Math.abs(hash);
};

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [idMap, setIdMap] = useState<Map<number, string>>(new Map()); // Map numeric ID -> UUID
  const { user } = useContext(UserContext);

  // Charger l'historique au démarrage et quand l'utilisateur se connecte
  const refreshHistory = useCallback(async () => {
    console.log('🔄 Refreshing history... isAuthenticated:', user.isAuthenticated);
    
    if (!user.isAuthenticated) {
      console.log('❌ User not authenticated, clearing history');
      setHistory([]);
      setIdMap(new Map());
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      if (!userId) {
        console.log('❌ No user ID found in session');
        setHistory([]);
        setIdMap(new Map());
        setLoading(false);
        return;
      }

      console.log('📜 Loading history from database for user:', userId);
      
      // Charger directement depuis Supabase pour avoir les UUIDs
      const { data, error } = await supabase
        .from('song_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (error) {
        console.error('❌ Error loading history:', error);
        setHistory([]);
        setIdMap(new Map());
      } else if (data) {
        // Créer la map et l'historique
        const newMap = new Map<number, string>();
        const loadedHistory: HistoryItem[] = data.map((item: any) => {
          const hashId = hashCode(item.id);
          newMap.set(hashId, item.id); // Stocker le mapping hash -> UUID
          
          return {
            id: hashId,
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
            timestamp: item.created_at
          };
        });
        
        setIdMap(newMap);
        setHistory(loadedHistory);
        console.log(`✅ Loaded ${loadedHistory.length} songs from history`);
      }
    } catch (error) {
      console.error('❌ Error in refreshHistory:', error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, [user.isAuthenticated]);

  // Recharger l'historique quand l'utilisateur se connecte/déconnecte
  useEffect(() => {
    console.log('👤 User authentication changed:', user.isAuthenticated, 'email:', user.email);
    refreshHistory();
  }, [user.isAuthenticated, user.email, refreshHistory]);

  // Ajouter une chanson à l'historique
  const addToHistory = async (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      if (!userId) {
        console.log('⚠️ User not authenticated, cannot save to history');
        return;
      }

      console.log('💾 Saving song to history...');
      const { id: uuidId, error } = await historyService.saveSongToHistory(userId, item);
      
      if (error || !uuidId) {
        console.error('Error saving to history:', error);
        return;
      }

      // Convertir l'UUID en nombre avec hash
      const numericId = typeof uuidId === 'string' ? hashCode(uuidId) : Date.now();

      // Ajouter le mapping
      setIdMap(prev => new Map(prev).set(numericId, uuidId));

      // Ajouter à l'état local avec l'ID converti
      const newHistoryItem: HistoryItem = {
        ...item,
        id: numericId,
        timestamp: new Date().toISOString() // ISO string format
      };

      setHistory(prev => [newHistoryItem, ...prev]);
      console.log('✅ Song added to history with ID:', numericId, 'UUID:', uuidId);
    } catch (error) {
      console.error('Error in addToHistory:', error);
    }
  };

  // Marquer une chanson comme copiée
  const markAsCopied = async (songId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      if (!userId) return;

      // Convertir l'ID numérique en UUID si nécessaire
      const numericId = parseInt(songId);
      const uuid = idMap.get(numericId) || songId;

      await historyService.markSongAsCopied(userId, uuid);
      
      // Mettre à jour l'état local
      setHistory(prev => 
        prev.map(item => 
          item.id === numericId || item.id.toString() === songId
            ? { ...item, isCopied: true } 
            : item
        )
      );
    } catch (error) {
      console.error('Error marking as copied:', error);
    }
  };

  // Basculer le statut favori
  const toggleFavorite = async (songId: string, isFavorite: boolean) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      if (!userId) return;

      // Convertir l'ID numérique en UUID si nécessaire
      const numericId = parseInt(songId);
      const uuid = idMap.get(numericId) || songId;

      await historyService.toggleSongFavorite(userId, uuid, isFavorite);
      
      // Mettre à jour l'état local
      setHistory(prev => 
        prev.map(item => 
          item.id === numericId || item.id.toString() === songId
            ? { ...item, isFavorite } 
            : item
        )
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // Supprimer une chanson
  const deleteSong = async (songId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      if (!userId) return;

      // Convertir l'ID numérique en UUID si nécessaire
      const numericId = parseInt(songId);
      const uuid = idMap.get(numericId) || songId;

      await historyService.deleteSongFromHistory(userId, uuid);
      
      // Retirer de l'état local et de la map
      setHistory(prev => prev.filter(item => item.id !== numericId && item.id.toString() !== songId));
      setIdMap(prev => {
        const newMap = new Map(prev);
        newMap.delete(numericId);
        return newMap;
      });
      console.log('✅ Song deleted from history');
    } catch (error) {
      console.error('Error deleting song:', error);
    }
  };

  return (
    <HistoryContext.Provider value={{
      history,
      addToHistory,
      markAsCopied,
      deleteSong,
      toggleFavorite,
      refreshHistory,
      loading,
    }}>
      {children}
    </HistoryContext.Provider>
  );
};

