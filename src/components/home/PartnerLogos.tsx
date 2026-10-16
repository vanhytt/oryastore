"use client";

import React from "react";
import type { Partner } from "@/src/lib/dbService";

interface PartnerLogosProps {
  partners: Partner[];
}

function LogoCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="group flex h-20 w-40 shrink-0 items-center justify-center rounded border border-[#E5E5E5] bg-white transition-all duration-300 hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] sm:h-24 sm:w-48">
      {logo ? (
        <img
          src={logo}
          alt={name}
          className="max-h-10 max-w-24 object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100 sm:max-h-12 sm:max-w-28"
        />
      ) : (
        <p className="px-3 text-center text-sm font-semibold text-[#404041]">
            {name}
        </p>
      )}
    </div>
  );
}

export default function PartnerLogos({ partners }: PartnerLogosProps) {
  const partnerList = partners ?? [];
  if (partnerList.length === 0) return null;

  return (
    <section className="border-y border-[#E5E5E5] bg-[#F8F8F8] py-8 md:py-10">
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {partnerList.map((partner) => (
            <LogoCard key={partner.id} name={partner.name} logo={partner.logo} />
          ))}
          </div>
      </div>
    </section>
  );
}