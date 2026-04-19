"use client";

import Link from "next/link";
import { MinusIcon, PlusIcon, ShoppingBagIcon, Trash2Icon } from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/features/cart/hooks/use-cart";

export function CartPageView() {
  const {
    cart,
    isLoading,
    removeItem,
    updateQuantity,
    isUpdatingQuantity,
    isRemovingItem,
  } = useCart();

  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Cart"
        title="Your basket, ready for checkout when you are."
        description="Logged-in customers use the database-backed cart. Guests keep a temporary local cart until they sign in."
      />

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-border/70 bg-card/92">
          <CardHeader>
            <CardTitle>Current basket lines</CardTitle>
            <CardDescription>
              Update quantities, remove items, and review your selections before checkout.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="grid gap-4 rounded-[1.5rem] border border-border/70 bg-background p-4 md:grid-cols-[120px_1fr_auto]"
                >
                  <Skeleton className="aspect-square rounded-2xl" />
                  <div className="flex flex-col gap-3">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-56" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Skeleton className="h-8 w-28" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              ))
            ) : cart?.items.length ? (
              cart.items.map((line) => (
                <div
                  key={line.id}
                  className="grid gap-4 rounded-[1.5rem] border border-border/70 bg-background p-4 md:grid-cols-[120px_1fr_auto]"
                >
                  <div
                    className="aspect-square rounded-2xl border border-border/60 bg-cover bg-center"
                    style={{ backgroundImage: `url("${line.imageUrl}")` }}
                  />
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {line.category}
                      </p>
                      <h3 className="mt-1 font-heading text-3xl tracking-tight text-foreground">
                        {line.productName}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {line.variantName}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {line.material} • {line.color} • {line.size}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center rounded-full border border-border bg-card px-2 py-1">
                        <Button
                          type="button"
                          size="icon-xs"
                          variant="ghost"
                          onClick={() =>
                            updateQuantity({
                              itemId: line.id,
                              quantity: line.quantity - 1,
                            })
                          }
                          disabled={isUpdatingQuantity}
                        >
                          <MinusIcon />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="min-w-8 text-center text-sm font-medium text-foreground">
                          {line.quantity}
                        </span>
                        <Button
                          type="button"
                          size="icon-xs"
                          variant="ghost"
                          onClick={() =>
                            updateQuantity({
                              itemId: line.id,
                              quantity: line.quantity + 1,
                            })
                          }
                          disabled={isUpdatingQuantity}
                        >
                          <PlusIcon />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {line.stockLabel}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{line.unitPrice} each</p>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        {line.lineTotal}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(line.id)}
                      disabled={isRemovingItem}
                    >
                      <Trash2Icon data-icon="inline-start" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-5 rounded-[2rem] border border-dashed border-border bg-background px-6 py-14 text-center">
                <div className="flex size-14 items-center justify-center rounded-full bg-accent/60">
                  <ShoppingBagIcon className="size-6 text-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-4xl tracking-tight text-foreground">
                    Your cart is empty
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                    Add a few pieces from the catalog to start building your room.
                  </p>
                </div>
                <Button render={<Link href="/catalog" />}>Browse catalog</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="h-fit border-border/70 bg-secondary/45">
          <CardHeader>
            <CardTitle>Checkout summary</CardTitle>
            <CardDescription>
              Totals update automatically as your basket changes.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Items</span>
              <span>{cart?.itemCount ?? 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{cart?.subtotal ?? "$0"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Delivery</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Total</span>
              <span className="font-semibold text-foreground">
                {cart?.total ?? "$0"}
              </span>
            </div>
            <p className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-xs leading-6">
              {cart?.mode === "user"
                ? "This cart is persisted to your account."
                : "This temporary cart is stored locally on this device until you sign in."}
            </p>
          </CardContent>
          <CardFooter className="justify-between gap-3">
            <Button variant="outline" render={<Link href="/catalog" />}>
              Continue browsing
            </Button>
            <Button
              render={<Link href="/checkout" />}
              disabled={!cart?.items.length}
            >
              Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
