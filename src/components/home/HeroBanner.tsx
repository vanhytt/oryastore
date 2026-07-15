"use client";

import React from "react";

export default function HeroBanner() {
  return (
    <section className="w-full relative overflow-hidden bg-white">
      <a href="#order-form" className="block w-full transition-opacity hover:opacity-95">
        <img
          src="/banner.jpg"
          alt="Orya Family Care Banner"
          className="w-full h-auto block"
        />
      </a>
    </section>
  );
}