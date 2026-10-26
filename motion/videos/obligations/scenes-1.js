// Parties 00 à 05 : accroche, actions / obligations, le prêt, à qui prêter, deux façons d'être payé, la balançoire.

// ---- 00 · Prêter plutôt que parier (fond sombre) ----
SC("00", "PRÊTER PLUTÔT QUE PARIER", (g, A) => {
  const m = A.m;
  const bg = el("rect", { width: 1920, height: 1080, fill: C.ink }, g); g.insertBefore(bg, g.firstChild);
  const t1 = big(g, 540, 330, "Les obligations.", 80, C.paper);
  const t2 = txt(g, 540, 410, "le placement dont tout le monde a entendu parler…", 30, { weight: 600, fill: C.accentSoft });
  const t3 = txt(g, 540, 456, "… et que presque personne ne sait vraiment expliquer", 30, { weight: 600, fill: C.accentSoft });
  const d = de(g), ti = titre(g, 1.3), fl = el("path", { ...D.line, stroke: C.accent, "stroke-width": 7 }, g);
  const lp = txt(g, 380, 750, "parier", 30, { weight: 800, ls: 4, fill: C.paper }), lt = txt(g, 720, 750, "prêter", 30, { weight: 800, ls: 4, fill: C.accent });
  const croix = el("path", { ...D.line, stroke: C.accent, "stroke-width": 9, d: "M330 560 L430 660 M430 560 L330 660" }, g);
  const t7 = big(g, 540, 330, "Prêter plutôt que parier.", 72, C.paper);
  const P = [["COMMENT ÇA MARCHE", 8, C.face], ["LIRE LE MARCHÉ", 9, C.face], ["LE MÉCANISME CLÉ", 10, C.accent]].map(([s, k, bgc], i) => ({ p: pl(g, 540, 440 + i * 64, s, { bg: bgc, size: 22 }), k }));
  const ref = el("path", { ...D.line, stroke: C.inkSoft, "stroke-width": 3, "stroke-dasharray": "12 12", d: "M1040 420 L1720 420" }, g);
  const c1 = trace(g, courbeXY(1040, 1720, u => 420 + 230 * Math.sin(Math.PI * Math.min(1, u * 1.05)) * (u < 0.5 ? 1 : (1 - u) * 2 + 0.0)), { color: C.accent, dot: C.accent });
  const c2 = trace(g, courbeXY(1040, 1720, u => 760 - 340 * Math.pow(u, 1.5)), { color: C.inkSoft, dot: C.inkSoft, r: 10 });
  const fin = el("circle", { ...D.line, stroke: C.paper, "stroke-width": 8, fill: C.ink, cx: 1720, cy: 420, r: 0 }, g);
  const l100 = txt(g, 1720, 380, "100", 34, { font: "Serif", weight: 700, fill: C.paper });
  return t => {
    const kA = out(t, m(7) - 0.5);
    show(t1, fade(t, m(1) - 0.4) * kA); show(t2, fade(t, m(2) - 0.3) * kA); show(t3, fade(t, m(3) - 0.3) * kA);
    place(d, 380, 610, pop(t, m(5) - 0.4) * kA, 15 * Math.sin(t * 3)); croix.style.opacity = fade(t, m(6) - 0.2) * kA; show(lp, fade(t, m(5)) * kA);
    place(ti.g, 720, 610, pop(t, m(6) - 0.3) * kA); show(lt, fade(t, m(6)) * kA);
    const kf = ease(prog(t, m(6) - 0.4, m(6) + 0.3)); fl.setAttribute("d", `M460 610 L${lerp(460, 620, kf)} 610`); fl.style.opacity = (kf > 0 ? 1 : 0) * kA;
    show(t7, fade(t, m(7) - 0.2));
    P.forEach(p => on(p.p, pop(t, m(p.k) - 0.3)));
    ref.style.opacity = fade(t, m(10) - 0.2);
    c1.set(t < m(12) - 0.3 ? 0.5 * ease(prog(t, m(11) - 0.4, m(11) + 0.6)) : lerp(0.5, 1, ease(prog(t, m(12) - 0.3, m(12) + 1.2))));
    c2.set(ease(prog(t, m(12) - 0.2, m(12) + 1.6)));
    fin.setAttribute("r", 22 * pop(t, m(12) + 1.0)); show(l100, fade(t, m(12) + 1.0));
  };
});

// ---- 01 · Comment une entreprise trouve de l'argent ----
SC("01", "LE POINT DE DÉPART", (g, A) => {
  const m = A.m, head = title(g, 190, "Comment une entreprise trouve de l'argent");
  const rond = el("g", {}, g); el("circle", { ...D.line, fill: C.ink, r: 130 }, rond);
  txt(rond, 0, -6, "Entreprise", 40, { font: "Serif", weight: 700, fill: C.paper }); txt(rond, 0, 36, "ou État", 26, { weight: 600, fill: C.accentSoft });
  const besoin = pl(g, 960, 720, "A BESOIN D'ARGENT", { bg: C.accent, size: 22 });
  const pieces = [0, 1, 2, 3].map(() => coin(g, 24));
  const aG = arrow(g, 800, 520, 640, 520, m(3) - 0.3, m(4)), aD = arrow(g, 1120, 520, 1280, 520, m(3), m(7));
  const cG = card(g, 420, 420, { fill: C.face }), cD = card(g, 420, 420, { fill: C.face });
  const pie = el("g", { transform: "translate(0 -90) scale(1.1)" }, cG); D.icons.pie(pie);
  txt(cG, 0, 40, "Actions", 44, { font: "Serif", weight: 700 }); txt(cG, 0, 84, "elle vend une part d'elle-même", 22, { weight: 600, fill: C.inkSoft });
  const ob = el("g", { transform: "translate(0 -90) scale(1.1)" }, cD); D.icons.obligation(ob);
  txt(cD, 0, 40, "Obligations", 44, { font: "Serif", weight: 700 }); txt(cD, 0, 84, "elle emprunte, sans rien céder", 22, { weight: 600, fill: C.inkSoft });
  const asso = pl(g, 380, 820, "TU ES ASSOCIÉ", { size: 22 }), banq = pl(g, 1540, 820, "TU ES LE BANQUIER", { bg: C.ink, fg: C.paper, size: 22 });
  const me = marcheur(g, { vest: C.accent }, 0.5);
  return t => {
    show(head, fade(t, A.s, 0.6));
    place(rond, 960, 520, pop(t, m(1) - 0.4)); on(besoin, pop(t, m(2) - 0.3));
    pieces.forEach((c, i) => { const u = (t * 0.5 + i / 4) % 1; place(c, 960 + 170 * Math.cos(u * 6.28), 520 + 170 * Math.sin(u * 6.28), fade(t, m(2) - 0.2) * out(t, m(3) + 0.5)); });
    aG.render(t); aD.render(t);
    place(cG, 380, 520, pop(t, m(4) - 0.3)); place(cD, 1540, 520, pop(t, m(7) - 0.3));
    pie.style.opacity = 1; cG.style.opacity = t > m(4) - 0.3 ? 1 : 0;
    on(asso, pop(t, m(6) - 0.3)); on(banq, pop(t, m(9) - 0.3));
    me.at(t, [[m(5) - 0.3, 960, 1000], [m(6), 640, 1000], [m(8), 640, 1000], [m(9) + 0.2, 1280, 1000]], {});
    const k5 = Math.max(0, Math.sin(Math.PI * prog(t, m(5) - 0.2, m(5) + 0.6))), k8 = Math.max(0, Math.sin(Math.PI * prog(t, m(8) - 0.2, m(8) + 0.6)));
    cG.setAttribute("transform", `translate(380 ${520 - 14 * k5}) scale(${pop(t, m(4) - 0.3)})`); cD.setAttribute("transform", `translate(1540 ${520 - 14 * k8}) scale(${pop(t, m(7) - 0.3)})`);
  };
});

// ---- 02 · Une obligation, c'est un prêt ----
SC("02", "LES BASES", (g, A) => {
  const m = A.m, head = title(g, 190, "Une obligation, c'est un prêt");
  const Y = 440, xs = [300, 560, 820, 1080, 1340, 1620];
  const ligne = el("path", { ...D.line, stroke: C.inkSoft, "stroke-width": 8 }, g);
  const R = xs.map((x, i) => { const r = el("g", {}, g), big_ = i === 0 || i === 5;
    el("circle", { ...D.line, fill: i === 0 ? C.face : i === 5 ? C.ink : C.accentSoft, r: big_ ? 110 : 70 }, r);
    const a = big(r, 0, i === 5 ? 6 : 6, i === 0 ? "−100 €" : i === 5 ? "+100 €" : "+4 €", big_ ? 50 : 40, i === 5 ? C.paper : C.ink);
    txt(r, 0, big_ ? 48 : 38, i === 0 ? "tu prêtes" : i === 5 ? "+4 € · an 5" : "an " + i, 22, { weight: 600, fill: i === 5 ? C.accentSoft : C.inkSoft });
    return r; });
  const lc = pl(g, 690, 300, "LE COUPON", { bg: C.accent, size: 22 }), le = pl(g, 1620, 270, "L'ÉCHÉANCE", { bg: C.ink, fg: C.paper, size: 22 });
  const K = [["Le montant", "ce que tu prêtes", 12, C.face], ["Le coupon", "l'intérêt que tu touches", 13, C.accentSoft], ["L'échéance", "la date où on te rembourse", 14, C.ink]].map(([a, b, k, f], i) => ({ c: bloc(g, 480, 120, a, b, { size: 34, fill: f }), k, x: 400 + i * 560 }));
  const trois = pl(g, 960, 650, "TROIS MOTS À RETENIR", { size: 20 }), ecrit = pl(g, 960, 960, "TOUT EST ÉCRIT DÈS LE DÉPART", { bg: C.ink, fg: C.paper, size: 22 });
  const ctr = contrat(g, "");
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const kl = ease(prog(t, m(2) - 0.2, m(10))); ligne.setAttribute("d", `M300 ${Y} L${lerp(300, 1620, kl)} ${Y}`); ligne.style.opacity = kl > 0 ? 1 : 0;
    const ks = [m(2) - 0.3, m(4) - 0.3, m(7) - 0.3, m(8) - 0.2, m(8) + 0.5, m(10) - 0.4];
    R.forEach((r, i) => place(r, xs[i], Y, pop(t, ks[i]) * (i > 0 && i < 5 && t > m(5) && t < m(6) + 0.6 ? 1 + 0.08 * Math.sin((t - m(5)) * 8) : 1)));
    on(lc, pop(t, m(5) - 0.3)); on(le, pop(t, m(9) - 0.3));
    on(trois, pop(t, m(11) - 0.3));
    K.forEach(c => place(c.c, c.x, 790, pop(t, m(c.k) - 0.3)));
    on(ecrit, pop(t, m(15) - 0.3)); place(ctr.g, 1320, 960, pop(t, m(15) - 0.2) * 0.55);
  };
});

// ---- 03 · À qui prête-t-on ? ----
SC("03", "À QUI PRÊTE-T-ON ?", (g, A) => {
  const m = A.m, head = title(g, 190, "À qui prête-t-on ?");
  const def = el("defs", {}, g), lg = el("linearGradient", { id: "gradRisque", x1: 0, x2: 1 }, def);
  el("stop", { offset: 0, "stop-color": C.inkSoft }, lg); el("stop", { offset: 1, "stop-color": C.accent }, lg);
  const Cs = [["États", "3,6 %", "3,6 à 4,9 %", "Allemagne → France, à 10 ans", "Risque faible", 1, C.inkSoft, [2, 3, 4, 5]],
              ["Investment Grade", "", "≈ 3,5 à 4 %", "grandes entreprises bien notées", "Risque modéré", 2, C.inkSoft, [6, 7, 8, 9]],
              ["High Yield", "", "≈ 5,75 %", "entreprises plus fragiles", "Risque élevé", 4, C.accent, [10, 11, 12, 13]]]
    .map(([ti, r0, r1, sub, ri, n, col, K], i) => {
      const c = card(g, 480, 360, { fill: C.face }), x = 380 + i * 580;
      const tt = txt(c, -200, -110, ti, 40, { anchor: "start", font: "Serif", weight: 700 });
      const rr = txt(c, -200, -20, r0 || r1, 64, { anchor: "start", font: "Serif", weight: 700, fill: i === 2 ? C.accent : C.ink });
      const ss = txt(c, -200, 22, sub, 22, { anchor: "start", weight: 600, fill: C.inkSoft });
      const j = jauge(c, n, col); j.g.setAttribute("transform", "translate(-50 80)");
      const rk = txt(c, -200, 136, ri, 22, { anchor: "start", weight: 800, fill: col });
      return { c, x, tt, rr, ss, j, rk, K, r0, r1 };
    });
  const barre = el("rect", { x: 140, y: 790, width: 0, height: 18, rx: 9, fill: "url(#gradRisque)" }, g);
  const lm = txt(g, 140, 850, "moins de risque, moins de rendement", 24, { anchor: "start", weight: 700, fill: C.inkSoft }), lp = txt(g, 1780, 850, "plus de rendement = plus de risque", 24, { anchor: "end", weight: 800, fill: C.accent });
  const cad = pl(g, 960, 960, "IL N'Y A PAS DE CADEAU", { bg: C.ink, fg: C.paper, size: 24 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    Cs.forEach((c, i) => { const [k1, k2, k3, k4] = c.K;
      place(c.c, c.x, 500, pop(t, m(k1) - 0.4));
      show(c.tt, fade(t, m(k1) - 0.3)); show(c.rr, fade(t, m(i === 0 ? k2 : k3) - 0.3));
      if (i === 0) c.rr.textContent = t < m(k3) - 0.2 ? c.r0 : c.r1;
      show(c.ss, fade(t, m(k3) - 0.2)); c.j.set(ease(prog(t, m(k4) - 0.4, m(k4) + 0.4))); show(c.rk, fade(t, m(k4) - 0.2)); });
    barre.setAttribute("width", 1640 * ease(prog(t, m(14) - 0.4, m(14) + 0.8)));
    show(lm, fade(t, m(15) - 0.5)); show(lp, fade(t, m(15) - 0.1)); on(cad, pop(t, m(16) - 0.3));
  };
});

// ---- 04 · Deux façons d'être payé ----
SC("04", "DEUX FAÇONS D'ÊTRE PAYÉ", (g, A) => {
  const m = A.m, head = title(g, 190, "Deux façons d'être payé");
  const pan = (x, ti) => { const c = card(g, 820, 600, { fill: C.face }); txt(c, -370, -240, ti, 42, { anchor: "start", font: "Serif", weight: 700 }); return { c, x }; };
  const P1 = pan(510, "Obligation classique"), P2 = pan(1410, "Zéro coupon");
  const B = 780, u = 2.2, X = i => -300 + i * 120;   // u px par euro
  const achat1 = el("rect", { ...D.line, "stroke-dasharray": "10 8", fill: "none", x: X(0) - 40, y: -0, width: 80, height: 0 }, P1.c);
  const cps = [1, 2, 3, 4].map(i => { const r = el("rect", { ...D.line, fill: C.accent, x: X(i) - 40, width: 80, rx: 6 }, P1.c); return r; });
  const fin1 = el("rect", { ...D.line, fill: C.ink, x: X(5) - 40, width: 80 }, P1.c), top1 = el("rect", { ...D.line, fill: C.accent, x: X(5) - 40, width: 80, rx: 6 }, P1.c);
  const lab1 = ["Achat", "An 1", "An 2", "An 3", "An 4", "An 5"].map((s, i) => txt(P1.c, X(i), 230, s, 22, { weight: 600, fill: C.inkSoft }));
  const v1 = [["100 €", 0], ["+4 €", 1], ["+4 €", 2], ["+4 €", 3], ["+4 €", 4], ["104 €", 5]].map(([s, i]) => txt(P1.c, X(i), 0, s, 24, { weight: 800, fill: i && i < 5 ? C.accent : C.ink }));
  const achat2 = el("rect", { ...D.line, stroke: C.accent, "stroke-dasharray": "10 8", fill: "none", x: X(0) - 40, width: 80 }, P2.c);
  const fin2 = el("rect", { ...D.line, fill: C.ink, x: X(5) - 40, width: 80 }, P2.c);
  const pts = [1, 2, 3, 4].map(i => el("circle", { cx: X(i), cy: 190, r: 7, fill: C.paperDeep }, P2.c));
  const rien = txt(P2.c, 0, 80, "rien en cours de route", 24, { weight: 600, fill: C.inkSoft });
  const pont = el("path", { ...D.line, stroke: C.accent, "stroke-width": 4, "stroke-dasharray": "6 8" }, P2.c);
  const lab2 = ["Achat", "An 1", "An 2", "An 3", "An 4", "An 5"].map((s, i) => txt(P2.c, X(i), 230, s, 22, { weight: 600, fill: C.inkSoft }));
  const v2a = txt(P2.c, X(0), 0, "80 €", 26, { weight: 800, fill: C.accent }), v2b = txt(P2.c, X(5), 0, "100 €", 26, { weight: 800 });
  const ecart = el("path", { ...D.line, stroke: C.accent, "stroke-width": 5 }, P2.c), lec = txt(P2.c, X(5) - 140, 0, "+20 €", 30, { font: "Serif", weight: 700, fill: C.accent });
  const reg = pl(g, 510, 990, "DES REVENUS RÉGULIERS", { size: 20 }), con = pl(g, 1410, 990, "UN MONTANT CONNU, À UNE DATE CONNUE", { bg: C.ink, fg: C.paper, size: 20 });
  const H = v => v * u, base = 190;
  return t => {
    show(head, fade(t, A.s, 0.6));
    place(P1.c, P1.x, 560, pop(t, m(2) - 0.4)); place(P2.c, P2.x, 560, pop(t, m(7) - 0.4));
    const ka = ease(prog(t, m(3) - 0.3, m(3) + 0.4)); achat1.setAttribute("y", base - H(100) * ka); achat1.setAttribute("height", H(100) * ka); achat1.style.opacity = ka > 0 ? 1 : 0;
    v1[0].setAttribute("y", base - H(100) - 14); show(v1[0], ka);
    cps.forEach((r, i) => { const k = ease(prog(t, m(4) - 0.3 + i * 0.35, m(4) + i * 0.35)); r.setAttribute("y", base - H(14) * k); r.setAttribute("height", H(14) * k); r.style.opacity = k > 0 ? 1 : 0;
      v1[i + 1].setAttribute("y", base - H(14) - 14); show(v1[i + 1], k); });
    const kf = ease(prog(t, m(5) - 0.3, m(5) + 0.6)); fin1.setAttribute("y", base - H(100) * kf); fin1.setAttribute("height", H(100) * kf); fin1.style.opacity = kf > 0 ? 1 : 0;
    top1.setAttribute("y", base - H(100) * kf - H(14)); top1.setAttribute("height", H(14)); top1.style.opacity = kf >= 1 ? 1 : 0;
    v1[5].setAttribute("y", base - H(114) - 14); show(v1[5], prog(t, m(5) + 0.4, m(5) + 0.8));
    lab1.forEach(l => show(l, fade(t, m(2)))); lab2.forEach(l => show(l, fade(t, m(7))));
    const k8 = ease(prog(t, m(8) - 0.3, m(8) + 0.4)); achat2.setAttribute("y", base - H(80) * k8); achat2.setAttribute("height", H(80) * k8); achat2.style.opacity = k8 > 0 ? 1 : 0;
    v2a.setAttribute("y", base - H(80) - 14); show(v2a, k8);
    pts.forEach(p => p.style.opacity = fade(t, m(9) - 0.3)); show(rien, fade(t, m(9) - 0.2));
    const k10 = ease(prog(t, m(10) - 0.3, m(10) + 0.6)); fin2.setAttribute("y", base - H(100) * k10); fin2.setAttribute("height", H(100) * k10); fin2.style.opacity = k10 > 0 ? 1 : 0;
    v2b.setAttribute("y", base - H(100) - 14); show(v2b, prog(t, m(10) + 0.3, m(10) + 0.7));
    const kp = ease(prog(t, m(10), m(10) + 0.9)); pont.setAttribute("d", `M${X(0) + 40} ${base - H(80)} L${lerp(X(0) + 40, X(5) - 40, kp)} ${lerp(base - H(80), base - H(100), kp)}`); pont.style.opacity = kp > 0 ? 1 : 0;
    const ke = ease(prog(t, m(11) - 0.3, m(11) + 0.4)); ecart.setAttribute("d", `M${X(5) - 60} ${base - H(80)} L${X(5) - 60} ${base - H(80) - H(20) * ke}`); ecart.style.opacity = ke > 0 ? 1 : 0;
    lec.setAttribute("y", base - H(80) + 40); show(lec, ke);
    on(reg, pop(t, m(6) - 0.3)); on(con, pop(t, m(12) - 0.3));
  };
});

// ---- 05 · La balançoire : taux et prix ----
SC("05", "LA MÉCANIQUE", (g, A) => {
  const m = A.m, head = title(g, 190, "La balançoire : taux et prix");
  const dou = pl(g, 960, 290, "ON Y VA DOUCEMENT", { size: 20 });
  const ti = titre(g, 2.0), tag = prix(g, "100 €"), bouge = pl(g, 960, 800, "UN PRIX QUI BOUGE TOUS LES JOURS", { bg: C.accentSoft, size: 20 });
  const bal = balancoire(g, 300);
  const fT = el("path", { ...D.line, stroke: C.ink, "stroke-width": 9 }, g), fP = el("path", { ...D.line, stroke: C.accent, "stroke-width": 9 }, g);
  const r1 = pl(g, 560, 900, "LES TAUX MONTENT → LE PRIX BAISSE", { size: 22 }), r2 = pl(g, 560, 970, "LES TAUX BAISSENT → LE PRIX MONTE", { bg: C.accentSoft, size: 22 });
  const box = card(g, 620, 520, { fill: C.face });
  el("path", { ...D.line, stroke: C.inkSoft, "stroke-width": 3, d: "M-250 -200 L-250 200 L270 200" }, box);
  txt(box, -250, -220, "prix", 22, { anchor: "start", weight: 700, fill: C.inkSoft }); txt(box, 270, 236, "taux", 22, { anchor: "end", weight: 700, fill: C.inkSoft });
  const cpx = u => [-230 + u * 480, -180 + 360 * (1 - Math.exp(-3 * u)) / (1 - Math.exp(-3))];
  el("path", { ...D.line, "stroke-width": 6, d: Array.from({ length: 41 }, (_, i) => cpx(i / 40)).map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ") }, box);
  const dot = el("circle", { ...D.line, fill: C.accent, r: 16 }, box);
  return t => {
    show(head, fade(t, m(1) - 0.5)); on(dou, pop(t, m(2) - 0.3) * out(t, m(5) - 0.5));
    const kA = out(t, m(5) - 0.6);
    place(ti.g, 860, 560, pop(t, m(3) - 0.3) * kA);
    const px = 100 + (t > m(4) - 0.2 ? 2.4 * Math.sin(t * 2.3) + 1.2 * Math.sin(t * 5.1) : 0); tag.lastElementChild.textContent = px.toFixed(1).replace(".", ",") + " €";
    place(tag, 1130, 520, pop(t, m(3)) * kA, -6); on(bouge, pop(t, m(4) - 0.3) * kA);
    const a = t < m(6) - 0.3 ? 0 : t < m(8) - 0.3 ? 12 * ease(prog(t, m(6) - 0.3, m(7))) : lerp(12, -12, ease(prog(t, m(8) - 0.3, m(9))));
    bal.g.setAttribute("transform", `translate(560 760) scale(${pop(t, m(5) - 0.4)})`); bal.set(a);
    const kT = Math.abs(a) / 12, s = Math.sign(a);
    fT.setAttribute("d", `M300 ${430 - 30 * s} L300 ${430 + 30 * s} M282 ${430 - 10 * s} L300 ${430 - 30 * s} L318 ${430 - 10 * s}`); fT.style.opacity = kT;
    fP.setAttribute("d", `M820 ${430 + 30 * s} L820 ${430 - 30 * s} M802 ${430 + 10 * s} L820 ${430 + 30 * s} L838 ${430 + 10 * s}`); fP.style.opacity = kT;
    on(r1, pop(t, m(7) - 0.2)); on(r2, pop(t, m(9) - 0.2));
    place(box, 1420, 600, pop(t, m(5)));
    const ud = 0.5 + 0.4 * a / 12, [dx, dy] = cpx(ud); dot.setAttribute("cx", dx); dot.setAttribute("cy", dy); dot.style.opacity = fade(t, m(6) - 0.4);
  };
});
