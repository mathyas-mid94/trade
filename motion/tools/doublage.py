"""Transforme un doublage enregistré dans le studio (doublage_*.zip) en une voix calée sur la vidéo.

usage : python3 motion/tools/doublage.py <doublage.zip> <sortie.wav>

Le zip contient voix.(webm|m4a) et synchro.json : à chaque retour en arrière, le studio note
« à `rec` secondes de l'enregistrement, la vidéo repart de `video` secondes ».
On replace chaque morceau d'enregistrement à son instant vidéo ; quand deux prises couvrent le même passage,
la plus récente remplace l'ancienne (fondu de 30 ms au raccord). La sortie est alignée sur la vidéo :
t = 0 dans le WAV correspond à t = 0 dans la vidéo muette.
"""
import json, subprocess, sys, tempfile, zipfile, os
import numpy as np

src, out = sys.argv[1], sys.argv[2]
SR = 48000
with tempfile.TemporaryDirectory() as tmp:
    with zipfile.ZipFile(src) as z:
        names = z.namelist()
        sync = json.loads(z.read("synchro.json"))
        audio_name = next(n for n in names if n.startswith("voix."))
        z.extract(audio_name, tmp)
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", os.path.join(tmp, audio_name), "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
x = np.frombuffer(raw, np.float32)
segs = sorted(sync["segments"], key=lambda s: s["rec"])
total_rec = len(x) / SR
spans = []
for i, s in enumerate(segs):
    r0, r1 = s["rec"], (segs[i + 1]["rec"] if i + 1 < len(segs) else total_rec)
    if r1 - r0 > 0.05: spans.append((r0, r1, s["video"]))
end_video = max(v + (r1 - r0) for r0, r1, v in spans)
y = np.zeros(int(end_video * SR) + SR, np.float32)
fade = int(0.03 * SR); ramp = np.linspace(0, 1, fade, dtype=np.float32)
for r0, r1, v in spans:                      # dans l'ordre de l'enregistrement : la prise suivante écrase la précédente
    a, b, o = int(r0 * SR), int(r1 * SR), int(v * SR)
    seg = x[a:b].copy()
    n = min(fade, len(seg))
    if o > 0 and n:                           # fondu avec ce qui était déjà là
        seg[:n] = seg[:n] * ramp[:n] + y[o:o + n] * (1 - ramp[:n])
    y[o:o + len(seg)] = seg
y = y[:int(end_video * SR)]
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-", "-c:a", "pcm_s24le", out],
               input=y.tobytes(), check=True)
print(f"ok : {out} · {len(spans)} prise(s) · {len(segs) - 1} retour(s) en arrière · {end_video:.1f} s de vidéo couvertes")
