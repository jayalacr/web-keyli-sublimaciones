import { NextResponse, type NextRequest } from "next/server";

// ponytail: HTTP Basic Auth compartido, sin usuarios individuales — subir a Supabase Auth cuando haya cuentas reales
export function proxy(request: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;

  if (!user || !pass) {
    return new NextResponse("Panel de administración no configurado: falta ADMIN_USER / ADMIN_PASSWORD", { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Basic ")) {
    const [reqUser, reqPass] = atob(authHeader.slice(6)).split(":");
    if (reqUser === user && reqPass === pass) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Autenticación requerida", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin Keyli"' },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
