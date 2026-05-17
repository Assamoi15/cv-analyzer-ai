# services/matching_engine.py

from services.skill_extractor_ai import (
    extract_skills_ai
)

from services.job_profiles import (
    JOB_PROFILES
)

def calculate_matching(
    cv_text,
    target_job
):

    # =========================
    # EXTRACT CV SKILLS
    # =========================

    cv_skills = extract_skills_ai(
        cv_text.lower()
    )

    # =========================
    # GET JOB PROFILE
    # =========================

    profile = JOB_PROFILES.get(
        target_job,
        {}
    )

    # =========================
    # REQUIRED SKILLS
    # =========================

    job_skills = list(
        profile.keys()
    )

    matched = []

    missing = []

    # =========================
    # MATCHING
    # =========================

    for skill in job_skills:

        if skill in cv_skills:

            matched.append(skill)

        else:

            missing.append(skill)

    # =========================
    # SCORE
    # =========================

    if len(job_skills) == 0:

        score = 0

    else:

        score = (
            len(matched)
            / len(job_skills)
        ) * 100

    # =========================
    # RETURN
    # =========================

    return {

        "target_job":
            target_job,

        "matching_score":
            round(score, 2),

        "matched_skills":
            matched,

        "missing_skills":
            missing
    }


def compute_matching(cv_text, job_text):

    cv_skills = extract_skills_ai(cv_text.lower())
    job_skills = extract_skills_ai(job_text.lower())

    matched = list(set(cv_skills) & set(job_skills))
    missing = list(set(job_skills) - set(cv_skills))

    if len(job_skills) == 0:
        score = 0
    else:
        score = round((len(matched) / len(job_skills)) * 100, 2)

    return {
        "matching_score": score,
        "matched_skills": matched,
        "missing_skills": missing,
        "job_skills": job_skills
    }