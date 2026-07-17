"use client";

import React, { useEffect, useRef } from "react";
import { X, Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { DEFAULT_CART_IMAGE, useCart } from "@/src/lib/cartContext";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();
  
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace("₫", "đ");
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    router.push("/gio-hang");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div
          ref={drawerRef}
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full transform transition-all duration-300 ease-in-out border-l border-[#5D8D4A]/10"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-[#EFFFE9]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="text-[#5D8D4A]" size={22} />
              <h2 className="text-lg font-bold text-[#5D8D4A]">Giỏ hàng của bạn</h2>
              <span className="bg-[#ED9717] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-[#EFFFE9] rounded-full flex items-center justify-center mb-4 text-[#5D8D4A]">
                  <ShoppingBag size={36} />
                </div>
                <p className="text-gray-500 font-medium mb-6">Giỏ hàng của bạn đang trống</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#5D8D4A] hover:bg-[#6CA356] text-white font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-md shadow-[#5D8D4A]/15 text-sm"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-3 rounded-xl border border-gray-100 hover:border-[#5D8D4A]/20 transition-all bg-white shadow-sm"
                >
                  <div className="w-20 h-20 shrink-0 rounded-lg border border-gray-100 overflow-hidden bg-[#EFFFE9]">
                    <img
                      src={item.image || DEFAULT_CART_IMAGE}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Product details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#404041] leading-tight truncate mb-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#5D8D4A] font-medium mb-1.5">
                      {item.category || "Orya Natural"}
                    </p>
                    <p className="text-xs text-gray-500 mb-2.5">
                      Đơn giá: {formatPrice(item.price)}
                    </p>

                    {/* Price and quantity controller */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-full p-0.5 bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:bg-white active:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:bg-white active:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#ED9717]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                    title="Xóa sản phẩm"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer checkout panel */}
          {cart.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-6 bg-gray-50 space-y-4">
              <div className="flex justify-between items-center text-base">
                <span className="font-semibold text-gray-500">Tạm tính:</span>
                <span className="font-extrabold text-[#ED9717] text-xl">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                * Phí vận chuyển và thuế sẽ được tính khi thanh toán. Miễn phí giao hàng toàn quốc cho đơn từ 500.000đ.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-white border border-[#5D8D4A] text-[#5D8D4A] hover:bg-[#5D8D4A]/5 font-bold py-3 rounded-xl transition-all cursor-pointer text-center text-sm shadow-sm"
                >
                  Mua tiếp
                </button>
                <button
                  onClick={handleCheckoutClick}
                  className="bg-[#ED9717] hover:bg-[#d4880f] text-white font-bold py-3 rounded-xl transition-all cursor-pointer text-center text-sm flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/10"
                >
                  Thanh toán
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}