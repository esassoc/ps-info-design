// ongoing-programs.ts — content for src/pages/prototypes/ongoing-programs.astro
// (Implementation & Funding module, "Ongoing Programs Portal" leaf).
//
// Sourced 2026-07-17 from the assigned source URL —
//   https://www.pugetsoundinfo.wa.gov/OngoingProgram/Index
// — which is server-rendered (confirmed via `curl -sL`) and carries only a
// section-level tab strip (chrome, not content) plus a single intro block:
// one inline regional map image and two verbatim paragraphs. Per the page
// contract (src/data/contracts/ongoing-programs.md), that is the page's
// entire body — no headline stats, no program table, no cross-link band.
//
// GAPS:
// - The source ships the map image as a base64 PNG with alt="" (decorative
//   per the source's own markup — an accessibility gap in the original, the
//   same pattern documented on the `about` contract for its photo trio). It
//   has been extracted to a real asset file (public/photos/ongoing-programs/
//   salish-sea-map.png, 767x771) with meaningful alt text supplied here for
//   WCAG compliance. Visually confirmed contents: the Salish Sea bioregion
//   outlined in dark blue, Urban Growth Areas shaded yellow-green, Federally
//   Recognized Tribes' lands shaded orange, and place labels from Vancouver,
//   B.C. to Olympia, WA. A credit line and locator inset are burned into the
//   image itself and are not reproduced separately as text.
// - The Index page's tab strip ("Program List", "State Program Budgets",
//   "Program Targets", "Data Dashboard") points at sibling routes with their
//   own content and is not rendered here — it's same-section chrome, not
//   this page's IA (see contract). The richer program-inventory content this
//   unit's data file previously carried (headline stats, the "Program List"
//   tab's own intro + Activity Type breakdown, and the 270-program board)
//   is real, verbatim content, but it lives on `/OngoingProgram/Programs`
//   and the `IndexGridJsonData` endpoint — a different route than this
//   contract's assigned source — and was removed per the contract's explicit
//   scope. It remains recoverable from git history if a future unit is
//   assigned that route.

export const SITE_ORIGIN = 'https://www.pugetsoundinfo.wa.gov';
export const SOURCE_URL = `${SITE_ORIGIN}/OngoingProgram/Index`;

// ── Header ───────────────────────────────────────────────────────────────
// The source's own title/breadcrumb text — no "Portal" (that word only
// appears mid-sentence in the body copy, never as the page's own title).
export const PAGE_TITLE = 'Ongoing Programs';

// The Index page's full intro, verbatim (2 paragraphs; the source's other 4
// paragraphs are empty &nbsp; spacers, dropped).
export const INTRO_PARAGRAPHS: string[] = [
  'The Partnership maintains an inventory of state and federal ongoing programs in the Ongoing Programs Portal. Ongoing programs are continuing efforts that provide regulatory oversight, technical support, implementation resources, financial resources, or other guidance. State, federal, local, tribal, and nongovernmental ongoing programs are the critical foundation for Puget Sound recovery. They form the base of activities upon which Puget Sound recovery priorities and actions are built and dependent and continued investment in them is a priority of the Partnership. We rely on our ongoing program partners to actively align their work with the Action Agenda strategies and actions and tell us what they need to advance those strategies and actions.',
  'Though the state and federal inventory should not be considered comprehensive, we are committed to continuing to improve it, ensuring it is reviewed and updated at least every four years when the Action Agenda is revised. While we recognize the importance of local, Tribal, and nongovernmental ongoing programs, we do not currently maintain an inventory of those programs due to the feasibility constraints involved in inventorying such a large number of activities.',
];

// The Index page's own inline regional map image (floated beside the intro
// paragraphs in the source layout). Extracted from the source's base64 PNG
// to a real asset file; alt text describes the map's actual content since
// the source's own alt="" is a decorative-markup gap, not a cue to omit it.
export const MAP_IMAGE = {
  src: '/photos/ongoing-programs/salish-sea-map.png',
  alt:
    "Map of the Puget Sound / Salish Sea bioregion showing the Salish Sea Bioregion Boundary, Urban Growth Areas, and the lands of Federally Recognized Tribes, with cities and tribal nations labeled from Vancouver, B.C. to Olympia, Washington.",
  width: 767,
  height: 771,
};
