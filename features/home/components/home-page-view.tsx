import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { homeEditorial, homeHighlights, projectPillars } from "@/lib/site";

export function HomePageView() {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow="Furniture Storefront Starter"
        title="A polished full-stack showroom scaffold for premium interiors."
        description="This starter is organized for content, commerce, auth, and admin workflows from day one, while keeping implementation intentionally placeholder-only."
        actions={
          <>
            <Button nativeButton={false} render={<Link href="/catalog" />}>
              Browse catalog
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              render={<Link href="/admin" />}
            >
              Open admin shell
            </Button>
          </>
        }
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pt-12">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <FadeIn>
            <div className="rounded-[2rem] border border-border/70 bg-[linear-gradient(135deg,_rgba(117,94,72,0.92),_rgba(28,35,38,0.96))] p-8 text-white shadow-2xl shadow-stone-900/10 md:p-10">
              <Badge variant="secondary">Modern architecture</Badge>
              <h2 className="mt-6 max-w-xl font-heading text-5xl tracking-tight">
                Route groups, local content, and server-first rendering are all
                in place.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/78 md:text-base">
                The home page demonstrates the visual direction, motion layer,
                and compositional rhythm without committing to any business
                logic yet.
              </p>
            </div>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2">
            {homeHighlights.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.08}>
                <Card className="h-full border-border/70 bg-card/90">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {item.supportingCopy}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionHeading
            eyebrow="Core pillars"
            title="A structure made to grow with catalog, cart, account, and admin surfaces."
            description="Shared shells stay centralized while domain-specific placeholder modules live in their own feature folders."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {projectPillars.map((pillar, index) => (
              <FadeIn key={pillar.title} delay={index * 0.08}>
                <Card className="h-full border-border/70 bg-background">
                  <CardHeader>
                    <CardTitle>{pillar.title}</CardTitle>
                    <CardDescription>{pillar.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="border-border/70 bg-card/80">
            <CardHeader>
              <CardTitle>Mock CMS editorial slots</CardTitle>
              <CardDescription>
                Local JSON content is already organized for future promotion
                blocks, category navigation, and merchandising.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {homeEditorial.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border/70 bg-background/80 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    {item.kicker}
                  </p>
                  <h3 className="mt-3 font-heading text-2xl text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-border/70 bg-secondary/45">
            <CardHeader>
              <CardTitle>Next implementation steps</CardTitle>
              <CardDescription>
                The scaffold is designed so business logic can be layered in with
                minimal rewrites.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {[
                "Connect Prisma migrations to the local SQLite database.",
                "Replace mock loaders with DAL-backed repository functions.",
                "Add server actions for auth, cart, and checkout mutations.",
                "Wire Meilisearch indexing for catalog synchronization.",
              ].map((step) => (
                <div
                  key={step}
                  className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground"
                >
                  {step}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
