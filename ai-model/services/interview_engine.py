# services/interview_engine.py

from services.skill_extractor_ai import (
    extract_skills_ai
)

# =========================
# QUESTIONS DATABASE
# =========================

TECH_QUESTIONS = {

    "python": [
        "Explique les différences entre liste et tuple en Python.",
        "Qu’est-ce qu’un décorateur Python ?",
        "Comment fonctionne la gestion mémoire en Python ?"
    ],

    "sql": [
        "Quelle est la différence entre WHERE et HAVING ?",
        "Explique les jointures SQL.",
        "Comment optimiser une requête SQL lente ?"
    ],

    "machine learning": [
        "Explique la différence entre overfitting et underfitting.",
        "Comment fonctionne Random Forest ?",
        "Qu’est-ce que le feature engineering ?"
    ],

    "deep learning": [
        "Explique le fonctionnement d’un réseau de neurones.",
        "Quelle différence entre CNN et RNN ?",
        "Qu’est-ce que la backpropagation ?"
    ],

    "react": [
        "Explique le Virtual DOM.",
        "Quelle différence entre state et props ?",
        "Comment fonctionne useEffect ?"
    ],

    "docker": [
        "Quelle différence entre Docker et une VM ?",
        "Explique Docker Compose.",
        "Comment dockeriser une application ?"
    ],

    "fastapi": [
        "Pourquoi utiliser FastAPI ?",
        "Explique le fonctionnement des routes API.",
        "Comment sécuriser une API FastAPI ?"
    ],

    "java": [
        "Explique le polymorphisme en Java.",
        "Quelle différence entre interface et classe abstraite ?",
        "Comment fonctionne le garbage collector ?"
    ],

    "spring boot": [
        "Explique l’injection de dépendances.",
        "Qu’est-ce qu’un contrôleur REST ?",
        "Comment sécuriser une API Spring Boot ?"
    ]
}

# =========================
# HR QUESTIONS
# =========================

HR_QUESTIONS = [

    "Présentez-vous.",
    "Pourquoi voulez-vous rejoindre notre entreprise ?",
    "Parlez-moi d’un défi technique que vous avez résolu.",
    "Comment travaillez-vous en équipe ?",
    "Quels sont vos objectifs professionnels ?",
    "Pourquoi devrions-nous vous recruter ?"
]

# =========================
# LEVEL QUESTIONS
# =========================

SENIOR_QUESTIONS = [

    "Comment architectureriez-vous une application scalable ?",
    "Comment gérez-vous une équipe technique ?",
    "Décrivez une décision technique complexe que vous avez prise."
]

MID_QUESTIONS = [

    "Comment déboguez-vous une application complexe ?",
    "Comment optimisez-vous les performances d’une API ?"
]

JUNIOR_QUESTIONS = [

    "Expliquez un projet personnel récent.",
    "Comment apprenez-vous une nouvelle technologie ?"
]

# =========================
# INTERVIEW GENERATOR
# =========================

def generate_interview(cv_text, level):

    skills = extract_skills_ai(
        cv_text.lower()
    )

    technical_questions = []

    # =========================
    # TECH QUESTIONS
    # =========================

    for skill in skills:

        if skill in TECH_QUESTIONS:

            technical_questions.extend(
                TECH_QUESTIONS[skill][:2]
            )

    # =========================
    # LEVEL ADAPTATION
    # =========================

    adaptive_questions = []

    if level == "Senior":

        adaptive_questions = SENIOR_QUESTIONS

    elif level == "Mid-Level":

        adaptive_questions = MID_QUESTIONS

    else:

        adaptive_questions = JUNIOR_QUESTIONS

    # =========================
    # LIMIT QUESTIONS
    # =========================

    technical_questions = technical_questions[:8]

    return {

        "level": level,

        "skills_detected": skills,

        "technical_questions":
            technical_questions,

        "hr_questions":
            HR_QUESTIONS[:4],

        "adaptive_questions":
            adaptive_questions
    }