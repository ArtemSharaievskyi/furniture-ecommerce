import { PageHero } from "@/components/shared/page-hero";

import { CheckoutForm } from "./checkout-form";

export function CheckoutPageView() {
  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Checkout"
        title="A validated checkout shell without payment processing."
        description="The form uses React Hook Form and Zod for local validation only. Real payment, shipping, and order logic are intentionally deferred."
      />
      <div className="mx-auto w-full max-w-4xl px-6">
        <CheckoutForm />
      </div>
    </div>
  );
}
