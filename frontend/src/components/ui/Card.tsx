import { ReactNode } from 'react'

export function GlassCard({ title, desc, children }: { title: string; desc?: string; children?: ReactNode }) {
  return (
    <div className="rounded-[22px] border border-white/15 bg-black/20 p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      {desc && <p className="mt-2 text-xs text-white/60">{desc}</p>}
      {children}
    </div>
  )
}
