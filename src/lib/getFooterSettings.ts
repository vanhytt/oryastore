// ============================================================
// GET FOOTER SETTINGS - Server-side Helper
// Fetch dynamic footer data with fallback defaults
// ============================================================

import {
  DEFAULT_FOOTER_SETTINGS,
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
 * Returns default values if not found in database
 * Handles JSON parsing and structure conversion
 */
export async function getFooterSettings(): Promise<FooterSettingsWithPolicies> {
  try {
    if (!supabaseAdmin) {
      return withPolicyContent(DEFAULT_FOOTER_SETTINGS);
    }

    const { data, error } = await supabaseAdmin
      .from("settings")
      .select("value, data")
      .eq("key", "footer_settings")
      .maybeSingle();

    if (error) throw error;
    return withPolicyContent(mapFooterSetting(data));
  } catch (error) {
    console.error("Error fetching footer settings:", error);
    return withPolicyContent(DEFAULT_FOOTER_SETTINGS);
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
