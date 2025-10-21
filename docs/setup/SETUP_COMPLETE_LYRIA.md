# 🎵 Configuration Complète de LyrIA avec Supabase

## 🎯 **Étapes d'Installation**

### 1. **Exécuter le Schéma SQL Complet**

Dans votre **SQL Editor** Supabase, exécutez **dans l'ordre** :

#### A. Schéma Initial (si pas déjà fait)
```sql
-- Copiez le contenu de supabase/migrations/001_initial_schema.sql
```

#### B. Schéma Complet (NOUVEAU)
```sql
-- Copiez le contenu de supabase/migrations/002_complete_schema.sql
```

### 2. **Créer votre Premier Admin**

Une fois connecté avec votre compte, exécutez dans Supabase :

```sql
-- Remplacez 'votre_email@example.com' par votre email
UPDATE user_profiles 
SET is_admin = true 
WHERE email = 'votre_email@example.com';
```

### 3. **Tester l'Application**

1. **Rechargez l'application** (F5)
2. **Connectez-vous** avec votre compte
3. **Accédez au panneau admin** via le menu "Admin"

## 🔧 **Fonctionnalités Disponibles**

### ✅ **Authentification Supabase**
- Inscription/Connexion sécurisée
- Gestion des profils utilisateurs
- Données persistantes dans le cloud

### ✅ **Système de Plans**
- **Free** : 150 crédits de départ
- **Discovery** : Plan découverte
- **Pro** : Plan professionnel
- **Ultimate** : Plan ultime
- **Secret Society** : Crédits illimités 🔮

### ✅ **Panneau d'Administration**
- Statistiques en temps réel
- Gestion des utilisateurs
- Bannissement/Débannissement
- Mise à niveau des plans
- Invitations Secret Society

### ✅ **Secret Society**
- Système d'invitations exclusives
- Crédits illimités
- Fonctionnalités premium

## 🎮 **Utilisation du Panneau Admin**

### Accès Admin
1. Connectez-vous avec un compte admin
2. Cliquez sur **"Admin"** dans le menu
3. Accédez au tableau de bord complet

### Gestion des Utilisateurs
- **Voir tous les utilisateurs** avec leurs statistiques
- **Bannir/Débannir** des utilisateurs
- **Changer les plans** (Free → Pro → Ultimate → Secret Society)
- **Ajouter des crédits** automatiquement

### Invitations Secret Society
1. Entrez l'email de la personne à inviter
2. Cliquez sur **"Créer Invitation"**
3. Un code unique sera généré
4. Partagez le code avec la personne

## 🔮 **Secret Society - Guide Complet**

### Pour les Admins
- Créez des invitations via le panneau admin
- Gérez les membres existants
- Surveillez l'activité

### Pour les Invités
1. Recevez un code d'invitation
2. Utilisez la fonction `use_secret_society_invitation(code)`
3. Votre plan passe automatiquement à "Secret Society"
4. Crédits illimités activés

## 📊 **Statistiques Disponibles**

Le panneau admin affiche :
- **Nombre total d'utilisateurs**
- **Utilisateurs actifs aujourd'hui**
- **Total des générations**
- **Membres Secret Society**
- **Distribution des plans**
- **Nouveaux inscrits (7 derniers jours)**

## 🛠️ **Fonctions SQL Disponibles**

### Administration
- `get_admin_dashboard_stats()` - Statistiques complètes
- `admin_ban_user(user_id, ban_status, reason)` - Bannir/débannir
- `admin_upgrade_user_plan(user_id, new_plan, credits)` - Changer plan
- `log_admin_action(action, target_user, details)` - Logger les actions

### Secret Society
- `create_secret_society_invitation(email)` - Créer invitation
- `use_secret_society_invitation(code)` - Utiliser invitation

### Crédits
- `add_user_credits(user_id, credits)` - Ajouter crédits
- `deduct_user_credits(user_id, credits)` - Déduire crédits

## 🔒 **Sécurité (RLS)**

Toutes les tables ont des politiques de sécurité :
- **Utilisateurs** : Accès à leurs propres données
- **Admins** : Accès complet aux données nécessaires
- **Secret Society** : Fonctionnalités exclusives
- **Logs** : Traçabilité complète des actions

## 🚀 **Prochaines Étapes**

1. **Testez toutes les fonctionnalités**
2. **Créez votre premier membre Secret Society**
3. **Configurez Stripe** pour les paiements (optionnel)
4. **Personnalisez les plans** selon vos besoins

## 🐛 **Dépannage**

### Si les fonctions SQL ne marchent pas
- Vérifiez que le schéma complet est bien exécuté
- Les fonctions ont des fallbacks pour fonctionner sans

### Si l'admin ne fonctionne pas
- Vérifiez que `is_admin = true` dans votre profil
- Rechargez l'application après modification

### Si Secret Society ne fonctionne pas
- Les invitations peuvent être créées manuellement
- Mettez à jour le plan directement en base si besoin

## 🎉 **Félicitations !**

Votre application LyrIA est maintenant **complètement fonctionnelle** avec :
- ✅ Authentification Supabase
- ✅ Système de plans complet
- ✅ Panneau d'administration
- ✅ Secret Society
- ✅ Gestion des crédits
- ✅ Sécurité avancée

**L'application est prête pour la production !** 🚀
