import { PageHero } from "@/components/shared/page-hero";

import { CheckoutForm } from "./checkout-form";

export function CheckoutPageView() {
  return (
    <div className="pb-16">
      <PageHero
        eyebrow="Checkout"
        title="Local checkout with a mock payment confirmation step."
        description="Capture customer details, simulate a successful payment locally, create an order in Prisma, and clear the cart after confirmation."
      />
      <div className="mx-auto w-full max-w-7xl px-6">
        <CheckoutForm />
      </div>
    </div>
  );
}
