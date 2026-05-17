from services.job_profiles import (
    JOB_PROFILES
)

from services.skill_extractor_ai import (
    extract_skills_ai
)

def analyze_skill_gap(
    cv_text,
    target_job
):

    text = cv_text.lower()

    cv_skills = extract_skills_ai(text)

    job_profile = JOB_PROFILES.get(
        target_job,
        {}
    )

    required_skills = list(
        job_profile.keys()
    )

    matched_skills = []

    missing_skills = []

    recommendations = []

    # =========================
    # MATCHING
    # =========================

    for skill in required_skills:

        if skill in cv_skills:

            matched_skills.append(skill)

        else:

            missing_skills.append(skill)

    # =========================
    # RECOMMENDATIONS
    # =========================

    if "machine learning" in missing_skills:

        recommendations.append(
            "Apprendre Machine Learning"
        )

    if "deep learning" in missing_skills:

        recommendations.append(
            "Étudier Deep Learning"
        )

    if "docker" in missing_skills:

        recommendations.append(
            "Apprendre Docker"
        )

    if "sql" in missing_skills:

        recommendations.append(
            "Renforcer SQL"
        )

    if "spring boot" in missing_skills:

        recommendations.append(
            "Développer APIs Spring Boot"
        )

    return {

        "target_job":
            target_job,

        "matched_skills":
            matched_skills,

        "missing_skills":
            missing_skills,

        "recommendations":
            recommendations
    }