-- Migration pour améliorer le tracking des achievements et des statistiques
-- Version 1.0 - Ajout des colonnes de statistiques

-- Ajouter des colonnes de statistiques dans user_profiles pour faciliter le tracking
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS total_songs_generated INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_album_arts_generated INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS languages_used TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS modes_used TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS artists_used TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS styles_explored TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS total_analyzer_uses INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_burst_generations INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS consecutive_days_streak INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_generation_date DATE,
ADD COLUMN IF NOT EXISTS unlocked_themes TEXT[] DEFAULT '{}';

-- Fonction pour mettre à jour les achievements d'un utilisateur
CREATE OR REPLACE FUNCTION public.update_user_achievement(
    p_user_id UUID,
    p_achievement_id TEXT,
    p_progress INTEGER,
    p_is_unlocked BOOLEAN DEFAULT FALSE
)
RETURNS VOID AS $$
DECLARE
    current_achievements JSONB;
    achievement_data JSONB;
BEGIN
    -- Récupérer les achievements actuels
    SELECT achievements INTO current_achievements
    FROM public.user_profiles
    WHERE id = p_user_id;
    
    -- Si null, initialiser à un objet vide
    IF current_achievements IS NULL THEN
        current_achievements := '{}'::jsonb;
    END IF;
    
    -- Construire les données de l'achievement
    achievement_data := jsonb_build_object(
        'progress', p_progress,
        'unlockedAt', CASE WHEN p_is_unlocked THEN to_json(NOW())::jsonb ELSE NULL END,
        'isClaimed', COALESCE((current_achievements -> p_achievement_id ->> 'isClaimed')::boolean, FALSE)
    );
    
    -- Si déjà déverrouillé, conserver la date de déverrouillage
    IF (current_achievements -> p_achievement_id ->> 'unlockedAt') IS NOT NULL THEN
        achievement_data := jsonb_set(
            achievement_data,
            '{unlockedAt}',
            current_achievements -> p_achievement_id -> 'unlockedAt'
        );
    END IF;
    
    -- Mettre à jour ou insérer l'achievement
    UPDATE public.user_profiles
    SET 
        achievements = jsonb_set(
            current_achievements,
            ARRAY[p_achievement_id],
            achievement_data
        ),
        updated_at = NOW()
    WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour marquer un achievement comme réclamé
CREATE OR REPLACE FUNCTION public.claim_achievement_reward(
    p_user_id UUID,
    p_achievement_id TEXT
)
RETURNS VOID AS $$
DECLARE
    current_achievements JSONB;
    achievement_data JSONB;
BEGIN
    SELECT achievements INTO current_achievements
    FROM public.user_profiles
    WHERE id = p_user_id;
    
    IF current_achievements IS NULL OR (current_achievements -> p_achievement_id) IS NULL THEN
        RAISE EXCEPTION 'Achievement not found';
    END IF;
    
    -- Marquer comme réclamé
    achievement_data := jsonb_set(
        current_achievements -> p_achievement_id,
        '{isClaimed}',
        'true'::jsonb
    );
    
    UPDATE public.user_profiles
    SET 
        achievements = jsonb_set(
            current_achievements,
            ARRAY[p_achievement_id],
            achievement_data
        ),
        updated_at = NOW()
    WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour incrémenter les statistiques après une génération
CREATE OR REPLACE FUNCTION public.increment_generation_stats(
    p_user_id UUID,
    p_mode TEXT,
    p_language TEXT,
    p_has_album_art BOOLEAN DEFAULT FALSE,
    p_is_burst BOOLEAN DEFAULT FALSE,
    p_artists TEXT[] DEFAULT '{}',
    p_styles TEXT[] DEFAULT '{}'
)
RETURNS VOID AS $$
DECLARE
    current_date DATE := CURRENT_DATE;
    last_gen_date DATE;
    current_streak INTEGER;
BEGIN
    -- Récupérer la dernière date de génération
    SELECT last_generation_date, consecutive_days_streak
    INTO last_gen_date, current_streak
    FROM public.user_profiles
    WHERE id = p_user_id;
    
    -- Calculer le streak
    IF last_gen_date IS NULL THEN
        current_streak := 1;
    ELSIF last_gen_date = current_date THEN
        current_streak := COALESCE(current_streak, 1);
    ELSIF last_gen_date = current_date - INTERVAL '1 day' THEN
        current_streak := COALESCE(current_streak, 0) + 1;
    ELSE
        current_streak := 1;
    END IF;
    
    -- Mettre à jour les statistiques
    UPDATE public.user_profiles
    SET
        total_songs_generated = total_songs_generated + 1,
        total_album_arts_generated = total_album_arts_generated + CASE WHEN p_has_album_art THEN 1 ELSE 0 END,
        total_burst_generations = total_burst_generations + CASE WHEN p_is_burst THEN 1 ELSE 0 END,
        languages_used = array_append(languages_used, p_language),
        modes_used = array_append(modes_used, p_mode),
        artists_used = CASE 
            WHEN p_artists IS NOT NULL AND array_length(p_artists, 1) > 0 
            THEN artists_used || p_artists 
            ELSE artists_used 
        END,
        styles_explored = CASE 
            WHEN p_styles IS NOT NULL AND array_length(p_styles, 1) > 0 
            THEN styles_explored || p_styles 
            ELSE styles_explored 
        END,
        consecutive_days_streak = current_streak,
        last_generation_date = current_date,
        updated_at = NOW()
    WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour incrémenter l'utilisation de l'analyseur
CREATE OR REPLACE FUNCTION public.increment_analyzer_stats(
    p_user_id UUID
)
RETURNS VOID AS $$
BEGIN
    UPDATE public.user_profiles
    SET
        total_analyzer_uses = total_analyzer_uses + 1,
        updated_at = NOW()
    WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour obtenir les statistiques utilisateur pour les achievements
CREATE OR REPLACE FUNCTION public.get_user_stats(p_user_id UUID)
RETURNS TABLE (
    total_songs INTEGER,
    total_album_arts INTEGER,
    total_analyzer_uses INTEGER,
    total_burst_gens INTEGER,
    languages_count INTEGER,
    modes_count INTEGER,
    artists_count INTEGER,
    styles_count INTEGER,
    current_streak INTEGER,
    achievements JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        up.total_songs_generated,
        up.total_album_arts_generated,
        up.total_analyzer_uses,
        up.total_burst_generations,
        COALESCE(array_length(array(SELECT DISTINCT unnest(up.languages_used)), 1), 0),
        COALESCE(array_length(array(SELECT DISTINCT unnest(up.modes_used)), 1), 0),
        COALESCE(array_length(array(SELECT DISTINCT unnest(up.artists_used)), 1), 0),
        COALESCE(array_length(array(SELECT DISTINCT unnest(up.styles_explored)), 1), 0),
        up.consecutive_days_streak,
        up.achievements
    FROM public.user_profiles up
    WHERE up.id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Accorder les permissions nécessaires
GRANT EXECUTE ON FUNCTION public.update_user_achievement TO authenticated;
GRANT EXECUTE ON FUNCTION public.claim_achievement_reward TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_generation_stats TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_analyzer_stats TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_stats TO authenticated;

-- Commentaires pour la documentation
COMMENT ON FUNCTION public.update_user_achievement IS 'Met à jour la progression d''un achievement pour un utilisateur';
COMMENT ON FUNCTION public.claim_achievement_reward IS 'Marque un achievement comme réclamé par l''utilisateur';
COMMENT ON FUNCTION public.increment_generation_stats IS 'Incrémente les statistiques de génération après chaque création';
COMMENT ON FUNCTION public.increment_analyzer_stats IS 'Incrémente le compteur d''utilisation de l''analyseur';
COMMENT ON FUNCTION public.get_user_stats IS 'Récupère toutes les statistiques utilisateur pour le calcul des achievements';





