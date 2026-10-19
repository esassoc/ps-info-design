// design-index.ts: the Salmon Habitat Indicator prototypes, grouped by the Jira
// story each one answers. Drives /shi, the walkthrough list for the PSP review.

export interface DesignEntry {
  title: string;
  /** The indicator's type: VSI, VSI+ or SHI. */
  detail?: string;
  /** Root-relative, base-less route; wrap with withBase() at render. */
  route: string;
}

export interface DesignStory {
  /** Jira key, e.g. DELTA-1343. */
  key: string;
  title: string;
  entries: DesignEntry[];
}

export const JIRA_BROWSE = 'https://sitkatech.atlassian.net/browse/';
export const SHI_EPIC = { key: 'DELTA-1337', title: 'Salmon Habitat Indicators' };

const SHI = '/prototypes/salmon-habitat-indicators';

export const SHI_STORIES: DesignStory[] = [
  {
    key: 'DELTA-1343',
    title: 'Show Importance to Salmon on VSI detail pages',
    entries: [
      { title: 'Floodplain Function in Large and Small River Systems', detail: 'VSI', route: `${SHI}/vital-sign-indicators/floodplain-function` },
      { title: 'Summer Low Flow in Streams and Rivers', detail: 'VSI+', route: `${SHI}/vital-sign-indicators/summer-low-flow` },
    ],
  },
  {
    key: 'DELTA-1344',
    title: 'Add the VSI Plus metric to the Complete Indicator Report',
    entries: [
      { title: 'Summer Low Flow in Streams and Rivers', detail: 'VSI+', route: `${SHI}/indicator-reports/summer-low-flow` },
      { title: 'Floodplain Function in Large and Small River Systems', detail: 'VSI', route: `${SHI}/indicator-reports/floodplain-function` },
    ],
  },
  {
    key: 'DELTA-1345',
    title: 'Build standalone SHI pages',
    entries: [
      { title: 'Fish Passage at Road Crossings', detail: 'SHI', route: `${SHI}/indicators/fish-passage` },
      { title: 'Large Wood in Streams', detail: 'SHI', route: `${SHI}/indicators/large-wood` },
    ],
  },
  {
    key: 'DELTA-1346',
    title: 'Mark SHIs in indicator tables',
    entries: [
      { title: 'All Vital Sign Indicators', route: `${SHI}/all-indicators` },
      { title: 'Vital Sign Goal: Functioning Habitat', route: `${SHI}/vital-sign-goals/functioning-habitat` },
      { title: 'Vital Sign Goal: Healthy Water Quality', route: `${SHI}/vital-sign-goals/healthy-water-quality` },
    ],
  },
  {
    key: 'DELTA-1347',
    title: 'Build the SHI landing page',
    entries: [
      { title: 'Puget Sound Salmon Habitat Indicators', route: SHI },
      { title: 'All Salmon Habitat Indicators as a List', route: `${SHI}/list` },
    ],
  },
];
