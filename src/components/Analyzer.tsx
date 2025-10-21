import React, { useState, useContext } from 'react';
import GlassCard from './common/GlassCard';
import Loader from './common/Loader';
import { analyzeSongStyle } from '../services/geminiService';
import { SettingsContext, UIActionContext, AchievementContext } from '../contexts/AppContexts';
import { UserContext } from '../contexts/SupabaseUserContext';
import { DataContext } from '../contexts/DataContext';
import { SubscriptionPlan } from '../types';
import PlanLockOverlay from './common/PlanLockOverlay';
import { usePlanRestrictions } from '../hooks/usePlanRestrictions';
import * as achievementService from '../services/achievementService';
import { supabase } from '../services/supabaseClient';

const Analyzer: React.FC = () => {
  const [artistName, setArtistName] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');
  const { settings } = useContext(SettingsContext);
  const { user, deductCredits } = useContext(UserContext);
  const { onAuthOpen, onUpgradeOpen } = useContext(UIActionContext);
  const { triggerAchievementCheck } = useContext(AchievementContext);
  const appData = useContext(DataContext);

  // Utiliser notre nouveau système de restrictions
  const planRestrictions = usePlanRestrictions();

  if (!appData) {
    return (
      <GlassCard><div className="p-4"><Loader text="Chargement..." /></div></GlassCard>
    );
  }
  const { creditCosts, plans } = appData;

  const analyzerAccess = planRestrictions.getAnalyzerAccess();


  const handleAnalyze = async () => {
    if (!artistName || !songTitle) {
      setError("Veuillez renseigner le nom de l'artiste et le titre de la chanson.");
      return;
    }

    if (!analyzerAccess.canUse) {
      setError(analyzerAccess.restrictionMessage);
      if (!user.isAuthenticated) {
        onAuthOpen();
      } else if (!analyzerAccess.hasAccess) {
        onUpgradeOpen();
      }
      return;
    }

    setError('');
    setIsLoading(true);
    setPrompt('');
    try {
      const result = await analyzeSongStyle(artistName, songTitle, settings);
      setPrompt(result);
      deductCredits(analyzerAccess.cost);
      triggerAchievementCheck('ANALYZE_SONG');
      
      // Incrémenter les stats d'utilisation de l'analyseur
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.id) {
          await achievementService.incrementAnalyzerStats(session.user.id);
          console.log('📊 Analyzer stats updated');
          
          // Vérifier les achievements
          triggerAchievementCheck();
        }
      } catch (error) {
        console.error('Error updating analyzer stats:', error);
      }
    } catch (e) {
      setError('Une erreur est survenue lors de l\'analyse. Veuillez réessayer.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <GlassCard>
        <div className="p-4">
          <h2 className="text-3xl font-bold mb-2 text-base-color">Analyseur de Style</h2>
          <p className="text-muted-color mb-6">Générez un style prompt Suno AI en analysant une chanson existante.</p>
          
          <PlanLockOverlay
            isLocked={!analyzerAccess.hasAccess}
            requiredPlanName={analyzerAccess.requiredPlanName}
            isAuthenticated={user.isAuthenticated}
            size="large"
          >
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                    type="text"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    placeholder="Nom de l'artiste (ex: Daft Punk)"
                    className="w-full bg-white/50 dark:bg-black/30 border border-slate-300 dark:border-slate-600 rounded-lg p-3 placeholder-color text-base-color"
                    />
                    <input
                    type="text"
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    placeholder="Titre de la chanson (ex: Around the World)"
                    className="w-full bg-white/50 dark:bg-black/30 border border-slate-300 dark:border-slate-600 rounded-lg p-3 placeholder-color text-base-color"
                    />
                </div>
              <button
                  onClick={handleAnalyze}
                  disabled={isLoading || !artistName || !songTitle || !analyzerAccess.hasEnoughCredits}
                  className="w-full mt-4 py-3 px-6 bg-gradient-to-r from-primary to-secondary text-on-gradient font-bold rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  {isLoading ? 'Analyse en cours...' : !analyzerAccess.hasEnoughCredits ? 'Crédits insuffisants' : `Analyser le Style (${analyzerAccess.cost} crédits)`}
              </button>
            </div>
          </PlanLockOverlay>

          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

          {isLoading && <Loader text="Analyse en cours..." />}

          {prompt && (
            <div className="mt-8 animate-fade-in">
              <h3 className="text-xl font-semibold mb-2 text-base-color">Style Prompt Généré</h3>
              <div className="relative p-4 bg-black/20 rounded-lg">
                <p className="whitespace-pre-wrap font-mono text-sm text-base-color">{prompt}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(prompt)}
                  className="absolute top-2 right-2 p-1.5 rounded-md bg-white/20 hover:bg-white/30 text-base-color transition-colors"
                  title="Copier"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

export default Analyzer;