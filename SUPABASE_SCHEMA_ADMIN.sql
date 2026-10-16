-- ============================================================
-- ORYA BABYCARE – ADMIN FEATURES DATABASE SCHEMA (EXTENSION)
-- Chạy file này SAU khi chạy SUPABASE_SCHEMA.sql
-- ============================================================

-- ============================================================
-- BẢNG 1: SETTINGS (Logo, Banner, Brand Story)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.settings (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key             TEXT NOT NULL UNIQUE,
    value           TEXT,
    data            JSONB,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- BẢNG 2: CERTIFICATES (Chứng nhận chất lượng)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.certificates (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            TEXT NOT NULL,
    description     TEXT,
    image_url       TEXT,
    sort_order      INTEGER DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- BẢNG 3: FOOTER SETTINGS (Cài đặt chân trang)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.footer_settings (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key             TEXT NOT NULL UNIQUE,
    value           TEXT,
    label           TEXT,
    data            JSONB,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- BƯỚC 2: TỰ ĐỘNG CẬP NHẬT TRƯỜNG updated_at
-- ============================================================

CREATE TRIGGER on_settings_updated
  BEFORE UPDATE ON public.settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_certificates_updated
  BEFORE UPDATE ON public.certificates
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_footer_settings_updated
  BEFORE UPDATE ON public.footer_settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================
-- BƯỚC 3: BẬT ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "settings_public_read" ON public.settings;
DROP POLICY IF EXISTS "certificates_public_read" ON public.certificates;
DROP POLICY IF EXISTS "footer_settings_public_read" ON public.footer_settings;

CREATE POLICY "settings_public_read"
  ON public.settings FOR SELECT
  USING (true);

CREATE POLICY "certificates_public_read"
  ON public.certificates FOR SELECT
  USING (true);

CREATE POLICY "footer_settings_public_read"
  ON public.footer_settings FOR SELECT
  USING (true);

-- Admin write policies
CREATE POLICY "settings_admin_write"
  ON public.settings
  USING (true)
  WITH CHECK (true);

CREATE POLICY "certificates_admin_write"
  ON public.certificates
  USING (true)
  WITH CHECK (true);

CREATE POLICY "footer_settings_admin_write"
  ON public.footer_settings
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- BƯỚC 4: DỮ LIỆU MẪU BAN ĐẦU
-- ============================================================

-- Settings mẫu
INSERT INTO public.settings (key, value, data) VALUES
('logo', '/logo.png', '{"url": "/logo.png"}'),
('hero_banner', '/banner.jpg', '{"url": "/banner.jpg", "link": "", "text": ""}'),
('brand_story_title', 'Orya — Nâng niu làn da mẹ & bé từ thiên nhiên', NULL),
('brand_story_description', 'Được nghiên cứu và phát triển bởi đội ngũ chuyên gia dược học hàng đầu tại CVI Pharma...', NULL),
('brand_story_image', '/about.jpg', '{"url": "/about.jpg"}')
ON CONFLICT (key) DO NOTHING;

-- Certificates mẫu
INSERT INTO public.certificates (name, description, sort_order) VALUES
('Vegan Certified', 'Không thử nghiệm trên động vật, 100% thành phần từ thực vật và khoáng chất tự nhiên.', 1),
('CGMP-ASEAN', 'Sản xuất tại nhà máy đạt chuẩn CGMP-ASEAN, đảm bảo chất lượng và vệ sinh nghiêm ngặt.', 2),
('SLS Free', 'Không chứa Sodium Lauryl Sulfate, an toàn cho da nhạy cảm của mẹ bầu và trẻ sơ sinh.', 3)
ON CONFLICT DO NOTHING;

-- Footer Settings mẫu
INSERT INTO public.footer_settings (key, value, label) VALUES
('social_facebook', 'https://www.facebook.com/share/1Em6X2dKY5/?mibextid=wwXIfr', 'Facebook'),
('social_shopee', 'https://shopee.vn/orya_vegar', 'Shopee'),
('social_tiktok', 'https://www.tiktok.com/@orya.official', 'TikTok'),
('contact_hotline', '0398126895', 'Hotline'),
('contact_email', 'ecommerce.orya@gmail.com', 'Email'),
('contact_address', '154 Hoàng Văn Thái, Phường Phương Liệt, Hà Nội', 'Địa chỉ')
ON CONFLICT (key) DO NOTHING;
