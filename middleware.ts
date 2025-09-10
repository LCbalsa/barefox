// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { cookies, nextUrl } = req;

  // Get the token from cookie
  const token = cookies.get("sb_access_token")?.value;

  // If user is not logged in and tries to access /checkout, redirect to /login
  if (!token && nextUrl.pathname.startsWith("/checkout")) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow access
  return NextResponse.next();
}

// Apply middleware only to /checkout (and subpaths)
export const config = {
  matcher: ["/checkout/:path*"],
};
