import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

import {
  ensureProductSearchIndex,
  indexProductDocuments,
  type ProductSearchDocument,
} from "../lib/search/meili";

function formatCurrency(cents: number, currencyCode: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

async function main() {
  const connectionString =
    process.env.DATABASE_URL ??
    "postgresql://postgres:postgres@localhost:5432/north_atelier?schema=public";

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
    },
    include: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
      images: {
        orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }],
        take: 1,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const documents: ProductSearchDocument[] = products.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category.name,
    categorySlug: product.category.slug,
    material: product.material ?? "Material pending",
    color: product.color ?? "Color pending",
    size: product.size ?? "Size pending",
    description: product.description,
    shortDescription: product.shortDescription ?? "",
    imageUrl:
      product.images[0]?.url ??
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    priceCents: product.priceCents,
    price: formatCurrency(product.priceCents, product.currencyCode),
    isFeatured: product.isFeatured,
    createdAt: product.createdAt.toISOString(),
  }));

  await ensureProductSearchIndex();
  const result = await indexProductDocuments(documents);
  await prisma.$disconnect();

  console.log(
    JSON.stringify(
      {
        meilisearch: {
          indexedProducts: result.indexed,
        },
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
