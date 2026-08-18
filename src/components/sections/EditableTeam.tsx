"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
import { API_URL } from "@/lib/api/client";
type Member = { id?: string; firstName: string; lastInitial: string; credentials?: string; role: string; photo: string; bio: string; email?: string; photoSize?: number; order?: number };
type Item = { id: string; locale: string; key: string; title: string; data: string };
function asset(v: string) { const origin = API_URL.replace(/\/api\/v1\/?$/, ""); return /^(https?:|data:|blob:)/.test(v) ? v : `${origin}${v}`; }
export function EditableTeam({ locale, fallback }: { locale: string; fallback: Member[] }) {
  const [members, setMembers] = useState(fallback);
  // Team membership is language-independent: fetch every team row, keep one card
  // per person (by key, preferring the English/canonical row so edits show on
  // both languages), then order by saved position.
  useEffect(() => {
    fetch(`${API_URL}/content?types=team`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((x) => {
        const rows = x.data as Item[];
        const byKey = new Map<string, Item>();
        for (const r of rows) { const cur = byKey.get(r.key); if (!cur || (r.locale === "en" && cur.locale !== "en")) byKey.set(r.key, r); }
        const parsed = Array.from(byKey.values())
          .map((item) => { try { const d = JSON.parse(item.data); return { id: item.id, firstName: d.firstName || item.title, lastInitial: d.lastInitial || "", credentials: d.credentials || "", role: d.role || "", photo: d.photo || "", bio: d.bio || "", email: d.email || "", photoSize: Number(d.photoSize) || 100, order: typeof d.order === "number" ? d.order : parseInt(String(item.key).replace(/\D/g, ""), 10) || 0 } as Member; } catch { return null; } })
          .filter(Boolean) as Member[];
        parsed.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        if (parsed.length) setMembers(parsed);
      })
      .catch(() => undefined);
  }, [locale]);
  return (
    <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member, index) => {
        const name = `${member.firstName} ${member.lastInitial}${member.lastInitial ? "." : ""}`;
        const zoom = (member.photoSize ?? 100) / 100;
        const emailKey = member.id ? `teamfield:${member.id}:email` : undefined;
        const bioKey = member.id ? `teamfield:${member.id}:bio` : undefined;
        return (
          // data-cms-ignore stops the Visual Editor from index-tagging the name
          // and role; only the bio and email carry explicit, stable keys so they
          // can be clicked and edited inline (saved back to the team content).
          <article key={`${name}-${index}`} data-cms-ignore className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-gold-500/45">
            <div className="relative aspect-square overflow-hidden bg-navy-900">
              <Image src={asset(member.photo)} alt={name} fill sizes="(min-width:1024px) 28vw,(min-width:640px) 45vw,100vw" style={{ transform: `scale(${zoom})` }} className="object-cover object-center transition-transform duration-500" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl text-white">{name}</h3>
              <p className="mt-1.5 text-sm font-medium text-gold-400">{member.role}</p>
              {member.email ? (
                <a href={`mailto:${member.email}`} data-cms-key={emailKey} data-cms-kind="text" data-cms-field="1" data-cms-current={member.email} data-cms-original={member.email} className="mt-3 inline-flex items-center gap-1.5 break-all text-sm font-medium text-gold-300 transition-colors hover:text-gold-200 hover:underline">
                  <Mail aria-hidden className="size-4 shrink-0" />
                  {member.email}
                </a>
              ) : emailKey ? (
                // Hidden on the live site; shown only inside the Visual Editor
                // (via the .cms-editing class) so an email can be added inline.
                <span data-cms-key={emailKey} data-cms-kind="text" data-cms-field="1" data-cms-current="" data-cms-original="" className="team-add-email mt-3 items-center gap-1.5 text-sm font-medium italic text-gold-300/70">
                  <Mail aria-hidden className="size-4 shrink-0" />
                  Add email
                </span>
              ) : null}
              <p data-cms-key={bioKey} data-cms-kind="text" data-cms-field="1" data-cms-current={member.bio} data-cms-original={member.bio} className="mt-3 text-sm leading-relaxed text-navy-100">{member.bio}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
