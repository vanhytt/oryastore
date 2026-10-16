"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Calendar, Search, User } from "lucide-react";
import { getPublishedNews, type NewsItem } from "@/src/lib/dbService";

export default function NewsList() {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let active = true;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    async function loadArticles() {
      try {
        const timeout = new Promise<never>((_, reject) => {
          timeoutId = setTimeout(
            () => reject(new Error("Hết thời gian chờ khi tải tin tức")),
            10000,
          );
        });
        const result = await Promise.race([getPublishedNews(), timeout]);
        if (active) {
          setArticles(result);
          setLoadError(false);
        }
      } catch (error) {
        console.error("Lỗi lấy danh sách bài viết:", error);
        if (active) {
          setArticles([]);
          setLoadError(true);
        }
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
        if (active) setLoading(false);
      }
    }

    void loadArticles();
    return () => {
      active = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [reloadToken]);

  const filteredNews = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return articles;

    return articles.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.excerpt.toLowerCase().includes(term) ||
        item.content.toLowerCase().includes(term),
    );
  }, [articles, searchTerm]);

  return (
    <main className="min-h-screen bg-[#FAF9F5] pb-20 text-[#2c3527] selection:bg-[#5D8D4A]/10 selection:text-[#5D8D4A]">
      <div className="pointer-events-none fixed inset-0 z-40 bg-[radial-gradient(#000_1px,transparent_1px)] opacity-[0.015] [background-size:16px_16px]" />

      <section className="relative overflow-hidden border-b border-[#5D8D4A]/10 bg-[#5D8D4A]/5 py-16 md:py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5D8D4A]/10 blur-[100px]" />
        <div className="relative mx-auto max-w-[1200px] px-5 text-center">
          <span className="mb-4 inline-block rounded-full bg-[#5D8D4A]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5D8D4A]">
            Cẩm nang gia đình
          </span>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-[#3A5B2C] md:text-5xl lg:text-6xl">
            Góc Tin Tức &amp; Chia Sẻ
          </h1>
          <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-stone-600 md:text-lg">
            Nơi cập nhật những hoạt động nổi bật của Orya cùng kiến thức khoa
            học hữu ích về chăm sóc sức khỏe mẹ bầu và bé yêu.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-[1200px] px-5 md:mt-14">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-stone-200/60 bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="relative w-full">
            <input
              type="search"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-full border border-stone-200 bg-[#FAF9F5] py-2 pl-10 pr-4 text-sm text-stone-700 transition-all placeholder:text-stone-400 focus:border-[#5D8D4A] focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/30"
            />
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-[1200px] px-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#5D8D4A]/20 border-t-[#5D8D4A]" />
            <p className="font-medium text-stone-500">Đang tải bài viết...</p>
          </div>
        ) : loadError ? (
          <div
            role="alert"
            className="rounded-3xl border border-stone-200/60 bg-white py-20 text-center shadow-sm"
          >
            <div className="mb-4 text-5xl">⚠️</div>
            <h2 className="mb-2 text-lg font-bold text-stone-700">
              Chưa thể tải bài viết
            </h2>
            <p className="mx-auto mb-5 max-w-md text-sm text-stone-500">
              Đã xảy ra lỗi khi kết nối tới nguồn tin tức. Vui lòng tải lại trang
              để thử lại.
            </p>
            <button
              type="button"
              onClick={() => {
                setLoading(true);
                setReloadToken((token) => token + 1);
              }}
              className="rounded-full bg-[#5D8D4A] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#4B733B]"
            >
              Thử tải lại
            </button>
          </div>
        ) : articles.length === 0 ? (
          <div className="rounded-3xl border border-stone-200/60 bg-white py-20 text-center shadow-sm">
            <div className="mb-4 text-5xl">📰</div>
            <h2 className="mb-2 text-lg font-bold text-stone-700">
              Chưa có bài viết nào được đăng
            </h2>
            <p className="mx-auto max-w-md text-sm text-stone-500">
              Các bài viết mới sẽ được cập nhật tại đây.
            </p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="rounded-3xl border border-stone-200/60 bg-white py-20 text-center shadow-sm">
            <div className="mb-4 text-5xl">🔍</div>
            <h2 className="mb-2 text-lg font-bold text-stone-700">
              Không tìm thấy bài viết
            </h2>
            <p className="mx-auto max-w-md text-sm text-stone-500">
              Không tìm thấy kết quả phù hợp với từ khóa &quot;{searchTerm}
              &quot;. Vui lòng thử lại.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((article) => (
              <article
                key={article.id}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200/60 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 hover:border-[#5D8D4A]/30 hover:shadow-[0_12px_30px_rgba(93,141,74,0.08)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-stone-100 bg-stone-100">
                  {article.cover_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={article.cover_image}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : null}
                </div>

                <div className="flex flex-grow flex-col p-6 md:p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-[13px] text-stone-500">
                    {article.published_date && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-[#ED9717]" />
                        {article.published_date}
                      </span>
                    )}
                    {article.author && (
                      <span className="flex items-center gap-1.5">
                        <User size={14} className="text-[#5D8D4A]" />
                        {article.author}
                      </span>
                    )}
                  </div>

                  <h2 className="mb-4 line-clamp-2 text-xl font-bold leading-snug text-[#3A5B2C] transition-colors group-hover:text-[#5D8D4A]">
                    {article.title}
                  </h2>

                  {article.excerpt && (
                    <p className="mb-6 line-clamp-3 flex-grow text-sm font-light leading-relaxed text-stone-600">
                      {article.excerpt}
                    </p>
                  )}

                  <div className="mt-auto border-t border-stone-100 pt-4">
                    <a
                      href={`/tin-tuc/${article.id}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#5D8D4A] transition-colors group-hover:text-[#3A5B2C]"
                    >
                      Đọc toàn bộ bài viết
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
