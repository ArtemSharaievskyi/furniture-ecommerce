import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/guards";
import { AccountPageView } from "@/features/account/components/account-page-view";

export default async function AccountPage() {
  const session = await requireUser();
  const account = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: {
          orders: true,
          cartItems: true,
        },
      },
    },
  });

  if (!account) {
    return null;
  }

  return (
    <AccountPageView
      user={{
        name: account.name ?? "North Atelier customer",
        email: account.email,
        role: account.role,
        createdAt: account.createdAt.toISOString(),
      }}
      stats={[
        {
          label: "Orders",
          value: String(account._count.orders),
          description: "Placed through your local customer account.",
        },
        {
          label: "Cart items",
          value: String(account._count.cartItems),
          description: "Currently stored against your signed-in profile.",
        },
        {
          label: "Role",
          value: account.role,
          description: "Used to unlock customer or admin-only routes.",
        },
      ]}
    />
  );
}
