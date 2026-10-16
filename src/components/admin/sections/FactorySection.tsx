"use client";

import React, { useState } from "react";
import { Upload, Trash2 } from "lucide-react";
import { uploadBrandImage, getImagePreviewUrl } from "@/src/lib/utils/imageUpload";

interface Highlight {
  title: string;
  description: string;
}

interface FactoryData {
  title: string;
  description: string;
  highlights: Highlight[];
  image: string;
}

export default function FactorySection({ data, onChange }: { data: FactoryData; onChange: (d: FactoryData) => void }) {
  const [uploading, setUploading] = useState(false);

  const update = (field: keyof FactoryData, value: any) => onChange({ ...data, [field]: value });

  const updateHighlight = (idx: number, field: keyof Highlight, value: string) => {
    const newHL = [...data.highlights];
    newHL[idx] = { ...newHL[idx], [field]: value };
    update("highlights", newHL);
  };

  const addHighlight = () => {
    update("highlights", [...data.highlights, { title: "", description: "" }]);
  };

  const removeHighlight = (idx: number) => {
    update("highlights", data.highlights.filter((_, i) => i !== idx));
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const { publicUrl } = await uploadBrandImage(file, "factory");
      update("image", publicUrl);
    } catch (e: any) {
      alert(`Upload failed: ${e.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 space-y-4">
      <h3 className="font-semibold text-lg text-orange-900">📌 Nhà máy CVI Pharma</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Tiêu đề</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => update("title", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="CVI Pharma"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nội dung</label>
        <textarea
          value={data.description}
          onChange={(e) => update("description", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          rows={3}
          placeholder="Công nghệ hiện đại..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Ảnh nhà máy</label>
        <div className="flex gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
            className="hidden"
            id="factory-img"
            disabled={uploading}
          />
          <label htmlFor="factory-img" className="px-3 py-2 bg-orange-600 text-white rounded cursor-pointer hover:bg-orange-700">
            <Upload className="w-4 h-4 inline mr-1" /> {uploading ? "..." : "Tải ảnh"}
          </label>
          {data.image && (
            <img src={getImagePreviewUrl(data.image)} alt="Factory" className="w-32 h-24 object-cover rounded-lg" />
          )}
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="flex justify-between items-center mb-2">
          <label className="block font-medium">Điểm nổi bật</label>
          <button onClick={addHighlight} className="px-2 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700">
            + Thêm
          </button>
        </div>

        {data.highlights.map((hl, idx) => (
          <div key={idx} className="bg-white border rounded p-3 mb-2 space-y-2">
            <div className="flex gap-2 items-start">
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={hl.title}
                  onChange={(e) => updateHighlight(idx, "title", e.target.value)}
                  className="w-full px-2 py-1 border rounded text-sm"
                  placeholder="Tiêu đề điểm nổi bật (VD: Hệ thống phòng sạch chuẩn ISO)"
                />
                <textarea
                  value={hl.description}
                  onChange={(e) => updateHighlight(idx, "description", e.target.value)}
                  className="w-full px-2 py-1 border rounded text-sm"
                  rows={2}
                  placeholder="Nội dung mô tả chi tiết (VD: Đảm bảo môi trường vô trùng...)"
                />
              </div>
              <button onClick={() => removeHighlight(idx)} className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 flex-shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
