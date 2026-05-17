# services/skill_extractor_ai.py

from sentence_transformers import (
    SentenceTransformer
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)

# =========================
# LOAD MODEL
# =========================

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

# =========================
# SKILLS DATABASE
# =========================

SKILLS = {

    # =========================
    # PROGRAMMING
    # =========================

    "python": [
        "python",
        "py developer",
        "python developer"
    ],

    "java": [
        "java",
        "java developer"
    ],

    "javascript": [
        "javascript",
        "js developer"
    ],

    "typescript": [
        "typescript",
        "ts developer"
    ],

    "c++": [
        "c++",
        "cpp"
    ],

    # =========================
    # AI / DATA
    # =========================

    "machine learning": [
        "machine learning",
        "ml engineer",
        "predictive analytics",
        "ml"
    ],

    "deep learning": [
        "deep learning",
        "ai modeling",
        "neural networks",
        "artificial intelligence"
    ],

    "data science": [
        "data science",
        "data analytics",
        "analytics",
        "data analyst"
    ],

    "nlp": [
        "nlp",
        "natural language processing"
    ],

    "computer vision": [
        "computer vision",
        "image processing"
    ],

    "tensorflow": [
        "tensorflow"
    ],

    "pytorch": [
        "pytorch"
    ],

    "pandas": [
        "pandas"
    ],

    "numpy": [
        "numpy"
    ],

    "statistics": [
        "statistics",
        "statistical analysis"
    ],

    # =========================
    # DATABASES
    # =========================

    "sql": [
        "sql",
        "mysql",
        "postgresql",
        "sqlite",
        "database"
    ],

    "mongodb": [
        "mongodb",
        "nosql"
    ],

    # =========================
    # BACKEND
    # =========================

    "fastapi": [
        "fastapi",
        "api development",
        "rest api"
    ],

    "spring boot": [
        "spring boot",
        "spring"
    ],

    "node.js": [
        "nodejs",
        "node.js",
        "express js"
    ],

    # =========================
    # FRONTEND
    # =========================

    "react": [
        "react",
        "frontend react",
        "reactjs"
    ],

    "angular": [
        "angular"
    ],

    "vue": [
        "vue",
        "vuejs"
    ],

    "html": [
        "html"
    ],

    "css": [
        "css"
    ],

    # =========================
    # DEVOPS / CLOUD
    # =========================

    "docker": [
        "docker",
        "containerization"
    ],

    "kubernetes": [
        "kubernetes",
        "k8s"
    ],

    "aws": [
        "aws",
        "amazon web services"
    ],

    "linux": [
        "linux",
        "ubuntu"
    ],

    "git": [
        "git",
        "github"
    ],

    # =========================
    # BI / ANALYTICS
    # =========================

    "power bi": [
        "power bi",
        "business intelligence"
    ],

    "excel": [
        "excel",
        "spreadsheet"
    ],

    # =========================
    # FINANCE
    # =========================

    "finance": [
        "finance",
        "financial analysis"
    ],

    "risk management": [
        "risk management",
        "risk analysis"
    ]
}

# =========================
# BUILD EMBEDDINGS
# =========================

skill_embeddings = {}

for skill, synonyms in SKILLS.items():

    embeddings = model.encode(
        synonyms
    )

    skill_embeddings[skill] = embeddings

# =========================
# EXTRACT AI SKILLS
# =========================

def extract_skills_ai(text):

    if not text:
        return []

    text = text.lower()

    text_embedding = model.encode(
        [text]
    )[0]

    found_skills = []

    for skill, embeddings in (
        skill_embeddings.items()
    ):

        # =========================
        # DIRECT KEYWORD MATCH
        # =========================

        for synonym in SKILLS[skill]:

            if synonym.lower() in text:

                found_skills.append(skill)

                break

        # =========================
        # AI SEMANTIC MATCH
        # =========================

        for emb in embeddings:

            similarity = cosine_similarity(
                [text_embedding],
                [emb]
            )[0][0]

            if similarity >= 0.30:

                found_skills.append(skill)

                break

    return sorted(
        list(set(found_skills))
    )

    if not text:
        return []

    text = text.lower()

    text_embedding = model.encode(
        [text]
    )[0]

    found_skills = []

    # =========================
    # AI MATCHING
    # =========================

    for skill, embeddings in (
        skill_embeddings.items()
    ):

        for emb in embeddings:

            similarity = cosine_similarity(
                [text_embedding],
                [emb]
            )[0][0]

            # =========================
            # THRESHOLD
            # =========================

            if similarity >= 0.30:

                found_skills.append(skill)

                break

    # =========================
    # REMOVE DUPLICATES
    # =========================

    return sorted(
        list(set(found_skills))
    )