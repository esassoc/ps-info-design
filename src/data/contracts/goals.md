# Page contract: goals

Source: https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignGoal/Detail/1 (Healthy Human Population), https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignGoal/Detail/2 (Vibrant Human Quality of Life), https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignGoal/Detail/3 (Thriving Species and Food Web), https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignGoal/Detail/7 (Functioning Habitat), https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignGoal/Detail/6 (Healthy Water Quality) (fetched 2026-07-17) / Route(s): /prototypes/goals/healthy-human-population, /prototypes/goals/vibrant-human-quality-of-life, /prototypes/goals/thriving-species-and-food-web, /prototypes/goals/functioning-habitat, /prototypes/goals/healthy-water-quality

One contract for a shared template: all five `VitalSignGoal/Detail/{id}` pages render the identical section shape (page title → goal statement → narrative paragraph + inline photo → Vital Sign/Indicator tree), differing only in per-goal content and theme color. `src/data/pages/goals.ts` already holds this content, scraped and structured — every string, every Vital Sign/Indicator name+link, every "Indicator Progress"/"Target Status" label, and the `sourceGoalId` provenance. **This content file was re-verified line-by-line against all five live fetches during this contract pass and is byte-accurate: no changes needed to `goals.ts`.** What needs to change is the page-template shape (`[slug].astro`) and two supporting components — see Explicit exclusions.

Also re-verified: the base64-embedded inline photo on every one of the five live pages was decoded and visually compared against the corresponding file in `public/photos/goals/`. All five are the same photograph (confirmed by matching subject, composition, and — for goal 2 — identical EXIF description "Three Girls running along the beach at low tide"). **The existing photo assets are verbatim-usable; no re-downloading needed.**

## Header: plain

Use `esa-page-header.astro`. **Title** = the goal's own page title, taken from the source's own `<div class="pageTitle" ...>` element (rendered in the goal's theme color, inside `<main>` — this is the page's real title, not chrome). **Lede** = the goal's bold "Our goal is…" statement, which sits immediately below the title as the page's own intro copy. **No eyebrow.** The source has no eyebrow-equivalent string anywhere in the body — "Goals" is a module label from this prototype's own nav, not source content; do not add it as an eyebrow. Drop the current `PsInfoPhotoHeader size="band"` treatment entirely — it uses `/photos/sound-aerial.jpg`, a generic/shared image that is not this page's own hero (the source Detail/N pages have no hero/banner photo at all; their only image is the inline one, which is content, not header — see Section 3).

| Route | Title | Lede |
|---|---|---|
| `/prototypes/goals/healthy-human-population` | Healthy Human Population | Our goal is a healthy population supported by a healthy Puget Sound that is not threatened by changes in the ecosystem. |
| `/prototypes/goals/vibrant-human-quality-of-life` | Vibrant Human Quality of Life | Our goal is a quality of human life that is sustained by a functioning Puget Sound ecosystem. |
| `/prototypes/goals/thriving-species-and-food-web` | Thriving Species and Food Web | Our goal is healthy and sustaining populations of native species in Puget Sound, including a robust food web. |
| `/prototypes/goals/functioning-habitat` | Functioning Habitat | Our goal is a healthy Puget Sound where marine, nearshore, estuary, freshwater, and upland habitats are protected, restored, and sustained. |
| `/prototypes/goals/healthy-water-quality` | Healthy Water Quality | Our goal is waters and sediments of a sufficient quality to support human uses and enjoyment, and that are not harmful to native species. |

## Sections (source order, exhaustive)

Every Detail/N page has exactly three content sections below the title+statement (which the header lego absorbs — see above).

1. **Narrative paragraph + inline photo** — one paragraph of body copy immediately followed by one inline photograph, no heading between them and no heading above the paragraph. The pairing is a single visual unit in the source (paragraph text, then image, back to back in one content block). Source ships the image with `alt=""` on every page (no source alt text to preserve — the `imageAlt` values already authored in `goals.ts` are acceptable substitutes for accessibility, per that file's own header note).

   | Route | Narrative | Image title attr (source filename) |
   |---|---|---|
   | healthy-human-population | Spending time in nature and harvesting local foods provide valuable health and cultural benefits. Ensuring water quality affects safe swimming beaches, and maintenance of healthy and harvestable shellfish, which is essential to Tribal cultural practices, local recreation activities, and economic and ecosystem services. | vs-outdoor activity.jpg |
   | vibrant-human-quality-of-life | A healthy Puget Sound ecosystem contributes to human wellbeing by providing access to nature and green space, opportunities for recreation, and economic prosperity. Tribal cultures depend on the ability to exercise treaty rights to fish, gather plants, and hunt for subsistence, cultural, spiritual, ceremonial, and medicinal needs. | Cindy_Shebley.jpg |
   | thriving-species-and-food-web | A diverse and resilient food web allows for healthy and sustaining populations of native species in Puget Sound. Iconic and economically important species, like orcas and salmon, are still far from recovery goals. Healthy habitats, water quality, and the dynamic relationships between species must be restored and preserved to ensure a thriving food web. | vs-orca-CWR.jpg |
   | functioning-habitat | Habitats are our shared natural heritage and create the quality of life that makes Puget Sound an attractive place to live, work, and play. Human activity and development have deeply changed the Puget Sound region, and climate change is more than ever impacting habitat critical for species and human wellbeing. | vs-17-estuaries.jpg |
   | healthy-water-quality | From mountain peaks to the mouth of Puget Sound rivers to the Pacific Ocean, water connects different parts of the ecosystem. However, the condition of this key resource is at risk for all who depend on it. | Freshwater_VS.jpg |

   Current build's split of this single unit into a photo-card + prose sidebar layout (`PsInfoGoalsNarrative`) is a legitimate presentation choice — paragraph and photo are unchanged and still paired; keep it.

2. **Vital Signs & Indicators tree** — a table, rendered directly in the source's static HTML with real column headers and an empty `<tbody>` that a client-side Fancytree widget (`jquery.fancytree-all.min.js`) populates at runtime from an embedded `treeSources` JSON array. This IS visible, rendered page content for a real visitor (the column headers, "Expand Level"/"Collapse Level"/"Search…" toolbar, and bordered table shell are static; only the row data streams in from JS) — it is not a hidden/unused data structure. Literal column headers (source text, with a `›` glyph between the three GOAL/VITAL SIGN/INDICATOR terms):
   - **GOAL › VITAL SIGN › INDICATOR**
   - **INDICATOR PROGRESS**
   - **TARGET STATUS**

   The tree is a strict two-level hierarchy under the goal root: **Vital Sign** (name, links to `VitalSign/Detail/{id}` on the source) → **Indicator** (name, links to `VitalSignIndicator/Detail/{id}` on the source), each Indicator row carrying an "Indicator Progress" trend label always, and a "Target Status" label only where the source ties that indicator to a numeric target. Both label vocabularies are literal source strings (icon `alt` text): Progress ∈ {Getting Better, Mixed Results, No Trend, Getting Worse, Limited Data, Indicator To Be Developed}; Target Status ∈ {Near Or At Target, Below Target}. No Vital Sign or Indicator carries any other visible copy (no blurb/description) on this page.

   The full per-goal Vital Sign → Indicator inventory (names, hrefs, progress, target status) is exhaustive and byte-verified against each live `treeSources` payload — it is `GOALS` in `src/data/pages/goals.ts`, unchanged. Counts, for reference (source itself never displays these counts as a UI element — see Explicit exclusions):
   - Healthy Human Population — 5 Vital Signs (Air Quality 1 indicator; Drinking Water 2; Local Foods 3; Outdoor Activity 3; Shellfish Beds 1) = 10 indicators.
   - Vibrant Human Quality of Life — 5 Vital Signs (Cultural Wellbeing 1; Economic Vitality 3; Good Governance 1; Sense of Place 3; Sound Stewardship 2) = 10 indicators.
   - Thriving Species and Food Web — 6 Vital Signs (Birds 3; Forage Fish 2; Groundfish and Benthic Invertebrates 2; Orcas 2; Salmon 4; Zooplankton 3) = 16 indicators.
   - Functioning Habitat — 4 Vital Signs (Beaches and Marine Vegetation 8; Estuaries 2; Forests and Wetlands 3; Streams and Floodplains 5) = 18 indicators.
   - Healthy Water Quality — 3 Vital Signs (Freshwater 3; Marine Water 8; Toxics in Aquatic Life 5) = 16 indicators.

   **IA consolidation to preserve**: within Thriving Species and Food Web only, two Vital Sign names — **Salmon** and **Orcas** — link internally to this prototype's own Vital Sign pages (`/prototypes/vital-signs/chinook-salmon` and `/prototypes/vital-signs/orcas` respectively) instead of out to the live `VitalSign/Detail/{id}` source page, because those two Vital Signs already have a dedicated page built by the sibling `vital-signs` unit. This is a deliberate cross-unit IA decision (documented in `PsInfoGoalsVitalSignList.astro`'s own `INTERNAL_ROUTE` map), not a source discrepancy — keep it. Every other Vital Sign name, and every Indicator name on every goal, links externally (new tab, external-arrow mark) to the live source.

## Explicit exclusions

- Nothing beyond the two sections above (narrative+photo, tree) plus the title+statement the header absorbs. No invented ledes/taglines/eyebrows beyond what's in the Header table above.
- **Flag for removal: `PsInfoStatBand`** (Vital Signs / Indicators tracked / Getting Better / Getting Worse counts). None of the five source pages displays any such stat summary — it's a derived rollup computed from the tree data, not source content. Per "no stat bands unless the source itself displays those numbers," remove it. (The tree's own two literal column headers — "INDICATOR PROGRESS" and "TARGET STATUS" — are the source's only status-related UI; they belong to Section 2, not a separate stat band.)
- **Flag for removal: `PsInfoGoalsCrossLinks`** ("Related across the platform": All Vital Signs / About Vital Signs / All Indicators). None of the five source pages carries a link band as body content. The two external URLs this component uses (`/About`, `/VitalSignIndicator/ViewAll`) appear on the source only inside the breadcrumb — `About the Vital Signs › All Indicators › Goal` — which is identical navigational chrome on every Detail/N page across the whole site, not this page's own content. Per "no cross-link bands," remove it.
- **Flag for correction: header component.** Swap `PsInfoPhotoHeader size="band"` (currently using the shared `/photos/sound-aerial.jpg` with a per-goal crop focus, plus an invented `eyebrow="Goals"`) for `esa-page-header.astro` per the Header table above. Drop the eyebrow; drop the shared banner photo; drop the per-goal `FOCUS` crop-focus map in `[slug].astro` (it only existed to crop that banner).
- No stat bands, cross-link bands, taglines, or photos beyond the one inline photo per goal (Section 1) — none of the five sources shows anything else.

## Gaps

- The tree's row data streams in from an embedded `treeSources` JS array at runtime (Fancytree), not from static markup — a plain HTTP fetch shows only the empty table shell + column headers. This is a client-render mechanic, not missing content: the full row data was extracted from each page's embedded `treeSources` payload and cross-checked indicator-for-indicator against `goals.ts` on 2026-07-17 — exact match, all five goals.
- No goal's Detail/N page states a numeric target value — "Target Status" surfaces only as the Near Or At Target / Below Target tag; the underlying target numbers (if any exist) live elsewhere, out of scope for this page.
- No Vital Sign carries its own description/blurb on this page — that content, if it exists, lives one level down on `/VitalSign/Detail/{id}`, out of scope for this unit.
- No other gaps. Every string in the tables above was fetched and checked against the live site on 2026-07-17.

## Amendments (2026-07-17, Andy — Vital Signs module fidelity)
- ADD the Vital Signs module sub-nav at the top of every goal page (PsInfoVsSubnav):
  navy banner + the source header's five ThemeColor goal columns with per-goal
  Vital Sign dropdowns + the About / All Indicators / Goal trail. This is the
  source site's own chrome, now sanctioned as page content in the prototype.
- Title block renders in the SOURCE's hierarchy (PsInfoVsGoalIntro): uppercase
  goal name in the goal's ThemeColor, bold navy statement, narrative, photo —
  no esa-page-header, no two-column layouts.
- The Vital Sign/indicator listing uses the source's Fancytree convention
  (PsInfoVsFancyTree): Expand/Collapse Level, search, GOAL > VITAL SIGN >
  INDICATOR header, goal-ThemeColor frame, and the source's OWN circular
  progress/target icons (/photos/vital-signs/icons/*) — never esa-badge pills.
