// Pre-render: write the content that assets/js/site.js builds from content/*.json into the
// HTML files themselves, so search engines (and visitors without JavaScript) see the research,
// maps, projects and landmarks as plain HTML. site.js still runs on load and only redraws a
// section when the JSON has changed since this snapshot.
//
// Usage: serve the repository (python3 -m http.server 4000), then
//   node .github/scripts/prerender.mjs            (uses installed Google Chrome)
//   CHROME_PATH=/path/to/chromium node .github/scripts/prerender.mjs
import { chromium } from "playwright-core";
import { readFileSync, writeFileSync } from "node:fs";

const BASE = process.env.BASE_URL || "http://127.0.0.1:4000/";
const PAGES = ["index.html", "research.html", "projects.html", "maps.html", "gallery.html", "fun.html"];

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.route(/arcgisonline|eox\.at|tiles?\./, (route) => route.abort()); // map tiles are not needed

let changed = 0;
for (const name of PAGES) {
  const src = readFileSync(name, "utf8");
  await page.goto(BASE + name + "?prerender=1", { waitUntil: "load" });
  await page.waitForFunction(() => document.documentElement.hasAttribute("data-rendered"), null, { timeout: 20000 });
  const out = await page.evaluate((src) => {
    const doc = new DOMParser().parseFromString(src, "text/html");
    // Rendered sections, in document order
    const live = [...document.querySelectorAll("[data-render]")];
    const stat = [...doc.querySelectorAll("[data-render]")];
    live.forEach((el, i) => {
      const t = stat[i];
      if (!t || t.getAttribute("data-render") !== el.getAttribute("data-render")) return;
      if (el.classList.contains("map-wall")) {
        // The two map columns depend on image loading; store the maps in their plain newest-first order.
        const n = (f) => Number((f.querySelector("[data-lightbox]") || { dataset: {} }).dataset.lightbox?.slice(1) || 0);
        t.innerHTML = [...el.querySelectorAll(".shot")].sort((a, b) => n(a) - n(b)).map((f) => f.outerHTML).join("");
      } else {
        t.innerHTML = el.innerHTML;
      }
      t.removeAttribute("aria-busy");
      t.hidden = el.hidden;
    });
    // Editable text, counts, filter chips and "More maps" blocks outside those sections
    for (const t of doc.querySelectorAll("[data-site]")) {
      const el = document.querySelector('[data-site="' + t.getAttribute("data-site") + '"]');
      if (el) t.textContent = el.textContent;
    }
    for (const sel of ["[data-count]", "[data-chips]", "[data-render-wrap]"]) {
      const a = [...document.querySelectorAll(sel)], b = [...doc.querySelectorAll(sel)];
      a.forEach((el, i) => { if (b[i]) { b[i].innerHTML = el.innerHTML; b[i].hidden = el.hidden; } });
    }
    // Keep the end of the file stable between runs
    while (doc.body.lastChild && doc.body.lastChild.nodeType === 3 && !doc.body.lastChild.textContent.trim()) doc.body.lastChild.remove();
    doc.body.append("\n");
    return "<!doctype html>\n" + doc.documentElement.outerHTML + "\n";
  }, src);
  if (out !== src) { writeFileSync(name, out); changed++; console.log("pre-rendered", name); }
}
await browser.close();
console.log(changed ? changed + " page(s) updated" : "all pages already up to date");
