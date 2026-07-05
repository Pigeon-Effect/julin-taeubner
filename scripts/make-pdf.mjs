/* Build the designed A4 portfolio book (scripts/portfolio-book.html)
   into three PDFs — one per language — in /portfolio-pdf.
   Usage:  node scripts/serve.mjs 5199        (in another shell)
           node scripts/make-pdf.mjs [port] [--proof dir]
   --proof additionally saves a PNG of every page (for design review). */
import puppeteer from "puppeteer-core";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, readFileSync, mkdirSync } from "node:fs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = Number(process.argv[2]) || 5199;
const OUT = join(ROOT, "portfolio-pdf");
const proofIdx = process.argv.indexOf("--proof");
const PROOF = proofIdx > -1 ? process.argv[proofIdx + 1] : null;

const chrome = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
].find(existsSync);
if (!chrome) throw new Error("No Chrome/Edge executable found.");

const LANGS = {
  en: "Julin-Taeubner-Portfolio-EN.pdf",
  de: "Julin-Taeubner-Portfolio-DE.pdf",
  zh: "Julin-Taeubner-Portfolio-ZH.pdf",
};

mkdirSync(OUT, { recursive: true });
if (PROOF) mkdirSync(PROOF, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--no-sandbox", "--force-color-profile=srgb"],
});

for (const [lang, file] of Object.entries(LANGS)) {
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });
  await page.goto(`http://localhost:${PORT}/scripts/portfolio-book.html?lang=${lang}`, {
    waitUntil: "networkidle0", timeout: 90000,
  });

  // Fonts + every image fully decoded before printing.
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) =>
      img.complete && img.naturalWidth
        ? img.decode().catch(() => {})
        : new Promise((res) => { img.onload = () => res(); img.onerror = res; })
    ));
  });

  if (PROOF) {
    const dir = join(PROOF, lang);
    mkdirSync(dir, { recursive: true });
    const pages = await page.$$(".page");
    for (let i = 0; i < pages.length; i++) {
      await pages[i].screenshot({ path: join(dir, `p${String(i + 1).padStart(2, "0")}.png`) });
    }
  }

  const out = join(OUT, file);
  await page.pdf({
    path: out,
    width: "210mm", height: "297mm",
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
    printBackground: true,
    preferCSSPageSize: true,
  });

  // Sanity: report page count straight from the PDF (max of /Count values —
  // the pages tree root; intermediate nodes carry smaller counts).
  const raw = readFileSync(out, "latin1");
  const counts = [...raw.matchAll(/\/Count (\d+)/g)].map((m) => Number(m[1]));
  const leaves = (raw.match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log(`✓ ${file}  (${Math.max(0, ...counts)} pages tree / ${leaves} page objs)`);
  await page.close();
}

await browser.close();
console.log("Done → " + OUT);
