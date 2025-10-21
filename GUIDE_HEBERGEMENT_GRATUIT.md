# 🚀 Guide d'Hébergement Gratuit pour Lyr-IA

## 📋 Table des matières
1. [Options d'hébergement gratuit](#options-hébergement)
2. [Nom de domaine gratuit](#domaine-gratuit)
3. [Déploiement étape par étape](#déploiement)
4. [Configuration DNS](#configuration-dns)

---

## 🌐 Options d'Hébergement Gratuit

### Option 1 : Vercel (RECOMMANDÉ ⭐)
- ✅ **Gratuit** pour projets personnels
- ✅ Déploiement automatique depuis GitHub
- ✅ HTTPS automatique
- ✅ CDN global ultra-rapide
- ✅ Nom de domaine gratuit `.vercel.app`
- ✅ Peut connecter un domaine personnalisé gratuitement

**Limites gratuites :**
- 100 GB de bande passante/mois
- Builds illimités
- Parfait pour votre app !

### Option 2 : Netlify
- ✅ Gratuit avec 100 GB/mois
- ✅ Déploiement automatique
- ✅ HTTPS automatique
- ✅ Nom de domaine `.netlify.app`

### Option 3 : GitHub Pages
- ✅ Complètement gratuit
- ✅ Nom de domaine `.github.io`
- ⚠️ Nécessite configuration supplémentaire pour React Router

### Option 4 : Cloudflare Pages
- ✅ Gratuit illimité
- ✅ Performance excellente
- ✅ Nom de domaine `.pages.dev`

---

## 🆓 Obtenir un Nom de Domaine Gratuit

### Option A : Domaines Gratuits avec Extensions Spéciales

#### 1. **Freenom** (Domaines .tk, .ml, .ga, .cf, .gq)
- Site : https://www.freenom.com
- ✅ Complètement gratuit
- ⚠️ Doit être renouvelé chaque année
- Exemple : `lyr-ia.tk`, `lyr-ia.ml`

#### 2. **InfinityFree** (Offre domaine .rf.gd, .42web.io)
- Site : https://infinityfree.net
- ✅ Gratuit avec hébergement
- Exemple : `lyr-ia.rf.gd`

#### 3. **eu.org** (Domaine .eu.org)
- Site : https://nic.eu.org
- ✅ Gratuit à vie
- ⚠️ Validation manuelle (1-2 semaines)
- Exemple : `lyr-ia.eu.org`

### Option B : Sous-domaines Gratuits de la Plateforme

#### Vercel (PLUS SIMPLE)
- Automatique : `votre-app.vercel.app`
- Peut être personnalisé : `lyr-ia.vercel.app`

#### Netlify
- Automatique : `votre-app.netlify.app`
- Peut être personnalisé : `lyr-ia.netlify.app`

---

## 🚀 Déploiement sur Vercel (Recommandé)

### Étape 1 : Préparer votre code

1. **Vérifier que tout fonctionne localement :**
```bash
npm run build
npm run preview
```

2. **Créer un fichier `.gitignore` (si pas déjà fait) :**
```
node_modules
dist
.env
.env.local
```

3. **Initialiser Git (si pas déjà fait) :**
```bash
git init
git add .
git commit -m "Initial commit - Lyr-IA app ready for deployment"
```

### Étape 2 : Créer un dépôt GitHub

1. Aller sur https://github.com
2. Cliquer sur **"New repository"**
3. Nom : `lyr-ia-app`
4. Laisser **Public** ou **Private** (les deux fonctionnent)
5. Cliquer sur **"Create repository"**

6. **Pousser votre code :**
```bash
git remote add origin https://github.com/VOTRE-USERNAME/lyr-ia-app.git
git branch -M main
git push -u origin main
```

### Étape 3 : Déployer sur Vercel

1. **Créer un compte Vercel :**
   - Aller sur https://vercel.com
   - Cliquer sur **"Sign Up"**
   - Se connecter avec GitHub (recommandé)

2. **Importer votre projet :**
   - Cliquer sur **"Add New Project"**
   - Sélectionner votre dépôt `lyr-ia-app`
   - Cliquer sur **"Import"**

3. **Configuration du projet :**
   - **Framework Preset :** Vite (détecté automatiquement)
   - **Build Command :** `npm run build` (par défaut)
   - **Output Directory :** `dist` (par défaut)
   - **Install Command :** `npm install` (par défaut)

4. **Variables d'environnement :**
   - Cliquer sur **"Environment Variables"**
   - Ajouter vos variables Supabase (si nécessaire) :
     ```
     VITE_SUPABASE_URL=votre_url
     VITE_SUPABASE_ANON_KEY=votre_key
     ```
   - ⚠️ **Important :** Les variables doivent commencer par `VITE_` pour être accessibles

5. **Déployer :**
   - Cliquer sur **"Deploy"**
   - Attendre 2-3 minutes ⏳
   - ✅ Votre app est en ligne !

### Étape 4 : Accéder à votre application

Votre app sera disponible à :
```
https://lyr-ia-app.vercel.app
```

Vous pouvez personnaliser le nom dans les paramètres du projet.

---

## 🔧 Configuration d'un Domaine Personnalisé Gratuit

### Méthode 1 : Domaine Freenom avec Vercel

#### A. Obtenir le domaine sur Freenom

1. Aller sur https://www.freenom.com
2. Rechercher `lyr-ia` ou `lyria` (ou le nom de votre choix)
3. Choisir une extension (.tk, .ml, .ga, .cf, .gq)
4. Cliquer sur **"Get it now!"**
5. Cliquer sur **"Checkout"**
6. Sélectionner **"12 Months @ FREE"**
7. Créer un compte et finaliser

#### B. Connecter le domaine à Vercel

1. **Dans Vercel :**
   - Aller dans votre projet
   - Cliquer sur **"Settings"** → **"Domains"**
   - Entrer votre domaine : `lyr-ia.tk` (exemple)
   - Cliquer sur **"Add"**
   - Vercel vous donnera des valeurs DNS

2. **Dans Freenom :**
   - Aller dans **"Services"** → **"My Domains"**
   - Cliquer sur **"Manage Domain"**
   - Aller dans **"Management Tools"** → **"Nameservers"**
   
   **Option A - Nameservers Vercel (Plus simple) :**
   - Sélectionner **"Use custom nameservers"**
   - Ajouter :
     ```
     ns1.vercel-dns.com
     ns2.vercel-dns.com
     ```

   **Option B - Enregistrements DNS :**
   - Aller dans **"Manage Freenom DNS"**
   - Ajouter un enregistrement A :
     ```
     Name: (vide ou @)
     Type: A
     TTL: 3600
     Target: 76.76.21.21
     ```
   - Ajouter un enregistrement CNAME :
     ```
     Name: www
     Type: CNAME
     TTL: 3600
     Target: cname.vercel-dns.com
     ```

3. **Attendre la propagation DNS :**
   - Peut prendre 5 minutes à 48 heures
   - Généralement actif en 1-2 heures

4. **Vérifier :**
   - Retourner dans Vercel
   - Le statut devrait passer à ✅ **"Valid Configuration"**
   - Accéder à `https://lyr-ia.tk` (votre domaine)

---

## 📱 Déploiement sur Netlify (Alternative)

### Configuration rapide

1. **Via l'interface web :**
   - Aller sur https://netlify.com
   - Se connecter avec GitHub
   - Cliquer sur **"Add new site"** → **"Import an existing project"**
   - Sélectionner votre dépôt GitHub
   - Configuration :
     ```
     Build command: npm run build
     Publish directory: dist
     ```
   - Cliquer sur **"Deploy site"**

2. **Via Netlify CLI :**
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Déployer
netlify deploy --prod
```

---

## 🎯 Vérification Post-Déploiement

### Checklist

- [ ] L'application se charge correctement
- [ ] Les routes fonctionnent (pas d'erreur 404)
- [ ] Les images et assets se chargent
- [ ] La connexion à Supabase fonctionne
- [ ] Les paiements Stripe fonctionnent (si configuré)
- [ ] Le site est accessible en HTTPS
- [ ] Le domaine personnalisé fonctionne (si configuré)

### Résolution de problèmes courants

#### 1. **Erreur 404 sur les routes**
Créer un fichier `public/_redirects` (Netlify) ou `vercel.json` (Vercel) :

**Pour Netlify** (`public/_redirects`) :
```
/*    /index.html   200
```

**Pour Vercel** (`vercel.json`) :
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

#### 2. **Variables d'environnement non accessibles**
- Vérifier qu'elles commencent par `VITE_`
- Redéployer après modification des variables

#### 3. **Erreurs CORS avec Supabase**
- Vérifier l'URL dans les paramètres Supabase
- Ajouter votre domaine dans les "Site URLs" autorisés

---

## 💡 Conseils

### Performances
- Vercel et Cloudflare sont les plus rapides (CDN global)
- Netlify est excellent aussi
- GitHub Pages est plus lent mais gratuit à vie

### Nom de domaine
- **Pour débuter :** Utilisez le sous-domaine de la plateforme (ex: `lyr-ia.vercel.app`)
- **Pour professionnaliser :** Freenom (.tk, .ml) ou eu.org
- **Pour acheter plus tard :** Un .com coûte ~10-15€/an

### Mises à jour automatiques
- Chaque `git push` sur la branche `main` déclenche un nouveau déploiement
- Parfait pour l'intégration continue

### Sécurité
- ⚠️ Ne jamais commiter les fichiers `.env` ou `.env.local`
- ✅ Utiliser les variables d'environnement de la plateforme
- ✅ HTTPS est automatique sur toutes les plateformes

---

## 🎉 Résultat Final

Après avoir suivi ce guide, vous aurez :
- ✅ Application hébergée gratuitement
- ✅ HTTPS automatique et sécurisé
- ✅ Nom de domaine (gratuit ou personnalisé)
- ✅ Déploiement automatique à chaque changement
- ✅ Performance optimale avec CDN global

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifier les logs dans le dashboard de votre plateforme
2. Consulter la documentation : 
   - [Vercel Docs](https://vercel.com/docs)
   - [Netlify Docs](https://docs.netlify.com)
3. Vérifier que le build local fonctionne : `npm run build && npm run preview`

**Bon déploiement de Lyr-IA ! 🚀**

