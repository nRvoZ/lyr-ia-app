// Script de diagnostic Stripe et Supabase
// Exécuter avec: node diagnose_stripe.js

const https = require('https');

const CONFIG = {
    SUPABASE_URL: 'https://vidykmwboifpdgeeavjg.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpZHlrbXdib2lmcGRnZWVhdmpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MzIxMDEsImV4cCI6MjA3NDMwODEwMX0.83jICKnrnQYkSnCorCnT9iSOwG-N35qcIMuXJFfI4s4',
    STRIPE_PK: 'pk_test_51SBFIHQs5exHskQ3uWRzbAitLt3Cu0MgxcjRGqTHhUdkRebsCP7gAAcg0MmfeScO1382BYNy6qLC6V4FPK6wJHl600QUKSC5GL'
};

console.log('\n🔍 ==== DIAGNOSTIC STRIPE & SUPABASE ====\n');

// Test 1: Verifier les variables d'environnement
console.log('📋 Test 1: Variables d\'environnement');
console.log('  OK SUPABASE_URL:', CONFIG.SUPABASE_URL ? 'Definie' : 'Manquante');
console.log('  OK SUPABASE_ANON_KEY:', CONFIG.SUPABASE_ANON_KEY ? 'Definie' : 'Manquante');
console.log('  OK STRIPE_PK:', CONFIG.STRIPE_PK ? 'Definie' : 'Manquante');

// Test 2: Tester l'acces a Supabase
console.log('\nTest 2: Connexion a Supabase...');

function httpsRequest(url, options, body = null) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(data || '{}') });
                } catch (e) {
                    resolve({ status: res.statusCode, headers: res.headers, body: data });
                }
            });
        });
        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

(async () => {
    try {
        // Test connexion Supabase
        const supabaseTest = await httpsRequest(
            `${CONFIG.SUPABASE_URL}/rest/v1/user_profiles?select=count&limit=1`,
            {
                method: 'GET',
                headers: {
                    'apikey': CONFIG.SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${CONFIG.SUPABASE_ANON_KEY}`
                }
            }
        );

        if (supabaseTest.status === 200) {
            console.log('  OK Connexion Supabase reussie');
            console.log('     Status:', supabaseTest.status);
        } else {
            console.log('  ERREUR Supabase');
            console.log('     Status:', supabaseTest.status);
            console.log('     Body:', JSON.stringify(supabaseTest.body, null, 2));
        }

        // Test Edge Function: create-checkout-session
        console.log('\nTest 3: Edge Function create-checkout-session...');
        const checkoutTest = await httpsRequest(
            `${CONFIG.SUPABASE_URL}/functions/v1/create-checkout-session`,
            {
                method: 'POST',
                headers: {
                    'apikey': CONFIG.SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${CONFIG.SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json'
                }
            },
            {
                priceId: 'price_test_123',
                mode: 'subscription',
                userId: 'test-user'
            }
        );

        if (checkoutTest.status === 200 || checkoutTest.status === 400) {
            console.log('  OK Edge Function accessible');
            console.log('     Status:', checkoutTest.status);
            console.log('     Response:', JSON.stringify(checkoutTest.body, null, 2));
        } else {
            console.log('  ERREUR Edge Function inaccessible');
            console.log('     Status:', checkoutTest.status);
            console.log('     Body:', JSON.stringify(checkoutTest.body, null, 2));
        }

        // Test Edge Function: stripe-webhook
        console.log('\nTest 4: Edge Function stripe-webhook...');
        const webhookTest = await httpsRequest(
            `${CONFIG.SUPABASE_URL}/functions/v1/stripe-webhook`,
            {
                method: 'POST',
                headers: {
                    'apikey': CONFIG.SUPABASE_ANON_KEY,
                    'Content-Type': 'application/json'
                }
            },
            {
                type: 'test.event',
                data: { object: { id: 'test-123' } }
            }
        );

        console.log('  Status:', webhookTest.status);
        console.log('  Response:', JSON.stringify(webhookTest.body, null, 2));

        // Resume
        console.log('\n==== RESUME ====');
        console.log('  Supabase:', supabaseTest.status === 200 ? 'OK' : 'ERREUR');
        console.log('  Edge Function (checkout):', checkoutTest.status ? 'OK' : 'ERREUR');
        console.log('  Edge Function (webhook):', webhookTest.status ? 'OK' : 'ERREUR');

        console.log('\nRecommandations:');
        if (supabaseTest.status !== 200) {
            console.log('  - Verifier que la table user_profiles existe dans Supabase');
            console.log('  - Verifier les permissions RLS (Row Level Security)');
        }
        if (checkoutTest.status === 500) {
            console.log('  - Verifier que STRIPE_SECRET_KEY est configure dans Supabase Secrets');
            console.log('  - Verifier les logs de l\'Edge Function');
        }

    } catch (error) {
        console.error('\nERREUR CRITIQUE:', error.message);
        console.error(error.stack);
    }
})();

