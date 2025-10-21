-- =====================================================
-- MIGRATION 006: COMMUNITY HUB
-- =====================================================
-- Création des tables pour le hub communautaire de Lyr-IA
-- Inclut: posts publics, likes, commentaires, follows, et partage social

-- =====================================================
-- TABLE: community_posts
-- =====================================================
-- Stocke les créations partagées publiquement
CREATE TABLE IF NOT EXISTS public.community_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    history_id BIGINT, -- Foreign key will be added later if history table exists
    
    -- Contenu du post
    title TEXT NOT NULL,
    description TEXT,
    lyrics TEXT,
    style_prompt TEXT,
    album_art_url TEXT,
    
    -- Métadonnées de création
    mode TEXT,
    language TEXT,
    artist_name TEXT,
    styles JSONB DEFAULT '[]',
    
    -- Stats du post
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    
    -- Modération
    is_public BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_flagged BOOLEAN DEFAULT false,
    moderation_status TEXT DEFAULT 'approved' CHECK (moderation_status IN ('pending', 'approved', 'rejected')),
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Index pour améliorer les performances
CREATE INDEX idx_community_posts_user_id ON public.community_posts(user_id);
CREATE INDEX idx_community_posts_created_at ON public.community_posts(created_at DESC);
CREATE INDEX idx_community_posts_likes_count ON public.community_posts(likes_count DESC);
CREATE INDEX idx_community_posts_is_public ON public.community_posts(is_public) WHERE is_public = true;
CREATE INDEX idx_community_posts_is_featured ON public.community_posts(is_featured) WHERE is_featured = true;

-- =====================================================
-- TABLE: post_likes
-- =====================================================
CREATE TABLE IF NOT EXISTS public.post_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(post_id, user_id)
);

CREATE INDEX idx_post_likes_post_id ON public.post_likes(post_id);
CREATE INDEX idx_post_likes_user_id ON public.post_likes(user_id);

-- =====================================================
-- TABLE: post_comments
-- =====================================================
CREATE TABLE IF NOT EXISTS public.post_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    parent_comment_id UUID REFERENCES public.post_comments(id) ON DELETE CASCADE,
    
    content TEXT NOT NULL CHECK (LENGTH(content) > 0 AND LENGTH(content) <= 1000),
    
    -- Modération
    is_flagged BOOLEAN DEFAULT false,
    moderation_status TEXT DEFAULT 'approved' CHECK (moderation_status IN ('pending', 'approved', 'rejected')),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_post_comments_post_id ON public.post_comments(post_id);
CREATE INDEX idx_post_comments_user_id ON public.post_comments(user_id);
CREATE INDEX idx_post_comments_parent_id ON public.post_comments(parent_comment_id);

-- =====================================================
-- TABLE: user_follows
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_follows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    follower_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    following_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(follower_id, following_id),
    CHECK (follower_id != following_id)
);

CREATE INDEX idx_user_follows_follower_id ON public.user_follows(follower_id);
CREATE INDEX idx_user_follows_following_id ON public.user_follows(following_id);

-- =====================================================
-- TABLE: post_views
-- =====================================================
-- Tracking des vues uniques pour les posts
CREATE TABLE IF NOT EXISTS public.post_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index uniques conditionnels pour éviter les vues multiples
CREATE UNIQUE INDEX idx_post_views_user_unique ON public.post_views(post_id, user_id) WHERE user_id IS NOT NULL;
CREATE UNIQUE INDEX idx_post_views_ip_unique ON public.post_views(post_id, ip_address) WHERE user_id IS NULL AND ip_address IS NOT NULL;

CREATE INDEX idx_post_views_post_id ON public.post_views(post_id);
CREATE INDEX idx_post_views_created_at ON public.post_views(created_at);

-- =====================================================
-- FONCTIONS TRIGGER
-- =====================================================

-- Fonction pour mettre à jour le compteur de likes
CREATE OR REPLACE FUNCTION update_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.community_posts
        SET likes_count = likes_count + 1
        WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.community_posts
        SET likes_count = GREATEST(0, likes_count - 1)
        WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_post_likes_count
AFTER INSERT OR DELETE ON public.post_likes
FOR EACH ROW EXECUTE FUNCTION update_post_likes_count();

-- Fonction pour mettre à jour le compteur de commentaires
CREATE OR REPLACE FUNCTION update_post_comments_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.community_posts
        SET comments_count = comments_count + 1
        WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.community_posts
        SET comments_count = GREATEST(0, comments_count - 1)
        WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_post_comments_count
AFTER INSERT OR DELETE ON public.post_comments
FOR EACH ROW EXECUTE FUNCTION update_post_comments_count();

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_community_posts_updated_at
BEFORE UPDATE ON public.community_posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_post_comments_updated_at
BEFORE UPDATE ON public.post_comments
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_views ENABLE ROW LEVEL SECURITY;

-- Policies pour community_posts
CREATE POLICY "Public posts are viewable by everyone"
ON public.community_posts FOR SELECT
USING (is_public = true AND moderation_status = 'approved');

CREATE POLICY "Users can view their own posts"
ON public.community_posts FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own posts"
ON public.community_posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
ON public.community_posts FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
ON public.community_posts FOR DELETE
USING (auth.uid() = user_id);

-- Policies pour post_likes
CREATE POLICY "Anyone can view likes"
ON public.post_likes FOR SELECT
TO public USING (true);

CREATE POLICY "Authenticated users can like posts"
ON public.post_likes FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike posts"
ON public.post_likes FOR DELETE
USING (auth.uid() = user_id);

-- Policies pour post_comments
CREATE POLICY "Anyone can view approved comments"
ON public.post_comments FOR SELECT
TO public
USING (moderation_status = 'approved');

CREATE POLICY "Users can view their own comments"
ON public.post_comments FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can comment"
ON public.post_comments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
ON public.post_comments FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
ON public.post_comments FOR DELETE
USING (auth.uid() = user_id);

-- Policies pour user_follows
CREATE POLICY "Anyone can view follows"
ON public.user_follows FOR SELECT
TO public USING (true);

CREATE POLICY "Authenticated users can follow others"
ON public.user_follows FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow"
ON public.user_follows FOR DELETE
USING (auth.uid() = follower_id);

-- Policies pour post_views
CREATE POLICY "Anyone can insert views"
ON public.post_views FOR INSERT
TO public
WITH CHECK (true);

-- =====================================================
-- FONCTIONS HELPER
-- =====================================================

-- Fonction pour obtenir le feed communautaire
CREATE OR REPLACE FUNCTION get_community_feed(
    p_limit INTEGER DEFAULT 20,
    p_offset INTEGER DEFAULT 0,
    p_sort_by TEXT DEFAULT 'recent' -- 'recent', 'popular', 'trending'
)
RETURNS TABLE (
    id UUID,
    user_id UUID,
    username TEXT,
    profile_picture_url TEXT,
    title TEXT,
    description TEXT,
    album_art_url TEXT,
    likes_count INTEGER,
    comments_count INTEGER,
    views_count INTEGER,
    created_at TIMESTAMPTZ,
    is_liked BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cp.id,
        cp.user_id,
        up.username,
        up.profile_picture_url,
        cp.title,
        cp.description,
        cp.album_art_url,
        cp.likes_count,
        cp.comments_count,
        cp.views_count,
        cp.created_at,
        EXISTS(
            SELECT 1 FROM public.post_likes pl 
            WHERE pl.post_id = cp.id AND pl.user_id = auth.uid()
        ) as is_liked
    FROM public.community_posts cp
    JOIN public.user_profiles up ON cp.user_id = up.id
    WHERE cp.is_public = true AND cp.moderation_status = 'approved'
    ORDER BY 
        CASE 
            WHEN p_sort_by = 'popular' THEN cp.likes_count
            WHEN p_sort_by = 'trending' THEN (cp.likes_count + cp.comments_count + cp.views_count)
            ELSE 0
        END DESC,
        CASE WHEN p_sort_by = 'recent' THEN cp.created_at END DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour obtenir les posts d'un utilisateur
CREATE OR REPLACE FUNCTION get_user_posts(
    p_user_id UUID,
    p_limit INTEGER DEFAULT 20,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    album_art_url TEXT,
    likes_count INTEGER,
    comments_count INTEGER,
    views_count INTEGER,
    created_at TIMESTAMPTZ,
    is_public BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        cp.id,
        cp.title,
        cp.description,
        cp.album_art_url,
        cp.likes_count,
        cp.comments_count,
        cp.views_count,
        cp.created_at,
        cp.is_public
    FROM public.community_posts cp
    WHERE cp.user_id = p_user_id
        AND (cp.is_public = true OR cp.user_id = auth.uid())
        AND cp.moderation_status = 'approved'
    ORDER BY cp.created_at DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- VUES MATERIALISÉES pour les statistiques
-- =====================================================

-- Vue pour les créateurs populaires
CREATE MATERIALIZED VIEW IF NOT EXISTS public.popular_creators AS
SELECT 
    up.id,
    up.username,
    up.profile_picture_url,
    COUNT(DISTINCT cp.id) as posts_count,
    COALESCE(SUM(cp.likes_count), 0) as total_likes,
    COALESCE(SUM(cp.comments_count), 0) as total_comments,
    COUNT(DISTINCT uf.follower_id) as followers_count
FROM public.user_profiles up
LEFT JOIN public.community_posts cp ON up.id = cp.user_id AND cp.is_public = true
LEFT JOIN public.user_follows uf ON up.id = uf.following_id
GROUP BY up.id, up.username, up.profile_picture_url
HAVING COUNT(DISTINCT cp.id) > 0
ORDER BY total_likes DESC, followers_count DESC
LIMIT 100;

CREATE UNIQUE INDEX idx_popular_creators_id ON public.popular_creators(id);

-- Fonction pour rafraîchir les statistiques (à appeler périodiquement)
CREATE OR REPLACE FUNCTION refresh_community_stats()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY public.popular_creators;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- AJOUT DE COLONNES À user_profiles pour les stats sociales
-- =====================================================
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS followers_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS following_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS posts_count INTEGER DEFAULT 0;

-- Fonction pour mettre à jour les compteurs de follows
CREATE OR REPLACE FUNCTION update_follow_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Incrémenter following_count pour le follower
        UPDATE public.user_profiles
        SET following_count = following_count + 1
        WHERE id = NEW.follower_id;
        
        -- Incrémenter followers_count pour le following
        UPDATE public.user_profiles
        SET followers_count = followers_count + 1
        WHERE id = NEW.following_id;
        
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        -- Décrémenter following_count pour le follower
        UPDATE public.user_profiles
        SET following_count = GREATEST(0, following_count - 1)
        WHERE id = OLD.follower_id;
        
        -- Décrémenter followers_count pour le following
        UPDATE public.user_profiles
        SET followers_count = GREATEST(0, followers_count - 1)
        WHERE id = OLD.following_id;
        
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_follow_counts
AFTER INSERT OR DELETE ON public.user_follows
FOR EACH ROW EXECUTE FUNCTION update_follow_counts();

-- Fonction pour mettre à jour le compteur de posts
CREATE OR REPLACE FUNCTION update_user_posts_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.user_profiles
        SET posts_count = posts_count + 1
        WHERE id = NEW.user_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.user_profiles
        SET posts_count = GREATEST(0, posts_count - 1)
        WHERE id = OLD.user_id;
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_posts_count
AFTER INSERT OR DELETE ON public.community_posts
FOR EACH ROW EXECUTE FUNCTION update_user_posts_count();

-- =====================================================
-- AJOUT DE LA FOREIGN KEY POUR HISTORY (si la table existe)
-- =====================================================
-- Cette section ajoute la foreign key uniquement si la table history existe
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'history') THEN
        -- Ajouter la foreign key vers history
        ALTER TABLE public.community_posts
        ADD CONSTRAINT fk_community_posts_history
        FOREIGN KEY (history_id) REFERENCES public.history(id) ON DELETE SET NULL;
        
        RAISE NOTICE 'Foreign key to history table added successfully';
    ELSE
        RAISE NOTICE 'History table does not exist, skipping foreign key creation';
    END IF;
END $$;
