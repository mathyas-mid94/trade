"""Nettoie une voix off enregistrée sur un script, puis cale les repères [n] du script sur l'audio.

usage : python3 motion/tools/align.py <audio_brut> <transcription.json> <SCRIPT.md> <dossier_sortie>

1. « banane » = code de reprise : on supprime la phrase ratée (depuis le début de la phrase reprise) et le mot « banane ».
2. Les silences de plus de 0,9 s sont ramenés à 0,7 s (les pauses de 3 s entre parties ne sont plus nécessaires).
3. Le texte du script est aligné mot à mot sur la transcription : chaque repère [n] prend l'instant de fin du mot qui le précède.
Option : REPRISES=0 désactive la suppression des passages répétés (voix ElevenLabs).
Option : PAUSE=1.2 (variable d'environnement) ajoute une respiration de 1,2 s entre deux parties
(utile pour une voix de synthèse qui enchaîne tout : chaque scène garde ainsi sa dernière image à l'écran).
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
# désactivé avec REPRISES=0 (voix de synthèse : pas de reprise, et le script peut répéter une tournure exprès)
N = 6
i = 0 if os.environ.get("REPRISES", "1") != "0" else len(words)
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
# ---------- audio nettoyé ----------
# Chaque raccord est un fondu enchaîné à puissance constante de 40 ms (pas de passage par le silence -> pas de clic).
# Les segments débordent de 20 ms de chaque côté dans la zone coupée : la durée totale (et donc le calage) ne change pas.
import numpy as np, tempfile
SR, XF = 48000, 0.04
raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", audio, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
xr = np.frombuffer(raw, np.float32)
h = int(XF * SR / 2)
ramp = np.sin(np.linspace(0, np.pi / 2, 2 * h)) ** 2
outbuf = np.zeros(int(total * SR) + 2 * h + SR, np.float32)
pos = 0
for k, (a, b) in enumerate(keep):
    ia, ib = int(a * SR), int(b * SR)
    seg = xr[max(0, ia - h):min(len(xr), ib + h)].copy()
    if k > 0: seg[:2 * h] *= ramp[:len(seg[:2 * h])]
    if k < len(keep) - 1: seg[-2 * h:] *= ramp[::-1][-len(seg[-2 * h:]):]
    o = max(0, pos - h)
    outbuf[o:o + len(seg)] += seg
    pos += ib - ia
outbuf = outbuf[:pos + h]
PAUSE = float(os.environ.get("PAUSE", "0"))
_f = int(0.02 * SR); _n = len(outbuf) // _f
_db = 10 * np.log10(np.mean(outbuf[:_n * _f].reshape(_n, _f) ** 2, axis=1) + 1e-12)
SIL_DB = np.percentile(_db, 95) - 35   # « silence » : 35 dB sous le niveau de la voix
ins, ins_of = [], {}   # instants (voix nettoyée) où insérer une respiration : au milieu du blanc entre deux parties
if PAUSE > 0:
    for p in range(1, len(sections)):
        first = part_of.index(p)
        e, s0 = time_of(first - 1), time_of(first, end=False)
        if e is not None and s0 is not None:
            # le minutage Whisper des mots en début de phrase est peu fiable (« Parlons | impôts ») : on cherche le vrai blanc
            # dans le son, autour de la frontière : la plus longue suite de tranches de 20 ms silencieuses
            lo, hi = max(0, min(e, s0) - 0.7), max(e, s0) + 0.7; mid = (e + s0) / 2
            seg = outbuf[int(lo * SR):int(hi * SR)]; n20 = int(0.02 * SR); nf = len(seg) // n20
            db = 10 * np.log10(np.mean(seg[:nf * n20].reshape(nf, n20) ** 2, axis=1) + 1e-12)
            quiet = db < SIL_DB
            best, k = None, 0
            while k < nf:
                if quiet[k]:
                    k1 = k
                    while k1 < nf and quiet[k1]: k1 += 1
                    sc = (k1 - k) * 0.02 - 0.4 * abs(lo + (k + k1) * 0.01 - mid)   # long blanc, proche de la frontière
                    if best is None or sc > best[2]: best = (k, k1, sc)
                    k = k1
                else: k += 1
            x = lo + (best[0] + best[1]) / 2 * 0.02 if best else ((e + s0) / 2 if s0 > e else e + 0.08)
            ins.append(x); ins_of[p] = x
def shift(t): return None if t is None else t + PAUSE * sum(1 for x in ins if x < t)
timing = {"total": round(total + PAUSE * len(ins), 2), "parts": []}
for p in range(len(sections)):
    first = part_of.index(p)
    start = shift(max(time_of(first, end=False), ins_of.get(p, -1) + 1e-3))
    marks = [shift(time_of(ti)) for ti in marker_after.get(p, [])]
    timing["parts"].append({"start": round(start, 2), "markers": [round(m, 2) if m is not None else None for m in marks]})
    report.append(f"partie {p + 1:2d} : début {start:7.2f}s, repères {['%.1f' % m for m in marks if m is not None]}")
cov = len(tok2w) / len(tokens)
report.insert(0, f"voix nettoyée : {total + PAUSE * len(ins):.1f}s ({len(ins)} respirations de {PAUSE}s) (brut {dur:.1f}s) · mots du script retrouvés : {cov:.0%}")
if ins:   # respirations : silence inséré dans le blanc entre deux parties, fondus de 15 ms de part et d'autre
    f = int(0.015 * SR); pieces, last = [], 0
    for x in ins:
        k = int(x * SR)
        seg = outbuf[last:k].copy()
        if len(seg) > f: seg[-f:] *= np.linspace(1, 0, f)
        if last and len(seg) > f: seg[:f] *= np.linspace(0, 1, f)
        pieces += [seg, np.zeros(int(PAUSE * SR), np.float32)]; last = k
    seg = outbuf[last:].copy()
    if len(seg) > f: seg[:f] *= np.linspace(0, 1, f)
    outbuf = np.concatenate(pieces + [seg]).astype(np.float32)
tmp = tempfile.NamedTemporaryFile(suffix=".f32", delete=False); tmp.write(outbuf.tobytes()); tmp.close()
# traitement voix : coupe des graves inutiles, débruitage léger, « s » adoucis, compression douce, volume constant (2 passes)
chain = "highpass=f=80,afftdn=nr=6:nf=-55,deesser=i=0.3,acompressor=threshold=-22dB:ratio=2.5:attack=8:release=160"
meas = subprocess.run(["ffmpeg", "-hide_banner", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", tmp.name, "-af", chain + ",loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json",
                       "-f", "null", "-"], capture_output=True, text=True).stderr
mj = json.loads(meas[meas.rindex("{"):meas.rindex("}") + 1])
ln = (f"loudnorm=I=-16:TP=-1.5:LRA=11:linear=true:measured_I={mj['input_i']}:measured_TP={mj['input_tp']}"
      f":measured_LRA={mj['input_lra']}:measured_thresh={mj['input_thresh']}:offset={mj['target_offset']}")
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", tmp.name, "-af", chain + "," + ln,
                "-ar", str(SR), "-ac", "2", "-c:a", "aac", "-b:a", "256k", os.path.join(out, "voix_script.m4a")], check=True)
os.unlink(tmp.name)

json.dump([{"w": w["w"], "t": round(shift(remap(w["a"])), 2)} for w in words], open(os.path.join(out, ".mots_nettoyes.json"), "w"), ensure_ascii=False)
open(os.path.join(out, "timing.js"), "w").write("window.TIMING = " + json.dumps(timing) + ";\n")
open(os.path.join(out, "montage.txt"), "w").write("\n".join(report) + "\n")
print("\n".join(report[:3])); print("…", len(report), "lignes dans montage.txt")
