import { LogoutButton } from "@/components/auth/logout-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AccountPageView({
  user,
  stats,
}: {
  user: {
    name: string;
    email: string;
    role: "CUSTOMER" | "ADMIN";
    createdAt: string;
  };
  stats: Array<{
    label: string;
    value: string;
    description: string;
  }>;
}) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
            Account
          </p>
          <h1 className="mt-4 font-heading text-5xl tracking-tight">
            Welcome back, {user.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Your session is active and this dashboard is protected on the
            server. Use it as the handoff point for orders, saved products, and
            profile tools later.
          </p>
        </div>
        <LogoutButton />
      </div>
      <Card className="border-border/70 bg-card/90">
        <CardHeader>
          <CardTitle>Session overview</CardTitle>
          <CardDescription>Signed in as {user.email}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
          <div>
            <p className="font-medium text-foreground">Access level</p>
            <p className="mt-1">{user.role}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Member since</p>
            <p className="mt-1">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
              }).format(new Date(user.createdAt))}
            </p>
          </div>
          <div>
            <p className="font-medium text-foreground">Protected routes</p>
            <p className="mt-1">/account is private and /admin is role-based.</p>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border/70 bg-card/90">
            <CardHeader>
              <CardTitle>{stat.label}</CardTitle>
              <CardDescription>{stat.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-heading text-4xl tracking-tight">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          ["Orders", "Future order history and fulfillment timeline."],
          ["Saved rooms", "Wishlist and room-board compositions."],
          ["Profile", "Addresses, preferences, and support settings."],
        ].map(([title, description]) => (
          <Card key={title} className="border-border/70 bg-card/90">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              This section now sits behind a real Auth.js session, so you can
              attach customer-specific data without reopening the route-level
              auth work.
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
