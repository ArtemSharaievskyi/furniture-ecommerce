import { notFound } from "next/navigation";

import { ProductPageView } from "@/features/catalog/components/product-page-view";
import { getProductPageData } from "@/features/catalog/server/catalog-queries";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getProductPageData(slug);

  if (!data) {
    notFound();
  }

  return <ProductPageView {...data} />;
}
