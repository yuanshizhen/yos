import { InputHTMLAttributes } from 'react'

export function GlassInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm text-white outline-none placeholder:text-white/50 focus:border-white/30" />
}
