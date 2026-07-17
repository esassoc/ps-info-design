# Page contract: vital-sign-details

Source: https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/32 (Salmon) and
https://vitalsigns.pugetsoundinfo.wa.gov/VitalSign/Detail/19 (Orcas) (fetched 2026-07-17) /
Route(s): /prototypes/vital-signs/chinook-salmon, /prototypes/vital-signs/orcas

Both pages render off one ASP.NET template (`VitalSign/Detail/{id}`) — identical section order,
identical markup skeleton, only the values differ. One contract covers both.

Header: plain — title verbatim (`"Salmon"` / `"Orcas"`, the source's own `pageTitle` text, in
`style="color: #db2365"` in source — color is a build-stage token concern, not a contract
concern). **No lede.** The source's intro paragraph sits directly beside a photo, in its own
two-column content row below the title (`<div class="col-md-7">` intro / `<div class="col-md-9">`
image) — it is a body section, not a short header lede. Using it a second time, or a truncated
first-sentence fragment of it, as a header lede would duplicate content the source states once.
Use `EsaPageHeader` (`@esa/ecology/esa-page-header.astro`) with `title={detail.name}` and no
`lede`, no `eyebrow` prop.

## Sections (source order, exhaustive)

1. **Breadcrumb trail** (`<nav aria-label="breadcrumb">`, above the title) — 4 items, source order:
   1. "About the Vital Signs" → `/About`
   2. "All Indicators" → `/VitalSignIndicator/ViewAll`
   3. "Goal" (link text is literally the word "Goal"; the goal's own name — "Thriving Species and
      Food Web" — is the link's `title` attribute) → `/VitalSignGoal/Detail/3`
   4. "Vital Sign" (link text literally "Vital Sign"; the page's own name — "Salmon" / "Orcas" —
      is the link's `title` attribute), `active`/current-page item → `/VitalSign/Detail/{32|19}`
      (self)

2. **Page title + Print-to-PDF affordance** — title verbatim (`"Salmon"` / `"Orcas"`); a
   `"Print To PDF"` button/link beside it → `/VitalSign/PrintToPdf/{32|19}` (`download` attribute,
   real functional link on the source site).

3. **Intro + photo** (two-column row, no heading of its own) —
   - Salmon intro, verbatim: "Salmon are a cultural icon of the Pacific Northwest. They are highly
     prized by anglers and commercial fisherman, are guaranteed to be available to Indian Tribes by
     treaties signed with the federal government and are a favorite food of Southern Resident
     orcas. The Salmon Vital Sign tells us about the health of salmon populations and whether
     efforts to improve habitat and coordinate management of harvest and hatcheries are having the
     desired effect of improving salmon populations. Throughout their lifecycle, salmon depend on a
     wide variety of freshwater, estuary, nearshore, and marine habitats. This leaves salmon
     vulnerable to many forms of human activities and habitat loss as well as changing ocean and
     climate conditions."
   - Salmon photo, caption verbatim: "Chinook salmon. Photo credit: John McMillan." (source `alt`
     is the same string prefixed "An image with the caption: ").
   - Orcas intro, verbatim: "Orcas, or killer whales, are among Puget Sound's most distinctive and
     charismatic creatures. They are icons in Pacific Northwest culture and top predators of the
     wider Salish Sea ecosystem. The Orcas Vital Sign tells us about the population status of the
     endangered Southern Resident killer whales and the occurrence of all orcas in Puget Sound and
     throughout the Salish Sea. The combination of a declining food supply and impacts from
     pollution, vessel traffic, and noise continues to threaten the survival of Southern Resident
     killer whales. Additionally, there is emerging science on the impacts of inbreeding for
     Southern Resident killer whale survival, which indicates that we need to do more now than
     before to recover populations."
   - Orcas photo, caption verbatim: "Photo credit: Center for Whale Research."

4. **Indicators tree** (`VITAL SIGN › INDICATOR / INDICATOR PROGRESS / TARGET STATUS`, a 3-column
   table; renders client-side from an embedded Fancytree JSON blob — the static HTML has no table
   rows, only that JSON). Rows, source order, each `progress`/`targetStatus` verbatim from the
   JSON's icon `alt` text, each linking to `/VitalSignIndicator/Detail/{id}`:
   - **Salmon** (4 rows):
     1. "Number of natural-origin Chinook salmon on spawning grounds" (id 4) — progress "Mixed
        Results"; target status "Below Target"
     2. "Number of natural-origin coho salmon on spawning grounds" (id 72) — progress "No Trend";
        no target-status icon at all (source's own JSON has an empty string for the second icon —
        not every row carries one)
     3. "Number of natural-origin Puget Sound steelhead on spawning grounds" (id 71) — progress
        "No Trend"; no target-status icon
     4. "Number of natural-origin summer chum salmon on spawning grounds" (id 70) — progress
        "Getting Better"; no target-status icon
   - **Orcas** (2 rows):
     1. "Number of Southern Resident killer whales" (id 32) — progress "Getting Worse"; target
        status "Below Target"
     2. "Occupancy/residency of orcas in Puget Sound" (id 69) — progress "Indicator To Be
        Developed"; no target-status icon

5. **"Key Vital Sign Messages"** (`<h4>`) — an ordered mix of paragraphs and one bulleted list per
   page, verbatim, source order, with inline links embedded mid-sentence:
   - **Salmon**: paragraph, then a 4-item bulleted list, then two closing paragraphs.
     - Paragraph 1: "While the average trend across Hood Canal Summer Chum and a few Chinook
       populations are increasing, others, including steelhead, Coho and most Chinook populations,
       are not changing. Modeling diverse populations is nuanced. For example, Chinook population
       results and uncertainty estimates appear to be influenced by populations doing very well
       (i.e. Elwha River Chinook) providing a more optimistic outlook than may be occurring. We
       cannot allow the success in a few populations to suggest we have succeeded enough to
       relieve the pace of recovery efforts. It is critical to recover each individual salmon
       population to uphold genetic diversity." (last two sentences are bolded in source)
     - Bullets:
       1. "While the Vital Sign indicators reflect natural-origin spawner populations only, both
          ESA-listed and non-listed salmonids, of natural and hatchery-origin, play a critical role
          in supporting Tribal treaty rights in Puget Sound, as well as commercial and recreational
          harvest. It is important to work toward healthy populations of all Puget Sound
          salmonids."
       2. "While we are not yet certain of the main driver supporting the improvements in Hood
          Canal summer Chum or select Chinook salmon populations, it is likely several factors
          working together. These factors likely include habitat improvement, harvest management,
          and may include changing marine conditions or food web dynamics. These factors are
          linked to the **Marine Water** [→ `/VitalSign/Detail/27`], Zooplankton [source href is
          `https://zooplankton/` — genuinely broken, not a real host; see Gaps], **Benthic
          Invertebrate** [→ `/VitalSign/Detail/34`] and **Forage Fish** [→ `/VitalSign/Detail/33`]
          Vital Signs."
       3. "Recent monitoring studies confirm individual restoration and protection projects can be
          effective. These projects improve fish habitat, including water quality. Fish quickly
          colonize newly restored habitat where young salmon grow, feed, and rest. Larger-scale and
          more widespread restoration, coupled with effective protection strategies, will improve
          ecosystems. Monitoring is critical to understanding project success. (See **Functioning
          Habitat Vital Signs** [→ `/VitalSignGoal/Detail/7`].)"
       4. "Salmon populations face many challenges that necessitate more research and action. These
          priority challenges include **low summer flows in streams** [→
          `/VitalSignIndicator/Detail/46`], juvenile survival, predation, **water quality** [→
          `/VitalSignGoal/Detail/6`], and uncertainty around population responses to restoration.
          The **Puget Sound Salmon Recovery Addendum** [→
          `https://pssalmonhub.wa.gov/pages/salmon-recovery-plans`] includes strategies and actions
          aimed at coordinating efforts across agency recovery partners, communities, and Puget
          Sound residents."
     - Paragraph 2: "Climate Change Adaptation and Resilience strategies and actions proposed in
       the Salmon Recovery Addendum aim to address factors over which we have little control,
       identify which local factors we can address directly, and determine which actions we can
       take to increase salmon and ecosystem resilience."
     - Paragraph 3: "Reliable, continuous funding is essential for monitoring and understanding
       salmon population changes. Increasing a population takes significant time, effort and
       intensive work, and even then, populations vary naturally and are difficult to measure.
       Consistent tracking over decades is necessary to detect meaningful trends."
   - **Orcas**: paragraph, then a 6-item bulleted list.
     - Paragraph: "Orcas are iconic in the Pacific Northwest and top predators in the Salish Sea.
       The Orcas Vital Sign tracks endangered Southern Resident killer whales - whose survival is
       threatened by a declining food supply, pollution, vessel traffic, and noise - and the
       occurrence of all orcas in Puget Sound and throughout the Salish Sea. Ongoing research
       highlights the need for continued recovery efforts; however, active efforts made to reduce
       vessel disturbance, restore habitat, and maintain healthy fish populations offer hope for
       the long-term recovery of the Southern Resident killer whale population."
     - Bullets:
       1. "The Southern Resident killer whale population has continued to decline; the population
          having peaked in 1995 with 98 whales and diminished to a current count of 73 whales (as
          of the July 1, 2024 census). Their seasonal presence in the Salish Sea has shifted from
          historic trends, with decreased presence in the summer months and increased presence in
          the fall and winter."
       2. "The Bigg's (transient) orcas' population has grown steadily over the last 40 years, and
          their use of the Salish Sea has increased. These orcas are distinct from Southern
          Residents in that they feed on marine mammals, including seals and porpoises, have
          different social structures, behaviors, and home ranges. The abundance of the most common
          Bigg's killer whale prey in the Salish Sea has increased over the last 50 years."
       3. "Southern Resident killer whales feed exclusively on fish, with a preference for salmon
          species such as **Chinook salmon** [→ `/VitalSign/Detail/32`, i.e. this same unit's
          Salmon page — the source's own inline reference from one built page to the other], making
          their recovery efforts closely linked. However, most Chinook populations are in crisis
          and show little sign of recovery. Factors such as climate change impacts, predation by
          other species, harvest, habitat degradation, hatchery programs, and hydropower operations
          alter salmon density, size, and migration timing. These changes reduce prey availability,
          threatening orca survival and ecosystem function."
       4. "The Chinook salmon that Southern Resident killer whales rely on originate throughout the
          west coast, including the Puget Sound, Columbia Basin, Fraser River, and Klamath River.
          Because salmon migrate across broad regions, understanding and improving prey
          availability throughout Southern Resident killer whale range will be critical for their
          recovery."
       5. "In the Salish Sea, **underwater noise** [→ `/VitalSignIndicator/Detail/74`] and
          disturbance from commercial and recreational vessels masks orca echolocation and
          communication. Vessel noise decreases orca foraging efficiency, lowering the chances of
          successful prey capture. In recent years, voluntary (Quiet Sound) and regulatory
          (1,000-yard mandatory vessel buffer) actions have been put in place to reduce vessel
          noise and disturbance."
       6. "When Southern Resident killer whales lack food, they burn their own fat, thereby
          increasing circulation of **harmful pollutants** [→ `/VitalSign/Detail/28`] picked up
          from the Salish Sea and elsewhere. Poorer body condition increases the orcas' vulnerability
          to disease, hinders reproduction, and is linked to lower survival rates."

6. **"Background Documents"** (`<h4>`) — nested link outline, source order:
   - **Salmon** (no leading heading on group 1; "Indicator Targets" heading on group 2):
     - "Chinook Salmon Implementation Strategy" →
       `https://www.eopugetsound.org/articles/chinook-salmon-implementation-strategy`
     - "Technical Recovery Criteria and Goals for Puget Sound Chinook Salmon (Puget Sound Salmon
       Recovery Plan)" → `https://pspwa.box.com/s/jkipjcyn5ixafwap6b634rt9gv3nu7mf`
     - *Indicator Targets*
       - "Chinook Salmon 2050 Recovery Target Fact Sheet" →
         `https://pspwa.box.com/s/dgg0n65t4voopyxvist3nzhi3nf99bf2`
       - "2020 Ecosystem Recovery Target" (group label, no link of its own)
         - "Leadership Council Resolution 2011-14: Adopting a 2020 ecosystem recovery target for
           Chinook salmon" → `https://pspwa.box.com/s/esy5dvqxv4roopabp9uevds1q47ea0fg`
         - "Chinook Salmon 2020 Target Briefsheet" →
           `https://pspwa.box.com/s/oppbahlx9gxr4fkhsaddk55ynbfhf0rq`
   - **Orcas** (two headed groups, no unheaded group):
     - *Indicator Targets — 2030 and 2050 Recovery Target*
       - "Number of Southern Resident killer whales target fact sheet" →
         `https://pspwa.box.com/s/fjl0vl84fbnctk1swvbn6mkovdd2fkot`
       - "Memo to Science Panel with rationale" →
         `https://pspwa.box.com/s/eqz47vp81hwcv84najsrxk4t5q74rbk7`
     - *Indicator Targets — 2020 Recovery Target*
       - "Leadership Council Resolution 2011-17: Adopting a 2020 ecosystem recovery target for
         orcas" → `https://pspwa.box.com/s/hmnnznwrp3hvhy0kyzlk4vvwie8exyc1`
       - "Orca 2020 Target Briefsheet" → `https://pspwa.box.com/s/d2022lvv5ocx7lfvpzhp14gpl4hacykq`

7. **"Other Resources"** (`<h4>`) — nested link outline, source order:
   - **Salmon** (flat, one unheaded group):
     - "Salmon Recovery in Puget Sound" → `https://www.psp.wa.gov/salmon-recovery-overview.php`
     - "State of our Watersheds Report by the Northwest Indian Fisheries Commission" →
       `https://nwifc.org/publications/state-of-our-watersheds`
     - "State of Salmon in Watersheds - Puget Sound" →
       `https://stateofsalmon.wa.gov/regions/puget-sound/`
     - "SalmonScape, Washington Department of Fish and Wildlife" →
       `http://apps.wdfw.wa.gov/salmonscape/`
   - **Orcas** (flat list with two nested sub-outlines):
     - "2021 Southern Resident Killer Whales (Orcinus orca) 5-Year Review: Summary and Evaluation
       (NOAA Fisheries)" →
       `https://www.fisheries.noaa.gov/resource/document/2021-southern-resident-killer-whales-orcinus-orca-5-year-review-summary-and`
     - "Puget Sound Marine Waters 2021 Overview" →
       `https://www.psp.wa.gov/PSmarinewatersoverview.php`
     - "Encyclopedia Of Puget Sound" → `https://www.eopugetsound.org/`
       - "Entries related to killer whales, harbor porpoises, and harbor seals." — one sentence,
         3 inline links: "killer whales" →
         `https://www.eopugetsound.org/species/orcinus-orca`; "harbor porpoises" →
         `https://www.eopugetsound.org/species/phocoena-phocoena`; "harbor seals" →
         `https://www.eopugetsound.org/species/phoca-vitulina`
       - "Status and trends for West Coast transient (Bigg's) killer whales in the Salish Sea" →
         `https://www.eopugetsound.org/articles/biggs-killer-whales`
     - "Summary of Key Research Findings about Underwater Noise and Vessel Disturbance (Washington
       State Academy of Sciences)" →
       `https://wdfw.wa.gov/sites/default/files/2020-09/reportwsas_srkw_summary.pdf`
     - "Inbreeding and Inbreeding Depression in Southern Resident Killer Whales (NOAA Fisheries)" →
       `https://www.fisheries.noaa.gov/west-coast/science-data/inbreeding-and-inbreeding-depression-southern-resident-killer-whales`
     - "Southern Resident Orca Task Force website" → `https://www.orca.wa.gov/`
       - "Orca Task Force Final Report and Recommendations" →
         `https://www.governor.wa.gov/sites/default/files/OrcaTaskForce_FinalReportandRecommendations_11.07.19.pdf`
       - "Orca Task Force Year 1 Comprehensive Report and Recommendations" →
         `https://www.governor.wa.gov/sites/default/files/OrcaTaskForce_reportandrecommendations_11.16.18.pdf`
     - "Recently Published Reports" (group label, no link of its own)
       - "Economic Impact of Killer Whales in the Salish Sea (Earth Economics, supported by the
         Seadoc Society)" →
         `https://www.seadocsociety.org/blog/the-economic-impact-of-killer-whales-in-the-salish-sea`
       - "Southern Resident Killer Whale Vessel Adaptive Management 2022 Legislative Report
         (Washington Department of Fish & Wildlife)" →
         `https://wdfw.wa.gov/sites/default/files/publications/02354/wdfw02354.pdf`

8. **"Contributing Partners"** (`<h4>`) —
   - **Salmon**: no intro sentence; body is a single embedded logo image (source `alt=""`) —
     "Washington Department of Fish and Wildlife" (name read off the logo pixels; no href, the
     source logo isn't wrapped in a link).
   - **Orcas**: intro sentence, verbatim: "The following U.S. organizations monitor killer whales
     in Puget Sound:" — followed by a 9-item list, all linked, source order: "NOAA Fisheries" →
     `https://www.fisheries.noaa.gov/west-coast/endangered-species-conservation/saving-southern-resident-killer-whales`;
     "The Center for Whale Research" → `https://www.whaleresearch.com/`; "Oceans Initiative" →
     `http://www.oceansinitiative.org`; "Orca Network" → `http://www.orcanetwork.org/Main/`; "Orca
     Behavior Institute" → `http://orcabehaviorinstitute.org/`; "Orcasound" →
     `http://orcasound.net/`; "SR3" → `https://www.sealifer3.org/`; "The Whale Museum" →
     `https://whalemuseum.org/`; "Wild Orca" → `https://www.wildorca.org/`.

9. **"Related Strategies"** (`<h6>`, right-column sidebar, no descriptive note beside it in
   source) — flat list of strategy links, all → `actionagenda.pugetsoundinfo.wa.gov/Strategy/Detail/{id}`:
   - **Salmon** (16): Awareness of Effects of Climate Change (18); Climate Adaptation & Resilience
     (20); Education Partnerships (30); Fish Passage Barriers (6); Floodplains & Estuaries (5);
     Freshwater Availability (7); Funding (27); Healthy Shorelines (3); Invasive Species (14);
     Research & Monitoring (29); Riparian Areas (4); Salmon Recovery (15); Smart Growth (1);
     Stewardship & Motivating Action (31); Stormwater Runoff & Legacy Contamination (10); Strategic
     Leadership & Collaboration (28).
   - **Orcas** (9): Awareness of Effects of Climate Change (18); Climate Adaptation & Resilience
     (20); Education Partnerships (30); Funding (27); Oil Spills (13); Research & Monitoring (29);
     Responsible Boating (17); Stewardship & Motivating Action (31); Strategic Leadership &
     Collaboration (28).

10. **"Vital Sign Reporter"** (`<h6>`, sidebar, via a form `<label>` with a help-icon popup — not
    real user-entry, a read-only field label) — org name, plain text, no link:
    - Salmon: "PSEMP Salmonid Work Group"
    - Orcas: "PSEMP Marine Mammals Work Group"
    - Both: an empty `<a href="mailto:"></a>` immediately below — no visible address text at all
      (see Gaps).

11. **"Last Updated"** (`<h6>`, sidebar) — date, plain text, both pages: "05/22/2025".

The source article ends there. No further sections.

## Existing prototype file audit

`src/data/pages/vital-sign-details.ts` is exhaustively verbatim and was independently re-verified
line-by-line against both live pages via `curl -sL` (breadcrumb, title, intro paragraph, photo
caption, the embedded Fancytree JSON for every indicator row, every Key-Vital-Sign-Messages
paragraph/bullet/inline-link href — including resolving the source's relative hrefs like `27`,
`34`, `../../VitalSignGoal/Detail/7` against the page's own directory — every Background
Documents/Other Resources nested entry and href, Contributing Partners, Related Strategies,
reporter, and Last Updated). Every string, every href, and the deliberately-preserved broken
"Zooplankton" link and empty reporter mailto match source exactly. **The entire data file
(`SALMON`, `ORCAS`, both exported objects and every field) is verbatim-usable as-is — no data
changes required.**

`src/pages/prototypes/vital-signs/[slug].astro` (the shared template) needs the following changes;
everything else in it is structurally sound:

1. **Header — must change.** Currently `PsInfoPhotoHeader size="band" image="/photos/sound-aerial.jpg"`
   with `eyebrow={detail.goalName}` and `lede={`${detail.intro.split('. ')[0]}.`}` (a synthesized,
   truncated first sentence of the intro). This unit's header is **plain**: swap to `EsaPageHeader`
   (`@esa/ecology/esa-page-header.astro`), `title={detail.name}`, no `eyebrow`, no `lede`.
   `/photos/sound-aerial.jpg` is a shared placeholder never carried by either source page and must
   not appear here; the source's *own* photo (`detail.photo`) already renders correctly, unchanged,
   in the Intro+photo body section (`PsInfoVitalSignDetailIntro`) — keep that usage as-is.
2. **Stat band — must remove.** `PsInfoStatBand` with `stats = [indicators.length, reporterOrg,
   lastUpdated]` has no source equivalent: neither page presents these three facts together as a
   KPI/stat strip anywhere. `reporterOrg` and `lastUpdated` already have their real, correct home —
   the "Vital Sign Reporter" / "Last Updated" sidebar fields, already rendered via
   `PsInfoVitalSignDetailFooter` further down the page — so this is pure duplication, not just
   invention. Delete the `stats` array and the `<PsInfoStatBand>` call entirely.
3. **"Related Strategies" section note — must remove.** The current `PsInfoSectionTitle` passes
   `note="Legacy 2022 Action Agenda strategies addressing this Vital Sign."` — this sentence is not
   on either source page (source's own `<h6>Related Strategies</h6>` carries no descriptive text).
   Drop the `note` prop; render the bare title.
4. **Bottom cross-links band — must be rebuilt, not dropped outright (this unit's carve-out).**
   Current `crossLinks` array feeds `PsInfoCrossLinks` with 3 entries, each carrying an invented
   `detail` blurb ("86 Vital Sign and Progress Indicators tracked across the recovery system", "How
   this Vital Sign rolls up into ecosystem-health reporting", "Ecosystem health tracked across all
   six recovery goals") — none of that copy is on either source page, and it must go regardless of
   what replaces it. Of the 3 links, only 2 have a real source equivalent — the source's own
   breadcrumb trail (Section 1 above) literally links this exact page to both:
   - the **Goal** ("Thriving Species and Food Web") → keep, pointing at
     `/prototypes/goals/thriving-species-and-food-web` (an existing route — confirmed in
     `src/data/pages/goals.ts`)
   - **"All Indicators"** → keep, pointing at `/prototypes/indicators` (an existing route)
   The third current link, "All Vital Signs," has **no** source equivalent from this page (the
   breadcrumb's other item, "About the Vital Signs," points to `/About`, a different page, not a
   Vital-Signs-index) — drop it. Build stage may implement the surviving 2 links as a genuine
   breadcrumb trail positioned where source has it (above the title, alongside "About the Vital
   Signs" and "Vital Sign" as the non-link, current-page final crumb) via `esa-breadcrumbs`
   (`@esa/ecology/esa-breadcrumbs.astro`), or as plain unadorned links wherever the build stage's
   established pattern for this repo puts them — but no invented descriptive copy either way, and
   no third "All Vital Signs" link.
5. **Indicator-count label on the "Indicators" section title — no change needed.** The current
   `PsInfoSectionTitle title="Indicators" count={"N indicators"}` is a plain count of the list
   rendered immediately below it (not an invented system-wide statistic) — consistent with how
   `PsInfoSectionTitle` is used for list counts elsewhere in this repo. Keep as-is.
6. Everything else — Intro+photo, Indicators tree, Key Vital Sign Messages, Background Documents,
   Other Resources, Contributing Partners, Partners & Reporting footer (reporter/last
   updated/print) — is content-accurate and structurally sound. No changes needed there.

## Explicit exclusions

- No `PsInfoPhotoHeader` / photo band, no `/photos/sound-aerial.jpg` or any other photo standing in
  for a hero — this unit's header is plain, title only, no eyebrow, no lede (see Header note
  above for why the intro paragraph is not repurposed as a lede).
- No stat band — the source shows indicator-count/reporter/last-updated as three separate,
  differently-placed facts (an implicit table row count; two sidebar fields at the bottom), never
  as a KPI strip.
- No invented descriptive copy anywhere in a cross-link element — specifically the three
  fabricated `detail` blurbs on the current bottom cross-links band must go. Of that band's 3
  links, only the 2 with a real source equivalent (Goal affiliation, All Indicators — both are the
  source's own breadcrumb items) may be kept; "All Vital Signs" has no source equivalent and must
  be dropped.
- No invented note text on "Related Strategies" (or any other section title) — the source carries
  no such sentence.
- No photos beyond each page's own single inline photo (Chinook salmon / Orcas) — no substitute,
  no addition.
- Nothing beyond the 11 sections inventoried above, for either page.

## Gaps

- Both pages' "Vital Sign Reporter" contact is a genuinely empty `<a href="mailto:"></a>` in
  source — no email address exists to extract. Already modeled as `reporterEmail: null`.
- Salmon's "Contributing Partners" section body is a single embedded base64 logo image (`alt=""`),
  not text — the org name ("Washington Department of Fish and Wildlife") was read off the logo
  itself; there is no href, since the source logo isn't wrapped in a link.
- One inline link in the Salmon "Key Vital Sign Messages" ("Zooplankton") has a genuinely broken
  href in the live source (`https://zooplankton/`, not a resolvable host) — rendered as plain text
  with no href rather than inventing a fix.
- The Salmon indicator tree's coho/steelhead/chum rows carry a progress label but no target-status
  icon at all in the source's own embedded JSON (an empty string, not a missing key) — modeled as
  `targetStatus: null`, not fabricated.
- Neither page is JS-gated for any of the content above: the indicator tree's data ships as a
  plain embedded JSON blob in the static HTML (only its *rendering* into a visual tree happens
  client-side), so every value was extractable directly via `curl -sL`. No content gaps beyond the
  four items above.
