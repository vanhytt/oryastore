"use client";

import React, { useState, useEffect } from "react";
import { uploadImage } from "@/src/lib/adminApi";
import { X, Loader2, Upload } from "lucide-react";

interface CertificateModalProps {
  certificate: any;
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
  onError: (msg: string) => void;
}

export default function CertificateModal({
  certificate,
  onSave,
  onClose,
  onError,
}: CertificateModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (certificate) {
      setName(certificate.title || "");
      setDescription(certificate.description || "");
      setImageUrl(certificate.image_url || "");
      setSortOrder(certificate.sort_order || 0);
    }
  }, [certificate]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadImage(file);
      setImageUrl(url);
    } catch (err) {
      onError("Lỗi upload ảnh");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      onError("Vui lòng nhập tiêu đề!");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave({
        title: name.trim(),
        description: description.trim() || null,
        image_url: imageUrl || null,
        sort_order: sortOrder,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">
            {certificate ? "Sửa" : "Thêm"} chứng nhận
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
              Tiêu đề chính <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Vegan Certified, CGMP-ASEAN, SLS Free"
              required
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
              Mô tả chi tiết
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="VD: Không thử nghiệm trên động vật, 100% thành phần từ thực vật..."
              rows={3}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
              Ảnh chứng nhận
            </label>
            {imageUrl && (
              <div className="w-full h-24 bg-gray-100 rounded mb-3 flex items-center justify-center">
                <img src={imageUrl} alt="Preview" className="max-h-full object-contain" />
              </div>
            )}
            <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed rounded cursor-pointer hover:border-[#5D8D4A]">
              <span className="flex items-center gap-2">
                <Upload size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  {uploading ? "Đang upload..." : "Chọn ảnh"}
                </span>
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase mb-2">
              Thứ tự hiển thị
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              min="0"
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50"
            />
          </div>

          <div className="pt-4 border-t flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#5D8D4A] text-white rounded text-sm font-bold hover:bg-[#4d753d] disabled:opacity-50 cursor-pointer flex items-center gap-2"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
