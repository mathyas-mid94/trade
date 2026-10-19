"""Nettoie une voix off enregistrée sur un script, puis cale les repères [n] du script sur l'audio.

usage : python3 motion/tools/align.py <audio_brut> <transcription.json> <SCRIPT.md> <dossier_sortie>

1. « banane » = code de reprise : on supprime la phrase ratée (depuis le début de la phrase reprise) et le mot « banane ».
2. Les silences de plus de 0,9 s sont ramenés à 0,7 s (les pauses de 3 s entre parties ne sont plus nécessaires).
3. Le texte du script est aligné mot à mot sur la transcription : chaque repère [n] prend l'instant de fin du mot qui le précède.
Sorties : voix_script.m4a (voix nettoyée, volume normalisé), timing.js (window.TIMING), montage.txt (rapport).
"""
import json, re, subprocess, sys, unicodedata, difflib, os

audio, tjson, script_md, out = sys.argv[1:5]
words = json.load(open(tjson))["words"]

def norm(w):
    w = unicodedata.normalize("NFD", w.lower())
    w = "".join(c for c in w if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9%]", "", w)

for w in words: w["n"] = norm(w["w"])
words = [w for w in words if w["n"]]
report = []

# ---------- 1. reprises « banane » ----------
cuts = []   # intervalles [a, b] à supprimer
i = 0
while i < len(words):
    if words[i]["n"].startswith("banan"):
        nxt = [w["n"] for w in words[i + 1:i + 4]]
        start = None
        # cherche, avant « banane », l'endroit où commençait la phrase que l'on reprend
        for j in range(i - 1, max(-1, i - 60), -1):
            if [w["n"] for w in words[j:j + len(nxt)]] == nxt and nxt:
                start = j; break
        if start is None:   # sinon : depuis la dernière vraie pause avant « banane »
            start = i
            while start > 0 and words[start]["a"] - words[start - 1]["b"] < 0.6: start -= 1
        a, b = words[start]["a"] - 0.05, (words[i + 1]["a"] - 0.08) if i + 1 < len(words) else words[i]["b"] + 0.1
        cuts.append([a, b])
        report.append(f"reprise à {a:7.2f}s : supprimé « {' '.join(w['w'] for w in words[start:i + 1])} »")
        del words[start:i + 1]
        i = start
        continue
    i += 1

# ---------- 1 bis. reprises sans « banane » : même suite de 6 mots répétée peu après -> on garde la dernière ----------
N = 6
i = 0
while i + N <= len(words):
    g = [w["n"] for w in words[i:i + N]]
    found = None
    for j in range(i + N, min(len(words) - N + 1, i + 160)):
        if [w["n"] for w in words[j:j + N]] == g: found = j; break
    if found is not None:
        a, b = words[i]["a"] - 0.05, words[found]["a"] - 0.08
        cuts.append([a, b])
        report.append(f"reprise sans banane à {a:7.2f}s : supprimé « {' '.join(w['w'] for w in words[i:found])} »")
        del words[i:found]
        continue
    i += 1

# ---------- 2. silences trop longs ----------
for k in range(1, len(words)):
    gap = words[k]["a"] - words[k - 1]["b"]
    if gap > 0.9:
        cuts.append([words[k - 1]["b"] + 0.35, words[k]["a"] - 0.35])

cuts.sort()
merged = []
for a, b in cuts:
    if b <= a: continue
    if merged and a <= merged[-1][1]: merged[-1][1] = max(merged[-1][1], b)
    else: merged.append([a, b])
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", audio], capture_output=True, text=True).stdout)
keep, t0 = [], max(0.0, words[0]["a"] - 0.3)
for a, b in merged:
    if a > t0: keep.append([t0, a])
    t0 = max(t0, b)
keep.append([t0, min(dur, words[-1]["b"] + 0.6)])

def remap(t):   # temps brut -> temps dans la voix nettoyée
    acc = 0.0
    for a, b in keep:
        if t < a: return acc
        if t <= b: return acc + (t - a)
        acc += b - a
    return acc
total = sum(b - a for a, b in keep)

# ---------- audio nettoyé ----------
parts = "".join(f"[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,afade=t=out:st={max(0, b - a - 0.03):.3f}:d=0.03[s{k}];" for k, (a, b) in enumerate(keep))
fc = parts + "".join(f"[s{k}]" for k in range(len(keep))) + f"concat=n={len(keep)}:v=0:a=1,highpass=f=70,loudnorm=I=-16:TP=-1.5:LRA=11[o]"
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", audio, "-filter_complex", fc, "-map", "[o]", "-ar", "48000", "-ac", "2",
                "-c:a", "aac", "-b:a", "192k", os.path.join(out, "voix_script.m4a")], check=True)

# ---------- 3. alignement script <-> transcription ----------
body = open(script_md).read().split("---")[1]
sections = re.split(r"^## ", body, flags=re.M)[1:]
tokens, part_of, marker_after = [], [], {}
for p, sec in enumerate(sections):
    text = sec.partition("\n")[2]
    for m in re.finditer(r"\[(\d+)\]|([^\s\[\]]+)", text):
        if m.group(1):
            marker_after.setdefault(p, []).append(len(tokens) - 1)
        else:
            n = norm(m.group(2))
            if n: tokens.append(n); part_of.append(p)
spoken = [w["n"] for w in words]
sm = difflib.SequenceMatcher(None, tokens, spoken, autojunk=False)
tok2w = {}
for blk in sm.get_matching_blocks():
    for k in range(blk.size): tok2w[blk.a + k] = blk.b + k
def time_of(ti, end=True):
    # mot aligné le plus proche (vers l'arrière, puis vers l'avant)
    for d in range(0, 40):
        for tj in (ti - d, ti + d):
            if tj in tok2w:
                w = words[tok2w[tj]]; return remap(w["b"] if end else w["a"])
    return None
timing = {"total": round(total, 2), "parts": []}
for p in range(len(sections)):
    first = part_of.index(p)
    start = time_of(first, end=False)
    marks = [time_of(ti) for ti in marker_after.get(p, [])]
    timing["parts"].append({"start": round(start, 2), "markers": [round(m, 2) if m is not None else None for m in marks]})
    report.append(f"partie {p + 1:2d} : début {start:7.2f}s, repères {['%.1f' % m for m in marks if m is not None]}")
cov = len(tok2w) / len(tokens)
report.insert(0, f"voix nettoyée : {total:.1f}s (brut {dur:.1f}s) · mots du script retrouvés : {cov:.0%}")
json.dump([{"w": w["w"], "t": round(remap(w["a"]), 2)} for w in words], open(os.path.join(out, ".mots_nettoyes.json"), "w"), ensure_ascii=False)
open(os.path.join(out, "timing.js"), "w").write("window.TIMING = " + json.dumps(timing) + ";\n")
open(os.path.join(out, "montage.txt"), "w").write("\n".join(report) + "\n")
print("\n".join(report[:3])); print("…", len(report), "lignes dans montage.txt")
