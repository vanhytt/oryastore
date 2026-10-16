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
      .in("key", ["logo", "hero_banner", "footer_settings", "brand_story", "topbar_settings"])
      .abortSignal(AbortSignal.timeout(8000));

    if (error) {
      console.error("Error fetching settings:", error);
      return NextResponse.json({}, { status: 500 });
    }

    // Convert to { logo: url, hero_banner: url }
    const settings: Record<string, unknown> = {};
    data?.forEach((row) => {
      if (
        row.key === "footer_settings" ||
        row.key === "brand_story" ||
        row.key === "topbar_settings"
      ) {
        if (row.data && typeof row.data === "object") {
          settings[row.key] = row.data;
        } else if (typeof row.value === "string" && row.value.trim()) {
          settings[row.key] = JSON.parse(row.value);
        } else {
          settings[row.key] = null;
        }
        return;
      }

      const settingData = row.data && typeof row.data === "object"
        ? row.data as Record<string, unknown>
        : null;
      settings[row.key] = settingData?.url ?? row.value;
    });

    return NextResponse.json(settings, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("Error in /api/settings:", err);
    return NextResponse.json({}, { status: 500 });
  }
}
