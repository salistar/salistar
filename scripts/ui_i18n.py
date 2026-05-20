# -*- coding: utf-8 -*-
"""Dictionnaire d'interface FR/EN/AR + projets (depuis l'historique)."""

UI = {
    # navigation
    "nav.home": {"fr": "Accueil", "en": "Home", "ar": "الرئيسية"},
    "nav.cv": {"fr": "CV", "en": "Resume", "ar": "السيرة"},
    "nav.projects": {"fr": "Projets", "en": "Projects", "ar": "المشاريع"},
    "nav.library": {"fr": "Bibliotheque", "en": "Library", "ar": "المكتبة"},
    "nav.articles": {"fr": "Articles", "en": "Articles", "ar": "المقالات"},
    "nav.ia": {"fr": "IA", "en": "AI", "ar": "الذكاء الاصطناعي"},
    "nav.contact": {"fr": "Contact", "en": "Contact", "ar": "اتصل"},
    "nav.back": {"fr": "Retour", "en": "Back", "ar": "رجوع"},
    # hero / home
    "hero.badge": {"fr": "Disponible pour de nouvelles opportunites",
                   "en": "Available for new opportunities",
                   "ar": "متاح لفرص جديدة"},
    "hero.hi": {"fr": "Bonjour, je suis", "en": "Hi, I'm", "ar": "مرحبا، أنا"},
    "hero.tagline": {
        "fr": "DevOps Senior · Test QA Manager · Tech Lead DevOps & QA",
        "en": "Senior DevOps · Test QA Manager · DevOps & QA Tech Lead",
        "ar": "DevOps أول · مدير اختبار الجودة · قائد تقني DevOps و QA"},
    "hero.intro": {
        "fr": "+8 ans a concevoir des pipelines CI/CD, automatiser la QA et "
              "exploiter des infrastructures cloud natives pour des "
              "environnements bancaires. Du poste local jusqu'au cloud, en "
              "passant par GitHub et le CI/CD.",
        "en": "8+ years designing CI/CD pipelines, automating QA and running "
              "cloud-native infrastructure for banking environments. From the "
              "local machine to the cloud, through GitHub and CI/CD.",
        "ar": "أكثر من 8 سنوات في تصميم خطوط CI/CD وأتمتة QA وتشغيل بنى سحابية "
              "لبيئات بنكية. من الجهاز المحلي إلى السحابة عبر GitHub وCI/CD."},
    "hero.viewcv": {"fr": "Voir le CV", "en": "View resume", "ar": "عرض السيرة"},
    "hero.contact": {"fr": "Me contacter", "en": "Contact me", "ar": "تواصل معي"},
    "home.cv.title": {"fr": "Curriculum Vitae", "en": "Resume", "ar": "السيرة الذاتية"},
    "home.cv.see": {"fr": "Voir le CV complet", "en": "See full resume",
                    "ar": "عرض السيرة كاملة"},
    "home.projects.title": {"fr": "Projets", "en": "Projects", "ar": "المشاريع"},
    "home.projects.sub": {
        "fr": "Produits, plateformes et infrastructure construits de bout en bout.",
        "en": "Products, platforms and infrastructure built end to end.",
        "ar": "منتجات ومنصات وبنية تحتية بُنيت من البداية للنهاية."},
    "home.pipeline.title": {"fr": "Du local au cloud",
                            "en": "From local to cloud", "ar": "من المحلي إلى السحابة"},
    "home.pipeline.sub": {
        "fr": "Ma demarche de livraison : developpement local, versionnement "
              "GitHub, CI/CD automatise, puis deploiement cloud.",
        "en": "My delivery flow: local development, GitHub versioning, "
              "automated CI/CD, then cloud deployment.",
        "ar": "نهج التسليم لدي: تطوير محلي، إصدار على GitHub، CI/CD مؤتمت، "
              "ثم نشر سحابي."},
    "articles.title": {"fr": "Tous les articles",
                       "en": "All articles", "ar": "كل المقالات"},
    "articles.sub": {
        "fr": "Bibliotheque technique (40 technologies x 5 articles) + 20 "
              "articles IA, regroupes ici. Filtrez par categorie ou recherchez.",
        "en": "Technical library (40 technologies x 5 articles) + 20 AI "
              "articles, gathered here. Filter by category or search.",
        "ar": "المكتبة التقنية (40 تقنية × 5 مقالات) + 20 مقالا عن الذكاء "
              "الاصطناعي مجمعة هنا. صفّ حسب الفئة أو ابحث."},
    "articles.search": {"fr": "Rechercher un article ou une technologie...",
                        "en": "Search an article or technology...",
                        "ar": "ابحث عن مقال أو تقنية..."},
    "articles.all": {"fr": "Tout", "en": "All", "ar": "الكل"},
    "articles.none": {"fr": "Aucun resultat.", "en": "No result.",
                      "ar": "لا نتائج."},
    "pipeline.local": {"fr": "Local", "en": "Local", "ar": "محلي"},
    "pipeline.local.d": {"fr": "Dev, tests unitaires, Docker, lint",
                         "en": "Dev, unit tests, Docker, lint",
                         "ar": "تطوير، اختبارات وحدة، Docker، فحص"},
    "pipeline.github": {"fr": "GitHub", "en": "GitHub", "ar": "GitHub"},
    "pipeline.github.d": {"fr": "Push, Pull Request, revue de code, versionnement",
                          "en": "Push, Pull Request, code review, versioning",
                          "ar": "Push، Pull Request، مراجعة الكود، الإصدار"},
    "pipeline.cicd": {"fr": "CI/CD", "en": "CI/CD", "ar": "CI/CD"},
    "pipeline.cicd.d": {"fr": "Build, tests, scan securite, image Docker",
                        "en": "Build, tests, security scan, Docker image",
                        "ar": "بناء، اختبارات، فحص أمني، صورة Docker"},
    "pipeline.cloud": {"fr": "Cloud", "en": "Cloud", "ar": "السحابة"},
    "pipeline.cloud.d": {"fr": "Deploiement VPS/K8s, Cloudflare, monitoring",
                         "en": "VPS/K8s deploy, Cloudflare, monitoring",
                         "ar": "نشر VPS/K8s، Cloudflare، مراقبة"},
    "footer.written": {"fr": "Redige par", "en": "Written by",
                       "ar": "بقلم"},
    "footer.profile": {"fr": "Profil", "en": "Profile", "ar": "الملف"},
    "lib.count": {
        "fr": "{t} technologies · {a} articles approfondis · resume de commandes",
        "en": "{t} technologies · {a} in-depth articles · command cheat-sheet",
        "ar": "{t} تقنية · {a} مقالا معمقا · ملخص الأوامر"},
}

# Projets compiles depuis tout l'historique (FR/EN/AR)
PROJECTS = [
    {
        "slug": "sallycards",
        "name": "SallyCards",
        "tag": {"fr": "11 jeux de cartes mobiles — MENA",
                "en": "11 mobile card games — MENA",
                "ar": "11 لعبة ورق للهاتف — MENA"},
        "desc": {
            "fr": "Suite de 11 jeux de cartes (Solitaire, Belote, Ronda, Tarot, "
                  "Scopa, Poker, Okey, Kdoub, Concentration, Qui-est-ce) en "
                  "React Native / Expo SDK 52, backend NestJS multijoueur temps "
                  "reel (Socket.IO, MongoDB, Redis, WebRTC), backoffice et "
                  "authentification Google native. 8 conteneurs en production.",
            "en": "Suite of 11 card games (Solitaire, Belote, Ronda, Tarot, "
                  "Scopa, Poker, Okey, Kdoub, Concentration, Who-is-it) in "
                  "React Native / Expo SDK 52, real-time multiplayer NestJS "
                  "backend (Socket.IO, MongoDB, Redis, WebRTC), backoffice and "
                  "native Google sign-in. 8 production containers.",
            "ar": "مجموعة من 11 لعبة ورق (Solitaire، Belote، Ronda، Tarot، "
                  "Scopa، Poker، Okey، Kdoub، Concentration، Qui-est-ce) "
                  "بـReact Native / Expo SDK 52، خادم NestJS متعدد اللاعبين "
                  "آني (Socket.IO، MongoDB، Redis، WebRTC)، لوحة تحكم وتسجيل "
                  "دخول Google. 8 حاويات في الإنتاج."},
        "stack": ["React Native", "Expo SDK 52", "NestJS", "Socket.IO",
                  "MongoDB", "Redis", "WebRTC", "Docker"],
        "url": "https://sallycards.salistar.com",
        "shot": "/projects/sallycards.jpg",
        "color": "from-[#5cd2c4] to-[#0a8aa8]",
    },
    {
        "slug": "gowithsally",
        "name": "GoWithSally",
        "tag": {"fr": "Plateforme web + backoffice + API",
                "en": "Web platform + backoffice + API",
                "ar": "منصة ويب + لوحة تحكم + API"},
        "desc": {
            "fr": "Plateforme complete (front web, backoffice, API NestJS) "
                  "conteneurisee, deployee sur VPS via GitHub Actions, "
                  "Cloudflare Tunnel et docker-compose. Refonte du site "
                  "vitrine, pipeline CI/CD GHCR, observabilite.",
            "en": "Full platform (web front, backoffice, NestJS API) "
                  "containerized, deployed to VPS via GitHub Actions, "
                  "Cloudflare Tunnel and docker-compose. Landing redesign, "
                  "GHCR CI/CD pipeline, observability.",
            "ar": "منصة كاملة (واجهة ويب، لوحة تحكم، API بـNestJS) محوسبة، "
                  "منشورة على VPS عبر GitHub Actions وCloudflare Tunnel "
                  "وdocker-compose. تجديد الموقع، خط CI/CD على GHCR، مراقبة."},
        "stack": ["NestJS", "Docker", "GitHub Actions", "Cloudflare",
                  "docker-compose", "GHCR"],
        "url": "https://gowithsally.com",
        "shot": "/projects/gowithsally.jpg",
        "color": "from-[#ec5990] to-[#b13a6f]",
    },
    {
        "slug": "salorie",
        "name": "Salorie",
        "tag": {"fr": "Site & landing", "en": "Site & landing",
                "ar": "موقع وصفحة هبوط"},
        "desc": {
            "fr": "Site Salorie (salorie-landing) deploye sous le domaine "
                  "salistar avec sous-domaine dedie, tunnel Cloudflare et "
                  "pipeline de deploiement automatise.",
            "en": "Salorie site (salorie-landing) deployed under the salistar "
                  "domain with a dedicated subdomain, Cloudflare tunnel and "
                  "automated deployment pipeline.",
            "ar": "موقع Salorie (salorie-landing) منشور تحت نطاق salistar "
                  "بنطاق فرعي مخصص ونفق Cloudflare وخط نشر مؤتمت."},
        "stack": ["Web", "Cloudflare Tunnel", "CI/CD", "VPS"],
        "url": "https://salorie.salistar.com",
        "shot": "/projects/salorie.jpg",
        "color": "from-[#f5b13a] to-[#c8861f]",
    },
    {
        "slug": "salistar-portfolio",
        "name": "Salistar Portfolio",
        "tag": {"fr": "Ce site — Next.js, CI/CD, Oracle ARM",
                "en": "This site — Next.js, CI/CD, Oracle ARM",
                "ar": "هذا الموقع — Next.js، CI/CD، Oracle ARM"},
        "desc": {
            "fr": "Portfolio (Next.js 15, Tailwind v4) conteneurise, image "
                  "Docker multi-arch (amd64+arm64) construite par GitHub "
                  "Actions, deployee sur serveur Oracle ARM via SSH, "
                  "Cloudflare et purge de cache. Inclut CV, bibliotheque "
                  "technique et articles IA.",
            "en": "Portfolio (Next.js 15, Tailwind v4) containerized, "
                  "multi-arch Docker image (amd64+arm64) built by GitHub "
                  "Actions, deployed to an Oracle ARM server via SSH, "
                  "Cloudflare and cache purge. Includes resume, technical "
                  "library and AI articles.",
            "ar": "موقع شخصي (Next.js 15، Tailwind v4) محوسب، صورة Docker "
                  "متعددة المعمارية (amd64+arm64) تُبنى عبر GitHub Actions، "
                  "وتُنشر على خادم Oracle ARM عبر SSH وCloudflare. يضم السيرة "
                  "والمكتبة التقنية ومقالات الذكاء الاصطناعي."},
        "stack": ["Next.js 15", "Tailwind v4", "Docker", "GitHub Actions",
                  "Oracle Cloud", "Cloudflare"],
        "url": "https://salistar.com",
        "shot": "/projects/salistar.jpg",
        "color": "from-[#60A5FA] to-[#2563EB]",
    },
    {
        "slug": "sally-suite",
        "name": "Sally Suite (Hifz · Words · Sudoku)",
        "tag": {"fr": "Apps mobiles educatives & jeux",
                "en": "Educational mobile apps & games",
                "ar": "تطبيقات تعليمية وألعاب"},
        "desc": {
            "fr": "Ensemble d'applications mobiles de l'ecosysteme Sally : "
                  "SallyHifz (memorisation), SallyWords (vocabulaire), "
                  "SallySudoku, SallySuite — meme socle React Native / Expo "
                  "et chaine de build partagee.",
            "en": "Set of mobile apps in the Sally ecosystem: SallyHifz "
                  "(memorization), SallyWords (vocabulary), SallySudoku, "
                  "SallySuite — shared React Native / Expo base and build "
                  "chain.",
            "ar": "مجموعة تطبيقات ضمن منظومة Sally: SallyHifz (الحفظ)، "
                  "SallyWords (المفردات)، SallySudoku، SallySuite — أساس "
                  "React Native / Expo مشترك وسلسلة بناء موحدة."},
        "stack": ["React Native", "Expo", "TypeScript", "CI/CD"],
        "url": "",
        "shot": "",
        "color": "from-[#a78bfa] to-[#7c3aed]",
    },
    {
        "slug": "infra-devops",
        "name": "Infrastructure DevOps (3 serveurs)",
        "tag": {"fr": "Multi-cloud, GitOps, tunnels, monitoring",
                "en": "Multi-cloud, GitOps, tunnels, monitoring",
                "ar": "متعدد السحابة، GitOps، أنفاق، مراقبة"},
        "desc": {
            "fr": "Exploitation de 3 serveurs de production (SallyCards, "
                  "GoWithSally, serveur Oracle TURN/STUN turn.salistar.com), "
                  "CI/CD GitHub Actions multi-projets, GitOps, tunnels "
                  "Cloudflare, registres GHCR, sauvegardes et observabilite "
                  "Prometheus/Grafana.",
            "en": "Operating 3 production servers (SallyCards, GoWithSally, "
                  "Oracle TURN/STUN server turn.salistar.com), multi-project "
                  "GitHub Actions CI/CD, GitOps, Cloudflare tunnels, GHCR "
                  "registries, backups and Prometheus/Grafana observability.",
            "ar": "تشغيل 3 خوادم إنتاج (SallyCards، GoWithSally، خادم Oracle "
                  "TURN/STUN turn.salistar.com)، CI/CD متعدد المشاريع عبر "
                  "GitHub Actions، GitOps، أنفاق Cloudflare، سجلات GHCR، نسخ "
                  "احتياطي ومراقبة Prometheus/Grafana."},
        "stack": ["GitHub Actions", "GitOps", "Cloudflare", "Docker",
                  "Prometheus", "Grafana", "Oracle Cloud", "Hetzner"],
        "url": "",
        "shot": "",
        "color": "from-[#34d399] to-[#059669]",
    },
]
