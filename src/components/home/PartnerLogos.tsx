"use client";

import React from "react";
import type { Partner } from "@/src/lib/dbService";

interface PartnerLogosProps {
  partners: Partner[];
}

function LogoCard({ name, logo, link }: { name: string; logo: string; link?: string }) {
  const fallbackColor = ["#ED9717", "#F6ABB4", "#5D8D4A", "#5CC9FF"][Math.abs(name.length) % 4];
  return (
    <div className="flex-shrink-0 w-40 h-20 bg-white rounded border border-[#E5E5E5] flex items-center justify-center mx-3 hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-300 group">
      {logo ? (
        <img src={logo} alt={name} className="max-h-10 max-w-24 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
      ) : (
        <div className="text-center">
          <div
            className="w-8 h-8 rounded mx-auto mb-1 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ backgroundColor: fallbackColor }}
          >
            <span className="text-white text-xs font-bold">{name.charAt(0)}</span>
          </div>
          <p className="text-[#404041] text-xs font-semibold opacity-60 group-hover:opacity-100 transition-opacity">
            {name}
          </p>
        </div>
      )}
    </div>
  );
}

export default function PartnerLogos({ partners }: PartnerLogosProps) {
  const partnerList = partners?.length ? partners : [];

  return (
    <section className="py-12 md:py-16 bg-[#F8F8F8] border-t border-b border-[#E5E5E5]">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Logo slider */}
        {partnerList.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#5D8D4A]/20 bg-white p-8 text-center text-[#404041]/70">
            Chưa có dữ liệu đối tác để hiển thị.
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="flex w-max animate-slide-left">
              {Array.from({ length: 3 }).map((_, copyIndex) => (
                <div key={`partner-copy-${copyIndex}`} className="flex shrink-0 items-center pr-3">
                  {partnerList.map((partner, index) => (
                    <LogoCard key={`${partner.name}-${copyIndex}-${index}`} name={partner.name} logo={partner.logo} link={partner.link} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}