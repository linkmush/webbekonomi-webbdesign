import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex min-w-0 max-w-full items-center justify-center gap-2 rounded-full text-center text-sm font-semibold leading-tight whitespace-normal transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/12 disabled:pointer-events-none disabled:opacity-50 sm:whitespace-nowrap',
  {
    variants: {
      size: {
        default: 'h-11 px-5',
        lg: 'h-12 px-6 text-[0.95rem]',
        sm: 'h-9 px-4 text-xs',
      },
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:brightness-105',
        secondary:
          'bg-secondary text-secondary-foreground hover:-translate-y-0.5 hover:bg-secondary/80',
        ghost:
          'bg-transparent text-foreground hover:bg-card/70 hover:text-primary',
        outline:
          'border border-border bg-transparent text-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card/70',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'primary',
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export function Button({
  asChild = false,
  className,
  size,
  variant,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return <Comp className={cn(buttonVariants({ size, variant }), className)} {...props} />
}
