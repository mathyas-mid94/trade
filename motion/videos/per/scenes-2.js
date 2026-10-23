// Parties 10 à 19 : résidence principale / chômage, stratégie, double rendement, avis d'imposition, plafonds,
// calcul, 1 000 €/mois, fiche de paie, effort réel, simulation 20 ans.

// ---- 10 · Résidence principale ou fin de droits ? ----
SC("10", "RÉSIDENCE PRINCIPALE OU CHÔMAGE ?", (g, A) => {
  const m = A.m, head = title(g, 190, "Deux cas de sortie, deux histoires");
  const L = card(g, 760, 560), R = card(g, 760, 560, { fill: C.accentSoft });
  txt(L, 0, -220, "ACHAT DE LA RÉSIDENCE PRINCIPALE", 22, { weight: 800, ls: 4, fill: C.inkSoft }); txt(R, 0, -220, "FIN DES DROITS AU CHÔMAGE", 22, { weight: 800, ls: 4, fill: C.inkSoft });
  const h = el("g", {}, g); const hI = el("g", { transform: "scale(1.6)" }, h); D.icons.house(hI);
  const l1 = txt(g, 520, 690, "− 30 % d'impôt aujourd'hui…", 34, { font: "Serif", weight: 600 }), l2 = txt(g, 520, 750, "… + 30 % repris demain", 34, { font: "Serif", weight: 600, fill: C.accent });
  const xL = check(g, false), lk = padlock(g);
  const ex = pill(g, 1400, 760, "SORTIE EN GRANDE PARTIE EXONÉRÉE D'IMPÔT", { bg: C.accent, size: 20 });
  const autres = txt(g, 1400, 690, "comme décès du conjoint, invalidité, surendettement", 22, { weight: 500, fill: C.inkSoft });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(L, 520, 600, pop(t, m(1) - 0.4)); place(R, 1400, 600, pop(t, m(3) - 0.4));
    place(h, 520, 500, pop(t, m(1))); show(l1, fade(t, m(2) - 0.4)); show(l2, fade(t, m(2) + 0.4)); place(xL, 680, 420, pop(t, m(2) + 0.8));
    place(lk.g, 1400, 500, pop(t, m(3)) * 1.4); lk.open(ease(prog(t, m(4) - 0.3, m(4) + 0.4)));
    autres.style.opacity = fade(t, m(5) - 0.3); place(ex.g, ex.x, ex.y, pop(t, m(6) - 0.3));
  };
});

// ---- 11 · Une stratégie d'ingénierie patrimoniale ----
SC("11", "UNE STRATÉGIE D'INGÉNIERIE", (g, A) => {
  const m = A.m, head = title(g, 190, "Une stratégie, avec des calculs précis");
  const me = member(g, "monsieur", false);
  const desk = el("g", {}, g); el("path", { ...D.line, fill: C.paperDeep, d: "M-120 0 L120 0 L120 16 L-120 16 Z M-100 16 L-100 110 M100 16 L100 110" }, desk);
  const steps = [["Rupture conventionnelle", 3], ["Allocations chaque mois", 4], ["Trimestres validés", 5], ["Fin des droits : le PER se débloque", 6]].map(([s, k], i) => ({ p: pill(g, 0, 0, s, { bg: i === 3 ? C.accent : C.face, size: 22 }), a: m(k), x: 900 + (i % 2) * 520, y: 360 + Math.floor(i / 2) * 110 }));
  const cal = calendar(g, "€"); const per = el("g", {}, g); el("circle", { ...D.line, fill: C.ink, r: 70 }, per); txt(per, 0, 14, "PER", 40, { font: "Serif", weight: 700, fill: C.paper }); const lk = padlock(g);
  const ok = [ligne(g, "Défiscalisé à l'entrée", m(7), 680), ligne(g, "Presque pas fiscalisé à la sortie", m(8), 770)];
  const calc = pill(g, 1420, 900, "CALCULS PRÉCIS · RELEVÉ DE CARRIÈRE", { bg: C.face, size: 20 });
  const clas = card(g, 1500, 100, { fill: C.ink }); txt(clas, 0, 12, "Dans le cas classique, à la retraite, le PER est refiscalisé.", 32, { font: "Serif", weight: 600, fill: C.paper });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const leave = ease(prog(t, m(3) - 0.2, m(3) + 1));
    me.at(t, m(2) - 0.5, lerp(320, 420, leave), 900, { armR: t > m(4) ? 30 : 75 }); place(desk, 330, 760, pop(t, m(2) - 0.3) * (1 - leave));
    steps.forEach(s => place(s.p.g, s.x, s.y, pop(t, s.a - 0.3)));
    place(cal.g, 620, 520, pop(t, m(4)) * out(t, m(6)) * 0.7);
    place(per, 620, 520, pop(t, m(6) - 0.2)); place(lk.g, 680, 470, pop(t, m(6) - 0.2) * 0.5); lk.open(ease(prog(t, m(6), m(6) + 0.5)));
    ok.forEach(o => place(o.r, 900, o.y, pop(t, o.a - 0.3)));
    place(calc.g, calc.x, calc.y, pop(t, m(9) - 0.3) * out(t, m(10) - 0.4));
    place(clas, 960, 990, pop(t, m(10) - 0.3));
  };
});

// ---- 12 · Un double rendement ----
SC("12", "UN DOUBLE RENDEMENT", (g, A) => {
  const m = A.m, head = title(g, 190, "Un double rendement");
  const c = coin(g, 70); const a1 = arrow(g, 900, 470, 600, 600, m(3) - 0.4, m(3)), a2 = arrow(g, 1020, 470, 1320, 600, m(4) - 0.4, m(4));
  const b1 = bloc(g, 560, 200, "Moins d'impôts", "tout de suite", { size: 46, fill: C.accentSoft }), b2 = bloc(g, 560, 200, "Des intérêts composés", "ton épargne travaille", { size: 46 });
  const eq = pill(g, 960, 860, "MOINS D'IMPÔTS + DE L'ARGENT QUI TRAVAILLE", { bg: C.accent, size: 24 });
  const others = [["Avantage successoral", 6], ["Une rente, comme un loyer", 7], ["Un vrai complément de retraite", 8]].map(([s, k], i) => ({ p: pill(g, 0, 0, s.toUpperCase(), { bg: C.face, size: 20 }), a: m(k), x: 420 + i * 540 }));
  return t => {
    show(head, fade(t, m(1) - 0.5)); place(c, 960, 420, pop(t, m(2) - 0.3) * (1 + 0.05 * Math.sin(t * 4)));
    a1.render(t); a2.render(t); place(b1, 560, 660, pop(t, m(3))); place(b2, 1360, 660, pop(t, m(4)));
    place(eq.g, eq.x, eq.y, pop(t, m(5) - 0.3) * out(t, m(6) - 0.4));
    others.forEach(o => place(o.p.g, o.x, 880, pop(t, o.a - 0.3)));
  };
});

// ---- 13 · Ton avis d'imposition ----
SC("13", "TON AVIS D'IMPOSITION", (g, A) => {
  const m = A.m;
  const av = avis(g, "M. J'EXISTE PAS", [["Salaires (déclarant 1)", "45 000 €"], ["Déduction 10 %", "− 4 500 €"], ["Revenu fiscal de référence", "40 500 €"], ["Impôt sur le revenu net", "6 280 €"], ["Reste à payer", "2 092 €"], ["Plafond épargne retraite", "voir p. 3"]]);
  const mons = member(g, "monsieur");
  const rest = big(g, 1500, 400, "− 2 092 €", 70, C.accent), mens = txt(g, 1500, 450, "à rembourser · 523 € par mois", 26, { weight: 600, fill: C.inkSoft });
  const pas = pill(g, 1500, 520, "PRÉLÈVEMENT À LA SOURCE MAL RÉGLÉ", { bg: C.face, size: 18 });
  const rfr = pill(g, 1460, 620, "REVENU FISCAL ≠ SALAIRE", { bg: C.accent, size: 24 });
  const ment = pill(g, 1460, 760, "CETTE CASE NE MENT PAS", { bg: C.ink, fg: C.paper, size: 22 });
  const loupe = D.magnifier(g, 70);
  return t => {
    place(av.g, 760, 560, pop(t, m(2) - 0.3) * 0.85);
    mons.at(t, m(3) - 0.5, 260, 940, { armR: 30 });
    const hi = (i, a, b) => av.lines[i].hl.setAttribute("opacity", fade(t, a) * out(t, b));
    hi(4, m(4) - 0.2, m(5) - 0.2); hi(2, m(5) - 0.2, m(6) - 0.2); hi(0, m(6) - 0.2, m(7) - 0.2); hi(3, m(7) - 0.2, A.e);
    show(rest, fade(t, m(4) - 0.2) * out(t, m(5) - 0.3)); show(mens, fade(t, m(4) + 0.2) * out(t, m(5) - 0.3)); place(pas.g, pas.x, pas.y, pop(t, m(4) + 1) * out(t, m(5) - 0.3));
    place(rfr.g, rfr.x, rfr.y, pop(t, m(5)) * out(t, m(7) - 0.3));
    place(ment.g, ment.x, ment.y, pop(t, m(7)));
    const ly = m(7) < t ? 560 + (-140 + 3 * 70) * 0.85 : m(6) < t ? 560 + (-140) * 0.85 : 560 + (-140 + 2 * 70) * 0.85;
    place(loupe.g, 1000, ly, pop(t, m(5) - 0.3) * 0.8);
  };
});

// ---- 14 · Les plafonds épargne retraite ----
SC("14", "LES PLAFONDS ÉPARGNE RETRAITE", (g, A) => {
  const m = A.m, head = title(g, 190, "Le plafond épargne retraite");
  const rows = [["Plafond non utilisé 2021", "+ 4 149 €", 4], ["Plafond non utilisé 2022", "+ 4 637 €", 4], ["Plafond non utilisé 2023", "+ 4 114 €", 4], ["Plafond calculé sur 2023", "+ 4 364 €", 2]].map(([a, b, k], i) => {
    const r = el("g", {}, g); const hl = el("rect", { fill: C.accentSoft, x: -440, y: -34, width: 880, height: 56, rx: 8, opacity: 0 }, r);
    txt(r, -420, 8, a, 30, { anchor: "start", font: "Serif", weight: 600 }); txt(r, 420, 8, b, 32, { anchor: "end", font: "Serif", weight: 700 }); return { r, hl, a: m(k), y: 330 + i * 80 };
  });
  const bar = el("path", { ...D.line, d: "M520 650 L1400 650" }, g);
  const tot = el("g", {}, g); txt(tot, -420, 10, "Disponible fiscal", 36, { anchor: "start", font: "Serif", weight: 700, fill: C.accent }); const totN = txt(tot, 420, 10, "", 44, { anchor: "end", font: "Serif", weight: 700 });
  const dix = pill(g, 1640, 560, "≈ 10 % DE TES REVENUS", { bg: C.accent, size: 20 });
  const mens = pill(g, 1640, 420, "TOUS LES MOIS OU D'UN COUP", { bg: C.face, size: 18 });
  const trois = pill(g, 280, 420, "3 ANS EN ARRIÈRE", { bg: C.face, size: 22 });
  const couple = [member(g, "marc", false), member(g, "sophie", false)]; const mut = pill(g, 960, 1000, "EN COUPLE : PLAFONDS MUTUALISABLES", { bg: C.ink, fg: C.paper, size: 22 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    rows.forEach((r, i) => { place(r.r, 960, r.y, fade(t, (i === 3 ? m(1) : r.a) - 0.3 + (i < 3 ? i * 0.25 : 0)));
      r.hl.setAttribute("opacity", (i < 3 ? fade(t, m(4) + i * 0.25) * out(t, m(6) - 0.3) : fade(t, m(2)) * out(t, m(4) - 0.3)) * 0.9); });
    bar.style.opacity = fade(t, m(6) - 0.4);
    place(tot, 960, 720, fade(t, m(6) - 0.3)); totN.textContent = fmt(17264 * ease(prog(t, m(6) - 0.3, m(6) + 0.6))) + " €";
    tot.style.opacity = fade(t, m(6) - 0.3);
    place(dix.g, dix.x, dix.y, pop(t, m(2))); place(mens.g, mens.x, mens.y, pop(t, m(3) - 0.2)); place(trois.g, trois.x, trois.y, pop(t, m(4)));
    couple.forEach((c, i) => c.at(t, m(8) - 0.5 + i * 0.2, 260 + i * 140, 980, { scale: 0.5 })); place(mut.g, mut.x + 120, mut.y - 140, pop(t, m(8)));
  };
});

// ---- 15 · Le calcul ----
SC("15", "TA RÉDUCTION D'IMPÔT MAXIMALE", (g, A) => {
  const m = A.m, head = title(g, 190, "Ta réduction d'impôt maximale");
  const parts = [["17 264 €", "disponible fiscal", 2, C.face], ["× 30 %", "ta tranche (TMI)", 3, C.face], ["= 5 179 €", "d'impôt en moins", 5, C.accent]].map(([a, b, k, fill], i) => {
    const c = card(g, 460, 220, { fill }); txt(c, 0, 10, a, 72, { font: "Serif", weight: 700 }); txt(c, 0, 70, b, 24, { weight: 600, fill: C.inkSoft }); return { c, a: m(k), x: 400 + i * 560 };
  });
  const once = pill(g, 1520, 680, "EN UNE ANNÉE, SI TU VERSES TOUT", { bg: C.face, size: 18 });
  const rec = el("g", {}, g); el("path", { ...D.line, stroke: C.accent, "stroke-width": 10, d: "M-60 0 A60 60 0 1 1 0 60 M-10 40 L0 60 L-24 70" }, rec);
  const recL = txt(g, 560, 860, "Les plafonds se rechargent chaque année", 34, { anchor: "start", font: "Serif", weight: 600 });
  const feu = el("g", {}, g); el("path", { ...D.line, fill: C.accent, d: "M0 50 C-50 40 -50 -10 -10 -60 C-10 -20 20 -20 14 -50 C50 -10 50 40 0 50 Z" }, feu);
  const dose = pill(g, 960, 990, "BIEN DOSER : NE PAS TOUT CRAMER, RESTER SOUTENABLE", { bg: C.ink, fg: C.paper, size: 22 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    parts.forEach(p => place(p.c, p.x, 470, pop(t, p.a - 0.3)));
    place(once.g, once.x, once.y - 60, pop(t, m(5) + 0.4));
    place(rec, 460, 850, pop(t, m(6) - 0.3), 360 * ease(prog(t, m(6), m(6) + 1))); recL.style.opacity = fade(t, m(6) - 0.2);
    place(feu, 300, 980, pop(t, m(7) - 0.3) * out(t, m(8)) * (1 + 0.06 * Math.sin(t * 12)));
    place(dose.g, dose.x + 80, dose.y, pop(t, m(7)));
  };
});

// ---- 16 · 1 000 € par mois ----
SC("16", "1 000 € PAR MOIS", (g, A) => {
  const m = A.m, head = title(g, 190, "Comment fonctionne ta réduction d'impôt");
  const pig = el("g", {}, g); const pI = el("g", { transform: "scale(1.5)" }, pig); D.icons.piggy(pI); const fl = flux(g, 4);
  const M = [["12 000 €", "versés dans l'année", 2, C.ink], ["30 %", "ta TMI", 3, C.ink], ["3 600 €", "de réduction d'impôt", 4, C.accentSoft]].map(([a, b, k, fill], i) => {
    const c = card(g, 420, 140, { fill, rx: 70 }); txt(c, 0, 20, a, 60, { font: "Serif", weight: 700, fill: fill === C.ink ? C.paper : C.ink });
    const l = txt(g, 420 + i * 540, 790, b, 28, { font: "Serif", weight: 600 }); return { c, l, a: m(k), x: 420 + i * 540 };
  });
  const base = jauge(g, 900, 50, C.inkSoft); const bL = txt(g, 960, 960, "", 30, { font: "Serif", weight: 700 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(pig, 420, 470, pop(t, m(1) - 0.3)); fl(t, m(1), m(1) + 1.2, 420, 300, 420, 420, 30);
    M.forEach(o => { place(o.c, o.x, 680, pop(t, o.a - 0.3)); o.l.style.opacity = fade(t, o.a - 0.2); });
    const k = ease(prog(t, m(5) - 0.3, m(5) + 0.8)); base.g.setAttribute("transform", "translate(510 900)"); base.g.style.opacity = fade(t, m(5) - 0.4);
    base.set(1 - 0.27 * k); bL.textContent = "Base imposable : " + fmt(45000 - 12000 * k) + " €"; bL.style.opacity = fade(t, m(5) - 0.4); bL.setAttribute("y", 990);
  };
});

// ---- 17 · Directement sur ta fiche de paie ----
SC("17", "DIRECTEMENT SUR TA FICHE DE PAIE", (g, A) => {
  const m = A.m, head = title(g, 190, "Sur un salaire de 5 000 € par mois");
  const pA = camembert(g, 210, 775 / 5000), pB = camembert(g, 210, 775 / 5000);
  const lA = txt(g, 520, 900, "AVANT", 26, { weight: 800, ls: 6, fill: C.inkSoft }), lB = txt(g, 1400, 900, "AVEC LE PER", 26, { weight: 800, ls: 6, fill: C.accent });
  const nA = [big(g, 480, 520, "4 225 €", 46, C.paper), big(g, 860, 560, "775 €", 40, C.accent)], nB = [big(g, 1360, 520, "", 46, C.paper), big(g, 1740, 560, "", 40, C.accent)];
  const imp = pill(g, 520, 300, "≈ 9 300 € D'IMPÔT PAR AN", { bg: C.face, size: 20 });
  const gain = pill(g, 960, 990, "+ 300 € PAR MOIS, TOUT DE SUITE", { bg: C.accent, size: 28 });
  const pro = pill(g, 1400, 300, "MARCHE AUSSI POUR LES CHEFS D'ENTREPRISE", { bg: C.face, size: 18 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(pA.g, 520, 600, pop(t, m(2) - 0.4)); lA.style.opacity = fade(t, m(2) - 0.4);
    nA[1].style.opacity = fade(t, m(2)); nA[0].style.opacity = fade(t, m(3) - 0.2); place(imp.g, imp.x, imp.y, pop(t, m(2)));
    const k = ease(prog(t, m(5) - 0.3, m(5) + 0.8));
    place(pB.g, 1400, 600, pop(t, m(4) - 0.4)); pB.set((775 - 300 * k) / 5000); lB.style.opacity = fade(t, m(4) - 0.4);
    nB[1].textContent = fmt(775 - 300 * k) + " €"; nB[1].style.opacity = fade(t, m(4)); nB[0].textContent = fmt(4225 + 300 * ease(prog(t, m(6) - 0.3, m(6) + 0.6))) + " €"; nB[0].style.opacity = fade(t, m(4));
    place(gain.g, gain.x, gain.y, pop(t, m(7) - 0.3)); place(pro.g, pro.x, pro.y, pop(t, m(8) - 0.3));
  };
});

// ---- 18 · Ton vrai effort d'épargne ----
SC("18", "TON VRAI EFFORT D'ÉPARGNE", (g, A) => {
  const m = A.m, head = title(g, 190, "Ton vrai effort d'épargne");
  const an = anneau(g, 200, 0.3); const mid = big(g, 0, 0, "1 000 €", 60);
  const l7 = big(g, 360, 600, "700 €", 70), l3 = big(g, 1560, 600, "300 €", 70, C.accent);
  const s7 = txt(g, 360, 650, "ton effort", 26, { weight: 600, fill: C.inkSoft }), s3 = txt(g, 1560, 650, "rendus par l'État", 26, { weight: 600, fill: C.accent });
  const rdt = pill(g, 960, 300, "UN RENDEMENT IMMÉDIAT DE 11 À 45 % SELON TA TRANCHE", { bg: C.accent, size: 22 });
  const site = card(g, 900, 380); txt(site, 0, -130, "impots.gouv.fr · gérer mon prélèvement à la source", 26, { font: "Serif", weight: 600, fill: C.inkSoft });
  txt(site, -220, -50, "AVANT PER", 22, { weight: 800, ls: 4, fill: C.inkSoft }); txt(site, 220, -50, "APRÈS PER", 22, { weight: 800, ls: 4, fill: C.accent });
  const tA = txt(site, -220, 60, "14,4 %", 90, { font: "Serif", weight: 700 }), tB = txt(site, 220, 60, "3,8 %", 90, { font: "Serif", weight: 700, fill: C.accent });
  el("path", { ...D.line, stroke: C.paperDeep, d: "M0 -80 L0 150" }, site);
  return t => {
    const p1 = out(t, m(6) - 0.5);
    show(head, fade(t, m(1) - 0.5));
    an.set(0.3 * ease(prog(t, m(3) - 0.3, m(3) + 0.6))); place(an.g, 960, 600, pop(t, m(2) - 0.4) * p1); place(mid, 960, 620, pop(t, m(2) - 0.2) * p1);
    show(l3, fade(t, m(3)) * p1); show(s3, fade(t, m(3) + 0.2) * p1); show(l7, fade(t, m(4) - 0.2) * p1); show(s7, fade(t, m(4)) * p1);
    place(rdt.g, rdt.x, rdt.y, pop(t, m(5) - 0.3) * p1);
    place(site, 960, 620, pop(t, m(6) - 0.3)); tA.style.opacity = fade(t, m(7) - 0.3); tB.style.opacity = fade(t, m(8) - 0.3);
  };
});

// ---- 19 · Sur 20 ans ----
SC("19", "SUR 20 ANS", (g, A) => {
  const m = A.m, head = title(g, 190, "1 000 € par mois pendant 20 ans");
  const X0 = 260, X1 = 1200, Y0 = 880, H = 560, P = [];
  for (let y = 0; y <= 20; y++) P.push([X0 + (X1 - X0) * y / 20, Y0 - H * (12000 * ((1.05 ** y - 1) / 0.05)) / 407000]);
  const ver = el("path", { fill: C.accentSoft, stroke: "none" }, g), cur = el("path", { ...D.line, stroke: C.ink, "stroke-width": 7 }, g);
  el("path", { ...D.line, d: `M${X0} ${Y0} L${X1 + 40} ${Y0}` }, g);
  txt(g, X0, Y0 + 44, "aujourd'hui", 22, { weight: 600, fill: C.inkSoft }); txt(g, X1, Y0 + 44, "20 ans", 22, { weight: 600, fill: C.inkSoft });
  const tag = [pill(g, 0, 0, "1 000 € / MOIS", { bg: C.face, size: 20 }), pill(g, 0, 0, "20 ANS", { bg: C.face, size: 20 }), pill(g, 0, 0, "5 % PAR AN · TMI 30 %", { bg: C.face, size: 20 })];
  const tot = big(g, 1520, 400, "", 80), totL = txt(g, 1520, 450, "à la retraite", 28, { weight: 600, fill: C.inkSoft });
  const k72 = bloc(g, 560, 150, "72 000 €", "d'impôts économisés", { size: 54, fill: C.accentSoft }), k167 = bloc(g, 560, 150, "167 000 €", "d'intérêts", { size: 54 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const k = prog(t, m(2) - 0.3, m(5)), n = Math.max(1, Math.round(20 * k));
    const pts = P.slice(0, n + 1); cur.setAttribute("d", pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ")); cur.style.opacity = k > 0 ? 1 : 0;
    const vx = X0 + (X1 - X0) * n / 20; ver.setAttribute("d", `M${X0} ${Y0} L${vx} ${Y0 - H * 12000 * n / 407000} L${vx} ${Y0} Z`); ver.style.opacity = k > 0 ? 1 : 0;
    tag.forEach((p, i) => place(p.g, 520 + i * 300, 330, pop(t, m(2 + i) - 0.2) * out(t, m(5) + 0.5)));
    tot.textContent = "≈ " + fmt(407000 * ease(prog(t, m(5) - 0.4, m(5) + 0.4))) + " €"; show(tot, fade(t, m(5) - 0.4)); show(totL, fade(t, m(5)));
    place(k72, 1520, 640, pop(t, m(6) - 0.3)); place(k167, 1520, 820, pop(t, m(7) - 0.3));
  };
});
