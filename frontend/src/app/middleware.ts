import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token"); // Read cookie
  const url = req.nextUrl.clone();
  url.hostname = "127.0.0.1";
  url.port = "5000";

  const res = NextResponse.rewrite(url);

  if (token) {
    // Inject as header for Flask
    res.headers.set("X-Admin-Token", token.value);
  }

  return res;
}