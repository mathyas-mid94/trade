// Objets propres à « Le Girardin industriel » (au-dessus de lib/objets.js).

FAM.monsieur = { o: { vest: C.paperDeep }, s: 1 }; NOMS.monsieur = "MONSIEUR X";
FAM.client = { o: { vest: C.inkSoft }, s: 1 }; NOMS.client = "UN CLIENT";

function usine(parent, s = 1) {   // bâtiment industriel avec cheminées
  const g = el("g", { transform: `scale(${s})` }, parent);
  el("path", { ...D.line, fill: C.paperDeep, d: "M-110 60 L-110 -10 L-70 -40 L-70 -10 L-30 -40 L-30 -10 L10 -40 L10 60 Z" }, g);
  el("rect", { ...D.line, fill: C.inkSoft, x: 10, y: -60, width: 100, height: 120 }, g);
  el("rect", { ...D.line, fill: C.accent, x: -96, y: -110, width: 22, height: 80 }, g); el("rect", { ...D.line, fill: C.accent, x: -56, y: -100, width: 22, height: 70 }, g);
  for (const [x, y] of [[30, -40], [70, -40], [30, -6], [70, -6]]) el("rect", { ...D.line, "stroke-width": 3, fill: C.face, x, y, width: 22, height: 22 }, g);
  for (const x of [-92, -62, -32]) el("rect", { ...D.line, "stroke-width": 3, fill: C.face, x, y: 10, width: 18, height: 18 }, g);
  el("rect", { ...D.line, fill: C.face, x: 46, y: 26, width: 30, height: 34 }, g);
  return g;
}
function palmier(parent, s = 1) {
  const g = el("g", { transform: `scale(${s})` }, parent);
  el("path", { ...D.line, "stroke-width": 10, stroke: C.accent, d: "M0 80 C6 30 -6 -10 10 -60" }, g);
  for (const a of [-160, -120, -60, -20, -95]) { const r = a * Math.PI / 180;
    el("path", { ...D.line, fill: C.inkSoft, d: `M10 -60 Q${10 + 50 * Math.cos(r + 0.3)} ${-60 + 50 * Math.sin(r + 0.3) - 10} ${10 + 90 * Math.cos(r)} ${-60 + 90 * Math.sin(r) + 30} Q${10 + 40 * Math.cos(r - 0.2)} ${-60 + 40 * Math.sin(r - 0.2) + 10} 10 -60 Z` }, g); }
  return g;
}
// île stylisée (forme pseudo-aléatoire reproductible) avec un nom
function ile(parent, w, h, seed, nom = "") {
  const g = el("g", {}, parent); let s = seed; const pts = [];
  for (let i = 0; i < 14; i++) { s = (s * 1664525 + 1013904223) >>> 0; const a = i / 14 * Math.PI * 2, r = 0.75 + 0.25 * (s / 4294967296);
    pts.push([w / 2 * r * Math.cos(a), h / 2 * r * Math.sin(a)]); }
  const d = pts.map((p, i) => { const q = pts[(i + 1) % pts.length]; return `${i ? "" : `M${p[0].toFixed(1)} ${p[1].toFixed(1)}`} Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${((p[0] + q[0]) / 2).toFixed(1)} ${((p[1] + q[1]) / 2).toFixed(1)}`; }).join(" ") + " Z";
  el("path", { ...D.line, fill: C.accentSoft, d }, g);
  const t = nom ? txt(g, 0, h / 2 + 34, nom, 22, { weight: 800, ls: 4, fill: C.inkSoft }) : null;
  return { g, t };
}
function vagues(parent, w, n = 4) {
  const g = el("g", {}, parent);
  for (let i = 0; i < n; i++) { let d = `M${-w / 2} ${i * 26}`; for (let x = -w / 2; x < w / 2; x += 40) d += ` q10 -10 20 0 q10 10 20 0`;
    el("path", { fill: "none", stroke: C.inkSoft, "stroke-width": 3, "stroke-linecap": "round", opacity: 0.45, d }, g); }
  return g;
}
function camion(parent, s = 1) {
  const g = el("g", { transform: `scale(${s})` }, parent);
  el("rect", { ...D.line, fill: C.face, x: -110, y: -70, width: 140, height: 90, rx: 6 }, g);
  el("path", { ...D.line, fill: C.accent, d: "M30 20 L30 -50 L80 -50 L110 -14 L110 20 Z" }, g); el("path", { ...D.line, fill: C.face, d: "M44 -40 L76 -40 L98 -14 L44 -14 Z" }, g);
  for (const x of [-70, 70]) { el("circle", { ...D.line, fill: C.ink, cx: x, cy: 24, r: 20 }, g); el("circle", { fill: C.paperDeep, cx: x, cy: 24, r: 7 }, g); }
  return g;
}
function solaire(parent, s = 1) {
  const g = el("g", { transform: `scale(${s})` }, parent);
  el("path", { ...D.line, fill: C.ink, d: "M-90 20 L-60 -50 L90 -50 L60 20 Z" }, g);
  for (const k of [0.33, 0.66]) el("path", { stroke: C.inkSoft, "stroke-width": 3, d: `M${-90 + 30 * k * 3.3} ${20 - 70 * k} L${60 + 30 * k} ${20 - 70 * k}` }, g);
  for (const k of [0.25, 0.5, 0.75]) el("path", { stroke: C.inkSoft, "stroke-width": 3, d: `M${-90 + 150 * k} 20 L${-60 + 150 * k} -50` }, g);
  el("path", { ...D.line, "stroke-width": 6, d: "M0 20 L0 60 M-30 60 L30 60" }, g);
  return g;
}
function conteneur(parent, s = 1) {
  const g = el("g", { transform: `scale(${s})` }, parent);
  el("rect", { ...D.line, fill: C.inkSoft, x: -100, y: -45, width: 200, height: 90, rx: 4 }, g);
  for (let x = -80; x <= 80; x += 20) el("path", { stroke: C.ink, "stroke-width": 3, d: `M${x} -38 L${x} 38` }, g);
  return g;
}
function engrenage(parent, s = 1) {
  const g = el("g", { transform: `scale(${s})` }, parent); let d = "";
  for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2, r = i % 2 ? 50 : 62; d += `${i ? "L" : "M"}${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)} `; }
  el("path", { ...D.line, fill: C.accent, d: d + "Z" }, g); el("circle", { ...D.line, fill: C.face, r: 20 }, g);
  return g;
}
function ecran(parent, s = 1) {
  const g = el("g", { transform: `scale(${s})` }, parent);
  el("rect", { ...D.line, fill: C.ink, x: -80, y: -60, width: 160, height: 100, rx: 8 }, g); el("rect", { fill: C.inkSoft, x: -66, y: -48, width: 132, height: 76 }, g);
  el("path", { ...D.line, "stroke-width": 6, d: "M0 40 L0 62 M-36 62 L36 62" }, g);
  return g;
}
function fruit(parent, s = 1) {   // agrotransformation : un ananas
  const g = el("g", { transform: `scale(${s})` }, parent);
  el("ellipse", { ...D.line, fill: C.accent, cx: 0, cy: 20, rx: 40, ry: 55 }, g);
  el("path", { stroke: C.ink, "stroke-width": 2.5, fill: "none", d: "M-30 -10 L30 50 M-36 20 L10 66 M-20 -28 L36 28 M30 -10 L-30 50 M36 20 L-10 66 M20 -28 L-36 28" }, g);
  el("path", { ...D.line, fill: C.inkSoft, d: "M0 -34 L-26 -80 L-6 -54 L0 -96 L6 -54 L26 -80 Z" }, g);
  return g;
}
function cuve(parent, s = 1) {   // stockage
  const g = el("g", { transform: `scale(${s})` }, parent);
  el("path", { ...D.line, fill: C.face, d: "M-60 -50 L-60 60 L60 60 L60 -50" }, g); el("ellipse", { ...D.line, fill: C.paperDeep, cx: 0, cy: -50, rx: 60, ry: 16 }, g);
  el("path", { ...D.line, "stroke-width": 3, d: "M-60 0 Q0 16 60 0" }, g);
  return g;
}
function ligne(g, s, a, y, ok = true, size = 32, fill = C.ink) {
  const r = el("g", {}, g); const c = check(r, ok); c.setAttribute("transform", "scale(0.72)");
  txt(r, 44, 12, s, size, { anchor: "start", font: "Serif", weight: 600, fill }); return { r, a, y };
}
// colonne qui se remplit (barre verticale), valeur affichée au-dessus
function colonne(parent, x, base, w, fill = C.ink) {
  const r = el("rect", { ...D.line, fill, x: x - w / 2, width: w, rx: 14 }, parent), n = big(parent, x, 0, "", 48, fill === C.ink ? C.paper : C.ink);
  return { set(h, label) { r.setAttribute("y", base - h); r.setAttribute("height", Math.max(0, h)); r.style.opacity = h > 1 ? 1 : 0;
    n.setAttribute("y", base - h / 2 + 16); n.textContent = h > 50 ? label : ""; } };
}
