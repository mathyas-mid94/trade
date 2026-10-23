// Objets propres à « Le PER » (au-dessus de lib/objets.js).

FAM.actif1 = { o: { vest: C.inkSoft }, s: 0.8 }; FAM.actif2 = { o: { vest: C.accent, hair: "f" }, s: 0.78 };
FAM.actif3 = { o: { vest: C.accentSoft }, s: 0.82 }; FAM.actif4 = { o: { vest: C.ink, hair: "f" }, s: 0.76 };
FAM.monsieur = { o: { vest: C.paperDeep }, s: 1 };
NOMS.monsieur = "M. J'EXISTE PAS";

// retraité : même personnage, cheveux blancs, canne
function retraite(g, f = false) {
  const guy = D.guy(g, { vest: C.paperDeep, hair: f ? "f" : undefined });
  guy.g.querySelectorAll("path").forEach(p => { if (p.getAttribute("fill") === C.hair) p.setAttribute("fill", C.face); });
  el("path", { ...D.line, "stroke-width": 6, stroke: C.accent, d: "M58 -150 L64 0 M58 -150 Q58 -170 40 -168" }, guy.g);
  return { guy, at(t, a, x, y, o = {}) { const k = (o.k ?? 1) * pop(t, a);
    guy.pose(105, 60).place(x, y + Math.sin(t * 1.6 + x) * 1.5, (o.scale ?? 0.8) * k, o.flip); guy.g.style.opacity = k > 0.001 ? 1 : 0; return k; } };
}
// avis d'imposition (document) ; rows = [[libellé, montant]] ; renvoie les lignes pour les surligner
function avis(parent, nom = "M. J'EXISTE PAS", rows = []) {
  const g = el("g", {}, parent);
  el("rect", { ...D.line, fill: C.face, x: -300, y: -360, width: 600, height: 720, rx: 8 }, g);
  el("rect", { ...D.line, fill: C.ink, x: -300, y: -360, width: 600, height: 90, rx: 8 }, g);
  txt(g, -270, -305, "AVIS D'IMPÔT SUR LE REVENU", 24, { anchor: "start", weight: 800, ls: 3, fill: C.paper });
  txt(g, -270, -220, nom, 26, { anchor: "start", font: "Serif", weight: 700 });
  const lines = rows.map(([l, v], i) => { const y = -140 + i * 70, r = el("g", {}, g);
    const hl = el("rect", { fill: C.accentSoft, x: -285, y: y - 34, width: 570, height: 54, rx: 6, opacity: 0 }, r);
    txt(r, -270, y, l, 22, { anchor: "start", weight: 600, fill: C.inkSoft }); txt(r, 270, y, v, 24, { anchor: "end", font: "Serif", weight: 700 });
    el("path", { ...D.line, "stroke-width": 1.5, stroke: C.paperDeep, d: `M-270 ${y + 16} L270 ${y + 16}` }, r); return { r, hl }; });
  return { g, lines };
}
// camembert : part (0..1) en couleur accent, le reste en ink
function camembert(parent, r, part) {
  const g = el("g", {}, parent);
  el("circle", { ...D.line, fill: C.ink, r }, g);
  const w = el("path", { ...D.line, fill: C.accent }, g);
  const set = p => { const a0 = -Math.PI * p, a1 = Math.PI * p, P = a => `${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`;
    w.setAttribute("d", `M0 0 L${P(a0)} A${r} ${r} 0 0 1 ${P(a1)} Z`); };
  set(part); return { g, set };
}
// anneau (donut) : part de l'arc accent
function anneau(parent, r, part) {
  const g = el("g", {}, parent);
  el("circle", { fill: "none", stroke: C.ink, "stroke-width": 60, r }, g);
  const arc = el("circle", { fill: "none", stroke: C.accent, "stroke-width": 60, r, transform: "rotate(-90)", "stroke-dasharray": `0 ${2 * Math.PI * r}` }, g);
  return { g, set(p) { arc.setAttribute("stroke-dasharray", `${2 * Math.PI * r * p} ${2 * Math.PI * r}`); } };
}
// montagne (h en px), avec un peu de neige au sommet
function montagne(parent, w, h, fill = C.inkSoft) {
  const g = el("g", {}, parent);
  const body = el("path", { ...D.line, fill }, g), snow = el("path", { ...D.line, "stroke-width": 3, fill: C.face }, g);
  return { g, set(k) { const H = h * k;
    body.setAttribute("d", `M${-w / 2} 0 L${-w * 0.12} ${-H * 0.7} L0 ${-H} L${w * 0.16} ${-H * 0.62} L${w / 2} 0 Z`);
    snow.setAttribute("d", `M${-w * 0.05} ${-H * 0.82} L0 ${-H} L${w * 0.06} ${-H * 0.85} L${w * 0.02} ${-H * 0.8} Z`); snow.style.opacity = k > 0.6 ? 1 : 0; } };
}
// petite courbe de marché (points 0..1)
function courbe(parent, w, h, pts, col = C.ink) {
  const g = el("g", {}, parent);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${(-w / 2 + p[0] * w).toFixed(1)} ${(h / 2 - p[1] * h).toFixed(1)}`).join(" ");
  const line = el("path", { ...D.line, stroke: col, "stroke-width": 5, d }, g);
  return { g, line };
}
function marche(n, seed, drift = 0.6, vol = 0.12) {   // série pseudo-aléatoire reproductible
  let s = seed, v = 0.25; const out = [];
  for (let i = 0; i <= n; i++) { s = (s * 1664525 + 1013904223) >>> 0; v += drift / n + (s / 4294967296 - 0.5) * vol; out.push([i / n, Math.max(0.03, Math.min(0.97, v))]); }
  return out;
}
// liste à cocher (ok = coche, false = croix) ; renvoie {r, a, y}
function ligne(g, s, a, y, ok = true, size = 32, x0 = 0, fill = C.ink) {
  const r = el("g", {}, g); const c = check(r, ok); c.setAttribute("transform", "scale(0.72)");
  txt(r, 44, 12, s, size, { anchor: "start", font: "Serif", weight: 600, fill }); return { r, a, y, x: x0 };
}
