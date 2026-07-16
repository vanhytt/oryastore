"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { ShoppingCart, Eye, Star } from "lucide-react";
import { Product } from "@/src/lib/dbService";
import { useCart } from "@/src/lib/cartContext";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

// Product image placeholder component
function ProductImagePlaceholder({ name, slug }: { name: string; slug?: string }) {
  const colors = [
    "from-[#5D8D4A] to-[#4A7A38]",
    "from-[#F6ABB4] to-[#e8899a]",
    "from-[#5CC9FF] to-[#3ab5ed]",
    "from-[#ED9717] to-[#c07a0e]",
  ];
  const colorIndex = (slug || name).length % colors.length;

  return (
    <div className={`w-full h-56 bg-gradient-to-b ${colors[colorIndex]} flex items-center justify-center`}>
      <div className="text-center text-white px-4">
        <div className="w-12 h-12 bg-white rounded-full mx-auto mb-3 flex items-center justify-center">
          <span className="text-[#5D8D4A] font-bold text-lg">O</span>
        </div>
        <p className="text-sm font-bold leading-tight">{name.split(" ").slice(0, 3).join(" ")}</p>
      </div>
    </div>
  );
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
      return;
    }
    const priceValue = product.priceValue || parseInt(product.price.replace(/\D/g, "")) || 0;
    addToCart({
      id: typeof product.id === 'number' ? product.id : parseInt(product.id) || 0,
      name: product.name,
      price: product.price,
      priceValue: priceValue,
      image: product.primaryImage || product.images?.[0] || product.image_url || product.image || undefined,
    });
  };

  const productLink = `/san-pham/${product.slug || product.id}`;
  const displayImage = product.primaryImage || product.images?.[0] || product.image_url || product.image;
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(product.priceValue || parseInt(product.price.replace(/\D/g, "")) || 0);

  const formattedOriginalPrice = product.originalPriceValue
    ? new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
      }).format(product.originalPriceValue)
    : product.originalPrice;

  return (
    <div className="bg-white rounded group transition-all duration-300 hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col h-full">
      {/* Product Image */}
      <Link href={productLink} className="relative block overflow-hidden bg-[#F8F8F8] cursor-pointer">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-[#ED9717] text-white text-xs font-bold px-2 py-1">
            {product.badge}
          </span>
        )}
        {displayImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-56 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <ProductImagePlaceholder name={product.name} slug={product.slug} />
        )}
      </Link>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1">
        {/* Brand */}
        <span className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">
          {product.brand || "Orya Babycare"}
        </span>

        <Link href={productLink}>
          <h3 className="text-[#5D8D4A] font-bold text-lg leading-[25.2px] mb-2 line-clamp-2 hover:underline cursor-pointer">
            {product.name}
          </h3>
        </Link>

        <p className="text-[#404041] text-sm leading-5 mb-4 flex-1 line-clamp-3">
          {product.shortDescription || product.description}
        </p>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, index) => (
              <Star key={index} size={14} fill={index < Math.round(product.rating || 0) ? "currentColor" : "none"} className={index < Math.round(product.rating || 0) ? "" : "text-gray-300"} />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewsCount || 0})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[#ED9717] font-bold text-xl">{formattedPrice.replace("₫", "đ")}</span>
          {product.originalPrice && (
            <span className="text-gray-400 text-sm line-through">
              {formattedOriginalPrice}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-sm"
            onClick={() => router.push(productLink)}
            icon={<Eye size={16} />}
          >
            Xem chi tiết
          </Button>
          <Button
            variant="gold"
            size="sm"
            className="flex-1 text-sm"
            onClick={handleAddToCart}
            icon={<ShoppingCart size={16} />}
          >
            Thêm giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
}
