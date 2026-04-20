import { AdminOrdersTable } from "@/features/admin/components/admin-orders-table";
import { getAllAdminOrders } from "@/features/admin/server/admin-queries";

export default async function AdminOrdersPage() {
  const orders = await getAllAdminOrders();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 lg:py-12">
      <div>
        <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">
          Admin
        </p>
        <h1 className="mt-4 font-heading text-5xl tracking-tight text-foreground">
          Orders
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Review all orders in one place with customer, status, item count, and totals.
        </p>
      </div>
      <AdminOrdersTable
        orders={orders.map((order) => ({
          id: order.id,
          orderNumber: order.orderNumber,
          customerEmail: order.user?.email ?? order.email,
          status: order.status,
          totalCents: order.totalCents,
          currencyCode: order.currencyCode,
          itemCount: order.items.length,
          placedAt: (order.placedAt ?? order.createdAt).toISOString(),
        }))}
      />
    </div>
  );
}
