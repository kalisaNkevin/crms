import { TOKEN_NAME } from "@lib/constants";
import { routes } from "@lib/routes";
import { auth } from "@lib/links";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // get cookie token
  const token = req.cookies.get(TOKEN_NAME);
  const isTokenValid = token && token.value !== "undefined";

  // // protected routes (admin routes)
  if (req.nextUrl.pathname.startsWith("/home")) {
    if (isTokenValid) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`${auth.login.url}?redirectTo=${req.nextUrl.pathname}`, req.url)
      );
    }
  }

  // login & register routes
  if ([auth.login.url].includes(req.nextUrl.pathname)) {
    if (isTokenValid) {
      return NextResponse.redirect(new URL(routes.overview.url, req.url));
    } else {
      return NextResponse.next();
    }
  }
}
