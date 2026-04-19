import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      id: string;
      role: "CUSTOMER" | "ADMIN";
    };
  }

  interface User {
    role: "CUSTOMER" | "ADMIN";
  }
}
