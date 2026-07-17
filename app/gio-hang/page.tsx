"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ShoppingBag, 
  Trash2, 
  Minus, 
  Plus, 
  ArrowLeft, 
  CheckCircle, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Home, 
  ChevronRight,
  ClipboardCheck,
  User,
  Phone,
  MapPin,
  FileText
} from "lucide-react";
import { DEFAULT_CART_IMAGE, useCart } from "@/src/lib/cartContext";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const router = useRouter();

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    paymentMethod: "cod", // "cod" | "bank"
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<{
    id: string;
    name: string;
    phone: string;
    address: string;
    total: number;
    items: typeof cart;
    paymentMethod: string;
  } | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace("₫", "đ");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Vui lòng nhập họ và tên của bạn";
    
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b$/;
    if (!formData.phone.trim()) {
      tempErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      tempErrors.phone = "Số điện thoại không hợp lệ (Ví dụ: 0912345678)";
    }
    
    if (!formData.address.trim()) tempErrors.address = "Vui lòng nhập địa chỉ giao hàng";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // ── Lấy URL của Google Apps Script Web App từ biến môi trường
      // Cần khai báo trong .env.local:
      //   NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/s/.../exec
      const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL;

      if (!GAS_URL) {
        throw new Error(
          "Chưa cấu hình NEXT_PUBLIC_GAS_URL. Vui lòng thêm vào file .env.local"
        );
      }

      // ── Chuẩn bị dữ liệu đơn hàng gửi lên Google Apps Script
      const orderData = {
        fullName: formData.name,
        phone: formData.phone,
        address: formData.address,
        note: formData.note,
        cartItems: cart.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: totalPrice,
        orderTime: new Date().toISOString(),
      };

      // ── Gửi POST request trực tiếp lên Google Apps Script
      // ⚠️  Dùng Content-Type: 'text/plain' để tránh CORS preflight request
      //     (Google Apps Script không xử lý được preflight OPTIONS)
      const response = await fetch(GAS_URL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`Lỗi kết nối máy chủ: HTTP ${response.status}`);
      }

      const data = await response.json();

      // ── Kiểm tra phản hồi từ Google Apps Script
      if (data.result !== "success") {
        throw new Error(data.message || "Không thể ghi đơn hàng vào hệ thống");
      }

      // ── Tạo mã đơn hàng để hiển thị (GAS cũng trả về orderId)
      const orderId = data.orderId
        ? `ORYA-${data.orderId}`
        : `ORYA-${Date.now()}`;

      // ── Cập nhật state thông tin đơn hàng đã đặt
      setCreatedOrder({
        id: orderId,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        total: totalPrice,
        items: [...cart],
        paymentMethod: formData.paymentMethod,
      });

      // ── Xóa giỏ hàng và hiển thị trang thành công
      clearCart();
      setOrderSuccess(true);
    } catch (error) {
      console.error("Checkout submit error:", error);
      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : "Đã xảy ra lỗi khi gửi đơn hàng. Vui lòng thử lại.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If order is placed successfully
  if (orderSuccess && createdOrder) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-[#FAFDF9] py-12 md:py-16">
          <div className="max-w-2xl mx-auto px-5">
            <div className="bg-white rounded-3xl border border-[#5D8D4A]/10 p-8 md:p-12 text-center shadow-[0_10px_30px_rgba(93,141,74,0.06)] relative overflow-hidden">
              {/* Success Badge */}
              <div className="w-20 h-20 bg-[#EFFFE9] text-[#5D8D4A] rounded-full mx-auto flex items-center justify-center mb-6 shadow-inner">
                <CheckCircle size={44} />
              </div>

              <span className="inline-block px-4 py-1 bg-[#5D8D4A]/10 text-[#5D8D4A] text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                Đặt hàng thành công
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#5D8D4A] mb-3">
                Cảm ơn bạn đã mua sắm tại Orya!
              </h1>
              <p className="text-[#404041]/80 text-sm md:text-base max-w-lg mx-auto mb-8">
                Mã đơn hàng của bạn là <strong className="text-gray-900">{createdOrder.id}</strong>. Chúng tôi sẽ sớm liên hệ qua số điện thoại để xác nhận đơn hàng trước khi đóng gói gửi đi.
              </p>

              {/* Order Info Summary Card */}
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 text-left space-y-4 mb-8">
                <h3 className="font-bold text-sm text-[#5D8D4A] uppercase tracking-wider border-b border-gray-200/80 pb-2 flex items-center gap-1.5">
                  <ClipboardCheck size={16} /> Thông tin nhận hàng
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm text-[#404041]">
                  <div>
                    <span className="text-gray-400 block text-xs">Người nhận:</span>
                    <span className="font-semibold">{createdOrder.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs">Số điện thoại:</span>
                    <span className="font-semibold">{createdOrder.phone}</span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-400 block text-xs">Địa chỉ nhận hàng:</span>
                    <span className="font-semibold">{createdOrder.address}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs">Phương thức thanh toán:</span>
                    <span className="font-semibold uppercase text-xs bg-green-100 px-2.5 py-0.5 rounded text-green-700 inline-block mt-0.5">
                      Thanh toán khi nhận hàng (COD)
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-xs">Tổng số tiền thanh toán:</span>
                    <span className="font-extrabold text-[#ED9717]">{formatPrice(createdOrder.total)}</span>
                  </div>
                </div>
              </div>


              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => router.push("/products")}
                  className="bg-white border border-[#5D8D4A] text-[#5D8D4A] hover:bg-[#5D8D4A]/5 font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer text-sm shadow-sm"
                >
                  Tiếp tục mua hàng
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="bg-[#5D8D4A] hover:bg-[#6CA356] text-white font-bold px-8 py-3 rounded-xl transition-all cursor-pointer text-sm shadow-md shadow-[#5D8D4A]/10"
                >
                  Quay lại Trang chủ
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-[#FAFDF9] pb-20">
        {/* Breadcrumb Header */}
        <div className="bg-[#EFFFE9] border-b border-[#5D8D4A]/10 py-4">
          <div className="max-w-[1200px] mx-auto px-5">
            <nav className="flex items-center gap-2 text-sm text-[#404041]/75">
              <Link href="/" className="hover:text-[#5D8D4A] transition-colors flex items-center gap-1 font-medium">
                <Home size={16} /> Trang chủ
              </Link>
              <ChevronRight size={14} className="text-[#404041]/40" />
              <Link href="/products" className="hover:text-[#5D8D4A] transition-colors font-medium">
                Sản phẩm
              </Link>
              <ChevronRight size={14} className="text-[#404041]/40" />
              <span className="text-[#5D8D4A] font-semibold">Giỏ hàng của bạn</span>
            </nav>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-[1200px] mx-auto px-5 mt-10">
          <h1 className="text-2xl md:text-3.5xl font-extrabold text-[#5D8D4A] tracking-tight mb-8">
            Chi tiết giỏ hàng
          </h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-[#5D8D4A]/20 py-20 text-center max-w-xl mx-auto shadow-sm p-8">
              <div className="w-20 h-20 bg-[#EFFFE9] text-[#5D8D4A] rounded-full mx-auto flex items-center justify-center mb-6">
                <ShoppingBag size={36} />
              </div>
              <h3 className="text-lg font-bold text-[#404041] mb-2">Giỏ hàng của bạn đang trống</h3>
              <p className="text-[#404041]/60 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
                Hiện tại bạn chưa chọn bất kỳ sản phẩm nào. Vui lòng quay lại cửa hàng để chọn các sản phẩm thiên nhiên lành tính.
              </p>
              <button
                onClick={() => router.push("/products")}
                className="bg-[#5D8D4A] hover:bg-[#6CA356] text-white font-bold px-8 py-3 rounded-xl transition-all cursor-pointer shadow-md shadow-[#5D8D4A]/10 text-sm"
              >
                Khám phá sản phẩm ngay
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: Cart items table */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white rounded-2xl border border-[#5D8D4A]/10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
                  <div className="px-6 py-4 bg-[#EFFFE9] border-b border-[#5D8D4A]/10 flex justify-between items-center">
                    <span className="font-bold text-sm text-[#5D8D4A] uppercase tracking-wider">
                      Sản phẩm ({totalItems})
                    </span>
                    <button
                      onClick={clearCart}
                      className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 size={13} /> Xóa tất cả
                    </button>
                  </div>

                  <div className="divide-y divide-gray-100 px-6">
                    {cart.map((item) => (
                      <div key={item.id} className="py-6 flex items-start gap-4">
                        <div className="w-20 h-20 shrink-0 rounded-xl border border-gray-100 overflow-hidden bg-[#EFFFE9]">
                          <img
                            src={item.image || DEFAULT_CART_IMAGE}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {/* Name and controller */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm md:text-base text-[#404041] hover:text-[#5D8D4A] transition-colors leading-snug truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-[#5D8D4A] font-bold mt-1 mb-3">
                            {item.category || "Chăm sóc da tự nhiên"}
                          </p>

                          {/* Control panel */}
                          <div className="flex flex-wrap items-center gap-4 justify-between mt-2">
                            {/* Quantity buttons */}
                            <div className="flex items-center border border-gray-200 rounded-full p-1 bg-gray-50 shadow-inner">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-white active:bg-gray-100 transition-colors cursor-pointer"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center text-xs font-bold text-gray-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:bg-white active:bg-gray-100 transition-colors cursor-pointer"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            {/* Prices */}
                            <div className="text-right">
                              <span className="block text-xs text-gray-400 font-medium">Đơn giá: {formatPrice(item.price)}</span>
                              <span className="text-[#ED9717] font-extrabold text-sm md:text-base">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Remove item button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all cursor-pointer self-start"
                          title="Xóa khỏi giỏ hàng"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Back Link */}
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#5D8D4A] hover:text-[#6CA356] transition-colors cursor-pointer group mt-2"
                >
                  <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                  Tiếp tục tìm kiếm sản phẩm khác
                </Link>
              </div>

              {/* RIGHT COLUMN: Order Form & Summary */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Summary panel */}
                <div className="bg-white rounded-2xl border border-[#5D8D4A]/10 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                  <h2 className="font-bold text-[#5D8D4A] text-lg border-b border-gray-100 pb-3 flex items-center gap-2">
                    <ClipboardCheck size={20} /> Tóm tắt đơn hàng
                  </h2>

                  <div className="space-y-2 text-sm text-[#404041]">
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-semibold">Tạm tính ({totalItems} sản phẩm):</span>
                      <span className="font-bold text-gray-800">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-semibold">Phí giao hàng:</span>
                      <span className="font-bold text-green-600 flex items-center gap-1">
                        <Truck size={14} /> Miễn phí
                      </span>
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline mt-2">
                      <span className="font-extrabold text-base text-gray-800">Tổng thanh toán:</span>
                      <span className="font-extrabold text-xl md:text-2xl text-[#ED9717]">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Shipping Details form */}
                <form
                  onSubmit={handleSubmitOrder}
                  className="bg-white rounded-2xl border border-[#5D8D4A]/10 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-5"
                >
                  <h2 className="font-bold text-[#5D8D4A] text-lg border-b border-gray-100 pb-3 flex items-center gap-2">
                    <Truck size={20} /> Thông tin nhận hàng
                  </h2>

                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-1">
                      <User size={13} className="text-[#5D8D4A]" /> Họ và tên người nhận *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nhập đầy đủ họ và tên"
                      className={`w-full bg-[#FAFDF9] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A] transition-all ${
                        errors.name ? "border-red-400 focus:ring-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-500 font-bold">{errors.name}</p>}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-1">
                      <Phone size={13} className="text-[#5D8D4A]" /> Số điện thoại liên hệ *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại di động"
                      className={`w-full bg-[#FAFDF9] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A] transition-all ${
                        errors.phone ? "border-red-400 focus:ring-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-red-500 font-bold">{errors.phone}</p>}
                  </div>

                  {/* Address field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-1">
                      <MapPin size={13} className="text-[#5D8D4A]" /> Địa chỉ giao hàng *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/TP"
                      className={`w-full bg-[#FAFDF9] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A] transition-all ${
                        errors.address ? "border-red-400 focus:ring-red-400" : "border-gray-200"
                      }`}
                    />
                    {errors.address && <p className="text-xs text-red-500 font-bold">{errors.address}</p>}
                  </div>

                  {/* Note field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-1">
                      <FileText size={13} className="text-[#5D8D4A]" /> Ghi chú đơn hàng
                    </label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến..."
                      className="w-full bg-[#FAFDF9] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A] transition-all"
                    />
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-1">
                      <CreditCard size={13} className="text-[#5D8D4A]" /> Phương thức thanh toán
                    </label>
                    
                    <div className="flex items-center gap-3 p-4 rounded-xl border border-[#5D8D4A] bg-[#EFFFE9] text-[#5D8D4A]">
                      <div className="w-4.5 h-4.5 rounded-full border-2 border-[#5D8D4A] flex items-center justify-center flex-shrink-0">
                        <div className="w-2.5 h-2.5 bg-[#5D8D4A] rounded-full"></div>
                      </div>
                      <div>
                        <span className="block font-bold text-xs md:text-sm">Thanh toán khi nhận hàng (COD)</span>
                        <span className="block text-[11px] opacity-80 mt-0.5">Bạn chỉ cần nhận hàng và thanh toán tiền mặt tại nhà</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#ED9717] hover:bg-[#d4880f] disabled:bg-amber-300 disabled:cursor-not-allowed text-white font-extrabold py-3.5 rounded-xl transition-all cursor-pointer text-center text-sm md:text-base flex items-center justify-center gap-2 mt-4 shadow-md shadow-orange-500/10"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Đang xử lý đơn hàng...
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={18} />
                        XÁC NHẬN ĐẶT HÀNG
                      </>
                    )}
                  </button>

                  {errors.submit && (
                    <p className="text-xs text-red-500 font-bold text-center">{errors.submit}</p>
                  )}

                  <p className="text-[10px] text-gray-400 text-center leading-relaxed mt-2.5">
                    Bằng việc bấm xác nhận, bạn đồng ý với các chính sách bảo mật và điều khoản dịch vụ của Orya Natural.
                  </p>
                </form>
              </div>

            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}