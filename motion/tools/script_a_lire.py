"""Génère la version « à lire » d'un script (sans repères [n]) en Markdown et en PDF.

usage : python3 motion/tools/script_a_lire.py <SCRIPT.md> <sortie.md> [sortie.pdf]
"""
import re, sys, html, os, subprocess

src, out_md = sys.argv[1], sys.argv[2]
out_pdf = sys.argv[3] if len(sys.argv) > 3 else None
s = open(src).read()
title = s.split("\n", 1)[0].lstrip("# ").split("·")[0].strip()
body = s.split("---")[1]
sections = re.split(r"^## ", body, flags=re.M)[1:]
md = [f"# {title} — script à enregistrer", "", "## Comment enregistrer", "",
      "- **Un seul enregistrement**, du début à la fin, au téléphone, dans une pièce calme, téléphone à 20 cm de la bouche.",
      "- **Entre chaque partie, fais une pause de 3 secondes.**",
      "- Parle comme si tu expliquais à un ami : naturel, posé. Je m'adapte à ton rythme.",
      "- Une erreur ? Dis **« banane »** et reprends la phrase depuis son début : je coupe automatiquement.",
      "- Les titres de parties ne se lisent pas.", "", "---", ""]
for n, sec in enumerate(sections, 1):
    head, _, text = sec.partition("\n")
    text = re.sub(r"\s*\[\d+\]", "", text).strip()
    name = head.split("·", 1)[-1].strip() if "·" in head else head.strip()
    md += [f"### Partie {n} — {name}", "", text, "", "*(pause 3 secondes)*", ""]
md += ["---", "", "Fin. Envoie-moi le fichier audio tel quel, je m'occupe du reste."]
open(out_md, "w").write("\n".join(md))

if out_pdf:
    rows = []
    for l in md:
        e = html.escape
        if l.startswith("### "): rows.append(f"<h3>{e(l[4:])}</h3>")
        elif l.startswith("## "): rows.append(f"<h2>{e(l[3:])}</h2>")
        elif l.startswith("# "): rows.append(f"<h1>{e(l[2:])}</h1>")
        elif l.startswith("- "): rows.append("<li>" + re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", e(l[2:])) + "</li>")
        elif l.strip() == "---": rows.append("<hr>")
        elif l.startswith("*("): rows.append(f"<p class=pause>{e(l.strip('*'))}</p>")
        elif l.strip(): rows.append(f"<p>{e(l)}</p>")
    fonts = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "fonts")
    doc = f"""<!doctype html><meta charset=utf-8><style>
@font-face{{font-family:Serif;src:url({fonts}/CormorantGaramond.ttf);font-weight:300 700}}
@font-face{{font-family:Sans;src:url({fonts}/Inter.ttf);font-weight:100 900}}
body{{font-family:Sans;color:#234E48;background:#FBF7EC;margin:0;padding:40px 56px;font-size:15px}}
h1{{font-family:Serif;font-weight:600;font-size:38px;margin:0 0 10px}}
h2{{font-size:15px;letter-spacing:.15em;text-transform:uppercase;color:#3F6F68;margin-top:24px}}
h3{{font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#CAA97A;margin:34px 0 8px;page-break-after:avoid}}
p{{font-family:Serif;font-size:22px;line-height:1.5;margin:4px 0}} li{{margin:6px 0;line-height:1.45}}
p.pause{{font-family:Sans;font-size:12px;color:#CAA97A;letter-spacing:.1em;margin-top:10px}}
hr{{border:0;border-top:1px solid #CAA97A;margin:26px 0}}</style>""" + "\n".join(rows)
    tmp = out_pdf + ".html"; open(tmp, "w").write(doc)
    js = f"""import {{ chromium }} from "/opt/node22/lib/node_modules/playwright/index.mjs";
const b = await chromium.launch(); const p = await b.newPage();
await p.goto("file://{os.path.abspath(tmp)}"); await p.evaluate(() => document.fonts.ready);
await p.pdf({{ path: "{os.path.abspath(out_pdf)}", format: "A4", printBackground: true }}); await b.close();"""
    subprocess.run(["node", "--input-type=module", "-e", js], check=True)
    os.remove(tmp)
print("ok :", out_md, out_pdf or "")
