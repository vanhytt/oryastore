import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/src/lib/supabaseAdmin";

function revalidateProductPages() {
  for (const path of ["/", "/products", "/san-pham"]) revalidatePath(path);
}

function textValue(value: unknown): string | null {
  if (typeof value === "string") return value || null;
  if (Array.isArray(value)) {
    const lines = value.filter((item): item is string => typeof item === "string");
    return lines.length > 0 ? lines.join("\n") : null;
  }
  return null;
}

// Mapping từ DB snake_case → app camelCase
function mapProduct(row: Record<string, unknown>) {
  const images = Array.isArray(row.images)
    ? row.images
    : typeof row.image === "string" && row.image
      ? [row.image]
      : [];
  const primaryImage = typeof row.primary_image === "string" && row.primary_image
    ? row.primary_image
    : typeof row.image === "string"
      ? row.image
      : "";

  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: row.price,
    priceValue: row.price_value,
    originalPrice: row.original_price,
    originalPriceValue: row.original_price_value,
    badge: row.badge,
    rating: row.rating,
    reviewsCount: row.reviews_count,
    description: row.description,
    shortDescription: row.short_description,
    image: row.image,
    images,
    primaryImage,
    benefits: row.benefits,
    uses: textValue(row.uses) ?? textValue(row.benefits) ?? "",
    ingredients: textValue(row.ingredients) ?? "",
    usage_instructions: textValue(row.usage_instructions) ?? textValue(row.usage) ?? "",
    usage: row.usage,
    isActive: row.is_active,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ─── GET /api/admin/products ───────────────────────────────
// Lấy toàn bộ sản phẩm (kể cả is_active = false)
export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase admin chưa được cấu hình" },
      { status: 503 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json((data ?? []).map(mapProduct));
}

// ─── POST /api/admin/products ──────────────────────────────
// Tạo sản phẩm mới
export async function POST(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase admin chưa được cấu hình" },
      { status: 503 }
    );
  }

  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("products")
    .insert([
      {
        name: body.name,
        category: body.category,
        price: body.price,
        price_value: body.priceValue ?? 0,
        original_price: body.originalPrice ?? null,
        original_price_value: body.originalPriceValue ?? 0,
        badge: body.badge ?? null,
        rating: body.rating ?? 0,
        reviews_count: body.reviewsCount ?? 0,
        description: body.description ?? null,
        short_description: body.shortDescription ?? null,
        image: body.primaryImage || body.images?.[0] || body.image || null,
        images: Array.isArray(body.images) ? body.images : (body.image ? [body.image] : []),
        primary_image: body.primaryImage || body.images?.[0] || body.image || null,
        benefits: body.benefits ?? [],
        uses: textValue(body.uses),
        ingredients: textValue(body.ingredients),
        usage_instructions: textValue(body.usage_instructions),
        usage: body.usage ?? [],
        is_active: body.isActive ?? true,
        sort_order: body.sortOrder ?? 0,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidateProductPages();
  return NextResponse.json(mapProduct(data), { status: 201 });
}

// ─── PUT /api/admin/products ───────────────────────────────
// Cập nhật sản phẩm theo id (truyền trong body)
export async function PUT(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase admin chưa được cấu hình" },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { id, ...rest } = body;

  if (!id) {
    return NextResponse.json({ error: "Thiếu id sản phẩm" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("products")
    .update({
      name: rest.name,
      category: rest.category,
      price: rest.price,
      price_value: rest.priceValue,
      original_price: rest.originalPrice ?? null,
      original_price_value: rest.originalPriceValue ?? 0,
      badge: rest.badge ?? null,
      rating: rest.rating,
      reviews_count: rest.reviewsCount,
      description: rest.description ?? null,
      short_description: rest.shortDescription ?? null,
      image: rest.primaryImage || rest.images?.[0] || rest.image || null,
      images: Array.isArray(rest.images) ? rest.images : (rest.image ? [rest.image] : []),
      primary_image: rest.primaryImage || rest.images?.[0] || rest.image || null,
      benefits: rest.benefits ?? [],
      uses: textValue(rest.uses),
      ingredients: textValue(rest.ingredients),
      usage_instructions: textValue(rest.usage_instructions),
      usage: rest.usage ?? [],
      is_active: rest.isActive ?? true,
      sort_order: rest.sortOrder ?? 0,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidateProductPages();
  return NextResponse.json(mapProduct(data));
}

// ─── DELETE /api/admin/products ────────────────────────────
// Xóa sản phẩm theo id (truyền trong body)
export async function DELETE(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase admin chưa được cấu hình" },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "Thiếu id sản phẩm" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidateProductPages();
  return NextResponse.json({ success: true });
}