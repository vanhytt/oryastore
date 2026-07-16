-- ============================================================
-- ORYA BABYCARE – DATABASE SCHEMA
-- Chạy toàn bộ file này trong Supabase Dashboard > SQL Editor
-- ============================================================
-- HƯỚNG DẪN IMPORT VÀO SUPABASE:
-- 1. Đăng nhập Supabase Dashboard (https://supabase.com/dashboard)
-- 2. Chọn project của bạn
-- 3. Vào menu bên trái: SQL Editor
-- 4. Click nút "+ New query"
-- 5. Copy TOÀN BỘ nội dung file này, paste vào editor
-- 6. Click nút "Run" (hoặc nhấn Ctrl+Enter)
-- 7. Kiểm tra lại trong tab "Table Editor" để xác nhận các bảng đã tạo
-- ============================================================

-- ============================================================
-- BƯỚC 1: TẠO CÁC BẢNG
-- ============================================================

-- 1.1 Bảng sản phẩm (products)
CREATE TABLE IF NOT EXISTS public.products (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            TEXT NOT NULL,
    category        TEXT NOT NULL CHECK (category IN ('mom', 'baby')),
    price           TEXT NOT NULL,
    price_value     INTEGER NOT NULL DEFAULT 0,
    original_price  TEXT,
    original_price_value INTEGER DEFAULT 0,
    badge           TEXT,
    rating          NUMERIC(3, 2) NOT NULL DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
    reviews_count   INTEGER NOT NULL DEFAULT 0,
    description     TEXT,
    short_description TEXT,
    image           TEXT,                     -- URL ảnh từ Supabase Storage
    benefits        TEXT[]  DEFAULT '{}',
    ingredients     TEXT[]  DEFAULT '{}',
    usage           TEXT[]  DEFAULT '{}',
    is_active       BOOLEAN NOT NULL DEFAULT true,
    sort_order      INTEGER DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1.2 Bảng tin tức (news)
CREATE TABLE IF NOT EXISTS public.news (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title           TEXT NOT NULL,
    cover_image     TEXT,                     -- URL ảnh bìa từ Supabase Storage
    content         TEXT,
    excerpt         TEXT,
    author          TEXT,
    status          TEXT NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft', 'Published')),
    published_date  TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 1.3 Bảng đối tác phân phối (partners)
CREATE TABLE IF NOT EXISTS public.partners (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            TEXT NOT NULL,
    logo            TEXT,                     -- URL logo từ Supabase Storage
    link            TEXT,
    sort_order      INTEGER DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- BƯỚC 2: TỰ ĐỘNG CẬP NHẬT TRƯỜNG updated_at
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_products_updated
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_news_updated
  BEFORE UPDATE ON public.news
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER on_partners_updated
  BEFORE UPDATE ON public.partners
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================
-- BƯỚC 3: BẬT ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- BƯỚC 4: CẤU HÌNH CHÍNH SÁCH TRUY CẬP (POLICIES)
-- ============================================================
-- Quy tắc:
--   • Tất cả mọi người (kể cả khách chưa đăng nhập - anon) được ĐỌC dữ liệu.
--   • Chỉ Dịch vụ nội bộ (service_role – dùng qua Next.js API Route) mới được THÊM/SỬA/XÓA.
--   • Tài khoản đã đăng nhập qua Supabase Auth (authenticated) cũng được phép THÊM/SỬA/XÓA.
-- ============================================================

-- === PRODUCTS ===

DROP POLICY IF EXISTS "products_select_public"  ON public.products;
DROP POLICY IF EXISTS "products_insert_admin"   ON public.products;
DROP POLICY IF EXISTS "products_update_admin"   ON public.products;
DROP POLICY IF EXISTS "products_delete_admin"   ON public.products;

-- Ai cũng được đọc sản phẩm đang hoạt động
CREATE POLICY "products_select_public"
  ON public.products FOR SELECT
  USING (true);

-- Chỉ authenticated (admin đăng nhập) hoặc service_role mới được thêm mới
CREATE POLICY "products_insert_admin"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "products_update_admin"
  ON public.products FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "products_delete_admin"
  ON public.products FOR DELETE
  TO authenticated
  USING (true);

-- === NEWS ===

DROP POLICY IF EXISTS "news_select_public"  ON public.news;
DROP POLICY IF EXISTS "news_insert_admin"   ON public.news;
DROP POLICY IF EXISTS "news_update_admin"   ON public.news;
DROP POLICY IF EXISTS "news_delete_admin"   ON public.news;

CREATE POLICY "news_select_public"
  ON public.news FOR SELECT
  USING (true);

CREATE POLICY "news_insert_admin"
  ON public.news FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "news_update_admin"
  ON public.news FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "news_delete_admin"
  ON public.news FOR DELETE
  TO authenticated
  USING (true);

-- === PARTNERS ===

DROP POLICY IF EXISTS "partners_select_public"  ON public.partners;
DROP POLICY IF EXISTS "partners_insert_admin"   ON public.partners;
DROP POLICY IF EXISTS "partners_update_admin"   ON public.partners;
DROP POLICY IF EXISTS "partners_delete_admin"   ON public.partners;

CREATE POLICY "partners_select_public"
  ON public.partners FOR SELECT
  USING (true);

CREATE POLICY "partners_insert_admin"
  ON public.partners FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "partners_update_admin"
  ON public.partners FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "partners_delete_admin"
  ON public.partners FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- BƯỚC 5: TẠO SUPABASE STORAGE BUCKET
-- ============================================================
-- Tên bucket: orya-media
-- Trạng thái: Public (cho phép đọc ảnh không cần token)
--
-- Policy cho Storage:
--   - Ai cũng được đọc (GET) ảnh (public bucket)
--   - Chỉ authenticated / service_role được tải ảnh lên (POST/PUT/DELETE)

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'orya-media',
  'orya-media',
  true,                   -- bucket công khai
  5242880,                -- giới hạn 5 MB / file
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies
DROP POLICY IF EXISTS "storage_public_read"   ON storage.objects;
DROP POLICY IF EXISTS "storage_admin_insert"   ON storage.objects;
DROP POLICY IF EXISTS "storage_admin_update"   ON storage.objects;
DROP POLICY IF EXISTS "storage_admin_delete"   ON storage.objects;

CREATE POLICY "storage_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'orya-media');

CREATE POLICY "storage_admin_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'orya-media');

CREATE POLICY "storage_admin_update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'orya-media');

CREATE POLICY "storage_admin_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'orya-media');

-- ============================================================
-- BƯỚC 6: DỮ LIỆU MẪU BAN ĐẦU (TÙY CHỌN)
-- ============================================================
-- Bạn có thể bỏ qua phần này nếu muốn nhập dữ liệu thật
-- trực tiếp từ trang Admin.

INSERT INTO public.products (name, category, price, price_value, original_price, original_price_value, badge, rating, reviews_count, short_description, description, benefits, ingredients, usage)
VALUES
(
  'Dầu rạn da Orya cho mẹ bầu', 'mom',
  '350.000đ', 350000, '450.000đ', 450000,
  'Bestseller', 4.9, 120,
  'Dầu massage ngăn ngừa và giảm rạn da cho mẹ bầu. Chiết xuất 100% từ thảo dược thiên nhiên.',
  'Dầu massage chuyên biệt ngăn ngừa và làm mờ các vết rạn da trong suốt thai kỳ và sau sinh. Chiết xuất 100% từ thảo dược thiên nhiên, an toàn tuyệt đối cho mẹ và bé.',
  ARRAY['Ngăn ngừa tối đa sự hình thành của các vết rạn nứt da mới.', 'Hỗ trợ làm mờ các vết rạn nứt cũ và giúp đều màu da.'],
  ARRAY['Dầu Hạnh Nhân Ngọt: Dưỡng ẩm sâu, tăng sản xuất collagen tự nhiên.', 'Dầu Jojoba Hữu Cơ: Cân bằng tuyến bã nhờn, thấm cực nhanh.'],
  ARRAY['Làm sạch và lau khô vùng da cần massage.', 'Thoa đều và massage nhẹ nhàng 5-10 phút.']
),
(
  'Kem bôi ngực Orya sau sinh', 'mom',
  '280.000đ', 280000, '380.000đ', 380000,
  'Mới', 4.8, 85,
  'Kem dưỡng da ngực chuyên biệt sau sinh, giúp phục hồi và săn chắc da.',
  'Kem dưỡng da vùng ngực chuyên biệt dành cho phụ nữ sau sinh. Giúp dưỡng ẩm, làm dịu da ngực khô ráp, phục hồi và cải thiện độ săn chắc.',
  ARRAY['Làm dịu nhanh tình trạng đau rát', 'Cải thiện độ đàn hồi săn chắc'],
  ARRAY['Mỡ cừu Lanolin', 'Bơ hạt mỡ', 'Cúc La Mã'],
  ARRAY['Thoa đều núm vú và bầu ngực sau cữ bú']
),
(
  'Nước tắm gội Orya Kids', 'baby',
  '195.000đ', 195000, '250.000đ', 250000,
  'Vegan', 4.9, 95,
  'Nước tắm gội 2 trong 1 dành cho trẻ sơ sinh và trẻ nhỏ. pH cân bằng 5.5, không SLS.',
  'Nước tắm gội 2 trong 1 dành cho trẻ sơ sinh và trẻ nhỏ. pH cân bằng 5.5, không SLS, không cồn, không gây kích ứng.',
  ARRAY['Làm sạch nhẹ nhàng, dịu lành cho da bé', 'Không gây cay mắt'],
  ARRAY['Nha Đam Hữu Cơ', 'Chiết xuất Yến Mạch'],
  ARRAY['Thoa lên tóc và da bé, massage nhẹ nhàng, sau đó tráng sạch bằng nước ấm.']
),
(
  'Dưỡng thể Orya Baby', 'baby',
  '220.000đ', 220000, NULL, 0,
  NULL, 4.7, 42,
  'Kem dưỡng ẩm toàn thân cho bé, giúp da mềm mại mịn màng suốt cả ngày.',
  'Kem dưỡng ẩm toàn thân cho bé, giúp da mềm mại mịn màng suốt cả ngày. Công thức nhẹ nhàng, thẩm thấu nhanh.',
  ARRAY['Dưỡng ẩm 24h cho làn da bé', 'Không nhờn rít, thấm nhanh'],
  ARRAY['Bơ Shea', 'Dầu Hướng Dương'],
  ARRAY['Thoa đều lên toàn thân sau khi tắm.']
);

-- ============================================================
-- HOÀN THÀNH! Kiểm tra lại trong Table Editor của Supabase.
-- ============================================================