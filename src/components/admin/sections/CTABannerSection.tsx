"use client";

import React from "react";

interface CTABannerData {
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonLink: string;
}

export default function CTABannerSection({ data, onChange }: { data: CTABannerData; onChange: (d: CTABannerData) => void }) {
  const update = (field: keyof CTABannerData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 space-y-4">
      <h3 className="font-semibold text-lg text-indigo-900">📌 Banner CTA cuối trang</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Tiêu đề</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => update("title", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Orya"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mô tả</label>
        <textarea
          value={data.subtitle}
          onChange={(e) => update("subtitle", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          rows={2}
          placeholder="Hãy tham gia..."
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Tên nút bấm</label>
          <input
            type="text"
            value={data.buttonLabel}
            onChange={(e) => update("buttonLabel", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Mua ngay"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Link URL</label>
          <input
            type="text"
            value={data.buttonLink}
            onChange={(e) => update("buttonLink", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="/san-pham"
          />
        </div>
      </div>
    </div>
  );
}
