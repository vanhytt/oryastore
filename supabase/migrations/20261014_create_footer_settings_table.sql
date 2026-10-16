-- ============================================================
-- MIGRATION: Create footer_settings table
-- Created: 2026-10-14
-- Description: Bảng lưu trữ các cài đặt chân trang
-- ============================================================

-- Create footer_settings table
CREATE TABLE IF NOT EXISTS public.footer_settings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  label TEXT,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index on key for faster lookups
CREATE INDEX IF NOT EXISTS idx_footer_settings_key ON public.footer_settings(key);

-- Enable Row Level Security
ALTER TABLE public.footer_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow all operations for service_role (admin)
CREATE POLICY "Allow all for service_role"
  ON public.footer_settings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policy: Allow read for authenticated users
CREATE POLICY "Allow read for authenticated"
  ON public.footer_settings
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policy: Allow read for anonymous users
CREATE POLICY "Allow read for anon"
  ON public.footer_settings
  FOR SELECT
  TO anon
  USING (true);

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_footer_settings_updated_at
  BEFORE UPDATE ON public.footer_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default footer settings
INSERT INTO public.footer_settings (key, value, label) VALUES
  ('company_name', 'ORYA Store', 'Company Name'),
  ('company_address', '', 'Company Address'),
  ('company_phone', '', 'Company Phone'),
  ('company_email', '', 'Company Email')
ON CONFLICT (key) DO NOTHING;

COMMENT ON TABLE public.footer_settings IS 'Bảng lưu trữ các cài đặt chân trang';
COMMENT ON COLUMN public.footer_settings.key IS 'Khóa duy nhất của setting';
COMMENT ON COLUMN public.footer_settings.label IS 'Nhãn hiển thị';
