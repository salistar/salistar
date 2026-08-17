/**
 * Extraction des champs utiles d'un email brut (MIME).
 *
 * POURQUOI PAS `mailparser` : il tire une dizaine de dependances transitives
 * dans une image Docker qui n'en a aujourd'hui que quatre, pour un besoin qui
 * se limite a afficher expediteur / sujet / texte dans un tableau de bord.
 * Ce module couvre ce cas ; il ne pretend pas parser tout le MIME.
 *
 * Ce qui est gere : en-tetes replies sur plusieurs lignes, encodage RFC 2047
 * des sujets accentues, corps en quoted-printable ou base64, choix de la
 * partie `text/plain` dans un message multipart.
 * Ce qui ne l'est pas : pieces jointes, multipart imbrique, HTML converti en
 * texte. Le MIME complet reste stocke a cote si besoin d'y revenir.
 */

export type EmailParse = {
  from: string;
  fromName: string;
  subject: string;
  text: string;
};

/** Deplie les en-tetes : une valeur peut continuer sur les lignes suivantes indentees. */
function enTetes(brut: string): Map<string, string> {
  const finEntetes = brut.search(/\r?\n\r?\n/);
  const bloc = finEntetes === -1 ? brut : brut.slice(0, finEntetes);
  const lignes = bloc.split(/\r?\n/);
  const map = new Map<string, string>();

  let courant = '';
  for (const ligne of lignes) {
    if (/^\s/.test(ligne) && courant) {
      map.set(courant, `${map.get(courant) || ''} ${ligne.trim()}`);
      continue;
    }
    const sep = ligne.indexOf(':');
    if (sep === -1) continue;
    courant = ligne.slice(0, sep).trim().toLowerCase();
    map.set(courant, ligne.slice(sep + 1).trim());
  }
  return map;
}

/** Decode les mots encodes RFC 2047 (`=?UTF-8?B?...?=`) — les sujets accentues. */
function decoderMotsEncodes(valeur: string): string {
  return valeur.replace(
    /=\?([^?]+)\?([BbQq])\?([^?]*)\?=/g,
    (_tout, charset: string, type: string, donnees: string) => {
      try {
        if (type.toUpperCase() === 'B') {
          return Buffer.from(donnees, 'base64').toString(
            (charset.toLowerCase() as BufferEncoding) === 'utf-8' ? 'utf8' : 'utf8',
          );
        }
        // Quoted-printable : `_` vaut espace dans les mots encodes.
        const texte = donnees.replace(/_/g, ' ').replace(/=([0-9A-Fa-f]{2})/g, (_m, h) =>
          String.fromCharCode(parseInt(h, 16)),
        );
        return Buffer.from(texte, 'binary').toString('utf8');
      } catch {
        return donnees;
      }
    },
  );
}

function decoderQuotedPrintable(corps: string): string {
  return corps
    // Les `=` en fin de ligne sont des coupures logicielles, pas des donnees.
    .replace(/=\r?\n/g, '')
    .replace(/=([0-9A-Fa-f]{2})/g, (_m, h) => String.fromCharCode(parseInt(h, 16)));
}

/** Isole la premiere partie text/plain d'un corps multipart. */
function partieTexte(corps: string, frontiere: string): { contenu: string; encodage: string } {
  const parties = corps.split(`--${frontiere}`);
  for (const partie of parties) {
    const separation = partie.search(/\r?\n\r?\n/);
    if (separation === -1) continue;
    const tete = partie.slice(0, separation).toLowerCase();
    if (!tete.includes('text/plain')) continue;
    const encodage = (tete.match(/content-transfer-encoding:\s*([\w-]+)/) || [])[1] || '7bit';
    return { contenu: partie.slice(separation).replace(/^\r?\n\r?\n/, ''), encodage };
  }
  return { contenu: '', encodage: '7bit' };
}

export function parserEmail(brut: string): EmailParse {
  const tetes = enTetes(brut);

  const deBrut = decoderMotsEncodes(tetes.get('from') || '');
  // `Nom <adresse@exemple.fr>` ou juste `adresse@exemple.fr`.
  const avecNom = deBrut.match(/^\s*"?([^"<]*?)"?\s*<([^>]+)>\s*$/);
  const from = (avecNom ? avecNom[2] : deBrut).trim();
  const fromName = (avecNom ? avecNom[1] : '').trim();

  const subject = decoderMotsEncodes(tetes.get('subject') || '').trim() || '(sans sujet)';

  const typeContenu = (tetes.get('content-type') || '').toLowerCase();
  const separation = brut.search(/\r?\n\r?\n/);
  const corpsBrut = separation === -1 ? '' : brut.slice(separation).replace(/^\r?\n\r?\n/, '');

  let contenu = corpsBrut;
  let encodage = (tetes.get('content-transfer-encoding') || '7bit').toLowerCase();

  const frontiere = (typeContenu.match(/boundary="?([^";]+)"?/) || [])[1];
  if (frontiere) {
    const partie = partieTexte(corpsBrut, frontiere);
    if (partie.contenu) {
      contenu = partie.contenu;
      encodage = partie.encodage.toLowerCase();
    }
  }

  if (encodage === 'base64') {
    try {
      contenu = Buffer.from(contenu.replace(/\s/g, ''), 'base64').toString('utf8');
    } catch {
      /* on garde le brut : illisible vaut mieux que vide */
    }
  } else if (encodage === 'quoted-printable') {
    contenu = decoderQuotedPrintable(contenu);
  }

  return { from, fromName, subject, text: contenu.trim().slice(0, 20000) };
}
