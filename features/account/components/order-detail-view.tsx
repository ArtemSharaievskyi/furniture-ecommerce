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

export function OrderDetailView({
  order,
}: {
  order: {
    id: string;
    orderNumber: string;
    status: string;
    currencyCode: string;
    subtotalCents: number;
    shippingCents: number;
    taxCents: number;
    discountCents: number;
    totalCents: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    shippingAddress1: string;
    shippingAddress2: string | null;
    shippingCity: string;
    shippingState: string | null;
    shippingPostalCode: string;
    shippingCountry: string;
    placedAt: string;
    items: Array<{
      id: string;
      productName: string;
      variantName: string | null;
      sku: string;
      material: string | null;
      color: string | null;
      size: string | null;
      quantity: number;
      unitPriceCents: number;
      lineTotalCents: number;
    }>;
  };
}) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="border-border/70 bg-card/92">
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle className="font-heading text-5xl tracking-tight">
                {order.orderNumber}
              </CardTitle>
              <CardDescription className="mt-3 text-sm leading-7">
                Placed{" "}
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(order.placedAt))}
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline">{order.status}</Badge>
              <Button
                nativeButton={false}
                variant="outline"
                render={<Link href="/account/orders" />}
              >
                Back to orders
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border/70 bg-secondary/38">
          <CardHeader>
            <CardTitle>Line items</CardTitle>
            <CardDescription>
              {order.items.length} item{order.items.length === 1 ? "" : "s"} recorded on this order.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="grid gap-3 rounded-2xl border border-border/70 bg-background px-4 py-4 md:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="font-medium text-foreground">{item.productName}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.variantName || "Default variant"} • SKU {item.sku}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.material || "Material pending"} / {item.color || "Color pending"} / {item.size || "Size pending"}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Quantity {item.quantity} • {formatCartCurrency(item.unitPriceCents, order.currencyCode)} each
                  </p>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {formatCartCurrency(item.lineTotalCents, order.currencyCode)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="border-border/70 bg-card/90">
            <CardHeader>
              <CardTitle>Delivery details</CardTitle>
              <CardDescription>
                Stored from checkout for this authenticated order.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">
                {order.firstName} {order.lastName}
              </p>
              <p>{order.email}</p>
              <p>{order.phone || "No phone provided"}</p>
              <p className="whitespace-pre-line">{order.shippingAddress1}</p>
              {order.shippingAddress2 ? <p>{order.shippingAddress2}</p> : null}
              <p>
                {order.shippingCity}
                {order.shippingState ? `, ${order.shippingState}` : ""} {order.shippingPostalCode}
              </p>
              <p>{order.shippingCountry}</p>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/90">
            <CardHeader>
              <CardTitle>Totals</CardTitle>
              <CardDescription>Monetary summary from the order record.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
              <TotalRow
                label="Subtotal"
                value={formatCartCurrency(order.subtotalCents, order.currencyCode)}
              />
              <TotalRow
                label="Shipping"
                value={formatCartCurrency(order.shippingCents, order.currencyCode)}
              />
              <TotalRow
                label="Tax"
                value={formatCartCurrency(order.taxCents, order.currencyCode)}
              />
              <TotalRow
                label="Discount"
                value={formatCartCurrency(order.discountCents, order.currencyCode)}
              />
              <div className="mt-1 flex items-center justify-between border-t border-border/70 pt-3 text-base">
                <span className="font-medium text-foreground">Total</span>
                <span className="font-semibold text-foreground">
                  {formatCartCurrency(order.totalCents, order.currencyCode)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TotalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
