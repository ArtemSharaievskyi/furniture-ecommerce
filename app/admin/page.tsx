import { requireAdmin } from "@/lib/auth/guards";
import { AdminPageView } from "@/features/admin/components/admin-page-view";

export default async function AdminPage() {
  const session = await requireAdmin();

  return <AdminPageView email={session.user.email ?? ""} />;
}
