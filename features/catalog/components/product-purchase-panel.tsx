"use client";

import { useMemo, useState } from "react";
import { HeartIcon, ShieldCheckIcon, TruckIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/features/cart/hooks/use-cart";
import type { ProductDetail, ProductVariantItem } from "@/features/catalog/types";
import { cn } from "@/lib/utils";

function getVariantLabel(variant: ProductVariantItem) {
  return [variant.color, variant.size].filter(Boolean).join(" / ");
}

export function ProductPurchasePanel({ product }: { product: ProductDetail }) {
  const { addItem, isAddingItem, cart } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.defaultVariant?.id ?? product.variants[0]?.id ?? "",
  );

  const selectedVariant = useMemo(
    () =>
      product.variants.find((variant) => variant.id === selectedVariantId) ??
      product.defaultVariant ??
      product.variants[0],
    [product.defaultVariant, product.variants, selectedVariantId],
  );

  const selectedColor = selectedVariant?.color ?? "";
  const selectedSize = selectedVariant?.size ?? "";

  const availableColors = useMemo(
    () => [...new Set(product.variants.map((variant) => variant.color).filter(Boolean))],
    [product.variants],
  );
  const availableSizes = useMemo(
    () => [...new Set(product.variants.map((variant) => variant.size).filter(Boolean))],
    [product.variants],
  );

  function selectClosestVariant(nextColor: string, nextSize: string) {
    const exact =
      product.variants.find(
        (variant) =>
          (nextColor ? variant.color === nextColor : true) &&
          (nextSize ? variant.size === nextSize : true),
      ) ?? null;

    const sameColor =
      product.variants.find((variant) =>
        nextColor ? variant.color === nextColor : false,
      ) ?? null;

    const sameSize =
      product.variants.find((variant) => (nextSize ? variant.size === nextSize : false)) ??
      null;

    const nextVariant =
      exact ?? sameColor ?? sameSize ?? product.defaultVariant ?? product.variants[0];

    if (nextVariant) {
      setSelectedVariantId(nextVariant.id);
    }
  }

  async function handleAddToCart() {
    if (!selectedVariant) {
      return;
    }

    await addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      quantity: 1,
      snapshot: {
        productSlug: product.slug,
        productName: product.name,
        category: product.category,
        imageUrl: product.images[0]?.url ?? "",
        variantName: selectedVariant.name,
        color: selectedVariant.color,
        size: selectedVariant.size,
        material: selectedVariant.material,
        unitPriceCents: selectedVariant.unitPriceCents ?? 0,
        currencyCode: "USD",
      },
    });
  }

  return (
    <Card className="border-border/70 bg-card/92 shadow-sm shadow-stone-900/5">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge variant="secondary">{product.category}</Badge>
            <div>
              <CardTitle className="font-heading text-5xl tracking-tight">
                {product.name}
              </CardTitle>
              <CardDescription className="mt-3 text-base leading-7">
                {product.shortDescription || product.description}
              </CardDescription>
            </div>
          </div>
          {product.isFeatured ? <Badge>Featured</Badge> : null}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Price
            </p>
            <p className="mt-2 text-3xl font-semibold text-foreground">
              {selectedVariant?.price || product.price}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {selectedVariant?.stockLabel || product.stockLabel}
          </p>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Variant</p>
            <div className="mt-3 grid gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={cn(
                    "rounded-[1.25rem] border px-4 py-3 text-left transition-colors",
                    selectedVariant?.id === variant.id
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background hover:bg-muted",
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">{variant.name}</p>
                      <p
                        className={cn(
                          "mt-1 text-xs",
                          selectedVariant?.id === variant.id
                            ? "text-background/80"
                            : "text-muted-foreground",
                        )}
                      >
                        SKU {variant.sku}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">
                      {variant.price}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-foreground">Color</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => selectClosestVariant(color, selectedSize)}
                    className={cn(
                      "rounded-full border px-3 py-2 text-sm transition-colors",
                      selectedColor === color
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background hover:bg-muted",
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">Size</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => selectClosestVariant(selectedColor, size)}
                    className={cn(
                      "rounded-full border px-3 py-2 text-sm transition-colors",
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background hover:bg-muted",
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <Button
            type="button"
            size="lg"
            onClick={handleAddToCart}
            disabled={!selectedVariant || selectedVariant.stockQuantity <= 0}
          >
            {isAddingItem ? "Adding..." : "Add to cart"}
          </Button>
          <Button type="button" size="lg" variant="outline">
            <HeartIcon data-icon="inline-start" />
            Save
          </Button>
        </div>

        <p className="text-sm leading-6 text-muted-foreground">
          Selected: {selectedVariant ? getVariantLabel(selectedVariant) : "None"}.
          {cart ? ` Your cart currently has ${cart.itemCount} item${cart.itemCount === 1 ? "" : "s"}.` : ""}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.25rem] border border-border/70 bg-background px-4 py-4">
            <div className="flex items-center gap-3">
              <TruckIcon className="size-4 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">
                White-glove delivery ready
              </p>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Delivery scheduling and freight rules can be layered in later.
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-border/70 bg-background px-4 py-4">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="size-4 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">
                Built for long-term use
              </p>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Material details and craftsmanship notes are already available below.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
