// Parties 09 à 17 : la SCPI (fonctionnement, gestion, loyers, origine, immobilier pro, locataires, avantages, contraintes, sélection).

// ---- 09 · La SCPI, une alternative ----
SC("09", "LA SCPI, UNE ALTERNATIVE", (g, A) => {
  const m = A.m;
  const alt = pl(g, 960, 300, "UNE VRAIE ALTERNATIVE", { bg: C.accent, size: 32 });
  const nm = pl(g, 700, 400, "MIEUX QUE TOUT ?", { size: 20 }), ti = pl(g, 1220, 400, "TRÈS INTÉRESSANT", { bg: C.accentSoft, size: 20 }), x = check(g, false), ok = check(g);
  const head = big(g, 960, 300, "Comment ça marche ?", 56);
  const inv = Array.from({ length: 8 }, (_, i) => person(g, { vest: [C.accent, C.inkSoft, C.paperDeep, C.accentSoft][i % 4] }));
  const fl = [0, 1, 2].map(i => arrow(g, 760 + i * 200, 640, 860 + i * 100, 700, m(5) - 0.4, m(5) + 0.1, { color: C.accent }));
  const scpi = bloc(g, 420, 120, "La SCPI", "une société", { fill: C.ink, size: 52 });
  const ges = bloc(g, 560, 100, "La société de gestion", "elle gère la SCPI", { fill: C.accent, size: 34 });
  return t => {
    const p1 = out(t, m(3) - 0.5);
    on(alt, pop(t, m(1) - 0.3) * p1); on(nm, pop(t, m(2) - 0.3) * p1); on(ti, pop(t, m(2) + 0.5) * p1);
    place(x, 500, 400, pop(t, m(2)) * 0.8 * p1); place(ok, 1450, 400, pop(t, m(2) + 0.7) * 0.8 * p1);
    show(head, fade(t, m(3) - 0.3));
    inv.forEach((p, i) => stand(p, t, m(4) - 0.5 + i * 0.07, 520 + i * 125, 640, 0.6));
    fl.forEach(f => f.render(t));
    place(scpi, 960, 790, pop(t, m(6) - 0.3)); place(ges, 960, 950, pop(t, m(7) - 0.3));
  };
});

// ---- 10 · Tu investis, tu laisses dormir, tu encaisses ----
SC("10", "TU INVESTIS, TU LAISSES DORMIR, TU ENCAISSES", (g, A) => {
  const m = A.m;
  const ges = bloc(g, 560, 90, "La société de gestion", "", { fill: C.accent, size: 36 });
  const R = [["La gestion administrative", 2], ["La gestion locative", 3], ["Le versement des loyers", 4], ["Tous les pépins", 5]].map(([s, k], i) => ligne(g, s, m(k), 400 + i * 85, true, 34));
  const inv = member(g, "client"), rien = pl(g, 1450, 360, "TOI : RIEN À FAIRE", { bg: C.ink, fg: C.paper, size: 26 });
  const W = [["TU INVESTIS", 7], ["TU LAISSES DORMIR", 8], ["TU ENCAISSES", 9]].map(([s, k], i) => ({ p: pl(g, 470 + i * 490, 960, s, { bg: i === 2 ? C.accent : C.face, size: 28 }), k }));
  const parcs = [0, 1, 2].map(() => parc(g, 1)), pro = pl(g, 1450, 820, "SURTOUT DE L'IMMOBILIER PROFESSIONNEL", { bg: C.accentSoft, size: 18 });
  return t => {
    place(ges, 560, 300, pop(t, m(1) - 0.3));
    R.forEach(r => place(r.r, 300, r.y, pop(t, r.a - 0.3)));
    inv.at(t, m(6) - 0.5, 1450, 840, { armL: t > m(9) ? 150 : 105, armR: t > m(9) ? 30 : 75, k: out(t, m(10) - 0.5) }); on(rien, pop(t, m(6) - 0.2) * out(t, m(10) - 0.5));
    W.forEach(w => on(w.p, pop(t, m(w.k) - 0.3)));
    parcs.forEach((p, i) => place(p, 1250 + i * 200, 620, pop(t, m(10) - 0.3 + i * 0.15) * 1.1)); on(pro, pop(t, m(11) - 0.3));
  };
});

// ---- 11 · Les loyers et le cadre ----
SC("11", "LES LOYERS ET LE CADRE", (g, A) => {
  const m = A.m;
  const br = bloc(g, 380, 120, "6 à 7 %", "loyers bruts", { size: 56 }), moins = bloc(g, 380, 120, "−", "taxes, travaux, gestion", { fill: C.paperDeep, size: 56 }), nt = bloc(g, 380, 120, "4,5 à 6 %", "loyers nets pour toi", { fill: C.accent, size: 56 });
  const a1 = arrow(g, 580, 400, 700, 400, m(2) - 0.4, m(2)), a2 = arrow(g, 1100, 400, 1220, 400, m(3) - 0.4, m(3));
  const vs = pl(g, 1420, 500, "LOIN DES 2-3 % EN DIRECT", { size: 20 });
  const amf = bank(g, "AMF", 240), ctl = pl(g, 480, 880, "ENCADRÉ ET CONTRÔLÉ", { bg: C.ink, fg: C.paper });
  const dir = K.house(g, 0.9), x = check(g, false), pers = pl(g, 860, 880, "LE DIRECT : PERSONNE", { size: 20 });
  const ng = pl(g, 1420, 690, "≠ GARANTI", { bg: C.accent, size: 28 }), tr = pl(g, 1420, 780, "UN CADRE RÉGLEMENTÉ ET TRANSPARENT", { size: 18 });
  const R = [["TU INVESTIS", 9], ["RIEN À FAIRE", 10], ["TU ENCAISSES", 10.4]].map(([s, k], i) => ({ p: pl(g, 1160 + i * 250, 960, s, { bg: i === 2 ? C.accent : C.face, size: 18 }), k }));
  return t => {
    place(br, 380, 400, pop(t, m(1) - 0.3)); place(moins, 900, 400, pop(t, m(2) - 0.3)); place(nt, 1420, 400, pop(t, m(3) - 0.3)); a1.render(t); a2.render(t);
    on(vs, pop(t, m(3) + 0.6));
    place(amf, 480, 700, pop(t, m(4) - 0.3) * 0.7); on(ctl, pop(t, m(4)));
    place(dir, 860, 710, pop(t, m(5) - 0.3)); place(x, 930, 650, pop(t, m(5))); on(pers, pop(t, m(5) + 0.2));
    on(ng, pop(t, m(6) - 0.3)); on(tr, pop(t, m(7) - 0.3));
    R.forEach(r => on(r.p, pop(t, m(Math.floor(r.k)) + (r.k % 1) * 2 - 0.3) * (t > m(8) - 0.6 ? 1 : 0)));
  };
});

// ---- 12 · Pourquoi les entreprises louent ----
SC("12", "POURQUOI LES ENTREPRISES LOUENT", (g, A) => {
  const m = A.m, head = title(g, 190, "Les entreprises préfèrent louer");
  const cp = bloc(g, 440, 100, "Propriétaire", "", { size: 40 }), cl = bloc(g, 440, 100, "Locataire", "", { fill: C.accent, size: 40 });
  const lk = K.padlock(g), fx = pl(g, 480, 560, "DES COÛTS FIXES", { size: 20 }), sp = pl(g, 1440, 560, "DE LA SOUPLESSE", { bg: C.accentSoft, size: 20 });
  el("path", { ...D.line, "stroke-width": 4, d: "M760 760 L1160 760" }, g);
  const ca = colonne(g, 880, 760, 120, C.inkSoft), ca2 = colonne(g, 1040, 760, 120, C.accent), mv = pl(g, 960, 830, "CHIFFRE D'AFFAIRES −20 %", { size: 18 });
  const ren = pl(g, 1440, 680, "RENÉGOCIER OU DÉMÉNAGER", { size: 20 }), adapt = pl(g, 1440, 760, "ADAPTER SES CHARGES", { bg: C.accent, size: 20 });
  const ges = member(g, "mathyas"), idee = pl(g, 960, 360, "« ON ACHÈTE LES MURS, ON LES LOUE AUX ENTREPRISES »", { bg: C.accentSoft, size: 22 });
  const pk = parc(g, 1.6), fl = flux(g, 5);
  const us = pl(g, 1420, 800, "ÉTATS-UNIS : LES REITs", { size: 22 }), fr = pl(g, 1420, 890, "FRANCE : LES SCPI", { bg: C.accent, size: 22 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const p1 = out(t, m(8) - 0.5);
    place(cp, 480, 400, pop(t, m(2) - 0.3) * p1); place(cl, 1440, 400, pop(t, m(2)) * p1);
    place(lk.g, 480, 680, pop(t, m(3) - 0.3) * 0.9 * p1); on(fx, pop(t, m(3)) * p1); on(sp, pop(t, m(4) - 0.3) * p1);
    ca.set(240 * fade(t, m(5) - 0.5) * p1, ""); ca2.set(192 * fade(t, m(5)) * p1, ""); on(mv, pop(t, m(5)) * p1);
    on(ren, pop(t, m(6) - 0.3) * p1); on(adapt, pop(t, m(7) - 0.3) * p1);
    ges.at(t, m(8) - 0.3, 420, 900, { armR: -20 }); on(idee, pop(t, m(9) - 0.3));
    place(pk, 960, 650, pop(t, m(9)) * 1.6); fl(t, m(9) + 0.4, m(9) + 1.6, 1300, 700, 1010, 650, 80);
    on(us, pop(t, m(10) - 0.3)); on(fr, pop(t, m(11) - 0.3));
  };
});

// ---- 13 · L'immobilier professionnel ----
SC("13", "L'IMMOBILIER PROFESSIONNEL", (g, A) => {
  const m = A.m, head = title(g, 190, "Trois grands types de biens");
  const C3 = [[parc, "Les bureaux", 2], [boutique, "Les commerces", 5], [centreVie, "Les centres de vie", 7]].map(([f, s, k], i) => {
    const w = el("g", {}, g); el("circle", { ...D.line, fill: C.face, r: 100 }, w); f(w, 1); txt(w, 0, 150, s, 36, { font: "Serif", weight: 600 }); return { w, x: 440 + i * 520, k };
  });
  const S = [["neufs, écologiques", 440, 3], ["grandes villes, en mutation", 440, 4], ["l'emplacement !", 960, 6], ["santé, crèches, seniors", 1480, 8], ["natalité, papy-boom", 1480, 9]]
    .map(([s, x, k], i) => ({ t: txt(g, x, 0, s, 26, { weight: 500, fill: C.inkSoft }), x, k }));
  const bail = pl(g, 960, 900, "LE GROS PLUS : LE BAIL COMMERCIAL", { bg: C.ink, fg: C.paper, size: 26 }), st = pl(g, 960, 980, "DES BAUX LONGS, DES LOYERS PLUS STABLES", { bg: C.accent, size: 22 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    C3.forEach(c => place(c.w, c.x, 440, pop(t, m(c.k) - 0.3)));
    const yy = {}; S.forEach(s => { yy[s.x] = (yy[s.x] || 660) + 40; s.t.setAttribute("x", s.x); s.t.setAttribute("y", yy[s.x]); s.t.style.opacity = fade(t, m(s.k) - 0.3); });
    on(bail, pop(t, m(10) - 0.3)); on(st, pop(t, m(11) - 0.3));
  };
});

// ---- 14 · Qui sont les locataires ? ----
SC("14", "QUI SONT LES LOCATAIRES ?", (g, A) => {
  const m = A.m, head = title(g, 190, "Qui sont les locataires ?");
  const pk = parc(g, 1);
  const N = [["LIDL", 2], ["McDONALD'S", 3], ["LA POSTE", 4], ["SNCF", 4.3], ["BABILOU", 5], ["FNAC", 5.25], ["EDF", 5.5], ["CARREFOUR", 6], ["AMAZON", 6.3]].map(([s, k], i) => {
    const a = -Math.PI / 2 + i * 2 * Math.PI / 9, x = 960 + 560 * Math.cos(a), y = 590 + 300 * Math.sin(a); return { p: pl(g, x, y, s, { bg: i % 2 ? C.face : C.accentSoft, size: 22 }), k, x, y };
  });
  const fl = N.map(() => flux(g, 2));
  const pay = pl(g, 960, 960, "PAS LE GENRE À ARRÊTER DE PAYER DU JOUR AU LENDEMAIN", { bg: C.ink, fg: C.paper, size: 18 }), div = pl(g, 960, 1030, "UNE VRAIE DIVERSITÉ DE SECTEURS", { bg: C.accent, size: 18 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); place(pk, 960, 600, pop(t, m(1)) * 1.8);
    N.forEach((n, i) => { const a = m(Math.floor(n.k)) + (n.k % 1) * 2 - 0.3; on(n.p, pop(t, a)); const c0 = a + 0.6 + ((Math.floor((t - a) / 2.4)) * 2.4 || 0);
      const on7 = t > m(7) - 0.5; fl[i](t, on7 ? c0 : 1e9, on7 ? c0 + 1.4 : 1e9 + 1, n.x, n.y, 960 + (n.x - 960) * 0.25, 600 + (n.y - 590) * 0.25, 40); });
    on(pay, pop(t, m(8) - 0.3)); on(div, pop(t, m(9) - 0.3));
  };
});

// ---- 15 · Les avantages ----
SC("15", "LES AVANTAGES", (g, A) => {
  const m = A.m, head = title(g, 190, "Les avantages");
  const L = [["Aucune implication : gestion déléguée", 2], ["Des risques mutualisés", 3], ["Le contrôle de l'AMF", 7], ["Plus de souplesse : des parts revendables", 8], ["Des loyers nets, sur ton compte", 10], ["Finançable à crédit", 11]]
    .map(([s, k], i) => ligne(g, s, m(k), 310 + i * 100, true, 32));
  const c1 = chaise(g, 1), c4 = chaise(g, 4), x = check(g, false), ok = check(g);
  const pk = [0, 1, 2].map(() => parc(g, 0.7)), loc = ["BUREAUX", "COMMERCES", "SANTÉ"].map((s, i) => pl(g, 1240 + i * 210, 900, s, { size: 18 }));
  const rev = pl(g, 1450, 1000, "REVENTE : SOCIÉTÉ DE GESTION OU AUTRE INVESTISSEUR", { size: 16 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    L.forEach(l => place(l.r, 220, l.y, pop(t, l.a - 0.3)));
    place(c1, 1300, 470, pop(t, m(4) - 0.4)); place(c4, 1600, 470, pop(t, m(4) + 0.2)); place(x, 1300, 340, pop(t, m(4) + 0.2) * 0.8); place(ok, 1600, 340, pop(t, m(4) + 0.6) * 0.8);
    pk.forEach((p, i) => place(p, 1240 + i * 210, 760, pop(t, m(5) - 0.3 + i * 0.12) * 0.9)); loc.forEach((p, i) => on(p, pop(t, m(6) - 0.3 + i * 0.12)));
    on(rev, pop(t, m(9) - 0.3));
  };
});

// ---- 16 · Les contraintes ----
SC("16", "LES CONTRAINTES", (g, A) => {
  const m = A.m, head = title(g, 190, "Les contraintes, en toute transparence");
  const dj = bloc(g, 560, 90, "Le délai de jouissance", "", { fill: C.ink, size: 38 });
  const fr = frise(g, 12, 330, 420, 90, 20), lm = txt(g, 1005, 560, "les mois après ta souscription", 24, { weight: 500, fill: C.inkSoft });
  const sans = pl(g, 600, 620, "PAS DE LOYERS", { bg: C.paperDeep }), d36 = pl(g, 600, 700, "EN GÉNÉRAL 3 À 6 MOIS", { size: 20 });
  const rat = pl(g, 1250, 620, "CES LOYERS NE SONT PAS RATTRAPÉS", { bg: C.accent }), dem = pl(g, 1250, 700, "LE REVENU DÉMARRE APRÈS", { size: 20 });
  const tri = pl(g, 480, 860, "LOYERS TRIMESTRIELS", { bg: C.face }), men = pl(g, 480, 940, "OU MENSUELS, SELON LA SCPI", { size: 18 });
  const h = pl(g, 1000, 860, "8 À 10 ANS MINIMUM", { bg: C.ink, fg: C.paper });
  const ng = pl(g, 1500, 860, "CAPITAL ET REVENUS NON GARANTIS", { bg: C.accent, size: 18 });
  const vag = el("path", { ...D.line, stroke: C.inkSoft, "stroke-width": 5, d: "M1340 980 C1380 940 1410 1010 1450 970 C1490 930 1520 1000 1560 960 C1600 920 1630 990 1660 950" }, g); draw(vag, m(12) - 0.4, m(12) + 0.6);
  return t => {
    show(head, fade(t, m(1) - 0.5)); place(dj, 960, 310, pop(t, m(2) - 0.3));
    fr.cases.forEach((c, i) => fr.set(i, fade(t, m(3) - 0.6 + i * 0.05), i < 5 ? (t > m(4) - 0.3 ? 1 : 0) : (t > m(7) - 0.3 ? 2 : 0))); lm.style.opacity = fade(t, m(3) - 0.3);
    on(sans, pop(t, m(4) - 0.2)); on(d36, pop(t, m(5) - 0.3)); on(rat, pop(t, m(6) - 0.3)); on(dem, pop(t, m(7) - 0.3));
    on(tri, pop(t, m(8) - 0.3)); on(men, pop(t, m(9) - 0.3)); on(h, pop(t, m(10) - 0.3)); on(ng, pop(t, m(11) - 0.3));
  };
});

// ---- 17 · Comment je choisis mes SCPI ----
SC("17", "COMMENT JE CHOISIS MES SCPI", (g, A) => {
  const m = A.m, head = title(g, 190, "Ma sélection");
  const p50 = pl(g, 960, 290, "PLUS DE 50 SCPI PARTENAIRES", { bg: C.face, size: 24 });
  const ctr = el("g", {}, g); el("circle", { ...D.line, fill: C.ink, r: 135 }, ctr); txt(ctr, 0, 10, "6 à 8", 70, { font: "Serif", weight: 700, fill: C.paper }); txt(ctr, 0, 55, "SCPI CONSEILLÉES", 18, { weight: 800, ls: 3, fill: C.accentSoft });
  const sat = (kind, t1, x, y, k) => ({ w: badge(g, kind, t1, "", 62), x, y, k });
  const S = [sat("pie", "LA TAILLE", 470, 420, 4), sat("curve", "L'HISTORIQUE", 1450, 420, 5), sat("contract", "L'ÉQUIPE", 1450, 640, 6),
    sat("immeuble", "LE TOF", 1450, 860, 7), sat("coins", "CAPITAL VARIABLE", 470, 640, 11), sat("piggy", "PROVISION DES LOYERS", 470, 860, 13)];
  const tof = jauge(g, 260, 30, C.accent), tl = txt(g, 1720, 880, "", 30, { font: "Serif", weight: 700 }), t90 = pl(g, 1720, 960, "> 90 % = TRÈS BON", { bg: C.accent, size: 16 });
  const es = pl(g, 200, 760, "ENTRER, SORTIR", { size: 16 }), pv = pl(g, 200, 980, "UN REVENU RÉGULIER", { size: 16 });
  const job = pl(g, 960, 1010, "ÇA, C'EST MON TRAVAIL. TOI, TU N'AS PAS À LE FAIRE.", { bg: C.ink, fg: C.paper, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); on(p50, pop(t, m(2) - 0.3)); place(ctr, 960, 640, pop(t, m(3) - 0.3));
    S.forEach(s => place(s.w, s.x, s.y - 30, pop(t, m(s.k) - 0.3)));
    tof.g.setAttribute("transform", "translate(1560 780)"); tof.g.style.opacity = fade(t, m(8) - 0.3); const k = ease(prog(t, m(9) - 0.5, m(9) + 0.8)); tof.set(0.6 + 0.4 * k);
    tl.textContent = Math.round(60 + 40 * k) + " %"; tl.style.opacity = fade(t, m(8)); on(t90, pop(t, m(10) - 0.3));
    on(es, pop(t, m(12) - 0.3)); on(pv, pop(t, m(15) - 0.3)); on(job, pop(t, m(16) - 0.3));
  };
});
