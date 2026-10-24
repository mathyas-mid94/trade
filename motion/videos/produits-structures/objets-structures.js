// Objets propres à « Les produits structurés » : des objets qui BOUGENT (marcheur, ascenseur, robinet, compteur…).

FAM.client = { o: { vest: C.accent, hair: "f" }, s: 1 }; NOMS.client = "";

// personnage qui marche d'un point à l'autre : keys = [[t, x, y], …] ; balancement des bras et rebond pendant la marche
function marcheur(g, opts = {}, s = 1) {
  const guy = D.guy(g, opts);
  return { guy, at(t, keys, o = {}) {
    let x = keys[0][1], y = keys[0][2], mv = 0, dir = 1;
    for (let i = 1; i < keys.length; i++) { const [t0, x0, y0] = keys[i - 1], [t1, x1, y1] = keys[i];
      if (t >= t0 && t <= t1) { const k = ease((t - t0) / (t1 - t0)); x = lerp(x0, x1, k); y = lerp(y0, y1, k); mv = Math.abs(x1 - x0) > 1 ? 1 : 0; dir = x1 >= x0 ? 1 : -1; break; }
      if (t > t1) { x = x1; y = y1; } }
    if (o.yOf) y = o.yOf(x);
    const sw = mv * 28 * Math.sin(t * 11), k = (o.k ?? 1) * pop(t, keys[0][0] - 0.3);
    guy.pose(o.armL ?? 100 + sw, o.armR ?? 80 - sw).place(x, y - mv * Math.abs(Math.sin(t * 11)) * 8 + Math.sin(t * 2.2 + x) * 2, s * k, o.flip ?? dir < 0);
    guy.g.style.opacity = k > 0.001 ? 1 : 0; return { x, y };
  } };
}
// ascenseur à portes : cabine qui monte d'étage en étage ; open(k) ouvre les portes
function ascenseur(parent, n = 5, h = 140) {
  const g = el("g", {}, parent);
  el("rect", { ...D.line, fill: C.paperDeep, x: -110, y: -n * h, width: 220, height: n * h, rx: 6 }, g);
  const et = []; for (let i = 0; i < n; i++) { el("path", { ...D.line, "stroke-width": 3, stroke: C.inkSoft, d: `M-110 ${-i * h} L110 ${-i * h}` }, g);
    et.push(txt(g, -140, -i * h - h / 2 + 10, i === n - 1 ? "ÉCHÉANCE" : "ANNÉE " + (i + 1), 20, { anchor: "end", weight: 800, ls: 3, fill: C.inkSoft })); }
  const cab = el("g", {}, g);
  el("rect", { ...D.line, fill: C.face, x: -90, y: -h + 10, width: 180, height: h - 20, rx: 6 }, cab);
  const pl_ = el("rect", { ...D.line, fill: C.inkSoft, x: -88, y: -h + 12, width: 88, height: h - 24 }, cab), pr_ = el("rect", { ...D.line, fill: C.inkSoft, x: 0, y: -h + 12, width: 88, height: h - 24 }, cab);
  return { g, cab, et, h, set(floor, open) { cab.setAttribute("transform", `translate(0 ${-floor * h})`);
    pl_.setAttribute("width", 88 * (1 - open)); pr_.setAttribute("x", 88 * open); pr_.setAttribute("width", 88 * (1 - open)); } };
}
// robinet + seau : flow(k) fait couler, fill(k) remplit le seau
function robinet(parent) {
  const g = el("g", {}, parent);
  el("path", { ...D.line, fill: C.inkSoft, d: "M-160 -220 L-20 -220 L-20 -180 L10 -180 L10 -140 L-40 -140 L-40 -180 L-160 -180 Z" }, g);
  const vol = el("g", {}, g); el("rect", { ...D.line, fill: C.accent, x: -90, y: -250, width: 16, height: 30 }, vol); el("rect", { ...D.line, fill: C.accent, x: -122, y: -262, width: 80, height: 14, rx: 7 }, vol);
  const eau = el("rect", { fill: C.accentSoft, x: -26, y: -140, width: 22, height: 0 }, g);
  const drops = [0, 1, 2].map(() => el("circle", { fill: C.accent, r: 8 }, g));
  el("path", { ...D.line, fill: C.face, d: "M-90 -60 L60 -60 L45 80 L-75 80 Z" }, g);
  const niv = el("path", { fill: C.accent, d: "" }, g);
  el("path", { ...D.line, fill: "none", d: "M-90 -60 L60 -60 L45 80 L-75 80 Z" }, g);
  return { g, vol, set(t, flow, fill) {
    eau.setAttribute("height", flow > 0.5 ? 80 : 0); vol.setAttribute("transform", `rotate(${flow > 0.5 ? 0 : -60} -82 -235)`);
    drops.forEach((d, i) => { const k = ((t * 1.6 + i / 3) % 1); d.setAttribute("cx", -15); d.setAttribute("cy", -140 + k * 200); d.style.opacity = flow > 0.5 ? 0 : 0.0; });
    const top = 80 - 130 * fill, w0 = 45 + (60 - 45) * (80 - top) / 140, w1 = -75 - (90 - 75) * (80 - top) / 140;
    niv.setAttribute("d", fill > 0.01 ? `M${w1} ${top} L${w0} ${top} L45 80 L-75 80 Z` : ""); } };
}
// compteur à rouleaux (Athéna) : set(v) affiche « v % »
function compteur(parent) {
  const g = el("g", {}, parent);
  el("rect", { ...D.line, fill: C.ink, x: -170, y: -70, width: 340, height: 140, rx: 20 }, g);
  el("rect", { ...D.line, fill: C.paper, x: -140, y: -45, width: 280, height: 90, rx: 10 }, g);
  const t = big(g, 0, 28, "0 %", 72);
  const rays = [0, 1, 2, 3].map(i => el("path", { ...D.line, "stroke-width": 5, stroke: C.accent, d: "" }, g));
  return { g, set(v, tt) { t.textContent = Math.round(v) + " %"; rays.forEach((r, i) => { const a = tt * 3 + i * Math.PI / 2; r.setAttribute("d", `M${200 * Math.cos(a)} ${100 * Math.sin(a)} L${230 * Math.cos(a)} ${115 * Math.sin(a)}`); }); } };
}
// montagne (cordée)
function montagne(parent) {
  const g = el("g", {}, parent);
  el("path", { ...D.line, fill: C.paperDeep, d: "M-500 200 L-120 -260 L40 -80 L160 -200 L520 200 Z" }, g);
  el("path", { ...D.line, fill: C.face, d: "M-180 -188 L-120 -260 L-60 -188 L-90 -170 L-120 -195 L-150 -170 Z" }, g);
  return g;
}
// couverture trop courte : set(k) entre -1 (pieds couverts) et 1 (épaules couvertes)
function couverture(parent) {
  const g = el("g", {}, parent);
  el("rect", { ...D.line, fill: C.paperDeep, x: -300, y: -20, width: 600, height: 60, rx: 18 }, g);
  el("ellipse", { ...D.line, fill: C.face, cx: -260, cy: -40, rx: 46, ry: 40 }, g);
  el("circle", { fill: C.ink, cx: -248, cy: -48, r: 4 }, g);
  el("path", { ...D.line, fill: C.face, d: "M262 -46 C292 -50 296 -14 266 -10 Z" }, g);
  const cv = el("rect", { ...D.line, fill: C.accent, x: -200, y: -50, width: 380, height: 70, rx: 14 }, g);
  return { g, set(k) { cv.setAttribute("x", -200 + 90 * k); } };
}
// tapis roulant (décrément)
function tapis(parent, w = 900) {
  const g = el("g", {}, parent);
  el("rect", { ...D.line, fill: C.inkSoft, x: -w / 2, y: 0, width: w, height: 40, rx: 20 }, g);
  const marks = Array.from({ length: 18 }, () => el("path", { stroke: C.paper, "stroke-width": 5, d: "" }, g));
  for (const x of [-w / 2 + 20, w / 2 - 20]) el("circle", { ...D.line, fill: C.face, cx: x, cy: 20, r: 16 }, g);
  return { g, set(t) { marks.forEach((mk, i) => { const x = -w / 2 + ((i * 60 - t * 80) % w + w) % w; mk.setAttribute("d", `M${x} 10 L${x - 12} 30`); }); } };
}
// voiture + airbag
function crash(parent) {
  const g = el("g", {}, parent);
  el("rect", { ...D.line, fill: C.ink, x: 210, y: -200, width: 40, height: 220 }, g);
  for (let y = -190; y < 20; y += 40) el("path", { stroke: C.paper, "stroke-width": 3, d: `M210 ${y} L250 ${y + 20}` }, g);
  const car = el("g", {}, g); const v = voiture(car); v.setAttribute("transform", "scale(0.9)");
  const bag = el("circle", { ...D.line, fill: C.face, cx: 60, cy: -50, r: 0 }, car);
  return { g, set(x, b) { car.setAttribute("transform", `translate(${x} 0)`); bag.setAttribute("r", 55 * b); } };
}
// haie (barrière dégressive) : set(h) règle la hauteur
function haie(parent) {
  const g = el("g", {}, parent), barre = el("rect", { ...D.line, fill: C.accent, x: -80, width: 160, height: 16, rx: 8 }, g);
  const p1 = el("path", { ...D.line, "stroke-width": 7, d: "" }, g), p2 = el("path", { ...D.line, "stroke-width": 7, d: "" }, g);
  return { g, set(h) { barre.setAttribute("y", -h); p1.setAttribute("d", `M-64 0 L-64 ${-h}`); p2.setAttribute("d", `M64 0 L64 ${-h}`); } };
}
// une option (ticket doré) avec un sous-titre
function ticket(parent, label = "OPTION") {
  const g = el("g", {}, parent);
  el("path", { ...D.line, fill: C.accent, d: "M-110 -55 L110 -55 L110 -18 A18 18 0 0 0 110 18 L110 55 L-110 55 L-110 18 A18 18 0 0 0 -110 -18 Z" }, g);
  el("path", { ...D.line, "stroke-width": 3, "stroke-dasharray": "8 8", d: "M-60 -50 L-60 50" }, g);
  txt(g, 25, 12, label, 30, { weight: 800, ls: 4 });
  return g;
}
