# sabbir0sojib.github.io

Personal portfolio of **Md Sabbir Islam**, Remote Sensing and Geospatial Deep Learning.
Live at **https://sabbir0sojib.github.io**

Plain HTML, CSS and JavaScript. No build step, nothing to install. GitHub Pages serves it directly.

## Files

| File | What it holds |
|---|---|
| `index.html` | All the text and content. Every section is marked with a comment like `<!-- RESEARCH -->`. |
| `assets/css/site.css` | Colors, fonts and layout. Colors are the variables at the top (`--select` is the yellow). |
| `assets/js/site.js` | Theme switch, active layer, map coordinate readout, full-size map viewer, copy buttons. |
| `assets/img/` | Portrait (`sabbir-portrait.webp` and `.jpg`) and maps (`work/`). |
| `assets/fonts/` | Archivo and JetBrains Mono, self-hosted. |
| `assets/icons.svg` | Icons from Phosphor Icons (MIT). |

## Common edits

**Replace a map with a sharper version.** Upload the new file to `assets/img/work/` with the same name
(`cyclone-tracks-bangladesh.webp`, `wind-bangladesh-2023.webp`, `korail-cycling-accessibility.webp`).
Keep the same layout (same map frame and margins) and the coordinate readout keeps working, because it is
measured as a fraction of the image size. If the new image has a different width/height ratio, update the
`width` and `height` attributes on its `<img>` tag.

**Add a map to the catalog.** In `index.html`, find the `<!-- Map catalog -->` comment, copy one `<li class="entry">`
block, and change the title, the data/method line and the year. Update the Maps count in the Layers panel (`[16]`).

**Add a publication.** Copy a `<tr>` row inside the Publications table. Update the count in the Layers panel (`[4]`).

**Change the status of a paper** (for example when it is accepted): change the text inside `<span class="tag">`.
Use `class="tag tag--done"` for a filled dark tag.

## How the coordinate readout works

Each probe-able map has a `data-geo` attribute with ten numbers:
`x0, y0, lon0, lat0, degX, degY, frameLeft, frameTop, frameRight, frameBottom`.
All are fractions of the image width or height, measured from the map's own graticule:
`(x0, y0)` is where `(lon0, lat0)` sits, `degX`/`degY` is how much of the image one degree spans, and the frame
values limit the readout to inside the map frame. Maps without a graticule (like Korail) simply leave `data-geo` out.

## Design notes

`PRODUCT.md` records who the site is for and the rules for content. The design direction lives in
`.impeccable/surfaces/index-html.md`. Design tooling (`.claude/`, `.impeccable/`, `.playwright/`) is excluded from
the published site by `_config.yml`.

Rule for all text on this site: no em dash or en dash characters.
