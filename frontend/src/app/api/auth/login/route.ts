import { NextResponse } from "next/server";

const api_url = process.env.API_URL!;

export async function POST(req: Request) {
  const credentials = await req.json();

  // Call your real backend
  const login = await fetch(`${api_url}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!login.ok) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const { data } = await login.json();

  const res = NextResponse.json({ success: true });

  res.cookies.set({
    name: "admin_token",
    value: data.token,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 2,
  });

  return res;
}
