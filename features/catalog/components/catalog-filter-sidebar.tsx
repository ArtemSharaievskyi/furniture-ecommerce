import { FilterXIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import type {
  CatalogFilters,
  CatalogFilterOptions,
} from "@/features/catalog/types";
import { cn } from "@/lib/utils";

function FilterPill({
  name,
  label,
  checked,
}: {
  name: string;
  label: string;
  checked: boolean;
}) {
  return (
    <label
      className={cn(
        "cursor-pointer rounded-full border px-3 py-2 text-sm transition-colors",
        checked
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-foreground hover:bg-muted",
      )}
    >
      <input
        type="checkbox"
        name={name}
        value={label}
        defaultChecked={checked}
        className="sr-only"
      />
      {label}
    </label>
  );
}

export function CatalogFilterSidebar({
  filters,
  options,
}: {
  filters: CatalogFilters;
  options: CatalogFilterOptions;
}) {
  return (
    <Card className="border-border/70 bg-card/90">
      <CardHeader>
        <CardTitle className="font-heading text-3xl tracking-tight">
          Filters
        </CardTitle>
        <CardDescription>
          Narrow the catalog by category, material, color, and price.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action="/catalog" className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">Sort</h3>
            <div className="grid gap-2">
              {options.sorting.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "cursor-pointer rounded-2xl border px-4 py-3 text-sm transition-colors",
                    filters.sort === option.value
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background text-foreground hover:bg-muted",
                  )}
                >
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    defaultChecked={filters.sort === option.value}
                    className="sr-only"
                  />
                  <span className="block font-medium">{option.label}</span>
                  <span
                    className={cn(
                      "mt-1 block text-xs",
                      filters.sort === option.value
                        ? "text-background/80"
                        : "text-muted-foreground",
                    )}
                  >
                    {option.description}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">Category</h3>
            <div className="flex flex-wrap gap-2">
              {options.categories.map((category) => (
                <FilterPill
                  key={category.slug}
                  name="category"
                  label={category.name}
                  checked={filters.categories.includes(category.name)}
                />
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">Price</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                name="minPrice"
                type="number"
                inputMode="numeric"
                placeholder={`Min ${options.priceRange.min}`}
                defaultValue={filters.minPrice ?? ""}
              />
              <Input
                name="maxPrice"
                type="number"
                inputMode="numeric"
                placeholder={`Max ${options.priceRange.max}`}
                defaultValue={filters.maxPrice ?? ""}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Stored and filtered in USD-equivalent cents for now.
            </p>
          </div>

          <Separator />

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">Color</h3>
            <div className="flex flex-wrap gap-2">
              {options.colors.map((color) => (
                <FilterPill
                  key={color}
                  name="color"
                  label={color}
                  checked={filters.colors.includes(color)}
                />
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">Material</h3>
            <div className="flex flex-wrap gap-2">
              {options.materials.map((material) => (
                <FilterPill
                  key={material}
                  name="material"
                  label={material}
                  checked={filters.materials.includes(material)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button type="submit">Apply filters</Button>
            <a href="/catalog" className={buttonVariants({ variant: "outline" })}>
              <FilterXIcon data-icon="inline-start" />
              Clear all
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
