"use client";

import React, { useState, useEffect } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct, Product } from "../../lib/dbService";
import { Search, Plus, Edit2, Trash2, X, AlertTriangle, Eye, Loader2 } from "lucide-react";
import ImageUpload from "./ImageUpload";

interface ProductManagerProps {
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
  onUpdateStats: () => void;
}

export default function ProductManager({ onSuccess, onError, onUpdateStats }: ProductManagerProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("mom");
  const [price, setPrice] = useState("");
  const [priceValue, setPriceValue] = useState(0);
  const [originalPrice, setOriginalPrice] = useState("");
  const [originalPriceValue, setOriginalPriceValue] = useState(0);
  const [badge, setBadge] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [image, setImage] = useState("");

  // Load products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      onError("Không thể tải danh sách sản phẩm!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open modal for add or edit
  const openModal = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setName(product.name);
      setCategory(product.category);
      setPrice(product.price);
      setPriceValue(product.priceValue);
      setOriginalPrice(product.originalPrice || "");
      setOriginalPriceValue(product.originalPriceValue || 0);
      setBadge(product.badge || "");
      setRating(product.rating);
      setReviewsCount(product.reviewsCount);
      setDescription(product.description);
      setShortDescription(product.shortDescription);
      setImage(product.image || "");
    } else {
      setEditingProduct(null);
      setName("");
      setCategory("mom");
      setPrice("");
      setPriceValue(0);
      setOriginalPrice("");
      setOriginalPriceValue(0);
      setBadge("");
      setRating(5);
      setReviewsCount(0);
      setDescription("");
      setShortDescription("");
      setImage("");
    }
    setIsModalOpen(true);
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !shortDescription) {
      onError("Vui lòng nhập các thông tin bắt buộc!");
      return;
    }

    try {
      setIsSubmitting(true);
      const productPayload = {
        name,
        category,
        price,
        priceValue: Number(priceValue) || 0,
        originalPrice,
        originalPriceValue: Number(originalPriceValue) || 0,
        badge,
        rating: Number(rating) || 5,
        reviewsCount: Number(reviewsCount) || 0,
        description,
        shortDescription,
        image
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productPayload);
        onSuccess("Cập nhật sản phẩm thành công!");
      } else {
        await createProduct(productPayload);
        onSuccess("Thêm sản phẩm mới thành công!");
      }

      setIsModalOpen(false);
      fetchProducts();
      onUpdateStats();
    } catch (err: any) {
      onError("Đã xảy ra lỗi khi lưu sản phẩm!");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: string | number) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(id);
        onSuccess("Xóa sản phẩm thành công!");
        fetchProducts();
        onUpdateStats();
      } catch (err: any) {
        onError("Không thể xóa sản phẩm này!");
        console.error(err);
      }
    }
  };

  // Filtered products list
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-5 border-b border-gray-150 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm theo tên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A] text-sm"
          />
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 bg-[#5D8D4A] hover:bg-[#4d753d] text-white px-4 py-2 rounded text-sm font-bold transition-colors cursor-pointer"
        >
          <Plus size={18} />
          Thêm sản phẩm
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-500">
            <Loader2 size={32} className="animate-spin text-[#5D8D4A] mb-3" />
            <p className="text-sm">Đang tải dữ liệu sản phẩm...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <AlertTriangle size={36} className="mx-auto mb-3 text-gray-300" />
            <p className="text-sm">Không tìm thấy sản phẩm nào.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs font-bold uppercase border-b border-gray-200">
                <th className="py-3 px-5">Ảnh</th>
                <th className="py-3 px-5">Tên sản phẩm</th>
                <th className="py-3 px-5">Phân loại</th>
                <th className="py-3 px-5">Giá bán</th>
                <th className="py-3 px-5">Giá gốc</th>
                <th className="py-3 px-5">Nhãn</th>
                <th className="py-3 px-5 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-5">
                    <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-xs font-bold text-[#5D8D4A]">Orya</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-5 font-medium text-gray-800 max-w-xs truncate">
                    {product.name}
                  </td>
                  <td className="py-3 px-5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                        product.category === "mom"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {product.category === "mom" ? "Mẹ bầu" : "Em bé"}
                    </span>
                  </td>
                  <td className="py-3 px-5 font-semibold text-[#ED9717]">{product.price}</td>
                  <td className="py-3 px-5 text-gray-400 line-through">
                    {product.originalPrice || "—"}
                  </td>
                  <td className="py-3 px-5">
                    {product.badge ? (
                      <span className="bg-[#ED9717]/10 text-[#ED9717] text-xs font-bold px-2 py-0.5 rounded">
                        {product.badge}
                      </span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="py-3 px-5 text-right space-x-2">
                    <button
                      onClick={() => openModal(product)}
                      className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded transition-colors inline-flex cursor-pointer"
                      title="Chỉnh sửa"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded transition-colors inline-flex cursor-pointer"
                      title="Xóa"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Product Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-gray-800 font-bold text-lg">
                {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Tên sản phẩm <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="VD: Dầu rạn da Orya cho mẹ bầu..."
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Phân khúc cho <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]"
                  >
                    <option value="mom">Chăm sóc mẹ bầu (mom)</option>
                    <option value="baby">Chăm sóc bé (baby)</option>
                  </select>
                </div>

                {/* Badge */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Nhãn sản phẩm (Badge)
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="VD: Bestseller, Mới, Vegan..."
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]"
                  />
                </div>

                {/* Price Label */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Giá hiển thị <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    placeholder="VD: 350.000đ"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]"
                  />
                </div>

                {/* Price Numeric Value */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Giá trị số (dùng để so sánh/lọc) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={priceValue}
                    onChange={(e) => setPriceValue(Number(e.target.value))}
                    required
                    placeholder="VD: 350000"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]"
                  />
                </div>

                {/* Original Price Label */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Giá gốc hiển thị (nếu có giảm giá)
                  </label>
                  <input
                    type="text"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="VD: 450.000đ"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]"
                  />
                </div>

                {/* Original Price Value */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Giá trị số gốc (nếu có)
                  </label>
                  <input
                    type="number"
                    value={originalPriceValue}
                    onChange={(e) => setOriginalPriceValue(Number(e.target.value))}
                    placeholder="VD: 450000"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Đánh giá sao (1.0 đến 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]"
                  />
                </div>

                {/* Sales/Reviews count */}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Lượt bán/Lượt đánh giá
                  </label>
                  <input
                    type="number"
                    value={reviewsCount}
                    onChange={(e) => setReviewsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]"
                  />
                </div>

                {/* Image Upload / Drag-and-Drop */}
                <div className="md:col-span-2">
                  <ImageUpload
                    value={image}
                    onChange={setImage}
                    label="Ảnh sản phẩm"
                  />
                </div>

                {/* Short Description */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Mô tả ngắn <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    required
                    placeholder="Tóm tắt ngắn gọn tính năng nổi bật..."
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]"
                  />
                </div>

                {/* Detail Description */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-1">
                    Mô tả chi tiết
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Chi tiết công dụng, cách dùng, thành phần đầy đủ..."
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#5D8D4A]/50 focus:border-[#5D8D4A]"
                  />
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-gray-150 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#5D8D4A] hover:bg-[#4d753d] text-white rounded text-sm font-bold flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                  Lưu lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}