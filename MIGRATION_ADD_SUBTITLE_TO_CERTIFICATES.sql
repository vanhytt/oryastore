-- ============================================================
-- MIGRATION: Add subtitle field to certificates table
-- Execute this in Supabase SQL Editor
-- ============================================================

-- Add subtitle column to certificates table
ALTER TABLE public.certificates 
ADD COLUMN IF NOT EXISTS subtitle TEXT NULL;

-- Verify the migration
-- SELECT * FROM public.certificates LIMIT 1;
