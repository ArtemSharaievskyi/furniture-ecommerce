import { AdminProductsTable } from "@/features/admin/components/admin-products-table";
import { getAllAdminProducts } from "@/features/admin/server/admin-queries";

export default async function AdminProductsPage() {
  const products = await getAllAdminProducts();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:py-12">
      <div>
        <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">
          Admin
        </p>
        <h1 className="mt-4 font-heading text-5xl tracking-tight text-foreground">
          Products
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Manage catalog entries, pricing, inventory, and storefront visibility.
        </p>
      </div>
      <AdminProductsTable
        products={products.map((product) => ({
          id: product.id,
          name: product.name,
          sku: product.sku,
          status: product.status,
          categoryName: product.category.name,
          priceCents: product.priceCents,
          currencyCode: product.currencyCode,
          stockQuantity: product.stockQuantity,
          updatedAt: product.updatedAt.toISOString(),
          featured: product.isFeatured,
        }))}
      />
    </div>
  );
}
