import { CatalogPageView } from "@/features/catalog/components/catalog-page-view";
import {
  getCatalogPageData,
  parseCatalogSearchParams,
} from "@/features/catalog/server/catalog-queries";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  const filters = parseCatalogSearchParams(resolvedSearchParams);
  const data = await getCatalogPageData(filters);

  return <CatalogPageView {...data} filters={filters} />;
}
