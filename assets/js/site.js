/* Md Sabbir Islam, portfolio. Plain JavaScript, no dependencies. */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Theme switch ---------- */
  var themeBtn = document.querySelector("[data-theme-toggle]");
  var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set === "light" || set === "dark") return set;
    return darkQuery.matches ? "dark" : "light";
  }
  function syncThemeLabel() {
    if (!themeBtn) return;
    themeBtn.setAttribute("aria-label", currentTheme() === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncThemeLabel();
    });
    syncThemeLabel();
    if (darkQuery.addEventListener) darkQuery.addEventListener("change", syncThemeLabel);
  }

  /* ---------- Active layer (scroll spy) ---------- */
  var layerLinks = Array.prototype.slice.call(document.querySelectorAll(".layer"));
  var statusLayer = document.querySelector("[data-status-layer]");
  var sections = layerLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  function setActive(id) {
    layerLinks.forEach(function (a) {
      var on = a.getAttribute("href") === "#" + id;
      if (on) {
        a.setAttribute("aria-current", "true");
        if (statusLayer) statusLayer.textContent = a.textContent.replace(/\d+$/, "").trim();
        // keep the active chip visible in the mobile strip
        var strip = a.closest(".layers");
        if (strip && strip.scrollWidth > strip.clientWidth) {
          var left = a.offsetLeft - 12;
          strip.scrollTo({ left: left, behavior: "smooth" });
        }
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var visible = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });
      // the topmost section that occupies the reading band wins
      for (var i = 0; i < sections.length; i++) {
        if (visible[sections[i].id] > 0) { setActive(sections[i].id); break; }
      }
    }, { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.01, 0.5, 1] });
    sections.forEach(function (s) { spy.observe(s); });
  }
  setActive("about");

  /* ---------- Coordinate probe ----------
     data-geo = "x0,y0,lon0,lat0,degX,degY,frameL,frameT,frameR,frameB"
     All values are fractions of the image width/height, measured from each
     map's own graticule, so a sharper replacement image with the same
     layout keeps working. */
  var statusCoord = document.querySelector("[data-status-coord]");
  var statusBar = document.querySelector(".statusbar");

  function parseGeo(str) {
    if (!str) return null;
    var v = str.split(",").map(Number);
    if (v.length !== 10 || v.some(isNaN)) return null;
    return { x0: v[0], y0: v[1], lon0: v[2], lat0: v[3], degX: v[4], degY: v[5], l: v[6], t: v[7], r: v[8], b: v[9] };
  }
  function fmt(lon, lat) {
    return Math.abs(lon).toFixed(2) + "°" + (lon >= 0 ? "E" : "W") + "  " +
           Math.abs(lat).toFixed(2) + "°" + (lat >= 0 ? "N" : "S");
  }

  function attachProbe(view, getGeo, readout) {
    var img = view.querySelector("img");
    var probe = view.querySelector(".probe");
    var px = probe && probe.querySelector(".probe__x");
    var py = probe && probe.querySelector(".probe__y");
    var idle = readout ? readout.textContent : "";

    function move(ev) {
      var geo = getGeo();
      var rect = img.getBoundingClientRect();
      var fx = (ev.clientX - rect.left) / rect.width;
      var fy = (ev.clientY - rect.top) / rect.height;
      if (fx < 0 || fx > 1 || fy < 0 || fy > 1) return leave();
      var vr = view.getBoundingClientRect();
      if (px && py) {
        view.classList.add("is-probing");
        px.style.transform = "translateY(" + (ev.clientY - vr.top) + "px)";
        py.style.transform = "translateX(" + (ev.clientX - vr.left) + "px)";
      }
      if (!geo) return;
      var text;
      if (fx < geo.l || fx > geo.r || fy < geo.t || fy > geo.b) {
        text = "Outside map frame";
        if (readout) readout.classList.remove("is-live");
      } else {
        var lon = geo.lon0 + (fx - geo.x0) / geo.degX;
        var lat = geo.lat0 + (geo.y0 - fy) / geo.degY;
        text = fmt(lon, lat);
        if (readout) readout.classList.add("is-live");
      }
      if (readout) readout.textContent = text;
      if (statusCoord) statusCoord.textContent = text;
      if (statusBar) statusBar.classList.add("is-live");
    }
    function leave() {
      view.classList.remove("is-probing");
      if (readout) { readout.textContent = idle; readout.classList.remove("is-live"); }
      if (statusCoord) statusCoord.textContent = "Lon, Lat";
      if (statusBar) statusBar.classList.remove("is-live");
    }
    view.addEventListener("pointermove", move);
    view.addEventListener("pointerleave", leave);
    return { reset: function (t) { idle = t; leave(); } };
  }

  // Touch screens have no hover: tapping opens the viewer, where dragging probes.
  var touchOnly = window.matchMedia("(hover: none)").matches;
  if (touchOnly) {
    Array.prototype.slice.call(document.querySelectorAll(".canvas .mapframe[data-geo] .readout")).forEach(function (r) {
      r.textContent = "Tap to open";
    });
  }

  Array.prototype.slice.call(document.querySelectorAll(".canvas .mapframe")).forEach(function (fig) {
    var view = fig.querySelector(".mapframe__view");
    if (!view) return;
    var geo = parseGeo(fig.getAttribute("data-geo"));
    attachProbe(view, function () { return geo; }, fig.querySelector(".readout"));
  });

  /* ---------- Map slideshow ---------- */
  var viewerEl = document.querySelector(".viewer");
  var stage = document.querySelector("[data-slideshow]");
  if (stage) {
    var slides = Array.prototype.slice.call(stage.querySelectorAll(".slide"));
    var thumbs = Array.prototype.slice.call(stage.querySelectorAll(".thumb"));
    var DURATION = 6500;
    var idx = 0, elapsed = 0, last = null, hovering = false, focusInside = false;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var go = function (n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (sl, i) {
        var on = i === idx;
        sl.classList.toggle("is-active", on);
        sl.setAttribute("aria-hidden", on ? "false" : "true");
        var btn = sl.querySelector(".mapframe__view");
        if (btn) btn.tabIndex = on ? 0 : -1;
      });
      thumbs.forEach(function (t, i) {
        var on = i === idx;
        t.classList.toggle("is-active", on);
        if (on) t.setAttribute("aria-current", "true"); else t.removeAttribute("aria-current");
        t.style.setProperty("--progress", "0");
      });
      elapsed = 0;
    };
    thumbs.forEach(function (t, i) { t.addEventListener("click", function () { go(i); }); });
    stage.addEventListener("pointerenter", function () { hovering = true; });
    stage.addEventListener("pointerleave", function () { hovering = false; });
    stage.addEventListener("focusin", function () { focusInside = true; });
    stage.addEventListener("focusout", function () { focusInside = false; });
    go(0);

    if (!reduceMotion && slides.length > 1) {
      var tick = function (ts) {
        if (last === null) last = ts;
        var dt = Math.min(ts - last, 100);
        last = ts;
        var paused = hovering || focusInside || document.hidden || (viewerEl && viewerEl.open);
        if (!paused) {
          elapsed += dt;
          thumbs[idx].style.setProperty("--progress", Math.min(1, elapsed / DURATION).toFixed(4));
          if (elapsed >= DURATION) go(idx + 1);
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }

  /* ---------- Full-size viewer ---------- */
  var viewer = document.querySelector(".viewer");
  var maps = {
    cyclone: document.getElementById("fig-cyclone"),
    wind: document.getElementById("fig-wind"),
    korail: document.getElementById("fig-korail")
  };
  var order = ["cyclone", "wind", "korail"];

  if (viewer && typeof viewer.showModal === "function") {
    var vImg = viewer.querySelector(".viewer__img");
    var vTitle = viewer.querySelector(".viewer__title");
    var vMeta = viewer.querySelector(".viewer__meta");
    var vRead = viewer.querySelector(".readout");
    var vView = viewer.querySelector(".viewer__view");
    var vGeo = null;
    var current = 0;
    var lastFocus = null;
    var probe = attachProbe(vView, function () { return vGeo; }, vRead);
    var vOrig = viewer.querySelector("[data-viewer-original]");

    // Click the map to zoom in (at least 2x, or the file's full resolution), click again to fit.
    function unzoom() { vView.classList.remove("is-zoomed"); vImg.style.width = ""; }
    vView.addEventListener("click", function (ev) {
      if (vView.classList.contains("is-zoomed")) { unzoom(); return; }
      var rect = vImg.getBoundingClientRect();
      var fx = (ev.clientX - rect.left) / rect.width;
      var fy = (ev.clientY - rect.top) / rect.height;
      var w = Math.max(vImg.naturalWidth, rect.width * 2);
      vView.classList.add("is-zoomed");
      vImg.style.width = w + "px";
      var h = w * rect.height / rect.width;
      vView.scrollLeft = fx * w - vView.clientWidth / 2;
      vView.scrollTop = fy * h - vView.clientHeight / 2;
    });

    var show = function (key) {
      var fig = maps[key];
      if (!fig) return;
      current = order.indexOf(key);
      var img = fig.querySelector("img");
      vImg.src = img.currentSrc || img.src;
      vImg.alt = img.alt;
      vTitle.textContent = fig.querySelector(".mapframe__title").textContent;
      vMeta.textContent = fig.querySelector(".mapframe__meta").textContent;
      vGeo = parseGeo(fig.getAttribute("data-geo"));
      unzoom();
      if (vOrig) vOrig.href = img.currentSrc || img.src;
      probe.reset(vGeo ? (touchOnly ? "Drag on the map" : "Hover the map") : "Projected map, no graticule");
    };

    document.addEventListener("click", function (ev) {
      var trigger = ev.target.closest("[data-open]");
      if (!trigger) return;
      ev.preventDefault();
      lastFocus = trigger;
      show(trigger.getAttribute("data-open"));
      viewer.showModal();
    });
    viewer.querySelector("[data-viewer-close]").addEventListener("click", function () { viewer.close(); });
    viewer.querySelector("[data-viewer-prev]").addEventListener("click", function () {
      show(order[(current - 1 + order.length) % order.length]);
    });
    viewer.querySelector("[data-viewer-next]").addEventListener("click", function () {
      show(order[(current + 1) % order.length]);
    });
    viewer.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowLeft") show(order[(current - 1 + order.length) % order.length]);
      if (ev.key === "ArrowRight") show(order[(current + 1) % order.length]);
    });
    // click on the backdrop closes
    viewer.addEventListener("click", function (ev) { if (ev.target === viewer) viewer.close(); });
    viewer.addEventListener("close", function () { unzoom(); if (lastFocus) lastFocus.focus(); });
  }

  /* ---------- Copy email ---------- */
  Array.prototype.slice.call(document.querySelectorAll("[data-copy]")).forEach(function (btn) {
    var label = btn.querySelector(".copy__label");
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function () {
        btn.classList.add("is-copied");
        if (label) label.textContent = "Copied";
        setTimeout(function () {
          btn.classList.remove("is-copied");
          if (label) label.textContent = "Copy";
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
      } else { fallbackCopy(text); done(); }
    });
  });
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", "");
    ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }
})();
