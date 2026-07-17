# Page contract: data-center

Source: https://www.pugetsoundinfo.wa.gov/DataCenter (fetched 2026-07-17) / Route(s): /prototypes/data-center

Header: plain — title "Data Center"; lede (source's sole intro paragraph, verbatim): "Welcome to the Puget Sound Info Data Center, the main repository for restoration, protection and recovery data across Puget Sound Info programs."

Use `EsaPageHeader` (`@esa/ecology/esa-page-header.astro`) with `title="Data Center"` and `lede={...}` set to the sentence above. No eyebrow, no icon, no breadcrumbs slot content beyond what the lego renders by default.

## Sections (source order, exhaustive)

1. **Page header (intro)** — breadcrumb/title text "Data Center"; one intro `<p>`: "Welcome to the Puget Sound Info Data Center, the main repository for restoration, protection and recovery data across Puget Sound Info programs." No other copy precedes the resource grid.

2. **Active resources grid** — a 3-column grid (`.dataCenterSection` tiles inside `.psInfoContent.dataCenter`), 9 tiles in source order. Every tile is icon + title only — each tile's `<span class="sectionDetails">` is present but empty in the source markup, so there is no blurb/description text for any tile. Verbatim titles, hrefs (resolved against the site root `https://www.pugetsoundinfo.wa.gov`), and source Font Awesome glyph classes:
   1. "Activities" — `/Activity/Index` → `https://www.pugetsoundinfo.wa.gov/Activity/Index` — `fa-list`
   2. "Puget Sound Indicators" — `/Indicator/Index` → internal, this repo's own Indicators unit at `/prototypes/indicators` — `fa-chart-bar`
   3. "Organizations" — `/Organization/Index` → `https://www.pugetsoundinfo.wa.gov/Organization/Index` — `fa-users`
   4. "Funds" — `/Fund/Index` → `https://www.pugetsoundinfo.wa.gov/Fund/Index` — `fa-dollar-sign`
   5. "Web Services" — `/WebServices/Index` → internal, this repo's own Web Services unit at `/prototypes/web-services` — `fa-network-wired`
   6. "2026-2030 Action Agenda Topics" — `/Topic/Index` → `https://www.pugetsoundinfo.wa.gov/Topic/Index` — `fa-book`
   7. "Activity Types" — `/ActivityType/Index` → `https://www.pugetsoundinfo.wa.gov/ActivityType/Index` — `fa-toolbox`
   8. "Legislative Bills" — `/LegislativeBill/Index` → `https://www.pugetsoundinfo.wa.gov/LegislativeBill/Index` — `fa-file-contract`
   9. "Ongoing Program Targets" — `/OngoingProgramTarget/Index` → `https://www.pugetsoundinfo.wa.gov/OngoingProgramTarget/Index` — `fa-bullseye`

   A `<hr />` follows the grid in source, then the "Archived" heading.

3. **Archived** — heading text "Archived" (source markup is a malformed `<d iv class="breadcrumbTitle arrow singleArrow">Archived</d>` tag; render the text as a section title, not the broken tag), followed by a second grid holding exactly 1 tile:
   1. "2022-2026 Desired Outcomes and Strategies" — `/OutcomeAndStrategy/Index` → `https://www.pugetsoundinfo.wa.gov/OutcomeAndStrategy/Index` — `fa-clipboard-list`

   This tile also has an empty `sectionDetails` span — no description text.

## Existing prototype file audit

- `src/pages/prototypes/data-center.astro` and `src/data/pages/data-center.ts` are content-verbatim: the intro sentence, the "Data Center" title, all 9 active tile titles/hrefs/order, the "Archived" heading text, and the 1 archived tile title/href all match the source exactly. Nothing in the current data file is invented — the existing `sectionDetails`-is-empty note in the data file's header comment is accurate and should be retained conceptually (there is no blurb copy to add for any tile).
- The Lucide icon choices already assigned per tile in `data-center.ts` (`DATA_CENTER_RESOURCES`, `DATA_CENTER_ARCHIVED`) are reusable verbatim — each is a reasonable glyph match for its source Font Awesome icon (e.g. `fa-list`→list-lines, `fa-chart-bar`→bar-chart, `fa-users`→people, `fa-dollar-sign`→dollar/wave glyph, `fa-network-wired`→network boxes, `fa-book`→book, `fa-toolbox`→wrench, `fa-file-contract`→file-lines, `fa-bullseye`→concentric circles, `fa-clipboard-list`→clipboard). No icon changes required.
- **Must change: the header.** The page currently renders `PsInfoPhotoHeader size="band" image="/photos/sound-aerial.jpg"`. This unit's assigned header treatment is **plain**, and `/photos/sound-aerial.jpg` is the banned shared placeholder photo besides. The header must be rebuilt on `EsaPageHeader` (`@esa/ecology/esa-page-header.astro`) with `title="Data Center"` and the intro sentence as `lede`. The photo header, its `image`/`focus` props, and the `DATA_CENTER_HERO` interface's implicit photo-header framing must be removed/replaced accordingly — the `DATA_CENTER_HERO` title/lede content itself is verbatim-usable, only its host component changes.
- The two-grid composition (`PsInfoDataCenterGrid` + `PsInfoSectionTitle` for "Archived") is structurally correct against source order (grid → hr → heading → grid) and may be retained.

## Explicit exclusions

- Nothing beyond the sections above. No invented ledes/taglines/eyebrows, no stat bands the source doesn't show, no cross-link bands, no photos the source doesn't carry (this specifically rules out continuing to use `/photos/sound-aerial.jpg` or any other photograph — this unit's header is plain, not photo).
- No tile descriptions/blurbs — the source has none for any of the 10 resources; do not invent any.
- No additional resource tiles beyond the 9 active + 1 archived enumerated above.

## Gaps

- None. The entire page is server-rendered ASP.NET markup (confirmed via `curl -sL`); every heading, the intro paragraph, all 10 tile titles, and all 10 tile hrefs were extractable directly from the fetched HTML. The only "empty" content is the `sectionDetails` span per tile, which is confirmed empty in source (not a fetch limitation) — there is no blurb to recover for any tile.
