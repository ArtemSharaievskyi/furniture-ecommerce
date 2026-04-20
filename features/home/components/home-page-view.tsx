"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  MoveRightIcon,
  SparklesIcon,
} from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { formatCartCurrency } from "@/features/cart/lib/cart-utils";
import {
  benefits,
  categoryCopy,
  homeHeroContent,
  newsletterContent,
  promotionalBanners,
} from "@/features/home/lib/home-content";

type HomePageViewProps = {
  featuredCategories: Array<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string;
    productCount: number;
  }>;
  featuredProducts: Array<{
    id: string;
    slug: string;
    name: string;
    category: string;
    categorySlug: string;
    shortDescription: string | null;
    material: string | null;
    color: string | null;
    size: string | null;
    priceCents: number;
    currencyCode: string;
    imageUrl: string;
  }>;
};

export function HomePageView({
  featuredCategories,
  featuredProducts,
}: HomePageViewProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState<string | null>(null);

  return (
    <div className="overflow-hidden pb-24">
      <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${homeHeroContent.imageUrl}")` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(17,17,17,0.76)_0%,_rgba(17,17,17,0.36)_44%,_rgba(17,17,17,0.16)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(235,225,214,0.22),_transparent_36%)]" />

        <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-7xl flex-col justify-between px-6 py-10 md:py-14 lg:py-18">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl pt-4 md:pt-10"
          >
            <Badge variant="secondary" className="bg-white/14 text-white backdrop-blur">
              {homeHeroContent.eyebrow}
            </Badge>
            <h1 className="mt-5 max-w-xl font-heading text-6xl leading-[0.92] tracking-tight text-white md:text-7xl lg:text-[5.8rem]">
              {homeHeroContent.title}
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/78 md:text-base">
              {homeHeroContent.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button nativeButton={false} render={<Link href="/catalog" />}>
                Shop collection
                <ArrowRightIcon data-icon="inline-end" />
              </Button>
              <Button
                nativeButton={false}
                variant="outline"
                className="border-white/20 bg-white/8 text-white hover:bg-white/14"
                render={<Link href="/account/orders" />}
              >
                View recent orders
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.12 }}
            className="mt-10 grid gap-4 border-t border-white/12 pt-6 md:grid-cols-3"
          >
            {homeHeroContent.moments.map((moment) => (
              <div key={moment} className="max-w-xs">
                <p className="text-xs uppercase tracking-[0.22em] text-white/46">
                  Curated
                </p>
                <p className="mt-2 text-sm leading-6 text-white/82">{moment}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-18 px-6 pt-12 md:pt-16 lg:gap-24 lg:pt-20">
        <section className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <FadeIn>
            <SectionHeading
              eyebrow="Featured categories"
              title="Designed around the rooms people actually live in."
              description="A tighter edit of living, dining, and bedroom essentials with quieter silhouettes and warmer finishes."
            />
          </FadeIn>
          <div className="grid gap-4 md:grid-cols-3">
            {featuredCategories.map((category, index) => {
              const copy = categoryCopy[category.slug] ?? {
                eyebrow: "Collection",
                description:
                  category.description ??
                  "A considered edit of premium furniture for modern interiors.",
              };

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    href={`/catalog?category=${encodeURIComponent(category.name)}`}
                    className="group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-[2rem]"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
                      style={{ backgroundImage: `url("${category.imageUrl}")` }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(18,18,18,0.04),_rgba(18,18,18,0.62))]" />
                    <div className="relative flex flex-col gap-3 p-5 text-white">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/56">
                        {copy.eyebrow}
                      </p>
                      <h3 className="font-heading text-4xl tracking-tight">{category.name}</h3>
                      <p className="max-w-xs text-sm leading-6 text-white/78">
                        {copy.description}
                      </p>
                      <div className="flex items-center justify-between pt-2 text-sm text-white/82">
                        <span>{category.productCount} pieces</span>
                        <MoveRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <FadeIn className="flex flex-col justify-between gap-8">
            <div>
              <SectionHeading
                eyebrow="Featured products"
                title="Furniture chosen for tone, tactility, and everyday longevity."
                description="A small edit of pieces that establish the room quickly, then keep getting better as they are lived with."
              />
            </div>
            <div className="rounded-[2rem] bg-secondary/62 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Design note
              </p>
              <p className="mt-3 max-w-md font-heading text-4xl tracking-tight text-foreground">
                Premium doesn&apos;t need to feel loud to feel finished.
              </p>
              <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
                The collection leans on scale, texture, and clear lines rather than decorative excess, keeping rooms open and objects useful.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-5 sm:grid-cols-2">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.06 }}
                whileHover={{ y: -4 }}
              >
                <Link href={`/product/${product.slug}`} className="group flex flex-col gap-4">
                  <div className="overflow-hidden rounded-[2rem] bg-card">
                    <div
                      className="aspect-[4/4.5] bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.035]"
                      style={{ backgroundImage: `url("${product.imageUrl}")` }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {product.category}
                      </p>
                      <span className="text-sm font-medium text-foreground">
                        {formatCartCurrency(product.priceCents, product.currencyCode)}
                      </span>
                    </div>
                    <h3 className="font-heading text-3xl tracking-tight text-foreground">
                      {product.name}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {product.shortDescription ||
                        [product.material, product.color, product.size]
                          .filter(Boolean)
                          .join(" • ")}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          {promotionalBanners.map((banner, index) => (
            <motion.div
              key={banner.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
            >
              <Link
                href={banner.href}
                className="group relative flex min-h-[26rem] overflow-hidden rounded-[2.2rem]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url("${banner.imageUrl}")` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(16,16,16,0.1),_rgba(16,16,16,0.58))]" />
                <div className="relative mt-auto flex max-w-md flex-col gap-4 p-6 text-white md:p-8">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/56">
                    {banner.eyebrow}
                  </p>
                  <h3 className="font-heading text-4xl tracking-tight">{banner.title}</h3>
                  <p className="text-sm leading-7 text-white/78">{banner.description}</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-white">
                    {banner.cta}
                    <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </section>

        <section className="border-t border-border/70 pt-8 md:pt-10">
          <SectionHeading
            eyebrow="Why North Atelier"
            title="A more considered way to shop for furniture."
            description="Useful enough to feel IKEA-practical, edited enough to feel premium, and calm enough to live with for a long time."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((benefit, index) => (
              <FadeIn key={benefit.title} delay={index * 0.07}>
                <div className="flex flex-col gap-4 border-t border-border/70 pt-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-foreground">
                    <SparklesIcon className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground">{benefit.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2.4rem] border border-border/70 bg-[linear-gradient(145deg,_rgba(242,236,227,0.95),_rgba(250,247,242,0.98))] px-6 py-10 md:px-10 md:py-14">
          <div className="absolute inset-y-0 right-0 hidden w-[38%] bg-[radial-gradient(circle_at_center,_rgba(191,170,140,0.18),_transparent_62%)] lg:block" />
          <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <FadeIn>
              <SectionHeading
                eyebrow={newsletterContent.eyebrow}
                title={newsletterContent.title}
                description={newsletterContent.description}
              />
            </FadeIn>
            <FadeIn delay={0.08}>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!newsletterEmail.trim()) {
                    setNewsletterMessage("Enter an email address to subscribe.");
                    return;
                  }

                  setNewsletterMessage("You’re on the list for future editorial notes.");
                  setNewsletterEmail("");
                }}
                className="flex flex-col gap-4"
              >
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="newsletter-email">Email address</FieldLabel>
                    <FieldContent>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Input
                          id="newsletter-email"
                          type="email"
                          value={newsletterEmail}
                          onChange={(event) => setNewsletterEmail(event.target.value)}
                          placeholder="name@studio.com"
                          className="h-12 bg-background/80"
                        />
                        <Button type="submit" className="h-12 px-5">
                          Subscribe
                        </Button>
                      </div>
                      <FieldError
                        errors={newsletterMessage ? [{ message: newsletterMessage }] : []}
                        className={newsletterMessage?.includes("list") ? "text-foreground" : undefined}
                      />
                    </FieldContent>
                  </Field>
                </FieldGroup>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Monthly frequency. No filler campaigns.
                </p>
              </form>
            </FadeIn>
          </div>
        </section>
      </div>
    </div>
  );
}
