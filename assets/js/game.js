/* Pin the Place: a Bangladesh geography game on a blank Leaflet map.
   Add a place: copy one object in PLACES. Coordinates are [latitude, longitude]. */
(function () {
  "use strict";

  var PLACES = [
    { name: "Dhaka", at: [23.8103, 90.4125], fact: "The capital of Bangladesh, on the Buriganga River." },
    { name: "Chattogram", at: [22.3569, 91.7832], fact: "Home of the busiest seaport in Bangladesh." },
    { name: "Khulna", at: [22.8456, 89.5403], fact: "The gateway city to the Sundarbans mangrove forest." },
    { name: "Rajshahi", at: [24.3745, 88.6042], fact: "On the Padma, famous for its mangoes and silk." },
    { name: "Sylhet", at: [24.8949, 91.8687], fact: "Surrounded by tea gardens and haor wetlands." },
    { name: "Barishal", at: [22.7010, 90.3535], fact: "A river city in the heart of the delta." },
    { name: "Rangpur", at: [25.7439, 89.2752], fact: "The headquarters of the northernmost division." },
    { name: "Mymensingh", at: [24.7471, 90.4203], fact: "On the banks of the Old Brahmaputra River." },
    { name: "Cox's Bazar", at: [21.4272, 92.0058], fact: "Home to one of the longest natural sea beaches in the world." },
    { name: "Pabna", at: [24.0064, 89.2372], fact: "Where I study, and where my thesis maps every tree crown in the city." },
    { name: "Cumilla", at: [23.4607, 91.1809], fact: "Close to the Mainamati Buddhist archaeological site." },
    { name: "Bogura", at: [24.8465, 89.3773], fact: "Near Mahasthangarh, one of the oldest city sites in Bangladesh." },
    { name: "Jashore", at: [23.1664, 89.2081], fact: "Close to Benapole, the busiest land port with India." },
    { name: "Dinajpur", at: [25.6217, 88.6354], fact: "Home of the terracotta Kantajew Temple." },
    { name: "Teknaf", at: [20.8624, 92.3058], fact: "The southern tip of mainland Bangladesh, on the Naf River." },
    { name: "Sreemangal", at: [24.3065, 91.7296], fact: "Often called the tea capital of Bangladesh." },
    { name: "Kuakata", at: [21.8167, 90.1206], fact: "A beach where you can watch both sunrise and sunset over the sea." },
    { name: "Saint Martin's Island", at: [20.6237, 92.3234], fact: "The only coral island of Bangladesh." },
    { name: "Rangamati", at: [22.6574, 92.1733], fact: "On Kaptai Lake in the Chittagong Hill Tracts." },
    { name: "Padma Bridge", at: [23.4460, 90.2600], fact: "The longest bridge in Bangladesh, opened in 2022." },
    { name: "Paharpur", at: [25.0311, 88.9767], fact: "Somapura Mahavihara, a UNESCO World Heritage Site." }
  ];
  var ROUNDS = 5;
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
      zoomControl: true, attributionControl: true, minZoom: 6, maxZoom: 11,
      maxBounds: [[18.5, 85.5], [28.5, 95.5]], maxBoundsViscosity: 0.8, keyboard: true
    });
    map.fitBounds(BD, { padding: [10, 10] });

    // Basemap without place names, so the map does not give the answers away
    var tiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
      maxZoom: 18, subdomains: "abcd", attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
    }).addTo(map);
    tiles.on("load", function () { el.loading.hidden = true; });
    setTimeout(function () { el.loading.hidden = true; }, 4000);

    // Country outlines bundled with the site
    fetch("assets/data/region.geojson").then(function (r) { return r.json(); }).then(function (gj) {
      L.geoJSON(gj, {
        interactive: false,
        style: function (f) {
          return f.properties.name === "Bangladesh"
            ? { color: "#0E6B58", weight: 2, fillColor: "#0E6B58", fillOpacity: 0.08 }
            : { color: "#9AA0A5", weight: 1, fillColor: "#FFFFFF", fillOpacity: 0.4 };
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
      queue = shuffle(PLACES).slice(0, ROUNDS);
      round = 0; total = 0; history = [];
      el.score.textContent = "0";
      nextRound();
    }
    function nextRound() {
      answerLayer.clearLayers();
      if (guessMarker) { map.removeLayer(guessMarker); guessMarker = null; }
      guess = null;
      el.lock.disabled = true;
      if (round >= ROUNDS) return finish();
      el.round.textContent = "Round " + (round + 1) + " of " + ROUNDS;
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
      el.next.textContent = round + 1 >= ROUNDS ? "See your score" : "Next place";
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
