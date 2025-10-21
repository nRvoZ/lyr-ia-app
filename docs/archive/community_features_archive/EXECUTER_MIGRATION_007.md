# 🚀 Exécuter Migration 007 - Playlists & Badges

## ✅ **Statut Actuel**
- ✅ **9 tables sur 11** installées
- ⚠️ **2 tables manquantes** : `playlists` et `community_badges` (+ tables associées)

---

## 📋 **Instructions Simples**

### **Étape 1 : Ouvrir Supabase**
1. Allez sur : https://supabase.com/dashboard
2. Sélectionnez votre projet **Lyr-IA**
3. Cliquez sur **"SQL Editor"** dans le menu de gauche

### **Étape 2 : Copier le Fichier SQL**
1. **Ouvrez le fichier** : `supabase/migrations/007_playlists_and_badges.sql`
2. **Sélectionnez TOUT** (Ctrl+A)
3. **Copiez TOUT** (Ctrl+C)

### **Étape 3 : Exécuter dans Supabase**
1. Dans le **SQL Editor**, cliquez sur **"New query"**
2. **Collez** le contenu copié (Ctrl+V)
3. Cliquez sur **"Run"** (ou F5)
4. **Attendez 5-10 secondes**

### **Étape 4 : Vérifier le Résultat**

**✅ Si vous voyez :**
```
Success. No rows returned
```
**→ C'EST BON ! La migration est installée !**

**❌ Si vous voyez une erreur :**
→ Copiez l'erreur et dites-moi ce qui s'affiche

---

## 🧪 **Vérification Finale**

Après l'installation, exécutez à nouveau `check_all_tables.sql` :

**Résultat attendu :**
```
tables_existantes | tables_requises | diagnostic
------------------|-----------------|----------------------------------
11                | 11              | ✅ TOUTES LES TABLES EXISTENT
```

---

## 🎯 **Ce Qui Sera Créé**

### **Tables :**
- ✅ `playlists` - Playlists des utilisateurs
- ✅ `playlist_songs` - Chansons dans les playlists
- ✅ `playlist_likes` - Likes des playlists
- ✅ `playlist_views` - Vues des playlists
- ✅ `community_badges` - Badges disponibles
- ✅ `user_badges` - Badges des utilisateurs

### **Fonctions :**
- ✅ `get_public_playlists()` - Récupérer les playlists publiques
- ✅ `get_playlist_songs()` - Récupérer les chansons d'une playlist
- ✅ `get_user_badges()` - Récupérer les badges d'un utilisateur
- ✅ `check_and_award_badges()` - Attribution automatique des badges

### **Badges par Défaut :**
- 🎵 Premier Créateur
- 🎶 Créateur Actif
- 🎼 Créateur Prolifique
- 🏆 Créateur Légendaire
- ❤️ Premier Like
- 🔥 Populaire
- 🚀 Viral
- 👥 Premier Abonné
- ⭐ Influenceur
- 🌟 Célébrité
- 👑 Créateur du Mois
- 📝 Playlist Master
- 🎯 Curateur
- 💬 Collaborateur
- 🗺️ Explorateur

---

## 🎉 **Après l'Installation**

1. **Rechargez votre application** (Ctrl+R)
2. **Reconnectez-vous** si nécessaire
3. **Allez dans "Mon Compte"**
4. **Partagez vos créations** (bouton vert "Partager")
5. **Allez dans "Communauté"**
6. **Créez des playlists**
7. **Likez des posts**

---

**Exécutez la migration et dites-moi le résultat ! 🚀**
