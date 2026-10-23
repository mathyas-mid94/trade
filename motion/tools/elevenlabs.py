"""Génère les textes à coller dans ElevenLabs depuis un SCRIPT.md : sans titres ni repères [n],
découpés en N fichiers de moins de 10 000 caractères, avec les sigles réécrits en phonétique française
(sinon ElevenLabs lit parfois « SCPI » avec le I à l'anglaise). SCRIPT.md reste la référence pour align.py.

usage : python3 motion/tools/elevenlabs.py <SCRIPT.md> <dossier_sortie> [nb_fichiers]
"""
import re, sys

# sigle -> écriture phonétique (lettres épelées à la française)
PHONETIQUE = {
    "SCPI": "esse-cé-pé-i", "SCI": "esse-cé-i", "AMF": "a-èm-èf", "ISR": "i-esse-èr", "PEA": "pé-eu-a",
    "TOF": "toffe", "EDR": "eu-dé-èr", "DPD": "dé-pé-dé", "REITs": "rits", "WALB": "walbé", "WALT": "walté",
    "PER": "pé-eu-èr", "SNCF": "esse-ène-cé-èf", "EDF": "eu-dé-èf", "BCE": "bé-cé-eu", "CTO": "cé-té-o",
    "LMNP": "èl-èm-ène-pé", "SAS": "esse-a-esse", "SNC": "esse-ène-cé", "TMI": "té-èm-i",
}

def phonetique(s):
    for k, v in sorted(PHONETIQUE.items(), key=lambda kv: -len(kv[0])):
        s = re.sub(rf"(?<![\w-]){re.escape(k)}(?![\w-])", v, s)
    return s

if __name__ == "__main__":
    src, out = sys.argv[1], sys.argv[2]
    n = int(sys.argv[3]) if len(sys.argv) > 3 else 2
    t = open(src).read().split("\n---\n", 1)[1]
    P = [phonetique(re.sub(r"\s*\[\d+\]", "", p).strip()) for p in re.split(r"^## .*$", t, flags=re.M)[1:]]
    tot = sum(len(p) + 2 for p in P); files = [[] for _ in range(n)]; acc = 0; k = 0
    for p in P:
        if k < n - 1 and acc + len(p) / 2 > tot * (k + 1) / n: k += 1
        files[k].append(p); acc += len(p) + 2
    for i, f in enumerate(files, 1):
        s = "\n\n".join(f) + "\n"
        assert len(s) < 10000, f"fichier {i} trop long ({len(s)} car.) : augmenter nb_fichiers"
        open(f"{out}/texte_a_coller_{i}.txt", "w").write(s)
        print(f"texte_a_coller_{i}.txt : {len(f)} parties, {len(s)} car.")
