import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export function AppleButton({ variant = 'primary', className, ...props }: Props) {
  return (
    <button
      className={clsx(
        'rounded-2xl px-5 py-2.5 text-sm font-medium transition-all duration-300 active:scale-95',
        variant === 'primary' && 'bg-apple-accent text-white shadow-lg shadow-blue-200 hover:-translate-y-0.5',
        variant === 'ghost' && 'bg-white/70 text-apple-text border border-white/80 hover:bg-white',
        className,
      )}
      {...props}
    />
  )
}
