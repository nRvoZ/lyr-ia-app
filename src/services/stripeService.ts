// src/services/stripeService.ts (Version Finale et Corrigée)

import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabaseClient';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn("Avertissement : La clé publique Stripe (VITE_STRIPE_PUBLISHABLE_KEY) est manquante. Les paiements ne fonctionneront pas.");
}

// On charge Stripe seulement quand nécessaire pour éviter les erreurs au démarrage
let stripePromise: Promise<any> | null = null;

const getStripe = () => {
  if (!stripePromise && stripePublishableKey) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
};

export const redirectToCheckout = async (priceId: string, mode: 'payment' | 'subscription', userId?: string, credits?: number) => {
  try {
    if (!stripePublishableKey) {
      throw new Error("Stripe n'est pas configuré. Veuillez contacter l'administrateur.");
    }

    console.log('🚀 Calling create-checkout-session with:', JSON.stringify({ priceId, mode, userId, credits }, null, 2));

    // 1. On appelle notre backend pour créer une session de paiement sécurisée.
    const { data, error: functionError } = await supabase.functions.invoke('create-checkout-session', {
      body: { priceId, mode, userId, credits },
    });

    console.log('📥 Response from Edge Function - Data:', JSON.stringify(data, null, 2));
    console.log('📥 Response from Edge Function - Error:', JSON.stringify(functionError, null, 2));

    if (functionError) {
      console.error('❌ Edge Function Error Details:', JSON.stringify({
        message: functionError.message,
        context: functionError.context,
        details: functionError.details,
        hint: functionError.hint,
        code: functionError.code,
        status: functionError.status
      }, null, 2));
      
      // Si on a un message d'erreur dans data, l'afficher aussi
      if (data) {
        console.error('❌ Error Response Body:', JSON.stringify(data, null, 2));
      }
      
      throw new Error(`Stripe Error: ${data?.error || functionError.message || 'Unknown error'}`);
    }

    // 2. On charge et attend que la librairie Stripe soit bien chargée.
    const stripePromise = getStripe();
    if (!stripePromise) {
      throw new Error("Impossible de charger Stripe. Vérifiez votre connexion internet.");
    }
    const stripe = await stripePromise;

    if (!stripe) {
      throw new Error("Stripe.js n'a pas pu être chargé. Vérifiez votre connexion internet.");
    }
    if (!data || !data.sessionId) {
      throw new Error("La session Stripe n'a pas pu être créée correctement.");
    }

    // Correction du typage : stripe est typé par @stripe/stripe-js, on attend un objet avec sessionId
    const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.sessionId as string });

    if (stripeError) {
      throw stripeError;
    }
  } catch (error) {
    console.error("Erreur lors de la redirection vers Stripe:", error);
    // Ici, vous pourriez afficher une notification à l'utilisateur pour l'informer du problème.
  }
};