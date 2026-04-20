import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AuthPageView } from "@/features/auth/components/auth-page-view";

export default async function RegisterPage() {
  const session = await auth();

  if (session?.user) {
    redirect(session.user.role === "ADMIN" ? "/admin" : "/account");
  }

  return (
    <AuthPageView
      mode="register"
      title="Create your showroom account"
      description="Register a local customer account for wishlists, checkout, and order tracking."
    />
  );
}
