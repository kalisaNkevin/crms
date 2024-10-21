import { TOKEN_NAME } from "@lib/constants";
import { routes } from "@lib/routes";
import { auth } from "@lib/links";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get(TOKEN_NAME);
  const isTokenValid = token && token.value !== "undefined";

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (isTokenValid) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `${auth.login.url}?redirectTo=${req.nextUrl.pathname}`,
          req.url,
        ),
      );
    }
  }

  if ([auth.login.url].includes(req.nextUrl.pathname)) {
    if (isTokenValid) {
      return NextResponse.redirect(new URL(routes.overview.url, req.url));
    } else {
      return NextResponse.next();
    }
  }
}
