"use client";

import { useDeferredValue, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRightIcon,
  LoaderCircleIcon,
  SearchIcon,
  SparklesIcon,
  XIcon,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CatalogSearchResponse } from "@/features/catalog/types";
import { cn } from "@/lib/utils";

function buildCatalogHref(
  pathname: string,
  searchParams: URLSearchParams,
  updates: Record<string, string | null>,
) {
  const params = new URLSearchParams(searchParams.toString());

  for (const [key, value] of Object.entries(updates)) {
    if (value && value.trim()) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  }

  const queryString = params.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
}

export function CatalogSearch({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query.trim());

  const suggestionsQuery = useQuery<CatalogSearchResponse>({
    queryKey: ["catalog-search", deferredQuery],
    enabled: deferredQuery.length >= 2,
    queryFn: async () => {
      const response = await fetch(
        `/api/search/products?q=${encodeURIComponent(deferredQuery)}`,
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      return response.json() as Promise<CatalogSearchResponse>;
    },
  });

  const results = suggestionsQuery.data?.results ?? [];
  const suggestions = suggestionsQuery.data?.suggestions ?? {
    products: [],
    categories: [],
    materials: [],
  };
  const dropdownVisible = isOpen && deferredQuery.length >= 2;

  function applySearch(nextQuery: string) {
    const normalized = nextQuery.trim();

    startTransition(() => {
      router.replace(
        buildCatalogHref(pathname, new URLSearchParams(searchParams.toString()), {
          q: normalized || null,
        }),
      );
    });

    setIsOpen(false);
  }

  function applyFilter(key: "category" | "material", value: string) {
    const params = new URLSearchParams(searchParams.toString());
    const existingValues = params.getAll(key);

    if (!existingValues.includes(value)) {
      params.append(key, value);
    }

    startTransition(() => {
      router.replace(buildCatalogHref(pathname, params, {}));
    });

    setIsOpen(false);
  }

  return (
    <div className="relative">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          applySearch(query);
        }}
        className="relative"
      >
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            window.setTimeout(() => {
              setIsOpen(false);
            }, 120);
          }}
          placeholder="Search by name, category, material, or mood..."
          className="h-14 rounded-[1.5rem] border-border/70 bg-background pl-12 pr-32 text-sm shadow-sm shadow-stone-900/5"
        />
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                applySearch("");
              }}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon-sm" }),
                "rounded-full",
              )}
            >
              <XIcon />
              <span className="sr-only">Clear search</span>
            </button>
          ) : null}
          <button
            type="submit"
            className={cn(buttonVariants(), "rounded-full px-4")}
          >
            {isPending ? <LoaderCircleIcon className="animate-spin" /> : "Search"}
          </button>
        </div>
      </form>

      <AnimatePresence>
        {dropdownVisible ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-30 overflow-hidden rounded-[1.75rem] border border-border/70 bg-background/98 shadow-2xl shadow-stone-950/10 backdrop-blur"
          >
            <div className="border-b border-border/70 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    Instant Search
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Live product matches from Meilisearch.
                  </p>
                </div>
                {suggestionsQuery.isFetching ? (
                  <LoaderCircleIcon className="size-4 animate-spin text-muted-foreground" />
                ) : null}
              </div>
            </div>

            <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_240px]">
              <div className="flex min-w-0 flex-col gap-3">
                {results.length ? (
                  results.map((result) => (
                    <Link
                      key={result.id}
                      href={`/product/${result.slug}`}
                      className="group flex items-start gap-4 rounded-[1.25rem] border border-transparent p-2 transition-colors hover:border-border hover:bg-muted/60"
                    >
                      <div
                        className="size-[4.5rem] shrink-0 rounded-[1rem] border border-border/60 bg-cover bg-center"
                        style={{ backgroundImage: `url("${result.imageUrl}")` }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                            {result.category}
                          </span>
                          {result.isFeatured ? (
                            <span className="rounded-full bg-foreground px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-background">
                              Featured
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-3 font-medium text-foreground">
                          {result.name}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
                          {result.shortDescription}
                        </p>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <span className="text-sm text-muted-foreground">
                            {result.material}
                          </span>
                          <span className="font-medium text-foreground">
                            {result.price}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="rounded-[1.5rem] border border-dashed border-border bg-muted/30 px-5 py-8">
                    <p className="font-medium text-foreground">
                      No live matches yet
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Try a broader product name, material, or category term.
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    applySearch(query);
                  }}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full justify-between rounded-[1.25rem]",
                  )}
                >
                  <span>{`View catalog results for "${query.trim() || deferredQuery}"`}</span>
                  <ArrowRightIcon />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-[1.5rem] border border-border/70 bg-muted/35 p-4">
                  <div className="flex items-center gap-2">
                    <SparklesIcon className="size-4 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">
                      Suggestions
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {suggestions.products.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onMouseDown={(event) => {
                          event.preventDefault();
                          setQuery(suggestion);
                          applySearch(suggestion);
                        }}
                        className="rounded-full border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                      >
                        {suggestion}
                      </button>
                    ))}
                    {!suggestions.products.length ? (
                      <p className="text-sm text-muted-foreground">
                        Keep typing to surface product suggestions.
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-border/70 bg-background p-4">
                  <p className="text-sm font-medium text-foreground">Matching categories</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {suggestions.categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onMouseDown={(event) => {
                          event.preventDefault();
                          applyFilter("category", category);
                        }}
                        className="rounded-full border border-border bg-muted/50 px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                      >
                        {category}
                      </button>
                    ))}
                    {!suggestions.categories.length ? (
                      <p className="text-sm text-muted-foreground">
                        Categories appear when matches cluster around one collection.
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-border/70 bg-background p-4">
                  <p className="text-sm font-medium text-foreground">Matching materials</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {suggestions.materials.map((material) => (
                      <button
                        key={material}
                        type="button"
                        onMouseDown={(event) => {
                          event.preventDefault();
                          applyFilter("material", material);
                        }}
                        className="rounded-full border border-border bg-muted/50 px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted"
                      >
                        {material}
                      </button>
                    ))}
                    {!suggestions.materials.length ? (
                      <p className="text-sm text-muted-foreground">
                        Material facets appear as soon as the search narrows.
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
