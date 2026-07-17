// src/data/pages/nep-atlas.ts — content for the NEP Atlas unit
// (Implementation & Funding module).
//
// Directed reproduction of a SINGLE URL: https://nepatlas.pugetsoundinfo.wa.gov/
// (the NEP Atlas mini-site's home page only, fetched 2026-07-17). The home
// page's server-rendered HTML is genuinely short — one welcome block, one map
// teaser, one funders line — everything else on the live mini-site (About,
// Activity Index, Award Index, Activity Summary) lives at OTHER URLs and is
// out of scope for this contract; see src/data/contracts/nep-atlas.md.
//
// Every string below is verbatim from that one page. Nothing is aggregated,
// computed, or pulled from the mini-site's other pages or JSON feeds.

export const SOURCE_URL = 'https://nepatlas.pugetsoundinfo.wa.gov/';
export const PAGE_TITLE = 'NEP Atlas';
// Source's own site-title banner is set in shouting caps
// ("PUGET SOUND NATIONAL ESTUARY PROGRAM ATLAS"); sentence-cased here per this
// prototype's no-ornamental-caps rule (same normalization about.ts applied).
export const PAGE_EYEBROW = 'Puget Sound National Estuary Program Atlas';
export const PAGE_LEDE =
  'The National Estuary Program (NEP) Atlas tracks and shares information about Puget Sound NEP investments, activities, and accomplishments.';

// ── Inline link segments (shared shape) ─────────────────────────────────────
// Mirrors PsInfoAboutNarrative's segment model (src/data/pages/about.ts) so a
// narrative-prose component can render verbatim paragraphs with links kept in
// their original sentence position. Kept local to this file rather than
// importing about.ts's types, since PsInfoNepAtlasNarrative's Props type is
// against these shapes specifically.
export interface AtlasInternalLink {
  kind: 'internal';
  text: string;
  /** Root-relative route in this prototype's own IA; resolve with withBase(). */
  route: string;
}
export interface AtlasExternalLink {
  kind: 'external';
  text: string;
  href: string;
}
export type AtlasLink = AtlasInternalLink | AtlasExternalLink;

export type AtlasSegment = { type: 'text'; text: string } | { type: 'link'; link: AtlasLink };

export interface AtlasParagraph {
  segments: AtlasSegment[];
}

// ── 1. Welcome to the NEP Atlas ─────────────────────────────────────────────
// Source floats one photograph to the right of this paragraph, inline inside
// the "Welcome to the NEP Atlas" heading itself; promoted here to the page's
// photo-header hero (see WELCOME_PHOTO below) rather than a side photo, since
// it's the source's only photograph and this unit is a photo-header unit.
export const WELCOME_PARAGRAPH: AtlasParagraph = {
  segments: [
    {
      type: 'text',
      text: 'The National Estuary Program (NEP) Atlas tracks and shares information about Puget Sound NEP investments, activities, and accomplishments. The information presented here includes activities managed by the Puget Sound NEP ',
    },
    { type: 'link', link: { kind: 'external', text: 'Strategic Initiative Leads', href: 'https://pugetsoundestuary.wa.gov/' } },
    { type: 'text', text: ', the ' },
    { type: 'link', link: { kind: 'external', text: 'Northwest Indian Fisheries Commission', href: 'https://nwifc.org/' } },
    { type: 'text', text: ', the ' },
    { type: 'link', link: { kind: 'external', text: 'Puget Sound Partnership', href: 'https://psp.wa.gov/' } },
    { type: 'text', text: ', and directly by the ' },
    // Source wraps this phrase in two adjacent anchors ("U.S." then
    // "Environmental Protection Agency"), both pointing at the same EPA page
    // (http vs https, otherwise identical path); kept as two link segments to
    // match the source markup exactly. The source's first anchor text is
    // "U.S. " (a trailing non-breaking space inside the anchor itself),
    // which is what visually separates the two anchors into "U.S.
    // Environmental Protection Agency" rather than gluing them together —
    // reproduced here as a plain text segment between the two links so the
    // rendered phrase matches the source exactly.
    { type: 'link', link: { kind: 'external', text: 'U.S.', href: 'http://www.epa.gov/puget-sound/epa-geographic-funding-work-puget-sound-recovery' } },
    { type: 'text', text: ' ' },
    { type: 'link', link: { kind: 'external', text: 'Environmental Protection Agency', href: 'https://www.epa.gov/puget-sound/epa-geographic-funding-work-puget-sound-recovery' } },
    { type: 'text', text: '. The NEP Atlas is updated periodically as new investments are made around the region.' },
  ],
};

// The home page's only real photograph (1920×1080 in source, alt="" in
// source — no source-supplied alt text). Used as the page's photo-header hero
// image; see src/data/contracts/nep-atlas.md Header + Gaps for full sourcing
// notes on why this is the flagship image and why the alt string below is a
// reasonable, non-fabricated accessibility description rather than copied
// source caption content.
export const WELCOME_PHOTO = {
  image: '/photos/nep-atlas/estuary-welcome.jpg',
  alt: 'A logjam and truss bridge on a Puget Sound tributary river, mountains in the background',
};

// ── 2. Map teaser ────────────────────────────────────────────────────────────
// Source centers a clickable map-preview block directly under the welcome
// paragraph: an <a href="/Home/NepAtlasMap" aria-label="NEP Atlas Map"> wraps
// an empty <div id="ntaActivitiesMapDivID"> — a Leaflet mount point with zero
// map imagery in the server-rendered HTML (see Gaps below) — followed by a
// second, real text link, "Click to view the full map", to the same
// destination. Reproduced here by that second link's real visible text only;
// the first link has no visible content of its own to reproduce without
// fabricating a map graphic, and giving this link's real text a second,
// different aria-label would fail WCAG 2.2's Label in Name (2.5.3).
export const MAP_TEASER = {
  href: 'https://nepatlas.pugetsoundinfo.wa.gov/Home/NepAtlasMap',
  linkText: 'Click to view the full map',
};

// ── 3. Funding provided by ──────────────────────────────────────────────────
// Verbatim pipe-separated "FUNDING PROVIDED BY" strip from the home page
// (source is shouting-case; sentence-cased per this repo's no-ornamental-caps
// rule, see PAGE_TITLE above for the same normalization elsewhere on this page).
export const FUNDERS: { name: string; href: string }[] = [
  { name: 'Puget Sound Partnership', href: 'http://www.psp.wa.gov' },
  { name: 'U.S. Environmental Protection Agency', href: 'https://www.epa.gov/puget-sound' },
];

// FUNDERS rendered through the same AtlasParagraph/segment model as the
// welcome paragraph (pipe-separated, matching the source's own presentation)
// so it can go through PsInfoNepAtlasNarrative without any page-level markup.
export const FUNDERS_PARAGRAPH: AtlasParagraph = {
  segments: [
    { type: 'link', link: { kind: 'external', text: FUNDERS[0].name, href: FUNDERS[0].href } },
    { type: 'text', text: ' | ' },
    { type: 'link', link: { kind: 'external', text: FUNDERS[1].name, href: FUNDERS[1].href } },
  ],
};

// ── Gaps: content this file does NOT include, and why ──────────────────────
// 1. The Activities Map (/Home/NepAtlasMap) is a Leaflet map rendered
//    entirely client-side into an empty <div id="ntaActivitiesMapDivID">; the
//    home page's own server-rendered HTML has zero map imagery, pins, or data
//    for this div. Represented here only by the real "Click to view the full
//    map" link text (MAP_TEASER), not by a fabricated map graphic.
// 2. Everything on the mini-site beyond this one URL — the fuller About
//    narrative, the Activities list, the NEP Awards roster, and the
//    Investment Summary charts — lives at other URLs (/Home/About,
//    /Activity/Index, /Award/Index, /Activity/Summary) and is out of scope
//    for this single-URL directed reproduction. See
//    src/data/contracts/nep-atlas.md for the full accounting.
