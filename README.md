# salistar — Idriss Kriouile · Personal Portfolio

[![Deploy](https://github.com/salistar/salistar/actions/workflows/deploy.yml/badge.svg)](https://github.com/salistar/salistar/actions/workflows/deploy.yml)

Personal portfolio of **Idriss Kriouile** (founder of SallyStar), live at **https://salistar.com**.

Showcases the SallyStar project portfolio with a dedicated section on **SallyCards** — a suite of 11 mobile card games for the MENA region.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Runtime | React 19 |
| Styling | Tailwind CSS 4 + custom design system |
| Icons | Lucide React |
| Build | Docker multi-stage (standalone output) |
| CI/CD | GitHub Actions → ghcr.io → Hetzner VPS |
| Edge | Cloudflare Tunnel + DNS + WAF + CDN |
| Hosting | Hetzner CPX22 (shared with SallyCards backoffice) |

## Architecture

```
Internet
   │
   ▼
Cloudflare (DNS + CDN + WAF + SSL)
   │
   ▼
Cloudflare Tunnel
   │
   ├── salistar.com               → :4001  (this repo, salistar-portfolio)
   ├── sallycards.salistar.com    → :4000  (sallycards-backoffice repo, web app)
   ├── api.salistar.com           → :3000  (sallycards-backoffice repo, NestJS API)
   ├── ws.salistar.com            → :3001  (sallycards-backoffice repo, Socket.IO)
   ├── mongo.salistar.com         → :8083  (sallycards-backoffice repo, mongo-express)
   └── redis.salistar.com         → :8082  (sallycards-backoffice repo, redis-auth-proxy)
   │
   ▼
Hetzner CPX22 (single VPS)
```

`salistar.com` and `sallycards.salistar.com` are **two distinct apps** running side by side:

- `salistar.com` = this portfolio (Next.js, port 4001 internal)
- `sallycards.salistar.com` = SallyCards web app (Next.js, port 4000 internal)

## Local development

```bash
# Install
npm install

# Run dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build
npm start
```

## Pipeline CI/CD

Every push to `main` automatically:

1. Builds a Docker image (Next.js standalone, multi-stage, ~120 MB)
2. Pushes to `ghcr.io/salistar/salistar-portfolio:latest`
3. SSHs to the Hetzner VPS, pulls the image, restarts the container
4. Purges Cloudflare cache
5. Runs a health check on https://salistar.com

End-to-end pipeline: ~3-5 minutes from `git push` to live.

## Required GitHub secrets

Configure under **Settings → Secrets and variables → Actions**:

| Secret | Source |
|---|---|
| `VPS_HOST` | `91.99.70.43` (shared with sallycards-backoffice) |
| `VPS_USER` | `deploy` |
| `VPS_SSH_KEY` | Same private key as sallycards-backoffice |
| `GHCR_PAT` | GitHub PAT (`read:packages` + `write:packages`) |
| `CF_ZONE_ID` | Cloudflare → salistar.com → Overview |
| `CF_API_TOKEN` | Cloudflare → My Profile → API Tokens (Zone:Cache Purge) |

## On the VPS

```bash
# One-time setup
ssh deploy@91.99.70.43
mkdir -p ~/apps && cd ~/apps
git clone git@github.com:salistar/salistar.git
cd salistar

# First start (manual, then GHA takes over)
echo "${GHCR_PAT}" | docker login ghcr.io -u salistar --password-stdin
docker compose up -d
```

The Cloudflare Tunnel must route `salistar.com` → `http://localhost:4001`. Update `/etc/cloudflared/config.yml` if needed.

## Project structure

```
.
├── app/
│   ├── layout.tsx              ← root layout, metadata, fonts
│   ├── page.tsx                ← homepage composition
│   ├── globals.css             ← design system tokens + animations
│   └── components/
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Experience.tsx
│       ├── Projects.tsx
│       ├── SallyCardsShowcase.tsx  ← featured project section
│       ├── Skills.tsx
│       ├── Contact.tsx
│       └── Footer.tsx
├── public/
│   └── favicon.svg
├── Dockerfile
├── docker-compose.yml
├── .github/workflows/deploy.yml
├── reports/
│   └── salistar-portfolio-deploy-report.pdf
├── package.json
└── README.md
```

## Costs

This portfolio adds **€0/month** to the existing infrastructure (it shares the Hetzner VPS that already hosts SallyCards backoffice). The whole stack — portfolio + 8-container backoffice — costs **~€10/month total**.

## Contact

- 📧 Email: salistarcompany@gmail.com
- 🐙 GitHub: https://github.com/salistar
- 🌐 Portfolio: https://salistar.com
- 📱 SallyCards: https://sallycards.salistar.com

## License

© Idriss Kriouile — All rights reserved.
