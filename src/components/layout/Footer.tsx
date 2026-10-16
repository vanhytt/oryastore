import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { getFooterSettings } from "@/src/lib/getFooterSettings";
import PolicyModal from "@/src/components/layout/PolicyModal";

export default async function Footer() {
  const data = await getFooterSettings();
  const configuredLogo = data.brand.logo_url?.trim();
  const logoSrc = configuredLogo && (
    configuredLogo.startsWith("https://") ||
    (configuredLogo.startsWith("/") && !configuredLogo.startsWith("//"))
  )
    ? configuredLogo
    : "/logofooter.png";

  return (
    <footer className="bg-[#5D8D4A] text-white">
      <div className="max-w-[1200px] mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* ===== COLUMN 1: Brand & Social Links ===== */}
          <div>
            <Link href="/">
              {/* Dynamic admin-managed URLs can use different hosts, so render without Next Image remote-host restrictions. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoSrc}
                alt="Orya"
                className="h-12 w-auto mb-5"
              />
            </Link>
            <p className="text-white/90 mb-5">
              {data?.brand?.description || "Sản phẩm chăm sóc da chuyên biệt dành cho mẹ bầu và trẻ em."}
            </p>
            {data?.brand?.cgmp_text && (
              <p className="text-white/90 mb-5">{data.brand.cgmp_text}</p>
            )}

            {/* Social Links - Only show if link exists */}
            <div className="flex gap-3">
              {data?.social?.facebook && (
                <a
                  href={data.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1877F2] shadow-sm transition-all duration-200 hover:scale-110 hover:bg-[#1877F2] hover:text-white hover:shadow-md"
                  aria-label="Facebook"
                >
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}

              {data?.social?.shopee && (
                <a
                  href={data.social.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF2EE] text-[#EE4D2D] shadow-sm transition-all duration-200 hover:scale-110 hover:bg-[#EE4D2D] hover:text-white hover:shadow-md"
                  aria-label="Shopee"
                >
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10.5c-1.1 0-2-.5-2-1.5 0-1.2 1.5-1.5 2.5-1.8 1.3-.4 2.5-.9 2.5-2.7 0-1.7-1.5-2.5-3-2.5-1.8 0-3.1 1.1-3.1 2.7h1.8c0-.6.5-1.2 1.3-1.2.7 0 1.3.4 1.3 1 0 .6-.6.9-1.8 1.3-1.4.5-2.7 1.1-2.7 2.7 0 1.8 1.4 2.8 3.2 2.8 1.8 0 3.2-.9 3.2-2.8h-1.8c0 .8-.6 1.2-1.4 1.2z" />
                  </svg>
                </a>
              )}

              {data?.social?.tiktok && (
                <a
                  href={data.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#111111] shadow-sm transition-all duration-200 hover:scale-110 hover:bg-[#111111] hover:text-white hover:shadow-md"
                  aria-label="TikTok"
                >
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.35 22a6.33 6.33 0 0 0 6.33-6.33V9.05a8.16 8.16 0 0 0 4.91 1.62v-3.98a4.82 4.82 0 0 1-1-.05z" />
                  </svg>
                </a>
              )}

              {data?.social?.zalo && (
                <a
                  href={data.social.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0068FF] hover:scale-110 transition-transform"
                  aria-label="Zalo"
                >
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  </svg>
                </a>
              )}

              {data?.social?.youtube && (
                <a
                  href={data.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#FF0000] hover:scale-110 transition-transform"
                  aria-label="YouTube"
                >
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* ===== COLUMN 2: Products ===== */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4 pb-2 border-b border-[#6CA356]">
              Sản phẩm
            </h3>
            <ul className="space-y-2">
              {data?.products?.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    className="text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== COLUMN 3: Info & Policy Links ===== */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4 pb-2 border-b border-[#6CA356]">
              Thông tin
            </h3>
            <ul className="space-y-2">
              {data?.links?.info_menu?.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    className="text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <h3 className="font-bold text-lg text-white mt-6 mb-4 pb-2 border-b border-[#6CA356]">
              Chính sách
            </h3>
            <PolicyModal policies={data?.links?.policy_menu ?? []} />
          </div>

          {/* ===== COLUMN 4: Contact Info ===== */}
          <div>
            <h3 className="font-bold text-lg text-white mb-4 pb-2 border-b border-[#6CA356]">
              Liên hệ
            </h3>
            <ul className="space-y-3 text-white/90">
              {data?.contact?.phone && (
                <li className="flex items-start gap-2">
                  <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <a
                    href={`tel:${data.contact.phone}`}
                    className="hover:text-white transition-colors"
                  >
                    {data.contact.phone}
                  </a>
                </li>
              )}

              {data?.contact?.email && (
                <li className="flex items-start gap-2">
                  <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${data.contact.email}`}
                    className="hover:text-white transition-colors break-all"
                  >
                    {data.contact.email}
                  </a>
                </li>
              )}

              {data?.contact?.address && (
                <li className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{data.contact.address}</span>
                </li>
              )}

              {data?.contact?.tax_id && (
                <li className="flex items-start gap-2">
                  <span className="font-semibold">MST:</span>
                  <span>{data.contact.tax_id}</span>
                </li>
              )}
            </ul>
            {data?.contact?.working_hours && (
              <div className="mt-4 text-white/90">
                <p className="font-semibold mb-1">Giờ làm việc:</p>
                <p>{data.contact.working_hours}</p>
              </div>
            )}
          </div>

        </div>

      </div>
      <div className="border-t border-white/10 bg-[#3F7734]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-5 py-3 text-xs leading-5 text-white/85 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p className="sm:whitespace-nowrap">
            {data?.brand?.copyright || "© 2026 Orya Babycare. All rights reserved."}
          </p>
          {data?.footer_bottom?.disclaimer && (
            <p className="sm:max-w-[58%] sm:text-right">
              {data.footer_bottom.disclaimer}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
