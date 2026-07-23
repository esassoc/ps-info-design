// ongoing-programs.ts — content for the Ongoing Programs Portal's five pages:
//   src/pages/prototypes/ongoing-programs.astro            (Index)
//   src/pages/prototypes/ongoing-programs/programs.astro   (Program List)
//   src/pages/prototypes/ongoing-programs/budgets.astro    (State Program Budgets)
//   src/pages/prototypes/ongoing-programs/targets.astro    (Program Targets)
//   src/pages/prototypes/ongoing-programs/dashboard.astro  (Data Dashboard)
//
// Sourcing: the Index page was fetched 2026-07-17 (`curl -sL`, confirmed
// server-rendered). Programs / Budgets / Targets / Dashboard were extracted
// 2026-07-22 from saved prod DOM snapshots PLUS prod's own live JSON
// endpoints — /OngoingProgram/IndexGridJsonData (270 program rows),
// /OngoingProgram/FinancialsGridJsonData (3,240 financial records), and the
// Dashboard page's inline AngularViewData (chart matrices) — fetched
// directly, not re-derived from the DOM's rendered output. Bulk rows live in
// sibling JSON files imported below; NO ROW TRUNCATION anywhere in this
// module: all 270 program rows, all 3,240 financial records, and all 37
// targets (2 cycles / 22 programs) are carried in full. See
// src/data/contracts/ongoing-programs.md for the complete per-page inventory,
// honest simplification notes, and exclusions.
//
// GAPS (Index page only — unchanged from the 2026-07-17 authoring pass):
// - The source ships the map image as a base64 PNG with alt="" (decorative
//   per the source's own markup — an accessibility gap in the original, the
//   same pattern documented on the `about` contract for its photo trio). It
//   has been extracted to a real asset file (public/photos/ongoing-programs/
//   salish-sea-map.png, 767x771) with meaningful alt text supplied here for
//   WCAG compliance.

export const SITE_ORIGIN = 'https://www.pugetsoundinfo.wa.gov';
export const SOURCE_URL = `${SITE_ORIGIN}/OngoingProgram/Index`;

// ── Index page header ───────────────────────────────────────────────────
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

// ── Hero (shared by all five pages) ──────────────────────────────────────
export const HERO_IMAGE = {
  src: '/photos/ongoing-programs/hero-nisqually.jpg',
  // Decorative in the PhotoHeader (it hardcodes alt=""); facts recorded here:
  caption: 'The Billy Frank Jr. Nisqually National Wildlife Refuge',
  credit: 'George Dodd',
  sourceUrl: 'https://actionagenda.pugetsoundinfo.wa.gov/FileResource/DisplayResource/3bef0bd7-5095-4735-8ff8-8fa0d6712ce0',
  focus: '50% 60%',
};

export type OgpSectionId = 'programs' | 'budgets' | 'targets' | 'dashboard';
export interface OgpSection { id: OgpSectionId; label: string; route: string; }
// Prod's #ogpNavbarSupportedContent tab strip, labels/order verbatim, hrefs re-pointed at internal routes.
export const OGP_SECTIONS: OgpSection[] = [
  { id: 'programs',  label: 'Program List',          route: '/prototypes/ongoing-programs/programs' },
  { id: 'budgets',   label: 'State Program Budgets', route: '/prototypes/ongoing-programs/budgets' },
  { id: 'targets',   label: 'Program Targets',       route: '/prototypes/ongoing-programs/targets' },
  { id: 'dashboard', label: 'Data Dashboard',        route: '/prototypes/ongoing-programs/dashboard' },
];

// ── Program List page ────────────────────────────────────────────────────
export const PROGRAMS_TITLE = 'Program List'; // breadcrumbTitle verbatim
export const PROGRAMS_INTRO =
  'The Partnership collaborates with partners to maintain an inventory of ongoing programs important to Puget Sound recovery. The following table lists the complete inventory, which is primarily comprised of state and federal programs. The Partnership works with program owners to update program descriptions and relevant program information (connections to Action Agenda strategies, Vital Signs, etc) on a periodic basis.';
export const ACTIVITY_TYPE_HEADING = 'Ongoing Programs by Activity Type'; // prod renders as <strong>; we promote to h2 (recorded in contract)
export const ACTIVITY_TYPE_INTRO =
  'Each ongoing program in the Partnership’s inventory is assigned one or more activity type. These categorizations allow us to indicate broadly how Puget Sound recovery efforts are distributed by the primary type of work that programs perform. We can see how current programs in the inventory are distributed by activity type, as follows:';
export interface ActivityTypeBreakdownItem { before: string; emphasis: string; after: string; }
export const ACTIVITY_TYPE_BREAKDOWN: ActivityTypeBreakdownItem[] = [
  { before: 'Just under half of programs are primarily engaged in ', emphasis: 'enabling conditions',
    after: ', which describes activities like planning, science, coordination, and technical assistance.' },
  { before: 'Just over a third of programs are primarily focused on ', emphasis: 'ecological restoration',
    after: ' of habitat and species.' },
  { before: 'The remainder of ongoing programs are mainly targeted at ', emphasis: 'changing residents’ behaviors',
    after: ' in a way that benefits recovery, including education, incentives, and compliance activities.' },
];
export interface DonutSlice { label: string; pct: number; color: string; }
// Verified against prod's donut raster (decoded from the Programs page): slice order, %, and sampled slice colors.
export const ACTIVITY_DONUT: DonutSlice[] = [
  { label: 'Behavior Change',        pct: 18, color: '#6E5FB1' },
  { label: 'Ecological Restoration', pct: 34, color: '#AAD144' },
  { label: 'Enabling Condition',     pct: 48, color: '#1A7DBC' },
];
export const ALL_PROGRAMS_HEADING = 'All Programs'; // prod h3, promoted to h2
export const TOTAL_PROGRAMS = 270;
export const programsRowCountText = (shown: number, total: number): string =>
  `Currently Viewing ${shown} out of ${total} Programs`;                    // prod verbatim
export const CLEAR_FILTERS_LABEL = '(clear filters)';                       // prod verbatim
export const DOWNLOAD_TABLE_LABEL = 'Download Table';                       // prod verbatim
export const DOWNLOAD_DB_LABEL = 'Download Full Program Database';          // prod verbatim
export const DOWNLOAD_DB_HREF = `${SITE_ORIGIN}/OngoingProgram/OngoingProgramFullExcelDownload`; // prod's real endpoint
export const DOWNLOAD_DB_TITLE = 'Download the full database as an Excel file'; // prod title attr verbatim
export const PROGRAMS_EXPORT_FILE_NAME = 'ongoingProgramsGridExport';       // prod's CSV export name

export interface OgpLinkRef { text: string; link: string; }   // link = site-relative prod path
export interface OgpProgramRow {
  programName: string; programLink: string; programId: string; description: string;
  programStatus: string;          // 'Active' | 'Inactive' | 'Retired'
  fundAdministered: string; startYear: string;
  ownerOrganizations: OgpLinkRef[]; primaryContact: string; partnerOrganizations: OgpLinkRef[];
  geographicScope: string; includedInActionAgenda: string;
  activityType: string;           // prod's verbatim cell, primary marked with leading '*'
  vitalSign: string; aaStrategy2022: string; aaDesiredOutcome2022: string; relatedNepActivities: string;
  programWebsite: string;         // absolute external URL or '' (189 of 270 have one)
  lastUpdated: string; financialsLastUpdated: string;  // e.g. '12/08/2025 5:14 PM'
}

export interface OgpGridColumn { colId: string; header: string; width: number; }
// 19 grid columns — headerName VERBATIM from prod, initialWidth from prod.
export const PROGRAM_GRID_COLUMNS: OgpGridColumn[] = [
  { colId: 'programName',            header: 'Program Name',                          width: 350 },
  { colId: 'programId',              header: 'Program ID',                            width: 140 },
  { colId: 'description',            header: 'Description',                           width: 350 },
  { colId: 'programStatus',          header: 'Program Status',                        width: 150 },
  { colId: 'fundAdministered',       header: 'Fund Administered by this Program',     width: 350 },
  { colId: 'startYear',              header: 'Start Year',                            width: 140 },
  { colId: 'ownerOrganizations',     header: 'Owner Organization',                    width: 230 },
  { colId: 'primaryContact',         header: 'Primary Contact',                       width: 170 },
  { colId: 'partnerOrganizations',   header: 'Partner Organizations',                 width: 230 },
  { colId: 'geographicScope',        header: 'Geographic Scope',                      width: 150 },
  { colId: 'includedInActionAgenda', header: 'Included in Action Agenda',             width: 150 },
  { colId: 'activityType',           header: 'Activity Type',                         width: 230 },
  { colId: 'vitalSign',              header: 'Vital Sign',                            width: 230 },
  { colId: 'aaStrategy2022',         header: '2022 Action Agenda Strategy',           width: 230 },
  { colId: 'aaDesiredOutcome2022',   header: '2022 Action Agenda Desired Outcome',    width: 230 },
  { colId: 'relatedNepActivities',   header: 'Related NEP Activities',                width: 230 },
  { colId: 'programWebsite',         header: 'Program Website',                       width: 330 },
  { colId: 'lastUpdated',            header: 'Last Updated',                          width: 150 },
  { colId: 'financialsLastUpdated',  header: 'Financials Last Updated',               width: 150 },
];

// ── State Program Budgets page ───────────────────────────────────────────
export const BUDGETS_TITLE = 'State Program Budgets'; // breadcrumbTitle verbatim
// VERBATIM — including the source's own error: says "four state fiscal biennia" then lists five (recorded in contract).
export const BUDGETS_INTRO =
  'Every two years (in the Spring of odd-numbered years) state agencies provide updates on estimated budgets for each of their Puget Sound recovery related programs. Program budget information is currently available for four state fiscal biennia: 2015-17; 2017-19, 2019-21, 2021-23 and 2023-25. Additional notes:';
// Prod's 3 <li> bullets, verbatim (&nbsp; normalized to space):
export const BUDGETS_NOTES: string[] = [
  'Limitations existed for 2015-17 biennium budget reporting, including the difficulty of mapping legacy financial information to newly defined or recharacterized programs.',
  'Budget amounts combine direct and indirect costs, and do not include funds that are re-appropriated from previous biennia.',
  'The estimated Puget Sound budget for statewide programs is estimated using the best methodology available to each agency.',
];
export const BUDGETS_PHOTO = {
  src: '/photos/ongoing-programs/budgets-estuary.jpg',
  alt: 'Salt marsh estuary at low tide, tidal channels winding through bright green sedges and yellow wildflowers toward a forested Puget Sound shoreline.',
  width: 1000, height: 664,
};
export const FINANCIALS_HEADING = 'Program Financial Information'; // prod h3, promoted to h2
export const TOTAL_FINANCIAL_RECORDS = 3240;
export const financialsRowCountText = (shown: number, total: number): string =>
  `Currently Viewing ${shown} out of ${total} Program Financial Records`; // prod verbatim
export const FINANCIALS_EXPORT_FILE_NAME = 'ongoingProgramFinancialsGridExport';
export interface OgpFinancialRow {
  programName: string; programLink: string; programOwnerOrganization: string; programId: string;
  fiscalYear: string; biennium: string; budgetType: string; stateAccount: string;
  fundingAuthority: string; fundSource: string; fundingSubjectToAgreement: string; partnerAgency: string;
  statewideTotal: number | null; pugetSoundTotal: number | null;
  methodologyType: string; methodologyComment: string; generalComment: string;
}

// 16 columns, headerName VERBATIM (prod's own quirks: "ProgramID" with no
// space; "PS Portion Methodology Comment " has a trailing space in prod —
// trimmed here, recorded in the contract).
export const FINANCIALS_GRID_COLUMNS: OgpGridColumn[] = [
  { colId: 'programName',              header: 'Program Name',                                          width: 350 },
  { colId: 'programOwnerOrganization', header: 'Program Owner Organization',                             width: 350 },
  { colId: 'programId',                header: 'ProgramID',                                              width: 150 },
  { colId: 'fiscalYear',               header: 'Fiscal Year',                                            width: 140 },
  { colId: 'biennium',                 header: 'Biennium',                                               width: 150 },
  { colId: 'budgetType',               header: 'Budget Type',                                            width: 150 },
  { colId: 'stateAccount',             header: 'State Account',                                          width: 230 },
  { colId: 'fundingAuthority',         header: 'Funding Authority',                                      width: 230 },
  { colId: 'fundSource',               header: 'Fund Source',                                            width: 230 },
  { colId: 'fundingSubjectToAgreement',header: 'Funding Subject to Interagency Contractual Agreement?',  width: 230 },
  { colId: 'partnerAgency',            header: 'Name of Partner Agency Subject to Agreement',            width: 230 },
  { colId: 'statewideTotal',           header: 'Statewide Total - Allotted & Unallotted',                width: 230 },
  { colId: 'pugetSoundTotal',          header: 'Puget Sound Total - Allotted & Unallotted',              width: 230 },
  { colId: 'methodologyType',          header: 'Puget Sound Portion Methodology Type',                   width: 230 },
  { colId: 'methodologyComment',       header: 'PS Portion Methodology Comment',                         width: 230 },
  { colId: 'generalComment',           header: 'General Comment',                                        width: 230 },
];

// ── Program Targets page ─────────────────────────────────────────────────
export const TARGETS_TITLE = 'Program Targets'; // breadcrumbTitle verbatim
export type ProseSegment = { text: string } | { link: { label: string; href: string } };
// Both paragraphs verbatim (&nbsp; → space). Prod wraps both links in <strong>; render links bold.
// P1 link: internal-classified host (actionagenda.pugetsoundinfo.wa.gov) → same tab, no mark.
// P2 link: prod's own href is the Outlook-safelinks-wrapped Power BI URL — carried VERBATIM
//   (unwrapped destination, recorded for the contract: https://app.powerbigov.us/view?r=eyJrIjoiYjU1Y2YzMzItOTA2MC00ZGU2LWExYzctMWExMTkzY2Q5OTcyIiwidCI6IjExZDBlMjE3LTI2NGUtNDAwYS04YmEwLTU3ZGNjMTI3ZDcyZCJ9 ).
//   gcc02.safelinks.protection.outlook.com is genuinely external → external-link mark + new tab.
// Prod also has an empty trailing <a> </a> after the Task Board link — dropped (recorded in contract).
export const TARGETS_PARAGRAPHS: ProseSegment[][] = [
  [
    { text: 'Developed through a collaborative process between the Partnership and a subset of state agency programs in 2021/22, and again in 2025/26, Program Targets are commitments about the results that Puget Sound recovery-related programs will aim to achieve over the four-year implementation period of the ' },
    { link: { label: 'Action Agenda', href: 'https://actionagenda.pugetsoundinfo.wa.gov/' } },
    { text: '. Targets provide the Partnership and the recovery community with a transparent and measurable way to assess program needs and barriers and promote increased support for programs to help them achieve their targets.' },
  ],
  [
    { text: 'Use the table below to explore the Targets, and see how the Partnership and programs are working together to overcome barriers and accelerate progress toward achieving the Targets, using the ' },
    { link: { label: 'Program Target Task Board', href: 'https://gcc02.safelinks.protection.outlook.com/?url=https%3A%2F%2Fapp.powerbigov.us%2Fview%3Fr%3DeyJrIjoiYjU1Y2YzMzItOTA2MC00ZGU2LWExYzctMWExMTkzY2Q5OTcyIiwidCI6IjExZDBlMjE3LTI2NGUtNDAwYS04YmEwLTU3ZGNjMTI3ZDcyZCJ9&data=05%7C01%7Calex.mitchell%40psp.wa.gov%7C51ef49069b75409bd39908db4b51a0aa%7C11d0e217264e400a8ba057dcc127d72d%7C0%7C0%7C638186586183266356%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C3000%7C%7C%7C&sdata=%2BIF1IVwIRSFxk7hd%2F2NGR9XZ0EZ01Rmhxesib0ty07U%3D&reserved=0' } },
    { text: ' (2022-26 Action Agenda).' },
  ],
];
export const TARGETS_PHOTO = {
  src: '/photos/ongoing-programs/targets-sound.jpg',
  alt: 'Layered forested islands and calm channels of Puget Sound receding into blue haze at dusk.',
  width: 1000, height: 666,
};
// Prod toolbar labels/placeholder verbatim:
export const TREE_EXPAND_LABEL = 'Expand Level';
export const TREE_COLLAPSE_LABEL = 'Collapse Level';
export const TREE_SEARCH_PLACEHOLDER = 'Search...';

export type TargetTrend = 'On Track' | 'Off Track' | 'Data Pending';
export type TargetStatus = 'Met Target' | 'Below Target' | 'Data Pending';
export interface OgpTarget { title: string; owner: string; ownerLink: string;
  trend: TargetTrend; trendIcon: string; status: TargetStatus; statusIcon: string; }
export interface OgpTargetProgram { name: string; link: string; targets: OgpTarget[]; }
export interface OgpTargetCycle { title: string; programs: OgpTargetProgram[]; }
// Full tree imported from ./ongoing-programs-targets.json (2 cycles, 22 programs, 37 targets — complete).
import targetCyclesJson from './ongoing-programs-targets.json';
export const TARGET_CYCLES = targetCyclesJson as OgpTargetCycle[];

// Icon filename mapping (assets are prod's own icons, downloaded):
export const TREND_ICON: Record<TargetTrend, string> = {
  'On Track': 'trend-ontrack.png', 'Off Track': 'trend-offtrack.png', 'Data Pending': 'trend-datapending.png' };
export const STATUS_ICON: Record<TargetStatus, string> = {
  'Met Target': 'status-targetmet.png', 'Below Target': 'status-belowtarget.png', 'Data Pending': 'status-datapending.png' };
// Prod's exact alt-text builders (verbatim format, including the missing space after the colon):
export const trendAlt = (t: string) => `An image representing the trend of an Ongoing Program Target. Display name of the trend:${t}`;
export const statusAlt = (s: string) => `An image representing the status of an Ongoing Program Target. Display name of the status:${s}`;

// ── Data Dashboard page ──────────────────────────────────────────────────
export const DASHBOARD_TITLE = 'Data Dashboard'; // breadcrumbTitle verbatim
export const DASHBOARD_INTRO = // verbatim (&nbsp; → space)
  'See the charts below for a summary of state and federal Ongoing Programs by Vital Sign, Activity Type and biennial funding. Filter the data and expand the tables at the bottom of the charts to view relevant programs selected via the filter.';
// Prod GoogleChartJsons legendTitles, verbatim:
export const CHART_VITALSIGN_TITLE = 'Number of Programs by Vital Sign';           // BarChart (horizontal), axis 'Number of Programs'
export const CHART_ACTIVITY_TITLE  = 'Number of Programs by Activity Type';        // BarChart (horizontal), axis 'Number of Programs'
export const CHART_BUDGET_TITLE    = 'State Agency Ongoing Program Estimated Puget Sound Budget'; // ColumnChart stacked, hAxis 'State Biennium'
export const CHART_COUNT_AXIS_LABEL = 'Number of Programs';
export const CHART_BUDGET_AXIS_LABEL = 'State Biennium';
export const CHART_VS_CATEGORY_AXIS = 'Vital Sign';         // prod vAxis title, verbatim
export const CHART_AT_CATEGORY_AXIS = 'Activity Type';      // prod vAxis title, verbatim
export const CHART_BUDGET_VALUE_AXIS = 'Estimated Puget Sound Budget'; // prod vAxis title, verbatim
export const FILTER_ORG_LABEL = 'Filter by Organization Type';  // prod control title/aria-label verbatim
export const FILTER_BUDGET_LABEL = 'Filter by Budget Type';     // prod control title/aria-label verbatim
// Prod's per-chart expander band reads "VIEW {n} SELECTED PROGRAMS" (uppercase
// is prod's styling). Here the band is a link to the Program List page and
// carries the chart's own stored unfiltered count (counts.programsWith*);
// it hides while a filter is active — the captured aggregation can't compute
// a filtered DISTINCT-program count (per-row org-type counts double-tag).
export const viewSelectedProgramsLabel = (n: number) => `View ${n} selected programs`;

export interface OgpChartCategoryRow { label: string; byOrgType: Record<string, number>; total: number; }
export interface OgpBudgetRow { biennium: string; byBudgetType: Record<string, number>; }
export interface OgpBudgetSourceRow { biennium: string; bySource: Record<string, number>; }
import dashboardJson from './ongoing-programs-dashboard.json';
export const DASHBOARD_DATA = dashboardJson as {
  organizationTypes: string[]; budgetTypes: string[]; bienniums: string[]; fundSources: string[];
  programsByVitalSign: OgpChartCategoryRow[]; programsByActivityType: OgpChartCategoryRow[];
  budgetByBiennium: OgpBudgetRow[];
  /** Prod's budget chart's own displayed series (State/Other), verbatim from
   *  the chart's XLSX export (2026-07-23). budgetByBiennium above is the
   *  same totals cut by Budget Type — the two cuts reconcile exactly; the
   *  record-level biennium × budgetType × fundSource cross was never
   *  captured, which is why the chart can't offer prod's budget-type filter
   *  over this series (see contract). */
  budgetBySource: OgpBudgetSourceRow[];
  counts: { programsWithVitalSigns: number; programsWithActivityTypes: number; financialRecords: number };
};
// Prod's budget chart series colors (State sage green / Other gray, sampled
// from prod's own rendered chart 2026-07-23 — chart content, not chrome).
export const BUDGET_SOURCE_COLORS: Record<string, string> = {
  State: '#8fad71', Other: '#c8c8c8' };
// The fund-source filter's label. NOT verbatim: prod's control is "Filter by
// Budget Type" over record-level data we don't have; the honest filter over
// the displayed State/Other series needs its own name.
export const FILTER_SOURCE_LABEL = 'Filter by Fund Source';
