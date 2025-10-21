# Guide de Configuration Supabase pour LyrIA

## 1. Installation du CLI Supabase

⚠️ **L'installation npm globale ne fonctionne pas**. Utilisez une de ces alternatives :

### Option A: Chocolatey (Recommandé)
```bash
# Installer Chocolatey (si pas déjà fait)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Installer Supabase CLI
choco install supabase
```

### Option B: Scoop
```bash
# Installer Scoop
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# Installer Supabase CLI
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### Option C: Téléchargement direct
1. Téléchargez depuis: https://github.com/supabase/cli/releases
2. Extrayez `supabase_windows_amd64.zip`
3. Ajoutez le dossier à votre PATH

```bash
# Vérifier l'installation
supabase --version
```

## 2. Connexion à votre projet

```bash
# Se connecter à Supabase
supabase login

# Lier votre projet local au projet Supabase
supabase link --project-ref VOTRE_PROJECT_ID
```

## 3. Déployer le schéma de base de données

```bash
# Appliquer les migrations
supabase db push

# Ou exécuter directement le SQL dans l'interface Supabase
# Copiez le contenu de supabase/migrations/001_initial_schema.sql
# Et collez-le dans SQL Editor de Supabase
```

## 4. Configurer les secrets pour la fonction Edge

Dans votre tableau de bord Supabase :
1. Allez dans **Settings** → **Edge Functions**
2. Ajoutez ces secrets :

```
VITE_GEMINI_API_KEY=votre_clé_gemini_ici
```

## 5. Déployer la fonction Edge

```bash
# Déployer la fonction gemini-proxy
supabase functions deploy gemini-proxy

# Vérifier le déploiement
supabase functions list
```

## 6. Tester la fonction

```bash
# Test local
supabase functions serve

# Test de la fonction déployée
curl -X POST 'https://VOTRE_PROJECT_ID.supabase.co/functions/v1/gemini-proxy' \
  -H 'Authorization: Bearer VOTRE_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "modelName": "gemini-2.5-flash",
    "prompt": "Hello, world!",
    "config": {}
  }'
```

## 7. Configuration de l'authentification

Dans Supabase Dashboard → Authentication → Settings :

### URL Configuration
- Site URL: `http://localhost:3000` (développement)
- Redirect URLs: `http://localhost:3000/**`

### Providers
Activez les providers que vous souhaitez :
- Email/Password ✅
- Google (optionnel)
- GitHub (optionnel)

## 8. Variables d'environnement finales

Votre fichier `.env` devrait ressembler à :

```env
# Supabase
VITE_SUPABASE_URL=https://VOTRE_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Google Gemini
VITE_GEMINI_API_KEY=AIzaSy...

# Stripe (voir section suivante)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```
