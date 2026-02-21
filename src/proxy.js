import { NextResponse } from "next/server"

export function proxy(request) {
  const token = request.cookies.get("admin_token")?.value
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next()
  }

  if (!token && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}
