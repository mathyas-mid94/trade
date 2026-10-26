// Parties 06 à 10 : pourquoi le prix baisse, le retour à 100, perdant sur le papier, les deux conditions, le thermomètre.

// ---- 06 · Pourquoi le prix baisse ----
SC("06", "POURQUOI LE PRIX BAISSE", (g, A) => {
  const m = A.m, head = title(g, 190, "Pourquoi le prix baisse");
  const a = titre(g, 1.8), b = titre(g, 1.8);
  const la = pl(g, 520, 700, "TON OBLIGATION · 4 %", { size: 22 }), lb = pl(g, 1400, 700, "LES NOUVELLES · 6 %", { bg: C.accent, size: 22 });
  const up = pl(g, 960, 300, "LES TAUX MONTENT ↑", { bg: C.ink, fg: C.paper, size: 22 });
  const tag = prix(g, "100 €"), non = check(g, false), oui = check(g, true);
  const ach = marcheur(g, { vest: C.inkSoft }, 0.6);
  const mieux = pl(g, 960, 420, "ON TROUVE MIEUX À CÔTÉ", { size: 20 }), autant = pl(g, 520, 770, "ELLE RAPPORTE ≈ 6 % AUSSI", { bg: C.accentSoft, size: 20 });
  const bal = balancoire(g, 300), rec = pl(g, 1420, 980, "TAUX EN HAUT, PRIX EN BAS", { bg: C.ink, fg: C.paper, size: 22 });
  return t => {
    show(head, fade(t, A.s, 0.6));
    const kA = out(t, m(8) - 0.6);
    place(a.g, 520, 500, pop(t, m(1) - 0.4) * kA); place(b.g, 1400, 500, pop(t, m(3) - 0.4) * kA);
    on(la, pop(t, m(1) - 0.2) * kA); on(lb, pop(t, m(3) - 0.2) * kA); on(up, pop(t, m(2) - 0.3) * kA);
    place(tag, 560, 300, pop(t, m(4) - 0.4) * kA, -8);
    defile(tag.lastElementChild, 100, 92, ease(prog(t, m(6) - 0.2, m(7))), " €");
    place(non, 720, 270, pop(t, m(4)) * out(t, m(6) - 0.2) * kA); place(oui, 720, 270, pop(t, m(7)) * kA);
    ach.at(t, [[m(4) - 0.6, 1700, 960], [m(4) + 0.6, 960, 960]], { k: kA, flip: true, armR: t > m(7) ? -30 : undefined });
    on(mieux, pop(t, m(5) - 0.3) * kA); on(autant, pop(t, m(7) - 0.3) * kA);
    bal.g.setAttribute("transform", `translate(700 900) scale(${0.6 * pop(t, m(8) - 0.3)})`); bal.set(12 * ease(prog(t, m(8), m(9))));
    on(rec, pop(t, m(9) - 0.3));
  };
});

// ---- 07 · Le retour à 100 (pull to par) ----
SC("07", "LE RETOUR À 100", (g, A) => {
  const m = A.m, head = title(g, 190, "Le retour à 100");
  const X0 = 300, X1 = 1600, Yv = v => 400 + (100 - v) * 16;   // 16 px par euro
  el("path", { ...D.line, stroke: C.inkSoft, "stroke-width": 3, d: `M${X0} 780 L${X1 + 60} 780` }, g);
  const ref = el("path", { ...D.line, stroke: C.inkSoft, "stroke-width": 3, "stroke-dasharray": "14 12", d: `M${X0} ${Yv(100)} L${X1} ${Yv(100)}` }, g);
  el("path", { ...D.line, stroke: C.inkSoft, "stroke-width": 2, "stroke-dasharray": "4 8", d: `M${X1} ${Yv(100)} L${X1} 780` }, g);
  txt(g, X0, 820, "aujourd'hui", 24, { weight: 600, fill: C.inkSoft }); txt(g, X1, 820, "échéance", 24, { weight: 600, fill: C.inkSoft });
  const vC = u => 100 - 9 * Math.pow(Math.sin(Math.PI * u), 1.3), vZ = u => 80 + 20 * Math.pow(u, 1.25);
  const cC = trace(g, courbeXY(X0, X1, u => Yv(vC(u)), 120), { color: C.ink, dot: C.ink, r: 15 });
  const cZ = trace(g, courbeXY(X0, X1, u => Yv(vZ(u)), 120), { color: C.accent, dot: C.accent, r: 13 });
  const val = big(g, 0, 0, "", 40), ach = txt(g, X0, Yv(100) - 30, "achat 100 €", 26, { weight: 800 }), achZ = txt(g, X0, Yv(80) + 50, "achat 80 €", 26, { weight: 800, fill: C.accent });
  const imp = pl(g, 960, 290, "LE POINT LE PLUS IMPORTANT DE LA VIDÉO", { bg: C.accent, size: 22 });
  const mont = pl(g, 640, 640, "LES TAUX MONTENT", { size: 20 });
  const fin = el("circle", { ...D.line, "stroke-width": 8, fill: C.face, cx: X1, cy: Yv(100), r: 0 }, g), lr = big(g, X1 - 20, Yv(100) - 40, "100 € remboursés", 40);
  const cent = big(g, 960, 300, "Pas 91. Cent.", 64), ptp = pl(g, 960, 980, "LE « PULL TO PAR » : LE RETOUR AU PRIX DE REMBOURSEMENT", { bg: C.ink, fg: C.paper, size: 22 });
  const fl = [0.3, 0.45, 0.6, 0.75].map(() => el("path", { ...D.line, stroke: C.accent, "stroke-width": 5 }, g));
  return t => {
    show(head, fade(t, A.s, 0.6)); on(imp, pop(t, m(1) - 0.3) * out(t, m(3) - 0.3));
    const k = t < m(4) ? 0.5 * ease(prog(t, m(2) - 0.1, m(4))) : t < m(6) ? lerp(0.5, 0.8, ease(prog(t, m(5) - 0.4, m(6)))) : lerp(0.8, 1, ease(prog(t, m(6), m(7))));
    const [x, y] = cC.set(Math.max(0.001, k)); cC.dot.style.opacity = fade(t, m(2) - 0.4);
    val.setAttribute("x", x); val.setAttribute("y", y + 70); val.textContent = Math.round(vC(Math.max(0, (x - X0) / (X1 - X0)))) + " €"; show(val, fade(t, m(2)) * out(t, m(7) - 0.2));
    show(ach, fade(t, m(2) - 0.3)); on(mont, pop(t, m(3) - 0.3) * out(t, m(5)));
    fin.setAttribute("r", 26 * pop(t, m(7) - 0.2)); show(lr, fade(t, m(7) - 0.1));
    show(cent, fade(t, m(8) - 0.3) * out(t, m(11) - 0.4)); on(ptp, pop(t, m(9) - 0.3));
    fl.forEach((f, i) => { const u = [0.3, 0.45, 0.6, 0.75][i], xx = lerp(X0, X1, u), yy = Yv(vC(u)), kk = fade(t, m(10) - 0.4 + i * 0.15), b = 10 * Math.sin(t * 4 + i);
      f.setAttribute("d", `M${xx} ${yy - 16} L${xx} ${Yv(100) + 14 + b} M${xx - 12} ${Yv(100) + 28 + b} L${xx} ${Yv(100) + 14 + b} L${xx + 12} ${Yv(100) + 28 + b}`); f.style.opacity = kk * (yy - Yv(100) > 40 ? 1 : 0); });
    cZ.set(ease(prog(t, m(11) - 0.3, m(12) + 1.2))); show(achZ, fade(t, m(12) - 0.3));
    ref.setAttribute("stroke-width", 3 + 4 * Math.max(0, Math.sin(Math.PI * prog(t, m(8) - 0.3, m(8) + 0.9))));
  };
});

// ---- 08 · Perdant sur le papier, gagnant à l'arrivée ----
SC("08", "PERDANT SUR LE PAPIER, GAGNANT À L'ARRIVÉE", (g, A) => {
  const m = A.m, head = title(g, 190, "Perdant sur le papier, gagnant à l'arrivée");
  const me = marcheur(g, { vest: C.accent }, 0.55);
  const pan = pl(g, 520, 300, "BEAUCOUP DE GENS PANIQUENT ICI", { size: 20 });
  const rel = releve(g), per = pl(g, 520, 760, "PERDANT… SUR LE PAPIER", { bg: C.ink, fg: C.paper, size: 22 }), vl = pl(g, 520, 820, "POUR UN FONDS : LA VALEUR LIQUIDATIVE", { size: 18 });
  const fl = arrow(g, 840, 520, 1040, 520, m(7) - 0.4, m(7) + 0.3), gard = pl(g, 940, 450, "SI TU GARDES", { bg: C.accent, size: 20 });
  const cps = [0, 1, 2, 3, 4].map(() => coin(g, 34)), lan = [1, 2, 3, 4, 5].map(i => txt(g, 1120 + (i - 1) * 120, 410, "an " + i, 22, { weight: 700, fill: C.inkSoft }));
  const s20 = big(g, 1360, 550, "4 € × 5 = 20 €", 44, C.accent);
  const pile = [0, 1, 2, 3, 4, 5].map(() => coin(g, 44)), s100 = big(g, 1560, 690, "+ 100 €", 48);
  const tot = big(g, 1360, 840, "= 120 €", 84, C.ink), prev = pl(g, 1360, 910, "POUR 100 € PRÊTÉS : EXACTEMENT CE QUI ÉTAIT PRÉVU", { bg: C.accentSoft, size: 18 }), ok = check(g, true);
  const eff = pl(g, 520, 760, "LA BAISSE S'EFFACE EN APPROCHANT DE L'ÉCHÉANCE", { bg: C.accentSoft, size: 18 });
  const occ = pl(g, 700, 980, "TU AS RATÉ UNE OCCASION…", { size: 22 }), pas = pl(g, 1260, 980, "… PAS PERDU D'ARGENT", { bg: C.accent, size: 22 });
  return t => {
    show(head, fade(t, A.s, 0.6));
    const panic = t > m(1) - 0.3 && t < m(7) - 0.3;
    me.at(t, [[m(1) - 0.4, 150, 1000]], { armL: panic ? 230 + 8 * Math.sin(t * 9) : undefined, armR: panic ? -50 - 8 * Math.sin(t * 9) : undefined });
    on(pan, pop(t, m(1) - 0.3) * out(t, m(7) - 0.4));
    place(rel.g, 520, 540, pop(t, m(2) - 0.4));
    const kv = t < m(13) - 0.3 ? ease(prog(t, m(3) - 0.3, m(3) + 0.6)) : 1 - ease(prog(t, m(13) - 0.3, m(14)));
    defile(rel.val, 100, 91, kv, " €"); rel.delta.textContent = "−9 %"; rel.delta.style.opacity = fade(t, m(4) - 0.3) * (1 - ease(prog(t, m(13) - 0.3, m(13) + 0.5)));
    on(per, pop(t, m(5) - 0.3) * out(t, m(13) - 0.5)); on(vl, pop(t, m(6) - 0.3) * out(t, m(13) - 0.5)); on(eff, pop(t, m(14) - 0.3) * out(t, m(15) - 0.5));
    fl.render(t); on(gard, pop(t, m(7) - 0.2));
    cps.forEach((c, i) => place(c, 1120 + i * 120, 460, pop(t, m(8) - 0.3 + i * 0.3))); lan.forEach((l, i) => show(l, fade(t, m(8) - 0.3 + i * 0.3)));
    show(s20, fade(t, m(9) - 0.3));
    pile.forEach((c, i) => place(c, 1360, 730 - i * 22, pop(t, m(10) - 0.4 + i * 0.06))); show(s100, fade(t, m(10)));
    show(tot, fade(t, m(11) - 0.3)); on(prev, pop(t, m(12) - 0.3)); place(ok, 1640, 815, pop(t, m(12) - 0.1));
    on(occ, pop(t, m(15) - 0.3)); on(pas, pop(t, m(16) - 0.3));
  };
});

// ---- 09 · Les deux vraies conditions ----
SC("09", "LES DEUX VRAIES CONDITIONS", (g, A) => {
  const m = A.m, head = title(g, 190, "Deux conditions");
  const car_ = pl(g, 960, 290, "JE VEUX ÊTRE CARRÉ LÀ-DESSUS", { size: 20 });
  const c1 = card(g, 680, 420, { fill: C.face }), c2 = card(g, 680, 420, { fill: C.face });
  txt(c1, 0, -150, "1. L'emprunteur rembourse", 40, { font: "Serif", weight: 700 }); txt(c2, 0, -150, "2. Tu gardes jusqu'au bout", 40, { font: "Serif", weight: 700 });
  const bq = bank(c1, "EMPRUNTEUR", 220); bq.setAttribute("transform", "translate(0 60) scale(0.62)");
  const crack = el("path", { ...D.line, stroke: C.accent, "stroke-width": 7, d: "M-40 -80 L-10 -20 L-36 20 L4 90" }, c1), xx = check(c1, false);
  const sab = el("g", { transform: "translate(-120 20) scale(1.1)" }, c2); D.icons.sablier(sab);
  const tg = prix(c2, "91 €"); tg.setAttribute("transform", "translate(140 20) rotate(-8)");
  const def = pl(g, 480, 820, "DÉFAUT = LA PROMESSE NE VAUT PLUS RIEN", { size: 18 }), cho = pl(g, 480, 880, "BIEN CHOISIR À QUI TU PRÊTES", { bg: C.accent, size: 20 });
  const rev = pl(g, 1440, 820, "REVENDRE AVANT = PRIX DU JOUR", { size: 18 }), vra = pl(g, 1440, 880, "LA BAISSE DEVIENT UNE VRAIE PERTE", { bg: C.ink, fg: C.paper, size: 20 });
  const ban = card(g, 1640, 110, { fill: C.ink }), b1 = txt(ban, 0, -8, "Une baisse en cours de route n'est pas une perte…", 34, { font: "Serif", weight: 600, fill: C.paper });
  const b2 = txt(ban, 0, 34, "si l'emprunteur rembourse, et si tu tiens jusqu'à l'échéance.", 26, { weight: 600, fill: C.accentSoft });
  return t => {
    show(head, fade(t, A.s, 0.6)); on(car_, pop(t, m(1) - 0.3) * out(t, m(2) - 0.3));
    place(c1, 480, 520, pop(t, m(2) - 0.4)); place(c2, 1440, 520, pop(t, m(5) - 0.4));
    const kc = ease(prog(t, m(3) - 0.3, m(3) + 0.4)); crack.style.opacity = kc; crack.setAttribute("stroke-dasharray", `${300 * kc} 400`);
    xx.setAttribute("transform", `translate(160 -40) scale(${pop(t, m(3))})`); xx.style.opacity = t > m(3) ? 1 : 0;
    sab.firstElementChild && sab.setAttribute("transform", `translate(-120 20) scale(1.1) rotate(${180 * ease(prog(t, m(5), m(5) + 1.2))})`);
    tg.style.opacity = fade(t, m(6) - 0.3);
    on(def, pop(t, m(3) - 0.1) * out(t, m(8) - 0.5)); on(cho, pop(t, m(4) - 0.3) * out(t, m(8) - 0.5));
    on(rev, pop(t, m(6) - 0.1) * out(t, m(8) - 0.5)); on(vra, pop(t, m(7) - 0.3) * out(t, m(8) - 0.5));
    place(ban, 960, 860, pop(t, m(8) - 0.3)); show(b2, fade(t, m(9) - 0.3));
  };
});

// ---- 10 · Le taux sans risque : le thermomètre ----
SC("10", "LIRE LE MARCHÉ", (g, A) => {
  const m = A.m, head = title(g, 190, "Le taux sans risque : le thermomètre");
  const th = thermo(g), lt = txt(g, 450, 360, "TAUX DE DÉPÔT DE LA B.C.E.", 22, { weight: 800, ls: 4, fill: C.inkSoft });
  const val = big(g, 450, 470, "2,50 %", 100), sr = txt(g, 450, 530, "à court terme, sans risque", 24, { weight: 600, fill: C.inkSoft });
  const plc = pl(g, 450, 600, "LE PLANCHER", { bg: C.ink, fg: C.paper, size: 22 });
  const box = card(g, 1060, 560, { fill: C.face }); txt(box, -500, -236, "Taux de dépôt de la B.C.E., 2019 → 2026", 26, { anchor: "start", weight: 800 });
  const Xy = y => 780 + (y - 2019) / 7.9 * 920, Yr = r => 740 - r * 80;
  el("path", { ...D.line, stroke: C.inkSoft, "stroke-width": 2, "stroke-dasharray": "6 8", d: `M780 ${Yr(0)} L1700 ${Yr(0)}` }, g);
  const zero = txt(g, 760, Yr(0) + 8, "0 %", 20, { anchor: "end", weight: 700, fill: C.inkSoft });
  const ans = [2019, 2021, 2023, 2025].map(y => txt(g, Xy(y), 830, String(y), 22, { weight: 600, fill: C.inkSoft }));
  const D_ = [[2019, -0.4], [2019.7, -0.5], [2022.55, 0], [2022.7, 0.75], [2022.85, 1.5], [2022.97, 2], [2023.1, 2.5], [2023.2, 3], [2023.35, 3.25], [2023.45, 3.5], [2023.6, 3.75], [2023.7, 4], [2024.45, 3.75], [2024.7, 3.5], [2024.8, 3.25], [2024.95, 3], [2025.1, 2.75], [2025.2, 2.5], [2025.3, 2.25], [2025.45, 2], [2026.3, 2.25], [2026.6, 2.5], [2026.9, 2.5]];
  const pts = []; D_.forEach(([y, r], i) => { if (i) pts.push([Xy(y), Yr(D_[i - 1][1])]); pts.push([Xy(y), Yr(r)]); });
  const cb = trace(g, pts, { color: C.ink, dot: C.accent, w: 7, r: 13 });
  const Lc = [0]; for (let i = 1; i < pts.length; i++) Lc.push(Lc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const kX = x => { const i = pts.findIndex(p => p[0] >= x); return (i < 0 ? 1 : Lc[i] / Lc[Lc.length - 1]); };
  const l19 = txt(g, Xy(2020.4), 700, "−0,5 % en 2019", 24, { weight: 800 }), l23 = txt(g, Xy(2023.9), Yr(4) - 24, "4 % en 2023", 24, { weight: 800 }), l26 = txt(g, Xy(2026.2), Yr(2.5) - 36, "2,50 % aujourd'hui", 24, { weight: 800, fill: C.accent });
  const pay = pl(g, Xy(2020.8), 560, "ON PAYAIT POUR PRÊTER", { bg: C.accentSoft, size: 18 });
  const r1 = pl(g, 960, 960, "UN PLACEMENT RISQUÉ QUI RAPPORTE MOINS QUE LE PLANCHER…", { size: 20 }), r2 = pl(g, 960, 1020, "… = UN RISQUE PRIS GRATUITEMENT", { bg: C.accent, size: 22 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    th.g.setAttribute("transform", `translate(140 820) scale(${0.9 * pop(t, m(2) - 0.4)})`);
    show(lt, fade(t, m(3) - 0.3)); show(val, fade(t, m(4) - 0.3)); show(sr, fade(t, m(5) - 0.3)); on(plc, pop(t, m(6) - 0.3));
    place(box, 1230, 560, pop(t, m(7) - 0.4)); zero.style.opacity = fade(t, m(7)); ans.forEach(a => a.style.opacity = fade(t, m(7)));
    const k = t < m(10) - 0.4 ? kX(Xy(2022.5)) * ease(prog(t, m(8) - 0.4, m(9) + 0.6)) : t < m(11) - 0.4 ? lerp(kX(Xy(2022.5)), kX(Xy(2023.75)), ease(prog(t, m(10) - 0.4, m(10) + 0.5))) : lerp(kX(Xy(2023.75)), 1, ease(prog(t, m(11) - 0.4, m(11) + 0.9)));
    const [, yy] = cb.set(Math.max(0.0001, k)); cb.p.style.opacity = cb.dot.style.opacity = fade(t, m(8) - 0.5);
    th.set(t < m(8) - 0.5 ? 2.5 : (740 - yy) / 80);
    show(l19, fade(t, m(8) - 0.2)); on(pay, pop(t, m(9) - 0.3) * out(t, m(10) + 0.4)); show(l23, fade(t, m(10))); show(l26, fade(t, m(11) + 0.2));
    on(r1, pop(t, m(13) - 0.3)); on(r2, pop(t, m(14) - 0.3));
  };
});
