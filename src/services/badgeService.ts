import { supabase } from './supabaseClient';

export interface CommunityBadge {
  id: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  category: 'achievement' | 'special' | 'monthly' | 'milestone';
  criteria?: any; // JSON object with criteria
  is_active: boolean;
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  is_featured: boolean;
  // Relations
  name?: string;
  description?: string;
  icon?: string;
  color?: string;
  category?: string;
}

/**
 * Récupérer tous les badges communautaires actifs
 */
export async function getCommunityBadges(): Promise<{ data: CommunityBadge[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('community_badges')
      .select('*')
      .eq('is_active', true)
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error) throw error;

    return { data: data as CommunityBadge[], error: null };
  } catch (error) {
    console.error('Error fetching community badges:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Récupérer les badges d'un utilisateur
 */
export async function getUserBadges(userId: string): Promise<{ data: UserBadge[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.rpc('get_user_badges', {
      p_user_id: userId,
    });

    if (error) throw error;

    return { data: data as UserBadge[], error: null };
  } catch (error) {
    console.error('Error fetching user badges:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Vérifier et attribuer automatiquement les badges d'un utilisateur
 */
export async function checkAndAwardBadges(userId: string): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase.rpc('check_and_award_badges', {
      p_user_id: userId,
    });

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Error checking and awarding badges:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Mettre en avant un badge sur le profil
 */
export async function featureBadge(badgeId: string, isFeatured: boolean): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('user_badges')
      .update({ is_featured: isFeatured })
      .eq('id', badgeId)
      .eq('user_id', user.id);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error) {
    console.error('Error featuring badge:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Récupérer les badges mis en avant d'un utilisateur
 */
export async function getFeaturedBadges(userId: string): Promise<{ data: UserBadge[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('user_badges')
      .select(`
        *,
        community_badges!user_badges_badge_id_fkey (
          name,
          description,
          icon,
          color,
          category
        )
      `)
      .eq('user_id', userId)
      .eq('is_featured', true)
      .order('earned_at', { ascending: false });

    if (error) throw error;

    // Restructurer les données
    const badges = data.map(badge => ({
      ...badge,
      name: badge.community_badges?.name,
      description: badge.community_badges?.description,
      icon: badge.community_badges?.icon,
      color: badge.community_badges?.color,
      category: badge.community_badges?.category,
    }));

    return { data: badges as UserBadge[], error: null };
  } catch (error) {
    console.error('Error fetching featured badges:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Récupérer les statistiques de badges d'un utilisateur
 */
export async function getUserBadgeStats(userId: string): Promise<{
  total_badges: number;
  featured_badges: number;
  badges_by_category: Record<string, number>;
  recent_badges: UserBadge[];
} | null> {
  try {
    // Récupérer tous les badges de l'utilisateur
    const { data: allBadges } = await getUserBadges(userId);
    if (!allBadges) return null;

    // Compter par catégorie
    const badgesByCategory: Record<string, number> = {};
    allBadges.forEach(badge => {
      if (badge.category) {
        badgesByCategory[badge.category] = (badgesByCategory[badge.category] || 0) + 1;
      }
    });

    // Badges récents (5 derniers)
    const recentBadges = allBadges
      .sort((a, b) => new Date(b.earned_at).getTime() - new Date(a.earned_at).getTime())
      .slice(0, 5);

    return {
      total_badges: allBadges.length,
      featured_badges: allBadges.filter(b => b.is_featured).length,
      badges_by_category: badgesByCategory,
      recent_badges: recentBadges,
    };
  } catch (error) {
    console.error('Error fetching user badge stats:', error);
    return null;
  }
}

/**
 * Rechercher des badges par nom ou catégorie
 */
export async function searchBadges(
  query: string,
  category?: string
): Promise<{ data: CommunityBadge[] | null; error: Error | null }> {
  try {
    let queryBuilder = supabase
      .from('community_badges')
      .select('*')
      .eq('is_active', true);

    if (query) {
      queryBuilder = queryBuilder.or(`name.ilike.%${query}%,description.ilike.%${query}%`);
    }

    if (category) {
      queryBuilder = queryBuilder.eq('category', category);
    }

    const { data, error } = await queryBuilder
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error) throw error;

    return { data: data as CommunityBadge[], error: null };
  } catch (error) {
    console.error('Error searching badges:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Récupérer les utilisateurs avec le plus de badges
 */
export async function getTopBadgeUsers(limit: number = 10): Promise<{
  user_id: string;
  username: string;
  profile_picture_url?: string;
  total_badges: number;
  featured_badges: number;
}[] | null> {
  try {
    const { data, error } = await supabase
      .from('user_badges')
      .select(`
        user_id,
        is_featured,
        user_profiles!user_badges_user_id_fkey (
          username,
          profile_picture_url
        )
      `);

    if (error) throw error;

    // Grouper par utilisateur et compter
    const userStats: Record<string, {
      user_id: string;
      username: string;
      profile_picture_url?: string;
      total_badges: number;
      featured_badges: number;
    }> = {};

    data.forEach(badge => {
      const userId = badge.user_id;
      if (!userStats[userId]) {
        userStats[userId] = {
          user_id: userId,
          username: badge.user_profiles?.username || 'Unknown',
          profile_picture_url: badge.user_profiles?.profile_picture_url,
          total_badges: 0,
          featured_badges: 0,
        };
      }
      
      userStats[userId].total_badges++;
      if (badge.is_featured) {
        userStats[userId].featured_badges++;
      }
    });

    // Trier par nombre total de badges et retourner le top
    return Object.values(userStats)
      .sort((a, b) => b.total_badges - a.total_badges)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching top badge users:', error);
    return null;
  }
}

/**
 * Récupérer les badges les plus populaires (les plus attribués)
 */
export async function getPopularBadges(limit: number = 10): Promise<{
  badge_id: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  category: string;
  user_count: number;
}[] | null> {
  try {
    const { data, error } = await supabase
      .from('user_badges')
      .select(`
        badge_id,
        community_badges!user_badges_badge_id_fkey (
          name,
          description,
          icon,
          color,
          category
        )
      `);

    if (error) throw error;

    // Grouper par badge et compter
    const badgeStats: Record<string, {
      badge_id: string;
      name: string;
      description?: string;
      icon: string;
      color: string;
      category: string;
      user_count: number;
    }> = {};

    data.forEach(userBadge => {
      const badgeId = userBadge.badge_id;
      if (!badgeStats[badgeId]) {
        badgeStats[badgeId] = {
          badge_id: badgeId,
          name: userBadge.community_badges?.name || 'Unknown',
          description: userBadge.community_badges?.description,
          icon: userBadge.community_badges?.icon || '🏆',
          color: userBadge.community_badges?.color || '#4ff4bc',
          category: userBadge.community_badges?.category || 'achievement',
          user_count: 0,
        };
      }
      
      badgeStats[badgeId].user_count++;
    });

    // Trier par nombre d'utilisateurs et retourner le top
    return Object.values(badgeStats)
      .sort((a, b) => b.user_count - a.user_count)
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching popular badges:', error);
    return null;
  }
}

/**
 * Vérifier si un utilisateur a un badge spécifique
 */
export async function hasBadge(userId: string, badgeName: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('user_badges')
      .select(`
        id,
        community_badges!user_badges_badge_id_fkey (
          name
        )
      `)
      .eq('user_id', userId)
      .eq('community_badges.name', badgeName)
      .single();

    return !!data && !error;
  } catch (error) {
    return false;
  }
}

/**
 * Récupérer les badges d'une catégorie spécifique
 */
export async function getBadgesByCategory(
  category: 'achievement' | 'special' | 'monthly' | 'milestone'
): Promise<{ data: CommunityBadge[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('community_badges')
      .select('*')
      .eq('is_active', true)
      .eq('category', category)
      .order('name', { ascending: true });

    if (error) throw error;

    return { data: data as CommunityBadge[], error: null };
  } catch (error) {
    console.error('Error fetching badges by category:', error);
    return { data: null, error: error as Error };
  }
}



