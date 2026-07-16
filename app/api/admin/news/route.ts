import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/src/lib/supabaseAdmin";

// ─── GET /api/admin/news ──────────────────────────────────
export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase admin chưa được cấu hình" }, { status: 503 });
  }

  const { data, error } = await supabaseAdmin
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

// ─── POST /api/admin/news ─────────────────────────────────
export async function POST(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase admin chưa được cấu hình" }, { status: 503 });
  }

  const body = await req.json();
  const today = new Date();
  const dateStr = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1).toString().padStart(2, "0")}/${today.getFullYear()}`;

  const { data, error } = await supabaseAdmin
    .from("news")
    .insert([{
      title: body.title,
      cover_image: body.cover_image ?? null,
      content: body.content ?? null,
      excerpt: body.excerpt ?? null,
      author: body.author ?? null,
      status: body.status ?? "Draft",
      published_date: dateStr,
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

// ─── PUT /api/admin/news ──────────────────────────────────
export async function PUT(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase admin chưa được cấu hình" }, { status: 503 });
  }

  const body = await req.json();
  const { id, ...rest } = body;
  if (!id) return NextResponse.json({ error: "Thiếu id bài viết" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("news")
    .update({
      title: rest.title,
      cover_image: rest.cover_image ?? null,
      content: rest.content ?? null,
      excerpt: rest.excerpt ?? null,
      author: rest.author ?? null,
      status: rest.status ?? "Draft",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// ─── DELETE /api/admin/news ───────────────────────────────
export async function DELETE(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase admin chưa được cấu hình" }, { status: 503 });
  }

  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: "Thiếu id bài viết" }, { status: 400 });

  const { error } = await supabaseAdmin.from("news").delete().eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}