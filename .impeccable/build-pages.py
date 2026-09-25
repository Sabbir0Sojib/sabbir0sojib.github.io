# Page generator for sabbir0sojib.github.io. Run: python3 .impeccable/build-pages.py
import os, re, glob, datetime, json, html as _html
OUT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # the repository folder
VER = "20260926b"   # bump to force browsers to load new CSS/JS
NAV = [("index.html","Profile"),("research.html","Research"),("projects.html","Projects"),("maps.html","Maps"),("gallery.html","Gallery"),("fun.html","Fun")]
CUR = ' aria-current="page"'
ORCID = "https://orcid.org/0009-0001-9474-9287"
SITE = "https://sabbir0sojib.github.io/"
def content(name):
    with open(os.path.join(OUT, "content", name + ".json"), encoding="utf-8") as f:
        return json.load(f)

def slug(t):
    """Page name for a map, the same rule as mapSlug() in assets/js/site.js."""
    return re.sub(r"[^a-z0-9]+", "-", str(t).lower().replace("&", " and ")).strip("-")

def newest_first(items):
    key = lambda x: str(x.get("date") or (str(x.get("year") or "0000")[:4] + "-12-31"))
    return [x for _, x in sorted(enumerate(items), key=lambda p: (key(p[1]), -p[0]), reverse=True)]

def ld(data):
    return '  <script type="application/ld+json">' + json.dumps(data, ensure_ascii=False).replace("</", "<\\/") + "</script>\n"

def clip(text, n=158):
    text = " ".join(str(text).split())
    return text if len(text) <= n else text[:n].rsplit(" ", 1)[0].rstrip(",;:") + "..."

AUTHOR = {"@type": "Person", "name": "Md Sabbir Islam", "url": "https://sabbir0sojib.github.io/"}

def person_jsonld():
    """Structured data for search engines, built from content/profile.json on every build."""
    p = content("profile")
    orcid = "https://orcid.org/" + p["orcid"] if p.get("orcid") else None
    data = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": p.get("name"),
        "alternateName": ["Sabbir Islam Sojib", "Sabbir0Sojib"],
        "url": SITE,
        "image": SITE + p.get("photo", "").lstrip("/"),
        "jobTitle": p.get("role"),
        "affiliation": {"@type": "CollegeOrUniversity", "name": "Pabna University of Science and Technology"},
        "address": {"@type": "PostalAddress", "addressLocality": "Pabna", "addressCountry": "BD"},
        "knowsAbout": p.get("interests", []),
        "sameAs": [u for u in (orcid, p.get("linkedin"), p.get("github")) if u],
    }
    site = {"@context": "https://schema.org", "@type": "WebSite", "name": p.get("name"), "url": SITE}
    dump = lambda d: json.dumps(d, ensure_ascii=False).replace("</", "<\\/")
    return f'  <script type="application/ld+json">{dump(data)}</script>\n  <script type="application/ld+json">{dump(site)}</script>\n'

SHARE = SITE + "assets/img/share-card.jpg"   # 1200x630 link preview, built from .impeccable/share-card.html
def icon(n, cls="i"): return f'<svg class="{cls}" aria-hidden="true"><use href="assets/icons.svg?v={VER}#{n}"/></svg>'
ARROW = icon("arrow")
NEXT = icon("arrow-right")

def page(fname, title, desc, body, extra_head="", extra_js="", og=None):
    url = SITE if fname in ("index.html", "404.html") else SITE + fname
    here = "maps.html" if fname.startswith("maps/") else fname
    nav = "\n".join(f'          <a href="{h}"{CUR if h==here else ""}>{t}</a>' for h,t in NAV)
    og_img, og_w, og_h, og_alt = og or (SHARE, 1200, 630, "Md Sabbir Islam, Remote Sensing and Geospatial Deep Learning")
    foot_nav = "\n".join(f'          <li><a href="{h}">{t}</a></li>' for h,t in NAV)
    return f'''<!doctype html>
<html lang="en" data-v="{VER}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <meta name="author" content="Md Sabbir Islam">
  <link rel="canonical" href="{url}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Md Sabbir Islam">
  <meta property="og:url" content="{url}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:image" content="{og_img}">
  <meta property="og:image:width" content="{og_w}">
  <meta property="og:image:height" content="{og_h}">
  <meta property="og:image:alt" content="{og_alt}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="{og_img}">
  <meta name="theme-color" content="#0F3B24">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="assets/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/newsreader-latin.woff2" as="font" type="font/woff2" crossorigin>
{extra_head}  <link rel="stylesheet" href="assets/css/site.css?v={VER}">
  <script>document.documentElement.classList.add("js");</script>
  <script src="assets/js/site.js?v={VER}" defer></script>
{extra_js}</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <div class="utility">
    <div class="wrap utility__row">
      <a href="{ORCID}" target="_blank" rel="me noopener">{icon("orcid")}ORCID</a>
      <a href="https://www.linkedin.com/in/sabbir-sojib/" target="_blank" rel="me noopener">{icon("linkedin")}LinkedIn</a>
      <a href="https://github.com/Sabbir0Sojib" target="_blank" rel="me noopener">{icon("github")}GitHub</a>
      <a href="mailto:mdsabbirislam820@gmail.com">{icon("envelope")}Email</a>
    </div>
  </div>
  <header class="site-head">
    <div class="wrap site-head__row">
      <a class="brand" href="index.html">Md Sabbir Islam</a>
      <div class="site-head__end">
        <nav class="nav" id="site-nav" aria-label="Main">
{nav}
        </nav>
        <a class="pill head-cta" href="index.html#contact">{icon("envelope")}Email me</a>
        <button class="pill nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">
          <span class="nav-toggle__label">Menu</span>{icon("menu","i i--menu")}{icon("close","i i--close")}
        </button>
      </div>
    </div>
  </header>

  <main id="main">
{body}
  </main>

  <footer class="site-foot">
    <div class="wrap site-foot__grid">
      <div class="site-foot__id">
        <p class="site-foot__name">Md Sabbir Islam</p>
        <p class="site-foot__tag" data-site="footer_tagline">Maps, research and code on remote sensing and geospatial deep learning in Bangladesh.</p>
      </div>
      <nav aria-label="Footer">
        <p class="site-foot__h">Pages</p>
        <ul class="site-foot__list site-foot__list--2">
{foot_nav}
        </ul>
      </nav>
      <div>
        <p class="site-foot__h">Elsewhere</p>
        <ul class="site-foot__list">
          <li><a href="mailto:mdsabbirislam820@gmail.com">{icon("envelope")}Email</a></li>
          <li><a href="{ORCID}" target="_blank" rel="me noopener">{icon("orcid")}ORCID</a></li>
          <li><a href="https://www.linkedin.com/in/sabbir-sojib/" target="_blank" rel="me noopener">{icon("linkedin")}LinkedIn</a></li>
          <li><a href="https://github.com/Sabbir0Sojib" target="_blank" rel="me noopener">{icon("github")}GitHub</a></li>
        </ul>
      </div>
    </div>
    <div class="wrap site-foot__base">
      <p data-site="footer">&copy; 2026 Md Sabbir Islam. Pabna University of Science and Technology, Bangladesh.</p>
      <p>Green band background: terrain of the Chittagong Hill Tracts from SRTM elevation data.</p>
      <a href="#main">Back to top</a>
    </div>
  </footer>
</body>
</html>
'''
def write(f, s): open(os.path.join(OUT, f), "w").write(s)

def absolutize(html):
    """404.html is served at any missing address (for example /a/b/c), so every link must start at the site root."""
    html = html.replace('href="assets/', 'href="/assets/').replace('src="assets/', 'src="/assets/')
    html = html.replace('href="index.html#', 'href="/#').replace('href="index.html"', 'href="/"')
    for h, _ in NAV:
        html = html.replace(f'href="{h}"', f'href="/{h}"')
    return html

def chips(label, items):
    b = "\n".join(f'        <button class="chip" type="button" data-filter="{k}" aria-pressed="{"true" if i==0 else "false"}">{t}</button>' for i,(k,t) in enumerate(items))
    return f'      <div class="chips" role="toolbar" aria-label="{label}">\n{b}\n      </div>'

LIGHTBOX = f'''    <dialog class="lightbox" aria-labelledby="lb-title">
      <div class="lightbox__bar">
        <p id="lb-title" class="lightbox__title"></p>
        <div class="lightbox__tools">
          <a class="icon-btn" data-lb-original target="_blank" rel="noopener" aria-label="Open original image">{icon("arrow")}</a>
          <button class="icon-btn" type="button" data-lb-prev aria-label="Previous">{icon("prev")}</button>
          <button class="icon-btn" type="button" data-lb-next aria-label="Next">{icon("next")}</button>
          <button class="icon-btn" type="button" data-lb-close aria-label="Close">{icon("close")}</button>
        </div>
      </div>
      <div class="lightbox__view"><img class="lightbox__img" src="assets/img/work/cyclone-tracks-bangladesh.webp" alt=""></div>
      <p class="lightbox__meta"></p>
    </dialog>'''

# ======================= PAGE SHELLS (content comes from content/*.json) =======================
NOSCRIPT = '      <noscript><p class="list-empty">This page needs JavaScript to show its content.</p></noscript>'
def image_dims(path):
    try:
        from PIL import Image
        with Image.open(os.path.join(OUT, str(path).lstrip("/"))) as im: return im.size
    except Exception:
        return (1600, 1200)

def maps_jsonld():
    maps = [m for m in newest_first(content("maps")) if m.get("image")]
    return ld({"@context": "https://schema.org", "@type": "CollectionPage", "name": "Maps of Bangladesh by Md Sabbir Islam",
               "url": SITE + "maps.html", "author": AUTHOR,
               "mainEntity": {"@type": "ItemList", "itemListElement": [
                   {"@type": "ListItem", "position": i + 1, "url": SITE + "maps/" + slug(m["title"]) + ".html", "name": m["title"]}
                   for i, m in enumerate(maps)]}})

def gallery_jsonld():
    items = []
    for g in content("gallery"):
        if not g.get("image"): continue
        w, h = image_dims(g["image"])
        items.append({"@type": "ImageObject", "contentUrl": SITE + g["image"].lstrip("/"), "name": g.get("title", ""),
                      "caption": g.get("caption", ""), "width": w, "height": h})
    return ld({"@context": "https://schema.org", "@type": "ImageGallery", "name": "Gallery of Md Sabbir Islam",
               "url": SITE + "gallery.html", "about": AUTHOR, "associatedMedia": items})

def projects_jsonld():
    items = []
    for i, p in enumerate(newest_first(content("projects"))):
        tools = [t.strip() for t in str(p.get("tools", "")).split(",") if t.strip()]
        langs = [t for t in tools if t in ("Python", "R", "JavaScript")]
        items.append({"@type": "ListItem", "position": i + 1, "item": {
            "@type": "SoftwareSourceCode", "name": p.get("title"), "description": p.get("description", ""),
            "codeRepository": p.get("repo"), "author": AUTHOR, "dateCreated": p.get("date") or p.get("year"),
            "keywords": ", ".join(tools), **({"programmingLanguage": langs} if langs else {})}})
    return ld({"@context": "https://schema.org", "@type": "ItemList", "name": "Projects by Md Sabbir Islam", "itemListElement": items})

write("index.html", page("index.html","Md Sabbir Islam | Remote Sensing and Geospatial Deep Learning",
  "Md Sabbir Islam (Sabbir Islam Sojib), remote sensing and geospatial deep learning researcher at Pabna University of Science and Technology, Bangladesh.",
  f"""    <section class="band band--hero" aria-labelledby="name">
      <div class="wrap" data-render="hero" aria-busy="true">
{NOSCRIPT}
      </div>
    </section>

    <div class="wrap">
      <dl class="glance" data-render="glance" aria-label="At a glance"></dl>

      <section class="home-sec" aria-labelledby="h-maps">
        <div class="sec-head">
          <h2 class="sec-title" id="h-maps" data-site="home_maps_title">Latest maps</h2>
          <a class="more-link" href="maps.html"><span data-count="maps">See all maps</span>{NEXT}</a>
        </div>
        <div class="bento" data-render="home-maps" aria-busy="true"></div>
      </section>

      <section class="split" aria-labelledby="h-research">
        <div class="split__head">
          <h2 class="sec-title" id="h-research" data-site="home_research_title">Recent research</h2>
          <a class="more-link" href="research.html">Read all research{NEXT}</a>
        </div>
        <ol class="cites" data-render="home-research" aria-busy="true"></ol>
      </section>

      <section class="home-sec" aria-labelledby="h-projects">
        <div class="sec-head">
          <h2 class="sec-title" id="h-projects" data-site="home_projects_title">Code projects</h2>
          <a class="more-link" href="projects.html">See all projects{NEXT}</a>
        </div>
        <div class="pgrid" data-render="home-projects" aria-busy="true"></div>
      </section>

      <div data-render="about" aria-busy="true"></div>
    </div>

    <section class="band band--contact" id="contact" aria-labelledby="contact-title">
      <div class="wrap" data-render="contact" aria-busy="true"></div>
    </section>

{LIGHTBOX}""", extra_head=person_jsonld()))

write("research.html", page("research.html","Research and publications | Md Sabbir Islam","Research by Md Sabbir Islam: urban tree mapping with UAV imagery and deep learning, lightning and land cover in Bangladesh, and air quality in Iran.", f"""    <div class="band">
      <div class="wrap">
        <header class="page-head">
          <h1 class="page-head__title" data-site="research_title">Research</h1>
          <p class="page-head__lede" data-site="research_intro">Papers, manuscripts and field work, newest first.</p>
        </header>
      </div>
    </div>
    <div class="wrap">
      <div class="publications" data-render="research" aria-busy="true"></div>
      <p class="list-empty" hidden>Nothing here yet.</p>
{NOSCRIPT}
    </div>"""))

write("projects.html", page("projects.html","GIS and remote sensing projects on GitHub | Md Sabbir Islam","Open source GIS and remote sensing code by Md Sabbir Islam: Earth Engine, Python and deep learning projects on cyclones, heat, water and trees.", f"""    <div class="band">
      <div class="wrap">
        <header class="page-head">
          <h1 class="page-head__title" data-site="projects_title">Projects</h1>
          <p class="page-head__lede" data-site="projects_intro">Code projects with open repositories on GitHub, newest first.</p>
        </header>
      </div>
    </div>
    <div class="wrap">
      <div class="proj-list" data-render="repos" aria-busy="true"></div>
      <p class="list-empty" hidden>No projects yet.</p>
{NOSCRIPT}
    </div>""", extra_head=projects_jsonld()))

write("maps.html", page("maps.html","Maps of Bangladesh | Md Sabbir Islam","Maps of Bangladesh by Md Sabbir Islam: cyclone tracks, floods, sea level rise, tree cover loss, elevation, wind, groundwater and land use.", f"""    <div class="band">
      <div class="wrap wrap--wide">
        <header class="page-head">
          <h1 class="page-head__title" data-site="maps_title">Maps</h1>
          <p class="page-head__lede" data-site="maps_intro">Maps from my research and projects, newest first. Click any map to see it full size.</p>
        </header>
      </div>
    </div>
    <div class="wrap wrap--wide">
      <div class="chips" role="toolbar" aria-label="Filter maps by tag" data-chips hidden></div>
      <div class="project-grid map-wall" data-render="maps" aria-busy="true"></div>
      <p class="list-empty" hidden>No maps with this tag yet.</p>
{NOSCRIPT}
      <section class="block block--more" aria-labelledby="more-work" data-render-wrap="projects-more" hidden>
        <h2 id="more-work" class="block__title">More maps</h2>
        <ul class="more" data-render="projects-more"></ul>
      </section>
    </div>

{LIGHTBOX}""", extra_head=maps_jsonld()))

write("gallery.html", page("gallery.html","Gallery | Md Sabbir Islam","Photos of Md Sabbir Islam presenting research at EFAST 2026, ETSD 2026 and ICLESSD-2025, UAV fieldwork, PUST YouthMappers and a disaster hackathon.", f"""    <div class="band">
      <div class="wrap">
        <header class="page-head">
          <h1 class="page-head__title" data-site="gallery_title">Gallery</h1>
          <p class="page-head__lede" data-site="gallery_intro">Moments from conferences, fieldwork and the lab.</p>
        </header>
      </div>
    </div>
    <div class="wrap">
      <div class="gallery gallery--photos" data-render="gallery" aria-busy="true"></div>
      <p class="list-empty" hidden>Photos are on the way.</p>
{NOSCRIPT}
    </div>

{LIGHTBOX}""", extra_head=gallery_jsonld()))

# ======================= FUN (game) =======================
fun = f"""    <div class="band">
      <div class="wrap">
        <header class="page-head page-head--compact">
          <h1 class="page-head__title" data-site="fun_title">Geography games</h1>
          <p class="page-head__lede" data-site="fun_intro">Pin places on a blank satellite map, or name a place seen from space. Play with Bangladesh or the whole world.</p>
        </header>
      </div>
    </div>
    <div class="wrap">
      <div class="gametabs" role="tablist" aria-label="Games">
        <button class="gametab is-on" type="button" role="tab" id="tab-pin" aria-selected="true" aria-controls="game-pin" data-gametab="pin">
          <span class="gametab__icon">{icon("crosshair")}</span><span class="gametab__text"><b>Pin the Place</b><small>Find places on a blank satellite map</small></span>
        </button>
        <button class="gametab" type="button" role="tab" id="tab-detective" aria-selected="false" aria-controls="game-detective" data-gametab="detective" tabindex="-1">
          <span class="gametab__icon">{icon("layers")}</span><span class="gametab__text"><b>Satellite Detective</b><small>Name a place seen from space</small></span>
        </button>
      </div>

      <section id="game-pin" role="tabpanel" aria-labelledby="tab-pin" data-gamebox="pin">
      <div class="game" data-game>
        <div class="game__levels" role="radiogroup" aria-label="Level" data-levels></div>

        <aside class="game__panel" aria-live="polite">
          <div class="game__top">
            <ol class="game__dots" data-dots aria-hidden="true"></ol>
            <p class="game__score"><span data-score>0</span> pts</p>
          </div>

          <div class="game__stage" data-stage="ask">
            <p class="game__round" data-round>Round 1 of 5</p>
            <p class="game__ask">Where is <b data-place>...</b>?</p>
            <p class="game__hint" data-hint></p>
            <button class="btn btn--primary game__btn" type="button" data-lock disabled>Lock in guess</button>
            <p class="game__tip">Tap the map to drop a pin. Tap again to move it.</p>
          </div>

          <div class="game__stage" data-stage="result" hidden>
            <p class="game__verdict" data-verdict></p>
            <p class="game__points">+<span data-points>0</span> points</p>
            <p class="game__fact" data-fact></p>
            <button class="btn btn--primary game__btn" type="button" data-next>Next place</button>
          </div>

          <div class="game__stage" data-stage="end" hidden>
            <p class="game__round" data-endlevel></p>
            <p class="game__final"><span data-final>0</span><span class="game__of"> / 5000</span></p>
            <p class="game__rating" data-rating></p>
            <p class="game__best" data-best></p>
            <ol class="game__recap" data-recap></ol>
            <div class="btn-row">
              <button class="btn btn--primary" type="button" data-again>Play again</button>
            </div>
          </div>
        </aside>

        <div class="game__map">
          <div id="game-map" tabindex="0" aria-label="Unlabeled satellite map of Bangladesh. Click to place your guess."></div>
          <p class="game__loading" data-loading>Loading map...</p>
          <div class="game__float" data-float hidden>
            <button class="btn btn--primary" type="button" data-lock-float disabled>Lock in guess</button>
          </div>
        </div>
      </div>
      </section>

      <section id="game-detective" role="tabpanel" aria-labelledby="tab-detective" data-gamebox="detective" hidden>
        <div class="game game--detective" data-detective>
          <div class="game__levels"><div class="regions" role="radiogroup" aria-label="Region" data-dregions></div></div>

          <aside class="game__panel" aria-live="polite">
            <div class="game__top">
              <ol class="game__dots" data-ddots aria-hidden="true"></ol>
              <p class="game__score"><span data-dscore>0</span> pts</p>
            </div>

            <div class="game__stage" data-dstage="ask">
              <p class="game__round" data-dround>Round 1 of 5</p>
              <p class="game__ask">Which place is this?</p>
              <p class="game__hint" data-dseen></p>
              <div class="choices" data-dchoices></div>
              <p class="game__tip" data-dtip>This answer is worth <b data-dworth>1,000</b> points. Zooming out shows more, for fewer points.</p>
              <button class="btn game__zoom" type="button" data-dzoom>{icon("expand")}Zoom out</button>
              <p class="game__verdict" data-dverdict></p>
              <p class="game__fact" data-dfact></p>
              <button class="btn btn--primary game__btn" type="button" data-dnext hidden>Next place</button>
            </div>

            <div class="game__stage" data-dstage="end" hidden>
              <p class="game__round" data-dendlevel></p>
              <p class="game__final"><span data-dfinal>0</span><span class="game__of"> / 5000</span></p>
              <p class="game__rating" data-drating></p>
              <p class="game__best" data-dbest></p>
              <ol class="game__recap" data-drecap></ol>
              <div class="btn-row">
                <button class="btn btn--primary" type="button" data-dagain>Play again</button>
              </div>
            </div>
          </aside>

          <div class="game__map">
            <div id="detective-map" role="img" aria-label="Satellite view of the place to name"></div>
            <p class="game__loading" data-dloading>Loading...</p>
          </div>
        </div>
      </section>

      <section class="howto" aria-labelledby="howto-title">
        <div class="howto__intro">
          <h2 class="sec-title" id="howto-title" data-site="fun_howto_title">How to play</h2>
          <p data-site="fun_howto">Pick a game and a region, Bangladesh or the whole world. In Pin the Place, tap the map to drop a pin and lock in your guess: a pin inside the right area, or right on the landmark, scores 1000 points, and the further away it lands, the fewer points you get. In Satellite Detective, name the place you see from above; zooming out helps, but lowers the points.</p>
        </div>
        <dl class="howto__levels">
          <div><dt>Bangladesh</dt><dd>8 divisions, 64 districts, 544 upazilas and famous landmarks.</dd></div>
          <div><dt>World</dt><dd>167 countries and famous places, from the Pyramids to Machu Picchu.</dd></div>
          <div><dt>Pin the Place</dt><dd>Drop a pin on the unlabeled satellite map. Five places per game.</dd></div>
          <div><dt>Satellite Detective</dt><dd>Four choices per view. 1000, 600 or 300 points depending on zoom.</dd></div>
        </dl>
        <h3 class="howto__sub" data-site="fun_places_title">Landmarks in the games</h3>
        <div class="howto__lists">
          <div><p class="howto__list-title">Bangladesh</p><ul class="tags tags--quiet" data-render="places" aria-busy="true"></ul></div>
          <div><p class="howto__list-title">World</p><ul class="tags tags--quiet" data-render="world-places" aria-busy="true"></ul></div>
        </div>
        <p class="howto__credit">Boundaries: geoBoundaries (BBS and OCHA, CC BY 3.0 IGO) and Natural Earth (public domain). Imagery: Esri World Imagery, with Sentinel-2 cloudless by EOX as a fallback.</p>
      </section>
    </div>"""
write("fun.html", page("fun.html","Geography games: Pin the Place, Satellite Detective | Md Sabbir Islam","Free geography games on real satellite maps: find Bangladesh districts, 167 countries and world wonders, or name famous places seen from space.", fun,
    extra_head=f'  <link rel="stylesheet" href="assets/vendor/leaflet/leaflet.css">\n',
    extra_js=f'  <script src="assets/vendor/leaflet/leaflet.js" defer></script>\n  <script src="assets/js/game.js?v={VER}" defer></script>\n  <script src="assets/js/detective.js?v={VER}" defer></script>\n'))

# ======================= 404 (GitHub Pages serves it for any missing address) =======================
nf = page("404.html", "Page not found | Md Sabbir Islam", "This page does not exist. Go to the home page of Md Sabbir Islam.", f"""    <section class="band band--hero band--404" aria-labelledby="nf-title">
      <div class="wrap">
        <div class="notfound">
          <p class="notfound__code mono">404</p>
          <h1 class="notfound__title" id="nf-title" data-site="notfound_title">This page is off the map.</h1>
          <p class="notfound__text" data-site="notfound_text">The page you are looking for does not exist or has moved.</p>
          <div class="hero__actions">
            <a class="pill" href="index.html">Go to the home page{NEXT}</a>
            <a class="btn btn--ghost" href="maps.html">See my maps</a>
          </div>
        </div>
      </div>
    </section>""")
nf = nf.replace('<meta name="description"', '<meta name="robots" content="noindex">\n  <meta name="description"', 1)
write("404.html", absolutize(nf))

# ======================= Image sizes, so pages reserve space before images load =======================
def image_sizes():
    from PIL import Image
    sizes = {}
    root = os.path.join(OUT, "assets", "img")
    for dirpath, _, files in os.walk(root):
        for f in files:
            if f.lower().rsplit(".", 1)[-1] in ("webp", "jpg", "jpeg", "png"):
                full = os.path.join(dirpath, f)
                try:
                    with Image.open(full) as im: sizes[os.path.relpath(full, OUT).replace(os.sep, "/")] = list(im.size)
                except Exception:
                    pass
    return dict(sorted(sizes.items()))
os.makedirs(os.path.join(OUT, "assets", "data"), exist_ok=True)
write("assets/data/image-sizes.json", json.dumps(image_sizes(), indent=0) + "\n")

# ======================= One page per map (maps/<slug>.html), for search engines and sharing =======================
def map_pages():
    maps = [m for m in newest_first(content("maps")) if m.get("image")]
    os.makedirs(os.path.join(OUT, "maps"), exist_ok=True)
    made = set()
    for m in maps:
        name = slug(m["title"]); made.add(name + ".html")
        img = "/" + m["image"].lstrip("/"); w, h = image_dims(img)
        tags = [t for t in (m.get("tags") or []) if t]
        desc = clip(f'{m["title"]}. A map by Md Sabbir Islam, Bangladesh. {m.get("description") or ""}')
        others = [o for o in maps if o is not m][:4]
        cards = "".join(
            f'<article class="pcard"><div class="mat pcard__media" aria-hidden="true"><img src="/{o["image"].lstrip("/")}" alt="" loading="lazy"></div>'
            f'<div class="pcard__top"><h3 class="pcard__title"><a href="/maps/{slug(o["title"])}.html">{_html.escape(o["title"])}</a></h3>'
            f'<span class="mono shot__year">{_html.escape(str(o.get("year", "")))}</span></div>'
            f'<p class="pcard__text">{_html.escape(clip(o.get("description", ""), 110))}</p></article>' for o in others)
        data = {"@context": "https://schema.org", "@type": "Map", "name": m["title"], "description": m.get("description", ""),
                "url": SITE + "maps/" + name + ".html", "author": AUTHOR, "creator": AUTHOR,
                "dateCreated": m.get("date") or str(m.get("year", "")), "keywords": ", ".join(tags),
                "image": {"@type": "ImageObject", "contentUrl": SITE + img.lstrip("/"), "width": w, "height": h,
                          "caption": m.get("image_alt") or m["title"], "creator": AUTHOR, "creditText": "Md Sabbir Islam",
                          "copyrightNotice": "Md Sabbir Islam"}}
        crumbs = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE},
            {"@type": "ListItem", "position": 2, "name": "Maps", "item": SITE + "maps.html"},
            {"@type": "ListItem", "position": 3, "name": m["title"], "item": SITE + "maps/" + name + ".html"}]}
        spans = " ".join('<span class="tag">' + _html.escape(t) + "</span>" for t in tags)
        tag_line = '<p class="tags tags--quiet mapdetail__tags">' + spans + "</p>" if tags else ""
        body = f"""    <div class="band">
      <div class="wrap">
        <header class="page-head page-head--compact">
          <h1 class="page-head__title">{_html.escape(m["title"])}</h1>
          <p class="page-head__lede">{_html.escape(m.get("description", ""))}</p>
        </header>
      </div>
    </div>
    <div class="wrap">
      <figure class="shot mapdetail">
        <button class="mat shot__btn" type="button" data-lightbox="m0" aria-label="Open {_html.escape(m["title"])} full size">
          <img src="{img}" width="{w}" height="{h}" alt="{_html.escape(m.get("image_alt") or m["title"])}">
          <span class="shot__zoom" aria-hidden="true">{icon("expand")}View full size</span>
        </button>
        <figcaption>
          <p class="shot__top"><span class="shot__title">{_html.escape(m["title"])}</span><span class="mono shot__year">{_html.escape(str(m.get("year", "")))}</span></p>
          <p class="shot__meta">Map by Md Sabbir Islam. {_html.escape(m.get("description", ""))}</p>
          {tag_line}
        </figcaption>
      </figure>
      <p class="btn-row mapdetail__actions"><a class="pill" href="{img}" target="_blank" rel="noopener">Open the full image{ARROW}</a><a class="btn" href="maps.html">See all maps</a></p>

      <section class="home-sec" aria-labelledby="more-maps">
        <div class="sec-head"><h2 class="sec-title" id="more-maps">More maps</h2><a class="more-link" href="maps.html">See all maps{NEXT}</a></div>
        <div class="pgrid">{cards}</div>
      </section>
    </div>

{LIGHTBOX}"""
        html = page("maps/" + name + ".html", f"{m['title']} | Map by Md Sabbir Islam", _html.escape(desc, quote=True), body,
                    extra_head=ld(data) + ld(crumbs), og=(SITE + img.lstrip("/"), w, h, _html.escape(m.get("image_alt") or m["title"], quote=True)))
        write("maps/" + name + ".html", absolutize(html))
    for old in glob.glob(os.path.join(OUT, "maps", "*.html")):
        if os.path.basename(old) not in made: os.remove(old)
    return maps
MAP_PAGES = map_pages()

# ======================= Sitemap and robots.txt for search engines =======================
today = datetime.date.today().isoformat()
def images_for(h):
    """Map and project images listed per page, so they can show up in Google Images."""
    items = {"maps.html": content("maps"), "projects.html": content("projects"), "index.html": content("maps")[:0]}.get(h, [])
    if h == "gallery.html": items = content("gallery")
    out = []
    for it in items:
        img = str(it.get("image") or "").lstrip("/")
        if img: out.append(f"    <image:image><image:loc>{_html.escape(SITE + img)}</image:loc></image:image>")
    return ("\n" + "\n".join(out) + "\n  ") if out else ""
urls = "\n".join(f"  <url><loc>{SITE if h == 'index.html' else SITE + h}</loc><lastmod>{today}</lastmod>{images_for(h)}</url>" for h, _ in NAV)
urls += "".join(f"\n  <url><loc>{SITE}maps/{slug(m['title'])}.html</loc><lastmod>{today}</lastmod>\n    <image:image><image:loc>{_html.escape(SITE + m['image'].lstrip('/'))}</image:loc></image:image>\n  </url>" for m in MAP_PAGES)
write("sitemap.xml", f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n{urls}\n</urlset>\n')
write("robots.txt", f"User-agent: *\nAllow: /\n\nSitemap: {SITE}sitemap.xml\n")
print("pages written")
