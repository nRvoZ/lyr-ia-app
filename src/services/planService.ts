import { SubscriptionPlan, UserState } from '../types';
import { PLANS, CREDIT_COSTS } from '@constants/constants_monetization';

export interface PlanPermissions {
  canUseGenerator: boolean;
  canUseAnalyzer: boolean;
  canUseEditor: boolean;
  canGenerateAlbumArt: boolean;
  canGenerateBurstArt: boolean;
  canGenerateMarketingKit: boolean;
  canUsePersonalizedMode: boolean;
  canUseAnimeMode: boolean;
  canUseArtistMode: boolean;
  canUseInstrumentalMode: boolean;
  canUseLyricsImport: boolean;
  hasAdminAccess: boolean;
  hasUnlimitedCredits: boolean;

  // Structure et contrôles
  manualStructure: boolean;
  advancedStructure: boolean;
  varyChorus: boolean;
  instrumentalParts: boolean;
}

export interface PlanTransition {
  fromPlan: SubscriptionPlan;
  toPlan: SubscriptionPlan;
  newCredits: number | 'unlimited';
  shouldPreserveAdminAccess: boolean;
}

/**
 * Service centralisé pour la gestion des plans d'abonnement
 */
export class PlanService {
  
  /**
   * Obtient les permissions pour un plan donné
   */
  static getPlanPermissions(plan: SubscriptionPlan, isAdmin: boolean = false): PlanPermissions {
    const basePermissions: PlanPermissions = {
      canUseGenerator: true, // Tous les plans peuvent utiliser le générateur de base
      canUseAnalyzer: false,
      canUseEditor: false,
      canGenerateAlbumArt: false,
      canGenerateBurstArt: false,
      canGenerateMarketingKit: false,
      canUsePersonalizedMode: false,
      canUseAnimeMode: false,
      canUseArtistMode: false,
      canUseInstrumentalMode: false,
      canUseLyricsImport: false,
      hasAdminAccess: isAdmin,
      hasUnlimitedCredits: false,

      // Structure et contrôles - par défaut restrictif
      manualStructure: false,
      advancedStructure: false,
      varyChorus: false,
      instrumentalParts: false,
    };

    switch (plan) {
      case SubscriptionPlan.Free:
        // Plan gratuit : accès très limité
        return {
          ...basePermissions,
          canUseEditor: false, // Pas d'éditeur pour le plan gratuit
          // Structure : seulement auto
          manualStructure: false,
          advancedStructure: false,
          varyChorus: false,
          instrumentalParts: false,
        };

      case SubscriptionPlan.Creator:
      case SubscriptionPlan.CreatorAnnual:
        return {
          ...basePermissions,
          canUseEditor: true,
          canGenerateAlbumArt: true,
          canUseInstrumentalMode: true,
          canUseLyricsImport: true,
          // Structure : manuel + varier refrains
          manualStructure: true,
          advancedStructure: false,
          varyChorus: true,
          instrumentalParts: false,
        };

      case SubscriptionPlan.Pro:
      case SubscriptionPlan.ProAnnual:
        return {
          ...basePermissions,
          canUseEditor: true,
          canUseAnalyzer: true,
          canGenerateAlbumArt: true,
          canGenerateBurstArt: true,
          canUseAnimeMode: true,
          canUseArtistMode: true,
          canUseInstrumentalMode: true,
          canUseLyricsImport: true,
          // Structure : manuel + avancé + parties instrumentales
          manualStructure: true,
          advancedStructure: true,
          varyChorus: true,
          instrumentalParts: true,
        };

      case SubscriptionPlan.Ultimate:
      case SubscriptionPlan.UltimateAnnual:
        return {
          ...basePermissions,
          canUseEditor: true,
          canUseAnalyzer: true,
          canGenerateAlbumArt: true,
          canGenerateBurstArt: true,
          canUsePersonalizedMode: true,
          canUseAnimeMode: true,
          canUseArtistMode: true,
          canUseInstrumentalMode: true,
          canUseLyricsImport: true,
          // Structure : accès complet
          manualStructure: true,
          advancedStructure: true,
          varyChorus: true,
          instrumentalParts: true,
        };

      case SubscriptionPlan.Business:
      case SubscriptionPlan.BusinessAnnual:
        return {
          ...basePermissions,
          canUseEditor: true,
          canUseAnalyzer: true,
          canGenerateAlbumArt: true,
          canGenerateBurstArt: true,
          canGenerateMarketingKit: true,
          canUsePersonalizedMode: true,
          canUseAnimeMode: true,
          canUseArtistMode: true,
          canUseInstrumentalMode: true,
          canUseLyricsImport: true,
          // Structure : accès complet
          manualStructure: true,
          advancedStructure: true,
          varyChorus: true,
          instrumentalParts: true,
        };

      case SubscriptionPlan.SecretSociety:
        // Lyr-IA Society : accès total à tout
        return {
          ...basePermissions,
          canUseEditor: true,
          canUseAnalyzer: true,
          canGenerateAlbumArt: true,
          canGenerateBurstArt: true,
          canGenerateMarketingKit: true,
          canUsePersonalizedMode: true,
          canUseAnimeMode: true,
          canUseArtistMode: true,
          canUseInstrumentalMode: true,
          canUseLyricsImport: true,
          hasAdminAccess: true, // Lyr-IA Society a toujours accès admin
          hasUnlimitedCredits: true,
          // Structure : accès total
          manualStructure: true,
          advancedStructure: true,
          varyChorus: true,
          instrumentalParts: true,
        };

      default:
        return basePermissions;
    }
  }

  /**
   * Vérifie si un utilisateur a accès à une fonctionnalité spécifique
   */
  static hasAccess(user: UserState, feature: keyof PlanPermissions): boolean {
    const permissions = this.getPlanPermissions(user.plan, user.isAdmin);
    return permissions[feature];
  }

  /**
   * Vérifie si un utilisateur a suffisamment de crédits pour une action
   */
  static hasEnoughCredits(user: UserState, cost: number): boolean {
    if (user.credits === 'unlimited') return true;
    return user.credits >= cost;
  }

  /**
   * Normalise les crédits selon le plan (corrige les incohérences de base de données)
   */
  static normalizeCreditsToPlan(plan: SubscriptionPlan, currentCredits: number | 'unlimited'): number | 'unlimited' {
    console.log('🔧 Normalizing credits for plan:', { plan, currentCredits });

    const planData = PLANS.find(p => p.id === plan);
    if (!planData) {
      console.log('❌ Plan data not found for:', plan);
      return currentCredits;
    }

    console.log('📊 Plan data found:', planData);

    // Si le plan a des crédits illimités, on garde unlimited
    if (typeof planData.credits === 'string') {
      console.log('✨ Plan has unlimited credits');
      return 'unlimited';
    }

    // Si l'utilisateur a unlimited mais le plan ne le permet pas, on donne les crédits du plan
    if (currentCredits === 'unlimited') {
      console.log('📉 User has unlimited but plan is limited, setting to:', planData.credits);
      return planData.credits;
    }

    // Pour les plans normaux, on donne exactement les crédits du plan (pas le maximum)
    if (typeof currentCredits === 'number' && typeof planData.credits === 'number') {
      console.log('🔄 Setting credits to plan amount:', planData.credits);
      return planData.credits;
    }

    console.log('🤷 No change needed, returning current credits');
    return currentCredits;
  }

  /**
   * Calcule les nouveaux crédits lors d'une transition de plan
   */
  static calculatePlanTransition(fromPlan: SubscriptionPlan, toPlan: SubscriptionPlan, currentCredits: number | 'unlimited', isAdmin: boolean = false): PlanTransition {
    console.log('🔄 Calculating plan transition:', { fromPlan, toPlan, currentCredits, isAdmin });

    const fromPlanData = PLANS.find(p => p.id === fromPlan);
    const toPlanData = PLANS.find(p => p.id === toPlan);

    console.log('📊 Plan data:', { fromPlanData, toPlanData });

    if (!fromPlanData || !toPlanData) {
      throw new Error(`Plan non trouvé: ${fromPlan} -> ${toPlan}`);
    }

    // Normaliser les crédits actuels selon le plan actuel (corrige les incohérences)
    const normalizedCurrentCredits = this.normalizeCreditsToPlan(fromPlan, currentCredits);
    console.log('🔧 Crédits normalisés:', { original: currentCredits, normalized: normalizedCurrentCredits });

    let newCredits: number | 'unlimited';

    // Logique spéciale pour Lyr-IA Society
    if (toPlan === SubscriptionPlan.SecretSociety) {
      console.log('✨ Transition vers Lyr-IA Society - crédits illimités');
      newCredits = 'unlimited';
    } else if (fromPlan === SubscriptionPlan.SecretSociety) {
      // Si on quitte Lyr-IA Society, on reçoit les crédits du nouveau plan
      console.log('📉 Quitte Lyr-IA Society - crédits du nouveau plan:', toPlanData.credits);
      newCredits = toPlanData.credits;
    } else {
      // Transition normale entre plans
      if (typeof toPlanData.credits === 'string') {
        console.log('✨ Nouveau plan a des crédits illimités');
        newCredits = 'unlimited';
      } else if (typeof normalizedCurrentCredits === 'string') {
        // Si on avait unlimited et qu'on passe à un plan limité
        console.log('📉 Avait unlimited, passe à limité:', toPlanData.credits);
        newCredits = toPlanData.credits;
      } else {
        // Logique de transition des crédits
        const fromCredits = typeof fromPlanData.credits === 'string' ? 0 : Number(fromPlanData.credits);
        const toCredits = typeof toPlanData.credits === 'string' ? 0 : Number(toPlanData.credits);

        // Assure que normalizedCurrentCredits est numérique dans cette branche
        const currentCreditsNumeric = typeof normalizedCurrentCredits === 'number' ? normalizedCurrentCredits : 0;

        console.log('🔄 Transition normale:', { fromCredits, toCredits, normalizedCurrentCredits });

        if (toCredits > fromCredits) {
          // Upgrade : on ajoute la différence
          newCredits = currentCreditsNumeric + (toCredits - fromCredits);
          console.log('📈 Upgrade - ajout de la différence:', newCredits);
        } else {
          // Downgrade : on garde les crédits actuels ou le minimum du nouveau plan
          newCredits = Math.max(currentCreditsNumeric, toCredits);
          console.log('📉 Downgrade - garde le max:', newCredits);
        }
      }
    }

    console.log('✅ Nouveaux crédits calculés:', newCredits);

    return {
      fromPlan,
      toPlan,
      newCredits,
      shouldPreserveAdminAccess: isAdmin && (fromPlan === SubscriptionPlan.SecretSociety || toPlan === SubscriptionPlan.SecretSociety)
    };
  }

  /**
   * Obtient le plan minimum requis pour une fonctionnalité
   */
  static getMinimumPlanForFeature(feature: keyof PlanPermissions): SubscriptionPlan | null {
    const planOrder = [
      SubscriptionPlan.Free,
      SubscriptionPlan.Creator,
      SubscriptionPlan.Pro,
      SubscriptionPlan.Ultimate,
      SubscriptionPlan.Business,
      SubscriptionPlan.SecretSociety
    ];

    for (const plan of planOrder) {
      const permissions = this.getPlanPermissions(plan);
      if (permissions[feature]) {
        return plan;
      }
    }

    return null;
  }

  /**
   * Vérifie si un plan est un upgrade par rapport à un autre
   */
  static isUpgrade(fromPlan: SubscriptionPlan, toPlan: SubscriptionPlan): boolean {
    const planHierarchy = {
      [SubscriptionPlan.Free]: 0,
      [SubscriptionPlan.Creator]: 1,
      [SubscriptionPlan.CreatorAnnual]: 1,
      [SubscriptionPlan.Pro]: 2,
      [SubscriptionPlan.ProAnnual]: 2,
      [SubscriptionPlan.Ultimate]: 3,
      [SubscriptionPlan.UltimateAnnual]: 3,
      [SubscriptionPlan.Business]: 4,
      [SubscriptionPlan.BusinessAnnual]: 4,
      [SubscriptionPlan.SecretSociety]: 5,
    };

    return planHierarchy[toPlan] > planHierarchy[fromPlan];
  }

  /**
   * Obtient un message d'erreur personnalisé pour une restriction
   */
  static getRestrictionMessage(user: UserState, feature: keyof PlanPermissions): string {
    if (!user.isAuthenticated) {
      return "Connectez-vous pour accéder à cette fonctionnalité.";
    }

    const minPlan = this.getMinimumPlanForFeature(feature);
    if (!minPlan) {
      return "Cette fonctionnalité n'est pas disponible.";
    }

    const planData = PLANS.find(p => p.id === minPlan);
    const planName = planData?.name || minPlan;

    return `Passez au plan ${planName} pour accéder à cette fonctionnalité.`;
  }
}
