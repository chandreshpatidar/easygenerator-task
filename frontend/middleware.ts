import { NextResponse, type NextRequest } from 'next/server';
import { publicRoutes } from './lib/constants/routes';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get('token')?.value;
  const isPublicRoute = publicRoutes.includes(pathname);

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
