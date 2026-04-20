"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboardIcon, PackageIcon, UserRoundIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const accountNavItems = [
  {
    href: "/account",
    label: "Overview",
    icon: LayoutDashboardIcon,
  },
  {
    href: "/account/profile",
    label: "Profile",
    icon: UserRoundIcon,
  },
  {
    href: "/account/orders",
    label: "Orders",
    icon: PackageIcon,
  },
] as const;

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {accountNavItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/account"
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
