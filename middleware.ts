import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Clone response untuk modify headers
  const response = NextResponse.next();

  // Set pathname di header untuk diakses di server components
  response.headers.set("x-pathname", request.nextUrl.pathname);

  return response;
}

// Config untuk match semua routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
