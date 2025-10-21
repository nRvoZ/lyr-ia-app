# 🔧 Correction des Réponses Texte de Gemini

## ❌ Problème Identifié

**Erreur** : `Impossible de générer le prompt instrumental.`

### Cause Racine
Après la migration vers le nouveau système de proxy Gemini avec `responseSchema` pour le JSON structuré, les fonctions qui retournent du texte simple (non-JSON) utilisaient encore l'ancienne structure de parsing `response.candidates[0].content.parts[0].text`.

Le backend proxy a été modifié pour retourner directement les objets JSON parsés, mais les fonctions texte attendaient toujours l'ancienne structure.

## 🔍 Fonctions Corrigées

### **Fonctions Texte Simple** ✅

Ces fonctions utilisent maintenant `responseMimeType: 'text/plain'` et lisent directement la réponse comme string :

1. ✅ **`generateInstrumentalPrompt`** (ligne 237)
2. ✅ **`generateRandomTheme`** (ligne 476)
3. ✅ **`analyzeSongStyle`** (ligne 706)
4. ✅ **`generateSongTitle`** (ligne 1037)

**Avant** :
```typescript
const response = await invokeGeminiProxy(modelName, [{ text: prompt }], config);

if (response && response.candidates && response.candidates[0].content.parts[0].text) {
    return response.candidates[0].content.parts[0].text.trim();
}
```

**Après** :
```typescript
const finalConfig = { ...config, responseMimeType: 'text/plain' };
const response = await invokeGeminiProxy(modelName, [{ text: prompt }], finalConfig);

if (response && typeof response === 'string') {
    return response.trim();
}
```

### **Fonctions JSON Structuré** ✅ (déjà corrigées)

Ces fonctions utilisent `responseMimeType: 'application/json'` avec `responseSchema` :

1. ✅ **`generateFullSong`**
2. ✅ **`generateArtistInspirationSong`**
3. ✅ **`processImportedLyrics`**
4. ✅ **`generateAnimeOpening`**
5. ✅ **`generatePersonalizedSong`**
6. ✅ **`generateMarketingKit`** (déjà utilisait `responseSchema`)

### **Fonctions Images** 🖼️ (non modifiées)

Ces fonctions génèrent des images et utilisent `responseModalities: [Modality.IMAGE]`. Elles continuent de parser `response.candidates[0].content.parts` pour trouver `inlineData` :

1. 🖼️ **`generateAlbumArt`**
2. 🖼️ **`generateAlbumArtBurst`**
3. 🖼️ **`editAlbumArt`**

Le backend retourne une structure spéciale avec `candidates` ET `imageBytes` pour ces cas.

## 🔧 Modifications du Backend Proxy

**Fichier** : `supabase/functions/gemini-proxy/index.ts`

Le backend gère maintenant 3 cas distincts :

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
// Retourner la structure complète pour compatibilité
return new Response(JSON.stringify(response), { ... });
```

## ✅ Résultats

- ✅ **4 fonctions texte** corrigées pour utiliser `text/plain`
- ✅ **5 fonctions JSON** utilisent correctement `application/json` + `responseSchema`
- ✅ **3 fonctions image** continuent de fonctionner avec leur structure spécifique
- ✅ Backend proxy gère correctement les 3 types de réponses

## 🎯 Types de Génération Affectés

Ces corrections affectent :
1. **Mode Instrumental** - ✅ Corrigé
2. **Génération de thèmes aléatoires** - ✅ Corrigé
3. **Analyseur de chansons** - ✅ Corrigé
4. **Génération de titres** - ✅ Corrigé
5. **Tous les modes de génération de paroles** - ✅ Déjà corrigés
6. **Marketing Kit** - ✅ Déjà utilisait le bon format

---

**Date** : 19 octobre 2025  
**Fichiers modifiés** :
- `src/services/geminiService.ts`
- `supabase/functions/gemini-proxy/index.ts`  
**Impact** : Tous les modes de génération fonctionnent maintenant correctement



