// Rend une animation HTML (qui expose window.render(t) et window.DURATION) en MP4.
// usage : node render.mjs intro/intro.html out.mp4 [fps]
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const [src, out, fpsArg] = process.argv.slice(2);
const fps = Number(fpsArg || 30);
const frames = path.join(path.dirname(out), ".frames");
rmSync(frames, { recursive: true, force: true }); mkdirSync(frames, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto("file://" + path.resolve(src));
await page.evaluate(() => document.fonts.ready);
const duration = await page.evaluate(() => window.DURATION);
const n = Math.round(duration * fps);
for (let i = 0; i < n; i++) {
  await page.evaluate(t => window.render(t), i / fps);
  await page.screenshot({ path: path.join(frames, String(i).padStart(5, "0") + ".png") });
}
await browser.close();
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(fps), "-i", path.join(frames, "%05d.png"),
  "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", out]);
rmSync(frames, { recursive: true, force: true });
console.log(`ok : ${out} (${n} frames)`);
