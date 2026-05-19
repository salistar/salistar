# -*- coding: utf-8 -*-
"""
Knowledge base for the salistar.com technical library.

Each technology entry provides REAL, curated technical substance:
  role        : what the technology does (~100 words, factual)
  commands    : real CLI / config cheat-sheet  [(cmd, description), ...]
  concepts    : core architecture & concepts bullets
  install     : installation & configuration bullets
  cicd        : CI/CD & automation integration bullets
  prod        : production, scaling & reliability bullets
  security    : security / hardening bullets
  pitfalls    : troubleshooting & common pitfalls bullets
  practices   : best practices bullets

The generator (gen.py) expands these into 5 deep articles per technology.
Bullets are written as real technical statements (no filler).
"""

CV = {
    "name": "Idriss Kriouile",
    "first": "Idriss",
    "last": "Kriouile",
    "title": "Senior DevOps Engineer / Tech Lead Automation",
    "status": "Disponible sous 1 mois — Casablanca / tout le Maroc",
    "profile": (
        "Ingenieur DevOps Senior avec +8 ans d'experience dans la conception, "
        "l'industrialisation et la maintenance de pipelines CI/CD et d'infrastructures "
        "cloud natives pour des environnements bancaires et grands comptes (Worldline, "
        "Societe Generale Maroc, HPS, Groupe Rocher). Expert Jenkins, GitLab CI/CD, "
        "GitHub Actions, Docker, Kubernetes, Helm et GitOps (ArgoCD, Flux). Solides "
        "competences en scripting Python, Go, Bash, PowerShell et en Infrastructure as "
        "Code (Terraform, Ansible). Capacite reconnue a encadrer des equipes techniques "
        "et a fiabiliser les cycles de livraison (-70% interventions manuelles, -40% "
        "temps de deploiement). Trilingue FR/EN/AR."
    ),
    "contact": {
        "email": "Idriss.kriouile.pro@gmail.com",
        "phone": "+212 661 917 995",
        "location": "Sala Al-Jadida, Maroc",
        "linkedin": "linkedin.com/in/idriss-kriouile",
        "github": "github.com/idriss-kriouile",
        "org": "github.com/salistar",
        "site": "salistar.com",
    },
    "skills": [
        ("CI/CD", "Jenkins, GitLab CI/CD, GitHub Actions, pipelines multi-stages, deploiements canary/blue-green, Groovy (Jenkins shared libraries)"),
        ("GitOps", "ArgoCD, Flux, gestion declarative multi-clusters, synchronisation Git -> Kubernetes"),
        ("Conteneurisation", "Docker, Kubernetes, Helm, Docker Compose, K3s, Harbor, registres prives"),
        ("IaC & Config", "Terraform, Ansible, Pulumi, gestion des secrets (Vault, Sealed Secrets)"),
        ("Langages / Scripting", "Python, Go, Bash, PowerShell, Groovy, JavaScript/TypeScript, Java"),
        ("Cloud", "AWS, GCP, Azure, Hetzner, OVH"),
        ("Monitoring / Observ.", "Prometheus, Grafana, ELK Stack, Datadog, Loki, alerting"),
        ("Securite DevSecOps", "SAST/DAST, SonarQube, Trivy, gestion secrets, RBAC, PCI DSS"),
        ("Tests automatises", "Robot Framework, Playwright, Cypress, Selenium, JMeter, Postman"),
        ("Methodologies", "Agile/Scrum, DevSecOps, SRE, GitOps, TDD/BDD"),
    ],
    "experience": [
        {
            "company": "ALTEN — Rabat, Maroc",
            "period": "Juin 2024 — Present",
            "role": "Senior DevOps Engineer / Tech Lead Automation",
            "bullets": [
                "WORLDLINE (Projet OMS) — Tech Lead DevOps / QA : pipelines CI/CD Jenkins & GitLab CI (XMLCONV, BWB Web Statements, FileNet Archiving).",
                "SOCIETE GENERALE MAROC (Projet Manor) — Chef d'Equipes Monitoring / Product Owner.",
                "Containerisation des microservices via Docker, orchestration Kubernetes, deploiements Helm pour environnements bancaires haute disponibilite.",
                "Industrialisation des pipelines multi-environnements (Dev/Recette/Prod) : build, tests, packaging, livraison automatisee, rollbacks.",
                "Automatisation du provisioning et de l'orchestration SSH multi-serveurs (12+ noeuds) via Python et Bash ; outils internes en Go.",
                "Encadrement de 8 ingenieurs sur 3 projets simultanes, -40% temps de deploiement.",
                "Tests Robot Framework (XMLCONV, ISO 8583), tests API Postman/REST Assured, charge JMeter.",
                "8 dashboards Grafana / ELK, -70% temps de detection d'incidents ; synthetic tests continus.",
                "Formation de 20+ collaborateurs (30h+) en CI/CD, conteneurisation et pratiques DevOps.",
            ],
        },
        {
            "company": "VISEO — Casablanca (Groupe Rocher, France)",
            "period": "Sept 2023 — Avril 2024",
            "role": "Consultant Senior DevOps / Cloud — Mission Groupe Rocher",
            "bullets": [
                "Industrialisation de pipelines GitLab CI et Jenkins pour 12 applications Spring Boot sur Kubernetes.",
                "Automatisation de 90% des flux de tests et deploiement (Ansible, Docker, Kubernetes, GitLab CI), -70% interventions manuelles.",
                "Provisioning cloud via Terraform et configuration via Ansible (multi-environnements AWS).",
                "15 dashboards KPI ELK Stack, +80% visibilite operationnelle ; charge JMeter (3000+ utilisateurs).",
            ],
        },
        {
            "company": "SYLOB (FORTERRO) — Maroc",
            "period": "Aout 2022 — Sept 2023",
            "role": "Ingenieur DevOps Senior & Integrateur",
            "bullets": [
                "Chaine CI/CD complete (Docker, Kubernetes, GitLab CI, Ansible, Terraform/AWS) — 100% du cycle automatise.",
                "Deploiement multi-environnements (Recette/Pre-prod/Prod), -35% incidents post-deploiement.",
                "Tests automatises Cypress & Robot Framework (85%), -60% bugs en production ; API Postman/SoapUI (2M+ transactions/jour).",
            ],
        },
        {
            "company": "HPS (Hightech Payment Systems) — Casablanca",
            "period": "Sept 2021 — Aout 2022",
            "role": "Ingenieur DevOps / Test Automation — Monetique",
            "bullets": [
                "Industrialisation des pipelines Jenkins pour PowerCARD (paiements ISO 8583).",
                "Containerisation des environnements de test via Docker ; PowerShell & Python multi-OS.",
                "Bonnes pratiques PCI DSS dans les pipelines (secrets, durcissement, RBAC).",
                "200+ incidents critiques resolus (SLA 98%), plateformes 1M+ transactions/jour pour 5 banques.",
            ],
        },
        {
            "company": "Experiences anterieures",
            "period": "2014 — 2021",
            "role": "Orange Business Services / Lafarge Maroc",
            "bullets": [
                "Orange Business Services (2021) — Migration Angular/Django + ELK, pipelines CI/CD, tests de regression.",
                "Lafarge Maroc (2014-2018) — Developpeur Full-Stack, 3 applications web/mobile, chaine CI/CD integree.",
            ],
        },
    ],
    "education": [
        "Ecole Superieure d'Informatique et du Numerique – UIR, Rabat | 2018-2021 — Cycle Ingenieur Informatique",
        "Ecole d'Ingenieur ECAM Louis de Broglie – Bruz, France | 2012-2014",
        "Ecole d'Ingenieur EFREI – Villejuif, France | 2010-2012",
    ],
    "languages": "Arabe (maternelle) - Francais (courant) - Anglais (courant)",
}
