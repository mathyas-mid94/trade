// Objets et personnages de « Un capital pour ses 18 ans » (au-dessus de dalio.js et kit.js).

// ---- personnages : la famille ----
// Sophie (maman), Marc (papa), Léo (17 ans), Camille (12 ans), Noé (6 ans) ; même dessin que les autres vidéos
const FAM = {
  sophie: { o: { vest: C.accent, hair: "f" }, s: 1 }, marc: { o: { vest: C.inkSoft }, s: 1.04 },
  leo: { o: { vest: C.accentSoft }, s: 0.78 }, camille: { o: { vest: C.inkSoft, hair: "f" }, s: 0.66 }, noe: { o: { vest: C.accent }, s: 0.52 },
  mamie: { o: { vest: C.paperDeep, hair: "f" }, s: 0.95 }, mathyas: { o: { vest: C.inkSoft }, s: 1.05 },
};
const NOMS = { sophie: "SOPHIE", marc: "MARC", leo: "LÉO", camille: "CAMILLE", noe: "NOÉ", mamie: "MAMIE", mathyas: "" };
function person(g, opts = {}) { return D.guy(g, opts); }
// un membre de la famille + son prénom ; m.at(t, a, x, y, {flip, armL, armR, k}) le fait apparaître (pop) et respirer
function member(g, who, label = true) {
  const f = FAM[who], guy = D.guy(g, f.o);
  const tag = label && NOMS[who] ? txt(g, 0, 0, NOMS[who], 22, { weight: 800, ls: 5, fill: C.inkSoft }) : null;
  return { guy, tag, s: f.s,
    at(t, a, x, y, o = {}) {
      const k = (o.k ?? 1) * pop(t, a);
      guy.pose(o.armL ?? 105, o.armR ?? 75).place(x, y + Math.sin(t * 2.2 + x) * 2, f.s * k * (o.scale ?? 1), o.flip);
      guy.g.style.opacity = k > 0.001 ? 1 : 0;
      if (tag) { tag.setAttribute("x", x); tag.setAttribute("y", y + 42); tag.style.opacity = Math.min(1, k) * (o.k ?? 1); }
      return k;
    } };
}
function stand(guy, t, a, x, y, s = 1, flip = false, armL = 105, armR = 75) {
  const k = pop(t, a);
  guy.pose(armL, armR).place(x, y + Math.sin(t * 2.2 + x) * 2, s * k, flip);
  guy.g.style.opacity = k > 0 ? 1 : 0;
  return k;
}

// ---- petits éléments ----
function check(parent, ok = true) {
  const g = el("g", {}, parent);
  el("circle", { ...D.line, fill: ok ? C.accent : C.face, r: 30 }, g);
  el("path", { ...D.line, "stroke-width": 7, d: ok ? "M-13 0 L-3 11 L15 -11" : "M-11 -11 L11 11 M11 -11 L-11 11" }, g);
  return g;
}
function title(g, y, str, size = 54) { return txt(g, 960, y, str, size, { font: "Serif", weight: 500 }); }
function big(g, x, y, str, size = 72, fill = C.ink) { return txt(g, x, y, str, size, { font: "Serif", weight: 600, fill }); }
// flèche tracée de (x1,y1) à (x2,y2), qui se dessine entre a et b
function arrow(g, x1, y1, x2, y2, a, b, o = {}) {
  const ang = Math.atan2(y2 - y1, x2 - x1), h = 18, col = o.color || C.accent, bend = o.bend || 0;
  const mx = (x1 + x2) / 2 - bend * Math.sin(ang), my = (y1 + y2) / 2 + bend * Math.cos(ang);
  const p = el("path", { ...D.line, stroke: col, "stroke-width": o.w || 7, d: `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}` }, g);
  const a2 = Math.atan2(y2 - my, x2 - mx);
  const head = el("path", { ...D.line, stroke: col, "stroke-width": o.w || 7,
    d: `M${x2 - h * Math.cos(a2 - 0.5)} ${y2 - h * Math.sin(a2 - 0.5)} L${x2} ${y2} L${x2 - h * Math.cos(a2 + 0.5)} ${y2 - h * Math.sin(a2 + 0.5)}` }, g);
  draw(p, a, b);
  return { p, head, render(t) { head.style.opacity = prog(t, b - 0.1, b) > 0 ? 1 : 0; } };
}
// contrat (icône) avec une étiquette en dessous
function contrat(parent, label = "", o = {}) {
  const g = el("g", {}, parent); D.icons.contract(g);
  if (o.lock) { const l = K.padlock(g); l.g.setAttribute("transform", "translate(46 52) scale(0.42)"); }
  const t = label ? txt(g, 0, 110, label, o.size || 24, { weight: 800, ls: 4, fill: o.fill || C.ink }) : null;
  return { g, t };
}
// bâtiment du notaire
function notaire(parent) { return bank(parent, "NOTAIRE", 260); }
// volant
function volant(parent) {
  const g = el("g", {}, parent);
  el("circle", { fill: "none", stroke: C.ink, "stroke-width": 34, r: 130 }, g);
  el("circle", { fill: "none", stroke: C.accent, "stroke-width": 24, r: 130 }, g);
  el("path", { fill: "none", stroke: C.accent, "stroke-width": 26, "stroke-linecap": "round", d: "M-120 0 L120 0 M0 0 L0 125" }, g);
  el("circle", { ...D.line, fill: C.accent, r: 38 }, g); el("circle", { ...D.line, fill: C.ink, r: 14 }, g);
  return g;
}
// cadeau
function cadeau(parent) {
  const g = el("g", {}, parent);
  el("rect", { ...D.line, fill: C.accent, x: -70, y: -30, width: 140, height: 100, rx: 6 }, g);
  el("rect", { ...D.line, fill: C.accent, x: -80, y: -56, width: 160, height: 30, rx: 6 }, g);
  el("rect", { ...D.line, fill: C.ink, x: -12, y: -56, width: 24, height: 126 }, g);
  el("path", { ...D.line, fill: C.ink, d: "M0 -56 C-30 -90 -64 -70 -40 -56 Z M0 -56 C30 -90 64 -70 40 -56 Z" }, g);
  return g;
}
function toque(parent) {   // diplôme / études
  const g = el("g", {}, parent);
  el("path", { ...D.line, fill: C.inkSoft, d: "M-40 0 L-40 30 C-20 44 20 44 40 30 L40 0" }, g);
  el("path", { ...D.line, fill: C.ink, d: "M-90 -10 L0 -48 L90 -10 L0 28 Z" }, g);
  el("path", { ...D.line, stroke: C.accent, "stroke-width": 5, d: "M60 -2 L60 40" }, g); el("circle", { ...D.line, fill: C.accent, cx: 60, cy: 46, r: 8 }, g);
  return g;
}
function voiture(parent) {   // le permis
  const g = el("g", {}, parent);
  el("path", { ...D.line, fill: C.accent, d: "M-110 20 L-110 -10 Q-104 -24 -80 -26 L-50 -60 L50 -60 L80 -26 Q108 -24 110 -10 L110 20 Z" }, g);
  el("path", { ...D.line, fill: C.face, d: "M-40 -50 L-4 -50 L-4 -26 L-62 -26 Z M6 -50 L42 -50 L64 -26 L6 -26 Z" }, g);
  for (const x of [-62, 62]) { el("circle", { ...D.line, fill: C.ink, cx: x, cy: 22, r: 22 }, g); el("circle", { fill: C.paperDeep, cx: x, cy: 22, r: 8 }, g); }
  return g;
}
function avion(parent) {   // un voyage, un projet
  const g = el("g", {}, parent);
  el("path", { ...D.line, fill: C.face, d: "M-90 0 Q-90 -14 -70 -14 L80 -14 Q104 -10 110 0 Q104 10 80 14 L-70 14 Q-90 14 -90 0 Z" }, g);
  el("path", { ...D.line, fill: C.accent, d: "M0 -12 L-36 -70 L-14 -70 L36 -12 Z M0 12 L-36 70 L-14 70 L36 12 Z M-70 -12 L-90 -44 L-76 -44 L-52 -12 Z" }, g);
  return g;
}
function cle(parent) {   // garder la main
  const g = el("g", {}, parent);
  el("circle", { ...D.line, fill: C.accent, "stroke-width": 5, cx: -50, cy: 0, r: 30 }, g); el("circle", { ...D.line, fill: C.paper, cx: -50, cy: 0, r: 10 }, g);
  el("path", { ...D.line, "stroke-width": 12, d: "M-20 0 L70 0 M44 0 L44 24 M64 0 L64 18" }, g);
  return g;
}
function livret(parent, label = "LIVRET A") {
  const g = el("g", {}, parent);
  el("rect", { ...D.line, fill: C.inkSoft, x: -60, y: -80, width: 120, height: 160, rx: 8 }, g);
  el("rect", { ...D.line, "stroke-width": 3, fill: C.paperDeep, x: -42, y: -50, width: 84, height: 40, rx: 4 }, g);
  txt(g, 0, -23, label, 15, { weight: 800, ls: 1 });
  return g;
}
// barre horizontale qui se remplit (k de 0 à 1)
function jauge(parent, w, h, fill = C.ink) {
  const g = el("g", {}, parent);
  el("rect", { ...D.line, fill: C.face, x: 0, y: -h / 2, width: w, height: h, rx: h / 2 }, g);
  const r = el("rect", { ...D.line, fill, x: 0, y: -h / 2, width: 0, height: h, rx: h / 2 }, g);
  return { g, set(k) { r.setAttribute("width", Math.max(0, w * k)); r.style.opacity = k > 0.01 ? 1 : 0; } };
}
// pièces qui voyagent de (x1,y1) à (x2,y2) entre a et b (n pièces décalées)
function flux(parent, n = 4) {
  const cs = []; for (let i = 0; i < n; i++) cs.push(coin(parent, 20));
  return (t, a, b, x1, y1, x2, y2, arc = 120) => cs.forEach((c, i) => {
    const k = prog(t, a + i * 0.18, b + i * 0.18), e = ease(k);
    const x = lerp(x1, x2, e), y = lerp(y1, y2, e) - Math.sin(Math.PI * e) * arc;
    place(c, x, y, k > 0 && k < 1 ? 1 : 0);
  });
}
// carte « point clé » avec un titre et un sous-titre
function bloc(parent, w, h, t1, t2 = "", o = {}) {
  const c = card(parent, w, h, { fill: o.fill || C.face });
  const dark = o.fill === C.ink;
  txt(c, 0, t2 ? -8 : 12, t1, o.size || 34, { font: o.font || "Serif", weight: o.weight || 600, fill: dark ? C.paper : C.ink, ls: o.ls || 0 });
  if (t2) txt(c, 0, 34, t2, o.size2 || 22, { weight: 500, fill: dark ? C.accentSoft : C.inkSoft });
  return c;
}
