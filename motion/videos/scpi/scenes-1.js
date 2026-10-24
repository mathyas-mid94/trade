// Parties 00 à 08 : introduction, SCI → SCPI, deux façons d'investir, l'immobilier en direct et ses limites.
// A.m(k) = instant du repère [k] de la partie (SCRIPT.md) ; A.s / A.e = début / fin de la partie.

// ---- 00 · Introduction ----
SC("00", "INTRODUCTION", (g, A) => {
  const m = A.m;
  const pk = parc(g, 1), loc = pl(g, 760, 820, "LOCATIF"), lt = pl(g, 1160, 820, "LONG TERME"), pp = pl(g, 960, 910, "À TITRE PERSO COMME À TITRE PRO", { bg: C.accentSoft });
  const fam = ["marc", "sophie", "leo"].map(w => member(g, w, false)), ft = pl(g, 470, 330, "POUR TOI, POUR TA FAMILLE");
  const rev = pl(g, 1350, 330, "UN REVENU COMPLÉMENTAIRE", { bg: C.accent }), fl = flux(g, 5);
  const ent = pl(g, 1200, 820, "ENTREPRENEUR", { bg: C.paperDeep }), sal = pl(g, 1560, 820, "SALARIÉ", { bg: C.paperDeep });
  const sc = big(g, 960, 330, "SCPI", 150), nom = txt(g, 960, 410, "Société Civile de Placement Immobilier", 40, { font: "Serif", weight: 600, fill: C.inkSoft });
  const ind = pl(g, 960, 480, "PRESQUE INDISPENSABLE DANS UN PATRIMOINE", { bg: C.accentSoft });
  const O = [["coins", "DES REVENUS", "dès cette année", 11], ["curve", "FAIRE FRUCTIFIER", "ton épargne qui dort", 12], ["sprout", "UN CAPITAL", "dans la durée", 13]].map(([k, a, b, mk], i) => ({ w: badge(g, k, a, b, 95), x: 560 + i * 400, a: m(mk) }));
  return t => {
    const p1 = out(t, m(4) - 0.5), p2 = out(t, m(8) - 0.5);
    place(pk, 960, 520, pop(t, m(1) - 0.4) * 2.2 * p1);
    on(loc, pop(t, m(2) - 0.3) * p1); on(lt, pop(t, m(2)) * p1); on(pp, pop(t, m(3) - 0.2) * p1);
    fam.forEach((f, i) => f.at(t, m(4) - 0.3 + i * 0.12, 330 + i * 150, 900, { k: p2 }));
    on(ft, pop(t, m(4)) * p2); on(rev, pop(t, m(5) - 0.3) * p2); fl(t, m(5), m(5) + 1.2, 1350, 380, 1350, 700, 80);
    on(ent, pop(t, m(6) - 0.3) * p2); on(sal, pop(t, m(7) - 0.3) * p2);
    show(sc, fade(t, m(8) - 0.3)); show(nom, fade(t, m(9) - 0.3)); on(ind, pop(t, m(10) - 0.3));
    O.forEach(o => place(o.w, o.x, 680, pop(t, o.a - 0.3)));
  };
});

// ---- 01 · De la SCI à la SCPI ----
SC("01", "DE LA SCI À LA SCPI", (g, A) => {
  const m = A.m;
  const cli = member(g, "client"), reve = pl(g, 640, 360, "« JE VAIS DEVENIR RENTIER ! »", { size: 24 });
  const mais = K.house(g, 1.4), vs = pl(g, 1300, 760, "LA VALEUR SÛRE", { bg: C.accent });
  const L = ["S", "C", "P", "I"].map((c, i) => big(g, 0, 330, c, 140, i === 2 ? C.accent : C.ink));
  const grp = [0, 1, 2].map(i => person(g, { vest: [C.accent, C.inkSoft, C.paperDeep][i] })), sci = K.house(g, 1);
  const ind = pl(g, 1350, 560, "AU LIEU DE L'INDIVISION", { bg: C.paperDeep }), emb = pl(g, 1350, 640, "DIVORCE, EMBROUILLE…"), vend = pl(g, 1350, 720, "→ IL FAUT REVENDRE", { bg: C.ink, fg: C.paper });
  const soc = contrat(g, "UNE SOCIÉTÉ"), es = pl(g, 1350, 900, "ENTRÉES ET SORTIES SIMPLES", { bg: C.accent });
  const xxl = pl(g, 960, 330, "LA SCPI = LA SCI EN VERSION XXL", { bg: C.accent, size: 30 });
  const foule = Array.from({ length: 10 }, (_, i) => person(g, { vest: [C.accent, C.inkSoft, C.paperDeep, C.accentSoft][i % 4] }));
  const parcs = [0, 1, 2, 3].map(() => parc(g, 0.9)), mut = pl(g, 960, 1000, "LA MUTUALISATION", { bg: C.ink, fg: C.paper, size: 26 });
  return t => {
    const p1 = out(t, m(3) - 0.5), p2 = out(t, m(10) - 0.5);
    cli.at(t, A.s + 0.2, 640, 900, { k: p1 }); on(reve, pop(t, m(1) - 0.2) * p1);
    place(mais, 1300, 560, pop(t, m(2) - 0.3) * 1.4 * p1); on(vs, pop(t, m(2)) * p1);
    const kp = ease(prog(t, m(3) - 0.2, m(3) + 0.6)), kS = fade(t, m(3) - 0.5) * p2;
    L.forEach((l, i) => { l.setAttribute("x", i === 3 ? lerp(1070, 975, kp) : [780, 880, 980][i]); l.style.opacity = kS * (i === 2 ? 1 - kp : 1); });
    grp.forEach((p, i) => stand(p, t, m(4) - 0.4 + i * 0.12, 420 + i * 130, 900, 0.75 * p2));
    place(sci, 550, 560, pop(t, m(4)) * p2);
    on(ind, pop(t, m(5) - 0.3) * p2); on(emb, pop(t, m(6) - 0.3) * p2); on(vend, pop(t, m(7) - 0.3) * p2);
    place(soc.g, 900, 600, pop(t, m(8) - 0.3) * 0.8 * p2); on(es, pop(t, m(9) - 0.3) * p2);
    on(xxl, pop(t, m(10) - 0.3));
    foule.forEach((p, i) => stand(p, t, m(11) - 0.5 + i * 0.06, 300 + i * 147, 900, 0.55));
    parcs.forEach((p, i) => place(p, 600 + i * 240, 500, pop(t, m(11) + 0.1 + i * 0.1)));
    on(mut, pop(t, m(12) - 0.3));
  };
});

// ---- 02 · Deux façons d'investir ----
SC("02", "DEUX FAÇONS D'INVESTIR", (g, A) => {
  const m = A.m, head = title(g, 190, "Deux façons d'investir dans l'immobilier locatif");
  const c1 = card(g, 760, 640), c2 = card(g, 760, 640, { fill: C.ink });
  const t1 = big(c1, 0, -230, "En direct", 64), t2 = big(c2, 0, -230, "En indirect", 64, C.paper);
  const h = K.house(c1, 1.3); h.setAttribute("transform", "translate(0 -90) scale(1.3)");
  const L1 = [["Tu achètes un bien", 4], ["Tu es propriétaire…", 5], ["… et gestionnaire", 5.4]].map(([s, k], i) => ({ t: txt(c1, 0, 60 + i * 50, s, 34, { font: "Serif", weight: 600 }), k }));
  const pk = parc(c2, 1); pk.setAttribute("transform", "translate(0 -90) scale(1.3)");
  const L2 = [["Tu achètes des parts", 7], ["Des pros gèrent pour toi", 8]].map(([s, k], i) => ({ t: txt(c2, 0, 60 + i * 50, s, 34, { font: "Serif", weight: 600, fill: C.paper }), k }));
  const types = pl(g, 1440, 860, "CLUB DEALS · REITs · SCPI", { bg: C.accent }), cons = pl(g, 1440, 950, "VIA UN CONSEILLER HABILITÉ", { bg: C.face });
  const prems = pl(g, 480, 950, "ON COMMENCE PAR LE DIRECT", { bg: C.accentSoft }), biais = pl(g, 960, 1010, "JE SUIS UN PEU BIAISÉ", { bg: C.face, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(c1, 480, 600, pop(t, m(2) - 0.4) * (t > m(9) - 0.5 ? 1 - 0.0 : 1)); place(c2, 1440, 600, pop(t, m(6) - 0.4));
    show(t1, fade(t, m(2))); h.style.opacity = fade(t, m(3) - 0.3); L1.forEach(l => show(l.t, fade(t, m(Math.floor(l.k)) + (l.k % 1) * 2 - 0.3)));
    show(t2, fade(t, m(6))); pk.style.opacity = fade(t, m(6)); L2.forEach(l => show(l.t, fade(t, m(l.k) - 0.3)));
    on(types, pop(t, m(9) - 0.3)); on(cons, pop(t, m(10) - 0.3));
    on(prems, pop(t, m(11) - 0.3)); on(biais, pop(t, m(12) - 0.3));
  };
});

// ---- 03 · Chiffre d'affaires ou bénéfice ? ----
SC("03", "CHIFFRE D'AFFAIRES OU BÉNÉFICE ?", (g, A) => {
  const m = A.m, head = title(g, 190, "Chiffre d'affaires ou bénéfice ?");
  el("path", { ...D.line, "stroke-width": 6, d: "M260 860 L1160 860" }, g);
  const ca = colonne(g, 460, 860, 260, C.inkSoft), bn = colonne(g, 900, 860, 260, C.accent);
  const lca = txt(g, 460, 910, "CHIFFRE D'AFFAIRES", 22, { weight: 800, ls: 4, fill: C.inkSoft }), lbn = txt(g, 900, 910, "BÉNÉFICE", 22, { weight: 800, ls: 4, fill: C.accent });
  const s1 = txt(g, 460, 960, "tous les loyers encaissés", 24, { weight: 500, fill: C.inkSoft }), s2 = txt(g, 900, 960, "ce qui finit dans ta poche", 24, { weight: 500, fill: C.inkSoft });
  const bul = pl(g, 460, 300, "« J'ENCAISSE DES LOYERS ! »", { size: 22 }), cible = pl(g, 960, 380, "CE QUI T'INTÉRESSE, MON GARS", { bg: C.accent });
  const mur = K.house(g, 1.3), conc = pl(g, 1520, 700, "CONCRET : TU TOUCHES LES MURS", { bg: C.accentSoft, size: 20 }), cont = pl(g, 1520, 800, "MAIS LES CONTRAINTES ?", { bg: C.ink, fg: C.paper });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    ca.set(460 * ease(prog(t, m(2) - 0.3, m(3))), "100 %"); lca.style.opacity = fade(t, m(2)); show(s1, fade(t, m(3) - 0.2));
    on(bul, pop(t, m(4) - 0.3));
    bn.set(160 * ease(prog(t, m(5) - 0.3, m(6))), "?"); lbn.style.opacity = fade(t, m(5)); show(s2, fade(t, m(6) - 0.2)); on(cible, pop(t, m(5)));
    place(mur, 1520, 520, pop(t, m(7) - 0.3) * 1.3); on(conc, pop(t, m(8) - 0.3)); on(cont, pop(t, m(9) - 0.3));
  };
});

// ---- 04 · Ce qui grignote le rendement ----
SC("04", "CE QUI GRIGNOTE LE RENDEMENT", (g, A) => {
  const m = A.m, head = title(g, 190, "Ce qui grignote le rendement");
  const h = K.house(g, 2), fl = flux(g, 6);
  const L = [["Turnover, vacance locative", "", 1, 330], ["Chocs de trésorerie", "travaux, charges…", 2, 460], ["Impôts, prélèvements sociaux", "", 10, 590], ["Ton temps", "ton implication personnelle", 11, 720]]
    .map(([a, b, k, y]) => ({ c: bloc(g, 480, 100, a, b, { size: 28 }), k, y }));
  const lm = pl(g, 420, 860, "TA CARTE FIDÉLITÉ CHEZ LEROY MERLIN", { bg: C.accentSoft, size: 18 });
  const lst = pl(g, 1500, 280, "LA LISTE DES FRAIS", { bg: C.ink, fg: C.paper });
  const R = [["4–5 %", "frais d'agence", 5], ["7–8 %", "frais de notaire", 6], ["10–20 %", "travaux", 7], ["6–7 %", "des loyers : gestion", 8], ["5–10 %", "des loyers : taxe foncière", 9]]
    .map(([a, b, k], i) => { const c = card(g, 500, 96); txt(c, -225, 14, a, 40, { anchor: "start", font: "Serif", weight: 700, fill: C.accent }); txt(c, -65, 10, b, 24, { anchor: "start", weight: 600 }); return { c, k, y: 380 + i * 112 }; });
  return t => {
    show(head, fade(t, m(1) - 0.8));
    place(h, 960, 600, pop(t, A.s + 0.2) * 2); const c0 = Math.floor(t / 2) * 2; fl(t, c0, c0 + 1.6, 960, 680, 960, 1080, -60);
    L.forEach(l => place(l.c, 420, l.y, pop(t, m(l.k) - 0.3)));
    on(lm, pop(t, m(3) + 0.2) * out(t, m(10) - 0.3));
    on(lst, pop(t, m(4) - 0.3)); R.forEach(r => place(r.c, 1500, r.y, pop(t, m(r.k) - 0.3)));
  };
});

// ---- 05 · De 5 % à 2 % ----
SC("05", "DE 5 % À 2 %", (g, A) => {
  const m = A.m, head = title(g, 190, "Le rendement réel de l'immobilier en direct");
  el("path", { ...D.line, "stroke-width": 6, d: "M220 820 L900 820" }, g);
  const br = colonne(g, 400, 820, 220, C.inkSoft), nt = colonne(g, 720, 820, 220, C.accent);
  const lb = txt(g, 400, 870, "BRUT", 24, { weight: 800, ls: 6, fill: C.inkSoft }), ln = txt(g, 720, 870, "NET", 24, { weight: 800, ls: 6, fill: C.accent });
  const liv = livret(g), pm = pl(g, 560, 960, "PAS TELLEMENT MIEUX QU'UN LIVRET", { bg: C.face, size: 20 });
  const pct = bloc(g, 560, 120, "40 à 60 %", "du brut part en charges et fiscalité", { fill: C.ink, size: 46 });
  const ech = bloc(g, 640, 110, "Les Échos — rapport Le Meur", "location nue, sur 12 ans, hors plus-value", { size: 30 });
  const axe = el("path", { ...D.line, "stroke-width": 4, d: "M1100 760 L1660 760" }, g);
  const B = [[1.8, "Montpellier"], [1.1, "La Rochelle"], [-0.2, "Paris 13e"]].map(([v, n], i) => { const r = el("rect", { ...D.line, fill: v < 0 ? C.accent : C.inkSoft, x: 1170 + i * 180, width: 90, rx: 6 }, g);
    const tv = txt(g, 1215 + i * 180, 0, String(v).replace(".", ",") + " %", 26, { weight: 700 }); const tn = txt(g, 1215 + i * 180, 820, n, 20, { weight: 600, fill: C.inkSoft }); return { r, tv, tn, v }; });
  const neg = pl(g, 1380, 900, "PARFOIS 0 À 2 %, VOIRE NÉGATIF", { bg: C.accent, size: 20 });
  const dix = pl(g, 1380, 330, "« MOI, JE FAIS DU 10-12 % ! »"), cinq = pl(g, 1380, 980, "RETIRE TOUT ÇA… ON TOMBE À 5", { bg: C.ink, fg: C.paper, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.8));
    br.set(400 * ease(prog(t, m(1) - 0.3, m(1) + 0.4)), "5–6 %"); lb.style.opacity = fade(t, m(1));
    nt.set(170 * ease(prog(t, m(2) - 0.3, m(2) + 0.4)), "2–3 %"); ln.style.opacity = fade(t, m(2));
    place(liv, 900, 640, pop(t, m(3) - 0.3) * 0.8 * out(t, m(4) - 0.3)); on(pm, pop(t, m(3)) * out(t, m(4) - 0.3));
    place(pct, 560, 960, pop(t, m(4) - 0.3));
    const pB = out(t, m(8) - 0.5);
    place(ech, 1380, 400, pop(t, m(5) - 0.3) * pB);
    B.forEach((b, i) => { const k = ease(prog(t, m(6) - 0.4 + i * 0.15, m(6) + 0.3 + i * 0.15)) * (b.v < 0 ? fade(t, m(7) - 0.4) : 1), h = b.v * 110 * k;
      b.r.setAttribute("y", h >= 0 ? 760 - h : 760); b.r.setAttribute("height", Math.abs(h)); b.r.style.opacity = Math.abs(h) > 1 ? pB : 0;
      b.tv.setAttribute("y", h >= 0 ? 750 - h : 800 - h); b.tv.style.opacity = k * pB; b.tn.style.opacity = fade(t, m(6) - 0.4) * pB; });
    on(neg, pop(t, m(7) - 0.2) * pB); axe.style.opacity = fade(t, m(6) - 0.6) * pB;
    on(dix, pop(t, m(8) - 0.3)); on(cinq, pop(t, m(9) - 0.3));
  };
});

// ---- 06 · Les prix contre les salaires ----
SC("06", "LES PRIX CONTRE LES SALAIRES", (g, A) => {
  const m = A.m, head = title(g, 190, "L'immobilier contre le salaire moyen");
  const im = [], sa = []; for (let i = 0; i <= 40; i++) { const x = i / 40; im.push([x, 0.03 + 0.92 * Math.pow(x, 2.6) + (x > 0.75 ? 0.03 * Math.sin(x * 40) : 0)]); sa.push([x, 0.02 + 0.2 * Math.pow(x, 1.4)]); }
  const ci = K.chart(g, 1100, 600, im, { color: C.accent, sw: 8 }), cs = K.chart(g, 1100, 600, sa, { color: C.ink, sw: 8, frame: false });
  ci.g.setAttribute("transform", "translate(900 600)"); cs.g.setAttribute("transform", "translate(900 600)");
  draw(ci.line, m(5) - 0.4, m(7) + 0.6); draw(cs.line, m(6) - 0.4, m(8) + 0.4);
  const src = pl(g, 900, 960, "SOURCE : INSEE · BASE 100 EN 1950", { size: 18 });
  const li = pl(g, 1620, 330, "L'IMMOBILIER", { bg: C.accent }), ls = pl(g, 1620, 800, "LE SALAIRE MOYEN", { bg: C.ink, fg: C.paper });
  const vingt = pl(g, 480, 330, "+ ÉNORMÉMENT DE VALEUR EN 20 ANS", { bg: C.accentSoft, size: 20 }), suit = pl(g, 480, 410, "LES SALAIRES N'ONT PAS SUIVI", { size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); ci.g.style.opacity = fade(t, m(4) - 0.5);
    on(vingt, pop(t, m(2) - 0.3) * out(t, m(4) - 0.6)); on(suit, pop(t, m(3) - 0.3) * out(t, m(4) - 0.6));
    on(src, pop(t, m(4) - 0.2)); on(li, pop(t, m(5) + 0.4)); on(ls, pop(t, m(6) + 0.4));
  };
});

// ---- 07 · L'offre et la demande ----
SC("07", "L'OFFRE ET LA DEMANDE", (g, A) => {
  const m = A.m, head = title(g, 190, "L'offre et la demande");
  el("rect", { ...D.line, fill: C.paperDeep, x: 380, y: 520, width: 200, height: 380 }, g);
  const mais = K.house(g, 1.2), cher = prix(g, "€€€", C.ink), dem = member(g, "client");
  const reg = [pl(g, 430, 300, "ÎLE-DE-FRANCE"), pl(g, 720, 300, "MARTINIQUE")];
  const taux = pl(g, 560, 1000, "+ LES TAUX QUI REMONTENT", { bg: C.accent });
  el("path", { ...D.line, "stroke-width": 3, stroke: C.paperDeep, d: "M960 280 L960 1000" }, g);
  const prop = member(g, "marc", false), alouer = pl(g, 1250, 420, "À LOUER", { bg: C.accentSoft, size: 26 });
  const bp = prix(g, "−", C.accent), rent = pl(g, 1550, 600, "MOINS RENTABLE", { bg: C.paperDeep }), ges = pl(g, 1550, 690, "+ LA GESTION", { bg: C.face });
  const moins = pl(g, 1440, 960, "DE MOINS EN MOINS D'INVESTISSEURS EN DIRECT", { bg: C.ink, fg: C.paper, size: 18 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(mais, 480, 450, pop(t, m(2) - 0.4) * 1.2); place(cher, 680, 400, pop(t, m(2)));
    dem.at(t, m(2) - 0.2, 760, 900, { armR: -60 + 10 * Math.sin(t * 6) });
    reg.forEach((r, i) => on(r, pop(t, m(3) - 0.3 + i * 0.2))); on(taux, pop(t, m(4) - 0.3));
    prop.at(t, m(5) - 0.4, 1150, 900, { flip: true }); on(alouer, pop(t, m(5) - 0.2));
    place(bp, 1550, 480, pop(t, m(6) - 0.3)); on(rent, pop(t, m(7) - 0.3)); on(ges, pop(t, m(8) - 0.3)); on(moins, pop(t, m(9) - 0.3));
  };
});

// ---- 08 · Les impayés ----
SC("08", "LES IMPAYÉS", (g, A) => {
  const m = A.m, head = title(g, 190, "Les impayés en hausse");
  const c30 = bloc(g, 500, 160, "+30 %", "de relances pour impayés en France", { fill: C.face, size: 72 });
  const c60 = bloc(g, 500, 160, "+60 %", "rien qu'en Île-de-France", { fill: C.ink, size: 72 });
  const cal = calendar(g, "2 ans"), cle_ = cle(g), deux = pl(g, 1420, 560, "UN LOCATAIRE QUI NE PAIE PLUS", { size: 20 });
  const tr = pl(g, 640, 800, "TRÊVE HIVERNALE", { bg: C.paperDeep }), pr = pl(g, 640, 880, "PROCÉDURES TRÈS LONGUES", { bg: C.paperDeep });
  const sab = el("g", {}, g); D.icons.sablier(sab);
  const non = pl(g, 1420, 800, "ON NE SE FAIT PAS JUSTICE SOI-MÊME", { bg: C.accent, size: 20 }), x = check(g, false);
  const trib = bank(g, "TRIBUNAL", 220);
  return t => {
    show(head, fade(t, m(1) - 0.8));
    place(c30, 520, 420, pop(t, m(2) - 0.4)); place(c60, 520, 610, pop(t, m(3) - 0.4));
    place(cal.g, 1300, 400, pop(t, m(4) - 0.4)); place(cle_, 1520, 400, pop(t, m(4) - 0.1)); on(deux, pop(t, m(4) + 0.2));
    on(tr, pop(t, m(5) - 0.3)); on(pr, pop(t, m(5) + 0.2)); place(sab, 920, 840, pop(t, m(6) - 0.3), 180 * ease(prog(t, m(6), m(6) + 1)));
    on(non, pop(t, m(7) - 0.3)); place(x, 1140, 800, pop(t, m(7)));
    place(trib, 1420, 980, pop(t, m(8) - 0.3) * 0.55);
  };
});
