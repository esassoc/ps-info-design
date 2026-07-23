// vital-signs.ts — content for src/pages/prototypes/vital-signs.astro.
//
// Sourced 2026-07-17 from https://vitalsigns.pugetsoundinfo.wa.gov/ (server-
// rendered ASP.NET; <title>Vital Signs </title>, no visible on-page heading —
// the source ships `.pageTitle { display: none; }`). The page's only visual
// is an interactive wheel graphic (an image-map, reproduced structurally from
// src/data/pages/goals.ts — see the vital-signs.astro manifest header) and
// the Contributing Partners logo grid below; nothing here duplicates that
// data.
//
// The intro block runs straight from the wheel into three <p> tags with no
// h2/h3 above them — modeled as ordered text/link segments (same idea as
// about.ts) so links render in their original sentence position.
//
// "Vital Signs en Español" — the source's own href is an Outlook Safelinks
// redirect wrapping a Box URL; decoded destination rendered directly per the
// contract's judgment call (same visible link text, real destination, no
// org-internal tracking wrapper).
//
// The 33 Contributing Partners are the source's own logo grid, each an <img
// alt="An image containing the logo for {name}"> inside a link to
// pugetsoundinfo.wa.gov/Organization/Detail/{id} (the hub domain, not
// vitalsigns. — treated as external per the a11y external-link convention).
// Represented here as a name+link grid (no logo images downloaded — the
// contract leaves this an implementor's choice); org #10's trailing space in
// the source alt text is trimmed, wording otherwise untouched.

export const PAGE_TITLE = 'Vital Signs';

export const HERO = {
  image: '/photos/vital-signs/deception-pass.jpg',
  /** Source alt is caption-style ("An image with the caption: Deception Pass
   *  in northwest Puget Sound.") — authored here instead, matching the same
   *  house pattern goals.ts documents. */
  imageAlt: 'Deception Pass, a narrow strait in northwest Puget Sound, seen from above.',
  focus: '50% 55%',
};

export interface IntroLink {
  text: string;
  /** Absolute URL — every link in this block leaves the prototype. */
  href: string;
}
export type IntroSegment = { type: 'text'; text: string } | { type: 'link'; link: IntroLink };
export interface IntroParagraph {
  segments: IntroSegment[];
}

/** Item (a) — its own standalone paragraph, wrapped in <big> on the source. */
export const ESPANOL_LINK: IntroLink = {
  text: 'Vital Signs en Español',
  href: 'https://pspwa.box.com/s/q6s03tmenge1219trpxa00bcmios1xja',
};

/** Items (b) and (c) — verbatim from the source, links in original position. */
export const INTRO_PARAGRAPHS: IntroParagraph[] = [
  {
    segments: [
      { type: 'text', text: 'The ' },
      { type: 'link', link: { text: 'Puget Sound Vital Signs', href: 'https://vitalsigns.pugetsoundinfo.wa.gov/About' } },
      {
        type: 'text',
        text: ' are measures of ecosystem health and progress toward Puget Sound recovery goals. Thanks to a strong network of monitoring programs and committed people in the ',
      },
      { type: 'link', link: { text: 'Puget Sound Ecosystem Monitoring Program', href: 'https://psp.wa.gov/PSEMP-overview.php' } },
      { type: 'text', text: ', the status and trends of indicators are regularly reported throughout this website.' },
    ],
  },
  {
    segments: [
      {
        type: 'text',
        text: 'Whether you are a partner in the recovery effort for Puget Sound, a member of the media, a legislative staff, a program manager, scientist or student, this website is designed for people with a range of familiarity with Puget Sound issues.',
      },
    ],
  },
];

export interface PartnerOrg {
  name: string;
  href: string;
}

/** "Contributing Partners" — the source's own grid, in its own order. */
export const CONTRIBUTING_PARTNERS: PartnerOrg[] = [
  { name: 'Puget Sound Partnership', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2' },
  { name: 'Center for Whale Research', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/6' },
  { name: 'Washington Department of Fish and Wildlife', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7' },
  { name: 'Oregon State University', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/8' },
  { name: 'King County', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/9' },
  { name: 'Washington State Department of Ecology', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/10' },
  { name: 'Washington State Department of Health', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/11' },
  { name: 'Washington State Department of Natural Resources', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/12' },
  { name: 'University of Washington', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/17' },
  { name: 'Washington State Recreation and Conservation Office', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/88' },
  { name: 'Washington State Department of Agriculture', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/113' },
  { name: 'Washington State Conservation Commission', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/114' },
  { name: 'Washington Sea Grant', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/116' },
  { name: 'Tacoma-Pierce County Health Department', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/137' },
  { name: 'Snohomish Health District', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/158' },
  { name: 'Samish Indian Nation', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/182' },
  { name: 'Public Health Seattle and King County', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/203' },
  { name: 'Northwest Straits Commission', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/221' },
  { name: 'Kitsap Public Health District', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/250' },
  { name: 'American Farmland Trust', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/343' },
  { name: 'U.S. Geological Survey', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/354' },
  { name: 'Natural Systems Design', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/370' },
  { name: 'National Oceanic and Atmospheric Administration', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/372' },
  { name: 'Environmental Science Associates', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/379' },
  { name: 'Washington State Office Of Financial Management', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/417' },
  { name: 'Greene Economics, LLC', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/420' },
  { name: 'Cascadia Consulting Group', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/467' },
  { name: 'Cramer Fish Sciences', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/478' },
  { name: 'Kelp Forest Monitoring Alliance of Washington State', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/518' },
  { name: 'Marine Agronomics LLC', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/519' },
  { name: 'BERK Consulting, Inc.', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/547' },
  { name: 'Rivershed SPC', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/553' },
  { name: 'Blue Water GIS', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/559' },
];

export interface WheelCenterLogo {
  src: string;    // public path; run through withBase() at render
  alt: string;
  width: number;  // intrinsic px
  height: number;
}

// The center medallion of the source wheel graphic — the Puget Sound Vital
// Signs circle logo WITH the "v.3" tag, cropped 1:1 from the source's own
// /Content/img/vitalsigns_wheel.png (center box 403,409–1428,1434; donut
// outer diameter 1021px). The standalone vitalsigns_circle_logo.png the
// source serves on mobile omits "v.3"; the crop is the faithful desktop center.
export const WHEEL_CENTER_LOGO: WheelCenterLogo = {
  src: '/logos/vitalsigns-wheel-center.png',
  alt: 'Puget Sound Vital Signs — Reporting Ecosystem Health, v.3',
  width: 1025,
  height: 1025,
};
