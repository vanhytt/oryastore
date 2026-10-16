import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/src/lib/supabaseAdmin";

// ─── GET /api/admin/footer-settings ─────────────────────
export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase admin chưa được cấu hình" },
      { status: 503 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("footer_settings")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

// ─── PUT /api/admin/footer-settings ─────────────────────
export async function PUT(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase admin chưa được cấu hình" },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { key, value, label } = body;

  if (!key) {
    return NextResponse.json({ error: "Key is required" }, { status: 400 });
  }

  const { data: result, error } = await supabaseAdmin
    .from("footer_settings")
    .upsert({ key, value, label: label || null })
    .select()
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(result);
}
