# Page generator for sabbir0sojib.github.io. Run: python3 .impeccable/build-pages.py
import os
OUT = "/home/user/sabbir0sojib.github.io"
VER = "20260924j"   # bump to force browsers to load new CSS/JS
NAV = [("index.html","Profile"),("research.html","Research"),("projects.html","Projects"),("gallery.html","Gallery"),("fun.html","Fun")]
CUR = ' aria-current="page"'
ORCID = "https://orcid.org/0009-0001-9474-9287"
def icon(n, cls="i"): return f'<svg class="{cls}" aria-hidden="true"><use href="assets/icons.svg?v={VER}#{n}"/></svg>'
ARROW = icon("arrow")

def page(fname, title, desc, body, extra_head="", extra_js=""):
    nav = "\n".join(f'          <a href="{h}"{CUR if h==fname else ""}>{t}</a>' for h,t in NAV)
    return f'''<!doctype html>
<html lang="en" data-v="{VER}">
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
  <meta name="theme-color" content="#F7F9F6">
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
      <p data-site="footer">&copy; 2026 Md Sabbir Islam. Pabna University of Science and Technology, Bangladesh.</p>
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

# ======================= PAGE SHELLS (content comes from content/*.json) =======================
NOSCRIPT = '      <noscript><p class="list-empty">This page needs JavaScript to show its content.</p></noscript>'
write("index.html", page("index.html","Md Sabbir Islam | Remote Sensing and Geospatial Deep Learning",
  "Md Sabbir Islam, Geography and Environment researcher at Pabna University of Science and Technology. UAV and satellite deep learning, and maps of Bangladesh.",
  f"""    <div class="wrap" data-render="profile" aria-busy="true">
{NOSCRIPT}
    </div>"""))

write("research.html", page("research.html","Research | Md Sabbir Islam","Papers, manuscripts and field work by Md Sabbir Islam.", f"""    <div class="wrap">
      <header class="page-head">
        <h1 class="page-head__title" data-site="research_title">Research</h1>
        <p class="page-head__lede" data-site="research_intro">Papers, manuscripts and field work, newest first.</p>
      </header>
{chips("Filter research by type", [("all","All"),("journal","Journal manuscripts"),("conference","Conference papers"),("field","Field work")])}
      <ol class="stories" data-render="research" aria-busy="true"></ol>
      <p class="list-empty" hidden>Nothing here yet.</p>
{NOSCRIPT}
    </div>"""))

write("projects.html", page("projects.html","Projects | Md Sabbir Islam","Maps and analysis projects by Md Sabbir Islam across Bangladesh.", f"""    <div class="wrap">
      <header class="page-head">
        <h1 class="page-head__title" data-site="projects_title">Projects</h1>
        <p class="page-head__lede" data-site="projects_intro">Maps and analysis projects, newest first. Click a map to view it full size.</p>
      </header>
{chips("Filter projects by theme", [("all","All"),("hazard","Hazards and climate"),("water","Water"),("land","Land and terrain"),("city","Cities")])}
      <div class="project-grid" data-render="projects" aria-busy="true"></div>
      <p class="list-empty" hidden>No projects in this theme yet.</p>
{NOSCRIPT}
      <section class="block" aria-labelledby="more-work" style="margin-top: 40px;" data-render-wrap="projects-more" hidden>
        <h2 id="more-work" class="block__title">More projects</h2>
        <ul class="more" data-render="projects-more"></ul>
      </section>
    </div>

{LIGHTBOX}"""))

write("gallery.html", page("gallery.html","Gallery | Md Sabbir Islam","Photos of Md Sabbir Islam at conferences, fieldwork and the lab.", f"""    <div class="wrap">
      <header class="page-head">
        <h1 class="page-head__title" data-site="gallery_title">Gallery</h1>
        <p class="page-head__lede" data-site="gallery_intro">Moments from conferences, fieldwork and the lab.</p>
      </header>
      <div class="gallery gallery--photos" data-render="gallery" aria-busy="true"></div>
      <p class="list-empty" hidden>Photos are on the way.</p>
{NOSCRIPT}
    </div>

{LIGHTBOX}"""))

# ======================= FUN (game) =======================
fun = f'''    <div class="wrap">
      <header class="page-head page-head--compact">
        <h1 class="page-head__title" data-site="fun_title">Pin the Place</h1>
        <p class="page-head__lede" data-site="fun_intro">How well do you know Bangladesh? Five places, one blank map. Click where you think each place is, then see how close you got.</p>
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
