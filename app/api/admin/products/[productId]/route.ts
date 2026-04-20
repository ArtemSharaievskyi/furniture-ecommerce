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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const admin = await requireAdminRoute();

  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { productId } = await params;
  const body = await request.json().catch(() => null);
  const parsed = adminProductSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(fieldErrors).flat()[0] ?? "Invalid product details.";

    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const values = normalizeProductPayload(parsed.data);

  try {
    await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
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

      if (!product) {
        throw new Error("Product not found.");
      }

      await tx.product.update({
        where: {
          id: productId,
        },
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
        },
      });

      const editableVariant = product.variants[0];

      if (editableVariant) {
        await tx.productVariant.update({
          where: {
            id: editableVariant.id,
          },
          data: {
            sku: values.sku,
            material: values.material,
            color: values.color,
            size: values.size,
            priceCents: values.priceCents,
            compareAtPriceCents: values.compareAtPriceCents,
            stockQuantity: values.stockQuantity,
          },
        });
      }

      const primaryImage = product.images[0];

      if (values.imageUrl) {
        if (primaryImage) {
          await tx.productImage.update({
            where: {
              id: primaryImage.id,
            },
            data: {
              url: values.imageUrl,
              altText: values.imageAltText || values.name,
              isPrimary: true,
              sortOrder: 1,
            },
          });
        } else {
          await tx.productImage.create({
            data: {
              productId,
              url: values.imageUrl,
              altText: values.imageAltText || values.name,
              isPrimary: true,
              sortOrder: 1,
            },
          });
        }
      } else if (primaryImage) {
        await tx.productImage.delete({
          where: {
            id: primaryImage.id,
          },
        });
      }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update product.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  const admin = await requireAdminRoute();

  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { productId } = await params;

  try {
    await prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: {
          id: productId,
        },
      });

      if (!product) {
        throw new Error("Product not found.");
      }

      await tx.cartItem.deleteMany({
        where: {
          productId,
        },
      });

      await tx.product.delete({
        where: {
          id: productId,
        },
      });
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to delete product.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
