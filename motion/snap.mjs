// Captures rapides de quelques instants d'une animation (pour vérifier sans tout rendre).
// usage : node snap.mjs <page.html[?query]> <dossier_sortie> t1 t2 t3 ...
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
import { mkdirSync } from "node:fs";
import path from "node:path";
const [src, outDir, ...times] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const [file, query] = src.split("?");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
page.on("pageerror", e => console.error("ERREUR PAGE :", e.message));
await page.goto("file://" + path.resolve(file) + (query !== undefined ? "?" + query : ""));
await page.evaluate(async () => { await document.fonts.ready; if (window.ready) await window.ready; });
for (const t of times) {
  await page.evaluate(t => window.render(t), Number(t));
  await page.screenshot({ path: path.join(outDir, `t${String(t).padStart(6, "0")}.png`) });
}
await browser.close();
console.log("ok", times.length, "captures");
