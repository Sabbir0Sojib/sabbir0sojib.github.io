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

## Open items

- More photos for the Gallery (EFAST 2026, CH4Rice fieldwork, drone flights).
- Images for: sea level rise, earthquake hazard, LULC Dhaka, Nepal flood before/after, Landsat mosaic, Landsat harmonic model.
- Thesis figures for the Research page, if the owner wants them.
- The crop suitability image title has a typo ("Banlgladesh") in the owner's original file.
- Check the wind project "stat" value (added when the site had a story layout; currently not displayed).
