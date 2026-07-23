/**
 * psinfoAaIcons — shared trend/target icon maps for the Action Agenda Topic
 * exemplar's indicator components (PsInfoAaIndicatorExplorer,
 * PsInfoAaIndicatorsTable). Every filename is a prod
 * OngoingProgramTargetIcons / IndicatorIcons asset downloaded verbatim into
 * public/photos/action-agenda/icons/ (see the Topic 05 asset list in the
 * action-agenda contract addendum).
 */
import type { AaTrendLabel } from '../data/pages/action-agenda';

export const AA_TREND_ICON: Record<AaTrendLabel, string> = {
  'Getting Better': '/photos/action-agenda/icons/progress-gettingbetter.png',
  'Getting Worse': '/photos/action-agenda/icons/progress-gettingworse.png',
  'No Trend': '/photos/action-agenda/icons/progress-notrend.png',
  'Limited Data': '/photos/action-agenda/icons/progress-limiteddata.png',
  'Indicator To Be Developed': '/photos/action-agenda/icons/progress-tobedeveloped.png',
};

/** Only value in use across the Topic 05 dataset is 'Limited Data'; typed for future targets. */
export const AA_TARGET_STATUS_ICON: Record<'Limited Data', string> = {
  'Limited Data': '/photos/action-agenda/icons/status-limiteddata.png',
};
