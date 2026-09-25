# Project log

History of how this site was built, what was tried and why things are the way they are. Newest entries at the bottom.

## 2026-09-24

1. **Planning.** Owner shared a plan based on the Academic Pages template. Decided on a custom static site instead, so the design skills could shape it. The repo was renamed from `portfolio` to `sabbir0sojib.github.io` and made public (required for free GitHub Pages).
2. **Content source.** Owner's CV (PDF, not published on the site, no phone number, no referees) and his LinkedIn posts. The LinkedIn activity IDs encode post timestamps (`id >> 22` = ms since epoch); these gave the real project dates now in `content/projects.json`.
3. **Skills installed.** Taste (3 of 13 skills), Impeccable, Playwright CLI, Awesome Design (74 DESIGN.md references).
4. **Version 1: GIS workspace.** Layers panel, status bar, live longitude/latitude probe measured from each map's graticule. Owner: looked sloppy, only one map visible.
5. **Version 2: dark hero slideshow.** Owner: broken on his screen, wanted separate sections.
6. **Version 3: five separate pages, clean light theme.** Profile, Research, Projects, Gallery, Fun. Owner clarified: Projects = maps, Gallery = photos; research items must be equal; bio must be personal; no photo in the header; ORCID 0009-0001-9474-9287.
7. **Fun page.** First an interactive map of work places (owner: odd), then **Pin the Place**, a geography game. CARTO basemap started showing "API KEY REQUIRED", so the map now uses bundled Natural Earth 1:10m outlines only.
8. **Editable content.** All content moved to `content/*.json`, rendered by `site.js`, editable through Pages CMS (`.pages.yml`, validated against the Pages CMS schema). Owner has used it successfully.
9. **Theme experiments.** "Monsoon" green and mustard panels, then a full scroll-story home page. Owner rejected both: wants a plain professional portfolio with better colours.
10. **Current design.** White page, dark ink, forest green `#166534` accent, light footer. Contact as labelled cards. Projects in two large columns with "View full size", sorted newest first by date. Page titles, intros and footer editable in `content/site.json`.
11. **Workflow note.** The owner commits to `main` via Pages CMS; merge `origin/main` before every push.
12. **Game levels.** Pin the Place gained Easy (divisions), Medium (districts), Hard (upazilas) and Landmarks levels, on unlabeled satellite imagery (Esri, EOX fallback), with a new layout for desktop and mobile.
13. **Projects vs Maps.** Split into Projects (GitHub repos, `content/projects.json`) and Maps (single maps, `content/maps.json`). Landmarks level got 37 famous tourist spots.
14. **Readable research and final audit.** Research items became two-column cards (year, type and status on the left; paper on the right). Full-site check with all four skills: Taste pre-flight clean, Impeccable detector clean except the known padding false positive, Playwright sweep of 6 pages at 1440 and 390 px with no errors, broken images, broken links, overflow or wrapped buttons; Awesome Design rules (single accent, small radius scale, flat cards) hold. Header made solid on phones.
15. **Phone menu.** On phones the six nav links overflowed and cut off Fun. The header now shows a Menu button with a dropdown under 820 px; checked at 360, 390 and 1440 px.
16. **Editable map tags.** The fixed Theme dropdown became free-text Tags (several per map allowed). Maps page filter buttons are generated from the tags in use.
17. **Auto image shrinking.** Owner wants to upload full-resolution images. A GitHub Action now converts uploads to WebP (max 2400 px) and updates the content paths.
18. **Structure and polish upgrade.** Owner: the site was good but looked average. Kept the white page and green accent, and changed the rest: Newsreader serif for headings, the bio and citations; green-tinted neutrals; Home became a front page (facts strip, latest 3 maps, recent research, code projects, then CV sections in side-heading layout); maps shown whole on a light mat with a print shadow; Projects page as rows; full footer with all pages and profiles; one entrance animation on the hero only.
19. **Overlake-style green bands.** Owner pointed to overlake.org as the look he wants. Header, a band on every page, the home hero and footer became deep forest green; content moved to warm paper; yellow became the one action colour (Email me, See my maps, Menu). Where Overlake draws trees, the bands show real terrain: SRTM contours of the Chittagong Hill Tracts (`.impeccable/terrain.py`). Home gained a big headline (editable), a facts card over the hero edge and a green contact band. overlake.org itself is blocked by this cloud environment's network policy, so the design was read from his screenshot.
20. **Hero fix and rhythm.** Owner found the statement headline odd. Taste explained why (4-line headline, 6 hero text elements, duplicate Email me). Hero now: name as the one-line headline, yellow role, bio, See my maps and Read my research. Home rhythm varied: projects as 2 by 2 preview cards, skills in one panel, interests/awards/languages in three columns, contact note under the title. Tested with all four skills.
21. **Sharing and search.** Link preview card (green, name, role, university, photo, URL) for LinkedIn, Facebook, WhatsApp and X; canonical URLs; sitemap.xml and robots.txt; a green 404 page ("This page is off the map.") that works at any address depth. No custom domain (owner has none); everything stays on sabbir0sojib.github.io.

## Open items

- More photos for the Gallery (EFAST 2026, CH4Rice fieldwork, drone flights).
- Images for: sea level rise, earthquake hazard, LULC Dhaka, Nepal flood before/after, Landsat mosaic, Landsat harmonic model.
- Thesis figures for the Research page, if the owner wants them.
- The crop suitability image title has a typo ("Banlgladesh") in the owner's original file.
- The Tree Cover Loss map has year "2001-2015" in maps.json while its title says 2001-2025.
- Check the wind project "stat" value (added when the site had a story layout; currently not displayed).
