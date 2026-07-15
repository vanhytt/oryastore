"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-[#5D8D4A] to-[#3D6B2E] text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#6CA356] rounded-full opacity-10 blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#5CC9FF] rounded-full opacity-10 blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#ED9717] text-white text-sm font-bold rounded-full mb-4">
              Video giới thiệu
            </span>
            <h2 className="text-white font-bold text-3xl md:text-4xl leading-tight mb-5">
              Hành trình yêu thương cùng Orya
            </h2>
            <p className="text-blue-100 text-base md:text-lg leading-7 mb-6">
              Khám phá câu chuyện đằng sau mỗi sản phẩm Orya — từ nghiên cứu
              khoa học đến tay mẹ bầu. Được tin dùng tại hơn 500 bệnh viện và
              phòng khám trên toàn quốc.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Hợp tác cùng 500+ bệnh viện & phòng khám",
                "Phân phối tại hệ thống KidsPlaza, Con Cưng, Long Châu",
                "Tỷ lệ hài lòng 98,5% từ các mẹ sử dụng",
                "Đạt chuẩn CGMP-ASEAN & chứng nhận Vegan quốc tế",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-blue-100 text-sm">
                  <span className="text-[#ED9717] mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="/thuong-hieu"
              className="inline-flex items-center gap-2 bg-[#ED9717] text-white font-bold px-6 py-3 hover:bg-[#d4880f] transition-colors min-h-[44px]"
            >
              Tìm hiểu thêm
            </a>
          </div>

          {/* Right - Video Placeholder */}
          <div className="relative">
            <div
              className="relative w-full aspect-video bg-gradient-to-br from-[#5D8D4A] to-[#3D6B2E] rounded-xl overflow-hidden shadow-2xl cursor-pointer group"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <div className="w-full h-full flex items-center justify-center bg-black/80">
                  <p className="text-white text-sm">Video đang phát...</p>
                </div>
              ) : (
                <>
                  {/* Thumbnail placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm group-hover:bg-[#ED9717] transition-all duration-300">
                        <Play size={32} className="text-white ml-1" />
                      </div>
                      <p className="text-white font-bold text-lg">Xem video giới thiệu</p>
                      <p className="text-blue-200 text-sm mt-1">3:45 phút</p>
                    </div>
                  </div>

                  {/* Overlay graphics */}
                  <div className="absolute top-4 left-4 bg-[#ED9717] text-white text-xs font-bold px-3 py-1 rounded">
                    🏥 Bệnh viện tin dùng
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <span className="bg-white/20 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">HD</span>
                    <span className="bg-white/20 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">2024</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}