import { Clock3 } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function ComingSoon({locale}:{locale:"en"|"es"}) {
  const es=locale==="es";
  return <section className="relative isolate grid min-h-[65vh] place-items-center overflow-hidden bg-navy-950 py-24 text-white">
    <div aria-hidden className="absolute inset-0 bg-blueprint opacity-25"/><div aria-hidden className="absolute size-[32rem] rounded-full bg-gold-500/10 blur-[120px]"/>
    <Container className="relative text-center"><span className="mx-auto grid size-16 place-items-center rounded-2xl border border-gold-500/30 bg-gold-500/10 text-gold-400"><Clock3 className="size-7"/></span><p className="mt-7 text-xs font-bold uppercase tracking-[.24em] text-gold-400">{es?"En construcción":"Under construction"}</p><h1 className="mt-4 text-display-xl text-white">{es?"Próximamente.":"Coming soon."}</h1><p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-navy-100">{es?"Estamos preparando una nueva experiencia. Vuelva pronto para conocer las novedades.":"We’re preparing a new experience for this page. Check back soon for the launch."}</p></Container>
  </section>
}
