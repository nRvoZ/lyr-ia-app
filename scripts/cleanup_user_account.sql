-- =====================================================
-- SCRIPT DE NETTOYAGE COMPTE UTILISATEUR
-- =====================================================
-- Pour résoudre les problèmes de création de compte
-- Date: 21 octobre 2025

-- 1. Vérifier si l'email existe dans auth.users
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at,
    last_sign_in_at
FROM auth.users 
WHERE email = 'lyria.teazm@gmail.com';

-- 2. Vérifier si l'email existe dans user_profiles
SELECT 
    id,
    email,
    username,
    plan,
    created_at
FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com';

-- 3. Vérifier si le username est pris
SELECT 
    username,
    email,
    created_at
FROM user_profiles 
WHERE username = 'lyria.teazm' OR username LIKE 'lyria.teazm%';

-- 4. NETTOYAGE COMPLET (à exécuter si nécessaire)
-- ATTENTION: Ceci va supprimer définitivement le compte

-- Supprimer de user_profiles
DELETE FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com';

-- Supprimer de auth.users (si l'utilisateur existe)
DELETE FROM auth.users 
WHERE email = 'lyria.teazm@gmail.com';

-- 5. Vérifier le nettoyage
SELECT 'Nettoyage terminé' as status;

-- 6. Vérifier les contraintes qui pourraient bloquer
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conrelid = 'user_profiles'::regclass
AND contype = 'u'; -- Contraintes uniques
