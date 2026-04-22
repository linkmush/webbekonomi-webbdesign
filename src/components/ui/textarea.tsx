import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { fieldBaseStyles } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(fieldBaseStyles, 'min-h-36 resize-y py-3', className)}
        {...props}
      />
    )
  },
)

Textarea.displayName = 'Textarea'
