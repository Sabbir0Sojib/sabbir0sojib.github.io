/* Md Sabbir Islam, portfolio.
   Content lives in content/*.json (edit it with Pages CMS or on GitHub).
   This script renders it, then wires up filters, the lightbox, copy buttons and reveals. */
(function () {
  "use strict";

  var VER = document.documentElement.getAttribute("data-v") || "1";
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
  function load(name) {
    return fetch("content/" + name + ".json?v=" + VER, { cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw new Error(name + ".json " + r.status);
      return r.json();
    });
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

  function renderProfile(el, p) {
    var orcidUrl = p.orcid ? "https://orcid.org/" + p.orcid : "";
    var facts = (p.facts || []).map(function (f) {
      return "<div><dt>" + esc(f.label) + "</dt><dd>" + esc(f.value) + "</dd></div>";
    }).join("");
    var buttons = '<a class="btn btn--primary" href="#contact">' + icon("envelope") + "Email me</a>" +
      (orcidUrl ? '<a class="btn" href="' + esc(orcidUrl) + '" target="_blank" rel="me noopener">' + icon("orcid") + "ORCID</a>" : "") +
      (p.linkedin ? '<a class="btn" href="' + esc(p.linkedin) + '" target="_blank" rel="me noopener">' + icon("linkedin") + "LinkedIn</a>" : "") +
      (p.github ? '<a class="btn" href="' + esc(p.github) + '" target="_blank" rel="me noopener">' + icon("github") + "GitHub</a>" : "");
    var interests = (p.interests || []).map(function (t) { return '<li class="tag">' + esc(t) + "</li>"; }).join("");
    var exp = (p.experience || []).map(function (x) {
      return '<li class="timeline__item"><p class="timeline__when">' + esc(x.when) + '</p><div><h3 class="timeline__role">' +
        esc(x.title) + '</h3><p class="timeline__org">' + esc(x.detail) + "</p></div></li>";
    }).join("");
    var skills = (p.skills || []).map(function (x) { return "<div><dt>" + esc(x.group) + "</dt><dd>" + esc(x.items) + "</dd></div>"; }).join("");
    var awards = (p.awards || []).map(function (x) { return '<li><span class="mono">' + esc(x.year) + "</span>" + esc(x.text) + "</li>"; }).join("");
    var langs = (p.languages || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("");
    var emails = (p.emails || []).map(function (e) {
      return typeof e === "string" ? { label: "Email", address: e } : e;
    });
    var card = function (ic, label, text, href, copyText, copyLabel, ext) {
      return '<li class="ccard"><span class="ccard__icon">' + icon(ic) + '</span>' +
        '<span class="ccard__body"><span class="ccard__label">' + esc(label) + '</span>' +
        '<a class="ccard__value" href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="me noopener"' : "") + '>' + esc(text) + "</a></span>" +
        (copyText ? copyBtn(copyText, copyLabel) : "") + "</li>";
    };
    var contact = emails.map(function (e) { return card("envelope", e.label, e.address, "mailto:" + e.address, e.address, e.label); }).join("") +
      (orcidUrl ? card("orcid", "ORCID", p.orcid, orcidUrl, p.orcid, "ORCID iD", true) : "") +
      (p.linkedin ? card("linkedin", "LinkedIn", p.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), p.linkedin, "", "", true) : "") +
      (p.github ? card("github", "GitHub", p.github.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""), p.github, "", "", true) : "");

    el.innerHTML =
      '<section class="intro" aria-labelledby="name"><div class="intro__text reveal">' +
        '<h1 id="name" class="intro__name">' + esc(p.name) + "</h1>" +
        '<p class="intro__role">' + esc(p.role) + "</p>" +
        '<p class="intro__bio">' + esc(p.bio) + "</p>" +
        '<dl class="facts">' + facts + "</dl>" +
        '<div class="btn-row">' + buttons + "</div></div>" +
        (p.photo ? '<img class="intro__photo" src="' + esc(src(p.photo)) + '" width="640" height="800" alt="' + esc(p.photo_alt) + '">' : "") +
      "</section>" +
      (interests ? '<section class="block reveal" aria-labelledby="interests"><h2 id="interests" class="block__title">Research interests</h2><ul class="tags">' + interests + "</ul></section>" : "") +
      (exp ? '<section class="block reveal" aria-labelledby="experience"><h2 id="experience" class="block__title">Education and experience</h2><ol class="timeline">' + exp + "</ol></section>" : "") +
      (skills ? '<section class="block reveal" aria-labelledby="skills"><h2 id="skills" class="block__title">Skills</h2><dl class="skills">' + skills + "</dl></section>" : "") +
      '<section class="block reveal two-col" aria-label="Awards and languages">' +
        '<div><h2 class="block__title">Awards</h2><ul class="plain-list">' + awards + "</ul></div>" +
        '<div><h2 class="block__title">Languages</h2><ul class="plain-list">' + langs + "</ul></div></section>" +
      '<section id="contact" class="block reveal contact" aria-labelledby="contact-title"><h2 id="contact-title" class="block__title" data-site="contact_title">Contact</h2>' +
      '<p class="contact__note" data-site="contact_note">Open to research collaboration, mapping work and questions about any project.</p>' +
      '<ul class="ccards">' + contact + "</ul></section>";
  }

  var TYPE_LABEL = { journal: "Journal manuscript", conference: "Conference paper", field: "Field work", thesis: "Thesis", other: "Research" };
  function boldOwner(authors) { return esc(authors).split(esc(OWNER)).join("<b>" + esc(OWNER) + "</b>"); }
  function renderResearch(el, list) {
    list = newestFirst(list);
    el.innerHTML = list.map(function (r) {
      var done = /presented|published|accepted/i.test(r.status || "");
      var status = r.status ? '<span class="status' + (done ? " status--done" : "") + '">' + esc(r.status) + "</span>" : "";
      var title = r.link ? '<a href="' + esc(r.link) + '" target="_blank" rel="noopener">' + esc(r.title) + "</a>" : esc(r.title);
      return '<li class="story" data-cat="' + esc(r.type) + '">' +
        '<p class="story__kind"><span class="mono">' + esc(r.year) + "</span>" + esc(TYPE_LABEL[r.type] || r.type) + status + "</p>" +
        '<h2 class="story__title">' + title + "</h2>" +
        (r.authors ? '<p class="story__byline">' + boldOwner(r.authors) + "</p>" : "") +
        (r.venue ? '<p class="story__venue">' + esc(r.venue) + "</p>" : "") +
        (r.note ? '<p class="story__note">' + esc(r.note) + "</p>" : "") + "</li>";
    }).join("");
  }

  function renderProjects(el, list) {
    list = newestFirst(list);
    var withImg = list.filter(function (p) { return p.image; });
    var noImg = list.filter(function (p) { return !p.image; });
    el.innerHTML = withImg.map(function (p, i) {
      var code = p.code ? '<a class="link" href="' + esc(p.code) + '" target="_blank" rel="noopener">View code' + icon("arrow") + "</a>" : "";
      return '<figure class="shot" data-cat="' + esc(p.theme) + '">' +
        '<button class="shot__btn" type="button" data-lightbox="p' + i + '" aria-label="Open ' + esc(p.title) + ' full size">' +
        '<img src="' + esc(src(p.image)) + '" alt="' + esc(p.image_alt || p.title) + '" loading="lazy"></button>' +
        '<figcaption><p class="shot__top"><span class="shot__title">' + esc(p.title) + '</span><span class="mono shot__year">' + esc(p.year) + "</span></p>" +
        '<p class="shot__meta">' + esc(p.description) + "</p>" + code + "</figcaption></figure>";
    }).join("");
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


  /* ---------- Home: cover, map story, finale ---------- */
  var THEME_LABEL = { hazard: "Hazards and climate", water: "Water", land: "Land and terrain", city: "Cities" };

  function renderCover(el, p) {
    var orcidUrl = p.orcid ? "https://orcid.org/" + p.orcid : "";
    el.innerHTML =
      '<div class="cover__inner">' +
        '<div class="cover__text">' +
          '<h1 class="cover__name">' + esc(p.name) + "</h1>" +
          '<p class="cover__role">' + esc(p.role) + "</p>" +
          '<p class="cover__bio">' + esc(p.bio) + "</p>" +
          '<div class="btn-row">' +
            '<a class="btn btn--primary" href="#contact">' + icon("envelope") + "Email me</a>" +
            '<a class="btn btn--line" href="about.html">About me</a>' +
            (orcidUrl ? '<a class="icon-btn icon-btn--light" href="' + esc(orcidUrl) + '" target="_blank" rel="me noopener" aria-label="ORCID">' + icon("orcid") + "</a>" : "") +
            (p.linkedin ? '<a class="icon-btn icon-btn--light" href="' + esc(p.linkedin) + '" target="_blank" rel="me noopener" aria-label="LinkedIn">' + icon("linkedin") + "</a>" : "") +
            (p.github ? '<a class="icon-btn icon-btn--light" href="' + esc(p.github) + '" target="_blank" rel="me noopener" aria-label="GitHub">' + icon("github") + "</a>" : "") +
          "</div>" +
        "</div>" +
        (p.photo ? '<img class="cover__photo" src="' + esc(src(p.photo)) + '" width="640" height="800" alt="' + esc(p.photo_alt) + '">' : "") +
      "</div>";
  }

  function renderStory(el, list) {
    var maps = list.filter(function (x) { return x.image; });
    var n = maps.length;
    el.innerHTML = maps.map(function (m, i) {
      var code = m.code ? '<a class="link" href="' + esc(m.code) + '" target="_blank" rel="noopener">View code' + icon("arrow") + "</a>" : "";
      return '<article class="step' + (i === 0 ? " is-active" : "") + '" data-step="' + i + '">' +
        '<p class="step__count">Chapter ' + (i + 1) + " of " + n + (THEME_LABEL[m.theme] ? " · " + esc(THEME_LABEL[m.theme]) : "") + "</p>" +
        (m.stat ? '<p class="step__stat">' + esc(m.stat) + "</p>" : "") +
        (m.stat_label ? '<p class="step__statlabel">' + esc(m.stat_label) + "</p>" : "") +
        '<h2 class="step__title">' + esc(m.title) + "</h2>" +
        '<p class="step__text">' + esc(m.description) + "</p>" +
        '<button class="step__img" type="button" data-open-step="' + i + '" aria-label="Open ' + esc(m.title) + ' full size">' +
          '<img src="' + esc(src(m.image)) + '" alt="' + esc(m.image_alt || m.title) + '" loading="lazy"></button>' +
        '<p class="step__links"><button class="link" type="button" data-open-step="' + i + '">Open full size' + icon("expand") + "</button>" + code + "</p>" +
      "</article>";
    }).join("");
    var stage = document.querySelector("[data-stage]");
    if (stage) {
      stage.innerHTML = maps.map(function (m, i) {
        return '<figure class="stage__item' + (i === 0 ? " is-active" : "") + '" data-i="' + i + '">' +
          '<button class="stage__btn" type="button" data-lightbox="s' + i + '" aria-label="Open ' + esc(m.title) + ' full size" tabindex="' + (i === 0 ? 0 : -1) + '">' +
          '<img src="' + esc(src(m.image)) + '" alt="' + esc(m.image_alt || m.title) + '"' + (i > 1 ? ' loading="lazy"' : "") + "></button>" +
          '<figcaption class="visually-hidden"><span class="shot__title">' + esc(m.title) + '</span><span class="shot__meta">' + esc(m.description) + "</span></figcaption></figure>";
      }).join("");
    }
    var more = list.filter(function (x) { return !x.image; });
    if (more.length) {
      el.insertAdjacentHTML("beforeend",
        '<section class="step step--more" aria-labelledby="more-work"><h2 id="more-work" class="step__title">More projects</h2><ul class="more">' +
        more.map(function (x) {
          var code = x.code ? ' <a class="link" href="' + esc(x.code) + '" target="_blank" rel="noopener">Code' + icon("arrow") + "</a>" : "";
          return '<li><p class="more__title">' + esc(x.title) + '</p><p class="more__meta">' + esc(x.description) + code + "</p></li>";
        }).join("") + "</ul></section>");
    }
  }

  function renderFinale(el, p) {
    el.innerHTML = '<div class="finale__inner" id="contact">' +
      '<h2 class="finale__title">Email me</h2>' +
      '<p class="finale__lede">For research, collaboration or a map you would like to see.</p>' +
      '<ul class="finale__mails">' + (p.emails || []).map(function (e) {
        return '<li><a href="mailto:' + esc(e) + '">' + esc(e) + "</a>" + copyBtn(e, "email address") + "</li>";
      }).join("") + "</ul>" +
      '<nav class="finale__nav" aria-label="More"><a href="about.html">About me</a><a href="research.html">Research</a><a href="gallery.html">Gallery</a><a href="fun.html">Play Pin the Place</a></nav>' +
      "</div>";
  }

  // Newest year first; items from the same year keep their CMS order.
  function newestFirst(list) {
    return list.map(function (x, i) { return { x: x, i: i }; }).sort(function (a, b) {
      var ya = parseInt(a.x.year, 10) || 0, yb = parseInt(b.x.year, 10) || 0;
      return yb - ya || a.i - b.i;
    }).map(function (o) { return o.x; });
  }

  var RENDER = {
    profile: ["profile", renderProfile, "the profile"],
    cover: ["profile", renderCover, "the profile"],
    story: ["projects", renderStory, "the map story"],
    finale: ["profile", renderFinale, "contact details"],
    research: ["research", renderResearch, "research"],
    projects: ["projects", renderProjects, "projects"],
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
    // Gentle reveal on scroll
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
      }, { rootMargin: "0px 0px -8% 0px" });
      reveals.forEach(function (el) { io.observe(el); });
    }
    setTimeout(function () { reveals.forEach(function (el) { el.classList.add("is-in"); }); }, 2500);

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

    // Filter chips (Research and Projects)
    var chips = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-cat]"));
    var empty = document.querySelector(".list-empty");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var f = chip.getAttribute("data-filter");
        chips.forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
        var shown = 0;
        items.forEach(function (it) {
          var on = f === "all" || it.getAttribute("data-cat") === f;
          it.hidden = !on;
          if (on) shown++;
        });
        if (empty) empty.hidden = shown > 0;
      });
    });

    initLightbox();
    initStory();
  }

  function initStory() {
    var steps = Array.prototype.slice.call(document.querySelectorAll(".step[data-step]"));
    var items = Array.prototype.slice.call(document.querySelectorAll(".stage__item"));
    if (!steps.length || !items.length) return;
    var activate = function (i) {
      steps.forEach(function (st, j) { st.classList.toggle("is-active", j === i); });
      items.forEach(function (it, j) {
        var on = j === i;
        it.classList.toggle("is-active", on);
        var b = it.querySelector("button"); if (b) b.tabIndex = on ? 0 : -1;
      });
    };
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) activate(Number(e.target.getAttribute("data-step"))); });
      }, { rootMargin: "-45% 0px -45% 0px" });
      steps.forEach(function (st) { io.observe(st); });
    }
    // "Open full size" in a chapter opens the matching map in the lightbox
    document.querySelectorAll("[data-open-step]").forEach(function (b) {
      b.addEventListener("click", function () {
        var t = document.querySelector('.stage__item[data-i="' + b.getAttribute("data-open-step") + '"] .stage__btn');
        if (t) t.click();
      });
    });
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
