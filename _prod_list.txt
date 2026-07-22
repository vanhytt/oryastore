import ProductsPageClient from "@/src/components/products/ProductsPageClient";
import { getActiveProducts } from "@/src/lib/dbService";

export default async function ProductsPage() {
  const initialProducts = await getActiveProducts();
  return <ProductsPageClient initialProducts={initialProducts} />;
}
