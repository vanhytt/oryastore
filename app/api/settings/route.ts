import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/src/lib/supabaseAdmin";

/**
 * GET /api/settings
 * Public API - Fetch settings for client-side use
 * Returns: { logo: "url", hero_banner: "url", ... }
 */
export async function GET() {
  try {
    if (!supabaseAdmin) {
      console.warn("⚠️  Supabase admin not configured");
      return NextResponse.json({});
    }

    const { data, error } = await supabaseAdmin
      .from("settings")
      .select("key, value, data")
      .in("key", ["logo", "hero_banner", "footer_settings", "brand_story"]);

    if (error) {
      console.error("Error fetching settings:", error);
      return NextResponse.json({}, { status: 500 });
    }

    // Convert to { logo: url, hero_banner: url }
    const settings: Record<string, string | null> = {};
    data?.forEach((row: any) => {
      const url = row.data?.url || row.value;
      settings[row.key] = url;
    });

    return NextResponse.json(settings, {
      headers: {
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
      },
    });
  } catch (err) {
    console.error("Error in /api/settings:", err);
    return NextResponse.json({}, { status: 500 });
  }
}
