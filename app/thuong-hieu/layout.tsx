import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Câu Chuyện Thương Hiệu Orya - CVI Pharma",
  description:
    "Khám phá câu chuyện thương hiệu Orya - từ tình mẫu tử đến khoa học thảo dược. Mỹ phẩm thiên nhiên cho mẹ bầu và bé yêu, sản xuất bởi CVI Pharma đạt chuẩn CGMP-ASEAN.",
  keywords: [
    "thương hiệu Orya",
    "CVI Pharma",
    "mỹ phẩm thiên nhiên",
    "mỹ phẩm mẹ bầu",
    "chăm sóc da trẻ sơ sinh",
    "CGMP-ASEAN",
    "thảo dược thuần chay",
  ],
  alternates: {
    canonical: "https://orya.vn/thuong-hieu",
  },
  openGraph: {
    title: "Câu Chuyện Thương Hiệu Orya - CVI Pharma",
    description:
      "Khám phá câu chuyện thương hiệu Orya - từ tình mẫu tử đến khoa học thảo dược. Mỹ phẩm thiên nhiên cho mẹ bầu và bé yêu.",
    url: "https://orya.vn/thuong-hieu",
    images: [
      {
        url: "/about.jpg",
        width: 1200,
        height: 630,
        alt: "Câu chuyện thương hiệu Orya - Chăm sóc da mẹ và bé",
      },
    ],
  },
};

export default function ThuongHieuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}