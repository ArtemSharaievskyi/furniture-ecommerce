export type CartMode = "guest" | "user";

export type CartMutationInput = {
  productId: string;
  variantId: string;
  quantity?: number;
  snapshot: {
    productSlug: string;
    productName: string;
    category: string;
    imageUrl: string;
    variantName: string;
    color: string;
    size: string;
    material: string;
    unitPriceCents: number;
    currencyCode?: string;
  };
};

export type CartLine = {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  category: string;
  imageUrl: string;
  variantId: string;
  variantName: string;
  color: string;
  size: string;
  material: string;
  quantity: number;
  unitPriceCents: number;
  unitPrice: string;
  lineTotalCents: number;
  lineTotal: string;
  stockLabel: string;
};

export type CartSummary = {
  mode: CartMode;
  items: CartLine[];
  itemCount: number;
  subtotalCents: number;
  subtotal: string;
  totalCents: number;
  total: string;
};

export type GuestCartStorageItem = {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  category: string;
  imageUrl: string;
  variantId: string;
  variantName: string;
  color: string;
  size: string;
  material: string;
  quantity: number;
  unitPriceCents: number;
  currencyCode: string;
};
