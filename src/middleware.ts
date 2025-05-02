import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const i18nMiddleware = createMiddleware(routing);

// Define which paths require authentication
const protectedPaths = ["/api/users", "/api/transactions", "/dashboard"]

export function middleware(request: NextRequest) {
  // Check if the path is protected
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  )

  // If not a protected path, continue
  if (!isProtectedPath) {
    return i18nMiddleware(request);
  }

  // Retrieve token from cookies
  const token = request.cookies.get("token")?.value

  return i18nMiddleware(request);
}

export const config = {
  matcher: [
    "/api/users/:path*",
    "/api/transactions/:path*",
    "/dashboard/:path*",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)"
  ]
};

