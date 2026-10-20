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

1. Lockup: the SHI logo (`/photos/shi/shi-logo.png`, decorative because the
   wordmark repeats the h1) beside "Puget Sound Salmon Habitat Indicators" (the
   h1) and "Measures of ecosystem conditions in salmon habitats" (deck slide 6,
   verbatim). The deck's navy title band is dropped.
2. Type: Fira Sans throughout, the live Vital Signs site's only face, on every
   SHI route.
3. About paragraphs: PSP's draft from deck slide 6 (why salmon matter, the
   Salmon Vital Sign with its link, the life cycle and habitats, the SHI
   definition). PSP will still wordsmith it.
4. Habitat diorama with the six buttons. The deck's watercolor life-cycle
   graphic is replaced by an original, museum-style cross-section from a
   headwater stream to the open Sound, the way the fish go
   (`shi-diorama-art.svg`, geometry in `src/data/shi-diorama.ts`). It runs the
   window width less a 24px gutter each side above 760px, with no frame; the
   buttons keep the page column. A slim white life cycle loop over the sky (`src/data/shi-lifecycle.ts`) sets each stage
   over its habitat: eggs and alevins, fry and parr, smolts and ocean adults on
   the downstream lane, adults returning to spawn on the upstream lane. A
   small fish swims the loop once every 48 seconds, mirrored so it never swims
   belly up; reduced motion parks it. The basin map (`isometric.astro`,
   `shi-basin-art.svg`, `src/data/shi-basin.ts`, after the c-basin-map
   specimen in the diorama's palette) is a second landing page for review: the
   river basin as a tilted tabletop under the Cascades, and the life cycle as
   a dashed white route on the map, down the river, out into the Sound and
   back up, with the same fish.
   All 18 indicators appear as labelled landmarks in the scene, each linking
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
6. "Related Progress Indicators" (deck slide 7): the habitat-use sentence as
   the section note, then the Progress Indicators home page's topic card for
   Floodplains, Estuaries, Nearshore, and Riparian Areas. Fish Passage, also
   named, is not developed yet and has no card. The deck's Salmon Recovery
   Plan and Salmon Hub line is still a placeholder and is not built.

## Standalone SHI page

Prod's Complete Indicator Report layout with the same panels and subfields a
Vital Sign Indicator's report carries (deck slides 8 to 10): "View all Salmon
Habitat Indicators" with the SHI logo in place of "View in Vital Signs";
Basics; Description; Salmon Habitat Indicator Chart; Importance to Salmon,
whose "?" reads "Why is this measure important for tracking progress toward
Puget Sound salmon recovery?"; Key Salmon Habitat Indicator Results; Methods
(Monitoring Program, Data Source, Methods, Critical Definitions);
Interpretation of Results (Causes for Change); Additional Information;
Datasets; Reporting Guidance; Subcategories. No Map box until a standalone
SHI has a map. The page is the indicator's report, so it has no separate
SHI report.

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

Prod's ViewAll tree (`PsInfoVsFancyTree`), no Type column: each SHI row carries
the SHI icon right of its name, alone. Hover, focus or tap opens a tip naming
it, linked to the SHI landing page (Phase 9 check-in 2026-10-20; the logo plus
label it replaced dominated the table). The same icon marks the Indicator Type
field of a Complete Indicator Report. The icon is the designer's full-colour
icon-only mark (SHI Logo-S2) at 24px; `?icon=2|3` swaps in the teal or purple
one, for review.

## Data provenance

Public, from prod: Vital Sign and VSI names, ids, progress labels, both VSI
pages' text, chart images and partner logos. From PSP's official SHI list
(email, 2026-10-19): the 18 SHIs, which 16 are also VSIs, and the two that
are not (Stream Structure, Sediment). Invented for the prototype: which VSIs
are VSI+, each SHI's habitat, everything on the Stream Structure and
Sediment pages, all salmon narrative, table descriptions,
and every gauge value.
