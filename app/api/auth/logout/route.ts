// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set({
    name: "sb_access_token",
    value: "",
    maxAge: 0,
    path: "/",
  });
  return response;
}
