"use client";

import Link from "next/link";
import { ShoppingBagIcon, UserIcon } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site";

export function MobileNav({ trigger }: { trigger: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger render={trigger as React.ReactElement} />
      <SheetContent side="right" className="w-full max-w-sm">
        <SheetHeader>
          <SheetTitle>Browse the showroom</SheetTitle>
          <SheetDescription>
            The mobile shell is wired and ready for future stateful nav patterns.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-6 px-4 pb-6">
          <nav className="flex flex-col gap-3">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-border hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 border-t pt-6">
            <Link
              href="/account"
              className="flex items-center gap-3 text-sm text-muted-foreground"
            >
              <UserIcon className="size-4" />
              Account
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 text-sm text-muted-foreground"
            >
              <ShoppingBagIcon className="size-4" />
              Cart
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
