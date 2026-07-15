import Header from "@/src/components/layout/Header";
import HeroBanner from "@/src/components/home/HeroBanner";
import BrandStory from "@/src/components/home/BrandStory";
import ProductFamily from "@/src/components/home/ProductFamily";
import QualityCertificates from "@/src/components/home/QualityCertificates";
import VideoSection from "@/src/components/home/VideoSection";
import NewsSection from "@/src/components/home/NewsSection";
import PartnerLogos from "@/src/components/home/PartnerLogos";
import Footer from "@/src/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroBanner />
        <BrandStory />
        <ProductFamily />
        <QualityCertificates />
        <VideoSection />
        <NewsSection />
        <PartnerLogos />
      </main>
      <Footer />
    </>
  );
}
