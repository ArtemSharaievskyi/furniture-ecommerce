export type CatalogSort =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name";

export type CatalogFilters = {
  categories: string[];
  colors: string[];
  materials: string[];
  minPrice?: number;
  maxPrice?: number;
  sort: CatalogSort;
};

export type CatalogItem = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string | null;
  description: string;
  category: string;
  material: string;
  color: string;
  size: string;
  price: string;
  imageUrl: string;
  isFeatured: boolean;
  variantCount: number;
  stockLabel: string;
};

export type CatalogFilterOption = {
  id: string;
  name: string;
  slug: string;
};

export type CatalogSortingOption = {
  value: CatalogSort;
  label: string;
  description: string;
};

export type CatalogFilterOptions = {
  categories: CatalogFilterOption[];
  colors: string[];
  materials: string[];
  priceRange: {
    min: number;
    max: number;
  };
  sorting: CatalogSortingOption[];
};

export type CatalogPageData = {
  filters: CatalogFilters;
  products: CatalogItem[];
  options: CatalogFilterOptions;
  total: number;
};
