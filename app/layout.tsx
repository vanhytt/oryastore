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
  title: "Orya — Chăm sóc da mẹ bầu & bé yêu | CVI Pharma",
  description:
    "Orya — Sản phẩm chăm sóc da chuyên biệt cho mẹ bầu và trẻ sơ sinh. Dầu rạn da, kem bôi ngực, nước tắm gội thiên nhiên. 100% an toàn, chứng nhận Vegan & CGMP-ASEAN.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#EFFFE9] text-[#404041]">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
