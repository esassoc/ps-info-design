// An epic as a client walks it: its stories in order, and the prototype pages
// that answer each one. One file per epic in this folder; index.ts lists them.
// Nothing here is spoke-specific, so the shape can move to the hub unchanged.
//
// Every import in this folder carries its .ts extension and nothing outside the
// folder: scripts/epic-shots.mjs loads these files straight into Node.
//
// prose-prop-checked: `story` is a Jira story record (key, title, pages), never page copy

export interface EpicPage {
  title: string;
  /** Root-relative, base-less route; wrap with withBase() at render. */
  route: string;
  /** Short case label shown beside the title on the epic and story pages. */
  label?: string;
  /** The story page shows this page as the story's one illustrative example.
      At most one per story; without one, the first page. */
  example?: boolean;
}

export interface EpicStory {
  /** Jira key, e.g. DELTA-1343. */
  key: string;
  /** The Jira story title, verbatim. */
  title: string;
  pages: EpicPage[];
}

export interface Epic {
  /** Jira key, e.g. DELTA-1337. */
  key: string;
  title: string;
  /** Root-relative, base-less route of the epic page. Story pages sit under it. */
  route: string;
  stories: EpicStory[];
  /**
   * Optional. Locks the epic page, its story pages and every page in it behind
   * psinfo-password-gate. Plain text by design: the gate is a casual deterrent
   * on a public site, not access control (see the gate's header).
   */
  password?: string;
}

/** One stop on the walk: a page as it sits under one story. */
export interface EpicStep {
  /** The Jira story record this stop sits under. */
  story: EpicStory;
  page: EpicPage;
}

/** A marked part as measured in the page, one per label: numbered first, so a
    part with no box keeps its number. `rect` is in viewport pixels, null when
    no instance of it has a box. */
export interface EpicMarkBox {
  n: number;
  label: string;
  rect: { x: number; y: number; w: number; h: number } | null;
}

/** Where a part's number sits: beside its outline (start, end), over or under
    it, or, when none of those is clear of the page's text, inside its corner. */
export type EpicBadgeSide = 'start' | 'end' | 'above' | 'below' | 'inside';

/** A marked part's place on a screenshot, in percent of the image. */
export interface EpicShotMark {
  /** 1-based, by first appearance of its label in page order; matches the live outlines. */
  n: number;
  /** The mark's own label, as written in the page's markup. */
  label: string;
  /** Where its number sits, chosen in the page by placeBadges. */
  badge: EpicBadgeSide;
  x: number;
  y: number;
  w: number;
  h: number;
}

/** One screenshot of a page, cropped to the marked parts it holds. */
export interface EpicShot {
  /** Root-relative, base-less path under public/. */
  src: string;
  /** CSS pixels (the image file is 2x). */
  width: number;
  height: number;
  marks: EpicShotMark[];
}

/** Written by scripts/epic-shots.mjs: story key, then page route, then its shots. */
export type EpicShots = Record<string, Record<string, EpicShot[]>>;
