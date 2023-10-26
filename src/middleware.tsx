/* istanbul ignore file */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const HEADER_NAME = "x-next-locale";

export function middleware(request: NextRequest) {
  console.log("middleware is running");
  const url = new URL(request.url);
  const pathName = url.pathname;
  const requestHeaders = new Headers(request.headers);

  let response;
  const needsRewrite = !url.pathname.startsWith("/en");

  if (needsRewrite) {
    url.pathname = `/en${url.pathname}`;
    response = NextResponse.redirect(url.href);
  } else {
    response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  response.headers.set(HEADER_NAME, "en");
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|en\\/?).*)"],
};
