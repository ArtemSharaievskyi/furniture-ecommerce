import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { AuthForm } from "./auth-form";

export function AuthPageView({
  mode,
  title,
  description,
}: {
  mode: "login" | "register";
  title: string;
  description: string;
}) {
  return (
    <Card className="w-full max-w-xl border-border/70 bg-card/95 shadow-xl shadow-stone-900/5">
      <CardHeader>
        <CardTitle className="font-heading text-4xl tracking-tight">
          {title}
        </CardTitle>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <AuthForm mode={mode} />
        <p className="text-sm text-muted-foreground">
          {mode === "login" ? "Need an account?" : "Already registered?"}{" "}
          <Link
            href={mode === "login" ? "/register" : "/login"}
            className="font-medium text-foreground underline underline-offset-4"
          >
            {mode === "login" ? "Create one" : "Sign in"}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
