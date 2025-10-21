-- Script pour corriger les valeurs NULL dans user_profiles
-- Exécutez ce script dans Supabase SQL Editor

-- 1. Mettre à jour TOUTES les colonnes NULL avec des valeurs par défaut
UPDATE public.user_profiles
SET 
    total_songs_generated = COALESCE(total_songs_generated, 0),
    total_album_arts_generated = COALESCE(total_album_arts_generated, 0),
    total_analyzer_uses = COALESCE(total_analyzer_uses, 0),
    total_burst_generations = COALESCE(total_burst_generations, 0),
    consecutive_days_streak = COALESCE(consecutive_days_streak, 0),
    languages_used = COALESCE(languages_used, '{}'),
    modes_used = COALESCE(modes_used, '{}'),
    artists_used = COALESCE(artists_used, '{}'),
    styles_explored = COALESCE(styles_explored, '{}'),
    unlocked_themes = COALESCE(unlocked_themes, '{}'),
    unlocked_titles = COALESCE(unlocked_titles, '{}'),
    achievements = COALESCE(achievements, '{}')
WHERE 
    total_songs_generated IS NULL 
    OR total_album_arts_generated IS NULL
    OR total_analyzer_uses IS NULL
    OR total_burst_generations IS NULL
    OR consecutive_days_streak IS NULL
    OR languages_used IS NULL
    OR modes_used IS NULL
    OR artists_used IS NULL
    OR styles_explored IS NULL
    OR unlocked_themes IS NULL
    OR unlocked_titles IS NULL
    OR achievements IS NULL;

-- 2. Vérifier que tout est OK
SELECT 
    email,
    total_songs_generated,
    total_album_arts_generated,
    total_analyzer_uses,
    languages_used,
    modes_used,
    achievements
FROM public.user_profiles
WHERE email = 'nrvoz.officiel@gmail.com';

-- 3. Si vous voulez aussi compter rétroactivement les chansons depuis song_history :
-- (Optionnel - si vous avez déjà des chansons dans song_history)

-- Compter et mettre à jour le nombre total de chansons
UPDATE public.user_profiles up
SET total_songs_generated = (
    SELECT COUNT(*) 
    FROM public.song_history sh 
    WHERE sh.user_id = up.id
)
WHERE id IN (
    SELECT DISTINCT user_id 
    FROM public.song_history
);

-- Compter les langues utilisées
UPDATE public.user_profiles up
SET languages_used = (
    SELECT ARRAY_AGG(DISTINCT language)
    FROM public.song_history sh 
    WHERE sh.user_id = up.id
)
WHERE id IN (
    SELECT DISTINCT user_id 
    FROM public.song_history
);

-- Compter les modes utilisés
UPDATE public.user_profiles up
SET modes_used = (
    SELECT ARRAY_AGG(DISTINCT mode)
    FROM public.song_history sh 
    WHERE sh.user_id = up.id
)
WHERE id IN (
    SELECT DISTINCT user_id 
    FROM public.song_history
);

-- 4. Vérification finale
SELECT 
    email,
    total_songs_generated,
    total_album_arts_generated,
    array_length(languages_used, 1) as languages_count,
    array_length(modes_used, 1) as modes_count,
    achievements
FROM public.user_profiles
WHERE email = 'nrvoz.officiel@gmail.com';

-- Résultat attendu : Toutes les valeurs doivent être définies (pas NULL)





