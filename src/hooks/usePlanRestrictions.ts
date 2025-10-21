import { useContext, useMemo } from 'react';
import { UserContext } from '../contexts/SupabaseUserContext';
import { DataContext } from '../contexts/DataContext';
import { PlanService, PlanPermissions } from '../services/planService';
import { SubscriptionPlan, GenerationMode } from '../types';

export interface FeatureAccess {
  hasAccess: boolean;
  hasEnoughCredits: boolean;
  canUse: boolean;
  cost: number;
  restrictionMessage: string;
  requiredPlan: SubscriptionPlan | null;
  requiredPlanName: string;
}

/**
 * Hook personnalisé pour gérer les restrictions de plan et les permissions
 */
export function usePlanRestrictions() {
  const { user } = useContext(UserContext);
  const appData = useContext(DataContext);

  const permissions = useMemo(() => {
    return PlanService.getPlanPermissions(user.plan, user.isAdmin);
  }, [user.plan, user.isAdmin]);

  const checkFeatureAccess = useMemo(() => {
    return (feature: keyof PlanPermissions, cost: number = 0): FeatureAccess => {
      const hasAccess = PlanService.hasAccess(user, feature);
      const hasEnoughCredits = cost === 0 || PlanService.hasEnoughCredits(user, cost);
      const canUse = hasAccess && hasEnoughCredits && user.isAuthenticated;
      
      const requiredPlan = hasAccess ? null : PlanService.getMinimumPlanForFeature(feature);
      const requiredPlanName = requiredPlan ? 
        appData?.plans.find(p => p.id === requiredPlan)?.name || requiredPlan : '';

      let restrictionMessage = '';
      if (!user.isAuthenticated) {
        restrictionMessage = "Connectez-vous pour accéder à cette fonctionnalité.";
      } else if (!hasAccess) {
        restrictionMessage = PlanService.getRestrictionMessage(user, feature);
      } else if (!hasEnoughCredits) {
        restrictionMessage = `Crédits insuffisants. ${cost} crédits requis.`;
      }

      return {
        hasAccess,
        hasEnoughCredits,
        canUse,
        cost,
        restrictionMessage,
        requiredPlan,
        requiredPlanName
      };
    };
  }, [user, appData]);

  const checkGenerationMode = useMemo(() => {
    return (mode: GenerationMode, extraCosts: { specialTraits?: number, styles?: number, ambiances?: number } = {}): FeatureAccess => {
      if (!appData) {
        return {
          hasAccess: false,
          hasEnoughCredits: false,
          canUse: false,
          cost: 0,
          restrictionMessage: "Chargement...",
          requiredPlan: null,
          requiredPlanName: ""
        };
      }

      const { creditCosts } = appData;
      let baseCost = 0;
      let hasAccess = true;
      let requiredPlan: SubscriptionPlan | null = null;

      switch (mode) {
        case GenerationMode.Descriptive:
          baseCost = creditCosts.descriptive;
          hasAccess = user.isAuthenticated;
          break;

        case GenerationMode.Artist:
          baseCost = creditCosts.artist;
          hasAccess = PlanService.hasAccess(user, 'canUseArtistMode');
          requiredPlan = SubscriptionPlan.Pro;
          break;

        case GenerationMode.AnimeOpening:
          baseCost = creditCosts.anime;
          hasAccess = PlanService.hasAccess(user, 'canUseAnimeMode');
          requiredPlan = SubscriptionPlan.Pro;
          break;

        case GenerationMode.Instrumental:
          baseCost = creditCosts.instrumental;
          hasAccess = PlanService.hasAccess(user, 'canUseInstrumentalMode');
          requiredPlan = SubscriptionPlan.Creator;
          break;

        case GenerationMode.LyricsImport:
          baseCost = creditCosts.lyricsImport;
          hasAccess = PlanService.hasAccess(user, 'canUseLyricsImport');
          requiredPlan = SubscriptionPlan.Creator;
          break;

        case GenerationMode.Personalized:
          baseCost = creditCosts.personalized;
          hasAccess = PlanService.hasAccess(user, 'canUsePersonalizedMode');
          requiredPlan = SubscriptionPlan.Ultimate;
          break;

        default:
          baseCost = creditCosts.descriptive;
          break;
      }

      // Ajouter les coûts supplémentaires
      const totalCost = baseCost + 
        (extraCosts.specialTraits || 0) * creditCosts.specialTrait +
        (extraCosts.styles || 0) * creditCosts.extraStyle +
        (extraCosts.ambiances || 0) * creditCosts.extraAmbiance;

      const hasEnoughCredits = PlanService.hasEnoughCredits(user, totalCost);
      const canUse = hasAccess && hasEnoughCredits && user.isAuthenticated;

      const requiredPlanName = requiredPlan ? 
        appData.plans.find(p => p.id === requiredPlan)?.name || requiredPlan : '';

      let restrictionMessage = '';
      if (!user.isAuthenticated) {
        restrictionMessage = "Connectez-vous pour générer des paroles.";
      } else if (!hasAccess) {
        restrictionMessage = `Passez au plan ${requiredPlanName} pour ce mode de génération.`;
      } else if (!hasEnoughCredits) {
        restrictionMessage = `Crédits insuffisants. ${totalCost} crédits requis.`;
      }

      return {
        hasAccess,
        hasEnoughCredits,
        canUse,
        cost: totalCost,
        restrictionMessage,
        requiredPlan,
        requiredPlanName
      };
    };
  }, [user, appData]);

  const getAlbumArtAccess = useMemo(() => {
    return (isBurst: boolean = false): FeatureAccess => {
      if (!appData) {
        return {
          hasAccess: false,
          hasEnoughCredits: false,
          canUse: false,
          cost: 0,
          restrictionMessage: "Chargement...",
          requiredPlan: null,
          requiredPlanName: ""
        };
      }

      const cost = isBurst ? appData.creditCosts.burstAlbumArt : appData.creditCosts.albumArt;
      const feature = isBurst ? 'canGenerateBurstArt' : 'canGenerateAlbumArt';
      
      return checkFeatureAccess(feature, cost);
    };
  }, [checkFeatureAccess, appData]);

  const getAnalyzerAccess = useMemo(() => {
    return (): FeatureAccess => {
      if (!appData) {
        return {
          hasAccess: false,
          hasEnoughCredits: false,
          canUse: false,
          cost: 0,
          restrictionMessage: "Chargement...",
          requiredPlan: null,
          requiredPlanName: ""
        };
      }

      return checkFeatureAccess('canUseAnalyzer', appData.creditCosts.analyzer);
    };
  }, [checkFeatureAccess, appData]);

  const getMarketingKitAccess = useMemo(() => {
    return (): FeatureAccess => {
      if (!appData) {
        return {
          hasAccess: false,
          hasEnoughCredits: false,
          canUse: false,
          cost: 0,
          restrictionMessage: "Chargement...",
          requiredPlan: null,
          requiredPlanName: ""
        };
      }

      return checkFeatureAccess('canGenerateMarketingKit', appData.creditCosts.marketingKit);
    };
  }, [checkFeatureAccess, appData]);

  return {
    permissions,
    checkFeatureAccess,
    checkGenerationMode,
    getAlbumArtAccess,
    getAnalyzerAccess,
    getMarketingKitAccess,
    hasAccess: (feature: keyof PlanPermissions) => PlanService.hasAccess(user, feature),
    hasEnoughCredits: (cost: number) => PlanService.hasEnoughCredits(user, cost),
    getRestrictionMessage: (feature: keyof PlanPermissions) => PlanService.getRestrictionMessage(user, feature),
    getMinimumPlanForFeature: (feature: keyof PlanPermissions) => {
      const plan = PlanService.getMinimumPlanForFeature(feature);
      return plan ? appData?.plans.find(p => p.id === plan)?.name || plan : '';
    },
  };
}
