# Page contract: vital-signs

Source: https://vitalsigns.pugetsoundinfo.wa.gov/ (fetched 2026-07-17) / Route(s): /prototypes/vital-signs

This is the flagship "front door" of the Vital Signs sub-site — a single home page, no sub-parts. `<title>` is literally `Vital Signs ` (confirmed). The visible `.pageTitle` div in the markup is populated empty and the source ships `.pageTitle { display: none; }` in an inline `<style>` block — **the source home page has no visible on-page heading at all**, only the `<title>` tag names it.

## Header

Header: photo — title **"Vital Signs"** (from `<title>`), **no lede**. Do not fold the intro paragraphs (Section 2 below) into the hero lede — on the source they sit as their own body block *after* the graphic, not beside/under the title, so promoting them into the header would reorder content that isn't reordered on the source.

Hero image: the literal home page carries **no photograph at all** — its only visual is the wheel graphic (Section 1) and the partner logo grid (Section 3), both handled as their own sections below, not hero material. Per the flagship-hero directive, source a real photo from elsewhere on `vitalsigns.pugetsoundinfo.wa.gov` (the same site, a different page) rather than reuse another page's claimed hero. Recommended: **`https://vitalsigns.pugetsoundinfo.wa.gov/FileResource/DisplayResource/5303bfbe-4f9e-462b-88a9-a2cb750cd1fb`** — the inline photo on `/VitalSign/Detail/27` (Marine Water), source caption "Deception Pass in northwest Puget Sound." Verified: real JPEG, 2508×1672, ~650KB — high-resolution and confirmed unique (not `sound-aerial.jpg`; not any `goals.ts` image; not the Salmon/Orcas Vital-Sign-detail hero photos already claimed by the sibling `vital-sign-details` unit; Marine Water has no dedicated detail page in this spoke, so nothing else has first claim on it). Save under `public/photos/vital-signs/deception-pass.jpg`. Author an accessible alt (e.g. "Deception Pass, a narrow strait in northwest Puget Sound, seen from above.") — the source's own alt on that image is a caption-style string ("An image with the caption: Deception Pass in northwest Puget Sound."), not real alt text, matching the same house pattern `goals.ts` already documents (source ships caption-as-alt; this repo authors real alt instead).

## Sections (source order, exhaustive)

1. **The Vital Signs wheel** — an interactive diagram (three responsive variants of the same content: a 728×728 desktop image-map, a 546×546 tablet image-map, and a 360px-wide stacked mobile image-map — same links, same grouping, just different graphics per breakpoint). It groups **all 23 Vital Signs into the 5 recovery goals**, radially. Clicking a Vital Sign's sector goes to that Vital Sign's detail page (`/VitalSign/Detail/{id}`); clicking a goal's sector band goes to that goal's detail page (`/VitalSignGoal/Detail/{id}`). **No indicators, no indicator counts, and no numeric text of any kind are visible anywhere in or near the wheel** — indicators only appear one level down, on each goal's own Detail/N page (confirmed against `goals.ts`'s own sourcing notes), never on this home page.

   The wheel's image-map area hrefs were extracted directly (not OCR of the PNG's baked-in labels) and cross-checked id-for-id against `src/data/pages/goals.ts` — **every id, grouping, and order matches exactly**, confirming `goals.ts` is verbatim-usable for this section's content (goal names + vital sign names + hrefs), provided the per-Vital-Sign **`indicators` array is NOT rendered** here. Inventory, in the wheel's own declared order:

   - **Healthy Human Population** → `https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignGoal/Detail/1`
     - Air Quality → `.../VitalSign/Detail/2`
     - Drinking Water → `.../VitalSign/Detail/3`
     - Local Foods → `.../VitalSign/Detail/4`
     - Outdoor Activity → `.../VitalSign/Detail/6`
     - Shellfish Beds → `.../VitalSign/Detail/7`
   - **Vibrant Human Quality of Life** → `.../VitalSignGoal/Detail/2`
     - Cultural Wellbeing → `.../VitalSign/Detail/21`
     - Economic Vitality → `.../VitalSign/Detail/22`
     - Good Governance → `.../VitalSign/Detail/23`
     - Sense of Place → `.../VitalSign/Detail/24`
     - Sound Stewardship → `.../VitalSign/Detail/25`
   - **Thriving Species and Food Web** → `.../VitalSignGoal/Detail/3`
     - Birds → `.../VitalSign/Detail/17`
     - Forage Fish → `.../VitalSign/Detail/33`
     - Groundfish and Benthic Invertebrates → `.../VitalSign/Detail/34`
     - Orcas → **`/prototypes/vital-signs/orcas`** (internal — sibling page in this spoke; do not link the live `.../VitalSign/Detail/19`)
     - Salmon → **`/prototypes/vital-signs/chinook-salmon`** (internal — sibling page in this spoke; do not link the live `.../VitalSign/Detail/32`)
     - Zooplankton → `.../VitalSign/Detail/35`
   - **Functioning Habitat** → `.../VitalSignGoal/Detail/7`
     - Beaches and Marine Vegetation → `.../VitalSign/Detail/31`
     - Estuaries → `.../VitalSign/Detail/13`
     - Forests and Wetlands → `.../VitalSign/Detail/30`
     - Streams and Floodplains → `.../VitalSign/Detail/29`
   - **Healthy Water Quality** → `.../VitalSignGoal/Detail/6`
     - Freshwater → `.../VitalSign/Detail/26`
     - Marine Water → `.../VitalSign/Detail/27`
     - Toxics in Aquatic Life → `.../VitalSign/Detail/28`

   Goal names ARE links on the source (confirmed — each sector band is a clickable area to `/VitalSignGoal/Detail/{id}`), so goal names may link out. Since a sibling unit already publishes a faithful reproduction of each goal's own page at `/prototypes/goals/{slug}` (`goals.ts` → `GOALS[].slug`), route goal names there rather than off-site — same destination content, in-app. (`healthy-human-population`, `vibrant-human-quality-of-life`, `thriving-species-and-food-web`, `functioning-habitat`, `healthy-water-quality`.)

2. **Intro text block** — no heading (the source runs straight from the wheel into three `<p>` tags in one `<div>`, no `<h2>`/`<h3>` above them). Three items, in this order:
   a. **"Vital Signs en Español"** — large, bold, standalone link (its own paragraph, source markup wraps it in `<big>`). External, opens in a new tab (`target="_blank"` in source). The href as authored on the source is an Outlook Safelinks redirect (`https://gcc02.safelinks.protection.outlook.com/?url=https%3A%2F%2Fpspwa.box.com%2Fs%2Fq6s03tmenge1219trpxa00bcmios1xja&data=...`) — decoding the `url` param, the real destination is `https://pspwa.box.com/s/q6s03tmenge1219trpxa00bcmios1xja` (a Box-hosted document, presumably the Spanish-language version/brochure; not independently opened/verified since it sits behind Box's own redirect). **Judgment call, flagged rather than decided**: render the clean decoded Box URL (same visible link text, same destination, without an org-internal email-scan tracking wrapper) rather than the literal Safelinks string.
   b. **First paragraph** — verbatim: "The Puget Sound Vital Signs are measures of ecosystem health and progress toward Puget Sound recovery goals. Thanks to a strong network of monitoring programs and committed people in the Puget Sound Ecosystem Monitoring Program, the status and trends of indicators are regularly reported throughout this website." Two inline links: "Puget Sound Vital Signs" → `https://vitalsigns.pugetsoundinfo.wa.gov/About` (internal, same site — the site's own About page); "Puget Sound Ecosystem Monitoring Program" → `https://psp.wa.gov/PSEMP-overview.php` (external, opens in a new tab in source).
   c. **Second paragraph** — verbatim, no links: "Whether you are a partner in the recovery effort for Puget Sound, a member of the media, a legislative staff, a program manager, scientist or student, this website is designed for people with a range of familiarity with Puget Sound issues."

3. **Contributing Partners** — `<h2>Contributing Partners</h2>` (source renders it uppercase via inline `text-transform: uppercase` CSS; the underlying text is title case "Contributing Partners" — render the words as-is, uppercase styling is a presentation choice, not required). Below it, a grid of **33 partner organization logos**, each logo linking to `https://www.pugetsoundinfo.wa.gov/Organization/Detail/{id}` (note: this is the *hub* `pugetsoundinfo.wa.gov` domain, not `vitalsigns.` — a different subdomain/app, so treat as external per the a11y external-link convention), each image with source alt text of the exact pattern `"An image containing the logo for {name}"`. Full inventory, in the source's own grid order:

   1. Puget Sound Partnership → Organization/Detail/2
   2. Center for Whale Research → Organization/Detail/6
   3. Washington Department of Fish and Wildlife → Organization/Detail/7
   4. Oregon State University → Organization/Detail/8
   5. King County → Organization/Detail/9
   6. Washington State Department of Ecology → Organization/Detail/10
   7. Washington State Department of Health → Organization/Detail/11
   8. Washington State Department of Natural Resources → Organization/Detail/12
   9. University of Washington → Organization/Detail/17
   10. Washington State Recreation and Conservation Office → Organization/Detail/88
   11. Washington State Department of Agriculture → Organization/Detail/113
   12. Washington State Conservation Commission → Organization/Detail/114
   13. Washington Sea Grant → Organization/Detail/116
   14. Tacoma-Pierce County Health Department → Organization/Detail/137
   15. Snohomish Health District → Organization/Detail/158
   16. Samish Indian Nation → Organization/Detail/182
   17. Public Health Seattle and King County → Organization/Detail/203
   18. Northwest Straits Commission → Organization/Detail/221
   19. Kitsap Public Health District → Organization/Detail/250
   20. American Farmland Trust → Organization/Detail/343
   21. U.S. Geological Survey → Organization/Detail/354
   22. Natural Systems Design → Organization/Detail/370
   23. National Oceanic and Atmospheric Administration → Organization/Detail/372
   24. Environmental Science Associates → Organization/Detail/379
   25. Washington State Office Of Financial Management → Organization/Detail/417
   26. Greene Economics, LLC → Organization/Detail/420
   27. Cascadia Consulting Group → Organization/Detail/467
   28. Cramer Fish Sciences → Organization/Detail/478
   29. Kelp Forest Monitoring Alliance of Washington State → Organization/Detail/518
   30. Marine Agronomics LLC → Organization/Detail/519
   31. BERK Consulting, Inc. → Organization/Detail/547
   32. Rivershed SPC → Organization/Detail/553
   33. Blue Water GIS → Organization/Detail/559

   The source renders these as actual downloaded logo images (`/FileResource/DisplayResource/{guid}` per org); whether the implementor downloads all 33 real logos or represents the list as a text/wordmark grid is an implementation decision — the CONTENT requirement is exactly these 33 names, in this order, each linking to its own Organization/Detail page.

### Nothing else is on the home page.

## Comparison against existing prototype files for this unit

- `src/pages/prototypes/vital-signs.astro` (current build) — **must change**:
  - `PsInfoPhotoHeader` eyebrow `"Vital Signs"`, title `"Ecosystem health, by recovery goal"`, and the counting lede (`"${totalVitalSigns} Vital Signs and ${totalIndicators} indicators measure..."`) are all invented — the source has no visible title text and no lede paragraph before the graphic. Replace with title `"Vital Signs"`, no eyebrow, no lede (see Header above).
  - `image="/photos/sound-aerial.jpg"` — that is home's hero; this page needs its own unique photo (see Header above).
  - `PsInfoStatBand` (`totalVitalSigns` / `GOALS.length` / `totalIndicators`) — **remove entirely**. None of these three numbers is displayed anywhere on the source home page.
  - The per-goal loop's `PsInfoSectionTitle` passes `count={`${goal.vitalSigns.length} Vital Signs`}` and `note={goal.statement}` — **both must go**. The wheel shows no per-goal vital-sign count text, and `goal.statement` (the "Our goal is…" mission line) is that GOAL's own Detail/N page content, not anything shown on the Vital Signs home page.
  - `PsInfoGoalsVitalSignList` — **must not be reused as-is for this page.** That component (owned by the sibling Goals unit, also used by `src/pages/prototypes/goals/[slug].astro`) renders a nested indicator list with Indicator Progress / Target Status badges under every Vital Sign — correct for a goal's own Detail/N page, wrong here: the home page's wheel shows Vital Sign names only, never their indicators. This unit needs a simpler list/grid (Vital Sign name + link only, grouped by goal name/hue) — component-first lookup applies to whatever replaces it.
  - The closing `"Related across the platform"` band (`PsInfoSectionTitle` + `PsInfoCrossLinks`) — **remove entirely**. The source home page has no cross-link band of any kind.
- `src/data/pages/goals.ts` — **verbatim-usable, unchanged**, for Section 1's goal names, order, vital-sign names, order, and hrefs (cross-checked id-for-id against the live wheel above — exact match). Do not render the `indicators` array on this page; do not render `goal.statement` or `goal.narrative` on this page — both belong to the Goals unit's own detail pages, not this one.

## Explicit exclusions

- Nothing beyond the three sections above. No invented ledes/taglines/eyebrows, no stat bands the source doesn't show (kill `PsInfoStatBand`'s Vital Signs/Recovery goals/Indicators tracked trio), no per-Vital-Sign indicator lists or counts (the source home page never shows an indicator beneath a Vital Sign — that's one page deeper), no cross-link band (kill the "Related across the platform" band), no photos the source doesn't carry except the single contracted hero photograph.
- No goal mission statements (`goal.statement`) or narrative paragraphs (`goal.narrative`) on this page — real content, but it belongs to each goal's own Detail/N page, not the Vital Signs home page.
- The identical breadcrumb ("About the Vital Signs" → `/About`, "All Indicators" → `/VitalSignIndicator/ViewAll`) that sits at the very top of every `vitalsigns.pugetsoundinfo.wa.gov` page, including this one, is treated as site chrome here (it's the same two links on every Detail/N page too — already captured as `ABOUT_VITAL_SIGNS_URL`/`ALL_INDICATORS_URL` in `goals.ts` for that reason) and excluded per "ignore site chrome."

## Gaps

- The wheel's goal-sector and Vital-Sign-sector labels are pixels baked into a PNG (`/Content/img/vitalsigns_wheel.png` / `vitalsigns_stacked_plain.png`), not extractable text via curl. Confidence in the inventory above is high but indirect: every image-map area's target id (`VitalSignGoal/Detail/{1,2,3,7,6}`, `VitalSign/Detail/{2,3,4,…}`) was cross-checked against `goals.ts`'s `sourceGoalId` and each Vital Sign's `href`, and the **declared order of the areas in the raw HTML matches `goals.ts`'s grouping and order exactly** — not a literal OCR of the graphic, but a verified structural match.
- The "Vital Signs en Español" link's real target (`https://pspwa.box.com/s/q6s03tmenge1219trpxa00bcmios1xja`, decoded from the Safelinks wrapper) was not opened/verified — Box's own auth/redirect wasn't followed. Left as a flagged judgment call above, not a hard fact.
- No other gaps. Every other string above (breadcrumb, intro paragraphs, "Contributing Partners" heading, all 33 partner names/ids) was read directly off the fetched HTML on 2026-07-17.

## Amendments (2026-07-17, Andy — Vital Signs module fidelity)
- The wheel is reproduced NATIVELY (PsInfoVsWheel): 7×7 tile ring per the
  source image map (every tile a live link), edge goal bands, five-arc donut +
  two-tone disc wordmark. Colors sampled from vitalsigns_wheel.png; tile fills
  use the goal tokens (quality darkened 12%) so white labels hold WCAG AA.
- Contributing Partners renders the source's real logo files
  (/photos/vital-signs/partners/p01–p33.png, DOM order) at standardized cells
  (PsInfoVsPartners).
