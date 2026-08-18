"use client";

import { useEffect } from "react";
import { API_URL } from "@/lib/api/client";

type Settings = Record<string,string>;
const apiOrigin = API_URL.replace(/\/api\/v1\/?$/,"");
function asset(value:string){return /^(https?:|data:|blob:)/.test(value)?value:`${apiOrigin}${value}`}

export function GlobalSettings(){
  useEffect(()=>{
    fetch(`${API_URL}/settings/public`).then(r=>r.ok?r.json():Promise.reject()).then(body=>{
      const values=body.data as Settings;
      const root=document.documentElement;
      if(values.brand_primary)root.style.setProperty("--color-navy-700",values.brand_primary);
      if(values.brand_accent){root.style.setProperty("--color-gold-500",values.brand_accent);root.style.setProperty("--color-orange-500",values.brand_accent)}
      if(values.brand_dark){root.style.setProperty("--color-navy-950",values.brand_dark);root.style.setProperty("--color-navy-900",values.brand_dark)}
      if(values.logo_url)document.querySelectorAll<HTMLImageElement>('img[alt*="Builders" i],img[alt*="logo" i]').forEach(img=>{img.src=asset(values.logo_url);img.removeAttribute("srcset")});
      if(values.logo_size)root.style.setProperty("--cms-logo-scale",String(Math.max(.4,Math.min(2,Number(values.logo_size)/100))));
      if(values.hero_logo_x!==undefined)root.style.setProperty("--hero-logo-x",`${Number(values.hero_logo_x)||0}px`);
      if(values.hero_logo_y!==undefined)root.style.setProperty("--hero-logo-y",`${Number(values.hero_logo_y)||0}px`);
      if(values.hero_logo_size)root.style.setProperty("--hero-logo-size",String(Math.max(.3,Math.min(3,(Number(values.hero_logo_size)||100)/100))));
      if(values.contact_phone)document.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]').forEach(link=>{link.href=`tel:${values.contact_phone.replace(/[^+\d]/g,"")}`;const text=link.textContent?.trim()||"";if(/[\d() +-]{7,}/.test(text))link.textContent=values.contact_phone});
      if(values.contact_email)document.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]').forEach(link=>{link.href=`mailto:${values.contact_email}`;link.textContent=values.contact_email});
      if(values.office_address)document.querySelectorAll<HTMLAnchorElement>('a[href*="maps" i]').forEach(link=>{if(link.textContent?.trim())link.textContent=values.office_address});
      const socials:{key:string;match:string}[]=[{key:"facebook_url",match:"facebook"},{key:"instagram_url",match:"instagram"},{key:"linkedin_url",match:"linkedin"},{key:"youtube_url",match:"youtube"},{key:"x_url",match:"twitter"}];
      socials.forEach(({key,match})=>{if(!values[key])return;document.querySelectorAll<HTMLAnchorElement>(`a[aria-label*="${match}" i],a[title*="${match}" i]`).forEach(link=>link.href=values[key])});
    }).catch(()=>undefined);
  },[]);
  return null;
}
