-- Test des fonctionnalités communautaires
-- Vérifier que les tables existent et ont des données

-- 1. Vérifier les posts communautaires
SELECT 
  'community_posts' as table_name,
  COUNT(*) as total_posts,
  COUNT(CASE WHEN is_public = true THEN 1 END) as public_posts
FROM community_posts;

-- 2. Vérifier les playlists
SELECT 
  'user_playlists' as table_name,
  COUNT(*) as total_playlists,
  COUNT(CASE WHEN is_public = true THEN 1 END) as public_playlists
FROM user_playlists;

-- 3. Vérifier les likes
SELECT 
  'post_likes' as table_name,
  COUNT(*) as total_likes
FROM post_likes;

-- 4. Vérifier les utilisateurs avec des profils
SELECT 
  'user_profiles' as table_name,
  COUNT(*) as total_profiles,
  COUNT(CASE WHEN username IS NOT NULL THEN 1 END) as users_with_usernames
FROM user_profiles;

-- 5. Test de la fonction get_community_feed
SELECT * FROM get_community_feed(5, 0, 'recent');

-- 6. Test de la fonction get_public_playlists
SELECT * FROM get_public_playlists(5, 0);
