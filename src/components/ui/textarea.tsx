import type { TextareaHTMLAttributes } from 'react'
import { fieldBaseStyles } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(fieldBaseStyles, 'min-h-36 resize-y py-3', className)}
      {...props}
    />
  )
}
