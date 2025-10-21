-- LyrIA Complete Database Schema
-- Run this AFTER the initial schema to add missing features

-- Drop existing tables if they exist (for clean reinstall)
DROP TABLE IF EXISTS public.admin_logs CASCADE;
DROP TABLE IF EXISTS public.secret_society_invitations CASCADE;
DROP TABLE IF EXISTS public.system_settings CASCADE;
DROP TABLE IF EXISTS public.user_sessions CASCADE;

-- Drop and recreate ENUMs
DROP TYPE IF EXISTS subscription_plan CASCADE;
DROP TYPE IF EXISTS transaction_status CASCADE;
DROP TYPE IF EXISTS transaction_type CASCADE;

CREATE TYPE subscription_plan AS ENUM ('Free', 'Discovery', 'Pro', 'Ultimate', 'SecretSociety');
CREATE TYPE transaction_status AS ENUM ('pending', 'succeeded', 'failed', 'canceled');
CREATE TYPE transaction_type AS ENUM ('subscription', 'credits', 'one_time');

-- Update user_profiles table with new columns
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_status TEXT,
ADD COLUMN IF NOT EXISTS subscription_current_period_end TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS secret_society_invited_by UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS secret_society_joined_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS secret_society_invitation_code TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS login_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_generations INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_credits_spent INTEGER DEFAULT 0;

-- Update payment_transactions table
ALTER TABLE public.payment_transactions 
ALTER COLUMN user_id SET NOT NULL,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

-- Admin logs table
CREATE TABLE public.admin_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    admin_id UUID REFERENCES auth.users(id) NOT NULL,
    action TEXT NOT NULL,
    target_user_id UUID REFERENCES auth.users(id),
    details JSONB DEFAULT '{}',
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Secret Society invitations table
CREATE TABLE public.secret_society_invitations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    inviter_id UUID REFERENCES auth.users(id) NOT NULL,
    invitee_email TEXT NOT NULL,
    invitation_code TEXT UNIQUE NOT NULL,
    used_by UUID REFERENCES auth.users(id),
    used_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System settings table
CREATE TABLE public.system_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES auth.users(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User sessions table (for admin monitoring)
CREATE TABLE public.user_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    country TEXT,
    city TEXT,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.secret_society_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_logs
CREATE POLICY "Only admins can view admin logs" ON public.admin_logs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- RLS Policies for secret_society_invitations
CREATE POLICY "Users can view own invitations" ON public.secret_society_invitations
    FOR SELECT USING (
        inviter_id = auth.uid() OR 
        used_by = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.user_profiles 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

CREATE POLICY "Secret Society members can create invitations" ON public.secret_society_invitations
    FOR INSERT WITH CHECK (
        inviter_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.user_profiles 
            WHERE id = auth.uid() AND plan = 'SecretSociety'
        )
    );

-- RLS Policies for system_settings
CREATE POLICY "Only admins can manage system settings" ON public.system_settings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- RLS Policies for user_sessions
CREATE POLICY "Users can view own sessions" ON public.user_sessions
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all sessions" ON public.user_sessions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Insert default system settings
INSERT INTO public.system_settings (key, value, description) VALUES
('app_maintenance_mode', 'false', 'Enable/disable maintenance mode'),
('max_daily_generations', '50', 'Maximum generations per day for free users'),
('secret_society_enabled', 'true', 'Enable Secret Society features'),
('admin_notifications', 'true', 'Enable admin notifications'),
('credit_prices', '{"100": 499, "500": 1999, "1000": 3499}', 'Credit packages and prices in cents')
ON CONFLICT (key) DO NOTHING;

-- Advanced Functions for LyrIA

-- Function to log admin actions
CREATE OR REPLACE FUNCTION public.log_admin_action(
    action_type TEXT,
    target_user UUID DEFAULT NULL,
    action_details JSONB DEFAULT '{}'
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.admin_logs (admin_id, action, target_user_id, details)
    VALUES (auth.uid(), action_type, target_user, action_details);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to ban/unban users
CREATE OR REPLACE FUNCTION public.admin_ban_user(
    target_user_id UUID,
    ban_status BOOLEAN,
    reason TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    is_admin BOOLEAN;
BEGIN
    -- Check if current user is admin
    SELECT user_profiles.is_admin INTO is_admin
    FROM public.user_profiles
    WHERE id = auth.uid();

    IF NOT is_admin THEN
        RAISE EXCEPTION 'Access denied: Admin privileges required';
    END IF;

    -- Update user ban status
    UPDATE public.user_profiles
    SET is_banned = ban_status, updated_at = NOW()
    WHERE id = target_user_id;

    -- Log the action
    PERFORM public.log_admin_action(
        CASE WHEN ban_status THEN 'USER_BANNED' ELSE 'USER_UNBANNED' END,
        target_user_id,
        jsonb_build_object('reason', reason)
    );

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to upgrade user plan
CREATE OR REPLACE FUNCTION public.admin_upgrade_user_plan(
    target_user_id UUID,
    new_plan subscription_plan,
    credits_to_add INTEGER DEFAULT 0
)
RETURNS BOOLEAN AS $$
DECLARE
    is_admin BOOLEAN;
    old_plan subscription_plan;
BEGIN
    -- Check if current user is admin
    SELECT user_profiles.is_admin INTO is_admin
    FROM public.user_profiles
    WHERE id = auth.uid();

    IF NOT is_admin THEN
        RAISE EXCEPTION 'Access denied: Admin privileges required';
    END IF;

    -- Get old plan
    SELECT plan INTO old_plan FROM public.user_profiles WHERE id = target_user_id;

    -- Update user plan and credits
    UPDATE public.user_profiles
    SET
        plan = new_plan,
        credits = CASE
            WHEN new_plan = 'SecretSociety' THEN -1  -- unlimited
            WHEN credits_to_add > 0 THEN credits + credits_to_add
            ELSE credits
        END,
        updated_at = NOW()
    WHERE id = target_user_id;

    -- Log the action
    PERFORM public.log_admin_action(
        'PLAN_UPGRADED',
        target_user_id,
        jsonb_build_object(
            'old_plan', old_plan,
            'new_plan', new_plan,
            'credits_added', credits_to_add
        )
    );

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create Secret Society invitation
CREATE OR REPLACE FUNCTION public.create_secret_society_invitation(
    invitee_email TEXT
)
RETURNS TEXT AS $$
DECLARE
    invitation_code TEXT;
    inviter_plan subscription_plan;
BEGIN
    -- Check if inviter is Secret Society member
    SELECT plan INTO inviter_plan
    FROM public.user_profiles
    WHERE id = auth.uid();

    IF inviter_plan != 'SecretSociety' THEN
        RAISE EXCEPTION 'Access denied: Secret Society membership required';
    END IF;

    -- Generate unique invitation code
    invitation_code := upper(substring(md5(random()::text) from 1 for 8));

    -- Create invitation
    INSERT INTO public.secret_society_invitations (
        inviter_id,
        invitee_email,
        invitation_code,
        expires_at
    ) VALUES (
        auth.uid(),
        invitee_email,
        invitation_code,
        NOW() + INTERVAL '7 days'
    );

    -- Log the action
    PERFORM public.log_admin_action(
        'SECRET_SOCIETY_INVITATION_CREATED',
        NULL,
        jsonb_build_object('invitee_email', invitee_email, 'code', invitation_code)
    );

    RETURN invitation_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to use Secret Society invitation
CREATE OR REPLACE FUNCTION public.use_secret_society_invitation(
    invitation_code TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
    invitation_record RECORD;
    current_user_id UUID;
BEGIN
    current_user_id := auth.uid();

    -- Get invitation details
    SELECT * INTO invitation_record
    FROM public.secret_society_invitations
    WHERE invitation_code = use_secret_society_invitation.invitation_code
    AND used_by IS NULL
    AND expires_at > NOW();

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Invalid or expired invitation code';
    END IF;

    -- Update user to Secret Society
    UPDATE public.user_profiles
    SET
        plan = 'SecretSociety',
        credits = -1,  -- unlimited
        secret_society_invited_by = invitation_record.inviter_id,
        secret_society_joined_at = NOW(),
        secret_society_invitation_code = invitation_code,
        updated_at = NOW()
    WHERE id = current_user_id;

    -- Mark invitation as used
    UPDATE public.secret_society_invitations
    SET used_by = current_user_id, used_at = NOW()
    WHERE id = invitation_record.id;

    -- Log the action
    PERFORM public.log_admin_action(
        'SECRET_SOCIETY_INVITATION_USED',
        current_user_id,
        jsonb_build_object('invitation_code', invitation_code, 'inviter_id', invitation_record.inviter_id)
    );

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get admin dashboard stats
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_stats()
RETURNS JSONB AS $$
DECLARE
    stats JSONB;
    is_admin BOOLEAN;
BEGIN
    -- Check if current user is admin
    SELECT user_profiles.is_admin INTO is_admin
    FROM public.user_profiles
    WHERE id = auth.uid();

    IF NOT is_admin THEN
        RAISE EXCEPTION 'Access denied: Admin privileges required';
    END IF;

    SELECT jsonb_build_object(
        'total_users', (SELECT COUNT(*) FROM public.user_profiles),
        'active_users_today', (SELECT COUNT(*) FROM public.user_profiles WHERE last_login > NOW() - INTERVAL '1 day'),
        'total_generations', (SELECT SUM(total_generations) FROM public.user_profiles),
        'total_credits_spent', (SELECT SUM(total_credits_spent) FROM public.user_profiles),
        'plan_distribution', (
            SELECT jsonb_object_agg(plan, count)
            FROM (
                SELECT plan, COUNT(*) as count
                FROM public.user_profiles
                GROUP BY plan
            ) plan_counts
        ),
        'recent_signups', (SELECT COUNT(*) FROM public.user_profiles WHERE created_at > NOW() - INTERVAL '7 days'),
        'secret_society_members', (SELECT COUNT(*) FROM public.user_profiles WHERE plan = 'SecretSociety'),
        'banned_users', (SELECT COUNT(*) FROM public.user_profiles WHERE is_banned = true)
    ) INTO stats;

    RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
