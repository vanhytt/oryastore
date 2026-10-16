-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for sort_order
CREATE INDEX IF NOT EXISTS idx_certificates_sort_order ON certificates(sort_order);

-- Enable RLS
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow authenticated users to read
CREATE POLICY "Allow authenticated users to read certificates"
  ON certificates FOR SELECT
  USING (true);

-- RLS Policy: Allow service role to manage certificates
CREATE POLICY "Allow service role to manage certificates"
  ON certificates
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
