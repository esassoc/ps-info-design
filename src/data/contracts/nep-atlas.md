# Page contract: nep-atlas

Source: https://nepatlas.pugetsoundinfo.wa.gov/ (fetched 2026-07-17) / Route(s): /prototypes/nep-atlas

The source URL is the NEP Atlas mini-site's HOME page only. The home page's
server-rendered HTML is genuinely short — one welcome block, one map teaser,
one funders line — everything else on the live mini-site (About, Activity
Index, Award Index, Activity Summary) lives at OTHER URLs and is out of scope
for this contract. This is the entire content of the page; nothing was cut
for length.

## Header

photo — `PsInfoPhotoHeader size="band"`.

- **Title**: `NEP Atlas` (matches the source `<title>NEP Atlas</title>` and the
  site's own nav "site link" label for this page, `NEP Atlas`).
- **Eyebrow** (source-sourced): the source's own sitewide banner reads, in the
  page's `siteTitle` block, `PUGET SOUND NATIONAL ESTUARY PROGRAM ATLAS`
  (also the exact string in `<meta name="Description">`). Sentence-case it
  per this repo's no-ornamental-caps rule: **"Puget Sound National Estuary
  Program Atlas."** This is the site's own name, not an invented tagline.
- **Lede** (source-sourced, optional): the source's welcome paragraph opens
  with "The National Estuary Program (NEP) Atlas tracks and shares
  information about Puget Sound NEP investments, activities, and
  accomplishments." — identical to the meta-description sentence. Usable
  verbatim as the lede if the header component wants one; the full welcome
  paragraph (below) still carries the complete sentence, so treat the lede as
  optional rather than required.
- **Hero photograph — mandatory, already sourced correctly in the existing
  build**: the home page's own welcome heading embeds one real photograph
  inline (`<h3>Welcome to the NEP Atlas<img ... src="data:image/jpeg;base64,...">`),
  1920×1080, no alt text in the source (`alt=""`). Decoded and inspected: a
  river with a large logjam/driftwood pile beside a truss bridge, snow-capped
  Cascade peak in the background. This is the ONLY real photograph the
  source page carries, and it must be the flagship header hero (not a side
  photo, not the generic satellite tile). It is already sitting at
  `public/photos/nep-atlas/estuary-welcome.jpg` (1200×675, same crop/photo —
  confirmed by visual diff against the decoded source bytes) and is already
  captioned with a reasonable, non-fabricated alt string in the existing data
  file ("A logjam and truss bridge on a Puget Sound tributary river,
  mountains in the background"). Use that file as the header image; do NOT
  fall back to `/photos/sound-aerial.jpg` or `/photos/home/nep-atlas.jpg` —
  the source itself offers something better and it is already downloaded.

## Sections (source order, exhaustive)

### 1. Welcome to the NEP Atlas

Heading (verbatim): **"Welcome to the NEP Atlas"** — the source renders the
hero photo floated inline inside this same heading element (see Header
above).

Paragraph (verbatim, one paragraph, links kept in original sentence
position):

> The National Estuary Program (NEP) Atlas tracks and shares information
> about Puget Sound NEP investments, activities, and accomplishments. The
> information presented here includes activities managed by the Puget Sound
> NEP **Strategic Initiative Leads**, the **Northwest Indian Fisheries
> Commission**, the **Puget Sound Partnership**, and directly by the
> **U.S.&nbsp;Environmental Protection Agency**. The NEP Atlas is updated
> periodically as new investments are made around the region.

Inline links, verbatim, in order:
- "Strategic Initiative Leads" → `https://pugetsoundestuary.wa.gov/` (source markup: `target="_blank" rel="noopener"`)
- "Northwest Indian Fisheries Commission" → `https://nwifc.org/`
- "Puget Sound Partnership" → `https://psp.wa.gov/`
- "U.S. " (trailing non-breaking space inside the anchor) → `http://www.epa.gov/puget-sound/epa-geographic-funding-work-puget-sound-recovery`
- "Environmental Protection Agency" → `https://www.epa.gov/puget-sound/epa-geographic-funding-work-puget-sound-recovery`

(Source wraps "U.S." and "Environmental Protection Agency" as two adjacent
anchors, each to a very slightly different URL — http vs https, otherwise
identical path — and both bolded together as one visual phrase. The first
anchor's own text is "U.S.&nbsp;" — the trailing space lives INSIDE that
anchor, which is what keeps the rendered phrase from gluing into
"U.S.Environmental Protection Agency". Reproduce as two link segments plus a
separating space between them — e.g. a plain-text segment — so the rendered
output matches the source's "U.S. Environmental Protection Agency" exactly.)

### 2. Map teaser

The source's home page centers a clickable map-preview block directly under
the welcome paragraph:
- A link (`href="/Home/NepAtlasMap"`, `aria-label="NEP Atlas Map"`) wrapping
  an empty `<div id="ntaActivitiesMapDivID">` — this is the mount point for a
  client-side Leaflet map; it renders empty in server HTML (see Gaps).
- Below it, a text link (verbatim): **"Click to view the full map"** →
  `/Home/NepAtlasMap`

No other caption or description copy accompanies this block on the home
page.

### 3. Funding provided by

Heading (verbatim, source is shouting-case `FUNDING PROVIDED BY`; normalize
per this repo's no-ornamental-caps rule, e.g. "Funding provided by").

Content (verbatim, pipe-separated in source):
- "Puget Sound Partnership" → `http://www.psp.wa.gov` (`target="_blank"`)
- "U.S. Environmental Protection Agency" → `https://www.epa.gov/puget-sound` (`target="_blank"`)

This is the existing `FUNDERS` array in the data file and is already
correct/verbatim-usable as-is.

That is the complete home page. Ignored as site chrome, per instructions:
the top navbar (About / Activities / NEP Awards / Summaries dropdowns, PS
Info network menu, Request Support, Log in), the empty breadcrumb region,
and the sitewide boilerplate footer ("This site is managed and maintained by
the Puget Sound Partnership...", "Accessibility Policy", "Implementation &
Hosting by Environmental Science Associates...") that appears on every PS
Info network page.

## Comparison against the existing prototype (what to keep / what must go)

**Existing files**: `src/pages/prototypes/nep-atlas.astro`,
`src/data/pages/nep-atlas.ts`. The existing data file is candid about its own
sourcing — its header comment lists FIVE source URLs (home, `/Home/About`,
`/Activity/Index` + its JSON feed, `/Award/Index` + its JSON feed,
`/Activity/Summary`). Only the first of those is this contract's source; the
rest are different pages of the mini-site and are out of scope for a
single-URL directed reproduction.

**Verbatim-usable, keep as-is:**
- `WELCOME_PARAGRAPH` — exact match to the source's welcome paragraph, including the two-anchor "U.S." / "Environmental Protection Agency" split. Keep.
- `WELCOME_PHOTO` — the real source photo, already correctly identified and captioned. Keep, but promote to the header hero (see Header above) rather than a side/inline photo, since it is the source's only photograph and this unit is a photo-header unit.
- `PAGE_TITLE` ("NEP Atlas") — keep.
- `PAGE_EYEBROW` ("Puget Sound National Estuary Program Atlas") — keep; it is a case-normalized copy of the source's own site-title banner / meta description, not an invented tagline.
- `PAGE_LEDE` — keep; it is verbatim the source's own first sentence (see Header above).
- `FUNDERS` — exact match to the source's "FUNDING PROVIDED BY" block. Keep.

**Invented/extra — must be removed (not part of this single-URL source):**
- `ATLAS_STATS` (the "1,614 activities / $1.09B / 14 awards" stat band) — these are aggregates the previous pass computed from the `Activity/IndexGridJsonData` and `Award/IndexGridJsonData` feeds. Nothing resembling these numbers appears anywhere in the home page's server HTML. Remove the stat band entirely.
- `ACTIVITY_TYPE_COUNTS` — same feed-derived aggregate, not on the home page. Remove.
- The entire **"About the NEP Atlas"** section — `ABOUT_PARAGRAPHS`, `FUNDING_RECIPIENTS`, `ABOUT_PHOTOS` — sourced from `/Home/About`, a different URL. Remove the whole section.
- The entire **"Activities"** section — `ACTIVITIES_INTRO_PARAGRAPH`, `ACTIVITIES_SORT_NOTE`, `FEATURED_ACTIVITIES` (6 activity cards) — sourced from `/Activity/Index` + its JSON feed, a different URL. Remove the whole section.
- The entire **"NEP Awards"** section — `AWARDS_INTRO_PARAGRAPH`, `AWARDS` (14 award cards) — sourced from `/Award/Index` + its JSON feed, a different URL. Remove the whole section.
- The entire **"Investment Summary"** section — `INVESTMENT_SUMMARY_PARAGRAPHS` — sourced from `/Activity/Summary`, a different URL. Remove the whole section.
- The **"Explore the NEP Atlas"** tool-links row (`ATLAS_TOOLS`, 5 entries: Activities Map, Activities List, NEP Awards, Investment Summary, Download Full NEP Activity Database) — this reproduces the mini-site's own top-nav dropdown destinations plus a download link that isn't on the home page at all, with blurbs pulled from those other pages' own intro copy. None of this is home-page body content; the home page's only outbound "explore" gesture is the single map-teaser link in Section 2 above. Remove the whole tool-links row. (If the build wants a single "Click to view the full map" link, that's Section 2, not a 5-item tool grid.)

Net effect: the rebuilt page should have exactly three content sections
(Welcome, Map teaser, Funding provided by) under the photo header — a much
shorter page than the current build, mirroring how genuinely short the real
home page is.

## Explicit exclusions

- Nothing beyond the three sections above. No invented ledes/taglines/eyebrows beyond the source-derived ones documented under Header. No stat bands (the source shows no numbers at all). No cross-link bands. No photos the source doesn't carry, except the single contracted hero photograph (`estuary-welcome.jpg`, already downloaded, already correctly captioned). No content sourced from `/Home/About`, `/Activity/Index`, `/Award/Index`, or `/Activity/Summary` — those are different URLs than the one contracted here.

## Gaps

- The map itself (`/Home/NepAtlasMap`, linked from the home page's map
  teaser) is a Leaflet map mounted into an empty `<div id="ntaActivitiesMapDivID">`
  by client-side JS; the home page's own server HTML contains no map
  imagery, pins, or data for this div — it is genuinely empty until a
  script runs. Represented here only by its real link text and aria-label
  ("Click to view the full map" / "NEP Atlas Map"), not by a fabricated map
  graphic.
- The source's `<img>` for the welcome photo carries `alt=""` (no source-supplied
  alt text). The existing data file's alt string ("A logjam and truss bridge
  on a Puget Sound tributary river, mountains in the background") is a
  reasonable accessibility description of the actual photo, not fabricated
  caption content — keep it; WCAG 2.2 requires a non-empty `alt` on a
  meaningful image and the source provides none to copy.
