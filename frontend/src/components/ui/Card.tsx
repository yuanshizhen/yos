import { ReactNode } from 'react'

export function GlassCard({ title, desc, children }: { title: string; desc?: string; children?: ReactNode }) {
  return (
    <section className="glass-card rounded-[24px] border border-white/70 bg-white/60 p-5 shadow-[0_12px_40px_rgba(148,163,184,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      {desc && <p className="mt-2 text-xs leading-5 text-slate-600">{desc}</p>}
      {children}
    </section>
  )
}
