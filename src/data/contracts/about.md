# Page contract: about

Source: https://www.pugetsoundinfo.wa.gov/About (fetched 2026-07-17) / Route(s): /prototypes/about

Header: plain — title "About Puget Sound Info"; **no lede**. The source has no intro copy distinct from the sections below — the article goes straight from its three inline photos to the first ALL-CAPS "heading." The sentence that currently serves as this unit's hero lede ("Puget Sound Info is a collaborative platform…") is the first sentence of Section 1's own body paragraph; using it a second time in the header would duplicate content the source states once. Title only.

Use `EsaPageHeader` (`@esa/ecology/esa-page-header.astro`) with `title="About Puget Sound Info"` and no `lede` prop.

## Sections (source order, exhaustive)

1. **Page photography** — three images appear inline at the very top of the article body, before any heading (source markup: three `<img>` tags in one `<p>`, floated left / centered / floated right, each 350×197, `alt=""` in source markup for all three — the state site ships no alt text here). Decoded and visually confirmed against this repo's existing `public/photos/about/` files:
   1. Left image — an orca surfacing near a rocky, forested shoreline.
   2. Center image — farmland (yellow tulip/daffodil rows) with forested foothills and mountains behind, misty light.
   3. Right image — storm clouds over Puget Sound at a rocky/sandy beach, low tide.

   These are the source's own content and are verbatim-usable as a photo trio. Since the source supplies no alt text, WCAG requires this prototype supply accurate alt text of its own — this is an accessibility fix to the image, not invented page content. The existing alt strings ("An orca surfacing in Puget Sound", "Farmland and forested foothills near the Puget Sound watershed", "Storm clouds over a Puget Sound beach at low tide") were checked against the decoded source images and are accurate; keep them.

2. **"What is Puget Sound Info?"** (source markup: plain ALL-CAPS `<p>WHAT IS PUGET SOUND INFO?</p>`, not a semantic heading — render as a real `<h2>`, sentence-case, words unchanged) — one paragraph, verbatim:
   > "Puget Sound Info is a collaborative platform for sharing and reporting information about Puget Sound recovery priorities, investments, accomplishments, and progress toward near-term results and long-term recovery goals. The platform launched in June 2019 and is expected to grow over time to support and accelerate Puget Sound recovery and the collective impact of partner activities."

3. **"Who is involved in developing and maintaining Puget Sound Info?"** (source: ALL-CAPS `<p>WHO IS INVOLVED IN DEVELOPING AND MAINTAINING PUGET SOUND INFO?</p>` → `<h2>`) — three paragraphs plus a partner list, verbatim, in this order:
   1. Paragraph with 6 inline links, in sentence order:
      > "Development of Puget Sound Info is guided by an oversight group comprising partners involved in Puget Sound recovery and the **Puget Sound National Estuary Program**. Information about activities and progress is reported by hundreds of partners in the (now decommissioned) Action Agenda Tracker (see the **2018 Action Agenda Archive**), the **National Estuary Program Atlas**, the **Ongoing Programs Portal**, and the websites for the **Progress Indicators** and the **Vital Signs**. Information about the current 4-year plan to recover Puget Sound is found in the **Action Agenda Explorer**. The Partnership maintains the Puget Sound Info platform."

      Link targets (source hrefs, with the classification this prototype's consolidated IA implies):
      - "Puget Sound National Estuary Program" → `https://www.psp.wa.gov/NEP-overview.php` — external
      - "2018 Action Agenda Archive" → `https://www.psp.wa.gov/2018-2022-action-agenda-explorer.php` — external
      - "National Estuary Program Atlas" → source href `https://nepatlas.pugetsoundinfo.wa.gov/` — internal, this repo's own NEP Atlas unit at `/prototypes/nep-atlas`
      - "Ongoing Programs Portal" → source href `OngoingProgram/Index` (relative, same site) — internal, `/prototypes/ongoing-programs`
      - "Progress Indicators" → source href `https://progressindicators.pugetsoundinfo.wa.gov/` — internal, `/prototypes/indicators`
      - "Vital Signs" → source href `https://vitalsigns.pugetsoundinfo.wa.gov/` — internal, `/prototypes/vital-signs`
      - "Action Agenda Explorer" → source href `https://actionagenda.pugetsoundinfo.wa.gov/2022-2026ActionAgenda` — internal, `/prototypes/action-agenda`
   2. Plain paragraph, verbatim: "The oversight group guiding development of Puget Sound Info currently includes representatives from each of the following partner organizations:"
   3. Partner list, exactly 7 items, source order, each a link (all external, `target="_blank" rel="noopener"` present in source for all 7):
      1. "Local Integrating Organizations" → `https://www.psp.wa.gov/LIO-overview.php`
      2. "National Estuary Program Strategic Intiative Leads" → `https://pugetsoundestuary.wa.gov/` (source's own typo, "Intiative" — preserve verbatim)
      3. "Northwest Indian Fisheries Commission" → `https://nwifc.org/`
      4. "Puget Sound Ecosystem Monitoring Program (PSEMP)" → `https://www.psp.wa.gov/PSEMP-overview.php`
      5. "Puget Sound Institute at the University of Washington, Tacoma" → `https://www.pugetsoundinstitute.org/`
      6. "Puget Sound Partnership" → `http://www.psp.wa.gov`
      7. "U.S. Environmental Protection Agency - Region 10" → `https://www.epa.gov/puget-sound`
   4. Closing paragraph with one mailto link, verbatim: "If you are interested in exploring ways to expand the platform to incorporate related Puget Sound recovery efforts, please **contact the Partnership**." — "contact the Partnership" → `mailto:wessyl.kelly@psp.wa.gov?subject=PS%20Info%20inquiry`

4. **"How is Puget Sound Info funded?"** (source: ALL-CAPS `<p>HOW IS PUGET SOUND INFO FUNDED?</p>` → `<h2>`) — two paragraphs, verbatim:
   1. Paragraph with 2 inline links + 1 mailto:
      > "Puget Sound Info development has been funded by the **Puget Sound Partnership**, the Washington State agency responsible for leading and coordinating Puget Sound recovery, and with funds to the Partnership through the **EPA's National Estuary Program**. If you have funds and would like to build on the platform, please **contact the Partnership**."
      - "Puget Sound Partnership" → `http://www.psp.wa.gov` — external
      - "EPA's National Estuary Program" → `https://www.epa.gov/nep/overview-national-estuary-program` — external
      - "contact the Partnership" → `mailto:wessyl.kelly@psp.wa.gov?subject=PS%20Info%20inquiry` (same CTA/subject as above)
   2. EPA funding-disclaimer paragraph, wrapped in `<em>` in source, verbatim (source also wraps the grant number itself in `<strong>`, nested inside the `<em>` — a minor fidelity detail worth preserving if the narrative renderer supports nested emphasis, not required):
      > "This project has been funded wholly or in part by the United States Environmental Protection Agency under Assistance Agreement [CE-01J31901]. The contents of this platform do not necessarily reflect the views and policies of the Environmental Protection Agency, nor does mention of trade names or commercial products constitute endorsement or recommendation for use."

The source article ends there. No further sections, no closing CTA band, no related-links band, no stats.

## Existing prototype file audit

- `src/data/pages/about.ts` is unusually well-documented already and is content-verbatim for all three narrative sections: the two Q&A-style headings' words (case-normalized from source ALL-CAPS to sentence-case `<h2>`s — approved, matches this repo's no-shouting-caps convention and changes no words), all paragraph text, the 7-item partner list (including the source's own "Intiative" typo, correctly preserved), the mailto CTA and subject, and the EPA disclaimer. The internal/external link classification (`AboutLink` kind on each segment) matches the routes that exist today in `psinfo-nav.ts` (`/prototypes/nep-atlas`, `/prototypes/ongoing-programs`, `/prototypes/indicators`, `/prototypes/vital-signs`, `/prototypes/action-agenda` all confirmed present). Reusable as-is.
- `PsInfoAboutPhotoTrio` + `ABOUT_PHOTOS` (orca / farmland-mountains / shoreline) are legitimate — verified by decoding the source's embedded base64 images: they are the same three photographs (orca surfacing, tulip fields with mountains, storm clouds over a beach). Reusable as-is, alt text included since source has none.
- `PsInfoAboutNarrative` (segments-with-inline-links model) and `PsInfoSectionTitle` are structurally correct for rendering the three Q&A sections and may be retained.
- **Must change: the header.** The page currently renders `PsInfoPhotoHeader size="band" image="/photos/sound-aerial.jpg" lede={ABOUT_HERO.lede}`. This unit's assigned header treatment is **plain**, and `/photos/sound-aerial.jpg` is a shared placeholder photo not sourced from this page at all. Rebuild on `EsaPageHeader` (`@esa/ecology/esa-page-header.astro`) with `title="About Puget Sound Info"` and **no lede** — the `ABOUT_HERO.lede` string must not be repeated in the header since it is already Section 2's own body text (see Header note above). `ABOUT_HERO.title` is reusable; `ABOUT_HERO.lede` should be dropped as a header prop (the sentence itself still lives on, verbatim, inside Section 2).

## Explicit exclusions

- Nothing beyond the 4 items above (photo trio + 3 Q&A sections). No invented eyebrows, no stat bands (the source shows no numbers on this page), no cross-link band, no photos beyond the source's own 3 inline images, no repeating the Section-2 opening sentence as a header lede.

## Gaps

- None. The page is server-rendered (confirmed via `curl -sL`, no JS-gated content); every heading, paragraph, list item, link href, and inline image was extractable directly from the fetched HTML, including decoding the three base64-embedded photographs to confirm their subjects. The only native gap is accessibility, not content: the source ships `alt=""` on all three inline images, so this prototype's alt text is supplied to meet WCAG rather than lifted from source markup — documented above, not a content fabrication.

## Fidelity audit — 2026-07-22

Structure + content re-audit against the saved prod DOM (scratchpad/prod/about.html; prod main is 4.7KB of markup once its three base64 photos are stripped):

- **Verified verbatim, no changes needed**: h1 + section order (photos → three Q&A sections) matches prod's reading order; all nine prod paragraphs, the 7-item partner list (incl. the source's "Intiative" typo), both mailto CTAs, and every href match the data module exactly. Link classification re-checked against the repo-wide convention: genuinely-external hosts carry the mark and open a new tab; the five consolidated-IA links render as internal same-tab routes with no mark; mailto links carry no mark.
- **The header fix this contract required has landed**: the page renders plain `EsaPageHeader` (title only, no lede, no photo band) — the "Existing prototype file audit" section above describes the pre-fix state and is retained as history.
- **Fixed (only divergence found)**: prod nests `<strong>CE-01J31901</strong>` inside the EPA disclaimer's `<em>` (brackets outside the strong). Now modeled via an optional `strong` flag on text segments and rendered by PsInfoAboutNarrative. Previously noted here as optional; the fidelity pass reproduces it.
- **Kept as established convention**: the three ALL-CAPS `<p>` pseudo-headings render as sentence-case real `<h2>`s (words unchanged — repo's no-shouting-caps rule); prototype-supplied alt text on the three photos (source ships `alt=""`; WCAG fix, not invented content).
