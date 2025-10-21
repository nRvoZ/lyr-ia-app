# 🔧 Résolution : Compte Bloqué "lyria.teazm@gmail.com"

## 🚨 Problème

Vous avez supprimé le compte `lyria.teazm@gmail.com` dans Supabase mais ne pouvez plus le recréer.

---

## 🔍 Diagnostic Rapide

### 1️⃣ Vérifier dans Supabase Dashboard

**Aller sur :** https://supabase.com/dashboard → **Authentication** → **Users**

Rechercher : `lyria.teazm@gmail.com`
- ✅ **Si PAS trouvé** → Le compte auth est bien supprimé
- ❌ **Si trouvé** → Le supprimer manuellement

### 2️⃣ Vérifier dans la Table user_profiles

**Aller sur :** https://supabase.com/dashboard → **Table Editor** → **user_profiles**

Rechercher : `lyria.teazm@gmail.com`
- ✅ **Si PAS trouvé** → Le profil est bien supprimé  
- ❌ **Si trouvé** → Le supprimer manuellement

---

## 🧹 Nettoyage Complet (Si Nécessaire)

### Option 1 : Via Supabase Dashboard (Recommandé)

1. **Authentication → Users**
   - Supprimer `lyria.teazm@gmail.com` s'il existe

2. **Table Editor → user_profiles**  
   - Supprimer toutes les lignes avec `lyria.teazm@gmail.com`

3. **Table Editor → user_profiles**
   - Supprimer toutes les lignes avec username `lyria.teazm`

### Option 2 : Via SQL (Avancé)

**Aller sur :** https://supabase.com/dashboard → **SQL Editor**

```sql
-- 1. Vérifier ce qui existe
SELECT 'auth.users' as table_name, id, email, created_at 
FROM auth.users 
WHERE email = 'lyria.teazm@gmail.com'

UNION ALL

SELECT 'user_profiles' as table_name, id::text, email, created_at 
FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com' OR username = 'lyria.teazm';

-- 2. Nettoyer (à exécuter si des résultats apparaissent)
DELETE FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com' OR username = 'lyria.teazm';

-- Note: auth.users se nettoie automatiquement via l'interface
```

---

## 🎯 Solutions de Contournement

### Solution 1 : Email Légèrement Différent

Utilisez un email légèrement différent :
- `lyria.teazm+test@gmail.com` (Gmail ignore le `+test`)
- `lyria.teazm@outlook.com`
- `lyria.teazm@yahoo.com`

### Solution 2 : Username Différent

Si l'email fonctionne mais pas le username :
- `lyria.teazm2`
- `lyria.teazm_2025`
- `lyria_teazm`

### Solution 3 : Attendre 24h

Parfois Supabase met du temps à nettoyer complètement.

---

## 🔧 Diagnostic Avancé

### Vérifier les Contraintes Uniques

```sql
-- Vérifier les contraintes sur user_profiles
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conrelid = 'user_profiles'::regclass
AND contype = 'u';
```

### Vérifier les Triggers

```sql
-- Vérifier les triggers qui pourraient bloquer
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'user_profiles';
```

---

## ✅ Test de Création

Après le nettoyage, testez la création :

1. **Aller sur votre app** → **S'inscrire**
2. **Email :** `lyria.teazm@gmail.com`
3. **Username :** `lyria.teazm`
4. **Password :** Votre mot de passe

### Messages d'Erreur Courants

- **"Ce nom d'utilisateur est déjà pris"** → Username encore en BDD
- **"Email already registered"** → Email encore dans auth.users
- **"User already exists"** → Compte pas complètement supprimé

---

## 🚀 Actions Immédiates

### 1️⃣ Vérification Rapide (2 min)

1. **Supabase Dashboard** → **Authentication** → **Users**
2. Chercher `lyria.teazm@gmail.com`
3. **Si trouvé** → Cliquer **"Delete"**

### 2️⃣ Vérification Table (2 min)

1. **Supabase Dashboard** → **Table Editor** → **user_profiles**
2. Chercher `lyria.teazm@gmail.com`
3. **Si trouvé** → Supprimer la ligne

### 3️⃣ Test Création (1 min)

1. **Votre app** → **S'inscrire**
2. Utiliser `lyria.teazm@gmail.com`
3. **Si ça marche** → ✅ Problème résolu
4. **Si ça échoue** → Utiliser email différent

---

## 📞 Support

Si le problème persiste :

1. **Vérifiez les logs** dans la console du navigateur
2. **Copiez l'erreur exacte** 
3. **Testez avec un email complètement différent**

---

**Le plus souvent, c'est juste un problème de cache ou de suppression incomplète !** 🎯
