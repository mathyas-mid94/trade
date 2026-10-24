// Parties 00 à 08 : introduction, action, obligation, ETF, capitalisant / distribuant, le CTO et sa fiscalité.
// A.m(k) = instant du repère [k] de la partie (SCRIPT.md) ; A.s / A.e = début / fin de la partie.

// ---- 00 · Introduction ----
SC("00", "INTRODUCTION", (g, A) => {
  const m = A.m;
  const ind = pl(g, 960, 260, "DEUX OUTILS INDISPENSABLES DANS UN PATRIMOINE", { bg: C.accentSoft, size: 22 });
  const cto = compte(g, "CTO"), pea = compte(g, "PEA", C.accent);
  const lc = txt(g, 640, 640, "le compte-titres ordinaire", 26, { weight: 500, fill: C.inkSoft }), lp = txt(g, 1280, 640, "le plan d'épargne en actions", 26, { weight: 500, fill: C.inkSoft });
  const lib = pl(g, 640, 720, "LA LIBERTÉ", { bg: C.ink, fg: C.paper, size: 26 }), fis = pl(g, 1280, 720, "L'AVANTAGE FISCAL", { bg: C.accent, size: 26 });
  const bo = pl(g, 960, 820, "DEUX COMPTES POUR INVESTIR EN BOURSE", { size: 20 });
  const conv = pl(g, 960, 300, "TES CONVICTIONS", { bg: C.accent, size: 26 }), div = pl(g, 960, 380, "AU-DELÀ DE L'ASSURANCE VIE", { size: 22 });
  const acc = pl(g, 960, 460, "CE QU'ON NE TROUVE PAS AILLEURS", { size: 22 }), lib2 = pl(g, 960, 540, "PLUS DE LIBERTÉ POUR TE POSITIONNER", { size: 22 });
  const O = [["bourse", "FAIRE GRANDIR", "ton capital", 12], ["percent", "PAYER MOINS", "d'impôts", 13], ["coins", "DISPONIBLE", "à tout moment", 14]].map(([k, a, b, mk], i) => ({ w: badge(g, k, a, b, 95), x: 560 + i * 400, a: m(mk) }));
  return t => {
    const p1 = out(t, m(7) - 0.5), p2 = out(t, m(11) - 0.5);
    on(ind, pop(t, m(1) - 0.3) * p1); place(cto, 640, 470, pop(t, m(2) - 0.4) * p1); show(lc, fade(t, m(2)) * p1); place(pea, 1280, 470, pop(t, m(3) - 0.4) * p1); show(lp, fade(t, m(3)) * p1);
    on(bo, pop(t, m(4) - 0.3) * p1); on(lib, pop(t, m(5) - 0.3) * p1); on(fis, pop(t, m(6) - 0.3) * p1);
    on(conv, pop(t, m(7) - 0.3) * p2); on(div, pop(t, m(8) - 0.3) * p2); on(acc, pop(t, m(9) - 0.3) * p2); on(lib2, pop(t, m(10) - 0.3) * p2);
    O.forEach(o => place(o.w, o.x, 520, pop(t, o.a - 0.3)));
  };
});

// ---- 01 · L'action ----
SC("01", "L'ACTION", (g, A) => {
  const m = A.m;
  const B = [["L'action", 3], ["L'obligation", 3.3], ["L'ETF", 3.6]].map(([s, k], i) => ({ c: bloc(g, 320, 90, s, "", { fill: i ? C.face : C.accent, size: 38 }), x: 560 + i * 400, k }));
  const tb = pl(g, 960, 260, "LES TROIS BRIQUES DE BASE", { size: 22 });
  const ent = usine(g, 1.3), mis = pl(g, 560, 380, "SA MISSION", { bg: C.accentSoft, size: 20 }), besoin = pl(g, 560, 870, "ELLE A BESOIN D'ARGENT", { size: 20 });
  const inv = member(g, "client"), fl = flux(g, 4);
  const pe = partEntreprise(g, 1), prop = pl(g, 1400, 380, "UN PETIT BOUT DE L'ENTREPRISE", { bg: C.accent, size: 20 });
  const dv = pl(g, 1400, 800, "UN DROIT DE VOTE", { size: 20 }), db = pl(g, 1400, 880, "UN DROIT SUR LES BÉNÉFICES", { size: 20 });
  return t => {
    const p1 = out(t, m(4) - 0.4);
    on(tb, pop(t, m(2) - 0.3) * p1); B.forEach(b => place(b.c, b.x, 500, pop(t, m(Math.floor(b.k)) + (b.k % 1) * 2 - 0.3) * p1));
    const k2 = t > m(4) - 0.3 ? 1 : 0;
    place(ent, 560, 620, pop(t, m(6) - 0.4) * 1.3 * k2); on(mis, pop(t, m(6)) * k2); on(besoin, pop(t, m(6) + 0.4) * k2);
    inv.at(t, m(7) - 0.4, 960, 900, { k: k2 }); fl(t, m(8) - 0.2, m(8) + 1.1, 960, 600, 640, 620, 100);
    place(pe.g, 1400, 600, pop(t, m(5) - 0.3) * k2); pe.part.setAttribute("transform", `translate(${30 * ease(prog(t, m(9) - 0.3, m(9) + 0.4))} ${-20 * ease(prog(t, m(9) - 0.3, m(9) + 0.4))})`);
    on(prop, pop(t, m(9)) * k2); on(dv, pop(t, m(10) - 0.3) * k2); on(db, pop(t, m(11) - 0.3) * k2);
  };
});

// ---- 02 · Ce que rapporte une action ----
SC("02", "CE QUE RAPPORTE UNE ACTION", (g, A) => {
  const m = A.m, head = title(g, 190, "Ce que rapporte une action");
  const dv = bloc(g, 480, 120, "Les dividendes", "une partie des bénéfices reversée", { fill: C.accent, size: 40 }), fl = flux(g, 3);
  const ch = K.chart(g, 520, 260, [[0, 0.2], [0.2, 0.3], [0.4, 0.28], [0.6, 0.5], [0.8, 0.62], [1, 0.85]], { color: C.ink, sw: 7 });
  ch.g.setAttribute("transform", "translate(1350 500)"); draw(ch.line, m(3) - 0.3, m(3) + 0.8); const hc = pl(g, 1350, 320, "LA HAUSSE DU COURS", { bg: C.ink, fg: C.paper, size: 20 });
  const pc = pl(g, 960, 760, "LE RISQUE : LA PERTE EN CAPITAL", { bg: C.paperDeep, size: 22 }), bais = pl(g, 960, 840, "SI L'ENTREPRISE VA MAL, L'ACTION BAISSE", { size: 18 });
  const pr = pl(g, 960, 960, "TU CONFIES TON ARGENT → TU PARTAGES LE RÉSULTAT", { bg: C.accent, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(dv, 560, 420, pop(t, m(2) - 0.3)); fl(t, m(2) + 0.2, m(2) + 1.2, 560, 480, 560, 640, -40);
    ch.g.style.opacity = fade(t, m(3) - 0.4); on(hc, pop(t, m(3) - 0.2));
    on(pc, pop(t, m(4) - 0.3)); on(bais, pop(t, m(5) - 0.3)); on(pr, pop(t, m(7) - 0.3));
  };
});

// ---- 03 · L'obligation ----
SC("03", "L'OBLIGATION", (g, A) => {
  const m = A.m, head = title(g, 190, "L'obligation : tu deviens prêteur");
  const em = [usine(g, 0.9), bank(g, "ÉTAT", 200)], le = pl(g, 1400, 300, "UNE ENTREPRISE OU UN ÉTAT", { size: 20 });
  const pas = pl(g, 960, 360, "PAS PROPRIÉTAIRE", { size: 20 }), x = check(g, false), pret = pl(g, 960, 440, "PRÊTEUR", { bg: C.accent, size: 28 });
  const mb = bank(g, "TOI", 220), mini = pl(g, 420, 860, "UNE MINI-BANQUE", { bg: C.ink, fg: C.paper, size: 20 });
  const a1 = arrow(g, 560, 560, 1240, 560, m(6) - 0.4, m(6) + 0.3, { bend: -60 }), cp = flux(g, 4), cl = pl(g, 900, 700, "LES COUPONS", { bg: C.accentSoft, size: 20 });
  const cal = calendar(g, ""), rb = pl(g, 900, 860, "LE CAPITAL REMBOURSÉ", { bg: C.accent, size: 20 });
  const df = pl(g, 1400, 960, "LE RISQUE : LE DÉFAUT", { bg: C.ink, fg: C.paper, size: 20 }), nr = check(g, false), vid = pl(g, 420, 990, "TOUT UN MONDE : UNE VIDÉO DÉDIÉE", { size: 16 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(em[0], 1300, 640, pop(t, m(2) - 0.4)); place(em[1], 1540, 640, pop(t, m(2) - 0.1) * 0.6); on(le, pop(t, m(2)));
    on(pas, pop(t, m(3) - 0.3) * out(t, m(5))); place(x, 840, 360, pop(t, m(3)) * 0.7 * out(t, m(5))); on(pret, pop(t, m(4) - 0.3));
    place(mb, 420, 680, pop(t, m(5) - 0.4) * 0.6); on(mini, pop(t, m(5)));
    a1.render(t); const c0 = Math.floor(t / 2) * 2; cp(t, t > m(7) ? c0 : 1e9, t > m(7) ? c0 + 1.4 : 1e9 + 1, 1240, 620, 560, 640, -60); on(cl, pop(t, m(7) - 0.2));
    place(cal.g, 640, 860, pop(t, m(8) - 0.4) * 0.7); on(rb, pop(t, m(8)));
    on(df, pop(t, m(9) - 0.3)); place(nr, 1600, 760, pop(t, m(10) - 0.3)); on(vid, pop(t, m(11) - 0.3));
  };
});

// ---- 04 · L'ETF ----
SC("04", "L'ETF", (g, A) => {
  const m = A.m, head = title(g, 190, "L'ETF : un panier qui réplique un indice");
  const pn = panier(g, 1.4), rep = pl(g, 480, 820, "IL RÉPLIQUE UN INDICE", { bg: C.accent, size: 22 });
  const idx = pl(g, 1350, 320, "UN INDICE = UN GROUPE D'ENTREPRISES", { size: 18 });
  const I = [["CAC 40", "40 grandes entreprises françaises", 5], ["S&P 500", "500 grandes entreprises américaines", 6], ["MSCI World", "les grandes entreprises du monde", 7]]
    .map(([a, b, k], i) => ({ c: bloc(g, 560, 100, a, b, { fill: i === 2 ? C.ink : C.face, size: 36 }), y: 440 + i * 120, k }));
  const un = pl(g, 960, 300, "UNE ACTION…", { size: 22 }), cent = pl(g, 960, 380, "… OU DES CENTAINES, EN UN SEUL ACHAT", { bg: C.accent, size: 22 });
  const R = [["Diversification instantanée", 10], ["Des frais faibles", 11], ["La gestion passive", 12]].map(([s, k], i) => ligne(g, s, m(k), 560 + i * 100, true, 36));
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const p1 = out(t, m(8) - 0.5);
    place(pn.g, 480, 560, pop(t, m(2) - 0.4) * p1); pn.items.forEach((c, i) => c.style.opacity = fade(t, m(2) + i * 0.15)); on(rep, pop(t, m(3) - 0.3) * p1);
    on(idx, pop(t, m(4) - 0.3) * p1); I.forEach(o => place(o.c, 1350, o.y, pop(t, m(o.k) - 0.3) * p1));
    on(un, pop(t, m(8) - 0.3)); on(cent, pop(t, m(9) - 0.3)); R.forEach(r => place(r.r, 700, r.y, pop(t, r.a - 0.3)));
  };
});

// ---- 05 · Capitalisant ou distribuant ----
SC("05", "CAPITALISANT OU DISTRIBUANT", (g, A) => {
  const m = A.m, head = title(g, 190, "Capitalisant ou distribuant ?");
  const p1 = panier(g, 1), p2 = panier(g, 1);
  const ld = bloc(g, 480, 90, "Distribuant", "il te verse les dividendes", { size: 36 }), lc = bloc(g, 480, 90, "Capitalisant", "il les réinvestit", { fill: C.accent, size: 36 });
  const f1 = flux(g, 3), f2 = flux(g, 3), toi = member(g, "client"), bn = stack(g, 1, 30);
  const ent = pl(g, 960, 820, "MÊME LOGIQUE CÔTÉ ENTREPRISES", { size: 20 }), e1 = pl(g, 560, 900, "ELLE VERSE UN DIVIDENDE", { size: 18 }), e2 = pl(g, 1360, 900, "ELLE RÉINVESTIT SES BÉNÉFICES", { size: 18 });
  const imp = pl(g, 960, 990, "UN VRAI IMPACT SUR TES IMPÔTS", { bg: C.ink, fg: C.paper, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(p1.g, 560, 520, pop(t, m(2) - 0.4)); place(ld, 560, 330, pop(t, m(2) - 0.2)); toi.at(t, m(2), 300, 800, { scale: 0.8 });
    const c0 = Math.floor(t / 2.2) * 2.2; f1(t, t > m(2) ? c0 : 1e9, t > m(2) ? c0 + 1.2 : 1e9 + 1, 560, 470, 330, 560, 80);
    place(p2.g, 1360, 520, pop(t, m(3) - 0.4)); place(lc, 1360, 330, pop(t, m(3) - 0.2));
    f2(t, t > m(3) ? c0 + 0.6 : 1e9, t > m(3) ? c0 + 1.8 : 1e9 + 1, 1300, 450, 1420, 450, 50);
    const kb = prog(t, m(4) - 0.2, m(4) + 2); place(bn, 1530, 560, kb > 0 ? 1 : 0); bn.setAttribute("transform", `translate(1530 560) scale(${1 + 1.5 * ease(kb)})`);
    on(ent, pop(t, m(5) - 0.3)); on(e1, pop(t, m(6) - 0.3)); on(e2, pop(t, m(7) - 0.3)); on(imp, pop(t, m(8) - 0.3));
  };
});

// ---- 06 · Le CTO, le compte sans limite ----
SC("06", "LE CTO, LE COMPTE SANS LIMITE", (g, A) => {
  const m = A.m;
  const cto = compte(g, "CTO", C.ink, 1), libre = pl(g, 960, 760, "LE COMPTE LE PLUS LIBRE", { bg: C.accent, size: 24 });
  const L = [["Aucun plafond de versement", 4], ["Aucune durée minimale", 5], ["Particulier ou société", 6], ["Démembrable", 7]].map(([s, k], i) => ligne(g, s, m(k), 330 + i * 90, true, 32));
  const U = [["ACTIONS", 9], ["OBLIGATIONS", 10], ["ETF", 11], ["FONDS", 12], ["STRUCTURÉS", 13], ["MATIÈRES PREMIÈRES", 14]].map(([s, k], i) => {
    const a = -Math.PI / 2 + i * Math.PI / 3; return { p: pl(g, 1350 + 300 * Math.cos(a), 560 + 230 * Math.sin(a), s, { bg: C.accentSoft, size: 18 }), k }; });
  const tout = big(g, 960, 980, "Tout est permis…", 44), sauf = pl(g, 1400, 970, "… SAUF D'ÉCHAPPER À L'IMPÔT", { bg: C.ink, fg: C.paper, size: 20 });
  return t => {
    const kx = ease(prog(t, m(4) - 0.6, m(4) - 0.1));
    place(cto, lerp(960, 1350, kx), lerp(520, 560, kx), pop(t, m(2) - 0.4) * lerp(1.4, 0.9, kx)); on(libre, pop(t, m(3) - 0.3) * out(t, m(4) - 0.6));
    L.forEach(l => place(l.r, 160, l.y, pop(t, l.a - 0.3)));
    U.forEach(u => on(u.p, pop(t, m(u.k) - 0.3)));
    show(tout, fade(t, m(15) - 0.3)); tout.setAttribute("x", 520); on(sauf, pop(t, m(16) - 0.3));
  };
});

// ---- 07 · La fiscalité du CTO ----
SC("07", "LA FISCALITÉ DU CTO", (g, A) => {
  const m = A.m, head = title(g, 190, "La fiscalité du CTO : le PFU à 31,4 %");
  const s100 = pl(g, 960, 300, "SUR 100 € DE GAIN", { size: 22 });
  const ir = barre(g, 300, 380, 200, 120, C.accent, "12,80 € IR", C.ink), ps = barre(g, 500, 380, 300, 120, C.inkSoft, "18,60 € PS"), ta = barre(g, 800, 380, 820, 120, C.ink, "68,60 € dans ta poche");
  const C3 = [["Le fait générateur", "chaque vente, chaque dividende ou coupon", 6], ["L'option barème", "utile si ta tranche est à 0 ou 11 %", 8], ["Les moins-values", "imputables, reportables 10 ans", 10]]
    .map(([a, b, k], i) => ({ c: bloc(g, 480, 140, a, b, { size: 32 }), x: 420 + i * 540, k }));
  const re = pl(g, 420, 870, "MÊME RÉINVESTI", { bg: C.accent, size: 18 }), gl = pl(g, 960, 870, "SUR TOUS TES REVENUS MOBILIERS", { size: 16 }), dix = pl(g, 1500, 870, "PENDANT 10 ANS", { bg: C.accentSoft, size: 18 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); on(s100, pop(t, m(2) - 0.3));
    ir.set(ease(prog(t, m(3) - 0.3, m(3) + 0.3))); ps.set(ease(prog(t, m(4) - 0.3, m(4) + 0.3))); ta.set(ease(prog(t, m(5) - 0.3, m(5) + 0.4)));
    C3.forEach(c => place(c.c, c.x, 680, pop(t, m(c.k) - 0.3)));
    on(re, pop(t, m(7) - 0.3)); on(gl, pop(t, m(9) - 0.1)); on(dix, pop(t, m(11) - 0.3));
  };
});

// ---- 08 · Le CTO dans une société ----
SC("08", "LE CTO DANS UNE SOCIÉTÉ", (g, A) => {
  const m = A.m, head = title(g, 190, "Le CTO détenu par une société");
  el("path", { ...D.line, "stroke-width": 4, d: "M700 300 L700 860" }, g);
  const R = [["Particulier (PFU)", 31.4, C.ink, 2.6], ["Société à l'IS, jusqu'à 42 500 €", 15, C.accent, 2], ["Société à l'IS, au-delà", 25, C.accent, 3], ["Dividendes mère-fille", 1.25, C.inkSoft, 7], ["Plus-values de participation", 3, C.inkSoft, 8]]
    .map(([s, v, f, k], i) => { const y = 340 + i * 110; const l = txt(g, 680, y + 12, s, 26, { anchor: "end", weight: 600 });
      const r = el("rect", { ...D.line, fill: f, x: 700, y: y - 30, height: 60, rx: 8 }, g); const tv = txt(g, 0, y + 12, "≈ " + String(v).replace(".", ",") + " %", 30, { anchor: "start", font: "Serif", weight: 700 }); return { l, r, tv, v, k }; });
  const ri = pl(g, 1450, 980, "LA 2ᵉ COUCHE D'IMPÔT : À LA DISTRIBUTION", { size: 16 }), gros = pl(g, 1450, 650, "GROSSES PARTICIPATIONS : ENCORE PLUS DOUX", { size: 16 });
  const piege = bloc(g, 760, 110, "Piège à l'IS : les ETF et les fonds", "taxés chaque année sur leur hausse, même sans vente", { fill: C.accentSoft, size: 30 });
  const ir = pl(g, 960, 1010, "SOCIÉTÉ À L'IR : TRANSPARENCE → CHAQUE ASSOCIÉ AU PFU", { bg: C.ink, fg: C.paper, size: 16 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const p1 = out(t, m(9) - 0.5);
    R.forEach(r => { const k = ease(prog(t, m(Math.floor(r.k)) + (r.k % 1) * 2 - 0.3, m(Math.floor(r.k)) + (r.k % 1) * 2 + 0.4)) * p1, w = r.v * 22 * k;
      r.r.setAttribute("width", Math.max(0, w)); r.r.style.opacity = w > 1 ? 1 : 0; r.tv.setAttribute("x", 720 + Math.max(w, 0)); r.tv.style.opacity = k; r.l.style.opacity = fade(t, m(Math.floor(r.k)) - 0.6) * p1; });
    on(ri, pop(t, m(5) - 0.3) * p1); on(gros, pop(t, m(6) - 0.3) * p1);
    place(piege, 960, 560, pop(t, m(10) - 0.3)); on(ir, pop(t, m(11) - 0.3));
  };
});
