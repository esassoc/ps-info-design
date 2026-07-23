// lios.ts — content for src/pages/prototypes/lios.astro.
//
// Sourced 2026-07-23 from https://www.pugetsoundinfo.wa.gov/LIOs (live prod
// fetch; page <title> "PS Info  | LIOs", breadcrumb "LIOs"), superseding the
// 2026-07-22 QA DOM snapshot — the QA render dropped this page's inline links
// and paragraph breaks, and revision direction 2026-07-23 restored www as the
// source of truth. Every string below is verbatim from the prod HTML — the
// only change is stripping the source's Word-export markup (TextRun/
// NormalTextRun spans, trailing &nbsp; and U+202F narrow-space characters).
//
// The page's two live widgets are embedded with the SAME public iframe srcs
// the source uses (LIO_MAP_EMBED / CALENDAR_EMBED below) — title attribute,
// src, and prod pixel height carried verbatim from the source iframes.
//
// EXCEPTION — LIO_AREAS is NOT static-DOM copy: the per-LIO directory lives
// only inside the ArcGIS Experience Builder widget (iframe "Local Areas and
// LIOs"). The records below are that widget's own backing public feature
// service, owned by the site's org (WA_PSP_Admin), queried 2026-07-17:
//   https://services7.arcgis.com/iAd79FjHxHKsLP0y/arcgis/rest/services/
//   PSP_Local_Areas_and_LIOs/FeatureServer/0
// (fields LocalArea / ActionArea / Organization / LinktoWebsite). The service
// returns 11 local management areas; Skagit / Samish has LIO="N" ("-- No LIO
// --") and is excluded — the remaining 10 match the page's own "There are
// currently 10 active LIOs" sentence exactly. All 10 records are carried in
// full (no truncation). San Juan's LinktoWebsite is the literal string
// "Coming....." (not a URL) — modeled as website: null, rendered with no
// outbound link. The directory renders as an accessible HTML complement
// directly below the embedded map widget.
//
// The www source's "Each LIO develops" section carries three links the QA DOM
// lacked: the Box-folder href on "Ecosystem Recovery Plan" and two PowerBI
// dashboard links nested one level under "Topical LIO Action Plans"
// (Healthy Shorelines / Onsite Sewage Systems Action Plans). All three are
// carried below with prod's own hrefs.
//
// No photographs on this page: its only image is a 15x15 decorative
// "external link icon" (base64 webp, the source's own link chrome) —
// superseded by this repo's external-link icon convention.

import type { ProseSegment } from './ongoing-programs';

export const SOURCE_URL = 'https://www.pugetsoundinfo.wa.gov/LIOs';

export const PAGE_TITLE = 'Local Integrating Organizations';

/** The page's own two intro paragraphs (verbatim, directly under the H2
 *  title — prod renders them as two separate paragraphs, i.e. two table rows;
 *  rendered as the header's multi-paragraph lede, never joined). */
export const INTRO_PARAGRAPHS: string[] = [
  'Local Integrating Organizations (LIOs) are local forums that bring people together to protect and restore the ecosystem through locally specific strategies and actions. LIOs provide a venue for stakeholders and partners to identify and develop locally driven recovery strategies.',
  'There are currently 10 active LIOs representing different areas of Puget Sound. Each LIO receives funding to support planning and coordination efforts within their regional watershed.',
];

/** A live third-party widget embedded with the source page's own iframe src.
 *  title / src / height are verbatim from the source iframe attributes. */
export interface LiosEmbed {
  /** Source iframe's own title attribute (accessible name). */
  title: string;
  src: string;
  /** Source iframe's fixed pixel height. */
  height: number;
}
/** Source: <iframe title="Local Areas and LIOs" ... width="90%" height="950">. */
export const LIO_MAP_EMBED: LiosEmbed = {
  title: 'Local Areas and LIOs',
  src: 'https://experience.arcgis.com/experience/aecf0b6c022a41e8b614c702c5513bba',
  height: 950,
};
/** Source: <iframe title="LIO Public Meeting Calendar_final2" ... width="90%" height="1050">. */
export const CALENDAR_EMBED: LiosEmbed = {
  title: 'LIO Public Meeting Calendar_final2',
  src: 'https://app.powerbigov.us/view?r=eyJrIjoiNmNjZDlkYzctMjRiMi00MDlmLWIzNWEtZmQ1Njc1ZjZkM2FjIiwidCI6IjExZDBlMjE3LTI2NGUtNDAwYS04YmEwLTU3ZGNjMTI3ZDcyZCJ9',
  height: 1050,
};

/** The "What makes an LIO?" callout (source: #abbaea-tinted cell, italic h4). */
export interface LioParticipants {
  title: string;
  lead: string;
  items: string[];
  closing: string;
}
export const PARTICIPANTS: LioParticipants = {
  title: 'What makes an LIO?',
  lead: 'LIO participants include:',
  items: [
    'Elected officials (Tribal, state, county, and city)',
    'Local government staff, nonprofit organizations, special districts (for example, conservation districts)',
    'Salmon recovery groups',
    'Agriculture, businesses, and industry members',
    'Educational institutions',
    'Local residents',
  ],
  closing: 'These groups all work together to develop recovery priorities and implement the Action Agenda.',
};

/** One record from the PSP_Local_Areas_and_LIOs feature service (LIO="Y" rows only — see header comment). */
export interface LioArea {
  /** "LocalArea" field. */
  localArea: string;
  /** "ActionArea" field. */
  actionArea: string;
  /** "Organization" field — the LIO's own name. */
  organization: string;
  /** "LinktoWebsite" field. null when the service has no real URL (San Juan: literal "Coming....."). */
  website: string | null;
}
export const LIO_AREAS: LioArea[] = [
  { localArea: 'Hood Canal', actionArea: 'Hood Canal', organization: 'Hood Canal Coordinating Council', website: 'https://hccc.wa.gov/' },
  { localArea: 'West Sound', actionArea: 'North Central Puget Sound', organization: 'West Sound Partners for Ecosystem Recovery', website: 'https://westsoundpartners.org/' },
  { localArea: 'Whatcom', actionArea: 'San Juan - Whatcom', organization: 'Whatcom Local Integrating Organization', website: 'https://wria1project.whatcomcounty.org/home' },
  { localArea: 'South Central', actionArea: 'South Central Puget Sound', organization: 'South Central Action Area Caucus Group', website: 'https://www.govlink.org/sc-puget-sound-action-area/Index.htm' },
  { localArea: 'South Sound', actionArea: 'South Puget Sound', organization: 'Alliance for a Healthy South Sound', website: 'https://www.healthysouthsound.org/' },
  { localArea: 'Strait of Juan de Fuca', actionArea: 'Strait of Juan de Fuca', organization: 'Strait Ecosystem Recovery Network', website: 'https://www.straitern.org/' },
  { localArea: 'San Juan', actionArea: 'San Juan / Whatcom', organization: 'San Juan Action Agenda Oversight Group', website: null },
  { localArea: 'Island', actionArea: 'Whidbey', organization: 'Island County Local Integrating Organization', website: 'https://www.islandcountywa.gov/Health/DNR/ILIO/Pages/Home.aspx' },
  { localArea: 'Snohomish / Stillaguamish', actionArea: 'Whidbey', organization: 'Snohomish-Stillaguamish Local Integrating Organization', website: 'https://snohomishcountywa.gov/3555/Local-Integrating-Organization-LIO' },
  { localArea: 'Puyallup / White', actionArea: 'South Central Puget Sound', organization: 'Puyallup-White River Local Integrating Organization', website: 'https://puyallupwatershed.org/' },
];
export const TOTAL_ACTIVE_LIOS = LIO_AREAS.length; // 10 — the figure the source's own intro states

/** "Each LIO develops:" — lead, two plan types (bold "label - " lead-in
 *  including the hyphen, exactly as prod bolds it), closing paragraph.
 *  Prod wraps part of the first label in a link ("An <a>Ecosystem Recovery
 *  Plan</a> -" → the PSP Box folder), hence label as ProseSegment[]; the two
 *  topical dashboards nest one bullet level under "Topical LIO Action Plans". */
export interface LioPlanType {
  /** Bold lead-in; prod bolds "label - " with any inline link inside the bold. */
  label: ProseSegment[];
  body: string;
  /** Linked plan dashboards nested one level under this plan type (prod's
   *  sub-list under Topical LIO Action Plans). */
  subLinks?: { label: string; href: string }[];
}
export interface LiosPlansSection {
  lead: string;
  planTypes: LioPlanType[];
  /** Prod indents this paragraph to the list's alignment (source
   *  padding-left: 40px — rendered at the list's own token step). */
  closing: string;
}
export const PLANS_SECTION: LiosPlansSection = {
  lead: 'Each LIO develops:',
  planTypes: [
    {
      label: [
        { text: 'An ' },
        { link: { label: 'Ecosystem Recovery Plan', href: 'https://pspwa.app.box.com/folder/375341439999' } },
      ],
      body: 'These outline key local strategies and actions that support local ecosystem recovery and help inform regional priorities.',
    },
    {
      label: [{ text: 'Topical LIO Action Plans' }],
      body: 'These focus on a topic of particular interest to the LIOs and document specific local priorities.',
      subLinks: [
        { label: 'Healthy Shorelines Action Plans', href: 'https://app.powerbigov.us/view?r=eyJrIjoiYzBlMjgxMGUtOTE3Ny00ZDYzLTk5YmEtZTM2M2NmZjkzMzhiIiwidCI6IjExZDBlMjE3LTI2NGUtNDAwYS04YmEwLTU3ZGNjMTI3ZDcyZCJ9' },
        { label: 'Onsite Sewage Systems Action Plans', href: 'https://app.powerbigov.us/view?r=eyJrIjoiZjIwYzE5YjgtYTBlMi00YzdhLWIxMGEtNmVmYzhiZDhiMThhIiwidCI6IjExZDBlMjE3LTI2NGUtNDAwYS04YmEwLTU3ZGNjMTI3ZDcyZCJ9' },
      ],
    },
  ],
  closing: 'LIO Action Plans focus on a particular topic of ecosystem recovery and outline the gaps, needs, and barriers to advance recovery goals. The actions included within these plans represent ambitious yet achievable actions which can be accomplished, tracked, and described during the 4-year cycle of the Action Agenda. These plans tailor Action Agenda goals to the needs and conditions of local areas in Puget Sound.',
};

/** The public-meeting-calendar close: italic double-exclamation h4 (verbatim),
 *  the "Open calendar in new window" link, then the live embed (CALENDAR_EMBED
 *  above — same URL as the link). */
export interface LiosCalendarCta {
  heading: string;
  linkLabel: string;
  href: string;
}
export const CALENDAR_CTA: LiosCalendarCta = {
  heading: 'Explore the LIO Public Meeting calendar below!!',
  linkLabel: 'Open calendar in new window',
  href: 'https://app.powerbigov.us/view?r=eyJrIjoiNmNjZDlkYzctMjRiMi00MDlmLWIzNWEtZmQ1Njc1ZjZkM2FjIiwidCI6IjExZDBlMjE3LTI2NGUtNDAwYS04YmEwLTU3ZGNjMTI3ZDcyZCJ9',
};
