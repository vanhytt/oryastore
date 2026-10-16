"use client";

import React, { useState, useEffect } from "react";
import {
  getCertificatesHeader,
  updateCertificatesHeader,
} from "@/src/lib/adminDbService";
import { Plus, Trash2, Loader2 } from "lucide-react";

interface CertificateHeaderSettingsProps {
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export default function CertificateHeaderSettings({
  onSuccess,
  onError,
}: CertificateHeaderSettingsProps) {
  const [badge, setBadge] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bottomTags, setBottomTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load current settings
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await getCertificatesHeader();
      setBadge(data.badge);
      setTitle(data.title);
      setDescription(data.description);
      setBottomTags(data.bottomTags);
    } catch (err) {
      onError("Không thể tải cấu hình!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (!newTag.trim()) {
      onError("Vui lòng nhập nhãn!");
      return;
    }
    if (bottomTags.includes(newTag.trim())) {
      onError("Nhãn này đã tồn tại!");
      return;
    }
    setBottomTags([...bottomTags, newTag.trim()]);
    setNewTag("");
  };

  const handleRemoveTag = (index: number) => {
    setBottomTags(bottomTags.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!badge.trim() || !title.trim() || !description.trim()) {
      onError("Vui lòng điền đầy đủ tất cả các trường!");
      return;
    }

    try {
      setSaving(true);
      await updateCertificatesHeader({
        badge: badge.trim(),
        title: title.trim(),
        description: description.trim(),
        bottomTags,
      });
      onSuccess("Cập nhật cấu hình thành công!");
    } catch (err) {
      onError("Lỗi lưu cấu hình!");
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
    <div className="space-y-6 bg-white border border-gray-200 rounded-lg p-6">
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Cấu hình Tiêu đề Section Chứng nhận
        </h3>
      </div>

      {/* Badge Field */}
      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
          Thẻ Badge phía trên
        </label>
        <input
          type="text"
          value={badge}
          onChange={(e) => setBadge(e.target.value)}
          placeholder="VD: CAM KẾT CHẤT LƯỢNG"
          className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50"
        />
      </div>

      {/* Main Title */}
      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
          Tiêu đề chính Section
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="VD: Chứng nhận chất lượng quốc tế"
          className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
          Mô tả chung
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả chi tiết về chứng nhận..."
          rows={3}
          className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50"
        />
      </div>

      {/* Bottom Tags */}
      <div>
        <label className="block text-xs font-bold text-gray-600 uppercase mb-3">
          Nhãn cam kết phía dưới
        </label>

        {/* Existing Tags List */}
        <div className="space-y-2 mb-3">
          {bottomTags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded border border-gray-200"
            >
              <span className="text-sm text-gray-700">✓ {tag}</span>
              <button
                type="button"
                onClick={() => handleRemoveTag(index)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Add New Tag */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
            placeholder="Nhập nhãn mới..."
            className="flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="bg-[#5D8D4A] text-white px-3 py-2 rounded text-sm font-medium hover:bg-[#4a6b3a] transition flex items-center gap-2"
          >
            <Plus size={16} />
            Thêm
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-2 pt-4 border-t">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 bg-[#5D8D4A] text-white py-2 rounded font-medium hover:bg-[#4a6b3a] transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Đang lưu...
            </>
          ) : (
            "Lưu cấu hình tiêu đề"
          )}
        </button>
      </div>
    </div>
  );
}
