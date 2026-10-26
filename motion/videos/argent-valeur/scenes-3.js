// Parties 13 à 18 : se payer en premier, un temps pour tout, l'erreur classique, la méritocratie, l'héritage, conclusion.

// ---- 13 · Se payer en premier ----
SC("13", "SE PAYER EN PREMIER", (g, A) => {
  const m = A.m, head = big(g, 960, 200, "« Se payer en premier »", 60);
  const ok = check(g, true), deb = pl(g, 960, 290, "OUI. AUCUN DÉBAT.", { bg: C.accent, size: 22 });
  const res = pl(g, 960, 330, "SUR LES RÉSEAUX, ON LA PRÉSENTE DE TRAVERS", { size: 20 });
  const tel = telephone(g, ["1. JE METS DE CÔTÉ", "2. JE PAIE", "LES AUTRES"]), xx = check(g, false), pe = pl(g, 1250, 600, "PAS EXACTEMENT", { bg: C.ink, fg: C.paper, size: 22 });
  const h1 = pl(g, 520, 330, "D'ABORD : CE QUI TE PERMET DE VIVRE", { bg: C.ink, fg: C.paper, size: 20 });
  const V = [["Ton loyer", "", 7], ["Ton crédit immobilier", "", 8], ["Ta nourriture", "", 9]].map(([s, x, k], i) => ({ c: bloc(g, 420, 90, s, "", { size: 32 }), k, y: 450 + i * 115 }));
  const nu = pl(g, 520, 820, "SINON, TU TE RETROUVES À NU", { size: 18 });
  const tag = prix(g, "PRIX"), neg = pl(g, 520, 960, "LES PRIX SE NÉGOCIENT…", { size: 18 }), val = pl(g, 520, 1020, "… PAS LA VALEUR", { bg: C.accent, size: 18 });
  const h2 = pl(g, 1400, 330, "ENSUITE : TU ARBITRES", { bg: C.accentSoft, size: 20 });
  const W = [["Consommation", 14, C.face], ["Loisirs", 15, C.face], ["Te payer toi-même", 16, C.accent]].map(([s, k, f]) => ({ c: bloc(g, 420, 90, s, "", { size: 32, fill: f }), k }));
  const n1 = big(g, 1150, 0, "1", 48, C.accent), pl2 = pl(g, 1400, 880, "PUIS TU TE FAIS PLAISIR", { bg: C.ink, fg: C.paper, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5) * out(t, m(6) - 0.5)); place(ok, 1330, 190, pop(t, m(2) - 0.3) * out(t, m(6) - 0.5)); on(deb, pop(t, m(2) - 0.2) * out(t, m(3) - 0.4));
    const kP = out(t, m(6) - 0.5);
    on(res, pop(t, m(3) - 0.3) * kP); place(tel, 960, 680, pop(t, m(3) - 0.2) * kP * 0.9, -4 + 2 * Math.sin(t));
    place(xx, 1080, 560, pop(t, m(5) - 0.3) * kP * 1.6); on(pe, pop(t, m(5) - 0.1) * kP);
    on(h1, pop(t, m(6) - 0.2));
    V.forEach(v => place(v.c, 520, v.y, pop(t, m(v.k) - 0.3)));
    on(nu, pop(t, m(10) - 0.3));
    place(tag, 360, 900, pop(t, m(11) - 0.4) * lerp(1, 0.75, ease(prog(t, m(11), m(11) + 0.8))), -10);
    on(neg, pop(t, m(11) - 0.3), 70); on(val, pop(t, m(12) - 0.3), 70);
    on(h2, pop(t, m(13) - 0.3));
    // « te payer toi-même » passe en tête de liste
    const ks = ease(prog(t, m(17) - 0.4, m(17) + 0.6)), ord = [[450, 565, 680], [565, 680, 450]];
    W.forEach((w, i) => place(w.c, 1400, lerp(ord[0][i], ord[1][i], ks) + (i === 2 ? -40 * Math.sin(Math.PI * ks) : 0), pop(t, m(w.k) - 0.3) * (i === 2 ? 1 + 0.06 * ks : 1)));
    n1.setAttribute("y", 466); show(n1, fade(t, m(17) + 0.2));
    on(pl2, pop(t, m(18) - 0.3));
  };
});

// ---- 14 · Un temps pour tout ----
SC("14", "UN TEMPS POUR TOUT", (g, A) => {
  const m = A.m, head = title(g, 190, "Un temps pour tout");
  const p1 = pl(g, 560, 320, "ÇA NE FAIT PAS DE TOI UN RADIN", { size: 20 }), cad = cadeau(g), p2 = pl(g, 560, 700, "IL FAUT SAVOIR SE FAIRE PLAISIR", { bg: C.accent, size: 20 });
  const hor = horloge(g), p3 = pl(g, 1360, 520, "AU BON MOMENT, PAS À CHAQUE INSTANT", { size: 20 });
  el("path", { ...D.line, "stroke-width": 4, d: "M760 920 L1720 920" }, g);
  const graine = coin(g, 26), arb = arbre(g, 1);
  const fr = arb.fruits.map(f => { const c = cadeau(f); c.setAttribute("transform", "scale(0.32)"); return c; });
  const l1 = pl(g, 980, 990, "CE QUE TU T'ES PAYÉ", { bg: C.ink, fg: C.paper, size: 18 }), l2 = pl(g, 1560, 320, "TES PLAISIRS DE DEMAIN", { bg: C.accent, size: 20 });
  return t => {
    show(head, fade(t, A.s, 0.6));
    const kA = out(t, m(5) - 0.6);
    on(p1, pop(t, m(1) - 0.3) * kA); place(cad, 560, 520, pop(t, m(2) - 0.3) * kA, 6 * Math.sin(t * 2.4)); on(p2, pop(t, m(2) - 0.1) * kA);
    place(hor.g, 1360, 380, pop(t, m(3) - 0.3) * kA * 1.3); hor.set(prog(t, m(3) - 0.3, m(5)) * 3); on(p3, pop(t, m(3) - 0.1) * kA);
    on(p3, pop(t, m(4) - 0.6) * kA);
    // la graine plantée devient un arbre à cadeaux
    const kg = ease(prog(t, m(5) - 0.3, m(6))); place(graine, 1240, lerp(780, 915, kg), pop(t, m(5) - 0.4) * (1 - prog(t, m(6), m(6) + 0.4)));
    arb.g.setAttribute("transform", "translate(1240 920) scale(1.15)"); arb.set(prog(t, m(6) - 0.2, m(7) + 0.8));
    fr.forEach((f, i) => f.style.opacity = fade(t, m(7) - 0.2 + i * 0.15));
    on(l1, pop(t, m(6) - 0.3)); on(l2, pop(t, m(7) - 0.2));
  };
});

// ---- 15 · L'erreur classique ----
SC("15", "L'ERREUR CLASSIQUE", (g, A) => {
  const m = A.m, head = title(g, 190, "L'erreur classique");
  el("path", { ...D.line, "stroke-width": 4, d: "M120 900 L1800 900" }, g);
  const me = marcheur(g, { vest: C.inkSoft }, 0.6), lic = licorne(g);
  const cr = coin(g, 50), crq = txt(g, 0, 0, "?", 46, { font: "Serif", weight: 700 }), tr = bougies(g, 9, 220, 160, 41), lo = ticket(g, "LOTO");
  const L = [[cr, "CRYPTO AU HASARD", 3, 520], [tr.g, "TRADING IMPULSIF", 4, 960], [lo, "LOTERIE", 5, 1400]].map(([o, s, k, x]) => ({ o, l: txt(g, x, 470, s, 22, { weight: 800, ls: 4 }), k, x }));
  const chance = pl(g, 960, 260, "PAR MANQUE DE DISCIPLINE : LE COUP DE CHANCE", { size: 20 });
  const perd = pl(g, 960, 560, "ILS PERDENT PLUS QU'ILS NE GAGNENT", { bg: C.ink, fg: C.paper, size: 20 });
  const esc = el("path", { ...D.line, stroke: C.accent, "stroke-width": 8, d: "M300 880 L300 830 L500 830 L500 770 L700 770 L700 710 L900 710 L900 650 L1100 650 L1100 590 L1300 590 L1300 530 L1500 530" }, g); draw(esc, m(8) - 0.5, m(8) + 1.4);
  const lic2 = pl(g, 1360, 980, "PAS LA CHASSE AUX LICORNES", { size: 20 }), cons = pl(g, 560, 980, "LA CONSTANCE", { bg: C.accent, size: 24 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const kC = out(t, m(7) - 0.4);
    on(chance, pop(t, m(2) - 0.3) * out(t, m(6) - 0.5));
    me.at(t, [[m(2) - 0.3, 260, 900], [m(6), 1100, 900], [m(7), 1100, 900], [m(8) + 0.2, 300, 830], [m(8) + 1.6, 1500, 530]], { yOf: t > m(7) ? x => { const s = Math.max(0, Math.min(6, Math.floor((x - 300) / 200))); return 830 - s * 60; } : undefined });
    const lx = lerp(560, 1500, ease(prog(t, m(2) - 0.3, m(6) + 0.6)));
    place(lic, lx, 820 - 40 * Math.abs(Math.sin(t * 4)), pop(t, m(2) - 0.4) * kC * 1.2);
    L.forEach(l => { place(l.o, l.x, 380, pop(t, m(l.k) - 0.3) * out(t, m(6) - 0.5), l.o === cr ? t * 60 : 0); show(l.l, fade(t, m(l.k) - 0.2) * out(t, m(6) - 0.5)); });
    crq.setAttribute("transform", `translate(${L[0].x} 396)`); crq.style.opacity = pop(t, m(3) - 0.3) * out(t, m(6) - 0.5);
    tr.g.setAttribute("transform", `translate(${L[1].x} 380) scale(${pop(t, m(4) - 0.3) * out(t, m(6) - 0.5)}) rotate(${8 * Math.sin(t * 6)})`); tr.g.style.opacity = t > m(4) - 0.3 ? 1 : 0;
    on(perd, pop(t, m(6) - 0.3) * kC);
    on(lic2, pop(t, m(7) - 0.3)); on(cons, pop(t, m(8) - 0.3));
  };
});

// ---- 16 · La vraie méritocratie (plus posé) ----
SC("16", "LA VRAIE MÉRITOCRATIE", (g, A) => {
  const m = A.m, head = title(g, 190, "Ne mets jamais quelqu'un sur un piédestal");
  el("path", { ...D.line, "stroke-width": 4, d: "M200 900 L1720 900" }, g);
  const pd = piedestal(g), lui = marcheur(g, { vest: C.ink }, 0.6), moi = marcheur(g, { vest: C.accent, hair: "f" }, 0.6);
  const fil = el("path", { ...D.line, stroke: C.accent, "stroke-width": 3, "stroke-dasharray": "10 10" }, g);
  const est = pl(g, 1180, 300, "IL CONTRÔLE TON ESTIME DE TOI", { size: 20 });
  const pv = pl(g, 960, 300, "NE DONNE PAS TON POUVOIR AUX AUTRES", { bg: C.ink, fg: C.paper, size: 20 }), vd = pl(g, 960, 360, "SI TU ATTENDS LEUR VALIDATION…", { size: 20 });
  const key = cle(g), kl = pl(g, 960, 420, "… TU LEUR CONFIES LA CLÉ DE TON ÉQUILIBRE", { bg: C.accentSoft, size: 20 });
  const bulle = el("circle", { ...D.line, stroke: C.accent, "stroke-width": 5, "stroke-dasharray": "4 12", fill: "none", r: 0 }, g);
  const coeurs = [0, 1, 2].map(() => { const h = el("g", {}, g); heart(h); return h; });
  const fl = [0, 1, 2].map(() => el("path", { ...D.line, fill: C.ink, d: "M0 0 L-40 -14 L-30 0 L-40 14 Z" }, g));
  const le = pl(g, 480, 360, "LES ÉLOGES FLATTENT", { bg: C.accentSoft, size: 18 }), lc = pl(g, 1440, 360, "LES CRITIQUES BLESSENT… SI TU LEUR DONNES DU POIDS", { size: 18 });
  const n1 = pl(g, 480, 420, "NI QUAND ON TE CRACHE DESSUS", { size: 18 }), n2 = pl(g, 1440, 420, "NI QUAND ON TE GLORIFIE", { size: 18 });
  const mer = big(g, 960, 300, "La vraie méritocratie", 56, C.accent), ac = pl(g, 960, 380, "AVANCER PAR TES PROPRES ACTIONS", { bg: C.ink, fg: C.paper, size: 20 });
  const op = pl(g, 960, 440, "SANS QUE L'OPINION DES AUTRES DICTE TON ÉTAT D'ESPRIT", { size: 18 });
  const pas = [0, 1, 2, 3, 4].map(() => el("ellipse", { fill: C.accentSoft, rx: 16, ry: 8 }, g));
  return t => {
    show(head, fade(t, m(1) - 0.5) * out(t, m(7) - 0.5));
    const hP = 300 * ease(prog(t, m(1) - 0.3, m(2) + 0.4)) * (1 - ease(prog(t, m(7) - 0.3, m(7) + 1.4)));
    pd.g.setAttribute("transform", "translate(1180 900)"); const top = pd.set(hP);
    const kEnd = out(t, m(12) - 0.6);
    lui.at(t, [[m(1) - 0.4, 1180, 900 + top + 26 - (hP > 2 ? 0 : 0)]], { k: kEnd, flip: true });
    const xm = t < m(13) ? 700 : lerp(700, 1100, ease(prog(t, m(13) - 0.2, m(13) + 2.4)));
    moi.at(t, [[A.s + 0.3, 700, 900], [m(13) - 0.2, 700, 900], [m(13) + 2.4, 1100, 900]], {});
    fil.setAttribute("d", `M700 600 Q940 ${600 + top / 2} 1180 ${900 + top - 300}`); fil.style.opacity = fade(t, m(3) - 0.5) * out(t, m(7) - 0.3);
    on(est, pop(t, m(3) - 0.3) * out(t, m(4) - 0.5));
    on(pv, pop(t, m(4) - 0.3) * out(t, m(7) - 0.5)); on(vd, pop(t, m(5) - 0.3) * out(t, m(7) - 0.5)); on(kl, pop(t, m(6) - 0.3) * out(t, m(7) - 0.5));
    const kk = ease(prog(t, m(6) - 0.3, m(6) + 0.8)), kr = ease(prog(t, m(7) + 0.2, m(7) + 1.2));
    place(key, lerp(lerp(760, 1120, kk), 760, kr), 640 - 120 * Math.sin(Math.PI * kk) * (1 - kr), pop(t, m(6) - 0.4) * out(t, m(12) - 0.6) * 0.8);
    bulle.setAttribute("cx", xm); bulle.setAttribute("cy", 760); bulle.setAttribute("r", 190 * fade(t, m(7) - 0.2, 1.0) * kEnd);
    coeurs.forEach((c, i) => { const u = prog(t, m(8) - 0.6 + i * 0.5, m(8) + 0.9 + i * 0.5); const x = lerp(200, xm - 190, Math.min(1, u * 1.4)) - Math.max(0, u - 0.7) * 300;
      place(c, x, 700 - i * 60, (u > 0 && u < 1 ? 0.45 : 0) * kEnd); });
    fl.forEach((f, i) => { const u = prog(t, m(9) - 0.6 + i * 0.5, m(9) + 0.9 + i * 0.5); const x = lerp(1740, xm + 190, Math.min(1, u * 1.4)) + Math.max(0, u - 0.7) * 300;
      place(f, x, 700 - i * 60, (u > 0 && u < 1 ? 1 : 0) * kEnd, 180); });
    on(le, pop(t, m(8) - 0.3) * kEnd); on(lc, pop(t, m(9) - 0.3) * kEnd); on(n1, pop(t, m(10) - 0.3) * kEnd); on(n2, pop(t, m(11) - 0.3) * kEnd);
    show(mer, fade(t, m(12) - 0.3)); on(ac, pop(t, m(13) - 0.3)); on(op, pop(t, m(14) - 0.3));
    pas.forEach((p, i) => { p.setAttribute("cx", 700 + i * 90); p.setAttribute("cy", 915); p.style.opacity = xm > 700 + i * 90 ? 1 : 0; });
  };
});

// ---- 17 · Planifier ton héritage ----
SC("17", "PLANIFIER TON HÉRITAGE", (g, A) => {
  const m = A.m, head = title(g, 190, "Planifier ton héritage");
  const sab = el("g", {}, g); D.icons.sablier(el("g", { transform: "scale(1.2)" }, sab));
  const vie = el("path", { ...D.line, stroke: C.ink, "stroke-width": 10, d: "M300 520 L1000 520" }, g), arg = el("path", { ...D.line, stroke: C.accent, "stroke-width": 10, "stroke-dasharray": "2 22", d: "M1000 520 L1640 520" }, g);
  draw(vie, m(2) - 0.3, m(2) + 0.9);
  const lv = txt(g, 650, 480, "ta vie a une durée", 26, { weight: 700 }), la = txt(g, 1320, 480, "ton argent peut te survivre", 26, { weight: 700, fill: C.accent });
  const pa = pl(g, 960, 620, "TU NE PARS PAS AVEC", { bg: C.ink, fg: C.paper, size: 22 }), q = big(g, 960, 300, "Qu'est-ce que tu veux laisser ?", 56);
  el("path", { ...D.line, "stroke-width": 4, d: "M300 940 L1620 940" }, g);
  const arb = arbre(g, 1);
  const gens = [[6, [[700, 940], [800, 940]], C.accent], [7, [[1120, 940], [1220, 940]], C.inkSoft], [8, [[480, 940], [1440, 940], [1540, 940]], C.accentSoft]]
    .map(([k, P, v]) => ({ k, F: P.map(([x, y]) => ({ f: marcheur(g, { vest: v, hair: x % 200 ? "f" : undefined }, 0.4), x, y })) }));
  const lab = [["TES ENFANTS", 6, 750], ["TA FAMILLE", 7, 1170], ["CEUX QUI VIENNENT APRÈS", 8, 1490]].map(([s, k, x]) => ({ p: pl(g, x, 1000, s, { size: 16 }), k }));
  const ct = pl(g, 560, 420, "DES CHOIX À COURT TERME…", { size: 20 }), lt = pl(g, 1360, 420, "… UN IMPACT À LONG TERME", { bg: C.accent, size: 20 });
  const pr = pl(g, 960, 300, "LA PREUVE DE TON PASSAGE", { bg: C.ink, fg: C.paper, size: 24 });
  return t => {
    show(head, fade(t, m(1) - 0.5) * out(t, m(5) - 0.5));
    const kA = out(t, m(5) - 0.6);
    place(sab, 220, 520, pop(t, m(2) - 0.4) * kA, 180 * ease(prog(t, m(2) + 0.6, m(2) + 1.4)));
    vie.style.opacity = kA * (t > m(2) - 0.3 ? 1 : 0); show(lv, fade(t, m(2)) * kA);
    const ka = ease(prog(t, m(3) - 0.3, m(3) + 0.9)); arg.setAttribute("d", `M1000 520 L${lerp(1000, 1640, ka)} 520`); arg.style.opacity = (ka > 0 ? 1 : 0) * kA; show(la, fade(t, m(3)) * kA);
    on(pa, pop(t, m(4) - 0.3) * kA);
    show(q, fade(t, m(5) - 0.3) * out(t, m(9) - 0.5));
    arb.g.setAttribute("transform", "translate(960 940) scale(1.2)"); arb.set(prog(t, m(5), m(8) + 0.5));
    gens.forEach(gg => gg.F.forEach((p, i) => p.f.at(t, [[m(gg.k) - 0.3 + i * 0.15, p.x, p.y]], { flip: p.x > 960 })));
    lab.forEach(l => on(l.p, pop(t, m(l.k) - 0.1)));
    on(ct, pop(t, m(9) - 0.3) * out(t, m(11) - 0.5)); on(lt, pop(t, m(10) - 0.3) * out(t, m(11) - 0.5));
    on(pr, pop(t, m(11) - 0.3));
  };
});

// ---- 18 · Conclusion ----
SC("18", "L'ARGENT SUIT LA VALEUR", (g, A) => {
  const m = A.m;
  const B = [["sprout", "FAIRE", 1, 480], ["bouclier", "GARDER", 3, 960], ["bourse", "MULTIPLIER", 3, 1440]].map(([k, s, kk, x], i) => ({ b: badge(g, k, s, "", 100), kk, d: i === 2 ? 0.3 : 0, x }));
  const toi = pl(g, 480, 640, "C'EST TOI QUI AS LA SOLUTION", { bg: C.accentSoft, size: 20 }), nous = pl(g, 1200, 640, "C'EST LÀ QU'ON PEUT T'ACCOMPAGNER", { bg: C.ink, fg: C.paper, size: 20 });
  const mic = big(g, 960, 230, "Midelton Investment Capital", 58), av = txt(g, 960, 280, "on construit ça avec toi", 26, { weight: 600, fill: C.inkSoft });
  const gr = graphe(g, X0, X1, SUP, RES), me = marcheur(g, { vest: C.accent }, 0.55);
  const rl = el("path", { ...D.line, stroke: C.accent, "stroke-width": 9, "stroke-dasharray": "28 18", d: `M${X0} ${RES} L1000 ${RES}` }, g), rr = el("path", { ...D.line, stroke: C.accent, "stroke-width": 9, "stroke-dasharray": "28 18", d: `M1000 ${RES} L${X1} ${RES}` }, g);
  const p6 = pl(g, 1460, 965, "FAIS MONTER TON SUPPORT", { bg: C.ink, fg: C.paper, size: 20 }), p7 = pl(g, 960, 200, "CASSE TA RÉSISTANCE", { bg: C.accent, size: 22 });
  const fin = big(g, 960, 470, "L'argent suit la valeur.", 80, C.ink), val = el("path", { ...D.line, fill: C.accent, d: "M0 -34 L28 0 L0 34 L-28 0 Z" }, g), suit = [0, 1, 2].map(() => coin(g, 20));
  return t => {
    const kA = out(t, m(6) - 0.6);
    B.forEach(b => place(b.b, b.x, 450, pop(t, m(b.kk) - 0.4 + b.d) * kA));
    on(toi, pop(t, m(2) - 0.3) * kA); on(nous, pop(t, m(4) - 0.3) * kA);
    show(mic, fade(t, m(5) - 0.4) * kA); show(av, fade(t, m(5)) * kA);
    const kG = fade(t, m(6) - 0.4), ys = lerp(SUP, 700, ease(prog(t, m(6) - 0.2, m(6) + 1.2)));
    gr.g.style.opacity = kG; gr.set(kG > 0 ? 1 : 0, 0, ys);
    me.at(t, [[m(6) - 0.4, 560, ys]], { k: kG, armR: t > m(7) - 0.2 ? -40 : undefined, armL: t > m(7) - 0.2 ? 220 : undefined });
    on(p6, pop(t, m(6) - 0.2));
    const kb = ease(prog(t, m(7) - 0.2, m(7) + 1.0));
    rl.setAttribute("transform", `translate(${-220 * kb} ${-20 * kb}) rotate(${-6 * kb} ${X0} ${RES})`); rr.setAttribute("transform", `translate(${220 * kb} ${-20 * kb}) rotate(${6 * kb} ${X1} ${RES})`);
    rl.style.opacity = rr.style.opacity = kG * (1 - kb); on(p7, pop(t, m(7) - 0.2));
    show(fin, fade(t, m(8) - 0.3));
    const path = u => [lerp(700, 1500, u), 580 + 40 * Math.sin(u * 7)], u = prog(t, m(8), A.e) * 1.3;
    const [vx, vy] = path(Math.min(1, u)); place(val, vx, vy, fade(t, m(8)) * (u < 1 ? 1 : 0));
    suit.forEach((c, i) => { const ui = u - 0.08 * (i + 1); const [cx, cy] = path(Math.max(0, Math.min(1, ui))); place(c, cx, cy, fade(t, m(8) + 0.3) * (ui > 0 && ui < 1 ? 1 : 0)); });
  };
});
