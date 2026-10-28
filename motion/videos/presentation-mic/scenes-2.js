// Parties 03 à 06 : vos objectifs, ma méthode et le cercle de conseil, transparence, passer à l'action.

// ---- 03 · Vos objectifs (neuf vignettes rapides) ----
SC("03", "VOS OBJECTIFS", (g, A) => {
  const m = A.m, head = title(g, 190, "Concrètement, qu'est-ce qu'on construit ensemble ?");
  const num = txt(g, 1780, 120, "", 28, { anchor: "end", weight: 800, ls: 4, fill: C.accent });
  // fenêtres d'affichage : [début, fin] en repères
  const W = [[2, 5], [5, 7], [7, 10], [10, 12], [12, 14], [14, 17], [17, 19], [19, 21], [21, 99]];
  const NOMS = ["FAIRE FRUCTIFIER VOTRE ÉPARGNE", "RÉDUIRE VOS IMPÔTS", "INVESTIR DANS L'IMMOBILIER", "PRÉPARER VOTRE RETRAITE", "GÉNÉRER DES REVENUS PASSIFS", "LA FINANCE À IMPACT", "INVESTIR AVEC VOTRE SOCIÉTÉ", "TRANSMETTRE À VOS ENFANTS", "REPRENDRE EN MAIN VOS PLACEMENTS"];
  const V = W.map(() => el("g", {}, g)), LAB = NOMS.map(s => pl(g, 960, 270, s, { bg: C.ink, fg: C.paper, size: 24 }));
  const win = (i, t) => { const a = m(W[i][0]) - 0.35, b = W[i][1] < 99 ? m(W[i][1]) - 0.35 : A.e + 1; return fade(t, a, 0.3) * out(t, b, 0.3); };
  // 1. épargne : piles qui montent + compteur
  const ep = Array.from({ length: 5 }, (_, i) => Array.from({ length: 8 }, () => coin(V[0], 30))), cE = compteurEuro(V[0], 960, 420, 110, C.ink);
  const nE = txt(V[0], 960, 1000, "illustratif : 5 000 € + 220 €/mois à 5 %/an pendant 25 ans", 22, { weight: 600, fill: C.inkSoft });
  // 2. impôts : la note qui fond jusqu'à zéro
  const av = card(V[1], 520, 300, { fill: C.face }); txt(av, 0, -90, "VOS IMPÔTS", 28, { weight: 800, ls: 6, fill: C.inkSoft });
  const cI = big(av, 0, 40, "", 110), zero = big(V[1], 1400, 640, "0 €", 150, C.accent);
  const pI = el("path", { ...D.line, stroke: C.accent, "stroke-width": 10 }, V[1]);
  // 3. immobilier : seul, puis des biens qui poussent autour
  const solo = marcheur(V[2], { vest: C.accent }, 0.7);
  const biens = [[560, 880, "immeuble", 1.5], [1360, 880, "immeuble", 1.7], [760, 700, "house", 1.1], [1180, 700, "house", 1.2], [420, 640, "house", 0.9], [1520, 640, "immeuble", 1.0], [960, 560, "immeuble", 1.3]]
    .map(([x, y, k, s]) => { const b = el("g", {}, V[2]); D.icons[k](el("g", { transform: `scale(${s})` }, b)); return { b, x, y }; });
  // 4. retraite : barre 1 000 → 3 000 €
  const sab = el("g", { transform: "translate(560 640) scale(1.6)" }, V[3]); D.icons.sablier(sab);
  const bR = el("rect", { ...D.line, fill: C.accent, x: 1060, width: 260, rx: 10 }, V[3]), cR = big(V[3], 1190, 0, "", 72), lR = txt(V[3], 1190, 960, "par mois, par exemple", 26, { weight: 600, fill: C.inkSoft });
  el("path", { ...D.line, "stroke-width": 4, d: "M980 900 L1400 900" }, V[3]);
  // 5. revenus passifs : trois sources (loyers, coupons, dividendes) qui alimentent le compte, jour et nuit
  const SRC = [["house", "LOYERS"], ["obligation", "COUPONS"], ["bourse", "DIVIDENDES"]].map(([k, l], j) => { const b = el("g", {}, V[4]);
    el("circle", { ...D.line, fill: C.face, r: 62 }, b); D.icons[k](el("g", { transform: "scale(0.62)" }, b)); txt(b, 0, 96, l, 20, { weight: 800, ls: 3 }); return b; });
  const flux5 = SRC.map(() => Array.from({ length: 3 }, () => coin(V[4], 18)));
  const cpt = card(V[4], 420, 230, { fill: C.ink }); txt(cpt, 0, -60, "VOTRE COMPTE", 24, { weight: 800, ls: 5, fill: C.accentSoft }); const cpv = big(cpt, 0, 40, "", 72, C.paper);
  const astre = el("circle", { ...D.line, fill: C.accent, r: 34 }, V[4]), calme = marcheur(V[4], { vest: C.accent }, 0.6);
  // 6. impact : panneau solaire + arbre + rendement
  const sol = solaire(V[5], 1.6), arb = arbre(V[5], 0.9), rd = pl(V[5], 960, 960, "DU SENS… SANS FORCÉMENT RENONCER AU RENDEMENT", { bg: C.accentSoft, size: 20 });
  // 7. société : l'empire qui s'empile
  const emp = empire(V[6]), boss = marcheur(V[6], { vest: C.accent }, 0.6);
  // 8. transmettre : du père au fils
  const pere = marcheur(V[7], { vest: C.accent }, 0.8), fils = marcheur(V[7], { vest: C.inkSoft }, 0.48), don = cadeau(V[7]), arb2 = arbre(V[7], 0.6);
  // 9. reprendre en main : deux feuilles volantes et un point d'interrogation au-dessus du personnage
  const perdu = marcheur(V[8], { vest: C.accent }, 0.8);
  const feuille = () => { const f = el("g", {}, V[8]); el("rect", { ...D.line, fill: C.face, x: -60, y: -80, width: 120, height: 160, rx: 6 }, f);
    [-44, -18, 8, 34].forEach(y => el("path", { ...D.line, "stroke-width": 3, stroke: C.inkSoft, d: `M-40 ${y} L40 ${y}` }, f)); return f; };
  const F9 = [feuille(), feuille()], q9 = big(V[8], 0, 0, "?", 140, C.accent);
  return t => {
    show(head, fade(t, m(1) - 0.5) * out(t, m(2) - 0.4));
    const cur = W.findIndex((w, i) => t < (W[i][1] < 99 ? m(W[i][1]) - 0.35 : 1e9));
    V.forEach((v, i) => { v.style.opacity = win(i, t); });
    const i = Math.max(0, cur); LAB.forEach((p, j) => { on(p, win(j, t) > 0.01 ? 1 : 0); p.g.style.opacity = win(j, t); });
    num.textContent = String(i + 1).padStart(2, "0") + " / 09"; num.style.opacity = fade(t, m(2) - 0.4);
    // 1
    const k1 = ease(prog(t, m(3) - 0.2, m(4) + 0.6)); defile(cE, 5000, 150000, k1, " €"); cE.textContent = euros(lerp(5000, 150000, k1));
    ep.forEach((col, c) => col.forEach((cn, j) => place(cn, 640 + c * 160, 900 - j * 26, j < 1 + Math.floor(k1 * 7.99 * (c + 1) / 5) ? 1 : 0)));
    nE.style.opacity = fade(t, m(4));
    // 2
    const k2 = ease(prog(t, m(6) - 0.5, m(6) + 0.3)); place(av, 700, 620, 1 - 0.15 * k2); cI.textContent = euros(lerp(5000, 0, k2)); cI.setAttribute("fill", k2 >= 1 ? C.accent : C.ink);
    zero.setAttribute("transform", `translate(1400 640) scale(${pop(t, m(6) + 0.1)}) translate(-1400 -640)`); zero.style.opacity = t > m(6) ? 1 : 0;
    pI.setAttribute("d", `M980 620 L${lerp(980, 1180, ease(prog(t, m(6) - 0.2, m(6) + 0.2)))} 620`);
    // 3
    solo.at(t, [[m(7) - 0.3, 960, 980]], { armR: t > m(9) - 0.3 ? -40 : undefined, armL: t > m(9) - 0.3 ? 220 : undefined });
    biens.forEach((b, j) => place(b.b, b.x, b.y, pop(t, m(9) - 0.5 + j * 0.12)));
    // 4
    const k4 = ease(prog(t, m(11) - 0.4, m(11) + 0.8)), v4 = lerp(1000, 3000, k4), h4 = v4 / 3000 * 520;
    bR.setAttribute("y", 900 - h4); bR.setAttribute("height", h4); cR.setAttribute("y", 900 - h4 - 30); cR.textContent = euros(v4);
    sab.setAttribute("transform", `translate(640 620) scale(1.6) rotate(${180 * ease(prog(t, m(10), m(10) + 1))})`);
    // 5
    SRC.forEach((b, j) => place(b, 520, 440 + j * 190, pop(t, m(12) - 0.3 + j * 0.15)));
    flux5.forEach((F, j) => F.forEach((c, q) => { const u = ((t * 0.55) + q / 3 + j * 0.21) % 1; place(c, lerp(600, 1120, u), lerp(440 + j * 190, 620, u) - 40 * Math.sin(Math.PI * u), fade(t, m(12)) * (u > 0.05 && u < 0.93 ? 1 : 0)); }));
    place(cpt, 1330, 620, pop(t, m(12) - 0.1)); cpv.textContent = "+ " + euros(Math.max(0, t - m(12)) * 420);
    const ang = Math.PI * (1 - ((t - m(12)) * 0.35 % 1)); astre.setAttribute("cx", 1330 + 260 * Math.cos(ang)); astre.setAttribute("cy", 420 - 90 * Math.sin(ang));
    astre.setAttribute("fill", Math.sin(ang * 2 + 1) > 0 ? C.accent : C.paperDeep); astre.style.opacity = fade(t, m(13) - 0.4);
    calme.at(t, [[m(12), 1640, 900]], { armL: 120, armR: 60, flip: true });
    // 6
    sol.setAttribute && sol.setAttribute("transform", `translate(640 820) scale(${1.6 * pop(t, m(14) - 0.3)})`);
    arb.g.setAttribute("transform", "translate(1240 900) scale(0.9)"); arb.set(prog(t, m(15) - 0.4, m(15) + 1.2));
    on(rd, pop(t, m(16) - 0.3), 0, 0);
    // 7
    emp.g.setAttribute("transform", "translate(1060 920)"); emp.set(prog(t, m(17) - 0.2, m(18) + 0.6));
    boss.at(t, [[m(17) - 0.3, 520, 960]], { armR: t > m(18) ? -40 : undefined });
    // 8
    pere.at(t, [[m(19) - 0.3, 620, 960]], { armR: -10 }); fils.at(t, [[m(19) - 0.2, 1120, 960]], { flip: true, armR: t > m(20) ? -60 : undefined });
    const k8 = ease(prog(t, m(19) + 0.3, m(20))); place(don, lerp(720, 1080, k8), 760 - 140 * Math.sin(Math.PI * k8), 0.55);
    arb2.g.setAttribute("transform", "translate(1500 960) scale(0.6)"); arb2.set(prog(t, m(20) - 0.2, m(20) + 1.0));
    // 9
    perdu.at(t, [[m(21) - 0.3, 960, 980]], { armL: 205 + 10 * Math.sin(t * 2.5), armR: -25 - 10 * Math.sin(t * 2.5) });
    F9.forEach((f, j) => { const s9 = j ? 1 : -1, ph = t * 1.3 + j * 2.1;
      place(f, 960 + s9 * (260 + 30 * Math.sin(ph)), 520 + 40 * Math.sin(ph * 1.4), pop(t, m(21) - 0.2 + j * 0.15) * 0.9, s9 * (14 + 10 * Math.sin(ph * 1.1))); });
    place(q9, 960, 470 + 10 * Math.sin(t * 3), pop(t, m(21)), 6 * Math.sin(t * 2));
  };
});

// ---- 04 · Ma méthode et le cercle de conseil ----
SC("04", "MA MÉTHODE", (g, A) => {
  const m = A.m, head = title(g, 190, "Ma méthode, en trois étapes");
  const ic = (draw_) => { const r = el("g", {}, g); el("circle", { ...D.line, fill: C.ink, r: 100 }, r); draw_(r); return r; };
  const S = [ic(r => { el("circle", { ...D.line, stroke: C.paper, "stroke-width": 12, r: 34, cx: -10, cy: -10 }, r); el("path", { ...D.line, stroke: C.paper, "stroke-width": 14, d: "M16 16 L46 46" }, r); }),
             ic(r => { el("path", { ...D.line, stroke: C.paper, "stroke-width": 10, d: "M-50 -50 L-50 46 L52 46 M-24 30 L-24 0 M2 30 L2 -26 M28 30 L28 -12" }, r); }),
             ic(r => { [50, 32, 14].forEach((rr, i) => el("circle", { fill: i % 2 ? C.ink : C.paper, r: rr }, r)); })];
  const L = [["Diagnostic", "situation, fiscalité, objectifs de vie", 2, 3], ["Analyse", "actifs, opportunités, profil", 4, 5], ["Préconisation", "sur mesure, expliquée, validée avec vous", 6, 7]].map(([a, b, k1, k2], i) => ({ a: big(g, 400 + i * 560, 600, a, 46), b: txt(g, 400 + i * 560, 650, b, 24, { weight: 600, fill: C.inkSoft }), k1, k2, x: 400 + i * 560 }));
  const lk = [0, 1].map(i => el("path", { ...D.line, stroke: C.accent, "stroke-width": 8 }, g));
  const cer = big(g, 960, 190, "Le cercle de conseil du MIC", 52);
  const ring = el("circle", { ...D.line, stroke: C.accent, "stroke-width": 4, "stroke-dasharray": "12 12", cx: 960, cy: 600, r: 290 }, g); draw(ring, m(8) - 0.3, m(8) + 0.9);
  const moi = el("g", {}, g); el("circle", { ...D.line, fill: C.ink, r: 140 }, moi); txt(moi, 0, -6, "Mathyas", 40, { font: "Serif", weight: 700, fill: C.paper }); txt(moi, 0, 40, "LE STRATÈGE", 22, { weight: 800, ls: 4, fill: C.accent });
  const X = [["Courtier", 9, -90], ["Notaire", 10, 30], ["Avocat fiscaliste", 11, 150]].map(([s, k, a]) => { const c = el("g", {}, g); el("circle", { ...D.line, fill: C.accent, r: 100 }, c); txt(c, 0, s === "Courtier" ? 0 : 12, s, s.length > 10 ? 28 : 34, { font: "Serif", weight: 700 });
    if (s === "Courtier") { txt(c, 0, 28, "crédit immobilier", 17, { weight: 700, fill: C.ink }); txt(c, 0, 48, "& financement", 17, { weight: 700, fill: C.ink }); }
    return { c, k, a: a * Math.PI / 180 }; });
  const u1 = pl(g, 560, 1000, "UN SEUL INTERLOCUTEUR", { bg: C.ink, fg: C.paper, size: 24 }), u2 = pl(g, 1360, 1000, "TOUTES LES EXPERTISES", { bg: C.accent, size: 24 });
  return t => {
    const kA = out(t, m(8) - 0.6);
    show(head, fade(t, m(1) - 0.5) * kA);
    S.forEach((s, i) => place(s, L[i].x, 410, pop(t, m(L[i].k1) - 0.4) * kA));
    L.forEach(l => { show(l.a, fade(t, m(l.k1) - 0.2) * kA); show(l.b, fade(t, m(l.k2) - 0.3) * kA); });
    lk.forEach((p, i) => { const k = ease(prog(t, m(L[i + 1].k1) - 0.5, m(L[i + 1].k1) - 0.1)); p.setAttribute("d", `M${L[i].x + 120} 410 L${lerp(L[i].x + 120, L[i + 1].x - 120, k)} 410`); p.style.opacity = (k > 0 ? 1 : 0) * kA; });
    show(cer, fade(t, m(8) - 0.3)); place(moi, 960, 600, pop(t, m(8) - 0.3));
    X.forEach(x => { const k = pop(t, m(x.k) - 0.3), a = x.a + 0.15 * Math.sin(t * 0.8); place(x.c, 960 + 290 * Math.cos(a), 600 + 290 * Math.sin(a), k); });
    on(u1, pop(t, m(12) - 0.3)); on(u2, pop(t, m(13) - 0.3));
  };
});

// ---- 05 · Transparence ----
SC("05", "TRANSPARENCE", (g, A) => {
  const m = A.m, head = title(g, 190, "Côté rémunération, c'est simple");
  const zero = big(g, 560, 520, "0 €", 180, C.accent), lz = txt(g, 560, 600, "d'honoraires, en règle générale", 30, { weight: 700 });
  const logo = logoMIC(g, 90), parts = [0, 1, 2].map(() => { const b = bank(g, "", 160); return b; });
  const fl = [0, 1, 2].map(() => el("path", { ...D.line, stroke: C.accent, "stroke-width": 6, "stroke-dasharray": "10 10" }, g));
  const lp = txt(g, 1380, 820, "rémunéré par les partenaires", 28, { weight: 700 });
  const ct = contrat(g, "NOIR SUR BLANC", { size: 22 });
  const reg = pl(g, 960, 960, "CADRE RÉGLEMENTÉ · SOUS LE CONTRÔLE DE L'A.M.F.", { bg: C.ink, fg: C.paper, size: 24 }), sh = el("g", {}, g); D.icons.bouclier(sh);
  return t => {
    show(head, fade(t, m(1) - 0.5));
    zero.setAttribute("transform", `translate(560 520) scale(${pop(t, m(2) - 0.3)}) translate(-560 -520)`); zero.style.opacity = t > m(2) - 0.3 ? 1 : 0; show(lz, fade(t, m(2)));
    place(logo, 1380, 640, pop(t, m(3) - 0.4) * 0.9);
    parts.forEach((p, i) => place(p, 1100 + i * 280, 380, pop(t, m(3) - 0.3 + i * 0.1) * 0.6));
    fl.forEach((f, i) => { const k = ease(prog(t, m(3) + i * 0.1, m(3) + 0.6 + i * 0.1)); const x0 = 1100 + i * 280; f.setAttribute("d", `M${x0} 460 L${lerp(x0, 1380, k)} ${lerp(460, 560, k)}`); f.style.opacity = k > 0 ? 1 : 0; });
    show(lp, fade(t, m(3) + 0.3));
    place(ct.g, 560, 780, pop(t, m(4) - 0.3) * 0.9);
    on(reg, pop(t, m(5) - 0.3)); place(sh, 520, 960, pop(t, m(5) - 0.1) * 0.6);
  };
});

// ---- 06 · Passer à l'action ----
SC("06", "PASSER À L'ACTION", (g, A) => {
  const m = A.m;
  const moi = marcheur(g, { vest: C.accent }, 0.75), cli = marcheur(g, { vest: C.inkSoft }, 0.75);
  const cal = calendar(g, "RDV"), dec = pl(g, 960, 300, "UN PREMIER ÉCHANGE DÉCOUVERTE", { bg: C.accent, size: 24 }), url = big(g, 960, 560, "midelton-capital.fr", 80, C.ink);
  const bg2 = el("rect", { width: 1920, height: 1080, fill: C.ink }, g);
  const s1 = big(g, 960, 330, "Votre patrimoine mérite une stratégie.", 64, C.paper);
  const page = el("g", {}, g); el("rect", { ...D.line, fill: C.face, x: -90, y: -100, width: 180, height: 200, rx: 10 }, page); txt(page, 0, 20, "HIER", 40, { font: "Serif", weight: 700 });
  const s2 = txt(g, 960, 470, "Le meilleur moment pour commencer, c'était hier.", 40, { weight: 600, fill: C.accentSoft });
  const s3 = big(g, 960, 560, "Le deuxième, c'est aujourd'hui.", 60, C.accent);
  const logo = logoMIC(g, 110, C.ink, C.paper), url2 = txt(g, 960, 960, "midelton-capital.fr · rendez-vous découverte", 30, { weight: 700, ls: 3, fill: C.paper });
  return t => {
    const kA = out(t, m(4) - 0.5);
    moi.at(t, [[A.s + 0.1, 420, 980], [m(1) + 0.6, 700, 980]], { k: kA, armR: t > m(1) + 0.6 ? 10 : undefined });
    cli.at(t, [[A.s + 0.2, 1500, 980], [m(1) + 0.6, 1220, 980]], { k: kA, flip: true, armR: t > m(1) + 0.6 ? 10 : undefined });
    place(cal.g, 960, 700, pop(t, m(2) - 0.3) * kA * 0.9); on(dec, pop(t, m(2) - 0.2) * kA);
    show(url, fade(t, m(3) - 0.3) * kA);
    bg2.style.opacity = fade(t, m(4) - 0.5, 0.5);
    show(s1, fade(t, m(4) - 0.2));
    const kp = ease(prog(t, m(5) + 0.4, m(5) + 1.4)); place(page, 960 + 700 * kp, 780 - 500 * kp + 200 * kp * kp, pop(t, m(5) - 0.3) * (1 - kp), 60 * kp);
    show(s2, fade(t, m(5) - 0.3)); show(s3, fade(t, m(6) - 0.3));
    place(logo, 960, 780, pop(t, m(6) - 0.3)); show(url2, fade(t, m(6) - 0.2));
  };
});
