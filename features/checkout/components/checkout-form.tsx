"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { checkoutFormSchema, type CheckoutFormValues } from "@/lib/validations/checkout";

export function CheckoutForm() {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      addressLine1: "",
      city: "",
      postalCode: "",
      notes: "",
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit(() => undefined)}
      className="rounded-[2rem] border border-border/70 bg-card p-6 md:p-8"
    >
      <FieldGroup>
        <div className="grid gap-5 md:grid-cols-2">
          <Field data-invalid={!!form.formState.errors.firstName}>
            <FieldLabel htmlFor="firstName">First name</FieldLabel>
            <FieldContent>
              <Input id="firstName" {...form.register("firstName")} />
              <FieldError errors={[form.formState.errors.firstName]} />
            </FieldContent>
          </Field>
          <Field data-invalid={!!form.formState.errors.lastName}>
            <FieldLabel htmlFor="lastName">Last name</FieldLabel>
            <FieldContent>
              <Input id="lastName" {...form.register("lastName")} />
              <FieldError errors={[form.formState.errors.lastName]} />
            </FieldContent>
          </Field>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Field data-invalid={!!form.formState.errors.email}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <FieldContent>
              <Input id="email" type="email" {...form.register("email")} />
              <FieldError errors={[form.formState.errors.email]} />
            </FieldContent>
          </Field>
          <Field data-invalid={!!form.formState.errors.phone}>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <FieldContent>
              <Input id="phone" {...form.register("phone")} />
              <FieldError errors={[form.formState.errors.phone]} />
            </FieldContent>
          </Field>
        </div>
        <Field data-invalid={!!form.formState.errors.addressLine1}>
          <FieldLabel htmlFor="addressLine1">Address line 1</FieldLabel>
          <FieldContent>
            <Input id="addressLine1" {...form.register("addressLine1")} />
            <FieldDescription>
              Local-only placeholder for future delivery integrations.
            </FieldDescription>
            <FieldError errors={[form.formState.errors.addressLine1]} />
          </FieldContent>
        </Field>
        <div className="grid gap-5 md:grid-cols-2">
          <Field data-invalid={!!form.formState.errors.city}>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <FieldContent>
              <Input id="city" {...form.register("city")} />
              <FieldError errors={[form.formState.errors.city]} />
            </FieldContent>
          </Field>
          <Field data-invalid={!!form.formState.errors.postalCode}>
            <FieldLabel htmlFor="postalCode">Postal code</FieldLabel>
            <FieldContent>
              <Input id="postalCode" {...form.register("postalCode")} />
              <FieldError errors={[form.formState.errors.postalCode]} />
            </FieldContent>
          </Field>
        </div>
        <Field data-invalid={!!form.formState.errors.notes}>
          <FieldLabel htmlFor="notes">Delivery notes</FieldLabel>
          <FieldContent>
            <Textarea id="notes" rows={5} {...form.register("notes")} />
            <FieldError errors={[form.formState.errors.notes]} />
          </FieldContent>
        </Field>
        <div className="flex justify-end">
          <Button type="submit">Place placeholder order</Button>
        </div>
      </FieldGroup>
    </form>
  );
}
