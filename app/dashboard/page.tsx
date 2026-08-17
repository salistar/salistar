import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jetonValide, NOM_COOKIE } from '../lib/auth';
import { listerMessages } from '../lib/messages';
import { VueMessages } from './VueMessages';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Messages · salistar' };

/**
 * Tableau de bord des messages.
 *
 * La verification de signature se fait ICI, cote Node — le middleware, sur le
 * runtime Edge, ne peut que regarder la date d'expiration du jeton. Sans ce
 * controle, un cookie fabrique a la main avec une date future suffirait a
 * entrer.
 */
export default async function PageDashboard() {
  const magasin = await cookies();
  if (!jetonValide(magasin.get(NOM_COOKIE)?.value)) redirect('/login?suite=/dashboard');

  const messages = await listerMessages();
  return <VueMessages initiaux={messages} />;
}
