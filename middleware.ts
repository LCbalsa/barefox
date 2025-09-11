// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("sb_access_token")?.value;
  const refreshToken = req.cookies.get("sb_refresh_token")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Supabase client with service role for secure server-side actions
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Validate user token
  const { data: userData, error: userError } = await supabase.auth.getUser(accessToken);

  if (userError || !userData.user) {
    // Attempt to refresh the session if refresh token exists
    if (refreshToken) {
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (refreshError || !refreshData.session) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // Set new secure cookies
      const res = NextResponse.next();
      res.cookies.set("sb_access_token", refreshData.session.access_token, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
      res.cookies.set("sb_refresh_token", refreshData.session.refresh_token, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
      return res;
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }

  // User exists and token is valid
  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/checkout/:path*"],
};
