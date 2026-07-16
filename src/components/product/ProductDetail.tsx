"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Star, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Leaf, 
  ShieldAlert, 
  ShieldCheck, 
  RotateCcw,
  CheckCircle2,
  ArrowLeft,
  Heart
} from "lucide-react";
import { Product } from "@/src/lib/dbService";
import Button from "@/src/components/ui/Button";
import { useCart } from "@/src/lib/cartContext";

interface ProductDetailProps {
  product: Product;
  allProducts: Product[];
}

export default function ProductDetail({ product, allProducts }: ProductDetailProps) {
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"benefits" | "usage">("benefits");

  const galleryImages = useMemo(() => {
    const sources = [
      product.primaryImage,
      ...(product.images || []),
      product.image_url,
      product.image,
    ].filter((image): image is string => Boolean(image));

    return Array.from(new Set(sources));
  }, [product.primaryImage, product.images, product.image_url, product.image]);

  const selectedImage = galleryImages[currentImageIndex] || product.primaryImage || product.images?.[0] || product.image_url || product.image;
  const hasGallery = galleryImages.length > 0;

  React.useEffect(() => {
    setCurrentImageIndex(0);
  }, [product.id]);

  // Get related products (exclude current product)
  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 4);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart({
      id: typeof product.id === 'number' ? product.id : parseInt(product.id) || 0,
      name: product.name,
      price: product.price,
      priceValue: product.priceValue,
      image: selectedImage || undefined,
      category: product.category,
    }, quantity);
  };

  const handleBuyNow = () => {
    addToCart({
      id: typeof product.id === 'number' ? product.id : parseInt(product.id) || 0,
      name: product.name,
      price: product.price,
      priceValue: product.priceValue,
      image: selectedImage || undefined,
      category: product.category,
    }, quantity);
    setIsCartOpen(true);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb / Back button */}
      <div className="max-w-[1200px] mx-auto px-5 pt-8 pb-4">
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#5D8D4A] hover:text-[#6CA356] transition-colors cursor-pointer group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Quay lại Trang chủ
        </button>
      </div>

      {/* Main product columns */}
      <div className="max-w-[1200px] mx-auto px-5 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: Product Images */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Main Image Container */}
            <div className={`w-full h-[380px] md:h-[480px] bg-gradient-to-b ${product.colors?.[currentImageIndex] || "from-[#5D8D4A] to-[#4A7A38]"} rounded-2xl flex items-center justify-center relative shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-500`}>
              {product.badge && (
                <span className="absolute top-4 left-4 z-10 bg-[#E59822] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wide">
                  {product.badge}
                </span>
              )}
              
              {hasGallery ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="max-h-[85%] max-w-[85%] object-contain transition-transform duration-300 hover:scale-105 z-10"
                />
              ) : (
                <div className="text-center text-white p-8 z-10">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full mx-auto mb-6 flex items-center justify-center border border-white/30 shadow-inner">
                    <span className="text-white font-bold text-3xl tracking-widest">ORYA</span>
                  </div>
                  <h2 className="font-bold text-2xl md:text-3xl drop-shadow-md max-w-sm mx-auto leading-tight">{product.name}</h2>
                  <p className="text-white/70 text-xs mt-3 bg-black/10 inline-block px-3 py-1 rounded-full uppercase tracking-wider">
                    Mặt hàng an toàn • Góc {currentImageIndex + 1}
                  </p>
                </div>
              )}

              {/* Decorative light elements */}
              <div className="absolute w-64 h-64 bg-white/10 rounded-full -top-12 -right-12 blur-2xl"></div>
              <div className="absolute w-48 h-48 bg-black/5 rounded-full -bottom-10 -left-10 blur-xl"></div>
            </div>

            {/* Thumbnails row */}
            {hasGallery && (
              <div className="grid grid-cols-4 gap-3 mt-5">
                {galleryImages.map((image, idx) => (
                  <button
                    key={`${image}-${idx}`}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-20 md:h-24 rounded-xl border-2 transition-all duration-200 cursor-pointer overflow-hidden relative bg-white ${
                      currentImageIndex === idx 
                        ? "border-[#5D8D4A] ring-4 ring-[#5D8D4A]/10 scale-[1.03]" 
                        : "border-gray-200 opacity-80 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Product Info & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Category */}
              <span className="text-[#5D8D4A] text-xs font-bold tracking-wider uppercase bg-[#EFFFE9] px-3 py-1 rounded-full inline-block mb-3 border border-[#5D8D4A]/10">
                {product.category}
              </span>

              {/* Product Name */}
              <h1 className="text-[#5D8D4A] font-bold text-2xl md:text-3.5xl leading-tight mb-3">
                {product.name}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-[#E59822] text-[#E59822]" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {product.rating} <span className="text-gray-400 font-normal">({product.reviewsCount} đánh giá)</span>
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-xs text-[#5D8D4A] font-bold flex items-center gap-1">
                  <ShieldCheck size={14} /> Kiểm nghiệm an toàn
                </span>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-[#E59822] font-bold text-3xl md:text-4xl">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-gray-400 text-base md:text-lg line-through font-medium">
                      {product.originalPrice}
                    </span>
                    <span className="bg-[#E59822]/10 text-[#E59822] text-xs font-bold px-2 py-1 rounded">
                      GIẢM {Math.round(((product.originalPriceValue || 0) - product.priceValue) / (product.originalPriceValue || 1) * 100)}%
                    </span>
                  </>
                )}
              </div>

              {/* Short Description */}
              <div className="mb-6">
                <h3 className="text-[#5D8D4A] text-sm font-bold uppercase tracking-wider mb-2">Mô tả sản phẩm</h3>
                <p className="text-[#404041] text-sm md:text-base leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Số lượng:</span>
                <div className="flex items-center border border-gray-200 rounded-full p-1 bg-white shadow-sm">
                  <button
                    onClick={handleDecrement}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-bold text-gray-800 text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons (CTA) */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white border-2 border-[#E59822] text-[#E59822] hover:bg-[#E59822]/5 active:bg-[#E59822]/10 transition-colors font-bold rounded-xl py-3.5 flex items-center justify-center gap-2 min-h-[48px] cursor-pointer shadow-sm"
              >
                <ShoppingCart size={18} />
                Thêm vào giỏ hàng
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-[#E59822] hover:bg-[#d08518] active:bg-[#b8710f] text-white transition-colors font-bold rounded-xl py-3.5 flex items-center justify-center gap-2 min-h-[48px] cursor-pointer shadow-sm"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>

        {/* TABS SECTION: Benefits, Ingredients & Usage */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <div className="flex border-b border-gray-200 gap-6">
            <button
              onClick={() => setActiveTab("benefits")}
              className={`pb-4 text-base md:text-lg font-bold transition-all relative cursor-pointer ${
                activeTab === "benefits"
                  ? "text-[#5D8D4A]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Công dụng & Thành phần
              {activeTab === "benefits" && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#5D8D4A] rounded-t-full"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("usage")}
              className={`pb-4 text-base md:text-lg font-bold transition-all relative cursor-pointer ${
                activeTab === "usage"
                  ? "text-[#5D8D4A]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Hướng dẫn sử dụng
              {activeTab === "usage" && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#5D8D4A] rounded-t-full"></div>
              )}
            </button>
          </div>

          <div className="py-8">
            {activeTab === "benefits" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Benefits */}
                <div>
                  <h4 className="text-[#5D8D4A] font-bold text-lg mb-4 flex items-center gap-2">
                    <CheckCircle2 size={20} /> Công dụng nổi bật
                  </h4>
                  <ul className="space-y-3.5">
                  {(product.benefits || []).map((benefit, i) => (
                      <li key={i} className="flex gap-3 text-[#404041] text-sm md:text-base leading-relaxed">
                        <span className="w-5 h-5 bg-[#EFFFE9] border border-[#5D8D4A]/20 rounded-full flex items-center justify-center text-[#5D8D4A] text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Ingredients */}
                <div>
                  <h4 className="text-[#5D8D4A] font-bold text-lg mb-4 flex items-center gap-2">
                    <Leaf size={20} /> Thành phần lành tính
                  </h4>
                  <ul className="space-y-3.5">
                  {(product.ingredients || []).map((ingredient, i) => (
                      <li key={i} className="flex gap-3 text-[#404041] text-sm md:text-base leading-relaxed">
                        {ingredient.startsWith("Sản phẩm 5 KHÔNG:") ? (
                          <div className="flex gap-3 bg-[#FFF5F5] border border-red-100 rounded-xl p-3.5 w-full mt-2">
                            <span className="text-red-500 font-bold mt-0.5 flex-shrink-0">
                              <ShieldAlert size={18} />
                            </span>
                            <span className="text-[#A84343] font-semibold text-sm">
                              {ingredient}
                            </span>
                          </div>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 bg-[#5D8D4A] rounded-full flex-shrink-0 mt-2.5"></span>
                            <span>{ingredient}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="text-[#5D8D4A] font-bold text-lg mb-6 flex items-center gap-2">
                  <RotateCcw size={20} /> Hướng dẫn các bước sử dụng an toàn
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(product.usage || []).map((step, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                      <span className="w-8 h-8 rounded-full bg-[#5D8D4A] text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                        {i + 1}
                      </span>
                      <p className="text-[#404041] text-sm md:text-base leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BRAND COMMITMENTS (Background Accent #EFFFE9) */}
        <div className="mt-12 bg-[#EFFFE9] rounded-2xl p-8 md:p-10 border border-[#5D8D4A]/10 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#5D8D4A] shadow-sm flex-shrink-0">
                <Leaf size={24} />
              </div>
              <div>
                <h5 className="font-bold text-[#5D8D4A] text-base mb-1">100% Hữu cơ</h5>
                <p className="text-[#404041] text-xs leading-relaxed">
                  Nguyên liệu nguồn gốc tự nhiên, đạt chuẩn hữu cơ nghiêm ngặt.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#5D8D4A] shadow-sm flex-shrink-0">
                <Heart size={24} />
              </div>
              <div>
                <h5 className="font-bold text-[#5D8D4A] text-base mb-1">Bé sơ sinh an toàn</h5>
                <p className="text-[#404041] text-xs leading-relaxed">
                  Công thức dịu lành tối đa, an toàn cho trẻ sơ sinh từ 0 ngày tuổi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#5D8D4A] shadow-sm flex-shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h5 className="font-bold text-[#5D8D4A] text-base mb-1">Kiểm nghiệm da liễu</h5>
                <p className="text-[#404041] text-xs leading-relaxed">
                  Đã được kiểm nghiệm lâm sàng bởi các bác sĩ da liễu hàng đầu.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#5D8D4A] shadow-sm flex-shrink-0">
                <RotateCcw size={24} />
              </div>
              <div>
                <h5 className="font-bold text-[#5D8D4A] text-base mb-1">Đổi trả dễ dàng</h5>
                <p className="text-[#404041] text-xs leading-relaxed">
                  Hỗ trợ đổi trả nhanh chóng trong 7 ngày nếu không hài lòng.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-[#5D8D4A]/10 text-[#5D8D4A] text-sm font-bold rounded-full mb-3">
              Gợi ý cho mẹ
            </span>
            <h3 className="text-[#5D8D4A] font-bold text-2xl md:text-3xl">
              Sản phẩm liên quan
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div 
                key={p.id} 
                onClick={() => router.push(`/san-pham/${p.slug || p.id}`)}
                className="bg-white rounded-xl group transition-all duration-300 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col cursor-pointer"
              >
                {/* Product Image Placeholder */}
                <div className="relative overflow-hidden bg-[#F8F8F8]">
                  {p.badge && (
                    <span className="absolute top-3 left-3 z-10 bg-[#ED9717] text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                      {p.badge}
                    </span>
                  )}
                  {/* Image or Placeholder using first gradient */}
                  {p.primaryImage || p.images?.[0] || p.image_url || p.image ? (
                    <div className="w-full h-52 bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.03]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.primaryImage || p.images?.[0] || p.image_url || p.image}
                        alt={p.name}
                        className="max-h-[90%] max-w-[90%] object-contain"
                      />
                    </div>
                  ) : (
                    <div className={`w-full h-52 bg-gradient-to-b ${p.colors?.[0] || "from-[#5D8D4A] to-[#4A7A38]"} flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.03]`}>
                      <div className="text-center text-white px-4">
                        <div className="w-10 h-10 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center border border-white/20">
                          <span className="text-white font-bold text-sm">O</span>
                        </div>
                        <p className="text-xs font-bold leading-tight line-clamp-1">{p.name}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs font-semibold text-gray-400 uppercase mb-1">{p.category}</span>
                  <h4 className="text-[#5D8D4A] font-bold text-base leading-snug mb-2 line-clamp-2 group-hover:text-[#6CA356] transition-colors">
                    {p.name}
                  </h4>
                  
                  {/* Review stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-[#E59822] text-[#E59822]" />
                    ))}
                    <span className="text-[10px] text-gray-500 font-semibold ml-1">{p.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-50">
                    <span className="text-[#E59822] font-bold text-base">{p.price}</span>
                    {p.originalPrice && (
                      <span className="text-gray-400 text-xs line-through">
                        {p.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}