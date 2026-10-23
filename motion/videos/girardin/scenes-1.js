// Parties 00 à 07 : introduction, exemple, déduction / réduction, plafond, Outre-mer, financements, principe, schéma.
// A.m(k) = instant du repère [k] de la partie (SCRIPT.md) ; A.s / A.e = début / fin de la partie.

// ---- 00 · Introduction ----
SC("00", "INTRODUCTION", (g, A) => {
  const m = A.m, me = member(g, "mathyas");
  const pct = el("g", {}, g); const pI = el("g", { transform: "scale(1.6)" }, pct); D.icons.percent(pI);
  const heart_ = el("g", {}, g); heart(heart_);
  const us = usine(g, 1.3), pm = palmier(g, 1.1);
  const nom = pill(g, 1180, 300, "LE GIRARDIN INDUSTRIEL", { bg: C.accent, size: 32 });
  const loi = pill(g, 1380, 870, "LOI LODEOM", { bg: C.face, size: 22 }), entendu = pill(g, 980, 870, "TU EN AS ENTENDU PARLER ?", { bg: C.face, size: 20 });
  const niche = pill(g, 1180, 960, "UN OUTIL TRÈS NICHÉ", { bg: C.ink, fg: C.paper, size: 22 });
  const obj = [["percent", "RÉDUIRE", "tes impôts", 8], ["curve", "FAIRE FRUCTIFIER", "ton épargne", 9], ["coins", "UN CAPITAL", "en moins d'un an", 10]].map(([k, a, b, mk], i) => {
    const w = el("g", {}, g); el("circle", { ...D.line, fill: C.face, r: 120 }, w); D.icons[k](w);
    txt(w, 0, 175, a, 28, { weight: 800, ls: 5 }); txt(w, 0, 210, b, 24, { weight: 500, fill: C.inkSoft }); return { w, x: 700 + i * 420, a: m(mk) };
  });
  const deux = pill(g, 1120, 270, "UN RENDEMENT À DEUX CHIFFRES", { bg: C.accent, size: 24 });
  return t => {
    const p1 = out(t, m(7) - 0.5);
    me.at(t, A.s + 0.2, 300, 920, { armR: t > m(2) && t < m(4) ? -25 : 75 });
    place(pct, 1180, 540, pop(t, m(1) - 0.5) * out(t, m(2) - 0.3));
    place(heart_, 420, 400, pop(t, m(2) - 0.2) * out(t, m(3)) * 0.9);
    place(us, 1050, 620, pop(t, m(3) - 0.3) * p1); place(pm, 1380, 600, pop(t, m(3)) * p1); place(nom.g, nom.x, nom.y, pop(t, m(3) - 0.2) * p1);
    place(entendu.g, entendu.x, entendu.y, pop(t, m(4) - 0.2) * p1); place(loi.g, loi.x + 80, loi.y, pop(t, m(5) - 0.2) * p1);
    place(niche.g, niche.x, niche.y, pop(t, m(6) - 0.2) * p1);
    obj.forEach(o => place(o.w, o.x, 520, pop(t, o.a - 0.3)));
    place(deux.g, deux.x, deux.y, pop(t, m(10)));
  };
});

// ---- 01 · Un exemple pour commencer ----
SC("01", "UN EXEMPLE POUR COMMENCER", (g, A) => {
  const m = A.m, head = title(g, 190, "Exemple : 3 500 € d'impôts");
  el("path", { ...D.line, "stroke-width": 6, d: "M260 860 L1640 860" }, g);
  const av = colonne(g, 520, 860, 300), ap = colonne(g, 1340, 860, 300);
  const lA = txt(g, 520, 920, "AVANT", 26, { weight: 800, ls: 6, fill: C.accent }), lB = txt(g, 1340, 920, "APRÈS", 26, { weight: 800, ls: 6, fill: C.accent });
  const apport = pill(g, 930, 600, "J'APPORTE 2 500 €", { bg: C.face, size: 24 }); const fl = flux(g, 4);
  const red = pill(g, 1340, 440, "RÉDUCTION : − 2 925 €", { bg: C.accent, size: 28 });
  const bilan = card(g, 1000, 110, { fill: C.ink }); txt(bilan, 0, 12, "2 500 € apportés, 2 925 € d'impôt en moins.", 36, { font: "Serif", weight: 600, fill: C.paper });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    av.set(500 * ease(prog(t, m(1) - 0.3, m(1) + 0.4)), "3 500 €"); lA.style.opacity = fade(t, m(1));
    place(apport.g, apport.x, apport.y, pop(t, m(2) - 0.3)); fl(t, m(2), m(2) + 1.1, 620, 600, 880, 640, 60);
    place(red.g, red.x, red.y, pop(t, m(3) - 0.2));
    ap.set(500 * (1 - 0.836 * ease(prog(t, m(3), m(4)))) * fade(t, m(3) - 0.4), t > m(4) - 0.3 ? "575 €" : "3 500 €"); lB.style.opacity = fade(t, m(3) - 0.4);
    place(bilan, 960, 1000, pop(t, m(5) - 0.3));
  };
});

// ---- 02 · Deux façons de réduire ses impôts ----
SC("02", "DEUX FAÇONS DE RÉDUIRE SES IMPÔTS", (g, A) => {
  const m = A.m, head = title(g, 190, "Deux façons de réduire ses impôts");
  const a1 = arrow(g, 900, 270, 600, 360, m(1), m(1) + 0.5, { color: C.ink }), a2 = arrow(g, 1020, 270, 1320, 360, m(6) - 0.5, m(6), { color: C.ink });
  const ded = card(g, 620, 130, { fill: C.ink }); txt(ded, 0, -6, "Déduction d'impôt", 40, { font: "Serif", weight: 700, fill: C.paper }); txt(ded, 0, 36, "baisse le revenu imposable", 22, { weight: 500, fill: C.accentSoft });
  const r1 = card(g, 620, 130, { fill: C.accent }); txt(r1, 0, -6, "Réduction d'impôt", 40, { font: "Serif", weight: 700 }); txt(r1, 0, 36, "baisse l'impôt directement", 22, { weight: 500 });
  const r2 = card(g, 620, 130, { fill: C.ink }); txt(r2, 0, -6, "Crédit d'impôt", 40, { font: "Serif", weight: 700, fill: C.paper }); txt(r2, 0, 36, "baisse l'impôt, après les réductions", 22, { weight: 500, fill: C.accentSoft });
  const rev = colonne(g, 520, 960, 200, C.inkSoft), imp = colonne(g, 700, 960, 120, C.accent);
  const charge = el("rect", { ...D.line, fill: C.paperDeep, x: 420, width: 200, rx: 10 }, g); const cL = txt(g, 520, 0, "charge", 22, { weight: 700 });
  const gir = pill(g, 1320, 900, "LE GIRARDIN EST ICI", { bg: C.ink, fg: C.paper, size: 24 }); const ar = arrow(g, 1320, 860, 1320, 820, m(8) - 0.3, m(8), { color: C.accent });
  const boom = pill(g, 960, 1010, "LES DEUX ENSEMBLE : EXPLOSIF", { bg: C.accent, size: 24 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); a1.render(t); a2.render(t);
    place(ded, 520, 440, pop(t, m(2) - 0.3)); place(r1, 1360, 440, pop(t, m(6) - 0.2)); place(r2, 1360, 600, pop(t, m(7) - 0.2));
    const k = ease(prog(t, m(4) - 0.2, m(5) + 0.4)), vis = fade(t, m(3) - 0.4) * out(t, m(6) - 0.2);
    rev.set(300 * vis * (1 - 0.3 * k), "revenus"); imp.set(160 * vis * (1 - 0.35 * k), "impôt");
    const ch = 90 * k; charge.setAttribute("y", 960 - 300 * vis + 0 - ch + 0); charge.setAttribute("height", ch * vis); charge.style.opacity = k > 0.05 ? vis : 0;
    cL.setAttribute("y", 960 - 300 * vis - ch / 2 + 8); cL.style.opacity = k > 0.3 ? vis : 0;
    place(gir.g, gir.x, gir.y - 100, pop(t, m(8) - 0.2) * out(t, m(9) - 0.2)); ar.render(t);
    place(boom.g, boom.x, boom.y - 120, pop(t, m(9) - 0.3));
  };
});

// ---- 03 · Le bonus du Girardin ----
SC("03", "LE BONUS DU GIRARDIN", (g, A) => {
  const m = A.m, head = title(g, 190, "Le bonus fiscal du Girardin");
  el("path", { ...D.line, "stroke-width": 6, d: "M260 860 L1500 860" }, g);
  const b1 = colonne(g, 520, 860, 300), b2 = colonne(g, 1150, 860, 300), bonus = colonne(g, 1150, 520, 300, C.accent);
  const l1 = txt(g, 520, 920, "Plafond des niches fiscales", 28, { font: "Serif", weight: 600 });
  const eq = card(g, 340, 160, { fill: C.accent }); txt(eq, 0, 10, "18 000 €", 66, { font: "Serif", weight: 700 }); txt(eq, 0, 56, "avec le Girardin", 22, { weight: 700 });
  const imp = pill(g, 1580, 960, "IL FAUT PAYER PAS MAL D'IMPÔTS", { bg: C.face, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    b1.set(340 * ease(prog(t, m(1) - 0.2, m(2))), "10 000 €"); l1.style.opacity = fade(t, m(1));
    b2.set(340 * ease(prog(t, m(3) - 0.6, m(3) - 0.1)), "10 000 €"); bonus.set(200 * ease(prog(t, m(3) - 0.1, m(3) + 0.5)), "+ 8 000 €");
    place(eq, 1640, 520, pop(t, m(4) - 0.3)); place(imp.g, imp.x - 100, imp.y, pop(t, m(5) - 0.3));
  };
});

// ---- 04 · L'Outre-mer, un potentiel énorme ----
SC("04", "L'OUTRE-MER", (g, A) => {
  const m = A.m, head = title(g, 190, "L'Outre-mer, un potentiel énorme");
  const mer = vagues(g, 1700, 18); mer.setAttribute("transform", "translate(960 300)");
  const I = [["MARTINIQUE", 320, 160, 3, 420, 480, 3], ["GUADELOUPE", 280, 140, 4, 760, 400, 11], ["SAINT-MARTIN", 160, 90, 4, 1040, 330, 5], ["GUYANE", 260, 220, 4, 1180, 620, 8],
    ["LA RÉUNION", 240, 160, 5, 520, 780, 12], ["MAYOTTE", 170, 110, 5, 860, 760, 21], ["NOUVELLE-CALÉDONIE", 330, 120, 6, 1500, 400, 30], ["POLYNÉSIE", 260, 100, 6, 1520, 800, 44]]
    .map(([n, w, h, k, x, y, seed]) => ({ i: ile(g, w, h, seed, n), a: m(k), x, y }));
  const bigup = pill(g, 420, 330, "BIG UP !", { bg: C.accent, size: 22 }); const pm = palmier(g, 0.6);
  const s97 = card(g, 560, 160, { fill: C.ink }); txt(s97, 0, 0, "97 %", 76, { font: "Serif", weight: 700, fill: C.paper }); txt(s97, 0, 50, "de l'espace maritime français", 22, { weight: 500, fill: C.accentSoft });
  const s2e = pill(g, 960, 760, "LE 2ᵉ PLUS GRAND ESPACE MARITIME DU MONDE", { bg: C.accent, size: 22 });
  const pib = card(g, 560, 160); txt(pib, 0, 0, "< 2 %", 76, { font: "Serif", weight: 700, fill: C.accent }); txt(pib, 0, 50, "du PIB national", 22, { weight: 500, fill: C.inkSoft });
  return t => {
    const p1 = out(t, m(7) - 0.5);
    show(head, fade(t, m(1) - 0.5)); mer.style.opacity = 0.9 * fade(t, m(2) - 0.6) * p1;
    I.forEach(o => place(o.i.g, o.x, o.y, pop(t, o.a - 0.3) * p1));
    place(bigup.g, bigup.x, bigup.y, pop(t, m(3) + 0.3) * out(t, m(4) + 0.6) * p1); place(pm, 470, 470, pop(t, m(3)) * p1);
    place(s97, 960, 520, pop(t, m(7) - 0.3)); place(s2e.g, s2e.x, s2e.y - 120, pop(t, m(8) - 0.3));
    place(pib, 960, 860, pop(t, m(9) - 0.3));
  };
});

// ---- 05 · Un manque de financements ----
SC("05", "UN MANQUE DE FINANCEMENTS", (g, A) => {
  const m = A.m, head = title(g, 190, "Des écarts de développement");
  const P = [["L'emploi", 2], ["Des secteurs tenus par quelques acteurs", 3], ["Un manque de financements", 4]].map(([s, k], i) => ligne(g, s, m(k), 330 + i * 90, false, 34));
  const goutte = el("g", {}, g); el("path", { ...D.line, fill: C.inkSoft, d: "M0 -60 C30 -20 44 0 44 20 A44 44 0 0 1 -44 20 C-44 0 -30 -20 0 -60 Z" }, goutte);
  const croix = el("g", {}, g); el("rect", { ...D.line, fill: C.face, x: -60, y: -60, width: 120, height: 120, rx: 14 }, croix); el("path", { ...D.line, fill: C.accent, d: "M-14 -40 L14 -40 L14 -14 L40 -14 L40 14 L14 14 L14 40 L-14 40 L-14 14 L-40 14 L-40 -14 L-14 -14 Z" }, croix);
  const lS = txt(g, 1300, 820, "la santé", 28, { font: "Serif", weight: 600 }), lE = txt(g, 1600, 820, "l'accès à l'eau", 28, { font: "Serif", weight: 600 });
  const paris = pill(g, 700, 700, "PAS TOUJOURS LA QUALITÉ DE VIE DE L'HEXAGONE", { bg: C.face, size: 20 });
  const etat = bank(g, "ÉTAT", 240); const gir = pill(g, 700, 900, "LE DISPOSITIF GIRARDIN", { bg: C.accent, size: 28 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    P.forEach(p => place(p.r, 260, p.y, pop(t, p.a - 0.3)));
    place(croix, 1300, 680, pop(t, m(5) - 0.3)); lS.style.opacity = fade(t, m(5)); place(goutte, 1600, 690, pop(t, m(6) - 0.3)); lE.style.opacity = fade(t, m(6));
    place(paris.g, paris.x, paris.y - 120, pop(t, m(7) - 0.3));
    place(etat, 400, 820, pop(t, m(8) - 0.4) * 0.6); place(gir.g, gir.x + 80, gir.y - 120, pop(t, m(9) - 0.2));
  };
});

// ---- 06 · Le principe ----
SC("06", "LE PRINCIPE", (g, A) => {
  const m = A.m, head = title(g, 190, "Soutenir l'Outre-mer, contre un avantage fiscal");
  const act = pill(g, 960, 320, "ACTIVITÉ ÉCONOMIQUE DE L'OUTRE-MER", { bg: C.accent, size: 26 });
  const who = [["particulier", 3, { vest: C.accent }], ["pro", 4, { vest: C.inkSoft }]].map(([n, k, o], i) => ({ guy: person(g, o), a: m(k), x: 300 + i * 200 }));
  const banque = bank(g, "BANQUES", 200);
  const labels = [txt(g, 300, 940, "PARTICULIERS", 20, { weight: 800, ls: 4, fill: C.inkSoft }), txt(g, 500, 940, "PROS", 20, { weight: 800, ls: 4, fill: C.inkSoft })];
  const up = arrow(g, 520, 600, 860, 370, m(6) - 0.4, m(6) + 0.2);
  const etat = bank(g, "ÉTAT", 240); const av = card(g, 400, 150, { fill: C.ink }); txt(av, 0, 14, "Avantage fiscal", 40, { font: "Serif", weight: 700, fill: C.paper });
  const back = arrow(g, 1300, 760, 760, 800, m(7) - 0.4, m(7) + 0.2, { bend: -40 });
  const noSub = pill(g, 1400, 980, "PAS DE SUBVENTION DIRECTE", { bg: C.face, size: 20 }), x = check(g, false);
  const viaImpots = pill(g, 960, 980, "LES CONTRIBUABLES FINANCENT", { bg: C.accent, size: 22 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); place(act.g, act.x, act.y, pop(t, m(1)));
    who.forEach((w, i) => stand(w.guy, t, w.a - 0.3, w.x, 900, 0.75)); labels.forEach((l, i) => l.style.opacity = fade(t, m(3 + i)));
    place(banque, 700, 820, pop(t, m(5) - 0.3) * 0.7); up.render(t);
    place(etat, 1440, 560, pop(t, m(2) - 0.3) * 0.75); place(av, 1440, 800, pop(t, m(7) - 0.3)); back.render(t);
    place(noSub.g, noSub.x, noSub.y - 120, pop(t, m(8) - 0.2) * out(t, m(9) - 0.2)); place(x, noSub.x + 210, noSub.y - 120, pop(t, m(8) + 0.2) * out(t, m(9) - 0.2));
    place(viaImpots.g, viaImpots.x, viaImpots.y, pop(t, m(9) - 0.2));
  };
});

// ---- 07 · Le schéma ----
SC("07", "LE SCHÉMA", (g, A) => {
  const m = A.m;
  const inv = [0, 1, 2, 3, 4, 5].map(i => ({ guy: person(g, { vest: i % 2 ? C.inkSoft : C.accent, hair: i % 3 === 1 ? "f" : undefined }), x: 560 + i * 160 }));
  const invL = txt(g, 960, 330, "LES INVESTISSEURS · DES CONTRIBUABLES", 22, { weight: 800, ls: 5, fill: C.inkSoft });
  const noImp = pill(g, 1600, 230, "PAS D'IMPÔTS ? PAS D'INTÉRÊT", { bg: C.face, size: 18 });
  const port = card(g, 560, 150, { fill: C.ink }); txt(port, 0, -6, "Société de portage", 40, { font: "Serif", weight: 700, fill: C.paper }); const snc = txt(port, 0, 40, "SNC ou SAS", 24, { weight: 600, fill: C.accentSoft });
  const down1 = arrow(g, 960, 350, 960, 450, m(3) - 0.3, m(3) + 0.2);
  const achat = pill(g, 520, 620, "ACHAT D'ÉQUIPEMENTS", { bg: C.face, size: 22 }); const eq = [camion(g, 0.7), solaire(g, 0.7), conteneur(g, 0.6)];
  const loc = pill(g, 1400, 620, "LOCATION · LOYER SYMBOLIQUE", { bg: C.accent, size: 22 });
  const down2 = arrow(g, 960, 610, 960, 760, m(6) - 0.4, m(6));
  const expl = [0, 1, 2, 3].map(i => usine(g, 0.6)); const exL = txt(g, 960, 1010, "LES EXPLOITANTS LOCAUX", 22, { weight: 800, ls: 5, fill: C.inkSoft });
  const pm = palmier(g, 0.5), grow = pill(g, 1560, 880, "L'ÉCONOMIE LOCALE GRANDIT", { bg: C.ink, fg: C.paper, size: 20 });
  return t => {
    inv.forEach((v, i) => stand(v.guy, t, m(1) - 0.5 + i * 0.12, v.x, 300, 0.5)); invL.style.opacity = fade(t, m(1));
    place(noImp.g, noImp.x, noImp.y, pop(t, m(2) - 0.2) * out(t, m(3)));
    down1.render(t); place(port, 960, 530, pop(t, m(3) - 0.2)); snc.style.opacity = fade(t, m(4) - 0.3);
    place(achat.g, achat.x, achat.y, pop(t, m(5) - 0.3)); eq.forEach((e, i) => place(e, 360 + i * 180, 730, pop(t, m(5) + i * 0.2)));
    down2.render(t);
    place(loc.g, loc.x, loc.y, pop(t, m(7) - 0.4));
    expl.forEach((u, i) => place(u, 660 + i * 200, 900, pop(t, m(6) + i * 0.15))); exL.style.opacity = fade(t, m(6) + 0.3);
    place(pm, 1500, 860, pop(t, m(8) - 0.2)); place(grow.g, grow.x, grow.y + 80, pop(t, m(9) - 0.3));
  };
});
