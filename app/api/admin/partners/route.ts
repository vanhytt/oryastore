import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/src/lib/supabaseAdmin";

// ─── GET /api/admin/partners ──────────────────────────────
export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase admin chưa được cấu hình" }, { status: 503 });
  }

  const { data, error } = await supabaseAdmin
    .from("partners")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

// ─── POST /api/admin/partners ─────────────────────────────
export async function POST(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase admin chưa được cấu hình" }, { status: 503 });
  }

  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("partners")
    .insert([{
      name: body.name,
      logo: body.logo ?? null,
      link: body.link ?? null,
      sort_order: body.sort_order ?? 0,
    }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

// ─── PUT /api/admin/partners ──────────────────────────────
export async function PUT(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase admin chưa được cấu hình" }, { status: 503 });
  }

  const body = await req.json();
  const { id, ...rest } = body;
  if (!id) return NextResponse.json({ error: "Thiếu id đối tác" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("partners")
    .update({
      name: rest.name,
      logo: rest.logo ?? null,
      link: rest.link ?? null,
      sort_order: rest.sort_order ?? 0,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// ─── DELETE /api/admin/partners ───────────────────────────
export async function DELETE(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: "Supabase admin chưa được cấu hình" }, { status: 503 });
  }

  const body = await req.json();
  if (!body.id) return NextResponse.json({ error: "Thiếu id đối tác" }, { status: 400 });

  const { error } = await supabaseAdmin.from("partners").delete().eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}