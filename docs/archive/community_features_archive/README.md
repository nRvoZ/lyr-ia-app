# 📦 Archive - Fonctionnalités Communautaires

## 🔖 **Statut : DÉSACTIVÉ TEMPORAIREMENT**

Ce dossier contient tous les fichiers liés aux fonctionnalités communautaires qui ont été **temporairement désactivées** mais **NON SUPPRIMÉES**.

---

## 📁 **Contenu de l'Archive**

### **Scripts SQL de Diagnostic :**
- ✅ `check_all_tables.sql` - Vérifier les tables installées
- ✅ `test_community_features.sql` - Tester les fonctionnalités
- ✅ `check_rpc_functions.sql` - Vérifier les fonctions RPC
- ✅ `check_missing_functions.sql` - Vérifier les fonctions manquantes

### **Guides de Migration :**
- ✅ `EXECUTER_MIGRATION_007.md` - Instructions pour exécuter la migration 007
- ✅ `GUIDE_TEST_COMMUNAUTE.md` - Guide de test des fonctionnalités
- ✅ `INSTALLATION_MIGRATIONS.md` - Guide complet d'installation
- ✅ `RESUME_CORRECTIONS_COMMUNAUTE.md` - Résumé des corrections

---

## 🔄 **Pour Réactiver les Fonctionnalités**

### **Étape 1 : Exécuter les Migrations SQL**
1. Ouvrez Supabase Dashboard
2. Allez dans SQL Editor
3. Exécutez `supabase/migrations/006_community_hub.sql` (si pas déjà fait)
4. Exécutez `supabase/migrations/007_playlists_and_badges.sql`
5. Vérifiez avec `check_all_tables.sql` que toutes les tables existent

### **Étape 2 : Réactiver dans le Code**

#### **Dans `App.tsx` :**
Décommentez les lignes suivantes :

**Ligne ~872 :**
```typescript
case 'community':
    return <CommunityHub />;
```

**Lignes ~915-916 (Navigation Desktop) :**
```typescript
<NavButton view="community" label="Communauté" />
```

**Lignes ~953-954 (Navigation Mobile) :**
```typescript
<NavButton view="community" label="Communauté" />
```

#### **Dans `src/components/AccountView.tsx` :**
Décommentez les lignes ~340-342 :
```typescript
<button onClick={() => handleShare(selectedItem)} className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/40 transition-colors" title="Partager dans la communauté">
    <ShareIcon />
</button>
```

### **Étape 3 : Tester**
1. Rechargez l'application (Ctrl+R)
2. Allez dans "Communauté"
3. Partagez une création
4. Créez une playlist
5. Likez des posts

---

## 📊 **Tables Requises (11 au total)**

### **Migration 006 (Community Hub) :**
- `community_posts`
- `post_likes`
- `post_comments`
- `user_follows`
- `post_views`

### **Migration 007 (Playlists & Badges) :**
- `playlists` (utilisé comme `user_playlists` dans l'app)
- `playlist_songs`
- `playlist_likes`
- `playlist_views`
- `community_badges`
- `user_badges`

---

## 🎯 **Fonctionnalités Incluses**

### **Hub Communautaire :**
- ✅ Partage de créations publiques
- ✅ Feed communautaire (récent, populaire, tendances)
- ✅ Système de likes et commentaires
- ✅ Profils publics
- ✅ Système de follow/abonnements
- ✅ Vues et statistiques

### **Playlists :**
- ✅ Création de playlists publiques/privées
- ✅ Ajout/retrait de chansons
- ✅ Likes de playlists
- ✅ Partage de playlists

### **Badges :**
- ✅ 15 badges par défaut
- ✅ Attribution automatique selon critères
- ✅ Badges mis en avant sur le profil
- ✅ Système de points/réputation

---

## 📝 **Notes**

- **Date de désactivation :** 19 octobre 2025
- **Raison :** Tables non créées dans Supabase (migrations non exécutées)
- **Code :** Commenté, pas supprimé
- **Migrations SQL :** Toujours disponibles dans `supabase/migrations/`
- **Services :** Toujours disponibles dans `src/services/communityService.ts`, `playlistService.ts`, `badgeService.ts`
- **Composants :** Toujours disponibles dans `src/components/CommunityHub.tsx`, `PublicProfile.tsx`, etc.

---

**Les fonctionnalités sont prêtes à être réactivées dès que les migrations SQL seront exécutées ! 🚀**



