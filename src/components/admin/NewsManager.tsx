"use client";

import React, { useState, useEffect } from "react";
import {
  adminGetNews,
  adminCreateNews,
  adminUpdateNews,
  adminDeleteNews,
} from "../../lib/adminApi";
import type { NewsItem } from "../../lib/dbService";
import { getNews } from "../../lib/dbService";
import { isSupabaseConfigured } from "../../lib/supabase";
import { Plus, Edit2, Trash2, X, AlertTriangle, Loader2 } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface NewsManagerProps {
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
  onUpdateStats: () => void;
}

export default function NewsManager({ onSuccess, onError, onUpdateStats }: NewsManagerProps) {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"All" | "Draft" | "Published">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("Ban Biên Tập");
  const [status, setStatus] = useState<"Draft" | "Published">("Draft");

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = isSupabaseConfigured ? await adminGetNews() : await getNews();
      setNewsList(data);
    } catch (err) {
      onError("Không thể tải danh sách tin tức!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (news: NewsItem | null = null) => {
    if (news) {
      setEditingNews(news);
      setTitle(news.title);
      setCoverImage(news.cover_image || "");
      setContent(news.content);
      setExcerpt(news.excerpt);
      setAuthor(news.author || "Ban Biên Tập");
      setStatus(news.status);
    } else {
      setEditingNews(null);
      setTitle(""); setCoverImage(""); setContent(""); setExcerpt("");
      setAuthor("Ban Biên Tập"); setStatus("Draft");
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !excerpt) {
      onError("Vui lòng điền đầy đủ các thông tin bắt buộc!");
      return;
    }
    try {
      setIsSubmitting(true);
      const payload = { title, cover_image: coverImage, content, excerpt, author, status };
      if (isSupabaseConfigured) {
        editingNews ? await adminUpdateNews(editingNews.id, payload) : await adminCreateNews(payload);
      } else {
        const { createNews, updateNews } = await import("../../lib/dbService");
        editingNews ? await updateNews(editingNews.id, payload) : await createNews(payload);
      }
      onSuccess(editingNews ? "Cập nhật bài viết thành công!" : "Thêm bài viết mới thành công!");
      setIsModalOpen(false);
      fetchNews();
      onUpdateStats();
    } catch (err) {
      onError("Đã xảy ra lỗi khi lưu bài viết!");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Bạn có chắc muốn xóa bài viết này?")) return;
    try {
      if (isSupabaseConfigured) {
        await adminDeleteNews(id);
      } else {
        const { deleteNews } = await import("../../lib/dbService");
        await deleteNews(id);
      }
      onSuccess("Xóa bài viết thành công!");
      fetchNews();
      onUpdateStats();
    } catch (err) {
      onError("Không thể xóa bài viết này!");
      console.error(err);
    }
  };

  const filteredNews = newsList.filter((item) =>
    statusFilter === "All" ? true : item.status === statusFilter
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex gap-2">
          {(["All", "Published", "Draft"] as const).map((filter) => (
            <button key={filter} onClick={() => setStatusFilter(filter)} className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${statusFilter === filter ? "bg-[#5D8D4A] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {filter === "All" ? "Tất cả" : filter === "Published" ? "Xuất bản" : "Bản nháp"}
            </button>
          ))}
        </div>
        <button onClick={() => openModal()} className="inline-flex items-center gap-2 bg-[#5D8D4A] hover:bg-[#4d753d] text-white px-4 py-2 rounded text-sm font-bold transition-colors cursor-pointer">
          <Plus size={18} /> Viết bài mới
        </button>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-500">
            <Loader2 size={32} className="animate-spin text-[#5D8D4A] mb-3" />
            <p className="text-sm">Đang tải danh sách bài viết...</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <AlertTriangle size={36} className="mx-auto mb-3 text-gray-300" />
            <p className="text-sm">Không tìm thấy bài viết nào.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs font-bold uppercase border-b border-gray-200">
                <th className="py-3 px-5">Ảnh bìa</th>
                <th className="py-3 px-5">Tiêu đề</th>
                <th className="py-3 px-5">Ngày đăng</th>
                <th className="py-3 px-5">Tác giả</th>
                <th className="py-3 px-5">Trạng thái</th>
                <th className="py-3 px-5 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredNews.map((news) => (
                <tr key={news.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-5">
                    <div className="w-16 h-10 bg-gray-100 border border-gray-200 rounded flex items-center justify-center overflow-hidden">
                      {news.cover_image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={news.cover_image} alt={news.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs font-bold text-gray-400">News</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-5 font-medium text-gray-800 max-w-sm truncate">{news.title}</td>
                  <td className="py-3 px-5 text-gray-500">{news.published_date}</td>
                  <td className="py-3 px-5 text-gray-600">{news.author}</td>
                  <td className="py-3 px-5">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${news.status === "Published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                      {news.status === "Published" ? "Đã đăng" : "Nháp"}
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right space-x-2">
                    <button onClick={() => openModal(news)} className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded transition-colors inline-flex cursor-pointer">
                      <Edit2 size={15} />
                    </button>
                    <button onClick={() => handleDelete(news.id)} className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded transition-colors inline-flex cursor-pointer">
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-2xl overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-gray-800 font-bold text-lg">{editingNews ? "Chỉnh sửa bài viết" : "Viết bài viết mới"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Tiêu đề <span className="text-red-500">*</span></label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="VD: Cách bảo vệ da nhạy cảm của bé sơ sinh..." className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Tác giả <span className="text-red-500">*</span></label>
                  <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required placeholder="VD: Dược sĩ Minh Thư..." className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Trạng thái <span className="text-red-500">*</span></label>
                  <select value={status} onChange={(e) => setStatus(e.target.value as "Draft" | "Published")} className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]">
                    <option value="Draft">Bản nháp (Draft)</option>
                    <option value="Published">Xuất bản (Published)</option>
                  </select>
                </div>
              </div>
              <ImageUpload value={coverImage} onChange={setCoverImage} label="Ảnh bìa bài viết" />
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Tóm tắt (Excerpt) <span className="text-red-500">*</span></label>
                <textarea rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required placeholder="Tóm tắt ngắn gọn nội dung bài viết..." className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Nội dung <span className="text-red-500">*</span></label>
                <textarea rows={8} value={content} onChange={(e) => setContent(e.target.value)} required placeholder="Viết nội dung bài viết chi tiết tại đây..." className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]" />
              </div>
              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">Hủy bỏ</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-[#5D8D4A] hover:bg-[#4d753d] text-white rounded text-sm font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50">
                  {isSubmitting && <Loader2 size={16} className="animate-spin" />} Lưu lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}