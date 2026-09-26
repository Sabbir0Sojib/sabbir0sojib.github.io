/* Satellite Detective: name a famous place from a satellite view.
   Bangladesh places come from content/places.json, world places from content/world-places.json.
   Each place has an optional "zoom" (10 = wide area, 17 = one building). Five rounds, four choices each.
   Zooming out shows more of the surroundings but lowers the points for that round: 1000, 600, 300. */
(function () {
  "use strict";

  var ROUNDS = 5;
  var POINTS = [1000, 600, 300];
  var REGIONS = {
    bd: { label: "Bangladesh", data: "content/places.json", seen: "Seen from above, somewhere in Bangladesh" },
    world: { label: "World", data: "content/world-places.json", seen: "Seen from above, somewhere in the world" }
  };
  var cache = {};

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function esc(v) { return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function getBest(id) { try { return parseInt(localStorage.getItem("detectiveBest_" + id) || "0", 10) || 0; } catch (e) { return 0; } }
  function setBest(id, v) { try { localStorage.setItem("detectiveBest_" + id, String(v)); } catch (e) {} }
  function rating(total) {
    if (total >= 4200) return "Eagle eye. You read satellite images like a remote sensing pro.";
    if (total >= 3000) return "Sharp eyes. Most places were no mystery.";
    if (total >= 1800) return "Good detective work.";
    if (total >= 800) return "Getting there. The next round will be easier.";
    return "Time to study some satellite images.";
  }

  function load(region) {
    if (cache[region]) return Promise.resolve(cache[region]);
    var ver = document.documentElement.getAttribute("data-v") || "1";
    return fetch(REGIONS[region].data + "?v=" + ver, { cache: "no-cache" }).then(function (r) { return r.json(); }).then(function (data) {
      var items = (data || []).filter(function (p) { return p && p.name && isFinite(p.lat) && isFinite(p.lng); }).map(function (p) {
        var z = Number(p.zoom);
        return { name: p.name, at: [Number(p.lat), Number(p.lng)], zoom: isFinite(z) && z >= 3 && z <= 18 ? z : 15, fact: p.fact || "" };
      });
      cache[region] = items;
      return items;
    });
  }

  function start() {
    var root = document.querySelector("[data-detective]");
    if (!root) return;
    if (!window.L) { setTimeout(start, 50); return; }
    var L = window.L;
    var $ = function (s) { return root.querySelector(s); };
    var el = {
      regions: $("[data-dregions]"), dots: $("[data-ddots]"), score: $("[data-dscore]"), round: $("[data-dround]"),
      seen: $("[data-dseen]"), choices: $("[data-dchoices]"), zoom: $("[data-dzoom]"), worth: $("[data-dworth]"),
      verdict: $("[data-dverdict]"), fact: $("[data-dfact]"), next: $("[data-dnext]"), endlevel: $("[data-dendlevel]"),
      final: $("[data-dfinal]"), rating: $("[data-drating]"), best: $("[data-dbest]"), recap: $("[data-drecap]"),
      again: $("[data-dagain]"), loading: $("[data-dloading]"), tip: $("[data-dtip]")
    };
    var stages = { ask: $('[data-dstage="ask"]'), end: $('[data-dstage="end"]') };

    var map = null, marker = null;
    function ensureMap() {
      if (map) { map.invalidateSize(); return; }
      map = L.map("detective-map", {
        zoomControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false, boxZoom: false,
        keyboard: false, touchZoom: false, tap: false, zoomSnap: 0.5
      });
      map.attributionControl.setPrefix(false);
      var esri = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 18, attribution: "Imagery &copy; Esri, Maxar, Earthstar Geographics"
      });
      var eox = L.tileLayer("https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg", {
        maxZoom: 15, attribution: "Sentinel-2 cloudless 2020 by EOX"
      });
      var loaded = 0, failed = 0, switched = false;
      esri.on("tileload", function () { loaded++; el.loading.hidden = true; });
      esri.on("tileerror", function () {
        failed++;
        if (!switched && failed >= 6 && loaded === 0) { switched = true; map.removeLayer(esri); eox.addTo(map); }
      });
      eox.on("tileload", function () { el.loading.hidden = true; });
      esri.addTo(map);
      map.setView([23.7, 90.4], 7);
      root.__map = map; // used by automated tests
      // Keep the view centred on the place when the map box changes size (window resized or moved to another screen).
      if (window.ResizeObserver) {
        var t = null;
        new ResizeObserver(function () {
          clearTimeout(t);
          t = setTimeout(function () {
            map.invalidateSize();
            var q = queue[round - (answered ? 1 : 0)];
            if (q) map.setView(q.at, answered ? Math.max(3, q.zoom - 4) : Math.max(3, q.zoom - 2 * step), { animate: false });
          }, 120);
        }).observe(document.getElementById("detective-map"));
      }
    }

    var region = "bd", queue = [], pool = [], round = 0, total = 0, step = 0, answered = false, history = [];

    el.regions.innerHTML = Object.keys(REGIONS).map(function (k) {
      return '<button class="region" type="button" role="radio" aria-checked="false" data-region="' + k + '">' + REGIONS[k].label + "</button>";
    }).join("");
    var regBtns = Array.prototype.slice.call(el.regions.querySelectorAll(".region"));
    regBtns.forEach(function (b) { b.addEventListener("click", function () { newGame(b.getAttribute("data-region")); }); });
    function markRegion() {
      regBtns.forEach(function (b) {
        var on = b.getAttribute("data-region") === region;
        b.setAttribute("aria-checked", on ? "true" : "false");
        b.classList.toggle("is-on", on);
      });
    }

    function show(stage) { Object.keys(stages).forEach(function (k) { stages[k].hidden = k !== stage; }); }
    function drawDots() {
      var html = "";
      for (var i = 0; i < ROUNDS; i++) {
        var h = history[i];
        var cls = h ? (h.pts >= 1000 ? "is-great" : h.pts > 0 ? "is-ok" : "is-miss") : (i === round && stages.end.hidden ? "is-now" : "");
        html += '<li class="' + cls + '"></li>';
      }
      el.dots.innerHTML = html;
    }
    function worth() { el.worth.textContent = POINTS[step].toLocaleString(); }

    function newGame(r) {
      region = r || region;
      markRegion();
      ensureMap();
      el.loading.hidden = false;
      el.loading.textContent = "Loading places...";
      load(region).then(function (items) {
        if (items.length < 4) { el.loading.textContent = "Not enough places for this game yet."; return; }
        pool = items;
        el.loading.hidden = true;
        queue = shuffle(items).slice(0, Math.min(ROUNDS, items.length));
        round = 0; total = 0; history = [];
        el.score.textContent = "0";
        nextRound();
      }).catch(function () { el.loading.hidden = false; el.loading.textContent = "The places could not load. Please refresh the page."; });
    }

    function nextRound() {
      if (round >= queue.length) return finish();
      var q = queue[round];
      step = 0; answered = false;
      if (marker) { map.removeLayer(marker); marker = null; }
      map.setView(q.at, q.zoom, { animate: false });
      el.round.textContent = "Round " + (round + 1) + " of " + queue.length;
      el.seen.textContent = REGIONS[region].seen;
      var others = shuffle(pool.filter(function (p) { return p.name !== q.name; })).slice(0, 3);
      var options = shuffle(others.concat([q]));
      el.choices.innerHTML = options.map(function (p) {
        return '<button class="choice" type="button" data-name="' + esc(p.name) + '">' + esc(p.name) + "</button>";
      }).join("");
      Array.prototype.forEach.call(el.choices.querySelectorAll(".choice"), function (b) {
        b.addEventListener("click", function () { answer(b); });
      });
      el.zoom.disabled = false;
      el.zoom.hidden = false;
      el.tip.hidden = false;
      el.verdict.textContent = "";
      el.fact.textContent = "";
      el.next.hidden = true;
      worth();
      show("ask"); drawDots();
    }

    function zoomOut() {
      if (answered || step >= POINTS.length - 1) return;
      step++;
      var q = queue[round];
      map.setView(q.at, Math.max(3, q.zoom - 2 * step), { animate: true });
      el.zoom.disabled = step >= POINTS.length - 1;
      worth();
    }

    function answer(btn) {
      if (answered) return;
      answered = true;
      var q = queue[round];
      var right = btn.getAttribute("data-name") === q.name;
      var pts = right ? POINTS[step] : 0;
      total += pts;
      history.push({ name: q.name, pts: pts, right: right });
      Array.prototype.forEach.call(el.choices.querySelectorAll(".choice"), function (b) {
        b.disabled = true;
        if (b.getAttribute("data-name") === q.name) b.classList.add("is-right");
        else if (b === btn) b.classList.add("is-wrong");
      });
      el.zoom.hidden = true;
      el.tip.hidden = true;
      el.verdict.innerHTML = right ? "Correct: <b>" + esc(q.name) + "</b>. +" + pts.toLocaleString() + " points"
        : "Not quite. This is <b>" + esc(q.name) + "</b>.";
      el.fact.textContent = q.fact;
      el.score.textContent = total.toLocaleString();
      marker = L.marker(q.at, {
        icon: L.divIcon({ className: "", html: '<span class="gpin gpin--answer"></span>', iconSize: [26, 26], iconAnchor: [13, 13] }),
        interactive: false, keyboard: false
      }).addTo(map).bindTooltip(q.name, { permanent: true, direction: "right", offset: [12, 0], className: "gtip" });
      map.setView(q.at, Math.max(3, q.zoom - 4), { animate: true });
      round++;
      el.next.textContent = round >= queue.length ? "See your score" : "Next place";
      el.next.hidden = false;
      drawDots();
      el.next.focus({ preventScroll: true });
    }

    function finish() {
      var best = getBest(region), isBest = total > best;
      if (isBest) setBest(region, total);
      el.endlevel.textContent = "Satellite Detective: " + REGIONS[region].label;
      el.final.textContent = total.toLocaleString();
      el.rating.textContent = rating(total);
      el.best.textContent = isBest ? "New personal best." : "Your best here: " + Math.max(best, total).toLocaleString();
      el.recap.innerHTML = history.map(function (h) {
        return "<li><span>" + esc(h.name) + "</span><span>" + (h.right ? "right" : "missed") + "</span><span>+" + h.pts + "</span></li>";
      }).join("");
      show("end"); drawDots();
      el.again.focus({ preventScroll: true });
    }

    el.zoom.addEventListener("click", zoomOut);
    el.next.addEventListener("click", nextRound);
    el.again.addEventListener("click", function () { newGame(); });

    // Start when the game is first shown (the Fun page switches between games).
    var started = false;
    root.__start = function () {
      if (started) { if (map) map.invalidateSize(); return; }
      started = true;
      newGame("bd");
    };
    var box = root.closest("[data-gamebox]");
    if (!box || !box.hidden) root.__start();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
