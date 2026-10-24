// Parties 27 à 35 : crédit à 50 000 €, différé, dans le temps, 100/150 000 €, trois étapes, SCI, combinaison, conclusion.

// ---- 27 · Exemple : 50 000 euros à crédit ----
SC("27", "EXEMPLE : 50 000 € À CRÉDIT", (g, A) => {
  const m = A.m;
  const cer = pl(g, 960, 215, "ON ALLUME LE CERVEAU : 3, 2, 1…", { size: 18 });
  const e1 = bloc(g, 380, 110, "50 000 €", "j'emprunte", { fill: C.ink, size: 52 }), f1 = pl(g, 420, 430, "+ 675 € DE FRAIS = 50 675 €", { size: 18 });
  const e2 = bloc(g, 380, 110, "25 ans", "de crédit", { size: 52 }), f2 = pl(g, 960, 430, "LA DURÉE MAX : LE BRAS DE LEVIER", { size: 18 });
  const e3 = bloc(g, 380, 110, "5,25 %", "de taux", { size: 52 }), f3 = pl(g, 1500, 430, "UN TAUX VOLONTAIREMENT ÉLEVÉ", { size: 18 });
  const ax1 = el("path", { ...D.line, "stroke-width": 5, d: "M380 940 L1000 940" }, g);
  const lo = colonne(g, 540, 940, 200, C.inkSoft), mn = colonne(g, 840, 940, 200, C.ink);
  const tl = txt(g, 540, 985, "loyers SCPI", 22, { weight: 600, fill: C.inkSoft }), tm = txt(g, 840, 985, "mensualité", 22, { weight: 600 });
  const ef = bloc(g, 340, 130, "30 € / mois", "ton effort, hors assurance", { fill: C.accent, size: 48 });
  const ax2 = el("path", { ...D.line, "stroke-width": 5, d: "M1440 940 L1680 940" }, g);
  const pa = colonne(g, 1560, 940, 200, C.accent), ok = pl(g, 1560, 990, "À TOI À LA FIN DU CRÉDIT", { bg: C.ink, fg: C.paper, size: 16 });
  return t => {
    on(cer, pop(t, m(1) - 0.3) * out(t, m(2) - 0.3));
    place(e1, 420, 320, pop(t, m(2) - 0.3)); on(f1, pop(t, m(3) - 0.3)); place(e2, 960, 320, pop(t, m(4) - 0.3)); on(f2, pop(t, m(5) - 0.3));
    place(e3, 1500, 320, pop(t, m(6) - 0.3)); on(f3, pop(t, m(6) + 0.3));
    ax1.style.opacity = fade(t, m(7) - 0.5); ax2.style.opacity = fade(t, m(10) - 0.5);
    lo.set(216 * ease(prog(t, m(7) - 0.3, m(7) + 0.4)), "270 €"); tl.style.opacity = fade(t, m(7) - 0.3);
    mn.set(240 * ease(prog(t, m(8) - 0.3, m(8) + 0.4)), "300 €"); tm.style.opacity = fade(t, m(8) - 0.3);
    place(ef, 1180, 760, pop(t, m(9) - 0.3));
    pa.set(340 * ease(prog(t, m(10) - 0.3, m(10) + 0.5)), "50 000 €"); on(ok, pop(t, m(11) - 0.3));
  };
});

// ---- 28 · Le différé et le courtage ----
SC("28", "LE DIFFÉRÉ ET LE COURTAGE", (g, A) => {
  const m = A.m;
  const dif = pl(g, 960, 260, "UN DIFFÉRÉ, PARTIEL OU TOTAL", { bg: C.ink, fg: C.paper, size: 26 });
  const zero = pl(g, 640, 350, "PAS DE MENSUALITÉ…", { size: 20 }), red = pl(g, 1280, 350, "… OU DES MENSUALITÉS RÉDUITES", { bg: C.accentSoft, size: 20 });
  const M = Array.from({ length: 14 }, (_, i) => { const c = el("g", {}, g); el("rect", { ...D.line, "stroke-width": 3, fill: i < 9 ? C.accentSoft : C.face, x: 270 + i * 100, y: 430, width: 86, height: 86, rx: 10 }, c);
    txt(c, 313 + i * 100, 482, i < 9 ? "217 €" : "300 €", 22, { weight: 700 }); return c; });
  const neuf = pl(g, 715, 570, "9 MOIS À ≈ 217 €", { bg: C.accent, size: 20 }), dj = pl(g, 715, 650, "LE TEMPS DU DÉLAI DE JOUISSANCE", { size: 18 });
  const me = member(g, "mathyas"), crt = pl(g, 1250, 780, "FRAIS DE COURTAGE NÉGOCIÉS", { bg: C.accentSoft, size: 20 }), am = pl(g, 1250, 860, "SURTOUT POUR LES AMIS ET LA FAMILLE", { size: 18 });
  const br = pl(g, 960, 1000, "UNE BRIQUE, DANS UNE STRATÉGIE GLOBALE", { bg: C.ink, fg: C.paper, size: 20 });
  return t => {
    on(dif, pop(t, m(1) - 0.3)); on(zero, pop(t, m(2) - 0.3)); on(red, pop(t, m(3) - 0.3));
    M.forEach((c, i) => { c.style.opacity = fade(t, m(4) - 0.5 + i * 0.05); });
    on(neuf, pop(t, m(4))); on(dj, pop(t, m(5) - 0.3));
    me.at(t, m(6) - 0.5, 1700, 960, { flip: true, armL: 30 }); on(crt, pop(t, m(6) - 0.2)); on(am, pop(t, m(7) - 0.3)); on(br, pop(t, m(8) - 0.3));
  };
});

// ---- 29 · Dans le temps ----
SC("29", "DANS LE TEMPS", (g, A) => {
  const m = A.m, head = title(g, 190, "Dans le temps");
  const cl = pl(g, 960, 270, "COMME L'IMMOBILIER CLASSIQUE", { size: 20 });
  const lo = [], mn = []; for (let i = 0; i <= 40; i++) { const x = i / 40; lo.push([x, 0.42 + 0.16 * x]); mn.push([x, x <= 0.82 ? 0.5 : 0.04]); }
  const cm = K.chart(g, 1160, 520, mn, { color: C.ink, sw: 8 }), cL = K.chart(g, 1160, 520, lo, { color: C.accent, sw: 8, frame: false });
  cm.g.setAttribute("transform", "translate(900 620)"); cL.g.setAttribute("transform", "translate(900 620)");
  draw(cL.line, m(3) - 0.4, m(3) + 1); draw(cm.line, m(5) - 0.4, m(5) + 1);
  const lm = pl(g, 1660, 560, "TA MENSUALITÉ : FIXE", { bg: C.ink, fg: C.paper, size: 18 }), ll = pl(g, 1600, 300, "TES LOYERS PEUVENT PROGRESSER", { bg: C.accent, size: 18 });
  const v = el("path", { ...D.line, stroke: C.inkSoft, "stroke-width": 3, "stroke-dasharray": "10 8", d: "M900 380 L900 860" }, g), vl = pl(g, 900, 330, "10 À 15 ANS : UN REVENU APPARAÎT", { size: 16 });
  const key = cle(g), fin = pl(g, 1300, 950, "FIN DU CRÉDIT : LE BIEN EST À TOI, TOUS LES LOYERS POUR TOI", { bg: C.accentSoft, size: 18 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); on(cl, pop(t, m(2) - 0.3) * out(t, m(7) - 0.5)); cm.g.style.opacity = fade(t, m(3) - 0.5);
    place(key, 1650, 760, pop(t, m(4) - 0.3) * 0.8); on(fin, pop(t, m(4)));
    on(lm, pop(t, m(5) + 0.3)); on(ll, pop(t, m(6) - 0.3));
    v.style.opacity = fade(t, m(7) - 0.3); on(vl, pop(t, m(7) - 0.2));
  };
});

// ---- 30 · Avec 100 000 et 150 000 euros ----
SC("30", "AVEC 100 000 ET 150 000 €", (g, A) => {
  const m = A.m;
  const pg = pl(g, 960, 230, "LA MÊME CHOSE, EN PLUS GRAND", { size: 22 });
  const mk = (x, a, b, c) => { const w = card(g, 640, 430); txt(w, 0, -150, a, 56, { font: "Serif", weight: 700 }); txt(w, 0, -110, "sur 25 ans", 22, { weight: 500, fill: C.inkSoft });
    const r1 = txt(w, 0, -40, b[0], 30, { font: "Serif", weight: 600, fill: C.inkSoft }), r2 = txt(w, 0, 10, b[1], 30, { font: "Serif", weight: 600 });
    const e = card(w, 520, 110, { fill: C.accent }); e.setAttribute("transform", "translate(0 120)"); txt(e, 0, 0, c, 46, { font: "Serif", weight: 700 }); txt(e, 0, 34, "d'effort, hors assurance", 20, { weight: 600 });
    return { w, r1, r2, e, x }; };
  const c1 = mk(520, "100 000 €", ["≈ 541 € de loyers / mois", "≈ 600 € de mensualité"], "≈ 60 € / mois"), c2 = mk(1400, "150 000 €", ["≈ 812 € de loyers / mois", "≈ 898 € de mensualité"], "≈ 87 € / mois");
  const kids = ["leo", "camille"].map(w => member(g, w, false)), tr = pl(g, 520, 820, "UN PATRIMOINE À TRANSMETTRE À TES ENFANTS", { bg: C.accentSoft, size: 16 });
  const p150 = pl(g, 1400, 820, "150 000 € DE PATRIMOINE", { bg: C.ink, fg: C.paper, size: 18 });
  const cap = pl(g, 960, 920, "TOUT DÉPEND DE TA CAPACITÉ D'EMPRUNT", { size: 20 }), hn = pl(g, 960, 1000, "PAS BESOIN D'UNE CAPACITÉ HORS NORME", { bg: C.accent, size: 20 });
  return t => {
    on(pg, pop(t, m(1) - 0.3));
    place(c1.w, 520, 520, pop(t, m(2) - 0.4)); c1.r1.style.opacity = fade(t, m(3) - 0.3); c1.r2.style.opacity = fade(t, m(4) - 0.3); c1.e.style.opacity = fade(t, m(5) - 0.3);
    kids.forEach((k, i) => k.at(t, m(6) - 0.3 + i * 0.15, 90 + i * 70, 1000, { scale: 0.7, k: out(t, m(10) - 0.5) })); on(tr, pop(t, m(6)));
    place(c2.w, 1400, 520, pop(t, m(7) - 0.4)); c2.r1.style.opacity = c2.r2.style.opacity = fade(t, m(7)); c2.e.style.opacity = fade(t, m(8) - 0.3); on(p150, pop(t, m(9) - 0.3));
    on(cap, pop(t, m(10) - 0.3)); on(hn, pop(t, m(11) - 0.3));
  };
});

// ---- 31 · Les trois étapes ----
SC("31", "LES TROIS ÉTAPES", (g, A) => {
  const m = A.m, head = title(g, 190, "En pratique : trois étapes");
  const ax = el("path", { ...D.line, "stroke-width": 4, d: "M240 660 L1700 660" }, g);
  const N = [1, 2, 3].map(i => { const w = el("g", {}, g); el("circle", { ...D.line, fill: C.face, r: 50 }, w); txt(w, 0, 16, String(i), 46, { font: "Serif", weight: 700 }); return w; });
  const T = [["Le différé de crédit", 420, 2], ["Le délai de jouissance", 960, 4], ["Le régime de croisière", 1500, 6]].map(([s, x, k]) => ({ t: txt(g, x, 470, s, 32, { font: "Serif", weight: 600 }), x, k }));
  const d = el("rect", { ...D.line, fill: C.accent, x: 320, y: 660, width: 200, height: 60, rx: 8 }, g), dt = pl(g, 420, 820, "TU NE PAIES QUE LES INTÉRÊTS OU L'ASSURANCE", { size: 14 });
  const l = el("rect", { ...D.line, fill: C.ink, x: 860, y: 580, width: 200, height: 80, rx: 8 }, g), lt = pl(g, 960, 820, "TES PREMIERS LOYERS", { size: 16 });
  const s1 = el("rect", { ...D.line, fill: C.ink, x: 1400, y: 560, width: 200, height: 100, rx: 8 }, g), s2 = el("rect", { ...D.line, fill: C.accent, x: 1400, y: 660, width: 200, height: 110, rx: 8 }, g);
  const sl = txt(g, 1500, 620, "loyers", 24, { weight: 700, fill: C.paper }), sm = txt(g, 1500, 725, "mensualités", 24, { weight: 700 });
  const ef = pl(g, 1500, 860, "TON PETIT EFFORT FAIT LE RESTE", { bg: C.accentSoft, size: 16 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); ax.style.opacity = fade(t, m(1) - 0.3);
    N.forEach((n, i) => place(n, 420 + i * 540, 370, pop(t, m(2 + i * 2) - 0.4))); T.forEach(o => show(o.t, fade(t, m(o.k) - 0.2)));
    d.style.opacity = fade(t, m(2)); on(dt, pop(t, m(3) - 0.3));
    l.style.opacity = fade(t, m(4)); on(lt, pop(t, m(5) - 0.3));
    s1.style.opacity = s2.style.opacity = sl.style.opacity = sm.style.opacity = fade(t, m(6)); on(ef, pop(t, m(7) - 0.3));
  };
});

// ---- 32 · SCI, holding, démembrement ----
SC("32", "SCI, HOLDING, DÉMEMBREMENT", (g, A) => {
  const m = A.m;
  const sci = bloc(g, 380, 120, "Ta SCI", "déjà créée ou à créer", { fill: C.ink, size: 52 }), parts = [0, 1, 2].map(i => pl(g, 0, 0, "PARTS DE SCPI", { bg: C.accentSoft, size: 16 }));
  const is = pl(g, 500, 640, "IMPOSÉ À L'IMPÔT SUR LES SOCIÉTÉS", { size: 18 }), ok = pl(g, 500, 720, "ÇA PEUT ÊTRE TRÈS INTÉRESSANT", { bg: C.accent, size: 18 });
  const hold = bloc(g, 380, 120, "Une holding", "", { size: 46 });
  const nue = el("g", {}, g); el("rect", { ...D.line, fill: C.inkSoft, x: -160, y: -50, width: 160, height: 100, rx: 10 }, nue); txt(nue, -80, 10, "NUE-PROPRIÉTÉ", 18, { weight: 800, fill: C.paper });
  const usu = el("g", {}, g); el("rect", { ...D.line, fill: C.accent, x: 0, y: -50, width: 160, height: 100, rx: 10 }, usu); txt(usu, 80, 10, "USUFRUIT", 18, { weight: 800 });
  const dm = pl(g, 1400, 610, "LE DÉMEMBREMENT", { size: 20 }), tra = pl(g, 1400, 880, "POUR PRÉPARER UNE TRANSMISSION", { size: 16 });
  const priv = pl(g, 960, 1000, "ÇA SE VOIT EN PRIVÉ : ÇA DÉPEND DE TA SITUATION", { bg: C.ink, fg: C.paper, size: 18 });
  return t => {
    place(sci, 500, 420, pop(t, m(1) - 0.3));
    parts.forEach((p, i) => { const k = ease(prog(t, m(2) - 0.3 + i * 0.25, m(2) + 0.6 + i * 0.25)); place(p.g, lerp(140, 500, k), lerp(260 + i * 50, 420, k), (k > 0 && k < 0.98 ? 1 : 0)); });
    on(is, pop(t, m(3) - 0.3)); on(ok, pop(t, m(4) - 0.3));
    place(hold, 1400, 420, pop(t, m(5) - 0.3)); on(dm, pop(t, m(6) - 0.3));
    const s = 60 * ease(prog(t, m(7) - 0.3, m(7) + 0.5)); place(nue, 1400 - s, 760, pop(t, m(6))); place(usu, 1400 + s, 760, pop(t, m(6))); on(tra, pop(t, m(7) + 0.3));
    on(priv, pop(t, m(8) - 0.3));
  };
});

// ---- 33 · Combiner le cash et le crédit ----
SC("33", "COMBINER LE CASH ET LE CRÉDIT", (g, A) => {
  const m = A.m, head = title(g, 190, "Ma stratégie préférée : combiner les deux");
  const c1 = card(g, 560, 300); txt(c1, 0, -80, "En cash : 50 000 €", 40, { font: "Serif", weight: 700 }); const r1 = txt(c1, 0, 20, "≈ 270 € / mois de loyers", 32, { font: "Serif", weight: 600, fill: C.accent });
  const c2 = card(g, 640, 300, { fill: C.ink }); txt(c2, 0, -80, "À crédit : 100 000 €", 40, { font: "Serif", weight: 700, fill: C.paper });
  const R2 = [["mensualité ≈ 610 €", 5], ["loyers ≈ 540 €", 6], ["effort ≈ 70 € / mois", 7]].map(([s, k], i) => ({ t: txt(c2, 0, -20 + i * 50, s, 30, { font: "Serif", weight: 600, fill: i === 2 ? C.accent : C.accentSoft }), k }));
  const ar = arrow(g, 780, 560, 1100, 560, m(8) - 0.4, m(8) + 0.2, { bend: -40 }), ap = pl(g, 940, 650, "TES 270 € PAIENT LES 70 €", { size: 18 });
  const res = bloc(g, 600, 130, "+ 200 € / mois", "il te reste, sans effort d'épargne", { fill: C.accent, size: 60 });
  const p150 = pl(g, 960, 905, "ET UN PATRIMOINE DE 150 000 €", { bg: C.ink, fg: C.paper, size: 20 });
  const auj = pl(g, 560, 960, "AUJOURD'HUI : UN REVENU", { size: 18 }), dem = pl(g, 1360, 960, "DEMAIN : UN CAPITAL", { size: 18 });
  const av = pl(g, 820, 1030, "ASSURANCE VIE", { bg: C.accentSoft, size: 16 }), pea = pl(g, 1100, 1030, "PEA…", { bg: C.accentSoft, size: 16 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(c1, 480, 480, pop(t, m(2) - 0.4)); r1.style.opacity = fade(t, m(3) - 0.3);
    place(c2, 1420, 480, pop(t, m(4) - 0.4)); R2.forEach(r => r.t.style.opacity = fade(t, m(r.k) - 0.3));
    ar.render(t); on(ap, pop(t, m(8)));
    place(res, 960, 790, pop(t, m(9) - 0.3)); on(p150, pop(t, m(11) - 0.3));
    on(auj, pop(t, m(12) - 0.3)); on(dem, pop(t, m(13) - 0.3)); on(av, pop(t, m(14) - 0.3)); on(pea, pop(t, m(15) - 0.3));
  };
});

// ---- 34 · Conclusion ----
SC("34", "CONCLUSION", (g, A) => {
  const m = A.m, head = title(g, 190, "La SCPI, en résumé");
  const ti = pl(g, 960, 270, "UN PEU LONGUE À EXPLIQUER… MAIS TRÈS INTÉRESSANTE", { bg: C.accentSoft, size: 18 });
  const L = [["Des revenus passifs dès aujourd'hui", 3], ["Une épargne plus rentable", 4], ["Tes proches sécurisés", 5], ["Ta retraite préparée", 6]].map(([s, k], i) => ligne(g, s, m(k), 380 + i * 95, true, 36));
  const st = stack(g, 5, 40), cinq = pl(g, 1450, 620, "DÈS 5 000 €", { bg: C.accent, size: 26 }), dix = pl(g, 1450, 700, "10 € DE PLUS, C'EST 10 € POUR TOI", { size: 16 });
  const dir = K.house(g, 1.2), dq = pl(g, 420, 760, "L'IMMOBILIER EN DIRECT ?", { size: 18 });
  const me = member(g, "mathyas"), spt = pl(g, 960, 330, "UN MEC SANS PRISE DE TÊTE", { bg: C.ink, fg: C.paper, size: 22 }), x = check(g, false), gl = pl(g, 420, 860, "GÉRER LES LOCATAIRES", { size: 18 });
  const W = ["J'INVESTIS", "JE LAISSE DORMIR", "J'ENCAISSE"].map((s, i) => pl(g, 1450, 420 + i * 85, s, { bg: i === 2 ? C.accent : C.face, size: 24 }));
  const ri = pl(g, 1350, 760, "LE RÉINVESTIR", { size: 20 }), de = pl(g, 1600, 760, "LE DÉPENSER", { size: 20 });
  return t => {
    const p1 = out(t, m(8) - 0.5);
    show(head, fade(t, m(1) - 0.5) * p1); on(ti, pop(t, m(2) - 0.3) * p1);
    L.forEach(l => place(l.r, 260, l.y, pop(t, l.a - 0.3) * p1));
    place(st, 1450, 520, pop(t, m(7) - 0.4) * p1); on(cinq, pop(t, m(7) - 0.2) * p1); on(dix, pop(t, m(7) + 0.4) * p1);
    place(dir, 420, 600, pop(t, m(8) - 0.3) * 1.2); on(dq, pop(t, m(8)));
    me.at(t, m(9) - 0.4, 960, 900); on(spt, pop(t, m(9) - 0.2)); place(x, 230, 860, pop(t, m(10) - 0.2) * 0.8); on(gl, pop(t, m(10) - 0.3));
    W.forEach((w, i) => on(w, pop(t, m(11) - 0.3 + i * 0.35)));
    on(ri, pop(t, m(12) - 0.3)); on(de, pop(t, m(13) - 0.3));
  };
});

// ---- 35 · On en parle ? ----
SC("35", "ON EN PARLE ?", (g, A) => {
  const m = A.m;
  const rap = bloc(g, 520, 100, "Un dernier rappel", "", { fill: C.ink, size: 40 });
  const ng = pl(g, 480, 440, "CAPITAL ET REVENUS NON GARANTIS", { bg: C.accent, size: 18 }), hz = pl(g, 480, 520, "AU MOINS 8 À 10 ANS", { size: 20 });
  const ec = ecran(g, 1), site = pl(g, 1400, 560, "SUR LE SITE : MON PORTEFEUILLE FAVORI DE SCPI", { bg: C.accentSoft, size: 18 });
  const lab = el("g", {}, g); txt(lab, 0, -10, "PORTEFEUILLE", 18, { weight: 800, ls: 3 }); txt(lab, 0, 16, "FAVORI", 18, { weight: 800, ls: 3, fill: C.accent });
  const mail = pl(g, 960, 680, "REVIENS VERS MOI : PAR MAIL OU PAR MESSAGE", { bg: C.ink, fg: C.paper, size: 20 });
  const S = [["TA SITUATION", 420, 780, 6], ["LE CHOIX DES SCPI", 960, 780, 7], ["TA STRATÉGIE", 1500, 780, 8], ["POUR AUJOURD'HUI OU PLUS TARD", 690, 860, 9], ["POUR TOI OU TES ENFANTS", 1230, 860, 10]].map(([s, x, y, k], i) => ({ p: pl(g, x, y, s, { bg: i < 3 ? C.face : C.accentSoft, size: 18 }), k }));
  const fl = [arrow(g, 560, 780, 800, 780, m(7) - 0.4, m(7) - 0.1, { w: 5 }), arrow(g, 1120, 780, 1360, 780, m(8) - 0.4, m(8) - 0.1, { w: 5 })];
  const merci = pl(g, 960, 960, "MERCI D'AVOIR ÉCOUTÉ JUSQU'AU BOUT", { size: 20 }), proc = big(g, 960, 1040, "On se retrouve pour un prochain investissement", 40);
  return t => {
    place(rap, 480, 330, pop(t, m(1) - 0.3)); on(ng, pop(t, m(2) - 0.3)); on(hz, pop(t, m(3) - 0.3));
    place(ec, 1400, 380, pop(t, m(4) - 0.4) * 1.5); place(lab, 1400, 350, pop(t, m(4) - 0.1)); on(site, pop(t, m(4)));
    on(mail, pop(t, m(5) - 0.3)); S.forEach(s => on(s.p, pop(t, m(s.k) - 0.3))); fl.forEach(f => f.render(t));
    on(merci, pop(t, m(11) - 0.3)); show(proc, fade(t, m(12) - 1.2));
  };
});
