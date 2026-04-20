import type { ReactNode } from "react";
import Link from "next/link";

import { LogoutButton } from "@/components/auth/logout-button";
import { SiteLogo } from "@/components/layout/site-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { AdminNav } from "./admin-nav";

export function AdminShell({
  children,
  counts,
}: {
  children: ReactNode;
  counts: {
    orders: number;
    products: number;
    categories: number;
  };
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[300px_1fr]">
      <aside className="border-r border-border/70 bg-card/70 px-5 py-6">
        <div className="flex items-center justify-between gap-3">
          <SiteLogo />
          <Badge variant="outline">Admin</Badge>
        </div>
        <Separator className="my-6" />
        <Card className="border-border/70 bg-background/90">
          <CardHeader>
            <CardTitle>Control room</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl border border-border/70 bg-card px-2 py-3">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Orders
              </p>
              <p className="mt-2 font-heading text-3xl tracking-tight">{counts.orders}</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-card px-2 py-3">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Products
              </p>
              <p className="mt-2 font-heading text-3xl tracking-tight">{counts.products}</p>
            </div>
            <div className="rounded-xl border border-border/70 bg-card px-2 py-3">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Categories
              </p>
              <p className="mt-2 font-heading text-3xl tracking-tight">{counts.categories}</p>
            </div>
          </CardContent>
        </Card>
        <Separator className="my-6" />
        <AdminNav />
        <Separator className="my-6" />
        <div className="flex flex-col gap-3">
          <Button nativeButton={false} variant="outline" render={<Link href="/" />}>
            Back to storefront
          </Button>
          <LogoutButton className="w-full justify-center" />
        </div>
      </aside>
      <main className="bg-[linear-gradient(180deg,_rgba(250,247,242,0.95),_rgba(244,238,231,0.72))]">
        {children}
      </main>
    </div>
  );
}
