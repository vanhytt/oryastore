import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const productLinks = [
  { label: "Dầu rạn da mẹ bầu", href: "/" },
  { label: "Kem bôi ngực sau sinh", href: "/" },
  { label: "Nước tắm gội trẻ em", href: "/" },
  { label: "Dưỡng thể sau sinh", href: "/" },
  { label: "Kem chống nắng an toàn", href: "/" },
];

const infoLinks = [
  { label: "Giới thiệu Orya", href: "/" },
  { label: "Câu chuyện thương hiệu", href: "/" },
  { label: "Chứng nhận chất lượng", href: "/" },
  { label: "Tin tức & Sự kiện", href: "/" },
  { label: "Liên hệ", href: "/" },
];

const policyLinks = [
  { label: "Chính sách bảo mật thông tin", href: "/" },
  { label: "Quy chế hoạt động", href: "/" },
  { label: "Chính sách đổi trả hàng", href: "/" },
  { label: "Điều khoản sử dụng", href: "/" },
];

export default function Footer() {
  return (
    <footer className="bg-[#5D8D4A] text-white">
      {/* Main Footer */}
      <div className="max-w-[1200px] mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Company Info */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <a href="/" className="flex items-center mb-5">
              <img
                src="/logo.png"
                alt="Orya Logo"
                className="h-12 w-auto object-contain block"
              />
            </a>
            <p className="text-blue-100 text-sm leading-6 mb-5">
              Sản phẩm chăm sóc da chuyên biệt dành cho mẹ bầu và trẻ em. Được
              nghiên cứu và sản xuất bởi{" "}
              <strong className="text-white">CVI Pharma</strong> — Đơn vị dược
              phẩm uy tín hàng đầu Việt Nam.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-[#6CA356] rounded flex items-center justify-center hover:bg-white hover:text-[#5D8D4A] transition-all"
                aria-label="Facebook"
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-red-500 rounded flex items-center justify-center hover:bg-white hover:text-red-500 transition-all"
                aria-label="Youtube"
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Products */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5 pb-3 border-b border-[#6CA356]">
              Sản phẩm
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-blue-100 text-sm hover:text-[#ED9717] transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-[#ED9717] rounded-full flex-shrink-0"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5 pb-3 border-b border-[#6CA356]">
              Thông tin
            </h3>
            <ul className="space-y-3 mb-6">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-blue-100 text-sm hover:text-[#ED9717] transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-[#ED9717] rounded-full flex-shrink-0"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-bold text-base mb-4 pb-2 border-b border-[#6CA356]">
              Chính sách
            </h3>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-blue-100 text-xs hover:text-[#ED9717] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-5 pb-3 border-b border-[#6CA356]">
              Liên hệ
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin
                  size={18}
                  className="text-[#ED9717] flex-shrink-0 mt-0.5"
                />
                <p className="text-blue-100 text-sm leading-6">
                  Số 2, đường Nội khu Trung Sơn, Khu dân cư Trung Sơn, Bình
                  Chánh, TP. HCM
                </p>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-[#ED9717] flex-shrink-0" />
                <a
                  href="tel:18001800"
                  className="text-blue-100 text-sm hover:text-[#ED9717] transition-colors"
                >
                  Hotline: 1800 1800 (Miễn phí)
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-[#ED9717] flex-shrink-0" />
                <a
                  href="mailto:info@orya.vn"
                  className="text-green-100 text-sm hover:text-[#ED9717] transition-colors"
                >
                  info@orya.vn
                </a>
              </li>
            </ul>

            {/* CVI Pharma Badge */}
            <div className="mt-6 p-4 bg-[#4A7A38] rounded">
              <p className="text-xs text-blue-100 leading-5">
                Sản phẩm thuộc danh mục{" "}
                <strong className="text-white">mỹ phẩm</strong>, được sản xuất
                tại nhà máy đạt chuẩn{" "}
                <strong className="text-[#ED9717]">CGMP-ASEAN</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#4A7A38] bg-[#3D6B2E]">
        <div className="max-w-[1200px] mx-auto px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-blue-200 text-xs text-center md:text-left">
            © 2024 Orya - CVI Pharma. Tất cả các quyền được bảo lưu.
          </p>
          <p className="text-blue-200 text-xs text-center">
            Thông tin trên website chỉ mang tính chất tham khảo, không thay thế
            tư vấn y tế chuyên nghiệp.
          </p>
        </div>
      </div>
    </footer>
  );
}