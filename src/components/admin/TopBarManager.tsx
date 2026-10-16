"use client";

import { useEffect, useState } from "react";
import { AlertCircle, Loader2, Save } from "lucide-react";
import { adminGetSettings, adminUpdateSetting } from "@/src/lib/adminApi";
import {
  DEFAULT_TOPBAR_SETTINGS,
  normalizeTopBarSettings,
  type TopBarSettings,
} from "@/src/lib/topbarSettings";

interface TopBarManagerProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

interface SettingRow {
  key: string;
  data?: unknown;
  value?: unknown;
}

const inputClassName =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#5D8D4A] focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/20";

function isSettingRow(value: unknown): value is SettingRow {
  return (
    typeof value === "object" &&
    value !== null &&
    "key" in value &&
    typeof value.key === "string"
  );
}

export default function TopBarManager({
  onSuccess,
  onError,
}: TopBarManagerProps) {
  const [settings, setSettings] = useState<TopBarSettings>(
    DEFAULT_TOPBAR_SETTINGS,
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadSettings() {
      try {
        const result: unknown = await adminGetSettings();
        if (!Array.isArray(result)) {
          throw new Error("Dữ liệu cài đặt không hợp lệ");
        }

        const setting = result.find(
          (item): item is SettingRow =>
            isSettingRow(item) && item.key === "topbar_settings",
        );
        const savedValue = setting?.data ?? setting?.value;
        const parsedValue =
          typeof savedValue === "string" && savedValue.trim()
            ? JSON.parse(savedValue)
            : savedValue;

        if (active) {
          setSettings(normalizeTopBarSettings(parsedValue));
          setLoadError("");
        }
      } catch (error) {
        console.error("Unable to load TopBar settings:", error);
        if (active) {
          setLoadError("Không thể tải cấu hình. Hãy tải lại trang trước khi lưu.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadSettings();
    return () => {
      active = false;
    };
  }, []);

  const updateSettings = <K extends keyof TopBarSettings>(
    key: K,
    value: TopBarSettings[K],
  ) => setSettings((current) => ({ ...current, [key]: value }));

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    try {
      await adminUpdateSetting(
        "topbar_settings",
        JSON.stringify(settings),
        settings,
      );
      onSuccess("Đã lưu cài đặt Thanh thông báo.");
    } catch (error) {
      console.error("Unable to save TopBar settings:", error);
      onError(
        error instanceof Error
          ? error.message
          : "Không thể lưu cài đặt Thanh thông báo.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center text-[#5D8D4A]">
        <Loader2 className="animate-spin" size={28} />
        <span className="ml-3 text-sm font-medium">Đang tải cài đặt...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="mx-auto max-w-4xl space-y-6">
      <section className="rounded-xl border border-[#5D8D4A]/15 bg-[#EFFFE9] p-5">
        <h3 className="text-xl font-bold text-[#315A29]">
          Quản lý Thanh thông báo
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Cập nhật nội dung hiển thị ở đầu trang trên website.
        </p>
      </section>

      {loadError && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle size={18} />
          {loadError}
        </div>
      )}

      <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <label className="flex cursor-pointer items-center justify-between gap-4">
          <span>
            <span className="block font-semibold text-gray-800">
              Hiển thị Thanh thông báo
            </span>
            <span className="mt-1 block text-sm text-gray-500">
              Tắt để ẩn thanh này khỏi toàn bộ trang public.
            </span>
          </span>
          <input
            type="checkbox"
            checked={settings.is_active}
            onChange={(event) => updateSettings("is_active", event.target.checked)}
            className="h-5 w-5 accent-[#5D8D4A]"
          />
        </label>

        <div>
          <label
            htmlFor="topbar-announcement"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Dòng thông báo / khẩu hiệu
          </label>
          <input
            id="topbar-announcement"
            type="text"
            value={settings.announcement}
            onChange={(event) =>
              updateSettings("announcement", event.target.value)
            }
            className={inputClassName}
            placeholder="Nhập thông điệp hiển thị trên thanh thông báo"
          />
        </div>

        <div>
          <label
            htmlFor="topbar-hotline"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Số điện thoại Hotline
          </label>
          <input
            id="topbar-hotline"
            type="tel"
            value={settings.hotline}
            onChange={(event) => updateSettings("hotline", event.target.value)}
            className={inputClassName}
            placeholder="0398126895"
          />
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving || Boolean(loadError)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#5D8D4A] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#4b753b] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {saving ? "Đang lưu..." : "Lưu cài đặt"}
        </button>
      </div>
    </form>
  );
}
