---
name: Md Sabbir Islam, portfolio
description: A personal research portfolio presented as an open GIS session.
colors:
  selection-yellow: "#EDD35A"
  selection-yellow-dark: "#E4C94F"
  ink: "#15191D"
  ink-soft: "#394047"
  muted-grey: "#59616A"
  chrome-grey: "#E9ECEE"
  panel-grey: "#F2F4F5"
  canvas: "#FAFBFB"
  map-paper: "#FDFDFC"
  hairline: "#D6DBDF"
  hairline-strong: "#B7BEC5"
  night-chrome: "#15181B"
  night-panel: "#1A1E21"
  night-canvas: "#1F2327"
  night-ink: "#E7EAEC"
  night-muted: "#9AA2A9"
  night-hairline: "#2E3439"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 1.4rem + 3.6vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 118"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 1.2rem + 1.9vw, 2.625rem)"
    fontWeight: 650
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 115"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 650
    lineHeight: 1.3
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 650
    lineHeight: 1.4
  data:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    fontFeature: "'tnum' 1"
rounded:
  hairline: "2px"
  small: "4px"
  standard: "6px"
  dialog: "8px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "40px"
  section: "clamp(64px, 9vw, 112px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.standard}"
    padding: "0 18px"
    height: "44px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.standard}"
    padding: "0 18px"
    height: "44px"
  layer-item-active:
    backgroundColor: "{colors.selection-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.small}"
    padding: "7px 8px"
  readout-live:
    backgroundColor: "{colors.selection-yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.small}"
    padding: "4px 8px"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.small}"
    padding: "2px 8px"
  tag-done:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.small}"
    padding: "2px 8px"
---

# Design System: Md Sabbir Islam, portfolio

## Overview

**Creative North Star: "The Open GIS Session"**

The site behaves like a desktop GIS workspace left open on a researcher's machine: a toolbar across the top, a Layers panel on the left, a canvas in the middle and a status bar along the bottom. Sections are layers, maps are figures you can probe, and publications sit in an attribute table. The chrome is quiet, cool and neutral so the maps carry all the colour.

The first screen is a dark chapter: a map stage with a soft warm glow, yellow neatline corner marks and an auto-advancing slideshow of the owner's maps, framed by light content chapters below (an idea taken from the NVIDIA reference in `.claude/design-references`). Density is moderate: generous canvas spacing between sections, compact software-like spacing inside panels. Motion: the maps crossfade every 6.5 seconds with a progress bar on the active thumbnail, pausing on hover or focus and never autoplaying under reduced motion.

**Key Characteristics:**
- Cool neutral software chrome with hairline dividers and no decorative shadows.
- Selection yellow as the only accent, used only for selection and live state.
- Archivo across widths: expanded for display, normal width for interface text.
- JetBrains Mono only for coordinates, resolutions, metrics and dates.
- Maps always sit on light paper, in both themes.

## Colors

A restrained palette: neutrals from the software world plus one GIS selection yellow.

### Primary
- **Selection Yellow** (selection-yellow): the colour a GIS highlights selected features with. Marks the active layer, the active slide (progress bar, thumbnail edge, neatline corners), the role line in the dark hero, the live coordinate readout, text selection and the focus halo.

### Neutral
- **Ink** (ink): headings, body text, primary buttons, the timeline spine and the 3 m pixel frame.
- **Soft Ink** (ink-soft): secondary text in panels and table cells.
- **Muted Grey** (muted-grey): labels, metadata, idle readouts; 4.5:1 or better on every light surface.
- **Chrome Grey** (chrome-grey): toolbar, status bar, table header, viewer bar.
- **Panel Grey** (panel-grey): Layers panel, map frame footers, skills box, contact rows.
- **Canvas** (canvas): the main page ground.
- **Map Paper** (map-paper): ground under every map figure; stays light in dark theme so maps read as printed figures.
- **Hairline / Strong Hairline** (hairline, hairline-strong): 1px dividers, borders, button outlines.
- **Night set** (night-chrome, night-panel, night-canvas, night-ink, night-muted, night-hairline): the dark theme, neutral charcoal rather than blue-black.

### Named Rules
**The Selection Rule.** Yellow means "selected, live or framing the stage". Content chips, dots and badges are never yellow.

**The Paper Rule.** Maps never sit on a dark surface. In dark theme the map canvas stays map-paper.

## Typography

**Display Font:** Archivo, variable width (with Helvetica Neue, Arial)
**Body Font:** Archivo, normal width
**Label/Mono Font:** JetBrains Mono (with ui-monospace)

**Character:** Archivo's width axis does the work that separate faces usually do: stretched wide for the name and section titles like map sheet titles, normal for reading. Mono appears only where a GIS would print numbers.

### Hierarchy
- **Display** (700, clamp 2.5 to 4.25rem, 1.02, width 118): the name in the hero and the contact heading.
- **Headline** (650, clamp 1.75 to 2.625rem, 1.1, width 115): section titles.
- **Title** (650, 1.125 to 1.25rem, 1.3): pipeline verbs, roles, catalog group heads.
- **Body** (400, 1rem, 1.6): paragraphs, max 64ch.
- **Label** (650, 0.8125rem): table headers, fact labels, panel headers. Sentence case, never tracked uppercase.
- **Data** (JetBrains Mono, 0.75 to 0.8125rem, tabular numerals): coordinates, resolutions, F1 scores, years, feature counts.

### Named Rules
**The Printed Number Rule.** Mono is for numbers a GIS would print (coordinates, resolutions, metrics, dates, counts). Instructions and prose are never mono.

## Layout

Desktop is a three-part workspace: a sticky 56px toolbar, a sticky 232px Layers panel, and a fixed 28px status bar; the canvas scrolls between them. Sections are capped near 1240px with side padding of clamp(20px, 3.2vw, 48px) and vertical spacing of clamp(64px, 9vw, 112px). The hero fills the first viewport as a 5:7 split (intro, map).

At 900px and below the Layers panel becomes a horizontal, scrollable strip under the toolbar and the status bar is hidden (the figure's own readout remains). At 640px and below every grid collapses to one column and the publications table becomes stacked records.

## Elevation & Depth

Flat. Depth comes from tonal layering (chrome, panel, canvas, paper) and 1px hairlines. The only shadow is on the full-size map viewer, which genuinely floats over the page (`0 24px 64px rgba(10,14,18,0.28), 0 4px 12px rgba(10,14,18,0.12)`), and it carries no border.

### Named Rules
**The One Float Rule.** Only a floating dialog casts a shadow. Everything on the page is either a hairline or a tone.

## Shapes

One corner scale: 6px for buttons, panels and figures; 4px for small controls, tags and layer rows; 2px for legend symbols and the pixel frame; 8px only for the dialog. No pills. Layer legend symbols (point, polygon, table, raster, line, target) are drawn as small geometric CSS shapes, like a GIS legend.

## Components

### Buttons
- **Shape:** gently squared (6px), 44px tall.
- **Primary:** ink background, canvas text. Used once per intent ("Email me").
- **Secondary:** transparent with a strong hairline border.
- **Hover / Focus:** tone shift over 160ms; press scales to 0.98; focus is a 2px ink outline plus a soft yellow halo.

### Chips and tags
- **Metric chips** (pipeline): canvas background, strong hairline, mono text. Neutral, never yellow.
- **Status tags** (publications): outlined for "Under review", filled ink for "Presented".

### Cards / Containers
- **Corner Style:** 6px.
- **Background:** panel grey, with the map paper inside figures.
- **Shadow Strategy:** none (see Elevation).
- **Border:** 1px hairline.
- **Internal Padding:** 12 to 22px.

### Navigation
- **Layers panel:** rows with a legend symbol, name and optional feature count in brackets (for example `[16]`). Hover lifts the row to canvas; the active section (scroll spy) is filled selection yellow.
- **Mobile:** the same rows as a horizontal strip; the active row scrolls into view.

### Map stage (signature)
The hero slideshow: slides stacked in one grid cell and crossfaded, thumbnails with a 2px yellow progress bar, yellow neatline corner marks around the stage, and a dark stage whose custom properties are scoped to the hero so every child inherits the dark palette.

### Research flow
The thesis as four columns under a 2px ink rule, each led by a large real value (5 cm, 0.944, 3 m, AGB), a mono unit line, a verb and one sentence, joined by small chevrons on the dividing rules.

### Map frame
A figure with a paper canvas, the map, a crosshair probe that follows the pointer, and a properties strip (title, data and method, readout). Probe-able maps carry a `data-geo` attribute with graticule fractions, so the readout shows real longitude and latitude and mirrors it to the status bar. Clicking opens the viewer, where a second click zooms to at least 2x and the map can be panned.

### Attribute table
Publications as a GIS attribute table: chrome header row, hairline rows, yellow-tinted row on hover, the owner's name in bold in author lists.

## Do's and Don'ts

### Do:
- **Do** keep selection yellow for selection and live state only (The Selection Rule).
- **Do** put every map on map paper, with alt text describing what the map shows.
- **Do** use mono only for coordinates, resolutions, metrics, dates and counts.
- **Do** keep one 6px corner scale and 1px hairlines.
- **Do** update the Layers panel counts when adding publications or maps.

### Don't:
- **Don't** use em dash or en dash characters anywhere in visible text (owner rule).
- **Don't** add small uppercase labels above headings; headings stand alone.
- **Don't** add shadows to cards or figures; only the viewer floats.
- **Don't** fill chips, dots or badges with yellow.
- **Don't** show a map as a large figure twice; the stage shows it once, the catalog only as a thumbnail.
- **Don't** use empty diagrams or placeholder geometry; every visual shows real work or real values.
