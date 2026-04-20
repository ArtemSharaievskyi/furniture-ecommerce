import "server-only";

import { prisma } from "@/lib/db";

const fallbackImage =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80";

export async function getHomePageData() {
  const featuredCategories = await prisma.category.findMany({
    where: {
      isActive: true,
      products: {
        some: {
          status: "ACTIVE",
        },
      },
    },
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    take: 3,
    include: {
      products: {
        where: {
          status: "ACTIVE",
        },
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
        take: 1,
        include: {
          images: {
            orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }],
            take: 1,
          },
        },
      },
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  const featuredProducts = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      isFeatured: true,
    },
    orderBy: [{ createdAt: "desc" }],
    take: 4,
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
  });

  const fallbackProducts =
    featuredProducts.length < 4
      ? await prisma.product.findMany({
          where: {
            status: "ACTIVE",
            id: {
              notIn: featuredProducts.map((product) => product.id),
            },
          },
          orderBy: [{ createdAt: "desc" }],
          take: 4 - featuredProducts.length,
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
        })
      : [];

  return {
    featuredCategories: featuredCategories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      imageUrl: category.products[0]?.images[0]?.url ?? fallbackImage,
      productCount: category._count.products,
    })),
    featuredProducts: [...featuredProducts, ...fallbackProducts].map((product) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category.name,
      categorySlug: product.category.slug,
      shortDescription: product.shortDescription,
      material: product.material,
      color: product.color,
      size: product.size,
      priceCents: product.priceCents,
      currencyCode: product.currencyCode,
      imageUrl: product.images[0]?.url ?? fallbackImage,
    })),
  };
}
