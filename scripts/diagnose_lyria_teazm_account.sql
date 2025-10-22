-- =====================================================
-- DIAGNOSTIC SPÉCIFIQUE : lyria.teazm@gmail.com
-- =====================================================
-- Script pour identifier exactement ce qui bloque la création
-- Date: 21 octobre 2025

-- 1. Vérifier dans auth.users
SELECT 
    'auth.users' as table_name,
    id,
    email,
    email_confirmed_at,
    created_at,
    last_sign_in_at
FROM auth.users 
WHERE email = 'lyria.teazm@gmail.com';

-- 2. Vérifier dans user_profiles (email)
SELECT 
    'user_profiles (email)' as check_type,
    id,
    email,
    username,
    plan,
    created_at
FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com';

-- 3. Vérifier dans user_profiles (username)
SELECT 
    'user_profiles (username)' as check_type,
    id,
    email,
    username,
    plan,
    created_at
FROM user_profiles 
WHERE username = 'lyria.teazm';

-- 4. Vérifier les usernames similaires
SELECT 
    'usernames similaires' as check_type,
    id,
    email,
    username,
    plan,
    created_at
FROM user_profiles 
WHERE username LIKE 'lyria.teazm%' 
   OR username LIKE '%lyria.teazm%';

-- 5. Vérifier les codes d'invitation
SELECT 
    'codes invitation' as check_type,
    id,
    email,
    username,
    secret_society_invitation_code,
    created_at
FROM user_profiles 
WHERE secret_society_invitation_code IS NOT NULL
  AND (email LIKE '%lyria.teazm%' OR username LIKE '%lyria.teazm%');

-- 6. NETTOYAGE COMPLET (à exécuter si des résultats apparaissent)
-- ATTENTION: Ceci va supprimer définitivement toutes les traces

-- Supprimer de user_profiles (toutes les variantes)
DELETE FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com' 
   OR username = 'lyria.teazm'
   OR username LIKE 'lyria.teazm%'
   OR email LIKE '%lyria.teazm%';

-- Note: auth.users se nettoie via l'interface Supabase Dashboard

-- 7. Vérifier le nettoyage
SELECT 'Nettoyage terminé - Vérification:' as status;

SELECT 
    'Après nettoyage - auth.users' as check_type,
    COUNT(*) as count
FROM auth.users 
WHERE email = 'lyria.teazm@gmail.com';

SELECT 
    'Après nettoyage - user_profiles' as check_type,
    COUNT(*) as count
FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com' 
   OR username = 'lyria.teazm';

-- 8. Test de création (simulation)
-- Vérifier si on peut insérer un profil test
DO $$ 
DECLARE
    test_id UUID;
BEGIN
    test_id := gen_random_uuid();
    
    INSERT INTO user_profiles (
        id,
        email,
        username,
        plan,
        credits,
        is_admin,
        is_banned,
        achievements
    ) VALUES (
        test_id,
        'lyria.teazm@gmail.com',
        'lyria.teazm',
        'Free',
        150,
        false,
        false,
        '{}'
    );
    
    RAISE NOTICE 'Test de création réussi avec ID: %', test_id;
    
    -- Nettoyer le test immédiatement
    DELETE FROM user_profiles WHERE id = test_id;
    
    RAISE NOTICE 'Test nettoyé - Création de compte possible!';
    
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Erreur lors du test: %', SQLERRM;
END $$;

