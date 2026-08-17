/**
 * Notification par email des nouveaux messages, via Resend.
 *
 * POURQUOI CE MODULE NE JETTE JAMAIS : un message recu vaut mieux qu'un
 * message perdu. Si Resend est en panne, si la cle manque ou si le domaine
 * n'est pas verifie, le message est deja enregistre cote serveur — echouer ici
 * ferait repondre une erreur au visiteur alors que son message est bien arrive.
 * On journalise, on renvoie `false`, et le tableau de bord reste la source de
 * verite.
 */

type Notification = {
  from: string;
  fromName: string;
  subject: string;
  text: string;
  site: string;
};

export async function notifier(m: Notification): Promise<boolean> {
  const cle = process.env.RESEND_API_KEY;
  const destinataire = process.env.NOTIFY_EMAIL;
  // Expediteur : doit appartenir a un domaine verifie chez Resend, sinon
  // l'envoi est refuse. `onboarding@resend.dev` fonctionne sans verification
  // mais n'ecrit qu'a l'adresse du proprietaire du compte.
  const expediteur = process.env.NOTIFY_FROM || 'Salistar <onboarding@resend.dev>';

  if (!cle || !destinataire) {
    console.warn('[notifier] RESEND_API_KEY ou NOTIFY_EMAIL absente — pas de notification');
    return false;
  }

  const corpsTexte = [
    `Nouveau message depuis ${m.site}`,
    '',
    `De     : ${m.fromName ? `${m.fromName} <${m.from}>` : m.from}`,
    `Sujet  : ${m.subject}`,
    '',
    m.text,
    '',
    '---',
    'Repondre directement a cet email repond a l expediteur.',
  ].join('\n');

  try {
    const reponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${cle}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: expediteur,
        to: [destinataire],
        // Un clic sur « Repondre » ecrit au visiteur, pas a Resend.
        reply_to: m.from,
        subject: `[${m.site}] ${m.subject}`,
        text: corpsTexte,
      }),
      // Sans delai maximal, une API lente bloquerait la reponse au visiteur.
      signal: AbortSignal.timeout(10_000),
    });

    if (!reponse.ok) {
      console.warn(`[notifier] Resend a repondu ${reponse.status}: ${await reponse.text()}`);
      return false;
    }
    return true;
  } catch (e) {
    console.warn('[notifier] envoi impossible:', (e as Error).message);
    return false;
  }
}
