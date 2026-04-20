"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export function LogoutButton({
  variant = "outline",
  className,
}: {
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  className?: string;
}) {
  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={() =>
        void signOut({
          callbackUrl: "/login",
        })
      }
    >
      Logout
    </Button>
  );
}
