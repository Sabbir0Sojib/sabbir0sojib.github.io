/* Pin the Place: a geography game on an unlabeled satellite map, for Bangladesh or the whole world.
   Bangladesh: Easy (8 divisions), Medium (64 districts), Hard (544 upazilas), Landmarks (content/places.json).
   World: Countries (Natural Earth 1:110m, public domain), Wonders (content/world-places.json).
   Bangladesh boundaries: geoBoundaries gbOpen BGD ADM1 to ADM3 (source: BBS and OCHA, CC BY 3.0 IGO).
   A guess inside the right area scores 1000; otherwise points fall with distance to its border. */
(function () {
  "use strict";

  var ROUNDS = 5;
  var REGIONS = {
    bd: { label: "Bangladesh", view: [[20.6, 88.0], [26.7, 92.7]], max: [[16.5, 83.5], [30.5, 97.5]], minZoom: 5.5, zoomIn: 9 },
    world: { label: "World", view: [[-48, -160], [70, 175]], max: [[-80, -220], [84, 220]], minZoom: 1, zoomIn: 5 }
  };
  var LEVELS = [
    { id: "easy", region: "bd", label: "Easy", sub: "Divisions", file: "assets/data/bd-divisions.geojson", scale: 80 },
    { id: "medium", region: "bd", label: "Medium", sub: "Districts", file: "assets/data/bd-districts.geojson", scale: 45 },
    { id: "hard", region: "bd", label: "Hard", sub: "Upazilas", file: "assets/data/bd-upazilas.geojson", scale: 25 },
    { id: "landmarks", region: "bd", label: "Landmarks", sub: "Famous places", data: "content/places.json", scale: 60 },
    { id: "countries", region: "world", label: "Countries", sub: "167 countries", file: "assets/data/world-countries.geojson", scale: 700 },
    { id: "wonders", region: "world", label: "Wonders", sub: "Famous places", data: "content/world-places.json", scale: 400 }
  ];
  var cache = {};

  /* ---------- geometry helpers ---------- */
  function haversineKm(a, b) {
    var R = 6371, r = Math.PI / 180;
    var dLat = (b[0] - a[0]) * r, dLon = (b[1] - a[1]) * r;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function polygons(geom) { return geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates; }
  function inRing(pt, ring) { // pt = [lng, lat]
    var inside = false;
    for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      var xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
      if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }
  function inFeature(latlng, f) {
    var pt = [latlng[1], latlng[0]];
    return polygons(f.geometry).some(function (poly) {
      if (!inRing(pt, poly[0])) return false;
      for (var h = 1; h < poly.length; h++) if (inRing(pt, poly[h])) return false;
      return true;
    });
  }
  function nearestOnBorder(latlng, f) {
    var best = Infinity, at = null;
    polygons(f.geometry).forEach(function (poly) {
      poly[0].forEach(function (c) {
        var d = haversineKm(latlng, [c[1], c[0]]);
        if (d < best) { best = d; at = [c[1], c[0]]; }
      });
    });
    return { km: best, at: at };
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function rating(total, region) {
    if (region === "world") {
      if (total >= 4200) return "World explorer. You could fly without a map.";
      if (total >= 3200) return "Well travelled. Very close on most places.";
      if (total >= 2200) return "Good sense of the globe.";
      if (total >= 1200) return "Getting there. Try another round.";
      return "Time to spin the globe.";
    }
    if (total >= 4200) return "Bangladesh expert. You could draw this map from memory.";
    if (total >= 3200) return "Seasoned geographer. Very close on most places.";
    if (total >= 2200) return "Good sense of direction.";
    if (total >= 1200) return "Getting there. Try another round.";
    return "Time for a field trip.";
  }
  function getBest(id) { try { return parseInt(localStorage.getItem("pinPlaceBest_" + id) || "0", 10) || 0; } catch (e) { return 0; } }
  function setBest(id, v) { try { localStorage.setItem("pinPlaceBest_" + id, String(v)); } catch (e) {} }
  function esc(v) { return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ---------- data per level ---------- */
  function loadLevel(level) {
    if (cache[level.id]) return Promise.resolve(cache[level.id]);
    var ver = document.documentElement.getAttribute("data-v") || "1";
    var url = (level.file || level.data) + "?v=" + ver;
    return fetch(url, { cache: "no-cache" }).then(function (r) { return r.json(); }).then(function (data) {
      var items;
      if (level.id === "countries") {
        items = data.features.map(function (f) {
          var p = f.properties;
          return { name: p.n, at: [p.lat, p.lng], feature: f, hint: "A country in " + p.c,
                   fact: p.n + ", " + p.c + "." + (p.cap ? " Capital: " + p.cap + "." : "") };
        });
      } else if (level.file) {
        items = data.features.map(function (f) {
          var p = f.properties;
          var hint = level.id === "easy" ? "One of the 8 divisions"
            : level.id === "medium" ? "District in " + p.v + " Division"
            : "Upazila in " + p.d + " District, " + p.v + " Division";
          return { name: p.n, at: [p.lat, p.lng], feature: f, hint: hint,
                   fact: level.id === "easy" ? p.n + " Division" : level.id === "medium" ? p.n + " District, " + p.v + " Division" : p.n + ", " + p.d + " District, " + p.v + " Division" };
        });
      } else {
        items = (data || []).filter(function (p) { return p && p.name && isFinite(p.lat) && isFinite(p.lng); })
          .map(function (p) { return { name: p.name, at: [Number(p.lat), Number(p.lng)], feature: null, hint: level.region === "world" ? "A famous place somewhere in the world" : "A famous place in Bangladesh", fact: p.fact || "" }; });
      }
      cache[level.id] = items;
      return items;
    });
  }

  /* ---------- game ---------- */
  function start() {
    if (!window.L) { setTimeout(start, 50); return; }
    var L = window.L;
    var root = document.querySelector("[data-game]");
    if (!root) return;
    var $ = function (s) { return root.querySelector(s); };
    var stages = { ask: $('[data-stage="ask"]'), result: $('[data-stage="result"]'), end: $('[data-stage="end"]') };
    var el = {
      levels: $("[data-levels]"), dots: $("[data-dots]"), score: $("[data-score]"), round: $("[data-round]"),
      place: $("[data-place]"), hint: $("[data-hint]"), lock: $("[data-lock]"), verdict: $("[data-verdict]"),
      points: $("[data-points]"), fact: $("[data-fact]"), next: $("[data-next]"), endlevel: $("[data-endlevel]"),
      final: $("[data-final]"), rating: $("[data-rating]"), best: $("[data-best]"), recap: $("[data-recap]"),
      again: $("[data-again]"), loading: $("[data-loading]"), float: $("[data-float]"), lockFloat: $("[data-lock-float]")
    };

    var map = L.map("game-map", {
      zoomControl: true, minZoom: REGIONS.bd.minZoom, maxZoom: 14, zoomSnap: 0.25, zoomDelta: 0.5,
      maxBounds: REGIONS.bd.max, maxBoundsViscosity: 1, worldCopyJump: true
    });
    map.fitBounds(REGIONS.bd.view, { padding: [6, 6] });

    // Unlabeled satellite imagery: Esri World Imagery, with EOX Sentinel-2 cloudless as automatic fallback.
    map.attributionControl.setPrefix(false);
    var esri = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
      maxZoom: 18, attribution: "Imagery &copy; Esri, Maxar, Earthstar Geographics | Boundaries: BBS, OCHA, Natural Earth"
    });
    var eox = L.tileLayer("https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg", {
      maxZoom: 15, attribution: "Sentinel-2 cloudless 2020 by EOX | Boundaries: BBS, OCHA, Natural Earth"
    });
    var loaded = 0, failed = 0, switched = false;
    esri.on("tileload", function () { loaded++; el.loading.hidden = true; });
    esri.on("tileerror", function () {
      failed++;
      if (!switched && failed >= 6 && loaded === 0) { switched = true; map.removeLayer(esri); eox.addTo(map); }
    });
    eox.on("tileload", function () { el.loading.hidden = true; });
    esri.addTo(map);

    // Outlines: Bangladesh and its neighbours, or every country for the World levels.
    var outlines = { bd: L.layerGroup(), world: L.layerGroup() };
    fetch("assets/data/region.geojson").then(function (r) { return r.json(); }).then(function (gj) {
      L.geoJSON(gj, {
        interactive: false,
        style: function (f) {
          return f.properties.name === "Bangladesh"
            ? { color: "#FACC15", weight: 2, opacity: 0.95, fill: false }
            : { color: "#FFFFFF", weight: 1, opacity: 0.55, fill: false };
        }
      }).addTo(outlines.bd);
      el.loading.hidden = true;
    }).catch(function () {});
    var worldLoaded = false;
    function loadWorldOutlines() {
      if (worldLoaded) return;
      worldLoaded = true;
      loadLevel(LEVELS.filter(function (x) { return x.id === "countries"; })[0]).then(function (items) {
        items.forEach(function (it) { L.geoJSON(it.feature, { interactive: false, style: { color: "#FFFFFF", weight: 1, opacity: 0.45, fill: false } }).addTo(outlines.world); });
      }).catch(function () { worldLoaded = false; });
    }

    var pinIcon = function (cls) {
      return L.divIcon({ className: "", html: '<span class="gpin ' + cls + '"></span>', iconSize: [26, 26], iconAnchor: [13, 13] });
    };
    root.__map = map; // used by automated tests
    var answerLayer = L.layerGroup().addTo(map);
    var level = LEVELS[0], region = "bd", queue = [], round = 0, total = 0, guess = null, guessMarker = null, phase = "ask", history = [];
    var view = function () { return REGIONS[region].view; };

    /* region switch and level picker */
    el.levels.innerHTML =
      '<div class="regions" role="radiogroup" aria-label="Region">' + Object.keys(REGIONS).map(function (k) {
        return '<button class="region" type="button" role="radio" aria-checked="false" data-region="' + k + '">' + REGIONS[k].label + "</button>";
      }).join("") + "</div>" +
      '<div class="lvls" role="radiogroup" aria-label="Level">' + LEVELS.map(function (lv) {
        return '<button class="lvl" type="button" role="radio" aria-checked="false" data-level="' + lv.id + '" data-in="' + lv.region + '">' +
          '<span class="lvl__name">' + lv.label + '</span><span class="lvl__sub">' + lv.sub + "</span></button>";
      }).join("") + "</div>";
    var lvlBtns = Array.prototype.slice.call(el.levels.querySelectorAll(".lvl"));
    var regBtns = Array.prototype.slice.call(el.levels.querySelectorAll(".region"));
    lvlBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        var lv = LEVELS.filter(function (x) { return x.id === b.getAttribute("data-level"); })[0];
        if (lv) newGame(lv);
      });
    });
    regBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        var r = b.getAttribute("data-region");
        if (r !== region) newGame(LEVELS.filter(function (x) { return x.region === r; })[0]);
      });
    });
    function setRegion(r) {
      if (r === region && map.hasLayer(outlines[r])) return;
      region = r;
      Object.keys(outlines).forEach(function (k) { if (k === r) outlines[k].addTo(map); else map.removeLayer(outlines[k]); });
      if (r === "world") loadWorldOutlines();
      map.setMinZoom(REGIONS[r].minZoom);
      map.setMaxBounds(REGIONS[r].max);
    }
    function markLevel() {
      regBtns.forEach(function (b) {
        var on = b.getAttribute("data-region") === region;
        b.setAttribute("aria-checked", on ? "true" : "false");
        b.classList.toggle("is-on", on);
      });
      lvlBtns.forEach(function (b) {
        var on = b.getAttribute("data-level") === level.id;
        b.hidden = b.getAttribute("data-in") !== region;
        b.setAttribute("aria-checked", on ? "true" : "false");
        b.classList.toggle("is-on", on);
      });
    }

    function show(stage) {
      Object.keys(stages).forEach(function (k) { stages[k].hidden = k !== stage; });
      phase = stage;
      el.float.hidden = stage !== "ask";
    }
    function drawDots() {
      var html = "";
      for (var i = 0; i < ROUNDS; i++) {
        var h = history[i];
        var cls = h ? (h.pts >= 700 ? "is-great" : h.pts >= 250 ? "is-ok" : "is-miss") : (i === round && phase !== "end" ? "is-now" : "");
        html += '<li class="' + cls + '"></li>';
      }
      el.dots.innerHTML = html;
    }
    function setLock(on) { el.lock.disabled = !on; el.lockFloat.disabled = !on; }

    function newGame(lv) {
      level = lv || level;
      setRegion(level.region);
      markLevel();
      el.loading.hidden = false;
      el.loading.textContent = "Loading " + level.sub.toLowerCase() + "...";
      loadLevel(level).then(function (items) {
        el.loading.hidden = true;
        if (!items.length) { el.loading.hidden = false; el.loading.textContent = "No places for this level yet."; return; }
        queue = shuffle(items).slice(0, Math.min(ROUNDS, items.length));
        round = 0; total = 0; history = [];
        el.score.textContent = "0";
        nextRound();
      }).catch(function () { el.loading.hidden = false; el.loading.textContent = "This level could not load. Please refresh the page."; });
    }
    function nextRound() {
      answerLayer.clearLayers();
      if (guessMarker) { map.removeLayer(guessMarker); guessMarker = null; }
      guess = null; setLock(false);
      if (round >= queue.length) return finish();
      var q = queue[round];
      el.round.textContent = "Round " + (round + 1) + " of " + queue.length;
      el.place.textContent = q.name;
      el.hint.textContent = q.hint;
      show("ask"); drawDots();
      map.flyToBounds(view(), { padding: [6, 6], duration: 0.7 });
    }
    function placeGuess(latlng) {
      if (phase !== "ask") return;
      var w = latlng.wrap();
      guess = [w.lat, w.lng];
      if (guessMarker) guessMarker.setLatLng(latlng);
      else guessMarker = L.marker(latlng, { icon: pinIcon("gpin--guess"), interactive: false, keyboard: false }).addTo(map);
      setLock(true);
    }
    function lockIn() {
      if (!guess || phase !== "ask") return;
      var q = queue[round], km, target, inside = false;
      if (q.feature) {
        inside = inFeature(guess, q.feature);
        var nb = inside ? { km: 0, at: guess } : nearestOnBorder(guess, q.feature);
        km = nb.km; target = nb.at;
        L.geoJSON(q.feature, { interactive: false, style: { color: "#FACC15", weight: 2.5, fillColor: "#FACC15", fillOpacity: 0.28 } }).addTo(answerLayer);
      } else {
        km = haversineKm(guess, q.at); target = q.at;
        L.marker(q.at, { icon: pinIcon("gpin--answer"), interactive: false }).addTo(answerLayer);
      }
      if (!inside) L.polyline([guess, target], { color: "#FFFFFF", weight: 2.5, dashArray: "6 6", interactive: false }).addTo(answerLayer);
      var pts = inside ? 1000 : Math.round(1000 * Math.exp(-km / level.scale));
      total += pts;
      history.push({ name: q.name, km: km, pts: pts, inside: inside, guess: guess, q: q });

      var bounds = q.feature ? L.geoJSON(q.feature).getBounds().extend(guess) : L.latLngBounds([guess, q.at]);
      map.flyToBounds(bounds.pad(0.5), { maxZoom: level.id === "hard" ? 11 : REGIONS[region].zoomIn, duration: 0.9 });

      el.verdict.innerHTML = inside ? "Right inside <b>" + esc(q.name) + "</b>"
        : '<span class="game__km">' + (km < 1 ? "Less than 1" : Math.round(km).toLocaleString()) + " km</span> from " + esc(q.name);
      el.points.textContent = pts;
      el.fact.textContent = q.fact;
      el.score.textContent = total.toLocaleString();
      el.next.textContent = round + 1 >= queue.length ? "See your score" : "Next place";
      round++;
      show("result"); drawDots();
      el.next.focus({ preventScroll: true });
      if (window.matchMedia("(max-width: 900px)").matches) root.querySelector(".game__panel").scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
    function finish() {
      var best = getBest(level.id), isBest = total > best;
      if (isBest) setBest(level.id, total);
      el.endlevel.textContent = REGIONS[region].label + ": " + level.label + ", " + level.sub.toLowerCase();
      el.final.textContent = total.toLocaleString();
      el.rating.textContent = rating(total, region);
      el.best.textContent = isBest ? "New personal best for this level." : "Your best on this level: " + Math.max(best, total).toLocaleString();
      el.recap.innerHTML = history.map(function (h) {
        return "<li><span>" + esc(h.name) + "</span><span>" + (h.inside ? "inside" : Math.round(h.km) + " km") + "</span><span>+" + h.pts + "</span></li>";
      }).join("");
      answerLayer.clearLayers();
      if (guessMarker) { map.removeLayer(guessMarker); guessMarker = null; }
      history.forEach(function (h) {
        if (h.q.feature) L.geoJSON(h.q.feature, { interactive: false, style: { color: "#FACC15", weight: 2, fillColor: "#FACC15", fillOpacity: 0.22 } }).addTo(answerLayer);
        else L.marker(h.q.at, { icon: pinIcon("gpin--answer"), interactive: false }).addTo(answerLayer);
        L.marker(h.guess, { icon: pinIcon("gpin--guess"), interactive: false }).addTo(answerLayer)
          .bindTooltip(h.name, { permanent: true, direction: "right", offset: [10, 0], className: "gtip" });
      });
      map.flyToBounds(view(), { padding: [6, 6], duration: 0.9 });
      show("end"); drawDots();
      el.again.focus({ preventScroll: true });
    }

    map.on("click", function (e) { placeGuess(e.latlng); });
    document.getElementById("game-map").addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.id === "game-map") { e.preventDefault(); placeGuess(map.getCenter()); }
    });
    el.lock.addEventListener("click", lockIn);
    el.lockFloat.addEventListener("click", lockIn);
    el.next.addEventListener("click", nextRound);
    el.again.addEventListener("click", function () { newGame(); });

    root.__refit = function () { map.invalidateSize(); if (phase === "ask") map.fitBounds(view(), { padding: [6, 6] }); };
    root.__newGame = function (id) { newGame(LEVELS.filter(function (x) { return x.id === id; })[0]); }; // for tests
    newGame(LEVELS[0]);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
