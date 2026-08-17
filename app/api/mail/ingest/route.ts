import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { ajouterMessage } from '../../../lib/messages';
import { parserEmail } from '../../../lib/mime';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Reception des emails envoyes a contact@salistar.com.
 *
 * Cloudflare Email Routing recoit le mail, un Email Worker POSTe ici le MIME
 * brut avec la cle partagee MAIL_INGEST_KEY. Meme montage que
 * support@salorie.com, a une lecon pres : la, l'echec du Worker etait
 * silencieux (`ctx.waitUntil` + `.catch` vide) et un mail a disparu sans que
 * rien nulle part ne le signale. Ici, chaque refus est journalise.
 *
 * Sans MAIL_INGEST_KEY configuree, la route est FERMEE. Jamais de repli
 * ouvert : un endpoint d'ingestion accessible a tous, c'est un tableau de bord
 * que n'importe qui remplit.
 */

function clesEgales(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export async function POST(req: Request) {
  const attendue = process.env.MAIL_INGEST_KEY;
  const recue = req.headers.get('x-mail-key') || '';

  if (!attendue || !clesEgales(recue, attendue)) {
    console.warn(
      `[ingest] REFUSE — cle recue ${recue ? `de ${recue.length} caracteres` : 'absente'}, ` +
        `attendue ${attendue ? 'configuree' : 'ABSENTE cote serveur'}`,
    );
    return NextResponse.json({ ok: false, error: 'cle invalide' }, { status: 403 });
  }

  let brut = '';
  let deEnveloppe = '';
  try {
    const corps = await req.json();
    brut = String(corps?.raw || '');
    deEnveloppe = String(corps?.from || '');
  } catch {
    return NextResponse.json({ ok: false, error: 'corps invalide' }, { status: 400 });
  }

  if (!brut) {
    return NextResponse.json({ ok: false, error: 'raw manquant' }, { status: 400 });
  }

  const analyse = parserEmail(brut);
  // L'expediteur d'enveloppe fourni par Cloudflare fait foi si l'en-tete From
  // est absent ou illisible.
  const from = analyse.from || deEnveloppe || 'inconnu';

  const message = await ajouterMessage({
    source: 'email',
    from,
    fromName: analyse.fromName,
    subject: analyse.subject,
    text: analyse.text,
  });

  console.log(`[ingest] ACCEPTE de=${from} sujet="${analyse.subject}" taille=${brut.length}`);
  return NextResponse.json({ ok: true, id: message.id });
}
