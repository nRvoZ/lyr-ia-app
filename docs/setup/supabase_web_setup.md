# Configuration Supabase via Interface Web (Sans CLI)

## 🚀 Méthode Simple - Interface Web Uniquement

### Étape 1: Créer le Projet

1. Allez sur https://supabase.com
2. Cliquez sur "Start your project"
3. Créez un compte ou connectez-vous
4. Cliquez sur "New Project"
5. Remplissez :
   - **Name**: `lyria-app`
   - **Database Password**: (choisissez un mot de passe fort)
   - **Region**: Europe (eu-central-1)
6. Cliquez sur "Create new project"

### Étape 2: Récupérer les Clés

1. Une fois le projet créé, allez dans **Settings** → **API**
2. Copiez ces valeurs dans votre fichier `.env` :

```env
VITE_SUPABASE_URL=https://VOTRE_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Étape 3: Créer les Tables (SQL Editor)

1. Allez dans **SQL Editor** dans le menu de gauche
2. Cliquez sur "New query"
3. Copiez-collez le contenu du fichier `supabase/migrations/001_initial_schema.sql`
4. Cliquez sur "Run" pour exécuter le script

### Étape 4: Configurer l'Authentification

1. Allez dans **Authentication** → **Settings**
2. Dans **General settings** :
   - **Site URL**: `http://localhost:3000`
   - **Redirect URLs**: `http://localhost:3000/**`
3. Dans **Auth Providers** :
   - Activez **Email** (déjà activé par défaut)
   - Optionnel : Activez Google, GitHub, etc.

### Étape 5: Ajouter les Secrets pour Edge Functions

1. Allez dans **Edge Functions** dans le menu
2. Cliquez sur l'onglet **Settings**
3. Dans **Secrets**, ajoutez :
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: Votre clé API Gemini
4. Cliquez sur "Add secret"

### Étape 6: Déployer les Edge Functions Manuellement

#### Pour gemini-proxy :

1. Allez dans **Edge Functions**
2. Cliquez sur "Create a new function"
3. **Function name**: `gemini-proxy`
4. Copiez le contenu de `supabase/functions/gemini-proxy/index.ts`
5. Cliquez sur "Create function"

#### Pour stripe-webhook :

1. Répétez le processus pour `stripe-webhook`
2. Copiez le contenu de `supabase/functions/stripe-webhook/index.ts`

### Étape 7: Tester la Configuration

Créez un fichier de test simple :

```javascript
// test-supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'VOTRE_SUPABASE_URL'
const supabaseKey = 'VOTRE_SUPABASE_ANON_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

// Test de connexion
async function testConnection() {
  try {
    const { data, error } = await supabase.from('user_profiles').select('count')
    if (error) throw error
    console.log('✅ Connexion Supabase réussie!')
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message)
  }
}

testConnection()
```

## 🔧 Configuration des Webhooks Stripe

### Dans Supabase :

1. Allez dans **Edge Functions** → **stripe-webhook**
2. Copiez l'URL de la fonction (ex: `https://VOTRE_PROJECT_ID.supabase.co/functions/v1/stripe-webhook`)

### Dans Stripe :

1. Allez dans votre tableau de bord Stripe
2. **Developers** → **Webhooks** → **Add endpoint**
3. **Endpoint URL**: Collez l'URL de votre fonction Supabase
4. **Events to send** : Sélectionnez :
   - `payment_intent.succeeded`
   - `invoice.payment_succeeded`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Cliquez sur "Add endpoint"
6. Copiez le **Signing secret** et ajoutez-le dans Supabase :
   - **Edge Functions** → **Settings** → **Secrets**
   - **Name**: `STRIPE_WEBHOOK_SECRET`
   - **Value**: Le signing secret de Stripe

## ✅ Vérification Finale

Votre configuration est prête quand :

- [ ] Tables créées dans Supabase
- [ ] Clés copiées dans `.env`
- [ ] Authentification configurée
- [ ] Edge Functions déployées
- [ ] Secrets ajoutés
- [ ] Webhooks Stripe configurés

## 🚀 Lancer l'Application

```bash
# Créer le fichier .env avec vos clés
cp .env.example .env

# Modifier .env avec vos vraies clés

# Lancer l'application
npm run dev
```

Votre application devrait maintenant fonctionner avec Supabase ! 🎉
