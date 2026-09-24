---
name: Md Sabbir Islam, portfolio
description: A clean, light, five-page research portfolio with one river-green accent.
colors:
  monsoon-green: "#14532D"
  monsoon-green-deep: "#0E4222"
  monsoon-green-soft: "#E1ECE3"
  mustard: "#E9B824"
  mustard-bright: "#F3C53A"
  ink: "#16201A"
  ink-soft: "#394540"
  muted: "#5B6760"
  page: "#F7F9F6"
  surface: "#ECF1EC"
  line: "#DDE4DD"
  line-strong: "#C3CDC4"
  on-green: "#F5F2E8"
  on-green-soft: "rgba(245, 242, 232, 0.78)"
  scrim: "rgba(12, 14, 16, 0.72)"
  float-shadow: "rgba(10, 12, 14, 0.35)"
  map-water: "#D6E4E4"
  map-land: "#F4F6F2"
  map-bangladesh: "#E1ECE3"
  map-border: "#BFC8C0"
typography:
  poster:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3rem, 1.6rem + 5.4vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  story-stat:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3rem, 2rem + 3.6vw, 5.25rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.045em"
  story-lede:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.55
  finale-mail:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.25rem, 0.9rem + 1.6vw, 2.25rem)"
    fontWeight: 650
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
    backgroundColor: "{colors.mustard}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "46px"
    padding: "0 20px"
  button-primary-hover:
    backgroundColor: "{colors.mustard-bright}"
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

Monsoon: paddy green and mustard on warm white, chosen by the owner. Following Impeccable's colour guide, green owns whole regions (the profile panel and the footer); following the Binance reference, mustard is scarce and only marks primary actions, with ink text on it.

### Primary
- **Monsoon Green** (monsoon-green): profile panel, footer band, page titles, links, current menu item, active filter chip, game map edge.

### Secondary
- **Mustard** (mustard): primary buttons (Email me, Lock in guess), text selection, the role line and fact labels inside the green panel. Never body text on light ground, never a large fill.

### Neutral
- **Ink / Soft Ink / Muted**, **Page / Surface**, **Line / Strong Line**: warm neutrals tinted toward the green.

### Named Rules
**The Scarce Mustard Rule.** Mustard marks the one thing to press. If a screen has two mustard buttons, one is wrong.

## Typography

**Font:** Archivo (variable width), with JetBrains Mono for years and small data.

- **Display:** the name on the Profile page.
- **Page title:** each page's heading.
- **Stat:** thesis values, game distance and final score.
- **Headline:** section titles and the game question.
- **Lede:** page introductions and email addresses.
- **Title / Body / Small / Caption:** card titles, paragraphs, metadata, fine print.

## Layout

**Home is a scroll story** (owner's choice, after the Apple reference: full-bleed bands where the colour change is the divider). Green cover band with name, role, bio and actions; then chapters, one per map project with an image: text on the left (chapter count, big number, label, title, description, links) and a sticky map stage on the right that crossfades to the active chapter's map (IntersectionObserver, no scroll listeners); a mustard reading-progress line under the header (CSS scroll-driven animation where supported); a green "Email me" finale band. On phones the chapters stack with each map under its text. Projects without images are listed under "More projects". Other pages: About (full profile), Research, Gallery, Fun.


A centred 1120px column. Each page opens with a title and a one-line intro, then sections separated by 1px lines. Two columns collapse to one below 820px; the top menu becomes a second row on phones. The game is a 340px panel beside the map on desktop and stacks above the map on phones.

## Elevation & Depth

Flat. Project cards lift 3px with a soft shadow on hover. The gallery viewer is the only floating layer (scrim plus float shadow). Game pins carry a small drop shadow so they read on the map.

## Shapes

6px for small controls, 10px for panels and rows, 16px for cards, gallery images, the photo and the game frame; pills for buttons, chips, tags and the menu.

## Components

- **Content:** every page is rendered from `content/*.json`, edited through Pages CMS (`.pages.yml`). Components below are templates in `assets/js/site.js`.

- **Buttons:** pill, 46px; primary green, secondary white with a line; disabled at 45% opacity.
- **Gallery (photos):** the same borderless card for photos of conferences, fieldwork and the lab.
- **Research story row:** year, type and status on one line, then title, authors (owner in bold), venue and an optional one-line note. Filter chips by type.
- **Project map card (Projects page):** full-bleed map with 16px corners and no border box, title and meta underneath; filter chips above; masonry columns keep each map's natural shape; click opens the viewer with previous, next, open original and click-to-zoom.
- **Pin the Place:** five random places from a list of 21; click to drop a pin, lock in, see the distance line, points (1000 at 0 km, falling off exponentially with a 75 km scale) and a fact; the end screen shows total, rating, best score on the device and a map recap of every guess. The map uses only bundled Natural Earth outlines (water #D9E6EC, land #F6F6F3, Bangladesh #E6F0EC with a green edge); no tile service, no API key.

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
