-- Create certificates table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for sort_order
CREATE INDEX IF NOT EXISTS idx_certificates_sort_order ON public.certificates(sort_order);

-- Enable RLS
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow public read (anon + authenticated)
CREATE POLICY "Allow public read certificates"
  ON public.certificates FOR SELECT
  USING (true);

-- RLS Policy: Allow authenticated insert
CREATE POLICY "Allow authenticated insert certificates"
  ON public.certificates FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- RLS Policy: Allow authenticated update own
CREATE POLICY "Allow authenticated update certificates"
  ON public.certificates FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- RLS Policy: Allow authenticated delete own
CREATE POLICY "Allow authenticated delete certificates"
  ON public.certificates FOR DELETE
  USING (auth.role() = 'authenticated');

-- RLS Policy: Allow service role full access (backup)
CREATE POLICY "Allow service role manage certificates"
  ON public.certificates
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
