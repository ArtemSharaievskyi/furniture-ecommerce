import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCartCurrency } from "@/features/cart/lib/cart-utils";

export function AdminDashboardView({
  email,
  counts,
  revenueCents,
  recentOrders,
  lowStockProducts,
}: {
  email: string;
  counts: {
    orders: number;
    products: number;
    categories: number;
  };
  revenueCents: number;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    status: string;
    totalCents: number;
    currencyCode: string;
    customerEmail: string;
  }>;
  lowStockProducts: Array<{
    id: string;
    name: string;
    stockQuantity: number;
    status: string;
  }>;
}) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:py-12">
      <div>
        <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">
          Admin
        </p>
        <h1 className="mt-4 font-heading text-5xl tracking-tight text-foreground">
          Operations dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Protected admin workspace for catalog, category, and order management.
          Current operator: {email}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Revenue" value={formatCartCurrency(revenueCents)} />
        <MetricCard label="Orders" value={String(counts.orders)} />
        <MetricCard label="Products" value={String(counts.products)} />
        <MetricCard label="Categories" value={String(counts.categories)} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-border/70 bg-card/92">
          <CardHeader>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Recent orders</CardTitle>
                <CardDescription>
                  Latest orders across the store.
                </CardDescription>
              </div>
              <Button
                nativeButton={false}
                variant="outline"
                render={<Link href="/admin/orders" />}
              >
                View all orders
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background px-4 py-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-medium text-foreground">{order.orderNumber}</p>
                    <Badge variant="outline">{order.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {order.customerEmail}
                  </p>
                </div>
                <p className="font-medium text-foreground">
                  {formatCartCurrency(order.totalCents, order.currencyCode)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-secondary/38">
          <CardHeader>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Low stock products</CardTitle>
                <CardDescription>
                  Quick glance at products that need attention.
                </CardDescription>
              </div>
              <Button
                nativeButton={false}
                variant="outline"
                render={<Link href="/admin/products" />}
              >
                Manage products
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {lowStockProducts.length ? (
              lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-background px-4 py-4"
                >
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{product.status}</p>
                  </div>
                  <Badge variant={product.stockQuantity <= 2 ? "destructive" : "outline"}>
                    {product.stockQuantity} left
                  </Badge>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-border/80 bg-background px-6 py-10 text-sm text-muted-foreground">
                No products are currently under the low-stock threshold.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="border-border/70 bg-card/92">
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="font-heading text-5xl tracking-tight">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}
