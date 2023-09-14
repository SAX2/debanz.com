import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    if (req.nextUrl.pathname === "/password") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return res;
  }

  if (
    !user &&
    (req.nextUrl.pathname == "/" ||
      req.nextUrl.pathname.includes("productos") ||
      req.nextUrl.pathname == "/contacto" ||
      req.nextUrl.pathname == "/devoluciones-cambios" ||
      req.nextUrl.pathname == "/envios")
  ) {
    return NextResponse.redirect(new URL("/password", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/password",
    "/productos/:path*",
    "/contacto",
    "/devoluciones-cambios",
    "/envios"
  ],
};