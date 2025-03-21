import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { DEFAULT_REDIRECT, PUBLIC_ROUTES } from "@/lib/route";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  if (isAuthenticated && isPublicRoute && nextUrl.pathname !== "/") {
    return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
  }

  return; // ✅ Gantilah `null` dengan `undefined` secara implisit
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
