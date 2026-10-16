export interface TopBarSettings {
  announcement: string;
  hotline: string;
  is_active: boolean;
}

export const DEFAULT_TOPBAR_SETTINGS: TopBarSettings = {
  announcement:
    "🌿 Sản phẩm chăm sóc mẹ & bé được tin dùng bởi hàng triệu gia đình Việt",
  hotline: "0398126895",
  is_active: true,
};

export function normalizeTopBarSettings(value: unknown): TopBarSettings {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return { ...DEFAULT_TOPBAR_SETTINGS };
  }

  const settings = value as Record<string, unknown>;
  return {
    announcement:
      typeof settings.announcement === "string"
        ? settings.announcement
        : DEFAULT_TOPBAR_SETTINGS.announcement,
    hotline:
      typeof settings.hotline === "string"
        ? settings.hotline
        : DEFAULT_TOPBAR_SETTINGS.hotline,
    is_active:
      typeof settings.is_active === "boolean"
        ? settings.is_active
        : DEFAULT_TOPBAR_SETTINGS.is_active,
  };
}
