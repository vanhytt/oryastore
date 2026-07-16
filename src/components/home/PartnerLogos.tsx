"use client";

import React from "react";
import type { Partner } from "@/src/lib/dbService";

interface PartnerLogosProps {
  partners: Partner[];
}

function LogoCard({ name, logo }: { name: string; logo: string }) {
  const fallbackColor = ["#ED9717", "#F6ABB4", "#5D8D4A", "#5CC9FF"][Math.abs(name.length) % 4];

  return (
    <div className="group flex h-20 w-40 shrink-0 items-center justify-center rounded border border-[#E5E5E5] bg-white transition-all duration-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] sm:h-24 sm:w-48">
      {logo ? (
        <img
          src={logo}
          alt={name}
          className="max-h-10 max-w-24 object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100 sm:max-h-12 sm:max-w-28"
        />
      ) : (
        <div className="text-center">
          <div
            className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded opacity-60 transition-opacity duration-300 group-hover:opacity-100"
            style={{ backgroundColor: fallbackColor }}
          >
            <span className="text-xs font-bold text-white">{name.charAt(0)}</span>
          </div>
          <p className="text-[11px] font-semibold text-[#404041] opacity-60 transition-opacity duration-300 group-hover:opacity-100">
            {name}
          </p>
        </div>
      )}
    </div>
  );
}

export default function PartnerLogos({ partners }: PartnerLogosProps) {
  const partnerList = partners?.length ? partners : [];
  let displayPartners = [...partnerList];

  if (partnerList.length > 0) {
    while (displayPartners.length < 20) {
      displayPartners = [...displayPartners, ...partnerList];
    }
  }

  return (
    <section className="border-y border-[#E5E5E5] bg-[#F8F8F8] py-8 md:py-10">
      <div className="mx-auto max-w-[1200px] px-5">
        {partnerList.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#5D8D4A]/20 bg-white p-8 text-center text-[#404041]/70">
            Chưa có dữ liệu đối tác để hiển thị.
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="marquee-track flex w-max items-center gap-3 sm:gap-4">
              {displayPartners.map((partner, index) => (
                <div key={`${partner.name}-${index}`} className="shrink-0">
                  <LogoCard name={partner.name} logo={partner.logo} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}