import { MetadataRoute } from "next";
import { getActiveProducts, getNews } from "@/src/lib/dbService";

const BASE_URL = "https://orya.vn";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/san-pham`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/thuong-hieu`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tin-tuc`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic product pages
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await getActiveProducts();
    productPages = products.map((product) => ({
      url: `${BASE_URL}/san-pham/${product.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    // Supabase not configured – skip product pages
  }

  // Dynamic news pages
  let newsPages: MetadataRoute.Sitemap = [];
  try {
    const allNews = await getNews();
    const published = allNews.filter(
      (item) => item.status === "Published" || !item.status
    );
    newsPages = published.map((item) => ({
      url: `${BASE_URL}/tin-tuc/${item.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    // Supabase not configured – skip news pages
  }

  return [...staticPages, ...productPages, ...newsPages];
}