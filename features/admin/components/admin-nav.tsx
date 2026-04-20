"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderTreeIcon,
  LayoutDashboardIcon,
  PackageIcon,
  ReceiptTextIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/admin/orders", label: "Orders", icon: ReceiptTextIcon },
  { href: "/admin/products", label: "Products", icon: PackageIcon },
  { href: "/admin/categories", label: "Categories", icon: FolderTreeIcon },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {adminNavItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/admin"
            ? pathname === item.href
            : pathname.startsWith(item.href);

        return (
          <Button
            key={item.href}
            nativeButton={false}
            variant={isActive ? "secondary" : "ghost"}
            className={cn("justify-start", isActive && "font-semibold")}
            render={<Link href={item.href} />}
          >
            <Icon data-icon="inline-start" />
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
}
