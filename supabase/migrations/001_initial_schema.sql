-- LyrIA Database Schema - Complete Version
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types for better data integrity
CREATE TYPE subscription_plan AS ENUM ('Free', 'Discovery', 'Pro', 'Ultimate', 'SecretSociety');
CREATE TYPE transaction_status AS ENUM ('pending', 'succeeded', 'failed', 'canceled');
CREATE TYPE transaction_type AS ENUM ('subscription', 'credits', 'one_time');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    plan subscription_plan DEFAULT 'Free',
    credits INTEGER DEFAULT 150,
    is_admin BOOLEAN DEFAULT FALSE,
    is_banned BOOLEAN DEFAULT FALSE,
    profile_picture_url TEXT,
    achievements JSONB DEFAULT '{}',
    unlocked_titles TEXT[] DEFAULT '{}',
    active_title TEXT,
    -- Subscription management
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    subscription_status TEXT,
    subscription_current_period_end TIMESTAMP WITH TIME ZONE,
    -- Secret Society
    secret_society_invited_by UUID REFERENCES auth.users(id),
    secret_society_joined_at TIMESTAMP WITH TIME ZONE,
    secret_society_invitation_code TEXT UNIQUE,
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Song history table (enhanced)
CREATE TABLE public.song_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    mode TEXT NOT NULL,
    language TEXT NOT NULL,
    inputs JSONB NOT NULL,
    outputs JSONB NOT NULL,
    burst_outputs JSONB,
    album_art TEXT,
    verification_result JSONB,
    is_copied BOOLEAN DEFAULT FALSE,
    credits_used INTEGER DEFAULT 0,
    generation_time_ms INTEGER,
    is_favorite BOOLEAN DEFAULT FALSE,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Personal profiles table
CREATE TABLE public.personal_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    profile_number INTEGER CHECK (profile_number IN (1, 2, 3)),
    name TEXT,
    style_description TEXT,
    example_lyrics TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, profile_number)
);

-- Broadcast messages table
CREATE TABLE public.broadcast_messages (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment transactions table
CREATE TABLE public.payment_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    stripe_payment_intent_id TEXT,
    amount INTEGER, -- in cents
    currency TEXT DEFAULT 'eur',
    status TEXT,
    type TEXT, -- 'subscription' or 'credits'
    plan_id TEXT,
    credits_purchased INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) policies
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.song_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Policies for song_history
CREATE POLICY "Users can view own history" ON public.song_history
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own history" ON public.song_history
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own history" ON public.song_history
    FOR UPDATE USING (auth.uid() = user_id);

-- Policies for personal_profiles
CREATE POLICY "Users can manage own profiles" ON public.personal_profiles
    FOR ALL USING (auth.uid() = user_id);

-- Policies for payment_transactions
CREATE POLICY "Users can view own transactions" ON public.payment_transactions
    FOR SELECT USING (auth.uid() = user_id);

-- Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, username)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'username');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_personal_profiles_updated_at
    BEFORE UPDATE ON public.personal_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Functions for credit management
CREATE OR REPLACE FUNCTION public.add_user_credits(user_id UUID, credits_to_add INTEGER)
RETURNS VOID AS $$
BEGIN
    UPDATE public.user_profiles
    SET credits = CASE
        WHEN credits = -1 THEN -1  -- unlimited stays unlimited
        ELSE credits + credits_to_add
    END
    WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.deduct_user_credits(user_id UUID, credits_to_deduct INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
    current_credits INTEGER;
BEGIN
    SELECT credits INTO current_credits FROM public.user_profiles WHERE id = user_id;

    -- If unlimited credits, allow operation
    IF current_credits = -1 THEN
        RETURN TRUE;
    END IF;

    -- Check if user has enough credits
    IF current_credits >= credits_to_deduct THEN
        UPDATE public.user_profiles
        SET credits = credits - credits_to_deduct
        WHERE id = user_id;
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
