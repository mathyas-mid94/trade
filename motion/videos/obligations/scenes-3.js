// Parties 11 à 16 : le spread, la durée, obligations ou actions, les fonds, ce qu'il faut retenir, conclusion.

// ---- 11 · Le spread : le prix de la confiance ----
SC("11", "LE SPREAD", (g, A) => {
  const m = A.m, head = title(g, 190, "Le spread : le prix de la confiance");
  const pc = pl(g, 960, 280, "UNE PRIME EN PLUS DE LA RÉFÉRENCE SANS RISQUE", { size: 20 }), md = pl(g, 960, 340, "POUR UNE MÊME DURÉE", { bg: C.accent, size: 20 });
  const X = 520, W = 520, u = W / 3.6;   // la barre de référence fait 3,60 %
  const rows = [["Allemagne", 0, "3,60 %", 5, 0], ["France", 1.3, "+1,30", 6, 1], ["Entreprise bien notée", 0.8, "≈ +0,8", 8, 2], ["High Yield", 2.66, "≈ +2,9", 9, 3]].map(([n, sp, l, k, i]) => {
    const y = 440 + i * 100, nm = txt(g, X - 30, y + 12, n, 32, { anchor: "end", font: "Serif", weight: 700 });
    const base = el("rect", { ...D.line, "stroke-width": 2, fill: "#9FBDB6", x: X, y: y - 32, height: 64, rx: 10 }, g);
    const bl = txt(g, X + 20, y + 10, i === 0 || i === 1 ? "3,60 %" : "État, même durée", 24, { anchor: "start", weight: 800 });
    const s_ = el("rect", { ...D.line, "stroke-width": 2, fill: C.accent, x: X + W, y: y - 32, height: 64, rx: 10 }, g);
    const sl = txt(g, 0, y + 10, l, 26, { weight: 800 });
    return { nm, base, bl, s_, sl, sp, k, i, y };
  });
  const gros = big(g, 360, 900, "1,30 pt", 72, C.accent), jv = txt(g, 520, 890, "écart France / Allemagne :", 24, { anchor: "start", weight: 600, fill: C.inkSoft }), jv2 = txt(g, 520, 924, "jamais vu depuis 2012", 24, { anchor: "start", weight: 800 });
  const sep = card(g, 620, 130, { fill: C.ink }); txt(sep, 0, -14, "High Yield, fin septembre :", 24, { weight: 600, fill: C.accentSoft });
  const sv = big(sep, 0, 36, "2,66 % → 2,94 %", 44, C.paper);
  const mp = pl(g, 1380, 1010, "ON EST MIEUX PAYÉ…", { size: 20 }), tr = pl(g, 1620, 1010, "… MAIS IL FAUT TRIER", { bg: C.accent, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5) );
    on(pc, pop(t, m(3) - 0.3)); on(md, pop(t, m(4) - 0.3));
    rows.forEach(r => { const kb = ease(prog(t, m(r.i === 0 ? 5 : r.k) - 0.4, m(r.i === 0 ? 5 : r.k) + 0.2));
      r.base.setAttribute("width", W * kb); r.base.style.opacity = kb > 0 ? 1 : 0; show(r.nm, kb); show(r.bl, prog(t, m(r.i === 0 ? 5 : r.k), m(r.i === 0 ? 5 : r.k) + 0.3));
      let sp = r.sp; if (r.i === 3) sp = lerp(2.66, 2.94, ease(prog(t, m(10) - 0.3, m(10) + 0.8)));
      const ks = r.i === 0 ? 0 : ease(prog(t, m(r.k) - 0.1, m(r.k) + 0.6)), w = sp * u * ks;
      r.s_.setAttribute("width", w); r.s_.style.opacity = w > 1 ? 1 : 0;
      r.sl.setAttribute("x", X + W + w / 2); r.sl.style.opacity = ks >= 1 ? 1 : 0; if (r.i === 3 && t > m(10) - 0.3) r.sl.textContent = "≈ +" + sp.toFixed(2).replace(".", ",");
      if (r.i === 0) r.bl.textContent = "3,60 %"; });
    show(gros, fade(t, m(7) - 0.3)); show(jv, fade(t, m(7) - 0.2)); show(jv2, fade(t, m(7)));
    place(sep, 1460, 880, pop(t, m(10) - 0.4));
    on(mp, pop(t, m(11) - 0.3), 0, 0); on(tr, pop(t, m(12) - 0.3));
    mp.g.setAttribute("transform", `translate(1180 1010) scale(${pop(t, m(11) - 0.3)})`); tr.g.setAttribute("transform", `translate(1580 1010) scale(${pop(t, m(12) - 0.3)})`);
  };
});

// ---- 12 · Plus c'est long, plus ça paie… et plus ça bouge ----
SC("12", "LA DURÉE", (g, A) => {
  const m = A.m, head = title(g, 190, "Plus c'est long, plus ça paie… et plus ça bouge");
  const c1 = card(g, 760, 520, { fill: C.face }); txt(c1, -340, -210, "Ce que payait l'État français (printemps 2026)", 24, { anchor: "start", weight: 800 });
  el("path", { ...D.line, stroke: C.inkSoft, "stroke-width": 3, d: "M-320 180 L340 180" }, c1);
  const Px = a => -300 + (a - 5) / 25 * 600, Py = r => 180 - (r - 2.6) * 170;
  const P = [[5, 3.2, "5 ans", 3], [10, 3.83, "10 ans", 4], [15, 4.13, "15 ans", 4], [30, 4.55, "30 ans", 5]];
  const cy = trace(c1, P.map(([a, r]) => [Px(a), Py(r)]), { color: C.ink, dot: C.accent, r: 14 });
  const dots = P.map(([a, r, l]) => ({ d: el("circle", { ...D.line, fill: C.ink, cx: Px(a), cy: Py(r), r: 12 }, c1), t: txt(c1, Px(a), Py(r) - 26, r.toFixed(2).replace(".", ",").replace(/0$/, "") + " %", 24, { weight: 800 }), x: txt(c1, Px(a), 216, l, 22, { weight: 600, fill: C.inkSoft }) }));
  const c2 = card(g, 760, 520, { fill: C.ink }); txt(c2, -340, -210, "Si les taux montent d'un point, le prix bouge de…", 24, { anchor: "start", weight: 800, fill: C.paper });
  const S = [["2 ans", 2, "−2 %", 8], ["10 ans", 8, "≈ −8 %", 9], ["20 ans", 15, "près de −15 %", 10]].map(([a, v, l, k], i) => ({ a: txt(c2, -320, -110 + i * 90, a, 30, { anchor: "start", weight: 800, fill: C.paper }),
    b: el("rect", { ...D.line, "stroke-width": 2, fill: C.accent, x: -180, y: -140 + i * 90, height: 46, rx: 8 }, c2), l: txt(c2, 0, -108 + i * 90, l, 28, { anchor: "start", weight: 800, fill: C.accentSoft }), v, k }));
  const g1 = txt(c2, -320, 170, "Gardé jusqu'au bout : aucun impact.", 28, { anchor: "start", weight: 700, fill: C.paper }), g2 = txt(c2, -320, 214, "Besoin de l'argent avant : ça change tout.", 28, { anchor: "start", weight: 700, fill: C.accent });
  const bouge = pl(g, 1440, 290, "PLUS C'EST LONG, PLUS LE PRIX BOUGE", { bg: C.accentSoft, size: 20 });
  const bd = pl(g, 960, 1000, "LA BONNE DURÉE, C'EST CELLE DE TON PROJET", { bg: C.ink, fg: C.paper, size: 24 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(c1, 520, 600, pop(t, m(2) - 0.4)); place(c2, 1420, 600, pop(t, m(6) - 0.4));
    const kc = t < m(4) ? 0.0001 + 0.3 * ease(prog(t, m(3), m(4))) : t < m(5) ? lerp(0.3, 0.55, ease(prog(t, m(4), m(4) + 0.6))) : lerp(0.55, 1, ease(prog(t, m(5) - 0.4, m(5) + 0.5)));
    cy.set(t > m(3) - 0.3 ? kc : 0);
    dots.forEach((d, i) => { const k = pop(t, m(P[i][3]) - 0.3 + (i === 2 ? 0.7 : 0)); d.d.setAttribute("r", 12 * k); show(d.t, k); show(d.x, fade(t, m(2))); });
    on(bouge, pop(t, m(6) - 0.2) * out(t, m(7) + 0.4));
    S.forEach((s, i) => { const k = ease(prog(t, m(s.k) - 0.3, m(s.k) + 0.5)); s.b.setAttribute("width", s.v * 21 * k); s.b.style.opacity = k > 0 ? 1 : 0;
      s.l.setAttribute("x", -160 + s.v * 21 * k); show(s.l, k); show(s.a, fade(t, m(7) - 0.3)); });
    show(g1, fade(t, m(11) - 0.3)); show(g2, fade(t, m(12) - 0.3)); on(bd, pop(t, m(13) - 0.3));
  };
});

// ---- 13 · Obligations ou actions ? ----
SC("13", "OBLIGATIONS OU ACTIONS ?", (g, A) => {
  const m = A.m, head = title(g, 190, "Obligations ou actions : où est le rendement ?");
  const bal = balance(g);
  const pile = [0, 1, 2].map(i => { const c = coin(bal.pans[0], 30); c.setAttribute("transform", `translate(0 ${130 - i * 20})`); return c; });
  const barres = el("g", { transform: "translate(0 100)" }, bal.pans[1]); [[-30, 30], [0, 50], [30, 74]].forEach(([x, h]) => el("rect", { ...D.line, fill: C.inkSoft, x: x - 12, y: 30 - h, width: 24, height: h, rx: 4 }, barres));
  const lo = pl(g, 0, 0, "OBLIGATION : RENDEMENT CONNU", { bg: C.accentSoft, size: 18 }), la = pl(g, 0, 0, "ACTION : RENDEMENT ESPÉRÉ", { size: 18 });
  const k20 = card(g, 560, 200, { fill: C.face }); txt(k20, -240, -50, "2020", 26, { anchor: "start", weight: 800, fill: C.inkSoft });
  const v20 = big(k20, -240, 30, "≈ 0 %", 74, C.inkSoft); v20.setAttribute("text-anchor", "start"); txt(k20, -240, 76, "prêter à l'État ne rapportait presque rien", 22, { anchor: "start", weight: 600, fill: C.inkSoft });
  const pc = pl(g, 1460, 600, "LES ACTIONS N'AVAIENT PAS DE CONCURRENCE", { size: 18 });
  const k26 = card(g, 560, 200, { fill: C.ink }); txt(k26, -240, -50, "OCTOBRE 2026", 26, { anchor: "start", weight: 800, fill: C.accentSoft });
  const v26 = big(k26, -240, 30, "4,90 %", 74, C.paper); v26.setAttribute("text-anchor", "start"); txt(k26, -240, 76, "l'État français à 10 ans", 22, { anchor: "start", weight: 600, fill: C.accentSoft });
  const q = big(g, 960, 300, "Quand le rendement connu rattrape le rendement espéré…", 40), q2 = txt(g, 960, 350, "… le choix devient vite fait.", 30, { weight: 700, fill: C.accent });
  const n1 = pl(g, 960, 960, "PAS TOUT EN OBLIGATIONS", { size: 22 }), n2 = pl(g, 960, 1020, "UNE VRAIE PLACE DANS UN PATRIMOINE", { bg: C.accent, size: 22 });
  return t => {
    show(head, fade(t, m(1) - 0.5) * out(t, m(8) - 0.6));
    bal.g.setAttribute("transform", `translate(560 900) scale(${0.95 * pop(t, m(1) - 0.3)})`);
    const a = t < m(4) - 0.3 ? 0 : t < m(7) - 0.3 ? 16 * ease(prog(t, m(4) - 0.3, m(5))) : lerp(16, -3, ease(prog(t, m(7) - 0.3, m(9))));
    bal.set(a);
    pile.forEach(c => c.style.opacity = fade(t, m(2) - 0.3)); barres.style.opacity = fade(t, m(3) - 0.3);
    const r = a * Math.PI / 180;
    on(lo, pop(t, m(2) - 0.2), 560 - 300 * Math.cos(r) * 0.95, 900 + (-330 - 300 * Math.sin(r) + 250) * 0.95);
    on(la, pop(t, m(3) - 0.2), 560 + 300 * Math.cos(r) * 0.95, 900 + (-330 + 300 * Math.sin(r) + 250) * 0.95);
    place(k20, 1460, 470, pop(t, m(4) - 0.4) * out(t, m(7) - 0.5)); on(pc, pop(t, m(6) - 0.3) * out(t, m(7) - 0.5));
    place(k26, 1460, 560, pop(t, m(7) - 0.3));
    show(q, fade(t, m(8) - 0.3)); show(q2, fade(t, m(9) - 0.3));
    on(n1, pop(t, m(10) - 0.3)); on(n2, pop(t, m(11) - 0.3));
  };
});

// ---- 14 · Les fonds obligataires ----
SC("14", "LES FONDS OBLIGATAIRES", (g, A) => {
  const m = A.m, head = title(g, 190, "Les fonds obligataires : des dizaines de prêts en un");
  const T = Array.from({ length: 12 }, () => titre(g, 0.55)), fonds = el("g", {}, g);
  el("circle", { ...D.line, fill: C.ink, r: 120 }, fonds); txt(fonds, 0, 12, "FONDS", 34, { weight: 800, ls: 6, fill: C.paper });
  const deux = pl(g, 960, 300, "DEUX GRANDES FAMILLES", { size: 20 });
  const cA = card(g, 800, 600, { fill: C.face }), cB = card(g, 800, 600, { fill: C.face });
  txt(cA, -360, -230, "Fonds daté", 44, { anchor: "start", font: "Serif", weight: 700 }); txt(cB, -360, -230, "Fonds ouvert", 44, { anchor: "start", font: "Serif", weight: 700 });
  const fils = [0, 1, 2, 3, 4].map(i => ({ l: el("path", { ...D.line, stroke: "#9FBDB6", "stroke-width": 5 }, cA), d: el("circle", { ...D.line, fill: i % 2 ? C.accent : C.inkSoft, cx: -300, cy: -140 + i * 45, r: 14 }, cA), y: -140 + i * 45 }));
  const c30 = el("g", { transform: "translate(160 -50)" }, cA); el("circle", { ...D.line, fill: C.ink, r: 54 }, c30); txt(c30, 0, 10, "2030", 30, { weight: 800, fill: C.paper });
  const LA = [["une date de fin connue", 8], ["un rendement estimé dès l'entrée", 9], ["le retour vers 100 à l'échéance", 10]].map(([s, k], i) => ({ c: check(cA, true), t: txt(cA, -270, 100 + i * 56, s, 28, { anchor: "start", weight: 600 }), k, y: 90 + i * 56 }));
  const inf = infini(cB); inf.g.setAttribute("transform", "translate(0 -60)");
  const LB = [["pas de date de fin", 14], ["un gérant qui pilote en continu", 15], ["de la souplesse pour les opportunités", 16]].map(([s, k], i) => ({ t: txt(cB, -300, 100 + i * 56, "• " + s, 28, { anchor: "start", weight: 600 }), k }));
  const ptp = pl(g, 520, 940, "LE PULL TO PAR, À L'ÉCHELLE DU FONDS", { bg: C.accentSoft, size: 18 }), coeur = pl(g, 520, 1000, "CŒUR DE PORTEFEUILLE", { bg: C.ink, fg: C.paper, size: 22 });
  const att = pl(g, 1400, 940, "SANS ÉCHÉANCE : PAS DE RETOUR GARANTI À 100", { bg: C.accent, size: 18 }), tac = pl(g, 1400, 1000, "POCHE TACTIQUE", { bg: C.accentSoft, size: 22 });
  return t => {
    show(head, fade(t, A.s, 0.6));
    const kA = out(t, m(4) - 0.5), kv = ease(prog(t, m(2) - 0.3, m(3) + 0.3));
    T.forEach((ti, i) => { const a0 = i / 12 * Math.PI * 2, x0 = 960 + 520 * Math.cos(a0), y0 = 600 + 300 * Math.sin(a0);
      place(ti.g, lerp(x0, 960, kv), lerp(y0, 600, kv), pop(t, m(1) - 0.4 + i * 0.05) * (1 - kv) * kA); });
    place(fonds, 960, 600, pop(t, m(3) - 0.4) * kA);
    on(deux, pop(t, m(4) - 0.3) * out(t, m(6) - 0.3));
    place(cA, 500, 600, pop(t, m(5) - 0.4)); place(cB, 1420, 600, pop(t, m(13) - 0.4));
    fils.forEach((f, i) => { const k = ease(prog(t, m(6) - 0.3 + i * 0.1, m(7))); f.l.setAttribute("d", `M-300 ${f.y} L${lerp(-300, 110, k)} ${lerp(f.y, -50, k)}`); f.l.style.opacity = k > 0 ? 1 : 0; f.d.style.opacity = fade(t, m(6) - 0.4); });
    c30.setAttribute("transform", `translate(160 -50) scale(${pop(t, m(7) - 0.3)})`);
    LA.forEach(l => { l.c.setAttribute("transform", `translate(-310 ${l.y}) scale(${0.6 * pop(t, m(l.k) - 0.3)})`); show(l.t, fade(t, m(l.k) - 0.3)); });
    on(ptp, pop(t, m(11) - 0.3)); on(coeur, pop(t, m(12) - 0.3));
    inf.set(t); LB.forEach(l => show(l.t, fade(t, m(l.k) - 0.3)));
    on(att, pop(t, m(17) - 0.3)); on(tac, pop(t, m(18) - 0.3));
  };
});

// ---- 15 · Ce qu'il faut retenir (fond sombre) ----
SC("15", "EN RÉSUMÉ", (g, A) => {
  const m = A.m;
  const bg = el("rect", { width: 1920, height: 1080, fill: C.ink }, g); g.insertBefore(bg, g.firstChild);
  const head = big(g, 960, 230, "Ce qu'il faut retenir", 64, C.paper);
  const K = [["obligation", "Un prêt", "coupon et remboursement", "connus à l'avance", 2, 3], ["curve", "Le retour à 100", "le prix bouge, mais revient à 100", "si l'emprunteur rembourse", 4, 5],
             ["bouclier", "Le plancher", "le taux sans risque est la référence,", "le spread paie le risque", 6, 7], ["sablier", "La bonne durée", "plus c'est long, plus ça paie…", "et plus ça bouge", 8, 9]]
    .map(([ic, ti, s1, s2, k1, k2], i) => { const c = card(g, 400, 420, { fill: C.inkSoft }), x = 330 + i * 420;
      const ig = el("g", { transform: "translate(0 -110) scale(0.9)" }, c); el("circle", { fill: C.paper, r: 70 }, ig); D.icons[ic](el("g", { transform: "scale(0.85)" }, ig));
      txt(c, 0, 20, ti, 38, { font: "Serif", weight: 700, fill: C.paper });
      const a = txt(c, 0, 80, s1, 22, { weight: 600, fill: C.accentSoft }), b = txt(c, 0, 112, s2, 22, { weight: 600, fill: C.accentSoft });
      return { c, x, a, b, k1, k2 }; });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    K.forEach(k => { place(k.c, k.x, 600, pop(t, m(k.k1) - 0.4)); show(k.a, fade(t, m(k.k2) - 0.4)); show(k.b, fade(t, m(k.k2) - 0.2)); });
  };
});

// ---- 16 · Conclusion ----
SC("16", "CONCLUSION", (g, A) => {
  const m = A.m;
  const d = de(g), x = el("path", { ...D.line, stroke: C.accent, "stroke-width": 9, d: "M-60 -60 L60 60 M60 -60 L-60 60" }, g), ti = titre(g, 1.6);
  const p1 = txt(g, 560, 690, "ce n'est pas un pari", 30, { weight: 800, ls: 2 }), p2 = txt(g, 1360, 690, "c'est une promesse écrite", 30, { weight: 800, ls: 2, fill: C.accent });
  const q = big(g, 960, 300, "À qui je prête, et pour combien de temps ?", 52);
  const X0 = 360, X1 = 1560, Yv = v => 560 + (100 - v) * 12;
  const ref = el("path", { ...D.line, stroke: C.inkSoft, "stroke-width": 3, "stroke-dasharray": "14 12", d: `M${X0} ${Yv(100)} L${X1} ${Yv(100)}` }, g);
  const c = trace(g, courbeXY(X0, X1, u => Yv(100 - 9 * Math.pow(Math.sin(Math.PI * u), 1.3)), 100), { color: C.ink, dot: C.accent, r: 15 });
  const f1 = big(g, 960, 820, "Un bon emprunteur, une durée adaptée…", 52), f2 = big(g, 960, 910, "… et on garde.", 72, C.accent);
  const me = marcheur(g, { vest: C.accent }, 0.5), cta = pl(g, 1640, 1010, "ON EN PARLE ?", { bg: C.ink, fg: C.paper, size: 24 });
  return t => {
    const kA = out(t, m(3) - 0.6);
    place(d, 560, 540, pop(t, m(1) - 0.4) * kA, 10 * Math.sin(t * 3)); x.setAttribute("transform", `translate(560 540) scale(${pop(t, m(1) + 0.2) * kA})`);
    place(ti.g, 1360, 540, pop(t, m(2) - 0.4) * kA); show(p1, fade(t, m(1)) * kA); show(p2, fade(t, m(2)) * kA);
    show(q, fade(t, m(3) - 0.3) * out(t, m(6) - 0.6));
    ref.style.opacity = fade(t, m(3) - 0.2); c.set(ease(prog(t, m(3), m(5) + 0.4)));
    show(f1, fade(t, m(4) - 0.3)); show(f2, fade(t, m(5) - 0.3));
    me.at(t, [[m(5) + 0.8, 200, 1040]], { armR: -30 }); on(cta, pop(t, m(5) + 1.4));
  };
});
