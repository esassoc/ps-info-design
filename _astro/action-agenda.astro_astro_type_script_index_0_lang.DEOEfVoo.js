import{b as o,i as m,A as r,t as y,a as v}from"./typography.C7xuE2z_.js";import{a as x}from"./a11y.c6v_nqwk.js";const _=o`<svg
  class="error__icon"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line
    x1="12"
    x2="12.01"
    y1="16"
    y2="16"
  />
</svg>`,k={xs:"label-2xs",sm:"label-xs",md:"label-md",lg:"label-lg"},T={xs:"microcopy-2xs-subtle",sm:"microcopy-xs-subtle",md:"microcopy-md-subtle",lg:"microcopy-lg-subtle"};class E extends m{constructor(){super(),this.warnedNameless=!1,this.onInput=e=>{this.value=e.target.value,this.internals.setFormValue(this.value),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0}))},this.label="",this.size="md",this.placeholder="",this.helpText="",this.errorText="",this.required=!1,this.disabled=!1,this.type="text",this.value="",this.prefix="",this.suffix="",this.pattern="",this.autocomplete="",this.inputmode="",this.liveError=!1,this.internals=this.attachInternals()}static{this.formAssociated=!0}static{this.properties={label:{type:String},size:{type:String,reflect:!0},placeholder:{type:String},helpText:{type:String,attribute:"help-text"},errorText:{type:String,attribute:"error-text"},required:{type:Boolean,reflect:!0},disabled:{type:Boolean,reflect:!0},name:{type:String,reflect:!0},type:{type:String},value:{type:String},prefix:{type:String},suffix:{type:String},pattern:{type:String},minlength:{type:Number},maxlength:{type:Number},autocomplete:{type:String},inputmode:{type:String},liveError:{type:Boolean,attribute:"live-error"}}}connectedCallback(){super.connectedCallback(),this.internals.setFormValue(this.value)}updated(e){e.has("value")&&this.internals.setFormValue(this.value),this.syncValidity(),this.warnIfNameless()}syncValidity(){const e=this.renderRoot?.querySelector(".input");if(!e)return;const t=e.validity;if(t.valid){this.internals.setValidity({});return}const i=t.valueMissing&&this.label?`Enter ${this.label}.`:e.validationMessage;this.internals.setValidity({valueMissing:t.valueMissing,typeMismatch:t.typeMismatch,patternMismatch:t.patternMismatch,tooLong:t.tooLong,tooShort:t.tooShort,rangeUnderflow:t.rangeUnderflow,rangeOverflow:t.rangeOverflow,stepMismatch:t.stepMismatch,badInput:t.badInput},i,e)}warnIfNameless(){this.warnedNameless||this.label||this.getAttribute("aria-label")||(this.warnedNameless=!0,console.warn("⚠️  esa-text-field has no accessible name. Set `label` (preferred — it renders visibly AND wires <label for>), or `aria-label` if the name is carried elsewhere. `placeholder` is not a name: it vanishes as soon as the user types.",this))}focus(e){const t=this.renderRoot?.querySelector(".input");t?t.focus(e):super.focus(e)}render(){const e=!!this.errorText,t=[e?"error":"",this.helpText?"help":""].filter(Boolean).join(" ");return o`
      <div class="field ${e?"field--error":""}">
        ${this.label?o`<label class="label typography-${k[this.size]}" for="input"
              >${this.label}${this.required?o`<span class="required" aria-hidden="true">*</span>`:null}</label
            >`:null}
        <div class="control typography-${T[this.size]}">
          ${this.prefix?o`<span class="affix affix--prefix">${this.prefix}</span>`:null}
          <input
            id="input"
            class="input"
            .type=${this.type}
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?required=${this.required}
            pattern=${this.pattern||r}
            minlength=${this.minlength??r}
            maxlength=${this.maxlength??r}
            autocomplete=${this.autocomplete||r}
            inputmode=${this.inputmode||r}
            name=${this.name||r}
            aria-required=${this.required?"true":r}
            aria-invalid=${e?"true":r}
            aria-describedby=${t||r}
            @input=${this.onInput}
          />
          ${this.suffix?o`<span class="affix affix--suffix">${this.suffix}</span>`:null}
        </div>

        <!-- BOTH nodes render unconditionally. A live region that is created at the same
             moment as its text is routinely not announced — it has to already exist for
             the mutation to be observed. :empty collapses the gap so a clean field
             looks untouched, WITHOUT display:none, which would drop it from the
             accessibility tree and defeat the whole arrangement. -->
        <p
          class="error typography-body-sm ${e?"is-shown":"visually-hidden"}"
          id="error"
          role=${this.liveError?"alert":r}
          data-esa-live=${this.liveError?"opt-in":r}
        >${e?o`${_}<span class="visually-hidden">Error: </span
                ><span>${this.errorText}</span>`:r}</p>
        <p class="help typography-body-sm ${this.helpText?"is-shown":"visually-hidden"}" id="help"
          >${this.helpText||r}</p
        >
      </div>
    `}static{this.styles=[y,x,v`
    :host {
      --_field-padding-y: var(--spacing-300, 0.75rem);
      --_field-padding-x: var(--spacing-300, 0.75rem);
      --_field-radius: var(--radius-md, 0.5rem);
      --_field-border-color: var(--form-border-color, #cecece);
      display: block;
    }
    /* Type is NOT set here. The size steps carry geometry only; the text comes
       from a composite class named in render() (LABEL_TYPE / VALUE_TYPE), so the
       component says "this text is a label" rather than assembling a size, a
       weight and a leading at the call site. */
    :host([size='xs']) {
      --_field-padding-y: var(--spacing-200, 0.5rem);
      --_field-padding-x: var(--spacing-200, 0.5rem);
      --_field-radius: var(--radius-sm, 0.25rem);
    }
    :host([size='sm']) {
      --_field-padding-y: var(--spacing-250, 0.625rem);
      --_field-padding-x: var(--spacing-250, 0.625rem);
      --_field-radius: var(--radius-sm, 0.25rem);
    }
    :host([size='lg']) {
      --_field-padding-y: var(--spacing-400, 1rem);
      --_field-padding-x: var(--spacing-400, 1rem);
      --_field-radius: var(--radius-md, 0.5rem);
    }

    .field {
      display: flex;
      flex-direction: column;
    }

    /* Type comes from .typography-label-* on the element. Colour and spacing are
       not typography and stay here. */
    .label {
      color: var(--form-label-color, #646464);
      margin-block-end: var(--form-label-gap, 4px);
    }
    .required {
      color: var(--color-content-utility-danger, #ce2c31);
      margin-inline-start: 2px;
    }

    /* The box chrome (border / height / radius / focus ring) lives on the wrapper
       so any affixes sit flush inside the same border as the input. */
    .control {
      display: flex;
      align-items: stretch;
      /* NO HEIGHT. The box is as tall as the input inside it, which is its line
         box plus its padding. A px height could not grow with rem text, so it
         clipped — and this rule used to pair one with overflow:hidden, which is
         what made the clipping silent. See semantic/size.json.

         line-height 1 is what leaves padding as the only variable: at 1.6 there
         is a third term (0.6 x font-size of leading) that nobody chose and that
         grows faster than either input. Everything else — face, size, weight,
         tracking — still comes from .typography-body-* on this element and
         inherits to the input and the affixes below. */
      background: var(--color-background-field, transparent);
      border: var(--form-border-width, 1px) solid var(--_field-border-color);
      border-radius: var(--_field-radius);
      box-sizing: border-box;
      transition:
        border-color var(--transition-fast, 150ms ease),
        box-shadow var(--transition-fast, 150ms ease);
    }
    /* Hover moves the BORDER, not the fill — the field is transparent in every
       state so that it is the colour of whatever contains it. --form-border-color-hover
       already existed for exactly this and was wired into one component; it is the
       family treatment now. Disabled needs no rule here: .input:disabled below
       dims and sets the cursor. */
    .control:hover:not(:has(.input:disabled)) {
      --_field-border-color: var(--form-border-color-hover, #bbbbbb);
    }
    .control:focus-within {
      --_field-border-color: var(--form-border-color-focus, #3e9b4f);
      outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
      outline-offset: var(--focus-ring-offset, 2px);
    }

    .input {
      flex: 1 1 auto;
      min-width: 0;
      width: 100%;
      /* No height: 100%. It used to resolve against .control's fixed height, which
         meant this padding was ABSORBED into that height rather than adding to it.
         With no fixed parent it would compute to auto anyway; removing it makes the
         padding load-bearing, which is the point. .control is align-items:stretch,
         so the affixes still match this element's height. */
      padding: var(--_field-padding-y) var(--_field-padding-x);
      /* A native control does not inherit type by default — this is what opts it
         into the composite already resolved on .control. */
      font: inherit;
      color: var(--form-text-color, #202020);
      background: transparent;
      border: none;
      outline: none;
      box-sizing: border-box;
    }
    .input::placeholder {
      color: var(--form-placeholder-color, #838383);
    }
    /* DISABLED IS A TOKEN TREATMENT, not an opacity hack. Tier 2 already ships the
       whole triple — --color-background-disabled, --color-border-disabled,
       --color-content-disabled — and this is the state they exist for; two of the
       three had zero readers because the kit reached for opacity instead.
       The fill is also the one moment a field is deliberately NOT the colour of its
       container: the break from the surface IS the signal that it is inert. */
    .control:has(.input:disabled) {
      background: var(--color-background-disabled, #f0f0f0);
      --_field-border-color: var(--color-border-disabled, #d9d9d9);
    }
    .input:disabled {
      color: var(--color-content-disabled, #8d8d8d);
      cursor: not-allowed;
    }
    .input:disabled::placeholder {
      color: var(--color-content-disabled, #8d8d8d);
    }

    /* Segmented addon inside the field box — a sunken tint divided from the input
       by a hairline. The divider stays neutral on focus (uses the static border
       color, not the dynamic --_field-border-color). */
    .affix {
      display: inline-flex;
      align-items: center;
      flex: none;
      padding-inline: var(--_field-padding-x);
      color: var(--form-affix-color, var(--color-content-default-secondary, #646464));
      background: var(--form-affix-bg, var(--color-background-elevation-sunken, #f0f0f0));
      user-select: none;
      white-space: nowrap;
    }
    .affix--prefix {
      border-inline-end: var(--form-border-width, 1px) solid
        var(--form-affix-border-color, var(--form-border-color, #cecece));
    }
    .affix--suffix {
      border-inline-start: var(--form-border-width, 1px) solid
        var(--form-affix-border-color, var(--form-border-color, #cecece));
    }

    /* ON AN INVALID FIELD THE FOCUS RING TURNS RED, and it does so by RE-POINTING THE
       TOKEN rather than by overriding a property. This is the house mechanism for the
       error ring — ten components use it (the six field components, esa-form-field,
       esa-checkbox-group, esa-radio-group, esa-button-toggle) and the reasoning is written
       out once, here.

       WHY THE TOKEN AND NOT outline-color. A field is not one focusable thing. This one is,
       but esa-select and esa-combobox have an input, a trigger and N chip remove buttons;
       esa-checkbox-group has N boxes; esa-radio-group N circles; and esa-form-field does not
       own its control at all — it wraps a slotted one. Overriding outline-color means one
       rule per focusable part, and every part you forget keeps ringing brand-green inside a
       field that is telling the user it is invalid. Re-pointing --focus-ring-color on the
       error wrapper reaches all of them with one declaration, because custom properties
       INHERIT — including into slotted light-DOM content and across a shadow boundary, which
       is the only channel that works in every engine.

       CONSEQUENCE WORTH KNOWING, since it is a decision and not an accident: a dropdown
       panel rendered inside .field (esa-select and esa-combobox both render theirs inside
       .container) inherits this too, so the search box inside an invalid combobox's panel
       rings red as well. That is consistent — it is all one field — but it is a behaviour
       nobody would predict from reading the rule, so it is recorded rather than discovered.

       IT WAS AN ADDITION FOR ONE DAY AND THAT WAS A BUG, worth recording because the
       mechanism is easy to recreate. This started life as
       box-shadow: 0 0 0 var(--focus-ring-width) <red>, back when the base rule ALSO painted
       the ring with box-shadow — so it was a true override: same property, same geometry,
       red replaced brand. On 2026-08-16 the forced-colors pass converted the base rule to
       outline (box-shadow is force-adjusted away, so a box-shadow-only ring vanishes in
       Windows High Contrast) and did NOT convert this one. The moment the two rules stopped
       sharing a property the override stopped overriding, and a focused invalid field
       painted THREE concentric bands in two colours: red border, red box-shadow flush to
       it, a 2px gap, then the brand outline. Nobody designed that. check-a11y could not
       catch it either — its ring check asks whether a ring is PRESENT, and two rings pass
       that as easily as one. Re-pointing the token cannot fail that way: there is no second
       property to fall out of step with.

       WHY RED IS ALLOWED TO BE THE RING at all, given the ring carries a 3:1 obligation:
       --form-error-border-color is graded by check-contrast.mjs against all four surfaces at
       fail level, exactly like the brand ring. It resolves to red-9 (#e5484d, 3.43:1 on the
       worst surface) and to red-11 under the wcag-aa assurance profile (4.57:1). It is also
       what --_field-border-color uses below, so the ring and the border are the same red by
       construction rather than by coincidence.

       NOT --color-border-utility-danger, which is what three of the six field components
       used until 2026-08-17. That role is red-6, a SUBTLE BORDER step: 1.40:1 on a sunken
       surface. Their error rings were very nearly invisible, and the literal fallback beside
       it — rgba(211, 47, 47, 0.25) — measured 1.26:1. */
    .field--error {
      --focus-ring-color: var(--form-error-border-color, #e5484d);
    }
    .field--error .control {
      --_field-border-color: var(--form-error-border-color, #e5484d);
    }

    /* Type comes from .typography-body-sm — help and error are one size at every
       control step, so they name the composite directly rather than mapping. */
    /* Both nodes are ALWAYS in the DOM (see render()), so the gap is opt-IN rather
       than collapsed away. Deliberately not display:none when empty — that removes
       the node from the accessibility tree, and a live region that is not in the tree
       cannot announce anything. An empty <p> with no margin occupies no space.

       .is-shown rather than :empty: Lit's template whitespace leaves a text node
       inside the element, and browsers still disagree about whether :empty ignores
       whitespace-only children (Selectors L4 says yes, L3 says no). A class is
       deterministic; :empty here would silently leave 4px of dead space under every
       clean field in some engines and not others. */
    .help,
    .error {
      margin: 0;
    }
    .help.is-shown,
    .error.is-shown {
      margin-block-start: var(--form-help-gap, 4px);
    }
    .help {
      color: var(--form-help-color, #838383);
    }
    /* The error line is distinguished from the help line by THREE things — colour, the
       icon, and the visually-hidden "Error:" prefix. Colour alone is SC 1.4.1 (Use of
       Color, Level A), and colour alone is exactly what these two had: same tag, same
       type role, same position, different custom property. */
    .error {
      display: flex;
      align-items: center;
      gap: var(--spacing-100, 4px);
      color: var(--form-error-color, var(--color-content-utility-danger, #ce2c31));
    }
    .error__icon {
      flex: none;
      width: 1em;
      height: 1em;
    }
  `]}}customElements.get("esa-text-field")||customElements.define("esa-text-field",E);const $=o`<svg
  class="error__icon"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line
    x1="12"
    x2="12.01"
    y1="16"
    y2="16"
  />
</svg>`,S={sm:"label-xs",md:"label-md",lg:"label-lg"},p={sm:"microcopy-xs-subtle",md:"microcopy-md-subtle",lg:"microcopy-lg-subtle"},u={sm:"body-xs",md:"body-md",lg:"body-lg"};let f=!1;class d extends m{constructor(){super(),this.onDocClick=e=>{this._open&&(e.composedPath().includes(this)||(this._open=!1))},this.warnedSize=!1,this.warnedSearchable=!1,this.onSearchInput=e=>{this._search=e.target.value,this._active=-1,this._open||(this._open=!0)},this.onKeydown=e=>{const t=this.filteredOptions;switch(e.key){case"ArrowDown":if(e.preventDefault(),!this._open)return this.openDropdown();{let i=this._active+1;for(;i<t.length&&t[i].disabled;)i++;i<t.length&&(this._active=i)}break;case"ArrowUp":if(e.preventDefault(),!this._open)return this.openDropdown();{let i=this._active-1;for(;i>=0&&t[i].disabled;)i--;i>=0&&(this._active=i)}break;case"Enter":if(e.preventDefault(),this._open&&this._active>=0){const i=t[this._active];i&&!i.disabled&&this.selectOption(i)}else this._open||this.openDropdown();break;case"Escape":e.preventDefault(),this._open=!1;break;case"Tab":this._open=!1;break;case" ":if(this.searchable)break;if(this._typeahead){this.onTypeahead(e);break}if(e.preventDefault(),!this._open)this.openDropdown();else if(this._active>=0){const i=t[this._active];i&&!i.disabled&&this.selectOption(i)}break;default:this.onTypeahead(e);break}},this._typeahead="",this.label="",this.options=[],this.size="md",this.placeholder="Select...",this.helpText="",this.cue="",this.errorText="",this.required=!1,this.liveError=!1,this.disabled=!1,this.multiple=!1,this.searchable=!1,this.chipMode=!1,this._search="",this._selected=[],this._open=!1,this._active=-1,this.internals=this.attachInternals()}static{this.formAssociated=!0}static{this.properties={label:{type:String},options:{type:Array},size:{type:String,reflect:!0},placeholder:{type:String},helpText:{type:String,attribute:"help-text"},cue:{type:String},errorText:{type:String,attribute:"error-text"},required:{type:Boolean},liveError:{type:Boolean,attribute:"live-error"},disabled:{type:Boolean,reflect:!0},name:{type:String,reflect:!0},multiple:{type:Boolean},searchable:{type:Boolean},chipMode:{type:Boolean,attribute:"chip-mode"},_search:{state:!0},_selected:{state:!0},_open:{state:!0},_active:{state:!0}}}static{this.SIZES=["sm","md","lg"]}willUpdate(){if(!d.SIZES.includes(this.size)){const e=this.size;this.size="sm",this.warnedSize||(this.warnedSize=!0,console.warn(`⚠️  esa-select: size="${e}" is not supported — clamped to "sm". A select is a click target with a popup; below sm the trigger and chevron fall under a comfortable tap size, and the option list does not shrink with it. Use esa-text-field if you need xs.`))}}connectedCallback(){super.connectedCallback(),this.warnSearchableFlip(),document.addEventListener("click",this.onDocClick),this.syncFormValue()}warnSearchableFlip(){f||this.hasAttribute("searchable")||(f=!0,console.warn("⚠️  esa-select: `searchable` now defaults to false (was true before 2026-08-15), so this instance renders a button trigger instead of a text field. The list is still reachable by TYPEAHEAD, so most call sites need no change. If you wanted filtering as you type, that is <esa-combobox>. (migrations.json: select-searchable-to-combobox)"))}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("click",this.onDocClick),clearTimeout(this._typeaheadTimer)}set value(e){e==null?this._selected=[]:Array.isArray(e)?this._selected=e:this._selected=[e],this.syncFormValue()}get value(){return this.multiple?this._selected:this._selected[0]??""}get filteredOptions(){const e=this._search.toLowerCase();return e?this.options.filter(t=>t.label.toLowerCase().includes(e)):this.options}get displayValue(){return this._selected.length===0?"":this.options.find(t=>t.value===this._selected[0])?.label??""}get selectedOptions(){return this.options.filter(e=>this._selected.includes(e.value))}get inputValue(){return this.multiple?this._search:this._search||this.displayValue}isSelected(e){return this._selected.includes(e)}syncFormValue(){this.internals.setFormValue(this.multiple?this._selected.join(","):this._selected[0]??null)}updated(){this.syncValidity()}syncValidity(){if(!this.required||this._selected.length>0){this.internals.setValidity({});return}const e=this.renderRoot?.querySelector(".input")??void 0;this.internals.setValidity({valueMissing:!0},this.label?`Select ${this.label}.`:"Select an option.",e)}emit(){this.syncFormValue(),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0}))}toggleDropdown(){this.disabled||(this._open?this._open=!1:this.openDropdown())}openDropdown(){this.disabled||(this._open=!0,this._active=-1,requestAnimationFrame(()=>{this.renderRoot.querySelector(".input")?.focus()}))}selectOption(e){if(e.disabled)return;const t=e.value;if(this.multiple){const i=this._selected.indexOf(t);this._selected=i>=0?this._selected.filter(a=>a!==t):[...this._selected,t],this._search="",this.emit(),requestAnimationFrame(()=>{this.renderRoot.querySelector(".input")?.focus()})}else this._selected=[t],this._search="",this._open=!1,this.emit()}removeValue(e,t){t?.stopPropagation(),this._selected=this._selected.filter(i=>i!==e),this.emit()}clearSelection(e){e?.stopPropagation(),this._selected=[],this.emit()}renderTags(){const e=this.selectedOptions;if(e.length===0)return null;if(e.length>1)return o`<span class="chip chip--count typography-body-sm">
        <span class="chip__label">${e.length} Options</span>
        <button
          type="button"
          class="chip__remove"
          aria-label="Clear selection"
          @click=${i=>this.clearSelection(i)}
        >
          ${this.xIcon()}
        </button>
      </span>`;const t=e[0];return o`<span class="chip typography-body-sm">
      <span class="chip__label">${t.label}</span>
      <button
        type="button"
        class="chip__remove"
        aria-label=${"Remove "+t.label}
        @click=${i=>this.removeValue(t.value,i)}
      >
        ${this.xIcon()}
      </button>
    </span>`}onTypeahead(e){if(e.key.length!==1||e.ctrlKey||e.metaKey||e.altKey||this.searchable)return;e.preventDefault(),this._typeahead+=e.key.toLowerCase(),clearTimeout(this._typeaheadTimer),this._typeaheadTimer=setTimeout(()=>{this._typeahead=""},500);const t=this.options.findIndex(i=>!i.disabled&&i.label.toLowerCase().startsWith(this._typeahead));t<0||(this._open||this.openDropdown(),this._active=t)}get describedBy(){return[this.errorText?"error":"",this.helpText?"help":"","cue"].filter(Boolean).join(" ")}get cueText(){return this.cue?this.cue:"Use the up and down arrows to review options, or type to jump to one. Enter to choose."}renderTrigger(){const e=this.multiple?this.selectedOptions.map(i=>i.label).join(", "):this.displayValue,t=!e;return o`<button
      type="button"
      class="input input--trigger typography-${p[this.size]} ${t?"input--placeholder":""}"
      role="combobox"
      aria-expanded=${this._open}
      aria-haspopup="listbox"
      aria-labelledby=${this.label?"label":r}
      aria-required=${this.required?"true":r}
      aria-invalid=${this.errorText?"true":r}
      aria-describedby=${this.describedBy||r}
      aria-controls=${this._open?"listbox":r}
      aria-activedescendant=${this._open&&this._active>=0?`opt-${this._active}`:r}
      ?disabled=${this.disabled}
      @keydown=${this.onKeydown}
    >
      ${this.multiple&&this.chipMode&&this.selectedOptions.length?"":e||this.placeholder}
    </button>`}renderSearchableInput(){return this.warnedSearchable||(this.warnedSearchable=!0,console.warn("⚠️  esa-select: `searchable` is deprecated — a select is a list opened by a BUTTON. A type-to-filter field is an autocomplete, which is `esa-combobox`. Either drop `searchable` (the list is still reachable by typeahead) or switch to <esa-combobox>. (migrations.json: select-searchable-to-combobox)")),o`<input
      class="input typography-${p[this.size]}"
      role="combobox"
      aria-expanded=${this._open}
      aria-haspopup="listbox"
      aria-autocomplete="list"
      aria-labelledby=${this.label?"label":r}
      aria-required=${this.required?"true":r}
      aria-invalid=${this.errorText?"true":r}
      aria-describedby=${this.describedBy||r}
      aria-controls=${this._open?"listbox":r}
      aria-activedescendant=${this._open&&this._active>=0?`opt-${this._active}`:r}
      placeholder=${this.multiple&&this.chipMode&&this.selectedOptions.length?"":this.placeholder}
      .value=${this.inputValue}
      ?disabled=${this.disabled}
      @input=${this.onSearchInput}
      @keydown=${this.onKeydown}
    />`}focus(e){const t=this.renderRoot?.querySelector(".input");t?t.focus(e):super.focus(e)}render(){const e=!!this.errorText;return o`
      <div class="field ${e?"field--error":""}">
        ${this.label?o`<span class="field__label typography-${S[this.size]}" id="label">
              ${this.label}${this.required?o`<span class="field__required" aria-hidden="true">*</span>`:null}
            </span>`:null}

        <div class="container">
          <!-- Multi-select chip mode renders the selected tokens INSIDE the field
               box (tag input), not floating above it. -->
          <div
            class="input-wrapper ${this.multiple&&this.chipMode?"input-wrapper--tags":""}"
            @click=${()=>this.toggleDropdown()}
          >
            ${this.multiple&&this.chipMode?this.renderTags():null}
            ${this.searchable?this.renderSearchableInput():this.renderTrigger()}
            <span class="arrow ${this._open?"arrow--open":""}">${this.chevronIcon()}</span>
          </div>

          ${this._open?o`<div class="dropdown" role="listbox" id="listbox">
                ${this.filteredOptions.length===0?o`<div class="option option--empty typography-${u[this.size]}">No results found</div>`:this.filteredOptions.map((t,i)=>{const a=this.isSelected(t.value);return o`<div
                        class="option typography-${u[this.size]} ${i===this._active?"option--active":""} ${a?"option--selected":""} ${t.disabled?"option--disabled":""}"
                        role="option"
                        id="opt-${i}"
                        aria-selected=${a}
                        aria-disabled=${t.disabled??!1}
                        @click=${()=>this.selectOption(t)}
                        @mouseenter=${()=>this._active=i}
                      >
                        <span class="check ${a?"check--selected":""}"
                          >${this.checkIcon()}</span
                        >
                        <span class="option__label">${t.label}</span>
                      </div>`})}
              </div>`:null}
        </div>

        <!-- Both nodes always present: a live region created at the same moment as its
             text is routinely not announced, so it has to already be there. .is-shown
             rather than :empty — Lit's template whitespace defeats :empty in engines
             following Selectors L3. -->
        <span
          class="field__error typography-body-sm ${e?"":"visually-hidden"}"
          id="error"
          role=${this.liveError?"alert":r}
          data-esa-live=${this.liveError?"opt-in":r}
        >${e?o`${$}<span class="visually-hidden">Error: </span
                ><span>${this.errorText}</span>`:r}</span
        >
        <span
          class="field__help typography-body-sm ${this.helpText?"":"visually-hidden"}"
          id="help"
          >${this.helpText||r}</span
        >
        <!-- Always hidden, always present: the instructional cue that means the option
             list does not need to announce itself as it filters. See cueText. -->
        <span class="visually-hidden" id="cue">${this.cueText}</span
        >
      </div>
    `}chevronIcon(){return o`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>`}checkIcon(){return o`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>`}xIcon(){return o`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>`}static{this.styles=[y,x,v`
    :host {
      display: block;
      --_field-padding-y: var(--spacing-300, 0.75rem);
      --_field-padding-x: var(--spacing-300, 0.75rem);
      --_field-radius: var(--radius-md, 0.5rem);
      --_field-border-color: var(--form-border-color, #cecece);
    }
    /* No :host([size='xs']) — see the note on "declare size". "sm" is the floor by
       decision, and an out-of-range size is clamped to it before it reaches here.
       (No backticks in this comment: one would close the css tagged template.) */
    :host([size='sm']) {
      --_field-padding-y: var(--spacing-250, 0.625rem);
      --_field-padding-x: var(--spacing-250, 0.625rem);
      --_field-radius: var(--radius-sm, 0.25rem);
    }
    :host([size='lg']) {
      --_field-padding-y: var(--spacing-400, 1rem);
      --_field-padding-x: var(--spacing-400, 1rem);
      --_field-radius: var(--radius-md, 0.5rem);
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-100, 4px);
    }
    .field__label {
      /* Was the last reader of --form-label-font-size and one of two readers of
         --form-label-font-weight. Both are retired with the rest of the size-only
         ramp; the composite carries size and weight together. */
      color: var(--form-label-color, #646464);
    }
    .field__required {
      color: var(--color-content-utility-danger, #ce2c31);
      margin-left: 2px;
    }
    .field__help {
      color: var(--form-help-color, #838383);
    }
    /* Three signals, not one: colour, the icon, and a visually-hidden "Error:" prefix.
       Colour alone is SC 1.4.1 (Use of Color, Level A) — and colour alone is exactly
       what separated this from .field__help, which is otherwise an identical span in
       an identical slot. */
    .field__error {
      display: flex;
      align-items: center;
      gap: var(--spacing-100, 4px);
      color: var(--form-error-color, var(--color-content-utility-danger, #ce2c31));
    }
    .field__error .error__icon {
      flex: none;
      width: 1em;
      height: 1em;
    }
    /* Both message nodes are ALWAYS rendered — a live region created at the same moment
       as its text is routinely not announced, so it has to already exist. When there is
       nothing to say they carry .visually-hidden, which takes them out of flow: .field
       is a flex column with a gap, so an in-flow empty node would spend 4px of dead
       space per message. Deliberately NOT display:none, which would drop them from the
       accessibility tree and defeat the arrangement entirely. */

    .container {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-100, 4px);
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    /* Tag mode: chips render inside the field box, so the wrapper carries the
       border/height/focus and the input becomes a borderless filler beside them. */
    .input-wrapper--tags {
      flex-wrap: nowrap;
      gap: var(--spacing-100, 4px);
      padding: var(--_field-padding-y) calc(var(--_field-padding-x) + 24px)
        var(--_field-padding-y) var(--_field-padding-x);
      background: var(--color-background-field, transparent);
      border: var(--form-border-width, 1px) solid var(--_field-border-color);
      border-radius: var(--_field-radius);
      box-sizing: border-box;
      transition:
        border-color var(--transition-fast, 150ms ease),
        box-shadow var(--transition-fast, 150ms ease);
    }
    .input-wrapper--tags:focus-within {
      --_field-border-color: var(--form-border-color-focus, #3e9b4f);
      outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
      outline-offset: var(--focus-ring-offset, 2px);
    }
    .input-wrapper--tags .input {
      /* Compact tag filter: at most ONE token renders (a single chip, or an
         "N Options" count for 2+), so the input rides beside it on one line and the
         box stays at field height — it never wraps to a second row. */
      flex: 1 1 2rem;
      width: auto;
      min-width: 2rem;
      height: auto;
      padding: 0;
      border: none;
      border-radius: 0;
      background: transparent;
    }
    .input-wrapper--tags .input:focus {
      box-shadow: none;
    }
    .field--error .input-wrapper--tags {
      --_field-border-color: var(--form-error-border-color, #e5484d);
    }
    .input {
      width: 100%;
      padding: var(--_field-padding-y) var(--_field-padding-x);
      padding-inline-end: calc(var(--_field-padding-x) + 24px);
      /* The box is content + padding since heights were removed (2026-08-14), so
         LEADING IS NOW LOAD-BEARING — it is the term that decides how tall a field
         is. On a single-line control leading has no typographic job: there is one
         line, and the space above and below it is invisible. Letting the body-*
         composite's relaxed leading through added 12px here at md and made this
         field 7px taller than esa-text-field on the same step, breaking the row
         alignment component-tokens.css promises.
         CHOSEN, NOT RESTATED, and not compensated for with a smaller padding rung.
         The tight leading comes from FIELD_TYPE picking a microcopy-*-subtle rung,
         whose composite declares the line-height for us — there is deliberately no
         line-height declaration in this rule, because one here would outrank the
         composite rather than agree with it. (.input--trigger below does restate
         it as normal, for the button-versus-input reason given there.) A static padding offset was the other option and
         is wrong: leading scales with the fluid type (27px at 1600, 22px at 375) and
         is re-pointable by a theme, so an offset would cancel it at exactly one
         viewport. esa-textarea stays on a body-* composite on purpose — it is
         genuinely multi-line, so its leading has a typographic job. */
      color: var(--form-text-color, #202020);
      background: var(--color-background-field, transparent);
      border: var(--form-border-width, 1px) solid var(--_field-border-color);
      border-radius: var(--_field-radius);
      outline: none;
      cursor: pointer;
      box-sizing: border-box;
      transition:
        border-color var(--transition-fast, 150ms ease),
        box-shadow var(--transition-fast, 150ms ease);
    }
    .input::placeholder {
      color: var(--form-placeholder-color, #838383);
    }

    /* The default trigger is a BUTTON, not an input — a select opens a list, it does
       not accept typing. A button brings UA styles an input does not: centred text,
       its own font, and a min-width. Restate them so the two trigger paths (button,
       and the deprecated searchable input) are visually identical. */
    .input--trigger {
      display: block;
      text-align: start;
      /* Only the family is restated. The composite class on this same element
         already sets size, weight and tracking; the font shorthand that used to
         sit here came later in the sheet and reset all of them to the host's,
         which made the trigger a step larger than esa-text-field at the same size
         and broke the filter-row alignment the two are meant to share. */
      font-family: inherit;
      /* Leading is the one composite term a BUTTON and an INPUT read differently.
         The composite's line-height 1 is honoured by this button, but a native
         single-line input never lays its text out shorter than the font's normal
         line box (Chrome, WebKit), so esa-text-field's box is font-normal plus
         padding whatever the composite says. Measured 2026-09-14: 3.5px shorter
         at sm, 4.5px at md, 5.5px at lg. normal here puts the trigger on the
         same floor the input is already on — same font, same normal, same box —
         at every size and in every browser, with no px offset to drift. */
      line-height: normal;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-appearance: none;
      appearance: none;
    }
    /* ::placeholder cannot apply to a button — there is no placeholder attribute,
       only fallback text — so the muted colour is a class instead. */
    .input--placeholder {
      color: var(--form-placeholder-color, #838383);
    }
    /* Hover moves the BORDER, not the fill — the field is transparent in every
       state so that it is the colour of whatever contains it.
       --form-border-color-hover already existed for exactly this and was wired
       into one component; it is the family treatment now. */
    .input:hover:not(:disabled) {
      --_field-border-color: var(--form-border-color-hover, #bbbbbb);
    }
    .input:focus {
      --_field-border-color: var(--form-border-color-focus, #3e9b4f);
      outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
      outline-offset: var(--focus-ring-offset, 2px);
    }
    /* DISABLED IS A TOKEN TREATMENT, not an opacity hack. Tier 2 already ships the
       whole triple — --color-background-disabled, --color-border-disabled,
       --color-content-disabled — and this is the state they exist for; two of the
       three had zero readers because the kit reached for opacity instead.
       The fill is also the one moment a field is deliberately NOT the colour of its
       container: the break from the surface IS the signal that it is inert. */
    .input:disabled {
      background: var(--color-background-disabled, #f0f0f0);
      --_field-border-color: var(--color-border-disabled, #d9d9d9);
      color: var(--color-content-disabled, #8d8d8d);
      cursor: not-allowed;
    }
    /* Tag mode moves the box chrome onto the wrapper, so the disabled fill has to
       follow it there — the .input above is borderless in that mode. */
    .input-wrapper--tags:has(.input:disabled) {
      background: var(--color-background-disabled, #f0f0f0);
      --_field-border-color: var(--color-border-disabled, #d9d9d9);
    }

    .arrow {
      position: absolute;
      right: var(--_field-padding-x);
      top: 50%;
      transform: translateY(-50%);
      display: inline-flex;
      color: var(--color-content-default-secondary, #646464);
      pointer-events: none;
      transition: transform var(--transition-fast, 150ms ease);
    }
    .arrow svg {
      width: var(--icon-size-md, 20px);
      height: var(--icon-size-md, 20px);
    }
    .arrow--open {
      transform: translateY(-50%) rotate(180deg);
    }

    .dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: var(--z-dropdown, 50);
      margin-top: var(--spacing-100, 4px);
      max-height: 256px;
      overflow-y: auto;
      background: var(--color-background-elevation-raised, #fcfcfc);
      border: var(--form-border-width, 1px) solid var(--form-border-color, #cecece);
      border-radius: var(--radius-md, 0.5rem);
      box-shadow: var(--elevation-4, 0 6px 24px -6px rgba(0, 0, 0, 0.07));
      overscroll-behavior: contain;
    }

    .option {
      display: flex;
      align-items: center;
      gap: var(--spacing-100, 4px);
      padding: var(--spacing-200, 8px) var(--spacing-300, 12px);
      color: var(--color-content-default, #202020);
      cursor: pointer;
      user-select: none;
      transition: background var(--transition-fast, 150ms ease);
    }
    .option:hover,
    .option--active {
      background: var(--color-background-elevation-sunken, #f0f0f0);
    }
    .option--selected {
      background: var(--color-background-overlay-active, rgba(0, 88, 98, 0.08));
      color: var(--color-content-brand, #2a7e3b);
    }
    .option--disabled {
      color: var(--color-content-disabled, #8d8d8d);
      cursor: not-allowed;
      opacity: 0.6;
    }
    .option--disabled:hover {
      background: transparent;
    }
    .option--empty {
      color: var(--color-content-default-secondary, #646464);
      cursor: default;
      font-style: var(--font-style-italic, italic);
    }
    .option--empty:hover {
      background: transparent;
    }
    .option__label {
      flex: 1;
    }

    .check {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      opacity: 0;
      color: var(--color-content-brand, #2a7e3b);
      transition: opacity var(--transition-fast, 150ms ease);
    }
    .check svg {
      width: 16px;
      height: 16px;
    }
    .check--selected {
      opacity: 1;
    }

    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-100, 4px);
    }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-050, 2px);
      padding: 0 var(--spacing-100, 4px) 0 var(--spacing-200, 8px);
      background: var(--color-background-overlay-active, rgba(0, 88, 98, 0.08));
      color: var(--color-content-brand, #2a7e3b);
      border-radius: var(--radius-pill, 9999px);
      user-select: none;
    }
    .chip__label {
      white-space: nowrap;
    }
    .chip__remove {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--color-content-brand, #2a7e3b);
      border-radius: 50%;
      cursor: pointer;
      transition: background var(--transition-fast, 150ms ease);
    }
    .chip__remove svg {
      width: 14px;
      height: 14px;
    }
    .chip__remove:hover {
      background: var(--color-background-overlay-strong-hover, rgba(0, 0, 0, 0.05));
    }
    .chip__remove:focus-visible {
      outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
      outline-offset: 1px;
    }

    .field--error .input {
      --_field-border-color: var(--form-error-border-color, #e5484d);
    }
    /* The invalid field's ring is the SAME ring in red, via the token rather than a property
       override. THIS COMPONENT IS WHY the mechanism is the token: there are three focusable
       parts here — the tags wrapper, the input, and every chip remove button — and an
       outline-color override would have to name each one. Re-pointing --focus-ring-color on
       the error wrapper covers all three, and the dropdown panel too (it renders inside
       .container, so it inherits; see esa-text-field on why that is recorded as a decision).
       Two fixes here on 2026-08-17: it was a box-shadow, which stacked a second band once the
       base ring became an outline; and it read --color-border-utility-danger, which is red-6,
       a SUBTLE BORDER step measuring 1.40:1 on a sunken surface. */
    .field--error {
      --focus-ring-color: var(--form-error-border-color, #e5484d);
    }

    /* FORCED COLORS. Three of this listbox's states are backgrounds and nothing
       else — :hover, --active (the keyboard cursor) and --selected — so all three
       collapse onto Canvas together and the list reads as inert.

       They are given DIFFERENT channels rather than different colours, because
       the two states can coexist on one row: --selected takes the Highlight fill,
       --active takes an inset outline. An inset outline is used so the cursor
       does not enlarge the row or clip against the panel edge.

       This also repairs a normal-mode bug. '.option--selected' is declared after
       '.option--active' at equal specificity, so today the keyboard cursor simply
       vanishes when it lands on the selected row. Here they compose. */
    @media (forced-colors: active) {
      .option--active {
        outline: 2px solid CanvasText;
        outline-offset: -2px;
      }
      .option--selected {
        background: Highlight;
        color: HighlightText;
      }
      /* The tick declares its own brand colour, which would survive as a
         force-adjusted value and could land on top of the Highlight fill. It
         must follow the row instead. Its opacity 0/1 toggle needs no help —
         opacity is not force-adjusted. */
      .check { color: inherit; }
      .option--disabled { color: GrayText; }
    }
  `]}}customElements.get("esa-select")||customElements.define("esa-select",d);const n=document.getElementById("aa-keyword-field"),s=document.getElementById("aa-vitalsign-select"),b=document.getElementById("aa-vitalsign-options");s&&b?.textContent&&(s.options=JSON.parse(b.textContent));const O=Array.from(document.querySelectorAll("[data-aa-topic]")),g=document.querySelector(".aa-noresults");function h(){const l=String(n?.value??"").trim().toLowerCase(),e=String(s?.value??"");let t=0;for(const i of O){const a=i.dataset.aaTopic??"",w=(i.dataset.aaVitalSigns??"").split(",").filter(Boolean),c=(!l||a.includes(l))&&(!e||w.includes(e));i.hidden=!c,c&&(t+=1)}g&&(g.hidden=t>0)}n?.addEventListener("change",h);s?.addEventListener("change",h);document.addEventListener("esa-filter-clear",()=>{n&&(n.value=""),s&&(s.value=null),h()});
