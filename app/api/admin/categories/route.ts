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

export async function POST(request: Request) {
  const admin = await requireAdminRoute();

  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = adminCategorySchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const firstError = Object.values(fieldErrors).flat()[0] ?? "Invalid category details.";

    return NextResponse.json({ error: firstError }, { status: 400 });
  }

  const values = normalizeCategoryPayload(parsed.data);

  try {
    const category = await prisma.category.create({
      data: values,
      select: {
        id: true,
      },
    });

    return NextResponse.json({ categoryId: category.id }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create category.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
