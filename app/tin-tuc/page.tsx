"use client";

import React, { useEffect, useState } from "react";
import { Calendar, User, Search, BookOpen, ArrowRight, Tag } from "lucide-react";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { getNews, NewsItem } from "@/src/lib/dbService";

export default function NewsListPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await getNews();
        // Filter only published news or all (since it's a blog page, show Published)
        const publishedData = data.filter(item => item.status === "Published" || !item.status);
        setNewsList(publishedData);
        setFilteredNews(publishedData);
      } catch (error) {
        console.error("Failed to load news articles:", error);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  // Filter news based on search term and category selection
  useEffect(() => {
    let result = newsList;

    // Filter by Category
    if (selectedCategory !== "Tất cả") {
      result = result.filter(
        (item) => 
          (item.excerpt && item.excerpt.toLowerCase().includes(selectedCategory.toLowerCase())) ||
          (item.title && item.title.toLowerCase().includes(selectedCategory.toLowerCase())) ||
          // Defaulting categories if they match typical keywords
          (selectedCategory === "Kiến thức" && (item.title.toLowerCase().includes("bí quyết") || item.title.toLowerCase().includes("tại sao") || item.title.toLowerCase().includes("hướng dẫn") || item.title.toLowerCase().includes("kiến thức"))) ||
          (selectedCategory === "Sự kiện" && (item.title.toLowerCase().includes("hội thảo") || item.title.toLowerCase().includes("sự kiện") || item.title.toLowerCase().includes("khai trương"))) ||
          (selectedCategory === "Sản phẩm" && (item.title.toLowerCase().includes("sản phẩm") || item.title.toLowerCase().includes("ra mắt") || item.title.toLowerCase().includes("dòng mới")))
      );
    }

    // Filter by Search Term
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          (item.excerpt && item.excerpt.toLowerCase().includes(term)) ||
          (item.content && item.content.toLowerCase().includes(term))
      );
    }

    setFilteredNews(result);
  }, [searchTerm, selectedCategory, newsList]);

  // Map article to aesthetic category
  const getCategoryDetails = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("bí quyết") || lowerTitle.includes("tại sao") || lowerTitle.includes("hướng dẫn")) {
      return {
        label: "Kiến thức",
        color: "bg-[#ED9717]",
        bgGradient: "from-[#FFF3E0] to-[#FFE0B2]",
        emoji: "💡"
      };
    }
    if (lowerTitle.includes("hội thảo") || lowerTitle.includes("sự kiện") || lowerTitle.includes("đồng hành")) {
      return {
        label: "Sự kiện",
        color: "bg-[#5D8D4A]",
        bgGradient: "from-[#E8F5E9] to-[#C8E6C9]",
        emoji: "📅"
      };
    }
    return {
      label: "Sản phẩm",
      color: "bg-[#5CC9FF]",
      bgGradient: "from-[#E0F7FA] to-[#B2EBF2]",
      emoji: "🌿"
    };
  };

  const categories = ["Tất cả", "Kiến thức", "Sự kiện", "Sản phẩm"];

  return (
    <>
      <Header />
      <main className="bg-[#FAF9F5] text-[#2c3527] min-h-screen pb-20 selection:bg-[#5D8D4A]/10 selection:text-[#5D8D4A]">
        {/* Background grain noise effect */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.015] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] z-40"></div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden bg-[#5D8D4A]/5 border-b border-[#5D8D4A]/10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#5D8D4A]/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
          <div className="max-w-[1200px] mx-auto px-5 text-center relative">
            <span className="inline-block px-4 py-1.5 bg-[#5D8D4A]/10 text-[#5D8D4A] text-[10px] uppercase tracking-[0.2em] font-bold rounded-full mb-4">
              Cẩm nang gia đình
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#3A5B2C] font-bold leading-tight tracking-tight mb-6">
              Góc Tin Tức & Chia Sẻ
            </h1>
            <p className="max-w-2xl mx-auto text-stone-600 text-base md:text-lg leading-relaxed font-light">
              Nơi cập nhật những hoạt động nổi bật của Orya cùng kiến thức khoa học hữu ích về chăm sóc sức khỏe mẹ bầu và bé yêu.
            </p>
          </div>
        </section>

        {/* Controls Section (Search & Filter) */}
        <section className="max-w-[1200px] mx-auto px-5 mt-10 md:mt-14">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-stone-200/60">
            {/* Filter Categories */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-[#5D8D4A] text-white shadow-[0_4px_12px_rgba(93,141,74,0.2)]"
                      : "bg-[#FAF9F5] text-stone-600 hover:bg-[#5D8D4A]/10 hover:text-[#5D8D4A]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:max-w-sm">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#FAF9F5] border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/30 focus:border-[#5D8D4A] text-sm text-stone-700 transition-all placeholder:text-stone-400"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            </div>
          </div>
        </section>

        {/* Articles List / Grid */}
        <section className="max-w-[1200px] mx-auto px-5 mt-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#5D8D4A]/20 border-t-[#5D8D4A] rounded-full animate-spin mb-4"></div>
              <p className="text-stone-500 font-medium">Đang tải bài viết...</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-stone-200/60 shadow-sm">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-stone-700 mb-2">Không tìm thấy bài viết</h3>
              <p className="text-stone-500 max-w-md mx-auto text-sm">
                Không tìm thấy kết quả phù hợp với từ khóa "{searchTerm}" hoặc danh mục đã chọn. Vui lòng thử lại với từ khóa khác.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((article) => {
                const cat = getCategoryDetails(article.title);
                return (
                  <article
                    key={article.id}
                    className="group bg-white rounded-3xl overflow-hidden border border-stone-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(93,141,74,0.08)] hover:border-[#5D8D4A]/30 transition-all duration-300 flex flex-col h-full"
                  >
                    {/* Cover Image / Image Placeholder */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 border-b border-stone-100">
                      {article.cover_image ? (
                        <img
                          src={article.cover_image}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${cat.bgGradient} flex flex-col items-center justify-center transition-transform duration-700 group-hover:scale-105`}>
                          <span className="text-5xl mb-2">{cat.emoji}</span>
                          <span className="text-[#3A5B2C] font-bold text-xs uppercase tracking-wider">{cat.label}</span>
                        </div>
                      )}
                      <span className={`absolute top-4 left-4 text-white text-[11px] font-bold px-3 py-1.5 rounded-full ${cat.color} shadow-sm z-10`}>
                        {cat.label}
                      </span>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 text-[13px] text-stone-500 mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-[#ED9717]" />
                          {article.published_date || "Mới đây"}
                        </span>
                        {article.author && (
                          <span className="flex items-center gap-1.5">
                            <User size={14} className="text-[#5D8D4A]" />
                            {article.author}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl text-[#3A5B2C] font-bold leading-snug mb-4 group-hover:text-[#5D8D4A] transition-colors line-clamp-2">
                        {article.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-stone-600 text-sm leading-relaxed mb-6 line-clamp-3 font-light flex-grow">
                        {article.excerpt || (article.content ? article.content.substring(0, 120) + "..." : "")}
                      </p>

                      {/* Action */}
                      <div className="pt-4 border-t border-stone-100 mt-auto">
                        <a
                          href={`/tin-tuc/${article.id}`}
                          className="inline-flex items-center gap-2 text-sm font-bold text-[#5D8D4A] group-hover:text-[#3A5B2C] transition-colors"
                        >
                          Đọc toàn bộ bài viết
                          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}