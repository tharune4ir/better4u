import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard /inner sub-routes (not /inner itself, which is the unlock page)
  if (pathname === "/inner" || pathname === "/inner/") {
    return NextResponse.next();
  }

  // Check for inner_session cookie
  const session = request.cookies.get("inner_session");

  if (!session || session.value !== "authenticated") {
    // Redirect to the inner unlock page
    const url = request.nextUrl.clone();
    url.pathname = "/inner";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/inner/:path*"],
};
