"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import { uploadBrandImage, getImagePreviewUrl } from "@/src/lib/utils/imageUpload";

interface HeroData {
  badge: string;
  mainHeading: string;
  description1: string;
  description2: string;
  ctaButton1: { label: string; link: string };
  ctaButton2: { label: string; link: string };
  mainImage: string;
  badgeImage: { title: string; subtitle: string; image: string };
}

export default function HeroBannerSection({ data, onChange }: { data: HeroData; onChange: (d: HeroData) => void }) {
  const [uploading, setUploading] = useState(false);

  const update = (field: keyof HeroData, value: any) => onChange({ ...data, [field]: value });
  const updateNested = (parent: keyof HeroData, field: string, value: string) => {
    onChange({ ...data, [parent]: { ...(data[parent] as any), [field]: value } });
  };

  const upload = async (field: "mainImage" | "badgeImage", file: File) => {
    try {
      setUploading(true);
      const { publicUrl } = await uploadBrandImage(file, "hero");
      if (field === "mainImage") update("mainImage", publicUrl);
      else updateNested("badgeImage", "image", publicUrl);
    } catch (e: any) {
      alert(`Upload failed: ${e.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
      <h3 className="font-semibold text-lg text-blue-900">📌 Hero Banner</h3>
      
      <div>
        <label className="block text-sm font-medium mb-1">Badge</label>
        <input type="text" value={data.badge} onChange={(e) => update("badge", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg" placeholder="CÂU CHUYỆN" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tiêu đề chính</label>
        <input type="text" value={data.mainHeading} onChange={(e) => update("mainHeading", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mô tả 1</label>
        <textarea value={data.description1} onChange={(e) => update("description1", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg" rows={2} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mô tả 2</label>
        <textarea value={data.description2} onChange={(e) => update("description2", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg" rows={2} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm mb-1">Nút 1 - Tên</label>
          <input type="text" value={data.ctaButton1.label} onChange={(e) => updateNested("ctaButton1", "label", e.target.value)}
            className="w-full px-2 py-1 border rounded" />
          <input type="text" value={data.ctaButton1.link} onChange={(e) => updateNested("ctaButton1", "link", e.target.value)}
            className="w-full px-2 py-1 border rounded mt-1" placeholder="Link" />
        </div>
        <div>
          <label className="block text-sm mb-1">Nút 2 - Tên</label>
          <input type="text" value={data.ctaButton2.label} onChange={(e) => updateNested("ctaButton2", "label", e.target.value)}
            className="w-full px-2 py-1 border rounded" />
          <input type="text" value={data.ctaButton2.link} onChange={(e) => updateNested("ctaButton2", "link", e.target.value)}
            className="w-full px-2 py-1 border rounded mt-1" placeholder="Link" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Ảnh Hero</label>
        <div className="flex gap-3">
          <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload("mainImage", e.target.files[0])}
            className="hidden" id="main-img" disabled={uploading} />
          <label htmlFor="main-img" className="px-3 py-2 bg-blue-600 text-white rounded cursor-pointer">
            <Upload className="w-4 h-4 inline mr-1" />{uploading ? "..." : "Tải ảnh"}
          </label>
          {data.mainImage && <img src={getImagePreviewUrl(data.mainImage)} alt="" className="w-24 h-16 object-cover rounded" />}
        </div>
      </div>

      <div className="border-t pt-3">
        <label className="block font-medium mb-2">Badge Image</label>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <input type="text" value={data.badgeImage.title} onChange={(e) => updateNested("badgeImage", "title", e.target.value)}
            className="px-2 py-1 border rounded" placeholder="Title" />
          <input type="text" value={data.badgeImage.subtitle} onChange={(e) => updateNested("badgeImage", "subtitle", e.target.value)}
            className="px-2 py-1 border rounded" placeholder="Subtitle" />
        </div>
        <div className="flex gap-3">
          <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && upload("badgeImage", e.target.files[0])}
            className="hidden" id="badge-img" />
          <label htmlFor="badge-img" className="px-3 py-2 bg-blue-600 text-white rounded cursor-pointer">Ảnh Badge</label>
          {data.badgeImage.image && <img src={getImagePreviewUrl(data.badgeImage.image)} alt="" className="w-20 h-16 object-cover rounded" />}
        </div>
      </div>
    </div>
  );
}
