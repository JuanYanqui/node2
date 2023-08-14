this.workbox=this.workbox||{},this.workbox.expiration=function(t,e,n,s,i){"use strict";function r(){return r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t},r.apply(this,arguments)}const a=(t,e)=>e.some((e=>t instanceof e));let o,c;const u=new WeakMap,h=new WeakMap,f=new WeakMap,l=new WeakMap,d=new WeakMap;let w={get(t,e,n){if(t instanceof IDBTransaction){if("done"===e)return h.get(t);if("objectStoreNames"===e)return t.objectStoreNames||f.get(t);if("store"===e)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return m(t[e])},set:(t,e,n)=>(t[e]=n,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function p(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(c||(c=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(b(this),e),m(u.get(this))}:function(...e){return m(t.apply(b(this),e))}:function(e,...n){const s=t.call(b(this),e,...n);return f.set(s,e.sort?e.sort():[e]),m(s)}}function D(t){return"function"==typeof t?p(t):(t instanceof IDBTransaction&&function(t){if(h.has(t))return;const e=new Promise(((e,n)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",r),t.removeEventListener("abort",r)},i=()=>{e(),s()},r=()=>{n(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",r),t.addEventListener("abort",r)}));h.set(t,e)}(t),a(t,o||(o=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(t,w):t)}function m(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,n)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",r)},i=()=>{e(m(t.result)),s()},r=()=>{n(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",r)}));return e.then((e=>{e instanceof IDBCursor&&u.set(e,t)})).catch((()=>{})),d.set(e,t),e}(t);if(l.has(t))return l.get(t);const e=D(t);return e!==t&&(l.set(t,e),d.set(e,t)),e}const b=t=>d.get(t);const y=["get","getKey","getAll","getAllKeys","count"],I=["put","add","delete","clear"],B=new Map;function g(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(B.get(e))return B.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,i=I.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!i&&!y.includes(n))return;const r=async function(t,...e){const r=this.transaction(t,i?"readwrite":"readonly");let a=r.store;return s&&(a=a.index(e.shift())),(await Promise.all([a[n](...e),i&&r.done]))[0]};return B.set(e,r),r}w=(t=>r({},t,{get:(e,n,s)=>g(e,n)||t.get(e,n,s),has:(e,n)=>!!g(e,n)||t.has(e,n)}))(w);try{self["workbox:expiration:6.5.4"]&&_()}catch(t){}const x="cache-entries",k=t=>{const e=new URL(t,location.href);return e.hash="",e.href};class v{constructor(t){this.t=null,this.M=t}i(t){const e=t.createObjectStore(x,{keyPath:"id"});e.createIndex("cacheName","cacheName",{unique:!1}),e.createIndex("timestamp","timestamp",{unique:!1})}N(t){this.i(t),this.M&&function(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);e&&n.addEventListener("blocked",(()=>e())),m(n).then((()=>{}))}(this.M)}async setTimestamp(t,e){const n={url:t=k(t),timestamp:e,cacheName:this.M,id:this.T(t)},s=(await this.getDb()).transaction(x,"readwrite",{durability:"relaxed"});await s.store.put(n),await s.done}async getTimestamp(t){const e=await this.getDb(),n=await e.get(x,this.T(t));return null==n?void 0:n.timestamp}async expireEntries(t,e){const n=await this.getDb();let s=await n.transaction(x).store.index("timestamp").openCursor(null,"prev");const i=[];let r=0;for(;s;){const n=s.value;n.cacheName===this.M&&(t&&n.timestamp<t||e&&r>=e?i.push(s.value):r++),s=await s.continue()}const a=[];for(const t of i)await n.delete(x,t.id),a.push(t.url);return a}T(t){return this.M+"|"+k(t)}async getDb(){return this.t||(this.t=await function(t,e,{blocked:n,upgrade:s,blocking:i,terminated:r}={}){const a=indexedDB.open(t,e),o=m(a);return s&&a.addEventListener("upgradeneeded",(t=>{s(m(a.result),t.oldVersion,t.newVersion,m(a.transaction))})),n&&a.addEventListener("blocked",(()=>n())),o.then((t=>{r&&t.addEventListener("close",(()=>r())),i&&t.addEventListener("versionchange",(()=>i()))})).catch((()=>{})),o}("workbox-expiration",1,{upgrade:this.N.bind(this)})),this.t}}class M{constructor(t,e={}){this.P=!1,this.W=!1,this.K=e.maxEntries,this.L=e.maxAgeSeconds,this.H=e.matchOptions,this.M=t,this.$=new v(t)}async expireEntries(){if(this.P)return void(this.W=!0);this.P=!0;const t=this.L?Date.now()-1e3*this.L:0,n=await this.$.expireEntries(t,this.K),s=await self.caches.open(this.M);for(const t of n)await s.delete(t,this.H);this.P=!1,this.W&&(this.W=!1,e.dontWaitFor(this.expireEntries()))}async updateTimestamp(t){await this.$.setTimestamp(t,Date.now())}async isURLExpired(t){if(this.L){const e=await this.$.getTimestamp(t),n=Date.now()-1e3*this.L;return void 0===e||e<n}return!1}async delete(){this.W=!1,await this.$.expireEntries(1/0)}}return t.CacheExpiration=M,t.ExpirationPlugin=class{constructor(t={}){this.cachedResponseWillBeUsed=async({event:t,request:n,cacheName:s,cachedResponse:i})=>{if(!i)return null;const r=this.J(i),a=this.V(s);e.dontWaitFor(a.expireEntries());const o=a.updateTimestamp(n.url);if(t)try{t.waitUntil(o)}catch(t){}return r?i:null},this.cacheDidUpdate=async({cacheName:t,request:e})=>{const n=this.V(t);await n.updateTimestamp(e.url),await n.expireEntries()},this.X=t,this.L=t.maxAgeSeconds,this.Y=new Map,t.purgeOnQuotaError&&s.registerQuotaErrorCallback((()=>this.deleteCacheAndMetadata()))}V(t){if(t===n.cacheNames.getRuntimeName())throw new i.WorkboxError("expire-custom-caches-only");let e=this.Y.get(t);return e||(e=new M(t,this.X),this.Y.set(t,e)),e}J(t){if(!this.L)return!0;const e=this.Z(t);if(null===e)return!0;return e>=Date.now()-1e3*this.L}Z(t){if(!t.headers.has("date"))return null;const e=t.headers.get("date"),n=new Date(e).getTime();return isNaN(n)?null:n}async deleteCacheAndMetadata(){for(const[t,e]of this.Y)await self.caches.delete(t),await e.delete();this.Y=new Map}},t}({},workbox.core._private,workbox.core._private,workbox.core,workbox.core._private);
//# sourceMappingURL=workbox-expiration.prod.js.map
