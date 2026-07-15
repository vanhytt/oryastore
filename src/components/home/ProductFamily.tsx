"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/src/lib/cartContext";
import ProductCard from "../ui/ProductCard";

const products = [
  {
    id: 1,
    name: "Dầu rạn da Orya cho mẹ bầu",
    description:
      "Dầu massage ngăn ngừa và giảm rạn da cho mẹ bầu. Chiết xuất 100% từ thảo dược thiên nhiên, an toàn tuyệt đối cho mẹ và bé.",
    price: "350.000đ",
    originalPrice: "450.000đ",
    image: "",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Kem bôi ngực Orya sau sinh",
    description:
      "Kem dưỡng da ngực chuyên biệt sau sinh, giúp phục hồi và săn chắc da. Thành phần lành tính, không ảnh hưởng sữa mẹ.",
    price: "280.000đ",
    originalPrice: "380.000đ",
    image: "",
    badge: "Mới",
  },
  {
    id: 3,
    name: "Nước tắm gội Orya Kids",
    description:
      "Nước tắm gội 2 trong 1 dành cho trẻ sơ sinh và trẻ nhỏ. pH cân bằng 5.5, không SLS, không cồn, không gây kích ứng.",
    price: "195.000đ",
    originalPrice: "250.000đ",
    image: "",
    badge: "Vegan",
  },
  {
    id: 4,
    name: "Dưỡng thể Orya Baby",
    description:
      "Kem dưỡng ẩm toàn thân cho bé, giúp da mềm mại mịn màng suốt cả ngày. Công thức nhẹ nhàng, thẩm thấu nhanh.",
    price: "220.000đ",
    image: "",
  },
];

// Product image placeholder component
function ProductImagePlaceholder({ product }: { product: (typeof products)[0] }) {
  const colors: Record<number, string> = {
    1: "from-[#5D8D4A] to-[#4A7A38]",
    2: "from-[#F6ABB4] to-[#e8899a]",
    3: "from-[#5CC9FF] to-[#3ab5ed]",
    4: "from-[#ED9717] to-[#c07a0e]",
  };

  return (
    <div className={`w-full h-56 bg-gradient-to-b ${colors[product.id] || colors[1]} flex items-center justify-center`}>
      <div className="text-center text-white px-4">
        <div className="w-12 h-12 bg-white rounded-full mx-auto mb-3 flex items-center justify-center">
          <span className="text-[#5D8D4A] font-bold text-lg">O</span>
        </div>
        <p className="text-sm font-bold leading-tight">{product.name.split(" ").slice(0, 3).join(" ")}</p>
      </div>
    </div>
  );
}

export default function ProductFamily() {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = (product: typeof products[0]) => {
    const priceValue = parseInt(product.price.replace(/\D/g, "")) || 0;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      priceValue: priceValue,
      image: product.image || undefined,
    });
  };

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
          {products.map((product) => (
            <div key={product.id} className="relative flex flex-col h-full">
              {/* If no image, show placeholder inside the card structure */}
              {!product.image ? (
                <div className="bg-white rounded group transition-all duration-300 hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col h-full">
                  <div className="relative overflow-hidden">
                    {product.badge && (
                      <span className="absolute top-3 left-3 z-10 bg-[#ED9717] text-white text-xs font-bold px-2 py-1">
                        {product.badge}
                      </span>
                    )}
                    <ProductImagePlaceholder product={product} />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-[#5D8D4A] font-bold text-lg leading-[25.2px] mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-[#404041] text-sm leading-5 mb-4 flex-1 line-clamp-3">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[#ED9717] font-bold text-xl">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-gray-400 text-sm line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-bold text-[#5D8D4A] border-2 border-[#5D8D4A] px-3 py-2 hover:bg-[#5D8D4A] hover:text-white transition-all min-h-[44px]"
                      >
                        Xem chi tiết
                      </Link>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-bold bg-[#ED9717] text-white px-3 py-2 hover:bg-[#d4880f] transition-colors min-h-[44px] cursor-pointer"
                      >
                        Thêm giỏ hàng
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <ProductCard
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  badge={product.badge}
                  onAddToCart={() => handleAddToCart(product)}
                  onViewDetail={(id) => router.push(`/products/${id}`)}
                />
              )}
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