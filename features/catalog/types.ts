export type CatalogSort =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name";

export type CatalogFilters = {
  query: string;
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

export type CatalogSearchHit = {
  id: string;
  slug: string;
  name: string;
  category: string;
  material: string;
  shortDescription: string;
  imageUrl: string;
  price: string;
  isFeatured: boolean;
};

export type CatalogSearchResponse = {
  query: string;
  results: CatalogSearchHit[];
  suggestions: {
    products: string[];
    categories: string[];
    materials: string[];
  };
};

export type ProductImageItem = {
  id: string;
  url: string;
  altText: string | null;
  isPrimary: boolean;
};

export type ProductVariantItem = {
  id: string;
  name: string;
  sku: string;
  color: string;
  size: string;
  material: string;
  stockQuantity: number;
  stockLabel: string;
  isDefault: boolean;
  unitPriceCents?: number;
  price: string;
};

export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductDetail = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string | null;
  material: string;
  color: string;
  size: string;
  price: string;
  isFeatured: boolean;
  stockLabel: string;
  images: ProductImageItem[];
  variants: ProductVariantItem[];
  defaultVariant: ProductVariantItem | null;
  specifications: ProductSpecification[];
};
