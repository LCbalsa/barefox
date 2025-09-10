// app/api/auth/session/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  // Await cookies() because it's now a dynamic async API
  const cookieStore = await cookies();
  const token = cookieStore.get("sb_access_token")?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }
  
  // Optional: verify token with Supabase here

  return NextResponse.json({ user: { token } });
}
