# Page contract: lios

Source: https://www.pugetsoundinfo.wa.gov/LIOs (fetched 2026-07-17) / Route(s): /prototypes/lios

Header: plain — title "Local Integrating Organizations"; lede (source's own intro copy, the two sentences that sit directly under the H2 title before any other content, verbatim, joined as one paragraph): "Local Integrating Organizations (LIOs) are local forums that bring people together to protect and restore the ecosystem through locally specific strategies and actions. LIOs provide a venue for stakeholders and partners to identify and develop locally driven recovery strategies. There are currently 10 active LIOs representing different areas of Puget Sound. Each LIO receives funding to support planning and coordination efforts within their regional watershed."

Use `EsaPageHeader` (`@esa/ecology/esa-page-header.astro`) with `title="Local Integrating Organizations"` and `lede={...}` set to the four sentences above. Do NOT use `PsInfoPhotoHeader` / a photo band — this unit's assigned header treatment is `plain`, and the page's current `/photos/sound-aerial.jpg` band is a shared placeholder not sourced from this page at all (see audit below). Since the intro copy is consumed by the header lede, there is no separate "Overview" section below it — the source goes straight from the title+intro to the map widget.

## Sections (source order, exhaustive)

1. **Local Areas & LIOs** (interactive map + per-LIO directory) — source markup: `<iframe title="Local Areas and LIOs" src="https://experience.arcgis.com/experience/aecf0b6c022a41e8b614c702c5513bba" width="80%" height="950">`, a JS-rendered ArcGIS Experience Builder widget (map + list) with no static HTML fallback — the widget's own internal UI (map, legend, list columns, filters) cannot be read via static fetch. The widget's title attribute reads "Local Areas and LIOs" (not "&"-joined; not visible page text, just the iframe's own `title` attribute — the closest verbatim label available for this section, and the wording the rebuild should use if a section label is needed).

   The per-LIO list itself — the widget's one interactive content — is recoverable from the widget's own backing public ArcGIS Online feature service (`PSP_Local_Areas_and_LIOs/FeatureServer/0`, owned by the site's own org, `WA_PSP_Admin`), which returns 11 local management area records; one (Skagit/Samish) has `LIO="N"` and is excluded, leaving exactly 10 — matching the page's own "There are currently 10 active LIOs" sentence. That 10-record inventory (fields `LocalArea` / `ActionArea` / `Organization` / `LinktoWebsite`):
   1. Hood Canal / Hood Canal / Hood Canal Coordinating Council / https://hccc.wa.gov/
   2. West Sound / North Central Puget Sound / West Sound Partners for Ecosystem Recovery / https://westsoundpartners.org/
   3. Whatcom / San Juan - Whatcom / Whatcom Local Integrating Organization / https://wria1project.whatcomcounty.org/home
   4. South Central / South Central Puget Sound / South Central Action Area Caucus Group / https://www.govlink.org/sc-puget-sound-action-area/Index.htm
   5. South Sound / South Puget Sound / Alliance for a Healthy South Sound / https://www.healthysouthsound.org/
   6. Strait of Juan de Fuca / Strait of Juan de Fuca / Strait Ecosystem Recovery Network / https://www.straitern.org/
   7. San Juan / San Juan / Whatcom / San Juan Action Agenda Oversight Group / — `LinktoWebsite` is the literal non-URL string "Coming....." in the feature service; render with no outbound link, not a fabricated URL.
   8. Island / Whidbey / Island County Local Integrating Organization / https://www.islandcountywa.gov/Health/DNR/ILIO/Pages/Home.aspx
   9. Snohomish / Stillaguamish / Whidbey / Snohomish-Stillaguamish Local Integrating Organization / https://snohomishcountywa.gov/3555/Local-Integrating-Organization-LIO
   10. Puyallup / White / South Central Puget Sound / Puyallup-White River Local Integrating Organization / https://puyallupwatershed.org/

   A count of 10 next to this section's label is verbatim-usable — it is the exact figure the source's own intro copy states, not an invented stat.

2. **"What makes an LIO?"** — source: italic `<h4>What makes an LIO?</h4>` inside a light-blue-tinted bordered table cell, verbatim:
   - Lead: "LIO participants include:"
   - List, 6 items, source order:
     1. Elected officials (Tribal, state, county, and city)
     2. Local government staff, nonprofit organizations, special districts (for example, conservation districts)
     3. Salmon recovery groups
     4. Agriculture, businesses, and industry members
     5. Educational institutions
     6. Local residents
   - Closing: "These groups all work together to develop recovery priorities and implement the Action Agenda."

3. **"Each LIO develops:"** — source: a borderless table cell, lead sentence + nested Word-export lists + closing paragraph, verbatim:
   - Lead: "Each LIO develops:"
   - Plan type 1 — bold label **"An Ecosystem Recovery Plan"** (source wraps only "Ecosystem Recovery Plan" in the link, "An" sits outside it; render as one clickable label) → `https://pspwa.app.box.com/folder/375341439999` — body: "These outline key local strategies and actions that support local ecosystem recovery and help inform regional priorities."
   - Plan type 2 — bold label **"Topical LIO Action Plans"** (no link on the label itself) — body: "These focus on a topic of particular interest to the LIOs and document specific local priorities." — two nested named links:
     1. "Healthy Shorelines Action Plans" → `https://app.powerbigov.us/view?r=eyJrIjoiYzBlMjgxMGUtOTE3Ny00ZDYzLTk5YmEtZTM2M2NmZjkzMzhiIiwidCI6IjExZDBlMjE3LTI2NGUtNDAwYS04YmEwLTU3ZGNjMTI3ZDcyZCJ9`
     2. "Onsite Sewage Systems Action Plans" → `https://app.powerbigov.us/view?r=eyJrIjoiZjIwYzE5YjgtYTBlMi00YzdhLWIxMGEtNmVmYzhiZDhiMThhIiwidCI6IjExZDBlMjE3LTI2NGUtNDAwYS04YmEwLTU3ZGNjMTI3ZDcyZCJ9`
   - Closing: "LIO Action Plans focus on a particular topic of ecosystem recovery and outline the gaps, needs, and barriers to advance recovery goals. The actions included within these plans represent ambitious yet achievable actions which can be accomplished, tracked, and described during the 4-year cycle of the Action Agenda. These plans tailor Action Agenda goals to the needs and conditions of local areas in Puget Sound."

4. **LIO Public Meeting Calendar** — source: italic, centered `<h4>Explore the LIO Public Meeting calendar below!!</h4>` (double exclamation is the source's own punctuation, preserve verbatim), then a centered link with the site's own decorative external-link icon graphic:
   - Heading: "Explore the LIO Public Meeting calendar below!!"
   - Link: "Open calendar in new window" → `https://app.powerbigov.us/view?r=eyJrIjoiNmNjZDlkYzctMjRiMi00MDlmLWIzNWEtZmQ1Njc1ZjZkM2FjIiwidCI6IjExZDBlMjE3LTI2NGUtNDAwYS04YmEwLTU3ZGNjMTI3ZDcyZCJ9` — the source's own bitmap "external link icon" graphic is superseded here by this repo's arrow-up-right `esa-icon` convention (a substitution, not new content)
   - Immediately below, the same URL is also embedded as a live PowerBI report iframe (`title="LIO Public Meeting Calendar_final2"`, `width="80%" height="1050"`) — a JS-rendered dashboard, content not extractable; the CTA link above is the only recoverable representation, consistent with this repo's convention for un-embeddable widgets.

The source article ends there. No further sections, no closing CTA band beyond the calendar link, no cross-link band, no stats besides the source's own "10 active LIOs" figure.

## Existing prototype file audit

- `src/data/pages/lios.ts` is thoroughly documented and content-verbatim end to end: `INTRO_PARAGRAPHS`, `PARTICIPANTS` (title/lead/6 items/closing), `PLANS_SECTION` (lead/2 plan types with correct labels, hrefs, bodies, nested links/closing), and `CALENDAR_CTA` (heading/link label/href) all match the fetched source exactly, word for word and link for link. `LIO_AREAS` (the 10-record directory) is the same "recovered from the widget's own backing feature service" pattern this repo already uses elsewhere (`home.astro`'s `PSInfo_homepage_data`), transparently documented in the file's own header comment, not fabricated — reusable as-is. `TOTAL_ACTIVE_LIOS` correctly derives from `LIO_AREAS.length` (10), matching the source's own stated count.
- `PsInfoLiosCallout`, `PsInfoLiosPlanTypes`, and `PsInfoLiosDirectory` are thin data-to-slot mappers with no invented copy — reusable as-is.
- **Must change: the header.** The page currently renders `PsInfoPhotoHeader size="band" image="/photos/sound-aerial.jpg" lede={PAGE_LEDE}`, where `PAGE_LEDE` is only `INTRO_PARAGRAPHS[0]` (the first sentence). This unit's assigned header treatment is **plain**, and `/photos/sound-aerial.jpg` is a shared placeholder photo not sourced from this page (this page carries no photography of its own — its only image is a 15×15 decorative external-link glyph, the source's own chrome). Rebuild on `EsaPageHeader` with `title={PAGE_TITLE}` and a lede that is the full intro copy (both `INTRO_PARAGRAPHS` sentences, not just the first) — see Header line above. `PAGE_LEDE` (single-paragraph) should be dropped or redefined to the full joined intro; do not truncate to one sentence.
- **Must remove: the separate boxed "Overview" section.** The current page wraps `INTRO_PARAGRAPHS` a second time in `<PsInfoActionAgendaRefreshProse>` under `id="overview"`, below the header. The source has no distinct "Overview" heading — these two sentences sit directly under the H2 title as the page's own lede, which the new `plain` header now carries. Rendering them a second time as a boxed section below the header would duplicate content the source states once.
- **Minor wording note:** the current `<PsInfoSectionTitle title="Local Areas &amp; LIOs" count={TOTAL_ACTIVE_LIOS} />` uses an invented "&"-joined label. The only verbatim source text for this section is the iframe's own `title` attribute, "Local Areas and LIOs" (with "and"). Not a hard fidelity break (the widget itself may show its own on-brand heading once its JS runs, which is unrecoverable), but the more literal choice is "Local Areas and LIOs."

## Explicit exclusions

- Nothing beyond the 4 sections above (Local Areas & LIOs directory, What makes an LIO?, Each LIO develops, Public Meeting Calendar). No invented eyebrows, no separate "Overview" section (folded into the header lede — see audit), no stat bands beyond the source's own "10 active LIOs" figure, no cross-link band, no photos — the source carries none of its own to reproduce.

## Gaps

- The ArcGIS Experience Builder widget's own internal UI (map rendering, legend, list-view column headers, any filter/search controls) is JS-rendered client-side and not present in the static HTML — not recoverable via `curl`. The per-LIO attribute data behind it (10 records) is recovered instead from the widget's own backing public feature service, documented above and in `lios.ts`'s header comment.
- The two PowerBI-embedded reports linked from "Topical LIO Action Plans" (Healthy Shorelines Action Plans, Onsite Sewage Systems Action Plans) and the "LIO Public Meeting Calendar_final2" embedded dashboard are themselves JS-rendered PowerBI Gov reports — only their visible link labels + hrefs were extractable, not their internal report content.
