---
name: Md Sabbir Islam, portfolio
description: A clean, light, five-page research portfolio with one river-green accent.
colors:
  forest-green: "#166534"
  forest-green-deep: "#14532D"
  green-tint: "#EAF4EE"
  mustard: "#E9B824"
  mustard-bright: "#F3C53A"
  ink: "#111827"
  ink-soft: "#374151"
  muted: "#5F6672"
  page: "#FFFFFF"
  surface: "#F4F6F5"
  line: "#E5E7EB"
  line-strong: "#D1D5DB"
  on-green: "#FFFFFF"
  on-green-soft: "rgba(255, 255, 255, 0.8)"
  scrim: "rgba(12, 14, 16, 0.72)"
  float-shadow: "rgba(10, 12, 14, 0.35)"
  map-water: "#D6E4E4"
  map-night: "#0B1F2A"
  map-highlight: "#FACC15"
  map-land: "#F4F6F2"
  map-bangladesh: "#EAF4EE"
  map-border: "#BFC8C0"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3.4vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  page-title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 1.5rem + 3vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  stat:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 1.6vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1vw, 1.875rem)"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lede:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.65
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 650
    lineHeight: 1.3
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  small:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
  data:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.85em"
    fontWeight: 400
rounded:
  small: "6px"
  standard: "10px"
  large: "16px"
  pill: "999px"
components:
  button-primary:
    backgroundColor: "{colors.forest-green}"
    textColor: "{colors.on-green}"
    rounded: "{rounded.pill}"
    height: "46px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.forest-green-deep}"
  button-secondary:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "46px"
    padding: "0 20px"
  nav-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-green}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  filter-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
  filter-chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-green}"
  tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
---

# Design System: Md Sabbir Islam, portfolio

## Overview

**Creative North Star: "The Clean Field Report"**

Plain light pages, dark text, generous space and one river-green accent. Each page does one job (Profile, Research, Projects, Gallery, Fun) and the maps supply the colour. The owner chose this look after rejecting a GIS-workspace layout and a dark hero. The Projects map grid follows the Pinterest reference in `.claude/design-references/pinterest` (the image is the card, filter chips flip to ink when active, the only shadow is under the floating viewer). The Research page follows the Wired reference: every item is an equal story row with a type line, title, byline and venue, split by 1px lines, with no highlighted numbers.

**Key Characteristics:**
- Separate pages with a sticky top menu showing the name as plain text; the current page is an ink pill.
- River green only for primary actions, links, the role line, points and the game's answer pins.
- Archivo throughout; JetBrains Mono only for years and small data.
- A tight scale: ten font sizes, four radii (6, 10, 16, pill).

## Colors

Professional light theme chosen by the owner after rejecting the story layout: white page, dark ink text, one forest-green accent.

### Primary
- **Forest Green** (forest-green): primary buttons, links, role line, fact labels, active filter chip, current menu item text (on green-tint), tags, game map edge.

### Neutral
- **Ink / Soft Ink / Muted**, **Page / Surface**, **Line / Strong Line**: cool neutral greys.

### Named Rules
**The One Green Rule.** Green marks what can be clicked or what matters most. The maps bring every other colour.

## Typography

**Font:** Archivo (variable width), with JetBrains Mono for years and small data.

- **Display:** the name on the Profile page.
- **Page title:** each page's heading.
- **Stat:** thesis values, game distance and final score.
- **Headline:** section titles and the game question.
- **Lede:** page introductions and email addresses.
- **Title / Body / Small / Caption:** card titles, paragraphs, metadata, fine print.

## Layout



A centred 1120px column. Each page opens with a title and a one-line intro, then sections separated by 1px lines. Two columns collapse to one below 820px; the top menu becomes a second row on phones. The game is a 340px panel beside the map on desktop and stacks above the map on phones.

## Elevation & Depth

Flat. Project cards lift 3px with a soft shadow on hover. The gallery viewer is the only floating layer (scrim plus float shadow). Game pins carry a small drop shadow so they read on the map.

## Shapes

6px for small controls, 10px for panels and rows, 16px for cards, gallery images, the photo and the game frame; pills for buttons, chips, tags and the menu.

## Components

- **Content:** every page is rendered from `content/*.json`, edited through Pages CMS (`.pages.yml`). Components below are templates in `assets/js/site.js`.

- **Buttons:** pill, 46px; primary green, secondary white with a line; disabled at 45% opacity.
- **Contact cards:** two-column grid of white cards (icon in a green-tint circle, small label, full value that wraps, icon-only copy button). One card per email, ORCID, LinkedIn and GitHub.
- **Ordering:** projects and research render newest year first; items in the same year keep their CMS order.
- **Gallery (photos):** the same borderless card for photos of conferences, fieldwork and the lab.
- **Research story row:** year, type and status on one line, then title, authors (owner in bold), venue and an optional one-line note. Filter chips by type.
- **Project map card (Projects page):** full-bleed map with 16px corners and no border box, title and meta underneath; filter chips above; masonry columns keep each map's natural shape; click opens the viewer with previous, next, open original and click-to-zoom.
- **Pin the Place:** five random places from a list of 21; click to drop a pin, lock in, see the distance line, points (1000 at 0 km, falling off exponentially with a 75 km scale) and a fact; the end screen shows total, rating, best score on the device and a map recap of every guess. The map shows unlabeled satellite imagery (Esri World Imagery, fallback EOX Sentinel-2 cloudless, no API key) with a yellow Bangladesh outline, white neighbour borders, yellow answer pins and white distance lines.

## Do's and Don'ts

### Do:
- **Do** keep each page focused on one topic.
- **Do** put maps in Projects (with `data-cat` hazard, water, land or city) and photos in Gallery.
- **Do** keep every research item equal; no single item gets a bigger box or big numbers.
- **Do** keep text free of em dash and en dash characters (owner rule).
- **Do** stay on the ten-size, four-radius scale.

### Don't:
- **Don't** add a second accent colour.
- **Don't** use dark full-width sections; the site is light throughout.
- **Don't** put borders or boxes around gallery images; the map is the card.
- **Don't** add empty diagrams or decorative grids; every visual shows real work.
