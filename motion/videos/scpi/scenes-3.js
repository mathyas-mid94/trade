// Parties 18 à 26 : risque, exemples (Iroko Zen, Osmo Énergie, EDR Europa), fiscalité européenne, ratios, cash, effet de levier.

// ---- 18 · Le niveau de risque ----
SC("18", "LE NIVEAU DE RISQUE", (g, A) => {
  const m = A.m, head = title(g, 190, "L'échelle de risque");
  const R = [1, 2, 3, 4, 5, 6, 7].map(i => { const w = el("g", {}, g); const c = el("circle", { ...D.line, fill: C.face, r: 60 }, w); txt(w, 0, 18, String(i), 52, { font: "Serif", weight: 700 }); return { w, c, i }; });
  const lo = txt(g, 540, 590, "risque plus faible", 24, { weight: 500, fill: C.inkSoft }), hi = txt(g, 1380, 590, "risque plus élevé", 24, { weight: 500, fill: C.inkSoft });
  const mamie = member(g, "mamie"), mp = pl(g, 1000, 760, "MÊME POUR UNE MAMIE QUI A PEUR D'INVESTIR", { bg: C.accentSoft, size: 20 });
  const pc = pl(g, 1000, 860, "MAIS UN RISQUE DE PERTE EN CAPITAL", { bg: C.ink, fg: C.paper, size: 22 });
  return t => {
    show(head, fade(t, m(1) - 0.6));
    R.forEach(r => { place(r.w, 540 + (r.i - 1) * 140, 480, pop(t, m(1) - 0.4 + r.i * 0.06) * (r.i === 3 ? 1 + 0.25 * fade(t, m(2) - 0.2) : 1)); r.c.setAttribute("fill", r.i === 3 && t > m(2) - 0.2 ? C.accent : C.face); });
    lo.style.opacity = hi.style.opacity = fade(t, m(1));
    mamie.at(t, m(3) - 0.4, 330, 980); on(mp, pop(t, m(3) - 0.2)); on(pc, pop(t, m(4) - 0.3));
  };
});

// ---- 19 · Exemple : Iroko Zen ----
SC("19", "EXEMPLE : IROKO ZEN", (g, A) => {
  const m = A.m;
  const nom = bloc(g, 520, 110, "Iroko Zen", "exemple de SCPI", { fill: C.ink, size: 54 });
  const I = [["≈ 1,5 MILLIARD D'EUROS", 3], ["FRANCE + EUROPE DE L'OUEST", 4], ["LABEL ISR", 5]].map(([s, k], i) => ({ p: pl(g, 520 + i * 460, 420, s, { size: 20 }), k }));
  const S = [["204 €", "le prix d'une part", 6], ["7,14 %", "de rendement", 7], ["5 000 €", "minimum pour commencer", 8]].map(([a, b, k], i) => ({ c: bloc(g, 380, 140, a, b, { fill: i === 1 ? C.accent : C.face, size: 56 }), x: 520 + i * 440, k }));
  const loc = ["BURGER KING", "DECATHLON", "LEROY MERLIN", "AUCHAN", "STARBUCKS"].map((s, i) => pl(g, 380 + i * 290, 820, s, { bg: C.paperDeep, size: 18 }));
  const inv = bloc(g, 440, 120, "100 000 €", "investis", { size: 60 }), loy = pl(g, 400, 520, "≈ 595 € PAR MOIS", { bg: C.accent, size: 26 }), fl = flux(g, 4);
  el("path", { ...D.line, "stroke-width": 5, d: "M880 960 L1300 960" }, g);
  const cap = el("rect", { ...D.line, fill: C.inkSoft, x: 960, width: 260, rx: 10 }, g), lo = el("rect", { ...D.line, fill: C.accent, x: 960, width: 260, rx: 10 }, g);
  const tc = big(g, 1090, 0, "", 40, C.paper), tl = big(g, 1090, 0, "", 40);
  const lc = txt(g, 1250, 0, "ton capital", 24, { anchor: "start", weight: 600, fill: C.inkSoft }), ll = txt(g, 1250, 0, "les loyers encaissés", 24, { anchor: "start", weight: 600, fill: C.accent });
  const hyp = pl(g, 400, 680, "HYPOTHÈSE : +1 % PAR AN", { size: 18 }), vingt = calendar(g, "20 ans");
  const tot = bloc(g, 440, 140, "≈ 280 000 €", "au bout de 20 ans", { fill: C.ink, size: 54 }), pat = pl(g, 1600, 620, "UN PATRIMOINE QUI RAPPORTE", { bg: C.accentSoft, size: 18 });
  return t => {
    const p1 = out(t, m(10) - 0.5);
    place(nom, 960, 290, pop(t, m(2) - 0.4) * p1); I.forEach(o => on(o.p, pop(t, m(o.k) - 0.3) * p1));
    S.forEach(s => place(s.c, s.x, 590, pop(t, m(s.k) - 0.3) * p1)); loc.forEach((p, i) => on(p, pop(t, m(9) - 0.4 + i * 0.12) * p1));
    const v = fade(t, m(10) - 0.3);
    place(inv, 400, 360, pop(t, m(10) - 0.3)); on(loy, pop(t, m(11) - 0.3)); fl(t, m(11), m(11) + 1.3, 1200, 600, 400, 560, 100);
    const kc = 200 + 44 * ease(prog(t, m(13) - 0.3, m(14) + 0.3)), kl = 314 * ease(prog(t, m(15) - 0.3, m(16) + 0.3));
    cap.setAttribute("y", 960 - kc * v); cap.setAttribute("height", kc * v); cap.style.opacity = v;
    lo.setAttribute("y", 960 - kc - kl); lo.setAttribute("height", kl); lo.style.opacity = kl > 2 ? 1 : 0;
    tc.setAttribute("y", 960 - kc / 2 + 14); tc.textContent = Math.round(100 + 22 * prog(t, m(13) - 0.3, m(14) + 0.3)) + " k€"; tc.style.opacity = v;
    tl.setAttribute("y", 960 - kc - kl / 2 + 14); tl.textContent = kl > 60 ? "157 k€" : "";
    lc.setAttribute("y", 960 - kc / 2 + 8); lc.style.opacity = v; ll.setAttribute("y", 960 - kc - kl / 2 + 8); ll.style.opacity = kl > 60 ? 1 : 0;
    on(hyp, pop(t, m(13) - 0.3)); place(vingt.g, 400, 860, pop(t, m(14) - 0.4) * 0.9);
    place(tot, 1600, 440, pop(t, m(17) - 0.3)); on(pat, pop(t, m(18) - 0.3));
  };
});

// ---- 20 · La force de la SCPI, et les frais ----
SC("20", "LA FORCE DE LA SCPI, ET LES FRAIS", (g, A) => {
  const m = A.m, head = title(g, 190, "La force de la SCPI");
  const cp = [], lc = []; for (let i = 0; i <= 30; i++) { const x = i / 30; cp.push([x, 0.35 + 0.15 * x]); lc.push([x, 0.02 + 0.55 * x]); }
  const ch = K.chart(g, 1000, 520, cp, { color: C.ink, sw: 8 }), cl = K.chart(g, 1000, 520, lc, { color: C.accent, sw: 8, frame: false });
  ch.g.setAttribute("transform", "translate(960 580)"); cl.g.setAttribute("transform", "translate(960 580)");
  draw(ch.line, m(2) - 0.4, m(2) + 0.8); draw(cl.line, m(3) - 0.4, m(3) + 0.8);
  const l1 = pl(g, 1620, 440, "LA VALEUR DE TES PARTS", { bg: C.ink, fg: C.paper, size: 18 }), l2 = pl(g, 1620, 360, "LES LOYERS CUMULÉS", { bg: C.accent, size: 18 });
  const fr = big(g, 960, 300, "Les frais", 56), ss = pl(g, 960, 380, "FRAIS DE SOUSCRIPTION ≈ 10 %", { bg: C.accentSoft, size: 24 });
  const en = pl(g, 700, 460, "À L'ENTRÉE", { size: 20 }), so = pl(g, 1220, 460, "OU, POUR CERTAINES, À LA SORTIE", { size: 20 });
  el("path", { ...D.line, "stroke-width": 5, d: "M380 940 L1540 940" }, g);
  const c1 = colonne(g, 560, 940, 240, C.inkSoft), c2 = colonne(g, 960, 940, 240, C.inkSoft), c3 = colonne(g, 1360, 940, 240, C.accent);
  const t1 = txt(g, 560, 990, "tu mets", 22, { weight: 600, fill: C.inkSoft }), t2 = txt(g, 960, 990, "tes parts valent", 22, { weight: 600, fill: C.inkSoft }), t3 = txt(g, 1360, 990, "tu repars avec", 22, { weight: 600, fill: C.accent });
  const m10 = pl(g, 1360, 560, "− 10 % DE FRAIS", { size: 18 }), loy = pl(g, 1700, 760, "+ TOUS LES LOYERS", { bg: C.accent, size: 18 });
  return t => {
    const p1 = out(t, m(4) - 0.5);
    show(head, fade(t, m(1) - 0.5) * p1); ch.g.style.opacity = fade(t, m(1) - 0.3) * p1; cl.g.style.opacity = p1;
    on(l1, pop(t, m(2) + 0.3) * p1); on(l2, pop(t, m(3) + 0.3) * p1);
    show(fr, fade(t, m(4) - 0.2)); on(ss, pop(t, m(5) - 0.3)); on(en, pop(t, m(6) - 0.3)); on(so, pop(t, m(7) - 0.3));
    c1.set(300 * ease(prog(t, m(8) - 0.3, m(8) + 0.4)), "100 k€"); t1.style.opacity = fade(t, m(8) - 0.3);
    c2.set(360 * ease(prog(t, m(9) - 0.3, m(9) + 0.4)), "120 k€"); t2.style.opacity = fade(t, m(9) - 0.3);
    c3.set(330 * ease(prog(t, m(10) - 0.3, m(10) + 0.4)), "110 k€"); t3.style.opacity = fade(t, m(10) - 0.3); on(m10, pop(t, m(10) - 0.2));
    on(loy, pop(t, m(11) - 0.3));
  };
});

// ---- 21 · Exemple : Osmo Énergie ----
SC("21", "EXEMPLE : OSMO ÉNERGIE", (g, A) => {
  const m = A.m;
  const nom = bloc(g, 560, 110, "Osmo Énergie", "deuxième exemple", { fill: C.ink, size: 54 });
  const p = bloc(g, 380, 140, "300 €", "le prix d'une part", { size: 56 }), r = bloc(g, 380, 140, "7 %", "de rendement", { fill: C.accent, size: 56 });
  const loc = ["ACTION", "SAINSBURY'S", "DPD", "BUFFALO GRILL", "JULES"].map((s, i) => pl(g, 380 + i * 290, 650, s, { bg: C.paperDeep, size: 18 }));
  const inv = bloc(g, 380, 130, "100 000 €", "investis", { size: 54 }), loy = bloc(g, 380, 130, "≈ 583 €", "par mois", { fill: C.accentSoft, size: 54 });
  const cal = calendar(g, "20 ans"), tot = bloc(g, 420, 130, "≈ 276 000 €", "capital total", { fill: C.ink, size: 50 });
  return t => {
    place(nom, 960, 290, pop(t, m(1) - 0.4));
    place(p, 740, 470, pop(t, m(2) - 0.3)); place(r, 1180, 470, pop(t, m(3) - 0.3));
    loc.forEach((q, i) => on(q, pop(t, m(4) - 0.4 + i * 0.12)));
    place(inv, 420, 850, pop(t, m(5) - 0.3)); place(loy, 860, 850, pop(t, m(6) - 0.3));
    place(cal.g, 1200, 850, pop(t, m(7) - 0.3) * 0.9); place(tot, 1580, 850, pop(t, m(8) - 0.3));
  };
});

// ---- 22 · Edmond de Rothschild Europa ----
SC("22", "EDMOND DE ROTHSCHILD EUROPA", (g, A) => {
  const m = A.m;
  const pr = pl(g, 960, 230, "TRÈS PRISÉE", { bg: C.accent, size: 22 }), nom = bloc(g, 640, 110, "EDR Europa", "Edmond de Rothschild", { fill: C.ink, size: 56 });
  const L = [["Une banque privée de premier plan", 3], ["250 ans d'histoire familiale", 4], ["13 milliards d'euros gérés en immobilier", 5]].map(([s, k], i) => ligne(g, s, m(k), 470 + i * 80, true, 30));
  const R = [["Des équipes dans 8 pays", 6], ["Des opérations hors marché", 7], ["Du « sale and leaseback »", 8]].map(([s, k], i) => ligne(g, s, m(k), 470 + i * 80, true, 30));
  const ent = parc(g, 0.9), lb = txt(g, 560, 935, "L'ENTREPRISE", 20, { weight: 800, ls: 4, fill: C.inkSoft });
  const scpi = bloc(g, 300, 90, "La SCPI", "", { fill: C.accent, size: 36 });
  const a1 = arrow(g, 680, 800, 1060, 800, m(9) - 0.4, m(9) + 0.3, { bend: -50 }), a2 = arrow(g, 1060, 880, 680, 880, m(9) + 0.3, m(9) + 1, { color: C.ink, bend: -50 });
  const v = pl(g, 870, 720, "ELLE VEND SES MURS", { size: 18 }), lo = pl(g, 870, 960, "ET RESTE LOCATAIRE, LONGTEMPS", { size: 18 });
  const rdv = pl(g, 1550, 980, "SI ÇA T'INTÉRESSE : RENDEZ-VOUS DÉDIÉ", { bg: C.ink, fg: C.paper, size: 18 }), det = pl(g, 1550, 900, "JE NE DÉTAILLE PAS TOUT ICI", { size: 18 });
  return t => {
    on(pr, pop(t, m(1) - 0.3)); place(nom, 960, 340, pop(t, m(2) - 0.4));
    L.forEach(l => place(l.r, 200, l.y, pop(t, l.a - 0.3))); R.forEach(l => place(l.r, 1080, l.y, pop(t, l.a - 0.3)));
    place(ent, 560, 830, pop(t, m(9) - 0.6)); lb.style.opacity = fade(t, m(9) - 0.5); place(scpi, 1200, 840, pop(t, m(9) - 0.5));
    a1.render(t); a2.render(t); on(v, pop(t, m(9))); on(lo, pop(t, m(9) + 0.8));
    on(det, pop(t, m(10) - 0.3)); on(rdv, pop(t, m(11) - 0.3));
  };
});

// ---- 23 · L'atout des SCPI européennes ----
SC("23", "L'ATOUT DES SCPI EUROPÉENNES", (g, A) => {
  const m = A.m, head = title(g, 190, "L'atout des SCPI européennes");
  const fr = pl(g, 640, 620, "FRANCE", { bg: C.ink, fg: C.paper, size: 26 }), lourd = pl(g, 640, 690, "FISCALITÉ PARMI LES PLUS LOURDES", { size: 16 });
  const P = [["PAYS-BAS", 820, 400], ["ALLEMAGNE", 1000, 500], ["ESPAGNE", 480, 840], ["ITALIE", 920, 800]].map(([s, x, y]) => ({ p: pl(g, x, y, s, { bg: C.accentSoft, size: 22 }), x, y }));
  const toi = pl(g, 300, 400, "TOI", { bg: C.accent, size: 24 }), fl = P.map(() => flux(g, 2));
  const conv = contrat(g, "CONVENTIONS FISCALES", { size: 20 });
  const L = [["Imposés dans le pays d'origine", 6, true], ["Souvent plus doucement qu'en France", 7, true], ["Pas de double imposition", 8, true], ["Pas de prélèvements sociaux français", 9, true], ["Pris en compte pour ton taux d'imposition", 10, false]]
    .map(([s, k, ok], i) => ({ ...ligne(g, s, m(k), 560 + i * 72, true, 26, ok ? C.ink : C.inkSoft) }));
  const poche = pl(g, 1450, 950, "PLUS D'ARGENT DANS TA POCHE", { bg: C.accent, size: 22 });
  const sec = ["BUREAUX", "LOGISTIQUE", "COMMERCES", "HÔTELLERIE"].map((s, i) => pl(g, 330 + i * 200, 1000, s, { size: 16 })), port = pl(g, 820, 330, "LES GRANDS PORTS", { size: 16 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    on(fr, pop(t, m(2) - 0.3)); on(lourd, pop(t, m(2))); P.forEach((p, i) => on(p.p, pop(t, m(3) - 0.3 + i * 0.12)));
    on(toi, pop(t, m(4) - 0.4)); P.forEach((p, i) => { const c0 = Math.floor((t - m(4)) / 2.5) * 2.5 + m(4) + i * 0.3; fl[i](t, t > m(4) ? c0 : 1e9, t > m(4) ? c0 + 1.2 : 1e9 + 1, p.x, p.y, 300, 400, 60); });
    place(conv.g, 1450, 360, pop(t, m(5) - 0.3) * 0.9);
    L.forEach(l => place(l.r, 1130, l.y, pop(t, l.a - 0.3)));
    on(poche, pop(t, m(11) - 0.3)); sec.forEach((p, i) => on(p, pop(t, m(12) - 0.3 + i * 0.1))); on(port, pop(t, m(13) - 0.3));
  };
});

// ---- 24 · Les ratios que je regarde ----
SC("24", "LES RATIOS QUE JE REGARDE", (g, A) => {
  const m = A.m;
  const pk = parc(g, 1), pro = pl(g, 960, 300, "ON EST DANS L'IMMOBILIER PROFESSIONNEL", { bg: C.accentSoft, size: 22 });
  const X = [["PAS DE DÉGÂTS DES EAUX CHEZ LE VOISIN", 2], ["PAS DE SQUAT", 2.3]].map(([s, k], i) => ({ p: pl(g, 960, 780 + i * 80, s, { size: 20 }), k }));
  const sol = pl(g, 960, 960, "UNE ENTREPRISE : EN GÉNÉRAL PLUS SOLVABLE", { bg: C.ink, fg: C.paper, size: 22 });
  const head = big(g, 960, 230, "Mes critères", 56);
  const K4 = [["pie", "DIVERSIFICATION", 5], ["immeuble", "TOF", 9], [(w) => K.calendar(w, "").g, "WALB / WALT", 10], ["curve", "CAPITALISATION", 13]].map(([k, s, mk], i) => {
    const c = card(g, 380, 300); const ic = el("g", { transform: "translate(0 -40) scale(0.8)" }, c); (typeof k === "string" ? D.icons[k] : k)(ic); txt(c, 0, 110, s, 24, { weight: 800, ls: 3 });
    return { c, x: 300 + i * 440, k: mk };
  });
  const S = [["SCPI EUROPÉENNES", 300, 6, C.accent], ["PAS TROP DE FRANCE", 300, 7, C.face], ["SINON, LA FISCALITÉ…", 300, 8, C.face], ["ON L'A VU", 740, 9.4, C.face],
    ["DURÉE RESTANTE DES BAUX", 1180, 11, C.face], ["10-20 ANS = LOYERS SÉCURISÉS", 1180, 12, C.accent], ["VALEUR TOTALE DU PARC", 1620, 14, C.face]];
  const SP = S.map(([s, x, k, bg]) => ({ p: pl(g, x, 0, s, { bg, size: 16 }), x, k }));
  return t => {
    const p1 = out(t, m(4) - 0.5);
    place(pk, 960, 560, pop(t, m(1) - 0.4) * 1.8 * p1); on(pro, pop(t, m(1)) * p1);
    X.forEach(x => on(x.p, pop(t, m(Math.floor(x.k)) + (x.k % 1) * 2 - 0.3) * p1)); on(sol, pop(t, m(3) - 0.3) * p1);
    show(head, fade(t, m(4) - 0.2));
    K4.forEach(k => place(k.c, k.x, 520, pop(t, m(k.k) - 0.3)));
    const yy = {}; SP.forEach(s => { yy[s.x] = (yy[s.x] || 660) + 75; s.p.y = yy[s.x]; on(s.p, pop(t, m(Math.floor(s.k)) + (s.k % 1) * 2 - 0.3)); });
  };
});

// ---- 25 · Investir en cash ----
SC("25", "INVESTIR EN CASH", (g, A) => {
  const m = A.m;
  const mt = bloc(g, 380, 110, "25 000 €", "investis en cash", { fill: C.ink, size: 54 }), edr = pl(g, 1150, 300, "EDR EUROPA · 6,5 % NET DE FISCALITÉ ÉTRANGÈRE", { bg: C.accentSoft, size: 20 });
  const S = [["200 €", "la part", 4], ["125", "parts", 5], ["1 625 €", "par an", 6], ["406 €", "par trimestre", 7], ["135 €", "par mois", 8]].map(([a, b, k], i) => ({ c: bloc(g, 290, 120, a, b, { fill: i === 4 ? C.accent : C.face, size: 46 }), x: 330 + i * 315, k }));
  el("path", { ...D.line, "stroke-width": 5, d: "M380 960 L1620 960" }, g);
  const B = [[25, 135, 9], [50, 270, 10], [75, 406, 12], [100, 542, 14]].map(([a, v, k], i) => ({ c: colonne(g, 560 + i * 280, 960, 200, i === 3 ? C.accent : C.inkSoft), t: txt(g, 560 + i * 280, 1010, a + " 000 €", 26, { weight: 700 }), v, k }));
  const plus = pl(g, 1500, 640, "PLUS DE CASH = PLUS DE REVENUS", { size: 18 }), an = pl(g, 1440, 610, "6 500 € / AN · 1 625 € / TRIMESTRE", { bg: C.accentSoft, size: 18 });
  return t => {
    place(mt, 330, 320, pop(t, m(2) - 0.3)); on(edr, pop(t, m(3) - 0.3));
    S.forEach(s => place(s.c, s.x, 490, pop(t, m(s.k) - 0.3)));
    B.forEach(b => { const k = ease(prog(t, m(b.k) - 0.3, m(b.k) + 0.4)); b.c.set(b.v * 0.52 * k, b.v + " €"); b.t.style.opacity = fade(t, m(b.k) - 0.3); });
    on(plus, pop(t, m(9) - 0.3) * out(t, m(14) - 0.4)); on(an, pop(t, m(15) - 0.3));
  };
});

// ---- 26 · L'effet de levier ----
SC("26", "L'EFFET DE LEVIER", (g, A) => {
  const m = A.m;
  const pk = parc(g, 1), bq = bank(g, "LA BANQUE", 240), bul = pl(g, 470, 300, "« PRÊTE-MOI DE L'ARGENT POUR INVESTIR »", { size: 18 }), rare = pl(g, 470, 680, "UN DES RARES PLACEMENTS FINANÇABLES À CRÉDIT", { bg: C.accentSoft, size: 16 });
  const lev = pl(g, 1350, 290, "L'EFFET DE LEVIER", { bg: C.ink, fg: C.paper, size: 30 });
  const b0 = barre(g, 950, 380, 800, 90, C.ink, "Capital emprunté + intérêts");
  const bL = barre(g, 1217, 560, 533, 90, C.inkSoft, "Les loyers"), bE = barre(g, 950, 560, 267, 90, C.accent, "Ton effort", C.ink);
  const t2 = txt(g, 1483, 700, "2/3 : LE LOCATAIRE", 24, { weight: 800, ls: 3, fill: C.inkSoft }), t1 = txt(g, 1083, 700, "1/3 : TOI", 24, { weight: 800, ls: 3, fill: C.accent });
  const pig = el("g", {}, g); D.icons.piggy(pig); const tir = pl(g, 700, 880, "SANS CASSER TA TIRELIRE", { bg: C.accent, size: 22 });
  const ba = pl(g, 1350, 840, "PAR TA BANQUE…", { size: 20 }), co = pl(g, 1350, 920, "… OU MES COURTIERS : FINANCEMENTS MULTIPLES", { bg: C.ink, fg: C.paper, size: 18 });
  return t => {
    place(pk, 300, 500, pop(t, m(1) - 0.4) * 1.3); place(bq, 640, 520, pop(t, m(2) - 0.3) * 0.6); on(bul, pop(t, m(3) - 0.3)); on(rare, pop(t, m(2) + 0.2));
    on(lev, pop(t, m(4) - 0.3));
    b0.set(ease(prog(t, m(5) - 0.3, m(5) + 0.5))); bL.set(ease(prog(t, m(6) - 0.3, m(6) + 0.5))); bE.set(ease(prog(t, m(7) - 0.3, m(7) + 0.5)));
    t2.style.opacity = fade(t, m(8) - 0.3); t1.style.opacity = fade(t, m(9) - 0.3);
    place(pig, 380, 880, pop(t, m(10) - 0.4)); on(tir, pop(t, m(10) - 0.2));
    on(ba, pop(t, m(11) - 0.3)); on(co, pop(t, m(12) - 0.3));
  };
});
