-- =====================================================
-- DIAGNOSTIC STATISTIQUES ADMIN
-- =====================================================
-- Script pour diagnostiquer les incohérences dans les statistiques
-- Date: 21 octobre 2025

-- 1. Compter tous les utilisateurs
SELECT 
    '=== TOUS LES UTILISATEURS ===' as info,
    COUNT(*) as total_users,
    COUNT(CASE WHEN is_admin = true THEN 1 END) as admins,
    COUNT(CASE WHEN is_admin = false THEN 1 END) as regular_users
FROM user_profiles;

-- 2. Compter par plan
SELECT 
    '=== UTILISATEURS PAR PLAN ===' as info,
    plan,
    COUNT(*) as count,
    COUNT(CASE WHEN is_admin = true THEN 1 END) as admins_in_plan,
    COUNT(CASE WHEN is_admin = false THEN 1 END) as regular_users_in_plan
FROM user_profiles 
GROUP BY plan
ORDER BY count DESC;

-- 3. Compter les Lyr-IA Society
SELECT 
    '=== LYR-IA SOCIETY ===' as info,
    COUNT(*) as total_secret_society,
    COUNT(CASE WHEN is_admin = true THEN 1 END) as admin_secret_society,
    COUNT(CASE WHEN is_admin = false THEN 1 END) as regular_secret_society
FROM user_profiles 
WHERE plan = 'SecretSociety';

-- 4. Détail des utilisateurs Lyr-IA Society
SELECT 
    '=== DÉTAIL LYR-IA SOCIETY ===' as info,
    username,
    email,
    plan,
    is_admin,
    credits,
    created_at
FROM user_profiles 
WHERE plan = 'SecretSociety'
ORDER BY is_admin DESC, created_at;

-- 5. Utilisateurs actifs aujourd'hui (simulation)
SELECT 
    '=== ACTIFS AUJOURD''HUI ===' as info,
    COUNT(*) as active_today
FROM user_profiles 
WHERE is_admin = false 
  AND (
    last_login >= CURRENT_DATE 
    OR (last_login IS NULL AND created_at >= CURRENT_DATE - INTERVAL '7 days')
  );

-- 6. Vérifier les doublons potentiels
SELECT 
    '=== VÉRIFICATION DOUBLONS ===' as info,
    username,
    email,
    COUNT(*) as count
FROM user_profiles 
GROUP BY username, email
HAVING COUNT(*) > 1;

-- 7. Résumé des statistiques attendues
SELECT 
    '=== RÉSUMÉ STATISTIQUES ===' as info,
    (SELECT COUNT(*) FROM user_profiles WHERE is_admin = false) as total_users_expected,
    (SELECT COUNT(*) FROM user_profiles WHERE plan = 'SecretSociety' AND is_admin = false) as secret_society_regular,
    (SELECT COUNT(*) FROM user_profiles WHERE plan = 'SecretSociety' AND is_admin = true) as secret_society_admin,
    (SELECT COUNT(*) FROM user_profiles WHERE plan = 'SecretSociety') as secret_society_total;
