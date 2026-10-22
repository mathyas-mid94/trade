// Parties 22 à 31 : les outils (inaliénabilité, démembrement, pacte adjoint), résumé, fiscalité, carte cadeau,
// grands-parents, vigilance, quatre questions, conclusion.

// ---- 22 · La clause d'inaliénabilité temporaire ----
SC("22", "LES OUTILS · LA CLAUSE « DINA »", (g, A) => {
  const m = A.m, head = title(g, 190, "Les outils : des garde-fous");
  const sh = el("g", {}, g); shield(sh); const shL = padlock(sh); shL.g.setAttribute("transform", "translate(0 0) scale(0.55)");
  const name = big(g, 960, 300, "La clause d'inaliénabilité temporaire", 50);
  const dina = pill(g, 960, 380, "ALIAS LA CLAUSE « DINA »", { bg: C.accent, size: 24 });
  const where = pill(g, 960, 380, "DANS LA CLAUSE BÉNÉFICIAIRE · SCHÉMA B", { bg: C.face, size: 22 });
  const steps = [["AUJOURD'HUI", "vous gardez 100 % de la main", 4], ["VOUS DÉCÉDEZ", "le capital revient à l'enfant", 5], ["BLOQUÉ", "jusqu'à 25 ans, souvent", 6], ["ENSUITE", "il en dispose librement", 7]].map(([a, b, k], i) => {
    const c = card(g, 380, 150, { fill: i === 2 ? C.ink : C.face }); txt(c, 0, -22, a, 22, { weight: 800, ls: 5, fill: C.accent });
    txt(c, 0, 26, b, 26, { font: "Serif", weight: 600, fill: i === 2 ? C.paper : C.ink }); return { c, x: 300 + i * 440, a: m(k) };
  });
  const arrs = [0, 1, 2].map(i => arrow(g, 495 + i * 440, 560, 545 + i * 440, 560, m(5 + i) - 0.5, m(5 + i) - 0.2, { w: 6 }));
  const cb = pill(g, 960, 690, "UTILE SI L'ENFANT A LA MAIN RAPIDE SUR LA CARTE BLEUE", { bg: C.face, size: 18 });
  const no = [["RACHETER", 8], ["VENDRE", 9], ["DONNER", 10], ["METTRE EN GARANTIE", 11]].map(([s, k], i) => ({ p: pill(g, 0, 0, s, { bg: C.face, size: 22 }), a: m(k), x: 330 + i * 340 }));
  const bars = no.map(() => el("path", { ...D.line, stroke: C.accent, "stroke-width": 6, d: "M-90 0 L90 0" }, g));
  const valid = card(g, 1500, 110, { fill: C.ink }); const vt = txt(valid, 0, 12, "", 32, { font: "Serif", weight: 600, fill: C.paper });
  return t => {
    const p1 = out(t, m(3) - 0.4);
    show(head, fade(t, A.s) * p1); place(sh, 960, 620, pop(t, m(1) - 0.3) * p1 * 2.4);
    show(name, fade(t, m(2) - 0.3)); place(dina.g, dina.x, dina.y, pop(t, m(2) + 0.6) * out(t, m(3) - 0.3)); place(where.g, where.x, where.y, pop(t, m(3)));
    steps.forEach(s => place(s.c, s.x, 560, pop(t, s.a - 0.3)));
    arrs.forEach(a => a.render(t));
    place(cb.g, cb.x, cb.y, pop(t, m(7) + 0.6) * out(t, m(8) - 0.2));
    no.forEach((n, i) => { place(n.p.g, n.x + 140, 720, pop(t, n.a - 0.2)); place(bars[i], n.x + 140, 720, pop(t, n.a + 0.2)); });
    vt.textContent = t < m(13) - 0.3 ? "Pour être valable : temporaire…" : "Pour être valable : temporaire, et un intérêt sérieux (études, maturité).";
    place(valid, 960, 900, pop(t, m(12) - 0.3));
  };
});

// ---- 23 · Le démembrement de la clause ----
SC("23", "LES OUTILS · LE DÉMEMBREMENT", (g, A) => {
  const m = A.m, head = title(g, 190, "Le démembrement de la clause");
  const coupe = el("g", {}, g); const hL = el("g", {}, coupe), hR = el("g", {}, coupe);
  const hI1 = el("g", { transform: "scale(1.6)" }, hL); D.icons.house(hI1); const hI2 = el("g", { transform: "scale(1.6)" }, hR); D.icons.house(hI2);
  hL.setAttribute("clip-path", "inset(0 50% 0 0)"); hR.setAttribute("clip-path", "inset(0 0 0 50%)");
  const usu = bloc(g, 620, 160, "Usufruit", "le droit de s'en servir · celui qui habite", { size: 44 });
  const nue = bloc(g, 620, 160, "Nue-propriété", "posséder le bien · le propriétaire de demain", { size: 44, fill: C.accentSoft });
  const sophie = member(g, "sophie"), marc = member(g, "marc"), leo = member(g, "leo");
  const ct = contrat(g, "CONTRAT DE SOPHIE");
  const tagU = pill(g, 0, 0, "USUFRUITIER", { bg: C.ink, fg: C.paper, size: 20 }), tagN = pill(g, 0, 0, "NU-PROPRIÉTAIRE", { bg: C.accent, size: 20 });
  const fl = flux(g, 4), money = big(g, 960, 420, "24 000 €", 56);
  const dette = pill(g, 1240, 330, "UNE DETTE ENVERS LÉO : IL DEVRA RENDRE", { bg: C.face, size: 22 });
  const back = flux(g, 4), sans = pill(g, 1500, 330, "SANS NOUVELLE TAXATION", { bg: C.accent, size: 22 });
  const att = card(g, 1500, 110, { fill: C.ink }); txt(att, 0, 12, "Attention : Léo n'a rien à 18 ans, et la dette doit être écrite, à date certaine.", 30, { font: "Serif", weight: 600, fill: C.paper });
  return t => {
    const p1 = out(t, m(5) - 0.5), p2 = ease(prog(t, m(5) - 0.5, m(5)));
    show(head, fade(t, m(1) - 0.5));
    const sp = ease(prog(t, m(2), m(2) + 0.8));
    place(coupe, 960, 560, pop(t, m(2) - 0.4) * p1); hL.setAttribute("transform", `translate(${-90 * sp} 0)`); hR.setAttribute("transform", `translate(${90 * sp} 0)`);
    place(usu, 520, 830, pop(t, m(3) - 0.3) * p1); place(nue, 1400, 830, pop(t, m(4) - 0.3) * p1);
    sophie.at(t, m(5) - 0.3, 300, 900, { k: p2 * out(t, m(8) - 0.6) }); place(ct.g, 470, 640, pop(t, m(5)) * p2);
    marc.at(t, m(6) - 0.4, 960, 900, { k: p2 * out(t, m(10) - 0.3) }); place(tagU.g, 960, 980, pop(t, m(6)) * p2 * out(t, m(10) - 0.3));
    leo.at(t, m(7) - 0.4, 1560, 900, { k: p2, armL: t > m(10) ? 150 : 105 }); place(tagN.g, 1560, 980, pop(t, m(7)) * p2);
    fl(t, m(8) - 0.3, m(8) + 0.7, 480, 620, 960, 600); money.style.opacity = fade(t, m(8)) * out(t, m(10)) * p2;
    place(dette.g, dette.x, dette.y, pop(t, m(9) - 0.2) * out(t, m(10) + 0.4) * p2);
    back(t, m(10) - 0.2, m(10) + 0.8, 960, 600, 1560, 600); place(sans.g, sans.x, sans.y, pop(t, m(10) + 0.6) * out(t, m(11) - 0.3) * p2);
    place(att, 960, 330, pop(t, m(11) - 0.3) * p2);
  };
});

// ---- 24 · Le pacte adjoint au don manuel ----
SC("24", "LES OUTILS · LE PACTE ADJOINT", (g, A) => {
  const m = A.m, head = title(g, 190, "Le pacte adjoint au don manuel");
  const gift = cadeau(g), doc = el("g", {}, g); D.icons.contract(doc);
  const use = pill(g, 380, 330, "SCHÉMA A · POCHE A DU SCHÉMA C", { bg: C.face, size: 18 });
  const lab = txt(g, 380, 820, "un don, et un écrit qui en fixe les règles", 26, { font: "Serif", weight: 600, fill: C.inkSoft });
  const nt = notaire(g);
  const Q = [["toque", "Clause d'emploi", "études, logement, voiture", 4], ["lock", "Inaliénabilité", "rien avant un âge fixé", 5], ["people", "Administration", "un parent ou un tiers gère", 6], ["back", "Droit de retour", "les fonds vous reviennent", 7]].map(([k, a, b, mk], i) => {
    const c = card(g, 560, 220); const ic = el("g", { transform: "translate(-200 -10) scale(0.6)" }, c);
    if (k === "toque") toque(ic); else if (k === "lock") padlock(ic); else if (k === "people") { D.guy(ic).place(-30, 120, 0.4); D.guy(ic, { hair: "f", vest: C.inkSoft }).place(40, 120, 0.4); }
    else el("path", { ...D.line, stroke: C.accent, "stroke-width": 12, d: "M60 -40 A60 60 0 1 0 60 40 M60 40 L40 20 M60 40 L84 30" }, ic);
    txt(c, -120, -20, a, 36, { anchor: "start", font: "Serif", weight: 700 }); txt(c, -120, 24, b, 24, { anchor: "start", weight: 500, fill: C.inkSoft });
    return { c, x: 1000 + (i % 2) * 600, y: 420 + Math.floor(i / 2) * 260, a: m(mk) };
  });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    place(use.g, use.x, use.y, pop(t, m(1)));
    place(gift, 330, 600, pop(t, m(2) - 0.3) * 1.3);
    place(doc, 470, 560, pop(t, m(3) - 0.3) * 1.2, 8); lab.style.opacity = fade(t, m(3));
    place(nt, 380, 960, pop(t, m(3)) * 0.0);
    Q.forEach(q => place(q.c, q.x, q.y, pop(t, q.a - 0.3)));
  };
});

// ---- 25 · En résumé ----
SC("25", "EN RÉSUMÉ", (g, A) => {
  const m = A.m, head = title(g, 190, "Quelle marge de manœuvre pour vous ?");
  const hd = [["L'OUTIL", "", 160], ["RÉCUPÉRER L'ARGENT", "POUR VOUS ?", 880], ["DÉBLOQUER PLUS TÔT", "POUR L'ENFANT ?", 1380]].map(([a, b, x]) => {
    const w = el("g", {}, g); txt(w, x, 300, a, 20, { anchor: "start", weight: 800, ls: 4, fill: C.inkSoft }); txt(w, x, 328, b, 20, { anchor: "start", weight: 800, ls: 4, fill: C.inkSoft }); return w; });
  const rows = [["Assurance vie à votre nom", "schéma B, clause d'inaliénabilité", 2, "Oui", "à tout moment, par rachat", true, 3, "Oui", "on modifie la clause, ou on donne", 4],
    ["Don manuel", "schémas A et C, pacte adjoint", 5, "Non", "l'argent est déjà à l'enfant", false, 6, "Oui, si prévu", "dans le pacte", 7]].map((r, i) => {
    const y = 470 + i * 220, row = card(g, 1640, 190);
    const c1 = el("g", {}, g); txt(c1, 160, y - 4, r[0], 36, { anchor: "start", font: "Serif", weight: 700 }); txt(c1, 160, y + 36, r[1], 21, { anchor: "start", weight: 500, fill: C.inkSoft });
    const cell = (x, a, b, ok) => { const c = el("g", {}, g); const ck = check(c, ok); ck.setAttribute("transform", `translate(${x - 120} ${y - 14}) scale(0.7)`);
      txt(c, x - 80, y, a, 42, { anchor: "start", font: "Serif", weight: 700 }); txt(c, x - 120, y + 40, b, 21, { anchor: "start", weight: 500, fill: C.inkSoft }); return c; };
    return { row, y, c1, a: m(r[2]), c2: cell(1000, r[3], r[4], r[5]), a2: m(r[6]), c3: cell(1500, r[7], r[8], true), a3: m(r[9]) };
  });
  const key = card(g, 1500, 100, { fill: C.ink }); txt(key, 0, 12, "Assurance vie : vous gardez tout. Don : c'est définitif, mais encadré.", 32, { font: "Serif", weight: 600, fill: C.paper });
  return t => {
    show(head, fade(t, m(1) - 0.5)); hd.forEach(h => h.style.opacity = fade(t, m(1)));
    rows.forEach(r => { place(r.row, 960, r.y, pop(t, r.a - 0.3)); r.c1.style.opacity = fade(t, r.a - 0.2); r.c2.style.opacity = fade(t, r.a2 - 0.3); r.c3.style.opacity = fade(t, r.a3 - 0.3); });
    place(key, 960, 960, pop(t, m(8) - 0.3));
  };
});

// ---- 26 · La fiscalité, en bref ----
SC("26", "LA FISCALITÉ, EN BREF", (g, A) => {
  const m = A.m, head = title(g, 190, "Pour la plupart des familles : 0 € de droits");
  const F = [["100 000 €", "par parent et par enfant", "tous les 15 ans", 2], ["+ 31 865 €", "en don d'argent", "enfant majeur, donateur < 80 ans", 3], ["152 500 €", "par bénéficiaire au décès", "versements avant 70 ans", 4], ["4 600 €", "de gains sans impôt par an", "après 8 ans · 9 200 € en couple", 5]].map(([a, b, c, k], i) => {
    const cd = card(g, 400, 260, { fill: i === 2 ? C.accentSoft : C.face }); el("path", { ...D.line, stroke: C.accent, "stroke-width": 6, d: "M-160 -96 L-110 -96" }, cd);
    txt(cd, -160, -26, a, 52, { anchor: "start", font: "Serif", weight: 700 }); txt(cd, -160, 24, b, 22, { anchor: "start", weight: 600 }); txt(cd, -160, 60, c, 19, { anchor: "start", weight: 500, fill: C.inkSoft });
    return { cd, x: 300 + i * 440, a: m(k) };
  });
  const foyer = bloc(g, 700, 130, "Rattaché à votre foyer", "ses gains sont imposés chez vous", { size: 34, fill: C.ink });
  const auto = bloc(g, 700, 130, "Autonome", "son propre abattement", { size: 34, fill: C.ink });
  const ar = arrow(g, 960, 830, 1060, 830, m(7) - 0.4, m(7) - 0.1);
  const zero = pill(g, 1460, 960, "SOUVENT 0 € D'IMPÔT", { bg: C.accent, size: 24 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    F.forEach(f => place(f.cd, f.x, 470, pop(t, f.a - 0.3)));
    place(foyer, 560, 830, pop(t, m(6) - 0.3)); place(auto, 1420, 830, pop(t, m(7) - 0.3)); ar.render(t);
    place(zero.g, zero.x, zero.y, pop(t, m(8) - 0.3));
  };
});

// ---- 27 · Une carte cadeau qui se recharge ----
SC("27", "UNE CARTE CADEAU QUI SE RECHARGE", (g, A) => {
  const m = A.m, head = title(g, 190, "Les 100 000 € : une carte cadeau qui se recharge");
  const carte = el("g", {}, g); el("rect", { ...D.line, fill: C.ink, x: -230, y: -140, width: 460, height: 280, rx: 24 }, carte);
  el("rect", { ...D.line, "stroke-width": 3, fill: C.accent, x: -180, y: -80, width: 70, height: 50, rx: 8 }, carte);
  txt(carte, 180, -80, "100 000 €", 24, { anchor: "end", weight: 800, ls: 2, fill: C.accentSoft });
  const solde = txt(carte, 0, 70, "", 64, { font: "Serif", weight: 700, fill: C.paper });
  const flow = [["Patrimoine : 125 000 €", 3], ["Don à l'enfant : 5 000 €", 4], ["Reste : 120 000 €", 5]].map(([s, k], i) => ({ p: pill(g, 0, 0, s, { bg: i === 1 ? C.accent : C.face, size: 22 }), a: m(k), x: 400 + i * 560 }));
  const ar = [0, 1].map(i => arrow(g, 615 + i * 560, 300, 680 + i * 560, 300, m(4 + i) - 0.4, m(4 + i) - 0.1, { w: 6 }));
  const cal = calendar(g, "15 ANS"); cal.t.setAttribute("font-size", 30);
  const sc1 = bloc(g, 760, 200, "120 000 − 95 000 = 25 000 €", "taxés : environ 3 200 € de droits", { size: 42 });
  const sc2 = bloc(g, 760, 200, "120 000 − 100 000 = 20 000 €", "taxés : environ 2 200 € de droits", { size: 42, fill: C.ink });
  const lab1 = txt(g, 1320, 420, "SCÉNARIO 1 · DÉCÈS À L'ANNÉE 3", 22, { weight: 800, ls: 4, fill: C.inkSoft }), lab2 = txt(g, 1320, 680, "SCÉNARIO 2 · DÉCÈS À L'ANNÉE 16", 22, { weight: 800, ls: 4, fill: C.accent });
  const key = card(g, 1500, 100, { fill: C.accentSoft }); txt(key, 0, 12, "Donner ne coûte jamais plus cher : au pire c'est neutre, au mieux on gagne.", 32, { font: "Serif", weight: 600 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    const bal = t < m(6) - 0.3 ? 100000 : t < m(7) ? 95000 : lerp(95000, 100000, ease(prog(t, m(7), m(7) + 1)));
    place(carte, 520, 600, pop(t, m(2) - 0.3)); solde.textContent = fmt(bal) + " €";
    flow.forEach(f => place(f.p.g, f.x, 300, pop(t, f.a - 0.3))); ar.forEach(a => a.render(t));
    place(cal.g, 520, 880, pop(t, m(7) - 0.3) * 0.8);
    lab1.style.opacity = fade(t, m(8) - 0.3); place(sc1, 1320, 530, pop(t, m(9) - 0.3));
    lab2.style.opacity = fade(t, m(10) - 0.3); place(sc2, 1320, 790, pop(t, m(11) - 0.3));
    place(key, 960, 1000, pop(t, m(12) - 0.3));
  };
});

// ---- 28 · Les grands-parents, un levier oublié ----
SC("28", "LES GRANDS-PARENTS", (g, A) => {
  const m = A.m, head = title(g, 190, "Les grands-parents, un levier oublié");
  const mamie = member(g, "mamie"), noe = member(g, "noe");
  const fl = flux(g, 5), pile = el("g", {}, g); stack(pile, 8, 34);
  const off = pill(g, 760, 300, "DE FAÇON OFFICIELLE", { bg: C.accent, size: 22 });
  const bloc1 = card(g, 560, 300, { fill: C.ink }); txt(bloc1, 0, -80, "50 € PAR MOIS DÈS LA NAISSANCE", 20, { weight: 800, ls: 4, fill: C.accent });
  const n17 = txt(bloc1, 0, 20, "", 76, { font: "Serif", weight: 700, fill: C.paper }); txt(bloc1, 0, 80, "en plus, à ses 18 ans", 24, { weight: 500, fill: C.accentSoft });
  const L = (s, k, y) => { const r = el("g", {}, g); const c = check(r); c.setAttribute("transform", "scale(0.7)");
    txt(r, 44, 12, s, 30, { anchor: "start", font: "Serif", weight: 600 }); return { r, a: m(k), y }; };
  const items = [L("31 865 € par petit-enfant, tous les 15 ans", 4, 720), L("+ 31 865 € en don d'argent, enfant majeur", 5, 800), L("Cumulable avec les dons des parents", 5, 880)];
  const ecole = el("g", {}, g); toque(ecole);
  const enc = card(g, 1500, 90, { fill: C.accentSoft }); txt(enc, 0, 10, "Le tout encadré : assurance vie, administrateur, clauses.", 30, { font: "Serif", weight: 600 });
  return t => {
    const up = ease(prog(t, m(4) - 0.6, m(4)));
    show(head, fade(t, m(1) - 0.5));
    mamie.at(t, m(1) - 0.3, 300, 900 - 250 * up, { scale: 1 - 0.35 * up, armR: 20 }); noe.at(t, m(2) - 0.5, 1000, 900 - 250 * up, { scale: 1 - 0.2 * up, armL: 150 });
    place(off.g, off.x, off.y, pop(t, m(1) + 0.6) * (1 - up));
    fl(t, m(2), m(2) + 1.2, 360, 620 - 200 * up, 820, 760 - 200 * up);
    place(pile, 830, 860 - 230 * up, pop(t, m(2) + 0.6) * (1 - 0.4 * up));
    place(bloc1, 1480, 470, pop(t, m(3) - 0.4)); n17.textContent = "≈ " + fmt(17500 * ease(prog(t, m(3) - 0.3, m(3) + 0.6))) + " €";
    items.forEach((it, i) => place(it.r, 300, it.y, pop(t, it.a - 0.3 + (i === 2 ? 1.2 : 0))));
    place(ecole, 1480, 790, pop(t, m(6) - 0.3) * 0.9);
    place(enc, 960, 1000, pop(t, m(7) - 0.3));
  };
});

// ---- 29 · Trois points de vigilance ----
SC("29", "TROIS POINTS DE VIGILANCE", (g, A) => {
  const m = A.m, head = title(g, 190, "Trois points de vigilance, à voir avec le notaire");
  const P = [["01", "Frères et sœurs", "les dons sont recomptés", "à la succession", 2], ["02", "Décès d'un parent", "l'autre parent gère", "le capital du mineur", 3], ["03", "Divorce", "en communauté, le contrat", "d'un parent est partagé", 4]].map(([n, a, b, c, k], i) => {
    const cd = card(g, 500, 420); el("path", { ...D.line, stroke: C.accent, "stroke-width": 8, d: "M-250 -206 L250 -206" }, cd);
    txt(cd, -200, -90, n, 80, { anchor: "start", font: "Serif", weight: 700, fill: C.inkSoft }); txt(cd, -200, 0, a, 38, { anchor: "start", font: "Serif", weight: 700 });
    txt(cd, -200, 56, b, 24, { anchor: "start", weight: 500, fill: C.inkSoft }); txt(cd, -200, 90, c, 24, { anchor: "start", weight: 500, fill: C.inkSoft });
    return { cd, x: 400 + i * 560, a: m(k) };
  });
  const nt = notaire(g);
  return t => {
    show(head, fade(t, m(1) - 0.5));
    P.forEach(p => place(p.cd, p.x, 560, pop(t, p.a - 0.3)));
    place(nt, 960, 960, pop(t, m(1)) * 0.45);
  };
});

// ---- 30 · Quatre questions pour démarrer ----
SC("30", "PASSER À L'ACTION", (g, A) => {
  const m = A.m, head = title(g, 190, "Quatre questions pour démarrer");
  const Q = [["Quel montant à ses 18 ans, et pour financer quoi ?", 2], ["Combien par mois, sans vous mettre en difficulté ?", 3], ["Garder la main, ou mettre l'argent à l'abri ?", 4], ["Qui d'autre veut participer, et qui gère si besoin ?", 5]].map(([s, k], i) => {
    const r = el("g", {}, g); el("circle", { ...D.line, fill: C.accent, r: 40 }, r); txt(r, 0, 14, String(i + 1), 40, { font: "Serif", weight: 700 });
    txt(r, 70, 12, s, 38, { anchor: "start", font: "Serif", weight: 600 }); return { r, a: m(k), y: 340 + i * 140 };
  });
  const riz = el("g", {}, g); el("path", { ...D.line, fill: C.face, d: "M-70 0 Q0 70 70 0 Z" }, riz);
  for (let i = 0; i < 9; i++) el("ellipse", { cx: -44 + i * 11, cy: -6 - (i % 3) * 7, rx: 5, ry: 3, fill: C.paperDeep, stroke: C.ink, "stroke-width": 1.5 }, riz);
  const rizL = txt(g, 1640, 560, "pas que du riz !", 24, { font: "Serif", weight: 600, fill: C.inkSoft });
  const me = member(g, "mathyas");
  const cta = pill(g, 960, 1000, "REVENEZ VERS MOI AVEC VOS 4 RÉPONSES", { bg: C.ink, fg: C.paper, size: 26 });
  return t => {
    show(head, fade(t, m(1) - 0.5));
    Q.forEach(q => place(q.r, 220, q.y, pop(t, q.a - 0.3)));
    place(riz, 1640, 480, pop(t, m(3) + 0.8) * out(t, m(4))); rizL.style.opacity = fade(t, m(3) + 1) * out(t, m(4));
    me.at(t, m(7) - 0.6, 1700, 900, { armR: -20 });
    place(cta.g, cta.x - 160, cta.y, pop(t, m(7) - 0.3));
  };
});

// ---- 31 · Chacun son métier + conclusion ----
SC("31", "CHACUN SON MÉTIER", (g, A) => {
  const m = A.m, head = title(g, 190, "Chacun son métier");
  const left = card(g, 720, 440), right = card(g, 720, 440, { fill: C.ink });
  const lg = el("g", {}, g); D.micLogo(lg, 0, 0, 60);
  txt(left, -190, -150, "CRÉER LE PATRIMOINE", 20, { anchor: "start", weight: 800, ls: 5, fill: C.accent }); txt(left, -190, -110, "Votre conseiller MIC", 36, { anchor: "start", font: "Serif", weight: 700 });
  txt(right, -300, -150, "CHOISIR COMMENT TRANSMETTRE", 20, { anchor: "start", weight: 800, ls: 5, fill: C.accent }); txt(right, -300, -110, "Le notaire partenaire", 36, { anchor: "start", font: "Serif", weight: 700, fill: C.paper });
  const LI = (parent, x, y, s, k, dark) => { const r = el("g", {}, g); const c = check(r); c.setAttribute("transform", "scale(0.55)");
    txt(r, 34, 10, s, 26, { anchor: "start", weight: 500, fill: dark ? C.paper : C.ink }); return { r, x, y, a: m(k) }; };
  const li = [LI(left, 290, 470, "Fixer l'objectif à 18 ans", 3), LI(left, 290, 530, "Choisir le contrat et l'allocation", 3), LI(left, 290, 590, "Mettre en place les versements", 4), LI(left, 290, 650, "Suivre et ajuster chaque année", 5),
    LI(right, 1070, 470, "Trancher : schéma A, B ou C", 6, true), LI(right, 1070, 530, "Rédiger les clauses et le pacte", 6, true), LI(right, 1070, 590, "Sécuriser la succession", 6, true), LI(right, 1070, 650, "Déclarer les dons", 6, true)];
  const plus = el("g", {}, g); el("circle", { ...D.line, fill: C.accent, r: 46 }, plus); el("path", { ...D.line, "stroke-width": 8, d: "M-20 0 L20 0 M0 -20 L0 20" }, plus);
  const nt = notaire(g);
  const secu = pill(g, 960, 870, "UNE SÉCURITÉ DE DINGUE", { bg: C.accent, size: 24 });
  const q1 = big(g, 960, 470, "Le meilleur moment pour commencer,", 60), q2 = big(g, 960, 550, "c'était à sa naissance.", 60), q3 = big(g, 960, 680, "Le deuxième, c'est aujourd'hui.", 72, C.inkSoft);
  const sp = el("g", {}, g); const spI = el("g", { transform: "scale(1.6)" }, sp); D.icons.sprout(spI);
  return t => {
    const p1 = out(t, m(9) - 0.7);
    show(head, fade(t, m(1) - 0.5) * p1);
    place(left, 540, 540, pop(t, m(2) - 0.4) * p1); place(lg, 280, 400, pop(t, m(2)) * p1);
    place(right, 1380, 540, pop(t, m(6) - 0.5) * p1); place(nt, 1650, 410, pop(t, m(7) - 0.3) * 0.35 * p1);
    li.forEach(l => place(l.r, l.x, l.y, pop(t, l.a - 0.2) * p1));
    place(plus, 960, 540, pop(t, m(6) - 0.2) * p1); place(secu.g, secu.x, secu.y, pop(t, m(8) - 0.3) * p1);
    show(q1, fade(t, m(9) - 0.6)); show(q2, fade(t, m(9) - 0.2)); show(q3, fade(t, m(10) - 0.3));
    place(sp, 960, 920, pop(t, m(10)));
    spI.lastElementChild.setAttribute("transform", `translate(32 -16) scale(${1 + 0.6 * ease(prog(t, m(10), m(10) + 1.5))}) translate(-32 16)`);
  };
});
