// Parties 00 à 02 : accroche, qui je suis, ma philosophie. Personnage masculin partout.

// ---- 00 · Accroche (fond sombre) ----
SC("00", "MIDELTON INVESTMENT CAPITAL", (g, A) => {
  const m = A.m;
  const bg = el("rect", { width: 1920, height: 1080, fill: C.ink }, g); g.insertBefore(bg, g.firstChild);
  const cone = el("path", { fill: C.paperDeep, d: "M420 0 L600 0 L860 960 L160 960 Z" }, g);
  el("ellipse", { fill: C.accentSoft, cx: 510, cy: 950, rx: 340, ry: 40 }, g);
  const desk = bureau(g), me = marcheur(g, { vest: C.accent }, 0.85);
  const pile = [0, 1, 2, 3].map(() => coin(g, 30)), zz = txt(g, 0, 0, "z z z", 34, { font: "Serif", weight: 700, fill: C.accent });
  const t1 = big(g, 1330, 330, "Vous travaillez dur pour votre argent.", 50, C.paper), t2 = big(g, 1330, 410, "Mais lui, est-ce qu'il travaille pour vous ?", 44, C.accent);
  const bq = bank(g, "BANQUE", 300), t3 = txt(g, 1330, 330, "votre banquier gère vos comptes…", 34, { weight: 600, fill: C.accentSoft });
  const qm = big(g, 1560, 640, "?", 220, C.accent), t4 = big(g, 1330, 860, "Mais qui pense à votre stratégie ?", 50, C.paper);
  const E = [0, 1, 2].map(i => ecranMarche(g, 330, 210, 3 + i * 7)), band = bandeau(g, 1040);
  const t5 = big(g, 1330, 250, "En finance de marché, une erreur peut coûter très cher.", 40, C.paper), t6 = big(g, 1330, 820, "J'ai appris à ne pas en faire.", 52, C.accent);
  return t => {
    cone.style.opacity = fade(t, A.s, 0.6);
    const typing = t < m(5) - 0.5;
    place(desk, 560, 950, fade(t, A.s, 0.5) * out(t, m(5) - 0.6));
    me.at(t, [[A.s + 0.1, 470, 950]], { armR: typing ? -15 + 12 * Math.sin(t * 14) : t > m(6) - 0.3 ? -40 : undefined, armL: typing ? 200 - 12 * Math.sin(t * 14 + 1) : undefined });
    const kP = out(t, m(3) - 0.6);
    pile.forEach((c, i) => place(c, 740, 900 - i * 24, pop(t, m(1) - 0.6 + i * 0.08) * kP));
    zz.setAttribute("transform", `translate(${770 + 10 * Math.sin(t * 2)} ${780 - 20 * ((t * 0.6) % 1)})`); zz.style.opacity = fade(t, m(1)) * kP;
    show(t1, fade(t, A.s + 0.1) * out(t, m(2) + 0.4)); show(t2, fade(t, m(1) - 0.2) * out(t, m(2) + 0.4));
    const kB = out(t, m(4) + 0.4);
    place(bq, 1100, 640, pop(t, m(2) + 0.1) * kB * 0.8); show(t3, fade(t, m(2) + 0.2) * kB);
    place(qm, 1560, 640, pop(t, m(3) - 0.1) * kB, 10 * Math.sin(t * 3)); show(t4, fade(t, m(3)) * kB);
    E.forEach((e, i) => { place(e.g, 980 + i * 360, 560, pop(t, m(4) + 0.3 + i * 0.12)); e.set(prog(t, m(4) + 0.4, m(5) + 0.4), pop(t, m(6) - 0.3 + i * 0.1)); });
    band.g.style.opacity = fade(t, m(4) + 0.4); band.set(t);
    show(t5, fade(t, m(4) + 0.4)); show(t6, fade(t, m(6) - 0.3));
  };
});

// ---- 01 · Qui je suis ----
SC("01", "QUI JE SUIS", (g, A) => {
  const m = A.m;
  const me = marcheur(g, { vest: C.accent }, 1.15);
  const nom = big(g, 1180, 270, "Mathyas Midelton", 84), logo = logoMIC(g, 90), fon = txt(g, 1240, 410, "fondateur de Midelton Investment Capital", 30, { anchor: "start", weight: 600, fill: C.inkSoft });
  const p3 = pl(g, 1180, 500, "CONSEILLER EN GESTION DE PATRIMOINE", { size: 22 }), p4 = pl(g, 1180, 560, "CONSEILLER EN INVESTISSEMENT FINANCIER ENREGISTRÉ", { bg: C.ink, fg: C.paper, size: 22 });
  const toq = toque(g), dip = txt(g, 885, 690, "Master · finance de marché & trading", 34, { anchor: "start", font: "Serif", weight: 700 });
  const ecr = ecranMarche(g, 300, 190, 11), ame = pl(g, 560, 290, "L'ÂME D'UN TRADER", { bg: C.accent, size: 24 });
  const Q = [["rigueur", 7], ["lecture des marchés", 8], ["sang-froid", 9]].map(([s, k], i) => ({ c: badge(g, ["bouclier", "bourse", "sablier"][i], s.toUpperCase(), "", 70), k, x: 980 + i * 300 }));
  const ech = echiquier(g, 60), cav = cavalier(g), str = big(g, 1330, 360, "Un stratège.", 90, C.ink), pro = big(g, 1330, 450, "Un professionnel des marchés financiers.", 44, C.accent);
  return t => {
    const kA = out(t, m(6) - 0.5), kB = out(t, m(10) - 0.5);
    me.at(t, [[A.s + 0.2, 420, 980]], { armR: t > m(10) - 0.3 ? -40 : t < m(2) ? -10 : undefined });
    show(nom, fade(t, m(1) - 0.6) * kA); place(logo, 1150, 400, pop(t, m(2) - 0.4) * kA * 0.55); show(fon, fade(t, m(2) - 0.2) * kA);
    on(p3, pop(t, m(3) - 0.3) * kA); on(p4, pop(t, m(4) - 0.3) * kA);
    place(toq, 770, 680, pop(t, m(5) - 0.4) * kA, -10 * Math.sin(Math.PI * prog(t, m(5), m(5) + 0.6))); show(dip, fade(t, m(5) - 0.2) * kA);
    place(ecr.g, 1270, 330, pop(t, m(6) - 0.3) * kB); ecr.set(prog(t, m(6) - 0.2, m(6) + 1.2), 0); on(ame, pop(t, m(6) - 0.2) * kB, 700, 0);
    Q.forEach(q => place(q.c, q.x, 680, pop(t, m(q.k) - 0.3) * kB));
    const kC = fade(t, m(10) - 0.4);
    place(ech, 900, 700, pop(t, m(10) - 0.5)); const u = ease(prog(t, m(10), m(10) + 0.8));
    place(cav, 900 - 90 + 60 * u, 700 - 90 + 120 * u - 120 * Math.sin(Math.PI * u), pop(t, m(10) - 0.3) * 0.9);
    show(str, kC); show(pro, fade(t, m(11) - 0.3));
  };
});

// ---- 02 · Ma philosophie ----
SC("02", "MA PHILOSOPHIE", (g, A) => {
  const m = A.m, head = title(g, 190, "Ma philosophie");
  const me = marcheur(g, { vest: C.accent }, 0.75), cli = marcheur(g, { vest: C.inkSoft }, 0.75);
  const bul = (s, f) => { const b = el("g", {}, g); el("path", { ...D.line, fill: f, d: "M-150 -60 L150 -60 Q170 -60 170 -40 L170 40 Q170 60 150 60 L-40 60 L-80 100 L-70 60 L-150 60 Q-170 60 -170 40 L-170 -40 Q-170 -60 -150 -60 Z" }, b); txt(b, 0, 14, s, 40, { font: "Serif", weight: 700 }); return b; };
  const oui = bul("« Oui. »", C.face), barre = el("path", { ...D.line, stroke: C.accent, "stroke-width": 9 }, g), comp = bul("« Je comprends. »", C.accentSoft);
  const amp = el("g", {}, g); el("circle", { fill: C.accent, r: 22 }, amp); el("path", { ...D.line, "stroke-width": 3, d: "M-8 26 L8 26 M-6 34 L6 34" }, amp);
  const K = [["Indépendant", "de tout réseau bancaire", 4], ["Transparent", "sur chaque frais", 5], ["Pédagogue", "toujours", 6]].map(([a, b, k], i) => ({ c: bloc(g, 420, 130, a, b, { size: 38, fill: i === 1 ? C.accentSoft : C.face }), k, x: 400 + i * 560 }));
  const tab = el("g", {}, g); el("rect", { ...D.line, fill: C.ink, x: -130, y: -90, width: 260, height: 170, rx: 8 }, tab);
  const ct = el("path", { ...D.line, stroke: C.accent, "stroke-width": 6 }, tab), dec = pl(g, 1440, 520, "C'EST VOUS QUI DÉCIDEZ", { bg: C.ink, fg: C.paper, size: 22 }), ok = check(g, true);
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const kA = out(t, m(4) - 0.5);
    me.at(t, [[A.s + 0.2, 640, 820]], { armR: t > m(7) - 0.3 ? -20 : undefined, k: 1 });
    cli.at(t, [[A.s + 0.3, 1300, 820]], { flip: true, armR: t > m(8) - 0.2 ? -60 : undefined });
    place(oui, 1420, 420, pop(t, m(2) - 0.5) * kA); const kb = ease(prog(t, m(2) - 0.1, m(2) + 0.4)); barre.setAttribute("d", `M1290 420 L${lerp(1290, 1550, kb)} 420`); barre.style.opacity = kb > 0 ? kA : 0;
    place(comp, 1420, 420, pop(t, m(3) - 0.3) * kA * (t > m(3) - 0.3 ? 1 : 0)); oui.style.opacity = t > m(3) - 0.3 ? 0 : kA;
    place(amp, 1640, 330, pop(t, m(3)) * kA * (1 + 0.1 * Math.sin(t * 6)));
    K.forEach(k => place(k.c, k.x, 300, pop(t, m(k.k) - 0.3) * out(t, m(7) - 0.6)));
    place(tab, 960, 560, pop(t, m(7) - 0.4)); const kc = ease(prog(t, m(7) - 0.2, m(8))); ct.setAttribute("d", `M-100 50 Q-40 ${50 - 60 * kc} ${lerp(-100, 100, kc)} ${50 - 110 * kc}`); ct.style.opacity = kc > 0 ? 1 : 0;
    on(dec, pop(t, m(8) - 0.3)); place(ok, 1570, 600, pop(t, m(8)));
  };
});
