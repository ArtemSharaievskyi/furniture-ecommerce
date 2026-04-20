import { requireUser } from "@/lib/auth/guards";
import { AccountOverviewView } from "@/features/account/components/account-overview-view";
import { getAccountOverviewData } from "@/features/account/server/account-queries";

export default async function AccountPage() {
  const session = await requireUser();
  const account = await getAccountOverviewData(session.user.id);

  if (!account.user) {
    return null;
  }

  return (
    <AccountOverviewView
      user={{
        name: account.user.name ?? "North Atelier customer",
        email: account.user.email,
        role: account.user.role,
        createdAt: account.user.createdAt.toISOString(),
      }}
      stats={[
        {
          label: "Orders",
          value: String(account.user._count.orders),
          description: "Placed through your authenticated account.",
        },
        {
          label: "Cart items",
          value: String(account.user._count.cartItems),
          description: "Currently saved against your profile.",
        },
        {
          label: "Recent orders",
          value: String(account.recentOrders.length),
          description: "Latest order cards shown below.",
        },
      ]}
      recentOrders={account.recentOrders.map((order) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        totalCents: order.totalCents,
        currencyCode: order.currencyCode,
        placedAt: (order.placedAt ?? order.createdAt).toISOString(),
        itemCount: order.items.length,
      }))}
    />
  );
}
