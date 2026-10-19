# System improvement ledger

Spoke friction that is the system's fault, for promotion to the hub.

- 2026-10-16: theme-ps-info.css never re-points `--color-content-on-brand`, so text on the navy brand fill (CIR box bars, report title chip, www header links, VS prod header, fancy tree) hardcodes `#ffffff`. Fix: pin the on-brand foreground in the PS Info theme and read it in those components.
- 2026-10-16: no esa- slippy map lego. PsInfoShiMap hand-wires Leaflet (basemap choice, keyboard text, marker DOM). Proposed hub fix: an `esa-map` lego with a keyless grayscale basemap and display-only point layers.
- 2026-10-16: esa-card has no media/poster variant. PsInfoDesignIndex layers a cover image and gradient itself. Proposed hub fix: an `esa-card` media slot.
