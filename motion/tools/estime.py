"""Minutage estimé d'un script, avant d'avoir la voix (pour la version muette à valider).

usage : python3 motion/tools/estime.py <SCRIPT.md> <timing.js> [PAUSE]

Chaque mot compte 1, une virgule 0,6, une fin de phrase (. ? ! : …) 1,2. L'échelle est calée sur la voix ElevenLabs
de Mathyas : le script de « L'assurance vie » (videos/assurance-vie-long/SCRIPT.md) dure 654,2 s hors respirations.
Entre deux parties : PAUSE secondes de respiration (1,2 par défaut, comme align.py).
Sortie au même format que align.py (window.TIMING) : quand la vraie voix arrive, align.py remplace ce fichier.
"""
import json, os, re, sys

REF, REF_DUR = os.path.join(os.path.dirname(__file__), "../videos/assurance-vie-long/SCRIPT.md"), 654.2

def parts(path):
    body = open(path).read().split("---")[1]
    return [sec.partition("\n")[2] for sec in re.split(r"^## ", body, flags=re.M)[1:]]

def weight(tok):
    w = 1.0
    if re.search(r"[.?!:…»]$", tok): w += 1.2
    elif tok.endswith(","): w += 0.6
    return w

def units(text):   # [(poids, est_repère)]
    out = []
    for m in re.finditer(r"\[(\d+)\]|(\S+)", text):
        if m.group(1): out.append((0, True))
        elif re.search(r"\w", m.group(2)): out.append((weight(m.group(2)), False))
    return out

k = REF_DUR / sum(w for p in parts(REF) for w, _ in units(p))
src, dst = sys.argv[1], sys.argv[2]
PAUSE = float(sys.argv[3]) if len(sys.argv) > 3 else 1.2
t, timing = 0.0, {"parts": []}
for i, p in enumerate(parts(src)):
    if i: t += PAUSE
    part = {"start": round(t, 2), "markers": []}
    for w, mark in units(p):
        if mark: part["markers"].append(round(t, 2))
        t += w * k
    timing["parts"].append(part)
timing["total"] = round(t + 0.6, 2)
open(dst, "w").write("window.TIMING = " + json.dumps(timing) + ";\n")
print(f"{len(timing['parts'])} parties · {timing['total']:.1f} s ({timing['total'] / 60:.1f} min) · {k:.3f} s par mot")
