-- ============================================================
-- MIGRATION: 001 - Create settings table
-- Created: 2026-10-14
-- Description: Core settings table for site configuration
-- ============================================================

-- Create settings table if not exists
CREATE TABLE IF NOT EXISTS public.settings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_settings_key ON public.settings(key);
CREATE INDEX IF NOT EXISTS idx_settings_updated_at ON public.settings(updated_at DESC);

-- Enable Row Level Security
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow all for service_role" ON public.settings;
DROP POLICY IF EXISTS "Allow read for authenticated" ON public.settings;
DROP POLICY IF EXISTS "Allow read for anon" ON public.settings;

-- RLS Policy 1: Service role (admin) - full access
CREATE POLICY "Allow all for service_role"
  ON public.settings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policy 2: Authenticated users - read only
CREATE POLICY "Allow read for authenticated"
  ON public.settings
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policy 3: Anonymous users - read only
CREATE POLICY "Allow read for anon"
  ON public.settings
  FOR SELECT
  TO anon
  USING (true);

-- Create or replace trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS update_settings_updated_at ON public.settings;
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings (if not exists)
INSERT INTO public.settings (key, value, data) VALUES
  ('logo', NULL, NULL),
  ('hero_banner', NULL, NULL),
  ('site_name', 'ORYA Store', NULL),
  ('site_description', 'Cửa hàng trực tuyến ORYA', NULL)
ON CONFLICT (key) DO NOTHING;

-- Add comments
COMMENT ON TABLE public.settings IS 'Core settings table for site configuration';
COMMENT ON COLUMN public.settings.key IS 'Unique key identifier (e.g., logo, hero_banner)';
COMMENT ON COLUMN public.settings.value IS 'Text value of the setting';
COMMENT ON COLUMN public.settings.data IS 'JSON metadata (URLs, links, etc.)';
COMMENT ON COLUMN public.settings.updated_at IS 'Auto-updated timestamp';

-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================
-- Run these to verify the migration was successful:
-- SELECT * FROM public.settings;
-- SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename = 'settings';
-- SELECT schemaname, tablename, policyname FROM pg_policies WHERE tablename = 'settings';
-- ============================================================
