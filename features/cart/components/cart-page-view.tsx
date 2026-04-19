import Link from "next/link";

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
import { mockCartLines } from "@/lib/site";

export function CartPageView() {
  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Cart"
        title="A local-first cart shell ready for persistence and promotions."
        description="The cart screen is scaffolded for future server actions, session-aware basket retrieval, and tax or delivery calculations."
      />
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-border/70 bg-card/90">
          <CardHeader>
            <CardTitle>Current basket lines</CardTitle>
            <CardDescription>
              Mock items demonstrate structure only. No pricing logic is active.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {mockCartLines.map((line) => (
              <div
                key={line.name}
                className="grid gap-4 rounded-[1.5rem] border border-border/70 bg-background p-4 md:grid-cols-[100px_1fr_auto]"
              >
                <div className="aspect-square rounded-2xl bg-muted" />
                <div>
                  <h3 className="font-medium text-foreground">{line.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {line.summary}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {line.quantity} x {line.price}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-border/70 bg-secondary/45">
          <CardHeader>
            <CardTitle>Checkout summary</CardTitle>
            <CardDescription>
              Shipping, coupons, and payment will be connected later.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>Placeholder</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Delivery</span>
              <span>Calculated later</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tax</span>
              <span>Calculated later</span>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline" render={<Link href="/catalog" />}>
              Continue browsing
            </Button>
            <Button render={<Link href="/checkout" />}>Checkout</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
