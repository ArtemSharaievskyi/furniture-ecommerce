import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { FadeIn } from "@/components/motion/fade-in";
import { PageHero } from "@/components/shared/page-hero";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CatalogItem, ProductDetail } from "@/features/catalog/types";
import { cn } from "@/lib/utils";

import { CatalogProductCard } from "./catalog-product-card";
import { ProductGallery } from "./product-gallery";
import { ProductPurchasePanel } from "./product-purchase-panel";

export function ProductPageView({
  product,
  relatedProducts,
}: {
  product: ProductDetail;
  relatedProducts: CatalogItem[];
}) {
  return (
    <div className="pb-20">
      <PageHero
        eyebrow={product.category}
        title={product.name}
        description={product.shortDescription || product.description}
        actions={
          <Link
            href="/catalog"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <ArrowLeftIcon data-icon="inline-start" />
            Back to catalog
          </Link>
        }
        className="pb-6"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6">
        <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
          <FadeIn>
            <ProductGallery
              name={product.name}
              images={product.images}
              category={product.category}
            />
          </FadeIn>
          <FadeIn delay={0.08}>
            <ProductPurchasePanel product={product} />
          </FadeIn>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <FadeIn>
            <Card className="h-full border-border/70 bg-card/88">
              <CardHeader>
                <CardTitle className="font-heading text-3xl tracking-tight">
                  Description
                </CardTitle>
                <CardDescription>
                  Crafted for premium interiors with honest materials and quiet
                  detail.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base leading-8 text-muted-foreground">
                  {product.description}
                </p>
                <Separator />
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{product.material}</Badge>
                  <Badge variant="secondary">{product.color}</Badge>
                  <Badge variant="secondary">{product.size}</Badge>
                  {product.isFeatured ? <Badge>Featured</Badge> : null}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.08}>
            <Card className="h-full border-border/70 bg-card/88">
              <CardHeader>
                <CardTitle className="font-heading text-3xl tracking-tight">
                  Specifications
                </CardTitle>
                <CardDescription>
                  Clear product information for materials, scale, and inventory.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                {product.specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-[1.4rem] border border-border/70 bg-background px-4 py-4"
                  >
                    <p className="text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {spec.label}
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </FadeIn>
        </section>

        <section className="flex flex-col gap-6 pt-4">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
              Related Products
            </p>
            <h2 className="mt-3 font-heading text-4xl tracking-tight text-foreground">
              More from the same collection mood.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Similar materials, silhouettes, and category adjacency from the
              current catalog.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((related, index) => (
              <CatalogProductCard
                key={related.id}
                product={related}
                delay={index * 0.05}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
