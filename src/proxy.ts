import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Authentication-only middleware — checks for a session cookie and redirects
 * unauthenticated requests on protected routes.
 *
 * IMPORTANT: This is a UX fast-path, NOT the authorization boundary.
 * The real enforcement happens in src/server/dal.ts inside every
 * Server Action and Route Handler via requireSession() / requirePermission().
 *
 * Cookie name: "better-auth.session_token"
 * Verify this matches your Better Auth version — run the app and check
 * Application → Cookies in DevTools if you upgrade the library.
 */
export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. Authentication Proxy for Dashboard
  if (path.startsWith("/dashboard")) {
    const sessionCookie = request.cookies.get("better-auth.session_token");
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/auth/card/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
