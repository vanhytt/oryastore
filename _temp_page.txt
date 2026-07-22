import Header from "@/src/components/layout/Header";
import HeroBanner from "@/src/components/home/HeroBanner";
import BrandStory from "@/src/components/home/BrandStory";
import ProductFamily from "@/src/components/home/ProductFamily";
import QualityCertificates from "@/src/components/home/QualityCertificates";
import NewsSection from "@/src/components/home/NewsSection";
import PartnerLogos from "@/src/components/home/PartnerLogos";
import Footer from "@/src/components/layout/Footer";
import { getActiveProducts, getNews, getPartners } from "@/src/lib/dbService";

export default async function Home() {
  const [products, news, partners] = await Promise.all([getActiveProducts(), getNews(), getPartners()]);

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
