// Parties 15 à 21 : stratégie 1, « je paie deux fois ? », stratégie 2, taux selon la période, exemple réel, impact, conclusion.

// ---- 15 · Stratégie 1 : prélèvement maintenu ----
SC("15", "STRATÉGIE 1 · PRÉLÈVEMENT MAINTENU", (g, A) => {
  const m = A.m, head = title(g, 190, "Tu avances l'impôt, l'État te rembourse");
  const mois = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((l, i) => { const w = el("g", {}, g);
    el("rect", { ...D.line, fill: C.inkSoft, x: -48, y: -36, width: 96, height: 72, rx: 10 }, w); txt(w, 0, 10, "−292", 22, { weight: 800, fill: C.paper }); txt(w, 0, 66, l, 20, { weight: 600, fill: C.inkSoft }); return { w, x: 220 + i * 112 }; });
  const tot = txt(g, 836, 820, "12 prélèvements ≈ 3 500 € avancés à l'État", 30, { font: "Serif", weight: 700 });
  const gir = card(g, 300, 110, { fill: C.ink }); txt(gir, 0, -4, "Girardin", 30, { font: "Serif", weight: 700, fill: C.paper }); txt(gir, 0, 34, "apport 3 000 €", 22, { weight: 600, fill: C.accentSoft });
  const r14 = pill(g, 520, 360, "RENDEMENT PRUDENT : 14 %", { bg: C.face, size: 20 });
  const ete = el("rect", { ...D.line, fill: C.accent, x: 1620, width: 180, rx: 12 }, g); const eteN = big(g, 1710, 0, "+ 3 420 €", 40);
  const eteL = txt(g, 1710, 760, "été N+1", 24, { weight: 700, fill: C.accent });
  const arc = el("path", { fill: "none", stroke: C.accent, "stroke-width": 6, "stroke-dasharray": "14 12", d: "M900 640 Q1300 300 1600 420" }, g);
  const rest = pill(g, 1500, 950, "TOUT TE REVIENT, SAUF 80 €", { bg: C.ink, fg: C.paper, size: 24 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    mois.forEach((o, i) => place(o.w, o.x, 700, pop(t, m(3) - 0.6 + i * 0.08)));
    tot.style.opacity = fade(t, m(3) + 0.4) * out(t, m(9) - 0.2);
    place(r14.g, r14.x, r14.y, pop(t, m(6) - 0.2));
    place(gir, 520, 470, pop(t, m(5) - 0.3));
    const h = 360 * ease(prog(t, m(7) - 0.3, m(7) + 0.5)); ete.setAttribute("y", 740 - h); ete.setAttribute("height", h); ete.style.opacity = h > 1 ? 1 : 0;
    eteN.setAttribute("y", 740 - h - 20); eteN.style.opacity = fade(t, m(7)); eteL.style.opacity = fade(t, m(7));
    arc.style.opacity = fade(t, m(10) - 0.4);
    place(rest.g, rest.x - 540, rest.y, pop(t, m(9) - 0.3));
  };
});

// ---- 16 · Est-ce que je paie deux fois ? ----
SC("16", "« JE PAIE DEUX FOIS ? »", (g, A) => {
  const m = A.m, head = title(g, 190, "Est-ce que je paie deux fois ? Non.");
  const sans = card(g, 640, 260, { fill: C.face }); txt(sans, 0, -60, "Sans Girardin", 30, { font: "Serif", weight: 600, fill: C.inkSoft }); const s1 = txt(sans, 0, 40, "3 500 €", 90, { font: "Serif", weight: 700, fill: C.inkSoft });
  const bar = el("path", { ...D.line, stroke: C.accent, "stroke-width": 8, d: "M-150 10 L150 10" }, sans);
  const avec = card(g, 640, 260, { fill: C.ink }); txt(avec, 0, -60, "Avec Girardin", 30, { font: "Serif", weight: 600, fill: C.accentSoft }); txt(avec, 0, 40, "3 080 €", 90, { font: "Serif", weight: 700, fill: C.paper });
  const poche = pill(g, 960, 720, "420 € DANS TA POCHE", { bg: C.accent, size: 34 });
  const av = pill(g, 960, 830, "TU AVANCES TES IMPÔTS · TU GAGNES LA BONIFICATION", { bg: C.face, size: 22 });
  const om = card(g, 1300, 110, { fill: C.accentSoft }); txt(om, 0, 12, "Au lieu de les donner au fisc, tu les as donnés à l'Outre-mer.", 34, { font: "Serif", weight: 600 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(sans, 560, 450, pop(t, m(2) - 0.3)); bar.style.opacity = fade(t, m(3)); bar.setAttribute("transform", `scale(${ease(prog(t, m(3), m(3) + 0.4))} 1)`);
    place(avec, 1360, 450, pop(t, m(3) - 0.3));
    place(poche.g, poche.x, poche.y, pop(t, m(4) - 0.3)); place(av.g, av.x, av.y, pop(t, m(5) - 0.2));
    place(om, 960, 960, pop(t, m(7) - 0.3));
  };
});

// ---- 17 · Stratégie 2 : prélèvement coupé ----
SC("17", "STRATÉGIE 2 · PRÉLÈVEMENT COUPÉ", (g, A) => {
  const m = A.m, head = title(g, 190, "Coupe le prélèvement à la source dès janvier");
  const X0 = 240, X1 = 1200, Y0 = 820, H = 420;
  el("path", { ...D.line, d: `M${X0} ${Y0} L${X1 + 40} ${Y0}` }, g);
  const stairs = el("path", { fill: C.accentSoft, stroke: C.inkSoft, "stroke-width": 3, "stroke-dasharray": "10 8" }, g);
  const zero = el("path", { ...D.line, stroke: C.ink, "stroke-width": 8, d: `M${X0} ${Y0} L${X1} ${Y0}` }, g); draw(zero, m(2) - 0.3, m(2) + 0.6);
  const lab0 = txt(g, X0 + 20, Y0 - 20, "PAS à 0 % : rien ne sort", 24, { anchor: "start", weight: 700 });
  const tres = txt(g, 840, 640, "Trésorerie conservée", 40, { font: "Serif", weight: 600 });
  const box = card(g, 560, 260, { fill: C.ink }); txt(box, 0, -40, "3 500 €", 80, { font: "Serif", weight: 700, fill: C.paper }); txt(box, 0, 30, "restent sur ton compte", 24, { weight: 500, fill: C.accentSoft }); txt(box, 0, 70, "à placer, pas à dépenser", 24, { weight: 500, fill: C.accentSoft });
  const steps = [["Apport Girardin : 3 000 €", 5], ["Réduction : 3 420 €", 6], ["L'État demande 3 500 €", 7], ["− 3 420 €", 8], ["Solde : 80 €", 9]].map(([s, k], i) => ({ p: pill(g, 0, 0, s.toUpperCase(), { bg: i === 4 ? C.accent : C.face, size: 18 }), a: m(k), y: 620 + i * 70 }));
  const warn = pill(g, 700, 330, "⚠ AJUSTE BIEN TON TAUX · SINON PÉNALITÉ", { bg: C.face, size: 20 });
  const same = card(g, 1300, 100, { fill: C.accent }); txt(same, 0, 12, "Les deux stratégies reviennent au même : c'est une question de trésorerie.", 30, { font: "Serif", weight: 600 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const k = prog(t, m(3) - 0.3, m(4) + 1.5), n = Math.floor(12 * k);
    let d = `M${X0} ${Y0}`; for (let i = 0; i < n; i++) { const x = X0 + (X1 - X0) * (i + 1) / 12, y = Y0 - H * (i + 1) / 12; d += ` L${x - (X1 - X0) / 12} ${y} L${x} ${y}`; }
    stairs.setAttribute("d", d + ` L${X0 + (X1 - X0) * n / 12} ${Y0} Z`); stairs.style.opacity = n > 0 ? 1 : 0;
    lab0.style.opacity = fade(t, m(2)); show(tres, fade(t, m(4)));
    place(box, 1520, 420, pop(t, m(4) - 0.2));
    steps.forEach(s => place(s.p.g, 1520, s.y, pop(t, s.a - 0.3)));
    place(warn.g, warn.x, warn.y, pop(t, m(10) - 0.3) * out(t, m(11) - 0.3));
    place(same, 960, 990, pop(t, m(11) - 0.3));
  };
});

// ---- 18 · Le bon moment pour souscrire ----
SC("18", "LE BON MOMENT POUR SOUSCRIRE", (g, A) => {
  const m = A.m, head = title(g, 190, "Un rendement qui dépend du moment");
  const range = card(g, 760, 170, { fill: C.face }); txt(range, 0, 0, "15 à 23 %", 80, { font: "Serif", weight: 700 }); txt(range, 0, 56, "en général", 24, { weight: 600, fill: C.inkSoft });
  const mic = card(g, 760, 170, { fill: C.ink }); txt(mic, 0, 0, "16 à 23 %", 80, { font: "Serif", weight: 700, fill: C.paper }); txt(mic, 0, 56, "avec les partenaires du MIC", 24, { weight: 600, fill: C.accentSoft });
  const lg = el("g", {}, g); D.micLogo(lg, 0, 0, 50);
  el("path", { ...D.line, "stroke-width": 5, d: "M300 900 L1620 900" }, g);
  const Q = [["DÉBUT D'ANNÉE", "jusqu'à 23 %", 23, 4, 5], ["2ᵉ TRIMESTRE", "≈ 17 %", 17, 6, 7], ["FIN D'ANNÉE", "15 à 16 %", 15.5, 8, 9]].map(([a, b, v, k1, k2], i) => {
    const x = 520 + i * 440, r = el("rect", { ...D.line, fill: i === 0 ? C.accent : C.inkSoft, x: x - 120, width: 240, rx: 12 }, g);
    const la = txt(g, x, 950, a, 22, { weight: 800, ls: 4, fill: C.inkSoft }), lb = big(g, x, 0, b, 40);
    return { r, la, lb, v, a1: m(k1), a2: m(k2), x };
  });
  const tot = pill(g, 960, 1020, "PLUS TÔT DANS L'ANNÉE, PLUS C'EST INTÉRESSANT", { bg: C.accent, size: 22 });
  return t => {
    const p1 = out(t, m(4) - 0.5);
    show(head, fade(t, m(1) - 0.5));
    place(range, 560, 520, pop(t, m(1) - 0.3) * p1); place(mic, 1360, 520, pop(t, m(3) - 0.3) * p1); place(lg, 1360, 360, pop(t, m(2) - 0.2) * p1);
    Q.forEach(q => { const h = 16 * q.v * ease(prog(t, q.a2 - 0.4, q.a2 + 0.3)); q.r.setAttribute("y", 900 - h); q.r.setAttribute("height", h); q.r.style.opacity = h > 1 ? 1 : 0;
      q.la.style.opacity = fade(t, q.a1 - 0.3); q.lb.setAttribute("y", 900 - h - 20); q.lb.style.opacity = fade(t, q.a2); });
    place(tot.g, tot.x, tot.y, pop(t, m(10) - 0.3));
  };
});

// ---- 19 · Un exemple réel ----
SC("19", "UN EXEMPLE RÉEL", (g, A) => {
  const m = A.m, head = title(g, 190, "Un client, en 2025");
  const cl = member(g, "client");
  const pas = pill(g, 760, 380, "PRÉLÈVEMENT GARDÉ TOUTE L'ANNÉE", { bg: C.face, size: 22 });
  const v = card(g, 480, 220); txt(v, 0, -40, "Versé", 32, { font: "Serif", weight: 600, fill: C.inkSoft }); txt(v, 0, 50, "5 000 €", 80, { font: "Serif", weight: 700 });
  const r = card(g, 480, 220, { fill: C.accentSoft }); txt(r, 0, -40, "Réduction d'impôt", 32, { font: "Serif", weight: 600, fill: C.inkSoft }); txt(r, 0, 50, "5 749 €", 80, { font: "Serif", weight: 700 });
  const remb = card(g, 1000, 180, { fill: C.ink }); txt(remb, 0, -14, "Remboursement de 7 730 €", 56, { font: "Serif", weight: 700, fill: C.paper }); txt(remb, 0, 46, "l'été suivant", 26, { weight: 500, fill: C.accentSoft });
  const sun = el("g", {}, g); el("circle", { ...D.line, fill: C.accent, r: 50 }, sun);
  for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; el("path", { ...D.line, "stroke-width": 6, stroke: C.accent, d: `M${70 * Math.cos(a)} ${70 * Math.sin(a)} L${95 * Math.cos(a)} ${95 * Math.sin(a)}` }, sun); }
  const ar = arrow(g, 1000, 560, 1140, 560, m(4) - 0.5, m(4) - 0.1);
  return t => {
    show(head, fade(t, m(1) - 0.5));
    cl.at(t, m(1) - 0.3, 280, 920); place(pas.g, pas.x, pas.y, pop(t, m(2) - 0.3));
    place(v, 760, 560, pop(t, m(3) - 0.3)); ar.render(t); place(r, 1400, 560, pop(t, m(4) - 0.3));
    place(remb, 1060, 860, pop(t, m(5) - 0.3)); place(sun, 1700, 300, pop(t, m(5)), t * 20);
  };
});

// ---- 20 · Même impôt, meilleur impact ----
SC("20", "MÊME IMPÔT, MEILLEUR IMPACT", (g, A) => {
  const m = A.m, head = title(g, 190, "Même impôt, meilleur impact");
  const r1 = [person(g, { vest: C.accent }), stack(g, 5, 30), bank(g, "ÉTAT", 200)];
  const z = el("g", {}, g); el("circle", { ...D.line, fill: C.paperDeep, r: 80 }, z); txt(z, 0, 6, "0 €", 44, { font: "Serif", weight: 700 }); txt(z, 0, 40, "de retour", 18, { weight: 700, fill: C.inkSoft });
  const a1 = [arrow(g, 420, 400, 560, 400, m(3) - 0.4, m(3) - 0.1, { w: 5 }), arrow(g, 760, 400, 960, 400, m(3) - 0.1, m(3) + 0.2, { w: 5 }), arrow(g, 1220, 400, 1400, 400, m(4) - 0.3, m(4), { w: 5 })];
  const r2 = [person(g, { vest: C.accent }), stack(g, 5, 30), usine(g, 0.9), palmier(g, 0.55)];
  const ret = el("g", {}, g); el("circle", { ...D.line, fill: C.ink, r: 80 }, ret); txt(ret, 0, 6, "+ €", 44, { font: "Serif", weight: 700, fill: C.accent }); txt(ret, 0, 40, "retour fiscal", 18, { weight: 700, fill: C.accentSoft });
  const a2 = [arrow(g, 420, 760, 560, 760, m(6) - 0.4, m(6) - 0.1, { w: 5 }), arrow(g, 760, 760, 960, 760, m(6) - 0.1, m(6) + 0.2, { w: 5 }), arrow(g, 1260, 760, 1400, 760, m(7) - 0.3, m(7), { w: 5 })];
  const l1 = txt(g, 120, 410, "SANS", 26, { anchor: "start", weight: 800, ls: 6, fill: C.inkSoft }), l2 = txt(g, 120, 770, "AVEC", 26, { anchor: "start", weight: 800, ls: 6, fill: C.accent });
  el("path", { fill: "none", stroke: C.paperDeep, "stroke-width": 3, "stroke-dasharray": "10 10", d: "M120 580 L1800 580" }, g);
  const fin = pill(g, 960, 1000, "MÊME IMPÔT, MEILLEUR IMPACT, AVEC UN RETOUR", { bg: C.accent, size: 26 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); l1.style.opacity = fade(t, m(2) - 0.3); l2.style.opacity = fade(t, m(5) - 0.3);
    stand(r1[0], t, m(2) - 0.3, 330, 500, 0.55); place(r1[1], 660, 440, pop(t, m(3) - 0.4)); place(r1[2], 1090, 440, pop(t, m(3)) * 0.6); place(z, 1520, 400, pop(t, m(4) - 0.2));
    stand(r2[0], t, m(5) - 0.3, 330, 860, 0.55); place(r2[1], 660, 800, pop(t, m(6) - 0.4)); place(r2[2], 1080, 780, pop(t, m(6))); place(r2[3], 1210, 770, pop(t, m(6) + 0.2));
    place(ret, 1520, 760, pop(t, m(7) - 0.2));
    a1.forEach(a => a.render(t)); a2.forEach(a => a.render(t));
    place(fin.g, fin.x, fin.y, pop(t, m(8) - 0.3));
  };
});

// ---- 21 · Conclusion ----
SC("21", "CONCLUSION", (g, A) => {
  const m = A.m, head = title(g, 190, "Le Girardin industriel");
  const L = [ligne(g, "Dynamiser l'économie des Outre-mer", m(2), 360), ligne(g, "Réduire tes impôts", m(3), 450), ligne(g, "Augmenter la rentabilité de ton épargne", m(4), 540)];
  const inv = card(g, 1200, 110, { fill: C.accentSoft }); txt(inv, 0, 14, "Investis tes impôts, et obtiens un retour dessus.", 36, { font: "Serif", weight: 600 });
  const pro = pill(g, 760, 880, "FAIS-TOI ACCOMPAGNER PAR UN PROFESSIONNEL", { bg: C.ink, fg: C.paper, size: 22 });
  const me = member(g, "mathyas"); const pm = palmier(g, 0.9), us = usine(g, 0.9);
  return t => {
    show(head, fade(t, m(1) - 0.5));
    L.forEach(l => place(l.r, 300, l.y, pop(t, l.a - 0.3)));
    place(us, 1420, 470, pop(t, m(2) - 0.2)); place(pm, 1640, 440, pop(t, m(2)));
    place(inv, 960, 700, pop(t, m(5) - 0.3));
    place(pro.g, pro.x, pro.y, pop(t, m(6) - 0.3)); me.at(t, m(6) - 0.4, 1600, 960, { armL: t > m(7) - 0.3 ? 150 : 105, scale: 0.85 });
  };
});
