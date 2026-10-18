// Chapitres 4:22 → 10:35

// ---- Fiscalité : on taxe les intérêts, pas le capital ; avant / après 8 ans ----
SC(262, "07", "LA FISCALITÉ", (g, at) => {
  const cap = el("g", {}, g); el("rect", { ...D.line, fill: C.inkSoft, x: -170, y: -260, width: 340, height: 260, rx: 14 }, cap); txt(cap, 0, -120, "CAPITAL", 40, { weight: 800, ls: 8, fill: C.paper });
  const intr = el("g", {}, g); el("rect", { ...D.line, fill: C.accent, x: -150, y: -110, width: 300, height: 110, rx: 14 }, intr); txt(intr, 0, -45, "INTÉRÊTS", 32, { weight: 800, ls: 6 });
  const stamp = el("g", {}, g); el("circle", { fill: C.face, stroke: C.ink, "stroke-width": 6, r: 70 }, stamp); txt(stamp, 0, 26, "%", 80, { font: "Serif", weight: 700 });
  const free = pill(g, 620, 920, "LE CAPITAL N'EST PAS IMPOSÉ", { bg: C.face, size: 22 });
  const taxed = pill(g, 1300, 920, "SEULS LES INTÉRÊTS SONT IMPOSÉS", { bg: C.accent, size: 22 });
  // frise 0 -> 8 ans
  const X0 = 300, X8 = 1080, X1 = 1680, Y = 640;
  const segA = el("rect", { ...D.line, fill: C.inkSoft, x: X0, y: Y - 40, height: 80, rx: 40 }, g);
  const segB = el("rect", { ...D.line, fill: C.accent, x: X8, y: Y - 40, height: 80, rx: 40 }, g);
  const tA = txt(g, (X0 + X8) / 2, Y + 10, "AVANT 8 ANS", 26, { weight: 800, ls: 6, fill: C.paper }), tB = txt(g, (X8 + X1) / 2, Y + 10, "APRÈS 8 ANS", 26, { weight: 800, ls: 6 });
  const hA = txt(g, (X0 + X8) / 2, Y - 90, "FISCALITÉ CLASSIQUE", 30, { weight: 800, ls: 6, fill: C.inkSoft }), hB = txt(g, (X8 + X1) / 2, Y - 90, "FISCALITÉ AVANTAGEUSE", 30, { weight: 800, ls: 6, fill: C.accent });
  const y0 = txt(g, X0, Y + 90, "0 an", 26, { weight: 700, fill: C.inkSoft }), y8 = txt(g, X8, Y + 90, "8 ans", 26, { weight: 800 });
  const flat = pill(g, (X0 + X8) / 2, Y + 190, "FLAT TAX 31,4 % SUR LES INTÉRÊTS", { bg: C.face, size: 22 });
  const abat = pill(g, (X8 + X1) / 2, Y + 190, "ABATTEMENTS SUR LES INTÉRÊTS", { bg: C.accentSoft, size: 22 });
  const runner = el("g", {}, g); el("circle", { ...D.line, fill: C.face, r: 26 }, runner); el("path", { ...D.line, "stroke-width": 4, d: "M0 -14 L0 0 L10 8" }, runner);
  const ok = check(g);
  return t => {
    const p1 = out(t, 272.6, 0.5);
    place(cap, 620, 760, pop(t, 264.4) * p1); place(intr, 1300, 760, pop(t, 266.6) * p1);
    const sk = prog(t, 269.6, 270.0); place(stamp, 1300, lerp(380, 600, ease(sk)), (t > 269.4 ? 1 : 0) * p1 * (sk < 1 ? 1 : 1 + 0.1 * Math.sin(prog(t, 270, 270.3) * Math.PI)));
    place(free.g, free.x, free.y, pop(t, 270.6) * p1); place(taxed.g, taxed.x, taxed.y, pop(t, 271.4) * p1);
    const p2 = t > 272.6;
    const wa = (X8 - X0 - 10) * ease(prog(t, 274.0, 275.4)), wb = (X1 - X8) * ease(prog(t, 277.6, 279.0));
    segA.setAttribute("width", wa); segA.style.opacity = p2 && wa > 1 ? 1 : 0; segB.setAttribute("width", wb); segB.style.opacity = p2 && wb > 1 ? 1 : 0;
    tA.style.opacity = p2 ? fade(t, 275.2) : 0; tB.style.opacity = p2 ? fade(t, 278.8) : 0;
    show(hA, p2 ? fade(t, 275.6) : 0); show(hB, p2 ? fade(t, 279.4) : 0); y0.style.opacity = p2 ? fade(t, 274) : 0; y8.style.opacity = p2 ? fade(t, 277.6) : 0;
    place(flat.g, flat.x, flat.y, p2 ? pop(t, 287.0) : 0); place(abat.g, abat.x, abat.y, p2 ? pop(t, 299.4) : 0);
    // on peut entrer et sortir : c'est l'âge du contrat qui compte
    const ru = ease(prog(t, 302.0, 306.0)) * 0.62 + ease(prog(t, 307.4, 309.4)) * 0.38;
    place(runner, lerp(X0, X8, ru), Y - 160 + 0 * ru, t > 301.6 ? pop(t, 301.6) : 0, 0);
    place(ok, X8, Y - 160, pop(t, 309.6));
  };
});

// ---- Exemple d'abattement ----
SC(312, "07", "L'ABATTEMENT · EXEMPLE", (g, at) => {
  const capB = el("g", {}, g); el("rect", { ...D.line, fill: C.inkSoft, x: -200, y: -300, width: 400, height: 300, rx: 14 }, capB);
  txt(capB, 0, -170, "CAPITAL", 30, { weight: 800, ls: 8, fill: C.paper }); txt(capB, 0, -110, "20 000 €", 60, { font: "Serif", weight: 600, fill: C.paper });
  const intB = el("g", {}, g); const intR = el("rect", { ...D.line, fill: C.accent, x: -200, width: 400, rx: 14 }, intB);
  const intT = txt(intB, 0, 0, "10 000 €", 56, { font: "Serif", weight: 600 }); const intL = txt(intB, 0, 0, "INTÉRÊTS", 24, { weight: 800, ls: 6 });
  const c1 = card(g, 470, 150); txt(c1, 0, -12, "4 600 €", 60, { font: "Serif", weight: 600 }); txt(c1, 0, 44, "CÉLIBATAIRE, VEUF…", 20, { weight: 700, ls: 4, fill: C.inkSoft });
  const c2 = card(g, 470, 150, { fill: C.accentSoft }); txt(c2, 0, -12, "9 200 €", 60, { font: "Serif", weight: 600 }); txt(c2, 0, 44, "MARIÉ OU PACSÉ", 20, { weight: 700, ls: 4, fill: C.inkSoft });
  const head = title(g, 190, "Abattement annuel sur les intérêts");
  const minus = txt(g, 1360, 520, "10 000 − 9 200", 50, { font: "Serif", weight: 600, fill: C.inkSoft });
  const rest = pill(g, 1360, 640, "RESTE IMPOSÉ : 800 €", { bg: C.accent, size: 30 });
  const low = pill(g, 1360, 760, "À UN TAUX RÉDUIT", { bg: C.face, size: 24 });
  return t => {
    show(head, fade(t, 312.4));
    place(capB, 560, 900, pop(t, 317.6));
    const ih = lerp(150, 34, ease(prog(t, 334.6, 336.4)));
    intR.setAttribute("y", -ih); intR.setAttribute("height", ih); intT.setAttribute("y", -ih / 2 + 20); intT.style.opacity = ih > 100 ? 1 : 0; intL.setAttribute("y", -ih / 2 + 9); intL.style.opacity = ih < 100 ? 1 : 0;
    intT.textContent = "10 000 €"; intL.textContent = ih < 100 ? "800 €" : "INTÉRÊTS";
    place(intB, 560, 590, pop(t, 321.6));
    const slide = ease(prog(t, 333.4, 334.6));
    place(c1, 1360, 420, pop(t, 327.6) * out(t, 332.6)); place(c2, lerp(1360, 560, slide), lerp(640, 470, slide), pop(t, 329.8) * out(t, 336.2));
    show(minus, fade(t, 336.0)); place(rest.g, rest.x, rest.y, pop(t, 337.6)); place(low.g, low.x, low.y, pop(t, 339.6));
  };
});

// ---- Deux poches, comme un jean ----
SC(345, "08", "LE FONCTIONNEMENT · DEUX POCHES", (g, at) => {
  const jean = el("g", {}, g);
  el("path", { ...D.line, fill: C.inkSoft, d: "M-200 -260 L200 -260 L230 300 L60 300 L0 -40 L-60 300 L-230 300 Z" }, jean);
  el("rect", { ...D.line, fill: C.ink, x: -205, y: -290, width: 410, height: 44, rx: 6 }, jean);
  const pockL = el("path", { ...D.line, fill: C.accentSoft, d: "M-180 -238 L-70 -238 C-70 -170 -110 -140 -180 -150 Z" }, jean);
  const pockR = el("path", { ...D.line, fill: C.accent, d: "M180 -238 L70 -238 C70 -170 110 -140 180 -150 Z" }, jean);
  el("circle", { cx: 0, cy: -268, r: 8, fill: C.accent }, jean);
  [-140, 140].forEach(x => el("path", { fill: "none", stroke: C.paper, "stroke-width": 3, "stroke-dasharray": "8 8", d: `M${x} -230 L${x * 1.1} 280` }, jean));
  const lL = txt(g, 470, 250, "FONDS EURO", 44, { weight: 800, ls: 8 }), lR = txt(g, 1550, 250, "UNITÉS DE COMPTE", 44, { weight: 800, ls: 6, fill: C.accent });
  const curlL = D.curl(g, [820, 380], [620, 320], -40, 2, 10), curlR = D.curl(g, [1100, 380], [1300, 320], -40, 2, 10);
  draw(curlL, 354.8, 355.6); draw(curlR, 381.0, 381.8);
  const sh = el("g", {}, g); shield(sh, C.accentSoft); el("path", { ...D.line, "stroke-width": 8, d: "M-22 2 L-6 20 L26 -16" }, sh);
  const lchips = [["GARANTI À 98 · 99 · 100 %", 362.8], ["OBLIGATIONS · IMMOBILIER", 369.6], ["RENDEMENT : 2 À 4 %", 377.0]].map(([s, a], i) => ({ p: pill(g, 470, 560 + i * 110, s, { bg: i === 0 ? C.accentSoft : C.face, size: 22 }), a }));
  const tags = [["OBLIGATIONS", 390.6], ["IMMOBILIER", 391.4], ["ETF", 392.0], ["ACTIONS", 392.6], ["SCPI", 393.3], ["STRUCTURÉS", 393.9], ["OPCVM", 394.5], ["PRIVATE EQUITY", 395.2]]
    .map(([s, a], i) => ({ p: pill(g, 1390 + (i % 2) * 320, 420 + Math.floor(i / 2) * 105, s, { bg: i % 3 === 0 ? C.accent : C.face, size: 22 }), a }));
  const sprout = txt(g, 1550, 330, "FAIRE FRUCTIFIER", 26, { weight: 800, ls: 8, fill: C.inkSoft });
  const slider = el("g", {}, g);
  el("rect", { ...D.line, "stroke-width": 3, fill: C.paperDeep, x: -380, y: -14, width: 760, height: 28, rx: 14 }, slider);
  const knob = el("circle", { ...D.line, fill: C.accent, r: 30 }, slider);
  txt(slider, -440, 12, "€", 40, { font: "Serif", weight: 700 }); txt(slider, 450, 10, "UC", 30, { weight: 800 });
  return t => {
    const zoomOut = ease(prog(t, 353.6, 354.6));
    place(jean, 960, lerp(580, 620, zoomOut), pop(t, 349.6, 0.5) * lerp(1.15, 0.9, zoomOut));
    pockL.setAttribute("fill", t > 355 && t < 380 ? C.accent : C.accentSoft); pockR.setAttribute("fill", t > 381 ? C.accent : C.accentSoft);
    show(lL, fade(t, 355.0)); show(lR, fade(t, 381.2)); show(sprout, fade(t, 385.6));
    place(sh, 470, 400, pop(t, 357.6) * 0.8 * out(t, 389.6));
    for (const c of lchips) place(c.p.g, c.p.x, c.p.y, pop(t, c.a) * out(t, 389.6));
    for (const c of tags) place(c.p.g, c.p.x, c.p.y, pop(t, c.a));
    const pos = lerp(0.5, 0.82, ease(prog(t, 405.4, 407.4)));
    knob.setAttribute("cx", -380 + 760 * pos); place(slider, 960, 990, pop(t, 401.6));
  };
});

// ---- Les atouts : de votre vivant ----
SC(410, "09", "LES ATOUTS · DE VOTRE VIVANT", (g, at) => {
  const head = title(g, 190, "De votre vivant");
  const items = [["DISPONIBLE", "rachat à tout moment", 419.4], ["SANS PLAFOND", "versez librement", 421.6], ["FONDS € + UC", "sécurité et potentiel", 427.2]].map(([a1, a2, a], i) => {
    const c = card(g, 440, 200); txt(c, 0, -10, a1, 38, { weight: 800, ls: 5 }); txt(c, 0, 44, a2, 26, { weight: 500, fill: C.inkSoft }); return { c, a, x: 460 + i * 500 };
  });
  // le livret A déborde à 22 950 €
  const jar = el("g", {}, g);
  el("path", { ...D.line, fill: C.face, d: "M-90 -150 L90 -150 L90 120 Q90 150 60 150 L-60 150 Q-90 150 -90 120 Z" }, jar);
  el("rect", { ...D.line, fill: C.inkSoft, x: -100, y: -180, width: 200, height: 34, rx: 6 }, jar);
  const coins = K.stack(jar, 9, 60); coins.setAttribute("transform", "translate(0 130)");
  const capT = txt(g, 0, 0, "LIVRET A : PLAFONNÉ À 22 950 €", 26, { weight: 800, ls: 4, fill: C.inkSoft });
  const spill = [0, 1, 2].map(() => coin(g, 26));
  const env = envelope(g, ""); const inf = txt(g, 0, 0, "∞", 120, { font: "Serif", weight: 600, fill: C.accent });
  return t => {
    show(head, fade(t, 410.6));
    const p1 = out(t, 423.0), p2 = t > 423 && t < 427 ? 1 : 0;
    items.forEach((it, i) => place(it.c, it.x, i === 1 ? lerp(470, 470, 0) : 470, pop(t, it.a) * (i === 1 ? 1 : 1)));
    // focus sur le plafond
    place(jar, 560, 780, pop(t, 423.2) * (t < 427.4 ? 1 : out(t, 427.4)));
    capT.setAttribute("x", 560); capT.setAttribute("y", 1000); capT.style.opacity = fade(t, 423.4) * out(t, 427.4);
    spill.forEach((c, i) => { const u = prog(t, 424.0 + i * 0.4, 424.8 + i * 0.4); place(c, 600 + i * 50 + u * 120, 610 + u * u * 340, u > 0 && u < 1 ? 1 : 0, u * 200); });
    env.setOpen(0); place(env.g, 1360, 790, pop(t, 424.6) * 0.45 * out(t, 427.4)); inf.setAttribute("x", 1360); inf.setAttribute("y", 760); inf.style.opacity = fade(t, 425.0) * out(t, 427.4);
    // diversifier : fonds € + UC
    items.forEach(it => {}); void p1; void p2;
  };
});

// ---- Les atouts : au décès ----
SC(437, "09", "LES ATOUTS · AU DÉCÈS", (g, at) => {
  const head = title(g, 190, "Au moment du décès");
  const items = [["152 500 €", "hors droits, par bénéficiaire", 444.6], ["1 MOIS", "pour verser le capital", 448.4], ["LIBRE", "choix des bénéficiaires", 460.0]].map(([a1, a2, a], i) => {
    const c = card(g, 440, 200, { fill: i === 0 ? C.accentSoft : C.face }); txt(c, 0, -6, a1, 50, { font: "Serif", weight: 600 }); txt(c, 0, 48, a2, 24, { weight: 500, fill: C.inkSoft }); return { c, a, x: 460 + i * 500 };
  });
  const people = [["COUSIN", {}], ["FRÈRE", { vest: C.inkSoft }], ["TANTE", { hair: "f" }]].map(([l, o], i) => ({ guy: person(g, o), l: txt(g, 0, 0, l, 22, { weight: 800, ls: 5, fill: C.inkSoft }), x: 520 + i * 260 }));
  const dog = el("g", {}, g);
  el("path", { ...D.line, fill: C.accentSoft, d: "M-60 0 Q-60 -40 -10 -40 L40 -40 Q60 -40 62 -60 L90 -66 Q104 -50 92 -34 L80 -24 Q74 0 50 0 L50 40 M-50 0 L-50 40 M-60 -20 Q-90 -40 -84 -66" }, dog);
  el("circle", { cx: 84, cy: -50, r: 4, fill: C.ink }, dog);
  const no = check(g, false); const dogL = txt(g, 1440, 1000, "(pas le chien…)", 30, { font: "Serif", weight: 500, fill: C.inkSoft });
  const out1 = check(g, false); const disin = pill(g, 520, 380, "DÉSHÉRITER, C'EST POSSIBLE AUSSI", { bg: C.face, size: 22 });
  return t => {
    show(head, fade(t, 437.4) * out(t, 461.6));
    const p1 = out(t, 461.6, 0.5);
    items.forEach(it => place(it.c, it.x, 470, pop(t, it.a) * p1));
    people.forEach((p, i) => { const k = pop(t, 462.2 + i * 0.6); const gone = i === 0 ? ease(prog(t, 469.6, 470.4)) : 0;
      p.guy.pose(105, 75).place(p.x - gone * 300, 900, k * 0.85, false); p.guy.g.style.opacity = (k > 0 ? 1 : 0) * (1 - gone);
      p.l.setAttribute("x", p.x - gone * 300); p.l.setAttribute("y", 960); p.l.style.opacity = fade(t, 462.4 + i * 0.6) * (1 - gone); });
    place(dog, 1440, 870, pop(t, 464.8)); place(no, 1520, 760, pop(t, 465.4)); show(dogL, fade(t, 465.6));
    place(out1, 520, 520, pop(t, 469.2) * out(t, 470.4)); place(disin.g, disin.x, disin.y, pop(t, 469.0));
  };
});

// ---- Livrets bancaires au décès : bloqués jusqu'au notaire ----
SC(473, "09", "ET LES LIVRETS BANCAIRES ?", (g, at) => {
  const livret = card(g, 300, 380, { fill: C.paperDeep }); txt(livret, 0, -120, "LIVRET", 40, { weight: 800, ls: 8 });
  [-40, 0, 40].forEach(y => el("path", { ...D.line, "stroke-width": 4, stroke: C.inkSoft, d: `M-100 ${y} L100 ${y}` }, livret));
  const chain = el("path", { fill: "none", stroke: C.ink, "stroke-width": 12, "stroke-dasharray": "26 10", d: "M-200 -190 L200 190 M200 -190 L-200 190" }, g);
  const lock = padlock(g);
  const notary = bank(g, "NOTAIRE", 300);
  const hg = el("g", {}, g); el("path", { ...D.line, fill: C.face, d: "M-50 -80 L50 -80 L50 -70 Q50 -20 8 0 Q50 20 50 70 L50 80 L-50 80 L-50 70 Q-50 20 -8 0 Q-50 -20 -50 -70 Z" }, hg);
  const sand = el("path", { fill: C.accent, d: "M-30 40 L30 40 L40 72 L-40 72 Z" }, hg);
  const l1 = pill(g, 560, 900, "BLOQUÉ JUSQU'AU RÈGLEMENT DE LA SUCCESSION", { bg: C.face, size: 22 });
  const l2 = title(g, 220, "Mieux vaut prévenir que guérir.", 60);
  return t => {
    place(livret, 560, 520, pop(t, 474.4)); place(chain, 560, 520, fade(t, 477.4) > 0 ? 1 : 0); chain.style.opacity = fade(t, 477.4); chain.setAttribute("transform", "translate(560 520) scale(0.9)");
    place(lock.g, 560, 520, pop(t, 478.0) * 0.9);
    place(notary, 1380, 560, pop(t, 484.4)); place(hg, 1380, 830, pop(t, 486.4) * 0.8); hg.setAttribute("transform", `translate(1380 830) scale(0.8) rotate(${t > 488 ? Math.min(180, (t - 488) * 90) : 0})`);
    place(l1.g, l1.x, l1.y, pop(t, 482.0)); show(l2, fade(t, 496.4));
  };
});

// ---- Simulations ----
SC(500, "10", "SIMULATIONS", (g, at) => {
  const win = el("g", {}, g);
  el("rect", { ...D.line, fill: C.face, x: -760, y: -400, width: 1520, height: 800, rx: 20 }, win);
  el("path", { ...D.line, "stroke-width": 4, d: "M-760 -330 L760 -330" }, win);
  [0, 1, 2].forEach(i => el("circle", { ...D.line, "stroke-width": 3, fill: [C.accent, C.accentSoft, C.paperDeep][i], cx: -715 + i * 34, cy: -365, r: 11 }, win));
  txt(win, 0, -355, "SIMULATEUR · ASSURANCE VIE", 22, { weight: 800, ls: 6, fill: C.inkSoft });
  const inputs = [["VERSEMENT", "250 € / mois", 521.4], ["DURÉE", "20 ans", 524.0], ["RENDEMENT", "5 % / an", 525.4]].map(([a, b, at2], i) => {
    const c = el("g", {}, win); txt(c, 0, 0, a, 20, { anchor: "start", weight: 800, ls: 5, fill: C.inkSoft }); const v = txt(c, 0, 52, b, 46, { anchor: "start", font: "Serif", weight: 600 });
    return { c, a: at2, v, y: -230 + i * 150 };
  });
  const B = bars(win, 20, 700, 520);
  const res = txt(win, 470, -200, "", 80, { font: "Serif", weight: 600 });
  const resL = txt(win, 470, -270, "CAPITAL FINAL", 22, { weight: 800, ls: 6, fill: C.inkSoft });
  const intL = txt(win, 470, -140, "", 28, { weight: 700, fill: C.accent });
  const legend = el("g", {}, win);
  el("rect", { ...D.line, "stroke-width": 2, fill: C.inkSoft, x: 0, y: 0, width: 26, height: 26 }, legend); txt(legend, 38, 21, "Versements", 22, { anchor: "start", weight: 600 });
  el("rect", { ...D.line, "stroke-width": 2, fill: C.accent, x: 200, y: 0, width: 26, height: 26 }, legend); txt(legend, 238, 21, "Intérêts", 22, { anchor: "start", weight: 600 });
  return t => {
    place(win, 960, 560, pop(t, 501.0, 0.6));
    inputs.forEach(it => { place(it.c, -700, it.y, pop(t, it.a)); });
    const dbl = ease(prog(t, 546.6, 548.6));
    inputs[0].v.textContent = dbl > 0.5 ? "500 € / mois" : "250 € / mois";
    const grow = ease(prog(t, 527.6, 534.6)), sc = 0.00245;
    for (let i = 0; i < 20; i++) {
      const yrs = i + 1, k = Math.min(1, Math.max(0, grow * 20 - i)), m = lerp(250, 500, dbl);
      const fv = m * 12 * ((Math.pow(1.05, yrs) - 1) / 0.05) * Math.pow(1.05, 0.5) * 0.982, paid = m * 12 * yrs;
      B.set(i, paid * sc * 1.0 * k, Math.max(0, fv - paid) * sc * k);
    }
    B.g.setAttribute("transform", "translate(-170 330)"); B.g.style.opacity = fade(t, 527.2);
    const v = lerp(101864, 203728, dbl), it = lerp(41864, 83728, dbl);
    res.textContent = fmt(v * Math.min(1, ease(prog(t, 533.6, 536.0)))) + " €"; res.style.opacity = fade(t, 533.6);
    resL.style.opacity = fade(t, 533.6);
    intL.textContent = `dont plus de ${fmt(Math.floor(it / 1000) * 1000)} € d'intérêts`; intL.style.opacity = fade(t, 538.4);
    place(legend, -330, 350, fade(t, 528.4));
  };
});

// ---- Simulation : un capital de départ ----
SC(557, "10", "SIMULATIONS · CAPITAL DE DÉPART", (g, at) => {
  const st = K.stack(g, 6, 50); const stL = txt(g, 420, 860, "15 000 € DE CÔTÉ", 28, { weight: 800, ls: 5 });
  const W = 1000, H = 520, X = 1200, Y = 560;
  const pts = []; for (let y = 0; y <= 20; y++) pts.push([y / 20, (15000 * Math.pow(1.05, y) - 15000) / (39799 - 15000) * 0.85 + 0.05]);
  const ch = chart(g, W, H, pts, { color: C.accent, sw: 7 }); draw(ch.line, 566.6, 572.6);
  const base = el("path", { ...D.line, "stroke-width": 3, stroke: C.inkSoft, "stroke-dasharray": "10 8", d: `M${-W / 2 + 24} ${H / 2 - 20 - 0.05 * (H - 40)} L${W / 2 - 24} ${H / 2 - 20 - 0.05 * (H - 40)}` }, ch.g);
  const fin = pill(g, X + 290, Y - 330, "39 799 € APRÈS 20 ANS", { bg: C.accent, size: 26 });
  const gain = pill(g, X - 230, Y - 330, "+24 000 € D'INTÉRÊTS", { bg: C.accentSoft, size: 24 });
  const sparkles = [0, 1, 2, 3, 4].map(() => el("path", { ...D.line, stroke: C.accent, "stroke-width": 5, d: "M0 -16 L0 16 M-16 0 L16 0" }, g));
  const p4 = ch.P([4 / 20, (15000 * Math.pow(1.05, 4) - 15000) / 24799 * 0.85 + 0.05]);
  const four = el("g", {}, g); el("circle", { ...D.line, fill: C.accent, r: 14 }, four);
  const fourL = pill(g, X + p4[0] + 40, Y + p4[1] - 90, "4 ANS : +3 000 €", { bg: C.face, size: 22 });
  const steep = []; for (let y = 0; y <= 20; y++) steep.push([y / 20, Math.min(0.98, (15000 * Math.pow(1.075, y) - 15000) / 24799 * 0.85 * 0.5 + 0.05)]);
  const ch2 = chart(g, W, H, steep, { color: C.inkSoft, sw: 5, frame: false }); draw(ch2.line, 597.6, 600.4);
  const more = pill(g, 420, 360, "15 000 € + 400 € / MOIS", { bg: C.face, size: 24 });
  const ten = pill(g, 420, 460, "PRÈS DE 10 000 € D'INTÉRÊTS", { bg: C.accent, size: 24 });
  return t => {
    place(st, 420, 760, pop(t, 562.2)); show(stL, fade(t, 562.6));
    place(ch.g, X, Y, pop(t, 566.0, 0.5)); place(ch2.g, X, Y, t > 597.4 ? 1 : 0);
    place(gain.g, gain.x, gain.y, pop(t, 569.6)); place(fin.g, fin.x, fin.y, pop(t, 576.2));
    sparkles.forEach((s, i) => { const k = pop(t, 572.4 + i * 0.15) * out(t, 577.0); place(s, X + 200 + 70 * Math.cos(i * 1.3 + t), Y - 220 + 60 * Math.sin(i * 1.7 + t), k); });
    place(four, X + p4[0], Y + p4[1], pop(t, 590.6)); place(fourL.g, fourL.x, fourL.y, pop(t, 591.0));
    place(more.g, more.x, more.y, pop(t, 603.6)); place(ten.g, ten.x, ten.y, pop(t, 609.4));
  };
});

// ---- Compte-titres ou assurance vie ? ----
SC(613, "10", "COMPTE-TITRES OU ASSURANCE VIE ?", (g, at) => {
  const mk = (label, fill) => { const c = card(g, 520, 380, { fill }); txt(c, 0, -130, label, 34, { weight: 800, ls: 5 });
    [["curve", -110], ["pie", 0], ["coins", 110]].forEach(([k, x]) => { const w = el("g", { transform: `translate(${x} 0) scale(0.6)` }, c); D.icons[k](w); }); return c; };
  const cto = mk("COMPTE-TITRES", C.face), av = mk("ASSURANCE VIE", C.accentSoft);
  const same = txt(g, 960, 260, "Les mêmes ETF, les mêmes actions…", 50, { font: "Serif", weight: 500 });
  const tag = pill(g, 1340, 870, "UNE FISCALITÉ PLUS AVANTAGEUSE", { bg: C.accent, size: 24 });
  const ok = check(g); const vig = txt(g, 960, 1000, "Soyez vigilant là-dessus.", 40, { font: "Serif", weight: 500, fill: C.inkSoft });
  return t => {
    place(cto, 580, 560, pop(t, 616.6)); place(av, 1340, 560, pop(t, 619.4)); show(same, fade(t, 620.4));
    place(tag.g, tag.x, tag.y, pop(t, 626.4)); place(ok, 1590, 380, pop(t, 627.0)); show(vig, fade(t, 630.8));
  };
});
