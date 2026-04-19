import "server-only";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";

import type {
  CatalogFilters,
  CatalogFilterOptions,
  CatalogItem,
  CatalogPageData,
  CatalogSort,
} from "../types";

const validSorts: CatalogSort[] = [
  "featured",
  "newest",
  "price-asc",
  "price-desc",
  "name",
];

function toArray(value: string | string[] | undefined) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value.filter(Boolean) : [value];
}

function normalizeMultiValue(value: string | string[] | undefined) {
  return toArray(value)
    .flatMap((item) => item.split(","))
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizePrice(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;

  if (!raw) {
    return undefined;
  }

  const parsed = Number(raw);

  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

export function parseCatalogSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): CatalogFilters {
  const sortCandidate = Array.isArray(searchParams.sort)
    ? searchParams.sort[0]
    : searchParams.sort;

  const sort = validSorts.includes(sortCandidate as CatalogSort)
    ? (sortCandidate as CatalogSort)
    : "featured";

  return {
    categories: normalizeMultiValue(searchParams.category),
    colors: normalizeMultiValue(searchParams.color),
    materials: normalizeMultiValue(searchParams.material),
    minPrice: normalizePrice(searchParams.minPrice),
    maxPrice: normalizePrice(searchParams.maxPrice),
    sort,
  };
}

function buildOrderBy(sort: CatalogSort): Prisma.ProductOrderByWithRelationInput[] {
  switch (sort) {
    case "newest":
      return [{ createdAt: "desc" }];
    case "price-asc":
      return [{ priceCents: "asc" }, { name: "asc" }];
    case "price-desc":
      return [{ priceCents: "desc" }, { name: "asc" }];
    case "name":
      return [{ name: "asc" }];
    case "featured":
    default:
      return [{ isFeatured: "desc" }, { createdAt: "desc" }];
  }
}

function formatCurrency(cents: number, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function buildStockLabel(stockQuantity: number) {
  if (stockQuantity <= 0) {
    return "Out of stock";
  }

  if (stockQuantity <= 5) {
    return `Only ${stockQuantity} left`;
  }

  return "In stock";
}

export async function getCatalogPageData(
  filters: CatalogFilters,
): Promise<CatalogPageData> {
  const where: Prisma.ProductWhereInput = {
    status: "ACTIVE",
    ...(filters.categories.length
      ? {
          category: {
            name: {
              in: filters.categories,
            },
          },
        }
      : {}),
    ...(filters.colors.length
      ? {
          color: {
            in: filters.colors,
            mode: "insensitive",
          },
        }
      : {}),
    ...(filters.materials.length
      ? {
          material: {
            in: filters.materials,
            mode: "insensitive",
          },
        }
      : {}),
    ...(filters.minPrice !== undefined || filters.maxPrice !== undefined
      ? {
          priceCents: {
            ...(filters.minPrice !== undefined
              ? { gte: filters.minPrice * 100 }
              : {}),
            ...(filters.maxPrice !== undefined
              ? { lte: filters.maxPrice * 100 }
              : {}),
          },
        }
      : {}),
  };

  const [products, total, categories, colors, materials, aggregate] =
    await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: buildOrderBy(filters.sort),
        include: {
          category: {
            select: { name: true, slug: true },
          },
          images: {
            orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }],
            take: 1,
          },
          variants: {
            select: { id: true },
          },
        },
      }),
      prisma.product.count({ where }),
      prisma.category.findMany({
        where: {
          slug: {
            in: ["sofas", "chairs", "tables", "beds", "wardrobes"],
          },
          isActive: true,
        },
        orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
        select: {
          id: true,
          name: true,
          slug: true,
        },
      }),
      prisma.product.findMany({
        where: { status: "ACTIVE", color: { not: null } },
        distinct: ["color"],
        select: { color: true },
        orderBy: { color: "asc" },
      }),
      prisma.product.findMany({
        where: { status: "ACTIVE", material: { not: null } },
        distinct: ["material"],
        select: { material: true },
        orderBy: { material: "asc" },
      }),
      prisma.product.aggregate({
        where: { status: "ACTIVE" },
        _min: { priceCents: true },
        _max: { priceCents: true },
      }),
    ]);

  const catalogItems: CatalogItem[] = products.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    shortDescription: product.shortDescription,
    description: product.description,
    category: product.category.name,
    material: product.material ?? "Material pending",
    color: product.color ?? "Color pending",
    size: product.size ?? "Size pending",
    price: formatCurrency(product.priceCents, product.currencyCode),
    imageUrl:
      product.images[0]?.url ??
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    isFeatured: product.isFeatured,
    variantCount: product.variants.length,
    stockLabel: buildStockLabel(product.stockQuantity),
  }));

  const options: CatalogFilterOptions = {
    categories,
    colors: colors
      .map((entry) => entry.color)
      .filter((value): value is string => Boolean(value)),
    materials: materials
      .map((entry) => entry.material)
      .filter((value): value is string => Boolean(value)),
    priceRange: {
      min: Math.floor((aggregate._min.priceCents ?? 0) / 100),
      max: Math.ceil((aggregate._max.priceCents ?? 0) / 100),
    },
    sorting: [
      {
        value: "featured",
        label: "Featured",
        description: "Highlights premium editorial picks first.",
      },
      {
        value: "newest",
        label: "Newest",
        description: "Recently added products appear first.",
      },
      {
        value: "price-asc",
        label: "Price: Low to High",
        description: "Great for discovering entry pieces first.",
      },
      {
        value: "price-desc",
        label: "Price: High to Low",
        description: "Surface statement furniture before smaller pieces.",
      },
      {
        value: "name",
        label: "Name",
        description: "Simple alphabetical product ordering.",
      },
    ],
  };

  return {
    filters,
    products: catalogItems,
    options,
    total,
  };
}
