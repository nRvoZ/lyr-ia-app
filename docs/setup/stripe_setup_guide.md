# Guide de Configuration Stripe pour LyrIA

## 1. Récupérer vos clés Stripe

Dans votre tableau de bord Stripe :

1. Allez dans **Developers** → **API keys**
2. Copiez ces clés dans votre `.env` :

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51...
```

⚠️ **Important** : Utilisez les clés de TEST pour le développement !

## 2. Installer Stripe CLI (optionnel mais recommandé)

```bash
# Windows
choco install stripe-cli

# Ou téléchargez depuis https://github.com/stripe/stripe-cli/releases
```

## 3. Configuration automatique des produits

### Option A: Script automatique (recommandé)

1. Installez les dépendances :
```bash
npm install stripe
```

2. Modifiez `stripe_setup.js` avec votre clé secrète de test
3. Exécutez le script :
```bash
node stripe_setup.js
```

### Option B: Configuration manuelle

Dans votre tableau de bord Stripe :

#### Créer les packs de crédits :
1. **Products** → **Add product**
2. Créez ces produits :

| Nom | Prix | Crédits | Type |
|-----|------|---------|------|
| Pack Starter | 1,99€ | 150 | One-time |
| Pack Standard | 4,99€ | 450 | One-time |
| Pack Premium | 9,99€ | 1000 | One-time |
| Pack Pro | 19,99€ | 2200 | One-time |
| Pack Business | 34,99€ | 4500 | One-time |
| Pack Enterprise | 49,99€ | 7200 | One-time |

#### Créer les abonnements :
| Plan | Prix Mensuel | Prix Annuel |
|------|--------------|-------------|
| Creator | 9,99€/mois | 99,99€/an |
| Pro | 19,99€/mois | 199,99€/an |
| Ultimate | 39,99€/mois | 399,99€/an |
| Business | 79,99€/mois | 799,99€/an |

## 4. Configurer les webhooks

1. **Developers** → **Webhooks** → **Add endpoint**
2. URL : `https://VOTRE_PROJECT_ID.supabase.co/functions/v1/stripe-webhook`
3. Événements à écouter :
   - `payment_intent.succeeded`
   - `invoice.payment_succeeded`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

## 5. Mettre à jour constants_monetization.ts

Après avoir créé vos produits, mettez à jour les `stripePriceId` dans `constants_monetization.ts` :

```typescript
export const CREDIT_PACKS: CreditPack[] = [
    { credits: 150, price: '1,99€', stripePriceId: 'price_VOTRE_ID_ICI' },
    { credits: 450, price: '4,99€', stripePriceId: 'price_VOTRE_ID_ICI' },
    // ... etc
];

export const PLANS: Plan[] = [
  {
    id: SubscriptionPlan.Creator,
    name: 'Creator',
    stripePriceId: 'price_VOTRE_ID_ICI', // Remplacez par votre Price ID
    // ... reste de la configuration
  },
  // ... autres plans
];
```

## 6. Créer la fonction webhook Supabase

Créez `supabase/functions/stripe-webhook/index.ts` pour gérer les paiements :

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = Stripe(Deno.env.get('STRIPE_SECRET_KEY')!)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')!
  const body = await req.text()
  
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!
    )

    switch (event.type) {
      case 'payment_intent.succeeded':
        // Gérer l'achat de crédits
        break
      case 'invoice.payment_succeeded':
        // Gérer les abonnements
        break
    }

    return new Response('OK', { status: 200 })
  } catch (error) {
    return new Response('Webhook Error', { status: 400 })
  }
})
```

## 7. Test des paiements

Utilisez ces cartes de test Stripe :

- **Succès** : `4242 4242 4242 4242`
- **Échec** : `4000 0000 0000 0002`
- **3D Secure** : `4000 0025 0000 3155`

Date d'expiration : n'importe quelle date future
CVC : n'importe quel code à 3 chiffres
