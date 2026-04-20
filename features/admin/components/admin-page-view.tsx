import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { adminPanels } from "@/lib/site";

export function AdminPageView({ email }: { email: string }) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12">
      <div>
        <p className="text-sm uppercase tracking-[0.26em] text-muted-foreground">
          Admin
        </p>
        <h1 className="mt-4 font-heading text-5xl tracking-tight text-foreground">
          Operations dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          This route now requires an authenticated `ADMIN` session. Current
          operator: {email}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {adminPanels.map((panel) => (
          <Card key={panel.title} className="border-border/70 bg-card/92">
            <CardHeader>
              <CardTitle>{panel.title}</CardTitle>
              <CardDescription>{panel.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              {panel.body}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
