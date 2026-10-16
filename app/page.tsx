import type { Metadata } from "next";
import Header from "@/src/components/layout/Header";
import HeroBanner from "@/src/components/home/HeroBanner";
import BrandStory from "@/src/components/home/BrandStory";
import ProductFamily from "@/src/components/home/ProductFamily";
import QualityCertificates from "@/src/components/home/QualityCertificates";
import NewsSection from "@/src/components/home/NewsSection";
import PartnerLogos from "@/src/components/home/PartnerLogos";
import Footer from "@/src/components/layout/Footer";
import { getActiveProducts, getPublishedNews, getPartners } from "@/src/lib/dbService";

// Force dynamic rendering - disable SSR cache for fresh logo/banner
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Orya — Chăm sóc da mẹ bầu & bé yêu | CVI Pharma",
  description:
    "Orya - Thương hiệu mỹ phẩm thiên nhiên chuyên biệt cho mẹ bầu và bé yêu. Dầu rạn da, kem bôi ngực sau sinh, dưỡng thể baby an toàn từ CVI Pharma.",
  keywords: [
    "mỹ phẩm mẹ bầu",
    "dầu rạn da",
    "kem bôi ngực sau sinh",
    "dưỡng thể baby",
    "chăm sóc da trẻ sơ sinh",
    "Orya",
    "CVI Pharma",
  ],
  alternates: {
    canonical: "https://orya.vn",
  },
  openGraph: {
    url: "https://orya.vn",
    title: "Orya — Chăm sóc da mẹ bầu & bé yêu | CVI Pharma",
    description:
      "Thương hiệu mỹ phẩm thiên nhiên chuyên biệt cho mẹ bầu và bé yêu. Dầu rạn da, kem bôi ngực sau sinh, dưỡng thể baby an toàn từ CVI Pharma.",
  },
};

export default async function Home() {
  const [products, news, partners] = await Promise.all([getActiveProducts(), getPublishedNews(), getPartners()]);

  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <BrandStory />
        <ProductFamily products={products} />
        <QualityCertificates />
        <NewsSection news={news} />
        <PartnerLogos partners={partners} />
      </main>
      <Footer />
    </>
  );
}
