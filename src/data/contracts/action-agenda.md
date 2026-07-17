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
- The source's persistent sub-navigation bar (`aa2026-outcomes-nav`, the 5-category dropdown menu sitting between the carousel and the title band) is out of scope for this contract as page-chrome/navigation, not body content — flagged here only so it isn't mistaken for a missing content section. Its 5-category → 26-topic taxonomy is otherwise unused by this page's own body content.
