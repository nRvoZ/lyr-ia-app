-- =====================================================
-- MIGRATION 007: PLAYLISTS ET BADGES COMMUNAUTAIRES
-- =====================================================
-- Extension du hub communautaire avec playlists et système de badges

-- =====================================================
-- TABLE: playlists
-- =====================================================
CREATE TABLE IF NOT EXISTS public.playlists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Métadonnées de la playlist
    name TEXT NOT NULL CHECK (LENGTH(name) > 0 AND LENGTH(name) <= 100),
    description TEXT CHECK (LENGTH(description) <= 500),
    
    -- Visibilité et stats
    is_public BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    songs_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    
    -- Modération
    is_flagged BOOLEAN DEFAULT false,
    moderation_status TEXT DEFAULT 'approved' CHECK (moderation_status IN ('pending', 'approved', 'rejected')),
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour les playlists
CREATE INDEX idx_playlists_user_id ON public.playlists(user_id);
CREATE INDEX idx_playlists_created_at ON public.playlists(created_at DESC);
CREATE INDEX idx_playlists_likes_count ON public.playlists(likes_count DESC);
CREATE INDEX idx_playlists_is_public ON public.playlists(is_public) WHERE is_public = true;
CREATE INDEX idx_playlists_is_featured ON public.playlists(is_featured) WHERE is_featured = true;

-- =====================================================
-- TABLE: playlist_songs
-- =====================================================
CREATE TABLE IF NOT EXISTS public.playlist_songs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    playlist_id UUID NOT NULL REFERENCES public.playlists(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
    song_position INTEGER NOT NULL CHECK (song_position > 0),
    added_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(playlist_id, post_id),
    UNIQUE(playlist_id, song_position)
);

CREATE INDEX idx_playlist_songs_playlist_id ON public.playlist_songs(playlist_id);
CREATE INDEX idx_playlist_songs_post_id ON public.playlist_songs(post_id);

-- =====================================================
-- TABLE: playlist_likes
-- =====================================================
CREATE TABLE IF NOT EXISTS public.playlist_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    playlist_id UUID NOT NULL REFERENCES public.playlists(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_playlist_likes_playlist_id ON public.playlist_likes(playlist_id);
CREATE INDEX idx_playlist_likes_user_id ON public.playlist_likes(user_id);

-- Index unique pour éviter les doublons de likes
CREATE UNIQUE INDEX idx_playlist_likes_unique ON public.playlist_likes(playlist_id, user_id);

-- =====================================================
-- TABLE: playlist_views
-- =====================================================
CREATE TABLE IF NOT EXISTS public.playlist_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    playlist_id UUID NOT NULL REFERENCES public.playlists(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_playlist_views_playlist_id ON public.playlist_views(playlist_id);
CREATE INDEX idx_playlist_views_created_at ON public.playlist_views(created_at);

-- Index unique conditionnel pour éviter les doublons de vues (utilisateurs authentifiés)
CREATE UNIQUE INDEX idx_playlist_views_user_unique 
ON public.playlist_views(playlist_id, user_id) 
WHERE user_id IS NOT NULL;

-- Index unique conditionnel pour éviter les doublons de vues (utilisateurs anonymes par IP)
CREATE UNIQUE INDEX idx_playlist_views_ip_unique 
ON public.playlist_views(playlist_id, ip_address) 
WHERE user_id IS NULL AND ip_address IS NOT NULL;

-- =====================================================
-- TABLE: community_badges
-- =====================================================
CREATE TABLE IF NOT EXISTS public.community_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE CHECK (LENGTH(name) > 0 AND LENGTH(name) <= 50),
    description TEXT CHECK (LENGTH(description) <= 200),
    icon TEXT NOT NULL, -- Emoji ou nom d'icône
    color TEXT DEFAULT '#4ff4bc', -- Couleur hexadécimale
    category TEXT NOT NULL CHECK (category IN ('achievement', 'special', 'monthly', 'milestone')),
    criteria JSONB, -- Critères d'obtention (ex: {"min_posts": 10, "min_likes": 100})
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: user_badges
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    badge_id UUID NOT NULL REFERENCES public.community_badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMPTZ DEFAULT NOW(),
    is_featured BOOLEAN DEFAULT false -- Badge mis en avant sur le profil
);

CREATE INDEX idx_user_badges_user_id ON public.user_badges(user_id);
CREATE INDEX idx_user_badges_badge_id ON public.user_badges(badge_id);
CREATE INDEX idx_user_badges_earned_at ON public.user_badges(earned_at DESC);

-- Index unique pour éviter qu'un utilisateur obtienne le même badge plusieurs fois
CREATE UNIQUE INDEX idx_user_badges_unique ON public.user_badges(user_id, badge_id);

-- =====================================================
-- FONCTIONS TRIGGER
-- =====================================================

-- Fonction pour mettre à jour le compteur de chansons dans les playlists
CREATE OR REPLACE FUNCTION update_playlist_songs_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.playlists
        SET songs_count = songs_count + 1
        WHERE id = NEW.playlist_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.playlists
        SET songs_count = GREATEST(0, songs_count - 1)
        WHERE id = OLD.playlist_id;
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_playlist_songs_count
AFTER INSERT OR DELETE ON public.playlist_songs
FOR EACH ROW EXECUTE FUNCTION update_playlist_songs_count();

-- Fonction pour mettre à jour le compteur de likes des playlists
CREATE OR REPLACE FUNCTION update_playlist_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.playlists
        SET likes_count = likes_count + 1
        WHERE id = NEW.playlist_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.playlists
        SET likes_count = GREATEST(0, likes_count - 1)
        WHERE id = OLD.playlist_id;
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_playlist_likes_count
AFTER INSERT OR DELETE ON public.playlist_likes
FOR EACH ROW EXECUTE FUNCTION update_playlist_likes_count();

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_playlist_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_playlist_updated_at
BEFORE UPDATE ON public.playlists
FOR EACH ROW EXECUTE FUNCTION update_playlist_updated_at();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlist_songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlist_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlist_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- Policies pour playlists
CREATE POLICY "Public playlists are viewable by everyone"
ON public.playlists FOR SELECT
USING (is_public = true AND moderation_status = 'approved');

CREATE POLICY "Users can view their own playlists"
ON public.playlists FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own playlists"
ON public.playlists FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own playlists"
ON public.playlists FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own playlists"
ON public.playlists FOR DELETE
USING (auth.uid() = user_id);

-- Policies pour playlist_songs
CREATE POLICY "Anyone can view playlist songs"
ON public.playlist_songs FOR SELECT
TO public USING (true);

CREATE POLICY "Users can manage their own playlist songs"
ON public.playlist_songs FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.playlists 
        WHERE id = playlist_id AND user_id = auth.uid()
    )
);

-- Policies pour playlist_likes
CREATE POLICY "Anyone can view playlist likes"
ON public.playlist_likes FOR SELECT
TO public USING (true);

CREATE POLICY "Authenticated users can like playlists"
ON public.playlist_likes FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike playlists"
ON public.playlist_likes FOR DELETE
USING (auth.uid() = user_id);

-- Policies pour playlist_views
CREATE POLICY "Anyone can insert playlist views"
ON public.playlist_views FOR INSERT
TO public
WITH CHECK (true);

-- Policies pour community_badges
CREATE POLICY "Anyone can view active badges"
ON public.community_badges FOR SELECT
TO public
USING (is_active = true);

-- Policies pour user_badges
CREATE POLICY "Anyone can view user badges"
ON public.user_badges FOR SELECT
TO public USING (true);

CREATE POLICY "Users can manage their own badges"
ON public.user_badges FOR ALL
USING (auth.uid() = user_id);

-- =====================================================
-- FONCTIONS HELPER
-- =====================================================

-- Fonction pour obtenir les playlists publiques
CREATE OR REPLACE FUNCTION get_public_playlists(
    p_limit INTEGER DEFAULT 20,
    p_offset INTEGER DEFAULT 0,
    p_sort_by TEXT DEFAULT 'recent' -- 'recent', 'popular', 'trending'
)
RETURNS TABLE (
    id UUID,
    user_id UUID,
    username TEXT,
    profile_picture_url TEXT,
    name TEXT,
    description TEXT,
    songs_count INTEGER,
    likes_count INTEGER,
    views_count INTEGER,
    created_at TIMESTAMPTZ,
    is_liked BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.user_id,
        up.username,
        up.profile_picture_url,
        p.name,
        p.description,
        p.songs_count,
        p.likes_count,
        p.views_count,
        p.created_at,
        EXISTS(
            SELECT 1 FROM public.playlist_likes pl 
            WHERE pl.playlist_id = p.id AND pl.user_id = auth.uid()
        ) as is_liked
    FROM public.playlists p
    JOIN public.user_profiles up ON p.user_id = up.id
    WHERE p.is_public = true AND p.moderation_status = 'approved'
    ORDER BY 
        CASE 
            WHEN p_sort_by = 'popular' THEN p.likes_count
            WHEN p_sort_by = 'trending' THEN (p.likes_count + p.views_count)
            ELSE 0
        END DESC,
        CASE WHEN p_sort_by = 'recent' THEN p.created_at END DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour obtenir les chansons d'une playlist
CREATE OR REPLACE FUNCTION get_playlist_songs(
    p_playlist_id UUID,
    p_limit INTEGER DEFAULT 50,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    post_id UUID,
    song_position INTEGER,
    added_at TIMESTAMPTZ,
    title TEXT,
    description TEXT,
    album_art_url TEXT,
    likes_count INTEGER,
    comments_count INTEGER,
    username TEXT,
    profile_picture_url TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ps.id,
        ps.post_id,
        ps.song_position,
        ps.added_at,
        cp.title,
        cp.description,
        cp.album_art_url,
        cp.likes_count,
        cp.comments_count,
        up.username,
        up.profile_picture_url
    FROM public.playlist_songs ps
    JOIN public.community_posts cp ON ps.post_id = cp.id
    JOIN public.user_profiles up ON cp.user_id = up.id
    WHERE ps.playlist_id = p_playlist_id
    ORDER BY ps.song_position
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour obtenir les badges d'un utilisateur
CREATE OR REPLACE FUNCTION get_user_badges(p_user_id UUID)
RETURNS TABLE (
    id UUID,
    badge_id UUID,
    name TEXT,
    description TEXT,
    icon TEXT,
    color TEXT,
    category TEXT,
    earned_at TIMESTAMPTZ,
    is_featured BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ub.id,
        ub.badge_id,
        cb.name,
        cb.description,
        cb.icon,
        cb.color,
        cb.category,
        ub.earned_at,
        ub.is_featured
    FROM public.user_badges ub
    JOIN public.community_badges cb ON ub.badge_id = cb.id
    WHERE ub.user_id = p_user_id
    ORDER BY ub.is_featured DESC, ub.earned_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- BADGES PAR DÉFAUT
-- =====================================================

-- Insérer des badges communautaires par défaut
INSERT INTO public.community_badges (name, description, icon, color, category, criteria) VALUES
-- Badges de création
('Premier Créateur', 'Première création partagée', '🎵', '#4ff4bc', 'milestone', '{"min_posts": 1}'),
('Créateur Actif', '10 créations partagées', '🎶', '#3275b8', 'milestone', '{"min_posts": 10}'),
('Créateur Prolifique', '50 créations partagées', '🎼', '#30259f', 'milestone', '{"min_posts": 50}'),
('Créateur Légendaire', '100 créations partagées', '🏆', '#ff6b6b', 'milestone', '{"min_posts": 100}'),

-- Badges d'engagement
('Premier Like', 'Premier like reçu', '❤️', '#ff6b6b', 'milestone', '{"min_likes": 1}'),
('Populaire', '100 likes reçus', '🔥', '#ff9500', 'milestone', '{"min_likes": 100}'),
('Viral', '1000 likes reçus', '🚀', '#ff2d92', 'milestone', '{"min_likes": 1000}'),

-- Badges de communauté
('Premier Abonné', 'Premier abonné', '👥', '#4ff4bc', 'milestone', '{"min_followers": 1}'),
('Influenceur', '100 abonnés', '⭐', '#ffd700', 'milestone', '{"min_followers": 100}'),
('Célébrité', '1000 abonnés', '🌟', '#ff6b6b', 'milestone', '{"min_followers": 1000}'),

-- Badges spéciaux
('Créateur du Mois', 'Créateur le plus actif du mois', '👑', '#ffd700', 'monthly', '{}'),
('Playlist Master', 'Créé 10 playlists', '📝', '#9c27b0', 'achievement', '{"min_playlists": 10}'),
('Curateur', 'Playlist avec 100 vues', '🎯', '#4caf50', 'achievement', '{"min_playlist_views": 100}'),
('Collaborateur', 'Commenté 50 fois', '💬', '#2196f3', 'achievement', '{"min_comments": 50}'),
('Explorateur', 'Exploré 5 genres différents', '🗺️', '#ff9800', 'achievement', '{"min_genres": 5}')

ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- FONCTION POUR ATTRIBUER AUTOMATIQUEMENT LES BADGES
-- =====================================================

CREATE OR REPLACE FUNCTION check_and_award_badges(p_user_id UUID)
RETURNS void AS $$
DECLARE
    user_stats RECORD;
    badge RECORD;
    has_badge BOOLEAN;
BEGIN
    -- Récupérer les stats de l'utilisateur
    SELECT 
        COALESCE(COUNT(DISTINCT cp.id), 0) as posts_count,
        COALESCE(SUM(cp.likes_count), 0) as total_likes,
        COALESCE(up.followers_count, 0) as followers_count,
        COALESCE(COUNT(DISTINCT p.id), 0) as playlists_count,
        COALESCE(SUM(p.views_count), 0) as total_playlist_views,
        COALESCE(COUNT(DISTINCT pc.id), 0) as comments_count
    INTO user_stats
    FROM public.user_profiles up
    LEFT JOIN public.community_posts cp ON up.id = cp.user_id AND cp.is_public = true
    LEFT JOIN public.playlists p ON up.id = p.user_id AND p.is_public = true
    LEFT JOIN public.post_comments pc ON up.id = pc.user_id
    WHERE up.id = p_user_id
    GROUP BY up.id, up.followers_count;

    -- Vérifier chaque badge
    FOR badge IN 
        SELECT * FROM public.community_badges 
        WHERE is_active = true 
        AND criteria IS NOT NULL
    LOOP
        -- Vérifier si l'utilisateur a déjà ce badge
        SELECT EXISTS(
            SELECT 1 FROM public.user_badges 
            WHERE user_id = p_user_id AND badge_id = badge.id
        ) INTO has_badge;
        
        -- Si pas déjà attribué, vérifier les critères
        IF NOT has_badge THEN
            -- Vérifier les critères selon le type de badge
            IF (badge.criteria->>'min_posts')::INTEGER IS NOT NULL 
               AND user_stats.posts_count >= (badge.criteria->>'min_posts')::INTEGER THEN
                INSERT INTO public.user_badges (user_id, badge_id) 
                VALUES (p_user_id, badge.id);
                
            ELSIF (badge.criteria->>'min_likes')::INTEGER IS NOT NULL 
               AND user_stats.total_likes >= (badge.criteria->>'min_likes')::INTEGER THEN
                INSERT INTO public.user_badges (user_id, badge_id) 
                VALUES (p_user_id, badge.id);
                
            ELSIF (badge.criteria->>'min_followers')::INTEGER IS NOT NULL 
               AND user_stats.followers_count >= (badge.criteria->>'min_followers')::INTEGER THEN
                INSERT INTO public.user_badges (user_id, badge_id) 
                VALUES (p_user_id, badge.id);
                
            ELSIF (badge.criteria->>'min_playlists')::INTEGER IS NOT NULL 
               AND user_stats.playlists_count >= (badge.criteria->>'min_playlists')::INTEGER THEN
                INSERT INTO public.user_badges (user_id, badge_id) 
                VALUES (p_user_id, badge.id);
                
            ELSIF (badge.criteria->>'min_playlist_views')::INTEGER IS NOT NULL 
               AND user_stats.total_playlist_views >= (badge.criteria->>'min_playlist_views')::INTEGER THEN
                INSERT INTO public.user_badges (user_id, badge_id) 
                VALUES (p_user_id, badge.id);
                
            ELSIF (badge.criteria->>'min_comments')::INTEGER IS NOT NULL 
               AND user_stats.comments_count >= (badge.criteria->>'min_comments')::INTEGER THEN
                INSERT INTO public.user_badges (user_id, badge_id) 
                VALUES (p_user_id, badge.id);
            END IF;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- TRIGGER POUR ATTRIBUER AUTOMATIQUEMENT LES BADGES
-- =====================================================

-- Trigger sur community_posts pour vérifier les badges
CREATE OR REPLACE FUNCTION trigger_check_badges_on_post()
RETURNS TRIGGER AS $$
BEGIN
    -- Vérifier les badges après insertion/mise à jour d'un post
    PERFORM check_and_award_badges(NEW.user_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_badges_on_post_insert
AFTER INSERT ON public.community_posts
FOR EACH ROW EXECUTE FUNCTION trigger_check_badges_on_post();

-- Trigger sur user_follows pour vérifier les badges
CREATE OR REPLACE FUNCTION trigger_check_badges_on_follow()
RETURNS TRIGGER AS $$
BEGIN
    -- Vérifier les badges pour l'utilisateur suivi
    PERFORM check_and_award_badges(NEW.following_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_badges_on_follow_insert
AFTER INSERT ON public.user_follows
FOR EACH ROW EXECUTE FUNCTION trigger_check_badges_on_follow();

-- Trigger sur post_likes pour vérifier les badges
CREATE OR REPLACE FUNCTION trigger_check_badges_on_like()
RETURNS TRIGGER AS $$
DECLARE
    post_owner_id UUID;
BEGIN
    -- Récupérer le propriétaire du post
    SELECT user_id INTO post_owner_id 
    FROM public.community_posts 
    WHERE id = NEW.post_id;
    
    -- Vérifier les badges pour le propriétaire du post
    PERFORM check_and_award_badges(post_owner_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_badges_on_like_insert
AFTER INSERT ON public.post_likes
FOR EACH ROW EXECUTE FUNCTION trigger_check_badges_on_like();

-- Trigger sur playlists pour vérifier les badges
CREATE OR REPLACE FUNCTION trigger_check_badges_on_playlist()
RETURNS TRIGGER AS $$
BEGIN
    -- Vérifier les badges après insertion d'une playlist
    PERFORM check_and_award_badges(NEW.user_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_badges_on_playlist_insert
AFTER INSERT ON public.playlists
FOR EACH ROW EXECUTE FUNCTION trigger_check_badges_on_playlist();
