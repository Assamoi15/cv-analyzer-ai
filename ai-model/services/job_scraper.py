import requests
from bs4 import BeautifulSoup
import re

def extract_job_description(url):

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(url, headers=headers)

    soup = BeautifulSoup(response.text, "html.parser")

    # remove scripts/styles/noscript
    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    text = soup.get_text(separator=" ")

    # normalize whitespace
    text = re.sub(r"\s+", " ", text).strip()

    return text