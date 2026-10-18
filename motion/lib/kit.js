// Boîte à outils pour les vidéos explicatives (au-dessus de dalio.js).
// Petits objets dessinés (pièces, enveloppe, cadenas, coffre, bâtiments…) et aides d'animation.
const K = (() => {
  const { C, el, prog, ease, easeOut, back, lerp } = D;
  const pop = (lt, a, d = 0.4) => back(prog(lt, a, a + d));
  const fade = (lt, a, d = 0.4) => easeOut(prog(lt, a, a + d));
  const out = (lt, a, d = 0.4) => 1 - ease(prog(lt, a, a + d));
  function place(node, x, y, s = 1, r = 0) { node.setAttribute("transform", `translate(${x} ${y}) rotate(${r}) scale(${s})`); node.style.opacity = s > 0.001 ? 1 : 0; }
  function show(node, k, dy = 20) { node.style.opacity = k; node.setAttribute("transform", `translate(0 ${dy * (1 - k)})`); }
  function txt(parent, x, y, str, size, o = {}) {
    const t = el("text", { x, y, "text-anchor": o.anchor || "middle", "font-family": o.font || "Sans", "font-weight": o.weight || 600,
      "font-size": size, "letter-spacing": o.ls || 0, fill: o.fill || C.ink }, parent);
    t.textContent = str; return t;
  }
  function pill(parent, x, y, str, o = {}) {
    const g = el("g", {}, parent), size = o.size || 26;
    const t = txt(g, 0, size * 0.36, str, size, { weight: 700, ls: o.ls ?? 4, fill: o.fg || C.ink, font: o.font });
    const w = t.getComputedTextLength() + 56, h = size * 2;
    const r = el("rect", { ...D.line, "stroke-width": 3, fill: o.bg || C.accentSoft, x: -w / 2, y: -h / 2, width: w, height: h, rx: h / 2 }, g);
    g.insertBefore(r, t);
    return { g, x, y, w };
  }
  function card(parent, w, h, o = {}) {
    const g = el("g", {}, parent);
    el("rect", { ...D.line, fill: o.fill || C.face, x: -w / 2, y: -h / 2, width: w, height: h, rx: o.rx ?? 16 }, g);
    return g;
  }
  function coin(parent, rx = 26) {
    const g = el("g", {}, parent);
    el("path", { ...D.line, fill: C.accent, d: `M${-rx} 0 L${-rx} 9 A${rx} ${rx * 0.35} 0 0 0 ${rx} 9 L${rx} 0` }, g);
    el("ellipse", { ...D.line, fill: C.accentSoft, cx: 0, cy: 0, rx, ry: rx * 0.35 }, g);
    return g;
  }
  function stack(parent, n, rx = 26) {
    const g = el("g", {}, parent);
    for (let j = 0; j < n; j++) { const c = coin(g, rx); c.setAttribute("transform", `translate(${(j % 2) * 4 - 2} ${-j * rx * 0.62})`); }
    return g;
  }
  function envelope(parent, label = "ASSURANCE-VIE") {
    const g = el("g", {}, parent);
    const flapOpen = el("path", { ...D.line, fill: C.accentSoft, d: "M-260 -170 L0 -330 L260 -170 Z" }, g);
    const inside = el("path", { ...D.line, fill: C.inkSoft, d: "M-250 -165 L250 -165 L250 -120 L-250 -120 Z" }, g);
    el("path", { ...D.line, fill: C.paperDeep, d: "M-260 -170 L260 -170 L260 170 L-260 170 Z" }, g);
    el("path", { ...D.line, "stroke-width": 3, d: "M-260 170 L-40 20 M260 170 L40 20" }, g);
    const flapShut = el("path", { ...D.line, fill: C.accentSoft, d: "M-260 -170 L0 20 L260 -170 Z" }, g);
    if (label) { el("rect", { ...D.line, "stroke-width": 3, fill: C.face, x: -195, y: 88, width: 390, height: 50, rx: 6 }, g);
      txt(g, 0, 124, label, 30, { weight: 700, ls: 8 }); }
    const o = { g, setOpen(k) { flapShut.style.opacity = k < 0.5 ? 1 : 0; flapOpen.style.opacity = k >= 0.5 ? 1 : 0; inside.style.opacity = k >= 0.5 ? 1 : 0;
      flapShut.setAttribute("transform", `translate(0 -170) scale(1 ${1 - 2 * Math.min(k, 0.5)}) translate(0 170)`);
      flapOpen.setAttribute("transform", `translate(0 -170) scale(1 ${Math.max(0, 2 * k - 1)}) translate(0 170)`); } };
    o.setOpen(0); return o;
  }
  function padlock(parent) {
    const g = el("g", {}, parent);
    const sh = el("path", { fill: "none", stroke: C.ink, "stroke-width": 14, "stroke-linecap": "round", d: "M-30 0 L-30 -40 A30 30 0 0 1 30 -40 L30 0" }, g);
    el("rect", { ...D.line, fill: C.accent, x: -55, y: -8, width: 110, height: 90, rx: 10 }, g);
    el("circle", { cx: 0, cy: 28, r: 10, fill: C.ink }, g); el("path", { ...D.line, "stroke-width": 7, d: "M0 30 L0 52" }, g);
    return { g, sh, open(k) { sh.setAttribute("transform", `translate(30 ${-30 * k}) rotate(${-35 * k}) translate(-30 0)`); } };
  }
  function vault(parent) {
    const g = el("g", {}, parent);
    el("path", { ...D.line, fill: C.ink, d: "M-120 130 L-120 150 L-80 150 L-80 130 M80 130 L80 150 L120 150 L120 130" }, g);
    el("rect", { ...D.line, fill: C.paperDeep, x: -150, y: -130, width: 300, height: 260, rx: 10 }, g);
    el("rect", { ...D.line, "stroke-width": 3, fill: "none", x: -128, y: -108, width: 256, height: 216, rx: 6 }, g);
    const dial = el("g", {}, g);
    el("circle", { ...D.line, fill: C.face, cx: 0, cy: 0, r: 56 }, dial);
    for (let i = 0; i < 4; i++) el("path", { ...D.line, "stroke-width": 7, d: `M0 0 L${44 * Math.cos(i * Math.PI / 2)} ${44 * Math.sin(i * Math.PI / 2)}` }, dial);
    el("circle", { cx: 0, cy: 0, r: 10, fill: C.ink }, dial);
    el("path", { ...D.line, "stroke-width": 9, d: "M108 -40 L108 40" }, g);
    return { g, dial };
  }
  function heart(parent) {
    return el("path", { ...D.line, fill: C.accent, d: "M0 40 C-80 -10 -66 -78 -20 -72 C0 -70 0 -52 0 -46 C0 -52 0 -70 20 -72 C66 -78 80 -10 0 40 Z" }, parent);
  }
  function shield(parent, fill = C.accent) {
    return el("path", { ...D.line, fill, d: "M0 -80 L64 -56 C64 10 44 50 0 80 C-44 50 -64 10 -64 -56 Z" }, parent);
  }
  // bâtiment à colonnes (banque, État…) ; label sous le fronton
  function bank(parent, label = "BANQUE", w = 300) {
    const g = el("g", {}, parent), h = 230;
    el("path", { ...D.line, fill: C.accentSoft, d: `M${-w / 2 - 20} -${h / 2} L0 -${h / 2 + 90} L${w / 2 + 20} -${h / 2} Z` }, g);
    el("rect", { ...D.line, fill: C.paperDeep, x: -w / 2, y: -h / 2, width: w, height: h }, g);
    for (let i = 0; i < 4; i++) { const x = -w / 2 + 35 + i * (w - 70) / 3; el("rect", { ...D.line, fill: C.face, x: x - 14, y: -h / 2 + 50, width: 28, height: h - 80 }, g); }
    el("rect", { ...D.line, fill: C.inkSoft, x: -w / 2 - 25, y: h / 2 - 4, width: w + 50, height: 22 }, g);
    if (label) txt(g, 0, -h / 2 + 30, label, 24, { weight: 800, ls: 6 });
    return g;
  }
  function house(parent, s = 1) { const g = el("g", { transform: `scale(${s})` }, parent); D.icons.house(g); return g; }
  function icon(parent, kind, s = 1, badge = false) {
    const w = el("g", {}, parent); const inner = el("g", { transform: `scale(${s})` }, w);
    if (badge) el("circle", { ...D.line, fill: C.face, r: 92 }, inner);
    D.icons[kind](inner); return w;
  }
  // calendrier simple, avec un texte au centre
  function calendar(parent, label = "") {
    const g = el("g", {}, parent);
    el("rect", { ...D.line, fill: C.face, x: -80, y: -70, width: 160, height: 150, rx: 10 }, g);
    el("rect", { ...D.line, fill: C.inkSoft, x: -80, y: -70, width: 160, height: 40, rx: 10 }, g);
    el("path", { ...D.line, "stroke-width": 8, d: "M-40 -86 L-40 -60 M40 -86 L40 -60" }, g);
    const t = txt(g, 0, 45, label, 44, { font: "Serif", weight: 700 });
    return { g, t };
  }
  // graphique en barres empilées (versements + intérêts)
  function bars(parent, n, w, h) {
    const g = el("g", {}, parent);
    el("path", { ...D.line, "stroke-width": 4, d: `M${-w / 2} ${-h} L${-w / 2} 0 L${w / 2} 0` }, g);
    const bw = w / n * 0.62, items = [];
    for (let i = 0; i < n; i++) {
      const x = -w / 2 + (i + 0.5) * w / n;
      const a = el("rect", { ...D.line, "stroke-width": 2.5, fill: C.inkSoft, x: x - bw / 2, width: bw }, g);
      const b = el("rect", { ...D.line, "stroke-width": 2.5, fill: C.accent, x: x - bw / 2, width: bw }, g);
      items.push({ a, b });
    }
    return { g, set(i, va, vb) { const it = items[i]; it.a.setAttribute("y", -va); it.a.setAttribute("height", Math.max(0, va));
      it.b.setAttribute("y", -va - vb); it.b.setAttribute("height", Math.max(0, vb)); it.a.style.opacity = va > 0.5 ? 1 : 0; it.b.style.opacity = vb > 0.5 ? 1 : 0; } };
  }
  // courbe de marché (points normalisés 0..1) dans un cadre
  function chart(parent, w, h, pts, o = {}) {
    const g = el("g", {}, parent);
    if (o.frame !== false) el("rect", { ...D.line, "stroke-width": 3, fill: C.face, x: -w / 2, y: -h / 2, width: w, height: h, rx: 10 }, g);
    const P = p => [-w / 2 + 24 + p[0] * (w - 48), h / 2 - 20 - p[1] * (h - 40)];
    const d = pts.map((p, i) => `${i ? "L" : "M"}${P(p)[0].toFixed(1)} ${P(p)[1].toFixed(1)}`).join(" ");
    const line = el("path", { ...D.line, stroke: o.color || C.inkSoft, "stroke-width": o.sw || 5, d }, g);
    return { g, line, P };
  }
  // compteur animé "12 345 €"
  const fmt = v => Math.round(v).toLocaleString("fr-FR").replace(/ | /g, " ");
  // titre de chapitre (en haut à gauche)
  function chapter(parent, num, title) {
    const g = el("g", {}, parent);
    txt(g, 80, 92, num, 22, { anchor: "start", weight: 800, ls: 6, fill: C.accent });
    txt(g, 130, 92, title, 22, { anchor: "start", weight: 700, ls: 6, fill: C.inkSoft });
    return g;
  }
  return { pop, fade, out, place, show, txt, pill, card, coin, stack, envelope, padlock, vault, heart, shield, bank, house, icon, calendar, bars, chart, fmt, chapter };
})();
