// Objets propres à « La SCPI » (au-dessus de lib/objets.js et de ../assurance-emprunteur/objets-emprunteur.js).

// pastille posée : on(p, k) l'affiche à sa place avec l'échelle k (pop)
function pl(g, x, y, s, o = {}) { const p = pill(g, x, y, s, { bg: o.bg || C.face, fg: o.fg, size: o.size || 22 }); return p; }
function on(p, k, dx = 0, dy = 0) { place(p.g, p.x + dx, p.y + dy, k); }
function parc(parent, s = 1) { const w = el("g", {}, parent); D.icons.immeuble(el("g", { transform: `scale(${s})` }, w)); return w; }
// rond avec une icône, un titre et un sous-titre (objectifs, critères…)
function badge(g, kind, t1, t2 = "", r = 100) {
  const w = el("g", {}, g); el("circle", { ...D.line, fill: C.face, r }, w);
  const i = el("g", { transform: `scale(${r / 120})` }, w); (D.icons[kind] || kind)(i);
  txt(w, 0, r + 50, t1, 24, { weight: 800, ls: 4 }); if (t2) txt(w, 0, r + 82, t2, 22, { weight: 500, fill: C.inkSoft });
  return w;
}
// chaise à n pieds (mutualisation)
function chaise(parent, n) {
  const g = el("g", {}, parent);
  el("rect", { ...D.line, fill: C.accent, x: -70, y: -20, width: 140, height: 22, rx: 6 }, g);
  el("rect", { ...D.line, fill: C.accent, x: 50, y: -130, width: 20, height: 112, rx: 6 }, g);
  const X = n === 1 ? [0] : [-60, -25, 25, 60];
  for (const x of X) el("path", { ...D.line, "stroke-width": 9, d: `M${x} 2 L${x} 90` }, g);
  return g;
}
// boutique (commerces)
function boutique(parent, s = 1) {
  const g = el("g", { transform: `scale(${s})` }, el("g", {}, parent));
  el("rect", { ...D.line, fill: C.face, x: -70, y: -20, width: 140, height: 80 }, g);
  let d = "M-80 -20"; for (let i = 0; i < 4; i++) d += ` q20 30 40 0`; el("path", { ...D.line, fill: C.accent, d: d + " L80 -50 L-80 -50 Z" }, g);
  el("rect", { ...D.line, fill: C.inkSoft, x: -18, y: 14, width: 36, height: 46 }, g);
  el("rect", { ...D.line, "stroke-width": 3, fill: C.paper, x: -58, y: 4, width: 28, height: 26 }, g);
  el("rect", { ...D.line, "stroke-width": 3, fill: C.paper, x: 30, y: 4, width: 28, height: 26 }, g);
  return g.parentNode;
}
// centre de vie (santé, crèche, seniors) : maison + croix
function centreVie(parent, s = 1) {
  const g = el("g", { transform: `scale(${s})` }, el("g", {}, parent)); D.icons.house(g);
  el("circle", { ...D.line, fill: C.accent, cx: 40, cy: -40, r: 22 }, g);
  el("path", { fill: "none", stroke: C.paper, "stroke-width": 7, "stroke-linecap": "round", d: "M40 -52 L40 -28 M28 -40 L52 -40" }, g);
  return g.parentNode;
}
// cases d'une frise (mois) : set(i, état) — 0 vide, 1 sans loyer (gris), 2 loyer (pièce)
function frise(parent, n, x0, y, w, gap) {
  const g = el("g", {}, parent), cases = [];
  for (let i = 0; i < n; i++) { const c = el("g", {}, g);
    const r = el("rect", { ...D.line, "stroke-width": 3, fill: C.face, x: x0 + i * (w + gap), y, width: w, height: w, rx: 8 }, c);
    const p = coin(c, 18); p.setAttribute("transform", `translate(${x0 + i * (w + gap) + w / 2} ${y + w / 2})`);
    cases.push({ c, r, p }); }
  return { g, cases, set(i, k, etat) { const o = cases[i]; o.c.style.opacity = k; o.r.setAttribute("fill", etat === 1 ? C.paperDeep : C.face); o.p.style.opacity = etat === 2 ? 1 : 0; } };
}
// barre horizontale découpée (effet de levier)
function barre(parent, x, y, w, h, fill, label, fg = C.paper) {
  const g = el("g", {}, parent); const r = el("rect", { ...D.line, fill, x, y, width: w, height: h, rx: 10 }, g);
  txt(g, x + w / 2, y + h / 2 + 11, label, 30, { weight: 700, fill: fg });
  return { g, set(k) { r.setAttribute("width", Math.max(0, w * k)); g.style.opacity = k > 0.01 ? 1 : 0; } };
}
