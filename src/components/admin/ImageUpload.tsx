"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { uploadImage } from "../../lib/adminApi";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadError("Vui lòng tải lên tệp tin ảnh (JPG, PNG, WEBP,...)");
      return;
    }
    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Kích thước ảnh quá lớn! Vui lòng chọn ảnh dưới 5MB.");
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      // Thử upload lên Supabase Storage qua API Route
      const url = await uploadImage(file);
      onChange(url);
    } catch {
      // Nếu Supabase chưa cấu hình hoặc lỗi, fallback sang Base64
      console.warn("Upload lên Supabase thất bại, dùng Base64 fallback");
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onChange(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
    }
  };

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    onChange("");
    setUploadError(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-xs font-bold text-gray-600 uppercase">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-blue-600 hover:text-blue-800 hover:underline cursor-pointer transition-colors"
        >
          {showUrlInput ? "Sử dụng tải tệp ảnh" : "Hoặc nhập đường dẫn URL"}
        </button>
      </div>

      {showUrlInput ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="VD: /products/product-1.png hoặc link URL bên ngoài"
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]"
        />
      ) : (
        <div>
          {value ? (
            <div className="relative border border-gray-200 rounded-lg p-3 bg-gray-50 flex items-center gap-4">
              <div className="w-16 h-16 rounded border border-gray-200 bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={value} alt="Preview" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-700 truncate">
                  {value.startsWith("data:")
                    ? "Ảnh tải lên (Base64 – chưa kết nối Supabase)"
                    : "Ảnh đã tải lên Supabase Storage"}
                </p>
                <p className="text-[10px] text-gray-400 truncate max-w-full">
                  {value.startsWith("data:")
                    ? `Kích thước: ~${Math.round((value.length * 3) / 4 / 1024)} KB`
                    : value}
                </p>
              </div>
              <button
                type="button"
                onClick={removeImage}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors cursor-pointer"
                title="Xóa ảnh"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div
              onDragEnter={onDrag}
              onDragOver={onDrag}
              onDragLeave={onDrag}
              onDrop={onDrop}
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-5 flex flex-col items-center justify-center transition-all ${
                isUploading
                  ? "border-[#5D8D4A] bg-[#5D8D4A]/5 cursor-wait"
                  : isDragActive
                    ? "border-[#5D8D4A] bg-[#5D8D4A]/5 cursor-pointer"
                    : "border-gray-300 hover:border-[#5D8D4A] hover:bg-gray-50/50 cursor-pointer"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
              />
              {isUploading ? (
                <>
                  <Loader2
                    size={32}
                    className="mb-2 text-[#5D8D4A] animate-spin"
                  />
                  <p className="text-xs text-[#5D8D4A] font-semibold">
                    Đang tải ảnh lên Supabase Storage...
                  </p>
                </>
              ) : (
                <>
                  <UploadCloud
                    size={32}
                    className={`mb-2 transition-colors ${isDragActive ? "text-[#5D8D4A]" : "text-gray-400 group-hover:text-gray-600"}`}
                  />
                  <p className="text-xs text-gray-600 font-medium text-center">
                    Kéo thả file ảnh vào đây, hoặc{" "}
                    <span className="text-[#5D8D4A] font-bold hover:underline">
                      nhấp để chọn
                    </span>
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    Hỗ trợ JPG, PNG, WEBP, GIF (Tối đa 5MB)
                  </p>
                </>
              )}
            </div>
          )}

          {/* Error message */}
          {uploadError && (
            <p className="text-xs text-red-600 mt-1">{uploadError}</p>
          )}
        </div>
      )}
    </div>
  );
}