// Parties 17 à 23 : leviers du PEA, quand je paie, comparatif, points d'attention, partenaire, co-gestion, conclusion.

// ---- 17 · Cinq leviers et une limite ----
SC("17", "CINQ LEVIERS ET UNE LIMITE", (g, A) => {
  const m = A.m, head = title(g, 190, "Cinq leviers… et une limite");
  const L = [["Prendre date", "ouvre-le tôt, même petit", 2], ["Un PEA par personne", "+ un PEA Jeune par enfant majeur", 4], ["Verser tôt", "la performance future ne compte pas", 6], ["Transférer", "l'ancienneté fiscale est conservée", 8], ["La rente viagère", "après 5 ans, exonérée d'impôt sur le revenu", 10]]
    .map(([a, b, k], i) => ({ c: bloc(g, 520, 130, a, b, { size: 34 }), x: 360 + (i % 3) * 600, y: 380 + Math.floor(i / 3) * 190, k }));
  const lim = bloc(g, 520, 130, "La limite", "ni démembrable, ni transmissible", { fill: C.ink, size: 38 });
  const dc = pl(g, 960, 820, "AU DÉCÈS, LE PEA EST CLÔTURÉ", { bg: C.paperDeep, size: 20 }), tr = pl(g, 960, 910, "POUR TRANSMETTRE : LE CTO OU L'ASSURANCE VIE", { bg: C.accent, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); L.forEach(l => place(l.c, l.x, l.y, pop(t, m(l.k) - 0.3)));
    place(lim, 1560, 570, pop(t, m(12) - 0.3)); on(dc, pop(t, m(14) - 0.3)); on(tr, pop(t, m(15) - 0.3));
  };
});

// ---- 18 · Quand et comment je paie ----
SC("18", "QUAND ET COMMENT JE PAIE", (g, A) => {
  const m = A.m, head = title(g, 190, "Quand est-ce que tu paies ?");
  const cto = compte(g, "CTO", C.ink, 0.7), pea = compte(g, "PEA", C.accent, 0.7);
  const C1 = [["À chaque vente, à chaque revenu", 2], ["Dividendes : prélevés à la source", 3], ["Plus-values : déclarées l'année suivante", 4]].map(([s, k], i) => ({ t: txt(g, 520, 470 + i * 50, s, 26, { weight: 600 }), k }));
  const P1 = [["Rien, tant que l'argent reste dans le plan", 5], ["Le calcul se fait au retrait", 6]].map(([s, k], i) => ({ t: txt(g, 1400, 470 + i * 50, s, 26, { weight: 600 }), k }));
  const ex = pl(g, 960, 680, "TU VENDS UNE LIGNE À +5 000 € POUR EN RACHETER UNE AUTRE", { bg: C.accentSoft, size: 18 });
  const r1 = bloc(g, 440, 140, "− 1 570 €", "d'impôt, dès l'arbitrage", { size: 60 }), r2 = bloc(g, 440, 140, "0 €", "l'argent reste investi", { fill: C.ink, size: 60 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); place(cto, 520, 360, pop(t, m(2) - 0.4)); place(pea, 1400, 360, pop(t, m(5) - 0.4));
    C1.forEach(c => show(c.t, fade(t, m(c.k) - 0.3))); P1.forEach(c => show(c.t, fade(t, m(c.k) - 0.3)));
    on(ex, pop(t, m(7) - 0.3)); place(r1, 520, 860, pop(t, m(8) - 0.3)); place(r2, 1400, 860, pop(t, m(9) - 0.3));
  };
});

// ---- 19 · CTO ou PEA : côte à côte ----
SC("19", "CTO OU PEA : CÔTE À CÔTE", (g, A) => {
  const m = A.m;
  const hc = compte(g, "CTO", C.ink, 0.55), hp = compte(g, "PEA", C.accent, 0.55);
  const rows = ["Plafond", "Univers", "Fiscalité des gains", "Arbitrages", "Démembrement", "Au décès", "Société"];
  const RL = rows.map((s, i) => txt(g, 520, 330 + i * 80, s, 26, { anchor: "end", weight: 700, fill: C.inkSoft }));
  const CT = [["aucun plafond", 2], ["mondial", 3], ["31,4 % à chaque gain", 4], ["imposables", 4.4], ["oui", 5], ["plus-values purgées", 6], ["oui", 7]];
  const PE = [["150 000 €, un par personne", 8], ["Europe + ETF swap", 9], ["18,6 % après 5 ans", 10], ["sans impôt", 11], ["non", 11.4], ["clôturé", 12], ["non", 13]];
  const T1 = CT.map(([s, k], i) => ({ t: txt(g, 860, 340 + i * 80, s, 28, { font: "Serif", weight: 600 }), k })), T2 = PE.map(([s, k], i) => ({ t: txt(g, 1420, 340 + i * 80, s, 28, { font: "Serif", weight: 600, fill: C.accent }), k }));
  const fin = pl(g, 960, 960, "LE PEA POUR FAIRE GROSSIR · LE CTO POUR TOUT LE RESTE ET POUR TRANSMETTRE", { bg: C.ink, fg: C.paper, size: 18 });
  return t => {
    place(hc, 860, 240, pop(t, m(1) - 0.3)); place(hp, 1420, 240, pop(t, m(1)));
    RL.forEach((r, i) => r.style.opacity = fade(t, m(1) + i * 0.08));
    const sh = (o) => o.t.style.opacity = fade(t, m(Math.floor(o.k)) + (o.k % 1) * 2 - 0.3); T1.forEach(sh); T2.forEach(sh);
    on(fin, pop(t, m(14) - 0.3));
  };
});

// ---- 20 · Les points d'attention ----
SC("20", "LES POINTS D'ATTENTION", (g, A) => {
  const m = A.m, head = title(g, 190, "Les points d'attention");
  const ng = bloc(g, 760, 120, "Capital non garanti", "il peut varier à la hausse comme à la baisse", { fill: C.ink, size: 40 });
  const vag = el("path", { ...D.line, stroke: C.accent, "stroke-width": 6, d: "M720 520 C780 460 820 580 880 520 C940 460 980 580 1040 520 C1100 460 1140 580 1200 520" }, g); draw(vag, m(3) - 0.4, m(3) + 0.6);
  const pea = compte(g, "PEA", C.accent, 0.5), cto = compte(g, "CTO", C.ink, 0.5);
  const P = [["Retrait avant 5 ans = plan clôturé", 4], ["Versements plafonnés", 5]].map(([s, k], i) => ligne(g, s, m(k), 700 + i * 90, false, 28));
  const Cc = [["Chaque vente, chaque revenu imposé", 6], ["Frais de tenue de compte plus élevés", 7]].map(([s, k], i) => ligne(g, s, m(k), 700 + i * 90, false, 28));
  return t => {
    show(head, fade(t, m(1) - 0.5)); place(ng, 960, 380, pop(t, m(2) - 0.3));
    place(pea, 480, 620, pop(t, m(4) - 0.4)); P.forEach(p => place(p.r, 240, p.y, pop(t, p.a - 0.3)));
    place(cto, 1380, 620, pop(t, m(6) - 0.4)); Cc.forEach(p => place(p.r, 1140, p.y, pop(t, p.a - 0.3)));
  };
});

// ---- 21 · Notre partenaire ----
SC("21", "NOTRE PARTENAIRE", (g, A) => {
  const m = A.m;
  const nom = bloc(g, 520, 110, "Shares Pro", "pour ouvrir ton PEA ou ton CTO", { fill: C.ink, size: 52 });
  const ec = ecran(g, 1.3);
  const F = [["100 % digital", 2], ["Actions, ETF, fonds", 3], ["Structurés sur le CTO", 4], ["Tu valides chaque ordre", 5], ["Un cadre réglementé", 6]].map(([s, k], i) => ligne(g, s, m(k), 380 + i * 90, true, 32));
  const prot = bloc(g, 480, 140, "70 000 €", "de protection sur tes titres", { fill: C.accent, size: 60 });
  const sl = pl(g, 960, 1000, "LA SIMPLICITÉ D'UNE APPLI, AVEC UN CONSEILLER DERRIÈRE", { bg: C.accentSoft, size: 20 });
  return t => {
    place(nom, 960, 250, pop(t, m(1) - 0.3)); place(ec, 480, 560, pop(t, m(2) - 0.4) * 1.3);
    F.forEach(f => place(f.r, 860, f.y, pop(t, f.a - 0.3))); place(prot, 1560, 800, pop(t, m(7) - 0.3)); on(sl, pop(t, m(8) - 0.3));
  };
});

// ---- 22 · Comment on travaille ensemble ----
SC("22", "COMMENT ON TRAVAILLE ENSEMBLE", (g, A) => {
  const m = A.m, head = title(g, 190, "Comment on travaille ensemble");
  const S = [["1 · Je recommande", "ton allocation, tes ordres", C.ink, 2], ["2 · Tu valides", "rien ne bouge sans toi", C.face, 4], ["3 · On suit ensemble", "points réguliers, rééquilibrage", C.accent, 6]]
    .map(([a, b, f, k], i) => ({ c: bloc(g, 480, 140, a, b, { fill: f, size: 38 }), x: 400 + i * 560, k }));
  const F = [arrow(g, 650, 400, 710, 400, m(4) - 0.5, m(4) - 0.2, { w: 6 }), arrow(g, 1210, 400, 1270, 400, m(6) - 0.5, m(6) - 0.2, { w: 6 })];
  const vol = volant(g), main = pl(g, 960, 760, "TU GARDES LA MAIN", { bg: C.ink, fg: C.paper, size: 24 }), seul = pl(g, 960, 840, "MAIS TU N'ES PLUS SEUL FACE AU MARCHÉ", { size: 18 });
  const hon = bloc(g, 500, 120, "0 à 1,20 % / an", "honoraires fixés d'avance", { fill: C.accentSoft, size: 44 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); S.forEach(s => place(s.c, s.x, 400, pop(t, m(s.k) - 0.3))); F.forEach(f => f.render(t));
    place(vol, 400, 760, pop(t, m(8) - 0.4) * 0.6, 20 * Math.sin(t)); on(main, pop(t, m(8) - 0.2)); on(seul, pop(t, m(9) - 0.3));
    place(hon, 1580, 800, pop(t, m(11) - 0.3));
  };
});

// ---- 23 · Conclusion ----
SC("23", "CONCLUSION", (g, A) => {
  const m = A.m;
  const cto = compte(g, "CTO", C.ink, 1), pea = compte(g, "PEA", C.accent, 1);
  const lib = pl(g, 640, 560, "LA LIBERTÉ", { bg: C.ink, fg: C.paper, size: 26 }), fis = pl(g, 1280, 560, "L'AVANTAGE FISCAL", { bg: C.accent, size: 26 });
  const O = [["FAIRE GRANDIR TON CAPITAL", 4], ["PAYER MOINS D'IMPÔTS", 5], ["GARDER TON ARGENT DISPONIBLE", 6]].map(([s, k], i) => ({ p: pl(g, 960, 680 + i * 70, s, { bg: C.face, size: 20 }), k }));
  const me = member(g, "mathyas"), rdv = pl(g, 1500, 900, "RÉSERVE UN CRÉNEAU AVEC MOI", { bg: C.ink, fg: C.paper, size: 22 });
  const fin = big(g, 960, 1020, "On se retrouve pour une prochaine vidéo", 40);
  return t => {
    place(cto, 640, 380, pop(t, m(1) - 0.4) * 0.9); place(pea, 1280, 380, pop(t, m(1) - 0.2) * 0.9);
    on(lib, pop(t, m(2) - 0.3)); on(fis, pop(t, m(3) - 0.3)); O.forEach(o => on(o.p, pop(t, m(o.k) - 0.3)));
    me.at(t, m(7) - 0.4, 320, 960, { armR: t > m(8) ? -20 : 75 }); on(rdv, pop(t, m(8) - 0.3)); show(fin, fade(t, m(9) - 1));
  };
});
