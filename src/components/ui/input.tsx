import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export const fieldBaseStyles =
  'w-full rounded-[22px] border border-border bg-background/80 px-4 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] transition placeholder:text-muted-foreground focus-visible:border-primary/55 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return <input ref={ref} className={cn(fieldBaseStyles, 'h-12', className)} {...props} />
  },
)

Input.displayName = 'Input'
