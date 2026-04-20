import type {
  AdminCategoryValues,
  AdminProductValues,
} from "@/lib/validations/admin";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeProductPayload(values: AdminProductValues) {
  return {
    ...values,
    slug: slugify(values.slug || values.name),
    compareAtPriceCents:
      values.compareAtPriceCents && values.compareAtPriceCents > 0
        ? values.compareAtPriceCents
        : null,
    shortDescription: values.shortDescription?.trim() || null,
    material: values.material?.trim() || null,
    color: values.color?.trim() || null,
    size: values.size?.trim() || null,
    imageUrl: values.imageUrl?.trim() || null,
    imageAltText: values.imageAltText?.trim() || null,
  };
}

export function normalizeCategoryPayload(values: AdminCategoryValues) {
  return {
    ...values,
    slug: slugify(values.slug || values.name),
    description: values.description?.trim() || null,
    parentId: values.parentId?.trim() || null,
  };
}
