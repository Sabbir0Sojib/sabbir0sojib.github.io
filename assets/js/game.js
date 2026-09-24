/* Pin the Place: a Bangladesh geography game on a blank Leaflet map.
   Places come from content/places.json (name, lat, lng, fact). */
(function () {
  "use strict";

  var PLACES = []; // loaded from content/places.json
  var ROUNDS = 5; // capped by the number of places
  var BD = [[20.4, 87.9], [26.8, 92.8]];

  function haversineKm(a, b) {
    var R = 6371, toRad = Math.PI / 180;
    var dLat = (b[0] - a[0]) * toRad, dLon = (b[1] - a[1]) * toRad;
    var h = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(a[0] * toRad) * Math.cos(b[0] * toRad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  function pointsFor(km) { return Math.round(1000 * Math.exp(-km / 75)); }
  function rating(total) {
    if (total >= 4200) return "Bangladesh expert. You could draw this map from memory.";
    if (total >= 3200) return "Seasoned geographer. Very close on most places.";
    if (total >= 2200) return "Good sense of direction.";
    if (total >= 1200) return "Getting there. Try another round.";
    return "Time for a field trip.";
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function getBest() { try { return parseInt(localStorage.getItem("pinPlaceBest") || "0", 10) || 0; } catch (e) { return 0; } }
  function setBest(v) { try { localStorage.setItem("pinPlaceBest", String(v)); } catch (e) {} }

  function start() {
    if (!window.L) { setTimeout(start, 50); return; }
    if (!PLACES.length) {
      var ver = document.documentElement.getAttribute("data-v") || "1";
      fetch("content/places.json?v=" + ver, { cache: "no-cache" })
        .then(function (r) { return r.json(); })
        .then(function (list) {
          PLACES = list.filter(function (p) { return p && p.name && isFinite(p.lat) && isFinite(p.lng); })
            .map(function (p) { return { name: p.name, at: [Number(p.lat), Number(p.lng)], fact: p.fact || "" }; });
          if (PLACES.length) start();
          else { var l = document.querySelector("[data-loading]"); if (l) l.textContent = "No places to play yet."; }
        })
        .catch(function () { var l = document.querySelector("[data-loading]"); if (l) l.textContent = "The game could not load. Please refresh the page."; });
      return;
    }
    var L = window.L;
    var root = document.querySelector("[data-game]");
    if (!root) return;
    var $ = function (sel) { return root.querySelector(sel); };
    var stages = { ask: $('[data-stage="ask"]'), result: $('[data-stage="result"]'), end: $('[data-stage="end"]') };
    var el = { round: $("[data-round]"), score: $("[data-score]"), place: $("[data-place]"), lock: $("[data-lock]"),
               distance: $("[data-distance]"), points: $("[data-points]"), fact: $("[data-fact]"), next: $("[data-next]"),
               final: $("[data-final]"), rating: $("[data-rating]"), best: $("[data-best]"), recap: $("[data-recap]"),
               again: $("[data-again]"), loading: $("[data-loading]") };

    var map = L.map("game-map", {
      zoomControl: true, attributionControl: true, minZoom: 5.5, maxZoom: 10, zoomSnap: 0.25, zoomDelta: 0.5,
      maxBounds: [[16.5, 83.5], [30.5, 97.5]], maxBoundsViscosity: 1, keyboard: true
    });
    map.fitBounds(BD, { padding: [6, 6] });

    // No tile service: the map is drawn from bundled Natural Earth outlines, so it has
    // no place names to give answers away and needs no API key.
    map.attributionControl.setPrefix(false);
    map.attributionControl.addAttribution("Boundaries: Natural Earth");
    // Country outlines bundled with the site
    fetch("assets/data/region.geojson").then(function (r) { return r.json(); }).then(function (gj) {
      L.geoJSON(gj, {
        interactive: false,
        style: function (f) {
          return f.properties.name === "Bangladesh"
            ? { color: "#0E6B58", weight: 1.6, fillColor: "#E6F0EC", fillOpacity: 1 }
            : { color: "#B9C0C4", weight: 0.8, fillColor: "#F6F6F3", fillOpacity: 1 };
        }
      }).addTo(map);
      el.loading.hidden = true;
    }).catch(function () { el.loading.textContent = "The map outline could not load. Please refresh the page."; });

    var pinIcon = function (cls, label) {
      return L.divIcon({ className: "", html: '<span class="gpin ' + cls + '">' + (label || "") + "</span>", iconSize: [26, 26], iconAnchor: [13, 13] });
    };

    var queue = [], round = 0, total = 0, guess = null, guessMarker = null, answerLayer = L.layerGroup().addTo(map), phase = "ask", history = [];

    function show(stage) {
      Object.keys(stages).forEach(function (k) { stages[k].hidden = k !== stage; });
      phase = stage;
    }
    function newGame() {
      queue = shuffle(PLACES).slice(0, Math.min(ROUNDS, PLACES.length));
      round = 0; total = 0; history = [];
      el.score.textContent = "0";
      nextRound();
    }
    function nextRound() {
      answerLayer.clearLayers();
      if (guessMarker) { map.removeLayer(guessMarker); guessMarker = null; }
      guess = null;
      el.lock.disabled = true;
      if (round >= queue.length) return finish();
      el.round.textContent = "Round " + (round + 1) + " of " + queue.length;
      el.place.textContent = queue[round].name;
      show("ask");
      map.flyToBounds(BD, { padding: [10, 10], duration: 0.8 });
    }
    function placeGuess(latlng) {
      if (phase !== "ask") return;
      guess = [latlng.lat, latlng.lng];
      if (guessMarker) guessMarker.setLatLng(latlng);
      else guessMarker = L.marker(latlng, { icon: pinIcon("gpin--guess"), keyboard: false, interactive: false }).addTo(map);
      el.lock.disabled = false;
    }
    function lockIn() {
      if (!guess) return;
      var target = queue[round];
      var km = haversineKm(guess, target.at);
      var pts = pointsFor(km);
      total += pts;
      history.push({ name: target.name, km: km, pts: pts, guess: guess, at: target.at });

      L.polyline([guess, target.at], { color: "#17191C", weight: 2, dashArray: "6 6", interactive: false }).addTo(answerLayer);
      L.marker(target.at, { icon: pinIcon("gpin--answer"), interactive: false }).addTo(answerLayer);
      map.flyToBounds(L.latLngBounds([guess, target.at]).pad(0.6), { maxZoom: 9, duration: 0.9 });

      el.distance.textContent = km < 1 ? "Less than 1" : Math.round(km).toLocaleString();
      el.points.textContent = pts;
      el.fact.textContent = target.name + ": " + target.fact;
      el.score.textContent = total.toLocaleString();
      el.next.textContent = round + 1 >= queue.length ? "See your score" : "Next place";
      show("result");
      round++;
      el.next.focus();
    }
    function finish() {
      var best = getBest();
      var isBest = total > best;
      if (isBest) setBest(total);
      el.final.textContent = total.toLocaleString();
      el.rating.textContent = rating(total);
      el.best.textContent = isBest ? "New personal best on this device." : "Your best: " + Math.max(best, total).toLocaleString();
      el.recap.innerHTML = "";
      history.forEach(function (h) {
        var li = document.createElement("li");
        li.innerHTML = "<span>" + h.name + "</span><span>" + Math.round(h.km) + " km</span><span>+" + h.pts + "</span>";
        el.recap.appendChild(li);
      });
      // recap on the map: every guess, answer and the line between them
      answerLayer.clearLayers();
      if (guessMarker) { map.removeLayer(guessMarker); guessMarker = null; }
      history.forEach(function (h) {
        L.polyline([h.guess, h.at], { color: "#17191C", weight: 1.5, dashArray: "5 6", interactive: false }).addTo(answerLayer);
        L.marker(h.guess, { icon: pinIcon("gpin--guess"), interactive: false }).addTo(answerLayer);
        L.marker(h.at, { icon: pinIcon("gpin--answer"), interactive: false }).addTo(answerLayer)
          .bindTooltip(h.name, { permanent: true, direction: "right", offset: [10, 0], className: "gtip" });
      });
      map.flyToBounds(BD, { padding: [10, 10], duration: 0.9 });
      el.round.textContent = "Game over";
      show("end");
      el.again.focus();
    }

    map.on("click", function (e) { placeGuess(e.latlng); });
    document.getElementById("game-map").addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.id === "game-map") { e.preventDefault(); placeGuess(map.getCenter()); }
    });
    el.lock.addEventListener("click", lockIn);
    el.next.addEventListener("click", nextRound);
    el.again.addEventListener("click", newGame);

    newGame();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
