"use client";

import { useEffect } from "react";
import { API_URL } from "@/lib/api/client";

type Override = { id:string; path:string; key:string; kind:"text"|"image"; value:string; alt:string };

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
      img.dataset.cmsKey = `image:${index}`;
      img.dataset.cmsKind = "image";
      img.dataset.cmsOriginal = img.getAttribute("src") || "";
    });

    const apply = (item:Override) => {
      const target = surface.querySelector<HTMLElement>(`[data-cms-key="${item.key}"]`);
      if (!target) return;
      target.dataset.cmsOverrideId = item.id;
      if (item.kind === "image" && target instanceof HTMLImageElement) {
        target.src = resolveAsset(item.value);
        target.alt = item.alt || target.alt;
      } else if (item.kind === "text") target.textContent = item.value;
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
      const target = (event.target as Element).closest<HTMLElement>("[data-cms-key]");
      if (!target || !surface.contains(target)) return;
      event.preventDefault(); event.stopPropagation();
      document.querySelectorAll(".cms-selected").forEach(x=>x.classList.remove("cms-selected"));
      target.classList.add("cms-selected");
      const image = target instanceof HTMLImageElement;
      window.parent.postMessage({type:"cms:select",path,key:target.dataset.cmsKey,kind:image?"image":"text",value:image?(target.getAttribute("src")||""):(target.textContent||""),alt:image?target.alt:"",overrideId:target.dataset.cmsOverrideId||""},window.location.origin);
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
