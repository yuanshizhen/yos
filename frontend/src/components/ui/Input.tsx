import { InputHTMLAttributes } from 'react'

export function GlassInput({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 placeholder:text-slate-400 ${className}`.trim()}
    />
  )
}
