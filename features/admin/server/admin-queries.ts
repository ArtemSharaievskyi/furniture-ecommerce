import "server-only";

import { prisma } from "@/lib/db";

export async function getAdminShellData() {
  const [orders, products, categories] = await Promise.all([
    prisma.order.count(),
    prisma.product.count(),
    prisma.category.count(),
  ]);

  return {
    orders,
    products,
    categories,
  };
}

export async function getAdminDashboardData() {
  const [counts, recentOrders, lowStockProducts] = await Promise.all([
    getAdminShellData(),
    prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        orderNumber: true,
        status: true,
        totalCents: true,
        currencyCode: true,
        createdAt: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    }),
    prisma.product.findMany({
      where: {
        stockQuantity: {
          lte: 5,
        },
      },
      orderBy: {
        stockQuantity: "asc",
      },
      take: 5,
      select: {
        id: true,
        name: true,
        stockQuantity: true,
        status: true,
      },
    }),
  ]);

  const revenueCents = await prisma.order.aggregate({
    _sum: {
      totalCents: true,
    },
    where: {
      status: {
        in: ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"],
      },
    },
  });

  return {
    counts,
    recentOrders,
    lowStockProducts,
    revenueCents: revenueCents._sum.totalCents ?? 0,
  };
}

export async function getAllAdminOrders() {
  return prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          email: true,
        },
      },
      items: {
        select: {
          id: true,
        },
      },
    },
  });
}

export async function getAllAdminProducts() {
  return prisma.product.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      images: {
        orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }],
        take: 1,
      },
      variants: {
        orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
        take: 1,
      },
      _count: {
        select: {
          orderItems: true,
          cartItems: true,
        },
      },
    },
  });
}

export async function getAdminProductById(productId: string) {
  return prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: {
        orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }],
      },
      variants: {
        orderBy: [{ isDefault: "desc" }, { createdAt: "asc" }],
      },
    },
  });
}

export async function getAdminCategoryOptions() {
  return prisma.category.findMany({
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      parentId: true,
    },
  });
}

export async function getAdminCategories() {
  return prisma.category.findMany({
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    include: {
      parent: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          products: true,
          children: true,
        },
      },
    },
  });
}

export async function getAdminCategoryById(categoryId: string) {
  return prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    include: {
      _count: {
        select: {
          products: true,
          children: true,
        },
      },
    },
  });
}
