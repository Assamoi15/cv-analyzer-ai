# services/recruiter_ai.py

from services.skill_extractor_ai import (
    extract_skills_ai
)

TARGET_SKILLS = {

    "Data Scientist": [
        "python",
        "machine learning",
        "deep learning",
        "sql",
        "pandas",
        "numpy",
        "power bi"
    ],

    "Backend Developer": [
        "java",
        "spring boot",
        "sql",
        "docker",
        "api",
        "fastapi"
    ],

    "Frontend Developer": [
        "react",
        "javascript",
        "html",
        "css",
        "typescript"
    ]
}

def recruiter_decision(
    cv_text,
    target_job
):

    text = cv_text.lower()

    cv_skills = extract_skills_ai(text)

    required_skills = TARGET_SKILLS.get(
        target_job,
        []
    )

    matched = []

    missing = []

    for skill in required_skills:

        if skill in cv_skills:
            matched.append(skill)
        else:
            missing.append(skill)

    # =========================
    # ATS SCORE
    # =========================

    if len(required_skills) == 0:

        ats_score = 0

    else:

        ats_score = round(
            (
                len(matched)
                / len(required_skills)
            ) * 100,
            2
        )

    # =========================
    # DECISION
    # =========================

    if ats_score >= 80:

        decision = "Highly Recommended"

    elif ats_score >= 60:

        decision = "Recommended"

    else:

        decision = "Needs Improvement"

    # =========================
    # REASON
    # =========================

    if matched:

        reason = (
            f"Le candidat possède "
            f"{len(matched)} compétences "
            f"clés pour le poste "
            f"{target_job}."
        )

    else:

        reason = (
            "Le CV ne contient pas "
            "les compétences principales "
            "attendues."
        )

    # =========================
    # HR RECOMMENDATIONS
    # =========================

    recommendations = []

    if missing:

        recommendations.append(
            "Renforcer les compétences : "
            + ", ".join(missing)
        )

    if ats_score < 70:

        recommendations.append(
            "Ajouter davantage de projets "
            "professionnels et d'expérience."
        )

    if ats_score >= 80:

        recommendations.append(
            "Profil adapté pour entretien "
            "technique avancé."
        )

    return {

        "target_job": target_job,

        "ats_score": ats_score,

        "decision": decision,

        "matched_skills": matched,

        "missing_skills": missing,

        "reason": reason,

        "recommendations":
            recommendations
    }