// src/data/pages/web-services.ts — content for the Web Services unit
// (Overview module). Scraped verbatim 2026-07-17 from:
//   https://www.pugetsoundinfo.wa.gov/WebServices/Index
//
// The live page is a flat, alphabetically-ordered reference list of 28 data
// endpoints (no category sub-headings in the source — "Action Agenda…" <
// "Fund…" < "NEP…" < "Ongoing Program…" < "Progress Indicator…" <
// "Puget Sound Indicator…" < "Vital Sign…" is just alphabetical sort, not an
// authored grouping). Order and wording are preserved exactly, including one
// source oddity ("NEP Activity by ID" describes itself as "for a given NEP
// Activity" rather than "...NEP Activity ID"). No images on this page beyond
// site chrome/favicons — none extracted.

export const SOURCE_URL = 'https://www.pugetsoundinfo.wa.gov/WebServices/Index';
export const PAGE_TITLE = 'Web Services';
export const SITE_ORIGIN = 'https://www.pugetsoundinfo.wa.gov';

// ── Intro copy (verbatim from the page body) ────────────────────────────────
export const INTRO_PARAGRAPH =
  'Web Services are functions that can be accessed over the web (using the http protocol), typically consumed by software or programs rather than humans. The services we provide here allow programmatic access to PS Info data. The intent of these web services is to facilitate coordination and information sharing between agencies, interested parties, and the public within and outside of the Puget Sound.';

export interface WebServiceExampleUrl {
  /** Return type ("CSV" | "JSON") — derived from the endpoint path's return-type segment; metadata only, NOT rendered (prod's visible link text is just the path). */
  label: string;
  /** Absolute URL to the real endpoint on pugetsoundinfo.wa.gov. */
  url: string;
}

export interface WebService {
  title: string;
  description: string;
  exampleUrls: WebServiceExampleUrl[];
  /** "Parameters:" line, split on ", " into its listed terms — verbatim. */
  parameters: string[];
  /** "Last Updated Date:" — present on 18 of 28 services; the rest carry none. */
  lastUpdated?: string;
  /** "Change Notes:" — split on the source's <br/> line breaks where multiple notes stack. */
  changeNotes?: string[];
}

export const WEB_SERVICES: WebService[] = [
  {
    title: '2022-2026 Action Agenda Desired Outcome By ID',
    description: 'Returns the Desired Outcome for a given Outcome ID',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetOutcomeByID/CSV/1` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetOutcomeByID/JSON/1` },
    ],
    parameters: ['Return Type', 'OutcomeID'],
    lastUpdated: '05/19/2022',
    changeNotes: ['05/19/2022: Added as new web service.'],
  },
  {
    title: '2022-2026 Action Agenda Desired Outcomes',
    description: 'Returns a list of all Desired Outcomes',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetOutcomes/CSV` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetOutcomes/JSON` },
    ],
    parameters: ['Return Type'],
    lastUpdated: '05/19/2022',
    changeNotes: ['05/19/2022: Added as new web service.'],
  },
  {
    title: '2022-2026 Action Agenda Strategies',
    description: 'Returns a list of all Strategies',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetStrategies/CSV` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetStrategies/JSON` },
    ],
    parameters: ['Return Type'],
    lastUpdated: '05/19/2022',
    changeNotes: ['05/19/2022: Added as new web service.'],
  },
  {
    title: '2022-2026 Action Agenda Strategy By ID',
    description: 'Returns the Strategy for a given Strategy ID',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetStrategyByID/CSV/1` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetStrategyByID/JSON/1` },
    ],
    parameters: ['Return Type', 'StrategyID'],
    lastUpdated: '05/19/2022',
    changeNotes: ['05/19/2022: Added as new web service.'],
  },
  {
    title: 'Fund by ID',
    description: 'Returns the Fund for a given FundID',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetFundByID/CSV/1` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetFundByID/JSON/1` },
    ],
    parameters: ['Return Type', 'FundID'],
  },
  {
    title: 'Funds',
    description: 'Returns a list of all Funds',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetFunds/CSV` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetFunds/JSON` },
    ],
    parameters: ['Return Type'],
  },
  {
    title: 'NEP Activities',
    description: 'Returns a list of all NEP Activities',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetNEPActivities/CSV` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetNEPActivities/JSON` },
    ],
    parameters: ['Return Type'],
    lastUpdated: '04/05/2023',
    changeNotes: [
      '12/01/2022: Added Related Activities column',
      '04/05/2023: Added Action Agenda Strategies column',
    ],
  },
  {
    title: 'NEP Activity by ID',
    description: 'Returns the NEP Activity for a given NEP Activity',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetNEPActivityByID/CSV/13` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetNEPActivityByID/JSON/13` },
    ],
    parameters: ['Return Type', 'NEP ActivityID'],
    lastUpdated: '04/05/2023',
    changeNotes: [
      '12/01/2022: Added Related Activities column',
      '04/05/2023: Added Action Agenda Strategies column',
    ],
  },
  {
    title: 'NEP Activity Expenditures',
    description: 'Returns a list of all NEP Activity Expenditure records',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetNEPActivityExpenditure/CSV` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetNEPActivityExpenditure/JSON` },
    ],
    parameters: ['Return Type'],
    lastUpdated: '12/01/2022',
    changeNotes: ['12/01/2022: Added web service'],
  },
  {
    title: 'NEP Activity Expenditures by Activity ID',
    description: 'Returns a list of all NEP Expenditure records for a given NEPActivityID',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetNEPActivityExpenditureByNEPActivityID/CSV/13` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetNEPActivityExpenditureByNEPActivityID/JSON/13` },
    ],
    parameters: ['Return Type', 'NEP ActivityID'],
    lastUpdated: '12/01/2022',
    changeNotes: ['12/01/2022: Added web service'],
  },
  {
    title: 'NEP Activity Reported Funding',
    description: 'Returns a list of all NEP Activity Funding records',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetNEPActivityReportedFunding/CSV` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetNEPActivityReportedFunding/JSON` },
    ],
    parameters: ['Return Type'],
    lastUpdated: '12/01/2022',
    changeNotes: ['12/01/2022: Renamed "Financials" to "Reported Funding"'],
  },
  {
    title: 'NEP Activity Reported Funding by Activity ID',
    description: 'Returns a list of all NEP Funding records for a given NEPActivityID',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetNEPActivityReportedFundingByNEPActivityID/CSV/13` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetNEPActivityReportedFundingByNEPActivityID/JSON/13` },
    ],
    parameters: ['Return Type', 'NEP ActivityID'],
    lastUpdated: '12/01/2022',
    changeNotes: ['12/01/2022: Renamed "Financials" to "Reported Funding"'],
  },
  {
    title: 'NEP Award by ID',
    description: 'Returns the NEP Award for a given NEPAwardID',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetNEPAwardByID/CSV/1` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetNEPAwardByID/JSON/1` },
    ],
    parameters: ['Return Type', 'AwardID'],
  },
  {
    title: 'NEP Awards',
    description: 'Returns a list of all NEP Awards',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetNEPAwards/CSV` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetNEPAwards/JSON` },
    ],
    parameters: ['Return Type'],
  },
  {
    title: 'Ongoing Program by ID',
    description: 'Returns the OngoingProgram for a given OngoingProgramID',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetOngoingProgramByID/CSV/6` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetOngoingProgramByID/JSON/6` },
    ],
    parameters: ['Return Type', 'Ongoing ProgramID'],
  },
  {
    title: 'Ongoing Program Financials',
    description: 'Returns a list of all Ongoing Program Financial records for a given OngoingProgramID',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetOngoingProgramFinancials/CSV` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetOngoingProgramFinancials/JSON` },
    ],
    parameters: ['Return Type'],
  },
  {
    title: 'Ongoing Program Financials by Ongoing Program ID',
    description: 'Returns a list of all Ongoing Program Financial records for a given OngoingProgramID',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetOngoingProgramFinancialsByOngoingProgramID/CSV/6` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetOngoingProgramFinancialsByOngoingProgramID/JSON/6` },
    ],
    parameters: ['Return Type', 'Ongoing ProgramID'],
  },
  {
    title: 'Ongoing Programs',
    description: 'Returns a list of all Ongoing Programs',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetOngoingPrograms/CSV` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetOngoingPrograms/JSON` },
    ],
    parameters: ['Return Type'],
  },
  {
    title: 'Progress Indicator by ID',
    description: 'Returns a list of all Progress Indicators records for a given ProgressIndicatorID',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetProgressIndicatorByID/CSV/19` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetProgressIndicatorByID/JSON/19` },
    ],
    parameters: ['Return Type', 'Progress IndicatorID'],
    lastUpdated: '05/19/2022',
    changeNotes: [
      '05/19/2022: Update terminology: "Progress Measure" is now "Puget Sound Indicator"; "Intermediate Progress Measure" is now "Progess Indicator".',
    ],
  },
  {
    title: 'Progress Indicators',
    description: 'Returns a list of all Progress Indicators',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetProgressIndicators/CSV` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetProgressIndicators/JSON` },
    ],
    parameters: ['Return Type'],
    lastUpdated: '05/19/2022',
    changeNotes: [
      '05/19/2022: Update terminology: "Progress Measure" is now "Puget Sound Indicator"; "Intermediate Progress Measure" is now "Progess Indicator".',
    ],
  },
  {
    title: 'Puget Sound Indicator by ID',
    description: 'Returns the published Puget Sound Indicator for a given PugetSoundIndicatorID',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetPugetSoundIndicatorByID/CSV/1` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetPugetSoundIndicatorByID/JSON/1` },
    ],
    parameters: ['Return Type', 'Puget Sound IndicatorID'],
    lastUpdated: '05/19/2022',
    changeNotes: [
      '05/19/2022: Update terminology: "Progress Measure" is now "Puget Sound Indicator"; "Intermediate Progress Measure" is now "Progess Indicator".',
    ],
  },
  {
    title: 'Puget Sound Indicator Reported Values',
    description: 'Returns a list of all Puget Sound Indicator Reported Values for published Puget Sound Indicators',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetPugetSoundIndicatorValues/CSV` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetPugetSoundIndicatorValues/JSON` },
    ],
    parameters: ['Return Type'],
    lastUpdated: '05/19/2022',
    changeNotes: [
      '05/19/2022: Update terminology: "Progress Measure" is now "Puget Sound Indicator"; "Intermediate Progress Measure" is now "Progess Indicator".',
    ],
  },
  {
    title: 'Puget Sound Indicator Reported Values by Puget Sound Indicator ID',
    description: 'Returns a list of all Puget Sound Indicator Reported Values for a given published PugetSoundIndicatorID',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetPugetSoundIndicatorValuesByPugetSoundIndicatorID/CSV/1` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetPugetSoundIndicatorValuesByPugetSoundIndicatorID/JSON/1` },
    ],
    parameters: ['Return Type', 'Puget Sound IndicatorID'],
    lastUpdated: '05/19/2022',
    changeNotes: [
      '05/19/2022: Update terminology: "Progress Measure" is now "Puget Sound Indicator"; "Intermediate Progress Measure" is now "Progess Indicator".',
    ],
  },
  {
    title: 'Puget Sound Indicators',
    description: 'Returns a list of all published Puget Sound Indicators',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetPugetSoundIndicators/CSV` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetPugetSoundIndicators/JSON` },
    ],
    parameters: ['Return Type'],
    lastUpdated: '05/19/2022',
    changeNotes: [
      '05/19/2022: Update terminology: "Progress Measure" is now "Puget Sound Indicator"; "Intermediate Progress Measure" is now "Progess Indicator".',
    ],
  },
  {
    title: 'Vital Sign by ID',
    description: 'Returns the Vital Sign for a given VitalSignID',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetVitalSignByID/CSV/2` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetVitalSignByID/JSON/2` },
    ],
    parameters: ['Return Type', 'Vital SignID'],
  },
  {
    title: 'Vital Sign Indicators',
    description: 'Returns a list of all Vital Sign Indicators',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetVitalSignIndicators/CSV` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetVitalSignIndicators/JSON` },
    ],
    parameters: ['Return Type'],
    lastUpdated: '05/19/2022',
    changeNotes: [
      '05/19/2022: Update terminology: "Progress Measure" is now "Puget Sound Indicator"; "Intermediate Progress Measure" is now "Progess Indicator".',
    ],
  },
  {
    title: 'Vital Sign Indicators by Vital Sign ID',
    description: 'Returns a list of all Vital Sign Indicators records for a given VitalSignID',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetVitalSignIndicatorByVitalSignID/CSV/2` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetVitalSignIndicatorByVitalSignID/JSON/2` },
    ],
    parameters: ['Return Type', 'Vital SignID'],
    lastUpdated: '05/19/2022',
    changeNotes: [
      '05/19/2022: Update terminology: "Progress Measure" is now "Puget Sound Indicator"; "Intermediate Progress Measure" is now "Progess Indicator".',
    ],
  },
  {
    title: 'Vital Signs',
    description: 'Returns a list of all Vital Signs',
    exampleUrls: [
      { label: 'CSV', url: `${SITE_ORIGIN}/WebServices/GetVitalSigns/CSV` },
      { label: 'JSON', url: `${SITE_ORIGIN}/WebServices/GetVitalSigns/JSON` },
    ],
    parameters: ['Return Type'],
  },
];
