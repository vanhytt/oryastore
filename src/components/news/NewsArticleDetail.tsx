"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, ChevronRight, User } from "lucide-react";
import { getPublishedNews, type NewsItem } from "@/src/lib/dbService";

interface NewsArticleDetailProps {
  articleId: string;
}

export default function NewsArticleDetail({
  articleId,
}: NewsArticleDetailProps) {
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    async function loadArticle() {
      try {
        const timeout = new Promise<never>((_, reject) => {
          timeoutId = setTimeout(
            () => reject(new Error("Hết thời gian chờ khi tải bài viết")),
            10000,
          );
        });
        const allArticles = await Promise.race([getPublishedNews(), timeout]);
        const found = allArticles.find(
          (item) => item.id.toString() === articleId,
        );

        if (active) {
          setArticle(found ?? null);
          setRelatedArticles(
            allArticles
              .filter((item) => item.id.toString() !== articleId)
              .slice(0, 3),
          );
          setLoadError(false);
        }
      } catch (error) {
        console.error("Lỗi lấy chi tiết bài viết:", error);
        if (active) {
          setArticle(null);
          setRelatedArticles([]);
          setLoadError(true);
        }
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
        if (active) setLoading(false);
      }
    }

    void loadArticle();
    return () => {
      active = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [articleId]);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FAF9F5] py-20">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#5D8D4A]/20 border-t-[#5D8D4A]" />
        <p className="font-medium text-stone-500">Đang tải bài viết...</p>
      </main>
    );
  }

  if (loadError || !article) {
    return (
      <main className="min-h-screen bg-[#FAF9F5] py-20 text-center">
        <div className="mx-auto max-w-[1200px] px-5">
          <span className="mb-6 block text-6xl">{loadError ? "⚠️" : "🚫"}</span>
          <h1 className="mb-4 text-3xl font-bold text-[#3A5B2C]">
            {loadError ? "Chưa thể tải bài viết" : "Không tìm thấy bài viết"}
          </h1>
          <p className="mx-auto mb-8 max-w-md text-stone-600">
            {loadError
              ? "Đã xảy ra lỗi khi kết nối tới nguồn tin tức. Vui lòng thử lại."
              : "Bài viết này không tồn tại hoặc đã bị gỡ bỏ khỏi hệ thống."}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {loadError && (
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-full bg-[#5D8D4A] px-6 py-3 font-bold text-white transition-colors hover:bg-[#4d753d]"
              >
                Thử tải lại
              </button>
            )}
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 rounded-full bg-[#5D8D4A] px-6 py-3 font-bold text-white transition-all hover:bg-[#4d753d]"
            >
              <ArrowLeft size={16} /> Quay lại trang tin tức
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F5] pb-20 text-[#2c3527] selection:bg-[#5D8D4A]/10 selection:text-[#5D8D4A]">
      <div className="pointer-events-none fixed inset-0 z-40 bg-[radial-gradient(#000_1px,transparent_1px)] opacity-[0.015] [background-size:16px_16px]" />

      <nav className="mx-auto flex max-w-[800px] flex-wrap items-center gap-2 px-5 pt-8 text-sm text-stone-500 md:pt-12">
        <Link href="/" className="transition-colors hover:text-[#5D8D4A]">
          Trang chủ
        </Link>
        <ChevronRight size={14} />
        <Link
          href="/tin-tuc"
          className="transition-colors hover:text-[#5D8D4A]"
        >
          Tin tức
        </Link>
        <ChevronRight size={14} />
        <span className="line-clamp-1 max-w-[300px] text-stone-800">
          {article.title}
        </span>
      </nav>

      <article className="mx-auto max-w-[800px] px-5 pt-6">
        <header className="mb-8">
          <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-[#3A5B2C] md:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 border-b border-stone-200 pb-6 text-sm text-stone-500">
            {article.published_date && (
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#ED9717]" />
                <span>{article.published_date}</span>
              </div>
            )}
            {article.author && (
              <div className="flex items-center gap-2">
                <User size={16} className="text-[#5D8D4A]" />
                <span className="font-medium text-stone-700">
                  {article.author}
                </span>
              </div>
            )}
          </div>
        </header>

        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-[2rem] border border-stone-200/50 bg-stone-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
          {article.cover_image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.cover_image}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        {article.excerpt && (
          <div className="mb-8 rounded-r-2xl border-l-4 border-[#5D8D4A] bg-stone-50 p-6 shadow-sm">
            <p className="text-base italic leading-relaxed text-stone-600 md:text-lg">
              {article.excerpt}
            </p>
          </div>
        )}

        <div className="prose prose-stone mb-14 max-w-none">
          {article.content.split("\n").map((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;
            return (
              <p
                key={index}
                className="mb-6 text-base font-light leading-relaxed text-stone-700 md:text-lg"
              >
                {trimmed}
              </p>
            );
          })}
        </div>

        <div className="mb-16 flex items-center justify-between border-t border-stone-200 pt-8">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 font-bold text-[#5D8D4A] transition-colors hover:text-[#3A5B2C]"
          >
            <ArrowLeft size={16} /> Quay lại danh sách bài viết
          </Link>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="border-t border-stone-200 bg-stone-100/50 py-16">
          <div className="mx-auto max-w-[1200px] px-5">
            <h2 className="mb-10 text-center text-2xl font-bold text-[#3A5B2C]">
              Bài viết liên quan
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {relatedArticles.map((item) => (
                <Link
                  key={item.id}
                  href={`/tin-tuc/${item.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/50 bg-white transition-all duration-300 hover:border-[#5D8D4A]/20 hover:shadow-[0_8px_25px_rgba(93,141,74,0.06)]"
                >
                  <div className="relative aspect-[16/10] border-b border-stone-100 bg-stone-50">
                    {item.cover_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.cover_image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-grow flex-col p-5">
                    <span className="mb-2 block text-[12px] text-stone-400">
                      {item.published_date}
                    </span>
                    <h3 className="mb-2 line-clamp-2 text-base font-bold leading-snug text-[#3A5B2C] transition-colors group-hover:text-[#5D8D4A]">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="mt-auto line-clamp-2 text-xs font-light leading-relaxed text-stone-500">
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
