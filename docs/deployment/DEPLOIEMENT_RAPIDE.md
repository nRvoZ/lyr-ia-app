# 🚀 Déploiement Rapide - Lyr-IA

## ⚡ Commandes à Exécuter (Méthode la Plus Rapide)

### 1. Vérifier que tout fonctionne
```bash
npm install
npm run build
npm run preview
```
Si ça fonctionne → Passez à l'étape 2 ✅

### 2. Créer le dépôt GitHub
```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "🚀 Déploiement initial de Lyr-IA"

# Créer le dépôt sur GitHub (remplacez VOTRE-USERNAME)
# Aller sur https://github.com/new d'abord pour créer le dépôt "lyr-ia-app"

# Lier et pousser
git remote add origin https://github.com/VOTRE-USERNAME/lyr-ia-app.git
git branch -M main
git push -u origin main
```

### 3. Déployer sur Vercel (RECOMMANDÉ)

**Option A : Via le site web (Plus simple)**
1. Aller sur https://vercel.com
2. Cliquer sur "Sign Up" avec GitHub
3. Cliquer sur "New Project"
4. Importer votre dépôt `lyr-ia-app`
5. Cliquer sur "Deploy" (tout est automatique !)

**Option B : Via CLI (Plus rapide pour les pros)**
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod
```

### 4. Configurer les variables d'environnement

Dans le dashboard Vercel :
1. Aller dans Settings → Environment Variables
2. Ajouter vos variables Supabase :
   ```
   VITE_SUPABASE_URL = votre_url_supabase
   VITE_SUPABASE_ANON_KEY = votre_clé_publique
   ```
3. Redéployer si nécessaire

---

## 🌐 Votre App est en Ligne !

Après le déploiement, vous recevrez :
- **URL automatique** : `https://lyr-ia-app.vercel.app`
- **HTTPS** : ✅ Automatique
- **Certificat SSL** : ✅ Gratuit
- **CDN Global** : ✅ Inclus

---

## 🎯 Prochaines Étapes (Optionnel)

### Obtenir un nom de domaine gratuit

**Option 1 : Freenom (Recommandé)**
1. Aller sur https://www.freenom.com
2. Rechercher `lyr-ia` ou `lyria` (ou votre nom)
3. Choisir `.tk`, `.ml`, `.ga`, `.cf` ou `.gq`
4. S'inscrire et obtenir le domaine (gratuit 12 mois)
5. Dans Vercel : Settings → Domains → Ajouter votre domaine
6. Configurer les DNS sur Freenom :
   - Utiliser les nameservers : `ns1.vercel-dns.com` et `ns2.vercel-dns.com`
7. Attendre 1-2 heures pour la propagation DNS

**Option 2 : Garder le domaine Vercel**
- C'est gratuit et professionnel : `lyr-ia.vercel.app`
- Vous pouvez le personnaliser dans les settings

---

## 📝 Checklist de Déploiement

- [ ] Code fonctionnel en local (`npm run build` sans erreurs)
- [ ] Dépôt GitHub créé et code poussé
- [ ] Compte Vercel créé
- [ ] Projet importé et déployé sur Vercel
- [ ] Variables d'environnement configurées
- [ ] App accessible via l'URL Vercel
- [ ] Tester toutes les fonctionnalités en production
- [ ] (Optionnel) Domaine personnalisé configuré

---

## 🔄 Mises à Jour Futures

Pour mettre à jour votre app après déploiement :

```bash
# Faire vos modifications
# ...

# Commiter et pousser
git add .
git commit -m "✨ Nouvelle fonctionnalité"
git push

# Vercel déploie automatiquement ! 🎉
```

---

## ⚠️ Problèmes Courants

### Build échoue sur Vercel
```bash
# Vérifier en local d'abord
npm run build

# Si ça marche localement, vérifier :
# - Les variables d'environnement dans Vercel
# - Les versions de Node (Vercel utilise Node 18 par défaut)
```

### Routes ne fonctionnent pas (404)
✅ **Déjà corrigé !** Le fichier `vercel.json` a été créé automatiquement.

### Variables d'environnement non accessibles
- Elles doivent commencer par `VITE_`
- Redéployer après modification

---

## 💰 Coûts

### Vercel Gratuit
- ✅ 100 GB bande passante/mois
- ✅ Builds illimités
- ✅ CDN global
- ✅ HTTPS automatique
- ✅ Parfait pour votre usage !

**Vous ne paierez rien tant que vous restez dans ces limites.**

---

## 🎉 Félicitations !

Votre application Lyr-IA est maintenant hébergée gratuitement et accessible au monde entier !

**URL de démo attendue :** `https://lyr-ia-app.vercel.app`

Partagez-la avec vos utilisateurs ! 🚀

---

## 📞 Besoin d'Aide ?

1. Vérifier les logs de build dans le dashboard Vercel
2. Consulter le guide complet : `GUIDE_HEBERGEMENT_GRATUIT.md`
3. Documentation Vercel : https://vercel.com/docs

