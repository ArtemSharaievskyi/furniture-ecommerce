import Link from "next/link";
import { ShoppingBagIcon, UserIcon } from "lucide-react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteLogo } from "@/components/layout/site-logo";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-6 py-4">
        <SiteLogo className="shrink-0" />
        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Button
            nativeButton={false}
            variant="ghost"
            size="icon-sm"
            render={<Link href="/account" />}
          >
            <UserIcon />
            <span className="sr-only">Account</span>
          </Button>
          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href="/cart" />}
          >
            <ShoppingBagIcon data-icon="inline-start" />
            Cart
          </Button>
        </div>
        <div className="ml-auto lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
