import "server-only";

import { prisma } from "@/lib/db";

export async function getAccountShellData(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      phone: true,
      _count: {
        select: {
          orders: true,
          cartItems: true,
        },
      },
    },
  });
}

export async function getAccountOverviewData(userId: string) {
  const [user, recentOrders] = await Promise.all([
    getAccountShellData(userId),
    prisma.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
      select: {
        id: true,
        orderNumber: true,
        status: true,
        totalCents: true,
        currencyCode: true,
        createdAt: true,
        placedAt: true,
        items: {
          select: {
            id: true,
          },
        },
      },
    }),
  ]);

  return {
    user,
    recentOrders,
  };
}

export async function getProfileData(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          orders: true,
          cartItems: true,
        },
      },
    },
  });
}

export async function getOrderHistoryData(userId: string) {
  return prisma.order.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      orderNumber: true,
      status: true,
      totalCents: true,
      currencyCode: true,
      createdAt: true,
      placedAt: true,
      items: {
        select: {
          id: true,
          productName: true,
          quantity: true,
        },
      },
    },
  });
}

export async function getOrderDetailsData(userId: string, orderId: string) {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
    },
    include: {
      items: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
}
