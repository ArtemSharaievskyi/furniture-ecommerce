import "server-only";

import categories from "@/content/cms/categories.json";
import products from "@/content/cms/products.json";
import type { CatalogProduct } from "@/lib/types";

export async function getCatalogProducts(): Promise<CatalogProduct[]> {
  return products as CatalogProduct[];
}

export async function getCatalogProductBySlug(slug: string) {
  const catalog = await getCatalogProducts();

  return catalog.find((product) => product.slug === slug) ?? null;
}

export async function getCategories() {
  return categories;
}
