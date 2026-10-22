// Parties 11 à 21 : décès et argent commun, clauses, un contrat par parent, plusieurs enfants, pot unique,
// combien de contrats, co-souscription, schéma C.

// ---- 11 · Schéma B : décès et argent commun ----
SC("11", "SCHÉMA B · DÉCÈS ET ARGENT COMMUN", (g, A) => {
  const m = A.m, head = title(g, 190, "Léo touche, le couple se rééquilibre");
  const tire = el("g", {}, g); const tI = el("g", { transform: "scale(1.5)" }, tire); D.icons.piggy(tI);
  const tN = big(g, 330, 700, "", 50), tL = txt(g, 330, 745, "argent commun du couple", 22, { weight: 500, fill: C.inkSoft });
  const fl = flux(g, 4), ct = contrat(g, "CONTRAT DE SOPHIE"), cN = big(g, 860, 700, "", 50);
  const sophie = member(g, "sophie", false), marc = member(g, "marc", false), leo = member(g, "leo");
  const hors = pill(g, 1500, 360, "24 000 € HORS SUCCESSION", { bg: C.accent, size: 22 });
  const moit = pill(g, 860, 360, "LA MOITIÉ ÉTAIT À MARC", { bg: C.face, size: 22 });
  const nt = notaire(g);
  const calc = [["220 000 € ÷ 2 = 110 000 € chacun", 9], ["Sophie a déjà utilisé 20 000 €", 10], ["Marc 110 000 €  ·  Sophie 90 000 €", 10]].map(([s, k], i) => ({ t: txt(g, 1080, 470 + i * 70, s, 36, { anchor: "start", font: "Serif", weight: 600 }), a: m(k) + i * 0.4 - (i === 2 ? 0.4 : 0) }));
  const plus = card(g, 640, 150, { fill: C.ink }); txt(plus, 0, -10, "+ 10 000 € pour Marc", 46, { font: "Serif", weight: 600, fill: C.paper });
  txt(plus, 0, 42, "pris sur la part de Sophie", 24, { weight: 500, fill: C.accentSoft });
  const leoOk = pill(g, 1500, 1000, "LÉO GARDE SES 24 000 €", { bg: C.accent, size: 24 });
  return t => {
    const p1 = out(t, m(8) - 0.6), p2 = ease(prog(t, m(8) - 0.6, m(8)));
    show(head, fade(t, m(1) - 0.5) * p1);
    place(tire, 330, 520, pop(t, m(2) - 0.4) * p1); tN.textContent = fmt(lerp(220000, 200000, ease(prog(t, m(3), m(3) + 0.8)))) + " €"; tN.style.opacity = tL.style.opacity = fade(t, m(2)) * p1;
    fl(t, m(3) - 0.2, m(3) + 0.8, 380, 500, 840, 520);
    sophie.at(t, m(3) - 0.6, 620, 900, { k: out(t, m(5)) * p1, scale: 0.8 });
    place(ct.g, 860, 520, pop(t, m(3)) * p1 * (1 - 0.3 * ease(prog(t, m(5), m(5) + 0.5))));
    cN.textContent = fmt(lerp(20000, 24000, ease(prog(t, m(4) - 0.4, m(4) + 0.6)))) + " €"; cN.style.opacity = fade(t, m(3) + 0.3) * p1;
    leo.at(t, m(6) - 0.5, 1500, 900, { k: p1 + (1 - p1) * 1, armL: 150 });
    place(hors.g, hors.x, hors.y, pop(t, m(6)) * p1); place(moit.g, moit.x, moit.y, pop(t, m(7)) * p1);
    marc.at(t, m(7) - 0.4, 1120, 900, { k: p1, scale: 0.85 });
    place(nt, 560, 600, pop(t, m(8) - 0.4) * p2 * 0.9);
    calc.forEach(c => c.t.style.opacity = fade(t, c.a) * p2);
    place(plus, 1300, 780, pop(t, m(11) - 0.3) * p2);
    place(leoOk.g, leoOk.x - 340, leoOk.y, pop(t, m(12) - 0.3) * p2);
    if (p2 > 0) leo.at(t, m(6) - 0.5, 1780, 960, { scale: 0.7 });
  };
});

// ---- 12 · Schéma B : qui touche si un parent décède ? ----
SC("12", "SCHÉMA B · LE DÉCÈS D'UN PARENT", (g, A) => {
  const m = A.m, head = title(g, 190, "Si un parent décède ?");
  // en-têtes (dessinés dans des groupes pour pouvoir les faire apparaître)
  const H = [[360, "Contrat de Sophie", "clause « mon enfant »", 2], [860, "Contrat de Sophie", "clause « conjoint d'abord »", 4], [1360, "Contrat de Léo", "schéma A", 6]].map(([x, a, b, k]) => {
    const w = el("g", {}, g); txt(w, x, 300, a, 30, { font: "Serif", weight: 700 }); txt(w, x, 336, b, 22, { weight: 500, fill: C.inkSoft });
    el("path", { ...D.line, stroke: C.accent, "stroke-width": 5, d: `M${x - 220} 356 L${x + 220} 356` }, w); return { w, a: m(k) - 0.4 }; });
  const R = (x, y, t1, t2, fill, k) => { const c = bloc(g, 460, 150, t1, t2, { fill, size: 32, size2: 20 }); return { c, x, y, a: m(k) }; };
  const rows = [R(360, 470, "Léo touche le capital", "géré par Marc s'il est mineur", C.face, 3), R(860, 470, "Marc touche tout", "Léo, seulement si Marc est décédé avant", C.face, 5),
    R(1360, 470, "Rien ne change", "le contrat reste à Léo", C.accentSoft, 6), R(610, 700, "Le contrat ne bouge pas", "", C.face, 7), R(1360, 700, "Rien ne change", "le contrat reste à Léo", C.accentSoft, 7)];
  const half = bloc(g, 1000, 120, "La moitié de sa valeur entre dans la succession de Marc", "partagée entre Sophie et Léo", { size: 30, fill: C.face });
  const lab = [txt(g, 1640, 480, "Sophie décède", 26, { anchor: "start", weight: 800, fill: C.inkSoft }), txt(g, 1640, 710, "Marc décède", 26, { anchor: "start", weight: 800, fill: C.inkSoft })];
  const netflix = pill(g, 960, 590, "DE QUOI FAIRE UNE SÉRIE NETFLIX", { bg: C.accent, size: 18 });
  const key = card(g, 1300, 100, { fill: C.ink }); txt(key, 0, 12, "Seul le contrat au nom de l'enfant ne dépend d'aucun décès.", 32, { font: "Serif", weight: 600, fill: C.paper });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    H.forEach(h => h.w.style.opacity = fade(t, h.a));
    rows.forEach(r => place(r.c, r.x, r.y, pop(t, r.a - 0.2)));
    lab[0].style.opacity = fade(t, m(3) - 0.3); lab[1].style.opacity = fade(t, m(7) - 0.3);
    place(netflix.g, 860, netflix.y, pop(t, m(5) + 0.4) * out(t, m(7) - 0.5));
    place(half, 610, 860, pop(t, m(8) - 0.3) * out(t, m(10) - 0.5) * (1 + 0.0 * fade(t, m(9))));
    place(key, 960, 990, pop(t, m(10) - 0.3));
  };
});

// ---- 13 · Ma recommandation : un contrat par parent ----
SC("13", "MA RECOMMANDATION", (g, A) => {
  const m = A.m, head = title(g, 190, "Un contrat par parent");
  const sophie = member(g, "sophie"), marc = member(g, "marc"), leo = member(g, "leo");
  const c1 = contrat(g, "CONTRAT DE SOPHIE"), c2 = contrat(g, "CONTRAT DE MARC");
  const a1 = arrow(g, 620, 560, 860, 640, m(4) - 0.4, m(4) + 0.2), a2 = arrow(g, 1300, 560, 1060, 640, m(4) - 0.2, m(4) + 0.4);
  const f1 = flux(g, 3), f2 = flux(g, 3);
  const cards = [["Chacun sa part", "chaque parent verse sur son contrat", 4], ["Toujours transmis", "152 500 € d'abattement par contrat", 6], ["Couples non mariés", "chacun garde le sien", 7]].map(([a, b, k], i) => ({ c: bloc(g, 480, 140, a, b, { size: 34, fill: i === 1 ? C.accentSoft : C.face }), x: 400 + i * 560, a: m(k) }));
  const jack = pill(g, 960, 330, "JACKPOT (FINANCIER, ON EST D'ACCORD)", { bg: C.accent, size: 22 });
  const kids = pill(g, 1500, 300, "450 ENFANTS ? ON VOIT ÇA APRÈS", { bg: C.face, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    sophie.at(t, m(2) - 0.6, 300, 760, { armR: 30 }); marc.at(t, m(3) - 0.6, 1620, 760, { flip: true, armR: 30 });
    place(c1.g, 500, 520, pop(t, m(2))); place(c2.g, 1420, 520, pop(t, m(3)));
    leo.at(t, m(1), 960, 800, { armL: 140, armR: 40 });
    a1.render(t); a2.render(t);
    f1(t, m(5) - 0.3, m(5) + 0.6, 520, 520, 940, 640); f2(t, m(5), m(5) + 0.9, 1400, 520, 980, 640);
    place(jack.g, jack.x, jack.y, pop(t, m(6) + 1.5) * out(t, m(7) - 0.4));
    place(kids.g, kids.x, kids.y, pop(t, m(3) + 1.2) * out(t, m(4)));
    cards.forEach(c => place(c.c, c.x, 960, pop(t, c.a - 0.2)));
  };
});

// ---- 14 · Chacun écrit sa clause ----
SC("14", "CHACUN ÉCRIT SA CLAUSE", (g, A) => {
  const m = A.m, head = title(g, 190, "Chacun écrit sa clause");
  const leo = member(g, "leo"), age = pill(g, 260, 360, "LÉO · 10 ANS", { bg: C.face, size: 22 }), val = big(g, 260, 470, "8 000 €", 60);
  const ct = contrat(g, "");
  const Q = [["CLAUSE SIMPLE", "Léo touche, Marc gère jusqu'à 18 ans", 4], ["CLAUSE DÉMEMBRÉE", "Marc en profite, puis rend à Léo", 5],
    ["TIERS ADMINISTRATEUR", "Mamie gère, pas Marc", 6], ["INALIÉNABILITÉ TEMPORAIRE", "bloqué jusqu'à 25 ans", 8]].map(([a, b, k], i) => {
    const c = card(g, 560, 170); txt(c, -250, -30, a, 22, { anchor: "start", weight: 800, ls: 4, fill: C.accent }); txt(c, -250, 22, b, 32, { anchor: "start", font: "Serif", weight: 600 });
    return { c, x: 820 + (i % 2) * 600, y: 380 + Math.floor(i / 2) * 210, a: m(k) };
  });
  const mamie = member(g, "mamie"); const lk = padlock(g);
  const tags = [["MODIFIABLE À TOUT MOMENT", 11], ["CLAUSES COMBINABLES", 10]].map(([s, k], i) => ({ p: pill(g, 0, 0, s, { bg: C.ink, fg: C.paper, size: 22 }), a: m(k), x: 820 + i * 600 }));
  const mot = pill(g, 1420, 830, "UN MOT DIFFICILE À DIRE…", { bg: C.face, size: 18 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    leo.at(t, m(2) - 0.5, 260, 900); place(age.g, age.x, age.y, pop(t, m(2))); val.style.opacity = fade(t, m(3) - 0.3);
    place(ct.g, 420, 760, pop(t, m(3)) * 0.8);
    Q.forEach(q => place(q.c, q.x, q.y, pop(t, q.a - 0.3)));
    mamie.at(t, m(7) - 0.4, 1780, 900, { k: out(t, m(8) + 0.5), scale: 0.6 });
    place(lk.g, 1700, 560, pop(t, m(9) - 0.3) * 0.5); lk.open(0);
    place(mot.g, mot.x, 720, pop(t, m(8) + 0.4) * out(t, m(10) - 0.5));
    tags.forEach(p => place(p.p.g, p.x, 900, pop(t, p.a - 0.2)));
  };
});

// ---- 15 · Plusieurs enfants ----
SC("15", "PLUSIEURS ENFANTS", (g, A) => {
  const m = A.m, head = title(g, 190, "Un enfant, un projet, une clause");
  const K3 = [["leo", "17 ans", "12 000 €", "permis et école", "Clause simple : il touche", 2, 3, 8], ["camille", "12 ans", "8 000 €", "premier logement", "Bloqué jusqu'à 25 ans", 4, 5, 9],
    ["noe", "6 ans", "5 000 €", "besoin d'être accompagné", "Un tiers de confiance gère", 6, 7, 11]].map(([w, age, v, proj, cl, a, b, c], i) => {
    const x = 400 + i * 560, kid = member(g, w);
    const ag = txt(g, x, 980, age, 22, { weight: 600, fill: C.inkSoft });
    const amount = big(g, x + 150, 520, v, 58), pr = txt(g, x + 150, 570, proj, 22, { weight: 600, fill: C.inkSoft });
    const pl = pill(g, x + 60, 360, cl, { bg: i === 1 ? C.accent : C.face, size: 20 });
    return { kid, ag, amount, pr, pl, x, a: m(a), b: m(b), c: m(c) };
  });
  const lk = padlock(g); const wink = pill(g, 960, 1040, "MALGRÉ SON CARACTÈRE, ON LA BLOQUE CELLE-LÀ", { bg: C.face, size: 18 });
  const ic = [voiture(g), el("g", {}, g), el("g", {}, g)]; D.icons.house(ic[1]); heart(ic[2]);
  return t => {
    show(head, fade(t, m(1) - 0.5));
    K3.forEach((k, i) => {
      k.kid.at(t, k.a - 0.5, k.x - 80, 900); k.ag.setAttribute("x", k.x - 80); k.ag.style.opacity = fade(t, k.a);
      show(k.amount, fade(t, k.b - 0.3)); show(k.pr, fade(t, k.b));
      place(ic[i], k.x + 150, 720, pop(t, k.b) * 0.8);
      place(k.pl.g, k.x + 60, 360, pop(t, k.c - 0.2));
    });
    place(lk.g, 1190, 365, pop(t, m(10) - 0.3) * 0.4); lk.open(0);
    place(wink.g, wink.x, wink.y - 30, pop(t, m(10)) * out(t, m(11) - 0.3));
  };
});

// ---- 16 · Le piège du pot unique ----
SC("16", "LE PIÈGE DU POT UNIQUE", (g, A) => {
  const m = A.m, head = title(g, 190, "Le piège du pot unique");
  const L = el("g", {}, g), R = el("g", {}, g);
  const boxL = card(L, 780, 640), boxR = card(R, 780, 640, { fill: C.ink });
  txt(L, 0, -270, "UN SEUL CONTRAT", 24, { weight: 800, ls: 6, fill: C.inkSoft }); txt(R, 0, -270, "UN CONTRAT PAR ENFANT", 24, { weight: 800, ls: 6, fill: C.accent });
  const pot = el("g", {}, L); stack(pot, 6, 40); const potN = big(L, 0, 0, "", 50);
  const steps = [["30 000 € pour 3 enfants", 2], ["Léo retire 10 000 € à 18 ans", 3], ["Décès : 20 000 € ÷ 3", 4]].map(([s, k], i) => ({ t: txt(L, -330, -200 + i * 50, (i + 1) + ".  " + s, 28, { anchor: "start", font: "Serif", weight: 600 }), a: m(k) }));
  const N = ["Léo", "Camille", "Noé"];
  const barsL = N.map((n, i) => { const r = el("rect", { ...D.line, fill: i ? C.inkSoft : C.face, x: -230 + i * 170, width: 120, rx: 8 }, L);
    return { r, v: big(L, -170 + i * 170, 0, "", 34), l: txt(L, -170 + i * 170, 270, n, 22, { weight: 700, fill: C.inkSoft }) }; });
  const barsR = N.map((n, i) => { const r = el("rect", { ...D.line, fill: i ? C.face : C.accent, x: -230 + i * 170, width: 120, rx: 8 }, R);
    return { r, v: big(R, -170 + i * 170, 0, "10 000 €", 34, C.paper), l: txt(R, -170 + i * 170, 270, n, 22, { weight: 700, fill: C.accentSoft }) }; });
  const stepsR = [["3 contrats de 10 000 €", 8], ["Léo vide le sien", 9], ["Les autres restent à 10 000 €", 10]].map(([s, k], i) => ({ t: txt(R, -330, -200 + i * 50, (i + 1) + ".  " + s, 28, { anchor: "start", font: "Serif", weight: 600, fill: C.paper }), a: m(k) }));
  const jal = pill(g, 1420, 1010, "ET ON NE JALOUSE PAS LES AUTRES !", { bg: C.accent, size: 18 });
  const setBar = (b, h, y0 = 230) => { b.r.setAttribute("y", y0 - h); b.r.setAttribute("height", Math.max(0, h)); b.r.style.opacity = h > 1 ? 1 : 0; b.v.setAttribute("y", y0 - h - 14); };
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(L, 500, 600, pop(t, m(1) - 0.2)); place(R, 1420, 600, pop(t, m(8) - 0.4));
    steps.forEach(s => s.t.style.opacity = fade(t, s.a - 0.3));
    place(pot, 220, -20, pop(t, m(2)) * out(t, m(4) - 0.2) * 0.7);
    potN.setAttribute("x", 220); potN.setAttribute("y", 80); potN.textContent = t < m(3) ? "30 000 €" : "20 000 €"; potN.style.opacity = fade(t, m(2)) * out(t, m(4) - 0.2);
    const kL = ease(prog(t, m(5) - 0.3, m(5) + 0.4)), kL2 = ease(prog(t, m(6) - 0.3, m(6) + 0.4));
    barsL.forEach((b, i) => { const v = i ? 6667 * kL : 6667 * kL + 10000 * kL2; setBar(b, 210 * v / 16667 * (kL > 0 ? 1 : 0));
      b.v.textContent = v > 1 ? fmt(v) + " €" : ""; b.l.style.opacity = fade(t, m(4)); });
    const kR = ease(prog(t, m(8), m(8) + 0.6)), kR2 = ease(prog(t, m(9) - 0.3, m(9) + 0.4));
    barsR.forEach((b, i) => { const h = 180 * kR * (i === 0 ? 1 - kR2 : 1); setBar(b, h); b.v.style.opacity = kR * (i === 0 ? 1 - kR2 : fade(t, m(10) - 0.3) || 1); b.l.style.opacity = kR; });
    stepsR.forEach(s => s.t.style.opacity = fade(t, s.a - 0.3));
    place(jal.g, jal.x, jal.y, pop(t, m(10) + 0.4));
  };
});

// ---- 17 · Combien de contrats ? ----
SC("17", "COMBIEN DE CONTRATS ?", (g, A) => {
  const m = A.m, head = title(g, 190, "Deux parents, trois enfants : combien de contrats ?");
  const grid = el("g", {}, g);
  ["Léo", "Camille", "Noé"].forEach((n, j) => txt(grid, 200 + j * 170, -10, n, 26, { font: "Serif", weight: 700 }));
  const cells = [];
  ["Marc", "Sophie"].forEach((p, i) => { txt(grid, 40, 72 + i * 100, p, 26, { anchor: "start", font: "Serif", weight: 700 });
    [0, 1, 2].forEach(j => { const c = el("g", {}, grid); el("rect", { ...D.line, fill: i ? C.accent : C.ink, x: -70, y: -35, width: 140, height: 70, rx: 14 }, c);
      txt(c, 0, 8, "contrat", 20, { weight: 700, fill: i ? C.ink : C.paper }); cells.push({ c, x: 200 + j * 170, y: 64 + i * 100, i, j }); }); });
  const tot = big(g, 520, 790, "2 × 3 = 6 contrats", 52);
  const perd = pill(g, 520, 880, "MOI-MÊME, JE ME PERDS", { bg: C.face, size: 20 });
  const opts = [["1", "Tout faire : 6 contrats", "le plus lourd, le plus solide", 2], ["2", "Un contrat par enfant, d'un parent", "plus léger · familles recomposées", 5], ["3", "Schéma A : au nom de chaque enfant", "réglé, mais don définitif et déclaré", 7]].map(([n, a, b, k], i) => {
    const r = el("g", {}, g); el("circle", { ...D.line, fill: i === 2 ? C.accent : C.ink, r: 30 }, r); txt(r, 0, 12, n, 32, { font: "Serif", weight: 700, fill: i === 2 ? C.ink : C.paper });
    txt(r, 54, -2, a, 34, { anchor: "start", font: "Serif", weight: 700 }); txt(r, 54, 34, b, 22, { anchor: "start", weight: 500, fill: C.inkSoft }); return { r, a: m(k), y: 380 + i * 170 };
  });
  const verdict = card(g, 1500, 100, { fill: C.ink }); txt(verdict, 0, 12, "Le vrai choix : garder la main, ou donner. Le notaire tranche.", 34, { font: "Serif", weight: 600, fill: C.paper });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(grid, 220, 420, fade(t, m(1)));
    cells.forEach(c => place(c.c, c.x, c.y, pop(t, (c.i ? m(3) : m(2)) - 0.4 + c.j * 0.2)));
    show(tot, fade(t, m(4) - 0.3)); place(perd.g, perd.x, perd.y, pop(t, m(3) + 0.6) * out(t, m(5) - 0.3));
    opts.forEach(o => place(o.r, 1040, o.y, pop(t, o.a - 0.3)));
    place(verdict, 960, 990, pop(t, m(8) - 0.3));
  };
});

// ---- 18 · La co-souscription ----
SC("18", "LA CO-SOUSCRIPTION", (g, A) => {
  const m = A.m, head = title(g, 190, "Un contrat, deux noms");
  const solid = pill(g, 960, 290, "POUR LES COUPLES SOLIDES", { bg: C.accent, size: 24 });
  const duo = ["Léo", "Camille", "Noé"].map((n, i) => { const c = el("g", {}, g);
    el("rect", { ...D.line, fill: C.ink, x: -150, y: -45, width: 150, height: 90, rx: 18 }, c); el("rect", { ...D.line, fill: C.accent, x: 0, y: -45, width: 150, height: 90, rx: 18 }, c);
    txt(c, -75, 9, "Marc", 24, { weight: 700, fill: C.paper }); txt(c, 75, 9, "Sophie", 24, { weight: 700 }); txt(c, 0, -66, n, 28, { font: "Serif", weight: 700 });
    return { c, x: 320 + i * 360, a: i ? m(4) - 0.6 + i * 0.3 : m(3) }; });
  const trois = big(g, 680, 650, "3 contrats au lieu de 6", 50);
  const L = (s, k, ok, y) => { const r = el("g", {}, g); const c = check(r, ok); c.setAttribute("transform", "scale(0.7)");
    txt(r, 44, 12, s, 30, { anchor: "start", font: "Serif", weight: 600 }); return { r, a: m(k), y }; };
  const pros = [L("Moins de contrats, moins de frais", 5, true, 380), L("Colle à la réalité : l'argent est commun", 6, true, 460), L("En pratique, réservé aux couples mariés", 7, false, 540), L("Tout se signe à deux", 8, false, 620)];
  const cam = member(g, "camille"), marc = member(g, "marc"), sophie = member(g, "sophie");
  const conc = pill(g, 760, 760, "CONCERT DES JONAS BROTHERS", { bg: C.face, size: 22 });
  const sign = el("g", {}, g); D.icons.contract(sign); const no = check(g, false);
  const safe = card(g, 1500, 100, { fill: C.ink }); txt(safe, 0, 12, "Ça marche si le couple reste d'accord. Sinon, deux contrats séparés.", 32, { font: "Serif", weight: 600, fill: C.paper });
  return t => {
    const p1 = out(t, m(9) - 0.6), p2 = ease(prog(t, m(9) - 0.6, m(9)));
    show(head, fade(t, m(1) - 0.5) * p1); place(solid.g, solid.x, solid.y, pop(t, m(1) - 0.2) * p1);
    duo.forEach(d => place(d.c, d.x, 480, pop(t, d.a - 0.3) * p1));
    show(trois, fade(t, m(4)) * p1);
    pros.forEach(p => place(p.r, 1300, p.y, pop(t, p.a - 0.3) * p1));
    cam.at(t, m(9) - 0.5, 520, 900, { k: p2, armR: -30 }); place(conc.g, conc.x, conc.y - 200, pop(t, m(9)) * p2);
    marc.at(t, m(9) + 0.6, 900, 900, { k: p2, armR: 20 }); sophie.at(t, m(10) - 0.3, 1400, 900, { k: p2, flip: true, armR: t > m(10) + 0.3 ? -40 : 75 });
    place(sign, 1160, 560, pop(t, m(10)) * p2); place(no, 1220, 500, pop(t, m(10) + 0.5) * p2);
    place(safe, 960, 1010, pop(t, m(11) - 0.3));
  };
});

// ---- 19 · Co-souscription : donner et transmettre ----
SC("19", "CO-SOUSCRIPTION · DONNER, TRANSMETTRE", (g, A) => {
  const m = A.m, head = title(g, 190, "Donner à Léo, avant ou au décès");
  const leo = member(g, "leo"); const ct = contrat(g, "CONTRAT CO-SOUSCRIT · LÉO");
  const fl1 = flux(g, 3), fl2 = flux(g, 3);
  const r5 = pill(g, 760, 330, "RACHAT : 5 000 €", { bg: C.accent, size: 26 });
  const parts = [pill(g, 0, 0, "2 500 € DE MARC", { bg: C.ink, fg: C.paper, size: 20 }), pill(g, 0, 0, "2 500 € DE SOPHIE", { bg: C.accent, size: 20 })];
  const ab = pill(g, 760, 820, "GAINS : 9 200 € D'ABATTEMENT PAR AN APRÈS 8 ANS", { bg: C.face, size: 20 });
  const pa = pill(g, 760, 900, "+ UN PACTE ADJOINT POUR ENCADRER L'USAGE", { bg: C.face, size: 20 });
  const o1 = bloc(g, 700, 220, "Option 1 · au premier décès", "le contrat se ferme, Léo touche tout", { size: 36 });
  const o2 = bloc(g, 700, 220, "Option 2 · au second décès", "le survivant garde, Léo touche à la fin", { size: 36, fill: C.accentSoft });
  const choix = pill(g, 960, 330, "LE COUPLE CHOISIT À L'OUVERTURE", { bg: C.accent, size: 24 });
  const key = card(g, 1500, 100, { fill: C.ink }); txt(key, 0, 12, "Léo ne touche pas à une date : il touche à un décès.", 34, { font: "Serif", weight: 600, fill: C.paper });
  return t => {
    const p1 = out(t, m(6) - 0.6), p2 = ease(prog(t, m(6) - 0.6, m(6)));
    show(head, fade(t, A.s));
    leo.at(t, m(1) - 0.5, 1500, 860, { k: p1, scale: 1.15, armL: 150 });
    place(ct.g, 420, 560, pop(t, m(1)) * p1);
    place(r5.g, r5.x, r5.y, pop(t, m(2) - 0.3) * p1);
    fl1(t, m(2), m(2) + 1, 450, 540, 1450, 560); fl2(t, m(3) - 0.2, m(3) + 0.8, 450, 540, 1450, 560);
    parts.forEach((p, i) => place(p.g, 960, 520 + i * 90, pop(t, m(3) - 0.2 + i * 0.4) * p1));
    place(ab.g, ab.x, ab.y, pop(t, m(4) - 0.3) * p1); place(pa.g, pa.x, pa.y, pop(t, m(5) - 0.3) * p1);
    place(choix.g, choix.x, choix.y, pop(t, m(6) - 0.2) * p2);
    place(o1, 560, 560, pop(t, m(7) - 0.3) * p2); place(o2, 1360, 560, pop(t, m(8) - 0.3) * p2);
    place(key, 960, 860, pop(t, m(9) - 0.3) * p2);
  };
});

// ---- 20 · Schéma C : le meilleur des deux ----
SC("20", "SCHÉMA C · MIXTE", (g, A) => {
  const m = A.m, head = title(g, 190, "Schéma C : le meilleur des deux");
  const recap = [bloc(g, 640, 160, "A : on donne", "au nom de l'enfant, la main à 18 ans", { size: 40 }), bloc(g, 640, 160, "B : on garde la main", "au nom du parent, on donne au bon moment", { size: 40, fill: C.accentSoft })];
  const P = [["POCHE DISPONIBLE", "Livret A, puis Livret Jeune", "couches, lait, argent de poche", C.face, 2], ["POCHE SOUPLESSE · B", "L'assurance vie des parents", "vous gardez la main", C.face, 3],
    ["POCHE SANCTUARISÉE · A", "L'assurance vie de l'enfant", "dons de la famille, à l'abri", C.ink, 6]].map(([a, b, c, fill, k], i) => {
    const cd = card(g, 520, 420, { fill }); const dark = fill === C.ink;
    const ic = el("g", { transform: "translate(0 -100)" }, cd); if (i === 0) livret(ic); else if (i === 1) cle(ic); else { const l = padlock(ic); l.g.setAttribute("transform", "translate(0 10)"); }
    txt(cd, 0, 30, a, 22, { weight: 800, ls: 4, fill: C.accent }); txt(cd, 0, 84, b, 32, { font: "Serif", weight: 700, fill: dark ? C.paper : C.ink });
    txt(cd, 0, 130, c, 22, { weight: 500, fill: dark ? C.accentSoft : C.inkSoft }); return { cd, x: 380 + i * 580, a: m(k) };
  });
  const mamie = member(g, "mamie"), gift = cadeau(g);
  const err = pill(g, 1500, 300, "TOUT SUR LE LIVRET ? LA PIRE ERREUR", { bg: C.accent, size: 22 });
  const lv = livret(g); const no = check(g, false);
  return t => {
    const r = out(t, m(1) - 0.4);
    recap.forEach((c, i) => place(c, 960, 430 + i * 230, pop(t, A.s + 0.6 + i * 1.5) * r));
    show(head, fade(t, m(1) - 0.4));
    P.forEach((p, i) => place(p.cd, p.x, 560, pop(t, p.a - 0.3) * (i === 2 ? 1 : 1)));
    mamie.at(t, m(4) - 0.4, 1720, 1000, { scale: 0.62, k: out(t, m(6) - 0.4) });
    place(gift, 1560, 940, pop(t, m(4)) * out(t, m(6) - 0.4) * 0.6);
    place(err.g, err.x, err.y, pop(t, m(5) - 0.3) * out(t, m(6) - 0.2));
    place(lv, 1160, 940, pop(t, m(5) - 0.3) * out(t, m(6) - 0.2) * 0.7); place(no, 1210, 890, pop(t, m(5)) * out(t, m(6) - 0.2));
  };
});

// ---- 21 · Schéma C : un dosage par enfant ----
SC("21", "SCHÉMA C · UN DOSAGE PAR ENFANT", (g, A) => {
  const m = A.m, head = title(g, 190, "Un dosage par enfant");
  const cols = [["LIVRET", "le quotidien", 2], ["B · PARENTS", "vous gardez la main", 3], ["A · ENFANT", "si les grands-parents participent", 6]].map(([a, b, k], i) => {
    const w = el("g", {}, g); txt(w, 760 + i * 380, 300, a, 24, { weight: 800, ls: 5, fill: C.ink }); txt(w, 760 + i * 380, 332, b, 20, { weight: 500, fill: C.inkSoft }); return { w, a: m(k) - 0.3 }; });
  const kids = [["leo", "Léo", "argent de poche", "on sécurise", "—"], ["camille", "Camille", "petits besoins", "le moteur", "30 €"], ["noe", "Noé", "symbolique", "le moteur, sur la durée", "50 €"]].map(([w, n, l, b, a], i) => {
    const y = 470 + i * 170, row = card(g, 1560, 140); const kid = member(g, w, false);
    txt(row, -640, 12, n, 34, { anchor: "start", font: "Serif", weight: 700 });
    const cell = (x, v, s, k, col = C.ink) => { const c = el("g", {}, g); txt(c, x, y - 4, v, 44, { font: "Serif", weight: 700, fill: col }); txt(c, x, y + 32, s, 20, { weight: 500, fill: C.inkSoft }); return { c, k }; };
    return { row, kid, y, cells: [cell(760, "10 €", l, 2), cell(1140, "100 €", b, 3), cell(1520, a, a === "—" ? "pas de grands-parents" : "par mois, de papi", a === "50 €" ? 8 : 7, C.accent)] };
  });
  const banner = card(g, 1500, 90, { fill: C.ink }); txt(banner, 0, 10, "Les grands-parents versent directement sur le contrat de l'enfant.", 30, { font: "Serif", weight: 600, fill: C.paper });
  const papi = member(g, "marc", false);
  return t => {
    show(head, fade(t, m(1) - 0.5));
    cols.forEach(c => c.w.style.opacity = fade(t, c.a));
    kids.forEach((k, i) => { place(k.row, 960, k.y, pop(t, m(1) + i * 0.25)); k.kid.at(t, m(1) + i * 0.25, 230, k.y + 60, { scale: 0.45 });
      k.cells.forEach((c, j) => c.c.style.opacity = fade(t, (j === 2 && i === 0 ? m(6) : m(c.k)) - 0.3)); });
    const hl = ease(prog(t, m(4) - 0.3, m(4))) * out(t, m(5) + 0.5);
    kids[1].row.style.opacity = kids[2].row.style.opacity = 1; kids[0].row.style.opacity = 1 - 0.5 * hl;
    place(banner, 960, 990, pop(t, m(9) - 0.3));
  };
});
