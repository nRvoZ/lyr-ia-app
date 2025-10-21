-- Vérifier les fonctions RPC spécifiques utilisées par l'application
SELECT 
  routine_name,
  routine_type,
  data_type as return_type
FROM information_schema.routines 
WHERE routine_schema = 'public' 
  AND routine_name IN (
    'get_community_feed',
    'get_public_playlists', 
    'get_popular_creators',
    'like_post',
    'unlike_post',
    'add_comment',
    'follow_user',
    'unfollow_user',
    'get_playlist_songs',
    'get_user_badges'
  )
ORDER BY routine_name;

-- Si aucune fonction n'est trouvée, vérifier toutes les fonctions disponibles
SELECT 
  routine_name,
  routine_type
FROM information_schema.routines 
WHERE routine_schema = 'public' 
  AND routine_name LIKE '%community%' 
  OR routine_name LIKE '%playlist%'
  OR routine_name LIKE '%badge%'
ORDER BY routine_name;
