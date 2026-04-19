"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductImageItem } from "@/features/catalog/types";

export function ProductGallery({
  name,
  category,
  images,
}: {
  name: string;
  category: string;
  images: ProductImageItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card">
        <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
          <span className="rounded-full bg-background/88 px-3 py-1 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
            {category}
          </span>
        </div>

        <div className="relative aspect-[5/4]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${activeImage.url}")` }}
              aria-label={activeImage.altText || name}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(17,17,17,0.02),_rgba(17,17,17,0.12))]" />
        </div>

        {images.length > 1 ? (
          <>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/90"
              onClick={() =>
                setActiveIndex((current) =>
                  current === 0 ? images.length - 1 : current - 1,
                )
              }
            >
              <ChevronLeftIcon />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-background/90"
              onClick={() =>
                setActiveIndex((current) =>
                  current === images.length - 1 ? 0 : current + 1,
                )
              }
            >
              <ChevronRightIcon />
              <span className="sr-only">Next image</span>
            </Button>
          </>
        ) : null}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "aspect-[4/3] rounded-[1.2rem] border bg-cover bg-center transition-all",
              index === activeIndex
                ? "border-foreground ring-2 ring-foreground/10"
                : "border-border/70 opacity-85 hover:opacity-100",
            )}
            style={{ backgroundImage: `url("${image.url}")` }}
            aria-label={image.altText || `${name} image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
