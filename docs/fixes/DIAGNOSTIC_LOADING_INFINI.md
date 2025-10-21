# 🔍 DIAGNOSTIC : Chargement Infini après Achat de Crédits

## 📋 Problème Identifié

L'application reste bloquée sur un écran de chargement infini après un achat de crédits Stripe.

## 🎯 Causes Identifiées

### 1. **Variables d'environnement manquantes** ⚠️ **CRITIQUE**
- **Fichier `.env.local` inexistant** dans le projet
- Les variables `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` ne sont pas définies
- Conséquence : Les requêtes Supabase **ne peuvent pas être exécutées**

### 2. **Timeout de session Supabase** ⏱️
- `supabase.auth.getSession()` prend **plus de 10 secondes** (parfois jusqu'à 30s)
- Causait un timeout brutal qui bloquait l'authentification
- **Résolu** en utilisant `onAuthStateChange` comme méthode primaire

### 3. **Boucle infinie dans le `useEffect` de redirection Stripe** 🔄
- Le `useEffect` se re-exécutait indéfiniment car les dépendances changeaient constamment
- **Résolu** en utilisant `useRef` pour marquer le paiement comme traité

## ✅ Solutions Appliquées

### 1. Création du fichier `.env.local`

**Fichier créé** : `.env.local`

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://vidykmwboifpdgeeavjg.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY_HERE

# Stripe Configuration
VITE_STRIPE_PUBLIC_KEY=pk_test_51RpmAFQs5exHskQ3YRbJ3SdOZEMxSqjrTFDqX8Z0mXqx2jrF8yXqFPtVjhX9pjNZW3cQzLpMJ4HQMRCfUFKGw1OP00dEY9fC36

# Gemini API Key
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

⚠️ **ACTION REQUISE** : Vous devez remplacer `YOUR_SUPABASE_ANON_KEY_HERE` et `YOUR_GEMINI_API_KEY_HERE` par vos vraies clés.

#### Où trouver vos clés ?

1. **Supabase Anon Key** :
   - Allez sur https://supabase.com/dashboard/project/vidykmwboifpdgeeavjg/settings/api
   - Copiez la clé `anon` / `public`
   - Remplacez `YOUR_SUPABASE_ANON_KEY_HERE` dans `.env.local`

2. **Gemini API Key** :
   - Allez sur https://aistudio.google.com/apikey
   - Créez une clé API ou copiez une clé existante
   - Remplacez `YOUR_GEMINI_API_KEY_HERE` dans `.env.local`

### 2. Optimisation de l'authentification (`src/contexts/SupabaseUserContext.tsx`)

**Changements** :
- Timeout de session augmenté de 10s à 30s
- Utilisation de `onAuthStateChange` comme méthode primaire (plus rapide)
- Flag `isSessionLoaded` pour éviter le double chargement
- Logs détaillés avec émojis pour diagnostic

**Code** :
```typescript
useEffect(() => {
  let isSessionLoaded = false;

  const initAuth = async () => {
    try {
      console.log('🔵 [AUTH] Starting auth initialization...');
      
      // Timeout plus long (30s) pour la session check
      const timeoutDuration = 30000;
      const sessionPromise = supabase.auth.getSession();
      const timeoutPromise = new Promise<{ data: { session: null } }>((resolve) => 
        setTimeout(() => {
          console.log('⚠️ [AUTH] Session check timeout, relying on onAuthStateChange');
          resolve({ data: { session: null } });
        }, timeoutDuration)
      );
      
      const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise]);
      
      // Si la session a déjà été chargée par onAuthStateChange, on skip
      if (isSessionLoaded) {
        console.log('🟡 [AUTH] Session already loaded by onAuthStateChange');
        return;
      }

      if (session?.user) {
        console.log('🟢 [AUTH] Found existing session for user:', session.user.id);
        isSessionLoaded = true;
        await loadUserProfile(session.user.id);
      } else {
        console.log('🟡 [AUTH] No existing session found');
        setLoading(false);
      }
    } catch (error) {
      console.error('🔴 [AUTH] Error initializing auth:', error);
      if (!isSessionLoaded) {
        setLoading(false);
      }
    }
  };

  initAuth();

  // Listen for auth changes - plus rapide que getSession()
  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('🔵 [AUTH] Auth state change event:', event, session?.user?.id);
    const authUser = session?.user;
    if (authUser && !isSessionLoaded) {
      console.log('🟢 [AUTH] Auth state changed - user logged in:', authUser.id);
      isSessionLoaded = true;
      await loadUserProfile(authUser.id);
    } else if (!authUser) {
      console.log('🟡 [AUTH] Auth state changed - user logged out');
      setUser(defaultUser);
      setLoading(false);
    }
  });

  return () => subscription.unsubscribe();
}, []);
```

### 3. Fix de la boucle infinie de redirection Stripe (`App.tsx`)

**Changements** :
- Utilisation de `useRef` pour marquer le paiement comme traité
- Le `paymentHandledRef.current` empêche le traitement multiple

**Code** :
```typescript
// Handle Stripe Redirect
const paymentHandledRef = useRef(false);

useEffect(() => {
  // Vérifier si on a déjà traité le paiement
  if (paymentHandledRef.current) return;
  
  const query = new URLSearchParams(window.location.search);

  // Vérifier si on doit traiter le retour de paiement
  if (!query.has("payment")) return;

  // Marquer comme traité IMMÉDIATEMENT
  paymentHandledRef.current = true;

  const paymentStatus = query.get("payment");
  const priceId = query.get("priceId");

  // Nettoyer l'URL
  window.history.replaceState({}, document.title, window.location.pathname);

  // Traiter le succès
  if (paymentStatus === "success" && priceId) {
    const plan = plans.find(p => p.stripePriceId === priceId);
    const creditPack = creditPacks.find(p => p.stripePriceId === priceId);

    if (plan) {
      refreshUserProfile().then(() => {
        showToast(`Abonnement ${plan.name} activé avec succès ! 🎉`, 'success');
      });
    } else if (creditPack) {
      refreshUserProfile().then(() => {
        showToast(`${creditPack.credits.toLocaleString()} crédits ajoutés avec succès ! 💰`, 'success');
      });
    }
  }

  // Traiter l'annulation
  if (paymentStatus === "cancel") {
    showToast("Le paiement a été annulé. Vous n'avez pas été débité.", 'warning');
  }
}, [plans, creditPacks, refreshUserProfile, showToast]);
```

## 🔧 Actions à Effectuer MAINTENANT

### 1. Compléter le fichier `.env.local` ⚠️ **URGENT**

Ouvrez le fichier `.env.local` et remplacez :
- `YOUR_SUPABASE_ANON_KEY_HERE` par votre vraie clé Supabase (trouvable sur le dashboard Supabase)
- `YOUR_GEMINI_API_KEY_HERE` par votre vraie clé Gemini API

### 2. Redémarrer le serveur de développement 🔄

```bash
# Arrêtez le serveur actuel (Ctrl+C)
# Puis relancez :
npm run dev
```

**Important** : Vite doit redémarrer pour charger les nouvelles variables d'environnement.

### 3. Tester l'application 🧪

1. Ouvrez `http://localhost:3000`
2. Connectez-vous avec votre compte
3. Vérifiez dans la console du navigateur (F12) :
   - Vous devriez voir `🔵 [AUTH] Starting auth initialization...`
   - Puis `🟢 [AUTH] Auth state changed - user logged in: [ID]`
   - Puis `✅ Profile successfully loaded: [PROFILE]`
4. Testez un achat de crédits
5. Vérifiez que la page charge correctement après le retour de Stripe

## 📊 Logs de Diagnostic

Voici les logs que vous devriez voir dans la console :

### ✅ Logs normaux (authentification réussie)
```
🔵 [AUTH] Starting auth initialization...
🔵 [AUTH] Auth state change event: SIGNED_IN [user-id]
🟢 [AUTH] Auth state changed - user logged in: [user-id]
Loading profile for user: [user-id]
🔍 Fetching profile for user ID: [user-id]
⏱️ Query took 234ms
✅ Profile successfully loaded: { id: '...', ... }
```

### ⚠️ Logs si timeout (mais toujours fonctionnel)
```
🔵 [AUTH] Starting auth initialization...
🔵 [AUTH] Auth state change event: SIGNED_IN [user-id]
🟢 [AUTH] Auth state changed - user logged in: [user-id]
⚠️ [AUTH] Session check timeout, relying on onAuthStateChange
🟡 [AUTH] Session already loaded by onAuthStateChange
```

### ❌ Logs si erreur (variables manquantes)
```
🔵 [AUTH] Starting auth initialization...
🔴 [AUTH] Error initializing auth: Error: ...
❌ Erreur lors de la récupération du profil: ...
```

## 🎯 Résultat Attendu

Après avoir :
1. ✅ Complété `.env.local` avec les vraies clés
2. ✅ Redémarré le serveur Vite
3. ✅ Rechargé la page

L'application devrait :
- ✅ Charger en **moins de 5 secondes**
- ✅ Afficher votre profil correctement
- ✅ Gérer les redirections Stripe sans boucle infinie
- ✅ Mettre à jour les crédits après achat

## 🚨 Problèmes Persistants ?

Si l'application charge toujours à l'infini après avoir suivi toutes les étapes :

1. **Vérifiez que les variables sont chargées** :
   - Ouvrez la console du navigateur (F12)
   - Tapez : `console.log(import.meta.env.VITE_SUPABASE_URL)`
   - Vous devriez voir : `https://vidykmwboifpdgeeavjg.supabase.co`
   - Si vous voyez `undefined`, le serveur Vite n'a pas redémarré

2. **Vérifiez les requêtes Supabase** :
   - Ouvrez l'onglet "Network" (Réseau) dans les DevTools (F12)
   - Filtrez par "supabase"
   - Vérifiez le statut des requêtes (200 = OK, 401 = non autorisé, etc.)

3. **Vérifiez la console pour des erreurs** :
   - Cherchez les messages en rouge dans la console
   - Envoyez-moi les messages d'erreur pour diagnostic

---

**Date de création** : 16 octobre 2025  
**Statut** : ⚠️ En attente de configuration (`.env.local` à compléter)






