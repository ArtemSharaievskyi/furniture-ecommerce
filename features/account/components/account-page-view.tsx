import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AccountPageView() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-16">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
          Account
        </p>
        <h1 className="mt-4 font-heading text-5xl tracking-tight">
          Personal dashboard placeholder
        </h1>
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
              This module is intentionally static until account data access and
              authorization rules are implemented.
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
