import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { CookieOptions } from '@supabase/ssr'

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/api/health',
  '/admin/login',
  '/unauthorized',
  '/api/auth/callback',
  '/api/auth/signin',
  '/api/auth/signout',
]

// Define admin routes that require admin privileges
const adminRoutes = [
  '/admin',
  '/admin/dashboard',
  '/admin/menu-items',
  '/admin/categories',
  '/admin/recipes',
  '/api/admin',
]

// Check if the current path starts with any of the admin routes
const isAdminRoute = (pathname: string) => {
  return adminRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const { pathname } = request.nextUrl

  // Skip middleware for public routes
  if (
    publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(route)
    )
  ) {
    return response
  }

  // Skip middleware for static files
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.includes('.')
  ) {
    return response
  }

  try {
    // Create a response that will be used to set cookies
    const response = NextResponse.next()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            // Map Supabase cookie options to Next.js cookie options
            const cookieOptions = {
              path: options.path,
              domain: options.domain,
              maxAge: options.maxAge,
              httpOnly: options.httpOnly,
              secure: options.secure,
              sameSite: options.sameSite as
                | 'lax'
                | 'strict'
                | 'none'
                | undefined,
            }

            // Set the cookie in the response with the correct property names
            response.cookies.set({
              name,
              value,
              path: cookieOptions.path,
              domain: cookieOptions.domain,
              maxAge: cookieOptions.maxAge,
              httpOnly: cookieOptions.httpOnly,
              secure: cookieOptions.secure,
              sameSite: cookieOptions.sameSite,
            })
          },
          remove(
            name: string,
            options: Pick<CookieOptions, 'path' | 'domain'>
          ) {
            // Remove the cookie in the response
            response.cookies.set({
              name,
              value: '',
              path: options.path,
              domain: options.domain,
              maxAge: 0,
              expires: new Date(0),
            })
          },
        },
      }
    )

    // Get the user's session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      console.error('Session error:', sessionError)
      throw new Error('Failed to get session')
    }

    // Handle unauthenticated users
    if (!session) {
      // Store the current URL for redirecting back after login
      const redirectUrl = new URL('/admin/login', request.url)
      redirectUrl.searchParams.set('redirectedFrom', pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Check for admin access
    if (isAdminRoute(pathname)) {
      const isAdmin = session.user.email === 'admin@example.com' // In a real app, check user role from the database

      if (!isAdmin) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
      }
    }

    // Add user info to the request headers for API routes
    if (pathname.startsWith('/api/')) {
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('x-user-id', session.user.id)
      requestHeaders.set('x-user-email', session.user.email || '')

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)

    if (pathname.startsWith('/api/')) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: {
            message: 'Internal server error',
            code: '500',
          },
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // For non-API routes, redirect to error page
    const errorUrl = new URL('/error', request.url)
    errorUrl.searchParams.set('message', 'An unexpected error occurred')
    return NextResponse.redirect(errorUrl)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api/auth (auth routes are handled by Supabase)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$|api/auth).*)',
  ],
}
