import React from "react";

const certificates = [
  {
    id: 1,
    title: "Vegan Certified",
    subtitle: "Chứng nhận thuần chay",
    description: "Không thử nghiệm trên động vật, 100% thành phần từ thực vật và khoáng chất tự nhiên.",
    icon: "🌿",
    bgColor: "from-[#E8F5E9] to-[#C8E6C9]",
    borderColor: "border-green-300",
  },
  {
    id: 2,
    title: "CGMP-ASEAN",
    subtitle: "Tiêu chuẩn sản xuất",
    description: "Sản xuất tại nhà máy đạt chuẩn CGMP-ASEAN, đảm bảo chất lượng và vệ sinh nghiêm ngặt.",
    icon: "🏭",
    bgColor: "from-[#E3F2FD] to-[#BBDEFB]",
    borderColor: "border-blue-300",
  },
  {
    id: 3,
    title: "SLS Free",
    subtitle: "Không chất tẩy rửa mạnh",
    description: "Không chứa Sodium Lauryl Sulfate, an toàn cho da nhạy cảm của mẹ bầu và trẻ sơ sinh.",
    icon: "🛡️",
    bgColor: "from-[#FFF3E0] to-[#FFE0B2]",
    borderColor: "border-orange-300",
  },
];

export default function QualityCertificates() {
  return (
    <section className="py-16 md:py-20 bg-[#F8F8F8]">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#ED9717]/10 text-[#ED9717] text-sm font-bold rounded-full mb-4">
            Cam kết chất lượng
          </span>
          <h2 className="text-[#5D8D4A] font-bold text-3xl md:text-4xl leading-tight mb-4">
            Chứng nhận chất lượng quốc tế
          </h2>
          <p className="text-[#404041] text-base md:text-lg leading-7 max-w-2xl mx-auto">
            Orya tự hào đạt được các chứng nhận chất lượng hàng đầu thế giới,
            khẳng định cam kết an toàn và hiệu quả.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="text-center group"
            >
              {/* Circle */}
              <div className={`w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br ${cert.bgColor} border-4 ${cert.borderColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-[0_4px_20px_rgba(0,0,0,0.08)]`}>
                <span className="text-5xl">{cert.icon}</span>
              </div>

              {/* Text */}
              <h3 className="text-[#5D8D4A] font-bold text-xl mb-1">{cert.title}</h3>
              <p className="text-[#ED9717] font-semibold text-sm mb-3">{cert.subtitle}</p>
              <p className="text-[#404041] text-sm leading-6 max-w-[280px] mx-auto">
                {cert.description}
              </p>
            </div>
          ))}
        </div>

        {/* Extra trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {["✅ Kiểm nghiệm lâm sàng", "✅ Được bác sĩ khuyên dùng", "✅ Không Paraben", "✅ Không cồn"].map(
            (badge) => (
              <span
                key={badge}
                className="text-[#5D8D4A] text-sm font-semibold bg-white px-4 py-2 rounded-full shadow-sm"
              >
                {badge}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}