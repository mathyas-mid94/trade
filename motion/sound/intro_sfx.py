"""Sound design de l'intro MIC, calé sur intro/intro.html.

Même ADN que la référence (vidéo Gemini du logo MIC) :
nappe en mi bémol mineur -> whoosh avec infra-basse -> scintillements -> petits « tics »
-> impact grave qui résout l'accord (le si bémol arrive) -> longue traîne.

usage : python3 sound/intro_sfx.py intro/intro_sfx.wav
"""
import sys
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve

SR, DUR = 48000, 8.0
N = int(SR * DUR)
t = np.arange(N) / SR
rng = np.random.default_rng(7)
dry = np.zeros((N, 2))
wet_send = np.zeros((N, 2))   # ce qui part dans la réverbe


def place(sig, at, gain=1.0, pan=0.0, rev=0.3):
    """Pose un son mono (ou stéréo) à l'instant `at` (s)."""
    i0 = int(at * SR)
    if i0 >= N:
        return
    sig = sig[: N - i0]
    st = sig if sig.ndim == 2 else np.stack([sig * np.sqrt((1 - pan) / 2), sig * np.sqrt((1 + pan) / 2)], 1)
    dry[i0:i0 + len(st)] += st * gain
    wet_send[i0:i0 + len(st)] += st * gain * rev


def env_ar(n, a, d):
    e = np.ones(n)
    na = max(1, int(a * SR))
    e[:na] = np.linspace(0, 1, na)
    e[na:] = np.exp(-np.arange(n - na) / (d * SR))
    return e


def lp(x, f, order=2):
    return sosfilt(butter(order, f, "low", fs=SR, output="sos"), x)


def hp(x, f, order=2):
    return sosfilt(butter(order, f, "high", fs=SR, output="sos"), x)


def svf_bandpass(x, fc, q):
    """Filtre passe-bande à fréquence variable (pour les whoosh)."""
    y = np.zeros_like(x)
    lo = bp = 0.0
    g = np.tan(np.pi * np.clip(fc, 20, SR * 0.45) / SR)
    k = 1 / q
    for i in range(len(x)):
        a1 = 1 / (1 + g[i] * (g[i] + k))
        v1 = a1 * (bp + g[i] * (x[i] - lo))
        v2 = lo + g[i] * v1
        bp, lo = 2 * v1 - bp, 2 * v2 - lo
        y[i] = v1
    return y


def note(f):
    return f


# fréquences (mi bémol mineur, comme la référence : 311 / 370 Hz puis 233 Hz à l'impact)
Eb2, Bb2, Eb3, Gb3, Bb3, Eb4, Gb4 = 77.78, 116.54, 155.56, 185.0, 233.08, 311.13, 369.99
SHIMMER = [1244.5, 1480.0, 1661.2, 1864.7, 2217.5, 2489.0, 2960.0]

# ---------------- nappe ----------------
def pad_voice(f, amp_env, detune=(-7, 0, 6)):
    s = np.zeros(N)
    for c in detune:
        ff = f * 2 ** (c / 1200)
        ph = rng.random()
        s += 2 * ((t * ff + ph) % 1) - 1          # dent de scie
    return lp(s / len(detune), 900, 2) * amp_env

def ramp(points):
    xs, ys = zip(*points)
    return np.interp(t, xs, ys)

pre = ramp([(0, 0), (0.4, 0.15), (2.2, 0.55), (3.0, 0.6), (3.3, 0.35), (3.85, 0.15), (4.4, 0.35), (5.3, 0.8), (5.36, 0.55), (8, 0.0)])
post = ramp([(0, 0), (5.3, 0), (5.36, 1.0), (6.5, 0.6), (8, 0.0)])
pad = (pad_voice(Eb3, pre) + pad_voice(Eb4, pre) * 0.8 + pad_voice(Gb4, pre) * 0.7
       + pad_voice(Bb3, post) * 0.9 + pad_voice(Eb3, post) * 0.6 + np.sin(2 * np.pi * Eb2 * t) * post * 0.9)
lfo = 1 + 0.004 * np.sin(2 * np.pi * 0.3 * t)
padL, padR = pad * lfo, np.roll(pad, int(0.012 * SR)) / lfo
place(np.stack([padL, padR], 1), 0, gain=0.10, rev=0.5)

# ---------------- petits sons ----------------
def pop(f0=880, f1=520, d=0.09):
    n = int(0.25 * SR); tt = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-tt / 0.03)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env_ar(n, 0.002, d)

def tick(f=4200, d=0.012):
    n = int(0.06 * SR)
    x = rng.standard_normal(n) * env_ar(n, 0.0005, d)
    return svf_bandpass(x, np.full(n, f), 6) * 3

def swish(dur, f0, f1, q=2.0):
    n = int(dur * SR); u = np.linspace(0, 1, n)
    x = rng.standard_normal(n)
    y = svf_bandpass(x, f0 * (f1 / f0) ** u, q)
    return y * np.sin(np.pi * u) ** 2

def ping(f, d=0.6):
    n = int(1.2 * SR); tt = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(2 * np.pi * f * 2.76 * tt)
    return s * env_ar(n, 0.003, d)

# personnages qui apparaissent
place(pop(760, 480), 0.10, 0.22, -0.3, 0.3)
place(pop(900, 560), 0.22, 0.22, 0.3, 0.3)
# billet puis carton qui volent
place(swish(0.6, 900, 3200, 1.5), 0.92, 0.25, -0.4, 0.4)
place(pop(1240, 1100, 0.06), 1.47, 0.12, 0.4, 0.5)
place(swish(0.6, 2600, 800, 1.5), 1.75, 0.22, 0.4, 0.4)
place(pop(620, 400, 0.07), 2.3, 0.15, -0.4, 0.4)

# recul caméra : les paires apparaissent en cascade + scintillement
dists = sorted(np.hypot(c, r) for c in range(-2, 3) for r in range(-2, 2) if c or r)
for i, d in enumerate(dists):
    place(tick(3000 + 2500 * rng.random()), 2.3 + d * 0.12, 0.10, rng.uniform(-0.8, 0.8), 0.5)
place(swish(1.4, 400, 2500, 1.2), 2.15, 0.18, 0.0, 0.6)
for k in range(9):
    place(ping(rng.choice(SHIMMER), 0.35), 2.35 + k * 0.12 + rng.uniform(0, 0.06), 0.035, rng.uniform(-0.9, 0.9), 0.9)

# GROS whoosh : le billet fonce vers la caméra
n = int(0.95 * SR); u = np.linspace(0, 1, n)
w = svf_bandpass(rng.standard_normal(n), 180 * (4500 / 180) ** (u ** 1.5), 1.4) * (u ** 2.2)
w[-int(0.03 * SR):] *= np.linspace(1, 0.2, int(0.03 * SR))
sub = np.sin(2 * np.pi * np.cumsum(38 + 30 * u) / SR) * u ** 2.5
place(w, 2.92, 0.55, 0.0, 0.5); place(sub, 2.92, 0.45, 0.0, 0.1)
# aspiration : l'écran vert se resserre en cercle
place(swish(0.65, 3500, 300, 1.6), 3.82, 0.30, 0.0, 0.6)

# le cercle se dessine : petits tics de plume
for k, tk in enumerate(np.arange(4.32, 5.08, 0.13)):
    place(tick(5200 - k * 250, 0.008), tk, 0.14, -0.6 + k * 0.2, 0.4)

# M, I : petits coups sourds ; C = IMPACT
def thud(f0=150, f1=70, d=0.18):
    n = int(0.5 * SR); tt = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-tt / 0.04)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * env_ar(n, 0.001, d)
    click = lp(rng.standard_normal(n), 2500) * env_ar(n, 0.0005, 0.01)
    return body + 0.4 * click
place(thud(), 5.10, 0.35, -0.2, 0.3)
place(thud(170, 80), 5.22, 0.38, 0.2, 0.3)

n = int(2.6 * SR); tt = np.arange(n) / SR
boom = np.sin(2 * np.pi * np.cumsum(36 + 40 * np.exp(-tt / 0.08)) / SR) * env_ar(n, 0.002, 0.9)
crack = lp(rng.standard_normal(n), 1400, 4) * env_ar(n, 0.001, 0.12)
place(boom, 5.34, 0.9, 0.0, 0.15); place(crack, 5.34, 0.45, 0.0, 0.8)
# riser inversé qui mène à l'impact
n = int(0.5 * SR); u = np.linspace(0, 1, n)
place(svf_bandpass(rng.standard_normal(n), 600 * (5000 / 600) ** u, 2) * u ** 3, 4.84, 0.18, 0.0, 0.5)

# le filet se dessine + paillettes dorées
place(swish(0.45, 2000, 6000, 3), 5.55, 0.08, 0.0, 0.7)
for k in range(12):
    place(ping(rng.choice(SHIMMER) * (2 if k % 3 == 0 else 1), 0.5), 5.4 + k * 0.11 + rng.uniform(0, 0.05),
          0.03 * (1 - k / 14), rng.uniform(-0.9, 0.9), 1.0)

# ---------------- réverbe + master ----------------
ir_n = int(2.8 * SR)
ir = np.stack([rng.standard_normal(ir_n), rng.standard_normal(ir_n)], 1) * np.exp(-np.arange(ir_n) / (0.9 * SR))[:, None]
ir = np.stack([lp(ir[:, 0], 5000), lp(ir[:, 1], 5000)], 1)
ir /= np.sqrt((ir ** 2).sum(0))
wet = np.stack([fftconvolve(wet_send[:, c], ir[:, c])[:N] for c in range(2)], 1)
# passe-haut 28 Hz + coupe au-dessus de 13 kHz : son chaud et feutré comme la référence
mix = [lp(hp(dry[:, c] + 0.9 * wet[:, c], 28), 13000, 4) for c in range(2)]
mix = np.stack(mix, 1)
fade = np.clip((DUR - t) / 0.6, 0, 1)[:, None]
mix *= fade
mix /= np.abs(mix).max() / 0.7
mix = np.tanh(mix * 1.2) / np.tanh(1.2) * 0.89   # douce saturation, crête ~ -1 dBFS

out = sys.argv[1] if len(sys.argv) > 1 else "intro_sfx.wav"
import wave
with wave.open(out, "wb") as f:
    f.setnchannels(2); f.setsampwidth(2); f.setframerate(SR)
    f.writeframes((mix * 32767).astype(np.int16).tobytes())
print("ok :", out)
