import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { normalizeProductPayload } from "@/features/admin/lib/admin-utils";
import { prisma } from "@/lib/db";
import { adminProductSchema } from "@/lib/validations/admin";

async function requireAdminRoute() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return null;
  }

  return session.user;
}

export async function POST(request: Request) {
  const admin = await requireAdminRoute();

  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = adminProductSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(fieldErrors).flat()[0] ?? "Invalid product details.";

    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const values = normalizeProductPayload(parsed.data);

  try {
    const product = await prisma.product.create({
      data: {
        name: values.name,
        slug: values.slug,
        sku: values.sku,
        shortDescription: values.shortDescription,
        description: values.description,
        material: values.material,
        color: values.color,
        size: values.size,
        priceCents: values.priceCents,
        compareAtPriceCents: values.compareAtPriceCents,
        stockQuantity: values.stockQuantity,
        status: values.status,
        isFeatured: values.isFeatured,
        categoryId: values.categoryId,
        images: values.imageUrl
          ? {
              create: {
                url: values.imageUrl,
                altText: values.imageAltText || values.name,
                sortOrder: 1,
                isPrimary: true,
              },
            }
          : undefined,
        variants: {
          create: {
            name: "Default",
            sku: values.sku,
            material: values.material,
            color: values.color,
            size: values.size,
            priceCents: values.priceCents,
            compareAtPriceCents: values.compareAtPriceCents,
            stockQuantity: values.stockQuantity,
            isDefault: true,
          },
        },
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json({ productId: product.id }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create product.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
