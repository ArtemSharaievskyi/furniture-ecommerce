import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AccountProfileView({
  profile,
}: {
  profile: {
    name: string;
    email: string;
    phone: string | null;
    role: "CUSTOMER" | "ADMIN";
    createdAt: string;
    updatedAt: string;
    orderCount: number;
    cartItemCount: number;
  };
}) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="border-border/70 bg-card/92">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-3">
            <CardTitle className="font-heading text-5xl tracking-tight">
              Profile
            </CardTitle>
            <Badge variant="outline">{profile.role}</Badge>
          </div>
          <CardDescription className="max-w-2xl text-sm leading-7">
            Core customer details are loaded directly from your user record in
            the database for this authenticated session.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border/70 bg-secondary/38">
          <CardHeader>
            <CardTitle>Contact information</CardTitle>
            <CardDescription>
              Profile fields currently reflect account data captured during local auth and checkout.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <ProfileField label="Full name" value={profile.name} />
            <ProfileField label="Email" value={profile.email} />
            <ProfileField label="Phone" value={profile.phone ?? "Not added yet"} />
            <ProfileField label="Access role" value={profile.role} />
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/90">
          <CardHeader>
            <CardTitle>Account activity</CardTitle>
            <CardDescription>
              Quick readout from your stored customer record.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm text-muted-foreground">
            <ActivityRow
              label="Member since"
              value={new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
              }).format(new Date(profile.createdAt))}
            />
            <ActivityRow
              label="Last updated"
              value={new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(profile.updatedAt))}
            />
            <ActivityRow label="Total orders" value={String(profile.orderCount)} />
            <ActivityRow label="Cart items" value={String(profile.cartItemCount)} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background px-4 py-4">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-3 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function ActivityRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-background px-4 py-3">
      <span>{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
