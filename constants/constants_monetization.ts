import { Plan, SubscriptionPlan, CreditPack } from '../src/types';

export const CREDIT_COSTS = {
  descriptive: 30,
  artist: 30,
  anime: 30,
  instrumental: 25,
  lyricsImport: 20, // New cost for importing lyrics
  analyzer: 75,
  editor: 15, // La modification est gratuite pour les abonnés
  albumArt: 75,
  burstAlbumArt: 250, // Coût pour 4 images
  burstSong: 150, // Coût pour 3 chansons
  personalized: 30, // Coût pour la génération avec IA-Training
  profileCreation: 1000, // Coût pour la création/entraînement d'un profil
  marketingKit: 250, // Coût pour le kit marketing
  songTitle: 5, // Coût pour générer un titre
  specialTrait: 3, 
  extraStyle: 3,
  extraAmbiance: 3,
};


// IMPORTANT: Price IDs générés automatiquement par stripe_setup.cjs
export const CREDIT_PACKS: CreditPack[] = [
    { credits: 150, price: '1,99€', stripePriceId: 'price_1SIXUxQs5exHskQ3zsIumAqJ' },
    { credits: 450, price: '4,99€', stripePriceId: 'price_1SIXUyQs5exHskQ3oCMj8iZf' },
    { credits: 1000, price: '9,99€', stripePriceId: 'price_1SIXUyQs5exHskQ3XEjCtRXF' },
    { credits: 2200, price: '19,99€', stripePriceId: 'price_1SIXUzQs5exHskQ3MK4yzbSg' },
    { credits: 4500, price: '34,99€', stripePriceId: 'price_1SIXUzQs5exHskQ3GzY8sfmv' },
    { credits: 7200, price: '49,99€', stripePriceId: 'price_1SIXV0Qs5exHskQ3sMyDvr5t' },
];

// IMPORTANT: Remplacez ces valeurs par vos propres "Price ID" depuis votre tableau de bord Stripe.
export const PLANS: Plan[] = [
  {
    id: SubscriptionPlan.Free,
    name: 'Découverte',
    price: '0€',
    priceDetails: 'Pour toujours',
    credits: 150,
    stripePriceId: '0€', 
    features: [
      `150 crédits offerts à l'inscription`,
      `Génération de texte simple (${CREDIT_COSTS.descriptive} crédits)`,
      'Accès limité aux langues et artistes',
      'Fonctionnalités avancées verrouillées',
    ],
  },
  {
    id: SubscriptionPlan.Creator,
    name: 'Créateur',
    price: '9,99€',
    priceDetails: '/ mois',
    credits: 1700,
    stripePriceId: 'price_1SIXV0Qs5exHskQ3Z0baDgHD',
    features: [
      '1,700 crédits par mois',
      'Tous les modes de génération de base',
      `Génération de pochette (${CREDIT_COSTS.albumArt} crédits)`,
      `Éditeur d'image & paroles (Gratuit)`,
      'Accès aux Caractéristiques Spéciales',
      'Accès à toutes les langues',
    ],
  },
  {
    id: SubscriptionPlan.Pro,
    name: 'Pro',
    price: '19,99€',
    priceDetails: '/ mois',
    credits: 3500,
    stripePriceId: 'price_1SIXV1Qs5exHskQ39PF0gjJY',
    isMostPopular: true,
    features: [
      'Tout du plan Créateur',
      '3,500 crédits par mois',
      `Analyseur de Style débloqué (${CREDIT_COSTS.analyzer} crédits)`,
      `Pochettes en Rafale (x4) (${CREDIT_COSTS.burstAlbumArt} crédits)`,
      `Options de structure avancées`,
    ],
  },
   {
    id: SubscriptionPlan.Ultimate,
    name: 'Ultimate',
    price: '39,99€',
    priceDetails: '/ mois',
    credits: 7000,
    stripePriceId: 'price_1SIXV1Qs5exHskQ3L65E8mIt',
    features: [
      'Tout du plan Pro',
      '7,000 crédits par mois',
      `Chansons en Rafale (x3) (${CREDIT_COSTS.burstSong} crédits)`,
      `IA-Training (Profil Perso) (${CREDIT_COSTS.personalized} crédits)`,
      'Accès anticipé aux nouvelles fonctionnalités',
    ],
  },
  {
    id: SubscriptionPlan.Business,
    name: 'Business',
    price: '79,99€',
    priceDetails: '/ mois',
    credits: 15000,
    stripePriceId: 'price_1SIXV2Qs5exHskQ3S4A9QWKh',
    features: [
      'Tout du plan Ultimate',
      `15,000 crédits par mois`,
      `Génération de Kit Marketing (${CREDIT_COSTS.marketingKit} crédits)`,
      'Support prioritaire 24/7',
      'Consultation pour fonctionnalités sur mesure',
    ],
  },
  {
    id: SubscriptionPlan.CreatorAnnual,
    name: 'Créateur Annuel',
    price: '99,99€',
    priceDetails: '/ an (2 mois offerts)',
    credits: 1700,
    stripePriceId: 'price_1SIXV2Qs5exHskQ38vqTPTIc',
    features: [
      'Tous les avantages du plan Créateur',
      'Facturation annuelle pour une meilleure valeur',
    ],
  },
  {
    id: SubscriptionPlan.ProAnnual,
    name: 'Pro Annuel',
    price: '199,99€',
    priceDetails: '/ an (2 mois offerts)',
    credits: 3500,
    stripePriceId: 'price_1SIXV3Qs5exHskQ3HinlywT0',
    features: [
      'Tous les avantages du plan Pro',
      'Facturation annuelle pour une meilleure valeur',
    ],
  },
   {
    id: SubscriptionPlan.UltimateAnnual,
    name: 'Ultimate Annuel',
    price: '399,99€',
    priceDetails: '/ an (2 mois offerts)',
    credits: 7000,
    stripePriceId: 'price_1SIXV3Qs5exHskQ3bj0qo4C0',
    features: [
      'Tous les avantages du plan Ultimate',
      'Facturation annuelle pour une meilleure valeur',
    ],
  },
  {
    id: SubscriptionPlan.BusinessAnnual,
    name: 'Business Annuel',
    price: '799,99€',
    priceDetails: '/ an (2 mois offerts)',
    credits: 15000,
    stripePriceId: 'price_1SIXV4Qs5exHskQ3nvOeRyia',
    features: [
      'Tous les avantages du plan Business',
      'Facturation annuelle pour une meilleure valeur',
    ],
  },
  {
    id: SubscriptionPlan.SecretSociety,
    name: 'Lyr-IA Society',
    price: 'Sur Invitation',
    priceDetails: 'Accès illimité',
    credits: 'unlimited',
    stripePriceId: '', // Pas de prix pour le cacher
    features: [
      'Accès total à toutes les fonctionnalités actuelles et futures',
      'Crédits illimités',
      'Statut secret et prestigieux',
      'Support ultra-prioritaire',
    ],
  },
];
