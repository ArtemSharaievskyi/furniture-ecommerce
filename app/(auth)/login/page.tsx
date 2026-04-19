import { AuthPageView } from "@/features/auth/components/auth-page-view";

export default function LoginPage() {
  return (
    <AuthPageView
      mode="login"
      title="Welcome back to North Atelier"
      description="Sign in to access saved rooms, order history, and your design notes."
    />
  );
}
