# Page contract: progress-indicators

Source: https://progressindicators.pugetsoundinfo.wa.gov/ (fetched 2026-07-22) / Route(s): /prototypes/progress-indicators

The source URL is the Progress Indicators site's HOME page only. Its AG Grid
("Explore all Progress Indicators") is populated by a client-side fetch to
`/Home/IndexGridJsonData`, not present in the static HTML — that feed's 16
rows were fetched separately, also on 2026-07-22, and are embedded verbatim in
`src/data/pages/progress-indicators.ts` (raw payload preserved at
`scratchpad/prod/pi-grid-data.json`).

## Header

Logo hero — `PsInfoPiHero`, a new house pattern (no sibling page has a
logo-identity hero; every other unit uses `PsInfoPhotoHeader`).

- Prod has no photo hero. The page's own identity IS its logo image, rendered
  centered (`/Content/img/pi-logo-2026.png` in source, `/logos/pi-logo-2026.png`
  here — already correctly downloaded and in scope before this build started),
  `display:block; max-width: 32rem` in source CSS.
- The sitewide `siteTitle` banner carries the shouting-case string
  **"PUGET SOUND PROGRESS INDICATORS"** (sentence-cased per this repo's
  no-ornamental-caps rule: "Puget Sound Progress Indicators" — `SITE_NAME` in
  the data module) plus the tagline line **"Measures of human activities that
  influence ecosystem health"** (`TAGLINE`).
- h1 = the logo image's own alt text, "Puget Sound Progress Indicators" — the
  h1 wraps the `<img>` so its accessible name comes from the `alt` attribute,
  satisfying the one-`<h1>`-per-page rule without inventing a redundant text
  headline next to the logo.

## Sections (source order, exhaustive)

### 1. Intro

Three verbatim paragraphs (source's empty `<p>&nbsp;</p>` spacer between
paragraphs dropped; a trailing `&nbsp;` in the source text normalized to a
plain space):

> Progress Indicators measure human activities that can influence ecosystem
> conditions of Puget Sound in positive and negative ways. Progress
> Indicators help us understand whether we are progressing Puget Sound
> recovery efforts, as directed by the **Action Agenda** and achieving the
> short-term results we expect.

> Progress Indicators are developed in collaboration with local, state and
> Tribal partners. View **About the Progress Indicators** for more
> information.

> *Select a card below to learn more about that topic and explore the
> indicators designed to track progress towards recovery goals on that topic
> or scroll down to the indicator table to see all Progress Indicators.*
> (source wraps this whole sentence in `<strong>`.)

Inline links, verbatim in order:
- "Action Agenda" → source href `https://actionagenda.pugetsoundinfo.wa.gov/2026-2030` — **remapped** to the built `/prototypes/action-agenda` prototype page (the unified-IA payoff: this destination already exists in this build, so the link stays internal rather than pointing off-prototype to a page this repo can already serve).
- "About the Progress Indicators" → source href `/About`, absolutized to `https://progressindicators.pugetsoundinfo.wa.gov/About` (no prototype PI-About page exists). `*.pugetsoundinfo.wa.gov` is internal-CLASS on this prototype (these are, in prod, pages of the same statewide network) — no external mark, no new tab, even though the href is absolute.

### 2. Topic cards

5 cards, source order, each a whole-card link to `https://progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/{n}`:

| Title | Detail route | Image (FileResource GUID → local file) | Action Agenda topics |
|---|---|---|---|
| Agricultural Land Protection | `/Topic/Detail/2` | `329f1e1d-721a-4621-bf9b-a51b04f090bc` → `agricultural-land-protection.png` | 06 – Agricultural Land Protection |
| Floodplains, Estuaries, Nearshore, and Riparian Areas | `/Topic/Detail/6` | `a863a215-8702-468c-8f28-b8e369739013` → `floodplains-estuaries-nearshore-riparian.png` | 10 – Floodplains and Estuaries; 11 – Riparian Areas |
| Oil Spills | `/Topic/Detail/17` | `aefff5ee-9214-4818-8d44-a104df531f34` → `oil-spills.png` | 20 – Vessel Impacts |
| On-site Sewage System Management | `/Topic/Detail/13` | `446de3e2-77b6-41d3-9465-9a601c4b6bd6` → `onsite-sewage-system-management.png` | 18 – Fecal Pollution |
| Smart Growth | `/Topic/Detail/1` | `b97c50e6-a2ee-4b84-969d-f78f6f0d2da6` → `smart-growth.png` | 05 – Smart Growth |

Each card also renders its own "Action Agenda Topics" sub-block (verbatim
label, `TOPIC_CARDS_LABEL`) listing the related topic code(s) + label(s) as a
quiet badge + text pair (source: a hand-rolled blue `.aa2026TopicCodeColorBox`;
replaced here with `esa-badge`, never a colored left border).

Source's `<img alt="Key Image">` is replaced with `alt=""` here: the card
link's accessible name already comes from the visible title text, so the
image is decorative in this markup and "Key Image" is junk alt text not worth
reproducing.

**Deviation — card title heading level**: source renders each card title as a
bare `<h3>`, with no `<h1>`/`<h2>` anywhere on the whole page (confirmed:
zero `<h1>`/`<h2>` in the saved DOM snapshot). Reproducing that literally
would create an `h1` (this page's logo hero) `-> h3` (5 cards) `-> h2` (the
grid section heading) skip, which this repo's WCAG house rules ban ("no
skipping levels for looks"). Rendered instead as a styled `<span>` — the same
choice `psinfo-action-agenda-topic-grid` already made for its own,
near-identical whole-card-link shape, where the anchor's own text content
already carries the accessible name.

### 3. "Explore all Progress Indicators" (AG Grid)

Heading verbatim: **"Explore all Progress Indicators"**.

Columns (headerNames + initialWidths verbatim from source's grid config):

| field | headerName | initialWidth |
|---|---|---|
| indicator | Progress Indicator | 430 |
| description | Description | 630 |
| topics | Progress Indicator Topic | 230 |
| aaTopicLinks | Action Agenda Topics | 230 |
| programs | Related Ongoing Programs | 230 |

16 rows fetched from `/Home/IndexGridJsonData` on 2026-07-22, alphabetical
(source order), embedded verbatim in `INDICATOR_ROWS`. Row-count line
(verbatim template): `Currently Viewing {shown} out of {total} Indicators`.
"Download Table" exports the grid to CSV (community-tier `exportDataAsCsv`).
"(clear filters)" appears only once a column filter is active, verbatim label.

## Explicit exclusions

- Prod chrome: the top navbar (Explore mega-menu, PS Info network menu,
  Request Support, Log in), the breadcrumb row, and the sitewide
  partnership/funding footer that appears on every PS Info network page.
- The field-definition help-icon popups embedded in the grid's column
  headers — server-backed `FieldDefinition` dialogs with no content present
  in the saved DOM snapshot.
- `rowSelection: 'multiple'` — prod enables it on its grid with no visible
  selection UI (no checkbox column, nothing reads the selection); reproducing
  it here would add screen-reader "selectable" announcements with no
  corresponding feature, so it's dropped.
- Source's `<hr/>` between the intro and the topic cards, and its
  bold-italic-centered `<h3>` styling for the grid heading — both normalized
  to this prototype's house spacing (stack gap) and `PsInfoSectionTitle`
  system respectively.

## Gaps

- Grid row data is populated client-side in prod (`/Home/IndexGridJsonData`);
  captured 2026-07-22 and embedded verbatim in the data module rather than
  fetched live at runtime.
- Description cells carry rich HTML in prod source; flattened to plain text
  here with entities decoded to real characters (`’ “ ”`).
- The grid's "Progress Indicator Topic" column value for the two floodplain-
  related topics reads **"Floodplains (non-tidal)"**, which differs from the
  matching topic card's title, **"Floodplains, Estuaries, Nearshore, and
  Riparian Areas"**. Both strings are verbatim from their respective source
  records (the card grid and the indicator feed use different topic-label
  vocabularies in prod) — this is not a transcription error in this build.

---

# Page contract: progress-indicators / topic-2 (Topic Detail exemplar)

Source: https://qa-progressindicators.pugetsoundinfo.wa.gov/Topic/Detail/2
(QA site — the 2026 Topic pages exist only on QA today; fetched 2026-07-22)
Route: /prototypes/progress-indicators/topic-2
Prod <title>: "Progress Indicators   | Agricultural Land Protection".

The home page's Agricultural Land Protection topic card now links here
(`route` on its TOPIC_CARDS entry); the other four cards keep their live
Topic/Detail hrefs.

## Host normalization (whole page)

The saved DOM is the QA environment, so its hrefs carry QA hosts. All are
normalized to the production hosts the home page above already uses:
qa.pugetsoundinfo.wa.gov → www.pugetsoundinfo.wa.gov;
qa-actionagenda.… → actionagenda.…; qa-progressindicators.… →
progressindicators.… . All remain internal-class (no external mark, no new
tab). The ONLY genuinely external link on the page is RCW 36.70A.170
(app.leg.wa.gov) — external mark + new tab.

## Header

**Revised 2026-07-22 per Andrew's direct correction** ("you've introduced new
patterns, duplicated the breadcrumbs... This should feel similar to the orca
page. Could have a hero image."): the standard hero pattern, NOT a bespoke
header. `PsInfoPhotoHeader` carries the H1 ("Agricultural Land Protection")
over a real credited photograph (Skagit Valley tulip fields, credit Lowestock
— an Action Agenda carousel alternate; the source page itself has no
photography of its own). The source's linked siteTitle identity band and its
own breadcrumb row ("About the Progress Indicators" / "Back to Progress
Indicators") are NOT reproduced — the app shell's breadcrumb trail carries
location, and a second in-page breadcrumb row duplicated it (the original
build's `PsInfoPiTopicHeader` did exactly that and was deleted). Same call as
the Vital Sign detail (Orca) pages. Prod has no h1 anywhere on this page; the
hero's h1 is the prototype's standard heading treatment.

## Sections (source order, exhaustive)

1. Intro (#introduction, full width) — 3 verbatim paragraphs. Inline links:
   Smart Growth → ../Detail/1 absolutized; Habitat Acquisition and
   Restoration → ../Detail/6 absolutized (NOTE: source's link TEXT says
   "Habitat Acquisition and Restoration" while Detail/6 is the Floodplains
   topic — verbatim from source, not a transcription error); Functioning
   Habitat Vital Sign → remapped to /prototypes/goals/functioning-habitat
   (goals.ts maps VitalSignGoal/Detail/7 → that built page; unified-IA
   payoff, same rule as the home page's Action Agenda link). Source's
   target="_blank" on internal-class links dropped per link policy.
2. Description (#description, left column, unheaded) — verbatim paragraphs +
   3-item ul ("The **Farmland Protection Progress Indicator**" lead-in).
3. "Progress Indicators" (source h4.sectionHeader → h2 here) + the Fancytree
   TOPIC > PROGRESS INDICATOR grid, reproduced in the house Fancytree
   adaptation (PsInfoPiTopicTree, sibling of PsInfoVsFancyTree): Expand
   Level / Collapse Level / Search toolbar, framed one-root tree. Root
   "Agricultural Land Protection" self-links to this page (source links
   /Topic/Detail/2). Rows verbatim from the embedded treeSources JSON:
   Farmland conversion (Indicator/Detail/181; progress "Indicator To Be
   Developed", target status "Limited Data") and Farmland protection
   (Indicator/Detail/182; progress "Getting Worse", no target-status icon).
   Status icons are the source's own PNGs, downloaded from
   /Content/img/ProgressIndicatorIcons/ → public/photos/pi/icons/ (this is
   the PI icon set — distinct from the vital-signs icon set; "Limited Data"
   as a TARGET STATUS icon exists only here). Icon alt = the verbatim
   status label. Deviation: the search "(n matches)" counter text is
   omitted, matching the house adaptation.
4. Embedded content (#embeddedContent) — the QA source carries an iframe of
   placeholder test content (a stock YouTube video). NOT reproduced — cut by
   revision direction 2026-07-23 (QA scaffolding, not real page content); the
   `embed` field and PsInfoPiTopicEmbed component were removed with it.
5. "Key Results" (h2, verbatim) — bold lede, 4-bullet list, 3 paragraphs.
   Source's <strong>811</strong>&nbsp;<strong>fewer</strong> modeled as two
   adjacent strong segments ('811' + ' fewer'); the &nbsp; joiner renders as
   a plain space.
6. "What factors affect this Progress Indicator?" (h2, trailing &nbsp;
   trimmed) — bold-italic lede + 1 bullet.
7. "What other actions can we take?" (h2, trimmed) — 6 bullets (RCW
   36.70A.170 link external-marked), the "Please also visit the Action
   Agenda strategy dedicated to Agricultural Land Protection" paragraph
   (absolutized, internal-class — no AA Topic 06 page exists in this
   prototype; only Topic 05 was built), and the USDA footnote paragraph
   (its em run verbatim; "https://www.nass.usda.gov/AgCensus/" is plain
   text in source, not a link — kept as text).
8. "Contributing Partners" (source h4 → h2) — 5 partner LOGOS, each linking
   to www.pugetsoundinfo.wa.gov/Organization/Detail/{343,559,553,114,113},
   images downloaded from /FileResource/DisplayResource/{guid} →
   public/photos/pi/partners/, alt = verbatim org name. Rendered via the
   site-wide PsInfoVsPartners logo wall (bordered cells, same treatment as
   the Vital Signs index — revision direction 2026-07-23; the page-local
   bare-logo grid it replaced is deleted).
9. Right rail (source col-md-3 → PsInfoPiTopicSidebar): "Action Agenda
   Topics" (source h5 → h2) with the source's aa2026-topic-card (TOPIC 06
   badge + "Agricultural Land Protection", image = the Action Agenda unit's
   already-downloaded /photos/action-agenda/topic-06.jpg — the same Topic 06
   photo the source serves resized; card img alt="" since the visible title
   is the link name); "Last Updated" (source h6 → h2): "7/14/2026 11:37 AM".

## Heading normalization

Source has NO h1/h2 hierarchy driver (h4 → h2 → h4 → h5 → h6, no h1). Here:
one h1 (title), every section h2, no skips — the repo's WCAG house rule.

## Explicit exclusions

Same prod chrome as the home page (navbar/mega-menu, Request Support, Log
in, partnership/funding footer). Also excluded: the source's Fancytree
jQuery/glyph implementation (replaced by the house adaptation), Bootstrap
grid classes, and the Word-export artifacts in the CMS markup (MsoNormal
classes, <!-- [if !supportLists]--> comments, empty &nbsp; spacer
paragraphs).

## Gaps

None — all copy on the page is carried in full in
src/data/pages/progress-indicators.ts (TOPIC2).
