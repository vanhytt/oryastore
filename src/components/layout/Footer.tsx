import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import path from "path/win32";

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
                href="https://www.facebook.com/share/1Em6X2dKY5/?mibextid=wwXIfr"
                className="w-10 h-10 bg-[#6CA356] rounded flex items-center justify-center hover:bg-white hover:text-[#5D8D4A] transition-all"
                aria-label="Facebook"
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="https://shopee.vn/orya_vegar?mmp_pid=an_17322500037&uls_trackid=566p7l0e012u&utm_campaign=-&utm_content=-&utm_medium=affiliates&utm_source=an_17322500037&utm_term=f9cshuj8dwzo"
                className="w-10 h-10 bg-[#6CA356] rounded flex items-center justify-center hover:bg-white hover:text-[#5D8D4A] transition-all"
                aria-label="Shopee"
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10.5c-1.1 0-2-.5-2-1.5 0-1.2 1.5-1.5 2.5-1.8 1.3-.4 2.5-.9 2.5-2.7 0-1.7-1.5-2.5-3-2.5-1.8 0-3.1 1.1-3.1 2.7h1.8c0-.6.5-1.2 1.3-1.2.7 0 1.3.4 1.3 1 0 .6-.6.9-1.8 1.3-1.4.5-2.7 1.1-2.7 2.7 0 1.8 1.4 2.8 3.2 2.8 1.8 0 3.2-.9 3.2-2.8h-1.8c0 .8-.6 1.2-1.4 1.2z" />
                </svg>
              </a><a
                href="https://vt.tiktok.com/ZSXVBU9td/?page=TikTokShop"
                className="w-10 h-10 bg-[#6CA356] rounded flex items-center justify-center hover:bg-white hover:text-[#5D8D4A] transition-all"
                aria-label="Shopee"
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.35 22a6.33 6.33 0 0 0 6.33-6.33V9.05a8.16 8.16 0 0 0 4.91 1.62v-3.98a4.82 4.82 0 0 1-1-.05z" />
                </svg>
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
                  154 Hoàng Văn Thái, Phường Phương Liệt, Hà Nội
                </p>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={18} className="text-[#ED9717] flex-shrink-0" />
                <a
                  href="tel:18001800"
                  className="text-blue-100 text-sm hover:text-[#ED9717] transition-colors"
                >
                  Hotline: 0398126895
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={18} className="text-[#ED9717] flex-shrink-0" />
                <a
                  href="mailto:info@orya.vn"
                  className="text-green-100 text-sm hover:text-[#ED9717] transition-colors"
                >
                  ecommerce.orya@gmail.com
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