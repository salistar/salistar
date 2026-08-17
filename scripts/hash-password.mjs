#!/usr/bin/env node
/**
 * Genere l'empreinte scrypt a poser dans DASHBOARD_PASSWORD_HASH.
 *
 *   node scripts/hash-password.mjs
 *
 * Le mot de passe est demande a l'invite, JAMAIS passe en argument : un
 * argument de ligne de commande finit dans l'historique du shell et reste
 * visible dans la liste des processus le temps de l'execution.
 *
 * L'empreinte affichee n'est pas un secret au sens strict — on ne peut pas en
 * deduire le mot de passe — mais elle permet une attaque par dictionnaire hors
 * ligne : on la traite donc comme un secret et on la pose en variable
 * d'environnement, pas dans le depot.
 */
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { createInterface } from 'readline';

const scryptAsync = promisify(scrypt);

function demander(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  // Masque la frappe : sans ca le mot de passe reste affiche a l'ecran, et
  // dans le scrollback du terminal bien apres.
  const muet = () => {};
  rl.output.write(question);
  rl._writeToOutput = muet;
  return new Promise((resolve) => {
    rl.question('', (reponse) => {
      rl.close();
      process.stdout.write('\n');
      resolve(reponse);
    });
  });
}

const motDePasse = await demander('Mot de passe du tableau de bord : ');
if (!motDePasse) {
  console.error('Aucun mot de passe saisi.');
  process.exit(1);
}
if (motDePasse.length < 10) {
  console.error('Trop court : 10 caracteres minimum.');
  process.exit(1);
}

const sel = randomBytes(16);
const cle = await scryptAsync(motDePasse, sel, 32);
const empreinte = `scrypt$${sel.toString('hex')}$${cle.toString('hex')}`;

console.log('\nDASHBOARD_PASSWORD_HASH =');
console.log(empreinte);
console.log('\nA poser en secret GitHub et dans l environnement du conteneur.');
console.log('Ne PAS committer cette valeur.\n');
