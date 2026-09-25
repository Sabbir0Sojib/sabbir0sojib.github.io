/* Md Sabbir Islam, portfolio.
   Content lives in content/*.json (edit it with Pages CMS or on GitHub).
   This script renders it, then wires up filters, the lightbox and copy buttons. */
(function () {
  "use strict";

  var VER = document.documentElement.getAttribute("data-v") || "1";

  // Phone menu button
  var head = document.querySelector(".site-head");
  var toggle = document.querySelector(".nav-toggle");
  if (head && toggle) {
    var setOpen = function (on) {
      head.classList.toggle("is-open", on);
      toggle.setAttribute("aria-expanded", on ? "true" : "false");
      toggle.setAttribute("aria-label", on ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", function () { setOpen(!head.classList.contains("is-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    document.addEventListener("click", function (e) { if (!head.contains(e.target)) setOpen(false); });
  }
  var OWNER = "Islam, M.S.";

  function esc(v) {
    return String(v == null ? "" : v)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function icon(name, cls) {
    return '<svg class="' + (cls || "i") + '" aria-hidden="true"><use href="assets/icons.svg?v=' + VER + "#" + name + '"/></svg>';
  }
  // Images saved by Pages CMS start with "/", which works on the live site; keep relative paths working too.
  function src(path) { return path ? String(path) : ""; }
  var cache = {};
  function load(name) {
    if (!cache[name]) {
      cache[name] = fetch("content/" + name + ".json?v=" + VER, { cache: "no-cache" }).then(function (r) {
        if (!r.ok) throw new Error(name + ".json " + r.status);
        return r.json();
      });
    }
    return cache[name];
  }
  function fail(el, what) {
    el.removeAttribute("aria-busy");
    el.innerHTML = '<p class="list-empty">Could not load ' + what + ". Please refresh the page.</p>";
  }
  function copyBtn(text, label) {
    return '<button class="copy" type="button" data-copy="' + esc(text) + '" aria-label="Copy ' + esc(label) + '">' +
      icon("copy", "i i--copy") + icon("check", "i i--check") + '<span class="copy__label">Copy</span></button>';
  }

  /* ================= Renderers ================= */

  function cleanUrl(u) { return String(u || "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""); }
  function list(items, fn) { return (items || []).map(fn).join(""); }
  function split(id, title, body, extra) {
    return '<section class="split" aria-labelledby="' + id + '"' + (extra || "") + '><div class="split__head"><h2 class="sec-title" id="' + id + '">' + title + "</h2></div>" +
      '<div class="split__body">' + body + "</div></section>";
  }

  // Home: name, bio, photo and the four facts
  function renderHero(el, p) {
    var orcidUrl = p.orcid ? "https://orcid.org/" + p.orcid : "";
    var links = (orcidUrl ? '<a href="' + esc(orcidUrl) + '" target="_blank" rel="me noopener">' + icon("orcid") + "ORCID</a>" : "") +
      (p.linkedin ? '<a href="' + esc(p.linkedin) + '" target="_blank" rel="me noopener">' + icon("linkedin") + "LinkedIn</a>" : "") +
      (p.github ? '<a href="' + esc(p.github) + '" target="_blank" rel="me noopener">' + icon("github") + "GitHub</a>" : "");
    var facts = list(p.facts, function (f) { return "<div><dt>" + esc(f.label) + "</dt><dd>" + esc(f.value) + "</dd></div>"; });
    el.innerHTML =
      '<section class="hero" aria-labelledby="name"><div class="hero__text">' +
        '<h1 id="name" class="hero__name">' + esc(p.name) + "</h1>" +
        '<p class="hero__role">' + esc(p.role) + "</p>" +
        '<p class="hero__bio">' + esc(p.bio) + "</p>" +
        '<div class="hero__actions"><a class="btn btn--primary" href="#contact">' + icon("envelope") + "Email me</a>" +
          (links ? '<p class="hero__links">' + links + "</p>" : "") + "</div>" +
      "</div>" +
      (p.photo ? '<figure class="hero__photo"><img src="' + esc(src(p.photo)) + '" width="640" height="800" alt="' + esc(p.photo_alt) + '">' +
        (p.photo_caption ? '<figcaption class="hero__caption">' + esc(p.photo_caption) + "</figcaption>" : "") + "</figure>" : "") +
      "</section>" +
      (facts ? '<dl class="glance">' + facts + "</dl>" : "");
  }

  // Home: experience, skills, interests, awards, languages and contact
  function renderAbout(el, p) {
    var orcidUrl = p.orcid ? "https://orcid.org/" + p.orcid : "";
    var exp = list(p.experience, function (x) {
      return '<li class="timeline__item"><p class="timeline__when">' + esc(x.when) + '</p><div><h3 class="timeline__role">' +
        esc(x.title) + '</h3><p class="timeline__org">' + esc(x.detail) + "</p></div></li>";
    });
    var skills = list(p.skills, function (x) { return "<div><dt>" + esc(x.group) + "</dt><dd>" + esc(x.items) + "</dd></div>"; });
    var interests = list(p.interests, function (t) { return '<li class="tag">' + esc(t) + "</li>"; });
    var awards = list(p.awards, function (x) { return '<li><span class="mono">' + esc(x.year) + "</span>" + esc(x.text) + "</li>"; });
    var langs = list(p.languages, function (x) { return "<li>" + esc(x) + "</li>"; });
    var emails = (p.emails || []).map(function (e) { return typeof e === "string" ? { label: "Email", address: e } : e; });
    var card = function (ic, label, text, href, copyText, copyLabel, ext) {
      return '<li class="ccard"><span class="ccard__icon">' + icon(ic) + '</span>' +
        '<span class="ccard__body"><span class="ccard__label">' + esc(label) + '</span>' +
        '<a class="ccard__value" href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="me noopener"' : "") + '>' + esc(text) + "</a></span>" +
        (copyText ? copyBtn(copyText, copyLabel) : "") + "</li>";
    };
    var contact = emails.map(function (e) { return card("envelope", e.label, e.address, "mailto:" + e.address, e.address, e.label); }).join("") +
      (orcidUrl ? card("orcid", "ORCID", p.orcid, orcidUrl, p.orcid, "ORCID iD", true) : "") +
      (p.linkedin ? card("linkedin", "LinkedIn", cleanUrl(p.linkedin), p.linkedin, "", "", true) : "") +
      (p.github ? card("github", "GitHub", cleanUrl(p.github), p.github, "", "", true) : "");

    el.innerHTML =
      (exp ? split("experience", "Education and experience", '<ol class="timeline">' + exp + "</ol>") : "") +
      (skills ? split("skills", "Skills", '<dl class="skills">' + skills + "</dl>") : "") +
      (interests ? split("interests", "Research interests", '<ul class="tags">' + interests + "</ul>") : "") +
      (awards || langs ? split("awards", "Awards and languages",
        '<div class="two-col">' +
          (awards ? '<div><h3 class="sub-title">Awards</h3><ul class="plain-list">' + awards + "</ul></div>" : "") +
          (langs ? '<div><h3 class="sub-title">Languages</h3><ul class="plain-list">' + langs + "</ul></div>" : "") +
        "</div>") : "") +
      '<section id="contact" class="split contact" aria-labelledby="contact-title"><div class="split__head"><h2 id="contact-title" class="sec-title" data-site="contact_title">Contact</h2></div>' +
        '<div class="split__body"><p class="contact__note" data-site="contact_note">Open to research collaboration, mapping work and questions about any project.</p>' +
        '<ul class="ccards">' + contact + "</ul></div></section>";
  }

  // Home: the three newest maps
  function renderHomeMaps(el, all) {
    var maps = newestFirst(all).filter(function (m) { return m.image; }).slice(0, 3);
    el.innerHTML = maps.map(function (m, i) {
      return '<figure class="shot">' +
        '<button class="mat shot__btn" type="button" data-lightbox="h' + i + '" aria-label="Open ' + esc(m.title) + ' full size">' +
        '<img src="' + esc(src(m.image)) + '" alt="' + esc(m.image_alt || m.title) + '"' + (i ? ' loading="lazy"' : "") + ">" +
        '<span class="shot__zoom" aria-hidden="true">' + icon("expand") + "View full size</span></button>" +
        '<figcaption><p class="shot__top"><span class="shot__title">' + esc(m.title) + '</span><span class="mono shot__year">' + esc(m.year) + "</span></p>" +
        '<p class="shot__meta visually-hidden">' + esc(m.description) + "</p></figcaption></figure>";
    }).join("");
    var count = document.querySelector('[data-count="maps"]');
    if (count && all.length) count.textContent = "All " + all.length + " maps";
  }

  // Home: the three newest research items, all equal
  function renderHomeResearch(el, all) {
    el.innerHTML = newestFirst(all).slice(0, 3).map(function (r) {
      var done = /presented|published|accepted/i.test(r.status || "");
      var title = r.link ? '<a href="' + esc(r.link) + '" target="_blank" rel="noopener">' + esc(r.title) + "</a>" : esc(r.title);
      return '<li class="cite"><p class="cite__meta"><span class="mono">' + esc(r.year) + "</span><span>" + esc(TYPE_LABEL[r.type] || TYPE_LABEL.other) + "</span>" +
        (r.status ? '<span class="status' + (done ? " status--done" : "") + '">' + esc(r.status) + "</span>" : "") + "</p>" +
        '<p class="cite__title">' + title + "</p>" +
        (r.venue ? '<p class="cite__venue">' + esc(r.venue) + "</p>" : "") + "</li>";
    }).join("");
  }

  // Home: the four newest code projects
  function renderHomeProjects(el, all) {
    el.innerHTML = newestFirst(all).slice(0, 4).map(function (p) {
      var tools = String(p.tools || "").split(",").map(function (t) { return t.trim(); }).filter(Boolean).join(" · ");
      return '<li><div class="plist__row">' +
        '<a class="plist__title" href="' + esc(p.repo) + '" target="_blank" rel="noopener">' + esc(p.title) + "</a>" +
        '<span class="plist__year mono">' + esc(p.year) + "</span>" +
        '<p class="plist__text">' + esc(p.description) + "</p>" +
        (tools ? '<p class="plist__tools">' + esc(tools) + "</p>" : "") + "</div></li>";
    }).join("");
  }

  var TYPE_LABEL = { journal: "Journal manuscript", conference: "Conference paper", field: "Field work", thesis: "Thesis", other: "Research" };
  function boldOwner(authors) { return esc(authors).split(esc(OWNER)).join("<b>" + esc(OWNER) + "</b>"); }
  var GROUPS = [
    ["journal", "Journal manuscripts"], ["conference", "Conference papers"],
    ["thesis", "Thesis"], ["field", "Field work"], ["other", "Other"]
  ];
  function renderResearch(el, list) {
    list = newestFirst(list);
    el.innerHTML = GROUPS.map(function (g) {
      var items = list.filter(function (r) { return (r.type || "other") === g[0]; });
      if (!items.length) return "";
      return '<section class="pubgroup" aria-labelledby="pg-' + g[0] + '">' +
        '<h2 class="pubgroup__title" id="pg-' + g[0] + '">' + g[1] + ' <span class="pubgroup__count">' + items.length + "</span></h2>" +
        '<ol class="publist">' + items.map(function (r, i) {
          var done = /presented|published|accepted/i.test(r.status || "");
          var status = r.status ? ' <span class="status' + (done ? " status--done" : "") + '">' + esc(r.status) + "</span>" : "";
          var title = r.link ? '<a href="' + esc(r.link) + '" target="_blank" rel="noopener">' + esc(r.title) + "</a>" : esc(r.title);
          return '<li class="pub">' +
            '<span class="pub__n">' + (i + 1) + "</span>" +
            '<div class="pub__body">' +
              '<p class="pub__cite">' +
                (r.authors ? '<span class="pub__authors">' + boldOwner(r.authors) + "</span> " : "") +
                '<span class="pub__year">(' + esc(r.year) + ").</span> " +
                '<span class="pub__title">' + title + ".</span> " +
                (r.venue ? '<span class="pub__venue">' + esc(r.venue) + ".</span>" : "") + status +
              "</p>" +
              (r.note ? '<p class="pub__note">' + esc(r.note) + "</p>" : "") +
            "</div></li>";
        }).join("") + "</ol></section>";
    }).join("");
  }

  function renderRepos(el, all) {
    var items = newestFirst(all);
    el.innerHTML = items.map(function (p) {
      var tools = String(p.tools || "").split(",").map(function (t) { return t.trim(); }).filter(Boolean)
        .map(function (t) { return '<li class="tag">' + esc(t) + "</li>"; }).join("");
      var repoName = cleanUrl(p.repo).replace(/^github\.com\//, "");
      var media = p.image
        ? '<img src="' + esc(src(p.image)) + '" alt="' + esc(p.image_alt || p.title) + '" loading="lazy">'
        : '<span class="proj__tile">' + icon("github") + "<span>" + esc(repoName) + "</span></span>";
      return '<article class="proj">' +
        '<a class="mat proj__media" href="' + esc(p.repo) + '" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">' + media + "</a>" +
        '<div class="proj__body">' +
          '<div class="proj__top"><h2 class="proj__title"><a href="' + esc(p.repo) + '" target="_blank" rel="noopener">' + esc(p.title) + '</a></h2><span class="mono shot__year">' + esc(p.year) + "</span></div>" +
          '<p class="proj__text">' + esc(p.description) + "</p>" +
          (tools ? '<ul class="tags tags--quiet">' + tools + "</ul>" : "") +
          '<a class="link" href="' + esc(p.repo) + '" target="_blank" rel="noopener">' + icon("github") + '<span class="proj__repo">' + esc(repoName) + "</span>" + icon("arrow") + "</a>" +
        "</div></article>";
    }).join("");
    var empty = document.querySelector(".list-empty");
    if (empty) empty.hidden = items.length > 0;
  }

  // Map tags are typed freely in Pages CMS; filter buttons are built from the tags in use.
  function tagsOf(p) {
    var t = Array.isArray(p.tags) ? p.tags : (p.tags ? String(p.tags).split(",") : []);
    if (!t.length && p.theme) t = [THEME_LABEL[p.theme] || p.theme];
    return t.map(function (x) { return String(x).trim(); }).filter(Boolean);
  }
  function tagKey(t) { return t.toLowerCase().replace(/\s+/g, " "); }
  function renderChips(list) {
    var box = document.querySelector("[data-chips]");
    if (!box) return;
    var seen = {};
    list.forEach(function (p) {
      tagsOf(p).forEach(function (t) {
        var k = tagKey(t);
        if (!seen[k]) seen[k] = { key: k, label: t, n: 0 };
        seen[k].n++;
      });
    });
    var tags = Object.keys(seen).map(function (k) { return seen[k]; })
      .sort(function (a, b) { return b.n - a.n || a.label.localeCompare(b.label); });
    if (tags.length < 2) return;
    box.innerHTML = '<button class="chip" type="button" data-filter="all" aria-pressed="true">All</button>' +
      tags.map(function (t) { return '<button class="chip" type="button" data-filter="' + esc(t.key) + '" aria-pressed="false">' + esc(t.label) + "</button>"; }).join("");
    box.hidden = false;
  }

  function renderProjects(el, list) {
    list = newestFirst(list);
    var withImg = list.filter(function (p) { return p.image; });
    var noImg = list.filter(function (p) { return !p.image; });
    el.innerHTML = withImg.map(function (p, i) {
      var code = p.code ? '<a class="link" href="' + esc(p.code) + '" target="_blank" rel="noopener">View code' + icon("arrow") + "</a>" : "";
      return '<figure class="shot" data-cat="' + esc(tagsOf(p).map(tagKey).join("|")) + '">' +
        '<button class="mat shot__btn" type="button" data-lightbox="p' + i + '" aria-label="Open ' + esc(p.title) + ' full size">' +
        '<img src="' + esc(src(p.image)) + '" alt="' + esc(p.image_alt || p.title) + '" loading="lazy">' +
        '<span class="shot__zoom" aria-hidden="true">' + icon("expand") + "View full size</span></button>" +
        '<figcaption><p class="shot__top"><span class="shot__title">' + esc(p.title) + '</span><span class="mono shot__year">' + esc(p.year) + "</span></p>" +
        '<p class="shot__meta">' + esc(p.description) + "</p>" + code + "</figcaption></figure>";
    }).join("");
    renderChips(withImg);
    var more = document.querySelector('[data-render="projects-more"]');
    var wrap = document.querySelector('[data-render-wrap="projects-more"]');
    if (more && noImg.length) {
      more.innerHTML = noImg.map(function (p) {
        var code = p.code ? ' <a class="link" href="' + esc(p.code) + '" target="_blank" rel="noopener">Code' + icon("arrow") + "</a>" : "";
        return '<li><p class="more__title">' + esc(p.title) + '</p><p class="more__meta">' + esc(p.description) + code + "</p></li>";
      }).join("");
      if (wrap) wrap.hidden = false;
    }
  }

  function renderGallery(el, list) {
    el.innerHTML = list.map(function (g, i) {
      return '<figure class="shot"><button class="shot__btn" type="button" data-lightbox="g' + i + '" aria-label="Open photo full size">' +
        '<img src="' + esc(src(g.image)) + '" alt="' + esc(g.alt || g.title) + '" loading="lazy"></button>' +
        '<figcaption><p class="shot__title">' + esc(g.title) + '</p><p class="shot__meta">' + esc(g.caption) + "</p></figcaption></figure>";
    }).join("");
    var empty = document.querySelector(".list-empty");
    if (empty) empty.hidden = list.length > 0;
  }


  var THEME_LABEL = { hazard: "Hazards and climate", water: "Water", land: "Land and terrain", city: "Cities" };

  // Newest first by date (YYYY-MM-DD); items without a date count as the end of their year.
  function sortKey(x) { return x.date ? String(x.date) : (String(x.year || "0000") + "-12-31"); }
  function newestFirst(list) {
    return list.map(function (x, i) { return { x: x, i: i }; }).sort(function (a, b) {
      var ka = sortKey(a.x), kb = sortKey(b.x);
      return ka < kb ? 1 : ka > kb ? -1 : a.i - b.i;
    }).map(function (o) { return o.x; });
  }

  var RENDER = {
    hero: ["profile", renderHero, "the profile"],
    about: ["profile", renderAbout, "the profile"],
    "home-maps": ["maps", renderHomeMaps, "maps"],
    "home-research": ["research", renderHomeResearch, "research"],
    "home-projects": ["projects", renderHomeProjects, "projects"],
    research: ["research", renderResearch, "research"],
    repos: ["projects", renderRepos, "projects"],
    maps: ["maps", renderProjects, "maps"],
    gallery: ["gallery", renderGallery, "photos"]
  };

  var jobs = Array.prototype.slice.call(document.querySelectorAll("[data-render]")).map(function (el) {
    var spec = RENDER[el.getAttribute("data-render")];
    if (!spec) return Promise.resolve();
    return load(spec[0]).then(function (data) {
      spec[1](el, data);
      el.removeAttribute("aria-busy");
    }).catch(function () { fail(el, spec[2]); });
  });

  // Editable page titles, intros and footer (content/site.json)
  var siteText = load("site").catch(function () { return {}; });
  Promise.all(jobs).then(function () { return siteText; }, function () { return siteText; }).then(function (t) {
    document.querySelectorAll("[data-site]").forEach(function (n) {
      var v = t && t[n.getAttribute("data-site")];
      if (v) n.textContent = v;
    });
    init();
  });

  /* ================= Behaviour (after render) ================= */
  function init() {
    // Copy buttons
    document.querySelectorAll("[data-copy]").forEach(function (btn) {
      var label = btn.querySelector(".copy__label");
      btn.addEventListener("click", function () {
        var text = btn.getAttribute("data-copy");
        var done = function () {
          btn.classList.add("is-copied");
          if (label) label.textContent = "Copied";
          setTimeout(function () { btn.classList.remove("is-copied"); if (label) label.textContent = "Copy"; }, 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
        } else { fallbackCopy(text); done(); }
      });
    });

    // Filter chips (Maps page, built by renderChips)
    var chips = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-cat]"));
    var empty = document.querySelector(".list-empty");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var f = chip.getAttribute("data-filter");
        chips.forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
        var shown = 0;
        items.forEach(function (it) {
          var on = f === "all" || it.getAttribute("data-cat").split("|").indexOf(f) > -1;
          it.hidden = !on;
          if (on) shown++;
        });
        if (empty) empty.hidden = shown > 0;
      });
    });

    initLightbox();
    initWall();
  }

  // Maps page: two columns that keep newest-first order (each map goes to the shorter column).
  var wallItems = null;
  function layoutWall() {
    var wall = document.querySelector(".map-wall");
    if (!wall) return;
    if (!wallItems) wallItems = Array.prototype.slice.call(wall.querySelectorAll(".shot"));
    var n = window.matchMedia("(max-width: 760px)").matches ? 1 : 2;
    var cols = [], heights = [];
    wall.innerHTML = "";
    for (var i = 0; i < n; i++) {
      var c = document.createElement("div"); c.className = "map-wall__col";
      wall.appendChild(c); cols.push(c); heights.push(0);
    }
    wallItems.forEach(function (it) {
      if (it.hidden) { cols[0].appendChild(it); return; }
      var img = it.querySelector("img");
      var ratio = img && img.naturalWidth ? img.naturalHeight / img.naturalWidth : 1;
      var k = heights.indexOf(Math.min.apply(null, heights));
      cols[k].appendChild(it);
      heights[k] += Math.min(ratio, 1.8) + 0.35; // map height plus caption
    });
  }
  function initWall() {
    var wall = document.querySelector(".map-wall");
    if (!wall) return;
    layoutWall();
    var t = null, again = function () { clearTimeout(t); t = setTimeout(layoutWall, 120); };
    wall.querySelectorAll("img").forEach(function (im) { if (!im.complete) im.addEventListener("load", again); });
    window.matchMedia("(max-width: 760px)").addEventListener("change", layoutWall);
    document.querySelectorAll("[data-filter]").forEach(function (ch) { ch.addEventListener("click", function () { setTimeout(layoutWall, 0); }); });
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", "");
    ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }

  function initLightbox() {
    var lb = document.querySelector(".lightbox");
    var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
    if (!lb || !triggers.length || typeof lb.showModal !== "function") return;
    var img = lb.querySelector(".lightbox__img");
    var title = lb.querySelector(".lightbox__title");
    var meta = lb.querySelector(".lightbox__meta");
    var view = lb.querySelector(".lightbox__view");
    var orig = lb.querySelector("[data-lb-original]");
    var current = 0, lastFocus = null;

    var visible = function () { return triggers.filter(function (t) { return !t.closest("figure").hidden; }); };
    var unzoom = function () { view.classList.remove("is-zoomed"); img.style.width = ""; };
    var show = function (i) {
      var list = visible();
      current = (i + list.length) % list.length;
      var t = list[current];
      var s = t.querySelector("img");
      var fig = t.closest("figure");
      img.src = s.currentSrc || s.src;
      img.alt = s.alt;
      title.textContent = fig.querySelector(".shot__title").textContent;
      meta.textContent = fig.querySelector(".shot__meta").textContent;
      orig.href = img.src;
      unzoom();
    };
    triggers.forEach(function (t) {
      t.addEventListener("click", function () { lastFocus = t; show(visible().indexOf(t)); lb.showModal(); });
    });
    lb.querySelector("[data-lb-close]").addEventListener("click", function () { lb.close(); });
    lb.querySelector("[data-lb-prev]").addEventListener("click", function () { show(current - 1); });
    lb.querySelector("[data-lb-next]").addEventListener("click", function () { show(current + 1); });
    lb.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener("close", function () { unzoom(); if (lastFocus) lastFocus.focus(); });
    view.addEventListener("click", function (e) {
      if (view.classList.contains("is-zoomed")) { unzoom(); return; }
      var r = img.getBoundingClientRect();
      var fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height;
      var w = Math.max(img.naturalWidth, r.width * 2);
      view.classList.add("is-zoomed");
      img.style.width = w + "px";
      var h = w * r.height / r.width;
      view.scrollLeft = fx * w - view.clientWidth / 2;
      view.scrollTop = fy * h - view.clientHeight / 2;
    });
  }
})();
