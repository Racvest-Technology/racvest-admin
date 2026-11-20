import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIES } from "@/config/constants";

/**
 * Unauthenticated public routes that do not require an active admin session
 */
const PUBLIC_PATHS = ["/login", "/forgot-password", "/invite/accept"];

/**
 * Auth-only routes that authenticated admins should be redirected away from
 */
const AUTH_ONLY_PATHS = ["/login", "/forgot-password"];

function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

/**
 * Next.js 16 Proxy (replaces deprecated middleware.ts)
 * Enforces authentication across all admin portal routes.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const accessToken = request.cookies.get(AUTH_COOKIES.accessToken)?.value;
  const isAuthenticated = Boolean(accessToken && accessToken.trim().length > 0);
  const isPublicPath = matchesRoute(pathname, PUBLIC_PATHS);
  const isAuthOnlyPath = matchesRoute(pathname, AUTH_ONLY_PATHS);

  // 1. Unauthenticated visitor attempting to access any protected platform route
  if (!isAuthenticated && !isPublicPath) {
    const loginUrl = new URL("/login", request.url);
    const fullPath = `${pathname}${search}`;
    if (fullPath && fullPath !== "/") {
      loginUrl.searchParams.set("callbackUrl", fullPath);
    }
    return NextResponse.redirect(loginUrl);
  }

  // 2. Authenticated admin visiting /login or /forgot-password -> redirect to dashboard
  if (isAuthenticated && isAuthOnlyPath) {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
    const targetPath =
      callbackUrl &&
      callbackUrl.startsWith("/") &&
      !matchesRoute(callbackUrl, AUTH_ONLY_PATHS)
        ? callbackUrl
        : "/";
    return NextResponse.redirect(new URL(targetPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (Route Handlers)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - .well-known (Chrome DevTools, Apple/Android app associations, etc.)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public assets (.svg, .png, .jpg, .jpeg, .webp, .gif, .ico, .json)
     */
    "/((?!api|_next/static|_next/image|\\.well-known|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico|json)$).*)",
  ],
};
