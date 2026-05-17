import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import Pipeline

# =========================
# 1. LOAD DATA
# =========================
df = pd.read_csv("/home/chris/Téléchargements/archive (7)/resume_data.csv")

# =========================
# 2. FEATURE ENGINEERING
# =========================
def build_cv_text(row):
    return " ".join([
        str(row["career_objective"]),
        str(row["skills"]),
        str(row["degree_names"]),
        str(row["major_field_of_studies"]),
        str(row["professional_company_names"])
    ])

df["cv_text"] = df.apply(build_cv_text, axis=1)
df["cv_text"] = df["cv_text"].fillna("").str.lower()

# =========================
# 3. REALISTIC SCORE CREATION (TARGET)
# =========================
def compute_score(row):
    score = 0

    # Skills importance
    skills_len = len(str(row["skills"]))
    if skills_len > 100:
        score += 40
    elif skills_len > 50:
        score += 25
    else:
        score += 10

    # Education
    if "b.tech" in str(row["degree_names"]).lower() or "master" in str(row["degree_names"]).lower():
        score += 20
    else:
        score += 10

    # Experience (companies)
    companies = str(row["professional_company_names"])
    if "company name" not in companies.lower():
        score += 25
    else:
        score += 10

    # Career objective quality
    if len(str(row["career_objective"])) > 100:
        score += 15
    else:
        score += 5

    return min(score, 100)

df["score"] = df.apply(compute_score, axis=1)

# =========================
# 4. TRAIN / TEST SPLIT
# =========================
X = df["cv_text"]
y = df["score"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

# =========================
# 5. MODEL (REGRESSION → SCORE)
# =========================
model = Pipeline([
    ("tfidf", TfidfVectorizer(max_features=5000, ngram_range=(1,2))),
    ("reg", LinearRegression())
])

model.fit(X_train, y_train)

# =========================
# 6. TEST
# =========================
preds = model.predict(X_test)

print("\n📊 SAMPLE SCORES:")
for i in range(5):
    print(f"Pred: {preds[i]:.2f} | Real: {y_test.iloc[i]}")

# =========================
# 7. SAVE MODEL
# =========================
joblib.dump(model, "cv_score_model.pkl")

print("\n✅ CV Scoring Model saved!")