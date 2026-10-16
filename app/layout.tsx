import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/src/lib/cartContext";
import CartDrawer from "@/src/components/cart/CartDrawer";
import SmoothScroll from "@/src/components/SmoothScroll";

// Force dynamic rendering - disable SSR cache for fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) }
    : {}),
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
  },
  twitter: {
    card: "summary",
    title: "Orya — Chăm sóc da mẹ bầu & bé yêu | CVI Pharma",
    description:
      "Sản phẩm chăm sóc da chuyên biệt cho mẹ bầu và trẻ sơ sinh. Dầu rạn da, kem bôi ngực, nước tắm gội thiên nhiên.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${geistSans.variable} antialiased`} data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col bg-[#EFFFE9] text-[#404041]">
        <SmoothScroll />
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
