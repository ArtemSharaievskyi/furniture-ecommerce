"use client";

import type { ReactElement, ReactNode } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type {
  CatalogFilters,
  CatalogFilterOptions,
} from "@/features/catalog/types";

import { CatalogFilterSidebar } from "./catalog-filter-sidebar";

export function CatalogMobileFilters({
  children,
  filters,
  options,
}: {
  children: ReactNode;
  filters: CatalogFilters;
  options: CatalogFilterOptions;
}) {
  return (
    <Sheet>
      <SheetTrigger render={children as ReactElement} />
      <SheetContent side="right" className="w-full max-w-md overflow-y-auto p-0">
        <SheetHeader className="px-4 pt-4">
          <SheetTitle>Refine catalog</SheetTitle>
          <SheetDescription>
            Use the same filter controls on mobile without leaving the catalog.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <CatalogFilterSidebar filters={filters} options={options} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
