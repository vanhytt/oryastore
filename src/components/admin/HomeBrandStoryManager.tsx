"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, Loader2, Save } from "lucide-react";
import {
  adminGetSettings,
  adminUpdateSetting,
} from "@/src/lib/adminApi";
import {
  DEFAULT_HOME_BRAND_STORY,
  normalizeHomeBrandStory,
  type HomeBrandStory,
} from "@/src/lib/homeBrandStory";
import ImageUpload from "./ImageUpload";

interface HomeBrandStoryManagerProps {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const inputClassName =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#5D8D4A] focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/20";

export default function HomeBrandStoryManager({
  onSuccess,
  onError,
}: HomeBrandStoryManagerProps) {
  const [story, setStory] = useState<HomeBrandStory>(DEFAULT_HOME_BRAND_STORY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadStory() {
      try {
        const result: unknown = await adminGetSettings();
        if (!Array.isArray(result)) {
          throw new Error("Dữ liệu cài đặt không hợp lệ");
        }

        const setting = result.find(
          (item): item is { key: string; data?: unknown; value?: unknown } =>
            typeof item === "object" &&
            item !== null &&
            "key" in item &&
            item.key === "home_brand_story",
        );
        const savedValue = setting?.data ?? setting?.value;
        const parsedValue =
          typeof savedValue === "string" ? JSON.parse(savedValue) : savedValue;

        if (active) {
          setStory(normalizeHomeBrandStory(parsedValue));
          setLoadError("");
        }
      } catch (error) {
        console.error("Unable to load home brand story:", error);
        if (active) {
          setLoadError("Không thể tải cấu hình. Hãy tải lại trang trước khi lưu.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadStory();
    return () => {
      active = false;
    };
  }, []);

  const updateStory = <K extends keyof HomeBrandStory>(
    key: K,
    value: HomeBrandStory[K],
  ) => {
    setStory((current) => ({ ...current, [key]: value }));
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setSaving(true);
      await adminUpdateSetting(
        "home_brand_story",
        JSON.stringify(story),
        { ...story },
      );
      onSuccess("Đã lưu nội dung câu chuyện thương hiệu Trang chủ.");
    } catch (error) {
      console.error("Unable to save home brand story:", error);
      onError(
        error instanceof Error
          ? error.message
          : "Không thể lưu nội dung câu chuyện thương hiệu Trang chủ.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center text-[#5D8D4A]">
        <Loader2 className="animate-spin" size={28} />
        <span className="ml-3 text-sm font-medium">Đang tải nội dung...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="mx-auto max-w-5xl space-y-6">
      <div className="rounded-xl border border-[#5D8D4A]/15 bg-[#EFFFE9] p-5">
        <h3 className="text-xl font-bold text-[#315A29]">
          Câu chuyện thương hiệu Trang chủ
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Quản lý ảnh, nội dung giới thiệu, chỉ số nổi bật và các tính năng trên
          trang chủ.
        </p>
      </div>

      {loadError && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle size={18} />
          {loadError}
        </div>
      )}

      <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h4 className="font-bold text-gray-800">Ảnh đại diện</h4>
        <ImageUpload
          value={story.image_url}
          onChange={(imageUrl) => updateStory("image_url", imageUrl)}
          label="Ảnh câu chuyện thương hiệu"
        />
      </section>

      <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h4 className="font-bold text-gray-800">Thông tin chung</h4>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Tiêu đề chính
          </label>
          <input
            value={story.title}
            onChange={(event) => updateStory("title", event.target.value)}
            className={inputClassName}
            placeholder="Orya — Nâng niu làn da mẹ & bé..."
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Đoạn mô tả
          </label>
          <textarea
            rows={4}
            value={story.description}
            onChange={(event) => updateStory("description", event.target.value)}
            className={inputClassName}
            placeholder="Nhập đoạn giới thiệu thương hiệu..."
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div>
          <h4 className="font-bold text-gray-800">4 ô chỉ số</h4>
          <p className="mt-1 text-xs text-gray-500">
            Các chỉ số này hiển thị trên ảnh ở trang chủ.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {story.stats.map((stat, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3"
            >
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Giá trị {index + 1}
                </label>
                <input
                  value={stat.value}
                  onChange={(event) => {
                    const stats = [...story.stats];
                    stats[index] = { ...stat, value: event.target.value };
                    updateStory("stats", stats);
                  }}
                  className={inputClassName}
                  placeholder="1M+"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Nhãn hiển thị
                </label>
                <input
                  value={stat.label}
                  onChange={(event) => {
                    const stats = [...story.stats];
                    stats[index] = { ...stat, label: event.target.value };
                    updateStory("stats", stats);
                  }}
                  className={inputClassName}
                  placeholder="Mẹ tin dùng"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div>
          <h4 className="font-bold text-gray-800">4 tính năng nổi bật</h4>
          <p className="mt-1 text-xs text-gray-500">
            Tên biểu tượng: heart, shield-check, award hoặc circle-check.
          </p>
        </div>
        <div className="space-y-4">
          {story.features.map((feature, index) => (
            <div
              key={index}
              className="grid grid-cols-1 gap-3 rounded-lg bg-gray-50 p-4 sm:grid-cols-2"
            >
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Tên tính năng {index + 1}
                </label>
                <input
                  value={feature.title}
                  onChange={(event) => {
                    const features = [...story.features];
                    features[index] = { ...feature, title: event.target.value };
                    updateStory("features", features);
                  }}
                  className={inputClassName}
                  placeholder="Ra đời từ tình yêu thương"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Biểu tượng
                </label>
                <select
                  value={feature.icon}
                  onChange={(event) => {
                    const features = [...story.features];
                    features[index] = { ...feature, icon: event.target.value };
                    updateStory("features", features);
                  }}
                  className={inputClassName}
                >
                  <option value="heart">Trái tim</option>
                  <option value="shield-check">Khiên an toàn</option>
                  <option value="award">Chứng nhận</option>
                  <option value="circle-check">Dấu xác nhận</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Mô tả ngắn
                </label>
                <textarea
                  rows={2}
                  value={feature.description}
                  onChange={(event) => {
                    const features = [...story.features];
                    features[index] = {
                      ...feature,
                      description: event.target.value,
                    };
                    updateStory("features", features);
                  }}
                  className={inputClassName}
                  placeholder="Mô tả ngắn về tính năng..."
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h4 className="font-bold text-gray-800">Cấu hình nút bấm</h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Chữ nút
            </label>
            <input
              value={story.cta_text}
              onChange={(event) => updateStory("cta_text", event.target.value)}
              className={inputClassName}
              placeholder="Tìm hiểu thêm về Orya"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Link chuyển hướng
            </label>
            <input
              value={story.cta_link}
              onChange={(event) => updateStory("cta_link", event.target.value)}
              className={inputClassName}
              placeholder="/thuong-hieu"
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end border-t border-gray-200 pt-5">
        <button
          type="submit"
          disabled={saving || Boolean(loadError)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#5D8D4A] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#4d753d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </form>
  );
}
