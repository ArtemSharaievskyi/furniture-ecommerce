import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { normalizeCategoryPayload } from "@/features/admin/lib/admin-utils";
import { prisma } from "@/lib/db";
import { adminCategorySchema } from "@/lib/validations/admin";

async function requireAdminRoute() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return null;
  }

  return session.user;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ categoryId: string }> },
) {
  const admin = await requireAdminRoute();

  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { categoryId } = await params;
  const body = await request.json().catch(() => null);
  const parsed = adminCategorySchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(fieldErrors).flat()[0] ?? "Invalid category details.";

    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const values = normalizeCategoryPayload(parsed.data);

  if (values.parentId === categoryId) {
    return NextResponse.json(
      { error: "A category cannot be its own parent." },
      { status: 400 },
    );
  }

  try {
    await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: values,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update category.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ categoryId: string }> },
) {
  const admin = await requireAdminRoute();

  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { categoryId } = await params;

  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    if (!category) {
      throw new Error("Category not found.");
    }

    if (category._count.products > 0) {
      throw new Error("Remove or reassign products before deleting this category.");
    }

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to delete category.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
