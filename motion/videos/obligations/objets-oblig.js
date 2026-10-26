// Objets propres à « Les obligations » : titre, balançoire, thermomètre, relevé, jauge de risque, dé, fonds.

// titre obligataire (icône) agrandi, avec une étiquette de taux sur le certificat
function titre(parent, s = 1.4, taux = "") {
  const g = el("g", {}, parent), i = el("g", { transform: `scale(${s})` }, g); D.icons.obligation(i);
  const t = taux ? big(g, -14 * s, 2 * s, taux, 22 * s, C.ink) : null;
  return { g, t, coupons: i.firstElementChild.lastElementChild };
}
// balançoire : à gauche la boule TAUX, à droite la boule PRIX ; set(a) en degrés (a > 0 : TAUX en haut)
function balancoire(parent, L = 300) {
  const g = el("g", {}, parent);
  el("path", { ...D.line, fill: C.inkSoft, d: "M-60 0 L60 0 L0 -90 Z" }, g);
  const pl_ = el("g", {}, g);
  el("rect", { ...D.line, fill: C.ink, x: -L - 20, y: -12, width: 2 * L + 40, height: 24, rx: 12 }, pl_);
  const bT = el("g", {}, pl_), bP = el("g", {}, pl_);
  el("circle", { ...D.line, fill: C.ink, cx: 0, cy: 0, r: 62 }, bT); txt(bT, 0, 10, "TAUX", 28, { weight: 800, ls: 2, fill: C.paper });
  el("circle", { ...D.line, fill: C.accent, cx: 0, cy: 0, r: 62 }, bP); txt(bP, 0, 10, "PRIX", 28, { weight: 800, ls: 2 });
  bT.setAttribute("transform", `translate(${-L + 40} -74)`); bP.setAttribute("transform", `translate(${L - 40} -74)`);
  return { g, set(a) { pl_.setAttribute("transform", `translate(0 -90) rotate(${a})`); } };
}
// thermomètre : set(v) avec v en % (de -1 à 5)
function thermo(parent) {
  const g = el("g", {}, parent);
  el("rect", { ...D.line, fill: C.face, x: -30, y: -420, width: 60, height: 420, rx: 30 }, g);
  el("circle", { ...D.line, fill: C.ink, cx: 0, cy: 30, r: 54 }, g);
  const mer = el("rect", { fill: C.ink, x: -16, width: 32, rx: 16 }, g);
  for (let v = 0; v <= 4; v++) el("path", { ...D.line, "stroke-width": 3, d: `M38 ${-60 - v * 80} L58 ${-60 - v * 80}` }, g);
  return { g, set(v) { const h = 60 + (v + 0.75) * 80; mer.setAttribute("y", -h + 10); mer.setAttribute("height", h); } };
}
// relevé de compte avec une ligne d'obligation : val / delta modifiables
function releve(parent) {
  const c = card(parent, 560, 340, { fill: C.face });
  el("rect", { ...D.line, fill: C.ink, x: -280, y: -170, width: 560, height: 70, rx: 16 }, c);
  txt(c, 0, -124, "TON RELEVÉ", 26, { weight: 800, ls: 6, fill: C.paper });
  txt(c, -240, -40, "Obligation 4 % · 5 ans", 28, { anchor: "start", font: "Serif", weight: 600 });
  txt(c, -240, 0, "valeur de marché", 20, { anchor: "start", weight: 600, fill: C.inkSoft });
  const val = big(c, -240, 100, "100 €", 76); val.setAttribute("text-anchor", "start");
  const delta = txt(c, 240, 96, "", 44, { anchor: "end", weight: 800, fill: C.accent });
  return { g: c, val, delta };
}
// jauge de risque à 5 segments : set(k) remplit n segments au prorata
function jauge(parent, n, fill = C.inkSoft) {
  const g = el("g", {}, parent);
  const S = [0, 1, 2, 3, 4].map(i => el("rect", { ...D.line, "stroke-width": 2, fill: C.paperDeep, x: -150 + i * 62, y: -9, width: 52, height: 18, rx: 9 }, g));
  return { g, set(k) { S.forEach((s, i) => s.setAttribute("fill", i < n * k - 0.001 ? fill : C.paperDeep)); } };
}
// dé (le pari)
function de(parent) {
  const g = el("g", {}, parent);
  el("rect", { ...D.line, fill: C.face, x: -50, y: -50, width: 100, height: 100, rx: 18 }, g);
  [[-24, -24], [24, -24], [0, 0], [-24, 24], [24, 24]].forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 9, fill: C.ink }, g));
  return g;
}
// symbole infini (fonds ouvert) avec deux points qui tournent : set(t)
function infini(parent, w = 300, h = 90) {
  const g = el("g", {}, parent), f = u => [w / 2 * Math.sin(u), h * Math.sin(u) * Math.cos(u)];
  const d = Array.from({ length: 121 }, (_, i) => f(i / 120 * Math.PI * 2)).map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ") + " Z";
  el("path", { ...D.line, stroke: C.inkSoft, "stroke-width": 14, d }, g);
  const pts = [0, 1].map(() => el("circle", { ...D.line, fill: C.accent, r: 16 }, g));
  return { g, set(t) { pts.forEach((p, i) => { const [x, y] = f(t * 1.2 + i * Math.PI); p.setAttribute("cx", x); p.setAttribute("cy", y); }); } };
}
// chiffre qui défile de a à b (arrondi, avec suffixe)
function defile(node, a, b, k, suf = " €", dec = 0) { const v = lerp(a, b, k); node.textContent = (dec ? v.toFixed(dec).replace(".", ",") : Math.round(v)) + suf; }
