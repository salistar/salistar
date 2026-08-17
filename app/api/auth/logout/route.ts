import { NextResponse } from 'next/server';
import { NOM_COOKIE, optionsCookie } from '../../../lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  const reponse = NextResponse.json({ ok: true });
  // `maxAge: 0` plutot que `delete` : on reecrit le cookie avec les MEMES
  // options (path, secure, sameSite). Un cookie supprime avec des options
  // differentes de celles de sa creation survit tranquillement dans le
  // navigateur.
  reponse.cookies.set(NOM_COOKIE, '', { ...optionsCookie, maxAge: 0 });
  return reponse;
}
