-- =====================================================
-- FIX AUTOMATIQUE COMPTE DÉSYNCHRONISÉ
-- =====================================================
-- Script automatique pour recréer le profil user_profiles
-- à partir du compte auth.users existant
-- Date: 21 octobre 2025

-- EXÉCUTEZ CE SCRIPT TEL QUEL - Il fait tout automatiquement !

DO $$
DECLARE
    user_id UUID;
    user_email TEXT;
    profile_exists INTEGER;
BEGIN
    -- 1. Chercher le compte dans auth.users
    SELECT id, email INTO user_id, user_email
    FROM auth.users 
    WHERE email = 'lyria.teazm@gmail.com';
    
    IF user_id IS NULL THEN
        RAISE NOTICE '❌ Aucun compte trouvé dans auth.users pour lyria.teazm@gmail.com';
        RAISE NOTICE '➡️ Solution : Créez le compte depuis l''app Lyr-IA';
        RETURN;
    END IF;
    
    RAISE NOTICE '✅ Compte trouvé dans auth.users';
    RAISE NOTICE '   ID: %', user_id;
    RAISE NOTICE '   Email: %', user_email;
    
    -- 2. Vérifier si le profil existe déjà
    SELECT COUNT(*) INTO profile_exists
    FROM user_profiles 
    WHERE id = user_id;
    
    IF profile_exists > 0 THEN
        RAISE NOTICE '⚠️  Le profil existe déjà dans user_profiles';
        RAISE NOTICE '➡️ Le compte devrait fonctionner normalement';
        RETURN;
    END IF;
    
    RAISE NOTICE '⚠️  Profil manquant dans user_profiles';
    RAISE NOTICE '🔧 Création du profil...';
    
    -- 3. Créer le profil manquant
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
        user_id,
        'lyria.teazm@gmail.com',
        'lyria.teazm',
        'Free',
        150,
        false,
        false,
        '{}'::jsonb
    );
    
    RAISE NOTICE '✅ Profil créé avec succès !';
    RAISE NOTICE '   Username: lyria.teazm';
    RAISE NOTICE '   Plan: Free';
    RAISE NOTICE '   Crédits: 150';
    RAISE NOTICE '';
    RAISE NOTICE '🎉 Vous pouvez maintenant vous connecter sur l''app !';
    
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ Erreur: %', SQLERRM;
    RAISE NOTICE '➡️ Utilisez la méthode manuelle dans GUIDE_COMPTE_DESYNCHRONISE.md';
END $$;

-- Vérification finale
SELECT 
    '=== VÉRIFICATION FINALE ===' as info,
    id,
    email,
    username,
    plan,
    credits
FROM user_profiles 
WHERE email = 'lyria.teazm@gmail.com';
