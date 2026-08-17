import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

/**
 * Stockage des messages recus : formulaire de contact du site ET emails
 * envoyes a contact@salistar.com (relayes par l'Email Worker Cloudflare).
 *
 * POURQUOI UN FICHIER ET PAS UNE BASE : ce site est un portfolio statique
 * deploye en conteneur unique, sans base. Brancher le Mongo de la stack Salorie
 * imposerait de relier deux reseaux Docker et de trimballer un identifiant de
 * connexion pour, au mieux, quelques messages par semaine. Un fichier JSON dans
 * un volume tient ce volume-la sans rien ajouter a l'infrastructure.
 *
 * La limite est assumee : ecritures serialisees par une promesse-chaine (le
 * conteneur est mono-instance), et pas de recherche plein texte. Le jour ou le
 * volume de messages le justifie, ce module est le seul a remplacer.
 */

export type Message = {
  id: string;
  source: 'formulaire' | 'email';
  from: string;
  fromName: string;
  subject: string;
  text: string;
  /** Renseigne seulement pour la source `formulaire`. */
  site?: 'salistar.com' | 'salorie.com';
  receivedAt: string;
  read: boolean;
};

// Volume monte en production ; repli local pour `next dev`.
const FICHIER =
  process.env.MESSAGES_FILE || path.join(process.cwd(), '.data', 'messages.json');

// Garde-fou memoire ET disque : au-dela, les plus anciens sortent. Sans
// plafond, un robot qui martele le formulaire ferait grossir le fichier
// jusqu'a saturer le volume — et c'est le genre de panne qu'on decouvre trop tard.
const MAX_MESSAGES = 2000;

/**
 * Toutes les ecritures passent par cette chaine. Deux requetes simultanees
 * feraient sinon un lire-modifier-ecrire concurrent, et la seconde ecraserait
 * la premiere : un message perdu, silencieusement.
 */
let file: Promise<unknown> = Promise.resolve();
function serialise<T>(travail: () => Promise<T>): Promise<T> {
  const suivant = file.then(travail, travail);
  file = suivant.catch(() => {});
  return suivant;
}

async function lireTout(): Promise<Message[]> {
  try {
    const brut = await fs.readFile(FICHIER, 'utf8');
    const data = JSON.parse(brut);
    return Array.isArray(data) ? (data as Message[]) : [];
  } catch {
    // Fichier absent au premier demarrage, ou JSON corrompu : on repart d'une
    // liste vide plutot que de faire tomber la route.
    return [];
  }
}

async function ecrireTout(messages: Message[]): Promise<void> {
  await fs.mkdir(path.dirname(FICHIER), { recursive: true });
  // Ecriture atomique : un conteneur tue au milieu d'un `writeFile` laisserait
  // un JSON tronque, donc illisible — et tous les messages seraient perdus.
  const temporaire = `${FICHIER}.tmp`;
  await fs.writeFile(temporaire, JSON.stringify(messages, null, 2), 'utf8');
  await fs.rename(temporaire, FICHIER);
}

export function listerMessages(): Promise<Message[]> {
  return serialise(lireTout);
}

export function ajouterMessage(
  entree: Omit<Message, 'id' | 'receivedAt' | 'read'>,
): Promise<Message> {
  return serialise(async () => {
    const messages = await lireTout();
    const message: Message = {
      ...entree,
      id: randomUUID(),
      receivedAt: new Date().toISOString(),
      read: false,
    };
    messages.unshift(message);
    await ecrireTout(messages.slice(0, MAX_MESSAGES));
    return message;
  });
}

export function marquerLu(id: string, lu = true): Promise<boolean> {
  return serialise(async () => {
    const messages = await lireTout();
    const cible = messages.find((m) => m.id === id);
    if (!cible) return false;
    cible.read = lu;
    await ecrireTout(messages);
    return true;
  });
}

export function supprimerMessage(id: string): Promise<boolean> {
  return serialise(async () => {
    const messages = await lireTout();
    const restants = messages.filter((m) => m.id !== id);
    if (restants.length === messages.length) return false;
    await ecrireTout(restants);
    return true;
  });
}
