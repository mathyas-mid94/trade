// Parties 15 à 20 : trois questions, conclusion, bonus (reverse convertible, décrément, airbag, barrière dégressive).

// ---- 15 · Trois questions avant de signer ----
SC("15", "TROIS QUESTIONS AVANT DE SIGNER", (g, A) => {
  const m = A.m, head = title(g, 190, "Trois questions avant de signer");
  const Q = [["01", "Qu'est-ce que je gagne ?", "un coupon, une protection, un calendrier", 2, C.face], ["02", "À quoi je renonce ?", "dividendes, hausse au-delà, liquidité", 4, C.face], ["03", "Dans quel cas je perds ?", "", 6, C.ink]]
    .map(([n, a, b, k, f], i) => { const c = card(g, 520, 320, { fill: f }); txt(c, -220, -100, n, 64, { anchor: "start", font: "Serif", weight: 700, fill: f === C.ink ? C.inkSoft : C.paperDeep });
      txt(c, -220, -20, a, 32, { anchor: "start", font: "Serif", weight: 700, fill: f === C.ink ? C.paper : C.ink }); if (b) txt(c, -220, 30, b, 20, { anchor: "start", weight: 500, fill: C.inkSoft }); return { c, k, x: 360 + i * 600 }; });
  const P = [["Baisse sous la barrière à l'échéance", 7], ["Défaut de la banque émettrice", 8], ["Sortie anticipée, au prix du jour", 9]].map(([s, k], i) => ({ t: txt(g, 1340, 600 + i * 34, "• " + s, 19, { anchor: "start", weight: 600, fill: C.accentSoft }), k }));
  const regle = pl(g, 960, 900, "PAS DE RÉPONSE CLAIRE ET CHIFFRÉE ?", { size: 22 }), non = pl(g, 960, 980, "LE PRODUIT NE PASSE PAS EN RENDEZ-VOUS", { bg: C.ink, fg: C.paper, size: 22 }), x = check(g, false);
  const me = marcheur(g, { vest: C.inkSoft });
  return t => {
    show(head, fade(t, m(1) - 0.5)); Q.forEach(q => place(q.c, q.x, 560, pop(t, m(q.k) - 0.3)));
    P.forEach(p => show(p.t, fade(t, m(p.k) - 0.3)));
    on(regle, pop(t, m(10) - 0.3)); on(non, pop(t, m(11) - 0.3)); place(x, 560, 980, pop(t, m(11)) * 0.8);
    me.at(t, [[m(10), 140, 1040], [m(11), 220, 1040]], { armR: -30, k: 0.5 });
  };
});

// ---- 16 · Conclusion ----
SC("16", "CONCLUSION", (g, A) => {
  const m = A.m;
  const box = el("g", {}, g); D.icons.structure(box);
  const L = [["UNE OBLIGATION POUR LE FILET", 2, C.ink], ["UNE OPTION POUR LE MOTEUR", 3, C.accent], ["DES RÈGLES ÉCRITES AVANT DE SIGNER", 4, C.face]].map(([s, k, bg], i) => ({ p: pl(g, 1300, 330 + i * 90, s, { bg, fg: bg === C.ink ? C.paper : C.ink, size: 20 }), k }));
  const att = pl(g, 1300, 620, "UN RENDEMENT ATTRACTIF", { bg: C.accentSoft, size: 22 }), sav = pl(g, 1300, 700, "EN SACHANT QUAND TU GAGNES… ET QUAND TU PERDS", { size: 16 });
  const me = marcheur(g, { vest: C.inkSoft }), cli = marcheur(g, { vest: C.accent, hair: "f" });
  const doc = contrat(g, "LE DOCUMENT D'INFORMATIONS CLÉS", { size: 16 });
  const F = ["ÉMETTEUR", "SOUS-JACENT", "COUPON", "BARRIÈRE", "DURÉE"].map((s, i) => pl(g, 1120 + (i % 3) * 230, 860 + Math.floor(i / 3) * 70, s, { size: 16 }));
  const bonus = pl(g, 960, 1020, "EN BONUS : QUATRE MÉCANISMES", { bg: C.accent, size: 22 });
  return t => {
    const p1 = out(t, m(8) - 0.5);
    place(box, 520, 520, pop(t, m(1) - 0.3) * 2.6 * p1); box.firstElementChild.lastElementChild.setAttribute("transform", `translate(0 ${-10 - 10 * Math.sin(t * 3)})`);
    L.forEach(l => on(l.p, pop(t, m(l.k) - 0.3) * p1)); on(att, pop(t, m(5) - 0.3) * p1); on(sav, pop(t, m(6) - 0.3) * p1);
    me.at(t, [[m(8) - 0.3, 200, 940], [m(9), 380, 940]], { k: t > m(8) - 0.6 ? 1 : 0, armR: t > m(9) ? -10 : undefined });
    cli.at(t, [[m(8) - 0.3, 900, 940], [m(9), 700, 940]], { k: t > m(8) - 0.6 ? 1 : 0, flip: true });
    place(doc.g, 1400, 500, pop(t, m(11) - 0.4) * 1.4 * (t > m(8) - 0.5 ? 1 : 0)); F.forEach((f, i) => on(f, pop(t, m(10) - 0.4 + i * 0.12)));
    on(bonus, pop(t, m(13) - 0.3));
  };
});

// ---- 17 · Bonus : le reverse convertible ----
SC("17", "BONUS · LE REVERSE CONVERTIBLE", (g, A) => {
  const m = A.m, head = title(g, 190, "Le reverse convertible : le loyer certain");
  const inv = pl(g, 680, 290, "L'INVERSE DE CE QU'ON VIENT DE VOIR", { size: 18 });
  el("path", { ...D.line, "stroke-width": 4, d: "M260 640 L1100 640" }, g);
  const cps = [0, 1, 2, 3].map(() => coin(g, 30)), lc = pl(g, 680, 720, "COUPON GARANTI, SAUF DÉFAUT DE L'ÉMETTEUR", { bg: C.accentSoft, size: 16 });
  const cond = pl(g, 1400, 290, "LE CAPITAL DEVIENT CONDITIONNEL", { bg: C.ink, fg: C.paper, size: 18 });
  const ec = el("circle", { ...D.line, fill: C.accent, cx: 1140, cy: 640, r: 14 }, g);
  const up = el("path", { ...D.line, stroke: C.ink, "stroke-width": 7, d: "M1140 640 L1640 460" }, g), dn = el("path", { ...D.line, stroke: C.accent, "stroke-width": 7, d: "M1140 640 L1640 820" }, g);
  draw(up, m(6) - 0.3, m(7)); draw(dn, m(8) - 0.3, m(9));
  const l1 = pl(g, 1560, 410, "100 % DU CAPITAL", { size: 18 }), l2 = pl(g, 1560, 880, "TU REÇOIS L'ACTION, EN PERTE", { bg: C.accent, size: 16 });
  const mur = pl(g, 960, 1000, "TU LOUES TON CAPITAL À PRIX D'OR… LES MURS PEUVENT REVENIR ABÎMÉS", { bg: C.ink, fg: C.paper, size: 16 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); on(inv, pop(t, m(2) - 0.3));
    cps.forEach((c, i) => { const k = pop(t, m(3) - 0.3 + i * 0.3); place(c, 380 + i * 200, 600 - 10 * Math.abs(Math.sin(t * 4 + i)), k); }); on(lc, pop(t, m(4) - 0.3));
    on(cond, pop(t, m(5) - 0.3)); ec.style.opacity = fade(t, m(6) - 0.5);
    on(l1, pop(t, m(7) - 0.3)); on(l2, pop(t, m(9) - 0.3)); on(mur, pop(t, m(10) - 0.3));
  };
});

// ---- 18 · Bonus : le décrément ----
SC("18", "BONUS · LE DÉCRÉMENT", (g, A) => {
  const m = A.m, head = title(g, 190, "Le décrément : la ligne d'arrivée qui recule");
  const ret = pl(g, 960, 290, "UN MONTANT FIXE RETIRÉ CHAQUE ANNÉE : 50 POINTS OU 5 %", { bg: C.accentSoft, size: 18 });
  el("rect", { ...D.line, fill: C.face, x: 300, y: 360, width: 1320, height: 300, rx: 14 }, g);
  const vr = el("path", { ...D.line, stroke: C.ink, "stroke-width": 7, d: "M340 630 L1580 400" }, g), dc = el("path", { ...D.line, stroke: C.accent, "stroke-width": 7, "stroke-dasharray": "14 10", d: "M340 630 L1580 540" }, g);
  draw(vr, m(4) - 0.3, m(4) + 1); draw(dc, m(4) + 0.2, m(4) + 1.4);
  const lv = txt(g, 1580, 385, "le vrai marché", 20, { anchor: "end", weight: 700 }), ld = txt(g, 1580, 580, "l'indice à décrément", 20, { anchor: "end", weight: 700, fill: C.accent });
  const tp = tapis(g, 900), w = marcheur(g, { vest: C.accent, hair: "f" }, 0.55), arr = el("g", {}, g); el("path", { ...D.line, "stroke-width": 6, d: "M0 0 L0 -120" }, arr); el("path", { ...D.line, fill: C.accent, d: "M0 -120 L60 -100 L0 -80 Z" }, arr);
  const fin = pl(g, 960, 1010, "C'EST CE QUI FINANCE UN COUPON PLUS ÉLEVÉ", { bg: C.ink, fg: C.paper, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); on(ret, pop(t, m(2) - 0.3)); lv.style.opacity = ld.style.opacity = fade(t, m(4));
    const kt = t > m(5) - 0.4 ? 1 : 0; tp.g.setAttribute("transform", "translate(960 900)"); tp.g.style.opacity = kt; tp.set(t);
    w.at(t, [[m(5), 820, 900]], { k: kt, armL: 100 + 25 * Math.sin(t * 11), armR: 80 - 25 * Math.sin(t * 11) });
    place(arr, 1300 + 40 * prog(t, m(7) - 0.3, m(8) + 1), 900, pop(t, m(6) - 0.3) * kt);
    on(fin, pop(t, m(8) - 0.3));
  };
});

// ---- 19 · Bonus : l'airbag ----
SC("19", "BONUS · L'AIRBAG", (g, A) => {
  const m = A.m, head = title(g, 190, "L'airbag : le choc amorti");
  el("path", { ...D.line, "stroke-width": 4, d: "M300 840 L1620 840" }, g);
  const c1 = crash(g), c2 = crash(g);
  const l1 = pl(g, 560, 420, "SANS AIRBAG : TOUTE LA BAISSE D'UN COUP", { size: 18 }), l2 = pl(g, 1300, 420, "AVEC AIRBAG : PERTE CALCULÉE DEPUIS LA BARRIÈRE", { bg: C.accentSoft, size: 16 });
  const mur = pl(g, 960, 960, "MÊME MUR, MÊME VITESSE… TU SORS EN MARCHANT", { size: 20 }), prix_ = pl(g, 960, 1030, "CE CONFORT SE PAIE : UN COUPON PLUS BAS", { bg: C.ink, fg: C.paper, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    c1.g.setAttribute("transform", "translate(380 720) scale(0.8)"); c1.g.style.opacity = fade(t, m(2) - 0.5);
    const k1 = prog(t, m(2) - 0.2, m(3)); c1.set(lerp(-100, 120, ease(k1)), 0); c1.g.firstElementChild.style.opacity = 1;
    c1.g.setAttribute("transform", `translate(380 720) scale(0.8) rotate(${k1 >= 1 ? -6 * Math.sin(Math.min(1, (t - m(3)) * 3) * Math.PI) : 0})`);
    c2.g.setAttribute("transform", "translate(1080 720) scale(0.8)"); c2.g.style.opacity = fade(t, m(4) - 0.5);
    const k2 = prog(t, m(4) - 0.2, m(5)); c2.set(lerp(-100, 110, ease(k2)), ease(prog(t, m(5) - 0.4, m(5))));
    on(l1, pop(t, m(2) - 0.2)); on(l2, pop(t, m(4) - 0.2)); on(mur, pop(t, m(6) - 0.3)); on(prix_, pop(t, m(8) - 0.3));
  };
});

// ---- 20 · Bonus : la barrière dégressive ----
SC("20", "BONUS · LA BARRIÈRE DÉGRESSIVE", (g, A) => {
  const m = A.m, head = title(g, 190, "La barrière dégressive : la haie qu'on abaisse");
  el("path", { ...D.line, "stroke-width": 4, d: "M300 820 L1620 820" }, g);
  const h = haie(g), val = big(g, 1100, 0, "", 44, C.accent), mk = marcheur(g, { vest: C.accent, hair: "f" }, 0.6);
  const st = pl(g, 960, 300, "MÊME SI LE MARCHÉ STAGNE, TES CHANCES DE SORTIR AUGMENTENT", { bg: C.accentSoft, size: 18 });
  const ob = pl(g, 960, 960, "CE N'EST PAS TOI QUI SAUTES PLUS HAUT : L'OBSTACLE DESCEND", { bg: C.ink, fg: C.paper, size: 18 });
  const bye = big(g, 960, 1040, "À très vite, avec des produits concrets", 36);
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const lv = t < m(3) ? 100 : t < m(4) ? 100 : t < m(5) ? 95 : t < m(9) ? 90 : lerp(90, 85, ease(prog(t, m(9), m(9) + 0.8)));
    const H = (lv - 70) * 9; h.g.setAttribute("transform", "translate(1100 820)"); h.g.style.opacity = fade(t, m(2) - 0.4); h.set(H);
    val.setAttribute("y", 800 - H - 30); val.textContent = Math.round(lv) + " %"; val.style.opacity = fade(t, m(3) - 0.4);
    // le saut au-dessus de la haie (980 → 1220)
    mk.at(t, [[m(6), 500, 820], [m(9) + 0.6, 960, 820], [m(9) + 1.3, 1300, 820]], { yOf: x => { const u = (x - 980) / 240; return u > 0 && u < 1 ? 820 - (H + 60) * 4 * u * (1 - u) : 820; } });
    on(st, pop(t, m(7) - 0.3)); on(ob, pop(t, m(8) - 0.3)); show(bye, fade(t, m(10) - 0.5));
  };
});
