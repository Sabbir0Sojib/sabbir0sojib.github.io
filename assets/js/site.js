/* Md Sabbir Islam, portfolio. Shared script for every page. No dependencies. */
(function () {
  "use strict";

  /* ---------- Gentle reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }
  // never leave content hidden
  setTimeout(function () { reveals.forEach(function (el) { el.classList.add("is-in"); }); }, 2500);

  /* ---------- Copy email buttons ---------- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
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

  /* ---------- Gallery lightbox ---------- */
  var lb = document.querySelector(".lightbox");
  var triggers = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  if (lb && triggers.length && typeof lb.showModal === "function") {
    var img = lb.querySelector(".lightbox__img");
    var title = lb.querySelector(".lightbox__title");
    var meta = lb.querySelector(".lightbox__meta");
    var view = lb.querySelector(".lightbox__view");
    var orig = lb.querySelector("[data-lb-original]");
    var current = 0, lastFocus = null;

    var unzoom = function () { view.classList.remove("is-zoomed"); img.style.width = ""; };
    var show = function (i) {
      current = (i + triggers.length) % triggers.length;
      var t = triggers[current];
      var src = t.querySelector("img");
      var fig = t.closest("figure");
      img.src = src.currentSrc || src.src;
      img.alt = src.alt;
      title.textContent = fig.querySelector(".shot__title").textContent;
      meta.textContent = fig.querySelector(".shot__meta").textContent;
      orig.href = img.src;
      unzoom();
    };
    triggers.forEach(function (t, i) {
      t.addEventListener("click", function () { lastFocus = t; show(i); lb.showModal(); });
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

    // click to zoom (2x or the file's full size), click again to fit
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
