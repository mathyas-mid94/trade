// Parties 06 à 11 : le revers de la baisse des taux, la loi Lemoine, le cas client, les économies, que faire de 13 393 €, déjà changé ?

// ---- 06 · Le revers de la baisse des taux ----
SC("06", "LE REVERS DE LA BAISSE DES TAUX", (g, A) => {
  const m = A.m, head = title(g, 190, "Du côté des assureurs");
  const mk = (x, label1, label2, k, drawIcon) => {
    const w = el("g", {}, g); el("circle", { ...D.line, fill: C.face, r: 120 }, w); drawIcon(w);
    txt(w, 0, 175, label1, 24, { weight: 800, ls: 4 }); txt(w, 0, 208, label2, 22, { weight: 500, fill: C.inkSoft });
    return { w, x, a: m(k) };
  };
  const S = [
    mk(330, "LES TAUX", "baissent", 2, w => { [70, 52, 36, 22].forEach((h, i) => el("rect", { ...D.line, "stroke-width": 3, fill: C.inkSoft, x: -60 + i * 32, y: 40 - h, width: 24, height: h }, w));
      el("path", { ...D.line, stroke: C.accent, "stroke-width": 5, d: "M-60 -56 C-20 -50 20 -30 56 -6 M40 -18 L58 -4 L40 6" }, w); }),
    mk(760, "LES ASSUREURS", "gagnent moins sur leurs placements", 3, w => { shield(w, C.accentSoft).setAttribute("transform", "scale(0.85)"); txt(w, 0, 22, "€", 64, { font: "Serif", weight: 700 }); }),
    mk(1190, "POUR COMPENSER", "ils augmentent leurs prix", 4, w => { const p = prix(w, "€€€", C.ink); p.setAttribute("transform", "translate(-14 10) scale(0.85)");
      el("path", { ...D.line, stroke: C.accent, "stroke-width": 6, d: "M70 -30 L70 -86 M54 -70 L70 -88 L86 -70" }, w); }),
    mk(1620, "RÉSULTAT", "ton assurance coûte plus cher", 5, w => { D.icons.bouclier(w); }),
  ];
  const F = [0, 1, 2].map(i => arrow(g, 470 + i * 430, 520, 600 + i * 430, 520, m(i + 3) - 0.6, m(i + 3) - 0.2, { color: C.ink, w: 6 }));
  const malgre = pill(g, 960, 900, "MALGRÉ LA BAISSE DES TAUX", { bg: C.accent, size: 30 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    S.forEach(s => place(s.w, s.x, 520, pop(t, s.a - 0.3) * 0.95)); F.forEach(f => f.render(t));
    place(malgre.g, malgre.x, malgre.y, pop(t, m(6) - 0.3));
  };
});

// ---- 07 · La loi Lemoine ----
SC("07", "LA LOI LEMOINE", (g, A) => {
  const m = A.m, head = title(g, 190, "La loi Lemoine");
  const sf = sifflet(g), recre = pill(g, 1330, 470, "FIN DE LA RÉCRÉ !", { bg: C.face, size: 22 });
  const depuis = pill(g, 760, 420, "DEPUIS 2022", { bg: C.paperDeep, size: 24 });
  const tout = bloc(g, 1000, 130, "Résilier ou renégocier à tout moment", "ton assurance emprunteur", { fill: C.ink, size: 40 });
  const cond = pill(g, 960, 820, "UNE SEULE CONDITION", { bg: C.accent, size: 26 });
  const s1 = protege(g), s2 = protege(g), eq = big(g, 960, 520, "=", 110);
  const l1 = txt(g, 640, 670, "TON ASSURANCE ACTUELLE", 20, { weight: 800, ls: 4, fill: C.inkSoft }), l2 = txt(g, 1280, 670, "LA NOUVELLE", 20, { weight: 800, ls: 4, fill: C.inkSoft });
  const geq = pill(g, 960, 330, "DES GARANTIES ÉQUIVALENTES, AU MINIMUM", { bg: C.accent, size: 24 });
  const L = [["Moins bien couvert", 5, false], ["Les mêmes garanties, ou plus", 6, true]].map(([s, k, ok], i) => ligne(g, s, m(k), 780 + i * 80, ok, 34));
  const pareil = pill(g, 960, 980, "COUVERT PAREIL", { bg: C.paperDeep, size: 22 });
  const p1t = prix(g, "99 €", C.ink), p2t = prix(g, "59 €", C.accent);
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const pA = out(t, m(4) - 0.6);
    place(sf, 1150, 420, pop(t, m(1) - 0.2) * pA, Math.sin(t * 18) * 6 * (1 - prog(t, m(1) + 0.4, m(1) + 1.2)));
    place(recre.g, recre.x + 160, recre.y - 30, pop(t, m(1) + 0.4) * pA);
    place(depuis.g, depuis.x, depuis.y, pop(t, m(2) - 0.6) * pA); place(tout, 960, 640, pop(t, m(2) - 0.3) * pA);
    place(cond.g, cond.x, cond.y, pop(t, m(3) - 0.3) * pA);
    place(geq.g, geq.x, geq.y, pop(t, m(4) - 0.3));
    place(s1, 640, 500, pop(t, m(4) - 0.3) * 1.6); place(s2, 1280, 500, pop(t, m(4)) * 1.6); eq.style.opacity = fade(t, m(4) + 0.2);
    l1.style.opacity = fade(t, m(4)); l2.style.opacity = fade(t, m(4) + 0.2);
    L.forEach(l => place(l.r, 700, l.y, pop(t, l.a - 0.3)));
    place(pareil.g, pareil.x, pareil.y, pop(t, m(7) - 0.3));
    place(p1t, 800, 400, pop(t, m(8) - 0.5) * 0.9); place(p2t, 1440, 400, pop(t, m(8) - 0.1) * 0.9);
  };
});

// ---- 08 · Un cas client ----
SC("08", "UN CAS CLIENT", (g, A) => {
  const m = A.m, head = title(g, 190, "Un cas client"), anon = pill(g, 1240, 180, "ANONYME", { bg: C.face, size: 18 });
  const a = member(g, "client"), b = member(g, "conjoint");
  const montant = bloc(g, 560, 150, "387 000 €", "de prêt immobilier", { size: 64 });
  const duree = bloc(g, 330, 130, "21 ans", "et 8 mois (260 mois)", { size: 48 }), taux = bloc(g, 330, 130, "4,25 %", "taux du prêt", { size: 48 });
  const bouc = protege(g), lg = txt(g, 760, 960, "LES GARANTIES", 20, { weight: 800, ls: 5, fill: C.inkSoft });
  const G = [["DÉCÈS · PERTE TOTALE D'AUTONOMIE", 7], ["INCAPACITÉ DE TRAVAIL", 8], ["INVALIDITÉ", 9]].map(([s, k], i) => ({ p: pill(g, 0, 0, s, { bg: i ? C.paperDeep : C.accent, size: 20 }), a: m(k), y: 790 + i * 80 }));
  return t => {
    show(head, fade(t, m(1) - 0.5)); place(anon.g, anon.x, anon.y, pop(t, m(1)));
    a.at(t, m(2) - 0.4, 300, 900); b.at(t, m(2) - 0.2, 460, 900);
    place(montant, 1180, 380, pop(t, m(3) - 0.3));
    place(duree, 1000, 600, pop(t, m(4) - 0.3)); place(taux, 1360, 600, pop(t, m(5) - 0.3));
    place(bouc, 760, 850, pop(t, m(6) - 0.3)); lg.style.opacity = fade(t, m(6));
    G.forEach(o => place(o.p.g, 920 + o.p.w / 2, o.y, pop(t, o.a - 0.3)));
  };
});

// ---- 09 · Les économies ----
SC("09", "LES ÉCONOMIES", (g, A) => {
  const m = A.m, head = title(g, 190, "Ses économies");
  el("path", { ...D.line, "stroke-width": 6, d: "M300 840 L1280 840" }, g);
  const av = colonne(g, 520, 840, 280, C.inkSoft), ap = colonne(g, 1060, 840, 280, C.accent);
  const la = txt(g, 520, 890, "AVANT", 24, { weight: 800, ls: 6, fill: C.inkSoft }), lb = txt(g, 1060, 890, "APRÈS", 24, { weight: 800, ls: 6, fill: C.accent });
  const ma = pill(g, 520, 970, "≈ 99 € / MOIS", { bg: C.face, size: 22 }), mb = pill(g, 1060, 970, "59 € / MOIS", { bg: C.accent, size: 22 });
  const fl = arrow(g, 690, 360, 900, 520, m(3) - 0.3, m(3) + 0.3, { color: C.ink, bend: -40 });
  const delai = pill(g, 1560, 330, "CHANGEMENT EN ≈ 1 MOIS", { bg: C.face, size: 20 });
  const eco = card(g, 520, 200, { fill: C.ink }); txt(eco, 0, 0, "13 393 €", 76, { font: "Serif", weight: 700, fill: C.paper }); txt(eco, 0, 56, "d'économie au total", 24, { weight: 600, fill: C.accentSoft });
  const geq = ligne(g, "Garanties équivalentes", m(8), 0, true, 32);
  return t => {
    show(head, fade(t, m(1) - 0.5));
    av.set(440 * ease(prog(t, m(1) - 0.3, m(1) + 0.5)), "28 987 €"); la.style.opacity = fade(t, m(1) - 0.3);
    place(ma.g, ma.x, ma.y, pop(t, m(2) - 0.3)); fl.render(t);
    ap.set(237 * ease(prog(t, m(4) - 0.4, m(4) + 0.4)), "15 594 €"); lb.style.opacity = fade(t, m(4) - 0.4);
    place(mb.g, mb.x, mb.y, pop(t, m(5) - 0.3)); place(delai.g, delai.x, delai.y, pop(t, m(6) - 0.3));
    place(eco, 1560, 560, pop(t, m(7) - 0.3)); place(geq.r, 1390, 760, pop(t, m(8) - 0.3));
  };
});

// ---- 10 · Qu'est-ce qu'on fait de 13 393 euros ? ----
SC("10", "13 393 EUROS", (g, A) => {
  const m = A.m;
  const pile = el("g", {}, g); [-60, 0, 60].forEach((x, i) => { const s = stack(pile, 4 + i * 2, 34); s.setAttribute("transform", `translate(${x} 0)`); });
  const n = big(g, 960, 650, "13 393 €", 96);
  const dep = pill(g, 420, 330, "LES DÉPENSER", { bg: C.paperDeep, size: 24 });
  const cad = cadeau(g), lc = txt(g, 420, 700, "DES CADEAUX", 22, { weight: 800, ls: 4, fill: C.inkSoft });
  const av = avion(g), lv = txt(g, 1500, 450, "DES VACANCES", 22, { weight: 800, ls: 4, fill: C.inkSoft });
  const inv = pill(g, 960, 760, "OU LES INVESTIR", { bg: C.ink, fg: C.paper, size: 24 });
  const E = [["ÉPARGNE", 6, 420], ["ASSURANCE VIE", 7, 760], ["PEA", 7.3, 1080], ["COMPTE-TITRES", 7.6, 1400]].map(([s, k, x]) => ({ p: pill(g, x, 900, s, { bg: C.accentSoft, size: 22 }), k }));
  const gagne = el("g", {}, g); check(gagne); txt(gagne, 50, 12, "Gagnante dans tous les cas", 36, { anchor: "start", font: "Serif", weight: 600 });
  return t => {
    place(pile, 960, 470, pop(t, m(1) - 0.5) * 1.1); n.style.opacity = fade(t, m(1) - 0.3);
    place(dep.g, dep.x, dep.y, pop(t, m(2) - 0.3)); place(cad, 420, 580, pop(t, m(3) - 0.3)); lc.style.opacity = fade(t, m(3));
    place(av, 1500, 350, pop(t, m(4) - 0.3), -10); lv.style.opacity = fade(t, m(4));
    place(inv.g, inv.x, inv.y, pop(t, m(5) - 0.3));
    E.forEach(e => place(e.p.g, e.p.x, e.p.y, pop(t, m(Math.floor(e.k)) + (e.k % 1) * 2 - 0.3)));
    place(gagne, 1250, 600, pop(t, m(9) - 0.3) * 0.95);
  };
});

// ---- 11 · Et si tu as déjà changé ? ----
SC("11", "DÉJÀ CHANGÉ ?", (g, A) => {
  const m = A.m;
  const sep = el("path", { ...D.line, "stroke-width": 3, stroke: C.paperDeep, d: "M960 260 L960 1000" }, g);
  const cli = member(g, "client"), jam = pill(g, 520, 300, "JAMAIS CHANGÉ D'ASSURANCE ?", { bg: C.face, size: 22 });
  const est = bloc(g, 440, 130, "Une première estimation", "c'est le moment", { fill: C.ink });
  const deja = pill(g, 1440, 300, "DÉJÀ CHANGÉ ?", { bg: C.face, size: 22 }), tout = pill(g, 1440, 420, "LA LOI : À TOUT MOMENT", { bg: C.accent, size: 22 });
  const T = [["+10 €", 1220, 620], ["+15 €", 1440, 700], ["+20 €", 1660, 620]].map(([s, x, y], i) => ({ p: prix(g, s, i === 2 ? C.accent : C.paperDeep), x, y, i }));
  const pm = pill(g, 1440, 860, "PAR MOIS, C'EST PAS DÉCONNANT", { bg: C.face, size: 20 });
  return t => {
    sep.style.opacity = fade(t, A.s);
    cli.at(t, m(1) - 0.4, 300, 920); place(jam.g, jam.x, jam.y, pop(t, m(1) - 0.2));
    place(est, 620, 560, pop(t, m(2) - 0.3));
    place(deja.g, deja.x, deja.y, pop(t, m(3) - 0.3)); place(tout.g, tout.x, tout.y, pop(t, m(4) - 0.3));
    T.forEach(o => place(o.p, o.x, o.y, pop(t, m(5) - 0.4 + o.i * 0.35)));
    place(pm.g, pm.x, pm.y, pop(t, m(5) + 0.8));
  };
});
