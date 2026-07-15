"use client";

import React, { useState } from "react";
import { Phone, ShoppingCart, Minus, Plus, CircleCheck } from "lucide-react";

const orderProducts = [
  { id: 1, name: "Dầu rạn da Orya", price: 350000, unit: "chai" },
  { id: 2, name: "Kem bôi ngực sau sinh", price: 280000, unit: "tuýp" },
  { id: 3, name: "Nước tắm gội Kids", price: 195000, unit: "chai" },
  { id: 4, name: "Dưỡng thể Baby", price: 220000, unit: "tuýp" },
];

function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function OrderForm() {
  const [quantities, setQuantities] = useState<Record<number, number>>({
    1: 1,
    2: 0,
    3: 0,
    4: 0,
  });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const updateQty = (id: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const totalAmount = orderProducts.reduce(
    (sum, p) => sum + p.price * (quantities[p.id] || 0),
    0
  );

  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="order-form" className="py-16 md:py-20 bg-gradient-to-br from-[#FFF5E6] via-[#FFF8F0] to-[#F0F9FF]">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#ED9717] text-white text-sm font-bold rounded-full mb-4">
            Đặt mua nhanh
          </span>
          <h2 className="text-[#5D8D4A] font-bold text-3xl md:text-4xl leading-tight mb-4">
            Đặt hàng ngay — Giao tận nơi
          </h2>
          <p className="text-[#404041] text-base md:text-lg leading-7 max-w-2xl mx-auto">
            Điền thông tin và chọn sản phẩm bên dưới. Chúng tôi sẽ gọi xác nhận trong vòng 15 phút.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Order Table */}
          <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="bg-[#5D8D4A] text-white px-6 py-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <ShoppingCart size={20} />
                Chọn sản phẩm
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {orderProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-4 py-3 border-b border-[#E5E5E5] last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[#5D8D4A] font-bold text-sm truncate">{product.name}</p>
                    <p className="text-[#ED9717] font-semibold text-sm">{formatPrice(product.price)}/{product.unit}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(product.id, -1)}
                      className="w-8 h-8 border border-[#E5E5E5] rounded flex items-center justify-center text-[#404041] hover:bg-[#F8F8F8] transition-colors"
                      aria-label="Giảm"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-bold text-[#5D8D4A]">
                      {quantities[product.id] || 0}
                    </span>
                    <button
                      onClick={() => updateQty(product.id, 1)}
                      className="w-8 h-8 border border-[#E5E5E5] rounded flex items-center justify-center text-[#404041] hover:bg-[#F8F8F8] transition-colors"
                      aria-label="Tăng"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="w-24 text-right">
                    <p className="text-[#404041] font-bold text-sm">
                      {formatPrice(product.price * (quantities[product.id] || 0))}
                    </p>
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="pt-4 border-t-2 border-[#5D8D4A]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#404041] text-sm">
                      Tổng cộng: <span className="font-bold text-[#5D8D4A]">{totalItems} sản phẩm</span>
                    </p>
                  </div>
                  <p className="text-[#ED9717] font-bold text-2xl">{formatPrice(totalAmount)}</p>
                </div>
                <p className="text-green-600 text-xs mt-2">✅ Miễn phí giao hàng cho đơn trên 500.000đ</p>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="bg-[#ED9717] text-white px-6 py-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Phone size={20} />
                Thông tin nhận hàng
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-[#333333] font-bold text-sm mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nguyễn Thị Hồng"
                  className="w-full px-4 py-3 border-2 border-[#E5E5E5] rounded-[5px] text-[#404041] text-sm focus:border-[#5D8D4A] focus:shadow-[0_0_4px_#5D8D4A] outline-none transition-all min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-[#333333] font-bold text-sm mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0912 345 678"
                  className="w-full px-4 py-3 border-2 border-[#E5E5E5] rounded-[5px] text-[#404041] text-sm focus:border-[#5D8D4A] focus:shadow-[0_0_4px_#5D8D4A] outline-none transition-all min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-[#333333] font-bold text-sm mb-2">
                  Địa chỉ nhận hàng <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Số nhà, tên đường, quận/huyện, tỉnh/thành phố"
                  className="w-full px-4 py-3 border-2 border-[#E5E5E5] rounded-[5px] text-[#404041] text-sm focus:border-[#5D8D4A] focus:shadow-[0_0_4px_#5D8D4A] outline-none transition-all min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-[#333333] font-bold text-sm mb-2">
                  Ghi chú
                </label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Ghi chú thêm (tùy chọn)"
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-[#E5E5E5] rounded-[5px] text-[#404041] text-sm focus:border-[#5D8D4A] focus:shadow-[0_0_4px_#5D8D4A] outline-none transition-all resize-none"
                />
              </div>

              {submitted ? (
                <div className="flex items-center gap-3 bg-green-50 text-green-700 p-4 rounded-[5px]">
                  <CircleCheck size={20} />
                  <p className="font-bold text-sm">Đặt hàng thành công! Chúng tôi sẽ liên hệ bạn sớm.</p>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={totalItems === 0}
                  className="w-full bg-[#ED9717] text-white font-bold text-lg py-4 hover:bg-[#d4880f] transition-colors min-h-[52px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Đặt mua ngay — {formatPrice(totalAmount)}
                </button>
              )}

              <p className="text-center text-[#404041] text-xs">
                Hoặc gọi ngay{" "}
                <a href="tel:18001800" className="text-[#5D8D4A] font-bold">
                  1800 1800
                </a>{" "}
                (Miễn phí) để được tư vấn
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}