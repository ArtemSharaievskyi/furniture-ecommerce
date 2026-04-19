export type ProductSpec = {
  label: string;
  value: string;
};

export type CatalogProduct = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  collection: string;
  finish: string;
  material: string;
  price: string;
  specs: ProductSpec[];
};
