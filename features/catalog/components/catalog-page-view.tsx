import { FilterIcon, SlidersHorizontalIcon } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type {
  CatalogFilters,
  CatalogFilterOptions,
  CatalogItem,
} from "@/features/catalog/types";

import { CatalogFilterSidebar } from "./catalog-filter-sidebar";
import { CatalogMobileFilters } from "./catalog-mobile-filters";
import { CatalogProductCard } from "./catalog-product-card";
import { CatalogSortBar } from "./catalog-sort-bar";

export function CatalogPageView({
  filters,
  products,
  options,
  total,
}: {
  filters: CatalogFilters;
  products: CatalogItem[];
  options: CatalogFilterOptions;
  total: number;
}) {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="Catalog"
        title="Refined furniture for quiet rooms, generous homes, and modern living."
        description="Browse the full collection with server-driven filters for category, price, color, and material. The interface stays fast, clean, and intentionally understated."
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6">
        <div className="flex items-center justify-between gap-4 lg:hidden">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
              Product directory
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {total} products available
            </p>
          </div>
          <CatalogMobileFilters filters={filters} options={options}>
            <Button variant="outline">
              <FilterIcon data-icon="inline-start" />
              Filters
            </Button>
          </CatalogMobileFilters>
        </div>

        <div className="grid gap-8 lg:grid-cols-[292px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <CatalogFilterSidebar filters={filters} options={options} />
            </div>
          </aside>

          <section className="flex min-w-0 flex-col gap-6">
            <FadeIn>
              <div className="rounded-[1.75rem] border border-border/70 bg-card/80 px-5 py-4 shadow-sm shadow-stone-900/5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-accent/70 text-foreground">
                      <SlidersHorizontalIcon className="size-4" />
                    </div>
                    <div>
                      <h2 className="font-heading text-3xl tracking-tight text-foreground">
                        Collection View
                      </h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {total} products matched your current catalog filters.
                      </p>
                    </div>
                  </div>
                  <CatalogSortBar filters={filters} />
                </div>
                <Separator className="my-4" />
                <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <span>{filters.categories.length || 0} category filters</span>
                  <span>{filters.colors.length || 0} color filters</span>
                  <span>{filters.materials.length || 0} material filters</span>
                  <span>
                    {filters.minPrice || filters.maxPrice ? "Price limited" : "All prices"}
                  </span>
                </div>
              </div>
            </FadeIn>

            {products.length ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product, index) => (
                  <CatalogProductCard
                    key={product.id}
                    product={product}
                    delay={index * 0.04}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-border bg-card/70 px-8 py-16 text-center">
                <h3 className="font-heading text-4xl tracking-tight text-foreground">
                  No products match these filters.
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                  Try clearing a few filter groups or broadening the price range
                  to explore more of the collection.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
