from fastapi import (
    FastAPI,
    UploadFile,
    File,
    HTTPException,
    Depends
)

from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials
)

from fastapi.middleware.cors import (
    CORSMiddleware
)

from pydantic import BaseModel

from jose import jwt

from sqlalchemy import func

from fastapi.responses import FileResponse

import fitz
import logging
import os
import tempfile
from pathlib import Path

# =========================
# LOCAL IMPORTS
# =========================

from predict import predict_cv

from services.matching_engine import (
    calculate_matching,
    compute_matching
)

from services.skill_gap_engine import (
    analyze_skill_gap
)

from services.scoring_engine import (
    calculate_job_score
)

from services.recruiter_ai import (
    recruiter_decision
)

from services.interview_engine import (
    generate_interview
)

from services.pdf_report import (
    generate_pdf_report
)

from database.db import (
    SessionLocal
)

from database.models import (
    Analysis,
    User
)

from auth.security import (
    hash_password,
    verify_password
)

from auth.auth import (
    create_access_token,
    SECRET_KEY,
    ALGORITHM
)

from services.ocr_engine import (
    extract_text_from_image
)

from services.url_cv_engine import (
    extract_cv_from_url
)

from services.job_scraper import (
    extract_job_description
)

# =========================
# LOGGING
# =========================

logging.basicConfig(
    level=logging.INFO
)

logger = logging.getLogger(__name__)

# =========================
# FASTAPI
# =========================

app = FastAPI(
    title="CV Analyzer AI",
    version="1.0.0"
)

security = HTTPBearer()

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# PYDANTIC MODELS
# =========================

class CvRequest(BaseModel):

    cv: str


class MatchingRequest(BaseModel):

    cv: str
    target_job: str


class JobURLRequest(BaseModel):

    cv: str
    job_url: str


class UserLogin(BaseModel):

    username: str
    password: str


# =========================
# HOME
# =========================

@app.get("/")
def home():

    return {
        "message":
        "CV Analyzer AI API running"
    }


# =========================
# ANALYZE TEXT
# =========================

@app.post("/analyze")
def analyze(data: CvRequest):

    try:

        logger.info(
            "Running CV analysis..."
        )

        cv_text = data.cv

        result = predict_cv(cv_text)

        db = SessionLocal()

        analysis = Analysis(
            candidate_name="Manual Input",
            score=result["score"],
            level=result["level"]
        )

        db.add(analysis)

        db.commit()

        db.close()

        logger.info(
            "Analysis saved to database"
        )

        return result

    except Exception as e:

        logger.error(str(e))

        raise HTTPException(
            status_code=500,
            detail="CV analysis failed"
        )


# =========================
# ANALYZE CV FROM URL
# =========================

@app.post("/analyze-cv-url")
def analyze_cv_url(data: dict):

    try:

        logger.info(
            "Running CV analysis from URL..."
        )

        cv_url = data.get("cv_url")

        if not cv_url:

            raise HTTPException(
                status_code=400,
                detail="cv_url is required"
            )

        text = extract_cv_from_url(cv_url)

        if not text:

            raise HTTPException(
                status_code=400,
                detail="Unable to extract CV from URL"
            )

        result = predict_cv(text)

        # =========================
        # SAVE DATABASE
        # =========================

        db = SessionLocal()

        analysis = Analysis(
            candidate_name=cv_url,
            score=result["score"],
            level=result["level"]
        )

        db.add(analysis)

        db.commit()

        db.close()

        logger.info(
            "CV analysis from URL saved to database"
        )

        return result

    except HTTPException as e:

        raise e

    except Exception as e:

        logger.error(str(e))

        raise HTTPException(
            status_code=500,
            detail="CV URL analysis failed"
        )


# =========================
# PDF UPLOAD
# =========================

@app.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...)
):

    try:

        logger.info(
            f"Uploading PDF: {file.filename}"
        )

        # =========================
        # VALIDATION
        # =========================

        if not file.filename.endswith(".pdf"):

            raise HTTPException(
                status_code=400,
                detail="Only PDF files allowed"
            )

        # =========================
        # READ PDF
        # =========================

        pdf_bytes = await file.read()

        pdf = fitz.open(
            stream=pdf_bytes,
            filetype="pdf"
        )

        text = ""

        # =========================
        # EXTRACT TEXT
        # =========================

        for page in pdf:

            text += page.get_text()

        if not text.strip():

            raise HTTPException(
                status_code=400,
                detail="No text found in PDF"
            )

        # =========================
        # AI ANALYSIS
        # =========================

        result = predict_cv(text)

        # =========================
        # SAVE DATABASE
        # =========================

        db = SessionLocal()

        analysis = Analysis(
            candidate_name=file.filename,
            score=result["score"],
            level=result["level"]
        )

        db.add(analysis)

        db.commit()

        db.close()

        logger.info(
            "PDF analysis saved to database"
        )

        return result

    except HTTPException as e:

        raise e

    except Exception as e:

        logger.error(str(e))

        raise HTTPException(
            status_code=500,
            detail="PDF processing failed"
        )


# =========================
# IMAGE UPLOAD
# =========================

@app.post("/upload-image")
async def upload_image(
    file: UploadFile = File(...)
):

    try:

        logger.info(
            f"Uploading image: {file.filename}"
        )

        allowed = (
            file.filename.endswith(".png")
            or file.filename.endswith(".jpg")
            or file.filename.endswith(".jpeg")
        )

        if not allowed:

            raise HTTPException(
                status_code=400,
                detail="Only image files allowed"
            )

        # =========================
        # SAVE IMAGE TEMPORARILY
        # =========================

        suffix = Path(file.filename).suffix
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as buffer:

            content = await file.read()
            buffer.write(content)
            image_path = buffer.name

        try:

            # =========================
            # OCR EXTRACTION
            # =========================

            text = extract_text_from_image(image_path)

            if not text.strip():

                raise HTTPException(
                    status_code=400,
                    detail="No text detected"
                )

            # =========================
            # AI ANALYSIS
            # =========================

            result = predict_cv(text)

            # =========================
            # SAVE DATABASE
            # =========================

            db = SessionLocal()

            analysis = Analysis(
                candidate_name=file.filename,
                score=result["score"],
                level=result["level"]
            )

            db.add(analysis)
            db.commit()
            db.close()

            return {
                "extracted_text": text,
                "analysis": result
            }

        finally:
            if os.path.exists(image_path):
                os.remove(image_path)

    except HTTPException as e:
        raise e

    except Exception as e:

        logger.error(str(e))

        raise HTTPException(
            status_code=500,
            detail="Image OCR failed"
        )


# =========================
# JOB MATCHING
# =========================

@app.post("/matching")
def matching(
    data: MatchingRequest
):

    try:

        logger.info(
            "Running job matching..."
        )

        result = calculate_matching(
            data.cv,
            data.target_job
        )

        return result

    except Exception as e:

        logger.error(str(e))

        raise HTTPException(
            status_code=500,
            detail="Matching failed"
        )


# =========================
# ANALYZE JOB FROM URL
# =========================

@app.post("/analyze-job-url")
def analyze_job_url(data: JobURLRequest):

    try:

        logger.info(
            "Running job URL analysis..."
        )

        job_text = extract_job_description(
            data.job_url
        )

        if not job_text:

            raise HTTPException(
                status_code=400,
                detail="Unable to extract job description from URL"
            )

        result = compute_matching(
            data.cv,
            job_text
        )

        logger.info(
            "Job URL analysis completed"
        )

        return {
            "target_job": data.job_url,
            **result
        }

    except HTTPException as e:

        raise e

    except Exception as e:

        logger.error(str(e))

        raise HTTPException(
            status_code=500,
            detail="Job URL analysis failed"
        )


# =========================
# DASHBOARD STATS
# =========================

@app.get("/stats")
def get_stats():

    try:

        db = SessionLocal()

        total_cv = db.query(
            Analysis
        ).count()

        average_score = db.query(
            func.avg(Analysis.score)
        ).scalar()

        senior_count = db.query(
            Analysis
        ).filter(
            Analysis.level == "Senior"
        ).count()

        analyses = db.query(
            Analysis
        ).order_by(
            Analysis.created_at.desc()
        ).all()

        history = []

        for a in analyses:

            history.append({

                "name":
                    a.candidate_name,

                "score":
                    a.score,

                "level":
                    a.level,

                "date":
                    str(a.created_at)
            })

        db.close()

        return {

            "total_cv":
                total_cv,

            "average_score":
                round(average_score or 0, 2),

            "senior_count":
                senior_count,

            "history":
                history
        }

    except Exception as e:

        logger.error(str(e))

        raise HTTPException(
            status_code=500,
            detail="Stats failed"
        )


# =========================
# REGISTER
# =========================

@app.post("/register")
def register(data: dict):

    db = SessionLocal()

    existing = db.query(User).filter(
        User.username == data["username"]
    ).first()

    if existing:

        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    user = User(

        username=data["username"],

        password=hash_password(
            data["password"]
        ),

        role=data.get(
            "role",
            "recruiter"
        )
    )

    db.add(user)

    db.commit()

    db.close()

    return {
        "message": "User created"
    }


# =========================
# LOGIN
# =========================

@app.post("/login")
def login(user: UserLogin):

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if not existing_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
        user.password,
        existing_user.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_access_token({

        "sub":
            existing_user.username,

        "role":
            existing_user.role
    })

    return {

        "access_token":
            token,

        "role":
            existing_user.role
    }


# =========================
# CURRENT USER
# =========================

@app.get("/me")
def get_me(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    try:

        token = credentials.credentials

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return {

            "username":
                payload["sub"],

            "role":
                payload["role"]
        }

    except Exception as e:

        logger.error(str(e))

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )


# =========================
# TOP CANDIDATES
# =========================

@app.get("/top-candidates")
def top_candidates():

    db = SessionLocal()

    candidates = (

        db.query(Analysis)

        .order_by(
            Analysis.score.desc()
        )

        .limit(10)

        .all()
    )

    results = []

    for c in candidates:

        results.append({

            "id":
                c.id,

            "candidate_name":
                c.candidate_name,

            "score":
                c.score,

            "level":
                c.level
        })

    db.close()

    return results


# =========================
# SKILL GAP
# =========================

@app.post("/skill-gap")
def skill_gap(data: dict):

    result = analyze_skill_gap(

        data["cv"],

        data["target_job"]
    )

    return result


# =========================
# JOB SCORE
# =========================

@app.post("/job-score")
def job_score(data: dict):

    result = calculate_job_score(

        data["cv"],

        data["target_job"]
    )

    return result


# =========================
# RECRUITER AI
# =========================

@app.post("/recruiter-decision")
def recruiter_ai(data: dict):

    result = recruiter_decision(

        data["cv"],

        data["target_job"]
    )

    return result


# =========================
# AI INTERVIEW
# =========================

@app.post("/generate-interview")
def generate_ai_interview(
    data: dict
):

    cv_text = data["cv"]

    result = predict_cv(cv_text)

    interview = generate_interview(
        cv_text,
        result["level"]
    )

    return interview


# =========================
# PDF REPORT
# =========================

@app.post("/generate-report")
def generate_report(
    data: dict
):

    result = predict_cv(
        data["cv"]
    )

    pdf_path = generate_pdf_report(
        result
    )

    return FileResponse(

        pdf_path,

        media_type="application/pdf",

        filename="cv_report.pdf"
    )


