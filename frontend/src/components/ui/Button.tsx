import { ButtonHTMLAttributes } from 'react'

export function GlassButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="h-10 rounded-full border border-white/15 bg-white/10 px-4 text-xs text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
    />
  )
}
