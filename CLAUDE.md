# CLAUDE.md

Guide for Claude Code sessions working on this repository, and a template for similar portfolio sites.
Read this first. History and past decisions are in `docs/PROJECT_LOG.md`.

## What this is

Personal portfolio website of **Md Sabbir Islam** (Remote Sensing and Geospatial Deep Learning, Pabna University of Science and Technology, Bangladesh).
Live at https://sabbir0sojib.github.io, served by GitHub Pages from the `main` branch.
Plain HTML, CSS and vanilla JavaScript. No framework, no npm build for the live site.

## Owner preferences (always follow)

- **Never use em dash or en dash characters** anywhere: site text, content, commit messages, chat replies. Use commas, periods or hyphens.
- Current look (his choice, 2026-09-25, after the Overlake School site he pointed to): deep forest-green utility bar, header, page bands and footer; warm paper content; serif headings; yellow only for actions. Earlier he rejected a GIS-workspace layout, a dark hero slideshow, a green "Monsoon" panel theme and a full-page scroll story. Do not reintroduce those, and do not drop the green bands without asking.
- Every piece of content must stay **editable in Pages CMS** (see below). Never hardcode new content in HTML or JS.
- Projects, maps and research are shown **newest first by date**.
- **Projects = work with a GitHub repo; Maps = single map images; Gallery = photos.** Keep them separate.
- Research is an **academic publication list**: grouped by type, numbered, citation style, all items equal (no highlighted thesis, no big numbers, no cards).
- Keep replies short and simple; he is not a developer.
- He asked that the four design skills be used on design work (see "Design skills").

## Site structure

| Page | File | Rendered from |
|---|---|---|
| Profile (home) | `index.html` | `content/profile.json`, plus the newest 3 maps, 3 research items and 4 projects |
| Research | `research.html` | `content/research.json` |
| Projects (GitHub repos) | `projects.html` | `content/projects.json` |
| Maps (single maps) | `maps.html` | `content/maps.json` |
| Gallery (photos) | `gallery.html` | `content/gallery.json` |
| Fun: Pin the Place game | `fun.html` | `assets/data/bd-*.geojson` (levels) and `content/places.json` (Landmarks) |
| All pages: titles, intros, footer, contact note | | `content/site.json` |

- HTML pages are thin shells with `data-render="..."` containers and `data-site="key"` text hooks.
- `assets/js/site.js` fetches `content/*.json`, renders every page, then wires filters, lightbox (click to zoom), copy buttons and reveals. `newestFirst()` sorts by `date` (YYYY-MM-DD), falling back to end of `year`.
- `assets/js/game.js` is the geography game with levels Easy (8 divisions), Medium (64 districts), Hard (544 upazilas) from geoBoundaries gbOpen BGD ADM1 to ADM3 (source BBS and OCHA, CC BY 3.0 IGO; old spellings fixed, e.g. Chittagong to Chattogram, Rajshani to Rajshahi), and Landmarks from `content/places.json`. A guess inside the right polygon scores 1000; otherwise `round(1000 * exp(-km / scale))` with km to the nearest border vertex and scale 80 / 45 / 25 / 60. Best score is stored per level. It uses Leaflet map, unlabeled satellite imagery from Esri World Imagery (no API key; automatic fallback to EOX Sentinel-2 cloudless) with bundled Natural Earth outlines (`assets/data/region.geojson`) drawn on top. CARTO tiles were removed because they started requiring a key. Distance by haversine, points = `round(1000 * exp(-km / 75))`.
- `assets/css/site.css`: tokens at the top of `:root` (`--forest` bands, `--sun` yellow actions, `--accent` green links on paper, warm neutrals). Serif Newsreader for headings, statements and citations; Archivo for the rest. Radii 6 / 10 / 16 / pill. Maps always sit whole on a mat (`.mat`), never cropped. Type ramp and colours are listed in `DESIGN.md`.
- Every page: utility bar (ORCID, LinkedIn, GitHub, Email), sticky green header (yellow Email me pill; yellow Menu pill on phones), a green `.band` with the page title, content on paper, dark green footer.
- Home: green hero band (name as the headline, role, bio, See my maps and Read my research, photo), a white facts card overlapping the hero edge, Latest maps (1 large + 2), Recent research (side heading), Code projects (2 by 2 cards), Education and experience (side heading), Skills (one panel), Research interests / Awards / Languages (three columns); then a green contact band. He disliked a long statement headline ("Mapping trees, floods and cyclones across Bangladesh"); keep the name as the headline.
- Test with all four skills before shipping design work: Taste pre-flight (hero max 2-line headline and 4 text elements, no eyebrows, no em dashes, no wrapped buttons, one label per intent, max one middle dot per line), Impeccable detector, a Playwright sweep of all 6 pages at 1440 and 390 px, and a check against the Awesome Design reference used.
- Band background: `assets/img/terrain.svg`, real contours of the Chittagong Hill Tracts from SRTM (Mapzen Terrain Tiles, AWS Open Data). Rebuild with `pip install numpy matplotlib scipy pillow && python3 .impeccable/terrain.py assets/img/terrain.svg`.
- `assets/icons.svg`: Phosphor icons (MIT) plus the ORCID logo (Simple Icons, CC0).
- `assets/vendor/leaflet/`: Leaflet 1.9.4, self-hosted. Fonts self-hosted in `assets/fonts/` (Archivo, Newsreader regular and italic, JetBrains Mono; all SIL OFL).
- Images: maps in `assets/img/work/`, photos in `assets/img/photos/`, portrait `assets/img/sabbir-portrait.*`. WebP, max 1600 px wide.

## Content model (`content/*.json`)

- `projects.json` (code projects): `title, year, date, description, tools (comma separated), repo, image, image_alt`. Cards link to GitHub; no image gives a green GitHub tile.
- `maps.json` (single maps): `title, year, date, tags (list of free-text labels), description, image, image_alt`. Filter buttons are built from the tags in use (most used first; matching ignores case), so the owner adds, renames or deletes tags in Pages CMS. Old `theme` keys still work as a fallback. Maps without `image` appear under "More maps".
- `research.json`: `year, date, type (journal|conference|field|thesis|other), status, title, authors, venue, note, link`. The owner's name `Islam, M.S.` is bolded automatically. Status containing presented/published/accepted gets the green badge.
- `profile.json`: `name, role, bio, photo, photo_alt, photo_caption, facts[{label,value}], emails[{label,address}], orcid, linkedin, github, interests[], experience[{when,title,detail}], skills[{group,items}], awards[{year,text}], languages[]`.
- `gallery.json`: `image, title, caption, alt`.
- `places.json`: `name, lat, lng, fact`.
- `site.json`: page titles and intros, home section titles (`home_maps_title`, `home_research_title`, `home_projects_title`), `contact_title`, `contact_note`, `footer_tagline`, `footer`.

**Uploads can be any size.** `.github/workflows/shrink-images.yml` runs on every push to `main` that touches `assets/img/`: new JPG/PNG become WebP (max 2400 px, quality 82, original deleted, paths in `content/*.json` and `*.html` rewritten), big WebP files are re-encoded. It commits the result and requests a Pages build. `assets/img/sabbir-portrait.jpg` is kept (social preview). Script: `.github/scripts/shrink-images.py`.

Image paths in JSON start with `/assets/img/...` (Pages CMS writes them this way).

## Pages CMS (owner's editor)

- Owner edits at https://app.pagescms.org (sign in with GitHub). Config: `.pages.yml`.
- **When you add a content field, add it to `.pages.yml` too.** Quote any label containing a comma or parentheses.
- Validate `.pages.yml` against the real Pages CMS schema before pushing:
  ```bash
  mkdir -p /tmp/pcv && cd /tmp/pcv
  curl -sS https://raw.githubusercontent.com/pagescms/pagescms/main/lib/config-schema.ts -o config-schema.ts
  sed -i 's#import { fieldTypes } from "@/fields/registry";#const fieldTypes = new Set(["boolean","code","date","file","image","number","reference","rich-text","select","string","text","uuid"]);#' config-schema.ts
  npm init -y >/dev/null && npm i -s zod@3 yaml tsx
  cat > check.ts <<'EOF'
  import YAML from "yaml"; import { readFileSync } from "fs"; import { ConfigSchema } from "./config-schema";
  const r = ConfigSchema.safeParse(YAML.parse(readFileSync(process.argv[2], "utf8")));
  console.log(r.success ? "VALID" : JSON.stringify(r.error.issues, null, 1));
  EOF
  npx tsx check.ts /path/to/repo/.pages.yml
  ```

## Building and publishing

1. Page shells are generated by `python3 .impeccable/build-pages.py` (edit the generator, not the HTML).
2. After changing CSS or JS, **bump `VER`** in `.impeccable/build-pages.py` and rerun it. This adds `?v=` to asset URLs so browsers load new files.
3. Preview locally: `python3 -m http.server 4000` in the repo, open http://127.0.0.1:4000 (content loads via fetch, so `file://` will not work).
4. Commit on the working branch, then push to `main`.
5. **The owner edits `main` through Pages CMS.** Before pushing, always `git fetch origin main` and merge it (never force-push or rebase over his commits). If a push is rejected, fetch and merge first.
6. GitHub Pages deploys in 1 to 2 minutes; tell the owner to reload with Ctrl + Shift + R.

`_config.yml` excludes tooling and docs from the published site (Jekyll skips dotfolders anyway).

## Design skills (installed in `.claude/skills/`)

Use all four on design work:
1. **Taste** (`design-taste-frontend`, `minimalist-ui`, `redesign-existing-projects`): design read, redesign audit, pre-flight checklist (zero em dashes, one accent, no wrapped buttons, no scroll listeners, contrast).
2. **Impeccable** (`impeccable`): reference guides in `.claude/skills/impeccable/reference/`, and the detector:
   `sh .claude/skills/impeccable/scripts/impeccable detect --json index.html research.html projects.html maps.html gallery.html fun.html assets/css/site.css`
   Keep it at zero findings except the known false positives: `cramped-padding` on `.block`, `.split`, `.utility` and `.band` (the inner `.wrap` and page head carry the padding), and `cream-palette` (the warm paper page is the owner's Overlake reference). Keep `DESIGN.md` in sync, since the detector checks colours, sizes and radii against it.
   Image provenance: `sh .claude/skills/impeccable/scripts/impeccable embed-prompt <img> --prompt "Origin: ..."`, check with `--scan assets/img`.
3. **Playwright CLI** (`playwright-cli`, skill in `.claude/skills/playwright-cli`): screenshots and click tests at 1440 and 390 px widths. In cloud sessions the config `.playwright/cli.config.json` points at `/opt/pw-browsers/chromium`; on a local machine delete or edit that file.
4. **Awesome Design** (`.claude/design-references/<brand>/DESIGN.md`, 74 brands): consult for patterns. Used so far: Overlake School (owner's reference, not in the folder: green bands, yellow action pill, utility bar), Apple (work on a quiet pedestal, full footer), Pinterest (filter chips), Wired (equal research rows).

Reinstall skills in a new project:
```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend minimalist-ui redesign-existing-projects --agent claude-code -y
npx skills add pbakaus/impeccable --agent claude-code -y
npm install -g @playwright/cli@latest && playwright-cli install --skills
git clone --depth 1 https://github.com/VoltAgent/awesome-design-md && cp -r awesome-design-md/design-md .claude/design-references
```

## Reusing this for a new portfolio

Copy the repo, then replace `content/*.json`, images in `assets/img/`, `name`/`VER` and meta text in `.impeccable/build-pages.py`, and colours in `:root` of `assets/css/site.css`. Update `PRODUCT.md`, `DESIGN.md` and `.pages.yml`. Everything else is generic.

## Other records

- `PRODUCT.md`: audience, purpose, content rules.
- `DESIGN.md`: design tokens and rules (machine-readable front matter).
- `README.md`: owner-facing editing guide.
- `docs/PROJECT_LOG.md`: history of decisions.
