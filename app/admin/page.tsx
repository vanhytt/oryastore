"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { isSupabaseConfigured } from "@/src/lib/supabase";
import { getProducts, getNews, getPartners } from "@/src/lib/dbService";
import ProductManager from "@/src/components/admin/ProductManager";
import NewsManager from "@/src/components/admin/NewsManager";
import PartnerManager from "@/src/components/admin/PartnerManager";
import ToastNotification from "@/src/components/admin/ToastNotification";
import {
  ShoppingBag,
  Newspaper,
  Users,
  Database,
  ArrowLeft,
  LayoutDashboard,
  ShieldCheck,
  ServerCrash
} from "lucide-react";

type TabType = "dashboard" | "products" | "news" | "partners";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [dbConnected, setDbConnected] = useState(false);

  // Statistics
  const [stats, setStats] = useState({
    products: 0,
    news: 0,
    partners: 0
  });

  // Toast notifications
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const triggerToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
  };

  const updateStats = async () => {
    try {
      const prods = await getProducts();
      const newsList = await getNews();
      const partnersList = await getPartners();
      setStats({
        products: prods.length,
        news: newsList.length,
        partners: partnersList.length
      });
    } catch (err) {
      console.error("Error updating stats", err);
    }
  };

  useEffect(() => {
    setDbConnected(isSupabaseConfigured);
    updateStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-gray-800">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 shrink-0 flex flex-col">
        {/* Branding header */}
        <div className="p-6 border-b border-gray-150 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-[#5D8D4A] tracking-tight">ORYA ADMIN</h1>
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Hệ thống quản trị</p>
          </div>
          <Link
            href="/"
            className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-700 transition-colors inline-flex cursor-pointer"
            title="Quay lại trang chủ"
          >
            <ArrowLeft size={18} />
          </Link>
        </div>

        {/* Sidebar Nav links */}
        <nav className="p-4 flex-1 space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-sm font-bold transition-all cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-[#5D8D4A]/10 text-[#5D8D4A]"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            <LayoutDashboard size={18} />
            Bảng điều khiển
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-sm font-bold transition-all cursor-pointer ${
              activeTab === "products"
                ? "bg-[#5D8D4A]/10 text-[#5D8D4A]"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            <ShoppingBag size={18} />
            Quản lý sản phẩm
          </button>
          <button
            onClick={() => setActiveTab("news")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-sm font-bold transition-all cursor-pointer ${
              activeTab === "news"
                ? "bg-[#5D8D4A]/10 text-[#5D8D4A]"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            <Newspaper size={18} />
            Quản lý tin tức
          </button>
          <button
            onClick={() => setActiveTab("partners")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-sm font-bold transition-all cursor-pointer ${
              activeTab === "partners"
                ? "bg-[#5D8D4A]/10 text-[#5D8D4A]"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            <Users size={18} />
            Đối tác phân phối
          </button>
        </nav>

        {/* Database Status Widget */}
        <div className="p-4 border-t border-gray-150 bg-gray-50/50">
          <div className="flex items-center gap-2">
            <Database size={16} className={dbConnected ? "text-green-600" : "text-amber-500"} />
            <div className="text-xs">
              <p className="font-bold text-gray-700">Trạng thái CSDL:</p>
              <div className="flex items-center gap-1 mt-0.5">
                {dbConnected ? (
                  <>
                    <ShieldCheck size={12} className="text-green-600" />
                    <span className="text-green-700 font-semibold">Supabase Cloud</span>
                  </>
                ) : (
                  <>
                    <ServerCrash size={12} className="text-amber-500" />
                    <span className="text-amber-600 font-semibold">LocalStorage (Offline)</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header bar */}
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0">
          <h2 className="font-extrabold text-gray-800 text-lg uppercase tracking-tight">
            {activeTab === "dashboard" && "Bảng điều khiển tổng quan"}
            {activeTab === "products" && "Quản lý sản phẩm"}
            {activeTab === "news" && "Quản lý tin bài"}
            {activeTab === "partners" && "Đối tác phân phối"}
          </h2>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#5D8D4A] rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-gray-600">Admin Mode</span>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Welcome box */}
              <div className="bg-gradient-to-r from-[#5D8D4A] to-[#6CA356] rounded-xl p-6 md:p-8 text-white shadow-sm">
                <h3 className="text-2xl font-black mb-2">Chào mừng trở lại, Orya Admin!</h3>
                <p className="text-white/80 text-sm max-w-xl">
                  Hệ thống quản lý nội dung số của nhãn hàng Orya Babycare. Sử dụng các thẻ bên trái để tùy biến danh sách sản phẩm hiển thị trên trang chủ, viết tin tức chuyên khoa thai sản hoặc thay đổi danh sách các đại lý phân phối.
                </p>
              </div>

              {/* Stats overview cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Products Stat Card */}
                <div
                  onClick={() => setActiveTab("products")}
                  className="bg-white border border-gray-200 rounded-lg p-5 flex items-center justify-between hover:shadow-md transition-all cursor-pointer group"
                >
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tổng sản phẩm</p>
                    <h4 className="text-3xl font-black text-gray-800 mt-2 group-hover:text-[#5D8D4A] transition-colors">
                      {stats.products}
                    </h4>
                  </div>
                  <div className="p-3 bg-[#5D8D4A]/10 text-[#5D8D4A] rounded-full group-hover:bg-[#5D8D4A] group-hover:text-white transition-all">
                    <ShoppingBag size={24} />
                  </div>
                </div>

                {/* News Stat Card */}
                <div
                  onClick={() => setActiveTab("news")}
                  className="bg-white border border-gray-200 rounded-lg p-5 flex items-center justify-between hover:shadow-md transition-all cursor-pointer group"
                >
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bài viết chuyên sâu</p>
                    <h4 className="text-3xl font-black text-gray-800 mt-2 group-hover:text-[#5D8D4A] transition-colors">
                      {stats.news}
                    </h4>
                  </div>
                  <div className="p-3 bg-[#5D8D4A]/10 text-[#5D8D4A] rounded-full group-hover:bg-[#5D8D4A] group-hover:text-white transition-all">
                    <Newspaper size={24} />
                  </div>
                </div>

                {/* Partners Stat Card */}
                <div
                  onClick={() => setActiveTab("partners")}
                  className="bg-white border border-gray-200 rounded-lg p-5 flex items-center justify-between hover:shadow-md transition-all cursor-pointer group"
                >
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Đối tác phân phối</p>
                    <h4 className="text-3xl font-black text-gray-800 mt-2 group-hover:text-[#5D8D4A] transition-colors">
                      {stats.partners}
                    </h4>
                  </div>
                  <div className="p-3 bg-[#5D8D4A]/10 text-[#5D8D4A] rounded-full group-hover:bg-[#5D8D4A] group-hover:text-white transition-all">
                    <Users size={24} />
                  </div>
                </div>
              </div>

              {/* Database notice if local */}
              {!dbConnected && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-amber-800 text-sm">
                  <ServerCrash size={20} className="shrink-0 mt-0.5 text-amber-600" />
                  <div>
                    <h5 className="font-bold mb-1">Chế độ Lưu trữ Cục bộ đang kích hoạt</h5>
                    <p className="text-amber-700">
                      Do bạn chưa điền các biến cấu hình Supabase trong tệp <code className="bg-amber-100 px-1 rounded">.env.local</code> nên toàn bộ dữ liệu đang được lưu trữ tạm thời trong trình duyệt (LocalStorage). Để đồng bộ dữ liệu vĩnh viễn lên cơ sở dữ liệu đám mây, hãy cấu hình Supabase theo tài liệu hướng dẫn và chạy tệp SQL schema được cung cấp.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "products" && (
            <ProductManager
              onSuccess={(msg) => triggerToast(msg, "success")}
              onError={(msg) => triggerToast(msg, "error")}
              onUpdateStats={updateStats}
            />
          )}

          {activeTab === "news" && (
            <NewsManager
              onSuccess={(msg) => triggerToast(msg, "success")}
              onError={(msg) => triggerToast(msg, "error")}
              onUpdateStats={updateStats}
            />
          )}

          {activeTab === "partners" && (
            <PartnerManager
              onSuccess={(msg) => triggerToast(msg, "success")}
              onError={(msg) => triggerToast(msg, "error")}
              onUpdateStats={updateStats}
            />
          )}
        </div>
      </main>

      {/* Toast System */}
      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}