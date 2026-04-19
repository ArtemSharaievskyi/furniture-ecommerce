"use client";

import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import type { CartMutationInput, CartSummary } from "@/features/cart/types";

import {
  addGuestCartItem,
  getGuestCartSummary,
  removeGuestCartItem,
  subscribeToGuestCart,
  updateGuestCartItemQuantity,
} from "../lib/guest-cart";

async function readUserCart() {
  const response = await fetch("/api/cart", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to load cart");
  }

  return (await response.json()) as CartSummary;
}

async function createUserCartItem(input: CartMutationInput) {
  const response = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      productId: input.productId,
      variantId: input.variantId,
      quantity: input.quantity ?? 1,
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to add item to cart");
  }

  return (await response.json()) as CartSummary;
}

async function patchUserCartItem(itemId: string, quantity: number) {
  const response = await fetch(`/api/cart/${itemId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error("Unable to update cart item");
  }

  return (await response.json()) as CartSummary;
}

async function deleteUserCartItem(itemId: string) {
  const response = await fetch(`/api/cart/${itemId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to remove cart item");
  }

  return (await response.json()) as CartSummary;
}

export function useCart() {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const isAuthenticated = Boolean(session?.user?.id);
  const queryKey = ["cart", isAuthenticated ? session?.user?.id : "guest"];

  const cartQuery = useQuery({
    queryKey,
    queryFn: () => (isAuthenticated ? readUserCart() : Promise.resolve(getGuestCartSummary())),
    enabled: status !== "loading",
    staleTime: isAuthenticated ? 0 : Infinity,
  });

  useEffect(() => {
    if (isAuthenticated) {
      return;
    }

    return subscribeToGuestCart(() => {
      queryClient.invalidateQueries({ queryKey: ["cart", "guest"] });
    });
  }, [isAuthenticated, queryClient]);

  const addItem = useMutation({
    mutationFn: (input: CartMutationInput) =>
      isAuthenticated ? createUserCartItem(input) : Promise.resolve(addGuestCartItem(input)),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const updateQuantity = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      isAuthenticated
        ? patchUserCartItem(itemId, quantity)
        : Promise.resolve(updateGuestCartItemQuantity(itemId, quantity)),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const removeItem = useMutation({
    mutationFn: (itemId: string) =>
      isAuthenticated
        ? deleteUserCartItem(itemId)
        : Promise.resolve(removeGuestCartItem(itemId)),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    ...cartQuery,
    cart: cartQuery.data,
    isAuthenticated,
    addItem: addItem.mutateAsync,
    isAddingItem: addItem.isPending,
    updateQuantity: updateQuantity.mutateAsync,
    isUpdatingQuantity: updateQuantity.isPending,
    removeItem: removeItem.mutateAsync,
    isRemovingItem: removeItem.isPending,
  };
}
