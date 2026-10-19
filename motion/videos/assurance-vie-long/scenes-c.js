// Chapitres 10:35 → 18:05

// ---- Les frais : en banque, ils pèsent sur la performance ----
SC(635, "11", "LES FRAIS", (g, at) => {
  const bk = bank(g, "BANQUE", 300);
  const env = envelope(g, "");
  const weights = [0, 1, 2].map(i => { const w = el("g", {}, g); el("path", { ...D.line, "stroke-width": 4, d: "M0 -70 L0 -30" }, w);
    el("path", { ...D.line, fill: C.inkSoft, d: "M-40 -30 L40 -30 L56 40 L-56 40 Z" }, w); txt(w, 0, 20, "FRAIS", 20, { weight: 800, ls: 3, fill: C.paper }); return w; });
  const W = 820, H = 420;
  const P = (f) => { const a = []; for (let i = 0; i <= 20; i++) a.push([i / 20, Math.min(0.95, (Math.pow(1.06 - f, i) - 1) / (Math.pow(1.06, 20) - 1) * 0.85 + 0.05)]); return a; };
  const c1 = chart(g, W, H, P(0), { color: C.accent, sw: 6 }), c2 = chart(g, W, H, P(0.025), { color: C.inkSoft, sw: 6, frame: false });
  draw(c1.line, 647.4, 649.6); draw(c2.line, 648.4, 650.6);
  const l1 = pill(g, 1550, 400, "FRAIS BAS", { bg: C.accent, size: 22 }), l2 = pill(g, 1550, 700, "FRAIS ÉLEVÉS", { bg: C.face, size: 22 });
  const pol = title(g, 960, "Une politique de frais simple et claire.", 52);
  return t => {
    const p1 = out(t, 646.6, 0.5);
    place(bk, 700, 560, pop(t, 640.4) * p1); env.setOpen(0); place(env.g, 1250, 600 + 30 * ease(prog(t, 643, 645)), pop(t, 641.0) * 0.55 * p1);
    weights.forEach((w, i) => place(w, 1120 + i * 130, 830 + 30 * ease(prog(t, 643, 645)), pop(t, 642.4 + i * 0.4) * p1));
    const p2 = t > 646.6;
    place(c1.g, 1010, 560, p2 ? pop(t, 646.8) : 0); place(c2.g, 1010, 560, p2 && t > 648.4 ? 1 : 0);
    place(l1.g, l1.x, l1.y, p2 ? pop(t, 649.8) : 0); place(l2.g, l2.x, l2.y, p2 ? pop(t, 650.8) : 0);
    show(pol, fade(t, 653.6));
  };
});

// ---- La politique de frais MIC ----
SC(656, "11", "LA POLITIQUE DE FRAIS MIC", (g, at) => {
  const logo = el("g", {}, g); const M = D.micLogo(logo, 0, 0, 120);
  const list = [["Gestion libre ou pilotée", 665.2], ["Conseil en allocation sur-mesure", 667.6], ["Assistance fiscale et administrative", 670.0]].map(([s, a], i) => {
    const r = el("g", {}, g); const c = check(r); c.setAttribute("transform", "scale(0.8)"); txt(r, 50, 11, s, 34, { anchor: "start", font: "Serif", weight: 600 }); return { r, a, y: 340 + i * 90 };
  });
  const zeros = [["0 %", "DE FRAIS D'ENTRÉE", 675.2], ["0 %", "DE FRAIS DE DOSSIER", 676.0], ["0 %", "DE FRAIS D'ARBITRAGE", 676.8]].map(([a1, a2, a], i) => {
    const c = card(g, 380, 190, { fill: C.accentSoft }); txt(c, 0, 10, a1, 72, { font: "Serif", weight: 600 }); txt(c, 0, 60, a2, 20, { weight: 800, ls: 4, fill: C.inkSoft }); return { c, a, x: 540 + i * 420 };
  });
  return t => {
    M.letters.forEach(L => { L.t.style.opacity = 1; }); M.outer.style.opacity = 1; M.inner.style.opacity = 1;
    place(logo, 360, 460, pop(t, 657.4) * 1.0);
    list.forEach(l => place(l.r, 640, l.y, pop(t, l.a)));
    zeros.forEach(z => place(z.c, z.x, 850, pop(t, z.a)));
  };
});

// ---- Les frais de gestion : le plus juste ----
SC(678, "11", "LES FRAIS DE GESTION", (g, at) => {
  const one = title(g, 230, "1 % de frais de gestion", 70);
  const why = txt(g, 960, 300, "le frais le plus juste : il rémunère la gestion qui crée la performance", 28, { weight: 500, fill: C.inkSoft });
  const barG = el("g", {}, g);
  const gross = el("rect", { ...D.line, fill: C.accent, x: 0, y: -60, height: 120, rx: 14 }, barG);
  const fee = el("rect", { ...D.line, fill: C.inkSoft, y: -60, height: 120, rx: 14 }, barG);
  const lg = txt(barG, 0, 14, "", 44, { font: "Serif", weight: 700 }), lf = txt(barG, 0, 14, "1 %", 36, { font: "Serif", weight: 700, fill: C.paper });
  const net = pill(g, 960, 760, "9 % NETS POUR VOUS", { bg: C.accent, size: 30 });
  const split = el("g", {}, g);
  const sA = el("rect", { ...D.line, fill: C.inkSoft, x: -400, y: -50, width: 400, height: 100, rx: 12 }, split), sB = el("rect", { ...D.line, fill: C.accentSoft, x: 0, y: -50, width: 400, height: 100, rx: 12 }, split);
  txt(split, -200, 12, "ASSUREUR", 26, { weight: 800, ls: 6, fill: C.paper }); txt(split, 200, 12, "CONSEILLER · 0,5 à 0,8 %", 22, { weight: 800, ls: 3 });
  const split1 = txt(g, 960, 840, "LE 1 % SE PARTAGE", 24, { weight: 800, ls: 6, fill: C.inkSoft });
  return t => {
    show(one, fade(t, 679.0)); show(why, fade(t, 682.4));
    const p1 = out(t, 697.6, 0.5);
    const W = 1000 * ease(prog(t, 690.2, 691.6)), fk = ease(prog(t, 692.6, 693.6));
    gross.setAttribute("width", W); fee.setAttribute("width", 100 * fk); fee.setAttribute("x", W - 100 * fk); fee.style.opacity = fk > 0 ? 1 : 0;
    lg.textContent = fk > 0.5 ? "9 %" : "10 %"; lg.setAttribute("x", (W - 100 * fk) / 2); lf.setAttribute("x", W - 50); lf.style.opacity = fk;
    lg.style.opacity = W > 200 ? 1 : 0; place(barG, 460, 560, p1 * (W > 1 ? 1 : 0));
    place(net.g, net.x, net.y, pop(t, 694.6) * p1);
    place(split, 960, 600, pop(t, 699.0)); split.style.opacity = t > 698.4 ? 1 : 0; show(split1, t > 698.4 ? fade(t, 699.4) : 0);
  };
});

// ---- Un réseau d'assureurs ----
SC(710, "12", "UN RÉSEAU D'ASSUREURS", (g, at) => {
  const logo = el("g", {}, g); D.micLogo(logo, 0, 0, 110);
  const nodes = []; const N = 8;
  for (let i = 0; i < N; i++) {
    const a = -Math.PI / 2 + i / N * Math.PI * 2, x = 960 + 560 * Math.cos(a), y = 540 + 330 * Math.sin(a);
    const l = el("path", { ...D.line, stroke: C.accent, "stroke-width": 4, "stroke-dasharray": "10 10", d: `M${960 + 140 * Math.cos(a)} ${540 + 130 * Math.sin(a)} L${x} ${y}` }, g);
    draw(l, 711.4 + i * 0.12, 712.2 + i * 0.12);
    const b = bank(g, "", 150); nodes.push({ b, x, y, a: 711.0 + i * 0.12 });
  }
  g.appendChild(logo);
  const code = pill(g, 960, 980, "CODE DES ASSURANCES ≠ CODE BANCAIRE", { bg: C.face, size: 22 });
  const lux = pill(g, 960, 120, "CONTRATS LUXEMBOURGEOIS AUSSI", { bg: C.accentSoft, size: 22 });
  const isr = el("g", {}, g); el("path", { ...D.line, fill: C.accent, d: "M0 40 C-60 10 -50 -60 30 -60 C40 0 20 40 0 40 Z M0 40 L-10 70" }, isr);
  const isrL = pill(g, 1500, 980, "INVESTISSEMENT RESPONSABLE", { bg: C.accent, size: 22 });
  return t => {
    place(logo, 960, 540, pop(t, 710.4, 0.5));
    nodes.forEach(n => place(n.b, n.x, n.y + 30, pop(t, n.a) * 0.42));
    place(code.g, code.x, code.y, pop(t, 715.6) * out(t, 744.6)); place(lux.g, lux.x, lux.y, pop(t, 713.0));
    place(isr, 1500, 860, pop(t, 747.0) * 1.0); place(isrL.g, isrL.x, isrL.y, pop(t, 747.4));
  };
});

// ---- Deux façons d'investir : le versement unique ----
const MKT = (() => { const a = []; let v = 0.12; const r = [0, -0.08, 0.05, 0.1, -0.04, 0.08, 0.12, -0.1, 0.06, 0.1, 0.04, -0.06, 0.12, 0.08, 0.1, -0.05, 0.09, 0.07];
  r.forEach((d, i) => { v = Math.max(0.05, Math.min(0.95, v + d * 0.5 + 0.015)); a.push([i / (r.length - 1), v]); }); return a; })();
SC(752, "13", "DEUX FAÇONS D'INVESTIR · LE VERSEMENT UNIQUE", (g, at) => {
  const head = title(g, 200, "Deux façons d'investir", 64);
  const cards2 = [["VERSEMENT UNIQUE", "LUMP SUM", 759.4, 560], ["VERSEMENTS PROGRAMMÉS", "DCA", 761.4, 1360]].map(([a, b, tt, x]) => {
    const c = card(g, 620, 200); txt(c, 0, -10, a, 34, { weight: 800, ls: 5 }); txt(c, 0, 50, b, 28, { weight: 700, ls: 8, fill: C.accent }); return { c, tt, x };
  });
  const ch = chart(g, 1100, 520, MKT, { color: C.inkSoft, sw: 6 }); draw(ch.line, 766.6, 770.0);
  const big = K.stack(g, 7, 50);
  const day1 = pill(g, 960, 230, "TOUT LE CAPITAL TRAVAILLE DÈS LE 1er JOUR", { bg: C.accent, size: 24 });
  const dipP = ch.P(MKT[1]); const dip = el("circle", { fill: "none", stroke: C.accent, "stroke-width": 7, r: 60 }, g);
  const risk = pill(g, 960, 320, "RISQUE D'ENTRER JUSTE AVANT UNE BAISSE", { bg: C.face, size: 22 });
  const lt = pill(g, 1350, 320, "SUR LE LONG TERME : GAGNANT", { bg: C.accentSoft, size: 22 });
  const hum = txt(g, 960, 980, "L'être humain innove, se réinvente… et les marchés suivent.", 38, { font: "Serif", weight: 500, fill: C.inkSoft });
  return t => {
    const p1 = out(t, 764.6, 0.5);
    show(head, fade(t, 755.4) * p1); cards2.forEach(c => place(c.c, c.x, 560, pop(t, c.tt) * p1));
    const p2 = t > 764.6;
    place(ch.g, 960, 620, p2 ? pop(t, 765.0, 0.5) : 0);
    const P0 = ch.P(MKT[0]); const u = prog(t, 768.6, 769.4);
    place(big, 960 + P0[0], lerp(200, 620 + P0[1] - 10, ease(u)), p2 ? pop(t, 767.8) * (t < 775 ? 1 : out(t, 775)) * 0.8 : 0);
    place(day1.g, day1.x, day1.y, p2 ? pop(t, 775.6) * out(t, 780.6) : 0);
    place(dip, 960 + dipP[0], 620 + dipP[1], p2 ? pop(t, 781.0) : 0); place(risk.g, risk.x, risk.y, p2 ? pop(t, 781.4) * out(t, 787.6) : 0);
    place(lt.g, lt.x, lt.y, p2 ? pop(t, 788.6) : 0); show(hum, p2 ? fade(t, 794.6) : 0);
  };
});

// ---- Les versements programmés (DCA) ----
SC(805, "13", "DEUX FAÇONS D'INVESTIR · LE DCA", (g, at) => {
  const ch = chart(g, 1100, 520, MKT, { color: C.inkSoft, sw: 6 });
  const coins = MKT.map(p => coin(g, 22));
  const lbl = pill(g, 960, 230, "LE MÊME MONTANT, À INTERVALLES RÉGULIERS", { bg: C.accent, size: 24 });
  const a1 = pill(g, 700, 320, "PRIX D'ACHAT LISSÉ", { bg: C.accentSoft, size: 22 }), a2 = pill(g, 1220, 320, "MOINS D'IMPACT DES BAISSES", { bg: C.accentSoft, size: 22 });
  const vs = el("g", {}, g);
  const L = card(vs, 520, 240), R = card(vs, 520, 240, { fill: C.accentSoft });
  txt(L, 0, -40, "LUMP SUM", 34, { weight: 800, ls: 6 }); txt(L, 0, 30, "un peu plus rentable", 30, { font: "Serif", weight: 600 }); txt(L, 0, 76, "statistiquement", 22, { weight: 500, fill: C.inkSoft });
  txt(R, 0, -40, "DCA", 34, { weight: 800, ls: 6 }); txt(R, 0, 30, "plus serein", 30, { font: "Serif", weight: 600 }); txt(R, 0, 76, "lisse les baisses", 22, { weight: 500, fill: C.inkSoft });
  const vsT = txt(vs, 0, 16, "VS", 44, { weight: 900, fill: C.accent });
  const mix = el("g", {}, g);
  const cq = calendar(mix, "3 mois"); const cm = calendar(mix, "1 mois");
  const mL = txt(mix, 0, 0, "", 1); const plus = txt(mix, 0, 30, "+", 80, { font: "Serif", weight: 600 });
  const mt = txt(g, 960, 260, "Le meilleur des deux ?", 60, { font: "Serif", weight: 500 });
  const mlab = [pill(g, 700, 820, "LUMP SUM TRIMESTRIEL", { bg: C.face, size: 22 }), pill(g, 1220, 820, "DCA MENSUEL", { bg: C.accent, size: 22 })];
  return t => {
    const p1 = out(t, 829.6, 0.5);
    place(ch.g, 960, 620, pop(t, 805.4, 0.5) * p1); ch.line.style.opacity = 1;
    coins.forEach((c, i) => { const P = ch.P(MKT[i]); const a = 808.0 + i * 0.6, u = prog(t, a, a + 0.4);
      place(c, 960 + P[0], lerp(300, 620 + P[1] - 14, ease(u)), (u > 0 ? 1 : 0) * p1); });
    place(lbl.g, lbl.x, lbl.y, pop(t, 807.6) * p1);
    place(a1.g, a1.x, a1.y, pop(t, 821.4) * p1); place(a2.g, a2.x, a2.y, pop(t, 826.6) * p1);
    const p2 = t > 829.6 && t < 839.6;
    place(L, -300, 0, p2 ? pop(t, 830.4) : 0); place(R, 300, 0, p2 ? pop(t, 830.8) : 0); place(vs, 960, 560, p2 ? 1 : 0);
    vsT.style.opacity = p2 ? fade(t, 831.2) : 0;
    const p3 = t > 839.6;
    show(mt, p3 ? fade(t, 840.0) : 0);
    place(cq.g, -260, 0, p3 ? pop(t, 842.0) : 0); place(cm.g, 260, 0, p3 ? pop(t, 843.4) : 0); place(mix, 960, 560, p3 ? 1 : 0);
    plus.style.opacity = p3 ? fade(t, 842.6) : 0;
    mlab.forEach((m, i) => place(m.g, m.x, m.y, p3 ? pop(t, 842.4 + i * 1.2) : 0));
  };
});

// ---- Votre profil investisseur ----
SC(849, "14", "VOTRE PROFIL INVESTISSEUR", (g, at) => {
  const head = title(g, 190, "Une gestion à votre mesure", 60);
  const test = pill(g, 960, 270, "TEST DE PROFIL INVESTISSEUR SUR LE SITE MIC", { bg: C.face, size: 20 });
  const P = [["PRUDENT", "Privilégier la stabilité", 70, "2/7", "3 ans et +", 855.6], ["ÉQUILIBRÉ", "Chercher le juste milieu", 50, "3/7", "5 ans et +", 856.4], ["DYNAMIQUE", "Viser la performance", 20, "5/7", "8 ans et +", 857.2]].map(([n, d, eur, sri, hz, a], i) => {
    const c = card(g, 480, 500, { fill: i === 2 ? C.accentSoft : C.face });
    txt(c, 0, -190, n, 36, { weight: 800, ls: 6 }); txt(c, 0, -148, d, 24, { font: "Serif", weight: 600, fill: C.inkSoft });
    const wiggle = []; for (let k = 0; k <= 30; k++) wiggle.push([k / 30, 0.45 + 0.08 * k / 30 + Math.sin(k * 1.7) * (0.04 + 0.12 * i) * 0.8]);
    const ch = chart(c, 400, 130, wiggle, { color: C.inkSoft, sw: 4, frame: false }); ch.g.setAttribute("transform", "translate(0 -50)");
    el("rect", { ...D.line, "stroke-width": 3, fill: C.inkSoft, x: -180, y: 40, width: 360 * eur / 100, height: 30, rx: 6 }, c);
    el("rect", { ...D.line, "stroke-width": 3, fill: C.accent, x: -180 + 360 * eur / 100, y: 40, width: 360 * (100 - eur) / 100, height: 30, rx: 6 }, c);
    txt(c, 0, 110, `${eur} % fonds euros · ${100 - eur} % UC`, 22, { weight: 700 });
    txt(c, 0, 160, `Risque (SRI) ${sri}`, 22, { weight: 600, fill: C.inkSoft }); txt(c, 0, 200, `Horizon ${hz}`, 22, { weight: 600, fill: C.inkSoft });
    return { c, a, x: 440 + i * 520 };
  });
  return t => { show(head, fade(t, 849.4)); place(test.g, test.x, test.y, pop(t, 852.4)); P.forEach(p => place(p.c, p.x, 640, pop(t, p.a, 0.5))); };
});

// ---- Modes de gestion ----
SC(876, "14", "DÉLÉGUER OU GARDER LA MAIN ?", (g, at) => {
  const head = title(g, 190, "Déléguer ou garder la main ?", 60);
  const M = [["GESTION PILOTÉE", "par l'assureur", 878.6], ["GESTION SOUS MANDAT", "une gestion dédiée", 880.6], ["GESTION LIBRE", "vous gardez la main", 895.4]].map(([n, d, a], i) => {
    const c = card(g, 500, 300, { fill: i === 2 ? C.accentSoft : C.face }); txt(c, 0, -30, n, 32, { weight: 800, ls: 4 }); txt(c, 0, 20, d, 28, { font: "Serif", weight: 600, fill: C.inkSoft });
    return { c, a, x: 420 + i * 540 };
  });
  const me = person(g, MATHYAS); const bub = el("g", {}, g);
  el("path", { ...D.line, fill: C.face, d: "M-150 -60 L150 -60 Q170 -60 170 -40 L170 30 Q170 50 150 50 L-30 50 L-60 85 L-55 50 L-150 50 Q-170 50 -170 30 L-170 -40 Q-170 -60 -150 -60 Z" }, bub);
  txt(bub, 0, 8, "je vous conseille", 30, { font: "Serif", weight: 600 });
  const cool = pill(g, 1500, 960, "DEMANDE DU TEMPS ET DU SANG-FROID", { bg: C.face, size: 20 });
  return t => {
    show(head, fade(t, 876.4)); M.forEach(m => place(m.c, m.x, 560, pop(t, m.a, 0.5)));
    me.g.style.opacity = 0; place(bub, 1500, 800, pop(t, 900.8));
    place(cool.g, cool.x, cool.y, pop(t, 906.6));
  };
});

// ---- S&P 500 ----
SC(914, "15", "LE CAP : LE S&P 500", (g, at) => {
  const R = [32.42, -4.91, 21.55, 22.56, 6.27, 31.73, 18.67, 5.25, 16.61, 31.69, -3.10, 30.47, 7.62, 10.08, 1.32, 37.58, 22.96, 33.36, 28.58, 21.04, -9.10, -11.89, -22.10, 28.68, 10.88, 4.91, 15.79, 5.49, -37.00, 26.46, 15.06, 2.11, 16.00, 32.39, 13.69, 1.38, 11.96, 21.83, -4.38, 31.49, 18.40, 28.71, -18.11, 26.29, 25.02];
  const vals = [100]; R.forEach(r => vals.push(vals[vals.length - 1] * (1 + r / 100)));
  vals.push(20213);   // fin 2025, valeur de la slide
  const lo = Math.log10(100), hi = Math.log10(25000);
  const pts = vals.map((v, i) => [i / (vals.length - 1), (Math.log10(v) - lo) / (hi - lo)]);
  const grid = el("g", {}, g);
  const tiles = []; for (let i = 0; i < 100; i++) { const b = el("rect", { ...D.line, "stroke-width": 2, fill: i % 7 === 0 ? C.accent : (i % 3 ? C.paperDeep : C.inkSoft), width: 46, height: 46 + (i * 37 % 40), rx: 4 }, grid); tiles.push(b); }
  const big5 = title(g, 200, "Les 500 plus grandes entreprises américaines", 54);
  const ch = chart(g, 1400, 600, pts, { color: C.accent, sw: 6 }); draw(ch.line, 933.6, 938.6);
  const W = 1400, H = 600, X = 960, Y = 590;
  const yl = [100, 1000, 10000].map(v => { const y = ch.P([0, (Math.log10(v) - lo) / (hi - lo)])[1]; const tt = txt(ch.g, -W / 2 + 60, y - 8, fmt(v), 20, { anchor: "start", weight: 600, fill: C.inkSoft }); return tt; });
  const xl = [1980, 1990, 2000, 2010, 2020].map(yr => txt(ch.g, ch.P([(yr - 1979) / (vals.length - 1), 0])[0], H / 2 + 34, String(yr), 20, { weight: 600, fill: C.inkSoft }));
  const pct = pill(g, 1500, 220, "≈ 12,2 % PAR AN EN MOYENNE", { bg: C.accent, size: 26 });
  const crash = [[2002, "−38 %", 949.6], [2008, "−37 %", 951.0]].map(([yr, s, a]) => { const i = yr - 1979, P = ch.P(pts[i]); return { p: pill(g, X + P[0], Y + P[1] + 120, s, { bg: C.face, size: 22 }), a }; });
  const up = txt(g, 960, 1010, "Malgré les crises, on finit toujours par se relever.", 38, { font: "Serif", weight: 500, fill: C.inkSoft });
  const note = txt(g, 960, 1060, "S&P 500 dividendes réinvestis, en dollars, échelle logarithmique. Les performances passées ne préjugent pas des performances futures.", 16, { weight: 500, fill: C.inkSoft });
  return t => {
    const p1 = out(t, 932.6, 0.5);
    show(big5, fade(t, 922.4) * p1);
    tiles.forEach((b, i) => { const x = 360 + (i % 20) * 62, y = 480 + Math.floor(i / 20) * 90; const k = pop(t, 919.0 + i * 0.02) * p1;
      b.setAttribute("x", x - 23); b.setAttribute("y", y - b.getAttribute("height") / 2); b.style.opacity = k > 0 ? 1 : 0; b.setAttribute("transform", `translate(${x} ${y}) scale(${k}) translate(${-x} ${-y})`); });
    const p2 = t > 932.6;
    place(ch.g, X, Y, p2 ? pop(t, 933.0, 0.5) : 0);
    place(pct.g, pct.x, pct.y, p2 ? pop(t, 937.4) : 0);
    crash.forEach(c => place(c.p.g, c.p.x, c.p.y, p2 ? pop(t, c.a) : 0));
    show(up, p2 ? fade(t, 952.4) : 0); note.style.opacity = p2 ? 1 : 0;
  };
});

// ---- Les intérêts composés ----
SC(965, "16", "LES INTÉRÊTS COMPOSÉS", (g, at) => {
  const quote = title(g, 200, "« La huitième merveille du monde »", 60);
  const who = txt(g, 960, 255, "citation souvent attribuée à Einstein", 26, { weight: 500, fill: C.inkSoft });
  const hill = el("path", { ...D.line, "stroke-width": 6, d: "M120 420 C600 520 1100 760 1820 900" }, g); draw(hill, 977.4, 978.6);
  const hillPath = hill;
  const ball = el("g", {}, g); const ballC = el("circle", { ...D.line, fill: C.face, r: 1 }, ball);
  const flake = el("path", { ...D.line, "stroke-width": 3, stroke: C.accentSoft, d: "M-12 0 L12 0 M0 -12 L0 12" }, ball);
  const rows = [["ANNÉE 1", "+ 500 €", 985.4], ["ANNÉE 2", "+ 525 €", 987.6], ["ANNÉE 30", "+ 2 058 €", 992.8]].map(([a, b, tt], i) => {
    const r = el("g", {}, g); txt(r, 0, 0, a, 26, { anchor: "start", weight: 800, ls: 5, fill: C.inkSoft }); txt(r, 360, 0, b, 40, { anchor: "end", font: "Serif", weight: 600 });
    el("path", { ...D.line, "stroke-width": 2, stroke: C.paperDeep, d: "M0 22 L360 22" }, r); return { r, tt, y: 420 + i * 110 };
  });
  const B = el("g", {}, g);
  const steps = [[0, 10000, 0, 0], [15, 10000, 7500, 3289], [30, 10000, 15000, 18219]];
  const bb = steps.map(([yr, c, i1, i2], k) => {
    const x = k * 230, s = 0.0105;
    const g1 = el("g", {}, B);
    el("rect", { ...D.line, "stroke-width": 3, fill: C.inkSoft, x: x - 70, y: -c * s, width: 140, height: c * s }, g1);
    if (i1) el("rect", { ...D.line, "stroke-width": 3, fill: C.accentSoft, x: x - 70, y: -(c + i1) * s, width: 140, height: i1 * s }, g1);
    if (i2) el("rect", { ...D.line, "stroke-width": 3, fill: C.accent, x: x - 70, y: -(c + i1 + i2) * s, width: 140, height: i2 * s }, g1);
    txt(B, x, 40, yr ? `${yr} ans` : "Départ", 22, { weight: 700, fill: C.inkSoft });
    return { g1, a: 996.0 + k * 1.4, x };
  });
  const tot = pill(g, 1470, 250, "10 000 € → 43 219 € EN 30 ANS", { bg: C.accent, size: 24 });
  const leg = txt(g, 1470, 1000, "Capital · Intérêts · Intérêts des intérêts", 22, { weight: 700, fill: C.inkSoft });
  return t => {
    const p1 = out(t, 983.2, 0.5);
    show(quote, fade(t, 972.6) * p1); show(who, fade(t, 974.4) * p1);
    hill.style.opacity = Math.min(hill.style.opacity === "" ? 1 : 1, p1);
    const u = ease(prog(t, 978.6, 983.0)), L = hillPath.getTotalLength(), pt = hillPath.getPointAtLength(L * u), r = lerp(14, 110, u);
    ballC.setAttribute("r", r); ball.setAttribute("transform", `translate(${pt.x} ${pt.y - r - 3}) rotate(${u * 900})`); ball.style.opacity = (t > 978.4 ? 1 : 0) * p1;
    const p2 = t > 983.2;
    rows.forEach(rw => place(rw.r, 160, rw.y, p2 ? pop(t, rw.tt) : 0));
    bb.forEach(b => { const k = p2 ? ease(prog(t, b.a, b.a + 0.8)) : 0; b.g1.setAttribute("transform", `translate(${b.x} 0) scale(1 ${k}) translate(${-b.x} 0)`); });
    place(B, 1240, 880, p2 && t > 995.6 ? 1 : 0);
    place(tot.g, tot.x, tot.y, p2 ? pop(t, 1000.4) : 0); leg.style.opacity = p2 ? fade(t, 1002.4) : 0;
  };
});

// ---- Commencer tôt change tout ----
SC(1015, "16", "LE TEMPS, PREMIER INGRÉDIENT", (g, at) => {
  const head = title(g, 170, "Commencer tôt change tout.", 64);
  const sub = txt(g, 960, 230, "400 € par mois, placés à 5 % par an, jusqu'à 65 ans", 28, { weight: 500, fill: C.inkSoft });
  const W = 1100, H = 560, X = 1180, Y = 610;
  const fv = (startAge, age) => { if (age <= startAge) return 0; const n = (age - startAge) * 12, r = 0.05 / 12; return 400 * (Math.pow(1 + r, n) - 1) / r; };
  const mk = (s) => { const a = []; for (let age = 25; age <= 65; age++) a.push([(age - 25) / 40, fv(s, age) / 640000]); return a; };
  const c25 = chart(g, W, H, mk(25), { color: C.accent, sw: 7 }), c35 = chart(g, W, H, mk(35), { color: C.inkSoft, sw: 7, frame: false });
  draw(c25.line, 1027.6, 1031.6); draw(c35.line, 1028.6, 1032.6);
  const ages = [25, 35, 45, 55, 65].map(a => txt(c25.g, c25.P([(a - 25) / 40, 0])[0], H / 2 + 34, `${a} ans`, 20, { weight: 600, fill: C.inkSoft }));
  const k25 = card(g, 380, 210, { fill: C.accentSoft }); txt(k25, 0, -50, "DÈS 25 ANS", 24, { weight: 800, ls: 5 }); txt(k25, 0, 20, "610 000 €", 60, { font: "Serif", weight: 600 }); txt(k25, 0, 70, "192 000 € versés", 22, { weight: 600, fill: C.inkSoft });
  const k35 = card(g, 380, 210); txt(k35, 0, -50, "DÈS 35 ANS", 24, { weight: 800, ls: 5 }); txt(k35, 0, 20, "333 000 €", 60, { font: "Serif", weight: 600 }); txt(k35, 0, 70, "144 000 € versés", 22, { weight: 600, fill: C.inkSoft });
  const big = title(g, 540, "Le meilleur moment, c'est aujourd'hui.", 72);
  const ages2 = ["40", "50", "70"].map((a, i) => pill(g, 640 + i * 320, 720, `À ${a} ANS AUSSI`, { bg: i === 1 ? C.accent : C.face, size: 22 }));
  const never = txt(g, 960, 860, "Il n'est jamais trop tard.", 44, { font: "Serif", weight: 500, fill: C.inkSoft });
  return t => {
    const p1 = out(t, 1037.4, 0.5);
    show(head, fade(t, 1015.4) * p1); show(sub, fade(t, 1021.6) * p1);
    place(c25.g, X, Y, pop(t, 1026.8, 0.5) * p1); place(c35.g, X, Y, (t > 1028.6 ? 1 : 0) * p1);
    place(k25, 360, 470, pop(t, 1030.4) * p1); place(k35, 360, 740, pop(t, 1032.4) * p1);
    const p2 = t > 1037.4;
    show(big, p2 ? fade(t, 1037.8) : 0);
    ages2.forEach((a, i) => place(a.g, a.x, a.y, p2 ? pop(t, 1044.4 + i * 0.6) : 0)); show(never, p2 ? fade(t, 1041.0) : 0);
  };
});

// ---- Conclusion ----
SC(1053, "17", "CONCLUSION", (g, at) => {
  const env = envelope(g);
  const goals = [["curve", "RENTABILITÉ", 1059.4], ["heart", "PROTÉGER SES PROCHES", 1061.6], ["piggy", "RETRAITE", 1063.0], ["house", "RÉSIDENCE PRINCIPALE", 1064.0], ["contract", "ÉTUDES DES ENFANTS", 1066.4], ["coins", "TOUS VOS PROJETS", 1068.2]].map(([k, l, a], i) => {
    const w = el("g", {}, g); el("circle", { ...D.line, fill: C.face, r: 92 }, w);
    const ic = el("g", { transform: "scale(0.9)" }, w); if (k === "heart") { const h = heart(ic); h.setAttribute("transform", "translate(0 10)"); } else D.icons[k](ic);
    txt(w, 0, 130, l, 20, { weight: 800, ls: 4, fill: C.inkSoft }); return { w, a, ang: -Math.PI / 2 + i / 6 * Math.PI * 2 };
  });
  const ind = title(g, 990, "Un outil indispensable dans un patrimoine.", 46);
  const next = pill(g, 960, 1010, "PROCHAIN ÉPISODE : OPTIMISER SON ASSURANCE VIE", { bg: C.accent, size: 24 });
  return t => {
    env.setOpen(ease(prog(t, 1055, 1055.6))); place(env.g, 960, 520, pop(t, 1053.6, 0.5) * 0.55);
    goals.forEach(gl => { const a = gl.ang + (t - 1053) * 0.05; place(gl.w, 960 + 620 * Math.cos(a), 470 + 290 * Math.sin(a), pop(t, gl.a) * 0.8); });
    show(ind, fade(t, 1071.6) * out(t, 1079.6)); place(next.g, next.x, next.y, pop(t, 1080.2));
  };
});
