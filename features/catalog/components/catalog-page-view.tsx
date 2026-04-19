import Link from "next/link";

import { PageHero } from "@/components/shared/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CatalogProduct } from "@/lib/types";

export function CatalogPageView({
  products,
}: {
  products: CatalogProduct[];
}) {
  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Catalog"
        title="Curated furniture collections, prepared for Meilisearch and faceted browsing."
        description="The current catalog is sourced from local mock CMS files and rendered as server-first cards, ready for future filtering and personalization."
      />
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {products.map((product) => (
            <Card key={product.slug} className="border-border/70 bg-card/90">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="secondary">{product.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {product.finish}
                  </span>
                </div>
                <CardTitle className="font-heading text-3xl">
                  {product.name}
                </CardTitle>
                <CardDescription>{product.tagline}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="aspect-[4/3] rounded-[1.5rem] bg-[linear-gradient(135deg,_rgba(240,233,223,0.95),_rgba(201,186,167,0.65))]" />
                <p className="text-sm leading-6 text-muted-foreground">
                  {product.description}
                </p>
              </CardContent>
              <CardFooter className="justify-between">
                <span className="text-sm font-medium text-foreground">
                  {product.price}
                </span>
                <Button variant="outline" render={<Link href={`/product/${product.slug}`} />}>
                  View product
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
