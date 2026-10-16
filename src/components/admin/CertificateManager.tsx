"use client";

import React, { useState, useEffect } from "react";
import {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  Certificate,
} from "@/src/lib/adminDbService";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";
import CertificateModal from "./CertificateModal";
import CertificateHeaderSettings from "./CertificateHeaderSettings";

interface CertificateManagerProps {
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

export default function CertificateManager({
  onSuccess,
  onError,
}: CertificateManagerProps) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [activeTab, setActiveTab] = useState<"list" | "settings">("list");

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const data = await getCertificates();
      setCertificates(data);
    } catch (err) {
      onError("Không thể tải danh sách chứng nhận!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (cert: Certificate | null = null) => {
    setEditingCert(cert || null);
    setIsModalOpen(true);
  };

  const handleSave = async (certData: any) => {
    try {
      if (editingCert) {
        await updateCertificate(editingCert.id, certData);
        onSuccess("Cập nhật chứng nhận thành công!");
      } else {
        await createCertificate(certData);
        onSuccess("Thêm chứng nhận thành công!");
      }
      setIsModalOpen(false);
      fetchCertificates();
    } catch (err) {
      onError(editingCert ? "Lỗi cập nhật!" : "Lỗi thêm!");
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa?")) return;
    try {
      await deleteCertificate(id);
      onSuccess("Xóa thành công!");
      fetchCertificates();
    } catch (err) {
      onError("Lỗi xóa!");
      console.error(err);
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
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("list")}
          className={`px-4 py-2 font-medium text-sm transition ${
            activeTab === "list"
              ? "text-[#5D8D4A] border-b-2 border-[#5D8D4A]"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Danh sách Chứng nhận
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2 font-medium text-sm transition ${
            activeTab === "settings"
              ? "text-[#5D8D4A] border-b-2 border-[#5D8D4A]"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          Cấu hình Tiêu đề
        </button>
      </div>

      {/* TAB: List */}
      {activeTab === "list" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Quản lý Chứng nhận
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Tổng: {certificates.length}
              </p>
            </div>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 px-4 py-2 bg-[#5D8D4A] text-white font-bold rounded hover:bg-[#4d753d] cursor-pointer"
            >
              <Plus size={18} />
              Thêm
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                {cert.image_url && (
                  <img
                    src={cert.image_url}
                    alt={cert.title}
                    className="w-full h-32 object-contain bg-gray-100 rounded mb-3"
                  />
                )}
                <h3 className="font-bold text-gray-800 mb-1">{cert.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {cert.description || "Không có mô tả"}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(cert)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
                  >
                    <Edit2 size={14} />
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(cert.id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 border border-red-300 rounded hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 size={14} />
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          {certificates.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">Chưa có chứng nhận</p>
              <button
                onClick={() => openModal()}
                className="text-[#5D8D4A] font-bold hover:underline cursor-pointer"
              >
                Thêm chứng nhận đầu tiên
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB: Settings */}
      {activeTab === "settings" && (
        <CertificateHeaderSettings
          onSuccess={onSuccess}
          onError={onError}
        />
      )}

      {isModalOpen && (
        <CertificateModal
          certificate={editingCert}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
          onError={onError}
        />
      )}
    </div>
  );
}
