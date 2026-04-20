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
  adminCategorySchema,
  type AdminCategoryFormInput,
  type AdminCategoryValues,
} from "@/lib/validations/admin";

export function AdminCategoryForm({
  mode,
  categoryId,
  categories,
  defaultValues,
}: {
  mode: "create" | "edit";
  categoryId?: string;
  categories: Array<{
    id: string;
    name: string;
  }>;
  defaultValues?: Partial<AdminCategoryValues>;
}) {
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const parentOptions = [
    { label: "No parent", value: "" },
    ...categories.map((category) => ({
      label: category.name,
      value: category.id,
    })),
  ];
  const form = useForm<AdminCategoryFormInput, unknown, AdminCategoryValues>({
    resolver: zodResolver(adminCategorySchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      slug: defaultValues?.slug ?? "",
      description: defaultValues?.description ?? "",
      displayOrder: defaultValues?.displayOrder ?? 0,
      isActive: defaultValues?.isActive ?? true,
      parentId: defaultValues?.parentId ?? "",
    },
  });

  async function onSubmit(values: AdminCategoryValues) {
    setSubmissionError(null);

    const payload = {
      ...values,
      slug: values.slug || slugify(values.name),
    };

    const response = await fetch(
      mode === "create"
        ? "/api/admin/categories"
        : `/api/admin/categories/${categoryId}`,
      {
        method: mode === "create" ? "POST" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;

    if (!response.ok) {
      setSubmissionError(result?.error ?? "Unable to save category.");
      return;
    }

    router.push("/admin/categories");
    router.refresh();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <FieldGroup>
        <div className="grid gap-5 xl:grid-cols-2">
          <Field data-invalid={!!form.formState.errors.name}>
            <FieldLabel htmlFor="name">Category name</FieldLabel>
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
              <FieldError errors={[form.formState.errors.slug]} />
            </FieldContent>
          </Field>
        </div>

        <Field data-invalid={!!form.formState.errors.description}>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <FieldContent>
            <Textarea
              id="description"
              rows={5}
              aria-invalid={!!form.formState.errors.description}
              {...form.register("description")}
            />
            <FieldError errors={[form.formState.errors.description]} />
          </FieldContent>
        </Field>

        <div className="grid gap-5 xl:grid-cols-2">
          <Field data-invalid={!!form.formState.errors.parentId}>
            <FieldLabel htmlFor="parentId">Parent category</FieldLabel>
            <FieldContent>
              <Controller
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <Select
                    items={parentOptions}
                    value={parentOptions.find((item) => item.value === field.value) ?? parentOptions[0]}
                    itemToStringValue={(item) => item.value}
                    onValueChange={(value) => field.onChange(value?.value ?? "")}
                  >
                    <SelectTrigger
                      id="parentId"
                      aria-invalid={!!form.formState.errors.parentId}
                      className="w-full"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {parentOptions.map((category) => (
                          <SelectItem key={category.value || "root"} value={category}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldDescription>
                Optional parent for nested storefront navigation.
              </FieldDescription>
              <FieldError errors={[form.formState.errors.parentId]} />
            </FieldContent>
          </Field>
          <Field data-invalid={!!form.formState.errors.displayOrder}>
            <FieldLabel htmlFor="displayOrder">Display order</FieldLabel>
            <FieldContent>
              <Input
                id="displayOrder"
                type="number"
                aria-invalid={!!form.formState.errors.displayOrder}
                {...form.register("displayOrder", { valueAsNumber: true })}
              />
              <FieldError errors={[form.formState.errors.displayOrder]} />
            </FieldContent>
          </Field>
        </div>

        <Field data-invalid={!!form.formState.errors.isActive}>
          <FieldLabel>
            <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card px-4 py-3">
              <Controller
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                  />
                )}
              />
              Make this category visible in the storefront
            </div>
          </FieldLabel>
          <FieldError errors={[form.formState.errors.isActive]} />
        </Field>
      </FieldGroup>

      {submissionError ? <p className="text-sm text-destructive">{submissionError}</p> : null}

      <div className="flex flex-wrap justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/categories")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? mode === "create"
              ? "Creating..."
              : "Saving..."
            : mode === "create"
              ? "Create category"
              : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
