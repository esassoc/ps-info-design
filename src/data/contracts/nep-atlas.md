# Page contract: nep-atlas

Full module build — six routes, no longer a single-URL reproduction. Sources
(all fetched/curled 2026-07-22):

| Route | Prod URL |
|---|---|
| `/prototypes/nep-atlas` | `https://nepatlas.pugetsoundinfo.wa.gov/` |
| `/prototypes/nep-atlas/about` | `https://nepatlas.pugetsoundinfo.wa.gov/Home/About` |
| `/prototypes/nep-atlas/map` | `https://nepatlas.pugetsoundinfo.wa.gov/Home/NepAtlasMap` |
| `/prototypes/nep-atlas/activities` | `https://nepatlas.pugetsoundinfo.wa.gov/Activity/Index` |
| `/prototypes/nep-atlas/awards` | `https://nepatlas.pugetsoundinfo.wa.gov/Award/Index` |
| `/prototypes/nep-atlas/investment-summary` | `https://nepatlas.pugetsoundinfo.wa.gov/Activity/Summary` |

Plus two data feeds (`/Activity/IndexGridJsonData` — 1,614 rows; `/Award/IndexGridJsonData`
— 14 rows) and two tab fragments (`nep-summary-vitalsigns.html` / `nep-summary-geography.html`,
carrying the Investment Summary page's inlined 1,608-activity payload).

This supersedes the prior single-URL contract, which declared the sub-pages
"out of scope for this single-URL directed reproduction" — the brief that
drove this build explicitly reversed that; the home page's data-module
header comments were rewritten accordingly.

## Standard hero/band decision

Every page in this lane uses `PsInfoPhotoHeader size="band"` with
`PsInfoNepAtlasNav slot="band"`, per the repo's standard page pattern:

- **Home page hero title**: prod's module-wide banner text, sentence-cased —
  **"Puget Sound National Estuary Program Atlas"** (was `PAGE_EYEBROW`,
  renamed `HERO_TITLE` and promoted to the H1; the home page drops the
  eyebrow it used to carry). "NEP Atlas" remains the doc `<title>` and the
  app-shell rail's label (`src/data/psinfo-nav.ts`, untouched).
- **Sub-page hero titles**: each page's verbatim prod `breadcrumbTitle`
  (About / NEP Activity Map / NEP Activities / NEP Awards / NEP Investment
  Summaries); eyebrow = `HERO_TITLE` on every sub-page; no lede on sub-pages
  (only the home page keeps `PAGE_LEDE`).
- **Band nav**: `PsInfoNepAtlasNav` reproduces prod's own module bar (the
  `mainNavbar` nav rendered inside the nepatlas.pugetsoundinfo.wa.gov shell:
  About / Activities ▾ / NEP Awards / Summaries ▾) — labels, hrefs (recorded
  as `prodHref`/`prodTitle` provenance), and cell shapes all verbatim. The
  saved DOM ALSO contains the sitewide "Puget Sound Info / Explore"
  mega-menu; that is deliberately NOT reproduced anywhere in this lane — the
  app shell rail carries that IA (Andrew's direct, previously-violated
  instruction). No Home cell was added; prod's own bar carries none.
- **Hero image**: `/photos/nep-atlas/estuary-welcome.jpg` on all six pages,
  `focus="50% 35%"` — the module's only real prod photograph on the home
  page (decoded from a base64 `<img>` inline inside the "Welcome to the NEP
  Atlas" heading, 1920×1080, source `alt=""`; downloaded, downscaled to
  1200w, and captioned with a reasonable non-fabricated alt string, same
  policy as every other image in this lane).

## Per-page verbatim inventories

### Home (`/`)

- **Welcome to the NEP Atlas** (h2): one verbatim paragraph
  (`WELCOME_PARAGRAPH`), links in original sentence position:
  "Strategic Initiative Leads" → `https://pugetsoundestuary.wa.gov/` (ext);
  "Northwest Indian Fisheries Commission" → `https://nwifc.org/` (ext);
  "Puget Sound Partnership" → `https://psp.wa.gov/` (ext);
  "U.S." → `http://www.epa.gov/puget-sound/epa-geographic-funding-work-puget-sound-recovery` (ext);
  "Environmental Protection Agency" → `https://www.epa.gov/puget-sound/epa-geographic-funding-work-puget-sound-recovery` (ext).
  Source wraps "U.S." and "Environmental Protection Agency" as two adjacent
  anchors to http/https variants of the same URL, joined by a plain-text
  space segment — reproduced exactly.
- **Activities map**: `PsInfoNepAtlasMap` (interactive Leaflet reproduction;
  invented representative points). The "Click to view the full map" link
  (`MAP_TEASER`) is now INTERNAL — routes to `/prototypes/nep-atlas/map`
  (was prod's absolute `/Home/NepAtlasMap`) — because this lane now builds
  that page.
- **Funding provided by** (h2): pipe-separated funder links, verbatim —
  "Puget Sound Partnership" → `http://www.psp.wa.gov` (ext); "U.S.
  Environmental Protection Agency" → `https://www.epa.gov/puget-sound` (ext).

### About (`/about`, prod `/Home/About`)

One continuous article, no in-page headings (valid h1-only heading order).
Four blocks, verbatim (source `&nbsp;` normalized to plain spaces; source
wraps every anchor in `<strong>` — carried as plain links, bold dropped):

1. Paragraph: NEP Atlas purpose statement, with links —
   "U.S. Environmental Protection Agency Puget Sound NEP" → `http://www.psp.wa.gov/NEP-overview.php` (ext);
   "Action Agenda" → **remapped internal**, `/prototypes/action-agenda` (prod
   href was `https://actionagenda.pugetsoundinfo.wa.gov/`, a
   pugetsoundinfo.wa.gov subdomain — internal under this unified shell's
   host policy; remapped to this prototype's own Action Agenda page rather
   than left as a dead cross-subdomain link);
   "Implementation Strategies" → `https://www.psp.wa.gov/implementation-strategies.php` (ext);
   "local ecosystem recovery plans" → `https://www.psp.wa.gov/LIO-overview.php` (ext).
2. Paragraph: "NEP funding recipients include:" intro line.
3. List, 7 items (funding recipients), all external links: Local Integrating
   Organizations, Northwest Indian Fisheries Commission, Northwest Straits
   Commission, Puget Sound Partnership, Strategic Initiative Lead - Habitat
   (+ WDFW/DNR parenthetical), Strategic Initiative Lead - Shellfish (+ DOH
   parenthetical), Strategic Initiative Lead - Stormwater (+
   Ecology/Stormwater Center/Commerce parenthetical).
4. Paragraph: "See more about the Puget Sound National Estuary Program" →
   `https://www.psp.wa.gov/NEP-overview.php` (ext).

Between blocks 1 and 2, a 3-up photo strip (`PsInfoAboutPhotoTrio`, reused
generic component) — three real prod photographs, decoded from the page's
own inline base64 payload (1920×1080 originals, downscaled to 1200w). Source
`alt=""` on all three; alts below are ours (same non-fabricated-description
policy as the hero):
- `about-shellfish.jpg` — field workers inspecting netted shellfish bags on a tide flat
- `about-beach.jpg` — waves on a gravel Puget Sound beach
- `about-fishing-nets.jpg` — stacked fishing nets/floats with commercial boats behind

### NEP Activity Map (`/map`, prod `/Home/NepAtlasMap`)

Three verbatim paragraphs (`MAP_PAGE.paragraphs`), prod typos kept verbatim
with `[sic]`:
1. NTA/Strategic-Initiative-Leads incorporation notice — contains **"incoporated"** [sic].
2. Map description, link "EPA Puget Sound National Estuary Program" → `https://www.epa.gov/nep` (ext).
3. No-spatial-data notice — contains **"activties"** [sic]; link "NEP
   Activities" → internal, `/prototypes/nep-atlas/activities`; source has NO
   closing period on this sentence — kept none.

Map: `PsInfoNepAtlasMap legend={true} showTeaser={false}` — the teaser link
is hidden (self-referential on this page); a color-key legend is shown above
the map instead.

**DEVIATION**: prod's own legend on this page is titled "NEP Award" (colored
by award); our stand-in markers are colored by the activity-type taxonomy
(`ATLAS_MAP_CATEGORIES`), so the legend here is titled "Activity Type"
instead (`MAP_PAGE.legendTitle`) — reusing a real prod field name for the
field we actually color by, rather than mislabeling our chart.

Table (`PsInfoNepAtlasMapTable`): the map's own 14 invented stand-in points,
NOT real prod rows — internally consistent with the map above it. Header
verbatim pattern: "14 of 14 Activities in Map View". Columns: Name, Activity
Type, Lead Organization. Names are plain text (no detail pages exist for
invented points, so unlike the Activities/Awards grids, no fabricated links).

### NEP Activities (`/activities`, prod `/Activity/Index`)

Two verbatim paragraphs (`ACTIVITIES_PAGE.paragraphs`): NTA incorporation
notice (this page spells "incorporated" correctly — only the map page has
the typo); a how-to-use-the-table paragraph with an internal link "view a
map" → `/prototypes/nep-atlas/map` (source bolds "Investment Type" and the
link — both carried as plain text/link).

Grid (`PsInfoNepAtlasActivitiesGrid`, AG Grid): **REPRESENTATIVE SUBSET** — 12
of 1,614 `/Activity/IndexGridJsonData` feed rows, 13 of 32 prod columns.
Selection criteria: spans all 3 Investment Types (NEP Project, NEP Capacity,
NEP Program Grant) and 8 of the 14 NEP Awards; every carried value is
verbatim from the feed (fetched 2026-07-22), including feed quirks (row 1862
has empty County/CompletionYear; award short names like "SIL - Stormwater"
are the feed's own display text).

Full prod column list (32, verbatim headerNames), for reference — 13 are
carried (marked ✓):
Activity Name✓, Activity ID✓, Description, Activity Stage✓, NEP Award✓,
Investment Type✓, Contract Start Year✓, Completion Year✓, Owner
Organization✓, Primary Contact, Partner Organizations, Geographic Scope,
Latitude, Longitude, Location Notes, Local Area, County✓, Lead Entity
Management Area, Legislative District, Activity Type✓, Vital Sign✓, Area of
Interest, 2022 Action Agenda Strategy, 2022 Action Agenda Action, 2022 Action
Agenda Desired Outcome, Related NEP Activities, Related Ongoing Programs,
Activity Website, NEP Investment Amount✓, Leveraged Funds, Total Cost✓, Last
Updated.

Toolbar: `(clear filters)`, `Download Table` (CSV export, fileName
`activitiesGridExport` — AG-Grid Excel export is NOT reproduced, CSV
substitutes), and `Download Full NEP Activity Database` linking to prod's own
`/Activity/NepActivityFullExcelDownload` route (internal host, same tab, no
mark). Row count text verbatim pattern: "Currently Viewing N out of N NEP
Activities". Pinned bottom row sums the two money columns, mirroring prod's
own pinned totals.

### NEP Awards (`/awards`, prod `/Award/Index`)

One verbatim paragraph (retired-awards notice, naming all 5 retired LOs).

Grid (`PsInfoNepAtlasAwardsGrid`): **FULL 14-row** `/Award/IndexGridJsonData`
feed, **all 9 columns** — no truncation. `domLayout: 'autoHeight'` (prod's
own auto-fit branch — all 14 rows show without an inner scroll). Toolbar:
`Download Table` only (CSV export, fileName `awardsGridExport`; no full-database
download link exists on this page in prod). Pinned bottom row sums Total
Cost / NEP Investment / Leveraged Funds, mirroring prod's own pinned totals.

### NEP Investment Summaries (`/investment-summary`, prod `/Activity/Summary`)

Three verbatim paragraphs (`SUMMARY_PAGE.paragraphs`), including P1's
"Use the filters to customize the charts" sentence. As of 2026-07-23
(revision direction) the charts DO filter: each tab's chart renders in an
esa-card with esa-filter-dropdown controls over the two dimensions its
stored aggregation actually carries — the row axis (Vital Sign / Lead
Entity Management Area) and the NEP Award stack — recomputed client-side
from the captured counts. Prod's separate "Investment Type" filter
dimension is not present in the captured aggregation and remains omitted
(never faked); the earlier verbatim/parity tension note is resolved — the
sentence now describes real behavior.

Two tabs (`esa-tab-layout` lego, verbatim tab labels: "Activities by Vital
Signs" / "Activities by Geography"), each holding a native stacked
horizontal bar chart (`PsInfoNepAtlasSummaryChart`) — the representative
stand-in for prod's Google Charts BarChart (prod ships no iframe for this
content, so nothing to embed). Chart legend titles verbatim from prod:
"Activities by Vital Sign" / "Activities by Lead Entity Management Area".

**Chart data derivation** (recorded verbatim): both charts are REAL
aggregations computed from prod's own inlined 1,608-activity payload (the
page's Google-Charts `dataTable` is null in prod's server HTML — prod
computes the same aggregation client-side from that payload). Formula: count
of activities whose `VitalSigns` (resp. `LeadEntities`) array contains the
label, grouped by `NEPAwardShortName`; an activity tagged with several Vital
Signs / LEMAs counts once under each. Computed identically here, 2026-07-22,
from the saved `nep-summary-vitalsigns.html` / `nep-summary-geography.html`
fragments. Palette = prod's own `Awards` color dict — prod itself assigns
`#003a5d` to EPA Direct AND all four retired LOs; carried as-is (this is
prod's own choice, not an error introduced here). Color is never the only
channel: every chart row also carries an sr-only per-award breakdown string,
a visible total, and a text legend.

Related-activities table (`PsInfoNepAtlasActivityTable`): 12 of prod's 1,608
summary-tab activities (same 12 rows as the Activities grid — reused so the
two pages never disagree), rendered **once below the tab layout** instead of
duplicated inside each tab (prod repeats a copy of this table inside every
tab; this lane renders it once — recorded as a deliberate deviation, not a
truncation of content). RPA column omitted (prod's table includes an "RPA"
column this lane doesn't carry activity-level RPA codes for). Cell values
(Duration, Activity Type short, Vital Sign short, Lead Entity Mgmt Area) are
prod's own shortened display strings ("Soundwide", "5 selected", etc.) taken
verbatim from prod's summary-tab payload, not derived here.

`esa-tab-layout`'s default tab font is 14px (`--type-size-200`); overridden
to 1rem with a page-scoped style block on this page only, per the repo's
16px body-text minimum.

## Photo provenance

| File | Source | Notes |
|---|---|---|
| `estuary-welcome.jpg` | Home page inline `<img>` | Real photo, 1920×1080 in source, decoded/downscaled to 1200w; used as the hero on ALL SIX pages |
| `about-shellfish.jpg` | `/Home/About` inline base64 | Real photo, downscaled to 1200w |
| `about-beach.jpg` | `/Home/About` inline base64 | Real photo, downscaled to 1200w |
| `about-fishing-nets.jpg` | `/Home/About` inline base64 | Real photo, downscaled to 1200w |

All four source `alt=""` — every alt string in this lane is a reasonable,
non-fabricated accessibility description of the actual photo, not copied
caption content (prod supplies none to copy).

## Representative subsets and truncations (explicit accounting)

- **Activities grid**: 13 of 32 prod columns (full list above), 12 of 1,614
  feed rows (selection criteria above) — real feed records, verbatim.
- **Awards grid**: FULL 14 rows, all 9 columns — **no truncation**.
- **Summary charts**: real aggregation derived from prod's own inlined
  1,608-activity payload (derivation formula above); prod computes the same
  aggregation client-side (its server-rendered `dataTable` is null).
- **Summary related-activities table**: 12 of 1,608 (same 12 as the
  Activities grid); RPA column omitted; rendered once instead of per-tab.
- **Home/Map-page Leaflet map**: interactive stand-in with INVENTED points
  (unchanged policy from the prior contract, per the brief — "the Leaflet
  map stays"); map-page legend deliberately re-titled "Activity Type" (see
  above); map-page table lists the map's own 14 stand-in points, not real
  activity records.

## Omissions (deliberate, recorded)

- Map-page filter selects (Investment Type / Vital Sign / Activity Type).
- Summary-page "Investment Type" filter dimension (not in the captured
  aggregation — the built row-axis + NEP Award filters cover the dimensions
  the data actually carries; see the Investment Summaries section) and the
  chart Expand/Save/Configure controls.
- "Show N Activities with no Simple Location" toast (map page).
- AG-Grid Excel export — CSV substitutes on both grids.
- Bold/italic inline emphasis throughout — carried as plain text (source
  wraps About's anchors in `<strong>`; Activities' "Investment Type" and its
  link are bolded in source; Summary's "SIL - Shellfish" example is
  italicized in source).
- Source `&nbsp;` normalized to plain spaces throughout.
- Prod's own typos kept verbatim, marked `[sic]` in the data file: map
  page's "incoporated" and "activties" (the Activities page spells
  "incorporated" correctly — only the map page has the typo).
- Site chrome per repo convention: the sitewide "Puget Sound Info / Explore"
  mega-menu (app shell rail carries that IA instead), Request Support, Log
  in, the breadcrumb region's own chrome, and the sitewide footer.

## Link policy

Any `*.pugetsoundinfo.wa.gov` destination (or a root-relative prototype
route) is INTERNAL under this unified shell: same tab, no external mark.
This includes:
- The Action Agenda link on the About page, remapped from prod's
  `actionagenda.pugetsoundinfo.wa.gov` subdomain to this prototype's own
  `/prototypes/action-agenda` route.
- Every module-nav child link (About/Map/Activities/Awards/Summary),
  remapped from prod's relative hrefs to this prototype's own routes.
- The Activities page's full-database download, which stays pointed at
  prod's own `nepatlas.pugetsoundinfo.wa.gov/Activity/NepActivityFullExcelDownload`
  route (internal host — same tab, no mark, not remapped since no local
  equivalent exists).
- Every Activity/Award "detail" link (`detailHref`) in the two grids and the
  related-activities table, which point at prod's own
  `nepatlas.pugetsoundinfo.wa.gov/Activity|Award/Detail/N` URLs (internal
  host — same tab, no mark; these prod detail pages are out of scope to
  reproduce, so the links go to the live prod records).

Genuinely external hosts get the lucide external-link mark + open in a new
tab: `psp.wa.gov`, `epa.gov`, `nwifc.org`, `nwstraits.org`,
`pugetsoundestuary.wa.gov`.
