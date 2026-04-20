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

export function OrderHistoryView({
  orders,
}: {
  orders: Array<{
    id: string;
    orderNumber: string;
    status: string;
    totalCents: number;
    currencyCode: string;
    placedAt: string;
    linePreview: string;
    itemCount: number;
  }>;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="border-border/70 bg-card/92">
        <CardHeader>
          <CardTitle className="font-heading text-5xl tracking-tight">
            Order history
          </CardTitle>
          <CardDescription className="max-w-2xl text-sm leading-7">
            Browse every order tied to your authenticated account and open any
            order to review line items, shipping details, and totals.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="border-border/70 bg-secondary/38">
        <CardHeader>
          <CardTitle>All orders</CardTitle>
          <CardDescription>
            {orders.length} order{orders.length === 1 ? "" : "s"} loaded from the database.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {orders.length ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="grid gap-4 rounded-2xl border border-border/70 bg-background px-4 py-4 md:grid-cols-[1fr_auto]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-medium text-foreground">{order.orderNumber}</p>
                    <Badge variant="outline">{order.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {order.linePreview}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {order.itemCount} item{order.itemCount === 1 ? "" : "s"} •{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                    }).format(new Date(order.placedAt))}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-3 md:items-end">
                  <p className="text-lg font-semibold text-foreground">
                    {formatCartCurrency(order.totalCents, order.currencyCode)}
                  </p>
                  <Button
                    nativeButton={false}
                    variant="outline"
                    render={<Link href={`/account/orders/${order.id}`} />}
                  >
                    View details
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-border/80 bg-background px-6 py-10 text-sm leading-7 text-muted-foreground">
              No orders are associated with this account yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
