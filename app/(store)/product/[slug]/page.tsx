import { notFound } from "next/navigation";

import { ProductPageView } from "@/features/catalog/components/product-page-view";
import { getCatalogProductBySlug } from "@/lib/cms/loaders";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getCatalogProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductPageView product={product} />;
}
