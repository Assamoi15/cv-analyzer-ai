from services.skill_extractor_ai import (
    extract_skills_ai
)

def generate_ai_feedback(
    cv_text,
    score,
    level
):

    skills = extract_skills_ai(
        cv_text.lower()
    )

    feedback = []

    # =========================
    # GLOBAL ANALYSIS
    # =========================

    if score >= 80:

        feedback.append(

            "Votre CV présente un profil technique solide avec une forte cohérence entre compétences, projets et expériences professionnelles."

        )

    elif score >= 60:

        feedback.append(

            "Votre profil est intéressant mais certaines compétences clés peuvent être renforcées pour accéder à des postes plus compétitifs."

        )

    else:

        feedback.append(

            "Votre CV nécessite davantage de spécialisation technique et de projets concrets pour améliorer votre attractivité."

        )

    # =========================
    # SKILL ANALYSIS
    # =========================

    if "python" in skills:

        feedback.append(

            "La maîtrise de Python constitue un excellent atout pour les métiers Data et IA."

        )

    if "machine learning" in skills:

        feedback.append(

            "Vos compétences en Machine Learning augmentent fortement votre valeur sur le marché technologique."

        )

    if "sql" not in skills:

        feedback.append(

            "Le SQL avancé est fortement recommandé pour les postes orientés Data Science, Backend et Business Intelligence."

        )

    if "docker" not in skills:

        feedback.append(

            "L'ajout de Docker et des notions DevOps renforcerait votre profil pour des environnements de production."

        )

    if "power bi" in skills:

        feedback.append(

            "Vos compétences en visualisation de données sont pertinentes pour les postes analytiques et décisionnels."

        )

    # =========================
    # LEVEL ANALYSIS
    # =========================

    if level == "Senior":

        feedback.append(

            "Votre profil semble adapté à des responsabilités techniques avancées et potentiellement à des rôles de leadership."

        )

    elif level == "Mid-Level":

        feedback.append(

            "Avec davantage d'expérience terrain et quelques certifications stratégiques, vous pourriez rapidement évoluer vers un niveau Senior."

        )

    else:

        feedback.append(

            "Le développement de projets réels et d'expériences professionnelles sera essentiel pour accélérer votre progression."

        )

    # =========================
    # FINAL RECOMMENDATION
    # =========================

    feedback.append(

        "Nous recommandons également de personnaliser votre CV selon le poste ciblé afin d'améliorer le matching ATS."

    )

    return feedback