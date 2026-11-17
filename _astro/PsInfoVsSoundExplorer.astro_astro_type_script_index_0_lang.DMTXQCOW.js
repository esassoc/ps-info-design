import{i as k,b as u,t as E,a as S}from"./typography.C7xuE2z_.js";import{a as $}from"./a11y.c6v_nqwk.js";import{o as T}from"./unsafe-svg.IcsAgwTv.js";const L={xs:"label-2xs",sm:"label-xs",md:"label-md",lg:"label-lg"},q={xs:"microcopy-2xs",sm:"microcopy-xs",md:"microcopy-md",lg:"microcopy-lg"},A={xs:"microcopy-2xs-strong",sm:"microcopy-xs-strong",md:"microcopy-md-strong",lg:"microcopy-lg-strong"};class z extends k{constructor(){super(),this.onKeydown=t=>{if(this.disabled)return;const r=this.options;if(r.length===0)return;const n=this.selectedIndex>=0?this.selectedIndex:0;let i;switch(t.key){case"ArrowRight":case"ArrowDown":i=(n+1)%r.length;break;case"ArrowLeft":case"ArrowUp":i=(n-1+r.length)%r.length;break;case"Home":i=0;break;case"End":i=r.length-1;break;case"Enter":case" ":t.preventDefault(),this.select(r[n]);return;default:return}t.preventDefault(),this.select(r[i]),this.focusButton(i)},this.label="",this.helpText="",this.errorText="",this.options=[],this.value="",this.size="md",this.disabled=!1,this.required=!1,this.internals=this.attachInternals()}static{this.formAssociated=!0}static{this.properties={label:{type:String},helpText:{type:String,attribute:"help-text"},errorText:{type:String,attribute:"error-text"},options:{type:Array},value:{type:String},size:{type:String,reflect:!0},name:{type:String,reflect:!0},disabled:{type:Boolean,reflect:!0},required:{type:Boolean}}}get resolvedHelpText(){return this.helpText}connectedCallback(){super.connectedCallback(),this.syncFormValue()}willUpdate(t){(t.has("value")||t.has("options"))&&this.syncFormValue()}updated(){this.syncValidity()}syncValidity(){if(!this.required||this.value){this.internals.setValidity({});return}const t=this.renderRoot?.querySelector(".option")??void 0;this.internals.setValidity({valueMissing:!0},this.label?`Select ${this.label}.`:"Select an option.",t)}get selectedIndex(){return this.options.findIndex(t=>t.value===this.value)}get focusIndex(){const t=this.selectedIndex;return t>=0?t:0}syncFormValue(){this.internals.setFormValue(this.value||null)}select(t){this.disabled||t.value===this.value||(this.value=t.value,this.syncFormValue(),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0})))}focusButton(t){this.renderRoot.querySelectorAll(".option")[t]?.focus()}render(){const t=!!this.label,r=!!this.errorText,n=this.resolvedHelpText,i=r?"error":n?"help":null;return u`
      ${t?u`<span class="label typography-${L[this.size]}" id="label">
            ${this.label}${this.required?u`<span class="required" aria-hidden="true">*</span>`:null}
          </span>`:null}
      <div
        class="group ${r?"group--error":""}"
        role="radiogroup"
        aria-labelledby=${t?"label":null}
        aria-required=${this.required?"true":null}
        aria-invalid=${r?"true":null}
        aria-describedby=${i}
        @keydown=${this.onKeydown}
      >
        ${this.options.map((a,p)=>{const c=p===this.selectedIndex;return u`<button
            type="button"
            role="radio"
            class="option ${c?"option--selected":""} typography-${c?A[this.size]:q[this.size]}"
            aria-checked=${c}
            aria-label=${a.ariaLabel??(a.label?null:a.value)}
            tabindex=${p===this.focusIndex?0:-1}
            ?disabled=${this.disabled}
            @click=${()=>this.select(a)}
          >
            ${a.icon?u`<svg
                  class="option__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  ${T(a.icon)}
                </svg>`:null}
            ${a.label?u`<span class="option__label">${a.label}</span>`:null}
          </button>`})}
      </div>
      ${r?u`<span class="error typography-body-sm" id="error">${this.errorText}</span>`:n?u`<span class="help typography-body-sm" id="help">${n}</span>`:null}
    `}static{this.styles=[E,$,S`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-100, 4px);
      --_pad-y: var(--spacing-300, 0.75rem);
      --_padding-x: var(--spacing-300, 0.75rem);
      --_radius: var(--radius-md, 0.5rem);
      --_border-width: var(--form-border-width, 1px);
      --_border-color: var(--form-border-color, #cecece);
      --_icon-size: 18px;
    }
    :host([size='xs']) {
      --_pad-y: var(--spacing-200, 0.5rem);
      --_padding-x: var(--spacing-200, 0.5rem);
      --_radius: var(--radius-sm, 0.25rem);
      --_icon-size: 14px;
    }
    :host([size='sm']) {
      --_pad-y: var(--spacing-250, 0.625rem);
      --_padding-x: var(--spacing-250, 0.625rem);
      --_radius: var(--radius-sm, 0.25rem);
      --_icon-size: 16px;
    }
    :host([size='lg']) {
      --_pad-y: var(--spacing-400, 1rem);
      --_padding-x: var(--spacing-400, 1rem);
      --_radius: var(--radius-md, 0.5rem);
      --_icon-size: 20px;
    }

    .label {
      color: var(--form-label-color, #646464);
    }
    .required {
      color: var(--color-content-utility-danger, #ce2c31);
      margin-left: 2px;
    }

    /* Segmented-pill track: a sunken rail with a small inset; the selected
       segment floats as a raised white chip. (Replaces the older connected-button
       model — softer, and what the Beacon tracker mockups settled on.) */
    .group {
      display: inline-flex;
      width: fit-content;
      max-width: 100%;
      gap: 2px;
      padding: 2px;
      background: var(--color-background-elevation-sunken, #f0f0f0);
      border: var(--_border-width) solid var(--_border-color);
      border-radius: var(--_radius);
    }
    /* An invalid group reddens the option borders AND the focus ring. The ring is a token
       re-point, not an outline-color override, so all N options follow with one declaration —
       the house mechanism for the error ring as of 2026-08-17 (see esa-text-field). Until
       then this rule moved the border and left the ring brand-coloured. */
    .group--error {
      --_border-color: var(--form-error-border-color, #e5484d);
      --focus-ring-color: var(--form-error-border-color, #e5484d);
    }

    .option {
      appearance: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-150, 6px);
      /* Was calc(height - 4px) to compensate for the track's 2px padding. With no
         height token the segment is its own text plus padding, and the track wraps
         it — the compensation has nothing left to compensate for. */
      padding: var(--_pad-y) var(--_padding-x);
      color: var(--color-content-default-secondary, #646464);
      background: transparent;
      border: 0;
      border-radius: calc(var(--_radius) - 2px);
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
      transition:
        background-color var(--transition-fast, 150ms ease),
        color var(--transition-fast, 150ms ease),
        box-shadow var(--transition-fast, 150ms ease);
    }

    .option__icon {
      width: var(--_icon-size);
      height: var(--_icon-size);
      flex-shrink: 0;
    }

    .option:hover:not(:disabled):not(.option--selected) {
      color: var(--color-content-default, #202020);
      background: var(--color-background-overlay-hover, rgba(0, 0, 0, 0.04));
    }

    .option:focus-visible {
      outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
      outline-offset: var(--focus-ring-offset, 2px);
      position: relative;
      z-index: 1;
    }

    .option--selected {
      background: var(--color-background-elevation-raised, #fcfcfc);
      color: var(--color-content-brand, #2a7e3b);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
    }

    .option:disabled {
      cursor: not-allowed;
      color: var(--color-content-disabled, #8d8d8d);
      background: transparent;
    }
    .option--selected:disabled {
      background: var(--color-background-elevation-raised, #fcfcfc);
      color: var(--color-content-disabled, #8d8d8d);
    }

    .help {
      color: var(--form-help-color, #838383);
    }
    .error {
      color: var(--form-error-color, var(--color-content-utility-danger, #ce2c31));
    }

    /* FORCED COLORS. The .group track keeps its real border, so the frame
       survives; what disappears is the SELECTED segment, whose whole treatment is
       a background, a colour and a 1px shadow.

       Highlight/HighlightText rather than a border, deliberately. '.option' is
       intrinsically sized inside a fit-content flex row, so a border on
       --selected alone would make that one segment 2px larger and shove its
       siblings sideways on every selection change; reserving the border on the
       base .option instead would outline all of them. A fill changes no boxes.

       The type role already swaps to OPTION_SELECTED_TYPE (a weight change, which
       survives force-adjustment), so this is the second channel, not the only. */
    @media (forced-colors: active) {
      .option--selected {
        background: Highlight;
        color: HighlightText;
      }
      .option:disabled { color: GrayText; }
      .option--selected:disabled {
        background: GrayText;
        color: Canvas;
      }
    }
  `]}}customElements.get("esa-button-toggle")||customElements.define("esa-button-toggle",z);document.querySelectorAll("[data-vss-explorer]").forEach(s=>{const t=[...s.querySelectorAll(".vm")],r=[...s.querySelectorAll(".vm__label")];t.forEach((e,l)=>{const d=()=>r[l].classList.add("is-on"),o=()=>r[l].classList.remove("is-on");e.addEventListener("pointerenter",d),e.addEventListener("pointerleave",o),e.addEventListener("focus",()=>{e.matches(":focus-visible")&&d()}),e.addEventListener("blur",o)});const n=s.querySelector("[data-vss-live]"),i=[...s.querySelectorAll("[data-vss-goal-btn]")];let a=null;const p=e=>{if(a=e,i.forEach(o=>o.setAttribute("aria-pressed",String(o===e))),t.forEach(o=>o.classList.toggle("is-muted",!!e&&o.dataset.vssGoal!==e.dataset.vssGoalBtn)),!n)return;const l=t.filter(o=>o.dataset.vssPin===s.dataset.view&&!o.classList.contains("is-muted")).length,d=s.dataset.view==="indicators"?"indicators":"Vital Signs";n.textContent=e?`${l} ${d}: ${e.querySelector(".vss__btn-name").textContent}`:`Showing all ${d}`};i.forEach(e=>e.addEventListener("click",()=>p(a===e?null:e)));const c=s.querySelector("[data-vss-view]");c&&(c.options=[{label:"Goals",value:"goals"},{label:"Indicators",value:"indicators"}],c.addEventListener("change",()=>{s.dataset.view=c.value,r.forEach(e=>e.classList.remove("is-on")),p(a),x()}));const m=s.querySelector("[data-vss-pause]"),g=m?.matches("button")?m:m?.querySelector("button");g?.addEventListener("click",()=>{const e=s.classList.toggle("is-paused"),l=g.querySelector(".esa-button__label")??g;l.textContent=e?"Play":"Pause",g.setAttribute("aria-label",e?"Play the map animation":"Pause the map animation")}),g?.setAttribute("aria-label","Pause the map animation");const f=()=>s.style.setProperty("--vss-sbw",`${window.innerWidth-document.documentElement.clientWidth}px`);f(),window.addEventListener("resize",f),document.addEventListener("keydown",e=>{e.key==="Escape"&&r.forEach(l=>l.classList.remove("is-on"))});const y=s.querySelector(".vss__art").viewBox.baseVal.width,x=()=>{r.forEach((e,l)=>{const d=t[l];if(d.dataset.vssPin!==s.dataset.view)return;const o=e.querySelector(".vm__text"),w=e.querySelector(".vm__sub"),v=e.querySelector(".vm__plaque"),h=Math.max(o.getComputedTextLength(),w?.getComputedTextLength()??0,96)+20;v.setAttribute("x",String(-h/2)),v.setAttribute("y","-20"),v.setAttribute("width",String(h)),v.setAttribute("height",w?"38":"34");const b=Number((d.querySelector("g").getAttribute("transform")??"").match(/translate\(([-\d.]+)/)?.[1]??0),_=b-h/2<6?6-(b-h/2):b+h/2>y-6?y-6-(b+h/2):0;e.setAttribute("transform",`translate(${_} ${e.dataset.dy})`)})};(document.fonts?.ready??Promise.resolve()).then(x)});
