import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin Tức & Kiến Thức Chăm Sóc Mẹ Bầu & Bé - Orya",
  description:
    "Cập nhật tin tức, kiến thức khoa học về chăm sóc da mẹ bầu, bé sơ sinh. Bí quyết làm đẹp sau sinh, phòng ngừa rạn da, chọn mỹ phẩm an toàn từ Orya & CVI Pharma.",
  keywords: [
    "tin tức mẹ bầu",
    "kiến thức chăm sóc bé",
    "chăm sóc da sau sinh",
    "phòng ngừa rạn da",
    "mỹ phẩm an toàn cho bé",
    "Orya",
    "CVI Pharma",
  ],
  alternates: {
    canonical: "https://orya.vn/tin-tuc",
  },
  openGraph: {
    title: "Tin Tức & Kiến Thức Chăm Sóc Mẹ Bầu & Bé - Orya",
    description:
      "Cập nhật tin tức, kiến thức khoa học về chăm sóc da mẹ bầu, bé sơ sinh từ Orya & CVI Pharma.",
    url: "https://orya.vn/tin-tuc",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Tin tức Orya - Kiến thức chăm sóc mẹ bầu và bé yêu",
      },
    ],
  },
};

export default function TinTucLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}