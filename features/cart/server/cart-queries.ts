import "server-only";

import { prisma } from "@/lib/db";

import type { CartLine, CartSummary } from "@/features/cart/types";

import { buildCartSummary, buildStockLabel, formatCartCurrency } from "../lib/cart-utils";

export async function getUserCartSummary(userId: string): Promise<CartSummary> {
  const items = await prisma.cartItem.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    include: {
      product: {
        include: {
          category: { select: { name: true } },
          images: {
            orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }],
            take: 1,
          },
        },
      },
      variant: true,
    },
  });

  const lines: CartLine[] = items.map((item) => {
    const lineTotalCents = item.unitPriceCents * item.quantity;

    return {
      id: item.id,
      productId: item.productId,
      productSlug: item.product.slug,
      productName: item.product.name,
      category: item.product.category.name,
      imageUrl:
        item.product.images[0]?.url ??
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      variantId: item.variantId,
      variantName: item.variant.name,
      color: item.variant.color ?? item.product.color ?? "",
      size: item.variant.size ?? item.product.size ?? "",
      material: item.variant.material ?? item.product.material ?? "Material pending",
      quantity: item.quantity,
      unitPriceCents: item.unitPriceCents,
      unitPrice: formatCartCurrency(item.unitPriceCents, item.product.currencyCode),
      lineTotalCents,
      lineTotal: formatCartCurrency(lineTotalCents, item.product.currencyCode),
      stockLabel: buildStockLabel(item.variant.stockQuantity),
    };
  });

  return buildCartSummary(lines, "user");
}
