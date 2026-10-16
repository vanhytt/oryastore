"use client";

import React, { useState, useEffect } from "react";
import { getSetting, updateSetting } from "@/src/lib/adminDbService";
import { uploadImage } from "@/src/lib/adminApi";
import { Upload, Save, Loader2 } from "lucide-react";

interface SiteSettingsManagerProps {
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export default function SiteSettingsManager({
  onSuccess,
  onError,
}: SiteSettingsManagerProps) {
  const [logoPreview, setLogoPreview] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");
  const [bannerLink, setBannerLink] = useState("");
  const [bannerText, setBannerText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const logo = await getSetting("logo");
      const banner = await getSetting("hero_banner");

      if (logo) {
        const logoData = logo.data as any;
        const url = logoData?.url || logo.value || "";
        setLogoPreview(url);
      }

      if (banner) {
        const bannerData = banner.data as any;
        setBannerUrl(bannerData?.url || banner.value || "");
        setBannerPreview(bannerData?.url || banner.value || "");
        setBannerLink(bannerData?.link || "");
        setBannerText(bannerData?.text || "");
      }
    } catch (err) {
      console.error("Error loading settings:", err);
      onError("Không thể tải cài đặt");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSaving(true);
      const url = await uploadImage(file);
      setLogoPreview(url);
      await updateSetting("logo", url, { url });
      onSuccess("Cập nhật logo thành công!");
    } catch (err) {
      onError("Lỗi upload logo");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSaving(true);
      const url = await uploadImage(file);
      setBannerUrl(url);
      setBannerPreview(url);
      await updateSetting("hero_banner", url, {
        url,
        link: bannerLink,
        text: bannerText,
      });
      onSuccess("Cập nhật banner thành công!");
    } catch (err) {
      onError("Lỗi upload banner");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveBannerSettings = async () => {
    try {
      setSaving(true);
      await updateSetting("hero_banner", bannerUrl, {
        url: bannerUrl,
        link: bannerLink,
        text: bannerText,
      });
      onSuccess("Cập nhật cài đặt banner thành công!");
    } catch (err) {
      onError("Lỗi cập nhật banner");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={24} className="animate-spin text-[#5D8D4A]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8">
      {/* Logo Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quản lý Logo</h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Logo Preview */}
          <div>
            <p className="text-sm font-bold text-gray-600 mb-3 uppercase">
              Xem trước
            </p>
            {logoPreview ? (
              <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center border-2 border-dashed border-gray-300">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="max-h-28 max-w-full object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400">
                Chưa có logo
              </div>
            )}
          </div>

          {/* Logo Upload */}
          <div>
            <p className="text-sm font-bold text-gray-600 mb-3 uppercase">
              Tải lên logo mới
            </p>
            <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-[#5D8D4A]">
              <span className="flex items-center gap-2">
                <Upload size={20} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  Chọn ảnh logo (JPG, PNG)
                </span>
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={saving}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Banner Settings */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Quản lý Banner Chính
        </h3>

        <div className="space-y-6">
          {/* Banner Preview */}
          <div>
            <p className="text-sm font-bold text-gray-600 mb-3 uppercase">
              Xem trước banner
            </p>
            {bannerPreview ? (
              <div className="w-full h-40 bg-gray-100 rounded overflow-hidden border-2 border-gray-300">
                <img
                  src={bannerPreview}
                  alt="Banner preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-40 bg-gray-100 rounded flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400">
                Chưa có banner
              </div>
            )}
          </div>

          {/* Banner Upload */}
          <div>
            <p className="text-sm font-bold text-gray-600 mb-3 uppercase">
              Tải lên banner mới
            </p>
            <label className="flex items-center justify-center w-full px-4 py-8 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-[#5D8D4A]">
              <span className="flex items-center gap-2">
                <Upload size={20} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  Chọn ảnh banner (JPG, PNG)
                </span>
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                disabled={saving}
                className="hidden"
              />
            </label>
          </div>

          {/* Banner Link */}
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-2 uppercase">
              Liên kết chuyển hướng (nếu click banner)
            </label>
            <input
              type="text"
              value={bannerLink}
              onChange={(e) => setBannerLink(e.target.value)}
              placeholder="VD: https://example.com hoặc /san-pham"
              className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50"
            />
          </div>

          {/* Banner Text Overlay */}
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-2 uppercase">
              Văn bản đè trên banner (tùy chọn)
            </label>
            <textarea
              value={bannerText}
              onChange={(e) => setBannerText(e.target.value)}
              placeholder="Nhập văn bản sẽ hiển thị trên banner..."
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50"
            />
          </div>

          {/* Save Button */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleSaveBannerSettings}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 bg-[#5D8D4A] text-white font-bold rounded hover:bg-[#4d753d] transition-colors disabled:opacity-50 cursor-pointer"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              <Save size={16} />
              Lưu cài đặt banner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}