"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  loginSchema,
  registerSchema,
  type LoginFormValues,
  type RegisterFormValues,
} from "@/lib/validations/auth";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  return mode === "register" ? <RegisterForm /> : <LoginForm />;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit(async (values) => {
        setSubmissionError(null);
        const callbackUrl = searchParams.get("callbackUrl") ?? "/account";

        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
          callbackUrl,
        });

        if (result?.error) {
          setSubmissionError("We couldn't sign you in with those credentials.");
          return;
        }

        router.push(result?.url ?? callbackUrl);
        router.refresh();
      })}
      className="flex flex-col gap-5"
    >
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.email}>
          <FieldLabel htmlFor="auth-email">Email</FieldLabel>
          <FieldContent>
            <Input id="auth-email" type="email" {...form.register("email")} />
            <FieldError errors={[form.formState.errors.email]} />
          </FieldContent>
        </Field>
        <Field data-invalid={!!form.formState.errors.password}>
          <FieldLabel htmlFor="auth-password">Password</FieldLabel>
          <FieldContent>
            <Input
              id="auth-password"
              type="password"
              {...form.register("password")}
            />
            <FieldDescription>
              Use the account email and password you registered locally.
            </FieldDescription>
            <FieldError errors={[form.formState.errors.password]} />
          </FieldContent>
        </Field>
      </FieldGroup>
      <FieldError errors={submissionError ? [{ message: submissionError }] : []} />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}

function RegisterForm() {
  const router = useRouter();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit(async (values) => {
        setSubmissionError(null);

        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;

        if (!response.ok) {
          setSubmissionError(payload?.error ?? "We couldn't create your account.");
          return;
        }

        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (result?.error) {
          router.push("/login?registered=1");
          router.refresh();
          return;
        }

        router.push("/account");
        router.refresh();
      })}
      className="flex flex-col gap-5"
    >
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.name}>
          <FieldLabel htmlFor="name">Full name</FieldLabel>
          <FieldContent>
            <Input id="name" {...form.register("name")} />
            <FieldError errors={[form.formState.errors.name]} />
          </FieldContent>
        </Field>
        <Field data-invalid={!!form.formState.errors.email}>
          <FieldLabel htmlFor="auth-email">Email</FieldLabel>
          <FieldContent>
            <Input id="auth-email" type="email" {...form.register("email")} />
            <FieldError errors={[form.formState.errors.email]} />
          </FieldContent>
        </Field>
        <Field data-invalid={!!form.formState.errors.password}>
          <FieldLabel htmlFor="auth-password">Password</FieldLabel>
          <FieldContent>
            <Input
              id="auth-password"
              type="password"
              {...form.register("password")}
            />
            <FieldDescription>
              Minimum 8 characters. We store a hashed password locally.
            </FieldDescription>
            <FieldError errors={[form.formState.errors.password]} />
          </FieldContent>
        </Field>
      </FieldGroup>
      <FieldError errors={submissionError ? [{ message: submissionError }] : []} />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
