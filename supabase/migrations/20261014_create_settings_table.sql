-- ============================================================
-- MIGRATION: Create settings table
-- Created: 2026-10-14
-- Description: Bảng lưu trữ các cài đặt hệ thống (logo, banner, etc.)
-- ============================================================

-- Create settings table
CREATE TABLE IF NOT EXISTS public.settings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index on key for faster lookups
CREATE INDEX IF NOT EXISTS idx_settings_key ON public.settings(key);

-- Enable Row Level Security
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow all operations for service_role (admin)
CREATE POLICY "Allow all for service_role"
  ON public.settings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policy: Allow read for authenticated users
CREATE POLICY "Allow read for authenticated"
  ON public.settings
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policy: Allow read for anonymous users (public settings)
CREATE POLICY "Allow read for anon"
  ON public.settings
  FOR SELECT
  TO anon
  USING (true);

-- Create trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.settings (key, value, data) VALUES
  ('logo', NULL, NULL),
  ('hero_banner', NULL, NULL),
  ('site_name', 'ORYA Store', NULL),
  ('site_description', 'Cửa hàng trực tuyến', NULL)
ON CONFLICT (key) DO NOTHING;

COMMENT ON TABLE public.settings IS 'Bảng lưu trữ các cài đặt hệ thống';
COMMENT ON COLUMN public.settings.key IS 'Khóa duy nhất của setting';
COMMENT ON COLUMN public.settings.value IS 'Giá trị dạng text';
COMMENT ON COLUMN public.settings.data IS 'Dữ liệu dạng JSON (metadata, URLs, etc.)';
