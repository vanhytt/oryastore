-- TẠO CÁC BẢNG DÀNH CHO HỆ THỐNG QUẢN TRỊ ORYA BABYCARE
-- Copy toàn bộ nội dung bên dưới và dán vào phần SQL Editor trên Supabase Dashboard để chạy.

-- 1. Bảng sản phẩm (products)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- 'mom' hoặc 'baby'
    price TEXT NOT NULL,
    price_value INTEGER DEFAULT 0,
    original_price TEXT,
    original_price_value INTEGER DEFAULT 0,
    badge TEXT,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    description TEXT,
    short_description TEXT,
    image TEXT,
    benefits TEXT[] DEFAULT '{}',
    ingredients TEXT[] DEFAULT '{}',
    usage TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Bảng tin tức (news)
CREATE TABLE IF NOT EXISTS public.news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    cover_image TEXT,
    content TEXT,
    excerpt TEXT,
    author TEXT,
    status TEXT DEFAULT 'Draft', -- 'Draft' hoặc 'Published'
    published_date TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Bảng đối tác phân phối (partners)
CREATE TABLE IF NOT EXISTS public.partners (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT,
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- BẬT CHẾ ĐỘ PHÂN QUYỀN TRUY CẬP CÔNG KHAI (CHỈ DÀNH CHO DEMO ĐỂ DỄ DÀNG CRUD)
-- Bạn có thể bổ sung RLS policy nếu cần bảo mật nghiêm ngặt hơn
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.news DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners DISABLE ROW LEVEL SECURITY;