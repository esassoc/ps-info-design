// action-agenda.ts — REAL content for the 2026–2030 Action Agenda Explorer
// landing page (https://actionagenda.pugetsoundinfo.wa.gov/2026-2030),
// fetched 2026-07-17. Directed reproduction: every string below is verbatim
// or a verbatim excerpt from the live page — nothing paraphrased or invented.
//
// SCOPE NOTE: this is the landing page only. Each Topic's own Strategies,
// Actions, Commitments, Vital Signs, and long-form Overview text live on that
// Topic's separate `/2026-2030/Topic/{id}/Overview` subpage — a different
// URL, out of scope for this contract — and are intentionally not carried
// here. Likewise the "how it's organized" / "how progress is measured" prose
// lives on the separate `/2026-2030/About` page, not this one.

/** One inline text run; `bold` mirrors the source's own <strong>/<b> markup. */
export interface ProseSegment {
  text: string;
  bold?: boolean;
}
/** One paragraph, as an ordered list of inline segments. */
export type ProseParagraph = ProseSegment[];

export interface ActionAgendaTopic {
  id: string;
  /** the card's small "TOPIC {n}" badge text, e.g. "TOPIC 01", "TOPIC A" */
  label: string;
  title: string;
  /** public/ path of the topic's real cover photo (430×260, the source's own GetFileResourceResized crop) */
  image: string;
  /** real Action Agenda Explorer Overview URL for this topic — root-relative for Topic 05 (routes internally to the exemplar), prod-absolute for every other topic */
  href: string;
  /** prod's own data-vital-sign-ids for this card — numeric Vital Sign option values (see VITAL_SIGN_OPTIONS). Empty for Topics A–F (Foundations of Recovery), matching prod. */
  vitalSignIds: number[];
}

export interface ActionAgendaVitalSignOption {
  label: string;
  value: string;
}

/** One category dropdown in the topic-categories nav; topicIds index into TOPICS. */
export interface AaTopicsNavCategory {
  label: string;
  topicIds: string[];
}

// ── Prod page chrome — the aa2026-outcomes-nav (5 category dropdowns → 26 topics).
// The prod page's OTHER navbar (aaExplorerNavbar, the site-wide Explore menu) is
// deliberately NOT modeled: the prototype's app shell rail already carries that
// site-level IA, so reproducing it in-page would duplicate navigation. Topic
// labels/hrefs derive from TOPICS by id (titles verified identical to the
// nav's own item text in the saved DOM).
export const TOPICS_NAV_ARIA_LABEL = 'Topic categories';
export const TOPICS_NAV: AaTopicsNavCategory[] = [
  { label: 'Healthy Communities', topicIds: ['01', '02', '03', '04'] },
  { label: 'Sustainable Land Use', topicIds: ['05', '06', '07'] },
  { label: 'Resilient Habitats', topicIds: ['08', '09', '10', '11', '12', '13', '14'] },
  { label: 'Clean Water and Harvestable Shellfish', topicIds: ['15', '16', '17', '18', '19', '20'] },
  { label: 'Foundations of Recovery', topicIds: ['A', 'B', 'C', 'D', 'E', 'F'] },
];

// ── Header (photo band) ─────────────────────────────────────────────────────
// Title text is the source's own `siteTitle` band, directly under its photo
// carousel (rendered all-caps there by the source's own CSS — not a content
// requirement). Photo is slide 1 of the source's 6-slide homepage carousel
// (#homepageCarousel): Olympic mountains, credit Randall Williams.
export const HEADER_TITLE = '2026-2030 Action Agenda Explorer';
export const HEADER_IMAGE = '/photos/action-agenda/olympic-mountains.jpg';
export const HEADER_IMAGE_CREDIT = 'Randall Williams';

// ── Section 1 — "Topics in the Action Agenda" ──────────────────────────────
export const SECTION_TITLE = 'Topics in the Action Agenda';

export const INTRO_PARAGRAPHS: ProseParagraph[] = [
  [
    { text: 'The ' },
    { text: 'Action Agenda Topics', bold: true },
    {
      text:
        ' are the building blocks of Puget Sound recovery, highlighting priority areas where partners across the region are already making progress—bringing expertise, innovation, and community leadership to the work. But much more remains to be done.',
    },
  ],
  [
    {
      text:
        'Each Topic outlines the essential Strategies and Actions needed to restore the health of Puget Sound, from long‑range approaches that guide regional direction (Strategies) to near‑term steps that drive immediate impact (Actions). The Actions help steer implementation, inspire new solutions, and focus public and private investment on the work that matters most right now.',
    },
  ],
  [
    {
      text:
        'Together, the Topics in the Action Agenda chart a clear path where sustained commitment and coordinated action turn our work into a legacy of lasting Puget Sound recovery.',
    },
  ],
];

// ── Section 2 — filter controls ─────────────────────────────────────────────
// Real, page-native controls that sit directly below the intro and directly
// above the grid they filter — not decorative. Vital Sign options and their
// order are verbatim from the source's filter dropdown.
export const FILTERS = {
  keywordLabel: 'Search Topic by Keyword',
  vitalSignLabel: 'Filter Topic by Vital Sign',
  clearLabel: 'Clear all Filters',
  noResultsMessage: 'There are no Topics matching your filter(s).',
};

export const VITAL_SIGN_OPTIONS: ActionAgendaVitalSignOption[] = [
  { label: 'Air Quality', value: '2' },
  { label: 'Beaches and Marine Vegetation', value: '31' },
  { label: 'Birds', value: '17' },
  { label: 'Cultural Wellbeing', value: '21' },
  { label: 'Drinking Water', value: '3' },
  { label: 'Economic Vitality', value: '22' },
  { label: 'Estuaries', value: '13' },
  { label: 'Forage Fish', value: '33' },
  { label: 'Forests and Wetlands', value: '30' },
  { label: 'Freshwater', value: '26' },
  { label: 'Good Governance', value: '23' },
  { label: 'Groundfish and Benthic Invertebrates', value: '34' },
  { label: 'Local Foods', value: '4' },
  { label: 'Marine Water', value: '27' },
  { label: 'Orcas', value: '19' },
  { label: 'Outdoor Activity', value: '6' },
  { label: 'Salmon', value: '32' },
  { label: 'Sense of Place', value: '24' },
  { label: 'Shellfish Beds', value: '7' },
  { label: 'Sound Stewardship', value: '25' },
  { label: 'Streams and Floodplains', value: '29' },
  { label: 'Toxics in Aquatic Life', value: '28' },
  { label: 'Zooplankton', value: '35' },
];

// ── Section 3 — the flat 26-card Topic grid, source order ──────────────────
const BASE = 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic';

export const TOPICS: ActionAgendaTopic[] = [
  { id: '01', label: 'TOPIC 01', title: 'Abundant and Harvestable Salmon', image: '/photos/action-agenda/topic-01.jpg', href: `${BASE}/01/Overview`, vitalSignIds: [4, 6, 19, 21, 32] },
  { id: '02', label: 'TOPIC 02', title: 'Human Health', image: '/photos/action-agenda/topic-02.jpg', href: `${BASE}/02/Overview`, vitalSignIds: [2, 3, 4, 6, 7, 21, 28] },
  { id: '03', label: 'TOPIC 03', title: 'Toxic Chemical Prevention', image: '/photos/action-agenda/topic-03.jpg', href: `${BASE}/03/Overview`, vitalSignIds: [2, 4, 6, 27, 28, 32, 33, 34] },
  { id: '04', label: 'TOPIC 04', title: 'Shared Landscapes', image: '/photos/action-agenda/topic-04.jpg', href: `${BASE}/04/Overview`, vitalSignIds: [4, 6, 21, 24, 25] },
  { id: '05', label: 'TOPIC 05', title: 'Smart Growth', image: '/photos/action-agenda/topic-05.jpg', href: '/prototypes/action-agenda/topic-05', vitalSignIds: [13, 24, 29, 30, 31] },
  { id: '06', label: 'TOPIC 06', title: 'Agricultural Land Protection', image: '/photos/action-agenda/topic-06.jpg', href: `${BASE}/06/Overview`, vitalSignIds: [4, 22, 24] },
  { id: '07', label: 'TOPIC 07', title: 'Working Forest Land Protection', image: '/photos/action-agenda/topic-07.jpg', href: `${BASE}/07/Overview`, vitalSignIds: [3, 6, 17, 22, 26, 30] },
  { id: '08', label: 'TOPIC 08', title: 'Marine Vegetation', image: '/photos/action-agenda/topic-08.jpg', href: `${BASE}/08/Overview`, vitalSignIds: [4, 6, 21, 25, 31, 32, 33, 34] },
  { id: '09', label: 'TOPIC 09', title: 'Healthy Shorelines', image: '/photos/action-agenda/topic-09.jpg', href: `${BASE}/09/Overview`, vitalSignIds: [13, 25, 31, 32, 33] },
  { id: '10', label: 'TOPIC 10', title: 'Floodplains and Estuaries', image: '/photos/action-agenda/topic-10.jpg', href: `${BASE}/10/Overview`, vitalSignIds: [13, 17, 26, 29, 32, 34] },
  { id: '11', label: 'TOPIC 11', title: 'Riparian Areas', image: '/photos/action-agenda/topic-11.jpg', href: `${BASE}/11/Overview`, vitalSignIds: [26, 29, 30, 31, 32] },
  { id: '12', label: 'TOPIC 12', title: 'Freshwater Availability', image: '/photos/action-agenda/topic-12.jpg', href: `${BASE}/12/Overview`, vitalSignIds: [3, 26, 29, 32] },
  { id: '13', label: 'TOPIC 13', title: 'Fish Passage Barriers', image: '/photos/action-agenda/topic-13.jpg', href: `${BASE}/13/Overview`, vitalSignIds: [13, 29, 31, 32] },
  { id: '14', label: 'TOPIC 14', title: 'Invasive Species', image: '/photos/action-agenda/topic-14.jpg', href: `${BASE}/14/Overview`, vitalSignIds: [4, 22, 25, 29, 30, 31, 34] },
  { id: '15', label: 'TOPIC 15', title: 'Stormwater Runoff', image: '/photos/action-agenda/topic-15.jpg', href: `${BASE}/15/Overview`, vitalSignIds: [3, 6, 26, 27, 28, 32] },
  { id: '16', label: 'TOPIC 16', title: 'Agricultural Lands Runoff', image: '/photos/action-agenda/topic-16.jpg', href: `${BASE}/16/Overview`, vitalSignIds: [3, 7, 26, 27, 28] },
  { id: '17', label: 'TOPIC 17', title: 'Forest Roads Runoff', image: '/photos/action-agenda/topic-17.jpg', href: `${BASE}/17/Overview`, vitalSignIds: [3, 26, 30] },
  { id: '18', label: 'TOPIC 18', title: 'Fecal Pollution', image: '/photos/action-agenda/topic-18.jpg', href: `${BASE}/18/Overview`, vitalSignIds: [3, 4, 6, 7, 26, 27, 28] },
  { id: '19', label: 'TOPIC 19', title: 'Wastewater Treatment Plants', image: '/photos/action-agenda/topic-19.jpg', href: `${BASE}/19/Overview`, vitalSignIds: [4, 6, 7, 27, 28] },
  { id: '20', label: 'TOPIC 20', title: 'Vessel Impacts', image: '/photos/action-agenda/topic-20.jpg', href: `${BASE}/20/Overview`, vitalSignIds: [7, 17, 19, 25, 27, 31, 32, 33] },
  { id: 'A', label: 'TOPIC A', title: 'Funding', image: '/photos/action-agenda/topic-a.jpg', href: `${BASE}/A/Overview`, vitalSignIds: [] },
  { id: 'B', label: 'TOPIC B', title: 'Research and Monitoring', image: '/photos/action-agenda/topic-b.jpg', href: `${BASE}/B/Overview`, vitalSignIds: [] },
  { id: 'C', label: 'TOPIC C', title: 'Good Governance', image: '/photos/action-agenda/topic-c.jpg', href: `${BASE}/C/Overview`, vitalSignIds: [] },
  { id: 'D', label: 'TOPIC D', title: 'Strategic Leadership and Collaboration', image: '/photos/action-agenda/topic-d.jpg', href: `${BASE}/D/Overview`, vitalSignIds: [] },
  { id: 'E', label: 'TOPIC E', title: 'Workforce Development', image: '/photos/action-agenda/topic-e.jpg', href: `${BASE}/E/Overview`, vitalSignIds: [] },
  { id: 'F', label: 'TOPIC F', title: 'Outreach and Behavior Change', image: '/photos/action-agenda/topic-f.jpg', href: `${BASE}/F/Overview`, vitalSignIds: [] },
];

// ── Section 4 — the Explorer description band ──────────────────────────────
export const EXPLORER_DESCRIPTION: ProseParagraph = [
  { text: 'The ' },
  { text: 'Action Agenda Explorer', bold: true },
  {
    text:
      ' is the companion digital tool that keeps the Action Agenda dynamic and our reporting up to date. It profiles each of the 26 Topics in the 2026–2030 Action Agenda, offering a digital plan overview in the ',
  },
  { text: 'Overview', bold: true },
  { text: ' tab, locally developed priorities in ' },
  { text: 'Local Action Plans', bold: true },
  { text: ' (when available), current implementation activities in the ' },
  { text: 'Implementation', bold: true },
  { text: ' tab, and results from our efforts in the ' },
  { text: 'Progress', bold: true },
  {
    text:
      ' tab. The Explorer makes it easy and interactive to see how work is unfolding across the region and how partners are advancing Puget Sound recovery.',
  },
];

export const EXPLORER_CTA = {
  label: 'Read more about the Action Agenda Explorer',
  href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/About',
};

// ─────────────────────────────────────────────────────────────────────────
// Topic 05 exemplar (Smart Growth) — verbatim from the three saved tab DOMs:
//   https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Overview
//   https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Implementation
//   https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/05/Progress
// Fetched 2026-07-22. Every string below is verbatim or a verbatim excerpt
// from the saved DOMs — nothing paraphrased or invented. NO TRUNCATION
// ANYWHERE: all 73 commitments, all 19 Ongoing Programs / 20 NEP Activities /
// 40 Legislative Bills, all 4 strategies / 36 actions, and all 10 indicators
// are carried in full (see src/data/contracts/action-agenda.md, Addendum
// 2026-07-22, for the complete inventory and the handful of honest-downgrade
// notes — interactive Google charts → prod's own chart images / accessible
// tables, prod h5 list headings normalized to h3, etc.).
// ─────────────────────────────────────────────────────────────────────────

export interface TopicProseSegment { text: string; bold?: boolean; href?: string }
export type TopicProseParagraph = TopicProseSegment[];
export interface AaTopicContentsItem { label: string; href: string; sub?: boolean }
export interface AaTopicAction { code: string; text: string }
export interface AaTopicStrategy { code: string; text: string; actions: AaTopicAction[] }
export interface AaTopicVitalSignLink { label: string; href: string }
export type AaTrendLabel = 'Getting Better' | 'Getting Worse' | 'No Trend' | 'Limited Data' | 'Indicator To Be Developed';
export type AaTopicIndicatorChart =
  | { kind: 'image'; src: string }
  | { kind: 'columns'; title: string; hAxisTitle: string; vAxisTitle?: string; series: string[]; rows: { label: string; values: number[] }[] }
  | { kind: 'none' };
export interface AaTopicIndicator {
  name: string;
  source: 'vital-signs' | 'progress-indicators';
  href: string;
  linkLabel: string;
  description: string;
  trend: AaTrendLabel;
  targetStatus?: 'Limited Data';
  chart: AaTopicIndicatorChart;
}
export interface AaTopicCommitment { organization: string; text: string }
export interface AaActivityTypeRef { label: string; href: string }
export interface AaOngoingProgram {
  org: string; title: string; href: string;
  activityTypes: AaActivityTypeRef[]; topicIds: string[]; websiteHref?: string;
}
export interface AaNepActivity {
  org: string; orgHref: string; title: string; href: string;
  award: { label: string; href: string };
  activityTypes: AaActivityTypeRef[]; topicIds: string[];
  startYear: string; stage: 'Implementation' | 'Completed'; websiteHref?: string;
}
export interface AaLegislativeBill {
  pretitle: string; title: string; status: 'Passed' | 'Did not pass';
  activityTypes: AaActivityTypeRef[]; topicIds: string[];
  link: { label: string; href: string };
}
export interface AaFinancialBiennium {
  label: string;
  state: number | null; stateLabel: string;
  federal: number | null; federalLabel: string;
  privateLocal: number | null; privateLocalLabel: string;
}

export const AA_TOPIC05_HEADER = {
  badge: 'TOPIC 5',
  title: 'Smart Growth',
  category: 'SUSTAINABLE LAND USE',
  aboutLabel: 'About the Action Agenda Explorer',
  aboutHref: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/About',
  coverImage: '/photos/action-agenda/topic-05-cover.jpg',
};

export const AA_TOPIC05_TABS = ['Overview', 'Implementation', 'Progress'] as const;

/** Overview tab's in-card sidebar photo — prod's own img alt, local cover asset. */
export const AA_TOPIC05_OVERVIEW_PHOTO = {
  src: '/photos/action-agenda/topic-05.jpg',
  alt: 'Cover photo for Smart Growth', // verbatim prod alt (Overview DOM)
};

/** Info callout after the Commitments show-more button. Verbatim from the
 * Progress DOM's aa2026ProgressLegend; Andrew's markup places it on the
 * Overview tab too (prod Overview has no callout — recorded in the contract). */
export const AA_TOPIC05_COMMITMENTS_CALLOUT: TopicProseParagraph = [
  { text: 'Reporting for Commitments starts in June 2026 and data will be updated once processed.' },
];

/** Info callout after the Progress tab's Indicators table. Verbatim from the
 * Progress DOM's aa2026ProgressLegend (incl. its own <strong> runs). */
export const AA_TOPIC05_INDICATORS_LEGEND: TopicProseParagraph = [
  { text: 'Each indicator is evaluated for ' },
  { text: 'trend', bold: true },
  { text: " (e.g., 'getting better', 'getting worse', etc.). Some indicators also have targets and are evaluated for " },
  { text: 'target status', bold: true },
  { text: ' (whether we have met those targets).' },
];

export const AA_TOPIC05_OVERVIEW_CONTENTS: AaTopicContentsItem[] = [
  { label: '(Top)', href: '#main-content' },
  { label: 'Overview', href: '#overview' },
  { label: 'Strategies and Actions', href: '#strategies' },
  { label: "What We're Tracking", href: '#whatWereTracking' },
  { label: 'Commitments', href: '#commitments', sub: true },
  { label: 'Indicators', href: '#indicators', sub: true },
];
export const AA_TOPIC05_PROGRESS_CONTENTS: AaTopicContentsItem[] = [
  { label: '(Top)', href: '#main-content' },
  { label: 'Progress Overview', href: '#progressOverview' },
  { label: 'Financial Investments', href: '#financialInvestments' },
  { label: 'Indicators', href: '#pugetSoundIndicators' },
  { label: 'Commitments', href: '#progress-commitments' },
];

export const AA_TOPIC05_VITAL_SIGNS_LABEL = 'VITAL SIGNS';
export const AA_TOPIC05_VITAL_SIGNS: AaTopicVitalSignLink[] = [
  { label: 'Beaches and Marine Vegetation', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/31' },
  { label: 'Estuaries', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/13' },
  { label: 'Forests and Wetlands', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/30' },
  { label: 'Sense of Place', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/24' },
  { label: 'Streams and Floodplains', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/29' },
];

export const AA_TOPIC05_TRACKING_INTRO: TopicProseParagraph = [
  { text: 'The Partnership uses a system of indicators and targets to monitor our progress implementing regional priorities and movement towards Puget Sound recovery goals. ' },
  { text: 'Commitments', bold: true },
  { text: ' describe activities that partners and the Partnership pledge to pursue over the next four years to implement the Action Agenda and/or the Salmon Recovery Plan. ' },
  { text: 'Progress Indicators', bold: true },
  { text: ' track human activities that impact ecosystem health. ' },
  { text: 'Vital Sign Indicators', bold: true },
  { text: ' track the status and trends of ecosystem conditions, including human health and quality of life.' },
];
export const AA_TOPIC05_COMMITMENTS_INTRO: TopicProseParagraph = [
  { text: 'Commitments', bold: true },
  { text: ' describe activities that partners and the Partnership pledge to pursue over the next four years to implement the Action Agenda and/or the Salmon Recovery Plan.' },
];
export const AA_TOPIC05_INDICATORS_INTRO: TopicProseParagraph = [
  { text: "Indicators are one or more metrics that we track consistently over time with repeatable methods. Indicators help us understand key dynamics of interest to tell the story of short-, medium-, and long-term changes in human activities and ecosystem conditions in Puget Sound. Each indicator is evaluated for " },
  { text: 'trend', bold: true },
  { text: " (e.g., 'getting better', 'getting worse', etc.). Some indicators also have targets and are evaluated for " },
  { text: 'target status', bold: true },
  { text: ' (whether we have met those targets).' },
];
export const AA_TOPIC05_IMPLEMENTATION_INTRO =
  'Implementation of the Action Agenda happens through the contributions of hundreds of partners via the day-to-day work of ongoing programs, funded projects and legislative policy changes. The Partnership tracks some of these implementation efforts for each Topic.';
export const AA_TOPIC05_PROGRESS_INTRO =
  'The Partnership uses a system of indicators and targets to monitor our progress implementing regional priorities and movement towards Puget Sound recovery goals. We also monitor the budgets of key state and federal programs to understand where money comes from, where it goes, and where gaps might exist.';
export const AA_TOPIC05_FINANCIAL_INTRO =
  "Partners at all levels contribute to funding Puget Sound recovery, including governments, not-for-profits, businesses and many others. A measurable portion of this investment is made through Washington state agencies' Ongoing Programs. Their funding comes from three sources listed below.";
export const AA_TOPIC05_FINANCIAL_QUESTION =
  'How much have state agency (ongoing) programs invested in "Smart Growth" in Puget Sound?';
export const AA_TOPIC05_FINANCIAL_NOTE = 'This chart reflects funding for 12 programs';
export const AA_TOPIC05_FINANCIAL_SERIES = [
  { label: 'State', color: '#3366cc' },
  { label: 'Federal', color: '#dc3912' },
  { label: 'Private/Local', color: '#ff9900' },
];
export const AA_TOPIC05_FINANCIAL_DATA: AaFinancialBiennium[] = [
  { label: '2015–2017', state: 4.817, stateLabel: '$4.8M', federal: 16.075, federalLabel: '$16.1M', privateLocal: null, privateLocalLabel: '$0M' },
  { label: '2017–2019', state: 4.384, stateLabel: '$4.4M', federal: 19.626, federalLabel: '$19.6M', privateLocal: null, privateLocalLabel: '$0M' },
  { label: '2019–2021', state: 16.127, stateLabel: '$16.1M', federal: 23.458, federalLabel: '$23.5M', privateLocal: 0.235, privateLocalLabel: '$235K' },
  { label: '2021–2023', state: 29.179, stateLabel: '$29.2M', federal: 35.381, federalLabel: '$35.4M', privateLocal: 0.612, privateLocalLabel: '$612K' },
  { label: '2023–2025', state: 46.12, stateLabel: '$46.1M', federal: 24.536, federalLabel: '$24.5M', privateLocal: 0.728, privateLocalLabel: '$728K' },
];
export const AA_TOPIC05_PROGRESS_INDICATORS_INTRO =
  'Indicators are one or more metrics that we track consistently over time with repeatable methods. Indicators help us understand key dynamics of interest to tell the story of short-, medium-, and long-term changes in human activities and ecosystem conditions in Puget Sound.';
export const AA_TOPIC05_PROGRESS_COMMITMENTS_INTRO: TopicProseParagraph = [
  { text: 'Commitments', bold: true },
  { text: " describe activities that partners and the Partnership pledge to pursue over the next four years to implement the Action Agenda and/or the Salmon Recovery Plan. Some state agencies' Ongoing Programs have committed to reach specific " },
  { text: 'targets', bold: true },
  { text: '. The Partnership tracks implementation progress of Commitments annually.' },
];
export const AA_TOPIC05_FINANCIAL_FOOTNOTES: TopicProseParagraph[] = [
  [{ text: 'Estimated funding by state agency Puget Sound recovery-related ongoing programs authorized in the operating, capital and transportation budgets, per biennium. Data source: state agencies.' }],
  [{ text: 'State:', bold: true }, { text: ' Estimated investments using revenue from taxes, fees, and other revenues collected by the state government.' }],
  [{ text: 'Federal:', bold: true }, { text: ' Estimated investments using funding passed through from the federal government.' }],
  [{ text: 'Private/Local:', bold: true }, { text: ' Estimated investments using funding received by the state government from private individuals, local governments, commercial enterprises, or foundations.' }],
];

export const AA_TOPIC05_OVERVIEW_PARAGRAPHS: TopicProseParagraph[] = [
  [
    { text: 'Forested lands and agricultural areas, along with natural areas, play a significant role in keeping Puget Sound healthy. These lands absorb water, support wildlife, and provide food, jobs, and places for people to connect with nature. They also serve as scenic backdrops and shape our communities’ sense of place and identity.' },
  ],
  [
    { text: 'As the population grows throughout Puget Sound, these natural and working lands are at risk as development pressure converts undeveloped lands into buildings and roads, disrupting water flow and eliminating habitat. With the region expected to grow by 1.7 million new residents by 2050, it is essential to balance affordable development and infrastructure improvements with the protection of working lands, natural areas, and culturally valued lands. This will welcome new residents and offer a greater sense of place for everyone while protecting our natural systems.' },
  ],
  [
    { text: 'The Strategies in the Smart Growth Topic aim to direct population growth into urban growth areas (UGAs) that are already set up for new development. This will reduce pressure on existing working lands and undeveloped, ecologically important lands. This will also reduce our reliance on single-person vehicles, promote the use of public transit and other transportation options, and lower vehicle emissions.' },
  ],
  [
    { text: 'Dense communities still need trees, parks, and green spaces to provide protection from droughts, heat waves, and to manage stormwater. Protecting urban green spaces and open areas stores carbon and supports long-term resilience to changing conditions on the landscape.' },
  ],
  [
    { text: 'To achieve smart growth, we need strong collaboration across sectors and communities, including transportation authorities, housing agencies, local governments, builders, community organizations, cultural centers, and representatives from under-represented or impacted communities. It is also important to make sure that growth strategies reflect what people want and need, as public opinion is key to successful implementation.' },
  ],
  [
    { text: 'Affordability is a primary reason that less developed areas are attractive to developers. Because of this, we must improve incentives and regulations that promote responsible and affordable in-fill development (development within cities and urban communities).' },
  ],
  [
    { text: 'This includes updating local land use plans and the state’s Growth Management Act (GMA) to better protect natural lands and make it easier to build responsibly in the right places. Creating incentives for development in city centers can also help meet market demands while directing growth away from working lands and ecologically important lands that we need to protect. Additional Strategies that focus on planning for human infrastructure that protects ecosystem functions are addressed under the Action Agenda Topics for ' },
    { text: 'Stormwater Runoff', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/15/Overview' },
    { text: ', ' },
    { text: 'Agriculture Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/06/Overview' },
    { text: ', ' },
    { text: 'Working Forest Land Protection', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/07/Overview' },
    { text: ', and ' },
    { text: 'Healthy Shorelines', href: 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic/09/Overview' },
    { text: '.' },
  ],
];

export const AA_TOPIC05_STRATEGIES: AaTopicStrategy[] = [
  {
    code: '05.01.',
    text: 'Improve the Growth Management Act (GMA) and local land use planning to effectively channel growth and prevent conversion of ecologically important lands.',
    actions: [
      { code: '05.01.01.', text: 'Support local governments with capacity, training, and guidance to improve the implementation of comprehensive plans, shoreline master programs, surface water management, and Critical Areas regulations.' },
      { code: '05.01.02.', text: 'Incorporate salmon recovery plans, habitat connectivity goals, and watershed ecosystem functions into the GMA, regional infrastructure plans, and local land use plans.' },
      { code: '05.01.03.', text: 'Involve Tribes in mapping ecologically important lands to establish a baseline, so that ecological improvements can be applied and measured.' },
      { code: '05.01.04.', text: 'Fund programs for effectiveness monitoring of land use regulations. Programs should identify policies, rules, compliance, and other potential legislative/institutional barriers that need improvement.' },
      { code: '05.01.05.', text: 'Compile, promote, distribute, and support the use of the best available science, including high resolution spatial data, and make it available and accessible to local governments and other organizations.' },
      { code: '05.01.06.', text: 'Review existing permit support tools to identify gaps about the risks and hazards of developing in areas that are vulnerable to sea level rise, flooding, and wildfires; address gaps and distribute related resources. Develop permit support tools and clear communication about the risks, hazards, and SMA guidelines regarding siting new development in areas that are vulnerable to sea level rise, flooding, and wildfire.' },
    ],
  },
  {
    code: '05.02.',
    text: 'Build Puget Sound-wide support to prevent conversion of forests, farms, shorelines, and natural areas and increase funding for protection incentives.',
    actions: [
      { code: '05.02.01.', text: 'Engage and educate the public and decision makers on opportunities to direct growth away from ecologically important areas.' },
      { code: '05.02.02.', text: 'Permanently protect habitats with high ecological value, and working lands, through transfer of development rights, conservation easements, and fee simple acquisitions.' },
      { code: '05.02.03.', text: 'Increase the participation in and access to transfer of development rights and the Landscape Conservation and Local Infrastructure Program (LCLIP) receiving areas across Puget Sound.' },
      { code: '05.02.04.', text: 'Use basin-scale modeling to help local and regional decision makers understand the environmental impacts of development in different areas.' },
      { code: '05.02.05.', text: 'Develop an understanding of the socioeconomic costs, benefits, and tradeoffs of development across different areas, along with the effects on impacted populations.' },
      { code: '05.02.06.', text: 'Co-create a vision of natural lands stewardship for the 21st century.' },
      { code: '05.02.07.', text: 'Review economic and administrative measures and local water availability for opportunities to limit growth in ecologically important lands.' },
      { code: '05.02.08.', text: 'Incentivize demand for growth in city centers with an emphasis on public transportation.' },
      { code: '05.02.09.', text: 'Provide potential buyers with accurate information about critical areas, encumbrances, and other land use restrictions so they are informed of land development limitations prior to purchase.' },
      { code: '05.02.10.', text: 'Identify important natural and cultural rural areas. Support public ownership or open space benefit taxation programs to protect these places.' },
      { code: '05.02.11.', text: 'Increase access to recreation areas by public transit, walking, and biking to support public health, recreation, cultural value, and connection to natural areas.' },
      { code: '05.02.12.', text: 'Develop and implement guidance that protects existing tree canopy, accessible green space, and functional habitats.' },
      { code: '05.02.13.', text: 'Incentivize the incorporation of native habitat in public spaces such as parks, schools, and roadsides.' },
    ],
  },
  {
    code: '05.03.',
    text: 'Increase demand for and reduce barriers to infill and redevelopment in high-growth areas.',
    actions: [
      { code: '05.03.01.', text: 'Reduce regulatory barriers to infill development outside of riparian zones or other ecologically critical areas by improving planning and zoning within UGAs.' },
      { code: '05.03.02.', text: 'Improve the desirability of living in high-growth areas by increasing access to amenities, services, and affordable housing.' },
      { code: '05.03.03.', text: 'Ensure effective and consistent regulations to encourage development in preferred high-growth areas.' },
      { code: '05.03.04.', text: 'Engage low-income communities and those vulnerable to gentrification in the co-development and decision-making of smart growth and development plans, anti-displacement policies, affordable housing initiatives, and urban forest restoration and management efforts.' },
      { code: '05.03.05.', text: 'Incentivize redevelopment in residential and mixed-use areas that lack effective stormwater management.' },
      { code: '05.03.06.', text: 'Develop guidance and provide financial support to protect existing urban tree canopy and increase tree canopy in areas with low tree canopy cover.' },
      { code: '05.03.07.', text: 'Provide financial support for infrastructure improvements (both grey and green) to accommodate infill and redevelopment in preferred high-growth areas.' },
    ],
  },
  {
    code: '05.04.',
    text: 'Conduct watershed-scale and land use planning to protect and restore water quality and habitat.',
    actions: [
      { code: '05.04.01.', text: 'Incentivize planning coordination on growth, water resources, and water quality between Tribal governments, state agencies, and local departments and jurisdictions. Provide guidance, training, funding, and capacity support for jurisdictions to align goals and outcomes and participate in ongoing collaborative processes.' },
      { code: '05.04.02.', text: 'Develop flexible regional funding approaches for mitigation that crosses jurisdictional boundaries.' },
      { code: '05.04.03.', text: 'Publicly recognize successful collaborations in local, regional, and national forums.' },
      { code: '05.04.04.', text: 'Integrate planning processes at the watershed scale by identifying and prioritizing shared goals and co-benefits across jurisdictions and planning domains, including land use, stormwater, transportation, parks, wastewater, and others.' },
      { code: '05.04.05.', text: 'Support integrated and timely interventions in planning processes to address environmental priorities and identify multi-benefit opportunities (for example, early LIO and/or LE review of Capital Improvement Plans, feasibility assessments, and/or initial project designs). Provide more opportunities for Tribal consultation and local engagement in these processes.' },
      { code: '05.04.06.', text: 'Consider multiple human and environmental priorities when developing plans. This includes increasing ecological resilience to changing environmental conditions, legal requirements, salmon recovery efforts, and current disparities impacting low-income communities and those affected by environmental degradation.' },
      { code: '05.04.07.', text: 'Identify and fund models to distribute financial resources across jurisdictional boundaries to support watershed-scale water quality, water resources, and habitat goals (such as Community-Based Public Private Partnerships, stormwater control transfers, memorandums of understanding, watershed outcomes banking, or others).' },
      { code: '05.04.08.', text: 'Update and improve zoning ordinances and development codes across jurisdictions and watersheds to maintain and protect existing stream function, salmon populations, other water resources, and habitat connectivity from further impairment.' },
      { code: '05.04.09.', text: 'Conduct basin-scale modeling to help regional and local decision makers understand costs, benefits, and tradeoffs of development, with a focus on the effects on water quality, habitat function, and communities impacted by environmental degradation.' },
      { code: '05.04.10.', text: 'Accelerate retrofit planning and implementation, particularly for regional facilities in infill areas and transit hubs where significant development is expected. Planning processes should include funding for administrative capacity and evaluating site-specific opportunities for multiple benefits.' },
    ],
  },
];

export const AA_TOPIC05_INDICATORS: AaTopicIndicator[] = [
  {
    name: 'Drift cells in functional condition',
    source: 'vital-signs',
    href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/81',
    linkLabel: '(View in Vital Signs)',
    description: 'This indicator is under development and is proposed as a measure to integrate attributes of drift cell function including 1) armor and overwater structures in the sediment supply and deposition zones as well as the transport reach, (2) marine riparian vegetation cover, and (3) forage fish presence/absence.',
    trend: 'Indicator To Be Developed',
    chart: { kind: 'none' },
  },
  {
    name: 'Estuary area in functional condition',
    source: 'vital-signs',
    href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/65',
    linkLabel: '(View in Vital Signs)',
    description: 'This indicator measures the amount (acres and percent) of estuarine surface area in functional condition in Puget Sound’s 16 large river deltas. Estuary function is measured by the extent of connected tidal wetlands. Functional estuaries provide many ecosystem services and are critical to the recovery of the region’s salmon populations.',
    trend: 'Getting Better',
    chart: { kind: 'image', src: '/photos/action-agenda/charts/estuary-area.png' },
  },
  {
    name: 'Extent of forest cover in nearshore marine riparian areas',
    source: 'vital-signs',
    href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/64',
    linkLabel: '(View in Vital Signs)',
    description: 'This indicator measures the percent and acreage of forested cover (vegetation approximately 8 feet or taller) within defined riparian zones landward of the marine shoreline.',
    trend: 'Indicator To Be Developed',
    chart: { kind: 'none' },
  },
  {
    name: 'Feeder bluffs in functional condition',
    source: 'vital-signs',
    href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/63',
    linkLabel: '(View in Vital Signs)',
    description: 'This indicator measures the amount (length and percent) of Puget Sound feeder bluffs shorelines that are in functional or impaired condition (Figure 1). Feeder bluffs are eroding coastal bluffs that deliver the majority of sediment to maintain Puget Sound’s beaches and spits (Keuler 1988). Beaches and bluffs provide critical habitat for the region’s fish and wildlife, including spawning beaches for forage fish and rearing habitat for juvenile salmon. Shoreline armor is the main factor that impedes the functional of feeder bluffs (Johannessen and MacLennan 2007; MacDonald et al. 1994) and therefore the presence of armor along feeder bluff shores is used as a proxy to assess feeder bluff function in our region.',
    trend: 'No Trend',
    chart: { kind: 'image', src: '/photos/action-agenda/charts/feeder-bluffs.png' },
  },
  {
    name: 'Floodplain function in large and small river systems',
    source: 'vital-signs',
    href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/14',
    linkLabel: '(View in Vital Signs)',
    description: 'This indicator measures the amount (acres and percent) of floodplain area in functional condition in Puget Sound’s 17 major rivers. Floodplain function is assessed at a regional scale using river connectivity and land use and cover. Areas that have natural land cover and unrestricted river flow are expected to be the most functional and provide the most ecosystem services. Floodplain function is impaired in areas with non-natural land cover or restricted river flow due to constraints or barriers (for example, roads, railroads, and levees).',
    trend: 'Getting Better',
    chart: {
      kind: 'columns',
      title: 'Floodplain function in large and small river systems',
      hAxisTitle: 'Condition Category',
      vAxisTitle: 'Floodplain Area (Acres)',
      series: ['Baseline (2011)', 'Update (2021)'],
      rows: [
        { label: 'A - Connected Natural Land Cover', values: [158160, 166294] },
        { label: 'B - Connected Not Natural Land Cover', values: [60852, 56285] },
        { label: 'C - Disconnected Natural Land Cover', values: [55122, 57052] },
        { label: 'D - Disconnected Not Natural Land Cover', values: [168300, 163374] },
      ],
    },
  },
  {
    name: 'Housing diversity',
    source: 'progress-indicators',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/188',
    linkLabel: '(View in Data Center)',
    description: 'This indicator measures the percentage of total new housing production that is multi-unit (e.g., apartment buildings, condominiums, townhomes, etc.). Multi-unit housing types require less land area for each new unit than single-unit options, thus helping to conserve forest lands, open spaces, agricultural lands, and other natural ecosystems in Puget Sound. This indicator, measured at the city, town, and county level, can help local planners evaluate how their policies support a variety of housing options .',
    trend: 'Getting Better',
    chart: { kind: 'image', src: '/photos/action-agenda/charts/housing-diversity.png' },
  },
  {
    name: 'Infill development',
    source: 'progress-indicators',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/187',
    linkLabel: '(View in Data Center)',
    description: 'This indicator measures acres of new impervious surface area in residential zones per net new housing units built. Increasing housing units in areas with existing impervious surface, such as through new apartment buildings and other multi-unit housing, is an effective way to support population growth while protecting sensitive habitats. A lower value in this indicator suggests that more new housing was located in areas with existing impervious surfaces which can support the protection of sensitive habitats.',
    trend: 'Limited Data',
    chart: { kind: 'image', src: '/photos/action-agenda/charts/infill-development.png' },
  },
  {
    name: 'Number of accessible pocket estuaries and embayments',
    source: 'vital-signs',
    href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/77',
    linkLabel: '(View in Vital Signs)',
    description: 'This indicator measures the number of pocket estuaries and embayments that are accessible to juvenile salmon.',
    trend: 'Indicator To Be Developed',
    chart: { kind: 'none' },
  },
  {
    name: 'Sense of Place Index',
    source: 'vital-signs',
    href: 'https://vitalsigns.pugetsoundinfo.wa.gov/VitalSignIndicator/Detail/39',
    linkLabel: '(View in Vital Signs)',
    description: 'The Sense of Place Index measures the percent of residents who express a positive connection, a strong sense of stewardship, and a sense of pride about being from Puget Sound. This indicator will inform us about peoples’ emotional connection to Puget Sound.',
    trend: 'No Trend',
    chart: {
      kind: 'columns',
      title: 'Sense of Place Index',
      hAxisTitle: 'Survey Year',
      series: ['Sense of Place Index'],
      rows: [
        { label: '2018', values: [5.66] },
        { label: '2020', values: [5.57] },
        { label: '2022', values: [5.49] },
        { label: '2024', values: [5.61] },
      ],
    },
  },
  {
    name: 'Urban growth',
    source: 'progress-indicators',
    href: 'https://www.pugetsoundinfo.wa.gov/Indicator/Detail/186',
    linkLabel: '(View in Data Center)',
    description: 'This indicator tracks the percentage of total new housing growth located within urban growth areas. Prioritizing development in urban growth areas can help protect natural lands outside urban areas. This indicator is one way to assess progress channeling growth into urban growth areas.',
    trend: 'Getting Worse',
    targetStatus: 'Limited Data',
    chart: { kind: 'image', src: '/photos/action-agenda/charts/urban-growth.png' },
  },
];

export const AA_TOPIC05_COMMITMENTS: AaTopicCommitment[] = [
  { organization: 'Association of Washington Cities', text: 'Washington State Association of Counties (WSAC) and the Association of Washington Cities (AWC) will work with partners, coordinated groups, and Puget Sound Partnership (PSP) staff to identify where shared priorities exist and collaborate to advance them through 2027.' },
  { organization: 'Association of Washington Cities', text: 'Washington State Association of Counties (WSAC) and the Association of Washington Cities (AWC) will contribute local government perspectives to forums (e.g., ecological improvement work group, riparian task force) created to identify specific policy changes that improve land use and growth management laws and implementing regulations to support salmon recovery by the end of fiscal year 2027.' },
  { organization: 'Association of Washington Cities', text: 'Association of Washington Cities (AWC) and Washington State Association of Counties (WSAC) will work with Puget Sound Partnership (PSP) to consult with their relevant members to gather input on factors leading to land conversion within their jurisdictions through 2027.' },
  { organization: 'Association of Washington Cities', text: 'Association of Washington Cities (AWC) and Washington State Association of Counties (WSAC) will assist their relevant members with understanding the implementation of any policy changes related to integrating local salmon recovery plans into long-term planning through 2027.' },
  { organization: 'Association of Washington Cities', text: 'Association of Washington Cities (AWC) and Washington State Association of Counties (WSAC) will work with Puget Sound Partnership (PSP) to ensure their relevant members are aware of and consider using relevant salmon recovery information (e.g., state, regional and local salmon recovery plans, Commerce?s guidance related to critical areas, Fish and Wildlife?s priority habitats and species, Sound Choices Checklist, etc.) as it relates to habitat protection through 2027.' },
  { organization: 'Association of Washington Cities', text: 'Association of Washington Cities (AWC) and Washington State Association of Counties (WSAC) will provide opportunities for Puget Sound Partnership (PSP) to work with member jurisdictions to identify challenges with and improve local permit and code enforcement and compliance by providing education and resources, hosting forums, etc. through 2027.' },
  { organization: 'Association of Washington Cities', text: 'Association of Washington Cities (AWC) and Washington State Association of Counties (WSAC) will work with the Puget Sound Partnership (PSP) to share out and encourage the use of new tools to their members that are relevant to planning and salmon recovery through 2027.' },
  { organization: 'National Oceanic and Atmospheric Administration', text: 'National Oceanic and Atmospheric Administration (NOAA) and Environmental Protection Agency (EPA) will convene federal agencies, including Federal Highway Administration (FHWA), to partner with Washington State Department of Transportation (WSDOT), Washington State Department of Ecology (ECY), Washington Department of Fish and Wildlife (WDFW), and other agencies to proactively address stormwater pollution from the regional transportation system through 2026.' },
  { organization: 'Puget Sound Conservation Districts Caucus', text: 'Puget Sound Conservation Districts (PSCDs) will continue working with landowners/managers, communities, and partners to deliver and expand Green Infrastructure-aligned and Better Ground Trees for Resilience initiative-aligned services that improve air quality through tree canopy retention and enhancement, support reductions in outdoor burning through chipper day events and biochar kiln equipment rentals/loans, and improve water quality through Green Stormwater Infrastructure (GSI)/Stormwater/Pathogens/Nutrient reducing practices through 2030 and beyond.' },
  { organization: 'Puget Sound Conservation Districts Caucus', text: 'Puget Sound Conservation Districts (PSCDs) will continue working with landowners/managers and partners to support enrollment of land in current use and easement programs. Support includes providing letters of support for funding, implementing Natural Resources Conservation Service (NRCS) Regional Conservation Partnership Program (RCPP) projects, and delivering associated technical planning services. Some PSCD geographies will participate in the Bonneville Environmental Foundation Regional Carbon Collector program to enroll land in a long-term carbon storage registry.' },
  { organization: 'Puget Sound Conservation Districts Caucus', text: 'Puget Sound Conservation Districts (PSCDs) will continue working with landowners/managers, cities, and other partners to implement and construct bioswales and rain gardens in partnership through 2030 and beyond.' },
  { organization: 'Puget Sound Conservation Districts Caucus', text: 'Puget Sound Conservation Districts (PSCDs) will continue working with landowners/managers and other partners to increase land area under active stewardship through 2030 and beyond.' },
  { organization: 'Puget Sound Conservation Districts Caucus', text: 'Puget Sound Conservation Districts (PSCDs) will continue working with cities and communities to implement urban tree canopy enhancement programs and projects through 2030 and beyond.' },
  { organization: 'Puget Sound Conservation Districts Caucus', text: 'Puget Sound Conservation Districts (PSCDs) will continue working with residents and landowners/managers to plan and implement hedgerow projects through 2030 and beyond.' },
  { organization: 'Puget Sound Partnership', text: 'Puget Sound Partnership (PSP) will support the state legislature in identifying and making improvements to land use laws (Growth Management Act, Shoreline Management Act, etc.) and implementation resources through 2027.' },
  { organization: 'Puget Sound Partnership', text: 'Puget Sound Partnership (PSP) will prepare county summaries of related Progress Indicators (Urban Growth, Farmland Conversion, Forestland Conversion (if available)) to support analyses related to the drivers of continued conversion of natural resource lands through 2027.' },
  { organization: 'Puget Sound Partnership', text: 'Puget Sound Partnership (PSP) will map out the next comprehensive plan update cycle including engagement points during the process, review current comprehensive plans for if/how salmon recovery is included, and develop proposed language to integrate salmon recovery into the utilities and transportation elements.' },
  { organization: 'Puget Sound Partnership', text: 'Puget Sound Partnership (PSP) will advance support for and development of tools for sustainable local land and natural resource management across Puget Sound through 2027.' },
  { organization: 'Puget Sound Partnership', text: 'Puget Sound Partnership (PSP) will continue to invest in the next phase of the Future Scenarios project focusing on accessibility, relevance, and application of the data and findings through 2027.' },
  { organization: 'Puget Sound Partnership', text: 'Puget Sound Partnership (PSP) will conduct a needs assessment with local partners such as Local Integrating Organizations (LIO), Lead Entities (LE), and local planning staff to determine if new tools are needed, existing tools are missing features, or if there are connections to make at the local level to incorporate tools into their planning processes. This will begin with tools to support shoreline planning updates per the Shoreline Management Act (SMA) rule making aligned with Shoreline Master Plan (SMP) update timelines and can expand from there to other topic areas, through 2027 and beyond.' },
  { organization: 'Puget Sound Partnership', text: 'Ecosystem Coordination Board (ECB) will explore challenges regarding local government compliance and enforcement and develop recommendations for how to address them through 2027.' },
  { organization: 'Puget Sound Partnership', text: 'Ecosystem Coordination Board (ECB) will address land conversion pressures on critical areas and floodways by identifying and amplifying examples of incentives or protection measures around Puget Sound that have successfully disrupted or slowed land conversion through 2027.' },
  { organization: 'Puget Sound Partnership', text: 'Ecosystem Coordination Board (ECB) will explore options with state partners to provide support for critical area mapping and tracking through 2027.' },
  { organization: 'Puget Sound Partnership', text: 'Ecosystem Coordination Board (ECB) will engage and educate the public to encourage the protection and restoration of ecologically important areas through 2027.' },
  { organization: 'Puget Sound Partnership', text: 'Ecosystem Coordination Board (ECB) will explore and recommend new ways to distribute resources and tools for local governments by 2027.' },
  { organization: 'Puget Sound Partnership', text: 'Leadership Council (LC) will work with other Puget Sound Partnership (PSP) boards to identify specific policy changes that are needed to improve land use and growth management laws and implementing regulations by the end of fiscal year 2027.' },
  { organization: 'Puget Sound Partnership', text: 'Leadership Council (LC) will advocate for policy and funding needs, including recommendations from the Ecosystem Coordination Board (ECB) Land Use Subcommittee, to slow or limit land conversion through 2027.' },
  { organization: 'Puget Sound Partnership', text: 'Leadership Council (LC) will support forums around infrastructure/transportation/salmon topics to help de-silo by the end of fiscal year 2027.' },
  { organization: 'Puget Sound Partnership', text: 'Lead Entities will engage in the development (provide expertise, data, etc.) of decision-making tools for local governments through 2027.' },
  { organization: 'Puget Sound Partnership', text: 'Local Integrating Organization (LIO) Coordinators will consult with their respective Lead Entity to integrate local salmon recovery priorities into the LIO Action Plans, as applicable, through 2028.' },
  { organization: 'Puget Sound Partnership', text: 'Salmon Recovery Council (SRC) will consult with other Puget Sound Partnership (PSP) boards to identify specific policy changes that are needed to improve land use and growth management laws and implementing regulations as well as the state hydraulic code by the end of fiscal year 2027.' },
  { organization: 'Puget Sound Partnership', text: 'Salmon Recovery Council (SRC) will hold a forum that highlights a case study (to be determined) to identify implementable recommendations to minimize or avoid the impacts of drivers that enable land conversion for local governments to adopt by the end of fiscal year 2027.' },
  { organization: 'Puget Sound Partnership', text: 'Salmon Recovery Council (SRC) will hold forums around infrastructure/transportation/salmon topics to help de-silo by the end of fiscal year 2027.' },
  { organization: 'Puget Sound Regional Council', text: 'Puget Sound Regional Council (PSRC) will work with member jurisdictions to focus growth in urban areas, centers, and transit station areas and preserve resource lands and critical areas through 2027.' },
  { organization: 'U.S. Environmental Protection Agency', text: 'National Oceanic and Atmospheric Administration (NOAA) and Environmental Protection Agency (EPA) will convene federal agencies, including the Federal Highway Administration (FHWA), to partner with Washington State Department of Transportation (WSDOT), Washington State Department of Ecology (ECY), Washington Department of Fish and Wildlife (WDFW), and other agencies to proactively address stormwater pollution from the regional transportation system through 2026.' },
  { organization: 'Washington Conservation Action', text: 'Washington Conservation Action (WCA) will work alongside Washington Department of Fish and Wildlife (WDFW) on exploring and developing pilot programs and frameworks for expanding a net ecological gain framework from the current no net loss regulation through 2030.' },
  { organization: 'Washington Conservation Action', text: 'Washington Conservation Action (WCA) will work with Kitsap County on their Kitsap Natural Resource Asset Management Program and its partners outside the county government to identify overlapping priorities for floodplain restoration including the acquisition of important riparian and upland forest areas of watersheds through 2026.' },
  { organization: 'Washington Conservation Action', text: 'Washington Conservation Action (WCA) will begin partnering with other jurisdictions and state agencies on programs similar to Kitsap Natural Resource Asset Management Program to identify priority watersheds for floodplain restoration through land transfers and easements through 2030.' },
  { organization: 'Washington Conservation Action', text: 'Washington Conservation Action (WCA) will explore idea of net gain instead of no net loss for salmon habitat protection/restoration through 2030.' },
  { organization: 'Washington Conservation Action', text: 'Washington Conservation Action (WCA) will engage in meaningful rulemaking on shoreline and growth management acts through 2027.' },
  { organization: 'Washington Department of Fish and Wildlife', text: 'Washington Department of Fish and Wildlife (WDFW) will strive to develop and implement a statewide standard for how counties and cities establish and adaptively manage protective measures (Growth Management Act/Shoreline Management Act regulations) to meet statewide ecosystem service goals, with consideration for regional differences between eastern and western Washington by 2028.' },
  { organization: 'Washington Department of Fish and Wildlife', text: 'Washington Department of Fish and Wildlife (WDFW) will strive to provide recommendations in comment letters for all jurisdictions engaged in their Comprehensive Plan and Critical Area Ordinance updates in Puget Sound by 2027.' },
  { organization: 'Washington Department of Fish and Wildlife', text: 'Washington Department of Fish and Wildlife (WDFW) will encourage jurisdictions to specifically reference their local salmon recovery and watershed plans in their comprehensive plan. Overarching comprehensive plan policies filter into development regulations with potential improvements to fish and wildlife habitat conservation areas and increased riparian buffers through 2027.' },
  { organization: 'Washington Department of Fish and Wildlife', text: 'Washington Department of Fish and Wildlife (WDFW) will strive to provide web access to Riparian Data Engine through June 2026 and to Priority Habitats and Species information, existing High Resolution Change Detection data, and updated fish passage data on an ongoing basis.' },
  { organization: 'Washington Department of Fish and Wildlife', text: 'Washington Department of Fish and Wildlife (WDFW) will strive to participate in interagency coordination efforts to local communities to assist in climate change adaptation and resiliency through the 2025-2027 biennium.' },
  { organization: 'Washington Department of Fish and Wildlife', text: 'Washington Department of Fish and Wildlife (WDFW) and Washington State Department of Natural Resources (DNR) commit that Habitat Strategic Initiative Lead (HSIL) 2.0 will strive to share the findings of Industrial Economics? work that is connected to land conversion by June 2026 (pending contractor capacity to perform this work under the Puget Sound Partnership EPA Base Program IS Science Award).' },
  { organization: 'Washington Department of Fish and Wildlife', text: 'Washington Department of Fish and Wildlife (WDFW) and Washington State Department of Natural Resources (DNR) commit that Habitat Strategic Initiative Lead (HSIL) 2.0 will strive to amplify and share out the results of funded subawards addressing land use conversion, tools to reduce land use conversion, and capacity for advancing habitat protection and restoration efforts through June 2028.' },
  { organization: 'Washington Department of Fish and Wildlife', text: 'Washington Department of Fish and Wildlife (WDFW) and Washington State Department of Natural Resources (DNR) commit that Habitat Strategic Initiative Lead (HSIL) 2.0 will strive to work closely with land use planners and allied professionals to better connect the Puget Sound recovery goals to the land use planners in the region through June 2026.' },
  { organization: 'Washington Department of Fish and Wildlife', text: 'Washington Department of Fish and Wildlife and Washington State Department of Natural Resources commit that Habitat Strategic Initiative Lead (HSIL) 2.0 will strive to coordinate with Washington State Department of Commerce (COM) and the Stormwater Strategic Initiative Lead (SW SIL) to continue building a community of practice and idea/solution exchange for land use planners through June 2026.' },
  { organization: 'Washington State Association of Counties', text: 'Washington State Association of Counties (WSAC) and Association of Washington Cities (AWC) will work with partners, coordinated groups, and Puget Sound Partnership (PSP) staff to identify where shared priorities exist and collaborate to advance them through 2027.' },
  { organization: 'Washington State Association of Counties', text: 'Washington State Association of Counties (WSAC) and Association of Washington Cities (AWC) will contribute local government perspectives to forums (e.g., ecological improvement work group, riparian task force) created to identify specific policy changes that improve land use and growth management laws and implementing regulations to support salmon recovery by the end of fiscal year 2027.' },
  { organization: 'Washington State Association of Counties', text: 'Washington State Association of Counties (WSAC) will provide a venue through the Counties Coastal Caucus and/or affiliate organizations such as the County Planning Directors Association and County Engineers Association for the Puget Sound Partnership (PSP) to present new information or highlight learning opportunities for appropriate staff through 2027.' },
  { organization: 'Washington State Association of Counties', text: 'Washington State Association of Counties (WSAC) will provide a venue through the Counties Coastal Caucus and/or affiliate organizations such as the County Planning Directors Association and County Engineers Association for the Puget Sound Partnership (PSP) to present information and/or recommendations and seek local government feedback through 2027.' },
  { organization: 'Washington State Association of Counties', text: 'Association of Washington Cities (AWC) and Washington State Association of Counties (WSAC) will work with Puget Sound Partnership (PSP) to consult with their relevant members to gather input on factors leading to land conversion within their jurisdictions through 2027.' },
  { organization: 'Washington State Association of Counties', text: 'Association of Washington Cities (AWC) and Washington State Association of Counties (WSAC) will assist their relevant members with understanding the implementation of any policy changes related to integrating local salmon recovery plans into long-term planning through 2027.' },
  { organization: 'Washington State Association of Counties', text: 'Association of Washington Cities (AWC) and Washington State Association of Counties (WSAC) will work with Puget Sound Partnership (PSP) to ensure their relevant members are aware of and consider using relevant salmon recovery information (e.g., state, regional and local salmon recovery plans, Commerce?s guidance related to critical areas, Fish and Wildlife?s priority habitats and species, Sound Choices Checklist, etc.) as it relates to habitat protection through 2027.' },
  { organization: 'Washington State Association of Counties', text: 'Association of Washington Cities (AWC) and Washington State Association of Counties (WSAC) will provide opportunities for Puget Sound Partnership (PSP) to work with member jurisdictions to identify challenges with and improve local permit and code enforcement and compliance by providing education and resources, hosting forums, etc. through 2027.' },
  { organization: 'Washington State Association of Counties', text: 'Association of Washington Cities (AWC) and Washington State Association of Counties (WSAC) will work with the Puget Sound Partnership (PSP) to share out and encourage the use of new tools to their members that are relevant to planning and salmon recovery through 2027.' },
  { organization: 'Washington State Department of Commerce', text: 'Washington State Department of Commerce (COM) will provide Growth Management Act guidance and technical assistance to local governments - workshops, one-on-one technical assistance to planning staff, planning commissions, and elected officials through 2030.' },
  { organization: 'Washington State Department of Commerce', text: 'Washington State Department of Commerce (COM) will provide funding to local governments for comprehensive plan updates - over the next biennium this includes periodic update grants, salmon recovery through local planning grants, and climate element grants through 2027.' },
  { organization: 'Washington State Department of Commerce', text: 'Washington State Department of Commerce (COM) will collaborate closely with both local governments and state agency partners on incorporating best available science into critical areas regulations and comprehensive plan elements, like climate resiliency, through 2027.' },
  { organization: 'Washington State Department of Commerce', text: 'Washington State Department of Commerce (COM) will implement salmon recovery through their local planning grant program for local governments that supports the integration of salmon recovery plans into long-range planning through 2027.' },
  { organization: 'Washington State Department of Commerce', text: 'Washington State Department of Commerce (COM) will explore how to broaden outreach and education and reduce barriers for local governments interested in the salmon recovery grant program, so that more local governments apply during the next grant round.' },
  { organization: 'Washington State Department of Commerce', text: 'Washington State Department of Commerce (COM) will provide resources for local governments to enhance their local permit and code enforcement strategies through 2030.' },
  { organization: 'Washington State Department of Commerce', text: 'Washington State Department of Commerce (COM) will conduct routine education and outreach efforts to assist local planners in understanding and complying with their responsibilities under the Growth Management Act through 2030.' },
  { organization: 'Washington State Department of Commerce', text: 'Washington State Department of Commerce (COM) will continue current work providing technical assistance and guidance through 2030.' },
  { organization: 'Washington State Department of Commerce', text: 'Washington State Department of Commerce (COM) will engage in the Shoreline Management Act rulemaking process to see where there is alignment with Growth Management Act and what they might learn from their process through 2027.' },
  { organization: 'Washington State Department of Ecology', text: 'Washington State Department of Ecology (ECY) will provide data, as requested, that could inform tool development by 2027.' },
  { organization: 'Washington State Department of Ecology', text: 'Washington State Department of Ecology (ECY) will, as opportunities arise, encourage distribution of tools to local governments through 2030.' },
  { organization: 'Washington State Department of Natural Resources', text: 'Washington State Department of Natural Resources (DNR) will work with salmon recovery partners to assess salmon habitat restoration opportunities on DNR lands through 2027.' },
  { organization: 'Washington State Department of Transportation', text: 'Washington State Department of Transportation (WSDOT) will implement and update ecological restoration best practices through design, construction, and maintenance as outlined in agency manuals to support salmon recovery goals and promote climate resilience for projects through 2027.' },
  { organization: 'Washington State Department of Transportation', text: 'Washington State Department of Transportation (WSDOT) will identify opportunities for enhancing and creating carbon sequestration efforts in the Puget Sound ecosystems through the Roadside Program?s Vegetation Mitigation Funding through 2027.' },
  { organization: 'Washington State Recreation and Conservation Office', text: 'Governor\'s Salmon Recovery Office (GSRO) will facilitate conversations between Puget Sound Partnership (PSP) and other salmon recovery regions regarding the recommendations in the 2024 Puget Sound Salmon Recovery Plan Addendum with statewide implications through 2027.' },
];

export const AA_TOPIC05_PROGRAMS: AaOngoingProgram[] = [
  { org: 'COM', title: 'Growth Management Services', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/6/Overview', activityTypes: [{ label: 'Ecosystem Recovery Planning', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2080' }, { label: 'Technical Assistance and Training', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2086' }], topicIds: ['05', '06', '07', '10', '11'] },
  { org: 'DNR', title: 'Washington Geological Survey', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/259/Overview', activityTypes: [{ label: 'Research', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2079' }, { label: 'Status and Trends Monitoring', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2093' }], topicIds: ['05', '11', 'B'], websiteHref: 'https://www.dnr.wa.gov/InsectsAndDisease#:~:text=The%20insect%20and%20disease%20monitoring%20team%20at%20the,results%20in%20the%20annual%20Forest%20Health%20Highlights%20report.' },
  { org: 'ECY', title: 'Puget Sound Watershed Characterization Assessment', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/29/Overview', activityTypes: [{ label: 'Ecosystem Recovery Planning', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2080' }, { label: 'Technical Assistance and Training', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2086' }], topicIds: ['05', '15'], websiteHref: 'https://ecology.wa.gov/Water-Shorelines/Puget-Sound/Watershed-characterization-project' },
  { org: 'ECY', title: 'Shorelands - Floodplain Management', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/41/Overview', activityTypes: [{ label: 'Technical Assistance and Training', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2086' }], topicIds: ['05', '10'], websiteHref: 'https://ecology.wa.gov/Water-Shorelines/Shoreline-coastal-management/Hazards/Floods-floodplain-planning/Planning-regulation' },
  { org: 'ECY', title: 'Shorelands - Shoreline Master Programs', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/39/Overview', activityTypes: [{ label: 'Compliance and Enforcement', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2082' }, { label: 'Technical Assistance and Training', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2086' }], topicIds: ['05', '08', '09', '11'], websiteHref: 'https://ecology.wa.gov/Water-Shorelines/Shoreline-coastal-management/Shoreline-coastal-planning/Shoreline-Master-Programs' },
  { org: 'ECY', title: 'Shorelands - Wetland Technical Assistance', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/37/Overview', activityTypes: [{ label: 'Technical Assistance and Training', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2086' }], topicIds: ['05'], websiteHref: 'https://ecology.wa.gov/Water-Shorelines/Wetlands' },
  { org: 'ECY', title: 'Water Quality - National Estuary Program (NEP) Stormwater SI', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/60/Overview', activityTypes: [{ label: 'Capacity Building and Coordination', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2089' }, { label: 'Education and Awareness', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2078' }, { label: 'Effectiveness Evaluation', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2085' }, { label: 'Incentives', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2081' }, { label: 'Mobilizing Funding', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2090' }, { label: 'Research', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2079' }, { label: 'Status and Trends Monitoring', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2093' }, { label: 'Technical Assistance and Training', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2086' }], topicIds: ['02', '03', '05', '06', '07', '15', '16', '17', '18', '19', 'B', 'D', 'F'], websiteHref: 'https://pugetsoundestuary.wa.gov/stormwater-strategic-initiative/' },
  { org: 'NOAA', title: 'Puget Sound Steelhead Recovery Plan', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/92/Overview', activityTypes: [{ label: 'Ecosystem Recovery Planning', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2080' }], topicIds: ['01', '05', '10', '11', '12', '13'] },
  { org: 'SCC', title: 'Office of Farmland Preservation (OFP)', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/161/Overview', activityTypes: [{ label: 'Acquisition and Easements', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2083' }, { label: 'Incentives', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2081' }, { label: 'Status and Trends Monitoring', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2093' }, { label: 'Technical Assistance and Training', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2086' }], topicIds: ['05', '06'], websiteHref: 'https://www.scc.wa.gov/ofp' },
  { org: 'SCC', title: 'Voluntary Stewardship Program (VSP)', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/156/Overview', activityTypes: [{ label: 'Acquisition and Easements', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2083' }, { label: 'Ecosystem Recovery Planning', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2080' }, { label: 'Incentives', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2081' }, { label: 'Technical Assistance and Training', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2086' }], topicIds: ['05', '06', '10', '16'], websiteHref: 'https://www.scc.wa.gov/vsp' },
  { org: 'USDA NRCS', title: 'Watershed Surveys and Planning Program', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/94/Overview', activityTypes: [{ label: 'Ecosystem Recovery Planning', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2080' }, { label: 'Research', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2079' }, { label: 'Technical Assistance and Training', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2086' }], topicIds: ['05', '06', '07', '13'] },
  { org: 'USDOT', title: 'Transportation Infrastructure Finance and Innovation Act (TIFIA) program', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/225/Overview', activityTypes: [{ label: 'Ecosystem Restoration Implementation', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2087' }, { label: 'Mobilizing Funding', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2090' }], topicIds: ['05'], websiteHref: 'https://www.transportation.gov/buildamerica/financing/tifia' },
  { org: 'USDOT FTA', title: 'Capital Investment Grants (CIG) program (New Starts, Section 5309)', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/209/Overview', activityTypes: [{ label: 'Incentives', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2081' }, { label: 'Mobilizing Funding', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2090' }], topicIds: ['05'], websiteHref: 'https://www.transit.dot.gov/CIG' },
  { org: 'USDOT FTA', title: 'Planning, environmental review and funding programs', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/208/Overview', activityTypes: [{ label: 'Capacity Building and Coordination', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2089' }, { label: 'Compliance and Enforcement', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2082' }, { label: 'Ecosystem Recovery Planning', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2080' }, { label: 'Mobilizing Funding', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2090' }], topicIds: ['05', '15'], websiteHref: 'https://www.transit.dot.gov/regulations-and-guidance/environmental-programs/environmental-programs' },
  { org: 'USDOT FTA', title: 'Research, Development, Demonstration and Deployment Projects', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/249/Overview', activityTypes: [{ label: 'Capacity Building and Coordination', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2089' }, { label: 'Mobilizing Funding', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2090' }, { label: 'Research', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2079' }], topicIds: ['05'], websiteHref: 'https://www.transit.dot.gov/funding/grants/research-development-demonstration-and-deployment-projects-5312' },
  { org: 'USDOT FTA', title: 'Urbanized Area Formula Grants program (Section 5307)', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/210/Overview', activityTypes: [{ label: 'Ecosystem Recovery Planning', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2080' }, { label: 'Incentives', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2081' }, { label: 'Mobilizing Funding', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2090' }], topicIds: ['05'], websiteHref: 'https://www.transit.dot.gov/funding/grants/urbanized-area-formula-grants-5307' },
  { org: 'WDFW', title: 'Ecosystem Services', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/142/Overview', activityTypes: [{ label: 'Research', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2079' }, { label: 'Technical Assistance and Training', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2086' }], topicIds: ['05', '06', '07', '08', '09', '10', '11', '12', '15', '16', '17'] },
  { org: 'WDFW', title: 'Habitat Strategic Initiative Lead', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/155/Overview', activityTypes: [{ label: 'Acquisition and Easements', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2083' }, { label: 'Capacity Building and Coordination', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2089' }, { label: 'Ecosystem Recovery Planning', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2080' }, { label: 'Education and Awareness', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2078' }, { label: 'Effectiveness Evaluation', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2085' }, { label: 'Incentives', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2081' }, { label: 'Mobilizing Funding', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2090' }, { label: 'Research', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2079' }, { label: 'Species Management', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2088' }, { label: 'Status and Trends Monitoring', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2093' }, { label: 'Technical Assistance and Training', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2086' }], topicIds: ['05', '06', '07', '08', '09', '10', 'B', 'C', 'D', 'E', 'F'], websiteHref: 'https://pugetsoundestuary.wa.gov/habitat-strategic-initiative/' },
  { org: 'WDFW', title: 'Wildlife Species of Greatest Conservation Need', href: 'https://www.pugetsoundinfo.wa.gov/OngoingProgram/Detail/145/Overview', activityTypes: [{ label: 'Ecosystem Recovery Planning', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2080' }], topicIds: ['04', '05', '07', '08', '09', '10', '12', '20', 'B', 'F'], websiteHref: 'https://wdfw.wa.gov/species-habitats/at-risk/swap' },
];

export const AA_TOPIC05_ACTIVITIES: AaNepActivity[] = [
  { org: 'BEF', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/418', title: 'Flexible State Funding Sources Convening', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1433', award: { label: 'SIL - Habitat', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/3' }, activityTypes: [{ label: 'Capacity Building and Coordination', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2089' }, { label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05', '06', '07', '10'], startYear: '2023', stage: 'Implementation', websiteHref: 'https://pspwa.box.com/s/9nutabiq7qvpjv5ikua4h8o2n43pjgab' },
  { org: 'Cascadia CG', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/467', title: 'Smart Growth progress indicator development project', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1388', award: { label: 'PSP Base and Science', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/1' }, activityTypes: [{ label: 'Status and Trends Monitoring', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2093' }], topicIds: ['05', '06', '07'], startYear: '2023', stage: 'Completed' },
  { org: 'City of Everett', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/316', title: 'Regreen Everett Behavior Change Campaign', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1439', award: { label: 'SIL - Habitat', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/3' }, activityTypes: [{ label: 'Ecosystem Restoration Implementation', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2087' }, { label: 'Incentives', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2081' }], topicIds: ['05', '11'], startYear: '2023', stage: 'Implementation', websiteHref: 'https://pspwa.box.com/s/aljj8n48t6kjlr2xe076oaysduk0u0xe' },
  { org: 'COM', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/384', title: 'Advancing TDR/LCLIP in the Puget Sound', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1428', award: { label: 'SIL - Habitat', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/3' }, activityTypes: [{ label: 'Ecosystem Recovery Planning', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2080' }, { label: 'Incentives', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2081' }, { label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }, { label: 'Technical Assistance and Training', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2086' }], topicIds: ['05', '06', '07'], startYear: '2024', stage: 'Implementation', websiteHref: 'https://pspwa.box.com/s/ahebe10zg3qjaby1uulcnr2l4eij42ac' },
  { org: 'COM', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/384', title: 'Puget Sound Land Use Mapping for Local and Regional Land Use Planning', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1425', award: { label: 'SIL - Habitat', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/3' }, activityTypes: [{ label: 'Research', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2079' }], topicIds: ['05'], startYear: '2024', stage: 'Implementation', websiteHref: 'https://pspwa.box.com/s/h08ccmrjrnmwbyan5n16r2t0npik4csv' },
  { org: 'DNR', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/12', title: 'Essential Conservation Areas', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1437', award: { label: 'SIL - Habitat', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/3' }, activityTypes: [{ label: 'Research', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2079' }], topicIds: ['05'], startYear: '2023', stage: 'Implementation', websiteHref: 'https://pspwa.box.com/s/vetr4tgg2ee4m0tkw74bhdc1rsvlkdhl' },
  { org: 'HCCC', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/392', title: 'Hood Canal and Eastern Strait of Juan de Fuca Summer Chum Salmon Recovery Issues (Threats) Assessment', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1556', award: { label: 'SIL - Habitat', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/3' }, activityTypes: [{ label: 'Ecosystem Recovery Planning', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2080' }], topicIds: ['01', '05', '09', '10'], startYear: '2021', stage: 'Completed', websiteHref: 'https://pspwa.box.com/s/4qbkb1j2nbfgiknakzju8rsjnklq2r5l' },
  { org: 'Kitsap County', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/394', title: 'Kitsap Natural Resource Asset Management Program (KNRAMP)', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1429', award: { label: 'SIL - Habitat', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/3' }, activityTypes: [{ label: 'Ecosystem Recovery Planning', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2080' }, { label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05', '10'], startYear: '2024', stage: 'Implementation', websiteHref: 'https://pspwa.box.com/s/ca0lgl454scpuwy2px0dhsshdt8c9dak' },
  { org: 'Ross', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/20', title: 'Advancing Future Scenarios', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1670', award: { label: 'PSP Base and Science', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/1' }, activityTypes: [{ label: 'Capacity Building and Coordination', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2089' }], topicIds: ['05', '09', '10', 'B', 'D'], startYear: '2024', stage: 'Implementation', websiteHref: 'https://www.psp.wa.gov/future-scenarios.php' },
  { org: 'Skagit Coop', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/162', title: 'Skagit River System Cooperative: Barnaby Slough fish monitoring and integration/management of habitat and biological monitoring data', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1128', award: { label: 'NWIFC', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/6' }, activityTypes: [{ label: 'Acquisition and Easements', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2083' }, { label: 'Ecosystem Restoration Implementation', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2087' }, { label: 'Project Planning and Design', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2092' }, { label: 'Research', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2079' }, { label: 'Species Management', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2088' }, { label: 'Status and Trends Monitoring', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2093' }], topicIds: ['01', '05', '09', '10', '12'], startYear: '2019', stage: 'Completed', websiteHref: 'http://psp.nwifc.org/psp/tribal-project-updates/skagit-river-system-cooperative/' },
  { org: 'Skagit Coop', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/162', title: 'Skagit River System Cooperative: Program & Data Integration', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1130', award: { label: 'NWIFC', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/6' }, activityTypes: [{ label: 'Acquisition and Easements', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2083' }, { label: 'Ecosystem Recovery Planning', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2080' }, { label: 'Ecosystem Restoration Implementation', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2087' }, { label: 'Research', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2079' }, { label: 'Species Management', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2088' }, { label: 'Status and Trends Monitoring', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2093' }], topicIds: ['01', '05', '10', '12'], startYear: '2017', stage: 'Completed', websiteHref: 'http://psp.nwifc.org/psp/tribal-project-updates/skagit-river-system-cooperative/' },
  { org: 'Skagit Coop', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/162', title: 'Skagit River System Cooperative: Skagit Habitat Condition and Utilization', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1129', award: { label: 'NWIFC', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/6' }, activityTypes: [{ label: 'Acquisition and Easements', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2083' }, { label: 'Ecosystem Recovery Planning', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2080' }, { label: 'Ecosystem Restoration Implementation', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2087' }, { label: 'Research', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2079' }, { label: 'Species Management', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2088' }, { label: 'Status and Trends Monitoring', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2093' }], topicIds: ['01', '05', '09', '10', '12'], startYear: '2018', stage: 'Completed', websiteHref: 'http://psp.nwifc.org/psp/tribal-project-updates/skagit-river-system-cooperative/' },
  { org: 'Skagit Coop', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/162', title: 'Skagit River System Cooperative: SRSC Implementing Chinook Salmon Recovery in the Skagit', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1780', award: { label: 'NWIFC', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/6' }, activityTypes: [{ label: 'Ecosystem Recovery Planning', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2080' }, { label: 'Research', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2079' }, { label: 'Status and Trends Monitoring', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2093' }], topicIds: ['01', '04', '05', '10', '11', '13', 'B'], startYear: '2023', stage: 'Implementation', websiteHref: 'http://psp.nwifc.org/psp/tribal-project-updates/skagit-river-system-cooperative/' },
  { org: 'Skokomish Indian Tribe', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/366', title: 'Skokomish Indian Tribe: Enhance Bourgault Farm', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1127', award: { label: 'NWIFC', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/6' }, activityTypes: [{ label: 'Ecosystem Restoration Implementation', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2087' }, { label: 'Effectiveness Evaluation', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2085' }, { label: 'Species Management', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2088' }], topicIds: ['01', '05', '09', '10', '12'], startYear: '2018', stage: 'Completed', websiteHref: 'https://psp.nwifc.org/tribal-project-updates/skokomish-tribe/' },
  { org: 'Squaxin Island Tribe', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/148', title: 'Squaxin Island Tribe: Biological Recovery of Coho in Mill Creek- Year 1', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1123', award: { label: 'NWIFC', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/6' }, activityTypes: [{ label: 'Project Planning and Design', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2092' }, { label: 'Species Management', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2088' }], topicIds: ['01', '05', '12'], startYear: '2017', stage: 'Completed', websiteHref: 'http://psp.nwifc.org/psp/tribal-project-updates/squaxin-island-tribe/' },
  { org: 'Squaxin Island Tribe', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/148', title: 'Squaxin Island Tribe: Biological Recovery of Coho in Mill Creek- Year 2', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1122', award: { label: 'NWIFC', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/6' }, activityTypes: [{ label: 'Project Planning and Design', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2092' }, { label: 'Research', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2079' }, { label: 'Species Management', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2088' }], topicIds: ['01', '05', '12'], startYear: '2018', stage: 'Completed', websiteHref: 'http://psp.nwifc.org/psp/tribal-project-updates/squaxin-island-tribe/' },
  { org: 'Squaxin Island Tribe', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/148', title: 'Squaxin Island Tribe: Biological Recovery of Coho in Mill Creek- Year 3', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1121', award: { label: 'NWIFC', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/6' }, activityTypes: [{ label: 'Project Planning and Design', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2092' }, { label: 'Research', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2079' }, { label: 'Species Management', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2088' }], topicIds: ['01', '05', '12'], startYear: '2019', stage: 'Completed', websiteHref: 'http://psp.nwifc.org/psp/tribal-project-updates/squaxin-island-tribe/' },
  { org: 'Thurston County', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/130', title: 'Thurston County Working Lands Conservation Strategy', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1426', award: { label: 'SIL - Habitat', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/3' }, activityTypes: [{ label: 'Ecosystem Recovery Planning', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2080' }, { label: 'Incentives', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2081' }, { label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05', '06', '07'], startYear: '2024', stage: 'Implementation', websiteHref: 'https://pspwa.box.com/s/7snquhxh9e98vvyraind4mre78ysh5u3' },
  { org: 'WDFW', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', title: 'Habitat SIL 2.0 Capacity', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1538', award: { label: 'SIL - Habitat', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/3' }, activityTypes: [{ label: 'Capacity Building and Coordination', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2089' }, { label: 'Mobilizing Funding', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2090' }], topicIds: ['05', '06', '07', '08', '09', '10'], startYear: '2021', stage: 'Implementation', websiteHref: 'https://pugetsoundestuary.wa.gov/habitat-strategic-initiative/' },
  { org: 'WDFW', orgHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', title: 'Puget Sounds Starts Here', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1441', award: { label: 'SIL - Habitat', href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/3' }, activityTypes: [{ label: 'Research', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2079' }], topicIds: ['05', '10'], startYear: '2023', stage: 'Implementation', websiteHref: 'https://pspwa.box.com/s/vjzxickdgs8chjxyddm60mh5vw65nda1' },
];

export const AA_TOPIC05_BILLS: AaLegislativeBill[] = [
  { pretitle: '2025 | STATE BILL HB 1010', title: 'Authorizing accessory dwelling units in rural areas.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05', '06', '07'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?billnumber=1010&year=2025' } },
  { pretitle: '2025 | STATE BILL HB 1096', title: 'Increasing housing options through lot splitting.', status: 'Passed', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?billnumber=1096&year=2025' } },
  { pretitle: '2025 | STATE BILL HB 1097', title: 'Extending governmental services beyond the urban growth area in specific circumstances.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?billnumber=1097&year=2025' } },
  { pretitle: '2025 | STATE BILL HB 1135', title: 'Ensuring that local government planning complies with the growth management act', status: 'Passed', activityTypes: [{ label: 'Compliance and Enforcement', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2082' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?billnumber=1135&year=2025' } },
  { pretitle: '2025 | STATE BILL HB 1153', title: 'Concerning urban forest management ordinances', status: 'Did not pass', activityTypes: [{ label: 'Technical Assistance and Training', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2086' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?billnumber=1153&year=2025' } },
  { pretitle: '2025 | STATE BILL HB 1164', title: 'Expanding urban growth area boundaries for residential development', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?billnumber=1164&year=2025' } },
  { pretitle: '2025 | STATE BILL HB 1235 & SB 5148', title: 'Ensuring compliance with the housing element requirements of the growth management act.', status: 'Did not pass', activityTypes: [{ label: 'Compliance and Enforcement', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2082' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=1235&Chamber=House&Year=2025' } },
  { pretitle: '2025 | STATE BILL HB 1299 & SB 5184', title: 'Concerning minimum parking requirements.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=1299&Chamber=House&Year=2025' } },
  { pretitle: '2025 | STATE BILL HB 1345', title: 'Establishing limitations on detached accessory dwelling units outside of urban growth areas.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=1345&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL HB 1491', title: 'Promoting transit-oriented housing development.', status: 'Passed', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=1491&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL HB 1695', title: 'Concerning unincorporated villages in the growth management act.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=1695&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL HB 1742', title: 'Concerning environmentally sustainable urban design.', status: 'Did not pass', activityTypes: [{ label: 'Incentives', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2081' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=1742&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL HB 1757', title: 'Modifying regulations for existing buildings used for residential purposes.', status: 'Passed', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=1757&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL HB 1840 & SB 5471', title: 'Authorizing middle housing in unincorporated growth areas and unincorporated urban growth areas, certain limited areas of more intensive rural development, and fully contained communities.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=1840&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL HB 1854', title: 'Authorizing subdivision of land in rural areas for families.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=1854&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL HB 1992', title: 'Implementing safe system approach strategies for active transportation infrastructure.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=1992&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL SB 5197', title: 'Ensuring that local government planning complies with the growth management act.', status: 'Did not pass', activityTypes: [{ label: 'Compliance and Enforcement', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2082' }], topicIds: ['05'], link: { label: 'Senate Bill Link', href: 'https://app.leg.wa.gov/BillSummary/?BillNumber=5197&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL SB 5413', title: 'Establishing limitations on detached accessory dwelling units outside urban growth areas.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'Senate Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=5413&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL SB 5461', title: 'Concerning residential development in limited areas of more intensive rural development.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'Senate Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=5461&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL SB 5470', title: 'Establishing limitations on detached accessory dwelling units outside urban growth areas.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'Senate Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=5470&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL SB 5559', title: 'Streamlining the subdivision process inside urban growth areas.', status: 'Passed', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'Senate Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=5559&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL SB 5604', title: 'Promoting transit-oriented development.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'Senate Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=5604&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL SB 5612', title: 'Creating a categorical exemption for multiunit housing development within the incorporated areas in an urban growth area under the state environmental policy act.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'Senate Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=5612&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL SB 5660', title: 'Making it possible for more properties to have access to water, storm drains, and sanitary sewage systems.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'Senate Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=5660&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL SB 5699', title: 'Concerning limited areas of more intensive rural development.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'Senate Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=5699&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL SB 5749', title: 'Concerning housing development opportunity zones.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'Senate Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=5749&Year=2025&Initiative=false' } },
  { pretitle: '2025 | STATE BILL SB 5755', title: 'Incentivizing residential development with public benefits on underutilized commercial properties.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'Senate Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=5755&Year=2025&Initiative=false' } },
  { pretitle: '2026 | STATE BILL HB 1345', title: 'Establishing limitations on detached accessory dwelling units outside of urban growth areas.', status: 'Passed', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=1345&Year=2025&Initiative=false' } },
  { pretitle: '2026 | STATE BILL HB 1742', title: 'Concerning environmentally sustainable urban design.', status: 'Did not pass', activityTypes: [{ label: 'Incentives', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2081' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=1742&Year=2025&Initiative=false' } },
  { pretitle: '2026 | STATE BILL HB 2267', title: 'Concerning urban forest management ordinances', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary/?BillNumber=2267&Year=2025&Initiative=false' } },
  { pretitle: '2026 | STATE BILL HB 2269', title: 'Concerning middle housing in unincorporated areas.', status: 'Passed', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary/?BillNumber=2269&Year=2025&Initiative=false' } },
  { pretitle: '2026 | STATE BILL HB 2316', title: 'Concerning land use development when vegetation associated with shrubsteppe is present in the urban growth areas.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/BillSummary/?BillNumber=2316&Year=2025&Initiative=false' } },
  { pretitle: '2026 | STATE BILL HB 2358', title: 'Considering critical aquifer recharge areas when revising an urban growth area', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=2358&Year=2026&Initiative=false' } },
  { pretitle: '2026 | STATE BILL HB 2418', title: 'Concerning permit review process', status: 'Passed', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=2418&Year=2026&Initiative=false' } },
  { pretitle: '2026 | STATE BILL HB 2459', title: 'Concerning siting schools outside of an urban growth area.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=2459&Year=2026&Initiative=false' } },
  { pretitle: '2026 | STATE BILL HB 2480', title: 'Concerning residential development in commercial and mixed-use zones', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'House Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=2480&Year=2026&Initiative=false' } },
  { pretitle: '2026 | STATE BILL SB 5470', title: 'Establishing limitations on detached accessory dwelling units outside urban growth areas.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'Senate Bill Link', href: 'https://app.leg.wa.gov/billsummary?BillNumber=5470&Year=2025&Initiative=false' } },
  { pretitle: '2026 | STATE BILL SB 5729', title: 'Encouraging construction of affordable housing by streamlining the permitting process.', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'Senate Bill Link', href: 'https://app.leg.wa.gov/billsummary/?BillNumber=5729&Year=2025&Initiative=false' } },
  { pretitle: '2026 | STATE BILL SB 6016', title: 'Considering critical aquifer recharge areas when revising an urban growth area', status: 'Did not pass', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'Senate Bill Link', href: 'https://app.leg.wa.gov/billsummary/?BillNumber=6016&Year=2025&Initiative=false' } },
  { pretitle: '2026 | STATE BILL SB 6026', title: 'Concerning residential development in commercial and mixed-use zones', status: 'Passed', activityTypes: [{ label: 'Policy and Regulation Development', href: 'https://www.pugetsoundinfo.wa.gov/ActivityType/Detail/2084' }], topicIds: ['05'], link: { label: 'Senate Bill Link', href: 'https://app.leg.wa.gov/billsummary/?BillNumber=6026&Year=2025&Initiative=false' } },
];
