-- ============================================================
-- MIGRATION: Create certificates table
-- Created: 2026-10-14
-- Description: Bảng lưu trữ các chứng chỉ/giấy phép
-- ============================================================

-- Create certificates table
CREATE TABLE IF NOT EXISTS public.certificates (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index on sort_order for faster lookups
CREATE INDEX IF NOT EXISTS idx_certificates_sort_order ON public.certificates(sort_order);

-- Enable Row Level Security
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow all operations for service_role (admin)
CREATE POLICY "Allow all for service_role"
  ON public.certificates
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policy: Allow read for authenticated users
CREATE POLICY "Allow read for authenticated"
  ON public.certificates
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policy: Allow read for anonymous users
CREATE POLICY "Allow read for anon"
  ON public.certificates
  FOR SELECT
  TO anon
  USING (true);

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_certificates_updated_at
  BEFORE UPDATE ON public.certificates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

COMMENT ON TABLE public.certificates IS 'Bảng lưu trữ các chứng chỉ/giấy phép';
COMMENT ON COLUMN public.certificates.sort_order IS 'Thứ tự hiển thị';
