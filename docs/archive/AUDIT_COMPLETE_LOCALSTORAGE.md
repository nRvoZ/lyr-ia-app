# 🔍 Audit Complet - Données LocalStorage vs Supabase

## Objectif
Identifier toutes les données stockées en localStorage et les migrer vers Supabase

## 📋 Tables Supabase existantes

D'après vos migrations SQL, vous avez déjà ces tables :

### 1. ✅ user_profiles
**Colonnes** :
- Informations de base : `id`, `username`, `email`, `plan`, `credits`
- Stripe : `stripe_customer_id`, `stripe_subscription_id`
- Achievements : `achievements`, `unlocked_titles`, `active_title`, `unlocked_themes`
- Stats : `total_songs_generated`, `total_album_arts_generated`, etc.
- Admin : `is_admin`, `is_banned`
- Secret Society : `secret_society_invited_by`, etc.

### 2. ✅ song_history
**Colonnes** :
- `id`, `user_id`, `mode`, `language`
- `inputs` (JSONB), `outputs` (JSONB), `burst_outputs` (JSONB)
- `album_art`, `verification_result`
- `is_copied`, `is_favorite`, `credits_used`
- `tags[]`, `created_at`

### 3. ⚠️ personal_profiles
**Colonnes** :
- `id`, `user_id`, `profile_number` (1, 2, 3)
- `name`, `style_description`, `example_lyrics`
- `created_at`, `updated_at`

### 4. ✅ payment_transactions
**Colonnes** :
- `id`, `user_id`, `stripe_payment_intent_id`
- `amount`, `currency`, `status`, `type`
- `credits_purchased`, `created_at`

### 5. ✅ broadcast_messages
**Colonnes** :
- `id`, `message`, `is_active`, `created_at`

### 6. ✅ admin_logs (migration 002)
**Colonnes** :
- `id`, `admin_id`, `action`, `target_user_id`
- `details` (JSONB), `ip_address`, `created_at`

### 7. ✅ secret_society_invitations (migration 002)
**Colonnes** :
- `id`, `inviter_id`, `invitee_email`
- `invitation_code`, `used_by`, `used_at`
- `expires_at`, `created_at`

## 🔍 Données actuellement en LocalStorage

Cherchons ce qui est encore stocké localement...

### Dans App.tsx :
1. ✅ **history** → **Déjà migré** vers HistoryContext/Supabase
2. ⚠️ **personalProfiles** → **À MIGRER** vers `personal_profiles` table
3. ⚠️ **settings** → À vérifier (peut rester local ou migrer)
4. ⚠️ **customBg** → Peut rester local
5. ⚠️ **theme** → Peut rester local ou migrer dans user_profiles

### Dans les contextes :
1. ⚠️ **Broadcast messages** → Devrait utiliser `broadcast_messages` table
2. ⚠️ **Personal profiles** → Devrait utiliser `personal_profiles` table

## 📊 Plan d'action

### PRIORITÉ 1 : Profils Personnalisés (IA-Training)
**Table** : `personal_profiles`  
**État** : ⚠️ Table existe, mais pas utilisée  
**Action** : Créer un service pour sauvegarder dans Supabase

### PRIORITÉ 2 : Settings utilisateur
**Options** :
- A. Sauvegarder dans un champ JSONB dans `user_profiles`
- B. Créer une table `user_settings`
- C. Garder en localStorage (acceptable pour les préférences UI)

### PRIORITÉ 3 : Messages de diffusion
**Table** : `broadcast_messages`  
**État** : ⚠️ Table existe, mais admin utilise localStorage  
**Action** : Connecter l'admin dashboard à Supabase

### PRIORITÉ 4 : Autres données
- Thème actif → Peut aller dans `user_profiles.active_theme`
- Background custom → Peut rester local

## 🎯 Ce qui doit être migré MAINTENANT

1. **Personal Profiles (les 3 profils IA-Training)** ✅ PRIORITAIRE
2. **Broadcast Messages** ✅ IMPORTANT
3. **Settings utilisateur** ⚠️ Optionnel

## 📝 Ce qui a déjà été migré

✅ **Historique des chansons** → `song_history`  
✅ **Achievements** → `user_profiles.achievements`  
✅ **Stats utilisateur** → Colonnes dans `user_profiles`  
✅ **Informations de profil** → `user_profiles`  
✅ **Crédits et plans** → `user_profiles`  

## 🚀 Prochaines étapes recommandées

### Étape 1 : Corriger les NULL existants (URGENT)
Exécutez le script `FIX_NULL_VALUES.sql` que j'ai créé

### Étape 2 : Migrer les Personal Profiles
Créer un service pour :
- Charger les 3 profils depuis `personal_profiles` table
- Sauvegarder automatiquement les modifications
- Synchroniser avec Supabase

### Étape 3 : Migrer les Broadcast Messages
Connecter le AdminDashboard à la table `broadcast_messages`

### Étape 4 : Audit final
Vérifier qu'il ne reste plus de données critiques en localStorage

## 💡 Voulez-vous que je :

**Option A** : Corriger d'abord les NULL dans user_profiles (RAPIDE - 1 minute)  
**Option B** : Migrer les Personal Profiles vers Supabase (MOYEN - 10 minutes)  
**Option C** : Faire un audit complet et tout migrer (LONG - 30+ minutes)  

Quelle option préférez-vous ?





