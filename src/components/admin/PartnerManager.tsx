"use client";

import React, { useState, useEffect } from "react";
import { getPartners, createPartner, updatePartner, deletePartner, Partner } from "../../lib/dbService";
import { Plus, Edit2, Trash2, X, AlertTriangle, ExternalLink, Loader2 } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface PartnerManagerProps {
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
  onUpdateStats: () => void;
}

export default function PartnerManager({ onSuccess, onError, onUpdateStats }: PartnerManagerProps) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [link, setLink] = useState("");

  // Fetch partners
  const fetchPartners = async () => {
    try {
      setLoading(true);
      const data = await getPartners();
      setPartners(data);
    } catch (err: any) {
      onError("Không thể tải danh sách đối tác!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // Open modal
  const openModal = (partner: Partner | null = null) => {
    if (partner) {
      setEditingPartner(partner);
      setName(partner.name);
      setLogo(partner.logo || "");
      setLink(partner.link || "");
    } else {
      setEditingPartner(null);
      setName("");
      setLogo("");
      setLink("");
    }
    setIsModalOpen(true);
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      onError("Vui lòng nhập tên đối tác!");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        name,
        logo,
        link
      };

      if (editingPartner) {
        await updatePartner(editingPartner.id, payload);
        onSuccess("Cập nhật đối tác thành công!");
      } else {
        await createPartner(payload);
        onSuccess("Thêm đối tác mới thành công!");
      }

      setIsModalOpen(false);
      fetchPartners();
      onUpdateStats();
    } catch (err: any) {
      onError("Đã xảy ra lỗi khi lưu đối tác!");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete partner
  const handleDelete = async (id: string | number) => {
    if (confirm("Bạn có chắc chắn muốn xóa đối tác này?")) {
      try {
        await deletePartner(id);
        onSuccess("Xóa đối tác thành công!");
        fetchPartners();
        onUpdateStats();
      } catch (err: any) {
        onError("Không thể xóa đối tác này!");
        console.error(err);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Header Area */}
      <div className="p-5 border-b border-gray-150 flex items-center justify-between">
        <h3 className="text-gray-700 font-bold text-base">Hệ thống đối tác hiện tại</h3>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 bg-[#5D8D4A] hover:bg-[#4d753d] text-white px-4 py-2 rounded text-sm font-bold transition-colors cursor-pointer"
        >
          <Plus size={18} />
          Thêm đối tác
        </button>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-gray-500">
          <Loader2 size={32} className="animate-spin text-[#5D8D4A] mb-3" />
          <p className="text-sm">Đang tải danh sách đối tác...</p>
        </div>
      ) : partners.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          <AlertTriangle size={36} className="mx-auto mb-3 text-gray-300" />
          <p className="text-sm">Chưa có đối tác nào được đăng ký.</p>
        </div>
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="border border-gray-200 rounded-lg p-5 flex flex-col items-center justify-between text-center bg-gray-50/50 hover:shadow-md transition-shadow relative group"
            >
              {/* Logo Box */}
              <div className="w-full h-16 bg-white border border-gray-150 rounded flex items-center justify-center p-3 mb-4 overflow-hidden">
                {partner.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="font-bold text-[#5D8D4A] text-lg">
                    {partner.name.charAt(0)}
                  </span>
                )}
              </div>

              {/* Info Box */}
              <div className="mb-4">
                <h4 className="font-bold text-gray-800 text-base">{partner.name}</h4>
                {partner.link ? (
                  <a
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"
                  >
                    Truy cập website <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="text-xs text-gray-400">Không có link website</span>
                )}
              </div>

              {/* Actions Footer */}
              <div className="w-full pt-4 border-t border-gray-100 flex justify-center gap-4">
                <button
                  onClick={() => openModal(partner)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-[#5D8D4A] transition-colors cursor-pointer"
                >
                  <Edit2 size={13} /> Sửa
                </button>
                <button
                  onClick={() => handleDelete(partner.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                >
                  <Trash2 size={13} /> Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-gray-800 font-bold text-base">
                {editingPartner ? "Chỉnh sửa đối tác" : "Thêm đối tác mới"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Partner Name */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                  Tên đối tác <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="VD: KidsPlaza, Con Cưng..."
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]"
                />
              </div>

              {/* Logo Upload / Drag-and-Drop */}
              <div>
                <ImageUpload
                  value={logo}
                  onChange={setLogo}
                  label="Logo đối tác"
                />
              </div>

              {/* Website Link */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                  Liên kết website đối tác
                </label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="VD: https://kidsplaza.vn"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]"
                />
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-gray-150 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#5D8D4A] hover:bg-[#4d753d] text-white rounded text-sm font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                  Lưu lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}