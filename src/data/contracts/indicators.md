# Page contract: indicators

Source: https://www.pugetsoundinfo.wa.gov/Indicator/Index (fetched 2026-07-17) / Route(s): /prototypes/indicators, /prototypes/indicators/number-of-southern-resident-killer-whales

This is a two-part contract: **(A)** the Indicators index (flagship, photo header) and **(B)** the Indicator/Detail page for indicator id 32, "Number of Southern Resident killer whales" — https://www.pugetsoundinfo.wa.gov/Indicator/Detail/32 (plain header). Both fetched 2026-07-17. The grid data behind the index (https://www.pugetsoundinfo.wa.gov/Indicator/IndexGridJsonData) was also fetched directly — 86 rows confirmed (70 Vital Sign Indicators + 16 Progress Indicators, 23 distinct Vital Signs).

---

## PART A — Indicators index (`/prototypes/indicators`)

Header: photo — title **"Puget Sound Indicators"**, lede = the source's own first intro paragraph (below). Hero image: download `https://www.pugetsoundinfo.wa.gov/Content/img/puget-sound-indicators-salmon-banner.jpg` (1200×480 JPEG, ~78KB — this is literally the CSS `background-image` the source page uses for its own banner, confirmed at line 188 of the fetched HTML: `background-image: url('/Content/img/puget-sound-indicators-salmon-banner.jpg')`). Save to `public/photos/indicators/puget-sound-indicators-salmon-banner.jpg`. Do NOT reuse `/photos/sound-aerial.jpg` — that is home's hero, not this page's.

### Sections (source order, exhaustive)

1. **Page title** — "Puget Sound Indicators" (breadcrumb/H1 chrome — the esa-page-header/photo-header lego renders this as the title).

2. **Intro copy** — four verbatim paragraphs, in this exact order, with no separation in the source (one `<div>`, four `<p>` tags back-to-back):
   > "Puget Sound Partnership's system of indicators help us understand whether we are seeing short-term progress to achieve long-term Puget Sound recovery goals."
   > "**Vital Sign Indicators** measure the status and trends of ecosystem components over years and decades." (term is bold+underlined in source)
   > "**Progress Indicators** measure human activities that influence ecosystem health (both positively and negatively) over years." (term is bold+underlined in source)
   > "The data underlying this indicator system help the Partnership make data-informed recommendations to improve and accelerate recovery outcomes."

   (Splitting paragraph 1 into the photo-header lede and folding paragraphs 2–4 into a definitions/closing card, as the current build does, is a legitimate presentation split — the copy is unchanged and the order is preserved.)

3. **Two portal cards** (`psiButtonCards` row, two `col-md-6`) — verbatim:
   - **Vital Signs** — image `/Content/img/vital-signs-indicator-landing.png` (alt: "An image representing the Vital Signs section of the application."), blurb "Measures of ecosystem health and progress toward Puget Sound recovery goals", links to `https://vitalsigns.pugetsoundinfo.wa.gov`.
   - **Puget Sound Progress Indicators** — image `/Content/img/pi-logo-hexagon-only-2026-white-background.png` (alt: "An image representing the Puget Sound Progress Indicators section of the application."), blurb "Measures of human activities that influence ecosystem health", links to `https://progressindicators.pugetsoundinfo.wa.gov`.

4. **The indicator grid** (`#pugetSoundIndicatorsGridDivID`, an ag-grid populated client-side from `/Indicator/IndexGridJsonData` — not in the static HTML, fetched directly instead). 86 rows. Toolbar text: "Currently Viewing X out of 86 Indicators" + "(clear filters)" link + "Download Table" button (an Excel/CSV export — not a content section, chrome around the grid).
   - **Columns**, in this order: Indicator Type · Puget Sound Indicator (name, links to `/Indicator/Detail/{id}`) · Reporting Organization (links to `/Organization/Detail/{id}`) · Vital Sign · Action Agenda Topics (tag list, links to `actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/{NN}/Overview`) · 2022 Action Agenda Strategies (tag list, links to `actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/{N}`).
   - **Row counts**: 70 rows typed "Vital Sign Indicator" (each carrying a Vital Sign, spanning 23 distinct Vital Signs), 16 rows typed "Progress Indicator" (Vital Sign column empty for all 16 — Progress Indicators are not grouped by Vital Sign on the source).
   - The full 86-row inventory (id, type, name, detailUrl, org/orgHref, vitalSign, topics[], strategies2022[]) is already captured verbatim in `src/data/pages/indicators.ts` → `INDICATORS`. Cross-checked row-for-row against the live grid endpoint on 2026-07-17: **counts and structure match exactly** (86 total / 70 VSI / 16 PI / 23 Vital Signs). This array is verbatim-usable as-is; no changes needed.
   - There is **no status/progress column** on the index grid — "Indicator Progress" and "Target Status" icons only appear on a per-indicator Detail page (captured for the exemplar in Part B). Don't invent one for the other 85 rows.

### Nothing else is on the index page.
No stat band, no synthesis copy, no cross-module band appear on the source — see Explicit exclusions below.

---

## PART B — Indicator Detail (`/prototypes/indicators/number-of-southern-resident-killer-whales`)

Source: https://www.pugetsoundinfo.wa.gov/Indicator/Detail/32 (id 32, resolved from the index grid row `PugetSoundIndicator: "Number of Southern Resident killer whales"` → `Link: "/Indicator/Detail/32"`).

Header: plain — `esa-page-header.astro`, title **"Number of Southern Resident killer whales"**, **no lede**. The source detail page has zero intro copy above its first card (Basics) — the breadcrumb runs straight into the card grid. Do not add an eyebrow (e.g. "Vital Sign Indicator · Orcas") — that string does not appear anywhere on the source; it is a fabricated composite of two Basics fields. Do not use a photo header/photo hero for this page — the source itself has no page-level photograph on the detail page (the only image is the Map card's critical-habitat map, which is Part B, section 2's own content image, not a hero).

### Sections (verbatim VISUAL order, exhaustive)

**Important layout note**: the first four cards (Basics, Map, Chart, Description) sit inside one shared Bootstrap `.row` and carry explicit `order-1`/`order-2`/`order-3`/`order-4` CSS classes that reorder them for display — the DOM order in the raw HTML is Basics → Map → **Description** → **Chart**, but the CSS `order` values make the rendered/visual order Basics → Map → **Chart** → **Description**. The list below is the rendered order a visitor actually sees. Basics and Map are laid out side-by-side (each `col-sm-6`); Chart and Description are each full-width, stacked below.

1. **Basics** (card header: "Basics") — a definition list, in this order:
   - Ecosystem Recovery Goal: "Thriving Species and Food Web"
   - Vital Sign: "Orcas" → `https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/19`
   - Indicator: "Number of Southern Resident killer whales"
   - Indicator Type: "Vital Sign Indicator"
   - Measurement Unit: "Each Unit (number)"
   - Indicator Progress / Target Status: two status icons side by side — "Getting Worse" (Indicator Progress) and "Below Target" (Target Status)
   - Target: "By 2030, increase the Southern Resident killer whale population from 74 individual whales in 2021 to 86 individuals." / "By 2050, increase the population to 110 individuals." / links: "Target fact sheet" (`https://pspwa.box.com/s/fjl0vl84fbnctk1swvbn6mkovdd2fkot`), "Memo to Science Panel with rationale" (`https://pspwa.box.com/s/eqz47vp81hwcv84najsrxk4t5q74rbk7`)
   - Vital Sign Indicator Reporter: Kenna Kuhn, kenna.kuhn@psp.wa.gov, Puget Sound Partnership (→ `/Organization/Detail/2`)
   - Contributing Partners: Center for Whale Research (→ `/Organization/Detail/6`), National Oceanic and Atmospheric Administration (→ `/Organization/Detail/372`)
   - Last Updated: "11/05/2025 19:29:05"

2. **Map** — **card header text is literally "Map", not "Critical Habitat."** Content: the critical-habitat map image (source: `/FileResource/DisplayResource/1686f03f-d59c-4418-91a2-40d0665d5b8c`, filename `map-srkw-ch-detail-fedreg-final7.png` — already downloaded to `public/photos/indicators/srkw-critical-habitat-map.jpg`, verbatim-usable), caption: "NOAA Fisheries revised the critical habitat designation for Southern Resident killer whales in 2021. The final rule maintains the previously designated critical habitat in inland waters of Washington and expands it to include certain coastal waters off Washington, Oregon, and California. This map shows a detailed view of the critical habitat in Washington and northern Oregon. Click the link below for an overview map of the full extent of Southern Resident killer whale critical habitat." Link: "2021 Map Overview - Existing and Proposed Critical Habitat" → `https://media.fisheries.noaa.gov/2021-07/map-srkw-ch-overview-fedreg-final7.pdf?null=`.

3. **Vital Sign Indicator Chart** (card header: "Vital Sign Indicator Chart") — chart title "Number of Southern Resident killer whales", "By: Pods". Axes: x = "Census year", y = "Number of whales". Series: K pod, J pod, L pod, All pods (legend title "Pods"). Caption: "Population size of Southern Resident killer whales each year between 1973 and 2025, based on the annual July census, conducted by the Center for Whale Research. The Southern Resident Killer Whale population in Puget Sound is comprised of three pods: J, K, and L pods."
   - **Correction to a prior gap note**: the full 1973–2025 numeric time series (4 series × 53 years) IS present in the fetched HTML — both as an escaped-JSON hidden input and, more usably, as clean unescaped JSON inside a `<script>` block (`var googleCharts = [...]`, around line 580 of the fetch). It is extractable if a future build wants a real chart; it is not merely a client-render artifact. Current build's choice to represent this as descriptive text (no fabricated graph) is still defensible and source-faithful either way — flagging only so "wasn't extractable" isn't repeated as fact.

4. **Description** (card header: "Description") — verbatim: "Southern Resident killer whales are a unique population of orcas that ranges in the Salish Sea and along the West Coast of the U.S. and Canada. They range in three pods known as J, K and L from California to Alaska in pursuit of fish, primarily adult Pacific salmon. In the late-1990s, Southern Resident killer whales experienced a dramatic decline. The combination of a precarious food supply and threats from pollution, vessel traffic, and noise continues to jeopardize their survival. As a result, they are federally listed as endangered."

5. **Importance** (card header: "Importance") — 5 paragraphs verbatim (charismatic-inhabitants / unique-population-decline / three-pods-clan / chosen-as-indicator / other-populations-not-reported). Exact text already captured verbatim in `EXEMPLAR_IMPORTANCE`.

6. **Key Vital Sign Indicator Results** (card header: "Key Vital Sign Indicator Results") — intro paragraph + "Provisional Update (November, 2025):" bullet list (3 bullets) + "Past Indicator Results:" bullet list (4 bullets, with links to "Chinook salmon populations" → `/VitalSign/Detail/18` and "recovery actions" → `https://www.psp.wa.gov/salmon-recovery-overview.php`). Exact text already captured verbatim in `EXEMPLAR_KEY_RESULTS`.

7. **Methods** (card header: "Methods") — Monitoring Program: "Center for Whale Research" + link "Orca Survey" (`https://www.whaleresearch.com/orcasurvey`); Data Source: "Annual Census as reported to National Oceanographic and Atmospheric Administration (NOAA) by the" + link "Center for Whale Research" (`https://www.whaleresearch.com/orca-population`); Methods: 2 paragraphs with 4 inline links (Center for Whale Research, Orca Network, Whale Museum, Pacific Whale Watch Association); **Critical Definitions: dt present, dd empty — source has no content here.** Exact text already captured verbatim in `EXEMPLAR_METHODS` (Critical Definitions correctly omitted as empty).

8. **Interpretation of Results** (card header: "Interpretation of Results") — 2 paragraphs (Causes for Change) + a blockquote sourced "From the Orca Task Force November 2018 report:" (link to the 2018 report PDF) + two `<h3>` subsections in this exact order: "2019 - final report and recommendations" (1 paragraph + link) then "2018 - final report and recommendations" (1 paragraph + link). Exact text already captured verbatim in `EXEMPLAR_INTERPRETATION`.

9. **Additional Information** (card header: "Additional Information") — "EXTERNAL LINKS" (5 links: Southern Resident Task Force/Governor's Office, NOAA Fisheries Species in the Spotlight, Center for Whale Research, Orca Network, Orca Behavior Institute) then "REFERENCES" (4 citations: Lacy et al. 2017, NOAA Fisheries/WDFW 2018, Pacific Fishery Management Council 2020, Wasser et al. 2017). Exact text already captured verbatim in `EXEMPLAR_ADDITIONAL_INFORMATION`.

10. **Datasets** (card header: "Datasets") — body text: "No datasets uploaded." System placeholder, no real content. Safe to omit (current build already does).

11. **Reporting Guidance** (card header: "Reporting Guidance") — "Reporting Instructions" dt present, dd empty. No real content. Safe to omit (current build already does).

12. **Subcategories** (card header: "Subcategories") — a table, one row: Name = "Pods", Puget Sound Indicator Subcategory Option = "K pod, J pod, L pod, All pods". **This one has real, displayed content** and is currently NOT rendered as its own section — its values are folded into `EXEMPLAR_CHART.subcategoryOptions` instead. That's a defensible editorial fold (same four pod names, same order) rather than a loss, but note it here so it isn't mistaken for an omission of new information.

### Nothing else is on the detail page.

---

## Explicit exclusions

- Nothing beyond the sections listed above for either page. No invented ledes/taglines/eyebrows, no stat bands the source doesn't show, no cross-link bands, no photos the source doesn't carry (except the one contracted index hero photograph and the Map card's own critical-habitat image).
- **Index page — flag for removal/rework**: `PsInfoStatBand` (Total indicators / Vital Sign Indicators / Progress Indicators / Vital Signs covered). The source page never displays this as a stat band. The only count the source surfaces is the grid's own "Currently Viewing X out of 86 Indicators" toolbar text — everything else in the current stat band (the 70/16/23 breakdown) is derived-but-not-displayed. Per "no stat bands unless the source itself displays those numbers," this component should come out (or be replaced with something that mirrors the grid's own row-count text).
- **Both pages — flag for removal**: `PsInfoCrossLinks` ("Related across the platform" bands). Explicitly banned by the header rule ("no cross-link bands"); neither source page has anything resembling this.
- **Detail page — flag for correction**: swap `PsInfoPhotoHeader` for `EsaPageHeader` (plain header per this unit's directive), drop the fabricated `eyebrow` string, drop the `lede` (source has none).
- **Detail page — flag for correction**: the Map card's section title should read "Map" (the source's literal card header), not "Critical Habitat." "Critical Habitat" is accurate framing but isn't what the source page says.
- **Detail page — flag for correction (layout)**: the current file's manifest/JSX order is Basics → Map → Description → Chart. The source's *visual* order (per its CSS `order-1/2/3/4` classes) is Basics → Map → **Chart** → **Description**. Reorder to match what a visitor on the live site actually sees.
- **Index page — decision point, not a hard violation**: the two portal cards currently use decorative Lucide icon paths in place of the source's own portal images (`vital-signs-indicator-landing.png`, `pi-logo-hexagon-only-2026-white-background.png`). The source images exist and are downloadable; consider using them instead of invented iconography, though a quiet elevated icon in their place is a smaller departure than a fabricated eyebrow/lede/stat.
- Section "notes" captions (e.g. "Human-activity measures — no Vital Sign to group by, so these list flat.") are editorial scaffolding, not source copy. Keep them minimal/neutral if kept at all — they are not verbatim content and shouldn't read as if they were.

## Gaps

- The index page's indicator grid is populated client-side from `/Indicator/IndexGridJsonData` and is not present in the static HTML — it was fetched directly instead. Confirmed complete and accurate (86/86 rows, 70 VSI + 16 PI, 23 Vital Signs) against the live endpoint on 2026-07-17.
- The exemplar detail page's full 1973–2025 by-pod numeric time series is technically extractable (found as clean JSON in an inline `<script>` block, not just an escaped hidden-input value) — noted above as a correction to the prior "wasn't extractable" claim. Still optional: the current text-based chart representation is faithful and defensible; building an actual line chart from the extracted numbers is a future option, not a requirement of this contract.
- No other gaps. Every other string in both sections above was confirmed against the live fetch on 2026-07-17.
