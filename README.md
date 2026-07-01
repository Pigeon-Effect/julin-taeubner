# Julin Täubner · 菊麟 — Actress Portfolio

A fast, fully static, trilingual (Deutsch / 中文 / English) portfolio website for
actress **Julin Täubner**. No backend required — deploy the folder to any static host.

## Preview locally

```bash
npm install          # only needed for the image pipeline
npm run serve        # → http://localhost:5173
```

`npm run serve` starts a tiny static file server (`scripts/serve.mjs`). You can also
open `index.html` directly, though a server is recommended so module paths behave
like production.

## Project structure

```
index.html                  # Markup + section scaffolding
css/styles.css              # All styles (responsive, animations, lightbox)
js/content.js               # ALL editable content + DE/ZH/EN translations
js/main.js                  # i18n engine, rendering, gallery, lightbox, nav
assets/img/gallery/         # Web-optimized images + manifest.json (generated)
resources/                  # Original high-res photos (source for the pipeline)
scripts/optimize-images.mjs # Regenerates optimized images from /resources
scripts/serve.mjs           # Local static server
```

## Editing content

Everything a non-developer needs to change lives in **`js/content.js`**:

- `CONFIG.email` — booking email address (currently a placeholder).
- `STATS`, `LANGUAGES`, `SKILLS` — the About section.
- `FILMOGRAPHY` — grouped by `film` / `tv` / `web` / `ad`. Each entry supports
  `title`, `alt` (secondary title), `year`, `role` (`lead|support|cast`),
  `char` (character), and `note`. Any field may be a plain string or a
  `{ de, zh, en }` object for per-language text.
- `GALLERY` — image order and category (`studio|editorial|character|lifestyle`).
- `SOCIALS` — social platform links.

UI labels (nav, buttons, section titles) live in the `I18N` object in the same file.

## Adding or replacing photos

1. Drop new high-res images into `resources/`.
2. Run the pipeline:
   ```bash
   npm run images
   ```
   This writes `-lg` (1600px) and `-sm` (800px) WebP + JPEG derivatives plus a
   blur placeholder into `assets/img/gallery/` and refreshes `manifest.json`.
3. Reference the new file (its name without extension) in the `GALLERY` array in
   `js/content.js`.

## Notes

- The contact form is static: on submit it opens the visitor's email client
  (`mailto:`) pre-filled. To collect submissions server-side instead, point the
  form at a service such as Formspree.
- The booking email in `js/content.js` is a **placeholder** — update it before
  going live.
