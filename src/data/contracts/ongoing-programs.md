# Page contract: ongoing-programs (five-page portal buildout)

Source: `https://www.pugetsoundinfo.wa.gov/OngoingProgram/{Index,Programs,Budgets,Targets,Dashboard}`
Routes: `/prototypes/ongoing-programs{,/programs,/budgets,/targets,/dashboard}`

Sourcing: the Index page was fetched 2026-07-17 (`curl -sL`, confirmed
server-rendered — the `b-w6y3vrj8mn` scoped-CSS attributes are harmless Blazor
markup, not client-rendered content). Programs / Budgets / Targets / Dashboard
were extracted 2026-07-22 from saved prod DOM snapshots **plus** prod's own
live JSON endpoints, fetched directly rather than re-derived from rendered
HTML: `/OngoingProgram/IndexGridJsonData` (270 program rows),
`/OngoingProgram/FinancialsGridJsonData` (3,240 financial records), and the
Dashboard page's inline `AngularViewData` (the chart matrices). **No row
truncation anywhere**: all 270 program rows, all 3,240 financial records, and
all 37 targets (2 cycles / 22 programs) are carried in full in the sibling
JSON files under `src/data/pages/`.

## Directed-rebuild header note (applies to all five pages)

All five pages share the standard PhotoHeader hero + band pattern established
elsewhere in this prototype (goals, vital signs, Action Agenda): a photo hero
whose `esa-page-header` renders each page's own `<h1>` (title = that prod
page's own `breadcrumbTitle`, verbatim), with `PsInfoOgpSubnav` riding the
header's `band` slot — a re-pointing of prod's own
`#ogpNavbarSupportedContent` tab strip (Program List / State Program Budgets
/ Program Targets / Data Dashboard) onto this prototype's internal routes,
marking the current section with `aria-current="page"`. This is a deliberate
elevation, not a literal reproduction: prod's own `ogpTitleBar` is a plain
navy text bar, not a photograph. Prod's site-wide `PUGET SOUND INFO /
EXPLORE` mega-menu is NOT reproduced anywhere — the app shell's rail already
carries that IA (repo-wide rule).

**Hero photo**: the Billy Frank Jr. Nisqually National Wildlife Refuge aerial
(credit George Dodd; source
`https://actionagenda.pugetsoundinfo.wa.gov/FileResource/DisplayResource/3bef0bd7-5095-4735-8ff8-8fa0d6712ce0`),
one of the Action Agenda carousel's real credited alternates, chosen per
direction as a NEW photo not used anywhere else in this prototype — a federal
wildlife refuge is itself an ongoing program, and its cool palette holds up
under the header's blue-950 scrim.

---

## 1. Index (`/prototypes/ongoing-programs`)

Header: `title="Ongoing Programs"` (verbatim breadcrumb/`<title>` text — not
"Ongoing Programs Portal"; "Portal" only appears mid-sentence in the body
copy). Subnav renders with no `current` item (this is the portal home, not
one of the four sibling sections).

### Sections (source order, exhaustive)

1. Inline regional map image (floated right), a Puget Sound / Salish Sea
   bioregion map. Source ships `alt=""` (decorative per the source's own
   markup — an accessibility gap in the original); extracted to a real asset
   (`public/photos/ongoing-programs/salish-sea-map.png`, 767×771) with
   meaningful alt text supplied for WCAG compliance.
2. Two verbatim intro paragraphs (see `src/data/pages/ongoing-programs.ts`
   `INTRO_PARAGRAPHS`). Four empty `<p>&nbsp;</p>` spacer paragraphs in the
   source are layout filler, dropped.

Nothing else lives on this route: no headline stats, no program table, no
cross-link band, no closing CTA.

---

## 2. Program List (`/prototypes/ongoing-programs/programs`)

Header: `title="Program List"` (breadcrumbTitle verbatim). Subnav
`current="programs"`.

### Sections (source order, exhaustive)

1. **Intro paragraph** — verbatim, see `PROGRAMS_INTRO`.
2. **"Ongoing Programs by Activity Type"** — prod renders this as a `<strong>`
   pseudo-heading, not a real heading tag; promoted to a real `<h2>` here
   (`PsInfoSectionTitle`). Intro sentence (`ACTIVITY_TYPE_INTRO`, verbatim)
   followed by 3 bullet points, each with the source's own exact `<strong>`
   placement (`ACTIVITY_TYPE_BREAKDOWN`).
3. **Activity-type donut chart** — prod ships this as a raster PNG with
   `alt=""` (no text alternative at all — a real accessibility gap in the
   original, not a stylistic choice). Percentages verified against the
   decoded prod PNG: Behavior Change 18%, Ecological Restoration 34%,
   Enabling Condition 48%; slice colors sampled from the same PNG (`#6E5FB1`
   / `#AAD144` / `#1A7DBC`). Rebuilt natively as an inline SVG donut
   (`PsInfoOgpActivityDonut`) with a real 16px legend and an sr-only
   `<figcaption>` carrying the full data sentence — the record's own text
   alternative fix.
4. **"All Programs"** — prod `<h3>`, promoted to `<h2>`. The 270-row,
   19-column AG Grid (`PsInfoOgpProgramsGrid`), with prod's own toolbar: row
   count (`Currently Viewing N out of 270 Programs`), a clear-filters button,
   "Download Table" (CSV export of all 19 columns, `ongoingProgramsGridExport`),
   and "Download Full Program Database" (a real link to prod's own
   `/OngoingProgram/OngoingProgramFullExcelDownload` endpoint — an inert href
   per the repo's mock-data rules, not a functioning download in this
   prototype).

### Honest simplifications (recorded, not silently dropped)

- Prod's custom `DropdownFilterComponent` (used on Program Status / Start
  Year / Primary Contact / Geographic Scope) and `agDateColumnFilter` are
  simplified to AG Grid Community's `agTextColumnFilter` on every column —
  community edition has no built-in dropdown/date filter components.
- Prod's per-column header help-icon popovers (server-backed
  `FieldDefinition` dialogs explaining each field) are not reproduced — they
  require a backend endpoint this prototype has no equivalent for.
- All 270 rows are carried (`ongoing-programs-program-rows.json`, verified
  row[0] = "Adaptive Systems and Accountability Program" / `OGP_PSP11` /
  `/OngoingProgram/Detail/113/Overview`), matching prod's
  `IndexGridJsonData` endpoint exactly — no truncation.

---

## 3. State Program Budgets (`/prototypes/ongoing-programs/budgets`)

Header: `title="State Program Budgets"` (breadcrumbTitle verbatim). Subnav
`current="budgets"`.

### Sections (source order, exhaustive)

1. **Intro paragraph**, verbatim, **including the source's own arithmetic
   error**: it says budget information is available for "four state fiscal
   biennia" and then lists FIVE (2015-17, 2017-19, 2019-21, 2021-23,
   2023-25). This is the source's own mistake, kept verbatim rather than
   silently corrected.
2. **3 methodology bullets** (`BUDGETS_NOTES`), verbatim, `&nbsp;` normalized
   to a plain space.
3. **Prod's own floated photo** — a salt marsh estuary at low tide. Prod ships
   this as a 12MB base64-embedded PNG; extracted and downscaled to a real
   1000×664 JPEG asset (`budgets-estuary.jpg`) rather than re-embedding
   base64.
4. **"Program Financial Information"** — prod `<h3>`, promoted to `<h2>`. The
   3,240-row, 16-column AG Grid (`PsInfoOgpFinancialsGrid`), with row count
   (`Currently Viewing N out of 3,240 Program Financial Records`), clear
   filters, and Download Table (CSV export, `ongoingProgramFinancialsGridExport`).
   Prod's Budgets page has **no** full-database download link (unlike
   Program List) — not added here either.

### Column-header quirks (kept verbatim, one exception noted)

- `ProgramID` — no space, prod's own header text, kept as-is.
- `PS Portion Methodology Comment` — prod's actual header has a trailing
  space (`"PS Portion Methodology Comment "`); trimmed here (a real, harmless
  whitespace artifact, not meaningful content).
- Numeric columns (`Statewide Total`, `Puget Sound Total`) keep prod's own
  integer-formatting convention (`toLocaleString('en-US')`, no decimals) and
  `agNumberColumnFilter`.
- All 3,240 rows are carried (`ongoing-programs-financial-rows.json`, verified
  row[0]: "Adaptive Systems and Accountability Program", FY 2025, 2023-2025
  biennium, Operating, 001–General Fund, $1,060,000 / $1,060,000) — no
  truncation, matching prod's `FinancialsGridJsonData` endpoint exactly.

---

## 4. Program Targets (`/prototypes/ongoing-programs/targets`)

Header: `title="Program Targets"` (breadcrumbTitle verbatim). Subnav
`current="targets"`.

### Sections (source order, exhaustive)

1. **Intro, 2 verbatim paragraphs**, both with a `<strong>`-wrapped inline
   link (prod bolds both):
   - ¶1 links "Action Agenda" → `https://actionagenda.pugetsoundinfo.wa.gov/`
     — an internal-classified host (`*.pugetsoundinfo.wa.gov`) per this
     repo's external-link rule: same tab, no mark.
   - ¶2 links "Program Target Task Board" → prod's own href, which is an
     Outlook-safelinks-wrapped Power BI URL. Carried **verbatim** (the link
     resolves as prod ships it); the unwrapped destination is
     `https://app.powerbigov.us/view?r=eyJrIjoiYjU1Y2YzMzItOTA2MC00ZGU2LWExYzctMWExMTkzY2Q5OTcyIiwidCI6IjExZDBlMjE3LTI2NGUtNDAwYS04YmEwLTU3ZGNjMTI3ZDcyZCJ9`.
     `gcc02.safelinks.protection.outlook.com` is a genuinely different host →
     new tab + `rel="noopener"` + the external-link mark, per rule.
   - Prod also has an empty trailing `<a> </a>` immediately after the Task
     Board link (no href, no visible text) — dropped as pure markup noise.
2. **Prod's own floated photo** — layered forested islands and channels of
   Puget Sound. Extracted/downscaled from prod's own 12MB base64 embed to a
   real 1000×666 JPEG (`targets-sound.jpg`).
3. **ACTION AGENDA CYCLE > ONGOING PROGRAM > TARGET tree** — no heading
   between the intro and the tree in prod; none added here. Full Fancytree
   reproduction (`PsInfoOgpTargetsTree`): a shared toolbar (Expand Level /
   Collapse Level / search, labels verbatim), then one framed tree table per
   cycle, in source order: "2026-2030" first (13 programs, 22 targets), then
   "2022-2026" (9 programs, 15 targets) — 37 targets total, all carried.
   Column headers (`ACTION AGENDA > ONGOING PROGRAM > TARGET` / `OWNER
   ORGANIZATION` / `TREND` / `TARGET STATUS`) keep prod's own uppercase
   wording (source's own column text, same treatment as
   `PsInfoVsFancyTree`'s header row — not an invented ornamental label).
   Trend/status icons are prod's own PNGs
   (`/Content/img/OngoingProgramTargetIcons/*.png`, downloaded to
   `public/photos/ongoing-programs/icons/`) with prod's exact alt-text format
   (including its own missing space after the colon: `"...trend:${t}"`).
   Prod's `#matches` counter is reproduced as an `aria-live="polite"` results
   count.

### Spot-checks (verified against the imported tree)

- Cycle "2026-2030", first program "Aquatic Lands Habitat Restoration
  Program" (`/OngoingProgram/Detail/16/Overview`, owner "Washington State
  Department of Natural Resources"), 3 targets, all Data Pending / Data
  Pending — matches every 2026-2030 target (all Data Pending/Data Pending,
  reflecting that this cycle is newly launched with no results yet).
- Cycle "2022-2026", first program "Conservation Reserve Enhancement Program
  (CREP)" — target "Acres of riparian forest buffer installed on
  agricultural lands…", trend "Off Track", status "Below Target".
- Cycle "2022-2026", last program "Shorelands - Floodplains by Design" — 3
  targets (Off Track/Below Target, then On Track/Met Target ×2).

---

## 5. Data Dashboard (`/prototypes/ongoing-programs/dashboard`)

Header: `title="Data Dashboard"` (breadcrumbTitle verbatim). Subnav
`current="dashboard"`.

**Flagged ambiguity, resolved by inspection, not assumption**: the brief
expected this page to embed a dashboard iframe (Power BI/ArcGIS). Prod has NO
iframe here — it is an AngularJS application rendering Google Charts from an
inline `AngularViewData` payload. The iframe clause in the brief is
inapplicable to this route; the full chart datasets were extracted from that
inline payload instead and are carried complete in
`ongoing-programs-dashboard.json`.

### Sections (source order, exhaustive)

1. **Intro paragraph**, verbatim (`DASHBOARD_INTRO`).
2. **"Number of Programs by Vital Sign"** — a horizontal bar chart (prod:
   Google Charts `BarChart`), axis label "Number of Programs", rotated
   category-axis title "Vital Sign", with a multi-select "Filter by
   Organization Type" control. Rebuilt as token-styled DOM bars
   (`PsInfoOgpBarChart`) in an esa-card container with prod's gridlines +
   0/25/…/100 tick row — label/value are always real text, never rasterized.
   Below the plot, prod's "VIEW N SELECTED PROGRAMS" expander renders as a
   link band to the Program List page carrying the stored unfiltered count
   (245); it hides while a filter is active — the captured aggregation
   cannot compute a filtered DISTINCT-program count (2026-07-23 revision).
3. **"Number of Programs by Activity Type"** — same chart shape (rotated
   axis title "Activity Type", band count 268). "Project Planning and
   Design" (zero programs) IS a chart row on prod — confirmed by prod's own
   chart-data XLSX export (2026-07-23) and restored here (an earlier audit
   wrongly recorded it as correctly-absent).
4. **"State Agency Ongoing Program Estimated Puget Sound Budget"** — a
   stacked column chart (prod: Google Charts `ColumnChart`) by biennium.
   Prod's DISPLAYED series is a **State / Other fund-source split** —
   confirmed and captured verbatim from the chart's own XLSX export
   (2026-07-23, `budgetBySource`; per-biennium totals reconcile exactly with
   the earlier `budgetByBiennium` budget-type cut). Rebuilt as token-styled
   DOM columns (`PsInfoOgpBudgetChart`) in an esa-card with prod's $600M-step
   dollar ticks/gridlines, rotated "Estimated Puget Sound Budget" vAxis
   title, hAxis "State Biennium", right-side legend in prod's order
   (Other above State), prod's sampled series palette (State `#8fad71` /
   Other `#c8c8c8`), a real-text total label per column, and an sr-only data
   table carrying every exact dollar value. The filter is a multi-select over
   the displayed series, labeled "Filter by Fund Source" (NOT verbatim —
   prod's "Filter by Budget Type" control filters this series through
   record-level biennium × budgetType × fundSource data that was never
   captured; that cross cannot be derived from the two 2D cuts, so prod's
   filter dimension is omitted rather than faked).

### Aggregation & simplification notes

- `programsByVitalSign` / `programsByActivityType` row order is prod's own
  **alphabetical** order, confirmed and adopted 2026-07-23 from the charts'
  own XLSX exports (an earlier build used count-desc when prod's order was
  believed unrecoverable — superseded).
- Budget totals sum `pugetSoundTotal` across all financial records per
  biennium × budget type; verified totals: 2023-2025 = Capital $966,759,000 /
  Operating $644,889,000 / Transportation $777,950,000 (≈ $2,390M combined,
  the largest of the five biennia). The XLSX-exported State/Other cut
  reconciles with these totals exactly, per biennium. Both cuts live in
  `ongoing-programs-dashboard.json`.
- Bar color is `--ps-info-blue-400` (the token step nearest prod's slate-blue
  bars); budget series colors are prod's own sampled palette (see section 4).
- Filter controls are **multi-select** (esa-filter-dropdown; empty selection
  = unfiltered, the lego's clear state) — matching prod's "N of M selected"
  shape (2026-07-23; supersedes the earlier single-select simplification).
  Bar-chart org-type subsets SUM the selected org types from each row's
  captured byOrgType matrix — real arithmetic, not simulation.
- **Excluded, deliberately, and not built**: the per-chart "Options" dropdown
  (Enlarge / Download Chart Data — both server-backed POST endpoints with no
  equivalent here); the collapsible program TABLES under each chart (the
  band is a link to the Program List page instead — see section 2); the
  budget chart's budget-type filter dimension (see section 4).

---

## Explicit exclusions (all five pages)

- Prod's site-wide `PUGET SOUND INFO / EXPLORE` mega-menu — never
  reproduced; the app shell rail carries that IA on every page in this
  prototype (repo-wide direction).
- No invented ledes, taglines, eyebrows, or stat bands beyond what each prod
  page itself renders.
- No cross-link bands — none of the five prod pages carry one.

## Gaps

- Prod's activity-type donut and both floated Budgets/Targets photos are
  base64-embedded rasters with `alt=""` in the source markup — accessibility
  gaps in the original that this rebuild fixes (real assets + real alt text /
  a native SVG donut with a text alternative), not omissions to flag as
  missing.
- The Data Dashboard's exact client-side row ordering and its "Options"/
  collapsible-table server endpoints are not recoverable from a static DOM
  snapshot — see the Aggregation & simplification notes above for what was
  substituted and why.
- No other gaps: every verbatim string, column header, row count, and
  chart/tree data point in this contract was extracted directly from the
  saved prod DOMs or prod's own live JSON endpoints, fetched 2026-07-22.
