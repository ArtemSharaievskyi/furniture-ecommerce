import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((request) => {
  const pathname = request.nextUrl.pathname;
  const isAuthenticated = !!request.auth?.user;
  const isAdmin = request.auth?.user?.role === "ADMIN";
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isAccountRoute = pathname.startsWith("/account");
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAuthPage && isAuthenticated) {
    const redirectTo = isAdmin ? "/admin" : "/account";

    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  if (!isAuthenticated && (isAccountRoute || isAdminRoute)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/register", "/account/:path*", "/admin/:path*"],
};
