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
  /** The organization's PS Info page (what the live logo wall links to). */
  href: string;
  /** The organization's own website: the Home Page its PS Info page lists (Kelp Forest Monitoring Alliance lists none). */
  website?: string;
}

/** "Contributing Partners" — the source's own grid, in its own order. */
export const CONTRIBUTING_PARTNERS: PartnerOrg[] = [
  { name: 'Puget Sound Partnership', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/2', website: 'https://www.psp.wa.gov/' },
  { name: 'Center for Whale Research', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/6', website: 'https://www.whaleresearch.com/' },
  { name: 'Washington Department of Fish and Wildlife', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/7', website: 'https://wdfw.wa.gov/' },
  { name: 'Oregon State University', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/8', website: 'https://oregonstate.edu/' },
  { name: 'King County', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/9', website: 'https://kingcounty.gov/' },
  { name: 'Washington State Department of Ecology', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/10', website: 'https://ecology.wa.gov/' },
  { name: 'Washington State Department of Health', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/11', website: 'https://doh.wa.gov/' },
  { name: 'Washington State Department of Natural Resources', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/12', website: 'https://www.dnr.wa.gov/' },
  { name: 'University of Washington', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/17', website: 'https://www.washington.edu/' },
  { name: 'Washington State Recreation and Conservation Office', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/88', website: 'https://rco.wa.gov/' },
  { name: 'Washington State Department of Agriculture', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/113', website: 'https://agr.wa.gov/' },
  { name: 'Washington State Conservation Commission', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/114', website: 'https://scc.wa.gov/' },
  { name: 'Washington Sea Grant', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/116', website: 'https://wsg.washington.edu/' },
  { name: 'Tacoma-Pierce County Health Department', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/137', website: 'https://www.tpchd.org/' },
  { name: 'Snohomish Health District', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/158', website: 'https://www.snohd.org/' },
  { name: 'Samish Indian Nation', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/182', website: 'https://www.samishtribe.nsn.us/' },
  { name: 'Public Health Seattle and King County', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/203', website: 'https://kingcounty.gov/en/dept/dph' },
  { name: 'Northwest Straits Commission', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/221', website: 'https://www.nwstraits.org/' },
  { name: 'Kitsap Public Health District', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/250', website: 'https://www.kitsappublichealth.org/' },
  { name: 'American Farmland Trust', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/343', website: 'https://www.farmland.org/' },
  { name: 'U.S. Geological Survey', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/354', website: 'https://www.usgs.gov/' },
  { name: 'Natural Systems Design', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/370', website: 'https://www.naturaldes.com/' },
  { name: 'National Oceanic and Atmospheric Administration', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/372', website: 'https://www.fisheries.noaa.gov/' },
  { name: 'Environmental Science Associates', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/379', website: 'https://esassoc.com/' },
  { name: 'Washington State Office Of Financial Management', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/417', website: 'https://ofm.wa.gov/' },
  { name: 'Greene Economics, LLC', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/420', website: 'https://www.greeneeconomics.com/' },
  { name: 'Cascadia Consulting Group', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/467', website: 'https://www.cascadiaconsulting.com/' },
  { name: 'Cramer Fish Sciences', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/478', website: 'https://www.fishsciences.net/' },
  { name: 'Kelp Forest Monitoring Alliance of Washington State', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/518' },
  { name: 'Marine Agronomics LLC', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/519', website: 'https://www.marineagronomics.com/' },
  { name: 'BERK Consulting, Inc.', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/547', website: 'https://www.berkconsulting.com/' },
  { name: 'Rivershed SPC', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/553', website: 'https://www.rivershedspc.com/' },
  { name: 'Blue Water GIS', href: 'https://www.pugetsoundinfo.wa.gov/Organization/Detail/559', website: 'https://bluewatergis.com/' },
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
