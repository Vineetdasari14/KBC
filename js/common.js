const SUPABASE_CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.116.0/dist/umd/supabase.min.js";
let _sb;
async function getSB(){
  if(_sb) return _sb;
  if(!window.supabase) await loadScript(SUPABASE_CDN);
  _sb = supabase.createClient(KBC_CONFIG.supabaseUrl, KBC_CONFIG.supabaseKey);
  return _sb;
}
function loadScript(src){return new Promise((resolve,reject)=>{const s=document.createElement("script");s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s)})}
function esc(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]))}
function fmtMoney(n){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n||0)}
function qs(s){return document.querySelector(s)}
function qsa(s){return [...document.querySelectorAll(s)]}
function toast(msg, cls="success"){const el=qs("#message");if(el){el.className=cls;el.textContent=msg;setTimeout(()=>{el.textContent=""},3500)}}
function makeId(){return crypto.randomUUID ? crypto.randomUUID() : ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16))}
