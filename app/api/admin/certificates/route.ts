import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/src/lib/supabaseAdmin";

function revalidateCertificatePages() {
  revalidatePath("/");
}

// ─── GET /api/admin/certificates ────────────────────────
export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase admin chưa được cấu hình" },
      { status: 503 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("certificates")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

// ─── POST /api/admin/certificates ───────────────────────
export async function POST(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase admin chưa được cấu hình" },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { title, description, image_url, sort_order } = body;

  if (!title) {
    return NextResponse.json(
      { error: "Tiêu đề chứng nhận là bắt buộc" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("certificates")
    .insert([{ title, description, image_url, sort_order: sort_order || 0 }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidateCertificatePages();
  return NextResponse.json(data);
}

// ─── PUT /api/admin/certificates ────────────────────────
export async function PUT(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase admin chưa được cấu hình" },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { id, title, description, image_url, sort_order } = body;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("certificates")
    .update({ title, description, image_url, sort_order })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidateCertificatePages();
  return NextResponse.json(data);
}

// ─── DELETE /api/admin/certificates ─────────────────────
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
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("certificates")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidateCertificatePages();
  return NextResponse.json({ success: true });
}
