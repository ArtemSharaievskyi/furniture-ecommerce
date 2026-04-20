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

export function AccountOverviewView({
  user,
  stats,
  recentOrders,
}: {
  user: {
    name: string;
    email: string;
    role: "CUSTOMER" | "ADMIN";
    createdAt: string;
  };
  stats: Array<{
    label: string;
    value: string;
    description: string;
  }>;
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    status: string;
    totalCents: number;
    currencyCode: string;
    placedAt: string;
    itemCount: number;
  }>;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="border-border/70 bg-card/92">
        <CardHeader>
          <CardTitle className="font-heading text-5xl tracking-tight">
            Welcome back, {user.name}
          </CardTitle>
          <CardDescription className="max-w-2xl text-sm leading-7">
            Your customer area now loads directly from the database for this
            authenticated session, including profile details and order activity.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
          <div>
            <p className="font-medium text-foreground">Email</p>
            <p className="mt-1">{user.email}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Role</p>
            <p className="mt-1">{user.role}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Member since</p>
            <p className="mt-1">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
              }).format(new Date(user.createdAt))}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/70 bg-card/90">
            <CardHeader>
              <CardTitle>{stat.label}</CardTitle>
              <CardDescription>{stat.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-heading text-4xl tracking-tight">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/70 bg-secondary/38">
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Recent orders</CardTitle>
              <CardDescription>
                Your latest orders are ready to open from the account area.
              </CardDescription>
            </div>
            <Button
              nativeButton={false}
              variant="outline"
              render={<Link href="/account/orders" />}
            >
              View all orders
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {recentOrders.length ? (
            recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-background px-4 py-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-medium text-foreground">{order.orderNumber}</p>
                    <Badge variant="outline">{order.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {order.itemCount} item{order.itemCount === 1 ? "" : "s"} •{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                    }).format(new Date(order.placedAt))}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-medium text-foreground">
                    {formatCartCurrency(order.totalCents, order.currencyCode)}
                  </p>
                  <Button
                    nativeButton={false}
                    variant="outline"
                    render={<Link href={`/account/orders/${order.id}`} />}
                  >
                    Details
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-border/80 bg-background px-6 py-10 text-sm leading-7 text-muted-foreground">
              You haven&apos;t placed an order from this account yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
