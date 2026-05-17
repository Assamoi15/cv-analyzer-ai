# predict.py

from services.scoring_engine import calculate_score
from services.feedback_engine import generate_feedback

def predict_cv(cv_text):

    # =========================
    # 1. SCORE ENGINE
    # =========================

    result = calculate_score(cv_text)

    score = result["score"]
    skills = result["skills"]

    # =========================
    # 2. LEVEL
    # =========================

    if score >= 75:
        level = "Senior"

    elif score >= 50:
        level = "Mid-Level"

    else:
        level = "Junior"

    # =========================
    # 3. FEEDBACK ENGINE
    # =========================

    from services.gpt_feedback_engine import (
    generate_ai_feedback
)

    feedback = generate_ai_feedback(
    cv_text,
    score,
    level
)

    # =========================
    # 4. RETURN JSON
    # =========================

    return {
        "score": float(score),
        "level": level,
        "skills": skills,
        "feedback": feedback
    }


# =========================
# LOCAL TEST
# =========================

if __name__ == "__main__":

    test_cv = """
    Python SQL Machine Learning React FastAPI Docker.
    Développeur backend avec projets IA.
    Stage data science.
    """

    result = predict_cv(test_cv)

    print("\n📊 CV ANALYSIS RESULT")
    print("----------------------")

    print("Score:", result["score"])
    print("Level:", result["level"])

    print("\n🧠 Skills détectées:")
    for skill in result["skills"]:
        print("-", skill)

    print("\n💬 Feedback:")
    for f in result["feedback"]:
        print("-", f)