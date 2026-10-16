"use client";

import React, { useState, useEffect } from "react";

export default function HeroBanner() {
  const [bannerUrl, setBannerUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch banner from API
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.hero_banner === "string" && data.hero_banner.trim()) {
          setBannerUrl(data.hero_banner);
        }
      })
      .catch((err) => {
        console.error("Error fetching banner:", err);
      });
  }, []);

  if (!bannerUrl) return null;

  return (
    <section className="w-full relative overflow-hidden bg-white">
      <a href="#order-form" className="block w-full transition-opacity hover:opacity-95">
        <img
          src={bannerUrl}
          alt="Orya Family Care Banner"
          className="w-full h-auto block"
        />
      </a>
    </section>
  );
}