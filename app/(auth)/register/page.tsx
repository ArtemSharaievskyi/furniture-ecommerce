import { AuthPageView } from "@/features/auth/components/auth-page-view";

export default function RegisterPage() {
  return (
    <AuthPageView
      mode="register"
      title="Create your showroom account"
      description="Register a local customer account for wishlists, checkout, and order tracking."
    />
  );
}
