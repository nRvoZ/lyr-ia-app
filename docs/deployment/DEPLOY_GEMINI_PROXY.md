# 🚀 Déployer la Fonction Gemini Proxy Mise à Jour

## ⚠️ Problème Actuel

Les modifications apportées à `supabase/functions/gemini-proxy/index.ts` sont **locales** et ne sont pas encore déployées sur Supabase. C'est pourquoi l'erreur persiste.

## 📋 Solution : Redéployer la Fonction Edge

### **Option 1 : Via Supabase CLI (Recommandé)** ✅

```bash
# 1. Se connecter à Supabase (si pas déjà fait)
npx supabase login

# 2. Lier le projet local à votre projet Supabase
npx supabase link --project-ref vidykmwboifpdgeeavjg

# 3. Déployer la fonction gemini-proxy
npx supabase functions deploy gemini-proxy
```

### **Option 2 : Via le Dashboard Supabase** 🌐

1. Aller sur https://supabase.com/dashboard/project/vidykmwboifpdgeeavjg/functions
2. Cliquer sur **"gemini-proxy"**
3. Cliquer sur **"Deploy new version"**
4. Copier-coller le contenu de `supabase/functions/gemini-proxy/index.ts`
5. Cliquer sur **"Deploy"**

## 📝 Vérifications Après Déploiement

### 1. Vérifier que la fonction est bien déployée
```bash
npx supabase functions list
```

Vous devriez voir `gemini-proxy` avec une version récente.

### 2. Tester dans l'application
- Essayer de générer une chanson en mode **Instrumental**
- Vérifier qu'il n'y a plus l'erreur `"Impossible de générer le prompt instrumental"`

### 3. Vérifier les logs (si erreur)
```bash
npx supabase functions logs gemini-proxy
```

Ou dans le dashboard : https://supabase.com/dashboard/project/vidykmwboifpdgeeavjg/functions/gemini-proxy/logs

## 🔧 Modifications Incluses dans le Déploiement

Le nouveau code du proxy gère maintenant 3 types de réponses :

### 1. **Images** 🖼️
```typescript
if (response.candidates && response.candidates[0]?.content?.parts) {
  for (const part of parts) {
    if (part.inlineData) {
      return new Response(JSON.stringify({ 
        candidates: response.candidates,
        imageBytes: part.inlineData.data 
      }), { ... });
    }
  }
}
```

### 2. **Texte Simple** 📝
```typescript
if (config?.responseMimeType === 'text/plain') {
  return new Response(JSON.stringify(text), { ... });
}
```

### 3. **JSON Structuré** 📊
```typescript
if (config?.responseMimeType === 'application/json') {
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = { result: text };
  }
  return new Response(JSON.stringify(body), { ... });
}
```

### 4. **Par Défaut** 🔄
```typescript
return new Response(JSON.stringify(response), { ... });
```

## ⚡ Commande Rapide

Si vous avez déjà Supabase CLI configuré :

```bash
npx supabase functions deploy gemini-proxy
```

## ✅ Confirmation

Une fois déployé, vous verrez :
```
Deploying function: gemini-proxy
✓ Deployed function gemini-proxy
```

Après ça, l'erreur devrait être résolue ! 🎉

---

**Fichier à déployer** : `supabase/functions/gemini-proxy/index.ts`  
**Date** : 19 octobre 2025



