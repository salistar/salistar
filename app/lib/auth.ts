import { createHmac, randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

/**
 * Authentification du tableau de bord : un seul mot de passe, pas de comptes.
 *
 * LE MOT DE PASSE N'EXISTE NULLE PART DANS CE DEPOT. Le serveur ne connait que
 * son empreinte scrypt, posee dans `DASHBOARD_PASSWORD_HASH`. Meme en lisant
 * tout le code et toutes les variables d'environnement, on ne peut pas
 * remonter au mot de passe — c'est precisement le point.
 *
 * Format de l'empreinte : `scrypt$<sel hex>$<cle hex>`.
 * Pour en generer une : `node scripts/hash-password.mjs`.
 */

const COOKIE = 'salistar_session';
// 7 jours : assez pour ne pas se reconnecter sans cesse, assez court pour
// qu'un cookie oublie sur une machine partagee finisse par expirer.
const DUREE_SESSION_MS = 7 * 24 * 3600 * 1000;

export const NOM_COOKIE = COOKIE;

/** Cree une empreinte scrypt d'un mot de passe (utilise par le script). */
export async function empreinteMotDePasse(motDePasse: string): Promise<string> {
  const sel = randomBytes(16);
  const cle = (await scryptAsync(motDePasse, sel, 32)) as Buffer;
  return `scrypt$${sel.toString('hex')}$${cle.toString('hex')}`;
}

/**
 * Compare un mot de passe a l'empreinte configuree.
 * Renvoie `false` si aucune empreinte n'est configuree : sans elle le tableau
 * de bord reste FERME. Jamais de repli ouvert — un dashboard accessible parce
 * qu'une variable manque est une porte ouverte que personne ne remarque.
 */
export async function motDePasseValide(motDePasse: string): Promise<boolean> {
  const attendu = process.env.DASHBOARD_PASSWORD_HASH;
  if (!attendu || !motDePasse) return false;

  const [algo, selHex, cleHex] = attendu.split('$');
  if (algo !== 'scrypt' || !selHex || !cleHex) return false;

  const cleAttendue = Buffer.from(cleHex, 'hex');
  const cleFournie = (await scryptAsync(
    motDePasse,
    Buffer.from(selHex, 'hex'),
    cleAttendue.length,
  )) as Buffer;

  // Comparaison a temps constant : un `===` fuite la longueur du prefixe
  // commun, ce qui se mesure et se remonte octet par octet.
  return timingSafeEqual(cleFournie, cleAttendue);
}

function secretSignature(): string | null {
  return process.env.AUTH_SECRET || null;
}

/** Jeton de session signe : `<expiration>.<signature>`. */
export function creerJeton(): string | null {
  const secret = secretSignature();
  if (!secret) return null;
  const expiration = Date.now() + DUREE_SESSION_MS;
  const signature = createHmac('sha256', secret).update(String(expiration)).digest('hex');
  return `${expiration}.${signature}`;
}

/**
 * Verifie un jeton. Utilise par le middleware ET par les routes : le
 * middleware seul ne suffit pas, une route appelee directement doit se
 * defendre elle-meme.
 */
export function jetonValide(jeton: string | undefined): boolean {
  const secret = secretSignature();
  if (!secret || !jeton) return false;

  const [expirationTexte, signature] = jeton.split('.');
  if (!expirationTexte || !signature) return false;

  const expiration = Number(expirationTexte);
  if (!Number.isFinite(expiration) || expiration < Date.now()) return false;

  const attendue = createHmac('sha256', secret).update(expirationTexte).digest('hex');
  const a = Buffer.from(signature, 'hex');
  const b = Buffer.from(attendue, 'hex');
  return a.length === b.length && timingSafeEqual(a, b);
}

export const optionsCookie = {
  httpOnly: true,
  sameSite: 'lax' as const,
  // Le site est en HTTPS derriere Caddy ; en dev local (http) le cookie doit
  // rester acceptable, sinon impossible de se connecter pour tester.
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: DUREE_SESSION_MS / 1000,
};
