import { NextRequest, NextResponse } from "next/server";

export default function middleware(
  request: NextRequest,
  response: NextResponse
) {
  const token = request.cookies.get("@token")?.value;

  const signURL = new URL("/sign-in", request.url);
  const defaultURL = new URL("/taskflow/tasks", request.url);

  if (!token) {
    if (
      request.nextUrl.pathname === "/sign-in" ||
      request.nextUrl.pathname === "/sign-up"
    ) {
      return NextResponse.next();
    }

    return NextResponse.redirect(signURL);
  }

  if (
    request.nextUrl.pathname === "/sign-in" ||
    request.nextUrl.pathname === "/sign-up"
  ) {
    return NextResponse.redirect(defaultURL);
  }
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/taskflow/:path*"],
};
