import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getUserCartSummary } from "@/features/cart/server/cart-queries";

const addCartItemSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
  quantity: z.number().int().positive().max(99).default(1),
});

async function requireUserId() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  return userId;
}

export async function GET() {
  const userId = await requireUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cart = await getUserCartSummary(userId);

  return NextResponse.json(cart);
}

export async function POST(request: Request) {
  const userId = await requireUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json();
  const parsed = addCartItemSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { productId, variantId, quantity } = parsed.data;

  const variant = await prisma.productVariant.findFirst({
    where: {
      id: variantId,
      productId,
    },
    include: {
      product: true,
    },
  });

  if (!variant) {
    return NextResponse.json({ error: "Variant not found" }, { status: 404 });
  }

  const existing = await prisma.cartItem.findFirst({
    where: {
      userId,
      variantId,
    },
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: {
        quantity: existing.quantity + quantity,
        unitPriceCents: variant.priceCents,
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        userId,
        productId,
        variantId,
        quantity,
        unitPriceCents: variant.priceCents,
      },
    });
  }

  const cart = await getUserCartSummary(userId);

  return NextResponse.json(cart);
}
