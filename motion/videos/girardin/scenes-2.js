// Parties 08 à 14 : retour fiscal, plus que la mise, exemple 3 500 €, projets éligibles, one shot, contrôle, assurance.

// ---- 08 · Le retour fiscal ----
SC("08", "LE RETOUR FISCAL", (g, A) => {
  const m = A.m, head = title(g, 190, "Le retour fiscal, contrôlé par l'État");
  const inv = member(g, "mathyas", false);
  const red = card(g, 520, 150, { fill: C.accentSoft }); txt(red, 0, 14, "Réduction d'impôt", 44, { font: "Serif", weight: 700 });
  const bon = card(g, 520, 120, { fill: C.accent }); txt(bon, 0, 14, "+ une bonification", 40, { font: "Serif", weight: 700 });
  const etat = bank(g, "ÉTAT", 260); const loupe = D.magnifier(g, 70);
  const c1 = ligne(g, "Les équipements sont bien utilisés", m(5), 700), c2 = ligne(g, "La société de portage respecte les règles", m(6), 790);
  return t => {
    show(head, fade(t, m(1) - 0.5));
    inv.at(t, m(1) - 0.5, 260, 900, { armL: t > m(2) ? 150 : 105 });
    place(red, 640, 450, pop(t, m(2) - 0.3)); place(bon, 640, 610, pop(t, m(3) - 0.3));
    place(etat, 1400, 440, pop(t, m(4) - 0.3) * 0.85); place(loupe.g, 1560 + 40 * Math.sin(t * 1.5), 600, pop(t, m(4)) * 0.8);
    place(c1.r, 1040, c1.y + 60, pop(t, c1.a - 0.3)); place(c2.r, 1040, c2.y + 60, pop(t, c2.a - 0.3));
  };
});

// ---- 09 · Plus que ce que tu as mis ----
SC("09", "PLUS QUE TA MISE", (g, A) => {
  const m = A.m;
  const quote = big(g, 960, 470, "Une réduction d'impôt plus importante", 58), quote2 = big(g, 960, 550, "que la somme engagée.", 58, C.accent);
  const only = pill(g, 960, 350, "LE SEUL TEXTE DE LOI QUI LE PERMET", { bg: C.ink, fg: C.paper, size: 24 });
  const mx = member(g, "monsieur");
  el("path", { ...D.line, "stroke-width": 6, d: "M520 880 L1640 880" }, g);
  const c1 = colonne(g, 700, 880, 260), c2 = colonne(g, 1200, 880, 260), cB = colonne(g, 1200, 500, 260, C.accent);
  const l1 = txt(g, 700, 930, "investis (année N)", 24, { weight: 600, fill: C.inkSoft }), l2 = txt(g, 1200, 930, "réduction (année N+1)", 24, { weight: 600, fill: C.inkSoft });
  const tot = card(g, 340, 170, { fill: C.accent }); txt(tot, 0, 4, "11 700 €", 64, { font: "Serif", weight: 700 }); txt(tot, 0, 52, "d'impôt en moins", 22, { weight: 700 });
  const reste = pill(g, 1560, 760, "RESTE À PAYER : 300 €", { bg: C.face, size: 20 }), r17 = pill(g, 1560, 840, "RENTABILITÉ : 17 %", { bg: C.ink, fg: C.paper, size: 24 });
  const imp = big(g, 380, 330, "12 000 € d'impôts", 40);
  return t => {
    const p1 = out(t, m(3) - 0.6);
    place(only.g, only.x, only.y, pop(t, m(1)) * p1); show(quote, fade(t, m(2) - 0.6) * p1); show(quote2, fade(t, m(2) - 0.2) * p1);
    mx.at(t, m(3) - 0.4, 300, 900); show(imp, fade(t, m(3)));
    c1.set(380 * ease(prog(t, m(4) - 0.4, m(4) + 0.3)), "10 000 €"); l1.style.opacity = fade(t, m(4));
    const h2 = 380 * ease(prog(t, m(5) - 0.4, m(5) + 0.3)), hb = 65 * ease(prog(t, m(6) - 0.3, m(6) + 0.3));
    c2.set(h2, "10 000 €"); l2.style.opacity = fade(t, m(5));
    cB.set(hb, hb > 50 ? "+ 1 700 €" : ""); // la bonification se pose sur la colonne des 10 000 €
    place(tot, 1560, 520, pop(t, m(7) - 0.3)); place(reste.g, reste.x, reste.y, pop(t, m(8) - 0.2)); place(r17.g, r17.x, r17.y, pop(t, m(9) - 0.2));
  };
});

// ---- 10 · Revenons à nos 3 500 euros ----
SC("10", "NOTRE EXEMPLE : 3 500 €", (g, A) => {
  const m = A.m, head = title(g, 190, "Exemple de levier fiscal");
  const C1 = card(g, 520, 260, { fill: C.ink }); txt(C1, 0, -70, "J'apporte", 40, { font: "Serif", weight: 700, fill: C.paper }); txt(C1, 0, 20, "2 500 €", 72, { font: "Serif", weight: 700, fill: C.paper }); txt(C1, 0, 80, "cette année (N)", 24, { weight: 500, fill: C.accentSoft });
  const C2 = card(g, 520, 260); txt(C2, 0, -70, "Je génère", 40, { font: "Serif", weight: 700 }); txt(C2, 0, 20, "2 925 €", 72, { font: "Serif", weight: 700 }); txt(C2, 0, 80, "d'économie d'impôt (N+1)", 24, { weight: 500, fill: C.inkSoft });
  const C3 = card(g, 1100, 230, { fill: C.ink }); txt(C3, -260, -40, "Je gagne", 36, { font: "Serif", weight: 700, fill: C.paper }); txt(C3, -260, 40, "425 €", 72, { font: "Serif", weight: 700, fill: C.accent });
  txt(C3, 260, -40, "Rendement", 36, { font: "Serif", weight: 700, fill: C.paper }); txt(C3, 260, 40, "17 %", 72, { font: "Serif", weight: 700, fill: C.accent });
  const imp = pill(g, 300, 330, "TU PAIES 3 500 €", { bg: C.face, size: 22 });
  const ile_ = ile(g, 260, 160, 3, "MARTINIQUE"); const pm = palmier(g, 0.6);
  const decomp = pill(g, 1240, 330, "= 2 500 € + 425 € DE BONIFICATION", { bg: C.accent, size: 22 });
  const poche = pill(g, 960, 1010, "425 € QUE L'ÉTAT PREND EN CHARGE · ILS RESTENT CHEZ TOI", { bg: C.face, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); place(imp.g, imp.x, imp.y, pop(t, m(2) - 0.2));
    place(C1, 560, 520, pop(t, m(3) - 0.3)); place(ile_.g, 300, 820, pop(t, m(4) - 0.3) * out(t, m(8) - 0.5)); place(pm, 330, 760, pop(t, m(4)) * out(t, m(8) - 0.5));
    place(C2, 1240, 520, pop(t, m(6) - 0.3)); place(decomp.g, decomp.x, decomp.y, pop(t, m(8) - 0.3));
    place(C3, 960, 830, pop(t, m(8) - 0.2)); if (t < m(5)) place(C3, 960, 830, 0);
    place(poche.g, poche.x, poche.y, pop(t, m(9) - 0.2));
  };
});

// ---- 11 · Quels projets ? ----
SC("11", "LES PROJETS ÉLIGIBLES", (g, A) => {
  const m = A.m, head = title(g, 190, "Des projets productifs, sélectionnés");
  const elig = pill(g, 960, 290, "ENTREPRISES ÉLIGIBLES UNIQUEMENT", { bg: C.ink, fg: C.paper, size: 22 });
  const burger = el("g", {}, g); el("path", { ...D.line, fill: C.accent, d: "M-60 -10 Q-60 -60 0 -60 Q60 -60 60 -10 Z" }, burger); el("rect", { ...D.line, fill: C.inkSoft, x: -64, y: -8, width: 128, height: 20, rx: 8 }, burger); el("path", { ...D.line, fill: C.accent, d: "M-60 14 L60 14 Q60 40 0 40 Q-60 40 -60 14 Z" }, burger);
  const no = check(g, false); const mc = txt(g, 960, 640, "le fast-food de Fort-de-France", 30, { font: "Serif", weight: 600, fill: C.inkSoft });
  const T = [["usine", "BÂTIMENTS INDUSTRIELS", 4], ["engrenage", "ÉQUIPEMENTS INDUSTRIELS", 5], ["camion", "MATÉRIEL ROULANT", 6], ["solaire", "TRANSITION ÉNERGÉTIQUE", 7],
    ["cuve", "STOCKAGE, INFRASTRUCTURES", 8], ["conteneur", "LOGISTIQUE ET FRET", 9], ["fruit", "AGROTRANSFORMATION", 10], ["ecran", "NUMÉRIQUE, INNOVATION", 11]].map(([k, l, mk], i) => {
    const c = card(g, 380, 250); const ic = el("g", { transform: "translate(0 -30)" }, c); ({ usine, engrenage, camion, solaire, cuve, conteneur, fruit, ecran })[k](ic, k === "usine" ? 0.8 : 0.7);
    txt(c, 0, 100, l, 18, { weight: 800, ls: 3 }); return { c, a: m(mk), x: 300 + (i % 4) * 440, y: 460 + Math.floor(i / 4) * 290 };
  });
  const sel = pill(g, 960, 1030, "SÉLECTION TRÈS POINTUE · OPÉRATEURS INSTALLÉS SUR PLACE", { bg: C.accent, size: 20 });
  const fr = pill(g, 960, 1030, "QUAND L'OUTRE-MER VA BIEN, LA FRANCE VA BIEN", { bg: C.ink, fg: C.paper, size: 22 });
  return t => {
    const p1 = out(t, m(4) - 0.6);
    show(head, fade(t, m(1) - 0.5)); place(elig.g, elig.x, elig.y, pop(t, m(1)) * p1);
    place(burger, 960, 520, pop(t, m(2) - 0.3) * p1 * 1.3); place(no, 1060, 450, pop(t, m(2) + 0.2) * p1); mc.style.opacity = fade(t, m(2)) * p1;
    T.forEach(o => place(o.c, o.x, o.y, pop(t, o.a - 0.3)));
    place(sel.g, sel.x, sel.y, pop(t, m(12) - 0.2) * out(t, m(14) - 0.4)); place(fr.g, fr.x, fr.y, pop(t, m(14) - 0.3));
  };
});

// ---- 12 · Une réduction « one shot » ----
SC("12", "UNE RÉDUCTION « ONE SHOT »", (g, A) => {
  const m = A.m, head = title(g, 190, "Une réduction d'impôt « one shot »");
  const lk = padlock(g); const no = check(g, false);
  el("path", { ...D.line, stroke: C.ink, "stroke-width": 10, d: "M200 560 L1720 560" }, g);
  const N = el("g", {}, g); el("circle", { ...D.line, fill: C.ink, r: 54 }, N); txt(N, 0, 14, "N", 40, { font: "Serif", weight: 700, fill: C.paper });
  const N1 = el("g", {}, g); el("circle", { ...D.line, fill: C.ink, r: 54 }, N1); txt(N1, 0, 14, "N+1", 36, { font: "Serif", weight: 700, fill: C.paper });
  const steps = [["Souscription", "janvier, par exemple", 520, 3], ["Déclaration", "au printemps", 1180, 5], ["Réduction", "dès l'été", 1600, 6]].map(([a, b, x, k]) => {
    const w = el("g", {}, g); el("path", { ...D.line, fill: C.accent, d: `M${x - 30} 680 L${x} 630 L${x + 30} 680 Z` }, w);
    txt(w, x, 730, a, 34, { font: "Serif", weight: 700 }); txt(w, x, 770, b, 22, { weight: 500, fill: C.inkSoft }); return { w, a: m(k) };
  });
  const cal = calendar(g, "JAN");
  const fin = pill(g, 960, 880, "AU BOUT D'UN AN : TERMINÉ · ON RECOMMENCE L'ANNÉE SUIVANTE", { bg: C.ink, fg: C.paper, size: 20 });
  const sout = pill(g, 960, 970, "SOUTENABLE DANS LE TEMPS · LES BONIFICATIONS S'ACCUMULENT", { bg: C.accent, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(lk.g, 1600, 330, pop(t, m(2) - 0.3) * out(t, m(3)) * 0.8); lk.open(0); place(no, 1670, 290, pop(t, m(2)) * out(t, m(3)));
    place(N, 300, 560, pop(t, m(3) - 0.4)); place(N1, 860, 560, pop(t, m(5) - 0.6));
    steps.forEach(s => s.w.style.opacity = fade(t, s.a - 0.3));
    place(cal.g, 520, 420, pop(t, m(4) - 0.2) * 0.8);
    place(fin.g, fin.x, fin.y, pop(t, m(7) - 0.3)); place(sout.g, sout.x, sout.y, pop(t, m(9) - 0.3));
  };
});

// ---- 13 · Le contrôle de l'État ----
SC("13", "LE CONTRÔLE DE L'ÉTAT", (g, A) => {
  const m = A.m, head = title(g, 190, "L'État contrôle pendant 5 ans");
  const etat = bank(g, "ÉTAT", 260); const loupe = D.magnifier(g, 80);
  const years = [1, 2, 3, 4, 5].map(i => { const w = el("g", {}, g); el("rect", { ...D.line, fill: C.face, x: -80, y: -40, width: 160, height: 80, rx: 12 }, w); txt(w, 0, 12, "Année " + i, 28, { font: "Serif", weight: 700 }); return { w, x: 560 + (i - 1) * 200 }; });
  const prog5 = el("rect", { fill: C.accent, x: 480, y: 600, height: 12, rx: 6 }, g);
  const ch = [ligne(g, "Les équipements ne sont pas revendus", m(4), 720), ligne(g, "La société de portage respecte les règles", m(5), 800)];
  const ok = pill(g, 1400, 720, "TOUT EST EN ORDRE : VALIDÉ", { bg: C.accent, size: 22 });
  const risk = card(g, 1300, 140, { fill: C.ink }); txt(risk, 0, -6, "Si quelqu'un a triché : risque de reprise fiscale", 36, { font: "Serif", weight: 700, fill: C.paper });
  txt(risk, 0, 40, "l'avantage peut être remis en cause, jusqu'aux investisseurs", 22, { weight: 500, fill: C.accentSoft });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(etat, 260, 520, pop(t, m(1) - 0.3) * 0.75); place(loupe.g, 260 + 30 * Math.sin(t * 2), 760, pop(t, m(3) - 0.3) * 0.7);
    years.forEach((y, i) => place(y.w, y.x, 520, pop(t, m(2) - 0.4 + i * 0.15)));
    const k = ease(prog(t, m(2), m(6))); prog5.setAttribute("width", 1000 * k); prog5.style.opacity = k > 0 ? 1 : 0;
    ch.forEach(c => place(c.r, 520, c.y, pop(t, c.a - 0.3) * out(t, m(7) - 0.4)));
    place(ok.g, ok.x, ok.y, pop(t, m(6) - 0.3) * out(t, m(7) - 0.4));
    place(risk, 960, 820, pop(t, m(7) - 0.2));
  };
});

// ---- 14 · Une assurance pour te protéger ----
SC("14", "UNE ASSURANCE POUR TE PROTÉGER", (g, A) => {
  const m = A.m, head = title(g, 190, "Un risque qui se maîtrise");
  const sh = el("g", {}, g); shield(sh); const ok = check(g, true);
  const lettre = el("g", {}, g); envelope(lettre, "").g.setAttribute("transform", "scale(0.35)");
  const flow = [["L'État te demande de rembourser", 3], ["La société de gestion prend le relais", 4], ["L'assurance prend tout en charge", 5]].map(([s, k], i) => ({ p: pill(g, 0, 0, s.toUpperCase(), { bg: i === 2 ? C.accent : C.face, size: 20 }), a: m(k), y: 420 + i * 130 }));
  const arrs = [0, 1].map(i => arrow(g, 1160, 460 + i * 130, 1160, 500 + i * 130, m(4 + i) - 0.3, m(4 + i), { w: 5 }));
  const tout = pill(g, 1160, 830, "RÉDUCTION + BONIFICATION", { bg: C.ink, fg: C.paper, size: 22 });
  const free = card(g, 700, 120, { fill: C.accentSoft }); txt(free, 0, 14, "Gratuite pour toi : comprise dans le dossier", 32, { font: "Serif", weight: 700 });
  const mine = pill(g, 400, 330, "CHEZ MES PARTENAIRES", { bg: C.face, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(sh, 400, 560, pop(t, m(1) - 0.2) * 1.8); place(ok, 470, 480, pop(t, m(8) - 0.3) * 1.2); place(mine.g, mine.x, mine.y, pop(t, m(2) - 0.2));
    flow.forEach(f => place(f.p.g, 1160, f.y, pop(t, f.a - 0.3))); arrs.forEach(a => a.render(t));
    place(lettre, 1500, 420, pop(t, m(3)) * out(t, m(4) + 0.5));
    place(tout.g, tout.x, tout.y, pop(t, m(5) + 0.6));
    place(free, 960, 990, pop(t, m(6) - 0.3));
  };
});
