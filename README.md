# CV Analyzer AI 🚀

Plateforme intelligente d’analyse de CV alimentée par l’Intelligence Artificielle permettant d’automatiser le recrutement et d’améliorer le matching entre candidats et offres d’emploi.

📌 Fonctionnalités

✅ Analyse de CV

Upload de CV PDF

Upload d’images et photos de CV

Extraction automatique de texte avec OCR

Détection intelligente des compétences

Analyse ATS (Applicant Tracking System)

Calcul du score de compatibilité CV ↔ Offre d’emploi

Analyse du niveau du candidat

Génération automatique de feedback ATS

✅ Analyse d’offres d’emploi

Analyse d’offres via URL LinkedIn

Extraction automatique des compétences recherchées

Comparaison CV ↔ Offre

Détection des compétences manquantes

Score de matching intelligent

✅ Intelligence Artificielle

NLP (Natural Language Processing)

OCR avec Tesseract

Extraction de compétences

Matching intelligent

Générateur de questions d’entretien avec l’IA

✅ Backend

API REST avec FastAPI

Architecture modulaire

PostgreSQL

Endpoints d’analyse

Traitement temps réel

✅ Frontend (en cours)

Dashboard React

Interface moderne

Visualisation des scores ATS

Analyse temps réel

⚙️ Stack Technique

Backend

Python

FastAPI

PostgreSQL

spaCy

Tesseract OCR

Uvicorn

Frontend

React.js

TailwindCSS

Axios

Recharts

IA / NLP

Machine Learning

NLP

OCR

Extraction intelligente de compétences

🧠 Architecture du projet

Upload CV
   ↓
Extraction OCR
   ↓
Analyse NLP / IA
   ↓
Détection des compétences
   ↓
Matching ATS
   ↓
Sauvegarde PostgreSQL
   ↓
Dashboard React

📷 Fonctionnalités OCR

Le système supporte :

✅ CV PDF

✅ Images PNG/JPG

✅ Photos de CV prises par téléphone

Extraction automatique des :

compétences,

expériences,

technologies,

niveaux du profil.
🔥 Exemple de résultat
{
  "matching_score": 85.71,
  "matched_skills": [
    "python",
    "machine learning",
    "sql",
    "deep learning"
  ],
  "missing_skills": [
    "power bi"
  ]
}
🚀 Installation
1. Cloner le projet
git clone https://github.com/Assamoi15/cv-analyzer-ai.git

3. Backend
   
cd backend

pip install -r requirements.txt

uvicorn main:app --reload

API disponible sur :

http://127.0.0.1:8000

Swagger UI :

http://127.0.0.1:8000/docs

3. Frontend
   
cd frontend

npm install

npm run dev

📡 API Endpoints

Upload CV Image

POST /upload-image

Matching ATS

POST /matching

Analyse URL LinkedIn

POST /analyze-job-url

🎯 Objectif du projet

Créer une plateforme capable de :

automatiser l’analyse des CV,
aider les RH à filtrer les candidats,
améliorer le matching candidat ↔ entreprise,
détecter les compétences manquantes,
générer des questions d’entretien automatiquement,
fournir des dashboards intelligents.
🚧 Améliorations futures
Authentification JWT
Dashboard RH complet
Analyse multi-CV
Recommandations IA avancées
Semantic Matching avec Transformers
Docker
Déploiement Cloud
Kubernetes
Support multilingue
👨‍💻 Auteur

Kouassi Assamoi Chris Emmanuel

Étudiant en MIAGE passionné par :

l’Intelligence Artificielle,

la Data Science,

le Machine Learning,

les systèmes intelligents,

et les applications IA appliquées à la finance et au recrutement.

📌 Technologies clés

Python FastAPI React PostgreSQL OCR

Machine Learning NLP AI spaCy

Tesseract ATS Data Science

⭐ Contribution

Les contributions, idées et suggestions sont les bienvenues.

📄 Licence

Projet open-source à but éducatif et professionnel.
