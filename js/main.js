/* ============================================================
   Julin Täubner — portfolio behaviour
   i18n · rendering · gallery + lightbox · nav · reveal
   ============================================================ */
(() => {
  "use strict";
  const S = window.SITE;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // Pick the correct language value from a string or {de,zh,en} object.
  const t = (val, lang) => (val && typeof val === "object" && !Array.isArray(val) ? (val[lang] ?? val.en) : val);

  const GALLERY_BASE = "assets/img/gallery/";
  let lang = detectLang();
  let currentFilter = "";

  /* ---------------- Language ---------------- */
  function detectLang() {
    const saved = localStorage.getItem("jt-lang");
    if (saved && S.CONFIG.langs.includes(saved)) return saved;
    const nav = (navigator.language || "en").toLowerCase();
    if (nav.startsWith("de")) return "de";
    if (nav.startsWith("zh")) return "zh";
    return S.CONFIG.defaultLang;
  }

  function applyLang(next) {
    lang = next;
    localStorage.setItem("jt-lang", lang);
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-Hans" : lang);
    document.documentElement.setAttribute("data-lang", lang);

    // Static strings.
    $$("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const dict = S.I18N[lang];
      if (dict && key in dict) el.textContent = dict[key];
    });

    // Active state on switch buttons.
    $$(".lang-switch button").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.setlang === lang))
    );

    // Re-render dynamic sections that contain localized copy.
    renderStats();
    renderLanguages();
    renderSkills();
    renderFilmography();
    renderGalleryCaptions();
    renderSocials();
  }

  /* ---------------- About ---------------- */
  function renderStats() {
    const el = $("#statsGrid");
    if (!el) return;
    el.innerHTML = S.STATS.map(
      (s) => `<div class="stat">
        <dt>${t(s.label, lang)}</dt>
        <dd>${t(s.value, lang)}</dd>
      </div>`
    ).join("");
  }

  function renderLanguages() {
    const el = $("#languagesList");
    if (!el) return;
    el.innerHTML = S.LANGUAGES.map(
      (l) => `<li><span class="lang-name">${t(l.name, lang)}</span><span class="lang-level">${t(l.level, lang)}</span></li>`
    ).join("");
  }

  function renderSkills() {
    const el = $("#skillsList");
    if (!el) return;
    el.innerHTML = S.SKILLS.map((s) => `<li>${t(s, lang)}</li>`).join("");
  }

  /* ---------------- Filmography ---------------- */
  function renderFilmography() {
    const tabs = $("#filmTabs");
    const groups = $("#filmGroups");
    if (!tabs || !groups) return;

    tabs.innerHTML = S.FILM_CATS.map(
      (c, i) => `<button type="button" role="tab" class="film-tab${i === 0 ? " is-active" : ""}"
        aria-selected="${i === 0}" data-cat="${c.id}">${t(c.label, lang)}</button>`
    ).join("");

    groups.innerHTML = S.FILM_CATS.map((c, i) => {
      const items = (S.FILMOGRAPHY[c.id] || [])
        .map((f) => filmRow(f))
        .join("");
      return `<div class="film-group${i === 0 ? " is-active" : ""}" data-cat="${c.id}" role="tabpanel">
        <ul class="film-list">${items}</ul>
      </div>`;
    }).join("");

    // Tab switching.
    $$(".film-tab", tabs).forEach((btn) => {
      btn.addEventListener("click", () => {
        const cat = btn.dataset.cat;
        $$(".film-tab", tabs).forEach((b) => {
          const active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-selected", String(active));
        });
        $$(".film-group", groups).forEach((g) =>
          g.classList.toggle("is-active", g.dataset.cat === cat)
        );
      });
    });
  }

  function filmRow(f) {
    const role = f.role ? `<span class="role-badge role-${f.role}">${S.I18N[lang]["role." + f.role]}</span>` : "";
    const year = f.year ? `<span class="film-year">${f.year}</span>` : `<span class="film-year film-year--tba">—</span>`;
    const alt = f.alt ? `<span class="film-alt">${t(f.alt, lang)}</span>` : "";
    const bits = [];
    if (f.char) bits.push(`<span class="film-char">${t(f.char, lang)}</span>`);
    if (f.note) bits.push(`<span class="film-note">${t(f.note, lang)}</span>`);
    const meta = bits.length ? `<div class="film-meta">${bits.join('<span class="dot">·</span>')}</div>` : "";
    return `<li class="film-item">
      ${year}
      <div class="film-main">
        <div class="film-titleline"><span class="film-title">${t(f.title, lang)}</span>${alt}</div>
        ${meta}
      </div>
      ${role}
    </li>`;
  }

  /* ---------------- Gallery ---------------- */
  function renderGallery() {
    const filters = $("#galleryFilters");
    const grid = $("#masonry");
    if (!filters || !grid) return;

    currentFilter = currentFilter || S.GALLERY_CATS[0].id;
    filters.innerHTML = S.GALLERY_CATS.map(
      (c) => `<button type="button" class="gfilter${c.id === currentFilter ? " is-active" : ""}" data-cat="${c.id}">${t(c.label, lang)}</button>`
    ).join("");

    grid.innerHTML = S.GALLERY.map((g, idx) => {
      const base = GALLERY_BASE + g.name;
      return `<figure class="tile" data-cat="${g.cat}" data-index="${idx}" data-name="${g.name}">
        <picture>
          <source type="image/webp" srcset="${base}-sm.webp" />
          <img src="${base}-sm.jpg" alt="" loading="lazy" decoding="async" />
        </picture>
        <span class="tile-cat" data-catlabel="${g.cat}"></span>
      </figure>`;
    }).join("");

    // Filters.
    $$(".gfilter", filters).forEach((btn) => {
      btn.addEventListener("click", () => {
        currentFilter = btn.dataset.cat;
        $$(".gfilter", filters).forEach((b) => b.classList.toggle("is-active", b === btn));
        applyFilter();
      });
    });

    // Open lightbox.
    $$(".tile", grid).forEach((tile) => {
      tile.addEventListener("click", () => openLightbox(Number(tile.dataset.index)));
    });

    renderGalleryCaptions();
    applyFilter();
  }

  function applyFilter() {
    $$("#masonry .tile").forEach((tile) => {
      const show = tile.dataset.cat === currentFilter;
      tile.classList.toggle("is-hidden", !show);
    });
  }

  function catLabel(catId) {
    const c = S.GALLERY_CATS.find((x) => x.id === catId);
    return c ? t(c.label, lang) : "";
  }

  function renderGalleryCaptions() {
    $$("#masonry .tile").forEach((tile) => {
      const label = catLabel(tile.dataset.cat);
      const span = $(".tile-cat", tile);
      if (span) span.textContent = label;
      const img = $("img", tile);
      if (img) img.alt = `Julin Täubner — ${label}`;
    });
  }

  /* ---------------- Lightbox ---------------- */
  const lb = {
    el: null, img: null, cap: null, order: [], pos: 0,
  };

  function visibleTiles() {
    return $$("#masonry .tile").filter((t) => !t.classList.contains("is-hidden"));
  }

  function openLightbox(index) {
    lb.order = visibleTiles().map((t) => Number(t.dataset.index));
    lb.pos = Math.max(0, lb.order.indexOf(index));
    lb.el.hidden = false;
    document.body.classList.add("no-scroll");
    showLightbox();
    $("#lbClose").focus();
  }

  function showLightbox() {
    const idx = lb.order[lb.pos];
    const g = S.GALLERY[idx];
    const base = GALLERY_BASE + g.name;
    lb.img.src = `${base}-lg.jpg`;
    // Prefer webp when supported via <img srcset> fallback not needed; set both.
    lb.img.srcset = `${base}-lg.webp`;
    const label = catLabel(g.cat);
    lb.img.alt = `Julin Täubner — ${label}`;
    lb.cap.textContent = `${label} · ${lb.pos + 1} / ${lb.order.length}`;
  }

  function closeLightbox() {
    lb.el.hidden = true;
    document.body.classList.remove("no-scroll");
    lb.img.src = "";
    lb.img.srcset = "";
  }

  function step(dir) {
    lb.pos = (lb.pos + dir + lb.order.length) % lb.order.length;
    showLightbox();
  }

  function initLightbox() {
    lb.el = $("#lightbox");
    lb.img = $("#lbImg");
    lb.cap = $("#lbCaption");
    $("#lbClose").addEventListener("click", closeLightbox);
    $("#lbPrev").addEventListener("click", () => step(-1));
    $("#lbNext").addEventListener("click", () => step(1));
    lb.el.addEventListener("click", (e) => { if (e.target === lb.el) closeLightbox(); });
    document.addEventListener("keydown", (e) => {
      if (lb.el.hidden) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    });

    // Swipe on touch devices.
    let x0 = null;
    lb.el.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
    lb.el.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
  }

  /* ---------------- Socials ---------------- */
  const SOCIAL_ICONS = {
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4.3" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor"/></svg>',
    douyin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v9.6a3.4 3.4 0 1 1-3-3.37" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 3c.4 2.6 2.1 4.4 4.6 4.7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    weibo: '<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="10" cy="15" rx="6.6" ry="4.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M16.5 5.2a4 4 0 0 1 3.9 4.2M16.2 8a1.7 1.7 0 0 1 1.6 1.9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    xiaohongshu: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="3.4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 9v6M7 9h1.6a1.7 1.7 0 0 1 0 3.4H7m9.5-3.4H14V15m2.7-6h.9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    baidu: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 10.5v3m0-3c0-1 .7-1.6 1.6-1.6.9 0 1.4.6 1.4 1.6v3m2-3v3m0-3h1.9m-1.9 1.4h1.6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    imdb: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="6.5" width="19" height="11" rx="2.4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6 10v4m2.6 0v-4l1.2 4 1.2-4v4m2.5 0v-4h1a1.1 1.1 0 0 1 1.1 1.1v1.8a1.1 1.1 0 0 1-1.1 1.1h-1z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    filmmakers: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4.5" width="18" height="15" rx="2.4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 8.5h18M3 15.5h18M7 4.5v4m10-4v4M7 15.5v4m10-4v4" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="3.4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7.4 10.2V17M7.4 7.2v.1M11.3 17v-4a2.3 2.3 0 0 1 4.6 0v4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  function renderSocials() {
    const el = $("#socialGrid");
    if (!el) return;
    el.innerHTML = S.SOCIALS.map(
      (s) => `<a class="social-card" href="${s.url}" target="_blank" rel="noopener noreferrer">
        <span class="social-icon">${SOCIAL_ICONS[s.id] || ""}</span>
        <span class="social-text">
          <span class="social-name">${t(s.name, lang)}</span>
          <span class="social-handle">${s.handle}</span>
        </span>
        <span class="social-arrow" aria-hidden="true">↗</span>
      </a>`
    ).join("");
  }

  /* ---------------- Contact ---------------- */
  function initContact() {
    const email = S.CONFIG.email;
    const link = $("#contactEmail");
    if (link) { link.textContent = email; link.href = `mailto:${email}`; }
  }

  /* ---------------- Header / nav ---------------- */
  function initHeader() {
    const header = $("#siteHeader");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = $("#menuToggle");
    const nav = $("#primaryNav");
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$("a", nav).forEach((a) =>
      a.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );

    $$(".lang-switch button").forEach((b) =>
      b.addEventListener("click", () => applyLang(b.dataset.setlang))
    );
  }

  /* ---------------- Reveal on scroll ---------------- */
  function initReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ---------------- Scroll spy ---------------- */
  // Mirror the nav hover underline on the link whose section is in view.
  function initScrollSpy() {
    const links = $$("#primaryNav a[href^='#']");
    const map = new Map();
    links.forEach((a) => {
      const sec = document.getElementById(a.getAttribute("href").slice(1));
      if (sec) map.set(sec, a);
    });
    if (!map.size || !("IntersectionObserver" in window)) return;

    const setCurrent = (link) =>
      links.forEach((a) => a.classList.toggle("is-current", a === link));

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setCurrent(map.get(visible[0].target));
      },
      { rootMargin: "-100px 0px -55% 0px", threshold: 0 }
    );
    map.forEach((_, sec) => io.observe(sec));
  }

  // Tag dynamically-created rows as reveal targets after render.
  function markReveals() {
    $$("#masonry .tile, .film-item, .stat, .social-card, .chips li").forEach((el) => el.classList.add("reveal"));
    initReveal();
  }

  /* ---------------- Init ---------------- */
  function init() {
    $("#year").textContent = new Date().getFullYear();
    initHeader();
    initLightbox();
    initContact();
    renderGallery();
    applyLang(lang);   // fills all dynamic + static text
    markReveals();
    initScrollSpy();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
