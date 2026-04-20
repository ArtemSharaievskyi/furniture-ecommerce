import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { checkoutRequestSchema } from "@/lib/validations/checkout";

function splitFullName(fullName: string) {
  const normalized = fullName.trim().replace(/\s+/g, " ");
  const [firstName = "Customer", ...rest] = normalized.split(" ");

  return {
    firstName,
    lastName: rest.join(" ") || "Local",
  };
}

function createOrderNumber() {
  return `NA-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 6).toUpperCase()}`;
}

export async function POST(request: Request) {
  const session = await auth();
  const body = await request.json().catch(() => null);
  const parsedBody = checkoutRequestSchema.safeParse(body);

  if (!parsedBody.success) {
    const fieldErrors = parsedBody.error.flatten().fieldErrors;
    const firstError = Object.values(fieldErrors).flat()[0] ?? "Invalid checkout details.";

    return NextResponse.json(
      { error: firstError, fieldErrors },
      { status: 400 },
    );
  }

  const { fullName, phone, address, notes, cart } = parsedBody.data;
  const userId = session?.user?.id ?? null;
  const { firstName, lastName } = splitFullName(fullName);

  try {
    const orderResult = await prisma.$transaction(async (tx) => {
      const accountCartItems = userId
        ? await tx.cartItem.findMany({
            where: {
              userId,
            },
            include: {
              product: true,
              variant: true,
            },
            orderBy: {
              updatedAt: "desc",
            },
          })
        : [];

      const sourceItems = userId
        ? accountCartItems.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            productName: item.product.name,
            variantName: item.variant.name,
            sku: item.variant.sku,
            material: item.variant.material ?? item.product.material,
            color: item.variant.color ?? item.product.color,
            size: item.variant.size ?? item.product.size,
            quantity: item.quantity,
            unitPriceCents: item.unitPriceCents,
            lineTotalCents: item.unitPriceCents * item.quantity,
            currencyCode: item.product.currencyCode,
          }))
        : (cart?.items ?? []).map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            productName: item.productName,
            variantName: item.variantName,
            sku: `LOCAL-${item.variantId.slice(0, 8).toUpperCase()}`,
            material: item.material || null,
            color: item.color || null,
            size: item.size || null,
            quantity: item.quantity,
            unitPriceCents: item.unitPriceCents,
            lineTotalCents: item.lineTotalCents,
            currencyCode: "USD",
          }));

      if (!sourceItems.length) {
        throw new Error("Your cart is empty.");
      }

      const subtotalCents = sourceItems.reduce(
        (sum, item) => sum + item.lineTotalCents,
        0,
      );
      const currencyCode = sourceItems[0]?.currencyCode ?? "USD";
      const orderNumber = createOrderNumber();
      const customerEmail =
        session?.user?.email ??
        `guest-${Date.now()}@local-checkout.test`;

      const order = await tx.order.create({
        data: {
          orderNumber,
          userId,
          status: "PAID",
          currencyCode,
          subtotalCents,
          totalCents: subtotalCents,
          email: customerEmail,
          firstName,
          lastName,
          phone,
          shippingAddress1: address,
          shippingAddress2: notes?.trim() ? `Notes: ${notes.trim()}` : null,
          shippingCity: "Local checkout",
          shippingPostalCode: "00000",
          shippingCountry: "Local",
          placedAt: new Date(),
          items: {
            create: sourceItems.map((item) => ({
              productId: item.productId,
              variantId: item.variantId,
              productName: item.productName,
              variantName: item.variantName,
              sku: item.sku,
              material: item.material,
              color: item.color,
              size: item.size,
              quantity: item.quantity,
              unitPriceCents: item.unitPriceCents,
              lineTotalCents: item.lineTotalCents,
            })),
          },
        },
        select: {
          id: true,
          orderNumber: true,
        },
      });

      if (userId) {
        await tx.cartItem.deleteMany({
          where: {
            userId,
          },
        });

        await tx.user.update({
          where: {
            id: userId,
          },
          data: {
            name: fullName,
            phone,
          },
        });
      }

      return order;
    });

    return NextResponse.json(
      {
        orderId: orderResult.id,
        orderNumber: orderResult.orderNumber,
        paymentStatus: "succeeded",
      },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "We couldn't create the order.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
