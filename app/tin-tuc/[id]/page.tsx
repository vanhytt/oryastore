"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Tag, BookOpen, ChevronRight } from "lucide-react";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { getNews, NewsItem } from "@/src/lib/dbService";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function NewsDetailPage({ params }: PageProps) {
  const [id, setId] = useState<string | null>(null);
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((res) => {
      setId(res.id);
    });
  }, [params]);

  useEffect(() => {
    if (!id) return;
    const articleId = id;

    async function loadArticle() {
      try {
        const allArticles = await getNews();
        const found = allArticles.find(
          (item) => item.id.toString() === articleId.toString()
        );
        
        if (found) {
          setArticle(found);
          // Get other articles as related
          const others = allArticles
            .filter((item) => item.id.toString() !== articleId.toString() && (item.status === "Published" || !item.status))
            .slice(0, 3);
          setRelatedArticles(others);
        }
      } catch (error) {
        console.error("Failed to load article detail:", error);
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [id]);

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

  if (loading) {
    return (
      <>
        <Header />
        <main className="bg-[#FAF9F5] min-h-screen flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-[#5D8D4A]/20 border-t-[#5D8D4A] rounded-full animate-spin mb-4"></div>
          <p className="text-stone-500 font-medium">Đang tải bài viết...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Header />
        <main className="bg-[#FAF9F5] min-h-screen py-20 text-center">
          <div className="max-w-[1200px] mx-auto px-5">
            <span className="text-6xl mb-6 block">🚫</span>
            <h1 className="text-3xl text-[#3A5B2C] font-bold mb-4">Không tìm thấy bài viết</h1>
            <p className="text-stone-600 mb-8 max-w-md mx-auto">
              Bài viết này không tồn tại hoặc đã bị gỡ bỏ khỏi hệ thống.
            </p>
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 bg-[#5D8D4A] text-white font-bold px-6 py-3 rounded-full hover:bg-[#4d753d] transition-all"
            >
              <ArrowLeft size={16} /> Quay lại trang tin tức
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const cat = getCategoryDetails(article.title);

  return (
    <>
      <Header />
      <main className="bg-[#FAF9F5] text-[#2c3527] min-h-screen pb-20 selection:bg-[#5D8D4A]/10 selection:text-[#5D8D4A]">
        {/* Background grain noise effect */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.015] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] z-40"></div>

        {/* Breadcrumb Section */}
        <nav className="max-w-[800px] mx-auto px-5 pt-8 md:pt-12 text-sm text-stone-500 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-[#5D8D4A] transition-colors">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link href="/tin-tuc" className="hover:text-[#5D8D4A] transition-colors">Tin tức</Link>
          <ChevronRight size={14} />
          <span className="text-stone-800 line-clamp-1 max-w-[300px]">{article.title}</span>
        </nav>

        {/* Article Layout Container */}
        <article className="max-w-[800px] mx-auto px-5 pt-6">
          
          {/* Header Title Info */}
          <header className="mb-8">
            <span className={`inline-block px-4.5 py-1.5 rounded-full text-white text-[11px] font-bold tracking-wider uppercase mb-5 ${cat.color}`}>
              {cat.label}
            </span>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#3A5B2C] font-bold leading-tight tracking-tight mb-6">
              {article.title}
            </h1>

            {/* Author and Date */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-stone-500 pb-6 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#ED9717]" />
                <span>{article.published_date || "Mới đây"}</span>
              </div>
              {article.author && (
                <div className="flex items-center gap-2">
                  <User size={16} className="text-[#5D8D4A]" />
                  <span className="font-medium text-stone-700">{article.author}</span>
                </div>
              )}
            </div>
          </header>

          {/* Featured Cover Image */}
          <div className="relative aspect-[16/9] w-full rounded-[2rem] overflow-hidden bg-stone-100 mb-10 shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-stone-200/50">
            {article.cover_image ? (
              <img
                src={article.cover_image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${cat.bgGradient} flex flex-col items-center justify-center`}>
                <span className="text-7xl mb-3">{cat.emoji}</span>
                <span className="text-[#3A5B2C] font-bold text-sm uppercase tracking-wider">{cat.label}</span>
              </div>
            )}
          </div>

          {/* Excerpt Block */}
          {article.excerpt && (
            <div className="bg-stone-50 border-l-4 border-[#5D8D4A] p-6 rounded-r-2xl mb-8 shadow-sm">
              <p className="italic text-stone-600 text-base md:text-lg leading-relaxed">
                {article.excerpt}
              </p>
            </div>
          )}

          {/* Body Content */}
          <div className="prose prose-stone max-w-none mb-14">
            {article.content &&
              article.content.split("\n").map((paragraph, index) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;
                return (
                  <p key={index} className="text-stone-700 text-base md:text-lg leading-relaxed mb-6 font-light">
                    {trimmed}
                  </p>
                );
              })}
          </div>

          {/* Back Button */}
          <div className="pt-8 border-t border-stone-200 mb-16 flex justify-between items-center">
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 text-[#5D8D4A] hover:text-[#3A5B2C] font-bold transition-colors"
            >
              <ArrowLeft size={16} /> Quay lại danh sách bài viết
            </Link>
          </div>
        </article>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="bg-stone-100/50 border-t border-stone-200 py-16">
            <div className="max-w-[1200px] mx-auto px-5">
              <h2 className="text-[#3A5B2C] text-2xl font-bold mb-10 text-center">
                Bài viết liên quan
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((item) => {
                  const relatedCat = getCategoryDetails(item.title);
                  return (
                    <Link
                      key={item.id}
                      href={`/tin-tuc/${item.id}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-stone-200/50 hover:shadow-[0_8px_25px_rgba(93,141,74,0.06)] hover:border-[#5D8D4A]/20 transition-all duration-300 flex flex-col h-full"
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/10] bg-stone-50 border-b border-stone-100">
                        {item.cover_image ? (
                          <img
                            src={item.cover_image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${relatedCat.bgGradient} flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105`}>
                            <span className="text-4xl mb-1">{relatedCat.emoji}</span>
                            <span className="text-[#3A5B2C] text-[10px] font-bold uppercase tracking-wider">{relatedCat.label}</span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-5 flex flex-col flex-grow">
                        <span className="text-[12px] text-stone-400 mb-2 block">{item.published_date}</span>
                        <h3 className="text-[#3A5B2C] font-bold text-base leading-snug mb-2 group-hover:text-[#5D8D4A] transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-stone-500 text-xs leading-relaxed line-clamp-2 font-light mt-auto">
                          {item.excerpt || (item.content ? item.content.substring(0, 80) + "..." : "")}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}