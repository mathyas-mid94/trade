// Parties 12 à 16 : mieux couvert, points d'attention, les documents à envoyer, la suite, conclusion.

// ---- 12 · Mieux couvert, pas juste moins cher ----
SC("12", "MIEUX COUVERT", (g, A) => {
  const m = A.m, head = title(g, 190, "Mieux couvert, pas juste moins cher");
  const b1 = bloc(g, 480, 120, "Un prix plus bas", "", { fill: C.face }), b2 = bloc(g, 480, 120, "Des garanties supérieures", "", { fill: C.accent });
  const c1 = check(g), c2 = check(g);
  const R = [["Le délai de franchise", 4], ["Incapacité, invalidité", 5], ["La couverture dos", 6], ["La couverture psy", 7], ["Le mi-temps thérapeutique", 8], ["L'exonération des cotisations", 9]].map(([s, k], i) => {
    const r = el("g", {}, g); el("rect", { ...D.line, "stroke-width": 3, fill: i % 2 ? C.face : C.paperDeep, x: 0, y: -32, width: 780, height: 64, rx: 12 }, r);
    txt(r, 30, 11, s, 30, { anchor: "start", font: "Serif", weight: 600 }); const c = check(r); c.setAttribute("transform", "translate(735 0) scale(0.7)");
    return { r, a: m(k), y: 320 + i * 82 };
  });
  const relais = pill(g, 1350, 850, "TU NE PAIES PLUS, L'ASSURANCE PREND LE RELAIS", { bg: C.ink, fg: C.paper, size: 20 });
  const devis = bloc(g, 560, 120, "Plus de garanties", "= un devis parfois un peu plus élevé", { fill: C.face, size: 32 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(b1, 420, 400, pop(t, m(2) - 0.3)); place(c1, 650, 360, pop(t, m(2))); place(b2, 420, 560, pop(t, m(3) - 0.3)); place(c2, 650, 520, pop(t, m(3)));
    R.forEach(o => place(o.r, 960, o.y, pop(t, o.a - 0.3) * 0.98));
    place(relais.g, relais.x, relais.y, pop(t, m(10) - 0.3));
    place(devis, 420, 960, pop(t, m(11) - 0.3));
  };
});

// ---- 13 · Ce qu'il faut savoir ----
SC("13", "POINTS D'ATTENTION", (g, A) => {
  const m = A.m, head = title(g, 190, "Deux points d'attention");
  const dv = contrat(g, "LE DEVIS"), tampon = pill(g, 0, 0, "PROVISOIRE", { bg: C.face, fg: C.accent, size: 26, ls: 6 });
  const val = pill(g, 560, 860, "TANT QUE L'ASSUREUR N'A PAS VALIDÉ", { bg: C.paperDeep, size: 20 });
  const sante = el("g", {}, g); el("circle", { ...D.line, fill: C.face, r: 110 }, sante); heart(sante).setAttribute("transform", "translate(0 6) scale(1.1)");
  el("path", { fill: "none", stroke: C.paper, "stroke-width": 9, "stroke-linecap": "round", d: "M0 -40 L0 0 M-20 -20 L20 -20" }, sante);
  const ls = txt(g, 1360, 700, "SELON TA SITUATION, TA SANTÉ", 20, { weight: 800, ls: 4, fill: C.inkSoft });
  const excl = pill(g, 1360, 860, "DES EXCLUSIONS DE GARANTIE POSSIBLES", { bg: C.accent, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(dv.g, 560, 520, pop(t, m(2) - 0.4) * 1.5); place(tampon.g, 560, 560, pop(t, m(2) + 0.1) * 1, -12);
    place(val.g, val.x, val.y, pop(t, m(3) - 0.3));
    place(sante, 1360, 520, pop(t, m(4) - 0.4)); ls.style.opacity = fade(t, m(4));
    place(excl.g, excl.x, excl.y, pop(t, m(5) - 0.3));
  };
});

// ---- 14 · Ce que tu dois m'envoyer ----
SC("14", "CE QUE TU DOIS M'ENVOYER", (g, A) => {
  const m = A.m, head = title(g, 190, "Une seule chose à faire");
  const env = K.envelope(g, ""), mail = pill(g, 380, 620, "PAR MAIL", { bg: C.face, size: 20 }), wa = pill(g, 380, 700, "OU WHATSAPP", { bg: C.face, size: 20 });
  const deux = pill(g, 980, 300, "2 DOCUMENTS", { bg: C.accent, size: 24 });
  const offre = contrat(g, "OFFRE DE PRÊT"), sub = txt(g, 800, 720, "ton contrat de crédit", 24, { font: "Serif", weight: 600, fill: C.inkSoft });
  const tab = tableau(g), lt = txt(g, 1160, 700, "TABLEAU D'AMORTISSEMENT", 22, { weight: 800, ls: 3 }), date = pill(g, 1160, 770, "DATÉ", { bg: C.accent, size: 22 });
  const fl = arrow(g, 1310, 560, 1500, 640, m(8) - 0.4, m(8) + 0.2, { color: C.ink });
  const me = member(g, "mathyas"), dv = pill(g, 1640, 330, "TON DEVIS", { bg: C.paperDeep, size: 20 });
  const hl = horloge(g), h48 = pill(g, 1640, 520, "24 À 48 H", { bg: C.ink, fg: C.paper, size: 22 });
  const mil = bloc(g, 760, 120, "Des milliers d'euros d'économie ?", "", { fill: C.accent, size: 38 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(env.g, 380, 470, pop(t, m(2) - 0.4) * 0.38); place(mail.g, mail.x, mail.y, pop(t, m(2) - 0.2)); place(wa.g, wa.x, wa.y, pop(t, m(2) + 0.2));
    place(deux.g, deux.x, deux.y, pop(t, m(3) - 0.3));
    place(offre.g, 800, 500, pop(t, m(4) - 0.3) * 1.3); sub.style.opacity = fade(t, m(5) - 0.3);
    place(tab.g, 1160, 470, pop(t, m(6) - 0.3)); lt.style.opacity = fade(t, m(6));
    const kd = prog(t, m(7) - 0.4, m(7) + 0.3); tab.dates.setAttribute("fill", kd > 0.5 ? C.accent : C.accentSoft);
    place(date.g, date.x, date.y, pop(t, m(7) - 0.3));
    fl.render(t); me.at(t, m(8) - 0.6, 1640, 960, { armR: t > m(8) ? 40 : 75 }); place(dv.g, dv.x, dv.y, pop(t, m(8)));
    place(hl.g, 1640, 420, pop(t, m(9) - 0.5) * out(t, m(10) + 1.5) * 0.8); hl.set(ease(prog(t, m(9) - 0.3, m(9) + 1.2)));
    place(h48.g, h48.x, h48.y, pop(t, m(9) - 0.2));
    place(mil, 900, 960, pop(t, m(10) - 0.3));
  };
});

// ---- 15 · Et après ? ----
SC("15", "ET APRÈS ?", (g, A) => {
  const m = A.m, head = title(g, 190, "Et après ?");
  const env = K.envelope(g, ""), le = txt(g, 420, 680, "LE DEVIS COMPLET", 22, { weight: 800, ls: 4 });
  const adr = pill(g, 420, 760, "noreply@utwin.fr", { bg: C.accentSoft, size: 24, ls: 1 });
  const ec = ecran(g), lec = txt(g, 960, 680, "LE PARCOURS EN LIGNE", 22, { weight: 800, ls: 4 });
  const verif = ligne(g, "Tu vérifies tes infos", m(4), 0, true, 30);
  const sig = contrat(g, ""), ok = check(g), lsig = txt(g, 1500, 680, "TU VALIDES", 22, { weight: 800, ls: 4 });
  const F = [arrow(g, 590, 520, 800, 520, m(3) - 0.5, m(3) - 0.1, { color: C.ink, w: 6 }), arrow(g, 1120, 520, 1340, 520, m(5) - 0.5, m(5) - 0.1, { color: C.ink, w: 6 })];
  const cli = member(g, "client"), rien = pill(g, 560, 420, "TU N'AS RIEN À FAIRE", { bg: C.face, size: 24 });
  const me = member(g, "mathyas"), eq = [0, 1].map(i => person(g, { vest: [C.accent, C.paperDeep][i] }));
  const equipe = pill(g, 1360, 420, "MON ÉQUIPE S'OCCUPE DE TOUT", { bg: C.accent, size: 24 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const p1 = out(t, m(6) - 0.6);
    place(env.g, 420, 560, pop(t, m(1) - 0.3) * 0.36 * p1); le.style.opacity = fade(t, m(1)) * p1;
    place(adr.g, adr.x, adr.y, pop(t, m(2) - 0.3) * p1);
    place(ec, 960, 520, pop(t, m(3) - 0.3) * p1); lec.style.opacity = fade(t, m(3)) * p1;
    place(verif.r, 800, 770, pop(t, m(4) - 0.3) * p1);
    place(sig.g, 1500, 510, pop(t, m(5) - 0.4) * p1); place(ok, 1560, 570, pop(t, m(5)) * 1.2 * p1); lsig.style.opacity = fade(t, m(5)) * p1;
    F.forEach(f => { f.render(t); f.p.style.opacity *= p1; f.head.style.opacity *= p1; });
    cli.at(t, m(6) - 0.3, 560, 940, { armL: 160, armR: 20 }); place(rien.g, rien.x, rien.y, pop(t, m(6)));
    me.at(t, m(7) - 0.6, 1360, 940, { armR: 40 }); eq.forEach((p, i) => stand(p, t, m(7) - 0.4 + i * 0.15, 1200 + i * 320, 940, 0.9));
    place(equipe.g, equipe.x, equipe.y, pop(t, m(7) - 0.2));
  };
});

// ---- 16 · Conclusion ----
SC("16", "CONCLUSION", (g, A) => {
  const m = A.m;
  const me = member(g, "mathyas"), go = pill(g, 380, 380, "LANCE-TOI !", { bg: C.accent, size: 28 });
  const docs = pill(g, 380, 460, "ENVOIE-MOI TES DOCUMENTS", { bg: C.face, size: 20 });
  const parle = pill(g, 1200, 260, "PARLES-EN AUTOUR DE TOI", { bg: C.ink, fg: C.paper, size: 26 });
  const P = [["TON VOISIN", C.inkSoft], ["TA TANTE", C.accent, "f"], ["TA COUSINE", C.accentSoft, "f"], ["TON FRÈRE", C.paperDeep], ["TA SŒUR", C.inkSoft, "f"]].map(([s, v, h], i) => ({
    guy: person(g, { vest: v, hair: h }), lab: txt(g, 0, 0, s, 18, { weight: 800, ls: 3, fill: C.inkSoft }), sh: protege(g), x: 820 + i * 200, i }));
  const fin = big(g, 1220, 1010, "On se voit dans une prochaine vidéo", 44);
  return t => {
    me.at(t, m(1) - 0.6, 380, 940, { armR: t > m(1) ? -30 : 75 }); place(go.g, go.x, go.y, pop(t, m(1) - 0.3)); place(docs.g, docs.x, docs.y, pop(t, m(1) + 0.4));
    place(parle.g, parle.x, parle.y, pop(t, m(2) - 0.3));
    P.forEach(o => { const a = m(3) - 0.6 + o.i * 0.35; stand(o.guy, t, a, o.x, 880, 0.8);
      o.lab.setAttribute("x", o.x); o.lab.setAttribute("y", 925); o.lab.style.opacity = fade(t, a);
      place(o.sh, o.x, 480, pop(t, m(4) - 0.4 + o.i * 0.12) * 0.7); });
    fin.style.opacity = fade(t, m(5) - 1.8);
  };
});
