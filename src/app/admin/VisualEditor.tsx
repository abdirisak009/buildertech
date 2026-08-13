"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Eye, EyeOff, Layers, Loader2, Maximize2, Minimize2, Monitor, MousePointer2, RefreshCw, RotateCcw, Smartphone, Upload } from "lucide-react";
import { API_URL, apiRequest } from "@/lib/api/client";

type Selection = { path:string; key:string; kind:"text"|"image"|"background"|"video"|"section"; value:string; alt:string; overrideId:string };
type SavedOverride = Selection & { id:string };
type PageSection = { key:string; label:string; hidden:boolean };
type Media = { id:string; name:string; alt:string; url:string; mimeType:string };

const routes = [
  ["Home",""],["About us","/about"],["How it works","/how-it-works"],["Services","/services"],
  ["Renderings","/services/renderings"],["Architectural plans","/services/architectural-plans"],["Structural plans","/services/structural-plans"],
  ["Civil plans","/services/civil-plans"],["Stop work orders","/services/stop-work-orders"],["Project management","/services/project-management"],["Design & build","/services/construction"],
  ["Products","/products"],["Stock plans","/products/stock-plans"],["Blog","/blog"],["IRC code updates","/blog/irc-code-updates"],["Design trends","/blog/design-trends"],
  ["Article: Latest IRC cycle","/blog/irc-code-updates/what-the-latest-irc-cycle-changes-for-georgia-homes"],["Article: Reading a code comment","/blog/irc-code-updates/reading-a-code-comment-without-panicking"],
  ["Article: Atlanta design trends","/blog/design-trends/what-atlanta-clients-are-asking-for-in-2026"],["Article: Outdoor structures","/blog/design-trends/why-outdoor-structures-are-worth-drawing-properly"],
  ["Careers","/careers"],["Open positions","/careers/open-positions"],["Internships","/careers/internships"],["Contact","/contact"],
  ["FAQ","/faq"],["Resources","/resources"],["Become a partner","/become-a-partner"],["Privacy policy","/privacy-policy"],["Terms of use","/terms-of-use"],
] as const;

const origin = API_URL.replace(/\/api\/v1\/?$/,"");
function assetUrl(url:string){return /^(https?:|data:|blob:)/.test(url)?url:`${origin}${url}`}

export default function VisualEditor({token,flash,focusMode,onFocusMode}:{token:string;flash:(message:string)=>void;focusMode:boolean;onFocusMode:(value:boolean)=>void}) {
  const [locale,setLocale]=useState("en"); const [slug,setSlug]=useState("");
  const [customPath,setCustomPath]=useState(""); const [selection,setSelection]=useState<Selection|null>(null);
  const [value,setValue]=useState(""); const [alt,setAlt]=useState(""); const [saving,setSaving]=useState(false);
  const [ready,setReady]=useState(false); const [mobile,setMobile]=useState(false); const [media,setMedia]=useState<Media[]>([]);
  const [sections,setSections]=useState<PageSection[]>([]); const [busySection,setBusySection]=useState("");
  const iframe=useRef<HTMLIFrameElement>(null);
  const path=useMemo(()=>customPath.trim() || `/${locale}${slug}`,[customPath,locale,slug]);
  const preview=`${path}?cmsEdit=1`;

  useEffect(()=>{apiRequest<Media[]>("/admin/media",{},token).then(setMedia).catch(()=>undefined)},[token]);
  useEffect(()=>{
    const receive=(event:MessageEvent)=>{
      if(event.origin!==window.location.origin)return;
      if(event.data?.type==="cms:ready")setReady(true);
      if(event.data?.type==="cms:sections")setSections(event.data.sections as PageSection[]);
      if(event.data?.type==="cms:select") {const next=event.data as Selection;setSelection(next);setValue(next.value);setAlt(next.alt||"")}
    };
    window.addEventListener("message",receive);return()=>window.removeEventListener("message",receive);
  },[]);

  async function toggleSection(section:PageSection){
    const hidden=!section.hidden;setBusySection(section.key);
    try{
      const item=await apiRequest<SavedOverride>("/admin/overrides",{method:"PUT",body:JSON.stringify({path,key:section.key,kind:"section",value:hidden?"hidden":"visible",alt:""})},token);
      iframe.current?.contentWindow?.postMessage({type:"cms:apply",item},window.location.origin);
      setSections(old=>old.map(x=>x.key===section.key?{...x,hidden}:x));
      flash(hidden?`“${section.label}” is now hidden from the website`:`“${section.label}” is visible again`);
    }catch(error){flash(error instanceof Error?error.message:"Could not update this section")}finally{setBusySection("")}
  }

  async function save(){if(!selection)return;setSaving(true);try{const item=await apiRequest<SavedOverride>("/admin/overrides",{method:"PUT",body:JSON.stringify({path:selection.path,key:selection.key,kind:selection.kind,value,alt})},token);iframe.current?.contentWindow?.postMessage({type:"cms:apply",item},window.location.origin);setSelection({...selection,overrideId:item.id,value,alt});flash("Page content saved and published")}catch(error){flash(error instanceof Error?error.message:"Save failed")}finally{setSaving(false)}}
  async function restore(){if(!selection?.overrideId)return;await apiRequest(`/admin/overrides/${selection.overrideId}`,{method:"DELETE"},token);flash("Original content restored");iframe.current?.contentWindow?.location.reload();setSelection(null)}
  async function upload(event:ChangeEvent<HTMLInputElement>){const file=event.target.files?.[0];if(!file)return;const body=new FormData();body.append("file",file);const item=await apiRequest<Media>("/admin/media",{method:"POST",body},token);setMedia(old=>[item,...old]);setValue(item.url);flash("Image uploaded — click Save changes");event.target.value=""}

  return <div className={`${focusMode?"h-screen":"-m-5 h-[calc(100vh-5rem)] sm:-m-8"} flex flex-col bg-slate-100`}>
    <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
      <div className="flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2 text-sm font-bold text-orange-700"><MousePointer2 className="size-4"/>Visual editor</div>
      <label className="relative"><select value={locale} onChange={e=>{setLocale(e.target.value);setCustomPath("");setSelection(null);setSections([]);setReady(false)}} className="h-10 appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-9 text-sm font-semibold"><option value="en">English</option><option value="es">Español</option></select><ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-slate-400"/></label>
      <label className="relative min-w-52 flex-1 max-w-xs"><select value={slug} onChange={e=>{setSlug(e.target.value);setCustomPath("");setSelection(null);setSections([]);setReady(false)}} className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-9 text-sm font-semibold">{routes.map(([name,url])=><option key={url} value={url}>{name}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-slate-400"/></label>
      <input value={customPath} onChange={e=>{setCustomPath(e.target.value);setSelection(null);setSections([]);setReady(false)}} placeholder="Or enter any page path…" className="hidden h-10 min-w-56 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-orange-400 xl:block"/>
      <div className="ml-auto flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1"><button onClick={()=>setMobile(false)} className={`rounded-lg p-2 ${!mobile?"bg-white shadow-sm":"text-slate-400"}`}><Monitor className="size-4"/></button><button onClick={()=>setMobile(true)} className={`rounded-lg p-2 ${mobile?"bg-white shadow-sm":"text-slate-400"}`}><Smartphone className="size-4"/></button></div>
      <button onClick={()=>iframe.current?.contentWindow?.location.reload()} className="rounded-xl border border-slate-200 bg-white p-2.5 hover:bg-slate-50"><RefreshCw className="size-4"/></button>
      <button onClick={()=>onFocusMode(!focusMode)} className="flex h-10 items-center gap-2 rounded-xl bg-[#071027] px-3 text-xs font-bold text-white hover:bg-slate-800">{focusMode?<><Minimize2 className="size-4"/>Exit focus</>:<><Maximize2 className="size-4"/>Focus mode</>}</button>
    </div>
    <div className="flex min-h-0 flex-1 gap-4 p-4">
      <div className="relative flex min-w-0 flex-1 justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-300/60 shadow-inner">
        {!ready&&<div className="absolute inset-0 z-10 grid place-items-center bg-white/80 backdrop-blur"><div className="text-center"><Loader2 className="mx-auto size-7 animate-spin text-orange-500"/><p className="mt-3 text-sm font-semibold text-slate-600">Loading editable page…</p></div></div>}
        <iframe key={preview} ref={iframe} src={preview} title="Live website editor" className={`h-full bg-white transition-all duration-300 ${mobile?"w-[390px]":"w-full"}`}/>
      </div>
      <aside className="hidden w-[360px] shrink-0 flex-col overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-sm lg:flex">
        {!!sections.length&&<section className="border-b border-slate-100 p-5">
          <div className="flex items-center gap-2"><Layers className="size-4 text-orange-600"/><h3 className="text-sm font-bold">Page sections</h3><span className="ml-auto text-xs font-semibold text-slate-400">{sections.filter(x=>!x.hidden).length}/{sections.length} shown</span></div>
          <p className="mt-1.5 text-xs leading-5 text-slate-500">Switch a section off to remove it from the live website. Nothing is deleted — turn it back on whenever you want.</p>
          <ul className="mt-3 space-y-1.5">{sections.map((section,index)=><li key={section.key}>
            <button onClick={()=>toggleSection(section)} disabled={busySection===section.key} className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition disabled:opacity-60 ${section.hidden?"border-slate-200 bg-slate-50":"border-slate-200 hover:border-orange-300 hover:bg-orange-50/60"}`}>
              <span className={`grid size-7 shrink-0 place-items-center rounded-lg ${section.hidden?"bg-slate-200 text-slate-500":"bg-orange-100 text-orange-600"}`}>{busySection===section.key?<Loader2 className="size-4 animate-spin"/>:section.hidden?<EyeOff className="size-4"/>:<Eye className="size-4"/>}</span>
              <span className={`min-w-0 flex-1 truncate text-sm font-semibold ${section.hidden?"text-slate-400 line-through":"text-slate-700"}`}>{section.label||`Section ${index+1}`}</span>
              <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wider ${section.hidden?"text-slate-400":"text-emerald-600"}`}>{section.hidden?"Hidden":"Live"}</span>
            </button>
          </li>)}</ul>
        </section>}
        {!selection?<div className="grid flex-1 place-items-center p-8 text-center"><div><div className="mx-auto grid size-14 place-items-center rounded-2xl bg-orange-50 text-orange-600"><MousePointer2/></div><h3 className="mt-5 text-lg font-bold">Click anything to edit</h3><p className="mt-2 text-sm leading-6 text-slate-500">Select any highlighted text or image inside the live page. Every page and both languages are editable.</p></div></div>:
        <div><div className="border-b border-slate-100 p-5"><p className="text-xs font-bold uppercase tracking-[.18em] text-orange-600">{selection.kind} block</p><h3 className="mt-1 font-bold">Edit selected content</h3><p className="mt-1 truncate text-xs text-slate-400">{selection.path} · {selection.key}</p></div><div className="space-y-5 p-5">
          {selection.kind==="text"?<label className="block text-sm font-semibold text-slate-700">Text<textarea rows={8} value={value} onChange={e=>setValue(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm leading-6 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"/></label>:<>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100">{selection.kind==="video"?<video src={assetUrl(value)} controls muted className="aspect-video h-full w-full object-cover"/>:<img src={assetUrl(value)} alt={alt} className="aspect-video h-full w-full object-cover"/>}</div>
            <label className="block text-sm font-semibold text-slate-700">{selection.kind==="video"?"Video":"Image"} URL<input value={value} onChange={e=>setValue(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-orange-400"/></label>
            <label className="block text-sm font-semibold text-slate-700">Alternative text<input value={alt} onChange={e=>setAlt(e.target.value)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-orange-400"/></label>
            <label className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-orange-300 bg-orange-50 text-sm font-bold text-orange-700"><Upload className="size-4"/>Upload new {selection.kind==="video"?"video":"image"}<input type="file" accept={selection.kind==="video"?"video/*":"image/*"} className="hidden" onChange={upload}/></label>
            {!!media.length&&<div><p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Media library</p><div className="grid grid-cols-3 gap-2">{media.filter(x=>selection.kind==="video"?x.mimeType.startsWith("video/"):x.mimeType.startsWith("image/")).slice(0,12).map(x=><button key={x.id} onClick={()=>{setValue(x.url);setAlt(x.alt||x.name)}} className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200">{x.mimeType.startsWith("video/")?<video src={assetUrl(x.url)} muted className="h-full w-full object-cover"/>:<img src={assetUrl(x.url)} alt={x.alt||x.name} className="h-full w-full object-cover"/>}<span className="absolute inset-0 hidden place-items-center bg-orange-500/70 text-white group-hover:grid"><Check className="size-5"/></span></button>)}</div></div>}
          </>}
          <button onClick={save} disabled={saving||!value.trim()} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#071027] text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50">{saving?<Loader2 className="size-4 animate-spin"/>:<Check className="size-4"/>}Save changes</button>
          {selection.overrideId&&<button onClick={restore} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50"><RotateCcw className="size-4"/>Restore original</button>}
        </div></div>}
      </aside>
    </div>
  </div>
}
