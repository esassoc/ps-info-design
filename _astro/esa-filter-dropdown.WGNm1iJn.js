import{w as n,i as l,A as a,b as r,t as d,a as c}from"./typography.C7xuE2z_.js";import{a as h}from"./a11y.c6v_nqwk.js";import{a as b}from"./announcer.dkeh-00N.js";const f={xs:"body-2xs",sm:"body-xs",md:"body-md",lg:"body-lg"},g=n`<polyline points="20 6 9 17 4 12"></polyline>`,m=n`<line x1="5" y1="12" x2="19" y2="12"></line>`;class v extends l{constructor(){super(),this.toggle=()=>{this.disabled||(this.checked=!this.checked,this.syncFormValue(),this.dispatchEvent(new CustomEvent("change",{detail:{checked:this.checked},bubbles:!0,composed:!0})))},this.onKeydown=e=>{(e.key===" "||e.key==="Enter")&&(e.preventDefault(),this.toggle())},this.label="",this.size="md",this.disabled=!1,this.indeterminate=!1,this.checked=!1,this.internals=this.attachInternals()}static{this.formAssociated=!0}static{this.properties={label:{type:String},size:{type:String,reflect:!0},disabled:{type:Boolean,reflect:!0},name:{type:String,reflect:!0},indeterminate:{type:Boolean,reflect:!0},checked:{type:Boolean,reflect:!0}}}connectedCallback(){super.connectedCallback(),this.syncFormValue()}syncFormValue(){this.internals.setFormValue(this.checked?"on":null),this.internals.ariaChecked=this.indeterminate?"mixed":String(this.checked)}render(){const e=this.getAttribute("aria-label");return r`
      <label class="wrapper" @keydown=${this.onKeydown} @click=${this.toggle}>
        <!-- aria-labelledby, NOT the wrapping label. A label associates only with a
             LABELABLE element — a form control — and an ARIA role does not make a
             span into one. Measured 2026-08-16 against Chrome's accessibility tree:
             this control's name was the empty string, with no name source at all.
             The wrapping label still earns its keep for the click target. -->
        <span
          class="box"
          role="checkbox"
          aria-labelledby=${this.label?"label":a}
          aria-label=${!this.label&&e?e:a}
          aria-checked=${this.indeterminate?"mixed":String(this.checked)}
          aria-disabled=${String(this.disabled)}
          tabindex=${this.disabled?-1:0}
        >
          ${this.indeterminate?r`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${m}</svg>`:this.checked?r`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${g}</svg>`:null}
        </span>
        ${this.label?r`<span id="label" class="label typography-${f[this.size]}">${this.label}</span>`:null}
      </label>
    `}static{this.styles=[d,h,c`
    :host {
      --_checkbox-size: 20px;
      --_checkbox-radius: var(--radius-md, 0.5rem);
      --_checkbox-icon-size: 16px;
      display: inline-block;
    }
    /* Box geometry only — the label's type is a composite named in render(). */
    :host([size='xs']) {
      --_checkbox-size: 14px;
      --_checkbox-radius: var(--radius-sm, 0.25rem);
      --_checkbox-icon-size: 10px;
    }
    :host([size='sm']) {
      --_checkbox-size: 16px;
      --_checkbox-radius: var(--radius-sm, 0.25rem);
      --_checkbox-icon-size: 12px;
    }
    :host([size='lg']) {
      --_checkbox-size: 24px;
      --_checkbox-radius: var(--radius-md, 0.5rem);
      --_checkbox-icon-size: 20px;
    }
    :host([disabled]) .wrapper {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .wrapper {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-200, 8px);
      cursor: pointer;
      user-select: none;
    }

    .box {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--_checkbox-size);
      height: var(--_checkbox-size);
      flex-shrink: 0;
      /* The size token is authoritative: without this, re-pointing the indicator
         border width would resize the control instead of thickening its edge. */
      box-sizing: border-box;
      border: var(--form-border-width, 1px) solid var(--form-border-color, #cecece);
      border-radius: var(--_checkbox-radius);
      background: var(--color-background-field, transparent);
      color: var(--color-content-default-knockout, #fcfcfc);
      transition:
        background var(--transition-fast, 150ms ease),
        border-color var(--transition-fast, 150ms ease),
        box-shadow var(--transition-fast, 150ms ease);
    }
    .box:focus-visible {
      border-color: var(--form-border-color-focus, #3e9b4f);
      outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
      outline-offset: var(--focus-ring-offset, 2px);
    }

    .icon {
      width: var(--_checkbox-icon-size);
      height: var(--_checkbox-icon-size);
    }

    :host([checked]) .box,
    :host([indeterminate]) .box {
      background: var(--color-background-brand, #46a758);
      border-color: var(--color-background-brand, #46a758);
    }

    /* DISABLED IS A TOKEN TREATMENT, not an opacity hack. Tier 2 already ships the
       whole triple — --color-background-disabled, --color-border-disabled,
       --color-content-disabled — and this is the state they exist for; two of the
       three had zero readers because the kit reached for opacity instead.
       The fill is also the one moment a field is deliberately NOT the colour of its
       container: the break from the surface IS the signal that it is inert. */
    /* Scoped to the UNCHECKED box on purpose: a checked box is a brand fill, and
       painting grey over it would erase the check. The wrapper's opacity above is
       what dims the checked case. */
    :host([disabled]:not([checked]):not([indeterminate])) .box {
      background: var(--color-background-disabled, #f0f0f0);
      border-color: var(--color-border-disabled, #d9d9d9);
    }

    /* Type comes from .typography-body-* on the element — including its leading.
       This used to pin line-height to tight (1.3) while every other label in the
       kit led at 1.6; that was a local special case, not a decision, and choice
       labels now read like the rest. */
    .label {
      color: var(--color-content-default, #202020);
    }

    /* FORCED COLORS. The box is a span carrying role=checkbox, not an input, so it
       gets none of the system styling a native checkbox does — no ButtonFace, and
       no GrayText when disabled. aria-disabled is invisible to this mode; it
       reads elements, never roles.

       Checked survives on its own: the tick is a currentColor SVG, and a SHAPE
       is not something force-adjustment can take away. What it can take away is
       the brand fill behind it, which would leave a tick the same colour as the
       box it sits in — hence the explicit Highlight/HighlightText pair.

       Disabled is stated in GrayText because the custom grey above collapses onto
       ordinary text colour. The opacity on the group wrapper does survive (opacity
       is not force-adjusted), so this is belt and braces, not the only signal. */
    @media (forced-colors: active) {
      .box {
        background: Canvas;
        border-color: CanvasText;
      }
      :host([checked]) .box,
      :host([indeterminate]) .box {
        background: Highlight;
        border-color: Highlight;
        color: HighlightText;
      }
      :host([disabled]) .box { border-color: GrayText; }
      :host([disabled]) .label { color: GrayText; }
    }
  `]}}customElements.get("esa-checkbox")||customElements.define("esa-checkbox",v);const _={xs:"microcopy-xs",sm:"microcopy-sm",md:"microcopy-md",lg:"microcopy-lg"},x={xs:"microcopy-xs-strong",sm:"microcopy-sm-strong",md:"microcopy-md-strong",lg:"microcopy-lg-strong"},w={xs:"microcopy-xs-subtle",sm:"microcopy-sm-subtle",md:"microcopy-md-subtle",lg:"microcopy-lg-subtle"},y={xs:"microcopy-xs-subtle",sm:"microcopy-sm-subtle",md:"microcopy-md-subtle",lg:"microcopy-lg-subtle"};class k extends l{constructor(){super(),this.onDocClick=e=>{this._open&&!e.composedPath().includes(this)&&this.closePanel()},this.onDocKeydown=e=>{e.key==="Escape"&&this._open&&this.closePanel()},this.togglePanel=()=>{const e=!this._open;this._open=e,e&&(this._highlighted=-1,requestAnimationFrame(()=>{this.renderRoot?.querySelector(".esa-filter-dropdown__search-input")?.focus()}))},this.onSearchInput=e=>{this._searchText=e.target.value,this._highlighted=-1},this.onKeydown=e=>{const o=this.filteredOptions,i=o.length-1;let t=this._highlighted;switch(e.key){case"ArrowDown":for(e.preventDefault(),t=t<i?t+1:0;o[t]?.disabled&&t<i;)t++;this._highlighted=t;break;case"ArrowUp":for(e.preventDefault(),t=t>0?t-1:i;o[t]?.disabled&&t>0;)t--;this._highlighted=t;break;case"Enter":e.preventDefault(),t>=0&&t<=i&&this.selectOption(o[t]);break;case"Escape":this.closePanel();break}},this.clear=e=>{e.stopPropagation(),this._selected=[],this.emitChange([])},this.wasEmpty=!1,this.name="",this.label="",this.options=[],this.multiple=!1,this.placeholder="",this.size="md",this._open=!1,this._searchText="",this._selected=[],this._highlighted=-1}static{this.properties={name:{type:String},label:{type:String},options:{type:Array},multiple:{type:Boolean,reflect:!0},placeholder:{type:String},size:{type:String,reflect:!0},_open:{state:!0},_searchText:{state:!0},_selected:{state:!0},_highlighted:{state:!0}}}closePanel(){if(!this._open)return;const e=this.renderRoot,o=!!e.activeElement;this._open=!1,o&&this.updateComplete.then(()=>{e.querySelector(".esa-filter-dropdown__trigger")?.focus()})}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this.onDocClick,!0),document.addEventListener("keydown",this.onDocKeydown)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.onDocClick,!0),document.removeEventListener("keydown",this.onDocKeydown)}get filteredOptions(){const e=this._searchText.toLowerCase();return e?this.options.filter(o=>o.label.toLowerCase().includes(e)):this.options}get hasSelection(){return this._selected.length>0}get buttonLabel(){if(this.multiple||this._selected.length===0)return this.label;const e=this.options.find(o=>o.value===this._selected[0]);return`${this.label}: ${e?.label??this._selected[0]}`}isSelected(e){return this._selected.includes(e)}selectOption(e){if(e.disabled)return;const o=e.value;if(this.multiple){const t=this._selected.indexOf(o)>=0?this._selected.filter(s=>s!==o):[...this._selected,o];this._selected=t,this._searchText="",this.emitChange(t),requestAnimationFrame(()=>{this.renderRoot?.querySelector(".esa-filter-dropdown__search-input")?.focus()})}else this._selected=[o],this._searchText="",this.emitChange([o]),this.closePanel()}emitChange(e){const o=this.multiple?e:e[0]??void 0;this.dispatchEvent(new CustomEvent("selection-change",{detail:{value:o},bubbles:!0,composed:!0}));const i=e.map(t=>{const s=this.options.find(u=>u.value===t);return{name:this.name,label:this.label,value:t,displayValue:s?.label??t}});this.dispatchEvent(new CustomEvent("esa-filter-change",{detail:{name:this.name,filters:i},bubbles:!0,composed:!0}))}updated(){this.announceEmptyResults()}announceEmptyResults(){const e=this._open&&!!this._searchText.trim()&&this.filteredOptions.length===0;e&&!this.wasEmpty&&b("No options match",{assertive:!0}),this.wasEmpty=e}render(){const e=this.filteredOptions,o=this.hasSelection?x[this.size]:_[this.size];return r`
      <div class="esa-filter-dropdown">
        <button
          class="esa-filter-dropdown__trigger typography-${o} ${this.hasSelection?"esa-filter-dropdown__trigger--active":""}"
          type="button"
          aria-expanded=${this._open}
          aria-haspopup="listbox"
          @click=${this.togglePanel}
        >
          <span class="esa-filter-dropdown__label">${this.buttonLabel}</span>
          ${this.multiple&&this._selected.length>0?r`<span class="esa-filter-dropdown__count typography-microcopy-xs-strong"
                >${this._selected.length}</span
              >`:null}
          <span
            class="esa-filter-dropdown__arrow ${this._open?"esa-filter-dropdown__arrow--open":""}"
          >${E}</span>
        </button>

        ${this._open?r`<div class="esa-filter-dropdown__panel" role="listbox" id="listbox">
              <div class="esa-filter-dropdown__search">
                <!-- The search input had no accessible name — only a placeholder,
                     which is not a name and vanishes as soon as you type. The cue is
                     what makes announcing the option list on every keystroke
                     unnecessary. aria-activedescendant is what makes arrow-key
                     navigation audible: focus stays here, so without it the
                     highlighted option changes silently. Both IDREFs resolve inside
                     this shadow root, which is the only place they can. -->
                <input
                  class="esa-filter-dropdown__search-input typography-${w[this.size]}"
                  type="text"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="listbox"
                  aria-label=${"Filter "+this.label}
                  aria-describedby="cue"
                  aria-activedescendant=${this._highlighted>=0?`opt-${this._highlighted}`:a}
                  placeholder=${this.placeholder||"Search..."}
                  .value=${this._searchText}
                  @input=${this.onSearchInput}
                  @keydown=${this.onKeydown}
                  autocomplete="off"
                />
                <span class="visually-hidden" id="cue"
                  >Options filter as you type. Use the up and down arrows to review
                  them, Enter to toggle one.</span
                >
              </div>
              <div class="esa-filter-dropdown__options" role="group" aria-label=${this.label}>
                ${e.length===0?r`<div class="esa-filter-dropdown__empty">No options match.</div>`:e.map((i,t)=>r`<div
                        class="esa-filter-dropdown__option typography-${y[this.size]}
                          ${i.disabled?"esa-filter-dropdown__option--disabled":""}
                          ${this._highlighted===t?"esa-filter-dropdown__option--highlighted":""}"
                        role="option"
                        id="opt-${t}"
                        aria-selected=${this.isSelected(i.value)}
                        aria-disabled=${i.disabled??!1}
                        @click=${()=>this.selectOption(i)}
                      >
                        <esa-checkbox
                          class="esa-filter-dropdown__checkbox"
                          size="sm"
                          ?checked=${this.isSelected(i.value)}
                          ?disabled=${i.disabled}
                          aria-hidden="true"
                          tabindex="-1"
                        ></esa-checkbox>
                        ${i.color?r`<span
                              class="esa-filter-dropdown__option-dot"
                              style="background:${i.color}"
                            ></span>`:null}
                        <span class="esa-filter-dropdown__option-label">${i.label}</span>
                      </div>`)}
              </div>
              <div class="esa-filter-dropdown__footer">
                <button
                  type="button"
                  class="esa-filter-dropdown__clear-link typography-microcopy-sm"
                  ?disabled=${!this.hasSelection}
                  @click=${this.clear}
                >Clear all</button>
              </div>
            </div>`:null}
      </div>
    `}static{this.styles=[d,h,c`
    :host {
      display: inline-block;

      --_filter-height: 40px;
      --_filter-padding-x: var(--spacing-400, 1rem);
      --_filter-radius: var(--radius-md, 0.5rem);
      --_filter-bg: var(--color-background-elevation-raised, #fcfcfc);
      --_filter-bg-active: var(--color-background-brand-subtle, #fbfefb);
      --_filter-text: var(--color-content-default, #202020);
      --_filter-text-active: var(--color-background-brand, #46a758);
      --_filter-border: var(--color-border-default, #cecece);
      --_filter-border-active: var(--color-background-brand, #46a758);
    }

    /* base :host = md. xs is one step below sm; sm/lg keep the old small/large values.
       The size steps carry geometry only — the text comes from a composite class
       named in render() (TRIGGER_TYPE / TRIGGER_ACTIVE_TYPE / OPTION_TYPE), so the
       trigger and the panel it opens stay on one rung by construction. */
    :host([size='xs']) {
      --_filter-height: 28px;
      --_filter-padding-x: var(--spacing-200, 0.5rem);
      --_filter-radius: var(--radius-sm, 0.25rem);
    }
    :host([size='sm']) {
      --_filter-height: 32px;
      --_filter-padding-x: var(--spacing-300, 0.75rem);
      --_filter-radius: var(--radius-sm, 0.25rem);
    }
    :host([size='lg']) {
      --_filter-height: 48px;
      --_filter-padding-x: var(--spacing-500, 1.5rem);
      --_filter-radius: var(--radius-md, 0.5rem);
    }

    .esa-filter-dropdown {
      position: relative;
      display: inline-flex;
    }

    .esa-filter-dropdown__trigger {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-100, 0.25rem);
      height: var(--_filter-height);
      padding-inline: var(--_filter-padding-x);
      border: var(--border-width-default, 1px) solid var(--_filter-border);
      border-radius: var(--_filter-radius);
      background: var(--_filter-bg);
      color: var(--_filter-text);
      cursor: pointer;
      white-space: nowrap;
      transition:
        background var(--transition-fast, 150ms ease),
        border-color var(--transition-fast, 150ms ease),
        color var(--transition-fast, 150ms ease);
      -webkit-appearance: none;
      appearance: none;
    }
    .esa-filter-dropdown__trigger:hover:not(.esa-filter-dropdown__trigger--active) {
      border-color: var(--_filter-border-active);
    }
    .esa-filter-dropdown__trigger:focus-visible {
      outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
      outline-offset: var(--focus-ring-offset, 2px);
    }
    /* Weight comes from TRIGGER_ACTIVE_TYPE (label-*-strong) — same rung as the
       resting trigger, so applying a filter does not resize the bar. */
    .esa-filter-dropdown__trigger--active {
      background: var(--_filter-bg-active);
      border-color: var(--_filter-border-active);
      color: var(--_filter-text-active);
    }
    /* Open (panel showing) but nothing selected yet → just lift the border. */
    .esa-filter-dropdown__trigger[aria-expanded='true']:not(.esa-filter-dropdown__trigger--active) {
      border-color: var(--_filter-border-active);
    }

    .esa-filter-dropdown__label {
      /* clip/visible, not "overflow: hidden" — the trigger sets a microcopy composite,
         whose line-height "none" (1) leaves the line box 1em against DM Sans's 1.30em
         glyph box, so hiding the Y axis clips the descenders in a label like
         "Category" or "Region type". Same fix as esa-file-list's .file__name, where
         the arithmetic is written out. */
      overflow-x: clip;
      overflow-y: visible;
      text-overflow: ellipsis;
      max-width: 200px;
    }

    .esa-filter-dropdown__count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.25rem;
      height: 1.25rem;
      padding-inline: 0.3rem;
      border-radius: var(--radius-pill, 9999px);
      background: var(--color-background-brand, #46a758);
      color: var(--color-content-default-knockout, #fcfcfc);
    }

    .esa-filter-dropdown__arrow {
      display: inline-flex;
      width: 20px;
      height: 20px;
      transition: transform var(--transition-fast, 150ms ease);
    }
    .esa-filter-dropdown__arrow svg { width: 20px; height: 20px; }
    .esa-filter-dropdown__arrow--open {
      transform: rotate(180deg);
    }

    .esa-filter-dropdown__clear {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      opacity: 0.8;
      transition: opacity var(--transition-fast, 150ms ease);
    }
    .esa-filter-dropdown__clear:hover { opacity: 1; }
    .esa-filter-dropdown__clear svg { width: 16px; height: 16px; }

    .esa-filter-dropdown__panel {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: var(--z-dropdown, 50);
      min-width: var(--filter-dropdown-min-width, 200px);
      max-height: 300px;
      background: var(--color-background-elevation-raised, #fcfcfc);
      border: var(--border-width-default, 1px) solid
        var(--color-border-default, #cecece);
      border-radius: var(--radius-md, 0.5rem);
      box-shadow: var(--elevation-4, 0 6px 24px -6px rgba(0, 0, 0, 0.07));
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .esa-filter-dropdown__search {
      padding: var(--spacing-200, 0.5rem);
      border-bottom: var(--border-width-default, 1px) solid var(--color-border-default, #cecece);
    }
    .esa-filter-dropdown__search-input {
      /* A real <input> — it cannot wrap, so leading only sets the box height. */
      width: 100%;
      box-sizing: border-box;
      padding: var(--spacing-100, 0.25rem) var(--spacing-200, 0.5rem);
      border: var(--border-width-default, 1px) solid var(--color-border-default, #cecece);
      border-radius: var(--radius-sm, 0.25rem);
      background: var(--color-background-elevation-raised, #fcfcfc);
      color: var(--color-content-default, #202020);
      /* Suppressed only because the :focus rule below paints the ring. */
      outline: none;
    }
    /* This ring was three problems in one rule until 2026-08-16: it was 1px, which
       is half the area Focus Appearance asks for; it read --color-background-brand
       directly, so a spoke re-pointing --focus-ring-color left this one field
       behind; and it fired on mouse. Now the house shape. :focus-visible is safe
       here even though it is a text input — engines match :focus-visible on text
       entry whether it was clicked or tabbed to. */
    .esa-filter-dropdown__search-input:focus-visible {
      border-color: var(--form-border-color-focus, #3e9b4f);
      outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
      outline-offset: var(--focus-ring-offset, 2px);
    }

    .esa-filter-dropdown__options {
      margin: 0;
      padding: var(--spacing-100, 0.25rem) 0;
      overflow-y: auto;
      max-height: 240px;
    }
    .esa-filter-dropdown__option {
      display: flex;
      align-items: center;
      gap: var(--spacing-200, 0.5rem);
      padding: var(--spacing-150, 0.375rem) var(--spacing-300, 0.75rem);
      color: var(--color-content-default, #202020);
      cursor: pointer;
      user-select: none;
      transition: background var(--transition-fast, 150ms ease);
    }
    .esa-filter-dropdown__option:hover:not(.esa-filter-dropdown__option--disabled),
    .esa-filter-dropdown__option--highlighted:not(.esa-filter-dropdown__option--disabled) {
      background: var(--color-background-elevation-sunken, #f0f0f0);
    }
    .esa-filter-dropdown__option--disabled {
      opacity: 0.5;
      cursor: default;
      pointer-events: none;
    }
    /* Display-only: the row owns the click so the box never double-toggles. */
    .esa-filter-dropdown__checkbox {
      pointer-events: none;
      flex-shrink: 0;
    }
    /* Optional per-option color dot (options[].color) */
    .esa-filter-dropdown__option-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .esa-filter-dropdown__option-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .esa-filter-dropdown__empty {
      padding: var(--spacing-300, 0.75rem);
      color: var(--color-content-default-secondary, #646464);
      font-style: var(--font-style-italic, italic);
      text-align: center;
    }

    .esa-filter-dropdown__footer {
      display: flex;
      justify-content: flex-end;
      padding: var(--spacing-200, 0.5rem);
      border-top: var(--border-width-default, 1px) solid var(--color-border-default, #cecece);
    }
    .esa-filter-dropdown__clear-link {
      background: none;
      border: none;
      color: var(--color-content-brand, #2a7e3b);
      cursor: pointer;
      padding: var(--spacing-100, 0.25rem) var(--spacing-200, 0.5rem);
      border-radius: var(--radius-sm, 0.25rem);
    }
    .esa-filter-dropdown__clear-link:hover:not(:disabled) {
      background: var(--color-background-elevation-sunken, #f0f0f0);
    }
    .esa-filter-dropdown__clear-link:disabled {
      color: var(--color-content-default-secondary, #646464);
      cursor: not-allowed;
    }

    /* FORCED COLORS. This list is the one that mostly survives already: selection
       is carried by a nested <esa-checkbox> with a real glyph and a real border,
       not by a row tint. Only the keyboard cursor needs restoring.

       The per-option colour dot is the exception — it is an inline
       per-option background colour with no label of any kind, so it is content
       rather than decoration and opts out. Without the opt-out every dot renders
       identically and the colour dimension of the filter is simply gone. */
    @media (forced-colors: active) {
      .esa-filter-dropdown__option--highlighted {
        outline: 2px solid CanvasText;
        outline-offset: -2px;
      }
      .esa-filter-dropdown__option--disabled { color: GrayText; }
      .esa-filter-dropdown__option-dot {
        forced-color-adjust: none;
        outline: 1px solid CanvasText;
      }
    }
  `]}}const E=r`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>`;customElements.get("esa-filter-dropdown")||customElements.define("esa-filter-dropdown",k);
