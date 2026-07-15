"use client";

import React from "react";
import Button from "./Button";
import { ShoppingCart, Eye } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  badge?: string;
  onAddToCart?: (id: number) => void;
  onViewDetail?: (id: number) => void;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
  badge,
  onAddToCart,
  onViewDetail,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded group transition-all duration-300 hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col h-full">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-[#F8F8F8]">
        {badge && (
          <span className="absolute top-3 left-3 z-10 bg-[#ED9717] text-white text-xs font-bold px-2 py-1">
            {badge}
          </span>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[#5D8D4A] font-bold text-lg leading-[25.2px] mb-2 line-clamp-2">
          {name}
        </h3>
        <p className="text-[#404041] text-sm leading-5 mb-4 flex-1 line-clamp-3">
          {description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[#ED9717] font-bold text-xl">{price}</span>
          {originalPrice && (
            <span className="text-gray-400 text-sm line-through">
              {originalPrice}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-sm"
            onClick={() => onViewDetail?.(id)}
            icon={<Eye size={16} />}
          >
            Xem chi tiết
          </Button>
          <Button
            variant="gold"
            size="sm"
            className="flex-1 text-sm"
            onClick={() => onAddToCart?.(id)}
            icon={<ShoppingCart size={16} />}
          >
            Thêm giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  );
}