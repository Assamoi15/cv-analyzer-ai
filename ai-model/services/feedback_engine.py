# services/feedback_engine.py

def generate_feedback(score, skills):

    feedback = []

    # =========================
    # SCORE BASED
    # =========================

    if score < 50:

        feedback.append(
            "Ajoute plus de compétences techniques."
        )

        feedback.append(
            "Travaille sur des projets réels."
        )

    elif score < 75:

        feedback.append(
            "Bon profil mais améliorable."
        )

        feedback.append(
            "Ajoute des certifications."
        )

    else:

        feedback.append(
            "Excellent profil technique."
        )

        feedback.append(
            "Profil adapté aux postes avancés."
        )

    # =========================
    # SKILL BASED
    # =========================

    if "python" not in skills:

        feedback.append(
            "Python est fortement recommandé."
        )

    if "sql" not in skills:

        feedback.append(
            "SQL manque dans le CV."
        )

    if "docker" not in skills:

        feedback.append(
            "Docker est un plus pour les postes backend."
        )

    return feedback