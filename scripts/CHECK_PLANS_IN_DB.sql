-- =====================================================
-- VÉRIFICATION DES PLANS EN BASE DE DONNÉES
-- =====================================================
-- Script pour voir exactement quels plans sont stockés
-- Date: 21 octobre 2025

-- 1. Voir tous les utilisateurs et leurs plans
SELECT 
    '=== TOUS LES UTILISATEURS ===' as info,
    username,
    email,
    plan,
    is_admin,
    credits,
    created_at
FROM user_profiles 
ORDER BY is_admin DESC, created_at;

-- 2. Compter par plan exact
SELECT 
    '=== COMPTAGE PAR PLAN ===' as info,
    plan,
    COUNT(*) as count,
    STRING_AGG(username, ', ') as usernames
FROM user_profiles 
GROUP BY plan
ORDER BY count DESC;

-- 3. Chercher les variantes de Lyr-IA Society
SELECT 
    '=== RECHERCHE LYR-IA SOCIETY ===' as info,
    username,
    email,
    plan,
    CASE 
        WHEN plan = 'SecretSociety' THEN '✅ SecretSociety'
        WHEN plan = 'Lyr-IA Society' THEN '✅ Lyr-IA Society'
        WHEN plan = 'LyrIA Society' THEN '✅ LyrIA Society'
        WHEN plan ILIKE '%secret%' THEN '🔍 Contient "secret"'
        WHEN plan ILIKE '%society%' THEN '🔍 Contient "society"'
        WHEN plan ILIKE '%lyr%' THEN '🔍 Contient "lyr"'
        ELSE '❌ Pas reconnu'
    END as detection_status
FROM user_profiles 
WHERE plan ILIKE '%secret%' 
   OR plan ILIKE '%society%' 
   OR plan ILIKE '%lyr%'
   OR plan = 'SecretSociety'
ORDER BY username;

-- 4. Vérifier les caractères spéciaux
SELECT 
    '=== VÉRIFICATION CARACTÈRES ===' as info,
    username,
    plan,
    LENGTH(plan) as plan_length,
    ASCII(SUBSTRING(plan, 1, 1)) as first_char_ascii,
    ASCII(SUBSTRING(plan, -1, 1)) as last_char_ascii
FROM user_profiles 
WHERE plan ILIKE '%secret%' 
   OR plan ILIKE '%society%' 
   OR plan ILIKE '%lyr%'
   OR plan = 'SecretSociety';

-- 5. Résumé pour le code
SELECT 
    '=== RÉSUMÉ POUR LE CODE ===' as info,
    'Plans trouvés:' as description,
    STRING_AGG(DISTINCT plan, ', ') as all_plans
FROM user_profiles;
