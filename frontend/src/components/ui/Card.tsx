import { ReactNode } from 'react'

export function AppleCard({ children }: { children: ReactNode }) {
  return <div className="rounded-3xl border border-white/80 bg-apple-card p-6 shadow-glass backdrop-blur-xl">{children}</div>
}
