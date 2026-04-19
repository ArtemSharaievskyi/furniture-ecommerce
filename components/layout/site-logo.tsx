import Link from "next/link";

import { cn } from "@/lib/utils";

export function SiteLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 text-foreground", className)}
    >
      <span className="flex size-10 items-center justify-center rounded-full border border-border bg-card font-heading text-lg">
        N
      </span>
      <span className="flex flex-col">
        <span className="font-heading text-2xl leading-none tracking-tight">
          North Atelier
        </span>
        <span className="text-[0.7rem] uppercase tracking-[0.26em] text-muted-foreground">
          Furniture Commerce
        </span>
      </span>
    </Link>
  );
}
