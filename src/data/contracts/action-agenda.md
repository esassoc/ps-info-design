# Page contract: action-agenda

Source: https://actionagenda.pugetsoundinfo.wa.gov/2026-2030 (fetched 2026-07-17) / Route(s): /prototypes/action-agenda

Header: photo — title **"2026-2030 Action Agenda Explorer"** (verbatim source text, from the page's own `siteTitle` band directly under its photo carousel: `<p class="mt-2 mb-1" autofocus>2026-2030 ACTION AGENDA EXPLORER</p>`; the source renders it all-caps but that is this site's own CSS treatment of a title-case string, not a content requirement — render through `PsInfoPhotoHeader`'s normal title type-role). No lede — the source's title band carries no subtitle/descriptive sentence beneath it. The three sentences that might look lede-shaped ("The Action Agenda Topics are the building blocks...") are NOT part of the header; they are the source's own body copy under the "Topics in the Action Agenda" H2 (Section 1 below) and must stay there, not be hoisted into the header.

Hero image — the source page carries its own real photography: a 6-slide Bootstrap carousel (`#homepageCarousel`) directly above the title band, each slide credited. Use one of these; do not use `/photos/sound-aerial.jpg` (a different page's placeholder) or any invented/stock photo. Recommended default is slide 1:
- **Olympic mountains** — credit Randall Williams — `https://actionagenda.pugetsoundinfo.wa.gov/FileResource/DisplayResource/e65b8093-f3e2-4a10-8514-63b0eb8eaa6c` (JPEG, ~8.7MB, full-res)

Alternates, same carousel, all real full-resolution JPEGs confirmed live at fetch time:
- Discovery Park in Seattle — credit RyanCSlimakPhoto — `https://actionagenda.pugetsoundinfo.wa.gov/FileResource/DisplayResource/ced0e620-212a-43d5-b8e3-c4f6f77cfee8`
- Tulip fields in the Skagit Valley — credit Lowestock — `https://actionagenda.pugetsoundinfo.wa.gov/FileResource/DisplayResource/ae68960e-8e0e-4ada-b152-3f299840608c`
- Low tide at Edmonds Beach — credit Mariloutrias — `https://actionagenda.pugetsoundinfo.wa.gov/FileResource/DisplayResource/36a6d7da-b258-439e-8761-97b90b0d99c3`
- Dense housing channels growth into urban areas — credit PhilAugustavo — `https://actionagenda.pugetsoundinfo.wa.gov/FileResource/DisplayResource/50e1fcae-6d53-4376-8bf9-f818a182a4ba`
- The Billy Frank Jr. Nisqually National Wildlife Refuge — credit George Dodd — `https://actionagenda.pugetsoundinfo.wa.gov/FileResource/DisplayResource/3bef0bd7-5095-4735-8ff8-8fa0d6712ce0`

(A photo credit line is real source content carried by the carousel; if `PsInfoPhotoHeader` has nowhere to put a credit, it is acceptable to drop it rather than invent a caption — but it is not acceptable to substitute a different, uncredited photo.)

## Sections (source order, exhaustive)

1. **"Topics in the Action Agenda"** — `<h2>Topics in the Action Agenda</h2>` + 3 paragraphs, verbatim:
   - "The **Action Agenda Topics** are the building blocks of Puget Sound recovery, highlighting priority areas where partners across the region are already making progress—bringing expertise, innovation, and community leadership to the work. But much more remains to be done."
   - "Each Topic outlines the essential Strategies and Actions needed to restore the health of Puget Sound, from long‑range approaches that guide regional direction (Strategies) to near‑term steps that drive immediate impact (Actions). The Actions help steer implementation, inspire new solutions, and focus public and private investment on the work that matters most right now."
   - "Together, the Topics in the Action Agenda chart a clear path where sustained commitment and coordinated action turn our work into a legacy of lasting Puget Sound recovery."
   - (bold emphasis on "Action Agenda Topics" in the first sentence is the source's own markup)

2. **Filter controls** — no heading of its own; a control row directly below the intro, directly above the grid it filters. Real, page-native controls (not decorative), verbatim labels/options:
   - Keyword search — text input, placeholder "Search Topic by Keyword"
   - Vital Sign filter — select dropdown, placeholder "Filter Topic by Vital Sign", 23 options in source order: Air Quality, Beaches and Marine Vegetation, Birds, Cultural Wellbeing, Drinking Water, Economic Vitality, Estuaries, Forage Fish, Forests and Wetlands, Freshwater, Good Governance, Groundfish and Benthic Invertebrates, Local Foods, Marine Water, Orcas, Outdoor Activity, Salmon, Sense of Place, Shellfish Beds, Sound Stewardship, Streams and Floodplains, Toxics in Aquatic Life, Zooplankton
   - "Clear all Filters" button
   - No-results message (hidden until triggered): "There are no Topics matching your filter(s)."

3. **Topic grid** — one flat, unbroken grid of 26 cards, source order exactly as below (NOT grouped under category subheadings — the 5-category taxonomy, Healthy Communities / Sustainable Land Use / Resilient Habitats / Clean Water and Harvestable Shellfish / Foundations of Recovery, exists ONLY in the site's persistent sub-navigation dropdown above the carousel, `aa2026-outcomes-nav` — that is page-level navigation chrome reused across every `/2026-2030/*` page, not a body-content section of this landing page, and must not be reproduced as section headers here). Each card is exactly: cover photo, a small "TOPIC {n}" label, and the title, linking out to that topic's own Overview page on the source site (external — needs `target="_blank" rel="noopener"` + arrow-up-right icon per this repo's link convention). No blurb/description text renders on the card itself (the long topic-description text present in the page's markup is a hidden `data-search-text` attribute feeding the keyword filter — not rendered content — do not surface it as card copy).

   | # | Title | Image (GetFileResourceResized, 430×260) | Links to |
   |---|---|---|---|
   | 01 | Abundant and Harvestable Salmon | `.../FileResource/GetFileResourceResized/d91fe416-35a7-47d9-b508-ceaaf405da33/430/260` | `/2026-2030/Topic/01/Overview` |
   | 02 | Human Health | `.../afcfa4dd-b04b-4fe8-84bc-18b8515146ef/430/260` | `/2026-2030/Topic/02/Overview` |
   | 03 | Toxic Chemical Prevention | `.../461cb3d8-786a-4c53-b3c2-6e12b21b6b3b/430/260` | `/2026-2030/Topic/03/Overview` |
   | 04 | Shared Landscapes | `.../4af90519-a65f-458b-bfe8-abf8738ade68/430/260` | `/2026-2030/Topic/04/Overview` |
   | 05 | Smart Growth | `.../3338f017-4ffb-4b20-a9d4-7190ebecd151/430/260` | `/2026-2030/Topic/05/Overview` |
   | 06 | Agricultural Land Protection | `.../816ea287-f46d-41b2-9a21-cfdb96d8522f/430/260` | `/2026-2030/Topic/06/Overview` |
   | 07 | Working Forest Land Protection | `.../06694874-0697-4eca-9095-960523a92baf/430/260` | `/2026-2030/Topic/07/Overview` |
   | 08 | Marine Vegetation | `.../1ecd9f3c-2c52-4f00-a7ad-ec2db0e719ad/430/260` | `/2026-2030/Topic/08/Overview` |
   | 09 | Healthy Shorelines | `.../5fcccbbf-1be7-4c3a-a05b-c221e89448af/430/260` | `/2026-2030/Topic/09/Overview` |
   | 10 | Floodplains and Estuaries | `.../caaa2d8c-c853-4e33-af6e-ece3fcc87ad3/430/260` | `/2026-2030/Topic/10/Overview` |
   | 11 | Riparian Areas | `.../32fa39a2-e51d-464a-92f4-9feae14e398b/430/260` | `/2026-2030/Topic/11/Overview` |
   | 12 | Freshwater Availability | `.../e5de42e2-e15a-4a6b-acf7-ee5e7a2454c7/430/260` | `/2026-2030/Topic/12/Overview` |
   | 13 | Fish Passage Barriers | `.../494d05f4-4139-472d-a2be-76c47fe8df28/430/260` | `/2026-2030/Topic/13/Overview` |
   | 14 | Invasive Species | `.../d971f6d3-7526-44c0-9214-a4275abfcd14/430/260` | `/2026-2030/Topic/14/Overview` |
   | 15 | Stormwater Runoff | `.../9ab2a47b-3d6d-48d0-9ed8-10135eaa9d0b/430/260` | `/2026-2030/Topic/15/Overview` |
   | 16 | Agricultural Lands Runoff | `.../ab9f24f6-5295-466f-92e3-1e16edd395ac/430/260` | `/2026-2030/Topic/16/Overview` |
   | 17 | Forest Roads Runoff | `.../74d3f771-32a7-4a8b-a154-7feb931810a1/430/260` | `/2026-2030/Topic/17/Overview` |
   | 18 | Fecal Pollution | `.../6e606c7f-146e-4234-8034-c3df1420e080/430/260` | `/2026-2030/Topic/18/Overview` |
   | 19 | Wastewater Treatment Plants | `.../3c1e0a5b-3531-4fc3-947c-93518018550e/430/260` | `/2026-2030/Topic/19/Overview` |
   | 20 | Vessel Impacts | `.../fd8df72e-e7f2-4523-b072-09ccac5a33d2/430/260` | `/2026-2030/Topic/20/Overview` |
   | A | Funding | `.../847d80f8-adc8-425d-85e6-8d83b288b506/430/260` | `/2026-2030/Topic/A/Overview` |
   | B | Research and Monitoring | `.../75c583f6-69a6-42c6-8711-f657d3f681f0/430/260` | `/2026-2030/Topic/B/Overview` |
   | C | Good Governance | `.../69c1285c-b7c4-4023-8196-022d76c232a3/430/260` | `/2026-2030/Topic/C/Overview` |
   | D | Strategic Leadership and Collaboration | `.../7b5af5dd-8b21-4530-9073-e12f5aace58f/430/260` | `/2026-2030/Topic/D/Overview` |
   | E | Workforce Development | `.../db381958-2526-42e4-9ae2-8b4f9a66ed9a/430/260` | `/2026-2030/Topic/E/Overview` |
   | F | Outreach and Behavior Change | `.../e5f7e261-afe1-416c-b887-21819ee1e882/430/260` | `/2026-2030/Topic/F/Overview` |

   (Base for the truncated image URLs: `https://actionagenda.pugetsoundinfo.wa.gov/FileResource/GetFileResourceResized/{guid}/430/260`. Base for the truncated topic links: `https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/{id}/Overview`. Label on each card reads "TOPIC {n}", e.g. "TOPIC 01", "TOPIC A".)

4. **Explorer description band** — one paragraph + one CTA button, verbatim:
   - "The **Action Agenda Explorer** is the companion digital tool that keeps the Action Agenda dynamic and our reporting up to date. It profiles each of the 26 Topics in the 2026–2030 Action Agenda, offering a digital plan overview in the **Overview** tab, locally developed priorities in **Local Action Plans** (when available), current implementation activities in the **Implementation** tab, and results from our efforts in the **Progress** tab. The Explorer makes it easy and interactive to see how work is unfolding across the region and how partners are advancing Puget Sound recovery." (bold spans are the source's own markup)
   - Button: "Read more about the Action Agenda Explorer" → `https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/About` (external — needs `target="_blank" rel="noopener"` + arrow-up-right icon)

The source page ends there. No further sections.

## Existing prototype file audit

`src/pages/prototypes/action-agenda.astro` and `src/data/pages/action-agenda-refresh.ts` are heavily over-invented relative to this specific source URL (Andy's flag). What's happening: the data file's per-topic `overview`, `strategies`, `vitalSigns`, and count fields were sourced by crawling each topic's own `/2026-2030/Topic/{id}/Overview` subpage (a different URL, out of scope for this contract) plus the `/2026-2030/About` page (also a different URL) — real content, but not content of *this* landing page, and assembled here into sections this page does not have.

**Verbatim-usable as-is** (matches this page exactly):
- `PAGE_TITLE = "Topics in the Action Agenda"` and `INTRO_PARAGRAPHS` (all 3) — word-for-word match to Section 1 above.
- `EXPLORER_DESCRIPTION` and `EXPLORER_CTA` — word-for-word match to Section 4 above.
- The 26-entry `TOPICS` array's `id` / `number` / `title` / `href` fields — match the grid inventory in Section 3 (note: `href` there points to the full `https://actionagenda.pugetsoundinfo.wa.gov/...` URLs, correct for an external link).
- The `image` fields point to locally-hosted `/photos/action-agenda-refresh/topic-NN.jpg` — verify at build time these are actually the same 26 source photos listed in Section 3 above (by GUID/subject) and not stand-ins; re-source from the URLs in Section 3 if not.

**Invented/extra — must go:**
- `PAGE_EYEBROW = "Action Agenda 2026–2030"` — no eyebrow appears on the source; drop.
- `PAGE_LEDE` — invented sentence; the source header carries no lede at all (see Header line above); drop entirely, do not fold into the header.
- The `image="/photos/sound-aerial.jpg"` header photo — a different page's placeholder; replace with a real carousel photo from this page (see Header line above).
- `PsInfoStatBand` (Topics / Strategies / Actions / Partner commitments counts) — none of these numbers are displayed anywhere on the source landing page; drop the whole stat band.
- The "Overview" section title wrapping the intro paragraphs — the source has no "Overview" heading, just the H2 "Topics in the Action Agenda" directly (Section 1); drop the extra title, keep the H2 as the section heading.
- "How the Action Agenda is organized" section (`ORGANIZATION_INTRO`, `FOUNDATIONS_OF_RECOVERY`, `RECOVERY_PLAN`) — entirely absent from this page; this is `/2026-2030/About` content. Drop the whole section.
- Category-grouped topic cards (`categoryGroups.map(...)`, one `PsInfoSectionTitle` + `PsInfoHomeCards` per of the 5 categories, each titled with a "{name} — N topics" count) — the source shows one flat 26-card grid with no category subheadings and no per-category counts (the 5-category taxonomy is nav-only, see Section 3 note). Drop the category grouping; render one unbroken grid in the Section-3 order.
- Per-card `blurb` text passed into `PsInfoHomeCards` — the source cards show no description text (see Section 3 note: that text is a hidden search-index attribute, not rendered copy). Drop the blurb from the card face.
- "Strategies by topic" section (`PsInfoActionAgendaRefreshStrategies`, all 110 strategies in collapsibles) — entirely absent from this landing page; that data belongs to the individual Topic Overview subpages. Drop the whole section.
- "How progress is measured" section (`PROGRESS_MEASURES_INTRO`, `PROGRESS_MEASURES`) — entirely absent from this page; this is `/2026-2030/About` content. Drop the whole section.
- Filter controls (keyword search + Vital Sign dropdown + Clear Filters) are currently **missing entirely** from the prototype — this page's own real feature (Section 2 above) needs to be added, not just trimmed.
- Components `PsInfoActionAgendaRefreshProse`, `PsInfoActionAgendaRefreshStrategies`, and `PsInfoActionAgendaRefreshMeasures` are used only by the sections being dropped — once the rebuild removes Overview/Organized/Strategies/Measures, these three components have no remaining caller in this unit and should be deleted (per the ownership rule: delete PsInfo components prefixed for this unit that the rebuild no longer uses).

## Explicit exclusions

- Nothing beyond the 4 sections above (Topics in the Action Agenda intro, filter controls, the 26-card topic grid, the Explorer description band). No invented eyebrow, no lede, no "Overview" section title, no category subheadings/counts on the grid, no per-card blurbs, no Strategies-by-topic section, no "How progress is measured" section, no stat band, no cross-link band. The only photo is the single contracted hero (one of the source's own 6 carousel images) plus the 26 real topic-card thumbnails already inventoried in Section 3 — no other decorative photography.

## Gaps

- The keyword-search and Vital-Sign-filter controls are live client-side JS on the source (`aa2026FilterTopics()` / Bootstrap-select), filtering the same 26 cards already fully inventoried above. Reproducing the filtering *behavior* is optional; reproducing the controls and their real labels/options (Section 2) is not — they are visible, static page content independent of whether the filter logic is wired up.
- The source's persistent sub-navigation bar (`aa2026-outcomes-nav`, the 5-category dropdown menu sitting between the carousel and the title band) is out of scope for this contract as page-chrome/navigation, not body content — flagged here only so it isn't mistaken for a missing content section. Its 5-category → 26-topic taxonomy is otherwise unused by this page's own body content. **Superseded 2026-07-22 — see the addendum below: `aa2026-outcomes-nav` is now reproduced in the photo header's band slot.**

## Revision 2026-07-22 — prod chrome + filter panel + About band

(a) **The topic-categories bar (`aa2026-outcomes-nav`) is in scope**, reproduced as `PsInfoAaTopicsNav` riding the photo header's `band` slot — the same band-under-photo pattern the homepage uses for `PsInfoAnchorNav`, here with five category dropdowns over the 26 topics (`aria-label="Topic categories"`). This supersedes the Gaps-section bullet above, which had scoped it out as nav-only. Every label/href is verbatim from the saved prod DOM (lines 627–744). Prod's CSS-hover dropdowns are rebuilt as keyboard-operable disclosures (button+aria-expanded, Escape closes + refocuses trigger, focusout/outside-click closes) — required for WCAG 2.2 keyboard operability. The page's OTHER navbar (`aaExplorerNavbar`, the site-wide "Explore" mega-menu) stays OUT of scope — **per Andrew's direct instruction 2026-07-22** ("didn't need you to recreate the entire main nav"): the prototype's app shell rail already carries that site-level IA, so an in-page copy duplicates navigation. Do not re-add it.

(b) **Prod CSS facts** fetched 2026-07-22 from `/Content/Bootstrap/aaExplorer_scss/aaExplorer.min.css`, mapped to spoke tokens:
   - `.mainNavbar` (outcomes bar): background `#1b556a`, hover `#193b57` → rendered on the photo header's translucent band layer (the homepage band pattern) with white-alpha hover, white dropdown panels with `#333` items unchanged (mapped to `--color-surface`/`--color-text-secondary`).
   - `.aa2026-bodyone-band` (About band): background `#dfe5f3`, padding 28px/24px, CTA `.btn-primary` border-radius 20px → mapped to `--ps-info-blue-100`, `--radius-full` pill.

(c) **Filter controls** now live in an `esa-card` panel (`PsInfoAaFilterPanel`, composing `esa-filter-container` + `esa-text-field` + `esa-select` + `esa-filter-clear-button`) with working keyword + Vital Sign filtering and a "Clear all Filters" button that resets both controls. `VITAL_SIGN_OPTIONS` now carries prod's own numeric option values (`2`, `31`, `17`, …) instead of derived slugs, and every `TOPICS` entry carries `vitalSignIds: number[]` captured verbatim from prod's `data-vital-sign-ids` card attributes. Keyword matching is against the topic **title only** — prod also indexes a hidden ~3KB-per-topic `data-search-text` description string that is deliberately not carried into the data module (would bloat it for no rendered benefit). Topics A–F (Foundations of Recovery) carry an empty `vitalSignIds` array, matching prod: any Vital Sign filter selection hides all six, which is prod's own behavior, not a prototype gap.

(d) The Explorer description band (prod DOM lines ~1177–1187) now renders as `PsInfoAaAboutPanel` — a tinted panel (`--ps-info-blue-100`) holding the verbatim prose with the "Read more about the Action Agenda Explorer" CTA inside the same container, below the text, left-aligned — matching prod's `.aa2026-bodyone-band` layout.

(e) **Internal-link convention change**: all `*.pugetsoundinfo.wa.gov` links on this page (topic cards, the About CTA, the topics nav) lost `target="_blank"` + the arrow-up-right icon — these are prod-internal pages, not external links, so they now open in the same tab with no external mark. Genuinely external hosts keep the lucide external-link mark.

## Addendum 2026-07-22 — Topic 05 exemplar (Smart Growth)

**Source**: the three Topic 05 tab pages, saved DOMs fetched 2026-07-22 —
`https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Overview`,
`.../Topic/05/Implementation`, `.../Topic/05/Progress`. Route:
`/prototypes/action-agenda/topic-05` (new file: `src/pages/prototypes/
action-agenda/topic-05.astro`). This is the Action Agenda module's Topic
exemplar — proof that the module's 26-topic landing page can route one real
Topic into a content-exact, three-tab detail page built entirely from
existing legos + this unit's own new `PsInfoAaTopic*`/`PsInfoAaStrategyTree`/
`PsInfoAaCommitmentsTable`/`PsInfoAaIndicator*`/`PsInfoAaImplementationLists`/
`PsInfoAaFinancialChart` components.

**Standard-pattern adaptation**: prod's badge banner ("TOPIC 5" / "Smart
Growth" h4 / "SUSTAINABLE LAND USE" badge) + a routed 3-link tab bar becomes
`PsInfoPhotoHeader` (`size="band"`) with the Topic's real cover photo as the
hero image, "TOPIC 5" as the hero eyebrow, "Smart Growth" as the page's only
H1, and `PsInfoAaTopicsNav` unchanged in the header's band slot (Smart Growth
lives under the nav's own "Sustainable Land Use" dropdown — no edits needed
there). A `PsInfoAaTopicMeta` row directly under the hero carries the
category badge + the "About the Action Agenda Explorer" link (prod's
right-floated `<i class="fa-info-circle">` link). The three tabs become
`esa-tab-layout` (`size="lg"`) with three SSR'd slotted panels — tab
selection is client-state only on this one route (prod uses separate routed
URLs per tab); because every panel is server-rendered regardless of which is
active, `curl`/`grep` verification sees all three tabs' content in one
fetch.

**Full inventory — NO truncation anywhere**:
- 7 Overview body paragraphs, verbatim, including the closing paragraph's 4
  inline links to sibling Topics (15, 06, 07, 09).
- The "VITAL SIGNS" ribbon card: 5 links, verbatim labels/hrefs.
- 4 Strategies / 36 Actions (6+13+7+10), verbatim codes and text, in the
  `PsInfoAaStrategyTree` Fancytree reproduction (Expand Levels / Collapse
  Levels / search+match-count / reset — prod's own toolbar labels).
- 73 Commitments across 14 organizations — every row's Status column reads
  "Not reported" (verified constant across all 73 in prod). Rendered TWICE
  (Overview panel `#commitments` and Progress panel `#progress-commitments`)
  because prod repeats the identical table on both of its own pages —
  verified byte-identical in the saved DOMs. Each instance is independently
  searchable (`instanceId="ov"` / `"pr"`, ids prefixed accordingly).
- 10 Indicators with trend + (where present) target-status values, rendered
  twice: once as `PsInfoAaIndicatorExplorer` (Overview — an icon-tile
  tablist + rich panel, the manual WCAG tabs pattern) and once as
  `PsInfoAaIndicatorsTable` (Progress — a plain Indicator/Trend/Target
  Status table), matching prod's own two renderings of the same dataset.
- 19 Ongoing Programs / 20 NEP Activities / 40 Legislative Bills in full,
  each with every field prod carries (activity types, related topics,
  award/start-year/stage for activities, pass/fail status + bill links for
  bills) — verified counts: 38/40/80 raw id occurrences in the rendered HTML
  (each card's disclosure region contributes one `id=` and one
  `aria-controls=` reference, i.e. 2× the true count of 19/20/40).
- Financial Investments: all 5 bienniums (2015–2017 through 2023–2025),
  verbatim state/federal/private-local values and formatted labels from
  prod's own embedded chart dataTable, plus the 4 footnote paragraphs.

**Honest downgrades** (all deliberate, all recorded here):
1. Implementation tab's "Export to Excel" / "Clear All Filters" / per-column
   "Filters" flyouts are omitted — dead controls in a static exemplar (the
   Organization filter dropdown alone carries roughly 600 options pulled
   from the whole AA dataset, not just Topic 05).
2. Interactive Google charts become: prod's own chart PNGs for the 5
   indicators that ship static images (Estuary area, Feeder bluffs, Housing
   diversity, Infill development, Urban growth); the 2 indicators with a
   live Google column chart (Floodplain function, Sense of Place Index)
   render as accessible `<table>`s built from prod's own embedded
   dataTable values; the Financial Investments chart is an SSR inline SVG
   stacked column chart (State→Federal→Private/Local, prod's own legend
   colors #3366cc/#dc3912/#ff9900) with a `<details>` accessible data table
   underneath — the 1.4.1 complex-image escape hatch and an honest
   replacement for prod's "download chart data" affordance.
3. Prod's h5 list headings (Ongoing Programs / NEP Activities / Legislative
   Bills column headings) are normalized to h3 — WCAG ordered-heading
   requirement (this page's heading chain is h1 → h2 → h3, no skips: one h1
   from the hero, 8 h2s from `PsInfoSectionTitle`, 5 h3s — the Overview
   tab's "2026-2030 Commitments"/"Indicators" subsections plus the
   Implementation tab's 3 list-column headings).
4. The cover photo moves from the Overview sidebar (where prod repeats it)
   into the hero — not duplicated on the page; recorded as the intentional
   reading of the standard pattern.
5. The Implementation tab's disclosure cards open independently (prod's
   Bootstrap accordion auto-closes siblings within a column) — the simpler,
   keyboard-friendlier behavior; title link and disclosure toggle are
   separate interactive elements throughout (esa-collapsible was checked and
   rejected for exactly this reason — a summary-as-toggle swallows the
   linked title).
6. Commitments-table search-match highlighting is not reproduced (the
   filtering behavior is).
7. `#progress-commitments` is a uniquified id — prod reuses the plain
   `#commitments` id on what is, for this exemplar, a second section on the
   SAME page (prod's Overview and Progress tabs are separate URLs, so the
   collision never occurs there).

**Routing**: `TOPICS` (`src/data/pages/action-agenda.ts`) — Topic 05's
`href` changed from the prod absolute URL to the internal route
`/prototypes/action-agenda/topic-05`; every other Topic keeps its prod
`href` unchanged. `PsInfoActionAgendaTopicGrid.astro` and
`PsInfoAaTopicsNav.astro` (both AA-unit files, not on the shared off-limits
list) now wrap any root-relative `topic.href` in `withBase()` before
rendering — required so the internal Topic 05 route resolves correctly
under the production build's `/ps-info-design/` base path (previously both
rendered every `TOPICS` href raw, safe only because all 26 were prod-absolute
URLs).

**A11y**: one h1 (hero); ordered h2/h3 heading chain (no skips); every nav
labeled (`PsInfoAaTopicContents` — "Contents" / "Progress contents"); all
toggles are real `<button type="button">` with `aria-expanded` +
`aria-controls`; the Indicator Explorer implements the full manual
role=tablist/tab/tabpanel pattern with roving tabindex and Arrow/Home/End
keys (esa-tab-layout's shadow-DOM tabs can't host icon-tile triggers with
rich SSR'd panels, so its `role="tablist"` doesn't appear in the light DOM —
the Indicator Explorer's own tablist is the one `role="tablist"` a page
fetch will see); every image has real or empty `alt` per its data-bearing/
decorative status (trend/target-status/commitment-status icons carry
descriptive alt text; nav-card icons, card header icons, and the bill
pass/fail badge icon are `alt=""` with the status conveyed in adjacent
text); icon-only controls (search reset, card-disclosure chevrons) carry
`aria-label`; search inputs are labeled (`esa-text-field` `label` prop /
`sr-only` span); match-count and no-matches messages are `role="status"`;
all interactive targets clear 24×24px; body/row text is 1rem+, labels
0.875rem semibold, nothing below the 13px meta floor (the financial chart's
SVG axis/segment labels were bumped from 12px → 13px per the `check-a11y`
hook).

## Revision 2026-07-22 — Andrew's markup pass (header bar, tab skin, carousel chrome)

Directed revision of the Topic 05 exemplar to Andrew's markup, grounded in the
three saved tab DOMs plus the existing code. No content re-fetched or
re-typed — this is chrome/restyle work over the same verbatim data
(73 commitments, 10 indicators, 19/20/40 implementation items, 4 strategies/
36 actions, financial footnotes). Honest deltas from the previous build:

1. **H1 relocated.** The page's only `<h1>` moves from the hero
   (`PsInfoPhotoHeader`'s title prop) into the recreated `aa2026TopicHeader`
   bar (`PsInfoAaTopicHeaderBar`) directly below it. The hero is now a
   photo-only band (no title, no eyebrow) carrying just the topic cover photo
   and `PsInfoAaTopicsNav` in its band slot — `PsInfoPhotoHeader`'s `title`
   prop was already optional (main-thread change), so no shared-file edit was
   needed here.
2. **3D badge-fold notch waived.** Prod's `aa2026TopicBadgeFold` corner-notch
   effect on the header bar is explicitly NOT reproduced — Andrew's direct
   instruction, 2026-07-22. The bar is a flat navy rectangle.
3. **Tab strip re-skinned onto `esa-tab-layout` (segmented).** Prod's tabs
   are three routed links (`role="tab"` on an `<a>`, one per URL); this
   prototype keeps client-state tabs on one route so `curl`/`grep`
   verification sees all three panels in one fetch. The strip itself is now
   skinned to prod's periwinkle/navy look via `PsInfoAaTopicTabs`, using the
   lego's public inherited custom-prop hooks (`--color-surface`,
   `--color-surface-sunken`, `--tab-layout-color*`) plus a `::part(tabs)`
   override for the strip's background/border/radius — a capture-and-restore
   pattern re-points those same inherited props back to their page defaults
   inside the slotted panels, so cards/tables inside each tab stay white
   rather than inheriting the navy skin.
4. **"Show more (68)" — directed count format.** Prod's static
   `commitmentsProgressiveDisclosure.js` button DOM reads just "Show more"
   (the remaining count and the show-more/show-less toggle are runtime
   behavior, not static markup). Andrew's markup calls for an explicit
   remaining count and a "Show less" collapsed state; both are rebuilt
   natively (68 = 73 total − 5 shown). The cap SSRs all 73 rows always — the
   extra 68 carry `data-aa-commit-extra` + `hidden` — so `curl` still sees
   every row regardless of the toggle's runtime state.
5. **June-2026 commitments callout added to Overview too.** The
   "Reporting for Commitments starts in June 2026…" callout is verbatim from
   the Progress DOM's `aa2026ProgressLegend` (prod's Overview tab carries no
   such callout at all). Andrew's markup places it after both Commitments
   blocks (Overview AND Progress) — the Overview instance is this
   prototype's own addition, not a prod fact, recorded here so it's never
   mistaken for a sourcing error.
6. **Carousel arrows/dots are native chrome.** Prod's Indicator Explorer
   carousel arrows and dot pagination are injected at runtime by its own
   slick-carousel bundle (`pmSliderNav`) and are absent from the static saved
   DOM. They are rebuilt natively here (scroll-snap viewport, `scrollBy`/
   `scrollTo` arrows and dots, `prefers-reduced-motion`-aware) over the
   existing manual `role=tablist/tab/tabpanel` machinery — the tabs
   themselves are unchanged (still the sanctioned WCAG tabs pattern with
   roving tabindex and Arrow/Home/End); the carousel layer is a presentation
   concern on top of that, not a replacement for it.
7. **Implementation card footers moved inside the disclosure.** The
   disclosure structure (toggle + `aria-expanded`/`aria-controls` + hidden
   body) already existed; what was missing is that prod's own collapse
   regions (verified in the Implementation DOM — e.g.
   `#collapse_program_259 > .footer`) hold the card's footer (Program
   Website / Activity Stage + Project Website / bill Status + House Bill
   Link) INSIDE the same toggled region as the body, not always-visible
   below it. Each card's body + footer are now wrapped in one
   `.aaimpl__region[hidden]`, toggled by the same button — no carried data
   moved or changed, only its visibility scope.
8. **Overview sidebar photo.** `AA_TOPIC05_OVERVIEW_PHOTO` (new export) is a
   local `topic-05.jpg` standing in for prod's own FileResource cover image
   in the Overview tab's in-card sidebar (distinct from the hero's own
   `topic-05-cover.jpg` crop) — alt text (`"Cover photo for Smart Growth"`) is
   verbatim from the Overview DOM's own `<img alt>`.

**Other component restyles in this pass** (no data changes, chrome only):
section headers (`PsInfoAaSectionHeader`, new) get prod's blue-text +
full-width-hairline treatment on all three tabs; the Vital Signs ribbon
(`PsInfoAaTopicVitalSignsCard`) centers its links with real `aria-hidden`
`" / "` separator spans (never CSS `content`) over a periwinkle panel; the
Contents jump-nav (`PsInfoAaTopicContents`) is now a bordered card; the
Strategies/Actions tree (`PsInfoAaStrategyTree`) indents Action rows one full
`--spacing-600` step deeper than their parent Strategy row (52px flush →
124px, one clear step); the Commitments search
(`PsInfoAaCommitmentsTable`) is rebuilt as a fused icon-addon input group
(prod's own Bootstrap `.input-group` shape) replacing the previous
floating-label/detached-Clear layout; the Progress Indicators table
(`PsInfoAaIndicatorsTable`) gets a navy header row and wider Trend/Target
Status columns (8.5rem) so the 64px status images stop being squished.
`PsInfoAaTopicMeta.astro` is deleted (superseded by `PsInfoAaTopicHeaderBar`;
grep-verified no other caller).
