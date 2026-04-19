import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(181,157,126,0.24),_transparent_38%),linear-gradient(180deg,_rgba(247,243,238,0.9),_rgba(247,243,238,0.55))]" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-16 md:py-20">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          {eyebrow}
        </p>
        <div className="max-w-3xl">
          <h1 className="font-heading text-5xl leading-none tracking-tight text-foreground md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  );
}
