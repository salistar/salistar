import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jetonValide, NOM_COOKIE } from '../../lib/auth';
import { listerMessages, marquerLu, supprimerMessage } from '../../lib/messages';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Lecture et gestion des messages, reservees au tableau de bord.
 *
 * Le middleware protege deja /dashboard, mais il ne suffit PAS : ces routes
 * sont joignables directement, sans passer par la page. Une API qui compte sur
 * la protection d'une page voisine est une API ouverte.
 */
async function autorise(): Promise<boolean> {
  const magasin = await cookies();
  return jetonValide(magasin.get(NOM_COOKIE)?.value);
}

export async function GET() {
  if (!(await autorise())) {
    return NextResponse.json({ ok: false, error: 'non autorise' }, { status: 401 });
  }
  return NextResponse.json({ ok: true, messages: await listerMessages() });
}

export async function PATCH(req: Request) {
  if (!(await autorise())) {
    return NextResponse.json({ ok: false, error: 'non autorise' }, { status: 401 });
  }
  const { id, read } = await req.json().catch(() => ({}) as Record<string, unknown>);
  if (!id) return NextResponse.json({ ok: false, error: 'id manquant' }, { status: 400 });
  const trouve = await marquerLu(String(id), read !== false);
  return NextResponse.json({ ok: trouve }, { status: trouve ? 200 : 404 });
}

export async function DELETE(req: Request) {
  if (!(await autorise())) {
    return NextResponse.json({ ok: false, error: 'non autorise' }, { status: 401 });
  }
  const { id } = await req.json().catch(() => ({}) as Record<string, unknown>);
  if (!id) return NextResponse.json({ ok: false, error: 'id manquant' }, { status: 400 });
  const trouve = await supprimerMessage(String(id));
  return NextResponse.json({ ok: trouve }, { status: trouve ? 200 : 404 });
}
