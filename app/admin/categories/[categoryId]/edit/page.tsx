import { notFound } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminCategoryForm } from "@/features/admin/components/admin-category-form";
import {
  getAdminCategories,
  getAdminCategoryById,
} from "@/features/admin/server/admin-queries";

export default async function AdminEditCategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const [category, categories] = await Promise.all([
    getAdminCategoryById(categoryId),
    getAdminCategories(),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:py-12">
      <div>
        <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">
          Admin
        </p>
        <h1 className="mt-4 font-heading text-5xl tracking-tight text-foreground">
          Edit category
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Update hierarchy, display order, and storefront visibility.
        </p>
      </div>
      <Card className="border-border/70 bg-card/92">
        <CardHeader>
          <CardTitle>{category.name}</CardTitle>
          <CardDescription>
            {category._count.products} product{category._count.products === 1 ? "" : "s"} currently assigned.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminCategoryForm
            mode="edit"
            categoryId={category.id}
            categories={categories
              .filter((item) => item.id !== category.id)
              .map((item) => ({
                id: item.id,
                name: item.name,
              }))}
            defaultValues={{
              name: category.name,
              slug: category.slug,
              description: category.description ?? "",
              displayOrder: category.displayOrder,
              isActive: category.isActive,
              parentId: category.parentId ?? "",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
