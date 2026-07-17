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
  /** real Action Agenda Explorer Overview URL for this topic */
  href: string;
}

export interface ActionAgendaVitalSignOption {
  label: string;
  value: string;
}

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

const VITAL_SIGN_NAMES = [
  'Air Quality',
  'Beaches and Marine Vegetation',
  'Birds',
  'Cultural Wellbeing',
  'Drinking Water',
  'Economic Vitality',
  'Estuaries',
  'Forage Fish',
  'Forests and Wetlands',
  'Freshwater',
  'Good Governance',
  'Groundfish and Benthic Invertebrates',
  'Local Foods',
  'Marine Water',
  'Orcas',
  'Outdoor Activity',
  'Salmon',
  'Sense of Place',
  'Shellfish Beds',
  'Sound Stewardship',
  'Streams and Floodplains',
  'Toxics in Aquatic Life',
  'Zooplankton',
];

export const VITAL_SIGN_OPTIONS: ActionAgendaVitalSignOption[] = VITAL_SIGN_NAMES.map((name) => ({
  label: name,
  value: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
}));

// ── Section 3 — the flat 26-card Topic grid, source order ──────────────────
const BASE = 'https://actionagenda.pugetsoundinfo.wa.gov/2026-2030/Topic';

export const TOPICS: ActionAgendaTopic[] = [
  { id: '01', label: 'TOPIC 01', title: 'Abundant and Harvestable Salmon', image: '/photos/action-agenda/topic-01.jpg', href: `${BASE}/01/Overview` },
  { id: '02', label: 'TOPIC 02', title: 'Human Health', image: '/photos/action-agenda/topic-02.jpg', href: `${BASE}/02/Overview` },
  { id: '03', label: 'TOPIC 03', title: 'Toxic Chemical Prevention', image: '/photos/action-agenda/topic-03.jpg', href: `${BASE}/03/Overview` },
  { id: '04', label: 'TOPIC 04', title: 'Shared Landscapes', image: '/photos/action-agenda/topic-04.jpg', href: `${BASE}/04/Overview` },
  { id: '05', label: 'TOPIC 05', title: 'Smart Growth', image: '/photos/action-agenda/topic-05.jpg', href: `${BASE}/05/Overview` },
  { id: '06', label: 'TOPIC 06', title: 'Agricultural Land Protection', image: '/photos/action-agenda/topic-06.jpg', href: `${BASE}/06/Overview` },
  { id: '07', label: 'TOPIC 07', title: 'Working Forest Land Protection', image: '/photos/action-agenda/topic-07.jpg', href: `${BASE}/07/Overview` },
  { id: '08', label: 'TOPIC 08', title: 'Marine Vegetation', image: '/photos/action-agenda/topic-08.jpg', href: `${BASE}/08/Overview` },
  { id: '09', label: 'TOPIC 09', title: 'Healthy Shorelines', image: '/photos/action-agenda/topic-09.jpg', href: `${BASE}/09/Overview` },
  { id: '10', label: 'TOPIC 10', title: 'Floodplains and Estuaries', image: '/photos/action-agenda/topic-10.jpg', href: `${BASE}/10/Overview` },
  { id: '11', label: 'TOPIC 11', title: 'Riparian Areas', image: '/photos/action-agenda/topic-11.jpg', href: `${BASE}/11/Overview` },
  { id: '12', label: 'TOPIC 12', title: 'Freshwater Availability', image: '/photos/action-agenda/topic-12.jpg', href: `${BASE}/12/Overview` },
  { id: '13', label: 'TOPIC 13', title: 'Fish Passage Barriers', image: '/photos/action-agenda/topic-13.jpg', href: `${BASE}/13/Overview` },
  { id: '14', label: 'TOPIC 14', title: 'Invasive Species', image: '/photos/action-agenda/topic-14.jpg', href: `${BASE}/14/Overview` },
  { id: '15', label: 'TOPIC 15', title: 'Stormwater Runoff', image: '/photos/action-agenda/topic-15.jpg', href: `${BASE}/15/Overview` },
  { id: '16', label: 'TOPIC 16', title: 'Agricultural Lands Runoff', image: '/photos/action-agenda/topic-16.jpg', href: `${BASE}/16/Overview` },
  { id: '17', label: 'TOPIC 17', title: 'Forest Roads Runoff', image: '/photos/action-agenda/topic-17.jpg', href: `${BASE}/17/Overview` },
  { id: '18', label: 'TOPIC 18', title: 'Fecal Pollution', image: '/photos/action-agenda/topic-18.jpg', href: `${BASE}/18/Overview` },
  { id: '19', label: 'TOPIC 19', title: 'Wastewater Treatment Plants', image: '/photos/action-agenda/topic-19.jpg', href: `${BASE}/19/Overview` },
  { id: '20', label: 'TOPIC 20', title: 'Vessel Impacts', image: '/photos/action-agenda/topic-20.jpg', href: `${BASE}/20/Overview` },
  { id: 'A', label: 'TOPIC A', title: 'Funding', image: '/photos/action-agenda/topic-a.jpg', href: `${BASE}/A/Overview` },
  { id: 'B', label: 'TOPIC B', title: 'Research and Monitoring', image: '/photos/action-agenda/topic-b.jpg', href: `${BASE}/B/Overview` },
  { id: 'C', label: 'TOPIC C', title: 'Good Governance', image: '/photos/action-agenda/topic-c.jpg', href: `${BASE}/C/Overview` },
  { id: 'D', label: 'TOPIC D', title: 'Strategic Leadership and Collaboration', image: '/photos/action-agenda/topic-d.jpg', href: `${BASE}/D/Overview` },
  { id: 'E', label: 'TOPIC E', title: 'Workforce Development', image: '/photos/action-agenda/topic-e.jpg', href: `${BASE}/E/Overview` },
  { id: 'F', label: 'TOPIC F', title: 'Outreach and Behavior Change', image: '/photos/action-agenda/topic-f.jpg', href: `${BASE}/F/Overview` },
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
