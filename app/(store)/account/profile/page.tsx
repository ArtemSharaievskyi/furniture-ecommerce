import { requireUser } from "@/lib/auth/guards";
import { AccountProfileView } from "@/features/account/components/account-profile-view";
import { getProfileData } from "@/features/account/server/account-queries";

export default async function AccountProfilePage() {
  const session = await requireUser();
  const profile = await getProfileData(session.user.id);

  if (!profile) {
    return null;
  }

  return (
    <AccountProfileView
      profile={{
        name: profile.name ?? "North Atelier customer",
        email: profile.email,
        phone: profile.phone,
        role: profile.role,
        createdAt: profile.createdAt.toISOString(),
        updatedAt: profile.updatedAt.toISOString(),
        orderCount: profile._count.orders,
        cartItemCount: profile._count.cartItems,
      }}
    />
  );
}
