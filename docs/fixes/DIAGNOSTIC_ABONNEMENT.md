# Diagnostic des Abonnements - Étapes de débogage

## 1️⃣ Vérifier que l'application fonctionne

✅ L'app tourne sur http://localhost:3000/

### À vérifier :
- [ ] Vous pouvez vous connecter ?
- [ ] Vous voyez le bouton pour les abonnements ?

---

## 2️⃣ Tester la redirection vers Stripe

### Actions :
1. Ouvrir la console du navigateur (F12) → onglet "Console"
2. Cliquer sur un plan d'abonnement
3. Noter ce qui s'affiche dans la console

### Ce qu'on doit voir :
```
🚀 Calling create-checkout-session with: {priceId: "price_xxx", mode: "subscription", userId: "xxx"}
Response from Edge Function: {data: {sessionId: "cs_test_xxx"}}
```

### Problèmes possibles :
- ❌ Erreur "Stripe is not configured" → Problème de clé API Stripe
- ❌ Erreur "Missing userId" → Problème de session utilisateur
- ❌ Erreur 401/403 → Problème d'authentification Supabase

---

## 3️⃣ Vérifier le paiement sur Stripe

### Après avoir cliqué sur un plan :
- [ ] Êtes-vous redirigé vers une page Stripe (checkout.stripe.com) ?
- [ ] Pouvez-vous entrer les informations de carte ?

### Carte de test :
- Numéro : `4242 4242 4242 4242`
- Date : `12/30`
- CVC : `123`

---

## 4️⃣ Vérifier le retour après paiement

### Après avoir payé :
- [ ] Êtes-vous redirigé vers votre app ?
- [ ] L'URL contient-elle `?payment=success` ?
- [ ] Voyez-vous un message de succès ?

### Dans la console (F12) :
Cherchez :
```
🔄 Refreshing user profile from database...
Loading profile for user: xxx
Profile loaded: {plan: "xxx", credits: xxx}
```

---

## 5️⃣ Vérifier le webhook Stripe

### Dans Supabase Dashboard :
1. Allez sur https://supabase.com/dashboard/project/vidykmwboifpdgeeavjg/functions
2. Cliquez sur "stripe-webhook"
3. Allez dans l'onglet "Logs"

### Ce qu'on doit voir après un paiement :
```
🚀 Webhook called - Version 20 - Fixed response.text() double read
🔔 Webhook reçu: checkout.session.completed
✅ Checkout completed: cs_test_xxx
💾 Enregistrement du customer_id cus_xxx pour l'utilisateur xxx
🔄 Nouvel abonnement pour l'utilisateur xxx
✅ Plan XXX activé pour l'utilisateur xxx
```

### Problèmes possibles :
- ❌ Erreur 401 → `verify_jwt` n'est pas désactivé
- ❌ Erreur "Missing Stripe signature" → Webhook secret incorrect
- ❌ Erreur "userId manquant" → Métadonnées non transmises
- ❌ Aucun log → Stripe n'appelle pas le webhook

---

## 6️⃣ Vérifier la base de données Supabase

### Dans Supabase Dashboard :
1. Allez sur https://supabase.com/dashboard/project/vidykmwboifpdgeeavjg/editor
2. Ouvrez la table `user_profiles`
3. Trouvez votre utilisateur (par email)

### Vérifiez :
- [ ] `plan` = "Creator" (ou le plan acheté) ?
- [ ] `credits` = -1 (= unlimited) ?
- [ ] `stripe_customer_id` = "cus_xxx..." ?

---

## 7️⃣ Vérifier la configuration Stripe

### Dans Stripe Dashboard (https://dashboard.stripe.com/test/webhooks) :

#### Vérifier l'URL du webhook :
- [ ] URL = `https://vidykmwboifpdgeeavjg.supabase.co/functions/v1/stripe-webhook`
- [ ] Version = Latest

#### Vérifier les événements écoutés :
- [ ] `checkout.session.completed`
- [ ] `customer.subscription.created`
- [ ] `customer.subscription.updated`
- [ ] `customer.subscription.deleted`
- [ ] `invoice.payment_succeeded`

#### Vérifier le secret du webhook :
1. Cliquez sur votre webhook
2. Copiez le "Signing secret" (whsec_xxx...)
3. Vérifiez qu'il correspond à `STRIPE_WEBHOOK_SECRET` dans Supabase

---

## 🔧 Variables d'environnement à vérifier

### Dans Supabase Dashboard → Settings → Edge Functions → Secrets :

```env
STRIPE_SECRET_KEY=sk_test_xxx...
STRIPE_WEBHOOK_SECRET=whsec_xxx...
SUPABASE_URL=https://vidykmwboifpdgeeavjg.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

### Dans votre fichier .env local :

```env
VITE_SUPABASE_URL=https://vidykmwboifpdgeeavjg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx...
```

---

## 📋 Rapport de diagnostic

Remplissez ce qui ne fonctionne PAS :

### Étape qui bloque :
- [ ] L'app ne se lance pas
- [ ] Le bouton d'abonnement ne fait rien
- [ ] Pas de redirection vers Stripe
- [ ] Erreur sur la page Stripe
- [ ] Pas de retour après paiement
- [ ] Le profil ne se met pas à jour
- [ ] Le webhook n'est pas appelé
- [ ] Le webhook retourne une erreur

### Message d'erreur exact :
```
[Coller ici le message d'erreur de la console]
```

### Ce qui s'affiche dans les logs Supabase webhook :
```
[Coller ici les logs du webhook]
```






