// src/data/pages/vital-sign-details.ts — content for the "vital-sign-details"
// unit: two Vital Sign detail pages, Salmon (the source site's own title for
// the Vital Sign the task/nav shorthand calls "Chinook Salmon" — the page's
// lede photo and most of its narrative are Chinook-specific, though the
// tracked indicators also cover coho, steelhead, and chum) and Orcas. Both
// sit under the Thriving Species and Food Web goal.
//
// Sourced 2026-07-17 from (server-rendered ASP.NET; no JS-gated prose):
//   - https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/32 (Salmon)
//   - https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/19 (Orcas)
// Per-indicator progress/target-status labels came from each page's embedded
// Fancytree JSON (the indicator table itself renders client-side from this
// same JSON, so the static HTML has no table rows to scrape directly).
//
// Every string is verbatim from those pages. Two structural choices, both
// precedented elsewhere in this repo (see PsInfoIndicatorsContentCard's own
// header comment and PsInfoIndicatorsBasics for the same call on status
// vocabulary):
//   1. `progress` / `targetStatus` are free text, not the invented
//      IndicatorStatus enum (psinfo-domain.ts) — the source's own words
//      ("Getting Worse", "Mixed Results", "Indicator To Be Developed") don't
//      map cleanly onto that enum's five buckets.
//   2. Inline links embedded mid-sentence in "Key Vital Sign Messages" are
//      kept as flat paragraph/bullet strings (unsplit, to avoid corrupting
//      verbatim wording) with their hrefs captured separately in
//      `keyMessageLinks`/`inlineLinks`, rendered as a links row below the
//      prose — not spliced back into the sentence.
// A few source links were relative (e.g. href="27") and resolve, per normal
// URL rules, against the page's own directory to a same-subdomain absolute
// URL — that resolution is mechanical, not invented content, and is applied
// here. One inline link in the Salmon messages (Zooplankton) has a genuinely
// broken href in the live source (`https://zooplankton/`, not a real host);
// it is rendered as plain text with no href rather than inventing a fix —
// see GAPS below. Trailing parenthetical context that sat outside a source
// `<a>` (e.g. "Technical Recovery Criteria… (Puget Sound Salmon Recovery
// Plan)") is folded into that link's visible text rather than modeled as a
// separate unlinked fragment.
//
// GAPS (nothing invented to fill these):
//   - Both pages' "Vital Sign Reporter" contact is a genuinely empty
//     `<a href="mailto:"></a>` in source — no email address exists to
//     extract. Modeled as `reporterEmail: null`.
//   - Salmon's "Contributing Partners" section body is a single embedded
//     base64 logo image (alt=""), not text; the name below was read off the
//     logo itself (Washington Department of Fish and Wildlife) — there is no
//     href, since the source logo isn't wrapped in a link.
//   - The Salmon indicator tree's "coho"/"steelhead"/"chum" rows report a
//     progress label but no target-status icon at all (the source shows only
//     one icon for those three) — modeled as `targetStatus: null`.

export const SOURCE_DOMAIN = 'https://vitalsigns.pugetsoundinfo.wa.gov';
// Build stage note: the BUILDER's page spec places these two detail pages
// under the sibling "vital-signs" unit's own route tree (a dynamic
// [slug].astro beside vital-signs.astro's overview), not a standalone
// "vital-sign-details" path segment — matching how the built indicators unit
// nests its exemplar detail page under /prototypes/indicators/[slug]. Kept as
// one constant so every derived route/link below stays in sync.
export const UNIT_ROUTE_BASE = '/prototypes/vital-signs';

// ── Shared shapes ────────────────────────────────────────────────────────────

export interface VitalSignResourceLink {
  text: string;
  href: string;
}

/** One line in a Background Documents / Other Resources outline. Source
 *  nests up to two levels deep (a link, or a label with child links) — kept
 *  as real nesting via `children` rather than flattened. */
export interface VitalSignResourceEntry {
  text: string;
  /** Omit when `text` is a plain label (a group heading with children, or a
   *  multi-link sentence carried entirely in `inlineLinks`). */
  href?: string;
  /** Links embedded mid-sentence in `text` when it isn't itself one link
   *  (e.g. "Entries related to killer whales, harbor porpoises, and harbor
   *  seals."). */
  inlineLinks?: VitalSignResourceLink[];
  children?: VitalSignResourceEntry[];
}

export interface VitalSignResourceSection {
  /** Bold/underlined sub-heading above this list in source, e.g. "Indicator
   *  Targets" — omit for a section's first, unheaded group. */
  heading?: string;
  entries: VitalSignResourceEntry[];
}

export interface VitalSignIndicatorRow {
  /** Numeric id parsed from /VitalSignIndicator/Detail/{id}. */
  id: number;
  name: string;
  /** "Indicator Progress" icon label, verbatim. */
  progress: string;
  /** "Target Status" icon label, verbatim; null when source shows no status icon. */
  targetStatus: string | null;
  /** External VitalSignIndicator/Detail/{id} URL on the source site. */
  detailUrl: string;
  /** Set when this indicator has an internal built page elsewhere in this
   *  prototype — the build stage should route to it instead of `detailUrl`. */
  internalRoute?: string;
}

export type VitalSignMessageBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'bullets'; items: string[] };

export interface VitalSignPartner {
  name: string;
  href?: string;
}

export interface VitalSignPhoto {
  /** public/ path of the photograph. */
  image: string;
  alt: string;
  caption: string;
}

export interface VitalSignDetail {
  /** Numeric id parsed from /VitalSign/Detail/{id}. */
  id: number;
  slug: string;
  /** Route the build stage should give this page. */
  route: string;
  /** Verbatim page title (source's own name for the Vital Sign). */
  name: string;
  /** Joins RecoveryGoal.id in psinfo-domain.ts. */
  goalId: string;
  /** Verbatim breadcrumb "Goal" title text. */
  goalName: string;
  breadcrumbGoalHref: string;
  /** The page's single intro paragraph — source merges "what it is" and "why
   *  it matters" into one paragraph rather than two labeled sections. */
  intro: string;
  photo: VitalSignPhoto;
  indicators: VitalSignIndicatorRow[];
  /** "Key Vital Sign Messages" — an ordered mix of prose and bullets; order
   *  is preserved exactly as source (not regrouped into paragraphs-then-
   *  bullets). */
  keyMessages: VitalSignMessageBlock[];
  /** Links embedded mid-sentence inside `keyMessages`, captured separately —
   *  same convention as PsInfoIndicatorsContentCard / PsInfoAboutNarrative. */
  keyMessageLinks: VitalSignResourceLink[];
  backgroundDocuments: VitalSignResourceSection[];
  otherResources: VitalSignResourceSection[];
  /** Orcas' Contributing Partners has an intro sentence; Salmon's doesn't. */
  contributingPartnersIntro?: string;
  contributingPartners: VitalSignPartner[];
  relatedStrategies: VitalSignResourceLink[];
  reporterOrg: string;
  /** null: source's mailto is genuinely empty — no address to show. */
  reporterEmail: string | null;
  lastUpdated: string;
  printUrl: string;
  sourceUrl: string;
}

// ── Presentation mapping (verbatim labels -> esa-badge variant) ────────────
// The source's own progress/status vocabulary, not an invented enum. Kept
// here so the build stage doesn't have to invent this mapping per page.
export const PROGRESS_BADGE_VARIANT: Record<string, 'success' | 'warning' | 'danger' | 'secondary'> = {
  'Getting Better': 'success',
  'Getting Worse': 'danger',
  'Mixed Results': 'warning',
  'No Trend': 'secondary',
  'Indicator To Be Developed': 'secondary',
};
export const TARGET_STATUS_BADGE_VARIANT: Record<string, 'success' | 'warning' | 'danger' | 'secondary'> = {
  'Below Target': 'warning',
};

// ── Cross-unit routes this page links to internally ────────────────────────
// The Orcas page's own indicator "Number of Southern Resident killer whales"
// is the exact indicator the sibling "indicators" unit built out as its
// exemplar Detail page (src/data/pages/indicators.ts EXEMPLAR_ROUTE) — same
// fact, same numeric id (32), syndicated across the vitalsigns.* and
// pugetsoundinfo.* subdomains in the real system. Linking to the in-shell
// build instead of the external source page is the same wayfinding pattern
// PsInfoIndicatorsBoard already uses for this identical indicator.
export const ORCA_INDICATOR_EXEMPLAR_ROUTE = '/prototypes/indicators/number-of-southern-resident-killer-whales';

// ── Salmon (source title: "Salmon"; task/nav shorthand: "Chinook Salmon") ──

const SALMON: VitalSignDetail = {
  id: 32,
  slug: 'chinook-salmon',
  route: `${UNIT_ROUTE_BASE}/chinook-salmon`,
  name: 'Salmon',
  goalId: 'species',
  goalName: 'Thriving Species and Food Web',
  breadcrumbGoalHref: `${SOURCE_DOMAIN}/VitalSignGoal/Detail/3`,
  intro:
    'Salmon are a cultural icon of the Pacific Northwest. They are highly prized by anglers and commercial fisherman, are guaranteed to be available to Indian Tribes by treaties signed with the federal government and are a favorite food of Southern Resident orcas. The Salmon Vital Sign tells us about the health of salmon populations and whether efforts to improve habitat and coordinate management of harvest and hatcheries are having the desired effect of improving salmon populations. Throughout their lifecycle, salmon depend on a wide variety of freshwater, estuary, nearshore, and marine habitats. This leaves salmon vulnerable to many forms of human activities and habitat loss as well as changing ocean and climate conditions.',
  photo: {
    image: '/photos/vital-sign-details/chinook-salmon.jpg',
    alt: 'Chinook salmon. Photo credit: John McMillan.',
    caption: 'Chinook salmon. Photo credit: John McMillan.',
  },
  indicators: [
    {
      id: 4,
      name: 'Number of natural-origin Chinook salmon on spawning grounds',
      progress: 'Mixed Results',
      targetStatus: 'Below Target',
      detailUrl: `${SOURCE_DOMAIN}/VitalSignIndicator/Detail/4`,
    },
    {
      id: 72,
      name: 'Number of natural-origin coho salmon on spawning grounds',
      progress: 'No Trend',
      targetStatus: null,
      detailUrl: `${SOURCE_DOMAIN}/VitalSignIndicator/Detail/72`,
    },
    {
      id: 71,
      name: 'Number of natural-origin Puget Sound steelhead on spawning grounds',
      progress: 'No Trend',
      targetStatus: null,
      detailUrl: `${SOURCE_DOMAIN}/VitalSignIndicator/Detail/71`,
    },
    {
      id: 70,
      name: 'Number of natural-origin summer chum salmon on spawning grounds',
      progress: 'Getting Better',
      targetStatus: null,
      detailUrl: `${SOURCE_DOMAIN}/VitalSignIndicator/Detail/70`,
    },
  ],
  keyMessages: [
    {
      kind: 'paragraph',
      text:
        'While the average trend across Hood Canal Summer Chum and a few Chinook populations are increasing, others, including steelhead, Coho and most Chinook populations, are not changing. Modeling diverse populations is nuanced. For example, Chinook population results and uncertainty estimates appear to be influenced by populations doing very well (i.e. Elwha River Chinook) providing a more optimistic outlook than may be occurring. We cannot allow the success in a few populations to suggest we have succeeded enough to relieve the pace of recovery efforts. It is critical to recover each individual salmon population to uphold genetic diversity.',
    },
    {
      kind: 'bullets',
      items: [
        'While the Vital Sign indicators reflect natural-origin spawner populations only, both ESA-listed and non-listed salmonids, of natural and hatchery-origin, play a critical role in supporting Tribal treaty rights in Puget Sound, as well as commercial and recreational harvest. It is important to work toward healthy populations of all Puget Sound salmonids.',
        'While we are not yet certain of the main driver supporting the improvements in Hood Canal summer Chum or select Chinook salmon populations, it is likely several factors working together. These factors likely include habitat improvement, harvest management, and may include changing marine conditions or food web dynamics. These factors are linked to the Marine Water, Zooplankton, Benthic Invertebrate and Forage Fish Vital Signs.',
        'Recent monitoring studies confirm individual restoration and protection projects can be effective. These projects improve fish habitat, including water quality. Fish quickly colonize newly restored habitat where young salmon grow, feed, and rest. Larger-scale and more widespread restoration, coupled with effective protection strategies, will improve ecosystems. Monitoring is critical to understanding project success. (See Functioning Habitat Vital Signs.)',
        'Salmon populations face many challenges that necessitate more research and action. These priority challenges include low summer flows in streams, juvenile survival, predation, water quality, and uncertainty around population responses to restoration. The Puget Sound Salmon Recovery Addendum includes strategies and actions aimed at coordinating efforts across agency recovery partners, communities, and Puget Sound residents.',
      ],
    },
    {
      kind: 'paragraph',
      text:
        'Climate Change Adaptation and Resilience strategies and actions proposed in the Salmon Recovery Addendum aim to address factors over which we have little control, identify which local factors we can address directly, and determine which actions we can take to increase salmon and ecosystem resilience.',
    },
    {
      kind: 'paragraph',
      text:
        'Reliable, continuous funding is essential for monitoring and understanding salmon population changes. Increasing a population takes significant time, effort and intensive work, and even then, populations vary naturally and are difficult to measure. Consistent tracking over decades is necessary to detect meaningful trends.',
    },
  ],
  // "Zooplankton" is omitted here: source's own href (https://zooplankton/)
  // is broken (not a real host) — see GAPS note above.
  keyMessageLinks: [
    { text: 'Marine Water', href: `${SOURCE_DOMAIN}/VitalSign/Detail/27` },
    { text: 'Benthic Invertebrate', href: `${SOURCE_DOMAIN}/VitalSign/Detail/34` },
    { text: 'Forage Fish', href: `${SOURCE_DOMAIN}/VitalSign/Detail/33` },
    { text: 'Functioning Habitat Vital Signs', href: `${SOURCE_DOMAIN}/VitalSignGoal/Detail/7` },
    { text: 'low summer flows in streams', href: `${SOURCE_DOMAIN}/VitalSignIndicator/Detail/46` },
    { text: 'water quality', href: `${SOURCE_DOMAIN}/VitalSignGoal/Detail/6` },
    { text: 'Puget Sound Salmon Recovery Addendum', href: 'https://pssalmonhub.wa.gov/pages/salmon-recovery-plans' },
  ],
  backgroundDocuments: [
    {
      entries: [
        {
          text: 'Chinook Salmon Implementation Strategy',
          href: 'https://www.eopugetsound.org/articles/chinook-salmon-implementation-strategy',
        },
        {
          text: 'Technical Recovery Criteria and Goals for Puget Sound Chinook Salmon (Puget Sound Salmon Recovery Plan)',
          href: 'https://pspwa.box.com/s/jkipjcyn5ixafwap6b634rt9gv3nu7mf',
        },
      ],
    },
    {
      heading: 'Indicator Targets',
      entries: [
        {
          text: 'Chinook Salmon 2050 Recovery Target Fact Sheet',
          href: 'https://pspwa.box.com/s/dgg0n65t4voopyxvist3nzhi3nf99bf2',
        },
        {
          text: '2020 Ecosystem Recovery Target',
          children: [
            {
              text: 'Leadership Council Resolution 2011-14: Adopting a 2020 ecosystem recovery target for Chinook salmon',
              href: 'https://pspwa.box.com/s/esy5dvqxv4roopabp9uevds1q47ea0fg',
            },
            {
              text: 'Chinook Salmon 2020 Target Briefsheet',
              href: 'https://pspwa.box.com/s/oppbahlx9gxr4fkhsaddk55ynbfhf0rq',
            },
          ],
        },
      ],
    },
  ],
  otherResources: [
    {
      entries: [
        { text: 'Salmon Recovery in Puget Sound', href: 'https://www.psp.wa.gov/salmon-recovery-overview.php' },
        {
          text: 'State of our Watersheds Report by the Northwest Indian Fisheries Commission',
          href: 'https://nwifc.org/publications/state-of-our-watersheds',
        },
        {
          text: 'State of Salmon in Watersheds - Puget Sound',
          href: 'https://stateofsalmon.wa.gov/regions/puget-sound/',
        },
        {
          text: 'SalmonScape, Washington Department of Fish and Wildlife',
          href: 'http://apps.wdfw.wa.gov/salmonscape/',
        },
      ],
    },
  ],
  // No intro sentence in source (unlike Orcas) — section body is a single
  // logo image; see GAPS note above.
  contributingPartners: [{ name: 'Washington Department of Fish and Wildlife' }],
  relatedStrategies: [
    { text: 'Awareness of Effects of Climate Change', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/18' },
    { text: 'Climate Adaptation & Resilience', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/20' },
    { text: 'Education Partnerships', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/30' },
    { text: 'Fish Passage Barriers', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/6' },
    { text: 'Floodplains & Estuaries', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/5' },
    { text: 'Freshwater Availability', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/7' },
    { text: 'Funding', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/27' },
    { text: 'Healthy Shorelines', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/3' },
    { text: 'Invasive Species', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/14' },
    { text: 'Research & Monitoring', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/29' },
    { text: 'Riparian Areas', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/4' },
    { text: 'Salmon Recovery', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/15' },
    { text: 'Smart Growth', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/1' },
    { text: 'Stewardship & Motivating Action', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/31' },
    { text: 'Stormwater Runoff & Legacy Contamination', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/10' },
    { text: 'Strategic Leadership & Collaboration', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/28' },
  ],
  reporterOrg: 'PSEMP Salmonid Work Group',
  reporterEmail: null,
  lastUpdated: '05/22/2025',
  printUrl: `${SOURCE_DOMAIN}/VitalSign/PrintToPdf/32`,
  sourceUrl: `${SOURCE_DOMAIN}/VitalSign/Detail/32`,
};

// ── Orcas ────────────────────────────────────────────────────────────────

const ORCAS: VitalSignDetail = {
  id: 19,
  slug: 'orcas',
  route: `${UNIT_ROUTE_BASE}/orcas`,
  name: 'Orcas',
  goalId: 'species',
  goalName: 'Thriving Species and Food Web',
  breadcrumbGoalHref: `${SOURCE_DOMAIN}/VitalSignGoal/Detail/3`,
  intro:
    'Orcas, or killer whales, are among Puget Sound’s most distinctive and charismatic creatures. They are icons in Pacific Northwest culture and top predators of the wider Salish Sea ecosystem. The Orcas Vital Sign tells us about the population status of the endangered Southern Resident killer whales and the occurrence of all orcas in Puget Sound and throughout the Salish Sea. The combination of a declining food supply and impacts from pollution, vessel traffic, and noise continues to threaten the survival of Southern Resident killer whales. Additionally, there is emerging science on the impacts of inbreeding for Southern Resident killer whale survival, which indicates that we need to do more now than before to recover populations.',
  photo: {
    image: '/photos/vital-sign-details/orcas.jpg',
    alt: 'Photo credit: Center for Whale Research',
    caption: 'Photo credit: Center for Whale Research',
  },
  indicators: [
    {
      id: 32,
      name: 'Number of Southern Resident killer whales',
      progress: 'Getting Worse',
      targetStatus: 'Below Target',
      detailUrl: `${SOURCE_DOMAIN}/VitalSignIndicator/Detail/32`,
      internalRoute: ORCA_INDICATOR_EXEMPLAR_ROUTE,
    },
    {
      id: 69,
      name: 'Occupancy/residency of orcas in Puget Sound',
      progress: 'Indicator To Be Developed',
      targetStatus: null,
      detailUrl: `${SOURCE_DOMAIN}/VitalSignIndicator/Detail/69`,
    },
  ],
  keyMessages: [
    {
      kind: 'paragraph',
      text:
        'Orcas are iconic in the Pacific Northwest and top predators in the Salish Sea. The Orcas Vital Sign tracks endangered Southern Resident killer whales - whose survival is threatened by a declining food supply, pollution, vessel traffic, and noise - and the occurrence of all orcas in Puget Sound and throughout the Salish Sea. Ongoing research highlights the need for continued recovery efforts; however, active efforts made to reduce vessel disturbance, restore habitat, and maintain healthy fish populations offer hope for the long-term recovery of the Southern Resident killer whale population.',
    },
    {
      kind: 'bullets',
      items: [
        'The Southern Resident killer whale population has continued to decline; the population having peaked in 1995 with 98 whales and diminished to a current count of 73 whales (as of the July 1, 2024 census). Their seasonal presence in the Salish Sea has shifted from historic trends, with decreased presence in the summer months and increased presence in the fall and winter.',
        'The Bigg’s (transient) orcas’ population has grown steadily over the last 40 years, and their use of the Salish Sea has increased. These orcas are distinct from Southern Residents in that they feed on marine mammals, including seals and porpoises, have different social structures, behaviors, and home ranges. The abundance of the most common Bigg’s killer whale prey in the Salish Sea has increased over the last 50 years.',
        'Southern Resident killer whales feed exclusively on fish, with a preference for salmon species such as Chinook salmon, making their recovery efforts closely linked. However, most Chinook populations are in crisis and show little sign of recovery. Factors such as climate change impacts, predation by other species, harvest, habitat degradation, hatchery programs, and hydropower operations alter salmon density, size, and migration timing. These changes reduce prey availability, threatening orca survival and ecosystem function.',
        'The Chinook salmon that Southern Resident killer whales rely on originate throughout the west coast, including the Puget Sound, Columbia Basin, Fraser River, and Klamath River. Because salmon migrate across broad regions, understanding and improving prey availability throughout Southern Resident killer whale range will be critical for their recovery.',
        'In the Salish Sea, underwater noise and disturbance from commercial and recreational vessels masks orca echolocation and communication. Vessel noise decreases orca foraging efficiency, lowering the chances of successful prey capture. In recent years, voluntary (Quiet Sound) and regulatory (1,000-yard mandatory vessel buffer) actions have been put in place to reduce vessel noise and disturbance.',
        'When Southern Resident killer whales lack food, they burn their own fat, thereby increasing circulation of harmful pollutants picked up from the Salish Sea and elsewhere. Poorer body condition increases the orcas’ vulnerability to disease, hinders reproduction, and is linked to lower survival rates.',
      ],
    },
  ],
  // "Chinook salmon" is internal: same page this unit builds as SALMON above.
  keyMessageLinks: [
    { text: 'Chinook salmon', href: `${UNIT_ROUTE_BASE}/chinook-salmon` },
    { text: 'underwater noise', href: `${SOURCE_DOMAIN}/VitalSignIndicator/Detail/74` },
    { text: 'harmful pollutants', href: `${SOURCE_DOMAIN}/VitalSign/Detail/28` },
  ],
  backgroundDocuments: [
    {
      heading: 'Indicator Targets — 2030 and 2050 Recovery Target',
      entries: [
        {
          text: 'Number of Southern Resident killer whales target fact sheet',
          href: 'https://pspwa.box.com/s/fjl0vl84fbnctk1swvbn6mkovdd2fkot',
        },
        {
          text: 'Memo to Science Panel with rationale',
          href: 'https://pspwa.box.com/s/eqz47vp81hwcv84najsrxk4t5q74rbk7',
        },
      ],
    },
    {
      heading: 'Indicator Targets — 2020 Recovery Target',
      entries: [
        {
          text: 'Leadership Council Resolution 2011-17: Adopting a 2020 ecosystem recovery target for orcas',
          href: 'https://pspwa.box.com/s/hmnnznwrp3hvhy0kyzlk4vvwie8exyc1',
        },
        { text: 'Orca 2020 Target Briefsheet', href: 'https://pspwa.box.com/s/d2022lvv5ocx7lfvpzhp14gpl4hacykq' },
      ],
    },
  ],
  otherResources: [
    {
      entries: [
        {
          text: '2021 Southern Resident Killer Whales (Orcinus orca) 5-Year Review: Summary and Evaluation (NOAA Fisheries)',
          href: 'https://www.fisheries.noaa.gov/resource/document/2021-southern-resident-killer-whales-orcinus-orca-5-year-review-summary-and',
        },
        { text: 'Puget Sound Marine Waters 2021 Overview', href: 'https://www.psp.wa.gov/PSmarinewatersoverview.php' },
        {
          text: 'Encyclopedia Of Puget Sound',
          href: 'https://www.eopugetsound.org/',
          children: [
            {
              text: 'Entries related to killer whales, harbor porpoises, and harbor seals.',
              inlineLinks: [
                { text: 'killer whales', href: 'https://www.eopugetsound.org/species/orcinus-orca' },
                { text: 'harbor porpoises', href: 'https://www.eopugetsound.org/species/phocoena-phocoena' },
                { text: 'harbor seals', href: 'https://www.eopugetsound.org/species/phoca-vitulina' },
              ],
            },
            {
              text: 'Status and trends for West Coast transient (Bigg’s) killer whales in the Salish Sea',
              href: 'https://www.eopugetsound.org/articles/biggs-killer-whales',
            },
          ],
        },
        {
          text: 'Summary of Key Research Findings about Underwater Noise and Vessel Disturbance (Washington State Academy of Sciences)',
          href: 'https://wdfw.wa.gov/sites/default/files/2020-09/reportwsas_srkw_summary.pdf',
        },
        {
          text: 'Inbreeding and Inbreeding Depression in Southern Resident Killer Whales (NOAA Fisheries)',
          href: 'https://www.fisheries.noaa.gov/west-coast/science-data/inbreeding-and-inbreeding-depression-southern-resident-killer-whales',
        },
        {
          text: 'Southern Resident Orca Task Force website',
          href: 'https://www.orca.wa.gov/',
          children: [
            {
              text: 'Orca Task Force Final Report and Recommendations',
              href: 'https://www.governor.wa.gov/sites/default/files/OrcaTaskForce_FinalReportandRecommendations_11.07.19.pdf',
            },
            {
              text: 'Orca Task Force Year 1 Comprehensive Report and Recommendations',
              href: 'https://www.governor.wa.gov/sites/default/files/OrcaTaskForce_reportandrecommendations_11.16.18.pdf',
            },
          ],
        },
        {
          text: 'Recently Published Reports',
          children: [
            {
              text: 'Economic Impact of Killer Whales in the Salish Sea (Earth Economics, supported by the Seadoc Society)',
              href: 'https://www.seadocsociety.org/blog/the-economic-impact-of-killer-whales-in-the-salish-sea',
            },
            {
              text: 'Southern Resident Killer Whale Vessel Adaptive Management 2022 Legislative Report (Washington Department of Fish & Wildlife)',
              href: 'https://wdfw.wa.gov/sites/default/files/publications/02354/wdfw02354.pdf',
            },
          ],
        },
      ],
    },
  ],
  contributingPartnersIntro: 'The following U.S. organizations monitor killer whales in Puget Sound:',
  contributingPartners: [
    { name: 'NOAA Fisheries', href: 'https://www.fisheries.noaa.gov/west-coast/endangered-species-conservation/saving-southern-resident-killer-whales' },
    { name: 'The Center for Whale Research', href: 'https://www.whaleresearch.com/' },
    { name: 'Oceans Initiative', href: 'http://www.oceansinitiative.org' },
    { name: 'Orca Network', href: 'http://www.orcanetwork.org/Main/' },
    { name: 'Orca Behavior Institute', href: 'http://orcabehaviorinstitute.org/' },
    { name: 'Orcasound', href: 'http://orcasound.net/' },
    { name: 'SR3', href: 'https://www.sealifer3.org/' },
    { name: 'The Whale Museum', href: 'https://whalemuseum.org/' },
    { name: 'Wild Orca', href: 'https://www.wildorca.org/' },
  ],
  relatedStrategies: [
    { text: 'Awareness of Effects of Climate Change', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/18' },
    { text: 'Climate Adaptation & Resilience', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/20' },
    { text: 'Education Partnerships', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/30' },
    { text: 'Funding', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/27' },
    { text: 'Oil Spills', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/13' },
    { text: 'Research & Monitoring', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/29' },
    { text: 'Responsible Boating', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/17' },
    { text: 'Stewardship & Motivating Action', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/31' },
    { text: 'Strategic Leadership & Collaboration', href: 'https://actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/28' },
  ],
  reporterOrg: 'PSEMP Marine Mammals Work Group',
  reporterEmail: null,
  lastUpdated: '05/22/2025',
  printUrl: `${SOURCE_DOMAIN}/VitalSign/PrintToPdf/19`,
  sourceUrl: `${SOURCE_DOMAIN}/VitalSign/Detail/19`,
};

export const VITAL_SIGN_DETAILS: VitalSignDetail[] = [SALMON, ORCAS];

export function getVitalSignDetail(slug: string): VitalSignDetail | undefined {
  return VITAL_SIGN_DETAILS.find((v) => v.slug === slug);
}
