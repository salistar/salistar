// Email Worker Cloudflare — contact@salistar.com
//
// Cloudflare Email Routing recoit le mail, ce Worker le POSTe sur l'API du
// site (stockage + tableau de bord /dashboard), PUIS le transfere sur le Gmail
// du compte. Le transfert a lieu dans TOUS les cas, meme si l'API est
// injoignable : un message de client ne doit jamais etre perdu parce qu'un
// conteneur redemarrait.
//
// LECON DU 14/08/2026 (support@salorie.com) : la premiere version utilisait
// `ctx.waitUntil()` + un `.catch()` muet. Quand l'ingestion a echoue, le
// tableau de bord Cloudflare affichait « 1 Success, 0 Errors » et il n'existait
// aucune trace de la cause — ni cote Worker, ni cote serveur. L'appel est donc
// ATTENDU et son resultat JOURNALISE. Un echec silencieux n'est pas un echec
// qu'on peut corriger.
//
// Variables (Settings > Variables and secrets) :
//   INGEST_URL      = https://salistar.com/api/mail/ingest   (variable)
//   FORWARD_TO      = salistarcompany@gmail.com              (variable)
//   MAIL_INGEST_KEY = secret partage avec le site            (SECRET)

export default {
  async email(message, env) {
    // Le corps n'est lisible qu'UNE fois (c'est un flux). On le met en memoire
    // avant tout : sinon `forward` consomme le flux et l'ingestion recoit du vide.
    let raw = '';
    try {
      raw = await new Response(message.raw).text();
    } catch (e) {
      console.log('salistar-mail: lecture du corps impossible: ' + e);
    }

    console.log(
      'salistar-mail: recu de ' + message.from + ' (' + raw.length + ' octets)' +
        ' | INGEST_URL=' + (env.INGEST_URL ? 'ok' : 'ABSENTE') +
        ' | MAIL_INGEST_KEY=' + (env.MAIL_INGEST_KEY ? 'ok(' + env.MAIL_INGEST_KEY.length + ')' : 'ABSENTE'),
    );

    if (env.INGEST_URL && env.MAIL_INGEST_KEY) {
      try {
        const r = await fetch(env.INGEST_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-mail-key': env.MAIL_INGEST_KEY },
          body: JSON.stringify({ from: message.from, to: message.to, raw }),
        });
        const corps = await r.text();
        console.log('salistar-mail: ingestion HTTP ' + r.status + ' -> ' + corps.slice(0, 300));
      } catch (e) {
        // On journalise et on continue : le transfert reste le filet.
        console.log('salistar-mail: ingestion IMPOSSIBLE: ' + e);
      }
    }

    if (env.FORWARD_TO) {
      await message.forward(env.FORWARD_TO);
      console.log('salistar-mail: transfere vers ' + env.FORWARD_TO);
    }
  },
};
