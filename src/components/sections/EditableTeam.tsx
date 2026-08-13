"use client";
import { useEffect,useState } from "react";
import Image from "next/image";
import { API_URL } from "@/lib/api/client";
type Member={firstName:string;lastInitial:string;credentials?:string;role:string;photo:string;bio:string};
type Item={id:string;title:string;data:string};
function asset(v:string){const origin=API_URL.replace(/\/api\/v1\/?$/,"");return /^(https?:|data:|blob:)/.test(v)?v:`${origin}${v}`}
export function EditableTeam({locale,fallback}:{locale:string;fallback:Member[]}){
 const [members,setMembers]=useState(fallback);
 useEffect(()=>{fetch(`${API_URL}/content?locale=${locale}&types=team`).then(r=>r.ok?r.json():Promise.reject()).then(x=>{const rows=(x.data as Item[]).map(item=>{try{const d=JSON.parse(item.data);return {firstName:d.firstName||item.title,lastInitial:d.lastInitial||"",credentials:d.credentials||"",role:d.role||"",photo:d.photo||"",bio:d.bio||""}}catch{return null}}).filter(Boolean) as Member[];if(rows.length)setMembers(rows)}).catch(()=>undefined)},[locale]);
 return <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{members.map((member,index)=>{const name=`${member.firstName} ${member.lastInitial}${member.lastInitial?".":""}`;return <article key={`${name}-${index}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-gold-500/45"><div className="relative aspect-square overflow-hidden bg-navy-900"><Image src={asset(member.photo)} alt={name} fill sizes="(min-width:1024px) 28vw,(min-width:640px) 45vw,100vw" className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"/></div><div className="flex flex-1 flex-col p-6"><h3 className="text-xl text-white">{name}</h3><p className="mt-1.5 text-sm font-medium text-gold-400">{member.role}</p><p className="mt-3 text-sm leading-relaxed text-navy-100">{member.bio}</p></div></article>})}</div>
}
