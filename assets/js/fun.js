/* Map of my work: Leaflet map with a pin for every place studied, mapped or presented.
   Add a place: copy one object in PLACES. Coordinates are [latitude, longitude]. */
(function () {
  "use strict";

  var PLACES = [
    { title: "Urban tree thesis", where: "Pabna Municipality", at: [24.0064, 89.2372], zoom: 12,
      text: "Every tree crown in the city, mapped from 5 cm drone imagery and 3 m PlanetScope with deep learning.",
      link: "research.html", linkText: "Read about the thesis" },
    { title: "Groundwater, surface water and Landsat studies", where: "Pabna District", at: [24.07, 89.52], zoom: 9,
      text: "Groundwater depletion, surface water temperature and Landsat 8 harmonic modeling across the district.",
      link: "projects.html", linkText: "See the projects" },
    { title: "EFAST 2026 conference", where: "Pabna University of Science and Technology", at: [23.9993, 89.2735], zoom: 14,
      text: "Presented a paper on how armed conflict changed air quality across Iranian provinces.",
      link: "research.html", linkText: "See publications" },
    { title: "Cycling accessibility from Korail", where: "Korail, Dhaka", at: [23.7806, 90.4053], zoom: 13,
      img: "assets/img/work/korail-cycling-accessibility.webp",
      text: "Travel time by bicycle from 2,000 sampled points, routed with OpenRouteService.",
      link: "gallery.html", linkText: "Open in the gallery" },
    { title: "Land use and land cover", where: "Dhaka District", at: [23.86, 90.25], zoom: 10,
      text: "Land cover classified from Sentinel-2 imagery." },
    { title: "ICLESSD-2025 conference", where: "Jagannath University, Dhaka", at: [23.7085, 90.4113], zoom: 15,
      img: "assets/img/sabbir-portrait.webp",
      text: "Presented urban tree cover detection with UAV, remote sensing and deep learning." },
    { title: "Elevation of the Chittagong Hill Tracts", where: "Rangamati, Khagrachhari, Bandarban", at: [22.65, 92.18], zoom: 9,
      text: "Terrain mapped from ALOS World 3D 30 m elevation data." },
    { title: "Stream order of the Padma", where: "Padma River", at: [23.78, 89.72], zoom: 10,
      text: "Flow direction, flow accumulation and stream order derived from a DEM in QGIS." },
    { title: "Cyclone exposure corridor", where: "Bhola, Barishal and Patuakhali coast", at: [22.35, 90.6], zoom: 8,
      img: "assets/img/work/cyclone-tracks-bangladesh.webp",
      text: "The highest exposure zone in 55 years of cyclone tracks toward Bangladesh.",
      link: "gallery.html", linkText: "Open in the gallery" },
    { title: "Nepal flash flood, before and after", where: "Betrawati-Gerkhu, Nuwakot, Nepal", at: [27.97, 85.19], zoom: 11,
      text: "Flood damage along the river reach compared in Sentinel-2 imagery." }
  ];

  var COUNTRY_WIDE = [
    { title: "Prevailing wind, 2023", img: "assets/img/work/wind-bangladesh-2023.webp", text: "ERA5 wind with streamlines and wind roses." },
    { title: "Sea level rise simulation", text: "SRTM 30 m DEM with a bathtub inundation model." },
    { title: "Earthquake hazard", text: "Recent USGS events interpolated with IDW." },
    { title: "Crop suitability", text: "BARC data combined with weighted overlay." },
    { title: "Daily temperature maps", text: "Automated maps from Open-Meteo and BMD data." }
  ];

  function start() {
    if (!window.L) { setTimeout(start, 50); return; }
    var L = window.L;
    var el = document.getElementById("work-map");
    var list = document.getElementById("place-list");
    var coords = document.getElementById("coords");
    if (!el || !list) return;

    var BD = [[20.6, 88.0], [26.7, 92.7]];
    var map = L.map(el, { zoomControl: true, scrollWheelZoom: false, worldCopyJump: false });
    map.fitBounds(BD, { padding: [20, 20] });

    // Light basemap (CARTO Positron, OpenStreetMap data)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 18, subdomains: "abcd",
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO"
    }).addTo(map);

    // Country outlines, bundled with the site so the map reads even before tiles load
    var bdLayer = null;
    fetch("assets/data/region.geojson").then(function (r) { return r.json(); }).then(function (gj) {
      L.geoJSON(gj, {
        interactive: false,
        style: function (f) {
          var bd = f.properties.name === "Bangladesh";
          return bd
            ? { color: "#0E6B58", weight: 2, fillColor: "#0E6B58", fillOpacity: 0.06 }
            : { color: "#8A9196", weight: 1, fillColor: "#FFFFFF", fillOpacity: 0.35 };
        },
        onEachFeature: function (f, layer) { if (f.properties.name === "Bangladesh") bdLayer = layer; }
      }).addTo(map);
    }).catch(function () {});

    // Enable scroll zoom only after the visitor clicks the map
    map.on("click", function () { map.scrollWheelZoom.enable(); });
    map.on("mouseout", function () { map.scrollWheelZoom.disable(); });

    // Live coordinates
    map.on("mousemove", function (e) {
      var la = e.latlng.lat, lo = e.latlng.lng;
      coords.textContent = Math.abs(la).toFixed(3) + "°" + (la >= 0 ? "N" : "S") + "   " +
                           Math.abs(lo).toFixed(3) + "°" + (lo >= 0 ? "E" : "W");
    });

    function popupHtml(p) {
      var h = "";
      if (p.img) h += '<img class="pop__img" src="' + p.img + '" alt="">';
      h += '<p class="pop__title">' + p.title + "</p>";
      if (p.where) h += '<p class="pop__text"><b>' + p.where + "</b></p>";
      h += '<p class="pop__text">' + p.text + "</p>";
      if (p.link) h += '<a class="pop__link" href="' + p.link + '">' + p.linkText + " →</a>";
      return h;
    }

    var markers = [], buttons = [];
    function activate(i) {
      markers.forEach(function (m, j) {
        var node = m.getElement && m.getElement();
        if (node) node.firstChild.classList.toggle("is-active", i === j);
      });
      buttons.forEach(function (b, j) { b.classList.toggle("is-active", i === j); });
    }

    var head = document.createElement("p");
    head.className = "atlas__group"; head.textContent = "Places";
    list.appendChild(head);

    PLACES.forEach(function (p, i) {
      var icon = L.divIcon({ className: "", html: '<span class="pin">' + (i + 1) + "</span>", iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -14] });
      var m = L.marker(p.at, { icon: icon, title: p.title, keyboard: true })
        .bindPopup(popupHtml(p), { maxWidth: 260 })
        .addTo(map);
      m.on("click", function () { activate(i); });
      markers.push(m);

      var b = document.createElement("button");
      b.type = "button"; b.className = "place";
      b.innerHTML = '<span class="place__num">' + (i + 1) + '</span><span><span class="place__title">' + p.title +
                    '</span><br><span class="place__where">' + p.where + "</span></span>";
      b.addEventListener("click", function () {
        activate(i);
        map.flyTo(p.at, p.zoom, { duration: 1.2 });
        map.once("moveend", function () { m.openPopup(); });
      });
      list.appendChild(b);
      buttons.push(b);
    });

    var head2 = document.createElement("p");
    head2.className = "atlas__group"; head2.textContent = "Bangladesh-wide maps";
    list.appendChild(head2);
    COUNTRY_WIDE.forEach(function (p) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "place";
      b.innerHTML = '<span class="place__num place__num--wide">BD</span><span><span class="place__title">' + p.title +
                    '</span><br><span class="place__where">' + p.text + "</span></span>";
      b.addEventListener("click", function () {
        activate(-1);
        map.flyToBounds(BD, { duration: 1.2, padding: [20, 20] });
        map.once("moveend", function () {
          L.popup({ maxWidth: 260 }).setLatLng([23.7, 90.3]).setContent(popupHtml(p)).openOn(map);
        });
        if (bdLayer) {
          bdLayer.setStyle({ fillOpacity: 0.22 });
          setTimeout(function () { bdLayer.setStyle({ fillOpacity: 0.06 }); }, 1600);
        }
      });
      list.appendChild(b);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
