# Corrections Abonnements Stripe

## Problème identifié

Les abonnements ne fonctionnaient pas : après un paiement réussi, le profil utilisateur n'affichait ni les crédits ni le nouveau plan, et Supabase ne s'actualisait pas.

### Causes racines identifiées

**Problème 1 - Webhook ne trouve pas l'utilisateur :**
1. `checkout.session.completed` appelait `handleCheckoutCompleted`
2. Pour les abonnements (mode: 'subscription'), cette fonction déléguait à `handleSubscriptionChange`
3. `handleSubscriptionChange` cherchait l'utilisateur par `stripe_customer_id`
4. **PROBLÈME** : Le `stripe_customer_id` n'avait pas encore été sauvegardé dans Supabase !

**Problème 2 - Conflit de mise à jour côté frontend :**
1. Le webhook met à jour le profil avec `credits: -1` (valeur correcte pour unlimited)
2. L'utilisateur revient sur l'app avec `?payment=success`
3. L'app appelle `upgradePlan()` qui essaie d'écrire `credits: 'unlimited'` (string invalide)
4. **PROBLÈME** : Conflit SQL et le profil ne se recharge pas correctement

### Solutions appliquées

### 1. Modifications du Webhook (`supabase/functions/stripe-webhook/index.ts`)

**a) Passage du userId pour les nouveaux abonnements (ligne 243)**
```typescript
await handleSubscriptionChange(subscription, userId);
```

**b) Modification de `handleSubscriptionChange` pour accepter userId optionnel (ligne 345)**
```typescript
async function handleSubscriptionChange(subscription: Stripe.Subscription, overrideUserId?: string)
```

**c) Logique mise à jour (lignes 372-399)**
- Si `overrideUserId` est fourni → utilise directement ce userId
- Sinon → cherche l'utilisateur par `stripe_customer_id` (pour les renouvellements)

**d) Correction de la valeur des crédits illimités (ligne 415)**
```typescript
credits: -1 // -1 = unlimited dans Supabase (au lieu de 'unlimited' qui causait une erreur)
```

**e) Simplification de `handleSubscriptionPayment` (lignes 282-296)**
- Délègue maintenant à `handleSubscriptionChange` au lieu de dupliquer la logique

**f) Version bump à 19 (ligne 97)** pour tracking

### 2. Modifications du Frontend

**a) Ajout de `refreshUserProfile` dans `SupabaseUserContext.tsx`**
- Nouvelle fonction qui recharge le profil depuis Supabase au lieu de le modifier localement
- Ajoutée à l'interface `UserContextType`
- Implémentation ligne 427-437

**b) Modification de `App.tsx` pour utiliser `refreshUserProfile`**
- Au lieu d'appeler `upgradePlan()` ou `addCredits()` qui écrivent en base
- On appelle simplement `refreshUserProfile()` qui lit les données que le webhook a déjà écrites
- Modification du useEffect de gestion du retour Stripe (ligne 430-462)

## Flux corrigé

### Nouvel abonnement (Premier paiement)
1. Frontend : Utilisateur clique sur "Choisir ce plan" → `redirectToCheckout(priceId, 'subscription', userId)`
2. Edge Function : `create-checkout-session` crée une session Stripe avec `metadata: { userId }`
3. Stripe : Utilisateur paie sur la page de checkout
4. Webhook : `checkout.session.completed` reçu
5. Webhook : `handleCheckoutCompleted` sauvegarde le `stripe_customer_id` dans `user_profiles`
6. Webhook : `handleCheckoutCompleted` appelle `handleSubscriptionChange(subscription, userId)` **avec userId**
7. Webhook : `handleSubscriptionChange` utilise directement le `userId` fourni (pas besoin de chercher)
8. Webhook : Mise à jour `user_profiles` : `plan = 'Creator'` et `credits = -1` (unlimited)
9. Frontend : Utilisateur revient avec `?payment=success`
10. Frontend : `App.tsx` appelle `refreshUserProfile()` qui recharge depuis Supabase
11. ✅ **L'utilisateur voit son nouveau plan et ses crédits illimités !**

### Renouvellement d'abonnement (Paiements récurrents)
1. Stripe : Facture automatiquement le client
2. Webhook : `invoice.payment_succeeded` reçu
3. Webhook : `handleSubscriptionPayment` récupère l'abonnement
4. Webhook : `handleSubscriptionPayment` appelle `handleSubscriptionChange(subscription)` **sans userId**
5. Webhook : `handleSubscriptionChange` cherche l'utilisateur par `stripe_customer_id` (qui existe maintenant)
6. Webhook : Mise à jour du plan (reste identique normalement)
7. ✅ **L'abonnement reste actif**

## Test

### Étapes de test complètes :

1. **Se connecter** à l'application
2. **Ouvrir le modal d'abonnements** (clic sur le badge de plan)
3. **Sélectionner un plan** (ex: Creator Mensuel)
4. **Payer avec une carte test Stripe** : `4242 4242 4242 4242` + date future + CVC quelconque
5. **Être redirigé** vers l'app avec le message de succès
6. **Vérifier dans Supabase** (Table Editor > user_profiles) :
   - `plan` = "Creator" (ou nom du plan choisi)
   - `credits` = -1 (représente "unlimited")
   - `stripe_customer_id` = "cus_xxxxx" (ID Stripe client)
7. **Vérifier dans l'app** :
   - Badge affiche le bon plan
   - Crédits affichent "∞" ou "Illimités"
   - Fonctionnalités du plan sont débloquées

## Logs de débogage

### Dans les logs Supabase (Edge Functions > stripe-webhook)

**Succès attendu :**
```
🚀 Webhook called - Version 19 - Fixed subscription userId handling
🔔 Webhook reçu: checkout.session.completed
✅ Checkout completed: cs_test_xxxxx
📦 Session metadata: {"userId":"uuid-de-l-utilisateur",...}
📦 Session mode: subscription
💾 Enregistrement du customer_id cus_xxxxx pour l'utilisateur uuid-de-l-utilisateur
🔄 Nouvel abonnement pour l'utilisateur uuid-de-l-utilisateur
🔄 Changement d'abonnement: sub_xxxxx
📦 Price ID: price_1SIXV0Qs5exHskQ3Z0baDgHD → Plan: Creator
✅ Utilisation du userId fourni: uuid-de-l-utilisateur
📝 Mise à jour vers plan: Creator
✅ Plan Creator activé pour l'utilisateur uuid-de-l-utilisateur
```

### Dans la console browser (F12)

**Succès attendu :**
```
🔄 Refreshing user profile from database...
Loading profile for user: uuid-de-l-utilisateur
Profile loaded: {plan: "Creator", credits: "unlimited", ...}
✅ Profile successfully loaded
```

## Déploiement

**Webhook déployé :**
```bash
npx supabase functions deploy stripe-webhook
```
✅ Déployé et en production

**Fichiers modifiés :**
- `supabase/functions/stripe-webhook/index.ts`
- `src/contexts/SupabaseUserContext.tsx`
- `App.tsx`

## Points d'attention

1. **Webhooks Stripe** : Assurez-vous que l'URL du webhook est bien configurée dans Stripe Dashboard avec les événements :
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

2. **Variables d'environnement** : Vérifiez que toutes sont bien définies dans Supabase :
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

3. **Timing** : Le webhook peut prendre quelques secondes à être appelé. Si l'utilisateur revient trop vite, il peut ne pas voir ses crédits immédiatement. Dans ce cas, un simple refresh de la page (`F5`) devrait résoudre le problème.

