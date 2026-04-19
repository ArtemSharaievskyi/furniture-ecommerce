import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-card/50">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1.3fr_repeat(2,minmax(0,1fr))]">
        <div className="max-w-sm">
          <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">
            Local-first commerce starter
          </p>
          <h2 className="mt-3 font-heading text-3xl tracking-tight text-foreground">
            Built for a premium furniture experience.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            This scaffold is tuned for local content, local database development,
            and a gradual move into production logic.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-foreground">Shop</p>
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-foreground">Workspace</p>
          {siteConfig.footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
