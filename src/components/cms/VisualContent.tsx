"use client";

import { useEffect } from "react";
import { API_URL } from "@/lib/api/client";

type MediaKind = "image"|"background"|"video";
type Override = { id:string; path:string; key:string; kind:"text"|MediaKind; value:string; alt:string };

const apiOrigin = API_URL.replace(/\/api\/v1\/?$/, "");
const blockedTags = new Set(["SCRIPT","STYLE","NOSCRIPT","TEXTAREA","INPUT","SELECT","OPTION","SVG","PATH"]);

function editableTextNodes(root: Element) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || blockedTags.has(parent.tagName) || parent.closest("[data-cms-ignore]")) return NodeFilter.FILTER_REJECT;
      return node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  return nodes;
}

function resolveAsset(value:string) {
  if (!value || /^(https?:|data:|blob:)/.test(value)) return value;
  return value.startsWith("/storage/") || value.startsWith("/uploads/") ? `${apiOrigin}${value}` : value;
}
function backgroundUrl(value:string){return value.match(/url\(["']?(.*?)["']?\)/)?.[1]||""}

export function VisualContent() {
  useEffect(() => {
    const surface = document.querySelector("[data-cms-surface]");
    if (!surface) return;
    const path = window.location.pathname.replace(/\/$/, "") || "/";
    const editMode = new URLSearchParams(window.location.search).get("cmsEdit") === "1";
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

    const apply = (item:Override) => {
      const targets = surface.querySelectorAll<HTMLElement>(`[data-cms-key="${item.key}"]`);
      targets.forEach(target=>{
        target.dataset.cmsOverrideId=item.id;target.dataset.cmsCurrent=item.value;
        if(item.kind==="image"){
          const image=target instanceof HTMLImageElement?target:target.querySelector<HTMLImageElement>("img");
          if(image){image.src=resolveAsset(item.value);image.removeAttribute("srcset");image.alt=item.alt||image.alt;image.dataset.cmsCurrent=item.value}
        }else if(item.kind==="background")target.style.backgroundImage=`url("${resolveAsset(item.value)}")`;
        else if(item.kind==="video"){
          const video=target instanceof HTMLVideoElement?target:target.querySelector<HTMLVideoElement>("video");
          if(video){video.src=resolveAsset(item.value);video.querySelectorAll("source").forEach(source=>source.remove());video.load();video.dataset.cmsCurrent=item.value}
        }else target.textContent=item.value;
      });
    };

    fetch(`${API_URL}/overrides?path=${encodeURIComponent(path)}`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(body => (body.data as Override[]).forEach(apply))
      .catch(() => undefined)
      .finally(() => {
        if (editMode) window.parent.postMessage({type:"cms:ready",path},window.location.origin);
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
      window.parent.postMessage({type:"cms:select",path,key:target.dataset.cmsKey,kind,value:kind==="text"?(target.textContent||""):(target.dataset.cmsCurrent||target.dataset.cmsOriginal||""),alt:image?.alt||"",overrideId:target.dataset.cmsOverrideId||""},window.location.origin);
    };
    const message = (event:MessageEvent) => {
      if (event.origin !== window.location.origin || event.data?.type !== "cms:apply") return;
      apply(event.data.item as Override);
    };
    surface.addEventListener("click",click,true);
    window.addEventListener("message",message);
    return () => { surface.removeEventListener("click",click,true); window.removeEventListener("message",message); document.documentElement.classList.remove("cms-editing"); };
  },[]);
  return null;
}
