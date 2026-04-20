import type { ReactNode } from "react";

import { requireUser } from "@/lib/auth/guards";
import { AccountShell } from "@/features/account/components/account-shell";
import { getAccountShellData } from "@/features/account/server/account-queries";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireUser();
  const account = await getAccountShellData(session.user.id);

  if (!account) {
    return null;
  }

  return (
    <AccountShell
      user={{
        name: account.name ?? "North Atelier customer",
        email: account.email,
        role: account.role,
        orderCount: account._count.orders,
        cartItemCount: account._count.cartItems,
      }}
    >
      {children}
    </AccountShell>
  );
}
