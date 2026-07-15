import React from "react";
import { CircleCheck, Award, Heart, Shield } from "lucide-react";

const highlights = [
  {
    icon: <Heart size={20} className="text-[#ED9717]" />,
    title: "Ra đời từ tình yêu thương",
    description:
      "Orya được sáng lập bởi các chuyên gia dược học và những người mẹ đam mê chăm sóc sức khỏe gia đình.",
  },
  {
    icon: <Shield size={20} className="text-[#ED9717]" />,
    title: "An toàn tuyệt đối",
    description:
      "Không chứa hóa chất độc hại, không SLS, không Paraben. Phù hợp với da nhạy cảm của mẹ bầu và trẻ sơ sinh.",
  },
  {
    icon: <Award size={20} className="text-[#ED9717]" />,
    title: "Chứng nhận quốc tế",
    description:
      "Đạt chứng nhận Vegan, tiêu chuẩn CGMP-ASEAN và nhiều chứng nhận quốc tế khác về chất lượng mỹ phẩm.",
  },
  {
    icon: <CircleCheck size={20} className="text-[#ED9717]" />,
    title: "Được nghiên cứu lâm sàng",
    description:
      "Qua kiểm nghiệm lâm sàng tại các bệnh viện lớn, đảm bảo hiệu quả và an toàn với tỷ lệ hài lòng 98,5%.",
  },
];

const stats = [
  { value: "1M+", label: "Mẹ tin dùng" },
  { value: "10+", label: "Năm kinh nghiệm" },
  { value: "50+", label: "Sản phẩm" },
  { value: "98%", label: "Hài lòng" },
];

export default function BrandStory() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-[#F0F8FF] to-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              <div className="w-full h-[420px] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(36,85,143,0.15)]">
                <img
                  src="/about.jpg"
                  alt="Về Orya"
                  className="w-full h-full object-cover block"
                />
              </div>

              {/* Stats overlay */}
              <div className="absolute -bottom-6 left-4 right-4 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-4">
                <div className="grid grid-cols-4 gap-2">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-[#5D8D4A] font-bold text-xl md:text-2xl">{stat.value}</p>
                      <p className="text-[#404041] text-xs mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <span className="inline-block px-4 py-1.5 bg-[#ED9717]/10 text-[#ED9717] text-sm font-bold rounded-full mb-4">
              Câu chuyện thương hiệu
            </span>
            <h2 className="text-[#5D8D4A] font-bold text-3xl md:text-4xl leading-tight mb-5">
              Orya — Nâng niu làn da mẹ &amp; bé từ thiên nhiên
            </h2>
            <p className="text-[#404041] text-base md:text-lg leading-7 mb-8">
              Được nghiên cứu và phát triển bởi đội ngũ chuyên gia dược học hàng đầu tại
              CVI Pharma, Orya mang đến giải pháp chăm sóc da toàn diện, an toàn và
              hiệu quả cho mẹ bầu và trẻ sơ sinh. Mỗi sản phẩm là sự kết tinh từ tình
              yêu thương và khoa học hiện đại.
            </p>

            {/* Highlights */}
            <div className="space-y-5">
              {highlights.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#ED9717]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-[#5D8D4A] font-bold text-base mb-1">{item.title}</h3>
                    <p className="text-[#404041] text-sm leading-6">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/thuong-hieu"
              className="inline-flex items-center gap-2 mt-8 bg-[#5D8D4A] text-white font-bold px-6 py-3 hover:bg-[#6CA356] transition-colors min-h-[44px]"
            >
              Tìm hiểu thêm về Orya
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}