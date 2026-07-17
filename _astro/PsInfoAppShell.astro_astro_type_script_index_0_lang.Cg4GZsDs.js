import{A as m,E as x,i as k,b as a,a as $}from"./lit-element.DWovE5T-.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const E={CHILD:2},b=r=>(...e)=>({_$litDirective$:r,values:e});class S{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class h extends S{constructor(e){if(super(e),this.it=m,e.type!==E.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===m||e==null)return this._t=void 0,this.it=e;if(e===x)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}h.directiveName="unsafeHTML",h.resultType=1;const v=b(h);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class u extends h{}u.directiveName="unsafeSVG",u.resultType=2;const C=b(u),I=r=>r.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),g=(r,e)=>{const t=I(r);if(!e)return t;const s=e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return t.replace(new RegExp(`(${s})`,"ig"),"<mark>$1</mark>")};class q extends k{constructor(){super(),this.query="",this.activeScope="",this.activeId=null,this.onGlobalKeydown=e=>{this.hotkey==="mod+k"&&(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"?(e.preventDefault(),this.toggle()):this.hotkey==="slash"&&e.key==="/"&&!this.isEditable(e.target)&&(e.preventDefault(),this.show())},this.onSearch=e=>{this.query=e.target.value,this.activeId=null},this.onKeydown=e=>{if(e.key==="Escape"){e.preventDefault(),this.close();return}if(e.key==="Tab"){e.preventDefault(),this.cycleScope(e.shiftKey?-1:1);return}if(e.key==="Enter"&&(e.metaKey||e.ctrlKey)){e.preventDefault(),this.emit("show-all",{query:this.query,scope:this.activeScope}),this.close();return}const t=this.flatItems;if(t.length===0)return;const s=t.findIndex(i=>i.id===this.activeId);switch(e.key){case"ArrowDown":{e.preventDefault();const i=s<t.length-1?s+1:0;this.activeId=t[i].id;break}case"ArrowUp":{e.preventDefault();const i=s>0?s-1:t.length-1;this.activeId=t[i].id;break}case"Enter":{e.preventDefault();const i=t.find(o=>o.id===this.activeId)??(t.length===1?t[0]:null);i&&this.selectEntity(i);break}}},this.entities=[],this.scopes=[],this.recent=[],this.rowActions=[],this.open=!1,this.placeholder="Search…",this.allLabel="All",this.hotkey=""}static{this.properties={entities:{type:Array},scopes:{type:Array},recent:{type:Array},rowActions:{type:Array,attribute:"row-actions"},open:{type:Boolean,reflect:!0},placeholder:{type:String},allLabel:{type:String,attribute:"all-label"},hotkey:{type:String},query:{state:!0},activeScope:{state:!0},activeId:{state:!0}}}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.onGlobalKeydown)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.onGlobalKeydown)}isEditable(e){const t=e;if(!t)return!1;const s=t.tagName;return s==="INPUT"||s==="TEXTAREA"||s==="SELECT"||t.isContentEditable}toggle(){this.open?this.close():this.show()}show(){this.open=!0,this.query="",this.activeScope="",this.activeId=null,requestAnimationFrame(()=>{this.renderRoot.querySelector(".esa-entity-search__input")?.focus()})}close(){this.open=!1}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}get queryMatches(){const e=this.query.toLowerCase().trim();return e?this.entities.filter(t=>`${t.title} ${t.subtitle??""}`.toLowerCase().includes(e)):this.entities}scopeCount(e){return this.queryMatches.filter(t=>t.scope===e).length}get renderGroups(){const e=t=>this.scopes.find(s=>s.id===t);if(this.activeScope){const t=e(this.activeScope),s=this.queryMatches.filter(i=>i.scope===this.activeScope);return t&&s.length?[{scope:t,items:s}]:[]}return this.scopes.map(t=>({scope:t,items:this.queryMatches.filter(s=>s.scope===t.id)})).filter(t=>t.items.length>0)}get showingRecent(){return!this.query.trim()&&!this.activeScope&&this.recent.length>0}get flatItems(){return this.showingRecent?this.recent:this.renderGroups.flatMap(e=>e.items)}setScope(e){this.activeScope=e,this.activeId=null,this.emit("scope-change",{scope:e})}cycleScope(e){const t=["",...this.scopes.map(o=>o.id)],i=(t.indexOf(this.activeScope)+e+t.length)%t.length;this.setScope(t[i])}selectEntity(e){this.emit("select",{entity:e}),this.close()}onRowAction(e,t,s){e.stopPropagation(),this.emit("row-action",{action:t.id,entity:s})}iconFor(e){return e.icon??this.scopes.find(t=>t.id===e.scope)?.icon}renderIcon(e){return e?a`<svg class="esa-entity-search__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${C(e)}</svg>`:null}renderRow(e){const t=this.rowActions.filter(s=>!s.scopes||s.scopes.includes(e.scope));return a`
      <button
        class="esa-entity-search__row ${e.id===this.activeId?"esa-entity-search__row--active":""}"
        role="option"
        aria-selected=${e.id===this.activeId}
        @click=${()=>this.selectEntity(e)}
        @mouseenter=${()=>this.activeId=e.id}
      >
        <span class="esa-entity-search__row-icon">${this.renderIcon(this.iconFor(e))}</span>
        <span class="esa-entity-search__row-text">
          <span class="esa-entity-search__row-title">${v(g(e.title,this.query.trim()))}</span>
          ${e.subtitle?a`<span class="esa-entity-search__row-subtitle">${v(g(e.subtitle,this.query.trim()))}</span>`:null}
        </span>
        ${e.meta?a`<span class="esa-entity-search__row-meta">${e.meta}</span>`:null}
        ${t.length?a`<span class="esa-entity-search__row-actions">
              ${t.map(s=>a`<button
                  class="esa-entity-search__row-action"
                  type="button"
                  title=${s.label}
                  aria-label=${s.label}
                  @click=${i=>this.onRowAction(i,s,e)}
                >
                  ${s.icon?this.renderIcon(s.icon):a`<span>${s.label}</span>`}
                </button>`)}
            </span>`:null}
      </button>
    `}render(){if(!this.open)return a``;const e=this.query.trim(),t=this.renderGroups,s=this.showingRecent,i=this.queryMatches.length;return a`
      <div class="esa-entity-search__backdrop" @click=${this.close}></div>
      <div class="esa-entity-search" role="dialog" aria-label="Search">
        <div class="esa-entity-search__search">
          <svg class="esa-entity-search__search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            class="esa-entity-search__input"
            type="text"
            placeholder=${this.placeholder}
            .value=${this.query}
            @input=${this.onSearch}
            @keydown=${this.onKeydown}
            autocomplete="off"
          />
          <kbd class="esa-entity-search__kbd">ESC</kbd>
        </div>

        ${this.scopes.length?a`<div class="esa-entity-search__scopes" role="tablist">
              <button
                class="esa-entity-search__scope ${this.activeScope===""?"esa-entity-search__scope--active":""}"
                role="tab"
                aria-selected=${this.activeScope===""}
                @click=${()=>this.setScope("")}
              >
                ${this.allLabel}${e?a`<span class="esa-entity-search__scope-count">${i}</span>`:null}
              </button>
              ${this.scopes.map(o=>a`<button
                  class="esa-entity-search__scope ${this.activeScope===o.id?"esa-entity-search__scope--active":""}"
                  role="tab"
                  aria-selected=${this.activeScope===o.id}
                  @click=${()=>this.setScope(o.id)}
                >
                  ${this.renderIcon(o.icon)}${o.label}${e?a`<span class="esa-entity-search__scope-count">${this.scopeCount(o.id)}</span>`:null}
                </button>`)}
            </div>`:null}

        <div class="esa-entity-search__results" role="listbox">
          ${s?a`<div class="esa-entity-search__group">
                <div class="esa-entity-search__group-head"><span>Recent</span></div>
                ${this.recent.map(o=>this.renderRow(o))}
              </div>`:t.length?t.map(o=>a`<div class="esa-entity-search__group">
                    <div class="esa-entity-search__group-head">
                      <span>${o.scope.label}</span>
                      <span class="esa-entity-search__group-count">${o.items.length}</span>
                    </div>
                    ${o.items.map(w=>this.renderRow(w))}
                  </div>`):a`<div class="esa-entity-search__empty">No results${e?a` for “${this.query}”`:null}.</div>`}
        </div>

        <div class="esa-entity-search__footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Select</span>
          ${this.scopes.length?a`<span><kbd>Tab</kbd> Scope</span>`:null}
          <span><kbd>Esc</kbd> Close</span>
        </div>
      </div>
    `}static{this.styles=$`
    :host { display: contents; }

    .esa-entity-search__backdrop {
      position: fixed;
      inset: 0;
      background: var(--color-backdrop, rgba(0, 0, 0, 0.5));
      z-index: var(--z-modal-backdrop, 300);
    }

    .esa-entity-search {
      position: fixed;
      top: 12%;
      left: 50%;
      transform: translateX(-50%);
      width: var(--entity-search-width, 600px);
      max-width: calc(100vw - 2rem);
      max-height: var(--entity-search-max-height, 70vh);
      background: var(--entity-search-bg, var(--color-surface-elevated, #ffffff));
      border: 1px solid var(--entity-search-border-color, var(--color-border, #dcdcdc));
      border-radius: var(--entity-search-radius, var(--radius-400, 0.75rem));
      box-shadow: var(--entity-search-shadow, 0 20px 60px rgba(0, 0, 0, 0.2));
      z-index: var(--z-modal, 400);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      font-family: var(--font-sans, sans-serif);
      animation: esa-entity-enter 150ms ease-out;
    }
    @keyframes esa-entity-enter {
      from { opacity: 0; transform: translateX(-50%) scale(0.96); }
      to { opacity: 1; transform: translateX(-50%) scale(1); }
    }

    .esa-entity-search__search {
      display: flex;
      align-items: center;
      gap: var(--spacing-300, 0.75rem);
      padding: var(--spacing-300, 0.75rem) var(--spacing-400, 1rem);
      border-bottom: 1px solid var(--color-border-light, #efefef);
    }
    .esa-entity-search__search-icon { color: var(--color-text-muted, #7c7c7c); flex-shrink: 0; }
    .esa-entity-search__input {
      flex: 1;
      border: none;
      outline: none;
      font-size: var(--type-size-300, 1.0625rem);
      color: var(--color-text-primary, #171717);
      background: transparent;
      font-family: inherit;
    }
    .esa-entity-search__input::placeholder { color: var(--color-text-muted, #7c7c7c); }
    .esa-entity-search__kbd, .esa-entity-search__footer kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 19px;
      height: 19px;
      padding: 0 5px;
      font-family: inherit;
      font-size: 11px;
      font-weight: var(--font-weight-medium, 500);
      color: var(--color-text-muted, #7c7c7c);
      background: var(--color-surface, #fff);
      border: 1px solid var(--color-border, #dcdcdc);
      border-bottom-width: 2px;
      border-radius: 4px;
    }

    .esa-entity-search__scopes {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-150, 0.375rem);
      padding: var(--spacing-200, 0.5rem) var(--spacing-400, 1rem);
      border-bottom: 1px solid var(--color-border-light, #efefef);
    }
    .esa-entity-search__scope {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-100, 0.25rem);
      padding: 4px var(--spacing-250, 0.625rem);
      border: 1px solid var(--color-border, #dcdcdc);
      border-radius: var(--radius-full, 9999px);
      background: var(--color-surface, #fff);
      color: var(--color-text-secondary, #525252);
      font: inherit;
      font-size: var(--type-size-100, 0.875rem);
      cursor: pointer;
      transition: background 80ms ease, border-color 80ms ease, color 80ms ease;
    }
    .esa-entity-search__scope:hover { border-color: var(--color-primary-border, #c6dcf1); color: var(--color-text-primary, #171717); }
    .esa-entity-search__scope--active {
      background: var(--color-primary, #1e5386);
      border-color: var(--color-primary, #1e5386);
      color: var(--color-primary-contrast, #fff);
    }
    .esa-entity-search__scope-count {
      font-size: 11px;
      font-variant-numeric: tabular-nums;
      opacity: 0.8;
    }
    .esa-entity-search__scope .esa-entity-search__icon { width: 15px; height: 15px; }

    .esa-entity-search__results { overflow-y: auto; padding: var(--spacing-200, 0.5rem); flex: 1; }
    .esa-entity-search__group + .esa-entity-search__group { margin-top: var(--spacing-200, 0.5rem); }
    .esa-entity-search__group-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-200, 0.5rem) var(--spacing-200, 0.5rem) var(--spacing-100, 0.25rem);
      font-size: var(--type-size-100, 0.8125rem);
      font-weight: var(--font-weight-semibold, 600);
      text-transform: uppercase;
      letter-spacing: 0.03em;
      color: var(--color-text-muted, #7c7c7c);
    }
    .esa-entity-search__group-count { font-variant-numeric: tabular-nums; }

    .esa-entity-search__row {
      display: flex;
      align-items: center;
      gap: var(--spacing-300, 0.75rem);
      width: 100%;
      padding: var(--spacing-200, 0.5rem) var(--spacing-300, 0.75rem);
      border: none;
      border-radius: var(--radius-200, 0.5rem);
      background: transparent;
      color: var(--color-text-primary, #171717);
      font-family: inherit;
      cursor: pointer;
      text-align: left;
      transition: background 80ms ease;
    }
    .esa-entity-search__row--active { background: var(--entity-search-row-bg-active, var(--color-surface-sunken, #f3f7fc)); }
    .esa-entity-search__row-icon { flex-shrink: 0; display: inline-flex; color: var(--color-text-muted, #7c7c7c); }
    .esa-entity-search__row--active .esa-entity-search__row-icon { color: var(--color-primary, #1e5386); }
    .esa-entity-search__row-text { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .esa-entity-search__row-title {
      font-size: var(--type-size-200, 0.9375rem);
      font-weight: var(--font-weight-medium, 500);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .esa-entity-search__row-subtitle {
      font-size: var(--type-size-100, 0.8125rem);
      color: var(--color-text-muted, #7c7c7c);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .esa-entity-search__row-title mark, .esa-entity-search__row-subtitle mark {
      background: color-mix(in srgb, var(--color-primary, #1e5386) 18%, transparent);
      color: inherit;
      border-radius: 2px;
    }
    .esa-entity-search__row-meta { flex-shrink: 0; font-size: var(--type-size-100, 0.8125rem); color: var(--color-text-muted, #7c7c7c); font-variant-numeric: tabular-nums; }
    .esa-entity-search__row-actions { flex-shrink: 0; display: inline-flex; gap: var(--spacing-100, 0.25rem); opacity: 0; }
    .esa-entity-search__row:hover .esa-entity-search__row-actions,
    .esa-entity-search__row--active .esa-entity-search__row-actions { opacity: 1; }
    .esa-entity-search__row-action {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 8px;
      border: 1px solid var(--color-border, #dcdcdc);
      border-radius: var(--radius-full, 9999px);
      background: var(--color-surface, #fff);
      color: var(--color-text-secondary, #525252);
      font: inherit; font-size: 12px; cursor: pointer;
    }
    .esa-entity-search__row-action:hover { border-color: var(--color-primary, #1e5386); color: var(--color-primary, #1e5386); }

    .esa-entity-search__empty {
      padding: var(--spacing-700, 3rem) var(--spacing-600, 2rem);
      text-align: center;
      color: var(--color-text-muted, #7c7c7c);
      font-size: var(--type-size-200, 0.9375rem);
    }

    .esa-entity-search__footer {
      display: flex;
      gap: var(--spacing-400, 1rem);
      padding: var(--spacing-250, 0.625rem) var(--spacing-400, 1rem);
      border-top: 1px solid var(--color-border-light, #efefef);
      font-size: var(--type-size-100, 0.8125rem);
      color: var(--color-text-muted, #7c7c7c);
    }
    .esa-entity-search__footer span { display: inline-flex; align-items: center; gap: 4px; }
  `}}customElements.get("esa-entity-search")||customElements.define("esa-entity-search",q);const y=document.getElementById("rail"),p=()=>!!y?.classList.contains("rail--collapsed");let d=null;const f=()=>{d&&(clearTimeout(d),d=null)},l=()=>document.querySelectorAll(".flyout--open").forEach(r=>r.classList.remove("flyout--open")),A=()=>{f(),d=window.setTimeout(l,150)};document.querySelectorAll(".navsec").forEach(r=>{const e=r.querySelector(".navsec__head"),t=r.querySelector(".flyout");if(!e||!t)return;const s=()=>{f(),l(),t.classList.add("flyout--open");const i=e.getBoundingClientRect().top;t.style.top=`${Math.min(i,window.innerHeight-t.offsetHeight-8)}px`};e.addEventListener("mouseenter",()=>{p()&&s()}),e.addEventListener("click",()=>{if(p()){t.classList.contains("flyout--open")?l():s();return}const i=r.classList.toggle("navsec--collapsed");e.setAttribute("aria-expanded",String(!i))}),r.addEventListener("mouseleave",()=>{p()&&A()}),t.addEventListener("mouseenter",f)});document.addEventListener("keydown",r=>{r.key==="Escape"&&l()});const n=document.getElementById("sidebar-toggle");n&&y&&n.addEventListener("click",()=>{const r=y.classList.toggle("rail--collapsed");l(),n.classList.toggle("icon-toggle--collapsed",r),n.setAttribute("aria-expanded",String(!r)),n.setAttribute("aria-label",r?"Expand sidebar":"Collapse sidebar")});const c=document.getElementById("omnibox"),_=document.getElementById("omnibox-data"),L=document.getElementById("omnibox-trigger");if(c&&_){const r=JSON.parse(_.textContent||"{}");c.entities=r.entities||[],c.scopes=r.scopes||[],c.addEventListener("select",e=>{const t=e.detail?.entity?.url;t&&t!=="#"&&(window.location.href=t)})}L?.addEventListener("click",()=>c?.show?.());
