---
name: Md Sabbir Islam, portfolio
description: A clean, light, five-page research portfolio with one river-green accent.
colors:
  river-green: "#0E6B58"
  river-green-deep: "#0A5747"
  river-green-soft: "#E3EFEB"
  ink: "#17191C"
  ink-soft: "#3D4247"
  muted: "#5C6268"
  page: "#FCFCFB"
  surface: "#F3F4F2"
  line: "#E2E4E1"
  line-strong: "#CDD1CD"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3.4vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1vw, 1.875rem)"
    fontWeight: 650
    lineHeight: 1.2
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
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
    backgroundColor: "{colors.river-green}"
    textColor: "{colors.page}"
    rounded: "{rounded.pill}"
    height: "46px"
    padding: "0 20px"
  nav-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.page}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  tag:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
---

# Design System: Md Sabbir Islam, portfolio

## Overview

**Creative North Star: "The Clean Field Report"**

Plain white pages, dark text, generous space and one river-green accent. Each page does one job (Profile, Research, Projects, Gallery, Fun) and the work, especially the maps, supplies the colour. The owner chose this look after rejecting a GIS-workspace layout and a dark hero.

**Key Characteristics:**
- Separate pages with a sticky top menu; the current page is a dark pill.
- River green only for primary actions, links, key numbers and pins.
- Archivo throughout, slightly expanded for headings; mono only for years and small data.
- Soft grey panels, 1px lines, rounded 10 to 16px containers, pill buttons and tags.

## Colors

### Primary
- **River Green** (river-green): primary buttons, links, the role line, thesis numbers, map pins, Bangladesh outline on the map.

### Neutral
- **Ink / Soft Ink / Muted** (ink, ink-soft, muted): text hierarchy.
- **Page / Surface** (page, surface): the page and soft panels (thesis box, contact rows, tags).
- **Line / Strong Line** (line, line-strong): dividers and outlines.

### Named Rules
**The One Green Rule.** Green marks what can be clicked or what matters most. Nothing else is coloured; the maps bring the colour.

## Typography

**Font:** Archivo (variable width), with JetBrains Mono for years and small data.

- **Display:** the name and page titles.
- **Headline:** section titles.
- **Body:** paragraphs, max about 64 characters wide.
- **Data:** years and small numbers only.

## Layout

A centred 1120px column. Each page opens with a large title and one-line intro, then sections separated by 1px lines. Two columns collapse to one below 820px; the top menu becomes a second row on phones.

## Elevation & Depth

Flat. Project cards lift slightly on hover (translate 3px, soft shadow). The gallery lightbox is the only floating layer.

## Shapes

10px for panels, 16px for cards and the photo, pills for buttons, tags and the menu.

## Components

- **Buttons:** pill, 46px; primary is green, secondary is white with a line.
- **Project card:** image on top (the owner's map or the GitHub preview, with a green fallback tile), title and year, one sentence, tool tags, "View code".
- **Gallery:** masonry of maps on white; click opens a lightbox with previous, next, open original and click-to-zoom.
- **Map of my work:** Leaflet map (CARTO light tiles, bundled country outlines), numbered green pins with popups, a side list that flies to each place, live coordinates.

## Do's and Don'ts

### Do:
- **Do** keep each page focused on one topic.
- **Do** add new maps to the Gallery and, if they have a place, as a pin on the Fun map.
- **Do** keep text free of em dash and en dash characters (owner rule).

### Don't:
- **Don't** add a second accent colour.
- **Don't** use dark full-width sections; the site is light throughout.
- **Don't** add empty diagrams or decorative grids; every visual shows real work.
