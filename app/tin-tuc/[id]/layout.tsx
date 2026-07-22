import type { Metadata } from "next";
import { getNews } from "@/src/lib/dbService";

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
    const allNews = await getNews();
    const article = allNews.find((item) => item.id.toString() === id.toString());

    if (!article) {
      return {
        title: "Bài Viết Không Tìm Thấy",
        description: "Bài viết này không tồn tại hoặc đã bị gỡ bỏ.",
      };
    }

    const description =
      article.excerpt ||
      (article.content ? article.content.slice(0, 160).replace(/\n/g, " ") + "..." : "") ||
      `${article.title} - Kiến thức chăm sóc sức khỏe mẹ bầu và bé yêu từ Orya.`;

    const ogImage = article.cover_image || "/banner.jpg";

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
        images: [
          {
            url: ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description,
        images: [ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`],
      },
    };
  } catch {
    return {
      title: "Tin Tức Orya",
      description: "Kiến thức chăm sóc sức khỏe mẹ bầu và bé yêu từ Orya & CVI Pharma.",
    };
  }
}

export default function NewsDetailLayout({ children }: LayoutProps) {
  return <>{children}</>;
}