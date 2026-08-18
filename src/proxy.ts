import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/dashboard")) {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    
    if (!session) {
      const signInUrl = new URL("/auth/card/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/dashboard/:path*"],
};
