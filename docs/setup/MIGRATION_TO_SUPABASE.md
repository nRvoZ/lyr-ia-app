# 🚀 Migration vers Supabase - Guide Complet

## ✅ Ce qui a été fait

1. **Service d'authentification Supabase** créé (`src/services/authService.ts`)
2. **Nouveau UserContext** avec Supabase (`src/contexts/SupabaseUserContext.tsx`)
3. **Schéma de base de données** mis à jour avec les fonctions SQL
4. **App.tsx** modifié pour utiliser le nouveau contexte

## 🔧 Étapes à compléter

### 1. Exécuter le schéma SQL dans Supabase

1. Allez dans votre interface Supabase : https://supabase.com/dashboard
2. Sélectionnez votre projet `lyria-app`
3. **SQL Editor** → **New query**
4. Copiez tout le contenu de `supabase/migrations/001_initial_schema.sql`
5. Cliquez sur **"Run"** pour exécuter

### 2. Vérifier les tables créées

Dans **Table Editor**, vous devriez voir :
- ✅ `user_profiles`
- ✅ `song_history`
- ✅ `personal_profiles`
- ✅ `broadcast_messages`
- ✅ `payment_transactions`

### 3. Tester l'authentification

1. Ouvrez http://localhost:3002
2. Cliquez sur **"Connexion / Inscription"**
3. Créez un nouveau compte avec :
   - Email : `test@example.com`
   - Mot de passe : `password123`
   - Nom d'utilisateur : `testuser`

### 4. Vérifier dans Supabase

1. **Authentication** → **Users** : Votre utilisateur doit apparaître
2. **Table Editor** → **user_profiles** : Le profil doit être créé automatiquement

## 🔍 Différences avec localStorage

### Avant (localStorage)
- Données stockées localement dans le navigateur
- Pas de synchronisation entre appareils
- Données perdues si cache vidé

### Maintenant (Supabase)
- ✅ Données stockées dans le cloud
- ✅ Synchronisation entre appareils
- ✅ Authentification sécurisée
- ✅ Sauvegarde automatique
- ✅ Partage possible entre utilisateurs

## 🎯 Fonctionnalités disponibles

### Authentification
- ✅ Inscription avec email/mot de passe
- ✅ Connexion sécurisée
- ✅ Déconnexion
- ✅ Session persistante

### Gestion des crédits
- ✅ Ajout de crédits
- ✅ Déduction de crédits
- ✅ Crédits illimités pour les abonnés

### Profil utilisateur
- ✅ Nom d'utilisateur unique
- ✅ Système d'achievements
- ✅ Plans d'abonnement
- ✅ Historique des générations

## 🐛 Dépannage

### Erreur "Cannot find module"
```bash
npm install @supabase/supabase-js
```

### Erreur de connexion Supabase
Vérifiez votre fichier `.env` :
```env
VITE_SUPABASE_URL=https://VOTRE_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Tables non créées
1. Vérifiez que le SQL s'est exécuté sans erreur
2. Regardez les logs dans **Logs** → **Database**

### Authentification ne fonctionne pas
1. Vérifiez **Authentication** → **Settings** → **Site URL** : `http://localhost:3002`
2. Vérifiez **Redirect URLs** : `http://localhost:3002/**`

## 🎉 Test de validation

Pour confirmer que tout fonctionne :

1. **Inscription** : Créez un compte → Vérifiez dans Supabase Users
2. **Connexion** : Connectez-vous → Vérifiez que l'interface change
3. **Génération** : Testez une génération de paroles → Vérifiez l'historique
4. **Déconnexion** : Déconnectez-vous → Vérifiez le retour à l'état non connecté

## 🚀 Prochaines étapes

Une fois Supabase fonctionnel :
1. **Configuration Stripe** pour les paiements
2. **Déploiement des Edge Functions** pour Gemini
3. **Tests complets** de toutes les fonctionnalités

Votre application LyrIA utilise maintenant une vraie base de données cloud ! 🎵
