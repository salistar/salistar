import { NextResponse } from 'next/server';
import { creerJeton, motDePasseValide, NOM_COOKIE, optionsCookie } from '../../../lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Freinage des tentatives, par adresse IP. En memoire du processus : le
// conteneur est unique, et un redemarrage remet le compteur a zero — ce qui est
// acceptable ici. Sans ce frein, un mot de passe unique se teste au rythme du
// reseau, et scrypt cote serveur ne protege que le stockage, pas la porte.
const tentatives = new Map<string, { compte: number; jusqua: number }>();
const MAX_TENTATIVES = 5;
const BLOCAGE_MS = 10 * 60 * 1000;

function ip(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  return (xff ? xff.split(',')[0] : '').trim() || 'inconnue';
}

export async function POST(req: Request) {
  const cle = ip(req);
  const etat = tentatives.get(cle);
  if (etat && etat.compte >= MAX_TENTATIVES && Date.now() < etat.jusqua) {
    const minutes = Math.ceil((etat.jusqua - Date.now()) / 60000);
    return NextResponse.json(
      { ok: false, error: `Trop de tentatives. Reessaie dans ${minutes} min.` },
      { status: 429 },
    );
  }

  let motDePasse = '';
  try {
    const corps = await req.json();
    motDePasse = String(corps?.password || '');
  } catch {
    return NextResponse.json({ ok: false, error: 'Requete invalide.' }, { status: 400 });
  }

  if (!(await motDePasseValide(motDePasse))) {
    const compte = (etat?.compte || 0) + 1;
    tentatives.set(cle, { compte, jusqua: Date.now() + BLOCAGE_MS });
    // Message volontairement identique quelle que soit la cause (mauvais mot
    // de passe, ou empreinte non configuree cote serveur) : distinguer les deux
    // renseignerait un attaquant sur l'etat de l'installation.
    return NextResponse.json({ ok: false, error: 'Mot de passe incorrect.' }, { status: 401 });
  }

  const jeton = creerJeton();
  if (!jeton) {
    // AUTH_SECRET absent : on ne peut pas signer de session. Echouer bruyamment
    // plutot que de delivrer un cookie infalsifiable... qu'on ne saurait verifier.
    return NextResponse.json(
      { ok: false, error: 'Session non configuree sur le serveur.' },
      { status: 500 },
    );
  }

  tentatives.delete(cle);
  const reponse = NextResponse.json({ ok: true });
  reponse.cookies.set(NOM_COOKIE, jeton, optionsCookie);
  return reponse;
}
