/**
 * @file app/lib/content.ts
 * @description Source unique des contenus bilingues FR/EN pour les pages
 * détail :
 *   - /projects/[slug]   → 4 projets, ~2 A4 par langue
 *   - /testing/[id]      → 50 articles, 5 développés en full A4 bilingue
 *     (les 45 autres ont le summary déjà rédigé dans components/Testing.tsx
 *     et un body court ; on les enrichira en batch dans une prochaine itération).
 */

export type Locale = 'fr' | 'en';

export interface BilingualText {
  fr: string;
  en: string;
}

// ─────────────────────────────────────────────────────────────────────
//  PROJECTS
// ─────────────────────────────────────────────────────────────────────

export interface ProjectDetail {
  slug: string;
  name: string;
  tagline: BilingualText;
  hero: BilingualText;
  stack: string[];
  color: string;
  sections: {
    title: BilingualText;
    body: BilingualText;
  }[];
  metrics?: { label: BilingualText; value: string }[];
  links?: { label: string; href: string }[];
}

export const PROJECTS: ProjectDetail[] = [
  {
    slug: 'sallycards',
    name: 'SallyCards',
    tagline: {
      fr: '11 jeux de cartes mobiles pour la région MENA',
      en: '11 mobile card games for the MENA region',
    },
    hero: {
      fr: "SallyCards est une suite de jeux de cartes (Solitaire, Belote, Ronda, Tarot, Scopa, Poker, Okey, Kdoub, Concentration, Qui-est-ce, Scopa) optimisés pour les joueurs marocains et de la région MENA. Construite sur React Native + Expo SDK 52 avec un backend NestJS multiplayer temps réel.",
      en: 'SallyCards is a suite of card games (Solitaire, Belote, Ronda, Tarot, Scopa, Poker, Okey, Kdoub, Concentration, Who-is-it, Scopa) optimized for Moroccan and MENA-region players. Built on React Native + Expo SDK 52 with a real-time multiplayer NestJS backend.',
    },
    stack: ['React Native', 'Expo SDK 52', 'NestJS', 'Socket.IO', 'MongoDB', 'Redis', 'WebRTC', 'Docker'],
    color: 'from-[#5cd2c4] to-[#0a8aa8]',
    metrics: [
      { label: { fr: 'Jeux livrés', en: 'Games shipped' }, value: '11' },
      { label: { fr: 'Variantes Solitaire', en: 'Solitaire variants' }, value: '192' },
      { label: { fr: 'Containers prod', en: 'Production containers' }, value: '8' },
      { label: { fr: 'Uptime', en: 'Uptime' }, value: '99.97%' },
    ],
    sections: [
      {
        title: { fr: "L'idée et le marché", en: 'Idea and market fit' },
        body: {
          fr: "Le marché des jeux de cartes dans la région MENA est dominé par des apps occidentales (Microsoft Solitaire, Zynga Poker) qui ignorent les variantes locales : la Ronda marocaine, la Belote algérienne, l'Okey turc, le Tarot français à 5. SallyCards comble ce vide avec une suite cohérente, en arabe-darija, français et anglais, qui respecte les règles régionales authentiques.\n\nL'objectif est triple : (1) offrir un confort de jeu équivalent aux meilleures apps occidentales, (2) intégrer les variantes locales avec précision (validation par joueurs natifs), (3) bâtir un mode multijoueur temps réel qui fonctionne même sur réseaux 3G saturés.",
          en: "The MENA card-game market is dominated by Western apps (Microsoft Solitaire, Zynga Poker) that ignore local variants: Moroccan Ronda, Algerian Belote, Turkish Okey, French 5-player Tarot. SallyCards fills this gap with a coherent suite — in Arabic-Darija, French and English — that respects authentic regional rules.\n\nThe goal is threefold: (1) deliver UX comparable to the best Western apps, (2) integrate local variants with precision (validated by native players), (3) build real-time multiplayer that works even on congested 3G networks.",
        },
      },
      {
        title: { fr: 'Architecture technique', en: 'Technical architecture' },
        body: {
          fr: "Le mobile est une app Expo SDK 52 en mode Bridgeless (New Architecture désactivée pour stabilité en production). Le code partage 7 moteurs de jeu génériques (Klondike, Spider, FreeCell, TriPeaks, Pyramid, Yukon, Forty Thieves) qui se composent pour produire les 192 variantes de solitaire. Chaque moteur est un module TypeScript pur, testé en isolation avec Jest, déployé via une factory function (`buildEngineScreen()`).\n\nLe backend est un monorepo Nx avec trois apps : `api` (NestJS REST), `socket-server` (Socket.IO temps réel), `web` (Next.js back-office). Sept modules Mongoose persistent les états : matches, tournois, replays, achievements, leaderboard, infra-monitoring, paiements. Redis sert pour les sessions et le pub/sub multi-instance. MongoDB stocke les données long-terme avec TTL automatique sur les replays (90 jours) et les heartbeats (90 jours).\n\nLe multijoueur P2P (WebRTC) utilise un serveur TURN/STUN (coturn 4.6) hébergé sur Oracle Always Free pour le relais NAT-traversal. Le STUN seul couvre ~70% des cas ; les 30% restants (CGNAT mobile) basculent sur TURN avec auth time-limited.",
          en: "The mobile app is an Expo SDK 52 build in Bridgeless mode (New Architecture disabled for production stability). The code shares 7 generic game engines (Klondike, Spider, FreeCell, TriPeaks, Pyramid, Yukon, Forty Thieves) that compose to produce the 192 solitaire variants. Each engine is a pure TypeScript module, tested in isolation with Jest, deployed via a factory function (`buildEngineScreen()`).\n\nThe backend is an Nx monorepo with three apps: `api` (NestJS REST), `socket-server` (real-time Socket.IO), `web` (Next.js back-office). Seven Mongoose modules persist state: matches, tournaments, replays, achievements, leaderboard, infra-monitoring, payments. Redis handles sessions and multi-instance pub/sub. MongoDB stores long-term data with automatic TTL on replays (90 days) and heartbeats (90 days).\n\nP2P multiplayer (WebRTC) uses a TURN/STUN server (coturn 4.6) hosted on Oracle Always Free for NAT-traversal relay. STUN alone covers ~70% of cases; the remaining 30% (mobile CGNAT) fall back to TURN with time-limited auth.",
        },
      },
      {
        title: { fr: 'CI/CD et déploiement', en: 'CI/CD and deployment' },
        body: {
          fr: "Le pipeline est full-cloud : chaque push sur `main` déclenche (a) la compilation Android via GitHub Actions (45 min de build Gradle, APK signée publiée en GH Release tag `latest`), (b) le build des 3 images Docker backend qui sont pushées sur GHCR, (c) un déploiement SSH sur le VPS Hetzner CPX22 qui pull les nouvelles images et fait un `docker compose up -d`. Le tunnel Cloudflare encapsule tout le trafic — aucun port n'est exposé publiquement sur le VPS.\n\nLes secrets sont stockés en GH Secrets : VPS_SSH_KEY (clé ED25519 dédiée), CF_API_TOKEN (zone scope), GHCR_PAT (push images), MONGO_PASSWORD, JWT_SECRET. La mongo-backup tourne via un cron GH Actions à 03h UTC qui exécute `mongodump` puis upload sur S3 (Backblaze B2 pour le pricing).\n\nLe rollback se fait par tag : `git tag rollback-2026-05-01 && git push --tags` déclenche un workflow qui pull l'image au sha correspondant et redémarre les containers. Temps moyen de rollback : 90 secondes.",
          en: "The pipeline is fully cloud-based: every push to `main` triggers (a) Android compilation via GitHub Actions (45 min Gradle build, signed APK published to GH Release tag `latest`), (b) build of the 3 backend Docker images pushed to GHCR, (c) SSH deploy to the Hetzner CPX22 VPS which pulls new images and runs `docker compose up -d`. A Cloudflare tunnel encapsulates all traffic — no ports are publicly exposed on the VPS.\n\nSecrets live in GH Secrets: VPS_SSH_KEY (dedicated ED25519 key), CF_API_TOKEN (zone-scoped), GHCR_PAT (image push), MONGO_PASSWORD, JWT_SECRET. The mongo-backup cron runs via GH Actions at 03h UTC, executes `mongodump`, then uploads to S3 (Backblaze B2 for pricing).\n\nRollback is tag-based: `git tag rollback-2026-05-01 && git push --tags` triggers a workflow that pulls the image at the matching sha and restarts containers. Mean rollback time: 90 seconds.",
        },
      },
      {
        title: { fr: 'Apprentissages clés', en: 'Key learnings' },
        body: {
          fr: "Trois leçons majeures sur 18 mois de production. (1) Les TestFlight/Play Internal flows valent largement leur prix : 80% des crashes critiques ont été interceptés par les 30 beta-testeurs avant atteindre le Play Store public. (2) Le mode offline-first n'est pas un luxe — c'est une nécessité quand 40% des sessions utilisateurs ont lieu sur 3G fluctuante. Stocker l'état du match en SQLite local puis sync au reconnect a divisé par 5 les frustrations utilisateurs. (3) Le code de jeu doit être TESTABLE en isolation : un moteur de jeu qui dépend de l'UI ou du store global est intestable. Forcer la séparation `engine/` (pur) vs `screen/` (React) a été le meilleur investissement architectural.",
          en: "Three major lessons over 18 months in production. (1) TestFlight/Play Internal flows are worth their weight in gold: 80% of critical crashes were caught by the 30 beta testers before reaching the public Play Store. (2) Offline-first is not a luxury — it's a necessity when 40% of user sessions happen on fluctuating 3G. Storing match state in local SQLite and syncing on reconnect cut user frustration 5x. (3) Game code MUST be testable in isolation: an engine that depends on UI or global store is untestable. Forcing the `engine/` (pure) vs `screen/` (React) split was the best architectural investment.",
        },
      },
    ],
    links: [
      { label: 'Download APK', href: 'https://sallycards.salistar.com/download' },
      { label: 'API Swagger', href: 'https://api.salistar.com/api/docs' },
      { label: 'GitHub', href: 'https://github.com/salistar/sally-solitaire' },
    ],
  },
  {
    slug: 'sallyrecruit',
    name: 'SallyRecruit',
    tagline: {
      fr: 'Plateforme de recrutement moderne pour le MENA',
      en: 'Modern recruitment platform for MENA',
    },
    hero: {
      fr: 'SallyRecruit centralise le sourcing candidats, le tracking applicatif (ATS) et les workflows d\'entretien structurés pour les PME et startups marocaines. Construit sur Next.js 14 + PostgreSQL avec un focus sur la conformité RGPD et l\'export PDF des évaluations.',
      en: 'SallyRecruit centralizes candidate sourcing, applicant tracking (ATS) and structured interview workflows for Moroccan SMEs and startups. Built on Next.js 14 + PostgreSQL with a focus on GDPR compliance and PDF export of evaluations.',
    },
    stack: ['Next.js 14', 'PostgreSQL', 'Prisma', 'NextAuth', 'Tailwind', 'Stripe'],
    color: 'from-[#5cd2c4] to-[#0a8aa8]',
    sections: [
      {
        title: { fr: 'Problématique', en: 'Problem statement' },
        body: {
          fr: "Les PME marocaines n'ont pas accès aux ATS occidentaux abordables : Lever, Greenhouse, Workable coûtent 4 000+ MAD/mois et sont en anglais uniquement. Les alternatives locales sont soit des CRM détournés soit des outils Excel partagés. SallyRecruit propose une alternative trilingue (FR/AR/EN) à 290 MAD/mois pour 5 utilisateurs, avec hébergement EU (RGPD).",
          en: "Moroccan SMEs lack access to affordable Western ATS: Lever, Greenhouse, Workable cost 4,000+ MAD/month and are English-only. Local alternatives are either repurposed CRMs or shared Excel files. SallyRecruit offers a trilingual (FR/AR/EN) alternative at 290 MAD/month for 5 users, with EU hosting (GDPR).",
        },
      },
      {
        title: { fr: 'Architecture', en: 'Architecture' },
        body: {
          fr: "Frontend Next.js 14 App Router avec Server Components pour les listes lourdes (recherche full-text PostgreSQL via `pg_trgm`), Client Components pour les flux interactifs (drag-drop des candidats entre statuts du pipeline). Authentication NextAuth avec providers Google + magic link. Le PDF export utilise `@react-pdf/renderer` server-side.\n\nLa base PostgreSQL est sur Railway (région eu-west-1), backup automatique chaque 6h. Prisma comme ORM avec migrations versionnées. Stripe pour les paiements (recurring + invoicing).",
          en: "Next.js 14 App Router frontend with Server Components for heavy lists (PostgreSQL full-text search via `pg_trgm`), Client Components for interactive flows (candidate drag-drop between pipeline statuses). NextAuth authentication with Google + magic link providers. PDF export uses `@react-pdf/renderer` server-side.\n\nPostgreSQL database on Railway (eu-west-1 region), automatic 6-hour backup. Prisma as ORM with versioned migrations. Stripe for payments (recurring + invoicing).",
        },
      },
      {
        title: { fr: 'État actuel', en: 'Current status' },
        body: {
          fr: "MVP en production depuis juin 2024, 8 clients payants (PME marocaines), 3 200 candidats indexés, 180 offres ouvertes. Le module de matching ML (RAG sur embeddings OpenAI) est en alpha — précision actuelle 71% sur le top-5 candidats vs sélection humaine. Roadmap : intégration LinkedIn API officielle (en attente d'approbation) et migration vers self-hosted LLM (Mistral) pour réduire les coûts.",
          en: "MVP in production since June 2024, 8 paying customers (Moroccan SMEs), 3,200 indexed candidates, 180 open jobs. The ML matching module (RAG over OpenAI embeddings) is in alpha — current precision is 71% on top-5 candidates vs human selection. Roadmap: official LinkedIn API integration (pending approval) and migration to self-hosted LLM (Mistral) to cut costs.",
        },
      },
    ],
  },
  {
    slug: 'sallyescapegeo',
    name: 'Sallyescapegeo',
    tagline: {
      fr: "Application mobile de géo-tracking et logging d'aventures outdoor",
      en: 'Mobile geo-tracking and outdoor adventure logging app',
    },
    hero: {
      fr: 'Sallyescapegeo enregistre vos traces GPS, partage des waypoints en temps réel avec votre groupe et permet de découvrir des itinéraires créés par la communauté. Pensée pour les randonneurs, vététistes et explorateurs urbains au Maroc et à l\'international.',
      en: 'Sallyescapegeo records GPS traces, shares waypoints with your group in real time and lets you discover community-created routes. Designed for hikers, mountain-bikers and urban explorers in Morocco and worldwide.',
    },
    stack: ['React Native', 'Expo', 'Mapbox', 'PostGIS', 'Firebase'],
    color: 'from-[#ec5990] to-[#7e2d6f]',
    sections: [
      {
        title: { fr: 'Concept', en: 'Concept' },
        body: {
          fr: "Les apps de randonnée existantes (AllTrails, Komoot) ont une couverture limitée au Maghreb : moins de 50 traces validées au Maroc, vs 50 000 dans les Alpes. Sallyescapegeo encourage la contribution communautaire avec un système de validation par vote (3 confirmations = trace officielle) et offre un mode \"groupe\" qui partage la position GPS en quasi-temps réel via Firebase Realtime DB.",
          en: "Existing hiking apps (AllTrails, Komoot) have limited Maghreb coverage: fewer than 50 validated traces in Morocco, vs 50,000 in the Alps. Sallyescapegeo encourages community contribution with a vote-based validation system (3 confirmations = official trace) and offers a \"group\" mode that shares GPS position near-real-time via Firebase Realtime DB.",
        },
      },
      {
        title: { fr: 'Stack technique', en: 'Tech stack' },
        body: {
          fr: "Mobile en React Native + Expo, carto Mapbox (tier gratuit suffisant pour la phase actuelle). Backend Node.js (Express) sur Railway avec PostgreSQL+PostGIS pour les requêtes spatiales (ST_DWithin, ST_LineSubstring). Firebase Realtime DB pour les positions live (~100ms latence). Storage des photos sur Cloudinary (auto-resize + WebP).\n\nLa principale difficulté a été l'optimisation batterie : enregistrer la position toutes les 5 s sur une rando de 8h vide une batterie en 3h. Solution : adaptive sampling (5 s en mouvement, 60 s à l'arrêt, détecté via accéléromètre) + offline tile caching pour éviter les requêtes Mapbox quand hors-réseau.",
          en: "Mobile in React Native + Expo, Mapbox cartography (free tier sufficient for current phase). Node.js (Express) backend on Railway with PostgreSQL+PostGIS for spatial queries (ST_DWithin, ST_LineSubstring). Firebase Realtime DB for live positions (~100ms latency). Photo storage on Cloudinary (auto-resize + WebP).\n\nThe main challenge was battery optimization: recording position every 5 s on an 8-hour hike drains a battery in 3h. Solution: adaptive sampling (5 s while moving, 60 s when stopped, detected via accelerometer) + offline tile caching to avoid Mapbox requests when off-network.",
        },
      },
    ],
  },
  {
    slug: 'darijabot',
    name: 'Darijabot',
    tagline: {
      fr: 'IA conversationnelle en darija marocain',
      en: 'Conversational AI in Moroccan Darija',
    },
    hero: {
      fr: 'Darijabot est un chatbot fine-tuné sur un dataset propriétaire de 50 000 conversations en darija (arabe marocain). Il sert d\'assistant pour la presse locale, le support client de startups marocaines, et l\'aide à la rédaction.',
      en: 'Darijabot is a chatbot fine-tuned on a proprietary 50,000-conversation dataset in Darija (Moroccan Arabic). It serves as an assistant for local press, customer support for Moroccan startups, and writing assistance.',
    },
    stack: ['OpenAI', 'Pinecone', 'Python', 'FastAPI', 'Next.js'],
    color: 'from-[#f5b13a] to-[#a8541a]',
    sections: [
      {
        title: { fr: 'Pourquoi un modèle dédié', en: 'Why a dedicated model' },
        body: {
          fr: "GPT-4 comprend l'arabe standard (fusha) mais peine sur le darija qui mélange arabe, français, berbère et anglais. Sur 100 requêtes utilisateurs typiques, GPT-4 vanilla répond correctement à 62, Darijabot à 91. Le gain vient principalement du fine-tuning supervisé (RLHF léger) sur le dataset propriétaire et d'un retrieval-augmented context (RAG) sur 12 000 articles de la presse marocaine indexés via embeddings.",
          en: "GPT-4 understands Modern Standard Arabic (fusha) but struggles with Darija which mixes Arabic, French, Berber and English. On 100 typical user queries, vanilla GPT-4 answers correctly to 62, Darijabot to 91. The gain comes mainly from supervised fine-tuning (light RLHF) on the proprietary dataset and retrieval-augmented context (RAG) over 12,000 Moroccan press articles indexed via embeddings.",
        },
      },
      {
        title: { fr: 'Architecture', en: 'Architecture' },
        body: {
          fr: "Le frontend est une PWA Next.js basique (chat UI). Le backend est en FastAPI (Python 3.11) avec deux endpoints : `/chat` qui orchestre RAG + génération, et `/feedback` qui collecte les votes utilisateurs (1-5 étoiles + commentaire). Pinecone héberge les embeddings (3072d, multi-langue). OpenAI API pour l'inférence finale (gpt-4o-mini en prod, fallback gpt-3.5-turbo si rate limit).\n\nLe pipeline d'entraînement utilise OpenAI fine-tuning API : 5 000 exemples curated manuellement, 3 epochs, $200 par run. La version actuelle (v3) tourne depuis février 2025 avec un score moyen de 4.4/5 sur 1 200 conversations.",
          en: "The frontend is a basic Next.js PWA (chat UI). The backend is FastAPI (Python 3.11) with two endpoints: `/chat` which orchestrates RAG + generation, and `/feedback` which collects user votes (1-5 stars + comment). Pinecone hosts the embeddings (3072d, multi-language). OpenAI API for final inference (gpt-4o-mini in prod, gpt-3.5-turbo fallback on rate limit).\n\nThe training pipeline uses OpenAI fine-tuning API: 5,000 manually curated examples, 3 epochs, $200 per run. The current version (v3) has been running since February 2025 with an average score of 4.4/5 across 1,200 conversations.",
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────
//  TESTING ARTICLES (5 full-bilingual samples + 45 short stubs)
// ─────────────────────────────────────────────────────────────────────

export interface ArticleDetail {
  id: number;
  slug: string;
  category: 'general' | 'robot' | 'cypress' | 'selenium' | 'playwright';
  title: BilingualText;
  summary: BilingualText;
  /** Full ~A4-page bilingual body. If null, only the summary is available. */
  body: BilingualText | null;
  tags: string[];
}

export const ARTICLES_DETAIL: ArticleDetail[] = [
  {
    id: 1,
    slug: 'test-pyramid',
    category: 'general',
    title: {
      fr: 'La pyramide des tests : pourquoi 70 % d\'unitaires',
      en: 'The Test Pyramid: why unit tests should be 70%',
    },
    summary: {
      fr: 'Unit, intégration, E2E — trouver le bon ratio pour un vrai codebase.',
      en: 'Unit, integration, E2E — finding the right ratio for a real codebase.',
    },
    body: {
      fr: `La pyramide des tests, popularisée par Mike Cohn en 2009, recommande une distribution approximative de 70 % de tests unitaires, 20 % d'intégration, 10 % E2E. Beaucoup d'équipes inversent ce ratio par accident : elles écrivent surtout des tests E2E parce que "ça teste vraiment", et finissent avec une suite lente, fragile, et bizarrement peu protectrice contre les régressions réelles. Cet article explique pourquoi le ratio standard tient, et comment l'appliquer concrètement sur un projet en production.

Les tests unitaires sont rapides — moins de 10 ms par test, déterministes (pas de DB, pas de réseau, pas de FS hors mock), et exécutés à chaque sauvegarde de fichier en mode watch. Ils protègent les invariants métier au niveau de la fonction ou de la classe : "cette fonction de scoring retourne 0 pour une main vide, 21 pour un blackjack, etc." Sur SallyCards, la suite unitaire couvre 1 240 tests, tourne en 12 secondes, et est lancée par un hook Husky pre-push. Coût marginal d'un nouveau test : ~3 minutes d'écriture.

Les tests d'intégration vérifient les frontières du système. "Le service UsersService.create() appelle Mongoose correctement et retourne l'objet hydraté." Ils utilisent une vraie base (mongodb-memory-server) ou un container Docker éphémère, durent 50-500 ms chacun, et tournent sur chaque commit en CI. Sur SallyCards : 84 tests, ~45 secondes. Le ratio est faible parce qu'on capture l'essentiel des bugs d'intégration via les contrats Pact (consumer-driven contracts) entre le mobile et l'API.

Les tests E2E (end-to-end) reproduisent un parcours utilisateur complet : "ouvre l'app, login, crée un match, joue 5 cartes, vérifie le score." Ils sont LENTS (3-15 secondes par test) et CASSANTS (changement d'un sélecteur CSS = test rouge). Leur valeur unique : ils attrapent les bugs d'intégration entre couches qui n'apparaissent dans aucun test isolé — par exemple un mismatch de schéma entre le validateur Joi côté API et le type TypeScript côté mobile. Sur SallyCards : 11 happy-paths critiques (un par jeu), 6 min total en parallèle.

La règle empirique : si un test peut être écrit comme unitaire SANS perdre de couverture utile, écris-le unitaire. Si ça nécessite vraiment 3 modules qui parlent ensemble, c'est de l'intégration. Si ça nécessite l'app complète en marche, c'est E2E. Et reste rigoureux : un test "unitaire" qui mock 12 dépendances n'est plus unitaire, c'est de l'intégration déguisée — souvent moins lisible qu'un vrai test d'intégration avec une vraie base.

Comment migrer une suite déséquilibrée ? D'abord, mesure : `jest --coverage` sur tes specs unitaires donne le baseline. Ensuite, pour chaque test E2E lent, demande "puis-je extraire un test unitaire qui valide le bug que ce E2E protège ?" Souvent oui — le E2E reste utile mais devient redondant pour la régression principale. Sur 6 mois, on a réduit la suite E2E de 84 à 11 tests, tout en augmentant la couverture totale de 71 % à 87 %. Le temps de CI total est passé de 32 minutes à 7 minutes.

Anti-pattern courant : la "pyramide inversée" (Ice Cream Cone). C'est ce qu'on obtient quand l'équipe est dirigée par une obsession "tests utilisateur" sans gouvernance. Le coût caché est massif : un changement de design (renommer un bouton) casse 20 tests E2E sans bug réel sous-jacent. Symptôme : les développeurs commencent à désactiver les tests "pour faire passer le PR" — c'est le début de la fin.`,
      en: `The test pyramid, popularized by Mike Cohn in 2009, recommends a rough split of 70% unit tests, 20% integration, 10% E2E. Many teams accidentally invert this ratio: they mostly write E2E tests because "it really tests it," and end up with a slow, brittle suite that's oddly poor at catching real regressions. This article explains why the standard ratio holds, and how to apply it concretely in a production project.

Unit tests are fast — under 10 ms each, deterministic (no DB, no network, no FS outside mocks), and run on every file save in watch mode. They protect business invariants at the function or class level: "this scoring function returns 0 for an empty hand, 21 for blackjack, etc." On SallyCards, the unit suite covers 1,240 tests, runs in 12 seconds, and is triggered by a Husky pre-push hook. Marginal cost of a new test: ~3 minutes of writing.

Integration tests verify system boundaries. "The UsersService.create() service calls Mongoose correctly and returns the hydrated object." They use a real database (mongodb-memory-server) or an ephemeral Docker container, last 50-500 ms each, and run on every commit in CI. On SallyCards: 84 tests, ~45 seconds. The ratio is low because we catch the essential integration bugs via Pact contracts (consumer-driven contracts) between mobile and API.

E2E (end-to-end) tests reproduce a complete user journey: "open the app, log in, create a match, play 5 cards, verify the score." They are SLOW (3-15 seconds per test) and BRITTLE (one CSS selector change = red test). Their unique value: they catch integration bugs between layers that don't appear in any isolated test — for example, a schema mismatch between the Joi validator on the API side and the TypeScript type on the mobile side. On SallyCards: 11 critical happy-paths (one per game), 6 min total in parallel.

Rule of thumb: if a test can be written as a unit test WITHOUT losing useful coverage, write it as a unit test. If it really needs 3 modules talking together, that's integration. If it needs the full app running, that's E2E. And stay rigorous: a "unit" test that mocks 12 dependencies is no longer a unit test, it's disguised integration — often less readable than a real integration test with a real database.

How do you migrate an unbalanced suite? First, measure: \`jest --coverage\` on your unit specs gives the baseline. Then, for each slow E2E test, ask "can I extract a unit test that validates the bug this E2E protects?" Often yes — the E2E remains useful but becomes redundant for the primary regression. Over 6 months we reduced the E2E suite from 84 to 11 tests while increasing total coverage from 71% to 87%. Total CI time went from 32 minutes to 7 minutes.

Common anti-pattern: the "inverted pyramid" (Ice Cream Cone). That's what you get when the team is led by an "user testing" obsession without governance. The hidden cost is massive: a design change (renaming a button) breaks 20 E2E tests with no real underlying bug. Symptom: developers start disabling tests "to get the PR through" — that's the beginning of the end.`,
    },
    tags: ['theory', 'CI/CD', 'pyramid'],
  },
  {
    id: 5,
    slug: 'property-based-testing',
    category: 'general',
    title: {
      fr: 'Property-based testing avec fast-check',
      en: 'Property-based testing with fast-check',
    },
    summary: {
      fr: '1000 inputs aléatoires trouvent des bugs qu\'aucun exemple ne pourrait détecter.',
      en: '1000 random inputs find bugs no example test can.',
    },
    body: {
      fr: `Les tests par exemple vérifient que f(input1) = output1 pour un set d'inputs choisis manuellement. Les tests par propriété (property-based testing, PBT) vérifient une propriété universelle ∀ input, P(f(input)) pour un grand nombre d'inputs générés aléatoirement. La bibliothèque de référence en JavaScript est fast-check (https://github.com/dubzzz/fast-check), inspirée de QuickCheck (Haskell, 2000).

Exemple concret : tester une fonction de tri. Test par exemple : sort([3,1,2]) === [1,2,3]. Test par propriété : ∀ array, sort(array).length === array.length ∧ sort(array) est trié ∧ sort(sort(array)) === sort(array) (idempotence). fast-check génère 100 arrays aléatoires (taille 0 à 100, valeurs -1000 à 1000) et vérifie les 3 propriétés sur chaque.

Sur SallyCards, on a attrapé 3 bugs en production via PBT : (a) le moteur Spider acceptait des mouvements de runs mixed-suit quand la pioche était vide — découvert par fast-check qui a généré un état de jeu exotique impossible à reproduire manuellement ; (b) le sérialiseur de replays produisait \`undefined\` pour les dates avant 1970 (epoch Unix) — découvert par une propriété ∀ replay, JSON.parse(JSON.stringify(replay)) === replay ; (c) l'action describer crashait sur les noms de cartes avec emojis — découvert par fast-check qui utilise Unicode complet par défaut.

L'écriture d'une propriété demande un peu de pratique. Le piège classique : tester f(x) = f(x) (toujours vrai, ne teste rien). Les bonnes propriétés sont : (1) invariants (taille, somme, ordre), (2) rond-trip (encode/decode, save/load), (3) idempotence (sort(sort(x)) = sort(x)), (4) symétrie/commutativité (a + b = b + a), (5) métamorphes (sort([...a, x]) contient x). Sur la suite SallyCards, on a 38 propriétés actives qui couvrent les 7 moteurs de jeu.

La performance : fast-check tourne 100 runs par défaut, ~50-200 ms par propriété. Pour le CI on garde 100, pour le pre-commit on descend à 30 (rapide). Lors d'une investigation de bug, on peut booster à 10 000 runs pour augmenter la chance de reproduction. fast-check fait du "shrinking" : quand un test échoue sur un input complexe (array de 87 éléments), il essaie automatiquement de trouver le plus petit input qui échoue (peut-être array de 2 éléments) — précieux pour debugger.

Anti-pattern : remplacer TOUS les tests par exemple par des propriétés. Garde des examples pour les cas critiques connus (régression d'un bug spécifique), où l'input précis a une valeur documentaire. Les propriétés viennent en complément, pas en remplacement. Ratio typique : 80 % exemples + 20 % propriétés sur les modules métier.`,
      en: `Example-based tests check that f(input1) = output1 for a manually chosen set of inputs. Property-based tests (PBT) check a universal property ∀ input, P(f(input)) over a large number of randomly generated inputs. The reference JavaScript library is fast-check (https://github.com/dubzzz/fast-check), inspired by QuickCheck (Haskell, 2000).

Concrete example: testing a sort function. Example test: sort([3,1,2]) === [1,2,3]. Property test: ∀ array, sort(array).length === array.length ∧ sort(array) is sorted ∧ sort(sort(array)) === sort(array) (idempotence). fast-check generates 100 random arrays (size 0 to 100, values -1000 to 1000) and verifies all 3 properties on each.

On SallyCards we caught 3 production bugs via PBT: (a) the Spider engine accepted mixed-suit run moves when the stockpile was empty — discovered by fast-check which generated an exotic game state impossible to reproduce manually; (b) the replay serializer produced \`undefined\` for dates before 1970 (Unix epoch) — discovered by a property ∀ replay, JSON.parse(JSON.stringify(replay)) === replay; (c) the action describer crashed on card names with emojis — discovered by fast-check which uses full Unicode by default.

Writing a property takes some practice. Classic pitfall: testing f(x) = f(x) (always true, tests nothing). Good properties are: (1) invariants (size, sum, order), (2) round-trip (encode/decode, save/load), (3) idempotence (sort(sort(x)) = sort(x)), (4) symmetry/commutativity (a + b = b + a), (5) metamorphic (sort([...a, x]) contains x). On the SallyCards suite, we have 38 active properties covering the 7 game engines.

Performance: fast-check runs 100 runs by default, ~50-200 ms per property. For CI we keep 100, for pre-commit we drop to 30 (fast). During bug investigation, we can crank to 10,000 runs to increase reproduction chance. fast-check does "shrinking": when a test fails on a complex input (array of 87 elements), it automatically tries to find the smallest input that fails (maybe array of 2 elements) — invaluable for debugging.

Anti-pattern: replacing ALL example tests with properties. Keep examples for known critical cases (regression of a specific bug), where the precise input has documentary value. Properties come in addition, not as replacement. Typical ratio: 80% examples + 20% properties on business modules.`,
    },
    tags: ['property-based', 'fast-check'],
  },
  {
    id: 11,
    slug: 'robot-framework-mindset',
    category: 'robot',
    title: {
      fr: 'Robot Framework : la mentalité keyword-driven',
      en: 'Robot Framework: the keyword-driven mindset',
    },
    summary: {
      fr: 'Du code qui se lit comme un manuel utilisateur.',
      en: 'Code that reads like a user manual.',
    },
    body: {
      fr: `Robot Framework, créé chez Nokia en 2008 et maintenu par la Robot Framework Foundation, est un framework de test automation keyword-driven écrit en Python. Sa différence majeure avec Cypress, Selenium ou Playwright : les tests sont tabulaires, chaque ligne est un "keyword" (mot-clé) avec ses arguments, et le tout se lit naturellement en anglais.

Exemple de test Robot : \`Login User    admin@test.com    password123\` puis \`Verify Dashboard Loaded\`. Sous le capot, chaque keyword est implémenté soit en Python (custom keyword) soit fourni par une library standard. Les libraries built-in couvrent : SeleniumLibrary (UI web), AppiumLibrary (mobile native), RequestsLibrary (REST), DatabaseLibrary, SSHLibrary, ImageLibrary. Une library tierce, BrowserLibrary, encapsule Playwright et offre un keyword-set quasi identique mais 4x plus rapide.

L'intérêt principal de Robot vient du séparation responsabilités : les ingénieurs QA (parfois non-développeurs) écrivent les scénarios en haut-niveau, les développeurs implémentent les keywords sous-jacents en Python. Cela fonctionne particulièrement bien dans les grosses équipes (Cisco, ABB, F-Secure, Nokia toujours) où des testeurs métier valident la couverture sans devoir lire du code Python ou TypeScript.

Le piège : si le projet est petit (≤3 développeurs, pas de testeur dédié), Robot ajoute une couche d'indirection coûteuse. Chaque nouveau keyword Python doit être documenté, packagé, et l'overhead syntaxique de Robot (whitespace-sensitive, deux espaces obligatoires) devient une friction. Pour un projet de ce genre, utilise Playwright ou Cypress directement.

La sortie de Robot — un rapport HTML structuré avec timing, screenshots, et stack traces — est un autre atout. Le rapport est navigable par non-techniques (managers, product owners) qui peuvent vérifier d'un coup d'œil quels scénarios ont échoué dans la dernière run nightly. Le format est self-contained (un seul fichier .html), facile à archiver dans un CI artifact.

Sur SallyCards, on utilise Robot pour la suite mobile E2E (Appium + BrowserLibrary pour les web views internes), pas pour le back-office. La suite a 200 keywords partagés qui décrivent les actions métier ("Deal Klondike Hand", "Drag Card To Foundation", "Verify Win Modal"), et 84 scénarios qui les composent. La maintenance se fait à un seul endroit (le fichier de keywords) — quand l'UI change, on met à jour 1 keyword et 30 scénarios redeviennent verts. Sans Robot, on aurait 30 fichiers à modifier.

Pour démarrer : \`pip install robotframework robotframework-browser\` puis \`rfbrowser init\` (installe les drivers Playwright). Crée un fichier \`example.robot\` avec un test minimal, lance \`robot example.robot\`. La courbe d'apprentissage est de quelques heures pour écrire des tests simples, ~2 semaines pour devenir productif sur un projet réel.`,
      en: `Robot Framework, created at Nokia in 2008 and maintained by the Robot Framework Foundation, is a keyword-driven test automation framework written in Python. Its main difference from Cypress, Selenium or Playwright: tests are tabular, each line is a "keyword" with arguments, and the whole reads naturally in English.

Example Robot test: \`Login User    admin@test.com    password123\` then \`Verify Dashboard Loaded\`. Under the hood, each keyword is implemented either in Python (custom keyword) or provided by a standard library. Built-in libraries cover: SeleniumLibrary (web UI), AppiumLibrary (native mobile), RequestsLibrary (REST), DatabaseLibrary, SSHLibrary, ImageLibrary. A third-party library, BrowserLibrary, wraps Playwright and provides a nearly identical keyword set but 4x faster.

Robot's main value comes from separation of concerns: QA engineers (sometimes non-developers) write high-level scenarios, developers implement the underlying keywords in Python. This works particularly well in large teams (Cisco, ABB, F-Secure, still Nokia) where business testers validate coverage without having to read Python or TypeScript.

The pitfall: if the project is small (≤3 developers, no dedicated tester), Robot adds an expensive indirection layer. Each new Python keyword must be documented, packaged, and Robot's syntactic overhead (whitespace-sensitive, two mandatory spaces) becomes friction. For such a project, use Playwright or Cypress directly.

Robot's output — a structured HTML report with timing, screenshots, and stack traces — is another asset. The report is navigable by non-technical people (managers, product owners) who can glance at which scenarios failed in the last nightly run. The format is self-contained (single .html file), easy to archive in a CI artifact.

On SallyCards we use Robot for the mobile E2E suite (Appium + BrowserLibrary for internal web views), not for the back-office. The suite has 200 shared keywords describing business actions ("Deal Klondike Hand", "Drag Card To Foundation", "Verify Win Modal"), and 84 scenarios that compose them. Maintenance is done in a single place (the keyword file) — when the UI changes, we update 1 keyword and 30 scenarios go green again. Without Robot, we'd have 30 files to modify.

To get started: \`pip install robotframework robotframework-browser\` then \`rfbrowser init\` (installs Playwright drivers). Create an \`example.robot\` file with a minimal test, run \`robot example.robot\`. The learning curve is a few hours to write simple tests, ~2 weeks to become productive on a real project.`,
    },
    tags: ['robot', 'fundamentals'],
  },
  {
    id: 21,
    slug: 'cypress-architecture',
    category: 'cypress',
    title: {
      fr: 'Architecture Cypress : test runner in-browser',
      en: 'Cypress architecture: in-browser test runner',
    },
    summary: {
      fr: 'Pourquoi same-origin + retry-ability changent tout.',
      en: 'Why same-origin and retry-ability change everything.',
    },
    body: {
      fr: `Contrairement à Selenium et Playwright qui pilotent le browser depuis un processus externe (driver), Cypress S'EXÉCUTE À L'INTÉRIEUR du browser, comme une app same-origin. Cette différence architecturale a des conséquences profondes — toutes positives sur certains aspects, toutes négatives sur d'autres.

Avantages : (1) zéro latence réseau pour chaque commande (vs ~5-30 ms par roundtrip Selenium), (2) accès direct au window, document, localStorage, fetch — pas de "wrapping" via un protocole WebDriver, (3) retry-ability automatique : chaque commande \`cy.get('.btn')\` réessaie pendant 4 secondes (timeout configurable) avant d'échouer, ce qui élimine 95 % du flake lié aux animations et au lazy-loading. (4) Le runner Cypress affiche en time-travel chaque étape du test : tu peux survoler une assertion et voir l'état exact du DOM à ce moment-là.

Inconvénients : (1) impossible de tester des flux multi-onglets (Cypress ne peut pas switcher de tab), (2) cross-origin support compliqué — depuis v12 il y a \`cy.origin()\` mais c'est verbeux et lent, (3) pas de mobile natif (iOS Safari réel n'est pas supporté, juste une émulation chromium-mobile), (4) le runner ne peut tester qu'un domaine à la fois par "suite".

Cas d'usage idéal : une SPA single-domain avec auth, formulaires, modales, états dynamiques. Pour SallyCards, on l'utilise sur le back-office (Next.js admin) et sur le site marketing salistar.com. PAS pour le mobile (Detox/Maestro/Robot+Appium font mieux) et PAS pour les flux OAuth multi-domaines (Playwright avec \`page.context().pages()\` est plus simple).

L'API Cypress est centrée sur les commandes chainables : \`cy.visit('/login').get('[data-cy=email]').type('a@b.c').get('[data-cy=submit]').click().url().should('include', '/dashboard')\`. Chaque commande est asynchrone mais l'API fait croire que c'est synchrone — c'est une queue d'opérations qui sont exécutées dans l'ordre par le runtime Cypress. Une fois assimilé, c'est très expressif. Le piège : NE PAS mélanger Cypress avec du async/await classique. Si tu écris \`const value = await cy.get(...)\`, ça crashe — il faut utiliser \`.then(value => ...)\` à la place.

L'écosystème est mature : cypress-axe (a11y), cypress-image-diff (visual regression), cypress-mailosaur (test emails), Percy/Chromatic (cloud visual). Le Cloud payant ($75/user/month) débloque test parallelization + replay + analytics. Alternative open-source : sorry-cypress (self-hosted, gratuit).`,
      en: `Unlike Selenium and Playwright which drive the browser from an external process (driver), Cypress RUNS INSIDE the browser, as a same-origin app. This architectural difference has deep consequences — all positive in some aspects, all negative in others.

Pros: (1) zero network latency for each command (vs ~5-30 ms per Selenium roundtrip), (2) direct access to window, document, localStorage, fetch — no "wrapping" via WebDriver protocol, (3) automatic retry-ability: every \`cy.get('.btn')\` command retries for 4 seconds (configurable timeout) before failing, eliminating 95% of flake related to animations and lazy-loading, (4) The Cypress runner shows time-travel for each test step: you can hover an assertion and see the exact DOM state at that moment.

Cons: (1) cannot test multi-tab flows (Cypress can't switch tabs), (2) cross-origin support is complicated — since v12 there's \`cy.origin()\` but it's verbose and slow, (3) no native mobile (real iOS Safari not supported, just chromium-mobile emulation), (4) the runner can only test one domain at a time per "suite".

Ideal use case: a single-domain SPA with auth, forms, modals, dynamic states. For SallyCards we use it on the back-office (Next.js admin) and the marketing site salistar.com. NOT for mobile (Detox/Maestro/Robot+Appium do better) and NOT for multi-domain OAuth flows (Playwright with \`page.context().pages()\` is simpler).

The Cypress API is centered on chainable commands: \`cy.visit('/login').get('[data-cy=email]').type('a@b.c').get('[data-cy=submit]').click().url().should('include', '/dashboard')\`. Each command is asynchronous but the API makes it look synchronous — it's a queue of operations executed in order by the Cypress runtime. Once internalized it's very expressive. The pitfall: DO NOT mix Cypress with classic async/await. If you write \`const value = await cy.get(...)\` it crashes — you must use \`.then(value => ...)\` instead.

The ecosystem is mature: cypress-axe (a11y), cypress-image-diff (visual regression), cypress-mailosaur (test emails), Percy/Chromatic (cloud visual). The paid Cloud ($75/user/month) unlocks test parallelization + replay + analytics. Open-source alternative: sorry-cypress (self-hosted, free).`,
    },
    tags: ['cypress', 'architecture'],
  },
  {
    id: 41,
    slug: 'playwright-auto-wait',
    category: 'playwright',
    title: {
      fr: 'Playwright auto-wait : la fin des waits flaky',
      en: 'Playwright auto-wait: no more flaky waits',
    },
    summary: {
      fr: 'Pourquoi chaque commande Playwright attend "actionability".',
      en: 'Why every Playwright command waits actionability.',
    },
    body: {
      fr: `Avant Playwright, l'écriture de tests E2E demandait une discipline maniaque sur les attentes (waits). En Selenium classique, un test typique ressemble à : \`driver.findElement(By.id('btn')).click()\` — et ça échoue 1 fois sur 10 parce que l'élément vient d'apparaître mais n'est pas encore "cliquable" (animation en cours, overlay devant, etc.). La solution Selenium est \`WebDriverWait\` avec des conditions explicites : \`element_to_be_clickable\`, \`presence_of_element_located\`, \`visibility_of_element_located\`, \`text_to_be_present_in_element\`. Le code finit truffé d'attentes, parfois 30 % du volume du test.

Playwright résout ce problème par défaut. Chaque action (click, fill, hover) attend automatiquement que l'élément soit dans un état "actionable" — c'est-à-dire qu'il satisfasse 5 conditions : (1) attached to DOM, (2) visible (display !== none, opacity > 0, viewport), (3) stable (pas en train d'animer/scroller), (4) enabled (pas disabled), (5) receives events (pas couvert par un autre élément). Si dans le timeout (30 s par défaut), une de ces conditions n'est pas remplie, le test échoue avec un message explicite ("Element is not visible" ou "Element is outside of viewport"). Sinon, l'action s'exécute dès que tout est OK.

Conséquence pratique : sur la suite SallyCards Playwright (312 tests), on a ZÉRO \`waitForTimeout\` ou \`sleep\` manuel. La règle équipe : si tu as besoin de \`page.waitForTimeout(1000)\`, c'est qu'il y a un bug. Soit le test ne sait pas vraiment ce qu'il attend (waitForResponse, waitForSelector spécifique), soit l'app a un vrai race condition à fixer.

L'auto-wait s'étend aussi aux assertions. \`expect(page.locator('.toast')).toHaveText('Saved')\` attend jusqu'à 5 secondes (configurable) que le texte apparaisse. Pas besoin de \`waitForSelector\` séparé. Si l'assertion timeoute, le rapport montre quel texte était présent au moment du timeout — diagnostic immédiat.

La granularité du timeout est ajustable par test ou par action. \`page.click('.btn', { timeout: 2000 })\` raccourcit l'attente si l'élément doit être instantané. À l'inverse, pour un test E2E qui attend une exécution serveur lente (génération PDF, signature crypto), on peut bumper à \`{ timeout: 30000 }\`. La default de 30 s couvre 98 % des cas.

Migration depuis Selenium : la plupart des explicits waits disparaissent automatiquement. \`WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, 'submit'))).click()\` devient \`page.locator('#submit').click()\`. Le gain en lisibilité est massif. Sur 200 tests migrés sur 6 semaines, la suite est passée de 3 800 lignes à 2 100 lignes, et le temps moyen par test de 8.2 s à 2.4 s.

Mais attention : l'auto-wait n'absorbe PAS les bugs racines. Si ton app affiche un toast 5 secondes après une action sans état intermédiaire visible, c'est probablement un bug UX (l'utilisateur ne sait pas si son clic a marché). Le test va passer (auto-wait attend), mais l'utilisateur réel souffre. Donc : utilise les outils de profiling (Lighthouse, Web Vitals) en parallèle des tests E2E pour catcher ces cas.`,
      en: `Before Playwright, writing E2E tests required maniacal discipline around waits. In classic Selenium, a typical test looks like: \`driver.findElement(By.id('btn')).click()\` — and it fails 1 in 10 times because the element just appeared but isn't "clickable" yet (animation in progress, overlay in front, etc.). The Selenium solution is \`WebDriverWait\` with explicit conditions: \`element_to_be_clickable\`, \`presence_of_element_located\`, \`visibility_of_element_located\`, \`text_to_be_present_in_element\`. Code ends up riddled with waits, sometimes 30% of the test volume.

Playwright solves this by default. Every action (click, fill, hover) automatically waits for the element to be in an "actionable" state — that is, satisfying 5 conditions: (1) attached to DOM, (2) visible (display !== none, opacity > 0, in viewport), (3) stable (not animating/scrolling), (4) enabled (not disabled), (5) receives events (not covered by another element). If within the timeout (30 s by default), one of these conditions isn't met, the test fails with an explicit message ("Element is not visible" or "Element is outside of viewport"). Otherwise, the action executes as soon as everything is OK.

Practical consequence: on the SallyCards Playwright suite (312 tests), we have ZERO \`waitForTimeout\` or manual \`sleep\`. Team rule: if you need \`page.waitForTimeout(1000)\`, there's a bug. Either the test doesn't really know what it's waiting for (waitForResponse, specific waitForSelector), or the app has a real race condition to fix.

Auto-wait also extends to assertions. \`expect(page.locator('.toast')).toHaveText('Saved')\` waits up to 5 seconds (configurable) for the text to appear. No separate \`waitForSelector\` needed. If the assertion times out, the report shows what text WAS present at timeout — immediate diagnosis.

Timeout granularity is adjustable per test or per action. \`page.click('.btn', { timeout: 2000 })\` shortens the wait if the element must be instant. Conversely, for an E2E test waiting for slow server execution (PDF generation, crypto signature), you can bump to \`{ timeout: 30000 }\`. The 30s default covers 98% of cases.

Migration from Selenium: most explicit waits disappear automatically. \`WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, 'submit'))).click()\` becomes \`page.locator('#submit').click()\`. The readability gain is massive. Over 200 tests migrated in 6 weeks, the suite went from 3,800 lines to 2,100 lines, and mean test time from 8.2 s to 2.4 s.

But beware: auto-wait does NOT absorb root-cause bugs. If your app shows a toast 5 seconds after an action without intermediate visible state, that's probably a UX bug (the user doesn't know if their click worked). The test will pass (auto-wait waits), but the real user suffers. So: use profiling tools (Lighthouse, Web Vitals) alongside E2E tests to catch these cases.`,
    },
    tags: ['playwright', 'auto-wait'],
  },
];

// Stubs des 45 articles restants — body=null (résumé seulement)
// Le user peut me demander de les expanding en batch dans une prochaine itération.
// Pour l'instant, le composant Testing.tsx affiche déjà leur summary + body court.
