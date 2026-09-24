# Page generator for sabbir0sojib.github.io. Run: python3 .impeccable/build-pages.py
import os
OUT = "/home/user/sabbir0sojib.github.io"
VER = "20260924c"   # bump to force browsers to load new CSS/JS
NAV = [("index.html","Profile"),("research.html","Research"),("projects.html","Projects"),("gallery.html","Gallery"),("fun.html","Fun")]
CUR = ' aria-current="page"'
ORCID = "https://orcid.org/0009-0001-9474-9287"
def icon(n, cls="i"): return f'<svg class="{cls}" aria-hidden="true"><use href="assets/icons.svg?v={VER}#{n}"/></svg>'
ARROW = icon("arrow")

def page(fname, title, desc, body, extra_head="", extra_js=""):
    nav = "\n".join(f'          <a href="{h}"{CUR if h==fname else ""}>{t}</a>' for h,t in NAV)
    return f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <meta name="author" content="Md Sabbir Islam">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:image" content="https://sabbir0sojib.github.io/assets/img/sabbir-portrait.jpg">
  <meta name="theme-color" content="#FCFCFB">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="assets/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>
{extra_head}  <link rel="stylesheet" href="assets/css/site.css?v={VER}">
  <script>document.documentElement.classList.add("js");</script>
  <script src="assets/js/site.js?v={VER}" defer></script>
{extra_js}</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-head">
    <div class="wrap site-head__row">
      <a class="brand" href="index.html">Md Sabbir Islam</a>
      <nav class="nav" aria-label="Main">
{nav}
      </nav>
    </div>
  </header>

  <main id="main">
{body}
  </main>

  <footer class="site-foot">
    <div class="wrap site-foot__row">
      <p>&copy; 2026 Md Sabbir Islam. Pabna University of Science and Technology, Bangladesh.</p>
      <p class="site-foot__links">
        <a class="icon-btn" href="mailto:mdsabbirislam820@gmail.com" aria-label="Email">{icon("envelope")}</a>
        <a class="icon-btn" href="{ORCID}" target="_blank" rel="me noopener" aria-label="ORCID">{icon("orcid")}</a>
        <a class="icon-btn" href="https://www.linkedin.com/in/sabbir-sojib/" target="_blank" rel="me noopener" aria-label="LinkedIn">{icon("linkedin")}</a>
        <a class="icon-btn" href="https://github.com/Sabbir0Sojib" target="_blank" rel="me noopener" aria-label="GitHub">{icon("github")}</a>
      </p>
    </div>
  </footer>
</body>
</html>
'''
def write(f, s): open(os.path.join(OUT, f), "w").write(s)

def chips(label, items):
    b = "\n".join(f'        <button class="chip" type="button" data-filter="{k}" aria-pressed="{"true" if i==0 else "false"}">{t}</button>' for i,(k,t) in enumerate(items))
    return f'      <div class="chips" role="toolbar" aria-label="{label}">\n{b}\n      </div>'

LIGHTBOX = f'''    <dialog class="lightbox" aria-labelledby="lb-title">
      <div class="lightbox__bar">
        <p id="lb-title" class="lightbox__title"></p>
        <div class="lightbox__tools">
          <a class="icon-btn" data-lb-original href="#" target="_blank" rel="noopener" aria-label="Open original image">{icon("arrow")}</a>
          <button class="icon-btn" type="button" data-lb-prev aria-label="Previous">{icon("prev")}</button>
          <button class="icon-btn" type="button" data-lb-next aria-label="Next">{icon("next")}</button>
          <button class="icon-btn" type="button" data-lb-close aria-label="Close">{icon("close")}</button>
        </div>
      </div>
      <div class="lightbox__view"><img class="lightbox__img" src="assets/img/work/cyclone-tracks-bangladesh.webp" alt=""></div>
      <p class="lightbox__meta"></p>
    </dialog>'''

# ======================= PROFILE =======================
profile = f'''    <div class="wrap">
      <section class="intro" aria-labelledby="name">
        <div class="intro__text reveal">
          <h1 id="name" class="intro__name">Md Sabbir Islam</h1>
          <p class="intro__role">Remote Sensing and Geospatial Deep Learning</p>
          <p class="intro__bio">I map Bangladesh from the air and from space. I pair drone imagery with satellite data and deep learning, and I build maps of cyclones, floods, groundwater and heat in Python, with the code open on GitHub.</p>
          <dl class="facts">
            <div><dt>Studying</dt><dd>B.Sc. (Honours) Geography and Environment, Pabna University of Science and Technology</dd></div>
            <div><dt>Lab</dt><dd>Geospatial Lab of Environment and Disaster</dd></div>
            <div><dt>Focus</dt><dd>UAV and satellite deep learning, hazard mapping</dd></div>
            <div><dt>Based in</dt><dd>Pabna, Bangladesh</dd></div>
          </dl>
          <div class="btn-row">
            <a class="btn btn--primary" href="#contact">{icon("envelope")}Email me</a>
            <a class="btn" href="{ORCID}" target="_blank" rel="me noopener">{icon("orcid")}ORCID</a>
            <a class="btn" href="https://www.linkedin.com/in/sabbir-sojib/" target="_blank" rel="me noopener">{icon("linkedin")}LinkedIn</a>
            <a class="btn" href="https://github.com/Sabbir0Sojib" target="_blank" rel="me noopener">{icon("github")}GitHub</a>
          </div>
        </div>
        <picture>
          <source srcset="assets/img/sabbir-portrait.webp" type="image/webp">
          <img class="intro__photo" src="assets/img/sabbir-portrait.jpg" width="640" height="800"
               alt="Md Sabbir Islam at the ICLESSD-2025 conference, Jagannath University, Dhaka">
        </picture>
      </section>

      <section class="block reveal" aria-labelledby="interests">
        <h2 id="interests" class="block__title">Research interests</h2>
        <ul class="tags">
          <li class="tag">Geospatial deep learning</li>
          <li class="tag">Object detection</li>
          <li class="tag">UAV and satellite data fusion</li>
          <li class="tag">Tree crown delineation</li>
          <li class="tag">Above-ground biomass</li>
          <li class="tag">Land use and land cover change</li>
          <li class="tag">Spatial statistics</li>
          <li class="tag">Hazard and risk mapping</li>
          <li class="tag">Environmental monitoring</li>
        </ul>
      </section>

      <section class="block reveal" aria-labelledby="experience">
        <h2 id="experience" class="block__title">Education and experience</h2>
        <ol class="timeline">
          <li class="timeline__item">
            <p class="timeline__when">2025 to present</p>
            <div>
              <h3 class="timeline__role">Undergraduate Thesis Researcher</h3>
              <p class="timeline__org">Geospatial Lab of Environment and Disaster, Pabna University of Science and Technology. Supervised by D. Eng. Md Rahedul Islam, Professor.</p>
            </div>
          </li>
          <li class="timeline__item">
            <p class="timeline__when">2025</p>
            <div>
              <h3 class="timeline__role">Field Data Collector, CH4Rice Project</h3>
              <p class="timeline__org">In collaboration with the JAXA Earth Observation Research Center and the Institute of Industrial Science, University of Tokyo.</p>
            </div>
          </li>
          <li class="timeline__item">
            <p class="timeline__when">Final result awaited</p>
            <div>
              <h3 class="timeline__role">B.Sc. (Honours) in Geography and Environment</h3>
              <p class="timeline__org">Pabna University of Science and Technology. CGPA 3.56 / 4.00 across seven semesters; coursework completed.</p>
            </div>
          </li>
        </ol>
      </section>

      <section class="block reveal" aria-labelledby="skills">
        <h2 id="skills" class="block__title">Skills</h2>
        <dl class="skills">
          <div><dt>Deep learning</dt><dd>PyTorch, SegFormer, U-Net, DeepLabV3+, Mask2Former, YOLO, Mask R-CNN</dd></div>
          <div><dt>Remote sensing</dt><dd>Google Earth Engine, SNAP, Rasterio, GDAL, ArcGIS, QGIS</dd></div>
          <div><dt>Satellite data</dt><dd>PlanetScope SuperDove, Sentinel-1, Sentinel-2, Landsat, MODIS</dd></div>
          <div><dt>UAV</dt><dd>DJI platforms, Agisoft Metashape, Pix4D, point cloud processing</dd></div>
          <div><dt>Spatial statistics</dt><dd>Moran's I, Getis-Ord Gi*, kernel density estimation, hotspot analysis</dd></div>
          <div><dt>Programming</dt><dd>Python, R, JavaScript for Earth Engine, Git, LaTeX</dd></div>
        </dl>
      </section>

      <section class="block reveal two-col" aria-label="Awards and languages">
        <div>
          <h2 class="block__title">Awards</h2>
          <ul class="plain-list">
            <li><span class="mono">2023</span>Top 8 Team, FOREWARN Disaster Hackathon 1.0</li>
            <li><span class="mono">2023</span>Runners-up, 6th Interdepartmental Language Debate, Pabna University of Science and Technology</li>
          </ul>
        </div>
        <div>
          <h2 class="block__title">Languages</h2>
          <ul class="plain-list">
            <li>Bengali, native</li>
            <li>English, professional working proficiency</li>
          </ul>
        </div>
      </section>

      <section id="contact" class="block reveal" aria-labelledby="contact-title">
        <h2 id="contact-title" class="block__title">Contact</h2>
        <ul class="contact-rows">
          <li class="contact-row">
            <a href="mailto:mdsabbirislam820@gmail.com">mdsabbirislam820@gmail.com</a>
            <button class="copy" type="button" data-copy="mdsabbirislam820@gmail.com" aria-label="Copy Gmail address">{icon("copy","i i--copy")}{icon("check","i i--check")}<span class="copy__label">Copy</span></button>
          </li>
          <li class="contact-row">
            <a href="mailto:sabbir.210908@s.pust.ac.bd">sabbir.210908@s.pust.ac.bd</a>
            <button class="copy" type="button" data-copy="sabbir.210908@s.pust.ac.bd" aria-label="Copy university email address">{icon("copy","i i--copy")}{icon("check","i i--check")}<span class="copy__label">Copy</span></button>
          </li>
          <li class="contact-row">
            <a href="{ORCID}" target="_blank" rel="me noopener">orcid.org/0009-0001-9474-9287</a>
            <button class="copy" type="button" data-copy="0009-0001-9474-9287" aria-label="Copy ORCID iD">{icon("copy","i i--copy")}{icon("check","i i--check")}<span class="copy__label">Copy</span></button>
          </li>
        </ul>
      </section>
    </div>'''
write("index.html", page("index.html","Md Sabbir Islam | Remote Sensing and Geospatial Deep Learning",
  "Md Sabbir Islam, Geography and Environment researcher at Pabna University of Science and Technology. UAV and satellite deep learning, and maps of Bangladesh.", profile))

# ======================= RESEARCH (story rows) =======================
def row(cat, kind, year, title, authors, venue, note="", status="", done=False):
    st = f'<span class="status{" status--done" if done else ""}">{status}</span>' if status else ""
    n = f'\n            <p class="story__note">{note}</p>' if note else ""
    return f'''          <li class="story" data-cat="{cat}">
            <p class="story__kind"><span class="mono">{year}</span>{kind}{st}</p>
            <h2 class="story__title">{title}</h2>
            <p class="story__byline">{authors}</p>
            <p class="story__venue">{venue}</p>{n}
          </li>'''
research = f'''    <div class="wrap">
      <header class="page-head">
        <h1 class="page-head__title">Research</h1>
        <p class="page-head__lede">Papers, manuscripts and field work, newest first.</p>
      </header>
{chips("Filter research by type", [("all","All"),("journal","Journal manuscripts"),("conference","Conference papers"),("field","Field work")])}
      <!-- Add research: copy one <li class="story"> block. data-cat is journal, conference or field. -->
      <ol class="stories">
{row("journal","Journal manuscript","2026","Characterization of Urban Trees with Deep Learning Techniques in Pabna Municipality","<b>Islam, M.S.</b>, and Islam, M.R.","Undergraduate thesis, Geospatial Lab of Environment and Disaster, Pabna University of Science and Technology","Tree crowns delineated from 5 cm UAV imagery with deep learning, then scaled to 3 m PlanetScope imagery to map canopy, biomass and carbon across the city.","Under review")}
{row("journal","Journal manuscript","2026","Spatio-temporal Patterns of Lightning Events and Associated Casualties in Bangladesh: Linkages with Land Use and Land Cover","Ali, M.Y., <b>Islam, M.S.</b>, and Islam, M.R.","Submitted to a peer-reviewed journal","","Under review")}
{row("conference","Conference paper","2026","Impact of Armed Conflict on Ambient Air Quality: A Multi-Pollutant Spatiotemporal Analysis Across Iranian Provinces, 2022 to 2026","<b>Islam, M.S.</b>, Ali, M.Y., and Islam, M.R.","International Conference on Emerging Frontiers in Advanced Sciences and Technologies (EFAST 2026), Pabna, Bangladesh","","Presented",True)}
{row("conference","Conference paper","2025","Urban Tree Cover Detection Using UAV, Remote Sensing and Deep Learning","<b>Islam, M.S.</b>, and Islam, M.R.","1st International Conference on Life and Earth Sciences for Sustainable Development (ICLESSD-2025), Jagannath University, Dhaka","","Presented",True)}
{row("field","Field work","2025","CH4Rice Project","Field Data Collector","JAXA Earth Observation Research Center and the Institute of Industrial Science, University of Tokyo")}
      </ol>
      <p class="list-empty" hidden>Nothing here yet.</p>
    </div>'''
write("research.html", page("research.html","Research | Md Sabbir Islam","Papers, manuscripts and field work by Md Sabbir Islam.", research))

# ======================= PROJECTS (maps) =======================
W = "assets/img/work/"
def proj(key, cat, img, w, h, title, year, meta, alt, repo=None):
    code = f'<a class="link" href="https://github.com/Sabbir0Sojib/{repo}" target="_blank" rel="noopener">View code{ARROW}</a>' if repo else ""
    return f'''        <figure class="shot" data-cat="{cat}">
          <button class="shot__btn" type="button" data-lightbox="{key}" aria-label="Open {title} full size">
            <img src="{img}" width="{w}" height="{h}" alt="{alt}" loading="lazy">
          </button>
          <figcaption>
            <p class="shot__top"><span class="shot__title">{title}</span><span class="mono shot__year">{year}</span></p>
            <p class="shot__meta">{meta}</p>
            {code}
          </figcaption>
        </figure>'''
def more(title, meta, repo=None):
    code = f' <a class="link" href="https://github.com/Sabbir0Sojib/{repo}" target="_blank" rel="noopener">Code{ARROW}</a>' if repo else ""
    return f'          <li><p class="more__title">{title}</p><p class="more__meta">{meta}{code}</p></li>'
projects = f'''    <div class="wrap">
      <header class="page-head">
        <h1 class="page-head__title">Projects</h1>
        <p class="page-head__lede">Maps and analysis projects, most built in Python. Click a map to open it full size, then click again to zoom.</p>
      </header>
{chips("Filter projects by theme", [("all","All"),("hazard","Hazards and climate"),("water","Water"),("land","Land and terrain"),("city","Cities")])}
      <!-- Add a project: upload the map to assets/img/work/ and copy one <figure class="shot"> block.
           data-cat is hazard, water, land or city. -->
      <div class="gallery">
{proj("cyclone","hazard",W+"cyclone-tracks-bangladesh.webp",800,742,"Cyclone tracks and exposure corridor","2026","12 major storm tracks from 1970 to 2024 turned into a severity-weighted exposure corridor. geopandas, scipy, matplotlib","Map of Bangladesh showing 12 historical cyclone tracks from 1970 to 2024 over a coloured exposure corridor","Bangladesh-Cyclone-Tracks-and-Exposure-Corridor")}
{proj("flood","hazard",W+"flood-sylhet-sunamganj-2023.webp",800,565,"Flood delineation, Sylhet and Sunamganj, 2023","2025","Flooded area mapped from Copernicus Sentinel-1 radar imagery.","Map of Sylhet and Sunamganj districts with flooded areas in cyan, mostly in the west")}
{proj("elevation","land",W+"elevation-southeast-bangladesh.webp",800,1514,"Elevation, southeastern Bangladesh","2026","Bandarban, Rangamati, Khagrachhari, Chittagong and Cox's Bazar. ALOS World 3D 30 m DEM.","Hillshaded elevation map of the Chittagong Hill Tracts and coastal southeast Bangladesh")}
{proj("surfacewater","water",W+"surface-water-temperature-pabna.webp",1600,1247,"Surface water temperature, Pabna District","2025","Satellite thermal analysis of rivers and water bodies. Mean 25.39 °C, range 22.6 to 33.7 °C.","Map of Pabna District with surface water temperature along the Padma and Jamuna rivers","Pabna_Surface_Water_Analysis")}
{proj("coldwave","hazard",W+"cold-wave-bangladesh-2025.webp",480,622,"Cold wave, 29 December 2025","2025","Daily minimum temperature from BMD data, made with my temperature map generator. Lowest: Nikli, 9.8 °C.","Map of minimum temperature across Bangladesh on 29 December 2025, coldest around Nikli","Bangladesh_Temperature_Map")}
{proj("groundwater","water",W+"groundwater-depth-pabna.webp",1600,1204,"Groundwater depth, Pabna District","2025","Depth to water interpolated from observation wells, 1.2 to 10.4 m.","Groundwater depth map of Pabna District, shallow in the east and deeper in the far west","pabna-groundwater-analysis")}
{proj("wind","hazard",W+"wind-bangladesh-2023.webp",800,817,"Prevailing 10 m wind, 2023","2026","ERA5 reanalysis via Open-Meteo, with wind roses for Dhaka, Khulna and Chattogram.","Map of prevailing wind speed and direction over Bangladesh in 2023","Bangladesh-Prevailing-Wind-Direction-and-Speed")}
{proj("crop","land",W+"crop-suitability-bangladesh.webp",800,1035,"Crop suitability, Bangladesh","2026","Five suitability classes from BARC data, weighted overlay.","Crop suitability map of Bangladesh in five classes")}
{proj("padma","water",W+"padma-stream-order.webp",800,565,"Stream order of the Padma River basin","2025","Stream orders 1 to 4 derived from a DEM, with the watershed boundary. QGIS.","Stream order map of the Padma River basin")}
{proj("korail","city",W+"korail-cycling-accessibility.webp",800,861,"Cycling accessibility from Korail, Dhaka","2026","2,000 sampled points routed with OpenRouteService, cubic spline interpolation.","Isochrone map of cycling time from Korail, Dhaka, in 10 minute bands")}
      </div>
      <p class="list-empty" hidden>No projects in this theme yet.</p>

      <section class="block reveal" aria-labelledby="more-work" style="margin-top: 32px;">
        <h2 id="more-work" class="block__title">More projects</h2>
        <ul class="more">
{more("Landsat 8 harmonic modeling, Pabna District","Time series harmonic regression","Landsat8-Harmonic-Modeling-")}
{more("Sea level rise simulation, Bangladesh","SRTM 30 m DEM, bathtub inundation model, Python")}
{more("Earthquake hazard from recent events, Bangladesh","USGS events, IDW interpolation in ArcMap")}
{more("Land use and land cover, Dhaka District","Sentinel-2 classification")}
{more("Nepal flash flood, before and after","Betrawati-Gerkhu reach, Nuwakot District. Sentinel-2")}
{more("Landsat image of Bangladesh","Country-wide Landsat composite")}
        </ul>
      </section>
    </div>

{LIGHTBOX}'''
write("projects.html", page("projects.html","Projects | Md Sabbir Islam","Maps and analysis projects by Md Sabbir Islam: cyclones, floods, groundwater, heat, elevation and more across Bangladesh.", projects))

# ======================= GALLERY (photos) =======================
def photo(key, img, w, h, title, meta, alt):
    return f'''        <figure class="shot">
          <button class="shot__btn" type="button" data-lightbox="{key}" aria-label="Open photo full size">
            <img src="{img}" width="{w}" height="{h}" alt="{alt}" loading="lazy">
          </button>
          <figcaption><p class="shot__title">{title}</p><p class="shot__meta">{meta}</p></figcaption>
        </figure>'''
gallery = f'''    <div class="wrap">
      <header class="page-head">
        <h1 class="page-head__title">Gallery</h1>
        <p class="page-head__lede">Moments from conferences, fieldwork and the lab.</p>
      </header>
      <!-- Add a photo: upload it to assets/img/photos/ and copy one <figure class="shot"> block. -->
      <div class="gallery gallery--photos">
{photo("iclessd","assets/img/photos/iclessd-2025-jagannath-university.webp",1600,1612,"ICLESSD-2025, Jagannath University, Dhaka","Where I presented urban tree cover detection with UAV, remote sensing and deep learning.","Md Sabbir Islam in a blue suit in front of the ICLESSD-2025 conference banner at Jagannath University")}
      </div>
      <p class="gallery__soon">More photos from EFAST 2026, CH4Rice fieldwork and drone flights are on the way.</p>
    </div>

{LIGHTBOX}'''
write("gallery.html", page("gallery.html","Gallery | Md Sabbir Islam","Photos of Md Sabbir Islam at conferences, fieldwork and the lab.", gallery))

# ======================= FUN (game) =======================
fun = f'''    <div class="wrap">
      <header class="page-head page-head--compact">
        <h1 class="page-head__title">Pin the Place</h1>
        <p class="page-head__lede">How well do you know Bangladesh? Five places, one blank map. Click where you think each place is, then see how close you got.</p>
      </header>

      <div class="game" data-game>
        <aside class="game__panel" aria-live="polite">
          <div class="game__top">
            <p class="game__round" data-round>Round 1 of 5</p>
            <p class="game__score"><span data-score>0</span> points</p>
          </div>
          <div class="game__stage" data-stage="ask">
            <p class="game__ask">Where is <b data-place>...</b>?</p>
            <p class="game__hint">Click the map to drop your pin. You can move it before you lock it in.</p>
            <button class="btn btn--primary game__btn" type="button" data-lock disabled>Lock in guess</button>
          </div>
          <div class="game__stage" data-stage="result" hidden>
            <p class="game__distance"><span data-distance>0</span> km away</p>
            <p class="game__points">+<span data-points>0</span> points</p>
            <p class="game__fact" data-fact></p>
            <button class="btn btn--primary game__btn" type="button" data-next>Next place</button>
          </div>
          <div class="game__stage" data-stage="end" hidden>
            <p class="game__final"><span data-final>0</span><span class="game__of"> / 5000</span></p>
            <p class="game__rating" data-rating></p>
            <p class="game__best" data-best></p>
            <ol class="game__recap" data-recap></ol>
            <button class="btn btn--primary game__btn" type="button" data-again>Play again</button>
          </div>
          <p class="game__keys">Keyboard: arrow keys move the map, Enter drops a pin at the centre.</p>
        </aside>
        <div class="game__map">
          <div id="game-map" tabindex="0" aria-label="Blank map of Bangladesh. Click to place your guess."></div>
          <p class="game__loading" data-loading>Loading map...</p>
        </div>
      </div>
    </div>'''
write("fun.html", page("fun.html","Pin the Place | Md Sabbir Islam","A geography game: how well do you know Bangladesh? Pin five places on a blank map.", fun,
    extra_head=f'  <link rel="stylesheet" href="assets/vendor/leaflet/leaflet.css">\n',
    extra_js=f'  <script src="assets/vendor/leaflet/leaflet.js" defer></script>\n  <script src="assets/js/game.js?v={VER}" defer></script>\n'))
print("pages written")
