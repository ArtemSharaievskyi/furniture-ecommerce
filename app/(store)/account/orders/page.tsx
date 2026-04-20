import { requireUser } from "@/lib/auth/guards";
import { OrderHistoryView } from "@/features/account/components/order-history-view";
import { getOrderHistoryData } from "@/features/account/server/account-queries";

export default async function AccountOrdersPage() {
  const session = await requireUser();
  const orders = await getOrderHistoryData(session.user.id);

  return (
    <OrderHistoryView
      orders={orders.map((order) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        totalCents: order.totalCents,
        currencyCode: order.currencyCode,
        placedAt: (order.placedAt ?? order.createdAt).toISOString(),
        linePreview: order.items
          .slice(0, 2)
          .map((item) => `${item.productName} x${item.quantity}`)
          .join(" • "),
        itemCount: order.items.length,
      }))}
    />
  );
}
