import Stripe from 'https://esm.sh/stripe@17.6.0?target=deno&no-check';

const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
if (!stripeKey) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

const stripe = new Stripe(stripeKey, {
  apiVersion: '2024-11-20.acacia',
  httpClient: Stripe.createFetchHttpClient(),
});

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

// Helper pour faire des requêtes à Supabase sans le client JS
async function supabaseQuery(table: string, method: string, body?: unknown) {
  const url = `${supabaseUrl}/rest/v1/${table}`;
  const headers: Record<string, string> = {
    'apikey': supabaseServiceKey!,
    'Authorization': `Bearer ${supabaseServiceKey}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal',
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  
  if (!response.ok) {
    const error = await response.text();
    console.error(`Supabase query error:`, error);
    throw new Error(`Supabase query failed: ${response.status} ${error}`);
  }

  if (response.status === 204) {
    return null;
  }

  // Vérifier si la réponse a du contenu
  const text = await response.text();
  if (!text || text.trim() === '') {
    return null;
  }
  
  return JSON.parse(text);
}

// Helper pour appeler une fonction RPC
async function supabaseRpc(functionName: string, params: unknown) {
  const url = `${supabaseUrl}/rest/v1/rpc/${functionName}`;
  const headers: Record<string, string> = {
    'apikey': supabaseServiceKey!,
    'Authorization': `Bearer ${supabaseServiceKey}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(params),
  });

  // Lire le texte une seule fois
  const text = await response.text();
  
  if (!response.ok) {
    console.error(`Supabase RPC error:`, text);
    throw new Error(`Supabase RPC failed: ${response.status} ${text}`);
  }

  // Vérifier si la réponse a du contenu
  if (!text || text.trim() === '') {
    return null;
  }
  
  return JSON.parse(text);
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req: Request) => {
  console.log('🚀 Webhook called - Version 23 - Handle payment_intent.succeeded with session lookup');
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Log toutes les headers pour debug
    console.log('📋 Request headers:', Object.fromEntries(req.headers.entries()));
    
    const signature = req.headers.get('stripe-signature');
    const body = await req.text();
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    console.log('📋 Webhook secret configured:', !!webhookSecret);
    console.log('📋 Signature present:', !!signature);
    console.log('📋 Body length:', body.length);

    if (!signature) {
      console.error('❌ No Stripe signature found in headers');
      throw new Error('Missing Stripe signature');
    }
    
    if (!webhookSecret) {
      console.error('❌ STRIPE_WEBHOOK_SECRET not configured in Supabase');
      throw new Error('Missing webhook secret configuration');
    }

    // Vérifier la signature du webhook (async pour Deno)
    const event = await stripe.webhooks?.constructEventAsync(body, signature, webhookSecret);
    if (!event) throw new Error('Failed to construct webhook event');

    console.log(`🔔 Webhook reçu: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('📦 Processing checkout.session.completed');
        await handleCheckoutCompleted(session);
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('💳 Processing payment_intent.succeeded:', paymentIntent.id);
        
        // Récupérer la session Stripe associée à ce payment intent
        try {
          const sessions = await stripe.checkout.sessions.list({
            payment_intent: paymentIntent.id,
            limit: 1
          });
          
          if (sessions.data.length > 0) {
            const session = sessions.data[0];
            console.log('📦 Session trouvée:', session.id);
            await handleCheckoutCompleted(session);
          } else {
            console.log('⚠️ Aucune session trouvée pour ce payment_intent');
          }
        } catch (error) {
          console.error('❌ Erreur lors de la récupération de la session:', error);
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('📋 Processing invoice.payment_succeeded');
        await handleSubscriptionPayment(invoice);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`🔄 Processing ${event.type}`);
        await handleSubscriptionChange(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('❌ Processing customer.subscription.deleted');
        await handleSubscriptionCancellation(subscription);
        break;
      }

      default:
        console.log(`🤷‍♂️ Événement non géré: ${event.type}`);
    }

    return new Response('OK', { 
      status: 200,
      headers: corsHeaders 
    });

  } catch (error) {
    console.error('❌ Erreur webhook:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(`Webhook Error: ${errorMessage}`, { 
      status: 400,
      headers: corsHeaders 
    });
  }
});

// Cache pour éviter de traiter deux fois la même session
const processedSessions = new Set<string>();

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('✅ Checkout completed:', session.id);
  
  // Vérifier si cette session a déjà été traitée
  if (processedSessions.has(session.id)) {
    console.log('⏭️ Session déjà traitée, on ignore:', session.id);
    return;
  }
  processedSessions.add(session.id);
  
  console.log('📦 Session metadata:', JSON.stringify(session.metadata));
  console.log('📦 Session mode:', session.mode);
  console.log('📦 Payment intent:', session.payment_intent);

  const userId = session.metadata?.userId;
  const credits = parseInt(session.metadata?.credits || '0');
  const mode = session.mode;
  const customerId = session.customer as string;

  if (!userId) {
    console.error('❌ userId manquant dans les métadonnées de la session');
    console.error('📦 Full session object:', JSON.stringify(session, null, 2));
    return;
  }

  // Enregistrer le customer_id Stripe dans le profil utilisateur s'il n'existe pas
  if (customerId) {
    console.log(`💾 Enregistrement du customer_id ${customerId} pour l'utilisateur ${userId}`);
    const updateUrl = `${supabaseUrl!}/rest/v1/user_profiles?id=eq.${userId}`;
    const headers: Record<string, string> = {
      'apikey': supabaseServiceKey!,
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal',
    };
    await fetch(updateUrl, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ 
        stripe_customer_id: customerId
      }),
    });
  }

  if (mode === 'payment') {
    // One-time payment (achat de crédits)
    if (!credits || credits === 0) {
      console.error('❌ Nombre de crédits manquant pour un paiement one-time');
      return;
    }

    console.log(`💳 Paiement one-time: ${credits} crédits pour l'utilisateur ${userId}`);

    // Enregistrer la transaction
    await supabaseQuery('payment_transactions', 'POST', {
      user_id: userId,
      stripe_payment_intent_id: session.payment_intent as string,
      amount: session.amount_total,
      currency: session.currency,
      status: 'succeeded',
      type: 'credits',
      credits_purchased: credits
    });

    // Ajouter les crédits à l'utilisateur
    try {
      console.log(`🔄 Appel de add_user_credits avec: user_id=${userId}, credits_to_add=${credits}`);
      const result = await supabaseRpc('add_user_credits', {
        user_id: userId,
        credits_to_add: credits
      });
      console.log(`📊 Résultat RPC:`, JSON.stringify(result));
      console.log(`✅ ${credits} crédits ajoutés à l'utilisateur ${userId}`);
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout des crédits:', error);
      console.error('❌ Stack trace:', error instanceof Error ? error.stack : 'No stack');
      throw error; // Re-throw pour voir l'erreur dans les logs principaux
    }
  } else if (mode === 'subscription') {
    // Subscription (abonnement)
    console.log(`🔄 Nouvel abonnement pour l'utilisateur ${userId}`);
    
    // On délègue au handler d'abonnement en passant le userId pour les nouveaux abonnements
    if (session.subscription) {
      const subscription = await stripe.subscriptions?.retrieve(session.subscription as string);
      if (subscription) {
        await handleSubscriptionChange(subscription, userId);
      }
    }
  }
}

async function _handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  console.log('💳 Paiement réussi:', paymentIntent.id);

  const userId = paymentIntent.metadata.user_id;
  const credits = parseInt(paymentIntent.metadata.credits || '0');

  if (!userId || !credits) {
    console.error('❌ Métadonnées manquantes dans PaymentIntent');
    return;
  }

  // Enregistrer la transaction
  await supabaseQuery('payment_transactions', 'POST', {
    user_id: userId,
    stripe_payment_intent_id: paymentIntent.id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    status: 'succeeded',
    type: 'credits',
    credits_purchased: credits
  });

  // Ajouter les crédits à l'utilisateur
  try {
    await supabaseRpc('add_user_credits', {
      user_id: userId,
      credits_to_add: credits
    });
    console.log(`✅ ${credits} crédits ajoutés à l'utilisateur ${userId}`);
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout des crédits:', error);
  }
}

async function handleSubscriptionPayment(invoice: Stripe.Invoice) {
  console.log('📋 Paiement d\'abonnement:', invoice.id);

  const _customerId = invoice.customer as string;
  const subscriptionId = invoice.subscription as string;

  if (!subscriptionId) {
    console.log('⚠️ Pas de subscription dans cette invoice, on ignore');
    return;
  }

  // Récupérer les détails de l'abonnement et déléguer au handler principal
  const subscription = await stripe.subscriptions?.retrieve(subscriptionId);
  if (subscription) {
    await handleSubscriptionChange(subscription);
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription, overrideUserId?: string) {
  console.log('🔄 Changement d\'abonnement:', subscription.id);
  
  if (!subscription || !subscription.id) {
    console.error('❌ Subscription invalide');
    return;
  }
  
  const customerId = subscription.customer as string;
  const priceId = subscription.items.data[0]?.price.id;

  // Mapper le Price ID au plan et aux crédits
  const planMapping: Record<string, { name: string, credits: number }> = {
    'price_1SIXV0Qs5exHskQ3Z0baDgHD': { name: 'Creator', credits: 1700 },
    'price_1SIXV1Qs5exHskQ39PF0gjJY': { name: 'Pro', credits: 3500 },
    'price_1SIXV1Qs5exHskQ3L65E8mIt': { name: 'Ultimate', credits: 7000 },
    'price_1SIXV2Qs5exHskQ3S4A9QWKh': { name: 'Business', credits: 15000 },
    'price_1SIXV2Qs5exHskQ38vqTPTIc': { name: 'Creator Annual', credits: 1700 },
    'price_1SIXV3Qs5exHskQ3HinlywT0': { name: 'Pro Annual', credits: 3500 },
    'price_1SIXV3Qs5exHskQ3bj0qo4C0': { name: 'Ultimate Annual', credits: 7000 },
    'price_1SIXV4Qs5exHskQ3nvOeRyia': { name: 'Business Annual', credits: 15000 },
  };

  const planInfo = planMapping[priceId || ''] || { name: 'Creator', credits: 1700 };
  const planName = planInfo.name;
  const planCredits = planInfo.credits;

  console.log(`📦 Price ID: ${priceId} → Plan: ${planName}`);

  let userId = overrideUserId;
  
  // Si on n'a pas de userId fourni, chercher par customer ID
  if (!userId) {
    const url = `${supabaseUrl!}/rest/v1/user_profiles?stripe_customer_id=eq.${customerId}&select=id,plan`;
    console.log(`🔍 Recherche utilisateur avec customer_id: ${customerId}`);
    
    const headers: Record<string, string> = {
      'apikey': supabaseServiceKey!,
      'Authorization': `Bearer ${supabaseServiceKey}`,
    };
    const response = await fetch(url, { headers });

    const customers = await response.json();
    console.log(`🔍 Résultat recherche:`, JSON.stringify(customers));
    const customer = customers[0];
    
    if (customer) {
      userId = customer.id;
      console.log(`✅ Utilisateur trouvé: ${userId}, plan actuel: ${customer.plan}`);
    } else {
      console.error(`❌ Aucun utilisateur trouvé avec stripe_customer_id: ${customerId}`);
      return;
    }
  } else {
    console.log(`✅ Utilisation du userId fourni: ${userId}`);
  }

  // Mettre à jour le plan de l'utilisateur
  const updateUrl = `${supabaseUrl!}/rest/v1/user_profiles?id=eq.${userId}`;
  console.log(`📝 Mise à jour vers plan: ${planName} avec ${planCredits} crédits`);
  
  const headers: Record<string, string> = {
    'apikey': supabaseServiceKey!,
    'Authorization': `Bearer ${supabaseServiceKey}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal',
  };
  const updateResponse = await fetch(updateUrl, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ 
      plan: planName,
      credits: planCredits, // Crédits selon le plan
      stripe_subscription_id: subscription.id,
      subscription_status: subscription.status,
      subscription_current_period_end: subscription.current_period_end
    }),
  });

  if (!updateResponse.ok) {
    const errorText = await updateResponse.text();
    console.error(`❌ Erreur lors de la mise à jour du profil:`, errorText);
    throw new Error(`Failed to update user profile: ${errorText}`);
  }

  console.log(`✅ Plan ${planName} activé pour l'utilisateur ${userId}`);
}

async function handleSubscriptionCancellation(subscription: Stripe.Subscription) {
  console.log('❌ Annulation d\'abonnement:', subscription.id);

  const customerId = subscription.customer as string;

  // Trouver l'utilisateur et remettre au plan gratuit
  const url = `${supabaseUrl!}/rest/v1/user_profiles?stripe_customer_id=eq.${customerId}&select=id`;
  const headers: Record<string, string> = {
    'apikey': supabaseServiceKey!,
    'Authorization': `Bearer ${supabaseServiceKey}`,
  };
  const response = await fetch(url, { headers });

  const customers = await response.json();
  const customer = customers[0];

  if (customer) {
    const updateUrl = `${supabaseUrl!}/rest/v1/user_profiles?id=eq.${customer.id}`;
    const updateHeaders: Record<string, string> = {
      'apikey': supabaseServiceKey!,
      'Authorization': `Bearer ${supabaseServiceKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal',
    };
    await fetch(updateUrl, {
      method: 'PATCH',
      headers: updateHeaders,
      body: JSON.stringify({ 
        plan: 'Free',
        credits: 150, // Crédits de base
        stripe_subscription_id: null,
        subscription_status: 'canceled',
        subscription_current_period_end: null
      }),
    });

    console.log(`✅ Utilisateur ${customer.id} remis au plan gratuit`);
  }
}
