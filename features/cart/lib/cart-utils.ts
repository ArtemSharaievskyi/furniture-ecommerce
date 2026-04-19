import type {
  CartLine,
  CartMode,
  CartSummary,
  GuestCartStorageItem,
} from "@/features/cart/types";

export function formatCartCurrency(cents: number, currencyCode = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function buildStockLabel(quantity: number) {
  if (quantity <= 0) {
    return "Out of stock";
  }

  if (quantity <= 5) {
    return `Only ${quantity} left`;
  }

  return "In stock";
}

export function mapGuestItemToCartLine(item: GuestCartStorageItem): CartLine {
  const lineTotalCents = item.unitPriceCents * item.quantity;

  return {
    id: item.id,
    productId: item.productId,
    productSlug: item.productSlug,
    productName: item.productName,
    category: item.category,
    imageUrl: item.imageUrl,
    variantId: item.variantId,
    variantName: item.variantName,
    color: item.color,
    size: item.size,
    material: item.material,
    quantity: item.quantity,
    unitPriceCents: item.unitPriceCents,
    unitPrice: formatCartCurrency(item.unitPriceCents, item.currencyCode),
    lineTotalCents,
    lineTotal: formatCartCurrency(lineTotalCents, item.currencyCode),
    stockLabel: buildStockLabel(99),
  };
}

export function buildCartSummary(
  items: CartLine[],
  mode: CartMode,
  currencyCode = "USD",
): CartSummary {
  const subtotalCents = items.reduce((sum, item) => sum + item.lineTotalCents, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    mode,
    items,
    itemCount,
    subtotalCents,
    subtotal: formatCartCurrency(subtotalCents, currencyCode),
    totalCents: subtotalCents,
    total: formatCartCurrency(subtotalCents, currencyCode),
  };
}
