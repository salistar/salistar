# -*- coding: utf-8 -*-
"""
CV trilingue (FR / EN / AR) — profil unifie :
DevOps / Test QA Manager / Tech Lead DevOps & QA.
Source unique pour le web (catalog.json) et les PDF (gen_cv_pdf.py).
"""

CONTACT = {
    "email": "Idriss.kriouile.pro@gmail.com",
    "phone": "+212 661 917 995",
    "location": {"fr": "Sala Al-Jadida, Maroc", "en": "Sala Al-Jadida, Morocco",
                 "ar": "سلا الجديدة، المغرب"},
    "linkedin": "linkedin.com/in/idriss-kriouile",
    "github": "github.com/idriss-kriouile",
    "org": "github.com/salistar",
    "site": "salistar.com",
}

NAME = {"fr": "Idriss Kriouile", "en": "Idriss Kriouile", "ar": "إدريس كريويل"}

TITLE = {
    "fr": "DevOps Senior · Test QA Manager · Tech Lead DevOps & QA",
    "en": "Senior DevOps · Test QA Manager · DevOps & QA Tech Lead",
    "ar": "مهندس DevOps أول · مدير اختبار الجودة · قائد تقني DevOps و QA",
}

STATUS = {
    "fr": "Disponible sous 1 mois — Casablanca / tout le Maroc · Mobilite & remote",
    "en": "Available within 1 month — Casablanca / all Morocco · Mobile & remote",
    "ar": "متاح خلال شهر — الدار البيضاء / كل المغرب · تنقل وعمل عن بعد",
}

PROFILE = {
    "fr": (
        "Ingenieur DevOps & Tech Lead avec +8 ans d'experience couvrant la "
        "conception de pipelines CI/CD, l'automatisation des tests (QA), "
        "l'industrialisation et l'exploitation d'infrastructures cloud natives "
        "pour des environnements bancaires et grands comptes (Worldline, "
        "Societe Generale Maroc, HPS, Groupe Rocher). Double expertise DevOps "
        "et Test QA Management : Jenkins, GitLab CI, GitHub Actions, Kubernetes, "
        "Helm, GitOps (ArgoCD/Flux), Terraform, Ansible d'un cote ; strategie de "
        "test, Robot Framework, Playwright, Cypress, Selenium, JMeter, Postman "
        "et integration QA dans les pipelines de l'autre. Encadrement d'equipes, "
        "demarche local -> GitHub -> CI/CD -> Cloud, -70% interventions "
        "manuelles, -40% temps de deploiement, -60% bugs en production. "
        "Trilingue FR/EN/AR."
    ),
    "en": (
        "DevOps Engineer & Tech Lead with 8+ years spanning CI/CD pipeline "
        "design, test automation (QA), industrialization and operation of "
        "cloud-native infrastructure for banking and enterprise environments "
        "(Worldline, Societe Generale Morocco, HPS, Groupe Rocher). Dual DevOps "
        "and Test QA Management expertise: Jenkins, GitLab CI, GitHub Actions, "
        "Kubernetes, Helm, GitOps (ArgoCD/Flux), Terraform, Ansible on one side; "
        "test strategy, Robot Framework, Playwright, Cypress, Selenium, JMeter, "
        "Postman and QA-in-pipeline on the other. Team leadership, a clear "
        "local -> GitHub -> CI/CD -> Cloud delivery flow, -70% manual work, "
        "-40% deployment time, -60% production bugs. Trilingual FR/EN/AR."
    ),
    "ar": (
        "مهندس DevOps وقائد تقني بخبرة تفوق 8 سنوات تشمل تصميم خطوط CI/CD، "
        "وأتمتة الاختبارات (QA)، وتصنيع وتشغيل بنى سحابية أصلية لبيئات بنكية "
        "ومؤسسات كبرى (Worldline، سوسيتيه جنرال المغرب، HPS، مجموعة روشيه). "
        "خبرة مزدوجة في DevOps وإدارة اختبار الجودة: Jenkins وGitLab CI "
        "وGitHub Actions وKubernetes وHelm وGitOps (ArgoCD/Flux) وTerraform "
        "وAnsible؛ بالإضافة إلى استراتيجية الاختبار وRobot Framework "
        "وPlaywright وCypress وSelenium وJMeter وPostman ودمج QA في الخطوط. "
        "قيادة فرق، ونهج local ← GitHub ← CI/CD ← السحابة، وخفض 70% من "
        "التدخلات اليدوية و40% من زمن النشر و60% من أخطاء الإنتاج. "
        "يتقن الفرنسية والإنجليزية والعربية."
    ),
}

# (categorie_fr/en/ar, contenu_fr/en/ar)
SKILLS = [
    (("CI/CD", "CI/CD", "CI/CD"),
     ("Jenkins, GitLab CI/CD, GitHub Actions, pipelines multi-stages, canary/blue-green, Groovy shared libraries",
      "Jenkins, GitLab CI/CD, GitHub Actions, multi-stage pipelines, canary/blue-green, Groovy shared libraries",
      "Jenkins، GitLab CI/CD، GitHub Actions، خطوط متعددة المراحل، canary/blue-green، مكتبات Groovy")),
    (("Test & QA", "Test & QA", "الاختبار وضمان الجودة"),
     ("Strategie de test, Robot Framework, Playwright, Cypress, Selenium, JMeter, Postman, QA dans CI/CD, gestion d'equipe QA",
      "Test strategy, Robot Framework, Playwright, Cypress, Selenium, JMeter, Postman, QA-in-CI/CD, QA team management",
      "استراتيجية الاختبار، Robot Framework، Playwright، Cypress، Selenium، JMeter، Postman، QA في CI/CD، إدارة فريق QA")),
    (("GitOps & Conteneurs", "GitOps & Containers", "GitOps والحاويات"),
     ("ArgoCD, Flux, Docker, Kubernetes, Helm, K3s, Harbor, registres prives",
      "ArgoCD, Flux, Docker, Kubernetes, Helm, K3s, Harbor, private registries",
      "ArgoCD، Flux، Docker، Kubernetes، Helm، K3s، Harbor، سجلات خاصة")),
    (("IaC & Cloud", "IaC & Cloud", "البنية ككود والسحابة"),
     ("Terraform, Ansible, Pulumi, Vault, AWS, GCP, Azure, Hetzner, OVH",
      "Terraform, Ansible, Pulumi, Vault, AWS, GCP, Azure, Hetzner, OVH",
      "Terraform، Ansible، Pulumi، Vault، AWS، GCP، Azure، Hetzner، OVH")),
    (("Observabilite", "Observability", "المراقبة"),
     ("Prometheus, Grafana, ELK, Loki, Datadog, alerting, SLO/SLI",
      "Prometheus, Grafana, ELK, Loki, Datadog, alerting, SLO/SLI",
      "Prometheus، Grafana، ELK، Loki، Datadog، التنبيهات، SLO/SLI")),
    (("Securite & Langages", "Security & Languages", "الأمن واللغات"),
     ("DevSecOps, SonarQube, Trivy, PCI DSS ; Python, Go, Bash, PowerShell, Groovy, TypeScript, Java",
      "DevSecOps, SonarQube, Trivy, PCI DSS ; Python, Go, Bash, PowerShell, Groovy, TypeScript, Java",
      "DevSecOps، SonarQube، Trivy، PCI DSS؛ Python، Go، Bash، PowerShell، Groovy، TypeScript، Java")),
]

EXPERIENCE = [
    {
        "company": "ALTEN — Rabat",
        "period": {"fr": "Juin 2024 — Present", "en": "Jun 2024 — Present",
                   "ar": "يونيو 2024 — الآن"},
        "role": {"fr": "Senior DevOps / Tech Lead Automation & QA",
                 "en": "Senior DevOps / Automation & QA Tech Lead",
                 "ar": "DevOps أول / قائد تقني للأتمتة وQA"},
        "bullets": {
            "fr": [
                "WORLDLINE (OMS) — Tech Lead DevOps/QA : pipelines Jenkins & GitLab CI (XMLCONV, BWB, FileNet).",
                "SOCIETE GENERALE MAROC (Manor) — Chef d'equipe monitoring / Product Owner.",
                "Containerisation Docker, orchestration Kubernetes/Helm, environnements bancaires HA.",
                "Pipelines multi-environnements (Dev/Recette/Prod) : build, tests, packaging, rollbacks.",
                "Encadrement de 8 ingenieurs, -40% temps de deploiement.",
                "Robot Framework (XMLCONV, ISO 8583), Postman/REST Assured, charge JMeter.",
                "8 dashboards Grafana/ELK, -70% temps de detection d'incidents.",
            ],
            "en": [
                "WORLDLINE (OMS) — DevOps/QA Tech Lead: Jenkins & GitLab CI pipelines (XMLCONV, BWB, FileNet).",
                "SOCIETE GENERALE MOROCCO (Manor) — Monitoring team lead / Product Owner.",
                "Docker containerization, Kubernetes/Helm orchestration, HA banking environments.",
                "Multi-environment pipelines (Dev/Staging/Prod): build, tests, packaging, rollbacks.",
                "Led 8 engineers, -40% deployment time.",
                "Robot Framework (XMLCONV, ISO 8583), Postman/REST Assured, JMeter load.",
                "8 Grafana/ELK dashboards, -70% incident detection time.",
            ],
            "ar": [
                "WORLDLINE (OMS) — قائد تقني DevOps/QA: خطوط Jenkins وGitLab CI (XMLCONV، BWB، FileNet).",
                "سوسيتيه جنرال المغرب (Manor) — قائد فريق المراقبة / Product Owner.",
                "حاويات Docker، تنسيق Kubernetes/Helm، بيئات بنكية عالية التوافر.",
                "خطوط متعددة البيئات (تطوير/اختبار/إنتاج): بناء، اختبارات، تعبئة، تراجع.",
                "قيادة 8 مهندسين، خفض 40% من زمن النشر.",
                "Robot Framework (XMLCONV، ISO 8583)، Postman/REST Assured، حِمل JMeter.",
                "8 لوحات Grafana/ELK، خفض 70% من زمن كشف الحوادث.",
            ],
        },
    },
    {
        "company": "VISEO — Casablanca (Groupe Rocher)",
        "period": {"fr": "Sept 2023 — Avr 2024", "en": "Sep 2023 — Apr 2024",
                   "ar": "سبتمبر 2023 — أبريل 2024"},
        "role": {"fr": "Consultant Senior DevOps / Cloud",
                 "en": "Senior DevOps / Cloud Consultant",
                 "ar": "استشاري DevOps / سحابة أول"},
        "bullets": {
            "fr": [
                "Pipelines GitLab CI & Jenkins pour 12 applications Spring Boot sur Kubernetes.",
                "Automatisation de 90% des flux test/deploiement (Ansible, Docker, K8s), -70% manuel.",
                "Provisioning Terraform + Ansible (multi-environnements AWS).",
                "15 dashboards ELK, +80% visibilite ; charge JMeter (3000+ utilisateurs).",
            ],
            "en": [
                "GitLab CI & Jenkins pipelines for 12 Spring Boot apps on Kubernetes.",
                "90% test/deploy flow automation (Ansible, Docker, K8s), -70% manual.",
                "Terraform + Ansible provisioning (multi-environment AWS).",
                "15 ELK dashboards, +80% visibility; JMeter load (3000+ users).",
            ],
            "ar": [
                "خطوط GitLab CI وJenkins لـ12 تطبيق Spring Boot على Kubernetes.",
                "أتمتة 90% من تدفقات الاختبار/النشر (Ansible، Docker، K8s)، خفض 70% يدوي.",
                "توفير Terraform + Ansible (بيئات AWS متعددة).",
                "15 لوحة ELK، رفع الرؤية 80%؛ حِمل JMeter (أكثر من 3000 مستخدم).",
            ],
        },
    },
    {
        "company": "SYLOB (FORTERRO)",
        "period": {"fr": "Aout 2022 — Sept 2023", "en": "Aug 2022 — Sep 2023",
                   "ar": "غشت 2022 — سبتمبر 2023"},
        "role": {"fr": "Ingenieur DevOps Senior & QA",
                 "en": "Senior DevOps & QA Engineer",
                 "ar": "مهندس DevOps وQA أول"},
        "bullets": {
            "fr": [
                "Chaine CI/CD complete (Docker, K8s, GitLab CI, Ansible, Terraform/AWS) — 100% automatise.",
                "Tests Cypress & Robot Framework (85%), -60% bugs ; API Postman/SoapUI (2M+ tx/jour).",
                "Deploiement multi-environnements, -35% incidents post-deploiement.",
            ],
            "en": [
                "Full CI/CD chain (Docker, K8s, GitLab CI, Ansible, Terraform/AWS) — 100% automated.",
                "Cypress & Robot Framework tests (85%), -60% bugs; Postman/SoapUI API (2M+ tx/day).",
                "Multi-environment deployment, -35% post-deploy incidents.",
            ],
            "ar": [
                "سلسلة CI/CD كاملة (Docker، K8s، GitLab CI، Ansible، Terraform/AWS) — أتمتة 100%.",
                "اختبارات Cypress وRobot Framework (85%)، خفض 60% أخطاء؛ Postman/SoapUI (2M+ معاملة/يوم).",
                "نشر متعدد البيئات، خفض 35% من حوادث ما بعد النشر.",
            ],
        },
    },
    {
        "company": "HPS (Hightech Payment Systems)",
        "period": {"fr": "Sept 2021 — Aout 2022", "en": "Sep 2021 — Aug 2022",
                   "ar": "سبتمبر 2021 — غشت 2022"},
        "role": {"fr": "Ingenieur DevOps / Test Automation — Monetique",
                 "en": "DevOps / Test Automation Engineer — Payments",
                 "ar": "مهندس DevOps / أتمتة الاختبار — أنظمة الدفع"},
        "bullets": {
            "fr": [
                "Pipelines Jenkins pour PowerCARD (ISO 8583) ; PCI DSS (secrets, RBAC, durcissement).",
                "Robot Framework (flux XML/monetique, 5 banques, 1M+ tx/jour) ; Postman/SoapUI.",
                "200+ incidents critiques resolus (SLA 98%).",
            ],
            "en": [
                "Jenkins pipelines for PowerCARD (ISO 8583); PCI DSS (secrets, RBAC, hardening).",
                "Robot Framework (XML/payment flows, 5 banks, 1M+ tx/day); Postman/SoapUI.",
                "200+ critical incidents resolved (98% SLA).",
            ],
            "ar": [
                "خطوط Jenkins لـPowerCARD (ISO 8583)؛ PCI DSS (أسرار، RBAC، تحصين).",
                "Robot Framework (تدفقات XML/الدفع، 5 بنوك، أكثر من مليون معاملة/يوم)؛ Postman/SoapUI.",
                "حل أكثر من 200 حادث حرج (SLA 98%).",
            ],
        },
    },
]

EDUCATION = {
    "fr": [
        "Cycle Ingenieur Informatique — UIR, Rabat (2018-2021)",
        "Ecole d'Ingenieur ECAM Louis de Broglie — Bruz, France (2012-2014)",
        "Ecole d'Ingenieur EFREI — Villejuif, France (2010-2012)",
    ],
    "en": [
        "Computer Engineering — UIR, Rabat (2018-2021)",
        "Engineering School ECAM Louis de Broglie — Bruz, France (2012-2014)",
        "Engineering School EFREI — Villejuif, France (2010-2012)",
    ],
    "ar": [
        "هندسة المعلوميات — UIR، الرباط (2018-2021)",
        "مدرسة الهندسة ECAM Louis de Broglie — بروز، فرنسا (2012-2014)",
        "مدرسة الهندسة EFREI — فيلجويف، فرنسا (2010-2012)",
    ],
}

LANGUAGES = {
    "fr": "Arabe (maternelle) · Francais (courant) · Anglais (courant)",
    "en": "Arabic (native) · French (fluent) · English (fluent)",
    "ar": "العربية (الأم) · الفرنسية (بطلاقة) · الإنجليزية (بطلاقة)",
}

# Libelles de sections (CV + PDF)
LABELS = {
    "profile": {"fr": "Profil", "en": "Profile", "ar": "الملف"},
    "skills": {"fr": "Competences techniques", "en": "Technical skills",
               "ar": "المهارات التقنية"},
    "experience": {"fr": "Experiences professionnelles",
                   "en": "Professional experience", "ar": "الخبرات المهنية"},
    "education": {"fr": "Formation", "en": "Education", "ar": "التكوين"},
    "languages": {"fr": "Langues", "en": "Languages", "ar": "اللغات"},
    "status": {"fr": "Disponibilite", "en": "Availability", "ar": "التوفر"},
    "download": {"fr": "Telecharger le CV (PDF)",
                 "en": "Download CV (PDF)", "ar": "تحميل السيرة (PDF)"},
}


def cv_for(lang):
    return {
        "lang": lang,
        "name": NAME[lang],
        "title": TITLE[lang],
        "status": STATUS[lang],
        "profile": PROFILE[lang],
        "contact": {
            "email": CONTACT["email"], "phone": CONTACT["phone"],
            "location": CONTACT["location"][lang],
            "linkedin": CONTACT["linkedin"], "github": CONTACT["github"],
            "org": CONTACT["org"], "site": CONTACT["site"],
        },
        "skills": [{"cat": c[0][_i(lang)], "items": c[1][_i(lang)]} for c in SKILLS],
        "experience": [{
            "company": e["company"], "period": e["period"][lang],
            "role": e["role"][lang], "bullets": e["bullets"][lang],
        } for e in EXPERIENCE],
        "education": EDUCATION[lang],
        "languages": LANGUAGES[lang],
        "labels": {k: v[lang] for k, v in LABELS.items()},
    }


def _i(lang):
    return {"fr": 0, "en": 1, "ar": 2}[lang]


CV_I18N = {l: cv_for(l) for l in ("fr", "en", "ar")}
