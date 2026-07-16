import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import type { NewsItem } from "@/src/lib/dbService";

interface NewsSectionProps {
  news: NewsItem[];
}

export default function NewsSection({ news }: NewsSectionProps) {
  const articles = news.slice(0, 3);
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#5D8D4A]/10 text-[#5D8D4A] text-sm font-bold rounded-full mb-4">
              Tin tức & Sự kiện
            </span>
            <h2 className="text-[#5D8D4A] font-bold text-3xl md:text-4xl leading-tight">
              Cập nhật từ Orya
            </h2>
          </div>
          <a
            href="/tin-tuc"
            className="inline-flex items-center gap-2 text-[#5D8D4A] font-bold text-base hover:text-[#4A7A38] transition-colors"
          >
            Xem tất cả bài viết
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#5D8D4A]/20 bg-[#FAFDF9] p-10 text-center text-[#404041]/70">
            Chưa có bài viết nào để hiển thị tại thời điểm này.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded overflow-hidden group transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-[#E5E5E5]"
              >
                {/* Image placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-[#EAF6E7] to-[#DDECCF] flex items-center justify-center relative overflow-hidden">
                  {article.cover_image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-4xl mb-2 block">📰</span>
                      <p className="text-[#5D8D4A] font-bold text-sm">Tin tức Orya</p>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-[#5D8D4A] text-white text-xs font-bold px-3 py-1 rounded">
                    Tin tức
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[#404041] text-xs mb-3">
                    <Calendar size={14} className="text-[#ED9717]" />
                    {article.published_date || "Mới đăng"}
                  </div>
                  <h3 className="text-[#5D8D4A] font-bold text-base leading-6 mb-3 line-clamp-2 group-hover:text-[#6CA356] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[#404041] text-sm leading-6 mb-4 line-clamp-3">
                    {article.excerpt || article.content?.replace(/<[^>]+>/g, "").slice(0, 140)}
                  </p>
                  <Link
                    href={`/tin-tuc/${article.id}`}
                    className="inline-flex items-center gap-1 text-[#5D8D4A] text-sm font-bold hover:text-[#4A7A38] transition-colors"
                  >
                    Đọc tiếp
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}