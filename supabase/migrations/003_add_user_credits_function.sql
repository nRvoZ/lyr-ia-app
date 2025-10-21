-- Fonction pour ajouter des crédits à un utilisateur
-- Utilisée par le webhook Stripe lors de l'achat de crédits

CREATE OR REPLACE FUNCTION public.add_user_credits(
    user_id UUID,
    credits_to_add INTEGER
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Mise à jour des crédits de l'utilisateur
    UPDATE public.user_profiles
    SET 
        credits = CASE 
            WHEN credits = -1 THEN -1  -- Crédits illimités restent illimités
            ELSE credits + credits_to_add
        END,
        updated_at = NOW()
    WHERE id = user_id;
    
    -- Log pour debug
    RAISE NOTICE 'Added % credits to user %', credits_to_add, user_id;
END;
$$;

-- Donner les permissions nécessaires
GRANT EXECUTE ON FUNCTION public.add_user_credits TO service_role;
GRANT EXECUTE ON FUNCTION public.add_user_credits TO authenticated;

-- Commentaire pour documentation
COMMENT ON FUNCTION public.add_user_credits IS 'Ajoute des crédits à un utilisateur. Utilisée par le webhook Stripe lors de l''achat de crédits.';






