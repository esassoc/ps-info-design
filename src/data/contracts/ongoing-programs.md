# Page contract: ongoing-programs

Source: https://www.pugetsoundinfo.wa.gov/OngoingProgram/Index (fetched 2026-07-17) / Route(s): /prototypes/ongoing-programs

Header: plain — title "Ongoing Programs" (verbatim breadcrumb/`<title>` text — **not** "Ongoing Programs Portal"; "Portal" only appears mid-sentence in the body copy, never as the page's own title); **no lede**. The source's two intro paragraphs sit directly under the title with no shorter, distinct lede sentence above them — they are Section 1's own body copy, not a separate header tagline. Using the first sentence as a header lede (as the current prototype does) would duplicate content the source states once, the same issue flagged on the `about` contract.

Use `EsaPageHeader` (`@esa/ecology/esa-page-header.astro`) with `title="Ongoing Programs"` and no `lede` prop.

## Sections (source order, exhaustive)

The fetched page (`curl -sL`) is almost entirely site chrome plus one short body: a section-level title bar and tab strip, a breadcrumb title, then a single content block (one inline image + two paragraphs + four empty spacer paragraphs), then the global footer.

1. **Section-level tab strip** (`ogpTitleBar` + `mainNavbar`, immediately above the breadcrumb) — **chrome, not a content section**; documented here only so it isn't mistaken for IA. Verbatim labels/hrefs:
   - "Ongoing Programs" → `/OngoingProgram/Index` (self, the title-bar link)
   - "Program List" → `/OngoingProgram/Programs`
   - "State Program Budgets" → `/OngoingProgram/Budgets`
   - "Program Targets" → `/OngoingProgram/Targets`
   - "Data Dashboard" → `/OngoingProgram/Dashboard`

   This is a same-section tab bar to sibling ASP.NET routes on the source site — analogous to header/menu chrome elsewhere in this repo. Do not render it as a section, a board, or an invented cross-link band, and do not pull in content from the routes it points to (see Explicit exclusions).

2. **Intro** (no source heading tag — this is the page's entire body, directly under the breadcrumb title) — inventory, in order:
   1. Inline image, floated right, 375×377 CSS box (actual decoded PNG is 767×771): a Puget Sound / Salish Sea regional map. Source markup ships `alt=""` (decorative per the source's own markup — an accessibility gap in the original, same pattern already documented on the `about` contract for its photo trio). Visually confirmed contents: the Salish Sea bioregion outlined in dark blue, Urban Growth Areas shaded yellow-green, Federally Recognized Tribes' lands shaded orange, place labels (Vancouver, Victoria, Bellingham, Everett, Seattle, Bremerton, Tacoma, Olympia, Port Angeles, Hoodsport, etc.), a small Salish-Sea-in-North-America locator inset bottom-right, and this credit line burned into the image itself: "Credits: WA Department of Ecology, Aquila Flower (Western Washington University), Esri, CGIAR, HERE, Garmin, FAO, NOAA, USGS, EPA, NRCan, Parks Canada, Island County, WA State Parks GIS. Puget Sound Partnership 2021." Legend keys shown on the image: "Urban Growth Area," "Federally Recognized Tribes," "Salish Sea Bioregion Boundary."
   2. Paragraph 1, verbatim: "The Partnership maintains an inventory of state and federal ongoing programs in the Ongoing Programs Portal. Ongoing programs are continuing efforts that provide regulatory oversight, technical support, implementation resources, financial resources, or other guidance. State, federal, local, tribal, and nongovernmental ongoing programs are the critical foundation for Puget Sound recovery. They form the base of activities upon which Puget Sound recovery priorities and actions are built and dependent and continued investment in them is a priority of the Partnership. We rely on our ongoing program partners to actively align their work with the Action Agenda strategies and actions and tell us what they need to advance those strategies and actions."
   3. Paragraph 2, verbatim: "Though the state and federal inventory should not be considered comprehensive, we are committed to continuing to improve it, ensuring it is reviewed and updated at least every four years when the Action Agenda is revised. While we recognize the importance of local, Tribal, and nongovernmental ongoing programs, we do not currently maintain an inventory of those programs due to the feasibility constraints involved in inventorying such a large number of activities."
   4. Four empty `<p>&nbsp;</p>` spacer paragraphs follow — layout filler, not content; drop them.

The source article ends there. No headline stats, no activity-type breakdown, no program table/board, no closing CTA, no cross-link band — none of those appear anywhere in the fetched Index page markup.

## Existing prototype file audit

- `src/data/pages/ongoing-programs.ts`'s `INTRO_PARAGRAPHS` array is already verbatim-correct for both paragraphs above — reusable as-is.
- `PAGE_TITLE = 'Ongoing Programs Portal'` is wrong: the source's own title/breadcrumb text is "Ongoing Programs" (no "Portal"). Must be corrected.
- `HERO_LEDE` (the header's photo-band lede) duplicates the first sentence of paragraph 1 — must be dropped per the Header note above; the sentence still lives on inside the Intro section's own paragraph 1.
- **Must change: the header.** The page currently renders `PsInfoPhotoHeader size="band" image="/photos/sound-aerial.jpg" lede={HERO_LEDE}`. This unit's assigned header treatment is `plain`, and `/photos/sound-aerial.jpg` is the shared placeholder photo, not sourced from this page. Rebuild on `EsaPageHeader` with `title="Ongoing Programs"` and no lede.
- **Must remove — sourced from a different URL, not this Index page:**
  - The headline stats band (`headlineStats` / `PsInfoStatBand`: Total programs, Active, Statewide, Puget Sound Region counts). These counts come from the `IndexGridJsonData` endpoint, which the Index page itself never displays.
  - `PROGRAM_LIST_INTRO`, `ACTIVITY_TYPE_HEADING`, `ACTIVITY_TYPE_INTRO`, `ACTIVITY_TYPE_BREAKDOWN`, `ACTIVITY_TYPE_STATS` and the `PsInfoOngoingProgramsActivityBreakdown` component instance. This is the "Program List" tab's own intro and donut-chart copy — verbatim from `/OngoingProgram/Programs`, a different route, not the assigned Index source.
  - The "All Programs" board (`PROGRAMS`, `groupByActivityType`, `PsInfoOngoingProgramsBoard`, all ~270 rows) — sourced from the live `IndexGridJsonData` endpoint, not present on the Index page.
  - The "Related across the platform" cross-links band (`PsInfoCrossLinks`, linking to NEP Atlas / State of the Sound) — not present on the Index page in any form; an invented addition.
- `PsInfoOngoingProgramsIntro` (the component wrapping the two intro paragraphs) is structurally reusable for Section 2 above, once the header duplication is removed and (per the a11y note) the inline map image is given real alt text if it's carried into the rebuild.

## Explicit exclusions

- Nothing beyond the Intro (image + 2 paragraphs) above. No invented ledes/taglines/eyebrows, no stat bands the source doesn't show on this page, no cross-link bands, no photos beyond the source's own one inline image.
- Do not reproduce the section-level tab strip (Program List / State Program Budgets / Program Targets / Data Dashboard) as a rendered section, board, or cross-link band — it is chrome to sibling routes, not this page's content.
- Do not carry over the Activity Type breakdown, headline stat counts, or the 270-program board — none of that content lives on `https://www.pugetsoundinfo.wa.gov/OngoingProgram/Index`; it belongs to the separate `/OngoingProgram/Programs` ("Program List") route and the `IndexGridJsonData` endpoint, both out of scope for this contract's assigned source.

## Gaps

- The inline regional map image ships as a base64 data URI in source with `alt=""` (decorative per the source's own markup — an accessibility gap in the original, not a cue to omit alt). It should be extracted to a real asset file (not re-embedded as base64) with meaningful alt text supplied for WCAG compliance — implementor-stage work, out of scope for this contract-authoring stage.
- The richer program-inventory content already built in this unit's data file (headline stats, Activity Type donut stats, and the 270-program board) is real, verbatim content — but it lives on `/OngoingProgram/Programs` (the "Program List" tab) and the `IndexGridJsonData` endpoint, not on the assigned `/OngoingProgram/Index` page. This contract is scoped strictly to the Index page per the assigned source URL. Whether the "ongoing-programs" unit should instead represent the full Ongoing Program section (Index + Program List + inventory) is a scope call for whoever assigns source pages to units, not something inferred here — flagging it rather than deciding it unilaterally.
- No other gaps: the page is server-rendered (confirmed via `curl -sL`; the `b-w6y3vrj8mn` scoped-CSS attributes are harmless Blazor markup, not client-rendered content). Both paragraphs, the title/breadcrumb text, the tab-strip labels/hrefs, and the inline image were all extractable directly from the fetched HTML.
