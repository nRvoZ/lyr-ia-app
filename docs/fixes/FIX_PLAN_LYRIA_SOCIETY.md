# 🐛 Fix Plan Lyr-IA Society

## ⚠️ Problème Identifié

### Le Bug
Le plan "Lyr-IA Society" a une **incohérence** entre :
- La **clé de l'enum** : `SecretSociety`  
- La **valeur de l'enum** : `'Lyr-IA Society'`

```typescript
// Dans src/types.ts
export enum SubscriptionPlan {
  SecretSociety = 'Lyr-IA Society',  // ⚠️ Incohérence !
}
```

### Impact

En base de données Supabase, les utilisateurs peuvent avoir :
- Soit `plan = 'SecretSociety'` (ancienne valeur)
- Soit `plan = 'Lyr-IA Society'` (nouvelle valeur)

Les comparaisons strictes comme `user.plan === SubscriptionPlan.SecretSociety` fonctionnent uniquement avec `'Lyr-IA Society'`.

---

## ✅ Solution Appliquée

### Option A : Simplifier l'Enum (RECOMMANDÉ)

Faire correspondre la clé et la valeur :

```typescript
// Solution propre
export enum SubscriptionPlan {
  SecretSociety = 'SecretSociety',  // ✅ Cohérent
}
```

Puis dans `constants_monetization.ts` :
```typescript
{
  id: SubscriptionPlan.SecretSociety,  // 'SecretSociety'
  name: 'Lyr-IA Society',              // Nom affiché
}
```

### Option B : Garder la Valeur Actuelle (Appliquée)

Utiliser toujours `SubscriptionPlan.SecretSociety` dans le code au lieu de chaînes littérales.

**Avantage :** Pas besoin de migration base de données  
**Inconvénient :** Doit être cohérent partout

---

## 🔧 Corrections Effectuées

### AdminDashboard.tsx
```typescript
// ❌ Avant (incohérent)
if (user.plan === 'SecretSociety' || user.plan === 'Lyr-IA Society')

// ✅ Après (utilise l'enum)
if (user.plan === SubscriptionPlan.SecretSociety)
```

### Base de Données

Pour assurer la compatibilité, on peut gérer les deux cas :

```sql
-- Migration SQL à exécuter si nécessaire
UPDATE user_profiles 
SET plan = 'Lyr-IA Society' 
WHERE plan = 'SecretSociety';
```

---

## 🎯 Recommandation Finale

**Pour un code propre et sans ambiguïté**, je recommande de :

1. **Modifier l'enum** pour être cohérent :
```typescript
SecretSociety = 'SecretSociety',
```

2. **Afficher le nom traduit** uniquement dans l'UI via `constants_monetization.ts`

3. **Stocker** `'SecretSociety'` en base de données (valeur technique)

4. **Afficher** `'Lyr-IA Society'` dans l'interface (nom utilisateur)

---

## ✅ État Actuel

- ✅ Code utilise `SubscriptionPlan.SecretSociety` partout
- ✅ Valeur de l'enum : `'Lyr-IA Society'`
- ✅ Nom affiché : `'Lyr-IA Society'`
- ⚠️ Base de données peut contenir les deux valeurs

**Solution appliquée** : Utilisation cohérente de l'enum dans tout le code.

---

**Date de correction :** 21 octobre 2025

