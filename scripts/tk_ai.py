# -*- coding: utf-8 -*-
"""20 articles detailles sur l'Intelligence Artificielle.

Schema: slug -> { title, subtitle, sections:[ (heading, [points...]) ] }
Le generateur developpe chaque point en paragraphe technique.
"""

AI = {
"fondamentaux-llm": {
  "title": "Fondamentaux des grands modeles de langage (LLM)",
  "subtitle": "Comment fonctionnent reellement les modeles de langage, du token a la generation",
  "sections": [
    ("Qu'est-ce qu'un LLM", [
      "Un LLM est un reseau de neurones entraine a predire le prochain token a partir d'un contexte, sur des corpus massifs (centaines de milliards de tokens).",
      "Le modele apprend une distribution de probabilite sur le vocabulaire ; la 'comprehension' emerge de la compression statistique du langage.",
      "Les capacites (raisonnement, traduction, code) emergent avec l'echelle (parametres, donnees, calcul) selon des lois d'echelle empiriques.",
      "Un LLM ne 'sait' rien au sens factuel : il modelise des correlations linguistiques, d'ou les hallucinations.",
    ]),
    ("Tokenisation et representation", [
      "Le texte est decoupe en tokens (sous-mots, ex. BPE/SentencePiece) puis projete en vecteurs (embeddings) appris.",
      "La fenetre de contexte (nombre de tokens traitables) borne ce que le modele 'voit' simultanement — facteur cle de cout et de capacite.",
      "Les positions sont encodees (rotary/ALiBi) pour que le modele tienne compte de l'ordre des tokens.",
      "Le meme texte coute differemment en tokens selon la langue — impact direct sur le cout d'inference.",
    ]),
    ("Pre-entrainement, fine-tuning, alignement", [
      "Pre-entrainement auto-supervise (prediction du token suivant) sur du texte brut : la phase la plus couteuse.",
      "Fine-tuning supervise (SFT) sur des paires instruction/reponse pour rendre le modele 'instructable'.",
      "Alignement (RLHF/DPO) pour orienter le comportement vers l'utilite et l'innocuite.",
      "Le modele de base et le modele aligne ont des comportements tres differents a prompt egal.",
    ]),
    ("Inference et parametres de generation", [
      "La generation est auto-regressive : chaque token genere est reinjecte — d'ou la latence proportionnelle a la longueur.",
      "Temperature, top-p/top-k controlent l'aleatoire ; bas = deterministe/factuel, haut = creatif/divergent.",
      "Le KV-cache evite de recalculer l'attention sur le passe — pilier de la performance d'inference.",
      "Le coût se mesure en tokens d'entree + de sortie ; la sortie est generalement plus chere.",
    ]),
    ("Limites et bonnes pratiques", [
      "Hallucinations : un LLM produit un texte plausible, pas necessairement vrai — ancrer via RAG/outils.",
      "Connaissances figees a la date d'entrainement (knowledge cutoff) — fournir le contexte a jour.",
      "Sensibilite au prompt : petites variations, grands ecarts — d'ou l'ingenierie de prompt.",
      "Toujours valider/contraindre les sorties critiques (schema, verification, garde-fous).",
    ]),
    ("Enjeux operationnels (DevOps/MLOps)", [
      "Observabilite : tracer prompts, tokens, latence, coût et taux d'echec comme des SLI.",
      "Reproductibilite : versionner prompts, modeles et parametres comme du code.",
      "Coût et latence sont les contraintes de production dominantes — caching, batching, quantization.",
      "Securite : prompt injection, fuite de donnees, dependance fournisseur a gouverner.",
    ]),
  ],
},
"architecture-transformer": {
  "title": "L'architecture Transformer en profondeur",
  "subtitle": "Attention, multi-head, normalisation : la mecanique des modeles modernes",
  "sections": [
    ("Le mecanisme d'attention", [
      "L'auto-attention calcule, pour chaque token, une combinaison ponderee des autres via des matrices Query/Key/Value.",
      "Le produit scalaire QK normalise (softmax) donne les poids d'attention : 'a quoi chaque token doit preter attention'.",
      "L'attention capture des dependances longues sans recurrence — d'ou la parallelisation massive a l'entrainement.",
      "La complexite quadratique en longueur de sequence est le principal goulot (d'ou Flash/sparse attention).",
    ]),
    ("Multi-head et profondeur", [
      "Le multi-head execute plusieurs attentions en parallele dans des sous-espaces : capture de relations variees.",
      "Les blocs (attention + feed-forward) sont empiles ; la profondeur accroit l'expressivite.",
      "Les connexions residuelles + LayerNorm stabilisent l'entrainement de reseaux tres profonds.",
      "Le feed-forward (MLP) par position constitue une grande part des parametres et du calcul.",
    ]),
    ("Variantes architecturales", [
      "Decoder-only (GPT) pour la generation ; encoder-only (BERT) pour la comprehension ; encoder-decoder (T5) pour seq2seq.",
      "Mixture-of-Experts (MoE) : seuls quelques experts s'activent par token -> plus de parametres a coût d'inference contenu.",
      "Optimisations d'attention (FlashAttention, GQA/MQA) reduisent memoire et latence en production.",
      "Encodages de position (RoPE/ALiBi) conditionnent la capacite d'extrapolation a des contextes longs.",
    ]),
    ("Entrainement", [
      "Objectif auto-regressif (next-token) ou masque selon l'architecture.",
      "Parallelisme (data/tensor/pipeline) indispensable a l'echelle multi-GPU.",
      "Mixed precision (bf16/fp16) et gradient checkpointing pour tenir en memoire.",
      "Stabilite : warmup, clipping, schedulers — l'entrainement a grande echelle est fragile.",
    ]),
    ("Du modele a l'inference", [
      "Le KV-cache stocke clefs/valeurs deja calculees : indispensable a la generation efficace.",
      "Le batching dynamique (continuous batching) maximise l'usage GPU en production.",
      "La longueur de contexte impacte memoire (KV-cache) et latence de maniere non lineaire.",
      "Quantization (int8/int4) reduit l'empreinte memoire au prix d'une perte controlee.",
    ]),
    ("Implications d'ingenierie", [
      "Comprendre l'attention aide a dimensionner GPU, contexte et coût.",
      "Le choix d'architecture (MoE, GQA) est un arbitrage coût/latence/qualite.",
      "Les serveurs d'inference (vLLM/TGI) exploitent KV-cache et batching — a benchmarker.",
      "Mesurer tokens/s, latence p95 et coût par requete comme des metriques produit.",
    ]),
  ],
},
"rag": {
  "title": "RAG : Retrieval-Augmented Generation",
  "subtitle": "Ancrer les LLM dans des connaissances a jour et verifiables",
  "sections": [
    ("Pourquoi le RAG", [
      "Le RAG injecte des documents pertinents dans le prompt pour ancrer la reponse dans des sources reelles.",
      "Il contourne le knowledge cutoff et reduit les hallucinations en fournissant le contexte factuel.",
      "Moins couteux et plus agile que le fine-tuning pour des connaissances qui evoluent.",
      "Permet la tracabilite : citer les sources utilisees pour generer la reponse.",
    ]),
    ("Pipeline d'indexation", [
      "Ingestion : extraction du texte (PDF/HTML/DB), nettoyage, normalisation.",
      "Chunking : decoupage en passages de taille adaptee avec recouvrement — parametre critique de qualite.",
      "Embeddings : chaque chunk est vectorise par un modele d'embedding et stocke dans une base vectorielle.",
      "Metadonnees (source, date, droits) indexees pour le filtrage et la conformite.",
    ]),
    ("Pipeline de requete", [
      "La question est vectorisee puis on recupere les k passages les plus proches (recherche de similarite).",
      "Recherche hybride (vectorielle + lexicale BM25) pour robustesse sur termes exacts/rares.",
      "Re-ranking (cross-encoder) pour reordonner finement les passages avant generation.",
      "Construction du prompt : instruction + passages + question, sous contrainte de fenetre de contexte.",
    ]),
    ("Qualite et evaluation", [
      "Mesurer la pertinence du retrieval (recall@k) separement de la qualite de generation.",
      "Detecter les reponses non ancrees (faithfulness/groundedness) — metriques RAGAS-like.",
      "Boucle d'amelioration : chunking, modele d'embedding, k, re-ranking, prompt.",
      "Jeux d'evaluation representatifs versionnes — sinon optimisation a l'aveugle.",
    ]),
    ("Architecture de production", [
      "Base vectorielle scalable (pgvector/Qdrant/Milvus) + cache d'embeddings.",
      "Reindexation incrementale et invalidation a la mise a jour des sources.",
      "Garde-fous : filtrage par droits d'acces (ne pas exposer de documents non autorises).",
      "Observabilite : tracer requete, passages, sources, latence et coût.",
    ]),
    ("Pieges courants", [
      "Chunking inadapte (trop gros/petit) : passages non pertinents ou tronques.",
      "Embeddings inadaptes au domaine/langue : recall mediocre.",
      "Pas de re-ranking : le LLM noie l'info utile dans du bruit.",
      "Absence de controle d'acces : fuite de donnees via le contexte injecte.",
    ]),
  ],
},
"fine-tuning": {
  "title": "Fine-tuning des LLM : SFT, LoRA, QLoRA",
  "subtitle": "Specialiser un modele efficacement sans le reentrainer entierement",
  "sections": [
    ("Quand fine-tuner (vs RAG/prompt)", [
      "Fine-tuner pour un style/format/comportement constant, pas pour injecter des connaissances volatiles (RAG).",
      "Prompt engineering d'abord : le moins cher ; fine-tuning quand le prompt ne suffit plus.",
      "Cas types : domaine specialise, format de sortie strict, reduction de coût (modele plus petit specialise).",
      "Le fine-tuning ne corrige pas un manque de donnees de qualite — il l'amplifie.",
    ]),
    ("SFT et donnees", [
      "Supervised Fine-Tuning : paires instruction->reponse de haute qualite, representatives de l'usage cible.",
      "La qualite/diversite des donnees prime sur la quantite ; nettoyage et deduplication essentiels.",
      "Format coherent (chat template) aligne avec l'inference de production.",
      "Split train/val/test propre et jeu d'evaluation metier versionne.",
    ]),
    ("PEFT : LoRA et QLoRA", [
      "LoRA gele le modele et apprend de petites matrices de bas rang : peu de parametres, coût reduit.",
      "QLoRA quantize le modele de base en 4 bits et entraine des adaptateurs LoRA : fine-tuning sur GPU modeste.",
      "Les adaptateurs sont legers, versionnables et combinables — pratique en MLOps.",
      "Hyperparametres cles : rang, alpha, modules cibles, learning rate.",
    ]),
    ("Entrainement et evaluation", [
      "Surveiller loss train/val pour le surapprentissage ; early stopping.",
      "Evaluer sur des taches metier reelles, pas seulement la loss.",
      "Comparer systematiquement au modele de base (le fine-tuning peut degrader la generalite).",
      "Tester les regressions (capacites generales) — risque d'oubli catastrophique.",
    ]),
    ("Industrialisation (LLMOps)", [
      "Versionner donnees, recette d'entrainement, checkpoint et adaptateur ensemble.",
      "Pipeline reproductible (seed, environnement conteneurise, suivi d'experiences).",
      "Deploiement : fusion d'adaptateurs ou service multi-LoRA selon le besoin.",
      "Registre de modeles + promotion par evaluation (gate qualite).",
    ]),
    ("Pieges", [
      "Donnees biaisees/peu diverses : modele fragile et biaise.",
      "Fine-tuner pour des faits : ils se perimeront — preferer le RAG.",
      "Pas d'eval metier : amelioration illusoire.",
      "Oubli catastrophique des capacites generales non teste.",
    ]),
  ],
},
"prompt-engineering": {
  "title": "Prompt engineering : techniques et methode",
  "subtitle": "Obtenir des sorties fiables et structurees des LLM",
  "sections": [
    ("Principes de base", [
      "Instruction claire, contexte suffisant, format de sortie explicite, contraintes precises.",
      "Le role/system prompt cadre le comportement global et les garde-fous.",
      "Decomposer une tache complexe en sous-taches ameliore la fiabilite.",
      "Specifier ce qu'il faut faire ET ne pas faire ; donner des exemples du resultat attendu.",
    ]),
    ("Few-shot et chain-of-thought", [
      "Few-shot : fournir des exemples representatifs guide fortement la sortie.",
      "Demander un raisonnement etape par etape ameliore les taches de logique/calcul.",
      "Self-consistency : echantillonner plusieurs raisonnements et agreger.",
      "Garder les exemples a jour et coherents avec le format de production.",
    ]),
    ("Sorties structurees", [
      "Imposer un schema (JSON) et valider/parsers cote applicatif (ne jamais faire confiance aveuglement).",
      "Function/tool calling pour des sorties machine-exploitables fiables.",
      "Re-prompt sur echec de validation (boucle de reparation).",
      "Contraindre via grammaire/JSON mode quand le moteur le permet.",
    ]),
    ("Robustesse et securite", [
      "Separer clairement instructions systeme et donnees utilisateur (prompt injection).",
      "Ne jamais inserer de contenu non fiable comme instruction sans neutralisation.",
      "Garde-fous de sortie (filtrage, verification factuelle, citations).",
      "Tester avec des entrees adverses (red teaming de prompt).",
    ]),
    ("Industrialisation", [
      "Versionner les prompts comme du code (revue, tests, changelog).",
      "Suite d'evaluation automatisee (golden set) en CI sur tout changement de prompt.",
      "Observabilite : logguer prompt+sortie (anonymises) pour l'amelioration continue.",
      "A/B testing de prompts avec metriques produit.",
    ]),
    ("Anti-patterns", [
      "Prompts longs et flous : ambigus et couteux.",
      "Pas de validation de sortie : pannes silencieuses en aval.",
      "Exemples obsoletes/incoherents.",
      "Confondre prompt et donnees (faille d'injection).",
    ]),
  ],
},
"embeddings-vector-db": {
  "title": "Embeddings et bases de donnees vectorielles",
  "subtitle": "Representer le sens et rechercher par similarite a l'echelle",
  "sections": [
    ("Embeddings : principe", [
      "Un embedding projette texte/image dans un espace vectoriel ou la proximite reflete la similarite semantique.",
      "La similarite cosinus/produit scalaire mesure la proximite de sens.",
      "Le choix du modele d'embedding (langue, domaine, dimension) conditionne la qualite du retrieval.",
      "Normalisation et coherence du meme modele entre indexation et requete sont indispensables.",
    ]),
    ("Bases vectorielles", [
      "Stockent des millions/milliards de vecteurs avec recherche approchee (ANN) rapide.",
      "Options : pgvector (Postgres), Qdrant, Milvus, Weaviate, FAISS (lib).",
      "Index ANN (HNSW, IVF) : arbitrage rappel/latence/memoire a regler.",
      "Filtrage par metadonnees (droits, date) combine a la recherche vectorielle.",
    ]),
    ("Indexation et mise a jour", [
      "Pipeline : chunk -> embed -> upsert avec metadonnees et identifiants stables.",
      "Reindexation incrementale et suppression a la mise a jour des sources.",
      "Cache d'embeddings pour eviter de recalculer (coût/latence).",
      "Versionner le modele d'embedding : un changement impose une reindexation.",
    ]),
    ("Recherche de qualite", [
      "Hybride dense+lexical (BM25) pour couvrir semantique et termes exacts.",
      "Re-ranking par cross-encoder pour la precision finale.",
      "Mesurer recall@k/nDCG sur un jeu d'evaluation versionne.",
      "Regler k, seuils et parametres ANN par mesure, pas a l'intuition.",
    ]),
    ("Production", [
      "Dimensionnement memoire (vecteurs en RAM pour HNSW) — facteur de coût majeur.",
      "Sharding/replication pour l'echelle et la HA.",
      "Observabilite : latence ANN, rappel, taux de cache.",
      "Controle d'acces au niveau document (securite by design).",
    ]),
    ("Pieges", [
      "Modele d'embedding inadapte langue/domaine : rappel mediocre.",
      "Index ANN mal regle : latence ou rappel insuffisants.",
      "Incoherence modele indexation vs requete.",
      "Pas de filtrage de droits : fuite de donnees.",
    ]),
  ],
},
"agents-ia": {
  "title": "Agents IA : tool use, planification, orchestration",
  "subtitle": "Quand un LLM agit : appels d'outils, boucles et garde-fous",
  "sections": [
    ("Du modele a l'agent", [
      "Un agent = LLM + capacite d'appeler des outils + boucle perception/decision/action.",
      "Le tool/function calling structure les actions (API, recherche, code) de maniere fiable.",
      "La planification decompose un objectif en etapes ; l'agent observe les resultats et adapte.",
      "L'agent est non deterministe : conception defensive obligatoire.",
    ]),
    ("Patterns", [
      "ReAct : alterner raisonnement et action ; reflexion sur les observations.",
      "Orchestration multi-agents (specialistes) vs agent unique outille — arbitrage complexite/fiabilite.",
      "Memoire : court terme (contexte) et long terme (base vectorielle) selon le besoin.",
      "Human-in-the-loop pour les actions sensibles/irreversibles.",
    ]),
    ("Outils et integration", [
      "Definir des outils a contrat strict (schema d'entree/sortie, idempotence).",
      "Sandboxer l'execution (code, commandes) — surface de risque majeure.",
      "Gerer erreurs/timeouts/retries des outils comme dans tout systeme distribue.",
      "Limiter le perimetre d'action (principe du moindre privilege).",
    ]),
    ("Fiabilite et coût", [
      "Boucles non bornees = coût/latence explosifs : limiter iterations et budget tokens.",
      "Critique/verification des etapes (self-check) pour reduire les derives.",
      "Determinisme partiel : journaliser les traces de decision pour le debug.",
      "Tests de scenarios (replay) et evaluation de bout en bout.",
    ]),
    ("Securite", [
      "Prompt injection via contenus recuperes peut detourner les actions de l'agent.",
      "Confirmation humaine pour actions a effet de bord (paiement, suppression, envoi).",
      "Isolation des credentials/outils ; pas d'acces large par defaut.",
      "Audit complet des actions (qui/quoi/quand) — tracabilite.",
    ]),
    ("Production", [
      "Observabilite des traces (etapes, outils, coût) comme des spans.",
      "Garde-fous deterministes autour du non-determinisme du LLM.",
      "Budgets (tokens/temps/actions) et circuit breakers.",
      "Evaluation continue sur des cas reels versionnes.",
    ]),
  ],
},
"rlhf-alignement": {
  "title": "RLHF et alignement des modeles",
  "subtitle": "Orienter un modele vers l'utilite et l'innocuite",
  "sections": [
    ("Pourquoi aligner", [
      "Un modele pre-entraine predit du texte plausible, pas forcement utile ni sur.",
      "L'alignement vise utilite, innocuite et honnetete dans les reponses.",
      "Sans alignement, comportements indesirables (toxicite, non-suivi d'instructions).",
      "L'alignement est un compromis : trop de filtrage degrade l'utilite.",
    ]),
    ("Pipeline RLHF", [
      "SFT initial sur des demonstrations de haute qualite.",
      "Modele de recompense entraine sur des comparaisons humaines (preferences).",
      "Optimisation par RL (PPO) du modele guidee par la recompense.",
      "Boucle iterative avec collecte continue de preferences.",
    ]),
    ("Alternatives modernes", [
      "DPO : optimisation directe sur les preferences, sans modele de recompense separe — plus simple/stable.",
      "RLAIF : preferences generees par IA pour reduire le coût d'annotation humaine.",
      "Constitutional AI : principes explicites guidant l'auto-critique.",
      "Choix selon coût d'annotation, stabilite et controle souhaite.",
    ]),
    ("Evaluation de l'alignement", [
      "Benchmarks d'innocuite/utilite + red teaming systematique.",
      "Mesurer le taux de refus injustifies (sur-filtrage) et de reponses nuisibles.",
      "Jeux d'evaluation adverses versionnes.",
      "Pas de metrique unique : panel de mesures complementaires.",
    ]),
    ("Limites", [
      "Reward hacking : le modele optimise la recompense, pas l'intention.",
      "Biais des annotateurs repercutes dans le modele.",
      "Generalisation imparfaite hors distribution d'entrainement.",
      "Alignement != verite : reduit, n'elimine pas les hallucinations.",
    ]),
    ("Enjeux operationnels", [
      "Versionner donnees de preference, modele de recompense et politique.",
      "Surveiller en production les derives comportementales.",
      "Garde-fous applicatifs en complement (defense en profondeur).",
      "Gouvernance et tracabilite des choix d'alignement.",
    ]),
  ],
},
"diffusion-models": {
  "title": "Modeles de diffusion et generation d'images",
  "subtitle": "Du bruit a l'image : principes et mise en production",
  "sections": [
    ("Principe de la diffusion", [
      "Processus direct : ajouter progressivement du bruit a une image jusqu'au bruit pur.",
      "Processus inverse : un reseau apprend a debruiter etape par etape pour reconstruire/generer.",
      "La generation part de bruit aleatoire et le 'denoise' conditionne par un prompt.",
      "Plus d'etapes d'echantillonnage = qualite vs latence (arbitrage).",
    ]),
    ("Latent diffusion et conditionnement", [
      "Operer dans un espace latent compresse (autoencodeur) reduit drastiquement le coût.",
      "Conditionnement texte via embeddings (cross-attention) pour le text-to-image.",
      "ControlNet/adapters pour guider la structure (pose, contours).",
      "Guidance scale : equilibre fidelite au prompt vs diversite.",
    ]),
    ("Entrainement", [
      "Donnees image-texte massives, nettoyees et filtrees (droits, qualite).",
      "Coût GPU eleve ; fine-tuning (LoRA/DreamBooth) pour specialiser a moindre coût.",
      "Evaluation : FID/CLIPScore + jugement humain (aucune metrique parfaite).",
      "Attention aux biais et contenus problematiques des corpus.",
    ]),
    ("Inference en production", [
      "Latence dominee par le nombre d'etapes : schedulers rapides, distillation.",
      "Batching GPU et quantization pour le coût.",
      "Files d'attente/async : generation longue, ne pas bloquer les requetes.",
      "Cache de prompts/seeds pour la reproductibilite.",
    ]),
    ("Risques et gouvernance", [
      "Droits d'auteur des donnees et des sorties — cadrage juridique.",
      "Deepfakes/usage abusif : watermarking, filtres de contenu.",
      "Donnees personnelles/visages : conformite stricte.",
      "Tracabilite des generations (provenance).",
    ]),
    ("Cas d'usage", [
      "Assets produit, prototypage visuel, augmentation de donnees.",
      "Pipelines automatises (génération -> validation humaine).",
      "Integration via service asynchrone monitore.",
      "Coût/latence a piloter comme tout service IA.",
    ]),
  ],
},
"evaluation-llm": {
  "title": "Evaluation des LLM et des systemes IA",
  "subtitle": "Mesurer la qualite : benchmarks, golden sets, LLM-as-judge",
  "sections": [
    ("Pourquoi evaluer rigoureusement", [
      "Sans evaluation, toute optimisation (prompt/modele/RAG) est a l'aveugle.",
      "Les demos ne prouvent rien : il faut des mesures reproductibles.",
      "L'evaluation est la condition d'une CI/CD IA fiable (gate qualite).",
      "Distinguer evaluation offline (jeux fixes) et online (production).",
    ]),
    ("Construire un golden set", [
      "Jeu de cas representatifs de l'usage reel, versionne en Git.",
      "Inclure cas limites, adverses et regressions connues.",
      "Reponses/criteres de reference definis avec le metier.",
      "Mise a jour controlee (un changement de set = un changement mesure).",
    ]),
    ("Methodes de scoring", [
      "Metriques deterministes (exact match, F1, schema valide) quand applicables.",
      "LLM-as-judge pour les reponses ouvertes — a calibrer/contraindre (rubrique, biais de position).",
      "Evaluation humaine sur echantillon pour ancrer les juges automatiques.",
      "RAG : separer qualite du retrieval (recall@k) et de la generation (faithfulness).",
    ]),
    ("Dimensions a mesurer", [
      "Exactitude/groundedness, format, securite, ton, coût, latence.",
      "Robustesse aux variations de prompt et aux entrees adverses.",
      "Taux de refus injustifies et de hallucination.",
      "Stabilite dans le temps (derive du fournisseur/modele).",
    ]),
    ("Industrialisation", [
      "Suite d'eval automatisee en CI sur chaque changement (prompt/modele/RAG).",
      "Seuils bloquants (gate) + tableaux de bord de tendance.",
      "Tracage production -> nouveaux cas d'eval (boucle d'amelioration).",
      "Versionner ensemble : modele, prompt, donnees, resultats.",
    ]),
    ("Pieges", [
      "Contamination des benchmarks publics (memorisation).",
      "LLM-judge non calibre = mesure biaisee.",
      "Golden set non representatif.",
      "Optimiser une metrique au detriment de l'usage reel.",
    ]),
  ],
},
"securite-ia": {
  "title": "Securite de l'IA : prompt injection et menaces LLM",
  "subtitle": "OWASP LLM Top 10 : comprendre et mitiger les risques",
  "sections": [
    ("Prompt injection", [
      "Du contenu non fiable (web, document, email) contient des instructions detournant le modele.",
      "Injection indirecte : via des donnees recuperees (RAG) que l'agent traite comme des ordres.",
      "Mitigation : separer instructions/donnees, neutraliser, ne jamais executer d'instructions issues de contenus.",
      "Confirmation humaine pour toute action sensible declenchee a partir de contenu externe.",
    ]),
    ("Fuite de donnees", [
      "Donnees sensibles dans le prompt/historique pouvant fuiter via sorties ou logs.",
      "Exfiltration via outils/agents mal cloisonnes.",
      "Minimisation des donnees, masquage PII, retention courte.",
      "Cloisonner les acces (le contexte ne doit contenir que le strict autorise).",
    ]),
    ("Autres risques (OWASP LLM)", [
      "Empoisonnement des donnees d'entrainement/RAG.",
      "Deni de service (prompts couteux), explosion de coût.",
      "Sur-confiance dans des sorties non verifiees (insecure output handling).",
      "Supply chain : modeles/pluggins/poids non verifies.",
    ]),
    ("Defenses applicatives", [
      "Validation/typage strict des sorties avant usage en aval.",
      "Sandboxing de l'execution (code/outils), moindre privilege.",
      "Garde-fous (filtres entree/sortie), allowlist d'actions.",
      "Rate limiting et budgets (anti-DoS/coût).",
    ]),
    ("Gouvernance", [
      "Threat modeling specifique IA des la conception.",
      "Red teaming adverse continu et regression de securite.",
      "Tracabilite/audit des prompts, actions et acces.",
      "Conformite (donnees personnelles, secteurs reglementes).",
    ]),
    ("Operationnel", [
      "Traiter tout contenu observe comme non fiable par defaut.",
      "Defense en profondeur : aucune mesure unique ne suffit.",
      "Tests de securite automatises dans la CI IA.",
      "Plan de reponse aux incidents specifiques LLM.",
    ]),
  ],
},
"llmops": {
  "title": "LLMOps : CI/CD pour applications a base de LLM",
  "subtitle": "Industrialiser prompts, modeles et evaluations comme du code",
  "sections": [
    ("Specificites vs MLOps classique", [
      "Le 'modele' inclut prompt + modele + outils + donnees RAG : tout doit etre versionne.",
      "Non-determinisme : tests bases sur des seuils d'eval, pas des assertions exactes.",
      "Coût/latence sont des contraintes de premier ordre, a tester.",
      "Dependance forte a des fournisseurs externes (derive, quotas, deprecations).",
    ]),
    ("Versionnement", [
      "Prompts en Git (revue, changelog) ; modeles/adaptateurs dans un registre.",
      "Datasets d'evaluation versionnes et immuables par release.",
      "Configuration (parametres de generation) declarative et tracee.",
      "Reproductibilite : environnement conteneurise, seeds.",
    ]),
    ("Pipeline CI/CD IA", [
      "Lint/validation des prompts -> suite d'evaluation (golden set) -> gate de qualite/coût.",
      "Tests de securite (prompt injection) automatises.",
      "Deploiement progressif (canary) avec metriques live.",
      "Rollback rapide (prompt/modele) — c'est un commit/redeploiement.",
    ]),
    ("Observabilite", [
      "Tracer prompt, contexte, sortie, tokens, coût, latence, feedback utilisateur.",
      "Detection de derive (qualite/coût) et alerting SLO.",
      "Echantillonnage pour evaluation continue hors ligne.",
      "Dashboards produit (qualite/coût/latence) comme KPI.",
    ]),
    ("Coût et performance", [
      "Caching (reponses/embeddings), batching, modeles plus petits quand suffisant.",
      "Routage de modele (cascade) selon la difficulte.",
      "Budgets et quotas par environnement.",
      "Benchmark regulier des fournisseurs/serveurs d'inference.",
    ]),
    ("Gouvernance", [
      "Tracabilite complete (audit) des changements et des sorties.",
      "Politiques de donnees (PII, retention, residence).",
      "Plan de continuite (multi-fournisseur, fallback).",
      "Revue humaine des changements impactant le comportement.",
    ]),
  ],
},
"llm-on-prem": {
  "title": "Deployer un LLM en self-hosted / on-premise",
  "subtitle": "Souverainete, coût et controle : servir ses propres modeles",
  "sections": [
    ("Pourquoi self-hoster", [
      "Souverainete/confidentialite des donnees (secteurs reglementes).",
      "Maitrise du coût a fort volume et de la latence (proximite).",
      "Independance vis-a-vis d'un fournisseur (pas de deprecation subie).",
      "Contrainte : expertise infra GPU et MLOps requise.",
    ]),
    ("Choix du modele", [
      "Modeles ouverts (poids disponibles) adaptes a la tache et a la langue.",
      "Taille vs GPU disponible : arbitrage qualite/coût/latence.",
      "Licences a verifier (usage commercial).",
      "Quantization pour tenir sur du materiel raisonnable.",
    ]),
    ("Serveur d'inference", [
      "vLLM/TGI : KV-cache, continuous batching, haute occupation GPU.",
      "API compatible OpenAI pour integration transparente.",
      "Tensor/pipeline parallelism pour les gros modeles multi-GPU.",
      "Benchmarks tokens/s, latence p95, concurrence avant mise en prod.",
    ]),
    ("Infrastructure", [
      "GPU dimensionnes (VRAM = contrainte n1) ; drivers/CUDA maitrises.",
      "Conteneurisation + Kubernetes (device plugin) pour l'orchestration.",
      "Autoscaling delicat (GPU coûteux/rares) : files d'attente, priorisation.",
      "Observabilite GPU (utilisation, memoire, temperature).",
    ]),
    ("Production", [
      "HA et degradation gracieuse (fallback modele plus petit).",
      "Mises a jour de modele versionnees (registre, canary).",
      "Securite : isolation, authn/z, quotas, audit.",
      "FinOps GPU : utilisation, batching, extinction des idle.",
    ]),
    ("Pieges", [
      "Sous-dimensionner la VRAM (OOM au chargement/contexte long).",
      "Ignorer le batching : GPU sous-utilise, coût/req eleve.",
      "Pas de benchmark realiste : surprises en charge.",
      "Negliger la securite (endpoint LLM = surface sensible).",
    ]),
  ],
},
"quantization": {
  "title": "Quantization et optimisation de l'inference",
  "subtitle": "Reduire memoire et latence sans sacrifier (trop) la qualite",
  "sections": [
    ("Principe de la quantization", [
      "Representer poids/activations en basse precision (int8/int4) au lieu de fp16/bf16.",
      "Reduit l'empreinte memoire (VRAM) et accelere l'inference.",
      "Compromis : perte de qualite a calibrer/mesurer.",
      "Permet de servir de plus gros modeles sur du materiel modeste.",
    ]),
    ("Methodes", [
      "Post-training quantization (GPTQ/AWQ) : rapide, sans reentrainement.",
      "Quantization-aware (QLoRA pour le fine-tuning 4 bits).",
      "Mixed precision selon la sensibilite des couches.",
      "Choix selon coût, qualite cible et support du runtime.",
    ]),
    ("Autres optimisations", [
      "KV-cache + continuous batching : leviers de debit majeurs.",
      "FlashAttention/paged attention : memoire et latence.",
      "Speculative decoding : modele brouillon + verification.",
      "Distillation : modele plus petit imitant un grand.",
    ]),
    ("Evaluation de l'impact", [
      "Mesurer la qualite (golden set) avant/apres quantization, pas seulement la perplexite.",
      "Mesurer latence p95, debit, VRAM en conditions reelles.",
      "Arbitrage explicite qualite vs coût documente.",
      "Tester sur la langue/domaine cible (la degradation n'est pas uniforme).",
    ]),
    ("Production", [
      "Choisir un runtime supportant la methode (vLLM/TGI/llama.cpp).",
      "Versionner la variante quantizee comme un artefact distinct.",
      "Surveiller derive qualite/perf apres mise en prod.",
      "Fallback vers une variante plus precise si besoin.",
    ]),
    ("Pieges", [
      "Quantizer sans evaluer la qualite metier.",
      "4 bits agressif sur tache sensible : degradation.",
      "Runtime ne supportant pas la methode choisie.",
      "Ignorer l'impact sur les langues moins couvertes.",
    ]),
  ],
},
"aiops": {
  "title": "AIOps : l'IA au service du DevOps et de l'observabilite",
  "subtitle": "Detection d'anomalies, correlation et reduction du bruit d'alertes",
  "sections": [
    ("Definition et promesse", [
      "AIOps applique ML/IA aux donnees d'exploitation (logs, metriques, traces, evenements).",
      "Objectifs : detection precoce, reduction du bruit d'alertes, acceleration du MTTR.",
      "Complement de l'observabilite classique, pas un remplacement.",
      "La valeur depend de la qualite des donnees et du contexte metier.",
    ]),
    ("Cas d'usage", [
      "Detection d'anomalies sur metriques/SLI (vs seuils statiques rigides).",
      "Correlation et regroupement d'alertes (event correlation) pour reduire la fatigue.",
      "Analyse de cause racine assistee (topologie + signaux).",
      "Prevision de capacite/saturation (forecasting).",
    ]),
    ("Donnees et pipeline", [
      "Telemetrie de qualite (labels coherents, sans PII) — prerequis absolu.",
      "Pipelines de features sur series temporelles/logs.",
      "Etiquetage des incidents passes pour l'apprentissage supervise.",
      "Boucle de feedback des operateurs (vrais/faux positifs).",
    ]),
    ("LLM en AIOps", [
      "Resumes d'incidents, runbooks assistes, requetes en langage naturel sur l'observabilite.",
      "Triage initial et suggestions d'actions (avec validation humaine).",
      "Risque d'hallucination : ancrer dans les donnees reelles (RAG sur runbooks).",
      "Garde-fous sur toute action automatisee.",
    ]),
    ("Mise en oeuvre", [
      "Commencer par un cas a forte valeur (bruit d'alertes) et mesurer.",
      "Eviter l'automatisation d'actions risquees sans humain.",
      "Integrer aux outils existants (Prometheus/Grafana/Alertmanager).",
      "Mesurer MTTR, taux de faux positifs, charge on-call.",
    ]),
    ("Pieges", [
      "Garbage in, garbage out : telemetrie pauvre = IA inutile.",
      "Boite noire non explicable : adoption nulle des equipes.",
      "Automatiser des remediations risquees prematurement.",
      "Pas de mesure d'impact : promesse non prouvee.",
    ]),
  ],
},
"gpu-infra": {
  "title": "Infrastructure GPU pour l'IA a l'echelle",
  "subtitle": "Dimensionner, orchestrer et optimiser le coût du calcul GPU",
  "sections": [
    ("Le GPU comme ressource critique", [
      "La VRAM est la contrainte n1 (taille de modele + KV-cache + batch).",
      "GPU rares/coûteux : l'utilisation est l'enjeu FinOps central.",
      "Bande passante memoire souvent plus limitante que le FLOPS pour l'inference.",
      "Le choix GPU depend de la charge (entrainement vs inference, latence vs debit).",
    ]),
    ("Orchestration", [
      "Kubernetes + device plugin/Operator pour exposer/planifier les GPU.",
      "MIG/partage de GPU pour mutualiser sur des charges legeres.",
      "Files d'attente/priorisation (jobs batch vs services temps reel).",
      "Affinite/topologie (NVLink) pour le multi-GPU.",
    ]),
    ("Inference efficace", [
      "Continuous batching + KV-cache (vLLM/TGI) pour maximiser l'occupation.",
      "Quantization pour reduire VRAM et coût/req.",
      "Autoscaling base sur la file/latence (scale-to-zero delicat sur GPU).",
      "Routage de modeles (cascade) selon la difficulte.",
    ]),
    ("Entrainement distribue", [
      "Data/tensor/pipeline parallelism selon la taille du modele.",
      "Mixed precision + gradient checkpointing pour la memoire.",
      "Reseau (interconnect) determinant a l'echelle multi-noeuds.",
      "Checkpointing robuste (jobs longs, pannes).",
    ]),
    ("FinOps GPU", [
      "Mesurer utilisation reelle (pas seulement allocation).",
      "Eteindre/recuperer les idle ; spot/preemptible pour le batch.",
      "Right-sizing GPU vs besoin (ne pas sur-provisionner).",
      "Coût par token/inference comme KPI.",
    ]),
    ("Observabilite", [
      "Metriques GPU (util, memoire, ECC, temperature) exportees (DCGM/Prometheus).",
      "Alerting sur saturation VRAM/throttling.",
      "Correlation perf modele <-> sante GPU.",
      "Capacity planning base sur les tendances.",
    ]),
  ],
},
"data-pipelines-ml": {
  "title": "Pipelines de donnees pour le ML/IA",
  "subtitle": "La qualite des donnees determine la qualite des modeles",
  "sections": [
    ("Le primat des donnees", [
      "La performance d'un systeme IA est bornee par la qualite/representativite des donnees.",
      "Plus de donnees mediocres n'aide pas ; nettoyage et curation priment.",
      "Data-centric AI : iterer sur les donnees, pas seulement le modele.",
      "Documenter la provenance et les limites des jeux de donnees.",
    ]),
    ("Ingestion et transformation", [
      "Sources heterogenes : extraction, normalisation, schema, validation.",
      "Deduplication, filtrage qualite, detection de fuites (train/test leakage).",
      "Versionnement des datasets (immuabilite par release).",
      "Pipelines reproductibles et orchestres (DAG).",
    ]),
    ("Qualite et gouvernance", [
      "Tests de donnees (schemas, distributions, valeurs aberrantes) en CI.",
      "Detection de derive (data/concept drift) en production.",
      "Lignage (data lineage) pour la tracabilite/audit.",
      "Conformite : PII, consentement, retention, residence.",
    ]),
    ("Donnees pour LLM/RAG", [
      "Chunking, deduplication, filtrage de contenu et de droits.",
      "Embeddings versionnes ; reindexation a la mise a jour.",
      "Etiquetage de preferences (alignement) de qualite controlee.",
      "Jeux d'evaluation cures et representatifs.",
    ]),
    ("Industrialisation", [
      "Feature store/catalogue pour la reutilisation et la coherence.",
      "Idempotence et backfill maitrises.",
      "Observabilite des pipelines (fraicheur, volumes, echecs).",
      "Cout de stockage/traitement pilote (FinOps data).",
    ]),
    ("Pieges", [
      "Leakage train/test gonflant artificiellement les scores.",
      "Donnees non versionnees : resultats irreproductibles.",
      "Derive non surveillee : degradation silencieuse en prod.",
      "Non-conformite PII (risque legal majeur).",
    ]),
  ],
},
"mlops": {
  "title": "MLOps : cycle de vie des modeles en production",
  "subtitle": "Du notebook a la production fiable, reproductible et surveillee",
  "sections": [
    ("Pourquoi le MLOps", [
      "Un modele en notebook n'est pas un produit : il faut reproductibilite, deploiement, monitoring.",
      "La dette technique ML est specifique (donnees, derive, dependance entrainement/serving).",
      "MLOps = DevOps + gestion des donnees/modeles/experiences.",
      "Objectif : iterer vite ET de maniere fiable et auditable.",
    ]),
    ("Reproductibilite", [
      "Versionner code, donnees, features, hyperparametres et artefacts modele.",
      "Suivi d'experiences (params/metriques/artefacts).",
      "Environnements conteneurises, seeds, pipelines deterministes.",
      "Registre de modeles avec stades (staging/prod) et metadonnees.",
    ]),
    ("Pipeline CI/CD/CT", [
      "CI : tests code + tests de donnees + validation modele.",
      "CD : deploiement (batch/online) automatise et versionne.",
      "Continuous Training : reentrainement declenche par derive/donnees.",
      "Gate de promotion basee sur l'evaluation (pas l'intuition).",
    ]),
    ("Serving", [
      "Online (API faible latence) vs batch ; arbitrage selon l'usage.",
      "Parite entrainement/serving (memes features/transformations).",
      "Canary/shadow deployment pour valider sans risque.",
      "Rollback rapide (artefact versionne).",
    ]),
    ("Monitoring", [
      "Performance modele en prod (pas seulement infra) : qualite, derive, biais.",
      "Data drift / concept drift -> alerting et reentrainement.",
      "Boucle de feedback (labels reels) pour l'amelioration.",
      "Observabilite et SLO comme tout service critique.",
    ]),
    ("Gouvernance", [
      "Tracabilite/audit (qui a deploye quel modele, sur quelles donnees).",
      "Conformite et documentation (model cards).",
      "Gestion des risques (biais, robustesse, securite).",
      "Cout du cycle de vie pilote (FinOps ML).",
    ]),
  ],
},
"ia-responsable": {
  "title": "IA responsable et gouvernance",
  "subtitle": "Biais, transparence, conformite : deployer l'IA de maniere ethique",
  "sections": [
    ("Enjeux", [
      "Une IA peut amplifier des biais, prendre des decisions opaques, impacter des personnes.",
      "La responsabilite engage l'organisation, pas seulement la technique.",
      "Reglementations emergentes (ex. cadres sur l'IA, donnees personnelles).",
      "La confiance des utilisateurs est un actif a proteger.",
    ]),
    ("Biais et equite", [
      "Les biais viennent des donnees, des objectifs et des usages.",
      "Mesurer l'equite selon des metriques adaptees au contexte (aucune universelle).",
      "Auditer par sous-populations, pas seulement en agregat.",
      "Mitigation a chaque etape (donnees, modele, post-traitement).",
    ]),
    ("Transparence et explicabilite", [
      "Documenter donnees, limites et usages prevus (model/data cards).",
      "Expliquer les decisions a hauteur des enjeux (droit a l'explication).",
      "Tracabilite des versions et des changements.",
      "Communication honnete des limites aux utilisateurs.",
    ]),
    ("Confidentialite et securite", [
      "Minimisation des donnees, anonymisation, consentement, retention.",
      "Securite (prompt injection, fuite) integree a la gouvernance.",
      "Residence des donnees et conformite sectorielle.",
      "Privacy by design et by default.",
    ]),
    ("Gouvernance operationnelle", [
      "Comite/processus de revue des cas d'usage a risque.",
      "Human-in-the-loop pour les decisions a fort impact.",
      "Surveillance post-deploiement (derive, incidents, plaintes).",
      "Plan de reponse et de remediation.",
    ]),
    ("Mise en pratique", [
      "Integrer l'evaluation d'impact des la conception.",
      "Checklists/garde-fous dans la CI/CD IA.",
      "Formation des equipes (sensibilisation aux risques).",
      "Mesurer et publier des indicateurs de responsabilite.",
    ]),
  ],
},
"multimodal": {
  "title": "Multimodalite : modeles vision-langage et au-dela",
  "subtitle": "Quand les modeles comprennent texte, image, audio ensemble",
  "sections": [
    ("Principe multimodal", [
      "Un modele multimodal aligne plusieurs modalites (texte/image/audio) dans un espace commun.",
      "Encoders specialises (vision/audio) + projection vers l'espace du LLM.",
      "Permet raisonnement croise : decrire une image, repondre a partir d'un document scanne.",
      "L'alignement inter-modal est le defi central (donnees appariees de qualite).",
    ]),
    ("Architectures", [
      "Vision encoder (ViT) + adaptateur vers le LLM (cross-attention/projection).",
      "Tokenisation visuelle : l'image devient une sequence de 'tokens' visuels.",
      "Contexte plus lourd (images = beaucoup de tokens) -> coût/latence accrus.",
      "Variantes selon les modalites et le sens de generation (compréhension vs generation).",
    ]),
    ("Cas d'usage", [
      "Document AI (OCR+comprehension), support visuel, accessibilite.",
      "Analyse d'images techniques, controle qualite, extraction structuree.",
      "Assistants multimodaux (texte+capture d'ecran).",
      "Attention aux usages sensibles (biometrie/visages) — restrictions.",
    ]),
    ("Evaluation", [
      "Jeux d'evaluation specifiques par modalite et croises.",
      "Mesurer hallucination visuelle (decrire ce qui n'existe pas).",
      "Robustesse (qualite d'image, langues, mises en page).",
      "Coût/latence par requete multimodale.",
    ]),
    ("Production", [
      "Pretraitement (resize/normalisation) et limites de taille.",
      "Coût domine par les tokens visuels : optimiser/limiter.",
      "Pipelines asynchrones pour les entrees lourdes.",
      "Garde-fous sur donnees personnelles dans les images.",
    ]),
    ("Limites", [
      "Hallucinations specifiques au visuel.",
      "Coût/latence eleves vs texte seul.",
      "Biais des donnees image-texte.",
      "Conformite renforcee (images = donnees potentiellement personnelles).",
    ]),
  ],
},
}
