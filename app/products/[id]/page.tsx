import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getActiveProducts, getProductBySlug } from "@/src/lib/dbService";
import ProductDetail from "@/src/components/product/ProductDetail";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";

const BASE_URL = "https://orya.vn";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function resolveProduct(id: string) {
  let product = await getProductBySlug(id);
  if (!product) {
    const allProducts = await getActiveProducts();
    product = allProducts.find((p) => p.id?.toString() === id) || null;
  }
  return product;
}

// Generate static params for Next.js build pre-rendering
export async function generateStaticParams() {
  const allProducts = await getActiveProducts();
  return allProducts.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await resolveProduct(id);

  if (!product) {
    return { title: "Sản phẩm không tìm thấy" };
  }

  const productImage =
    product.primaryImage ||
    product.image_url ||
    product.image ||
    (product.images && product.images[0]) ||
    "/banner.jpg";

  const description =
    product.shortDescription ||
    product.description?.slice(0, 160) ||
    `${product.name} - Sản phẩm chăm sóc da chuyên biệt từ Orya Natural, an toàn cho mẹ bầu và bé yêu.`;

  const canonicalPath = product.slug
    ? `/san-pham/${product.slug}`
    : `/san-pham/${product.id}`;

  return {
    title: `${product.name} - Orya Natural`,
    description,
    keywords: [
      product.name,
      product.category,
      "Orya",
      "CVI Pharma",
      "mỹ phẩm mẹ bầu",
      "chăm sóc da thiên nhiên",
    ],
    alternates: {
      canonical: `${BASE_URL}${canonicalPath}`,
    },
    openGraph: {
      title: `${product.name} - Orya Natural`,
      description,
      url: `${BASE_URL}${canonicalPath}`,
      type: "website",
      images: [
        {
          url: productImage.startsWith("http") ? productImage : `${BASE_URL}${productImage}`,
          width: 800,
          height: 800,
          alt: `${product.name} - Orya Natural`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - Orya Natural`,
      description,
      images: [productImage.startsWith("http") ? productImage : `${BASE_URL}${productImage}`],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await resolveProduct(id);
  const allProducts = await getActiveProducts();

  if (!product) {
    notFound();
  }

  const productImage =
    product.primaryImage ||
    product.image_url ||
    product.image ||
    (product.images && product.images[0]) ||
    "/banner.jpg";

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: productImage.startsWith("http") ? productImage : `${BASE_URL}${productImage}`,
    description:
      product.shortDescription ||
      product.description?.slice(0, 300) ||
      product.name,
    brand: {
      "@type": "Brand",
      name: product.brand || "Orya",
    },
    offers: {
      "@type": "Offer",
      price: product.priceValue || 0,
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/san-pham/${product.slug || product.id}`,
      seller: {
        "@type": "Organization",
        name: "Orya - CVI Pharma",
      },
    },
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <ProductDetail product={product} allProducts={allProducts} />
      </main>
      <Footer />
    </>
  );
}
