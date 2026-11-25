import{i as $,b as d,t as L,a as T}from"./typography.C7xuE2z_.js";import{a as q}from"./a11y.c6v_nqwk.js";import{o as A}from"./unsafe-svg.IcsAgwTv.js";const z={xs:"label-2xs",sm:"label-xs",md:"label-md",lg:"label-lg"},P={xs:"microcopy-2xs",sm:"microcopy-xs",md:"microcopy-md",lg:"microcopy-lg"},B={xs:"microcopy-2xs-strong",sm:"microcopy-xs-strong",md:"microcopy-md-strong",lg:"microcopy-lg-strong"};class C extends ${constructor(){super(),this.onKeydown=t=>{if(this.disabled)return;const r=this.options;if(r.length===0)return;const l=this.selectedIndex>=0?this.selectedIndex:0;let i;switch(t.key){case"ArrowRight":case"ArrowDown":i=(l+1)%r.length;break;case"ArrowLeft":case"ArrowUp":i=(l-1+r.length)%r.length;break;case"Home":i=0;break;case"End":i=r.length-1;break;case"Enter":case" ":t.preventDefault(),this.select(r[l]);return;default:return}t.preventDefault(),this.select(r[i]),this.focusButton(i)},this.label="",this.helpText="",this.errorText="",this.options=[],this.value="",this.size="md",this.disabled=!1,this.required=!1,this.internals=this.attachInternals()}static{this.formAssociated=!0}static{this.properties={label:{type:String},helpText:{type:String,attribute:"help-text"},errorText:{type:String,attribute:"error-text"},options:{type:Array},value:{type:String},size:{type:String,reflect:!0},name:{type:String,reflect:!0},disabled:{type:Boolean,reflect:!0},required:{type:Boolean}}}get resolvedHelpText(){return this.helpText}connectedCallback(){super.connectedCallback(),this.syncFormValue()}willUpdate(t){(t.has("value")||t.has("options"))&&this.syncFormValue()}updated(){this.syncValidity()}syncValidity(){if(!this.required||this.value){this.internals.setValidity({});return}const t=this.renderRoot?.querySelector(".option")??void 0;this.internals.setValidity({valueMissing:!0},this.label?`Select ${this.label}.`:"Select an option.",t)}get selectedIndex(){return this.options.findIndex(t=>t.value===this.value)}get focusIndex(){const t=this.selectedIndex;return t>=0?t:0}syncFormValue(){this.internals.setFormValue(this.value||null)}select(t){this.disabled||t.value===this.value||(this.value=t.value,this.syncFormValue(),this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value},bubbles:!0,composed:!0})))}focusButton(t){this.renderRoot.querySelectorAll(".option")[t]?.focus()}render(){const t=!!this.label,r=!!this.errorText,l=this.resolvedHelpText,i=r?"error":l?"help":null;return d`
      ${t?d`<span class="label typography-${z[this.size]}" id="label">
            ${this.label}${this.required?d`<span class="required" aria-hidden="true">*</span>`:null}
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
        ${this.options.map((n,u)=>{const h=u===this.selectedIndex;return d`<button
            type="button"
            role="radio"
            class="option ${h?"option--selected":""} typography-${h?B[this.size]:P[this.size]}"
            aria-checked=${h}
            aria-label=${n.ariaLabel??(n.label?null:n.value)}
            tabindex=${u===this.focusIndex?0:-1}
            ?disabled=${this.disabled}
            @click=${()=>this.select(n)}
          >
            ${n.icon?d`<svg
                  class="option__icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  ${A(n.icon)}
                </svg>`:null}
            ${n.label?d`<span class="option__label">${n.label}</span>`:null}
          </button>`})}
      </div>
      ${r?d`<span class="error typography-body-sm" id="error">${this.errorText}</span>`:l?d`<span class="help typography-body-sm" id="help">${l}</span>`:null}
    `}static{this.styles=[L,q,T`
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
  `]}}customElements.get("esa-button-toggle")||customElements.define("esa-button-toggle",C);document.querySelectorAll("[data-vss-explorer]").forEach(s=>{const t=[...s.querySelectorAll(".vm")],r=[...s.querySelectorAll(".vm__label")],l=[...s.querySelectorAll(".vh")];t.forEach((e,a)=>{const c=()=>r[a].classList.add("is-on"),o=()=>r[a].classList.remove("is-on");e.addEventListener("pointerenter",c),e.addEventListener("pointerleave",o),l[a]?.addEventListener("pointerenter",()=>{e.classList.add("is-hover"),c()}),l[a]?.addEventListener("pointerleave",()=>{e.classList.remove("is-hover"),o()}),e.addEventListener("focus",()=>{e.matches(":focus-visible")&&c()}),e.addEventListener("blur",o)});const i=s.querySelector("[data-vss-live]"),n=[...s.querySelectorAll("[data-vss-goal-btn]")];let u=null;const h=e=>{if(u=e,n.forEach(o=>o.setAttribute("aria-pressed",String(o===e))),t.forEach(o=>o.classList.toggle("is-muted",!!e&&o.dataset.vssGoal!==e.dataset.vssGoalBtn)),!i)return;const a=t.filter(o=>o.dataset.vssPin===s.dataset.view&&!o.classList.contains("is-muted")).length,c=s.dataset.view==="indicators"?"indicators":"Vital Signs";i.textContent=e?`${a} ${c}: ${e.querySelector(".vss__btn-name").textContent}`:`Showing all ${c}`};n.forEach(e=>e.addEventListener("click",()=>h(u===e?null:e)));const g=s.querySelector("[data-vss-view]");g&&(g.options=[{label:"Goals",value:"goals"},{label:"Indicators",value:"indicators"}],g.addEventListener("change",()=>{s.dataset.view=g.value,r.forEach(e=>e.classList.remove("is-on")),h(u),k()}));const f=s.querySelector("[data-vss-pause]"),v=f?.matches("button")?f:f?.querySelector("button");v?.addEventListener("click",()=>{const e=s.classList.toggle("is-paused"),a=v.querySelector(".esa-button__label")??v;a.textContent=e?"Play":"Pause",v.setAttribute("aria-label",e?"Play the map animation":"Pause the map animation")}),v?.setAttribute("aria-label","Pause the map animation");const x=()=>s.style.setProperty("--vss-sbw",`${window.innerWidth-document.documentElement.clientWidth}px`);x(),window.addEventListener("resize",x);const y=s.querySelector(".vss__art"),w=()=>{const e=y.getBoundingClientRect().width;e>0&&s.style.setProperty("--vss-k",String(y.viewBox.baseVal.width/e))};w(),new ResizeObserver(w).observe(y),document.addEventListener("keydown",e=>{e.key==="Escape"&&r.forEach(a=>a.classList.remove("is-on"))});const _=s.querySelector(".vss__art").viewBox.baseVal.width,k=()=>{r.forEach((e,a)=>{const c=t[a];if(c.dataset.vssPin!==s.dataset.view)return;const o=e.querySelector(".vm__text"),E=e.querySelector(".vm__sub"),b=e.querySelector(".vm__plaque"),p=Math.max(o.getComputedTextLength(),E?.getComputedTextLength()??0,96)+20;b.setAttribute("x",String(-p/2)),b.setAttribute("y","-20"),b.setAttribute("width",String(p)),b.setAttribute("height",E?"38":"34");const m=Number((c.querySelector("g").getAttribute("transform")??"").match(/translate\(([-\d.]+)/)?.[1]??0),S=m-p/2<6?6-(m-p/2):m+p/2>_-6?_-6-(m+p/2):0;e.setAttribute("transform",`translate(${S} ${e.dataset.dy})`)})};(document.fonts?.ready??Promise.resolve()).then(k)});
