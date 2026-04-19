"use client";

import type {
  CartMutationInput,
  CartSummary,
  GuestCartStorageItem,
} from "@/features/cart/types";

import { buildCartSummary, mapGuestItemToCartLine } from "./cart-utils";

const STORAGE_KEY = "north-atelier-cart";
const CART_EVENT = "north-atelier-cart-updated";

function canUseStorage() {
  return typeof window !== "undefined";
}

function readStorageItems(): GuestCartStorageItem[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as GuestCartStorageItem[];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStorageItems(items: GuestCartStorageItem[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function getGuestCartSummary(): CartSummary {
  const items = readStorageItems().map(mapGuestItemToCartLine);

  return buildCartSummary(items, "guest");
}

export function addGuestCartItem(input: CartMutationInput) {
  const items = readStorageItems();
  const quantity = input.quantity ?? 1;
  const existing = items.find((item) => item.variantId === input.variantId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({
      id: crypto.randomUUID(),
      productId: input.productId,
      productSlug: input.snapshot.productSlug,
      productName: input.snapshot.productName,
      category: input.snapshot.category,
      imageUrl: input.snapshot.imageUrl,
      variantId: input.variantId,
      variantName: input.snapshot.variantName,
      color: input.snapshot.color,
      size: input.snapshot.size,
      material: input.snapshot.material,
      quantity,
      unitPriceCents: input.snapshot.unitPriceCents,
      currencyCode: input.snapshot.currencyCode ?? "USD",
    });
  }

  writeStorageItems(items);
  return getGuestCartSummary();
}

export function updateGuestCartItemQuantity(itemId: string, quantity: number) {
  const items = readStorageItems();
  const nextItems =
    quantity <= 0
      ? items.filter((item) => item.id !== itemId)
      : items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item,
        );

  writeStorageItems(nextItems);
  return getGuestCartSummary();
}

export function removeGuestCartItem(itemId: string) {
  const items = readStorageItems().filter((item) => item.id !== itemId);
  writeStorageItems(items);
  return getGuestCartSummary();
}

export function subscribeToGuestCart(onChange: () => void) {
  if (!canUseStorage()) {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      onChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CART_EVENT, onChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CART_EVENT, onChange);
  };
}
