/**
 * Host-based external-link classification, shared by every psinfo component
 * that decides whether a destination gets the external-link mark + opens in
 * a new tab.
 *
 * In prod, vitalsigns / progressindicators / actionagenda / nepatlas /
 * www.pugetsoundinfo.wa.gov are five separate subdomains with no shared nav.
 * In this unified shell they're peer pages of ONE site — so any
 * *.pugetsoundinfo.wa.gov destination (or a root-relative prototype route) is
 * INTERNAL: no mark, no new tab. Only a genuinely different host (arcgis.com,
 * epa.gov, stateofthesound.wa.gov, box.com, …) is external.
 */
const PSINFO_HOST = /(^|\.)pugetsoundinfo\.wa\.gov$/i;

export function isExternalHref(href: string | undefined | null): boolean {
  if (!href) return false;
  if (href.startsWith('/') || href.startsWith('#')) return false;
  try {
    const { hostname, protocol } = new URL(href);
    if (protocol !== 'http:' && protocol !== 'https:') return false;
    return !PSINFO_HOST.test(hostname);
  } catch {
    // Not a parseable absolute URL (bare relative path, mailto:, etc.) — internal.
    return false;
  }
}

/** Lucide `external-link` icon paths — the ONE mark used repo-wide for genuinely external destinations. */
export const EXTERNAL_LINK_ICON_PATHS =
  '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>';
