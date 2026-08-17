# Messages reçus — salistar.com

Formulaire de contact des **deux** sites (salistar.com et salorie.com) et emails
envoyés à **contact@salistar.com**, réunis dans un seul tableau de bord :
`https://salistar.com/dashboard`.

## Comment ça circule

```
Formulaire salistar.com ─┐
                         ├─→ POST /api/contact ─┬─→ /data/messages.json ─→ /dashboard
Formulaire salorie.com ──┘   (relais serveur)   └─→ Resend ─→ Gmail

contact@salistar.com ─→ Cloudflare Email Routing ─→ Email Worker ─┬─→ POST /api/mail/ingest ─→ /dashboard
                                                                  └─→ forward ─→ Gmail
```

Deux chemins, une seule destination. Le formulaire de salorie.com passe par un
**relais serveur** (`salorie-landing/app/api/contact/route.ts`) plutôt que par un
appel direct depuis le navigateur : pas de CORS à maintenir des deux côtés, et
rien qui casse le jour où un navigateur durcit sa politique.

## Variables d'environnement

Toutes posées en **secrets GitHub** ; le workflow de déploiement écrit le `.env`
du serveur à partir d'eux, à chaque déploiement. Rien de sensible ne vit dans le
dépôt, et un serveur reprovisionné retrouve sa configuration tout seul.

| Variable | Rôle | Sans elle |
|---|---|---|
| `DASHBOARD_PASSWORD_HASH` | empreinte scrypt du mot de passe | connexion impossible |
| `AUTH_SECRET` | signature des cookies de session | connexion impossible |
| `MAIL_INGEST_KEY` | clé partagée avec l'Email Worker | `/api/mail/ingest` fermé |
| `RESEND_API_KEY` | envoi des notifications | messages stockés, pas de mail |
| `NOTIFY_EMAIL` | destinataire des notifications | idem |
| `NOTIFY_FROM` | expéditeur (domaine vérifié chez Resend) | repli `onboarding@resend.dev` |

Aucune n'a de valeur par défaut ouverte : une variable manquante **ferme** la
fonction concernée au lieu de la laisser accessible. Un tableau de bord ouvert
parce qu'un secret manque, personne ne le remarque avant qu'il soit trop tard.

## Générer les secrets

```bash
node scripts/hash-password.mjs          # DASHBOARD_PASSWORD_HASH
openssl rand -hex 32                    # AUTH_SECRET
openssl rand -hex 32                    # MAIL_INGEST_KEY
```

Puis, dans **ton** terminal (l'invite évite que la valeur passe dans
l'historique du shell) :

```bash
gh secret set DASHBOARD_PASSWORD_HASH --repo salistar/salistar
```

## Déployer l'Email Worker

```bash
cd cloudflare/email-worker
npx wrangler deploy
npx wrangler secret put MAIL_INGEST_KEY
```

Puis, dans Cloudflare → **Email Routing** du domaine `salistar.com` : créer
l'adresse `contact@salistar.com` et la router vers le Worker
`salistar-contact-mail`.

⚠️ `wrangler deploy` **écrase** la configuration distante par le `wrangler.toml`.
Les variables en clair y sont donc redéclarées ; le secret, lui, est conservé
par Cloudflare d'un déploiement à l'autre.

## Où sont stockés les messages

Fichier JSON dans un volume Docker nommé `salistar-data`, monté sur `/data`.
Pas de base : ce site n'en avait aucune, et brancher le Mongo de la stack
Salorie imposerait de relier deux réseaux Docker pour quelques messages par
semaine. Écritures sérialisées et atomiques (`write` puis `rename`), plafonnées
à 2 000 messages.

Le jour où le volume le justifie, `app/lib/messages.ts` est le **seul** fichier
à remplacer : les routes n'en connaissent que les quatre fonctions.
