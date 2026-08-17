import { NextResponse } from 'next/server';
import { ajouterMessage } from '../../lib/messages';
import { notifier } from '../../lib/notifier';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Formulaire public : la seule route de ce site que n'importe qui peut appeler.
// Elle est donc la seule a avoir besoin d'un frein.
const envois = new Map<string, number[]>();
const FENETRE_MS = 60 * 60 * 1000;
const MAX_PAR_HEURE = 5;

function ip(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  return (xff ? xff.split(',')[0] : '').trim() || 'inconnue';
}

// Les sites autorises a poster ici. salorie.com utilise la meme route : un seul
// endroit qui recoit, un seul tableau de bord a consulter.
const SITES = new Set(['salistar.com', 'salorie.com']);

export async function POST(req: Request) {
  const cle = ip(req);
  const maintenant = Date.now();
  const recents = (envois.get(cle) || []).filter((t) => maintenant - t < FENETRE_MS);
  if (recents.length >= MAX_PAR_HEURE) {
    return NextResponse.json(
      { ok: false, error: 'Trop de messages envoyes. Reessaie dans une heure.' },
      { status: 429 },
    );
  }

  let corps: Record<string, unknown>;
  try {
    corps = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Requete invalide.' }, { status: 400 });
  }

  const nom = String(corps.name || '').trim().slice(0, 120);
  const email = String(corps.email || '').trim().slice(0, 200);
  const sujet = String(corps.subject || '').trim().slice(0, 200) || 'Message depuis le site';
  const texte = String(corps.message || '').trim().slice(0, 5000);
  // Champ piege, invisible pour un humain : un robot remplit tout ce qu'il
  // trouve. On repond 200 pour ne pas lui apprendre qu'il a ete repere.
  const piege = String(corps.website || '').trim();

  if (piege) return NextResponse.json({ ok: true });

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Adresse email invalide.' }, { status: 400 });
  }
  if (texte.length < 10) {
    return NextResponse.json(
      { ok: false, error: 'Message trop court (10 caracteres minimum).' },
      { status: 400 },
    );
  }

  const siteBrut = String(corps.site || 'salistar.com');
  const site = (SITES.has(siteBrut) ? siteBrut : 'salistar.com') as 'salistar.com' | 'salorie.com';

  // Enregistrer AVANT de notifier : si Resend echoue, le message existe quand
  // meme. L'inverse perdrait des messages les jours de panne.
  await ajouterMessage({
    source: 'formulaire',
    from: email,
    fromName: nom,
    subject: sujet,
    text: texte,
    site,
  });

  envois.set(cle, [...recents, maintenant]);

  const notifie = await notifier({ from: email, fromName: nom, subject: sujet, text: texte, site });

  // `notifie: false` n'est pas une erreur pour le visiteur : son message est
  // enregistre. L'information sert au diagnostic, pas a l'affichage.
  return NextResponse.json({ ok: true, notifie });
}
