"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, X, Loader2, Star } from "lucide-react";
import { uploadImages } from "../../lib/adminApi";

interface ImageGalleryUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  label: string;
  primaryImage?: string;
  onPrimaryChange?: (value: string) => void;
}

export default function ImageGalleryUpload({
  value,
  onChange,
  label,
  primaryImage,
  onPrimaryChange,
}: ImageGalleryUploadProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | File[]) => {
    const fileList = Array.from(files);
    const validImages = fileList.filter((file) => file.type.startsWith("image/"));

    if (validImages.length === 0) {
      setUploadError("Vui lòng chọn ít nhất 1 tệp ảnh hợp lệ (JPG, PNG, WEBP, GIF).");
      return;
    }

    const oversized = validImages.find((file) => file.size > 5 * 1024 * 1024);
    if (oversized) {
      setUploadError("Một số ảnh vượt quá 5MB. Vui lòng chọn ảnh nhỏ hơn.");
      return;
    }

    setUploadError(null);
    setUploadMessage("Đang tải ảnh lên Supabase Storage...");
    setIsUploading(true);

    try {
      const urls = await uploadImages(validImages);
      const nextValue = Array.from(new Set([...value, ...urls.filter(Boolean)]));
      onChange(nextValue);

      if (!primaryImage && nextValue.length > 0) {
        onPrimaryChange?.(nextValue[0]);
      }

      setUploadMessage(`Đã tải lên thành công ${urls.length} ảnh.`);
    } catch (err) {
      console.error(err);
      setUploadError("Tải ảnh thất bại. Vui lòng thử lại.");
      setUploadMessage(null);
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
    if (e.dataTransfer.files?.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      handleFiles(e.target.files);
      e.target.value = "";
    }
  };

  const removeImage = (url: string) => {
    const nextValue = value.filter((item) => item !== url);
    onChange(nextValue);

    if (primaryImage === url) {
      onPrimaryChange?.(nextValue[0] || "");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-gray-600 uppercase">
          {label}
        </label>
        <span className="text-[11px] text-gray-400">
          Có thể chọn nhiều ảnh cùng lúc
        </span>
      </div>

      <div
        onDragEnter={onDrag}
        onDragOver={onDrag}
        onDragLeave={onDrag}
        onDrop={onDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-4 transition-all ${
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
          multiple
          onChange={onFileChange}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <Loader2 size={28} className="mb-2 text-[#5D8D4A] animate-spin" />
            <p className="text-sm font-semibold text-[#5D8D4A]">
              Đang tải ảnh lên Supabase Storage...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <UploadCloud size={28} className="mb-2 text-gray-400" />
            <p className="text-sm font-semibold text-gray-700">
              Kéo và thả ảnh vào đây hoặc nhấp để chọn
            </p>
            <p className="text-[11px] text-gray-400 mt-1">
              Hỗ trợ JPG, PNG, WEBP, GIF · Tối đa 5MB mỗi ảnh
            </p>
          </div>
        )}
      </div>

      {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}
      {uploadMessage && <p className="text-xs text-green-600">{uploadMessage}</p>}

      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {value.map((url) => {
            const isPrimary = primaryImage === url;
            return (
              <div key={url} className="group relative rounded-lg border border-gray-200 bg-gray-50 p-2">
                <div className="relative aspect-square overflow-hidden rounded-md bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="Product gallery" className="h-full w-full object-cover" />
                  {isPrimary && (
                    <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#5D8D4A] px-2 py-1 text-[10px] font-semibold text-white">
                      <Star size={10} fill="white" /> Ảnh chính
                    </span>
                  )}
                </div>

                <div className="mt-2 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onPrimaryChange?.(url)}
                    className="text-[11px] font-semibold text-[#5D8D4A] hover:underline"
                  >
                    {isPrimary ? "Đang dùng làm chính" : "Đặt làm ảnh chính"}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                    title="Xóa ảnh"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
