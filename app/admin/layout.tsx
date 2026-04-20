import type { ReactNode } from "react";

import { requireAdmin } from "@/lib/auth/guards";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { getAdminShellData } from "@/features/admin/server/admin-queries";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();
  const counts = await getAdminShellData();

  return <AdminShell counts={counts}>{children}</AdminShell>;
}
