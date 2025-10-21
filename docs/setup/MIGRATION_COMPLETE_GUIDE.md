# 🚀 Guide de Migration Complète vers Supabase

## ✅ Services créés

Tous les services nécessaires ont été créés pour migrer vers Supabase :

### 1. achievementService.ts ✅
- `getUserStats()` - Récupère toutes les stats
- `updateAchievement()` - Met à jour un achievement
- `claimAchievement()` - Marque comme réclamé
- `incrementGenerationStats()` - Incrémente après génération
- `incrementAnalyzerStats()` - Incrémente l'analyseur

### 2. historyService.ts ✅
- `saveSongToHistory()` - Sauvegarde une chanson
- `getUserHistory()` - Récupère l'historique
- `markSongAsCopied()` - Marque comme copié
- `toggleSongFavorite()` - Gère les favoris
- `deleteSongFromHistory()` - Supprime une chanson

### 3. personalProfilesService.ts ✅
- `getUserProfiles()` - Récupère les 3 profils IA-Training
- `savePersonalProfile()` - Sauvegarde un profil
- `deletePersonalProfile()` - Supprime un profil

### 4. settingsService.ts ✅
- `getUserSettings()` - Récupère les paramètres
- `saveUserSettings()` - Sauvegarde les paramètres
- `saveActiveTheme()` - Sauvegarde le thème
- `saveFontColor()` - Sauvegarde la couleur de police
- `saveCustomBackground()` - Sauvegarde le background custom

### 5. broadcastService.ts ✅
- `getActiveBroadcastMessage()` - Récupère le message actif
- `createBroadcastMessage()` - Crée un message (admin)
- `clearBroadcastMessage()` - Désactive le message
- `getAllBroadcastMessages()` - Liste tous les messages (admin)

## 📋 Contextes créés

### 1. HistoryContext ✅
- Gère l'historique des chansons
- Charge automatiquement à la connexion
- Vide à la déconnexion

### 2. PersonalProfilesContext ✅
- Gère les 3 profils personnalisés
- Synchronisation avec Supabase
- Isolation par utilisateur

## 🗄️ Migrations SQL

### Migration 001 - Initial Schema ✅
- Tables de base : user_profiles, song_history, personal_profiles
- Fonctions : add_user_credits, deduct_user_credits

### Migration 002 - Complete Schema ✅
- Tables admin : admin_logs, secret_society_invitations
- System settings et user sessions

### Migration 003 - User Credits Function ✅
- Amélioration de la fonction add_user_credits

### Migration 004 - Achievements Tracking ✅
- Colonnes de statistiques
- Fonctions RPC pour achievements

### Migration 005 - Fix NULL Values ✅
- Correction des valeurs NULL
- Ajout de colonnes : settings, active_theme, custom_background, font_color

## 📊 Structure complète de user_profiles

```sql
-- Informations de base
id                          UUID PRIMARY KEY
username                    TEXT UNIQUE
email                       TEXT
plan                        subscription_plan
credits                     INTEGER

-- Achievements et progression
achievements                JSONB DEFAULT '{}'
unlocked_titles             TEXT[] DEFAULT '{}'
active_title                TEXT
unlocked_themes             TEXT[] DEFAULT '{}'

-- Statistiques
total_songs_generated       INTEGER DEFAULT 0
total_album_arts_generated  INTEGER DEFAULT 0
total_analyzer_uses         INTEGER DEFAULT 0
total_burst_generations     INTEGER DEFAULT 0
languages_used              TEXT[] DEFAULT '{}'
modes_used                  TEXT[] DEFAULT '{}'
artists_used                TEXT[] DEFAULT '{}'
styles_explored             TEXT[] DEFAULT '{}'
consecutive_days_streak     INTEGER DEFAULT 0
last_generation_date        DATE

-- Préférences utilisateur
settings                    JSONB DEFAULT '{}'
active_theme                TEXT DEFAULT 'Aurora'
custom_background           TEXT
font_color                  TEXT DEFAULT 'white'

-- Stripe
stripe_customer_id          TEXT
stripe_subscription_id      TEXT
subscription_status         TEXT
subscription_current_period_end TIMESTAMP WITH TIME ZONE

-- Admin et modération
is_admin                    BOOLEAN DEFAULT FALSE
is_banned                   BOOLEAN DEFAULT FALSE
profile_picture_url         TEXT

-- Secret Society
secret_society_invited_by   UUID
secret_society_joined_at    TIMESTAMP WITH TIME ZONE
secret_society_invitation_code TEXT UNIQUE

-- Tracking
last_login                  TIMESTAMP WITH TIME ZONE
login_count                 INTEGER DEFAULT 0
total_generations           INTEGER DEFAULT 0
total_credits_spent         INTEGER DEFAULT 0
created_at                  TIMESTAMP WITH TIME ZONE
updated_at                  TIMESTAMP WITH TIME ZONE
```

## 🎯 Étapes pour finaliser la migration

### Étape 1 : Déployer la migration 005 (URGENT)

Exécutez dans **Supabase SQL Editor** :

```sql
-- Le contenu complet est dans supabase/migrations/005_fix_null_values.sql
-- OU exécutez : npx supabase db push
```

Cela va :
- ✅ Corriger tous les NULL
- ✅ Ajouter les colonnes manquantes (settings, active_theme, etc.)

### Étape 2 : Intégrer les contexts dans SupabaseUserContext

Il faut modifier `SupabaseUserContext.tsx` pour :
- Charger les settings depuis Supabase
- Sauvegarder automatiquement les settings
- Charger/sauvegarder le thème et la couleur de police

### Étape 3 : Mettre à jour AdminDashboard

Connecter AdminDashboard à `broadcastService` pour :
- Charger le message actif
- Créer de nouveaux messages
- Les désactiver

### Étape 4 : Modifier MainGenerator

Passer `savePersonalProfile` au lieu de `setPersonalProfiles`

## 📝 Checklist finale

### Données migrées ✅
- [x] Historique des chansons → song_history
- [x] Achievements → user_profiles.achievements
- [x] Stats utilisateur → Colonnes dans user_profiles
- [x] Services créés → achievementService, historyService, personalProfilesService, settingsService, broadcastService
- [x] Contextes créés → HistoryContext, PersonalProfilesContext

### Données à connecter 🔧
- [ ] Personal Profiles → Connecter PersonalProfileModal
- [ ] Settings → Sauvegarder automatiquement
- [ ] Broadcast Messages → Connecter AdminDashboard
- [ ] Thème actif → Charger/sauvegarder
- [ ] Background custom → Charger/sauvegarder

### Tests à faire 🧪
- [ ] Créer un profil IA-Training et se déconnecter/reconnecter
- [ ] Modifier les settings et vérifier qu'ils persistent
- [ ] Admin : créer un broadcast message
- [ ] Changer de thème et vérifier la persistance
- [ ] Générer avec background custom

## 🚀 État actuel

**✅ Services créés (100%)** :
- achievementService
- historyService
- personalProfilesService
- settingsService
- broadcastService

**✅ Contextes créés** :
- HistoryContext ✅
- PersonalProfilesContext ✅

**⚠️ Intégrations restantes** :
- Connecter les services aux composants
- Tester la persistance de toutes les données

## 🎯 Prochaine étape

**Déployez la migration 005** :

**Option A - Via CLI** :
```bash
npx supabase db push
# Puis appuyez sur Y
```

**Option B - Via Dashboard** :
1. Allez sur https://supabase.com/dashboard/project/vidykmwboifpdgeeavjg/editor
2. Copiez le contenu de `supabase/migrations/005_fix_null_values.sql`
3. Collez et exécutez

Après ça, je connecterai tous les services aux composants ! 🔌





