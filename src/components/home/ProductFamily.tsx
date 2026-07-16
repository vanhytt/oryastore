"use client";

import React from "react";
import Link from "next/link";
import ProductCard from "../ui/ProductCard";
import { Product } from "@/src/lib/dbService";

interface ProductFamilyProps {
  products: Product[];
}

export default function ProductFamily({ products = [] }: ProductFamilyProps) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#5D8D4A]/10 text-[#5D8D4A] text-sm font-bold rounded-full mb-4">
            Sản phẩm nổi bật
          </span>
          <h2 className="text-[#5D8D4A] font-bold text-3xl md:text-4xl leading-tight mb-4">
            Bộ sưu tập Orya Family Care
          </h2>
          <p className="text-[#404041] text-base md:text-lg leading-7 max-w-2xl mx-auto">
            Giải pháp chăm sóc da toàn diện dành cho mẹ bầu và trẻ sơ sinh.
            An toàn, hiệu quả, được chứng nhận quốc tế.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="relative flex flex-col h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#5D8D4A] text-white font-bold px-8 py-3 hover:bg-[#6CA356] transition-colors min-h-[44px]"
          >
            Xem tất cả sản phẩm →
          </Link>
        </div>
      </div>
    </section>
  );
}
