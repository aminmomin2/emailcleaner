/**
 * Next.js Middleware for EmailCleaner
 * 
 * This middleware provides route protection and authentication checks
 * for the EmailCleaner application. It ensures that users are authenticated
 * before accessing protected routes and handles session token validation.
 * 
 * Features:
 * - Route protection for authenticated users
 * - Session token validation
 * - Automatic redirect to sign-in page
 * - Exclusion of public routes and assets
 * 
 * @author Amin Momin
 * @version 1.0.0
 */

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Middleware function for route protection
 * 
 * Checks for valid session tokens and redirects unauthenticated users
 * to the sign-in page. Skips middleware for public routes and assets.
 * 
 * @param {NextRequest} request - The incoming request object
 * @returns {NextResponse} Response object with appropriate redirect or continuation
 */
export function middleware(request: NextRequest) {
  // Skip middleware for auth pages, API routes, and static assets
  if (
    request.nextUrl.pathname.startsWith('/auth') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check for session token in cookies (supports both NextAuth v4 and v5)
  const sessionToken = request.cookies.get('authjs.session-token')?.value ||
                      request.cookies.get('__Secure-authjs.session-token')?.value ||
                      request.cookies.get('next-auth.session-token')?.value ||
                      request.cookies.get('__Secure-next-auth.session-token')?.value

  // Redirect to sign-in page if no valid session token is found
  if (!sessionToken) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth (authentication pages)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|auth).*)',
  ],
} 