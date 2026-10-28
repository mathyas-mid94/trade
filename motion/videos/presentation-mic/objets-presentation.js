// Objets propres à la vidéo de présentation du cabinet : logo MIC, écrans de marché, bureau, transat, échiquier, empire.

// logo MIC (double cercle, MIC en serif, filet)
function logoMIC(parent, r = 120, fond = C.paper, encre = C.ink) {
  const g = el("g", {}, parent);
  el("circle", { fill: fond, stroke: encre, "stroke-width": 3, r }, g);
  el("circle", { fill: "none", stroke: encre, "stroke-width": 1.2, r: r * 0.9 }, g);
  txt(g, 0, r * 0.18, "MIC", r * 0.62, { font: "Serif", weight: 600, fill: encre });
  el("path", { stroke: encre, "stroke-width": 1.5, d: `M${-r * 0.5} ${r * 0.36} L${r * 0.5} ${r * 0.36}` }, g);
  return g;
}
// écran de cotation : bougies qui se dessinent, courbe nerveuse qui se calme ; set(k, calme)
function ecranMarche(parent, w = 360, h = 230, seed = 3) {
  const g = el("g", {}, parent);
  el("rect", { ...D.line, fill: C.ink, x: -w / 2, y: -h / 2, width: w, height: h, rx: 14 }, g);
  el("rect", { fill: "#2E5E57", x: -w / 2 + 14, y: -h / 2 + 14, width: w - 28, height: h - 28, rx: 6 }, g);
  el("path", { ...D.line, "stroke-width": 8, d: `M0 ${h / 2} L0 ${h / 2 + 40} M-50 ${h / 2 + 40} L50 ${h / 2 + 40}` }, g);
  const n = 16, B = []; let s = seed, v = 0.5;
  for (let i = 0; i < n; i++) { s = (s * 1664525 + 1013904223) >>> 0; const o = v; v = Math.max(0.15, Math.min(0.85, v + (s / 4294967296 - 0.47) * 0.3));
    const x = -w / 2 + 30 + i * (w - 60) / n, H = h - 70, up = v >= o, b = el("g", {}, g);
    el("path", { stroke: C.paperDeep, "stroke-width": 2, d: `M${x} ${h / 2 - 30 - (Math.max(o, v) + 0.05) * H} L${x} ${h / 2 - 30 - (Math.min(o, v) - 0.05) * H}` }, b);
    el("rect", { fill: up ? "#9FBDB6" : C.accent, x: x - 5, width: 10, y: h / 2 - 30 - Math.max(o, v) * H, height: Math.max(3, Math.abs(v - o) * H) }, b); B.push(b); }
  const ok = el("g", {}, g); el("circle", { fill: C.accent, r: 26 }, ok); el("path", { ...D.line, stroke: C.ink, "stroke-width": 6, d: "M-11 0 L-3 9 L12 -9" }, ok);
  return { g, B, ok, set(k, kOk = 0) { B.forEach((b, i) => b.style.opacity = k * n > i ? 1 : 0); ok.setAttribute("transform", `translate(${w / 2 - 50} ${-h / 2 + 50}) scale(${kOk})`); ok.style.opacity = kOk > 0.01 ? 1 : 0; } };
}
// bandeau de cours qui défile (noms génériques)
function bandeau(parent, y, w = 1920) {
  const g = el("g", {}, parent);
  el("rect", { fill: "#1B3F3A", x: 0, y: y - 26, width: w, height: 52 }, g);
  const items = ["INDICE EUROPE +0,8 %", "OBLIGATIONS 10 ANS 3,6 %", "OR +0,4 %", "INDICE MONDE +1,1 %", "EUR / USD −0,2 %", "IMMOBILIER COTÉ +0,6 %"];
  const T = items.map((s, i) => txt(g, 0, y + 9, s, 22, { anchor: "start", weight: 800, ls: 3, fill: s.includes("−") ? C.accent : C.accentSoft }));
  return { g, set(t) { const L = 420 * items.length; T.forEach((x, i) => x.setAttribute("x", ((i * 420 - t * 140) % L + L) % L - 300)); } };
}
// bureau avec ordinateur portable
function bureau(parent) {
  const g = el("g", {}, parent);
  el("rect", { ...D.line, fill: C.paperDeep, x: -150, y: -150, width: 300, height: 22, rx: 6 }, g);
  el("path", { ...D.line, "stroke-width": 6, d: "M-130 -128 L-130 0 M130 -128 L130 0" }, g);
  el("path", { ...D.line, fill: C.inkSoft, d: "M-70 -150 L-60 -230 L60 -230 L70 -150 Z" }, g);
  return g;
}
// transat
function transat(parent) {
  const g = el("g", {}, parent);
  el("path", { ...D.line, "stroke-width": 7, d: "M-150 0 L-60 -90 M-60 0 L120 -60 M120 -60 L170 -150 M60 0 L100 -45" }, g);
  el("path", { ...D.line, fill: C.accent, d: "M-140 -12 L120 -72 L170 -160 L182 -150 L130 -58 L-130 4 Z" }, g);
  const par = el("g", { transform: "translate(-220 0)" }, g);
  el("path", { ...D.line, "stroke-width": 5, d: "M0 0 L0 -260" }, par); el("path", { ...D.line, fill: C.accentSoft, d: "M-120 -230 Q0 -330 120 -230 Z" }, par);
  return g;
}
// pièce d'échecs (cavalier stylisé)
function cavalier(parent, fill = C.ink) {
  const g = el("g", {}, parent);
  el("path", { ...D.line, fill, d: "M-46 60 L46 60 L40 40 L-40 40 Z M-30 40 Q-34 0 -6 -20 L-30 -30 Q-36 -60 0 -78 Q36 -80 40 -30 Q42 10 30 40 Z" }, g);
  el("circle", { cx: 6, cy: -50, r: 5, fill: fill === C.ink ? C.paper : C.ink }, g);
  return g;
}
// petit échiquier 4 x 4
function echiquier(parent, c = 70) {
  const g = el("g", {}, parent);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) el("rect", { fill: (i + j) % 2 ? C.paperDeep : C.face, stroke: C.ink, "stroke-width": 2, x: -2 * c + i * c, y: -2 * c + j * c, width: c, height: c }, g);
  return g;
}
// empire : blocs qui s'empilent (sociétés) avec la holding au sommet ; set(k)
function empire(parent) {
  const g = el("g", {}, parent);
  const B = [[-180, 0, "SOCIÉTÉ"], [0, 0, "IMMOBILIER"], [180, 0, "PLACEMENTS"], [-90, -110, ""], [90, -110, ""], [0, -220, "HOLDING"]].map(([x, y, l], i) => {
    const b = el("g", {}, g); el("rect", { ...D.line, fill: i === 5 ? C.ink : i > 2 ? C.accentSoft : C.face, x: -85, y: -100, width: 170, height: 100, rx: 8 }, b);
    if (l) txt(b, 0, -42, l, 20, { weight: 800, ls: 2, fill: i === 5 ? C.paper : C.ink }); return { b, x, y }; });
  return { g, set(k) { B.forEach((o, i) => { const u = ease(prog(k, i * 0.13, i * 0.13 + 0.3)); o.b.setAttribute("transform", `translate(${o.x} ${o.y - 300 * (1 - u)})`); o.b.style.opacity = u > 0 ? 1 : 0; }); } };
}
// gribouillis (perdu) qui se démêle en flèche nette : set(k) de 0 (chaos) à 1 (flèche)
function demele(parent) {
  const g = el("g", {}, parent), p = el("path", { ...D.line, stroke: C.accent, "stroke-width": 6 }, g);
  const N = 60, chaos = Array.from({ length: N + 1 }, (_, i) => [Math.sin(i * 1.7) * 90 + Math.cos(i * 0.6) * 40, Math.cos(i * 2.3) * 60 + Math.sin(i * 0.9) * 30]);
  const ordre = Array.from({ length: N + 1 }, (_, i) => [-140 + i * 280 / N, 40 - i * 80 / N]);
  const tete = el("path", { ...D.line, stroke: C.accent, "stroke-width": 6, d: "M110 -60 L140 -40 L112 -16" }, g);
  return { g, set(k) { const e = ease(k); p.setAttribute("d", chaos.map((c, i) => `${i ? "L" : "M"}${lerp(c[0], ordre[i][0], e).toFixed(1)} ${lerp(c[1], ordre[i][1], e).toFixed(1)}`).join(" ")); tete.style.opacity = e > 0.9 ? 1 : 0; } };
}
// compteur d'euros animé (texte) : renvoie le nœud, à mettre à jour avec defile()
function compteurEuro(parent, x, y, size = 96, fill = C.ink) { return big(parent, x, y, "", size, fill); }
function euros(n) { return Math.round(n).toLocaleString("fr-FR").replace(/[  ]/g, " ") + " €"; }
