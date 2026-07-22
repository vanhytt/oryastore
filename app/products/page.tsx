import type { Metadata } from "next";
import ProductsPageClient from "@/src/components/products/ProductsPageClient";
import { getActiveProducts } from "@/src/lib/dbService";

export const metadata: Metadata = {
  title: "Sản Phẩm Orya - Mỹ Phẩm Chăm Sóc Mẹ Bầu & Bé Yêu",
  description:
    "Khám phá bộ sưu tập sản phẩm Orya: dầu rạn da, kem bôi ngực sau sinh, dưỡng thể baby, nước tắm gội thiên nhiên. An toàn, lành tính, chuẩn Vegan & CGMP-ASEAN.",
  keywords: [
    "mỹ phẩm mẹ bầu",
    "dầu rạn da",
    "kem bôi ngực sau sinh",
    "dưỡng thể baby",
    "tắm gội bé",
    "chăm sóc sau sinh",
    "Orya",
    "CVI Pharma",
  ],
  alternates: {
    canonical: "https://orya.vn/san-pham",
  },
  openGraph: {
    title: "Sản Phẩm Orya - Mỹ Phẩm Chăm Sóc Mẹ Bầu & Bé Yêu",
    description:
      "Khám phá bộ sưu tập sản phẩm Orya: dầu rạn da, kem bôi ngực sau sinh, dưỡng thể baby, nước tắm gội thiên nhiên. An toàn, lành tính, chuẩn Vegan & CGMP-ASEAN.",
    url: "https://orya.vn/san-pham",
    images: [{ url: "/banner.jpg", width: 1200, height: 630, alt: "Sản phẩm Orya - Mỹ phẩm mẹ bầu và bé yêu" }],
  },
};

export default async function ProductsPage() {
  const initialProducts = await getActiveProducts();
  return <ProductsPageClient initialProducts={initialProducts} />;
}
