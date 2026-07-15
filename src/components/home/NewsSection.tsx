import React from "react";
import { ArrowRight, Calendar } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Orya đồng hành cùng Hội thảo Sản phụ khoa 2024",
    excerpt:
      "Orya vinh dự là nhà tài trợ vàng tại Hội thảo Sản phụ khoa toàn quốc lần thứ 15, quy tụ hơn 500 bác sĩ và chuyên gia y tế.",
    date: "15/03/2024",
    category: "Sự kiện",
    categoryColor: "bg-[#5D8D4A]",
    bgColor: "from-[#E3F2FD] to-[#BBDEFB]",
  },
  {
    id: 2,
    title: "Bí quyết chăm sóc da mẹ bầu tháng cuối thai kỳ",
    excerpt:
      "Những tháng cuối thai kỳ, làn da mẹ bầu cần được chăm sóc đặc biệt. Cùng Orya tìm hiểu cách ngăn ngừa rạn da hiệu quả.",
    date: "10/03/2024",
    category: "Kiến thức",
    categoryColor: "bg-[#ED9717]",
    bgColor: "from-[#FFF3E0] to-[#FFE0B2]",
  },
  {
    id: 3,
    title: "Orya ra mắt dòng sản phẩm mới: Nước tắm gội thiên nhiên",
    excerpt:
      "Dòng sản phẩm Orya Kids mới với công thức pH 5.5, không SLS, được kiểm nghiệm tại bệnh viện Nhi Trung Ương.",
    date: "05/03/2024",
    category: "Sản phẩm",
    categoryColor: "bg-[#5CC9FF]",
    bgColor: "from-[#E0F7FA] to-[#B2EBF2]",
  },
];

export default function NewsSection() {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded overflow-hidden group transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-[#E5E5E5]"
            >
              {/* Image placeholder */}
              <div className={`w-full h-48 bg-gradient-to-br ${article.bgColor} flex items-center justify-center relative overflow-hidden`}>
                <div className="text-center">
                  <span className="text-4xl mb-2 block">📰</span>
                  <p className="text-[#5D8D4A] font-bold text-sm">{article.category}</p>
                </div>
                <span className={`absolute top-3 left-3 ${article.categoryColor} text-white text-xs font-bold px-3 py-1 rounded`}>
                  {article.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-[#404041] text-xs mb-3">
                  <Calendar size={14} className="text-[#ED9717]" />
                  {article.date}
                </div>
                <h3 className="text-[#5D8D4A] font-bold text-base leading-6 mb-3 line-clamp-2 group-hover:text-[#6CA356] transition-colors">
                  {article.title}
                </h3>
                <p className="text-[#404041] text-sm leading-6 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <a
                  href={`/tin-tuc/${article.id}`}
                  className="inline-flex items-center gap-1 text-[#5D8D4A] text-sm font-bold hover:text-[#4A7A38] transition-colors"
                >
                  Đọc tiếp
                  <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}