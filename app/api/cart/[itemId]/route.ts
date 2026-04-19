import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { getUserCartSummary } from "@/features/cart/server/cart-queries";

const updateQuantitySchema = z.object({
  quantity: z.number().int().min(0).max(99),
});

async function requireUserId() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  return userId;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ itemId: string }> },
) {
  const userId = await requireUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { itemId } = await params;
  const json = await request.json();
  const parsed = updateQuantitySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const existing = await prisma.cartItem.findFirst({
    where: {
      id: itemId,
      userId,
    },
  });

  if (!existing) {
    return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
  }

  if (parsed.data.quantity === 0) {
    await prisma.cartItem.delete({
      where: { id: existing.id },
    });
  } else {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: parsed.data.quantity },
    });
  }

  const cart = await getUserCartSummary(userId);

  return NextResponse.json(cart);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ itemId: string }> },
) {
  const userId = await requireUserId();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { itemId } = await params;

  const existing = await prisma.cartItem.findFirst({
    where: {
      id: itemId,
      userId,
    },
  });

  if (!existing) {
    return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
  }

  await prisma.cartItem.delete({
    where: { id: existing.id },
  });

  const cart = await getUserCartSummary(userId);

  return NextResponse.json(cart);
}
