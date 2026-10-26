// Objets propres à « L'argent suit la valeur » : graphique support / résistance, balance, foot, piédestal, arbre…

// trait horizontal qui se déroule de x0 vers x1 (k entre 0 et 1)
function hline(p, x0, x1, y, k) { p.setAttribute("d", `M${x0} ${y} L${lerp(x0, x1, Math.max(0, Math.min(1, k)))} ${y}`); p.style.opacity = k > 0 ? 1 : 0; }

// graphique de marché : axes, support (plancher, plein) et résistance (plafond, pointillés)
function graphe(parent, x0, x1, ySup, yRes) {
  const g = el("g", {}, parent);
  const ax = el("path", { ...D.line, "stroke-width": 4, stroke: C.inkSoft, d: `M${x0} ${yRes - 110} L${x0} ${ySup + 70} L${x1} ${ySup + 70}` }, g);
  const sup = el("path", { ...D.line, stroke: C.ink, "stroke-width": 9 }, g);
  const res = el("path", { ...D.line, stroke: C.accent, "stroke-width": 9, "stroke-dasharray": "28 18" }, g);
  return { g, ax, sup, res, x0, x1,
    set(kSup, kRes, ys = ySup, yr = yRes) { hline(sup, x0, x1, ys, kSup); hline(res, x0, x1, yr, kRes); } };
}
// courbe qui se trace avec un point au bout : pts en coordonnées absolues ; set(k) renvoie la position du point
function trace(parent, pts, o = {}) {
  const g = el("g", {}, parent);
  const p = el("path", { ...D.line, stroke: o.color || C.ink, "stroke-width": o.w || 7 }, g);
  const dot = el("circle", { ...D.line, fill: o.dot || C.accent, r: o.r ?? 14 }, g);
  const L = [0];
  for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return { g, p, dot, set(k) {
    k = Math.max(0, Math.min(1, k)); const goal = L[L.length - 1] * k;
    let x = pts[0][0], y = pts[0][1], d = `M${x} ${y}`;
    for (let i = 1; i < pts.length; i++) {
      if (L[i] <= goal) { x = pts[i][0]; y = pts[i][1]; d += ` L${x} ${y}`; continue; }
      const u = (goal - L[i - 1]) / (L[i] - L[i - 1]); x = lerp(pts[i - 1][0], pts[i][0], u); y = lerp(pts[i - 1][1], pts[i][1], u); d += ` L${x} ${y}`; break;
    }
    p.setAttribute("d", d); dot.setAttribute("cx", x); dot.setAttribute("cy", y);
    p.style.opacity = dot.style.opacity = k > 0 ? 1 : 0; return [x, y];
  } };
}
// échantillonne une fonction f(u) -> y sur [x0, x1]
function courbeXY(x0, x1, f, n = 80) { return Array.from({ length: n + 1 }, (_, i) => [lerp(x0, x1, i / n), f(i / n)]); }
// bougies de marché (graphique « trader »), série reproductible
function bougies(parent, n, w, h, seed = 7) {
  const g = el("g", {}, parent); let s = seed, v = 0.3; const B = [];
  for (let i = 0; i < n; i++) {
    s = (s * 1664525 + 1013904223) >>> 0; const o = v; v = Math.max(0.08, Math.min(0.92, v + 0.035 + (s / 4294967296 - 0.5) * 0.22));
    const hi = Math.max(o, v) + 0.05, lo = Math.min(o, v) - 0.05, x = -w / 2 + (i + 0.5) * w / n, up = v >= o, b = el("g", {}, g);
    el("path", { ...D.line, "stroke-width": 3, d: `M${x} ${h / 2 - hi * h} L${x} ${h / 2 - lo * h}` }, b);
    el("rect", { ...D.line, "stroke-width": 3, fill: up ? C.inkSoft : C.accent, x: x - w / n * 0.3, width: w / n * 0.6, y: h / 2 - Math.max(o, v) * h, height: Math.max(4, Math.abs(v - o) * h) }, b);
    B.push(b);
  }
  return { g, B };
}
// balance à deux plateaux : set(angle) incline le fléau ; pans[i] = groupe du plateau (poser des objets en 0, 120)
function balance(parent) {
  const g = el("g", {}, parent);
  el("path", { ...D.line, fill: C.inkSoft, d: "M-90 0 L90 0 L30 -26 L-30 -26 Z" }, g);
  el("path", { ...D.line, "stroke-width": 11, d: "M0 -26 L0 -330" }, g);
  const beam = el("g", {}, g);
  el("path", { ...D.line, "stroke-width": 11, d: "M-300 0 L300 0" }, beam);
  el("circle", { ...D.line, fill: C.accent, r: 18 }, beam);
  const pans = [-1, 1].map(() => { const p = el("g", {}, g);
    el("path", { ...D.line, "stroke-width": 3, d: "M0 0 L-90 140 M0 0 L90 140" }, p);
    el("path", { ...D.line, fill: C.paperDeep, d: "M-115 140 L115 140 Q100 196 0 196 Q-100 196 -115 140 Z" }, p); return p; });
  return { g, pans, set(a) { const r = a * Math.PI / 180;
    beam.setAttribute("transform", `translate(0 -330) rotate(${a})`);
    pans.forEach((p, i) => { const s = i ? 1 : -1; p.setAttribute("transform", `translate(${300 * s * Math.cos(r)} ${-330 + 300 * s * Math.sin(r)})`); }); } };
}
function ballon(parent, r = 34) {
  const g = el("g", {}, parent);
  el("circle", { ...D.line, fill: C.face, r }, g);
  const k = r / 34;
  el("path", { ...D.line, fill: C.ink, "stroke-width": 2, d: `M0 ${-12 * k} L${11 * k} ${-4 * k} L${7 * k} ${10 * k} L${-7 * k} ${10 * k} L${-11 * k} ${-4 * k} Z` }, g);
  el("path", { ...D.line, "stroke-width": 2.5, d: `M0 ${-12 * k} L0 ${-r} M${11 * k} ${-4 * k} L${r * 0.95} ${-10 * k} M${7 * k} ${10 * k} L${20 * k} ${r * 0.8} M${-7 * k} ${10 * k} L${-20 * k} ${r * 0.8} M${-11 * k} ${-4 * k} L${-r * 0.95} ${-10 * k}` }, g);
  return g;
}
function maillot(parent, num = "10") {
  const g = el("g", {}, parent);
  el("path", { ...D.line, fill: C.accent, d: "M-40 -70 L-90 -40 L-70 0 L-50 -10 L-50 80 L50 80 L50 -10 L70 0 L90 -40 L40 -70 Q0 -40 -40 -70 Z" }, g);
  txt(g, 0, 40, num, 54, { font: "Serif", weight: 700, fill: C.ink });
  return g;
}
function tele(parent) {
  const g = el("g", {}, parent);
  el("path", { ...D.line, "stroke-width": 4, d: "M-30 -100 L0 -70 L30 -100" }, g);
  el("rect", { ...D.line, fill: C.ink, x: -110, y: -70, width: 220, height: 150, rx: 16 }, g);
  el("rect", { ...D.line, fill: C.inkSoft, x: -90, y: -52, width: 180, height: 114, rx: 8 }, g);
  const b = ballon(g, 22); b.setAttribute("transform", "translate(0 6)");
  el("path", { ...D.line, d: "M-50 80 L-60 100 M50 80 L60 100" }, g);
  return g;
}
function stade(parent) {
  const g = el("g", {}, parent);
  el("path", { ...D.line, fill: C.paperDeep, d: "M-200 60 L-200 -20 Q0 -110 200 -20 L200 60 Z" }, g);
  el("path", { ...D.line, fill: C.inkSoft, d: "M-150 60 L-150 20 Q0 -30 150 20 L150 60 Z" }, g);
  const fans = [];
  for (let i = 0; i < 14; i++) { const u = i / 13, x = lerp(-180, 180, u), y = -20 - 70 * Math.sin(Math.PI * u) + 18;
    fans.push(el("circle", { ...D.line, "stroke-width": 2, fill: i % 3 ? C.accent : C.face, cx: x, cy: y, r: 9 }, g)); }
  return { g, fans };
}
// piédestal : colonne de hauteur h (set)
function piedestal(parent, w = 200) {
  const g = el("g", {}, parent);
  const col = el("rect", { ...D.line, fill: C.paperDeep, x: -w / 2 + 20, width: w - 40 }, g);
  const top = el("rect", { ...D.line, fill: C.accentSoft, x: -w / 2, width: w, height: 26, rx: 6 }, g);
  const bas = el("rect", { ...D.line, fill: C.accentSoft, x: -w / 2, y: -26, width: w, height: 26, rx: 6 }, g);
  return { g, set(h) { col.setAttribute("y", -h); col.setAttribute("height", Math.max(0, h)); top.setAttribute("y", -h - 26); g.style.opacity = h > 2 ? 1 : 0; return -h - 26; } };
}
// arbre qui pousse : set(k) de 0 à 1 ; fruits = groupes posés dans le feuillage
function arbre(parent, s = 1) {
  const g = el("g", { transform: `scale(${s})` }, parent);
  const tronc = el("path", { ...D.line, fill: C.inkSoft, d: "M-22 0 L-14 -200 L14 -200 L22 0 Z" }, g);
  const fe = [[-120, -250, 110], [110, -260, 105], [0, -360, 130], [-60, -180, 80], [70, -175, 80]].map(([x, y, r]) => ({ c: el("circle", { ...D.line, fill: C.ink, cx: x, cy: y, r: 0 }, g), r }));
  const fruits = [[-120, -250], [110, -260], [0, -380], [-40, -300], [60, -320]].map(([x, y]) => { const f = el("g", {}, g); f.setAttribute("transform", `translate(${x} ${y})`); return f; });
  return { g, fruits, set(k) {
    tronc.setAttribute("transform", `scale(1 ${ease(prog(k, 0, 0.4))})`);
    fe.forEach((f, i) => f.c.setAttribute("r", f.r * back(prog(k, 0.3 + i * 0.08, 0.7 + i * 0.08))));
  } };
}
// licorne (tête stylisée) : la chasse aux coups de chance
function licorne(parent) {
  const g = el("g", {}, parent);
  el("path", { ...D.line, fill: C.face, d: "M-40 60 Q-60 -10 -20 -50 L10 -70 Q60 -60 70 -10 L80 20 Q70 40 50 30 L20 10 Q10 40 20 60 Z" }, g);
  el("path", { ...D.line, fill: C.accent, d: "M0 -66 L30 -150 L22 -62 Z" }, g);
  el("path", { ...D.line, fill: C.accentSoft, d: "M-20 -50 Q-60 -40 -55 10 Q-70 30 -45 55" }, g);
  el("circle", { cx: 30, cy: -30, r: 5, fill: C.ink }, g);
  return g;
}
// livre
function livre(parent, label = "") {
  const g = el("g", {}, parent);
  el("path", { ...D.line, fill: C.face, d: "M-70 -50 Q-35 -64 0 -46 Q35 -64 70 -50 L70 50 Q35 36 0 54 Q-35 36 -70 50 Z" }, g);
  el("path", { ...D.line, "stroke-width": 3, d: "M0 -46 L0 54 M-55 -26 L-15 -22 M-55 -6 L-15 -2 M15 -22 L55 -26 M15 -2 L55 -6" }, g);
  if (label) txt(g, 0, 96, label, 22, { weight: 800, ls: 4 });
  return g;
}
// smartphone avec un post « réseaux »
function telephone(parent, lignes = []) {
  const g = el("g", {}, parent);
  el("rect", { ...D.line, fill: C.ink, x: -110, y: -200, width: 220, height: 400, rx: 28 }, g);
  el("rect", { ...D.line, fill: C.face, x: -94, y: -176, width: 188, height: 352, rx: 12 }, g);
  lignes.forEach((s, i) => txt(g, 0, -110 + i * 46, s, 22, { weight: 700 }));
  return g;
}
// case « DÉPART » de jeu de société
function depart(parent) {
  const g = el("g", {}, parent);
  el("rect", { ...D.line, fill: C.accent, x: -110, y: -80, width: 220, height: 160, rx: 14 }, g);
  txt(g, 0, -10, "DÉPART", 34, { weight: 800, ls: 6 });
  el("path", { ...D.line, "stroke-width": 7, d: "M60 30 L-60 30 M-35 12 L-60 30 L-35 48" }, g);
  return g;
}
