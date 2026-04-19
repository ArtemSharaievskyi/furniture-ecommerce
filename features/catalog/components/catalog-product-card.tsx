"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CatalogItem } from "@/features/catalog/types";
import { cn } from "@/lib/utils";

export function CatalogProductCard({
  product,
  delay = 0,
}: {
  product: CatalogItem;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
      whileHover={{ y: -4 }}
    >
      <Card className="h-full border-border/70 bg-card/92 shadow-sm shadow-stone-900/5 transition-shadow hover:shadow-xl hover:shadow-stone-900/10">
        <CardHeader className="gap-4">
          <div className="flex items-center justify-between gap-3">
            <Badge variant="secondary">{product.category}</Badge>
            {product.isFeatured ? <Badge>Featured</Badge> : null}
          </div>
          <div
            className="aspect-[4/3] rounded-[1.75rem] border border-border/60 bg-cover bg-center"
            style={{ backgroundImage: `url("${product.imageUrl}")` }}
          />
          <div>
            <CardTitle className="font-heading text-3xl tracking-tight">
              {product.name}
            </CardTitle>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {product.shortDescription || product.description}
            </p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-muted px-3 py-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {product.material}
            </span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {product.color}
            </span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {product.size}
            </span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Starting at
              </p>
              <p className="mt-1 text-xl font-semibold text-foreground">
                {product.price}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Variants
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {product.variantCount}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {product.stockLabel}
          </p>
          <Link
            href={`/product/${product.slug}`}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            View product
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
