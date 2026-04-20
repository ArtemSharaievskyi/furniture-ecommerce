"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2Icon, CreditCardIcon, LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { clearGuestCart } from "@/features/cart/lib/guest-cart";
import { useCart } from "@/features/cart/hooks/use-cart";
import {
  checkoutFormSchema,
  type CheckoutFormValues,
} from "@/lib/validations/checkout";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function CheckoutForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { cart, isLoading, isAuthenticated } = useCart();
  const [step, setStep] = useState<"details" | "payment">("details");
  const [draftValues, setDraftValues] = useState<CheckoutFormValues | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (session?.user?.name && !form.getValues("fullName")) {
      form.setValue("fullName", session.user.name, {
        shouldDirty: false,
      });
    }
  }, [form, session?.user?.name]);

  const handleContinueToPayment = form.handleSubmit((values) => {
    if (!cart?.items.length) {
      setSubmissionError("Add at least one item to your cart before checkout.");
      return;
    }

    setSubmissionError(null);
    setDraftValues(values);
    setStep("payment");
  });

  async function handleConfirmOrder() {
    if (!draftValues || !cart?.items.length) {
      setSubmissionError("Your cart is empty.");
      setStep("details");
      return;
    }

    setSubmissionError(null);
    setIsProcessingPayment(true);

    try {
      await wait(900);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...draftValues,
          cart: isAuthenticated
            ? undefined
            : {
                mode: "guest",
                items: cart.items.map((item) => ({
                  productId: item.productId,
                  variantId: item.variantId,
                  productName: item.productName,
                  variantName: item.variantName,
                  quantity: item.quantity,
                  unitPriceCents: item.unitPriceCents,
                  lineTotalCents: item.lineTotalCents,
                  material: item.material,
                  color: item.color,
                  size: item.size,
                })),
                totalCents: cart.totalCents,
              },
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { error?: string; orderNumber?: string }
        | null;

      if (!response.ok || !payload?.orderNumber) {
        setSubmissionError(payload?.error ?? "We couldn't place your order.");
        return;
      }

      if (!isAuthenticated) {
        clearGuestCart();
      }

      await queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push(`/checkout/success?order=${encodeURIComponent(payload.orderNumber)}`);
      router.refresh();
    } finally {
      setIsProcessingPayment(false);
    }
  }

  if (isLoading) {
    return (
      <Card className="border-border/70 bg-card/92">
        <CardHeader>
          <CardTitle>Preparing checkout</CardTitle>
          <CardDescription>
            We&apos;re loading your cart and local payment summary.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!cart?.items.length) {
    return (
      <Card className="border-border/70 bg-card/92">
        <CardHeader>
          <CardTitle>Your cart is empty</CardTitle>
          <CardDescription>
            Add a few products before starting the mock checkout flow.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button nativeButton={false} render={<Link href="/catalog" />}>
            Browse catalog
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void handleContinueToPayment();
        }}
        className="rounded-[2rem] border border-border/70 bg-card p-6 md:p-8"
      >
        <FieldGroup>
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
              Step 1
            </p>
            <h2 className="mt-2 font-heading text-4xl tracking-tight">
              Shipping details
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              This local checkout stores contact details, simulates payment, and
              writes the order to your database without any external gateway.
            </p>
          </div>

          <Field data-invalid={!!form.formState.errors.fullName}>
            <FieldLabel htmlFor="fullName">Full name</FieldLabel>
            <FieldContent>
              <Input id="fullName" {...form.register("fullName")} />
              <FieldError errors={[form.formState.errors.fullName]} />
            </FieldContent>
          </Field>

          <Field data-invalid={!!form.formState.errors.phone}>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <FieldContent>
              <Input id="phone" {...form.register("phone")} />
              <FieldError errors={[form.formState.errors.phone]} />
            </FieldContent>
          </Field>

          <Field data-invalid={!!form.formState.errors.address}>
            <FieldLabel htmlFor="address">Address</FieldLabel>
            <FieldContent>
              <Textarea id="address" rows={4} {...form.register("address")} />
              <FieldDescription>
                Use one free-form address field for this local-only order flow.
              </FieldDescription>
              <FieldError errors={[form.formState.errors.address]} />
            </FieldContent>
          </Field>

          <Field data-invalid={!!form.formState.errors.notes}>
            <FieldLabel htmlFor="notes">Notes</FieldLabel>
            <FieldContent>
              <Textarea id="notes" rows={5} {...form.register("notes")} />
              <FieldDescription>
                Optional delivery notes or local mock checkout instructions.
              </FieldDescription>
              <FieldError errors={[form.formState.errors.notes]} />
            </FieldContent>
          </Field>

          <FieldError errors={submissionError ? [{ message: submissionError }] : []} />

          <div className="flex justify-end">
            <Button type="submit">Continue to mock payment</Button>
          </div>
        </FieldGroup>
      </form>

      <div className="flex flex-col gap-6">
        <Card className="border-border/70 bg-secondary/45">
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
            <CardDescription>
              {cart.mode === "user"
                ? "Your account cart will be cleared after the order is created."
                : "Guest cart lines are stored locally until the mock order succeeds."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 rounded-2xl border border-border/70 bg-background px-4 py-3"
              >
                <div>
                  <p className="font-medium text-foreground">{item.productName}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.variantName} x {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium text-foreground">{item.lineTotal}</p>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-border/70 pt-4">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-lg font-semibold text-foreground">{cart.total}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/92">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCardIcon className="size-4" />
              Mock payment
            </CardTitle>
            <CardDescription>
              Step 2 simulates a successful local payment before the order is
              written to Prisma.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="rounded-2xl border border-dashed border-border/80 bg-background px-4 py-4 text-sm leading-7 text-muted-foreground">
              <p className="font-medium text-foreground">Local payment simulator</p>
              <p className="mt-2">
                No gateway is contacted. Press confirm and we&apos;ll locally
                simulate a successful payment, create the order, and clear the cart.
              </p>
            </div>

            {step === "payment" && draftValues ? (
              <div className="rounded-2xl border border-border/70 bg-secondary/35 px-4 py-4 text-sm">
                <div className="flex items-center gap-2 text-foreground">
                  <CheckCircle2Icon className="size-4" />
                  Ready to confirm
                </div>
                <p className="mt-2 leading-7 text-muted-foreground">
                  Order for {draftValues.fullName} to {draftValues.address}
                </p>
              </div>
            ) : (
              <p className="text-sm leading-7 text-muted-foreground">
                Complete Step 1 to unlock the confirmation button.
              </p>
            )}

            <FieldError errors={submissionError ? [{ message: submissionError }] : []} />

            <div className="flex flex-wrap gap-3">
              {step === "payment" ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep("details")}
                    disabled={isProcessingPayment}
                  >
                    Edit details
                  </Button>
                  <Button
                    type="button"
                    onClick={() => void handleConfirmOrder()}
                    disabled={isProcessingPayment}
                  >
                    {isProcessingPayment ? (
                      <>
                        <LoaderCircleIcon data-icon="inline-start" className="animate-spin" />
                        Processing local payment...
                      </>
                    ) : (
                      "Confirm mock payment"
                    )}
                  </Button>
                </>
              ) : (
                <Button type="button" variant="outline" disabled>
                  Complete details first
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
