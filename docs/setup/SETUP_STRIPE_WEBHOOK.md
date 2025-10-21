# Configuration du Webhook Stripe - Guide Pas à Pas

## ⚠️ Problème actuel
Le webhook Stripe n'est **pas configuré** dans votre Dashboard Stripe, c'est pourquoi :
- Pas de logs dans le webhook Supabase
- La base de données ne se met pas à jour
- Votre profil reste inchangé après paiement

## 📝 Solution : Configurer le webhook dans Stripe

### Étape 1 : Accéder au Dashboard Stripe

1. Allez sur https://dashboard.stripe.com/test/webhooks
2. Assurez-vous d'être en **mode Test** (toggle en haut à droite)

### Étape 2 : Créer un nouveau webhook

1. Cliquez sur **"Add endpoint"** (ou "Ajouter un point de terminaison")

2. Dans **"Endpoint URL"**, entrez :
   ```
   https://vidykmwboifpdgeeavjg.supabase.co/functions/v1/stripe-webhook
   ```

3. Cliquez sur **"Select events"** (Sélectionner des événements)

4. Cochez les événements suivants :
   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.payment_succeeded`

5. Cliquez sur **"Add events"**

6. Cliquez sur **"Add endpoint"** pour finaliser

### Étape 3 : Récupérer le Webhook Secret

1. Une fois le webhook créé, cliquez dessus dans la liste
2. Dans la section **"Signing secret"**, cliquez sur **"Reveal"**
3. Copiez la clé (elle commence par `whsec_...`)

### Étape 4 : Ajouter le secret dans Supabase

1. Allez sur https://supabase.com/dashboard/project/vidykmwboifpdgeeavjg/settings/functions
2. Dans la section **"Edge Function Secrets"**, ajoutez ou modifiez :
   ```
   STRIPE_WEBHOOK_SECRET=whsec_votre_secret_ici
   ```
3. Cliquez sur **"Save"**

### Étape 5 : Redéployer le webhook

Dans votre terminal :
```bash
npx supabase functions deploy stripe-webhook
```

### Étape 6 : Tester

1. Retournez sur https://dashboard.stripe.com/test/webhooks
2. Cliquez sur votre webhook
3. Cliquez sur l'onglet **"Testing"**
4. Cliquez sur **"Send test webhook"**
5. Sélectionnez `checkout.session.completed`
6. Cliquez sur **"Send test event"**

Vous devriez voir un **statut 200** (succès) et des logs dans Supabase !

---

## 🎯 URLs importantes

- **Webhook Stripe** : https://vidykmwboifpdgeeavjg.supabase.co/functions/v1/stripe-webhook
- **Dashboard Stripe Webhooks** : https://dashboard.stripe.com/test/webhooks
- **Logs Supabase** : https://supabase.com/dashboard/project/vidykmwboifpdgeeavjg/functions/stripe-webhook/logs
- **Secrets Supabase** : https://supabase.com/dashboard/project/vidykmwboifpdgeeavjg/settings/functions

---

## ✅ Vérification finale

Après configuration, un paiement test devrait :

1. **Dans Stripe Dashboard → Webhooks → votre webhook** :
   - Status : 200 (succès)
   - Événements reçus : checkout.session.completed, customer.subscription.created, etc.

2. **Dans Supabase → Functions → stripe-webhook → Logs** :
   ```
   🚀 Webhook called - Version 20
   ✅ Checkout completed
   💾 Enregistrement du customer_id
   ✅ Plan XXX activé
   ```

3. **Dans Supabase → Table Editor → user_profiles** :
   - Votre ligne doit avoir : plan="Creator", credits=-1, stripe_customer_id="cus_xxx"

4. **Dans votre app** :
   - Badge affiche le bon plan
   - Crédits affichent "∞"






