import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHero } from "@/components/shared/page-hero";
import { prisma } from "@/lib/db";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string | string[] | undefined }>;
}) {
  const { order } = await searchParams;
  const orderNumber = Array.isArray(order) ? order[0] : order;

  if (!orderNumber) {
    notFound();
  }

  const placedOrder = await prisma.order.findUnique({
    where: {
      orderNumber,
    },
    include: {
      items: true,
    },
  });

  if (!placedOrder) {
    notFound();
  }

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Success"
        title="Your local order has been confirmed."
        description="The payment step was simulated successfully on this machine, your order was written to the database, and the cart was cleared."
        actions={
          <>
            <Button nativeButton={false} render={<Link href="/catalog" />}>
              Continue shopping
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              render={<Link href="/account" />}
            >
              View account
            </Button>
          </>
        }
      />

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="border-border/70 bg-card/92">
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
            <CardDescription>
              Order {placedOrder.orderNumber}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Status</span>
              <span className="font-medium text-foreground">{placedOrder.status}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Placed</span>
              <span className="font-medium text-foreground">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(placedOrder.placedAt ?? placedOrder.createdAt)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Mock payment</span>
              <span className="font-medium text-foreground">Succeeded locally</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Total</span>
              <span className="font-medium text-foreground">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: placedOrder.currencyCode,
                  maximumFractionDigits: 0,
                }).format(placedOrder.totalCents / 100)}
              </span>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background px-4 py-4 leading-7">
              <p className="font-medium text-foreground">
                {placedOrder.firstName} {placedOrder.lastName}
              </p>
              <p>{placedOrder.phone || "No phone provided"}</p>
              <p className="mt-2 whitespace-pre-line">{placedOrder.shippingAddress1}</p>
              {placedOrder.shippingAddress2 ? <p className="mt-2">{placedOrder.shippingAddress2}</p> : null}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-secondary/40">
          <CardHeader>
            <CardTitle>Items</CardTitle>
            <CardDescription>
              {placedOrder.items.length} line{placedOrder.items.length === 1 ? "" : "s"} stored in the order record.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {placedOrder.items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 rounded-2xl border border-border/70 bg-background px-4 py-4"
              >
                <div>
                  <p className="font-medium text-foreground">{item.productName}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.variantName || "Default variant"} x {item.quantity}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.material || "Material pending"} / {item.color || "Color pending"} / {item.size || "Size pending"}
                  </p>
                </div>
                <p className="text-sm font-medium text-foreground">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: placedOrder.currencyCode,
                    maximumFractionDigits: 0,
                  }).format(item.lineTotalCents / 100)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
