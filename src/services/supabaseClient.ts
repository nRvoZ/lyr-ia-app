// src/services/supabaseClient.ts (Version Finale et Corrigée)

import { createClient } from '@supabase/supabase-js';

// =======================================================================================
// CORRECTION APPLIQUÉE
// ---------------------------------------------------------------------------------------
// ANCIEN COMPORTEMENT :
// - Utilisait `process.env`, qui n'existe pas dans le navigateur.
// - Provoquait l'erreur "process is not defined".
//
// NOUVEAU COMPORTEMENT (CORRIGÉ) :
// - Utilise `import.meta.env`, qui est la manière correcte pour Vite de
//   lire les variables d'environnement dans le code du navigateur.
// - Les noms des variables doivent commencer par `VITE_`.
// =======================================================================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// DEBUG : Afficher les variables chargées
console.log('🔧 [SUPABASE] Configuration loaded:');
console.log('  - URL:', supabaseUrl);
console.log('  - Key:', supabaseAnonKey ? supabaseAnonKey.substring(0, 30) + '...' : 'MISSING');

// On ajoute une vérification claire pour s'assurer que les variables sont bien chargées
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ [SUPABASE] Variables manquantes !');
  console.error('  - VITE_SUPABASE_URL:', supabaseUrl);
  console.error('  - VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'PRÉSENT' : 'MANQUANT');
  throw new Error("Erreur de configuration : Les variables Supabase ne sont pas définies. Vérifiez votre fichier .env et assurez-vous que les noms commencent bien par 'VITE_'.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log('✅ [SUPABASE] Client initialized successfully');