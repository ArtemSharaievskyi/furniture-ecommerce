import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CatalogProduct } from "@/lib/types";

export function ProductPageView({ product }: { product: CatalogProduct }) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-16">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="aspect-[5/4] rounded-[2rem] border border-border/70 bg-[linear-gradient(135deg,_rgba(235,230,221,0.92),_rgba(160,136,110,0.52))]" />
        <div className="flex flex-col gap-5">
          <Badge variant="secondary">{product.category}</Badge>
          <div>
            <h1 className="font-heading text-5xl tracking-tight text-foreground">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {product.tagline}
            </p>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            {product.description}
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card size="sm">
              <CardHeader>
                <CardTitle>Price</CardTitle>
              </CardHeader>
              <CardContent>{product.price}</CardContent>
            </Card>
            <Card size="sm">
              <CardHeader>
                <CardTitle>Material</CardTitle>
              </CardHeader>
              <CardContent>{product.material}</CardContent>
            </Card>
            <Card size="sm">
              <CardHeader>
                <CardTitle>Collection</CardTitle>
              </CardHeader>
              <CardContent>{product.collection}</CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Card className="border-border/70 bg-card/80">
        <CardHeader>
          <CardTitle>Product page placeholder</CardTitle>
          <CardDescription>
            Recommended companions, gallery assets, inventory, and add-to-cart
            mutations will be implemented later.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {product.specs.map((spec) => (
            <div
              key={spec.label}
              className="rounded-2xl border border-border/70 bg-background px-4 py-3"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {spec.label}
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                {spec.value}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
