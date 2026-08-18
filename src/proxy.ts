import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

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
