# sabbir0sojib.github.io

Personal portfolio of **Md Sabbir Islam**, Remote Sensing and Geospatial Deep Learning.
Live at **https://sabbir0sojib.github.io**

Plain HTML, CSS and JavaScript. No build step, nothing to install. GitHub Pages serves it directly.

## Files

| File | What it holds |
|---|---|
| `index.html` | Profile page (photo, bio, interests, education, skills, awards, contact). |
| `research.html` | All research as equal rows. Copy one `<li class="story">` to add an item. |
| `projects.html` | Your maps. Copy one `<figure class="shot">` to add a map project. |
| `gallery.html` | Photos (conferences, fieldwork, lab). Put photos in `assets/img/photos/`. |
| `fun.html` + `assets/js/game.js` | Pin the Place, a Bangladesh geography game. Add a place in the `PLACES` list in `game.js`. |
| `assets/css/site.css` | Colors, fonts and layout. Colors are the variables at the top (`--accent` is the green). |
| `assets/js/site.js` | Copy buttons, scroll reveals, gallery lightbox. |
| `assets/img/` | Portrait (`sabbir-portrait.webp` and `.jpg`) and maps (`work/`). |
| `assets/fonts/` | Archivo and JetBrains Mono, self-hosted. |
| `assets/icons.svg` | Icons from Phosphor Icons (MIT). |

## Common edits

**Replace a map with a sharper version.** Upload it to `assets/img/work/` with the same file name.

**Add a map project.** Upload the image to `assets/img/work/`, then in `projects.html` copy one `<figure class="shot">` block and change the image, title, text and `data-cat` (hazard, water, land or city).

**Add a photo.** Upload it to `assets/img/photos/`, then copy the `<figure class="shot">` block in `gallery.html`.

**Add a place to the game.** In `assets/js/game.js`, copy one object in `PLACES` and set `at: [latitude, longitude]` and a short fact.

**Add research.** In `research.html`, copy one `<li class="story">` block (data-cat: journal, conference or field).

**After editing CSS or JS,** change `?v=` in the page `<head>` (or `VER` in `.impeccable/build-pages.py`) so browsers load the new file.

Rule for all text on this site: no em dash or en dash characters.
