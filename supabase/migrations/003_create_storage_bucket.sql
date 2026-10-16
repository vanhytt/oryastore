-- Create storage bucket for orya-assets
-- Auto-insert bucket if not exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'orya-assets',
  'orya-assets',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Policy: Public Read Access (anyone can view images)
DROP POLICY IF EXISTS "Public Read Access for orya-assets" ON storage.objects;
CREATE POLICY "Public Read Access for orya-assets"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'orya-assets');

-- Policy: Authenticated Upload (authenticated users can upload)
DROP POLICY IF EXISTS "Authenticated Upload for orya-assets" ON storage.objects;
CREATE POLICY "Authenticated Upload for orya-assets"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'orya-assets' 
    AND auth.role() = 'authenticated'
  );

-- Policy: Authenticated Update (authenticated users can update their uploads)
DROP POLICY IF EXISTS "Authenticated Update for orya-assets" ON storage.objects;
CREATE POLICY "Authenticated Update for orya-assets"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'orya-assets' 
    AND auth.role() = 'authenticated'
  );

-- Policy: Authenticated Delete (authenticated users can delete their uploads)
DROP POLICY IF EXISTS "Authenticated Delete for orya-assets" ON storage.objects;
CREATE POLICY "Authenticated Delete for orya-assets"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'orya-assets' 
    AND auth.role() = 'authenticated'
  );

-- Policy: Service Role Full Access (backup for server-side operations)
DROP POLICY IF EXISTS "Service Role Full Access for orya-assets" ON storage.objects;
CREATE POLICY "Service Role Full Access for orya-assets"
  ON storage.objects
  FOR ALL
  USING (
    bucket_id = 'orya-assets' 
    AND auth.role() = 'service_role'
  );

