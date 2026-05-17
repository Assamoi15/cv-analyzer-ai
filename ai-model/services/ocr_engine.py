import easyocr
from PIL import Image
import numpy as np

# =========================
# OCR READER
# =========================

reader = easyocr.Reader(
    ['en', 'fr'],
    gpu=False
)

# =========================
# EXTRACT TEXT IMAGE
# =========================

def extract_text_from_image(image_path):

    results = reader.readtext(image_path)

    text = ""

    for result in results:

        detected_text = result[1]

        text += detected_text + " "

    return text.strip()