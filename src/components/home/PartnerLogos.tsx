"use client";

import React from "react";

const partners = [
  { name: "KidsPlaza", color: "#ED9717" },
  { name: "Con Cưng", color: "#F6ABB4" },
  { name: "Long Châu", color: "#5D8D4A" },
  { name: "Pharmacity", color: "#5CC9FF" },
  { name: "Guardian", color: "#5D8D4A" },
  { name: "Hasaki", color: "#ED9717" },
  { name: "Medicare", color: "#F6ABB4" },
  { name: "An Khang", color: "#5D8D4A" },
];

function LogoCard({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex-shrink-0 w-40 h-20 bg-white rounded border border-[#E5E5E5] flex items-center justify-center mx-3 hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-300 group">
      <div className="text-center">
        <div
          className="w-8 h-8 rounded mx-auto mb-1 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: color }}
        >
          <span className="text-white text-xs font-bold">{name.charAt(0)}</span>
        </div>
        <p className="text-[#404041] text-xs font-semibold opacity-60 group-hover:opacity-100 transition-opacity">
          {name}
        </p>
      </div>
    </div>
  );
}

export default function PartnerLogos() {
  return (
    <section className="py-12 md:py-16 bg-[#F8F8F8] border-t border-b border-[#E5E5E5]">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[#5D8D4A] font-bold text-lg">
            Đối tác phân phối tin cậy
          </p>
          <p className="text-[#404041] text-sm mt-1">
            Orya có mặt tại hệ thống cửa hàng uy tín trên toàn quốc
          </p>
        </div>

        {/* Logo slider */}
        <div className="overflow-hidden">
          <div className="flex animate-slide-left" style={{ width: "max-content" }}>
            {/* Duplicate the logos for infinite scroll effect */}
            {[...partners, ...partners].map((partner, index) => (
              <LogoCard key={`${partner.name}-${index}`} name={partner.name} color={partner.color} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}