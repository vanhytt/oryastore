"use client";
import React, { useState, useEffect } from "react";
import { Save, Loader2, Check, AlertCircle } from "lucide-react";
import { getSetting, updateSetting } from "@/src/lib/adminDbService";
import type { BrandStoryData } from "@/src/lib/getBrandStory";
import HeroBannerSection from "./sections/HeroBannerSection";
import GuidelinesSection from "./sections/GuidelinesSection";
import TimelineSection from "./sections/TimelineSection";
import QuoteSection from "./sections/QuoteSection";
import CommitmentsSection from "./sections/CommitmentsSection";
import FactorySection from "./sections/FactorySection";
import CTABannerSection from "./sections/CTABannerSection";

interface BrandStoryManagerProps {
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

const DEFAULT: BrandStoryData = {
  hero: { badge: "CÂU CHUYỆN", mainHeading: "Khởi nguồn từ tình mẫu tử", description1: "", description2: "", ctaButton1: { label: "Khám phá", link: "/san-pham" }, ctaButton2: { label: "Liên hệ", link: "#contact" }, mainImage: "/placeholder.jpg", badgeImage: { title: "An toàn", subtitle: "Thiên nhiên", image: "/placeholder.jpg" } },
  guidelines: { title: "Kim chỉ nam", mission: { title: "Sứ mệnh", description: "" }, vision: { title: "Tầm nhìn", description: "" }, coreValues: [{ icon: "heart", title: "", description: "" }] },
  timeline: [{ period: "2020", title: "", description: "" }],
  quote: { text: "", author: "", position: "", signature: "" },
  commitmentsHeader: { badge: 'CAM KẾT VÀNG TỪ ORYA', title: 'Cam kết "5 KHÔNG" tuyệt đối', description: '' },
  commitments: [{ icon: "check", number: "01", title: "", description: "" }],
  factory: { title: "", description: "", highlights: [{ title: "", description: "" }], image: "/placeholder.jpg" },
  ctaBanner: { title: "", subtitle: "", buttonLabel: "", buttonLink: "" },
};

export default function BrandStoryManager({ onSuccess, onError }: BrandStoryManagerProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState(DEFAULT);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const setting = await getSetting("brand_story");
      if (setting?.data) setData(setting.data as unknown as BrandStoryData);
    } catch (error) {
      console.error("Load error:", error);
      onError("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateSetting(
        "brand_story",
        JSON.stringify(data),
        data as unknown as Record<string, unknown>,
      );
      
      // Revalidate pages to show new data immediately
      try {
        await fetch("/api/revalidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paths: ["/thuong-hieu", "/"] }),
        });
      } catch (revalidateErr) {
        console.warn("Cache revalidation skipped:", revalidateErr);
      }
      
      setToast({ message: "✓ Lưu thành công!", type: "success" });
      onSuccess("Cập nhật thành công");
      setTimeout(() => setToast(null), 3000);
    } catch {
      setToast({ message: "✗ Lưu thất bại", type: "error" });
      onError("Lỗi khi lưu");
      setTimeout(() => setToast(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const tabs = ["Hero Banner", "Kim chỉ nam", "Hành trình", "Lời hứa", "Cam kết", "Nhà máy", "CTA Banner"];

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-300 rounded-lg p-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">📖 Câu chuyện thương hiệu</h2>
        <p className="text-sm text-blue-800">Quản lý nội dung trang /thuong-hieu một cách trực quan và dễ dàng</p>
      </div>

      {toast && (
        <div className={`flex items-center gap-3 p-4 rounded-lg font-semibold ${toast.type === "success" ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300"}`}>
          {toast.type === "success" ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {toast.message}
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-3 border-b border-gray-300">
        {tabs.map((tab, idx) => (
          <button key={idx} onClick={() => setActiveTab(idx)} className={`px-4 py-2 rounded-t-lg whitespace-nowrap font-medium transition ${activeTab === idx ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="min-h-96">
        {activeTab === 0 && <HeroBannerSection data={data.hero} onChange={(d) => setData({ ...data, hero: d })} />}
        {activeTab === 1 && <GuidelinesSection data={data.guidelines} onChange={(d) => setData({ ...data, guidelines: d })} />}
        {activeTab === 2 && <TimelineSection data={data.timeline} onChange={(d) => setData({ ...data, timeline: d })} />}
        {activeTab === 3 && <QuoteSection data={data.quote} onChange={(d) => setData({ ...data, quote: d })} />}
        {activeTab === 4 && <CommitmentsSection header={data.commitmentsHeader} data={data.commitments} onChange={(h, d) => setData({ ...data, commitmentsHeader: h, commitments: d })} />}
        {activeTab === 5 && <FactorySection data={data.factory} onChange={(d) => setData({ ...data, factory: d })} />}
        {activeTab === 6 && <CTABannerSection data={data.ctaBanner} onChange={(d) => setData({ ...data, ctaBanner: d })} />}
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold">
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
        <button onClick={loadData} className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 font-semibold">Tải lại</button>
      </div>
    </div>
  );
}
