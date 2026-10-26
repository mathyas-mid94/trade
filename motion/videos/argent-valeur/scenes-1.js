// Parties 00 à 06 : accroche, support / résistance, la courbe, la correction, les footballeurs, la solution, la balance.
const X0 = 360, X1 = 1640, SUP = 840, RES = 330;   // le graphique commun

// ---- 00 · Accroche (plan serré, fond sombre) ----
SC("00", "L'ARGENT SUIT LA VALEUR", (g, A) => {
  const m = A.m;
  const bg = el("rect", { width: 1920, height: 1080, fill: C.ink }, g); g.insertBefore(bg, g.firstChild);
  const cone = el("path", { fill: C.paperDeep, d: "M440 0 L620 0 L820 940 L240 940 Z" }, g);
  el("ellipse", { fill: C.accentSoft, cx: 530, cy: 930, rx: 300, ry: 40 }, g);
  const pieces = [0, 1, 2, 3, 4, 5].map(() => coin(g, 26));
  const me = marcheur(g, { vest: C.accent });
  const q1 = big(g, 1280, 300, "Tu veux gagner plus d'argent ?", 62, C.paper), q2 = txt(g, 1280, 370, "Normal. Tout le monde veut ça.", 34, { weight: 600, fill: C.accentSoft });
  const q3 = big(g, 1280, 520, "Combien tu gagnes ?", 56, C.paper), barre = el("path", { ...D.line, stroke: C.accent, "stroke-width": 8 }, g);
  const q4 = big(g, 1280, 630, "Combien tu vaux.", 72, C.accent);
  const leit = big(g, 1280, 390, "L'argent suit la valeur.", 78, C.paper);
  const val = el("path", { ...D.line, fill: C.accent, d: "M0 -40 L32 0 L0 40 L-32 0 Z" }, g), suit = [0, 1, 2].map(() => coin(g, 22));
  const p1 = pl(g, 1100, 820, "POURQUOI", { size: 22 }), p2 = pl(g, 1450, 820, "COMMENT T'EN SERVIR", { bg: C.accent, size: 22 });
  return t => {
    cone.style.opacity = fade(t, A.s, 0.8);
    me.at(t, [[A.s + 0.2, 530, 920]], { armR: t > m(1) - 0.2 && t < m(5) ? -35 : undefined, armL: t > m(4) - 0.2 && t < m(5) ? 215 : undefined });
    pieces.forEach((c, i) => { const k = prog(t, m(1) + i * 0.25, m(1) + i * 0.25 + 1.3);
      place(c, 380 + i * 60, lerp(-60, 900, k * k), k > 0 && k < 1 ? 1 : 0); });
    const k1 = out(t, m(5) - 0.6);
    show(q1, fade(t, m(1) - 0.4) * k1); show(q2, fade(t, m(2) - 0.3) * k1);
    show(q3, fade(t, m(3) - 0.3) * k1); show(q4, pop(t, m(4) - 0.2) * k1);
    const kb = ease(prog(t, m(4) - 0.3, m(4) + 0.1)); barre.setAttribute("d", `M1030 504 L${lerp(1030, 1530, kb)} 504`); barre.style.opacity = kb > 0 ? k1 : 0;
    show(leit, fade(t, m(5) - 0.2));
    // la valeur avance, l'argent la suit
    const path = u => [lerp(980, 1760, u), 600 + 50 * Math.sin(u * 7)], kv = prog(t, m(5), A.e), u = (kv * 1.6) % 1.2;
    const [vx, vy] = path(Math.min(1, u)); place(val, vx, vy, fade(t, m(5)) * (u < 1 ? 1 : 0));
    suit.forEach((c, i) => { const ui = u - 0.07 * (i + 1); const [cx, cy] = path(Math.max(0, Math.min(1, ui))); place(c, cx, cy, fade(t, m(5) + 0.3) * (ui > 0 && ui < 1 ? 1 : 0)); });
    on(p1, pop(t, m(6) - 0.3)); on(p2, pop(t, m(7) - 0.3));
  };
});

// ---- 01 · Ton empreinte financière ----
SC("01", "TON EMPREINTE FINANCIÈRE", (g, A) => {
  const m = A.m, head = title(g, 190, "Ton empreinte financière");
  const gr = graphe(g, X0, X1, SUP, RES), bg = bougies(g, 26, 1180, 420); bg.g.setAttribute("transform", "translate(1000 590)");
  const me = marcheur(g, { vest: C.accent }, 0.75), tr = pl(g, 200, 520, "TRADER", { size: 18 });
  const lS = pl(g, 1460, 965, "SUPPORT · LE PLANCHER", { bg: C.ink, fg: C.paper, size: 20 }), lR = pl(g, 1460, 275, "RÉSISTANCE · LE PLAFOND", { bg: C.accent, size: 20 });
  const dep = pl(g, 640, 965, "TON POINT DE DÉPART", { size: 20 });
  const sit = pl(g, 1000, 560, "TA SITUATION FINANCIÈRE", { size: 20 }), vaux = pl(g, 1000, 630, "SURTOUT : CE QUE TU VAUX EN TANT QUE PERSONNE", { bg: C.accentSoft, size: 20 });
  const B = [["Compétences", 9], ["Connaissances", 10], ["Façon d'être", 11]].map(([s, k], i) => ({ c: bloc(g, 300, 80, s, "", { size: 30 }), k, x: 680 + i * 320 }));
  return t => {
    show(head, fade(t, m(1) - 0.6));
    me.at(t, [[m(1) - 0.2, 200, 960]], { armR: t > m(2) - 0.2 && t < m(3) ? -20 : undefined }); on(tr, pop(t, m(1)));
    const kd = out(t, m(3), 0.8) * 0.75 + 0.25;
    bg.B.forEach((b, i) => { b.style.opacity = prog(t, m(2) - 0.3 + i * 0.05, m(2) - 0.1 + i * 0.05) * kd; });
    gr.set(ease(prog(t, m(4) - 0.4, m(4) + 0.6)), ease(prog(t, m(5) - 0.4, m(5) + 0.6)));
    gr.ax.style.opacity = fade(t, m(2) - 0.6);
    on(lS, pop(t, m(4) + 0.2)); on(lR, pop(t, m(5) + 0.2)); on(dep, pop(t, m(6) - 0.2));
    gr.sup.setAttribute("stroke-width", 9 + 5 * Math.max(0, Math.sin(Math.PI * prog(t, m(6) - 0.3, m(6) + 0.9))));
    on(sit, pop(t, m(7) - 0.3) * out(t, m(9) - 0.5)); on(vaux, pop(t, m(8) - 0.3));
    B.forEach(b => place(b.c, b.x, 790, pop(t, m(b.k) - 0.3)));
  };
});

// ---- 02 · La courbe et le plafond ----
SC("02", "LA COURBE DE TES REVENUS", (g, A) => {
  const m = A.m, head = title(g, 190, "La courbe de tes revenus");
  const gr = graphe(g, X0, X1, SUP, RES);
  const lS = pl(g, 1460, 965, "SUPPORT", { bg: C.ink, fg: C.paper, size: 20 }), lR = pl(g, 1460, 275, "RÉSISTANCE", { bg: C.accent, size: 20 });
  const c1 = trace(g, courbeXY(X0, X1, u => SUP - 330 * (u < 0.35 ? Math.sin(u / 0.35 * Math.PI / 2) : u < 0.62 ? 1 : 1 - 0.8 * Math.sin((u - 0.62) / 0.38 * Math.PI / 2))));
  const L1 = [["ELLE MONTE…", 3, 560, 420], ["… OU ELLE STAGNE", 4, 1000, 450], ["ELLE PEUT AUSSI BAISSER", 5, 1430, 620]].map(([s, k, x, y]) => ({ p: pl(g, x, y, s, { size: 20 }), k }));
  const f1 = pl(g, 600, 1035, "TU FAIS N'IMPORTE QUOI", { size: 20 }), f2 = pl(g, 1180, 1035, "TU ARRÊTES DE GRANDIR AVEC TON ARGENT", { bg: C.accentSoft, size: 20 });
  const c2 = trace(g, courbeXY(X0, X1, u => u < 0.5 ? SUP - (SUP - RES - 12) * Math.sin(u / 0.5 * Math.PI / 2) : RES + 12 + 28 * Math.abs(Math.sin((u - 0.5) * 22)) * (1 - u)), { color: C.inkSoft });
  const pq = pl(g, 1000, 560, "POURQUOI ? DEUX RAISONS", { bg: C.ink, fg: C.paper, size: 22 });
  const r1 = bloc(g, 520, 130, "Ils se fixent des limites", "pas de vision", { size: 32 }), r2 = bloc(g, 640, 130, "Leur valeur n'avance pas", "au même rythme que leur argent", { size: 32, fill: C.ink });
  return t => {
    show(head, fade(t, A.s, 0.6)); gr.set(1, 1); gr.g.style.opacity = fade(t, A.s, 0.6); on(lS, fade(t, A.s)); on(lR, fade(t, A.s));
    const k1 = m(1) + 0.2 < m(3) ? 0 : 0;
    c1.set(t < m(3) ? 0.35 * ease(prog(t, m(1) - 0.2, m(3))) : t < m(4) ? lerp(0.35, 0.62, ease(prog(t, m(3), m(4)))) : lerp(0.62, 1, ease(prog(t, m(5) - 0.4, m(6)))) + k1);
    c1.g.style.opacity = 1 - 0.75 * fade(t, m(8) - 0.5) - 0.25 * fade(t, m(10) - 0.4);
    L1.forEach(l => on(l.p, pop(t, m(l.k) - 0.3) * out(t, m(8) - 0.5)));
    on(f1, pop(t, m(6) - 0.3) * out(t, m(10) - 0.5)); on(f2, pop(t, m(7) - 0.3) * out(t, m(10) - 0.5));
    c2.set(ease(prog(t, m(8) - 0.6, m(9) + 0.8))); c2.g.style.opacity = out(t, m(10) - 0.4) * 0.8 + 0.2;
    gr.res.setAttribute("stroke-width", 9 + 7 * Math.max(0, Math.sin(Math.PI * prog(t, m(9) - 0.2, m(9) + 0.8))));
    on(pq, pop(t, m(10) - 0.3) * out(t, m(11) - 0.4));
    place(r1, 680, 590, pop(t, m(11) - 0.3)); place(r2, 1300, 590, pop(t, m(12) - 0.3));
  };
});

// ---- 03 · Le retour au support ----
SC("03", "LE RETOUR AU SUPPORT", (g, A) => {
  const m = A.m, head = title(g, 190, "Quand l'argent va plus vite que toi");
  const gr = graphe(g, X0, X1, SUP, RES);
  const val = trace(g, courbeXY(X0, X1, u => SUP - 150 * u), { color: C.ink, dot: C.ink, r: 12 });
  const up = trace(g, courbeXY(X0, 1180, u => SUP - 470 * Math.pow(u, 1.4)), { color: C.accent, dot: C.accent });
  const dn = trace(g, courbeXY(1180, X1, u => SUP - 470 + 460 * Math.sin(u * Math.PI / 2)), { color: C.accent, dot: C.accent });
  const lA = txt(g, 1120, 300, "ton argent", 26, { weight: 800, fill: C.accent }), lV = txt(g, 1640, 665, "ta valeur", 26, { anchor: "end", weight: 800 });
  const dz = pl(g, 960, 280, "C'EST LÀ QUE ÇA DEVIENT DANGEREUX", { bg: C.ink, fg: C.paper, size: 20 });
  const cor = pl(g, 1440, 470, "LE MARCHÉ CORRIGE", { bg: C.accent, size: 20 }), ret = pl(g, 1440, 965, "RETOUR AU SUPPORT", { bg: C.ink, fg: C.paper, size: 20 });
  const dp = depart(g);
  return t => {
    show(head, fade(t, A.s, 0.6)); gr.set(1, 1); gr.g.style.opacity = fade(t, A.s, 0.6);
    on(dz, pop(t, m(1) - 0.3) * out(t, m(3) - 0.4));
    val.set(ease(prog(t, m(2) - 0.5, m(3) + 1.6)));
    up.set(ease(prog(t, m(2) - 0.5, m(3) - 0.2))); show(lA, fade(t, m(3) - 0.5) * out(t, m(3) + 0.6));
    dn.set(ease(prog(t, m(3), m(4) + 0.3))); up.dot.style.opacity = t < m(3) ? up.dot.style.opacity : 0;
    show(lV, fade(t, m(3) + 1.2));
    on(cor, pop(t, m(3) - 0.2) * out(t, m(4) + 0.6)); on(ret, pop(t, m(4) - 0.3));
    gr.sup.setAttribute("stroke-width", 9 + 6 * Math.max(0, Math.sin(Math.PI * prog(t, m(4) - 0.2, m(4) + 0.8))));
    place(dp, 1500, 430, pop(t, m(5) - 0.3), -6 * Math.sin(Math.min(1, prog(t, m(5), m(5) + 1)) * Math.PI * 2));
  };
});

// ---- 04 · Les footballeurs ----
SC("04", "LES FOOTBALLEURS", (g, A) => {
  const m = A.m, head = title(g, 190, "Regarde les footballeurs");
  el("path", { ...D.line, "stroke-width": 4, d: "M120 880 L1800 880" }, g);
  const joueur = marcheur(g, { vest: C.accent }, 0.8), b = ballon(g, 30);
  const piles = Array.from({ length: 12 }, () => coin(g, 34)), mil = big(g, 640, 430, "des millions", 50, C.accent);
  const cv = pl(g, 1350, 300, "IL CRÉE DE LA VALEUR", { bg: C.ink, fg: C.paper, size: 22 });
  const V = [[maillot(g), "MAILLOTS", 4, 1050], [tele(g), "DROITS TÉLÉ", 5, 1350], [stade(g).g, "STADES PLEINS", 6, 1650]].map(([o, s, k, x]) => ({ o, l: txt(g, x, 700, s, 22, { weight: 800, ls: 4 }), k, x }));
  const fort = el("rect", { ...D.line, fill: C.accent, x: 1080, width: 160 }, g), evo = el("rect", { ...D.line, fill: C.ink, x: 1400, width: 160 }, g);
  const lf = txt(g, 1160, 930, "SA FORTUNE", 22, { weight: 800, ls: 3 }), le = txt(g, 1480, 930, "SON ÉVOLUTION", 22, { weight: 800, ls: 3 });
  const chute = pl(g, 1320, 300, "LA CHUTE EST BRUTALE", { bg: C.accent, size: 22 });
  const P = [["IL ARRÊTE D'APPRENDRE", 10], ["IL PENSE TOUT SAVOIR", 11], ["IL VIT SANS HUMILITÉ", 12]].map(([s, k], i) => ({ p: pl(g, 560, 330 + i * 64, s, { size: 20 }), k }));
  const jv = pl(g, 560, 560, "IL REDESCEND À SA JUSTE VALEUR", { bg: C.ink, fg: C.paper, size: 20 });
  return t => {
    show(head, fade(t, A.s, 0.6));
    const fin = t > m(7) - 0.2;
    joueur.at(t, [[m(1) - 0.3, 330, 880]], { armR: fin ? 60 : -10 + 20 * Math.sin(t * 3), armL: fin ? 120 : undefined });
    const bx = fin ? 420 + 300 * ease(prog(t, m(7) - 0.2, m(7) + 1.4)) : 420, by = fin ? 850 : 850 - 120 * Math.abs(Math.sin(t * 3.2));
    place(b, bx, by, pop(t, m(1) - 0.3) * out(t, m(9) - 0.3), fin ? (bx - 420) * 1.2 : 0);
    const n = Math.floor(12 * ease(prog(t, m(2) - 0.4, m(2) + 1.4))), kc = prog(t, m(9) - 0.2, m(9) + 0.9);
    piles.forEach((c, i) => { const y = 860 - i * 30; place(c, 640 + kc * 140 * Math.sin(i * 2.3), lerp(y, 880 + 10 * (i % 3), ease(kc)), i < n ? 1 : 0, kc * 50 * Math.sin(i)); });
    show(mil, fade(t, m(2) - 0.3) * out(t, m(9)));
    const kv = out(t, m(7) - 0.5);
    on(cv, pop(t, m(3) - 0.3) * kv);
    V.forEach(v => { place(v.o, v.x, 520, pop(t, m(v.k) - 0.3) * kv); show(v.l, fade(t, m(v.k)) * kv); });
    const kb = fade(t, m(8) - 0.4), hf = lerp(480, 140, ease(prog(t, m(9) - 0.2, m(9) + 0.8))) * kb, he = 140 * kb;
    fort.setAttribute("y", 880 - hf); fort.setAttribute("height", hf); evo.setAttribute("y", 880 - he); evo.setAttribute("height", he);
    fort.style.opacity = evo.style.opacity = kb; show(lf, kb); show(le, kb);
    on(chute, pop(t, m(9) - 0.2) * out(t, m(10) - 0.5));
    P.forEach(p => on(p.p, pop(t, m(p.k) - 0.3))); on(jv, pop(t, m(13) - 0.3));
  };
});

// ---- 05 · Monter ton support, casser ta résistance ----
SC("05", "LA SOLUTION", (g, A) => {
  const m = A.m, head = title(g, 190, "Alors, la solution ?");
  const gr = graphe(g, X0, X1, SUP, RES);
  const rl = el("path", { ...D.line, stroke: C.accent, "stroke-width": 9, "stroke-dasharray": "28 18", d: `M${X0} ${RES} L1000 ${RES}` }, g);
  const rr = el("path", { ...D.line, stroke: C.accent, "stroke-width": 9, "stroke-dasharray": "28 18", d: `M1000 ${RES} L${X1} ${RES}` }, g);
  const eclats = [0, 1, 2, 3, 4].map(i => el("path", { ...D.line, stroke: C.accent, "stroke-width": 5, d: `M0 0 L${30 * Math.cos(i * 1.25)} ${30 * Math.sin(i * 1.25)}` }, g));
  const me = marcheur(g, { vest: C.accent }, 0.6);
  const lS = pl(g, 1460, 965, "TON SUPPORT MONTE", { bg: C.ink, fg: C.paper, size: 20 });
  const Q = [["ÉVOLUER EN TANT QUE PERSONNE", 3], ["TE REMETTRE EN QUESTION", 4], ["ÊTRE ALTRUISTE…", 5], ["… ET ÉGOÏSTE QUAND IL LE FAUT", 6]].map(([s, k], i) => ({ p: pl(g, 1220, 430 + i * 60, s, { bg: i === 0 ? C.accentSoft : C.face, size: 20 }), k }));
  const pp = pl(g, 960, 260, "ARRÊTE DE TE FIXER DES PLAFONDS", { bg: C.accent, size: 22 });
  const cit = card(g, 1120, 170, { fill: C.ink });
  txt(cit, 0, -14, "« Se fixer une limite, c'est l'un des meilleurs moyens", 32, { font: "Serif", weight: 600, fill: C.paper });
  txt(cit, 0, 34, "de ne jamais atteindre ses objectifs. »", 32, { font: "Serif", weight: 600, fill: C.paper });
  const auj = marcheur(g, { vest: C.inkSoft }, 0.55), dem = marcheur(g, { vest: C.accent }, 0.8);
  const la = txt(g, 980, 0, "aujourd'hui", 26, { weight: 800 }), ld = txt(g, 1440, 0, "demain", 26, { weight: 800, fill: C.accent });
  const fl = el("path", { ...D.line, stroke: C.accent, "stroke-width": 7 }, g);
  const pa = pl(g, 1210, 330, "POUR TOI, ET POUR LES AUTRES", { bg: C.accentSoft, size: 22 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const ys = lerp(SUP, 690, ease(prog(t, m(2) - 0.2, m(2) + 1.4)));
    gr.set(1, 0, ys); gr.g.style.opacity = fade(t, A.s, 0.6);
    on(lS, pop(t, m(2))); lS.g.setAttribute("transform", `translate(1460 ${965 - (SUP - ys) * 0}) scale(${pop(t, m(2))})`);
    me.at(t, [[A.s + 0.3, 700, ys]], { armR: t > m(7) - 0.3 ? -40 : undefined, armL: t > m(7) - 0.3 ? 220 : undefined });
    const kb = ease(prog(t, m(7) - 0.2, m(7) + 1.0));
    rl.setAttribute("transform", `translate(${-220 * kb} ${-20 * kb}) rotate(${-6 * kb} ${X0} ${RES})`); rr.setAttribute("transform", `translate(${220 * kb} ${-20 * kb}) rotate(${6 * kb} ${X1} ${RES})`);
    rl.style.opacity = rr.style.opacity = fade(t, A.s, 0.6) * (1 - kb);
    eclats.forEach((e, i) => { const k = prog(t, m(7) - 0.1, m(7) + 0.8); e.setAttribute("transform", `translate(${1000 + k * 120 * Math.cos(i * 1.25)} ${RES + k * 120 * Math.sin(i * 1.25)})`); e.style.opacity = k > 0 && k < 1 ? 1 - k : 0; });
    const kq = out(t, m(9) - 0.5);
    Q.forEach(q => on(q.p, pop(t, m(q.k) - 0.3) * kq));
    on(pp, pop(t, m(8) - 0.3) * out(t, m(10) - 0.5));
    place(cit, 1060, 520, pop(t, m(9) - 0.3) * out(t, m(10) - 0.4));
    const kd = fade(t, m(10) - 0.2);
    auj.at(t, [[m(11) - 0.2, 980, ys]], { k: pop(t, m(11) - 0.3) }); dem.at(t, [[m(12) - 0.2, 1440, ys]], { k: pop(t, m(12) - 0.3), armR: -30 });
    la.setAttribute("y", ys + 50); ld.setAttribute("y", ys + 50); show(la, fade(t, m(11)) * kd); show(ld, fade(t, m(12)) * kd);
    const kf = ease(prog(t, m(12) - 0.3, m(12) + 0.6)); fl.setAttribute("d", `M1060 ${ys - 120} Q1210 ${ys - 220} ${lerp(1060, 1360, kf)} ${ys - 120 - 100 * Math.sin(Math.PI * kf) + (kf < 1 ? 0 : 0)}`); fl.style.opacity = kf > 0 ? 1 : 0;
    on(pa, pop(t, m(13) - 0.3));
  };
});

// ---- 06 · La polarisation de l'argent ----
SC("06", "LA POLARISATION DE L'ARGENT", (g, A) => {
  const m = A.m, head = title(g, 190, "Ta relation à l'argent");
  const bal = balance(g);
  const sale = coin(bal.pans[0], 30), xs = check(bal.pans[0], false); sale.setAttribute("transform", "translate(-30 120)"); xs.setAttribute("transform", "translate(40 110) scale(0.8)");
  const obs = [0, 1, 2, 3].map(i => { const c = coin(bal.pans[1], 30); c.setAttribute("transform", `translate(${-36 + 24 * (i % 3)} ${128 - 22 * i})`); return c; });
  const lsale = pl(g, 520, 0, "L'ARGENT, C'EST SALE", { size: 20 }), lobs = pl(g, 1400, 0, "L'ARGENT, UNE OBSESSION", { bg: C.accentSoft, size: 20 });
  const ctr = pl(g, 960, 330, "L'OBJECTIF : ÊTRE AU CENTRE", { bg: C.ink, fg: C.paper, size: 22 });
  const nb = pl(g, 960, 980, "NI BON NI MAUVAIS", { size: 22 }), outil = pl(g, 960, 1040, "UN OUTIL", { bg: C.accent, size: 22 }), eng = engrenage(g, 0.7);
  const fait = big(g, 960, 300, "Un fait : il suit la valeur.", 56);
  const joueur = marcheur(g, { vest: C.accent }, 0.7), b = ballon(g, 24);
  const fans = Array.from({ length: 18 }, (_, i) => el("circle", { ...D.line, "stroke-width": 3, fill: i % 2 ? C.accentSoft : C.face, r: 16 }, g));
  const bv = el("rect", { ...D.line, fill: C.ink, x: 700, width: 120 }, g), bs = el("rect", { ...D.line, fill: C.accent, x: 880, width: 120 }, g);
  const lv = txt(g, 760, 920, "VALEUR", 20, { weight: 800, ls: 3 }), ls = txt(g, 940, 920, "SALAIRE", 20, { weight: 800, ls: 3 });
  const logi = pl(g, 560, 1000, "RIEN DE MAGIQUE : DE LA LOGIQUE", { bg: C.accentSoft, size: 20 });
  const moi = marcheur(g, { vest: C.accent, hair: "f" }, 0.7), lui = marcheur(g, { vest: C.ink }, 0.7);
  const sac = [0, 1, 2, 3, 4].map(() => coin(g, 28)), cad = cadeau(g);
  const lw = pl(g, 1250, 400, "L'ARGENT QUE TU VEUX…", { size: 20 }), ld = pl(g, 1600, 460, "… QUELQU'UN D'AUTRE L'A DÉJÀ", { bg: C.accentSoft, size: 20 });
  const ech = pl(g, 1420, 1000, "APPORTE QUELQUE CHOSE QUI VAUT L'ÉCHANGE", { bg: C.ink, fg: C.paper, size: 20 });
  return t => {
    show(head, fade(t, m(1) - 0.6));
    const kB = out(t, m(8) - 0.6);
    bal.g.setAttribute("transform", `translate(960 900) scale(${pop(t, m(1) - 0.4) * kB})`); bal.g.style.opacity = kB > 0.01 ? 1 : 0;
    const a = t < m(2) - 0.3 ? 0 : t < m(3) - 0.3 ? -14 * ease(prog(t, m(2) - 0.3, m(2) + 0.5)) : t < m(5) - 0.3 ? lerp(-14, 14, ease(prog(t, m(3) - 0.3, m(3) + 0.5))) * (t > m(4) ? Math.cos((t - m(4)) * 2.2) : 1) : 14 * Math.cos((m(5) - 0.3 - m(4)) * 2.2) * (1 - ease(prog(t, m(5) - 0.3, m(5) + 0.9)));
    bal.set(a);
    sale.style.opacity = xs.style.opacity = fade(t, m(2) - 0.3); obs.forEach((c, i) => c.style.opacity = fade(t, m(3) - 0.3 + i * 0.1));
    on(lsale, pop(t, m(2) - 0.2) * kB, 0, 560 + 300 * Math.sin(a * Math.PI / 180) * -1 + 70); on(lobs, pop(t, m(3) - 0.2) * kB, 0, 560 + 300 * Math.sin(a * Math.PI / 180) + 70);
    on(ctr, pop(t, m(5) - 0.3) * kB);
    on(nb, pop(t, m(6) - 0.3) * kB, 0, -80); on(outil, pop(t, m(7) - 0.3) * kB, 0, -80); place(eng, 1180, 960, pop(t, m(7) - 0.2) * kB, t * 40);
    show(fait, fade(t, m(8) - 0.3) * out(t, m(13) - 0.6));
    const kJ = out(t, m(13) - 0.6);
    joueur.at(t, [[m(9) - 0.3, 420, 880]], { k: kJ, armR: -20 }); place(b, 500, 856 - 60 * Math.abs(Math.sin(t * 3)), pop(t, m(9) - 0.3) * kJ);
    const nf = Math.floor(18 * ease(prog(t, m(9) - 0.2, m(10) + 0.5)));
    fans.forEach((f, i) => { f.setAttribute("cx", 180 + (i % 6) * 44); f.setAttribute("cy", 520 + Math.floor(i / 6) * 44); f.style.opacity = (i < nf ? 1 : 0) * kJ; });
    const hv = 320 * ease(prog(t, m(10) - 0.4, m(10) + 0.8)) * kJ, hs = 360 * ease(prog(t, m(11) - 0.4, m(11) + 0.8)) * kJ;
    bv.setAttribute("y", 880 - hv); bv.setAttribute("height", hv); bs.setAttribute("y", 880 - hs); bs.setAttribute("height", hs);
    bv.style.opacity = hv > 1 ? 1 : 0; bs.style.opacity = hs > 1 ? 1 : 0; show(lv, fade(t, m(10)) * kJ); show(ls, fade(t, m(11)) * kJ);
    on(logi, pop(t, m(12) - 0.3) * kJ);
    moi.at(t, [[m(13) - 0.3, 1150, 880]], { armR: t < m(15) - 0.3 ? -25 : undefined }); lui.at(t, [[m(14) - 0.3, 1700, 880]], { flip: true });
    const ke = ease(prog(t, m(15) - 0.3, m(15) + 1.0));
    sac.forEach((c, i) => { const x0 = 1610, y0 = 820 - i * 26; place(c, lerp(x0, 1240, ke) , lerp(y0, 820 - i * 26, ke) - Math.sin(Math.PI * ke) * 120, pop(t, m(14) - 0.2 + i * 0.06)); });
    place(cad, lerp(1240, 1610, ke), 700 - Math.sin(Math.PI * ke) * 140, pop(t, m(15) - 0.4) * 0.7);
    on(lw, pop(t, m(13) - 0.2)); on(ld, pop(t, m(14) - 0.2)); on(ech, pop(t, m(15) - 0.2));
  };
});
