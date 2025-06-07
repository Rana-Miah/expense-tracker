// middleware.ts (protects routes)
import { NextResponse, NextRequest } from 'next/server';
import { AUTH_ROUTES, PUBLIC_ROUTES, REDIRECT_TO } from './constant';
// import { cookies } from 'next/headers';
import { deleteCookie, getJWTSecret, tryCatch } from './lib/helpers';
import { JWTExpired } from 'jose/errors';
import { jwtVerify } from 'jose';
import { TOKEN_KEY } from './constant/token-constant';

export async function middleware(req: NextRequest) {
  const { url, nextUrl, cookies } = req
  const pathname = nextUrl.pathname;
  const isMemberRoute = /^\/[^\/]+\/member(\/[^\/]*)*/.test(pathname);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)
  const isAuthRoute = AUTH_ROUTES.includes(pathname)

  let memberRoute = ""
  if (isMemberRoute) {
    const [familyId, member] = pathname.split('/').filter(Boolean)
    memberRoute = `/${familyId}/${member}`
  }

  // Skip middleware for public routes
  if (isPublicRoute || pathname.startsWith('/_next/static/chunks/')) {
    return NextResponse.next()

  }
  const familyCookie = cookies.get(TOKEN_KEY.FAMILY_ACCESS_TOKEN)
  const memberCookie = cookies.get(TOKEN_KEY.FAMILY_MEMBER_ACCESS_TOKEN)

  if (!familyCookie && !isAuthRoute) return NextResponse.redirect(new URL(REDIRECT_TO.LOGIN_PAGE, url));
  if (!familyCookie) {
    await deleteCookie(TOKEN_KEY.FAMILY_MEMBER_ACCESS_TOKEN)
    return NextResponse.next();
  }
  const familyToken = familyCookie.value


  // Verify family token
  const { data: familyPayload, error: familyTokenError } = await tryCatch(
    jwtVerify(familyToken, getJWTSecret(process.env.AUTH_SECRET!))
  );

  if (familyTokenError instanceof JWTExpired || !familyPayload?.payload?.email) {
    await deleteCookie(TOKEN_KEY.FAMILY_ACCESS_TOKEN);
    await deleteCookie(TOKEN_KEY.FAMILY_MEMBER_ACCESS_TOKEN)
    if (!isAuthRoute && !isPublicRoute) {
      return NextResponse.redirect(new URL(REDIRECT_TO.LOGIN_PAGE, req.url));
    }
    return NextResponse.next();
  }
  if (familyToken && isAuthRoute) return NextResponse.redirect(new URL(REDIRECT_TO.DASHBOARD, url));

  //until here all good


  if (familyToken && isMemberRoute && pathname.startsWith(memberRoute)) {

    const memberCookie = cookies.get(TOKEN_KEY.FAMILY_MEMBER_ACCESS_TOKEN)
    if (!memberCookie) return NextResponse.redirect(new URL(REDIRECT_TO.HOME, url))

    const memberToken = memberCookie.value

    const { data, error } = await tryCatch(jwtVerify(memberToken, getJWTSecret(process.env.AUTH_SECRET!)))

    //verify member token
    if (error instanceof JWTExpired || !data?.payload?.email) {
      await deleteCookie(TOKEN_KEY.FAMILY_MEMBER_ACCESS_TOKEN);
      if (!isAuthRoute && !isPublicRoute) {
        return NextResponse.redirect(new URL(REDIRECT_TO.HOME, req.url));
      }
      return NextResponse.next();
    }
    if (memberToken && isAuthRoute) return NextResponse.redirect(new URL(REDIRECT_TO.HOME, url));
  }

  return NextResponse.next()
}


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}