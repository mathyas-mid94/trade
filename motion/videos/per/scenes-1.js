// Parties 00 à 09 : introduction, répartition, démographie, âge de départ, taux de remplacement, loi PACTE,
// deux phases, phase d'épargne, protections, cas de déblocage.
// A.m(k) = instant du repère [k] de la partie (SCRIPT.md) ; A.s / A.e = début / fin de la partie.

// ---- 00 · Introduction ----
SC("00", "INTRODUCTION", (g, A) => {
  const m = A.m, me = member(g, "mathyas");
  const sab = el("g", {}, g); const sI = el("g", { transform: "scale(1.7)" }, sab); D.icons.sablier(sI);
  const pct = el("g", {}, g); const pI = el("g", { transform: "scale(1.5)" }, pct); D.icons.percent(pI);
  const plus = big(g, 960, 470, "+", 90, C.accent);
  const per = pill(g, 960, 300, "PER · PLAN D'ÉPARGNE RETRAITE", { bg: C.accent, size: 30 });
  const lieux = [bank(g, "BANQUE", 220), bank(g, "ASSUREUR", 220)];
  const imp = pill(g, 1080, 820, "TU PAIES DES IMPÔTS", { bg: C.face, size: 22 }), tps = pill(g, 1480, 820, "DU TEMPS AVANT LA RETRAITE", { bg: C.face, size: 22 });
  const obj = [["percent", "RÉDUIRE", "tes impôts", 9], ["curve", "FAIRE FRUCTIFIER", "ton épargne", 10], ["sablier", "COMBLER", "la perte de revenus", 11]].map(([k, a, b, mk], i) => {
    const w = el("g", {}, g); el("circle", { ...D.line, fill: C.face, r: 130 }, w); D.icons[k](w);
    txt(w, 0, 185, a, 30, { weight: 800, ls: 5 }); txt(w, 0, 222, b, 24, { weight: 500, fill: C.inkSoft }); return { w, x: 640 + i * 440, a: m(mk) };
  });
  const trois = big(g, 1080, 250, "3 objectifs en même temps", 50);
  return t => {
    const p1 = out(t, m(4) - 0.5), p2 = out(t, m(8) - 0.5);
    me.at(t, A.s + 0.2, 300, 920, { armR: t > m(3) && t < m(4) ? -30 : 75 });
    place(sab, 820, 520, pop(t, m(1) - 0.5) * p1); place(plus, 1060, 520, pop(t, m(2) - 0.6) * p1); place(pct, 1300, 520, pop(t, m(2) - 0.2) * p1);
    place(per.g, per.x, per.y, pop(t, m(3) - 0.3) * p2);
    place(lieux[0], 900, 620, pop(t, m(4) - 0.2) * 0.8 * p2); place(lieux[1], 1500, 620, pop(t, m(5) - 0.2) * 0.8 * p2);
    place(imp.g, imp.x, imp.y + 120, pop(t, m(6) - 0.2) * p2); place(tps.g, tps.x, tps.y + 120, pop(t, m(7) - 0.2) * p2);
    show(trois, fade(t, m(8) - 0.3));
    obj.forEach(o => place(o.w, o.x, 520, pop(t, o.a - 0.3)));
  };
});

// ---- 01 · La retraite par répartition ----
SC("01", "LA RETRAITE PAR RÉPARTITION", (g, A) => {
  const m = A.m, head = title(g, 190, "La retraite en France : solidarité et répartition");
  const actifs = ["actif1", "actif2", "actif3", "actif4"].map(w => member(g, w, false));
  const vieux = [retraite(g), retraite(g, true)];
  const caisse = bank(g, "CAISSE", 260);
  const f1 = flux(g, 5), f2 = flux(g, 5);
  const lab = [txt(g, 420, 990, "LES ACTIFS COTISENT", 24, { weight: 800, ls: 5, fill: C.inkSoft }), txt(g, 1500, 990, "LES RETRAITÉS REÇOIVENT", 24, { weight: 800, ls: 5, fill: C.inkSoft })];
  const sol = pill(g, 960, 300, "SOLIDARITÉ", { bg: C.accent, size: 26 }), rep = pill(g, 960, 370, "RÉPARTITION", { bg: C.face, size: 26 });
  const demain = pill(g, 420, 330, "DEMAIN : LES ACTIFS DE DEMAIN PAIERONT", { bg: C.face, size: 20 });
  const no = [ligne(g, "Pas de pension suffisante garantie", m(7), 300, false, 30), ligne(g, "Pas de capitalisation", m(8), 370, false, 30)];
  return t => {
    show(head, fade(t, m(1) - 0.5) * out(t, m(7) - 0.5));
    const age = ease(prog(t, m(6) - 0.4, m(6) + 0.8));
    actifs.forEach((a, i) => a.at(t, m(4) - 0.6 + i * 0.15, 260 + i * 110, 900, { armR: 40 }));
    vieux.forEach((v, i) => v.at(t, m(2) - 0.3 + i * 0.2, 1440 + i * 140, 900));
    place(caisse, 960, 700, pop(t, m(3) - 0.3) * 0.8);
    f1(t, m(4), m(4) + 1.2, 420, 640, 900, 640, 90); f2(t, m(5) - 0.3, m(5) + 0.9, 1020, 640, 1500, 640, 90);
    lab[0].style.opacity = fade(t, m(4)); lab[1].style.opacity = fade(t, m(5));
    place(sol.g, sol.x, sol.y, pop(t, m(2)) * out(t, m(6) - 0.4)); place(rep.g, rep.x, rep.y, pop(t, m(3)) * out(t, m(6) - 0.4));
    place(demain.g, demain.x, demain.y, pop(t, m(6)) * out(t, m(7) - 0.4));
    actifs.forEach(a => a.guy.g.style.opacity = Math.min(+a.guy.g.style.opacity, 1 - 0.5 * age));
    no.forEach((n, i) => place(n.r, 960 - 260, n.y, pop(t, n.a - 0.3)));
  };
});

// ---- 02 · De moins en moins d'actifs ----
SC("02", "DE MOINS EN MOINS D'ACTIFS", (g, A) => {
  const m = A.m, head = title(g, 190, "Combien d'actifs pour un retraité ?");
  const cols = [["1960", 4, 2], ["2020", 1.8, 3], ["2050", 1.2, 4]].map(([an, v, k], i) => {
    const x = 380 + i * 420, w = el("g", {}, g);
    const bar = el("rect", { ...D.line, fill: C.accentSoft, x: x - 90, width: 180, rx: 8 }, w);
    el("rect", { ...D.line, fill: C.ink, x: x - 90, y: 780, width: 180, height: 90, rx: 8 }, w);
    txt(w, x, 838, "1 retraité", 22, { weight: 700, fill: C.paper }); txt(w, x, 930, an, 32, { font: "Serif", weight: 700 });
    const n = big(w, x, 0, String(v).replace(".", ","), 60); return { w, bar, n, v, a: m(k) };
  });
  const causes = [["On vit plus longtemps", 5], ["Moins de naissances", 6], ["Plus de retraités à financer", 7]].map(([s, k], i) => ligne(g, s, m(k), 420 + i * 100, true, 34));
  const vieux = retraite(g);
  return t => {
    show(head, fade(t, m(1) - 0.5));
    cols.forEach(c => { const k = ease(prog(t, c.a - 0.4, c.a + 0.4)), h = 120 * c.v * k;
      c.bar.setAttribute("y", 780 - h); c.bar.setAttribute("height", h); c.w.style.opacity = fade(t, c.a - 0.5); c.n.setAttribute("y", 760 - h); });
    causes.forEach(c => place(c.r, 1320, c.y, pop(t, c.a - 0.3)));
    vieux.at(t, m(5) - 0.2, 1700, 960, { scale: 0.7 });
  };
});

// ---- 03 · Partir de plus en plus tard ----
SC("03", "PARTIR DE PLUS EN PLUS TARD", (g, A) => {
  const m = A.m, head = title(g, 190, "L'âge de départ recule");
  const ar = el("path", { ...D.line, stroke: C.accent, "stroke-width": 16, d: "M240 760 L1660 760 M1620 720 L1670 760 L1620 800" }, g); draw(ar, m(1) - 0.3, m(4) + 0.4);
  const P = [["1982", "60 ans", 2], ["2011", "62 ans", 3], ["2023", "64 ans", 4], ["DEMAIN ?", "67 · 70 ans", 5]].map(([a, b, k], i) => {
    const w = el("g", {}, g), x = 360 + i * 400;
    el("circle", { ...D.line, fill: i === 3 ? C.accent : C.ink, cx: x, cy: 760, r: 16 }, w);
    txt(w, x, 680, a, 34, { font: "Serif", weight: 700 }); txt(w, x, 860, b, 48, { font: "Serif", weight: 700, fill: i === 3 ? C.accent : C.ink }); return { w, a: m(k) };
  });
  const me = member(g, "mathyas"); const sweat = el("g", {}, g);
  [[-20, 0], [10, -14], [30, 6]].forEach(([x, y]) => el("path", { ...D.line, "stroke-width": 3, fill: C.face, d: `M${x} ${y} q6 10 0 14 q-6 -4 0 -14 Z` }, sweat));
  const no = pill(g, 760, 400, "TRAVAILLER JUSQU'À 70 ANS ?", { bg: C.face, size: 24 }), x = check(g, false);
  return t => {
    show(head, fade(t, m(1) - 0.5));
    P.forEach(p => { p.w.style.opacity = fade(t, p.a - 0.3); });
    const tired = ease(prog(t, m(6) - 0.5, m(6)));
    me.at(t, m(6) - 0.8, 1400, 560 + 0 * tired, { scale: 0.62, armL: 105 + 30 * tired, armR: 75 - 20 * tired, k: 1 });
    place(sweat, 1410, 300, pop(t, m(6)) * 0.9);
    place(no.g, no.x, no.y, pop(t, m(6) - 0.3)); place(x, no.x + no.w / 2 + 40, no.y, pop(t, m(6)));
  };
});

// ---- 04 · Le taux de remplacement ----
SC("04", "LE TAUX DE REMPLACEMENT", (g, A) => {
  const m = A.m, head = title(g, 190, "La perte de revenu à la retraite");
  el("path", { ...D.line, "stroke-width": 6, d: "M300 860 L1620 860" }, g);
  const avant = el("rect", { ...D.line, fill: C.inkSoft, x: 420, width: 300, rx: 8 }, g), apres = el("rect", { ...D.line, fill: C.accentSoft, x: 1180, width: 300, rx: 8 }, g);
  const nA = big(g, 570, 0, "", 50, C.paper), nB = big(g, 1330, 0, "", 50);
  const lA = txt(g, 570, 910, "AUJOURD'HUI", 24, { weight: 800, ls: 5, fill: C.inkSoft }), lB = txt(g, 1330, 910, "À LA RETRAITE", 24, { weight: 800, ls: 5, fill: C.inkSoft });
  const niveau = el("path", { fill: "none", stroke: C.ink, "stroke-width": 4, "stroke-dasharray": "14 12", d: "M720 360 L1560 360" }, g);
  const taux = pill(g, 960, 560, "TAUX DE REMPLACEMENT ≈ 50 %", { bg: C.accent, size: 24 });
  const gap = el("path", { ...D.line, stroke: C.accent, "stroke-width": 8, d: "M1330 370 L1330 590 M1310 570 L1330 594 L1350 570" }, g);
  const perte = txt(g, 1380, 480, "Perte à combler", 34, { anchor: "start", font: "Serif", weight: 700, fill: C.accent });
  const boost = pill(g, 960, 990, "LE SYSTÈME A BESOIN D'UN COUP DE BOOST", { bg: C.ink, fg: C.paper, size: 24 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const hA = 500 * ease(prog(t, m(4) - 0.4, m(4) + 0.3)), hB = 250 * ease(prog(t, m(5) - 0.4, m(5) + 0.3));
    avant.setAttribute("y", 860 - hA); avant.setAttribute("height", hA); avant.style.opacity = hA > 1 ? 1 : 0; nA.setAttribute("y", 860 - hA / 2 + 18); nA.textContent = hA > 40 ? "2 000 €" : "";
    apres.setAttribute("y", 860 - hB); apres.setAttribute("height", hB); apres.style.opacity = hB > 1 ? 1 : 0; nB.setAttribute("y", 860 - hB / 2 + 18); nB.textContent = hB > 40 ? "1 000 €" : "";
    lA.style.opacity = fade(t, m(4) - 0.3); lB.style.opacity = fade(t, m(5) - 0.3);
    place(taux.g, taux.x, taux.y - 220, pop(t, m(3) - 0.3) * out(t, m(6) - 0.4));
    niveau.style.opacity = fade(t, m(6) - 0.4); gap.style.opacity = fade(t, m(6) - 0.2); perte.style.opacity = fade(t, m(6));
    place(boost.g, boost.x, boost.y, pop(t, m(7) - 0.3));
  };
});

// ---- 05 · La naissance du nouveau PER ----
SC("05", "LE NOUVEAU PER", (g, A) => {
  const m = A.m, head = title(g, 190, "Le nouveau plan d'épargne retraite");
  const cal = calendar(g, "2019"); const pacte = pill(g, 400, 760, "LOI PACTE", { bg: C.accent, size: 28 });
  const olds = ["PERP", "MADELIN", "ARTICLE 83", "PERCO"].map((n, i) => { const c = contrat(g, n, { size: 20 }); return { c, x: 900, y: 340 + i * 170 }; });
  const neo = el("g", {}, g); el("circle", { ...D.line, fill: C.ink, r: 150 }, neo); txt(neo, 0, 20, "PER", 72, { font: "Serif", weight: 700, fill: C.paper });
  const tr = pill(g, 1500, 900, "TRANSFERT POSSIBLE", { bg: C.face, size: 22 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(cal.g, 400, 520, pop(t, m(2) - 0.4) * 1.3); place(pacte.g, pacte.x, pacte.y, pop(t, m(2)));
    const go = ease(prog(t, m(5) - 0.3, m(5) + 0.8));
    olds.forEach((o, i) => place(o.c.g, lerp(o.x, 1500, go), lerp(o.y, 560, go), pop(t, m(4) - 0.6 + i * 0.2) * 0.7 * (1 - go)));
    place(neo, 1500, 560, pop(t, m(3) - 0.2) * (1 + 0.1 * Math.sin(Math.PI * go)));
    place(tr.g, tr.x, tr.y - 120, pop(t, m(5)));
  };
});

// ---- 06 · Deux phases ----
SC("06", "LE FONCTIONNEMENT DU PER", (g, A) => {
  const m = A.m, head = title(g, 190, "Deux phases");
  el("path", { ...D.line, "stroke-width": 6, d: "M120 820 L1800 820 M960 790 L960 860" }, g);
  const t1 = txt(g, 120, 900, "Aujourd'hui", 26, { anchor: "start", weight: 700, fill: C.inkSoft }), t2 = txt(g, 960, 900, "départ à la retraite", 26, { weight: 700, fill: C.inkSoft });
  const ep = card(g, 800, 200, { fill: C.ink }); txt(ep, 0, -40, "VOTRE ÉPARGNE", 26, { weight: 800, ls: 6, fill: C.accent });
  const dd = txt(ep, 0, 36, "Versements 100 % déductibles", 40, { font: "Serif", weight: 700, fill: C.paper });
  const re = card(g, 800, 200, { fill: C.accent }); txt(re, 0, -40, "VOTRE RETRAITE", 26, { weight: 800, ls: 6, fill: C.ink });
  const pile = el("g", {}, g); stack(pile, 1, 34); const piles = [0, 1, 2, 3, 4, 5].map(i => { const s = el("g", {}, g); stack(s, 2 + i, 26); return s; });
  const ren = pill(g, 0, 0, "RENTE", { bg: C.face, size: 26 }), cap = pill(g, 0, 0, "CAPITAL", { bg: C.face, size: 26 });
  return t => {
    show(head, fade(t, m(1) - 0.5)); t1.style.opacity = fade(t, m(2) - 0.4); t2.style.opacity = fade(t, m(3) - 0.4);
    place(ep, 540, 680, pop(t, m(2) - 0.3)); dd.style.opacity = fade(t, m(4) - 0.3);
    place(re, 1380, 680, pop(t, m(3) - 0.3));
    piles.forEach((p, i) => place(p, 220 + i * 120, 520, pop(t, m(5) - 0.5 + i * 0.12) * 0.9));
    place(ren.g, 1240, 470, pop(t, m(6) - 0.2)); place(cap.g, 1540, 470, pop(t, m(7) - 0.2));
  };
});

// ---- 07 · Pendant que tu épargnes ----
SC("07", "PENDANT QUE TU ÉPARGNES", (g, A) => {
  const m = A.m, head = title(g, 190, "Pendant la phase d'épargne");
  const L = [ligne(g, "Une économie d'impôt", m(1), 330), ligne(g, "Ce n'est pas un livret : c'est de l'investissement", m(2), 420),
    ligne(g, "Gestion pilotée ou libre", m(3), 510), ligne(g, "De la performance…", m(4), 600), ligne(g, "… et de la sécurité quand tu veux", m(5), 690),
    ligne(g, "Une garantie en cas d'accident de la vie", m(6), 780), ligne(g, "… et en cas de décès", m(7), 870)];
  const lv = livret(g, "LIVRET A"); const no = check(g, false);
  const cv = courbe(g, 420, 200, marche(30, 7, 0.55, 0.14)); const sh = el("g", {}, g); shield(sh);
  const um = el("g", {}, g); el("path", { ...D.line, fill: C.accent, d: "M-110 0 Q0 -110 110 0 Q80 -16 55 0 Q28 -16 0 0 Q-28 -16 -55 0 Q-80 -16 -110 0 Z" }, um); el("path", { ...D.line, "stroke-width": 6, d: "M0 0 L0 90 Q0 110 -20 104" }, um);
  return t => {
    show(head, fade(t, m(1) - 0.5));
    L.forEach(l => place(l.r, 260, l.y, pop(t, l.a - 0.3)));
    place(lv, 1450, 420, pop(t, m(2) - 0.2) * out(t, m(3) - 0.2) * 0.9); place(no, 1510, 360, pop(t, m(2) + 0.2) * out(t, m(3) - 0.2));
    place(cv.g, 1450, 470, pop(t, m(4) - 0.3) * out(t, m(6) - 0.4)); place(sh, 1700, 640, pop(t, m(5) - 0.2) * out(t, m(6) - 0.4) * 0.8);
    place(um, 1460, 640, pop(t, m(6) - 0.2) * 1.2);
  };
});

// ---- 08 · Les protections du PER ----
SC("08", "LES PROTECTIONS DU PER", (g, A) => {
  const m = A.m, head = title(g, 190, "À la retraite, et au-delà");
  const card1 = card(g, 760, 300, { fill: C.accentSoft }); txt(card1, 0, -90, "HORS DROITS DE SUCCESSION", 24, { weight: 800, ls: 5, fill: C.inkSoft });
  const n152 = txt(card1, 0, 0, "152 500 €", 80, { font: "Serif", weight: 700 }); txt(card1, 0, 50, "par bénéficiaire · décès avant 70 ans", 24, { weight: 500, fill: C.inkSoft });
  const same = pill(g, 520, 640, "MÊME ENVELOPPE QUE L'ASSURANCE VIE", { bg: C.accent, size: 20 });
  const lk = padlock(g); const ins = pill(g, 1400, 520, "CAPITAL ET PLUS-VALUES INSAISISSABLES", { bg: C.face, size: 20 });
  const loi = contrat(g, "NON-RÉTROACTIVITÉ DE LA LOI", { lock: true, size: 20 });
  const gj = jauge(g, 600, 60, C.accent); const gN = txt(g, 1460, 0, "", 50, { anchor: "start", font: "Serif", weight: 600 });
  const gl = txt(g, 260, 890, "Avantage fiscal aujourd'hui", 30, { anchor: "start", font: "Serif", weight: 600 });
  const disc = pill(g, 1000, 980, "DES DISCUSSIONS POUR LE RÉDUIRE", { bg: C.face, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(card1, 520, 420, pop(t, m(2) - 0.3)); n152.style.opacity = fade(t, m(3) - 0.3);
    place(same.g, same.x, same.y, pop(t, m(4) - 0.2));
    place(lk.g, 1400, 380, pop(t, m(5) - 0.3)); lk.open(0); place(ins.g, ins.x, ins.y, pop(t, m(5)));
    place(loi.g, 1400, 650, pop(t, m(6) - 0.2) * 0.8);
    const k8 = ease(prog(t, m(8) - 0.3, m(8) + 0.5)), k9 = ease(prog(t, m(9) - 0.2, m(9) + 0.8));
    gj.g.setAttribute("transform", "translate(820 880)"); gj.g.style.opacity = fade(t, m(8) - 0.4); gl.style.opacity = fade(t, m(8) - 0.4);
    const v = k8 * (1 - 0.4 * k9); gj.set(v); gN.setAttribute("y", 900); gN.textContent = k8 <= 0 ? "" : k9 > 0.5 ? "75 % ? 50 % ?" : "100 %";
    place(disc.g, disc.x, disc.y, pop(t, m(9)));
  };
});

// ---- 09 · Bloqué jusqu'à la retraite… sauf ----
SC("09", "BLOQUÉ… SAUF", (g, A) => {
  const m = A.m, head = title(g, 190, "Bloqué jusqu'à la retraite… sauf");
  const lk = padlock(g);
  const cas = [["Achat de la résidence principale", 3], ["Fin des droits au chômage", 4], ["Décès du conjoint", 5], ["Invalidité", 6], ["Surendettement", 7]].map(([s, k], i) => {
    const r = el("g", {}, g); el("circle", { ...D.line, fill: C.face, r: 28 }, r); txt(r, 0, 10, String(i + 1), 28, { font: "Serif", weight: 700 });
    txt(r, 50, 11, s, 34, { anchor: "start", font: "Serif", weight: 600 }); return { r, a: m(k), y: 330 + i * 92 };
  });
  const rep = pill(g, 960, 870, "L'ÉCONOMIE D'IMPÔT, C'EST UN REPORT", { bg: C.ink, fg: C.paper, size: 26 });
  const inA = arrow(g, 420, 730, 420, 620, m(9) - 0.4, m(9), { color: C.ink }), outA = arrow(g, 1500, 620, 1500, 730, m(10) - 0.4, m(10), { color: C.accent });
  const lIn = txt(g, 420, 780, "− à l'entrée : 30 %", 32, { font: "Serif", weight: 700 }), lOut = txt(g, 1500, 780, "+ à la sortie : 11 % ?", 32, { font: "Serif", weight: 700, fill: C.accent });
  const tmi = pill(g, 960, 990, "À LA RETRAITE, TES REVENUS BAISSENT… TA TRANCHE AUSSI", { bg: C.accent, size: 20 });
  return t => {
    const p1 = out(t, m(8) - 0.5);
    show(head, fade(t, A.s));
    place(lk.g, 300, 560, pop(t, m(1) - 0.4) * 1.6 * (0.6 + 0.4 * p1)); lk.open(ease(prog(t, m(2) - 0.2, m(2) + 0.4)) * p1);
    cas.forEach(c => place(c.r, 620, c.y, pop(t, c.a - 0.3) * p1));
    place(rep.g, rep.x, rep.y - 420, pop(t, m(8) - 0.2));
    inA.render(t); outA.render(t); lIn.style.opacity = fade(t, m(9)); lOut.style.opacity = fade(t, m(10));
    place(tmi.g, tmi.x, tmi.y, pop(t, m(11) - 0.3));
  };
});
