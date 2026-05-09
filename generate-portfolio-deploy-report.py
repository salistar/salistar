"""
Genere le rapport PDF complet du deploiement salistar.com
(portfolio Idriss Kriouile) sur Hetzner + Cloudflare via GitHub Actions.
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, Preformatted
)
import os

styles = getSampleStyleSheet()

PRIMARY = HexColor("#F5B13A")
ACCENT  = HexColor("#EC5990")
SUCCESS = HexColor("#5CD2C4")
DANGER  = HexColor("#C0392B")
WARN    = HexColor("#D68910")
CODE_BG = HexColor("#0F1525")
CODE_FG = HexColor("#E7E9EE")
NOTE_BG = HexColor("#FFF8E1")

title_style = ParagraphStyle("Title", parent=styles["Title"], fontSize=24, leading=28,
    textColor=PRIMARY, spaceAfter=12, alignment=TA_CENTER)
subtitle_style = ParagraphStyle("Subtitle", parent=styles["Normal"], fontSize=11, leading=14,
    textColor=HexColor("#555"), alignment=TA_CENTER, spaceAfter=18)
h1 = ParagraphStyle("H1", parent=styles["Heading1"], fontSize=16, leading=20,
    textColor=PRIMARY, spaceBefore=18, spaceAfter=10, fontName="Helvetica-Bold")
h2 = ParagraphStyle("H2", parent=styles["Heading2"], fontSize=13, leading=16,
    textColor=ACCENT, spaceBefore=12, spaceAfter=6, fontName="Helvetica-Bold")
h3 = ParagraphStyle("H3", parent=styles["Heading3"], fontSize=11, leading=14,
    textColor=PRIMARY, spaceBefore=8, spaceAfter=4, fontName="Helvetica-Bold")
body = ParagraphStyle("Body", parent=styles["Normal"], fontSize=10, leading=14,
    spaceAfter=6, alignment=TA_JUSTIFY)
note_style = ParagraphStyle("Note", parent=body, backColor=NOTE_BG, borderColor=WARN,
    borderWidth=0.5, borderPadding=8, leftIndent=4, rightIndent=4)
ok_style = ParagraphStyle("OK", parent=body, backColor=HexColor("#E8F8F0"), borderColor=SUCCESS,
    borderWidth=0.5, borderPadding=8, leftIndent=4, rightIndent=4)
code_style = ParagraphStyle("Code", parent=styles["Code"], fontSize=8.5, leading=11,
    fontName="Courier", textColor=CODE_FG, backColor=CODE_BG, borderColor=HexColor("#2A3551"),
    borderWidth=0.5, borderPadding=8, leftIndent=4, rightIndent=4, spaceAfter=8)


def code(text):
    return Preformatted(text, code_style)
def note(text):
    return Paragraph(text, note_style)
def ok(text):
    return Paragraph(text, ok_style)


os.makedirs("reports", exist_ok=True)
out = "reports/salistar-portfolio-deploy-report.pdf"

doc = SimpleDocTemplate(out, pagesize=A4, leftMargin=2*cm, rightMargin=2*cm,
    topMargin=2*cm, bottomMargin=2*cm,
    title="salistar.com Portfolio Deploy Report",
    author="Idriss Kriouile")
story = []

# ===== Cover =====
story.append(Paragraph("salistar.com", title_style))
story.append(Paragraph("Portfolio Idriss Kriouile - Deploiement complet du repo a la prod",
    subtitle_style))
story.append(Spacer(1, 0.4*cm))
story.append(ok(
    "Ce rapport documente la creation, le deploiement et l'exposition du site portfolio "
    "<b>salistar.com</b> (Next.js 15 + React 19 + Tailwind CSS 4) sur l'infrastructure existante "
    "Hetzner + Cloudflare. Le site partage le meme VPS que SallyCards backoffice (zero cout "
    "supplementaire) mais tourne dans un container isole sur un port dedie."
))
story.append(Spacer(1, 0.3*cm))
story.append(Paragraph("<b>Repo</b> : github.com/salistar/salistar", body))
story.append(Paragraph("<b>URL prod</b> : https://salistar.com", body))
story.append(Paragraph("<b>VPS</b> : Hetzner CPX22, 91.99.70.43 (Nuremberg)", body))
story.append(Paragraph("<b>Container</b> : ghcr.io/salistar/salistar-portfolio:latest", body))
story.append(Paragraph("<b>Port interne</b> : 4001 (sallycards.salistar.com reste sur 4000)", body))

# ===== Architecture =====
story.append(PageBreak())
story.append(Paragraph("1. Architecture et separation des sites", h1))

story.append(Paragraph(
    "Avant ce deploiement, <b>salistar.com</b> et <b>sallycards.salistar.com</b> pointaient "
    "tous les deux vers le meme container Next.js (port 4000) — c'etait redondant. "
    "Apres ce deploiement, ce sont <b>deux apps distinctes</b> tournant cote a cote sur le meme VPS :",
    body))

story.append(code("""
                              Internet
                                 |
                                 v
                  +-------------------------+
                  |  Cloudflare DNS+CDN+WAF |
                  +-----------+-------------+
                              |
                  Cloudflare Tunnel (sallycards-prod)
                              |
        +---------------------+--------------------+
        |                                          |
        v                                          v
  +------------+                          +-----------------+
  | salistar.com| -> :4001                | sallycards...   | -> :4000
  | (this repo) |                         | api., ws., etc. |
  +------------+                          +-----------------+
        |                                          |
        v                                          v
  Container:                              Containers:
  salistar-portfolio                      sallycards-{api,socket,web,
  (Next.js portfolio)                      mongo,redis,mongo-express,
                                           redis-commander,
                                           redis-auth-proxy}
"""))

story.append(Spacer(1, 0.2*cm))
story.append(Paragraph("Repartition des routes Cloudflare Tunnel apres reconfiguration :", h3))

routes_data = [
    ["URL", "Container interne", "Port", "Repo source"],
    ["salistar.com",                    "salistar-portfolio",        "4001", "salistar/salistar"],
    ["sallycards.salistar.com",         "sallycards-web",            "4000", "salistar/sallycards-backoffice"],
    ["api.salistar.com",                "sallycards-api",            "3000", "salistar/sallycards-backoffice"],
    ["ws.salistar.com",                 "sallycards-socket",         "3001", "salistar/sallycards-backoffice"],
    ["mongo.salistar.com",              "mongo-express",             "8083", "salistar/sallycards-backoffice"],
    ["redis.salistar.com",              "redis-auth-proxy (nginx)",  "8082", "salistar/sallycards-backoffice"],
    ["turn.salistar.com",               "(VPS WebRTC separe)",       "3478", "salistar/sallycards-turn-stun"],
]
t = Table(routes_data, colWidths=[5.2*cm, 4.8*cm, 1.4*cm, 4.8*cm])
t.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), PRIMARY),
    ("TEXTCOLOR", (0,0), (-1,0), white),
    ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
    ("FONTSIZE", (0,0), (-1,-1), 8.5),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("GRID", (0,0), (-1,-1), 0.3, HexColor("#999")),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [white, HexColor("#F6F8FA")]),
    ("LEFTPADDING", (0,0), (-1,-1), 5),
    ("RIGHTPADDING", (0,0), (-1,-1), 5),
    ("TOPPADDING", (0,0), (-1,-1), 5),
    ("BOTTOMPADDING", (0,0), (-1,-1), 5),
]))
story.append(t)

# ===== Stack technique =====
story.append(PageBreak())
story.append(Paragraph("2. Stack technique du portfolio", h1))

stack_data = [
    ["Couche", "Technologie", "Role"],
    ["Framework",       "Next.js 15 (App Router)",       "SSR + static optimization, output 'standalone' pour Docker"],
    ["UI",              "React 19",                       "Server Components + Client Components mix"],
    ["Styling",         "Tailwind CSS 4 + design system","Tokens custom (couleurs accent gold/pink/cyan), animations CSS pure"],
    ["Icons",           "Lucide React",                   "SVG icons sourcees, tree-shakeable"],
    ["Container",       "Docker multi-stage",             "Image finale ~120 MB (alpine + standalone)"],
    ["Registry",        "GitHub Container Registry",      "ghcr.io/salistar/salistar-portfolio:latest"],
    ["CI/CD",           "GitHub Actions",                 "build + push + deploy + cache purge + health check"],
    ["Hosting",         "Hetzner CPX22",                  "VPS partage avec sallycards-backoffice (zero cout extra)"],
    ["Edge",            "Cloudflare Tunnel",              "Aucun port public expose sur le VPS"],
    ["DNS / SSL",       "Cloudflare",                     "Cert auto, WAF, DDoS protection (gratuit)"],
]
t = Table(stack_data, colWidths=[3.5*cm, 4.5*cm, 8.0*cm])
t.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), PRIMARY),
    ("TEXTCOLOR", (0,0), (-1,0), white),
    ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
    ("FONTSIZE", (0,0), (-1,-1), 8.5),
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("GRID", (0,0), (-1,-1), 0.3, HexColor("#999")),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [white, HexColor("#F6F8FA")]),
    ("LEFTPADDING", (0,0), (-1,-1), 5),
    ("RIGHTPADDING", (0,0), (-1,-1), 5),
    ("TOPPADDING", (0,0), (-1,-1), 5),
    ("BOTTOMPADDING", (0,0), (-1,-1), 5),
]))
story.append(t)

# ===== Sections du site =====
story.append(PageBreak())
story.append(Paragraph("3. Contenu du portfolio", h1))

sections_data = [
    ["Section", "Composant", "Contenu"],
    ["Navbar",       "Navbar.tsx",            "Logo IK, navigation links, bouton CTA, mobile menu"],
    ["Hero",         "Hero.tsx",               "Headline, sous-titre, CTAs, stats (11 jeux, 8 containers, 5 ans, 24/7)"],
    ["About",        "About.tsx",              "Bio + 3 piliers (product mindset, full-stack, ship fast)"],
    ["Experience",   "Experience.tsx",         "Timeline 2022 → 2026 avec roles, descriptions, tags"],
    ["Projects",     "Projects.tsx",           "Cartes pour SallyRecruit, Sallyescapegeo, Darijabot, goWithSally"],
    ["SallyCards",   "SallyCardsShowcase.tsx", "Section dediee : 6 features, 6 URLs, 8 containers, 11 jeux mobile"],
    ["Skills",       "Skills.tsx",             "6 groupes de tags : languages, frontend, backend, DBs, infra, tools"],
    ["Contact",      "Contact.tsx",            "CTA email + GitHub avec design carte premium"],
    ["Footer",       "Footer.tsx",             "Logo + copyright + credits stack technique"],
]
t = Table(sections_data, colWidths=[3.0*cm, 4.2*cm, 8.8*cm])
t.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), ACCENT),
    ("TEXTCOLOR", (0,0), (-1,0), white),
    ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
    ("FONTNAME", (1,1), (1,-1), "Courier-Bold"),
    ("FONTSIZE", (0,0), (-1,-1), 8.5),
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("GRID", (0,0), (-1,-1), 0.3, HexColor("#999")),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [white, HexColor("#F6F8FA")]),
    ("LEFTPADDING", (0,0), (-1,-1), 5),
    ("RIGHTPADDING", (0,0), (-1,-1), 5),
    ("TOPPADDING", (0,0), (-1,-1), 5),
    ("BOTTOMPADDING", (0,0), (-1,-1), 5),
]))
story.append(t)

story.append(Spacer(1, 0.3*cm))
story.append(Paragraph("Design system :", h3))
story.append(Paragraph(
    "Background sombre <code>#0a0e1a</code> avec orbes lumineux (gold + rose + cyan) en flou, "
    "grille subtile 64x64px, typographie sans-serif, accents avec dégradés à 3 couleurs. "
    "Animations CSS pure : fade-in, slide-in, float, glow. "
    "Toutes les cartes ont un effet 'gradient-border' qui s'illumine au hover.",
    body))

# ===== Pipeline CI/CD =====
story.append(PageBreak())
story.append(Paragraph("4. Pipeline CI/CD GitHub Actions", h1))

story.append(code("""
git push origin main (PC)
   |
   v
[GitHub] salistar/salistar
   |
   v
[GitHub Actions] .github/workflows/deploy.yml
   |
   +-> Job 1 : build (~3 min)
   |    - actions/checkout@v4
   |    - docker/setup-buildx-action@v3
   |    - docker/login-action@v3 (ghcr.io)
   |    - docker/build-push-action@v6 (cache GHA)
   |    -> push ghcr.io/salistar/salistar-portfolio:latest + :sha
   |
   +-> Job 2 : deploy (~30 sec)
   |    - appleboy/ssh-action@v1
   |    - SSH deploy@91.99.70.43
   |    - cd ~/apps/salistar
   |    - git fetch + reset --hard origin/main
   |    - docker login ghcr.io
   |    - docker compose pull
   |    - docker compose up -d
   |    - docker image prune
   |
   +-> Job 3 : cloudflare-purge (~5 sec)
   |    - curl POST /zones/$ZONE/purge_cache
   |
   +-> Job 4 : health-check (~30 sec)
        - sleep 30
        - curl -fsS -I https://salistar.com
   |
   v
[salistar.com] Live en prod
"""))

story.append(Spacer(1, 0.2*cm))
story.append(Paragraph("Secrets GitHub Actions (reutilises depuis sallycards-backoffice) :", h3))
secrets_data = [
    ["Secret", "Valeur / Source"],
    ["VPS_HOST", "91.99.70.43"],
    ["VPS_USER", "deploy"],
    ["VPS_SSH_KEY", "(meme cle privee SSH que sallycards-backoffice)"],
    ["GHCR_PAT", "GitHub PAT scope read:packages + write:packages"],
    ["CF_ZONE_ID", "386f5368b7795d737e5d789bec5f1b61"],
    ["CF_API_TOKEN", "Cloudflare token Cache Purge"],
]
t = Table(secrets_data, colWidths=[4*cm, 12*cm])
t.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), PRIMARY),
    ("TEXTCOLOR", (0,0), (-1,0), white),
    ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
    ("FONTNAME", (0,1), (0,-1), "Courier-Bold"),
    ("FONTSIZE", (0,0), (-1,-1), 9),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("GRID", (0,0), (-1,-1), 0.3, HexColor("#999")),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [white, HexColor("#F6F8FA")]),
    ("LEFTPADDING", (0,0), (-1,-1), 5),
    ("RIGHTPADDING", (0,0), (-1,-1), 5),
    ("TOPPADDING", (0,0), (-1,-1), 5),
    ("BOTTOMPADDING", (0,0), (-1,-1), 5),
]))
story.append(t)

# ===== Etapes de deploiement =====
story.append(PageBreak())
story.append(Paragraph("5. Etapes de deploiement (chronologie)", h1))

steps = [
    ("1. Creation du projet local",
     "mkdir C:\\Users\\21266\\Desktop\\sdk52\\salistar puis copie de package.json, tsconfig.json, "
     "next.config.ts, postcss.config.js, app/layout.tsx, app/page.tsx, app/components/* (9 fichiers), "
     "app/globals.css, public/favicon.svg."),
    ("2. Configuration Docker",
     "Ecriture du Dockerfile multi-stage (builder Alpine + runner Alpine, output standalone "
     "Next.js, user nodejs non-root, port 3000 expose). Ecriture .dockerignore."),
    ("3. Configuration docker-compose",
     "Service salistar-portfolio bind sur 127.0.0.1:4001 (port externe vers cloudflared) -> "
     "3000 interne (port Next.js). Image ghcr.io/salistar/salistar-portfolio:latest, restart always."),
    ("4. Workflow GitHub Actions",
     ".github/workflows/deploy.yml avec 4 jobs : build, deploy, cloudflare-purge, health-check. "
     "Trigger sur push main + paths du repo + workflow_dispatch."),
    ("5. README + .gitignore + .gitattributes + favicon",
     "README detaille avec architecture, stack, dev local, secrets requis. "
     ".gitattributes pour forcer LF sur les .sh / .yml / Dockerfile. Favicon SVG personnalise."),
    ("6. git init + push vers GitHub",
     "git init -b main + git add -A + git commit + git remote add origin "
     "github.com/salistar/salistar.git + git push -u origin main --force."),
    ("7. Configuration secrets GHA",
     "Reutilisation des secrets existants (VPS_HOST, VPS_USER, VPS_SSH_KEY, GHCR_PAT, "
     "CF_ZONE_ID, CF_API_TOKEN) via gh secret set --repo salistar/salistar."),
    ("8. Setup VPS",
     "ssh deploy@91.99.70.43 + git clone (deploy key reutilisee) + creation du dossier "
     "~/apps/salistar + premier docker compose pull + up -d."),
    ("9. Reconfiguration Cloudflare Tunnel",
     "Edit /etc/cloudflared/config.yml : route salistar.com vers http://localhost:4001 "
     "(au lieu de :4000 qui restait pour sallycards-web). Restart cloudflared."),
    ("10. Verification end-to-end",
     "curl -I https://salistar.com -> HTTP 200 (nouveau portfolio). "
     "curl -I https://sallycards.salistar.com -> HTTP 200 (web app inchangee)."),
]
data = [["#", "Etape", "Detail"]] + [[str(i+1), s[0].split('. ',1)[1], s[1]] for i, s in enumerate(steps)]
t = Table(data, colWidths=[0.6*cm, 4.2*cm, 11.2*cm])
t.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), PRIMARY),
    ("TEXTCOLOR", (0,0), (-1,0), white),
    ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
    ("FONTSIZE", (0,0), (-1,-1), 8.5),
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("GRID", (0,0), (-1,-1), 0.3, HexColor("#999")),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [white, HexColor("#F6F8FA")]),
    ("LEFTPADDING", (0,0), (-1,-1), 5),
    ("RIGHTPADDING", (0,0), (-1,-1), 5),
    ("TOPPADDING", (0,0), (-1,-1), 5),
    ("BOTTOMPADDING", (0,0), (-1,-1), 5),
]))
story.append(t)

# ===== Couts =====
story.append(PageBreak())
story.append(Paragraph("6. Couts", h1))

cost_data = [
    ["Poste", "Cout"],
    ["VPS Hetzner CPX22 (deja paye, partage avec sallycards-backoffice)", "EUR 0 / mois additionnel"],
    ["Trafic reseau (inclus dans les 20 TB du VPS)",                       "EUR 0"],
    ["GitHub Actions (2000 min/mois gratuites)",                            "EUR 0"],
    ["GitHub Container Registry (gratuit pour repos publics)",              "EUR 0"],
    ["Cloudflare DNS + CDN + WAF + SSL + Tunnel",                           "EUR 0"],
    ["Domaine salistar.com (deja achete)",                                  "EUR 0 supplementaire"],
    ["", ""],
    ["TOTAL ADDITIONNEL", "EUR 0 / mois"],
]
t = Table(cost_data, colWidths=[10*cm, 6*cm])
t.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), PRIMARY),
    ("TEXTCOLOR", (0,0), (-1,0), white),
    ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
    ("FONTNAME", (0,-1), (-1,-1), "Helvetica-Bold"),
    ("BACKGROUND", (0,-1), (-1,-1), HexColor("#E8F8F0")),
    ("FONTSIZE", (0,0), (-1,-1), 9),
    ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
    ("GRID", (0,0), (-1,-2), 0.3, HexColor("#999")),
    ("ROWBACKGROUNDS", (0,1), (-1,-2), [white, HexColor("#F6F8FA")]),
    ("LEFTPADDING", (0,0), (-1,-1), 5),
    ("RIGHTPADDING", (0,0), (-1,-1), 5),
    ("TOPPADDING", (0,0), (-1,-1), 5),
    ("BOTTOMPADDING", (0,0), (-1,-1), 5),
]))
story.append(t)

story.append(Spacer(1, 0.3*cm))
story.append(ok(
    "<b>Cout total infrastructure</b> (sallycards-backoffice + salistar-portfolio + domaine + "
    "TURN/STUN sur autre VPS) : environ <b>EUR 15 / mois</b> tout compris."
))

# ===== Recap final =====
story.append(PageBreak())
story.append(Paragraph("7. Recap final - URLs et commandes", h1))

story.append(Paragraph("Toutes les URLs production :", h3))
story.append(code("""
# Portfolio Idriss Kriouile (ce repo)
https://salistar.com

# SallyCards (sallycards-backoffice repo)
https://sallycards.salistar.com    -> Web app (Next.js)
https://api.salistar.com/api/v1    -> NestJS API
https://ws.salistar.com            -> Socket.IO server
https://mongo.salistar.com         -> Mongo Express (Basic Auth)
https://redis.salistar.com         -> Redis Commander (Basic Auth via nginx sidecar)

# Repos GitHub
https://github.com/salistar/salistar                  -> ce portfolio
https://github.com/salistar/sallycards-backoffice     -> backend SallyCards
https://github.com/salistar/sallycards-* (11 repos)   -> 11 jeux mobile
"""))

story.append(Paragraph("Commandes operationnelles :", h3))
story.append(code("""
# Deployer une nouvelle version (depuis le PC)
git push origin main
# -> 5 min plus tard, c'est en prod sur https://salistar.com

# Voir les logs en live (sur le VPS)
ssh deploy@91.99.70.43
cd ~/apps/salistar
docker compose logs -f --tail 100

# Redemarrer le container
docker compose restart salistar-portfolio

# Statistiques ressources
docker stats salistar-portfolio

# Revoir la config Cloudflare Tunnel
sudo cat /etc/cloudflared/config.yml
sudo systemctl status cloudflared
"""))

story.append(Spacer(1, 0.3*cm))
story.append(ok(
    "<b>Done.</b> Le portfolio est live sur https://salistar.com avec un design premium, "
    "deploiement automatique GitHub Actions, et separation claire avec sallycards.salistar.com. "
    "Cout additionnel : 0 EUR/mois."
))

doc.build(story)
size = os.path.getsize(out) / 1024
print(f"PDF generated: {out}")
print(f"Size: {size:.1f} KB")
