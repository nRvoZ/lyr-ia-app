# ✅ Checklist de Configuration LyrIA

## 🗄️ Supabase

### Étape 1: Projet Supabase
- [ ] Compte Supabase créé
- [ ] Nouveau projet créé
- [ ] Variables copiées dans `.env`:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`

### Étape 2: Base de données
- [ ] SQL du schéma exécuté (`supabase/migrations/001_initial_schema.sql`)
- [ ] Tables créées :
  - [ ] `user_profiles`
  - [ ] `song_history`
  - [ ] `personal_profiles`
  - [ ] `broadcast_messages`
  - [ ] `payment_transactions`
- [ ] Politiques RLS activées

### Étape 3: Fonctions Edge
- [ ] CLI Supabase installé
- [ ] Projet lié avec `supabase link`
- [ ] Secret `VITE_GEMINI_API_KEY` ajouté dans Supabase
- [ ] Fonction `gemini-proxy` déployée
- [ ] Fonction `stripe-webhook` déployée

### Étape 4: Authentification
- [ ] Providers activés (Email/Password minimum)
- [ ] URLs configurées :
  - [ ] Site URL: `http://localhost:3000`
  - [ ] Redirect URLs: `http://localhost:3000/**`

## 🤖 Google Gemini

- [ ] Compte Google Cloud créé
- [ ] API Gemini activée
- [ ] Clé API générée
- [ ] Variable `VITE_GEMINI_API_KEY` dans `.env`

## 💳 Stripe

### Étape 1: Compte Stripe
- [ ] Compte Stripe créé
- [ ] Mode Test activé
- [ ] Clés récupérées :
  - [ ] `VITE_STRIPE_PUBLISHABLE_KEY` dans `.env`
  - [ ] Clé secrète pour les scripts

### Étape 2: Produits et Prix
- [ ] Script `stripe_setup.js` exécuté OU
- [ ] Produits créés manuellement :
  - [ ] 6 packs de crédits
  - [ ] 8 plans d'abonnement
- [ ] Price IDs copiés dans `constants_monetization.ts`

### Étape 3: Webhooks
- [ ] Endpoint webhook créé : `https://VOTRE_PROJECT_ID.supabase.co/functions/v1/stripe-webhook`
- [ ] Événements configurés :
  - [ ] `payment_intent.succeeded`
  - [ ] `invoice.payment_succeeded`
  - [ ] `customer.subscription.created`
  - [ ] `customer.subscription.updated`
  - [ ] `customer.subscription.deleted`
- [ ] Secret webhook ajouté dans Supabase : `STRIPE_WEBHOOK_SECRET`

## 🔧 Variables d'environnement finales

Votre fichier `.env` doit contenir :

```env
# Supabase
VITE_SUPABASE_URL=https://VOTRE_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Google Gemini
VITE_GEMINI_API_KEY=AIzaSy...

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 🧪 Tests

### Test de base
- [ ] `npm run dev` fonctionne
- [ ] Application se charge sans erreur
- [ ] Connexion/inscription fonctionne

### Test Gemini
- [ ] Génération de paroles fonctionne
- [ ] Pas d'erreur dans la console

### Test Stripe
- [ ] Modal d'abonnement s'ouvre
- [ ] Paiement test avec `4242 4242 4242 4242`
- [ ] Webhook reçu et traité

## 🚀 Déploiement (optionnel)

### Vercel/Netlify
- [ ] Variables d'environnement configurées
- [ ] Build réussi
- [ ] URLs de production mises à jour dans Supabase et Stripe

### Domaine personnalisé
- [ ] DNS configuré
- [ ] HTTPS activé
- [ ] URLs mises à jour partout

## 📞 Support

Si vous rencontrez des problèmes :

1. **Supabase** : Vérifiez les logs dans Dashboard → Logs
2. **Stripe** : Vérifiez les événements dans Dashboard → Events
3. **Gemini** : Vérifiez les quotas dans Google Cloud Console

## 🎉 Félicitations !

Une fois tous les éléments cochés, votre application LyrIA est entièrement fonctionnelle avec :
- ✅ Génération de paroles IA
- ✅ Système d'authentification
- ✅ Paiements et abonnements
- ✅ Base de données complète
- ✅ Interface utilisateur moderne
