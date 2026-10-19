// Every epic this spoke presents, and the lookups the epic page, story pages,
// previous/next bar and gate share. Pure functions over the epic files, so
// scripts/epic-shots.mjs can import this module too.
import type { Epic, EpicMarkBox, EpicPage, EpicStep, EpicStory } from './types.ts';
import { SHI_EPIC } from './shi.ts';

export const EPICS: Epic[] = [SHI_EPIC];

export const JIRA_BROWSE = 'https://sitkatech.atlassian.net/browse/';
export const jiraHref = (key: string): string => `${JIRA_BROWSE}${key}`;

export const storySlug = (story: EpicStory): string => story.key.toLowerCase();
export const storyRoute = (epic: Epic, story: EpicStory): string => `${epic.route}/${storySlug(story)}`;

/** The epic's walk: every page under every story, in story order. A page
    listed under two stories is two stops. */
export const epicSteps = (epic: Epic): EpicStep[] =>
  epic.stories.flatMap((story) => story.pages.map((page) => ({ story, page })));

/** The page a story page shows as the story's one illustrative example. */
export const exampleOf = (story: EpicStory): EpicPage => story.pages.find((p) => p.example) ?? story.pages[0];

/** Query parameter naming the story a page was reached from. */
export const STORY_PARAM = 'story';

const storiesListing = (epic: Epic, route: string): EpicStory[] =>
  epic.stories.filter((s) => s.pages.some((p) => p.route === route));

/** Link to a stop. Carries ?story= only when the page sits under more than one
    story, so the bar can show the one the reader came from. */
export const stepHref = (epic: Epic, step: EpicStep): string =>
  storiesListing(epic, step.page.route).length > 1
    ? `${step.page.route}?${STORY_PARAM}=${step.story.key}`
    : step.page.route;

/** Base-less, slash-trimmed route from a request path ('/ps-info-design/x/' -> '/x'). */
export function normalizeRoute(pathname: string, base = '/'): string {
  let path = pathname.replace(/index\.html$/, '');
  if (base !== '/' && path.startsWith(base)) path = '/' + path.slice(base.length);
  if (path.length > 1) path = path.replace(/\/+$/, '');
  return path || '/';
}

/** The stops a route is, in the epic that walks it. */
export function stopsForRoute(route: string): { epic: Epic; stops: { index: number; step: EpicStep }[] } | undefined {
  for (const epic of EPICS) {
    const stops = epicSteps(epic)
      .map((step, index) => ({ index, step }))
      .filter(({ step }) => step.page.route === route);
    if (stops.length) return { epic, stops };
  }
  return undefined;
}

/** The epic a route belongs to: its epic page, a story page, or a page it walks. */
export function epicForRoute(route: string): Epic | undefined {
  return EPICS.find(
    (epic) =>
      route === epic.route ||
      epic.stories.some((s) => route === storyRoute(epic, s)) ||
      epicSteps(epic).some(({ page }) => page.route === route),
  );
}

/** sessionStorage key: one unlock covers the whole epic for the tab. */
export const gateStorageKey = (epic: Epic): string => `epic-unlocked:${epic.key}`;

/** Attributes that mark a part of a page for a story. psinfo-epic-mark wraps
    a section with them; a component marking a part from inside spreads them. */
export const epicMarkAttrs = (storyKey: string, label: string): Record<string, string> => ({
  'data-epic-mark': storyKey,
  'data-epic-mark-label': label,
});

/** CSS px. scripts/epic-shots.mjs splits a group of marks at the widest gap
    between them before its shot gets taller than this; a single mark taller
    than this keeps one shot. */
export const EPIC_SHOT_TALL = 1200;

/** The story's marked parts in page order, one per label, numbered before any
    is dropped, so the live outlines and the story page screenshots always
    agree. A label the page repeats (the SHI mark on every table row) is one
    part, outlined on its first instance that has a box: one example, not every
    copy. A part is boxed where it paints: its own box plus any descendant that
    spills past it (a full-bleed strip inside a page-column wrapper), and a
    wrapper that boxes nothing itself (display: contents) takes the union of its
    children. Self-contained: psinfo-epic-bar calls it in the browser and
    scripts/epic-shots.mjs runs it inside the page it shoots. */
export function measureMarks(storyKey: string): EpicMarkBox[] {
  type Box = { left: number; top: number; right: number; bottom: number };
  const boxOf = (el: Element): Box | null => {
    const r = el.getBoundingClientRect();
    const own = r.width > 1 && r.height > 1 ? { left: r.left, top: r.top, right: r.right, bottom: r.bottom } : null;
    // An svg's box already holds its drawing; a clipping box holds its children.
    const clips = el instanceof SVGElement || (own !== null && getComputedStyle(el).overflow !== 'visible');
    const boxes = [own, ...(clips ? [] : Array.from(el.children).map(boxOf))].filter((k): k is Box => k !== null);
    if (!boxes.length) return null;
    return {
      left: Math.min(...boxes.map((k) => k.left)),
      top: Math.min(...boxes.map((k) => k.top)),
      right: Math.max(...boxes.map((k) => k.right)),
      bottom: Math.max(...boxes.map((k) => k.bottom)),
    };
  };
  const parts = new Map<string, EpicMarkBox>();
  for (const el of Array.from(document.querySelectorAll(`[data-epic-mark="${CSS.escape(storyKey)}"]`))) {
    const label = el.getAttribute('data-epic-mark-label') ?? '';
    const known = parts.get(label);
    if (known?.rect) continue;
    const b = boxOf(el);
    parts.set(label, {
      n: known?.n ?? parts.size + 1,
      label,
      rect: b && b.right > b.left && b.bottom > b.top ? { x: b.left, y: b.top, w: b.right - b.left, h: b.bottom - b.top } : null,
    });
  }
  return [...parts.values()];
}
