# 🔧 FIX : Compte Désynchronisé

## 🚨 Problème Identifié

Votre compte `lyria.teazm@gmail.com` existe dans **Authentication** mais plus dans la **base de données** des profils utilisateurs.

**Résultat :**
- ✅ Le compte existe dans `auth.users` (peut se connecter théoriquement)
- ❌ Le profil n'existe PAS dans `user_profiles` (pas de username, crédits, etc.)
- ❌ Impossible de recréer le compte (email déjà pris)

---

## 🎯 SOLUTION RECOMMANDÉE (5 min)

### ✅ Méthode 1 : Recréer le Profil (Le Plus Simple)

#### Étape 1 : Trouver l'ID du Compte

1. **Aller sur** : https://supabase.com/dashboard
2. **Cliquer** : **SQL Editor**
3. **Copier/Coller** :

```sql
SELECT 
    id,
    email,
    created_at
FROM auth.users 
WHERE email = 'lyria.teazm@gmail.com';
```

4. **Cliquer** : **RUN**
5. **Copier l'ID** (format : `12345678-1234-1234-1234-123456789abc`)

#### Étape 2 : Recréer le Profil

1. **Copier/Coller** ce code dans le SQL Editor :

```sql
INSERT INTO user_profiles (
    id,
    email,
    username,
    plan,
    credits,
    is_admin,
    is_banned,
    achievements
) VALUES (
    'COLLEZ-ICI-L-ID-DE-L-ETAPE-1',  -- ⚠️ REMPLACER PAR VOTRE ID
    'lyria.teazm@gmail.com',
    'lyria.teazm',
    'Free',
    150,
    false,
    false,
    '{}'::jsonb
);
```

2. **REMPLACER** `'COLLEZ-ICI-L-ID-DE-L-ETAPE-1'` par l'ID copié à l'étape 1
3. **Cliquer** : **RUN**
4. **✅ Profil recréé !**

#### Étape 3 : Vérifier

```sql
SELECT id, email, username, plan, credits
FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com';
```

**Résultat attendu :**
- Username : `lyria.teazm`
- Plan : `Free`
- Credits : `150`

#### Étape 4 : Se Connecter

1. **Aller sur votre app**
2. **Se connecter** avec :
   - Email : `lyria.teazm@gmail.com`
   - Password : Votre mot de passe
3. **✅ Ça devrait fonctionner !**

---

## 🎯 SOLUTION ALTERNATIVE (Si Méthode 1 Ne Marche Pas)

### ✅ Méthode 2 : Supprimer et Recréer Complètement

#### Étape 1 : Supprimer de user_profiles

```sql
DELETE FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com';
```

#### Étape 2 : Supprimer de Authentication

1. **Aller sur** : **Authentication** → **Users**
2. **Chercher** : `lyria.teazm@gmail.com`
3. **Cliquer** : Sur les **3 points** (...) → **"Delete user"**
4. **Confirmer** la suppression

#### Étape 3 : Recréer depuis l'App

1. **Aller sur votre app**
2. **S'inscrire** avec :
   - Email : `lyria.teazm@gmail.com`
   - Username : `lyria.teazm`
   - Password : Votre nouveau mot de passe
3. **✅ Compte recréé !**

---

## 🔍 Diagnostic Rapide

Pour vérifier l'état actuel :

```sql
-- Voir où existe le compte
SELECT 'auth.users' as table_name, COUNT(*) as existe
FROM auth.users 
WHERE email = 'lyria.teazm@gmail.com'

UNION ALL

SELECT 'user_profiles' as table_name, COUNT(*) as existe
FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com';
```

**Interprétation :**
- `auth.users = 1` et `user_profiles = 0` → **Désynchronisé** (utilisez Méthode 1)
- `auth.users = 1` et `user_profiles = 1` → **OK** (le compte fonctionne)
- `auth.users = 0` et `user_profiles = 0` → **Supprimé** (recréez depuis l'app)

---

## ⚡ Solution Rapide (Sans SQL)

Si vous ne voulez pas toucher à SQL, utilisez simplement un email différent :

- `lyria.teazm+nouveau@gmail.com` ✅
- `lyria.teazm+lyr@gmail.com` ✅

Gmail ignore le `+...` donc vous recevrez tous les emails dans la même boîte !

---

## 🎯 Pourquoi Ce Problème ?

Supabase utilise **deux tables** :

1. **`auth.users`** → Authentification (login/password)
2. **`user_profiles`** → Données utilisateur (username, crédits, plan)

Quand vous supprimez un utilisateur, il faut le supprimer **des deux tables** !

Normalement, un **trigger** devrait créer automatiquement le profil dans `user_profiles` quand un compte est créé dans `auth.users`. Mais il semble que ce trigger n'a pas fonctionné ou que le profil a été supprimé manuellement.

---

## ✅ Checklist

- [ ] Étape 1 : Trouver l'ID dans auth.users
- [ ] Étape 2 : Recréer le profil dans user_profiles avec cet ID
- [ ] Étape 3 : Vérifier que le profil existe
- [ ] Étape 4 : Se connecter sur l'app
- [ ] ✅ Ça fonctionne !

---

**Méthode 1 (Recréer le profil) est la plus rapide !** 🚀

**Ou utilisez `lyria.teazm+test@gmail.com` pour éviter tous ces problèmes !** 💡
