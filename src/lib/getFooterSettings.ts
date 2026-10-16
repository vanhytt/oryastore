// ============================================================
// GET FOOTER SETTINGS - Server-side Helper
// Fetch dynamic footer data from Supabase
// ============================================================

import {
  type FooterSettings,
  mapFooterSetting,
} from "./adminDbService";
import { supabaseAdmin } from "./supabaseAdmin";

interface PolicyItem {
  id: string;
  label: string;
  url: string;
  content?: string;
}

type FooterSettingsWithPolicies = Omit<FooterSettings, "links"> & {
  links: Omit<FooterSettings["links"], "policy_menu"> & {
    policy_menu?: PolicyItem[];
  };
};

/**
 * Server-side function to get footer settings
 * Returns null when no saved settings exist
 * Handles JSON parsing and structure conversion
 */
export async function getFooterSettings(): Promise<FooterSettingsWithPolicies | null> {
  try {
    if (!supabaseAdmin) {
      return null;
    }

    const { data, error } = await supabaseAdmin
      .from("settings")
      .select("value, data")
      .eq("key", "footer_settings")
      .abortSignal(AbortSignal.timeout(8000))
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;
    return withPolicyContent(mapFooterSetting(data));
  } catch (error) {
    console.error("Error fetching footer settings:", error);
    return null;
  }
}

function withPolicyContent(settings: FooterSettings): FooterSettingsWithPolicies {
  return {
    ...settings,
    links: {
      ...settings.links,
      policy_menu: settings.links.policy_menu?.map((policy) => ({
        ...policy,
        content: policy.content || "",
      })),
    },
  };
}
