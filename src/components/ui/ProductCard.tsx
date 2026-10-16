"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { ShoppingCart, Eye, Star } from "lucide-react";
import { Product } from "@/src/lib/dbService";
import { normalizeCartPrice, resolveCartImage, useCart } from "@/src/lib/cartContext";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
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
    const priceValue = Number(product.priceValue) || normalizeCartPrice(product.price);
    addToCart({
      id: String(product.id),
      name: product.name,
      price: priceValue,
      image: resolveCartImage(product.primaryImage || product.images?.[0] || product.image_url || product.image),
      category: product.category,
      brand: product.brand,
      slug: product.slug,
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
          <div aria-hidden className="h-56 w-full bg-gray-50" />
        )}
      </Link>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1">
        {/* Brand */}
        {product.brand && (
          <span className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">
            {product.brand}
          </span>
        )}

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
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full whitespace-nowrap text-[13px] font-medium px-1.5 py-2 gap-1"
            onClick={() => router.push(productLink)}
            icon={<Eye size={14} />}
          >
            Xem chi tiết
          </Button>
          <Button
            variant="gold"
            size="sm"
            className="w-full whitespace-nowrap text-[13px] font-medium px-1.5 py-2 gap-1"
            onClick={handleAddToCart}
            icon={<ShoppingCart size={14} />}
          >
            Thêm giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
}
