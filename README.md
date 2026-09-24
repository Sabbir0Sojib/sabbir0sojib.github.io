# sabbir0sojib.github.io

Personal portfolio of **Md Sabbir Islam**, Remote Sensing and Geospatial Deep Learning.
Live at **https://sabbir0sojib.github.io**

Plain HTML, CSS and JavaScript. No build step, nothing to install. GitHub Pages serves it directly.

## Files

| File | What it holds |
|---|---|
| `index.html` | Profile page (photo, bio, interests, education, skills, awards, contact). |
| `research.html` | Thesis and publications. |
| `projects.html` | Project cards. Copy one `<article class="card">` to add a project. |
| `gallery.html` | Map gallery. Copy one `<figure class="shot">` to add a map. |
| `fun.html` + `assets/js/fun.js` | Interactive map of your work. Add a place in the `PLACES` list in `fun.js`. |
| `assets/css/site.css` | Colors, fonts and layout. Colors are the variables at the top (`--accent` is the green). |
| `assets/js/site.js` | Copy buttons, scroll reveals, gallery lightbox. |
| `assets/img/` | Portrait (`sabbir-portrait.webp` and `.jpg`) and maps (`work/`). |
| `assets/fonts/` | Archivo and JetBrains Mono, self-hosted. |
| `assets/icons.svg` | Icons from Phosphor Icons (MIT). |

## Common edits

**Replace a map with a sharper version.** Upload it to `assets/img/work/` with the same file name.

**Add a map.** Upload the image to `assets/img/work/`, then in `gallery.html` copy one `<figure class="shot">` block and change the image, title and text.

**Add a place to the Fun map.** In `assets/js/fun.js`, copy one object in `PLACES` and set `at: [latitude, longitude]`.

**Add a publication.** In `research.html`, copy one `<li class="pub">` block.

Rule for all text on this site: no em dash or en dash characters.
