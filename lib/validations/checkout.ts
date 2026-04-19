import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, "First name is required."),
  lastName: z.string().min(2, "Last name is required."),
  email: z.email("Enter a valid email address."),
  phone: z.string().min(7, "Enter a valid phone number."),
  addressLine1: z.string().min(5, "Address is required."),
  city: z.string().min(2, "City is required."),
  postalCode: z.string().min(4, "Postal code is required."),
  notes: z.string().max(300, "Keep notes under 300 characters.").optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
