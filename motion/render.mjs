// Rend une animation HTML (qui expose window.render(t) et window.DURATION) en MP4.
// usage : node render.mjs <page.html[?query]> <sortie.mp4> [fps]
// Rendu en parallèle sur plusieurs onglets (WORKERS, 4 par défaut) ; reprend là où il s'était arrêté
// si le dossier d'images temporaire existe déjà (utile pour les vidéos longues).
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, existsSync } from "node:fs";
import path from "node:path";

const [src, out, fpsArg] = process.argv.slice(2);
const fps = Number(fpsArg || 30);
const WORKERS = Number(process.env.WORKERS || 4);
const frames = path.join(path.dirname(out), ".frames");
mkdirSync(frames, { recursive: true });
const frameFile = i => path.join(frames, String(i).padStart(5, "0") + ".png");

const [file, query] = src.split("?");
const url = "file://" + path.resolve(file) + (query !== undefined ? "?" + query : "");
const browser = await chromium.launch();

async function openPage() {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on("pageerror", e => console.error("ERREUR PAGE :", e.message));
  await page.goto(url);
  await page.evaluate(async () => { await document.fonts.ready; if (window.ready) await window.ready; });
  return page;
}

const first = await openPage();
const n = Math.round(await first.evaluate(() => window.DURATION) * fps);
const todo = [];
for (let i = 0; i < n; i++) if (!existsSync(frameFile(i))) todo.push(i);
console.log(`${n} images, ${n - todo.length} déjà faites, ${todo.length} à rendre sur ${WORKERS} onglets`);

const pages = [first, ...await Promise.all(Array.from({ length: WORKERS - 1 }, openPage))];
let next = 0, done = 0;
await Promise.all(pages.map(async page => {
  while (next < todo.length) {
    const i = todo[next++];
    await page.evaluate(t => window.render(t), i / fps);
    // écrit dans un fichier temporaire puis renomme : une image interrompue n'est jamais prise pour une image finie
    const tmp = frameFile(i) + ".tmp.png";
    await page.screenshot({ path: tmp });
    execFileSync("mv", [tmp, frameFile(i)]);
    if (++done % 300 === 0) console.log(`${done}/${todo.length}`);
  }
}));
await browser.close();
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(fps), "-i", path.join(frames, "%05d.png"),
  "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", out]);
rmSync(frames, { recursive: true, force: true });
console.log(`ok : ${out} (${n} images)`);
