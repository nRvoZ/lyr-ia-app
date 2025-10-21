// Script de configuration Stripe pour Lyr-IA
// Exécutez ce script après avoir installé stripe-cli et configuré vos clés
// IMPORTANT: Créez un fichier .env avec STRIPE_SECRET_KEY=votre_clé

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_VOTRE_CLE_ICI');

async function setupStripeProducts() {
  console.log('🚀 Configuration des produits Stripe pour LyrIA...\n');

  try {
    // 1. Créer les packs de crédits
    console.log('📦 Création des packs de crédits...');
    
    const creditPacks = [
      { credits: 150, price: 199, name: 'Pack Starter' },
      { credits: 450, price: 499, name: 'Pack Standard' },
      { credits: 1000, price: 999, name: 'Pack Premium' },
      { credits: 2200, price: 1999, name: 'Pack Pro' },
      { credits: 4500, price: 3499, name: 'Pack Business' },
      { credits: 7200, price: 4999, name: 'Pack Enterprise' }
    ];

    const creditPriceIds = [];
    
    for (const pack of creditPacks) {
      const product = await stripe.products.create({
        name: `${pack.name} - ${pack.credits} crédits`,
        description: `Pack de ${pack.credits} crédits pour LyrIA`,
        metadata: {
          type: 'credits',
          credits: pack.credits.toString()
        }
      });

      const price = await stripe.prices.create({
        unit_amount: pack.price,
        currency: 'eur',
        product: product.id,
        metadata: {
          credits: pack.credits.toString()
        }
      });

      creditPriceIds.push({
        credits: pack.credits,
        priceId: price.id,
        productId: product.id
      });

      console.log(`✅ ${pack.name}: ${price.id}`);
    }

    // 2. Créer les abonnements
    console.log('\n📋 Création des plans d\'abonnement...');
    
    const subscriptionPlans = [
      { name: 'Creator', price: 999, interval: 'month', credits: 'unlimited' },
      { name: 'Pro', price: 1999, interval: 'month', credits: 'unlimited' },
      { name: 'Ultimate', price: 3999, interval: 'month', credits: 'unlimited' },
      { name: 'Business', price: 7999, interval: 'month', credits: 'unlimited' },
      { name: 'Creator Annual', price: 9999, interval: 'year', credits: 'unlimited' },
      { name: 'Pro Annual', price: 19999, interval: 'year', credits: 'unlimited' },
      { name: 'Ultimate Annual', price: 39999, interval: 'year', credits: 'unlimited' },
      { name: 'Business Annual', price: 79999, interval: 'year', credits: 'unlimited' }
    ];

    const subscriptionPriceIds = [];

    for (const plan of subscriptionPlans) {
      const product = await stripe.products.create({
        name: `LyrIA ${plan.name}`,
        description: `Abonnement ${plan.name} avec crédits illimités`,
        metadata: {
          type: 'subscription',
          plan: plan.name
        }
      });

      const price = await stripe.prices.create({
        unit_amount: plan.price,
        currency: 'eur',
        recurring: {
          interval: plan.interval
        },
        product: product.id,
        metadata: {
          plan: plan.name,
          credits: plan.credits
        }
      });

      subscriptionPriceIds.push({
        plan: plan.name,
        priceId: price.id,
        productId: product.id
      });

      console.log(`✅ ${plan.name}: ${price.id}`);
    }

    // 3. Générer le code de mise à jour
    console.log('\n🔧 Code à mettre à jour dans constants_monetization.ts:\n');
    
    console.log('// CREDIT_PACKS mis à jour:');
    console.log('export const CREDIT_PACKS: CreditPack[] = [');
    creditPriceIds.forEach(pack => {
      const priceFormatted = (pack.credits === 150 ? '1,99€' : 
                             pack.credits === 450 ? '4,99€' :
                             pack.credits === 1000 ? '9,99€' :
                             pack.credits === 2200 ? '19,99€' :
                             pack.credits === 4500 ? '34,99€' : '49,99€');
      console.log(`    { credits: ${pack.credits}, price: '${priceFormatted}', stripePriceId: '${pack.priceId}' },`);
    });
    console.log('];');

    console.log('\n// PLANS mis à jour (remplacez les stripePriceId):');
    subscriptionPriceIds.forEach(sub => {
      console.log(`// ${sub.plan}: stripePriceId: '${sub.priceId}'`);
    });

  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.message);
  }
}

// Exécuter le script
setupStripeProducts();
