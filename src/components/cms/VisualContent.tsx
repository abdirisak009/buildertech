"use client";

import { useEffect } from "react";
import { API_URL } from "@/lib/api/client";

type MediaKind = "image"|"background"|"video";
type Override = { id:string; path:string; key:string; kind:"text"|MediaKind|"section"; value:string; alt:string };
type SectionInfo = { key:string; label:string; hidden:boolean };

const apiOrigin = API_URL.replace(/\/api\/v1\/?$/, "");
const blockedTags = new Set(["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","INPUT","SELECT","OPTION","SVG","PATH"]);

function editableTextNodes(root: Element) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || blockedTags.has(parent.tagName) || parent.closest("[data-cms-ignore],[data-cms-key]")) return NodeFilter.FILTER_REJECT;
      return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  return nodes;
}

/**
 * Every top-level band of a page gets a stable `section:<n>` key so an editor
 * can switch it off without touching the code. Nested sections and the blocks
 * rendered from the content studio are skipped — they are managed elsewhere.
 */
function indexSections(root: Element) {
  const sections = Array.from(root.querySelectorAll<HTMLElement>("section,[data-cms-section]"))
    .filter(element => !element.closest("[data-cms-ignore]"))
    .filter(element => !element.parentElement?.closest("section"));
  sections.forEach((element,index) => {
    element.dataset.cmsSection = `section:${index}`;
    element.dataset.cmsSectionLabel = sectionLabel(element,index);
  });
  return sections;
}

function sectionLabel(element: HTMLElement, index: number) {
  const heading = element.querySelector("h1,h2,h3")?.textContent?.trim();
  const fallback = element.id ? element.id.replace(/[-_]/g," ") : "";
  const label = heading || fallback || element.textContent?.trim().slice(0,60) || "";
  return label ? label.slice(0,60) : `Section ${index+1}`;
}

function sectionList(root: Element): SectionInfo[] {
  const pageMode=document.getElementById("cms-coming-soon");
  return [{key:"page:coming-soon",label:"Coming soon page mode",hidden:pageMode?.dataset.enabled!=="true"},...Array.from(root.querySelectorAll<HTMLElement>("[data-cms-section]")).map(element => ({
    key: element.dataset.cmsSection || "",
    label: element.dataset.cmsSectionLabel || "",
    hidden: element.dataset.cmsHidden === "true",
  }))];
}

function resolveAsset(value:string) {
  if (!value || /^(https?:|data:|blob:)/.test(value)) return value;
  return value.startsWith("/storage/") || value.startsWith("/uploads/") ? `${apiOrigin}${value}` : value;
}
function backgroundUrl(value:string){return value.match(/url\(["']?(.*?)["']?\)/)?.[1]||""}
function meta(value:string){try{return JSON.parse(value) as {alt?:string;fontSize?:number;width?:number;speed?:number}}catch{return {alt:value}}}

export function VisualContent() {
  useEffect(() => {
    const surface = document.querySelector("[data-cms-surface]");
    if (!surface) return;
    const path = window.location.pathname.replace(/\/$/, "") || "/";
    const editMode = new URLSearchParams(window.location.search).get("cmsEdit") === "1";
    indexSections(surface);
    const textNodes = editableTextNodes(surface);

    textNodes.forEach((node,index) => {
      const span = document.createElement("span");
      span.dataset.cmsKey = `text:${index}`;
      span.dataset.cmsKind = "text";
      span.dataset.cmsOriginal = node.textContent || "";
      node.parentNode?.replaceChild(span,node);
      span.appendChild(node);
    });
    Array.from(surface.querySelectorAll<HTMLImageElement>("img")).forEach((img,index) => {
      const key=`image:${index}`;
      img.dataset.cmsKey = key;
      img.dataset.cmsKind = "image";
      img.dataset.cmsOriginal = img.getAttribute("src") || "";
      img.dataset.cmsCurrent = img.dataset.cmsOriginal;
      if(getComputedStyle(img).pointerEvents==="none"&&img.parentElement){img.parentElement.dataset.cmsKey=key;img.parentElement.dataset.cmsKind="image";img.parentElement.dataset.cmsCurrent=img.dataset.cmsOriginal}
    });
    Array.from(surface.querySelectorAll<HTMLVideoElement>("video")).forEach((video,index)=>{
      video.dataset.cmsKey=`video:${index}`;video.dataset.cmsKind="video";video.dataset.cmsOriginal=video.currentSrc||video.getAttribute("src")||video.querySelector("source")?.getAttribute("src")||"";video.dataset.cmsCurrent=video.dataset.cmsOriginal;
      if(video.parentElement){video.parentElement.dataset.cmsKey=video.dataset.cmsKey;video.parentElement.dataset.cmsKind="video";video.parentElement.dataset.cmsCurrent=video.dataset.cmsOriginal}
    });
    let backgroundIndex=0;
    Array.from(surface.querySelectorAll<HTMLElement>("*")).forEach(element=>{
      if(element.dataset.cmsKey||element.closest("[data-cms-ignore]"))return;
      const url=backgroundUrl(getComputedStyle(element).backgroundImage);
      if(!url)return;
      element.dataset.cmsKey=`background:${backgroundIndex++}`;element.dataset.cmsKind="background";element.dataset.cmsOriginal=url;element.dataset.cmsCurrent=url;
    });

    const publishSections = () => {
      window.parent.postMessage({type:"cms:sections",path,sections:sectionList(surface)},window.location.origin);
    };

    const applyVisibility = (target:HTMLElement, hidden:boolean) => {
      target.dataset.cmsHidden = hidden ? "true" : "false";
      // While editing, hidden bands stay on screen (dimmed) so they can be
      // switched back on; visitors never render them at all.
      target.style.display = hidden && !editMode ? "none" : "";
    };

    const apply = (item:Override) => {
      if (item.kind === "section") {
        if(item.key==="page:coming-soon"){
          let mode=document.getElementById("cms-coming-soon") as HTMLElement|null;
          if(!mode){mode=document.createElement("section");mode.id="cms-coming-soon";mode.className="relative grid min-h-[65vh] place-items-center bg-navy-950 px-6 py-24 text-center text-white";mode.innerHTML='<div><p class="text-xs font-bold uppercase tracking-[.24em] text-gold-500">Under construction</p><h1 class="mt-5 text-5xl font-bold">Coming soon.</h1><p class="mx-auto mt-5 max-w-xl text-lg text-navy-100">We are preparing a new experience for this page. Check back soon.</p></div>';surface.prepend(mode)}
          const enabled=item.value==="visible";mode.dataset.enabled=enabled?"true":"false";mode.style.display=enabled?"grid":"none";Array.from(surface.children).forEach(child=>{if(child!==mode)(child as HTMLElement).style.display=enabled?"none":""});return;
        }
        const section = surface.querySelector<HTMLElement>(`[data-cms-section="${item.key}"]`);
        if (section) {
          section.dataset.cmsOverrideId = item.id;
          applyVisibility(section, item.value === "hidden");
        }
        return;
      }
      const targets = surface.querySelectorAll<HTMLElement>(`[data-cms-key="${item.key}"]`);
      targets.forEach(target=>{
        target.dataset.cmsOverrideId=item.id;target.dataset.cmsCurrent=item.value;
        const settings=meta(item.alt||"");
        if(settings.fontSize)target.style.fontSize=`${settings.fontSize}px`;
        if(settings.width)target.style.width=`${settings.width}%`;
        if(settings.speed){target.dataset.cmsSpeed=String(settings.speed);document.dispatchEvent(new CustomEvent("cms:animation-speed",{detail:{key:item.key,speed:settings.speed}}))}
        if(item.kind==="image"){
          const image=target instanceof HTMLImageElement?target:target.querySelector<HTMLImageElement>("img");
          if(image){image.src=resolveAsset(item.value);image.removeAttribute("srcset");image.alt=settings.alt||image.alt;image.dataset.cmsCurrent=item.value;if(settings.width)image.style.width=`${settings.width}%`}
        }else if(item.kind==="background")target.style.backgroundImage=`url("${resolveAsset(item.value)}")`;
        else if(item.kind==="video"){
          const video=target instanceof HTMLVideoElement?target:target.querySelector<HTMLVideoElement>("video");
          if(video){video.src=resolveAsset(item.value);video.querySelectorAll("source").forEach(source=>source.remove());video.load();video.dataset.cmsCurrent=item.value}
        }else if(target.dataset.cmsAnimated){target.dataset.cmsCurrent=item.value;document.dispatchEvent(new CustomEvent("cms:animated-text",{detail:{key:item.key,value:item.value}}))}else target.textContent=item.value;
      });
    };

    // Animated components (TypeText, FlowCycle, Counter) keep their own state
    // and update themselves from the `cms:animated-text` / `cms:animation-speed`
    // events dispatched in `apply`, so no DOM-forcing observer is needed here.
    // A previous MutationObserver rewrote textContent on every mutation, which
    // fought the typewriter's per-character updates and froze the animation.
    fetch(`${API_URL}/overrides?path=${encodeURIComponent(path)}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(body => (body.data as Override[]).forEach(apply))
      .catch(() => undefined)
      .finally(() => {
        if (!editMode) return;
        window.parent.postMessage({type:"cms:ready",path},window.location.origin);
        publishSections();
      });

    if (!editMode) return;
    document.documentElement.classList.add("cms-editing");
    const click = (rawEvent:Event) => {
      const event = rawEvent as MouseEvent;
      let target = (event.target as Element).closest<HTMLElement>("[data-cms-key]");
      if(!target){const clickable=(event.target as Element).closest<HTMLElement>("a,button");target=clickable?.querySelector<HTMLElement>("[data-cms-key]")||null}
      if (!target || !surface.contains(target)){if((event.target as Element).closest("a,button,form")){event.preventDefault();event.stopPropagation()}return}
      event.preventDefault(); event.stopPropagation();event.stopImmediatePropagation();
      document.querySelectorAll(".cms-selected").forEach(x=>x.classList.remove("cms-selected"));
      target.classList.add("cms-selected");
      const kind=(target.dataset.cmsKind||"text") as Override["kind"];
      const image=target instanceof HTMLImageElement?target:target.querySelector<HTMLImageElement>("img");
      const textValue = target.dataset.cmsAnimated ? (target.dataset.cmsCurrent||target.dataset.cmsOriginal||target.textContent||"") : (target.textContent||"");
      window.parent.postMessage({type:"cms:select",path,key:target.dataset.cmsKey,kind,value:kind==="text"?textValue:(target.dataset.cmsCurrent||target.dataset.cmsOriginal||""),alt:image?.alt||"",fontSize:parseFloat(getComputedStyle(target).fontSize)||16,width:parseFloat(target.style.width)||100,speed:Number(target.dataset.cmsSpeed||1),animated:!!target.dataset.cmsAnimated,overrideId:target.dataset.cmsOverrideId||""},window.location.origin);
    };
    const message = (event:MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== "cms:apply") return;
      const item = event.data.item as Override;
      apply(item);
      if (item.kind === "section") publishSections();
    };
    surface.addEventListener("click",click,true);
    window.addEventListener("message",message);
    return () => { surface.removeEventListener("click",click,true); window.removeEventListener("message",message); document.documentElement.classList.remove("cms-editing"); };
  },[]);
  return null;
}
