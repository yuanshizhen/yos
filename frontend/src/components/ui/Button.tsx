import { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'ghost'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
}

export function GlassButton({ variant = 'primary', className = '', ...props }: Props) {
  const base =
    'glass-btn inline-flex h-10 items-center justify-center rounded-full px-4 text-xs font-medium tracking-[0.2px] transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60'
  const styles =
    variant === 'primary'
      ? 'border border-white/70 bg-white/80 text-slate-900 hover:bg-white'
      : 'border border-slate-200 bg-white/55 text-slate-700 hover:bg-white/90'

  return <button {...props} className={`${base} ${styles} ${className}`.trim()} />
}
