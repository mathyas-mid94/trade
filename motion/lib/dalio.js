// Briques réutilisables pour le style "How The Economic Machine Works" (Ray Dalio).
// Tout est en SVG ; chaque animation appelle ces helpers puis expose window.render(t).
const D = (() => {
  const NS = "http://www.w3.org/2000/svg";
  const C = {
    paper: "#F3F3E3", ink: "#2F332E", vest: "#B3B7AD", hair: "#A7ABA1",
    money: "#5EE05B", moneyDark: "#2F7D2C", red: "#E0574B", curl: "#D9798F",
    box: "#C9A877", white: "#FFFFFF",
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
  function guy(parent) {
    const g = el("g", {}, parent);
    el("path", { ...line, d: "M-13 -200 C-16 -130 -9 -60 -12 0 L-26 2" }, g);
    el("path", { ...line, d: "M13 -200 C16 -130 11 -60 13 0 L27 2" }, g);
    const armL = el("path", line, g), armR = el("path", line, g);
    el("path", { ...line, fill: C.vest, d: "M0 -308 C50 -308 48 -205 20 -196 L-20 -196 C-48 -205 -50 -308 0 -308 Z" }, g);
    el("path", { ...line, fill: C.white, "stroke-width": 3, d: "M-17 -306 L0 -268 L17 -306" }, g);
    el("circle", { cx: 0, cy: -252, r: 3.5, fill: C.ink }, g);
    el("circle", { cx: 0, cy: -230, r: 3.5, fill: C.ink }, g);
    el("ellipse", { ...line, fill: C.white, cx: 0, cy: -344, rx: 25, ry: 31 }, g);
    el("path", { ...line, fill: C.hair, "stroke-width": 3, d: "M-25 -340 C-30 -386 26 -390 25 -350 C12 -366 -8 -364 -18 -350 C-20 -346 -22 -342 -25 -340 Z" }, g);
    el("path", { ...line, "stroke-width": 3, d: "M10 -340 L15 -339" }, g);
    const arm = (p, side, ang) => {
      const sx = side * 30, sy = -290, L = 115, a = ang * Math.PI / 180;
      const hx = sx + L * Math.cos(a), hy = sy + L * Math.sin(a);
      const mx = (sx + hx) / 2 - 14 * Math.sin(a) * side, my = (sy + hy) / 2 + 14 * Math.cos(a) * side;
      p.setAttribute("d", `M${sx} ${sy} Q${mx} ${my} ${hx} ${hy}`);
      return [hx, hy];
    };
    const o = {
      g, hand: { L: [0, 0], R: [0, 0] },
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
        inner.push(el("path", { fill: "none", stroke: C.moneyDark, "stroke-width": 2.5, d: "M-32 -14 L30 -17 L34 14 L-29 17 Z" }, b));
        const s = el("text", { x: 1, y: 11, "text-anchor": "middle", "font-size": 34, fill: C.moneyDark, "font-family": "Gothic" }, b);
        s.textContent = "$"; inner.push(s);
      }
    }
    return { g, inner };
  }

  // carton (le bien échangé)
  function box(parent) {
    const g = el("g", {}, parent);
    el("path", { ...line, fill: C.box, d: "M-30 -22 L30 -22 L30 26 L-30 26 Z" }, g);
    el("path", { ...line, fill: "#DCC193", d: "M-30 -22 L-20 -36 L40 -36 L30 -22 Z" }, g);
    el("path", { ...line, fill: "#B8955F", d: "M30 -22 L40 -36 L40 12 L30 26 Z" }, g);
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
    el("feColorMatrix", { values: "0 0 0 0 0.35  0 0 0 0 0.35  0 0 0 0 0.3  0 0 0 0.09 0" }, f);
    return el("rect", { width: w, height: h, filter: "url(#grain)", "pointer-events": "none" }, svg);
  }

  return { C, NS, el, clamp, prog, ease, easeOut, back, lerp, drawOn, updateDraws, line, guy, bills, box, curl, arcPt, paper };
})();
