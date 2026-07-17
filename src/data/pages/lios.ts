// lios.ts — content for src/pages/prototypes/lios.astro.
//
// Sourced 2026-07-17 from https://www.pugetsoundinfo.wa.gov/LIOs (server-
// rendered ASP.NET; page <title> "PS Info | LIOs", nav breadcrumb "LIOs").
// Every string below is verbatim from that page's visible HTML — the only
// change is stripping the source's own decorative &nbsp;/Word-export markup
// (TextRun/NormalTextRun spans, stray &#8239; narrow-space characters).
//
// GAP — the list of individual LIOs (name / area / organization / link) is
// NOT in the static HTML above. The live page renders it only inside an
// interactive ArcGIS Experience Builder widget (iframe "Local Areas and
// LIOs", src experience.arcgis.com/experience/aecf0b6c022a41e8b614c702c5513bba)
// — a JS-rendered map + list, no static thumbnail exists for it. That
// widget's own Experience config (fetched via the ArcGIS Online item's public
// /data endpoint) names its data source as a public ArcGIS Online feature
// service owned by the site's own org (WA_PSP_Admin):
//   https://services7.arcgis.com/iAd79FjHxHKsLP0y/arcgis/rest/services/
//   PSP_Local_Areas_and_LIOs/FeatureServer/0
// LIO_AREAS below is that service's own attribute data (fields LocalArea /
// ActionArea / Organization / LinktoWebsite), queried 2026-07-17 — the exact
// same "the site's own ArcGIS-hosted data" pattern home.astro's manifest
// header already documents (PSInfo_homepage_data FeatureServer) for this
// site's card photography and bioregion map. The service returns 11 local
// management areas; one (Skagit / Samish) has LIO="N" ("-- No LIO --") and is
// excluded here — the remaining 10 match the page's own "There are currently
// 10 active LIOs" sentence exactly. San Juan's LinktoWebsite attribute is the
// literal string "Coming....." in the service (not a URL) — modeled as
// website: null; render that record with no outbound link. RecoveryPlanLink
// is null for every record — there is no per-LIO recovery-plan link in this
// data; the page's own body copy instead points to one shared plans folder
// (see PLANS_SECTION below).
//
// GAP — the two PowerBI-embedded dashboards this page links to (Healthy
// Shorelines Action Plans, Onsite Sewage Systems Action Plans) and the LIO
// Public Meeting Calendar are themselves JS-rendered PowerBI reports; only
// their visible link labels + hrefs are captured, not their internal
// content.
//
// No photographs to extract from this page: its only image is a 15x15
// decorative "external link icon" (base64 webp, source's own chrome) — this
// prototype's external-link convention (arrow-up-right esa-icon mark)
// supersedes it. No files downloaded to public/photos/lios/.

export const SOURCE_URL = 'https://www.pugetsoundinfo.wa.gov/LIOs';

export const PAGE_TITLE = 'Local Integrating Organizations';

/** The page's own two-paragraph intro (a table cell, centered, no heading beyond the H2 title). */
export const INTRO_PARAGRAPHS: string[] = [
  'Local Integrating Organizations (LIOs) are local forums that bring people together to protect and restore the ecosystem through locally specific strategies and actions. LIOs provide a venue for stakeholders and partners to identify and develop locally driven recovery strategies.',
  'There are currently 10 active LIOs representing different areas of Puget Sound. Each LIO receives funding to support planning and coordination efforts within their regional watershed.',
];
/** EsaPageHeader lede — the full two-sentence intro, joined as one paragraph
 *  (this unit's header treatment is plain; there is no separate "Overview"
 *  section below it, so both INTRO_PARAGRAPHS sentences live in the lede). */
export const PAGE_LEDE = INTRO_PARAGRAPHS.join(' ');

/** The "What makes an LIO?" callout box (source: light-blue-tinted table cell). */
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

/** One record from the PSP_Local_Areas_and_LIOs feature service (LIO="Y" rows only). */
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
export const TOTAL_ACTIVE_LIOS = LIO_AREAS.length; // 10 — matches INTRO_PARAGRAPHS[1]

/** The "Each LIO develops:" section — a lead sentence, two plan types (one a
 *  bold link lead-in, one with two named sub-dashboards), and a closing
 *  paragraph. Source: nested Word-export lists inside a borderless table. */
export interface LioPlanLink {
  label: string;
  href: string;
}
export interface LioPlanType {
  /** Bold lead-in label, e.g. "An Ecosystem Recovery Plan". */
  label: string;
  /** href the label itself carries in source (Ecosystem Recovery Plan only). */
  href?: string;
  /** Body text following the label's " - " dash, verbatim. */
  body: string;
  /** Named sub-links nested under this plan type (Topical LIO Action Plans' two dashboards). */
  links?: LioPlanLink[];
}
export interface LiosPlansSection {
  lead: string;
  planTypes: LioPlanType[];
  closing: string;
}
export const PLANS_SECTION: LiosPlansSection = {
  lead: 'Each LIO develops:',
  planTypes: [
    {
      label: 'An Ecosystem Recovery Plan',
      href: 'https://pspwa.app.box.com/folder/375341439999',
      body: 'These outline key local strategies and actions that support local ecosystem recovery and help inform regional priorities.',
    },
    {
      label: 'Topical LIO Action Plans',
      body: 'These focus on a topic of particular interest to the LIOs and document specific local priorities.',
      links: [
        { label: 'Healthy Shorelines Action Plans', href: 'https://app.powerbigov.us/view?r=eyJrIjoiYzBlMjgxMGUtOTE3Ny00ZDYzLTk5YmEtZTM2M2NmZjkzMzhiIiwidCI6IjExZDBlMjE3LTI2NGUtNDAwYS04YmEwLTU3ZGNjMTI3ZDcyZCJ9' },
        { label: 'Onsite Sewage Systems Action Plans', href: 'https://app.powerbigov.us/view?r=eyJrIjoiZjIwYzE5YjgtYTBlMi00YzdhLWIxMGEtNmVmYzhiZDhiMThhIiwidCI6IjExZDBlMjE3LTI2NGUtNDAwYS04YmEwLTU3ZGNjMTI3ZDcyZCJ9' },
      ],
    },
  ],
  closing: 'LIO Action Plans focus on a particular topic of ecosystem recovery and outline the gaps, needs, and barriers to advance recovery goals. The actions included within these plans represent ambitious yet achievable actions which can be accomplished, tracked, and described during the 4-year cycle of the Action Agenda. These plans tailor Action Agenda goals to the needs and conditions of local areas in Puget Sound.',
};

/** The public-meeting-calendar callout that closes the page (source heading
 *  is italic + double exclamation — kept verbatim, styling not carried). */
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
