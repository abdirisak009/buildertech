"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { API_URL } from "@/lib/api/client";
import { usePathname } from "next/navigation";

type Item={id:string;locale:string;title:string;type:"logo"|"project"|"section";data:string};
type Data={image?:string;website?:string;description?:string;location?:string;category?:string;path?:string;eyebrow?:string;body?:string;layout?:string;ctaLabel?:string;ctaUrl?:string};
const origin=API_URL.replace(/\/api\/v1\/?$/,"");
const asset=(url:string)=>/^(https?:|data:|blob:)/.test(url)?url:`${origin}${url}`;

export function DynamicContent({locale}:{locale:string}){
  const [items,setItems]=useState<Item[]>([]);
  const pathname=usePathname();
  useEffect(()=>{fetch(`${API_URL}/content?locale=${locale}&types=logo,project,section`).then(r=>r.ok?r.json():Promise.reject()).then(x=>setItems(x.data)).catch(()=>undefined)},[locale]);
  const route=pathname.replace(new RegExp(`^/${locale}`),"")||"/";
  const parsed=useMemo(()=>items.map(item=>{try{return{item,data:JSON.parse(item.data) as Data}}catch{return{item,data:{}}}}),[items]);
  const projects=parsed.filter(x=>x.item.type==="project"&&(x.data.path||"/")===route);
  const sections=parsed.filter(x=>x.item.type==="section"&&(x.data.path||"/")===route);
  if(!projects.length&&!sections.length)return null;
  return <div data-cms-ignore>
    {sections.map(({item,data},index)=><section key={item.id} className={`border-t border-ink-200 bg-background py-20 dark:border-white/10 ${index%2?"bg-ink-50 dark:bg-white/[.02]":""}`}><div className={`mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8 ${data.layout==="image-left"?"":""}`}><div className={data.layout==="image-left"?"lg:order-2":""}>{data.eyebrow&&<p className="text-sm font-bold uppercase tracking-[.2em] text-gold-500">{data.eyebrow}</p>}<h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{item.title}</h2>{data.body&&<p className="mt-6 whitespace-pre-line text-lg leading-8 text-muted-foreground">{data.body}</p>}{data.ctaLabel&&data.ctaUrl&&<a href={data.ctaUrl} className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-bold text-white">{data.ctaLabel}<ArrowUpRight className="size-4"/></a>}</div>{data.image&&<div className={`${data.layout==="image-left"?"lg:order-1":""} overflow-hidden rounded-[2rem] shadow-2xl`}><img src={asset(data.image)} alt={item.title} className="aspect-[4/3] h-full w-full object-cover"/></div>}</div></section>)}
    {!!projects.length&&<section className="border-t border-ink-200 bg-ink-50 py-20 dark:border-white/10 dark:bg-white/[.02]"><div className="mx-auto max-w-7xl px-5 lg:px-8"><p className="text-sm font-bold uppercase tracking-[.2em] text-gold-500">Selected work</p><div className="mt-3 flex items-end justify-between"><h2 className="font-display text-4xl font-bold sm:text-5xl">Latest projects</h2></div><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{projects.map(({item,data})=><article key={item.id} className="group overflow-hidden rounded-3xl border border-ink-200 bg-background shadow-sm dark:border-white/10">{data.image&&<div className="overflow-hidden"><img src={asset(data.image)} alt={item.title} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"/></div>}<div className="p-6"><p className="text-xs font-bold uppercase tracking-wider text-gold-500">{data.category||"Project"}</p><h3 className="mt-2 text-xl font-bold">{item.title}</h3>{data.location&&<p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4"/>{data.location}</p>}<p className="mt-4 line-clamp-3 text-sm leading-6 text-muted-foreground">{data.description}</p></div></article>)}</div></div></section>}
  </div>
}
