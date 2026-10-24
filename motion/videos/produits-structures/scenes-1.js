// Parties 00 à 07 : introduction, briques classiques, obligation classique et zéro-coupon, dérivés, option, le pont.
// A.m(k) = instant du repère [k] de la partie (SCRIPT.md) ; A.s / A.e = début / fin de la partie.

// ---- 00 · Introduction ----
SC("00", "INTRODUCTION", (g, A) => {
  const m = A.m;
  const box = el("g", {}, g); D.icons.structure(box);
  const titre = big(g, 960, 300, "Les produits structurés", 76);
  const peur = pl(g, 560, 820, "UN NOM QUI FAIT UN PEU PEUR…", { size: 20 }), intel = pl(g, 1360, 820, "… UN DES OUTILS LES PLUS INTELLIGENTS", { bg: C.accent, size: 20 });
  const cli = marcheur(g, { vest: C.accent, hair: "f" });
  const ans = pl(g, 960, 300, "CE QUE LA FINANCE MET DES ANNÉES À EXPLIQUER", { bg: C.accentSoft, size: 20 });
  const B = [["Tes placements", 7], ["L'obligation", 8], ["L'option", 9]].map(([s, k], i) => ({ c: bloc(g, 330, 90, s, "", { fill: i === 2 ? C.accent : C.face, size: 34 }), k, i }));
  const ok = check(g), mesure = pl(g, 960, 960, "UN PRODUIT SUR MESURE", { bg: C.ink, fg: C.paper, size: 24 });
  return t => {
    const p1 = out(t, m(4) - 0.5);
    show(titre, fade(t, m(1) - 0.4) * p1); const sh = t > m(2) && t < m(3) ? Math.sin(t * 40) * 4 : 0;
    place(box, 960 + sh, 560, pop(t, m(1) - 0.2) * 2.4 * (t < m(4) ? 1 : 0), 0);
    box.firstElementChild.lastElementChild.setAttribute("transform", `translate(0 ${-18 * fade(t, m(3) - 0.2)})`);
    on(peur, pop(t, m(2) - 0.3) * p1); on(intel, pop(t, m(3) - 0.3) * p1);
    cli.at(t, [[m(2) - 0.4, 200, 960], [m(3), 320, 960], [m(5), 320, 960], [m(6) + 1, 560, 960]], { armR: t > m(3) && t < m(4) ? -30 : undefined, k: 1 });
    on(ans, pop(t, m(5) - 0.3));
    // les briques tombent et s'empilent
    B.forEach(b => { const k = ease(prog(t, m(b.k) - 0.3, m(b.k) + 0.3)); place(b.c, 1180, lerp(200, 820 - b.i * 110, k) * (k > 0 ? 1 : 0), k > 0 ? 1 : 0); });
    const kb = ease(prog(t, m(10) - 0.4, m(10) + 0.4)); place(box, 1180, lerp(0, 520, kb), t > m(10) - 0.4 ? 1.6 * kb : 0);
    place(ok, 1340, 420, pop(t, m(11) - 0.2)); on(mesure, pop(t, m(11) - 0.3));
  };
});

// ---- 01 · Les briques classiques ----
SC("01", "LES BRIQUES CLASSIQUES", (g, A) => {
  const m = A.m, head = title(g, 190, "Le terrain que tu connais");
  const C4 = [["coins", "Actions", "un bout d'entreprise", 2], ["contract", "Obligations", "tu prêtes, on te paie", 3], ["house", "Immobilier", "des loyers", 4], ["bourse", "Non coté", "des sociétés hors Bourse", 5]]
    .map(([k, a, b, mk], i) => ({ w: badge(g, k, a.toUpperCase(), b, 90), x: 330 + i * 420, k: mk }));
  const ch = []; for (let i = 0; i <= 40; i++) { const x = i / 40; ch.push([x, 0.45 + 0.28 * Math.sin(x * 9) * (0.6 + x) - 0.1 * x]); }
  const c = K.chart(g, 1100, 300, ch, { color: C.ink, sw: 6 }); c.g.setAttribute("transform", "translate(960 760)"); draw(c.line, m(7) - 0.3, m(8) + 0.5);
  const dot = el("circle", { ...D.line, fill: C.accent, r: 16 }, g);
  const S = [pl(g, 760, 980, "SANS CONDITION", { bg: C.paperDeep, size: 22 }), pl(g, 1160, 980, "SANS FILET", { bg: C.ink, fg: C.paper, size: 22 })];
  return t => {
    show(head, fade(t, m(1) - 0.5));
    C4.forEach(c4 => place(c4.w, c4.x, 400 + 8 * Math.sin(t * 3 + c4.x), pop(t, m(c4.k) - 0.3)));
    c.g.style.opacity = fade(t, m(6) - 0.3);
    const kd = prog(t, m(7), m(8) + 0.5), p = ch[Math.min(40, Math.floor(kd * 40))], [px, py] = c.P(p); dot.setAttribute("cx", 960 + px); dot.setAttribute("cy", 760 + py); dot.style.opacity = kd > 0 ? 1 : 0;
    on(S[0], pop(t, m(9) - 0.3)); on(S[1], pop(t, m(10) - 0.3));
  };
});

// ---- 02 · L'obligation classique ----
SC("02", "L'OBLIGATION CLASSIQUE", (g, A) => {
  const m = A.m, head = title(g, 190, "L'obligation : un prêt qu'on te rembourse");
  const toi = marcheur(g, { vest: C.accent, hair: "f" }), bq = bank(g, "ÉMETTEUR", 240);
  const billet = card(g, 120, 70, { fill: C.accent }); txt(billet, 0, 12, "100 €", 30, { font: "Serif", weight: 700 });
  const coupons = [0, 1, 2, 3].map(() => coin(g, 26)), rend = card(g, 120, 70, { fill: C.accent }); txt(rend, 0, 12, "100 €", 30, { font: "Serif", weight: 700 });
  const ax = el("path", { ...D.line, "stroke-width": 4, d: "M300 900 L1620 900" }, g), ans = [1, 2, 3, 4, 5].map(i => txt(g, 300 + i * 264, 950, "an " + i, 22, { weight: 700, fill: C.inkSoft }));
  const loyer = pl(g, 960, 300, "UN COUPON CHAQUE ANNÉE, COMME UN LOYER", { bg: C.accentSoft, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    toi.at(t, [[m(1), 300, 760], [m(3) - 0.3, 420, 760]], {}); place(bq, 1600, 640, pop(t, m(2) - 0.3) * 0.75);
    const kb = ease(prog(t, m(3) - 0.2, m(3) + 0.8)); place(billet, lerp(480, 1460, kb), 560 - Math.sin(Math.PI * kb) * 120, kb > 0 && kb < 1 ? 1 : 0);
    ax.style.opacity = fade(t, m(4) - 0.6); ans.forEach((a, i) => a.style.opacity = fade(t, m(4) - 0.6 + i * 0.1));
    coupons.forEach((c, i) => { const k = ease(prog(t, m(4) + i * 0.45, m(4) + i * 0.45 + 0.7)); place(c, lerp(1460, 564 + i * 264, k), lerp(600, 860, k) - Math.sin(Math.PI * k) * 100, k > 0 ? 1 : 0); });
    on(loyer, pop(t, m(5) - 0.3));
    const kr = ease(prog(t, m(6) - 0.3, m(6) + 0.7)); place(rend, lerp(1460, 1620, kr), lerp(600, 830, kr), kr > 0 ? 1 : 0);
  };
});

// ---- 03 · L'obligation zéro-coupon ----
SC("03", "L'OBLIGATION ZÉRO-COUPON", (g, A) => {
  const m = A.m, head = title(g, 190, "L'obligation zéro-coupon");
  el("path", { ...D.line, "stroke-width": 4, d: "M300 820 L1620 820" }, g);
  const rien = pl(g, 960, 760, "RIEN PENDANT TOUTE LA DURÉE", { size: 20 });
  const c80 = colonne(g, 420, 820, 200, C.accent), c100 = colonne(g, 1500, 820, 200, C.ink);
  const ecart = el("path", { ...D.line, stroke: C.accent, "stroke-width": 5, "stroke-dasharray": "10 8", d: "M520 500 L1400 420" }, g); const le = pl(g, 960, 400, "TON INTÉRÊT : L'ÉCART", { bg: C.accent, size: 22 });
  const cle = pl(g, 960, 300, "LA CLÉ DU PRODUIT STRUCTURÉ", { bg: C.ink, fg: C.paper, size: 24 });
  const pile80 = stack(g, 8, 32), pile20 = stack(g, 2, 32), tk = ticket(g), l20 = pl(g, 1400, 940, "LES 20 € RESTANTS", { size: 18 });
  const cinq = pl(g, 960, 520, "80 € AUJOURD'HUI → 100 € DANS 5 ANS, CERTAIN", { bg: C.accentSoft, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); const p1 = out(t, m(7) - 0.5);
    on(rien, pop(t, m(2) - 0.3) * p1);
    c80.set(320 * ease(prog(t, m(4) - 0.3, m(4) + 0.4)) * p1, "80 €"); c100.set(400 * ease(prog(t, m(5) - 0.3, m(5) + 0.4)) * p1, "100 €");
    ecart.style.opacity = fade(t, m(6) - 0.3) * p1; on(le, pop(t, m(6)) * p1);
    on(cle, pop(t, m(7) - 0.3));
    place(pile80, 700, 780, pop(t, m(8) - 0.3) * 1.2); on(cinq, pop(t, m(9) - 0.3));
    const k20 = ease(prog(t, m(10) - 0.2, m(10) + 0.6)); place(pile20, lerp(760, 1200, k20), 800 - Math.sin(Math.PI * k20) * 140, pop(t, m(10) - 0.4) * 1.2 * out(t, m(12) - 0.2));
    on(l20, pop(t, m(10)));
    place(tk, 1400, 760, pop(t, m(12) - 0.3), 6 * Math.sin(t * 4));
  };
});

// ---- 04 · L'univers des dérivés ----
SC("04", "L'UNIVERS DES DÉRIVÉS", (g, A) => {
  const m = A.m;
  const etage = el("g", {}, g); el("path", { ...D.line, "stroke-width": 6, d: "M200 640 L1720 640" }, etage);
  const up = arrow(g, 200, 900, 200, 680, m(1) - 0.3, m(1) + 0.3, { color: C.accent }), cx = pl(g, 960, 230, "UN UNIVERS COMPLEXE", { bg: C.paperDeep, size: 22 });
  const sj = bloc(g, 440, 120, "L'actif sous-jacent", "un indice, une action, un panier", { size: 34 }), ix = K.chart(g, 340, 150, [[0, 0.3], [0.3, 0.5], [0.6, 0.4], [1, 0.8]], { color: C.ink, sw: 5 });
  const dv = bloc(g, 440, 120, "Le produit dérivé", "un contrat posé dessus", { fill: C.accent, size: 34 }), zero = pl(g, 960, 300, "TOUT SEUL, IL NE VAUT RIEN", { size: 18 });
  const mais = K.house(g, 1.3), bouc = protege(g, 1.4), toit = el("path", { ...D.line, fill: C.accent, d: "M-62 0 L0 -58 L62 0 Z" }, g);
  const club = el("g", {}, g); const lk = K.padlock(club); bloc(club, 420, 110, "Un club fermé", "institutionnels, très gros patrimoines", { fill: C.ink, size: 34 }).setAttribute("transform", "translate(0 110)");
  return t => {
    up.render(t); etage.style.opacity = fade(t, m(1) - 0.4);
    on(cx, pop(t, m(3) - 0.3) * out(t, m(9) - 0.4));
    place(sj, 560, 800, pop(t, m(4) - 0.3) * out(t, m(9) - 0.4)); ix.g.setAttribute("transform", "translate(560 960)"); ix.g.style.opacity = fade(t, m(5) - 0.3) * out(t, m(9) - 0.4);
    place(dv, 560 + 0 * t, 520 - 6 * Math.sin(t * 3), pop(t, m(6) - 0.3) * out(t, m(9) - 0.4)); on(zero, pop(t, m(8) - 0.3) * out(t, m(9) - 0.4));
    const kh = t > m(9) - 0.4 ? 1 : 0; place(mais, 1200, 860, pop(t, m(9) - 0.3) * 1.3 * kh); place(bouc, 1000, 760, pop(t, m(10) - 0.3) * kh);
    const kt = ease(prog(t, m(11) - 0.3, m(11) + 0.8)); toit.setAttribute("transform", `translate(${1200 + 160 * kt} ${780 - 260 * kt}) rotate(${50 * kt}) scale(1.3)`); toit.style.opacity = kt > 0 && kt < 1 ? 1 : 0;
    place(club, 1500, 300, pop(t, m(12) - 0.3)); lk.open(0);
  };
});

// ---- 05 · L'option, le droit sans l'obligation ----
SC("05", "L'OPTION", (g, A) => {
  const m = A.m, head = title(g, 190, "L'option : le droit, sans l'obligation");
  const tk = ticket(g, "OPTION"), gen = pl(g, 960, 300, "FRANCHEMENT, C'EST GÉNIAL", { bg: C.accent, size: 22 });
  const prime = pl(g, 480, 560, "LA PRIME", { bg: C.accentSoft, size: 22 }), pc = coin(g, 30), fx = pl(g, 480, 640, "UN PRIX FIXÉ À L'AVANCE", { size: 18 });
  el("rect", { ...D.line, fill: C.face, x: 960, y: 380, width: 700, height: 460, rx: 14 }, g);
  const ex = el("path", { ...D.line, stroke: C.accent, "stroke-width": 3, "stroke-dasharray": "10 8", d: "M1250 400 L1250 820" }, g);
  const pay = el("path", { ...D.line, stroke: C.ink, "stroke-width": 8, d: "M1000 760 L1250 760 L1620 440" }, g); draw(pay, m(5) - 0.2, m(7) + 0.5);
  const dot = el("circle", { ...D.line, fill: C.accent, r: 18 }, g);
  const gain = pl(g, 1440, 420, "TU PROFITES DE LA HAUSSE", { bg: C.ink, fg: C.paper, size: 16 }), perte = pl(g, 1120, 800, "TU NE PERDS QUE LA PRIME", { bg: C.accentSoft, size: 16 });
  const lev = pl(g, 960, 980, "UN PETIT BUDGET → UNE GROSSE EXPOSITION", { bg: C.ink, fg: C.paper, size: 22 });
  return t => {
    show(head, fade(t, m(3) - 0.6));
    place(tk, 480, 400, pop(t, m(1) - 0.3) * 1.3, 8 * Math.sin(t * 3)); on(gen, pop(t, m(2) - 0.3) * out(t, m(3) - 0.6));
    on(prime, pop(t, m(4) - 0.3)); place(pc, 480, 480 + 10 * Math.sin(t * 5), pop(t, m(4)));
    on(fx, pop(t, m(5) - 0.3));
    // le point parcourt le marché : monte, puis redescend
    const up = prog(t, m(6) - 0.3, m(7) + 0.3), dn = prog(t, m(8) - 0.3, m(9) + 0.3);
    let x = 1250, y = 760; if (dn > 0) { x = lerp(1560, 1050, dn); y = x > 1250 ? 760 - (x - 1250) * 320 / 370 : 760; } else if (up > 0) { x = lerp(1250, 1560, up); y = 760 - (x - 1250) * 320 / 370; }
    dot.setAttribute("cx", x); dot.setAttribute("cy", y); dot.style.opacity = up > 0 ? 1 : 0;
    on(gain, pop(t, m(7) - 0.2)); on(perte, pop(t, m(10) - 0.3)); on(lev, pop(t, m(11) - 0.3));
  };
});

// ---- 06 · L'option, comme une réservation ----
SC("06", "L'OPTION, COMME UNE RÉSERVATION", (g, A) => {
  const m = A.m, head = title(g, 190, "Un exemple de la vie de tous les jours");
  const cli = marcheur(g, { vest: C.accent, hair: "f" }), appt = parc(g, 1.6), vers = coin(g, 28), cal = calendar(g, "3 mois");
  const P = prix(g, "", C.ink), ptxt = txt(g, 1480, 560, "", 34, { font: "Serif", weight: 700, fill: C.paper });
  const fl = pl(g, 1480, 330, "LE QUARTIER FLAMBE !", { bg: C.accent, size: 20 }), af = pl(g, 1480, 690, "TU ACHÈTES AU PRIX D'HIER", { bg: C.ink, fg: C.paper, size: 18 });
  const rn = pl(g, 1480, 770, "SINON : TU NE PERDS QUE TA PETITE SOMME", { size: 16 });
  const opt = pl(g, 960, 300, "C'EST EXACTEMENT ÇA, UNE OPTION", { bg: C.accentSoft, size: 22 });
  const fin = [pl(g, 600, 960, "DES COUPONS QUI TOMBENT… OU PAS", { size: 18 }), pl(g, 1320, 960, "DES BARRIÈRES QUI DÉCLENCHENT", { bg: C.accent, size: 18 })];
  return t => {
    show(head, fade(t, m(1) - 0.5));
    cli.at(t, [[m(1), 200, 900], [m(2), 560, 900], [m(6), 560, 900], [m(7) + 0.6, 380, 900]], { armR: t > m(3) - 0.2 && t < m(3) + 0.6 ? 10 : undefined });
    place(appt, 900, 640, pop(t, m(2) - 0.3) * 1.6);
    const kv = ease(prog(t, m(3) - 0.2, m(3) + 0.5)); place(vers, lerp(640, 900, kv), 600 - Math.sin(Math.PI * kv) * 120, kv > 0 && kv < 1 ? 1 : 0);
    place(cal.g, 700, 400, pop(t, m(3) + 0.3) * 0.8);
    const kf = prog(t, m(4) - 0.3, m(5)); const val = t < m(4) - 0.3 ? 300 : t < m(6) - 0.3 ? Math.round(300 + 100 * ease(kf)) : 300;
    place(P, 1460, 560, pop(t, m(2)) * 1.6); ptxt.textContent = val + " k€"; ptxt.style.opacity = fade(t, m(2));
    on(fl, pop(t, m(4) - 0.3) * out(t, m(6) - 0.3)); on(af, pop(t, m(5) - 0.3) * out(t, m(6) - 0.3)); on(rn, pop(t, m(8) - 0.5));
    on(opt, pop(t, m(9) - 0.3)); fin.forEach((f, i) => on(f, pop(t, m(11 + i) - 0.3)));
  };
});

// ---- 07 · Le produit structuré, c'est le pont ----
SC("07", "LE PRODUIT STRUCTURÉ, C'EST LE PONT", (g, A) => {
  const m = A.m;
  const eau = vagues(g, 600, 4); eau.setAttribute("transform", "translate(960 760)");
  const r1 = el("path", { ...D.line, fill: C.paperDeep, d: "M0 700 L660 700 L660 1080 L0 1080 Z" }, g), r2 = el("path", { ...D.line, fill: C.ink, d: "M1260 700 L1920 700 L1920 1080 L1260 1080 Z" }, g);
  const l1 = bloc(g, 440, 100, "Tes actifs classiques", "actions, obligations, immobilier", { size: 30 }), l2 = bloc(g, 440, 100, "L'univers des dérivés", "protections, rendements conditionnels", { fill: C.ink, size: 30 });
  const pont = el("path", { ...D.line, fill: C.accent, d: "M640 700 Q960 520 1280 700 L1280 730 Q960 560 640 730 Z" }, g); draw(pont, m(4) - 0.4, m(5) + 0.4);
  const lp = pl(g, 960, 520, "LE PRODUIT STRUCTURÉ", { bg: C.accent, size: 26 });
  const cli = marcheur(g, { vest: C.accent, hair: "f" }, 0.7), pro = marcheur(g, { vest: C.ink }, 0.7);
  const tick = pl(g, 960, 300, "UN TICKET D'ENTRÉE ACCESSIBLE", { size: 20 }), regles = pl(g, 960, 230, "DES RÈGLES ÉCRITES AVANT DE SIGNER", { bg: C.ink, fg: C.paper, size: 24 });
  return t => {
    place(l1, 330, 880, pop(t, m(2) - 0.3)); place(l2, 1590, 880, pop(t, m(3) - 0.3)); on(lp, pop(t, m(5) - 0.3));
    // sur le pont : arche quadratique 640 → 1280, sommet 610 (dessus du tablier)
    cli.at(t, [[m(6), 300, 700], [m(7) + 1.8, 1500, 700]], { yOf: x => { const u = (x - 640) / 640; return u > 0 && u < 1 ? 700 - 360 * u * (1 - u) : 700; } });
    pro.at(t, [[m(7) - 0.3, 1650, 700], [m(8), 1650, 700]], { flip: true });
    on(tick, pop(t, m(8) - 0.3)); on(regles, pop(t, m(10) - 0.3));
  };
});
