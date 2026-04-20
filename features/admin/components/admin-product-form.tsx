"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/features/admin/lib/admin-utils";
import {
  adminProductSchema,
  type AdminProductFormInput,
  type AdminProductValues,
} from "@/lib/validations/admin";

export function AdminProductForm({
  mode,
  productId,
  categories,
  defaultValues,
}: {
  mode: "create" | "edit";
  productId?: string;
  categories: Array<{
    id: string;
    name: string;
  }>;
  defaultValues?: Partial<AdminProductValues>;
}) {
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));
  const statusOptions = ["DRAFT", "ACTIVE", "ARCHIVED"].map((status) => ({
    label: status,
    value: status as AdminProductValues["status"],
  }));
  const form = useForm<AdminProductFormInput, unknown, AdminProductValues>({
    resolver: zodResolver(adminProductSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      slug: defaultValues?.slug ?? "",
      sku: defaultValues?.sku ?? "",
      categoryId: defaultValues?.categoryId ?? "",
      shortDescription: defaultValues?.shortDescription ?? "",
      description: defaultValues?.description ?? "",
      material: defaultValues?.material ?? "",
      color: defaultValues?.color ?? "",
      size: defaultValues?.size ?? "",
      priceCents: defaultValues?.priceCents ?? 0,
      compareAtPriceCents: defaultValues?.compareAtPriceCents ?? null,
      stockQuantity: defaultValues?.stockQuantity ?? 0,
      status: defaultValues?.status ?? "DRAFT",
      isFeatured: defaultValues?.isFeatured ?? false,
      imageUrl: defaultValues?.imageUrl ?? "",
      imageAltText: defaultValues?.imageAltText ?? "",
    },
  });

  async function onSubmit(values: AdminProductValues) {
    setSubmissionError(null);

    const payload = {
      ...values,
      slug: values.slug || slugify(values.name),
    };

    const response = await fetch(
      mode === "create" ? "/api/admin/products" : `/api/admin/products/${productId}`,
      {
        method: mode === "create" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = (await response.json().catch(() => null)) as
      | { error?: string; productId?: string }
      | null;

    if (!response.ok) {
      setSubmissionError(result?.error ?? "Unable to save product.");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <FieldGroup>
        <div className="grid gap-5 xl:grid-cols-2">
          <Field data-invalid={!!form.formState.errors.name}>
            <FieldLabel htmlFor="name">Product name</FieldLabel>
            <FieldContent>
              <Input
                id="name"
                aria-invalid={!!form.formState.errors.name}
                {...form.register("name")}
                onChange={(event) => {
                  form.register("name").onChange(event);
                  if (!form.getValues("slug")) {
                    form.setValue("slug", slugify(event.target.value));
                  }
                }}
              />
              <FieldError errors={[form.formState.errors.name]} />
            </FieldContent>
          </Field>
          <Field data-invalid={!!form.formState.errors.slug}>
            <FieldLabel htmlFor="slug">Slug</FieldLabel>
            <FieldContent>
              <Input
                id="slug"
                aria-invalid={!!form.formState.errors.slug}
                {...form.register("slug")}
              />
              <FieldDescription>
                Public product URL segment. Lowercase letters, numbers, and hyphens only.
              </FieldDescription>
              <FieldError errors={[form.formState.errors.slug]} />
            </FieldContent>
          </Field>
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          <Field data-invalid={!!form.formState.errors.sku}>
            <FieldLabel htmlFor="sku">SKU</FieldLabel>
            <FieldContent>
              <Input
                id="sku"
                aria-invalid={!!form.formState.errors.sku}
                {...form.register("sku")}
              />
              <FieldError errors={[form.formState.errors.sku]} />
            </FieldContent>
          </Field>
          <Field data-invalid={!!form.formState.errors.categoryId}>
            <FieldLabel htmlFor="categoryId">Category</FieldLabel>
            <FieldContent>
              <Controller
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <Select
                    items={categoryOptions}
                    value={categoryOptions.find((item) => item.value === field.value) ?? null}
                    itemToStringValue={(item) => item.value}
                    onValueChange={(value) => field.onChange(value?.value ?? "")}
                  >
                    <SelectTrigger
                      id="categoryId"
                      aria-invalid={!!form.formState.errors.categoryId}
                      className="w-full"
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categoryOptions.map((category) => (
                          <SelectItem key={category.value} value={category}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[form.formState.errors.categoryId]} />
            </FieldContent>
          </Field>
          <Field data-invalid={!!form.formState.errors.status}>
            <FieldLabel htmlFor="status">Status</FieldLabel>
            <FieldContent>
              <Controller
                control={form.control}
                name="status"
                render={({ field }) => (
                  <Select
                    items={statusOptions}
                    value={statusOptions.find((item) => item.value === field.value) ?? null}
                    itemToStringValue={(item) => item.value}
                    onValueChange={(value) => field.onChange(value?.value ?? "DRAFT")}
                  >
                    <SelectTrigger
                      id="status"
                      aria-invalid={!!form.formState.errors.status}
                      className="w-full"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[form.formState.errors.status]} />
            </FieldContent>
          </Field>
        </div>

        <Field data-invalid={!!form.formState.errors.shortDescription}>
          <FieldLabel htmlFor="shortDescription">Short description</FieldLabel>
          <FieldContent>
            <Textarea
              id="shortDescription"
              rows={3}
              aria-invalid={!!form.formState.errors.shortDescription}
              {...form.register("shortDescription")}
            />
            <FieldError errors={[form.formState.errors.shortDescription]} />
          </FieldContent>
        </Field>

        <Field data-invalid={!!form.formState.errors.description}>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <FieldContent>
            <Textarea
              id="description"
              rows={7}
              aria-invalid={!!form.formState.errors.description}
              {...form.register("description")}
            />
            <FieldError errors={[form.formState.errors.description]} />
          </FieldContent>
        </Field>

        <div className="grid gap-5 xl:grid-cols-3">
          <Field data-invalid={!!form.formState.errors.material}>
            <FieldLabel htmlFor="material">Material</FieldLabel>
            <FieldContent>
              <Input id="material" {...form.register("material")} />
              <FieldError errors={[form.formState.errors.material]} />
            </FieldContent>
          </Field>
          <Field data-invalid={!!form.formState.errors.color}>
            <FieldLabel htmlFor="color">Color</FieldLabel>
            <FieldContent>
              <Input id="color" {...form.register("color")} />
              <FieldError errors={[form.formState.errors.color]} />
            </FieldContent>
          </Field>
          <Field data-invalid={!!form.formState.errors.size}>
            <FieldLabel htmlFor="size">Size</FieldLabel>
            <FieldContent>
              <Input id="size" {...form.register("size")} />
              <FieldError errors={[form.formState.errors.size]} />
            </FieldContent>
          </Field>
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          <Field data-invalid={!!form.formState.errors.priceCents}>
            <FieldLabel htmlFor="priceCents">Price in cents</FieldLabel>
            <FieldContent>
              <Input
                id="priceCents"
                type="number"
                aria-invalid={!!form.formState.errors.priceCents}
                {...form.register("priceCents", { valueAsNumber: true })}
              />
              <FieldError errors={[form.formState.errors.priceCents]} />
            </FieldContent>
          </Field>
          <Field data-invalid={!!form.formState.errors.compareAtPriceCents}>
            <FieldLabel htmlFor="compareAtPriceCents">Compare-at price</FieldLabel>
            <FieldContent>
              <Input
                id="compareAtPriceCents"
                type="number"
                aria-invalid={!!form.formState.errors.compareAtPriceCents}
                {...form.register("compareAtPriceCents", {
                  setValueAs: (value) => (value === "" ? null : Number(value)),
                })}
              />
              <FieldError errors={[form.formState.errors.compareAtPriceCents]} />
            </FieldContent>
          </Field>
          <Field data-invalid={!!form.formState.errors.stockQuantity}>
            <FieldLabel htmlFor="stockQuantity">Stock quantity</FieldLabel>
            <FieldContent>
              <Input
                id="stockQuantity"
                type="number"
                aria-invalid={!!form.formState.errors.stockQuantity}
                {...form.register("stockQuantity", { valueAsNumber: true })}
              />
              <FieldError errors={[form.formState.errors.stockQuantity]} />
            </FieldContent>
          </Field>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <Field data-invalid={!!form.formState.errors.imageUrl}>
            <FieldLabel htmlFor="imageUrl">Primary image URL</FieldLabel>
            <FieldContent>
              <Input id="imageUrl" {...form.register("imageUrl")} />
              <FieldError errors={[form.formState.errors.imageUrl]} />
            </FieldContent>
          </Field>
          <Field data-invalid={!!form.formState.errors.imageAltText}>
            <FieldLabel htmlFor="imageAltText">Image alt text</FieldLabel>
            <FieldContent>
              <Input id="imageAltText" {...form.register("imageAltText")} />
              <FieldError errors={[form.formState.errors.imageAltText]} />
            </FieldContent>
          </Field>
        </div>

        <Field data-invalid={!!form.formState.errors.isFeatured}>
          <FieldLabel>
            <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-3">
              <Controller
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                  />
                )}
              />
              Feature this product on the storefront
            </div>
          </FieldLabel>
          <FieldError errors={[form.formState.errors.isFeatured]} />
        </Field>
      </FieldGroup>

      {submissionError ? <p className="text-sm text-destructive">{submissionError}</p> : null}

      <div className="flex flex-wrap justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/products")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? mode === "create"
              ? "Creating..."
              : "Saving..."
            : mode === "create"
              ? "Create product"
              : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
