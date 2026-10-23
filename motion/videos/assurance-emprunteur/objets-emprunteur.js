// Objets propres à « L'assurance emprunteur » (au-dessus de lib/objets.js).

FAM.client = { o: { vest: C.accent, hair: "f" }, s: 1 }; NOMS.client = "";
FAM.conjoint = { o: { vest: C.inkSoft }, s: 1.04 }; NOMS.conjoint = "";
FAM.banquier = { o: { vest: C.ink }, s: 1.02 }; NOMS.banquier = "LE BANQUIER";

// maison protégée par un bouclier (icône du thème « crédit »)
function protege(parent, s = 1) { const g = el("g", { transform: `scale(${s})` }, parent); D.icons.bouclier(g); return g; }
// colonne qui se remplit (barre verticale), valeur affichée au milieu
function colonne(parent, x, base, w, fill = C.ink) {
  const r = el("rect", { ...D.line, fill, x: x - w / 2, width: w, rx: 14 }, parent), n = big(parent, x, 0, "", 46, fill === C.ink || fill === C.inkSoft ? C.paper : C.ink);
  return { set(h, label) { r.setAttribute("y", base - h); r.setAttribute("height", Math.max(0, h)); r.style.opacity = h > 1 ? 1 : 0;
    n.setAttribute("y", base - h / 2 + 16); n.textContent = h > 50 ? label : ""; } };
}
// ligne de liste avec une coche (ok) ou une croix
function ligne(g, s, a, y, ok = true, size = 32, fill = C.ink) {
  const r = el("g", {}, g); const c = check(r, ok); c.setAttribute("transform", "scale(0.72)");
  txt(r, 44, 12, s, size, { anchor: "start", font: "Serif", weight: 600, fill }); return { r, a, y };
}
// étiquette de prix
function prix(parent, label, fill = C.accent) {
  const g = el("g", {}, parent);
  el("path", { ...D.line, fill, d: "M-40 -34 L90 -34 L90 34 L-40 34 L-74 0 Z" }, g);
  el("circle", { ...D.line, "stroke-width": 3, fill: C.paper, cx: -48, cy: 0, r: 8 }, g);
  txt(g, 26, 12, label, 32, { font: "Serif", weight: 700, fill: fill === C.ink ? C.paper : C.ink });
  return g;
}
// horloge (délai)
function horloge(parent) {
  const g = el("g", {}, parent);
  el("circle", { ...D.line, fill: C.face, r: 70 }, g);
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; el("path", { ...D.line, "stroke-width": 3, d: `M${58 * Math.cos(a)} ${58 * Math.sin(a)} L${66 * Math.cos(a)} ${66 * Math.sin(a)}` }, g); }
  const h = el("path", { ...D.line, "stroke-width": 7, d: "M0 0 L0 -34" }, g), m = el("path", { ...D.line, "stroke-width": 5, stroke: C.accent, d: "M0 0 L0 -52" }, g);
  el("circle", { fill: C.ink, r: 7 }, g);
  return { g, set(k) { h.setAttribute("transform", `rotate(${30 * k})`); m.setAttribute("transform", `rotate(${360 * k})`); } };
}
// tableau d'amortissement : une feuille avec une colonne de dates à gauche
function tableau(parent) {
  const g = el("g", {}, parent);
  el("path", { ...D.line, fill: C.face, d: "M-90 -110 L60 -110 L90 -80 L90 110 L-90 110 Z" }, g);
  el("path", { ...D.line, fill: C.paperDeep, d: "M60 -110 L60 -80 L90 -80" }, g);
  const dates = el("rect", { ...D.line, "stroke-width": 3, fill: C.accentSoft, x: -76, y: -70, width: 50, height: 166, rx: 4 }, g);
  for (let i = 0; i < 7; i++) { const y = -58 + i * 23;
    el("path", { ...D.line, "stroke-width": 3, stroke: C.inkSoft, d: `M-68 ${y} L-34 ${y}` }, g);
    el("path", { ...D.line, "stroke-width": 3, stroke: C.inkSoft, d: `M-14 ${y} L74 ${y}` }, g); }
  el("path", { ...D.line, "stroke-width": 4, d: "M-70 -92 L40 -92" }, g);
  return { g, dates };
}
// écran d'ordinateur (parcours en ligne)
function ecran(parent, s = 1) {
  const g = el("g", { transform: `scale(${s})` }, parent);
  el("rect", { ...D.line, fill: C.ink, x: -110, y: -80, width: 220, height: 140, rx: 10 }, g); el("rect", { fill: C.face, x: -94, y: -66, width: 188, height: 112 }, g);
  for (const [y, w] of [[-44, 120], [-22, 90], [0, 140]]) el("path", { ...D.line, "stroke-width": 4, stroke: C.inkSoft, d: `M-74 ${y} L${-74 + w} ${y}` }, g);
  el("rect", { ...D.line, "stroke-width": 3, fill: C.accent, x: 14, y: 16, width: 64, height: 22, rx: 11 }, g);
  el("path", { ...D.line, "stroke-width": 7, d: "M0 60 L0 86 M-44 86 L44 86" }, g);
  return g;
}
// iceberg : la pointe visible (le taux) et la partie cachée (assurance, frais)
function iceberg(parent) {
  const g = el("g", {}, parent);
  const eau = el("path", { fill: "none", stroke: C.accent, "stroke-width": 5, "stroke-linecap": "round", d: "M-420 0 q20 -12 40 0 q20 12 40 0 q20 -12 40 0 q20 12 40 0 q20 -12 40 0 q20 12 40 0 q20 -12 40 0 q20 12 40 0 q20 -12 40 0 q20 12 40 0 q20 -12 40 0 q20 12 40 0 q20 -12 40 0 q20 12 40 0 q20 -12 40 0 q20 12 40 0 q20 -12 40 0 q20 12 40 0 q20 -12 40 0 q20 12 40 0 q20 -12 40 0" }, g);
  const bas = el("path", { ...D.line, fill: C.inkSoft, d: "M-90 0 L-210 140 L-130 300 L60 330 L220 200 L150 0 Z" }, g);
  const haut = el("path", { ...D.line, fill: C.face, d: "M-90 0 L-30 -120 L20 -80 L60 -150 L150 0 Z" }, g);
  return { g, bas, eau, haut };
}
// barreaux de cage (captif)
function cage(parent, w = 260, h = 380) {
  const g = el("g", {}, parent);
  for (let i = 0; i <= 6; i++) el("path", { ...D.line, "stroke-width": 7, d: `M${-w / 2 + i * w / 6} ${-h} L${-w / 2 + i * w / 6} 0` }, g);
  el("path", { ...D.line, "stroke-width": 9, d: `M${-w / 2 - 10} ${-h} L${w / 2 + 10} ${-h} M${-w / 2 - 10} 0 L${w / 2 + 10} 0` }, g);
  return g;
}
// sifflet (la loi Lemoine siffle la fin de la récré)
function sifflet(parent) {
  const g = el("g", {}, parent);
  el("path", { ...D.line, fill: C.accent, d: "M-70 -20 L30 -20 A40 40 0 1 1 -10 40 L-70 40 Z" }, g);
  el("circle", { ...D.line, "stroke-width": 3, fill: C.ink, cx: 20, cy: 20, r: 10 }, g);
  for (const [x1, y1, x2, y2] of [[-90, -40, -120, -70], [-60, -50, -70, -90], [-100, -10, -140, -16]]) el("path", { ...D.line, "stroke-width": 5, d: `M${x1} ${y1} L${x2} ${y2}` }, g);
  return g;
}
