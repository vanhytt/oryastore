import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User, Newspaper } from "lucide-react";
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
          <div className="rounded-2xl border border-dashed border-[#5D8D4A]/20 bg-[#FAFDF9] p-10 text-center">
            <Newspaper size={40} className="text-[#5D8D4A]/30 mx-auto mb-3" />
            <p className="text-[#404041]/60 font-medium">Chưa có bài viết nào được xuất bản.</p>
            <p className="text-[#404041]/40 text-sm mt-1">Hãy đăng bài từ trang quản trị.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-[0_8px_24px_rgba(93,141,74,0.12)] hover:-translate-y-1 border border-[#E5E5E5]"
              >
                {/* Image */}
                <div className="w-full h-48 bg-gradient-to-br from-[#EAF6E7] to-[#DDECCF] flex items-center justify-center relative overflow-hidden">
                  {article.cover_image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="text-center">
                      <Newspaper size={36} className="text-[#5D8D4A]/40 mx-auto mb-2" />
                      <p className="text-[#5D8D4A] font-bold text-sm">Tin tức Orya</p>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-[#5D8D4A] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    Tin tức
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Meta: date + author */}
                  <div className="flex items-center gap-4 text-[#404041]/60 text-xs mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#ED9717]" />
                      {article.published_date || "Mới đăng"}
                    </span>
                    {article.author && (
                      <span className="flex items-center gap-1.5">
                        <User size={13} className="text-[#5D8D4A]" />
                        {article.author}
                      </span>
                    )}
                  </div>

                  <h3 className="text-[#2D3748] font-bold text-base leading-6 mb-3 line-clamp-2 group-hover:text-[#5D8D4A] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[#404041]/70 text-sm leading-6 mb-4 line-clamp-3">
                    {article.excerpt || article.content?.replace(/<[^>]+>/g, "").slice(0, 140)}
                  </p>
                  <Link
                    href={`/tin-tuc/${article.id}`}
                    className="inline-flex items-center gap-1.5 text-[#5D8D4A] text-sm font-bold hover:text-[#4A7A38] transition-colors group/link"
                  >
                    Đọc tiếp
                    <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
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
