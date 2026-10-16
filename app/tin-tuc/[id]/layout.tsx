import type { Metadata } from "next";
import { getPublishedNews } from "@/src/lib/dbService";

const BASE_URL = "https://orya.vn";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const allNews = await getPublishedNews();
    const article = allNews.find((item) => item.id.toString() === id.toString());
    if (!article) return {};

    const description =
      article.excerpt ||
      article.content.slice(0, 160).replace(/\n/g, " ");

    const ogImage = article.cover_image;

    return {
      title: article.title,
      description,
      keywords: [
        article.title,
        "Orya",
        "CVI Pharma",
        "mỹ phẩm mẹ bầu",
        "chăm sóc da thiên nhiên",
        "kiến thức sức khỏe mẹ bé",
      ],
      alternates: {
        canonical: `${BASE_URL}/tin-tuc/${id}`,
      },
      openGraph: {
        title: article.title,
        description,
        url: `${BASE_URL}/tin-tuc/${id}`,
        type: "article",
        publishedTime: article.published_date,
        authors: article.author ? [article.author] : undefined,
        ...(ogImage ? { images: [
          {
            url: ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ] } : {}),
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description,
        ...(ogImage ? { images: [ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`] } : {}),
      },
    };
  } catch (error) {
    console.error("Error generating article metadata:", error);
    return {};
  }
}

export default function NewsDetailLayout({ children }: LayoutProps) {
  return <>{children}</>;
}