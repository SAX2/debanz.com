import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  /*
    The application uses authentication middleware 
    so that in cases where the store wants to be closed
    and work in it, you can create a password 
    with which you can enter or carry out 
    marketing campaigns with passwords for the public. 
    This uses the supabase authentication function.
  */
  // Read the docs to configure supabase auth
  
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  //Web open: status == true; close: status == false;
  const status = false;

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
    if (!status) return res;
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