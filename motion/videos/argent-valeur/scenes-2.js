// Parties 07 à 12 : ce que tu regardes, faire / garder / multiplier, s'entourer, donner pour recevoir, le capital, les bases.

// flux de pièces le long d'un segment (a -> b), vitesse v, n pièces
function fluxPieces(g, n) { return Array.from({ length: n }, () => coin(g, 20)); }
function animFlux(P, t, a, b, k, v = 0.6) {
  P.forEach((c, i) => { const u = ((t * v + i / P.length) % 1); place(c, lerp(a[0], b[0], u), lerp(a[1], b[1], u) - Math.sin(Math.PI * u) * 40, k * (u > 0.05 && u < 0.95 ? 1 : 0)); });
}

// ---- 07 · Ce que tu regardes en premier ----
SC("07", "LA VALORISATION", (g, A) => {
  const m = A.m, head = title(g, 190, "Ce que tu regardes en premier");
  const p1 = pl(g, 700, 290, "LA VALORISATION", { bg: C.ink, fg: C.paper, size: 22 }), p2 = pl(g, 1180, 290, "CE À QUOI TU DONNES DE L'IMPORTANCE", { size: 20 });
  const spot = el("ellipse", { fill: C.accentSoft, rx: 300, ry: 150 }, g);
  const pig = el("g", {}, g); D.icons.piggy(el("g", { transform: "scale(1.7)" }, pig));
  const ae = arrow(g, 260, 560, 760, 560, m(5) - 0.6, m(5) + 0.2), as = arrow(g, 1160, 560, 1660, 560, m(3) - 0.6, m(3) + 0.2);
  const le = txt(g, 510, 480, "L'ENTRÉE", 26, { weight: 800, ls: 5 }), ls = txt(g, 1410, 480, "LA SORTIE", 26, { weight: 800, ls: 5 });
  const fe = fluxPieces(g, 5), fs = fluxPieces(g, 5);
  const dep = pl(g, 1410, 650, "DÉPENSES · CONSOMMATION", { size: 20 }), cre = pl(g, 510, 650, "CRÉATION DE VALEUR", { bg: C.accent, size: 20 }), pe = pl(g, 510, 710, "POUR TOI, ET POUR LES AUTRES", { size: 18 });
  const foule = [0, 1, 2].map(i => marcheur(g, { vest: [C.inkSoft, C.paperDeep, C.accentSoft][i], hair: i === 1 ? "f" : undefined }, 0.42));
  const tag = prix(g, "€€€", C.ink), hs = pl(g, 510, 330, "COMPÉTENCES À HAUT REVENU", { bg: C.accent, size: 20 });
  const cyc = el("path", { ...D.line, stroke: C.inkSoft, "stroke-width": 5, "stroke-dasharray": "14 12", d: "M760 560 A200 200 0 1 1 1160 560" }, g); draw(cyc, m(11) - 0.4, m(11) + 0.8);
  const pr = pl(g, 960, 1010, "LA DIFFÉRENCE : CE QU'ILS REGARDENT EN PREMIER", { bg: C.ink, fg: C.paper, size: 20 });
  return t => {
    show(head, fade(t, A.s, 0.6)); on(p1, pop(t, m(1) - 0.3) * out(t, m(8) - 0.6)); on(p2, pop(t, m(2) - 0.3) * out(t, m(8) - 0.6));
    place(pig, 960, 560, pop(t, m(1)));
    ae.render(t); as.render(t); show(le, fade(t, m(5) - 0.4)); show(ls, fade(t, m(3) - 0.4));
    const ks = ease(prog(t, m(5) - 0.4, m(5) + 0.6)); spot.setAttribute("cx", lerp(1410, 510, ks)); spot.setAttribute("cy", 600); spot.style.opacity = fade(t, m(3) - 0.2) * 0.9;
    animFlux(fs, t, [1180, 560], [1650, 560], fade(t, m(3)), 0.5);
    animFlux(fe, t, [270, 560], [740, 560], fade(t, m(6) - 0.2), t > m(10) - 0.2 ? 1.1 : 0.45);
    on(dep, pop(t, m(4) - 0.3)); on(cre, pop(t, m(6) - 0.3)); on(pe, pop(t, m(7) - 0.3));
    const vers = t > m(5) - 0.2;
    foule.forEach((f, i) => f.at(t, [[m(3) - 0.3, 860 + i * 100, 1000]], { flip: !vers ? false : true }));
    place(tag, 500, 400, pop(t, m(10) - 0.3) * (1 + 0.15 * Math.sin(prog(t, m(10), m(10) + 1) * Math.PI)), -8);
    on(hs, pop(t, m(9) - 0.3)); hs.g.style.opacity = 1;
    on(pr, pop(t, m(12) - 0.3));
  };
});

// ---- 08 · Faire, garder, multiplier ----
SC("08", "FAIRE, GARDER, MULTIPLIER", (g, A) => {
  const m = A.m, head = title(g, 190, "Trois questions");
  const C3 = [["sprout", "FAIRE", "Comment faire de l'argent ?", ["création de valeur", "compétences", "revenus"], 2, 3],
              ["bouclier", "GARDER", "Comment garder l'argent ?", ["gestion", "protection", "discipline"], 4, 5],
              ["bourse", "MULTIPLIER", "Comment multiplier l'argent ?", ["investissement", "stratégie"], 6, 7]]
    .map(([k, mot, q, subs, kq, ks], i) => {
      const x = 480 + i * 480, b = badge(g, k, mot, "", 110);
      const qq = txt(g, x, 600, q, 32, { font: "Serif", weight: 600 });
      const S = subs.map((s, j) => pl(g, x, 680 + j * 56, s.toUpperCase(), { bg: i === 0 ? C.face : i === 1 ? C.accentSoft : C.accent, size: 18 }));
      return { b, qq, S, kq, ks, x };
    });
  const lev = pl(g, 960, 300, "LES BONS LEVIERS", { bg: C.ink, fg: C.paper, size: 22 });
  const ring = el("ellipse", { ...D.line, stroke: C.accent, "stroke-width": 6, cx: 960, cy: 600, rx: 860, ry: 380 }, g); draw(ring, m(10) - 0.5, m(10) + 0.8);
  const tr = pl(g, 960, 1010, "TA RELATION À L'ARGENT… ET TOUT LE RESTE", { bg: C.accent, size: 22 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    C3.forEach((c, i) => { const bump = t > m(8) - 0.2 ? 1 + 0.08 * Math.max(0, Math.sin(Math.PI * prog(t, m(8) - 0.2 + i * 0.25, m(8) + 0.5 + i * 0.25))) : 1;
      place(c.b, c.x, 400, pop(t, m(c.kq) - 0.4) * bump); show(c.qq, fade(t, m(c.kq) - 0.2));
      c.S.forEach((s, j) => on(s, pop(t, m(c.ks) - 0.4 + j * 0.25))); });
    on(lev, pop(t, m(8) - 0.3) * out(t, m(9) - 0.2) + 0);
    on(tr, pop(t, m(9) - 0.3));
  };
});

// ---- 09 · L'art de s'entourer ----
SC("09", "L'ART DE S'ENTOURER", (g, A) => {
  const m = A.m;
  const cit = big(g, 960, 230, "« Dis-moi avec qui tu traînes, je te dirai qui tu es. »", 44);
  const pos = [[480, 900], [640, 760], [820, 690], [1100, 690], [1280, 760], [1440, 900]];
  const avant = pos.map((p, i) => ({ f: marcheur(g, { vest: i % 2 ? C.paperDeep : C.inkSoft, hair: i % 3 === 0 ? "f" : undefined }, 0.45), lid: i % 2 ? el("rect", { ...D.line, fill: C.ink, width: 90, height: 16, rx: 4 }, g) : null, p }));
  const apres = pos.filter((_, i) => i % 2).map(p => ({ f: marcheur(g, { vest: C.accent }, 0.45), p }));
  const moi = marcheur(g, { vest: C.accent, hair: "f" }, 0.7), halo = el("circle", { fill: C.accentSoft, cx: 960, cy: 820, r: 0 }, g);
  g.insertBefore(halo, moi.guy.g);
  const I = [["TA FAÇON DE PENSER", 2], ["TES CHOIX", 3], ["TES RÉSULTATS", 4]].map(([s, k], i) => ({ p: pl(g, 560 + i * 400, 330, s, { bg: i === 2 ? C.accent : C.face, size: 20 }), k }));
  const pp = pl(g, 960, 400, "DES GENS SANS PLAFOND DANS LA TÊTE", { bg: C.ink, fg: C.paper, size: 20 }), vi = pl(g, 960, 460, "QUI PARTAGENT TA VISION", { size: 20 });
  const dv = pl(g, 960, 1020, "ET TU DEVIENS CE GENRE DE PERSONNE POUR LES AUTRES", { bg: C.accent, size: 20 });
  const pv = pl(g, 960, 330, "PAS BESOIN DE LES CONNAÎTRE EN VRAI", { size: 20 });
  const S = [[livre(g, "DES LIVRES"), 9, 560], [ecran(g, 1), 10, 960], [el("g", {}, g), 11, 1360]].map(([o, k, x]) => ({ o, k, x }));
  [-1, 0, 1].forEach(i => { const h = el("g", {}, S[2].o); el("circle", { ...D.line, fill: i ? C.accentSoft : C.accent, cx: i * 54, cy: -30 + Math.abs(i) * 14, r: 30 }, h); el("path", { ...D.line, fill: i ? C.accentSoft : C.accent, d: `M${i * 54 - 44} ${50} Q${i * 54} ${-10 + Math.abs(i) * 14} ${i * 54 + 44} 50 Z` }, h); });
  const lf = txt(g, 960, 650, "DES FORMATIONS", 22, { weight: 800, ls: 4 }), lc = txt(g, 1360, 650, "DES COMMUNAUTÉS", 22, { weight: 800, ls: 4 });
  return t => {
    show(cit, fade(t, m(1) - 0.6) * out(t, m(2) - 0.6));
    const kR = out(t, m(8) - 0.5);
    moi.at(t, [[A.s + 0.3, 960, 900]], { k: kR, armR: t > m(7) - 0.3 ? -30 : undefined });
    halo.setAttribute("r", 170 * pop(t, m(7) - 0.3) * kR);
    avant.forEach((a, i) => { const ko = a.lid ? out(t, m(5) + 0.3) : 1;
      a.f.at(t, [[m(1) - 0.2 + i * 0.1, a.p[0], a.p[1]]], { k: ko * kR, flip: a.p[0] > 960 });
      if (a.lid) { a.lid.setAttribute("x", a.p[0] - 45); a.lid.setAttribute("y", a.p[1] - 0.45 * 420); a.lid.style.opacity = fade(t, m(5) - 0.5) * ko * kR; } });
    apres.forEach((a, i) => a.f.at(t, [[m(5) + 0.6 + i * 0.15, a.p[0], a.p[1]]], { k: kR, flip: a.p[0] > 960 }));
    I.forEach(c => on(c.p, pop(t, m(c.k) - 0.3) * out(t, m(5) - 0.6)));
    on(pp, pop(t, m(5) - 0.3) * kR); on(vi, pop(t, m(6) - 0.3) * kR); on(dv, pop(t, m(7) - 0.3) * kR);
    on(pv, pop(t, m(8) - 0.2));
    S.forEach(s => place(s.o, s.x, 540, pop(t, m(s.k) - 0.3))); show(lf, fade(t, m(10))); show(lc, fade(t, m(11)));
  };
});

// ---- 10 · Donner pour recevoir ----
SC("10", "DONNER POUR RECEVOIR", (g, A) => {
  const m = A.m, head = title(g, 190, "Donner pour recevoir");
  el("path", { ...D.line, "stroke-width": 4, d: "M200 900 L1720 900" }, g);
  const moi = marcheur(g, { vest: C.accent, hair: "f" }, 0.65), lui = marcheur(g, { vest: C.ink }, 0.65);
  const cad = cadeau(g), liv = livre(g), bulle = el("g", {}, g);
  el("circle", { ...D.line, fill: C.face, r: 60 }, bulle); el("path", { ...D.line, fill: C.accent, d: "M-16 22 Q-34 -6 -18 -30 Q0 -48 18 -30 Q34 -6 16 22 Z M-12 34 L12 34" }, bulle);
  const p1 = pl(g, 640, 330, "APPORTE-LUI DE LA VALEUR", { bg: C.accent, size: 20 }), p2 = pl(g, 1280, 330, "OFFRE TON TEMPS À CEUX QUI T'EN APPORTENT", { size: 20 });
  const p3 = pl(g, 960, 1000, "PAS SEULEMENT EN ARGENT", { bg: C.ink, fg: C.paper, size: 20 });
  const marches = el("path", { ...D.line, fill: C.paperDeep, d: "M300 900 L300 840 L520 840 L520 760 L740 760 L740 680 L960 680 L960 600 L1180 600 L1180 900 Z" }, g);
  const jau = el("g", {}, g); el("rect", { ...D.line, fill: C.face, x: -40, y: -400, width: 80, height: 400, rx: 20 }, jau);
  const niv = el("rect", { ...D.line, fill: C.accent, x: -40, width: 80, rx: 20 }, jau); txt(jau, 0, 46, "TES STANDARDS", 22, { weight: 800, ls: 3 });
  const env = pl(g, 740, 330, "UN ENVIRONNEMENT QUI TE TIRE VERS LE HAUT", { bg: C.accentSoft, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const kA = out(t, m(7) - 0.6);
    const kc = ease(prog(t, m(2) - 0.3, m(2) + 0.9)), kl = ease(prog(t, m(5) - 0.4, m(5) + 0.6));
    place(cad, lerp(720, 1180, kc), 640 - Math.sin(Math.PI * kc) * 160, pop(t, m(2) - 0.4) * 0.6 * kA);
    place(liv, lerp(1200, 740, kl), 640 - Math.sin(Math.PI * kl) * 160, pop(t, m(5) - 0.5) * 0.8 * kA);
    place(bulle, 640, 470, pop(t, m(6) - 0.3) * kA);
    on(p1, pop(t, m(2) - 0.3) * kA); on(p2, pop(t, m(3) - 0.3) * kA); on(p3, pop(t, m(4) - 0.3) * kA);
    lui.at(t, [[m(1) - 0.2, 1280, 900]], { k: kA, flip: true, armR: t > m(5) - 0.5 && t < m(5) + 0.2 ? -20 : undefined });
    marches.style.opacity = fade(t, m(7) - 0.4);
    const st = [[m(7), 400, 840], [m(7) + 0.6, 400, 840], [m(7) + 1.2, 630, 760], [m(7) + 1.8, 850, 680], [m(7) + 2.4, 1070, 600]];
    if (t < m(7) - 0.3) moi.at(t, [[m(1) - 0.2, 640, 900]], { armR: t > m(2) - 0.4 && t < m(2) + 0.3 ? -10 : undefined });
    else moi.at(t, st, { k: 1 });
    on(env, pop(t, m(7) - 0.2));
    place(jau, 1500, 900, pop(t, m(8) - 0.4)); const h = 380 * ease(prog(t, m(8) - 0.2, m(8) + 1.4)) + 20;
    niv.setAttribute("y", -h); niv.setAttribute("height", h);
  };
});

// ---- 11 · Ne consomme jamais ton capital ----
SC("11", "NE CONSOMME JAMAIS TON CAPITAL", (g, A) => {
  const m = A.m;
  const l1 = big(g, 960, 230, "Ta liberté financière ne dépend pas seulement de combien tu gagnes.", 40), l2 = big(g, 960, 300, "Elle dépend surtout de comment tu gères.", 48, C.accent);
  const p1 = big(g, 960, 220, "Ne consomme jamais ton capital.", 56), p2 = pl(g, 960, 290, "SEULEMENT CE QU'IL TE RAPPORTE", { bg: C.accent, size: 22 });
  el("path", { ...D.line, "stroke-width": 4, d: "M200 900 L1720 900" }, g);
  const pileG = Array.from({ length: 10 }, () => coin(g, 46)), pileD = Array.from({ length: 10 }, () => coin(g, 46));
  const mG = txt(g, 560, 970, "4 000 000 €", 34, { font: "Serif", weight: 700 }), mD = txt(g, 1360, 970, "4 000 000 €", 34, { font: "Serif", weight: 700 });
  const hG = pl(g, 560, 420, "MAUVAISE HABITUDE : PIOCHER DEDANS", { size: 18 }), hD = pl(g, 1360, 420, "BONNE HABITUDE : LE FAIRE TRAVAILLER", { bg: C.accentSoft, size: 18 });
  const cal = calendar(g, ""), xG = check(g, false), oD = check(g, true);
  const r1 = pl(g, 1360, 480, "≈ 4 % PAR AN", { size: 18 }), r2 = big(g, 1360, 560, "≈ 160 000 € / an", 44, C.accent), r3 = txt(g, 1360, 610, "un peu plus de 13 000 € par mois, avant impôts", 22, { weight: 600, fill: C.inkSoft });
  const goutte = [0, 1, 2].map(() => coin(g, 18)), tasse = el("path", { ...D.line, fill: C.face, d: "M-50 -50 L50 -50 L40 30 L-40 30 Z" }, g);
  const dil = pl(g, 560, 1030, "DILAPIDER UNE FORTUNE", { bg: C.ink, fg: C.paper, size: 20 }), viv = pl(g, 1360, 1030, "VIVRE DE SES ACTIFS", { bg: C.accent, size: 20 });
  return t => {
    show(l1, fade(t, m(1) - 0.5) * out(t, m(3) - 0.6)); show(l2, fade(t, m(2) - 0.4) * out(t, m(3) - 0.6));
    show(p1, fade(t, m(3) - 0.3)); on(p2, pop(t, m(4) - 0.3));
    const kG = ease(prog(t, m(7) - 0.4, m(8) - 0.3)), nG = 10 - Math.floor(kG * 9);
    pileG.forEach((c, i) => place(c, 560, 870 - i * 24, pop(t, m(5) - 0.4 + i * 0.04) * (i < nG ? 1 : 0)));
    pileD.forEach((c, i) => place(c, 1360, 870 - i * 24, pop(t, m(5) - 0.2 + i * 0.04)));
    show(mG, fade(t, m(5))); show(mD, fade(t, m(5) + 0.2)); mG.textContent = t < m(7) - 0.4 ? "4 000 000 €" : Math.round(4e6 * (1 - kG * 0.9)).toLocaleString("fr-FR").replace(/[  ]/g, " ") + " €";
    on(hG, pop(t, m(6) - 0.3)); on(hD, pop(t, m(8) - 0.3));
    place(cal.g, 330, 700, pop(t, m(7) - 0.3) * 0.7); cal.t.textContent = ["JAN", "FÉV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOÛT", "SEPT", "OCT"][Math.min(9, Math.floor(kG * 9.99))];
    place(xG, 700, 560, pop(t, m(7) + 0.4)); place(oD, 1560, 760, pop(t, m(12) - 0.3));
    on(r1, pop(t, m(9) - 0.3)); show(r2, fade(t, m(10) - 0.3)); show(r3, fade(t, m(11) - 0.3));
    place(tasse, 1600, 890, pop(t, m(11) - 0.4));
    goutte.forEach((c, i) => { const u = (t * 0.7 + i / 3) % 1; place(c, lerp(1420, 1600, u), 700 - Math.sin(Math.PI * u) * 80 + u * 140, fade(t, m(11) - 0.2) * (u > 0.05 && u < 0.92 ? 1 : 0)); });
    on(dil, pop(t, m(13) - 0.3)); on(viv, pop(t, m(14) - 0.3));
  };
});

// ---- 12 · Les bases ----
SC("12", "LES BASES", (g, A) => {
  const m = A.m, head = title(g, 190, "Les bases");
  const L = [["Dépenser moins que ce que tu gagnes", "", 2], ["Surveiller tes comptes", "", 3], ["Investir chaque mois", "la régularité bat le timing parfait", 4, 5], ["Automatiser", "pour enlever l'émotion et la procrastination", 6, 7], ["Faire le point tous les mois", "", 8]]
    .map(([s, sub, k, k2], i) => { const y = 330 + i * 130, c = check(g, true);
      return { c, y, k, k2, t: txt(g, 380, y + 12, s, 40, { anchor: "start", font: "Serif", weight: 600 }), s: sub ? txt(g, 380, y + 52, sub, 22, { anchor: "start", weight: 600, fill: C.inkSoft }) : null }; });
  const cal = calendar(g, ""), pig = el("g", {}, g); D.icons.piggy(el("g", { transform: "scale(1.3)" }, pig));
  const p = coin(g, 22), robot = pl(g, 1500, 860, "AUTOMATIQUE", { bg: C.accent, size: 18 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    L.forEach(l => { place(l.c, 320, l.y, pop(t, m(l.k) - 0.3)); show(l.t, fade(t, m(l.k) - 0.3)); if (l.s) show(l.s, fade(t, m(l.k2) - 0.3)); });
    const kc = fade(t, m(4) - 0.3), mois = Math.floor(Math.max(0, t - m(4)) / 1.1);
    place(cal.g, 1500, 400, kc * 0.9); cal.t.textContent = ["JAN", "FÉV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOÛT", "SEPT", "OCT", "NOV", "DÉC"][mois % 12];
    place(pig, 1500, 700, kc);
    const u = (Math.max(0, t - m(4)) / 1.1) % 1; place(p, 1500, lerp(500, 640, ease(u)), kc * (u < 0.9 ? 1 : 0));
    on(robot, pop(t, m(6) - 0.3));
  };
});
