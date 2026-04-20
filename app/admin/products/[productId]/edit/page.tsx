import { notFound } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminProductForm } from "@/features/admin/components/admin-product-form";
import {
  getAdminCategoryOptions,
  getAdminProductById,
} from "@/features/admin/server/admin-queries";

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const [product, categories] = await Promise.all([
    getAdminProductById(productId),
    getAdminCategoryOptions(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:py-12">
      <div>
        <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">
          Admin
        </p>
        <h1 className="mt-4 font-heading text-5xl tracking-tight text-foreground">
          Edit product
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Update the primary storefront record, default variant details, and featured state.
        </p>
      </div>
      <Card className="border-border/70 bg-card/92">
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>
            Editing SKU {product.sku} in {product.categoryId}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminProductForm
            mode="edit"
            productId={product.id}
            categories={categories.map((category) => ({
              id: category.id,
              name: category.name,
            }))}
            defaultValues={{
              name: product.name,
              slug: product.slug,
              sku: product.sku,
              categoryId: product.categoryId,
              shortDescription: product.shortDescription ?? "",
              description: product.description,
              material: product.material ?? "",
              color: product.color ?? "",
              size: product.size ?? "",
              priceCents: product.priceCents,
              compareAtPriceCents: product.compareAtPriceCents,
              stockQuantity: product.stockQuantity,
              status: product.status,
              isFeatured: product.isFeatured,
              imageUrl: product.images[0]?.url ?? "",
              imageAltText: product.images[0]?.altText ?? "",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
