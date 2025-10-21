# 🐛 Fix Faute d'Orthographe "LryIA soceity"

## ⚠️ Problème

L'utilisateur a signalé que le plan apparaît comme **"LryIA soceity"** au lieu de **"Lyr-IA Society"** dans :
- La base de données Supabase
- L'affichage de l'application

### Variantes Incorrectes Trouvées
- `LryIA soceity` (faute : "LryIA" + "soceity")
- `LryIA Society` (faute : "LryIA")
- `LyrIA Society` (ancienne version)
- `Lyr-IA Society` (nom d'affichage mais pas valeur BDD)

---

## ✅ Solution

### 1. Valeur Technique Standard

Selon notre architecture, le plan doit être stocké comme :
```
plan = 'SecretSociety'
```

C'est la valeur de l'ENUM PostgreSQL et de l'enum TypeScript.

### 2. Nom d'Affichage

Le nom affiché à l'utilisateur est défini dans `constants/constants_monetization.ts` :
```typescript
{
  id: SubscriptionPlan.SecretSociety,  // 'SecretSociety'
  name: 'Lyr-IA Society',              // 'Lyr-IA Society' (affiché)
}
```

---

## 🔧 Migration SQL Créée

**Fichier :** `supabase/migrations/008_fix_lyria_society_typo.sql`

La migration corrige toutes les variantes incorrectes :

```sql
UPDATE user_profiles 
SET plan = 'SecretSociety'
WHERE plan IN (
    'LryIA soceity',
    'LryIA Society', 
    'LyrIA Society',
    'Lyr-IA Society',
    -- etc.
);
```

---

## 📋 Comment Appliquer la Correction

### Option 1 : Via Supabase Dashboard (Recommandé)

1. **Ouvrir Supabase**
   - Aller sur https://supabase.com/dashboard
   - Sélectionner votre projet Lyr-IA

2. **Ouvrir SQL Editor**
   - Menu de gauche → SQL Editor

3. **Exécuter la Migration**
   - Copier le contenu de `supabase/migrations/008_fix_lyria_society_typo.sql`
   - Coller dans l'éditeur SQL
   - Cliquer sur **Run**

4. **Vérifier**
   ```sql
   SELECT plan, COUNT(*) 
   FROM user_profiles 
   GROUP BY plan;
   ```
   Tous les plans doivent être `'SecretSociety'` (pas de fautes)

### Option 2 : Via Supabase CLI

```bash
# Dans votre terminal
cd "D:\Mon App Lyria"

# Appliquer la migration
supabase db push

# Ou appliquer manuellement
supabase db execute -f supabase/migrations/008_fix_lyria_society_typo.sql
```

---

## 🎯 Architecture Finale

### En Base de Données (Valeur Technique)
```
plan = 'SecretSociety'
```

### Dans le Code (Enum TypeScript)
```typescript
SubscriptionPlan.SecretSociety  // = 'SecretSociety'
```

### Dans l'Interface (Nom Affiché)
```typescript
name: 'Lyr-IA Society'  // Via constants_monetization
```

---

## ✅ Vérification Post-Migration

### Vérifier en Base de Données
```sql
-- Compter les utilisateurs Lyr-IA Society
SELECT COUNT(*) FROM user_profiles WHERE plan = 'SecretSociety';

-- Vérifier qu'il n'y a plus de fautes
SELECT plan, COUNT(*) FROM user_profiles GROUP BY plan;
```

### Résultat Attendu
```
plan          | count
--------------+-------
Free          | X
Pro           | X
SecretSociety | X  ✅ Plus de fautes !
```

---

## 💡 Pour Éviter Ce Problème à l'Avenir

### 1. Utiliser Toujours l'Enum
```typescript
// ✅ BON
user.plan = SubscriptionPlan.SecretSociety;

// ❌ ÉVITER
user.plan = 'Lyr-IA Society';  // Faute potentielle
```

### 2. Séparation Claire
- **Valeur technique** (BDD & Code) : `'SecretSociety'`
- **Nom affiché** (UI uniquement) : `'Lyr-IA Society'`

### 3. Type Safety
L'enum PostgreSQL empêche les valeurs invalides :
```sql
CREATE TYPE subscription_plan AS ENUM (
    'Free', 
    'Discovery', 
    'Pro', 
    'Ultimate', 
    'SecretSociety'
);
```

---

## 📝 Checklist

- [ ] Migration SQL exécutée sur Supabase
- [ ] Vérification : plus de fautes en BDD
- [ ] Test : l'application affiche "Lyr-IA Society" correctement
- [ ] Confirmation : le plan fonctionne (accès admin, crédits illimités)

---

**Fix créé le :** 21 octobre 2025  
**Migration :** `008_fix_lyria_society_typo.sql`  
**Statut :** Prêt à appliquer

