// Parties 09 à 16 : transmission, cinq techniques CTO, le PEA (plafonds, contenu, ETF physique / synthétique, swap, règle des 5 ans).

// ---- 09 · Transmettre avec un CTO ----
SC("09", "TRANSMETTRE AVEC UN CTO", (g, A) => {
  const m = A.m, head = title(g, 190, "Le CTO, l'ami de l'héritier");
  const ex = pl(g, 480, 300, "UN TITRE ACHETÉ 100 €, QUI EN VAUT 300", { size: 18 });
  el("path", { ...D.line, "stroke-width": 4, d: "M240 860 L760 860" }, g);
  const v = colonne(g, 370, 860, 200, C.inkSoft), vi = el("rect", { ...D.line, fill: C.accent, x: 270, width: 200, rx: 10 }, g), vt = txt(g, 370, 0, "− 62,80 €", 26, { weight: 700 });
  const d = colonne(g, 640, 860, 200, C.paperDeep), lv = txt(g, 370, 900, "vente de ton vivant", 22, { weight: 600, fill: C.inkSoft }), ld = txt(g, 640, 900, "transmission au décès", 22, { weight: 600, fill: C.inkSoft });
  const pg = pl(g, 640, 410, "PLUS-VALUE PURGÉE", { bg: C.accent, size: 20 }), ds = pl(g, 500, 980, "LES DROITS DE SUCCESSION, EUX, RESTENT DUS", { size: 16 });
  const T = [["Donation avant cession", "le donataire vend sur la valeur du jour", 7], ["Avant tout engagement de vente", "sinon : abus de droit", 9], ["Le démembrement", "le parent garde les revenus", 10]]
    .map(([a, b, k], i) => ({ c: bloc(g, 640, 120, a, b, { fill: i === 1 ? C.accentSoft : C.face, size: 32 }), y: 380 + i * 150, k }));
  const nr = pl(g, 1350, 840, "LES ENFANTS : LA NUE-PROPRIÉTÉ", { size: 18 }), no = notaire(g), np = pl(g, 1350, 990, "VALIDÉ AVEC NOTRE NOTAIRE PARTENAIRE", { bg: C.ink, fg: C.paper, size: 18 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); on(ex, pop(t, m(2) - 0.3));
    const k3 = ease(prog(t, m(3) - 0.3, m(3) + 0.4)); v.set(316 * k3, "237,20 €"); vi.setAttribute("y", 860 - 400 * k3); vi.setAttribute("height", 84 * k3); vi.style.opacity = k3 > 0.05 ? 1 : 0;
    vt.setAttribute("y", 860 - 358 * k3 + 10); vt.style.opacity = k3; lv.style.opacity = fade(t, m(3) - 0.3);
    d.set(400 * ease(prog(t, m(4) - 0.3, m(4) + 0.4)), "300 €"); ld.style.opacity = fade(t, m(4) - 0.3); on(pg, pop(t, m(5) - 0.3)); on(ds, pop(t, m(6) + 0.6));
    T.forEach(o => place(o.c, 1350, o.y, pop(t, m(o.k) - 0.3))); on(nr, pop(t, m(11) - 0.3));
    place(no, 1640, 960, pop(t, m(12) - 0.4) * 0.35); on(np, pop(t, m(12) - 0.2));
  };
});

// ---- 10 · Cinq techniques sur le CTO ----
SC("10", "CINQ TECHNIQUES SUR LE CTO", (g, A) => {
  const m = A.m, head = title(g, 190, "Cinq techniques de gestion privée");
  const c1 = [], c2 = []; for (let i = 0; i <= 30; i++) { const x = i / 30; c1.push([x, 0.06 + 0.84 * (Math.pow(1.06, 20 * x) - 1) / (Math.pow(1.06, 20) - 1)]); c2.push([x, 0.06 + 0.76 * (Math.pow(1.06, 20 * x) - 1) / (Math.pow(1.06, 20) - 1)]); }
  const g1 = K.chart(g, 640, 400, c1, { color: C.ink, sw: 7 }), g2 = K.chart(g, 640, 400, c2, { color: C.accent, sw: 6, frame: false });
  g1.g.setAttribute("transform", "translate(480 560)"); g2.g.setAttribute("transform", "translate(480 560)"); draw(g1.line, m(4) - 0.4, m(5)); draw(g2.line, m(4) - 0.4, m(5));
  const t1 = pl(g, 480, 300, "1 · L'ETF CAPITALISANT", { bg: C.accent, size: 22 }), ni = pl(g, 480, 820, "PAS D'IMPÔT CHAQUE ANNÉE", { size: 18 });
  const hyp = pl(g, 480, 900, "50 000 € · 6 %/AN DONT 2 % DE DIVIDENDES · 20 ANS", { size: 14 }), plus = bloc(g, 330, 90, "≈ + 4 900 €", "après 20 ans", { fill: C.ink, size: 36 });
  const lc = txt(g, 810, 380, "capitalisant", 20, { anchor: "start", weight: 700 }), ld = txt(g, 810, 420, "distribuant", 20, { anchor: "start", weight: 700, fill: C.accent });
  const T = [["2 · Tax-loss harvesting", "des moins-values pour effacer des plus-values", 6], ["3 · Crédit lombard", "de la liquidité sans vendre, donc sans impôt", 8], ["4 · Structurés sur mesure", "adaptés à ton profil", 10], ["5 · Arbitrage d'enveloppe", "US, obligations, au-delà du plafond PEA", 12]]
    .map(([a, b, k], i) => ({ c: bloc(g, 760, 120, a, b, { size: 32 }), y: 340 + i * 160, k }));
  return t => {
    show(head, fade(t, m(1) - 0.5)); on(t1, pop(t, m(2) - 0.3)); g1.g.style.opacity = fade(t, m(3) - 0.5); on(ni, pop(t, m(3) - 0.2));
    on(hyp, pop(t, m(4) - 0.3)); lc.style.opacity = ld.style.opacity = fade(t, m(5) - 0.3); place(plus, 700, 680, pop(t, m(5) - 0.2));
    T.forEach(o => place(o.c, 1390, o.y, pop(t, m(o.k) - 0.3)));
  };
});

// ---- 11 · Le PEA, l'avantage fiscal sous conditions ----
SC("11", "LE PEA", (g, A) => {
  const m = A.m;
  const pea = compte(g, "PEA", C.accent), cond = pl(g, 960, 420, "L'AVANTAGE FISCAL, SOUS CONDITIONS", { bg: C.ink, fg: C.paper, size: 22 });
  const C4 = [["1", "PEA par personne", C.ink, 3], ["150 k€", "plafond de versements", C.face, 5], ["225 k€", "avec un PEA-PME", C.face, 6], ["20 k€", "PEA Jeune, enfant majeur rattaché", C.accent, 7]]
    .map(([a, b, f, k], i) => ({ c: bloc(g, 380, 150, a, b, { fill: f, size: 62 }), x: 330 + i * 420, k }));
  const cpl = [member(g, "marc", false), member(g, "sophie", false)], deux = pl(g, 330, 960, "DONC 2 POUR UN COUPLE", { bg: C.accentSoft, size: 18 });
  const no = pl(g, 1140, 960, "PAS DE PEA POUR UNE SOCIÉTÉ · PAS DE PEA JOINT", { size: 18 });
  return t => {
    const p1 = out(t, m(3) - 0.5);
    place(pea, 960, 300, pop(t, m(1) - 0.4) * 0.8); on(cond, pop(t, m(2) - 0.3) * p1);
    C4.forEach(c => place(c.c, c.x, 560, pop(t, m(c.k) - 0.3)));
    cpl.forEach((p, i) => p.at(t, m(4) - 0.4 + i * 0.15, 230 + i * 200, 900, { scale: 0.55 })); on(deux, pop(t, m(4)));
    on(no, pop(t, m(8) - 0.3));
  };
});

// ---- 12 · Le plafond compte les versements ----
SC("12", "LE PLAFOND COMPTE LES VERSEMENTS", (g, A) => {
  const m = A.m, head = title(g, 190, "Le plafond compte les versements, pas la valeur");
  const v = barre(g, 360, 400, 450, 110, C.ink, "150 000 € versés"), lv = txt(g, 360, 380, "ce que tu verses", 24, { anchor: "start", weight: 600, fill: C.inkSoft });
  const v2 = barre(g, 360, 640, 450, 110, C.ink, "150 000 €"), gn = barre(g, 810, 640, 750, 110, C.accent, "+ 250 000 € de gains", C.ink), lv2 = txt(g, 360, 620, "ce que ton PEA peut valoir un jour", 24, { anchor: "start", weight: 600, fill: C.inkSoft });
  const tot = bloc(g, 440, 120, "400 000 €", "dans ton PEA", { fill: C.accentSoft, size: 56 });
  const nor = pl(g, 960, 960, "C'EST NORMAL : SEULS LES VERSEMENTS SONT PLAFONNÉS", { bg: C.ink, fg: C.paper, size: 20 });
  return t => {
    show(head, fade(t, m(2) - 0.5));
    v.set(ease(prog(t, m(3) - 0.3, m(3) + 0.4))); lv.style.opacity = fade(t, m(3) - 0.3);
    v2.set(ease(prog(t, m(4) - 0.6, m(4) - 0.2))); gn.set(ease(prog(t, m(4) - 0.2, m(4) + 0.6))); lv2.style.opacity = fade(t, m(4) - 0.6);
    place(tot, 1400, 440, pop(t, m(5) - 0.3)); on(nor, pop(t, m(6) - 0.3));
  };
});

// ---- 13 · Ce qu'on met dans un PEA ----
SC("13", "CE QU'ON MET DANS UN PEA", (g, A) => {
  const m = A.m, head = title(g, 190, "Ce qu'on met dans un PEA");
  const E = [["Actions UE / EEE", 2], ["ETF et fonds ≥ 75 % européens", 3], ["Certains structurés", 4]].map(([s, k], i) => ligne(g, s, m(k), 360 + i * 90, true, 32));
  const I = [["Obligations en direct", 6], ["Actions américaines en direct", 7], ["ETF physiques hors Europe", 8]].map(([s, k], i) => ligne(g, s, m(k), 360 + i * 90, false, 32));
  const ce = pl(g, 480, 290, "ÉLIGIBLE", { bg: C.accent, size: 22 }), ci = pl(g, 1380, 290, "INTERDIT", { bg: C.ink, fg: C.paper, size: 22 });
  const r75 = pl(g, 960, 740, "LA RÈGLE DES 75 %", { size: 22 });
  const b1 = barre(g, 360, 800, 900, 110, C.ink, "≥ 75 % en titres européens éligibles"), b2 = barre(g, 1260, 800, 300, 110, C.accent, "25 % libres", C.ink);
  return t => {
    show(head, fade(t, m(1) - 0.5)); on(ce, pop(t, m(1))); E.forEach(e => place(e.r, 180, e.y, pop(t, e.a - 0.3)));
    on(ci, pop(t, m(5) - 0.3)); I.forEach(e => place(e.r, 1080, e.y, pop(t, e.a - 0.3)));
    on(r75, pop(t, m(9) - 0.3)); b1.set(ease(prog(t, m(10) - 0.3, m(10) + 0.4))); b2.set(ease(prog(t, m(11) - 0.3, m(11) + 0.4)));
  };
});

// ---- 14 · ETF physique ou synthétique ----
SC("14", "ETF PHYSIQUE OU SYNTHÉTIQUE", (g, A) => {
  const m = A.m, head = title(g, 190, "ETF physique ou synthétique ?");
  const ph = bloc(g, 600, 100, "L'ETF physique", "il achète vraiment les actions de l'indice", { size: 38 }), pn = panier(g, 1), us = pl(g, 480, 820, "S&P 500 → DES ACTIONS AMÉRICAINES", { size: 18 });
  const x = check(g, false), np = pl(g, 480, 930, "PAS DANS UN PEA", { bg: C.ink, fg: C.paper, size: 20 });
  const sy = bloc(g, 600, 100, "L'ETF synthétique", "il ne détient pas forcément l'indice", { fill: C.accent, size: 38 });
  const ct = contrat(g, "UN CONTRAT D'ÉCHANGE"), sw = pl(g, 1440, 900, "LE SWAP", { bg: C.ink, fg: C.paper, size: 30 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(ph, 480, 350, pop(t, m(2) - 0.3)); place(pn.g, 480, 620, pop(t, m(2))); on(us, pop(t, m(3) - 0.3));
    place(x, 260, 930, pop(t, m(4) - 0.3) * 0.8); on(np, pop(t, m(4) - 0.2));
    place(sy, 1440, 350, pop(t, m(5) - 0.3)); place(ct.g, 1440, 620, pop(t, m(6) - 0.4) * 1.2); on(sw, pop(t, m(7) - 0.3));
  };
});

// ---- 15 · L'ETF swap : le monde dans un PEA ----
SC("15", "L'ETF SWAP : LE MONDE DANS UN PEA", (g, A) => {
  const m = A.m, head = title(g, 190, "L'astuce du PEA : l'ETF swap");
  const eu = bloc(g, 380, 130, "Panier d'actions européennes", "il rend l'ETF éligible", { size: 28 }), etf = bloc(g, 360, 130, "L'ETF swap", "dans ton PEA", { fill: C.accent, size: 40 });
  const bq = bank(g, "BANQUE", 220), a0 = arrow(g, 480, 420, 680, 420, m(2) - 0.2, m(3), { color: C.ink });
  const a1 = arrow(g, 1100, 380, 1420, 380, m(5) - 0.4, m(5) + 0.2, { color: C.inkSoft }), a2 = arrow(g, 1420, 470, 1100, 470, m(6) - 0.4, m(6) + 0.2);
  const l1 = pl(g, 1260, 320, "LA PERF. EUROPÉENNE", { size: 16 }), l2 = pl(g, 1260, 540, "LA PERF. DU S&P 500 OU DU MSCI WORLD", { bg: C.accentSoft, size: 16 });
  const sg = pl(g, 1570, 300, "ELLE SIGNE LE SWAP", { size: 16 });
  const res = bloc(g, 560, 120, "Le monde entier", "depuis ton PEA", { fill: C.ink, size: 46 }), pea = compte(g, "PEA", C.accent, 0.6);
  const rk = pl(g, 1400, 760, "LE RISQUE : LA BANQUE CONTREPARTIE", { size: 18 }), uc = pl(g, 1400, 840, "ENCADRÉ PAR LA RÉGLEMENTATION UCITS", { bg: C.accentSoft, size: 16 });
  const ex = pl(g, 960, 980, "DES DISCUSSIONS POUR LES EXCLURE…", { size: 18 }), el_ = pl(g, 1450, 980, "ILS RESTENT ÉLIGIBLES", { bg: C.accent, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(eu, 300, 420, pop(t, m(2) - 0.3)); a0.render(t); place(etf, 880, 420, pop(t, m(3) - 0.3));
    place(bq, 1640, 470, pop(t, m(4) - 0.3) * 0.7); on(sg, pop(t, m(4)));
    a1.render(t); a2.render(t); on(l1, pop(t, m(5))); on(l2, pop(t, m(6)));
    place(res, 560, 780, pop(t, m(7) - 0.3)); place(pea, 960, 780, pop(t, m(8) - 0.3));
    on(rk, pop(t, m(9) - 0.3)); on(uc, pop(t, m(10) - 0.3)); on(ex, pop(t, m(11) - 0.3)); on(el_, pop(t, m(12) - 0.3));
  };
});

// ---- 16 · La règle des 5 ans ----
SC("16", "LA RÈGLE DES 5 ANS", (g, A) => {
  const m = A.m, head = title(g, 190, "La fiscalité du PEA : la règle des 5 ans");
  const av = barre(g, 200, 290, 620, 80, C.accent, "Avant 5 ans", C.ink), ap = barre(g, 820, 290, 900, 80, C.ink, "Après 5 ans : 0 % d'impôt sur le revenu");
  const ou = txt(g, 200, 410, "ouverture", 22, { anchor: "start", weight: 600, fill: C.inkSoft }), cin = txt(g, 820, 410, "5 ans", 22, { anchor: "middle", weight: 800 });
  const c1 = card(g, 740, 480), c2 = card(g, 740, 480);
  txt(c1, 0, -170, "RETRAIT AVANT 5 ANS", 22, { weight: 800, ls: 4, fill: C.accent }); const p1 = big(c1, 0, -80, "31,4 %", 90);
  const s1 = txt(c1, 0, -20, "sur les gains, et le plan est clôturé", 26, { weight: 600 }), s1b = txt(c1, 0, 20, "sauf licenciement, invalidité, retraite anticipée, création d'entreprise", 17, { weight: 500, fill: C.inkSoft });
  const s1c = big(c1, 0, 140, "10 000 € de gains → 3 140 €", 38);
  txt(c2, 0, -170, "RETRAIT APRÈS 5 ANS", 22, { weight: 800, ls: 4, fill: C.inkSoft }); const p2 = big(c2, 0, -80, "18,6 %", 90, C.accent);
  const s2 = txt(c2, 0, -20, "de prélèvements sociaux, 0 % d'IR", 26, { weight: 600 }), s2c = big(c2, 0, 60, "10 000 € de gains → 1 860 €", 38);
  const s2d = txt(c2, 0, 150, "retraits partiels : le plan reste ouvert", 24, { weight: 600, fill: C.inkSoft }), s2e = txt(c2, 0, 185, "et accepte de nouveaux versements", 24, { weight: 600, fill: C.inkSoft });
  return t => {
    show(head, fade(t, m(1) - 0.5)); av.set(ease(prog(t, m(2) - 0.3, m(2) + 0.3))); ap.set(ease(prog(t, m(2) + 0.2, m(2) + 0.8))); ou.style.opacity = cin.style.opacity = fade(t, m(2));
    place(c1, 560, 730, pop(t, m(3) - 0.3)); show(p1, fade(t, m(4) - 0.3)); show(s1, fade(t, m(5) - 0.3)); show(s1b, fade(t, m(6) - 0.3)); show(s1c, fade(t, m(7) - 0.3));
    place(c2, 1360, 730, pop(t, m(8) - 0.3)); show(p2, fade(t, m(10) - 0.3)); show(s2, fade(t, m(9) - 0.3)); show(s2c, fade(t, m(11) - 0.3)); show(s2d, fade(t, m(12) - 0.3)); show(s2e, fade(t, m(13) - 0.3));
  };
});
