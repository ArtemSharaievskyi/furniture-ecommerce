import { AdminCategoriesTable } from "@/features/admin/components/admin-categories-table";
import { getAdminCategories } from "@/features/admin/server/admin-queries";

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:py-12">
      <div>
        <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">
          Admin
        </p>
        <h1 className="mt-4 font-heading text-5xl tracking-tight text-foreground">
          Categories
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Manage hierarchy, storefront visibility, and category order for the catalog.
        </p>
      </div>
      <AdminCategoriesTable
        categories={categories.map((category) => ({
          id: category.id,
          name: category.name,
          slug: category.slug,
          parentName: category.parent?.name ?? null,
          productCount: category._count.products,
          childCount: category._count.children,
          displayOrder: category.displayOrder,
          isActive: category.isActive,
        }))}
      />
    </div>
  );
}
