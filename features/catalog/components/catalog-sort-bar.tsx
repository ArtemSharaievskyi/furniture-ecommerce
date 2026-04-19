import type { CatalogFilters } from "@/features/catalog/types";

const sortLabels: Record<CatalogFilters["sort"], string> = {
  featured: "Featured",
  newest: "Newest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  name: "Name",
};

export function CatalogSortBar({ filters }: { filters: CatalogFilters }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
      <span>Sorted by</span>
      <span className="font-medium text-foreground">{sortLabels[filters.sort]}</span>
    </div>
  );
}
