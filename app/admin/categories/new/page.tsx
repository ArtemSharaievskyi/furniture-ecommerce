import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminCategoryForm } from "@/features/admin/components/admin-category-form";
import { getAdminCategoryOptions } from "@/features/admin/server/admin-queries";

export default async function AdminCreateCategoryPage() {
  const categories = await getAdminCategoryOptions();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:py-12">
      <div>
        <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">
          Admin
        </p>
        <h1 className="mt-4 font-heading text-5xl tracking-tight text-foreground">
          Create category
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Add a new category and optionally position it under an existing parent.
        </p>
      </div>
      <Card className="border-border/70 bg-card/92">
        <CardHeader>
          <CardTitle>Category details</CardTitle>
          <CardDescription>
            Keep category naming and ordering structured for storefront navigation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminCategoryForm
            mode="create"
            categories={categories.map((category) => ({
              id: category.id,
              name: category.name,
            }))}
          />
        </CardContent>
      </Card>
    </div>
  );
}
