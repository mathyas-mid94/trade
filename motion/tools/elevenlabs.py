"""Génère les textes à coller dans ElevenLabs depuis un SCRIPT.md : sans titres ni repères [n],
découpés en N fichiers de moins de 10 000 caractères, avec les sigles réécrits en phonétique française
(sinon ElevenLabs lit « SCPI » avec le I à l'anglaise ; avec des tirets, il bégaie). SCRIPT.md reste la référence pour align.py.

usage : python3 motion/tools/elevenlabs.py <SCRIPT.md> <dossier_sortie> [nb_fichiers]
"""
import re, sys

PHONETIQUE = {   # validé sur la SCPI (24/10) : lettres séparées par des points (les tirets faisaient bégayer la voix)
    "SCPI": "S.C.P.I.", "SCI": "S.C.I.", "AMF": "A.M.F.", "ISR": "I.S.R.", "PEA": "P.E.A.",
    "TOF": "toffe", "EDR": "E.D.R.", "DPD": "D.P.D.", "REITs": "rits", "WALB": "walbé", "WALT": "walté",
    "PER": "P.E.R.", "SNCF": "S.N.C.F.", "EDF": "E.D.F.", "BCE": "B.C.E.", "CTO": "C.T.O.",
    "LMNP": "L.M.N.P.", "SAS": "S.A.S.", "SNC": "S.N.C.", "TMI": "T.M.I.",
    "ETF": "E.T.F.", "PFU": "P.F.U.", "IS": "I.S.", "IR": "I.R.", "PME": "P.M.E.", 
    "MSCI": "M.S.C.I.", "S&P": "S and P", "UCITS": "U.C.I.T.S.", "IFU": "I.F.U.", "UE": "U.E.", "DIC": "D.I.C.", "Phoenix": "Phénix",
}

def phonetique(s):
    s = s.replace("PEA-PME", "P.E.A. P.M.E.")
    for k, v in sorted(PHONETIQUE.items(), key=lambda kv: -len(kv[0])):
        s = re.sub(rf"(?<![\w-]){re.escape(k)}(?![\w-])", v, s)
    return re.sub(r"\.([.?!])", r"\1", s)

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
