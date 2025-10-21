-- Vérifier TOUTES les tables communautaires
SELECT 
  table_name,
  CASE 
    WHEN table_name IN (
      'community_posts', 
      'post_likes', 
      'post_comments', 
      'user_follows', 
      'post_views',
      'user_playlists',
      'playlist_songs',
      'playlist_likes',
      'playlist_views',
      'badges',
      'user_badges'
    ) THEN '✅ EXISTE'
    ELSE '❌ MANQUANT'
  END as status
FROM information_schema.tables 
WHERE table_schema = 'public'
  AND table_name IN (
    'community_posts', 
    'post_likes', 
    'post_comments', 
    'user_follows', 
    'post_views',
    'user_playlists',
    'playlist_songs',
    'playlist_likes',
    'playlist_views',
    'badges',
    'user_badges'
  )
ORDER BY table_name;

-- Compter les tables qui existent
SELECT 
  COUNT(*) as tables_existantes,
  11 as tables_requises,
  CASE 
    WHEN COUNT(*) = 11 THEN '✅ TOUTES LES TABLES EXISTENT'
    WHEN COUNT(*) >= 5 AND COUNT(*) < 11 THEN '⚠️ MIGRATION PARTIELLE - Exécutez 007_playlists_and_badges.sql'
    WHEN COUNT(*) > 0 AND COUNT(*) < 5 THEN '⚠️ MIGRATION PARTIELLE - Exécutez 006_community_hub.sql puis 007_playlists_and_badges.sql'
    ELSE '❌ AUCUNE TABLE - Exécutez 006_community_hub.sql puis 007_playlists_and_badges.sql'
  END as diagnostic
FROM information_schema.tables 
WHERE table_schema = 'public'
  AND table_name IN (
    'community_posts', 
    'post_likes', 
    'post_comments', 
    'user_follows', 
    'post_views',
    'user_playlists',
    'playlist_songs',
    'playlist_likes',
    'playlist_views',
    'badges',
    'user_badges'
  );
