// app/api/auth/callback/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { access_token } = await req.json();

  if (!access_token) {
    return NextResponse.json({ error: "No access token" }, { status: 400 });
  }

  const response = NextResponse.json({ message: "Logged in" });

  // Set HTTP-only cookie
  response.cookies.set({
    name: "sb_access_token",
    value: access_token,
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
