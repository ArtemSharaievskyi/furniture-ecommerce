import type { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboardIcon, PackageIcon, SearchIcon, UsersIcon } from "lucide-react";

import { SiteLogo } from "@/components/layout/site-logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const adminNav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboardIcon },
  { href: "/catalog", label: "Catalog", icon: PackageIcon },
  { href: "/account", label: "Customers", icon: UsersIcon },
  { href: "/catalog", label: "Search", icon: SearchIcon },
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
      <aside className="border-r border-border/70 bg-card/70 px-5 py-6">
        <SiteLogo />
        <Separator className="my-6" />
        <nav className="flex flex-col gap-2">
          {adminNav.map((item) => {
            const Icon = item.icon;

            return (
              <Button
                key={item.label}
                variant="ghost"
                className="justify-start"
                render={<Link href={item.href} />}
              >
                <Icon data-icon="inline-start" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </aside>
      <main className="bg-[linear-gradient(180deg,_rgba(250,247,242,0.95),_rgba(244,238,231,0.72))]">
        {children}
      </main>
    </div>
  );
}
