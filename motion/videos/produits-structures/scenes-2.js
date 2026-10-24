// Parties 08 à 14 : deux briques, quatre familles, autocall, Phoenix, Athéna, indice ou panier, pas de rendement gratuit.

// ---- 08 · Deux briques, un seul budget ----
SC("08", "DEUX BRIQUES, UN SEUL BUDGET", (g, A) => {
  const m = A.m, head = title(g, 190, "Deux briques, un seul budget");
  const filet = bloc(g, 340, 90, "Le zéro-coupon", "le filet", { fill: C.ink, size: 32 }), mot = bloc(g, 340, 90, "L'option", "le moteur de rendement", { fill: C.accent, size: 32 });
  const net = el("path", { ...D.line, "stroke-width": 4, fill: "none", d: "" }, g), eng = engrenage(g, 0.8);
  el("path", { ...D.line, "stroke-width": 4, d: "M260 900 L1500 900" }, g);
  const B = [[0.12, "≈ 2 % / an", "Capital garanti", 7], [0.32, "≈ 6 % / an", "Protection sous barrière", 10], [0.6, "≈ 11 % / an", "Aucune protection", 12]].map(([o, r, s, k], i) => {
    const x = 450 + i * 420, b = el("rect", { ...D.line, fill: C.ink, x: x - 150, width: 300, rx: 10 }, g), a = el("rect", { ...D.line, fill: C.accent, x: x - 150, width: 300, rx: 10 }, g);
    const tr = big(g, x, 0, r, 40), ts = txt(g, x, 950, s, 24, { weight: 600, fill: C.inkSoft }); return { b, a, tr, ts, o, k, x };
  });
  const cv = couverture(g), cvl = pl(g, 1500, 360, "LA COUVERTURE TROP COURTE", { bg: C.accentSoft, size: 18 });
  const pt = pl(g, 960, 1010, "UN POINT DE PROTECTION EN PLUS = UN POINT DE RENDEMENT EN MOINS", { bg: C.ink, fg: C.paper, size: 18 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const p1 = out(t, m(6) - 0.4);
    place(filet, 560, 400, pop(t, m(2) - 0.3) * p1); place(mot, 1360, 400, pop(t, m(4) - 0.3) * p1);
    const w = Math.sin(t * 4) * 8; net.setAttribute("d", `M400 520 Q560 ${560 + w} 720 520 M400 540 L720 540`); net.style.opacity = fade(t, m(3) - 0.3) * p1;
    place(eng, 1360, 560, pop(t, m(5) - 0.3) * p1, t * 90);
    const p2 = out(t, m(14) - 0.6);
    B.forEach(b => { const k = ease(prog(t, m(b.k) - 0.4, m(b.k) + 0.4)) * p2, H = 300, ho = H * b.o * k, hb = H * (1 - b.o) * k;
      b.b.setAttribute("y", 900 - hb); b.b.setAttribute("height", hb); b.a.setAttribute("y", 900 - hb - ho); b.a.setAttribute("height", ho);
      b.b.style.opacity = b.a.style.opacity = k > 0.02 ? 1 : 0; b.tr.setAttribute("y", 900 - hb - ho - 20); b.tr.style.opacity = fade(t, m(b.k + 1 > 13 ? 13 : b.k + 1) - 0.5) * p2; b.ts.style.opacity = k; });
    cv.g.setAttribute("transform", "translate(960 640)"); cv.g.style.opacity = fade(t, m(14) - 0.4); cv.set(t > m(14) ? Math.sin((t - m(14)) * 2.2) : 0);
    on(cvl, pop(t, m(14) - 0.2)); on(pt, pop(t, m(16) - 0.3));
  };
});

// ---- 09 · Quatre familles, un seul curseur ----
SC("09", "QUATRE FAMILLES, UN SEUL CURSEUR", (g, A) => {
  const m = A.m, head = title(g, 190, "Quatre familles, un seul curseur");
  const rail = el("rect", { ...D.line, fill: C.paperDeep, x: 240, y: 290, width: 1440, height: 24, rx: 12 }, g), cur = el("circle", { ...D.line, fill: C.accent, r: 30 }, g);
  const l1 = txt(g, 240, 360, "protéger le capital", 24, { anchor: "start", weight: 700 }), l2 = txt(g, 1680, 360, "faire travailler le capital", 24, { anchor: "end", weight: 700, fill: C.accent });
  const F = [["Capital garanti", "ta mise revient à l'échéance, sauf défaut de l'émetteur", 4], ["Protection sous condition", "tant que la barrière tient", 6], ["Rendement conditionnel", "des coupons sous conditions : Phoenix, Athéna", 9], ["Participation", "la hausse, parfois amplifiée, peu de filet", 12]]
    .map(([a, b, k], i) => { const c = card(g, 380, 280, { fill: i === 2 ? C.accentSoft : C.face }); txt(c, 0, -80, a, 30, { font: "Serif", weight: 700 });
      const words = b.split(" "), L = []; let cur_ = ""; words.forEach(w => { if ((cur_ + " " + w).length > 24) { L.push(cur_); cur_ = w; } else cur_ = (cur_ + " " + w).trim(); }); L.push(cur_);
      L.forEach((l, j) => txt(c, 0, -20 + j * 32, l, 22, { weight: 500, fill: C.inkSoft })); return { c, k, x: 330 + i * 420 }; });
  const q = pl(g, 960, 980, "LAQUELLE CORRESPOND À TON BESOIN ?", { bg: C.ink, fg: C.paper, size: 24 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); rail.style.opacity = fade(t, m(1) - 0.3); l1.style.opacity = fade(t, m(2) - 0.3); l2.style.opacity = fade(t, m(3) - 0.3);
    const tg = t < m(4) - 0.3 ? 0.5 + 0.45 * Math.sin(t * 1.5) : t < m(6) - 0.3 ? 0.06 : t < m(9) - 0.3 ? 0.36 : t < m(12) - 0.3 ? 0.64 : 0.94;
    cur.setAttribute("cx", 240 + 1440 * tg); cur.setAttribute("cy", 302); cur.style.opacity = fade(t, m(1));
    F.forEach(f => place(f.c, f.x, 620, pop(t, m(f.k) - 0.3)));
    on(q, pop(t, m(15) - 0.3));
  };
});

// ---- 10 · L'autocall, l'ascenseur à portes ----
SC("10", "L'AUTOCALL, L'ASCENSEUR À PORTES", (g, A) => {
  const m = A.m, head = title(g, 190, "L'autocall : l'ascenseur à portes");
  const asc = ascenseur(g, 5, 130), cli = marcheur(g, { vest: C.accent, hair: "f" }, 0.45);
  const q = pl(g, 1350, 330, "L'INDICE EST-IL AU-DESSUS DE SON NIVEAU DE DÉPART ?", { bg: C.accentSoft, size: 16 });
  const seuil = el("path", { ...D.line, stroke: C.accent, "stroke-width": 3, "stroke-dasharray": "10 8", d: "M1080 560 L1720 560" }, g), ls = txt(g, 1720, 545, "niveau de départ", 18, { anchor: "end", weight: 700, fill: C.accent });
  const pts = [[1120, 600], [1300, 640], [1480, 650], [1660, 520]], ln = el("path", { ...D.line, stroke: C.ink, "stroke-width": 6, d: "" }, g), dots = pts.map(() => el("circle", { ...D.line, fill: C.ink, r: 12 }, g));
  const R = [["NON → ON CONTINUE", 5, C.face], ["NON → ON CONTINUE", 7, C.face], ["OUI ! TU SORS", 9, C.accent]].map(([s, k, bg], i) => ({ p: pl(g, 1400, 760 + i * 70, `ANNÉE ${i + 1} : ${s}`, { bg, size: 18 }), k }));
  const gain = bloc(g, 440, 100, "Capital + gain prévu", "le produit s'arrête", { fill: C.ink, size: 32 }), rien = pl(g, 1400, 1000, "CONDITION NON REMPLIE : RIEN N'EST PERDU", { size: 16 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(asc.g, 560, 1000, pop(t, m(2) - 0.4) * 1);
    const fl = t < m(5) ? 0 : t < m(7) - 0.4 ? ease(prog(t, m(5) + 0.3, m(6))) : t < m(9) - 0.4 ? 1 + ease(prog(t, m(7) + 0.2, m(8))) : 2;
    const op = t < m(9) ? (t > m(5) && t < m(6) ? 0.15 * Math.sin((t - m(5)) * 6) ** 2 : 0) : ease(prog(t, m(9) + 0.1, m(10)));
    asc.set(fl, op); cli.at(t, [[m(2), 560, 1000 - 20 - fl * 130], [m(10), 560, 1000 - 20 - fl * 130], [m(11), 760, 1000 - 20 - 2 * 130]], {});
    on(q, pop(t, m(3) - 0.3)); seuil.style.opacity = ls.style.opacity = fade(t, m(4) - 0.3);
    const n = t < m(5) ? 0 : t < m(7) ? 1 : t < m(9) ? 2 : 4; ln.setAttribute("d", pts.slice(0, Math.max(1, n)).map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ")); dots.forEach((d, i) => { d.setAttribute("cx", pts[i][0]); d.setAttribute("cy", pts[i][1]); d.style.opacity = i < n ? 1 : 0; d.setAttribute("fill", i === 3 ? C.accent : C.ink); });
    R.forEach(r => on(r.p, pop(t, m(r.k) - 0.3))); place(gain, 1400, 760, pop(t, m(12) - 0.3) * (t > m(12) - 0.3 ? 1 : 0)); R.forEach(r => { if (t > m(12) - 0.3) r.p.g.style.opacity = 0; });
    on(rien, pop(t, m(13) - 0.3));
  };
});

// ---- 11 · Le Phoenix, le robinet à coupons ----
SC("11", "LE PHOENIX, LE ROBINET À COUPONS", (g, A) => {
  const m = A.m, head = title(g, 190, "Le Phoenix : le robinet à coupons");
  const rb = robinet(g), q = pl(g, 1300, 300, "L'INDICE TIENT-IL LA BARRIÈRE DES 60 % ?", { bg: C.accentSoft, size: 18 });
  const bar = el("path", { ...D.line, stroke: C.accent, "stroke-width": 3, "stroke-dasharray": "10 8", d: "M880 520 L1760 520" }, g), lb = txt(g, 1760, 505, "barrière · 60 %", 18, { anchor: "end", weight: 700, fill: C.accent });
  const P = [[940, 420], [1060, 440], [1180, 560], [1300, 580], [1420, 470], [1540, 450], [1660, 430]], ln = el("path", { ...D.line, stroke: C.ink, "stroke-width": 6, d: "" }, g);
  const T = ["2 %", "2 %", "0 %", "0 %", "6 %"].map((s, i) => { const c = card(g, 140, 110, { fill: i === 4 ? C.ink : i > 1 ? C.paperDeep : C.face }); txt(c, 0, -14, "T" + (i + 1), 20, { weight: 700, fill: i === 4 ? C.accentSoft : C.inkSoft }); txt(c, 0, 30, s, 38, { font: "Serif", weight: 700, fill: i === 4 ? C.paper : C.ink }); return c; });
  const mem = pl(g, 1300, 960, "L'EFFET MÉMOIRE : LES COUPONS MANQUÉS SONT RATTRAPÉS", { bg: C.accent, size: 18 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); on(q, pop(t, m(2) - 0.3)); bar.style.opacity = lb.style.opacity = fade(t, m(3) - 0.3);
    const keys = [m(6), m(7), m(8), m(10), m(12), m(13) + 1, m(14) + 1], n = keys.filter(k => t > k - 0.4).length;
    ln.setAttribute("d", P.slice(0, Math.max(1, n)).map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ")); ln.style.opacity = n ? 1 : 0;
    const flow = (t > m(4) - 0.3 && t < m(8) - 0.1) || t > m(12) ? 1 : 0;
    const fill = 0.1 * fade(t, m(6)) + 0.1 * fade(t, m(7)) + 0.12 * fade(t, m(8) + 0.4) + 0.12 * fade(t, m(10) + 0.4) + 0.3 * fade(t, m(13) - 0.3);
    rb.g.setAttribute("transform", "translate(460 720)"); rb.g.style.opacity = fade(t, m(4) - 0.6); rb.set(t, flow, fill);
    T.forEach((c, i) => place(c, 960 + i * 160, 760, pop(t, [m(6), m(7), m(8), m(10), m(13)][i] - 0.2) * (i === 4 ? 1 + 0.1 * Math.sin(t * 6) * fade(t, m(13)) : 1)));
    on(mem, pop(t, m(14) - 0.3));
  };
});

// ---- 12 · L'Athéna, le compteur qui tourne ----
SC("12", "L'ATHÉNA, LE COMPTEUR QUI TOURNE", (g, A) => {
  const m = A.m, head = title(g, 190, "L'Athéna : le compteur qui tourne");
  const cp = compteur(g), rien = pl(g, 560, 560, "RIEN N'EST VERSÉ EN COURS DE ROUTE", { size: 18 }), dort = pl(g, 560, 640, "MÊME QUAND LE MARCHÉ DORT", { bg: C.accentSoft, size: 18 });
  el("path", { ...D.line, "stroke-width": 4, d: "M1000 880 L1700 880" }, g);
  const C3 = [8, 16, 24].map((v, i) => colonne(g, 1080 + i * 230, 880, 160, i === 2 ? C.accent : C.ink)), lab = ["Année 1", "Année 2", "Rappel"].map((s, i) => txt(g, 1080 + i * 230, 920, s, 22, { weight: 700, fill: C.inkSoft }));
  const rap = pl(g, 1310, 330, "L'INDICE REPASSE AU-DESSUS : RAPPEL AUTOMATIQUE", { bg: C.ink, fg: C.paper, size: 16 });
  const tot = bloc(g, 440, 110, "Capital + 24 %", "et le produit s'arrête", { fill: C.accent, size: 40 });
  const S = [pl(g, 560, 960, "LE PHOENIX : UN SALAIRE", { size: 20 }), pl(g, 1360, 1000, "L'ATHÉNA : UNE PRIME DE FIN DE MISSION", { bg: C.accent, size: 20 })];
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(cp.g, 560, 420, pop(t, m(1) - 0.3)); const v = t < m(5) - 0.2 ? 0 : t < m(6) - 0.2 ? 8 : t < m(10) - 0.2 ? 16 : 24; cp.set(t > m(3) && t < m(5) ? 8 * ease(prog(t, m(3), m(5))) : v, t);
    on(rien, pop(t, m(2) - 0.3)); on(dort, pop(t, m(4) - 0.3));
    [m(5), m(6), m(10)].forEach((k, i) => { C3[i].set([80, 160, 240][i] * ease(prog(t, k - 0.3, k + 0.3)), [8, 16, 24][i] + " %"); lab[i].style.opacity = fade(t, k - 0.3); });
    on(rap, pop(t, m(7) - 0.3)); place(tot, 1310, 520, pop(t, m(9) - 0.3));
    on(S[0], pop(t, m(11) - 0.3)); on(S[1], pop(t, m(12) - 0.3));
  };
});

// ---- 13 · Un indice, ou un panier ? ----
SC("13", "UN INDICE, OU UN PANIER ?", (g, A) => {
  const m = A.m, head = title(g, 190, "Un indice, ou un panier ?");
  const mono = bloc(g, 560, 130, "Un seul indice", "ex. Euro Stoxx 50 · ≈ 6 % / an", { size: 40 }), wo = bloc(g, 560, 130, "Panier « worst of »", "3 actions · ≈ 11 % / an", { fill: C.ink, size: 40 });
  const lis = pl(g, 480, 500, "LISIBLE, DIVERSIFIÉ SUR 50 SOCIÉTÉS", { size: 16 });
  const mt = montagne(g); const corde = el("path", { ...D.line, stroke: C.accent, "stroke-width": 4, d: "" }, g);
  const cl = [0, 1, 2].map(i => marcheur(g, { vest: [C.accent, C.inkSoft, C.paperDeep][i] }, 0.42));
  const pm = pl(g, 1440, 500, "C'EST LA PLUS MAUVAISE DES TROIS QUI DÉCIDE", { bg: C.accent, size: 16 });
  const lent = pl(g, 960, 960, "LE GROUPE AVANCE À LA VITESSE DU PLUS LENT", { bg: C.ink, fg: C.paper, size: 20 }), tr = pl(g, 960, 1030, "11 % : PARCE QUE TU ACCEPTES TROIS RISQUES AU LIEU D'UN", { size: 16 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const p1 = out(t, m(12) - 0.6);
    place(mono, 480, 360, pop(t, m(2) - 0.3) * p1); on(lis, pop(t, m(4) - 0.3) * p1); place(wo, 1440, 360, pop(t, m(6) - 0.3) * p1); on(pm, pop(t, m(9) - 0.3) * p1);
    const km = t > m(12) - 0.6 ? 1 : 0; place(mt, 960, 760, pop(t, m(12) - 0.6) * km);
    const adv = prog(t, m(12), m(14) + 2), base = 0.1 + 0.5 * adv;
    const pos = [base + 0.12 + 0.03 * Math.sin(t * 3), base + 0.06 + 0.03 * Math.sin(t * 3 + 1), base];
    const xy = pos.map(p => [lerp(560, 1080, p), lerp(960, 560, p)]);
    cl.forEach((c, i) => c.at(t, [[m(12), xy[i][0], xy[i][1]]], { k: km, armL: 70, armR: 120 }));
    corde.setAttribute("d", km ? `M${xy[2][0]} ${xy[2][1] - 100} L${xy[1][0]} ${xy[1][1] - 100} L${xy[0][0]} ${xy[0][1] - 100}` : "");
    on(lent, pop(t, m(13) - 0.3)); on(tr, pop(t, m(15) - 0.3));
  };
});

// ---- 14 · Il n'y a pas de rendement gratuit ----
SC("14", "IL N'Y A PAS DE RENDEMENT GRATUIT", (g, A) => {
  const m = A.m, head = title(g, 190, "Il n'y a pas de rendement gratuit");
  const bq = bank(g, "BANQUE", 240), cli = marcheur(g, { vest: C.accent, hair: "f" });
  const D1 = [["UN COUPON ÉLEVÉ", 4], ["UNE BARRIÈRE", 4.4], ["UN CALENDRIER CONNU", 5]].map(([s, k], i) => ({ p: pl(g, 960, 330 + i * 70, s, { bg: C.accentSoft, size: 18 }), k }));
  const D2 = [["LES DIVIDENDES", 7], ["LA HAUSSE AU-DELÀ DU COUPON", 8], ["TA LIQUIDITÉ", 9], ["UNE ASSURANCE CONTRE LA BAISSE", 10]].map(([s, k], i) => ({ p: pl(g, 960, 330 + i * 70, s, { bg: C.paperDeep, size: 18 }), k }));
  el("rect", { ...D.line, fill: C.face, x: 560, y: 640, width: 800, height: 320, rx: 14 }, g);
  const br = el("path", { ...D.line, stroke: C.accent, "stroke-width": 3, "stroke-dasharray": "10 8", d: "M840 660 L840 940" }, g), lbr = txt(g, 850, 690, "barrière · −40 %", 18, { anchor: "start", weight: 700, fill: C.accent });
  const pay = el("path", { ...D.line, stroke: C.ink, "stroke-width": 7, d: "M600 920 L840 780 L1320 780" }, g); draw(pay, m(11) - 0.3, m(14) + 0.3);
  const lc = pl(g, 1100, 740, "TU ENCAISSES TON COUPON", { size: 16 }), lsb = pl(g, 700, 990, "SOUS LA BARRIÈRE : TU SUIS LA BAISSE", { bg: C.ink, fg: C.paper, size: 16 });
  const as = pl(g, 1500, 1010, "C'EST TOI L'ASSUREUR, LE JOUR OÙ ÇA CASSE", { bg: C.accent, size: 18 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(bq, 1560, 520, pop(t, m(3) - 0.3) * 0.7); cli.at(t, [[m(1), 300, 560], [m(3), 360, 560]], {});
    const sw = t < m(6) - 0.3; D1.forEach(d => on(d.p, pop(t, m(Math.floor(d.k)) + (d.k % 1) * 2 - 0.3) * (sw ? 1 : 0)));
    D2.forEach(d => on(d.p, pop(t, m(d.k) - 0.3) * (sw ? 0 : 1)));
    on(lc, pop(t, m(12) - 0.3)); on(lsb, pop(t, m(14) - 0.3)); on(as, pop(t, m(16) - 0.3));
  };
});
