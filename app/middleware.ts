import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { response, user } = await updateSession(request);

  const authRoutes = ["/login", "/signup"];
  const protectedRoutes = ["/dashboard", "/profile", "/settings"];
  const protectedApiRoutes = ["/api/debts", "/api/profile"];

  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isProtectedApi = protectedApiRoutes.some((route) =>
    pathname.startsWith(route),
  );

  /**
   * USER BELUM LOGIN
   */
  if (!user) {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isProtectedApi) {
      return NextResponse.json(
        {
          success: false,
          message: "Silakan login terlebih dahulu",
        },
        { status: 401 },
      );
    }

    return response;
  }

  /**
   * USER SUDAH LOGIN
   */
  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  /**
   * Cegah browser cache halaman protected
   */
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  return response;
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/api/debts/:path*",
    "/api/profile/:path*",
  ],
};
