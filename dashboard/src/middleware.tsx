import { NextResponse, type NextRequest } from 'next/server';
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (
    path.split('/')[1] !== 'authentication' &&
    !request.cookies.has('token')
  ) {
    return NextResponse.redirect(new URL('/authentication/login', request.url));
  }

  if (path.split('/')[1] === 'authentication' && request.cookies.has('token')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: [
    '/',
    '/authentication/login',
    '/dashboard/:path*',
    '/departments/:path*',
    '/patients/:path*',
    '/services/:path*',
    '/staffs/:path*',
  ],
};
