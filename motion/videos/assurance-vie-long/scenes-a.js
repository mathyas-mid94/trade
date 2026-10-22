// Chapitres 0:08 → 4:22 (temps = secondes dans la voix)

// ---- Introduction : quel est le meilleur contrat ? ----
SC(7.9, "00", "INTRODUCTION", (g, at) => {
  const m = person(g, MATHYAS);
  const qg = el("g", {}, g); txt(qg, 0, 38, "?", 110, { font: "Serif", weight: 700, fill: C.accent });
  const names = ["PEA", "COMPTE-TITRES", "ASSURANCE VIE"];
  const cards = names.map((n, i) => { const c = card(g, 360, 150); txt(c, 0, 12, n, 30, { weight: 800, ls: 3 }); return { c, x: 820 + i * 400, a: 14.6 + i * 1.0 }; });
  const checks = cards.map(() => check(g));
  const where = [bank(g, "BANQUE", 220), bank(g, "ASSUREUR", 220)];
  const okko = [check(g, true), check(g, false)];
  const eps = [1, 2, 3].map(i => { const c = card(g, 250, 150, { fill: C.paperDeep }); el("path", { ...D.line, fill: C.accent, d: "M-18 -32 L30 0 L-18 32 Z" }, c);
    txt(c, 0, 108, `ÉPISODE ${i}`, 22, { weight: 800, ls: 5, fill: C.inkSoft }); return c; });
  const ring = el("rect", { fill: "none", stroke: C.accent, "stroke-width": 7, x: -140, y: -90, width: 280, height: 180, rx: 20 }, g);
  const how = txt(g, 860, 1010, "SON FONCTIONNEMENT", 26, { weight: 800, ls: 8, fill: C.accent });
  return t => {
    stand(m, t, 8.6, 360, 900, 1.05, false, 105, t > 14 && t < 24 ? -30 : 75);
    place(qg, 380, 380 + Math.sin(t * 3) * 6, pop(t, 12.0) * out(t, 24.0));
    const focus = ease(prog(t, 24.6, 25.6)), gone = out(t, 40.6, 0.5);
    cards.forEach((c, i) => {
      const isAV = i === 2, dim = isAV ? 1 : 1 - focus;
      const x = isAV ? lerp(c.x, 1180, focus) : c.x, y = isAV ? lerp(430, 420, focus) : lerp(430, 430, focus);
      place(c.c, x, y, pop(t, c.a) * (isAV ? 1 + 0.25 * focus : 1) * (isAV ? 1 : gone)); c.c.style.opacity = Math.min(dim, pop(t, c.a) > 0 ? 1 : 0) * (isAV ? 1 : gone);
      place(checks[i], c.x + 150, 350, pop(t, 20.4 + i * 0.5) * (1 - focus));
    });
    place(where[0], 920, 790, pop(t, 29.5) * 0.55 * gone); place(where[1], 1440, 790, pop(t, 30.6) * 0.55 * gone);
    place(okko[0], 1100, 610, pop(t, 37.0) * gone); place(okko[1], 1260, 610, pop(t, 38.6) * gone);
    eps.forEach((e, i) => place(e, 860 + i * 320, 800, pop(t, 42.0 + i * 0.35)));
    place(ring, 860, 800, pop(t, 47.2)); show(how, fade(t, 47.6));
  };
});

// ---- Les 3 objectifs ----
SC(53, "01", "LES 3 OBJECTIFS", (g, at) => {
  const head = title(g, 200, "Trois objectifs principaux");
  const items = [["curve", "FAIRE FRUCTIFIER", "son épargne qui dort", 56.4], ["heart", "PROTÉGER", "ses proches", 57.6], ["percent", "FISCALITÉ", "avantageuse", 59.2]].map(([k, l1, l2, a], i) => {
    const m = el("g", {}, g); el("circle", { ...D.line, fill: C.face, r: 150 }, m);
    draw(el("circle", { fill: "none", stroke: C.accent, "stroke-width": 5, r: 168, transform: "rotate(-90)" }, m), a + 0.2, a + 0.9);
    const ic = el("g", { transform: "scale(1.15)" }, m); if (k === "heart") { const h = heart(ic); h.setAttribute("transform", "translate(0 12)"); } else D.icons[k](ic);
    return { m, x: 500 + i * 460, a, t1: txt(g, 500 + i * 460, 760, l1, 36, { weight: 800, ls: 7 }), t2: txt(g, 500 + i * 460, 805, l2, 26, { weight: 500, fill: C.inkSoft }) };
  });
  return t => { show(head, fade(t, 53.4)); for (const it of items) { place(it.m, it.x, 490, pop(t, it.a, 0.5)); show(it.t1, fade(t, it.a + 0.2)); show(it.t2, fade(t, it.a + 0.4)); } };
});

// ---- Faire fructifier ----
SC(63, "02", "FAIRE FRUCTIFIER SON ÉPARGNE", (g, at) => {
  const axis = el("path", { ...D.line, "stroke-width": 5, d: "M200 760 L1720 760" }, g); draw(axis, 63.3, 64.2);
  const low = el("rect", { ...D.line, fill: C.inkSoft, x: 330, width: 280, rx: 30 }, g);
  const lowT = txt(g, 470, 0, "RENTABILITÉ FAIBLE", 20, { weight: 800, ls: 4, fill: C.paper });
  const livrets = ["LIVRET A", "LDD", "PEL", "CEL"].map((n, i) => { const c = card(g, 150, 90, { fill: C.paperDeep, rx: 8 }); txt(c, 0, 9, n, 22, { weight: 800, ls: 2 }); return { c, x: 300 + i * 165 }; });
  const env = envelope(g, "");
  const high = el("rect", { ...D.line, fill: C.accent, x: 1310, width: 300, rx: 40 }, g);
  const highT = txt(g, 1460, 0, "RENTABILITÉ ATTRACTIVE", 20, { weight: 800, ls: 3, fill: C.ink });
  const arrow = el("path", { ...D.line, stroke: C.accent, "stroke-width": 8, d: "M700 600 C820 470 1000 470 1180 560 M1150 520 L1185 562 L1135 580" }, g); draw(arrow, 71.6, 72.6);
  // l'enveloppe "véhicule d'investissement" sur roues
  const car = el("g", {}, g);
  const cenv = envelope(car, ""); cenv.g.setAttribute("transform", "scale(0.32)");
  const wheels = [-60, 60].map(x => el("g", { transform: `translate(${x} 62)` }, car));
  wheels.forEach(w => { el("circle", { ...D.line, fill: C.ink, r: 18 }, w); el("path", { ...D.line, stroke: C.paper, "stroke-width": 4, d: "M-10 0 L10 0" }, w); });
  const speed = el("path", { ...D.line, "stroke-width": 4, d: "M-150 -20 L-110 -20 M-170 10 L-120 10 M-150 40 L-110 40" }, car);
  // épargne qui dort -> épargne active
  const sleepy = el("g", {}, g); const sc = K.stack(sleepy, 3, 40);
  const zzz = txt(sleepy, 70, -90, "z z z", 40, { font: "Serif", weight: 700, fill: C.inkSoft });
  const lab1 = pill(g, 560, 420, "ÉPARGNE INACTIVE", { bg: C.face }), lab2 = pill(g, 560, 420, "ÉPARGNE ACTIVE", { bg: C.accent });
  const passive = card(g, 400, 240), active = card(g, 400, 240);
  const loop = el("path", { ...D.line, stroke: C.inkSoft, "stroke-width": 7, d: "M-40 -40 A50 50 0 1 1 -60 10 M-70 -10 L-60 12 L-38 2" }, passive); loop.setAttribute("transform", "translate(0 -10)");
  txt(passive, 0, 80, "GESTION PASSIVE", 26, { weight: 800, ls: 4 }); txt(passive, 0, 112, "une équipe de professionnels", 22, { weight: 500, fill: C.inkSoft });
  el("path", { ...D.line, stroke: C.accent, "stroke-width": 7, d: "M-70 -50 L60 -50 M40 -68 L62 -50 L40 -32 M70 0 L-60 0 M-40 -18 L-62 0 L-40 18" }, active);
  txt(active, 0, 80, "GESTION ACTIVE", 26, { weight: 800, ls: 4 }); txt(active, 0, 112, "vous prenez la main · arbitrages", 22, { weight: 500, fill: C.inkSoft });
  return t => {
    const part1 = out(t, 80.6, 0.5);
    const lh = 120 * ease(prog(t, 64.3, 65.2)); low.setAttribute("y", 760 - lh); low.setAttribute("height", lh); low.style.opacity = (lh > 1 ? 1 : 0) * part1;
    lowT.setAttribute("y", 760 - lh / 2 + 9); lowT.style.opacity = (lh > 100 ? 1 : 0) * part1;
    livrets.forEach((l, i) => { place(l.c, l.x + 30, 520, pop(t, 67.4 + i * 0.4) * part1); });
    env.setOpen(0); place(env.g, 960, 640, pop(t, 70.4) * 0.38 * part1);
    const hh = 430 * ease(prog(t, 72.4, 73.6)); high.setAttribute("y", 760 - hh); high.setAttribute("height", hh); high.style.opacity = (hh > 1 ? 1 : 0) * part1;
    highT.setAttribute("y", 760 - hh / 2 + 9); highT.style.opacity = (hh > 200 ? 1 : 0) * part1;
    arrow.style.opacity = part1; axis.style.opacity = Math.max(part1, 0);
    const cx = lerp(-300, 2200, prog(t, 77.6, 80.8));
    car.setAttribute("transform", `translate(${cx} ${880 + Math.sin(t * 30) * 2})`); car.style.opacity = t > 77.6 && t < 80.8 ? 1 : 0;
    wheels.forEach((w, i) => w.setAttribute("transform", `translate(${i ? 60 : -60} 62) rotate(${t * 900})`));
    // épargne inactive -> active
    const wake = ease(prog(t, 84.4, 84.9));
    place(sleepy, 560, 640 - 60 * Math.abs(Math.sin(Math.max(0, t - 84.4) * 5)) * wake * (t < 87 ? 1 : 0), pop(t, 81.4) * out(t, 94.0));
    zzz.style.opacity = (1 - wake) * (0.6 + 0.4 * Math.sin(t * 3));
    place(lab1.g, 560, 420, pop(t, 81.8) * (1 - wake)); place(lab2.g, 560, 420, wake > 0 ? back(prog(t, 84.4, 84.8)) : 0);
    lab2.g.style.opacity = wake > 0 ? 1 : 0; lab2.g.setAttribute("transform", `translate(560 420) scale(${back(prog(t, 84.4, 84.8)) * out(t, 94)})`);
    place(passive, 1250, 470, pop(t, 86.6)); place(active, 1250, 760, pop(t, 89.6));
  };
});

// ---- Alimenter l'enveloppe ----
SC(95, "03", "ALIMENTER L'ENVELOPPE", (g, at) => {
  const env = envelope(g);
  const cal = calendar(g, "1er"); const lp = txt(g, 360, 300, "VERSEMENTS PÉRIODIQUES", 26, { weight: 800, ls: 5, fill: C.inkSoft });
  const lr = txt(g, 1560, 300, "VERSEMENTS LIBRES", 26, { weight: 800, ls: 5, fill: C.inkSoft });
  const drip = [0, 1, 2, 3, 4, 5].map(() => coin(g)); const big = K.stack(g, 6, 34);
  // revenus - dépenses = épargne
  const eq = el("g", {}, g);
  const rev = K.icon(eq, "coins", 0.9, true), dep = K.icon(eq, "receipt", 0.9, true), epa = K.icon(eq, "piggy", 0.9, true);
  const signs = [txt(eq, 0, 0, "−", 90, { font: "Serif", weight: 600 }), txt(eq, 0, 0, "=", 90, { font: "Serif", weight: 600 })];
  const labs = ["REVENUS", "DÉPENSES", "LE RESTE"].map(s => txt(eq, 0, 0, s, 24, { weight: 800, ls: 4, fill: C.inkSoft }));
  const fly = coin(g, 30);
  // capital + intérêts (comme la slide)
  const tower = el("g", {}, g);
  const blocks = [["CAPITAL", C.inkSoft, 420, 120, C.paper], ["INTÉRÊTS", C.accent, 360, 70, C.ink], ["INTÉRÊTS", C.accent, 320, 62, C.ink], ["INTÉRÊTS", C.accent, 280, 56, C.ink]].map(([s, f, w, h, fg]) => {
    const b = el("g", {}, tower); el("rect", { ...D.line, fill: f, x: -w / 2, y: -h, width: w, height: h, rx: 10 }, b);
    txt(b, 0, -h / 2 + 10, s, s === "CAPITAL" ? 40 : 26, { weight: 800, ls: 6, fill: fg }); return { b, h };
  });
  const stars = [0, 1, 2, 3, 4, 5].map(i => { const p = el("path", { ...D.line, stroke: C.accent, "stroke-width": 5, d: "M0 -18 L0 18 M-18 0 L18 0" }, g); return p; });
  return t => {
    const phase2 = ease(prog(t, 103.0, 103.8));
    env.setOpen(ease(prog(t, 96.8, 97.3)));
    place(env.g, lerp(960, 1300, phase2), 600, pop(t, 95.4, 0.5) * lerp(0.8, 0.72, phase2));
    const ex = lerp(960, 1300, phase2), ey = 460;
    place(cal.g, 360, 470, pop(t, 98.2) * out(t, 102.8)); show(lp, fade(t, 98.4) * out(t, 102.8));
    drip.forEach((c, i) => { const a = 99.0 + i * 0.6, u = prog(t, a, a + 0.5); const p = D.arcPt([400, 420], [ex, ey], -160, ease(u)); place(c, p[0], p[1], u > 0 && u < 1 ? 0.9 : 0, u * 300); });
    const bu = prog(t, 101.9, 102.6), bp = D.arcPt([1650, 640], [ex, ey], -260, ease(bu));
    place(big, bp[0], bp[1], pop(t, 101.4) * (bu < 1 ? 1 : 0)); show(lr, fade(t, 101.4) * out(t, 102.8));
    // équation
    const eqOut = out(t, 110.4);
    [[rev, 260, 104.0], [dep, 560, 105.4], [epa, 860, 106.6]].forEach(([n, x, a], i) => { place(n, x, 560, pop(t, a) * eqOut); labs[i].setAttribute("x", x); labs[i].setAttribute("y", 700); labs[i].style.opacity = fade(t, a + 0.2) * eqOut; });
    signs[0].setAttribute("x", 410); signs[0].setAttribute("y", 590); signs[0].style.opacity = fade(t, 105.0) * eqOut;
    signs[1].setAttribute("x", 710); signs[1].setAttribute("y", 590); signs[1].style.opacity = fade(t, 106.2) * eqOut;
    const fu = prog(t, 108.0, 108.7), fp = D.arcPt([860, 520], [ex, ey], -220, ease(fu)); place(fly, fp[0], fp[1], fu > 0 && fu < 1 ? 1 : 0, fu * 400);
    // tour capital + intérêts
    let y = 0;
    blocks.forEach((b, i) => { const k = pop(t, [112.6, 114.8, 115.6, 116.4][i]); b.b.setAttribute("transform", `translate(0 ${-y}) scale(${k})`); b.b.style.opacity = k > 0 ? 1 : 0; y += b.h * Math.min(1, k) + 6; });
    place(tower, 520, 820, 1);
    stars.forEach((s, i) => { const a = i / 6 * Math.PI * 2 + t * 0.6, k = pop(t, 121.6 + i * 0.1) * (0.7 + 0.3 * Math.sin(t * 5 + i));
      place(s, 1300 + 330 * Math.cos(a), 600 + 230 * Math.sin(a), k); });
  };
});

// ---- Disponible à tout moment ----
SC(126, "04", "DISPONIBLE À TOUT MOMENT", (g, at) => {
  const lock = padlock(g);
  const env = envelope(g, "");
  const cin = [0, 1, 2].map(() => coin(g)), cout = [0, 1, 2].map(() => coin(g));
  const l1 = txt(g, 520, 330, "PLACER", 30, { weight: 800, ls: 8, fill: C.inkSoft }), l2 = txt(g, 1400, 330, "RETIRER", 30, { weight: 800, ls: 8, fill: C.inkSoft });
  const cmp = el("g", {}, g);
  const ca = card(cmp, 520, 230); txt(ca, 0, -50, "LIVRET A", 30, { weight: 800, ls: 6 }); txt(ca, 0, 40, "immédiat", 52, { font: "Serif", weight: 600 });
  const cb = card(cmp, 520, 230, { fill: C.accentSoft }); txt(cb, 0, -50, "ASSURANCE VIE", 30, { weight: 800, ls: 6 });
  const days = txt(cb, 0, 40, "3 jours", 52, { font: "Serif", weight: 600 });
  const slow = pill(g, 1240, 790, "CERTAINS ASSUREURS : JUSQU'À 1 MOIS", { bg: C.face, size: 22 });
  const ok = pill(g, 960, 900, "AUCUNE CONDITION SPÉCIFIQUE", { bg: C.accent });
  return t => {
    const p1 = out(t, 137.6, 0.5);
    place(lock.g, 960, 380, pop(t, 126.6) * p1 * 1.3); lock.open(ease(prog(t, 129.6, 130.2)));
    env.setOpen(1); place(env.g, 960, 700, pop(t, 127.0) * 0.5 * p1);
    show(l1, fade(t, 132.6) * p1); show(l2, fade(t, 134.0) * p1);
    cin.forEach((c, i) => { const a = 132.8 + i * 0.6, u = prog(t, a, a + 0.5); const p = D.arcPt([360, 640], [960, 600], -200, ease(u)); place(c, p[0], p[1], u > 0 && u < 1 ? 0.9 : 0, u * 300); });
    cout.forEach((c, i) => { const a = 134.4 + i * 0.6, u = prog(t, a, a + 0.5); const p = D.arcPt([960, 600], [1560, 640], -200, ease(u)); place(c, p[0], p[1], u > 0 && u < 1 ? 0.9 : 0, u * 300); });
    place(ca, -300, 0, pop(t, 138.4)); place(cb, 300, 0, pop(t, 139.4)); place(cmp, 960, 500, 1); cmp.style.opacity = t > 138 ? 1 : 0;
    days.textContent = t < 144.4 ? "3 jours" : t < 145.4 ? "5 jours" : "10 jours";
    place(slow.g, slow.x, slow.y, pop(t, 146.6)); place(ok.g, ok.x, ok.y, pop(t, 151.6));
  };
});

// ---- Hors succession ----
SC(155, "05", "HORS DROITS DE SUCCESSION", (g, at) => {
  const contract = el("g", {}, g); D.icons.contract(contract);
  const lab = pill(g, 560, 230, "EXONÉRATION DES DROITS DE SUCCESSION", { size: 22 });
  const fam = [{ guy: person(g, { hair: "f", vest: C.inkSoft }), x: 1240, s: 0.72 }, { guy: person(g), x: 1450, s: 0.76 }, { guy: person(g, { vest: C.accentSoft }), x: 1630, s: 0.5 }];
  fam.forEach((f, i) => { f.curl = D.curl(g, [720, 440 + i * 110], [f.x - 40, 880 - f.s * 290], -70 + i * 40, 3, 12); draw(f.curl, 168.6 + i * 0.4, 169.6 + i * 0.4);
    f.tag = pill(g, f.x, 880 - f.s * 400 - 50, "152 500 €", { size: 24, ls: 2, bg: C.accent }); });
  const per = txt(g, 1440, 260, "PAR BÉNÉFICIAIRE", 28, { weight: 800, ls: 8, fill: C.inkSoft });
  const boost = txt(g, 1440, 980, "un vrai coup de pouce pour vos proches", 30, { font: "Serif", weight: 500, fill: C.inkSoft });
  return t => {
    place(contract, 560, 560, pop(t, 155.4, 0.5) * 2.3); place(lab.g, lab.x, lab.y, pop(t, 158.6));
    fam.forEach((f, i) => { const s = pop(t, 165.6 + i * 0.3); f.guy.pose(105, 75).place(f.x, 880, s * f.s, true); f.guy.g.style.opacity = s > 0 ? 1 : 0;
      place(f.tag.g, f.tag.x, f.tag.y, pop(t, 176.8 + i * 0.35)); });
    show(per, fade(t, 178.0)); show(boost, fade(t, 181.0));
  };
});

// ---- Insaisissable ----
SC(186, "05", "INSAISISSABLE", (g, at) => {
  const env = envelope(g); const sh = el("g", {}, g); shield(sh, C.accent); el("path", { ...D.line, "stroke-width": 9, d: "M-24 2 L-6 22 L28 -18" }, sh);
  const state = bank(g, "ÉTAT · IMPÔTS", 300);
  const grab = el("path", { ...D.line, stroke: C.inkSoft, "stroke-width": 9, d: "M0 0 L-380 0 M-350 -26 L-385 0 L-350 26" }, g);
  const l1 = pill(g, 760, 210, "INSAISISSABLE", { bg: C.accent, size: 30 });
  const l2 = txt(g, 760, 940, "Personne ne peut venir y piocher.", 40, { font: "Serif", weight: 500 });
  const l3 = pill(g, 760, 300, "VOTRE CAPITAL PRIVÉ", { bg: C.face });
  return t => {
    env.setOpen(0); place(env.g, 700, 580, pop(t, 186.4) * 0.8);
    place(state, 1560, 600, pop(t, 187.4) * 0.9);
    const shk = pop(t, 189.4, 0.5); place(sh, 700, 560, shk * 1.4);
    const u = prog(t, 190.6, 191.3), bounce = ease(prog(t, 191.3, 191.9));
    const gx = 1380 - 330 * ease(u) + 330 * bounce; grab.setAttribute("transform", `translate(${gx} 620)`); grab.style.opacity = t > 190.6 && t < 192.4 ? 1 : 0;
    if (t > 191.2 && t < 191.6) sh.setAttribute("transform", `translate(706 560) scale(${1.4 * 1.08})`);
    place(l1.g, l1.x, l1.y, pop(t, 189.8)); show(l2, fade(t, 193.6)); place(l3.g, l3.x, l3.y, pop(t, 196.0) * 0);
  };
});

// ---- Nantissement : les projets, la banque ----
SC(199.5, "06", "LE NANTISSEMENT", (g, at) => {
  const word = title(g, 220, "Le nantissement", 80);
  const projects = [["house", "RÉSIDENCE PRINCIPALE", 205.6], ["curve", "INVESTISSEMENT IMMOBILIER", 209.0], ["contract", "PROJET D'ENTREPRISE", 213.0]].map(([k, l, a], i) => {
    const n = K.icon(g, k, 0.95, true); return { n, a, x: 460 + i * 500, t: txt(g, 460 + i * 500, 700, l, 24, { weight: 800, ls: 4, fill: C.inkSoft }) };
  });
  const client = person(g);
  const bk = bank(g, "BANQUE", 320);
  const env = envelope(g, "");
  const tag = pill(g, 1460, 300, "EN GARANTIE", { bg: C.accent });
  const lock = padlock(g);
  return t => {
    const p1 = out(t, 215.4, 0.5);
    show(word, fade(t, 200.4) * p1, 20);
    for (const p of projects) { place(p.n, p.x, 500, pop(t, p.a) * p1); p.t.style.opacity = fade(t, p.a + 0.2) * p1; }
    const s2 = t > 215.4 ? 1 : 0;
    stand(client, t, 215.8, 420, 900, 1, false, 105, t > 218 && t < 223 ? -10 : 75); client.g.style.opacity = s2 * (pop(t, 215.8) > 0 ? 1 : 0);
    place(bk, 1460, 640, pop(t, 216.6) * 1.1);
    const hand = [420 + client.hand.R[0], 900 + client.hand.R[1]];
    const u = prog(t, 223.6, 225.2), p = D.arcPt(hand, [1460, 640], -300, ease(u));
    env.setOpen(0); place(env.g, p[0], p[1], (t > 218.4 ? pop(t, 218.4) : 0) * lerp(0.22, 0.3, u));
    place(tag.g, tag.x, tag.y, pop(t, 225.6)); place(lock.g, 1460, 740, pop(t, 226.0) * 0.7);
  };
});

SC(228.5, "06", "LE NANTISSEMENT · LE CRÉDIT", (g, at) => {
  const doc = card(g, 360, 440); txt(doc, 0, -150, "CRÉDIT", 40, { weight: 800, ls: 10 });
  [-80, -40, 0, 40].forEach(y => el("path", { ...D.line, "stroke-width": 4, stroke: C.inkSoft, d: `M-120 ${y} L120 ${y}` }, doc));
  const stamp = el("g", {}, doc); el("rect", { fill: "none", stroke: C.accent, "stroke-width": 8, x: -130, y: 80, width: 260, height: 80, rx: 8, transform: "rotate(-8)" }, stamp);
  txt(stamp, 0, 135, "ACCORDÉ", 40, { weight: 900, ls: 6, fill: C.accent }).setAttribute("transform", "rotate(-8)");
  const apT = txt(g, 1300, 300, "APPORT DEMANDÉ", 30, { weight: 800, ls: 6, fill: C.inkSoft });
  const ap = el("rect", { ...D.line, fill: C.inkSoft, x: 1150, y: 360, height: 90, rx: 12 }, g);
  const env = envelope(g, "");
  const gears = [0, 1].map(i => { const p = el("path", { ...D.line, "stroke-width": 6, fill: C.accentSoft, d: (() => { let d = ""; const n = 40; for (let k = 0; k <= n; k++) { const a = k / n * Math.PI * 2, r = k % 4 < 2 ? 70 : 54; d += (k ? "L" : "M") + (r * Math.cos(a)).toFixed(1) + " " + (r * Math.sin(a)).toFixed(1); } return d + "Z"; })() }, g); return p; });
  const turning = txt(g, 960, 260, "Elle continue de tourner.", 54, { font: "Serif", weight: 500 });
  const cin = [0, 1, 2].map(() => coin(g));
  const bk = bank(g, "BANQUE", 260);
  const seize = el("path", { ...D.line, stroke: C.inkSoft, "stroke-width": 9, d: "M0 0 L-260 0 M-232 -26 L-266 0 L-232 26" }, g);
  const warn = pill(g, 960, 930, "EN CAS DE DÉFAUT : LA BANQUE PEUT LA SAISIR", { bg: C.face, size: 24 });
  return t => {
    const p1 = out(t, 246.6, 0.5);
    place(doc, 560, 560, pop(t, 230.0) * p1);
    stamp.style.opacity = t > 233.4 ? 1 : 0; stamp.setAttribute("transform", `scale(${t > 233.4 ? lerp(1.6, 1, ease(prog(t, 233.4, 233.7))) : 1})`);
    show(apT, fade(t, 236.6) * p1); const w = lerp(520, 200, ease(prog(t, 239.0, 241.6))); ap.setAttribute("width", w * (fade(t, 236.8) > 0 ? 1 : 0)); ap.style.opacity = p1;
    const p2 = t > 246.6 ? 1 : 0;
    env.setOpen(1); place(env.g, 960, 640, pop(t, 247.4) * 0.6 * p2);
    gears.forEach((gr, i) => { gr.setAttribute("transform", `translate(${i ? 1200 : 720} ${i ? 470 : 470}) rotate(${(i ? -1 : 1) * t * 60}) scale(${pop(t, 248.6 + i * 0.3)})`); gr.style.opacity = p2 && t > 248.6 ? 1 : 0; });
    show(turning, fade(t, 248.8) * p2 * out(t, 256.0));
    cin.forEach((c, i) => { const a = 250.8 + i * 0.7, u = prog(t, a, a + 0.5); const p = D.arcPt([400, 700], [960, 600], -200, ease(u)); place(c, p[0], p[1], u > 0 && u < 1 ? 0.9 : 0, u * 300); });
    place(bk, 1560, 640, pop(t, 256.4) * 0.8);
    const su = ease(prog(t, 257.6, 258.4)); seize.setAttribute("transform", `translate(${1400 - 120 * su} 640)`); seize.style.opacity = t > 257.6 ? 1 : 0;
    place(warn.g, warn.x, warn.y, pop(t, 257.0));
  };
});
