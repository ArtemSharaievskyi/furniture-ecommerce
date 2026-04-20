import { notFound } from "next/navigation";

import { requireUser } from "@/lib/auth/guards";
import { OrderDetailView } from "@/features/account/components/order-detail-view";
import { getOrderDetailsData } from "@/features/account/server/account-queries";

export default async function AccountOrderDetailsPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const session = await requireUser();
  const { orderId } = await params;
  const order = await getOrderDetailsData(session.user.id, orderId);

  if (!order) {
    notFound();
  }

  return (
    <OrderDetailView
      order={{
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        currencyCode: order.currencyCode,
        subtotalCents: order.subtotalCents,
        shippingCents: order.shippingCents,
        taxCents: order.taxCents,
        discountCents: order.discountCents,
        totalCents: order.totalCents,
        email: order.email,
        firstName: order.firstName,
        lastName: order.lastName,
        phone: order.phone,
        shippingAddress1: order.shippingAddress1,
        shippingAddress2: order.shippingAddress2,
        shippingCity: order.shippingCity,
        shippingState: order.shippingState,
        shippingPostalCode: order.shippingPostalCode,
        shippingCountry: order.shippingCountry,
        placedAt: (order.placedAt ?? order.createdAt).toISOString(),
        items: order.items,
      }}
    />
  );
}
