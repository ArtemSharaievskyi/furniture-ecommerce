"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit(() => undefined)}
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
              Auth.js is configured as a placeholder only. No live sign-in logic
              has been added yet.
            </FieldDescription>
            <FieldError errors={[form.formState.errors.password]} />
          </FieldContent>
        </Field>
      </FieldGroup>
      <Button type="submit">Sign in</Button>
    </form>
  );
}

function RegisterForm() {
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
      onSubmit={form.handleSubmit(() => undefined)}
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
              Auth.js is configured as a placeholder only. No live sign-in logic
              has been added yet.
            </FieldDescription>
            <FieldError errors={[form.formState.errors.password]} />
          </FieldContent>
        </Field>
      </FieldGroup>
      <Button type="submit">Create account</Button>
    </form>
  );
}
