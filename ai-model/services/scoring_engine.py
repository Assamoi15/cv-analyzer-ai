# services/scoring_engine.py


from services.skill_extractor_ai import (
    extract_skills_ai
)

from services.job_profiles import (
    JOB_PROFILES
)

# =========================
# SKILL WEIGHTS
# =========================

SKILL_WEIGHTS = {

    # IA / DATA
    "python": 15,
    "machine learning": 20,
    "deep learning": 20,
    "tensorflow": 18,
    "pytorch": 18,
    "pandas": 10,
    "numpy": 10,
    "sql": 12,
    "power bi": 10,
    "statistics": 10,

    # BACKEND
    "java": 12,
    "spring boot": 15,
    "fastapi": 15,
    "docker": 15,
    "api": 10,

    # FRONTEND
    "react": 15,
    "javascript": 10,
    "typescript": 12,

    # CLOUD / DEVOPS
    "aws": 18,
    "kubernetes": 20,
    "linux": 10,

    # FINANCE / ANALYTICS
    "excel": 8,
    "finance": 10,
    "risk management": 15
}

# =========================
# EXPERIENCE BONUS
# =========================

EXPERIENCE_BONUS = {

    "stage": 10,
    "internship": 10,

    "freelance": 15,

    "1 an": 10,
    "2 ans": 15,
    "3 ans": 20,
    "5 ans": 30
}

# =========================
# EDUCATION BONUS
# =========================

EDUCATION_BONUS = {

    "licence": 10,
    "master": 20,
    "phd": 30
}

# =========================
# PROJECT BONUS
# =========================

PROJECT_KEYWORDS = [
    "projet",
    "project",
    "application",
    "dashboard",
    "api",
    "system"
]

# =========================
# MAIN ENGINE
# =========================

def calculate_score(cv_text):

    text = cv_text.lower()

    skills = extract_skills_ai(text)

    score = 0

    # =========================
    # SKILLS
    # =========================

    for skill in skills:

        if skill in SKILL_WEIGHTS:

            score += SKILL_WEIGHTS[skill]

    # =========================
    # EXPERIENCE
    # =========================

    for exp, points in (
        EXPERIENCE_BONUS.items()
    ):

        if exp in text:

            score += points

    # =========================
    # EDUCATION
    # =========================

    for edu, points in (
        EDUCATION_BONUS.items()
    ):

        if edu in text:

            score += points

    # =========================
    # PROJECTS
    # =========================

    for keyword in PROJECT_KEYWORDS:

        if keyword in text:

            score += 5

    # =========================
    # BONUS STACK
    # =========================

    if (
        "python" in skills
        and "sql" in skills
        and "machine learning" in skills
    ):

        score += 15

    # =========================
    # LIMIT
    # =========================

    score = min(score, 100)

    return {

        "score": round(score, 2),

        "skills": skills
    }

from services.job_profiles import (
    JOB_PROFILES
)

def calculate_job_score(
    cv_text,
    target_job
):

    text = cv_text.lower()

    skills = extract_skills_ai(text)

    score = 0

    profile = JOB_PROFILES.get(
        target_job,
        {}
    )

    for skill in skills:

        if skill in profile:

            score += profile[skill]

    score = min(score, 100)

    return {

        "target_job":
            target_job,

        "score":
            round(score, 2),

        "skills":
            skills
    }
