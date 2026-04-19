import { CatalogPageView } from "@/features/catalog/components/catalog-page-view";
import { getCatalogProducts } from "@/lib/cms/loaders";

export default async function CatalogPage() {
  const products = await getCatalogProducts();

  return <CatalogPageView products={products} />;
}
