import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/products/"],
      },
    ],
    sitemap: "https://orya.vn/sitemap.xml",
    host: "https://orya.vn",
  };
}