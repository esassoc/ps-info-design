# Page contract: salmon-habitat-indicators

Source: PSP's SHI PS Info mock-up deck, v29 (2026-08-28; private, kept in
`docs/private/shi/`, never committed) for structure; the live Vital Signs site,
https://vitalsigns.pugetsoundinfo.wa.gov (fetched 2026-10-12), for chrome and
for the two Vital Sign Indicator pages.

Routes (all under `SHI_BASE` in `src/data/pages/salmon-habitat-indicators.ts`,
so a move to its own subdomain is a one-line change):

- `/prototypes/salmon-habitat-indicators` — landing
- `/prototypes/salmon-habitat-indicators/vital-sign-indicators/{eelgrass-area|summer-low-flow}` — VSI detail
- `/prototypes/salmon-habitat-indicators/reports/{slug}` — SHI report, one per VSI+ / SHI indicator (5)
- `/prototypes/salmon-habitat-indicators/all-indicators` — All Indicators with the salmon column

Layout: `PsInfoVsProdChrome` on every route. NOT `PsInfoAppShell`: these pages
show SHI shipped inside today's Vital Signs, separate from the unified-nav
proposal.

## Domain model (types first: `src/data/shi-domain.ts`)

- `PugetSoundIndicator` is the shared base. It carries a `vitalSignIndicator`
  facet, a `salmonHabitatIndicator` facet, or both.
- `ShiRelationship`: `same` (VSI), `extended` (VSI+), `independent`
  (SHI). Every SHI has a parent `VitalSignRef`.
- `HabitatCategorySlug`: the deck's six buttons. Each category stores a
  `colorGroup` (`purple` | `green` | `blue`) named for the color only; meaning
  is undefined, and fills come from `--shi-category-*` in `src/styles/theme-shi.css`.
- `SalmonHabitatIndicatorField`: the single new report section (deck slide 4,
  PSP's preferred option). Nine subfields in deck order, each switched on or
  off per indicator in `enabled`; a subfield renders only when on and filled.

## Chrome (every route)

Reproduced from the live site at 1440 and 390 widths:

1. Photo header: goal photograph (`vs-goal{6,7}-header.jpg`, or
   `vs-home-banner.jpg` on goal-neutral pages); network bar "Puget Sound Info |
   Vital Signs" with "Request Support" and "Log In"; the navy "Puget Sound Vital
   Signs" banner and five goal columns (`PsInfoVsSubnav`, `live` mode, all links
   to prod); a 10px rule in the current goal's color.
2. Trail (`esa-breadcrumbs`).
3. Footer: managed-by line, Accessibility Policy, ESA credit.

## Landing

1. Title band: "Puget Sound Salmon Habitat Indicators" (the h1) + "Measures of
   ecosystem conditions in salmon habitats" (deck slide 6, verbatim), on the
   deck's `#002060`.
2. SHI logo (`/photos/shi/shi-logo.png`, decorative: the wordmark repeats the h1).
3. About paragraphs. Placeholder copy of similar length; PSP's text is not used.
4. Habitat diorama with the six buttons. The deck's watercolor life-cycle
   graphic is replaced by an original, museum-style cross-section from the
   open Sound to a headwater stream (`shi-diorama-art.svg`, geometry in
   `src/data/shi-diorama.ts`). The deck's four life-cycle stages are dropped.
   All 16 indicators appear as labelled landmarks in the scene, each linking
   where its table row links. Each habitat is a traced region. Hover outlines
   it; selecting it outlines and tints it and labels it with its indicator
   count, and the rest of the scene is not dimmed. The buttons sit under the
   scene in landscape order (Marine Water → Stream Structure), not the deck's
   order. A button or region filters the table; selecting it again, or
   "(clear filters)", resets.
5. "Explore all Salmon Habitat Indicators": the Progress Indicators grid pattern
   the deck pastes in (count line, clear filters, Download Table). Columns:
   Salmon Habitat Indicator · Description · Habitat · Vital Sign · Type.
   Row links follow the deck's notes: VSI opens the VSI page, VSI+ and
   SHI open the SHI report.

## Vital Sign Indicator detail

Prod's `VitalSignIndicator/Detail` page, content verbatim from prod (Detail/10,
Detail/46), with one addition after Key Vital Sign Indicator Results:
**Importance to Salmon** (SHI mark, the subfield's text, a link to the SHI
report when VSI+, and a link to all SHIs). On VSI+ pages the reference rail
also gains a "Salmon Habitat Indicator" entry beside Complete Indicator Report.

## SHI report

Indicator header (parent Vital Sign link + h1), a record line (Habitat, SHI
type, Vital Sign, and for VSI+ the Vital Sign Indicator it extends, linking
back), then the Salmon Habitat Indicator field as one navy-barred report box.
Summer low flow turns on all nine subfields; its chart is a 30-gauge status
grid (18 shared with the VSI, 12 added) with a data table in a disclosure.
Other reports turn on fewer subfields, so the toggle shows.

## All Indicators

Prod's ViewAll tree (`PsInfoVsFancyTree`) with a Salmon Habitat column: SHI mark
+ the type as a text link. Never the icon alone.

## Data provenance

Public, from prod: Vital Sign and VSI names, ids, progress labels, both VSI
pages' text, chart images and partner logos. Invented for the prototype: which
VSIs are SHIs and their types, the two SHI indicators (Large wood in
streams, Fish passage at road crossings), all salmon narrative, the About
text, table descriptions, and every gauge value.
