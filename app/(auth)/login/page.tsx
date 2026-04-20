import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AuthPageView } from "@/features/auth/components/auth-page-view";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect(session.user.role === "ADMIN" ? "/admin" : "/account");
  }

  return (
    <AuthPageView
      mode="login"
      title="Welcome back to North Atelier"
      description="Sign in to access saved rooms, order history, and your design notes."
    />
  );
}
