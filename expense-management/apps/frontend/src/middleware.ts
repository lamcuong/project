import { NextFetchEvent, NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const authMiddleware = await withAuth(
    function middleware(req) {
      const path = req.nextUrl.pathname
      const cookie = req.cookies.get('Authorization')

      if (!cookie && req.nextauth.token?.accessToken) {
        const response = NextResponse.next()
        response.cookies.set({
          name: 'Authorization',
          value: `${req.nextauth.token?.accessToken}`
        })

        return response
      }
      if (cookie && path === '/auth') {
        return NextResponse.redirect(new URL('/', req.nextUrl))
      }
      if (!cookie && path !== '/auth') {
        return NextResponse.redirect(new URL('/auth', req.nextUrl))
      }
      if (cookie && path !== '/auth') {
      }
    },
    {
      callbacks: {
        authorized: () => {
          return true
        }
      }

      // pages: {
      //   signIn: '/auth',
      // },
    }
  )
  return authMiddleware(req as NextRequestWithAuth, event)
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
    // '/test',
  ]
}

import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
