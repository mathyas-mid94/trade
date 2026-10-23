// Parties 00 à 05 : introduction, rôle de l'assurance, la banque, la marge sur l'assurance, facultative… obligatoire, le monopole.
// A.m(k) = instant du repère [k] de la partie (SCRIPT.md) ; A.s / A.e = début / fin de la partie.

// ---- 00 · Introduction ----
SC("00", "INTRODUCTION", (g, A) => {
  const m = A.m;
  const maison = K.house(g, 1.7), pret = contrat(g, "PRÊT IMMOBILIER");
  const rp = pill(g, 520, 820, "RÉSIDENCE PRINCIPALE", { bg: C.face, size: 22 }), loc = pill(g, 900, 820, "LOCATIF", { bg: C.face, size: 22 });
  const mens = pill(g, 1450, 330, "TES MENSUALITÉS", { bg: C.accent, size: 26 }); const down = arrow(g, 1450, 390, 1450, 500, m(3), m(3) + 0.5, { color: C.ink });
  const cal = calendar(g, "2022"), loi = pill(g, 1450, 870, "UNE LOI PASSÉE EN 2022", { bg: C.face, size: 22 });
  const bouc = protege(g), sub = pill(g, 700, 940, "LA SUBSTITUTION", { bg: C.ink, fg: C.paper, size: 26 });
  const head = title(g, 220, "Trois objectifs");
  const obj = [["percent", "RÉDUIRE", "tes primes d'assurance", 7], ["bouclier", "OPTIMISER", "tes garanties", 8], ["coins", "REPRENDRE", "du pouvoir d'achat", 9]].map(([k, a, b, mk], i) => {
    const w = el("g", {}, g); el("circle", { ...D.line, fill: C.face, r: 120 }, w); D.icons[k](w);
    txt(w, 0, 175, a, 28, { weight: 800, ls: 5 }); txt(w, 0, 210, b, 24, { weight: 500, fill: C.inkSoft }); return { w, x: 560 + i * 400, a: m(mk) };
  });
  return t => {
    const p1 = out(t, m(6) - 0.5);
    place(maison, 520, 560, pop(t, m(1) - 0.4) * p1); place(pret.g, 880, 540, pop(t, m(1)) * p1);
    place(rp.g, rp.x, rp.y, pop(t, m(2) - 0.4) * p1); place(loc.g, loc.x, loc.y, pop(t, m(2)) * p1);
    place(mens.g, mens.x, mens.y, pop(t, m(3) - 0.3) * p1); down.render(t); down.p.style.opacity *= p1; down.head.style.opacity *= p1;
    place(cal.g, 1450, 680, pop(t, m(4) - 0.3) * p1); place(loi.g, loi.x, loi.y, pop(t, m(4)) * p1);
    place(bouc, 600, 470, pop(t, m(5) - 0.3) * 0.8 * p1); place(sub.g, sub.x, sub.y, pop(t, m(5) + 0.2) * p1);
    show(head, fade(t, m(6) - 0.3));
    obj.forEach(o => place(o.w, o.x, 560, pop(t, o.a - 0.3)));
  };
});

// ---- 01 · L'assurance emprunteur, c'est quoi ? ----
SC("01", "L'ASSURANCE EMPRUNTEUR", (g, A) => {
  const m = A.m, head = title(g, 190, "L'assurance emprunteur, c'est quoi ?");
  const cli = member(g, "client"), banque = bank(g, "BANQUE", 280);
  const pr = arrow(g, 1400, 400, 520, 400, m(2), m(2) + 0.7, { color: C.ink, bend: -50 }), lp = pill(g, 960, 300, "LE PRÊT", { bg: C.face, size: 22 });
  const bouc = protege(g), la = pill(g, 960, 800, "L'ASSURANCE", { bg: C.accent, size: 24 });
  const R = [["DÉCÈS", 520, 920, 4], ["INVALIDITÉ", 840, 920, 4.3], ["INCAPACITÉ DE TRAVAIL", 1260, 920, 4.6], ["PERTE D'EMPLOI", 700, 1000, 5], ["MI-TEMPS THÉRAPEUTIQUE", 1180, 1000, 5.3]]
    .map(([s, x, y, k]) => ({ p: pill(g, x, y, s, { bg: k < 5 ? C.paperDeep : C.face, size: 20 }), k }));
  const alea = pill(g, 330, 380, "UN ALÉA", { bg: C.ink, fg: C.paper, size: 22 });
  const fl = flux(g, 5), ok = check(g), maison = K.house(g, 0.75), ok2 = check(g);
  return t => {
    show(head, fade(t, m(1) - 0.5));
    cli.at(t, m(2) - 0.5, 330, 820, { armR: t > m(6) && t < m(7) ? 160 : 75, armL: t > m(6) && t < m(7) ? 20 : 105 });
    place(banque, 1580, 640, pop(t, m(2) - 0.3) * 0.85); pr.render(t); place(lp.g, lp.x, lp.y, pop(t, m(2) + 0.4));
    place(bouc, 960, 600, pop(t, m(3) - 0.3) * 1.5); place(la.g, la.x, la.y, pop(t, m(3)));
    R.forEach(r => { const a = m(Math.floor(r.k)) + (r.k % 1) * 2 - 0.3; place(r.p.g, r.p.x, r.p.y, pop(t, a)); });
    place(alea.g, alea.x, alea.y, pop(t, m(6) - 0.3) * out(t, m(8)));
    fl(t, m(7) - 0.2, m(7) + 0.9, 1040, 560, 1500, 560, 120);
    place(ok, 1580, 420, pop(t, m(8) - 0.5)); place(maison, 560, 720, pop(t, m(8) - 0.1)); place(ok2, 620, 640, pop(t, m(8) + 0.3) * 0.8);
  };
});

// ---- 02 · Comment ta banque gagne de l'argent ----
SC("02", "LA BANQUE", (g, A) => {
  const m = A.m, head = title(g, 190, "Comment ta banque gagne de l'argent");
  const bce = bank(g, "BCE", 240), ta = bank(g, "TA BANQUE", 240);
  const lb = txt(g, 420, 880, "Banque centrale européenne", 24, { font: "Serif", weight: 600 });
  const gens = [0, 1, 2].map(i => person(g, { vest: [C.accent, C.inkSoft, C.paperDeep][i] }));
  const lg = txt(g, 1540, 830, "TOI", 22, { weight: 800, ls: 6, fill: C.inkSoft });
  const a1 = arrow(g, 560, 470, 820, 470, m(3), m(3) + 0.6, { bend: -70 }), r1 = pill(g, 690, 370, "3,40 %", { bg: C.face, size: 26 });
  const a2 = arrow(g, 1100, 470, 1380, 470, m(5) - 0.4, m(5) + 0.2, { bend: -70 }), r2 = pill(g, 1240, 370, "4,90 %", { bg: C.accent, size: 26 });
  const marge = bloc(g, 760, 120, "La différence : sa marge", "c'est comme ça qu'elle fait des bénéfices", { fill: C.ink });
  const a3 = arrow(g, 1380, 780, 1100, 780, m(7) - 0.4, m(7) + 0.2, { color: C.inkSoft, bend: -60 }), a4 = arrow(g, 820, 780, 560, 780, m(8) - 0.4, m(8) + 0.2, { color: C.inkSoft, bend: -60 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(bce, 420, 620, pop(t, m(2) - 0.3) * 0.7); lb.style.opacity = fade(t, m(2));
    place(ta, 960, 620, pop(t, m(3) - 0.5) * 0.7);
    a1.render(t); place(r1.g, r1.x, r1.y, pop(t, m(4) - 0.3));
    gens.forEach((p, i) => stand(p, t, m(5) - 0.6 + i * 0.12, 1420 + i * 120, 780, 0.62));
    lg.style.opacity = fade(t, m(5) - 0.3);
    a2.render(t); place(r2.g, r2.x, r2.y, pop(t, m(5)));
    place(marge, 960, 980, pop(t, m(6) - 0.3));
    a3.render(t); a4.render(t);
  };
});

// ---- 03 · Là où la banque se rattrape ----
SC("03", "LA MARGE CACHÉE", (g, A) => {
  const m = A.m, head = title(g, 190, "Là où la banque se rattrape");
  const ch = K.chart(g, 560, 300, [[0, 0.9], [0.2, 0.75], [0.4, 0.62], [0.6, 0.4], [0.8, 0.22], [1, 0.12]], { color: C.accent, sw: 7 });
  draw(ch.line, m(1) - 0.3, m(1) + 0.9); const lc = pill(g, 520, 300, "LE COÛT DE L'ARGENT", { bg: C.face, size: 20 });
  const tb = pill(g, 520, 720, "DES TAUX DE PRÊT BAS", { bg: C.paperDeep, size: 22 }), mm = pill(g, 520, 800, "MOINS DE MARGE SUR LE CRÉDIT", { bg: C.face, size: 20 });
  const fl = arrow(g, 860, 520, 1150, 520, m(3) - 0.3, m(3) + 0.3, { color: C.ink });
  const bouc = protege(g), tag = prix(g, "€€€", C.ink), cm = pill(g, 1420, 760, "LE CONTRAT MAISON", { bg: C.accent, size: 22 });
  const c65 = card(g, 900, 150, { fill: C.accent }); txt(c65, 0, -2, "jusqu'à 65 %", 64, { font: "Serif", weight: 700 }); txt(c65, 0, 46, "de la marge de la banque sur un prêt", 24, { weight: 600 });
  const ice = iceberg(g);
  const vu = pill(g, 1240, 330, "LE TAUX BAS", { bg: C.accent, size: 24 }), cache = pill(g, 500, 700, "CE QU'ON NE REGARDE PAS", { bg: C.face, size: 20 });
  const inside = el("g", {}, ice.g); txt(inside, 0, 140, "ASSURANCE", 30, { weight: 800, ls: 5, fill: C.paper }); txt(inside, 10, 200, "FRAIS", 30, { weight: 800, ls: 5, fill: C.paper });
  const vrai = bloc(g, 440, 120, "Le vrai coût total", "de ton crédit", { fill: C.ink });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const p1 = out(t, m(6) - 0.6);
    ch.g.setAttribute("transform", "translate(520 520)"); ch.g.style.opacity = fade(t, m(1) - 0.5) * p1; place(lc.g, lc.x, lc.y + 30, pop(t, m(1)) * p1);
    place(tb.g, tb.x, tb.y, pop(t, m(2) - 0.3) * p1); place(mm.g, mm.x, mm.y, pop(t, m(2) + 0.4) * p1);
    fl.render(t); fl.p.style.opacity *= p1; fl.head.style.opacity *= p1;
    place(bouc, 1420, 500, pop(t, m(4) - 0.4) * 1.6 * p1); place(tag, 1600, 640, pop(t, m(4)) * p1); place(cm.g, cm.x, cm.y, pop(t, m(4) + 0.2) * p1);
    place(c65, 960, 950, pop(t, m(5) - 0.3) * p1);
    const kI = fade(t, m(6) - 0.4);
    ice.g.setAttribute("transform", "translate(960 560)"); ice.g.style.opacity = kI;
    ice.haut.style.opacity = 1; ice.eau.style.opacity = fade(t, m(7) - 0.4); ice.bas.style.opacity = fade(t, m(7) - 0.2) * (0.25 + 0.75 * fade(t, m(8) - 0.4));
    inside.style.opacity = fade(t, m(8) - 0.2);
    place(vu.g, vu.x, vu.y, pop(t, m(6))); place(cache.g, cache.x, cache.y, pop(t, m(7)));
    place(vrai, 1500, 820, pop(t, m(8) + 0.2));
  };
});

// ---- 04 · Une assurance facultative… obligatoire ! ----
SC("04", "FACULTATIVE… OBLIGATOIRE !", (g, A) => {
  const m = A.m, head = title(g, 190, "Une assurance facultative… obligatoire !");
  const L = [["Aucune loi ne t'oblige à la prendre", 2], ["Mais pour un prêt immobilier, la banque la demande", 3]].map(([s, k], i) => ligne(g, s, m(k), 380 + i * 110, true, 38));
  const pasLaSienne = pill(g, 960, 690, "MAIS ELLE NE PEUT PAS T'IMPOSER LA SIENNE", { bg: C.accent, size: 30 });
  const banq = member(g, "banquier"), dit = pill(g, 420, 420, "« C'EST OBLIGATOIRE »", { bg: C.face, size: 22 });
  const moins = protege(g), tagM = prix(g, "€", C.accent), lm = pill(g, 1500, 780, "LA MOINS CHÈRE", { bg: C.face, size: 20 }), x = check(g, false);
  const sienne = protege(g), tagS = prix(g, "€€€", C.ink), ls = pill(g, 960, 780, "CELLE DE LA BANQUE", { bg: C.paperDeep, size: 20 });
  const gar = pill(g, 960, 880, "LES MEILLEURES GARANTIES ?", { bg: C.ink, fg: C.paper, size: 22 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const p1 = out(t, m(5) - 0.5);
    L.forEach(l => place(l.r, 300, l.y, pop(t, l.a - 0.3) * p1));
    place(pasLaSienne.g, pasLaSienne.x, pasLaSienne.y, pop(t, m(4) - 0.3) * p1);
    banq.at(t, m(5) - 0.3, 380, 900, { armR: -25 }); place(dit.g, dit.x, dit.y, pop(t, m(5)));
    place(moins, 1500, 560, pop(t, m(6) - 0.4) * 1.3); place(tagM, 1650, 660, pop(t, m(6) - 0.2)); place(lm.g, lm.x, lm.y, pop(t, m(6)));
    place(x, 1500, 400, pop(t, m(6) + 0.6) * 1.3);
    place(sienne, 960, 560, pop(t, m(7) - 0.3) * 1.3); place(tagS, 1110, 660, pop(t, m(7))); place(ls.g, ls.x, ls.y, pop(t, m(7) + 0.1));
    place(gar.g, gar.x, gar.y, pop(t, m(8) - 0.3));
  };
});

// ---- 05 · Un monopole qui coûte cher ----
SC("05", "UN QUASI-MONOPOLE", (g, A) => {
  const m = A.m, head = title(g, 190, "Un quasi-monopole");
  const cli = member(g, "client"), cg = cage(g), banque = bank(g, "BANQUE", 280);
  const cond = pill(g, 1400, 820, "SES CONDITIONS", { bg: C.paperDeep, size: 22 }), tarifs = pill(g, 1400, 900, "SES TARIFS", { bg: C.paperDeep, size: 22 });
  const pour = pill(g, 1400, 990, "PENSÉS POUR ELLE, AVANT TOI", { bg: C.accent, size: 22 });
  const autres = [0, 1, 2].map(i => person(g, { vest: [C.inkSoft, C.accentSoft, C.paperDeep][i] }));
  const pa = jauge(g, 460, 40, C.accent), lpa = txt(g, 960, 300, "TON POUVOIR D'ACHAT", 22, { weight: 800, ls: 6, fill: C.inkSoft });
  return t => {
    show(head, fade(t, m(1) - 0.8));
    cli.at(t, m(1) - 0.5, 720, 880, { armL: 140, armR: 40 }); cg.setAttribute("transform", `translate(720 ${900 - 500 * (1 - ease(prog(t, m(1), m(1) + 0.6)))})`);
    cg.style.opacity = fade(t, m(1));
    place(banque, 1400, 580, pop(t, m(1) - 0.2) * 0.8);
    place(cond.g, cond.x, cond.y, pop(t, m(2) - 0.4)); place(tarifs.g, tarifs.x, tarifs.y, pop(t, m(2)));
    place(pour.g, pour.x, pour.y, pop(t, m(3) - 0.3));
    autres.forEach((p, i) => stand(p, t, m(4) - 0.4 + i * 0.15, 200 + i * 140, 900, 0.75));
    pa.g.setAttribute("transform", "translate(730 350)"); pa.g.style.opacity = fade(t, m(5) - 0.6); lpa.style.opacity = fade(t, m(5) - 0.6);
    pa.set(0.9 - 0.65 * ease(prog(t, m(5) - 0.2, m(5) + 1)));
  };
});
