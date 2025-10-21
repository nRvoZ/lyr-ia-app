-- Vérifier les sessions actives dans Supabase
SELECT 
  id,
  user_id,
  created_at,
  updated_at,
  factor_id,
  aal,
  not_after
FROM auth.sessions 
WHERE user_id IS NOT NULL
ORDER BY created_at DESC
LIMIT 10;

-- Vérifier les utilisateurs authentifiés
SELECT 
  id,
  email,
  created_at,
  last_sign_in_at,
  email_confirmed_at
FROM auth.users 
ORDER BY created_at DESC
LIMIT 5;



