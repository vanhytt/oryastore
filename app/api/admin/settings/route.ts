import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "@/src/lib/supabaseAdmin";

// ─── GET /api/admin/settings ─────────────────────────────
export async function GET() {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase admin chưa được cấu hình" },
      { status: 503 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("settings")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    const errorMessage = error.message || JSON.stringify(error);
    console.error("API Error fetching settings:", errorMessage, { fullError: error });
    return NextResponse.json(
      { error: `Failed to fetch settings: ${errorMessage}` },
      { status: 500 }
    );
  }

  return NextResponse.json(data || []);
}

// ─── PUT /api/admin/settings ─────────────────────────────
export async function PUT(req: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Supabase admin chưa được cấu hình" },
      { status: 503 }
    );
  }

  const body = await req.json();
  const { key, value, data } = body;

  if (!key) {
    return NextResponse.json({ error: "Key is required" }, { status: 400 });
  }

  // Primeiro tenta UPDATE
  let { data: result, error } = await supabaseAdmin
    .from("settings")
    .update({ value, data: data || null, updated_at: new Date().toISOString() })
    .eq("key", key)
    .select()
    .maybeSingle();

  // Se nenhuma linha foi atualizada, tenta INSERT
  if (!result && !error) {
    const { data: insertResult, error: insertError } = await supabaseAdmin
      .from("settings")
      .insert({ key, value, data: data || null })
      .select()
      .maybeSingle();
    
    result = insertResult;
    error = insertError;
  }

  if (error) {
    const errorMessage = error.message || JSON.stringify(error);
    console.error("API Error updating setting:", errorMessage, {
      key,
      value,
      data,
      fullError: error,
    });
    return NextResponse.json(
      { error: `Failed to update setting: ${errorMessage}` },
      { status: 500 }
    );
  }

  // Revalidate homepage to clear cache
  try {
    revalidatePath("/");
    revalidatePath("/admin");
  } catch (revalidateError) {
    console.warn("Revalidation warning:", revalidateError);
    // Continue even if revalidation fails
  }

  // Garante que sempre retorna um objeto válido
  return NextResponse.json({ success: true, data: result || { key, value, data } });
}
