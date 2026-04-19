import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";

import { prisma } from "@/lib/db";

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
