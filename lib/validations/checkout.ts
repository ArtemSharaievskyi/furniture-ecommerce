import { z } from "zod";

export const checkoutFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  phone: z.string().min(7, "Enter a valid phone number."),
  address: z.string().min(8, "Address is required."),
  notes: z.string().max(300, "Keep notes under 300 characters.").optional(),
});

export const checkoutCartItemSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
  productName: z.string().min(1),
  variantName: z.string().min(1),
  quantity: z.number().int().positive().max(99),
  unitPriceCents: z.number().int().nonnegative(),
  lineTotalCents: z.number().int().nonnegative(),
  material: z.string(),
  color: z.string(),
  size: z.string(),
});

export const guestCheckoutCartSchema = z.object({
  mode: z.literal("guest"),
  items: z.array(checkoutCartItemSchema).min(1, "Your cart is empty."),
  totalCents: z.number().int().nonnegative(),
});

export const checkoutRequestSchema = checkoutFormSchema.extend({
  cart: guestCheckoutCartSchema.optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
export type CheckoutRequestValues = z.infer<typeof checkoutRequestSchema>;
