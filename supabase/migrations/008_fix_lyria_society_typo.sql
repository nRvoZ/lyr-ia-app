-- =====================================================
-- MIGRATION 008: FIX LYR-IA SOCIETY TYPO
-- =====================================================
-- Correction de la faute d'orthographe "LryIA soceity" → "SecretSociety"
-- Date: 21 octobre 2025

-- 1. Corriger le plan dans user_profiles
-- Remplacer toutes les variantes incorrectes par la valeur correcte
UPDATE user_profiles 
SET plan = 'SecretSociety'
WHERE plan IN (
    'LryIA soceity',
    'LryIA Society', 
    'LyrIA Society',
    'Lyr-IA Society',
    'LyrIA soceity',
    'lyria society',
    'LYRIA SOCIETY'
);

-- 2. Vérifier et afficher les plans après correction
DO $$
DECLARE
    plan_count INTEGER;
    plan_name TEXT;
BEGIN
    -- Compter les utilisateurs par plan
    FOR plan_name, plan_count IN
        SELECT plan::TEXT, COUNT(*) 
        FROM user_profiles 
        GROUP BY plan
    LOOP
        RAISE NOTICE 'Plan: %, Count: %', plan_name, plan_count;
    END LOOP;
END $$;

-- 3. Ajouter un commentaire pour clarifier la nomenclature
COMMENT ON TYPE subscription_plan IS 
'Plans d''abonnement Lyr-IA:
- Free: Plan gratuit
- Discovery: Plan Découverte (ancien)
- Pro: Plan Pro
- Ultimate: Plan Ultimate
- SecretSociety: Plan Lyr-IA Society (sur invitation uniquement)
Note: La valeur en BDD est "SecretSociety", le nom affiché est "Lyr-IA Society"';

-- 4. Mettre à jour les contraintes pour éviter les futures fautes
-- Si des vérifications de plan existent, elles utiliseront l'enum typé
ALTER TABLE user_profiles 
  ADD CONSTRAINT check_plan_is_valid 
  CHECK (plan::TEXT IN ('Free', 'Discovery', 'Pro', 'Ultimate', 'SecretSociety'));

