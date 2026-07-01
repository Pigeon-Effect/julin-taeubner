// Image optimization pipeline for the Julin Täubner portfolio.
// Reads originals from /resources and writes web-optimized WebP + JPEG
// derivatives into /assets/img/gallery, plus a manifest.json with dimensions.
//
// Usage: node scripts/optimize-images.mjs
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { join, parse, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "resources");
const OUT = join(ROOT, "assets", "img", "gallery");

// Output sizes (long-edge in px). "lg" = lightbox/hero, "sm" = grid thumbnail.
const SIZES = {
  lg: { edge: 1600, q: 80 },
  sm: { edge: 800, q: 72 },
};

async function main() {
  await mkdir(OUT, { recursive: true });
  const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();

  const manifest = [];

  for (const file of files) {
    const { name } = parse(file);
    const input = join(SRC, file);
    const img = sharp(input, { failOn: "none" });
    const meta = await img.metadata();
    const landscape = meta.width >= meta.height;

    const entry = {
      name,
      width: meta.width,
      height: meta.height,
      orientation: landscape ? "landscape" : "portrait",
    };

    for (const [key, { edge, q }] of Object.entries(SIZES)) {
      // Resize by the long edge, never upscale.
      const resize = landscape ? { width: edge } : { height: edge };
      const base = sharp(input, { failOn: "none" })
        .rotate()
        .resize({ ...resize, withoutEnlargement: true });

      await base
        .clone()
        .webp({ quality: q, effort: 5 })
        .toFile(join(OUT, `${name}-${key}.webp`));

      await base
        .clone()
        .jpeg({ quality: q, mozjpeg: true, progressive: true })
        .toFile(join(OUT, `${name}-${key}.jpg`));
    }

    // Tiny blurred placeholder (base64) for smooth loading.
    const lqipBuf = await sharp(input, { failOn: "none" })
      .rotate()
      .resize({ width: 20 })
      .webp({ quality: 30 })
      .toBuffer();
    entry.lqip = `data:image/webp;base64,${lqipBuf.toString("base64")}`;

    manifest.push(entry);
    console.log(`✓ ${name}  (${meta.width}×${meta.height}, ${entry.orientation})`);
  }

  await writeFile(join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log(`\nWrote ${manifest.length} images → ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
