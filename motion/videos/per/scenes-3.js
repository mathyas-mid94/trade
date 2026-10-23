// Parties 20 à 27 : réinvestir, frais, partenaires, versements, profil et gestion, la force du temps, le but, conclusion.

// ---- 20 · Réinvestir l'économie d'impôt ----
SC("20", "RÉINVESTIR L'ÉCONOMIE D'IMPÔT", (g, A) => {
  const m = A.m, head = title(g, 190, "Réinvestis ce que l'État te rend");
  const brain = pill(g, 960, 290, "J'EN APPELLE À TON INTELLIGENCE", { bg: C.accent, size: 22 });
  const flambe = el("g", {}, g); D.bills(flambe, 3); const no = check(g, false);
  const dests = ["PER", "ASSURANCE VIE", "SCPI", "PEA"].map((s, i) => ({ p: pill(g, 0, 0, s, { bg: C.face, size: 20 }), x: 360 + i * 220 }));
  const fl = flux(g, 4);
  const b1 = el("rect", { ...D.line, fill: C.ink, x: 1180, width: 240, rx: 10 }, g), b2 = el("rect", { ...D.line, fill: C.accent, x: 1180, width: 240, rx: 10 }, g);
  el("path", { ...D.line, d: "M1100 900 L1500 900" }, g);
  const n1 = big(g, 1300, 0, "407 000 €", 40, C.paper), n2 = big(g, 1640, 0, "+ 119 000 €", 44, C.accent), tot = big(g, 1300, 0, "", 64);
  const l35 = pill(g, 600, 820, "3 600 € RÉINVESTIS CHAQUE ANNÉE", { bg: C.ink, fg: C.paper, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); place(brain.g, brain.x, brain.y, pop(t, m(1)) * out(t, m(3)));
    place(flambe, 600, 520, pop(t, m(2) - 0.3) * out(t, m(3) - 0.2) * 1.4, 10 * Math.sin(t * 6)); place(no, 680, 450, pop(t, m(2) + 0.2) * out(t, m(3) - 0.2));
    dests.forEach((d, i) => place(d.p.g, d.x, 560, pop(t, m(4) - 0.4 + i * 0.2)));
    place(l35.g, l35.x, l35.y, pop(t, m(5) - 0.3)); fl(t, m(5), m(5) + 1.2, 600, 760, 1300, 520, 80);
    const h1 = 400 * ease(prog(t, m(7) - 0.5, m(7) + 0.3)), h2 = 117 * ease(prog(t, m(6) - 0.2, m(6) + 0.6)) * (h1 > 0 ? 1 : 0);
    b1.setAttribute("y", 900 - h1); b1.setAttribute("height", h1); b1.style.opacity = h1 > 1 ? 1 : 0; n1.setAttribute("y", 900 - h1 / 2 + 14); n1.style.opacity = h1 > 60 ? 1 : 0;
    b2.setAttribute("y", 900 - h1 - h2); b2.setAttribute("height", h2); b2.style.opacity = h2 > 1 ? 1 : 0;
    n2.setAttribute("y", 900 - h1 - h2 / 2 + 14); n2.style.opacity = fade(t, m(6)) * (h2 > 1 ? 1 : 0);
    tot.setAttribute("y", 900 - h1 - h2 - 30); tot.textContent = t > m(8) - 0.3 ? "526 000 €" : ""; show(tot, fade(t, m(8) - 0.3));
  };
});

// ---- 21 · Les frais ----
SC("21", "LES FRAIS", (g, A) => {
  const m = A.m, head = title(g, 190, "Un PER avec les frais les plus bas");
  const bk = bank(g, "BANQUE", 220); const cher = pill(g, 300, 560, "EN BANQUE, TU PRENDS CHER", { bg: C.face, size: 18 });
  const logo = el("g", {}, g); D.micLogo(logo, 0, 0, 110); const name = txt(g, 330, 600, "Midelton Investment Capital", 24, { font: "Serif", weight: 600, fill: C.inkSoft });
  const L = [ligne(g, "Gestion libre ou pilotée", m(3), 330), ligne(g, "Allocation conseillée sur mesure", m(4), 410), ligne(g, "Assistance fiscale : éviter les erreurs", m(5), 490)];
  const zeros = [["0 %", "FRAIS D'ENTRÉE", 6], ["0 %", "FRAIS DE DOSSIER", 7], ["0 %", "FRAIS D'ARBITRAGE", 8]].map(([a, b, k], i) => {
    const c = card(g, 360, 170, { fill: C.accentSoft }); txt(c, 0, 10, a, 66, { font: "Serif", weight: 700 }); txt(c, 0, 56, b, 19, { weight: 800, ls: 4, fill: C.inkSoft }); return { c, a: m(k), x: 560 + i * 400 };
  });
  const un = pill(g, 1600, 990, "SEULEMENT ≈ 1 % DE FRAIS DE GESTION PAR AN", { bg: C.ink, fg: C.paper, size: 20 });
  return t => {
    const p1 = out(t, m(2) - 0.4);
    show(head, fade(t, m(1) - 0.5));
    place(bk, 300, 440, pop(t, m(1)) * 0.8 * p1); place(cher.g, cher.x, cher.y, pop(t, m(1) + 0.5) * p1);
    place(logo, 330, 440, pop(t, m(2) - 0.2)); show(name, fade(t, m(2)));
    L.forEach(l => place(l.r, 700, l.y, pop(t, l.a - 0.3)));
    zeros.forEach(z => place(z.c, z.x, 760, pop(t, z.a - 0.3)));
    place(un.g, 960, un.y, pop(t, m(9) - 0.3));
  };
});

// ---- 22 · Les partenaires ----
SC("22", "UN RÉSEAU DE PARTENAIRES", (g, A) => {
  const m = A.m, head = title(g, 190, "Un réseau de partenaires de premier plan");
  const logo = el("g", {}, g); D.micLogo(logo, 0, 0, 100);
  const N = ["GENERALI", "SWISS LIFE", "SPIRICA", "SURAVENIR", "UAF LIFE", "MMA", "ERES", "GOODVEST"];
  const nodes = N.map((n, i) => { const a = -Math.PI / 2 + i / N.length * Math.PI * 2, x = 960 + 560 * Math.cos(a), y = 590 + 300 * Math.sin(a);
    const l = el("path", { ...D.line, stroke: C.accent, "stroke-width": 4, "stroke-dasharray": "10 10", d: `M${960 + 120 * Math.cos(a)} ${590 + 110 * Math.sin(a)} L${x} ${y}` }, g);
    draw(l, m(1) + i * 0.1, m(1) + 0.6 + i * 0.1); return { p: pill(g, x, y, n, { bg: C.face, size: 20 }), x, y, a: m(2) - 0.6 + i * 0.12 }; });
  const fit = pill(g, 960, 1000, "LE CONTRAT QUI TE CORRESPOND · CONTRATS LABELLISÉS ET RESPONSABLES", { bg: C.accent, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); place(logo, 960, 590, pop(t, m(1) - 0.3));
    nodes.forEach(n => place(n.p.g, n.x, n.y, pop(t, n.a)));
    place(fit.g, fit.x, fit.y, pop(t, m(3) - 0.3));
  };
});

// ---- 23 · Deux façons de verser ----
SC("23", "DEUX FAÇONS DE VERSER", (g, A) => {
  const m = A.m, head = title(g, 190, "Deux façons de verser");
  const serie = marche(40, 11, 0.6, 0.16);
  const L = courbe(g, 700, 300, serie), R = courbe(g, 700, 300, serie);
  const tl = big(g, 520, 360, "Versement unique", 46), tr = big(g, 1400, 360, "Versements programmés", 46);
  const sl = txt(g, 520, 410, "LUMP SUM", 22, { weight: 800, ls: 6, fill: C.accent }), sr = txt(g, 1400, 410, "DCA", 22, { weight: 800, ls: 6, fill: C.accent });
  const one = coin(g, 30); const dots = serie.filter((_, i) => i % 5 === 0).map(p => ({ c: coin(g, 18), x: 1400 - 350 + p[0] * 700, y: 620 + 150 - p[1] * 300 }));
  const opt = pill(g, 1400, 870, "PARFAIT POUR OPTIMISER TA RÉDUCTION D'IMPÔT", { bg: C.face, size: 18 });
  const lt = pill(g, 520, 870, "SUR LE LONG TERME, TU ES GAGNANT", { bg: C.face, size: 18 });
  const vid = pill(g, 960, 1000, "UNE VIDÉO DÉDIÉE ARRIVE", { bg: C.ink, fg: C.paper, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(L.g, 520, 620, fade(t, m(2) - 0.3)); place(R.g, 1400, 620, fade(t, m(3) - 0.3));
    show(tl, fade(t, m(2) - 0.4)); show(sl, fade(t, m(2))); show(tr, fade(t, m(3) - 0.4)); show(sr, fade(t, m(3)));
    place(one, 520 - 350 + serie[0][0] * 700, 620 + 150 - serie[0][1] * 300, pop(t, m(2)));
    dots.forEach((d, i) => place(d.c, d.x, d.y, pop(t, m(3) + i * 0.15)));
    place(lt.g, lt.x, lt.y, pop(t, m(2) + 0.8)); place(opt.g, opt.x, opt.y, pop(t, m(4) - 0.3)); place(vid.g, vid.x, vid.y, pop(t, m(5) - 0.3));
  };
});

// ---- 24 · Ton profil et ta gestion ----
SC("24", "TON PROFIL, TA GESTION", (g, A) => {
  const m = A.m, head = title(g, 190, "Une gestion à ta mesure");
  const P = [["PRUDENT", "3 à 5 %", 70, 2], ["ÉQUILIBRÉ", "5 à 7 %", 50, 3], ["DYNAMIQUE", "8 à 9 %", 20, 4]].map(([n, r, eur, k], i) => {
    const c = card(g, 460, 360, { fill: i === 2 ? C.ink : C.face }); const dark = i === 2;
    txt(c, 0, -120, n, 32, { weight: 800, ls: 5, fill: dark ? C.accent : C.ink });
    const cv = courbe(c, 360, 100, marche(30, 3 + i, 0.5, 0.06 + 0.1 * i), dark ? C.paper : C.ink); cv.g.setAttribute("transform", "translate(0 -30)");
    el("rect", { ...D.line, "stroke-width": 3, fill: dark ? C.paperDeep : C.inkSoft, x: -180, y: 60, width: 360 * eur / 100, height: 26, rx: 6 }, c);
    el("rect", { ...D.line, "stroke-width": 3, fill: C.accent, x: -180 + 360 * eur / 100, y: 60, width: 360 * (100 - eur) / 100, height: 26, rx: 6 }, c);
    const rt = txt(c, 0, 140, "objectif moyen ≈ " + r + " / an", 24, { weight: 700, fill: dark ? C.paper : C.ink });
    return { c, rt, a: m(k), x: 400 + i * 560 };
  });
  const fe = pill(g, 960, 300, "UN FONDS EUROS POUR PROTÉGER, COMME L'ASSURANCE VIE", { bg: C.face, size: 20 });
  const libre = bloc(g, 640, 200, "Gestion libre", "pas très intéressante sur un PER", { size: 46 }), pilo = bloc(g, 640, 200, "Gestion pilotée", "un peu plus de frais, l'esprit libre", { size: 46, fill: C.accentSoft });
  const x = check(g, false), ok = check(g, true);
  const sg = txt(g, 960, 1010, "Rendements moyens visés sur le long terme, non garantis.", 22, { weight: 500, fill: C.inkSoft });
  return t => {
    const p1 = out(t, m(6) - 0.5);
    show(head, fade(t, m(1) - 0.5) * p1);
    P.forEach(p => { place(p.c, p.x, 620, pop(t, p.a - 0.3) * p1); p.rt.style.opacity = fade(t, m(7) + 0.5); });
    place(fe.g, fe.x, fe.y, pop(t, m(5) - 0.3) * p1);
    place(libre, 560, 560, pop(t, m(6) - 0.2)); place(x, 840, 470, pop(t, m(6) + 0.3));
    place(pilo, 1360, 560, pop(t, m(7) - 0.2)); place(ok, 1640, 470, pop(t, m(7) + 0.3));
    sg.style.opacity = fade(t, m(7) + 0.6);
    if (t > m(7) + 0.5) P.forEach((p, i) => { place(p.c, 400 + i * 560, 860, 0.55 * pop(t, m(7) + 0.4 + i * 0.15)); });
  };
});

// ---- 25 · La force du temps ----
SC("25", "LA FORCE DU TEMPS", (g, A) => {
  const m = A.m, head = title(g, 190, "Le temps, ton meilleur allié");
  const sp = courbe(g, 700, 320, marche(45, 5, 0.75, 0.08)); const sN = big(g, 600, 330, "S&P 500 · ≈ 12 % / an", 40);
  const sub = txt(g, 600, 375, "en moyenne depuis 1980, malgré les krachs", 24, { weight: 500, fill: C.inkSoft });
  const krach = [pill(g, 0, 0, "− 38 %", { bg: C.face, size: 18 }), pill(g, 0, 0, "− 37 %", { bg: C.face, size: 18 })];
  const dbl = [bloc(g, 560, 140, "Impôts économisés", "", { size: 40, fill: C.accentSoft }), bloc(g, 560, 140, "Capital qui se réinvestit", "bloqué jusqu'à la retraite", { size: 40 })];
  const plus = big(g, 1460, 470, "×2", 90, C.accent);
  const X0 = 260, X1 = 1400, Y0 = 880, H = 520, xa = a => X0 + (X1 - X0) * (a - 25) / 40;
  const fv = (a, s) => a <= s ? 0 : 400 * ((1 + 0.05 / 12) ** ((a - s) * 12) - 1) / (0.05 / 12);
  const c25 = el("path", { ...D.line, stroke: C.accent, "stroke-width": 8 }, g), c35 = el("path", { ...D.line, stroke: C.inkSoft, "stroke-width": 8 }, g);
  const axe = el("path", { ...D.line, d: `M${X0} ${Y0} L${X1 + 20} ${Y0}` }, g);
  const n25 = big(g, 1580, 0, "610 000 €", 52, C.accent), n35 = big(g, 1580, 0, "333 000 €", 52, C.inkSoft);
  const l25 = txt(g, 1580, 0, "dès 25 ans", 24, { weight: 700, fill: C.accent }), l35 = txt(g, 1580, 0, "dès 35 ans", 24, { weight: 700, fill: C.inkSoft });
  const gm = pill(g, 960, 1000, "10, 20 OU 30 ANS DEVANT TOI ? C'EST UN GAME CHANGER", { bg: C.ink, fg: C.paper, size: 22 });
  const path = (s, k) => { const pts = []; for (let a = 25; a <= 25 + 40 * k + 1e-6; a += 0.5) pts.push(`${pts.length ? "L" : "M"}${xa(a).toFixed(1)} ${(Y0 - H * fv(a, s) / 610000).toFixed(1)}`); return pts.join(" "); };
  return t => {
    const p1 = out(t, m(5) - 0.5), p2 = out(t, m(8) - 0.5) ;
    show(head, fade(t, m(1) - 0.5));
    place(sp.g, 600, 640, fade(t, m(2) - 0.4) * p1); show(sN, fade(t, m(3) - 0.4) * p1); show(sub, fade(t, m(3)) * p1);
    krach.forEach((k, i) => place(k.g, 600 - 200 + i * 220, 820, pop(t, m(4) - 0.2 + i * 0.3) * p1));
    place(dbl[0], 1300, 560, pop(t, m(6) - 0.3) * p2); place(dbl[1], 1300, 760, pop(t, m(7) - 0.3) * p2); place(plus, 1650, 660, pop(t, m(5) - 0.2) * p2);
    if (t < m(5) - 0.5) place(dbl[0], 1300, 560, 0);
    const k25 = ease(prog(t, m(9) - 0.3, m(10))), k35 = ease(prog(t, m(10), m(11)));
    c25.setAttribute("d", path(25, k25)); c25.style.opacity = k25 > 0 ? 1 : 0; c35.setAttribute("d", path(35, k35)); c35.style.opacity = k35 > 0.25 ? 1 : 0;
    axe.style.opacity = fade(t, m(8) - 0.4);
    n25.setAttribute("y", Y0 - H + 10); l25.setAttribute("y", Y0 - H + 46); n35.setAttribute("y", Y0 - H * 333000 / 610000 + 10); l35.setAttribute("y", Y0 - H * 333000 / 610000 + 46);
    show(n25, fade(t, m(10) - 0.3)); show(l25, fade(t, m(10))); show(n35, fade(t, m(11) - 0.3)); show(l35, fade(t, m(11)));
    place(gm.g, gm.x, gm.y, pop(t, m(12) - 0.3));
  };
});

// ---- 26 · Le but du PER ----
SC("26", "LE BUT DU PER", (g, A) => {
  const m = A.m, head = title(g, 190, "Le but du PER");
  el("path", { ...D.line, d: "M120 880 L1800 880" }, g); el("path", { fill: "none", stroke: C.inkSoft, "stroke-width": 3, "stroke-dasharray": "10 10", d: "M780 300 L780 880" }, g);
  const sans = pill(g, 450, 320, "SANS PER", { bg: C.ink, fg: C.paper, size: 26 }), avec = pill(g, 1290, 320, "AVEC PER", { bg: C.accent, size: 26 });
  const colline = montagne(g, 420, 110, C.paperDeep), everest = montagne(g, 820, 520, C.inkSoft);
  const p1 = member(g, "mathyas", false), p2 = member(g, "mathyas", false);
  const pile = el("g", {}, g); stack(pile, 2, 24); const piles = [0, 1, 2].map(i => { const s = el("g", {}, g); stack(s, 5 + i * 3, 30); return s; });
  const imp = pill(g, 1500, 940, "IMPÔT À LA SORTIE : UNE PETITE PART", { bg: C.face, size: 18 });
  const win = pill(g, 1290, 1010, "LARGEMENT GAGNANT", { bg: C.ink, fg: C.paper, size: 26 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(sans.g, sans.x, sans.y, pop(t, m(2) - 0.3)); place(avec.g, avec.x, avec.y, pop(t, m(4) - 0.3));
    p1.at(t, m(2), 260, 880, { scale: 0.55 }); p2.at(t, m(4), 900, 880, { scale: 0.55 });
    colline.set(ease(prog(t, m(3) - 0.5, m(3) + 0.5))); place(colline.g, 520, 880, fade(t, m(3) - 0.5)); place(pile, 600, 860, pop(t, m(3)));
    everest.set(ease(prog(t, m(5) - 0.3, m(6) + 0.3))); place(everest.g, 1360, 880, fade(t, m(5) - 0.3));
    piles.forEach((p, i) => place(p, 1520 + i * 70, 870, pop(t, m(6) - 0.2 + i * 0.2)));
    place(imp.g, 1600, 560, pop(t, m(7) - 0.3)); place(win.g, win.x, win.y, pop(t, m(8) - 0.3));
  };
});

// ---- 27 · Conclusion ----
SC("27", "CONCLUSION", (g, A) => {
  const m = A.m, head = title(g, 190, "Un outil indispensable, dès que tu paies des impôts", 50);
  const L = [ligne(g, "Réduire tes impôts tout de suite", m(2), 330), ligne(g, "Augmenter la rentabilité de ton épargne", m(3), 420), ligne(g, "Protéger tes proches", m(4), 510), ligne(g, "Préparer sereinement ta retraite", m(5), 600)];
  const h = el("g", {}, g); D.icons.house(h); const kl = cle(g);
  const lp = pill(g, 1480, 760, "LOCATAIRE OU PROPRIÉTAIRE", { bg: C.face, size: 20 });
  const sab = el("g", {}, g); const sI = el("g", { transform: "scale(1.4)" }, sab); D.icons.sablier(sI);
  const form = card(g, 700, 140, { fill: C.ink }); txt(form, 0, -10, "Une question ? Remplis le formulaire", 34, { font: "Serif", weight: 600, fill: C.paper });
  txt(form, 0, 34, "et on construit ta stratégie PER ensemble", 24, { weight: 500, fill: C.accentSoft });
  const me = member(g, "mathyas");
  return t => {
    show(head, fade(t, m(1) - 0.5));
    L.forEach(l => place(l.r, 300, l.y, pop(t, l.a - 0.3)));
    place(h, 1380, 560, pop(t, m(6) - 0.3) * out(t, m(7) - 0.3)); place(kl, 1600, 560, pop(t, m(6)) * out(t, m(7) - 0.3) * 0.8);
    place(lp.g, lp.x, lp.y - 100, pop(t, m(6) - 0.2) * out(t, m(7) - 0.3));
    place(sab, 1480, 520, pop(t, m(7) - 0.3), 180 * ease(prog(t, m(7), m(7) + 1.2)));
    place(form, 760, 880, pop(t, m(8) - 0.3));
    me.at(t, m(8) - 0.6, 1600, 960, { armL: 150, scale: 0.85 });
  };
});
