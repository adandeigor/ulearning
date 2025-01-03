// middleware.ts
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req:NextApiRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Vérifie si l'utilisateur est connecté
  if (!token) {
    // Redirige vers la page de connexion
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  // Laisse passer si authentifié
  return NextResponse.next();
}

// Appliquer le middleware uniquement aux routes du dashboard
export const config = {
  matcher: ['/dashboard/:path*'], // Cela inclut `/dashboard` et toutes ses sous-routes
};
