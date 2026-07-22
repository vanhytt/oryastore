import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/src/lib/cartContext";
import CartDrawer from "@/src/components/cart/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://oryastore.vercel.app/"),
  title: {
    default: "Orya — Chăm sóc da mẹ bầu & bé yêu | CVI Pharma",
    template: "%s | Orya - Chăm sóc da mẹ & bé",
  },
  description:
    "Orya — Sản phẩm chăm sóc da chuyên biệt cho mẹ bầu và trẻ sơ sinh. Dầu rạn da, kem bôi ngực, nước tắm gội thiên nhiên. 100% an toàn, chứng nhận Vegan & CGMP-ASEAN.",
  keywords: [
    "mỹ phẩm mẹ bầu",
    "kem chống rạn da",
    "dầu rạn da",
    "kem bôi ngực sau sinh",
    "dưỡng thể baby",
    "chăm sóc da trẻ sơ sinh",
    "Orya",
    "CVI Pharma",
    "mỹ phẩm thiên nhiên",
    "sản phẩm sau sinh",
  ],
  authors: [{ name: "CVI Pharma", url: "/" }],
  creator: "CVI Pharma",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: "Orya - Chăm sóc da mẹ & bé",
    title: "Orya — Chăm sóc da mẹ bầu & bé yêu | CVI Pharma",
    description:
      "Orya — Sản phẩm chăm sóc da chuyên biệt cho mẹ bầu và trẻ sơ sinh. Dầu rạn da, kem bôi ngực, nước tắm gội thiên nhiên. 100% an toàn, chứng nhận Vegan & CGMP-ASEAN.",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Orya - Mỹ phẩm chăm sóc da mẹ bầu và bé yêu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orya — Chăm sóc da mẹ bầu & bé yêu | CVI Pharma",
    description:
      "Sản phẩm chăm sóc da chuyên biệt cho mẹ bầu và trẻ sơ sinh. Dầu rạn da, kem bôi ngực, nước tắm gội thiên nhiên.",
    images: ["/banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Orya - CVI Pharma",
  url: "https://oryastore.vercel.app/",
  logo: "https://oryastore.vercel.app/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+84-398126895",
    contactType: "customer service",
    areaServed: "VN",
    availableLanguage: "Vietnamese",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "154 Hoàng Văn Thái",
    addressLocality: "Hà Nội",
    addressCountry: "VN",
  },
  sameAs: [
    "https://www.facebook.com/share/1Em6X2dKY5/?mibextid=wwXIfr",
    "https://s.shopee.vn/6VMRS6jxbW",
    "https://vt.tiktok.com/ZSXVBU9td/?page=TikTokShop",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${geistSans.variable} h-full antialiased`} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#EFFFE9] text-[#404041]">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
