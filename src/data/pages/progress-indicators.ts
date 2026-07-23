// src/data/pages/progress-indicators.ts — content for the Progress Indicators
// unit (Progress module).
//
// Directed reproduction of a SINGLE URL:
// https://progressindicators.pugetsoundinfo.wa.gov/ (the Progress Indicators
// site's home page only, fetched 2026-07-22). The AG Grid on that page is
// populated by a client-side fetch to /Home/IndexGridJsonData, not present in
// the static HTML — those 16 rows were fetched separately on 2026-07-22 and
// are embedded verbatim below (raw payload preserved at
// scratchpad/prod/pi-grid-data.json). See
// src/data/contracts/progress-indicators.md for full sourcing notes.
//
// Every string below is verbatim from that page/feed. Nothing is aggregated,
// computed, or invented.

export const SOURCE_URL = 'https://progressindicators.pugetsoundinfo.wa.gov/';
export const PAGE_TITLE = 'Progress Indicators'; // prod <title>
// Prod's sitewide siteTitle banner (shouting caps in source, sentence-cased
// per repo rule) + its tagline line — verbatim site identity, not invented:
export const SITE_NAME = 'Puget Sound Progress Indicators';
export const TAGLINE = 'Measures of human activities that influence ecosystem health';
export const LOGO = { src: '/logos/pi-logo-2026.png', alt: 'Puget Sound Progress Indicators' };

// ── Inline link segments (shared shape) ─────────────────────────────────────
// Mirrors nep-atlas.ts's local segment model (src/data/pages/nep-atlas.ts) —
// kept local rather than imported since PsInfoPiIntro's Props type is against
// these shapes specifically. *.pugetsoundinfo.wa.gov hosts are internal-CLASS
// on this prototype: no external mark, no new tab, even when the href stays
// absolute to the live site.
export interface PiInternalLink {
  kind: 'internal';
  text: string;
  /** Root-relative route in this prototype's own IA; resolve with withBase(). */
  route: string;
}
export interface PiExternalLink {
  kind: 'external';
  text: string;
  href: string;
}
export type PiLink = PiInternalLink | PiExternalLink;

export type PiSegment = { type: 'text'; text: string } | { type: 'link'; link: PiLink };

export interface PiParagraph {
  segments: PiSegment[];
  /** true when the source wraps the whole paragraph in <strong>. */
  emphasis?: boolean;
}

// ── Intro (verbatim, three paragraphs) ──────────────────────────────────────
// Source's empty `<p>&nbsp;</p>` spacer between paragraphs is dropped; a
// trailing &nbsp; in the source text is normalized to a plain space.
export const INTRO_PARAGRAPHS: PiParagraph[] = [
  {
    segments: [
      {
        type: 'text',
        text: 'Progress Indicators measure human activities that can influence ecosystem conditions of Puget Sound in positive and negative ways. Progress Indicators help us understand whether we are progressing Puget Sound recovery efforts, as directed by the ',
      },
      // Source href: https://actionagenda.pugetsoundinfo.wa.gov/2026-2030 —
      // remapped to the built /prototypes/action-agenda prototype page (the
      // unified-IA payoff: this destination already exists in this build).
      { type: 'link', link: { kind: 'internal', text: 'Action Agenda', route: '/prototypes/action-agenda' } },
      { type: 'text', text: ' and achieving the short-term results we expect.' },
    ],
  },
  {
    segments: [
      { type: 'text', text: 'Progress Indicators are developed in collaboration with local, state and Tribal partners. View ' },
      // Source href: /About — absolutized to the live PI subdomain; no
      // prototype PI-About page exists. Internal-class host → no external mark.
      { type: 'link', link: { kind: 'external', text: 'About the Progress Indicators', href: 'https://progressindicators.pugetsoundinfo.wa.gov/About' } },
      { type: 'text', text: ' for more information.' },
    ],
  },
  {
    emphasis: true,
    segments: [
      {
        type: 'text',
        text: 'Select a card below to learn more about that topic and explore the indicators designed to track progress towards recovery goals on that topic or scroll down to the indicator table to see all Progress Indicators.',
      },
    ],
  },
];

// ── Topic cards (source order) ──────────────────────────────────────────────
export interface AaTopicRef {
  code: string;
  label: string;
}
export interface PiTopicCard {
  title: string;
  href: string;
  image: string;
  aaTopics: AaTopicRef[];
  /** Set when this topic has an in-prototype exemplar page — the card links
   *  there (withBase) instead of `href`. */
  route?: string;
}

// The sub-block header inside each card, verbatim.
export const TOPIC_CARDS_LABEL = 'Action Agenda Topics';

export const TOPIC_CARDS: PiTopicCard[] = [
  {
    title: 'Agricultural Land Protection',
    href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/2',
    image: '/photos/pi/agricultural-land-protection.png',
    aaTopics: [{ code: '06', label: 'Agricultural Land Protection' }],
    // Exemplar topic built at this route in this prototype — card links internally.
    route: '/prototypes/progress-indicators/topic-2',
  },
  {
    title: 'Floodplains, Estuaries, Nearshore, and Riparian Areas',
    href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/6',
    image: '/photos/pi/floodplains-estuaries-nearshore-riparian.png',
    aaTopics: [
      { code: '10', label: 'Floodplains and Estuaries' },
      { code: '11', label: 'Riparian Areas' },
    ],
  },
  {
    title: 'Oil Spills',
    href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/17',
    image: '/photos/pi/oil-spills.png',
    aaTopics: [{ code: '20', label: 'Vessel Impacts' }],
  },
  {
    title: 'On-site Sewage System Management',
    href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/13',
    image: '/photos/pi/onsite-sewage-system-management.png',
    aaTopics: [{ code: '18', label: 'Fecal Pollution' }],
  },
  {
    title: 'Smart Growth',
    href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/1',
    image: '/photos/pi/smart-growth.png',
    aaTopics: [{ code: '05', label: 'Smart Growth' }],
  },
];

// ── Grid section (headings/labels verbatim from prod) ──────────────────────
export const GRID_HEADING = 'Explore all Progress Indicators';
export const GRID_DOWNLOAD_LABEL = 'Download Table';
export const GRID_CLEAR_FILTERS_LABEL = '(clear filters)';
/** Toolbar row-count line, verbatim template from the source page (same
 * phrasing as the Indicators unit's own grid — src/data/pages/indicators.ts). */
export const gridRowCountText = (shown: number, total: number): string =>
  `Currently Viewing ${shown} out of ${total} Indicators`;
export const GRID_EXPORT_FILE_NAME = 'progress-indicators-export';

export interface PiGridColumn {
  field: 'indicator' | 'description' | 'topics' | 'aaTopicLinks' | 'programs';
  headerName: string;
  initialWidth: number;
}

export const GRID_COLUMNS: PiGridColumn[] = [
  { field: 'indicator', headerName: 'Progress Indicator', initialWidth: 430 },
  { field: 'description', headerName: 'Description', initialWidth: 630 },
  { field: 'topics', headerName: 'Progress Indicator Topic', initialWidth: 230 },
  { field: 'aaTopicLinks', headerName: 'Action Agenda Topics', initialWidth: 230 },
  { field: 'programs', headerName: 'Related Ongoing Programs', initialWidth: 230 },
];

export interface PiLinkCell {
  label: string;
  href: string;
}
export interface PiIndicatorRow {
  indicator: string;
  href: string;
  description: string;
  topics: PiLinkCell[];
  aaTopicLinks: PiLinkCell[];
  programs: string;
}

// All 16 rows VERBATIM (source order = alphabetical). Descriptions are the
// source HTML flattened to plain text, entities decoded to real characters
// (’ “ ”). Topic hrefs absolutized to the progressindicators subdomain.
export const INDICATOR_ROWS: PiIndicatorRow[] = [
  {
    indicator: 'All floodplain habitat acquisition',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/176',
    description:
      'This indicator measures the acres of floodplain habitat (freshwater floodplains, estuarine/nearshore, and riparian areas) acquired for conservation or future restoration activities. Floodplains create and support a diverse web of natural resources, recreational opportunities, and offer ecosystem benefits like floodwater storage. This indicator can help us evaluate our success accelerating the pace of habitat protection.',
    topics: [{ label: 'Floodplains (non-tidal)', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/6' }],
    aaTopicLinks: [{ label: '10 - Floodplains and Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/10/Overview' }],
    programs: 'Agricultural Conservation Easement Program, Forest Riparian Easement Program, Puget Sound Conservation Districts (12)',
  },
  {
    indicator: 'All floodplains habitat restoration',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/143',
    description:
      'This indicator measures acres of floodplain habitat (freshwater floodplains, estuarine/nearshore, and riparian areas) improved through restoration activities. Floodplains create and support a diverse web of natural resources, recreational opportunities, and ecosystem benefits like floodwater storage. This indicator can help us evaluate our success accelerating the pace of habitat restoration.',
    topics: [{ label: 'Floodplains (non-tidal)', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/6' }],
    aaTopicLinks: [{ label: '10 - Floodplains and Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/10/Overview' }],
    programs: '',
  },
  {
    indicator: 'Emergency response equipment funding',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/180',
    description:
      'This indicator measures the percentage of dollars requested for emergency oil spill response equipment that have been funded by the Department of Ecology’s equipment grant program. This grant program funds the purchase of response equipment for applicants statewide; if a spill were to occur in Puget Sound, any equipment anywhere in the state is made available to be transported to the site of that spill to assist with response. This grant program is therefore helpful to track as it provides a helpful indication of capacity to respond to oil spills in Puget Sound.',
    topics: [{ label: 'Oil Spills', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/17' }],
    aaTopicLinks: [{ label: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }],
    programs: '',
  },
  {
    indicator: 'Estuarine/nearshore habitat acquisition',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/170',
    description:
      'This indicator measures acres of estuarine/nearshore floodplain habitat acquired for conservation or future restoration activities. Estuaries represent transition zones between the land and sea, supporting diverse flora, fauna, recreation opportunities, and a vibrant food web. This indicator can help us evaluate our success toward accelerating the pace of habitat protection.',
    topics: [{ label: 'Floodplains (non-tidal)', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/6' }],
    aaTopicLinks: [{ label: '10 - Floodplains and Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/10/Overview' }],
    programs: 'Agricultural Conservation Easement Program, Forest Riparian Easement Program, Puget Sound Conservation Districts (12)',
  },
  {
    indicator: 'Estuarine/nearshore habitat restoration',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/168',
    description:
      'This indicator measures acres of estuarine/nearshore floodplain habitat improved through restoration activities. Estuaries represent transition zones between the land and sea, supporting diverse flora, fauna, recreation opportunities, and a vibrant food web. This indicator can help us evaluate our success toward accelerating the pace of habitat restoration.',
    topics: [{ label: 'Floodplains (non-tidal)', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/6' }],
    aaTopicLinks: [{ label: '10 - Floodplains and Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/10/Overview' }],
    programs: '',
  },
  {
    indicator: 'Farmland conversion',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/181',
    description:
      'This indicator measures the acres of farmland converted to a non-agricultural use. Farmlands can provide wildlife habitat, reduce air pollution, and mitigate the spread of urban heat islands while providing quality, locally sourced foods. Identifying where, when, and why farmland conversion has happened can help support the development of more effective policies and plans to protect farmland.',
    topics: [{ label: 'Agricultural Land Protection', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/2' }],
    aaTopicLinks: [{ label: '06 - Agricultural Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/06/Overview' }],
    programs: 'Growth Management Services, Office of Farmland Preservation (OFP)',
  },
  {
    indicator: 'Farmland protection',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/182',
    description:
      'This indicator measures the acres of farmland permanently protected from development through agricultural or conservation easements. Farmlands can provide wildlife habitat, reduce air pollution, and mitigate the spread of urban heat islands while providing quality, locally sourced foods. Protecting farmlands can help slow the conversion of farmlands to non-agricultural uses, though conservation easements do not increase the amount of farmland actively used nor ensure that the land produces crops in the future. This indicator can help us understand progress expanding the protection of farmland across the region.',
    topics: [{ label: 'Agricultural Land Protection', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/2' }],
    aaTopicLinks: [{ label: '06 - Agricultural Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/06/Overview' }],
    programs: 'Office of Farmland Preservation (OFP), Agricultural Conservation Easement Program, Puget Sound Conservation Districts (12)',
  },
  {
    indicator: 'Housing diversity',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/188',
    description:
      'This indicator measures the percentage of total new housing production that is multi-unit (e.g., apartment buildings, condominiums, townhomes, etc.). Multi-unit housing types require less land area for each new unit than single-unit options, thus helping to conserve forest lands, open spaces, agricultural lands, and other natural ecosystems in Puget Sound. This indicator, measured at the city, town, and county level, can help local planners evaluate how their policies support a variety of housing options.',
    topics: [{ label: 'Smart Growth', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/1' }],
    aaTopicLinks: [{ label: '05 - Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Overview' }],
    programs: 'Growth Management Services',
  },
  {
    indicator: 'Infill development',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/187',
    description:
      'This indicator measures acres of new impervious surface area in residential zones per net new housing units built. Increasing housing units in areas with existing impervious surface, such as through new apartment buildings and other multi-unit housing, is an effective way to support population growth while protecting sensitive habitats. A lower value in this indicator suggests that more new housing was located in areas with existing impervious surfaces which can support the protection of sensitive habitats.',
    topics: [{ label: 'Smart Growth', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/1' }],
    aaTopicLinks: [{ label: '05 - Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Overview' }],
    programs: 'Growth Management Services',
  },
  {
    indicator: 'Oil spills',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/152',
    description:
      'This indicator measures the volume of oil spilled from any source to the Puget Sound environment, including spills to both land and surface waters. Any amount of oil spilled causes environmental damage, therefore oil spills pose high-impact risks to natural, cultural, and economic resources. This indicator helps to assess how well the region is doing at preventing accidental oil spills and mitigating the impact of spills if they do occur.',
    topics: [{ label: 'Oil Spills', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/17' }],
    aaTopicLinks: [{ label: '20 - Vessel Impacts', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/20/Overview' }],
    programs: '',
  },
  {
    indicator: 'On-site sewage system compliance',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/178',
    description:
      'This indicator measures the number of small on-site sewage systems compliant with state and local inspection schedules. Compliant OSS that are routinely inspected ensure the system is used and operating as designed. These OSS do not pose a risk to human or environmental health and will not impact nearby water quality and shellfish beds. This indicator helps us evaluate trends in the number of OSS that are compliant with state and local inspection requirements.',
    topics: [{ label: 'On-site Sewage System Management', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/13' }],
    aaTopicLinks: [{ label: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }],
    programs:
      'Clean Water State Revolving Fund, National Estuary Program: Shellfish Strategic Initiative, Shellfish Growing Area Classification and Water Quality Restoration Program, Wastewater Management Program (Large and Small Onsite Sewage Systems), Water Quality - Control Stormwater and Wastewater Pollution',
  },
  {
    indicator: 'On-site sewage system failures',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/179',
    description:
      'This indicator measures the number of small on-site sewage systems (OSS) with an identified and unresolved failure (“failures”). Failures range in severity and potential for environmental and public health harm, though typically more severe failures are reported. This indicator helps us track and manage failing OSS, which are a leading pressure impacting water quality and shellfish bed health in Puget Sound.',
    topics: [{ label: 'On-site Sewage System Management', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/13' }],
    aaTopicLinks: [{ label: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }],
    programs:
      'Clean Water State Revolving Fund, National Estuary Program: Shellfish Strategic Initiative, Shellfish Growing Area Classification and Water Quality Restoration Program, Wastewater Management Program (Large and Small Onsite Sewage Systems), Water Quality - Control Stormwater and Wastewater Pollution',
  },
  {
    indicator: 'On-site sewage system inventory: known systems',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/177',
    description:
      'This indicator measures the number of small on-site sewage systems (OSS) known and inventoried with their local health jurisdiction. An OSS can become “known” through permit applications, inspection reports, site surveys, or spatial analyses. Inventorying and properly managing OSS is an important step to prevent and repair failures, protecting environmental and public health. This indicator helps us track the number of OSS in Puget Sound.',
    topics: [{ label: 'On-site Sewage System Management', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/13' }],
    aaTopicLinks: [{ label: '18 - Fecal Pollution', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/18/Overview' }],
    programs:
      'Clean Water State Revolving Fund, National Estuary Program: Shellfish Strategic Initiative, Shellfish Growing Area Classification and Water Quality Restoration Program, Wastewater Management Program (Large and Small Onsite Sewage Systems), Water Quality - Control Stormwater and Wastewater Pollution',
  },
  {
    indicator: 'Riparian habitat acquisition',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/175',
    description:
      'This indicator measures the acres of riparian floodplain areas acquired for conservation or future restoration activities. Riparian areas are critical habitats that border marine and freshwater systems and keep waters clean and cool, control erosion, moderate flooding events, and offer key habitat for a diversity of wildlife. This indicator can help us evaluate our success accelerating the pace of habitat protection.',
    topics: [{ label: 'Floodplains (non-tidal)', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/6' }],
    aaTopicLinks: [{ label: '11 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/11/Overview' }],
    programs: 'Shorelands - Floodplains by Design, Puget Sound Acquisition and Restoration, Estuary and Salmon Restoration Program',
  },
  {
    indicator: 'Riparian habitat restoration',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/169',
    description:
      'This indicator measures the acres of riparian floodplain areas improved through restoration activities. Riparian areas are critical habitats that border marine and freshwater systems and keep waters clean and cool, control erosion, moderate flooding events, and offer key habitat for a great diversity of wildlife. This indicator can help us evaluate our success accelerating the pace of habitat restoration.',
    topics: [{ label: 'Floodplains (non-tidal)', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/6' }],
    aaTopicLinks: [{ label: '11 - Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/11/Overview' }],
    programs: '',
  },
  {
    indicator: 'Urban growth',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/186',
    description:
      'This indicator tracks the percentage of total new housing growth located within urban growth areas. Prioritizing development in urban growth areas can help protect natural lands outside urban areas. This indicator is one way to assess progress channeling growth into urban growth areas.',
    topics: [{ label: 'Smart Growth', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/1' }],
    aaTopicLinks: [{ label: '05 - Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Overview' }],
    programs: 'Growth Management Services',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// ── Topic Detail exemplar: Agricultural Land Protection (Topic/Detail/2) ───
// Directed reproduction of a SINGLE URL:
// https://qa-progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/2 (the QA
// site — the 2026 Topic pages exist only on QA today; fetched 2026-07-22).
// Every string below is verbatim from that page. Carried IN FULL — nothing
// truncated, aggregated, computed, or invented. Normalizations (recorded in
// src/data/contracts/progress-indicators.md): QA hosts in hrefs →
// production equivalents (qa. → www., qa-actionagenda. → actionagenda.,
// qa-progressindicators. → progressindicators.), matching the hrefs the home
// page above already carries; trailing &nbsp; runs trimmed; interior &nbsp;
// → plain space (source's <strong>811</strong>&nbsp;<strong>fewer</strong>
// modeled as two adjacent strong segments, '811' + ' fewer'); empty
// <p>&nbsp;</p> spacers and an MsoNormal <!-- [if !supportLists]--> Word
// artifact dropped.

export const TOPIC2_SOURCE_URL = 'https://qa-progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/2';

// Rich prose: same discriminated-segment pattern as PiSegment above, plus
// strong/em runs (this page's body is CMS rich text).
export type PiRichSegment =
  | { type: 'text'; text: string; strong?: boolean; em?: boolean }
  | { type: 'link'; link: PiLink };

export type PiTopicBlock =
  | { kind: 'paragraph'; segments: PiRichSegment[] }
  | { kind: 'bullets'; items: PiRichSegment[][] };

export interface PiTopicSection {
  /** Verbatim h2 heading (source's trailing &nbsp; trimmed). */
  heading: string;
  blocks: PiTopicBlock[];
}

// The source's own Fancytree vocabulary for THIS page (verbatim icon alt text).
export type PiProgressLabel = 'Indicator To Be Developed' | 'Getting Worse';
export type PiTargetStatusLabel = 'Limited Data';

export interface PiTopicTreeIndicator {
  name: string;
  /** Indicator Detail page on the network hub (host normalized qa. → www.). */
  href: string;
  progress: PiProgressLabel;
  targetStatus: PiTargetStatusLabel | null;
}
export interface PiTopicTreeData {
  topic: string;
  /** Self-link route (source root row links to /Topic/Detail/2 — this page). */
  route: string;
  indicators: PiTopicTreeIndicator[];
}

export interface PiBreadcrumb {
  label: string;
  /** Absolute network URL (internal-class, no mark). */
  href?: string;
  /** In-prototype route; resolve with withBase(). */
  route?: string;
}

export interface PiContributingPartner {
  name: string;   // verbatim img alt = org name
  href: string;   // Organization Detail on the network hub (qa. → www.)
  image: string;  // public/ path
  width: number;
  height: number;
}

export interface PiAaTopicCardRef {
  label: string;  // 'TOPIC 06' — rendered as an esa-badge value
  title: string;
  href: string;
  image: string;
}

export interface PiTopicDetail {
  title: string;
  route: string;
  breadcrumbs: PiBreadcrumb[];
  intro: PiTopicBlock[];
  description: PiTopicBlock[];
  treeHeading: string;
  tree: PiTopicTreeData;
  narrativeSections: PiTopicSection[];
  partnersHeading: string;
  partners: PiContributingPartner[];
  aaTopicsHeading: string;
  aaTopicCard: PiAaTopicCardRef;
  lastUpdatedHeading: string;
  lastUpdated: string;
}

export const TOPIC2: PiTopicDetail = {
  title: 'Agricultural Land Protection',
  route: '/prototypes/progress-indicators/topic-2',
  // Source breadcrumb row, verbatim labels. "/About" absolutized (no
  // prototype PI-About page); "/" remapped to the built PI home page.
  breadcrumbs: [
    { label: 'About the Progress Indicators', href: 'https://progressindicators.pugetsoundinfo.wa.gov/About' },
    { label: 'Back to Progress Indicators', route: '/prototypes/progress-indicators' },
  ],
  // #introduction — full-width, three paragraphs.
  intro: [
    { kind: 'paragraph', segments: [
      { type: 'text', text: 'Well-managed farmlands provide habitat for animals like migratory birds, elk, and salmon. These lands also reduce air pollution, filter freshwater, and reduce urban heat islands. Farmlands power a vibrant economy that provides high-quality local food and career options to Puget Sound communities. When these lands are converted to buildings, roads, or other developments, we risk losing the benefits farmlands can provide for us. By supporting the protection and viability of farmlands in Puget Sound, we can help farmers stay farming while withstanding pressure to convert these lands to more developed uses that degrade habitat.' },
    ] },
    { kind: 'paragraph', segments: [
      { type: 'text', text: 'Success looks like reducing the conversion of farmlands and increasing the protection of farmlands through smart and well-enforced land use planning. ', strong: true },
      { type: 'text', text: 'Farmers benefit from technical assistance and succession planning programs, business guidance, incentives to make environmentally friendly choices, and programs that permanently protect farmland from development.' },
    ] },
    // Source hrefs: ../Detail/1 and ../Detail/6 (absolutized to the
    // progressindicators subdomain — no exemplar pages exist for those
    // topics); the Functioning Habitat Vital Sign
    // (vitalsigns.../VitalSignGoal/Detail/7) is remapped to the built goal
    // page — goals.ts maps Detail/7 → 'functioning-habitat'. Source's
    // target="_blank" dropped: internal-class hosts stay in the same tab.
    { kind: 'paragraph', segments: [
      { type: 'text', text: 'To learn more about land cover change, see the ' },
      { type: 'link', link: { kind: 'external', text: 'Smart Growth', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/1' } },
      { type: 'text', text: ' Progress Indicators, ' },
      { type: 'link', link: { kind: 'external', text: 'Habitat Acquisition and Restoration', href: 'https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/6' } },
      { type: 'text', text: ' Progress Indicators, Forestland Conversion Progress Indicators (to be developed), and the ' },
      { type: 'link', link: { kind: 'internal', text: 'Functioning Habitat Vital Sign', route: '/prototypes/goals/functioning-habitat' } },
      { type: 'text', text: '.' },
    ] },
  ],
  // #description — left column, unheaded.
  description: [
    { kind: 'paragraph', segments: [
      { type: 'text', text: 'We evaluate trends in agricultural land protection by measuring farmland protected through conservation easements across Puget Sound. Accelerating the rate of farmland protection is consistent with our ecosystem recovery goals.' },
    ] },
    { kind: 'paragraph', segments: [
      { type: 'text', text: 'The ' },
      { type: 'text', text: 'Farmland Protection Progress Indicator', strong: true },
    ] },
    { kind: 'bullets', items: [
      [{ type: 'text', text: 'measures the amount of farmland acres permanently protected by conservation easements,' }],
      [{ type: 'text', text: 'provides detail on what zoning categories protected farmland are located within, and' }],
      [{ type: 'text', text: 'provides detail on where protected farmland is located relative to urban areas.' }],
    ] },
    { kind: 'paragraph', segments: [
      { type: 'text', text: 'This indicator displays change at the Puget Sound region-scale and the county-scale. We are also developing a metric to measure progress slowing the conversion of farmland to more developed uses.' },
    ] },
    { kind: 'paragraph', segments: [
      { type: 'text', text: 'Select the Progress Indicator in the table below to learn more.' },
    ] },
  ],
  treeHeading: 'Progress Indicators',
  // Source's embedded Fancytree JSON (treeSources), verbatim names + status
  // vocabulary. Root row self-links (/Topic/Detail/2 → this page's route).
  tree: {
    topic: 'Agricultural Land Protection',
    route: '/prototypes/progress-indicators/topic-2',
    indicators: [
      { name: 'Farmland conversion', href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/181', progress: 'Indicator To Be Developed', targetStatus: 'Limited Data' },
      { name: 'Farmland protection', href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/182', progress: 'Getting Worse', targetStatus: null },
    ],
  },
  // The QA source's #embeddedContent iframe (a placeholder YouTube video) is
  // NOT carried — cut by revision direction 2026-07-23; see the contract.
  narrativeSections: [
    {
      heading: 'Key Results',
      blocks: [
        { kind: 'paragraph', segments: [
          { type: 'text', text: 'The amount of farmland that has been protected is substantial, but protection rates have slowed since 2014.', strong: true },
        ] },
        { kind: 'bullets', items: [
          [{ type: 'text', text: '55,364 acres of farmland have been protected with conservation easements across all years. 14,462 acres (26 percent of the total) were protected between 2014 through 2023.' }],
          [
            { type: 'text', text: 'In 2022 through 2023, the region protected ' },
            { type: 'text', text: '811', strong: true },
            { type: 'text', text: ' fewer', strong: true },
            { type: 'text', text: ' acres of farmland through easements than the previous reporting period (2020-2021).' },
          ],
          [{ type: 'text', text: 'While conservation easements restrict development, they do not ensure that the land will remain actively farmed. It is important to support services that help farms stay profitable in addition to programs that enroll farmlands in protective easements.' }],
          [{ type: 'text', text: 'Despite protection efforts, the USDA Agricultural Census shows that roughly 36,800 acres of farmland were lost in Puget Sound counties between 2012 and 2022 [1].' }],
        ] },
        { kind: 'paragraph', segments: [
          { type: 'text', text: 'This indicator provides the recovery community with a summary of protection trends in farmlands over roughly the past decade. However, this indicator does not currently illustrate the social and economic factors that drive both farmland protection and loss. For example, some farmers may be nearing retirement with nobody in line to take over their business. Other farmers may struggle to farm productively with current water rights or challenging weather and climate events. Without assistance, farmers in these scenarios may have no other choice but to sell their land to developers.' },
        ] },
        { kind: 'paragraph', segments: [
          { type: 'text', text: 'This indicator also does not illustrate the intersection of habitat conservation, habitat restoration, and farming. In other words, we cannot yet explore how habitat restoration interacts with or limits farming.' },
        ] },
        { kind: 'paragraph', segments: [
          { type: 'text', text: 'Future work will explore these gaps to help improve our understanding of the factors impacting farmers in Puget Sound.' },
        ] },
      ],
    },
    {
      heading: 'What factors affect this Progress Indicator?',
      blocks: [
        { kind: 'paragraph', segments: [
          { type: 'text', text: 'Funding, staffing, and awareness of land conservation programs can affect how conservation easements are applied to farmlands.', strong: true, em: true },
        ] },
        { kind: 'bullets', items: [
          [{ type: 'text', text: 'Land conservation programs may be limited by funding and staffing to enact conservation easements and local landowners may not be aware of opportunities for land protection.' }],
        ] },
      ],
    },
    {
      heading: 'What other actions can we take?',
      blocks: [
        { kind: 'bullets', items: [
          [
            { type: 'text', text: 'Cities and counties can review farmlands and consider whether they meet agricultural designation criteria identified in ' },
            { type: 'link', link: { kind: 'external', text: 'RCW 36.70A.170', href: 'https://app.leg.wa.gov/RCW/default.aspx?cite=36.70A.170' } },
            { type: 'text', text: '. Appropriate land use designations can help protect farmland.' },
          ],
          [{ type: 'text', text: 'Farmland preservation programs should continue or expand technical assistance programs to support succession planning and the effective transfer of farmland to the next generation of farmers.' }],
          [{ type: 'text', text: 'Land trusts and other partners should explore ways to ensure that conservation easement agreements are supportive of landowner goals.' }],
          [{ type: 'text', text: 'Cities, counties, and regional councils should intentionally plan for agricultural and food system infrastructure to ensure farmers have access to services to process, distribute, and sell agricultural products.' }],
          [{ type: 'text', text: 'Regional and local partners should implement conservation-focused water use principles and long-range water supply plans (accounting for climate change) to maintain water availability for both wildlife and agricultural needs.' }],
          [{ type: 'text', text: 'Cities and counties can expand current use tax assessment and transfer and removal of development rights programs which incentivize farming and further protect land from conversion.' }],
        ] },
        { kind: 'paragraph', segments: [
          { type: 'text', text: 'Please also visit the ' },
          { type: 'link', link: { kind: 'external', text: 'Action Agenda strategy dedicated to Agricultural Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/06/Overview' } },
          { type: 'text', text: ' for more information.' },
        ] },
        { kind: 'paragraph', segments: [
          { type: 'text', text: '1. United States Department of Agriculture (2012, 2022). Census of Agriculture, National Agricultural Statistics Service, United States Department of Agriculture. ' },
          { type: 'text', text: 'Numbers sourced from Washington, County Data, Table 8, land in farms (acres); accessed via https://www.nass.usda.gov/AgCensus/.', em: true },
        ] },
      ],
    },
  ],
  partnersHeading: 'Contributing Partners',
  // Logos downloaded from /FileResource/DisplayResource/{guid} on the QA PI
  // host; org links normalized qa. → www.
  partners: [
    { name: 'American Farmland Trust', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/343', image: '/photos/pi/partners/american-farmland-trust.png', width: 267, height: 50 },
    { name: 'Blue Water GIS', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/559', image: '/photos/pi/partners/blue-water-gis.jpg', width: 152, height: 52 },
    { name: 'Rivershed SPC', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/553', image: '/photos/pi/partners/rivershed-spc.png', width: 512, height: 76 },
    { name: 'Washington State Conservation Commission', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/114', image: '/photos/pi/partners/wa-state-conservation-commission.jpg', width: 159, height: 150 },
    { name: 'Washington State Department of Agriculture', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/113', image: '/photos/pi/partners/wa-state-department-of-agriculture.png', width: 1760, height: 724 },
  ],
  aaTopicsHeading: 'Action Agenda Topics',
  // Source sidebar card (aa2026-topic-card). Image is the SAME Action Agenda
  // Topic 06 photo the action-agenda unit already downloaded — reused, not
  // re-fetched. Href normalized qa-actionagenda. → actionagenda. (no AA
  // Topic 06 page exists in this prototype — only Topic 05 was built).
  aaTopicCard: { label: 'TOPIC 06', title: 'Agricultural Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/06/Overview', image: '/photos/action-agenda/topic-06.jpg' },
  lastUpdatedHeading: 'Last Updated',
  lastUpdated: '7/14/2026 11:37 AM',
};

// ── Gaps: content this file does NOT include, and why ──────────────────────
// See src/data/contracts/progress-indicators.md for the full accounting:
// prod chrome (navbar, Explore mega-menu, breadcrumb, Request Support/Log in,
// funding + partnership footer) is out of scope; grid header field-definition
// help-icon popups are server-backed dialogs with no content in the snapshot;
// prod's rowSelection:'multiple' (no visible selection UI) is dropped.
