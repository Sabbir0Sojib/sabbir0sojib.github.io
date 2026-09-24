# CLAUDE.md

Guide for Claude Code sessions working on this repository, and a template for similar portfolio sites.
Read this first. History and past decisions are in `docs/PROJECT_LOG.md`.

## What this is

Personal portfolio website of **Md Sabbir Islam** (Remote Sensing and Geospatial Deep Learning, Pabna University of Science and Technology, Bangladesh).
Live at https://sabbir0sojib.github.io, served by GitHub Pages from the `main` branch.
Plain HTML, CSS and vanilla JavaScript. No framework, no npm build for the live site.

## Owner preferences (always follow)

- **Never use em dash or en dash characters** anywhere: site text, content, commit messages, chat replies. Use commas, periods or hyphens.
- Wants a **clean, professional portfolio**: white page, dark text, one forest-green accent. He rejected: a GIS-workspace layout, a dark hero with slideshow, a green "Monsoon" panel theme, and a full-page scroll story. Do not reintroduce these.
- Every piece of content must stay **editable in Pages CMS** (see below). Never hardcode new content in HTML or JS.
- Projects and research are shown **newest first by date**.
- Research items are all **equal** (no highlighted thesis, no big numbers).
- Keep replies short and simple; he is not a developer.
- He asked that the four design skills be used on design work (see "Design skills").

## Site structure

| Page | File | Rendered from |
|---|---|---|
| Profile (home) | `index.html` | `content/profile.json` |
| Research | `research.html` | `content/research.json` |
| Projects (maps) | `projects.html` | `content/projects.json` |
| Gallery (photos) | `gallery.html` | `content/gallery.json` |
| Fun: Pin the Place game | `fun.html` | `assets/data/bd-*.geojson` (levels) and `content/places.json` (Landmarks) |
| All pages: titles, intros, footer, contact note | | `content/site.json` |

- HTML pages are thin shells with `data-render="..."` containers and `data-site="key"` text hooks.
- `assets/js/site.js` fetches `content/*.json`, renders every page, then wires filters, lightbox (click to zoom), copy buttons and reveals. `newestFirst()` sorts by `date` (YYYY-MM-DD), falling back to end of `year`.
- `assets/js/game.js` is the geography game with levels Easy (8 divisions), Medium (64 districts), Hard (544 upazilas) from geoBoundaries gbOpen BGD ADM1 to ADM3 (source BBS and OCHA, CC BY 3.0 IGO; old spellings fixed, e.g. Chittagong to Chattogram, Rajshani to Rajshahi), and Landmarks from `content/places.json`. A guess inside the right polygon scores 1000; otherwise `round(1000 * exp(-km / scale))` with km to the nearest border vertex and scale 80 / 45 / 25 / 60. Best score is stored per level. It uses Leaflet map, unlabeled satellite imagery from Esri World Imagery (no API key; automatic fallback to EOX Sentinel-2 cloudless) with bundled Natural Earth outlines (`assets/data/region.geojson`) drawn on top. CARTO tiles were removed because they started requiring a key. Distance by haversine, points = `round(1000 * exp(-km / 75))`.
- `assets/css/site.css`: tokens at the top of `:root` (`--accent` is the green). Ten font sizes, radii 6 / 10 / 16 / pill.
- `assets/icons.svg`: Phosphor icons (MIT) plus the ORCID logo (Simple Icons, CC0).
- `assets/vendor/leaflet/`: Leaflet 1.9.4, self-hosted. Fonts self-hosted in `assets/fonts/` (Archivo, JetBrains Mono).
- Images: maps in `assets/img/work/`, photos in `assets/img/photos/`, portrait `assets/img/sabbir-portrait.*`. WebP, max 1600 px wide.

## Content model (`content/*.json`)

- `projects.json`: `title, year, date, theme (hazard|water|land|city), description, stat, stat_label, image, image_alt, code`. Projects without `image` appear under "More projects".
- `research.json`: `year, date, type (journal|conference|field|thesis|other), status, title, authors, venue, note, link`. The owner's name `Islam, M.S.` is bolded automatically. Status containing presented/published/accepted gets the green badge.
- `profile.json`: `name, role, bio, photo, photo_alt, facts[{label,value}], emails[{label,address}], orcid, linkedin, github, interests[], experience[{when,title,detail}], skills[{group,items}], awards[{year,text}], languages[]`.
- `gallery.json`: `image, title, caption, alt`.
- `places.json`: `name, lat, lng, fact`.
- `site.json`: page titles and intros, `contact_title`, `contact_note`, `footer`.

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
   `sh .claude/skills/impeccable/scripts/impeccable detect --json index.html research.html projects.html gallery.html fun.html assets/css/site.css`
   Keep it at zero findings except the known `cramped-padding` false positive on `.block` (real padding is 56px). Keep `DESIGN.md` in sync, since the detector checks colours, sizes and radii against it.
   Image provenance: `sh .claude/skills/impeccable/scripts/impeccable embed-prompt <img> --prompt "Origin: ..."`, check with `--scan assets/img`.
3. **Playwright CLI** (`playwright-cli`, skill in `.claude/skills/playwright-cli`): screenshots and click tests at 1440 and 390 px widths. In cloud sessions the config `.playwright/cli.config.json` points at `/opt/pw-browsers/chromium`; on a local machine delete or edit that file.
4. **Awesome Design** (`.claude/design-references/<brand>/DESIGN.md`, 74 brands): consult for patterns. Used so far: Pinterest (map cards, filter chips), Wired (equal research rows), Apple (calm, single accent), Binance (scarce accent).

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
