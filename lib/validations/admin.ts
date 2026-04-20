import { z } from "zod";

const optionalText = z.string().trim().optional().or(z.literal(""));

export const adminProductSchema = z.object({
  name: z.string().trim().min(2, "Product name is required."),
  slug: z
    .string()
    .trim()
    .min(2, "Slug is required.")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only."),
  sku: z.string().trim().min(2, "SKU is required."),
  categoryId: z.string().trim().min(1, "Select a category."),
  shortDescription: optionalText,
  description: z.string().trim().min(10, "Description is required."),
  material: optionalText,
  color: optionalText,
  size: optionalText,
  priceCents: z.coerce.number().int().min(0, "Price must be 0 or more."),
  compareAtPriceCents: z.coerce.number().int().min(0).optional().nullable(),
  stockQuantity: z.coerce.number().int().min(0, "Stock must be 0 or more."),
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]),
  isFeatured: z.boolean().default(false),
  imageUrl: optionalText,
  imageAltText: optionalText,
});

export const adminCategorySchema = z.object({
  name: z.string().trim().min(2, "Category name is required."),
  slug: z
    .string()
    .trim()
    .min(2, "Slug is required.")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only."),
  description: optionalText,
  displayOrder: z.coerce.number().int().min(0, "Display order must be 0 or more."),
  isActive: z.boolean().default(true),
  parentId: optionalText,
});

export type AdminProductFormInput = z.input<typeof adminProductSchema>;
export type AdminProductValues = z.output<typeof adminProductSchema>;
export type AdminCategoryFormInput = z.input<typeof adminCategorySchema>;
export type AdminCategoryValues = z.output<typeof adminCategorySchema>;
