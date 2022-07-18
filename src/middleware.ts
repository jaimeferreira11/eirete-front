import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { routes } from '@lib/routes';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  //   const session = await getSession({ req });

  // const p = req.url;

  if (session) {
    return NextResponse.next();
  }
  const loginUrl = new URL('/auth/login', req.url);
  loginUrl.searchParams.set('p', req.nextUrl.pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [...routes],
};
