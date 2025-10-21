# 🚀 Installation des Migrations Communautaires

## ❌ **Problème Identifié**

La table `user_playlists` n'existe pas, ce qui signifie que les migrations SQL n'ont **pas été exécutées**.

---

## ✅ **Solution : Exécuter les Migrations**

### **Étape 1 : Diagnostic**

1. **Ouvrez Supabase Dashboard** : https://supabase.com/dashboard
2. **Sélectionnez votre projet**
3. **Allez dans SQL Editor**
4. **Exécutez ce script** :

```sql
-- Copier-coller le contenu de check_all_tables.sql
```

Cela vous dira quelles tables manquent.

---

### **Étape 2 : Exécuter Migration 006 (Community Hub)**

**Si vous voyez des tables manquantes liées à `community_posts`, `post_likes`, `post_comments`, etc.**

1. **Ouvrez le fichier** : `supabase/migrations/006_community_hub.sql`
2. **Copiez TOUT le contenu** (492 lignes)
3. **Collez dans SQL Editor de Supabase**
4. **Cliquez sur "Run"**
5. **Attendez le message de succès**

**Attendu :**
```
Success. No rows returned
```

---

### **Étape 3 : Exécuter Migration 007 (Playlists & Badges)**

**Si vous voyez des tables manquantes liées à `user_playlists`, `playlist_songs`, `badges`, etc.**

1. **Ouvrez le fichier** : `supabase/migrations/007_playlists_and_badges.sql`
2. **Copiez TOUT le contenu** (576 lignes)
3. **Collez dans SQL Editor de Supabase**
4. **Cliquez sur "Run"**
5. **Attendez le message de succès**

**Attendu :**
```
Success. No rows returned
```

---

### **Étape 4 : Vérification Finale**

Après avoir exécuté les migrations, exécutez à nouveau `check_all_tables.sql` :

**Résultat attendu :**
```
tables_existantes | tables_requises | diagnostic
------------------|-----------------|----------------------------------
11                | 11              | ✅ TOUTES LES TABLES EXISTENT
```

---

## 🎯 **Tables Créées**

### **Migration 006 (Community Hub)** :
- ✅ `community_posts` - Posts partagés
- ✅ `post_likes` - Likes des posts
- ✅ `post_comments` - Commentaires
- ✅ `user_follows` - Système de follow
- ✅ `post_views` - Vues des posts

### **Migration 007 (Playlists & Badges)** :
- ✅ `playlists` - Playlists des utilisateurs (renommée en `user_playlists` dans l'app)
- ✅ `playlist_songs` - Chansons dans les playlists
- ✅ `playlist_likes` - Likes des playlists
- ✅ `playlist_views` - Vues des playlists
- ✅ `badges` - Badges disponibles
- ✅ `user_badges` - Badges des utilisateurs

---

## 🔧 **En Cas d'Erreur**

### **Erreur : "relation already exists"**
**Solution :** La table existe déjà, passez à la migration suivante.

### **Erreur : "syntax error at or near"**
**Solution :** Assurez-vous de copier TOUT le fichier SQL, pas juste une partie.

### **Erreur : "permission denied"**
**Solution :** Vous devez être connecté avec un compte admin du projet Supabase.

---

## 📊 **Après l'Installation**

Une fois les migrations exécutées avec succès :

1. **Rechargez votre application** (Ctrl+R ou Cmd+R)
2. **Allez dans "Communauté"**
3. **Partagez vos créations** depuis "Mon Compte"
4. **Créez des playlists**
5. **Likez des posts**

---

**Exécutez d'abord `check_all_tables.sql` et dites-moi ce que vous voyez ! 🚀**
