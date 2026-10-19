// DELTA-1337 Salmon Habitat Indicators: the stories and the prototype pages
// that answer each one; `example` picks the page each story's section shows. Story
// titles are the Jira titles, verbatim; labels are PSP's own terms (VSI, VSI+,
// SHI), shown on the epic page only.
import type { Epic } from './types.ts';

const SHI = '/prototypes/salmon-habitat-indicators';

export const SHI_EPIC: Epic = {
  key: 'DELTA-1337',
  title: 'Salmon Habitat Indicators',
  route: '/shi',
  stories: [
    {
      key: 'DELTA-1343',
      title: 'Show Importance to Salmon on VSI detail pages',
      pages: [
        { title: 'Floodplain Function in Large and Small River Systems', label: 'VSI', route: `${SHI}/vital-sign-indicators/floodplain-function` },
        { title: 'Summer Low Flow in Streams and Rivers', label: 'VSI+', route: `${SHI}/vital-sign-indicators/summer-low-flow`, example: true },
      ],
    },
    {
      key: 'DELTA-1344',
      title: 'Add the VSI Plus metric to the Complete Indicator Report',
      pages: [
        { title: 'Summer Low Flow in Streams and Rivers', label: 'VSI+', route: `${SHI}/indicator-reports/summer-low-flow`, example: true },
        { title: 'Floodplain Function in Large and Small River Systems', label: 'VSI', route: `${SHI}/indicator-reports/floodplain-function` },
      ],
    },
    {
      key: 'DELTA-1345',
      title: 'Build standalone SHI pages',
      pages: [
        { title: 'Fish Passage at Road Crossings', label: 'SHI', route: `${SHI}/indicators/fish-passage`, example: true },
        { title: 'Large Wood in Streams', label: 'SHI', route: `${SHI}/indicators/large-wood` },
      ],
    },
    {
      key: 'DELTA-1346',
      title: 'Mark SHIs in indicator tables',
      pages: [
        { title: 'All Vital Sign Indicators', route: `${SHI}/all-indicators`, example: true },
        { title: 'Vital Sign Goal: Functioning Habitat', route: `${SHI}/vital-sign-goals/functioning-habitat` },
        { title: 'Vital Sign Goal: Healthy Water Quality', route: `${SHI}/vital-sign-goals/healthy-water-quality` },
        { title: 'Summer Low Flow in Streams and Rivers', label: 'VSI+', route: `${SHI}/indicator-reports/summer-low-flow` },
      ],
    },
    {
      key: 'DELTA-1347',
      title: 'Build the SHI landing page',
      pages: [
        { title: 'Puget Sound Salmon Habitat Indicators', route: SHI, example: true },
        { title: 'All Salmon Habitat Indicators as a List', route: `${SHI}/list` },
      ],
    },
  ],
};
