import type { ReactNode } from "react";

import { LogoutButton } from "@/components/auth/logout-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { AccountNav } from "./account-nav";

export function AccountShell({
  user,
  children,
}: {
  user: {
    name: string;
    email: string;
    role: "CUSTOMER" | "ADMIN";
    orderCount: number;
    cartItemCount: number;
  };
  children: ReactNode;
}) {
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[280px_1fr] lg:py-14">
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <Card className="border-border/70 bg-card/92">
          <CardHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                  Account
                </p>
                <CardTitle className="mt-3 font-heading text-4xl tracking-tight">
                  {user.name}
                </CardTitle>
              </div>
              <Badge variant="outline">{user.role}</Badge>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{user.email}</p>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border/70 bg-background p-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Orders
                </p>
                <p className="mt-2 font-heading text-3xl tracking-tight">
                  {user.orderCount}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Cart
                </p>
                <p className="mt-2 font-heading text-3xl tracking-tight">
                  {user.cartItemCount}
                </p>
              </div>
            </div>
            <Separator />
            <AccountNav />
            <Separator />
            <LogoutButton className="w-full justify-center" />
          </CardContent>
        </Card>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
