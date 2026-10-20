import{i as P,b as I,t as G,a as Z}from"./typography.C7xuE2z_.js";class $ extends P{constructor(){super(),this.toggle=()=>{this.disabled||(this.checked=!this.checked,this.syncFormValue(),this.dispatchEvent(new CustomEvent("change",{detail:{checked:this.checked},bubbles:!0,composed:!0})))},this.onKeydown=i=>{(i.key===" "||i.key==="Enter")&&(i.preventDefault(),this.toggle())},this.label="",this.size="md",this.disabled=!1,this.labelPosition="after",this.checked=!1,this.internals=this.attachInternals()}static{this.formAssociated=!0}static{this.properties={label:{type:String},size:{type:String,reflect:!0},disabled:{type:Boolean,reflect:!0},name:{type:String,reflect:!0},labelPosition:{type:String,attribute:"label-position",reflect:!0},checked:{type:Boolean,reflect:!0}}}connectedCallback(){super.connectedCallback(),this.syncFormValue()}syncFormValue(){this.internals.setFormValue(this.checked?"on":null),this.internals.ariaChecked=String(this.checked)}render(){const i=this.label?I`<span class="label typography-body-md" part="label">${this.label}</span>`:null;return I`
      <button
        type="button"
        class="root"
        role="switch"
        aria-checked=${this.checked}
        ?disabled=${this.disabled}
        @click=${this.toggle}
        @keydown=${this.onKeydown}
      >
        ${this.labelPosition==="before"?i:null}
        <span class="track" part="track"><span class="thumb" part="thumb"></span></span>
        ${this.labelPosition==="after"?i:null}
      </button>
    `}static{this.styles=[G,Z`
    :host {
      --_track-w: 40px;
      --_track-h: 22px;
      --_thumb: 18px;
      --_bg-off: var(--color-border-default-strong, #bbbbbb);
      --_bg-on: var(--color-background-brand, #46a758);
      --_thumb-color: var(--color-background-elevation-raised, #fcfcfc);
      display: inline-block;
    }
    :host([size='xs']) { --_track-w: 28px; --_track-h: 16px; --_thumb: 12px; }
    :host([size='sm']) { --_track-w: 32px; --_track-h: 18px; --_thumb: 14px; }
    :host([size='lg']) { --_track-w: 48px; --_track-h: 26px; --_thumb: 22px; }
    :host([disabled]) { opacity: 0.5; }

    .root {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-200, 0.5rem);
      padding: 0;
      border: 0;
      background: none;
      font: inherit;
      color: var(--color-content-default, #202020);
      cursor: pointer;
    }
    .root:disabled { cursor: not-allowed; }

    .track {
      position: relative;
      flex: none;
      width: var(--_track-w);
      height: var(--_track-h);
      border-radius: var(--radius-pill, 9999px);
      background: var(--_bg-off);
      transition: background var(--transition-fast, 150ms ease);
    }
    :host([checked]) .track { background: var(--_bg-on); }

    .thumb {
      position: absolute;
      top: 50%;
      left: 2px;
      width: var(--_thumb);
      height: var(--_thumb);
      transform: translateY(-50%);
      border-radius: var(--radius-pill, 9999px);
      background: var(--_thumb-color);
      box-shadow: var(--elevation-1, 0 1px 4px rgba(0, 0, 0, 0.2));
      transition: left var(--transition-fast, 150ms ease);
    }
    :host([checked]) .thumb { left: calc(var(--_track-w) - var(--_thumb) - 2px); }

    .root:focus-visible .track {
      outline: var(--focus-ring-width, 2px) solid var(--focus-ring-color, #3e9b4f);
      outline-offset: var(--focus-ring-offset, 2px);
    }

    /* Type comes from .typography-body-md on the element, leading included — the
       role leads at normal, which is what a one-word label beside a 22px track
       wants. This carried a line-height override back when body-md was relaxed
       (1.8) and the row outgrew the track; the role moved, so the override went. */

    /* FORCED COLORS. The worst case in the kit: on/off is --_bg-on vs --_bg-off
       (both force-adjusted to the same Canvas) and the thumb's ONLY separation
       from the track is its background plus --elevation-1, which is deleted. The
       control becomes an empty pill with an invisible thumb, and the position
       channel is unreadable because the thing being positioned cannot be seen.
       There is no "On"/"Off" text to fall back on — 'label' is the field name and
       is identical in both states.

       Two channels are restored: the thumb FILL (Canvas when off, Highlight when
       on) and its POSITION, which already worked.

       The 'left' re-declaration is not optional. ':host([checked]) .thumb' above
       computes '--_track-w - --_thumb - 2px', which assumes --_track-w is the
       track's padding-box width. Adding a border under box-sizing: border-box
       shrinks that box by 2px while the calc still uses the full value, so the
       checked thumb would overshoot the right edge at every one of the four
       sizes. -4px absorbs it. */
    @media (forced-colors: active) {
      .track {
        box-sizing: border-box;
        border: 1px solid CanvasText;
        background: Canvas;
      }
      :host([checked]) .track { background: Canvas; }
      .thumb {
        box-sizing: border-box;
        border: 1px solid CanvasText;
        background: Canvas;
      }
      :host([checked]) .thumb {
        left: calc(var(--_track-w) - var(--_thumb) - 4px);
        background: Highlight;
      }
      :host([disabled]) .track,
      :host([disabled]) .thumb { border-color: GrayText; }
    }
  `]}}customElements.get("esa-switch-toggle")||customElements.define("esa-switch-toggle",$);const z="story";function O(o){const i=h=>{const s=h.getBoundingClientRect(),u=s.width>1&&s.height>1?{left:s.left,top:s.top,right:s.right,bottom:s.bottom}:null,n=h instanceof SVGElement||u!==null&&getComputedStyle(h).overflow!=="visible",r=[u,...n?[]:Array.from(h.children).map(i)].filter(e=>e!==null);return r.length?{left:Math.min(...r.map(e=>e.left)),top:Math.min(...r.map(e=>e.top)),right:Math.max(...r.map(e=>e.right)),bottom:Math.max(...r.map(e=>e.bottom))}:null},d=new Map;for(const h of Array.from(document.querySelectorAll(`[data-epic-mark="${CSS.escape(o)}"]`))){const s=h.getAttribute("data-epic-mark-label")??"",u=d.get(s);if(u?.rect)continue;const n=i(h);d.set(s,{n:u?.n??d.size+1,label:s,rect:n&&n.right>n.left&&n.bottom>n.top?{x:n.left,y:n.top,w:n.right-n.left,h:n.bottom-n.top}:null})}return[...d.values()]}function H({parts:o,width:i}){const n=(t,a)=>t.x<a.x+a.w&&a.x<t.x+t.w&&t.y<a.y+a.h&&a.y<t.y+t.h,r=[],e=document.createRange(),f=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);for(let t=f.nextNode();t;t=f.nextNode()){const a=t.parentElement;if(!t.textContent?.trim()||!a||a.closest(".epic-outlines"))continue;const p=a.getBoundingClientRect();if(!(p.width<=1||p.height<=1||!a.checkVisibility({opacityProperty:!0,visibilityProperty:!0}))){e.selectNodeContents(t);for(const l of Array.from(e.getClientRects()))l.width&&l.height&&r.push({x:l.left,y:l.top,w:l.width,h:l.height})}}const g=o.map(t=>t.rect?{x:t.rect.x-7,y:t.rect.y-7,w:t.rect.w+14,h:t.rect.h+14}:null),b=[],y=-window.scrollY;return o.map(({rect:t},a)=>{if(!t)return{side:"inside",box:null};const p=[...r,...b,...g.filter((x,c)=>x!==null&&c!==a)],l=[["start",{x:t.x-11-28,y:t.y-7,w:28,h:28}],["end",{x:t.x+t.w+11,y:t.y-7,w:28,h:28}],["above",{x:t.x,y:t.y-11-28,w:28,h:28}],["below",{x:t.x,y:t.y+t.h+11,w:28,h:28}]];for(const[x,c]of l){if(c.x<0||c.x+c.w>i||c.y<y)continue;const E={x:c.x-2,y:c.y-2,w:c.w+4,h:c.h+4};if(!p.some(S=>n(E,S)))return b.push(c),{side:x,box:c}}const k={x:t.x+4,y:t.y+4,w:28,h:28};return b.push(k),{side:"inside",box:k}})}const C="epic-outlines",M=()=>{try{return sessionStorage.getItem(C)==="on"}catch{return!1}},R=o=>{try{o?sessionStorage.setItem(C,"on"):sessionStorage.removeItem(C)}catch{}},D=o=>o instanceof HTMLElement&&(o.isContentEditable||o.matches("input, textarea, select")),N=o=>{const i=new URLSearchParams(location.search),d=Array.from(o.querySelectorAll("[data-epic-stop]")),h=i.get(z),s=d.find(t=>t.dataset.epicStop===h)??d[0];if(!s)return;for(const t of d)t.hidden=t!==s;i.get("bar")==="off"&&(o.hidden=!0);const u=s.dataset.epicStop??"",n=O(u).length;let r=!1,e=null,f=0;const g=()=>{if(f=0,!r||o.hidden){e?.remove(),e=null;return}const t=window.scrollX,a=window.scrollY,p=8,l=document.documentElement.clientWidth,k=[],x=O(u),c=H({parts:x,width:l});for(const[E,{n:S,rect:w}]of x.entries()){if(!w)continue;const _=Math.max(w.x+t,0),A=Math.min(w.x+w.w+t,l),L=_<p||A>l-p,m=document.createElement("div");m.className=L?"epic-outline epic-outline--flush":"epic-outline",m.style.left=`${_}px`,m.style.top=`${w.y+a}px`,m.style.width=`${Math.max(0,A-_)}px`,m.style.height=`${w.h}px`;const v=document.createElement("span");v.className="epic-num typography-label-sm-strong",v.dataset.side=c[E].side,v.textContent=String(S),m.append(v),k.push(m)}e||(e=document.createElement("div"),e.className="epic-outlines",e.setAttribute("aria-hidden","true"),document.body.append(e)),e.replaceChildren(...k)},b=()=>{f||(f=requestAnimationFrame(g))};if(document.addEventListener("keydown",t=>{t.defaultPrevented||t.repeat||t.code!=="KeyH"||!t.altKey||!t.shiftKey||t.ctrlKey||t.metaKey||D(t.composedPath()[0])||(t.preventDefault(),o.hidden=!o.hidden,g())}),!n)return;const y=s.querySelector("[data-epic-outlines]");y&&(r=M(),y.checked=r,y.hidden=!1,y.addEventListener("change",t=>{r=t.detail.checked,R(r),g()}),new ResizeObserver(b).observe(document.documentElement),window.addEventListener("load",b),document.fonts?.ready.then(b),document.addEventListener("scroll",t=>{t.target!==document&&b()},{capture:!0,passive:!0}),g())},T=document.querySelector("[data-epic-bar]");T&&N(T);
