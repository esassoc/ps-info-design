// src/data/pages/nep-atlas.ts — content for the NEP Atlas unit
// (Implementation & Funding module).
//
// Covers the module HOME page plus its five module-nav child pages — no
// longer a single-URL reproduction. All six prod URLs, fetched 2026-07-22:
//   - https://nepatlas.pugetsoundinfo.wa.gov/                    (home)
//   - https://nepatlas.pugetsoundinfo.wa.gov/Home/About          (About)
//   - https://nepatlas.pugetsoundinfo.wa.gov/Home/NepAtlasMap    (NEP Activity Map)
//   - https://nepatlas.pugetsoundinfo.wa.gov/Activity/Index      (NEP Activities) + its
//     /Activity/IndexGridJsonData feed (1,614 rows — 12 real rows carried, see ACTIVITY_ROWS)
//   - https://nepatlas.pugetsoundinfo.wa.gov/Award/Index         (NEP Awards) + its
//     /Award/IndexGridJsonData feed (14 rows — FULL dataset carried, see AWARD_ROWS)
//   - https://nepatlas.pugetsoundinfo.wa.gov/Activity/Summary    (NEP Investment Summaries) +
//     its two tab fragments (Activities by Vital Signs / Activities by Geography), whose
//     charts are derived from the page's own inlined 1,608-activity payload (see
//     SUMMARY_BY_VITAL_SIGN / SUMMARY_BY_LEMA derivation note below)
//
// Full sourcing notes, verbatim inventories, and truncation accounting live in
// src/data/contracts/nep-atlas.md.

// ── Nav / hero ───────────────────────────────────────────────────────────────
export const SOURCE_URL = 'https://nepatlas.pugetsoundinfo.wa.gov/';
export const PAGE_TITLE = 'NEP Atlas';
// Source's own site-title banner is set in shouting caps
// ("PUGET SOUND NATIONAL ESTUARY PROGRAM ATLAS"); sentence-cased here per this
// prototype's no-ornamental-caps rule. Promoted to the HERO TITLE (was
// PAGE_EYEBROW) per the standard page pattern — module banner text becomes
// the hero H1 on the main page; sub-pages use it as their eyebrow instead.
export const HERO_TITLE = 'Puget Sound National Estuary Program Atlas';
export const PAGE_LEDE =
  'The National Estuary Program (NEP) Atlas tracks and shares information about Puget Sound NEP investments, activities, and accomplishments.';

// ── Inline link segments (shared shape) ─────────────────────────────────────
// Mirrors PsInfoAboutNarrative's segment model (src/data/pages/about.ts) so a
// narrative-prose component can render verbatim paragraphs with links kept in
// their original sentence position. Kept local to this file rather than
// importing about.ts's types, since PsInfoNepAtlasNarrative's Props type is
// against these shapes specifically.
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

// A block within a longer narrative — either an ordinary paragraph or a list
// of items (each item's segments render as one <li>). Added for the About
// page's 7-item funding-recipients list.
export type AtlasBlock =
  | { kind: 'paragraph'; paragraph: AtlasParagraph }
  | { kind: 'list'; items: AtlasParagraph[] };

// ── 1. Welcome to the NEP Atlas (home page) ─────────────────────────────────
// Source floats one photograph to the right of this paragraph, inline inside
// the "Welcome to the NEP Atlas" heading itself; promoted here to the page's
// photo-header hero (see WELCOME_PHOTO below) rather than a side photo, since
// it's the source's only home-page photograph and this unit is a photo-header unit.
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
    // "Environmental Protection Agency"), both pointing at the same EPA page
    // (http vs https, otherwise identical path); kept as two link segments to
    // match the source markup exactly. The source's first anchor text is
    // "U.S. " (a trailing non-breaking space inside the anchor itself),
    // which is what visually separates the two anchors into "U.S.
    // Environmental Protection Agency" rather than gluing them together —
    // reproduced here as a plain text segment between the two links so the
    // rendered phrase matches the source exactly.
    { type: 'link', link: { kind: 'external', text: 'U.S.', href: 'http://www.epa.gov/puget-sound/epa-geographic-funding-work-puget-sound-recovery' } },
    { type: 'text', text: ' ' },
    { type: 'link', link: { kind: 'external', text: 'Environmental Protection Agency', href: 'https://www.epa.gov/puget-sound/epa-geographic-funding-work-puget-sound-recovery' } },
    { type: 'text', text: '. The NEP Atlas is updated periodically as new investments are made around the region.' },
  ],
};

// The home page's only real photograph (1920×1080 in source, alt="" in
// source — no source-supplied alt text). Used as the header hero image on
// ALL SIX pages in this lane (see the per-page .astro files); see
// src/data/contracts/nep-atlas.md Header + Gaps for full sourcing notes on
// why this is the flagship image and why the alt string below is a
// reasonable, non-fabricated accessibility description rather than copied
// source caption content.
export const WELCOME_PHOTO = {
  image: '/photos/nep-atlas/estuary-welcome.jpg',
  alt: 'A logjam and truss bridge on a Puget Sound tributary river, mountains in the background',
};

// ── 2. Map teaser ────────────────────────────────────────────────────────────
// Source centers a clickable map-preview block directly under the welcome
// paragraph: an <a href="/Home/NepAtlasMap" aria-label="NEP Atlas Map"> wraps
// an empty <div id="ntaActivitiesMapDivID"> — a Leaflet mount point with zero
// map imagery in the server-rendered HTML — followed by a second, real text
// link, "Click to view the full map", to the same destination. Now that this
// lane builds the map page itself, the link target is INTERNAL — the
// prototype's own /map route — rather than prod's absolute /Home/NepAtlasMap.
export const MAP_TEASER = {
  route: '/prototypes/nep-atlas/map',
  linkText: 'Click to view the full map', // verbatim
};

// ── 2b. Activities map (interactive reproduction) ───────────────────────────
// The saved prod home page inlines a projectLocationsMapInitJson blob (one
// "Activities" vector layer, 1,614 GeoJSON point features) that client JS
// mounts into #ntaActivitiesMapDivID (height: 400px, per the page's own
// inline style). We reproduce the map's PRESENCE and interaction — Leaflet,
// colored point markers, popups — but every project point below is INVENTED
// (names, lead orgs, coordinates), per the brief ("the Leaflet map stays" as
// our representative stand-in). Only two things are borrowed from the source
// because they are public vocabulary, not records: the activity-type
// taxonomy labels and the map's own marker palette hexes.
export interface AtlasMapConfig {
  /** [lat, lng] map center — Puget Sound. */
  center: [number, number];
  zoom: number;
  /** Mirrors prod's own inline #ntaActivitiesMapDivID { height: 400px }. */
  heightPx: number;
  /** The source's own accessible name for its map block (aria-label on the teaser link). */
  ariaLabel: string;
}

export const MAP_CONFIG: AtlasMapConfig = {
  center: [47.8, -122.5],
  zoom: 8,
  heightPx: 400,
  ariaLabel: 'NEP Atlas Map',
};

export interface AtlasMapCategory {
  id: string;
  /** Label from the source's public activity-type taxonomy. */
  label: string;
  /** Hex from the source map's own marker palette. */
  color: string;
}

export const ATLAS_MAP_CATEGORIES: AtlasMapCategory[] = [
  { id: 'restoration', label: 'Ecosystem Restoration Implementation', color: '#4b8059' },
  { id: 'planning',    label: 'Project Planning and Design',          color: '#f18c21' },
  { id: 'capacity',    label: 'Capacity Building and Coordination',   color: '#013d5b' },
  { id: 'research',    label: 'Research',                             color: '#c6b42f' },
  { id: 'education',   label: 'Education and Awareness',              color: '#d34727' },
  { id: 'monitoring',  label: 'Status and Trends Monitoring',         color: '#f6b330' },
];

export interface AtlasMapPoint {
  /** Invented project name — never a record from the source feed. */
  name: string;
  categoryId: AtlasMapCategory['id'];
  /** Invented (fictional) lead organization. */
  leadOrg: string;
  /** [lat, lng]. Plausible Puget Sound shoreline/lowland locations, invented. */
  coords: [number, number];
}

export const ATLAS_MAP_POINTS: AtlasMapPoint[] = [
  { name: 'Ellsworth Slough Tidal Reconnection',            categoryId: 'restoration', leadOrg: 'Salish Shores Land Trust',          coords: [48.339, -122.386] },
  { name: 'Madrona Creek Culvert Replacement Design',       categoryId: 'planning',    leadOrg: 'Cedar Basin Conservation District', coords: [47.267, -122.413] },
  { name: 'Shoreline Armoring Removal at Gull Point',       categoryId: 'restoration', leadOrg: 'North Sound Estuary Alliance',      coords: [48.223, -122.686] },
  { name: 'Stormwater Retrofit Partnership Pilot',          categoryId: 'capacity',    leadOrg: 'Cascadia Stormwater Collaborative', coords: [47.542, -122.336] },
  { name: 'Eelgrass Recovery Monitoring',                   categoryId: 'monitoring',  leadOrg: 'Salish Sea Research Cooperative',   coords: [48.535, -123.017] },
  { name: 'Shellfish Growing Area Pollution Identification', categoryId: 'research',   leadOrg: 'Inlet Waters Institute',            coords: [47.451, -122.827] },
  { name: 'Rain Garden Education Program',                  categoryId: 'education',   leadOrg: 'Puget Streamkeepers Network',       coords: [47.978, -122.202] },
  { name: 'Forage Fish Spawning Beach Surveys',             categoryId: 'monitoring',  leadOrg: 'Salish Sea Research Cooperative',   coords: [48.117, -122.760] },
  { name: 'Floodplain Easement Acquisition Feasibility',    categoryId: 'planning',    leadOrg: 'Cedar Basin Conservation District', coords: [47.086, -122.704] },
  { name: 'Riparian Buffer Replanting',                     categoryId: 'restoration', leadOrg: 'Puget Streamkeepers Network',       coords: [47.045, -122.900] },
  { name: 'Small Farms Runoff Reduction Incentives',        categoryId: 'capacity',    leadOrg: 'North Sound Estuary Alliance',      coords: [48.752, -122.503] },
  { name: 'Kelp Forest Extent Mapping',                     categoryId: 'research',    leadOrg: 'Inlet Waters Institute',            coords: [48.152, -123.133] },
  { name: 'Green Shorelines Workshop Series',                categoryId: 'education',   leadOrg: 'North Sound Estuary Alliance',      coords: [47.615, -122.690] },
  { name: 'Pocket Estuary Restoration at Alder Cove',       categoryId: 'restoration', leadOrg: 'Salish Shores Land Trust',          coords: [47.447, -122.459] },
];

// ── 3. Funding provided by (home page) ──────────────────────────────────────
// Verbatim pipe-separated "FUNDING PROVIDED BY" strip from the home page
// (source is shouting-case; sentence-cased per this repo's no-ornamental-caps
// rule, see HERO_TITLE above for the same normalization elsewhere on this page).
export const FUNDERS: { name: string; href: string }[] = [
  { name: 'Puget Sound Partnership', href: 'http://www.psp.wa.gov' },
  { name: 'U.S. Environmental Protection Agency', href: 'https://www.epa.gov/puget-sound' },
];

// FUNDERS rendered through the same AtlasParagraph/segment model as the
// welcome paragraph (pipe-separated, matching the source's own presentation)
// so it can go through PsInfoNepAtlasNarrative without any page-level markup.
export const FUNDERS_PARAGRAPH: AtlasParagraph = {
  segments: [
    { type: 'link', link: { kind: 'external', text: FUNDERS[0].name, href: FUNDERS[0].href } },
    { type: 'text', text: ' | ' },
    { type: 'link', link: { kind: 'external', text: FUNDERS[1].name, href: FUNDERS[1].href } },
  ],
};

// ── Module nav (band under the photo header, every page in this lane) ──────
// Verbatim from prod's OWN module bar (the mainNavbar nav rendered inside the
// nepatlas.pugetsoundinfo.wa.gov shell) — NOT the sitewide "Puget Sound Info /
// Explore" mega-menu, which is also present in the saved DOM and is
// deliberately NOT reproduced (the app shell rail carries that IA).
export type AtlasNavCurrent = 'about' | 'map' | 'activities' | 'awards' | 'investment-summary';

export interface AtlasNavLeaf {
  /** Verbatim prod link text. */
  label: string;
  current: AtlasNavCurrent;
  /** This prototype's route. */
  route: string;
  /** Verbatim prod href (provenance). */
  prodHref: string;
  /** Verbatim title="" attribute where prod carries one. */
  prodTitle?: string;
}

export interface AtlasNavItem {
  /** Verbatim cell label. */
  label: string;
  /** Plain link cell. */
  leaf?: AtlasNavLeaf;
  /** Disclosure cell (prod dropdown). */
  children?: AtlasNavLeaf[];
}

export const MODULE_NAV: AtlasNavItem[] = [
  { label: 'About', leaf: { label: 'About', current: 'about', route: '/prototypes/nep-atlas/about', prodHref: '/Home/About', prodTitle: 'About the NEP Atlas' } },
  { label: 'Activities', children: [
    { label: 'Map', current: 'map', route: '/prototypes/nep-atlas/map', prodHref: '/Home/NepAtlasMap', prodTitle: 'View the NEP Atlas' },
    { label: 'Full List', current: 'activities', route: '/prototypes/nep-atlas/activities', prodHref: '/Activity/Index' },
  ] },
  { label: 'NEP Awards', leaf: { label: 'NEP Awards', current: 'awards', route: '/prototypes/nep-atlas/awards', prodHref: '/Award/Index', prodTitle: 'NEP Awards' } },
  { label: 'Summaries', children: [
    { label: 'Investment Summary', current: 'investment-summary', route: '/prototypes/nep-atlas/investment-summary', prodHref: '/Activity/Summary' },
  ] },
];

// ── About page (/Home/About) ────────────────────────────────────────────────
// Verbatim from /Home/About. Source `&nbsp;` normalized to plain spaces
// (noted here once; applies throughout this file). Source wraps every anchor
// in <strong> — carried as plain links (bold emphasis dropped), noted in the
// contract.
export const ABOUT_PAGE = {
  title: 'About', // verbatim breadcrumbTitle
  blocks: [
    {
      kind: 'paragraph',
      paragraph: {
        segments: [
          { type: 'text', text: 'The National Estuary Program (NEP) Atlas is an online, interactive tool composed of maps, tables, charts, and links to reports pertaining to all activities funded through the ' },
          { type: 'link', link: { kind: 'external', text: 'U.S. Environmental Protection Agency Puget Sound NEP', href: 'http://www.psp.wa.gov/NEP-overview.php' } },
          { type: 'text', text: '. The main purpose of the NEP Atlas is to consistently track and communicate investments, activities, and accomplishments related to Puget Sound recovery priorities, as identified in the ' },
          // Prod href was https://actionagenda.pugetsoundinfo.wa.gov/ — a
          // pugetsoundinfo.wa.gov subdomain, internal under the unified shell;
          // remapped to this prototype's own Action Agenda page (see contract).
          { type: 'link', link: { kind: 'internal', text: 'Action Agenda', route: '/prototypes/action-agenda' } },
          { type: 'text', text: ', ' },
          { type: 'link', link: { kind: 'external', text: 'Implementation Strategies', href: 'https://www.psp.wa.gov/implementation-strategies.php' } },
          { type: 'text', text: ', and ' },
          { type: 'link', link: { kind: 'external', text: 'local ecosystem recovery plans', href: 'https://www.psp.wa.gov/LIO-overview.php' } },
          { type: 'text', text: '.' }, // period sits outside the anchor in source
        ],
      },
    },
    {
      kind: 'paragraph',
      paragraph: {
        segments: [
          { type: 'text', text: 'The NEP Atlas provides a range of tools for NEP funding recipients to showcase their accomplishments and disseminate information about their work. NEP funding recipients include:' },
        ],
      },
    },
    {
      kind: 'list',
      items: [
        { segments: [{ type: 'link', link: { kind: 'external', text: 'Local Integrating Organizations', href: 'https://www.psp.wa.gov/LIO-overview.php' } }] },
        { segments: [{ type: 'link', link: { kind: 'external', text: 'Northwest Indian Fisheries Commission', href: 'https://nwifc.org/' } }] },
        { segments: [{ type: 'link', link: { kind: 'external', text: 'Northwest Straits Commission', href: 'http://www.nwstraits.org/' } }] },
        { segments: [{ type: 'link', link: { kind: 'external', text: 'Puget Sound Partnership', href: 'http://www.psp.wa.gov' } }] },
        { segments: [
          { type: 'link', link: { kind: 'external', text: 'Strategic Initiative Lead - Habitat', href: 'https://pugetsoundestuary.wa.gov/habitat-strategic-initiative/' } },
          { type: 'text', text: ' (Washington State Department of Fish and Wildlife, Washington State Department of Natural Resources)' },
        ] },
        { segments: [
          { type: 'link', link: { kind: 'external', text: 'Strategic Initiative Lead - Shellfish', href: 'https://pugetsoundestuary.wa.gov/shellfish-strategic-initiative/' } },
          { type: 'text', text: ' (Washington State Department of Health)' },
        ] },
        { segments: [
          { type: 'link', link: { kind: 'external', text: 'Strategic Initiative Lead - Stormwater', href: 'https://pugetsoundestuary.wa.gov/stormwater-strategic-initiative/' } },
          { type: 'text', text: ' (Washington State Department of Ecology, Washington Stormwater Center, Washington State Department of Commerce)' },
        ] },
      ],
    },
    {
      kind: 'paragraph',
      paragraph: {
        segments: [
          { type: 'link', link: { kind: 'external', text: 'See more about the Puget Sound National Estuary Program', href: 'https://www.psp.wa.gov/NEP-overview.php' } },
          { type: 'text', text: '.' },
        ],
      },
    },
  ] as AtlasBlock[],
};

// Source floats these three as an inline 3-up strip between blocks 1 and 2;
// source alt="" on all three (decoded from the page's own base64 payload —
// real prod photographs). Alts below are ours, same policy the hero photo's
// alt already uses.
export const ABOUT_PHOTOS = [
  { image: '/photos/nep-atlas/about-shellfish.jpg',    alt: 'Two field workers inspect rows of netted shellfish bags on a Puget Sound tide flat at low tide' },
  { image: '/photos/nep-atlas/about-beach.jpg',        alt: 'Waves wash onto a gravel Puget Sound beach under a broken sky' },
  { image: '/photos/nep-atlas/about-fishing-nets.jpg', alt: 'Stacked fishing nets and floats on a dock with commercial fishing boats moored behind' },
];

// ── Map page (/Home/NepAtlasMap) ────────────────────────────────────────────
// Verbatim from /Home/NepAtlasMap; prod typos "incoporated" and "activties"
// preserved verbatim with [sic] noted here.
export const MAP_PAGE = {
  title: 'NEP Activity Map',
  paragraphs: [
    {
      segments: [
        { type: 'text', text: 'Please note: Near Term Action (NTAs) funded by the Strategic Initiative Leads have been incoporated into the NEP Atlas and appear in the map, below. NTAs (including NTAs funded by the Strategic Initiative Leads) were formerly tracked in the "Action Agenda Tracker" tool. The Action Agenda Tracker has since been retired and is no longer accessible.' }, // "incoporated" [sic] — prod's own typo, kept verbatim
      ],
    },
    {
      segments: [
        { type: 'text', text: 'The map below shows the location of activities funded by the ' },
        { type: 'link', link: { kind: 'external', text: 'EPA Puget Sound National Estuary Program', href: 'https://www.epa.gov/nep' } },
        { type: 'text', text: '. Click on a point to view a summary of the activity in the table below. Use the filters to focus on a particular type of activity or investment, or refine the map to only show activities associated with a specific Vital Sign.' },
      ],
    },
    {
      segments: [
        { type: 'text', text: 'Please note that activties without any spatial data will not display on this page. For a full, tabular list of these activities and chart summaries, see ' }, // "activties" [sic] — prod's own typo, kept verbatim
        { type: 'link', link: { kind: 'internal', text: 'NEP Activities', route: '/prototypes/nep-atlas/activities' } },
        // source has NO closing period on this sentence — kept none, verbatim.
      ],
    },
  ] as AtlasParagraph[],
  // DEVIATION: prod's legend is titled "NEP Award" (award colors); our
  // stand-in markers are colored by the activity-type taxonomy
  // (ATLAS_MAP_CATEGORIES), so the legend is titled with that prod field name
  // instead. Recorded in the contract.
  legendTitle: 'Activity Type',
  tableColumns: ['Name', 'Activity Type', 'Lead Organization'],
  tableHeader: (n: number, total: number) => `${n} of ${total} Activities in Map View`, // verbatim prod card-header pattern
};

// ── Activities page (/Activity/Index) ───────────────────────────────────────
export const ACTIVITIES_PAGE = {
  title: 'NEP Activities',
  paragraphs: [
    {
      segments: [
        { type: 'text', text: 'Please note: Near Term Action (NTAs) funded by the Strategic Initiative Leads have been incorporated into the NEP Atlas and appear in the list, below. NTAs (including NTAs funded by the Strategic Initiative Leads) were formerly tracked in the "Action Agenda Tracker" tool. The Action Agenda Tracker has since been retired and is no longer accessible.' }, // this page spells "incorporated" correctly — only the map page has the typo
      ],
    },
    {
      segments: [
        { type: 'text', text: 'Click on an activity name below to view its details. Sort the table by Investment Type to identify different types of NEP Investments. Alternatively, you can ' }, // source bolds "Investment Type" and the link — carried as plain text/link
        { type: 'link', link: { kind: 'internal', text: 'view a map', route: '/prototypes/nep-atlas/map' } },
        { type: 'text', text: ' of these NEP-funded activities.' },
      ],
    },
  ] as AtlasParagraph[],
};

export const GRID_CLEAR_FILTERS_LABEL = '(clear filters)'; // verbatim
export const GRID_DOWNLOAD_LABEL = 'Download Table'; // verbatim
export const ACTIVITIES_FULL_DOWNLOAD = {
  label: 'Download Full NEP Activity Database', // verbatim
  href: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/NepActivityFullExcelDownload', // prod route, internal host => same tab, no mark
  title: 'Download the full database as an Excel file', // verbatim title attr
};
export const activitiesCountText = (shown: number, total: number) =>
  `Currently Viewing ${shown} out of ${total} NEP Activities`; // verbatim prod pattern
export const awardsCountText = (shown: number, total: number) =>
  `Currently Viewing ${shown} out of ${total} NEP Awards`; // verbatim prod pattern

// Activity grid data — REPRESENTATIVE SUBSET, 12 real rows of the 1,614-row
// /Activity/IndexGridJsonData feed (fetched 2026-07-22), chosen to span all
// three Investment Types and 8 of the 14 NEP Awards. TRUNCATION, recorded
// honestly: prod's grid has 32 columns and 1,614 rows; this file carries 13
// columns × 12 rows. Full prod column list (verbatim headerNames): Activity
// Name, Activity ID, Description, Activity Stage, NEP Award, Investment
// Type, Contract Start Year, Completion Year, Owner Organization, Primary
// Contact, Partner Organizations, Geographic Scope, Latitude, Longitude,
// Location Notes, Local Area, County, Lead Entity Management Area,
// Legislative District, Activity Type, Vital Sign, Area of Interest, 2022
// Action Agenda Strategy, 2022 Action Agenda Action, 2022 Action Agenda
// Desired Outcome, Related NEP Activities, Related Ongoing Programs,
// Activity Website, NEP Investment Amount, Leveraged Funds, Total Cost, Last
// Updated. See src/data/contracts/nep-atlas.md for the full accounting.
export const ACTIVITY_FEED_TOTAL = 1614; // rows in prod's IndexGridJsonData feed
export const SUMMARY_ACTIVITIES_TOTAL = 1608; // AllActivities.length in prod's summary-tab data

export interface AtlasActivityRow {
  name: string;
  /** Prod absolute /Activity/Detail/N URL. */
  detailHref: string;
  activityId: string;
  stage: string;
  award: string;
  investmentType: string;
  startYear: string;
  completionYear: string;
  org: string;
  county: string;
  activityType: string;
  vitalSign: string;
  nepInvestment: number | null;
  totalCost: number | null;
  // Prod's own shortened display fields (verbatim from prod's summary data;
  // used by the summary-page related-activities table).
  duration: string;
  activityTypeShort: string;
  vitalSignShort: string;
  lemaShort: string | null;
}

export const ACTIVITY_GRID_COLUMNS = [
  { colId: 'ActivityName', header: 'Activity Name' },
  { colId: 'ActivityID', header: 'Activity ID' },
  { colId: 'ActivityStage', header: 'Activity Stage' },
  { colId: 'NEPAward', header: 'NEP Award' },
  { colId: 'InvestmentType', header: 'Investment Type' },
  { colId: 'ContractStartYear', header: 'Contract Start Year' },
  { colId: 'CompletionYear', header: 'Completion Year' },
  { colId: 'OwnerOrganization', header: 'Owner Organization' },
  { colId: 'County', header: 'County' },
  { colId: 'ActivityType', header: 'Activity Type' },
  { colId: 'VitalSign', header: 'Vital Sign' },
  { colId: 'NEPInvestmentAmount', header: 'NEP Investment Amount' },
  { colId: 'TotalCost', header: 'Total Cost' },
] as const;

// The 12 rows below are ALL VALUES VERBATIM from the /Activity/IndexGridJsonData
// feed (fetched 2026-07-22). Prod feed quirks kept verbatim: row 1862 has
// empty County/CompletionYear; award short names ("SIL - Stormwater") are the
// feed's own display text; duration/"5 selected"/"Soundwide" shortened
// strings are prod's own display fields, not ours.
export const ACTIVITY_ROWS: AtlasActivityRow[] = [
  { name: '179th Street Vault and French Creek Stream Daylighting', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1862', activityId: 'WQNEPSW-2025-SnCoEF-00028', stage: 'Implementation', award: 'SIL - Stormwater', investmentType: 'NEP Project', startYear: '2025', completionYear: '', org: 'Snohomish County', county: '', activityType: 'Project Planning and Design', vitalSign: 'Freshwater', nepInvestment: 862300, totalCost: 862300, duration: '2025 - ?', activityTypeShort: 'Project Planning and Design', vitalSignShort: 'Freshwater', lemaShort: null },
  { name: 'Whatcom County PIC Program', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1722', activityId: 'SFSIL NpRFP2022_Whatcom', stage: 'Implementation', award: 'SIL - Shellfish', investmentType: 'NEP Project', startYear: '2023', completionYear: '2025', org: 'Whatcom Flood Control', county: 'Whatcom', activityType: 'Education and Awareness, Incentives, Research, Status and Trends Monitoring, Technical Assistance and Training', vitalSign: 'Shellfish Beds', nepInvestment: 3015374, totalCost: 3015374, duration: '2023 - 2025', activityTypeShort: '5 selected', vitalSignShort: 'Shellfish Beds', lemaShort: 'Nooksack' },
  { name: 'Newaukum Creek Acquisition and Restoration Plan', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/309', activityId: 'WAT_0091', stage: 'Completed', award: 'Watershed LO', investmentType: 'NEP Project', startYear: '2016', completionYear: '2019', org: 'King County', county: 'King', activityType: 'Ecosystem Restoration Implementation', vitalSign: 'Freshwater, Salmon, Streams and Floodplains', nepInvestment: 2853198, totalCost: 2853198, duration: '2016 - 2019', activityTypeShort: 'Ecosystem Restoration Implementation', vitalSignShort: 'Freshwater, Salmon, Streams and Floodplains', lemaShort: 'Duwamish - Green' },
  { name: 'Program Administration', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/251', activityId: 'PAT_0048', stage: 'Completed', award: 'Pathogens LO', investmentType: 'NEP Project', startYear: '2011', completionYear: '2017', org: 'WA DOH', county: 'Clallam, Island, Jefferson, King, Kitsap, Lewis, Mason, Pierce, San Juan, Skagit, Snohomish, Thurston, Whatcom', activityType: 'Ecosystem Restoration Implementation', vitalSign: 'Outdoor Activity, Shellfish Beds', nepInvestment: 2051509, totalCost: 2051509, duration: '2011 - 2017', activityTypeShort: 'Ecosystem Restoration Implementation', vitalSignShort: 'Outdoor Activity, Shellfish Beds', lemaShort: 'Soundwide' },
  { name: 'Stillaguamish Floodplain Acquisitions and Restoration', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1448', activityId: 'HSIL NTA_2018-0218', stage: 'Completed', award: 'SIL - Habitat', investmentType: 'NEP Project', startYear: '2019', completionYear: '2020', org: 'Stillaguamish Tribe', county: 'Snohomish', activityType: 'Acquisition and Easements', vitalSign: 'Salmon, Streams and Floodplains', nepInvestment: 100000, totalCost: 2014000, duration: '2019 - 2020', activityTypeShort: 'Acquisition and Easements', vitalSignShort: 'Salmon, Streams and Floodplains', lemaShort: 'Stillaguamish' },
  { name: 'Assessment of the Geomorphological and Ecological Consequences of Dike Breaching vs. Dike Removal for Estuarine Habitat Restoration', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/84', activityId: 'TRI_0061', stage: 'Completed', award: 'NWIFC', investmentType: 'NEP Project', startYear: '2011', completionYear: '2015', org: 'Skagit Coop', county: 'Skagit', activityType: 'Research', vitalSign: 'Estuaries, Salmon, Streams and Floodplains', nepInvestment: 557083, totalCost: 557083, duration: '2011 - 2015', activityTypeShort: 'Research', vitalSignShort: 'Estuaries, Salmon, Streams and Floodplains', lemaShort: 'Skagit' },
  { name: 'Habitat SIL 2.0 Capacity', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1538', activityId: 'HSIL2.0-Capacity', stage: 'Implementation', award: 'SIL - Habitat', investmentType: 'NEP Capacity', startYear: '2021', completionYear: '2028', org: 'WDFW', county: 'Clallam, Island, Jefferson, King, Kitsap, Lewis, Mason, Pierce, San Juan, Skagit, Snohomish, Thurston, Whatcom', activityType: 'Capacity Building and Coordination, Mobilizing Funding', vitalSign: 'Beaches and Marine Vegetation, Estuaries, Forests and Wetlands, Streams and Floodplains', nepInvestment: 7863974, totalCost: 7863974, duration: '2021 - 2028', activityTypeShort: 'Capacity Building and Coordination, Mobilizing Funding', vitalSignShort: '4 selected', lemaShort: 'Soundwide' },
  { name: 'Science support for Puget Sound Recovery (2022-2025)', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/972', activityId: 'IMP_0397', stage: 'Implementation', award: 'PSP Base and Science', investmentType: 'NEP Capacity', startYear: '2022', completionYear: '2025', org: 'UW', county: 'Clallam, Island, Jefferson, King, Kitsap, Lewis, Mason, Pierce, San Juan, Skagit, Snohomish, Thurston, Whatcom', activityType: 'Capacity Building and Coordination, Research', vitalSign: 'Air Quality, Beaches and Marine Vegetation, Birds, Cultural Wellbeing, Drinking Water, Economic Vitality, Estuaries, Forage Fish, Forests and Wetlands, Freshwater, Good Governance, Local Foods, Marine Water, Orcas, Outdoor Activity, Salmon, Sense of Place, Shellfish Beds, Sound Stewardship, Streams and Floodplains, Toxics in Aquatic Life', nepInvestment: 5563398, totalCost: 5958750, duration: '2022 - 2025', activityTypeShort: 'Capacity Building and Coordination, Research', vitalSignShort: '21 selected', lemaShort: 'Soundwide' },
  { name: 'Habitat SIL 1.0 Capacity', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1151', activityId: 'HSIL1.0-Capacity', stage: 'Completed', award: 'SIL - Habitat', investmentType: 'NEP Capacity', startYear: '2016', completionYear: '2024', org: 'WDFW', county: 'Clallam, Island, Jefferson, King, Kitsap, Lewis, Mason, Pierce, San Juan, Skagit, Snohomish, Thurston, Whatcom', activityType: 'Capacity Building and Coordination', vitalSign: 'Beaches and Marine Vegetation, Estuaries, Forests and Wetlands, Salmon, Streams and Floodplains', nepInvestment: 5170227, totalCost: 5170227, duration: '2016 - 2024', activityTypeShort: 'Capacity Building and Coordination', vitalSignShort: '5 selected', lemaShort: 'Soundwide' },
  { name: 'Habitat Strategic Initiative Lead grant 1.0', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1873', activityId: 'DIR_HSIL1.0', stage: 'Completed', award: 'EPA Direct', investmentType: 'NEP Program Grant', startYear: '2016', completionYear: '2021', org: 'WDFW', county: 'Clallam, Island, Jefferson, King, Kitsap, Lewis, Mason, Pierce, San Juan, Skagit, Snohomish, Thurston, Whatcom', activityType: 'Acquisition and Easements, Capacity Building and Coordination, Ecosystem Recovery Planning, Education and Awareness, Effectiveness Evaluation, Incentives, Mobilizing Funding, Research, Species Management, Status and Trends Monitoring, Technical Assistance and Training', vitalSign: 'Beaches and Marine Vegetation, Estuaries, Forests and Wetlands, Streams and Floodplains', nepInvestment: 26339771, totalCost: 26339771, duration: '2016 - 2021', activityTypeShort: '11 selected', vitalSignShort: '4 selected', lemaShort: 'Soundwide' },
  { name: 'Northwest Indian Fisheries Commission Implementation Grant - TIL 1.0', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1879', activityId: 'DIR_TIL1.0', stage: 'Completed', award: 'EPA Direct', investmentType: 'NEP Program Grant', startYear: '2016', completionYear: '2021', org: 'NWIFC', county: 'Clallam, Island, Jefferson, King, Kitsap, Lewis, Mason, Pierce, San Juan, Skagit, Snohomish, Thurston, Whatcom', activityType: 'Capacity Building and Coordination', vitalSign: 'Beaches and Marine Vegetation, Forage Fish, Marine Water, Salmon, Streams and Floodplains', nepInvestment: 25000000, totalCost: 25000000, duration: '2016 - 2021', activityTypeShort: 'Capacity Building and Coordination', vitalSignShort: '5 selected', lemaShort: 'Soundwide' },
  { name: 'Stormwater Strategic Initiative Lead grant 1.0', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Activity/Detail/1877', activityId: 'DIR_SWSIL1.0', stage: 'Completed', award: 'EPA Direct', investmentType: 'NEP Program Grant', startYear: '2016', completionYear: '2020', org: 'ECY', county: 'Clallam, Island, Jefferson, King, Kitsap, Lewis, Mason, Pierce, San Juan, Skagit, Snohomish, Thurston, Whatcom', activityType: 'Capacity Building and Coordination, Education and Awareness, Effectiveness Evaluation, Incentives, Mobilizing Funding, Research, Status and Trends Monitoring, Technical Assistance and Training', vitalSign: 'Freshwater, Marine Water, Toxics in Aquatic Life', nepInvestment: 22650000, totalCost: 22650000, duration: '2016 - 2020', activityTypeShort: '8 selected', vitalSignShort: 'Freshwater, Marine Water, Toxics in Aquatic Life', lemaShort: 'Soundwide' },
];

// ── Awards page (/Award/Index) ──────────────────────────────────────────────
export const AWARDS_PAGE = {
  title: 'NEP Awards',
  paragraphs: [
    {
      segments: [
        { type: 'text', text: 'The table below displays a list of NEP awards, some of which are no longer active. Retired awards include: Marine and Nearshore Lead Organization; Pathogens Lead Organization; Stewardship Lead Organization; Toxics and Nutrients Lead Organization and Watershed Lead Organization.' },
      ],
    },
  ] as AtlasParagraph[],
};

export interface AtlasAwardRow {
  name: string;
  detailHref: string;
  shortName: string;
  description: string;
  reportingLeads: string;
  awardingFund: string;
  funds: string;
  totalCost: number;
  nepInvestment: number;
  leveragedFunds: number;
}

export const AWARD_GRID_COLUMNS = [
  { colId: 'NEPAward', header: 'NEP Award' },
  { colId: 'NEPAwardShortName', header: 'NEP Award Short Name' },
  { colId: 'NEPAwardDescription', header: 'NEP Award Description' },
  { colId: 'NEPAwardReportingLeads', header: 'NEP Award Reporting Leads' },
  { colId: 'AwardingFund', header: 'Awarding Fund' },
  { colId: 'Funds', header: 'Funds' },
  { colId: 'TotalCost', header: 'Total Cost' },
  { colId: 'NEPInvestment', header: 'NEP Investment' },
  { colId: 'LeveragedFunds', header: 'Leveraged Funds' },
] as const;

// FULL 14-row /Award/IndexGridJsonData feed — no truncation, all 9 columns.
export const AWARD_ROWS: AtlasAwardRow[] = [
  { name: 'EPA Direct Grants', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/10', shortName: 'EPA Direct', description: 'Activities funded directly from EPA to project implementers.', reportingLeads: '', awardingFund: 'National Estuary Program Puget Sound Funds', funds: '', totalCost: 545493413, nepInvestment: 545493413, leveragedFunds: 0 },
  { name: 'Federal Agreements', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/7', shortName: 'Federal Agreements', description: 'An agreement between EPA and another federal agency to fund implementation of recovery activities.', reportingLeads: 'Angela Adams, Catherine Gockel, Michael Rylko', awardingFund: 'National Estuary Program Puget Sound Funds', funds: 'National Estuary Program (NEP): Inter-agency Agreement Support for NTAs', totalCost: 47232672, nepInvestment: 47232672, leveragedFunds: 0 },
  { name: 'Habitat Strategic Initiative Lead', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/3', shortName: 'SIL - Habitat', description: "The Habitat Strategic Initiative Lead (Habitat SIL) is supported by the National Estuary Program's Puget Sound geographic funds. Focused on the restoration and protection of habitat throughout Puget Sound, the Habitat SIL is co-led by the Washington State Departments of Fish & Wildlife (WDFW) and Natural Resources (DNR) and support is provided by the Washington State Department of Commerce.", reportingLeads: 'WDFW Administrator, Cynthia Catton, Jennifer Griffiths', awardingFund: 'National Estuary Program Puget Sound Funds', funds: 'National Estuary Program (NEP): Habitat Strategic Initiative Support for NTAs', totalCost: 63866956, nepInvestment: 59722753, leveragedFunds: 4144203 },
  { name: 'Marine and Nearshore Lead Organization', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/11', shortName: 'Marine and Nearshore LO', description: 'The Marine and Nearshore Protection and Restoration Lead Organization was a grant program supported by EPA National Estuary Program Puget Sound funds and administered by the Washington Departments of Fish and Wildlife and Natural Resources. Funds were awarded to implement priorities in the Puget Sound Action Agenda to protect and restore habitat and ecosystem functions.', reportingLeads: '', awardingFund: 'National Estuary Program Puget Sound Funds', funds: '', totalCost: 17184104, nepInvestment: 17184104, leveragedFunds: 0 },
  { name: 'Northwest Indian Fisheries Commission', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/6', shortName: 'NWIFC', description: 'Support to the Northwest Indian Fisheries Commission for implementation of projects of high tribal priority that are consistent with the Action Agenda.', reportingLeads: "Action Agenda Tracker Administrators, Caitlyn O'Connor", awardingFund: 'National Estuary Program Puget Sound Funds', funds: 'National Estuary Program (NEP): Northwest Indian Fisheries Commission Support for NTAs', totalCost: 66364064.2, nepInvestment: 66364064.2, leveragedFunds: 0 },
  { name: 'Pathogens Lead Organization', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/14', shortName: 'Pathogens LO', description: 'The Pathogens Prevention, Reduction and Control Lead Organization was a grant program supported by EPA National Estuary Program Puget Sound funds and administered by the Washington Departments of Health and Ecology. Funds were awarded to implement priorities in the Puget Sound Action Agenda around prevention and reduction of pathogen pollution through management of human and animal wastes.', reportingLeads: '', awardingFund: 'National Estuary Program Puget Sound Funds', funds: '', totalCost: 17823065, nepInvestment: 17823065, leveragedFunds: 0 },
  { name: 'Puget Sound Partnership Base and Science Award', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/1', shortName: 'PSP Base and Science', description: 'This award supports the base operations of the Puget Sound Partnership, the lead organization for the Puget Sound National Estuary Program, as well as focusing on filling science gaps necessary to advance Puget Sound recovery through development and adaptive management of implementation strategies.', reportingLeads: 'Alex Mitchell', awardingFund: 'National Estuary Program Puget Sound Funds', funds: 'National Estuary Program (NEP): Puget Sound Partnership Base Program Award', totalCost: 89312982.43, nepInvestment: 85420761.41, leveragedFunds: 3892221.02 },
  { name: 'Puget Sound Riparian Systems Lead', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/15', shortName: 'Riparian Systems Lead', description: 'The Puget Sound Riparian Systems Lead grant program focuses on protecting and restoring riparian areas that have been damaged or are struggling to support the plants, animals, and waters of Puget Sound. It also aims to maintain and learn from pristine riparian systems. The program supports riparian restoration programs that work with communities and landowners to improve the overall function of river and stream riparian systems.', reportingLeads: '', awardingFund: 'National Estuary Program Puget Sound Funds', funds: '', totalCost: 0, nepInvestment: 0, leveragedFunds: 0 },
  { name: 'Shellfish Strategic Initiative Lead', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/4', shortName: 'SIL - Shellfish', description: "The Shellfish Strategic Initiative Lead (Shellfish SIL) is supported by the National Estuary Program's Puget Sound geographic funds. Focused on the restoration and protection of shellfish beds throughout Puget Sound, the Shellfish SIL is led by the Washington State Department of Health in partnership with the Departments of Ecology and Agriculture.", reportingLeads: 'Audrey Coyne, CLARA HARD', awardingFund: 'National Estuary Program Puget Sound Funds', funds: 'National Estuary Program (NEP): Shellfish Strategic Initiative Support for NTAs', totalCost: 44490021.23, nepInvestment: 42960021.23, leveragedFunds: 1530000 },
  { name: 'Stewardship Lead Organization', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/9', shortName: 'Stewardship LO', description: 'The Stewardship Lead Organization was a grant program supported by EPA National Estuary Program Puget Sound funds and administered by the Puget Sound Partnership. Funds were awarded to implement priorities in the Puget Sound Action Agenda around activities such as behavior change and awareness programs and advancement of Puget Sound-related public-school curricula.', reportingLeads: 'Alex Mitchell', awardingFund: 'National Estuary Program Puget Sound Funds', funds: '', totalCost: 4573399, nepInvestment: 4573399, leveragedFunds: 0 },
  { name: 'Stormwater Strategic Initiative Lead', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/5', shortName: 'SIL - Stormwater', description: "The Stormwater Strategic Initiative Lead (Stormwater SIL) is supported by the National Estuary Program's Puget Sound Geographic funds. Focused on reducing the impacts of stormwater throughout Puget Sound, the Stormwater SIL is led by the Washington State Department of Ecology in partnership with the Washington Stormwater Center at Washington State University and the Department of Commerce.", reportingLeads: 'Michelle Myers', awardingFund: 'National Estuary Program Puget Sound Funds', funds: 'National Estuary Program (NEP): Stormwater Strategic Initiative Support for NTAs', totalCost: 48642470.2, nepInvestment: 46918880.2, leveragedFunds: 1723590 },
  { name: 'Toxics and Nutrients Lead Organization', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/12', shortName: 'Toxics and Nutrients LO', description: 'The Toxics and Nutrients Prevention, Reduction and Control Lead Organization was a grant program supported by EPA National Estuary Program Puget Sound funds and administered by the Washington Department of Ecology. Funds were awarded to implement priorities in the Puget Sound Action Agenda around preventing, reducing, and controlling toxics and nutrients from entering Puget Sound.', reportingLeads: '', awardingFund: 'National Estuary Program Puget Sound Funds', funds: '', totalCost: 20885128.25, nepInvestment: 20885128.25, leveragedFunds: 0 },
  { name: 'Tribal Capacity', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/8', shortName: 'Tribal Capacity', description: 'Support to increase the institutional capacity of Puget Sound tribes (19 tribes and three tribal consortia), facilitating participation in regional coordination boards and management conferences, as well as to implementing recovery activities consistent with the Action Agenda.', reportingLeads: 'Lisa Chang', awardingFund: 'National Estuary Program Puget Sound Funds', funds: '', totalCost: 105298083, nepInvestment: 105298083, leveragedFunds: 0 },
  { name: 'Watershed Lead Organization', detailHref: 'https://nepatlas.pugetsoundinfo.wa.gov/Award/Detail/13', shortName: 'Watershed LO', description: 'The Watershed Protection and Restoration Lead Organization was a grant program supported by EPA National Estuary Program Puget Sound funds and administered by the Washington Departments of Ecology and Commerce. Funds were awarded to implement priorities in the Puget Sound Action Agenda around improving land use, stormwater management and strategies for riparian and floodplain protection and restoration.', reportingLeads: '', awardingFund: 'National Estuary Program Puget Sound Funds', funds: '', totalCost: 28693435.23, nepInvestment: 28693435.23, leveragedFunds: 0 },
];

// ── Investment Summary page (/Activity/Summary) ─────────────────────────────
export const SUMMARY_PAGE = {
  title: 'NEP Investment Summaries',
  paragraphs: [
    {
      segments: [
        { type: 'text', text: 'This page summarizes NEP investments by topic (Vital Signs) and geography (Lead Entity Management Area). Use the filters to customize the charts, and see a list and links to related activities in the table at the bottom of the page.' }, // kept verbatim although the filters are omitted here — see contract
      ],
    },
    {
      segments: [
        { type: 'text', text: 'The bars in the chart are broken out by the different NEP Awards (e.g., SIL - Shellfish) that funded the activities, not by the organizations that received the funding to implement specific activities. The Northwest Indian Fisheries Commission (NWIFC) is both a funder (NEP Award) and a funding recipient for different NEP awards. The chart below only includes activities that were funded by the NWIFC NEP Award.' }, // source italicizes "SIL - Shellfish" — carried plain
      ],
    },
    {
      segments: [
        { type: 'text', text: 'For a full list of investments see ' },
        { type: 'link', link: { kind: 'internal', text: 'NEP Activities', route: '/prototypes/nep-atlas/activities' } },
        { type: 'text', text: '.' },
      ],
    },
  ] as AtlasParagraph[],
  tabs: [{ label: 'Activities by Vital Signs' }, { label: 'Activities by Geography' }], // verbatim tab labels
  tableHeader: (n: number, total: number) => `${n} of ${total.toLocaleString('en-US')} Activities`, // verbatim prod card-header pattern
};

// Chart data — REAL, DERIVED from prod's own summary-tab payload (the page's
// Google-Charts dataTable is computed client-side from an inlined
// `Activities` array of 1,608 records; prod's server HTML ships that array
// but a null dataTable). Derivation, recorded verbatim: count of activities
// whose VitalSigns (resp. LeadEntities) array contains the label, grouped by
// NEPAwardShortName; an activity tagged with several Vital Signs / LEMAs
// counts once under each. Computed identically here, 2026-07-22. Palette =
// prod's own `Awards` color dict (prod itself assigns #003a5d to EPA Direct
// AND the four retired LOs — carried as-is; sr-only per-award breakdowns
// keep the chart non-color-dependent).
export const SUMMARY_AWARD_ORDER = [
  'PSP Base and Science', 'SIL - Habitat', 'SIL - Shellfish', 'SIL - Stormwater', 'NWIFC',
  'Federal Agreements', 'Tribal Capacity', 'Stewardship LO', 'EPA Direct',
  'Marine and Nearshore LO', 'Toxics and Nutrients LO', 'Watershed LO', 'Pathogens LO', 'Riparian Systems Lead',
] as const;
export type SummaryAward = (typeof SUMMARY_AWARD_ORDER)[number];

export const SUMMARY_AWARD_COLORS: Record<SummaryAward, string> = {
  'PSP Base and Science': '#013d5b', 'SIL - Habitat': '#d34727', 'SIL - Shellfish': '#f6b330',
  'SIL - Stormwater': '#f18c21', 'NWIFC': '#c6b42f', 'Federal Agreements': '#756558',
  'Tribal Capacity': '#e3d2a6', 'Stewardship LO': '#4b8059', 'EPA Direct': '#003a5d',
  'Marine and Nearshore LO': '#003a5d', 'Toxics and Nutrients LO': '#003a5d',
  'Watershed LO': '#003a5d', 'Pathogens LO': '#003a5d', 'Riparian Systems Lead': '#92D050',
};

export interface AtlasSummaryBar {
  label: string;
  counts: Partial<Record<SummaryAward, number>>;
}

export const SUMMARY_CHART_VITAL_SIGNS_TITLE = 'Activities by Vital Sign'; // verbatim legendTitle
export const SUMMARY_CHART_GEOGRAPHY_TITLE = 'Activities by Lead Entity Management Area'; // verbatim legendTitle

// Filter vocabulary for the summary charts — the two dimensions each chart's
// stored aggregation actually carries (its row axis and the NEP Award stack).
// Dimension names are prod's own: the row axes are prod's chart titles'
// nouns; "NEP Award" is what prod's copy calls the stack breakdown ("broken
// out by the different NEP Awards"). Prod's separate "Investment Type"
// filter dimension is NOT in the captured aggregation and stays omitted —
// see the contract.
export const SUMMARY_FILTERS = {
  vitalSignLabel: 'Vital Sign',
  lemaLabel: 'Lead Entity Management Area',
  awardLabel: 'NEP Award',
  clearLabel: 'Clear all',
} as const;

export const SUMMARY_BY_VITAL_SIGN: AtlasSummaryBar[] = [
  { label: 'Air Quality', counts: { 'PSP Base and Science': 143, 'NWIFC': 3, 'Federal Agreements': 2, 'Tribal Capacity': 1, 'EPA Direct': 4, 'Toxics and Nutrients LO': 1, 'Watershed LO': 2 } },
  { label: 'Beaches and Marine Vegetation', counts: { 'PSP Base and Science': 357, 'SIL - Habitat': 57, 'SIL - Stormwater': 2, 'NWIFC': 23, 'Federal Agreements': 7, 'Tribal Capacity': 13, 'Stewardship LO': 71, 'EPA Direct': 28, 'Marine and Nearshore LO': 75, 'Toxics and Nutrients LO': 1, 'Watershed LO': 4 } },
  { label: 'Birds', counts: { 'PSP Base and Science': 150, 'SIL - Habitat': 1, 'NWIFC': 8, 'Federal Agreements': 2, 'Tribal Capacity': 1, 'EPA Direct': 4, 'Watershed LO': 2 } },
  { label: 'Cultural Wellbeing', counts: { 'PSP Base and Science': 152, 'NWIFC': 48, 'Federal Agreements': 2, 'Tribal Capacity': 1, 'EPA Direct': 4, 'Watershed LO': 2 } },
  { label: 'Drinking Water', counts: { 'PSP Base and Science': 149, 'NWIFC': 4, 'Federal Agreements': 2, 'Tribal Capacity': 1, 'EPA Direct': 4, 'Watershed LO': 2 } },
  { label: 'Economic Vitality', counts: { 'PSP Base and Science': 155, 'SIL - Habitat': 4, 'SIL - Stormwater': 1, 'NWIFC': 18, 'Federal Agreements': 2, 'Tribal Capacity': 1, 'EPA Direct': 4, 'Watershed LO': 2 } },
  { label: 'Estuaries', counts: { 'PSP Base and Science': 361, 'SIL - Habitat': 30, 'SIL - Shellfish': 1, 'SIL - Stormwater': 2, 'NWIFC': 67, 'Federal Agreements': 7, 'Tribal Capacity': 21, 'Stewardship LO': 68, 'EPA Direct': 26, 'Marine and Nearshore LO': 33, 'Toxics and Nutrients LO': 1, 'Watershed LO': 6 } },
  { label: 'Forage Fish', counts: { 'PSP Base and Science': 346, 'SIL - Habitat': 5, 'NWIFC': 22, 'Federal Agreements': 3, 'Tribal Capacity': 4, 'Stewardship LO': 68, 'EPA Direct': 8, 'Marine and Nearshore LO': 61, 'Toxics and Nutrients LO': 1, 'Watershed LO': 2 } },
  { label: 'Forests and Wetlands', counts: { 'PSP Base and Science': 351, 'SIL - Habitat': 33, 'SIL - Stormwater': 8, 'NWIFC': 23, 'Federal Agreements': 11, 'Tribal Capacity': 15, 'Stewardship LO': 71, 'EPA Direct': 34, 'Marine and Nearshore LO': 23, 'Toxics and Nutrients LO': 1, 'Watershed LO': 70 } },
  { label: 'Freshwater', counts: { 'PSP Base and Science': 356, 'SIL - Habitat': 4, 'SIL - Stormwater': 106, 'NWIFC': 79, 'Federal Agreements': 11, 'Tribal Capacity': 19, 'Stewardship LO': 81, 'EPA Direct': 26, 'Marine and Nearshore LO': 1, 'Toxics and Nutrients LO': 40, 'Watershed LO': 78 } },
  { label: 'Good Governance', counts: { 'PSP Base and Science': 152, 'SIL - Habitat': 3, 'NWIFC': 4, 'Federal Agreements': 2, 'Tribal Capacity': 1, 'EPA Direct': 4, 'Watershed LO': 2 } },
  { label: 'Groundfish and Benthic Invertebrates', counts: { 'PSP Base and Science': 81, 'SIL - Habitat': 1, 'NWIFC': 3, 'Federal Agreements': 2, 'Tribal Capacity': 1, 'EPA Direct': 4 } },
  { label: 'Local Foods', counts: { 'PSP Base and Science': 162, 'NWIFC': 34, 'Federal Agreements': 2, 'Tribal Capacity': 1, 'EPA Direct': 4, 'Watershed LO': 2 } },
  { label: 'Marine Water', counts: { 'PSP Base and Science': 360, 'SIL - Habitat': 8, 'SIL - Stormwater': 42, 'NWIFC': 39, 'Federal Agreements': 7, 'Tribal Capacity': 17, 'Stewardship LO': 84, 'EPA Direct': 19, 'Marine and Nearshore LO': 10, 'Toxics and Nutrients LO': 60, 'Watershed LO': 26 } },
  { label: 'Orcas', counts: { 'PSP Base and Science': 344, 'SIL - Habitat': 1, 'NWIFC': 11, 'Federal Agreements': 4, 'Tribal Capacity': 2, 'Stewardship LO': 68, 'EPA Direct': 7, 'Marine and Nearshore LO': 58, 'Toxics and Nutrients LO': 5, 'Watershed LO': 2 } },
  { label: 'Outdoor Activity', counts: { 'PSP Base and Science': 353, 'SIL - Shellfish': 25, 'NWIFC': 11, 'Federal Agreements': 4, 'Tribal Capacity': 4, 'Stewardship LO': 76, 'EPA Direct': 14, 'Watershed LO': 29, 'Pathogens LO': 53 } },
  { label: 'Salmon', counts: { 'PSP Base and Science': 381, 'SIL - Habitat': 47, 'SIL - Shellfish': 1, 'SIL - Stormwater': 18, 'NWIFC': 212, 'Federal Agreements': 18, 'Tribal Capacity': 32, 'Stewardship LO': 70, 'EPA Direct': 33, 'Marine and Nearshore LO': 63, 'Toxics and Nutrients LO': 4, 'Watershed LO': 69 } },
  { label: 'Sense of Place', counts: { 'PSP Base and Science': 152, 'NWIFC': 27, 'Federal Agreements': 2, 'Tribal Capacity': 1, 'EPA Direct': 4, 'Watershed LO': 2 } },
  { label: 'Shellfish Beds', counts: { 'PSP Base and Science': 351, 'SIL - Habitat': 2, 'SIL - Shellfish': 77, 'SIL - Stormwater': 11, 'NWIFC': 31, 'Federal Agreements': 5, 'Tribal Capacity': 15, 'Stewardship LO': 77, 'EPA Direct': 30, 'Marine and Nearshore LO': 2, 'Toxics and Nutrients LO': 25, 'Watershed LO': 3, 'Pathogens LO': 62 } },
  { label: 'Sound Stewardship', counts: { 'PSP Base and Science': 153, 'SIL - Habitat': 3, 'NWIFC': 26, 'Federal Agreements': 2, 'Tribal Capacity': 1, 'EPA Direct': 4, 'Watershed LO': 2 } },
  { label: 'Streams and Floodplains', counts: { 'PSP Base and Science': 360, 'SIL - Habitat': 56, 'SIL - Stormwater': 3, 'NWIFC': 125, 'Federal Agreements': 11, 'Tribal Capacity': 18, 'Stewardship LO': 65, 'EPA Direct': 28, 'Marine and Nearshore LO': 1, 'Watershed LO': 78 } },
  { label: 'Toxics in Aquatic Life', counts: { 'PSP Base and Science': 347, 'SIL - Habitat': 4, 'SIL - Stormwater': 51, 'NWIFC': 19, 'Federal Agreements': 5, 'Tribal Capacity': 11, 'Stewardship LO': 71, 'EPA Direct': 15, 'Marine and Nearshore LO': 2, 'Toxics and Nutrients LO': 37, 'Watershed LO': 9 } },
  { label: 'Zooplankton', counts: { 'PSP Base and Science': 81, 'SIL - Habitat': 1, 'NWIFC': 1, 'Federal Agreements': 2, 'Tribal Capacity': 1, 'EPA Direct': 4 } },
];

export const SUMMARY_BY_LEMA: AtlasSummaryBar[] = [
  { label: 'Cedar - Sammamish', counts: { 'PSP Base and Science': 260, 'SIL - Habitat': 62, 'SIL - Shellfish': 9, 'SIL - Stormwater': 59, 'NWIFC': 14, 'Federal Agreements': 16, 'Tribal Capacity': 4, 'Stewardship LO': 23, 'EPA Direct': 50, 'Marine and Nearshore LO': 34, 'Toxics and Nutrients LO': 45, 'Watershed LO': 30, 'Pathogens LO': 15 } },
  { label: 'Deschutes', counts: { 'PSP Base and Science': 319, 'SIL - Habitat': 60, 'SIL - Shellfish': 18, 'SIL - Stormwater': 44, 'NWIFC': 12, 'Federal Agreements': 16, 'Tribal Capacity': 4, 'Stewardship LO': 23, 'EPA Direct': 48, 'Marine and Nearshore LO': 37, 'Toxics and Nutrients LO': 52, 'Watershed LO': 21, 'Pathogens LO': 20 } },
  { label: 'Duwamish - Green', counts: { 'PSP Base and Science': 265, 'SIL - Habitat': 60, 'SIL - Shellfish': 13, 'SIL - Stormwater': 62, 'NWIFC': 15, 'Federal Agreements': 16, 'Tribal Capacity': 4, 'Stewardship LO': 25, 'EPA Direct': 50, 'Marine and Nearshore LO': 41, 'Toxics and Nutrients LO': 50, 'Watershed LO': 26, 'Pathogens LO': 19 } },
  { label: 'Hood Canal', counts: { 'PSP Base and Science': 260, 'SIL - Habitat': 64, 'SIL - Shellfish': 14, 'SIL - Stormwater': 43, 'NWIFC': 26, 'Federal Agreements': 20, 'Tribal Capacity': 10, 'Stewardship LO': 23, 'EPA Direct': 50, 'Marine and Nearshore LO': 38, 'Toxics and Nutrients LO': 47, 'Watershed LO': 20, 'Pathogens LO': 21 } },
  { label: 'Island', counts: { 'PSP Base and Science': 262, 'SIL - Habitat': 61, 'SIL - Shellfish': 14, 'SIL - Stormwater': 43, 'NWIFC': 10, 'Federal Agreements': 16, 'Tribal Capacity': 4, 'Stewardship LO': 24, 'EPA Direct': 46, 'Marine and Nearshore LO': 39, 'Toxics and Nutrients LO': 45, 'Watershed LO': 23, 'Pathogens LO': 18 } },
  { label: 'Kennedy - Goldsborough', counts: { 'PSP Base and Science': 255, 'SIL - Habitat': 58, 'SIL - Shellfish': 16, 'SIL - Stormwater': 43, 'NWIFC': 14, 'Federal Agreements': 16, 'Tribal Capacity': 6, 'Stewardship LO': 24, 'EPA Direct': 47, 'Marine and Nearshore LO': 36, 'Toxics and Nutrients LO': 46, 'Watershed LO': 18, 'Pathogens LO': 18 } },
  { label: 'Nisqually', counts: { 'PSP Base and Science': 256, 'SIL - Habitat': 59, 'SIL - Shellfish': 13, 'SIL - Stormwater': 43, 'NWIFC': 15, 'Federal Agreements': 17, 'Tribal Capacity': 4, 'Stewardship LO': 16, 'EPA Direct': 47, 'Marine and Nearshore LO': 34, 'Toxics and Nutrients LO': 45, 'Watershed LO': 21, 'Pathogens LO': 15 } },
  { label: 'Nooksack', counts: { 'PSP Base and Science': 261, 'SIL - Habitat': 71, 'SIL - Shellfish': 16, 'SIL - Stormwater': 41, 'NWIFC': 25, 'Federal Agreements': 17, 'Tribal Capacity': 8, 'Stewardship LO': 20, 'EPA Direct': 48, 'Marine and Nearshore LO': 37, 'Toxics and Nutrients LO': 48, 'Watershed LO': 21, 'Pathogens LO': 22 } },
  { label: 'North Olympic Peninsula', counts: { 'PSP Base and Science': 266, 'SIL - Habitat': 63, 'SIL - Shellfish': 14, 'SIL - Stormwater': 45, 'NWIFC': 48, 'Federal Agreements': 20, 'Tribal Capacity': 10, 'Stewardship LO': 19, 'EPA Direct': 48, 'Marine and Nearshore LO': 38, 'Toxics and Nutrients LO': 45, 'Watershed LO': 18, 'Pathogens LO': 20 } },
  { label: 'Pierce', counts: { 'PSP Base and Science': 260, 'SIL - Habitat': 62, 'SIL - Shellfish': 12, 'SIL - Stormwater': 55, 'NWIFC': 27, 'Federal Agreements': 16, 'Tribal Capacity': 8, 'Stewardship LO': 21, 'EPA Direct': 48, 'Marine and Nearshore LO': 35, 'Toxics and Nutrients LO': 46, 'Watershed LO': 21, 'Pathogens LO': 19 } },
  { label: 'San Juan', counts: { 'PSP Base and Science': 262, 'SIL - Habitat': 65, 'SIL - Shellfish': 11, 'SIL - Stormwater': 41, 'NWIFC': 7, 'Federal Agreements': 16, 'Tribal Capacity': 4, 'Stewardship LO': 21, 'EPA Direct': 47, 'Marine and Nearshore LO': 37, 'Toxics and Nutrients LO': 46, 'Watershed LO': 18, 'Pathogens LO': 17 } },
  { label: 'Skagit', counts: { 'PSP Base and Science': 259, 'SIL - Habitat': 65, 'SIL - Shellfish': 24, 'SIL - Stormwater': 41, 'NWIFC': 55, 'Federal Agreements': 18, 'Tribal Capacity': 14, 'Stewardship LO': 21, 'EPA Direct': 50, 'Marine and Nearshore LO': 37, 'Toxics and Nutrients LO': 45, 'Watershed LO': 20, 'Pathogens LO': 18 } },
  { label: 'Snohomish', counts: { 'PSP Base and Science': 262, 'SIL - Habitat': 74, 'SIL - Shellfish': 17, 'SIL - Stormwater': 51, 'NWIFC': 32, 'Federal Agreements': 17, 'Tribal Capacity': 8, 'Stewardship LO': 16, 'EPA Direct': 50, 'Marine and Nearshore LO': 35, 'Toxics and Nutrients LO': 46, 'Watershed LO': 29, 'Pathogens LO': 16 } },
  { label: 'Stillaguamish', counts: { 'PSP Base and Science': 254, 'SIL - Habitat': 71, 'SIL - Shellfish': 19, 'SIL - Stormwater': 45, 'NWIFC': 20, 'Federal Agreements': 16, 'Tribal Capacity': 6, 'Stewardship LO': 17, 'EPA Direct': 47, 'Marine and Nearshore LO': 36, 'Toxics and Nutrients LO': 46, 'Watershed LO': 18, 'Pathogens LO': 16 } },
  { label: 'West Sound', counts: { 'PSP Base and Science': 276, 'SIL - Habitat': 68, 'SIL - Shellfish': 18, 'SIL - Stormwater': 50, 'NWIFC': 25, 'Federal Agreements': 16, 'Tribal Capacity': 8, 'Stewardship LO': 20, 'EPA Direct': 52, 'Marine and Nearshore LO': 41, 'Toxics and Nutrients LO': 47, 'Watershed LO': 25, 'Pathogens LO': 19 } },
];

// Prod's tables render `currency:0` (e.g. `$2,853,198`).
export const formatUsd = (n: number | null): string =>
  n == null ? '' : '$' + Math.round(n).toLocaleString('en-US');

// ── Gaps: content this file does NOT include, and why ──────────────────────
// 1. The home page's Activities map is mounted client-side into
//    <div id="ntaActivitiesMapDivID"> from an inline
//    projectLocationsMapInitJson blob (one vector layer, 1,614 activity
//    point features). Reproduced here as an interactive Leaflet map
//    (PsInfoNepAtlasMap) using INVENTED representative points
//    (ATLAS_MAP_POINTS) — the source's feature records are never copied.
// 2. Activities grid (ACTIVITY_ROWS): 12 of 1,614 feed rows, 13 of 32 prod
//    columns. Awards grid (AWARD_ROWS): FULL 14 of 14 rows, all 9 columns —
//    no truncation. Summary charts: real aggregation derived from prod's own
//    1,608-activity payload (see derivation note above). Full accounting in
//    src/data/contracts/nep-atlas.md.
// 3. Map-page filter selects, the summary charts' "Investment Type" filter
//    dimension (not in the captured aggregation; the built charts filter on
//    row axis + NEP Award, the dimensions the data carries), chart
//    Expand/Save/Configure controls, and the RPA column on the
//    related-activities table are
//    omitted — see contract.
