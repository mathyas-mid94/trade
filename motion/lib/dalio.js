// Briques réutilisables pour le style "How The Economic Machine Works" (Ray Dalio).
// Tout est en SVG ; chaque animation appelle ces helpers puis expose window.render(t).
const D = (() => {
  const NS = "http://www.w3.org/2000/svg";
  // Palette MIC (voir brand/mic-palette-reference.webp)
  const C = {
    paper: "#FBF7EC", paperDeep: "#F0E8D2", ink: "#234E48", inkSoft: "#3F6F68",
    accent: "#CAA97A", accentSoft: "#ECE0C5",
    // rôles dans les scènes
    face: "#FFFDF6", vest: "#CAA97A", hair: "#3F6F68",
    money: "#3F6F68", moneyDetail: "#ECE0C5", curl: "#CAA97A",
    box: "#ECE0C5", boxTop: "#F0E8D2", boxSide: "#CAA97A",
  };
  const el = (tag, attrs = {}, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };
  const clamp = x => Math.max(0, Math.min(1, x));
  const prog = (t, a, b) => clamp((t - a) / (b - a));
  const ease = x => x < .5 ? 4*x*x*x : 1 - Math.pow(-2*x + 2, 3) / 2;
  const easeOut = x => 1 - Math.pow(1 - x, 3);
  const back = x => { const c = 1.9; return x <= 0 ? 0 : 1 + (c+1)*Math.pow(x-1,3) + c*Math.pow(x-1,2); };
  const lerp = (a, b, k) => a + (b - a) * k;

  // tracé progressif : register puis D.updateDraws(t)
  const draws = [];
  function drawOn(path, a, b) {
    const len = path.getTotalLength() + 2;
    draws.push({ path, a, b, len });
    return path;
  }
  function updateDraws(t) {
    for (const d of draws) {
      const k = ease(prog(t, d.a, d.b));
      d.path.setAttribute("stroke-dasharray", d.len);
      d.path.setAttribute("stroke-dashoffset", d.len * (1 - k));
      d.path.style.opacity = k > 0 ? 1 : 0;
    }
  }

  const line = { fill: "none", stroke: C.ink, "stroke-width": 4, "stroke-linecap": "round", "stroke-linejoin": "round" };

  // personnage : jambes interminables, gilet gris, tête ovale blanche (pieds en 0,0)
  // opts : { vest: couleur du gilet, hair: "f" pour une coupe longue }
  function guy(parent, opts = {}) {
    const g = el("g", {}, parent);
    el("path", { ...line, d: "M-13 -200 C-16 -130 -9 -60 -12 0 L-26 2" }, g);
    el("path", { ...line, d: "M13 -200 C16 -130 11 -60 13 0 L27 2" }, g);
    const armL = el("path", line, g), armR = el("path", line, g);
    el("path", { ...line, fill: opts.vest || C.vest, d: "M0 -308 C50 -308 48 -205 20 -196 L-20 -196 C-48 -205 -50 -308 0 -308 Z" }, g);
    el("path", { ...line, fill: C.face, "stroke-width": 3, d: "M-17 -306 L0 -268 L17 -306" }, g);
    el("circle", { cx: 0, cy: -252, r: 3.5, fill: C.ink }, g);
    el("circle", { cx: 0, cy: -230, r: 3.5, fill: C.ink }, g);
    el("ellipse", { ...line, fill: C.face, cx: 0, cy: -344, rx: 25, ry: 31 }, g);
    if (opts.hair === "f") el("path", { ...line, fill: C.hair, "stroke-width": 3, d: "M-30 -330 C-36 -392 34 -396 30 -336 L32 -300 Q24 -296 20 -306 L20 -340 C8 -360 -12 -360 -22 -344 L-24 -300 Q-30 -296 -34 -302 Z" }, g);
    else el("path", { ...line, fill: C.hair, "stroke-width": 3, d: "M-25 -340 C-30 -386 26 -390 25 -350 C12 -366 -8 -364 -18 -350 C-20 -346 -22 -342 -25 -340 Z" }, g);
    el("path", { ...line, "stroke-width": 3, d: "M10 -340 L15 -339" }, g);
    const arm = (p, side, ang) => {
      const sx = side * 30, sy = -290, L = 115, a = ang * Math.PI / 180;
      const hx = sx + L * Math.cos(a), hy = sy + L * Math.sin(a);
      const mx = (sx + hx) / 2 - 14 * Math.sin(a) * side, my = (sy + hy) / 2 + 14 * Math.cos(a) * side;
      p.setAttribute("d", `M${sx} ${sy} Q${mx} ${my} ${hx} ${hy}`);
      return [hx, hy];
    };
    const reach = (p, side, x, y, sag = 30) => {
      const sx = side * 30, sy = -290, mx = (sx + x) / 2, my = (sy + y) / 2 + sag;
      p.setAttribute("d", `M${sx} ${sy} Q${mx} ${my} ${x} ${y}`);
    };
    const o = {
      g, armL, armR, hand: { L: [0, 0], R: [0, 0] },
      // bras "élastique" façon Dalio : va chercher un point (coordonnées locales)
      reach(side, x, y, sag) { reach(side < 0 ? armL : armR, side, x, y, sag); return o; },
      pose(angL, angR) { o.hand.L = arm(armL, -1, angL); o.hand.R = arm(armR, 1, angR); return o; },
      place(x, y, s = 1, flip = false, rot = 0) {
        g.setAttribute("transform", `translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})`); return o; },
    };
    return o.pose(105, 75);
  }

  // liasse de billets vert fluo, centrée en 0,0
  function bills(parent, n = 3) {
    const g = el("g", {}, parent), inner = [];
    for (let i = n - 1; i >= 0; i--) {
      const b = el("g", { transform: `translate(0 ${-i * 7})` }, g);
      el("path", { ...line, fill: C.money, d: "M-42 -22 L38 -26 L44 22 L-38 25 Z" }, b);
      if (i === 0) {
        inner.push(el("path", { fill: "none", stroke: C.moneyDetail, "stroke-width": 2.5, d: "M-32 -14 L30 -17 L34 14 L-29 17 Z" }, b));
        const s = el("text", { x: 1, y: 11, "text-anchor": "middle", "font-size": 34, fill: C.moneyDetail, "font-family": "Serif", "font-weight": 600 }, b);
        s.textContent = "$"; inner.push(s);
      }
    }
    return { g, inner };
  }

  // carton (le bien échangé)
  function box(parent) {
    const g = el("g", {}, parent);
    el("path", { ...line, fill: C.box, d: "M-30 -22 L30 -22 L30 26 L-30 26 Z" }, g);
    el("path", { ...line, fill: C.boxTop, d: "M-30 -22 L-20 -36 L40 -36 L30 -22 Z" }, g);
    el("path", { ...line, fill: C.boxSide, d: "M30 -22 L40 -36 L40 12 L30 26 Z" }, g);
    el("path", { ...line, "stroke-width": 3, d: "M-2 -22 L8 -36" }, g);
    return { g };
  }

  // flèche rose en ressort, de p0 à p1, bombée de h
  function curl(parent, p0, p1, h = -60, loops = 5, r = 17) {
    const [x0, y0] = p0, [x1, y1] = p1, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2 + h;
    const B = u => [(1-u)*(1-u)*x0 + 2*(1-u)*u*cx + u*u*x1, (1-u)*(1-u)*y0 + 2*(1-u)*u*cy + u*u*y1];
    let d = "", last, tan;
    const N = 400;
    for (let i = 0; i <= N; i++) {
      const u = i / N, [bx, by] = B(u), [bx2, by2] = B(Math.min(1, u + 0.01)), [bx0, by0] = B(Math.max(0, u - 0.01));
      let tx = bx2 - bx0, ty = by2 - by0; const l = Math.hypot(tx, ty); tx /= l; ty /= l;
      const nx = -ty, ny = tx, ph = 2 * Math.PI * loops * u;
      const env = Math.min(1, Math.min(u, 1 - u) * 7); // boucles serrées, extrémités lisses
      const px = bx - tx * r * Math.sin(ph) * env + nx * r * (1 - Math.cos(ph)) * env;
      const py = by - ty * r * Math.sin(ph) * env + ny * r * (1 - Math.cos(ph)) * env;
      d += (i ? "L" : "M") + px.toFixed(1) + " " + py.toFixed(1);
      last = [px, py]; tan = [tx, ty];
    }
    const ah = (s) => { const a = Math.atan2(tan[1], tan[0]) + Math.PI + s;
      return `${(last[0] + 16 * Math.cos(a)).toFixed(1)} ${(last[1] + 16 * Math.sin(a)).toFixed(1)}`; };
    d += `M${ah(-0.5)} L${last[0].toFixed(1)} ${last[1].toFixed(1)} L${ah(0.5)}`;
    return el("path", { ...line, stroke: C.curl, "stroke-width": 3.5, d }, parent);
  }

  // point sur un arc (pour les objets qui volent d'une main à l'autre)
  const arcPt = (p0, p1, h, u) => {
    const cx = (p0[0] + p1[0]) / 2, cy = (p0[1] + p1[1]) / 2 + h;
    return [(1-u)*(1-u)*p0[0] + 2*(1-u)*u*cx + u*u*p1[0], (1-u)*(1-u)*p0[1] + 2*(1-u)*u*cy + u*u*p1[1]];
  };

  // grain de papier par-dessus tout
  function paper(svg, w = 1920, h = 1080) {
    const defs = el("defs", {}, svg);
    const f = el("filter", { id: "grain", x: 0, y: 0, width: "100%", height: "100%" }, defs);
    el("feTurbulence", { type: "fractalNoise", baseFrequency: 0.9, numOctaves: 2, seed: 3 }, f);
    el("feColorMatrix", { values: "0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0 0.2  0 0 0 0.07 0" }, f);
    return el("rect", { width: w, height: h, filter: "url(#grain)", "pointer-events": "none" }, svg);
  }

  // Logo MIC redessiné en vectoriel (double cercle, "MIC" en serif, filet dessous), centré en cx,cy, rayon R
  function micLogo(parent, cx, cy, R) {
    const k = R / 175, g = el("g", {}, parent);
    const disc = el("circle", { cx, cy, r: R, fill: C.paper }, g);
    const outer = el("circle", { cx, cy, r: R, fill: "none", stroke: C.ink, "stroke-width": 3.2 * k, transform: `rotate(-90 ${cx} ${cy})` }, g);
    const inner = el("circle", { cx, cy, r: R * 165 / 175, fill: "none", stroke: C.ink, "stroke-width": 1.2 * k, transform: `rotate(90 ${cx} ${cy})` }, g);
    const fs = 112 * k, base = cy + 36 * k;
    const meas = el("text", { "font-size": fs, "font-family": "Serif", "font-weight": 500, opacity: 0 }, g);
    meas.textContent = "MIC";
    const W = meas.getComputedTextLength();
    const letters = [..."MIC"].map((ch, i) => {
      const x = cx - W / 2 + meas.getSubStringLength(0, i) + meas.getSubStringLength(i, 1) / 2;
      const t = el("text", { x, y: base, "text-anchor": "middle", "font-size": fs, "font-family": "Serif", "font-weight": 500, fill: C.ink }, g);
      t.textContent = ch; return { t, x, y: base - 35 * k };
    });
    const uy = cy + 62 * k, uw = 96 * k;
    const ruleL = el("path", { fill: "none", stroke: C.ink, "stroke-width": 1.4 * k, d: `M${cx} ${uy} L${cx - uw} ${uy}` }, g);
    const ruleR = el("path", { fill: "none", stroke: C.ink, "stroke-width": 1.4 * k, d: `M${cx} ${uy} L${cx + uw} ${uy}` }, g);
    return { g, disc, outer, inner, letters, ruleL, ruleR };
  }

  // Icônes "patrimoine" (env. 130 px, centrées en 0,0)
  const icons = {
    house(parent) {
      const g = el("g", {}, parent);
      el("path", { ...line, fill: C.paperDeep, d: "M-48 -5 L48 -5 L48 60 L-48 60 Z" }, g);
      el("path", { ...line, fill: C.accent, d: "M-62 0 L0 -58 L62 0 Z" }, g);
      el("path", { ...line, fill: C.inkSoft, d: "M-12 60 L-12 22 L12 22 L12 60" }, g);
      el("path", { ...line, fill: C.face, d: "M22 12 L40 12 L40 30 L22 30 Z" }, g);
      el("path", { ...line, d: "M28 -38 L28 -60 L40 -60 L40 -27" }, g);
      return g;
    },
    pie(parent) {
      const g = el("g", {}, parent), r = 60;
      const arc = (a0, a1, fill) => {
        const p = a => `${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`;
        el("path", { ...line, fill, d: `M0 0 L${p(a0)} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${p(a1)} Z` }, g);
      };
      const T = Math.PI * 2, s0 = -Math.PI / 2;
      arc(s0, s0 + T * 0.5, C.inkSoft); arc(s0 + T * 0.5, s0 + T * 0.8, C.accent); arc(s0 + T * 0.8, s0 + T, C.accentSoft);
      return g;
    },
    coins(parent) {
      const g = el("g", {}, parent);
      for (let i = 0; i < 5; i++) {
        const y = 45 - i * 20, x = (i % 2 ? 4 : -3);
        el("path", { ...line, fill: C.accent, d: `M${x - 46} ${y} L${x - 46} ${y + 12} A46 14 0 0 0 ${x + 46} ${y + 12} L${x + 46} ${y}` }, g);
        el("ellipse", { ...line, fill: C.accentSoft, cx: x, cy: y, rx: 46, ry: 14 }, g);
      }
      return g;
    },
    contract(parent) {
      const g = el("g", {}, parent);
      el("path", { ...line, fill: C.face, d: "M-45 -62 L25 -62 L45 -42 L45 62 L-45 62 Z" }, g);
      el("path", { ...line, fill: C.paperDeep, d: "M25 -62 L25 -42 L45 -42" }, g);
      for (const y of [-35, -18, -1, 16]) el("path", { ...line, "stroke-width": 3, stroke: C.inkSoft, d: `M-30 ${y} L${y < 0 ? 28 : 15} ${y}` }, g);
      el("path", { ...line, "stroke-width": 3, d: "M-30 42 C-22 28 -16 52 -8 38 C-2 30 4 46 12 40" }, g);
      el("circle", { ...line, fill: C.accent, cx: 28, cy: 42, r: 13 }, g);
      return g;
    },
    percent(parent) {   // taux d'imposition qui baisse
      const g = el("g", {}, parent);
      el("path", { ...line, fill: C.paperDeep, d: "M-52 -56 L52 -56 L52 56 L-52 56 Z" }, g);
      const t = el("text", { x: -8, y: 30, "text-anchor": "middle", "font-family": "Serif", "font-weight": 600, "font-size": 92, fill: C.ink }, g);
      t.textContent = "%";
      el("path", { ...line, stroke: C.accent, "stroke-width": 7, d: "M36 -36 L36 34 M22 20 L36 36 L50 20" }, g);
      return g;
    },
    receipt(parent) {   // ticket de caisse (dépenses)
      const g = el("g", {}, parent);
      let zz = ""; for (let i = 0; i <= 8; i++) zz += ` L${(40 - i * 10).toFixed(0)} ${i % 2 ? 50 : 60}`;
      el("path", { ...line, fill: C.face, d: `M-40 -62 L40 -62 L40 60${zz} Z` }, g);
      for (const [y, w] of [[-42, 50], [-26, 40], [-10, 50], [6, 32]]) el("path", { ...line, "stroke-width": 3, stroke: C.inkSoft, d: `M-26 ${y} L${-26 + w} ${y}` }, g);
      el("path", { ...line, "stroke-width": 3, d: "M-26 24 L26 24" }, g);
      const t = el("text", { x: 22, y: 45, "text-anchor": "middle", "font-family": "Serif", "font-weight": 700, "font-size": 26, fill: C.ink }, g);
      t.textContent = "€";
      return g;
    },
    piggy(parent) {     // tirelire (épargne)
      const g = el("g", {}, parent);
      el("path", { ...line, d: "M-56 -2 C-74 -6 -76 -24 -64 -26" }, g);                         // queue
      el("path", { ...line, fill: C.accent, d: "M-24 32 L-24 52 L-8 52 L-8 34 Z M14 34 L14 52 L30 52 L30 32 Z" }, g);
      el("ellipse", { ...line, fill: C.accent, cx: 0, cy: 0, rx: 58, ry: 42 }, g);
      el("path", { ...line, fill: C.accent, d: "M-6 -38 L4 -62 L20 -36 Z" }, g);              // oreille
      el("path", { ...line, fill: C.accentSoft, d: "M52 -14 Q72 -14 72 2 Q72 18 52 16 Z" }, g); // groin
      el("circle", { cx: 30, cy: -12, r: 4.5, fill: C.ink }, g);
      el("path", { ...line, "stroke-width": 5, d: "M-18 -30 L10 -30" }, g);                     // fente
      const c = el("g", {}, g);                                                                  // pièce au-dessus
      el("ellipse", { ...line, fill: C.accentSoft, cx: -4, cy: -58, rx: 16, ry: 6 }, c);
      return g;
    },
    curve(parent) {
      const g = el("g", {}, parent);
      el("path", { ...line, fill: C.paperDeep, d: "M-58 -52 L58 -52 L58 52 L-58 52 Z" }, g);
      el("path", { ...line, stroke: C.inkSoft, "stroke-width": 5, d: "M-42 32 L-18 8 L0 20 L22 -14 L40 -30" }, g);
      el("path", { ...line, stroke: C.inkSoft, "stroke-width": 5, d: "M26 -32 L41 -31 L40 -16" }, g);
      return g;
    },
  };

  // Loupe : verre de rayon r, manche vers le bas-gauche. Centre du verre en 0,0.
  function magnifier(parent, r = 110) {
    const g = el("g", {}, parent);
    const a = Math.PI * 0.75, x0 = (r + 4) * Math.cos(a), y0 = (r + 4) * Math.sin(a), L = 150;
    const x1 = x0 + L * Math.cos(a), y1 = y0 + L * Math.sin(a);
    el("path", { ...line, stroke: C.ink, "stroke-width": 30, d: `M${x0} ${y0} L${x1} ${y1}` }, g);
    el("path", { ...line, stroke: C.accent, "stroke-width": 20, d: `M${x0 + 12 * Math.cos(a)} ${y0 + 12 * Math.sin(a)} L${x1} ${y1}` }, g);
    const ring = el("circle", { ...line, "stroke-width": 9, cx: 0, cy: 0, r }, g);
    const glint = el("path", { ...line, stroke: C.face, "stroke-width": 6, d: `M${-r * 0.62} ${-r * 0.2} A${r * 0.65} ${r * 0.65} 0 0 1 ${-r * 0.2} ${-r * 0.62}` }, g);
    return { g, ring, glint, r, handleEnd: [x1, y1] };
  }

  return { icons, magnifier, micLogo, C, NS, el, clamp, prog, ease, easeOut, back, lerp, drawOn, updateDraws, line, guy, bills, box, curl, arcPt, paper };
})();
