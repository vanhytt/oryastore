// ============================================================
// ADMIN DATABASE SERVICE
// Quản lý Settings, Certificates, Footer Settings
// ============================================================

import { supabase, isSupabaseConfigured } from "./supabase";
import { normalizeFooterData } from "./footerSettings";

// ─── TYPES ────────────────────────────────────────────────

export interface Setting {
  id: string;
  key: string;
  value: string | null;
  data: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface Certificate {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface FooterSetting {
  id: string;
  key: string;
  value: string | null;
  label: string | null;
  data: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

// ─── SETTINGS ──────────────────────────────────────────────

export async function getSettings(): Promise<Setting[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getSetting(key: string): Promise<Setting | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("key", key)
    .maybeSingle();

  if (error) {
    console.error("Error fetching setting:", error);
    return null;
  }

  return data;
}

export async function updateSetting(
  key: string,
  value: string | null,
  data?: Record<string, unknown>
): Promise<Setting | null> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase is not configured");
  }

  const { data: result, error } = await supabase
    .from("settings")
    .upsert({ key, value, data: data || null }, { onConflict: "key" })
    .select()
    .maybeSingle();

  if (error) {
    const errorMessage = error.message || JSON.stringify(error);
    console.error("Error updating setting:", errorMessage, {
      key,
      value,
      data,
      fullError: error,
    });
    throw new Error(`Failed to update setting '${key}': ${errorMessage}`);
  }

  await revalidateHome();
  return result;
}
// ─── CERTIFICATES HEADER CONFIGURATION ────────────────
export interface CertificatesHeaderConfig {
  badge: string;
  title: string;
  description: string;
  bottomTags: string[];
}

export async function getCertificatesHeader(): Promise<CertificatesHeaderConfig | null> {
  const setting = await getSetting('certificates_header');
  if (!setting?.data || typeof setting.data !== "object") return null;

  const config = setting.data as unknown as Partial<CertificatesHeaderConfig>;
  return {
    badge: typeof config.badge === "string" ? config.badge : "",
    title: typeof config.title === "string" ? config.title : "",
    description: typeof config.description === "string" ? config.description : "",
    bottomTags: Array.isArray(config.bottomTags)
      ? config.bottomTags.filter((tag): tag is string => typeof tag === "string")
      : [],
  };
}

export async function updateCertificatesHeader(
  config: CertificatesHeaderConfig
): Promise<void> {
  await updateSetting('certificates_header', null, config as unknown as Record<string, unknown>);
}



// ─── REVALIDATE HELPER ────────────────────────────
async function revalidateHome() {
  try {
    const response = await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paths: ['/', '/thuong-hieu', '/san-pham', '/products', '/tin-tuc'] })
    });
    if (!response.ok) {
      console.error(`Revalidation failed with status ${response.status}`);
    }
  } catch (err) {
    console.error('Revalidation request failed:', err);
  }
}

// ─── CERTIFICATES ─────────────────────────────────────────

export async function getCertificates(): Promise<Certificate[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching certificates:", error.message || JSON.stringify(error));
    return [];
  }

  return data || [];
}

export async function createCertificate(
  cert: Omit<Certificate, "id" | "created_at" | "updated_at">
): Promise<Certificate> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase is not configured");
  }

  // Ensure we send the correct field names to Supabase
  const payload = {
    title: cert.title,
    description: cert.description || null,
    image_url: cert.image_url || null,
    sort_order: cert.sort_order || 0,
  };

  const { data, error } = await supabase
    .from("certificates")
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error("Error creating certificate:", error.message || JSON.stringify(error));
    throw error;
  }

  // Revalidate homepage after creating certificate
  await revalidateHome();

  return data;
}

export async function updateCertificate(
  id: string,
  cert: Partial<Omit<Certificate, "id" | "created_at" | "updated_at">>
): Promise<Certificate> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase is not configured");
  }

  // Ensure we send only valid fields to Supabase
  const payload: Record<string, any> = {};
  if (cert.title !== undefined) payload.title = cert.title;
  if (cert.description !== undefined) payload.description = cert.description;
  if (cert.image_url !== undefined) payload.image_url = cert.image_url;
  if (cert.sort_order !== undefined) payload.sort_order = cert.sort_order;

  const { data, error } = await supabase
    .from("certificates")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating certificate:", error.message || JSON.stringify(error));
    throw error;
  }

  // Revalidate homepage after updating certificate
  await revalidateHome();

  return data;
}

export async function deleteCertificate(id: string): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase is not configured");
  }

  const { error } = await supabase
    .from("certificates")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting certificate:", error.message || JSON.stringify(error));
    throw error;
  }

  // Revalidate homepage after deleting certificate
  await revalidateHome();
}

// ─── FOOTER SETTINGS ───────────────────────────────────────



// ─── FOOTER SETTINGS CONFIG ────────────────────────
export interface FooterLink {
  id: string;
  label: string;
  url: string;
  content?: string;
}

export interface FooterSettings {
  social: {
    facebook?: string;
    shopee?: string;
    tiktok?: string;
    instagram?: string;
    zalo?: string;
    youtube?: string;
  };
  brand: {
    logo_url?: string;
    description?: string;
    cgmp_text?: string;
    copyright?: string;
  };
  products?: FooterLink[];
  links: {
    info_menu?: FooterLink[];
    policy_menu?: FooterLink[];
  };
  footer_bottom?: {
    disclaimer?: string;
  };
  contact: {
    phone?: string;
    email?: string;
    address?: string;
    working_hours?: string;
    tax_id?: string;
  };
}

export const EMPTY_FOOTER_SETTINGS: FooterSettings = {
  social: {},
  brand: {},
  links: { info_menu: [], policy_menu: [] },
  products: [],
  footer_bottom: {},
  contact: {},
};

export function mapFooterSetting(
  setting: Pick<Setting, "value" | "data"> | null
): FooterSettings {
  if (!setting) return EMPTY_FOOTER_SETTINGS;

  const savedValue = setting.value?.trim() ? setting.value : setting.data;
  const footerData: unknown = typeof savedValue === "string"
    ? JSON.parse(savedValue)
    : savedValue;
  const normalized = normalizeFooterData(footerData);

  const converted: FooterSettings = {
    social: normalized.social,
    brand: {
      logo_url: normalized.brand.logo_url,
      description: normalized.brand.description,
      cgmp_text: normalized.brand.cgmp_text,
      copyright: normalized.footer_bottom.copyright,
    },
    products: normalized.products.map((link, index) => ({
      id: `${link.name}-${index}`,
      label: link.name,
      url: link.link,
    })),
    links: {
      info_menu: normalized.info_links.map((link, index) => ({
        id: `${link.name}-${index}`,
        label: link.name,
        url: link.link,
      })),
      policy_menu: normalized.policy_links.map((link, index) => ({
        id: `${link.name}-${index}`,
        label: link.name,
        url: link.link,
        content: link.content,
      })),
    },
    footer_bottom: {
      disclaimer: normalized.footer_bottom.disclaimer,
    },
    contact: {
      phone: normalized.contact.hotline,
      email: normalized.contact.email,
      address: normalized.contact.address,
      working_hours: normalized.contact.working_hours,
      tax_id: normalized.contact.tax_id,
    },
  };

  return converted;
}

export async function getFooterSettings(): Promise<FooterSettings> {
  try {
    const setting = await getSetting("footer_settings");
    return mapFooterSetting(setting);
  } catch (err) {
    console.error("Error fetching footer settings:", err);
    return EMPTY_FOOTER_SETTINGS;
  }
}

export async function updateFooterSettings(config: FooterSettings): Promise<FooterSettings> {
  try {
    await updateSetting("footer_settings", null, config as unknown as Record<string, unknown>);
    await revalidateHome();
    return config;
  } catch (err) {
    console.error("Error updating footer settings:", err);
    throw err;
  }
}
