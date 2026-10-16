-- Migration: Ensure certificates table has subtitle column
-- Execute this in Supabase SQL Editor if you haven't already

ALTER TABLE public.certificates 
ADD COLUMN IF NOT EXISTS subtitle TEXT NULL;

-- Verify the column exists
-- SELECT column_name FROM information_schema.columns 
-- WHERE table_name = 'certificates' AND column_name = 'subtitle';
