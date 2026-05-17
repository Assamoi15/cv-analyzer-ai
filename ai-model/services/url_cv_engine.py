import requests
import fitz

def extract_cv_from_url(url):

    response = requests.get(url)

    if response.status_code != 200:

        return None

    pdf_bytes = response.content

    pdf = fitz.open(
        stream=pdf_bytes,
        filetype="pdf"
    )

    text = ""

    for page in pdf:

        text += page.get_text()

    return text