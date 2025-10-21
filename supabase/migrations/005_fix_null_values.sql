-- Migration 005 : Correction des valeurs NULL et ajout de colonnes manquantes
-- Cette migration corrige les comptes existants créés avant les migrations précédentes

-- 1. Mettre à jour toutes les valeurs NULL avec des valeurs par défaut
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
    achievements = COALESCE(achievements, '{}'),
    profile_picture_url = COALESCE(profile_picture_url, NULL),
    active_title = COALESCE(active_title, NULL),
    stripe_customer_id = COALESCE(stripe_customer_id, NULL),
    stripe_subscription_id = COALESCE(stripe_subscription_id, NULL),
    subscription_status = COALESCE(subscription_status, NULL);

-- 2. Ajouter une colonne pour les settings utilisateur (si pas déjà existante)
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS settings JSONB DEFAULT '{}';

-- 3. Ajouter une colonne pour le thème actif
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS active_theme TEXT DEFAULT 'Aurora';

-- 4. Ajouter une colonne pour le background custom
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS custom_background TEXT;

-- 5. Ajouter une colonne pour la couleur de police préférée
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS font_color TEXT DEFAULT 'white';

-- Commentaires
COMMENT ON COLUMN public.user_profiles.settings IS 'Paramètres utilisateur stockés en JSONB (amplifyPrompt, verifyBeforeCopy, etc.)';
COMMENT ON COLUMN public.user_profiles.active_theme IS 'Thème de couleur actif (Aurora, Aqualis, etc.)';
COMMENT ON COLUMN public.user_profiles.custom_background IS 'URL du background personnalisé généré par l''utilisateur';
COMMENT ON COLUMN public.user_profiles.font_color IS 'Couleur de police préférée (white ou black)';





