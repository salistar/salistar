import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Renvoie vers /login toute visite de /dashboard sans session valide.
 *
 * Le middleware tourne sur le runtime Edge : `crypto.createHmac` de Node n'y
 * existe pas. On se contente donc ici de verifier la PRESENCE et la date
 * d'expiration du jeton — la verification de signature, elle, se fait cote
 * Node dans les routes API et dans la page. C'est un aiguillage de confort,
 * pas le controle d'acces : celui-ci vit dans `app/api/messages/route.ts` et
 * dans la page du tableau de bord.
 */
export function middleware(req: NextRequest) {
  const jeton = req.cookies.get('salistar_session')?.value;
  const expiration = Number((jeton || '').split('.')[0]);
  const plausible = Number.isFinite(expiration) && expiration > Date.now();

  if (!plausible) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('suite', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*'] };
