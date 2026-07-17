// src/data/pages/nep-atlas.ts — content for the NEP Atlas unit
// (Implementation & Funding module).
//
// Sourced 2026-07-17 from:
//   - https://nepatlas.pugetsoundinfo.wa.gov/ (home: welcome copy, funders,
//     one inline photo floated beside the welcome text)
//   - https://nepatlas.pugetsoundinfo.wa.gov/Home/About (About: the fuller
//     "what is the NEP Atlas" narrative, the NEP-funding-recipients list, and
//     a 3-photo trio run down the article)
//   - https://nepatlas.pugetsoundinfo.wa.gov/Activity/Index (Activities List
//     intro copy)
//   - https://nepatlas.pugetsoundinfo.wa.gov/Activity/IndexGridJsonData (the
//     live JSON feed backing the page's own ag-grid table — the table itself
//     is populated by client-side fetch() and is NOT present in the static
//     HTML; this is the exact endpoint the page's own script calls, returning
//     1,614 activity records as of the scrape date)
//   - https://nepatlas.pugetsoundinfo.wa.gov/Award/Index +
//     /Award/IndexGridJsonData (NEP Awards intro copy + the 14-row award feed,
//     same client-fetch pattern as Activities)
//   - https://nepatlas.pugetsoundinfo.wa.gov/Activity/Summary (Investment
//     Summary intro copy; the two bar charts themselves are an Angular app
//     driven by a large embedded JSON blob, not server-rendered — see the
//     gaps note at the bottom of this file)
//
// Every string is verbatim from those pages/feeds. The headline STATS below
// are honest aggregates computed from the live JSON feeds (row counts,
// investment sums) — the same underlying numbers the page's own script
// produces client-side (e.g. `data.length` becomes its own "Currently
// Viewing X out of Y NEP Activities" text), just totaled here instead of in
// the browser. Nothing is invented; where the source computes something this
// file does not (per-Vital-Sign or per-geography dollar breakdowns — the
// exact job the JS-only Investment Summary charts do), it is left out rather
// than re-derived and risk misrepresenting the source's own methodology.

export const SOURCE_URL = 'https://nepatlas.pugetsoundinfo.wa.gov/';
export const PAGE_TITLE = 'NEP Atlas';
// Source's own site-title banner is set in shouting caps
// ("PUGET SOUND NATIONAL ESTUARY PROGRAM ATLAS"); sentence-cased here per this
// prototype's no-ornamental-caps rule (same normalization about.ts applied).
export const PAGE_EYEBROW = 'Puget Sound National Estuary Program Atlas';
export const PAGE_LEDE =
  'The National Estuary Program (NEP) Atlas tracks and shares information about Puget Sound NEP investments, activities, and accomplishments.';

// ── Inline link segments (shared shape) ─────────────────────────────────────
// Mirrors PsInfoAboutNarrative's segment model (src/data/pages/about.ts) so a
// narrative-prose component can render verbatim paragraphs with links kept in
// their original sentence position. Kept local to this file rather than
// importing about.ts's types, since PsInfoAboutNarrative currently imports
// its types from 'pages/about' specifically — the build stage should either
// generalize that component to accept a type param, or add a thin
// PsInfoNepAtlasNarrative sibling against these shapes (see section plan).
export interface AtlasInternalLink {
  kind: 'internal';
  text: string;
  /** Root-relative route in this prototype's own IA; resolve with withBase(). */
  route: string;
}
export interface AtlasExternalLink {
  kind: 'external';
  text: string;
  href: string;
}
export type AtlasLink = AtlasInternalLink | AtlasExternalLink;

export type AtlasSegment = { type: 'text'; text: string } | { type: 'link'; link: AtlasLink };

export interface AtlasParagraph {
  segments: AtlasSegment[];
}

// ── Welcome copy (home page) ─────────────────────────────────────────────────
// Source floated one photograph to the right of this paragraph.
export const WELCOME_PARAGRAPH: AtlasParagraph = {
  segments: [
    {
      type: 'text',
      text: 'The National Estuary Program (NEP) Atlas tracks and shares information about Puget Sound NEP investments, activities, and accomplishments. The information presented here includes activities managed by the Puget Sound NEP ',
    },
    { type: 'link', link: { kind: 'external', text: 'Strategic Initiative Leads', href: 'https://pugetsoundestuary.wa.gov/' } },
    { type: 'text', text: ', the ' },
    { type: 'link', link: { kind: 'external', text: 'Northwest Indian Fisheries Commission', href: 'https://nwifc.org/' } },
    { type: 'text', text: ', the ' },
    { type: 'link', link: { kind: 'external', text: 'Puget Sound Partnership', href: 'https://psp.wa.gov/' } },
    { type: 'text', text: ', and directly by the ' },
    // Source wraps this phrase in two adjacent anchors ("U.S." then
    // "Environmental Protection Agency"), both pointing at the same EPA page;
    // kept as two link segments to match the source markup exactly.
    { type: 'link', link: { kind: 'external', text: 'U.S.', href: 'http://www.epa.gov/puget-sound/epa-geographic-funding-work-puget-sound-recovery' } },
    { type: 'link', link: { kind: 'external', text: 'Environmental Protection Agency', href: 'https://www.epa.gov/puget-sound/epa-geographic-funding-work-puget-sound-recovery' } },
    { type: 'text', text: '. The NEP Atlas is updated periodically as new investments are made around the region.' },
  ],
};

export const WELCOME_PHOTO = {
  image: '/photos/nep-atlas/estuary-welcome.jpg',
  alt: 'A logjam and truss bridge on a Puget Sound tributary river, mountains in the background',
};

// ── About the NEP Atlas (fuller narrative, from /Home/About) ───────────────
export const ABOUT_PARAGRAPHS: AtlasParagraph[] = [
  {
    segments: [
      { type: 'text', text: 'The National Estuary Program (NEP) Atlas is an online, interactive tool composed of maps, tables, charts, and links to reports pertaining to all activities funded through the ' },
      { type: 'link', link: { kind: 'external', text: 'U.S. Environmental Protection Agency Puget Sound NEP', href: 'http://www.psp.wa.gov/NEP-overview.php' } },
      { type: 'text', text: '. The main purpose of the NEP Atlas is to consistently track and communicate investments, activities, and accomplishments related to Puget Sound recovery priorities, as identified in the ' },
      { type: 'link', link: { kind: 'internal', text: 'Action Agenda', route: '/prototypes/action-agenda' } },
      { type: 'text', text: ', ' },
      { type: 'link', link: { kind: 'external', text: 'Implementation Strategies', href: 'https://www.psp.wa.gov/implementation-strategies.php' } },
      { type: 'text', text: ', and ' },
      { type: 'link', link: { kind: 'internal', text: 'local ecosystem recovery plans', route: '/prototypes/lios' } },
      { type: 'text', text: '.' },
    ],
  },
  {
    segments: [
      { type: 'text', text: 'The NEP Atlas provides a range of tools for NEP funding recipients to showcase their accomplishments and disseminate information about their work. NEP funding recipients include:' },
    ],
  },
];

export interface AtlasFundingRecipient {
  name: string;
  href: string;
  /** Parenthetical department/agency detail the source listed after the name, verbatim. */
  detail?: string;
}

// The source's own bulleted list under "NEP funding recipients include:".
export const FUNDING_RECIPIENTS: AtlasFundingRecipient[] = [
  { name: 'Local Integrating Organizations', href: 'https://www.psp.wa.gov/LIO-overview.php' },
  { name: 'Northwest Indian Fisheries Commission', href: 'https://nwifc.org/' },
  { name: 'Northwest Straits Commission', href: 'http://www.nwstraits.org/' },
  { name: 'Puget Sound Partnership', href: 'http://www.psp.wa.gov' },
  {
    name: 'Strategic Initiative Lead - Habitat',
    href: 'https://pugetsoundestuary.wa.gov/habitat-strategic-initiative/',
    detail: 'Washington State Department of Fish and Wildlife, Washington State Department of Natural Resources',
  },
  {
    name: 'Strategic Initiative Lead - Shellfish',
    href: 'https://pugetsoundestuary.wa.gov/shellfish-strategic-initiative/',
    detail: 'Washington State Department of Health',
  },
  {
    name: 'Strategic Initiative Lead - Stormwater',
    href: 'https://pugetsoundestuary.wa.gov/stormwater-strategic-initiative/',
    detail: 'Washington State Department of Ecology, Washington Stormwater Center, Washington State Department of Commerce',
  },
];

export interface AtlasPhoto {
  image: string;
  alt: string;
}

// The About page's own 3-photo trio, run down the article (same treatment as
// PsInfoAboutPhotoTrio, whose existing photos/alts belong to the sitewide
// About page — this trio is NEP Atlas's own, distinct set).
export const ABOUT_PHOTOS: AtlasPhoto[] = [
  { image: '/photos/nep-atlas/shellfish-monitoring.jpg', alt: 'Two people checking oyster grow-out bags on a Puget Sound tideflat' },
  { image: '/photos/nep-atlas/puget-sound-shoreline.jpg', alt: 'Storm clouds over Puget Sound seen from a rocky beach' },
  { image: '/photos/nep-atlas/fishing-fleet.jpg', alt: 'Coiled fishing nets in front of a fleet of commercial fishing boats in harbor' },
];

// ── Headline stats (aggregated from the live Activity/Award JSON feeds) ────
export interface AtlasStat {
  value: string;
  label: string;
  sub?: string;
}

export const ATLAS_STATS: AtlasStat[] = [
  {
    value: '1,614',
    label: 'NEP-funded activities',
    sub: '1,318 completed, 296 in implementation',
  },
  {
    value: '$1.09B',
    label: 'Total NEP investment',
    sub: '$1,088,569,780 across activities contracted 2006–2026',
  },
  {
    value: '14',
    label: 'NEP Awards',
    sub: '9 currently active, 5 retired',
  },
];

export interface AtlasInvestmentTypeCount {
  type: string;
  count: number;
}

// Breakdown of the 1,614 activities by their InvestmentType field.
export const ACTIVITY_TYPE_COUNTS: AtlasInvestmentTypeCount[] = [
  { type: 'NEP Project', count: 1277 },
  { type: 'NEP Capacity', count: 297 },
  { type: 'NEP Program Grant', count: 40 },
];

// ── Activities section intro copy (from /Activity/Index) ───────────────────
export const ACTIVITIES_INTRO_PARAGRAPH =
  'Please note: Near Term Action (NTAs) funded by the Strategic Initiative Leads have been incorporated into the NEP Atlas and appear in the list, below. NTAs (including NTAs funded by the Strategic Initiative Leads) were formerly tracked in the "Action Agenda Tracker" tool. The Action Agenda Tracker has since been retired and is no longer accessible.';
export const ACTIVITIES_SORT_NOTE =
  'Sort the table by Investment Type to identify different types of NEP Investments.';

// ── Featured activities (real records from IndexGridJsonData, chosen as the ─
// 6 highest-NEPInvestmentAmount rows among on-the-ground "NEP Project" type
// activities with a substantial Description — i.e., objectively selected,
// not curated for narrative effect).
export interface AtlasActivity {
  name: string;
  /** Root-relative path on the live NEP Atlas site (nepatlas.pugetsoundinfo.wa.gov). */
  href: string;
  description: string;
  owner: string;
  ownerHref: string;
  stage: 'Completed' | 'Implementation';
  contractStartYear: string;
  completionYear: string;
  vitalSign: string;
  county: string;
  geographicScope: string;
  nepInvestmentAmount: number;
  awardName: string;
}

export const FEATURED_ACTIVITIES: AtlasActivity[] = [
  {
    name: 'Whatcom County PIC Program',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1722',
    description:
      'Adapt the successful Whatcom County Pollution Identification and Correction (PIC) Program to address fecal bacteria sources during critical environmental conditions and in hot spots still impacting areas with tribal, commercial, or recreational shellfish harvest closures or declining water quality.',
    owner: 'Whatcom Flood Control',
    ownerHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/103',
    stage: 'Implementation',
    contractStartYear: '2023',
    completionYear: '2025',
    vitalSign: 'Shellfish Beds',
    county: 'Whatcom',
    geographicScope: 'Local',
    nepInvestmentAmount: 3015374,
    awardName: 'SIL - Shellfish',
  },
  {
    name: 'Newaukum Creek Acquisition and Restoration Plan',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/309',
    description:
      'Prepare a plan that would facilitate the future acquisition and restoration of Newaukum Creek riparian zones to benefit water quality and fish habitat. Future projects would be implemented within the Enumclaw Agricultural Production District. King County will partner with American Farmland Trust, King Conservation District, and the Green River Coalition.',
    owner: 'King County',
    ownerHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/9',
    stage: 'Completed',
    contractStartYear: '2016',
    completionYear: '2019',
    vitalSign: 'Freshwater, Salmon, Streams and Floodplains',
    county: 'King',
    geographicScope: 'Local',
    nepInvestmentAmount: 2853198,
    awardName: 'Watershed LO',
  },
  {
    name: 'Redondo Wastewater Treatment Plant Flow Diversion and Outfall Capacity Improvements-Preliminary Engineering',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1726',
    description:
      "The Redondo Wastewater Treatment Plant's (WWTP) collection system has excessive inflow and infiltration (I&I). This additional flow has caused sanitary sewer overflows into the environment, basement backups, and treatment plant upsets. In addition, it causes extended run times on pumps at pump stations and in extreme wet weather events, exceeds the treatment and conveyance capacities of the Redondo WWTP.",
    owner: 'Lakehaven Water and Sewer District',
    ownerHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/527',
    stage: 'Implementation',
    contractStartYear: '2023',
    completionYear: '2026',
    vitalSign: 'Shellfish Beds',
    county: 'King',
    geographicScope: 'Local',
    nepInvestmentAmount: 1449000,
    awardName: 'SIL - Shellfish',
  },
  {
    name: 'South Sound Shellfish Recovery',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1717',
    description:
      'The South Sound Shellfish Recovery Project is a multi-partner effort to reduce bacterial pollution sources to Shellfish Protection Districts in Mason, Thurston, and Pierce counties. Partners will perform planning, water quality monitoring, and perform education and outreach with the intent of upgrading shellfish growing area acreage in South Puget Sound.',
    owner: 'Pierce County',
    ownerHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/390',
    stage: 'Implementation',
    contractStartYear: '2023',
    completionYear: '2026',
    vitalSign: 'Shellfish Beds',
    county: 'Pierce',
    geographicScope: 'Sub-Regional',
    nepInvestmentAmount: 1185000,
    awardName: 'SIL - Shellfish',
  },
  {
    name: 'Legacy Roads Project',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/570',
    description:
      'The Olympic National Forest and the Mount Baker-Snoqualmie National Forest are completing the necessary planning and design work to close forest roads that contribute sediment to Puget Sound tributaries.',
    owner: 'USFS',
    ownerHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/355',
    stage: 'Completed',
    contractStartYear: '2009',
    completionYear: '2015',
    vitalSign: 'Forests and Wetlands, Freshwater',
    county: 'Mason',
    geographicScope: 'Local',
    nepInvestmentAmount: 1268000,
    awardName: 'Federal Agreements',
  },
  {
    name: 'Beach restoration through armor removal',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/440',
    description:
      'This sub-award to RCO funds the construction phase of three beach restoration designs funded with previous LO funds, at Fort Townsend, Bowman Bay, and Titlow.',
    owner: 'WA RCO',
    ownerHref: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/88',
    stage: 'Completed',
    contractStartYear: '2014',
    completionYear: '2017',
    vitalSign: 'Beaches and Marine Vegetation, Forage Fish, Forests and Wetlands, Orcas, Salmon',
    county: 'Thurston',
    geographicScope: 'Sub-Regional',
    nepInvestmentAmount: 1208100,
    awardName: 'Marine and Nearshore LO',
  },
];

// ── NEP Awards (from /Award/Index + /Award/IndexGridJsonData, all 14 rows) ──
export const AWARDS_INTRO_PARAGRAPH =
  'The table below displays a list of NEP awards, some of which are no longer active. Retired awards include: Marine and Nearshore Lead Organization; Pathogens Lead Organization; Stewardship Lead Organization; Toxics and Nutrients Lead Organization and Watershed Lead Organization.';

export interface AtlasAward {
  name: string;
  shortName: string;
  href: string;
  description: string;
  reportingLeads: string;
  nepInvestment: number;
  totalCost: number;
  leveragedFunds: number;
  retired: boolean;
}

export const AWARDS: AtlasAward[] = [
  {
    name: 'EPA Direct Grants',
    shortName: 'EPA Direct',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/10',
    description: 'Activities funded directly from EPA to project implementers.',
    reportingLeads: '',
    nepInvestment: 545493413,
    totalCost: 545493413,
    leveragedFunds: 0,
    retired: false,
  },
  {
    name: 'Federal Agreements',
    shortName: 'Federal Agreements',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/7',
    description: 'An agreement between EPA and another federal agency to fund implementation of recovery activities.',
    reportingLeads: 'Angela Adams, Catherine Gockel, Michael Rylko',
    nepInvestment: 47232672,
    totalCost: 47232672,
    leveragedFunds: 0,
    retired: false,
  },
  {
    name: 'Habitat Strategic Initiative Lead',
    shortName: 'SIL - Habitat',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/3',
    description:
      "The Habitat Strategic Initiative Lead (Habitat SIL) is supported by the National Estuary Program's Puget Sound geographic funds. Focused on the restoration and protection of habitat throughout Puget Sound, the Habitat SIL is co-led by the Washington State Departments of Fish & Wildlife (WDFW) and Natural Resources (DNR) and support is provided by the Washington State Department of Commerce.",
    reportingLeads: 'WDFW Administrator, Cynthia Catton, Jennifer Griffiths',
    nepInvestment: 59722753,
    totalCost: 63866956,
    leveragedFunds: 4144203,
    retired: false,
  },
  {
    name: 'Marine and Nearshore Lead Organization',
    shortName: 'Marine and Nearshore LO',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/11',
    description:
      'The Marine and Nearshore Protection and Restoration Lead Organization was a grant program supported by EPA National Estuary Program Puget Sound funds and administered by the Washington Departments of Fish and Wildlife and Natural Resources. Funds were awarded to implement priorities in the Puget Sound Action Agenda to protect and restore habitat and ecosystem functions.',
    reportingLeads: '',
    nepInvestment: 17184104,
    totalCost: 17184104,
    leveragedFunds: 0,
    retired: true,
  },
  {
    name: 'Northwest Indian Fisheries Commission',
    shortName: 'NWIFC',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/6',
    description:
      'Support to the Northwest Indian Fisheries Commission for implementation of projects of high tribal priority that are consistent with the Action Agenda.',
    reportingLeads: "Action Agenda Tracker Administrators, Caitlyn O'Connor",
    nepInvestment: 66364064.2,
    totalCost: 66364064.2,
    leveragedFunds: 0,
    retired: false,
  },
  {
    name: 'Pathogens Lead Organization',
    shortName: 'Pathogens LO',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/14',
    description:
      'The Pathogens Prevention, Reduction and Control Lead Organization was a grant program supported by EPA National Estuary Program Puget Sound funds and administered by the Washington Departments of Health and Ecology. Funds were awarded to implement priorities in the Puget Sound Action Agenda around prevention and reduction of pathogen pollution through management of human and animal wastes.',
    reportingLeads: '',
    nepInvestment: 17823065,
    totalCost: 17823065,
    leveragedFunds: 0,
    retired: true,
  },
  {
    name: 'Puget Sound Partnership Base and Science Award',
    shortName: 'PSP Base and Science',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/1',
    description:
      'This award supports the base operations of the Puget Sound Partnership, the lead organization for the Puget Sound National Estuary Program, as well as focusing on filling science gaps necessary to advance Puget Sound recovery through development and adaptive management of implementation strategies.',
    reportingLeads: 'Alex Mitchell',
    nepInvestment: 85420761.41,
    totalCost: 89312982.43,
    leveragedFunds: 3892221.02,
    retired: false,
  },
  {
    name: 'Puget Sound Riparian Systems Lead',
    shortName: 'Riparian Systems Lead',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/15',
    description:
      'The Puget Sound Riparian Systems Lead grant program focuses on protecting and restoring riparian areas that have been damaged or are struggling to support the plants, animals, and waters of Puget Sound. It also aims to maintain and learn from pristine riparian systems. The program supports riparian restoration programs that work with communities and landowners to improve the overall function of river and stream riparian systems.',
    reportingLeads: '',
    nepInvestment: 0,
    totalCost: 0,
    leveragedFunds: 0,
    retired: false,
  },
  {
    name: 'Shellfish Strategic Initiative Lead',
    shortName: 'SIL - Shellfish',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/4',
    description:
      "The Shellfish Strategic Initiative Lead (Shellfish SIL) is supported by the National Estuary Program's Puget Sound geographic funds. Focused on the restoration and protection of shellfish beds throughout Puget Sound, the Shellfish SIL is led by the Washington State Department of Health in partnership with the Departments of Ecology and Agriculture.",
    reportingLeads: 'Audrey Coyne, CLARA HARD',
    nepInvestment: 42960021.23,
    totalCost: 44490021.23,
    leveragedFunds: 1530000,
    retired: false,
  },
  {
    name: 'Stewardship Lead Organization',
    shortName: 'Stewardship LO',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/9',
    description:
      'The Stewardship Lead Organization was a grant program supported by EPA National Estuary Program Puget Sound funds and administered by the Puget Sound Partnership. Funds were awarded to implement priorities in the Puget Sound Action Agenda around activities such as behavior change and awareness programs and advancement of Puget Sound-related public-school curricula.',
    reportingLeads: 'Alex Mitchell',
    nepInvestment: 4573399,
    totalCost: 4573399,
    leveragedFunds: 0,
    retired: true,
  },
  {
    name: 'Stormwater Strategic Initiative Lead',
    shortName: 'SIL - Stormwater',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/5',
    description:
      "The Stormwater Strategic Initiative Lead (Stormwater SIL) is supported by the National Estuary Program's Puget Sound Geographic funds. Focused on reducing the impacts of stormwater throughout Puget Sound, the Stormwater SIL is led by the Washington State Department of Ecology in partnership with the Washington Stormwater Center at Washington State University and the Department of Commerce.",
    reportingLeads: 'Michelle Myers',
    nepInvestment: 46918880.2,
    totalCost: 48642470.2,
    leveragedFunds: 1723590,
    retired: false,
  },
  {
    name: 'Toxics and Nutrients Lead Organization',
    shortName: 'Toxics and Nutrients LO',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/12',
    description:
      'The Toxics and Nutrients Prevention, Reduction and Control Lead Organization was a grant program supported by EPA National Estuary Program Puget Sound funds and administered by the Washington Department of Ecology. Funds were awarded to implement priorities in the Puget Sound Action Agenda around preventing, reducing, and controlling toxics and nutrients from entering Puget Sound.',
    reportingLeads: '',
    nepInvestment: 20885128.25,
    totalCost: 20885128.25,
    leveragedFunds: 0,
    retired: true,
  },
  {
    name: 'Tribal Capacity',
    shortName: 'Tribal Capacity',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/8',
    description:
      'Support to increase the institutional capacity of Puget Sound tribes (19 tribes and three tribal consortia), facilitating participation in regional coordination boards and management conferences, as well as to implementing recovery activities consistent with the Action Agenda.',
    reportingLeads: 'Lisa Chang',
    nepInvestment: 105298083,
    totalCost: 105298083,
    leveragedFunds: 0,
    retired: false,
  },
  {
    name: 'Watershed Lead Organization',
    shortName: 'Watershed LO',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/13',
    description:
      'The Watershed Protection and Restoration Lead Organization was a grant program supported by EPA National Estuary Program Puget Sound funds and administered by the Washington Departments of Ecology and Commerce. Funds were awarded to implement priorities in the Puget Sound Action Agenda around improving land use, stormwater management and strategies for riparian and floodplain protection and restoration.',
    reportingLeads: '',
    nepInvestment: 28693435.23,
    totalCost: 28693435.23,
    leveragedFunds: 0,
    retired: true,
  },
];

// ── Investment Summary section (from /Activity/Summary) ────────────────────
export const INVESTMENT_SUMMARY_PARAGRAPHS: string[] = [
  'This page summarizes NEP investments by topic (Vital Signs) and geography (Lead Entity Management Area). Use the filters to customize the charts, and see a list and links to related activities in the table at the bottom of the page.',
  'The bars in the chart are broken out by the different NEP Awards (e.g., SIL - Shellfish) that funded the activities, not by the organizations that received the funding to implement specific activities. The Northwest Indian Fisheries Commission (NWIFC) is both a funder (NEP Award) and a funding recipient for different NEP awards. The chart below only includes activities that were funded by the NWIFC NEP Award.',
];

// ── Tool links out to the live NEP Atlas app (map + full tables) ───────────
export interface AtlasToolLink {
  title: string;
  blurb: string;
  href: string;
}

export const ATLAS_TOOLS: AtlasToolLink[] = [
  {
    title: 'Activities Map',
    blurb: 'View a map of these NEP-funded activities.',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Home/NepAtlasMap',
  },
  {
    title: 'Activities List',
    blurb: 'Sort the table by Investment Type to identify different types of NEP Investments.',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Index',
  },
  {
    title: 'NEP Awards',
    blurb: 'The table below displays a list of NEP awards, some of which are no longer active.',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Index',
  },
  {
    title: 'Investment Summary',
    blurb: 'This page summarizes NEP investments by topic (Vital Signs) and geography (Lead Entity Management Area).',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Summary',
  },
  {
    title: 'Download Full NEP Activity Database',
    blurb: 'Download the full database as an Excel file.',
    href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/NepActivityFullExcelDownload',
  },
];

// ── Funders (footer copy, home page) ────────────────────────────────────────
export const FUNDERS = [
  { name: 'Puget Sound Partnership', href: 'http://www.psp.wa.gov' },
  { name: 'U.S. Environmental Protection Agency', href: 'https://www.epa.gov/puget-sound' },
];

// ── Gaps: content this file does NOT include, and why ──────────────────────
// 1. The Activities Map (/Home/NepAtlasMap) is an ArcGIS/Leaflet map rendered
//    entirely client-side into an empty <div id="ntaActivitiesMapDivID">; the
//    static HTML response is ~34MB of map tiles/JS assets with zero server-
//    rendered map content to extract. Represented here only via its real
//    intro copy + a link out (ATLAS_TOOLS).
// 2. The Investment Summary bar charts (/Activity/VitalSignsSummaryTab,
//    /Activity/GeographySummaryTab) are an AngularJS app (ng-controller=
//    "SummaryTabVitalSignsController") fed by a large embedded JSON blob —
//    no chart data or axis labels exist in server-rendered markup. Only the
//    page's own real intro paragraphs are captured (INVESTMENT_SUMMARY_
//    PARAGRAPHS); the charts themselves are not reproduced.
// 3. Per-Vital-Sign and per-geography dollar breakdowns are intentionally not
//    computed here even though the raw activity records carry a VitalSign
//    field — most records tag multiple Vital Signs in one compound string
//    (e.g. "Freshwater, Salmon, Streams and Floodplains"), and attributing a
//    dollar total to each tag is exactly the job the JS-only Investment
//    Summary charts already do with their own methodology. Reproducing it
//    here risked a number that looks authoritative but isn't the source's.
