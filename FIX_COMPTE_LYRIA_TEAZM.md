# 🔧 FIX RAPIDE : lyria.teazm@gmail.com

## 🎯 SOLUTION EN 3 ÉTAPES (5 minutes)

### ✅ ÉTAPE 1 : Nettoyer la Table user_profiles

1. **Aller sur** : https://supabase.com/dashboard
2. **Cliquer** : **SQL Editor** (dans le menu de gauche)
3. **Copier/Coller ce code** :

```sql
-- Supprimer toutes les traces de lyria.teazm
DELETE FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com' 
   OR username = 'lyria.teazm';

-- Vérifier le nettoyage
SELECT 
    CASE 
        WHEN COUNT(*) = 0 THEN '✅ Nettoyage réussi'
        ELSE '❌ Il reste des données'
    END as resultat
FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com' 
   OR username = 'lyria.teazm';
```

4. **Cliquer** : **RUN** (bouton vert)
5. **Résultat attendu** : `✅ Nettoyage réussi`

---

### ✅ ÉTAPE 2 : Nettoyer Authentication

1. **Rester sur Supabase Dashboard**
2. **Cliquer** : **Authentication** → **Users**
3. **Chercher** : `lyria.teazm@gmail.com`
4. **Si trouvé** :
   - Cliquer sur les **3 points** (...)
   - Cliquer **"Delete user"**
   - Confirmer la suppression
5. **Si pas trouvé** : ✅ Parfait, passez à l'étape 3

---

### ✅ ÉTAPE 3 : Créer le Compte

1. **Aller sur votre app Lyr-IA**
2. **Cliquer** : **S'inscrire**
3. **Remplir** :
   - Email : `lyria.teazm@gmail.com`
   - Username : `lyria.teazm` (ou `lyriateazm` si ça bloque)
   - Password : Votre mot de passe
4. **Cliquer** : **Créer le compte**
5. **✅ Ça devrait fonctionner !**

---

## 🚨 Si Ça Ne Marche TOUJOURS Pas

### Solution Alternative 1 : Email Gmail avec +

Gmail ignore ce qui est après le `+`, donc ces emails arrivent dans la même boîte :

- `lyria.teazm+test@gmail.com` ✅
- `lyria.teazm+lyr@gmail.com` ✅
- `lyria.teazm+2024@gmail.com` ✅

**Utilisez un de ces emails et ça marchera à coup sûr !**

### Solution Alternative 2 : Username Différent

Si l'email passe mais pas le username :
- `lyriateazm` (sans point)
- `lyria_teazm` (avec underscore)
- `lyria.teazm2` (avec chiffre)

---

## 📋 Diagnostic des Erreurs

### Message : "Ce nom d'utilisateur est déjà pris"
**Problème** : Le username `lyria.teazm` est encore dans la base  
**Solution** : Refaire l'ÉTAPE 1 ou utiliser un username différent

### Message : "Email already registered"  
**Problème** : L'email est encore dans auth.users  
**Solution** : Refaire l'ÉTAPE 2 ou utiliser `lyria.teazm+test@gmail.com`

### Message : "User already exists"
**Problème** : Le compte existe dans Supabase Auth mais pas visible  
**Solution** : Utiliser `lyria.teazm+test@gmail.com`

---

## 🎯 Pourquoi Ce Problème ?

Supabase a **deux endroits** où les utilisateurs sont stockés :

1. **`auth.users`** - Table d'authentification (login/password)
2. **`user_profiles`** - Profil utilisateur (username, plan, crédits)

Quand vous supprimez un utilisateur, il faut le supprimer **des deux endroits** !

---

## ✅ Checklist Finale

- [ ] ÉTAPE 1 : SQL Editor → Supprimer de user_profiles → ✅ Réussi
- [ ] ÉTAPE 2 : Authentication → Supprimer de auth.users → ✅ Réussi
- [ ] ÉTAPE 3 : Créer le compte sur l'app → ✅ Fonctionne

---

**Si vous avez suivi les 3 étapes, ça devrait marcher à 100% !** 🚀

**Sinon, utilisez `lyria.teazm+test@gmail.com` - ça marche toujours !** ✅
