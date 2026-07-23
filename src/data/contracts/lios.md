# Page contract: lios

Source: https://www.pugetsoundinfo.wa.gov/LIOs (live prod fetch 2026-07-23, superseding the 2026-07-22 QA DOM lios-qa.html — the QA render dropped this page's inline links and paragraph breaks; revision direction 2026-07-23 restored www as source of truth) / Route(s): /prototypes/lios

Source page shape (verbatim, exhaustive): centered `<h2>` "Local Integrating Organizations"; two intro paragraphs; the ArcGIS Experience Builder iframe; the "What makes an LIO?" tinted callout; the "Each LIO develops:" bulleted list + closing paragraph; the calendar heading + open-in-new-window link + PowerBI iframe. The article ends there. The only `<a>` in the article is "Open calendar in new window". Page `<title>`: "PS Info  | LIOs"; breadcrumb "LIOs"; no h1 in source.

Header: plain — `EsaPageHeader` (title-only) with `title="Local Integrating Organizations"`, then `PsInfoHeaderLede` rendering the source's two intro paragraphs as TWO separate paragraphs (prod renders them as two table rows; an earlier build joined them into one lede string — corrected per revision direction 2026-07-23, which also set the lede at full measure, no 70ch cap). P1: "Local Integrating Organizations (LIOs) are local forums that bring people together to protect and restore the ecosystem through locally specific strategies and actions. LIOs provide a venue for stakeholders and partners to identify and develop locally driven recovery strategies." P2: "There are currently 10 active LIOs representing different areas of Puget Sound. Each LIO receives funding to support planning and coordination efforts within their regional watershed." The source carries no photography (its only image is a 15×15 decorative base64 external-link glyph), so no photo hero. No separate Overview section — the header lede is the intro.

## Sections (source order, exhaustive)

1. **Local Areas and LIOs** — source: `<iframe title="Local Areas and LIOs" src="https://experience.arcgis.com/experience/aecf0b6c022a41e8b614c702c5513bba" width="90%" height="950" frameborder="0" allowfullscreen>`. Embedded here with the SAME src (approved: embedding the source's own public iframes), via `PsInfoLiosEmbed` (title attr verbatim, height 950 capped to 90vh). Renders headingless — matching the source, which has no visible heading for this section; the widget carries its own titling. (An earlier build promoted the iframe title to an h2 with the count 10 beside it; cut by revision direction 2026-07-23.)

   The widget's backing per-LIO data (recovered from the public feature service `PSP_Local_Areas_and_LIOs/FeatureServer/0`, owner WA_PSP_Admin, queried 2026-07-17; fields LocalArea / ActionArea / Organization / LinktoWebsite; 11 records, Skagit / Samish excluded as LIO="N", leaving exactly the 10 the intro states) stays documented in `src/data/pages/lios.ts` as `LIO_AREAS`. An earlier build rendered it as an HTML directory (`PsInfoLiosDirectory`) below the embed; cut by revision direction 2026-07-23 — the live widget is the sole rendering. The 10, for the record:
   1. Hood Canal / Hood Canal / Hood Canal Coordinating Council / https://hccc.wa.gov/
   2. West Sound / North Central Puget Sound / West Sound Partners for Ecosystem Recovery / https://westsoundpartners.org/
   3. Whatcom / San Juan - Whatcom / Whatcom Local Integrating Organization / https://wria1project.whatcomcounty.org/home
   4. South Central / South Central Puget Sound / South Central Action Area Caucus Group / https://www.govlink.org/sc-puget-sound-action-area/Index.htm
   5. South Sound / South Puget Sound / Alliance for a Healthy South Sound / https://www.healthysouthsound.org/
   6. Strait of Juan de Fuca / Strait of Juan de Fuca / Strait Ecosystem Recovery Network / https://www.straitern.org/
   7. San Juan / San Juan / Whatcom / San Juan Action Agenda Oversight Group / (LinktoWebsite is the literal non-URL "Coming....." — rendered with no link)
   8. Island / Whidbey / Island County Local Integrating Organization / https://www.islandcountywa.gov/Health/DNR/ILIO/Pages/Home.aspx
   9. Snohomish / Stillaguamish / Whidbey / Snohomish-Stillaguamish Local Integrating Organization / https://snohomishcountywa.gov/3555/Local-Integrating-Organization-LIO
   10. Puyallup / White / South Central Puget Sound / Puyallup-White River Local Integrating Organization / https://puyallupwatershed.org/

2. **"What makes an LIO?"** — source: italic `<h4>` in a `#abbaea`-tinted cell (rendered via esa-alert-box info variant; the lego titles with a `<strong>`, not a heading — document outline stays h1 → h2s). Verbatim: lead "LIO participants include:"; 6 items in source order (Elected officials (Tribal, state, county, and city) / Local government staff, nonprofit organizations, special districts (for example, conservation districts) / Salmon recovery groups / Agriculture, businesses, and industry members / Educational institutions / Local residents); closing "These groups all work together to develop recovery priorities and implement the Action Agenda."

3. **"Each LIO develops:"** — source (www): paragraph "Each LIO develops:" (trailing narrow-space stripped) + bulleted plan types, each `<strong>label - </strong>body` (bold includes the hyphen; any inline link sits INSIDE the bold), + a sub-list of linked dashboards nested one bullet level under the second plan type, + closing paragraph indented to the list's alignment (source `padding-left: 40px`; rendered at the list's own `--spacing-500` step). The www source carries THREE links here that the QA DOM dropped (restored per revision direction 2026-07-23; external hrefs get the repo's lucide external-link mark + new tab). Verbatim:
   - **An [Ecosystem Recovery Plan](https://pspwa.app.box.com/folder/375341439999) -** These outline key local strategies and actions that support local ecosystem recovery and help inform regional priorities.
   - **Topical LIO Action Plans -** These focus on a topic of particular interest to the LIOs and document specific local priorities.
     - [Healthy Shorelines Action Plans](https://app.powerbigov.us/view?r=eyJrIjoiYzBlMjgxMGUtOTE3Ny00ZDYzLTk5YmEtZTM2M2NmZjkzMzhiIiwidCI6IjExZDBlMjE3LTI2NGUtNDAwYS04YmEwLTU3ZGNjMTI3ZDcyZCJ9)
     - [Onsite Sewage Systems Action Plans](https://app.powerbigov.us/view?r=eyJrIjoiZjIwYzE5YjgtYTBlMi00YzdhLWIxMGEtNmVmYzhiZDhiMThhIiwidCI6IjExZDBlMjE3LTI2NGUtNDAwYS04YmEwLTU3ZGNjMTI3ZDcyZCJ9)
   - Closing (indented under the list in source): "LIO Action Plans focus on a particular topic of ecosystem recovery and outline the gaps, needs, and barriers to advance recovery goals. The actions included within these plans represent ambitious yet achievable actions which can be accomplished, tracked, and described during the 4-year cycle of the Action Agenda. These plans tailor Action Agenda goals to the needs and conditions of local areas in Puget Sound."

4. **LIO Public Meeting Calendar** — source, in order:
   - Centered italic `<h4>Explore the LIO Public Meeting calendar below!!</h4>` (double exclamation is source punctuation, preserved; rendered as an h2 in our ordered outline)
   - Centered `<a target="_blank" rel="noopener">` "Open calendar in new window" → `https://app.powerbigov.us/view?r=eyJrIjoiNmNjZDlkYzctMjRiMi00MDlmLWIzNWEtZmQ1Njc1ZjZkM2FjIiwidCI6IjExZDBlMjE3LTI2NGUtNDAwYS04YmEwLTU3ZGNjMTI3ZDcyZCJ9` — the source's 15×15 bitmap external-link glyph is superseded by the repo's lucide external-link mark (substitution, not new content)
   - `<iframe title="LIO Public Meeting Calendar_final2" src="(same URL)" width="90%" height="1050" frameborder="0" allowfullscreen>` — embedded with the SAME src via `PsInfoLiosEmbed` (height 1050 capped to 90vh). The link and iframe intentionally share one URL — both are the source's.

## Explicit exclusions

- The QA DOM lacked the three "Each LIO develops" links (Box folder + two PowerBI dashboards); the earlier QA-sourced build removed them on that basis. The www source carries all three and they are restored (revision direction 2026-07-23) — section 3 above is now the record. The box.com reference in the site-wide nav dropdown remains the app-shell rail's concern — never re-add site-wide nav to this page.
- Nothing beyond the 4 sections above. No invented eyebrows, no Overview section, no stat bands beyond the source's own "10 active LIOs" figure, no cross-link band, no photos.

## Gaps

- The two embeds' internal UI (ArcGIS map/legend/list chrome; PowerBI report internals) is third-party JS inside the iframes — not extractable, and not reproduced. The embeds deliver it live instead.
- `LIO_AREAS` is the map widget's backing feature-service data (documented above), not static-DOM copy. No longer rendered (directory cut by revision direction 2026-07-23); retained in `src/data/pages/lios.ts` as the documented provenance record.
