// DELTA-912, under DELTA-1338 (FY 2027 Feature Development): the Vital Signs
// home page and the All Indicators page as one page, with a roll-up of
// indicator progress and target status, in two directions: the wheel beside the
// roll-up, and the illustrated whole-Sound map. Story title is the Jira title, verbatim.
import type { Epic } from './types.ts';

export const VITAL_SIGNS_EPIC: Epic = {
  key: 'DELTA-1338',
  title: 'Vital Signs Homepage',
  route: '/vital-signs-home',
  stories: [
    {
      key: 'DELTA-912',
      title: 'View a roll up of VSI progress and status on the Vital Sign homepage',
      pages: [
        { title: 'Puget Sound Vital Signs', label: 'Wheel', route: '/prototypes/vital-signs/home' },
        { title: 'Puget Sound Vital Signs', label: 'Map', route: '/prototypes/vital-signs/home-sound', example: true },
      ],
    },
  ],
};
