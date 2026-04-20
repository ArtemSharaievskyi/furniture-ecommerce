import { requireAdmin } from "@/lib/auth/guards";
import { AdminDashboardView } from "@/features/admin/components/admin-dashboard-view";
import { getAdminDashboardData } from "@/features/admin/server/admin-queries";

export default async function AdminPage() {
  const session = await requireAdmin();
  const dashboard = await getAdminDashboardData();

  return (
    <AdminDashboardView
      email={session.user.email ?? ""}
      counts={dashboard.counts}
      revenueCents={dashboard.revenueCents}
      recentOrders={dashboard.recentOrders.map((order) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        totalCents: order.totalCents,
        currencyCode: order.currencyCode,
        customerEmail: order.user?.email ?? "",
      }))}
      lowStockProducts={dashboard.lowStockProducts.map((product) => ({
        id: product.id,
        name: product.name,
        stockQuantity: product.stockQuantity,
        status: product.status,
      }))}
    />
  );
}
