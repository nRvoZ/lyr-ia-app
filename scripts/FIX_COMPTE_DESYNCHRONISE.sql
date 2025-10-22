-- =====================================================
-- FIX COMPTE DÉSYNCHRONISÉ
-- =====================================================
-- Le compte existe dans auth.users mais pas dans user_profiles
-- Date: 21 octobre 2025

-- SOLUTION 1 : RECRÉER LE PROFIL
-- =====================================================
-- Cette solution garde le compte auth.users et recrée juste le profil

-- 1. Trouver l'ID du compte dans auth.users
SELECT 
    '=== COMPTE DANS AUTH.USERS ===' as info,
    id,
    email,
    created_at
FROM auth.users 
WHERE email = 'lyria.teazm@gmail.com';

-- 2. Copier l'ID ci-dessus et l'utiliser dans la requête suivante
-- REMPLACEZ 'VOTRE-UUID-ICI' par l'ID trouvé ci-dessus

INSERT INTO user_profiles (
    id,                              -- Utiliser le MÊME ID que auth.users
    email,
    username,
    plan,
    credits,
    is_admin,
    is_banned,
    achievements
) VALUES (
    'VOTRE-UUID-ICI',                -- ⚠️ REMPLACER PAR L'ID DE L'ÉTAPE 1
    'lyria.teazm@gmail.com',
    'lyria.teazm',
    'Free',
    150,
    false,
    false,
    '{}'::jsonb
);

-- 3. Vérifier que ça a marché
SELECT 
    '=== VÉRIFICATION ===' as info,
    id,
    email,
    username,
    plan,
    credits
FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com';


-- =====================================================
-- SOLUTION 2 : SUPPRIMER ET RECRÉER (Alternative)
-- =====================================================
-- Cette solution supprime tout et permet de recréer depuis l'app

-- 1. D'abord, supprimer de user_profiles (si existe)
DELETE FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com';

-- 2. Ensuite, il faut supprimer manuellement de auth.users via l'interface
-- Aller sur : Authentication → Users → Chercher lyria.teazm@gmail.com → Delete

-- 3. Après la suppression, vous pourrez recréer le compte depuis l'app


-- =====================================================
-- DIAGNOSTIC : Voir l'état actuel
-- =====================================================

SELECT '=== ÉTAT ACTUEL ===' as diagnostic;

SELECT 
    'auth.users' as table_name,
    COUNT(*) as compte_existe
FROM auth.users 
WHERE email = 'lyria.teazm@gmail.com';

SELECT 
    'user_profiles' as table_name,
    COUNT(*) as profil_existe
FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com';

-- Si auth.users = 1 et user_profiles = 0, c'est bien un problème de désynchronisation
