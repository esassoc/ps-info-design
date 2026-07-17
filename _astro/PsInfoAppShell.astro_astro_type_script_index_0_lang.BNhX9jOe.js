/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=globalThis,W=L.ShadowRoot&&(L.ShadyCSS===void 0||L.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol(),Z=new WeakMap;let de=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==G)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(W&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=Z.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Z.set(t,e))}return e}toString(){return this.cssText}};const $e=r=>new de(typeof r=="string"?r:r+"",void 0,G),ge=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new de(t,r,G)},ve=(r,e)=>{if(W)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),i=L.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=t.cssText,r.appendChild(s)}},Q=W?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return $e(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:be,defineProperty:we,getOwnPropertyDescriptor:Ae,getOwnPropertyNames:xe,getOwnPropertySymbols:Ee,getPrototypeOf:Se}=Object,O=globalThis,Y=O.trustedTypes,ke=Y?Y.emptyScript:"",Ce=O.reactiveElementPolyfillSupport,S=(r,e)=>r,B={toAttribute(r,e){switch(e){case Boolean:r=r?ke:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},pe=(r,e)=>!be(r,e),ee={attribute:!0,type:String,converter:B,reflect:!1,useDefault:!1,hasChanged:pe};Symbol.metadata??=Symbol("metadata"),O.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ee){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);i!==void 0&&we(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:o}=Ae(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get:i,set(n){const h=i?.call(this);o?.call(this,n),this.requestUpdate(e,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ee}static _$Ei(){if(this.hasOwnProperty(S("elementProperties")))return;const e=Se(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(S("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(S("properties"))){const t=this.properties,s=[...xe(t),...Ee(t)];for(const i of s)this.createProperty(i,t[i])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,i]of t)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const i of s)t.unshift(Q(i))}else e!==void 0&&t.push(Q(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ve(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(i!==void 0&&s.reflect===!0){const o=(s.converter?.toAttribute!==void 0?s.converter:B).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const o=s.getPropertyOptions(i),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:B;this._$Em=i;const h=n.fromAttribute(t,o.type);this[i]=h??this._$Ej?.get(i)??h,this._$Em=null}}requestUpdate(e,t,s,i=!1,o){if(e!==void 0){const n=this.constructor;if(i===!1&&(o=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??pe)(o,t)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),o!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,o]of s){const{wrapped:n}=o,h=this[i];n!==!0||this._$AL.has(i)||h===void 0||this.C(i,void 0,o,h)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[S("elementProperties")]=new Map,b[S("finalized")]=new Map,Ce?.({ReactiveElement:b}),(O.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const F=globalThis,te=r=>r,N=F.trustedTypes,se=N?N.createPolicy("lit-html",{createHTML:r=>r}):void 0,ue="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,fe="?"+y,Pe=`<${fe}>`,g=document,C=()=>g.createComment(""),P=r=>r===null||typeof r!="object"&&typeof r!="function",X=Array.isArray,Te=r=>X(r)||typeof r?.[Symbol.iterator]=="function",q=`[ 	
\f\r]`,A=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ie=/-->/g,re=/>/g,m=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),oe=/'/g,ne=/"/g,_e=/^(?:script|style|textarea|title)$/i,Ue=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),p=Ue(1),v=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),ae=new WeakMap,$=g.createTreeWalker(g,129);function ye(r,e){if(!X(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return se!==void 0?se.createHTML(e):e}const Re=(r,e)=>{const t=r.length-1,s=[];let i,o=e===2?"<svg>":e===3?"<math>":"",n=A;for(let h=0;h<t;h++){const a=r[h];let d,u,c=-1,f=0;for(;f<a.length&&(n.lastIndex=f,u=n.exec(a),u!==null);)f=n.lastIndex,n===A?u[1]==="!--"?n=ie:u[1]!==void 0?n=re:u[2]!==void 0?(_e.test(u[2])&&(i=RegExp("</"+u[2],"g")),n=m):u[3]!==void 0&&(n=m):n===m?u[0]===">"?(n=i??A,c=-1):u[1]===void 0?c=-2:(c=n.lastIndex-u[2].length,d=u[1],n=u[3]===void 0?m:u[3]==='"'?ne:oe):n===ne||n===oe?n=m:n===ie||n===re?n=A:(n=m,i=void 0);const _=n===m&&r[h+1].startsWith("/>")?" ":"";o+=n===A?a+Pe:c>=0?(s.push(d),a.slice(0,c)+ue+a.slice(c)+y+_):a+y+(c===-2?h:_)}return[ye(r,o+(r[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};class T{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let o=0,n=0;const h=e.length-1,a=this.parts,[d,u]=Re(e,t);if(this.el=T.createElement(d,s),$.currentNode=this.el.content,t===2||t===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=$.nextNode())!==null&&a.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(const c of i.getAttributeNames())if(c.endsWith(ue)){const f=u[n++],_=i.getAttribute(c).split(y),M=/([.?@])?(.*)/.exec(f);a.push({type:1,index:o,name:M[2],strings:_,ctor:M[1]==="."?Le:M[1]==="?"?He:M[1]==="@"?Ne:z}),i.removeAttribute(c)}else c.startsWith(y)&&(a.push({type:6,index:o}),i.removeAttribute(c));if(_e.test(i.tagName)){const c=i.textContent.split(y),f=c.length-1;if(f>0){i.textContent=N?N.emptyScript:"";for(let _=0;_<f;_++)i.append(c[_],C()),$.nextNode(),a.push({type:2,index:++o});i.append(c[f],C())}}}else if(i.nodeType===8)if(i.data===fe)a.push({type:2,index:o});else{let c=-1;for(;(c=i.data.indexOf(y,c+1))!==-1;)a.push({type:7,index:o}),c+=y.length-1}o++}}static createElement(e,t){const s=g.createElement("template");return s.innerHTML=e,s}}function w(r,e,t=r,s){if(e===v)return e;let i=s!==void 0?t._$Co?.[s]:t._$Cl;const o=P(e)?void 0:e._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,t,s)),s!==void 0?(t._$Co??=[])[s]=i:t._$Cl=i),i!==void 0&&(e=w(r,i._$AS(r,e.values),i,s)),e}class Me{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??g).importNode(t,!0);$.currentNode=i;let o=$.nextNode(),n=0,h=0,a=s[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new R(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new Ie(o,this,e)),this._$AV.push(d),a=s[++h]}n!==a?.index&&(o=$.nextNode(),n++)}return $.currentNode=g,i}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class R{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=w(this,e,t),P(e)?e===l||e==null||e===""?(this._$AH!==l&&this._$AR(),this._$AH=l):e!==this._$AH&&e!==v&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Te(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==l&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(g.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=T.createElement(ye(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const o=new Me(i,this),n=o.u(this.options);o.p(t),this.T(n),this._$AH=o}}_$AC(e){let t=ae.get(e.strings);return t===void 0&&ae.set(e.strings,t=new T(e)),t}k(e){X(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const o of e)i===t.length?t.push(s=new R(this.O(C()),this.O(C()),this,this.options)):s=t[i],s._$AI(o),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const s=te(e).nextSibling;te(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class z{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,o){this.type=1,this._$AH=l,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=l}_$AI(e,t=this,s,i){const o=this.strings;let n=!1;if(o===void 0)e=w(this,e,t,0),n=!P(e)||e!==this._$AH&&e!==v,n&&(this._$AH=e);else{const h=e;let a,d;for(e=o[0],a=0;a<o.length-1;a++)d=w(this,h[s+a],t,a),d===v&&(d=this._$AH[a]),n||=!P(d)||d!==this._$AH[a],d===l?e=l:e!==l&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!i&&this.j(e)}j(e){e===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Le extends z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===l?void 0:e}}class He extends z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==l)}}class Ne extends z{constructor(e,t,s,i,o){super(e,t,s,i,o),this.type=5}_$AI(e,t=this){if((e=w(this,e,t,0)??l)===v)return;const s=this._$AH,i=e===l&&s!==l||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==l&&(s===l||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Ie{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){w(this,e)}}const Oe=F.litHtmlPolyfillSupport;Oe?.(T,R),(F.litHtmlVersions??=[]).push("3.3.3");const ze=(r,e,t)=>{const s=t?.renderBefore??e;let i=s._$litPart$;if(i===void 0){const o=t?.renderBefore??null;s._$litPart$=i=new R(e.insertBefore(C(),o),o,void 0,t??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const J=globalThis;let k=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ze(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return v}};k._$litElement$=!0,k.finalized=!0,J.litElementHydrateSupport?.({LitElement:k});const qe=J.litElementPolyfillSupport;qe?.({LitElement:k});(J.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const De={CHILD:2},me=r=>(...e)=>({_$litDirective$:r,values:e});class Be{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class I extends Be{constructor(e){if(super(e),this.it=l,e.type!==De.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===l||e==null)return this._t=void 0,this.it=e;if(e===v)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}I.directiveName="unsafeHTML",I.resultType=1;const ce=me(I);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class j extends I{}j.directiveName="unsafeSVG",j.resultType=2;const je=me(j),Ke=r=>r.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),le=(r,e)=>{const t=Ke(r);if(!e)return t;const s=e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");return t.replace(new RegExp(`(${s})`,"ig"),"<mark>$1</mark>")};class Ve extends k{constructor(){super(),this.query="",this.activeScope="",this.activeId=null,this.onGlobalKeydown=e=>{this.hotkey==="mod+k"&&(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"?(e.preventDefault(),this.toggle()):this.hotkey==="slash"&&e.key==="/"&&!this.isEditable(e.target)&&(e.preventDefault(),this.show())},this.onSearch=e=>{this.query=e.target.value,this.activeId=null},this.onKeydown=e=>{if(e.key==="Escape"){e.preventDefault(),this.close();return}if(e.key==="Tab"){e.preventDefault(),this.cycleScope(e.shiftKey?-1:1);return}if(e.key==="Enter"&&(e.metaKey||e.ctrlKey)){e.preventDefault(),this.emit("show-all",{query:this.query,scope:this.activeScope}),this.close();return}const t=this.flatItems;if(t.length===0)return;const s=t.findIndex(i=>i.id===this.activeId);switch(e.key){case"ArrowDown":{e.preventDefault();const i=s<t.length-1?s+1:0;this.activeId=t[i].id;break}case"ArrowUp":{e.preventDefault();const i=s>0?s-1:t.length-1;this.activeId=t[i].id;break}case"Enter":{e.preventDefault();const i=t.find(o=>o.id===this.activeId)??(t.length===1?t[0]:null);i&&this.selectEntity(i);break}}},this.entities=[],this.scopes=[],this.recent=[],this.rowActions=[],this.open=!1,this.placeholder="Search…",this.allLabel="All",this.hotkey=""}static{this.properties={entities:{type:Array},scopes:{type:Array},recent:{type:Array},rowActions:{type:Array,attribute:"row-actions"},open:{type:Boolean,reflect:!0},placeholder:{type:String},allLabel:{type:String,attribute:"all-label"},hotkey:{type:String},query:{state:!0},activeScope:{state:!0},activeId:{state:!0}}}connectedCallback(){super.connectedCallback(),document.addEventListener("keydown",this.onGlobalKeydown)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.onGlobalKeydown)}isEditable(e){const t=e;if(!t)return!1;const s=t.tagName;return s==="INPUT"||s==="TEXTAREA"||s==="SELECT"||t.isContentEditable}toggle(){this.open?this.close():this.show()}show(){this.open=!0,this.query="",this.activeScope="",this.activeId=null,requestAnimationFrame(()=>{this.renderRoot.querySelector(".esa-entity-search__input")?.focus()})}close(){this.open=!1}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}get queryMatches(){const e=this.query.toLowerCase().trim();return e?this.entities.filter(t=>`${t.title} ${t.subtitle??""}`.toLowerCase().includes(e)):this.entities}scopeCount(e){return this.queryMatches.filter(t=>t.scope===e).length}get renderGroups(){const e=t=>this.scopes.find(s=>s.id===t);if(this.activeScope){const t=e(this.activeScope),s=this.queryMatches.filter(i=>i.scope===this.activeScope);return t&&s.length?[{scope:t,items:s}]:[]}return this.scopes.map(t=>({scope:t,items:this.queryMatches.filter(s=>s.scope===t.id)})).filter(t=>t.items.length>0)}get showingRecent(){return!this.query.trim()&&!this.activeScope&&this.recent.length>0}get flatItems(){return this.showingRecent?this.recent:this.renderGroups.flatMap(e=>e.items)}setScope(e){this.activeScope=e,this.activeId=null,this.emit("scope-change",{scope:e})}cycleScope(e){const t=["",...this.scopes.map(o=>o.id)],i=(t.indexOf(this.activeScope)+e+t.length)%t.length;this.setScope(t[i])}selectEntity(e){this.emit("select",{entity:e}),this.close()}onRowAction(e,t,s){e.stopPropagation(),this.emit("row-action",{action:t.id,entity:s})}iconFor(e){return e.icon??this.scopes.find(t=>t.id===e.scope)?.icon}renderIcon(e){return e?p`<svg class="esa-entity-search__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${je(e)}</svg>`:null}renderRow(e){const t=this.rowActions.filter(s=>!s.scopes||s.scopes.includes(e.scope));return p`
      <button
        class="esa-entity-search__row ${e.id===this.activeId?"esa-entity-search__row--active":""}"
        role="option"
        aria-selected=${e.id===this.activeId}
        @click=${()=>this.selectEntity(e)}
        @mouseenter=${()=>this.activeId=e.id}
      >
        <span class="esa-entity-search__row-icon">${this.renderIcon(this.iconFor(e))}</span>
        <span class="esa-entity-search__row-text">
          <span class="esa-entity-search__row-title">${ce(le(e.title,this.query.trim()))}</span>
          ${e.subtitle?p`<span class="esa-entity-search__row-subtitle">${ce(le(e.subtitle,this.query.trim()))}</span>`:null}
        </span>
        ${e.meta?p`<span class="esa-entity-search__row-meta">${e.meta}</span>`:null}
        ${t.length?p`<span class="esa-entity-search__row-actions">
              ${t.map(s=>p`<button
                  class="esa-entity-search__row-action"
                  type="button"
                  title=${s.label}
                  aria-label=${s.label}
                  @click=${i=>this.onRowAction(i,s,e)}
                >
                  ${s.icon?this.renderIcon(s.icon):p`<span>${s.label}</span>`}
                </button>`)}
            </span>`:null}
      </button>
    `}render(){if(!this.open)return p``;const e=this.query.trim(),t=this.renderGroups,s=this.showingRecent,i=this.queryMatches.length;return p`
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

        ${this.scopes.length?p`<div class="esa-entity-search__scopes" role="tablist">
              <button
                class="esa-entity-search__scope ${this.activeScope===""?"esa-entity-search__scope--active":""}"
                role="tab"
                aria-selected=${this.activeScope===""}
                @click=${()=>this.setScope("")}
              >
                ${this.allLabel}${e?p`<span class="esa-entity-search__scope-count">${i}</span>`:null}
              </button>
              ${this.scopes.map(o=>p`<button
                  class="esa-entity-search__scope ${this.activeScope===o.id?"esa-entity-search__scope--active":""}"
                  role="tab"
                  aria-selected=${this.activeScope===o.id}
                  @click=${()=>this.setScope(o.id)}
                >
                  ${this.renderIcon(o.icon)}${o.label}${e?p`<span class="esa-entity-search__scope-count">${this.scopeCount(o.id)}</span>`:null}
                </button>`)}
            </div>`:null}

        <div class="esa-entity-search__results" role="listbox">
          ${s?p`<div class="esa-entity-search__group">
                <div class="esa-entity-search__group-head"><span>Recent</span></div>
                ${this.recent.map(o=>this.renderRow(o))}
              </div>`:t.length?t.map(o=>p`<div class="esa-entity-search__group">
                    <div class="esa-entity-search__group-head">
                      <span>${o.scope.label}</span>
                      <span class="esa-entity-search__group-count">${o.items.length}</span>
                    </div>
                    ${o.items.map(n=>this.renderRow(n))}
                  </div>`):p`<div class="esa-entity-search__empty">No results${e?p` for “${this.query}”`:null}.</div>`}
        </div>

        <div class="esa-entity-search__footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Select</span>
          ${this.scopes.length?p`<span><kbd>Tab</kbd> Scope</span>`:null}
          <span><kbd>Esc</kbd> Close</span>
        </div>
      </div>
    `}static{this.styles=ge`
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
  `}}customElements.get("esa-entity-search")||customElements.define("esa-entity-search",Ve);const K=document.getElementById("rail"),D=()=>!!K?.classList.contains("rail--collapsed");let H=null;const V=()=>{H&&(clearTimeout(H),H=null)},U=()=>document.querySelectorAll(".flyout--open").forEach(r=>r.classList.remove("flyout--open")),We=()=>{V(),H=window.setTimeout(U,150)};document.querySelectorAll(".navsec").forEach(r=>{const e=r.querySelector(".navsec__head"),t=r.querySelector(".flyout");if(!e||!t)return;const s=()=>{V(),U(),t.classList.add("flyout--open");const i=e.getBoundingClientRect().top;t.style.top=`${Math.min(i,window.innerHeight-t.offsetHeight-8)}px`};e.addEventListener("mouseenter",()=>{D()&&s()}),e.addEventListener("click",()=>{if(D()){t.classList.contains("flyout--open")?U():s();return}const i=r.classList.toggle("navsec--collapsed");e.setAttribute("aria-expanded",String(!i))}),r.addEventListener("mouseleave",()=>{D()&&We()}),t.addEventListener("mouseenter",V)});document.addEventListener("keydown",r=>{r.key==="Escape"&&U()});const x=document.getElementById("sidebar-toggle");x&&K&&x.addEventListener("click",()=>{const r=K.classList.toggle("rail--collapsed");U(),x.classList.toggle("icon-toggle--collapsed",r),x.setAttribute("aria-expanded",String(!r)),x.setAttribute("aria-label",r?"Expand sidebar":"Collapse sidebar")});const E=document.getElementById("omnibox"),he=document.getElementById("omnibox-data"),Ge=document.getElementById("omnibox-trigger");if(E&&he){const r=JSON.parse(he.textContent||"{}");E.entities=r.entities||[],E.scopes=r.scopes||[],E.addEventListener("select",e=>{const t=e.detail?.entity?.url;t&&t!=="#"&&(window.location.href=t)})}Ge?.addEventListener("click",()=>E?.show?.());
