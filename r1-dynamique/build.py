"""Génère les deux versions du deck MIC à partir de src/deck.src.html.

    python3 build.py

- Presentation_Complete_MIC.html : rendez-vous de découverte complet (slides 1 à 22)
- R1_Dynamique_MIC.html          : R1 dynamique seul (remplace les slides 13 à 22)
"""
import base64
from pathlib import Path

ROOT = Path(__file__).parent
SRC = (ROOT / "src" / "deck.src.html").read_text(encoding="utf-8")

TARGETS = {
    "Presentation_Complete_MIC.html": ("full", "Rendez-vous de découverte — Midelton Investment Capital"),
    "R1_Dynamique_MIC.html": ("r1", "Bilan patrimonial — Midelton Investment Capital"),
}

def data_uri(name):
    raw = (ROOT / "src" / "assets" / name).read_bytes()
    return "data:image/jpeg;base64," + base64.b64encode(raw).decode()

ASSETS = {"__MAJORS_DASH__": data_uri("majors_dash.jpg"), "__MAJORS_LOGO__": data_uri("majors_logo.jpg")}

for name, (mode, title) in TARGETS.items():
    html = SRC.replace("__MODE__", mode).replace("__TITLE__", title)
    for key, uri in ASSETS.items():
        html = html.replace(key, uri if mode == "full" else "")
    (ROOT / name).write_text(html, encoding="utf-8")
    print(f"{name}  ({mode}, {len(html) // 1024} Ko)")
