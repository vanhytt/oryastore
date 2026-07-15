"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { products } from "../../src/data/products";
import { Star, ArrowUpDown, Filter, ChevronRight, Home, Eye, ShoppingCart, Info } from "lucide-react";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { useCart } from "@/src/lib/cartContext";

// Product image placeholder component
function ProductImagePlaceholder({ id, name }: { id: number; name: string }) {
  const colors: Record<number, string> = {
    1: "from-[#5D8D4A] to-[#4A7A38]",
    2: "from-[#F6ABB4] to-[#e8899a]",
    3: "from-[#5CC9FF] to-[#3ab5ed]",
    4: "from-[#ED9717] to-[#c07a0e]",
  };

  return (
    <div className={`w-full h-64 bg-gradient-to-b ${colors[id] || colors[1]} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}>
      <div className="text-center text-white px-4">
        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
          <span className="text-[#5D8D4A] font-bold text-2xl">O</span>
        </div>
        <p className="text-base font-bold leading-tight max-w-[200px] mx-auto">{name}</p>
        <span className="inline-block mt-2 text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Orya Natural</span>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");
  const { addToCart } = useCart();

  // Listen to url search parameters to sync category filter selection
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleParamChange = () => {
        const params = new URLSearchParams(window.location.search);
        const catParam = params.get("category");
        if (catParam === "me-bau") {
          setSelectedCategory("Mẹ bầu");
        } else if (catParam === "tre-em") {
          setSelectedCategory("Trẻ em");
        } else {
          setSelectedCategory("all");
        }
      };

      // Initial parse
      handleParamChange();

      // Listen to popstate event (e.g. forward/back buttons or client navigation)
      window.addEventListener("popstate", handleParamChange);

      // Intercept pushState and replaceState to trigger param change callback
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;

      window.history.pushState = function (...args) {
        originalPushState.apply(this, args);
        handleParamChange();
      };

      window.history.replaceState = function (...args) {
        originalReplaceState.apply(this, args);
        handleParamChange();
      };

      return () => {
        window.removeEventListener("popstate", handleParamChange);
        window.history.pushState = originalPushState;
        window.history.replaceState = originalReplaceState;
      };
    }
  }, []);

  // Helper to extract numeric value from price string e.g. "350.000đ" -> 350000
  const getNumericPrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/\./g, "").replace("đ", ""), 10);
  };

  // Filter and sort products based on state
  const processedProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Sort by criteria
    if (sortBy === "price-asc") {
      result.sort((a, b) => getNumericPrice(a.price) - getNumericPrice(b.price));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => getNumericPrice(b.price) - getNumericPrice(a.price));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, sortBy]);

  const categories = [
    { id: "all", label: "Tất cả sản phẩm" },
    { id: "Mẹ bầu", label: "Chăm sóc Mẹ bầu" },
    { id: "Trẻ em", label: "Chăm sóc Bé yêu" },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="bg-[#FAFDF9] min-h-screen pb-20">
          {/* Breadcrumb Header */}
      <div className="bg-[#EFFFE9] border-b border-[#5D8D4A]/10 py-4">
        <div className="max-w-[1200px] mx-auto px-5">
          <nav className="flex items-center gap-2 text-sm text-[#404041]/75">
            <Link href="/" className="hover:text-[#5D8D4A] transition-colors flex items-center gap-1 font-medium">
              <Home size={16} /> Trang chủ
            </Link>
            <ChevronRight size={14} className="text-[#404041]/40" />
            <span className="text-[#5D8D4A] font-semibold">Danh sách sản phẩm</span>
          </nav>
        </div>
      </div>

      {/* Banner / Title Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#5D8D4A]/20 via-[#EFFFE9] to-[#ED9717]/10 py-12 md:py-16 border-b border-[#5D8D4A]/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#5D8D4A]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ED9717]/5 rounded-full blur-3xl -ml-20 -mb-20"></div>
        
        <div className="max-w-[1200px] mx-auto px-5 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-[#5D8D4A]/10 text-[#5D8D4A] text-xs md:text-sm font-bold rounded-full mb-4">
            Độc quyền từ thiên nhiên
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#5D8D4A] tracking-tight mb-4">
            Danh Sách Sản Phẩm Orya
          </h1>
          <p className="text-[#404041] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Dòng sản phẩm thảo dược thiên nhiên, đạt chuẩn kiểm định an toàn da liễu nghiêm ngặt. Lành tính vượt trội cho da nhạy cảm của mẹ bầu và trẻ sơ sinh.
          </p>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-[1200px] mx-auto px-5 mt-10">
        {/* Controls Bar: Category Filters & Sorting */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-5 rounded-2xl shadow-sm border border-[#5D8D4A]/10 mb-8">
          {/* Categories Tab buttons */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#5D8D4A] text-white shadow-md shadow-[#5D8D4A]/25"
                    : "bg-[#FAFDF9] text-[#404041]/80 hover:bg-[#EFFFE9] hover:text-[#5D8D4A] border border-[#5D8D4A]/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort selection dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="text-sm font-bold text-[#404041]/70 flex items-center gap-1.5">
              <Filter size={16} className="text-[#5D8D4A]" />
              Lọc & Sắp xếp:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#FAFDF9] border border-[#5D8D4A]/15 text-[#404041] px-5 py-2.5 pr-10 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#5D8D4A] focus:border-transparent cursor-pointer"
              >
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="rating">Đánh giá tốt nhất</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#5D8D4A]">
                <ArrowUpDown size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Total Products indicator */}
        <div className="mb-6 text-sm font-bold text-[#404041]/60">
          Hiển thị <span className="text-[#5D8D4A]">{processedProducts.length}</span> sản phẩm
        </div>

        {/* Products Grid */}
        {processedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-[#5D8D4A]/20 py-20 text-center">
            <Info size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-[#404041] mb-2">Không tìm thấy sản phẩm</h3>
            <p className="text-[#404041]/60 text-sm">Vui lòng chọn danh mục khác.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processedProducts.map((product) => {
              // Calculate discount percent if original price exists
              let discountPercent = 0;
              if (product.originalPrice) {
                const priceNum = getNumericPrice(product.price);
                const originalNum = getNumericPrice(product.originalPrice);
                discountPercent = Math.round(((originalNum - priceNum) / originalNum) * 100);
              }

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-[#5D8D4A]/10 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_12px_24px_rgba(93,141,74,0.12)] hover:-translate-y-1"
                >
                  {/* Image container */}
                  <div className="relative overflow-hidden bg-gray-100">
                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-4 left-4 z-10 bg-[#ED9717] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    {/* Discount percent badge */}
                    {discountPercent > 0 && (
                      <span className="absolute top-4 right-4 z-10 bg-red-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-md shadow-sm">
                        -{discountPercent}%
                      </span>
                    )}
                    <ProductImagePlaceholder id={product.id} name={product.name} />
                    
                    {/* Hover Quick View Link */}
                    <div className="absolute inset-0 bg-[#5D8D4A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <Link
                        href={`/products/${product.id}`}
                        className="bg-white text-[#5D8D4A] p-3 rounded-full hover:bg-[#5D8D4A] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg"
                        title="Xem chi tiết"
                      >
                        <Eye size={20} />
                      </Link>
                    </div>
                  </div>

                  {/* Product Details info */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Category */}
                    <span className="text-[#5D8D4A] font-bold text-xs uppercase tracking-wider mb-1.5 inline-block">
                      {product.category}
                    </span>

                    {/* Name */}
                    <h3 className="text-[#404041] font-bold text-base md:text-lg leading-tight mb-2 group-hover:text-[#5D8D4A] transition-colors line-clamp-1">
                      <Link href={`/products/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                            className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[#404041]/60 font-medium">({product.rating})</span>
                    </div>

                    {/* Description */}
                    <p className="text-[#404041]/70 text-xs md:text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                      {product.description}
                    </p>

                    {/* Prices */}
                    <div className="flex items-baseline gap-2.5 mb-5 border-t border-gray-100 pt-4">
                      <span className="text-[#ED9717] font-extrabold text-lg md:text-xl">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 text-xs md:text-sm line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs md:text-sm font-bold text-[#5D8D4A] border border-[#5D8D4A] rounded-xl py-2.5 hover:bg-[#5D8D4A] hover:text-white transition-all min-h-[40px] cursor-pointer"
                      >
                        <Eye size={14} /> Chi tiết
                      </Link>
                      <button
                        onClick={() => {
                          const priceVal = parseInt(product.price.replace(/\D/g, "")) || 0;
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            priceValue: priceVal,
                            image: "", // Since we use gradient placeholder in UI
                          });
                        }}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs md:text-sm font-bold bg-[#ED9717] text-white rounded-xl py-2.5 hover:bg-[#d4880f] transition-all min-h-[40px] cursor-pointer"
                      >
                        <ShoppingCart size={14} /> Mua ngay
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Commitment Badge Block */}
        <div className="mt-20 bg-[#EFFFE9] rounded-3xl p-8 border border-[#5D8D4A]/10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-lg md:text-xl font-bold text-[#5D8D4A] mb-2">
              Cam kết an toàn tuyệt đối từ Orya
            </h3>
            <p className="text-sm text-[#404041]/80 leading-relaxed">
              Mỗi sản phẩm gửi đến quý khách đều trải qua quá trình nghiên cứu kỹ lưỡng và kiểm nghiệm lâm sàng trên da nhạy cảm. Chúng tôi tự hào mang lại giá trị thuần lành và bền vững từ thảo dược Việt Nam.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/"
              className="bg-white text-[#5D8D4A] font-bold text-sm px-6 py-3 rounded-xl border border-[#5D8D4A]/20 hover:bg-[#5D8D4A]/5 transition-colors min-h-[44px]"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
