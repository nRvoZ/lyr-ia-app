-- =====================================================
-- FIX SIMPLE : lyria.teazm@gmail.com
-- =====================================================
-- Exécutez ce script dans Supabase SQL Editor
-- Date: 21 octobre 2025

-- ÉTAPE 1 : Voir ce qui existe actuellement
SELECT '=== ÉTAPE 1 : Vérification ===' as etape;

SELECT 
    'user_profiles' as table_name,
    id,
    email,
    username,
    plan
FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com' 
   OR username = 'lyria.teazm';

-- ÉTAPE 2 : Nettoyage complet
SELECT '=== ÉTAPE 2 : Nettoyage ===' as etape;

DELETE FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com' 
   OR username = 'lyria.teazm';

-- ÉTAPE 3 : Vérification après nettoyage
SELECT '=== ÉTAPE 3 : Vérification ===' as etape;

SELECT 
    CASE 
        WHEN COUNT(*) = 0 THEN '✅ Nettoyage réussi - Vous pouvez maintenant créer le compte'
        ELSE '❌ Il reste des données - Contactez le support'
    END as resultat
FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com' 
   OR username = 'lyria.teazm';

-- ÉTAPE 4 : Après avoir exécuté ce script
SELECT '=== ACTIONS SUIVANTES ===' as info;
SELECT 
    '1. Aller sur Authentication → Users dans Supabase Dashboard' as action 
UNION ALL 
SELECT '2. Chercher lyria.teazm@gmail.com et le supprimer si trouvé' as action
UNION ALL 
SELECT '3. Retourner sur votre app et créer le compte' as action
UNION ALL 
SELECT '4. Ça devrait fonctionner maintenant !' as action;
