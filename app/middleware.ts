import { NextRequest, NextResponse } from "next/server";

import { updateSession } from "@/lib/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const { response, user } = await updateSession(request);

  const authRoutes = ["/login", "/signup"];

  const protectedRoutes = ["/dashboard"];

  const isAuthRoute = authRoutes.includes(pathname);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isApiDebt = pathname.startsWith("/api/debts");

  // belum login

  if (!user) {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isApiDebt) {
      return NextResponse.json(
        {
          message: "Silakan login terlebih dahulu",
        },
        {
          status: 401,
        },
      );
    }

    return response;
  }

  // sudah login

  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*", "/api/debts/:path*"],
};
