# services/pdf_report.py

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)

from reportlab.lib.pagesizes import letter

from datetime import datetime

import os

# =========================
# GENERATE PDF REPORT
# =========================

def generate_pdf_report(data):

    if not os.path.exists("reports"):

        os.makedirs("reports")

    filename = (
        f"reports/report_"
        f"{datetime.now().timestamp()}.pdf"
    )

    doc = SimpleDocTemplate(
        filename,
        pagesize=letter
    )

    styles = getSampleStyleSheet()

    elements = []

    # =========================
    # TITLE
    # =========================

    elements.append(
        Paragraph(
            "CV Analyzer AI Report",
            styles["Title"]
        )
    )

    elements.append(Spacer(1, 20))

    # =========================
    # SCORE
    # =========================

    elements.append(
        Paragraph(
            f"<b>ATS Score:</b> "
            f"{data.get('score', 0)}",
            styles["BodyText"]
        )
    )

    elements.append(
        Paragraph(
            f"<b>Level:</b> "
            f"{data.get('level', '-')}",
            styles["BodyText"]
        )
    )

    elements.append(Spacer(1, 15))

    # =========================
    # SKILLS
    # =========================

    skills = ", ".join(
        data.get("skills", [])
    )

    elements.append(
        Paragraph(
            f"<b>Skills:</b> {skills}",
            styles["BodyText"]
        )
    )

    elements.append(Spacer(1, 15))

    # =========================
    # FEEDBACK
    # =========================

    feedback = data.get(
        "feedback",
        []
    )

    elements.append(
        Paragraph(
            "<b>AI Feedback:</b>",
            styles["Heading2"]
        )
    )

    for item in feedback:

        elements.append(
            Paragraph(
                f"• {item}",
                styles["BodyText"]
            )
        )

    elements.append(Spacer(1, 15))

    # =========================
    # DATE
    # =========================

    elements.append(
        Paragraph(
            f"<b>Generated:</b> "
            f"{datetime.now()}",
            styles["BodyText"]
        )
    )

    # =========================
    # BUILD PDF
    # =========================

    doc.build(elements)

    return filename