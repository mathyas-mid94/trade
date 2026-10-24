// Objets propres à « Le CTO et le PEA » (au-dessus de ../scpi/objets-scpi.js).

// un compte (enveloppe) étiqueté : CTO, PEA…
function compte(parent, label, fill = C.ink, s = 1) {
  const w = el("g", {}, parent), g = el("g", { transform: `scale(${s})` }, w);
  el("rect", { ...D.line, fill, x: -130, y: -90, width: 260, height: 180, rx: 22 }, g);
  el("rect", { ...D.line, "stroke-width": 3, fill: C.paper, x: -100, y: -60, width: 200, height: 26, rx: 13 }, g);
  txt(g, 0, 40, label, 58, { font: "Serif", weight: 700, fill: fill === C.ink || fill === C.inkSoft ? C.paper : C.ink });
  return w;
}
// une action : camembert d'entreprise avec une part détachée (la part = dernier enfant)
function partEntreprise(parent, s = 1) {
  const w = el("g", {}, parent), g = el("g", { transform: `scale(${s})` }, w);
  const r = 80, arc = (a0, a1, fill, p) => { const q = a => `${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`;
    return el("path", { ...D.line, fill, d: `M0 0 L${q(a0)} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${q(a1)} Z` }, p || g); };
  for (let i = 0; i < 5; i++) arc(-Math.PI / 2 + i * Math.PI * 2 / 6, -Math.PI / 2 + (i + 1) * Math.PI * 2 / 6, i % 2 ? C.inkSoft : C.ink);
  const part = el("g", {}, g); arc(-Math.PI / 2 + 5 * Math.PI * 2 / 6, Math.PI * 1.5, C.accent, part);
  return { g: w, part };
}
// un panier (ETF) rempli de pièces
function panier(parent, s = 1) {
  const w = el("g", {}, parent), g = el("g", { transform: `scale(${s})` }, w);
  const items = [[-50, -40, C.accent], [0, -55, C.inkSoft], [50, -40, C.accentSoft], [-25, -70, C.ink], [25, -72, C.accent]].map(([x, y, f]) => {
    const c = el("g", {}, g); el("circle", { ...D.line, fill: f, cx: x, cy: y, r: 30 }, c); return c; });
  el("path", { ...D.line, fill: C.ink, d: "M-110 -30 L110 -30 L85 60 L-85 60 Z" }, g);
  for (const x of [-40, 0, 40]) el("path", { ...D.line, stroke: C.paper, "stroke-width": 5, d: `M${x} -10 L${x * 0.9} 42` }, g);
  return { g: w, items };
}
