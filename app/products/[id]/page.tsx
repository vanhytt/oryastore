import React from "react";
import { notFound } from "next/navigation";
import { getActiveProducts, getProductBySlug } from "@/src/lib/dbService";
import ProductDetail from "@/src/components/product/ProductDetail";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for Next.js build pre-rendering
export async function generateStaticParams() {
  const allProducts = await getActiveProducts();
  return allProducts.map((product) => ({
    id: product.slug || product.id.toString(),
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  // Try to find product by slug first
  let product = await getProductBySlug(id);

  // Fallback: if slug didn't match, try fetching all and matching by numeric ID
  const allProducts = await getActiveProducts();
  if (!product) {
    const numericId = parseInt(id);
    if (!isNaN(numericId)) {
      product = allProducts.find((p) => p.id === numericId) || null;
    }
  }

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <ProductDetail product={product} allProducts={allProducts} />
      </main>
      <Footer />
    </>
  );
}