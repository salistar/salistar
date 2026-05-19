# -*- coding: utf-8 -*-
"""
Generateur de contenu pour la bibliotheque technique de salistar.com.

Entrees : kb.py (CV) + tk_*.py (40 technologies) + tk_ai.py (20 articles IA).
Sorties :
  app/content/tech/<slug>.json   { slug,name,category,role,commands,articles[] }
  app/content/ai/<slug>.json     { slug,title,subtitle,blocks[] }
  app/lib/catalog.json           index global (CV + arborescence)

Chaque "bullet" du KB (fait technique reel) est developpe en paragraphe
substantiel ; 5 articles approfondis par techno (angles distincts) +
1 article IA detaille par sujet. Aucun lorem : la substance vient du KB,
l'expanseur ajoute un cadrage technique/operationnel coherent.
"""
import json, os, re, importlib

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, ".."))
OUT_TECH = os.path.join(ROOT, "app", "content", "tech")
OUT_AI = os.path.join(ROOT, "app", "content", "ai")
OUT_LIB = os.path.join(ROOT, "app", "lib")

from kb import CV
from tk_ai import AI

TECH = {}
for mod in ("tk_cicd", "tk_containers", "tk_iac", "tk_lang", "tk_cloud",
            "tk_obs", "tk_sec", "tk_test"):
    TECH.update(importlib.import_module(mod).TECH)


def slugify(s):
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


# Connecteurs de cadrage : ajoutent une portee technique/operationnelle reelle
# autour de chaque fait du KB (pourquoi, consequence, lien CI-CD / bancaire).
WHY = [
    "Concretement, ce point conditionne la fiabilite et la reproductibilite de toute la chaine de livraison : un ecart ici se propage a l'ensemble des environnements.",
    "En pratique, c'est un facteur direct de stabilite en production et de reduction du temps de diagnostic lorsqu'un incident survient.",
    "Bien maitrise, cet aspect reduit les interventions manuelles et securise les cycles de deploiement, ce qui est precisement l'objectif d'une demarche DevOps mature.",
    "Ignore, il devient une source recurrente d'incidents difficiles a tracer, car la cause racine est souvent loin du symptome observe.",
    "C'est l'un des leviers les plus rentables pour fiabiliser des environnements multi-equipes ou la moindre divergence de configuration coute cher.",
    "Dans un contexte reglemente (bancaire / PCI DSS), c'est aussi une exigence d'auditabilite : ce qui n'est pas tracable n'est pas conforme.",
    "Ce point fait souvent la difference entre une plateforme que l'on subit et une plateforme que l'on pilote.",
    "Le negliger revient a accumuler une dette technique invisible jusqu'au jour ou elle bloque une livraison critique.",
]
IMPACT = [
    "L'impact se mesure directement sur les indicateurs DORA : lead time, frequence de deploiement, taux d'echec des changements et MTTR.",
    "L'effet est tangible sur le temps de mise en production et sur la qualite percue par les equipes de developpement.",
    "Le retour sur investissement apparait des les premiers cycles de livraison automatises, puis se compose dans la duree.",
    "La consequence est une plateforme plus previsible, plus sure et nettement moins couteuse a operer au quotidien.",
    "C'est precisement ce qui distingue une automatisation robuste d'un assemblage fragile de scripts difficilement maintenable.",
    "A l'echelle de dizaines d'applications, cet ecart de rigueur se traduit en jours d'exploitation economises chaque mois.",
    "C'est aussi un facteur de serenite pour les equipes d'astreinte, qui passent moins de nuits sur des incidents evitables.",
]
LINK = [
    "Cet element s'integre naturellement dans un pipeline industrialise, revu en code et versionne avec l'application.",
    "Il se traite comme du code : versionne, teste, et promu a l'identique d'un environnement a l'autre, sans reconstruction.",
    "Il s'inscrit dans une demarche GitOps/DevSecOps de bout en bout, ou Git reste l'unique source de verite.",
    "Il doit rester observable : expose en metriques et en alerting pour ne jamais sortir du champ de controle.",
    "Il gagne a etre standardise via un template, un role ou une bibliotheque partagee pour passer a l'echelle sans duplication.",
    "Il se documente et s'accompagne d'un runbook : la connaissance operationnelle ne doit pas dependre d'une seule personne.",
]
MECH = [
    "Sur le plan operationnel, la mise en oeuvre doit etre idempotente : pouvoir etre rejouee sans effet de bord ni divergence d'etat.",
    "Le principe directeur reste l'immuabilite : on remplace plutot qu'on modifie en place, ce qui rend chaque etat reproductible.",
    "La regle pratique est de rendre l'operation deterministe : memes entrees, meme resultat, quel que soit l'environnement.",
    "Le bon reflexe est de separer clairement configuration et code, et d'externaliser tout ce qui varie par environnement.",
    "Il convient d'appliquer le moindre privilege : n'accorder que les droits strictement necessaires a l'execution.",
    "L'approche saine consiste a echouer vite et explicitement plutot qu'a masquer une erreur qui resurgira plus tard.",
]
RISK = [
    "Le risque, sinon, est une derive silencieuse de configuration entre environnements (le fameux 'ca marche chez moi').",
    "A defaut, on s'expose a des deploiements non reproductibles, impossibles a rejouer a l'identique en cas d'incident.",
    "Sans cette discipline, le rollback devient incertain, ce qui allonge dangereusement le temps de reprise en cas de panne.",
    "Neglige, ce point cree un point de defaillance unique et une dependance a la connaissance tacite d'un individu.",
    "L'absence de maitrise ici se paie en incidents de production et en perte de confiance dans la chaine de livraison.",
    "Le danger est d'introduire une faille de securite ou une non-conformite qui ne sera detectee qu'a l'audit.",
]
PRACT = [
    "En mise en oeuvre, on commence par le formaliser dans un environnement de recette avant toute promotion vers la production.",
    "La regle d'or est de valider ce comportement par un test automatise qui echoue explicitement en cas de regression.",
    "Concretement, on l'inscrit dans la revue de code et dans la definition of done de l'equipe, pas dans une procedure orale.",
    "On le rend mesurable : un indicateur dedie dans le tableau de bord permet d'en suivre l'evolution dans le temps.",
    "Le bon niveau d'automatisation consiste a ce qu'aucune action manuelle non tracee ne soit necessaire pour le garantir.",
    "On documente la decision et son contexte afin qu'un nouvel arrivant puisse la comprendre sans solliciter l'auteur.",
]

CASES = {
    "CI/CD": "Sur le projet Worldline OMS (modules XMLCONV, BWB Web Statements, FileNet Archiving), ce type de mise en oeuvre a permis d'industrialiser des pipelines multi-environnements (Dev/Recette/Prod) avec build, tests, packaging et rollbacks automatises, contribuant a la reduction de 40% du temps de deploiement.",
    "GitOps": "Sur la plateforme GitOps multi-clusters Kubernetes, cette approche a fait de Git l'unique source de verite : promotion par Pull Request revue, reconciliation continue et rollback par git revert, pour une conformite continue en environnement bancaire.",
    "Conteneurisation": "Pour les microservices bancaires haute disponibilite (Worldline / Societe Generale Maroc), la containerisation et l'orchestration Kubernetes/Helm ont standardise les deploiements et fiabilise des plateformes traitant des millions de transactions par jour.",
    "IaC & Config": "En mission Groupe Rocher (VISEO) et chez Sylob, le provisioning automatise (Terraform) et la configuration (Ansible) ont permis de reconstruire des environnements complets de maniere reproductible, automatisant 90% des flux et reduisant de 70% les interventions manuelles.",
    "Langages / Scripting": "L'automatisation du provisioning et de l'orchestration SSH multi-serveurs (12+ noeuds) ainsi que des outils internes haute performance se sont appuyes sur ce socle, fiabilisant l'exploitation a grande echelle.",
    "Cloud": "Sur des environnements multi-cloud (AWS/GCP/Hetzner), ce socle a servi a provisionner des infrastructures completes reproductibles et a operer des clusters Kubernetes manages de maniere homogene.",
    "Monitoring / Observ.": "La mise en place de dashboards Grafana/ELK et de tests synthetiques a reduit de 70% le temps de detection d'incidents et accru de 80% la visibilite operationnelle sur les KPI infra et applicatifs.",
    "Securite DevSecOps": "Integre aux pipelines bancaires (HPS PowerCARD, conformite PCI DSS), ce controle a permis de bloquer en amont vulnerabilites et regressions, renforcant la gestion des secrets et le durcissement (RBAC).",
    "Tests automatises": "Les suites automatisees (Robot Framework, Cypress, JMeter, Postman) integrees aux pipelines ont atteint 85% de couverture et reduit de 60% les bugs en production sur des plateformes a forte volumetrie transactionnelle.",
}

INTRO_ANGLE = {
    "fondamentaux": "Cet article pose les fondamentaux et l'architecture de {name}. Comprendre ces mecanismes est le prerequis pour l'exploiter de maniere fiable, et non comme une boite noire.",
    "install": "Cet article detaille l'installation et la configuration de {name} selon une approche industrialisee : reproductible, versionnee et prete pour la production des le depart.",
    "cicd": "Cet article montre comment integrer {name} dans une chaine CI/CD : ou il intervient, comment le rendre fiable, et comment il accelere et securise la livraison.",
    "prod": "Cet article traite de {name} en production : scalabilite, haute disponibilite et securite, avec les exigences propres aux environnements reglementes.",
    "ops": "Cet article rassemble le depannage et les bonnes pratiques de {name} : les pieges recurrents, leurs symptomes, et les principes qui evitent la dette operationnelle.",
}


def para(bullet, name, cat, i, off):
    """Developpe un fait du KB en paragraphe technique substantiel."""
    if bullet.lstrip().startswith("```") or bullet.startswith("    "):
        return {"type": "code", "lines": [bullet]}
    sent = bullet.strip()
    if not sent.endswith("."):
        sent += "."
    k = i + off
    text = "%s %s %s %s %s %s %s" % (
        sent,
        WHY[k % len(WHY)],
        MECH[k % len(MECH)],
        RISK[(k + 1) % len(RISK)],
        PRACT[(k + 3) % len(PRACT)],
        IMPACT[(k + 2) % len(IMPACT)],
        LINK[(k + 1) % len(LINK)],
    )
    return {"type": "p", "text": text}


SECTION_INTRO = {
    "Concepts et architecture": "Avant toute mise en oeuvre, il faut un modele mental correct de {name}. Les points suivants constituent la base sans laquelle l'outil reste une boite noire fragile.",
    "Installation et configuration": "Une installation 'qui marche' ne suffit pas : viser des le depart une mise en place reproductible, versionnee et conforme aux contraintes de production.",
    "Integration CI/CD et automatisation": "L'interet de {name} se revele pleinement une fois integre a un pipeline automatise. Voici comment l'y inserer de maniere fiable.",
    "Production, scalabilite et fiabilite": "En production, les exigences changent d'echelle : disponibilite, charge, reprise. Les principes ci-dessous evitent les mauvaises surprises.",
    "Securite et durcissement": "La securite n'est pas une option ajoutee a la fin : elle se conçoit des l'architecture, surtout en environnement reglemente.",
    "Pieges courants et depannage": "La plupart des incidents proviennent d'un petit nombre d'erreurs recurrentes. Les reconnaitre tot fait gagner un temps considerable.",
    "Bonnes pratiques eprouvees": "Ces principes condensent l'experience operationnelle : ils ne sont pas theoriques mais issus de ce qui evite reellement les incidents.",
}


def section(heading, bullets, name, cat, start, off):
    blocks = [{"type": "h2", "text": heading}]
    intro = SECTION_INTRO.get(heading)
    if intro:
        blocks.append({"type": "p", "text": intro.format(name=name)})
    for j, b in enumerate(bullets):
        blocks.append(para(b, name, cat, start + j, off))
    return blocks, start + len(bullets)


def commands_section(commands):
    blocks = [{"type": "h2", "text": "Resume des commandes essentielles"}]
    blocks.append({"type": "p", "text": "Aide-memoire operationnel des commandes et configurations les plus utilisees au quotidien. Chaque entree indique la commande puis son role."})
    blocks.append({"type": "cmds", "items": [{"cmd": c, "desc": d} for c, d in commands]})
    return blocks


def build_article(tech, slug_t, angle, title, subtitle, sections, off, with_cmds=False):
    name = tech["name"]
    cat = tech["category"]
    blocks = []
    blocks.append({"type": "lead", "text": INTRO_ANGLE[angle].format(name=name)})
    blocks.append({"type": "h2", "text": "Role : que fait %s ?" % name})
    blocks.append({"type": "p", "text": tech["role"]})
    blocks.append({"type": "p", "text": (
        "Cet article fait partie d'une serie de cinq consacree a %s, abordant "
        "successivement les fondamentaux, l'installation, l'integration CI/CD, "
        "la production et le depannage. Chaque volet est autonome et orienté "
        "pratique d'ingenierie." % name)})
    idx = 0
    for h, bl in sections:
        sb, idx = section(h, bl, name, cat, idx, off)
        blocks += sb
    if with_cmds:
        blocks += commands_section(tech["commands"])
    blocks.append({"type": "h2", "text": "Cas concret (contexte projet)"})
    blocks.append({"type": "p", "text": CASES.get(cat, "") + " " + IMPACT[idx % len(IMPACT)]})
    blocks.append({"type": "h2", "text": "Synthese : bonnes pratiques"})
    for k, b in enumerate(tech["practices"]):
        blocks.append({"type": "li", "text": b})
    blocks.append({"type": "h2", "text": "Conclusion"})
    blocks.append({"type": "p", "text": (
        "Maitriser %s ne se limite pas a connaitre des commandes : il s'agit de "
        "l'integrer dans une demarche d'ingenierie reproductible, observable et "
        "securisee. Applique avec rigueur, %s devient un levier mesurable de "
        "fiabilite et de velocite des cycles de livraison." % (name, name))})
    return {"slug": slug_t, "title": title, "subtitle": subtitle, "blocks": blocks}


def gen_tech(slug, tech):
    name = tech["name"]
    off = sum(ord(c) for c in slug) % 7
    arts = []
    arts.append(build_article(
        tech, "fondamentaux", "fondamentaux",
        "%s : fondamentaux et architecture" % name,
        "Le modele mental indispensable pour exploiter %s sans le subir" % name,
        [("Concepts et architecture", tech["concepts"]),
         ("Pieges courants et depannage", tech["pitfalls"])],
        off,
    ))
    arts.append(build_article(
        tech, "installation", "install",
        "Installer et configurer %s (approche industrialisee)" % name,
        "Une mise en place reproductible, versionnee et prete pour la production",
        [("Installation et configuration", tech["install"]),
         ("Concepts et architecture", tech["concepts"][:4])],
        off + 1, with_cmds=True,
    ))
    arts.append(build_article(
        tech, "cicd", "cicd",
        "%s dans une chaine CI/CD" % name,
        "Ou %s intervient dans le pipeline, et comment le rendre fiable" % name,
        [("Integration CI/CD et automatisation", tech["cicd"]),
         ("Bonnes pratiques eprouvees", tech["practices"])],
        off + 2,
    ))
    arts.append(build_article(
        tech, "production", "prod",
        "%s en production : scalabilite et securite" % name,
        "Haute disponibilite, mise a l'echelle et durcissement",
        [("Production, scalabilite et fiabilite", tech["prod"]),
         ("Securite et durcissement", tech["security"])],
        off + 3,
    ))
    arts.append(build_article(
        tech, "depannage", "ops",
        "%s : depannage et bonnes pratiques" % name,
        "Pieges recurrents, symptomes et principes qui evitent la dette",
        [("Pieges courants et depannage", tech["pitfalls"]),
         ("Bonnes pratiques eprouvees", tech["practices"])],
        off + 4,
    ))
    data = {
        "slug": slug, "name": name, "category": tech["category"],
        "role": tech["role"],
        "commands": [{"cmd": c, "desc": d} for c, d in tech["commands"]],
        "articles": arts,
    }
    with open(os.path.join(OUT_TECH, slug + ".json"), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    return data


def gen_ai(slug, a):
    blocks = [{"type": "lead", "text": a["subtitle"] + "."}]
    blocks.append({"type": "p", "text": (
        "Cet article fait partie d'une serie de vingt analyses approfondies sur "
        "l'intelligence artificielle generative et son industrialisation. "
        "L'angle retenu est resolument ingenierie : ce qui fait fonctionner "
        "ces systemes en production, leurs limites et leur gouvernance.")})
    idx = 0
    for h, bullets in a["sections"]:
        blocks.append({"type": "h2", "text": h})
        for b in bullets:
            sent = b.strip()
            if not sent.endswith("."):
                sent += "."
            text = "%s %s %s %s %s" % (
                sent,
                WHY[idx % len(WHY)],
                MECH[idx % len(MECH)],
                RISK[idx % len(RISK)],
                IMPACT[idx % len(IMPACT)],
            )
            blocks.append({"type": "p", "text": text})
            idx += 1
    blocks.append({"type": "h2", "text": "Ce qu'il faut retenir"})
    blocks.append({"type": "p", "text": (
        "L'IA generative n'est pas une formule magique mais un systeme a "
        "ingenierie : donnees, evaluation, securite, coût et observabilite "
        "decident du succes en production. Les principes ci-dessus forment "
        "une base solide pour concevoir des systemes IA fiables et gouvernes.")})
    data = {"slug": slug, "title": a["title"], "subtitle": a["subtitle"], "blocks": blocks}
    with open(os.path.join(OUT_AI, slug + ".json"), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    return data


def main():
    os.makedirs(OUT_TECH, exist_ok=True)
    os.makedirs(OUT_AI, exist_ok=True)
    os.makedirs(OUT_LIB, exist_ok=True)

    cats = {}
    tech_index = []
    for slug, tech in TECH.items():
        d = gen_tech(slug, tech)
        cats.setdefault(tech["category"], []).append(
            {"slug": slug, "name": tech["name"], "role": tech["role"]})
        tech_index.append({
            "slug": slug, "name": tech["name"], "category": tech["category"],
            "role": tech["role"],
            "articles": [{"slug": x["slug"], "title": x["title"],
                          "subtitle": x["subtitle"]} for x in d["articles"]],
        })

    ai_index = []
    for key, a in AI.items():
        slug = slugify(key)
        gen_ai(slug, a)
        ai_index.append({"slug": slug, "title": a["title"], "subtitle": a["subtitle"]})

    catalog = {
        "generatedAt": "2026-05-19",
        "cv": CV,
        "categories": [
            {"name": c, "techs": sorted(cats[c], key=lambda x: x["name"])}
            for c in cats
        ],
        "techIndex": sorted(tech_index, key=lambda x: x["name"]),
        "ai": ai_index,
        "counts": {
            "technologies": len(tech_index),
            "techArticles": len(tech_index) * 5,
            "aiArticles": len(ai_index),
        },
    }
    with open(os.path.join(OUT_LIB, "catalog.json"), "w", encoding="utf-8") as f:
        json.dump(catalog, f, ensure_ascii=False, indent=1)

    nb_words = 0
    for fn in os.listdir(OUT_TECH):
        with open(os.path.join(OUT_TECH, fn), encoding="utf-8") as f:
            nb_words += len(f.read().split())
    print("OK technologies:", len(tech_index),
          "| tech articles:", len(tech_index) * 5,
          "| AI articles:", len(ai_index),
          "| approx words (tech json):", nb_words)


if __name__ == "__main__":
    main()
