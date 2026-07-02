/* ============================================================
   Julin Täubner — portfolio content & translations
   All site copy and structured data live here so the three
   languages (DE / 中文 / EN) stay in one place.
   ============================================================ */

window.SITE = (() => {
  const CONFIG = {
    email: "julintaeubner@gmail.com", // ← booking address (placeholder — update as needed)
    defaultLang: "en",
    langs: ["de", "zh", "en"],
  };

  /* ---------- UI strings (data-i18n keys) ---------- */
  const I18N = {
    de: {
      "skipToContent": "Zum Inhalt springen",
      "nav.about": "Über mich",
      "nav.filmography": "Filmografie",
      "nav.gallery": "Galerie",
      "nav.connect": "Kanäle",
      "nav.contact": "Kontakt",

      "hero.eyebrow": "Schauspielerin · Deutsch–Chinesisch",
      "hero.tagline": "Film, Fernsehen & internationales Kino. Zuhause in Deutsch, Mandarin und Englisch.",
      "hero.ctaWork": "Arbeiten ansehen",
      "hero.ctaContact": "Kontakt aufnehmen",
      "hero.scroll": "Scrollen",

      "about.kicker": "Über mich",
      "about.title": "Zwischen zwei Kulturen, ein Handwerk.",
      "about.lead": "Julin Täubner ist eine deutsch-chinesische Schauspielerin mit Wurzeln in Deutschland und Nanjing. Sie arbeitet mühelos zwischen europäischem und asiatischem Kino — von intimen Arthouse-Rollen bis zu actiongeladenen Hauptrollen — getragen von Tanz, Kampfkunst und einer präzisen körperlichen Präsenz.",
      "about.languagesTitle": "Sprachen",
      "about.skillsTitle": "Fähigkeiten",

      "film.kicker": "Ausgewählte Arbeiten",
      "film.title": "Filmografie",

      "gallery.kicker": "Portfolio",
      "gallery.title": "Galerie",

      "connect.kicker": "Folgen",
      "connect.title": "Kanäle",

      "contact.kicker": "Booking",
      "contact.title": "Lassen Sie uns zusammenarbeiten",
      "contact.lead": "Für Casting-Anfragen, Bookings und Kooperationen erreichen Sie mich am besten per E-Mail oder über das Formular.",
      "contact.name": "Name",
      "contact.email": "E-Mail",
      "contact.message": "Nachricht",
      "contact.send": "Nachricht senden",

      "footer.rights": "Alle Rechte vorbehalten.",

      "role.lead": "Hauptrolle",
      "role.support": "Nebenrolle",
      "role.cast": "Besetzung",
      "label.character": "Rolle",
    },
    zh: {
      "skipToContent": "跳至内容",
      "nav.about": "关于",
      "nav.filmography": "作品",
      "nav.gallery": "画廊",
      "nav.connect": "社交平台",
      "nav.contact": "联系",

      "hero.eyebrow": "演员 · 德中混血",
      "hero.tagline": "电影、电视与国际影坛。游走于德语、普通话与英语之间。",
      "hero.ctaWork": "查看作品",
      "hero.ctaContact": "联系合作",
      "hero.scroll": "向下滑动",

      "about.kicker": "关于",
      "about.title": "身处两种文化，专注一门技艺。",
      "about.lead": "菊麟是一位德中混血演员，血脉连结德国与南京。她自如穿梭于欧洲与亚洲影坛——从细腻的文艺片到充满动作张力的主角——以舞蹈、武术与精准的肢体表现力为根基。",
      "about.languagesTitle": "语言",
      "about.skillsTitle": "技能",

      "film.kicker": "精选作品",
      "film.title": "影视作品",

      "gallery.kicker": "作品集",
      "gallery.title": "画廊",

      "connect.kicker": "关注",
      "connect.title": "社交平台",

      "contact.kicker": "邀约",
      "contact.title": "期待与您合作",
      "contact.lead": "试镜、邀约与合作事宜，欢迎通过电子邮件或下方表单与我联系。",
      "contact.name": "姓名",
      "contact.email": "电子邮箱",
      "contact.message": "留言",
      "contact.send": "发送信息",

      "footer.rights": "版权所有。",

      "role.lead": "女主角",
      "role.support": "配角",
      "role.cast": "参演",
      "label.character": "角色",
    },
    en: {
      "skipToContent": "Skip to content",
      "nav.about": "About",
      "nav.filmography": "Filmography",
      "nav.gallery": "Gallery",
      "nav.connect": "Connect",
      "nav.contact": "Contact",

      "hero.eyebrow": "Actress · German–Chinese",
      "hero.tagline": "Film, television & international cinema. At home in German, Mandarin and English.",
      "hero.ctaWork": "View Work",
      "hero.ctaContact": "Get in Touch",
      "hero.scroll": "Scroll",

      "about.kicker": "About",
      "about.title": "Between two cultures, one craft.",
      "about.lead": "Julin Täubner is a German–Chinese actress with roots in Germany and Nanjing. She moves fluidly between European and Asian cinema — from intimate arthouse roles to action-driven leads — grounded in dance, martial arts and a precise physical presence.",
      "about.languagesTitle": "Languages",
      "about.skillsTitle": "Skills",

      "film.kicker": "Selected Work",
      "film.title": "Filmography",

      "gallery.kicker": "Portfolio",
      "gallery.title": "Gallery",

      "connect.kicker": "Follow",
      "connect.title": "Connect",

      "contact.kicker": "Booking",
      "contact.title": "Let's work together",
      "contact.lead": "For casting enquiries, bookings and collaborations, the best way to reach me is by email or through the form below.",
      "contact.name": "Name",
      "contact.email": "Email",
      "contact.message": "Message",
      "contact.send": "Send Message",

      "footer.rights": "All rights reserved.",

      "role.lead": "Lead",
      "role.support": "Supporting",
      "role.cast": "Cast",
      "label.character": "Role",
    },
  };

  /* ---------- Vital statistics ---------- */
  const STATS = [
    { label: { de: "Geboren", zh: "出生", en: "Born" }, value: { de: "1. Nov 1993", zh: "1993年11月1日", en: "1 Nov 1993" } },
    { label: { de: "Herkunft", zh: "国籍", en: "Nationality" }, value: { de: "Deutsch–Chinesisch", zh: "德国 · 中国", en: "German–Chinese" } },
    { label: { de: "Wurzeln", zh: "祖籍", en: "Heritage" }, value: { de: "Deutschland · Nanjing", zh: "德国 · 南京", en: "Germany · Nanjing" } },
    { label: { de: "Größe", zh: "身高", en: "Height" }, value: { de: "167 cm", zh: "167 cm", en: "167 cm" } },
    { label: { de: "Gewicht", zh: "体重", en: "Weight" }, value: { de: "52 kg", zh: "52 kg", en: "52 kg" } },
    { label: { de: "Maße", zh: "三围", en: "Measurements" }, value: { de: "86 · 59 · 88 cm", zh: "86 · 59 · 88 cm", en: "86 · 59 · 88 cm" } },
  ];

  /* ---------- Languages ---------- */
  const LANGUAGES = [
    { name: { de: "Deutsch", zh: "德语", en: "German" }, level: { de: "Muttersprache", zh: "母语", en: "Native" } },
    { name: { de: "Mandarin", zh: "普通话", en: "Mandarin Chinese" }, level: { de: "Muttersprache", zh: "母语", en: "Native" } },
    { name: { de: "Englisch", zh: "英语", en: "English" }, level: { de: "Fließend", zh: "流利", en: "Fluent" } },
  ];

  /* ---------- Skills ---------- */
  const SKILLS = [
    { de: "Tanz", zh: "舞蹈", en: "Dancing" },
    { de: "Kampfkunst-Choreografie", zh: "武术编排", en: "Martial Arts Choreography" },
    { de: "Karate", zh: "空手道", en: "Karate" },
    { de: "Boxen", zh: "拳击", en: "Boxing" },
    { de: "Drahtseil / Wire Work", zh: "威亚", en: "Wire Work" },
    { de: "Klavier", zh: "钢琴", en: "Piano" },
    { de: "Gitarre", zh: "吉他", en: "Guitar" },
    { de: "Klettern", zh: "攀岩", en: "Rock Climbing" },
    { de: "Snowboarden", zh: "单板滑雪", en: "Snowboarding" },
    { de: "Reiten", zh: "马术", en: "Horseback Riding" },
    { de: "Bogenschießen", zh: "射箭", en: "Archery" },
    { de: "Yoga", zh: "瑜伽", en: "Yoga" },
    { de: "Rollschuh", zh: "轮滑", en: "Roller Skating" },
    { de: "Führerschein", zh: "驾照", en: "Driving License" },
    { de: "Schnelle Auffassung", zh: "快速学习", en: "Quick Learner" },
  ];

  /* ---------- Filmography ----------
     role: lead | support | cast  (rendered as a badge)
     char: character / descriptor (string kept as-is, or {de,zh,en})
     note: production note ({de,zh,en} or string)                         */
  const FILM_CATS = [
    { id: "film", label: { de: "Film", zh: "电影", en: "Film" } },
    { id: "tv", label: { de: "Fernsehen", zh: "电视剧", en: "Television" } },
    { id: "web", label: { de: "Web", zh: "网络作品", en: "Web" } },
    { id: "ad", label: { de: "Werbung & Medien", zh: "广告 & 媒体", en: "Commercials & Media" } },
  ];

  const FILMOGRAPHY = {
    film: [
      { title: "Cannibalism", year: "2025", role: "lead", char: "Nuan Nuan · 暖暖", note: { de: "Internationaler Arthouse-Film", zh: "国际文艺片", en: "International Art Film" } },
      { title: "Lion Fist", year: "2026", role: "lead", char: "Wu Mei · 五枚", note: { de: "Internationales Kino", zh: "国际院线", en: "International Cinema" } },
      { title: "Youri", year: "2026", role: "support", note: { de: "Produktion: Impresario", zh: "出品：Impresario", en: "Impresario Production" } },
      { title: "火线行动", alt: "Line of Fire", year: "", role: "lead", char: "张兆雪 · Zhang Zhaoxue" },
      { title: "同程似锦", alt: "A Journey in Bloom", year: "", role: "support", note: { de: "Kinofilm", zh: "院线电影", en: "Theatrical Film" } },
    ],
    tv: [
      { title: "荣耀乒乓", alt: "Glory of the Table Tennis", year: "2018", role: "support", char: "大刘 · Da Liu" },
      { title: "木兰之巾帼英豪", alt: "Mulan: Heroine", year: "", role: "support", char: { de: "Rouran-Prinzessin · 柔然公主", zh: "柔然公主", en: "Rouran Princess · 柔然公主" }, note: { de: "Zweite Hauptrolle (女二)", zh: "女二号", en: "Second Female Lead (女二)" } },
    ],
    web: [
      { title: "The Good Shinobi", year: "2026", role: "lead", note: { de: "Vertikale Mini-Serie · Internet-Produktion (angekündigt)", zh: "竖屏微短剧 · 网络出品（待播）", en: "Vertical Mini-Series · Internet Production (upcoming)" } },
      { title: "末日边缘", alt: "Edge of Doomsday", year: "", role: "lead", char: "诺兰 · Nuolan", note: { de: "Web-Film", zh: "网络电影", en: "Web Film" } },
      { title: "我们的逆青春", alt: "Our Reverse Youth", year: "", role: "support", char: "麦琪 · Maggie", note: { de: "Webserie", zh: "网络剧", en: "Web Series" } },
    ],
    ad: [
      { title: "Audi E-Concept", year: "2024–25", char: { de: "Astronautin · 女航天员", zh: "女航天员", en: "Female Astronaut · 女航天员" } },
      { title: "PENNY", year: "2025", note: { de: "Kampagne", zh: "广告代言", en: "Campaign" } },
      { title: "GenanX", year: "2017–18", note: { de: "Markenbotschafterin", zh: "品牌大使", en: "Brand Ambassador" } },
      { title: "New Face China · Salztokyo × SAT.1", year: "2017–18", note: { de: "Fernsehauftritt", zh: "电视节目", en: "Television Feature" } },
      { title: "Golden Wings Center", year: "2019", note: { de: "Botschafterin", zh: "形象大使", en: "Ambassador" } },
      { title: "This is Street Dance · Create 101", year: "2017–18", note: { de: "TV-Show", zh: "综艺节目", en: "TV Show" } },
      { title: "医哥医姐你可来了！", alt: "Youku Variety", year: "2018", note: { de: "Youku Variety-Show", zh: "优酷综艺", en: "Youku Variety Show" } },
      { title: { de: "Qingdao Deutsche Kulturwoche", zh: "青岛德国文化周", en: "Qingdao German Culture Week" }, year: "2017", note: { de: "Moderation / Gatekeeper", zh: "主持 / 迎宾", en: "Host / Gatekeeper" } },
      { title: "Keep Battle Beijing", year: "2016", note: { de: "Championin", zh: "冠军", en: "Champion" } },
      { title: { de: "Zhuang Zi's T-Raum", zh: "庄子的 T-Raum", en: "Zhuang Zi's T-Raum" }, year: "2016", note: { de: "Performance · Galerie T", zh: "现场演出 · Galerie T", en: "Performance · Galerie T" } },
    ],
  };

  /* ---------- Gallery ----------
     Category filters + per-image category mapping.
     Captions are the localized category name (kept elegant & light). */
  const GALLERY_CATS = [
    { id: "all", label: { de: "Alle", zh: "全部", en: "All" } },
    { id: "studio", label: { de: "Studio", zh: "棚拍", en: "Studio" } },
    { id: "editorial", label: { de: "Editorial", zh: "时尚", en: "Editorial" } },
    { id: "character", label: { de: "Charakter", zh: "角色", en: "Character" } },
    { id: "lifestyle", label: { de: "Lifestyle", zh: "生活", en: "Lifestyle" } },
  ];

  // Explicit display order (interleaves moods & orientations for a lively grid).
  const GALLERY = [
    { name: "neutral_grey_background", cat: "studio" },
    { name: "bw_sexy_chair", cat: "editorial" },
    { name: "fancy_red_chair", cat: "character" },
    { name: "cool_dancing_red_glasses_cap", cat: "editorial" },
    { name: "neutral_02", cat: "studio" },
    { name: "outside_smile", cat: "lifestyle" },
    { name: "bw_artsy_01", cat: "editorial" },
    { name: "fancy_princess_dress", cat: "character" },
    { name: "cool_dress_grey_background", cat: "studio" },
    { name: "cute_light_cafe", cat: "lifestyle" },
    { name: "cool_cape_grey_background", cat: "editorial" },
    { name: "neutral_04", cat: "studio" },
    { name: "bw_artsy_03", cat: "editorial" },
    { name: "cool_cap_grey_background", cat: "studio" },
    { name: "bw_artsy_02", cat: "editorial" },
    { name: "fancy_grey_background", cat: "studio" },
    { name: "bw_artsy_04", cat: "editorial" },
    { name: "neutral_01", cat: "studio" },
    { name: "bw_artsy_05", cat: "editorial" },
    { name: "neutral_03", cat: "studio" },
  ];

  /* ---------- Social platforms ---------- */
  const SOCIALS = [
    { id: "instagram", name: "Instagram", handle: "@julintaeubner", url: "https://instagram.com/julintaeubner" },
    { id: "douyin", name: { de: "Douyin", zh: "抖音", en: "Douyin" }, handle: "4924365", url: "https://www.douyin.com/user/4924365" },
    { id: "weibo", name: { de: "Weibo", zh: "微博", en: "Weibo" }, handle: "菊麟", url: "https://weibo.com/n/菊麟" },
    { id: "xiaohongshu", name: { de: "Xiaohongshu (RED)", zh: "小红书", en: "Xiaohongshu (RED)" }, handle: "菊麟", url: "https://www.xiaohongshu.com/search_result?keyword=菊麟" },
    { id: "baidu", name: { de: "Baidu Baike", zh: "百度百科", en: "Baidu Baike" }, handle: "菊麟", url: "https://baike.baidu.com/item/菊麟" },
  ];

  return { CONFIG, I18N, STATS, LANGUAGES, SKILLS, FILM_CATS, FILMOGRAPHY, GALLERY_CATS, GALLERY, SOCIALS };
})();
