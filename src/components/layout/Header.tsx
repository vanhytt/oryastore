"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/src/lib/cartContext";
import {
  DEFAULT_TOPBAR_SETTINGS,
  normalizeTopBarSettings,
  type TopBarSettings,
} from "@/src/lib/topbarSettings";

const navLinks = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Sản phẩm",
    href: "/san-pham",
    children: [
      { label: "Sản phẩm cho Mẹ", href: "/san-pham?category=me-bau" },
      { label: "Sản phẩm cho Bé", href: "/san-pham?category=tre-em" },
    ],
  },
  { label: "Câu chuyện thương hiệu", href: "/thuong-hieu" },
  { label: "Tin tức", href: "/tin-tuc" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { totalItems, setIsCartOpen } = useCart();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [topBarSettings, setTopBarSettings] = useState<TopBarSettings>(
    DEFAULT_TOPBAR_SETTINGS,
  );

  useEffect(() => {
    fetch("/api/settings")
      .then(async (res) => {
        if (!res.ok) throw new Error(`Không thể tải cài đặt trang (${res.status})`);
        return res.json() as Promise<Record<string, unknown>>;
      })
      .then((settings) => {
        if (typeof settings.logo === "string" && settings.logo.trim()) {
          setLogoUrl(settings.logo);
        }
        const footer = settings.footer_settings;
        if (typeof footer === "object" && footer !== null) {
          const brand =
            "brand" in footer &&
            typeof footer.brand === "object" &&
            footer.brand !== null
              ? (footer.brand as Record<string, unknown>)
              : null;
          if (typeof brand?.logo_url === "string" && brand.logo_url.trim()) {
            setLogoUrl(brand.logo_url);
          }
        }

        setTopBarSettings(normalizeTopBarSettings(settings.topbar_settings));
      })
      .catch((err) => {
        console.error("Error fetching header settings:", err);
      });
  }, []);

  return (
    <header className="bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] sticky top-0 z-50">
      {/* Top Bar */}
      {topBarSettings.is_active && (
        <div className="bg-[#5D8D4A] py-2 text-white">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5">
            <p className="min-w-0 text-xs font-medium sm:text-sm">
              {topBarSettings.announcement}
            </p>
            <a
              href={`tel:${topBarSettings.hotline}`}
              className="flex shrink-0 items-center gap-2 rounded-lg text-sm font-bold text-[#ED9717] transition-colors hover:text-yellow-300"
            >
              <Phone size={14} />
              {topBarSettings.hotline}
            </a>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="max-w-[1200px] mx-auto px-5 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex flex-shrink-0 items-center">
          {logoUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={logoUrl} alt="Orya" className="block h-12 w-auto object-contain" />
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group">
              <a
                href={link.href}
                className="flex items-center gap-1 text-[#5D8D4A] font-bold text-base px-3 py-2 hover:text-[#6CA356] transition-colors"
                onMouseEnter={() =>
                  link.children && setOpenDropdown(link.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {link.label}
                {link.children && <ChevronDown size={14} />}
              </a>
              {link.children && openDropdown === link.label && (
                <div
                  className="absolute top-full left-0 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] min-w-[200px] z-50"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {link.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="block px-4 py-3 text-[#404041] text-sm hover:text-[#6CA356] hover:bg-[#F8F8F8] border-b border-[#E5E5E5] last:border-0 transition-colors"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${topBarSettings.hotline}`}
            className="hidden md:flex items-center gap-2 bg-[#ED9717] text-white font-bold px-4 py-2 hover:bg-[#d4880f] transition-colors min-h-[44px] rounded-xl"
          >
            <Phone size={16} />
            <span className="text-sm">Đặt hàng ngay</span>
          </a>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#5D8D4A] hover:text-[#6CA356] transition-colors cursor-pointer rounded-full"
            aria-label="Giỏ hàng"
          >
            <ShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 bg-[#ED9717] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse-once">
              {totalItems}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-[#5D8D4A] rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#E5E5E5] shadow-md">
          {navLinks.map((link) => (
            <div key={link.label}>
              <a
                href={link.href}
                className="flex items-center justify-between px-5 py-4 text-[#5D8D4A] font-bold text-base border-b border-[#E5E5E5] hover:bg-[#F8F8F8] transition-colors"
                onClick={() =>
                  link.children &&
                  setOpenDropdown(
                    openDropdown === link.label ? null : link.label
                  )
                }
              >
                {link.label}
                {link.children && (
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`}
                  />
                )}
              </a>
              {link.children && openDropdown === link.label && (
                <div className="bg-[#F8F8F8]">
                  {link.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="block px-8 py-3 text-[#404041] text-sm hover:text-[#6CA356] border-b border-[#E5E5E5] last:border-0 transition-colors"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="p-4">
            <a
              href="tel:0398126895"
              className="flex items-center justify-center gap-2 bg-[#ED9717] text-white font-bold py-3 w-full hover:bg-[#d4880f] transition-colors rounded-xl"
            >
              <Phone size={18} />
              Gọi đặt hàng: 0398126895
            </a>
          </div>
        </div>
      )}
    </header>
  );
}