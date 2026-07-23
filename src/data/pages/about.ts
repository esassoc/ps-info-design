// about.ts — content for src/pages/prototypes/about.astro.
//
// Sourced 2026-07-17 from https://www.pugetsoundinfo.wa.gov/About (server-
// rendered ASP.NET; no JS-gated content — every visible word on the page is
// captured here). The three Q&A headings ("WHAT IS PUGET SOUND INFO?", etc.)
// were plain ALL-CAPS <p> tags in source markup, not semantic headings — the
// words are verbatim, only the shouting-caps styling is normalized to
// sentence case to render as real <h2> section titles (no ornamental caps
// labels in this design system). Everything else — sentence wording, partner
// org names, link labels, the funding disclaimer — is copied verbatim,
// including the source's own typo in "Strategic Intiative Leads".
//
// Inline links from the source prose are modeled as ordered text/link
// segments so paragraphs render with links in their original sentence
// position. Links to pages this prototype has consolidated into its own IA
// (Vital Signs, Action Agenda Explorer, NEP Atlas, Ongoing Programs Portal,
// Progress Indicators — see psinfo-nav.ts) are marked `internal` so the build
// stage points them at the in-shell route instead of the live subdomain.
// Links to sites outside this prototype's IA (psp.wa.gov, epa.gov, partner
// orgs) stay `external`. The two "contact the Partnership" CTAs are the
// source's own mailto (wessyl.kelly@psp.wa.gov). The disclaimer's nested
// <strong> around the grant number (source: an <em> wrapping plain text with
// a <strong>-wrapped grant number, brackets outside the strong) is modeled
// via an optional `strong` flag on the text-segment variant of AboutSegment.

export interface AboutPhoto {
  /** public/ path of the photograph. */
  image: string;
  alt: string;
}

export interface AboutInternalLink {
  kind: 'internal';
  text: string;
  /** Root-relative route; resolve with withBase() at render time. */
  route: string;
}
export interface AboutExternalLink {
  kind: 'external';
  text: string;
  /** Absolute URL, outside this prototype. */
  href: string;
}
export interface AboutMailtoLink {
  kind: 'mailto';
  text: string;
  email: string;
  subject?: string;
}
export type AboutLink = AboutInternalLink | AboutExternalLink | AboutMailtoLink;

export type AboutSegment =
  | { type: 'text'; text: string; /** Source wrapped this run in <strong> (nested inside the disclaimer's <em>). */ strong?: boolean }
  | { type: 'link'; link: AboutLink };

export interface AboutParagraph {
  segments: AboutSegment[];
  /** Source wrapped this paragraph in <em> (the EPA funding disclaimer). */
  emphasis?: boolean;
}

export interface AboutPartnerOrg {
  name: string;
  href: string;
}

export type AboutBlock =
  | { type: 'paragraph'; paragraph: AboutParagraph }
  | { type: 'partners'; partners: AboutPartnerOrg[] };

export interface AboutSection {
  id: string;
  heading: string;
  blocks: AboutBlock[];
}

// ── Hero ─────────────────────────────────────────────────────────────────
// Title matches the page's own <title>/breadcrumb ("About Puget Sound Info").
// Header is plain (esa-page-header) with no lede: the source has no intro
// copy distinct from Section 2's own opening sentence, so a lede here would
// duplicate content the source states once (see contract).
export const ABOUT_HERO = {
  title: 'About Puget Sound Info',
};

// ── The page's own photography (3 inline images at the top of the article) ─
export const ABOUT_PHOTOS: AboutPhoto[] = [
  { image: '/photos/about/orca.jpg', alt: 'An orca surfacing in Puget Sound' },
  { image: '/photos/about/farmland-mountains.jpg', alt: 'Farmland and forested foothills near the Puget Sound watershed' },
  { image: '/photos/about/shoreline.jpg', alt: 'Storm clouds over a Puget Sound beach at low tide' },
];

// ── Narrative sections, in source order ─────────────────────────────────────
export const ABOUT_SECTIONS: AboutSection[] = [
  {
    id: 'what-is-puget-sound-info',
    heading: 'What is Puget Sound Info?',
    blocks: [
      {
        type: 'paragraph',
        paragraph: {
          segments: [
            {
              type: 'text',
              text: 'Puget Sound Info is a collaborative platform for sharing and reporting information about Puget Sound recovery priorities, investments, accomplishments, and progress toward near-term results and long-term recovery goals. The platform launched in June 2019 and is expected to grow over time to support and accelerate Puget Sound recovery and the collective impact of partner activities.',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'who-is-involved',
    heading: 'Who is involved in developing and maintaining Puget Sound Info?',
    blocks: [
      {
        type: 'paragraph',
        paragraph: {
          segments: [
            { type: 'text', text: 'Development of Puget Sound Info is guided by an oversight group comprising partners involved in Puget Sound recovery and the ' },
            { type: 'link', link: { kind: 'external', text: 'Puget Sound National Estuary Program', href: 'https://www.psp.wa.gov/NEP-overview.php' } },
            { type: 'text', text: '. Information about activities and progress is reported by hundreds of partners in the (now decommissioned) Action Agenda Tracker (see the ' },
            { type: 'link', link: { kind: 'external', text: '2018 Action Agenda Archive', href: 'https://www.psp.wa.gov/2018-2022-action-agenda-explorer.php' } },
            { type: 'text', text: '), the ' },
            { type: 'link', link: { kind: 'internal', text: 'National Estuary Program Atlas', route: '/prototypes/nep-atlas' } },
            { type: 'text', text: ', the ' },
            { type: 'link', link: { kind: 'internal', text: 'Ongoing Programs Portal', route: '/prototypes/ongoing-programs' } },
            { type: 'text', text: ', and the websites for the ' },
            { type: 'link', link: { kind: 'internal', text: 'Progress Indicators', route: '/prototypes/indicators' } },
            { type: 'text', text: ' and the ' },
            { type: 'link', link: { kind: 'internal', text: 'Vital Signs', route: '/prototypes/vital-signs' } },
            { type: 'text', text: '. Information about the current 4-year plan to recover Puget Sound is found in the ' },
            { type: 'link', link: { kind: 'internal', text: 'Action Agenda Explorer', route: '/prototypes/action-agenda' } },
            { type: 'text', text: '. The Partnership maintains the Puget Sound Info platform.' },
          ],
        },
      },
      {
        type: 'paragraph',
        paragraph: {
          segments: [
            { type: 'text', text: 'The oversight group guiding development of Puget Sound Info currently includes representatives from each of the following partner organizations:' },
          ],
        },
      },
      {
        type: 'partners',
        partners: [
          { name: 'Local Integrating Organizations', href: 'https://www.psp.wa.gov/LIO-overview.php' },
          { name: 'National Estuary Program Strategic Intiative Leads', href: 'https://pugetsoundestuary.wa.gov/' },
          { name: 'Northwest Indian Fisheries Commission', href: 'https://nwifc.org/' },
          { name: 'Puget Sound Ecosystem Monitoring Program (PSEMP)', href: 'https://www.psp.wa.gov/PSEMP-overview.php' },
          { name: 'Puget Sound Institute at the University of Washington, Tacoma', href: 'https://www.pugetsoundinstitute.org/' },
          { name: 'Puget Sound Partnership', href: 'http://www.psp.wa.gov' },
          { name: 'U.S. Environmental Protection Agency - Region 10', href: 'https://www.epa.gov/puget-sound' },
        ],
      },
      {
        type: 'paragraph',
        paragraph: {
          segments: [
            { type: 'text', text: 'If you are interested in exploring ways to expand the platform to incorporate related Puget Sound recovery efforts, please ' },
            { type: 'link', link: { kind: 'mailto', text: 'contact the Partnership', email: 'wessyl.kelly@psp.wa.gov', subject: 'PS Info inquiry' } },
            { type: 'text', text: '.' },
          ],
        },
      },
    ],
  },
  {
    id: 'how-is-funded',
    heading: 'How is Puget Sound Info funded?',
    blocks: [
      {
        type: 'paragraph',
        paragraph: {
          segments: [
            { type: 'text', text: 'Puget Sound Info development has been funded by the ' },
            { type: 'link', link: { kind: 'external', text: 'Puget Sound Partnership', href: 'http://www.psp.wa.gov' } },
            { type: 'text', text: ', the Washington State agency responsible for leading and coordinating Puget Sound recovery, and with funds to the Partnership through the ' },
            { type: 'link', link: { kind: 'external', text: "EPA's National Estuary Program", href: 'https://www.epa.gov/nep/overview-national-estuary-program' } },
            { type: 'text', text: '. If you have funds and would like to build on the platform, please ' },
            { type: 'link', link: { kind: 'mailto', text: 'contact the Partnership', email: 'wessyl.kelly@psp.wa.gov', subject: 'PS Info inquiry' } },
            { type: 'text', text: '.' },
          ],
        },
      },
      {
        type: 'paragraph',
        paragraph: {
          emphasis: true,
          segments: [
            {
              type: 'text',
              text: 'This project has been funded wholly or in part by the United States Environmental Protection Agency under Assistance Agreement [',
            },
            { type: 'text', text: 'CE-01J31901', strong: true },
            {
              type: 'text',
              text: ']. The contents of this platform do not necessarily reflect the views and policies of the Environmental Protection Agency, nor does mention of trade names or commercial products constitute endorsement or recommendation for use.',
            },
          ],
        },
      },
    ],
  },
];
