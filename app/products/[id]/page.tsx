import React from "react";
import { notFound } from "next/navigation";
import { products } from "@/src/data/products";
import ProductDetail from "@/src/components/product/ProductDetail";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for Next.js build pre-rendering
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <ProductDetail product={product} allProducts={products} />
      </main>
      <Footer />
    </>
  );
}