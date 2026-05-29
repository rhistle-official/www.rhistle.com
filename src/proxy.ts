import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.endsWith("/solutions"))
    return NextResponse.redirect(new URL("/solutions/corecode", request.url));

  if (pathname.endsWith("/solutions/nexumm/lx"))
    return NextResponse.redirect(
      new URL(pathname.replace("/solutions/nexumm/lx", "/solutions/lx"), request.url),
      301,
    );

  if (pathname.endsWith("/solutions/nexumm/vx"))
    return NextResponse.redirect(
      new URL(pathname.replace("/solutions/nexumm/vx", "/solutions/vx"), request.url),
      301,
    );

  if (pathname.endsWith("/solutions/nexumm"))
    return NextResponse.redirect(
      new URL(pathname.replace("/solutions/nexumm", "/solutions/lx"), request.url),
      301,
    );

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
