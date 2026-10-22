// Parties 00 à 10 : introduction, objectif, contenant, simulations, allocation, volant, schéma A, schéma B, divorce.
// A.m(k) = instant du repère [k] de la partie (SCRIPT.md) ; A.s / A.e = début / fin de la partie.

// ---- 00 · Introduction ----
SC("00", "INTRODUCTION", (g, A) => {
  const m = A.m, me = member(g, "mathyas");
  const q = big(g, 0, 0, "?", 120, C.accent);
  const ages = [pill(g, 0, 0, "18 ANS", { bg: C.accent, size: 30 }), pill(g, 0, 0, "25 ANS", { bg: C.face, size: 30 })];
  const sp = el("g", {}, g); const spI = el("g", { transform: "scale(2.2)" }, sp); D.icons.sprout(spI);
  const qs = [[-170, -40], [150, -90], [210, 60], [-230, 90], [40, -170]].map(([x, y]) => ({ t: big(g, 0, 0, "?", 64, C.inkSoft), x, y }));
  const tools = ["contract", "coins", "piggy"].map(k => { const w = el("g", {}, g); D.icons[k](w); return w; });
  const toolQ = big(g, 0, 0, "?", 70, C.accent);
  // la vidéo costaud : pile de feuilles + stylo
  const pile = el("g", {}, g);
  for (let i = 0; i < 9; i++) el("rect", { ...D.line, "stroke-width": 3, fill: i % 2 ? C.face : C.paperDeep, x: -110 + (i % 3) * 3, y: -i * 16, width: 220, height: 14, rx: 2 }, pile);
  const feuille = el("g", {}, g); el("path", { ...D.line, fill: C.face, d: "M-90 -120 L60 -120 L90 -90 L90 120 L-90 120 Z" }, feuille);
  const lignes = [-70, -40, -10, 20, 50].map(y => el("path", { ...D.line, "stroke-width": 4, stroke: C.inkSoft, d: `M-60 ${y} L${y < 30 ? 60 : 20} ${y}` }, feuille));
  const stylo = el("g", {}, g); el("path", { ...D.line, fill: C.accent, d: "M-8 -110 L8 -110 L8 40 L0 62 L-8 40 Z" }, stylo); el("path", { ...D.line, fill: C.ink, d: "M-8 -110 L8 -110 L8 -86 L-8 -86 Z" }, stylo);
  const sibs = [member(g, "leo", false), member(g, "camille", false)];
  const sibL = pill(g, 1240, 980, "UN FRÈRE, UNE SŒUR, LA FAMILLE", { bg: C.face, size: 22 });
  const patri = pill(g, 1240, 300, "CRÉER UN PATRIMOINE", { bg: C.accent, size: 30 });
  const fam = ["sophie", "marc", "leo", "camille", "noe"].map(w => member(g, w));
  const FX = [520, 760, 1060, 1260, 1440];
  // les lignes s'écrivent sur la feuille
  lignes.forEach((p, i) => draw(p, m(5) + 0.3 + i * 0.25, m(5) + 0.6 + i * 0.25));
  return t => {
    const p1 = out(t, m(6) - 0.5, 0.5), p2 = out(t, m(8) - 0.5, 0.5);
    me.at(t, A.s + 0.2, 330, 920, { k: p2, armR: t > m(1) && t < m(4) ? -25 : 75 });
    place(q, 330, 470 + Math.sin(t * 3) * 6, pop(t, A.s + 0.6) * out(t, m(2)));
    place(sp, 1240, 720, pop(t, m(1) - 1.2) * p1); spI.lastElementChild.setAttribute("transform", `translate(32 -16) scale(${1 + 0.6 * ease(prog(t, m(1), m(1) + 1.5))}) translate(-32 16)`);
    ages.forEach((a, i) => place(a.g, 1080 + i * 320, 400, pop(t, m(1) - 0.6 + i * 0.5) * out(t, m(3) - 0.3)));
    qs.forEach((o, i) => place(o.t, 1240 + o.x + Math.sin(t * 2 + i) * 8, 560 + o.y, pop(t, m(2) - 0.4 + i * 0.15) * out(t, m(3) - 0.3)));
    tools.forEach((w, i) => place(w, 960 + i * 280, 420, pop(t, m(3) - 0.6 + i * 0.25) * out(t, m(4) - 0.3)));
    place(toolQ, 1240, 270, pop(t, m(3)) * out(t, m(4) - 0.3));
    const growP = ease(prog(t, m(4) - 0.3, m(4) + 0.8));
    place(pile, 960, 560, pop(t, m(4) - 0.5) * p1, 0); pile.setAttribute("transform", `translate(960 600) scale(${pop(t, m(4) - 0.5) * p1} ${(0.4 + 0.9 * growP) * pop(t, m(4) - 0.5) * p1})`);
    place(feuille, 1420, 560, pop(t, m(5) - 0.4) * p1, -4);
    const sx = 1420 - 60 + 120 * ((t * 0.8) % 1), sy = 560 - 70 + 30 * Math.min(4, Math.floor(prog(t, m(5) + 0.3, m(5) + 1.6) * 5));
    place(stylo, sx, sy - 40, pop(t, m(5)) * p1, 30);
    sibs.forEach((s, i) => s.at(t, m(6) - 0.3 + i * 0.3, 1120 + i * 200, 920, { k: p2 }));
    place(sibL.g, sibL.x, sibL.y, pop(t, m(6)) * p2);
    place(patri.g, patri.x, patri.y, pop(t, m(7)) * p2);
    fam.forEach((f, i) => f.at(t, m(8 + Math.min(2, i)) - 0.4 + (i > 2 ? (i - 2) * 0.3 : 0), FX[i] + 160, 900));
  };
});

// ---- 01 · L'objectif à 18 ans ----
SC("01", "L'OBJECTIF", (g, A) => {
  const m = A.m, head = title(g, 190, "À 18 ans, un vrai point de départ");
  const leo = member(g, "leo");
  const items = [["voiture", "LE PERMIS", "son autonomie"], ["toque", "SES ÉTUDES", "école, prépa, fac"], ["house", "UN LOGEMENT", "caution, loyers"], ["avion", "SES PROJETS", "voyage, business"]].map(([k, l1, l2], i) => {
    const c = card(g, 300, 300); const ic = el("g", { transform: "translate(0 -40)" }, c);
    if (k === "house") D.icons.house(ic); else ({ voiture, toque, avion })[k](ic);
    txt(c, 0, 90, l1, 26, { weight: 800, ls: 4 }); txt(c, 0, 124, l2, 21, { weight: 500, fill: C.inkSoft });
    return { c, x: 720 + i * 330, a: m(2 + i + (i >= 2 ? 1 : 0)) };
  });
  const cher = pill(g, 1050, 790, "ÉCOLE DE COMMERCE : JUSQU'À 50 000 €", { bg: C.accent, size: 22 });
  const capi = el("g", {}, g); stack(capi, 7, 34); const capL = pill(g, 340, 1000, "UN CAPITAL POUR DÉMARRER", { bg: C.accent, size: 24 });
  return t => {
    show(head, fade(t, m(1) - 0.3));
    leo.at(t, A.s + 0.3, 300, 900, { armR: t > m(7) ? 40 : 75 });
    items.forEach(it => place(it.c, it.x, 520, pop(t, it.a - 0.3)));
    place(cher.g, cher.x, cher.y, pop(t, m(4) - 0.2) * out(t, m(7) - 0.4));
    place(capi, 440, 860 - 30 * ease(prog(t, m(7), m(7) + 0.8)), pop(t, m(7) - 0.3)); place(capL.g, 600, 820, pop(t, m(7)));
  };
});

// ---- 02 · Le bon contenant ----
SC("02", "LE BON CONTENANT", (g, A) => {
  const m = A.m;
  const N = [["PEA", "fermé aux mineurs", false], ["PER", "bloqué jusqu'à la retraite", false], ["LIVRETS", "argent de poche", null], ["COMPTE-TITRES", "imposé chaque année", null], ["ASSURANCE VIE", "coche toutes les cases", true]];
  const cards = N.map(([n, d, ok], i) => {
    const c = card(g, 300, 200, { fill: i === 4 ? C.accentSoft : C.face }); txt(c, 0, -20, n, 28, { weight: 800, ls: 3 });
    const sub = txt(c, 0, 30, d, 21, { weight: 500, fill: C.inkSoft });
    return { c, sub, mark: ok === null ? txt(g, 0, 0, "~", 70, { font: "Serif", weight: 700, fill: C.accent }) : check(g, ok), x: 300 + i * 330, a: m(2 + i) };
  });
  const lk = padlock(g);
  const pros = [["Faire grandir, puis sécuriser", 7], ["Disponible si la vie l'exige", 8], ["Fiscalité avantageuse", 9], ["La clause bénéficiaire", 10]].map(([s, k], i) => {
    const r = el("g", {}, g); const c = check(r); c.setAttribute("transform", "scale(0.8)");
    txt(r, 50, 12, s, 38, { anchor: "start", font: "Serif", weight: k === 10 ? 700 : 600, fill: k === 10 ? C.ink : C.ink }); return { r, a: m(k), y: 330 + i * 110 };
  });
  const ring = el("rect", { fill: "none", stroke: C.accent, "stroke-width": 6, x: -20, y: -50, width: 520, height: 90, rx: 45 }, g);
  const vid = card(g, 420, 240, { fill: C.ink }); el("path", { ...D.line, stroke: C.paper, fill: C.accent, d: "M-26 -50 L40 -6 L-26 38 Z" }, vid);
  txt(vid, 0, 92, "VIDÉO · L'ASSURANCE VIE", 22, { weight: 800, ls: 4, fill: C.paper });
  return t => {
    const f = ease(prog(t, m(6) - 0.2, m(6) + 0.8));
    cards.forEach((c, i) => {
      const av = i === 4, k = pop(t, i === 0 ? m(1) - 0.2 : m(1) + i * 0.2);
      const x = av ? lerp(c.x, 460, f) : c.x, y = av ? lerp(380, 560, f) : 380, s = av ? 1 + 0.5 * f : 1;
      place(c.c, x, y, k * s * (av ? 1 : 1 - f)); c.sub.style.opacity = av ? 1 - f : fade(t, c.a);
      place(c.mark, c.x, 560, pop(t, c.a) * (1 - f));
    });
    place(lk.g, 300, 680, pop(t, m(2) + 0.4) * (1 - f) * 0.7); lk.open(0);
    pros.forEach(p => place(p.r, 900, p.y, pop(t, p.a - 0.2) * out(t, m(11) - 0.5)));
    place(ring, 880, 330 + 3 * 110, pop(t, m(10) + 0.3) * out(t, m(11) - 0.5));
    place(vid, 1300, 560, pop(t, m(11) - 0.3));
  };
});

// ---- 03 · Chaque année d'attente se paie ----
SC("03", "CHAQUE ANNÉE COMPTE", (g, A) => {
  const m = A.m, head = title(g, 190, "Même effort : 100 € par mois");
  const rows = [["Dès la naissance", "18 ans de versements", 1, 34900, 2, 3], ["Dès ses 10 ans", "8 ans de versements", 11800 / 34900, 11800, 4, 5]].map(([l1, l2, k, v, a, b], i) => {
    const y = 420 + i * 220;
    const t1 = txt(g, 200, y - 6, l1, 40, { anchor: "start", font: "Serif", weight: 600 }), t2 = txt(g, 200, y + 32, l2, 22, { anchor: "start", weight: 500, fill: C.inkSoft });
    const j = jauge(g, 820, 56, i ? C.accent : C.ink); j.g.setAttribute("transform", `translate(640 ${y})`);
    const n = big(g, 1700, y + 22, "", 64);
    return { t1, t2, j, n, k, v, a: m(a), b: m(b) };
  });
  const tip = card(g, 1500, 120, { fill: C.ink }); txt(tip, 0, 12, "Viser 30 000 € en démarrant à 10 ans : environ 255 € par mois", 34, { font: "Serif", weight: 600, fill: C.paper });
  const cal = calendar(g, "18");
  return t => {
    show(head, fade(t, m(1) - 0.5));
    rows.forEach(r => { const k = fade(t, r.a - 0.3); r.t1.style.opacity = k; r.t2.style.opacity = k; r.j.g.style.opacity = k;
      const f = ease(prog(t, r.a, r.b)); r.j.set(f * r.k); r.n.textContent = f > 0 ? "≈ " + fmt(r.v * f) + " €" : ""; });
    place(tip, 960, 930, pop(t, m(6) - 0.3));
    place(cal.g, 1700, 220, pop(t, m(1)) * 0.7);
  };
});

// ---- 04 · Le temps fait le travail ----
SC("04", "LE TEMPS FAIT LE TRAVAIL", (g, A) => {
  const m = A.m, head = title(g, 190, "100 € par mois, de la naissance à 18 ans");
  const B = [["VERSÉ", 21600, C.paperDeep], ["PRUDENT 3 %", 28600, C.inkSoft], ["ÉQUILIBRÉ 5 %", 34900, C.ink], ["DYNAMIQUE 7 %", 43100, C.accent]].map(([l, v, col], i) => {
    const x = 380 + i * 300, r = el("rect", { ...D.line, fill: col, x: x - 110, width: 220, rx: 10 }, g);
    if (i === 0) r.setAttribute("stroke-dasharray", "10 8");
    return { r, x, v, n: big(g, x, 0, "", 46), l: txt(g, x, 900, l, 22, { weight: 800, ls: 4, fill: C.inkSoft }), a: m(2 + i) };
  });
  el("path", { ...D.line, d: "M200 860 L1420 860" }, g);
  const x2 = card(g, 380, 330, { fill: C.ink }); txt(x2, 0, -30, "× 2", 110, { font: "Serif", weight: 600, fill: C.paper });
  txt(x2, 0, 60, "l'argent a travaillé", 26, { weight: 500, fill: C.accentSoft }); txt(x2, 0, 96, "autant que vous", 26, { weight: 500, fill: C.accentSoft });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    B.forEach(b => { const k = ease(prog(t, b.a - 0.4, b.a + 0.4)), h = 560 * b.v / 43100 * k;
      b.r.setAttribute("y", 860 - h); b.r.setAttribute("height", h); b.r.style.opacity = k > 0.01 ? 1 : 0;
      b.n.setAttribute("y", 840 - h); b.n.textContent = k > 0.02 ? fmt(b.v * k) + " €" : ""; b.l.style.opacity = fade(t, b.a - 0.4); });
    place(x2, 1650, 560, pop(t, m(6) - 0.4));
  };
});

// ---- 05 · Une allocation qui suit son âge ----
SC("05", "UNE ALLOCATION QUI SUIT SON ÂGE", (g, A) => {
  const m = A.m, head = title(g, 190, "Une allocation qui suit son âge");
  const X0 = 300, X1 = 1500, Y0 = 820, H = 460, XA = a => X0 + (X1 - X0) * a / 18;
  const eur = a => a < 8 ? 0.12 : a < 15 ? 0.12 + (a - 8) / 7 * 0.33 : 0.45 + (a - 15) / 3 * 0.45;   // part fonds euros
  const top = el("path", { ...D.line, fill: C.ink }, g), bot = el("path", { ...D.line, fill: C.accent }, g);
  el("path", { ...D.line, d: `M${X0} ${Y0} L${X1} ${Y0}` }, g);
  const ticks = [0, 8, 15, 18].map(a => txt(g, XA(a), Y0 + 44, a + " ans", 24, { weight: 700, fill: C.inkSoft }));
  const lab1 = txt(g, XA(1), Y0 - H + 70, "Actions, ETF monde, produits structurés", 30, { anchor: "start", font: "Serif", weight: 600, fill: C.paper });
  const lab1b = txt(g, XA(1), Y0 - H + 112, "pour faire grandir", 26, { anchor: "start", weight: 600, fill: C.accent });
  const lab2 = txt(g, XA(17.6), Y0 - 50, "Fonds euros pour sécuriser", 30, { anchor: "end", font: "Serif", weight: 700, fill: C.ink });
  const bebe = member(g, "noe", false), grand = member(g, "leo", false);
  const eq = pill(g, XA(11), Y0 - H - 40, "DÉMARRAGE À 10-12 ANS : ÉQUILIBRÉ", { bg: C.face, size: 20 });
  const auto = pill(g, 960, 1000, "GESTION « À HORIZON » : ELLE AJUSTE TOUTE SEULE", { bg: C.accent, size: 24 });
  return t => {
    show(head, fade(t, A.s));
    const age = 18 * ease(prog(t, m(1), m(3) + 0.8)), path = [];
    for (let a = 0; a <= age + 0.001; a += 0.25) path.push([XA(a), Y0 - H * eur(a)]);
    if (path.length > 1) {
      const xe = path[path.length - 1][0];
      top.setAttribute("d", `M${X0} ${Y0 - H} L${xe} ${Y0 - H} ` + path.slice().reverse().map(p => `L${p[0]} ${p[1]}`).join(" ") + " Z");
      const k4 = ease(prog(t, m(4) - 0.3, m(4) + 0.6));
      bot.setAttribute("d", `M${X0} ${Y0} ` + path.map(p => `L${p[0]} ${lerp(Y0, p[1], 0.25 + 0.75 * k4)}`).join(" ") + ` L${xe} ${Y0} Z`);
    }
    top.style.opacity = bot.style.opacity = path.length > 1 ? 1 : 0;
    ticks.forEach((tk, i) => tk.style.opacity = fade(t, i === 0 ? m(1) : m(3)));
    show(lab1, fade(t, m(2) - 0.2)); show(lab1b, fade(t, m(2))); show(lab2, fade(t, m(5) - 0.3));
    bebe.at(t, m(1) - 0.5, 180, 820);
    grand.at(t, m(3), 1660, 820, { armL: 160 });
    place(eq.g, eq.x, eq.y, pop(t, m(6) - 0.3));
    place(auto.g, auto.x, auto.y, pop(t, m(7) - 0.3));
  };
});

// ---- 06 · Qui tient le volant ? ----
SC("06", "QUI TIENT LE VOLANT ?", (g, A) => {
  const m = A.m, head = title(g, 200, "Le cœur du sujet");
  const fis = el("g", {}, g); D.icons.percent(fis); const no = check(g, false);
  const fisL = txt(g, 520, 720, "la fiscalité ? pas le vrai sujet", 30, { font: "Serif", weight: 600, fill: C.inkSoft });
  const vol = volant(g); const q = big(g, 1240, 900, "Qui tient le volant à 18 ans ?", 52);
  const roles = [["QUI GÈRE ?", 4, -1], ["QUI CONTRÔLE ?", 4, 1], ["QUI DÉCIDE DES RETRAITS ?", 5, 0]].map(([s, k, side]) => ({ p: pill(g, 0, 0, s, { bg: C.face, size: 22 }), a: m(k) + (side > 0 ? 0.4 : 0), side }));
  const sch = ["A", "B", "C"].map((l, i) => { const c = bloc(g, 260, 160, "Schéma " + l, "", { size: 46, fill: i === 1 ? C.accentSoft : C.face }); return { c, x: 660 + i * 300 }; });
  return t => {
    const p1 = out(t, m(6) - 0.5);
    show(head, fade(t, m(1) - 0.5) * p1);
    place(fis, 520, 540, pop(t, m(2) - 0.6) * p1 * 1.4); place(no, 590, 470, pop(t, m(2)) * p1); fisL.style.opacity = fade(t, m(2)) * p1;
    place(vol, 1240, 520, pop(t, m(3) - 0.5) * p1, 18 * Math.sin(t * 1.3)); q.style.opacity = fade(t, m(3)) * p1;
    roles.forEach((r, i) => place(r.p.g, 1240 + r.side * 330, r.side ? 330 : 760, pop(t, r.a) * p1));
    sch.forEach((s, i) => place(s.c, s.x, 560, pop(t, m(6) - 0.3 + i * 0.25)));
  };
});

// ---- 07 · Schéma A : le contrat au nom de l'enfant ----
SC("07", "SCHÉMA A · AU NOM DE L'ENFANT", (g, A) => {
  const m = A.m, head = title(g, 190, "Schéma A : le contrat au nom de l'enfant");
  const leo = member(g, "leo"), dad = member(g, "marc", false);
  const ct = contrat(g, "SOUSCRIPTEUR : L'ENFANT", { lock: true });
  const gift = cadeau(g); const don = pill(g, 430, 300, "C'EST UNE DONATION", { bg: C.accent, size: 22 });
  const fl = flux(g, 4);
  const L = (s, k, ok, y) => { const r = el("g", {}, g); const c = check(r, ok); c.setAttribute("transform", "scale(0.75)");
    txt(r, 46, 12, s, 34, { anchor: "start", font: "Serif", weight: 600 }); return { r, a: m(k), y }; };
  const plus = [L("L'argent appartient à l'enfant", 4, true, 360), L("À l'abri du divorce, des créanciers…", 5, true, 460), L("… et de la tentation", 6, true, 560), L("Le contrat prend de l'âge", 7, true, 660)];
  const savoir = [L("À 18 ans, il décide seul", 8, false, 360), L("Minorité : retraits encadrés", 10, false, 560), L("Un don est définitif", 11, false, 660)];
  const hP = txt(g, 1060, 280, "LES PLUS", 26, { anchor: "start", weight: 800, ls: 6, fill: C.accent }), hS = txt(g, 1060, 280, "À SAVOIR", 26, { anchor: "start", weight: 800, ls: 6, fill: C.accent });
  const plane = avion(g); const vegas = pill(g, 1400, 520, "LAS VEGAS · PUNTA CANA", { bg: C.face, size: 22 });
  const lk = padlock(g);
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const sw = ease(prog(t, m(8) - 0.6, m(8))), age18 = ease(prog(t, m(8) - 0.4, m(8) + 0.6));
    leo.at(t, m(2) - 0.4, 560, 900, { scale: 1 + 0.25 * age18, armR: t > m(9) && t < m(10) ? -20 : 75 });
    place(ct.g, 860, 640, pop(t, m(2)));
    place(gift, 300, 640, pop(t, m(3) - 0.3) * out(t, m(4) + 1)); place(don.g, 300, 500, pop(t, m(3)) * out(t, m(4) + 1));
    fl(t, m(4) - 0.4, m(4) + 0.6, 300, 640, 740, 620);
    // la tentation : la main de papa s'allonge vers le contrat, puis recule
    const reachK = Math.sin(Math.PI * prog(t, m(6) - 0.8, m(6) + 0.8));
    dad.at(t, m(6) - 1.0, 260, 900, { k: out(t, m(6) + 1.2) });
    if (reachK > 0) dad.guy.reach(1, 380 * reachK + 40, -220 - 60 * reachK, -40);
    plus.forEach(p => place(p.r, 1060, p.y, pop(t, p.a - 0.3) * (1 - sw)));
    savoir.forEach(p => place(p.r, 1060, p.y, pop(t, p.a - 0.3)));
    hP.style.opacity = fade(t, m(4) - 0.5) * (1 - sw); hS.style.opacity = sw;
    place(plane, 1180 + 300 * ease(prog(t, m(9) - 0.3, m(10) - 0.3)), 470 - 60 * prog(t, m(9), m(10)), pop(t, m(9) - 0.3) * out(t, m(10) - 0.3) * 0.7, -8);
    place(vegas.g, 1400, 470, pop(t, m(9)) * out(t, m(10) - 0.3));
    place(lk.g, 1600, 780, pop(t, m(11)) * 0.8); lk.open(0);
  };
});

// ---- 08 · Schéma A : si un parent décède ----
SC("08", "SCHÉMA A · LE DÉCÈS D'UN PARENT", (g, A) => {
  const m = A.m, head = title(g, 190, "Le contrat de Léo ne bouge pas");
  const C3 = [["1 · UN PARENT DÉCÈDE", "Rien ne change", 2], ["2 · LES DEUX PARENTS", "Un tuteur prend le relais", 4], ["3 · LÉO A 18 ANS", "Il prend les commandes", 6]].map(([l1, l2, k], i) => {
    const c = card(g, 500, 520, { fill: i === 2 ? C.accentSoft : C.face });
    txt(c, 0, -205, l1, 22, { weight: 800, ls: 4, fill: C.inkSoft }); txt(c, 0, -160, l2, 34, { font: "Serif", weight: 600 });
    return { c, x: 400 + i * 560, a: m(k) };
  });
  const dad = member(g, "marc", false), mamie = member(g, "mamie", false), leo = member(g, "leo", false);
  const cts = [0, 1, 2].map(() => contrat(g, "LÉO", { lock: true }));
  const juge = pill(g, 960, 830, "SOUS LE CONTRÔLE DU JUGE", { bg: C.face, size: 18 });
  const vol = volant(g);
  const banner = card(g, 1500, 110, { fill: C.ink }); txt(banner, 0, 12, "Schéma A : rien à écrire, rien à régler. Le don est fait.", 34, { font: "Serif", weight: 600, fill: C.paper });
  const pep = pill(g, 960, 1010, "LE PÉPIN : LES PARENTS PERDENT LA MAIN À SES 18 ANS", { bg: C.accent, size: 22 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    C3.forEach(c => place(c.c, c.x, 540, pop(t, c.a - 0.5)));
    dad.at(t, m(3) - 0.3, 330, 760, { scale: 0.62, armR: 30 }); place(cts[0].g, 500, 600, pop(t, m(2)) * 0.8);
    mamie.at(t, m(4), 890, 760, { scale: 0.62, armR: 30 }); place(cts[1].g, 1060, 600, pop(t, m(5) - 0.3) * 0.8); place(juge.g, juge.x, juge.y - 20, pop(t, m(4) + 0.6) * 0.9);
    leo.at(t, m(6) - 0.3, 1440, 760, { scale: 0.8 }); place(vol, 1600, 560, pop(t, m(6)) * 0.35, 20 * Math.sin(t * 1.5)); place(cts[2].g, 1610, 720, pop(t, m(6) + 0.3) * 0.6);
    place(banner, 960, 930, pop(t, m(7) - 0.3) * out(t, m(8) - 0.3)); place(pep.g, pep.x, 930, pop(t, m(8) - 0.2));
  };
});

// ---- 09 · Schéma B : le contrat au nom du parent ----
SC("09", "SCHÉMA B · AU NOM DU PARENT", (g, A) => {
  const m = A.m, head = title(g, 190, "Schéma B : le contrat au nom du parent");
  const sophie = member(g, "sophie"); const ct = contrat(g, "POUR LÉO");
  const key = cle(g); const keyL = pill(g, 420, 400, "VOUS GARDEZ LA MAIN", { bg: C.accent, size: 22 });
  const L = (s, k, ok, y) => { const r = el("g", {}, g); const c = check(r, ok); c.setAttribute("transform", "scale(0.75)");
    txt(r, 46, 12, s, 32, { anchor: "start", font: "Serif", weight: 600 }); return { r, a: m(k), y }; };
  const list = [L("Vous choisissez quand et combien donner", 4, true, 320), L("Au décès : 152 500 € d'abattement", 5, true, 400),
    L("L'argent reste dans votre patrimoine", 6, false, 480), L("Mariés en communauté : partagé au divorce", 7, false, 560), L("La tentation de « piocher »", 8, false, 640)];
  const steps = [["1", "RACHAT", "vous retirez", 9], ["2", "DON", "à l'enfant", 10], ["3", "PLAFOND", "dans les 100 000 €", 11]].map(([n, a, b, k], i) => {
    const c = card(g, 320, 130, { fill: i === 2 ? C.ink : C.face }); txt(c, 0, -6, a, 34, { font: "Serif", weight: 700, fill: i === 2 ? C.paper : C.ink });
    txt(c, 0, 34, b, 22, { weight: 500, fill: i === 2 ? C.accentSoft : C.inkSoft }); return { c, a: m(k), x: 1000 + i * 360 };
  });
  const arrs = [0, 1].map(i => arrow(g, 1170 + i * 360, 860, 1200 + i * 360, 860, m(10 + i) - 0.4, m(10 + i) - 0.1, { w: 6 }));
  return t => {
    show(head, fade(t, m(1) - 0.5));
    sophie.at(t, m(2) - 0.6, 260, 900, { armR: t > m(3) ? 20 : 75 });
    place(ct.g, 470, 650, pop(t, m(2)));
    place(key, 420, 520, pop(t, m(3) - 0.3) * out(t, m(9) - 0.4), -10 + 10 * Math.sin(t * 2)); place(keyL.g, keyL.x, keyL.y, pop(t, m(3)) * out(t, m(9) - 0.4));
    list.forEach(p => place(p.r, 860, p.y, pop(t, p.a - 0.3)));
    steps.forEach(s => place(s.c, s.x, 860, pop(t, s.a - 0.3)));
    arrs.forEach(a => a.render(t));
  };
});

// ---- 10 · Schéma B : en cas de divorce ----
SC("10", "SCHÉMA B · ET EN CAS DE DIVORCE ?", (g, A) => {
  const m = A.m, head = title(g, 190, "Divorce : le contrat est partagé");
  const sophie = member(g, "sophie"), marc = member(g, "marc");
  const ct = contrat(g, ""); const tag = pill(g, 0, 0, "« POUR LÉO »", { bg: C.face, size: 22 });
  const bar = el("path", { ...D.line, stroke: C.accent, "stroke-width": 8, d: "M-110 0 L110 0" }, g);
  const noVal = txt(g, 960, 300, "aucune valeur légale", 28, { font: "Serif", weight: 600, fill: C.inkSoft });
  const pot = el("g", {}, g); stack(pot, 6, 36); const potN = big(g, 960, 860, "24 000 €", 54);
  const com = pill(g, 960, 940, "MARIÉS EN COMMUNAUTÉ : 50 / 50", { bg: C.accent, size: 22 });
  const halves = [0, 1].map(i => { const h = el("g", {}, g); stack(h, 3, 36); return { h, n: big(g, 0, 0, "12 000 €", 46) }; });
  const newCt = contrat(g, "NOUVEAU CONTRAT · LÉO");
  const poche = pill(g, 1500, 1000, "IL PEUT TOUT GARDER", { bg: C.face, size: 22 });
  const propre = card(g, 760, 260); txt(propre, 0, -80, "L'argent « propre » reste à un seul", 32, { font: "Serif", weight: 700 });
  ["un héritage reçu", "une donation reçue", "ce qu'on avait avant le mariage  ·  à prouver"].forEach((s, i) => txt(propre, 0, -24 + i * 44, s, 24, { weight: 500, fill: C.inkSoft }));
  const sep = card(g, 760, 260, { fill: C.ink }); txt(sep, 0, -60, "Pacsés, concubins, séparation de biens", 32, { font: "Serif", weight: 700, fill: C.paper });
  txt(sep, 0, 0, "chacun garde ce qu'il a mis", 26, { weight: 500, fill: C.accentSoft }); txt(sep, 0, 44, "pas de pot commun, rien à partager", 26, { weight: 500, fill: C.accentSoft });
  return t => {
    const p1 = out(t, m(10) - 0.6);
    show(head, fade(t, m(1) - 0.5) * p1);
    sophie.at(t, m(2) - 0.6, 520, 880, { k: p1, armR: 40 });
    const split = ease(prog(t, m(6) - 0.2, m(6) + 0.6));
    place(ct.g, 960, 470, pop(t, m(2)) * (1 - split)); place(tag.g, 960, 360, pop(t, m(2) + 0.3) * (1 - split) * p1);
    bar.setAttribute("transform", `translate(960 360) scale(${ease(prog(t, m(3) - 0.2, m(3) + 0.3))} 1)`); bar.style.opacity = (1 - split) * p1;
    noVal.style.opacity = fade(t, m(3)) * (1 - split) * p1;
    place(pot, 960, 760, pop(t, m(4) - 0.3) * (1 - split)); potN.style.opacity = fade(t, m(4)) * (1 - split);
    place(com.g, com.x, com.y, pop(t, m(5) - 0.3) * (1 - split));
    marc.at(t, m(5) - 0.5, 1400, 880, { k: p1, flip: true });
    halves.forEach((h, i) => { const x = lerp(960, i ? 1220 : 700, split); place(h.h, x, 760, split > 0 ? (i ? pop(t, m(8) - 0.4) : pop(t, m(7) - 0.4)) * p1 : 0);
      h.n.setAttribute("x", x); h.n.setAttribute("y", 600); h.n.style.opacity = (i ? fade(t, m(8) - 0.3) : fade(t, m(7) - 0.3)) * p1; });
    const toLeo = ease(prog(t, m(7) + 0.2, m(7) + 1.2)); place(newCt.g, 420, 520, pop(t, m(7) + 0.6) * p1 * 0.85);
    if (toLeo > 0 && toLeo < 1) place(halves[0].h, lerp(700, 420, toLeo), lerp(760, 560, toLeo), p1);
    const keep = ease(prog(t, m(9) - 0.3, m(9) + 0.5)); if (keep > 0) place(halves[1].h, lerp(1220, 1450, keep), lerp(760, 720, keep), (1 - keep * 0.7) * p1);
    place(poche.g, poche.x, poche.y, pop(t, m(9)) * p1);
    place(propre, 960, 450, pop(t, m(10) - 0.3)); place(sep, 960, 790, pop(t, m(12) - 0.3));
  };
});
