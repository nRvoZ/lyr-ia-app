import Stripe from 'stripe';

const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
if (!stripeKey) {
  throw new Error('STRIPE_SECRET_KEY is not configured');
}

// Cast to any to access resource helpers (customers, checkout, prices...) in Deno runtime typings
const stripe = new Stripe(stripeKey, {
  apiVersion: '2024-11-20.acacia',
  httpClient: Stripe.createFetchHttpClient(),
}) as any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { priceId, mode, userId, credits } = await req.json();

    console.log('Received request:', { priceId, mode, userId, credits });

    if (!priceId || !mode) {
      throw new Error('Missing priceId or mode');
    }

    // Check if Stripe key is configured
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeKey) {
      console.error('STRIPE_SECRET_KEY is not configured');
      throw new Error('Stripe is not configured on the server');
    }

    console.log('Stripe key is configured:', stripeKey.substring(0, 12) + '...');

    // Get the origin from the request with proper fallback
    let origin = req.headers.get('origin') || req.headers.get('referer') || '';
    
    console.log('Raw headers:', {
      origin: req.headers.get('origin'),
      referer: req.headers.get('referer'),
      host: req.headers.get('host')
    });
    
    // If referer is used, extract just the origin (protocol + host)
    if (!req.headers.get('origin') && origin) {
      try {
        const url = new URL(origin);
        origin = `${url.protocol}//${url.host}`;
      } catch (_e) {
        console.error('Failed to parse referer as URL:', origin);
      }
    }
    
    // If no origin/referer, construct from host header
    if (!origin) {
      const host = req.headers.get('host') || 'localhost:3000';
      origin = host.includes('localhost') ? `http://${host}` : `https://${host}`;
    }
    
    // Ensure origin has a scheme
    if (!origin.startsWith('http://') && !origin.startsWith('https://')) {
      origin = origin.includes('localhost') ? `http://${origin}` : `https://${origin}`;
    }
    
    // Remove trailing slash if present
    origin = origin.replace(/\/$/, '');

    console.log('Final origin used for Stripe:', origin);
    console.log('Creating Stripe session with:', {
      mode,
      priceId,
      origin,
      userId,
      credits,
    });

    // Récupérer le customer_id existant s'il existe
    let customerId: string | undefined;
    if (userId) {
      const supabaseUrl = Deno.env.get('SUPABASE_URL');
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      
      if (supabaseUrl && supabaseServiceKey) {
        const profileUrl = `${supabaseUrl}/rest/v1/user_profiles?id=eq.${userId}&select=stripe_customer_id`;
        const profileResponse = await fetch(profileUrl, {
          headers: {
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
          },
        });
        const profiles = await profileResponse.json();
        customerId = profiles[0]?.stripe_customer_id;
        console.log('Existing customer_id:', customerId);
      }
    }

    // Create Stripe Checkout Session
    const sessionParams: any = {
      mode: mode as 'payment' | 'subscription', // 'payment' for one-time, 'subscription' for recurring
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}?payment=success&priceId=${priceId}`,
      cancel_url: `${origin}?payment=cancel`,
      metadata: {
        userId: userId || '',
        credits: credits?.toString() || '0',
        priceId: priceId,
      },
    };

    // Réutiliser le customer existant ou en créer un nouveau
    if (customerId) {
      sessionParams.customer = customerId;
      console.log('Using existing Stripe customer:', customerId);
    } else {
      // customer_creation n'est supporté QUE en mode 'payment'
      if (mode === 'payment') {
        sessionParams.customer_creation = 'always';
        console.log('Mode payment: customer_creation enabled');
      } else {
        // En mode subscription sans customer existant, on doit créer le customer manuellement
        console.log('Mode subscription without existing customer - creating new customer');
        
        // Récupérer l'email de l'utilisateur depuis Supabase
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        
        if (supabaseUrl && supabaseServiceKey && userId) {
          const profileUrl = `${supabaseUrl}/rest/v1/user_profiles?id=eq.${userId}&select=email`;
          const profileResponse = await fetch(profileUrl, {
            headers: {
              'apikey': supabaseServiceKey,
              'Authorization': `Bearer ${supabaseServiceKey}`,
            },
          });
          const profiles = await profileResponse.json();
          const userEmail = profiles[0]?.email;
          
          if (userEmail) {
            // Créer un customer Stripe
            const customer = await stripe.customers.create({
              email: userEmail,
              metadata: { userId: userId }
            });
            
            sessionParams.customer = customer.id;
            console.log('Created new Stripe customer:', customer.id);
            
            // Sauvegarder le customer_id dans Supabase
            const updateUrl = `${supabaseUrl}/rest/v1/user_profiles?id=eq.${userId}`;
            await fetch(updateUrl, {
              method: 'PATCH',
              headers: {
                'apikey': supabaseServiceKey,
                'Authorization': `Bearer ${supabaseServiceKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal',
              },
              body: JSON.stringify({ stripe_customer_id: customer.id }),
            });
            console.log('Saved customer_id to Supabase');
          } else {
            console.warn('No email found for user, using customer_email in checkout');
            sessionParams.customer_email = userEmail || undefined;
          }
        }
      }
    }

    const session = await stripe.checkout?.sessions.create(sessionParams);
    if (!session) throw new Error('Failed to create checkout session');

    console.log('Stripe session created:', session.id);

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );

  } catch (error) {
    console.error('Error creating checkout session:', error);
    const err = error as { message?: string; type?: string; code?: string; statusCode?: number };
    console.error('Error details:', {
      message: err.message,
      type: err.type,
      code: err.code,
      statusCode: err.statusCode,
    });
    return new Response(
      JSON.stringify({ 
        error: err.message || 'Unknown error',
        type: err.type,
        code: err.code,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});

