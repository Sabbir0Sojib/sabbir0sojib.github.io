---
name: Md Sabbir Islam, portfolio
description: A six-page research portfolio after the Overlake School site. Deep forest-green header, hero and footer over real terrain contours, warm paper pages, serif headings, one yellow action colour.
colors:
  forest: "#0F3B24"
  forest-deep: "#0B2E1B"
  forest-green: "#166534"
  forest-green-deep: "#14532D"
  green-tint: "#E4EDE1"
  sun: "#F5B82E"
  sun-hover: "#F8C75A"
  mustard: "#E9B824"
  ink: "#14201A"
  ink-soft: "#3B463F"
  muted: "#5B635D"
  paper: "#FBF9F4"
  card: "#FFFFFF"
  surface: "#F2EFE6"
  surface-hover: "#E9E5DA"
  line: "#E5E0D4"
  line-strong: "#D2CCBE"
  on-forest: "#FFFFFF"
  on-forest-soft: "#BFE0C8"
  forest-line: "rgba(255, 255, 255, 0.14)"
  forest-card: "rgba(255, 255, 255, 0.05)"
  forest-card-hover: "rgba(255, 255, 255, 0.08)"
  forest-card-line-hover: "rgba(255, 255, 255, 0.32)"
  ghost-line: "rgba(255, 255, 255, 0.45)"
  ghost-fill: "rgba(255, 255, 255, 0.06)"
  copy-line: "rgba(255, 255, 255, 0.35)"
  print-shadow-near: "rgba(20, 32, 26, 0.08)"
  print-shadow-far: "rgba(20, 32, 26, 0.38)"
  print-shadow-lift: "rgba(20, 32, 26, 0.45)"
  card-shadow-near: "rgba(20, 32, 26, 0.06)"
  soft-shadow: "rgba(20, 32, 26, 0.4)"
  tooltip-shadow: "rgba(20, 32, 26, 0.18)"
  badge: "rgba(20, 32, 26, 0.84)"
  scrim: "rgba(20, 32, 26, 0.72)"
  float-shadow: "rgba(20, 32, 26, 0.35)"
  loading-veil: "rgba(255, 255, 255, 0.94)"
  map-night: "#0B1F2A"
  map-highlight: "#FACC15"
  pin-shadow: "rgba(0, 0, 0, 0.45)"
typography:
  display:
    fontFamily: "Newsreader, Georgia, Times New Roman, serif"
    fontSize: "clamp(3rem, 1.9rem + 4.6vw, 6rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.03em"
  page-title:
    fontFamily: "Newsreader, Georgia, Times New Roman, serif"
    fontSize: "clamp(2.5rem, 1.7rem + 3.2vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  page-title-compact:
    fontFamily: "Newsreader, Georgia, Times New Roman, serif"
    fontSize: "clamp(2.25rem, 1.6rem + 2vw, 3rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  game-final:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 1.5rem + 3vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.035em"
  game-distance:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 1.6vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  section-title:
    fontFamily: "Newsreader, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.75rem, 1.4rem + 1.2vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Newsreader, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.5rem, 1.25rem + 0.8vw, 1.875rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  standfirst:
    fontFamily: "Newsreader, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.1875rem, 1.05rem + 0.5vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
  brand:
    fontFamily: "Newsreader, Georgia, Times New Roman, serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.2
  citation:
    fontFamily: "Newsreader, Georgia, Times New Roman, serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.6
  signature:
    fontFamily: "Newsreader, Georgia, Times New Roman, serif"
    fontSize: "1.75rem"
    fontWeight: 500
    lineHeight: 1.1
  lede:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.65
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 650
    lineHeight: 1.35
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  small:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  caption:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
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
    textColor: "{colors.on-forest}"
    underline: "2px {colors.sun}"
    padding: "10px 12px"
  action-pill:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "44px to 48px"
    padding: "0 20px"
  band:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.on-forest}"
    background: "assets/img/terrain.svg, masked to fade out on the left"
  filter-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
  filter-chip-active:
    backgroundColor: "{colors.forest-green}"
    textColor: "{colors.on-green}"
  map-mat:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.large}"
    padding: "14px to 24px"
  tag:
    backgroundColor: "{colors.green-tint}"
    textColor: "{colors.forest-green}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
---

# Design System: Md Sabbir Islam, portfolio

## Overview

**Creative North Star: "Field Journal in the Hills"**

After the Overlake School website (owner's reference, overlake.org): a deep forest-green header and hero that read as one band, a big white serif statement, a single bright yellow action colour, and warm paper pages below. Where Overlake draws a treeline, this site draws real terrain: contour lines and soft elevation bands of the Chittagong Hill Tracts from SRTM (`assets/img/terrain.svg`, built by `.impeccable/terrain.py`). The owner earlier rejected a GIS-workspace layout, a dark slideshow hero, a "Monsoon" panel theme and a full-page scroll story; this green band is his own later choice.

References used: Overlake School (green bands, yellow action pill, utility bar, serif statement), Apple (work on a quiet pedestal, full footer), Wired (equal research rows), Pinterest (filter chips).

**Key Characteristics:**
- Rhythm on every page: dark utility bar, green header, green band (page title, or the home hero), warm paper content, dark green footer. Home adds a green contact band before the footer.
- Serif (Newsreader) for the brand, statements, titles, the bio line, citations. Archivo for everything else. JetBrains Mono only for years, repository paths and tool lists.
- Yellow (sun) only for actions and small highlights on green: the Email me and See my maps pills, the Menu button, the current-page underline, contact icons, footer headings.
- Maps are never cropped: they sit whole on a mat with a soft print shadow.
- Warm paper page (#FBF9F4) is deliberate (Overlake reference), not a default cream.

## Colors

### Primary
- **Forest** (forest, forest-deep): header, bands, utility bar and footer.
- **Sun** (sun): the action colour. Always dark ink text on it.
- **Forest Green** (forest-green): links and green text accents on paper (role line on paper, fact labels, "All maps" links, tags).

### Neutral
- **Ink / Soft Ink / Muted** on **Paper / Card / Surface**, with **Line / Strong Line**: one warm family. On green, secondary text uses the green-tinted **on-forest-soft**, never grey.

### Named Rules
**Green holds, yellow acts.** Green is the ground and the brand; yellow marks what to press. The maps bring every other colour. Mustard only appears in the game's progress dots.

## Typography

- **Display:** your name in the home hero (one line on every screen).
- **Page title / compact page title:** each page's heading.
- **Section title:** home sections, research groups, "More maps".
- **Headline:** project titles on the Projects page, the game question.
- **Standfirst:** the bio under the name.
- **Citation:** research entries (venue in true italic).
- **Lede / Title / Body / Small / Caption:** page intros, card titles, paragraphs, metadata, labels.

Tracking stays between -0.01em and -0.03em on serif headings; body text never tracks.

## Layout

A centred 1200px column (Maps page 1360px). Page titles sit in a green band with generous padding; content follows on paper. On Home the facts card overlaps the hero's lower edge; sections are separated by 1px rules with 44 to 80px of space; side-heading sections use a 15rem title column. Side headings collapse below 960px, the hero, grids and the utility bar below 820px (the header then shows a yellow Menu pill that opens a green dropdown).

## Elevation & Depth

Flat. The only shadows: the facts card over the hero edge, the print shadow under a map on its mat (it lifts 3px on hover), the viewer (scrim plus float shadow) and game pins.

## Shapes

6px for small controls, 10px for rows and inner panels, 16px for mats, photos, contact cards and the game frame; pills for buttons, chips, tags and the menu.

## Components

- **Content:** every page is rendered from `content/*.json`, edited through Pages CMS (`.pages.yml`). Components below are templates in `assets/js/site.js`.
- **Utility bar:** thin dark-green strip above the header with ORCID, LinkedIn, GitHub and Email (hidden on phones).
- **Header:** green, sticky; white serif name left, white page links with a yellow underline on hover and on the current page, and a yellow Email me pill. Up to 820px: a yellow Menu pill that opens a full-width green dropdown.
- **Page band:** green band with the terrain on the right (fading out on the left), white serif page title and a green-tinted intro line.
- **Hero (Home):** on the green band, at most four text elements (Taste rule): the name in display serif, the role line in yellow, the bio, and two buttons with different intents (yellow See my maps, white-outline Read my research); photo on the right with an optional caption. On load the terrain settles in and the text rises in sequence; this is the site's only entrance animation.
- **Facts card:** white card overlapping the hero's lower edge, four facts with thin dividers (2 columns on tablets, 1 on phones).
- **Latest maps (Home):** the three newest maps: one lead map on the left, two on the right, each on a mat; click opens the viewer.
- **Recent research (Home):** the three newest items as short citations: year, type and status, serif title, italic venue. All equal.
- **Code projects (Home):** 2 by 2 cards: preview on a mat (or the repository path), serif title, year, one-line description, tools in mono; the whole card links to GitHub.
- **Skills (Home):** one white panel with the skill groups in three columns.
- **Interests, awards, languages (Home):** three columns side by side under one rule.
- **Projects page:** one row per repository: preview on a mat (or the repository path with a GitHub mark when there is no image), serif title, year, description, tool tags and the repository link.
- **Maps page (map wall):** two columns, each map whole on its mat at full column width, placed in the shorter column in date order so reading order stays newest first. Filter chips are built from the tags in use.
- **Research page:** academic list grouped by type with a count badge and a 2px ink rule; numbered entries in citation form (owner bold). No cards, no filters.
- **Contact band (Home):** green band; big serif title with the note directly under it, then translucent cards (yellow icon circle, label, value, copy button).
- **Footer:** dark green; serif name and tagline, all pages, all profiles (yellow column headings), then the copyright line and Back to top.
- **404 page:** a tall green band with the terrain, a yellow mono "404", serif title "This page is off the map.", one line of text and two buttons (Go to the home page, See my maps).
- **Link preview card (1200x630):** green with terrain, name in display serif, role in yellow, university line, the site address after a short yellow bar, photo on the right.
- **Pin the Place:** unchanged; see CLAUDE.md for levels and scoring.

## Do's and Don'ts

### Do:
- **Do** let the maps lead; show them whole, never cropped.
- **Do** keep every research item equal; no single item gets a bigger box or big numbers.
- **Do** keep text free of em dash and en dash characters (owner rule).
- **Do** stay on this type ramp and the four radii.
- **Do** keep one label per intent (See my maps / See all maps, Read my research / Read all research, Email me).

### Don't:
- **Don't** use yellow for anything but actions and small highlights, and never put white text on it.
- **Don't** add dark sections other than the header, the page band, the home contact band and the footer.
- **Don't** put eyebrow labels above headings or number the sections.
- **Don't** put a long statement headline in the hero; the name is the headline.
- **Don't** add decorative patterns or empty diagrams; the terrain is real elevation data, and every other visual shows real work.
