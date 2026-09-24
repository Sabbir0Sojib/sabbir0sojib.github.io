import os
OUT="/home/user/sabbir0sojib.github.io"
NAV=[("index.html","Profile"),("research.html","Research"),("projects.html","Projects"),("gallery.html","Gallery"),("fun.html","Fun")]
def icon(n, cls="i"): return f'<svg class="{cls}" aria-hidden="true"><use href="assets/icons.svg#{n}"/></svg>'
def page(fname, title, desc, body, extra_head="", extra_js=""):
    CUR=' aria-current="page"'
    nav="\n".join(f'          <a href="{h}"{CUR if h==fname else ""}>{t}</a>' for h,t in NAV)
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
{extra_head}  <link rel="stylesheet" href="assets/css/site.css">
  <script>document.documentElement.classList.add("js");</script>
  <script src="assets/js/site.js" defer></script>
{extra_js}</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header class="site-head">
    <div class="wrap site-head__row">
      <a class="brand" href="index.html">
        <img class="brand__img" src="assets/img/sabbir-portrait.webp" alt="" width="36" height="36">
        <span class="brand__name">Md Sabbir Islam</span>
      </a>
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
        <a class="icon-btn" href="https://www.linkedin.com/in/sabbir-sojib/" target="_blank" rel="me noopener" aria-label="LinkedIn">{icon("linkedin")}</a>
        <a class="icon-btn" href="https://github.com/Sabbir0Sojib" target="_blank" rel="me noopener" aria-label="GitHub">{icon("github")}</a>
      </p>
    </div>
  </footer>
</body>
</html>
'''
def write(f, s): open(os.path.join(OUT,f),"w").write(s)
ARROW=icon("arrow")

# ================= PROFILE =================
profile = f'''    <div class="wrap">
      <!-- ===== INTRO ===== -->
      <section class="intro" aria-labelledby="name">
        <picture>
          <source srcset="assets/img/sabbir-portrait.webp" type="image/webp">
          <img class="intro__photo" src="assets/img/sabbir-portrait.jpg" width="640" height="800"
               alt="Md Sabbir Islam at the ICLESSD-2025 conference, Jagannath University, Dhaka">
        </picture>
        <div class="reveal">
          <h1 id="name" class="intro__name">Md Sabbir Islam</h1>
          <p class="intro__role">Remote Sensing and Geospatial Deep Learning</p>
          <p class="intro__place">Department of Geography and Environment, Pabna University of Science and Technology, Bangladesh</p>
          <p class="intro__bio">I am an undergraduate researcher who combines drone imagery, satellite data and deep learning to map the environment. My thesis links 5 cm UAV images with 3 m PlanetScope data to map every tree crown in Pabna city. Alongside it, I build maps of cyclones, wind, water and land across Bangladesh in Python.</p>
          <div class="btn-row">
            <a class="btn btn--primary" href="#contact">{icon("envelope")}Email me</a>
            <a class="btn" href="https://www.linkedin.com/in/sabbir-sojib/" target="_blank" rel="me noopener">{icon("linkedin")}LinkedIn</a>
            <a class="btn" href="https://github.com/Sabbir0Sojib" target="_blank" rel="me noopener">{icon("github")}GitHub</a>
          </div>
        </div>
      </section>

      <!-- ===== INTERESTS ===== -->
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

      <!-- ===== EDUCATION + EXPERIENCE ===== -->
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

      <!-- ===== SKILLS ===== -->
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

      <!-- ===== AWARDS + LANGUAGES ===== -->
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

      <!-- ===== CONTACT ===== -->
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
        </ul>
      </section>
    </div>'''
write("index.html", page("index.html","Md Sabbir Islam | Remote Sensing and Geospatial Deep Learning",
  "Md Sabbir Islam, undergraduate researcher in Geography and Environment at Pabna University of Science and Technology. Remote sensing, UAV and satellite deep learning, and maps of Bangladesh.", profile))

# ================= RESEARCH =================
def pub(year, title, authors, venue, status, done=False):
    return f'''          <li class="pub">
            <p class="pub__year mono">{year}</p>
            <div>
              <p class="pub__title">{title}</p>
              <p class="pub__authors">{authors}</p>
              <p class="pub__venue">{venue}</p>
            </div>
            <span class="status{' status--done' if done else ''}">{status}</span>
          </li>'''
research = f'''    <div class="wrap">
      <header class="page-head">
        <h1 class="page-head__title">Research</h1>
        <p class="page-head__lede">Deep learning for urban trees, from drone to satellite, plus published and submitted work on lightning, air quality and tree cover.</p>
      </header>

      <!-- ===== THESIS ===== -->
      <section class="thesis reveal" aria-labelledby="thesis">
        <h2 id="thesis" class="thesis__title">Characterization of Urban Trees with Deep Learning Techniques in Pabna Municipality</h2>
        <p class="thesis__meta"><b>Undergraduate thesis</b>, 2025 to present</p>
        <p class="thesis__meta">Supervisor: D. Eng. Md Rahedul Islam, Professor, Pabna University of Science and Technology</p>
        <p class="thesis__meta">Geospatial Lab of Environment and Disaster</p>
        <p class="thesis__text">Drone images show every tree crown but cover only small areas. Satellite images cover the whole city but at a much coarser resolution. The thesis trains deep learning models on 5 cm UAV imagery, then transfers what they learn to 3 m PlanetScope imagery to map tree canopy across Pabna and estimate its biomass and carbon.</p>
        <ol class="flow">
          <li class="flow__step">
            <p class="flow__value">5 cm</p>
            <p class="flow__unit">UAV pixel size</p>
            <h3 class="flow__verb">Capture</h3>
            <p class="flow__text">Drone flights over Pabna, processed in Agisoft Metashape and Pix4D.</p>
          </li>
          <li class="flow__step">
            <p class="flow__value">0.944</p>
            <p class="flow__unit">F1 score, SegFormer</p>
            <h3 class="flow__verb">Delineate crowns</h3>
            <p class="flow__text">U-Net, DeepLabV3+, Mask2Former and SegFormer compared. SegFormer performed best.</p>
          </li>
          <li class="flow__step">
            <p class="flow__value">3 m</p>
            <p class="flow__unit">PlanetScope, F1 0.82</p>
            <h3 class="flow__verb">Scale to the city</h3>
            <p class="flow__text">A Random Forest trained on UAV crowns maps canopy from PlanetScope SuperDove imagery.</p>
          </li>
          <li class="flow__step">
            <p class="flow__value">AGB</p>
            <p class="flow__unit">Biomass and carbon</p>
            <h3 class="flow__verb">Estimate</h3>
            <p class="flow__text">Above-ground biomass and carbon stock from UAV-derived crown structure.</p>
          </li>
        </ol>
      </section>

      <!-- ===== PUBLICATIONS ===== -->
      <section class="block reveal" aria-labelledby="pubs" style="margin-top: 48px;">
        <h2 id="pubs" class="block__title">Publications</h2>
        <div class="pub-group">
          <h3 class="pub-group__title">Journal manuscripts</h3>
          <ul>
{pub("2026","Characterization of Urban Trees with Deep Learning Techniques in Pabna Municipality","<b>Islam, M.S.</b>, and Islam, M.R.","Journal manuscript","Under review")}
{pub("2026","Spatio-temporal Patterns of Lightning Events and Associated Casualties in Bangladesh: Linkages with Land Use and Land Cover","Ali, M.Y., <b>Islam, M.S.</b>, and Islam, M.R.","Journal manuscript","Under review")}
          </ul>
        </div>
        <div class="pub-group">
          <h3 class="pub-group__title">Conference papers</h3>
          <ul>
{pub("2026","Impact of Armed Conflict on Ambient Air Quality: A Multi-Pollutant Spatiotemporal Analysis Across Iranian Provinces, 2022 to 2026","<b>Islam, M.S.</b>, Ali, M.Y., and Islam, M.R.","International Conference on Emerging Frontiers in Advanced Sciences and Technologies (EFAST 2026), Pabna, Bangladesh","Presented",True)}
{pub("2025","Urban Tree Cover Detection Using UAV, Remote Sensing and Deep Learning","<b>Islam, M.S.</b>, and Islam, M.R.","1st International Conference on Life and Earth Sciences for Sustainable Development (ICLESSD-2025), Jagannath University, Dhaka","Presented",True)}
          </ul>
        </div>
      </section>

      <!-- ===== FIELD WORK ===== -->
      <section class="block reveal" aria-labelledby="field">
        <h2 id="field" class="block__title">Field work</h2>
        <p style="max-width:64ch;color:var(--ink-2)"><b style="color:var(--ink)">CH4Rice Project, 2025.</b> Field data collection in collaboration with the JAXA Earth Observation Research Center and the Institute of Industrial Science, University of Tokyo.</p>
      </section>
    </div>'''
write("research.html", page("research.html","Research | Md Sabbir Islam","Thesis on urban tree mapping with UAV and PlanetScope deep learning, plus publications by Md Sabbir Islam.", research))

# ================= PROJECTS =================
def card(title, year, text, tags, repo, img=None, alt=""):
    if img:
        media=f'<div class="card__media card__media--map"><img src="{img}" alt="{alt}" loading="lazy"></div>'
    else:
        media=f'<div class="card__media card__media--repo"><img src="https://opengraph.githubassets.com/1/Sabbir0Sojib/{repo}" alt="GitHub preview of the {title} repository" loading="lazy" onerror="this.parentNode.classList.add(\'is-fallback\')"><div class="card__fallback" aria-hidden="true">{icon("github")}<span>github.com/Sabbir0Sojib/{repo}</span></div></div>'
    t="".join(f'<li class="tag">{x}</li>' for x in tags)
    return f'''        <article class="card reveal">
          {media}
          <div class="card__body">
            <div class="card__top"><h2 class="card__title">{title}</h2><span class="card__year mono">{year}</span></div>
            <p class="card__text">{text}</p>
            <div class="card__foot">
              <ul class="tags">{t}</ul>
              <a class="link" href="https://github.com/Sabbir0Sojib/{repo}" target="_blank" rel="noopener">View code{ARROW}</a>
            </div>
          </div>
        </article>'''
projects = f'''    <div class="wrap">
      <header class="page-head">
        <h1 class="page-head__title">Projects</h1>
        <p class="page-head__lede">Open-source mapping and analysis projects, built in Python and shared on GitHub.</p>
      </header>
      <!-- Add a project: copy one <article class="card"> block. -->
      <div class="cards">
{card("Bangladesh Cyclone Tracks and Exposure Corridor","2026","55 years of cyclones toward Bangladesh: 12 major storm tracks from 1970 to 2024 turned into a severity-weighted exposure corridor.",["geopandas","scipy","matplotlib"],"Bangladesh-Cyclone-Tracks-and-Exposure-Corridor","assets/img/work/cyclone-tracks-bangladesh.webp","Cyclone tracks and exposure corridor map of Bangladesh")}
{card("Prevailing Wind Direction and Speed","2026","Annual 10 m wind over Bangladesh for 2023 with streamlines and wind roses for Dhaka, Khulna and Chattogram.",["ERA5","Open-Meteo","Python"],"Bangladesh-Prevailing-Wind-Direction-and-Speed","assets/img/work/wind-bangladesh-2023.webp","Prevailing wind map of Bangladesh, 2023")}
{card("Bangladesh Temperature Map Generator","2025","Automated pipeline that turns a GeoJSON and a date into a daily temperature map, from Open-Meteo and BMD data.",["Open-Meteo","BMD","Python"],"Bangladesh_Temperature_Map")}
{card("Pabna Surface Water Temperature","2025","Satellite thermal analysis of surface water dynamics across Pabna District, with maps and statistics.",["Landsat thermal","Python"],"Pabna_Surface_Water_Analysis")}
{card("Groundwater Depth in Pabna","2025","Groundwater depth across Pabna District, interpolated from observation wells and mapped in Python.",["Python","Interpolation"],"pabna-groundwater-analysis","assets/img/work/groundwater-depth-pabna-alt.webp","Groundwater depth map of Pabna District")}
{card("Landsat 8 Harmonic Modeling","2025","Harmonic regression on Landsat 8 time series for Pabna District to model seasonal land surface change.",["Landsat 8","Earth Engine"],"Landsat8-Harmonic-Modeling-")}
      </div>
    </div>'''
write("projects.html", page("projects.html","Projects | Md Sabbir Islam","Open-source mapping projects by Md Sabbir Islam: cyclone tracks, wind, temperature, groundwater and more.", projects))

# ================= GALLERY =================
def shot(key, cat, img, w, h, title, meta, alt):
    return f"""        <figure class="shot" data-cat="{cat}">
          <button class="shot__btn" type="button" data-lightbox="{key}" aria-label="Open {title} full size">
            <img src="{img}" width="{w}" height="{h}" alt="{alt}" loading="lazy">
          </button>
          <figcaption><p class="shot__title">{title}</p><p class="shot__meta">{meta}</p></figcaption>
        </figure>"""
def more(title, meta): return f'          <li><p class="more__title">{title}</p><p class="more__meta">{meta}</p></li>'
W="assets/img/work/"
gallery = f"""    <div class="wrap">
      <header class="page-head">
        <h1 class="page-head__title">Gallery</h1>
        <p class="page-head__lede">Maps I have made. Click any map to open it full size, then click again to zoom in.</p>
      </header>

      <div class="chips" role="toolbar" aria-label="Filter maps by theme">
        <button class="chip" type="button" data-filter="all" aria-pressed="true">All</button>
        <button class="chip" type="button" data-filter="hazard" aria-pressed="false">Hazards and climate</button>
        <button class="chip" type="button" data-filter="water" aria-pressed="false">Water</button>
        <button class="chip" type="button" data-filter="land" aria-pressed="false">Land and terrain</button>
        <button class="chip" type="button" data-filter="city" aria-pressed="false">Cities</button>
      </div>

      <!-- Add a map: upload the image to assets/img/work/ and copy one <figure class="shot"> block.
           data-cat is one of: hazard, water, land, city. -->
      <div class="gallery" aria-live="polite">
{shot("cyclone","hazard",W+"cyclone-tracks-bangladesh.webp",800,742,"Cyclone tracks and exposure corridor, 1970 to 2024","12 storm tracks turned into a severity-weighted corridor. Python","Map of Bangladesh showing 12 historical cyclone tracks from 1970 to 2024 over a colored exposure corridor")}
{shot("elevation","land",W+"elevation-southeast-bangladesh.webp",800,1514,"Elevation above sea level, southeastern Bangladesh","Bandarban, Rangamati, Khagrachhari, Chittagong and Cox's Bazar. ALOS World 3D 30 m","Hillshaded elevation map of the Chittagong Hill Tracts and coastal southeast Bangladesh, from sea level to above 1000 m")}
{shot("groundwater","water",W+"groundwater-depth-pabna.webp",1600,1204,"Groundwater depth, Pabna District","Depth to water interpolated from observation wells, 1.2 to 10.4 m. Python","Groundwater depth map of Pabna District, shallow water in the east and deeper water in the far west")}
{shot("wind","hazard",W+"wind-bangladesh-2023.webp",800,817,"Prevailing 10 m wind, Bangladesh, 2023","ERA5 reanalysis via Open-Meteo, Natural Earth boundaries","Map of prevailing wind speed and direction over Bangladesh in 2023 with wind roses")}
{shot("crop","land",W+"crop-suitability-bangladesh.webp",800,1035,"Crop suitability, Bangladesh","Five suitability classes from BARC data, weighted overlay","Crop suitability map of Bangladesh in five classes, most suitable land in the west and least suitable along the coast and rivers")}
{shot("padma","water",W+"padma-stream-order.webp",800,565,"Stream order of the Padma River basin","Stream orders 1 to 4 derived from a DEM, with the watershed boundary. QGIS","Stream order map of the Padma River basin across northern India, Nepal and Bangladesh")}
{shot("korail","city",W+"korail-cycling-accessibility.webp",800,861,"Cycling accessibility from Korail, Dhaka","2,000 sampled points, OpenRouteService, cubic spline interpolation","Isochrone map of cycling time from Korail, Dhaka, in 10 minute bands")}
      </div>
      <p class="gallery__empty" hidden>No maps in this theme yet.</p>

      <section class="block reveal" aria-labelledby="more-maps" style="margin-top: 32px;">
        <h2 id="more-maps" class="block__title">More maps, images coming soon</h2>
        <ul class="more">
{more("Sea level rise simulation, Bangladesh","SRTM 30 m DEM, bathtub inundation model, Python")}
{more("Earthquake hazard from recent events, Bangladesh","USGS events, IDW interpolation in ArcMap")}
{more("Land use and land cover, Dhaka District","Sentinel-2 classification")}
{more("Nepal flash flood, before and after","Betrawati-Gerkhu reach, Nuwakot District. Sentinel-2")}
{more("Surface water temperature, Pabna District","Satellite thermal analysis")}
{more("Landsat 8 harmonic modeling, Pabna District","Time series harmonic regression")}
{more("Flood delineation map","Flood extent mapping")}
{more("Landsat image of Bangladesh","Country-wide Landsat composite")}
{more("Daily temperature maps, Bangladesh","Open-Meteo and BMD data, automated in Python")}
        </ul>
      </section>
    </div>

    <dialog class="lightbox" aria-labelledby="lb-title">
      <div class="lightbox__bar">
        <p id="lb-title" class="lightbox__title"></p>
        <div class="lightbox__tools">
          <a class="icon-btn" data-lb-original href="#" target="_blank" rel="noopener" aria-label="Open original image">{icon("arrow")}</a>
          <button class="icon-btn" type="button" data-lb-prev aria-label="Previous map">{icon("prev")}</button>
          <button class="icon-btn" type="button" data-lb-next aria-label="Next map">{icon("next")}</button>
          <button class="icon-btn" type="button" data-lb-close aria-label="Close">{icon("close")}</button>
        </div>
      </div>
      <div class="lightbox__view"><img class="lightbox__img" src="assets/img/work/cyclone-tracks-bangladesh.webp" alt=""></div>
      <p class="lightbox__meta"></p>
    </dialog>"""
write("gallery.html", page("gallery.html","Gallery | Md Sabbir Islam","Maps by Md Sabbir Islam: cyclone tracks, elevation, groundwater, crop suitability, wind and more across Bangladesh.", gallery))

# ================= FUN: PIN THE PLACE =================
fun = f"""    <div class="wrap">
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
    </div>"""
write("fun.html", page("fun.html","Pin the Place | Md Sabbir Islam","A geography game: how well do you know Bangladesh? Pin five places on a blank map.", fun,
    extra_head='  <link rel="stylesheet" href="assets/vendor/leaflet/leaflet.css">\n',
    extra_js='  <script src="assets/vendor/leaflet/leaflet.js" defer></script>\n  <script src="assets/js/game.js" defer></script>\n'))
print("pages written")
