-- Audit complet de la base de données Supabase
-- Exécutez ce script pour voir toutes les tables et leurs structures

-- 1. Lister TOUTES les tables dans le schéma public
SELECT table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- 2. Voir la structure complète de user_profiles
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'user_profiles'
ORDER BY ordinal_position;

-- 3. Voir la structure de song_history
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'song_history'
ORDER BY ordinal_position;

-- 4. Voir la structure de personal_profiles
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'personal_profiles'
ORDER BY ordinal_position;

-- 5. Voir la structure de payment_transactions
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'payment_transactions'
ORDER BY ordinal_position;

-- 6. Compter les données dans chaque table
SELECT 
    'user_profiles' as table_name, 
    COUNT(*) as total_rows,
    COUNT(*) FILTER (WHERE total_songs_generated IS NULL) as null_songs,
    COUNT(*) FILTER (WHERE achievements IS NULL) as null_achievements
FROM user_profiles
UNION ALL
SELECT 
    'song_history', 
    COUNT(*),
    0,
    0
FROM song_history
UNION ALL
SELECT 
    'personal_profiles', 
    COUNT(*),
    0,
    0
FROM personal_profiles
UNION ALL
SELECT 
    'payment_transactions', 
    COUNT(*),
    0,
    0
FROM payment_transactions;

-- 7. Voir vos données complètes
SELECT * FROM user_profiles WHERE email = 'nrvoz.officiel@gmail.com';





