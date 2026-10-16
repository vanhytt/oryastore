import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/src/lib/supabaseAdmin";

/**
 * GET /api/brand-story
 * Public API - Fetch brand story settings for client-side use
 * Returns: Complete brand story JSON structure
 */
export async function GET() {
  try {
    if (!supabaseAdmin) {
      console.warn("⚠️  Supabase admin not configured");
      return NextResponse.json(null);
    }

    const { data, error } = await supabaseAdmin
      .from("settings")
      .select("key, value, data")
      .eq("key", "brand_story")
      .maybeSingle();

    if (error) {
      console.error("Error fetching brand story:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json(null);
    }

    const brandStory = data.data ?? (data.value ? JSON.parse(data.value) : null);

    return NextResponse.json(brandStory, {
      headers: {
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
      },
    });
  } catch (err) {
    console.error("Error in /api/brand-story:", err);
    return NextResponse.json({ error: "Unable to fetch brand story" }, { status: 500 });
  }
}
